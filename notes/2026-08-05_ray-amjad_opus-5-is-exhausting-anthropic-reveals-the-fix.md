# Ingest Notes

**Source:** [Opus 5 Is Exhausting. Anthropic Reveals The Fix.](https://www.youtube.com/watch?v=szjakRcw7V0)

## User Focus

No separate focus points supplied (Mode B — URL only). Focus derived from the confirmed discoveries below.

Core claim of the video: Opus 5's default prose is jargon-dense and tiring to read; the fix recommended by the Claude Code team is **output styles**, a Claude Code feature shipped ~October that the author had previously dismissed and has now reversed on — [00:00-01:15].

## Confirmed Discoveries

- (A) [04:33-05:06] **Output styles persist per project.** The active style is stored in the project's `.claude/settings.local.json`; setting a style in one project leaves other projects untouched. Demonstrated live by switching one project to Simplified Technical English while another stays on "Explain Like I'm 5".
- (B) [01:20-01:43] **Not a set-once config.** Anthropic team members reportedly switch output styles by project, by task, *and by time of day* depending on how tired they are or how engaged they want to be in the process. Reframes output style as a dial you ride rather than a preference you set.
- (D) [03:05-03:38] **`/branch` as a style-prototyping loop.** When output is confusing, branch off that conversation, paste the current output style, and ask Claude to generate ~5 candidate styles *plus* a rewrite of the same bad output in each. Pick the register you can actually read, then promote it to a real output style. The bad output becomes the eval fixture.
- (E) [03:51-04:09] **ASD-STE100 (Simplified Technical English)** as a style basis — a real controlled-language standard from aerospace maintenance documentation, offered as a fallback when "kid mode" is too basic and Slack-DM register is still confusing. Concrete and citable rather than vibes-based.

Declined: (C) `explanatory` style as new-hire onboarding tooling; (F) the author's own reversal on the feature.
