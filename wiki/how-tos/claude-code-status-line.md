---
title: "Claude Code Status Line Setup"
type: "how-to"
pillar: "building"
tags: [claude-code, terminal, configuration, workflow, status-line, how-to, reference]
sources:
  - "summaries/2026-04-16_self_claude-code-statusline-setup.md"
  - "summaries/2026-04-15_claude-docs_optimize-your-terminal-setup.md"
last_updated: "2026-04-16"
---

# Claude Code Status Line Setup

How to configure a two-line status bar at the bottom of Claude Code that provides live situational awareness: context window usage, session cost, rate limit sustainability, git branch, and code velocity.

## Why This Matters

Claude Code sessions can hit context limits and rate limits without warning. A status line dashboard makes these invisible constraints visible, letting you make informed decisions about when to wrap up, slow down, or start a new session. It is the terminal equivalent of a car's instrument cluster.

## Setup

1. Save the status line script to `~/.claude/statusline-command.sh`
2. Add the following to your Claude Code `settings.json`:

```json
"statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}
```

**Windows Git Bash variant:**
```json
"statusLine": {"type": "command", "command": "bash /c/Users/USERNAME/.claude/statusline-command.sh"}
```

3. Test with a mock JSON payload:
```bash
echo '{"model":{"display_name":"Test"},"context_window":{"used_percentage":42}}' | bash ~/.claude/statusline-command.sh
```

## Dashboard Indicators

### Context Window (Color-Coded Zones)

| Zone | Range | Meaning | Tuned for |
|------|-------|---------|-----------|
| Green | 0-19% | Standard 200k window, plenty of headroom | Opus 1M context |
| Yellow | 20-69% | Extended context / compaction territory | Consider wrapping up |
| Red | 70%+ | Approaching limit | Start a new session soon |

### Rate Limit Sustainability

The burn rate is calculated as usage% divided by elapsed hours. The reset timer is colored based on sustainability:

- **Green** (< 20%/h): Sustainable pace, no action needed
- **Red** (>= 20%/h): Unsustainable — slow down, switch tasks, or wait for reset

The `(Xh left)` estimate tells you exactly when you will hit the wall at the current pace.

### Burn Indicator (Lightning Bolt)

Appears when a single interaction consumed more than 5 percentage points of the 5-hour rate limit window. Persisted across invocations via a state file. When you see it, the last prompt was expensive — consider breaking large tasks into smaller steps.

### Session Cost (EUR)

Running cost displayed in EUR (configurable exchange rate via `USD_TO_EUR` variable in the script). Combined with the kilotokens (kT) counter, gives a sense of session efficiency.

### API Wait Percentage

Shows the fraction of session time spent waiting for API responses versus your own think/type time.

- **High API% (>70%)**: You are efficiently keeping the model busy
- **Low API%**: You are the bottleneck — batch your prompts

### Code Velocity (+/-)

Lines added (green) and removed (red), tracked across the full session. A lightweight productivity pulse.

## Behavioral Patterns to Watch

| Signal | What to do |
|--------|-----------|
| Context bar turns yellow | Consider wrapping up the current task or starting a new session |
| Rate limit timer turns red | Slow down, switch to a different task, or take a break |
| Lightning bolt appears | The last prompt was heavy; break subsequent tasks into smaller steps |
| API wait % drops below 50% | You are the bottleneck — prepare and batch your next set of prompts |
| Session cost spikes | Review whether the current approach is efficient; consider a more targeted prompt |

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Agentic Coding Workflow](agentic-coding-workflow.md)
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md)
