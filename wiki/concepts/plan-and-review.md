---
title: "Plan and Review"
type: "concept"
pillar: "building"
tags: [agentic-coding-workflow, plan-and-review, workflow, planning, review, parallel-agents, anti-patterns, claude-code, codex]
sources:
  - "summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
  - "summaries/2026-01-21_anthropic_agentic-coding-trends-2026.md"
timestamp: "2026-05-26"
---

# Plan and Review

Louis Knight-Webb's (Vibe Kanban) framing of the post-AI engineering job: as coding time collapses, it does **not** return as free time — it is **displaced** into planning and reviewing. The whole question of workflow design is which side of that ledger you spend your time on, and the matrix below tells you when each side wins.

This is the conceptual umbrella for several already-named patterns in this wiki — Cherny's plan-mode-first stance, Pocock's grill→PRD pipeline, Cole Medin's [PIV Loop](piv-loop.md), Lopopolo's harness-first counter-position. Knight-Webb's contribution is the **default rule** that ties them together and the **counter-example** that bounds it.

## The Displacement Argument

> *Coding time per task is shrinking with each model/tooling generation (Copilot → ChatGPT → Cursor → Claude Code). The naive expectation is that the freed time returns as slack. The reality is that the time is displaced, not freed — most of it migrates into planning and reviewing.*

AI is an accelerant — Knight-Webb's rough number is ~20 min returned per 30 min coded. The remaining ~10 min stays in your day; it just shows up as plan + review instead of code. So workflow design is no longer "how do I write code faster" — it is **"which side of plan/review do I spend my time on, per task."**

## Two Modes

| Mode | What it is | When it wins |
|------|-----------|-------------|
| **Plan-heavy** | Spec the work up front (markdown plan, spec-framework interrogation, near-TDD), then stay out of the loop | Most work — back-end features, refactors, migrations |
| **Review-heavy / in-the-loop** | Skip the detailed plan, "YOLO" a request, iterate by reviewing partial output | Front-end feature work where statefulness defeats specs |

Knight-Webb's framing collapses **spec frameworks**, **comprehensive plan markdown**, and **TDD** into the same family. The unifying property is *front-loaded human cost so the agent can run unattended.*

## The 5-Minute / 30-Minute Heuristic

> **"5 minutes of planning saves 30 minutes of reviewing."**

The single-line distillation. Treat it as the default operating heuristic — when tempted to skip the plan, set a 5-minute timer for spec writing and ship the plan to the agent at the buzzer. It will almost always pay back. The cases where it doesn't are the work-type matrix below.

## The Work-Type Matrix

| | **Feature** | **Migration / Refactor** |
|--|------------|--------------------------|
| **Front-end** | **In-the-loop wins** — animations, interactions, styles, transitions; edge cases explode and you can't enumerate them up front | Plan-heavy — same logic as back-end; refactors and migrations spec cleanly even on the front end |
| **Back-end** | Plan-heavy / near-TDD wins — well-defined inputs/outputs | Plan-heavy — the canonical case; spec exhaustively, stay out of the loop |

**The decision rule:** before starting a task, classify it on the matrix. If it lands in front-end-feature, accept that you'll iterate. Otherwise commit to writing the spec and not interrupting the agent.

The deeper claim: **don't pick a workflow style and apply it everywhere.** Pick per task using the matrix. Defaulting to one mode for all work is the same shape of mistake as defaulting to a single tool for all problems.

## Time Horizon and the 5-Minute Threshold

The wall-clock duration of a single agent run between prompts has been climbing fast:

| Era | Run length | Single unit |
|-----|-----------|-------------|
| Copilot | seconds | line |
| Original Cursor | ~30s | file |
| Claude Code 2024 | ~1–2 min | function/module |
| Claude Code 2025 | 5–10 min | feature |

Knight-Webb treats the time horizon as a first-class design variable: longer horizons enable better tooling (type-check loops, Playwright/Chrome MCP for browser QA) but **force the workflow itself to change once the run exceeds the human's ability to wait.**

Humans can passively wait ~5 minutes (browse Twitter); beyond that, sitting and watching logs is wasteful. So once average run-length crosses 5 minutes, single-stream workflows break.

This dovetails with [Smart Zone vs Dumb Zone](smart-zone.md) (≈100K tokens) on the *context* axis: the smart-zone ceiling tells you when to clear; the 5-minute threshold tells you when to parallelize.

## Episode vs. Arc: Reconciling with the Collaboration Paradox

Anthropic's 2026 Agentic Coding Trends Report frames the goal of agentic coding differently:

