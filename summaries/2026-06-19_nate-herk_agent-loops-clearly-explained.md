---
title: "Finally. Agent Loops Clearly Explained."
type: "summary"
channel: "Nate Herk | AI Automation"
date: "2026-06-19"
resource: "https://www.youtube.com/watch?v=EuzYhzB0vbI"
pillar: "building"
tags: [agents, workflow, claude-code, loop-engineering, verification]
timestamp: "2026-06-23"
source_file: "sources/youtube/2026-06-19_nate-herk_agent-loops-clearly-explained.md"
---

# Finally. Agent Loops Clearly Explained. — Summary

**Source:** Nate Herk | AI Automation | 2026-06-19 | [Link](https://www.youtube.com/watch?v=EuzYhzB0vbI) | 14:33

## TL;DR
An agent loop is an AI that reasons, acts, then observes its own result and repeats until a defined stop criterion is met — you stop *prompting* the agent and instead design the system that prompts it. What makes a loop effective is overwhelmingly the verification side: an objective, checkable definition of "done" plus the right tools to check it. Most tasks don't actually need a loop, but adding verification almost always pays off, and the loops worth running sit in a cost/time sweet spot (minutes to a few hours), not the headline "agents running 24/7 for days" demos.

## Video Structure
1. [00:00-00:46] Hook — "Stop prompting agents, start designing loops." Quotes Boris Cherny / Peter Steinberger no longer prompting their coding agents; defines a loop as trigger + action + stop condition.
2. [00:46-02:14] Reality check — pushes back on the "if you don't run swarms 24/7 you're falling behind" hype; not every use case benefits from continuous agents.
3. [02:14-03:04] Worked example — an HTML build that hit ~V7 by checking 45 sources, screenshotting, reviewing, iterating until "done."
4. [03:04-04:03] The quality-vs-attempts mental model — why looping climbs the quality curve faster than human-in-the-loop iteration.
5. [04:03-05:26] Core pillars — reason / act / observe framed as a "smart intern you don't micromanage"; humans are good at defining the goal *and* the done-criteria.
6. [05:26-06:11] Loop topologies — solo loop, maker-checker, manager-with-helpers.
7. [06:11-10:37] Three demos from Matthew Berman's Loop Library — thumbnail scoring (subjective done = weak), 3.js plane (visual verification), Abbey Road recreation (objective metric + hard cap on passes).
8. [10:37-11:55] Two pre-build questions — what does "done" mean, and how will it check? Verification differs by artifact (game vs. script).
9. [11:55-13:18] What makes a loop work + cost realism — the checklist, and why he avoids 4-day runs.
10. [13:18-14:33] Personal framing + caveat — knowledge work not codebase refactors; advice from hardcore coders doesn't transfer 1:1; overnight "chunky" loops as the useful exception.

## Key Concepts

### Agent loop / loop engineering
An AI that reasons on what to do, acts (implements), then observes the result, repeating until a stop criterion is hit. Nate frames "loop engineering" as *replacing yourself as the person who prompts the agent* — you design the system that does the prompting instead. He treats the term loosely on purpose, noting everyone has a slightly different spin; his contribution is collapsing the variants into one core pattern.

### Reason → Act → Observe
The pillar Nate normalises all the competing framings onto (think-act-see, model-with-tools back-and-forth, unattended goal, nested manager agents all reduce to this). Analogy: a smart intern you hand a goal to, who figures out the next step, checks their own work, loops, and only returns to say "I'm done" after several self-corrections.

### The goal pillar
The objective the loop pursues. Humans are good at defining what they want, so this half is the easy half. Best practice: keep it *objective, not subjective* — "iterate until X metric equals Y result" beats "iterate until you're satisfied."

### The verification / done-criteria pillar
How the agent knows it has hit the stop condition — and the part Nate insists actually matters. Verification can be visual (screenshot the rendered output), functional (run a code test), or qualitative (does it match my tone of voice). His rule: *a loop is only as good as its done-check.* When a fully objective metric isn't possible, fall back to "until 100% confident," but push toward measurable wherever you can.

### Loop topologies (solo / maker-checker / manager-with-helpers)
Three architectural shapes a loop can take:
- **Solo loop** — one agent reasons, acts, observes, repeats. Nate's most-used; usually just one terminal session and a good prompt.
- **Maker-checker** — one agent does the work, a second agent grades it and gives feedback (e.g. a dedicated scoring sub-agent you've separately evaluated).
- **Manager-with-helpers** — one orchestrating agent coordinates multiple sub-agents ("Russian nesting dolls").
This is a separate dimension from the reason-act-observe core: the same loop logic can be wired into any of these shapes.

## Key Takeaways
1. **Most tasks don't need a loop — but verification is almost always worth adding.** Nate now wraps most tasks in *some* loop purely for the verification, even when no heavy multi-agent architecture is warranted. **How to apply:** Default to a solo loop with an explicit verification step before reaching for orchestration; you often just need one terminal session and a good prompt.
2. **Objective done-criteria beat subjective ones.** The thumbnail demo stalled on "until you're satisfied"; the Abbey Road demo terminated cleanly on "stop if average score ≥ 9." **How to apply:** Phrase the stop condition as "keep iterating until X metric equals Y result." If you can't, add a hard cap on passes so the loop can't run forever.
3. **Ask two questions before building any loop: what does "done" mean, and how will it check?** Verification differs by artifact — a game checks visually, functionally, and by play-testing levels; a script checks flow and tone, not pixels. **How to apply:** Before writing the loop, list the concrete checks and make sure the agent has the tools to perform them (browser/screenshot, test runner, etc.).
4. **Loops and goals aren't meant to produce 100% perfect output — they get you much closer on the first try.** The 3.js plane and Abbey Road outputs were imperfect but far better than a single un-looped prompt. **How to apply:** Treat the loop's output as a strong draft to iterate from, not a finished deliverable.
5. **Make the loop make sense with cost and time.** Nate has run 12-hour-plus loops that weren't useful; his productive ones sit around 35 minutes to a couple of hours, with overnight "chunky" runs reserved for big, experimental goals. **How to apply:** Match loop length to value; fire long runs before bed for experimental work, then feed the morning output back into shorter loops or human iteration. Avoid runs whose done-criteria may never be reachable.
6. **Loop advice from hardcore coders doesn't universally apply.** Peter Steinberger running everything as loops makes sense for an OpenAI engineer doing codebase work; Nate uses Claude Code for knowledge work, not big refactors. **How to apply:** Stay current with what power users do, but don't assume their setup fits your role — adopt loops where your work actually benefits, not because of FOMO.

## Argument Structures

**Why loops work at all — the quality-vs-attempts model (the core argument):**
- Premise 1: AI never one-shots a task to acceptable quality; you don't just accept the first output.
- Premise 2: Plot quality (y-axis) against attempts (x-axis). Attempt 1 lands around 50%; each round of feedback bumps it 5-10% until you reach a "good enough" 90-95%.
- Premise 3: This feedback-and-iteration cycle *will happen either way* — the only question is who runs it.
- Conclusion: Outsource that cycle to the agent instead of the human. With the agent self-iterating, attempt 1 jumps much higher and by attempt 3-4 you're far above where un-looped output would sit. The loop doesn't change *that* you iterate; it changes *who* iterates and *how fast* you climb the curve.

**Why a loop is only as good as its done-check:**
- A loop runs reason → act → observe → "did I meet the done criteria?" The done criteria is the only thing that decides whether it acts again or stops.
- Therefore the loop's entire output quality is gated on (a) how well "done" is defined and (b) whether the agent can actually check it.
- Corollary: a vague or subjective done-check (the "until you're satisfied" thumbnail) produces a weak, ill-terminated loop, while an objective metric with the right verification tools (the Abbey Road score ≥ 9 with screenshot checks, plus a hard cap) produces a clean one. Hence the goal and verification pillars are not co-equal in practice — verification is where loops are won or lost.

## User Notes
Focus was on three questions: what a loop is, which elements make one effective, and when it's worth building. The answer that lands: a loop is reason-act-observe with a stop condition; effectiveness lives almost entirely in the verification / objective done-criteria; and most tasks don't need orchestration — a solo loop with good verification, sized to a sensible cost/time budget, is the default. Kept discovery B (the quality-vs-attempts model — the clearest "why loops work") and discovery C (the four — really three — loop topologies, an architectural axis distinct from the core pattern).

## Related Topics
agents, workflow, claude-code, loop-engineering, verification, agent-architecture, evaluation
