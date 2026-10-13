# Tension handling

A tension is a new claim that contradicts an existing claim on a wiki page, or two claims on one page that contradict each other. Never merge one silently: the user decides per tension, then the agent writes. Silent merges read as confident prose but quietly drop or distort prior claims, so the wiki deliberately favours visible deferral over invisible synthesis. The ledger keeps its file name, `meta/contradictions.md`; every entry in it is a tension.

## AGENT'S READ contract

Every tension shown to the user carries an `AGENT'S READ` block with four required fields:

- **Confidence:** one of `strong recommendation`, `lean toward`, or `no strong recommendation — your call`. No in-between values.
- **Recommended option:** one letter from `(a)`, `(b)`, `(c)`, `(d)`, or `(q)`. **Never recommend `(e)` split page**: splits are too consequential to propose as a default. The reasoning may *mention* that a split might be warranted.
- **Why:** 1–2 sentences grounded in the specific claims.
- **Strongest argument against:** 1 sentence, the most credible reason the recommendation could be wrong. Mandatory, because it is what prevents recommendation-driven rubber-stamping.

## User-facing menu

Use this exact format, one block per tension; lint and wiki-tension-triage reuse it.

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
  Why: <one-or-two-sentence justification>
  Strongest argument against: <counter>
```

The user answers one line per tension, e.g. `1c 2a 3q` or `all q`. The recommendation is a hint, not a default: there is no implicit "press Enter to accept", and nothing is applied without an answer.

## Resolution actions

| Letter | Effect |
|--------|--------|
| (a) Accept new | Replace the existing claim. Add a footnote near it: *"Earlier versions of this page stated [old claim], per [source]; superseded by [new source] on [date]."* |
| (b) Keep old | Do not modify the page body. Add the new summary to `sources:` only if it contributes other non-conflicting content; otherwise leave the page untouched. |
| (c) Hold both | Add an `## Unresolved Tensions` section (or append to it) with both quotes, both citations, and the date surfaced. |
| (d) Synthesize | A sub-agent drafts a resolving rewrite; nothing is written until the user answers `approve`, `amend` or `revert` (flow in connect SKILL.md step 4). |
| (e) Split page | A sub-agent proposes a split (new title, claim distribution, cross-link plan); nothing is written until the user explicitly approves. The new page goes into `index.md`. |
| (q) Queue for lint | Append a ledger entry (schema below). Insert one marker on the page near the claim: `<!-- TENSION YYYY-MM-DD: see meta/contradictions.md#<anchor> -->`. Change nothing else. |

For (a), (c), (d) and (e), update `sources:` and `timestamp`; (b) follows its row. For (q), leave body and frontmatter untouched apart from the marker: the queue *is* the deferral, and a merge into frontmatter would defeat it.

Resolving a tension later, by lint or by hand, removes its `<!-- TENSION -->` marker from the page, so a marker always means an open ledger entry.

## Ledger schema (`meta/contradictions.md`)

Use this exact format; lint parses `Status:` to find open entries. Append-only: resolved entries stay as the audit trail of what was contested and how it was settled.

```markdown
## YYYY-MM-DD-<page-slug>-<topic-slug>
- **Page:** wiki/<type>/<slug>.md
- **Topic:** <one-line>
- **Existing:** "<verbatim quote>" (line <N>) — <source citations>
- **New:** "<verbatim quote>" (line <N> if already on the page) — <new source citation>
- **Status:** open | resolved
- **Queued by:** ingest of <new-slug> on YYYY-MM-DD | retroactive triage on YYYY-MM-DD
- **Resolution:** <empty until resolved; then: letter chosen + one-line note + date>
- **Agent's read (at queue time):** <confidence (letter) — why. Strongest argument against: ...>
```

Anchor: the H2 text, `<date>-<page slug without dir>-<topic slug>`, e.g. `2026-05-20-llm-wiki-pattern-synthesis`. Topic slug at most 4 words, lowercase, hyphenated, so anchors stay short enough to paste into the page marker.

Resolving an entry: flip `Status:` to `resolved`, fill `Resolution:`, and remove the page's marker. Never delete entries.

## Who drains the ledger

`lint` drains this ledger first, then runs its structural checks: each `open` entry gets this menu again with a fresh AGENT'S READ that weighs sources added since it was queued. `wiki-tension-triage` finds tensions already on pages and queues into the same ledger.
