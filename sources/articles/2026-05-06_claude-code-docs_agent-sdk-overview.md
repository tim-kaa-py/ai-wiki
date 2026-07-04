---
title: "Agent SDK overview"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/agent-sdk/overview"
pillar: "building"
tags: [agent-sdk, claude-code, python, typescript, agents, tools, mcp, subagents, permissions, sessions, production]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Agent SDK overview

> Build production AI agents with Claude Code as a library.

The Claude Agent SDK (formerly Claude Code SDK) gives you the same tools, agent loop, and context management that power Claude Code, programmable in Python and TypeScript.

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Find and fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude reads the file, finds the bug, edits it
```

## Installation

```bash
npm install @anthropic-ai/claude-agent-sdk   # TypeScript (bundles native Claude Code binary)
pip install claude-agent-sdk                  # Python
```

## Built-in tools

| Tool | What it does |
|---|---|
| **Read** | Read any file in the working directory |
| **Write** | Create new files |
| **Edit** | Make precise edits to existing files |
| **Bash** | Run terminal commands, scripts, git operations |
| **Monitor** | Watch a background script and react to each output line |
| **Glob** | Find files by pattern (`**/*.ts`, `src/**/*.py`) |
| **Grep** | Search file contents with regex |
| **WebSearch** | Search the web for current information |
| **WebFetch** | Fetch and parse web page content |
| **AskUserQuestion** | Ask the user clarifying questions with multiple choice options |

## Key capabilities

### Hooks
Run custom code at key points in the agent lifecycle. Available hooks: `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, and more.

```python
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

options=ClaudeAgentOptions(
    hooks={
        "PostToolUse": [HookMatcher(matcher="Edit|Write", hooks=[log_file_change])]
    }
)
```

### Subagents
Spawn specialized agents for focused subtasks. Include `Agent` in `allowedTools`:

```python
options=ClaudeAgentOptions(
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

### MCP
Connect to external systems via Model Context Protocol: databases, browsers, APIs, hundreds of servers.

```python
options=ClaudeAgentOptions(
    mcp_servers={
        "playwright": {"command": "npx", "args": ["@playwright/mcp@latest"]}
    }
)
```

### Sessions
Maintain context across multiple exchanges. Capture session ID, then resume or fork.

```python
# Capture session ID
async for message in query(prompt="Analyze the auth module", options=...):
    if isinstance(message, SystemMessage) and message.subtype == "init":
        session_id = message.data["session_id"]

# Resume with full context
async for message in query(
    prompt="Now refactor it to use JWT",
    options=ClaudeAgentOptions(resume=session_id)
):
    ...
```

### Claude Code features in the SDK

The SDK loads these from `.claude/` in your working directory and `~/.claude/`:

| Feature | Description | Location |
|---|---|---|
| Skills | Specialized capabilities in Markdown | `.claude/skills/*/SKILL.md` |
| Slash commands | Custom commands for common tasks | `.claude/commands/*.md` |
| Memory | Project context and instructions | `CLAUDE.md` or `.claude/CLAUDE.md` |
| Plugins | Extend with custom commands, agents, MCP servers | Programmatic via `plugins` option |

## How Agent SDK compares

### vs Anthropic Client SDK
Client SDK: you implement the tool loop yourself. Agent SDK: Claude handles tool execution autonomously.

### vs Claude Code CLI
Same capabilities, different interface:

| Use case | Best choice |
|---|---|
| Interactive development | CLI |
| CI/CD pipelines | SDK |
| Custom applications | SDK |
| Production automation | SDK |

Many teams use both: CLI for daily development, SDK for production.

### vs Managed Agents

|  | Agent SDK | Managed Agents |
|---|---|---|
| **Runs in** | Your process, your infrastructure | Anthropic-managed infrastructure |
| **Interface** | Python or TypeScript library | REST API |
| **Agent works on** | Files on your infrastructure | A managed sandbox per session |
| **Best for** | Local prototyping, agents that work on your filesystem | Production agents without operating sandbox infrastructure |

Common path: prototype with Agent SDK locally, then move to Managed Agents for production.
