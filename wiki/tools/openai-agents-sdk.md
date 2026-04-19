---
title: "OpenAI Agents SDK"
type: "tool"
pillar: "ecosystem"
tags: [openai, agents, agent-frameworks, harness, sandbox, sdk, infrastructure]
sources:
  - "summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md"
last_updated: "2026-04-19"
---

# OpenAI Agents SDK

OpenAI's agent framework, re-aimed from short chatbot flows to long-horizon agent loops. Sits at **Tier 2** on the [agent platform tiers](../concepts/agent-platform-tiers.md) spectrum — you host the SDK on your own infrastructure. No Tier-3 managed offering from OpenAI yet (may launch later).

## What's New in the Next Evolution

Harness is now **baked into the library** for long-horizon tasks:
- File inspection
- Command execution
- Code editing
- Controlled sandbox environments
- `AGENTS.md` support
- Skills
- Advanced tool calling

Integrates with third-party sandbox providers: **Daytona / E2B / Modal**.

Release milestone: OpenAI Agents SDK **0.14** — sandbox agents, clients, memory, workspace mounts.

## OpenAI's Positioning

OpenAI pitched the SDK as the **least-compromised middle path** between the two Tier-3 options:
- Called out Claude Managed Agents' deployment-location and data constraints
- Called out LangChain Deep Agents' inability to exploit frontier-model capabilities (too model-agnostic to special-case)
- Positioned their SDK as: model-agnostic at the library level, but tuned to exploit OpenAI frontier-model features when you use them

## Cost Model

- **No platform cost** beyond model tokens + sandbox provider fees
- You host the SDK on your own infra
- Sandbox costs vary by provider (E2B, Modal, Daytona)

This is cheaper than Claude Managed Agents (8¢/session-hour on top of model) or Deep Agents Deploy ($39/seat/mo on top of model) — at the cost of having to run the infra yourself.

## When to Use It

Good fit if:
- You want long-horizon agent loops without Tier-3 vendor lock-in
- You want to exploit OpenAI frontier-model features (the SDK is tuned for them)
- You already have infra and operational maturity
- You want to BYO sandbox (E2B / Modal / Daytona)

Bad fit if:
- You have no infra team — Tier 2 still means you run it
- You need a fully managed platform today — wait for an OpenAI Tier-3 product or use Claude Managed Agents / Vertex AI Agent Builder
- You're building purely for Anthropic models — use the Claude Agent SDK instead

## Pros / Cons Summary

**Pros**
- No extra platform cost beyond sandbox + model fees
- Open-source, model-agnostic at the library level
- Tuned to exploit OpenAI frontier-model features
- Harness baked in for long-horizon loops
- `AGENTS.md` and skills support
- Integrates with E2B / Modal / Daytona

**Cons**
- You still run the infra (Tier 2, not Tier 3)
- Biased toward OpenAI frontier capabilities — moving to another model loses some benefits
- No Tier-3 managed option yet

## Related Pages

- [Agent Platform Tiers](../concepts/agent-platform-tiers.md) — the five-tier spectrum
- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — head-to-head vs Claude Managed Agents and Deep Agents Deploy
- [Claude Managed Agents](claude-managed-agents.md) — Anthropic's Tier-3 platform
- [Deep Agents Deploy](deep-agents-deploy.md) — LangChain's Tier-3 offering
