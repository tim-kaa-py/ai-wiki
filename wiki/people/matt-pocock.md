---
title: "Matt Pocock"
type: "person"
pillar: "ecosystem"
tags: [agentic-engineering, claude-code, ai-hero, sandcastle, education, workflow]
sources:
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
timestamp: "2026-05-08"
---

# Matt Pocock

AI-coding teacher and author of [AI Hero](https://aihero.dev). Previously known for *Total TypeScript*. Active practitioner and educator on coding-agent workflows, with a particular focus on **end-to-end pipeline design** rather than isolated tactics.

## Key Contributions

- **Grill-me skill** — a tiny, paste-able interview prompt that produces a **shared design concept** (Brooks) between human and agent before any code is written.
- **PRD-as-destination-doc** — using the PRD as a downstream artifact for the agent rather than something the human reads end-to-end. See [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md).
- **Kanban DAG** — replacing sequential phase plans with markdown-issue files and explicit `blocked_by` relationships, so AFK loops can run parallel agents on independent branches.
- **Structured Ralph variant** — adds a PRD + Kanban + priority-ordered implementer prompt over vanilla Ralph (see [Harness Engineering](../concepts/harness-engineering.md)).
- **Sandcastle** — TypeScript library for parallel AFK execution: planner → per-issue implementer in worktree+Docker → reviewer → merger. See [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md).
- **`/improve-code-base-architecture` skill** — surfaces shallow-module clusters to collapse into [Deep Modules](../concepts/deep-modules.md). His "if you take one thing away from today" line.
- **Smart zone vs dumb zone discipline** — popularized Dex Hardy's framing as the operational target every coding stage must stay inside. See [Smart Zone](../concepts/smart-zone.md).

## Key Arguments

**Why grill-me beats plan mode:** Plan-mode rushes to produce a plan-document; the document is a poor proxy for alignment. A relentless one-question-at-a-time interview produces alignment as a byproduct of forcing the human to commit to specifics. The conversation history *is* the asset — plans are a byproduct of alignment, not the goal.

**Why don't review the PRD:** LLMs are reliably good at summarization. Reading the PRD therefore tests only a known-strong skill, not the alignment that was already established in grilling. The time is better spent in QA or on the next slice.

**Why deep modules > shallow modules for AI specifically:** AI can't navigate dense dependency graphs and ends up wrapping every tiny function in its own test boundary. Deep modules give one big test boundary that catches integration bugs, and a sparse navigation surface the agent can reason about locally. See [Deep Modules](../concepts/deep-modules.md).

**Why ~100K is the smart-zone ceiling even on 1M context:** "They shipped a lot more dumb zone." 1M context is good for retrieval, not for the dense reasoning coding requires. See [Smart Zone](../concepts/smart-zone.md).

## Workflow

The full pipeline (see [Agentic Coding Workflow § The Pocock Pipeline](../how-tos/agentic-coding-workflow.md#the-pocock-pipeline-grill--prd--kanban--loop)):

```
/clear → grill-me → /write-a-PRD → /PRD-to-issues → once.sh → ralph-loop → reviewer → QA
```

Implementer on Sonnet, reviewer on Opus (inverted from intuition — review is where you need the smarts, implementation can grind).

## Open Problems He Names

Two unresolved tensions in his own pipeline that he flags explicitly:

- **Code review under AI is unavoidable but unsolved.** Ralph batched commits push toward larger PRs; the keep-PRs-small dictum pushes the other way. "I don't honestly know what the answer to this yet."
- **PRD retention policy is a working heuristic.** He recommends closing/deleting PRDs after implementation to avoid doc rot, but ducks the migrations analogy when an audience member raises it.

## Anti-Takeaways (Retracted Earlier Advice)

- **"Sacrifice grammar for concision"** in CLAUDE.md is no longer used. The original justification was that he read every plan; now grill-me has replaced the plan-reading habit, so the cost of grammar disappears.
- **Don't AFK-optimize the PRD.** Putting deep-think cycles into PRD polishing is wrong — push that work into QA instead.

## Notable Quotes

> "If you take one thing away from today, just try running this skill on your repo." (on `/improve-code-base-architecture`)

> "They shipped a lot more dumb zone." (on 1M context windows for coding)

> "I prefer a little bit more structure" than vanilla Ralph.

## Context

Speaker at AI Engineer 2026 (April 2026, full 1h36m workshop). Educator at AI Hero. The talk lays out his complete coding-agent pipeline as a coherent dev workflow rather than as isolated tactics — every stage is justified, every handoff is named, and the unresolved tensions are called out rather than papered over.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where the pipeline lives
- [Smart Zone](../concepts/smart-zone.md) — the context-discipline framing
- [Deep Modules](../concepts/deep-modules.md) — the architecture lever
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) — destination-doc framing
- [Harness Engineering](../concepts/harness-engineering.md) — Ralph-loop variant
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — Sandcastle pipeline
- [Reviewer Agents](../concepts/reviewer-agents.md) — fresh-context reviewer rationale
