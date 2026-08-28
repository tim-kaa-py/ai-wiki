---
title: "Reviewer Agents"
description: "Ryan Lopopolo's persona-based CI agents that review every push against a documented standard to remove humans from the merge path"
type: "concept"
pillar: "building"
tags: [harness-engineering, code-review, agents, ci, agentic-coding-workflow, workflow, best-practices]
sources:
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-05-06_claude-code-docs_code-review.md"
  - "summaries/2026-05-06_claude-code-docs_ultrareview.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-06-29_nate-herk_stanford-storm-method-claude-research-skill.md"
  - "summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md"
  - "summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md"
timestamp: "2026-08-28"
---

# Reviewer Agents

Persona-based agents that run on every push in CI, each primed as a specific reviewer persona (reliability engineer, front-end architect, product-minded engineer, scalability engineer). Each reads a documented "what good looks like" for its domain plus the diff, and surfaces P2+ issues against that standard. Introduced by Ryan Lopopolo (OpenAI) at AI Engineer 2026 as the mechanism that removes synchronous humans from the PR-merge critical path.

## The Problem They Solve

On a team shipping 3-5 PRs per engineer per day, human code review is the merge bottleneck. Human reviewers also repeat themselves — the same classes of feedback recur across PRs because the underlying concern isn't encoded anywhere durable. Every repeat is a context failure the agent could have avoided with the right prompt at the right time.

Reviewer agents convert that repeated feedback into durable, parallel, always-available artifacts. Each comment class becomes:

1. A persona doc describing "what good looks like" in that domain
2. A CI agent that reads the doc + the diff and posts PR comments

From then on, every push gets the review the human used to give — without blocking on the human's calendar.

## Persona Design

Ryan's team runs a handful of personas, each scoped to a durable concern:

- **Reliability engineer** — retries, timeouts, error handling, idempotency, observability
- **Front-end architect** — component decomposition, state management conventions, accessibility
- **Product-minded engineer** — UX consistency, copy, critical user journey coverage, QA plan adherence
- **Scalability engineer** — N+1 queries, unbounded concurrency, memory footprint
- **Security reviewer** — input validation, auth boundaries, secret handling

