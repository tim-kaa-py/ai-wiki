---
name: wiki-tension-triage
description: Use when the user asks to "triage tensions", "scan the wiki for contradictions", "run tension triage", or after bulk/manual edits that may have introduced contradictory claims inside wiki pages. Runs a multi-agent adversarial pipeline (detector → verify → advocate/harmonizer → judge → challenger) over wiki pages, applies non-destructive resolutions autonomously, and queues everything else to meta/contradictions.md.
---

# Wiki Tension Triage

Retroactive within-page contradiction scanner for `wiki/`. Complements the ingest-time Contradiction Handling in CLAUDE.md: CONNECT catches tensions as they enter; this skill finds ones already on a page (silent merges, manual edits, pre-system history). Lint category 5 drains what this skill queues.

**Design spec:** `docs/superpowers/specs/2026-07-06-tension-triage-design.md`
**Prompt templates:** `meta/triage/prompts/` (detector, conflict-advocate, harmonizer, judge, challenger)
**Calibration policy:** `meta/tension-policy.md` — read by every agent; cite rules by heading
**Run reports:** `meta/triage-runs/YYYY-MM-DD-<name>.md`

## Scope and authority

- **Within a single page only.** Cross-page and page-vs-summary checks are out of scope.
- **Real conflicts only:** two verbatim-quotable claims that cannot both be followed/true, surviving a charitable reading.
- **Tiered autonomy:** the pipeline may apply only (b) keep old or (c) hold both, only at `strong recommendation` confidence, and only after the challenger confirms. Everything else — (a)/(d)/(e) recommendations or weaker confidence — is queued to `meta/contradictions.md` with an HTML marker on the page. Never silently merge.

## Pipeline (per batch of ~10-16 pages)

1. **DETECT** — one Sonnet sub-agent per batch, prompt = `meta/triage/prompts/detector.md` with `{page_paths}` filled. Returns CANDIDATES (verbatim quotes + lines), NEAR-MISSES, CLEAN PAGES. Pages with an existing `## Unresolved Tensions` section: those documented claims are excluded.
2. **VERIFY** (orchestrator, mechanical) — `grep -nF` both quotes on the page. Not verbatim → dismiss with reason. Correct off-by-a-few line numbers silently.
3. **ADVERSARIAL** — per candidate, Conflict-Advocate + Harmonizer (Sonnet, parallel), prompts from templates. **Short-circuit:** if the advocate invokes its honesty clause, dismiss immediately — skip the judge.
4. **SYNTHESIZE** — Opus judge, template prompt, both briefs included. Verdict: DISMISS / QUEUE / AUTO-RESOLVE (+ AGENT'S READ in the CLAUDE.md format).
5. **CHALLENGE** — only for AUTO-RESOLVE: fresh Opus agent (challenger template) tries to overturn. Overturned → QUEUE. Confirmed → apply the (b)/(c) resolution per CLAUDE.md's resolution-actions table.
6. **REPORT** — write `meta/triage-runs/` report (candidates, dismissals with reasons, near-misses, clean pages, autonomous actions, editorial defects), append a `**Update** TRIAGE:` entry to `log.md`, run `python3 scripts/okf-check.py`, commit per batch.

## Orchestrator judgment calls (learned in pilots)

- **Stale-count/prose defects** (e.g. "two arguments" followed by three) are editorial defects, not tensions — don't dispatch adversaries over arithmetic; surface in the report for the user.
- **Editorial side-channel:** when adversaries agree a pair is compatible but both flag a skim-hazard, offer the user a one-line editorial fix (cross-pointer, heading rename) separate from tension resolution.
- **Suspicious all-clean batch on high-risk pages:** cross-check with a second detector on a different model, same framing. Convergence = trustworthy.
- After any dismissal pattern the user confirms as generalizable, append a rule to `meta/tension-policy.md` (pattern / ruling / rule / provenance).

## Supervised mode

If the user asks to supervise (or after major prompt/policy changes), disable step 5's auto-write: present every non-dismissed verdict via the standard (a)–(q) menu, and list dismissals for veto. Record judge-vs-user deltas in the run report and fold them into the policy file.
