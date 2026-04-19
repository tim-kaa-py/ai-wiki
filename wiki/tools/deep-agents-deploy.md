---
title: "Deep Agents & Deep Agents Deploy"
type: "tool"
pillar: "ecosystem"
tags: [langchain, langgraph, deep-agents, managed-agents, agent-frameworks, sandbox, agents, infrastructure]
sources:
  - "summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md"
last_updated: "2026-04-19"
---

# Deep Agents & Deep Agents Deploy

LangChain's agent stack. Two distinct things:

- **Deep Agents** — an MIT-licensed harness library built on LangChain + LangGraph for long-running, multi-step, stateful, human-in-the-loop workflows. Sits at **Tier 2** on the [agent platform tiers](../concepts/agent-platform-tiers.md) spectrum (you host it yourself).
- **Deep Agents Deploy** — LangChain's new deployment wrapper for Deep Agents. Bundles the agent with a LangGraph deployment server. Sits at **Tier 3** (managed), but only via LangSmith SaaS.

## Deep Agents (the library)

- MIT licensed — truly open-source
- Built on LangChain + LangGraph
- Designed for long-horizon, multi-step, stateful, human-in-the-loop workflows
- Model-agnostic (swap frontier models at will)
- Can be paired with your own sandbox (Daytona, Modal, Run Loop, etc.)

Use at Tier 2: pull the library, host it, BYO sandbox. No platform fees.

## Deep Agents Deploy (the deployment wrapper)

What it bundles:
- LangGraph deployment server (~30 endpoints)
- A2A and MCP protocol support
- Pluggable sandboxes: Daytona, Modal, Run Loop, plus a beta LangSmith-native sandbox
- `agents.md` support

What it requires (the catch):
- **LangSmith Plus plan at $39/seat/month** to actually deploy
- **Self-hosting is enterprise-tier only**

## The "Open Alternative" Critique

LangChain positioned Deep Agents Deploy as the "open alternative" to Claude Managed Agents. The AI Automators' rebuttal:

- Deep Agents is MIT — source is open.
- Deep Agents Deploy depends on the LangGraph deployment server, which is closed-source SaaS run by LangChain.
- The only usable plan is LangSmith Plus at $39/seat/month.
- Self-hosting is gated behind enterprise.
- Conclusion: **open in source license, closed in deployment path.** "Open source" ≠ "openly deployable." The walled-garden critique of Anthropic applies to LangChain's stack too, just with a different wall.

## When to Use Which

| Your constraint | Path |
|-----------------|------|
| Want true openness + control | Deep Agents library at Tier 2, BYO sandbox (Daytona / Modal / Run Loop). Skip Deep Agents Deploy. |
| Want managed Tier 3 at a predictable seat cost | Deep Agents Deploy on LangSmith Plus ($39/seat/mo) |
| Need to self-host the full managed platform | Only available on LangSmith enterprise — budget accordingly or stay at Tier 2 |
| Compliance requires on-prem | Deep Agents library self-hosted at Tier 2 is the realistic path |

## Pros / Cons Summary

**Pros**
- MIT-licensed harness — real portability at the library level
- Model-agnostic
- Sandbox choice (Daytona, Modal, Run Loop)
- Standard protocols (A2A, MCP)
- `agents.md` support

**Cons**
- Using Deploy = paying LangSmith ($39/seat/mo minimum)
- Self-hosting Deploy requires enterprise
- Marketing claims "open alternative" but deployment is SaaS
- LangGraph server is closed source

## Related Pages

- [Agent Platform Tiers](../concepts/agent-platform-tiers.md) — the five-tier spectrum
- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — head-to-head vs Claude Managed Agents and OpenAI Agents SDK
- [Claude Managed Agents](claude-managed-agents.md) — Anthropic's Tier-3 platform
- [OpenAI Agents SDK](openai-agents-sdk.md) — OpenAI's Tier-2 SDK
