import unittest, importlib.util, pathlib, subprocess, io, contextlib
from unittest import mock


def load(name, filename):
    spec = importlib.util.spec_from_file_location(
        name, pathlib.Path(__file__).parent.parent / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


SCRIPTS = [load("extract_transcript", "extract-transcript.py"),
           load("transcribe_audio", "transcribe-audio.py")]

BOT = "ERROR: [youtube] x: Sign in to confirm you're not a bot."


def done(code, stderr=""):
    return subprocess.CompletedProcess([], code, stdout="out", stderr=stderr)


class RunYtdlpTest(unittest.TestCase):
    def calls(self, script, results):
        with mock.patch.object(script.subprocess, "run", side_effect=results) as run, \
                contextlib.redirect_stderr(io.StringIO()):
            try:
                outcome = script.run_ytdlp(["-j", "URL"])
            except subprocess.CalledProcessError as e:
                outcome = e
        return outcome, [c.args[0] for c in run.call_args_list]

    def test_success_runs_once(self):
        for script in SCRIPTS:
            outcome, argv = self.calls(script, [done(0)])
            self.assertEqual(outcome.stdout, "out")
            self.assertEqual(argv, [["yt-dlp", "-j", "URL"]])

    def test_bot_check_retries_over_ipv4(self):
        for script in SCRIPTS:
            outcome, argv = self.calls(script, [done(1, BOT), done(0)])
            self.assertEqual(outcome.returncode, 0)
            self.assertEqual(argv[1], ["yt-dlp", "--force-ipv4", "-j", "URL"])

    def test_other_errors_do_not_retry(self):
        for script in SCRIPTS:
            outcome, argv = self.calls(script, [done(1, "HTTP Error 429")])
            self.assertIsInstance(outcome, subprocess.CalledProcessError)
            self.assertEqual(len(argv), 1)

    def test_failed_retry_raises_with_its_stderr(self):
        for script in SCRIPTS:
            outcome, argv = self.calls(script, [done(1, BOT), done(1, BOT + " again")])
            self.assertIsInstance(outcome, subprocess.CalledProcessError)
            self.assertIn("again", outcome.stderr)
            self.assertEqual(len(argv), 2)


if __name__ == "__main__":
    unittest.main()
