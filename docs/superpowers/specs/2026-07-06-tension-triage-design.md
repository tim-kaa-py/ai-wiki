# Retroactive Wiki Tension Triage — Design

**Date:** 2026-07-06
**Status:** Approved by user (interview 2026-07-06)
**Outcome:** Executed 2026-07-06 → 2026-07-08 — pilots, shadow mode, and the full 80-page sweep completed; pipeline packaged as `.claude/skills/wiki-tension-triage/`. Run reports in `meta/triage-runs/`; see `log.md` 2026-07-08.
**Pattern reference:** `~/.claude/skills/pr-multi-agent-review/SKILL.md` (2-iteration adversarial multi-agent review)

## Problem

The Contradiction Handling system in `CLAUDE.md` (CONNECT-step tension detection, the (a)–(q) resolution menu, `meta/contradictions.md` ledger) was added after many ingests had already happened. A portion of the ~80 wiki pages were built by silent merges and may contain internal contradictions. The ledger is empty; only 4 pages have an `## Unresolved Tensions` section. Everything pre-dating the system is undetected.

## Goal

A cleaned wiki: every within-page tension either resolved, held visibly under `## Unresolved Tensions`, or queued in `meta/contradictions.md` — nothing silently contradictory. Secondary deliverable: the tuned workflow packaged as a reusable skill.

## Decisions from the interview

| Decision | Choice |
|----------|--------|
| Detection scope | Within a single page only. Cross-page and page-vs-summary checks are out of scope. |
| Sensitivity | Real conflicts only — claims that cannot both be followed/true. Differing emphasis, complementary advice, scope-different claims are NOT tensions. |
| Autonomy | Tiered by confidence: autonomous writes only for non-destructive resolutions ((b) keep old, (c) hold both) at `strong recommendation` confidence. (a)/(d)/(e) and weak-confidence cases are queued for the user. Every autonomous action is logged. |
| Evidence | Detection uses the page only; resolution judgment may read the summaries listed in the page's `sources:` frontmatter. |
| Pattern | Adapted from `pr-multi-agent-review`: adversarial agent pair with honest-caveat clauses, mechanical self-verification, iteration-2 challenge that may overturn, discarded-points audit trail. |
| Rollout | Pilot-first: test and optimize the pipeline on small batches before the full sweep. |
| Packaging | After the sweep proves out, package as `.claude/skills/wiki-tension-triage/` (triggers the Self-Documentation Rule). |

## Pipeline (per batch of pages)

```
Stage 1  DETECT      Sonnet detector sub-agents, ~8 pages each, in parallel.
                     Adversarial framing (quote verbatim, do NOT synthesize).
                     Output per candidate: both quotes verbatim, line numbers,
                     one-line statement of why they conflict.
Stage 2  VERIFY      Orchestrator, mechanical: both quotes exist verbatim at
                     the cited lines? Attributions to summaries accurate?
                     Failures are dismissed with reason (logged, not silent).
Stage 3  ADVERSARIAL Per surviving candidate, two Sonnet agents in parallel:
                     - Conflict-Advocate: argues the claims genuinely conflict,
                       with a concrete way following both fails.
                     - Harmonizer: argues they are compatible/orthogonal, with
                       the reading that reconciles them.
                     Both carry the honest-caveat clause: "if you cannot
                     honestly defend your side, say so." Both receive the page,
                     the cited summaries, and meta/tension-policy.md.
Stage 4  SYNTHESIZE  Opus judge weighs both briefs. Produces an AGENT'S READ
                     (existing CLAUDE.md format: confidence, recommended
                     option, why, strongest argument against) plus a verdict:
                     - DISMISS   — not a real tension (reason recorded)
                     - QUEUE     — real tension needing the user ((a)/(d)/(e)
                                   recommendation, or confidence below strong)
                     - AUTO-RESOLVE — (b) or (c) at strong confidence only
Stage 5  CHALLENGE   Only for AUTO-RESOLVE verdicts. Fresh Opus agent receives
                     the tension, the judge's verdict, and the verification
                     results, and is tasked to overturn it. "Confirming is a
                     valid outcome" clause included. Overturned → QUEUE.
                     Survived → the resolution is applied.
Stage 6  REPORT      One report per run: applied resolutions, queued entries,
                     dismissed candidates each with a one-sentence reason
                     (the audit trail against silent false negatives).
```

