---
title: "Peter Steinberger"
type: "person"
pillar: "ecosystem"
tags: [agentic-engineering, openclaw, ios, engineering-leadership]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
last_updated: "2026-04-13"
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

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Claude Code](../tools/claude-code.md)
