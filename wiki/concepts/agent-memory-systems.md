---
title: "Agent Memory Systems: Storage / Injection / Recall"
type: "concept"
pillar: "building"
tags: [memory, agents, claude-code, context-engineering, hooks, best-practices]
sources:
  - "summaries/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md"
last_updated: "2026-05-17"
---

# Agent Memory Systems: Storage / Injection / Recall

A portable three-question framework for evaluating any agent memory system — from Claude Code's built-in automemory to ChatGPT memory to custom RAG to bespoke open-source plug-ins. Introduced by Simon Scrapes as a universal lens that cuts through marketing claims and exposes where each system's real weak link is.

## The Three Questions

Every memory system, regardless of branding, must answer three questions. If any answer is missing or weak, that is the system's gap:

| Question | What it asks | The failure mode if it's weak |
|----------|--------------|-------------------------------|
| **Storage** | *When* and *how* is information written? | Information that never makes it to disk can never be recalled |
| **Injection** | What is *already in context* before the agent starts thinking? | The agent has to spend tool calls fetching things it should already know |
| **Recall** | How is past information *found* when the user asks about it? | The agent silently forgets — or returns generic answers when specifics existed |

Use the framework prescriptively: when reading about a new memory tool, immediately ask *when does it write, what is always in context, and how does it find old information?* That gives you a gap analysis in three questions. *(Source: Simon Scrapes)*

## How Three Systems Score

Simon Scrapes applies the framework to three Claude Code memory systems. The verdict: **no single system answers all three questions well** — they are optimized for different jobs.

| System | Storage | Injection | Recall |
|--------|---------|-----------|--------|
| **Claude Code automemory** (default) | Silent writes to per-project MD files under `~/.claude/projects/...`; promotes to global after 3+ repetitions. Captures little. | `claude.md` loaded at session start + pre-tool-use hook pulls from memory index. | Weakest link — must trawl prior sessions or use `--resume` with a known session ID. |
| **Memarch / memsearch** (open source) | **Stop hook** fires after every turn → Haiku summarizes → bullets append to dated memory file → periodic `memarch index` chunks and embeds into local Milvus vector DB (CPU, zero API cost). Captures everything. | None — no injection layer. | **Three-tier progressive disclosure:** Tier 1 hybrid dense-vector + BM25 search → Tier 2 expand chunk with metadata + summary → Tier 3 raw dialogue. Strong. |
| **Hermes agent** (open source) | Agent decides what to save via `add` / `replace` / `remove` tools writing to `memory.md` (environment + actions) and `user.md` (user profile); raw transcripts saved in background; **7-day curator** prunes; **character cap** forces consolidation. Curated, lean. | **Frozen snapshot** at session start: `claude.md` + `memory.md` + `user.md` + `soul.md` (~1,300 tokens) loaded once and **cached** for the whole session. | Tier 0 in-context check of injected `memory.md` first, then keyword search of stored sessions + Gemini-flash summarization. Semantic recall is weak. |

The diagnostic value of the framework is visible immediately: memarch is a storage + recall library with no injection layer; Hermes is a curation + injection library with weak semantic recall. They are complements, not alternatives.

## The Hybrid Blueprint

Simon's recommended design layers all three systems so each fills another's gap:

```
Storage:    automemory (default)
          + memarch stop hook (capture every turn, auto-summarize via Haiku)
          + Hermes curated memory.md / user.md (agent-driven important facts)
          + nightly memsearch index (consolidate into vector DB)

Injection: at session start, load (and cache):
            claude.md + memory.md + user.md + soul.md + today's daily log
            (~3,000 cached tokens — fixed cost per session)

Recall:    Tier 0 → check injected memory.md + daily log (in-context, zero cost)
           Tier 1 → memarch hybrid search (dense vector + BM25)
           Tier 2 → memarch expand (add metadata + summary around chunk)
           Tier 3 → memarch raw dialogue (full transcript, last resort)
```

The point: **completeness for the recall tail, curation for the injection head.** Memarch's stop hook captures everything (so nothing is missing from the tail); Hermes' curated, capped, frozen-snapshot injection keeps the head lean (so every session starts informed without bloating the window). Tier 0 puts the cheapest check first, the expensive one last.

Simon links a free `plan.md` in the video description that hands this design to Claude Code to install end-to-end.

## Design Principle: Lean Context, Not More Context

The framework's biggest implicit argument is against the reflex to "load more so the model knows more." Loading 1,300 tokens of *the right* curated memory at session start outperforms loading 30,000 tokens of raw history.

