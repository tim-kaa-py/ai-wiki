#!/bin/bash
# Daily AI briefing runner.
# Invoked by the Claude Code CLI routine or manually via: bash routines/run.sh

REPO="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$REPO/.env"

# Load .env if present
if [ -f "$ENV_FILE" ]; then
  set -a && source "$ENV_FILE" && set +a
fi

cd "$REPO"

claude --print "$(cat routines/daily-briefing.md)" \
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch"
