---
title: "Create custom subagents"
type: "article"
channel: "Anthropic / Claude Code Docs"
date: "2026-04-25"
resource: "https://code.claude.com/docs/en/sub-agents"
pillar: "building"
tags: [claude-code, subagents, agents, configuration, how-to, reference, hooks, permissions, mcp, context-management]
timestamp: "2026-04-25"
extraction_method: "web-fetch"
---

# Create custom subagents

> Create and use specialized AI subagents in Claude Code for task-specific workflows and improved context management.

Subagents are specialized AI assistants that handle specific types of tasks. Use one when a side task would flood your main conversation with search results, logs, or file contents you won't reference again: the subagent does that work in its own context and returns only the summary. Define a custom subagent when you keep spawning the same kind of worker with the same instructions.

Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions. When Claude encounters a task that matches a subagent's description, it delegates to that subagent, which works independently and returns results. To see the context savings in practice, the [context window visualization](/en/context-window) walks through a session where a subagent handles research in its own separate window.

> If you need multiple agents working in parallel and communicating with each other, see [agent teams](/en/agent-teams) instead. Subagents work within a single session; agent teams coordinate across separate sessions.

Subagents help you:

* **Preserve context** by keeping exploration and implementation out of your main conversation
* **Enforce constraints** by limiting which tools a subagent can use
* **Reuse configurations** across projects with user-level subagents
* **Specialize behavior** with focused system prompts for specific domains
* **Control costs** by routing tasks to faster, cheaper models like Haiku

Claude uses each subagent's description to decide when to delegate tasks. When you create a subagent, write a clear description so Claude knows when to use it.

Claude Code includes several built-in subagents like **Explore**, **Plan**, and **general-purpose**. You can also create custom subagents to handle specific tasks.

## Built-in subagents

Claude Code includes built-in subagents that Claude automatically uses when appropriate. Each inherits the parent conversation's permissions with additional tool restrictions.

### Explore

A fast, read-only agent optimized for searching and analyzing codebases.

* **Model**: Haiku (fast, low-latency)
* **Tools**: Read-only tools (denied access to Write and Edit tools)
* **Purpose**: File discovery, code search, codebase exploration

Claude delegates to Explore when it needs to search or understand a codebase without making changes. This keeps exploration results out of your main conversation context.

When invoking Explore, Claude specifies a thoroughness level: **quick** for targeted lookups, **medium** for balanced exploration, or **very thorough** for comprehensive analysis.

### Plan

A research agent used during plan mode to gather context before presenting a plan.

* **Model**: Inherits from main conversation
* **Tools**: Read-only tools (denied access to Write and Edit tools)
* **Purpose**: Codebase research for planning

When you're in plan mode and Claude needs to understand your codebase, it delegates research to the Plan subagent. This prevents infinite nesting (subagents cannot spawn other subagents) while still gathering necessary context.

### General-purpose

A capable agent for complex, multi-step tasks that require both exploration and action.

* **Model**: Inherits from main conversation
* **Tools**: All tools
* **Purpose**: Complex research, multi-step operations, code modifications

Claude delegates to general-purpose when the task requires both exploration and modification, complex reasoning to interpret results, or multiple dependent steps.

### Other built-in agents

| Agent             | Model  | When Claude uses it                                      |
| :---------------- | :----- | :------------------------------------------------------- |
| statusline-setup  | Sonnet | When you run `/statusline` to configure your status line |
| Claude Code Guide | Haiku  | When you ask questions about Claude Code features        |

## Quickstart: create your first subagent

Subagents are defined in Markdown files with YAML frontmatter. You can create them manually or use the `/agents` command.

### Steps using /agents

1. In Claude Code, run: `/agents`
2. Switch to the **Library** tab, select **Create new agent**, then choose **Personal** (saves to `~/.claude/agents/`) or **Project** (saves to `.claude/agents/`).
3. Select **Generate with Claude** and describe the subagent.
4. Select tools (e.g., read-only for a reviewer).
5. Choose a model.
6. Choose a color for identification in the UI.
7. Configure memory scope (`user`, `project`, or none).
8. Press `s` or `Enter` to save, or `e` to save and edit.

