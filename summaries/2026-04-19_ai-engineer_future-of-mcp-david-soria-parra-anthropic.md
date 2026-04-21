---
title: "The Future of MCP — David Soria Parra, Anthropic"
source_type: "youtube"
channel: "AI Engineer"
date: "2026-04-19"
url: "https://m.youtube.com/watch?v=v3Fr2JR47KA"
pillar: "understanding"
tags: [mcp, protocol, agents, progressive-discovery, programmatic-tool-calling, skills, connectivity, anthropic]
ingested: "2026-04-21"
source_file: "sources/youtube/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
---

# The Future of MCP — David Soria Parra, Anthropic — Summary

**Source:** AI Engineer | 2026-04-19 | [Link](https://m.youtube.com/watch?v=v3Fr2JR47KA) | 18:45

## TL;DR
Parra's core claim: 2026 is the year knowledge-worker agents go into production, and those agents need a *connectivity stack* — Skills + MCP + CLI/computer-use, picked per job — not a single silver bullet. For MCP specifically, he argues two client-side patterns are now non-negotiable for server and harness builders: **progressive discovery** (load tools on demand via a tool-search tool, not all upfront) and **programmatic tool calling / code mode** (give the model a REPL and let it compose tools in a script instead of orchestrating call-by-call). The June 2026 spec brings stateless transport, skills-over-MCP, cross-app access, server discovery, and TypeScript/Python SDK v2.

## Video Structure
1. [00:18-01:32] MCP Applications demo — agent UI shipped over MCP, portable across hosts
2. [01:34-03:20] 18-month recap — from local-only spec to 110M monthly downloads (2× faster than React)
3. [03:20-03:51] What everyone's building — SaaS integrations (Linear, Slack, Notion) plus the invisible majority behind enterprise firewalls
4. [03:51-05:06] Why 2026 is different — coding agents were easy mode; knowledge-worker agents need connectivity
5. [05:06-07:12] The connectivity stack — Skills vs CLI vs MCP, picking the right tool per job
6. [07:12-09:38] Client-side fix #1: progressive discovery (with Claude Code before/after)
7. [09:38-11:48] Client-side fix #2: programmatic tool calling / code mode
8. [11:59-13:33] Server-side fix: stop converting REST 1:1; design for agents; use MCP-unique semantics
9. [13:33-17:15] MCP roadmap — stateless transport, async tasks, SDK v2, cross-app access, server discovery, skills-over-MCP
10. [17:15-18:30] Close — 2026 is about connectivity, best agents use every mechanism; call for community feedback

## Key Concepts

### MCP Applications
An MCP server can ship a full UI — not a plugin, not SDK-rendered, not model-drawn HTML — that any compliant host (Claude, ChatGPT, VS Code, Cursor) can display. The same server also exposes tools, so a human interacts via the app while the model interacts via tools. Parra treats this as MCP's most distinctive experiment: it *requires* protocol-level semantics that REST and plugin ecosystems don't provide.

### Progressive Discovery
Parra's framing: "the protocol just puts information across the wire; the *client* is responsible for dealing with that information." Progressive discovery means the client does **not** preload every tool into the context window. Instead it exposes a tool-search/tool-load meta-tool; the model discovers and loads tools on demand. The pattern is a property of the agent harness, not of MCP itself — this matters because people blame MCP for context bloat that is actually a client choice.

### Programmatic Tool Calling (a.k.a. Code Mode)
Instead of the model running `call → result → call → result` loops, give it a REPL (V8 isolate, MicroPython, Lua) plus the tool schemas, and let it write a script that composes tools. Fewer inference rounds, lower latency, better composition. Parra's framing diverges slightly from "code mode" as used elsewhere: he explicitly ties it to **MCP's structured output**, which exposes return types so the script can pipe one tool's output into the next with static-style type awareness.

### Skills over MCP
An upcoming MCP extension where a server ships not only tools but also the **skill files** explaining how to use them. Today you typically ship skills via plugins, registries, or a separately-distributed `load_skills` tool. Skills-over-MCP folds that channel into the protocol so server authors push updated usage guidance alongside updated tools.

### Stateless Transport Protocol
A Google proposal landing in the June 2026 spec. The current streamable-HTTP transport is stateful and painful for hyperscalers to scale. Stateless transport lets MCP servers deploy like any REST service on Cloud Run or Kubernetes.

### Cross-App Access
Enterprise SSO for MCP: log in once with your corporate IdP (Google, Okta) and use any MCP server without re-authenticating per server. Built with identity-provider partners.

### Server Discovery
Convention-based discovery at well-known URLs. A crawler, browser, or agent visiting a site can ask "is there an MCP server here?" and find it without an out-of-band registry lookup. Ships with the June 2026 spec.

### Asynchronous Task Primitive
MCP's experimental slot for agent-to-agent communication. Currently supported by very few clients; Anthropic plans to broaden client support and refine the semantics.

## Key Takeaways
1. **Stop dumping every tool into the context window.** It's the single biggest reason people think MCP scales badly — and it's a client bug, not a protocol one.
   **How to apply:** Add a `tool_search` (or equivalent `list_tools` + `load_tool`) meta-tool to your harness. Expose only the meta-tool by default; let the model pull specific tools on demand. Anthropic's API offers this natively; you can also build it yourself.
2. **Don't make the model orchestrate — let it compose via code.** Sequential tool-call loops burn inference and latency on glue logic the model would write better as a script.
   **How to apply:** Ship a sandboxed REPL tool (V8 isolate, MicroPython, Lua). Feed the model your MCP tool schemas plus structured-output types. Ask it to write a script, then execute. If a server lacks structured output, post-process its text with a cheap extraction model to synthesize types.
3. **Don't convert REST APIs 1:1 to MCP — design for an agent.** 1:1 conversion throws away everything that makes MCP worth the protocol overhead.
   **How to apply:** Start from "how would a human use this through an agent?" Collapse multi-call workflows into single high-level tools. Use elicitations for missing input. Ship an MCP application for the human surface. Use tasks for long-running work.
4. **If you're not using MCP-unique semantics, don't use MCP.** Applications, elicitations, tasks, skills-over-MCP — these are the reason to pay the protocol cost.
   **How to apply:** Audit your server. If it's `tool() → JSON` everywhere, downgrade to a CLI or REST. If you need UI, auth/governance, long-running tasks, or platform-independent rich semantics, lean into MCP's primitives instead of working around them.
5. **Consider server-side execution environments as a design pattern.** The Cloudflare MCP server ships a sandbox, not a tool-per-endpoint; the model orchestrates inside the server's runtime.
   **How to apply:** When your API surface is large and composition-heavy, ship a `run_script` tool against a server-side sandbox with the API pre-imported. Cuts tokens and latency versus N round-tripped tool calls.
6. **Use structured output to enable type-aware composition.** It's the glue that makes code mode actually work.
   **How to apply:** Declare return schemas on every MCP tool you ship. On the client side, when consuming a server without them, run a Haiku-tier extraction pass to synthesize types before feeding the result into the next step.
7. **The best 2026 agents use all four connectivity mechanisms together.** Skills for domain knowledge, CLI for sandboxed pre-trained tools (git, gh), MCP for rich/enterprise/UI-bearing integrations, computer-use for the long tail.
   **How to apply:** Stop treating "MCP vs CLI vs skills" as a choice. Wire all four into your harness and pick per job. Budget context accordingly — skills and CLI are cheap, MCP tool lists need progressive discovery.

## Argument Structures

**Why connectivity is not one thing.**
Premise 1: 2026 agents must serve knowledge workers (financial analysts, marketers), not just coders.
Premise 2: Knowledge workers' needs are fundamentally "connect to five SaaS apps and a shared drive," not "compile and verify locally."
Premise 3: No single mechanism covers that surface — CLIs need a sandbox, computer-use is brittle, raw MCP lacks pre-trained affordances, skills alone have no runtime.
Conclusion: You need a stack (Skills + MCP + CLI/computer-use) and you pick per job. Anyone claiming a silver bullet is wrong *by construction*.

**Why progressive discovery is mandatory.**
Premise 1: A protocol's job is moving bytes between client and server — nothing more.
Premise 2: Context-window management is therefore the client's responsibility, not the protocol's.
Premise 3: The default client behavior today is to preload every tool definition; with large servers this blows the window.
Sub-conclusion: Complaints about "MCP doesn't scale" are misattributed client bugs.
Conclusion: Clients must adopt progressive discovery (tool-search / on-demand load). Claude Code's before/after context chart is the empirical existence proof — massive reduction from the same underlying servers.

**Why programmatic tool calling beats sequential calls.**
Premise 1: Sequential `call → observe → call` makes the model the orchestrator; every hop costs an inference round and is latency-bound.
Premise 2: Scripts compose tools cheaper than chat loops do — this is already how coding agents use bash.
Premise 3: MCP's structured output exposes return types, so a script can pipe tool outputs with type safety.
Conclusion: Replace sequential orchestration with a REPL + structured output. Same composition, fewer inference rounds, lower latency, better reliability.

**Why REST→MCP 1:1 is an anti-pattern.**
Premise 1: REST is designed for human/machine consumers with request/response semantics.
Premise 2: MCP's value-add is rich semantics on top of that: applications (UI), elicitations (structured input), tasks (long-running), skills-over-MCP (usage guidance).
Premise 3: A 1:1 converter preserves the REST surface and ignores all of (P2).
Conclusion: You end up paying MCP's protocol overhead for zero of its benefits — "cringe," as Parra puts it. Design from the agent's perspective instead; use the semantics MCP uniquely provides, or don't use MCP.

## Notable Commands / Code Snippets
No command-level snippets in the talk — it's conceptual. Key primitives to know:
- **Tool search / load-skills tool (client-side pattern):** expose a single meta-tool to the model; it calls `tool_search("<intent>")` and then `load_tool("<name>")` on demand. Available natively in the Anthropic API; buildable on other providers.
- **REPL tool (server or client side):** V8 isolate, MicroPython, or Lua interpreter. Hand the model MCP tool schemas + types, ask for a script, execute, return result.
- **Structured output (MCP feature):** server declares return-value types on tools; clients can compose tools as typed pipelines. Simulate with a cheap-model extraction pass if the server doesn't provide it.
- **Server-side execution environment example:** Cloudflare MCP server — ships a runtime, not a tool-per-endpoint.

## User Notes
Ingested in auto mode (no user focus points). Opus sub-agent selected the focus and wrote this summary. Selection rationale: the talk is a high-signal argumentative roadmap from MCP's creator/maintainer, and existing wiki pages already cover MCP basics, Tool Search, Programmatic Tool Calling, and Agent Skills — so the summary emphasizes what this talk *argues* about direction (the connectivity stack, the two mandatory client-side patterns, the June 2026 roadmap, the REST→MCP anti-pattern) rather than re-explaining primitives.

## Related Topics
mcp, protocol, agents, progressive-discovery, programmatic-tool-calling, skills, connectivity, anthropic, code-mode, structured-output, tool-search, mcp-applications, cross-app-access, server-discovery, stateless-transport
