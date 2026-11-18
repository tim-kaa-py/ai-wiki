---
title: "Recursive Language Models (RLM)"
type: "concept"
description: "Alex Zhang's idea of a model that works over its prompt from inside a persistent REPL, slicing it and handing parts to subagents it spawns from code, and the speculative case that Claude Code's Code Mode is heading there"
pillar: "understanding"
tags: [agents, architecture, inference, context-management, claude-code]
sources:
  - "summaries/2026-11-16_ray-amjad_code-mode-is-claude-codes-biggest-harness-change-yet.md"
timestamp: "2026-11-18"
---

# Recursive Language Models (RLM)

An idea from Alex Zhang (MIT), per Ray Amjad's account of a paper from December of last year [11:23-11:33]: instead of reading its whole prompt, the model writes code over it from inside a REPL and recursively hands pieces to subagents it launches from that code. This page reaches the wiki secondhand, through one video; the paper itself has not been ingested. *(Source: Ray Amjad, 2026-11-16)*

## The Three Ingredients

Per Amjad's account, three things must come together [11:33-12:13]:

1. **A REPL that persists between calls**, so a variable defined in one call is usable in the next. Claude Code now has this through [Code Mode](code-mode.md).
2. **Subagents called and managed from inside the REPL**, e.g. one per file the code just read. Possibly coming to Claude Code through the unreleased context functions (see [Code Mode § Unreleased Context Functions](code-mode.md#unreleased-context-functions-speculation)).
3. **The prompt itself lives in a variable**, so the model never reads all of it. Told "a 2M-token prompt sits in this variable", it slices the variable and hands parts to subagents [12:18-12:46]. This is the missing piece; with it, a model could work with far larger prompts than fit its window.

Zhang also argues RLMs only really work once a model is **post-trained** around them [14:17-14:28].

## Conversation History as a Variable (speculation)

Amjad extends ingredient 3 from the prompt to the conversation history [12:50-13:30]. If the history were a variable, Claude could notice the window filling and itself delete or shorten noisy tool calls that are no longer relevant, which would make compaction unnecessary: the model decides what to remove instead of a summariser.

The catch is **prompt-cache breakage**: any edit early in the history invalidates the cache after it. Amjad points to a Meta paper on keeping a prefix cache and a suffix cache around the changed part, and to Anthropic's API **context editing**, which warns that edits break the cache and need a cost-benefit check [13:30-14:07]. His timing, "maybe in 2027", for prompts and history as REPL variables is explicitly a guess [14:07-14:13], and he hedges that Claude may not get fully there [14:13-14:17]. If a future model were post-trained inside such a harness, he expects Claude to "become some kind of RLM" [14:17-14:42].

For what the wiki currently recommends instead (full resets with handoff artifacts over compaction), see [Context Engineering § Compaction vs Full Reset](context-engineering.md#compaction-vs-full-reset).

## The Mismanaged Geniuses Hypothesis

An essay by Alex Zhang: many limitations attributed to models come from how they are used, not from what they can do, and better management would already unlock a wider range of tasks [09:36-09:59]. Amjad presents Code Mode as an instance: it gives an already capable model more freedom over its own tool use [09:59-10:04]. This sits on the harness-as-lever side of [Harness Engineering § Unresolved Tensions](harness-engineering.md#is-the-harness-the-ceiling-or-only-the-floor), though Zhang's own post-training point above concedes that the harness alone is not enough.

## Related Pages

- [Code Mode](code-mode.md) — ingredient 1 shipped in Claude Code, ingredient 2 possibly coming
- [Context Engineering](context-engineering.md) — compaction, resets and sub-agents as today's context-management tools
- [Harness Engineering](harness-engineering.md) — harness vs model as the lever
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the other answer to prompts larger than the window
