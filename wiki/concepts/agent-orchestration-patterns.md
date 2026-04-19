---
title: "Agent Orchestration Patterns (Anthropic's Five Canonical)"
type: "concept"
pillar: "understanding"
tags: [agents, agent-architecture, orchestration, harness-engineering, patterns]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
last_updated: "2026-04-19"
---

# Agent Orchestration Patterns (Anthropic's Five Canonical)

The five building blocks Anthropic published as the canonical vocabulary for agent harnesses. Production agents compose them — the mix drives the performance gap, not the model underneath.

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

This is evaluator-optimizer taken seriously: the evaluator is a full agent, not a judge call, and the loop runs until the evaluator signs off.

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
