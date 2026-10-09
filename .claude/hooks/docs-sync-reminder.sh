#!/usr/bin/env bash
# PostToolUse hook (matcher: Edit|Write). When CLAUDE.md or anything under
# .claude/ changes, inject a reminder about the Self-Documentation Rule so
# docs/user-documentation.md and docs/concept.md get updated in the same
# response. Non-blocking: exit 0 with additionalContext JSON.
set -u

input="$(cat)"
file="$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)"

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
rel="${file#"$root"/}"

case "$rel" in
  CLAUDE.md|.claude/skills/*|.claude/rules/*|.claude/hooks/*|.claude/settings.json) ;;
  *) exit 0 ;;
esac

python3 - "$rel" <<'PY'
import json, sys
rel = sys.argv[1]
msg = (f"Self-Documentation Rule: `{rel}` changed. If this was a functional change "
       "(new/changed workflow step, guardrail, model routing, schema field, script, hook, "
       "or anything the user sees or must know), update docs/user-documentation.md and "
       "docs/concept.md in this same response per the routing table in CLAUDE.md. "
       "Typo/wording-only edits are exempt.")
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": msg}}))
PY
exit 0
