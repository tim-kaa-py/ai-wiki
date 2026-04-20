---
title: "Generator-Evaluator Harness"
type: "concept"
pillar: "understanding"
tags: [generator-evaluator, harness-engineering, agents, multi-agent, sprint-contracts, evaluation, gan]
sources:
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
last_updated: "2026-04-20"
---

# Generator-Evaluator Harness

A GAN-inspired agent pattern: a **generator** produces candidate output, a **separate evaluator** critiques it against an explicit rubric, and the pair iterates until the evaluator signs off. Anthropic's production variant (March 2026) adds a **planner** in front — Planner → Generator → Evaluator — and uses Playwright (or equivalent) to let the evaluator actually run the app instead of just reading code.

This is the evaluator-optimizer pattern from Anthropic's [five canonical workflows](agent-orchestration-patterns.md), taken seriously at production scale.

## Why Separation Matters

**Self-evaluation bias:** the same model praises its own output even when it's bad. Making a generator self-critical is a losing fight. Splitting the roles into two agents is more tractable — the evaluator has a narrower mandate and no ego investment in the generation.

## Architecture

```
Planner        Generator                  Evaluator
  │                │                          │
  ├── brief ─────▶ │                          │
  │                ├── candidate artifact ───▶│
  │                │                          │── runs it (Playwright/Puppeteer)
  │                │◀─── rubric-graded ───────│
  │                │     critique             │
  │                └── revise ─────┐          │
  │                                ▼          │
  │                         (loop 5-15x per artifact)
```

- **Planner** expands a one-line brief into a spec.
- **Generator** builds incrementally.
- **Evaluator** tests with browser automation — actually clicks through the running app.

Typical loop depth: **5-15 cycles per artifact**.

## Sprint Contracts

Before implementation begins, planner and generator negotiate a **sprint contract** — an explicit definition of "done" for this unit of work. Lifts the completion criterion out of the generator's judgment and into a shared artifact.

Complements execution contracts (see [Natural Language Harness](natural-language-harness.md)): sprint contracts bound the *work unit*, execution contracts bound the *agent call*.

## Explicit Grading Rubric

The evaluator scores against pre-agreed dimensions. Anthropic's app-building harness uses four:

- **Design** — visual and UX quality
- **Originality** — non-derivative approach
- **Craft** — code quality and detail
- **Functionality** — does it actually work

Upfront rubrics turn fuzzy "is it good?" into a structured scoring pass.

## The Cost Reality

The canonical data point from the Anthropic post (March 2026):

| Approach | Time | Cost |
|----------|------|------|
| Solo coding agent | 20 min | $9 |
| Planner/Generator/Evaluator | 6 hours | $200 |

**~20× more expensive** — but it actually ships a playable app from a one-line brief, which the solo agent cannot.

Use when: the output is high-value, long-horizon, and not verifiable by unit tests alone. Skip when: a single agent can verify its own output via tests in minutes.

## The Subtraction Principle

> **Stronger model → simpler harness.**

When Anthropic upgraded the app-building loop to Opus 4.6:

- Removed sprint decomposition (model handled it natively)
- Dropped from per-sprint QA to a single final QA pass

The generator-evaluator spine stayed; the scaffolding around it was pruned. See [Harness Engineering](harness-engineering.md) on craft-of-subtraction.

## Browser Automation as Evaluator Eyes

For user-facing apps, the evaluator must **run** the product, not read its code. Two options in use:

- **Playwright** — Anthropic's app-building harness
- **Puppeteer MCP** — the initializer/coding-agent harness (Nov 2025)

Unit tests are not a substitute here: a feature can pass unit tests and still be broken end-to-end. The evaluator's E2E run is what prevents false "done" claims.

## When to Reach for This Pattern

- Creative agent tasks where "good" is not unit-testable (design, writing, UI)
- Long-horizon builds where premature completion is a real risk
- Projects where generator self-evaluation has already failed

## When NOT to Reach for It

- Short tasks with cheap, fast verification (tests, compilers, typecheckers)
- Budget-constrained runs — the 20× cost multiplier is real
- Tasks a stronger model can now one-shot (re-test on each model upgrade)

## Related Pages

- [Harness Engineering](harness-engineering.md) — the parent discipline
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the canonical evaluator-optimizer pattern this elaborates
- [Natural Language Harness](natural-language-harness.md) — execution contracts alongside sprint contracts
- [Context Engineering](context-engineering.md) — full resets with handoff artifacts, the sibling technique for long horizons
