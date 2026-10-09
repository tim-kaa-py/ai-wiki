---
name: gist
description: Save a user-authored Claude Code prompt as a reusable gist in gists/. Use when the user says "save this as a gist", "make a gist", "/gist", or pastes a prompt and asks to file it. Gists are not ingests — no summary, no CONNECT, no wiki synthesis.
disable-model-invocation: true
argument-hint: "[title or pasted prompt]"
---

# Gist

Gists are reusable Claude Code prompts authored by the user, stored for sharing and reuse. They are NOT ingested knowledge: no source, no summary, no wiki page, no CONNECT.

Frontmatter and slug rules for `gists/<slug>.md` are in `.claude/rules/frontmatter.md`.

## Workflow

1. **CAPTURE** — confirm with the user: title, one-line intent, target model (sonnet/opus/haiku), prerequisites (if any), tags. A pasted prompt is reused verbatim. If the user only described an idea, draft the prompt and confirm the body before saving.
2. **SLUG** — `YYYY-MM-DD_short-slug` from the intent and today's date. `short-slug` under 50 chars, lowercase, hyphenated.
3. **SCAN** — gists are user-authored, so treat as non-public. Run the Step 0 Confidentiality Scan (`.claude/skills/ingest/step0-scan.md`) on the gist content via a Sonnet sub-agent. Resolve every FLAGGED item with the user before saving. Prompt bodies leak internal tool names, project paths and client identifiers easily — look hard.
4. **SAVE** — write `gists/<slug>.md` with the template below.
5. **INDEX** — append a row to `gists/index.md`: `| <date> | [title](slug.md) | <intent> | <model> | <tags> |`. Increment the count at the bottom.
6. **LOG** — append an `**Update**` entry to `log.md` under today's `## YYYY-MM-DD` heading with action `gist`.

## Template

````markdown
---
title: "<title>"
intent: "<one-line>"
prerequisites: ["<thing>"]
model: "sonnet"
tags: [tag1, tag2]
created: "<YYYY-MM-DD>"
---

# <Title>

**How to use:** Copy the prompt block below and paste it into a fresh Claude Code session. <Any setup notes — files to have open, working directory, etc.>

---

```
<prompt body — verbatim, ready to paste>
```
````

Cross-references to wiki pages, if relevant, go inline in the body as plain Markdown links, not as a frontmatter field.

## Rules

- Gists are not summarized, not connected to the wiki, and not listed in the master `index.md` — only in `gists/index.md`.
- Gists may reference wiki pages; wiki pages must never reference gists.
- If the user edits a gist by hand, run the Step 0 scan on the edited file before committing.
