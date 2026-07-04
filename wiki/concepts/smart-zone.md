---
title: "Smart Zone vs Dumb Zone"
type: "concept"
pillar: "building"
tags: [context-engineering, dumb-zone, smart-zone, claude-code, workflow, best-practices, agentic-coding-workflow]
sources:
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
timestamp: "2026-05-08"
---

# Smart Zone vs Dumb Zone

An operational framing introduced by Dex Hardy (Human Layer) and popularized by Matt Pocock for treating an LLM session's context as having two regions: a **smart zone** where the model still reasons well, and a **dumb zone** where competence has degraded enough that decisions become unreliable. The framing is operational — the boundary is rough (~100K tokens), the consequence is concrete (clear or fail).

## The Underlying Mechanism

Transformer attention scales O(n²) over context length — every added token creates relationships with every existing token. So model competence does not degrade in a step at the advertised window — it **degrades smoothly with token count.** See [Context Engineering — The Core Problem: Context Rot](context-engineering.md#the-core-problem-context-rot) for the full treatment.

Smart zone vs dumb zone is the operational shorthand: stop arguing about the curve, treat ~100K tokens as the **practical ceiling for coding tasks** and act accordingly.

## ~100K Even With 1M Context

Anthropic shipped 1M context windows. Matt's blunt framing: "**they shipped a lot more dumb zone.**"

Argument:

- 1M context is good for **retrieval** (find a fact in War and Peace) — a sparse-attention task.
- Coding requires **dense reasoning over the whole context**, not retrieval.
- The underlying attention mechanism didn't change with the window size.

So the operational threshold for coding sessions stays at ~100K. The smart zone slowly expands as models improve — but not by 10×. Use the expanded window for retrieval-style work; do not assume your coding session got 10× more headroom.

## `/clear` Beats `/compact`

The two ways Claude Code shrinks an oversized session are not equivalent:

| Action | What it does | Determinism |
|--------|--------------|-------------|
| `/clear` | Returns to the bare system prompt | Deterministic — clean reset |
| `/compact` | Summarizes the conversation in place | Non-deterministic — leaves "sediment" you can't clean up |

Matt's stance: prefer `/clear`. Devs love `/compact` and he calls that a mistake. The mental model is the protagonist of *Memento* — the LLM has no memory between sessions; the only durable state is what you write to files. `/compact` pretends to give you continuity; `/clear` admits the truth and forces you to externalize state into PRDs, Kanban issues, or progress files before resetting.

This is a divergence from the standard Anthropic-recommended pattern, which treats `/compact` as a normal tool. Matt treats it as a smell — a signal you're trying to keep state in the window that should live on disk.

For what does and doesn't survive `/compact`, see [Context Engineering § What Survives `/compact`](context-engineering.md#what-survives-compact).

## Operational Discipline

Three concrete habits:

1. **Pin an exact-token status line.** Matt's framing: "Essential information on every coding session because you need to know exactly how many tokens you're using so you know how close you are to the dumb zone. Absolutely essential." Treat the token counter the way you treat a syntax linter — non-negotiable visibility. See [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md).
2. **Clear when you cross ~100K, even if the model claims to support more.** The advertised window does not change the smart-zone ceiling.
3. **Keep system prompts tiny.** A 250K-token system prompt drops the session into the dumb zone before it starts. Audit `CLAUDE.md` and global `~/.claude/CLAUDE.md` for token bloat; cut anything not load-bearing on every session.

## Why This Matters for Pipeline Design

Smart-zone discipline is the underlying constraint that shapes the rest of Matt Pocock's pipeline:

- **Grill-me + PRD eat ~25K tokens of conversation** — and the conversation is the asset, not a side-effect. See [PRD-as-Prompt Pattern](prd-as-prompt.md).
- **Fresh context for the reviewer** — if the implementer also reviews, the review happens in the dumb zone after the smart zone got burned on implementation. See [Reviewer Agents](reviewer-agents.md).
- **Sandcastle's per-issue worktrees** isolate each task in its own fresh context so no single agent burns through ~100K. See [Parallel Agent Patterns](parallel-agent-patterns.md).
- **"Closing PRDs after implementation" doctrine** keeps stale destination docs from re-entering future sessions and re-burning context on outdated state. See [PRD-as-Prompt Pattern § Doc Rot](prd-as-prompt.md).

## Related Pages

- [Context Engineering](context-engineering.md) — the underlying attention/context-rot mechanism
- [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md) — exact-token status line installation
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where smart-zone discipline fits in daily practice
- [Reviewer Agents](reviewer-agents.md) — fresh-context-per-reviewer as a smart-zone application
- [Matt Pocock](../people/matt-pocock.md) — popularized the framing
- [Plan and Review](plan-and-review.md) — the time-axis counterpart (5-minute threshold) to this context-axis (~100K) discipline
