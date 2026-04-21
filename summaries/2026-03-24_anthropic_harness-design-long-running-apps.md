---
title: "Harness design for long-running application development"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-03-24"
url: "https://www.anthropic.com/engineering/harness-design-long-running-apps"
pillar: "understanding"
tags: [harness-engineering, agents, generator-evaluator, context-management, multi-agent]
ingested: "2026-04-20"
source_file: "sources/articles/2026-03-24_anthropic_harness-design-long-running-apps.md"
---

# Harness Design for Long-Running App Development — Summary

**Source:** Prithvi Rajasekaran (Anthropic Labs) | 2026-03-24 | [Link](https://www.anthropic.com/engineering/harness-design-long-running-apps)

## TL;DR
A GAN-inspired Planner/Generator/Evaluator harness can take a one-line prompt to a complete playable app — but at 20× the cost of a solo agent (6h/$200 vs 20min/$9). Effective harnesses don't disappear as models improve; they shift the boundary of what needs scaffolding.

## Key Concepts

### Context anxiety
Models prematurely conclude work as context grows. **Full context resets with structured handoff artifacts beat compaction** for coherence over long sessions.

### Self-evaluation bias
Same model praises its own output even when bad. **Separating generator from evaluator is more tractable than making generators self-critical.**

### Sprint contracts
Negotiated definitions of "done" before implementation begins.

## Key Takeaways
1. **Build a generator-evaluator loop with explicit grading rubric** (design, originality, craft, functionality). 5-15 cycles per artifact.
   - **How to apply:** for any creative agent task, define rubric criteria upfront and run iterative critique loops with a separate evaluator.
2. **Use Playwright (or equivalent) as the evaluator's eyes** to actually run the app rather than read code.
3. **Stronger model → simpler harness.** When upgrading to Opus 4.6, the team removed sprint decomposition and dropped from per-sprint to single final QA pass.
   - **How to apply:** revisit harness complexity each model release; cut what the model now handles natively.
4. **Architecture:** Planner expands brief → Generator builds incrementally → Evaluator tests with Playwright.

## Related Topics
generator-evaluator, harness-engineering, context-anxiety, sprint-contracts, multi-agent
