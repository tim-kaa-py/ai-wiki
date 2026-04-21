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
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
last_updated: "2026-04-21"
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

## Design for Agents, Not a 1:1 REST Conversion

Parra's position (AI Engineer, April 2026): **"if you are not using MCP-unique semantics, don't use MCP."** Wrapping a REST API 1:1 as MCP tools is an anti-pattern — you pay the protocol overhead and get none of the benefits that justify it. Design from the agent's perspective:

- Collapse multi-call workflows into single high-level tools.
- Use **elicitations** for missing input instead of round-tripping through the model.
- Use **tasks** (async primitive) for long-running work.
- Ship an **MCP application** for the human surface when the server has UI to render.
- Use **structured output** so return types can drive [programmatic tool calling](#programmatic-tool-calling) composition.

Audit heuristic: if your server is `tool() → JSON` everywhere, downgrade it to a CLI or REST. MCP earns its cost through applications, elicitations, tasks, and skills-over-MCP — not as a REST-with-extra-steps.

## MCP Applications

An experimental MCP extension: a server ships a **full UI** (not a plugin, not SDK-rendered, not model-drawn HTML) that any compliant host (Claude, ChatGPT, VS Code, Cursor) can display. The same server also exposes tools, so the human interacts via the app while the model interacts via tools.

Currently supported only by web-based clients. Parra treats this as the most distinctive MCP experiment: it *requires* protocol-level semantics that REST and plugin ecosystems don't provide.

## Progressive Discovery (Client Responsibility)

Parra's reframing of the "MCP doesn't scale" complaint: **the protocol just moves bytes; context-window management is the client's job.** Preloading every tool schema is a client-harness choice, not a protocol limitation.

The fix is a `tool_search` / `load_tool` meta-tool: expose only the meta-tool by default and let the model pull specific tools on demand. Claude Code's before/after context chart is the empirical existence proof. Available natively in the Anthropic API (see [Tool Search Tool](#tool-search-tool) above), and buildable on other providers.

## Future of MCP / 2026 Roadmap

From David Soria Parra's AI Engineer talk (April 2026). Headline: June 2026 spec is a major release focused on productionization and connectivity.

- **Stateless transport (June 2026).** Google-proposed replacement for the current stateful streamable-HTTP transport. Lets MCP servers deploy like any REST service on Cloud Run / Kubernetes — unblocks hyperscalers.
- **Skills over MCP.** Servers ship skill files alongside tools, so updated usage guidance flows through the protocol instead of plugin mechanisms or separate registries. Removes the "how do I teach clients to use my server" channel problem.
- **Cross-app access.** Enterprise SSO for MCP — log in once with your corporate IdP (Google, Okta) and use any MCP server without per-server re-auth. Built with identity-provider partners.
- **Server discovery.** Convention-based discovery at well-known URLs. A crawler, browser, or agent visiting a site can ask "is there an MCP server here?" and find it without an out-of-band registry lookup.
- **SDK v2 (TypeScript + Python).** Redesigned SDKs shipping with the June spec.
- **Async task primitive.** Experimental slot for agent-to-agent communication. Few clients support it today; Anthropic plans to broaden support and refine semantics.

## Related

- [Tool Design for Agents](./tool-design-for-agents.md) — principles for writing the tools that MCP exposes.
- [Desktop Extensions (.mcpb)](../how-tos/desktop-extensions-mcpb.md) — packaging and enterprise deployment.
- [Think Tool](./think-tool.md) — a reasoning tool that works well inside long MCP tool chains.
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — per-capability decision framework.
