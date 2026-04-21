---
title: "MCP (Model Context Protocol)"
type: "concept"
pillar: "building"
tags: [mcp, tool-use, code-execution, tool-search, programmatic-tool-calling, context-management, agents]
sources:
  - "summaries/2025-11-04_anthropic_code-execution-with-mcp.md"
  - "summaries/2025-11-24_anthropic_advanced-tool-use.md"
  - "summaries/2025-06-26_anthropic_desktop-extensions.md"
  - "summaries/2025-09-11_anthropic_writing-tools-for-agents.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
last_updated: "2026-04-20"
---

# MCP (Model Context Protocol)

An open protocol from Anthropic for exposing tools, data, and prompts to LLM agents. MCP servers provide tools; MCP clients (Claude Desktop, Claude Code, IDEs) connect to them. Servers can be local (stdio) or remote (HTTP/SSE).

## Two Inefficiencies MCP Has to Solve

As MCP adoption grew, two context problems emerged:

1. **Tool-definitions-upfront:** every connected server dumps all its tool schemas into the system prompt. Thousands of tools = hundreds of thousands of tokens before the first user message.
2. **Intermediate results through context:** large tool outputs (documents, query results) cycle through the model repeatedly on each turn.

## Code Execution with MCP

Instead of routing every tool call and every intermediate result through the model, expose MCP tools as a **code API** inside a sandboxed runtime. The agent writes code that calls the tools; only the final result flows back to the model.

- Tools are presented as a **filesystem-as-tool-API** — a file tree the agent imports selectively.
- **Token delta in the Anthropic example: 150K → 2K tokens (-98.7%).**
- Privacy bonus: sensitive intermediate data stays in the sandbox, never touches model context.
- State persistence: agents save progress in the sandbox and build reusable skills across turns.
- Cost: requires secure sandboxing, resource limits, and monitoring infrastructure.

**Use when:** many MCP servers, large tool outputs, or context bloat is the bottleneck.

## Advanced Tool Use (beta: `advanced-tool-use-2025-11-20`)

Three features that address the same inefficiencies without requiring a full sandbox:

### Tool Search Tool
Mark tools with `defer_loading: true`. Their schemas are not injected upfront; Claude searches for them when needed.
- **Opus 4:** 49% → 74% accuracy on libraries with >10K tokens of tool definitions.
- **Opus 4.5:** 79.5% → 88.1% on the same.
- **Apply:** when you have many tools (or many MCP servers), enable `defer_loading` rather than dumping all schemas into the system prompt.

### Programmatic Tool Calling
Claude writes Python that orchestrates tool calls (loops, conditionals, transforms). Intermediate results are processed in the sandbox and never enter the model context.
- **-37% tokens average (43.5k → 27.3k).**

### Tool Use Examples
Concrete example calls attached to tool definitions. JSON Schema can't express usage patterns; examples can.
- **+18pp accuracy on complex parameter handling (72% → 90%).**

## Distribution: Desktop Extensions

`.mcpb` is the packaging format for shipping MCP servers to Claude Desktop as one-click installs. See [Desktop Extensions how-to](../how-tos/desktop-extensions-mcpb.md).

## MCP vs CLI — Not a Dichotomy

Notion's framing (Latent Space, April 2026): MCP vs CLIs is a **per-capability tradeoff**, not a winner-takes-all. Neither is strictly better; you commit to both and pick per quality need. See [MCP vs CLI](../comparisons/mcp-vs-cli.md) for the full treatment.

Sketch of the tradeoff:

| Dimension | MCP | CLI |
|-----------|-----|-----|
| Permission model | Strong by construction — "all you can do is call the tools" | Murkier — token exfiltration, sandbox questions |
| Self-repair | If transport breaks, the agent is stuck | Agent can write/fix tools in the same env (example: 100-LOC Chromium wrapper) |
| Progressive disclosure | Not inherent; harness layers it on | Free — `--help`, grep, pagination all built in |
| Token economics | Pays LLM fees on every deterministic call — wasteful under usage-based pricing | One-time code generation amortizes cost |
| Best for | Narrow, permissioned, deterministic work without a compute runtime | Open-ended, self-healing capability with a terminal |

Key decision heuristic: *"Does this task need open-endedness and self-repair, or narrow permissioned determinism?"*

## Related

- [Tool Design for Agents](./tool-design-for-agents.md) — principles for writing the tools that MCP exposes.
- [Desktop Extensions (.mcpb)](../how-tos/desktop-extensions-mcpb.md) — packaging and enterprise deployment.
- [Think Tool](./think-tool.md) — a reasoning tool that works well inside long MCP tool chains.
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — per-capability decision framework.
