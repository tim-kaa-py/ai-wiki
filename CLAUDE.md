# AI Knowledge Wiki — Agent Schema

An LLM-maintained knowledge wiki about AI. The agent handles all bookkeeping: summarization, cross-referencing, index maintenance, and consistency. The human curates sources, directs analysis, and thinks critically.

## Architecture

Three layers:
1. **Sources** (`sources/`) — Raw, verbatim material. Never modified after saving.
2. **Summaries** (`summaries/`) — One-per-source, opinionated summaries focused on the user's interests.
3. **Wiki** (`wiki/`) — Synthesized pages that aggregate knowledge from multiple sources. LLM-maintained.

Plus: `playbook.md` (living agentic coding practices), `index.md` (master index), `log.md` (chronological ingest log), `inbox/` (unprocessed items).

## Model Routing

Default model: **Sonnet**. The main session runs on Sonnet for orchestration and mechanical steps. Analytical steps delegate to **Opus sub-agents** via the Agent tool.

| Step | Model | Why |
|------|-------|-----|
| 0 (Confidentiality Scan) | **Sonnet sub-agent** | Compliance check — isolated scan with structured verdict |
| 1-4 (metadata, slug, extract, save) | Sonnet | Mechanical — extraction, formatting, file I/O |
| 5 (Focus & Discovery) | **Opus sub-agent** | Deep reading — mapping focus to transcript, discovering non-obvious points |
| 6 (save notes) | Sonnet | Mechanical — file write |
| 7 (Summarize) | **Opus sub-agent** | Deep analysis — Key Concepts, Argument Structures, opinionated TL;DR |
| 8 (CONNECT) | **Opus sub-agent** | Synthesis — cross-source analysis, wiki page decisions |
| 9 (index & log) | Sonnet | Mechanical — append operations |
| Tier 1 Quick Clip | Sonnet (all steps) | Simpler content, no deep analysis needed |
| Query | Sonnet | Reading + synthesis over existing wiki pages |
| Lint | Sonnet | Structural checks, no deep reasoning |

**How to delegate:** Use the Agent tool with `model: "opus"`. Pass file paths in the prompt — let the sub-agent read files itself. Include the relevant CLAUDE.md template/instructions in the prompt so the sub-agent knows the expected output format.

**When to skip Opus:** If the source is purely instructional (feature walkthrough, tutorial) with no argumentative content, Steps 5 and 7 can stay on Sonnet. The user can override with "use Opus for this one" or "Sonnet is fine."

## Four Pillars

| Pillar | Slug | What goes here |
|--------|------|---------------|
| Building with AI | `building` | Hands-on coding, workflows, agent patterns, tool usage |
| Understanding AI | `understanding` | How things work — models, architectures, training, theory |
| AI Ecosystem | `ecosystem` | Tools, products, companies, releases, comparisons |
| My Lab | `lab` | Personal experiments, trials, what worked, what didn't |

## Source Types & Auto-Detection

| URL pattern / input | Source type | Folder | Default tier |
|---------------------|------------|--------|-------------|
| youtube.com, youtu.be | youtube | `sources/youtube/` | Deep dive |
| Podcast URLs (common hosts) | podcast | `sources/podcasts/` | Deep dive |
| arxiv.org, .pdf file | paper | `sources/papers/` | Deep dive |
| github.com (not gist) | repo | `sources/repos/` | Deep dive |
| Any other URL | article | `sources/articles/` | Quick clip |
| File in `inbox/` | article | `sources/articles/` | Quick clip |
| User says "deep dive" | (any) | — | Deep dive (override) |
| User says "quick" or "clip" | (any) | — | Quick clip (override) |

**Folder naming convention:** All `sources/` subdirectories use the **plural** form of the source type (`articles/`, `podcasts/`, `papers/`, `repos/`). Exception: `youtube/` stays singular — "youtubes" is not valid English for a proper noun.

## Slug Format

`YYYY-MM-DD_source-slug_title-slug`

