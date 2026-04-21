---
title: "Designing AI-resistant technical evaluations"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-01-21"
url: "https://www.anthropic.com/engineering/AI-resistant-technical-evaluations"
pillar: "ecosystem"
tags: [hiring, evaluation, claude, performance-engineering, ai-resistance]
ingested: "2026-04-20"
source_file: "sources/articles/2026-01-21_anthropic_designing-ai-resistant-evaluations.md"
---

# Designing AI-Resistant Technical Evaluations — Summary

**Source:** Tristan Hume (Anthropic Performance Optimization Lead) | 2026-01-21 | [Link](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations)

## TL;DR
Anthropic's take-home perf-engineering test was beaten by Opus 4 (>50% of humans), then matched by Opus 4.5 within 2h. Solution isn't "ban AI" — it's redesigning toward Zachtronics-style constrained puzzles where model pattern-matching breaks down. Realistic evals may no longer suffice.

## Key Takeaways
1. **Where the model struggles becomes V2's starting point.** When V1 falls, find the gap and make that the test, not the warmup.
   - **How to apply:** when building evals (interview or model-eval), watch which subproblems the model reliably fails — those are your signal.
2. **Constrained-instruction-set puzzles (Zachtronics-style)** force unconventional approaches that don't match training distributions.
3. **Independent sub-problems with minimal visualization** force candidates to decide whether building debugging tooling is worth it — meta-skill the model lacks.
4. **Open challenge:** beat 1,487 cycles on the original take-home → recruiting. Fastest human ever: 1,363.

## Related Topics
ai-resistant-eval, hiring, performance-engineering, model-pattern-matching
