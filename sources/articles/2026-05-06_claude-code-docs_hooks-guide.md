---
title: "Automate workflows with hooks (Claude Code)"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/hooks-guide"
pillar: "building"
tags: [claude-code, hooks, automation, workflow, settings, json, shell, notifications, formatting, permissions, compaction]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Automate workflows with hooks

> Run shell commands automatically when Claude Code edits files, finishes tasks, or needs input. Format code, send notifications, validate commands, and enforce project rules.

Hooks are user-defined shell commands that execute at specific points in Claude Code's lifecycle. They provide **deterministic control** over Claude Code's behavior, ensuring certain actions always happen rather than relying on the LLM to choose to run them. Use hooks to enforce project rules, automate repetitive tasks, and integrate Claude Code with your existing tools.

For judgment-based decisions (not purely deterministic), you can also use prompt-based hooks or agent-based hooks that use a Claude model to evaluate conditions.

## Set up your first hook

Add a `hooks` block to a settings file. Example: desktop notification hook.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Use `/hooks` to browse configured hooks grouped by event (read-only — edit settings JSON directly to modify).

## Common patterns

### Get notified when Claude needs input

Fires on the `Notification` event (when Claude is waiting for input or permission).

**macOS:**
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [{"type": "command", "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"}]
      }
    ]
  }
}
```

**Linux:** `"command": "notify-send 'Claude Code' 'Claude Code needs your attention'"`

**Windows (PowerShell):**
```json
"command": "powershell.exe -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')\""
```

Notification matchers: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`, `elicitation_complete`, `elicitation_response`. Empty matcher fires on all.

### Auto-format code after edits

`PostToolUse` with `Edit|Write` matcher. Requires `jq`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

Note: Claude can also create/modify files via `Bash` commands. If your hook must see every file change, add a `Stop` hook that scans the working tree once per turn.

### Block edits to protected files

`PreToolUse` with a script that exits 2 to block:

```bash
#!/bin/bash
# protect-files.sh
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

Register in `.claude/settings.json`:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

### Re-inject context after compaction

`SessionStart` hook with `compact` matcher. Any text written to stdout is added to Claude's context:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing. Current sprint: auth refactor.'"
          }
        ]
      }
    ]
  }
}
```

Replace `echo` with any dynamic command (e.g., `git log --oneline -5` for recent commits).

### Audit configuration changes

`ConfigChange` event fires when settings or skills files change:

```json
{
  "hooks": {
    "ConfigChange": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "jq -c '{timestamp: now | todate, source: .source, file: .file_path}' >> ~/claude-config-audit.log"
          }
        ]
      }
    ]
  }
}
```

Matcher values: `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills`.

### Reload environment when directory or files change

Pair `SessionStart` + `CwdChanged` to keep direnv variables current:

```json
{
  "hooks": {
    "SessionStart": [
      {"hooks": [{"type": "command", "command": "direnv export bash > \"$CLAUDE_ENV_FILE\""}]}
    ],
    "CwdChanged": [
      {"hooks": [{"type": "command", "command": "direnv export bash > \"$CLAUDE_ENV_FILE\""}]}
    ]
  }
}
```

`CLAUDE_ENV_FILE` is a script Claude Code runs as a preamble before each Bash command. To watch specific files:

```json
{
  "hooks": {
    "FileChanged": [
      {
        "matcher": ".envrc|.env",
        "hooks": [{"type": "command", "command": "direnv export bash > \"$CLAUDE_ENV_FILE\""}]
      }
    ]
  }
}
```

Note: `matcher` for `FileChanged` splits on `|` into literal filenames (not regex).

### Auto-approve specific permission prompts

`PermissionRequest` hook returns JSON to stdout (not exit codes):

```json
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "ExitPlanMode",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"hookSpecificOutput\": {\"hookEventName\": \"PermissionRequest\", \"decision\": {\"behavior\": \"allow\"}}}'"
          }
        ]
      }
    ]
  }
}
```

To also set permission mode:
```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow",
      "updatedPermissions": [
        {"type": "setMode", "mode": "acceptEdits", "destination": "session"}
      ]
    }
  }
}
```

**Keep matcher narrow** — matching `.*` or empty would auto-approve every permission prompt.

## Hook event reference

| Event | When it fires |
|---|---|
| `SessionStart` | Session begins or resumes (matcher: `startup`, `resume`, `clear`, `compact`) |
| `Setup` | With `--init-only` or `--init`/`--maintenance` in `-p` mode |
| `UserPromptSubmit` | When you submit a prompt, before Claude processes it |
| `UserPromptExpansion` | When a command expands into a prompt; can block the expansion |
| `PreToolUse` | Before a tool call executes; can block it |
| `PermissionRequest` | When a permission dialog appears |
| `PermissionDenied` | When a tool call is denied; return `{retry: true}` to let model retry |
| `PostToolUse` | After a tool call succeeds |
| `PostToolUseFailure` | After a tool call fails |
| `PostToolBatch` | After a full batch of parallel tool calls resolves |
| `Notification` | When Claude Code sends a notification |
| `SubagentStart` | When a subagent is spawned (matcher: agent type name) |
| `SubagentStop` | When a subagent finishes |
| `TaskCreated` | When a task is being created via TaskCreate |
| `TaskCompleted` | When a task is being marked as completed |
| `Stop` | When Claude finishes responding |
| `StopFailure` | When turn ends due to API error |
| `TeammateIdle` | When an agent team teammate is about to go idle |
| `InstructionsLoaded` | When a CLAUDE.md or rules file is loaded into context |
| `ConfigChange` | When a configuration file changes during a session |
| `CwdChanged` | When working directory changes |
| `FileChanged` | When a watched file changes on disk |
| `WorktreeCreate` | When a worktree is being created |
| `WorktreeRemove` | When a worktree is being removed |
| `PreCompact` | Before context compaction |
| `PostCompact` | After context compaction completes |
| `Elicitation` | When an MCP server requests user input |
| `ElicitationResult` | After user responds to MCP elicitation |
| `SessionEnd` | When a session terminates |

