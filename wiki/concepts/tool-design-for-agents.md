---
title: "Tool Design for Agents"
description: "How to design tools LLM agents can use reliably, framed as the agent-computer interface deserving the same care as human interfaces"
type: "concept"
pillar: "building"
tags: [tool-design, agents, mcp, aci, evaluation, claude-code, best-practices]
sources:
  - "summaries/2025-09-11_anthropic_writing-tools-for-agents.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
  - "summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md"
timestamp: "2026-08-05"
---

# Tool Design for Agents

How to design tools that agents (LLMs) can use reliably, efficiently, and at scale. The core framing: the **agent-computer interface (ACI)** deserves the same investment that human-computer interfaces (HCI) receive.

## ACI = HCI

From Building Effective Agents (Appendix 2): the agent-computer interface is as important as the human-computer interface. Poorly-named parameters, ambiguous descriptions, and cryptic error messages hurt agents exactly the way they hurt humans — except agents can't complain. "Put yourself in the model's shoes": if the tool description is ambiguous to a smart engineer reading it for the first time, it's ambiguous to the model too.

Corollary from Anthropic's 2025 tools piece: **"Tools that are good for agents are good for humans."** The ergonomic principles transfer both directions.

## Five Principles (Anthropic, 2025)

Principles 1-4 stand as published. Principle 5 has since become generation-conditional — see the note under it.

