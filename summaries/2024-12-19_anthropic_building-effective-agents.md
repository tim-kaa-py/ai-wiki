---
title: "Building effective agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2024-12-19"
url: "https://www.anthropic.com/engineering/building-effective-agents"
pillar: "understanding"
tags: [agents, workflows, orchestration-patterns, prompt-chaining, routing, parallelization, evaluator-optimizer, mcp]
ingested: "2026-04-20"
source_file: "sources/article/2024-12-19_anthropic_building-effective-agents.md"
---

# Building Effective Agents (Anthropic) — Summary

**Source:** Erik S., Barry Zhang (Anthropic) | 2024-12-19 | [Link](https://www.anthropic.com/engineering/building-effective-agents)

## TL;DR
The canonical Anthropic taxonomy: **workflows** (predefined code paths around LLMs) vs **agents** (LLMs dynamically directing tools). Five workflow patterns + one agent pattern. Default rule: simplest possible solution; only add complexity when measurably better.

## Key Concepts

### Workflows vs Agents
- **Workflows:** orchestrated through predefined code paths.
- **Agents:** LLMs direct their own processes and tool usage.

### Five canonical workflow patterns
1. **Prompt chaining** — sequential steps, gate checks (outline → check → write).
2. **Routing** — classify input, dispatch to specialist (Haiku for easy, Sonnet for hard).
3. **Parallelization** — sectioning (independent subtasks) or voting (same task, multiple times).
4. **Orchestrator-workers** — central LLM dynamically decomposes and delegates.
5. **Evaluator-optimizer** — generator + critic in a loop.

### Augmented LLM building block
LLM + retrieval + tools + memory. MCP integrates third-party tools.

## Key Takeaways
1. **Frameworks (Claude Agent SDK, Strands, etc.) help start but obscure prompts.** Start with raw API; understand abstractions before adopting.
   - **How to apply:** when a framework feels awkward, drop down to direct API calls.
2. **Three core principles for agents:**
   - **Simplicity** in design
   - **Transparency** of planning steps
   - **Agent-Computer Interface (ACI)** = invest as much as HCI
3. **Tool design tips:** give the model tokens to "think," keep format close to natural training data, avoid escaping overhead, poka-yoke parameters. Absolute paths beat relative paths.
4. **Two best agent fits:** customer support (conversation + tools + clear success), coding (verifiable via tests).

## Related Topics
agent-orchestration-patterns, workflows-vs-agents, mcp, agent-computer-interface, prompt-engineering