## Phasing

- **Phase 0 — Pilot 1 (supervised, ~5 pages).** Pages picked for tension likelihood (many sources, older timestamps, contested topics). Full pipeline runs but Stage 5 auto-write is disabled: every verdict is presented to the user via the standard (a)–(q) menu. The delta between user decisions and pipeline verdicts is the tuning signal.
- **Phase 1 — Tune.** Adjust agent briefings and the dismiss threshold. Write the first `meta/tension-policy.md` from the user's actual decisions. Each policy entry: the tension pattern, the ruling, the generalizable rule.
- **Phase 2 — Pilot 2 (shadow mode, ~10 pages).** Auto-resolve verdicts are computed but NOT written; the user reviews what the pipeline would have done. Gate to unlock autonomy: no AUTO-RESOLVE verdict the user would veto. Otherwise tune again and repeat Phase 2 on fresh pages.
- **Phase 3 — Full sweep (~65 remaining pages).** Autonomous with tiered authority, in batches. One report and one git commit per batch so the user can abort or revert between batches.
- **Phase 4 — Package.** Save the tuned workflow as `.claude/skills/wiki-tension-triage/` (briefings + pipeline + policy-file reference). Sync `docs/user-documentation.md` and `docs/concept.md` per the Self-Documentation Rule; note the relationship to Lint category 5 (lint drains the ledger; this skill is the scanner that fills it retroactively).

## Writes and audit trail

- **(c) Hold both** → append to (or create) `## Unresolved Tensions` on the page in the existing canonical format; update `timestamp`.
- **(b) Keep old** → page untouched; recorded in the run report only.
- **QUEUE** → entry in `meta/contradictions.md` using the existing schema, with `Queued by: retroactive triage on YYYY-MM-DD`, plus the standard HTML-comment marker near the claim on the page. Queued entries are resolved later through the normal lint drain — the sweep never forces a decision session.
- **Run report** → `meta/triage-runs/YYYY-MM-DD-batch-N.md`: applied / queued / dismissed-with-reason, plus which stage eliminated each dismissed candidate.
- **log.md** → one `**Update**` entry per run under today's date heading.
- **Git** → one commit per batch, so any batch is revertible in isolation.

## New artifacts

| Artifact | Purpose |
|----------|---------|
| `meta/tension-policy.md` | Calibration policy distilled from user decisions; consumed by Stages 3–5. Grows during pilots; frozen (but amendable) for the full sweep. |
| `meta/triage-runs/` | Per-run reports. |
| `.claude/skills/wiki-tension-triage/` | Phase 4 packaging of the tuned workflow. |

Note: `meta/` is outside the OKF bundle scope, so these artifacts need no OKF frontmatter.

## Cost profile

Pages with no candidate tensions (expected majority): one shared detector slice. Per candidate tension: +2 Sonnet adversaries +1 Opus judge; +1 Opus challenger only when auto-resolving. Pilots are deliberately small so tuning iterations stay cheap.

## Out of scope

- Cross-page tensions and page-vs-summary distortion checks.
- Re-running CONNECT or touching sources/summaries.
- Changes to the ingest-time Contradiction Handling flow in CLAUDE.md (the skill reuses its formats; it does not modify them).

## Risks

- **False negatives (missed tensions):** mitigated by the dismissed-points audit trail — every dismissal is visible with a reason.
- **False positives eroding trust in autonomy:** mitigated by the adversarial pair, the challenge pass, and the shadow-mode gate before autonomy unlocks.
- **Policy overfit to pilot pages:** Phase 2 runs on fresh pages, not the Phase 0 set.
- **Public repo:** all writes are to wiki pages and meta files already in the public tier; no new confidentiality surface. Manual-edit rule still applies if the user hand-edits afterwards.