- Lowercase, hyphens for spaces and special characters
- Max 60 characters for the title portion
- Date from source metadata (upload date, publication date)
- Source slug: channel name, author, or domain

## Frontmatter Schemas

### Source (`sources/<folder>/<slug>.md`, where `<folder>` is the plural folder from the table above)

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
source_file: "sources/<folder>/<slug>.md"
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

## Step 0 — Confidentiality Scan

This wiki is public. Before ingesting any source that is **not obviously public**, scan the content for confidential information that must not be published.

### When to run

**Run Step 0 when the source is NOT obviously public:**
- Files found in `inbox/` (unknown provenance)
- User-pasted content (transcripts, documents, text blobs)
- User-authored material (concepts, internal docs, personal notes the user explicitly ingests as a source)
- Any source where you are not certain the content is already publicly published

**Skip Step 0 when the source IS obviously public:**
- YouTube, podcast, arxiv, GitHub, and web article URLs fetched via WebFetch/yt-dlp (the content is already published)
- Documentation pages on public vendor sites

When in doubt, run the scan. The cost is low.

**Also run Step 0 on the generated summary** (after Step 7 / after Tier 1 Summarize), regardless of whether the source was scanned. Summaries fold in user notes and focus points which can introduce context the source did not have.

### Where it slots into the workflows

- **Tier 1 (Quick Clip):** For URL-paste entry, skip (source is public). For inbox/pasted content, run Step 0 after SAVE and before SUMMARIZE. Always run the summary scan after SUMMARIZE and before CONNECT.
- **Tier 2 (Deep Dive):** For public URLs (YT/podcast/paper/repo), skip the source scan. For user-supplied non-public material, run Step 0 **before Step 3 (Extract)** so we don't waste tokens on content that may be aborted. Always run the summary scan after Step 7 (Summarize) and before Step 8 (CONNECT).

### How to run

**Model: Sonnet sub-agent.** Spawn via Agent tool. The sub-agent does the scan in isolation and returns a structured verdict.

Prompt the sub-agent with:
- Path(s) to the content to scan
- Role framing: *"You are a compliance specialist reviewing content for public publication in an open-source knowledge wiki. You also understand the value of publishing useful technical content — your goal is to enable safe publication, not to strip everything that could theoretically be sensitive."*
- What to look for (use judgment, over-flag in doubt):
  - Client/customer names and identifiers
  - Internal project codenames or product names not publicly announced
  - Employee names and internal team references
  - Internal tool names, internal URLs, internal system identifiers
  - Credentials, API keys, tokens, connection strings
  - Financial figures tied to specific clients or unreleased deals
  - Unreleased client deliverables or pre-publication drafts
  - Anything that would embarrass the author or a third party if published
- Rule: **when uncertain, flag it and let the user decide.** False positives cost one prompt; false negatives cost a leak.

### Expected sub-agent output

Return a structured verdict:

```
VERDICT: CLEAR | FLAGGED

If FLAGGED, for each issue:
- LOCATION: file path + line range or quoted span
- CATEGORY: (client-name | internal-tool | credential | employee | financial | unreleased | other)
- CONCERN: one-sentence explanation of why this is potentially confidential

REMEDIATION OPTIONS (3-4 options, compliance-specialist framing):
Option A: <description>
  - Pros: <what this preserves>
  - Cons: <what this loses>
  - Compliance assessment: <risk level after applying this option>
Option B: ...
Option C: ...
(Option D: abort the ingest — always include this)
```

### Handling the verdict

- **CLEAR:** Proceed to the next workflow step. No user interaction needed.
- **FLAGGED:** Present the full verdict and options to the user. Wait for the user to choose an option (by letter) or provide custom instructions. Do not proceed until the user has resolved every flagged item.
- After remediation, re-scan the revised content before proceeding. Repeat until CLEAR or the user aborts.

If the user chooses to abort, stop the workflow. Do not write partial artifacts to `sources/` or `summaries/`.

## Tier 1 — Quick Clip Workflow

