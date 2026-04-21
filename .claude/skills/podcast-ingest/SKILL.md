---
name: podcast-ingest
description: Ingest a podcast episode into the AI wiki. Handles full transcript acquisition pipeline (author website → YouTube mirror → manual paste), presents discovered sections for the user to select, and generates a structured summary. Use whenever the user provides a podcast URL (Apple Podcasts, Spotify, RSS, or any podcast episode link) and wants to add it to the wiki.
---

# Podcast Ingest

Ingest a podcast episode into the AI wiki following the same multi-tier pipeline as YouTube videos. Podcasts default to **Tier 2 (Deep Dive)**. All wiki conventions from CLAUDE.md apply.

## Content Lens

This wiki focuses on **AI in software development**. When reading transcripts, prioritize:

- How AI changes software development practices, workflows, and principles
- Tools introduced or compared (agents, IDEs, frameworks, APIs)
- Shifts in engineering mental models — how practitioners think differently because of AI
- Concrete techniques, patterns, and anti-patterns

Most episodes map to `building` (workflows, tool usage, agent patterns) or `ecosystem` (tools, products, companies). Capture `understanding` when the discussion shifts mental models rather than just explaining ML theory.

## Step 1 — Metadata

Fetch the podcast directory page (Apple Podcasts, Spotify, etc.) using WebFetch to extract:

- Episode title
- Show name
- Guest(s) if applicable
- Publication date
- Episode URL / canonical link

If the page is not fetchable, ask the user to confirm title, show, and date.

Check `index.md` for duplicates (match on URL or episode title). If already processed, inform the user.

Confirm metadata with the user before continuing.

## Step 2 — Slug

Generate slug: `YYYY-MM-DD_show-slug_episode-title-slug`

## Step 3 — Transcript Acquisition

Try in order. Stop at the first success.

### 3a — Author-published transcript

1. From the show name, infer or search for the show's website (WebSearch: `"<show name>" transcript site:<known-domain>` or `"<show name>" "<episode title>" transcript`)
2. WebFetch the episode page on the show's site or Substack
3. If a transcript is present, extract it verbatim

Many shows (e.g., Latent Space → latent.space) publish full transcripts. Check there first.

### 3b — YouTube mirror

Search for the episode on YouTube:

```
WebSearch: "<show name>" "<episode title>" site:youtube.com
```

Or use yt-dlp to find it:

```bash
yt-dlp "ytsearch1:<show name> <episode title>" --skip-download --print "%(webpage_url)s|||%(title)s|||%(upload_date)s|||%(id)s|||%(duration_string)s"
```

If found, extract transcript:

```bash
python scripts/extract-transcript.py "<youtube-url>"
```

Use `extraction_method` from the script output for the source frontmatter.

### 3c — Manual fallback

If both 3a and 3b fail, tell the user:

> "I couldn't find a transcript for this episode automatically. Please paste the transcript text (or a portion you'd like to capture), and I'll continue from there."

Set `extraction_method: "user-pasted"` in frontmatter.

## Step 4 — Save Source

Write to `sources/podcast/<slug>.md`:

```yaml
---
title: "<episode title>"
source_type: "podcast"
channel: "<show name>"
date: "<YYYY-MM-DD>"
url: "<canonical url>"
pillar: "<pillar>"
tags: [tag1, tag2]
ingested: "<today>"
extraction_method: "<method from step 3>"
---
```

Followed by the verbatim transcript. Never modify source content after saving.

## Step 5 — Focus & Discovery

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`.

Prompt the sub-agent with:
- Path to the source file
- Content lens (AI in software development — see top of this skill)
- Instructions: "Read the transcript. Identify 5-8 substantial sections or topic clusters that represent the episode's main threads. For each, write: a short title, the rough position in the episode (early/mid/late or timestamp if available), and a 1-2 sentence description of what's covered. Return the list in the format below."

**Format the sub-agent should return:**

```
A. [Early] Title of section
   What's covered in 1-2 sentences.

B. [Mid] Title of section
   ...
```

The Sonnet orchestrator presents this list to the user:

> "Here's what I found in this episode. Which sections do you want in the summary? Press Enter to capture all, or type letters (e.g. A, C, E):"

**Enter (or no response) = capture all sections.**

## Step 6 — Notes

Save to `notes/<slug>.md`:

```markdown
# Ingest Notes

**Source:** [<Title>](<URL>)

## Selected Sections
<!-- The sections the user chose to capture (or "All sections" if Enter was pressed) -->

## Section List
<!-- Full lettered list from Step 5, with chosen ones marked -->
```

## Step 7 — Summarize

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`.

Prompt the sub-agent with:
- Path to source file
- Path to notes file (selected sections)
- Summary frontmatter (title, tags, pillar, etc.)
- Content lens reminder
- Instructions: "Read the transcript and notes. Generate the summary for the selected sections only. Write it to `summaries/<slug>.md`."

**Summary structure** (write to `summaries/<slug>.md`):

```markdown
# <Title> — Summary

**Source:** <Show Name> | <Date> | [Link](<URL>)

## TL;DR
<!-- 2-3 sentences focused on the selected sections and what they argue -->

## Episode Structure
<!-- Numbered list of sections with position indicators.
  Format: "1. [Early/Mid/Late] Section Title — Brief description"
  Include only the sections the user selected.
  Omit timestamps if not available in the transcript. -->

## Key Concepts
<!-- H3 subheadings for terms or frameworks the speakers define or explain.
  Keep distinct from Key Takeaways (what things ARE vs. what's ARGUED). -->

## Key Takeaways
<!-- Numbered list of insights, claims, and recommendations from the episode.
  Each item:
  - The takeaway
  - **How to apply:** concrete next step where relevant -->

## Argument Structures
<!-- Trace non-obvious reasoning chains. Omit if the episode is purely
  instructional with no substantive arguments. -->

## Notable Commands / Code Snippets
<!-- Only if discussed in the episode. -->

## Related Topics
<!-- Tags as comma-separated list -->
```

Focus on the **selected sections only**, not the full episode.

## Step 8 — Connect

**Model: Opus sub-agent.** Spawn via Agent tool with `model: "opus"`.

Same as the standard CONNECT step in CLAUDE.md:
- Read the new summary
- Search `wiki/` for overlapping tags and topics
- Merge new information into relevant wiki pages
- Create new wiki pages if a substantial new topic is introduced
- Update `playbook.md` if actionable agentic coding practices appear
- Report all changes

## Step 9 — Index & Log

Add row to `index.md` under the correct pillar. Append entry to `log.md`:

```
<date> | INGEST | <title> | podcast | tier-2 | <what was updated in wiki>
```

## Guardrails

- Never download audio files — if no transcript is available, ask for a paste
- Always confirm metadata with the user before proceeding
- Check `index.md` for duplicates before fetching anything
- Sources are verbatim — never modify after saving
- Always report which wiki pages were created or modified (Step 8 output)
- If transcript extraction fails at all three methods, stop and ask rather than guessing
