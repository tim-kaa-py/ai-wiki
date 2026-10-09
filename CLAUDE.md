# AI Knowledge Wiki — Agent Schema

An LLM-maintained knowledge wiki about AI. The agent handles all bookkeeping: summarization, cross-referencing, index maintenance, consistency. The human curates sources, directs analysis, and thinks critically.

This file is the operating contract: facts and standing rules that apply in every session. Procedures live in skills under `.claude/skills/`, schemas in `.claude/rules/`, enforcement in `.claude/settings.json` hooks.

## Architecture

This repo is an [Open Knowledge Framework (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) bundle. `sources/`, `summaries/`, `wiki/`, `index.md`, and `log.md` conform to the OKF v0.1 schema; `scripts/okf-check.py` checks conformance and a pre-commit hook runs it.

Three layers:

1. **Sources** (`sources/`) — raw, verbatim material. Never modified after saving (re-extraction with better tooling is the one exception).
2. **Summaries** (`summaries/`) — one per source, opinionated, focused on the user's interests.
3. **Wiki** (`wiki/`) — synthesized pages aggregating many sources. LLM-maintained. Subfolders: `concepts/`, `tools/`, `how-tos/`, `people/`, `comparisons/`.

Parallel track: **Gists** (`gists/`) — user-authored Claude Code prompts, shareable. Not derived from sources, not synthesized into the wiki, indexed only in `gists/index.md`.

Other files: `index.md` (master index; frontmatter `okf_version: "0.1"` only; body is `* [Title](path) - description` bullets under pillar headings), `log.md` (newest-first `## YYYY-MM-DD` headings; entries prefixed `**Creation**` for ingests, `**Update**` for everything else), `notes/` (per-ingest focus notes), `inbox/` (unprocessed items, must be empty after processing), `meta/` (contradiction ledger, triage policy and prompts).

## Workflow routing

| User does | Skill |
|-----------|-------|
| Pastes a URL, drops a file in `inbox/`, says "ingest" / "process inbox" | `ingest` |
| Pastes a podcast episode URL | `podcast-ingest` |
| Asks a question (no URL) | `query` |
| Says "save as gist" / `/gist` | `gist` |
| Says "lint" / "check wiki health" | `lint` |
| Says "triage tensions" / "scan for contradictions" | `wiki-tension-triage` |
| Asks for the daily briefing | `daily-ai-briefing` |
| Asks for a LinkedIn post | `linkedin-*` proxies (private module, see `docs/private-modules.md`) |

Every ingest ends with the `connect` skill (merge into wiki pages with tension detection), then index and log. Frontmatter schemas are in `.claude/rules/frontmatter.md`, loaded automatically when files under `sources/`, `summaries/`, `wiki/` or `gists/` are touched.

## Model routing

The main session runs on the model Claude Code is configured with (Opus 5.5 by default for this repo; this file does not set it). It handles orchestration and mechanical steps. Analytical steps delegate to sub-agents via the Agent tool. The delegation is for context isolation (deep reading stays out of the session window); it adds capability only when the session model sits below the tier named.

| Step | Sub-agent |
|------|-----------|
| Confidentiality scan (Step 0) | Sonnet — isolated compliance check with a structured verdict |
| Tier 2 Focus & Discovery, Summarize, Connect | Opus — deep reading, synthesis, tension detection |
| Everything else (metadata, extract, save, index, log, Tier 1 quick clips, query, lint, gist) | main session |

Purely instructional sources (feature walkthroughs, tutorials) may skip the Opus sub-agents. The user can override in either direction.

## Three pillars

| Pillar | Slug | What goes here |
|--------|------|---------------|
| Building with AI | `building` | Hands-on coding, workflows, agent patterns, tool usage |
| Understanding AI | `understanding` | How things work — models, architectures, training, theory |
| AI Ecosystem | `ecosystem` | Tools, products, companies, releases, comparisons |

## Source types

| URL pattern / input | Type | Folder | Default tier |
|---------------------|------|--------|-------------|
| youtube.com, youtu.be | youtube | `sources/youtube/` | Deep dive |
| Podcast URLs | podcast | `sources/podcasts/` | Deep dive |
| arxiv.org, `.pdf` | paper | `sources/papers/` | Deep dive |
| github.com (not gist) | repo | `sources/repos/` | Deep dive |
| Official vendor docs | docs | `sources/docs/` | Quick clip |
| Any other URL | article | `sources/articles/` | Quick clip |
| File in `inbox/` | article | `sources/articles/` | Quick clip |

"deep dive" / "quick" / "clip" from the user overrides the default. Folders are plural except `youtube/`.

## Slug format

`YYYY-MM-DD_source-slug_title-slug` — lowercase, hyphens for spaces and special characters, title portion max 60 characters, date from source metadata, source slug from channel/author/domain. Gists use `YYYY-MM-DD_short-slug` (no source slug).

## Tag taxonomy

Tags emerge organically within these categories. Reuse existing tags; create new ones sparingly; lowercase, hyphenated.

- **Topic:** `prompt-engineering`, `agents`, `rag`, `fine-tuning`, `evaluation`, `training`, `inference`, `safety`, `multimodal`, `scaling`
- **Tool:** `claude-code`, `claude`, `openai`, `cursor`, `copilot`, `langchain`, `llamaindex`
- **Format:** `how-to`, `concept`, `comparison`, `cheatsheet`, `opinion`, `tutorial`, `paper`, `reference`
- **Cross-cutting:** `strategy`, `workflow`, `architecture`, `debugging`, `testing`, `best-practices`, `anti-patterns`

## Guardrails

- **This repo is public.** Run the Confidentiality Scan (`.claude/skills/ingest/step0-scan.md`) on every non-public source before extract/summarize, on every generated summary before connect, and on every gist. When in doubt whether something is public, scan. Manual edits are not scanned automatically: after hand-editing a source, summary, wiki page or gist, run the scan before committing.
- **Never silently merge contradicting claims.** Tensions go to the user via the `connect` skill's menu or are queued to `meta/contradictions.md`. A confidently written page that quietly dropped a prior claim reads like knowledge but is misinformation.
- **Never download video/audio for storage.** Metadata and captions use `--skip-download`. The only exception is `scripts/transcribe-audio.py`, which transcribes a temp file locally and deletes it.
- **Check tooling before use:** `which yt-dlp`, `python --version`. Suggest installation if missing; never install anything yourself. ffmpeg is needed only by the transcription fallback, which reports it as a missing dependency itself.
- **Check `index.md` for duplicates** (URL or video ID) before processing any source.
- **Sources are verbatim, summaries are opinionated, wiki pages are synthesized.**
- **Confirm metadata with the user** before proceeding on Tier 2 ingests.
- **Log every ingest, lint, gist and wiki-changing query** to `log.md`.
- **Always report CONNECT updates:** which wiki pages were created or modified, which tensions were resolved, queued or held.
- **Gists are not ingests.** Never summarize, connect or fold a gist into the wiki. Wiki pages must not reference gists.
- **`inbox/` is empty after processing.**

## Self-documentation rule

Three doc surfaces, distinct audiences:

| Surface | Audience | Purpose |
|---------|----------|---------|
| `CLAUDE.md` + `.claude/` | The agent | Operating contract and procedures. Authoritative. |
| `docs/user-documentation.md` | The human user | Daily usage, overrides, pitfalls. |
| `docs/concept.md` | A different agent recreating the system | Architecture and scaffolding guide. |

A **functional change** (new or changed workflow step, guardrail, model routing, frontmatter field, slug or tag rule, script, hook, or anything the user sees or must know) updates the docs **in the same response** as the change. Typos, wording and formatting do not. A post-edit hook reminds you whenever `CLAUDE.md` or `.claude/` changes.

Routing: user-visible workflow steps, guardrails with user impact, script changes and public/private considerations go to `user-documentation.md`. Schema fields, model routing, scripts and recreation-template considerations go to `concept.md`. After editing, re-read the changed sections and reconcile; `CLAUDE.md` and the skills are authoritative, docs follow.

`README.md` is the public landing page; update it when top-level structure, entry points or badges change. It is outside this sync contract. Manual edits to `CLAUDE.md` made outside a session bypass the rule: ask Claude to "sync the docs with CLAUDE.md" afterwards.
