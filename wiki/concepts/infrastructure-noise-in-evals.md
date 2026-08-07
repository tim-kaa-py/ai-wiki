---
title: "Infrastructure Noise in Agentic Evals"
description: "Anthropic's finding that agentic benchmark scores depend on runtime resources, so small leaderboard gaps can be infrastructure artifacts"
type: "concept"
pillar: "understanding"
tags: [evaluation, agents, benchmarks, infrastructure, swe-bench, terminal-bench]
sources:
  - "summaries/2026-04-18_anthropic_quantifying-infrastructure-noise.md"
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
timestamp: "2026-08-07"
---

# Infrastructure Noise in Agentic Evals

Agentic benchmarks are **environment-dependent**. Unlike static Q&A benchmarks, the runtime — CPU, memory, timeout, retry behavior — is part of the test. Small leaderboard gaps can be infrastructure artifacts, not capability differences.

## The Terminal-Bench 2.0 Finding

On Terminal-Bench 2.0, the gap between a strict infrastructure setup and an uncapped one is **6 percentage points (p<0.01)**. Leaderboard differences smaller than that are inside the noise floor.

- **Resource error rate dropped 5.8% → 0.5%** as configs went from strict to uncapped.
- Success rates improved **monotonically** with more resources.
- **Beyond ~3× resources**, agents attempt heavier strategies that constraints had previously ruled out — capability surfaces are non-linear in compute/time budgets.

## Core Claim

> "Two agents with different resource budgets and time limits aren't taking the same test."

If Agent A runs with a 5-minute timeout and 8 GB, and Agent B with 20 minutes and 32 GB, a score comparison is apples-to-oranges even when the task list is identical.

## Recommendation for Benchmark Authors

Report **both**:

1. A **guaranteed allocation** (what every run is promised).
2. A **hard kill threshold** (the ceiling beyond which runs terminate).

Calibrate the two so the difference between floor and ceiling falls within the measured noise band. This way, scores reflect capability rather than how generous the harness happens to be on a given day.

## Consumer Guidance

When comparing agent scores across papers, labs, or leaderboards:
- Always check runtime, timeout, CPU/memory budgets, and retry policies.
- Discount any difference smaller than the reported (or plausible) noise floor.
- Be especially cautious with 1-3pp gaps claimed as SOTA.

## The Other Noise Floor

Runtime variance is one of two floors under any benchmark. The second is **label variance in the ground truth itself**: where the reference answers come from human judgment, the humans disagree with themselves. In a re-tested cohort measured by Ishan Anand's cited persona study, "the humans on average were only 80% consistent to themselves" two weeks later [17:40] — which caps how well any model can ever score against them.

The two compose rather than compete. Usable benchmark resolution is bounded by *both* the infrastructure band measured here and the self-agreement rate of the labels, and a score gap smaller than either is not a result. The label floor is computable from a labelled set you already have — see [Distribution Evaluation § The Noise Floor of Your Ground Truth](distribution-evaluation.md#the-noise-floor-of-your-ground-truth) for the split-half recipe.

## Related Pages

- [Distribution Evaluation](distribution-evaluation.md) — the ground-truth label noise floor and how to measure it
- [Agent Evaluation](agent-evaluation.md) — the eval vocabulary and grader taxonomy this failure mode sits under

## Sources

- *Quantifying infrastructure noise in agentic coding evals* — Gian Segato, Anthropic, 2026-04-18
- *Persona Engineering: A Field Guide to AI Synthetic Personas* — Ishan Anand, AI Engineer, 2026-07-29
