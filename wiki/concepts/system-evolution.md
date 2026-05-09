---
title: "System Evolution (Outer-Loop AI-Layer RCA)"
type: "concept"
pillar: "building"
tags: [agentic-engineering, claude-code, system-evolution, outer-loop, ai-layer, compounding, root-cause-analysis]
sources:
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
last_updated: "2026-05-09"
---

# System Evolution (Outer-Loop AI-Layer RCA)

The retroactive root-cause analysis of *the AI layer* — not just the code — when a coding agent ships a defect. This is Cole Medin's load-bearing argument and the **compounding mechanism** that distinguishes principled agentic engineering from one-off prompting. Without it, every shipped defect is a one-time cleanup. With it, every shipped defect makes the next sprint cheaper.

## The Argument [57:45-01:00:09]

Cole's reasoning, structured:

> **Premise 1.** Coding agents are non-deterministic. Some defects are inevitable even with perfect planning.
>
> **Premise 2.** Every defect was *enabled* by some gap in the context the agent was given — a missing rule, an incomplete command, an unclear plan template.
>
> **Premise 3.** Patching only the code leaves that gap in place; the next ticket on the same area will hit the same class of bug.
>
> **Premise 4.** Rules and commands are versionable Markdown — they can be edited, PR-reviewed, and merged like code.
>
> **→ Conclusion.** Every bug is an opportunity to upgrade the [AI layer](ai-layer.md). Treat the bug-fix PR and the AI-layer-fix PR as parallel artifacts. Skipping the second one means surrendering the compounding mechanism.

This is the load-bearing argument of his whole system. *"It's what turns 'using Claude Code' into 'operating a principled agentic engineering practice.'"*

## When System Evolution Fires

System Evolution is the **outer loop** in Cole's two-loop / three-phase model. Triggers:

- A bug shipped to production or QA.
- A reviewer caught something the agent should have caught.
- The agent had to be corrected on the same issue twice in implementation.
- A `plan.md` had a recurring blind spot (e.g., consistently misses migration steps).

The trigger is *agent slip*, not human preference. Style nits and judgment calls don't fire System Evolution; missed correctness, missed dependencies, missed integration steps do.

When the trigger fires, the engineer **steps out of the next [PIV loop](piv-loop.md)** — does not start the next ticket — and runs the outer-loop pass first.

## The Outer-Loop Pass

### 1. Triggering prompt

Cole's reusable prompt that names the outer-loop trigger:

> *"Claude, you allowed this problem to creep into my codebase. Dive into your AI layer — your rules, commands, and skills, the workflow I brought you through — and identify things we could improve so this kind of issue doesn't happen again."*

The prompt is **load-bearing in its phrasing.** "*You allowed this*" puts the agent in a self-RCA frame. "*Dive into your AI layer*" names the artifacts to inspect. "*This kind of issue*" forces generalization beyond the specific bug.

### 2. What gets edited

Four classes of artifact, in roughly increasing scope:

| Artifact | When to edit it |
|----------|-----------------|
| **Plan template** | The plan for this ticket missed a step that should have been mandatory (e.g., "always include a migration step for schema changes") |
| **On-demand context** (a specific command's body) | The command that produced the artifact has a gap (e.g., `/plan` doesn't ask about backwards compatibility) |
| **Global rules** | The convention applies across all sessions (e.g., "always use uv for Python") |
| **Plan/PRD templates** | The structure of the destination doc is missing a section (e.g., "Out of Scope") |

Don't reflexively reach for global rules. They cost context on every session — over-stuffing them puts every future session into the [dumb zone](smart-zone.md) earlier. Prefer the smallest-scope edit that prevents the class of bug.

### 3. PR-review the AI-layer change

The AI-layer fix and the code fix are **parallel artifacts**, both in source control, both PR-reviewed:

```
PR #341  Fix migration order in poll-builder schema (code)
PR #342  /plan: require migration-step section for schema changes (AI layer)
```

Reject AI-layer changes without a PR description explaining what failure mode they address. Add a `CODEOWNERS` entry for `.claude/` so AI-layer changes get the same review rigor as production code.

