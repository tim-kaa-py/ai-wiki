---
name: connect
description: The CONNECT step that makes the wiki compound — merge a new summary into wiki pages with tension detection before every merge. Invoked by the ingest and podcast-ingest skills after a summary is written, or directly when the user says "connect <summary>", "merge this summary into the wiki", or "re-run connect". Never silently merges contradicting claims; conflicts are surfaced to the user as a batched menu.
argument-hint: "summaries/<slug>.md"
---

# Connect

Run after every ingest, both tiers. Input: the path of the new summary.

**Model: Opus sub-agent** (`model: "opus"`), spawned twice: once to detect and merge, once (if there were conflicts) to apply the user's resolutions. The orchestrator in the main session presents the menu between the two.

The contradiction menu, the resolution-action table, the AGENT'S READ contract and the `meta/contradictions.md` schema are in `tension-handling.md` in this directory. Include that file's path in every sub-agent prompt.

## Pass 1 — detect and merge (sub-agent)

Prompt the sub-agent with the summary path, the path to `tension-handling.md`, and:

> Read the summary. Search `wiki/` for pages with overlapping tags and topics. For each relevant page, **first detect tensions** before merging: for each new claim from the summary, find the existing claim on the page that most closely addresses the same question. Quote both verbatim (existing claim with line number; new claim with timestamp or section). Classify as *agree* (skip — already represented), *orthogonal* (merge normally), or *conflict* (do NOT merge, do NOT synthesize — return as-is for the user's decision). For each conflict, draft an AGENT'S READ block per `tension-handling.md`. For non-conflicting additions, merge normally: add new information without replacing existing content, add the summary to the page's `sources:` frontmatter, update `timestamp`. Create new wiki pages if the source introduces a substantial topic not yet covered (concepts → `wiki/concepts/`, tools → `wiki/tools/`, how-tos → `wiki/how-tos/`, people → `wiki/people/`, comparisons → `wiki/comparisons/`; frontmatter per `.claude/rules/frontmatter.md`). Return a structured report: pages touched, merges performed, tensions detected (with AGENT'S READ), pages proposed.

Phrase the detection adversarially as above. LLMs default to synthesis and will smooth tensions away unless told to surface them.

Actionable practices, workflows and anti-patterns belong inside the relevant wiki page, not in a central principles file. The wiki is the living playbook.

## Orchestrator — surface tensions

If the report contains conflicts, present them to the user as the batched menu in `tension-handling.md`, one block per tension, each with its AGENT'S READ. The user answers one line per tension (`1c 2a 3q`) or `all q`. The recommendation is a hint, not a default; never apply without an answer.

If there are no conflicts, skip to the report.

## Pass 2 — apply resolutions (sub-agent)

Spawn the sub-agent again with the resolution choices and the path to `tension-handling.md`. It applies each letter per the resolution-action table: (a) replace with footnote, (b) leave page body, (c) append to `## Unresolved Tensions`, (d) draft a synthesis and return it for `approve / amend / revert` before writing, (e) propose a split and wait for explicit approval, (q) append to `meta/contradictions.md` and insert the HTML-comment marker only.

## Report

Tell the user which wiki pages were created or modified, and which tensions were resolved, queued, or held. This report is mandatory.
