---
title: "Agent Enablement"
type: "concept"
description: "Patrick Debois's organizational layer for scaling coding agents past the individual — team rituals, a platform layer with named ownership, and an explicit engineering mandate"
pillar: "building"
tags: [agents, organizational-design, workflow, strategy, devops, best-practices, platform-engineering, metrics, hiring]
sources:
  - "summaries/2026-08-22_ai-engineer_coding-agents-dont-scale-themselves-neither-do-your-teams.md"
  - "summaries/2026-08-21_anthropic_the-ai-native-sdlc-playbook.md"
timestamp: "2026-09-15"
---

# Agent Enablement

The organizational work of getting coding agents to scale past the individual developer. Named here after Patrick Debois's August 2026 AI Engineer talk, which is deliberately an organizational talk rather than a technical one: the premise is that the technical layer — loops, harnesses, agent optimization — is converging, so the remaining variance between two companies running the same tools is how they are organized.

The structuring claim is **Conway's law**: how you organize and the tools you build are coupled, so adopting agents changes team dynamics, the platform, and the organization whether or not anyone plans for it. The talk walks up three levels accordingly — the **team**, the **platform layer**, and the **VP Engineering mandate** — and each level has a characteristic failure mode that the level below cannot fix. [Source: 2026-08-22_ai-engineer_coding-agents-dont-scale-themselves-neither-do-your-teams]

## "It Will Not Work Here" Is a Readiness Report

Debois's entry point is an analogy to 2009, when continuous delivery was called crazy. The objection then was not technical, and the objection now — aimed at autonomous workflows and the [dark factory](software-factory.md) — is not either: it names the local environment ("here"), not a blocker. Read as a readiness report, it is information about the organization's current setup, which is the thing the rest of this page proposes to change.

**How to apply:** when you hear a technical objection to autonomous workflows, re-ask it as an organizational readiness question — which ritual, which ownership, which mandate is actually missing?

The analogy's weak point is worth carrying: continuous delivery eventually worked, and that is assumed to transfer rather than argued.

## Level 1: The Team

### The Developer Identity Problem

The resistance Debois describes is not a skills gap, it is a craft grievance: *"we didn't sign up for this, we didn't sign up for better prompting, writing better specs, we're engineers, we're technical"* [03:09]. Context engineering was a partial answer — it made the work testable, distributable, optimizable — but *"still a lot of developers kind of felt empty"* [03:43], because it remains prompt-shaped work.

The resolution he offers is that harness and tooling work is genuinely programmatic, so the abstraction ladder opened a new place for engineering rather than removing one: *"the craft created some new location for more engineering stuff to go to"* [04:31].

**Route the skeptics into it.** The developers most annoyed by vanilla agent output are the ones holding the sharpest tacit standards — exactly what the harness is missing. *"Use almost that anger, use kind of that skepticism to kind of make it better"* [05:14]. Give your loudest quality critic ownership of a context file or a verifier, framed as "put all your knowledge in here so the agent stops doing the thing you hate."

### Improve the System, Not the Output

The mentality shift Debois would ask of any company, echoing Swix: **build the thing that builds the thing** [05:48]. When an agent's output is wrong, the fix belongs in the context, harness or guidelines followed by a re-run — not in the diff. A hand-patch is an exception worth logging, not a resolution. Compare [System Evolution](system-evolution.md), which is the same move run as an explicit outer loop after a defect ships.

The corollary is that engineering practices did not become optional, they became instructions: tests and documentation are now things you ask the agent for, and *"if you still have people who kind of yoloing their way into this… tell them no, stop doing this"* [06:47]. Encode the team's definition of done into the agent's standing instructions so good practice is enforced by the harness rather than by review nagging.

### Change the Rituals

Two ritual changes distinguish the teams Debois considers advanced:

| Ritual | The change |
|--------|-----------|
| **Retro** | Run it on *system* failures, not code failures — "the agent went over and over hit this problem. Can we fix the system?" [07:23] |
| **Planning** | Split the backlog at planning time into sufficiently scoped work that goes straight to agents, versus unscoped work that stays a human conversation |

**How to apply:** add a standing retro question — "what did the agent trip over repeatedly?" — and tag each backlog item as agent-ready or needs-conversation before the sprint, not during it.

### The Team Lead Sets the Pace

Prompting → specs → context → harness → loops is a progression, and it does not happen by telling people to go figure it out. The lead supplies the constraint and the directive: *"stop prompting, make the context reusable"* [08:24]. Name the team's current rung and the next one, with a date, as a directive rather than an invitation.

A consequence most teams meet quickly: **the harness has to extend past coding.** If engineering ships faster, go-to-market, users and requirements-gathering become the constraint. Audit which upstream or downstream function is now the bottleneck before adding more throughput to engineering.

### Two Metrics That Are Not Productivity

Debois offers two numbers in place of token spend and in place of the 10x-developer frame:

