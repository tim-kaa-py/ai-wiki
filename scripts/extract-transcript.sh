#!/usr/bin/env bash
set -euo pipefail

# Usage: extract-transcript.sh <youtube-url> <output-slug>
# Extracts auto/manual English subtitles and outputs clean text to stdout.
# Prints "NO_CAPTIONS" if no subtitles are found.

URL="${1:?Usage: extract-transcript.sh <youtube-url> <output-slug>}"
SLUG="${2:?Usage: extract-transcript.sh <youtube-url> <output-slug>}"

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

# Try to download subtitles (manual first, then auto-generated)
yt-dlp --skip-download \
  --write-subs --write-auto-subs \
  --sub-lang "en.*" \
  --sub-format ttml \
  --convert-subs srt \
  -o "$TMPDIR/$SLUG" \
  "$URL" 2>/dev/null || true

# Find any resulting .srt file
SRT_FILE=$(find "$TMPDIR" -name "*.srt" -type f | head -1)

if [[ -z "$SRT_FILE" ]]; then
  echo "NO_CAPTIONS"
  exit 0
fi

# Strip SRT formatting: sequence numbers, timestamps, HTML tags, blank lines
sed -E '
  /^[0-9]+$/d
  /^[0-9]{2}:[0-9]{2}:[0-9]{2}/d
  s/<[^>]+>//g
  /^[[:space:]]*$/d
' "$SRT_FILE" | awk '!seen[$0]++'
