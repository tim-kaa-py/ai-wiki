#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash). Blocks `git commit` when the OKF
# conformance check fails, so a malformed source/summary/wiki file never
# reaches a commit. Exit 2 = block the tool call and show stderr to Claude.
set -u

input="$(cat)"
command="$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null || true)"

case "$command" in
  *"git commit"*|*"git -c "*"commit"*) ;;
  *) exit 0 ;;
esac

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
[ -f "$root/scripts/okf-check.py" ] || exit 0

if out="$(python3 "$root/scripts/okf-check.py" 2>&1)"; then
  exit 0
fi

{
  echo "OKF conformance check failed; commit blocked. Fix these before committing:"
  echo "$out"
} >&2
exit 2
