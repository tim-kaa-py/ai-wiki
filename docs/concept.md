# Concept: LLM-Maintained Knowledge Wiki — Recreation Guide

Audience: another Claude Code (or equivalent coding agent) tasked with recreating this system **on any topic** in a **new GitHub repository**.

This file is self-contained. Read it top to bottom and execute the steps. Do not assume prior familiarity with the source repo.

---

## 1. What You Are Building

An LLM-maintained personal knowledge wiki. The human curates sources (URLs, files, notes). You do all bookkeeping: extraction, summarization, cross-linking, index maintenance, consistency.

### Three-Layer Architecture

1. **Sources** (`sources/`) — raw, verbatim material. Never modified after saving.
2. **Summaries** (`summaries/`) — one per source. Opinionated, focused on the user's declared interests.
3. **Wiki** (`wiki/`) — synthesized pages that aggregate knowledge across multiple sources. Maintained over time.

### Supporting Files

- `CLAUDE.md` — the operating contract. Defines workflows, templates, guardrails. (You will generate this.)
- `index.md` — master index of sources and wiki pages, grouped by pillar.
- `log.md` — append-only chronological ingest log.
- `inbox/` — drop zone for unprocessed URLs/files.
- `notes/` — per-source ingest notes capturing the user's focus.
- `scripts/` — helper scripts (transcript extraction, etc.).

### Two Tiers of Ingest

- **Tier 1 — Quick Clip:** articles, blog posts, docs. Fetch → summarize → connect → index. No interview.
- **Tier 2 — Deep Dive:** YouTube, podcasts, papers, repos. Extract → interview user about focus → summarize → connect → index.

### Why This Works

- Raw sources stay immutable (auditable, reproducible).
- Summaries are small enough to be regenerated if taste changes.
- Wiki pages compound: each new source enriches existing pages, or seeds a new one.
- The human never has to remember "did I already save this?" — the agent checks `index.md`.

---

## 2. Bootstrap Interview (DO THIS FIRST)

Before writing any files, interview the user to define the topic-specific shape of their wiki. Ask these questions conversationally (one or two at a time):

1. **Topic & scope.** "What's the topic? One sentence describing what belongs in this wiki and what doesn't."
2. **Pillars (3–5).** "What are the 3–5 top-level categories you want to organize knowledge under?" Example for AI: *Building with AI / Understanding AI / AI Ecosystem*. Example for personal finance: *Investing / Budgeting / Tax & Legal / My Portfolio*.
3. **Expected source types.** "Which of these will you actually feed in: YouTube, podcasts, articles/blogs, academic papers, GitHub repos, official docs, personal notes? Any others?"
4. **Starter tag taxonomy.** "List 5–15 tags you already know you'll use. Don't overthink — tags grow organically."
5. **Primary interest lens.** "When I summarize a source, what should I bias toward capturing? (e.g., actionable how-tos, argument structures, tool comparisons, historical context.)"
6. **Model routing preference.** "Do you have access to more than one Claude model (e.g., Sonnet + Opus)? If yes I'll route mechanical steps to the faster/cheaper model and deep analysis to the stronger one. If no, I'll use your single model for everything."
7. **Repo visibility.** "Public or private GitHub repo? What account/org?" If public, flag the **Confidentiality Scan (Step 0)** from the reference `CLAUDE.md` — it gates non-public content before it lands in `sources/` or `summaries/` and scans every generated summary before CONNECT. If private, the scan is optional (see §4.1).
8. **Reusable prompts (optional).** "Will you author and share reusable Claude Code prompts ('gists')?" If yes, scaffold `gists/` and `gists/index.md`. Gists are a separate artifact track — not summarized, not cross-linked into the wiki. See the reference `CLAUDE.md` → "Gists Workflow".

Record the answers. You will inject them into the `CLAUDE.md` template in Step 4.

---

## 3. Directory Scaffolding

Create the following directory structure in the working directory:

```
<repo-root>/
├── CLAUDE.md
├── README.md
├── LICENSE
├── .gitignore
├── index.md
├── log.md
├── docs/
│   ├── concept.md              # (copy this file)
│   └── user-documentation.md   # (copy sibling doc)
├── inbox/
│   └── .gitkeep
├── meta/
│   └── contradictions.md
├── notes/
│   └── .gitkeep
├── scripts/
│   ├── extract-transcript.py
│   ├── transcribe-audio.py
│   └── okf-check.py
├── sources/
│   ├── articles/
│   ├── docs/
│   ├── papers/
│   ├── podcasts/
│   ├── repos/
│   └── youtube/
├── summaries/
└── wiki/
    ├── comparisons/
    ├── concepts/
    ├── how-tos/
    ├── people/
    └── tools/
```

