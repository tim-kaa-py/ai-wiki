---
title: "Claude Code Status Line — Context Awareness + Rate Limit Dashboard"
description: "Sets up a three-line Claude Code status bar showing context usage, session cost, rate limits, git branch, and code velocity"
type: "summary"
channel: "self"
date: "2026-04-16"
resource: ""
pillar: "building"
tags: [claude-code, workflow, how-to, reference, terminal, configuration, status-line]
timestamp: "2026-04-16"
source_file: "sources/articles/2026-04-16_self_claude-code-statusline-setup.md"
---

# Claude Code Status Line — Summary

**Source:** self | 2026-04-16 | user-authored

## TL;DR

A ready-to-paste prompt that sets up a three-line status bar at the bottom of Claude Code showing context window usage, session cost in EUR, rate limit burn rates with sustainability indicators, git branch, and code velocity — giving you live situational awareness without leaving the terminal. Three lines prevent path overflow on deep project directories by giving each tier of information its own line.

## Key Takeaways

1. **Context window thresholds are model-aware** — Opus warns earlier (green 0-19%, yellow 20-69%, red 70%+); Sonnet/Haiku stay green longer (green 0-49%, yellow 50-89%, red 90%+). Detected via string match on the model display name.
   - **How to apply:** Watch the bar color; yellow means consider wrapping up or starting a new session soon.

2. **Rate limit sustainability matters more than current percentage** — The status line calculates burn rate (usage% / elapsed hours) and colors the reset timer green (sustainable, <20%/h) or red (unsustainable) with a "hours left" estimate.
   - **How to apply:** If the reset timer turns red, slow down or switch tasks. The `(Xh left)` indicator tells you exactly when you'll hit the wall.

3. **The burn indicator (lightning bolt) flags expensive interactions** — Appears when a single interaction consumed >5 percentage points of the 5h limit, persisted across invocations via a state file.
   - **How to apply:** If you see the lightning bolt, the last prompt was heavy. Consider breaking large tasks into smaller steps.

4. **Session cost is tracked in EUR** — Uses a hardcoded USD-to-EUR rate (0.88) to show running cost. Combined with the kT (kilotokens) counter, gives a sense of session efficiency.
   - **How to apply:** Adjust the `USD_TO_EUR` variable in the script if the exchange rate shifts significantly.

5. **API wait percentage reveals bottleneck balance** — Shows what fraction of session time was spent waiting for API responses vs. your own think/type time.
   - **How to apply:** High API% (>70%) means you're efficiently keeping the model busy. Low API% means you're the bottleneck — batch your prompts.

6. **Code velocity (+lines/-lines) gives a productivity pulse** — Green for additions, red for removals, tracked across the full session.

7. **ANSI color codes work; cursor movement codes don't** — Claude Code's statusbar renderer strips `\033[1A` and similar cursor-repositioning codes. Text ends up concatenated inline instead of moving. Add a new `echo` line for new display elements.
   - **How to apply:** Don't attempt cross-line layout tricks with cursor codes — they silently break output.

8. **The statusbar supports unlimited lines** — Each `echo` in the script adds one row. 3-line is a design choice, not a technical limit.

## Notable Commands / Code Snippets

**Setup prompt** — paste into a fresh Claude Code session:
```
Richte mir eine zweizeilige Claude Code Status Line ein. Speichere das folgende Script als ~/.claude/statusline-command.sh und konfiguriere meine settings.json.
```
(Full script included in source file)

**settings.json entry:**
```json
"statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}
```
Windows Git Bash variant: `"bash /c/Users/USERNAME/.claude/statusline-command.sh"`

**Test command:**
```bash
echo '{"model":{"display_name":"Test"},"context_window":{"used_percentage":42,...}}' | bash ~/.claude/statusline-command.sh
```

## Related Topics

claude-code, terminal, configuration, workflow, how-to, reference, status-line
