---
title: "Agent SDK overview"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/agent-sdk/overview"
pillar: "building"
tags: [agent-sdk, claude-code, python, typescript, agents, tools, mcp, subagents, permissions, sessions, production]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_agent-sdk-overview.md"
---

# Agent SDK overview — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/agent-sdk/overview)

## TL;DR

The Claude Agent SDK (formerly Claude Code SDK) exposes the same tools, agent loop, and context management that power Claude Code as a programmable library in Python and TypeScript. It's the bridge between interactive CLI use and production automation — same capabilities, different interface. The primary comparison: Agent SDK runs in your infrastructure and works on your filesystem; Managed Agents run in Anthropic's sandbox infrastructure.

## Key Takeaways

1. **The Agent SDK gives you Claude Code as a library.** Same tools (Read, Edit, Bash, Glob, Grep, WebSearch, etc.), same agent loop, same hooks, same MCP integration — all programmable. The distinction from the Anthropic Client SDK: the Client SDK requires you to implement the tool loop yourself; the Agent SDK has Claude execute tools autonomously.
   - **How to apply:** Use Agent SDK for CI/CD pipelines, production automation, and custom applications. Use the CLI for interactive daily development. Many teams use both.

2. **Ten built-in tools available programmatically.** Read, Write, Edit, Bash, Monitor, Glob, Grep, WebSearch, WebFetch, AskUserQuestion. Whitelist per-session with `allowed_tools`. The Bash tool alone covers most shell automation needs.
   - **How to apply:** Always specify `allowed_tools` explicitly — don't give production agents more tool access than the task requires.

3. **Hooks work programmatically with the same event model.** `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, and more. Use `HookMatcher` to scope hooks to specific tool events.
   - **How to apply:** Implement audit logging, cost tracking, or policy enforcement as SDK hooks — these run in-process and integrate with your existing observability stack.

4. **Custom subagents via `AgentDefinition`.** Define specialized agents with a description, system prompt, and tool allowlist. Include `"Agent"` in `allowed_tools` to let the main agent spawn them. The `description` field is what Claude reads to decide when to use the subagent.
   - **How to apply:** Create domain-specific subagents (security-reviewer, test-writer) as AgentDefinition objects. Keep descriptions precise — they determine routing.

5. **MCP servers connect to external systems.** Pass server configs to `mcp_servers` in options. Standard format: `{"server-name": {"command": "...", "args": [...]}}`. Playwright, database connectors, Slack bots — all the same integration pattern.
   - **How to apply:** Connect your internal data sources to SDK agents via MCP rather than building custom tools.

6. **The SDK loads Claude Code features from `.claude/`.** Skills in `.claude/skills/*/SKILL.md`, slash commands in `.claude/commands/*.md`, memory in `CLAUDE.md` or `.claude/CLAUDE.md`, plugins via the `plugins` option. The same project directory structure works for both CLI and SDK sessions.
   - **How to apply:** Build your skill library once for the CLI — it's automatically available to SDK agents running in the same project directory.

7. **Prototype with Agent SDK, then move to Managed Agents for production.** Agent SDK runs on your infrastructure (full filesystem access, flexible but you manage the sandbox). Managed Agents run in Anthropic's sandbox per session (REST API, no local infra needed). Common path: local prototyping with Agent SDK → production with Managed Agents.
   - **How to apply:** Use Agent SDK when you need file system access or want to run on your own infrastructure. Use Managed Agents when you want to offload sandbox infrastructure.

## Notable Commands / Code Snippets

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Find and fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)
```

```bash
# Installation
pip install claude-agent-sdk           # Python
npm install @anthropic-ai/claude-agent-sdk  # TypeScript (bundles native Claude Code binary)
```

```python
# PostToolUse hook for audit logging
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

options = ClaudeAgentOptions(
    hooks={
        "PostToolUse": [HookMatcher(matcher="Edit|Write", hooks=[log_file_change])]
    }
)
```

```python
# Custom subagent definition
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

## Related Topics

agent-sdk, claude-code, python, typescript, agents, tools, mcp, subagents, permissions, sessions, production
