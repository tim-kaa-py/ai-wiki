---
title: "Measuring AI's Impact on Developer Productivity"
type: "concept"
description: "What org-level measurement says about AI coding gains — DX's median ~7.7% PR throughput, quality and trust side effects, the theory-of-constraints explanation, and a cohort method for measuring it yourself"
pillar: "ecosystem"
tags: [developer-productivity, metrics, dora, evaluation, strategy, code-review]
sources:
  - "summaries/2026-09-30_ai-engineer_state-of-ai-in-software-development-data-from-400-orgs.md"
timestamp: "2026-10-13"
---

# Measuring AI's Impact on Developer Productivity

How much faster do engineering organisations actually get with AI coding tools, which metrics move, and how should you measure it? This page collects the measured, org-level answers. Its first source is Justin Reock (Deputy CTO, DX) presenting DX platform data from 400+ organisations at AI Engineer (published 2026-09-30, likely recorded around June 2026).

**Read every figure here with its caveat attached.** DX sells developer-productivity measurement tooling, so its framing (measure more, use our framework) matches its product. The sample behind each figure is often unstated, the study window is garbled in the talk, several survey deltas do not say whether they are relative or absolute, and the causal explanations are the speaker's interpretation rather than something the data shown demonstrates. See [Data Caveats](#data-caveats) below. [Source: 2026-09-30_ai-engineer_state-of-ai-in-software-development-data-from-400-orgs]

## The Headline: Modest Median, Long Tail

| Statistic | PR throughput change |
|-----------|----------------------|
| Median | **+7.7%** |
| Mean | +13% |
| Top performers | around +70% |

"Nobody hit 2x, nobody hit 5x, nobody hit 10x" [15:22-15:44]. The gap between median and mean says a minority of organisations pull the average up; the typical organisation sits in single digits. The study window is stated as "November to 2024 to February this year", which is garbled.

Developers' own sense of speed-up is similarly small: **perceived rate of delivery up about 4.5% over a year** [03:34-03:49], whether relative or absolute is not stated.

**How to apply:** when someone quotes "10x", ask for the median and the metric. Use ~8% median PR throughput as a realistic planning anchor for an organisation that has not changed anything else, not as a ceiling.

## Why the Gains Are Modest: Code Generation Was Never the Bottleneck

Reock's explanation is Goldratt's **theory of constraints**:

1. Code generation is an estimated **14-16% of the value stream** (figure given without a source) [15:00-15:15].
2. Even perfect, instant code only speeds up that slice.
3. Most delay sits elsewhere: meeting-heavy days, context switching, interruptions, slow build pipelines, review and other friction around the code [15:44-16:08].
4. Improving a non-bottleneck does not raise system throughput: an hour saved there is worthless [16:08-16:18].
5. **Therefore** median gains stay in single digits, and real gains need AI aimed at the actual bottleneck.

Two segment findings fit the same story, both with the causes as interpretation rather than shown:

- **Smaller companies lead in time savings**, attributed to simpler release pipelines and less organisational friction [10:18-10:37].
- **Experience shifts cost, not savings.** Juniors use AI most and spend more tokens per use case; staff+ engineers save about the same time with fewer tokens, attributed to better hallucination-spotting and architectural understanding [08:50-10:18].

**How to apply:** map where time actually goes (meetings, review, CI waits, onboarding, incident discovery) before buying more generation capacity, and aim AI at the largest of those. Measure token efficiency per use case and seniority, not only usage volume.

## What Moves, Metric by Metric

