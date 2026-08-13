---
title: "Peter Steinberger"
description: "OpenClaw creator and vocal agentic-coding practitioner known for the Agentic Trap curve and soul.md concept"
type: "person"
pillar: "ecosystem"
tags: [agentic-engineering, openclaw, ios, engineering-leadership]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-06-19_nate-herk_agent-loops-clearly-explained.md"
  - "summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md"
timestamp: "2026-08-13"
---

# Peter Steinberger

Creator of OpenClaw. Former iOS developer known for PSPDFKit. Became one of the most vocal practitioners of agentic coding, documenting his evolving workflow in blog posts throughout 2025-2026.

## Key Contributions

- **The Agentic Trap curve** — the progression from simple prompts to over-engineering to zen simplicity
- **"Empathize with the agent"** — the mental model shift that defines expert agentic coding
- **"Never revert — always move forward"** — fix forward instead of rolling back
- **"Build your codebase for the agent"** — accept agent naming, keep structure discoverable; the name in the weights is the name the agent searches for
- **The soul.md concept** — a personality/values document for your agent, co-authored with the agent itself
- **Voice-first prompting** — using voice input extensively for more natural, conversational agent interaction

## Key Arguments

**Why expert programmers struggle with agents:** Programming skill is "almost a burden" for agent adoption. Deep expertise creates intuitions about how code "should" look, making it harder to let go and accept agent-generated code that works but doesn't match your style. The expert's inability to empathize with a system starting from zero is the core barrier.

**Why orchestration frameworks fail:** Ideas evolve as you build — you cannot plan agentic work upfront and feed it to an orchestrator. This is "the waterfall model" applied to AI. It misses "style, love, that human touch." The human must stay in the loop because the vision evolves through building.

## Workflow

Uses Claude Code exclusively (no IDE), multiple terminal windows in parallel, voice input for prompts, local CI, commits directly to main. At peak intensity: 7 Max subscriptions running simultaneously. IDE used only as diff viewer for reviewing changes.

## Notable Quotes

> "I actually think vibe coding is a slur. I do agentic engineering."

> "Don't fight the name they pick because it's most likely the name that's most obvious in the weights."

> "I'm not building the codebase to be perfect for me — I want to build a codebase that's very easy for an agent to navigate."

> "Refactors are cheap now. Nothing really matters anymore — those modern agents will just figure things out."

> "It's like you sit me on a piano, I played once and it doesn't sound good and I say the piano's broken."

## Context

Interviewed by Lex Fridman (2026-02-12, 31 min). The interview captures his converged principles after months of intensive agentic coding with Claude Code on the OpenClaw project. His approach evolved from experimenting with multiple tools to settling on Claude Code for its terminal-first design and ability to run many parallel sessions.

## As a Loop-Engineering Archetype

Cited (by Nate Herk, 2026-06-19) as the high end of the "run everything as agent loops" spectrum — alongside Boris Cherny, an example of practitioners who no longer prompt their coding agents turn-by-turn. The framing comes with a caveat: this makes sense for an engineer doing large-codebase work, but the heuristic doesn't transfer 1:1 to knowledge-work roles. Steinberger is the codebase-work calibration point against which lighter-weight loop adoption is contrasted. See [Agent Loops § Loop Advice Doesn't Transfer 1:1 Across Roles](../concepts/agent-loops.md#loop-advice-doesnt-transfer-11-across-roles).

### Contested: Is the Loop New?

Frank Coyle (AI Engineer, Aug 2026) quotes him directly — *"I don't code anymore. I just design loops that prompt your agents"* [06:24] — pairs it with Cherny's version, and rebuts the framing: *"loops are the new big thing, right? Well, no, they're not"* [06:32]. His argument from Böhm–Jacopini (1966) is that the loop is the third construct required for Turing completeness, so its arrival in agentic systems is a *recovery* of a missing primitive rather than an invention. This targets the field's rhetoric rather than Steinberger's practice; whether Steinberger ever claimed novelty is not established. See [Agent Loops § The Loop as a Recovered Primitive](../concepts/agent-loops.md#the-loop-as-a-recovered-primitive-not-a-new-one-coyle).

## Related Pages

- [Agent Loops (Loop Engineering)](../concepts/agent-loops.md) — Steinberger as the "everything is a loop" archetype
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Claude Code](../tools/claude-code.md)
- [Boris Cherny](boris-cherny.md) — the other end of the loop-engineering spectrum; independently reaches the same "expertise is a burden" conclusion