## The Compounding Move

A bug-fix-only practice is linear: each defect costs one fix, the next defect costs another fix, the rate of defects stays roughly constant. System Evolution turns the curve sub-linear: each defect upgrades the AI layer, which prevents the *class* of defect, so the rate falls over time.

This is the difference between:

- **Without System Evolution:** "Using Claude Code." The system gets one bug fix per bug.
- **With System Evolution:** "Operating a principled agentic engineering practice." The system gets one bug fix *and* a piece of AI-layer scaffolding per bug.

If the AI layer is not in source control with PR review, the layer **rots** — manual edits drift, no one knows what's authoritative, the discipline collapses. The PR-review move is what makes the loop survive.

## How System Evolution Differs from Adjacent Patterns

| Pattern | Trigger | What changes | Optimization style |
|---------|---------|-------------|--------------------|
| **System Evolution** (Cole Medin) | A specific defect shipped | Rules / commands / skills (4 specific artifacts) | Reactive, defect-driven RCA |
| **[Auto Research](auto-research.md)** (Karpathy / Ben AI) | Scheduled or on-demand | A single skill's prompt body, against boolean criteria | Proactive, criteria-driven optimization |
| **Garbage Collection Day** (Lopopolo / OpenAI) | Weekly cadence | Lints, structural tests, reviewer-agent rules, persona docs | Proactive, comment-batch-driven |
| **[Meta Harness](meta-harness.md)** (Khattab / Stanford) | Research run | The full pipeline / harness | Benchmark-driven, research scale |

System Evolution is closest to Garbage Collection Day in spirit — both convert recurring agent failures into durable repo artifacts. The difference is cadence and unit of work. GC Day batches a week's worth of comments into a Friday pass; System Evolution fires per-defect, immediately, before the next ticket starts.

## How to Apply

1. **Define the trigger.** Write down what counts as "agent slip" in your team's CONTRIBUTING.md. *Anything* matching the trigger pauses the next [PIV loop](piv-loop.md) until the outer-loop pass runs.
2. **Make the prompt a skill.** Save Cole's self-evolution prompt as a skill (e.g., `evolve-system`). When a defect ships, you invoke it — you don't paraphrase it.
3. **Default to smallest-scope edits.** Plan template > on-demand command > global rule. Don't bloat global rules.
4. **PR-review AI-layer changes.** `.claude/` is in source control. Every change has a PR description naming the failure mode.
5. **Track the curve.** Count defects per sprint. If the count is flat after three months of System Evolution, the loop isn't actually firing — investigate.

## Anti-Patterns

- **Skipping the outer-loop pass under deadline pressure.** The whole compounding argument depends on the loop firing every time. Skip it once and the practice degrades to "fancier prompting."
- **Bloating global rules.** Every rule is a permanent context tax. The default scope is "this command" or "this plan template," not "all sessions forever."
- **Manual edits to `.claude/` outside PR review.** The AI layer rots. After three months, no one knows which rules are intentional.
- **Treating the bug-fix PR as the whole job.** The code fix without the AI-layer fix is a regression that will hit again. Both PRs ship together or System Evolution didn't happen.
- **Letting humans-in-the-loop replace the layer.** "I just remind the agent every time" works for the human who knows. New hires inherit nothing. Encode the reminder.

## Sources

- [Cole Medin — Full Guide to Becoming a Principled Agentic Engineer](../../summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md) — origin of the term, the argument, and the self-evolution prompt

## Related Pages

- [PIV Loop](piv-loop.md) — the inner loop System Evolution is the outer counterpart of
- [AI Layer](ai-layer.md) — the artifact System Evolution edits
- [Auto Research](auto-research.md) — proactive criteria-driven optimization (sibling, not substitute)
- [Agentic Coding Workflow § Removing Humans from PR Review](../how-tos/agentic-coding-workflow.md#removing-humans-from-pr-review-ryan-lopopolo-openai) — Lopopolo's Garbage Collection Day as a related cadence-based pattern
- [Cole Medin](../people/cole-medin.md) — author of the argument