| Metric | Change | Speaker's explanation | Evidence status |
|---|---|---|---|
| PR throughput | Median +7.7%, mean +13%, top ~70% [15:22] | Time savings swallowed by non-AI friction | Measured (DX platform); window garbled |
| Deployment frequency (DORA) | Steady increase, tapering; Europe dipped last quarter [01:56-03:28] | Early surge from shipping PRs more often; regional differences in practice, spend, regulation | Trend on chart, no number; causes are interpretation |
| Perceived rate of delivery | ~+4.5% over a year [03:44] | Notably flat given the investment | Survey; relative or absolute unclear |
| Change failure rate (DORA) | Much more volatile; some orgs up to +2 vs a ~4% benchmark [04:46-05:28] | Mostly pipeline and testing; AI raises the amplitude | Per-company chart, unstated subset; "~50% more defects" holds only if +2 is percentage points |
| Code maintainability (perceived) | ~+4% [06:07-06:13] | Assistants make code easier to understand and modify | Survey, ~200,000 engineers cited |
| Change confidence | ~−6% [06:21-06:37] | Developers trust AI output less, fear breaking things; linked to bigger PRs | Survey; causal link is interpretation |
| PR size | ~44 → ~72 lines average [07:09-07:16] | Verbose "law of averages" model code; slow pipelines push developers to batch several changes into one PR | Measured; causes are interpretation |
| Incremental delivery (perceived) | ~−10% [08:12-08:28] | Follows from larger PRs; hurts rollback and reviewability | Survey; relative or absolute unclear |

The pattern: **speed metrics rise modestly, size and risk metrics move the wrong way, and perception splits** — code feels easier to change (maintainability up) but less safe to ship (confidence down). Reock calls PR size "one of the most important metrics" of the year [06:57-07:16].

The quality chain he argues, with its weak link marked:

- AI makes code cheap; models favour verbose code; slow pipelines make many small PRs expensive.
- So PR size rises.
- Bigger PRs mean more to review, more bug and vulnerability surface, harder rollback.
- So incremental delivery and change confidence fall.
- **Weak link:** the step from PR size to change confidence is asserted, not demonstrated in the data shown.