> "the right one is the quality of the review/direction/validation loop. The engineers' own intuition supports this — they delegate tasks they can 'sniff-check' easily, and keep design-dependent or high-stakes work in their own hands or in tight collaboration."

Read flat, that reads as a direct push-back on this page's "spec exhaustively, stay out of the loop" default. The reconciliation is that Knight-Webb and Anthropic are naming **different units of the same arc**.

A plan-heavy task is one *episode* — the unattended implementation run — inside a longer collaboration arc:

1. **Planning = direction.** The human writes the spec. Active participation.
2. **Implementation = unattended episode.** Knight-Webb's "stay out of the loop."
3. **Review = validation.** The human reads the diff and decides.

Measured per-episode, the implementation phase is high-delegation. Measured per-arc, the task is firmly inside Anthropic's "review, direction, validation" loop — the human is participating before and after the unattended segment. The two metrics — *minutes the agent runs unattended* vs. *total human involvement across the task* — are orthogonal and can both be high.

This does not soften Knight-Webb's load-bearing claim that the displaced time goes into **planning and reviewing**, not into in-flight collaboration. That distinction stays sharp: the unattended episode in the middle is genuinely unattended; this page's matrix and 5-min/30-min heuristic apply unchanged. The Anthropic framing is a layer *around* the per-task decision, not a replacement for it — you can keep using the matrix per task and the two wiki pages now agree at the structural level.

## Latency-vs-Accuracy Trade in the Harness

Each tier of tooling the agent uses raises run-length but also raises output quality:

| Tier | Run-time impact | Accuracy impact |
|------|----------------|-----------------|
| Returning code | fast | low |
| Type-checker loop | slower | higher |
| Playwright / Chrome MCP for front-end QA | order-of-magnitude slower | much higher |

Knight-Webb's framing: this is a worthwhile trade because the scarce resource is **your time in the loop, not the agent's wall-clock time.** Front-end QA via Playwright/Chrome MCP is his predicted next breakthrough (within ~9 months from May 2026).

The trade only makes sense once you've internalized the displacement argument: agent wall-clock is cheap, your attention is not.

## Parallelism as the Coping Mechanism

Once a single run exceeds the human attention span, you have two choices: waste the wait time, or run multiple agents in parallel worktrees. Knight-Webb's instantiation is **Vibe Kanban** — git worktree-based parallel runs with a Kanban-style review queue.

The job-shape change: the developer becomes a **manager of multiple parallel streams** — a job most software developers have never had to do. Review streams in rotation rather than babysitting any one.

