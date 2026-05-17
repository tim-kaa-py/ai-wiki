---
title: "Dreaming (Out-of-Band Memory Consolidation)"
type: "concept"
pillar: "building"
tags: [memory, agents, multi-agent, dreaming, self-learning, managed-agents, anthropic, claude, harness-engineering, knowledge-base]
sources:
  - "summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md"
last_updated: "2026-05-17"
---

# Dreaming (Out-of-Band Memory Consolidation)

A batch, asynchronous, out-of-band process that mines recent agent transcripts across many sessions and produces a curated diff against a memory store. Announced by Anthropic in May 2026 (Mahes, PM on the Platform team) as a research-preview companion to managed-agent memory. The name aside, this is essentially an **offline memory-consolidation pass** — the same architectural move biology makes during sleep, applied to agent fleets.

## What Dreaming Does

Dreaming reads recent agent transcripts (across sessions and agents) and produces a structured diff against a target memory store:

- **New cross-agent patterns** — e.g., "five agents all hit the same 60-second retry path" — that no single session could observe from its own perspective.
- **Deduplication** — collapse redundant entries written by different agents at different times.
- **Stale-entry removal** — drop notes that recent evidence contradicts or supersedes.
- **Verification notes** — annotate entries with provenance and confidence after re-checking them against the corpus.
- **Enrichment / backfill** — fill in metadata or organize entries the on-task agents wrote in haste.

The diff can be **auto-applied** or routed through **manual review**, depending on the operator's risk tolerance.

## Triggers

Anthropic exposes three trigger modes:

| Trigger | Use case |
|---------|----------|
| **Cron-style** | Nightly / weekly consolidation passes |
| **Console / manual** | One-off operator-initiated runs |
| **API / hook-driven** | Programmatic — e.g., kicked off when a session spins down |

The triggers all bottom out in the same process; only the schedule differs.

## Why Out-of-Band: Three Convergent Arguments

Mahes's framing isn't "Dreaming is one option among many for memory curation" — three independent reasoning chains all force the same architectural choice. The convergence is what makes the design load-bearing.

### Chain A — Perspective

- A working agent sees only its own session/context/task.
- Cross-agent patterns are invisible from inside any one session — "five agents all hit the same 60-second retry" only exists when you read five transcripts together.
- Therefore the consolidator must operate *above* sessions, not inside one.

### Chain B — Harness Design

- Agents perform best with **one clear objective** (the canonical [Harness Engineering](harness-engineering.md) principle).
- "Complete this task" and "improve the shared memory store" are different objectives that trade off against each other.
- Asking the working agent to also curate memory dilutes its task objective.
- Therefore split them into two agents (or two phases) with separate success criteria.

### Chain C — Latency and Compute

- Memory curation is expensive and exploratory; it benefits from spending many tokens.
- The hot path of an agent task cannot afford that latency.
- Therefore curation must run asynchronously, in the background, not in-line.

All three chains push toward the same conclusion: **consolidation belongs outside the task loop.** The Dreaming product is the operationalization.

## Memory Curation as Compute-Scaling

The deeper claim Mahes makes — and the most generalizable one for harness design — is that **memory quality follows scaling laws**. Two analogies make the case:

| Analogy | Mapping |
|---------|---------|
| **Test-time compute** | Letting a model spend more tokens exploring options at inference produces better answers. The same logic applies to memory: spend more tokens curating, get a better store. |
| **Search-index build/serve separation** | A search system invests heavily up front to build a high-quality index so retrieval is fast and accurate. Dreaming builds the curated index; downstream agents query it cheaply. |

**Conclusion:** Memory curation is a compute-amortization story. The cost is paid once during Dreaming; the value is collected by every downstream agent reading the store. This justifies spending non-trivial compute on consolidation even when each individual task could "get by" without it.

This pairs with the broader [Harness Engineering](harness-engineering.md) finding that **a harness optimized on one model transfers to five others** — the curated memory store is the asset; agents reading it are the throughput.

## Three Layers of a Memory System

Anthropic separates a frontier memory system into three layers; Dreaming targets the third:

| Layer | What it covers |
|-------|----------------|
| **Storage** | Where data lives, metadata, attribution, version history |
| **Structure / content** | How memory is shaped (file system; Skills as procedural memory) |
| **Process** | When memory is updated, what triggers updates, what sources inform them |

The first two are what plain memory in [Claude Managed Agents](../tools/claude-managed-agents.md) ships today; Dreaming is the process-layer move. Without an explicit process layer, the store degrades into entropy as the agent fleet grows — duplicates, contradictions, and stale entries accumulate faster than ad-hoc on-task writes can clean them up.

## Empirical Result Cited

