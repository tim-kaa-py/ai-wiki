---
name: wiki-tension-triage
description: Scans wiki pages for contradictory claims already on a page with an adversarial multi-agent pipeline, applies "hold both" resolutions on its own and queues everything else to meta/contradictions.md. Started by the user ("triage tensions", "scan the wiki for contradictions", "run tension triage").
disable-model-invocation: true
---

# Wiki Tension Triage

Retroactive within-page tension scanner for `wiki/`. The `connect` skill catches tensions as they enter; this skill finds ones already on a page (silent merges, manual edits, pre-system history). Lint drains what it queues.

**Design spec:** `docs/superpowers/specs/2026-07-06-tension-triage-design.md`
**Prompt templates:** `meta/triage/prompts/` (detector, conflict-advocate, harmonizer, judge, challenger)
**Calibration policy:** `meta/tension-policy.md`. Every agent reads it and cites rules by heading; its "Pipeline rules" section is the orchestrator's (short-circuit, dual detector, editorial side-channel).
**Menu, resolution actions, ledger schema:** `.claude/skills/connect/tension-handling.md`
**Run reports:** `meta/triage-runs/YYYY-MM-DD-<name>.md`

## Scope and authority

- **Within a single page only**, because cross-page claims often differ by scope and need the user's judgment.
- **Real tensions only:** two verbatim-quotable claims that cannot both be followed or true, surviving a charitable reading.
- **Autonomy is (c) hold both only**, at `strong recommendation` confidence, after the challenger confirms, because (c) adds a visible note and rewrites no claim. Every other verdict, (b) keep old included, is queued: both claims already sit on the page, so (b) would either leave a confirmed tension unmarked or delete a claim. Queue = ledger entry plus page marker, per (q) in `tension-handling.md`.
- **Claim A/B mapping:** in the menu and the ledger, `Existing` is the claim earlier on the page and `New` the later one; `Queued by: retroactive triage on YYYY-MM-DD`.

## Pipeline

Copy this checklist and tick it; repeat steps 1-6 per batch of ~10-16 pages until every page in scope is covered.

```text
Triage progress:
- [ ] 0 Scope: page list shown to the user
- [ ] 1 Detect: every page in the batch reported once
- [ ] 2 Verify: every candidate VERIFIED or DISMISSED with a reason
- [ ] 3 Adversarial: two briefs per verified candidate, or short-circuited
- [ ] 4 Synthesize: a verdict per remaining candidate
- [ ] 5 Challenge: every AUTO-RESOLVE confirmed and applied, or queued
- [ ] 6 Report: run report, log entry, okf-check passes, batch committed
```

0. **SCOPE** — the pages the user names; otherwise `wiki/` pages changed since the date of the newest file in `meta/triage-runs/` (`git log --since=<date> --name-only -- wiki/`).
1. **DETECT** — one Sonnet sub-agent per batch, prompt = `meta/triage/prompts/detector.md` with `{page_paths}` filled. Returns CANDIDATES (verbatim quotes and lines), NEAR-MISSES, CLEAN PAGES.
2. **VERIFY** (orchestrator, mechanical) — `grep -nF` both quotes on the page. Not verbatim: dismiss with the reason. Correct off-by-a-few line numbers silently. Dismiss as "already handled" when either quote sits under the page's `## Unresolved Tensions`, next to a `<!-- TENSION -->` marker, or in an open or resolved `meta/contradictions.md` entry for the same page, because the ledger is append-only and a duplicate entry can never be removed.
3. **ADVERSARIAL** — per candidate, Conflict-Advocate and Harmonizer (Sonnet, parallel), from the templates. Apply the policy's advocate-concession short-circuit.
4. **SYNTHESIZE** — Opus judge from the template, both briefs included. Verdict: DISMISS / QUEUE / AUTO-RESOLVE, with an AGENT'S READ.
5. **CHALLENGE** — only for AUTO-RESOLVE: a fresh Opus agent (challenger template) tries to overturn it. Overturned: QUEUE. Confirmed: apply (c) per the resolution-action table.
6. **REPORT** — write the `meta/triage-runs/` report (candidates, dismissals with reasons, near-misses, clean pages, autonomous actions, editorial defects), insert a `**Update** TRIAGE:` entry in `log.md` as the first entry under today's heading, run `python3 scripts/okf-check.py` (fails: fix the page and rerun), and commit the batch on its own so any batch reverts cleanly.

## Orchestrator judgment calls

- **Stale-count and prose defects** (e.g. "two arguments" followed by three) are editorial defects, not tensions: surface them in the report rather than dispatching adversaries over arithmetic.
- When the user confirms a dismissal pattern as generalizable, append a tension-classification rule to `meta/tension-policy.md` (pattern / ruling / rule / provenance); pipeline-flow rules go under its "Pipeline rules".

## Supervised mode

If the user asks to supervise (or after major prompt or policy changes), skip step 5's write: present every non-dismissed verdict with the menu from `tension-handling.md`, and list dismissals for veto. Record judge-vs-user deltas in the run report and fold them into the policy file.
