---
title: "Quantifying infrastructure noise in agentic coding evals"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-04-18"
url: "https://www.anthropic.com/engineering/infrastructure-noise"
pillar: "understanding"
tags: [evaluation, agents, benchmarks, infrastructure, swe-bench, terminal-bench]
ingested: "2026-04-20"
source_file: "sources/article/2026-04-18_anthropic_quantifying-infrastructure-noise.md"
---

# Quantifying infrastructure noise in agentic coding evals — Summary

**Source:** Gian Segato (Anthropic) | 2026-04-18 | [Link](https://www.anthropic.com/engineering/infrastructure-noise)

## TL;DR
On Terminal-Bench 2.0, the spread between strict and uncapped infrastructure setups is 6 percentage points (p<0.01). Leaderboard differences smaller than that may be infrastructure noise, not capability. Don't trust narrow score margins.

## Key Takeaways
1. **Agentic benchmarks are environment-dependent.** Unlike static benchmarks, the runtime is part of the test. "Two agents with different resource budgets and time limits aren't taking the same test."
   - **How to apply:** When comparing agent scores, also compare runtime/timeout/resource budgets. Discount differences within the noise floor.
2. **Resource error rate dropped from 5.8% → 0.5%** as configs went from strict to uncapped. Success rates improved monotonically.
3. **Beyond ~3x resources, agents try heavier strategies** that constraints had ruled out — non-linear capability surfaces.
4. **Recommendation:** benchmarks should report a guaranteed allocation AND a hard kill threshold, calibrated so floor and ceiling are within noise.

## Related Topics
evaluation, agent-benchmarks, swe-bench, terminal-bench, infrastructure-noise
