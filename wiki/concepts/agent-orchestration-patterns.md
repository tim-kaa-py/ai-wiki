---
title: "Agent Orchestration Patterns (Anthropic's Five Canonical)"
type: "concept"
pillar: "understanding"
tags: [agents, agent-architecture, orchestration, harness-engineering, patterns]
sources:
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2025-06-13_anthropic_multi-agent-research-system.md"
  - "summaries/2026-02-05_anthropic_building-c-compiler.md"
last_updated: "2026-04-20"
---

# Agent Orchestration Patterns (Anthropic's Five Canonical)

The five building blocks Anthropic published as the canonical vocabulary for agent harnesses. Production agents compose them — the mix drives the performance gap, not the model underneath.

## Primary Source: "Building Effective Agents" (Anthropic, Dec 2024)

The canonical taxonomy comes from Anthropic's December 2024 engineering post ([Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents), Erik S. & Barry Zhang). Two foundational framings originate there:

### Workflows vs Agents

- **Workflows** — orchestrated through predefined **code paths** around LLMs. Deterministic structure, LLM does the content work at each step.
- **Agents** — LLMs **dynamically direct** their own processes and tool usage. The control flow itself is model-driven.

The five patterns below are **workflows**. Adding model-driven control on top is what makes something an agent.

### Augmented LLM Building Block

Every pattern composes the same atomic unit: **LLM + retrieval + tools + memory**. MCP standardizes the third-party tool slot.

### Default Rule

> Simplest possible solution first. Only add orchestration complexity when it is **measurably** better.

Frameworks (Claude Agent SDK, Strands, LangGraph, etc.) help you start but obscure the prompts and tool wiring. Start with raw API; adopt abstractions only after you understand what they hide.

## The Five Patterns

| Pattern | What it does | Typical use |
|---------|-------------|-------------|
| **Prompt chaining** | Decompose a task into a sequence of model calls, each feeding the next | Multi-stage transformations (summarize → extract → format) |
| **Routing** | Classify an input, dispatch it to a specialized path | Triage, intent detection, tool selection |
| **Parallelization** | Run multiple model calls concurrently and aggregate results | Voting, sectioning, map-reduce over documents |
| **Orchestrator-workers** | A parent agent decomposes and dispatches to child workers | Coding agents, research agents, long-horizon tasks |
| **Evaluator-optimizer** | A generator produces a candidate, an evaluator critiques, the loop iterates | Code generation with tests, writing with review loops |

## Why Patterns Matter More Than Models

Stanford + LangChain documented a **6x performance variation** attributable to orchestration alone. LangChain's coding agent jumped from outside the top 30 to rank 5 on terminal-bench by modifying only the harness infrastructure — no model change.

The implication: when an agent is underperforming, the first audit is not which model to upgrade but which patterns the harness uses and how they are wired.

## The GAN-Inspired Variant

Anthropic's production fix for the two naive-harness failure modes (one-shotting, premature completion) is a three-agent planner / generator / evaluator loop — the evaluator clicks through the running app like a real user. 20x more expensive ($200 vs $9), but actually works.

This is evaluator-optimizer taken seriously: the evaluator is a full agent, not a judge call, and the loop runs until the evaluator signs off. Full treatment on [Generator-Evaluator Harness](generator-evaluator-harness.md).

## Three Core Agent Principles

From the same Anthropic post, for the *agent* side of the workflows/agents split:

1. **Simplicity** in design
2. **Transparency** of planning steps
3. **Agent-Computer Interface (ACI)** — invest in it the way teams invest in HCI. Concrete tool-design tips: give the model tokens to "think," keep tool formats close to natural training data, avoid escaping overhead, build poka-yoke parameters (hard-to-misuse), and prefer absolute paths over relative.

Best-fit domains called out: **customer support** (conversation + tools + clear success signal) and **coding** (verifiable via tests).

## Concrete Example: Multi-Agent Research System

Anthropic's multi-agent research system is the canonical real-world instantiation of **orchestrator-worker**. A lead Opus agent develops a research strategy and dispatches parallel Sonnet workers on sub-questions; the lead synthesizes the results.

- **+90.2% improvement** over single-agent Opus 4 on research tasks
- **~80% of quality variance** explained by token usage alone
- **15× more tokens than chat** — the cost floor for this pattern

The 15× cost rule: orchestrator-worker is only worth it when task value exceeds 15× baseline AND the work is genuinely parallelizable. For a flat, peer-to-peer alternative (Carlini's lock-file C compiler team — 16 parallel Claudes, no lead agent, ~2,000 sessions, 99% test pass rate), see [Parallel Agent Patterns](parallel-agent-patterns.md). *(Source: Anthropic Engineering)*

## The ~90% Rule

In an orchestrator-workers setup, roughly **90% of compute flows through the delegated child agents**, not the parent. Consequences:

- Design parent agents as thin dispatchers.
- Put reasoning budget into the children and the contracts that bind them (see [Natural Language Harness](natural-language-harness.md) on execution contracts).

## Ablation Findings (from NLH paper)

On SWE-bench Verified and OS World:

| Module | SWE-bench ∆ | OS World ∆ |
|--------|-------------|------------|
| Self-evolution (narrow acceptance-gated attempt loop) | **+4.8** | **+2.7** |
| Verifiers | –0.8 | –8.4 |
| Multi-candidate search | –2.4 | –5.6 |

Read: **more structure is not always better.** Default to the smallest harness that passes your eval and only widen search when the narrow path clearly fails.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the discipline these patterns sit inside
- [Natural Language Harness](natural-language-harness.md) — how to express these patterns cleanly
- [Meta Harness](meta-harness.md) — optimizing the pattern mix itself
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — the production variant of evaluator-optimizer
- [Context Engineering](context-engineering.md) — the context-budget discipline these patterns implement
- [Parallel Agent Patterns](parallel-agent-patterns.md) — orchestrator-worker and lock-file agent teams in detail
