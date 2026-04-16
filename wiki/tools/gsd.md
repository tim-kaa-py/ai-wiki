---
title: "GSD (Get Stuff Done)"
type: "tool"
pillar: "building"
tags: [claude-code, orchestration, agents, sub-agents, planning, gsd, workflow]
sources:
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
last_updated: "2026-04-15"
---

# GSD (Get Stuff Done)

A Claude Code orchestration framework that adds rigid, phase-based planning and sub-agent-driven development on top of vanilla Claude Code. Installed via a single CLI command.

## Why It Exists

GSD addresses "context rot" — the degradation of output quality as a single Claude Code session fills its context window. Instead of executing everything in one session, GSD assigns each task to a separate sub-agent with a clean context window. It adds extensive upfront research, planning documentation, and state management to keep sub-agents aligned.

## Core Workflow

GSD uses explicit slash commands to progress through phases:

1. **`/gsd new project`** — Initialize the project
2. **Research phase** — Four parallel research sub-agents (stack, features, architecture, pitfalls) investigate the problem space
3. **Planning phase** — Generates multiple markdown documents: `requirements.md`, `roadmap.md`, `state.md`, phase documents
4. **Execution phase** — Phase-by-phase development, each requiring user discussion and approval before proceeding

The workflow is hands-on: you need to be at the keyboard for every phase transition.

## "Northstar" State Management

GSD's distinguishing philosophy: with constant context resets across sub-agents, you need a persistent reference for "where we are and where we're going." GSD achieves this through explicit markdown files that act as a "northstar" — every sub-agent reads these to understand the project state.

Key state files:
- `requirements.md` — what needs to be built
- `roadmap.md` — sequenced plan
- `state.md` — current progress
- Phase documents — per-phase specifications

## Benchmark Performance

In Chase AI's head-to-head benchmark (building an AI agency website with landing page, blog viewer, and blog generator):

| Metric | GSD | Superpowers | Vanilla Claude Code |
|--------|-----|-------------|---------------------|
| **Total time** | 1 hr 45 min | 1 hr | 20 min |
| **Total tokens** | 1.2M | 250K | 200K |
| **Planning tokens** | ~600K | ~200K | ~50K |
| **Planning time** | ~40 min | ~40 min | ~10 min |
| **Output quality** | Indistinguishable | Indistinguishable | Indistinguishable |

GSD's research-heavy approach is 3x more expensive than Superpowers and 12x more expensive than vanilla Claude Code before a single line of production code is written.

## Limitations

- **Does not support Claude Code max plan** — GSD 2.0 forces users to pay full per-token prices, making it economically unviable for most users despite architectural improvements.
- **Rigid workflow** — Explicit slash commands and manual phase transitions create friction compared to Superpowers' automatic skill invocation.
- **Research overhead** — The four-agent parallel research phase burns significant tokens on tasks where the stack and architecture are already known.

## When to Consider GSD

Chase AI's verdict: vanilla Claude Code for 99% of use cases. If you must use an orchestration layer, prefer [Superpowers](superpowers.md) over GSD. Reserve GSD for extreme edge cases with genuinely novel architectures where the upfront research phase provides value — and verify max plan support before adopting GSD 2.0.

## Related Pages

- [Claude Code](claude-code.md) — the platform GSD orchestrates
- [Superpowers](superpowers.md) — lighter-weight alternative orchestration layer
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) — full benchmark comparison
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md) — the "agentic trap" that orchestration layers can fall into
