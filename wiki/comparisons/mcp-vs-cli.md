---
title: "MCP vs CLI"
type: "comparison"
pillar: "building"
tags: [mcp, cli, tool-use, agents, harness-design, permissions, token-economics]
sources:
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2025-11-04_anthropic_code-execution-with-mcp.md"
  - "summaries/2025-11-24_anthropic_advanced-tool-use.md"
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
last_updated: "2026-04-21"
---

# MCP vs CLI

How to choose between giving an agent tools over the Model Context Protocol vs. giving it a shell and CLI binaries. Framing drawn primarily from Simon Last and Sarah Sachs (Notion, Latent Space April 2026).

**Headline:** not a winner-takes-all. It's a per-capability tradeoff, and serious teams commit to both platforms and pick per quality need.

## The Four Axes

| Axis | MCP wins | CLI wins |
|------|----------|----------|
| **Permission model** | Permission model by construction — "all you can do is call the tools" | Murkier surface — token exfiltration, arbitrary process access |
| **Self-repair / open-endedness** | If transport breaks, agent is stuck | Agent can write/fix its own tools in the same environment |
| **Progressive disclosure** | Not inherent to the protocol; harness must layer it (Tool Search etc.) | Free — `--help`, pagination, grep, file-tree discovery are native |
| **Token economics** | LLM pays token fees on every deterministic call — wasteful under usage-based pricing | Code generation amortizes cost: one LLM turn writes a script that runs many times |

## The Decision Heuristic

> *"Does this task need open-endedness and self-repair, or narrow permissioned determinism?"*

- **Pick MCP for:** narrow, permissioned, deterministic actions in a system you don't want the agent synthesizing code against. Lightweight contexts where a full compute runtime is overkill. Customer-driven integrations where the customer expects MCP.
- **Pick CLI for:** open-ended capability, anything the agent might need to self-repair or extend, workflows that benefit from piping/grep over tool outputs, bulk deterministic work that can be one-shotted into a script.

## Token Economics Detail

The sharpest argument *against* MCP for deterministic work:

- Every tool call is an LLM invocation. Under usage-based pricing you pay the token fee each time.
- Cache-window misses compound the cost on longer workflows.
- A CLI invocation lets the LLM write code *once* that calls the API *many* times — the recurring work no longer goes through the model.

So: for deterministic third-party API work, MCP can be strictly more expensive than a CLI-generated script that performs the same work.

## Progressive Disclosure

Both platforms need it past ~dozens of tools. Showing all tools upfront inflates tokens and degrades quality across *unrelated* prompts (niche tools get over-called). See [MCP](../concepts/mcp.md) Tool Search for the MCP-side fix, and [Harness Engineering](../concepts/harness-engineering.md#progressive-disclosure-past-dozens-of-tools) for the general principle.

## The Connectivity Stack (Parra, April 2026)

David Soria Parra (Anthropic, MCP maintainer) extends the "support both" framing into a **four-part connectivity stack**: the best 2026 agents use **all of** Skills + MCP + CLI + computer-use together, and pick per job. The argument by construction:

- **Knowledge-worker agents** (financial analysts, marketers) are the 2026 production wave — not just coders. Their needs are "connect to five SaaS apps and a shared drive," not "compile and verify locally."
- **No single mechanism covers that surface:** CLIs need a sandbox, computer-use is brittle, raw MCP lacks pre-trained affordances, skills alone have no runtime.
- Therefore: stack them. Anyone claiming a silver bullet is wrong by construction.

Role per layer:
- **Skills** — domain knowledge / usage guidance (cheap in context).
- **CLI** — sandboxed pre-trained tools (git, gh); self-repairing; cheap amortized cost.
- **MCP** — rich/enterprise/UI-bearing integrations; permissioned semantics.
- **Computer-use** — the long tail no one wired up.

Budget context accordingly: skills and CLI are cheap; MCP tool lists need progressive discovery.

## Why You Support Both

Notion's additional constraint: they are the system of record for their customers. They *must* support MCP regardless of internal preference because customers use it. The lesson: for any team that is downstream of an ecosystem, the question isn't "which do I pick" but "how do I commit to both platforms and pick per capability."

## Strengths & Weaknesses — Summary

### MCP
- **Strengths:** strong permission model by construction, deterministic, lightweight, "dumb simple thing that works" for narrow permissioned agents without a compute runtime.
- **Weaknesses:** if transport breaks, agent can't fix itself; early MCPs dump all tools; token cost for deterministic work under usage-based pricing.

### CLI
- **Strengths:** inherits terminal power (pagination, grep, pipes); progressive disclosure inherent; self-bootstrapping — agent can write a missing tool (100-LOC Chromium wrapper example).
- **Weaknesses:** murkier permission surface; open-endedness means unbounded token spend per invocation if not scoped.

## Related Pages

- [MCP (Model Context Protocol)](../concepts/mcp.md) — protocol overview, advanced tool-use features, code-execution pattern
- [Tool Design for Agents](../concepts/tool-design-for-agents.md) — ACI principles that apply to both surfaces
- [Harness Engineering](../concepts/harness-engineering.md) — progressive disclosure, give-the-model-what-it-wants
- [Software Factory](../concepts/software-factory.md) — why self-repair capability matters
