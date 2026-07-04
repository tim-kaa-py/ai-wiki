#!/usr/bin/env python3
"""OKF v0.1 conformance check for the ai-wiki bundle.

Bundle scope: sources/, summaries/, wiki/, root index.md, root log.md.
Checks: every non-reserved .md has a frontmatter block with a non-empty
`type`; log.md uses '## YYYY-MM-DD' headings; index.md contains no
frontmatter beyond an optional okf_version block at root.
Exit 0 = conformant. Exit 1 = violations printed one per line.
"""
import re
import sys
from pathlib import Path

BUNDLE_DIRS = ["sources", "summaries", "wiki"]
FM_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
TYPE_RE = re.compile(r'^type:\s*"?([^"\n]+)"?\s*$', re.MULTILINE)


def check_frontmatter(text):
    violations = []
    m = FM_RE.match(text)
    if not m:
        return ["no frontmatter block"]
    t = TYPE_RE.search(m.group(1))
    if not t or not t.group(1).strip():
        violations.append("missing or empty type field")
    return violations


def iter_bundle_files(root):
    files = []
    for d in BUNDLE_DIRS:
        files.extend(sorted((root / d).rglob("*.md")))
    return [f for f in files if f.name not in ("index.md", "log.md")]


def check_log(text):
    if not re.search(r"^## \d{4}-\d{2}-\d{2}$", text, re.MULTILINE):
        return ["log.md has no '## YYYY-MM-DD' date headings"]
    if re.search(r"^\|", text, re.MULTILINE):
        return ["log.md still contains table rows"]
    return []


def check_index(text):
    m = FM_RE.match(text)
    if m and not re.search(r"^okf_version:", m.group(1), re.MULTILINE):
        return ["root index.md frontmatter must only declare okf_version"]
    return []


def main():
    root = Path(__file__).resolve().parent.parent
    violations = []
    for f in iter_bundle_files(root):
        for v in check_frontmatter(f.read_text(encoding="utf-8")):
            violations.append(f"{f.relative_to(root)}: {v}")
    log = root / "log.md"
    if log.exists():
        violations += [f"log.md: {v}" for v in check_log(log.read_text(encoding="utf-8"))]
    idx = root / "index.md"
    if idx.exists():
        violations += [f"index.md: {v}" for v in check_index(idx.read_text(encoding="utf-8"))]
    if violations:
        print("\n".join(violations))
        print(f"OKF CHECK: FAIL ({len(violations)} violations)")
        return 1
    print("OKF CHECK: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
