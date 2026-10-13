---
name: ingest
description: Ingests a source into the AI wiki. Use whenever the user pastes a URL to add to the wiki (YouTube, podcast episode on Apple Podcasts, Spotify, RSS or any podcast link, arxiv or PDF, GitHub repo, docs page, article), drops a file in inbox/ and says "process inbox", or asks to "ingest", "add this", "clip this" or "deep dive this". Runs a Tier 1 quick clip or a Tier 2 deep dive through confidentiality scan, connect, index and log; podcast episodes also get transcript discovery and a section menu. Not for URLs meant for a LinkedIn post (linkedin-url-post) or user-authored prompts (gist).
argument-hint: "<url or 'inbox'> [notes…] [quick|deep dive]"
---

# Ingest

Knowledge ingest pipeline for this wiki. Conventions (pillars, source-type table, slug format, tag taxonomy, model routing, guardrails) live in `CLAUDE.md`. Frontmatter schemas live in `.claude/rules/frontmatter.md`; read it before writing any file under `sources/`, `summaries/` or `wiki/`.

Supporting files in this skill directory:

- `step0-scan.md`: the Confidentiality Scan (when to run it, the sub-agent prompt, the verdict, the abort cleanup).
- `summary-template.md`: the Tier 2 summary structure and section-usage rules.
- `podcast.md`: podcast episodes only. Metadata, transcript acquisition and the section menu that replace Tier 2 Steps 1, 3, 5 and 6.

## Rules for every run

