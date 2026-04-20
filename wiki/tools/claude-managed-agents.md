---
title: "Claude Managed Agents"
type: "tool"
pillar: "ecosystem"
tags: [managed-agents, claude, anthropic, infrastructure, sandbox, harness, harness-engineering, agents]
sources:
  - "summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md"
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2026-04-15_anthropic_scaling-managed-agents.md"
last_updated: "2026-04-20"
---

# Claude Managed Agents

Anthropic's fully cloud-hosted agent platform. Sits at **Tier 3** on the [agent platform tiers](../concepts/agent-platform-tiers.md) spectrum. At 8¢ per session-hour of active runtime, Anthropic bundles the agent loop ("brain") with sandboxed execution ("hands") into a blackbox that they own end-to-end.

## What's in the Box

| Component | Role |
|-----------|------|
| Model + harness ("brain") | Anthropic-owned agent loop; evolves with future Claude models via the "meta-harness" framing |
| Sandboxes ("hands") | Code execution, tool calling, MCP server access |
| Session management | Anthropic-managed lifecycle, scaling, orchestration |
| Credential vaults | Secrets storage separate from harness and sandbox |

Pricing: **8¢ / session-hour of active runtime** (plus underlying model costs).

## Brain vs. Hands

Anthropic's positioning metaphor:

- **Brain** = model + harness (the agent loop itself)
- **Hands** = sandboxed execution surface for code, tools, MCPs

The decoupling isn't novel — AWS Bedrock AgentCore and Google Vertex AI Agent Builder ship the same split, but **model-agnostically**. Claude Managed Agents is model-locked to Claude.

## Brain / Hands / Session — the Three-Way Split

Anthropic's April 2026 engineering post ([Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)) sharpens the metaphor into three independently-lifecycled components, explicitly framed as OS-style hardware virtualization:

| Component | Role | Failure handling |
|-----------|------|-----------------|
| **Brain (harness)** | Stateless, replaceable | Recovery via `wake(sessionId)` + `getSession(id)` |
| **Hands (sandboxes)** | Uniform `execute(name, input) → string` | Tool-level errors trigger sandbox re-provisioning |
| **Session (log)** | Append-only, outside Claude's context window | Model re-queries history without irreversible trimming |

Design principle: **failure of one component must not kill the session.** The prior design lost everything on container failure.

**Concrete wins from the architecture:**

- **Lazy container provisioning** — p50 TTFT cut 60%, p95 cut 90%+
- **Credentials outside the sandbox** — bundled at init (e.g. Git creds) or in vaults; generated code cannot reach them
- **Session log outside context window** — model can re-query its own history without compacting or losing information

The OS-as-analogy framing: treat the harness as a virtualization layer over model capabilities so future model upgrades plug in without rewrites. This is the *technical* case for the meta-harness pitch below.

## The "Meta-Harness" Argument

Anthropic's reasoning for why you *should* outsource the harness:

1. Harnesses must evolve with model capabilities (per Anthropic's own prior research) or they degrade.
2. Therefore whoever owns the harness must track the model.
3. Anthropic controls the model → Anthropic is best-positioned to own the harness.
4. Framed as a "meta-harness" — unopinionated about any specific future harness, committed to staying aligned with future Claude models.

**Critique (The AI Automators):** the premise is true, but the conclusion "therefore outsource to us" is a *choice*, not a necessity. The meta-harness pitch is lock-in dressed as future-proofing.

**Naming collision:** Anthropic's "meta-harness" (this page — a product framing for why you should outsource the harness) is *not* the same as Stanford's **Meta Harness** (Omar Khattab, March 2026 — a research framework where an agentic proposer rewrites the harness itself after reading raw execution traces). The research Meta Harness is an optimization loop you run; Anthropic's meta-harness is a subscription you buy. See [Meta Harness](../concepts/meta-harness.md) for the research framework, and [Harness Engineering](../concepts/harness-engineering.md) for the broader discipline.

**What the harness-engineering research says about the trade:** the harness optimized on one model transfers to five others. Treating the harness as long-lived IP you own cuts against the "outsource it" pitch — if you own it, you re-run it against the next five models; if Anthropic owns it, you don't.

## What Actually Shipped (April 2026)

Live at launch:
- System prompts
- MCPs / tools
- Agent skills
- Sessions
- Environments
- Credential vaults

Behind a **research-preview form** (not generally available):
- Outcome-based tasks
- Multi-agent orchestration
- Stateful memory
- Evaluator agent

The AI Automators' take: the announcement oversold the capability side — what remains usable today "looks very similar to a lot of other agent builders." The product is primarily an **infrastructure play**, not a capability leap.

## When to Use It

Good fit if:
- You're committed to Claude long-term
- You want zero agent ops (no sandbox management, no scaling work)
- Your use case tolerates Anthropic changing harness behavior under you
- You want credential vaults and MCP wiring out of the box

Bad fit if:
- You need model flexibility (use Vertex AI Agent Builder or AWS Bedrock AgentCore instead)
- You need the research-preview features *today* (outcome-based tasks, multi-agent orchestration, stateful memory, evaluator agent) — request early access or don't wait
- Compliance / data-residency is strict — Tier 3 cedes infra

## Trade-offs

**Pros**
- Fully managed — no ops burden
- Strong brain/hands separation with credential vaults built in
- Native Claude alignment (harness tracks future Claude models)

**Cons**
- Model-locked to Claude
- Most marketed features behind research-preview gating
- "Completely seeding control of your agents to Anthropic" (creator's framing)
- Infra, memory, harness all owned by vendor — high migration cost

## Related Pages

- [Agent Platform Tiers](../concepts/agent-platform-tiers.md) — the five-tier spectrum
- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — head-to-head vs Deep Agents Deploy and OpenAI Agents SDK
- [Deep Agents Deploy](deep-agents-deploy.md) — LangChain's Tier-3 competitor
- [OpenAI Agents SDK](openai-agents-sdk.md) — OpenAI's Tier-2 SDK
- [Claude Routines](claude-routines.md) — Claude Code's own managed-runtime offering (different product, overlapping space)
- [Harness Engineering](../concepts/harness-engineering.md) — the discipline whose findings frame the meta-harness trade
- [Meta Harness](../concepts/meta-harness.md) — the research framework that shares the name but is a different thing
