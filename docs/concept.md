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
- `playbook.md` — living document of practices/patterns discovered while working in the topic.
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
2. **Pillars (3–5).** "What are the 3–5 top-level categories you want to organize knowledge under?" Example for AI: *Building with AI / Understanding AI / AI Ecosystem / My Lab*. Example for personal finance: *Investing / Budgeting / Tax & Legal / My Portfolio*.
3. **Expected source types.** "Which of these will you actually feed in: YouTube, podcasts, articles/blogs, academic papers, GitHub repos, official docs, personal notes? Any others?"
4. **Starter tag taxonomy.** "List 5–15 tags you already know you'll use. Don't overthink — tags grow organically."
5. **Primary interest lens.** "When I summarize a source, what should I bias toward capturing? (e.g., actionable how-tos, argument structures, tool comparisons, historical context.)"
6. **Model routing preference.** "Do you have access to more than one Claude model (e.g., Sonnet + Opus)? If yes I'll route mechanical steps to the faster/cheaper model and deep analysis to the stronger one. If no, I'll use your single model for everything."
7. **Repo visibility.** "Public or private GitHub repo? What account/org?" If public, flag the **Confidentiality Scan (Step 0)** from the reference `CLAUDE.md` — it gates non-public content before it lands in `sources/` or `summaries/` and scans every generated summary before CONNECT. If private, the scan is optional (see §4.1).

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
├── playbook.md
├── docs/
│   ├── concept.md              # (copy this file)
│   └── user-documentation.md   # (copy sibling doc)
├── inbox/
│   └── .gitkeep
├── notes/
│   └── .gitkeep
├── scripts/
│   └── extract-transcript.py
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

Adjust `sources/` subdirectories to match the source types declared in the bootstrap interview (drop `papers/` if the user isn't ingesting papers, add others if needed).

---

## 4. File Templates

Generate the following files. `<TOKENS>` are placeholders to fill from the bootstrap interview.

### 4.1 `CLAUDE.md` (the operating contract)

This is the **most important file** — it's what tells you (and every future Claude Code session) how the system works.

Use the reference implementation in this repo as your template: [`CLAUDE.md`](../CLAUDE.md). Copy it verbatim, then edit:

- Replace the "AI Knowledge Wiki" heading/intro with the user's topic statement.
- Replace the **Four Pillars** table with the pillars from bootstrap Q2.
- Replace **Source Types & Auto-Detection** rows if the user's source mix differs.
- Replace **Tag Taxonomy** categories with the user's starter tags from Q4.
- If the user has a single model only (Q6), replace the **Model Routing** section with: *"Single-model mode: all steps run on the user's available model. No sub-agent delegation."*
- **Confidentiality Scan (Step 0)** — keep as-is for public repos (Q7 = public). For private repos, the scan is optional; either drop the Step 0 section and its references in the workflows, or keep it as a lighter-weight sanity check (e.g., credentials only). Document the choice in the new repo's `CLAUDE.md` Guardrails so future sessions understand the threat model.
- Keep **Frontmatter Schemas**, **Tier 1/Tier 2 Workflows** (minus or including Step 0 per above), **CONNECT Step Detail**, **Query Workflow**, **Lint Workflow**, and **Guardrails** unchanged — these are the mechanics.

### 4.2 `index.md`

```markdown
# <Topic> Knowledge Wiki

## <Pillar 1 Name>

*No sources yet.*

## <Pillar 2 Name>

*No sources yet.*

<!-- ... one section per pillar ... -->

---

**0 sources** | **0 wiki pages** | [Ingest Log](log.md) | [Playbook](playbook.md)
```

As sources get ingested, you will add `### Sources` and `### Wiki Pages` subsections under each pillar, with markdown tables for sources and bulleted lists for wiki pages. See the reference [`index.md`](../index.md) for the exact format.

### 4.3 `log.md`

```markdown
# Ingest Log

<!-- Append-only. Most recent first. -->

| Date | Action | Source | Type | Tier | Updates |
|------|--------|--------|------|------|---------|
```

### 4.4 `playbook.md`

Start with empty section headers. Fill in as patterns emerge from actual work.

```markdown
# <Topic> Playbook

Living document. Append only; do not remove content without user approval.

## Workflows

## Principles

## Commands & Tool Tips

## Anti-Patterns

## Open Questions
```

### 4.5 `.gitignore`

```
# Intermediate subtitle files
*.srt
*.ttml
*.vtt

# Obsidian local config (if the user uses Obsidian as a frontend)
.obsidian/

# Claude Code local settings
.claude/settings.local.json

# OS
.DS_Store
Thumbs.db
```

### 4.6 `LICENSE`

Default to **CC BY 4.0** for a knowledge repo (content, not code). Fetch the text from https://creativecommons.org/licenses/by/4.0/legalcode.txt or use `gh api` to copy from an existing CC BY 4.0 repo. If the user prefers MIT or another license, use that instead.

### 4.7 `README.md`

Minimal pointer file:

```markdown
# <Topic> Knowledge Wiki

An LLM-maintained knowledge wiki about **<topic>**.

- **How to use it:** see [docs/user-documentation.md](docs/user-documentation.md)
- **How it was built / how to recreate it:** see [docs/concept.md](docs/concept.md)
- **Operating contract for Claude Code:** see [CLAUDE.md](CLAUDE.md)
- **Browse sources:** [index.md](index.md)
- **Living playbook:** [playbook.md](playbook.md)
```

---

## 5. Scripts

### 5.1 Transcript extraction

Copy [`scripts/extract-transcript.py`](../scripts/extract-transcript.py) from this repo into the new repo at the same path. It extracts YouTube captions (manual preferred, auto-generated fallback) as timestamped text via `yt-dlp`, with no `ffmpeg` dependency.

Runtime requirements (document these in `README.md` or `user-documentation.md`):

- Python 3.8+
- `yt-dlp` (`pip install yt-dlp` or platform equivalent)

The script outputs JSON: `{"status", "extraction_method", "subtitle_lang", "transcript"}`. `CLAUDE.md` already handles the `no_captions` fallback (prompt user to paste).

### 5.2 Optional future scripts

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

**Do not** configure branch protection, CI, or issue templates in the initial scaffold. Those are optional follow-ons the user can request later (e.g., a GitHub Action that runs the Lint Workflow on PRs, issue templates for "new source to ingest").

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
- **Never remove playbook content without user approval.**
- **Never skip the CONNECT step** — the wiki only compounds if new sources are cross-linked into existing pages.
- **Never download video/audio** — transcript extraction uses `--skip-download` internally.
- **Never pre-populate wiki pages** during scaffolding. Wiki pages are only born from real sources.

---

## 9. Handoff

Once `git push` succeeds:

1. Tell the user the repo URL.
2. Point them at `user-documentation.md` for daily usage.
3. Remind them that `CLAUDE.md` is the contract — if they want the agent to behave differently, edit `CLAUDE.md`.

That's the entire system. Everything else emerges from use.
