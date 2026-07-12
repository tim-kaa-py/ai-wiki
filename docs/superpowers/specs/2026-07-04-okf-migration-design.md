# OKF v0.1 Migration — Design

**Date:** 2026-07-04
**Status:** Approved by user (interview 2026-07-04)
**Outcome:** Executed 2026-07-04 — full migration landed the same day (`OKF CHECK: PASS` since; enforced by lint and CI). See `log.md` 2026-07-04.
**Spec reference:** [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

## Goal

Transform the ai-wiki knowledge base into a conformant OKF v0.1 bundle, and update the operating contract (CLAUDE.md, docs/, lint) so every future ingest stays conformant.

## OKF conformance rules (the ones that bind)

1. Every non-reserved `.md` file in the bundle has parseable YAML frontmatter with a non-empty `type` field. Types are free-form strings; recommended fields are `title`, `description`, `resource`, `tags`, `timestamp`. Custom keys are permitted.
2. Reserved filenames follow prescribed shapes when present:
   - `index.md` — no frontmatter (exception: root index may carry `okf_version`), sections of `* [Name](path) - description` bullets.
   - `log.md` — ISO `## YYYY-MM-DD` date headings, newest first, prose entries prefixed `**Update**` / `**Creation**` / `**Deprecation**`.
3. Consumers are permissive; producers should still emit the conventional shapes.

## Bundle scope

**In scope (must conform):** `sources/`, `summaries/`, `wiki/`, root `index.md`, root `log.md`.

**Out of scope (untouched):** `notes/`, `gists/`, `meta/`, `docs/`, `ai-research/`, `inbox/`, `scripts/`, `linkedin/`, `.claude/`.

## Frontmatter changes

| Layer | Changes |
|-------|---------|
| Sources (~90 files) | `source_type: X` → `type: "X"` — same controlled vocab as bare lowercase values (`youtube`, `article`, `paper`, `podcast`, `repo`, `docs`, `note`), all consistently quoted (normalizes the one unquoted `source_type: youtube`). `url` → `resource`. `ingested` → `timestamp`. `date` (source publication date) unchanged — different fact. No `description` (verbatim raw material, not indexed). |
| Summaries (~77 files) | Add `type: "summary"` (no format hint — the source is one hop away via `source_file`). `url` → `resource`. `ingested` → `timestamp`. Add one-sentence `description`. |
| Wiki (~80 files) | `type` unchanged — `concept` / `tool` / `how-to` / `person` / `comparison` are already ideal OKF types. `last_updated` → `timestamp`. Add one-sentence `description`. No `resource` (abstract concepts have no canonical URI per OKF §4.1). |

Type values stay disjoint across layers, so `type` routes cleanly and the layer remains recoverable from the directory. All renames are safe: nothing reads `source_type`, `url`, `ingested`, or `last_updated` programmatically (re-verify with grep across `scripts/` and `.claude/skills/` before running).

## Reserved files

- **`log.md`** — full history converted: table rows become `## YYYY-MM-DD` headings (newest first) with prose entries using `**Update**` / `**Creation**` prefixes. Cell text is already prose-heavy, so conversion is mostly mechanical. Also fixes the stray duplicate `|---|` header row currently mid-file.
- **`index.md`** — root only. Tables converted to `* [Name](path) - description` bullets under the existing pillar section headings; descriptions come from the new `description` frontmatter. Gains a frontmatter block containing only `okf_version: "0.1"`. No per-directory indexes for now (OKF consumers may synthesize them).
- **`# Citations`** — not retrofitted. Wiki pages' `sources:` frontmatter lists remain the provenance mechanism; the convention may be adopted for future pages with external URLs.

## Execution plan

1. **Verify field usage** — grep for `source_type` / `url:` / `ingested` / `last_updated` consumers in scripts and skills.
2. **Migration script** (Python, in `scripts/`) — all deterministic edits: type folding, field renames, quoting normalization, log.md restructuring, index.md restructuring. Idempotent; reviewable via `git diff`.
3. **Descriptions** — a few parallel Sonnet subagents write the ~157 `description` values (summaries + wiki) by compressing each file's TL;DR / intro paragraph.
4. **Process sync** (same change, per Self-Documentation Rule):
   - `CLAUDE.md` — frontmatter schemas renamed (`type`, `resource`, `timestamp`); workflow step text writes the new names (ingest writes `timestamp` not `ingested`; CONNECT/Step 9 writes `timestamp` not `last_updated`); index/log templates updated; Lint STALE check keys off `timestamp`; new Lint category: **OKF conformance** (parseable frontmatter + non-empty `type` in bundle scope; reserved-file shapes).
   - `docs/user-documentation.md` and `docs/concept.md` — synced to the same field names and workflow text.
5. **Review + commit** — single migration commit after `git diff` review, then push.

## Risk notes

- **"Sources are verbatim"** — the migration touches frontmatter only; body content stays byte-identical. Treated as analogous to the allowed re-extraction exception.
- **Obsidian / mobile reading** — index bullets and log headings render fine; the tag column at root is lost but tags remain in frontmatter.
- **Rot prevention** — the process sync is what keeps the bundle conformant past the first post-migration ingest; it is in scope of the same commit, not deferred.
