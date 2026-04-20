---
title: "Context Engineering"
type: "concept"
pillar: "understanding"
tags: [context-engineering, context-rot, just-in-time-retrieval, sub-agents, compaction, prompt-engineering, agents]
sources:
  - "summaries/2025-09-29_anthropic_effective-context-engineering.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
last_updated: "2026-04-20"
---

# Context Engineering

The discipline of curating what tokens occupy the model's context window across a session — framed by Anthropic (Sep 2025) as the successor to prompt engineering. Where prompt engineering optimizes a single message, context engineering treats the window itself as a finite resource to budget, prune, and refill over time.

## The Core Problem: Context Rot

Transformer attention is O(n²) over tokens. As context fills, each token gets a thinner slice of attention budget, and model performance degrades. The counterintuitive consequence:

> **More context ≠ better answers.**

Pre-loading reference docs, chat history, and tool output into the system prompt is usually worse than loading nothing and retrieving on demand.

Related failure mode documented in Anthropic's long-running-apps work (March 2026): **context anxiety** — models prematurely conclude work as their context fills. The window pressure itself biases the agent toward declaring "done."

## The "Right Altitude" for System Prompts

System prompts should sit between two failure modes:

- Too rigid — hardcoded decision trees the model can't flex around
- Too vague — high-level platitudes with no concrete signal

Aim for **concrete signals + flexibility**: enough specificity for the model to act, enough headroom for it to adapt.

## Just-in-Time Retrieval

> "Mirrors human cognition: we don't memorize entire corpuses." — Anthropic

Prefer tools that load information when needed over stuffing it upfront.

- Retrieve via `read`, `search`, `grep` tools at the moment of use.
- Tool design rule: each tool is self-contained, clear, with no functional overlap.
- This is also the pragmatic alternative to RAG pre-loading for coding agents.

## Three Long-Horizon Strategies

For multi-turn or multi-window tasks, Anthropic names three techniques — used individually or combined:

| Strategy | Mechanism | When to use |
|----------|-----------|-------------|
| **Compaction** | Summarize the session, reinitiate with the summary | Single long session, fresh restart acceptable |
| **Structured note-taking** | Persist artifacts to files outside the context window | State must survive compaction / restart / handoff |
| **Sub-agent decomposition** | Spawn focused child agents that return condensed summaries | Parallelizable subtasks with well-bounded outputs |

## Compaction vs Full Reset

Anthropic's long-running-apps work (March 2026) sharpens this: for cross-session coherence, **full context resets with structured handoff artifacts beat compaction.** Compaction carries context-rot forward; a fresh window reading a durable artifact does not.

Pattern: commit-per-feature + progress file + `init.sh` (see [Harness Engineering](harness-engineering.md) for the initializer/coding-agent split).

## Design Rules

1. **Stop pre-loading data.** Use just-in-time retrieval through tools.
2. **Treat every token as budget.** Cut what doesn't earn its slot.
3. **Push state outside the window.** Files, progress logs, commits.
4. **Tools must not overlap.** Each tool has one clear purpose.
5. **Re-audit on every model upgrade.** Newer models handle more natively; subtract scaffolding that's no longer needed (see craft of subtraction in [Harness Engineering](harness-engineering.md)).

## Relationship to Harness Engineering

Context engineering is the middle of the three eras (prompt → context → harness). Harness engineering absorbs context engineering — the harness is where compaction, note-taking, and sub-agent delegation are actually wired. See [Harness Engineering](harness-engineering.md) for the bigger picture.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the successor discipline that subsumes context engineering
- [Natural Language Harness](natural-language-harness.md) — file-backed state as a first-class harness primitive
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — full context resets beat compaction for long runs
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — prior-era techniques
