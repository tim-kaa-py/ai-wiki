---
title: "Agent Platform Tiers (Build-to-Buy Spectrum)"
description: "A five-tier build-to-buy spectrum for positioning an agentic system, from full control to full vendor convenience"
type: "concept"
pillar: "ecosystem"
tags: [managed-agents, agent-frameworks, infrastructure, comparison, agents, sandbox, harness, harness-engineering, strategy, memory]
sources:
  - "summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md"
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2026-04-15_anthropic_scaling-managed-agents.md"
  - "summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md"
timestamp: "2026-05-17"
---

# Agent Platform Tiers (Build-to-Buy Spectrum)

A five-tier mental model for where to position an agentic system on the build-to-buy spectrum. Left = maximum control/flexibility, slow time to market. Right = maximum convenience, locked-in, fast time to market. Framed by The AI Automators.

## The Five Tiers

| Tier | Name | Example vendors | What you own | What the vendor owns |
|------|------|-----------------|--------------|----------------------|
| **1** | Direct API + Client SDKs | Anthropic Messages API, Google Gemini API, OpenAI API; Anthropic client SDKs, Google Gen AI SDK, OpenAI Python/JS | The entire agent loop, harness, infra, memory, sandbox | Only the model endpoint |
| **2** | Agent Frameworks / SDKs | Claude Agent SDK, OpenAI Agents SDK, Google ADK, LangGraph + Deep Agents, Crew AI, Pydantic AI | Infra, memory, sandbox, deployment | Harness abstractions (you host them) |
| **3** | Managed Platforms & Infrastructure | Claude Managed Agents, Vertex AI Agent Builder, Azure Foundry Agent Service, Deep Agents Deploy (via LangSmith), AWS Bedrock AgentCore; sandboxes: E2B / Modal / Daytona | Your prompts, tools, MCPs, skills | Harness, infra, scaling, session management, sandbox runtime |
| **4** | Visual Low-Code AI Platforms | n8n, Relevance AI, Copilot Studio, Zapier agents, Make.com agents, Flowise, Dify | Your flows/config | Runtime, UI, triggers, integrations |
| **5** | Embedded SaaS Agents | Salesforce Agentforce, Intercom Fin, Atlassian Rovo | Almost nothing — configuration only | Everything — the agent IS the SaaS |

Gartner projects 40% of enterprise apps will ship task-specific agents by 2026, which largely accounts for Tier 5's surge.

## The Three Lock-In Surfaces

Tier choice, not vendor choice, is what drives lock-in. The three surfaces that abstractions capture:

1. **Memory** — where state lives across sessions
2. **Infrastructure** — where the agent runtime executes
3. **Harness** — the agent loop itself (tool-calling logic, planning, sub-agent dispatch)

| Tier | Memory | Infra | Harness |
|------|--------|-------|---------|
| 1 | You | You | You |
| 2 | You | You | SDK (swappable) |
| 3 | Vendor | Vendor | Vendor |
| 4 | Platform | Platform | Platform (visual) |
| 5 | SaaS | SaaS | SaaS (opaque) |

Migration cost scales with how much state the vendor owns. That is why moving off Tier 3+ is painful: you're moving memory, infra, and harness simultaneously.

**Anthropic's Brain / Hands / Session decoupling (April 2026)** refines this for Tier 3: at the managed-agent layer, vendors aren't ceding one monolith but three independently-lifecycled components — stateless harness (brain), interchangeable sandboxes (hands), and durable append-only session log. Recovery via `wake(sessionId)` + `getSession(id)`. Credentials live outside the sandbox surface. The three lock-in surfaces above map cleanly onto this split: *harness* = brain, *infra* = hands, *memory* = session. Evaluating a Tier-3 vendor means asking how cleanly *their* version of this decoupling is drawn and which slot you could swap out if needed. See [Claude Managed Agents](../tools/claude-managed-agents.md).

**The harness surface is the one whose value changed most in 2026.** Stanford and LangChain documented a 6x performance variation attributable to the harness alone, and an optimized harness transfers across five models and improves all of them (see [Harness Engineering](harness-engineering.md)). That reframes the Tier-3+ decision: ceding "harness" is no longer ceding orchestration glue — it's ceding the reusable, compounding asset that often matters more than model choice.