1. **Human touches per correct result** — *"how many human touches you still do to have the agent do the right thing"* [09:38]. It should fall as harness, context and guidelines improve, which makes it a measure of the *system* rather than of a person.
2. **The shared-system multiplier** — *"This is not the multiplier from the one person becoming the 10x person, but the one change that optimize the agents has an impact on all the people"* [10:05]. Fix something once, every team benefits; the progression solo → team → *multiplayer system* is where multiplication actually lives.

**How to apply:** instrument how many human interventions a typical task takes end to end, and count how many teams consume each shared context or harness component. Both numbers survive the budget conversation better than a with-agent/without-agent productivity comparison — see [Defending the Investment](#defending-the-investment) below. The eval-side companion is [Agent Evaluation § Error Budgets per Eval](agent-evaluation.md#error-budgets-per-eval-debois): per-eval budgets tell you whether an artifact is good, touches tell you whether the system around it is improving.

## Level 2: The Platform Layer

### New Objects, and Nobody Clearly Owns Them

Agent adoption creates platform objects that fit no existing team's charter: **skill registries**, **eval systems for context**, **guardrails specific to coding agents**, and **agent identities**. The platform team owns infrastructure but not development; developer experience owns neither [10:16-13:23].

That gap — not the design of the registry — is the failure mode. **Name a single owner for the agent-enablement program before building anything.**

The visible symptom of not doing so is **skill fork sprawl**: two similar skills, two maintainers, and a consumer with no basis for choosing — *"which one do I pick?"* [12:24]. The admission criteria that prevent it are ownership, testability, extensibility, and a security scan; an artifact that cannot clear them stays personal rather than shared. See [Agent Skills § Who Owns the Registry](agent-skills.md#who-owns-the-registry-and-the-fork-sprawl-failure-mode) and [Context Development Life Cycle § Distribute](context-development-life-cycle.md#3-distribute).

### Three or Four Paved Roads, Not One Consensus

Debois takes **paved roads** from cloud platform engineering — reusable context, shared harness components, a registry for the authentication skill every team would otherwise reinvent — and adds the agent-era twist: do not aim for one road. Cross-team agreement on ways of working *"requires a lot of communication and brokerage"* [13:05] and rarely converges at a price worth paying.

The shape that does work is *"a catalog of three, four paved roads where they can pick off and they can still do their own but that's on their own budget"* [13:09]. Centrally maintained is the cheap path; off-road is permitted and self-funded. **The maintenance asymmetry is the adoption incentive** — not a mandate, not a standard.

Note the asymmetry with [Harness Engineering § Harness-Over-Model](harness-engineering.md#harness-over-model-buetows-controlled-tdd-experiment): Buetow argues standardizing an org on a single tool is an anti-pattern because the best harness is a moving target. A small catalog of maintained roads is the same conclusion reached from the cost side rather than the capability side.

### Cost as an Optimization Lever, Not a Cap

Two connected moves.

**Make cost visible where it is incurred.** *"If they visualize the cost, they might be eager to do some optimization"* [13:33]. Expose per-team and per-workflow spend alongside iteration counts, so the optimization target becomes turns-to-correct rather than raw tokens — reducing agent iterations is itself an optimization nobody can see without instrumentation.

**When finance pushes back, optimize the spend rather than capping it.** *"Your reflex should be let's optimize the spend"* [18:34] — right model choice, model education, better context and harnesses, which reduce cost as a side effect of improving quality. The argument in full:

1. Cost is currently invisible at the point where it is incurred, so nobody optimizes it.
2. Iteration count is the dominant cost driver, and iterations fall with better context, better harness and correct model choice.
3. Those same improvements also improve output quality and reduce human touches.

A cap therefore rations a capability whose cost is a symptom of an unfixed system. Capping only makes sense once the optimization levers are exhausted, which — given premise 1 — nobody has yet established.

**How to apply:** answer a proposed spending cap with a named optimization plan (model routing, context trimming, fewer iterations) and a target, so the lever stays performance rather than rationing.

## Level 3: The Mandate

### Both Default Strategies Fail

| Strategy | Why it fails |
|----------|-------------|
| **Generic transformation theatre** — hackathons, lunch-and-learns, champions programs | Interchangeable with every prior wave: *"could have been agile… could have been devops"* [14:45] |
| **Laissez-faire** — licenses plus education plus "let a thousand flowers bloom" | Produces the fork sprawl and ownership gap above, with no one funded to fix either |

What Debois asks for instead is narrow and specific: the **VP Engineering issues an explicit mandate to team leads *and* to the platform team** to do this work, with time allocated. The mandate is the thing neither level below can grant itself — a team lead cannot allocate platform capacity, and a platform team cannot change another team's rituals.

### Defending the Investment

Faster delivery and better quality are *"hard to prove"* [17:51]. Improvement in agent effectiveness and degree of reuse are showable. Bring turn-reduction curves and reuse counts to the budget conversation instead of attempting a with/without-agent productivity comparison — this is what the two metrics above are *for*. Compare [Five Levels of AI Coding § Productivity as Output Volume](five-levels-of-ai-coding.md#productivity-as-output-volume-not-speed-anthropic-2026), which argues the same measurement point from the output side.

### Hiring: Three Signals, Scored Separately

New job titles carry no signal — *"AI product engineer… agentic engineer, AI engineer — it doesn't mean anything"* [15:22] — because nobody is mature yet, so a posting communicates intent rather than a validated skill bar. Debois's replacement is a three-part interview:

1. **An AI-first exercise.** Let the candidate *"go nuts on AI"* [16:18] on a real task.
2. **A taste walkthrough.** *"Explain me what happened, why is this a good idea"* [16:36] — this is where engineering judgment shows, and it is the part the exercise alone cannot measure.
3. **A collaboration and sharing probe.** Whether what they learn propagates to other people, which is the shared-system multiplier expressed as a hiring criterion.

Score the three separately rather than collapsing them into junior/senior; gaps in any one are mentorable. The complementary problem — designing a task that models cannot trivially solve — is on [AI-Resistant Evaluation Design](../comparisons/ai-resistant-evaluation-design.md).

### Teams Do Not Collapse to One or Two People

The solo-builder end state does not survive operations. The full-stack solo builder needs complementary PM and design skills, a holiday backup, someone carrying production tickets, and a junior learning what good looks like — which reassembles into roughly three to five people [18:55-19:51]. Resist headcount plans premised on solo builders, and keep investing in education, particularly for juniors who otherwise never see what good looks like. See [Five Levels of AI Coding § The Talent Pipeline Collapse](five-levels-of-ai-coding.md#the-talent-pipeline-collapse).

### Sequencing the Rollout: Gates Before Automation

Debois says *who* must mandate and own the work; Anthropic's AI-Native SDLC playbook (August 2026) supplies an *order* for it, and the order is not the lifecycle order. Plays with no prerequisites (`intent.md` capture, CLAUDE.md, skills, the test feedback loop, hooks as approval gates) can start in any team at any time. CI/CD automation requires PR review and hooks-as-gates first, "because the gates must exist before automation accelerates anything through them"; closing the loop from production back into planning additionally requires a rollback path rehearsed in staging. [Source: 2026-08-21_anthropic_the-ai-native-sdlc-playbook]

**How to apply** (vendor-prescriptive, not measured): start a team with CLAUDE.md, the feedback loop and one skill; do not wire merge-triggered agent jobs until the review gate and the production hook exist. The playbook pairs each play with a leading and a lagging indicator, most of them readable from git timestamps, PR metadata and the OpenTelemetry export without new instrumentation — a per-play complement to the two system-level metrics above. See [AI-Native SDLC § Adoption Order Is Not Stage Order](ai-native-sdlc.md#adoption-order-is-not-stage-order).

## Where This Lands: Dim Factory and Continuous Learning

Debois's endpoint is not on this page but it is what the three levels are building toward: a **dim factory** — autonomy tiered per feature rather than switched on org-wide — and **continuous learning** as the successor to continuous delivery, where the diagnostic is how fast you can swap a component in and out while keeping the system reliable. Both are on [Software Factory § The Dim Factory](software-factory.md#the-dim-factory-autonomy-as-a-per-feature-risk-decision-debois).

## Open Question: Does the Harness Commoditize?

The talk's motivating premise is that loops and harnesses will *"kind of become commodity somewhere"* [01:23] and therefore will not differentiate an organization — which is why the organizational layer above is where the discretionary investment should go. That premise stands against this wiki's existing framing of the harness as long-lived IP, and against Debois's own closing claim that the moat is captured knowledge in skills, context and harness constraints.

**The tension is unresolved and deliberately not merged here.** This page's argument does not depend on settling it: every level above is worth building whether or not the generic harness consolidates, because rituals, ownership and mandate are organization-specific either way. The plumbing/payload split at [Harness Engineering § Which Half Is the Asset?](harness-engineering.md#which-half-is-the-asset-deboiss-commoditization-claim) is this wiki's attempt at the line Debois leaves undrawn; what stays open is whether the plumbing half consolidates as fast as he expects.

## Related Pages

- [Patrick Debois](../people/patrick-debois.md) — author of this framing; DevOps originator
- [Software Factory](software-factory.md) — the dim factory, and the pipeline this organization is enabling
- [Context Development Life Cycle](context-development-life-cycle.md) — the context lifecycle whose solo → team → org flywheel this page supplies the scaffolding for
- [Agent Skills](agent-skills.md) — registry ownership, fork sprawl, skills as the paved-road unit
- [Agent Evaluation](agent-evaluation.md) — eval systems as an unowned platform object; per-eval error budgets
- [Harness Engineering](harness-engineering.md) — the technical layer this page argues is necessary but not differentiating
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — the maturity ladder, the J-curve, and the talent-pipeline argument
- [System Evolution](system-evolution.md) — "improve the system, not the output" run as an explicit outer loop
- [Cognitive Debt](cognitive-debt.md) — the individual-level risk the education investment is meant to contain
- [AI-Resistant Evaluation Design](../comparisons/ai-resistant-evaluation-design.md) — designing the hiring exercise the three-signal interview needs
- [AI-Native SDLC](ai-native-sdlc.md) — Anthropic's play-by-play adoption order and per-play indicators