**Model: Sonnet (all steps).** Quick clips don't require deep analysis.

For articles, blog posts, documentation, web clips. Fast, no interview.

### Entry Point A: URL Paste

User pastes a URL (not YouTube/podcast/arxiv/github).

1. **DETECT** — Identify source type from URL pattern
2. **FETCH** — Retrieve content via WebFetch
3. **CLASSIFY** — Assign pillar and tags based on content
4. **SLUG** — Generate slug from author/domain + title + date
5. **SAVE** — Write verbatim content to `sources/<folder>/<slug>.md` with frontmatter
6. **SUMMARIZE** — Generate `summaries/<slug>.md`:
   - TL;DR (2-3 sentences)
   - Key Takeaways (numbered, with **How to apply** for actionable items)
   - Notable Commands/Snippets (if applicable)
   - Related Topics (tags)
7. **SCAN SUMMARY** — Run Step 0 on the generated summary. Resolve any flags before proceeding.
8. **CONNECT** — Update wiki pages (see CONNECT step below)
9. **INDEX** — Add row to `index.md` under correct pillar
10. **LOG** — Append entry to `log.md` (date, action, source, type, tier, what was updated)

### Entry Point B: Inbox Processing

User says "process inbox" or similar.

1. **SCAN** — List all files in `inbox/`
2. **For each file:** READ → **Step 0 (Confidentiality Scan — inbox files are non-public by default)** → CLASSIFY → SLUG → move to `sources/<folder>/` → SUMMARIZE → **Scan summary (Step 0)** → CONNECT → INDEX → LOG
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

**If the source is not obviously public** (e.g., user-supplied document rather than a public URL), run the **Confidentiality Scan (Step 0)** on the raw source material now, before Extract. For public URLs (YouTube, podcast, arxiv, GitHub, web articles), skip the source scan — the summary scan after Step 7 is sufficient.

### Step 3 — Extract

**YouTube/Podcast:**
```bash
python scripts/extract-transcript.py "<URL>"
```
The script outputs JSON: `{"status", "extraction_method", "subtitle_lang", "transcript"}`.

If `status` is `"no_captions"`, ask the user to paste the transcript manually.

Use `extraction_method` from the output to set the source frontmatter field.

**Paper:** Read PDF, extract full text.

**GitHub repo:** Analyze README, directory structure, key source files. Produce a structured analysis.

### Step 4 — Save

Write to `sources/<folder>/<slug>.md` with full frontmatter. Content is verbatim — never edit after saving.

### Step 5 — Focus & Discovery

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`. Prompt the sub-agent with:
- Path to the source file (for transcript)
- The user's notes (inline or path to notes file)
- Instructions: "Read the transcript. Map the user's focus points to timestamp ranges. Identify 3-5 notable points not covered by the user's notes. Return the extraction plan in the format below."

The sub-agent returns the extraction plan. The Sonnet orchestrator presents it to the user for confirmation.

Two modes depending on whether the user provided notes with the URL.

**Mode A — Notes provided (user pasted bullet points of what to capture):**

1. Parse the user's notes into focus points
2. Read the full transcript and map each focus point to timestamp ranges
3. Identify 3-5 notable points in the transcript NOT covered by the user's notes
4. Present an extraction plan:
   - **Your focus points:** each mapped to timestamps
   - **Also in this transcript:** discovered points with timestamp, one-line description, and why it's relevant
5. User confirms which discoveries to include (all / specific letters / none)

This is a single interaction — present the plan, get one response.

**Mode B — No notes (URL only):**

1. Read the transcript first
2. Ask one question: "What caught your attention? Any specific topics, workflows, or concepts to capture? Anything to exclude?"
3. Then proceed with Mode A steps 3-5 using the response as focus points

### Step 6 — Notes

Save focus and confirmed discoveries to `notes/<slug>.md`:

```markdown
# Ingest Notes

**Source:** [<Title>](<URL>)

## User Focus
<!-- Bullet list from user's notes (Mode A) or interview response (Mode B) -->

