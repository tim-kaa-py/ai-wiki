# Wiki Tension Triage — Pilot (Phase 0 + 1) Implementation Plan

> **Outcome:** Executed 2026-07-08 — both supervised pilots ran clean (0 confirmed tensions, 0 judge-vs-user mismatches), policy v1 distilled, shadow mode unlocked. Phases 2–4 (shadow, full sweep, skill packaging) proceeded the same day without a separate plan; see `log.md` 2026-07-08 and `meta/triage-runs/`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline). Tasks 3–4 are interactive orchestration with the user in the loop and CANNOT be delegated to implementer subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the multi-agent tension-triage pipeline, run it supervised on 5 pilot wiki pages, and distill the user's decisions into `meta/tension-policy.md`.

**Architecture:** Prompt templates for five agent roles live in `meta/triage/prompts/`. The main session orchestrates: parallel Sonnet detectors → mechanical verification → per-candidate Sonnet adversarial pair → Opus judge → user menu (Stage 5 auto-write is DISABLED in Phase 0). Results land in `meta/triage-runs/`, `meta/contradictions.md`, wiki pages, and `log.md`.

**Tech Stack:** Claude Code Agent tool (Sonnet + Opus sub-agents), plain Markdown artifacts. No new scripts.

**Spec:** `docs/superpowers/specs/2026-07-06-tension-triage-design.md`

## Global Constraints

- Detection scope: within a single page only.
- Sensitivity: real conflicts only — claims that cannot both be followed/true. Differing emphasis, complementary advice, scope-different claims are NOT tensions.
- Phase 0: Stage 5 auto-write is disabled; every non-dismissed verdict goes to the user via the (a)–(q) menu.
- AGENT'S READ format is the existing CLAUDE.md format: confidence (`strong recommendation` | `lean toward` | `no strong recommendation — your call`), recommended option (never (e)), why, strongest argument against.
- Never silently merge contradicting claims. All dismissals appear in the run report with a one-sentence reason.
- `meta/` is outside the OKF bundle — new meta files need no OKF frontmatter. Wiki-page writes must keep OKF conformance (`python3 scripts/okf-check.py` passes after every batch).
- One git commit per completed batch; push after commit (user's global rule).
- Repo is public: no confidential content in prompts, reports, or policy entries.

---

### Task 1: Scaffold triage artifacts (prompts, policy stub, runs dir)

**Files:**
- Create: `meta/triage/prompts/detector.md`
- Create: `meta/triage/prompts/conflict-advocate.md`
- Create: `meta/triage/prompts/harmonizer.md`
- Create: `meta/triage/prompts/judge.md`
- Create: `meta/triage/prompts/challenger.md`
- Create: `meta/tension-policy.md`
- Create: `meta/triage-runs/.gitkeep`

**Interfaces:**
- Produces: the five prompt templates consumed verbatim (with `{placeholders}` filled) by Task 3's Agent dispatches, and the policy file consumed by advocate/harmonizer/judge prompts.

- [ ] **Step 1: Write `meta/triage/prompts/detector.md`**

````markdown
# Detector briefing (Sonnet)

You are scanning wiki pages for INTERNAL CONTRADICTIONS — two claims on the
SAME page that cannot both be followed or cannot both be true. These pages
were built by merging multiple sources without conflict detection; your job
is to find where that silently produced contradictory prose.

Read each of these pages in full:
{page_paths}

Also read the calibration policy (may be empty early on):
meta/tension-policy.md

STRICT criteria — a candidate tension requires ALL of:
1. Two specific claims, each quotable VERBATIM from the page.
2. Following/believing both simultaneously is impossible, OR they state
   facts that cannot both be true.
3. The conflict survives a charitable reading. If a reasonable reader can
   reconcile them ("X in context A, Y in context B"), it is NOT a tension.

NOT tensions (do not report):
- Differing emphasis or priority between sources.
- Complementary or additive advice.
- Claims scoped to different tools, model generations, or situations.
- A general rule plus its stated exception.
- Vague prose that is merely unclear rather than contradictory.

Do NOT synthesize, soften, or reconcile. Your only output is candidates.
Quote verbatim — do not paraphrase, do not fix typos in quotes.

Output format — for each candidate:

```
CANDIDATE <n>
PAGE: <repo-relative path>
CLAIM A (line <n>): "<verbatim quote>"
CLAIM B (line <n>): "<verbatim quote>"
WHY THEY CONFLICT: <one sentence>
```

If a page has no candidates, list it under a final `CLEAN PAGES:` heading.
Report every page exactly once. It is a valid and expected outcome that
most or all pages are clean — do not lower the bar to produce findings.
````

- [ ] **Step 2: Write `meta/triage/prompts/conflict-advocate.md`**

````markdown
# Conflict-Advocate briefing (Sonnet)

You argue that the following two claims from the same wiki page GENUINELY
CONFLICT. Build the strongest honest case that a reader following this page
would be misled or blocked by this contradiction.

PAGE: {page_path}
CLAIM A (line {line_a}): "{quote_a}"
CLAIM B (line {line_b}): "{quote_b}"

Evidence you may use:
- The full page: {page_path}
- The summaries cited in the page's frontmatter `sources:` list (read the
  frontmatter, then read those summary files).