## Configure subagents

### Use the /agents command

The `/agents` command opens a tabbed interface for managing subagents. The **Running** tab shows live subagents. The **Library** tab lets you view, create, edit, and delete subagents.

To list all configured subagents from the command line:

```bash
claude agents
```

### Choose the subagent scope

| Location                     | Scope                   | Priority    |
| :--------------------------- | :---------------------- | :---------- |
| Managed settings             | Organization-wide       | 1 (highest) |
| `--agents` CLI flag          | Current session         | 2           |
| `.claude/agents/`            | Current project         | 3           |
| `~/.claude/agents/`          | All your projects       | 4           |
| Plugin's `agents/` directory | Where plugin is enabled | 5 (lowest)  |

**Project subagents** (`.claude/agents/`) are ideal for subagents specific to a codebase. Check them into version control so your team can use and improve them collaboratively.

**CLI-defined subagents** are passed as JSON when launching Claude Code. They exist only for that session:

```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

### Write subagent files

Subagent files use YAML frontmatter for configuration, followed by the system prompt in Markdown:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

**Note:** Subagents are loaded at session start. If you create a subagent by manually adding a file, restart your session or use `/agents` to load it immediately.

The frontmatter defines the subagent's metadata and configuration. The body becomes the system prompt. Subagents receive only this system prompt (plus basic environment details like working directory), not the full Claude Code system prompt.

A subagent starts in the main conversation's current working directory. `cd` commands do not persist between Bash calls.

### Supported frontmatter fields

| Field             | Required | Description                                                                                                          |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| `name`            | Yes      | Unique identifier using lowercase letters and hyphens                                                                |
| `description`     | Yes      | When Claude should delegate to this subagent                                                                         |
| `tools`           | No       | Tools the subagent can use. Inherits all tools if omitted                                                            |
| `disallowedTools` | No       | Tools to deny, removed from inherited or specified list                                                              |
| `model`           | No       | `sonnet`, `opus`, `haiku`, a full model ID, or `inherit`. Defaults to `inherit`                                      |
| `permissionMode`  | No       | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan`                                          |
| `maxTurns`        | No       | Maximum number of agentic turns before the subagent stops                                                            |
| `skills`          | No       | Skills to load into the subagent's context at startup (full content injected)                                        |
| `mcpServers`      | No       | MCP servers available to this subagent (inline definitions or string references)                                     |
| `hooks`           | No       | Lifecycle hooks scoped to this subagent                                                                              |
| `memory`          | No       | Persistent memory scope: `user`, `project`, or `local`                                                               |
| `background`      | No       | Set to `true` to always run as a background task. Default: `false`                                                   |
| `effort`          | No       | Effort level override: `low`, `medium`, `high`, `xhigh`, `max`                                                       |
| `isolation`       | No       | Set to `worktree` to run in a temporary git worktree                                                                 |
| `color`           | No       | Display color: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`                               |
| `initialPrompt`   | No       | Auto-submitted as the first user turn when this agent runs as the main session agent                                 |

### Choose a model

Claude Code resolves the subagent's model in this order:

1. `CLAUDE_CODE_SUBAGENT_MODEL` environment variable
2. Per-invocation `model` parameter
3. Subagent definition's `model` frontmatter
4. Main conversation's model

### Control subagent capabilities

#### Tool access

To restrict tools, use either the `tools` field (allowlist) or the `disallowedTools` field (denylist):

```yaml
# Allowlist — only these tools
---
name: safe-researcher
tools: Read, Grep, Glob, Bash
---

