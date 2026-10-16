#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash). Runs the repo's validator before any
# `git commit` and blocks the commit (exit 2) when it fails, so a broken
# store never reaches history. Installed by claude-config-refresh.
CLAUDE_RESTRUCTURE_VALIDATOR="python3 scripts/okf-check.py && python3 -m unittest discover -s scripts/tests"
set -u

input="$(cat)"
command="$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null || true)"

case "$command" in
  *"git commit"*|*"git -c "*"commit"*) ;;
  *) exit 0 ;;
esac

[ -n "$CLAUDE_RESTRUCTURE_VALIDATOR" ] || exit 0
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

if out="$(cd "$root" && eval "$CLAUDE_RESTRUCTURE_VALIDATOR" 2>&1)"; then
  exit 0
fi

{
  echo "Validator failed; commit blocked. Fix these before committing:"
  echo "$out" | tail -40
} >&2
exit 2
