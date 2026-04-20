---
title: "AI-Resistant Evaluation Design (V1 → V2 → V3)"
type: "comparison"
pillar: "understanding"
tags: [evaluation, hiring, ai-resistance, performance-engineering, interview-design]
sources:
  - "summaries/2026-01-21_anthropic_designing-ai-resistant-evaluations.md"
last_updated: "2026-04-20"
---

# AI-Resistant Evaluation Design

How a real take-home test evolved as models caught up. From Anthropic's performance optimization team (Tristan Hume). The pattern generalizes beyond hiring to any skill-assessment eval.

## The Arc

| Version | Design | What killed it |
|---------|--------|----------------|
| **V1** | Realistic performance-engineering problem | Opus 4 beat >50% of humans. Model pattern-matched to training distribution. |
| **V2** | Harder realistic variants — where V1's model-struggle points became the new starting point | Opus 4.5 matched it within 2 hours. Realistic problems leak into training data faster than the test can be refreshed. |
| **V3** | **Zachtronics-style constrained-instruction-set puzzles** — independent sub-problems, minimal visualization | Pattern-matching breaks down because the puzzle primitives don't appear in pre-training distribution. |

## Design Principles

1. **Where the model struggles becomes V-next's starting point.** When V1 falls, find the capability gap and make *that* the test — not the warmup.
2. **Constrained instruction sets force unconventional approaches.** Zachtronics-style puzzles (limited primitives, discrete optimization under rules) don't match the training distribution of "write idiomatic Python."
3. **Independent sub-problems with minimal visualization** force the candidate to decide whether building their own debugging tooling is worth it — a meta-skill current models lack.
4. **Realistic evals may no longer suffice** for hiring. The more "real" the problem, the more likely the model has seen variants.

## Open Benchmarks

Anthropic published an open challenge: beat 1,487 cycles on the original take-home → recruiting pipeline. Fastest human ever recorded: 1,363.

## Why a Separate Page

This is a hiring/skill-assessment story with a distinct design axis from the agent-evaluation page: it is about designing tasks *humans* take that *models* shouldn't easily solve, rather than about scoring model behavior. It belongs in comparisons because the V1/V2/V3 progression is a comparative study.

Related: [agent-evaluation](../concepts/agent-evaluation.md) covers the inverse problem (evaluating agents).

## Sources

- *Designing AI-resistant technical evaluations* — Tristan Hume, Anthropic, 2026-01-21
