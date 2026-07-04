---
title: "Automate workflows with hooks (Claude Code)"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/hooks-guide"
pillar: "building"
tags: [claude-code, hooks, automation, workflow, settings, json, shell, notifications, formatting, permissions, compaction]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_hooks-guide.md"
---

# Automate workflows with hooks (Claude Code) — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/hooks-guide)

## TL;DR

Hooks are the deterministic automation layer in Claude Code — they run shell commands (or HTTP requests, LLM prompts, or subagents) at specific lifecycle events regardless of what Claude decides to do. The guide covers seven core patterns from desktop notifications to auto-formatting to permission enforcement, plus the full event table, output protocols, and matcher syntax.

## Key Takeaways

1. **Hooks are deterministic; CLAUDE.md instructions are advisory.** This is the fundamental reason to use hooks. If something must happen (format after edit, block .env edits, re-inject context after compaction), it needs to be a hook, not an instruction.
   - **How to apply:** Any rule in CLAUDE.md that's a hard requirement (not a preference) should be moved to a `PreToolUse` or `PostToolUse` hook.

2. **Exit codes control behavior: 0 = proceed, 2 = block, other = log error.** For `PreToolUse`, exit 2 blocks the tool call and sends stderr as feedback to Claude. For `UserPromptSubmit`, `SessionStart` stdout on exit 0 is added to Claude's context (the only way to inject text from a hook).
   - **How to apply:** When writing a blocking hook, write the reason to stderr. Claude uses that as feedback to adjust its approach.

3. **Structured JSON output enables fine-grained control.** Exit 0 + JSON to stdout lets you return `permissionDecision: "deny"/"allow"/"ask"` for PreToolUse, or `additionalContext` for PostToolUse. This is how `PermissionRequest` hooks auto-approve specific dialogs.
   - **How to apply:** Use JSON output for anything beyond allow/block — permission mode changes, custom feedback, context injection.

4. **Four hook types beyond shell commands.** `command` (default), `http` (POST to endpoint), `prompt` (single LLM call, returns `{"ok": true/false}`), `agent` (multi-turn subagent with tools). Prompt hooks are useful for "should I keep working?" checks; agent hooks for verifying actual codebase state.
   - **How to apply:** Use `prompt` hooks on `Stop` event to verify task completion. Use `agent` hooks when the verification requires reading files.

5. **Matcher patterns scope hooks to specific tools or events.** `"Edit|Write"` fires only on those tools. `"compact"` on SessionStart fires only after compaction. `"mcp__github__.*"` fires on all GitHub MCP tools. The new `if` field (v2.1.85+) adds argument-level filtering (e.g., `"Bash(git *)"` for only git commands).
   - **How to apply:** Always scope hooks as narrowly as possible. Broad matchers fire more than expected and can cause subtle issues.

6. **Hooks fire before permission checks in `bypassPermissions` mode.** A `PreToolUse` hook that returns `deny` blocks the tool even when bypass is active. Conversely, a hook returning `"allow"` still cannot bypass deny rules from settings. Hooks tighten but cannot loosen restrictions past policy.
   - **How to apply:** Use `PreToolUse` hooks for org-level policy enforcement that users cannot bypass by changing their permission mode.

7. **Six scope levels for hook placement.** Global (`~/.claude/settings.json`), project (`.claude/settings.json`, committable), local (`.claude/settings.local.json`, gitignored), managed policy (org-wide), plugin, or skill/agent frontmatter. The right scope determines who sees the hook.
   - **How to apply:** Format hooks that the whole team should have go in `.claude/settings.json` (checked into git). Personal workflow hooks go in `~/.claude/settings.json`.

## Notable Commands / Code Snippets

```json
// PostToolUse: auto-format with prettier after every edit
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{"type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"}]
      }
    ]
  }
}
```

```json
// SessionStart: re-inject context after compaction
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [{"type": "command", "command": "echo 'Reminder: use Bun, not npm. Current sprint: auth refactor.'"}]
      }
    ]
  }
}
```

```bash
# Protect files: block edits to .env, package-lock.json, .git/
#!/bin/bash
FILE_PATH=$(cat | jq -r '.tool_input.file_path // empty')
for pattern in ".env" "package-lock.json" ".git/"; do
  [[ "$FILE_PATH" == *"$pattern"* ]] && echo "Blocked: $FILE_PATH" >&2 && exit 2
done
```

```bash
# Debug: tail log started with --debug-file
claude --debug-file /tmp/claude.log
tail -f /tmp/claude.log
```

```bash
# Stop hook infinite loop prevention
INPUT=$(cat)
[ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ] && exit 0
```

## Related Topics

claude-code, hooks, automation, workflow, settings, json, shell, notifications, formatting, permissions, compaction
