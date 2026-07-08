# Tension Triage — Calibration Policy

Rules distilled from the wiki owner's resolution decisions during pilot
runs. Consumed by the advocate, harmonizer, judge, and challenger agents
of the tension-triage pipeline. Cite rules by their heading.

Each rule: the tension pattern, the owner's ruling, and the generalizable
principle. Append-only during pilots; amendments during the full sweep
require a note in the run report.

## Version-scoped reversal
- **Pattern:** Two claims give opposite guidance for different model/tool generations, and one explicitly names the other as its baseline (e.g. "reverse of 4.6").
- **Ruling:** Not a tension — dismissed, owner confirmed.
- **Rule:** Claims disambiguated by an explicit version/generation qualifier in the text are never tensions; the reversal note is documentation of change, not contradiction.
- **From:** pilot 1, candidate CC1 (wiki/tools/claude-code.md)

## Page self-reconciliation
- **Pattern:** Two figures or claims appear to disagree, but the page itself contains a sentence explicitly reconciling them (e.g. "the two figures are the same picture from different angles").
- **Ruling:** Not a tension — dismissed, owner confirmed.
- **Rule:** If the page performs the reconciliation in its own prose, the pair is not a tension. At most flag a skim-hazard (editorial note) if the reconciling sentence is far from one of the claims.
- **From:** pilot 1, candidate CC2 (wiki/tools/claude-code.md)

## Session-scope split
- **Pattern:** One claim endorses a technique within a session; another says a different technique beats it for cross-session work.
- **Ruling:** Not a tension — dismissed by Opus judge, owner confirmed.
- **Rule:** Within-session and cross-session guidance are different regimes; "X beats Y for cross-session coherence" does not conflict with "Y is valid within a single session." Check each claim's own scope qualifier before flagging.
- **From:** pilot 1, candidate CC3 (wiki/concepts/context-engineering.md)

## Pipeline rules (orchestrator flow, not tension classification)

- **Advocate-concession short-circuit:** if the Conflict-Advocate invokes its honesty clause (cannot construct a conflict case), dismiss the candidate immediately — do not dispatch the judge. (Pilot 1: saved verdicts on CC1/CC2 matched the owner.)
- **Dual-detector cross-check:** when a batch comes back all-clean on high-risk pages, a second detector pass on a different model with identical framing is a cheap recall check. Two clean convergent passes = trustworthy clean verdict. (Pilot 1: Sonnet + Opus converged.)
- **Editorial findings are a valid side-channel:** adversaries that agree a pair is compatible but flag a skim-hazard should have that surfaced to the owner as an optional editorial fix, distinct from tension resolution. (Pilot 1: compaction table-row pointer, applied 2026-07-08.)
