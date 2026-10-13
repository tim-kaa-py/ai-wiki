# Open Contradictions Ledger

Tensions deferred for later resolution: option `(q)` at the CONNECT step of ingest, and tensions queued by `wiki-tension-triage`. `lint` drains this file first: each `Status: open` entry gets the tension menu again with a fresh AGENT'S READ.

**Append-only.** Resolved entries stay as an audit trail. Never delete entries.

Entry format, anchor rule and resolve procedure: `.claude/skills/connect/tension-handling.md` → "Ledger schema". That file is authoritative; do not copy the schema here.

---

## 2026-07-08-claude-routines-trigger-count
- **Page:** wiki/tools/claude-routines.md
- **Topic:** Four vs three routine trigger types (is webhook a first-class trigger?)
- **Existing:** "Routines close that gap with four trigger types: schedule, webhook, API call, and GitHub event." (line 21; repeated at line 191) — summaries/2026-04-14_nick-saraev_claude-code-routines.md
- **New:** "Three canonical trigger types per Anthropic's docs (May 2026), each combinable in a single routine:" (line 29; table lists Schedule, API, GitHub event) — summaries/2026-05-06 Anthropic docs summary cited on the page
- **Status:** resolved
- **Queued by:** retroactive triage sweep on 2026-07-08
- **Resolution:** (a) accept new — online verification against code.claude.com/docs/en/routines (2026-07-08) confirmed exactly three trigger types (schedule, API, GitHub event); webhook is the wiring (per-routine API endpoint / chaining), not a type. Lines 21 and 193 corrected, deprecation footnote added. 2026-07-08
- **Agent's read (at queue time):** strong recommendation (a) — the later, authoritative Anthropic docs enumerate three types and treat webhook as the routine-chaining mechanism (page line 65 already frames it that way); fix lines 21 and 191 to the three-type framing with a deprecation footnote. Strongest argument against: Saraev's walkthrough demonstrated a distinct webhook trigger in the product UI, so the docs may have folded a real surface into "API".
