---
title: "The 'think' tool: Enabling Claude to stop and think in complex tool use situations"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-03-20"
url: "https://www.anthropic.com/engineering/claude-think-tool"
pillar: "understanding"
tags: [think-tool, claude, tool-use, reasoning, tau-bench, swe-bench, agents]
ingested: "2026-04-20"
source_file: "sources/articles/2025-03-20_anthropic_think-tool.md"
---

# The "Think" Tool — Summary

**Source:** Anthropic Engineering | 2025-03-20 | [Link](https://www.anthropic.com/engineering/claude-think-tool)

## TL;DR
A no-op "think" tool gives Claude scratch space *during* a tool-use chain — not before generation (that's extended thinking). On τ-Bench airline: +54% relative (0.370 → 0.570). Best for policy-heavy domains and sequential decisions.

## Key Concepts

### Think tool ≠ extended thinking
Extended thinking = before generation. Think tool = mid-chain pause. Same model, different temporal location.

## Key Takeaways
1. **Use the think tool for long tool-use chains in policy-heavy domains** (airline, retail, complex compliance).
   - **How to apply:** when an agent makes consequential sequential decisions and tool outputs need careful interpretation, expose a `think` tool.
2. **Pair with domain-specific prompting examples** — alone, it underperforms.
3. **Performance:** τ-Bench airline +54% relative, retail +3.7% absolute, SWE-Bench +1.6% avg.
4. **No downside when unused** — minimal implementation cost.

## Related Topics
think-tool, extended-thinking, tool-use, tau-bench, sequential-decision
