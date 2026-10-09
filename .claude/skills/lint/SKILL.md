---
name: lint
description: Wiki health check. Use when the user says "lint", "check wiki health", "find orphans", or asks whether index/log/sources are in sync. Finds orphans, stale pages, index and log drift, drains the contradiction ledger, suggests gap pages, runs the OKF conformance script, and presents fixes for approval.
disable-model-invocation: true
---

# Lint

Structural checks; no deep reasoning needed. Report first, fix only after the user approves.

1. **ORPHANS** — sources with no summary; summaries not referenced by any wiki page; gists in `gists/` missing from `gists/index.md` or vice versa.
2. **STALE** — wiki pages whose `timestamp` is 90+ days old that have active related topics.
3. **INDEX SYNC** — entries in `index.md` that don't match actual files, and files missing from `index.md`.
4. **LOG SYNC** — sources not recorded in `log.md`.
5. **CONTRADICTIONS** — drain `meta/contradictions.md`: for each `Status: open` entry, re-present the tension menu from `.claude/skills/connect/tension-handling.md` with a fresh AGENT'S READ that considers sources accumulated since it was queued. After the user picks, apply the resolution per the resolution-action table and flip the entry to `Status: resolved` with the letter, a one-line note, and the date. Never delete entries. For tensions not yet in the ledger (manual edits, older ingests), point the user to the `wiki-tension-triage` skill.
6. **GAPS** — tags with many sources but no wiki page; suggest pages to create.
7. **OKF CONFORMANCE** — run `python3 scripts/okf-check.py`; report violations.
8. **REPORT** — present findings as actionable items. The user approves fixes before execution.

After fixes, append an `**Update**` entry to `log.md` under today's heading with action `lint`.
