---
title: "VSCode Hotkey: Launch Claude Code in Editor Tab"
type: "how-to"
pillar: "building"
tags: [claude-code, vscode, configuration, workflow, how-to, reference]
sources:
  - "summaries/2026-04-19_self_vscode-claude-code-hotkey.md"
last_updated: "2026-04-19"
---

# VSCode Hotkey: Launch Claude Code in an Editor Tab

How to bind a single keyboard shortcut (Ctrl/Cmd+Shift+C) in VSCode that opens Claude Code as a full editor tab — not in the bottom terminal panel. Press the shortcut again to spawn a second independent session in its own tab.

## Why This Matters

The bottom terminal panel collapses multiple shells into a single cramped area. Editor tabs give each Claude Code session real estate, splittable/pinnable window management, and clean parallel workflows — aligning with the multi-session pattern Steinberger and others use for agentic engineering. See [Claude Code](../tools/claude-code.md) "Multi-Session Workflow".

## Mechanism

Two configuration pieces combine:

1. A **custom terminal profile** in `settings.json` defines *what* to run (shell + `claude` CLI).
2. A **keybinding** in `keybindings.json` defines *how to trigger* the profile and — crucially — *where* it opens via `location: "editor"`.

The profile alone cannot force editor-tab placement; the `location` flag lives in the keybinding. Invoking the same profile from the terminal dropdown opens it in the panel.

## Setup

### Step 1 — Add the terminal profile

Open VSCode `settings.json` (Command Palette → "Preferences: Open User Settings (JSON)"). Merge into the OS-appropriate `terminal.integrated.profiles.*` key:

**Windows:**
```json
"terminal.integrated.profiles.windows": {
  "Claude": {
    "path": "C:\\Program Files\\Git\\bin\\bash.exe",
    "args": ["--login", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

**macOS:**
```json
"terminal.integrated.profiles.osx": {
  "Claude": {
    "path": "/bin/zsh",
    "args": ["-l", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

**Linux:**
```json
"terminal.integrated.profiles.linux": {
  "Claude": {
    "path": "/bin/bash",
    "args": ["--login", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

### Step 2 — Add the keybinding

Open `keybindings.json` (Command Palette → "Preferences: Open Keyboard Shortcuts (JSON)"). Append:

```json
{
  "key": "ctrl+shift+c",
  "command": "-workbench.action.terminal.openNativeConsole"
},
{
  "key": "ctrl+shift+c",
  "command": "workbench.action.terminal.newWithProfile",
  "args": { "profileName": "Claude", "location": "editor" }
}
```

macOS: replace `ctrl+shift+c` with `cmd+shift+c`.

The first entry with the `-` prefix **unbinds** VSCode's default shortcut (`openNativeConsole`) to prevent conflict. The second entry does the work — `location: "editor"` is the flag that produces a tab instead of a panel terminal.

### Step 3 — Reload and test

Command Palette → "Developer: Reload Window". Press the shortcut. A new editor tab labeled "Claude" should open with the Claude Code prompt. Press it again for a second independent session.

## Prerequisites

- VSCode installed.
- `claude` CLI on `PATH` (`claude --version` to verify).
- A shell that can exec `claude` (Git Bash on Windows, zsh/bash on macOS/Linux). PowerShell/cmd do not reliably run the CLI on Windows.

## Troubleshooting

| Symptom | Cause / Fix |
|---------|------------|
| Tab opens then closes immediately | `claude` not on PATH for the chosen shell. Test with `args: ["--login", "-i"]` (drop `-c claude`) to get a debug shell. |
| Shortcut does nothing | Another keybinding or extension is intercepting it. Search for the key combo in Keyboard Shortcuts. |
| Opens in terminal panel, not a tab | `location: "editor"` missing or misspelled in keybinding args. |
| Tab renames itself to "bash" | Add `"overrideName": true` to the profile. |

## Related

- [Claude Code](../tools/claude-code.md) — tool reference and multi-session patterns.
- [Claude Code Status Line Setup](claude-code-status-line.md) — companion setup for context awareness once sessions are running.