`meta/contradictions.md` is the open-tensions ledger drained by the Lint Workflow. See §4.8 below for the template.

Adjust `sources/` subdirectories to match the source types declared in the bootstrap interview (drop `papers/` if the user isn't ingesting papers, add others if needed).

If the user said yes to bootstrap Q8 (gists), also create:

```
gists/
└── index.md
```

---

## 4. File Templates

Generate the following files. `<TOKENS>` are placeholders to fill from the bootstrap interview.

### 4.1 `CLAUDE.md` (the operating contract)

This is the **most important file** — it's what tells you (and every future Claude Code session) how the system works.

Use the reference implementation in this repo as your template: [`CLAUDE.md`](../CLAUDE.md). Copy it verbatim, then edit:

- Replace the "AI Knowledge Wiki" heading/intro with the user's topic statement.
- Replace the **Three Pillars** table with the pillars from bootstrap Q2 (the section heading should match the user's pillar count).
- Replace **Source Types & Auto-Detection** rows if the user's source mix differs.
- Replace **Tag Taxonomy** categories with the user's starter tags from Q4.
- If the user has a single model only (Q6), replace the **Model Routing** section with: *"Single-model mode: all steps run on the user's available model. No sub-agent delegation."*
- **Confidentiality Scan (Step 0)** — keep as-is for public repos (Q7 = public). For private repos, the scan is optional; either drop the Step 0 section and its references in the workflows, or keep it as a lighter-weight sanity check (e.g., credentials only). Document the choice in the new repo's `CLAUDE.md` Guardrails so future sessions understand the threat model.
- Keep **Frontmatter Schemas**, **Tier 1/Tier 2 Workflows** (minus or including Step 0 per above), **CONNECT Step Detail**, **Contradiction Handling at Ingest**, **Query Workflow**, **Lint Workflow**, and **Guardrails** unchanged — these are the mechanics.
- **Contradiction Handling at Ingest** is the wiki's defence against silent merges that read as confident knowledge but quietly drop prior claims. Keep it default-on for both public and private repos. The companion file `meta/contradictions.md` is the append-only ledger drained by the Lint Workflow.

### 4.2 `index.md`

OKF v0.1 shape: frontmatter carries only `okf_version: "0.1"`; the body is one heading per pillar with `* [Title](path) - description` bullets underneath (description pulled from each entry's own frontmatter `description` field).

```markdown
---
okf_version: "0.1"
---

# <Topic> Knowledge Wiki

## <Pillar 1 Name>

*No sources yet.*

## <Pillar 2 Name>

*No sources yet.*

<!-- ... one section per pillar ... -->

---

**0 sources** | **0 wiki pages** | [Ingest Log](log.md)
```

As sources get ingested, replace `*No sources yet.*` with `* [Title](path/to/file.md) - description` bullets under each pillar heading (sources and wiki pages both use this flat bullet form — no tables). See the reference [`index.md`](../index.md) for the exact format.

### 4.3 `log.md`

OKF v0.1 shape: `## YYYY-MM-DD` headings, newest date first; each entry is a line prefixed `**Creation**` (for INGEST/BATCH-INGEST/RE-INGEST actions) or `**Update**` (for everything else — lint fixes, gist saves, contradiction resolutions, etc.).

```markdown
# Ingest Log

<!-- Append-only. Newest date heading first. -->

## YYYY-MM-DD

- **Creation** | INGEST | <title> | <type> | <tier> | <what was updated>
```

### 4.4 `.gitignore`

```
# Intermediate subtitle files
*.srt
*.ttml
*.vtt

# Obsidian local config (if the user uses Obsidian as a frontend)
.obsidian/

# Python bytecode cache (scripts/ ships Python + tests)
__pycache__/
*.pyc

# Claude Code local settings
.claude/settings.local.json

# Local secrets — never commit
.env

# OS
.DS_Store
Thumbs.db
```

### 4.5 `LICENSE`

Default to **CC BY 4.0** for a knowledge repo (content, not code). Fetch the text from https://creativecommons.org/licenses/by/4.0/legalcode.txt or use `gh api` to copy from an existing CC BY 4.0 repo. If the user prefers MIT or another license, use that instead.

### 4.6 `README.md`

At scaffold time, a minimal pointer file is enough:

```markdown
# <Topic> Knowledge Wiki

An LLM-maintained knowledge wiki about **<topic>**.

- **How to use it:** see [docs/user-documentation.md](docs/user-documentation.md)
- **How it was built / how to recreate it:** see [docs/concept.md](docs/concept.md)
- **Operating contract for Claude Code:** see [CLAUDE.md](CLAUDE.md)
- **Browse sources:** [index.md](index.md)
```

Once the wiki has real content (a few dozen sources), upgrade it to a proper landing page — overview paragraph, architecture diagram, entry-point table, CI badge (see §6), licensing note. Use this reference repo's [`README.md`](../README.md) as the template. An empty repo doesn't need the sales pitch; a grown one shouldn't greet visitors with four bullet points.

### 4.7 `gists/index.md` (only if Q8 = yes)

```markdown
# Gists

Reusable Claude Code prompts. Each gist is self-contained — copy the file (or just the prompt block), paste into a fresh Claude Code session, run.

These are author-authored *artifacts*, not ingested knowledge. They are not summarized or cross-linked into the wiki. See `CLAUDE.md` → "Gists Workflow" for the contract.

| Date | Title | Intent | Model | Tags |
|------|-------|--------|-------|------|

---

**0 gists** | [back to wiki index](../index.md)
```

### 4.8 `meta/contradictions.md`

Append-only ledger of tensions deferred at ingest via option `(q)`. The Lint Workflow drains this file. See `CLAUDE.md` → "Contradiction Handling at Ingest" for the surrounding contract.

Copy this reference repo's [`meta/contradictions.md`](../meta/contradictions.md) verbatim into the new repo. Its header explains the schema (anchor format, required fields, append-only rule) and ends with `_No open contradictions._` as the empty state. No tokens need substitution — the file is topic-agnostic.

### 4.9 Tension-triage pipeline (optional, retroactive)

Ingest-time contradiction handling only covers new material. If the new repo accumulates pages before the handling exists (or after bulk manual edits), scaffold the retroactive scanner from this reference repo:

- `.claude/skills/wiki-tension-triage/SKILL.md` — the orchestration contract (pipeline stages, tiered autonomy, supervised mode). Copy and adapt paths.
- `meta/triage/prompts/` — five agent briefing templates (detector, conflict-advocate, harmonizer, judge, challenger). Topic-agnostic; copy verbatim.
- `meta/tension-policy.md` — starts as a stub; populated by supervised pilot runs in the new domain (the calibration rules are domain-specific, do NOT copy this repo's rules).
- `meta/triage-runs/` — empty dir for run reports.

Design rationale and phasing (supervised pilots → shadow mode → autonomous sweep) are in `docs/superpowers/specs/2026-07-06-tension-triage-design.md`. Key invariants: detection is within-page only; the pipeline may autonomously apply only non-destructive resolutions ((b)/(c)) at strong confidence after a challenger pass; everything else goes to the `meta/contradictions.md` ledger.

---

## 5. Scripts

### 5.1 Transcript extraction

Copy [`scripts/extract-transcript.py`](../scripts/extract-transcript.py) from this repo into the new repo at the same path. It extracts YouTube captions (manual preferred, auto-generated fallback) as timestamped text via `yt-dlp`, with no `ffmpeg` dependency.

Runtime requirements (document these in `README.md` or `user-documentation.md`):

- Python 3.8+
- `yt-dlp` (`pip install yt-dlp` or platform equivalent)

The script outputs JSON: `{"status", "extraction_method", "subtitle_lang", "transcript"}`.

### 5.2 Local transcription fallback

Copy [`scripts/transcribe-audio.py`](../scripts/transcribe-audio.py) for sources that have **no captions at all**. It downloads the audio via `yt-dlp` (with `--remote-components ejs:github` so current YouTube signature challenges resolve), normalizes it to 16 kHz mono with `ffmpeg`, transcribes it locally with the [whisper.cpp](https://github.com/ggerganov/whisper.cpp) CLI (`whisper-cli`), emits the **same JSON contract** as `extract-transcript.py` (with `extraction_method: "whisper-local"`), and deletes the temp files.

Design points worth preserving on recreation:

- **Reuse, don't reinstall.** The script drives the `whisper-cli` binary + ggml model already on the machine — the same stack the `claude-video-vision` plugin uses. It resolves the model by reading `~/.claude-video-vision/config.json` (`whisper_model`, default `large-v3-turbo`) under `~/whisper-models/`. whisper.cpp picks its backend automatically (Metal on Apple Silicon); no device flag is needed.
- **Never auto-install.** If `whisper-cli`, `ffmpeg`, or the model is missing, it returns `status: "error"` with a manual-install hint and stops — it does not pip-install faster-whisper/openai-whisper. This is deliberate: an earlier version reached for `pip install faster-whisper` and stood up a duplicate stack that was never needed.
- **`--prompt` priming** biases proper-noun spelling — without it, Whisper transcribes "Claude" as "Cloud". Default primes AI-domain terms. `--model` overrides the model (ggml name or absolute path).

`CLAUDE.md` Step 3 chains these: captions → local transcription → ask user to paste. The `no_captions` path tries `transcribe-audio.py` before falling back to a manual paste.

### 5.3 OKF conformance checker

Copy [`scripts/okf-check.py`](../scripts/okf-check.py) into the new repo at the same path. It validates that `sources/`, `summaries/`, `wiki/`, `index.md`, and `log.md` conform to [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) (correct frontmatter field names — `type`, `resource`, `timestamp`, `description` — plus the `index.md`/`log.md` shapes above). Run it with `python3 scripts/okf-check.py`; it exits 0 and prints `OKF CHECK: PASS` when the bundle conforms. Wire it into the Lint Workflow (`CLAUDE.md` → "Lint Workflow" → OKF CONFORMANCE step) so drift gets caught on every lint pass, not just at scaffold time.

Also copy [`scripts/tests/`](../scripts/tests/) — unit tests for the checker (stdlib `unittest`, no dependencies). Run with `python3 -m unittest discover -s scripts/tests`. They are the checker's safety net when you adapt it to a different frontmatter mix.

### 5.4 Optional future scripts

Leave `scripts/` open for additions (e.g., paper fetchers, lint helpers). Do not pre-create them.

---

## 6. GitHub Setup

Assumes `gh` CLI is authenticated (`gh auth status` to check).

```bash
# From inside the new repo directory
git init -b main
git add .
git commit -m "Initial scaffold: LLM-maintained knowledge wiki for <topic>"

# Create and push to GitHub
gh repo create <owner>/<repo-name> --<public|private> --source=. --remote=origin --push
```

Substitute `<public|private>` based on bootstrap Q7.

**Do not** configure branch protection or issue templates in the initial scaffold — those are optional follow-ons the user can request later.

**CI is the one follow-on worth proposing early.** Once `okf-check.py` and its tests are in place, a ~20-line GitHub Actions workflow re-validates the bundle on every push (free for public repos, 2,000 min/month free for private). Copy this reference repo's [`.github/workflows/checks.yml`](../.github/workflows/checks.yml) verbatim and add the badge to `README.md`. Sessions that edit files can introduce frontmatter drift; CI catches it within a minute instead of at the next lint pass. Offer it after the first successful ingest, not before — an empty bundle has nothing to check.

After the push, confirm the repo URL with the user and stop. Do **not** ingest any sources until the user invokes the workflow.

---

## 7. First-Run Sanity Check

After scaffolding, offer the user a smoke test:

> "Scaffold complete. Want me to run the first ingest? Paste a URL or drop a file in `inbox/`."

On the first ingest, walk through the Tier 1 or Tier 2 workflow as defined in `CLAUDE.md`. This validates that:

- `scripts/extract-transcript.py` runs (if a YouTube URL is given).
- The frontmatter schemas work for the chosen topic.
- The pillars chosen in bootstrap actually fit real sources.

If pillars feel wrong after the first 2–3 ingests, that's normal — rename them in `index.md` and `CLAUDE.md` before the system compounds further.

---

## 8. What NOT To Do

- **Never modify sources after saving.** Re-extraction with better tooling is allowed; editorial changes are not.
- **Never skip the CONNECT step** — the wiki only compounds if new sources are cross-linked into existing pages.
- **Never download video/audio for storage** — caption/metadata extraction uses `--skip-download`. The sole exception is the transcription fallback (`transcribe-audio.py`), which downloads audio to a temp file, transcribes locally, and deletes it immediately.
- **Never pre-populate wiki pages** during scaffolding. Wiki pages are only born from real sources.

---

## 9. Handoff

Once `git push` succeeds:

1. Tell the user the repo URL.
2. Point them at `user-documentation.md` for daily usage.
3. Remind them that `CLAUDE.md` is the contract — if they want the agent to behave differently, edit `CLAUDE.md`.

That's the entire system. Everything else emerges from use.