- The calibration policy: meta/tension-policy.md — if a policy rule covers
  this pattern, cite it.

Your brief (max 250 words):
1. The concrete failure: describe a specific situation where following both
   claims is impossible, or where the facts cannot both hold.
2. Source support: do the cited summaries back one claim, both, or neither?
3. Why charitable readings fail: address the most obvious reconciliation
   and explain why it does not hold.

HONESTY CLAUSE: You must argue this side ONLY with technically defensible
points. If, after examining the evidence, you cannot honestly defend that
these claims conflict, say so plainly at the end: "Caveat: I cannot
construct an honest conflict case; the strongest reading is <X>." That
caveat is a valid, welcome output — never fabricate a failure scenario.
````

- [ ] **Step 3: Write `meta/triage/prompts/harmonizer.md`**

````markdown
# Harmonizer briefing (Sonnet)

You argue that the following two claims from the same wiki page are
COMPATIBLE or ORTHOGONAL — that a careful reader can follow both without
contradiction.

PAGE: {page_path}
CLAIM A (line {line_a}): "{quote_a}"
CLAIM B (line {line_b}): "{quote_b}"

Evidence you may use:
- The full page: {page_path}
- The summaries cited in the page's frontmatter `sources:` list (read the
  frontmatter, then read those summary files).
- The calibration policy: meta/tension-policy.md — if a policy rule covers
  this pattern, cite it.

Your brief (max 250 words):
1. The reconciling reading: the specific interpretation under which both
   claims hold (different scopes, contexts, tool versions, audiences...).
2. Grounding: quote the page or cited summaries where they support that
   reading — do not invent context the sources do not contain.
3. Residual risk: what a hasty reader might still misunderstand, even if
   the claims are technically compatible.

HONESTY CLAUSE: You must argue this side ONLY with technically defensible
points. If, after examining the evidence, you cannot honestly reconcile
the claims, say so plainly at the end: "Caveat: I cannot construct an
honest reconciliation; these claims genuinely conflict because <X>." That
caveat is a valid, welcome output — never invent scope distinctions the
text does not support.
````

- [ ] **Step 4: Write `meta/triage/prompts/judge.md`**

````markdown
# Judge briefing (Opus)

You are the judge in a tension-triage pipeline for a public knowledge wiki.
Two adversarial agents have argued opposite sides of a candidate
contradiction. Weigh their briefs against the evidence and rule.

PAGE: {page_path}
CLAIM A (line {line_a}): "{quote_a}"
CLAIM B (line {line_b}): "{quote_b}"

CONFLICT-ADVOCATE BRIEF:
{advocate_brief}

HARMONIZER BRIEF:
{harmonizer_brief}

Evidence: read {page_path} and the summary files listed in its frontmatter
`sources:` list yourself — do not rely solely on the briefs. Also read
meta/tension-policy.md and apply any rule that covers this pattern (cite
the rule by its heading if you use one).

