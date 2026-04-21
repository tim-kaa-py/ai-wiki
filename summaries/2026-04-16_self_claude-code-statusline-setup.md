---
title: "Claude Code Status Line — Context Awareness + Rate Limit Dashboard"
source_type: "article"
channel: "self"
date: "2026-04-16"
url: ""
pillar: "building"
tags: [claude-code, workflow, how-to, reference, terminal, configuration, status-line]
ingested: "2026-04-16"
source_file: "sources/articles/2026-04-16_self_claude-code-statusline-setup.md"
---

# Claude Code Status Line — Summary

**Source:** self | 2026-04-16 | user-authored

## TL;DR

A ready-to-paste prompt that sets up a two-line status bar at the bottom of Claude Code showing context window usage, session cost in EUR, rate limit burn rates with sustainability indicators, git branch, and code velocity — giving you live situational awareness without leaving the terminal.

## Key Takeaways

1. **Context window has three zones** — green (0-19%, standard 200k window), yellow (20-69%, extended context / compaction territory), red (70%+, approaching limit). The thresholds are tuned for Opus's 1M context window.
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
