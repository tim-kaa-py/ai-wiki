import unittest, importlib.util, pathlib

spec = importlib.util.spec_from_file_location(
    "okf_check", pathlib.Path(__file__).parent.parent / "okf-check.py")
okf_check = importlib.util.module_from_spec(spec)
spec.loader.exec_module(okf_check)


class TestCheckFrontmatter(unittest.TestCase):
    def test_valid(self):
        text = '---\ntitle: "X"\ntype: "youtube"\n---\n\nbody\n'
        self.assertEqual(okf_check.check_frontmatter(text), [])

    def test_missing_frontmatter(self):
        self.assertIn("no frontmatter", okf_check.check_frontmatter("# just body\n")[0])

    def test_missing_type(self):
        text = '---\ntitle: "X"\n---\nbody\n'
        self.assertIn("type", okf_check.check_frontmatter(text)[0])

    def test_empty_type(self):
        text = '---\ntype: ""\n---\nbody\n'
        self.assertIn("type", okf_check.check_frontmatter(text)[0])


if __name__ == "__main__":
    unittest.main()
