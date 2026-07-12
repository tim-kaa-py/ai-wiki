# User Documentation — Knowledge Wiki

How to use this LLM-maintained knowledge wiki. Written for a human, but structured so you can also drop this whole file into a Claude Code session and ask "how do I use this system?"

---

## TL;DR

- Drop a URL or file, the agent handles the rest.
- Ask questions, the agent searches the wiki and answers with citations.
- Save reusable Claude Code prompts as "gists" — the agent files them under `gists/` with a confidentiality scan.
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

Plus a parallel track for **gists** (`gists/`) — your own reusable Claude Code prompts, intended to be shared. Gists are not summarized or cross-linked into the wiki. See [Save a gist](#5-save-a-gist).

Plus:

- `index.md` — master index. Your browse-entry.
- `gists/index.md` — index of your authored gists.
- `log.md` — chronological record of every ingest.
- `inbox/` — drop unprocessed files here.
- `notes/` — your focus notes from each deep-dive ingest (what *you* wanted captured). The agent writes them; they're yours to reread.
- `meta/` — the contradiction ledger (`contradictions.md`), the tension-triage calibration policy, and triage-run reports. See [What Happens at a Contradiction](#what-happens-at-a-contradiction).
- `ai-research/` — dated discovery reports from the optional daily briefing (see [Daily AI briefing](#8-daily-ai-briefing-optional)). Not part of the wiki; nothing here is ingested.

---

## Prerequisites

- **Claude Code** installed and signed in. This doc assumes you launch it inside the wiki repo's root.
- **Python 3** and **yt-dlp** (`pip install yt-dlp`) for YouTube/podcast transcript extraction. Needed only if you ingest video/audio sources.
- **`whisper.cpp`** (`brew install whisper-cpp`) plus **`ffmpeg`** (`brew install ffmpeg`) — optional, only for the no-captions fallback (see below). Also needs a ggml model under `~/whisper-models/` (default `ggml-large-v3-turbo.bin`). This is the same toolchain the `claude-video-vision` plugin uses, so if you have that set up you already have it.
- **`gh` CLI** only if you want to push changes or work across remotes — not required for daily use.

**No-captions fallback:** if a YouTube/podcast source has no captions at all, the agent automatically transcribes the audio locally with whisper.cpp (audio downloaded to a temp file, normalized with ffmpeg, then deleted — nothing is stored). It uses the model configured for the `claude-video-vision` plugin (default `large-v3-turbo`), Metal-accelerated on Apple Silicon. It only asks you to paste a transcript if this also fails. The script never installs anything: if `whisper-cli`, `ffmpeg`, or the model is missing, it prints the manual install command and the agent falls back to asking you to paste — it will **not** pip-install a second transcription stack.

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

For podcast episodes there's a dedicated skill: say **"/podcast-ingest \<episode URL\>"** (Apple Podcasts, Spotify, RSS, or any episode link). It handles the messier transcript acquisition (author website → YouTube mirror → manual paste) and lets you pick which discovered sections to keep before summarizing.

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

### 5. Save a gist

Paste a Claude Code prompt and ask to save it as a gist:

> Save this as a gist:
>
> [paste prompt]

Or describe an idea and ask the agent to draft and save it:

> Make a gist for: a Claude Code prompt that scaffolds a new Python CLI project with uv, ruff, and pytest.

The agent will:

1. Confirm title, intent, target model, tags.
2. Run a confidentiality scan (gists often inline project paths or tool names — these get caught here).
3. Save to `gists/<slug>.md` and append to `gists/index.md`.

Gists are *yours* — they're not summarized, not cross-linked into the wiki, and they don't count as knowledge ingests. They live in their own track so the wiki stays clean. See `CLAUDE.md` → "Gists Workflow" for the full contract.

### 6. Lint the wiki

Monthly-ish hygiene. The agent drains the contradiction queue at `meta/contradictions.md` first (re-presenting each open tension with a fresh recommendation), then checks for orphan sources, stale pages, index drift, log drift, additional contradictions, tag gaps, and OKF conformance (`scripts/okf-check.py` — the same check CI runs on every push). You approve fixes before they execute. See also [What Happens at a Contradiction](#what-happens-at-a-contradiction).

> Lint the wiki.

### 7. Override the agent

You are in charge. Useful overrides:

> Skip the interview this time.
>
> Use Opus for this one.
>
> Don't create a new wiki page — just merge into the existing \<page\>.
>
> Redo the summary — bias it toward \<angle\>.

### 8. Daily AI briefing (optional)

> /daily-ai-briefing

A discovery tool, separate from the wiki: it checks watched YouTube channels, trending Claude Code videos, Karpathy's gists, and a few AI blogs for anything new since the last run, then writes a dated report to `ai-research/` and commits it. **Nothing from a briefing is ingested** — if a report surfaces something worth keeping, paste its URL back in as a normal ingest. Requires `yt-dlp`; the trending section additionally wants a `YOUTUBE_API_KEY` env var and degrades gracefully without it.

---

## What Happens at a Contradiction

Most ingests merge silently into the wiki. Some don't — when a new source disagrees with a claim already on a wiki page, the agent stops and asks you. **You decide per tension; the agent then writes.**

### What you see

At the end of CONNECT, if the agent detected one or more conflicts, you get a batched menu. Per tension:

- The existing claim (verbatim, with file path + line number + which sources back it).
- The new claim (verbatim, with the new source + timestamp/section).
- Six options: `(a)` accept new, `(b)` keep old, `(c)` hold both, `(d)` synthesize, `(e)` split page, `(q)` queue for lint.
- An `AGENT'S READ` block with the agent's recommended letter, its reasoning, and *its strongest argument against itself*. The recommendation is a hint, not a default — nothing happens until you type a letter.

You reply with one line per tension, e.g. `1c 2a 3q` or `all q`.

### Honest deferral with `(q)`

`(q)` queues the tension to `meta/contradictions.md` and adds a small HTML comment on the affected page near the relevant claim. The wiki page body is **not** modified. This is the right answer when:

- You don't have time to read both positions carefully.
- You suspect a third source will clarify things.
- The disagreement is interesting but not urgent.

The next `lint the wiki` pass drains the queue and re-presents each open tension with a fresh agent recommendation that considers any sources you've added since. Most deferred tensions get resolved here, not at the original ingest.

### What option `(c)` does to a wiki page

`(c)` (hold both) adds an `## Unresolved Tensions` subsection to the wiki page with both quotes, both source citations, and the date the tension was surfaced. Pick this when you want the disagreement to be visible to a reader of the page, not just to your future self in the queue.

### What option `(a)` does to the loser

`(a)` (accept new) replaces the existing claim, **but the old claim doesn't disappear from the repo.** The wiki page gets a footnote near the new claim: *"Earlier versions of this page stated [old claim], per [source]; superseded by [new source] on [date]."* The original source and its summary are untouched. The wiki is lossy by design, but never silently lossy.

### Retroactive scanning: the tension-triage skill

Ingest-time detection only catches tensions as they enter. To find contradictions already sitting inside pages (manual edits, ingests that pre-date the system), say **"run tension triage"** or "scan the wiki for contradictions". A multi-agent pipeline scans pages batch-wise: a detector finds candidates, quotes are mechanically verified, an advocate and a harmonizer argue opposite sides, and an Opus judge rules. It may apply only non-destructive resolutions on its own ((b) keep old, (c) hold both — and only after a second Opus challenger confirms); anything needing your judgment lands in `meta/contradictions.md` for the next lint. Every run leaves a report in `meta/triage-runs/`. The agents follow the calibration rules in `meta/tension-policy.md`, which grow from your past decisions — if you want to supervise a run (see every verdict yourself), just say so. The full 80-page retroactive sweep was completed on 2026-07-08.

### Why this exists

Without this step, every ingest implicitly *resolves* tensions by merging — usually by smoothing them into bland prose that reads fine and drops the disagreement. After a hundred ingests, the wiki reads as confident knowledge but is quietly misinformed. The contradiction menu is the only thing standing between you and that failure mode. See `CLAUDE.md` → [Contradiction Handling at Ingest](../CLAUDE.md#contradiction-handling-at-ingest) for the full contract.

---

## How the Agent Decides

### Source type auto-detection

| URL pattern | Source type | Default tier |
|-------------|------------|-------------|
| youtube.com / youtu.be | youtube | Deep dive |
| Common podcast hosts | podcast | Deep dive |
| arxiv.org / `.pdf` | paper | Deep dive |
| github.com | repo | Deep dive |
| Official vendor documentation pages | docs | Quick clip |
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

### Where actionable practices live

Durable practices, workflows, and anti-patterns belong **inside the relevant wiki page** — a context-window discipline tactic goes into `wiki/concepts/context-engineering.md`, not into a central principles file. There is no separate playbook; the wiki itself is the living playbook.

---

## Confidentiality Scan

Because this wiki is a **public repo**, the agent runs a confidentiality scan on anything that is not obviously public content before it lands in `sources/` or `summaries/`.

### When it runs

**Scanned:**
- Files you drop into `inbox/` (unknown provenance).
- Content you paste directly into the session (transcripts, docs, notes).
- Sources you explicitly mark as your own (concepts, internal docs, personal notes you ingest as sources).
- **Every generated summary** — summaries fold in your focus notes, which can introduce context the original source did not have.

**Not scanned:**
- Public URLs the agent fetches itself (YouTube, podcast hosts, arxiv, GitHub, public articles/docs). The content is already published; scanning it adds no protection.

When in doubt, the agent runs the scan. False positives cost you one prompt; a leak costs a lot more.

### What the scan looks for

A Sonnet sub-agent, framed as a compliance specialist, looks for (and over-flags when uncertain):

- Client or customer names and identifiers.
- Internal project codenames or product names not publicly announced.
- Employee names and internal team references.
- Internal tool names, internal URLs, internal system identifiers.
- Credentials, API keys, tokens, connection strings.
- Financial figures tied to specific clients or unreleased deals.
- Unreleased client deliverables or pre-publication drafts.
- Anything that would embarrass the author or a third party if published.

### What you'll see when something is flagged

The agent pauses the workflow and shows a structured verdict:

- **Location** — which file, which lines / quoted span.
- **Category** — e.g., `client-name`, `internal-tool`, `credential`.
- **Concern** — one sentence on why this might be confidential.
- **3–4 remediation options** with pros/cons and a compliance risk assessment. One option is always *abort the ingest*.

You pick an option by letter, or write your own instruction. The agent applies the fix, re-scans, and repeats until the content is CLEAR or you abort. On abort, nothing gets written to `sources/` or `summaries/`.

### Known gaps

- **Manual edits bypass the scan.** If you edit a source, summary, or wiki page by hand outside the ingest workflow, the scan won't run automatically. Ask the agent to scan the file before you commit: *"Run a confidentiality scan on `summaries/<slug>.md` before I commit."*
- **Notes alongside a public source.** If you ingest a public YouTube transcript and add your own focus notes that contain internal context, the source scan is skipped (public content) but the **summary scan catches it** once the notes are folded in. The window between "you write the note" and "the summary runs" is the risk — keep it in mind when pasting focus bullets.

### Overriding the scan

You can tell the agent to skip the scan for a specific ingest (*"Skip the confidentiality scan — this is already public"*), or to run it on demand against a specific file (*"Scan `sources/notes/foo.md`"*). The scan is a guardrail, not a cage.

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

**CI runs on every push.** A GitHub Actions workflow (`.github/workflows/checks.yml`) re-validates OKF conformance and runs the script tests each time you (or the agent) push. If a push breaks conformance, GitHub emails you within a minute and the README badge turns red — you don't have to wait for the next lint pass to find out. Free for public repos.

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
- [`scripts/extract-transcript.py`](../scripts/extract-transcript.py) — YouTube/podcast caption extractor.
- [`scripts/transcribe-audio.py`](../scripts/transcribe-audio.py) — local audio→text fallback (whisper.cpp) for sources with no captions.
- [`scripts/okf-check.py`](../scripts/okf-check.py) — OKF v0.1 conformance checker; run by the Lint Workflow and by CI on every push.
- [`docs/private-modules.md`](private-modules.md) — pattern for author-private extensions mounted inside this repo (some skills may not be available in a public clone).

---

## Tim's Recommendations

New to the wiki? These are the questions worth asking first. Open the repo in Claude.ai or a Claude Code session and paste them in directly.

**Setup**
- "How do I set up the Claude Code status bar?"

**Getting started with Claude Code**
- "When should I use a skill vs. a subagent vs. a hook vs. MCP?"
- "What should go into my CLAUDE.md, and what shouldn't?"
- "How do I reduce permission prompts without giving up safety?"

**Understand the big ideas**
- "Explain harness engineering and why it's called the third era after prompt and context engineering."
- "Give me concrete tactics for keeping my context window clean."
- "Compare the agent memory systems covered in this wiki and tell me which fits a solo developer."
- "What is the LLM-wiki pattern this repo is built on — and what are its known failure modes?"

**See the wiki do its thing**
- "Where do my sources disagree? Show me the unresolved tensions."
- "What are the 5 levels of AI coding? Ask me questions to place me on the ladder."
- "GSD vs. Superpowers vs. vanilla Claude Code — what does the evidence in this wiki say?"

---

## When In Doubt

Ask. The agent can answer "how do I X in this system?" by reading `CLAUDE.md` and this file. If its answer contradicts what you want, update `CLAUDE.md` — that's how you teach the system.
