---
title: "Claude Code Orchestration Layers"
description: "Head-to-head comparison of vanilla Claude Code, Superpowers, and GSD building the same benchmark project"
type: "comparison"
pillar: "ecosystem"
tags: [claude-code, comparison, orchestration, gsd, superpowers, agents, sub-agents, workflow]
sources:
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
  - "summaries/2026-04-25_claude-code-docs_create-custom-subagents.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
timestamp: "2026-08-03"
---

# Claude Code Orchestration Layers

A head-to-head comparison of three approaches to building with Claude Code: vanilla Claude Code, Superpowers (plugin), and GSD (orchestration framework). Based on Chase AI's benchmark where all three built the same AI agency website (landing page, blog viewer, blog generator).

## What Are Orchestration Layers?

Both GSD and Superpowers are "orchestration layers that sit on top of Claude Code and change the way Claude Code approaches complex projects." They introduce:

- **Sub-agent-driven development** — Each task gets a separate agent with a clean context window, avoiding "context rot" (degradation as a single session fills its context window). Native Claude Code now supports this directly via custom subagents — see [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md). Much of what GSD/Superpowers add can be assembled from a few well-scoped subagent files in `.claude/agents/`.
- **Planning rigor** — More structured research and planning phases before execution
- **Context management** — Mechanisms to maintain coherence across sub-agent boundaries

They don't replace Claude Code — they restructure how it works.

## The Benchmark

| Metric | Vanilla Claude Code | Superpowers | GSD |
|--------|---------------------|-------------|-----|
| **Total time** | **20 min** | 1 hr | 1 hr 45 min |
| **Total tokens** | **200K** | 250K | 1.2M |
| **Planning time** | **~10 min** | ~40 min | ~40 min |
| **Planning tokens** | **~50K** | ~200K | ~600K |
| **Output quality** | Indistinguishable | Indistinguishable | Indistinguishable |
| **Human involvement** | Minimal | Can walk away | Hands-on every phase |

Chase's summary: "You could tell me any one of these three created any one of these three and I would not be able to tell the difference."

## How Each Works

### Vanilla Claude Code
No orchestration. Single session, direct prompting. Claude Code handles its own context management using native features (auto context clearing).

### Superpowers
A Claude Code plugin (install via `/plugin`). Loads 14-15 skills that auto-invoke based on conversation. More fluid and conversational than GSD. Features a visual companion for design iteration and enforces TDD (red-green-refactor). Offers a choice between sub-agent and inline execution.

### GSD (Get Stuff Done)
An orchestration framework installed via CLI. Rigid, phase-based execution using explicit slash commands (`/gsd new project`, then phase-by-phase). Spawns four parallel research sub-agents before planning. Maintains a "northstar" via markdown state files (`requirements.md`, `roadmap.md`, `state.md`). Each phase requires user approval.

## The Verdict

**Vanilla Claude Code for 99% of use cases.** Chase's argument is economic, not qualitative:

1. All three produced indistinguishable output quality
2. Vanilla Claude Code finished in 20 minutes vs 60-105 minutes
3. The 40-80 minutes saved can be spent iterating, which will produce a better result than any orchestration layer's one-shot output

### The "Line in the Sand" Problem

The strongest argument for vanilla Claude Code comes from decision theory. Proponents of orchestration layers claim they shine on "sufficiently complex" tasks, but:

- The threshold of complexity where orchestration becomes worthwhile is not clear or obvious
- You cannot reliably determine it before starting
- If you guessed wrong and chose GSD, you've lost 80+ minutes with no quality benefit
- If you guessed wrong and chose vanilla Claude Code, you've lost nothing — you just keep iterating

This is a minimax argument: minimize your maximum regret. Under uncertainty about task complexity, the rational default is the option with the lowest cost of being wrong.

## Decision Framework

| Scenario | Recommendation |
|----------|---------------|
| Any new project | Start with vanilla Claude Code |
| Hit actual complexity walls | Consider Superpowers first |
| Design-heavy project needing visual iteration | Superpowers (visual companion) |
| Genuinely novel architecture, unfamiliar stack | GSD's research phase *might* help — but verify max plan support first |
| Unclear whether task is complex enough | Vanilla Claude Code (lowest regret) |

## Why the Gap Has Shrunk

Claude Code has natively absorbed features that originally justified orchestration layers:

- **Auto context clearing** — Claude Code now offers to clear context and restructure when sessions get long
- **Native context management** — Built-in mechanisms for maintaining coherence
- **Improved planning** — Claude Code's own planning capabilities have improved significantly

Chase's framing: "The gap between baseline Claude Code and these things has shrunk significantly while at the same time there is now a huge gap in terms of speed to execution."

Re-evaluate orchestration layers periodically — features that justified them months ago may now be native to Claude Code.

## The Creator's Version of the Same Verdict (Cherny, July 2026)

Chase's argument for vanilla is *economic* — same quality, less time. Boris Cherny reaches the same recommendation from a different premise: **the scaffolding is substituting for the thing that actually matters, which is verification.**

> "You don't need slash goal, you don't need slash loop. These help, but really all you need is give the model the task, give it a way to verify the output of its work so it doesn't get stuck, and it will just go." [22:33-22:48]

Note the two hedges. He says orchestration primitives *"help"* — this is not a claim that they are worthless — and the evidence is a 14+ day Electron→Swift rewrite where the verification channel (a Mac VM running the old app, screenshotted and pixel-diffed against the new one) was strong enough to carry a multi-week run unaided.

**The practical refinement to the decision framework above:** before escalating to an orchestration layer because a task feels complex, check whether the real gap is a missing verifier. A weak verifier is the failure that orchestration *appears* to fix — more planning phases and more sub-agent handoffs create the impression of rigor without adding any signal about whether the output is correct. If you can build a test suite, screenshot diff, or type-check loop instead, that is the cheaper and more durable move. See [Agentic Coding Workflow § Build the Verification Substrate Before the Prompt](../how-tos/agentic-coding-workflow.md#build-the-verification-substrate-before-the-prompt-cherny-july-2026).

This also sharpens the "line in the sand" argument: the threshold question isn't only *"is this task complex enough?"* but *"can the agent tell whether it's succeeding?"* — a question you can actually answer before starting. *(Source: Boris Cherny, Y Combinator 2026-07-27)*

## Cost Considerations

GSD 2.0 does not support the Claude Code max plan, forcing users to pay full per-token prices. At 1.2M tokens per project, this makes GSD economically unviable for most users. Check GSD's GitHub for updates on max plan compatibility before adopting.

## Related Pages

- [Claude Code](../tools/claude-code.md) — the platform all three approaches run on
- [GSD](../tools/gsd.md) — detailed tool page
- [Superpowers](../tools/superpowers.md) — detailed tool page
- [Claude Routines](../tools/claude-routines.md) — a different kind of orchestration (autonomous scheduled agents, not dev workflow)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md) — the "agentic trap" that orchestration layers exemplify
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — practical workflow guide
- [Boris Cherny](../people/boris-cherny.md) — the verification-not-orchestration version of the same verdict
- [Dynamic Workflows](../concepts/dynamic-workflows.md) — the first-party orchestration primitive, distinct from third-party layers
