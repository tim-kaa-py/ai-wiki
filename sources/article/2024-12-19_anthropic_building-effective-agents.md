---
title: "Building effective agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2024-12-19"
url: "https://www.anthropic.com/engineering/building-effective-agents"
pillar: "understanding"
tags: [agents, workflows, orchestration-patterns, prompt-chaining, routing, parallelization, evaluator-optimizer, mcp]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Building Effective Agents

**Published:** December 19, 2024
**Authors:** Erik S. and Barry Zhang

---

## Full Article Text

We've worked with dozens of teams building LLM agents across industries. Consistently, the most successful implementations use simple, composable patterns rather than complex frameworks.

### What are agents?

At Anthropic, we categorize all variations as **agentic systems**, but draw an important architectural distinction:

- **Workflows** are systems where LLMs and tools are orchestrated through predefined code paths.
- **Agents** are systems where LLMs dynamically direct their own processes and tool usage.

### When (and when not) to use agents

Find the simplest solution possible, and only increase complexity when needed. Agentic systems often trade latency and cost for better task performance. Workflows offer predictability for well-defined tasks; agents are better when flexibility and model-driven decision-making are needed at scale.

### When and how to use frameworks

Frameworks (Claude Agent SDK, Strands, Rivet, Vellum) make it easy to start but create extra abstraction layers. Start by using LLM APIs directly. If you do use a framework, ensure you understand the underlying code.

### Building blocks, workflows, and agents

#### Building block: The augmented LLM
LLM enhanced with retrieval, tools, and memory. MCP allows integration with third-party tools.

#### Workflow: Prompt chaining
Decomposes a task into a sequence of steps. Trade off latency for higher accuracy. Examples: marketing copy → translation; outline → check criteria → document.

#### Workflow: Routing
Classifies input and directs to specialized followup task. Examples: customer service categorization; routing easy questions to Haiku, hard ones to Sonnet.

#### Workflow: Parallelization
Two variations: **Sectioning** (independent subtasks in parallel) and **Voting** (same task multiple times). Examples: guardrails (one model processes, another screens); code review with multiple prompts.

#### Workflow: Orchestrator-workers
Central LLM dynamically breaks down tasks, delegates to worker LLMs, synthesizes results. Subtasks aren't pre-defined—determined by orchestrator. Examples: complex coding changes across files; multi-source search.

#### Workflow: Evaluator-optimizer
One LLM generates response, another evaluates and provides feedback in a loop. Effective with clear evaluation criteria and when iterative refinement provides measurable value. Examples: literary translation; complex search.

#### Agents
LLMs using tools based on environmental feedback in a loop. Begin with command/discussion. Plan and operate independently. Gain "ground truth" from environment. Stop on completion or stopping conditions. Examples: SWE-bench coding agent, computer use.

### Combining and customizing
Building blocks aren't prescriptive. Add complexity only when it demonstrably improves outcomes.

### Summary

Three core principles when implementing agents:

1. Maintain **simplicity** in your agent's design.
2. Prioritize **transparency** by explicitly showing the agent's planning steps.
3. Carefully craft your agent-computer interface (ACI) through thorough tool **documentation and testing**.

---

## Appendix 1: Agents in practice

### A. Customer support
Conversation flow + tool integration. Pull customer data, history, knowledge base. Programmatic actions. Usage-based pricing models showing confidence.

### B. Coding agents
Code solutions verifiable through tests. Iterate using test results. Well-defined problem space. Objective output measurement.

---

## Appendix 2: Prompt engineering your tools

ACI deserves as much attention as HCI. Suggestions for tool format:
- Give the model enough tokens to "think"
- Keep format close to natural occurrences in training data
- Avoid formatting "overhead" (e.g., escaping in JSON vs. markdown)

Tips:
- Put yourself in the model's shoes
- Write descriptions like a great docstring for a junior dev
- Test how the model uses your tools and iterate
- Poka-yoke: change arguments to make mistakes harder

While building SWE-bench agent, more time was spent on tools than prompts. Example: changed tool to require absolute filepaths after model made mistakes with relative paths post-cd.
