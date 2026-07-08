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

## 2026-07-08-claude-routines-trigger-count
- **Page:** wiki/tools/claude-routines.md
- **Topic:** Four vs three routine trigger types (is webhook a first-class trigger?)
- **Existing:** "Routines close that gap with four trigger types: schedule, webhook, API call, and GitHub event." (line 21; repeated at line 191) — summaries/2026-04-14_nick-saraev_claude-code-routines.md
- **New:** "Three canonical trigger types per Anthropic's docs (May 2026), each combinable in a single routine:" (line 29; table lists Schedule, API, GitHub event) — summaries/2026-05-06 Anthropic docs summary cited on the page
- **Status:** open
- **Queued by:** retroactive triage sweep on 2026-07-08
- **Resolution:**
- **Agent's read (at queue time):** strong recommendation (a) — the later, authoritative Anthropic docs enumerate three types and treat webhook as the routine-chaining mechanism (page line 65 already frames it that way); fix lines 21 and 191 to the three-type framing with a deprecation footnote. Strongest argument against: Saraev's walkthrough demonstrated a distinct webhook trigger in the product UI, so the docs may have folded a real surface into "API".
