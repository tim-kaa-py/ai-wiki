---
title: "VSCode Hotkey: Launch Claude Code in a New Editor Tab"
source_type: "article"
channel: "self"
date: "2026-04-19"
url: ""
pillar: "building"
tags: [claude-code, vscode, configuration, workflow, how-to, reference]
ingested: "2026-04-19"
source_file: "sources/article/2026-04-19_self_vscode-claude-code-hotkey.md"
---

# VSCode Hotkey: Launch Claude Code in a New Editor Tab — Summary

**Source:** self | 2026-04-19 | user-authored

## TL;DR

A two-part VSCode configuration — custom terminal profile + keybinding with `location: "editor"` — binds a single shortcut (Ctrl/Cmd+Shift+C) that opens Claude Code as a full editor tab rather than in the bottom terminal panel. Each press spawns an independent session, enabling side-by-side parallel Claude Code workflows inside the IDE.

## Key Concepts

### Terminal profile vs. keybinding (separation of concerns)

A VSCode terminal *profile* defines **what** to run (shell path + args). A *keybinding* defines **how to trigger** it and crucially **where** it opens. The profile alone cannot force an editor-tab location — that decision lives in the keybinding's `args.location` field. Invoking the same profile from the terminal dropdown opens it in the panel.

### `location: "editor"` flag

VSCode's `workbench.action.terminal.newWithProfile` command accepts a `location` arg. The value `"editor"` promotes the terminal from the bottom panel into the editor area, where it behaves like any other tab (splittable, pinnable, rearrangeable). This is the pivotal flag that enables the parallel-tab workflow.

### `-command` unbind prefix

A VSCode keybinding entry whose `command` starts with `-` removes the default binding for that key. Necessary here because `Ctrl+Shift+C` is reserved by default for `openNativeConsole`.

## Key Takeaways

1. **Use editor tabs for multiple concurrent Claude Code sessions** — the bottom terminal panel collapses everything into one crowded area; editor tabs give each session real estate and the full window-management UI.
   - **How to apply:** Set `location: "editor"` in the keybinding args.

2. **Launch pattern: `shell -i -c claude` exits cleanly** — running `claude` as the shell's only command means `/exit` closes the tab automatically. No lingering shell prompt.
   - **How to apply:** Use `args: ["--login", "-i", "-c", "claude"]` (bash) or `["-l", "-i", "-c", "claude"]` (zsh) in the profile.

3. **Always unbind the default before rebinding a reserved shortcut** — otherwise VSCode may invoke both commands or the wrong one.
   - **How to apply:** Add a `"-<original-command>"` entry with the same `key` alongside your new binding.

4. **The `claude` CLI is a shell script on Windows** — it won't run in PowerShell or cmd reliably; pick a bash shell (Git Bash, WSL) for the profile `path`.
   - **How to apply:** Point `path` to `C:\Program Files\Git\bin\bash.exe` (or your WSL bash) on Windows.

5. **`overrideName: true` keeps the tab label stable** — without it, VSCode may rename the tab to the shell process (`bash`) as soon as Claude Code finishes booting.

## Notable Commands / Code Snippets

**VSCode `settings.json` (Windows profile):**
```json
"terminal.integrated.profiles.windows": {
  "Claude": {
    "path": "C:\\Program Files\\Git\\bin\\bash.exe",
    "args": ["--login", "-i", "-c", "claude"],
    "overrideName": true
  }
}
```

**VSCode `keybindings.json` (Windows):**
```json
[
  { "key": "ctrl+shift+c", "command": "-workbench.action.terminal.openNativeConsole" },
  {
    "key": "ctrl+shift+c",
    "command": "workbench.action.terminal.newWithProfile",
    "args": { "profileName": "Claude", "location": "editor" }
  }
]
```

macOS: swap `ctrl+shift+c` → `cmd+shift+c`, use `/bin/zsh` with `-l -i -c claude`.

## User Notes

- Self-authored setup, active on user's Windows workstation.
- The source file is structured as an implementation spec so another Claude instance can reproduce the setup on a different machine (OS detection, file locations, merge-don't-replace guidance, troubleshooting).

## Related Topics

claude-code, vscode, configuration, workflow, how-to, reference
