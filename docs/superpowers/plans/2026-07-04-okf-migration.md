# OKF v0.1 Migration Implementation Plan

> **Outcome:** Executed 2026-07-04, all tasks completed (commits `f6a03bf`…`14858ea`). The bundle has passed `okf-check.py` since; conformance is enforced by the Lint Workflow and CI.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the ai-wiki repo into a conformant OKF v0.1 bundle (sources/, summaries/, wiki/, root index.md + log.md) and sync the operating contract so future ingests stay conformant.

**Architecture:** Line-based Python migration scripts (no YAML library — preserves existing frontmatter formatting byte-for-byte outside the edited lines), a regex-based conformance checker reused later by the Lint workflow, LLM-written `description` fields for summaries + wiki, then CLAUDE.md/docs sync.

**Tech Stack:** Python 3.12 stdlib only (no pip installs), git, Sonnet subagents for descriptions.

**Spec:** `docs/superpowers/specs/2026-07-04-okf-migration-design.md` — read it first.

## Global Constraints

- Bundle scope = `sources/`, `summaries/`, `wiki/`, root `index.md`, root `log.md` ONLY. Never touch `notes/`, `gists/`, `meta/`, `docs/` (except the two doc-sync files in Task 6), `ai-research/`, `inbox/`, `linkedin/`, `.claude/` (except podcast-ingest SKILL.md in Task 6).
- Source file **bodies are verbatim** — migration may edit frontmatter lines only; body content must be byte-identical.
- Field mapping (from spec): sources `source_type: X` → `type: "X"` (quoted), `url` → `resource`, `ingested` → `timestamp`; summaries `source_type: …` → `type: "summary"`, `url` → `resource`, `ingested` → `timestamp`, add `description`; wiki `last_updated` → `timestamp`, add `description`, `type` unchanged, no `resource`. `date` field unchanged everywhere.
- All scripts go in `scripts/`, stdlib only, idempotent (safe to re-run).
- Commit after each task on `main`, push at the end. Descriptive commit messages, `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer.
- There is a pre-existing uncommitted change to `wiki/concepts/agent-skills.md` — do NOT include it in migration commits unless the user has already committed/reverted it; if it is still dirty, `git stash` before Task 2 and `git stash pop` after the final commit, telling the user.

---

### Task 1: OKF conformance checker

**Files:**
- Create: `scripts/okf-check.py`
- Test: `scripts/tests/test_okf_check.py`

**Interfaces:**
- Produces: `python3 scripts/okf-check.py` → exit 0 + `OKF CHECK: PASS` when the bundle conforms; exit 1 + one line per violation otherwise. Importable functions `check_frontmatter(text: str) -> list[str]` (violation messages) and `iter_bundle_files(root: Path) -> list[Path]`.

- [ ] **Step 1: Write the failing test**

```python
# scripts/tests/test_okf_check.py
import unittest, importlib.util, pathlib

spec = importlib.util.spec_from_file_location(
    "okf_check", pathlib.Path(__file__).parent.parent / "okf-check.py")
okf_check = importlib.util.module_from_spec(spec)
spec.loader.exec_module(okf_check)


class TestCheckFrontmatter(unittest.TestCase):
    def test_valid(self):
        text = '---\ntitle: "X"\ntype: "youtube"\n---\n\nbody\n'
        self.assertEqual(okf_check.check_frontmatter(text), [])

    def test_missing_frontmatter(self):
        self.assertIn("no frontmatter", okf_check.check_frontmatter("# just body\n")[0])

    def test_missing_type(self):
        text = '---\ntitle: "X"\n---\nbody\n'
        self.assertIn("type", okf_check.check_frontmatter(text)[0])

    def test_empty_type(self):
        text = '---\ntype: ""\n---\nbody\n'
        self.assertIn("type", okf_check.check_frontmatter(text)[0])


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/timkullmey/Claude Workspace/ai-wiki" && python3 -m unittest scripts.tests.test_okf_check -v` — if module path fails because `scripts/tests/` lacks `__init__.py`, create empty `scripts/tests/__init__.py` and `scripts/__init__.py` is NOT needed (the test loads by file path). Expected: FAIL / error (okf-check.py does not exist).

