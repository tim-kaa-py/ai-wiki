---
title: "Claude Agent SDK"
type: "tool"
pillar: "building"
tags: [agent-sdk, claude-code, python, typescript, agents, tools, mcp, subagents, sessions, production, hooks]
sources:
  - "summaries/2026-05-06_claude-code-docs_agent-sdk-overview.md"
  - "summaries/2026-05-06_claude-code-docs_agent-sdk-sessions.md"
timestamp: "2026-05-06"
---

# Claude Agent SDK

The Claude Agent SDK (formerly Claude Code SDK) exposes the same tools, agent loop, and context management that power Claude Code as a programmable library in Python and TypeScript. It is the bridge between interactive CLI use and production automation: same capabilities, different interface. Use the CLI for daily development; use the Agent SDK for CI/CD pipelines, custom applications, and automation that needs to run without a human terminal.

## Distinction from Other Anthropic SDKs

| Surface | What it is | Tool loop |
|---------|-----------|-----------|
| **Claude Agent SDK** | Library that exposes Claude Code's harness — tools, hooks, MCP, subagents, skills, plugins | Claude executes tools autonomously |
| **Anthropic Client SDK** | Raw API client for the model | You implement the tool loop yourself |
| **Claude Code CLI** | Interactive terminal harness | Claude executes tools autonomously |
| **Managed Agents** | Anthropic-hosted sandbox per session | Anthropic owns the loop and the infra |

The Agent SDK runs on **your infrastructure** with full filesystem access. [Claude Managed Agents](claude-managed-agents.md) run in **Anthropic's sandbox** per session via REST API. The common path: prototype locally with Agent SDK, then move to Managed Agents for production when you want to offload the sandbox.

## Built-in Tools (10)

`Read`, `Write`, `Edit`, `Bash`, `Monitor`, `Glob`, `Grep`, `WebSearch`, `WebFetch`, `AskUserQuestion`. Whitelist per-session with `allowed_tools`. The `Bash` tool alone covers most shell automation needs.

**Discipline:** always specify `allowed_tools` explicitly in production. Don't give an agent more tool surface than the task requires.

## Hooks: Same Event Model as the CLI

`PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, and more — same names, same JSON output protocol as the [Hooks Guide](../how-tos/claude-code-hooks-memory.md). The SDK adds `HookMatcher` for scoping hooks to specific tool events. Implement audit logging, cost tracking, or policy enforcement as in-process hooks; they integrate with your existing observability stack.

```python
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

options = ClaudeAgentOptions(
    hooks={"PostToolUse": [HookMatcher(matcher="Edit|Write", hooks=[log_file_change])]}
)
```

## Custom Subagents via `AgentDefinition`

Define specialized agents with a description, system prompt, and tool allowlist. Include `"Agent"` in `allowed_tools` to let the main agent spawn them. The `description` field is what Claude reads to decide when to delegate — same routing-key principle as [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md).

```python
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep", "Agent"],
    agents={
        "code-reviewer": AgentDefinition(
            description="Expert code reviewer for quality and security reviews.",
            prompt="Analyze code quality and suggest improvements.",
            tools=["Read", "Glob", "Grep"],
        )
    }
)
```

## MCP Integration

Pass server configs via `mcp_servers`. Standard format: `{"server-name": {"command": "...", "args": [...]}}`. Playwright, database connectors, Slack bots — same integration pattern as the CLI.

## Loads Claude Code Features from `.claude/`

Skills in `.claude/skills/*/SKILL.md`, slash commands in `.claude/commands/*.md`, memory in `CLAUDE.md` or `.claude/CLAUDE.md`, plugins via the `plugins` option. The same project directory structure works for both CLI and SDK sessions — your skill library is automatically available to SDK agents running in the same project.

## Sessions

Sessions in the Agent SDK are the **persisted conversation history** written to disk as JSONL files — not filesystem state. Three usage patterns:

| Pattern | When | Mechanism |
|---------|------|-----------|
| **Continue** | Multi-turn in one process; resume most recent | `ClaudeSDKClient` (Python) / `continue: true` (TypeScript) |
| **Resume** | Multi-user — one session per user | Capture session ID from `ResultMessage`, pass via `resume=` |
| **Fork** | Explore alternatives without losing the original | `fork_session=True` — creates a new session from a copy of history |

### Sessions Persist Conversation, Not Filesystem

The JSONL file captures every prompt, tool call, tool result, and response. It does **not** snapshot file changes. To revert file changes across sessions, use file checkpointing — a separate mechanism. Never assume that resuming a session restores file state.

### Storage Layout and the cwd Gotcha

Sessions are stored under `~/.claude/projects/<encoded-cwd>/` — the directory name is the absolute cwd path with non-alphanumeric chars replaced by `-`. **Mismatched `cwd` is the most common cause** of a resume returning a fresh session instead of the one you expected. In production, always set cwd explicitly.

### Forking Branches Conversation, Not Filesystem

If a forked agent edits files, those changes are real and affect the shared filesystem. For true isolation, run each fork in a separate git worktree or branch. Use forking for A/B exploration: "implement with JWT" vs "implement with OAuth2" — run both in parallel and compare before committing.

### Cross-Host Session Handling

Sessions are local JSONL files. Two options for distributed systems:
1. Move `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl` to the same path on the new host.
2. Capture key results as application state and pass into a fresh session — usually more robust at scale.

## Installation

```bash
pip install claude-agent-sdk                 # Python
npm install @anthropic-ai/claude-agent-sdk   # TypeScript (bundles native Claude Code binary)
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Find and fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)
```

## When to Use the Agent SDK

| Scenario | Use |
|----------|-----|
| CI/CD pipeline that needs Claude tools | Agent SDK |
| Custom production app with full filesystem access | Agent SDK |
| Multi-user web app (one session per user) | Agent SDK with explicit session IDs |
| Daily interactive coding | Claude Code CLI |
| Want to offload sandbox infrastructure | [Claude Managed Agents](claude-managed-agents.md) |
| Background hook processing in a memory pipeline | Agent SDK as background process (see [Hooks for Memory](../how-tos/claude-code-hooks-memory.md)) |

## Related Pages

- [Claude Code](claude-code.md) — the CLI version of the same harness
- [Claude Managed Agents](claude-managed-agents.md) — production path that offloads sandbox infra
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — same `description`-as-routing-key principle
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — hook event model the SDK reuses
- [Agent Skills](../concepts/agent-skills.md) — skills from `.claude/skills/` work in the SDK too
- [Harness Engineering](../concepts/harness-engineering.md) — the discipline this SDK exposes programmatically
