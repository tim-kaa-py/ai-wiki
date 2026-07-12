#!/usr/bin/env python3
"""One-shot: convert root index.md tables to OKF bullet lists and add okf_version."""
import re
from pathlib import Path

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
DESC_RE = re.compile(r'^description:\s*"(.*)"\s*$', re.MULTILINE)
FM_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)


def description_for(root, path):
    f = root / path
    if not f.exists():
        return ""
    m = FM_RE.match(f.read_text(encoding="utf-8"))
    if not m:
        return ""
    d = DESC_RE.search(m.group(1))
    return d.group(1) if d else ""


def convert(root, text):
    out = ['---', 'okf_version: "0.1"', '---', '']
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("|"):
            if s.startswith("|--") or re.match(r"\|\s*Date\s*\|", s):
                continue  # drop table headers/separators
            link = LINK_RE.search(s)
            if not link:
                continue
            title, path = link.group(1), link.group(2)
            desc = description_for(root, path)
            out.append(f"* [{title}]({path})" + (f" - {desc}" if desc else ""))
        elif s.startswith("- [") or s.startswith("* ["):
            link = LINK_RE.search(s)
            title, path = link.group(1), link.group(2)
            desc = description_for(root, path)
            # If no frontmatter description, preserve pre-existing inline description (em-dash or hyphen)
            if not desc:
                if " — " in s:
                    inline_desc = s.split(" — ", 1)[1]
                    out.append(f"- [{title}]({path}) — {inline_desc}")
                    continue
                elif " - " in s and not s.startswith("* ["):
                    # Preserve existing hyphen-based descriptions from dashes
                    inline_desc = s.split(" - ", 1)[1]
                    out.append(f"- [{title}]({path}) - {inline_desc}")
                    continue
            out.append(f"* [{title}]({path})" + (f" - {desc}" if desc else ""))
        else:
            out.append(line)
    return "\n".join(out).rstrip() + "\n"


def main():
    root = Path(__file__).resolve().parent.parent
    idx = root / "index.md"
    idx.write_text(convert(root, idx.read_text(encoding="utf-8")), encoding="utf-8")
    print("index.md converted")


if __name__ == "__main__":
    main()
