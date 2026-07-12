import unittest, importlib.util, pathlib

spec = importlib.util.spec_from_file_location(
    "okf_migrate", pathlib.Path(__file__).parent.parent / "migrations" / "okf-migrate-frontmatter.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

SRC = '''---
title: "T"
source_type: youtube
url: "https://x"
ingested: "2026-04-13"
---
[00:00] url: something in body
'''

SUM = '''---
title: "T"
source_type: "youtube"
url: "https://x"
ingested: "2026-04-13"
source_file: "sources/youtube/x.md"
---
body
'''

WIKI = '''---
title: "T"
type: "concept"
last_updated: "2026-06-29"
---
body
'''


class TestMigrate(unittest.TestCase):
    def test_source(self):
        out = m.migrate_source(SRC)
        self.assertIn('type: "youtube"', out)
        self.assertNotIn("source_type", out)
        self.assertIn('resource: "https://x"', out)
        self.assertIn('timestamp: "2026-04-13"', out)
        self.assertNotIn("ingested", out)
        self.assertIn("url: something in body", out)  # body untouched

    def test_summary(self):
        out = m.migrate_summary(SUM)
        self.assertIn('type: "summary"', out)
        self.assertNotIn("source_type", out)
        self.assertIn('resource: "https://x"', out)
        self.assertIn('timestamp: "2026-04-13"', out)

    def test_wiki(self):
        out = m.migrate_wiki(WIKI)
        self.assertIn('timestamp: "2026-06-29"', out)
        self.assertNotIn("last_updated", out)
        self.assertIn('type: "concept"', out)

    def test_idempotent(self):
        once = m.migrate_source(SRC)
        self.assertEqual(once, m.migrate_source(once))


if __name__ == "__main__":
    unittest.main()
