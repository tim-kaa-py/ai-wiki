---
title: "Claude Code Status Line — Context Awareness + Rate Limit Dashboard"
type: "article"
channel: "self"
date: "2026-04-16"
resource: ""
pillar: "building"
tags: [claude-code, workflow, how-to, reference, terminal, configuration, status-line]
timestamp: "2026-04-16"
extraction_method: "user-pasted"
---

> **Maintenance note:** This file is the single source of truth for the status line setup. When the script or layout changes, update this file and the referencing wiki pages (`wiki/how-tos/claude-code-status-line.md`, `summaries/2026-04-16_self_claude-code-statusline-setup.md`). Do not create a new ingest — update in place.

# Claude Code Status Line — Context Awareness + Rate Limit Dashboard

Want more context awareness and a useful status bar? Three lines at the bottom of your Claude Code terminal showing live context usage, rate limits, session cost, and productivity — without ever leaving the terminal.

## What the Status Line Shows

Three lines, organized by information priority:

**Line 1 — Identity + Critical Limits:**
```
Opus 4.7 · medium  │  ████████░░░░░░░░░░░░ 35%  │  5h ███░░░░░░░░░░░░ 24% reset 2h 20m ⚡
```

| Segment | Description |
|---------|-------------|
| `Opus 4.7` | Current model (shortened) |
| `· medium` | Current thinking effort level (low=dim, medium=green, high=yellow, xhigh=red). Source: `CLAUDE_CODE_EFFORT_LEVEL` env var → `effortLevel` in `~/.claude/settings.json` |
| `████████░░░░░░░░░░░░ 35%` | Context window usage as a color-coded bar (model-aware thresholds, see below) |
| `5h ███░░░ 24%` | 5-hour rate limit (green <60%, yellow 60-79%, red 80%+) |
| `reset 2h 20m` | Countdown to reset — **green** = sustainable (<20%/h), **red** = unsustainable |
| `⚡` | Burn indicator: appears when the last interaction consumed >5 percentage points of the 5h limit |

**Line 2 — Cost + 7-Day Limit + Session Productivity:**
```
(1.3h left)  │  201.0 kT ~1.47€  │  7d █████████░░░░░░ 64% ~1.7d  │  API 51%
```

| Segment | Description |
|---------|-------------|
| `(1.3h left)` | Only when red: estimated hours until the 5h limit at current burn rate |
| `201.0 kT` | Session token consumption in kilotokens |
| `~1.47€` | Estimated session cost in EUR (USD × 0.88) |
| `7d ████████░░ 64%` | 7-day rate limit |
| `~1.7d` | Estimated days remaining at current consumption rate |
| `API 51%` | Share of session time spent waiting for API responses |

**Line 3 — Session Time + Location:**
```
58m  │  main  ~/local_dev/MyProject
```

| Segment | Description |
|---------|-------------|
| `58m` | Session duration |
| `main` | Git branch (cyan — worktrees stand out immediately) |
| `~/local_dev/...` | Working directory (own line — zero overflow risk on deep paths) |

**Context Bar Color Thresholds (model-aware):**

| Model | Green | Yellow | Red |
|-------|-------|--------|-----|
| Opus | 0–19% | 20–69% | 70%+ |
| Sonnet / Haiku | 0–49% | 50–89% | 90%+ |

Detection via string match on the model display name — 4 lines of bash, no new parsing needed.

**Renderer limits:** Claude Code supports ANSI **color** codes fully. ANSI **cursor movement** codes (`\033[1A` etc.) are stripped — cross-line alignment is not possible. For new elements: add a new `echo` line, no cursor tricks.

## Copy-Paste Prompt for Claude Code

Just paste this into a fresh Claude Code session — Claude handles the rest:

````
Set up a three-line Claude Code status line. Save the following script as ~/.claude/statusline-command.sh and configure my settings.json.

Here is the finished script — do NOT modify it, save exactly as shown:

```bash
#!/usr/bin/env bash
# Claude Code status line — three-line display
# Line 1: model · effort │ context bar │ 5h rate limit + reset + burn ⚡
# Line 2: (Xh left warning when unsustainable) │ tokens + cost │ 7d rate limit + reset │ API%
# Line 3: session time  │  git branch  full cwd

STATE_FILE="$HOME/.claude/.statusline-rl5h-last"
input=$(cat)

# USD to EUR conversion rate (adjust as needed)
USD_TO_EUR=0.88

# Git branch (fast — reads file directly, falls back to command)
git_branch=""
git_dir=$(git rev-parse --git-dir 2>/dev/null)
if [ -n "$git_dir" ]; then
  head_content=$(cat "$git_dir/HEAD" 2>/dev/null)
  if [[ "$head_content" == ref:* ]]; then
    git_branch="${head_content#ref: refs/heads/}"
  else
    git_branch="${head_content:0:7}"
  fi
fi

# Parse all JSON fields via python
eval "$(echo "$input" | python -c "
import sys, json, time, re
try:
    d = json.load(sys.stdin)
    cw = d.get('context_window', {})
    rl = d.get('rate_limits', {})
    co = d.get('cost', {})
    fh = rl.get('five_hour', {})
    sd = rl.get('seven_day', {})
    # Shorten model name: drop parenthesized suffix
    model_name = d.get('model',{}).get('display_name','')
    model_name = re.sub(r'\s*\x28.*?\x29\s*', '', model_name).strip()
    print(f'model={json.dumps(model_name)}')
    # CWD: last segment with ~/
    raw_cwd = d.get('workspace',{}).get('current_dir',d.get('cwd',''))
    parts = re.split(r'[/\\\\]+', raw_cwd)
    # Fix double-encoded UTF-8 (ü → Ã¼) then show as ~/...
    import os
    try:
        raw_cwd = raw_cwd.encode('latin-1').decode('utf-8')
    except (UnicodeDecodeError, UnicodeEncodeError):
        pass
    home = os.path.expanduser('~').replace(chr(92), '/')
    normalized = raw_cwd.replace(chr(92), '/')
    if normalized.lower().startswith(home.lower()):
        short_cwd = '~' + normalized[len(home):]
    else:
        short_cwd = normalized
    print(f'cwd={json.dumps(short_cwd)}')
    # Context window
    print(f'ctx_pct={json.dumps(str(cw.get(\"used_percentage\",\"\")))}')
    print(f'cost_usd={json.dumps(str(co.get(\"total_cost_usd\",\"\")))}')
    # Total tokens
    ti = cw.get('total_input_tokens', 0)
    to = cw.get('total_output_tokens', 0)
    total_kt = (ti + to) / 1000.0
    print(f'total_kt={json.dumps(f\"{total_kt:.1f}\")}')
    # Session timer
    dur_ms = co.get('total_duration_ms', 0)
    if dur_ms:
        dur_s = dur_ms / 1000
        h = int(dur_s // 3600)
        m = int((dur_s % 3600) // 60)
        print(f'session_time={json.dumps(f\"{h}h {m}m\" if h > 0 else f\"{m}m\")}')
    else:
        print('session_time=\"\"')
    # Code velocity
    la = co.get('total_lines_added', 0)
    lr = co.get('total_lines_removed', 0)
    print(f'lines_added={json.dumps(str(la))}')
    print(f'lines_removed={json.dumps(str(lr))}')
    # API speed
    api_ms = co.get('total_api_duration_ms', 0)
    if dur_ms and dur_ms > 0:
        api_pct = int(round(api_ms / dur_ms * 100))
        print(f'api_pct={json.dumps(str(api_pct))}')
    else:
        print('api_pct=\"\"')
    # Rate limits
    print(f'rl5h_pct={json.dumps(str(fh.get(\"used_percentage\",\"\")))}')
    print(f'rl7d_pct={json.dumps(str(sd.get(\"used_percentage\",\"\")))}')
    # 7d days remaining extrapolation + reset countdown
    sd_resets = sd.get('resets_at', 0)
    sd_pct = sd.get('used_percentage', 0)
    if sd_resets and sd_pct > 0:
        window_start = sd_resets - 7*24*3600
        elapsed_h = max(1, (time.time() - window_start) / 3600)
        remaining_pct = 100 - sd_pct
        burn_rate = sd_pct / elapsed_h
        days_left = (remaining_pct / burn_rate) / 24 if burn_rate > 0 else 99
        print(f'rl7d_days={json.dumps(f\"{days_left:.1f}\")}')
    else:
        print('rl7d_days=\"\"')
    if sd_resets:
        diff7 = max(0, sd_resets - time.time())
        d7 = int(diff7 // 86400)
        h7 = int((diff7 % 86400) // 3600)
        m7 = int((diff7 % 3600) // 60)
        if d7 > 0:
            print(f'rl7d_reset={json.dumps(f\"{d7}d {h7}h\")}')
        elif h7 > 0:
            print(f'rl7d_reset={json.dumps(f\"{h7}h {m7}m\")}')
        else:
            print(f'rl7d_reset={json.dumps(f\"{m7}m\")}')
    else:
        print('rl7d_reset=\"\"')
    # Time until 5h reset + sustainability check
    resets = fh.get('resets_at', 0)
    fh_pct = fh.get('used_percentage', 0)
    if resets:
        diff = max(0, resets - time.time())
        h = int(diff // 3600)
        m = int((diff % 3600) // 60)
        print(f'rl5h_reset={json.dumps(f\"{h}h {m}m\")}')
        elapsed_h = max(0.1, (5*3600 - diff) / 3600)
        burn_rate = fh_pct / elapsed_h
        sustainable = burn_rate < 20
        print(f'rl5h_sustainable={json.dumps(\"1\" if sustainable else \"0\")}')
        if not sustainable and burn_rate > 0:
            h_left = (100 - fh_pct) / burn_rate
            print(f'rl5h_hours_left={json.dumps(f\"{h_left:.1f}\")}')
        else:
            print('rl5h_hours_left=\"\"')
    else:
        print('rl5h_reset=\"\"')
        print('rl5h_sustainable=\"\"')
        print('rl5h_hours_left=\"\"')
except:
    pass
" 2>/dev/null)"

# ANSI codes
RST=$'\e[0m'
GREEN=$'\e[92m'
YELLOW=$'\e[93m'
RED=$'\e[91m'
DIM=$'\e[2m'
CYAN=$'\e[96m'

# Helper: build a colored bar with custom thresholds
build_bar() {
  local pct=$1 width=$2 yellow_at=${3:-60} red_at=${4:-80} clr
  if [ "$pct" -ge "$red_at" ]; then clr="$RED"
  elif [ "$pct" -ge "$yellow_at" ]; then clr="$YELLOW"
  else clr="$GREEN"; fi

  local filled=$((pct * width / 100))
  local empty=$((width - filled))
  local bar=""
  for ((i=0; i<filled; i++)); do bar+="█"; done
  for ((i=0; i<empty; i++)); do bar+="░"; done
  BAR_RESULT="${clr}${bar}${RST} ${clr}${pct}%${RST}"
}

# Effort level: env var overrides, else read from user settings.json
effort="${CLAUDE_CODE_EFFORT_LEVEL:-}"
if [ -z "$effort" ]; then
  effort=$(python -c "
import json, os
try:
    with open(os.path.expanduser('~/.claude/settings.json')) as f:
        print(json.load(f).get('effortLevel',''))
except: pass
" 2>/dev/null)
fi

effort_colored=""
case "$effort" in
  low)    effort_colored="${DIM}${effort}${RST}" ;;
  medium) effort_colored="${GREEN}${effort}${RST}" ;;
  high)   effort_colored="${YELLOW}${effort}${RST}" ;;
  xhigh)  effort_colored="${RED}${effort}${RST}" ;;
  "")     ;;
  *)      effort_colored="${DIM}${effort}${RST}" ;;
esac

# === LINE 1: Model · effort │ Context bar │ 5h rate limit ===
line1="${model}"
if [ -n "$effort_colored" ]; then
  line1+=" ${DIM}·${RST} ${effort_colored}"
fi

# Context bar (thresholds vary by model: Sonnet/Haiku yellow@50 red@90, Opus yellow@20 red@70)
if [ -n "$ctx_pct" ] && [ "$ctx_pct" != "" ]; then
  ctx_int=$(printf '%.0f' "$ctx_pct")
  ctx_yellow=20; ctx_red=70
  if [[ "$model" == *"Sonnet"* ]] || [[ "$model" == *"Haiku"* ]]; then
    ctx_yellow=50; ctx_red=90
  fi
  build_bar "$ctx_int" 20 "$ctx_yellow" "$ctx_red"
  line1+="  ${DIM}│${RST}  ${BAR_RESULT}"
fi

# 5h rate limit (burn indicator computed here for line 1; "Xh left" warning goes to line 2)
burn_indicator=""
rl5h_warning=""
if [ -n "$rl5h_pct" ] && [ "$rl5h_pct" != "" ]; then
  rl5h_int=$(printf '%.0f' "$rl5h_pct")
  if [ -f "$STATE_FILE" ]; then
    prev=$(cat "$STATE_FILE" 2>/dev/null)
    if [ -n "$prev" ]; then
      delta=$((rl5h_int - prev))
      if [ "$delta" -gt 5 ]; then
        burn_indicator=" ${RED}⚡${RST}"
      fi
    fi
  fi
  echo "$rl5h_int" > "$STATE_FILE" 2>/dev/null
  build_bar "$rl5h_int" 15
  line1+="  ${DIM}│${RST}  ${DIM}5h${RST} ${BAR_RESULT}"
  if [ -n "$rl5h_reset" ] && [ "$rl5h_reset" != "" ]; then
    if [ "$rl5h_sustainable" = "1" ]; then
      line1+=" ${GREEN}reset ${rl5h_reset}${RST}"
    else
      line1+=" ${RED}reset ${rl5h_reset}${RST}"
      # Warning moves to start of line 2
      if [ -n "$rl5h_hours_left" ] && [ "$rl5h_hours_left" != "" ]; then
        rl5h_warning="${RED}(${rl5h_hours_left}h left)${RST}"
      fi
    fi
  fi
  line1+="${burn_indicator}"
fi

# === LINE 2: (Xh left warning) │ Tokens + cost │ 7d rate limit ===
line2=""

# 5h warning at start when unsustainable
if [ -n "$rl5h_warning" ]; then
  line2+="${rl5h_warning}"
fi

# Tokens + cost
if [ -n "$total_kt" ] && [ "$total_kt" != "" ]; then
  if [ -n "$line2" ]; then line2+="  ${DIM}│${RST}  "; fi
  line2+="${DIM}${total_kt} kT${RST}"
fi
if [ -n "$cost_usd" ] && [ "$cost_usd" != "" ]; then
  cost_eur=$(python -c "print(f'{${cost_usd} * ${USD_TO_EUR}:.2f}')" 2>/dev/null)
  line2+=" ${DIM}~${cost_eur}€${RST}"
fi

# 7d rate limit
if [ -n "$rl7d_pct" ] && [ "$rl7d_pct" != "" ]; then
  rl7d_int=$(printf '%.0f' "$rl7d_pct")
  build_bar "$rl7d_int" 15
  if [ -n "$line2" ]; then line2+="  ${DIM}│${RST}  "; fi
  line2+="${DIM}7d${RST} ${BAR_RESULT}"
  if [ -n "$rl7d_reset" ] && [ "$rl7d_reset" != "" ]; then
    line2+=" ${DIM}reset ${rl7d_reset}${RST}"
  fi
  if [ -n "$rl7d_days" ] && [ "$rl7d_days" != "" ]; then
    line2+=" ${DIM}~${rl7d_days}d${RST}"
  fi
fi

# API speed on line 2
if [ -n "$api_pct" ] && [ "$api_pct" != "" ]; then
  line2+="  ${DIM}│${RST}  ${DIM}API ${api_pct}%${RST}"
fi

# === LINE 3: Session time │ Git branch + full working directory ===
line3=""
if [ -n "$session_time" ] && [ "$session_time" != "" ]; then
  line3+="${DIM}${session_time}${RST}  ${DIM}│${RST}  "
fi

if [ -n "$git_branch" ]; then
  line3+="${CYAN}${git_branch}${RST}  "
fi
line3+="${cwd}"

# Output: three lines
echo "${line1}"
echo "${line2}"
echo -n "${line3}"
```

Your tasks:

1. Save the script exactly as shown above to ~/.claude/statusline-command.sh
2. Read my ~/.claude/settings.json and add the statusLine entry (do NOT overwrite existing entries):
   "statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}
   On Windows with Git Bash adjust the path: "bash /c/Users/YOUR_USERNAME/.claude/statusline-command.sh"
3. Test the script with the following command and verify that three lines are printed:
   echo '{"model":{"display_name":"Sonnet 4.6"},"context_window":{"used_percentage":42,"total_input_tokens":100000,"total_output_tokens":50000},"cost":{"total_cost_usd":1.50,"total_duration_ms":600000,"total_api_duration_ms":300000,"total_lines_added":50,"total_lines_removed":10},"rate_limits":{"five_hour":{"used_percentage":30,"resets_at":9999999999},"seven_day":{"used_percentage":55,"resets_at":9999999999}},"workspace":{"current_dir":"."}}' | bash ~/.claude/statusline-command.sh

The status line will be visible from the next session onwards.
````
