# Ingest Notes

**Source:** [The Future of MCP — David Soria Parra, Anthropic](https://m.youtube.com/watch?v=v3Fr2JR47KA)

## User Focus
(auto mode — no user focus provided; Opus selected focus)

## Confirmed Discoveries
- [00:18-01:32] **MCP Applications demo** — an agent shipping its own UI over MCP, portable across Claude, ChatGPT, VS Code, Cursor. A server can ship both an app (human-facing UI) and tools (model-facing) over the same protocol — a semantic layer REST/plugins cannot provide.
- [03:51-05:06] **The 2026 shift: coding agents → knowledge-worker agents.** Coding agents were the easy case (local, verifiable, compiler-checked). Knowledge-worker agents (financial analyst, marketer) need connectivity to 5+ SaaS apps and shared drives — connectivity, not compilation, is the hard problem.
- [05:06-07:12] **Connectivity is not one thing — pick the right tool.** Stack = Skills (domain knowledge, cheap, reusable) + CLI (great for local sandbox + pre-trained tools like git/gh) + MCP (rich semantics, UI, auth, governance, platform independence). Anyone selling a single silver bullet is wrong.
- [07:47-09:38] **Progressive discovery is mandatory on the client side.** Protocol moves bytes; client owns context. Default pattern of dumping every tool into the context window is the problem, not MCP. Use a tool-search tool so the model loads tools on demand. Claude Code before/after chart showed massive context reduction.
- [09:38-11:48] **Programmatic tool calling / code mode over sequential orchestration.** Instead of model → tool → model → tool loops (wastes inference, latency-sensitive), give the model a REPL (V8 isolate, MicroPython, Lua) and let it write a script composing tools. MCP's structured output provides return types so the model can compose type-aware pipelines. If no structured output, post-process with a cheap model to extract types.
- [11:59-13:33] **Don't 1:1 convert REST → MCP.** Design for an agent (or a human using it) — that's what unlocks MCP's value. Server-side execution environments (Cloudflare MCP) are an alternative pattern: ship a sandbox, not a tool-per-endpoint. Use MCP-unique semantics — applications, elicitations, tasks, skills-over-MCP — otherwise why pay the protocol cost.
- [13:33-17:15] **June 2026 roadmap:** stateless transport protocol (Google proposal, deploys like a REST service to Cloud Run/K8s) · improved async task primitive for agent-to-agent · TypeScript + Python SDK v2 (lessons learned from FastMCP) · cross-app access (log in once with Okta/Google, reuse across MCP servers) · server discovery at well-known URLs · skills-over-MCP extension so server authors ship usage knowledge alongside tools.