**How to apply:** track PR size and change failure rate alongside throughput. A throughput gain paired with rising PR size and CFR is not a net gain. The Faros AI figures on [Five Levels of AI Coding § The Counterweight](five-levels-of-ai-coding.md#the-counterweight-volume-up-review-quality-down-faros-ai-2026) point the same way on the review side.

## How to Measure: Cohorts on Metrics You Already Trust

DX's **AI Measurement Framework** has three dimensions, presented as a maturity curve organisations move through left to right [12:15-13:27]:

| Dimension | Question | Typical data |
|-----------|----------|--------------|
| **Utilization** | Who uses which tools, how often, for what | DAU/WAU, tool telemetry |
| **Impact** | Which business and productivity metrics should move as utilization rises | Foundational delivery metrics |
| **Cost** | What it costs in tokens and licences | Spend per team, per use case |

The method underneath it: **do not invent new AI metrics.** Developer-productivity measurement was unsolved before AI and AI confounds it further, yet leadership will still ask "we spent $10M on tokens, where's our 10x?" New AI-specific numbers (usage, acceptance rates) do not answer that. Instead, split engineers into cohorts (for example by AI usage from API telemetry) and compare the cohorts on **foundational metrics you already trust** — PR cycle time, PR size, review pushback [11:14-13:27].

Reock expects the cost dimension to become as hard to manage as cloud spend. For a different stance on what to bring to the budget conversation, see [Agent Enablement § Defending the Investment](agent-enablement.md#defending-the-investment).

**Self-reports, both directions.** Reock contrasts DX's nearly flat aggregate perception (+4.5%) with the METR study, where individual developers overestimated their speed by a wide margin; he calls that study small and flawed and says METR published a follow-up in February describing some signals as imperfect [04:00-04:30]. The practical rule either way: do not rely on self-reports alone, pair them with telemetry. The wiki's existing account of METR is on [Five Levels of AI Coding § The J-Curve](five-levels-of-ai-coding.md#the-j-curve-of-ai-adoption). How much weight the METR study can carry is held open on [Five Levels of AI Coding § Unresolved Tensions](five-levels-of-ai-coding.md#how-much-weight-can-the-metr-study-carry), and so is the gap between DX's median and the larger gains reported elsewhere ([§ How large are the gains](five-levels-of-ai-coding.md#how-large-are-the-gains-from-ai-coding)).

## Platform AI Readiness

How well the engineering environment supports agents: accurate, well-structured documentation, data structures with straightforward relations, modular code, reliable local CI, non-flaky tests [13:27-14:18]. Reock's point is that this is good developer experience under a new name — "what's good for humans is also good for agents."

He describes the industry arc as coding assistants (2024) → agents (2025) → discovering the infrastructure wasn't ready → extending AI across the whole SDLC rather than only code generation [13:27-13:39, 14:54-15:22].

**How to apply:** treat platform readiness (CI speed, test reliability, docs) as a prerequisite investment, not a follow-on — it is also the non-code bottleneck the theory-of-constraints argument points at. Compare the harness-side version on [Harness Engineering](harness-engineering.md) and the lifecycle-side version on [AI-Native SDLC](ai-native-sdlc.md).

DX also surveys the agents themselves ("agent experience"): steering, context quality and feedback cycles, plus use case and token spend per task [09:25-09:46, 14:18-14:54]. This is product framing; the talk shows no results from it beyond the junior/senior token difference.

## Case Studies: Attacking Non-Code Bottlenecks

All figures are company-reported, relayed secondhand by Reock [16:21-18:31]:

| Company | What AI removes | Reported result |
|---------|-----------------|-----------------|
| **Morgan Stanley** (DevGen AI) | Reverse-engineering legacy code (mainframe Natural, COBOL, Perl) into PRDs for engineers | ~300,000 hours a year |
| **Zapier** | Admin overhead: agent-summarised stand-ups (five → two per week), onboarding in about two weeks vs an industry benchmark of over a month, ~3,000 PR-triggered superficial reviews per week kept in PR comments | ~15% more value per engineer; hiring more than ever — "a throughput story, not a headcount replacement story" |
| **Spotify** | Incident discovery: an SRE agent pulls runbook steps and context into SRE channels | Minutes cut at incident start |

**How to apply:** look for AI uses that remove a whole step outside code writing — reverse engineering, meetings, onboarding, first-pass review, incident triage.

## Data Caveats

- **Vendor data.** DX sells the measurement tooling the talk recommends. Case-study figures are company self-reports relayed secondhand.
- **Sample per figure unclear.** "400+ orgs" is in the title; ~200,000 engineers is cited once, at the maintainability slide [06:17]. The CFR chart is an unstated subset.
- **Study window ambiguous** ("November to 2024 to February this year").
- **CFR arithmetic.** "+2% vs a ~4% benchmark = ~50% more defects" holds only if the 2 is percentage points, which is not stated.
- **Survey deltas** (+4.5%, +4%, −6%, −10%) do not say whether they are relative change or absolute points.
- **The 14-16% value-stream share** for code generation has no source.
- **Causal explanations** (regional differences, company size, PR-size growth, CFR volatility) are interpretation, not shown by the data.

## Related Pages

- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — the J-curve, the METR study, Anthropic's output-volume framing and the Faros AI counterweight
- [The Collaboration Paradox](collaboration-paradox.md) — Anthropic's argument for measuring loop quality instead of delegation
- [Agent Enablement](agent-enablement.md) — Debois's system metrics (human touches per correct result, shared-system multiplier) and the budget conversation
- [AI-Native SDLC](ai-native-sdlc.md) — the vendor playbook that also says the constraint moves off Build, with per-play leading and lagging indicators
- [Plan and Review](plan-and-review.md) — Knight-Webb's account of where saved coding time goes
- [Reviewer Agents](reviewer-agents.md) — automating first-pass review, and the open question of PR volume vs PR quality
- [Cognitive Debt](cognitive-debt.md) — the human-side cost behind falling change confidence
- [Harness Engineering](harness-engineering.md) — environment readiness from the agent's side
