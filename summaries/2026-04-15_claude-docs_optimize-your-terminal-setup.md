---
title: "Optimize your terminal setup"
source_type: "docs"
channel: "Anthropic"
date: "2026-04-15"
url: "https://code.claude.com/docs/en/terminal-config"
pillar: "building"
tags: [claude-code, terminal, configuration, how-to, reference]
ingested: "2026-04-15"
source_file: "sources/docs/2026-04-15_claude-docs_optimize-your-terminal-setup.md"
---

# Optimize your terminal setup — Summary

**Source:** Anthropic | 2026-04-15 | [Link](https://code.claude.com/docs/en/terminal-config) | Official docs

## TL;DR

Anthropic's official reference for configuring Claude Code's terminal environment. Covers line-break keybindings (Shift+Enter across different terminals), desktop notification setup (especially iTerm2 and tmux passthrough), flicker reduction, large-input handling, and Vim mode. Mostly a configuration cheatsheet — the tmux passthrough setting and the distinction between hooks vs native notifications are the most non-obvious details.

## Key Takeaways

1. Shift+Enter works natively in iTerm2, WezTerm, Ghostty, and Kitty. For VS Code, Alacritty, Zed, and Warp, run `/terminal-setup` inside Claude Code to configure it automatically.
   - **How to apply:** Run `/terminal-setup` once in any non-native terminal. Skip it if you're already on iTerm2 or Ghostty.

2. tmux requires two config lines to pass extended key sequences (including Shift+Enter) through to the outer terminal — and a separate `allow-passthrough on` setting for notifications to reach the outer terminal.
   - **How to apply:** Add to `~/.tmux.conf`:
     ```
     set -s extended-keys on
     set -as terminal-features 'xterm*:extkeys'
     set -g allow-passthrough on
     ```
     Then reload: `tmux source-file ~/.tmux.conf`

3. iTerm2 notifications require manual opt-in: Settings → Profiles → Terminal → enable "Notification Center Alerts" → Filter Alerts → check "Send escape sequence-generated alerts". Kitty and Ghostty work out of the box.
   - **How to apply:** Set this up once so you're notified when Claude finishes a long task.

4. For custom notification behavior (sound, Slack message, etc.), use notification hooks — they run *alongside* native terminal notifications, not as a replacement.
   - **How to apply:** See the hooks docs at `/en/hooks#notification`.

5. Flicker during long sessions or scroll position jumping: enable fullscreen rendering with `CLAUDE_CODE_NO_FLICKER=1`.
   - **How to apply:** Add `export CLAUDE_CODE_NO_FLICKER=1` to your shell profile.

6. Vim mode is available via `/config` → Editor mode, or by setting `"editorMode": "vim"` in `~/.claude.json`. Supports a comprehensive subset including text objects and the `.` repeat operator.
   - **How to apply:** Enable if you're a Vim user — the subset is broad enough for real editing.

7. Very long pastes can fail or truncate, especially in the VS Code terminal. Write to a file and ask Claude to read it instead.
   - **How to apply:** For any input longer than a few hundred lines, use `echo "..." > input.txt` and reference the file.

## Notable Commands / Code Snippets

```bash
# Shift+Enter in tmux — add to ~/.tmux.conf
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'
set -g allow-passthrough on
# Reload
tmux source-file ~/.tmux.conf
```

```bash
# Disable flicker / fullscreen rendering
export CLAUDE_CODE_NO_FLICKER=1
```

```bash
# Vim mode via config file (~/.claude.json)
{ "editorMode": "vim" }
```

```
# Auto-configure Shift+Enter for VS Code, Alacritty, Zed, Warp
/terminal-setup
```

## Related Topics

claude-code, terminal, configuration, how-to, reference, tmux, iterm2, vim, notifications, hooks
