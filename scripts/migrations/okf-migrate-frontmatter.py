#!/usr/bin/env python3
"""One-shot OKF frontmatter migration. Edits frontmatter lines only;
bodies stay byte-identical. Idempotent."""
import re
from pathlib import Path

FM_RE = re.compile(r"\A(---\n)(.*?)(\n---\n)", re.DOTALL)


def _edit_fm(text, fn):
    m = FM_RE.match(text)
    if not m:
        return text
    return m.group(1) + fn(m.group(2)) + m.group(3) + text[m.end():]


def _common(fm):
    fm = re.sub(r"^url:", "resource:", fm, flags=re.M)
    fm = re.sub(r"^ingested:", "timestamp:", fm, flags=re.M)
    return fm


def migrate_source(text):
    def fn(fm):
        fm = re.sub(r'^source_type:\s*"?([\w-]+)"?\s*$', r'type: "\1"', fm, flags=re.M)
        return _common(fm)
    return _edit_fm(text, fn)


def migrate_summary(text):
    def fn(fm):
        fm = re.sub(r"^source_type:.*$", 'type: "summary"', fm, flags=re.M)
        return _common(fm)
    return _edit_fm(text, fn)


def migrate_wiki(text):
    def fn(fm):
        return re.sub(r"^last_updated:", "timestamp:", fm, flags=re.M)
    return _edit_fm(text, fn)


def main():
    root = Path(__file__).resolve().parent.parent
    jobs = [("sources", migrate_source), ("summaries", migrate_summary), ("wiki", migrate_wiki)]
    changed = 0
    for d, fn in jobs:
        for f in sorted((root / d).rglob("*.md")):
            old = f.read_text(encoding="utf-8")
            new = fn(old)
            if new != old:
                f.write_text(new, encoding="utf-8")
                changed += 1
    print(f"migrated {changed} files")


if __name__ == "__main__":
    main()
