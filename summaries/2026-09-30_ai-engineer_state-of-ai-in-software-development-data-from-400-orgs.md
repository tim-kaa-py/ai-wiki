---
title: "The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX"
type: "summary"
description: "DX's platform data shows modest AI productivity gains (median ~7.7% PR throughput, nobody near 2x) alongside quality and trust side effects, which Justin Reock attributes to code generation never having been the bottleneck."
channel: "AI Engineer"
date: "2026-09-30"
resource: "https://www.youtube.com/watch?v=Se8jHLliLXE"
pillar: "ecosystem"
tags: [developer-productivity, metrics, dora, evaluation, strategy, code-review]
timestamp: "2026-10-13"
source_file: "sources/youtube/2026-09-30_ai-engineer_state-of-ai-in-software-development-data-from-400-orgs.md"
---

# The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX — Summary

**Source:** AI Engineer | 2026-09-30 (likely recorded around June 2026) | [Link](https://www.youtube.com/watch?v=Se8jHLliLXE) | 19:09

## TL;DR

Justin Reock, Deputy CTO at DX (a developer-productivity measurement vendor), presents platform data on what AI has done to engineering organisations over roughly a year. The headline number is modest: a **median 7.7% increase in PR throughput** (13% mean, top performers around 70%, nobody at 2x). Deploy frequency, perceived maintainability and PR size went up, while change confidence and incremental delivery went down, and change failure rate became far more volatile. His explanation: code generation was never the bottleneck, so time saved by AI is eaten by meetings, context switching, slow pipelines and other non-AI friction. The data is vendor-collected and several figures are ambiguous (see Data caveats).

## Video Structure

1. [00:00-01:25] Intro: DX, its quarterly State of AI reports, and the research lineage (DORA, SPACE, DevEx).
2. [01:25-04:35] Velocity: deploy frequency up but tapering, regional differences, perceived delivery rate up only ~4.5%, METR perception-gap contrast.
3. [04:37-08:41] Quality: change failure rate volatility, maintainability up vs change confidence down, PR size 44 → 72 lines, incremental delivery down 10%.
4. [08:43-10:37] Demographics: juniors use AI most and burn more tokens, staff+ save the same time; smaller companies save more.
5. [10:37-14:54] Measurement: AI Measurement Framework (utilization, impact, cost), cohort comparisons, platform AI-readiness, agent-reported feedback.
6. [14:54-16:21] Why gains are modest: code generation is 14-16% of the value stream; median 7.7% PR throughput; theory of constraints.
7. [16:21-18:31] Case studies: Morgan Stanley, Zapier, Spotify attacking non-code bottlenecks.
8. [18:31-18:52] Outro: Q1 report, Q2 report coming.

## Key Concepts

### DX AI Measurement Framework

DX's three-dimension model for measuring AI adoption, presented as a maturity curve that most organisations move through left to right [12:15-13:27]:

- **Utilization:** who uses which tools, how often, for which use cases (DAU/WAU, tool telemetry).
- **Impact:** which business and productivity metrics should move as utilization rises.
- **Cost:** token and licence spend, which Reock expects to become as hard to manage as cloud costs.

The core method: do not invent new AI metrics. Split users into cohorts (for example by AI usage from API telemetry) and compare those cohorts on **foundational metrics you already trust**, such as PR cycle time, PR size and review pushback [11:14-13:27]. DX publishes a white paper on the methodology.

### Platform AI readiness

How well the engineering environment supports agents: accurate, well-structured documentation, data structures with straightforward relations, modular code, reliable local CI, non-flaky tests [13:27-14:18]. Reock's point is that this is just good developer experience under a new name: "what's good for humans is also good for agents."

### Agent experience

DX surveys the agents themselves: qualitative feedback about steering, context quality and feedback cycles with their human, plus use case and token spend per task [09:25-09:46, 14:18-14:54]. This is DX's product framing; no results beyond the junior/senior token difference are shown in this talk.

## Key Takeaways

### Q1: What is the average productivity gain?

1. **Median +7.7% PR throughput, mean +13%, top performers around +70%** in DX's study (window stated as "November to 2024 to February this year", garbled) [15:22-15:44]. "Nobody hit 2x, nobody hit 5x, nobody hit 10x." The gap between median and mean says a minority of organisations pull the average up.
   - **How to apply:** When someone quotes "10x", ask for the median and the metric. Use ~8% median throughput as a realistic planning anchor, not a ceiling.

2. **Developers' felt speed-up is also small: perceived delivery rate up about 4.5% over a year** [03:34-03:49], despite heavy investment. Reock contrasts this with the METR study (see Discovery A below), where individuals overestimated their speed by a wide margin; in aggregate, DX's perception data stays nearly flat.
   - **How to apply:** Don't rely on self-reports alone in either direction; pair them with telemetry.

### Q2: Why isn't it higher?

3. **Code generation was never the bottleneck.** Even perfect, instant code would only address an estimated 14-16% of the value stream (figure unsourced) [15:00-15:15]. AI time savings are "outweighed by other non-AI factors": meeting-heavy days, context switching, interruptions, slow build pipelines, friction around the code [15:44-16:08]. Citing Goldratt's theory of constraints: an hour saved on a non-bottleneck is worthless [16:08-16:18].
   - **How to apply:** Map where time actually goes (meetings, reviews, CI waits, onboarding, incident discovery) before buying more generation capacity, and aim AI at the largest of those.

4. **Larger, slower organisations capture less.** Smaller companies lead in time savings, which Reock attributes to simpler release pipelines and less organisational friction [10:18-10:37]. Europe pulled back on deploy frequency last quarter while North America kept rising; he speculates about working practices, token budgets and regulation [02:53-03:28]. Both explanations are his interpretation, not shown in the data.
   - **How to apply:** Treat platform readiness (CI speed, test reliability, docs) as a prerequisite investment, not a follow-on.

5. **Experience shifts cost, not savings.** Juniors use AI most and spend more tokens per use case; staff+ engineers save about the same time with fewer tokens, which he attributes to better hallucination-spotting and architectural understanding [08:50-10:18].
   - **How to apply:** Measure token efficiency per use case and seniority, not only usage volume.

### Q3: Trends

6. Deploy frequency rising steadily but tapering; early surge partly from shipping PRs more often [01:56-02:48].
7. PR size climbing toward doubling, called "one of the most important metrics" of the year [06:57-07:16].
8. Change failure rate becoming more volatile: the pattern existed before AI, "the amplitude has changed" [04:46-05:55].
9. A trust gap opening: code feels easier to change but less safe to ship [06:00-06:54].
10. Organisations moving from "coding assistant" (2024) to "agents" (2025) to realising infrastructure wasn't ready, and now extending AI across the whole SDLC/PDLC rather than only code generation [13:27-13:39, 14:54-15:22].

### Q4: How each metric is affected, and why

| Metric | Change | Speaker's explanation | Evidence status |
|---|---|---|---|
| PR throughput | Median +7.7%, mean +13%, top ~70% [15:22] | Time savings swallowed by non-AI friction | Measured (DX platform); study window garbled |
| Deployment frequency (DORA) | Steady increase, tapering; Europe dipped last quarter [01:56-03:28] | Early surge from more frequent PRs; regional differences in practice, spend, regulation | Trend shown on chart, no number given; causes are interpretation |
| Perceived rate of delivery | ~+4.5% over a year [03:44] | Notably flat given the investment | Survey; unclear if relative or absolute |
| Change failure rate (DORA) | Much more volatile; some orgs up to +2 vs ~4% benchmark [04:46-05:28] | Mostly release pipeline and testing; AI amplifies swings | Per-company chart, unstated subset; "~50% more defects" holds only if +2 percentage points |
| Code maintainability (perceived) | ~+4% [06:07-06:13] | Assistants make code easier to understand and modify | Survey, ~200,000 engineers cited |
| Change confidence | ~−6% [06:21-06:37] | Developers trust AI output less, fear breaking things; linked to bigger PRs | Survey; causal link is interpretation |
| PR size | ~44 → ~72 lines average [07:09-07:16] | Models produce verbose "mediocre" code; slow pipelines push devs to batch several functions into one PR | Measured; causes are interpretation |
| Incremental delivery (perceived) | ~−10% [08:12-08:28] | Follows from larger PRs; hurts rollback and reviewability | Survey; unclear if relative or absolute |
| Time savings by seniority | Roughly flat junior vs staff+; juniors spend more tokens [09:53-10:18] | Learning curve vs seniors' judgment | Measured (DX agent/token data) |
| Time savings by company size | Smaller companies lead [10:18] | Less pipeline and organisational complexity | Shown; causes are interpretation |

- **How to apply:** Track PR size and change failure rate alongside throughput. A throughput gain paired with rising PR size and CFR is not a net gain.

### Case studies: attacking non-code bottlenecks (Discovery D)

11. All figures are company-reported, relayed by Reock [16:21-18:31]:
    - **Morgan Stanley, DevGen AI:** reads legacy code (mainframe Natural, COBOL, Perl) and writes PRDs for engineers, removing the reverse-engineering step. Reported saving ~300,000 hours a year.
    - **Zapier:** an agent ecosystem for admin overhead. Stand-ups cut from five to two per week using agent summaries; onboarding in about two weeks (vs an industry benchmark of over a month); about 3,000 PR-triggered superficial code reviews per week, kept in PR comments so the human reviewer sees what was already checked. Reported ~15% more value per engineer, and the company is hiring more than ever: "a throughput story, not a headcount replacement story."
    - **Spotify:** an SRE agent that pulls runbook remediation steps and incident context into SRE channels, cutting minutes of discovery at incident start.
    - **How to apply:** Look for AI uses that remove a whole step outside code writing (reverse engineering, meetings, onboarding, first-pass review, incident triage).

## Argument Structures

### Why the gains are modest

- Code generation is ~14-16% of the value stream (unsourced estimate).
- Even perfect AI code only speeds up that slice.
- Most delay sits in meetings, interruptions, context switching, CI waits and review.
- Theory of constraints: improving a non-bottleneck does not raise system throughput.
- **Therefore** median gains stay in single digits, and real gains need AI aimed at the actual bottleneck (supported by the case studies).

### Why quality and trust degrade

- AI makes generating code cheap and fast; models favour verbose "law of averages" code.
- Slow build pipelines make many small PRs expensive, so developers batch generated code into one PR.
- **So** PR size rises (44 → 72 lines).
- Bigger PRs mean more to review, more bug and vulnerability surface, harder rollback.
- **So** incremental delivery sentiment falls (−10%) and change confidence falls (−6%), even though maintainability is perceived as better (+4%).
- CFR volatility is mainly a pipeline and testing problem, but AI raises the amplitude.

Weak link: the causal chain from PR size to change confidence is asserted, not demonstrated in the data shown.

### Measure AI through trusted metrics (Discovery B)

- Developer productivity measurement was unsolved before AI, and AI confounds it further.
- Leadership will still ask "we spent $10M on tokens, where's our 10x?"
- New AI-specific vanity metrics (usage, acceptance rates) do not answer that.
- **Therefore** keep the foundational metrics and compare AI-user cohorts against them, progressing from utilization to impact to cost.

### The METR perception gap (Discovery A)

- METR's study of 16 developers: actual productivity ~19% lower, perceived ~20% higher, a ~40-point gap [04:00-04:30].
- Reock calls the study small and flawed, and notes METR published a follow-up in February saying some signals were imperfect.
- DX's aggregate perception data, by contrast, stays nearly flat (+4.5%).
- Implication he leaves implicit: self-reported speed-ups are unreliable at the individual level, so measure.

## User Notes

### Answers to the four focus questions

- **Average gain:** median ~7.7% PR throughput (mean 13%); perceived delivery ~4.5%. Nobody reached 2x.
- **Why not higher:** code generation is a small slice of the value stream; non-AI friction absorbs the time saved; larger organisations and slower pipelines capture less.
- **Trends:** throughput and deploy frequency up but tapering; PR size up sharply; CFR more volatile; trust in changes down; focus shifting from coding assistants to whole-SDLC agents and platform readiness.
- **Per metric:** see the Q4 table. Speed metrics rise modestly; size and risk metrics move the wrong way; perception metrics diverge (maintainability up, confidence down).

### Data caveats

- **Vendor data.** DX sells developer-productivity measurement tooling; the framing (measure more, use our framework) aligns with its product. Case-study figures (Morgan Stanley, Zapier, Spotify) are company self-reports relayed secondhand.
- **Sample per figure unclear.** "400+ orgs" is in the title; ~200,000 engineers is cited only once, at the maintainability slide [06:17]. The CFR chart is an unstated subset of companies.
- **Study window ambiguous.** "November to 2024 to February this year" is garbled in the talk.
- **CFR arithmetic.** "+2% vs a ~4% benchmark = ~50% more defects" holds only if the 2 is percentage points, which is not stated.
- **Survey deltas** (+4.5%, +4%, −6%, −10%): not clear whether relative change or absolute points.
- **14-16% value-stream share** for code generation is given without a source.
- **Causal explanations** (regional differences, company size, PR size growth, CFR volatility) are the speaker's interpretation, not demonstrated by the data shown.
- The Whisper transcript renders the speaker's name as "Riach"; the correct name is Justin Reock.

## Related Topics

developer-productivity, metrics, dora, evaluation, strategy, code-review