## Confirmed Discoveries
<!-- Discoveries from the extraction plan the user chose to include.
  Omit if user added none. -->
```

### Step 7 — Summarize

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`. Prompt the sub-agent with:
- Path to the source file (for transcript)
- Path to the notes file (for user focus + confirmed discoveries)
- The summary frontmatter to use (title, tags, pillar, etc.)
- Instructions: "Read the transcript and notes. Generate the summary following the template below. Write it to `summaries/<slug>.md`."

The sub-agent writes the summary file directly and returns a confirmation.

Generate `summaries/<slug>.md` with this structure:

```markdown
# <Title> — Summary

**Source:** <Channel/Author> | <Date> | [Link](<URL>) | <Duration/Size>

## TL;DR
<!-- 2-3 sentences focused on what the user found interesting -->

## Video Structure
<!-- Numbered list of the video's narrative sections with timestamps.
  Format: "1. [MM:SS-MM:SS] Section Title — Brief description"
  Purpose: navigation aid and understanding the creator's framing.
  Omit for non-video sources (articles, papers, repos). -->

## Key Concepts
<!-- H3 subheadings for each concept the creator explains or defines.
  For each concept:
  - Brief definition in the creator's own framing
  - If the creator's definition meaningfully diverges from the standard/common
    understanding, note the difference
  Purpose: definitional knowledge — what things ARE.
  Keep this distinct from Key Takeaways (what the creator ARGUES). -->

## Key Takeaways
<!-- Numbered list of the creator's insights, claims, and arguments.
  Each item includes:
  - The takeaway itself
  - **How to apply:** concrete next step or command
  Purpose: actionable insights — what the creator ARGUES or RECOMMENDS.
  Keep this distinct from Key Concepts (what things ARE). -->

## Argument Structures
<!-- Trace the creator's reasoning chains where they make non-obvious arguments.
  Format flexibly — use whatever structure best captures the logic:
  - Premises → conclusion
  - If X then Y, because Z
  - Nested reasoning with sub-conclusions
  Be faithful to the creator's actual arguments.
  Omit this section if the source is purely instructional/tutorial with no
  argumentative content (e.g., a feature walkthrough). -->

## Notable Commands / Code Snippets
<!-- Code blocks with context. Only include what's actually useful. -->

## User Notes
<!-- Personal takeaways from the interview -->

## Related Topics
<!-- Tags as comma-separated list -->
```

Focus on what the USER found interesting, not a generic overview.

**Section usage rules:**
- **Video Structure:** Include for YouTube/podcast sources. Omit for articles, papers, repos.
- **Key Concepts:** Include when the creator explains or defines terms/concepts. Omit if no concepts worth defining separately.
- **Argument Structures:** Include when the creator makes substantive arguments. Omit for purely instructional content (feature walkthroughs, tutorials, how-tos with no argumentation).

**After the summary is written, run the Confidentiality Scan (Step 0) on `summaries/<slug>.md`.** The summary folds in user notes and focus points, which can introduce context the source did not have. Resolve any flags before proceeding to Connect.

