# AI Knowledge Wiki — Agent Schema

An LLM-maintained knowledge wiki about AI. The agent handles all bookkeeping: summarization, cross-referencing, index maintenance, and consistency. The human curates sources, directs analysis, and thinks critically.

## Architecture

Three layers:
1. **Sources** (`sources/`) — Raw, verbatim material. Never modified after saving.
2. **Summaries** (`summaries/`) — One-per-source, opinionated summaries focused on the user's interests.
3. **Wiki** (`wiki/`) — Synthesized pages that aggregate knowledge from multiple sources. LLM-maintained.

Plus: `playbook.md` (living agentic coding practices), `index.md` (master index), `log.md` (chronological ingest log), `inbox/` (unprocessed items).

## Four Pillars

| Pillar | Slug | What goes here |
|--------|------|---------------|
| Building with AI | `building` | Hands-on coding, workflows, agent patterns, tool usage |
| Understanding AI | `understanding` | How things work — models, architectures, training, theory |
| AI Ecosystem | `ecosystem` | Tools, products, companies, releases, comparisons |
| My Lab | `lab` | Personal experiments, trials, what worked, what didn't |

## Source Types & Auto-Detection

| URL pattern / input | Source type | Default tier |
|---------------------|------------|-------------|
| youtube.com, youtu.be | youtube | Deep dive |
| Podcast URLs (common hosts) | podcast | Deep dive |
| arxiv.org, .pdf file | paper | Deep dive |
| github.com (not gist) | repo | Deep dive |
| Any other URL | article | Quick clip |
| File in `inbox/` | article | Quick clip |
| User says "deep dive" | (any) | Deep dive (override) |
| User says "quick" or "clip" | (any) | Quick clip (override) |

## Slug Format

`YYYY-MM-DD_source-slug_title-slug`

- Lowercase, hyphens for spaces and special characters
- Max 60 characters for the title portion
- Date from source metadata (upload date, publication date)
- Source slug: channel name, author, or domain

## Frontmatter Schemas

### Source (`sources/<type>/<slug>.md`)

```yaml
---
title: "<title>"
source_type: "youtube|podcast|article|paper|repo|docs|note"
channel: "<author/channel/org>"
date: "<YYYY-MM-DD>"
url: "<url>"
pillar: "building|understanding|ecosystem|lab"
tags: [tag1, tag2]
ingested: "<YYYY-MM-DD>"
extraction_method: "auto-captions|manual-captions|web-fetch|pdf-extract|user-pasted"
# Optional (source-type specific):
video_id: "<id>"
duration: "<duration>"
---
```

### Summary (`summaries/<slug>.md`)

```yaml
---
title: "<title>"
source_type: "<type>"
channel: "<author>"
date: "<YYYY-MM-DD>"
url: "<url>"
pillar: "<pillar>"
tags: [tag1, tag2]
ingested: "<YYYY-MM-DD>"
source_file: "sources/<type>/<slug>.md"
---
```

### Wiki Page (`wiki/<type>/<slug>.md`)

```yaml
---
title: "<topic>"
type: "concept|tool|how-to|person|comparison"
pillar: "<pillar>"
tags: [tag1, tag2]
sources:
  - "summaries/<slug1>.md"
  - "summaries/<slug2>.md"
last_updated: "<YYYY-MM-DD>"
---
```

## Tier 1 — Quick Clip Workflow

For articles, blog posts, documentation, web clips. Fast, no interview.

### Entry Point A: URL Paste

User pastes a URL (not YouTube/podcast/arxiv/github).

1. **DETECT** — Identify source type from URL pattern
2. **FETCH** — Retrieve content via WebFetch
3. **CLASSIFY** — Assign pillar and tags based on content
4. **SLUG** — Generate slug from author/domain + title + date
5. **SAVE** — Write verbatim content to `sources/<type>/<slug>.md` with frontmatter
6. **SUMMARIZE** — Generate `summaries/<slug>.md`:
   - TL;DR (2-3 sentences)
   - Key Takeaways (numbered, with **How to apply** for actionable items)
   - Notable Commands/Snippets (if applicable)
   - Related Topics (tags)
7. **CONNECT** — Update wiki pages (see CONNECT step below)
8. **INDEX** — Add row to `index.md` under correct pillar
9. **LOG** — Append entry to `log.md` (date, action, source, type, tier, what was updated)

### Entry Point B: Inbox Processing

User says "process inbox" or similar.

1. **SCAN** — List all files in `inbox/`
2. **For each file:** READ → CLASSIFY → SLUG → move to `sources/<type>/` → SUMMARIZE → CONNECT → INDEX → LOG
3. **CLEAN** — Delete processed files from `inbox/`

## Tier 2 — Deep Dive Workflow

For YouTube videos, podcasts, academic papers, GitHub repos. Full extraction + interview.

### Step 1 — Metadata

Extract metadata appropriate to source type:

**YouTube/Podcast:**
```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(id)s|||%(duration_string)s" "<URL>"
```

**Paper:** Extract title, authors, date, abstract from PDF or arxiv page.

**GitHub repo:** Extract repo name, description, primary language, stars, last activity.

Parse output and confirm with user: title, author/channel, date, duration/size.

Check `index.md` for duplicates (match on URL or video ID). If already processed, inform user and ask whether to redo.

### Step 2 — Slug

Generate slug from metadata: `YYYY-MM-DD_source-slug_title-slug`