See [Parallel Agent Patterns](parallel-agent-patterns.md) for the coordination patterns this enables (lock-file, orchestrator-worker, peer-to-peer agent teams, and Sandcastle's worktree+sandbox AFK pipeline). Vibe Kanban sits in the same family as Sandcastle as a productized worktree-based orchestrator.

## Focus Maxing: The Anti-Pattern

Knight-Webb explicitly coins **"focus maxing"** — and frames it as an **anti-pattern, not an aspiration.** "Focus maxing" describes tools and workflows that pull a human in and out of context every 30 seconds to babysit short agent runs.

The argument:

- Rapid context-switching between unrelated agent streams is cognitively expensive.
- Tools that fire interruptions every 30 seconds force exactly that pattern.
- The whole point of long agent runs is to give the human contiguous focus blocks.
- Therefore, the right tool design lets each agent run **as long as possible and yield back cleanly** — not encourage constant in/out cycling.

If a workflow forces you to check on an agent more than once every 5 minutes, redesign it — give the agent more tools (tests, type-check, browser) so it can self-verify before yielding.

This is the inverse of the conventional productivity story. The literature on flow says protect contiguous focus. Knight-Webb's contribution: name **focus maxing** as the failure mode where the agent-tooling violates that protection in a new way, and reject the optimization gradient that pulls toward it.

## The Four Jobs of the New Coding-Agent IDE

Knight-Webb's wishlist for what an IDE built around long-running parallel agents must do — and the surfaces most current tooling neglects:

1. **Task writing / planning** — help the human author the spec the agent runs from.
2. **QA** — help the human (or eventually the agent) verify the change actually works, especially front-end behavior.
3. **Code review** — most companies with money on the line will not ship fully vibe-coded changes without reading the diff, so this stays a human job.
4. **Shepherding to deploy** — the admin tail: monitor PR comments, react to CI signals, drive the change from "done" to "deployed."

Most current tooling addresses **code generation** well and the other four poorly. Audit your own setup and identify which surface is weakest — Knight-Webb predicts it's usually **shepherd-to-deploy** or **front-end QA**.

## Code Review Stays Human

Knight-Webb's position: AI-assisted review is fine; fully unread vibe-coded merges are not, for anyone with money on the line. Lean on AI for pre-review and PR-comment shepherding (job #4), but keep human read-through as a hard gate on production merges. This aligns with [Reviewer Agents](reviewer-agents.md) (fresh-context reviewer beats self-review) and Lopopolo's "minimal blocking gates" — the gate stays, it just moves to the right places.

## How to Apply

1. **Treat your time as the scarce resource.** Default to plan-heavy. Write a markdown plan or run a spec-interrogation pass before any non-trivial agent run; only YOLO when the cost of a wrong first attempt is genuinely lower than the planning cost.
2. **Use the matrix per task.** Front-end feature → in-the-loop. Everything else → plan-heavy and don't interrupt.
3. **Wire up tier-2 tooling.** Type-check loop in the harness; experiment with Playwright/Chrome MCP for front-end QA before it's mainstream.
4. **Stand up parallel worktrees** for any task family that routinely exceeds 5 minutes per run. Review streams in rotation.
5. **Audit for focus-maxing.** If a workflow demands attention more than once every 5 minutes, the fix is in the harness (more tools so the agent self-verifies), not in your discipline.
6. **Audit the four IDE jobs.** Find your weakest surface — likely shepherd-to-deploy or front-end QA — and invest there next.

## Anti-Patterns

- **Defaulting to in-the-loop for back-end work.** Front-loads no thinking; back-loads infinite review rounds. The matrix says plan-heavy; do that.
- **Skipping the matrix and picking a single mode for all work.** Plan-heavy works badly for stateful front-end; in-the-loop works badly for everything else. Classify per task.
- **Trying to wait through 5+ minute runs in a single stream.** That's the productivity destroying the gain — the long run was supposed to enable parallelism, not extend the waiting.
- **Focus-maxing.** Optimizing for 30-second attention bursts instead of contiguous blocks. This is the explicit failure mode Knight-Webb names.
- **Treating the 5-min/30-min line as universal.** It's a heuristic for the plan-heavy *family* (back-end features, refactors, migrations). The front-end-feature exception is real.

## How This Page Differs from Adjacent Concepts

| Page | What it gives you | What plan-and-review adds |
|------|------------------|---------------------------|
| [Smart Zone vs Dumb Zone](smart-zone.md) | Context-axis discipline (~100K threshold, `/clear` over `/compact`) | Time-axis discipline (5-min threshold; per-task matrix) |
| [PIV Loop](piv-loop.md) | Per-ticket Plan-Implement-Validate primitive (Cole Medin) | The general default-stance argument that PIV is the "implement" half of |
| [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) | The full how-to with all the tactics | The thesis-level *why* for plan-heavy default + the matrix exception |
| [Parallel Agent Patterns](parallel-agent-patterns.md) | The coordination patterns once you go parallel | The argument for *when* to go parallel (5-min threshold) |
| [Plan-Mode Skepticism (Lopopolo)](../how-tos/agentic-coding-workflow.md#plan-mode-skepticism-ryan-lopopolo-openai) | Counterpoint: skip the plan, fix the harness | Reconciles via the matrix — plan when you'll read it; harness-fix when the harness is the gap |

## Sources

- [Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban](../../summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md) — origin of the 5-min/30-min heuristic, the work-type matrix, the time-horizon argument, and the focus-maxing anti-pattern

## Related Pages

- [Focus Maxing](focus-maxing.md) — the anti-pattern Knight-Webb names, broken out for cross-reference
- [Parallel Agent Patterns](parallel-agent-patterns.md) — coordination patterns once the 5-minute threshold makes parallelism mandatory
- [Smart Zone vs Dumb Zone](smart-zone.md) — context-axis counterpart to the time-axis 5-minute threshold
- [PIV Loop](piv-loop.md) — Cole Medin's per-ticket Plan-Implement-Validate, a worked instance of plan-heavy
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — full how-to threading these tactics together
- [Reviewer Agents](reviewer-agents.md) — why human code review remains the production gate
- [Harness Engineering](harness-engineering.md) — where the latency-vs-accuracy trade is wired
- [Louis Knight-Webb](../people/louis-knight-webb.md) — author of the framing
- [The Collaboration Paradox](collaboration-paradox.md) — Anthropic's adjacent framing of where the displaced time goes; partial overlap with the time-displacement argument here
