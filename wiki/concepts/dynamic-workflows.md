---
title: "Dynamic Workflows (Algebra for Agents)"
type: "concept"
description: "Claude Code's sandboxed fan-out/verify/fan-out orchestration primitive, and Boris Cherny's argument that it constitutes a new axis of test-time compute"
pillar: "building"
tags: [claude-code, agents, agent-orchestration, test-time-compute, workflow, parallel-agents, scaling]
sources:
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
timestamp: "2026-08-03"
---

# Dynamic Workflows (Algebra for Agents)

A Claude Code orchestration feature and, per Boris Cherny, a scaling argument. Invoked with no syntax at all — you literally say **"use a workflow"** [24:48-25:35].

## Mechanics

- **Sandbox:** Bun is used as the sandbox; a VM is started inside it, and Claude orchestrates agents within that VM.
- **Shape:** fan-out → verify/summarize → fan-out again [26:09-26:29]. The verify/summarize stage between fan-outs is what keeps the composition from degenerating into an unreviewed pile of parallel output.
- **Scale:** thousands to tens of thousands of agents per task [24:50-24:57].

## "An Algebra for Agents"

The design comes from Cherny's functional-programming background. The primitives are composition operators — run agents **in sequence**, run agents **in parallel** — and they compose [26:29-26:47]. That is the whole interface. There is no DAG file, no phase plan, no orchestration config; the model constructs the composition at runtime from the task.

This is the load-bearing distinction from the pipeline-shaped patterns in [Parallel Agent Patterns](parallel-agent-patterns.md): a Kanban DAG or a lock-file queue has a fan-out width determined by *your* backlog, decided before the run. A dynamic workflow's structure is decided by the model, during the run, from the task.

## The Test-Time-Compute Argument

Cherny's strong claim: *"this is actually like a new form of test time compute"* [26:47-27:34]. The reasoning chain:

- Model intelligence has historically scaled along **net size**, **training data**, and **training flops** [26:54-27:13].
- Test-time compute added a fourth axis — *"a fancy way, a researcher way of saying how many tokens does it generate"* [27:13-27:21].
- A single agent's token generation is bounded by its context window and its serial wall-clock time.
- An orchestration algebra (sequence + parallel composition, sandboxed, with verify/summarize between fan-outs) lets **one task** productively consume thousands of agents' worth of tokens.
- Therefore orchestration is not merely an engineering convenience but *"a new way to orchestrate test time compute"* — **a scaling axis you can push on without waiting for a new model** [27:21-27:34].

Empirical support offered: the 11-day Bun rewrite, the 14+ day Electron→Swift rewrite, and ~20-30 self-maintenance routines doing *"the work of dozens or hundreds of engineers"* [29:54-30:06].

The claim is worth holding at arm's length in one respect: "more tokens spent per task" is a real lever, but Cherny does not present a scaling *curve* — no measured relationship between agent count and task success. The 15× cost rule from Anthropic's own multi-agent research system ([Parallel Agent Patterns § Pattern 2](parallel-agent-patterns.md#pattern-2-orchestrator-worker-multi-agent-research-system)) found ~80% of quality variance explained by token usage *up to a point*. Treat "a new axis" as a directional claim about where leverage is, not as a demonstrated power law.

## Workflows vs Loops vs Routines

Three distinct primitives that are easy to conflate. The discriminator is **context sharing**, not scheduling [27:40-28:11]:

| Primitive | Shape | Context | Where it runs |
|-----------|-------|---------|---------------|
| **Dynamic workflow** | One task broken into chunks | **Shared context** across the chunks | Sandboxed VM, orchestrated by Claude |
| **Loop** | One repetitive task, re-run | No shared context; may share **memory** | Local — a cron job on your machine |
| **Routine** | Same as a loop | No shared context; may share memory | Cloud — so you can close your laptop |

**Picking:** reach for a workflow when a single large task decomposes; reach for loops/routines when the same context-free chore recurs hourly or daily. See [Claude Routines](../tools/claude-routines.md) for the loop/routine end and [Agent Loops](agent-loops.md) for the loop primitive itself.

## Self-Maintenance as the Flagship Use

Anthropic runs ~20-30 daily routines across its CLI, iOS, Android, and desktop codebases [28:11-29:54]:

- Dead-code cleanup (static + dynamic analysis — *unprompted*, see [Product Overhang](product-overhang.md))
- Shipping fully-rolled-out experiments
- Adding test coverage
- Deleting useless tests *"added by older models or added by people"*
- **"Abstraction police"** — finding near-duplicate abstractions across a large codebase and unifying them

Each is roughly one sentence of prompt. The abstraction-police routine is the most instructive: it is a task that is trivially describable and prohibitively tedious for a human at repo scale — exactly the profile that fan-out orchestration converts from "nobody does it" to "it happens nightly."

## Related Pages

- [Parallel Agent Patterns](parallel-agent-patterns.md) — the pipeline-shaped alternatives with human-decided fan-out width
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — Anthropic's five canonical composition patterns
- [Claude Routines](../tools/claude-routines.md) — the cloud-cron end of the taxonomy above
- [Agent Loops (Loop Engineering)](agent-loops.md) — the local-loop primitive
- [Product Overhang and Hobbling](product-overhang.md) — why one-sentence routines discover capabilities nobody prompted for
- [Boris Cherny](../people/boris-cherny.md)
