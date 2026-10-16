---
name: lint
description: Runs the wiki health check. Use when the user says "lint", "lint the wiki", "check wiki health", "find orphans", or asks whether index, log and sources are in sync. Drains the contradiction ledger, then finds orphans, stale pages, index and log drift, stray tension markers and tag gaps, runs the OKF conformance script, and presents fixes for approval. Not for linting code (ruff, eslint and the like on scripts/), and not for scanning pages for new contradictions (that is /wiki-tension-triage).
---

# Lint

Report first, fix only after the user approves: fixes edit the public repo's index and pages. Open the run with one line: `N open entries in meta/contradictions.md`.

```text
Lint progress:
- [ ] 1 CONTRADICTIONS drained
- [ ] 2 Structural checks run (ORPHANS, STALE, INDEX SYNC, LOG SYNC, INBOX, MARKERS, GAPS)
- [ ] 3 Report presented, user chose fixes
- [ ] 4 Approved fixes applied, affected checks re-run clean (if one fails, return to step 3)
- [ ] 5 OKF CONFORMANCE passes (if not, fix with approval and re-run)
- [ ] 6 Run logged
```

## 1. CONTRADICTIONS

Drain `meta/contradictions.md` before anything else, so structural findings reflect the resolved pages. For each `Status: open` entry, an Opus sub-agent (per connect's detection contract and CLAUDE.md model routing) writes a fresh AGENT'S READ that weighs summaries added since the entry was queued; present it in the menu from `.claude/skills/connect/tension-handling.md`. The user may answer `all q` to defer everything. For each resolved entry, apply the letter per that file's resolution table, fill `Status: resolved` and `Resolution:` per the ledger schema, and remove the page's `<!-- TENSION ... -->` marker. Tensions not in the ledger belong to the `wiki-tension-triage` skill; point the user there. Done when every open entry is resolved or re-deferred.

## 2. Structural checks

Mechanical; no sub-agent needed. Each check is done when it has a finding list or "clean".

- **ORPHANS** — a source with no summary; a summary listed in no wiki page's `sources:`; a gist in `gists/` missing from `gists/index.md`, or the reverse.
- **STALE** — a wiki page whose `timestamp` is 90+ days old while a newer summary shares one of its tags but is missing from its `sources:`.
- **INDEX SYNC** — `index.md` links only summaries (`### Sources`) and wiki pages (`### Wiki Pages`); `sources/`, `notes/`, `meta/` and `gists/` are never indexed. Flag broken links, summaries or wiki pages with no entry, and a footer (`**N sources** | **N wiki pages**`) that disagrees with the file counts in `summaries/` and `wiki/`.
- **LOG SYNC** — a summary whose `resource` URL or `title` appears nowhere in `log.md`. Entries cite URLs and titles, not slugs, and batch entries name several sources in one line, so match on those.
- **INBOX** — `inbox/` holds anything besides `.gitkeep`.
- **MARKERS** — a `<!-- TENSION` marker in `wiki/` whose anchor has no `Status: open` entry in the ledger.
- **GAPS** — a tag carried by many summaries but no wiki page; suggest the page.

## 3. Report and fix

Present all findings as numbered, actionable items and wait for the user's pick. Apply the approved fixes, then re-run every check that had findings. If one still fails, return to the report.

## 4. OKF CONFORMANCE

Run `python3 scripts/okf-check.py` last, so it validates the final state. Fix violations with the user's approval, then re-run it until it passes.

## 5. Log

Log every run, clean ones included. Under today's `## YYYY-MM-DD` heading in `log.md` (create it at the top if missing), insert as the first entry `**Update** LINT: <one clause per check: clean, or findings and fixes>`.
