---
title: "Claude Code Status Line — Context Awareness + Rate Limit Dashboard"
source_type: "article"
channel: "self"
date: "2026-04-16"
url: ""
pillar: "building"
tags: [claude-code, workflow, how-to, reference, terminal, configuration, status-line]
ingested: "2026-04-16"
extraction_method: "user-pasted"
---

# Claude Code Status Line — Context Awareness + Rate Limit Dashboard

Wer hat Bock auf mehr Context Awareness und ne geile Status Bar? Zwei Zeilen am unteren Rand eures Claude Code Terminals die euch live zeigen wie es um euren Context, eure Rate Limits und eure Session-Produktivitaet steht.

## Was die Status Line anzeigt

**Zeile 1 — Context Health + Identity:**
```
Opus 4.6  ████████░░░░░░░░░░░░ 35%  201.0 kT | ~1.47€  │  main  ~/local_dev/MeinProjekt
```

| Segment | Beschreibung |
|---------|-------------|
| `Opus 4.6` | Aktuelles Model (gekuerzt) |
| `████████░░░░░░░░░░░░ 35%` | Context-Window-Auslastung als farbiger Balken |
| `201.0 kT` | Token-Verbrauch der Session in Kilotokens |
| `~1.47€` | Geschaetzte Session-Kosten in Euro (USD x 0.88) |
| `main` | Git Branch (cyan — faellt bei Worktrees sofort auf) |
| `~/local_dev/...` | Arbeitsverzeichnis |

**Farbschema Context-Balken:**
- **Gruen:** 0-19% — innerhalb des Standard-200k-Opus-Fensters, volle Qualitaet
- **Gelb:** 20-69% — Extended Context, Compaction moeglich
- **Rot:** 70%+ — Compaction-Zone, Session naehert sich dem Limit

**Zeile 2 — Rate Limits + Produktivitaet:**
```
5h ███░░░░░░░░░░░░ 24% reset 2h 20m  │  7d █████████░░░░░░ 64% ~1.7d  │  58m  +68 -24  API 51%
```

| Segment | Beschreibung |
|---------|-------------|
| `5h ███░░░ 24%` | 5-Stunden-Rate-Limit (gruen <60%, gelb 60-79%, rot 80%+) |
| `reset 2h 20m` | Countdown bis Reset — **gruen** = nachhaltig (<20%/h), **rot** = nicht nachhaltig |
| `(1.3h left)` | Nur bei rot: Stunden bis zum Limit bei aktuellem Tempo |
| `⚡` | Burn-Indikator: erscheint wenn letzte Interaktion >5 Prozentpunkte 5h-Limit verbraucht hat |
| `7d ████████░░ 64%` | 7-Tage-Rate-Limit |
| `~1.7d` | Geschaetzte Tage verbleibend bei aktuellem Verbrauch |
| `58m` | Session-Dauer |
| `+68 -24` | Code-Velocity: Zeilen hinzugefuegt (gruen) / entfernt (rot) |
| `API 51%` | Anteil API-Wartezeit an Gesamtdauer |

## Copy-Paste Prompt fuer Claude Code

Einfach in eine neue Claude Code Session pasten — Claude macht den Rest:

````
Richte mir eine zweizeilige Claude Code Status Line ein. Speichere das folgende Script als ~/.claude/statusline-command.sh und konfiguriere meine settings.json.

Hier ist das fertige Script — NICHT veraendern, exakt so speichern:

