---
title: "Effective context engineering for AI agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-29"
url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
pillar: "understanding"
tags: [context-engineering, agents, prompt-engineering, context-rot, compaction, sub-agents]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Effective Context Engineering for AI Agents

**Published:** Sep 29, 2025
**Authors:** Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, and Jeremy Hadfield (Anthropic's Applied AI team), with contributions from Rafi Ayub, Hannah Moran, Cal Rueb, and Connor Jennings

---

## Article Summary

This Anthropic engineering post explores how to strategically manage the limited context available to AI language models, a practice called "context engineering."

### Core Concept

Context engineering represents an evolution beyond prompt engineering. While prompt engineering focuses on crafting effective instructions, context engineering addresses the broader challenge of "what configuration of context is most likely to generate our model's desired behavior?" The authors note that models experience "context rot"—degraded performance as context window size increases—because transformer architecture creates n² relationships between tokens, stretching the model's attention budget.

### Key Techniques

**System Prompts:** Strike a balance between overly rigid, hardcoded logic and vague high-level guidance. The "right altitude" provides concrete signals while remaining flexible enough to guide behavior effectively.

**Tools Design:** Well-designed tools should be self-contained, clear in purpose, and avoid functional overlap that creates ambiguous decision points for agents.

**Runtime Retrieval:** Rather than pre-loading all data, agents can use "just-in-time" context strategies, dynamically loading information through tools. As the authors explain, "this approach mirrors human cognition: we generally don't memorize entire corpuses of information."

### Long-Horizon Solutions

For extended tasks, three strategies emerge:

- **Compaction:** Summarize conversation history and reinitiate with compressed context
- **Structured Note-Taking:** Agents maintain persistent memory files outside the context window
- **Sub-Agent Architectures:** Specialized agents handle focused tasks, returning condensed summaries to a coordinator

The authors emphasize that "treating context as a precious, finite resource will remain central to building reliable, effective agents."
