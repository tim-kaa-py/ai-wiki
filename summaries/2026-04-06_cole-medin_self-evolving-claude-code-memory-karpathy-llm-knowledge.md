---
title: "I Built Self-Evolving Claude Code Memory w/ Karpathy's LLM Knowledge Bases"
source_type: "youtube"
channel: "Cole Medin"
date: "2026-04-06"
url: "https://www.youtube.com/watch?v=7huCP6RkcY4"
pillar: "building"
tags: [claude-code, memory, llm-knowledge-bases, obsidian, karpathy, agents, second-brain, hooks]
ingested: "2026-04-13"
source_file: "sources/youtube/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
---

# I Built Self-Evolving Claude Code Memory w/ Karpathy's LLM Knowledge Bases — Summary

**Source:** Cole Medin | 2026-04-06 | [Link](https://www.youtube.com/watch?v=7huCP6RkcY4) | 19:23

## TL;DR

Karpathy proposed structuring personal knowledge bases as a compiler pipeline — raw sources in, LLM-processed wiki out, with index files replacing RAG entirely — and Cole Medin adapts this to internal codebase memory using Claude Code hooks that automatically capture session logs and promote them into a self-maintaining wiki. The key insight is that an LLM-maintained index file plus Obsidian backlinks gives agents enough navigational structure to search effectively without vector databases, and Claude Code hooks make this zero-maintenance by running the entire capture-process-promote loop automatically on session boundaries.

## Video Structure

1. [00:00-00:27] Introduction — Framing LLM knowledge bases as the latest important pattern, originated from Karpathy's tweet
2. [00:27-02:20] Karpathy's Concept & Motivation — External data knowledge bases, Obsidian as canvas, why Cole built an internal-data variant
3. [02:20-06:01] The Compiler Analogy — Mapping the knowledge pipeline to source code → compiler → executable → test suite → runtime
4. [06:01-08:37] Data Flow & Bootstrap — Obsidian Web Clipper, raw/wiki folder structure, agents.md as meta-reasoning layer, PRD-as-prompt one-shot bootstrap
5. [08:37-09:17] Internal vs External — Key pivot: session logs replace web clips as the raw input for internal codebase memory
6. [09:17-10:43] Sponsor segment (InForge)
7. [10:43-12:17] Practical Setup — Cloning the repo, opening as Obsidian vault, daily logs and wiki structure
8. [12:17-14:47] Hook Architecture — Session start hook (loads agents.md + index), pre-compact and session end hooks (capture summaries), demo of querying the knowledge base
9. [14:47-16:10] Claude Agent SDK & Flush Process — Background summarization via separate Claude process, daily flush promoting logs into wiki concepts and connections
10. [16:10-18:35] The Compounding Loop — Query → answer → file → wiki grows → better future answers, fully automatic with no maintenance
11. [18:35-19:23] Outro — Dynamus community workshop mention, call to action

## Key Concepts

### LLM Knowledge Bases (Karpathy's Framing)

A system where an LLM organizes external information into a queryable wiki structured for agent consumption. The LLM acts as both compiler (processing raw sources into structured articles with backlinks) and maintainer (keeping index files current). Karpathy's key claim: "I thought I had to reach for fancy RAG, but the large language model has been pretty good about auto-maintaining index files." No vector database, no semantic search — just markdown files with an index and backlinks that agents can navigate directly.

### The Compiler Analogy

Karpathy maps knowledge management onto a compiler toolchain:
- **Source code** = raw folder (unprocessed articles, papers, transcripts as markdown)
- **Compiler** = LLM processing (summarization, linking, structuring)
- **Executable** = wiki (compiled articles with backlinks, what gets queried)
- **Test suite** = linting (finding gaps, stale data, broken links, data integrity checks)
- **Runtime** = querying (agents searching the wiki via the index)

This is more than a metaphor — it prescribes concrete system components and their relationships.

### Internal vs External Knowledge Bases

Cole's key adaptation: Karpathy's system ingests external data (web articles, papers). Cole flips the input source to internal data — session logs from Claude Code conversations. The daily logs folder is the raw equivalent, Claude Code hooks are the ingestion pipeline, and the same wiki/index/backlink structure serves as the compiled output. Same architecture, different data source.

### Agents.md as Meta-Reasoning Layer

A global rules file that describes the entire knowledge base system to the agent — where information comes from, where the compiled version lives, how the index works, how the log file functions. This gives the agent a self-model: meta-awareness of its own infrastructure so it can reason about how to search, what to update, and how the pieces connect. A concrete prompt engineering pattern for making agents self-aware of their tooling.

## Key Takeaways

1. **Index files replace RAG for structured knowledge bases.** An LLM-maintained index.md that describes all folders and resources gives agents enough navigational context to search effectively without vector databases or semantic search. The agent reads the index, decides where to look, and navigates the file tree directly.
   - **How to apply:** Create an index.md at the root of any knowledge base that lists all folders, their contents, and key topics. Reference it in your CLAUDE.md or agents.md so the agent always loads it at session start.

2. **Claude Code hooks enable zero-maintenance memory capture.** Three hooks cover the entire lifecycle: session start (load context), pre-compact + session end (capture summaries). No manual journaling, no separate tools — the hooks fire automatically at the right moments.
   - **How to apply:** Set up hooks in `.claude/settings.json`: a session start hook that injects agents.md + index.md, and pre-compact/session-end hooks that call a summarization script to capture session takeaways into daily log files.

3. **The PRD-as-prompt pattern lets you one-shot entire system architectures.** Karpathy published a follow-up tweet with a PRD (product requirement document) that, when sent as a single prompt to a coding agent with no other context, builds the entire knowledge base system. This is a reusable bootstrap pattern.
   - **How to apply:** When designing a reusable system, encode the full architecture as a PRD-style prompt. Include folder structure, file schemas, agent rules, and processing pipeline. Test that it one-shots correctly from a blank slate.

4. **Background processing via Claude Agent SDK avoids blocking the main session.** The pre-compact and session-end hooks call the Claude Agent SDK as a separate process for summarization. It uses the existing Anthropic subscription (no API key setup). This lets you compose multiple Claude instances without the main session waiting on processing.
   - **How to apply:** In hook scripts, spawn the Claude Agent SDK as a background process (`claude` CLI or SDK call) to handle heavy processing like summarization. The main Claude Code session continues uninterrupted.

5. **The compounding loop is the real payoff.** Query → answer → file the answer → wiki grows → future queries get better answers. Every conversation makes the next one more informed. Over time, the agent can answer codebase-specific questions in seconds that would otherwise require deep analysis or sub-agent searches.
   - **How to apply:** Ensure your flush/promotion process runs regularly (daily or on-demand) to extract concepts and connections from daily logs into the wiki. The wiki should grow organically from actual usage, not manual curation.

6. **Linting knowledge bases maintains data integrity.** Following the compiler analogy's test suite, run periodic checks for: gaps (raw content not yet in wiki), stale data, broken backlinks, and missing index entries. Treat your knowledge base with the same quality standards as code.
   - **How to apply:** Create a lint script or prompt that checks for orphaned raw files, broken wiki links, stale entries, and index-to-file mismatches. Run it periodically or as a hook.

## Argument Structures

### Why index files beat RAG for this use case

- Premise 1: LLMs are good at auto-maintaining index files that describe available resources
- Premise 2: Agents can navigate file trees directly using an index as a starting point
- Premise 3: The knowledge base is structured markdown, not unstructured blobs
- Conclusion: No vector database or semantic search is needed — the index + backlinks provide sufficient navigational structure
- Implication: This is dramatically simpler to build and maintain than a RAG pipeline, with no embedding model, no vector store, no retrieval tuning

### Why internal data memory is more valuable than it appears

- Premise: Without a knowledge base, answering codebase-specific questions requires searching git logs (incomplete) or spawning sub-agents to analyze the codebase (slow, especially for large codebases)
- Premise: Session logs capture decisions, lessons learned, and action items that don't exist anywhere else in the codebase
- Conclusion: A self-maintaining knowledge base of session history gives the agent access to tacit knowledge — the "why" behind decisions — that is otherwise lost between sessions
- Supporting evidence: Cole demos getting a detailed answer about "what to watch out for" in ~10 seconds, which would have required deep codebase analysis without the knowledge base

### Why hooks are the right integration point

- Premise: Memory capture must happen at context boundaries (session end, memory compaction) to avoid losing information
- Premise: Claude Code hooks fire automatically at exactly these boundaries
- Premise: Background processing via Claude Agent SDK means capture doesn't block the main session
- Conclusion: Hooks are a natural, zero-friction integration point that requires no behavior change from the user — the system is self-maintaining by design

## Notable Commands / Code Snippets

Metadata extraction (used in the ingest):
```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(id)s|||%(duration_string)s" "<URL>"
```

Hook configuration structure in `.claude/settings.json`:
```json
{
  "hooks": {
    "session_start": "python scripts/session_start.py",
    "pre_compact": "python scripts/pre_compact.py",
    "session_end": "python scripts/session_end.py"
  }
}
```
Note: The exact script contents are not shown in the video, but the architecture is: session_start loads agents.md + index.md as context; pre_compact and session_end send recent messages to Claude Agent SDK for summarization into daily logs.

Bootstrap prompt pattern (conceptual — send to Claude Code with no other context):
```
Clone <repo-url> and set up the LLM knowledge base system with Claude Code hooks for automatic session capture, daily log processing, and wiki maintenance.
```

## User Notes

- Karpathy's compiler analogy is a genuinely useful mental model for structuring any knowledge management system — it prescribes concrete components (raw folder, processing pipeline, compiled wiki, linting, querying) and their relationships rather than being a vague metaphor.
- The agents.md pattern is immediately applicable: a global rules file that gives the agent a self-model of its own infrastructure. This is a concrete prompt engineering technique for meta-reasoning — the agent doesn't just use the knowledge base, it understands how the knowledge base works and can reason about how to search it.
- The PRD-as-prompt bootstrap pattern is a reusable architecture delivery mechanism: encode your entire system design as an executable product requirements document that a coding agent can one-shot. Works because modern agents can scaffold complex multi-file systems from a single well-structured prompt.
- Claude Agent SDK as background processor is a practical composition pattern: hooks spawn a separate Claude process for heavy work (summarization) while the main session stays responsive. Uses existing Anthropic subscription, no API key setup — low friction to adopt.
- The self-documenting Obsidian vault approach is compelling because it requires zero behavior change: hooks handle capture, flush handles promotion, and the wiki grows entirely from actual usage. The compounding loop means the system gets more valuable the more you use it, with no manual maintenance.

## Related Topics

claude-code, memory, llm-knowledge-bases, obsidian, karpathy, agents, second-brain, hooks, prompt-engineering, workflow, architecture, best-practices