```bash
#!/usr/bin/env bash
STATE_FILE="$HOME/.claude/.statusline-rl5h-last"
input=$(cat)
USD_TO_EUR=0.88
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
eval "$(echo "$input" | python -c "
import sys, json, time, re
try:
    d = json.load(sys.stdin)
    cw = d.get('context_window', {})
    rl = d.get('rate_limits', {})
    co = d.get('cost', {})
    fh = rl.get('five_hour', {})
    sd = rl.get('seven_day', {})
    model_name = d.get('model',{}).get('display_name','')
    model_name = re.sub(r'\s*\x28.*?\x29\s*', '', model_name).strip()
    print(f'model={json.dumps(model_name)}')
    raw_cwd = d.get('workspace',{}).get('current_dir',d.get('cwd',''))
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
    print(f'ctx_pct={json.dumps(str(cw.get(\"used_percentage\",\"\")))}')
    print(f'cost_usd={json.dumps(str(co.get(\"total_cost_usd\",\"\")))}')
    ti = cw.get('total_input_tokens', 0)
    to = cw.get('total_output_tokens', 0)
    total_kt = (ti + to) / 1000.0
    print(f'total_kt={json.dumps(f\"{total_kt:.1f}\")}')
    dur_ms = co.get('total_duration_ms', 0)
    if dur_ms:
        dur_s = dur_ms / 1000
        h = int(dur_s // 3600)
        m = int((dur_s % 3600) // 60)
        print(f'session_time={json.dumps(f\"{h}h {m}m\" if h > 0 else f\"{m}m\")}')
    else:
        print('session_time=\"\"')
    la = co.get('total_lines_added', 0)
    lr = co.get('total_lines_removed', 0)
    print(f'lines_added={json.dumps(str(la))}')
    print(f'lines_removed={json.dumps(str(lr))}')
    api_ms = co.get('total_api_duration_ms', 0)
    if dur_ms and dur_ms > 0:
        api_pct = int(round(api_ms / dur_ms * 100))
        print(f'api_pct={json.dumps(str(api_pct))}')
    else:
        print('api_pct=\"\"')
    print(f'rl5h_pct={json.dumps(str(fh.get(\"used_percentage\",\"\")))}')
    print(f'rl7d_pct={json.dumps(str(sd.get(\"used_percentage\",\"\")))}')
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
RST=$'\e[0m'
GREEN=$'\e[92m'
YELLOW=$'\e[93m'
RED=$'\e[91m'
DIM=$'\e[2m'
CYAN=$'\e[96m'
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
line1="${model}"
if [ -n "$ctx_pct" ] && [ "$ctx_pct" != "" ]; then
  ctx_int=$(printf '%.0f' "$ctx_pct")
  build_bar "$ctx_int" 20 20 70
  line1+="  ${BAR_RESULT}"
fi
if [ -n "$total_kt" ] && [ "$total_kt" != "" ]; then
  line1+="  ${DIM}${total_kt} kT${RST}"
fi
if [ -n "$cost_usd" ] && [ "$cost_usd" != "" ]; then
  cost_eur=$(python -c "print(f'{${cost_usd} * ${USD_TO_EUR}:.2f}')" 2>/dev/null)
  line1+=" ${DIM}| ~${cost_eur}€${RST}"
fi
line1+="  ${DIM}│${RST}"
if [ -n "$git_branch" ]; then
  line1+="  ${CYAN}${git_branch}${RST}"
fi
line1+="  ${cwd}"
burn_indicator=""
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
fi
line2=""
if [ -n "$rl5h_pct" ] && [ "$rl5h_pct" != "" ]; then
  build_bar "$rl5h_int" 15
  line2+="${DIM}5h${RST} ${BAR_RESULT}"
  if [ -n "$rl5h_reset" ] && [ "$rl5h_reset" != "" ]; then
    if [ "$rl5h_sustainable" = "1" ]; then
      line2+=" ${GREEN}reset ${rl5h_reset}${RST}"
    else
      line2+=" ${RED}reset ${rl5h_reset}${RST}"
      if [ -n "$rl5h_hours_left" ] && [ "$rl5h_hours_left" != "" ]; then
        line2+=" ${RED}(${rl5h_hours_left}h left)${RST}"
      fi
    fi
  fi
  line2+="${burn_indicator}"
fi
if [ -n "$rl7d_pct" ] && [ "$rl7d_pct" != "" ]; then
  rl7d_int=$(printf '%.0f' "$rl7d_pct")
  build_bar "$rl7d_int" 15
  if [ -n "$line2" ]; then line2+="  ${DIM}│${RST}  "; fi
  line2+="${DIM}7d${RST} ${BAR_RESULT}"
  if [ -n "$rl7d_days" ] && [ "$rl7d_days" != "" ]; then
    line2+=" ${DIM}~${rl7d_days}d${RST}"
  fi
fi
prod=""
if [ -n "$session_time" ] && [ "$session_time" != "" ]; then
  prod+="${DIM}${session_time}${RST}"
fi
if [ -n "$lines_added" ] && [ "$lines_added" != "0" -o "$lines_removed" != "0" ]; then
  prod+="  ${GREEN}+${lines_added}${RST} ${RED}-${lines_removed}${RST}"
fi
if [ -n "$api_pct" ] && [ "$api_pct" != "" ]; then
  prod+="  ${DIM}API ${api_pct}%${RST}"
fi
if [ -n "$prod" ]; then
  line2+="  ${DIM}│${RST}  ${prod}"
fi
echo "${line1}"
echo -n "${line2}"
```

Deine Aufgaben:

1. Speichere das Script exakt wie oben als ~/.claude/statusline-command.sh
2. Lies meine ~/.claude/settings.json und ergaenze den statusLine-Eintrag (bestehende Eintraege NICHT ueberschreiben):
   "statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}
   Auf Windows mit Git Bash den Pfad anpassen: "bash /c/Users/MEIN_USERNAME/.claude/statusline-command.sh"
3. Teste das Script mit folgendem Befehl und pruefe dass zwei Zeilen ausgegeben werden:
   echo '{"model":{"display_name":"Test"},"context_window":{"used_percentage":42,"total_input_tokens":100000,"total_output_tokens":50000},"cost":{"total_cost_usd":1.50,"total_duration_ms":600000,"total_api_duration_ms":300000,"total_lines_added":50,"total_lines_removed":10},"rate_limits":{"five_hour":{"used_percentage":30,"resets_at":9999999999},"seven_day":{"used_percentage":55,"resets_at":9999999999}},"workspace":{"current_dir":"."}}' | bash ~/.claude/statusline-command.sh

Die Status Line wird ab der naechsten Session sichtbar.
````
