---
title: "Tool Design for Agents"
type: "concept"
pillar: "building"
tags: [tool-design, agents, mcp, aci, evaluation, claude-code, best-practices]
sources:
  - "summaries/2025-09-11_anthropic_writing-tools-for-agents.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
last_updated: "2026-04-20"
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

## Related

- [MCP](./mcp.md) — the protocol most of these tools ship over, including advanced features (Tool Search, Programmatic Tool Calling, Tool Use Examples) that extend these principles.
- [Think Tool](./think-tool.md) — a tool-design pattern for mid-chain reasoning in long tool-use loops.
- [Desktop Extensions (.mcpb)](../how-tos/desktop-extensions-mcpb.md) — packaging format for distributing agent tools.
