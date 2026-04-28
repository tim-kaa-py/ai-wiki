---
title: "Create plugins"
source_type: "article"
channel: "Claude Code Docs"
date: "2026-04-25"
url: "https://code.claude.com/docs/en/plugins"
pillar: "building"
tags: [claude-code, plugins, skills, agents, hooks, mcp, workflow, reference, how-to]
ingested: "2026-04-25"
extraction_method: "web-fetch"
---

# Create plugins

> Create custom plugins to extend Claude Code with skills, agents, hooks, and MCP servers.

Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams.

## When to use plugins vs standalone configuration

| Approach | Skill names | Best for |
| :--- | :--- | :--- |
| **Standalone** (`.claude/` directory) | `/hello` | Personal workflows, project-specific customizations, quick experiments |
| **Plugins** (directories with `.claude-plugin/plugin.json`) | `/plugin-name:hello` | Sharing with teammates, distributing to community, versioned releases, reusable across projects |

**Use standalone configuration when**:
- You're customizing Claude Code for a single project
- The configuration is personal and doesn't need to be shared
- You're experimenting with skills or hooks before packaging them
- You want short skill names like `/hello` or `/deploy`

**Use plugins when**:
- You want to share functionality with your team or community
- You need the same skills/agents across multiple projects
- You want version control and easy updates for your extensions
- You're distributing through a marketplace
- You're okay with namespaced skills like `/my-plugin:hello` (namespacing prevents conflicts between plugins)

Start with standalone configuration in `.claude/` for quick iteration, then convert to a plugin when you're ready to share.

## Quickstart

### Create your first plugin

**Step 1: Create the plugin directory**

```bash
mkdir my-first-plugin
```

**Step 2: Create the plugin manifest**

The manifest file at `.claude-plugin/plugin.json` defines your plugin's identity.

```bash
mkdir my-first-plugin/.claude-plugin
```

Create `my-first-plugin/.claude-plugin/plugin.json`:

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

| Field | Purpose |
| :--- | :--- |
| `name` | Unique identifier and skill namespace. Skills are prefixed with this (e.g., `/my-first-plugin:hello`). |
| `description` | Shown in the plugin manager. |
| `version` | Optional. If omitted and distributed via git, the commit SHA is used. |
| `author` | Optional. Helpful for attribution. |

**Step 3: Add a skill**

Skills live in the `skills/` directory. Each skill is a folder containing a `SKILL.md` file.

```bash
mkdir -p my-first-plugin/skills/hello
```

Create `my-first-plugin/skills/hello/SKILL.md`:

```yaml
---
description: Greet the user with a friendly message
disable-model-invocation: true
---

Greet the user warmly and ask how you can help them today.
```

**Step 4: Test your plugin**

```bash
claude --plugin-dir ./my-first-plugin
```

Then invoke the skill:

```
/my-first-plugin:hello
```

**Step 5: Add skill arguments**

Update `SKILL.md` to use `$ARGUMENTS`:

```yaml
---
description: Greet the user with a personalized message
---

# Hello Skill

Greet the user named "$ARGUMENTS" warmly and ask how you can help them today.
```

Run `/reload-plugins` to pick up changes, then:

```
/my-first-plugin:hello Alex
```

## Plugin structure overview

**Common mistake**: Don't put `commands/`, `agents/`, `skills/`, or `hooks/` inside the `.claude-plugin/` directory. Only `plugin.json` goes inside `.claude-plugin/`. All other directories must be at the plugin root level.

| Directory | Location | Purpose |
| :--- | :--- | :--- |
| `.claude-plugin/` | Plugin root | Contains `plugin.json` manifest |
| `skills/` | Plugin root | Skills as `<name>/SKILL.md` directories |
| `commands/` | Plugin root | Skills as flat Markdown files. Use `skills/` for new plugins |
| `agents/` | Plugin root | Custom agent definitions |
| `hooks/` | Plugin root | Event handlers in `hooks.json` |
| `.mcp.json` | Plugin root | MCP server configurations |
| `.lsp.json` | Plugin root | LSP server configurations for code intelligence |
| `monitors/` | Plugin root | Background monitor configurations in `monitors.json` |
| `bin/` | Plugin root | Executables added to the Bash tool's `PATH` while the plugin is enabled |
| `settings.json` | Plugin root | Default settings applied when the plugin is enabled |

## Develop more complex plugins

### Add LSP servers

LSP plugins give Claude real-time code intelligence. Add an `.lsp.json` file:

```json
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  }
}
```

Users must have the language server binary installed on their machine.

### Add background monitors

Background monitors watch logs, files, or external status and notify Claude as events arrive. Claude Code starts each monitor automatically when the plugin is active.

Add `monitors/monitors.json`:

```json
[
  {
    "name": "error-log",
    "command": "tail -F ./logs/error.log",
    "description": "Application error log"
  }
]
```

Each stdout line from `command` is delivered to Claude as a notification.

### Ship default settings

Plugins can include a `settings.json` to apply default configuration when enabled. Currently only `agent` and `subagentStatusLine` keys are supported.

```json
{
  "agent": "security-reviewer"
}
```

This activates the `security-reviewer` agent from the plugin's `agents/` directory as the main thread.

### Testing locally

```bash
# Load one plugin
claude --plugin-dir ./my-plugin

# Load multiple plugins
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

When a `--plugin-dir` plugin has the same name as an installed marketplace plugin, the local copy takes precedence. Run `/reload-plugins` to pick up changes without restarting.

### Debug plugin issues

1. **Check the structure**: Ensure directories are at the plugin root, not inside `.claude-plugin/`
2. **Test components individually**: Check each skill, agent, and hook separately
3. Use `/reload-plugins` after making changes

### Share your plugins

1. Add a `README.md` with installation and usage instructions
2. Choose a versioning strategy (explicit `version` field or git commit SHA)
3. Distribute through plugin marketplaces
4. Submit to official Anthropic marketplace at `claude.ai/settings/plugins/submit`

## Convert existing configurations to plugins

### Migration steps

**Step 1: Create the plugin structure**

```bash
mkdir -p my-plugin/.claude-plugin
```

```json
{
  "name": "my-plugin",
  "description": "Migrated from standalone configuration",
  "version": "1.0.0"
}
```

**Step 2: Copy your existing files**

```bash
cp -r .claude/commands my-plugin/
cp -r .claude/agents my-plugin/
cp -r .claude/skills my-plugin/
```

**Step 3: Migrate hooks**

Create `my-plugin/hooks/hooks.json`. Copy the `hooks` object from your `.claude/settings.json`:

```json
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

**Step 4: Test the migrated plugin**

```bash
claude --plugin-dir ./my-plugin
```

### What changes when migrating

| Standalone (`.claude/`) | Plugin |
| :--- | :--- |
| Only available in one project | Can be shared via marketplaces |
| Files in `.claude/commands/` | Files in `plugin-name/commands/` |
| Hooks in `settings.json` | Hooks in `hooks/hooks.json` |
| Must manually copy to share | Install with `/plugin install` |
