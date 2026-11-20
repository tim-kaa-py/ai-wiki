import unittest, importlib.util, pathlib, os, tempfile, io, json, contextlib

spec = importlib.util.spec_from_file_location(
    "obsidian_videos", pathlib.Path(__file__).parent.parent / "obsidian-videos.py")
ov = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ov)

NOTE = """
# Watch next:

**Other**
https://www.youtube.com/watch?v=AAAAAAAAAAA

# Ingest next:

**Titled**
[https://www.youtube.com/watch?v=BBBBBBBBBBB](https://www.youtube.com/watch?v=BBBBBBBBBBB)
first question?
second line


https://youtu.be/CCCCCCCCCCC basic

**No remarks:**
https://m.youtube.com/watch?v=DDDDDDDDDDD&pp=xyz
"""


def run(*argv):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        ov.main(["obsidian-videos.py", *argv])
    return json.loads(buf.getvalue())


class TestObsidianVideos(unittest.TestCase):
    def setUp(self):
        fd, self.path = tempfile.mkstemp(suffix=".md")
        os.close(fd)
        pathlib.Path(self.path).write_text(NOTE, encoding="utf-8")
        os.environ["AI_VIDEOS_NOTE"] = self.path

    def tearDown(self):
        os.remove(self.path)
        del os.environ["AI_VIDEOS_NOTE"]

    def test_list_only_ingest_next(self):
        entries = run("list")["entries"]
        self.assertEqual([e["video_id"] for e in entries],
                         ["BBBBBBBBBBB", "CCCCCCCCCCC", "DDDDDDDDDDD"])

    def test_title_remarks_and_canonical_url(self):
        a, b, c = run("list")["entries"]
        self.assertEqual(a["title"], "Titled")
        self.assertEqual(a["remarks"], "first question? second line")
        self.assertEqual(b["title"], "")
        self.assertEqual(b["remarks"], "basic")
        self.assertEqual(c["title"], "No remarks")
        self.assertEqual(c["url"], "https://www.youtube.com/watch?v=DDDDDDDDDDD")
        self.assertEqual(c["remarks"], "")

    def test_remove_keeps_other_entries(self):
        removed = run("remove", "BBBBBBBBBBB")["removed"]
        self.assertIn("second line", removed)
        text = pathlib.Path(self.path).read_text(encoding="utf-8")
        self.assertNotIn("BBBBBBBBBBB", text)
        self.assertIn("AAAAAAAAAAA", text)
        self.assertEqual([e["video_id"] for e in run("list")["entries"]],
                         ["CCCCCCCCCCC", "DDDDDDDDDDD"])

    def test_remove_unknown_fails(self):
        with self.assertRaises(SystemExit):
            with contextlib.redirect_stdout(io.StringIO()):
                ov.main(["obsidian-videos.py", "remove", "ZZZZZZZZZZZ"])


SECTIONS_NOTE = """
# Watch next:

## Some watch title
https://www.youtube.com/watch?v=AAAAAAAAAAA

# Ingest next:

  ## Heading-titled entry
  https://m.youtube.com/watch?v=EEEEEEEEEEE&pp=x
  question under a heading title?

**Bold entry**
https://www.youtube.com/watch?v=FFFFFFFFFFF

# URL post:
https://m.youtube.com/watch?v=GGGGGGGGGGG&pp=y
my angle for this post
on two lines

**Labelled post**
https://example.com/article
"""


class TestSections(unittest.TestCase):
    def setUp(self):
        fd, self.path = tempfile.mkstemp(suffix=".md")
        os.close(fd)
        pathlib.Path(self.path).write_text(SECTIONS_NOTE, encoding="utf-8")
        os.environ["AI_VIDEOS_NOTE"] = self.path

    def tearDown(self):
        os.remove(self.path)
        del os.environ["AI_VIDEOS_NOTE"]

    def test_level_two_heading_is_an_entry_title_not_a_section_end(self):
        a, b = run("list")["entries"]
        self.assertEqual((a["video_id"], a["title"], a["remarks"]),
                         ("EEEEEEEEEEE", "Heading-titled entry", "question under a heading title?"))
        self.assertEqual((b["video_id"], b["title"]), ("FFFFFFFFFFF", "Bold entry"))

    def test_url_post_section(self):
        a, b = run("list", "--section", "URL post")["entries"]
        self.assertEqual(a["url"], "https://www.youtube.com/watch?v=GGGGGGGGGGG")
        self.assertEqual(a["remarks"], "my angle for this post on two lines")
        self.assertEqual((b["title"], b["url"], b["video_id"]),
                         ("Labelled post", "https://example.com/article", None))

    def test_remove_from_url_post_leaves_ingest_next(self):
        removed = run("remove", "--section", "URL post", "GGGGGGGGGGG")["removed"]
        self.assertIn("my angle", removed)
        self.assertEqual([e["url"] for e in run("list", "--section", "URL post")["entries"]],
                         ["https://example.com/article"])
        self.assertEqual(len(run("list")["entries"]), 2)

    def test_remove_does_not_reach_into_another_section(self):
        with self.assertRaises(SystemExit):
            with contextlib.redirect_stdout(io.StringIO()):
                ov.main(["obsidian-videos.py", "remove", "--section", "URL post", "EEEEEEEEEEE"])

    def test_unknown_section_fails(self):
        with self.assertRaises(SystemExit):
            with contextlib.redirect_stdout(io.StringIO()):
                ov.main(["obsidian-videos.py", "list", "--section", "Nope"])


if __name__ == "__main__":
    unittest.main()
