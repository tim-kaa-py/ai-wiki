---
name: gist
description: Saves a user-authored Claude Code prompt as a reusable gist in gists/. Use when the user says "save this as a gist", "make a gist", "/gist", or pastes a prompt and asks to file it. Gists are not ingests — no summary, no CONNECT, no wiki synthesis.
argument-hint: "[title or pasted prompt]"
---

# Gist

Gists are reusable Claude Code prompts authored by the user, stored for sharing and reuse. They are not ingested knowledge: no source, no summary, no wiki page, no CONNECT, and they are indexed only in `gists/index.md`.

## Workflow

1. **CAPTURE** — confirm with the user: title, one-line intent, target model (sonnet/opus/haiku/fable), prerequisites (only something the user must install, access or have open beforehand; a repo or a failing test the prompt itself works on is not one, and with none the field is left out), tags. A pasted prompt is reused verbatim. If the user only described an idea, draft the prompt and confirm the body before saving.
2. **SLUG** — `YYYY-MM-DD_short-slug` from the intent and today's date. `short-slug` under 50 chars, lowercase, hyphenated.
3. **SCAN** — gists are user-authored, so treat them as non-public. Run the Confidentiality Scan (`.claude/skills/ingest/step0-scan.md`) on the gist content, and add to the sub-agent's prompt: "Prompt bodies leak internal tool names, project paths and client identifiers easily — look hard." Resolve every FLAGGED item with the user before saving.
4. **SAVE** — write `gists/<slug>.md` with the template below.
5. **INDEX** — append a row to `gists/index.md`: `| <date> | [title](slug.md) | <intent> | <model> | <tags> |`. Increment the count at the bottom.
6. **LOG** — directly under today's `## YYYY-MM-DD` heading in `log.md` (create it at the top if missing), insert as the first entry, above that day's existing entries (the log is newest-first), `**Update** GIST: [<title>](gists/<slug>.md) — <one line>. Confidentiality scan <verdict>. Added to gists/index.md (count N → N+1).`

## Template

Frontmatter: the gist schema in `.claude/rules/frontmatter.md` (exact; read it before writing).

The body below is a sensible default: when the gist is a file to install rather than a prompt to paste (an output style, say), replace "How to use" with install steps.

````markdown
# <Title>

**How to use:** Copy the prompt block below and paste it into a fresh Claude Code session. <Any setup notes — files to have open, working directory, etc.>

---

```
<prompt body — verbatim, ready to paste>
```
````

Cross-references to wiki pages, if relevant, go inline in the body as plain Markdown links, not as a frontmatter field.
