---
title: Agent Loops (Loop Engineering)
description: Defines the reason-act-observe agent loop and Nate Herk's loop engineering mindset shift for designing systems that prompt agents
type: concept
pillar: building
tags:
  - agents
  - workflow
  - loop-engineering
  - verification
  - claude-code
  - agent-architecture
sources:
  - summaries/2026-06-19_nate-herk_agent-loops-clearly-explained.md
  - summaries/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md
  - summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md
timestamp: 2026-08-03
---

# Agent Loops (Loop Engineering)

An **agent loop** is an AI that **reasons** about what to do, **acts** (implements), then **observes** its own result, repeating until a defined stop criterion is met. *Loop engineering* is Nate Herk's framing for the mindset shift it implies: you stop *prompting* the agent turn-by-turn and instead **design the system that prompts it** — you replace yourself as the person in the prompt seat. The term is used loosely across the field; the contribution here is collapsing the competing framings (think-act-see, model-with-tools back-and-forth, unattended goal, nested manager agents) onto one core pattern.

## Reason → Act → Observe

The single primitive underneath every loop variant. Analogy: a smart intern you hand a goal to, who figures out the next step, checks their own work, loops, and only comes back to say "I'm done" after several self-corrections — you don't micromanage each step.

Two pillars define any loop:

### The Goal Pillar
What the loop pursues. Humans are good at stating what they want, so this is the **easy half**. Best practice: keep the goal **objective, not subjective** — "iterate until X metric equals Y result" beats "iterate until you're satisfied."

### The Verification / Done-Criteria Pillar
How the agent knows it has hit the stop condition. Nate's core claim: **this is where loops are won or lost** — the goal and verification pillars are *not* co-equal in practice. Verification can be:

- **Visual** — screenshot the rendered output
- **Functional** — run a code test
- **Qualitative** — does it match my tone of voice?

Rule: **a loop is only as good as its done-check.** When a fully objective metric isn't possible, fall back to "until 100% confident," but push toward measurable wherever you can — and add a **hard cap on passes** so a subjective loop can't run forever. (Worked contrast: a thumbnail-scoring loop stalled on "until you're satisfied"; an Abbey-Road-recreation loop terminated cleanly on "stop if average score ≥ 9.")

This is the beginner-facing statement of the same principle the production harnesses formalize — see [Generator-Evaluator Harness](generator-evaluator-harness.md) (separate evaluator agent + explicit rubric) and the evaluator-optimizer pattern in [Agent Orchestration Patterns](agent-orchestration-patterns.md).

## Why Loops Work — The Quality-vs-Attempts Model

The clearest "why" for looping at all:

- AI never one-shots a task to acceptable quality; you never just accept the first output.
- Plot quality (y-axis) against attempts (x-axis). Attempt 1 lands ~50%; each round of feedback bumps it 5–10% until you reach a "good enough" 90–95%.
- That feedback-and-iteration cycle *will happen either way* — the only question is **who runs it**.
- So outsource the cycle to the agent. With the agent self-iterating, attempt 1 jumps much higher and by attempt 3–4 you're far above where un-looped output would sit.

The loop doesn't change *that* you iterate; it changes *who* iterates and *how fast* you climb the curve. Corollary: loops aren't meant to produce 100% perfect output — they get you much closer on the first try. Treat the output as a strong draft to iterate from, not a finished deliverable.

## Loop Topologies

A dimension **separate** from the reason-act-observe core — the same loop logic can be wired into any of these shapes:

| Topology | Shape | When |
|----------|-------|------|
| **Solo loop** | One agent reasons, acts, observes, repeats | Nate's most-used; usually just one terminal session and a good prompt |
| **Maker-checker** | One agent does the work, a second agent grades it and gives feedback | When self-evaluation is unreliable; the checker is a dedicated, separately-evaluated scoring sub-agent |
| **Manager-with-helpers** | One orchestrating agent coordinates multiple sub-agents ("Russian nesting dolls") | Decomposable, parallelizable work |

Maker-checker maps onto the [Generator-Evaluator Harness](generator-evaluator-harness.md); manager-with-helpers maps onto orchestrator-workers in [Agent Orchestration Patterns](agent-orchestration-patterns.md) and the fleets in [Parallel Agent Patterns](parallel-agent-patterns.md). This page is the entry-level view; those pages are the production-scale treatments.

## When a Loop Is Worth It

1. **Most tasks don't need a loop — but adding verification almost always pays off.** Default to a **solo loop with an explicit verification step** before reaching for orchestration. You often just need one terminal session and a good prompt; don't reach for multi-agent architecture by default.
2. **Ask two questions before building any loop:** what does "done" mean, and how will it check? Verification differs by artifact — a game checks visually, functionally, and by play-testing; a script checks flow and tone, not pixels. List the concrete checks first and make sure the agent has the tools (browser/screenshot, test runner) to perform them.
3. **Size the loop to cost and time.** Nate's productive loops sit around **35 minutes to a couple of hours**; he has run 12-hour-plus loops that weren't worth it. Reserve overnight "chunky" runs for big, experimental goals — fire them before bed, then feed the morning output into shorter loops or human iteration. Avoid runs whose done-criteria may never be reachable.

