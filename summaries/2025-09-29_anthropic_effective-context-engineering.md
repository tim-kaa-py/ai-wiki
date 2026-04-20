---
title: "Effective context engineering for AI agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-29"
url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
pillar: "understanding"
tags: [context-engineering, agents, prompt-engineering, context-rot, compaction, sub-agents]
ingested: "2026-04-20"
source_file: "sources/article/2025-09-29_anthropic_effective-context-engineering.md"
---

# Effective Context Engineering for AI Agents — Summary

**Source:** Prithvi Rajasekaran et al. (Anthropic Applied AI) | 2025-09-29 | [Link](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## TL;DR
Context engineering > prompt engineering. Models suffer "context rot" — performance degrades as context fills (n² attention). Treat context as a finite resource. Three long-horizon strategies: compaction, structured note-taking, sub-agent decomposition.

## Key Concepts

### Context rot
Transformer attention is n² over tokens; bigger context = thinner attention budget per token. More context ≠ better answers.

### "Right altitude" for system prompts
Between hardcoded logic (too rigid) and high-level guidance (too vague). Concrete signals + flexibility.

### Just-in-time retrieval
"Mirrors human cognition: we don't memorize entire corpuses." Load info via tools when needed, not upfront.

## Key Takeaways
1. **Stop pre-loading data; use just-in-time retrieval through tools.**
   - **How to apply:** prefer search/read tools over stuffing the system prompt with reference docs.
2. **Long-horizon strategies (pick one or combine):**
   - **Compaction** — summarize and reinitiate
   - **Structured note-taking** — files outside context window
   - **Sub-agent architectures** — focused agents return condensed summaries
3. **Tool design rule:** self-contained, clear, no functional overlap.
4. **Context is precious and finite.** Treat every token as budget.

## Related Topics
context-engineering, context-rot, just-in-time-retrieval, sub-agents, compaction, prompt-engineering
