---
title: "Create plugins"
type: "summary"
channel: "Claude Code Docs"
date: "2026-04-25"
resource: "https://code.claude.com/docs/en/plugins"
pillar: "building"
tags: [claude-code, plugins, skills, agents, hooks, mcp, workflow, reference, how-to]
timestamp: "2026-04-25"
source_file: "sources/articles/2026-04-25_claude-code-docs_create-plugins.md"
---

# Create plugins — Summary

**Source:** Claude Code Docs | 2026-04-25 | [Link](https://code.claude.com/docs/en/plugins)

## TL;DR

The official guide for creating Claude Code plugins — the packaging layer that wraps skills, agents, hooks, MCP servers, LSP servers, and monitors into a distributable unit. The core decision is standalone `.claude/` (personal/project, short slash names) vs plugin (shareable, namespaced `/plugin-name:skill`). Start standalone, convert to plugin when you're ready to share.

## Key Concepts

### Plugin vs Standalone

The two extension mechanisms are deliberately separate:
- **Standalone** (`.claude/`): per-project or personal, no namespace, short skill names (`/deploy`). No packaging overhead.
- **Plugin** (`.claude-plugin/plugin.json`): distributable, namespaced (`/my-plugin:deploy`), versioned, installable via marketplace. The namespace prevents conflicts across plugins.

### Plugin manifest (`plugin.json`)

The manifest lives at `.claude-plugin/plugin.json` and defines the identity: `name` (which also becomes the skill namespace), `description`, `version`, `author`. If `version` is omitted and the plugin is distributed via git, the commit SHA is used and every commit is a new version.

### Plugin directory structure

All functional directories (`skills/`, `agents/`, `hooks/`, `.mcp.json`, `bin/`, `settings.json`) live at the **plugin root**, not inside `.claude-plugin/`. The most common mistake is placing them inside `.claude-plugin/`.

### Background monitors

A new plugin capability: `monitors/monitors.json` defines shell commands that run in the background continuously (e.g., `tail -F ./logs/error.log`). Each stdout line is delivered to Claude as a notification during the session. Claude Code starts monitors automatically when the plugin is active — no user instruction needed.

### Plugin-scoped default settings

`settings.json` at the plugin root applies configuration when the plugin is enabled. Currently supports `agent` (which activates a custom agent from the plugin's `agents/` as the main thread, changing default Claude Code behavior) and `subagentStatusLine`.

### LSP server support

Plugins can ship `.lsp.json` to add language server support for code intelligence. Primarily useful for niche languages not covered by official LSP plugins. Users must have the language server binary installed separately.

## Key Takeaways

1. **Start standalone, migrate to plugin when sharing.** The conversion path is explicit (`cp -r .claude/skills my-plugin/`) and takes minutes. Don't over-engineer for sharing before you need it.
   - **How to apply:** Build and iterate in `.claude/skills/` and `.claude/commands/`, then run the migration steps when the skill is stable and teammates want it.

2. **The plugin root is flat — nothing functional goes inside `.claude-plugin/`.** Only `plugin.json` lives there. Skills, agents, hooks, MCP configs all sit at the plugin root level.

3. **`--plugin-dir` is the local dev loop.** `claude --plugin-dir ./my-plugin` loads the plugin without installing. If it conflicts with an installed marketplace plugin of the same name, the local copy wins. Use `/reload-plugins` between edits.

4. **Namespacing is automatic and tied to the `name` field.** Rename the `name` field in `plugin.json` to change the namespace prefix. All skill invocations update accordingly.

5. **Background monitors enable passive awareness.** If you want Claude to watch a log, a file, or an external status without the user having to ask, wrap it in a monitor rather than a skill.

6. **`settings.json` in a plugin can replace Claude Code's default agent.** Setting `"agent": "security-reviewer"` makes every session in the plugin's scope start with the security-reviewer's system prompt and tool restrictions — a powerful pattern for opinionated tooling (e.g., a security-review plugin that forces review mode by default).

7. **Hooks migrate via `hooks/hooks.json`.** The format mirrors the `hooks` object from `settings.json`. The main difference: hooks in a plugin are portable; hooks in `settings.json` are local-only.

8. **Version explicitly if you want stable installs.** Without an explicit `version`, every git commit is a new version and users will always receive updates. Set a semver `version` field to control the update cadence.

## Notable Commands / Code Snippets

```bash
# Test a plugin locally (no install needed)
claude --plugin-dir ./my-plugin

# Load multiple plugins simultaneously
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two

# Reload plugins without restarting Claude Code
/reload-plugins

# Invoke a namespaced plugin skill
/my-plugin:skill-name [arguments]
```

```json
// Minimal plugin.json manifest
{
  "name": "my-plugin",
  "description": "What this plugin does",
  "version": "1.0.0"
}
```

```json
// monitors/monitors.json — tail a log and stream lines to Claude
[
  {
    "name": "error-log",
    "command": "tail -F ./logs/error.log",
    "description": "Application error log"
  }
]
```

```json
// settings.json — activate a custom agent as the default session agent
{
  "agent": "security-reviewer"
}
```

```json
// hooks/hooks.json — migrated from settings.json hooks object
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npm run lint:fix" }]
      }
    ]
  }
}
```

## Related Topics

claude-code, plugins, skills, agents, hooks, mcp, workflow, reference, how-to
