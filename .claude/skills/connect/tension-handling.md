# Contradiction Handling

When CONNECT detects that a new claim conflicts with an existing claim on a wiki page, **do not silently merge.** Surface the tension to the user as a batched decision at the end of CONNECT. The user decides per tension; the agent then writes.

This is the wiki's primary defence against the "active misinformation" failure mode: silent merges that read as confident prose but quietly drop or distort prior claims. The architecture deliberately favours visible deferral over invisible synthesis.

## AGENT'S READ contract (detection sub-agent)

For each conflict, draft an `AGENT'S READ` block with four required fields:

- **Confidence:** one of `strong recommendation`, `lean toward`, or `no strong recommendation — your call`. No in-between values.
- **Recommended option:** one letter from `(a)`, `(b)`, `(c)`, `(d)`, or `(q)`. **Never recommend `(e)` split page** — splits are too consequential to propose as a default; the reasoning may *mention* that a split might be warranted, but (e) cannot be the primary recommendation.
- **Why:** 1–2 sentences grounded in the specific claims.
- **Strongest argument against:** 1 sentence — the most credible reason the recommendation could be wrong. Mandatory. This is what prevents recommendation-driven rubber-stamping.

## User-facing menu

For each conflict, the orchestrator presents:

```
TENSION <N> of <total> — <wiki page path>
Topic: <one-line>

Existing claim (line <N>, sources: <citations>):
  "<verbatim quote>"

New claim (source: <new slug>, <timestamp or section>):
  "<verbatim quote>"

Options:
  (a) Accept new — replace old claim; old becomes deprecated footnote
  (b) Keep old — drop new claim from wiki (still preserved in its summary)
  (c) Hold both — add to "## Unresolved Tensions" with both attributions
  (d) Synthesize — sub-agent drafts a resolving framing; you approve before write
  (e) Split page — disagreement is structural; sub-agent proposes a split
  (q) Queue for lint — defer; logged to meta/contradictions.md

AGENT'S READ — <confidence> (<recommended option>)
  Why: <reasoning>
  Strongest argument against: <counter>
```

The user responds with one line per tension, e.g. `1c 2a 3q` or `all q`. There is no implicit "press Enter to accept".

## Resolution actions

| Letter | Effect |
|--------|--------|
| (a) Accept new | Replace the existing claim. Add a footnote near it: *"Earlier versions of this page stated [old claim], per [source]; superseded by [new source] on [date]."* Update `sources:` and `timestamp`. |
| (b) Keep old | Do not modify the page body. Add the new summary to `sources:` only if it contributes other non-conflicting content; otherwise leave the page untouched. |
| (c) Hold both | Add an `## Unresolved Tensions` section (or append to it) with both quotes, both citations, and the date surfaced. Update `sources:` and `timestamp`. |
| (d) Synthesize | Sub-agent drafts a resolving rewrite and presents it for `approve / amend / revert`. After approval, write it, update `sources:` and `timestamp`. |
| (e) Split page | Sub-agent proposes a split (new title, claim distribution, cross-link plan). The user must explicitly approve before any write. Add the new page to `index.md`. |
| (q) Queue for lint | Append an entry to `meta/contradictions.md` (schema below). Insert one HTML-comment marker on the page near the claim: `<!-- TENSION YYYY-MM-DD: see meta/contradictions.md#<anchor> -->`. Do not modify the page otherwise. |

For (a)–(d), update `timestamp` and `sources:`. For (q), leave body and frontmatter untouched apart from the marker — the queue *is* the deferral mechanism; a silent merge into frontmatter would defeat it.

## `meta/contradictions.md` schema

Append-only ledger. Each tension is an H2 with a date-stamped anchor:

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

Resolved entries stay as an audit trail. `Status:` flips from `open` to `resolved` when the lint pass closes them. Never delete entries.

## Lint integration

The `lint` skill drains `meta/contradictions.md` before scanning for new tensions: for each `open` entry it re-presents this same menu with a fresh AGENT'S READ that considers sources accumulated since the tension was queued. Most deferred decisions get resolved there, once more evidence exists. The `wiki-tension-triage` skill is the retroactive scanner for tensions already on a page; it queues into this same ledger.
