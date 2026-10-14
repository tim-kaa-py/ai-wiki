#!/usr/bin/env python3
"""Read and trim the user's Obsidian "AI Videos" note (the ingest queue).

The note lives in an iCloud-synced Obsidian vault. Entries sit under `#`
headings; only the "Ingest next" section is the queue. An entry is a bold
title line (the user's own label), a URL, and optional free-text remarks
(questions, angles) on the URL line or the lines below.

Usage:
  python scripts/obsidian-videos.py list
  python scripts/obsidian-videos.py remove <url-or-video-id>

`list` prints JSON:
  {"status": "ok", "note": "<path>", "entries": [
     {"n": 1, "title": "...", "url": "...", "video_id": "...",
      "remarks": "...", "duplicate": ["sources/youtube/<slug>.md", ...]}]}
`remove` deletes that entry from the Ingest next section and prints
  {"status": "ok", "removed": "<entry text as it was>"}
Errors print {"status": "error", "message": "..."} and exit 1.

Set AI_VIDEOS_NOTE to a path to skip the vault search.
Standard library only.
"""

import json
import os
import re
import sys
from pathlib import Path

VAULTS = Path.home() / "Library/Mobile Documents/iCloud~md~obsidian/Documents"
REPO = Path(__file__).resolve().parent.parent
QUEUE_HEADING = "ingestnext"
NOTE_STEM = "aivideos"

URL_RE = re.compile(r"https?://[^\s)\]>]+")
MD_LINK_RE = re.compile(r"\[([^\]]*)\]\((https?://[^)\s]+)\)")
BOLD_LINE_RE = re.compile(r"^\s*\*\*(.+?)\*\*\s*:?\s*$")
HEADING_RE = re.compile(r"^\s*#{1,6}\s+(.*?)\s*$")
YT_ID_RE = re.compile(r"(?:[?&]v=|youtu\.be/|/shorts/|/live/)([A-Za-z0-9_-]{11})")


def norm(text):
    return re.sub(r"[^a-z0-9]", "", text.lower())


def find_note():
    override = os.environ.get("AI_VIDEOS_NOTE")
    if override:
        path = Path(override).expanduser()
        if not path.is_file():
            fail(f"AI_VIDEOS_NOTE points to a missing file: {path}")
        return path
    if not VAULTS.is_dir():
        fail(f"No iCloud Obsidian folder at {VAULTS}. Is Obsidian syncing through iCloud?")
    hits = [p for p in VAULTS.rglob("*.md")
            if norm(p.stem) == NOTE_STEM and ".trash" not in p.parts]
    if not hits:
        fail(f"No note named like 'AI Videos' under {VAULTS}.")
    if len(hits) > 1:
        fail("Several 'AI Videos' notes found; set AI_VIDEOS_NOTE to one of: "
             + ", ".join(str(p) for p in hits))
    return hits[0]


def video_id(url):
    m = YT_ID_RE.search(url)
    return m.group(1) if m else None


def canonical(url):
    vid = video_id(url)
    return f"https://www.youtube.com/watch?v={vid}" if vid else url


def queue_bounds(lines):
    """Return (start, end) line indexes of the Ingest next section body."""
    start = None
    for i, line in enumerate(lines):
        m = HEADING_RE.match(line)
        if not m:
            continue
        if start is not None:
            return start, i
        if norm(m.group(1)) == QUEUE_HEADING:
            start = i + 1
    if start is None:
        fail("The note has no '# Ingest next' heading.")
    return start, len(lines)


def parse_entries(lines, start, end):
    """Split the section into entries; each keeps its line span."""
    entries, cur = [], None

    def close(at):
        if cur is not None:
            cur["end"] = at
            entries.append(cur)

    for i in range(start, end):
        line = lines[i]
        bold = BOLD_LINE_RE.match(line)
        urls = URL_RE.findall(line)
        if bold or (urls and cur is not None and cur["url"]) or (urls and cur is None):
            close(i)
            cur = {"start": i, "title": bold.group(1).strip().rstrip(":").strip() if bold else "",
                   "url": None, "remarks": []}
            if bold:
                continue
        if cur is None:
            continue
        if urls and not cur["url"]:
            cur["url"] = urls[0]
        rest = MD_LINK_RE.sub("", line)
        rest = URL_RE.sub("", rest).strip()
        if rest:
            cur["remarks"].append(rest)
    close(end)

    # Trailing blank lines belong to the gap, not the entry.
    for e in entries:
        while e["end"] > e["start"] + 1 and not lines[e["end"] - 1].strip():
            e["end"] -= 1
    return [e for e in entries if e["url"]]


def duplicates(url):
    needle = video_id(url) or url
    hits = []
    for folder in ("sources", "summaries"):
        for p in (REPO / folder).rglob("*.md"):
            try:
                if needle in p.read_text(encoding="utf-8"):
                    hits.append(str(p.relative_to(REPO)))
            except OSError:
                pass
    return sorted(hits)


def load():
    note = find_note()
    lines = note.read_text(encoding="utf-8").split("\n")
    start, end = queue_bounds(lines)
    return note, lines, parse_entries(lines, start, end)


def cmd_list():
    note, _, entries = load()
    out = []
    for n, e in enumerate(entries, 1):
        out.append({
            "n": n,
            "title": e["title"],
            "url": canonical(e["url"]),
            "video_id": video_id(e["url"]),
            "remarks": " ".join(e["remarks"]),
            "duplicate": duplicates(e["url"]),
        })
    print(json.dumps({"status": "ok", "note": str(note), "entries": out},
                     ensure_ascii=False, indent=2))


def cmd_remove(target):
    note, lines, entries = load()
    key = video_id(target) or target
    matches = [e for e in entries
               if (video_id(e["url"]) or e["url"]) == key or e["url"] == target]
    if len(matches) != 1:
        fail(f"Expected one Ingest next entry for {target}, found {len(matches)}.")
    e = matches[0]
    removed = "\n".join(lines[e["start"]:e["end"]])
    # Drop the blank gap after the entry too, so the note doesn't grow holes.
    stop = e["end"]
    while stop < len(lines) and not lines[stop].strip() and not HEADING_RE.match(lines[stop]):
        stop += 1
    keep_gap = lines[e["end"]:stop][:1] if stop < len(lines) else []
    new = lines[:e["start"]] + keep_gap + lines[stop:]
    tmp = note.with_suffix(".md.tmp")
    tmp.write_text("\n".join(new), encoding="utf-8")
    tmp.replace(note)
    print(json.dumps({"status": "ok", "removed": removed}, ensure_ascii=False))


def fail(message):
    print(json.dumps({"status": "error", "message": message}))
    sys.exit(1)


def main(argv):
    if len(argv) == 2 and argv[1] == "list":
        cmd_list()
    elif len(argv) == 3 and argv[1] == "remove":
        cmd_remove(argv[2])
    else:
        fail("usage: obsidian-videos.py list | remove <url-or-video-id>")


if __name__ == "__main__":
    main(sys.argv)