### Step 3 — Extract

**YouTube/Podcast:**
```bash
./scripts/extract-transcript.sh "<URL>" "<SLUG>"
```
If output is `NO_CAPTIONS`, ask the user to paste the transcript manually.

**Paper:** Read PDF, extract full text.

**GitHub repo:** Analyze README, directory structure, key source files. Produce a structured analysis.

### Step 4 — Save

Write to `sources/<type>/<slug>.md` with full frontmatter. Content is verbatim — never edit after saving.

### Step 5 — Interview

Ask one question at a time. Adapt based on responses. Skip questions already answered. Probe if answers are vague.

1. "What was the main topic or technique that caught your attention?"
2. "Were there specific tips, commands, or workflows you want to capture?"
3. "Any timestamps or sections you found most valuable? (I can look them up in the transcript)"
4. "Anything you want to try in your own projects? Immediate takeaway?"
5. "Additional notes or context for the summary?"

### Step 6 — Notes

Save all interview responses to `notes/<slug>.md` with header linking to the source.

### Step 7 — Summarize

Generate `summaries/<slug>.md` with this structure:

```markdown
# <Title> — Summary

**Source:** <Channel/Author> | <Date> | [Link](<URL>) | <Duration/Size>

## TL;DR
<!-- 2-3 sentences focused on what the user found interesting -->

## Key Takeaways
<!-- Numbered list. Each item includes:
  - The takeaway itself
  - **How to apply:** concrete next step or command -->

## Notable Commands / Code Snippets
<!-- Code blocks with context. Only include what's actually useful. -->

## User Notes
<!-- Personal takeaways from the interview -->

## Related Topics
<!-- Tags as comma-separated list -->
```

Focus on what the USER found interesting, not a generic overview.

### Step 8 — Connect

See CONNECT step detail below.

### Step 9 — Index & Log

Add row to `index.md` under correct pillar. Append entry to `log.md`.

## CONNECT Step Detail

This is the step that makes the wiki compound. Run after every ingest (both tiers).

1. **Read the summary** just generated
2. **Search existing wiki pages** — grep `wiki/` for overlapping tags and topics
3. **For each relevant wiki page:**
   - Read it
   - Merge new information (add, don't replace existing content)
   - Add the new summary to the `sources` list in frontmatter
   - Update `last_updated`
4. **New wiki page needed?** If the source introduces a substantial topic not yet covered:
   - Create a new page in the appropriate `wiki/` subdirectory
   - Concepts → `wiki/concepts/`, Tools → `wiki/tools/`, How-tos → `wiki/how-tos/`, People → `wiki/people/`, Comparisons → `wiki/comparisons/`
5. **Playbook update?** If the source contains actionable agentic coding practices, workflows, or tool tips:
   - Read `playbook.md`
   - Add new principles, workflows, commands, or anti-patterns
   - Attribute the source
   - Do NOT remove existing playbook content without user approval
6. **Report what was updated** — tell the user which wiki pages were created or modified

## Query Workflow

When the user asks a question (not providing a URL to ingest):

1. **SEARCH** — Grep `wiki/` and `summaries/` for relevant terms
2. **READ** — Load the most relevant pages (up to 5-8)
3. **SYNTHESIZE** — Answer the question with citations: `[Source: filename.md]`
4. **FILE** — If the answer reveals a new insight worth keeping, suggest creating or updating a wiki page

## Lint Workflow

When the user says "lint", "check wiki health", or similar:

1. **ORPHANS** — Sources with no summary, summaries not referenced by any wiki page
2. **STALE** — Wiki pages not updated in 90+ days that have active related topics
3. **INDEX SYNC** — Entries in `index.md` that don't match actual files, and vice versa
4. **LOG SYNC** — Sources not recorded in `log.md`
5. **CONTRADICTIONS** — Wiki pages with conflicting claims from different sources
6. **GAPS** — Tags with many sources but no wiki page; suggest pages to create
7. **REPORT** — Present findings as actionable items. User approves fixes before execution.

## Tag Taxonomy

Tags emerge organically but follow these categories:

**Topic:** `prompt-engineering`, `agents`, `rag`, `fine-tuning`, `evaluation`, `training`, `inference`, `safety`, `multimodal`, `scaling`

**Tool:** `claude-code`, `claude`, `openai`, `cursor`, `copilot`, `langchain`, `llamaindex`

**Format:** `how-to`, `concept`, `comparison`, `cheatsheet`, `opinion`, `tutorial`, `paper`, `reference`

**Cross-cutting:** `strategy`, `workflow`, `architecture`, `debugging`, `testing`, `best-practices`, `anti-patterns`

Use existing tags when possible. Create new tags sparingly. Keep tags lowercase, hyphenated.

## Guardrails

- **Never download video/audio files** — always use `--skip-download`
- **Check for yt-dlp** — run `which yt-dlp` before using it. If missing, suggest installation.
- **Check for duplicates** — search `index.md` for the URL or video ID before processing
- **Sources are verbatim** — never modify source content after saving
- **Summaries are opinionated** — focus on the user's interests, not exhaustive coverage
- **Wiki pages are synthesized** — combine multiple sources, maintain over time
- **Playbook updates are additive** — don't remove content without user approval
- **Always confirm metadata** with user before proceeding (Tier 2 only)
- **Log every ingest** to `log.md`
- **Report CONNECT updates** — always tell the user which wiki pages were created or modified