- [ ] **Step 3: Write the checker**

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python3 scripts/tests/test_okf_check.py -v` — Expected: 4 tests, OK.

- [ ] **Step 5: Run the checker against the un-migrated repo**

Run: `python3 scripts/okf-check.py; echo "exit=$?"` — Expected: FAIL with ~155 violations (summaries + sources lack `type`; wiki pages already have it) and `log.md still contains table rows`. This is the migration's "failing test".

- [ ] **Step 6: Commit**

```bash
git add scripts/okf-check.py scripts/tests/test_okf_check.py
git commit -m "Add OKF v0.1 conformance checker (fails pre-migration by design)"
```

---

### Task 2: Frontmatter migration script + run

**Files:**
- Create: `scripts/okf-migrate-frontmatter.py`
- Test: `scripts/tests/test_okf_migrate.py`
- Modify: all `.md` under `sources/*/` (77 files), `summaries/` (77), `wiki/*/` (80) — frontmatter lines only

**Interfaces:**
- Consumes: nothing.
- Produces: importable `migrate_source(text) -> str`, `migrate_summary(text) -> str`, `migrate_wiki(text) -> str`; CLI `python3 scripts/okf-migrate-frontmatter.py` rewrites all bundle files in place, idempotent.

- [ ] **Step 1: Write the failing tests**

```python
# scripts/tests/test_okf_migrate.py
import unittest, importlib.util, pathlib

