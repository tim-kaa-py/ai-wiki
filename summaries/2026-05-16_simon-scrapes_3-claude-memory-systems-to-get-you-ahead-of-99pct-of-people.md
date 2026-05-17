---
title: "3 Claude Memory Systems to Get You Ahead of 99% of People"
source_type: "youtube"
channel: "Simon Scrapes"
date: "2026-05-16"
url: "https://www.youtube.com/watch?v=rFWxRZ5D-lM"
pillar: "building"
tags: [claude-code, agents, workflow, memory, best-practices, hooks, context-engineering]
ingested: "2026-05-17"
source_file: "sources/youtube/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md"
---

# 3 Claude Memory Systems to Get You Ahead of 99% of People — Summary

**Source:** Simon Scrapes | 2026-05-16 | [Link](https://www.youtube.com/watch?v=rFWxRZ5D-lM) | 23:12

## TL;DR

Simon compares Claude Code's built-in automemory against two open-source memory systems — memarch (a.k.a. memsearch) and the Hermes agent — across three dimensions every memory system must answer: **storage, injection, and recall**. Memarch captures everything via a stop hook and excels at long-term semantic recall; Hermes captures only curated facts and excels at injecting a small frozen snapshot at session start. The recommended setup is a hybrid: automemory + memarch's stop hook for capture, Hermes-style curated `memory.md`/`user.md`/`soul.md` injection (~3,000 cached tokens), and a tiered recall flow (Tier 0 local context → vector/keyword hybrid search → expansion → raw transcript).

## Video Structure

1. [Early] **Framing — the three questions** — Every memory system must answer how information is stored, injected into context, and recalled. Introduces the three-system comparison (Claude Code default vs memarch vs Hermes).
2. [Early-Mid] **Storage** — Claude Code's automemory writes silently to per-project MD files in `~/.claude/projects/...`, promoting to global after 3+ repetitions. Memarch uses a stop hook with Haiku to summarize every turn and indexes chunks into a local Milvus vector DB. Hermes lets the agent explicitly add/replace/remove entries in capped `memory.md`/`user.md`, plus saves raw transcripts and prunes weekly via a curator.
3. [Mid] **Injection** — Default Claude Code injects `claude.md` at session start plus a pre-tool-use hook that pulls from the memory index. Memarch has no injection layer. Hermes injects a frozen, cached snapshot (`claude.md` + `memory.md` + `user.md` + `soul.md`, ~1,300 tokens) at session start.
4. [Mid-Late] **Recall** — Claude Code's recall is the weakest link (must trawl prior sessions). Memarch uses three-tier progressive disclosure: hybrid dense-vector + BM25 search → expand chunk → raw dialogue. Hermes checks the already-injected `memory.md` first (Tier 0), then falls back to keyword search of stored sessions and Gemini-flash summarization.
5. [Late] **Hybrid blueprint** — Combine all three: automemory + memarch stop hook for capture; Hermes-style frozen snapshot injection; Tier 0 local check → memarch hybrid search → expand → raw transcript for recall. A linked plan.md installs the whole stack into Claude Code.

## Key Concepts

### Storage / Injection / Recall framework
The three questions any memory system must answer: how information gets **stored** (when and how is it written), how it is **injected** into the agent's working context (what's already there before the agent starts thinking), and how it is **recalled** when the user asks about something from the past. Simon uses these as the universal lens for comparing systems.

### Memarch / memsearch
Open-source memory system that treats markdown as the source of truth. Uses a Claude Code **stop hook** that fires after *every* turn, calls Haiku to summarize the turn into bullets, and appends to a dated memory file with session anchors. Periodically (via `memarch index`) chunks and embeds those bullets into a local Milvus vector database — zero API cost, runs on CPU. Captures everything, no curation.

### Hermes agent
Open-source memory system where the **agent itself** decides what to save via `add`/`replace`/`remove` tools that write to `memory.md` (environment + actions) and `user.md` (user profile). Includes deduplication and a **character cap** that forces consolidation. Saves the raw transcript in the background each turn, and runs a **curator** every 7 days to prune. Optimizes for curated, intentionally lean snippets rather than completeness.

### Stop hook
A Claude Code hook that fires after each conversation turn completes. Memarch uses it as the architectural primitive for "capture everything automatically" — the hook is what makes storage continuous rather than agent-decided.

### Frozen snapshot (Hermes injection model)
At session start, Hermes loads `claude.md` + `memory.md` + `user.md` + `soul.md` into the context window once (~1,300 tokens) and **caches** it for the whole session. Anything written to those files during the session is persisted to disk but does not enter the current window — it surfaces in the *next* session. Trades a small fixed token cost per session for immediate, zero-latency access to recent consolidated memory.

### Progressive disclosure retrieval (memarch's three tiers)
- **Tier 1 — `memsearch search`:** Hybrid dense-vector (semantic, e.g. "monetization" matches "revenue") + BM25 keyword search returns closest matches.
- **Tier 2 — `memsearch expand`:** Adds surrounding metadata and a summary around the matched chunk.
- **Tier 3 — Raw dialogue:** Returns the full session transcript as a last resort.

Each tier costs more tokens; the agent only descends if the previous tier didn't answer the question.

### Character cap consolidation
Hermes enforces a maximum size on `memory.md` and `user.md`. When the cap is hit, the agent must consolidate or drop information rather than append indefinitely. This is what keeps the injected snapshot small enough to load every session without bloating context.

