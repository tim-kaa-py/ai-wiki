---
title: "Multi-Perspective Research (STORM Pattern)"
description: "A research topology where several persona lenses research independently, a contradiction pass cross-examines them, and a separate verification fleet checks every citation against its primary source"
type: "concept"
pillar: "building"
tags: [research, agents, multi-agent, verification, claude-code, workflow, agent-skills, best-practices]
sources:
  - "summaries/2026-06-29_nate-herk_stanford-storm-method-claude-research-skill.md"
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
timestamp: "2026-08-07"
---

# Multi-Perspective Research (STORM Pattern)

A research topology built on one thesis: **naive LLM research is unreliable because nothing ever challenges its own results.** A single prompt encodes a single research plan, and a single research plan has blind spots — questions it doesn't think to ask. The fix is structural, not prompt-level: generate from several deliberately different angles, force the disagreements into the open, then have *different* agents verify the surviving claims against primary sources.

Named for Stanford's STORM method. The worked example in this wiki is Nate Herk's `storm-research` Claude skill (June 2026), which packages the principles into a two-file skill. Note the divergence worth keeping straight: STORM in the literature is a pipeline for generating Wikipedia-like articles via perspective-guided question asking. The Claude skill is a re-implementation of the *principles* in a subagent topology, not a port of the original system.

## The Three-Stage Shape

Everything else is scaffolding. If you fork this pattern into another domain, this is the part to keep:

1. **Independent generation** — N persona lenses research the topic in parallel, each with its own expertise and its own tools. They do not see each other's work.
2. **Explicit contradiction surfacing** — a pass that asks where the perspectives disagree and which side has the better evidence. This is what converts diversity into signal; N concatenated reports are worthless.
3. **Source-level verification** — a separate fleet re-checks every citation against its primary source and labels it `confirmed` / `corrected` / `demoted`.

The generating lenses are optimizing for finding evidence *for* their angle, not for auditing it. Self-verification inside the generating agent inherits the generator's motivated reasoning — the same self-evaluation bias argument as [Generator-Evaluator Harness](generator-evaluator-harness.md) and the fresh-context principle in [Reviewer Agents](reviewer-agents.md).

## The Four-Prompt Chain

The concrete anatomy. Nate ran this by hand first, then had Claude package the working run into a skill — a reproducible way to build your own variant.

```
Phase 0  scope         — ask clarifying questions if the topic is underspecified
Prompt 1 five lenses   — spin up practitioner / academic / skeptic / economist /
                         historian in parallel as subagents on the research topic
Prompt 2 contradiction — "where do the perspectives contradict each other?
         map             which one has good evidence? which has weak evidence?"
                         forces the lenses to analyze each other's outputs
Prompt 3 synthesis     — merge into the HTML report per report-template.html
Prompt 4 peer review   — ~6 verification agents; check every citation against its
         + verification   primary source; label confirmed / corrected / demoted;
                          rank findings by reliability with supported-by /
                          challenged-by lens attribution → V2
```

Roughly 12 agents total for a full run.

## The Lenses

The default cast is **Practitioner, Academic, Skeptic, Economist, Historian**. Each is a subagent with a persona, a background, and an area of expertise. The personas are load-bearing rather than decorative: the skeptic exists specifically to attack, and the final report tracks which lens *supported* and which *challenged* each finding.

The cast is domain-specific and meant to be replaced. For a technical-problem research variant, the five general lenses are the wrong roster — candidates that map better: the person who maintains the library, the person who has to operate it at 3am, the person who benchmarked it, the person who migrated off it, and a skeptic who assumes the docs are lying.

A **fixed lens count** is a cost and rate-limit feature, not just a design choice — bounded fan-out makes the run predictable. If you expand the roster, expand the verification budget with it.

### What a Lens Actually Samples

A caveat imported from an adjacent domain, where persona construction has been measured against ground truth rather than judged by output quality. Ishan Anand's field guide to [synthetic personas](synthetic-personas.md) reports that in voting-pattern research, persona construction "was actually amplifying bias within the model as they got more and more detailed... throwing it further and further astray from reality" [11:17] — because a persona is elicited from the model's latent representation of a group, and that representation carries training-data stereotype alongside real signal. Each added detail conditions harder on it.

Scope this correctly before applying it. That research measures *fidelity to a specific real human*, which is not what a STORM lens is for — a lens is a coverage device, judged by whether it raises questions the others miss. The finding does not transfer as a verdict. Two things it does imply here:

- **"The skeptic" may be the model's caricature of a skeptic** rather than a competent adversary. That degrades coverage in a way no citation check catches, because the verification fleet audits whether claims are true, not whether the right claims were raised. The [coverage self-critique](#coverage-self-critique-the-missing-lens) is the only stage positioned to notice.
- **Elaborating a lens persona is not obviously an improvement.** Absent ground truth for "did this roster find more real issues," longer persona blurbs are an untested knob, not a tuning win. The cheap check is Anand's: run the fork against a topic you already know cold (fork step 3 above) and see whether a richer roster actually surfaces more of what you know is there.

The distinct move worth stealing outright: he separates **grounding the world** (fixing free variables the model would otherwise invent) from **elaborating the person** (conditioning on identity). The first is safe to maximize; the second is not. For a lens roster, that means investing in shared task context — your stack, constraints, what "actionable" means — over richer character sketches.

