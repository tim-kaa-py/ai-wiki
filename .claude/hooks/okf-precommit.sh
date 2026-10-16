#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash). Blocks `git commit` when the OKF
# conformance check or the script unit tests fail, the same two checks CI
# runs, so a malformed source/summary/wiki file or a broken script never
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

if ! out="$(python3 "$root/scripts/okf-check.py" 2>&1)"; then
  {
    echo "OKF conformance check failed; commit blocked. Fix these before committing:"
    echo "$out"
  } >&2
  exit 2
fi

# A fresh copy of the wiki may have no tests yet; then the OKF check is the gate.
[ -d "$root/scripts/tests" ] || exit 0

if ! out="$( (cd "$root" && python3 -m unittest discover -s scripts/tests) 2>&1)"; then
  {
    echo "Script unit tests failed; commit blocked. Fix these before committing:"
    echo "$out" | tail -40
  } >&2
  exit 2
fi
exit 0