Facts beat rhetoric: a brief that ends in an honesty caveat has effectively
conceded. A vivid failure scenario that the page's actual text does not
support counts for nothing.

Return EXACTLY this structure:

```
VERDICT: DISMISS | QUEUE | AUTO-RESOLVE

If DISMISS:
REASON: <one sentence — why this is not a real tension>

If QUEUE or AUTO-RESOLVE:
AGENT'S READ — <strong recommendation | lean toward | no strong
recommendation — your call> (<recommended option letter>)
  Why: <1-2 sentences grounded in the specific claims and sources>
  Strongest argument against: <1 sentence — mandatory>
RESOLUTION DETAIL: <for (c): the exact Unresolved-Tensions entry text
  with both quotes and citations; for (a)/(d): what would replace what;
  for (b): why old claim stands>
```

Verdict rules:
- AUTO-RESOLVE is legal ONLY for option (b) keep old or (c) hold both, AND
  ONLY at confidence "strong recommendation". Anything else is QUEUE.
- Never recommend (e) split page as the primary option.
- DISMISS only when the claims do not genuinely conflict — not because the
  conflict seems minor. Minor real conflicts are QUEUE or AUTO-RESOLVE.
```
````

- [ ] **Step 5: Write `meta/triage/prompts/challenger.md`**

````markdown
# Challenger briefing (Opus, Iteration 2)

A judge has ruled that the following tension should be resolved
AUTONOMOUSLY (without the wiki owner's review). You are the last gate
before that write happens. Your task: try to OVERTURN the verdict.

PAGE: {page_path}
CLAIM A (line {line_a}): "{quote_a}"
CLAIM B (line {line_b}): "{quote_b}"

JUDGE'S VERDICT AND REASONING:
{judge_output}

MECHANICAL VERIFICATION RESULTS:
{verification_notes}

Read {page_path}, its cited summaries, and meta/tension-policy.md with
fresh eyes. Attack every link: Is this a real tension at all? Is the
recommended option right? Is "strong recommendation" justified, or is
there genuine doubt? Does the RESOLUTION DETAIL misquote or distort
anything? Does a policy rule contradict the verdict?

Return EXACTLY:

```
CHALLENGE: OVERTURNED | CONFIRMED
REASONING: <2-4 sentences>
If OVERTURNED — REROUTE TO: QUEUE | DISMISS, plus one sentence on what the
judge missed.
```

CONFIRMED is a fully valid outcome — if the verdict holds up, say so in
one line. Do not manufacture objections to justify your existence. But if
you have ANY defensible doubt about an autonomous write to a public wiki,
OVERTURN to QUEUE — a queued tension costs the owner one decision; a wrong
autonomous write costs trust in the whole pipeline.
````

- [ ] **Step 6: Write `meta/tension-policy.md` (stub)**

```markdown
# Tension Triage — Calibration Policy

Rules distilled from the wiki owner's resolution decisions during pilot
runs. Consumed by the advocate, harmonizer, judge, and challenger agents
of the tension-triage pipeline. Cite rules by their heading.

Each rule: the tension pattern, the owner's ruling, and the generalizable
principle. Append-only during pilots; amendments during the full sweep
require a note in the run report.