# Denylist — everything except Write and Edit
---
name: no-writes
disallowedTools: Write, Edit
---
```

If both are set, `disallowedTools` is applied first, then `tools` is resolved against the remaining pool.

#### Restrict which subagents can be spawned

When an agent runs as the main thread with `claude --agent`, use `Agent(agent_type)` syntax in the `tools` field to allowlist specific subagents it can spawn:

```yaml
tools: Agent(worker, researcher), Read, Bash
```

To allow spawning any subagent: `tools: Agent, Read, Bash`. If `Agent` is omitted entirely, the agent cannot spawn any subagents.

> Note: In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references still work as aliases.

#### Scope MCP servers to a subagent

```yaml
---
name: browser-tester
mcpServers:
  # Inline definition: scoped to this subagent only
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  # Reference by name: reuses an already-configured server
  - github
---
```

To keep an MCP server out of the main conversation entirely, define it inline here rather than in `.mcp.json`.

#### Permission modes

| Mode                | Behavior                                                                              |
| :------------------ | :------------------------------------------------------------------------------------ |
| `default`           | Standard permission checking with prompts                                             |
| `acceptEdits`       | Auto-accept file edits and common filesystem commands                                 |
| `auto`              | Background classifier reviews commands                                                |
| `dontAsk`           | Auto-deny permission prompts (explicitly allowed tools still work)                   |
| `bypassPermissions` | Skip permission prompts                                                               |
| `plan`              | Plan mode (read-only exploration)                                                     |

**Warning:** Use `bypassPermissions` with caution. Writes to `.git`, `.claude`, `.vscode`, `.idea`, and `.husky` directories still prompt for confirmation.

If the parent uses `bypassPermissions` or `acceptEdits`, this takes precedence and cannot be overridden.

#### Preload skills into subagents

```yaml
---
name: api-developer
skills:
  - api-conventions
  - error-handling-patterns
---
```

The full content of each skill is injected into the subagent's context at startup. Subagents don't inherit skills from the parent conversation.

#### Enable persistent memory

```yaml
---
name: code-reviewer
memory: user
---
```

| Scope     | Location                                      | Use when                                              |
| :-------- | :-------------------------------------------- | :---------------------------------------------------- |
| `user`    | `~/.claude/agent-memory/<name-of-agent>/`     | Learning should apply across all projects             |
| `project` | `.claude/agent-memory/<name-of-agent>/`       | Project-specific knowledge, shareable via version control |
| `local`   | `.claude/agent-memory-local/<name-of-agent>/` | Project-specific but not checked into version control |

When memory is enabled, the first 200 lines or 25KB of `MEMORY.md` in the memory directory is loaded into the subagent's context.

#### Conditional rules with hooks

For dynamic control over tool usage, use `PreToolUse` hooks:

```yaml
---
name: db-reader
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

The validation script reads JSON from stdin and exits with code 2 to block operations:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b' > /dev/null; then
  echo "Blocked: Only SELECT queries are allowed" >&2
  exit 2
fi

exit 0
```

#### Disable specific subagents

```json
{
  "permissions": {
    "deny": ["Agent(Explore)", "Agent(my-custom-agent)"]
  }
}
```

Or via CLI: `claude --disallowedTools "Agent(Explore)"`

### Define hooks for subagents

Two ways to configure hooks:

1. **In the subagent's frontmatter** — runs only while that subagent is active
2. **In `settings.json`** — responds to subagent lifecycle events in the main session

#### Hooks in subagent frontmatter

All hook events are supported. Common events:

| Event         | When it fires                                                       |
| :------------ | :------------------------------------------------------------------ |
| `PreToolUse`  | Before the subagent uses a tool                                     |
| `PostToolUse` | After the subagent uses a tool                                      |
| `Stop`        | When the subagent finishes (converted to `SubagentStop` at runtime) |

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh $TOOL_INPUT"
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
```

#### Project-level hooks for subagent lifecycle events

```json
{
  "hooks": {
    "SubagentStart": [
      {
        "matcher": "db-agent",
        "hooks": [{ "type": "command", "command": "./scripts/setup-db-connection.sh" }]
      }
    ],
    "SubagentStop": [
      {
        "hooks": [{ "type": "command", "command": "./scripts/cleanup-db-connection.sh" }]
      }
    ]
  }
}
```

## Work with subagents

