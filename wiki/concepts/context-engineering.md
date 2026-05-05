---
title: "Context Engineering"
type: "concept"
pillar: "understanding"
tags: [context-engineering, context-rot, just-in-time-retrieval, sub-agents, compaction, prompt-engineering, agents, cdlc]
sources:
  - "summaries/2025-09-29_anthropic_effective-context-engineering.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
last_updated: "2026-05-05"
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

## Context as a Code-Class Artifact: The CDLC View

Patrick Debois (Tessl, ex-DevOps originator) sharpens the framing in *Context Is the New Code* (AI Engineer, May 2026): once prompts and instructions are generated, reused, and committed (`agent.md`, skills), they have all the surface area of source code — and code is *folding back into context* as skills replace branching helpers (the agent does the branching at runtime against far more variation than a helper could enumerate). His conclusion: context deserves its own SDLC analog — the **Context Development Life Cycle (CDLC)**: Generate → Test → Distribute → Observe → Adapt, infinity-loop. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

This complements the Anthropic-derived view above: context engineering is *what tokens occupy the window*; the CDLC is *the lifecycle of the artifacts that produce those tokens*. See [Context Development Life Cycle](context-development-life-cycle.md) for the five-phase breakdown and the eval-tax argument it implies.

The hidden cost (from Debois's Q&A): the time you save by writing context instead of code gets spent writing the evals that make the context trustworthy — the meta-skill is "the process for building the right evals." This pulls eval discipline (see [Agent Evaluation](agent-evaluation.md)) into the context-engineering loop, not just the model-output loop.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the successor discipline that subsumes context engineering
- [Context Development Life Cycle](context-development-life-cycle.md) — Debois's CDLC framework for context-as-code
- [Natural Language Harness](natural-language-harness.md) — file-backed state as a first-class harness primitive
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — full context resets beat compaction for long runs
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — prior-era techniques
- [Context Filter](context-filter.md) — WAF-style perimeter scanner for prompt injection in skills/agent.md
- [AI SBOM](ai-sbom.md) — supply-chain bill of materials for context packages