**The memory surface is the one whose value changed most in May 2026.** Anthropic's memory-as-primitive launch (public beta, May 2026) reframes the *memory* lock-in surface the same way harness engineering reframed the harness surface. Memory used to mean "a JSON blob your agent reads and writes." It now means: file-system memory the model curates with bash/grep, permission scopes per store, optimistic concurrency via content-hash preconditions, version history with attribution, **and** an out-of-band consolidator ([Dreaming](dreaming.md)) that mines transcripts for cross-agent patterns. Building all of that yourself at Tier 1-2 is non-trivial. Mahes's framing (Anthropic Platform team): memory belongs in the same architectural tier as MCP, harnesses, and Skills — and the most sought-after enterprise feature on top of it is the version-history/attribution layer, not the storage itself. The Tier-3+ trade now cedes a substantially larger surface than the April-2026 launch suggested. See [Claude Managed Agents § Memory](../tools/claude-managed-agents.md#memory-public-beta-may-2026) and [Agent Memory Systems § The Platform View](agent-memory-systems.md#the-platform-view-memory-as-a-primitive-anthropic).

## Decision Heuristics

Run these four checks in order. The first hard constraint narrows the tier; only then compare vendors within that tier.

1. **Full control / compliance-heavy?** → Tier 1-2, possibly self-hosted.
2. **Fast time to market?** → Tier 3-5.
3. **Must swap models?** → Model-agnostic options only: Vertex AI Agent Builder, AWS Bedrock AgentCore, Deep Agents (MIT library), OpenAI Agents SDK (tuned for OpenAI but open), Google ADK. Claude Managed Agents is model-locked.
4. **Strict data residency / privacy?** → Self-hosted or a vendor with a strong DPA.

Before comparing vendors, write down which of **memory / infra / harness** you are willing to cede. That eliminates ~80% of options immediately.

## Products That ARE Agents (Off-Spectrum)

Not part of the build-to-buy spectrum because you don't build *on* them — you *use* them. Examples:

- **Claude Code** — terminal agent with routines, dispatch, desktop/mobile apps, cloud containers that open PRs
- **OpenClaude** — autonomous Telegram-facing agent that wakes on an interval

When scoping internal tooling, ask "do we need to **build** an agent, or **adopt** one?" first. A Claude Code (or similar) license may replace a whole Tier-2 build.

## Why the Tiers Matter Right Now

Three concurrent releases in April 2026 — Anthropic's Claude Managed Agents, LangChain's Deep Agents Deploy, and the next evolution of OpenAI's Agents SDK — all pushed vendors into the managed-agent space simultaneously. Without this mental model, the market looks like a flat comparison of three products. With it, they resolve cleanly:

- Claude Managed Agents → Tier 3 (model-locked)
- Deep Agents Deploy → Tier 3 (SaaS-locked via LangSmith Plus)
- OpenAI Agents SDK → Tier 2 (you still host it)

See [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) for the head-to-head.

## Related Pages

- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — head-to-head comparison of Tier-3 offerings
- [Claude Managed Agents](../tools/claude-managed-agents.md) — Anthropic's Tier-3 platform
- [Deep Agents Deploy](../tools/deep-agents-deploy.md) — LangChain's Tier-3 offering
- [OpenAI Agents SDK](../tools/openai-agents-sdk.md) — OpenAI's Tier-2 SDK
- [Claude Routines](../tools/claude-routines.md) — Claude Code's own Tier-3-ish managed execution for routines
- [Claude Routines vs n8n](../comparisons/claude-routines-vs-n8n.md) — Tier 3 vs Tier 4 in practice
- [Harness Engineering](harness-engineering.md) — what the "harness" lock-in surface actually is, and why it is increasingly the asset worth protecting
- [Agent Memory Systems](agent-memory-systems.md) — what the "memory" lock-in surface looks like at platform scale
- [Dreaming](dreaming.md) — the out-of-band consolidation pattern that makes the memory surface load-bearing at fleet scale
