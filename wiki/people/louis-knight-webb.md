---
title: "Louis Knight-Webb"
description: "Vibe Kanban founder arguing software engineering is becoming plan and review rather than writing code"
type: "person"
pillar: "ecosystem"
tags: [agentic-coding-workflow, plan-and-review, parallel-agents, vibe-kanban, anti-patterns, claude-code, codex]
sources:
  - "summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
timestamp: "2026-05-09"
---

# Louis Knight-Webb

Founder of **Vibe Kanban** — a parallel-agent UI built around git worktrees and a Kanban-style review queue. His AI Engineer 2026 talk *Software Engineering Is Becoming Plan and Review* is the most concise current statement of the post-AI engineer's job description and the operational rule that follows from it.

## Key Contributions

- **The displacement argument.** Coding time does not return as free time when AI accelerates it — it migrates into planning and reviewing. Workflow design is now about which side of that ledger you spend your time on. *(Source: 2026-05-02)*
- **The 5-min / 30-min heuristic.** *"5 minutes of planning saves 30 minutes of reviewing."* The default operating rule. See [Plan and Review § The 5-Minute / 30-Minute Heuristic](../concepts/plan-and-review.md#the-5-minute--30-minute-heuristic). *(Source: 2026-05-02)*
- **The work-type matrix (front-end vs back-end × feature vs migration).** Tells you when to default to plan-heavy and when to break that default. Front-end feature work is too stateful to spec exhaustively → in-the-loop wins; everything else → plan-heavy / near-TDD. See [Plan and Review § The Work-Type Matrix](../concepts/plan-and-review.md#the-work-type-matrix). *(Source: 2026-05-02)*
- **The 5-minute threshold for parallelism.** Once average single-agent run-length crosses 5 minutes, single-stream workflows break. Parallelism is the coping mechanism. Vibe Kanban is his instantiation. See [Parallel Agent Patterns § When the 5-Minute Threshold Hits](../concepts/parallel-agent-patterns.md). *(Source: 2026-05-02)*
- **Focus Maxing — coined as an anti-pattern.** Tools that pull humans in and out of context every 30 seconds to babysit short agent runs. The failure mode to **avoid**, not optimize for. See [Focus Maxing](../concepts/focus-maxing.md). *(Source: 2026-05-02)*
- **The four jobs of the new coding-agent IDE.** Task writing, QA, code review, shepherd-to-deploy. Most current tooling addresses code generation well and these four poorly. See [Plan and Review § The Four Jobs of the New Coding-Agent IDE](../concepts/plan-and-review.md#the-four-jobs-of-the-new-coding-agent-ide). *(Source: 2026-05-02)*

## Key Arguments

**Why coding time becomes plan + review.** Coding time per task is shrinking with each model/tooling generation; engineering work decomposes into plan / write / review-own / review-others; the "write" portion is the one collapsing; AI is an accelerant (~20 min back per 30 min coded) but most of the difference moves into planning and reviewing rather than returning as slack. Therefore, the future job description is plan + review, and the workflow question is how those two split. *(Source: 2026-05-02)*

**Why front-end feature work breaks the plan-heavy default.** Front-end feature work is stateful (interactions, animations, styles, transitions) — edge cases explode and you cannot enumerate them up front. The deliverable's correctness is a function of behaviors a spec cannot fully describe. Therefore, in-the-loop iteration is the lesser evil for front-end features, while back-end features, refactors, and migrations spec cleanly and reward plan-heavy / near-TDD. *(Source: 2026-05-02)*

**Why focus maxing is the wrong optimization gradient.** Rapid context-switching between unrelated agent streams is cognitively expensive; tools that fire interruptions every 30 seconds force exactly that pattern; the whole point of long agent runs is to give the human contiguous focus blocks. Therefore, the right tool design lets each agent run as long as possible **and yield back cleanly** — not encourage constant in/out cycling. *(Source: 2026-05-02)*

## Notable Quotes

> "Five minutes of planning saves you thirty minutes of reviewing."

> "Focus maxing fries the brain. That's no way to live."

> "Just because you can fit a million tokens doesn't mean you should." — actually Cole Medin's, but Knight-Webb's argument runs parallel: the scarce resource is the human's attention, not the agent's wall-clock time or the model's window.

## Context

Founder of [Vibe Kanban](https://github.com/BloopAI/vibe-kanban), a TypeScript UI for managing parallel coding-agent runs across git worktrees. The May 2026 AI Engineer talk (20 minutes) sets out the conceptual frame; the talk's live-demo half (Vibe Kanban shutdown narrative + product Q&A on hiring/enterprise sales) is intentionally not summarized in this wiki — it's company-specific commentary rather than transferable engineering argument.

Knight-Webb's intellectual neighbors in this wiki:

- **Matt Pocock** — adjacent worktree-based parallelism (Sandcastle); Pocock's contribution is the structured Kanban DAG and the fresh-context reviewer; Knight-Webb's contribution is the *thesis* (plan vs review as the new job) and the *anti-pattern* (focus maxing) the parallelism is the cure for. See [Matt Pocock](matt-pocock.md).
- **Cole Medin** — adjacent plan-heavy framing via the [PIV Loop](../concepts/piv-loop.md). PIV is the per-ticket implementation of "plan-heavy" — Knight-Webb's general thesis is what justifies PIV as the default. See [Cole Medin](cole-medin.md).
- **Boris Cherny** — agreement on plan-mode-first as the high-impact lever (see [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)).
- **Ryan Lopopolo** — friendly tension. Lopopolo's "skip the plan, fix the harness" position is the matrix exception applied to a different axis: where the harness is the gap, plans don't help. Both can be true depending on the gap.

## Related Pages

- [Plan and Review](../concepts/plan-and-review.md) — the central thesis page
- [Focus Maxing](../concepts/focus-maxing.md) — the anti-pattern Knight-Webb coined
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — coordination patterns once the 5-minute threshold makes parallelism mandatory
- [Smart Zone vs Dumb Zone](../concepts/smart-zone.md) — context-axis counterpart to the time-axis 5-minute threshold
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — full how-to threading these tactics together
- [Matt Pocock](matt-pocock.md) — adjacent worktree-based parallelism (Sandcastle)
- [Cole Medin](cole-medin.md) — adjacent plan-heavy framing via PIV