## Verification Is the Load-Bearing Stage

Nate is explicit that pass 1 of his own run contained claims "that just wasn't correct," and that only V2 is trustworthy. The deliverable is versioned for exactly this reason: **V1 is the unverified draft, V2 is the verified one.** Practical rule for a fork: never consume a report that hasn't run the verification phase. If you cut a phase for speed, cut a lens — not the verifier.

Two output conventions worth copying:

- **Per-source verdict:** `confirmed` / `corrected` / `demoted`, collected into a source ledger at the bottom of the report.
- **Per-finding provenance and dissent:** a reliability score *plus* which lenses supported and which challenged it. "Reliability 7/10 — supported by the runtime-internals lens and the maintainer lens, challenged by the production-ops lens" is far more actionable than a bare confidence number.

## Coverage Self-Critique: The Missing Lens

Distinct from fact verification, the report also critiques *whose viewpoint is absent*. From Nate's example run: "All five lenses look at the firm from the owner's chair — adoption rates, productivity, ROI. None of them sat in the seat of the customer or the frontline employee." The follow-up is a one-liner:

```
Spin up that sixth lens and run a V3 of this HTML report.
```

Verification asks *are the numbers right*; the missing-lens critique asks *is the question framed too narrowly*. A fork should keep both — they fail differently.

## The Topology Ceiling

STORM lives entirely in the **subagent** topology: one main session, N workers, workers cannot talk to each other. Agent teams can — teammates message each other and argue toward consensus — but cost linearly in teammate count (see [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md)).

The consequence for this pattern: **there is no live debate.** Cross-examination happens once, centrally, in the contradiction-map prompt, over sealed lens outputs. No lens ever gets to respond to being contradicted.

Design around it. If a fork needs genuine back-and-forth — e.g. a proposed technical fix that must survive rebuttal and revision — that requires either the agent-team topology and its cost, or a manual second STORM round seeded with the contradiction map as input.

## Per-Stage Model Choice

Each subagent's model is an independent knob. Nate ran all five lenses on Opus 4.8 by preference, but notes they could all run on Haiku or Sonnet.

The useful split follows the same logic as the inverted implementer/reviewer split in [Reviewer Agents](reviewer-agents.md#inverted-model-split): cheap models for the evidence-gathering lenses, expensive models for the contradiction map and the verification pass — those are the stages where reasoning quality determines whether a wrong claim survives.

## Packaging: The Two-File Skill

The whole artifact is two files:

```
.claude/skills/storm-research/
├── skill.md              # the master prompt: phases, lens definitions, chain
└── report-template.html  # referenced by skill.md for output consistency
```

The template exists purely so every run produces a report with the same shape. Stable output shape is a deliberate feature, not cosmetics — it is what makes successive runs comparable and skimmable.

The skill is invoked in natural language, no slash command needed:

```
Hey Claude, please run a storm research for me on voice AI agents.
```

There is nothing to reverse-engineer beyond the text — a skill here is a master prompt (see [Agent Skills](agent-skills.md) and [Claude Code Skills § Two-File Skill](../how-tos/claude-code-skills.md#two-file-skill-body--output-template)).

## How to Fork This

1. **Keep the three-stage shape; swap the personas.** The chain and the topology are the transferable asset; the specific five lenses are not.
2. **Bake your standing context into the skill.** Your stack, your constraints, what "actionable" means for you. Without it you get a brain dump of statistics instead of a decision.
3. **Test on a topic you already know cold.** This is the only cheap way to detect confident-but-wrong output from a research pipeline: run the fork against a problem you have already solved and diff the report against what you know.
4. **Validate the verification stage per domain.** Whether the verifier actually catches errors in *your* field is the thing to measure — not whether the pipeline looks impressive.

## Read the Benchmark Critically

The headline claim attached to STORM is that peer-reviewed testing shows it produces articles **"25% more organized"** than the next best method. That metric measures **organization** — structure, coverage, coherence of the write-up. It says nothing about factual accuracy.

Meanwhile the reliability improvement actually demonstrated in Nate's video comes from the verification layer — the confirmed/corrected/demoted pass — which is *his* addition, not what the cited benchmark evaluated. The title-level promise ("PhD-level research team", peer-reviewed backing) and the mechanism doing the work (adversarial verification against primary sources) are not the same thing.

Practical consequence: do not adopt this pattern *because* of the 25% figure. Adopt it because a separate verification stage against primary sources is a real mechanism that catches real errors — and then evaluate your fork on whether its verification stage actually does that in your domain.

## Related Pages

- [Parallel Agent Patterns](parallel-agent-patterns.md) — the coordination models this instantiates
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — orchestrator-worker and evaluator-optimizer, the two canonical patterns chained here
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — why the checker must not be the generator
- [Reviewer Agents](reviewer-agents.md) — persona-based review and the fresh-context principle, applied to code rather than research
- [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md) — the peer-to-peer topology this pattern deliberately does not use
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — the hub-and-spoke topology the lenses run in
- [Agent Skills](agent-skills.md) — the packaging format
- [Claude Code Skills](../how-tos/claude-code-skills.md) — authoring, invocation, and the two-file layout
- [Auto Research](auto-research.md) — the sibling loop that optimizes a *skill*, where this one executes a *research task*
- [Synthetic Personas](synthetic-personas.md) — personas measured against ground truth, and why persona detail is non-monotonic
