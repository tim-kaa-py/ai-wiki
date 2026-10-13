---
name: connect
description: Merges a new summary into wiki pages, detecting tensions with existing claims before every merge and surfacing them to the user as a batched menu instead of merging silently. Invoked by the ingest skill after a summary is written, or directly when the user says "connect" plus a summary path, "merge this summary into the wiki", or "re-run connect".
argument-hint: "summaries/<slug>.md"
---

# Connect

Input: the path of a new summary. Runs after every ingest, every tier, quick clips and instructional sources included, because a quick clip can contradict a page as easily as a deep dive and this check is the wiki's defence against silent merges.

Run it from the main session, never inside a sub-agent: the orchestrator shows the user a menu and waits for the answer, which a sub-agent cannot do. The orchestrator spawns Opus sub-agents (`model: "opus"`) for Pass 1 (detect and merge) and Pass 2 (apply answers, only if there are tensions), and does the verification and the menu itself.

The AGENT'S READ contract, the menu, the resolution-action table and the ledger schema are in [tension-handling.md](tension-handling.md). Include its path in every sub-agent prompt.

```text
Connect progress:
- [ ] 1 Pass 1 report back
- [ ] 2 Every quote and addition verified against the files
- [ ] 3 Every tension has a letter (skip if none)
- [ ] 4 Every letter applied; every (d) and (e) closed
- [ ] 5 Report given; new pages indexed or handed to INDEX
```

If the Pass 1 report leaves out added text, quotes or new pages, return to step 1 for what is missing.

## 1. Pass 1: detect and merge (sub-agent)

Prompt the sub-agent with the summary path, the path to `tension-handling.md`, and:

> Read the summary. Search `wiki/` for pages with overlapping tags and topics. For each relevant page, **first detect tensions** before merging: for each new claim from the summary, find the existing claim on the page that most closely addresses the same question. Quote both verbatim (existing claim with line number; new claim with timestamp or section). Classify as *agree* (skip, already represented), *orthogonal* (merge normally), or *tension* (do NOT merge, do NOT synthesize; return it as-is for the user's decision). For each tension, draft an AGENT'S READ block per `tension-handling.md`. For orthogonal additions, merge normally: add new information without replacing existing content, add the summary to the page's `sources:` frontmatter, update `timestamp`. Put actionable practices, workflows and anti-patterns inside the relevant page, never in a central principles file: the wiki is the living playbook. Create new wiki pages if the source introduces a substantial topic not yet covered (concepts → `wiki/concepts/`, tools → `wiki/tools/`, how-tos → `wiki/how-tos/`, people → `wiki/people/`, comparisons → `wiki/comparisons/`; frontmatter per `.claude/rules/frontmatter.md`). Return a structured report: for each page touched, the exact text you added and the existing claim nearest to it; each tension with both verbatim quotes and its AGENT'S READ; each new page as an `index.md` bullet `* [Title](path) - description` with its pillar.

Keep the adversarial phrasing. LLMs default to synthesis and will smooth tensions away unless told to surface them.

## 2. Verify (orchestrator)

Pass 1 both classifies and merges, so until this step its own word is the only check against a silent merge.

- `grep -nF` each tension's existing quote on its page and its new quote in the summary. A quote that is not verbatim gets corrected from the file, or the tension is dropped; fix line numbers.
- `grep -nF` a distinctive line of each reported addition on its page, so the report matches what was written. Read each addition beside its nearest existing claim: one that contradicts it is a tension Pass 1 missed. Remove the addition and add it to the menu with your own AGENT'S READ.

## 3. Menu (orchestrator)

No tensions: go to step 5. Otherwise present the menu from `tension-handling.md` in its exact format, one block per tension, and wait for an answer to each. Tell the user the reply format: one line per tension (`1c 2a 3q`) or `all q`. The recommendation is a hint, not a default; never apply without an answer.

## 4. Pass 2: apply (sub-agent)

Spawn the sub-agent with the answers and the path to `tension-handling.md`. It applies each letter per the resolution-action table, and returns (d) drafts and (e) proposals unwritten. Close each one:

- **(d)** Show the draft. `approve`: write it verbatim yourself, updating `sources:` and `timestamp`. `amend`: spawn Pass 2 again for that tension only, with the user's amendment, and show the new draft. `revert`: apply (c).
- **(e)** Show the proposal. Approved: spawn Pass 2 to carry it out (new page with frontmatter, claims moved, cross-links) and add the new page to the new-pages list. Declined: ask for another letter for that tension.

## 5. Report

Tell the user which wiki pages were created or modified, and which tensions were resolved, queued or held. Hand the new-page bullets to the ingest INDEX step; when connect runs on its own, add them to `index.md` under their pillar headings yourself, so no new page waits for lint to find it.
