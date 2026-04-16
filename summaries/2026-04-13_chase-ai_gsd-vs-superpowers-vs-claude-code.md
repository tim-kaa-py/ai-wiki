---
title: "GSD vs Superpowers vs Claude Code: A New AI King?"
source_type: "youtube"
channel: "Chase AI"
date: "2026-04-13"
url: "https://www.youtube.com/watch?v=celLbDMGy8w"
pillar: "ecosystem"
tags: [claude-code, comparison, agents, workflow, gsd, superpowers, orchestration]
ingested: "2026-04-15"
source_file: "sources/youtube/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
---

# GSD vs Superpowers vs Claude Code: A New AI King? — Summary

**Source:** Chase AI | 2026-04-13 | [Link](https://www.youtube.com/watch?v=celLbDMGy8w) | 31:25

## TL;DR

Chase runs a head-to-head benchmark of three approaches to building with Claude Code — vanilla Claude Code, the Superpowers plugin, and the GSD orchestration framework — having each build the same AI agency website. Vanilla Claude Code wins decisively: it finished in 20 minutes and 200K tokens versus Superpowers' 1 hour / 250K tokens and GSD's 1 hour 45 minutes / 1.2M tokens, with no meaningful quality difference in the output. The core argument is that Claude Code has natively absorbed many of the features that originally justified orchestration layers, and the time you save by skipping them is better spent iterating.

## Video Structure

1. [00:00-00:34] Introduction — Frames the three-way comparison and what will be measured (output quality, tokens, time)
2. [00:34-03:28] What Are GSD and Superpowers — Explains both tools as orchestration layers on top of Claude Code, walks through their step-by-step processes, and highlights their shared philosophy and subtle differences
3. [03:40-05:54] Test Setup — Describes the benchmark task (AI agency website with landing page, blog viewer, and blog generator) and what was intentionally left open to interpretation
4. [06:00-06:42] Sponsor / Course Plug — Master class promotion (skippable)
5. [06:42-10:08] Planning Phase: Superpowers — Shows Superpowers' brainstorming, visual companion feature, design spec generation, and skill-based workflow
6. [10:08-13:07] Planning Phase: GSD — Shows GSD's four-agent parallel research phase, multiple markdown planning documents, and more rigid slash-command workflow
7. [13:07-17:06] Planning Phase: Claude Code + Benchmarks — Reveals planning-phase token and time benchmarks across all three tools
8. [17:06-19:10] Execution Phase Overview — Contrasts execution styles: GSD is hands-on per phase, Superpowers chose inline execution, Claude Code just runs
9. [19:10-24:22] Results Walkthrough — Shows each tool's output: front-end design (all similar), blog functionality, blog generator (Superpowers one-shot success, GSD and Claude Code needed a second pass)
10. [24:22-29:33] Verdict and Analysis — Declares Claude Code the winner, argues the "line in the sand" problem, and explains why the gap between vanilla Claude Code and orchestration layers has shrunk
11. [29:33-31:25] Conclusion — "Less is more." Recommends vanilla Claude Code for 99% of cases, Superpowers as a back-pocket option, and GSD only for extreme edge cases

## Key Concepts

### Orchestration Layer (as a Claude Code Add-on)

Both GSD and Superpowers are "orchestration layers that sit on top of Claude Code and change the way Claude Code approaches complex projects." They introduce more robust planning systems, testing frameworks, and sub-agent-driven development. They don't replace Claude Code — they restructure how it works by adding planning rigor and context management on top of the base tool.

### Sub-Agent-Driven Development / Context Rot

Instead of having Claude Code execute everything in a single session (which fills up the context window and degrades output quality — "context rot"), orchestration layers assign each task to a separate sub-agent with a clean context window. This is the core shared mechanism of both GSD and Superpowers. The key nuance Chase raises: Claude Code has since added native context management (e.g., auto context clearing), narrowing the advantage of external sub-agent orchestration.

### GSD (Get Stuff Done)

A Claude Code orchestration framework installed via a single CLI command. Its core approach is rigid, phase-based execution using explicit slash commands (`/gsd new project`, then phase-by-phase progression). GSD is heavier on upfront research — it spawns four parallel research sub-agents (stack, features, architecture, pitfalls) before planning. It produces multiple markdown planning documents (requirements, roadmap, state, phases). The workflow is more hands-on: each phase requires user discussion and approval before execution.

### GSD's "Northstar" State Management via Markdown Files

GSD's distinguishing philosophy: with so much sub-agent execution and constant context resetting, you need a persistent reference telling you "where we are and where we're going." GSD achieves this by maintaining explicit markdown files — `requirements.md`, `roadmap.md`, `state.md`, phase documents — that act as a "northstar" across context boundaries. Every sub-agent can read these to understand the project state.

### Superpowers

A Claude Code plugin available in the official plugin library (installable via `/plugin` inside Claude Code). Its core approach is more fluid and conversational — it loads 14-15 skills that Claude Code invokes automatically based on conversational context, rather than requiring explicit slash commands. Superpowers is lighter on the research phase compared to GSD but heavier on interactive design iteration through its visual companion feature. It offers a choice between sub-agent-driven and inline execution at build time.

### Visual Companion (Superpowers Feature)

One of Superpowers' signature differentiators. It spins up a dev server and presents multiple visual design options simultaneously (e.g., four aesthetic directions for a landing page), then drills down section by section. Chase highlights this as genuinely useful: "It's one thing when it tells you what it's going to do visually... it's much different when you can see everything all at once." However, the resulting designs in this test were still generic — "nothing special."

### Red-Green-Refactor / TDD as Superpowers Implements It

Superpowers enforces what it calls "the iron law: no production code without a failing test first." For every feature, it creates a test, fails it (red), writes the minimal code to pass it (green), then refactors. This is the classic TDD red-green-refactor cycle. This is a key philosophical difference from GSD, which emphasizes state management over test discipline.

## Key Takeaways

1. **Vanilla Claude Code won the head-to-head decisively, primarily on time.** 20 minutes and 200K tokens vs. Superpowers' 1 hour / 250K tokens vs. GSD's 1 hour 45 minutes / 1.2M tokens. The output quality across all three was essentially indistinguishable — "you could tell me any one of these three created any one of these three and I would not be able to tell the difference."
   - **How to apply:** Default to vanilla Claude Code. The time saved compounds — 40-80 extra minutes of iteration with Claude Code will produce a better result than the orchestration layer's one-shot output.

2. **The planning phase alone reveals GSD's cost structure.** GSD burned ~600K tokens and 40 minutes just for planning (four parallel research agents). Superpowers used ~200K tokens in ~40 minutes for planning. Claude Code planned in ~50K tokens and ~10 minutes. GSD's research-heavy approach is 3x more expensive than Superpowers and 12x more expensive than vanilla Claude Code before a single line of production code is written.
   - **How to apply:** If using GSD, skip the parallel research agents for familiar/straightforward tasks (the creator notes the research "wasn't necessary for this project"). Reserve the full research phase for genuinely novel architectures.

3. **The verdict: vanilla Claude Code for 99% of use cases.** Even if vanilla Claude Code's output is marginally worse on the first pass, the time savings let you iterate past the other tools. "Less is more."
   - **How to apply:** Start every project with vanilla Claude Code. Only escalate to an orchestration layer if you hit actual complexity walls, not anticipated ones.

4. **If you must use an orchestration layer, use Superpowers over GSD.** Superpowers is lighter on tokens (250K vs. 1.2M total), more fluid to use (automatic skill invocation vs. manual slash commands), and lower-risk if you misjudge task complexity. GSD requires you to be at the keyboard for every phase, while Superpowers lets you walk away during execution.
   - **How to apply:** Install Superpowers at the project level (`/plugin`) so it's available when needed, but don't invoke it by default.

5. **Claude Code has closed the gap that originally justified orchestration layers.** Native features like auto context clearing ("do you want to clear context and do it like this?") now handle what GSD was created to solve. "The gap between baseline Claude Code and these things has shrunk significantly while at the same time there is now a huge gap in terms of speed to execution."
   - **How to apply:** Re-evaluate orchestration layers periodically. Features that justified them months ago may now be native to Claude Code.

6. **GSD 2.0 is undermined by a critical limitation: it doesn't support the Claude Code max plan**, forcing users to pay full per-token prices. This makes GSD 2.0 economically unviable for most users despite its improvements.
   - **How to apply:** Do not adopt GSD 2.0 until max plan compatibility is confirmed. Check GSD's GitHub for updates on this.

7. **The "line in the sand" problem: you can't reliably predict whether a task is complex enough to justify orchestration overhead.** If you guess wrong and use GSD on a moderate task, you've wasted 80 minutes. If you guess wrong with Superpowers, you've wasted 40 minutes. With vanilla Claude Code, the penalty for misjudging complexity is near zero — you just keep iterating.
   - **How to apply:** Treat task complexity assessment as inherently uncertain. Choose the approach with the lowest downside when you're wrong — which is vanilla Claude Code.

## Argument Structures

### Why Vanilla Claude Code "Wins" Despite Potentially Slightly Worse Output

Chase's argument is not that vanilla Claude Code produces better output — he concedes it might produce marginally worse first-pass results. The argument is economic:

- Premise 1: All three tools produced essentially indistinguishable output quality on this task
- Premise 2: Vanilla Claude Code finished in 20 minutes; Superpowers in 60 minutes; GSD in 105 minutes
- Premise 3: The 40-80 minutes saved can be spent iterating with vanilla Claude Code
- Conclusion: "Me and Claude Code with 80 more minutes" will beat GSD's one-shot output every time

The deeper claim: even if you grant that orchestration layers produce better first-pass results on sufficiently complex tasks, the time overhead is so large that iterative development with vanilla Claude Code will converge to a better result faster.

### The "Line in the Sand" Problem — Why You Can't Know in Advance

Chase anticipates the counterargument ("this test was too simple for GSD/Superpowers to shine") and turns it into his strongest point:

- Premise 1: Proponents of orchestration layers claim they shine on sufficiently complex tasks
- Premise 2: But where is the "line in the sand" — the threshold of complexity where orchestration becomes worthwhile?
- Premise 3: That line is not "clear" or "obvious" — you cannot reliably determine it before starting
- Premise 4: If you guess wrong and chose GSD, you've lost 80 minutes with no quality benefit
- Premise 5: If you guess wrong and chose vanilla Claude Code, you've lost nothing — you just keep iterating
- Conclusion: Under uncertainty, the rational default is the option with the lowest cost of being wrong — vanilla Claude Code

This is essentially a minimax argument: minimize your maximum regret.

## User Notes

- Interested in the status line Chase uses at the bottom of the Claude Code terminal, which shows the current directory and context window usage. The transcript has only a passing mention at [06:36]: "I also have the status line down here, which will explicitly state which directory I'm in." The actual installation and configuration of this status line feature is not covered in this video — it needs to be found separately (likely from Claude Code docs or the `/statusline` skill).
- Focused on understanding the shared philosophy and practical differences between GSD and Superpowers as orchestration layers
- Wanted the verdict and reasoning for when to use each tool

## Related Topics

claude-code, comparison, agents, workflow, gsd, superpowers, orchestration, sub-agents, context-management, tdd, planning