When multiple hooks match, Claude Code picks the **most restrictive** answer. `deny` cancels regardless of others; `ask` forces the permission prompt even if others return `allow`. `additionalContext` is combined from all hooks.

## Hook types

| Type | Description |
|---|---|
| `"type": "command"` | Run a shell command (most common) |
| `"type": "http"` | POST event data to a URL; response uses same JSON format |
| `"type": "mcp_tool"` | Call a tool on a connected MCP server |
| `"type": "prompt"` | Single-turn LLM evaluation (Haiku by default); returns `{"ok": true/false, "reason": "..."}` |
| `"type": "agent"` | Multi-turn subagent with tool access; experimental, 60s timeout, up to 50 tool turns |

## Hook input/output

**Input:** JSON on stdin. Common fields: `session_id`, `cwd`, `hook_event_name`. Event-specific: `tool_name`, `tool_input` (for tool events), `prompt` (for UserPromptSubmit), `source` (for SessionStart).

**Output via exit code:**
- Exit 0: action proceeds. For `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`: stdout is added to Claude's context.
- Exit 2: action blocked. Write reason to stderr — Claude receives it as feedback.
- Other non-zero: action proceeds; transcript shows hook error notice; full stderr goes to debug log.

**Structured JSON output (exit 0):** For more control, exit 0 and print JSON to stdout:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Use rg instead of grep for better performance"
  }
}
```

`permissionDecision` values for `PreToolUse`: `"allow"` (skip prompt), `"deny"` (cancel + feedback), `"ask"` (show prompt), `"defer"` (non-interactive mode only).

**Note:** `"allow"` skips the interactive prompt but does NOT override deny rules from settings. Deny rules always take precedence.

## Advanced: `if` field for fine-grained filtering

Requires Claude Code v2.1.85+. Filters hooks by tool name AND arguments together:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(git *)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check-git-policy.sh"
          }
        ]
      }
    ]
  }
}
```

The hook process only spawns when the `if` pattern matches. For compound commands like `npm test && git push`, each subcommand is evaluated. Only works on tool events (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`).

## Hook location and scope

| Location | Scope | Shareable |
|---|---|---|
| `~/.claude/settings.json` | All your projects | No |
| `.claude/settings.json` | Single project | Yes (commit to repo) |
| `.claude/settings.local.json` | Single project | No (gitignored) |
| Managed policy settings | Organization-wide | Yes (admin-controlled) |
| Plugin `hooks/hooks.json` | When plugin is enabled | Yes |
| Skill/agent frontmatter | While skill/agent is active | Yes |

## Prompt-based hooks

Use when the decision requires judgment, not deterministic rules:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains to be done\"}."
          }
        ]
      }
    ]
  }
}
```

`"ok": false` behavior by event:
- `Stop` and `SubagentStop`: `reason` is fed back to Claude so it keeps working
- `PreToolUse`: tool call is denied and `reason` is returned as tool error
- `PostToolUse`, `PostToolBatch`, `UserPromptSubmit`, `UserPromptExpansion`: turn ends and `reason` appears as warning

## Agent-based hooks (experimental)

When verification requires inspecting files or running commands, use `type: "agent"`. Spawns a subagent with tool access (same `"ok"`/`"reason"` format, 60s timeout, up to 50 tool turns):

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify that all unit tests pass. Run the test suite and check the results.",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

Use prompt hooks when hook input data alone is enough. Use agent hooks when you need to verify actual codebase state.

## HTTP hooks

POST event data to an endpoint (useful for shared audit services):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/tool-use",
            "headers": {"Authorization": "Bearer $MY_TOKEN"},
            "allowedEnvVars": ["MY_TOKEN"]
          }
        ]
      }
    ]
  }
}
```

Header values support `$VAR_NAME` interpolation; only vars in `allowedEnvVars` are resolved. HTTP status codes alone cannot block actions — use JSON response body.

## Hooks and permission modes

- `PreToolUse` hooks fire **before** any permission-mode check
- A hook returning `permissionDecision: "deny"` blocks the tool even in `bypassPermissions` mode
- A hook returning `"allow"` does NOT bypass deny rules from settings
- Hooks can tighten restrictions but not loosen them past what permission rules allow

## Troubleshooting

**Stop hook infinite loop:** Parse `stop_hook_active` field and exit 0 if it's `true`.

**JSON validation failed:** Shell profile `echo` statements contaminate hook stdout. Wrap them in `if [[ $- == *i* ]]; then ... fi`.

**Hook not firing:** Run `/hooks` to confirm it's registered. Check matcher case-sensitivity. Verify correct event type. `PermissionRequest` hooks don't fire in non-interactive mode — use `PreToolUse` instead.

**Debug:** Start with `claude --debug-file /tmp/claude.log` or run `/debug` mid-session. Use `Ctrl+O` for transcript view.