### Step 8 — Connect

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`. Prompt the sub-agent with:
- Path to the new summary
- Instructions: "Read the summary. Search wiki/ for relevant pages. For each relevant page, merge new information. Create new wiki pages if needed. Update playbook.md if applicable. Report what was updated."

The sub-agent handles all wiki reads, searches, and writes. Returns a report of changes to the Sonnet orchestrator.

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
- **Check for yt-dlp** — run `which yt-dlp` before using it. If missing, suggest installation. (ffmpeg is NOT required.)
- **Check for Python** — run `python --version` before using `extract-transcript.py`. If missing, suggest installation.
- **Check for duplicates** — search `index.md` for the URL or video ID before processing
- **Sources are verbatim** — never modify source content after saving. Exception: re-extraction with upgraded tooling is allowed (same content, better formatting).
- **Summaries are opinionated** — focus on the user's interests, not exhaustive coverage
- **Wiki pages are synthesized** — combine multiple sources, maintain over time
- **Playbook updates are additive** — don't remove content without user approval
- **Always confirm metadata** with user before proceeding (Tier 2 only)
- **Log every ingest** to `log.md`
- **Report CONNECT updates** — always tell the user which wiki pages were created or modified
- **This repo is public** — run the **Confidentiality Scan (Step 0)** on every non-public source before extract/summarize, and on every generated summary before CONNECT. When in doubt whether something is public, run the scan.
- **Manual edits are not scanned automatically** — if the user (or Claude) edits a source, summary, or wiki page by hand outside the ingest workflow, ask Claude to run a confidentiality pass on the edited file before committing. The Step 0 workflow only runs when a workflow runs.
- **Keep docs in sync with CLAUDE.md** — when CLAUDE.md is functionally extended or changed, update `docs/user-documentation.md` and `docs/concept.md` in the same response. See [Self-Documentation Rule](#self-documentation-rule) for what counts as a functional change and which doc receives which update.

## Self-Documentation Rule

This repo has three doc surfaces with distinct audiences. Keeping them in sync is part of every functional change, not a separate cleanup task.

| Surface | Audience | Purpose |
|---------|----------|---------|
| `CLAUDE.md` | The agent | Operating contract. Authoritative. |
| `docs/user-documentation.md` | The human user | Daily usage, overrides, pitfalls. |
| `docs/concept.md` | A different agent recreating the system | Architecture + scaffolding guide. |

### What counts as a functional change

**In scope (trigger the rule):**
- New workflow step, or a changed trigger/order for an existing step.
- New or changed guardrail that affects agent behavior.
- Changed model routing (which step runs on which model).
- New frontmatter field, new slug rule, new tag-taxonomy category.
- New script, or a breaking change to an existing script's interface.
- New public/private-repo consideration.
- Any change to what the user sees, has to know, or can do.

**Out of scope (do NOT trigger the rule):**
- Typo fixes, wording tweaks, reformatting.
- Internal examples that don't change behavior.
- Edits that clarify without changing rules.

### Routing table

| Change type | Update `CLAUDE.md` | Update `user-documentation.md` | Update `concept.md` |
|-------------|:------------------:|:------------------------------:|:-------------------:|
| New/changed workflow step visible to the user | ✓ (authoritative) | ✓ (what the user sees) | ✓ if it's a recreation-template consideration |
| New guardrail with user impact | ✓ | ✓ | — unless public/private relevant |
| New guardrail, agent-internal only | ✓ | — | — |
| Changed model routing | ✓ | ✓ if it changes cost/speed the user notices | ✓ (template consideration for recreation) |
| New frontmatter / schema field | ✓ | — unless the user edits files by hand | ✓ (template consideration) |
| New script / breaking script change | ✓ | ✓ (prerequisites + usage) | ✓ (scripts section) |
| Public/private-repo consideration | ✓ | ✓ | ✓ (bootstrap interview + template section) |
| Typo / wording / formatting | as needed | as needed | as needed |

### Timing

Update the docs in the **same response** as the CLAUDE.md change. Context is loaded, rationale is fresh, routing decisions are obvious. Do not defer to a "cleanup pass later" — later never comes.

### Cross-check

After editing the docs:
1. Re-read the changed sections in `CLAUDE.md`.
2. Verify the docs describe the same behavior using the same terminology.
3. Reconcile any contradictions — CLAUDE.md is authoritative; docs follow.

### Out of this rule's scope

- `playbook.md` — user-approval required for changes; not auto-updated.
- `MEMORY.md` — session-side memory, not repo documentation.
- `README.md` — minimal pointer file; update only if links break or top-level structure changes.

### Enforcement

This rule lives in CLAUDE.md and is agent-enforced. There is no pre-commit hook. Manual edits to CLAUDE.md made outside a Claude Code session bypass it — after such edits, ask Claude to "sync the docs with CLAUDE.md" as a recovery step.
