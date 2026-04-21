---
title: "A postmortem of three recent issues"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-17"
url: "https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues"
pillar: "ecosystem"
tags: [postmortem, claude, infrastructure, model-quality, debugging, tpu]
ingested: "2026-04-20"
source_file: "sources/articles/2025-09-17_anthropic_postmortem-three-recent-issues.md"
---

# Postmortem: Three Anthropic Quality Bugs (Aug-Sep 2025) — Summary

**Source:** Sam McAllister (Anthropic) | 2025-09-17 | [Link](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

## TL;DR
Three overlapping bugs in Aug-Sep 2025 degraded Claude quality: misrouted Sonnet 4 to 1M-context servers (peaked at 16% of requests), TPU misconfig produced random Thai/Chinese tokens in English output, XLA top-k miscompilation from bf16/fp32 precision mismatch. Anthropic explicitly states it never degrades quality based on demand or load.

## Key Concepts

### Three bugs at once = diagnostic chaos
"Each bug produced different symptoms on different platforms at different rates" — community reports looked confused, not pointing at single causes.

## Key Takeaways
1. **Standard benchmarks didn't catch real-user degradation.** Validation suites missed the regressions; user reports surfaced them first.
   - **How to apply:** run continuous quality evals against production, not just pre-deploy benchmarks.
2. **Approximate top-k optimization can break under mixed-precision arithmetic.** Anthropic switched to exact top-k, prioritizing quality over efficiency.
3. **Privacy controls hampered debugging** — engineers couldn't easily access the user interactions showing the bug. Need debugging tools that preserve privacy.
4. **`/bug` and "thumbs down" feedback channels are load-bearing.** User signal beats internal benchmarks for catching weird production regressions.

## Related Topics
postmortem, model-quality, infrastructure, tpu-debugging, eval-coverage
