---
title: "Superpowers"
type: "tool"
pillar: "building"
tags: [claude-code, orchestration, agents, sub-agents, tdd, superpowers, workflow, visual-companion]
sources:
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
last_updated: "2026-04-15"
---

# Superpowers

A Claude Code plugin (installable via `/plugin` inside Claude Code) that adds orchestration, visual design iteration, and TDD-driven development on top of vanilla Claude Code. Lighter and more fluid than [GSD](gsd.md).

## Why It Exists

Like GSD, Superpowers addresses context rot by introducing sub-agent-driven development — assigning tasks to separate agents with clean context windows. Unlike GSD, it uses automatic skill invocation rather than explicit slash commands, making it feel more like a natural extension of Claude Code than a separate workflow.

## Core Approach

Superpowers loads 14-15 skills that Claude Code invokes automatically based on conversational context. Key characteristics:

- **Skill-based, not phase-based** — Skills activate naturally during conversation rather than requiring manual slash commands
- **Lighter research phase** — Less upfront investigation than GSD, more focus on interactive design iteration
- **Execution choice** — Offers both sub-agent-driven and inline execution at build time
- **Walk-away capability** — Unlike GSD's hands-on-every-phase approach, Superpowers lets you leave during execution

## Signature Features

### Visual Companion

Superpowers' primary differentiator. It spins up a dev server and presents multiple visual design options simultaneously (e.g., four aesthetic directions for a landing page), then drills down section by section. Chase AI highlights this as genuinely useful: "It's one thing when it tells you what it's going to do visually... it's much different when you can see everything all at once."

However, in the benchmark test the resulting designs were still generic — the visual companion improves the decision-making process but doesn't inherently produce better output.

### Red-Green-Refactor (TDD)

Superpowers enforces what it calls "the iron law: no production code without a failing test first." For every feature:
1. Create a test (red)
2. Write minimal code to pass it (green)
3. Refactor

This is a key philosophical difference from GSD, which emphasizes state management over test discipline.

## Benchmark Performance

In Chase AI's head-to-head benchmark (building an AI agency website):

| Metric | Superpowers | GSD | Vanilla Claude Code |
|--------|-------------|-----|---------------------|
| **Total time** | 1 hr | 1 hr 45 min | 20 min |
| **Total tokens** | 250K | 1.2M | 200K |
| **Planning tokens** | ~200K | ~600K | ~50K |
| **Output quality** | Indistinguishable | Indistinguishable | Indistinguishable |

Superpowers is significantly lighter than GSD (250K vs 1.2M tokens) but still 5x slower than vanilla Claude Code.

## When to Consider Superpowers

Chase AI's verdict: vanilla Claude Code for 99% of use cases. If you need an orchestration layer, Superpowers is the recommended choice over GSD because:

- **Lower token cost** — 250K vs 1.2M total tokens
- **More fluid workflow** — Automatic skill invocation vs manual slash commands
- **Lower risk of misjudging complexity** — If the task didn't need orchestration, you've lost 40 minutes (vs 80+ with GSD)
- **Visual companion** — Genuinely useful for design-heavy projects

**Suggested usage:** Install at the project level (`/plugin`) so it's available when needed, but don't invoke it by default.

## Related Pages

- [Claude Code](claude-code.md) — the platform Superpowers extends
- [GSD](gsd.md) — heavier alternative orchestration layer
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) — full benchmark comparison
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md) — the "agentic trap" that orchestration layers can fall into
