---
title: "Natural Language Harness (NLH)"
type: "concept"
pillar: "understanding"
tags: [nlh, harness-engineering, agents, agent-architecture, orchestration, execution-contracts]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
last_updated: "2026-04-19"
---

# Natural Language Harness (NLH)

A harness design discipline introduced by the Tingua team (March 2026 paper). Writes an agent's entire control logic in structured natural language, cleanly separated from the runtime and the tools. The central claim: this is what lets harness engineering finally have *controlled experiments*.

## The Three-Layer Separation

| Layer | What lives there | Example |
|-------|------------------|---------|
| **Back end** | Infrastructure and tools | File system, shell, MCP servers |
| **Runtime charter** | Universal "physics" of the system — how contracts bind, how state persists, how child agents are managed | Delegation rules, state durability, budget enforcement |
| **NLH** | Task-specific control logic, contracts, roles, stage structure, failure taxonomies | The actual agent's playbook in English |

Why the split matters: **clean ablation.** Swap the NLH while fixing the charter and you isolate harness design. Swap the charter while fixing NLH and you isolate runtime policy. Without this separation, nominally-identical-minus-one-choice systems actually differ in tools, prompts, verification gates, and state semantics simultaneously — you can't isolate variables.

## Execution Contracts

NLH turns fuzzy LLM completions into bounded agent calls. Framed as "function signatures for agents." Five elements:

1. **Required outputs** — what artifacts must exist when the agent returns
2. **Budgets** — time, tokens, tool calls
3. **Permissions** — which tools this agent may use
4. **Completion conditions** — how the agent knows it's done
5. **Output paths** — where results go (file paths, not in-memory returns)

## File-Backed State

State lives in path-addressable files rather than in-memory chat history. Survives:

- Context truncation
- Process restarts
- Delegation to child agents
- Cross-session handoff

Result: the messy lifecycle of an agentic run stops eating state. Combine with execution contracts and child agents are no longer passing stringified JSON — they're writing to contracts and reading each other's outputs from disk.

## Empirical Findings

### SWE-bench Verified ablation

Same pass rate could be reached with **14x less compute** once the NLH separation was in place — because ablation made it obvious which modules were carrying weight and which were noise.

- **Self-evolution:** the only consistently helpful module (+4.8 SWE, +2.7 OS World)
- **Verifiers:** actively hurt (–0.8 / –8.4)
- **Multi-candidate search:** actively hurt (–2.4 / –5.6)

See [Agent Orchestration Patterns](agent-orchestration-patterns.md) for the full ablation table.

### OS Symphony representation experiment

Rewriting OS Symphony's existing control logic as an NLH (same strategy, same model, only the expressive form changed) jumped benchmark score **30.4% → 47.2%** — a 16.8-point swing.

- Runtime: 361 min → 141 min (60% cut)
- LLM calls: 1,200 → 34 (35x reduction)

The conclusion: **representation is a first-class design variable**, not bookkeeping. How you express the harness is as consequential as what modules it contains.

## When to Adopt NLH Thinking

- When your agent's control logic is tangled with prompts, tool defs, and Python glue and you can't run a clean A/B.
- When child agents drop state between delegation hops.
- When you're about to add another verifier/searcher module — first try rewriting what you have as NLH with explicit contracts and artifact-backed completion.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the parent concept
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the patterns NLH expresses cleanly
- [Meta Harness](meta-harness.md) — optimizing a harness NLH describes
