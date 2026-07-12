#!/usr/bin/env python3
"""One-shot: convert log.md ingest table to OKF log format."""
import re
from pathlib import Path

CREATION = {"INGEST", "BATCH-INGEST", "RE-INGEST"}


def parse_rows(text):
    rows, flagged = [], []
    for line in text.splitlines():
        if not line.startswith("|") or line.startswith("|--") or "| Date |" in line:
            continue
        cells = [c.strip() for c in line.strip().strip("|").split(" | ")]
        if len(cells) < 6:
            flagged.append(line)
            continue
        if len(cells) > 6:  # stray ' | ' inside a cell — merge extras into Updates
            cells = cells[:5] + [" | ".join(cells[5:])]
        rows.append(dict(zip(["date", "action", "source", "type", "tier", "updates"], cells)))
    return rows, flagged


def render(rows):
    out = ["# Ingest Log", "",
           "<!-- OKF log: date headings newest first, prose entries. Append-only. -->", ""]
    rows = sorted(rows, key=lambda r: r["date"], reverse=True)
    current = None
    for r in rows:
        if r["date"] != current:
            out += [f"## {r['date']}", ""]
            current = r["date"]
        prefix = "**Creation**" if r["action"].upper() in CREATION else "**Update**"
        parts = [p for p in [r["source"], f"({r['type']}, {r['tier']})" if r["type"] not in ("—", "") else None] if p]
        body = f"{prefix} {r['action']}: " + " ".join(parts)
        if r["updates"] and r["updates"] != "—":
            body += f" — {r['updates']}"
        out += [body, ""]
    return "\n".join(out).rstrip() + "\n"


def main():
    root = Path(__file__).resolve().parent.parent
    log = root / "log.md"
    rows, flagged = parse_rows(log.read_text(encoding="utf-8"))
    if flagged:
        print("MANUAL REVIEW NEEDED for rows:")
        for f in flagged:
            print("  " + f[:120])
    log.write_text(render(rows), encoding="utf-8")
    print(f"converted {len(rows)} rows")


if __name__ == "__main__":
    main()
