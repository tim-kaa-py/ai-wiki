---
title: "Focus Maxing (Anti-Pattern)"
type: "concept"
pillar: "building"
tags: [anti-patterns, agentic-coding-workflow, parallel-agents, claude-code, workflow, attention]
sources:
  - "summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
last_updated: "2026-05-09"
---

# Focus Maxing (Anti-Pattern)

A term coined by **Louis Knight-Webb** (Vibe Kanban) and explicitly framed as an **anti-pattern, not an aspiration**. "Focus maxing" describes tools and workflows that pull a human in and out of context every ~30 seconds to babysit short agent runs.

## The Frame

> *"That fries the brain and is no way to live."* — Knight-Webb

Conventional productivity advice says protect contiguous focus. The new failure mode is that AI tooling can violate that protection in a way no prior tool could — by demanding attention in the gaps between short agent runs.

If you find yourself glancing at an agent every 30 seconds to nudge it forward, the workflow is wrong.

## The Argument

- **Premise.** Rapid context-switching between unrelated agent streams is cognitively expensive.
- **Premise.** Tools that fire interruptions every 30 seconds force exactly that pattern.
- **Premise.** The whole point of long agent runs is to give the human contiguous focus blocks.
- **Conclusion.** The right tool design lets each agent run **as long as possible and yield back cleanly** — not encourage constant in/out cycling.

## How It Shows Up

- Status pings on every tool call.
- Confirmation prompts on routine actions the agent could verify itself.
- Watching a single short-running agent in real-time instead of letting it complete and return.
- Workflows where you're "checking in" every minute or two on a long-running task.
- IDE plugins optimized to surface every agent micro-event back to the human.

## The Fix

Push the agent toward longer-running, self-verifying behavior so it doesn't need babysitting:

1. **Tier the harness.** Add type-check, test runs, and (for front-end) Playwright/Chrome MCP into the agent loop so it can self-verify before yielding. See [Plan and Review § Latency-vs-Accuracy Trade](plan-and-review.md#latency-vs-accuracy-trade-in-the-harness).
2. **Use [auto mode](../how-tos/claude-code-auto-mode.md) / `accept-edits`** so the agent doesn't pause for every confirmation.
3. **Run multiple streams in parallel** and rotate review attention rather than babysitting one. See [Parallel Agent Patterns](parallel-agent-patterns.md).
4. **Audit your interrupt rate.** If a workflow forces you to check on an agent more than once every 5 minutes, redesign it.

## Why It Matters

This is the inverse of the conventional productivity story. The literature on flow says protect contiguous focus. Knight-Webb's contribution is to **name the failure mode** where new agent tooling violates that protection in a new way, and to **reject the optimization gradient** that pulls toward it.

The risk: an entire ecosystem of agent IDE features can be optimized for surfacing-everything-to-the-human (which feels like control) when the actual job is letting-the-agent-finish-and-yield (which feels like trust). "Focus maxing" is the trap pretending to be the goal.

## Relationship to the 5-Minute Threshold

[Plan and Review](plan-and-review.md) names ~5 minutes as the operational threshold above which a single-agent stream demands parallelism. Focus maxing is what happens when you stay below that threshold *by design* — splitting a 20-minute task into 40 thirty-second prompts to keep yourself "in control." The fix is to extend the run-length, not shorten it.

## Sources

- [Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban](../../summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md) — coining the term and naming the anti-pattern

## Related Pages

- [Plan and Review](plan-and-review.md) — the broader frame; focus maxing is the named anti-pattern within it
- [Parallel Agent Patterns](parallel-agent-patterns.md) — the alternative once runs cross the 5-minute threshold
- [Claude Code Auto Mode](../how-tos/claude-code-auto-mode.md) — `accept-edits` permission mode that reduces the interrupt rate
- [Smart Zone vs Dumb Zone](smart-zone.md) — context-axis counterpart to this attention-axis discipline
- [Louis Knight-Webb](../people/louis-knight-webb.md) — coined the term