### Understand automatic delegation

Claude automatically delegates tasks based on the task description in your request, the `description` field in subagent configurations, and current context. Include "use proactively" in your subagent's description to encourage proactive delegation.

### Invoke subagents explicitly

Three patterns for explicit invocation:

* **Natural language**: name the subagent in your prompt
* **@-mention**: guarantees the subagent runs for one task (`@"code-reviewer (agent)" look at the auth changes`)
* **Session-wide**: `claude --agent code-reviewer` — replaces the default system prompt entirely for the session

To set as default for every session in a project:

```json
{
  "agent": "code-reviewer"
}
```

Plugin subagents: `claude --agent <plugin-name>:<agent-name>`

### Run subagents in foreground or background

* **Foreground**: blocks the main conversation until complete. Permission prompts pass through.
* **Background**: runs concurrently. Permissions pre-approved before launch; auto-denied anything not pre-approved.

If a background subagent fails due to missing permissions, start a new foreground subagent to retry.

Controls: ask Claude to "run this in the background", or press **Ctrl+B** to background a running task.

To disable all background tasks: `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`

### Common patterns

#### Isolate high-volume operations

```
Use a subagent to run the test suite and report only the failing tests with their error messages
```

#### Run parallel research

```
Research the authentication, database, and API modules in parallel using separate subagents
```

#### Chain subagents

```
Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them
```

### Choose between subagents and main conversation

**Use main conversation when:**
* Frequent back-and-forth or iterative refinement
* Multiple phases share significant context
* Quick, targeted change
* Latency matters (subagents start fresh)

**Use subagents when:**
* Task produces verbose output you don't need in main context
* You want to enforce specific tool restrictions
* Work is self-contained and can return a summary

Consider **Skills** instead when you want reusable prompts/workflows that run in the main conversation context.

For quick questions already in your conversation, use `/btw` — no tool access, answer discarded from history.

**Note:** Subagents cannot spawn other subagents. Use Skills or chain subagents from the main conversation for nested delegation.

### Manage subagent context

#### Resume subagents

Each subagent invocation creates a new instance with fresh context. To continue an existing subagent's work, ask Claude to resume it — the subagent retains its full conversation history.

Claude uses `SendMessage` with the agent's ID to resume. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

Subagent transcripts are stored at: `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`

#### Auto-compaction

Subagents support automatic compaction using the same logic as the main conversation (default: ~95% capacity). Override with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.

## Fork the current conversation

**Experimental** — requires Claude Code v2.1.117+. Enable with `CLAUDE_CODE_FORK_SUBAGENT=1`.

A fork is a subagent that inherits the entire conversation so far instead of starting fresh. Use a fork when a named subagent would need too much background to be useful, or when you want to try several approaches in parallel from the same starting point.

When fork mode is enabled:
* Claude spawns a fork whenever it would otherwise use the general-purpose subagent
* Every subagent spawn runs in the background
* `/fork` spawns a fork instead of acting as an alias for `/branch`

```
/fork draft unit tests for the parser changes so far
```

### Forks vs named subagents

|                         | Fork                             | Named subagent                         |
| :---------------------- | :------------------------------- | :------------------------------------- |
| Context                 | Full conversation history        | Fresh context                          |
| System prompt and tools | Same as main session             | From the subagent's definition file    |
| Model                   | Same as main session             | From the subagent's `model` field      |
| Prompt cache            | Shared with main session (cheaper) | Separate cache                       |

**Limitations:** Fork mode works only in interactive sessions. Disabled in non-interactive/headless mode and Agent SDK. A fork cannot spawn further forks.

## Example subagents

### Code reviewer

```markdown
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is clear and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

### Debugger

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not the symptoms.
```

### Data scientist

```markdown
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks and queries.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries
3. Use BigQuery command line tools (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly
```

### Database query validator

```markdown
---
name: db-reader
description: Execute read-only database queries. Use when analyzing data or generating reports.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---

You are a database analyst with read-only access. Execute SELECT queries to answer questions about the data.
```
