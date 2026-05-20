# Open Contradictions Ledger

Tensions surfaced during the CONNECT step of ingest and deferred for later resolution via option `(q)`. The next `lint the wiki` pass drains this file: for each `Status: open` entry, the agent re-presents the same menu used at ingest (including a fresh `AGENT'S READ` informed by any sources accumulated since).

**Append-only.** Resolved entries stay in this file as an audit trail of what was once contested and how it was settled. Never delete entries.

## Schema

Each tension is an H2 heading with a date-stamped anchor, followed by a fixed set of fields:

```markdown
## YYYY-MM-DD-<page-slug>-<topic-slug>
- **Page:** wiki/<type>/<slug>.md
- **Topic:** <one-line>
- **Existing:** "<verbatim quote>" — <source citations>
- **New:** "<verbatim quote>" — <new source citation>
- **Status:** open | resolved
- **Queued by:** ingest of <new-slug> on YYYY-MM-DD
- **Resolution:** <empty until resolved; then: letter chosen + one-line note + date>
```

The anchor is derived from `<date>-<page slug without dir>-<topic slug>`, e.g. `2026-05-20-llm-wiki-pattern-synthesis`. Topic slug ≤ 4 words, lowercase, hyphenated.

See `CLAUDE.md` → [Contradiction Handling at Ingest](../CLAUDE.md#contradiction-handling-at-ingest) for the full contract.

---

_No open contradictions._