1. **Fewer but better tools.** Don't wrap every API endpoint 1:1. Design tools around the work the agent actually needs to subdivide. When adding a tool, ask: "Would removing this and combining with an existing tool work better?"
2. **Namespace tools with prefixes.** `asana_projects_search` disambiguates at scale, especially with multiple MCP servers loaded. Flat namespaces collide.
3. **Semantic responses, not opaque IDs.** Return human-meaningful names and context instead of bare UUIDs. This reduces hallucinations on retrieval and chaining tasks.
4. **Token efficiency by default.** Pagination, filtering, and truncation keep responses inside the context window. Large uncurated dumps are an anti-pattern.
5. **Prompt-engineer the descriptions — but calibrate richness to the model generation.** Tool descriptions are prompts, and JSON Schema alone can't express usage patterns. What changed is *how much* prose that warrants.

   **Through the Claude 4 era (documented standard).** Include example usage, edge cases, format requirements, and boundaries vs. other tools. This is Anthropic's published guidance from *Writing tools for agents* (Sep 2025) and remains the reference position for any model outside the 5-series.

   **For the Claude 5 generation (reported direction, weaker evidence).** The guidance is said to have shifted toward simpler, deduplicated descriptions — the premise being that 5-series models no longer need to be talked through a tool they can inspect. Treat this as a direction rather than a specification: the source is a secondhand paraphrase of an unpublished-to-this-wiki article (Tariq, Anthropic, via Jay E / RoboNuggets, Aug 2026), and it does **not** say which of the four elements above to drop. "Simpler" is the whole of the instruction.

   **The evidence asymmetry is the point, not a footnote.** The old half is first-party published guidance you can read; the new half is one person's summary of another person's article, with no eval names, no magnitudes, and no worked before/after for a tool description specifically. Do not treat the shift as settled first-party doctrine, and do not strip a working description on its authority alone.

   **What to actually do.** The one part of the 5-series direction that arrives with a concrete mechanism and an Anthropic-run example is deduplication between the system prompt and tool descriptions — apply that first, one description at a time, per [§ Deduplicate Between System Prompt and Tool Descriptions](#deduplicate-between-system-prompt-and-tool-descriptions). Beyond deduplication, shorten only where a real task confirms nothing regressed. The *example usage* element specifically is contested on a second front and should be treated as unsettled rather than deprecated: see the held tension on [Prompt Engineering for Claude § Unresolved Tensions](prompt-engineering-claude.md#unresolved-tensions), where the same few-shot question is open against Anthropic's own April 2026 prompting guidance.

## The Three-Phase Loop

Treat tools as artifacts that need iteration, not one-shot writes:

1. **Prototype** — Stand up the tool in Claude Code, often via a local MCP server or Desktop extension.
2. **Evaluate** — Run realistic multi-call tasks. Track accuracy, runtime, token usage, and error patterns.
3. **Optimize** — Feed transcripts (including failures) back to Claude Code and have it rewrite the tool definition, descriptions, and response shape.

The loop is the method: tools improve by being used and measured, not by upfront design.

## Goals Over Few-Shots (Distributed Tool Ownership)

Notion's evolution (April 2026) past a handful of tools into 100+: **few-shot-based tool specification doesn't scale organizationally.** With few-shots, every engineer editing a tool ends up editing one shared, order-sensitive system-prompt string — which forces a center-of-excellence gating function and bottlenecks feature teams.

Shift to **crisp per-tool goal descriptions** — what the tool accomplishes, when to use it, when not to. Teams then own their own tools end-to-end. This is a discipline consistent with Principle 5 (prompt-engineer the description) but sharpened for multi-team scale.

Practical implication: stop investing in curated few-shots for new capabilities. Invest in goal-focused descriptions plus progressive disclosure (see [MCP](./mcp.md#mcp-vs-cli--not-a-dichotomy) Tool Search).

## Design for an Agent, Not a 1:1 REST Conversion

David Soria Parra (Anthropic, MCP maintainer — AI Engineer April 2026) sharpens Principle 1 for the MCP era: **wrapping a REST API 1:1 as MCP tools is an anti-pattern.** REST is designed for human/machine request-response consumers; it preserves none of MCP's rich semantics (applications, elicitations, tasks, skills-over-MCP). A 1:1 converter ships the REST surface and ignores all of that — you pay MCP's overhead for zero of its benefits.

Design from the agent's perspective:
- Start from "how would a human use this *through* an agent?"
- Collapse multi-call workflows into single high-level tools.
- Use elicitations for missing input, tasks for long-running work, applications for the human UI surface.
- If your server is `tool() → JSON` everywhere with no MCP-unique semantics, downgrade to a CLI or REST.

Parra's rule: *"If you are not using MCP-unique semantics, don't use MCP."* This is Principle 1 ("fewer but better tools") applied at the protocol level.

## Deduplicate Between System Prompt and Tool Descriptions

A maintenance rule rather than a design rule, and the one place tool descriptions interact with the *rest* of the context rather than with each other. Reported Anthropic guidance for the Claude 5 generation (Tariq's "new rules" article, secondhand via Jay E / RoboNuggets): where the same instruction appears in both the system prompt and a tool description, **delete one copy.** Anthropic's own worked example — they had tool references in the main system prompt *and* the same instructions in the tool descriptions, and deleted the tool-description copies.

The historical reason the duplication existed is worth keeping, because it is the thing that has to be true for the rule to be safe: repetition was a workaround for **recency dominance** — models "were more likely to listen to instructions at the end of the context window... than the ones at the start," so saying it twice, once late, raised the odds of adherence. The claim licensing the deletion is that this has changed with the Claude 5 generation. That claim is asserted in the source without evidence, benchmark, or magnitude, and it is load-bearing here: *if recency dominance is only partially reduced, deduplicating is riskier than the rule implies.* See [Context Engineering § The Core Problem: Context Rot](context-engineering.md#the-core-problem-context-rot) for what this wiki currently holds on that question.

Safe application, given the evidence quality: grep skills and MCP tool definitions for phrases that also appear in the system prompt or CLAUDE.md, delete **one** duplicate, run a real task, confirm behaviour is unchanged, then move to the next. This is [ablation](harness-engineering.md#ablation-the-named-procedure-cherny-july-2026) at tool-description granularity, and the same repeated-stumble bar applies to putting a line back. *(Source: Tariq via Jay E / RoboNuggets, 2026-08-03 — secondhand)*

## Don't Hide Your Tool List

Notion's position: "we don't think our system prompt is our secret sauce." Users benefit from knowing the tool surface — it builds trust and turns power users into better prompters. Hiding the system prompt and tool catalog is usually a rationalization, not actual moat.

## Related

- [MCP](./mcp.md) — the protocol most of these tools ship over, including advanced features (Tool Search, Programmatic Tool Calling, Tool Use Examples) that extend these principles.
- [Think Tool](./think-tool.md) — a tool-design pattern for mid-chain reasoning in long tool-use loops.
- [Desktop Extensions (.mcpb)](../how-tos/desktop-extensions-mcpb.md) — packaging format for distributing agent tools.
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — the tool-surface decision beyond individual tool design.
- [Context Engineering](./context-engineering.md) — where tool descriptions are paid for: unconditionally, on every call.
- [Harness Engineering](./harness-engineering.md) — the ablation procedure this page's deduplication rule is an instance of.
