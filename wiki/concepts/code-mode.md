---
title: "Code Mode"
type: "concept"
description: "The pattern of giving a model one execute-style tool in which its other tools are functions, so tool results are chained in code instead of passing through the context window; in Claude Code an experimental persistent JavaScript REPL that wraps every harness tool"
pillar: "building"
tags: [claude-code, agents, mcp, code-execution, programmatic-tool-calling, context-management, architecture]
sources:
  - "summaries/2026-11-16_ray-amjad_code-mode-is-claude-codes-biggest-harness-change-yet.md"
timestamp: "2026-11-18"
---

# Code Mode

Instead of the model calling tools one at a time, with every result landing in the context window and being reread on each later call, it gets an execute-style tool and **writes code in which the tools are functions**. Results pass directly from one tool to the next and only the distilled output returns to the model [01:45-02:47]. Ray Amjad frames Claude Code's version as "the model swallowing the harness." *(Source: Ray Amjad, 2026-11-16)*

The premise is two-part: every intermediate result in a tool loop is context spent and reread (even cached at 10% of the normal rate, those tokens are wasted) [01:40-01:59], and models are already good at writing code [02:31-02:42]. Anthropic's own versions of the same idea, [Code Execution with MCP](mcp.md#code-execution-with-mcp) and [Programmatic Tool Calling](mcp.md#programmatic-tool-calling), predate it.

## Server-Side vs Client-Side

| | Server-side (Cloudflare) | Client-side (Claude Code) |
|--|--------------------------|---------------------------|
| Where code runs | The provider's sandbox | The local harness |
| Scope | One MCP server | Every harness tool: Read, Edit, Bash, WebFetch, MCP calls, and harness-level tools such as subagents |
| State | Per execution | Persists across calls for the whole session |

Cloudflare popularised the idea for MCP: its own server went from **2,600 tools costing 1.1M tokens to two tools (search, execute) costing about 1,000** [02:47-03:16]. Claude Code's version extends it from MCP to the whole harness [05:25-05:45], [07:03-07:15].

## Claude Code's Implementation (experimental)

With Code Mode on, Claude has only two tools:

- **REPL** — a JavaScript console that **stays open for the whole session** [06:58-07:08]. A variable defined in one call can be looped over and filtered in a later one, which server-side Code Mode cannot do [07:15-07:30]. Typical uses: loop over hundreds of files, run tool calls in parallel, deduplicate and filter rows before anything enters context; assign a bloated MCP response to a variable, preview a slice, keep working on it [07:34-08:07].
- **Poll** — long-running REPL scripts detach into the background; Claude checks on them with Poll [08:21-08:35].

Setup (requires Claude Code 2.1.323 or later, per the video description; docs at <https://code.claude.com/docs/en/code-mode>):

```bash
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
```

- Code Mode refused to enable until a mod using Claude Code hooks was disabled; disable such mods or plugins first [05:45-06:52].
- Ask "what tools do you have?": the answer should be only REPL and Poll.
- Press **Ctrl+O** to see the JavaScript Claude writes into the REPL, and check that it writes code rather than calling tools one by one [06:26-06:52].

## When to Use It

- **MCP-heavy or data-wrangling tasks**, e.g. combining two MCP data sources into a report [06:26-06:52].
- **Badly designed MCP servers that return far too much**: the result goes into a variable, not the context. When an MCP tool floods context, ask Claude to store the result in a REPL variable and preview only what it needs [07:53-08:07].
- **Not replaceable by a bash script.** Bash can chain commands but cannot reach harness-level tools such as MCP servers or subagent spawning; the REPL can [08:07-08:21]. This is the gap between Code Mode and the "CLI writes the script once" argument in [MCP vs CLI](../comparisons/mcp-vs-cli.md#token-economics-detail).

## Reported Results (unverified)

- **Creator's own test:** runs with and without Code Mode on real open-source issues used about half the input tokens and 71% of the total cost, roughly 30% cheaper [08:35-08:55]. One informal experiment from when the feature first appeared in the binary; no methodology shown.
- **Relayed claims:** BrowserUse reportedly deleted about 90% of its library so its agent writes a Python REPL against the raw Chrome DevTools protocol, claimed up to 50% better and 2-5x cheaper and faster [08:58-09:15]. Someone giving Opus 5.5 a single Python REPL reportedly scored 71% on TerminalBench versus 65% for normal Claude Code, at slightly lower cost per task [09:15-09:32]. Both are the creator relaying others' claims.

## Unreleased Context Functions (speculation)

Three functions, **spawn context**, **list contexts** and **release context**, appeared in the binary alongside Code Mode but are **not released**; what they do is Amjad's inference [10:08-10:23]. His reading: subagents become "contexts" that code can trigger and combine, so code can coordinate more subagents without filling the main window. He adds that a spawned context could **fork the main conversation** (e.g. try 5-10 speed-up approaches and return the best 3) [10:42-11:02], and that spawned agents could **message the coordinator** [11:02-11:10]. He compares this to [Dynamic Workflows](dynamic-workflows.md) and guesses the two mechanisms may later merge [11:10-11:19]; that page sets these differences against Cherny's "shared context" framing ([Workflows vs Loops vs Routines](dynamic-workflows.md#workflows-vs-loops-vs-routines)).

These functions would supply the second of three ingredients of a [Recursive Language Model](recursive-language-models.md), which is where Amjad sees Code Mode heading.

## Related Pages

- [MCP](mcp.md) — code execution with MCP and programmatic tool calling, the API-side precursors
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — the token-economics argument Code Mode partly answers for MCP
- [Recursive Language Models](recursive-language-models.md) — the forward-looking frame: persistent REPL + programmable subagents + prompt as a variable
- [Context Engineering](context-engineering.md) — keeping intermediate results out of the window
- [Harness Engineering](harness-engineering.md) — Code Mode as a harness rewrite
- [Dynamic Workflows](dynamic-workflows.md) — the existing code-orchestrated subagent primitive
- [Claude Code](../tools/claude-code.md)