_No rules yet — populated during Phase 0/1 calibration._
```

- [ ] **Step 7: Create the runs directory**

Run: `mkdir -p "meta/triage-runs" && touch "meta/triage-runs/.gitkeep"`

- [ ] **Step 8: Verify and commit**

Run: `ls meta/triage/prompts/ meta/triage-runs/ && python3 scripts/okf-check.py`
Expected: five prompt files listed, `.gitkeep` listed, `OKF CHECK: PASS` (meta/ is outside the bundle, so the new files must not affect it).

```bash
git add meta/triage meta/tension-policy.md meta/triage-runs
git commit -m "Scaffold tension-triage pipeline: agent briefings, policy stub, runs dir"
git push
```

---

### Task 2: Select 5 pilot pages

**Files:**
- No repo writes (selection is recorded in Task 3's run report).

**Interfaces:**
- Produces: a confirmed list of 5 wiki page paths for Task 3.

- [ ] **Step 1: Rank pages by tension likelihood**

Run this to list pages by source count (more merged sources = more silent-merge risk), with timestamps:

```bash
for f in wiki/*/*.md; do
  n=$(awk '/^sources:/{flag=1;next} /^[a-z_]+:/{flag=0} flag&&/^  - /{c++} END{print c+0}' "$f")
  t=$(grep -m1 '^timestamp:' "$f" | cut -d'"' -f2)
  echo "$n|$t|$f"
done | sort -t'|' -k1,1nr | head -15
```

Expected: 15 lines `count|timestamp|path`, highest source-counts first.

- [ ] **Step 2: Shortlist and confirm with the user**

From the top 15, pick 5 favoring: (1) high source count, (2) older timestamps (pre-dating the Contradiction Handling system), (3) topically contested subjects (e.g. context engineering, agent patterns, model comparisons), (4) no existing `## Unresolved Tensions` section (check with `grep -l "Unresolved Tensions" <candidates>` and prefer pages NOT in that list). Present the 5 with one line of rationale each; user confirms or swaps. Do not proceed until confirmed.

---

### Task 3: Run Phase 0 pilot (supervised, auto-write disabled)

**Files:**
- Create: `meta/triage-runs/2026-07-06-pilot-1.md` (adjust date to run date)
- Modify: the pilot wiki pages (only per user-chosen resolutions)
- Modify: `meta/contradictions.md` (only for (q) choices)
- Modify: `log.md`

**Interfaces:**
- Consumes: prompt templates from Task 1, page list from Task 2.
- Produces: the run report and the raw user decisions consumed by Task 4.

- [ ] **Step 1: Stage 1 — DETECT**

Dispatch ONE detector sub-agent (5 pages fit one dispatch): Agent tool, `subagent_type: "general-purpose"`, `model: "sonnet"`, `run_in_background: false`. Prompt = contents of `meta/triage/prompts/detector.md` with `{page_paths}` replaced by the 5 confirmed paths (one per line). Collect the CANDIDATE blocks and CLEAN PAGES list.

- [ ] **Step 2: Stage 2 — VERIFY (mechanical, orchestrator)**

For each candidate, confirm both quotes exist verbatim on the page:

```bash
grep -nF "<quote text>" "<page path>"
```

Rules: quote must be found; if the reported line number is off but the quote exists, correct the line number and proceed; if a quote is not found verbatim (paraphrase, stitched fragments), the candidate is DISMISSED with reason "failed mechanical verification: quote not verbatim". Record every verification result (pass/fail + corrected lines) as `verification_notes` for later stages.

- [ ] **Step 3: Stage 3 — ADVERSARIAL**

For each surviving candidate, dispatch Conflict-Advocate and Harmonizer IN THE SAME tool block (parallel): Agent tool, `subagent_type: "general-purpose"`, `model: "sonnet"`, `run_in_background: false`, prompts = the two templates with `{page_path}`, `{line_a}`, `{quote_a}`, `{line_b}`, `{quote_b}` filled. Capture both briefs verbatim.

- [ ] **Step 4: Stage 4 — SYNTHESIZE**

Per candidate, dispatch the judge: Agent tool, `subagent_type: "general-purpose"`, `model: "opus"`, `run_in_background: false`, prompt = judge template with claim fields, `{advocate_brief}`, `{harmonizer_brief}` filled. Collect verdicts.

- [ ] **Step 5: Present ALL verdicts to the user (Stage 5 disabled)**

Phase 0 rule: nothing is written autonomously. Present one batched menu — for each non-dismissed candidate, the standard TENSION block from CLAUDE.md's "Contradiction Handling at Ingest" (both quotes with lines/sources, options (a)–(q), the judge's AGENT'S READ). AUTO-RESOLVE verdicts are presented identically, but tagged: `[pipeline would have auto-resolved this as (<letter>)]`. Also list DISMISSED candidates with reasons and ask the user to veto any dismissal they disagree with. User answers e.g. `1c 2a 3q`, plus dismissal vetoes.

**Record for every candidate (needed by Task 4): the judge's verdict+option+confidence vs. the user's actual choice.**

- [ ] **Step 6: Apply the user's resolutions**

Per CLAUDE.md's resolution-actions table, exactly:
- (a): replace old claim, add the deprecation footnote, update `sources:` if applicable and `timestamp`.
- (b): page untouched.
- (c): append to (or create) `## Unresolved Tensions` with both quotes, both citations, today's date; update `timestamp`.
- (d): dispatch an Opus sub-agent to draft the synthesis, present for approve/amend/revert, write after approval, update `timestamp`.
- (q): append entry to `meta/contradictions.md` (existing schema, `Queued by: retroactive triage on <date>`); add the HTML-comment marker `<!-- TENSION <date>: see meta/contradictions.md#<anchor> -->` near the claim; no other page change.

Then run: `python3 scripts/okf-check.py` — expected `OKF CHECK: PASS`.

- [ ] **Step 7: Write the run report**

Create `meta/triage-runs/2026-07-06-pilot-1.md`:

```markdown
# Triage Run — Pilot 1 (Phase 0, supervised)

**Date:** <date>  **Pages:** <5 paths>  **Mode:** supervised (auto-write disabled)

## Candidates
| # | Page | Claims (lines) | Stage 2 | Judge verdict (option, confidence) | User choice | Match? |
|---|------|----------------|---------|------------------------------------|-------------|--------|

## Dismissed
| # | Page | Reason | Stage | User veto? |
|---|------|--------|-------|------------|

## Clean pages
<list>

## Calibration delta
<per mismatch between judge verdict and user choice: what the judge got
wrong and the candidate policy rule that would have fixed it>
```

- [ ] **Step 8: Log and commit**

Append to `log.md` under today's heading: `**Update** TRIAGE: Phase 0 pilot run — 5 pages scanned, <n> tensions surfaced, <n> resolved (<letters>), <n> queued, <n> dismissed. Report: meta/triage-runs/<file>.` Then:

```bash
git add wiki meta log.md
git commit -m "Tension triage pilot 1: <n> tensions resolved on 5 pages (supervised)"
git push
```

---

### Task 4: Phase 1 — Tune (policy + prompt adjustments)

**Files:**
- Modify: `meta/tension-policy.md`
- Modify: `meta/triage/prompts/*.md` (only where the pilot showed a briefing failure)

**Interfaces:**
- Consumes: the run report's "Calibration delta" section and the recorded judge-vs-user decisions from Task 3.
- Produces: policy v1 and tuned prompts for Phase 2 (separate plan).

- [ ] **Step 1: Distill policy rules with the user**

For each judge-vs-user mismatch AND each confirmed match that reveals a generalizable principle, draft a policy rule:

```markdown
## <short pattern name>
- **Pattern:** <the kind of tension, one sentence>
- **Ruling:** <what the owner chose and why>
- **Rule:** <the generalizable instruction an agent can apply>
- **From:** pilot 1, candidate <n> (<page>)
```

Present all drafted rules to the user for approval/amendment before writing them to `meta/tension-policy.md`.

- [ ] **Step 2: Tune prompts only where the pilot showed a failure**

For each failure class, edit the responsible template: detector missed a real tension or over-flagged → tighten `detector.md` criteria with the concrete example (anonymized to the pattern, not the page); judge chose the wrong option or confidence → add guidance to `judge.md`; briefs were rhetorical rather than evidence-based → strengthen the honesty clauses. Do NOT change prompts that performed correctly.

- [ ] **Step 3: Assess and commit**

With the user, decide: is the pipeline ready for Phase 2 (shadow mode, ~10 fresh pages), or is another supervised pilot needed? Record the decision at the bottom of the run report. Then:

```bash
git add meta/tension-policy.md meta/triage/prompts meta/triage-runs
git commit -m "Tension triage Phase 1: calibration policy v1 + prompt tuning from pilot 1"
git push
```

**Phase 2/3 (shadow mode, full sweep) and Phase 4 (skill packaging) get their own plan after this gate — their parameters depend on pilot outcomes.**