Harvey reported **6× task completion improvement on a legal benchmark** with Dreaming applied to its shared memory store, relative to the same agents reading a memory store without consolidation. This is the early-result anchor for the "memory quality follows scaling laws" argument — more compute spent curating produces measurable downstream gains.

## When Dreaming Matters Most

The argument scales with deployment size:

- **Solo developer:** memory store is small, mostly local, and curation can stay implicit. Dreaming is overkill.
- **Small team / single product:** entropy grows but can be managed by occasional manual cleanup or a simple cron job.
- **Enterprise fleet (hundreds-to-thousands of concurrent agents writing the same store):** entropy accumulates fast. Without an explicit curation process the store degrades into noise and either gets ignored or actively misleads. **Dreaming is what keeps a shared memory store usable past the toy-deployment phase.**

This is the same scaling argument as for [Parallel Agent Patterns](parallel-agent-patterns.md): coordination overhead becomes load-bearing only past a threshold of fleet size, but past that threshold it's non-negotiable.

## Replicating the Pattern Without the Product

The architectural pattern is buildable without the managed-agent product — the value comes from the discipline, not from the API. Minimum-viable replication:

1. **Persist transcripts** of all sessions to a known directory (most harnesses do this anyway).
2. **Schedule a consolidation job** (cron, GitHub Actions, or post-session hook).
3. **Spawn a single agent** whose entire objective is *"read these N transcripts and produce a diff against this memory store."* Give it the memory store as a file system and the transcripts as inputs. Use the same `read` / `write` / `grep` interface; no special memory primitive needed.
4. **Route the diff** to auto-apply or manual review depending on trust.
5. **Verify on a rubric** — does the diff resolve more contradictions than it introduces? Are stale entries genuinely stale? Cross-agent patterns genuinely cross-agent?

The expensive part is not the orchestration; it's writing the prompt that produces a *good* diff. Treat the consolidator agent as harness IP — same as any reviewer agent.

## Relation to Adjacent Patterns

Dreaming sits in the same family as several existing wiki patterns:

| Pattern | Relation |
|---------|----------|
| **[Reviewer Agents](reviewer-agents.md)** | Fresh-context agent with a separate objective from the on-task agent. Reviewer judges code; Dreaming agent judges memory. Same harness-design principle. |
| **[Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md)** (Cole Medin) | A "daily flush" promotes session logs into wiki pages. Architecturally the same move at smaller scale — out-of-band consolidator producing curated artifacts. |
| **[LLM Wiki Pattern](llm-wiki-pattern.md)** (Karpathy) | The compounding-knowledge thesis Dreaming productizes for managed agents. |
| **[Agent Memory Systems](agent-memory-systems.md)** (Simon Scrapes) | Dreaming is a *process layer* over the *storage/injection/recall* lens. Memarch + Hermes own storage + injection; Dreaming-style consolidation owns the process. |
| **[Generator-Evaluator Harness](generator-evaluator-harness.md)** | Separating "do the work" from "judge the work" into two agent loops with different success criteria. Dreaming applies the split to memory rather than code. |

## How to Apply

1. **Audit your agent fleet's memory store after a week of use.** If you can't articulate what consolidation pass would make it 20% more useful, your fleet is too small to need Dreaming yet — but the audit itself is the start of the process.
2. **Separate the hot path from the consolidation path before you scale.** Even a single cron-run consolidator agent prevents the entropy problem from compounding past the point where retroactive cleanup is realistic.
3. **Budget compute for memory curation separately from task compute.** Treat it like an index build, not a side effect. Mahes's analogy is exactly right — a search engine that didn't budget index-build cost separately from query cost would never work.
4. **Run a meta-analysis over recent transcripts before optimizing any single agent.** Cross-session patterns ("all five agents hit the same retry") are invisible inside any one session but cheap to find once you look at the corpus.
5. **Keep the curation prompt under version control.** It is harness IP, not a one-off script. Re-audit it on every model upgrade — the same craft-of-subtraction discipline as the rest of [Harness Engineering](harness-engineering.md).

## Related Pages

- [Agent Memory Systems](agent-memory-systems.md) — storage/injection/recall lens; Dreaming sits at the process layer
- [Claude Managed Agents](../tools/claude-managed-agents.md) — the platform where Dreaming ships as a research preview
- [Harness Engineering](harness-engineering.md) — the one-objective-per-agent principle Dreaming operationalizes
- [Reviewer Agents](reviewer-agents.md) — fresh-context separation of judgment from production
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — the daily-flush pattern is the small-scale equivalent
- [LLM Wiki Pattern](llm-wiki-pattern.md) — Karpathy's compounding-knowledge thesis
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — adjacent split-objective architecture
- [Parallel Agent Patterns](parallel-agent-patterns.md) — the multi-agent regime that makes Dreaming load-bearing