### Tier 0 / local-context-first recall
Hermes' clever optimization: before searching any database, check whether the answer is already in the injected `memory.md` (which is in-context and cached). Zero cost, instantaneous. Simon's hybrid puts this *in front of* memarch's three tiers — Tier 0 → 1 → 2 → 3.

## Key Takeaways

1. **Every memory system answers three questions: store, inject, recall.** Use this framework to evaluate any new system or design your own — it cuts through the marketing.
   - **How to apply:** When reading about a new memory tool, immediately ask: *when does it write, what is always in context, and how does it find old information?* If any of the three is missing or weak, you have your gap analysis.

2. **Claude Code's out-of-the-box memory is weak — especially recall.** Automemory only writes what it thinks is important (which is "not much"), injects `claude.md` plus a pre-tool-use hook lookup, and has no real recall mechanism beyond trawling past sessions or using `--resume` (which requires knowing the session ID).
   - **How to apply:** Don't rely on automemory alone for multi-client, multi-project work. Audit `~/.claude/memory/` to see how little is actually being captured.

3. **Memarch ≠ Hermes — they're optimized for different jobs.** Memarch is a storage + long-term recall library (no injection layer). Hermes is a curation + injection library (weaker semantic recall). Use both, not one.
   - **How to apply:** Don't pick one. Layer memarch's stop hook + vector DB underneath Hermes' curated `memory.md` + frozen snapshot.

4. **Lean context beats more context.** Loading 1,300 tokens of *the right* curated memory at session start outperforms loading 30,000 tokens of raw history. The point of memory is filtering, not accumulation.
   - **How to apply:** Keep `claude.md` under 200 lines. Add `memory.md`/`user.md`/`soul.md` only with capped sizes and forced consolidation. Treat every injected token as a budget item.

5. **Hooks are the integration surface for memory.** Stop hooks (memarch) capture turns; pre-tool-use hooks (Claude Code default) trigger memory lookups; session-start hooks (Hermes-style) inject frozen snapshots. Hooks let you bolt memory onto Claude Code without modifying the agent.
   - **How to apply:** When designing a memory extension, ask which hook surface it rides on. If the answer is "none, it's a separate process," it probably won't compose cleanly.

6. **The recommended hybrid:**
   - **Storage:** automemory (default) + memarch stop hook (capture every turn) + Hermes-style curated `memory.md`/`user.md` (agent-driven important facts) + nightly `memsearch index` to consolidate into the vector DB.
   - **Injection:** at session start, load `claude.md` + `memory.md` + `user.md` + `soul.md` + today's daily log (~3,000 tokens, cached).
   - **Recall:** Tier 0 (check injected `memory.md` + daily log) → memarch Tier 1 (hybrid vector + BM25) → Tier 2 (expand) → Tier 3 (raw transcript).
   - **How to apply:** Simon links a free `plan.md` in the video description that hands this design to Claude Code to install end-to-end.

## Argument Structures

### "Combine both — completeness AND curation"
- **Premise 1:** Memarch captures everything automatically via the stop hook, but the result is raw and uncurated — bad for injection (too much), good for deep recall.
- **Premise 2:** Hermes captures only what the agent explicitly chooses to save — good for injection (small, curated), but if the agent doesn't notice something is important, it's lost from the curated layer.
- **Premise 3:** Hermes mitigates this by also saving raw transcripts, but its recall is keyword-only (no semantic search).
- **Conclusion:** Use memarch's automatic capture + vector DB *underneath* Hermes' curated `memory.md`/`user.md`/frozen snapshot *above*. Completeness for the recall tail, curation for the injection head. Neither system alone gives you both.

### "Lean context, not more context"
- **Premise 1:** The default reflex is "load more into the context window so the model knows more."
- **Premise 2:** But context windows have diminishing returns — more tokens means more for the model to wade through, slower responses, and worse signal-to-noise.
- **Premise 3:** A frozen snapshot of ~1,300–3,000 tokens of *consolidated, recent, important* memory at session start, cached, costs almost nothing per-message.
- **Premise 4:** Tier 0 local checks against that snapshot are zero-cost and instantaneous; only descend into the vector DB if Tier 0 fails.
- **Conclusion:** The goal of a memory system is not "load more" but "load the right small thing at the right time." Storage can be deep and complete; injection must be lean.

## User Notes

- **Storage/injection/recall as a portable framework.** This is the keeper concept from the video — a reusable lens for evaluating any memory system (Claude Code, Cursor, ChatGPT memory, custom RAG, etc.). Worth a wiki concept page on its own.
- **Lean context, not more context.** Stated repeatedly; reinforces the context-engineering principle that the win is from *better selection*, not bigger windows. Tracks with how `claude.md` discipline (<200 lines) and CONNECT-style synthesis already work in this wiki.
- **Hooks as the memory integration surface.** Both memarch (stop hook for capture) and Claude Code's own pre-tool-use hook (for memory index lookup) live on the hooks system. Hooks are the architectural primitive that lets memory systems plug into Claude Code without forking the agent — worth noting in any wiki page on Claude Code hooks.
- **The hybrid blueprint (concrete).** The final quarter of the video is a buildable design, not just commentary: automemory + memarch stop hook for capture; Hermes-style curated `memory.md`/`user.md`/`soul.md` + daily log injected at session start (~3,000 cached tokens); recall via Tier 0 (local) → memarch hybrid search → expand → raw transcript. Simon links a free `plan.md` to hand this to Claude Code for setup.

## Related Topics

claude-code, agents, workflow, memory, best-practices, hooks, context-engineering
