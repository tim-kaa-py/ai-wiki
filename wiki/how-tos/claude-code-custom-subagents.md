---
title: "Claude Code Custom Subagents"
type: "how-to"
pillar: "building"
tags: [claude-code, subagents, agents, configuration, hooks, permissions, mcp, context-management, memory]
sources:
  - "summaries/2026-04-25_claude-code-docs_create-custom-subagents.md"
last_updated: "2026-04-25"
---

# Claude Code Custom Subagents

How to create and configure custom subagents in Claude Code. Subagents run in isolated context windows with their own system prompt, tool access, model, and permissions — the core use case is offloading verbose, self-contained tasks (test runs, doc fetches, log processing) so the main conversation stays clean.

## Why Subagents

A subagent does its work in a separate context window and returns only the summary to the main conversation. This is the cheapest way to "look something up" or "run the suite" without polluting the current thread. Claude 4.6 spawns subagents proactively; Claude 4.7 is the opposite — steer it the other direction with explicit guidance to fan out.

See [Claude Code](../tools/claude-code.md#prompting-for-claude-46-and-47) for model-specific tuning.

## Configuration: File-Based vs CLI vs Built-In

| Form | Where it lives | Lifetime |
|------|---------------|----------|
| **Project file** | `.claude/agents/<name>.md` (commit to git) | Project, all team members |
| **User file** | `~/.claude/agents/<name>.md` | All your projects |
| **CLI inline** | `claude --agents '{...}'` JSON | Session only |
| **Built-in** | `Explore`, `Plan`, `general-purpose` | Always available |

Use `claude agents` to list everything currently configured. Use `/agents` for guided creation inside a session.

## Minimal Subagent File

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices. Use proactively after code changes.
tools: Read, Glob, Grep
model: sonnet
---

You are a senior code reviewer. Read the diff, identify quality and security issues, and return a prioritized list.
```

Only `name` and `description` are required. The body is the system prompt.

## The `description` Field Is the Routing Key

Claude reads the `description` to decide *when* to delegate. Vague description, no delegation. Specific, situation-anchored description, automatic use.

- Bad: `"Helps with code review"`
- Good: `"Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code."`

Add the phrase **"use proactively"** to encourage automatic invocation.

## Frontmatter Reference

| Field | Purpose |
|-------|---------|
| `name` | Identifier (required) |
| `description` | Routing signal — when to delegate (required) |
| `tools` | Comma-list of allowed tool names (omit = inherit all) |
| `model` | `haiku`, `sonnet`, `opus`, `inherit`, or pinned model id |
| `permissionMode` | `default`, `acceptEdits`, `bypassPermissions`, `plan` |
| `mcpServers` | Inline MCP server defs scoped to this subagent only |
| `hooks` | `PreToolUse`, `PostToolUse`, etc. — same format as `settings.json` |
| `memory` | `user`, `project`, or `local` — persistent MEMORY.md |

## Model Resolution: 4-Level Priority

1. `CLAUDE_CODE_SUBAGENT_MODEL` env var (highest)
2. Per-invocation model parameter
3. Subagent `model` frontmatter
4. Main conversation model (default = `inherit`)

Rules of thumb:
- `haiku` — fast, cheap, read-only research/exploration agents
- `sonnet` — analysis, code review
- `inherit` (default) — agents that need the same capability as your main session

## Persistent Memory

The `memory` field gives a subagent a `MEMORY.md` it owns and updates over time. Three scopes:

| Scope | Path | Use |
|-------|------|-----|
| `user` | `~/.claude/memory/<agent>/` | All projects |
| `project` | `.claude/memory/<agent>/` (commit to git) | Team-shared institutional knowledge |
| `local` | `.claude/memory/<agent>/` (gitignored) | Per-machine notes |

The first **200 lines** of `MEMORY.md` auto-load into the subagent's context each invocation. Pattern: instruct the subagent to *update* its memory after each run with new patterns it observed. Compounds knowledge over time.

## Scope MCP Servers Per-Subagent

Define MCP servers inline in the subagent frontmatter and they connect **only when the subagent is active**. The main conversation never sees those tool descriptions — keeps parent context clean.

```yaml
mcpServers:
  playwright:
    command: npx
    args: ["@playwright/mcp"]
```

Use this for high-tool-count MCP servers (Playwright, large databases) rather than putting them in global `.mcp.json`.

## `PreToolUse` Hooks for Conditional Tool Validation

`tools: Bash` is binary. When you want *some* Bash commands but not others, attach a `PreToolUse` hook that reads the command from stdin JSON and exits 2 to block.

Example: a `db-reader` subagent that allows `SELECT` but blocks writes:

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: ".claude/scripts/validate-readonly-query.sh"
```

The script inspects the command, exits 0 to allow, exits 2 to block.

## Permission Mode Notes

- `permissionMode: bypassPermissions` is powerful but **scoped**. Even in bypass, writes to `.git`, `.claude`, `.vscode`, `.idea`, `.husky` still prompt — except `.claude/commands`, `.claude/agents`, `.claude/skills`.
- The **parent's** `bypassPermissions` or `acceptEdits` takes precedence over subagent settings — you cannot make a subagent stricter than its parent.

See [Claude Code Permissions](claude-code-permissions.md).

## Forks vs Named Subagents

Two distinct mechanisms:

| | Named subagent | Forked subagent (experimental) |
|--|---------------|--------------------------------|
| Context | Fresh, no history | Inherits full conversation |
| Trigger | `description` match or explicit invocation | `/fork <directive>` |
| Cost | New prompt | Shares prompt cache (cheaper) |
| When | Independent task | Side task that needs session context |
| Env flag | — | `CLAUDE_CODE_FORK_SUBAGENT=1` |

Named: *"review this PR"*. Forked: *"draft tests for the parser changes so far."*

## Subagents Cannot Spawn Subagents

A subagent cannot delegate to another subagent. Two workarounds:

1. **Skills** — run in main conversation context, can be invoked from anywhere
2. **Sequential chaining** — orchestrate the chain from the main conversation

## Disabling Specific Subagents

In `settings.json`:

```json
{
  "permissions": {
    "deny": ["Agent(Explore)", "Agent(my-custom-agent)"]
  }
}
```

## Launching as a Specific Subagent

```bash
claude --agent code-reviewer
```

Replaces the default system prompt — the entire session runs as that subagent.

## Common Patterns

| Use case | `model` | `tools` | Notes |
|----------|---------|---------|-------|
| Code reviewer | `sonnet` | `Read, Glob, Grep` | Add `description` triggering on "after code changes" |
| Doc fetcher | `haiku` | `WebFetch, Read` | Cheap, read-only |
| Test runner | `inherit` | `Bash(bun run test:*), Read` | Returns failures only |
| Browser tester | `inherit` | inherit + `mcpServers: playwright` | Inline MCP keeps tool catalog out of parent |
| DB reader | `haiku` | `Bash` + `PreToolUse` hook | Hook validates read-only SQL |
| Build validator | `inherit` | `Bash, Read` | Boris Cherny pattern — runs before commit |

Boris Cherny's personal set: `build-validator.md`, `code-architect.md`, `code-simplifier.md`, `oncall-guide.md`, `verify-app.md`. Each fires at a consistent point in the workflow.

## Related Pages

- [Claude Code](../tools/claude-code.md) — the tool
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) — the hooks system subagents reuse
- [Claude Code Permissions](claude-code-permissions.md) — permission modes and allowlists
- [Claude Code Skills](claude-code-skills.md) — when to use skills instead of subagents
- [Claude Code Plugins](claude-code-plugins.md) — packaging subagents for distribution
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) — when subagent-driven orchestration helps and when it hurts
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — orchestrator-worker and lock-file teams
- [Agent Orchestration Patterns](../concepts/agent-orchestration-patterns.md) — Anthropic's five canonical workflows
