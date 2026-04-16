---
title: "Empathize with the Agent"
type: "concept"
pillar: "building"
tags: [agentic-engineering, prompt-craft, mental-model, ai-coding]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md"
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
last_updated: "2026-04-15"
---

# Empathize with the Agent

The single most important mental shift for effective agentic coding: think from the agent's perspective before prompting.

## The Core Idea

The agent starts every session from zero. It knows nothing about your project. Your codebase might be hundreds of thousands of lines, but the agent's context window is finite. You have the system-level understanding; the agent needs you to share just enough of it.

> "If I were dropped into this codebase cold, what would I need to know to do this task?"

Answer that question, then tell the agent exactly that — point it to specific files, modules, constraints.

## Why It Matters

Most frustration with AI coding tools comes from mismatched expectations. The developer assumes the agent "should know" something about the project. The agent literally cannot — it starts fresh. A few pointers go a long way:

- "Consider this file and this module"
- "The constraint is X"
- "This interacts with the auth system in Y"

Friction during a task is a signal: if the agent is spinning or taking too long, you likely didn't provide enough context, or the architecture makes the task unnecessarily hard. Stop, reframe, add what's missing.

## Why Expert Programmers Struggle

Steinberger observes that programming skill is "almost a burden" for agent adoption:

- Expert programmers have deep intuitions about how code "should" look
- Agents produce code that looks different — it works but doesn't match the expert's style
- The expert's deep skill creates an inability to empathize with a system starting from zero
- World-class programmers dismiss agents as broken — not because the tools are bad, but because expertise prevents the mental shift

This is a genuinely new paradigm. The guitar analogy: sitting at a piano once and saying "the piano's broken" is not a fair assessment.

## The Agentic Trap

A skill progression curve observed by Peter Steinberger:

1. **Beginner:** Simple prompts ("fix this"). Works for simple tasks.
2. **Intermediate (the trap):** Over-engineering — 8 agents, complex orchestration, 18 slash commands. Trying to compensate for the agent's lack of context by building elaborate systems.
3. **Expert:** Return to simple prompts — but with deep understanding. The sophistication is invisible; it lives in your empathy for what the agent needs, not in tooling.

The expert gives the agent just enough context with a few words. The intermediate builds a pipeline to inject context automatically. The expert's approach is faster, more flexible, and produces better results.

**Empirical validation:** Chase AI's benchmark of GSD vs Superpowers vs vanilla Claude Code quantifies this trap. GSD (the most elaborate orchestration layer) burned 1.2M tokens and 1h45m; Superpowers used 250K tokens and 1 hour; vanilla Claude Code finished in 20 minutes and 200K tokens — with indistinguishable output quality. The orchestration overhead produced no measurable benefit, which is exactly what the agentic trap predicts: the sophistication should be in the human's understanding, not in tooling. *(Source: Chase AI)*

## How to Apply

1. **Before every prompt:** Pause and think from the agent's perspective. What does it see? What can't it see?
2. **Build your codebase for the agent:** Don't fight its naming (the name in the weights is the name it'll search for). Keep structure clean and discoverable.
3. **Write orientation files:** CLAUDE.md, soul.md, agent files — anything that helps the agent understand the project quickly.
4. **Interrupt, don't wait:** If the agent is spinning, it's a signal that it lacks context. Stop it, reframe, add what's missing.
5. **Don't force your worldview:** The agent may have a better approach because it was trained on patterns you haven't seen. Evaluate on merit.

## The Level 2→3 Barrier: Where Empathy Becomes Critical

Dan Shapiro's five-level framework for AI coding maturity identifies the Level 2 to Level 3 transition as the point where empathy with the agent becomes make-or-break. At Level 2 (Junior Developer), the human still reads all AI-generated code. At Level 3 (Developer as Manager), the human directs AI and reviews at the PR/feature level. Shapiro estimates 90% of "AI-native" developers are stuck at Level 2 — and the barrier is psychological, not technical.

The core blocker: developers cannot let go of reading every line of code. This is the empathy failure at scale — instead of trusting the agent with well-scoped work and evaluating outcomes, they insist on reviewing implementation details. The expert programmers who struggle most (per Steinberger's observation above) are the same population most likely stuck at Level 2.

**The METR study confirms the cost:** developers using AI completed tasks 19% slower but believed they were 24% faster. The gap between perception and reality is a direct consequence of failing to redesign the workflow around agent capabilities — treating the agent as a junior to be supervised line-by-line rather than a team member to be directed and evaluated at a higher level. *(Source: Nate B Jones / Dan Shapiro)*

## Anthropic's Validation

Anthropic's official prompting best practices independently converge on this same insight. They describe Claude as a "brilliant but new employee who lacks context on your norms and workflows." Their golden rule: show your prompt to a colleague with minimal context — if they'd be confused, Claude will be too. This is essentially "empathize with the agent" stated as corporate doctrine. *(Source: Anthropic Prompting Best Practices)*

## Related Pages

- [Prompt Engineering for Claude](prompt-engineering-claude.md) — Anthropic's official prompt patterns
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — the maturity model where empathy determines progression
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [Claude Code](../tools/claude-code.md)
