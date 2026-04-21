---
title: "Software Factory"
type: "concept"
pillar: "ecosystem"
tags: [software-factory, agents, coding-agents, agi, harness-engineering, automation]
sources:
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
last_updated: "2026-04-20"
---

# Software Factory

Simon Last's (Notion) framing for the endgame of coding agents: **an as-automated-as-possible loop for developing, debugging, reviewing, merging, and maintaining a codebase and its services using swarms of agents working together.**

The kernel of the thesis is a stronger claim than "agents will write more code": **coding agents are the kernel of AGI — everything becomes a coding agent.** Most capabilities the industry currently ships as bespoke products (PDF export, data analysis, document generation) collapse into "coding agent with the right tools and a sandbox."

## Why It Matters

The exciting property is recursion: the agent bootstraps its own software and capabilities, then debugs and maintains them. Given a sandbox, filesystem, and the ability to write code, an agent can:

- Build a missing tool when it encounters one (Simon's example: an agent writes itself a 100-LOC Chromium browser wrapper rather than calling a bespoke browsing tool).
- Fix broken transports, patch flaky scripts, regenerate fixtures.
- Compose new behaviors by writing code over primitives rather than consuming opaque APIs.

This is why CLIs often beat MCP servers for open-ended capability: CLIs give the agent a compute runtime where self-repair is natural. See [MCP vs CLI](../comparisons/mcp-vs-cli.md).

## Data Dog / AWS Analogy

Notion's framing: a company like Data Dog layered observability onto AWS primitives. The software factory is the same bet at a higher level of abstraction — frontier models are the new AWS, and coding agents are the new compute primitive others will layer on top of.

## Design Implications

1. **Prefer sandbox + filesystem + code-writing ability** over building a bespoke deterministic tool per capability — unless token economics argue otherwise (see [MCP vs CLI](../comparisons/mcp-vs-cli.md)).
2. **Invest in the agent's ability to author tools for itself.** Boring infra (shell access, git, network) beats elaborate tool registries.
3. **Evals are themselves coding-agent problems.** Notion treats the eval harness as an agent; the generalization is that most platform-internal automation is, too. See [Agent Evaluation](agent-evaluation.md#eval-system-as-agent-harness).
4. **Two-skill discipline still applies.** Distinguish "model can't do this yet" from "our harness hasn't exposed the model to what it needs" — otherwise you'll waste cycles swimming upstream. See [Harness Engineering](harness-engineering.md).

## Related Pages

- [Harness Engineering](harness-engineering.md) — the discipline of building the loop the software factory runs in
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — per-capability decision framework for how the factory calls out to tools
- [Agent Evaluation](agent-evaluation.md) — Notion's three-tier stack and eval-as-harness pattern
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — Shapiro's maturity model; software factory sits at the frontier tier
