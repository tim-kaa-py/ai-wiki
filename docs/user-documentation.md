# User Documentation — Knowledge Wiki

How to use this LLM-maintained knowledge wiki. Written for a human, but structured so you can also drop this whole file into a Claude Code session and ask "how do I use this system?"

---

## TL;DR

- Drop a URL or file, the agent handles the rest.
- Ask questions, the agent searches the wiki and answers with citations.
- Say "lint" periodically to keep the wiki healthy.
- The agent maintains `index.md`, `log.md`, and cross-links automatically.

You do not edit `summaries/` or `wiki/` by hand. You curate what comes in and ask what comes out.

---

## The Mental Model

Three layers:

| Layer | What it is | Who maintains it |
|-------|-----------|-------|
| **Sources** (`sources/`) | Verbatim captures — transcripts, articles, paper text | Agent writes once, never modifies |
| **Summaries** (`summaries/`) | One opinionated summary per source, biased to your interests | Agent generates and regenerates |
| **Wiki** (`wiki/`) | Synthesized pages spanning multiple sources (concepts, tools, how-tos, people, comparisons) | Agent creates and updates over time |

Plus:

- `index.md` — master index. Your browse-entry.
- `log.md` — chronological record of every ingest.
- `playbook.md` — living practices/patterns the system has learned.
- `inbox/` — drop unprocessed files here.

---

## Prerequisites

- **Claude Code** installed and signed in. This doc assumes you launch it inside the wiki repo's root.
- **Python 3** and **yt-dlp** (`pip install yt-dlp`) for YouTube/podcast transcript extraction. Needed only if you ingest video/audio sources.
- **`gh` CLI** only if you want to push changes or work across remotes — not required for daily use.

Open the repo in your terminal, run `claude`, and you're working.

---

## Daily Workflows

### 1. Ingest a URL

Paste the URL. The agent auto-detects the type:

- **Article / blog / docs** → Tier 1 Quick Clip: fetch, summarize, cross-link, done. No interview.
- **YouTube / podcast / paper / GitHub repo** → Tier 2 Deep Dive: extract → you get a short interview about focus → summarize → cross-link.

Example prompts:

> Ingest https://example.com/some-article
>
> Deep-dive this: https://youtube.com/watch?v=xyz
>
> Quick clip: https://example.com/longread *(force Tier 1 on a source the agent would normally deep-dive)*

### 2. Ingest with notes

If you already know what you want captured, paste the URL **with your bullet points** underneath. The agent skips the open-ended interview and instead:

- Maps your bullets to timestamp ranges in the transcript.
- Proposes 3–5 additional discoveries from the source.
- Asks once which discoveries to include. You reply "all", specific letters, or "none".

Example:

> Ingest https://youtube.com/watch?v=xyz
> — wanted to capture: his claim that X, the demo of Y around the middle, any tool names

### 3. Process inbox

Drop files (PDFs, saved HTML, `.md` notes) into `inbox/`. Then:

> Process inbox.

The agent scans, classifies, ingests each item, and deletes them when done.

### 4. Ask a question

Just ask. The agent searches `wiki/` and `summaries/`, synthesizes an answer with citations.

Examples:

> What do I have on prompt engineering?
>
> Compare the tools I've saved in this area.
>
> Summarize what I know about \<person\>.

If the answer reveals a new insight worth keeping, the agent offers to create or update a wiki page.

### 5. Lint the wiki

Monthly-ish hygiene. The agent checks for orphan sources, stale pages, index drift, contradictions, and tag gaps. You approve fixes before they execute.

> Lint the wiki.

### 6. Override the agent

You are in charge. Useful overrides:

> Skip the interview this time.
>
> Use Opus for this one.
>
> Don't create a new wiki page — just merge into the existing \<page\>.
>
> Redo the summary — bias it toward \<angle\>.

---

## How the Agent Decides

### Source type auto-detection

| URL pattern | Source type | Default tier |
|-------------|------------|-------------|
| youtube.com / youtu.be | youtube | Deep dive |
| Common podcast hosts | podcast | Deep dive |
| arxiv.org / `.pdf` | paper | Deep dive |
| github.com | repo | Deep dive |
| Anything else | article | Quick clip |
| Anything in `inbox/` | article | Quick clip |

You can force a tier with "deep dive" or "quick clip".

### What goes in which wiki folder

- **Concepts** — ideas, frameworks, definitions.
- **Tools** — products, libraries, services.
- **How-tos** — step-by-step guides.
- **People** — individuals worth a dedicated page.
- **Comparisons** — side-by-side evaluations.

You rarely need to think about this. The agent places and you correct if it's wrong.

### What goes in `playbook.md`

Durable agentic-coding practices, workflows, and anti-patterns that survived contact with real work. The agent appends; it does not remove without your approval.

---

## Git / GitHub

The repo is a normal Git repo. Commit cadence is up to you. Practical options:

- **Commit after each ingest.** Low-ceremony snapshots; you can `git revert` any bad summary.
- **Commit once a day/week.** Less noise, bigger diffs.
- **Let the agent commit.** Ask: "commit the latest ingest with a concise message."

Push when you want backup / public sharing:

```bash
git push
```

If the repo is new and not yet on GitHub, ask the agent to run the setup (see `concept.md` §6) — it uses `gh repo create`.

---

## Customizing the System

Everything about the agent's behavior is in **`CLAUDE.md`**. Edit it directly to change:

- Pillars (top-level categories).
- Tag taxonomy.
- Source types and their default tiers.
- Summary section templates.
- Model routing (Sonnet for mechanics, Opus for analysis, or a single-model fallback).

Changes take effect the next time you start a Claude Code session in the repo.

---

## Common Pitfalls

- **Duplicate ingests.** The agent checks `index.md` for URL/video-ID matches before processing. If you want to re-ingest anyway, say so explicitly.
- **Wrong pillar on first ingests.** Pillars often feel wrong until 2–3 real sources land. Rename them in `CLAUDE.md` and `index.md` early — it gets harder once the wiki compounds.
- **Over-editing summaries.** If a summary feels off, ask the agent to regenerate with a different bias. Don't hand-edit — the next ingest's CONNECT step expects the template shape.
- **Manual wiki edits that fight the agent.** If you want a change to stick, either (a) tell the agent to make it, or (b) update `CLAUDE.md` to encode the new rule.

---

## Example Session

```
$ cd ~/my-wiki
$ claude

> Ingest https://www.youtube.com/watch?v=abc123
  — interested in: the argument about X, any concrete commands, tool names

[agent extracts, shows interview with your focus mapped to timestamps + discoveries]

> all

[agent writes source, summary, updates 2 wiki pages, updates index and log]

> What do I know about X now?

[agent searches wiki, cites 3 pages, synthesizes]

> Lint.

[agent reports 1 stale page, 2 orphan tags; you approve fixes]
```

---

## Reference Files

- [`CLAUDE.md`](../CLAUDE.md) — the operating contract. The agent reads this every session.
- [`concept.md`](concept.md) — architecture + recreation guide for a different topic.
- [`index.md`](../index.md) — browse everything.
- [`log.md`](../log.md) — chronological ingest history.
- [`playbook.md`](../playbook.md) — accumulated practices.
- [`scripts/extract-transcript.py`](../scripts/extract-transcript.py) — YouTube/podcast transcript extractor.

---

## When In Doubt

Ask. The agent can answer "how do I X in this system?" by reading `CLAUDE.md` and this file. If its answer contradicts what you want, update `CLAUDE.md` — that's how you teach the system.
