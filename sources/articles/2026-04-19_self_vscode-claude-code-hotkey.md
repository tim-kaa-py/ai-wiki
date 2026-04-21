---
title: "VSCode Hotkey: Launch Claude Code in a New Editor Tab"
source_type: "article"
channel: "self"
date: "2026-04-19"
url: ""
pillar: "building"
tags: [claude-code, vscode, configuration, workflow, how-to, reference]
ingested: "2026-04-19"
extraction_method: "user-pasted"
---

# VSCode Hotkey: Launch Claude Code in a New Editor Tab

## Goal

Bind a single keyboard shortcut in VSCode that opens a new **editor tab** (not a terminal panel) running Claude Code (`claude` CLI) in a shell. Pressing the shortcut again opens another independent Claude Code session in its own tab.

## Why editor tab, not terminal panel?

- Each session gets a full-size tab you can split, rearrange, and pin like any other editor.
- Multiple concurrent Claude Code sessions are easy to manage side-by-side.
- The terminal panel stays free for regular shell work.

## Mechanism (two pieces)

The setup combines a **custom terminal profile** (defines *what* to run) and a **keybinding** (defines *how to trigger it* and *where it opens*).

### 1. Custom terminal profile

Location: VSCode `settings.json` (User-level: `%APPDATA%\Code\User\settings.json` on Windows, `~/Library/Application Support/Code/User/settings.json` on macOS, `~/.config/Code/User/settings.json` on Linux).

Add a profile under the OS-appropriate key (`terminal.integrated.profiles.windows` / `.osx` / `.linux`). The profile launches a shell and immediately execs the `claude` binary:

```json
"terminal.integrated.profiles.windows": {
  "Claude": {
    "path": "C:\\Program Files\\Git\\bin\\bash.exe",
    "args": ["--login", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

Key parts:
- `path` — shell executable. On macOS/Linux use `/bin/bash` or `/bin/zsh`. On Windows, Git Bash is used here so the `claude` CLI (a shell script) runs natively.
- `args` — `--login -i -c claude` starts an interactive login shell and runs `claude` as its only command. When `claude` exits, the shell exits and the tab closes.
- `overrideName: true` — keeps the tab labeled "Claude" instead of renaming to the shell's process name.

**macOS equivalent:**
```json
"terminal.integrated.profiles.osx": {
  "Claude": {
    "path": "/bin/zsh",
    "args": ["-l", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

**Linux equivalent:**
```json
"terminal.integrated.profiles.linux": {
  "Claude": {
    "path": "/bin/bash",
    "args": ["--login", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

### 2. Keybinding

Location: VSCode `keybindings.json` (Command Palette → "Preferences: Open Keyboard Shortcuts (JSON)").

```json
[
  {
    "key": "ctrl+shift+c",
    "command": "-workbench.action.terminal.openNativeConsole"
  },
  {
    "key": "ctrl+shift+c",
    "command": "workbench.action.terminal.newWithProfile",
    "args": { "profileName": "Claude", "location": "editor" }
  }
]
```

Key parts:
- First entry with `-` prefix **unbinds** VSCode's default `Ctrl+Shift+C` (which opens an external native console). Required to prevent conflict.
- Second entry invokes `workbench.action.terminal.newWithProfile` with:
  - `profileName: "Claude"` — references the profile defined above.
  - `location: "editor"` — opens the terminal as an **editor tab** instead of the bottom terminal panel. This is the pivotal flag.

**macOS users:** swap `ctrl+shift+c` for `cmd+shift+c`.

## Prerequisites

- VSCode installed.
- Claude Code CLI installed and available on `PATH` as `claude`. Verify in a terminal: `claude --version`.
- A shell that can exec `claude` (Git Bash on Windows, zsh/bash on macOS/Linux).

## Implementation steps for another Claude instance

1. Detect OS and locate the user's VSCode `settings.json` and `keybindings.json`.
2. Verify `claude` is on `PATH`; if not, instruct the user to install Claude Code first.
3. Merge the OS-appropriate `terminal.integrated.profiles.<os>` block into `settings.json` (preserve existing profiles).
4. Append the two keybinding entries to `keybindings.json` (preserve existing bindings). Adjust `key` to `cmd+shift+c` on macOS.
5. Tell the user to reload VSCode (Command Palette → "Developer: Reload Window") and test the shortcut.

## Verification

- Press the shortcut → a new editor tab opens labeled "Claude", showing the Claude Code prompt.
- Press it again → a second independent tab opens.
- Close the tab or exit Claude Code (`/exit`) → tab closes cleanly.

## Troubleshooting

- **Tab opens but closes immediately**: `claude` not found on `PATH` for the chosen shell. Test with `args: ["--login", "-i"]` (drop `-c claude`) to get an interactive shell you can debug in.
- **Shortcut does nothing**: another keybinding or extension is intercepting it. Check Command Palette → "Preferences: Open Keyboard Shortcuts" → search for the key combo.
- **Opens in terminal panel instead of tab**: `location: "editor"` missing or misspelled in the keybinding args.
- **Wrong shell on Windows**: adjust `path` to a bash that has `claude` accessible (e.g., WSL bash, Git Bash).
