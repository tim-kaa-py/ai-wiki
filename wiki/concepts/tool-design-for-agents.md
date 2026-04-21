---
title: "Tool Design for Agents"
type: "concept"
pillar: "building"
tags: [tool-design, agents, mcp, aci, evaluation, claude-code, best-practices]
sources:
  - "summaries/2025-09-11_anthropic_writing-tools-for-agents.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
last_updated: "2026-04-21"
---

# Tool Design for Agents

How to design tools that agents (LLMs) can use reliably, efficiently, and at scale. The core framing: the **agent-computer interface (ACI)** deserves the same investment that human-computer interfaces (HCI) receive.

## ACI = HCI

From Building Effective Agents (Appendix 2): the agent-computer interface is as important as the human-computer interface. Poorly-named parameters, ambiguous descriptions, and cryptic error messages hurt agents exactly the way they hurt humans — except agents can't complain. "Put yourself in the model's shoes": if the tool description is ambiguous to a smart engineer reading it for the first time, it's ambiguous to the model too.

Corollary from Anthropic's 2025 tools piece: **"Tools that are good for agents are good for humans."** The ergonomic principles transfer both directions.

## Five Principles (Anthropic, 2025)

1. **Fewer but better tools.** Don't wrap every API endpoint 1:1. Design tools around the work the agent actually needs to subdivide. When adding a tool, ask: "Would removing this and combining with an existing tool work better?"
2. **Namespace tools with prefixes.** `asana_projects_search` disambiguates at scale, especially with multiple MCP servers loaded. Flat namespaces collide.
3. **Semantic responses, not opaque IDs.** Return human-meaningful names and context instead of bare UUIDs. This reduces hallucinations on retrieval and chaining tasks.
4. **Token efficiency by default.** Pagination, filtering, and truncation keep responses inside the context window. Large uncurated dumps are an anti-pattern.
5. **Prompt-engineer the descriptions.** Tool descriptions are prompts. Include example usage, edge cases, format requirements, and boundaries vs. other tools. JSON Schema alone can't express usage patterns.

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

## Don't Hide Your Tool List

Notion's position: "we don't think our system prompt is our secret sauce." Users benefit from knowing the tool surface — it builds trust and turns power users into better prompters. Hiding the system prompt and tool catalog is usually a rationalization, not actual moat.

## Related

- [MCP](./mcp.md) — the protocol most of these tools ship over, including advanced features (Tool Search, Programmatic Tool Calling, Tool Use Examples) that extend these principles.
- [Think Tool](./think-tool.md) — a tool-design pattern for mid-chain reasoning in long tool-use loops.
- [Desktop Extensions (.mcpb)](../how-tos/desktop-extensions-mcpb.md) — packaging format for distributing agent tools.
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — the tool-surface decision beyond individual tool design.
