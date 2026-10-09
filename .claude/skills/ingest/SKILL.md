---
name: ingest
description: Ingest a source into the AI wiki. Use whenever the user pastes a URL (YouTube, podcast, arxiv, GitHub repo, docs page, article), drops a file in inbox/ and says "process inbox", or asks to "ingest", "add this", "clip this", "deep dive this". Runs the full pipeline (metadata → extract → save → focus → summarize → confidentiality scan → connect → index → log) in Tier 1 (quick clip) or Tier 2 (deep dive). Podcast episodes have their own skill (podcast-ingest); user-authored prompts are gists (gist skill), not ingests.
argument-hint: "<url or 'inbox'> [notes…] [quick|deep dive]"
---

# Ingest

Knowledge ingest pipeline for this wiki. Conventions (pillars, source-type table, slug format, tag taxonomy, model routing, guardrails) live in `CLAUDE.md`. Frontmatter schemas live in `.claude/rules/frontmatter.md` — read it before writing any file under `sources/`, `summaries/`, or `wiki/`.

Supporting files in this skill directory:

- `step0-scan.md` — the Confidentiality Scan: when to run it, the sub-agent prompt, the verdict format, how to handle it.
- `summary-template.md` — the Tier 2 summary structure and section-usage rules.

The CONNECT step is its own skill (`connect`). Invoke it at the point marked below; never merge contradicting claims yourself.

## Choose the tier

| Input | Tier |
|-------|------|
| YouTube, podcast, arxiv/PDF, GitHub repo URL | Tier 2 — Deep Dive |
| Docs page, article, any other URL, inbox file | Tier 1 — Quick Clip |
| User says "deep dive" | Tier 2 (override) |
| User says "quick" or "clip" | Tier 1 (override) |

Podcast URLs: hand off to the `podcast-ingest` skill instead.

Before anything else, **check `index.md` for duplicates** (match on URL or video ID). If already processed, tell the user and ask whether to redo.

## Tier 1 — Quick Clip

No interview, no deep analysis. All steps run in the main session; no sub-agents except the Step 0 scan and CONNECT.

### Entry A: URL paste

1. **DETECT** — source type from the URL pattern (table in `CLAUDE.md`).
2. **FETCH** — WebFetch the content.
3. **CLASSIFY** — pillar and tags.
4. **SLUG** — `YYYY-MM-DD_source-slug_title-slug`.
5. **SAVE** — verbatim content to `sources/<folder>/<slug>.md` with source frontmatter.
6. **SUMMARIZE** — `summaries/<slug>.md` with: TL;DR (2-3 sentences), Key Takeaways (numbered, with **How to apply** for actionable items), Notable Commands/Snippets (if any), Related Topics (tags).
7. **SCAN SUMMARY** — run Step 0 (`step0-scan.md`) on the summary. Resolve flags before continuing.
8. **CONNECT** — invoke the `connect` skill on the new summary.
9. **INDEX** — add `* [Title](path) - description` to `index.md` under the pillar heading; description from frontmatter.
10. **LOG** — append a `**Creation**` entry to `log.md` under today's `## YYYY-MM-DD` heading (newest-first): action, source, type, tier, what was updated.

### Entry B: inbox processing

User says "process inbox" or similar.

1. **SCAN** — list `inbox/`.
2. **For each file:** READ → **Step 0 on the file** (inbox files are non-public by default) → CLASSIFY → SLUG → move to `sources/<folder>/` → SUMMARIZE → **Step 0 on the summary** → CONNECT → INDEX → LOG.
3. **CLEAN** — delete processed files. `inbox/` must be empty when done.

## Tier 2 — Deep Dive

Full extraction plus a one-round interview. Steps 5, 7 and CONNECT run on Opus sub-agents (see Model Routing in `CLAUDE.md`); everything else runs in the main session.

### Step 1 — Metadata

YouTube: check `which yt-dlp` first (suggest install if missing), then

```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(id)s|||%(duration_string)s" "<URL>"
```

Paper: title, authors, date, abstract from the PDF or arxiv page. Repo: name, description, primary language, stars, last activity.

**Confirm with the user**: title, author/channel, date, duration/size. Then the duplicate check against `index.md` if not already done.

### Step 2 — Slug

`YYYY-MM-DD_source-slug_title-slug`. If the source is **not obviously public** (user-supplied document rather than a public URL), run Step 0 on the raw material now, before Extract. Public URLs skip the source scan.

### Step 3 — Extract

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

Spawn with `model: "opus"`. Give it the source path, the user's notes (inline or path), and: *"Read the transcript. Map the user's focus points to timestamp ranges. Identify 3-5 notable points not covered by the user's notes. Return the extraction plan."*

**Mode A — notes provided:** parse notes into focus points → map each to timestamps → find 3-5 uncovered points → present the plan (**Your focus points** with timestamps; **Also in this transcript** with timestamp, one-liner, relevance) → user confirms which discoveries to include (all / letters / none). One interaction.

**Mode B — URL only:** read the transcript, ask one question: *"What caught your attention? Any specific topics, workflows, or concepts to capture? Anything to exclude?"* Then run Mode A steps 3-5 with the answer as focus points.

The orchestrator presents the plan to the user for confirmation.

### Step 6 — Notes

Save to `notes/<slug>.md`:

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

Then **run Step 0 on the summary** (`step0-scan.md`). Resolve flags before CONNECT.

### Step 8 — Connect

Invoke the `connect` skill with the new summary path. It detects tensions before merging and returns conflicts for the user's decision; the orchestrator presents the menu and dispatches the writes.

### Step 9 — Index & Log

Same as Tier 1 steps 9 and 10.

## When to skip Opus

If the source is purely instructional (feature walkthrough, tutorial) with no argumentative content, Steps 5 and 7 can run in the main session. The user can override either way ("use Opus for this one" / "no sub-agent needed").