- **Duplicates first.** Before fetching anything, run `grep -rl '<video-id or URL>' sources/ summaries/` (the URL sits in each file's `resource:` frontmatter; `index.md` holds no URLs). For a podcast, also grep the episode title. On a hit, tell the user and ask whether to redo.
- **Tier.** Take the Default tier column of `CLAUDE.md`'s source-type table; "deep dive", "quick" or "clip" from the user overrides it. Podcast episodes run Tier 2 with `podcast.md`.
- **Scan before publishing.** This repo is public. Every summary gets the Step 0 scan; non-public sources get it too (`step0-scan.md` says which). If a scan flags, remediate and re-scan before moving on. If the user aborts, follow the abort cleanup in `step0-scan.md`: delete every file this run wrote, so nothing flagged reaches a commit.
- **CONNECT runs in the main session**, for every tier, including quick clips and instructional sources. Invoke the `connect` skill directly, never inside a sub-agent: it spawns its own Opus sub-agents and needs the main session to put its tension menu to the user. Never merge contradicting claims yourself.

## Tier 1 — Quick Clip

No interview, no deep analysis. Everything runs in the main session except the Step 0 scan sub-agent and CONNECT's own sub-agents.

Copy this checklist into the reply and tick it off:

```text
Tier 1 progress:
- [ ] Duplicate check: no hit, or the user said redo
- [ ] SAVE: sources/<folder>/<slug>.md exists as .md with source frontmatter
- [ ] SUMMARIZE: summaries/<slug>.md written
- [ ] SCAN: summary verdict CLEAR (and source CLEAR for inbox files)
- [ ] CONNECT: report shown, every tension answered
- [ ] INDEX: summary bullet under the pillar's ### Sources; new wiki pages under ### Wiki Pages
- [ ] LOG: **Creation** entry under today's heading
If a scan flags, remediate and return to SCAN. On abort, run the cleanup in step0-scan.md.
```

### Entry A: URL paste

1. **DETECT**: source type from the URL pattern (table in `CLAUDE.md`).
2. **FETCH**: WebFetch the content.
3. **CLASSIFY**: pillar and tags.
4. **SLUG**: `YYYY-MM-DD_source-slug_title-slug`.
5. **SAVE**: verbatim content to `sources/<folder>/<slug>.md` with source frontmatter.
6. **SUMMARIZE**: `summaries/<slug>.md` with TL;DR (2-3 sentences), Key Takeaways (numbered, with **How to apply** for actionable items), Notable Commands/Snippets (if any), Related Topics (tags).
7. **SCAN SUMMARY**: run Step 0 (`step0-scan.md`) on the summary.
8. **CONNECT**: invoke the `connect` skill on the new summary.
9. **INDEX**: in `index.md`, add `* [Title](summaries/<slug>.md) - description` under the pillar's `### Sources` heading, description from the summary frontmatter. Add each wiki page the CONNECT report lists as created, same bullet format, under that pillar's `### Wiki Pages` heading; connect does not index them itself.
10. **LOG**: append a `**Creation**` entry to `log.md` under today's `## YYYY-MM-DD` heading (newest-first): action, source, type, tier, what was updated.

### Entry B: inbox processing

User says "process inbox" or similar.

1. **LIST**: list `inbox/`.
2. **For each file:** EXTRACT the text (read a PDF or docx; Markdown and text as is) → **Step 0 on the extracted text** (inbox files are non-public by default) → CLASSIFY → SLUG → SAVE as `sources/<folder>/<slug>.md` with source frontmatter (`extraction_method: pdf-extract` for PDFs, `user-pasted` otherwise) → SUMMARIZE → **Step 0 on the summary** → CONNECT → INDEX → LOG.
3. **CLEAN**: delete each original whose source file was saved. `inbox/` must be empty when done, except originals left in place by an abort.

## Tier 2 — Deep Dive

Full extraction plus a one-round interview. Steps 5 and 7 run on Opus sub-agents (see Model Routing in `CLAUDE.md`); a purely instructional source (feature walkthrough, tutorial) with no argumentative content may run them in the main session instead, and the user can override either way. Everything else runs in the main session, and CONNECT always uses its own Opus sub-agents.

Copy this checklist into the reply and tick it off:

```text
Tier 2 progress:
- [ ] 1 Metadata confirmed by the user; duplicate check clean
- [ ] 2 Slug set; source scan CLEAR if the source is not obviously public
- [ ] 3 Full text or transcript extracted, extraction_method known
- [ ] 4 Source saved with frontmatter
- [ ] 5 Extraction plan (podcast: section choice) confirmed by the user
- [ ] 6 notes/<slug>.md written
- [ ] 7 Summary written; summary scan CLEAR
- [ ] 8 CONNECT report shown, every tension answered
- [ ] 9 Index (### Sources plus any new ### Wiki Pages) and log entries added
If a scan flags, remediate and return to that scan. On abort, run the cleanup in step0-scan.md.
```

### Step 1 — Metadata

Podcast: see `podcast.md`.

YouTube: check `which yt-dlp` first (suggest install if missing), then

```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(id)s|||%(duration_string)s" "<URL>"
```

Paper: title, authors, date, abstract from the PDF or arxiv page. Repo: name, description, primary language, stars, last activity.

**Confirm with the user**: title, author/channel, date, duration/size.

### Step 2 — Slug

`YYYY-MM-DD_source-slug_title-slug`. If the source is **not obviously public** (user-supplied document rather than a public URL), run Step 0 on the raw material now, before Extract. Public URLs skip the source scan.

### Step 3 — Extract

Podcast: see `podcast.md`.

YouTube (check `python --version` first):

```bash
python scripts/extract-transcript.py "<URL>"
```

Output JSON: `{"status", "extraction_method", "subtitle_lang", "transcript"}`.

If `status` is `"no_captions"`, fall back to local transcription **before** asking the user:

```bash
python scripts/transcribe-audio.py "<URL>"
```

This downloads audio to a temp file, normalizes it with `ffmpeg`, transcribes with whisper.cpp (`whisper-cli`), deletes the audio, and returns the same JSON with `extraction_method: "whisper-local"`. `--prompt` primes proper-noun spelling (defaults to AI terms); `--model` overrides the model (ggml name or absolute path; default from `~/.claude-video-vision/config.json`, else `large-v3-turbo`, under `~/whisper-models/`). The script **never installs anything**; if `whisper-cli`, `ffmpeg` or the model is missing it returns `status: "error"` with an install hint. Do **not** fall back to `pip install faster-whisper`. Only on `status: "error"` ask the user to paste the transcript.

Set the source frontmatter `extraction_method` from the output.

Paper: read the PDF, extract full text. Repo: analyze README, directory structure, key files; produce a structured analysis.

### Step 4 — Save

`sources/<folder>/<slug>.md` with full frontmatter. Content is verbatim and never edited after saving.

### Step 5 — Focus & Discovery (Opus sub-agent)

Podcast: the section menu in `podcast.md` replaces this step.

Spawn with `model: "opus"`. Give it the source path, the user's notes (inline or path), and: *"Read the source. Map the user's focus points to timestamp ranges (sections for papers and repos). Identify 3-5 notable points not covered by the user's notes. Return the extraction plan."*

**Mode A — notes provided:** parse notes into focus points → map each to timestamps or sections → find 3-5 uncovered points → present the plan (**Your focus points** with locations; **Also in this source** with location, one-liner, relevance) → user confirms which discoveries to include (all / letters / none). One interaction.

**Mode B — URL only:** ask one question: *"What caught your attention? Any specific topics, workflows, or concepts to capture? Anything to exclude?"* Then continue as in Mode A with the answer as the focus points.

The main session presents the plan to the user for confirmation.

### Step 6 — Notes

Save to `notes/<slug>.md` (podcast: the notes variant in `podcast.md`):

```markdown
# Ingest Notes

**Source:** [<Title>](<URL>)

## User Focus
<!-- bullets from notes (Mode A) or interview (Mode B) -->

## Confirmed Discoveries
<!-- discoveries the user chose; omit if none -->
```

### Step 7 — Summarize (Opus sub-agent)

Spawn with `model: "opus"`. Give it the source path, the notes path, the summary frontmatter (from `.claude/rules/frontmatter.md`), and the template in `summary-template.md`. It writes `summaries/<slug>.md` directly and confirms. Focus on what the **user** found interesting, not a generic overview.

Then run Step 0 on the summary (`step0-scan.md`).

### Step 8 — Connect

Invoke the `connect` skill from the main session with the new summary path. It detects tensions before merging and returns conflicts; the main session presents the menu and connect dispatches the writes.

### Step 9 — Index & Log

Same as Tier 1 steps 9 and 10.