Argument structure:
- Context windows have diminishing returns — more tokens means more for the model to wade through, slower responses, worse signal-to-noise.
- A frozen snapshot of ~1,300–3,000 tokens of *consolidated, recent, important* memory at session start, cached, costs almost nothing per-message.
- Tier 0 local checks against that snapshot are zero-cost and instantaneous; only descend into the vector DB if Tier 0 fails.
- **Conclusion:** the goal of a memory system is not "load more" but "load the right small thing at the right time." Storage can be deep and complete; injection must be lean.

This tracks with the broader [Context Engineering](context-engineering.md) discipline — bigger windows don't eliminate context overload (see also [Smart Zone vs Dumb Zone](smart-zone.md)).

## Hooks Are the Memory Integration Surface

Both memarch and Claude Code's own automemory ride on the hooks system. Hooks are the architectural primitive that lets memory plug into Claude Code *without forking the agent*:

| Hook | Used by | Job |
|------|---------|-----|
| `Stop` (after each turn) | Memarch | Capture turn → Haiku summary → append to dated file |
| `PreToolUse` | Claude Code automemory | Trigger memory index lookup before tools fire |
| `SessionStart` | Hermes-style | Inject frozen snapshot of curated memory files |

Diagnostic rule: when evaluating a memory extension, ask which hook surface it rides on. If the answer is "none, it's a separate process," it probably will not compose cleanly with Claude Code. See [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) for the full hooks reference.

## Key Concepts from the Hermes Design

A few mechanisms from Hermes are worth abstracting beyond Hermes itself:

### Frozen Snapshot Injection

At session start, load curated memory files into context **once** and let prompt caching cover the per-message cost. Anything written to those files *during* the session is persisted to disk but does not enter the current window — it surfaces in the *next* session. This trades a small fixed token cost per session for immediate, zero-latency access to recent consolidated memory.

### Character Cap Consolidation

Hermes enforces a maximum size on `memory.md` and `user.md`. When the cap is hit, the agent must **consolidate or drop** information rather than append indefinitely. This is what keeps the injected snapshot small enough to load every session without bloating context. The cap forces editorial discipline that the agent would otherwise skip.

### Tier 0 / Local-Context-First Recall

Before searching any database, check whether the answer is already in the injected `memory.md` (in-context, cached). Zero cost, instantaneous. Putting Tier 0 *in front of* memarch's three tiers is the clever optimization — the most common queries answer themselves from a single in-context read.

## Distinct from Auto Memory Capture (Cole Medin)

There is an adjacent pattern that uses similar primitives but solves a different problem. Cole Medin's hooks-for-memory design (see [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) and [LLM Wiki Pattern](llm-wiki-pattern.md)) uses `SessionStart` + `PreCompact` + `SessionEnd` hooks to feed session summaries into a compounding wiki — the focus is **knowledge compounding across sessions**.

The Simon framework's focus is **runtime memory for the agent during a session** — what it remembers about the user, the environment, and prior actions. The two patterns compose:

- Cole's pattern owns the *project knowledge base* — synthesized concept pages, decisions, codebase facts.
- Memarch + Hermes own the *runtime memory layer* — per-turn capture, session-start injection, tiered recall.

Both ride the hooks surface; both apply the storage/injection/recall lens; they target different artifacts.

## How to Apply

1. **Audit any memory system you adopt** by writing one sentence each on storage, injection, and recall. Any blank or "n/a" cell is a gap.
2. **Audit Claude Code's defaults the same way.** Inspect `~/.claude/memory/` — most users discover automemory captures far less than they assumed.
3. **Don't pick one open-source system over another** when they target different cells in the table. Layer them.
4. **Treat injection as a fixed per-session token budget.** Frozen snapshots cached at ~1,300–3,000 tokens are cheap; uncapped snippet files are not.
5. **Build recall in tiers,** cheapest check first. In-context check → fast index → expand → raw transcript.

## Related Pages

- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — hooks reference and Cole Medin's compounding-wiki pattern
- [Context Engineering](context-engineering.md) — the discipline this sits inside; "lean context" principle
- [Smart Zone vs Dumb Zone](smart-zone.md) — operational ceiling that makes lean injection worth the engineering
- [LLM Wiki Pattern](llm-wiki-pattern.md) — Cole Medin's adjacent compounding-knowledge pattern
- [Claude Code](../tools/claude-code.md) — the harness that hosts the hook surface
