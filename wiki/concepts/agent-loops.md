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
  - summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md
timestamp: 2026-08-13
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

## The Loop as a Recovered Primitive, Not a New One (Coyle)

Frank Coyle (UC Berkeley, Aug 2026) pushes back directly on the "loops are the new abstraction" framing, naming both practitioners this page cites as archetypes. His summary of the received view — Boris Cherny "says he doesn't write code, but his job is to write loops" [06:16], Peter Steinberger "I don't code anymore. I just design loops that prompt your agents" [06:24] — is followed by a flat rebuttal: *"So, loops are the new big thing, right? Well, no, they're not"* [06:32].

The grounding is **Böhm–Jacopini (1966)**, which proved that Turing completeness requires exactly three constructs: sequential statements, if-then conditionals, and the loop [06:56-07:24]. Coyle's diagnosis of the agentic moment is that LLM usage had only the first two — *"up to now we've had sort of sequences. You have prompts, you have maybe if-then, but now we have a loop. And now this is what's giving us the power"* [07:37].

**What this reframes, and what it doesn't.** It is not a contradiction of loop engineering as a practitioner skill — Coyle spends the rest of his talk on loop design. It relocates *where the significance sits*: not in the technique being novel, but in natural-language systems having become computationally general. The practical payoff is a sharper prior about what a loop can be asked to do. If the loop is the construct that confers Turing completeness, then "can this be expressed as a loop over an LLM call?" has the same answer as "is this computable?" — which is why the pattern generalises so far beyond coding.

Caveat on the rebuttal itself: whether Cherny or Steinberger ever claimed *novelty* — as opposed to claiming the loop is where a practitioner's attention now goes — is not established in Coyle's talk. Read it as a reframing of the field's rhetoric rather than a refutation of either person's position. *(Source: Frank Coyle, AI Engineer 2026-08-08)*

## `stop_reason` as the Loop's Control Surface

Where the sections above treat the loop at design level, Coyle supplies the implementation-level control flow — and the field on which it turns is `stop_reason`: *"Every time something happens, there's a stop reason and you need to take a look at that because that can give you a lot of information about what's going on"* [04:56].

The framing rests on a deliberately deflationary account of the model's role. *"The problem is the LLM can't do anything. It is just a probabilistic next word predictor. It can't execute tools"* [08:52] — what it emits is tool parameters, and *"all it can do is talk back to you, very intelligently sometimes"* [09:23]. The loop, not the model, is the executor.

| Stop reason | Loop action |
|---|---|
| Tool use | Execute the tool yourself, append the result to `messages`, continue |
| Normal stop | Exit the loop, then confidence-check the result |
| **Token exhaustion** | **Act — do not consume the response** |

```python
while True:
    response = call_model(messages=messages, tools=tools)

    if response.stop_reason == "tool_use":
        messages.append(run_tool(response))   # the LLM emits params; your code executes
        continue

    if response.stop_reason == "max_tokens":
        handle_truncation()                   # partial answer — act, do not consume
        break

    break                                     # normal stop

if confidence(response) < THRESHOLD:
    escalate_to_human(response)               # loop exit is the natural HITL gate
```

**The anti-pattern** is fire-and-consume: *"just to let the agent go and do something and get the response back and use it"* [08:03].

**The non-obvious failure mode** is the third row. *"One of the stop reasons may be you have run out of tokens, and this response is based on partial when the LLM had to stop. And it's going to give you a response, but if you have run out of tokens, then you need to take action"* [10:52]. A truncated completion still reads as an answer — that is precisely what makes it dangerous, since nothing downstream can distinguish it from a complete one. This is a *silent* failure that the verification pillar above will not catch unless the loop branches on the stop reason explicitly.

The loop exit is also the natural place for the human-in-the-loop gate: *"You check the confidence. If it looks good, you keep it. If you don't, then you escalate to a human"* [10:43]. Structure the loop's return value as a `(result, confidence)` pair rather than a bare result.

Coyle is describing the *shape* of the control flow rather than enumerating an exact API surface; treat the table as a pattern, not as a literal list of `stop_reason` values. *(Source: Frank Coyle, AI Engineer 2026-08-08)*

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
