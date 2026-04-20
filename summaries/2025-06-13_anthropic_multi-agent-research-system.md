---
title: "How we built our multi-agent research system"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-06-13"
url: "https://www.anthropic.com/engineering/multi-agent-research-system"
pillar: "understanding"
tags: [multi-agent, research, orchestrator-worker, claude, prompt-engineering, evaluation, parallelization]
ingested: "2026-04-20"
source_file: "sources/article/2025-06-13_anthropic_multi-agent-research-system.md"
---

# Multi-Agent Research System (Anthropic) — Summary

**Source:** Jeremy Hadfield, Barry Zhang et al. (Anthropic) | 2025-06-13 | [Link](https://www.anthropic.com/engineering/multi-agent-research-system)

## TL;DR
Orchestrator-worker pattern (Opus lead + Sonnet workers) outperformed single-agent Opus 4 by 90.2% on research tasks. Token usage explained ~80% of variance. But: 15× more tokens than chat, so only worth it for high-value parallelizable work.

## Key Concepts

### Orchestrator-worker
Lead agent develops strategy, spawns parallel subagents on different aspects, synthesizes findings.

### Outcome-based eval (not path-based)
LLM judges score factual accuracy, citation quality, completeness, source authority. Don't prescribe the path.

## Key Takeaways
1. **Eight prompt-engineering principles for multi-agent:**
   1. Build accurate mental models of agent behavior
   2. Teach orchestrators detailed delegation
   3. Embed scaling rules (effort ↔ query complexity)
   4. Design tools with clear purpose/desc
   5. Let agents improve their own prompts via feedback
   6. Broad → narrow search
   7. Extended thinking as planning mechanism
   8. Parallel tool calling (-90% research time)
2. **Cost reality: 15× chat tokens.** Only justified for high-value parallelizable tasks.
   - **How to apply:** before going multi-agent, check the task is genuinely parallelizable AND value > 15× cost.
3. **Production hardening required:** durable error handling, observability, rainbow deployments.
4. **Source-quality heuristic** — agents preferred SEO content farms over authoritative sources until prompts forced otherwise.

## Related Topics
multi-agent, orchestrator-worker, research-agents, parallel-tool-calling, evaluation
