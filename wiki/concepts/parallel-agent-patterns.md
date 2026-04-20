---
title: "Parallel Agent Patterns"
type: "concept"
pillar: "building"
tags: [agent-teams, parallel-agents, multi-agent, orchestrator-worker, claude-code, verification]
sources:
  - "summaries/2026-02-05_anthropic_building-c-compiler.md"
  - "summaries/2025-06-13_anthropic_multi-agent-research-system.md"
last_updated: "2026-04-20"
---

# Parallel Agent Patterns

Two complementary patterns for running many Claude agents in parallel. They differ in coordination model — **lock-file agent teams** (flat, peer-to-peer) versus **orchestrator-worker** (hierarchical, single lead) — but share the same enabling constraints: parallelizable work, strong verification, and value that justifies high token cost.

## Pattern 1: Agent Teams with Lock-File Coordination

**Source: Nicholas Carlini — Building a C Compiler (Anthropic, 2026-02).**

16 parallel Claude Code agents operating in a shared Docker + Git repo, coordinated only by lock files on work items. No human in the loop, no lead agent. Produced a 100k-line Rust C compiler in two weeks across ~2,000 sessions. The resulting compiler builds Linux 6.9 on x86/ARM/RISC-V plus QEMU, FFmpeg, SQLite, Postgres, and Redis with a **99% test pass rate**.

### How It Works

- Shared repo, shared container
- Lock files mark tasks as claimed → prevents duplication
- Each agent runs a trivial loop-based harness — keep Claude continuously working
- **Most engineering effort went into test infrastructure, not orchestration**

### The Load-Bearing Insight

> "The task verifier must be nearly perfect."

Autonomous agents will solve whatever has clear feedback. If tests are weak, agents drift toward whatever passes the weak tests. The verifier, not the orchestrator, is the bottleneck.

### What It Couldn't Do

- No 16-bit x86 codegen
- Depends on GCC for final assembly/linking
- Less optimal output than production compilers
- Integration tasks (coordinating across modules) were especially hard — the coordination model has limits

### Implication

Large autonomous SWE is **feasible with strong verification**. Security-critical code still needs human review — the 99% pass rate hides the 1% that a malicious or lucky test gap would miss.

## Pattern 2: Orchestrator-Worker Multi-Agent Research System

**Source: Anthropic Engineering — How we built our multi-agent research system (2025-06).**

A **lead Opus agent** develops a research strategy and spawns **parallel Sonnet workers** on different sub-questions. The lead then synthesizes worker findings into a final answer. This is the canonical concrete example of the orchestrator-worker pattern from [Agent Orchestration Patterns](agent-orchestration-patterns.md).

### Published Results

- **+90.2% improvement** over single-agent Opus 4 on research tasks
- **~80% of variance** in quality explained by token usage (more search = better answers, up to a point)
- **15× more tokens than chat** — this is the cost floor

### The 15× Cost Rule

Orchestrator-worker is only worth it when **task value > 15× baseline cost AND the task is genuinely parallelizable**. Before going multi-agent, check both conditions. Parallelizing a sequential task wastes tokens without gaining quality.

### Eight Prompt-Engineering Principles (Anthropic)

1. Build accurate mental models of agent behavior
2. Teach orchestrators detailed delegation
3. Embed scaling rules (effort ↔ query complexity)
4. Design tools with clear purpose and descriptions
5. Let agents improve their own prompts via feedback
6. Broad → narrow search strategy
7. Use extended thinking as a planning mechanism
8. Parallel tool calling (-90% research time)

### Evaluation Must Be Outcome-Based

Don't prescribe the path — score the output. LLM judges evaluated factual accuracy, citation quality, completeness, and source authority. Path-based evals penalize creative strategies.

### Production Hardening

Required for any real deployment:
- Durable error handling (agent crashes mid-research)
- Observability (what did each worker actually do?)
- Rainbow deployments (swap prompts without dropping in-flight sessions)
- Source-quality steering (agents preferred SEO content farms until prompts forced otherwise)

## When to Use Which

| Dimension | Lock-file agent teams | Orchestrator-worker |
|-----------|----------------------|---------------------|
| Coordination | Flat, peer-to-peer | Hierarchical |
| Task fit | Large codebase of independent units | Research / decomposable questions |
| State | Shared git repo | Transient, per-query |
| Verification | Tests in CI | LLM judge on outputs |
| Human loop | None during run | None during run |
| Primary risk | Verifier gaps → drift | Token cost / false parallelism |

## Shared Principles

- **Verification beats orchestration.** In both patterns, the quality ceiling is set by how well you can tell good output from bad.
- **Parallelism is expensive.** 15× tokens (research system) or 2,000 sessions (compiler). Only justified for high-value work.
- **Keep coordination thin.** Lock files or lead-agent dispatch — not elaborate messaging protocols.
- **Most effort is not in the agent.** It's in tests, tool descriptions, and the evaluation loop.

## Related Pages

- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the five canonical patterns these instantiate
- [Claude Code](../tools/claude-code.md)
- [Harness Engineering](harness-engineering.md)
