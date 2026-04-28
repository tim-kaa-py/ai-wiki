---
title: "Claude Code Plugins"
type: "how-to"
pillar: "building"
tags: [claude-code, plugins, skills, agents, hooks, mcp, monitors, lsp, packaging, workflow, how-to]
sources:
  - "summaries/2026-04-25_claude-code-docs_create-plugins.md"
last_updated: "2026-04-25"
---

# Claude Code Plugins

How to author, test, and ship a Claude Code plugin — the packaging layer that bundles skills, agents, hooks, MCP servers, LSP servers, and background monitors into a single distributable unit. For the underlying skill mechanics, see [Claude Code Skills](claude-code-skills.md). For the concept of skills as on-demand capabilities, see [Agent Skills](../concepts/agent-skills.md).

## Standalone vs Plugin: Decide Once

The two extension mechanisms are deliberately distinct. Pick the right one before you start scaffolding.

| | Standalone (`.claude/`) | Plugin (`.claude-plugin/plugin.json`) |
|--|------------------------|----------------------------------------|
| Scope | Per-project or personal (`~/.claude/`) | Distributable, versioned, installable |
| Slash names | Short (`/deploy`) | Namespaced (`/my-plugin:deploy`) |
| Packaging overhead | None | Manifest + flat directory layout |
| Version model | N/A | Explicit semver, or commit SHA per commit |
| Right fit | Iteration, experimentation, personal workflow | Sharing with teammates, public release |

**Default to standalone.** Move to plugin only when you actually need to share. Conversion is mechanical — `cp -r .claude/skills my-plugin/`, add `plugin.json`, done.

## Plugin Directory Layout

The most common mistake is placing functional directories inside `.claude-plugin/`. They go at the **plugin root**.

```
my-plugin/
  .claude-plugin/
    plugin.json          # Manifest — only file here
  skills/                # Plugin's skills (same format as .claude/skills/)
  agents/                # Custom agents
  hooks/
    hooks.json           # Lifecycle hooks (mirrors settings.json hooks object)
  monitors/
    monitors.json        # Background commands streaming to Claude
  bin/                   # Helper scripts referenced by skills/hooks
  .mcp.json              # MCP server definitions
  .lsp.json              # LSP server definitions (optional)
  settings.json          # Plugin-scoped defaults (agent, subagentStatusLine)
```

Only `plugin.json` lives in `.claude-plugin/`. Everything else is flat.

## Minimal `plugin.json`

```json
{
  "name": "my-plugin",
  "description": "What this plugin does",
  "version": "1.0.0",
  "author": "Your Name"
}
```

The `name` field is also the namespace prefix — every skill becomes `/my-plugin:<skill-name>`. Renaming `name` renames every skill invocation.

### Versioning

- **Explicit `version`** (semver): users get exactly what you ship; updates are deliberate.
- **Omitted `version`** + git distribution: the commit SHA is the version. Every commit is a new version. Users always pull the latest.

Set `version` for stable installs. Omit it for fast-moving private/team plugins where rolling updates are wanted.

## Local Dev Loop — `--plugin-dir`

`--plugin-dir` loads a plugin from a local path without installing it through a marketplace.

