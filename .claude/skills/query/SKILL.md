---
name: query
description: Answers a question from the wiki's existing knowledge with citations. Use when the user asks a question about AI topics, tools, people or comparisons instead of giving a URL to ingest — "what does the wiki say about…", "compare X and Y based on my sources", "which sources cover…".
---

# Query

1. **SEARCH** — scan `index.md` first: its one-line descriptions point at the right pages more cheaply than grepping 200 files. Then grep `wiki/` and `summaries/` for terms the index missed.
2. **READ** — open the most relevant pages, up to 5-8 to keep context lean. Prefer wiki pages: they are synthesized across sources and tension-checked.
3. **ANSWER** — cite as `[Source: <slug>]`, the form wiki pages use, and cite only files opened in step 2. Say when sources disagree instead of averaging them, and point at `## Unresolved Tensions` sections where they exist. If the wiki has nothing relevant, say so, offer to ingest a source, and label anything from general knowledge as not from the wiki.
4. **FILE** — if the answer holds an insight worth keeping, offer to create or update a wiki page, and write nothing until the user agrees. Then:
   - **Tension check.** connect expects a summary path, so use a lighter check: a fresh Opus sub-agent compares the new page's claims with the overlapping wiki pages and reports conflicts with an AGENT'S READ. Present them in the menu from `.claude/skills/connect/tension-handling.md` and apply the user's picks; never merge a conflict silently.
   - **Scan.** If the page carries anything from this conversation that is not in the cited summaries, run the confidentiality scan (`.claude/skills/ingest/step0-scan.md`) on it before saving, because the repo is public.
   - **Index.** Add a new page under its pillar's `### Wiki Pages` heading in `index.md` and bump the footer's `**N wiki pages**`.
   - **Log.** Under today's `## YYYY-MM-DD` heading in `log.md` (create it at the top if missing), append `**Update** QUERY: <page> — <what changed>`. Answers that change nothing in the wiki are not logged.