spec = importlib.util.spec_from_file_location(
    "okf_migrate", pathlib.Path(__file__).parent.parent / "okf-migrate-frontmatter.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

SRC = '''---
title: "T"
source_type: youtube
url: "https://x"
ingested: "2026-04-13"
---
[00:00] url: something in body
'''

SUM = '''---
title: "T"
source_type: "youtube"
url: "https://x"
ingested: "2026-04-13"
source_file: "sources/youtube/x.md"
---
body
'''

WIKI = '''---
title: "T"
type: "concept"
last_updated: "2026-06-29"
---
body
'''


class TestMigrate(unittest.TestCase):
    def test_source(self):
        out = m.migrate_source(SRC)
        self.assertIn('type: "youtube"', out)
        self.assertNotIn("source_type", out)
        self.assertIn('resource: "https://x"', out)
        self.assertIn('timestamp: "2026-04-13"', out)
        self.assertNotIn("ingested", out)
        self.assertIn("url: something in body", out)  # body untouched

    def test_summary(self):
        out = m.migrate_summary(SUM)
        self.assertIn('type: "summary"', out)
        self.assertNotIn("source_type", out)
        self.assertIn('resource: "https://x"', out)
        self.assertIn('timestamp: "2026-04-13"', out)

    def test_wiki(self):
        out = m.migrate_wiki(WIKI)
        self.assertIn('timestamp: "2026-06-29"', out)
        self.assertNotIn("last_updated", out)
        self.assertIn('type: "concept"', out)

    def test_idempotent(self):
        once = m.migrate_source(SRC)
        self.assertEqual(once, m.migrate_source(once))
```

- [ ] **Step 2: Run to verify failure** — `python3 scripts/tests/test_okf_migrate.py -v` → error, script missing.

- [ ] **Step 3: Write the migration script**

```python
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
```

Note: `migrate_summary` must run before any file already containing `type: "summary"` would be re-matched — it isn't, because the `source_type` regex no longer matches after the first pass (idempotency test covers this).

- [ ] **Step 4: Run tests** — `python3 scripts/tests/test_okf_migrate.py -v` → 4 tests OK.

- [ ] **Step 5: Run on the repo, verify**

```bash
python3 scripts/okf-migrate-frontmatter.py     # expect: migrated 234 files
python3 scripts/okf-check.py                   # expect: only log.md table violation remains
git diff --stat | tail -3                      # ~234 files, small line counts each
git diff -- sources/ | grep '^[+-]' | grep -v '^[+-][+-]' | grep -v '^\-source_type\|^\+type\|^\-url\|^\+resource\|^\-ingested\|^\+timestamp' # expect: empty (no body edits)
```

- [ ] **Step 6: Spot-check 3 files** (one source, one summary, one wiki) with `head -15`, confirm fields renamed and everything else untouched.

- [ ] **Step 7: Commit**

```bash
git add -A sources summaries wiki scripts
git commit -m "Migrate frontmatter to OKF v0.1 (type/resource/timestamp)"
```

---

### Task 3: `description` fields for summaries + wiki (157 files)

**Files:**
- Modify: all 77 `summaries/*.md` and 80 `wiki/*/*.md` — insert one `description: "…"` line into frontmatter, directly under `title:`.

**Interfaces:**
- Consumes: migrated frontmatter from Task 2.
- Produces: every summary + wiki file has `description: "<one sentence>"` — consumed by Task 5's index generator via regex `^description: "(.*)"$`.

- [ ] **Step 1: Dispatch parallel subagents** — split the 157 files into ~4 batches (summaries A–L, summaries M–Z, wiki concepts, wiki tools+how-tos+people+comparisons). Each subagent prompt: *"For each file in this list: read the frontmatter title and the first content section (TL;DR for summaries, intro paragraph for wiki pages). Write ONE sentence (max ~160 chars, no trailing period needed, must not contain unescaped double quotes) that says what the document covers — not marketing tone, plain factual. Insert it as `description: "<sentence>"` on a new line immediately after the `title:` line in the frontmatter. Do not change anything else in the file."*

- [ ] **Step 2: Verify coverage**

```bash
grep -L '^description:' summaries/*.md wiki/*/*.md    # expect: no output
grep -c '^description:' summaries/*.md wiki/*/*.md | grep -v ':1$'   # expect: no output (exactly one each)
python3 scripts/okf-check.py    # expect: only the log.md violation remains
```

- [ ] **Step 3: Spot-check ~5 descriptions** for quality (one sentence, factual, matches the page).

- [ ] **Step 4: Commit**

```bash
git add summaries wiki
git commit -m "Add OKF description frontmatter to all summaries and wiki pages"
```

---

### Task 4: Convert log.md to OKF log format

**Files:**
- Create: `scripts/okf-convert-log.py` (one-shot; may be deleted after migration — keep it, it documents the conversion)
- Modify: `log.md`

**Interfaces:**
- Consumes: current `log.md` table (73 data rows, columns `Date | Action | Source | Type | Tier | Updates`; note the file has TWO header/separator blocks mid-file — treat any `| Date |…` or `|---|…` line as a header to skip).
- Produces: OKF log — `# Ingest Log` title, then `## YYYY-MM-DD` headings newest-first, entries as prose paragraphs prefixed `**Creation**` (actions INGEST / BATCH-INGEST / RE-INGEST) or `**Update**` (all other actions: CONNECT, LINT, STRUCTURE, …).

- [ ] **Step 1: Write the converter**

```python
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
```

- [ ] **Step 2: Run it** — `python3 scripts/okf-convert-log.py` → `converted 73 rows` (if `MANUAL REVIEW NEEDED` prints, fix those rows by hand in the output file preserving their full text).

- [ ] **Step 3: Verify** — `python3 scripts/okf-check.py` → log.md violations gone. `git diff log.md | head -40` and read the newest 3 entries: dates newest-first, prefixes correct, no content lost (`git show HEAD:log.md | wc -c` vs new file — new should be same order of magnitude).

- [ ] **Step 4: Commit**

```bash
git add log.md scripts/okf-convert-log.py
git commit -m "Convert log.md to OKF date-heading format (full history preserved)"
```

---

### Task 5: Convert root index.md to OKF bullets + okf_version

**Files:**
- Create: `scripts/okf-convert-index.py` (one-shot, kept for the record)
- Modify: `index.md`

**Interfaces:**
- Consumes: `description: "…"` frontmatter from Task 3; current index.md structure — `## <pillar>` sections each containing `### Sources` (table: `Date | Title | Type | Tags`) and `### Wiki Pages` (already bullets or table — the script must handle both), plus `## My Lab` and `## About This Wiki` trailing sections.
- Produces: index.md starting with `---\nokf_version: "0.1"\n---`, then `# AI Knowledge Wiki`, same `##`/`###` section headings, all entries as `* [Title](path) - description` bullets. Non-table lines (prose in About section) pass through unchanged.

- [ ] **Step 1: Write the converter**

```python
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
```

- [ ] **Step 2: Run it** — `python3 scripts/okf-convert-index.py`.

- [ ] **Step 3: Verify**

```bash
python3 scripts/okf-check.py                      # expect: OKF CHECK: PASS
grep -c '^\* \[' index.md                          # expect: roughly (sources 77 + wiki 80) ≈ 157 bullets
grep '^\* \[' index.md | grep -v ' - ' | head      # bullets without description — should only be entries the About section links, if any
```
Read the converted file once end-to-end: section headings intact, `## About This Wiki` prose untouched, every source and wiki page still listed (compare bullet count against 77+80; investigate any gap — the old table may have had rows for since-deleted files).

- [ ] **Step 4: Commit**

```bash
git add index.md scripts/okf-convert-index.py
git commit -m "Convert root index.md to OKF bullet format, declare okf_version 0.1"
```

---

### Task 6: Process sync — CLAUDE.md, docs, podcast-ingest skill

**Files:**
- Modify: `CLAUDE.md`, `docs/user-documentation.md`, `docs/concept.md`, `.claude/skills/podcast-ingest/SKILL.md`

**Interfaces:**
- Consumes: the new field names and file shapes from Tasks 2–5.
- Produces: an operating contract under which the next ingest writes OKF-conformant files.

- [ ] **Step 1: Update CLAUDE.md.** All of the following (use Edit on each spot):
  1. **Source schema block:** `source_type: "youtube|podcast|article|paper|repo|docs|note"` → `type: "youtube|podcast|article|paper|repo|docs|note"`; `url:` → `resource:`; `ingested:` → `timestamp:`. Keep `date` with a comment that it is the publication date.
  2. **Summary schema block:** replace `source_type`/`url`/`ingested` lines with `type: "summary"`, `resource: "<url>"`, `timestamp: "<YYYY-MM-DD>"`.
  3. **Wiki schema block:** `last_updated:` → `timestamp:`; add `description: "<one sentence>"` under `title`. Also add `description` to the Summary schema.
  4. **Every workflow-step mention** of the old names: Tier 1 step 5/6, Tier 2 Step 4/7, CONNECT step 4 ("Update `last_updated`" → "Update `timestamp`"), Contradiction-handling resolution table rows (a)–(e) (`last_updated` → `timestamp`), Lint STALE check ("not updated in 90+ days" keys off `timestamp`).
  5. **Index/log templates:** describe index.md as OKF bullets (`* [Title](path) - description`, description from frontmatter, root frontmatter = `okf_version: "0.1"` only) and log.md as `## YYYY-MM-DD` headings newest-first with `**Creation**`/`**Update**` prose entries; INDEX and LOG steps write in these shapes.
  6. **Lint workflow:** add category `8. OKF CONFORMANCE — run python3 scripts/okf-check.py; report violations` (renumber REPORT).
  7. **Architecture intro:** add one line noting the repo is an OKF v0.1 bundle (link the spec URL) covering sources/, summaries/, wiki/, index.md, log.md.
- [ ] **Step 2: Update `.claude/skills/podcast-ingest/SKILL.md`** — its frontmatter template at ~line 90: `source_type: "podcast"` → `type: "podcast"`, `url:` → `resource:`, `ingested:` → `timestamp:`.
- [ ] **Step 3: Sync `docs/user-documentation.md` and `docs/concept.md`** — propagate the same renames/templates wherever `source_type`, `url:` (frontmatter context), `ingested`, `last_updated`, index table format, or log table format are described (`grep -n 'source_type\|last_updated\|ingested' docs/*.md` to find every spot). concept.md's scaffolding templates (frontmatter blocks, index/log skeletons) must emit the OKF shapes; add a short "OKF conformance" note to concept.md naming the checker script.
- [ ] **Step 4: Cross-check** — re-read the changed CLAUDE.md sections; `grep -n 'source_type\|last_updated\|ingested:' CLAUDE.md docs/user-documentation.md docs/concept.md .claude/skills/podcast-ingest/SKILL.md` → only allowed hits are historical/explanatory mentions (e.g. a migration note), ideally none.
- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md docs/user-documentation.md docs/concept.md .claude/skills/podcast-ingest/SKILL.md
git commit -m "Sync operating contract to OKF v0.1 (schemas, index/log templates, lint check)"
```

---

### Task 7: Final verification, log entry, push

**Files:**
- Modify: `log.md` (append today's entry in the new format)

- [ ] **Step 1: Full check** — `python3 scripts/okf-check.py` → PASS; `python3 scripts/tests/test_okf_check.py && python3 scripts/tests/test_okf_migrate.py` → OK.
- [ ] **Step 2: Add a log entry** under a new `## 2026-07-04` heading at the top of the entry list: `**Update** STRUCTURE: OKF v0.1 migration — frontmatter (type/resource/timestamp/description) across 234 bundle files, log.md and index.md converted to OKF shapes, okf_version declared, CLAUDE.md + docs + podcast-ingest skill synced, conformance checker added (scripts/okf-check.py, wired into Lint).`
- [ ] **Step 3: Commit & push**

```bash
git add log.md
git commit -m "Log OKF v0.1 migration"
git push
```
- [ ] **Step 4: If a stash was made in the Global Constraints step, `git stash pop` and tell the user `wiki/concepts/agent-skills.md` is dirty again.**