```bash
# Test a plugin locally
claude --plugin-dir ./my-plugin

# Multiple plugins at once
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

If a `--plugin-dir` plugin shares a name with an installed marketplace plugin, **the local copy wins** — useful for testing patches before publishing.

Between edits, `/reload-plugins` picks up changes without restarting Claude Code.

## Background Monitors

A plugin-only capability. `monitors/monitors.json` defines shell commands that run in the background continuously; each stdout line is delivered to Claude as a notification during the session. Claude Code starts monitors automatically when the plugin is active — the user doesn't need to invoke them.

```json
[
  {
    "name": "error-log",
    "command": "tail -F ./logs/error.log",
    "description": "Application error log"
  }
]
```

Use monitors for **passive awareness** — anything Claude should react to without being asked: log tails, file watchers, external status feeds, build outputs.

## Plugin-Scoped Defaults — `settings.json`

A plugin's root `settings.json` configures Claude Code while the plugin is enabled. Currently supports:

- **`agent`** — activates a custom agent from the plugin's `agents/` as the **main thread agent**. This *replaces* Claude Code's default behavior with the agent's system prompt and tool restrictions.
- **`subagentStatusLine`** — a status line shown when a subagent is running.

```json
{
  "agent": "security-reviewer"
}
```

The `agent` lever is powerful: a `security-review` plugin can force every session into review mode by default, with read-only tool access and a security-focused system prompt. Standalone agents can be invoked but never replace the default; only plugins can.

## Hooks: `hooks/hooks.json`

The format mirrors the `hooks` object from `settings.json`. The difference: hooks in a plugin are **portable** (they ship wherever the plugin goes); hooks in a project's `settings.json` are local-only.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npm run lint:fix"
          }
        ]
      }
    ]
  }
}
```

When migrating local hooks into a plugin, lift the `hooks` object out of `settings.json` into `hooks/hooks.json`. The matchers and command syntax don't change.

## LSP Servers

Plugins can ship `.lsp.json` to add language server support for code intelligence. Primarily useful for niche languages not covered by official LSP plugins. Users must have the language server **binary** installed separately — the plugin only wires the protocol, not the implementation.

## Migration: Standalone → Plugin

1. Create the plugin directory: `mkdir -p my-plugin/.claude-plugin`
2. Write `my-plugin/.claude-plugin/plugin.json` with `name`, `description`, `version`.
3. Copy functional dirs to the **plugin root** (not inside `.claude-plugin/`):
   ```bash
   cp -r .claude/skills my-plugin/
   cp -r .claude/agents my-plugin/
   cp -r .claude/commands my-plugin/  # if you still have legacy commands
   ```
4. Lift hooks: move the `hooks` object from `.claude/settings.json` into `my-plugin/hooks/hooks.json`.
5. Test: `claude --plugin-dir ./my-plugin`
6. Verify slash names — every skill is now `/my-plugin:<name>`.

## Invoking Plugin Skills

```bash
# Namespaced — explicit plugin
/my-plugin:skill-name [arguments]

# Standalone or installed plugin where the name is unique
/skill-name [arguments]
```

Namespacing means two plugins can each ship a `/deploy` skill without colliding.

## Common Pitfalls

- **Putting `skills/` or `agents/` inside `.claude-plugin/`.** They go at the plugin root. `.claude-plugin/` only holds `plugin.json`.
- **Forgetting to bump `version` after a breaking skill change.** Without a version bump, semver-pinned users won't get the fix; without `version` at all, every commit is a new version (which may or may not be what you want).
- **Replacing the default agent without telling users.** A plugin with `"agent": "..."` in `settings.json` silently changes how Claude Code behaves on activation. Document this loudly in the plugin's README.
- **Leaving local hooks in `settings.json` after migrating.** They'll still fire alongside the plugin's hooks, sometimes duplicating work.
- **Missing language-server binaries.** `.lsp.json` only wires protocol; users still need the LSP binary installed.
- **Heavy monitors.** A `tail -F` on a high-volume log floods Claude's context with notifications. Filter at the source (`grep ERROR`) or pre-aggregate.

## Related Pages

- [Claude Code Skills](claude-code-skills.md) — authoring SKILL.md, frontmatter, invocation control
- [Agent Skills](../concepts/agent-skills.md) — the underlying concept and progressive disclosure
- [Claude Code](../tools/claude-code.md) — the host runtime
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) — hooks pattern (settings.json form)
- [Claude Code Permissions](claude-code-permissions.md) — `/permissions` and skill rules
- [Superpowers](../tools/superpowers.md) — example of a plugin shipping ~15 skills
- [MCP](../concepts/mcp.md) — `.mcp.json` lives at the plugin root
