#!/usr/bin/env python3
"""Read and trim the user's Obsidian "AI Videos" note (the ingest queue).

The note lives in an iCloud-synced Obsidian vault. Sections are level-one
`#` headings. "Ingest next" (the default) is the ingest queue; "URL post"
is the queue of URLs to post on LinkedIn without an ingest. An entry is an
optional title line (bold, or a `##` heading: the user's own label), a URL,
and optional free-text remarks (questions, or the post's angle) on the URL
line or the lines below.

Usage:
  python scripts/obsidian-videos.py list [--section "URL post"]
  python scripts/obsidian-videos.py remove [--section "URL post"] <url-or-video-id>

`list` prints JSON:
  {"status": "ok", "note": "<path>", "entries": [
     {"n": 1, "title": "...", "url": "...", "video_id": "...",
      "remarks": "...", "duplicate": ["sources/youtube/<slug>.md", ...]}]}
`duplicate` lists wiki files with that video for Ingest next, and LinkedIn
posts (`linkedin/posts/`) with that URL for URL post.
`remove` deletes that entry from the chosen section and prints
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
DEFAULT_SECTION = "Ingest next"
NOTE_STEM = "aivideos"

URL_RE = re.compile(r"https?://[^\s)\]>]+")
MD_LINK_RE = re.compile(r"\[([^\]]*)\]\((https?://[^)\s]+)\)")
BOLD_LINE_RE = re.compile(r"^\s*\*\*(.+?)\*\*\s*:?\s*$")
HEADING_RE = re.compile(r"^\s*(#{1,6})\s+(.*?)\s*$")
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


def queue_bounds(lines, section):
    """Return (start, end) line indexes of a section's body.

    Sections are level-one headings only: a `##` line inside a section is an
    entry title, not the end of the section.
    """
    start = None
    for i, line in enumerate(lines):
        m = HEADING_RE.match(line)
        if not m or len(m.group(1)) != 1:
            continue
        if start is not None:
            return start, i
        if norm(m.group(2)) == norm(section):
            start = i + 1
    if start is None:
        fail(f"The note has no '# {section}' heading.")
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
        heading = HEADING_RE.match(line)
        label = bold.group(1) if bold else heading.group(2) if heading else None
        urls = URL_RE.findall(line)
        if label is not None or (urls and cur is not None and cur["url"]) or (urls and cur is None):
            close(i)
            cur = {"start": i, "title": label.strip().rstrip(":").strip() if label else "",
                   "url": None, "remarks": []}
            if label is not None:
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


def duplicates(url, section):
    needle = video_id(url) or url
    hits = []
    folders = ("linkedin/posts",) if norm(section) != norm(DEFAULT_SECTION) else ("sources", "summaries")
    for folder in folders:
        if not (REPO / folder).is_dir():
            continue
        for p in (REPO / folder).rglob("*.md"):
            try:
                if needle in p.read_text(encoding="utf-8"):
                    hits.append(str(p.relative_to(REPO)))
            except OSError:
                pass
    return sorted(hits)


def load(section):
    note = find_note()
    lines = note.read_text(encoding="utf-8").split("\n")
    start, end = queue_bounds(lines, section)
    return note, lines, parse_entries(lines, start, end)


def cmd_list(section):
    note, _, entries = load(section)
    out = []
    for n, e in enumerate(entries, 1):
        out.append({
            "n": n,
            "title": e["title"],
            "url": canonical(e["url"]),
            "video_id": video_id(e["url"]),
            "remarks": " ".join(e["remarks"]),
            "duplicate": duplicates(e["url"], section),
        })
    print(json.dumps({"status": "ok", "note": str(note), "entries": out},
                     ensure_ascii=False, indent=2))


def cmd_remove(section, target):
    note, lines, entries = load(section)
    key = video_id(target) or target
    matches = [e for e in entries
               if (video_id(e["url"]) or e["url"]) == key or e["url"] == target]
    if len(matches) != 1:
        fail(f"Expected one {section} entry for {target}, found {len(matches)}.")
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
    args = list(argv[1:])
    section = DEFAULT_SECTION
    if "--section" in args:
        i = args.index("--section")
        if i + 1 >= len(args):
            fail("--section needs a heading name, e.g. --section \"URL post\"")
        section = args[i + 1]
        del args[i:i + 2]
    if args == ["list"]:
        cmd_list(section)
    elif len(args) == 2 and args[0] == "remove":
        cmd_remove(section, args[1])
    else:
        fail('usage: obsidian-videos.py list [--section "URL post"] | '
             'remove [--section "URL post"] <url-or-video-id>')


if __name__ == "__main__":
    main(sys.argv)
