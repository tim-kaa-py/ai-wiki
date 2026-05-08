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
  - "summaries/2026-05-06_claude-code-docs_context-window.md"
  - "summaries/2026-05-06_claude-code-docs_memory.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
last_updated: "2026-05-08"
---

# Context Engineering

The discipline of curating what tokens occupy the model's context window across a session — framed by Anthropic (Sep 2025) as the successor to prompt engineering. Where prompt engineering optimizes a single message, context engineering treats the window itself as a finite resource to budget, prune, and refill over time.

## The Core Problem: Context Rot

Transformer attention is O(n²) over tokens. As context fills, each token gets a thinner slice of attention budget, and model performance degrades. The counterintuitive consequence:

> **More context ≠ better answers.**

Pre-loading reference docs, chat history, and tool output into the system prompt is usually worse than loading nothing and retrieving on demand.

Related failure mode documented in Anthropic's long-running-apps work (March 2026): **context anxiety** — models prematurely conclude work as their context fills. The window pressure itself biases the agent toward declaring "done."

### Smart Zone vs Dumb Zone

The operational shorthand for context rot, popularized by Dex Hardy and Matt Pocock: every session has a **smart zone** where the model still reasons well and a **dumb zone** where competence has degraded. Treat ~100K tokens as the practical ceiling for coding tasks regardless of advertised window size. Matt's framing on 1M context: "they shipped a lot more dumb zone" — the bigger window helps retrieval (sparse-attention) but not the dense reasoning coding requires. See [Smart Zone vs Dumb Zone](smart-zone.md) for the full operational discipline (`/clear` over `/compact`, exact-token status line, tiny system prompts).

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

## Token Data: What Claude Code Actually Loads

Anthropic's May 2026 "Explore the context window" doc gives concrete token budgets for Claude Code — turning the abstract context-engineering principles above into operational numbers:

| Component | Approx. tokens |
|-----------|----------------|
| System prompt | ~4,200 |
| Project CLAUDE.md (well-tuned) | ~1,800 |
| `~/.claude/CLAUDE.md` | ~320 |
| Auto memory (MEMORY.md index) | ~680 |
| Environment info | ~280 |
| Skill descriptions | ~450 |
| MCP tool names | ~120 |
| **Baseline before first prompt** | **~7,850** |
| Each file read | ~1,000–3,000 |
| Each hook `additionalContext` | ~100–120 |
| Subagent summary back to main | ~420 (vs 6,100+ for its file reads) |

Two operational consequences:

1. **File reads dominate mid-session** — and they're hidden (terminal shows only "Read auth.ts"). Three files + path-scoped rules + grep results easily add 6,000 tokens.
2. **Subagents are the mathematical justification of the architectural pattern.** A subagent's 6,100 tokens of file reads → 420-token summary back. The subagent isn't just "tidier" — it's an order of magnitude cheaper for the parent's context.

### What Survives `/compact`

The `/compact` command isn't symmetrical — it preserves things differently depending on **where instructions live**:

| Lives where | Re-injected after compact? |
|-------------|---------------------------|
| Project-root CLAUDE.md | ✓ automatically |
| Auto memory (MEMORY.md) | ✓ automatically |
| Path-scoped rules in `.claude/rules/` | ✗ until the matching file is read again |
| Nested CLAUDE.md files | ✗ until the matching file is read again |
| Skill descriptions | ✗ — only invoked skill bodies survive (capped 5K tokens/skill, 25K total budget, newest first) |

**Operational rules:**
- Rules that must survive compaction → project-root CLAUDE.md.
- Important skill instructions → near the top of `SKILL.md` (truncation keeps the start).
- Skills with `disable-model-invocation: true` → **zero context cost** until invoked. Use for any skill with side effects (commit, deploy, send messages).

### Path-Scoped Rules as a Context Lever

Rules in `.claude/rules/` with `paths:` frontmatter only load when Claude reads a matching file. Language-specific conventions (`paths: ["src/api/**/*.ts"]`) belong here, not in CLAUDE.md — they don't pay context tax on every session, only when relevant.

### Inspection

```
/context    # Live breakdown of context usage by category with optimization suggestions
/memory     # See which CLAUDE.md and auto memory files loaded at startup
```

This is the practical instrument panel for the abstract context-engineering discipline above.

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
- [Smart Zone vs Dumb Zone](smart-zone.md) — operational ~100K threshold and `/clear` discipline
