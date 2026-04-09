---
title: "Empathize with the Agent"
type: "concept"
pillar: "building"
tags: [agentic-engineering, prompt-craft, mental-model]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
last_updated: "2026-04-09"
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

## The Agentic Trap

This connects to Peter Steinberger's observation about the agentic trap — a skill progression curve:

1. **Beginner:** Simple prompts ("fix this"). Works for simple tasks.
2. **Intermediate:** Over-engineering — 8 agents, complex orchestration, 18 slash commands. Trying to compensate for the agent's lack of context by building elaborate systems.
3. **Expert:** Return to simple prompts — but with deep understanding. The sophistication is invisible; it lives in your empathy for what the agent needs, not in tooling.

The expert gives the agent just enough context with a few words. The intermediate builds a pipeline to inject context automatically. The expert's approach is faster, more flexible, and produces better results.

## How to Apply

1. **Before every prompt:** Pause and think from the agent's perspective. What does it see? What can't it see?
2. **Build your codebase for the agent:** Don't fight its naming (the name in the weights is the name it'll search for). Keep structure clean and discoverable.
3. **Write orientation files:** CLAUDE.md, soul.md, agent files — anything that helps the agent understand the project quickly.
4. **Interrupt, don't wait:** If the agent is spinning, it's a signal that it lacks context. Stop it, reframe, add what's missing.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [Claude Code](../tools/claude-code.md)