Each persona has its own doc (usually in `docs/review-personas/<persona>.md`) that defines the standard. The reviewer agent for that persona is prompted with the doc, the diff, and instructions to surface only P2+ issues — not every stylistic nit. On Opus 4.7, apply this bar at the filter stage, not the finding stage — see [Coverage-First Prompting on Opus 4.7](#coverage-first-prompting-on-opus-47).

## How to Wire One

1. Pick one persona. Reliability is a good first target because the failure modes are concrete.
2. Write the doc. List the 10-20 things you actually look for when reviewing for reliability. Include examples of good and bad patterns.
3. Wire an agent SDK call into CI on every push. The call reads the persona doc + the PR diff + relevant context files and posts structured PR comments.
4. Ship it. Iterate on the doc as the agent misses or over-flags things.
5. Add the next persona.

## Non-Blocking by Design

A common objection: "won't reviewer agents bully the implementation agent into over-correcting?" Ryan's answer is to not make every comment blocking. The implementation agent can acknowledge, defer, or reject reviewer comments — like a human author would. The bias is toward *acceptance, not perfection*. Reviewer agents surface issues; the implementation agent and (occasionally) the human decide what to act on.

## Relationship to the Writer / Reviewer Pattern

The classic "writer / reviewer" pattern from [Claude Code](../tools/claude-code.md) (fresh-context reviewer beats self-review) is the single-PR version of the same idea. Reviewer agents generalize it:

- Fresh context per reviewer (so the reviewer can't rationalize the writer's mistakes)
- Multiple reviewers, each narrow and persona-specific
- Runs in CI on every push, not just on demand
- Reads a persona doc, so the review standard is durable and versioned

## Relationship to Structural Tests

Order of preference, from deterministic to judgment-based:

1. **Lint rule** if the concern is syntactic and per-file
2. **Structural test** if the concern is representational and whole-repo — see [Code-as-Text Structural Tests](code-as-text-structural-tests.md)
3. **Reviewer agent** if the concern requires judgment a deterministic check can't express
4. **Persona doc read by a human** only if the concern can't be articulated crisply enough for any of the above

Push every review concern as far down the ladder as possible. A reviewer agent that keeps surfacing the same issue is a signal that the issue should become a structural test or a lint.

## The Garbage Collection Feedback Loop

Ryan's team dedicates Fridays to "garbage collection" — every engineer's full-day job is to take every review pattern observed during the week and convert it into a durable artifact: a lint, a structural test, a reviewer-agent rule, or an update to a persona doc. This is what closes the loop. Without it, reviewer agents stay static while the kinds of slop the team is seeing evolve.

## Coverage-First Prompting on Opus 4.7

Opus 4.7 is meaningfully better at finding bugs than prior models — Anthropic measured +11pp recall on one of their hardest bug-finding evals based on real Anthropic PRs. But reviewer-agent harnesses tuned for 4.6 often see *measured* recall drop on 4.7 upgrade. This is a harness effect, not a capability regression. When the persona prompt says "only report high-severity issues," "be conservative," or "don't nitpick," Opus 4.7 follows that more faithfully than 4.6 did — it investigates the code the same depth, identifies the bugs, then drops findings below the stated bar. Precision rises while recall falls.

The fix is to split coverage from filtering. At the finding stage, tell the reviewer its job is coverage and to attach confidence + severity per finding. A separate verification / ranking / deduplication stage does the filtering:

```text
Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage — a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug. For each finding, include your confidence level and an estimated severity so a downstream filter can rank them.
```

This prompt works even without an actually separate second stage — moving the filter *conceptually* out of the finding step is often enough. If you must self-filter in one pass, replace qualitative language ("important", "nitpick") with a concrete bar: *"report any bugs that could cause incorrect behavior, a test failure, or a misleading result; only omit pure style or naming preferences."*

Practical implication for a persona harness: the persona doc and "what good looks like" bar is still valuable — that's precision guidance. But the conservatism lives in the filter stage, not the finding stage. *(Source: Anthropic, Claude Prompting Best Practices.)*

## Fresh Context per Reviewer (Pocock)

Matt Pocock's pipeline (AI Engineer 2026) makes the fresh-context principle concrete and load-bearing inside the AFK loop, not just inside CI:

> "If you let the implementer also review, the review happens in the dumb zone after the implementation burned the smart zone."

The reviewer must be a **separate agent invocation with its own clean context**, not a continuation of the implementer's session. This keeps the review inside the [smart zone](smart-zone.md) (~100K tokens) instead of operating on whatever sediment the implementation left behind.

#### A Second, Independent Reason: Group-Think

Frank Coyle (UC Berkeley, Aug 2026) arrives at the same prescription from a different premise, which is worth separating because it makes the rule stricter. Pocock's argument is about *capability* — a reviewer working in the dumb zone reviews badly. Coyle's is about *independence* — a reviewer that has seen the reasoning behind a claim can no longer evaluate that claim freshly, because collaborating agents converge: *"all the agents seem to kind of devolve into one idea"* [14:32].

The operational difference: the smart-zone argument is satisfied by giving the reviewer a *short* input. The group-think argument is not — it requires withholding a specific *category* of input. Coyle's critic receives the claim and the evidence but explicitly not *"the thought processes that went in to creating this claim"* [14:18]. A tidy summary of the implementer's reasoning would pass the smart-zone test and fail this one.

Note this cuts the opposite way from [Push vs Pull](#push-vs-pull-for-coding-standards) below, and the two are compatible: **push the standard, withhold the reasoning.** What the reviewer needs pushed is the external rubric it cannot discover on its own; what must be withheld is the implementer's internal deliberation. See [Parallel Agent Patterns § Group-Think as a Multi-Agent Failure Mode](parallel-agent-patterns.md#group-think-as-a-multi-agent-failure-mode). *(Source: Frank Coyle, AI Engineer 2026-08-08)*

### Inverted Model Split

A counter-intuitive operational consequence: **Sonnet for implementation, Opus for review.** Most teams instinctively put the bigger model on implementation; Matt argues the inverse — review is where you need the smarts, implementation can grind. Tying back to the same fresh-context point: a fresh-context Opus review on a Sonnet-implemented branch is qualitatively different from "the same Claude session reviewing what it just wrote."

This pairs cleanly with the unresolved tension Matt names at [0:59:18]: "more code review under AI is unavoidable. I don't honestly know what the answer to this yet" — Ralph batched commits push toward bigger PRs; the keep-PRs-small dictum pushes the other way. The Pocock answer doesn't resolve that, but it does ensure the review that *does* happen runs in fresh context on the smarter model.

In Sandcastle (his published TS library — see [Parallel Agent Patterns § Sandcastle](parallel-agent-patterns.md#pattern-4-sandcastle--worktreesandbox-afk-pipeline-pocock)), this is wired in directly: `model: "opus"` on the reviewer call, and the reviewer takes the branch as its sole input — no implementer history.

### Push vs Pull for Coding Standards

A representational decision sharper than "fresh context":

- **Implementer pulls** — skills sit in repo; agent reaches for them.
- **Reviewer gets pushed** — coding standards inlined into the review prompt verbatim.

Why: a fresh-context reviewer can't be relied on to discover the "what good looks like" doc on its own. Push the standards into the prompt, even if it duplicates what's in `docs/review-personas/`. The duplication is intentional — it's the price of a clean reviewer context.

## QA Plans as the Product-Reviewer's Rubric

For user-facing PRs, Ryan requires a QA plan — a checklist of features, critical user journeys, and required PR media (screenshots, recordings). The product-minded reviewer agent reads the QA plan + the attached media and asserts the plan was followed. This is what lets humans stop shoulder-surfing user-facing changes.

## Anthropic's Managed Reviewer-Agent Products

Anthropic ships two productized reviewer-agent fleets that implement this pattern out of the box — different on/off ramps for the same idea.

| Product | Trigger | Where it runs | Plan | Cost | Best for |
|---------|---------|---------------|------|------|----------|
| **[Code Review](../how-tos/claude-code-review.md)** | Automatic on PR per repo config | Anthropic infra | Team/Enterprise | ~$15-25 / review | Continuous PR-review automation |
| **[Ultrareview](../how-tos/claude-code-ultrareview.md)** | Manual (`/ultrareview` or `claude ultrareview`) | Remote sandbox | Pro/Max + extra usage | ~$5-20 / review | Pre-merge confidence on substantial changes |

Both run **independent verification fleets** — every finding is reproduced by a separate agent before being surfaced. This is the "fresh-context-per-reviewer" principle from above, scaled into a managed product.

**REVIEW.md** (Code Review) is the analogue of the persona docs from Ryan's pattern: a top-of-repo file injected as highest-priority into every agent in the review pipeline. Without it, you get generic findings. Tune what "Important" means for your repo, what to skip, what to always check. **Code Review reads CLAUDE.md and surfaces newly-introduced violations as nits** — keep CLAUDE.md current to avoid noisy nit findings.

The `gh api` JSON severity counts (Code Review) and `claude ultrareview --json` output let you wire either into a CI gate that fails the build on Important findings — Code Review itself completes with `neutral` conclusion and never blocks merge by itself.

## Beyond Code: Reviewer Personas Over Research Output

The same machinery transfers to non-code artifacts, where the "diff" is a set of factual claims rather than a patch. Nate Herk's `storm-research` skill (June 2026) is the clearest worked example: five persona lenses generate research independently, then a separate fleet of roughly six verification agents re-checks the output. Two conventions from it are worth importing into any reviewer-agent harness:

- **A per-item verdict vocabulary.** Every citation is checked against its **primary source** and labelled `confirmed` / `corrected` / `demoted`, collected into a source ledger at the bottom of the deliverable. This is the artifact-level equivalent of severity labels on findings — it makes the review auditable rather than narrative.
- **Provenance and dissent, not just a score.** Each finding carries a reliability rating *plus* which personas supported it and which challenged it. "Reliability 7/10 — supported by the reliability lens, challenged by the production-ops lens" is far more actionable than a bare confidence number, and it preserves the disagreement instead of averaging it away.

The versioning discipline that follows is the useful operational rule: **the unverified draft (V1) and the verified output (V2) are separate deliverables**, and only V2 is consumable. Nate is explicit that his own V1 contained claims that "just wasn't correct." If a pipeline has to be shortened for cost, cut a generating persona — not the verifier.

The reason this works is the same self-evaluation-bias argument as [Fresh Context per Reviewer](#fresh-context-per-reviewer-pocock): the generating personas are optimizing for finding evidence *for* their angle, not for auditing it, so the check must be performed by agents that did not produce the claim. See [Multi-Perspective Research (STORM Pattern)](multi-perspective-research.md) for the full pipeline.

## Unresolved Tensions

### Is the review bottleneck a throughput problem or a PR-quality problem?

*Surfaced: 2026-08-28 (ingest of 2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail).*

This page frames review as a capacity constraint, and reviewer agents as the way to take humans off the critical path:

> "On a team shipping 3-5 PRs per engineer per day, human code review is the merge bottleneck."
> "...the mechanism that removes synchronous humans from the PR-merge critical path."
> — [Ryan Lopopolo, *Harness Engineering: Humans Steer, Agents Execute*](../../summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md)

Dex Horthy rejects the framing at its root — the volume is a symptom of bad inputs, not a constraint to route around:

> "You don't have too many PRs. If you're drowning in PRs, you actually have too many bad PRs."
> — [Dex Horthy, *Harness Engineering Is Not Enough*](../../summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md) [17:04-17:11]

His prescription inverts the remedy: fix the input with AI-assisted up-front alignment (product review → system architecture → program design → vertical slices), spending 30 minutes of planning to save hours of review, until *"it's actually feasible to still read every line of code"* [16:57-17:00]. Where this page automates the reviewer, Horthy keeps the human reviewer and reduces what they have to read.

Both are held without choosing. They are not strictly incompatible — better inputs and automated persona review can compose — but they disagree about which side of the pipeline the investment belongs on, and about whether removing synchronous humans from the merge path is a goal or the failure mode.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the parent discipline
- [Multi-Perspective Research (STORM Pattern)](multi-perspective-research.md) — persona-based review applied to research claims instead of diffs
- [Code-as-Text Structural Tests](code-as-text-structural-tests.md) — the deterministic counterpart
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where reviewer agents fit in daily practice
- [Claude Code](../tools/claude-code.md) — writer/reviewer pattern, agent SDK for wiring
- [Code Review (Claude Code)](../how-tos/claude-code-review.md) — Anthropic's managed PR-review service
- [Ultrareview](../how-tos/claude-code-ultrareview.md) — multi-agent verified bug-finding fleet
- [Claude Routines](../tools/claude-routines.md) — the routines runtime that powers GitHub-event triggers
- [Smart Zone](smart-zone.md) — why fresh-context reviewer beats self-review
- [Parallel Agent Patterns](parallel-agent-patterns.md) — Sandcastle wires the fresh-context reviewer into AFK loops
- [Matt Pocock](../people/matt-pocock.md) — fresh-context-per-reviewer + inverted model split
