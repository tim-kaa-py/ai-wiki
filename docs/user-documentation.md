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
- `ai-research/` — dated discovery reports from the optional daily briefing (see [Daily AI briefing](#8-daily-ai-briefing-optional)). Local only: the folder is gitignored, so reports never reach the public repo. Not part of the wiki; nothing here is ingested.
- `.claude/` — the agent's procedures. `skills/` holds one skill per workflow (`ingest`, which also handles podcast episodes through its `podcast.md` reference, `connect`, `gist`, `lint`, `query`, `wiki-tension-triage`, `daily-ai-briefing`, the `linkedin-*` proxies), `rules/frontmatter.md` holds the file schemas, `hooks/` and `settings.json` hold two enforcement hooks. `CLAUDE.md` at the root is the short standing contract that points at all of this.

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

Podcast episodes go through the same `ingest` skill: just paste the episode URL (Apple Podcasts, Spotify, RSS, or any episode link). They always run as a deep dive, with two differences. Transcript acquisition tries, in order, a transcript on the show's own website, a YouTube mirror of the episode, local whisper transcription (`scripts/transcribe-audio.py`), and only then asks you to paste one. Instead of the focus interview you get a lettered list of the episode's main sections; reply `all` or the letters you want (e.g. `A C E`), and the summary covers only those. A transcript you paste gets the confidentiality scan before it is saved, and the podcast summary gets it like every other summary.

Every ingest, quick clip or deep dive, shows a progress checklist that the agent ticks off as it goes.

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

For each file the agent extracts the text, runs the confidentiality scan on it, saves it as a Markdown source with frontmatter, summarizes, scans the summary, cross-links, and then deletes the original. `inbox/` is empty afterwards, except for any original you chose to keep by aborting its scan.

### 4. Ask a question

Just ask. The agent searches `index.md`, `wiki/` and `summaries/`, then answers with citations in the form `[Source: <slug>]`. Where sources disagree, it says so rather than averaging them. If the wiki has nothing on the topic, it tells you, offers to ingest a source, and labels anything from general knowledge as not from the wiki.

Examples:

> What do I have on prompt engineering?
>
> Compare the tools I've saved in this area.
>
> Summarize what I know about \<person\>.

If the answer reveals a new insight worth keeping, the agent offers to create or update a wiki page, and writes nothing until you agree. Filing a page runs a tension check against overlapping pages (a fresh Opus sub-agent, same menu as at ingest), a confidentiality scan when the page carries anything from the conversation that is not in the cited summaries, an `index.md` update including the footer count, and a log entry.

### 5. Save a gist

Paste a Claude Code prompt and ask to save it as a gist:

> Save this as a gist:
>
> [paste prompt]

Or describe an idea and ask the agent to draft and save it:

> Make a gist for: a Claude Code prompt that scaffolds a new Python CLI project with uv, ruff, and pytest.

The agent will:

1. Confirm title, intent, target model (`sonnet`, `opus`, `haiku` or `fable`), prerequisites (optional), and tags.
2. Run a confidentiality scan (gists often inline project paths or tool names — these get caught here).
3. Save to `gists/<slug>.md` and append to `gists/index.md`.

Gists are *yours* — they're not summarized, not cross-linked into the wiki, and they don't count as knowledge ingests. They live in their own track so the wiki stays clean. See `.claude/skills/gist/SKILL.md` for the full contract.

### 6. Lint the wiki

Monthly-ish hygiene. Say it in plain words or type `/lint`. The agent opens with the count of open entries in `meta/contradictions.md` and drains that queue first, re-presenting each open tension with a fresh recommendation (answer `all q` to defer them all again). Then it runs the structural checks: orphan sources, summaries and gists; stale pages; index drift (summaries and wiki pages only, plus the footer counts); log drift (matched by URL or title); a non-empty `inbox/`; stray `<!-- TENSION -->` markers with no open ledger entry; and tag gaps. It reports everything, you approve the fixes, it applies them and re-runs the affected checks. OKF conformance (`scripts/okf-check.py` — the same check CI runs on every push) runs last, on the final state. Every run is logged, clean ones included. Lint does not hunt for new contradictions inside pages; that is the [tension-triage skill](#retroactive-scanning-the-tension-triage-skill). See also [What Happens at a Contradiction](#what-happens-at-a-contradiction).

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

A discovery tool, separate from the wiki, and only ever started by you typing the command (the agent never triggers it on its own): it checks watched YouTube channels, trending Claude Code videos, Karpathy's gists, and a few AI blogs for anything new since the last run, then writes a dated report to `ai-research/`. That folder is gitignored, so the report stays on your machine and is never committed or pushed; this repo is public. "Trending" means the most-viewed Claude Code videos published since the last report, and anything listed in any earlier report is skipped. The run ends by checking its own report (every section present, no repeats) before telling you the path. If you ask for a briefing in words, the agent points you to the command. **Nothing from a briefing is ingested** — if a report surfaces something worth keeping, paste its URL back in as a normal ingest. Requires `yt-dlp`; the trending section additionally wants a `YOUTUBE_API_KEY` env var and degrades gracefully without it.

---

## What Happens at a Contradiction

Most ingests merge silently into the wiki. Some don't — when a new source disagrees with a claim already on a wiki page, the agent stops and asks you. **You decide per tension; the agent then writes.**

### What you see

CONNECT runs on every ingest, quick clips and tutorials included, on fresh Opus sub-agents started from the main session. Before showing you anything, the agent greps every quoted claim and every addition the sub-agent reports against the actual files, so a misquote or a contradiction slipped in as an "addition" gets caught. If one or more tensions remain, you get a batched menu. Per tension:

- The existing claim (verbatim, with file path + line number + which sources back it).
- The new claim (verbatim, with the new source + timestamp/section).
- Six options: `(a)` accept new, `(b)` keep old, `(c)` hold both, `(d)` synthesize, `(e)` split page, `(q)` queue for lint.
- An `AGENT'S READ` block with the agent's recommended letter, its reasoning, and *its strongest argument against itself*. The recommendation is a hint, not a default — nothing happens until you type a letter.

You reply with one line per tension, e.g. `1c 2a 3q` or `all q`.

`(d)` and `(e)` take one more round. For `(d)` you see the drafted rewrite and answer `approve` (written as shown), `amend` (with your change; you see a new draft) or `revert` (falls back to `(c)`). For `(e)` you see the proposed split; approve it and the new page is created and indexed, or decline it and pick another letter.

### Honest deferral with `(q)`

`(q)` queues the tension to `meta/contradictions.md` and adds a small HTML comment (`<!-- TENSION … -->`) on the affected page near the relevant claim. The wiki page body is **not** modified otherwise. Resolving the tension later, by lint or by hand, removes that marker, so a marker on a page always means an open ledger entry. This is the right answer when:

- You don't have time to read both positions carefully.
- You suspect a third source will clarify things.
- The disagreement is interesting but not urgent.

The next `lint the wiki` pass drains the queue and re-presents each open tension with a fresh agent recommendation that considers any sources you've added since. Most deferred tensions get resolved here, not at the original ingest.

### What option `(c)` does to a wiki page

`(c)` (hold both) adds an `## Unresolved Tensions` subsection to the wiki page with both quotes, both source citations, and the date the tension was surfaced. Pick this when you want the disagreement to be visible to a reader of the page, not just to your future self in the queue.

### What option `(a)` does to the loser

`(a)` (accept new) replaces the existing claim, **but the old claim doesn't disappear from the repo.** The wiki page gets a footnote near the new claim: *"Earlier versions of this page stated [old claim], per [source]; superseded by [new source] on [date]."* The original source and its summary are untouched. The wiki is lossy by design, but never silently lossy.

### Retroactive scanning: the tension-triage skill

Ingest-time detection only catches tensions as they enter. To find contradictions already sitting inside pages (manual edits, ingests that pre-date the system), type **`/wiki-tension-triage`**. Only you start it: a run spends many sub-agents and commits to this public repo, so after bulk or manual wiki edits the agent suggests it rather than running it. By default it covers the pages you name, or else every wiki page changed since the newest report in `meta/triage-runs/`, and shows you that list first. A multi-agent pipeline scans pages batch-wise: a detector finds candidates, quotes are mechanically verified, tensions already handled (under `## Unresolved Tensions`, next to a marker, or in the ledger) are skipped, an advocate and a harmonizer argue opposite sides, and an Opus judge rules. The only resolution it applies on its own is (c) hold both, at strong confidence and only after a second Opus challenger confirms; everything else, (b) keep old included, lands in `meta/contradictions.md` for the next lint. Every run leaves a report in `meta/triage-runs/`. The agents follow the calibration rules in `meta/tension-policy.md`, which grow from your past decisions — if you want to supervise a run (see every verdict yourself), just say so. The full 80-page retroactive sweep was completed on 2026-07-08.

### Why this exists

Without this step, every ingest implicitly *resolves* tensions by merging — usually by smoothing them into bland prose that reads fine and drops the disagreement. After a hundred ingests, the wiki reads as confident knowledge but is quietly misinformed. The contradiction menu is the only thing standing between you and that failure mode. See [`.claude/skills/connect/tension-handling.md`](../.claude/skills/connect/tension-handling.md) for the full contract.

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
- **Every gist**, and any wiki page a query files that carries content from the conversation.

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

You pick an option by letter, or write your own instruction. The agent applies the fix, re-scans, and repeats until the content is CLEAR or you abort. On abort, the agent deletes every file the run already wrote (under `sources/`, `summaries/`, `notes/` or `gists/`) and tells you what it removed; what you supplied stays where it was, so an original in `inbox/` is kept.

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

**A hook blocks bad commits locally.** `.claude/settings.json` registers a pre-commit hook (`.claude/hooks/okf-precommit.sh`): whenever the agent runs `git commit`, it first runs `scripts/okf-check.py` and refuses the commit if the bundle doesn't conform, showing the violations so the agent fixes them. It only fires on commits the agent makes from inside Claude Code; commits you make in a plain terminal are not gated (CI still catches them). Claude Code asks you once to approve the project's hooks the first time it sees them.

**CI runs on every push.** A GitHub Actions workflow (`.github/workflows/checks.yml`) re-validates OKF conformance and runs the script tests each time you (or the agent) push. If a push breaks conformance, GitHub emails you within a minute and the README badge turns red — you don't have to wait for the next lint pass to find out. Free for public repos.

---

## Claude Code Mods

Five project mods in `.claude/skills/mod-*/` change Claude Code itself, for this repo only. They are Claude Code plugins of function hooks; Claude Code loads them from the project's skills folder at session start as `mod-…@skills-dir`, so nothing is installed in your global config and your other projects don't get them.

| Mod | What you see | When it acts |
|-----|--------------|--------------|
| `mod-commit-scope` | Fewer commit-guard interruptions. A toast says *left N path(s) to the other live ai-wiki session* or *ingest paused at a decision* | Your global commit guard blocks a stop. The mod drops the block when every dirty file belongs to another ai-wiki session that is still live (its transcript changed in the last 15 minutes), or while this session's ingest waits on your menu choice or a background sub-agent. When both kinds of files are dirty, it narrows the block to this session's files and tells the agent not to `git add -A`. Unpushed commits, and files no live session owns, still block as before. |
| `mod-transcript-guard` | A toast at session start when `yt-dlp` is more than 60 days old. A notification *YouTube blocked the transcript of …* | YouTube answers the caption download with HTTP 429: the agent is told not to retry and falls back once to the audio route, and an identical caption retry within 10 minutes is refused. If the audio download fails too (403), you hear about it at once: paste the transcript from YouTube's *Show transcript* panel, or approve `pip install -U yt-dlp` when yt-dlp is old. |
| `mod-decision-ping` | A notification *Your call: …* or *Done after N min: …* | A turn ran at least 90 seconds and ends on a question or menu, or ran at least 5 minutes. It uses your Claude Code notification channel and falls back to a toast when notifications are off. |
| `mod-ingest-band` | One line above the prompt, e.g. `Ingest · <title> · ✓ meta source summary · ▶ connect (opus 4m) · next: index, log, commit`, then `⏸ your turn` when the ingest waits on you and `✓ Ingest committed` after the commit | From the `ingest` skill call until the ingest's commit. LinkedIn URL posts draw no band. |
| `mod-posted` | The `/posted [slug] [--no-commit]` command | After you publish a LinkedIn post. It sets the open draft's `status` to `posted`, deletes its `.txt`, commits only that file in `linkedin/` and pushes (never forced). With several drafts open it asks for a slug; without the private module it says so and changes nothing. |

- **Turn one off:** `claude plugin disable mod-decision-ping@skills-dir`, or use `/plugin`.
- **After editing a mod:** run `claude plugin validate .claude/skills/<mod>` and `claude plugin test .claude/skills/<mod>`; `/reload-plugins` picks up the change mid-session. With TypeScript installed (`brew install typescript`), `tsc -p .claude/skills/<mod>` also type-checks it, once a session has loaded the mod and written its API types into `.claude-plugin/types/` (gitignored). The mods run without TypeScript; it only adds the type check.
- **If a mod seems to do nothing:** start with `claude --debug`; the log names any module that failed to load, and why. The mod API is early access and can change between Claude Code releases.
- **Public clones load them too.** They act only on this repo's own files; the LinkedIn parts do nothing without the private module.

---

## Customizing the System

The agent's behavior is split by how often it's needed, following Claude Code's own guidance (standing facts in `CLAUDE.md`, procedures in skills, path-specific schemas in rules, enforcement in hooks):

| Want to change… | Edit |
|-----------------|------|
| Pillars, tag taxonomy, source types and default tiers, slug format, guardrails, which sub-agent model runs which step | `CLAUDE.md` (kept around 100 lines; it loads in every session) |
| How an ingest runs, the interview, the summary template, the confidentiality scan, podcast episodes | `.claude/skills/ingest/` (`SKILL.md`, `summary-template.md`, `step0-scan.md`, `podcast.md`) |
| How merging and contradictions work, the tension menu, the ledger format | `.claude/skills/connect/` (`SKILL.md`, `tension-handling.md`) |
| Gist, lint, query procedures | `.claude/skills/gist/`, `lint/`, `query/` |
| Frontmatter fields | `.claude/rules/frontmatter.md` (loads only when a file under `sources/`, `summaries/`, `wiki/` or `gists/` is touched) |
| What is enforced regardless of what the agent "remembers" | `.claude/settings.json` + `.claude/hooks/` |
| How Claude Code itself behaves here: commit-guard scope, transcript guard, notifications, the ingest band, `/posted` | `.claude/skills/mod-*/` (see [Claude Code Mods](#claude-code-mods)) |

Skills are also slash commands: `/ingest <url>`, `/query …`, `/gist`, `/lint`, `/connect summaries/<slug>.md`. The agent also picks these on its own from what you type ("lint the wiki", "save this as a gist"). Two run only when you type the command: `/wiki-tension-triage` and `/daily-ai-briefing`.

Changes take effect the next time you start a Claude Code session in the repo (skills and rules are picked up at launch). Run `/doctor prompt-audit` now and then to catch stale or contradictory instructions across these files.

---

## Common Pitfalls

- **Duplicate ingests.** Before fetching anything, the agent greps `sources/` and `summaries/` for the URL or video ID (`index.md` holds no URLs; for a podcast it also greps the episode title). If you want to re-ingest anyway, say so explicitly.
- **Wrong pillar on first ingests.** Pillars often feel wrong until 2–3 real sources land. Rename them in `CLAUDE.md` and `index.md` early — it gets harder once the wiki compounds.
- **Over-editing summaries.** If a summary feels off, ask the agent to regenerate with a different bias. Don't hand-edit — the next ingest's CONNECT step expects the template shape.
- **Manual wiki edits that fight the agent.** If you want a change to stick, either (a) tell the agent to make it, or (b) encode the new rule in `CLAUDE.md` (standing rule) or the relevant skill (procedure).
- **Editing `CLAUDE.md` or a skill and forgetting the docs.** A post-edit hook reminds the agent of the Self-Documentation Rule whenever those files change; if you edit them by hand outside a session, ask the agent to "sync the docs with CLAUDE.md".

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

- [`CLAUDE.md`](../CLAUDE.md) — the standing operating contract. The agent reads this every session.
- [`.claude/skills/`](../.claude/skills/) — one skill per workflow; [`.claude/rules/frontmatter.md`](../.claude/rules/frontmatter.md) — file schemas; [`.claude/settings.json`](../.claude/settings.json) + [`.claude/hooks/`](../.claude/hooks/) — the pre-commit OKF gate and the docs-sync reminder.
- [`concept.md`](concept.md) — architecture + recreation guide for a different topic.
- [`index.md`](../index.md) — browse everything.
- [`log.md`](../log.md) — chronological ingest history.
- [`scripts/extract-transcript.py`](../scripts/extract-transcript.py) — YouTube/podcast caption extractor.
- [`scripts/transcribe-audio.py`](../scripts/transcribe-audio.py) — local audio→text fallback (whisper.cpp) for sources with no captions.
- [`scripts/okf-check.py`](../scripts/okf-check.py) — OKF v0.1 conformance checker; run by the `lint` skill, by the pre-commit hook, and by CI on every push.
- [`docs/private-modules.md`](private-modules.md) — pattern for author-private extensions mounted inside this repo (some skills may not be available in a public clone).

---

## Tim's Recommendations

New to the wiki? These are the questions worth asking first. Open the repo in Claude.ai or a Claude Code session and paste them in directly.

**Setup**
- "How do I set up the Claude Code status bar?"
- "How do I use Obsidian to browse this wiki?"

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

Ask. The agent can answer "how do I X in this system?" by reading `CLAUDE.md`, the skills and this file. If its answer contradicts what you want, update `CLAUDE.md` or the relevant skill — that's how you teach the system.