> **Hype caveat.** The "if you don't run agent swarms 24/7 you're falling behind" framing oversells it. The loops actually worth running sit in a minutes-to-a-few-hours sweet spot, not the headline "agents running for days" demos.

## Loop Advice Doesn't Transfer 1:1 Across Roles

Practitioner heuristics about loops are **role-dependent**. Peter Steinberger running everything as loops makes sense for an engineer doing large-codebase work; Nate uses Claude Code for **knowledge work**, not big refactors, and sizes his loops accordingly. Stay current with what power users do, but adopt loops where *your* work actually benefits — not from FOMO. (See [Peter Steinberger](../people/peter-steinberger.md) for the codebase-work end of this spectrum.)

This is also why the cost framing here (knowledge-work loops kept short) sits comfortably alongside the much larger spend justified for high-value coding loops in [Generator-Evaluator Harness § The Cost Reality](generator-evaluator-harness.md#the-cost-reality): both gate on value-per-run, but the value ceiling differs by domain.

## The Verification Pillar at Multi-Day Scale (Cherny)

Nate's claim that *"a loop is only as good as its done-check"* gets its strongest independent confirmation — and its mechanism — from Boris Cherny (July 2026). His account of *why* verification is load-bearing over long horizons:

- Modern models can sustain a task for days or weeks.
- Over that horizon the binding constraint stops being capability and becomes **drift** — *"this is about hallucination"* [22:26-22:29].
- A model with a way to check its own work *"doesn't get stuck, and it will just go"* [22:41-22:48]; without one, errors compound silently and unrecoverably.

So the done-check isn't only a *stop* condition — it's the mechanism that keeps the loop's intermediate states anchored. This reframes the "verification is where loops are won or lost" claim: the verifier is doing continuous correction, not just gating the exit.

His canonical loop prompt is task + verification channel + exit condition and nothing else — *"Rewrite the Electron app in Swift. Run the Electron app in the Mac virtual machine, screenshot it, and then look pixel by pixel, compare it to the Swift version. Don't stop until you're done."* Note that *"don't stop until you're done"* is the un-objective phrasing Nate warns against; it works here **because the pixel-diff supplies the objective criterion**. The lesson is not that subjective stop-phrases are fine, but that a strong verification channel can carry a loose exit clause.

**One important divergence from the sizing guidance above.** Nate's productive loops sit at *"35 minutes to a couple of hours"* and he judges 12-hour-plus runs generally not worth it; Cherny's flagship runs are 11 and 14+ days. The reconciliation is the [role-dependence caveat](#loop-advice-doesnt-transfer-11-across-roles) plus verification strength: Cherny's long runs are exactly the cases where a near-perfect automated verifier exists (a well-tested runtime, a pixel diff). Absent that, Nate's ceiling is the safer default — a long loop without a hard verifier is the failure mode, not the duration itself.

### Escalating When the Loop Stalls

Cherny's ladder for a loop that keeps struggling — diagnose the failure class first, don't reach for the heaviest tool: **wrong framing → prompt; missing procedure → skill; missing context → MCP** [23:44-23:58]. *(Source: Boris Cherny, Y Combinator 2026-07-27)*

## Self-Improving Loops Need a State Structure (Chase AI)

Nate Herk's framing covers loop *logic* (reason-act-observe, goal vs verification). Chase AI adds the **infrastructure** a self-improving loop needs: somewhere to **log past runs** so each iteration can read prior ones and improve. That log must live in the same coherent memory/state "map" the agent already navigates — it is not a side file. This is why, in the [Agentic OS](agentic-os.md) framing, the loop engine (Level 1) and the state structure (Level 2) are inseparable: the loop is the engine, the logged state is its memory. A "second brain" *is* this logged, navigable store the loop both reads and writes. *(Source: Chase AI)*

## Related Pages

- [Generator-Evaluator Harness](generator-evaluator-harness.md) — the production-scale maker-checker: separate evaluator agent, explicit rubric, browser-based done-checks
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the five canonical workflows; evaluator-optimizer and orchestrator-workers are the formal versions of two topologies here
- [Parallel Agent Patterns](parallel-agent-patterns.md) — manager-with-helpers and peer-to-peer fleets at scale
- [PIV Loop](piv-loop.md) — a coding-specific, artifact-driven loop primitive (Plan-Implement-Validate)
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — verification feedback loops in practice (Boris Cherny's "single most impactful practice")
- [Agent Evaluation](agent-evaluation.md) — how to make the verification pillar measurable (graders, rubrics, success criteria)
- [Peter Steinberger](../people/peter-steinberger.md) — the "run everything as loops" end of the role spectrum
- [Agentic OS](agentic-os.md) — loops as the Level-1 backbone, fed by the Level-2 state map; the skill → automation → loop promotion path
- [Dynamic Workflows](dynamic-workflows.md) — the shared-context sibling of a loop; workflow vs loop vs routine taxonomy
- [Boris Cherny](../people/boris-cherny.md) — the multi-day-horizon case for verification
