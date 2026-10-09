---
name: query
description: Answer a question from the wiki's existing knowledge with citations. Use when the user asks a question about AI topics, tools, people or comparisons instead of giving a URL to ingest — "what does the wiki say about…", "compare X and Y based on my sources", "which sources cover…".
---

# Query

1. **SEARCH** — grep `wiki/` and `summaries/` for the relevant terms.
2. **READ** — load the most relevant pages (up to 5-8).
3. **SYNTHESIZE** — answer with citations in the form `[Source: filename.md]`. Prefer wiki pages over raw summaries; say when sources disagree instead of averaging them, and point at `## Unresolved Tensions` sections where they exist.
4. **FILE** — if the answer reveals an insight worth keeping, suggest creating or updating a wiki page (then use the `connect` conventions for any write).

Log a query only if it produced a wiki change: `**Update**` entry in `log.md` with action `query`.
