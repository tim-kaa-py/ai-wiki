---
title: "LLM Wiki Pattern"
type: "concept"
pillar: "building"
tags: [karpathy, wiki, knowledge-management, rag, markdown, compiler-analogy, hooks]
sources:
  - "summaries/2026-04-02_karpathy_llm-wiki.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
last_updated: "2026-04-13"
---

# LLM Wiki Pattern

A knowledge management approach introduced by Andrej Karpathy where an LLM incrementally builds and maintains a structured wiki of interconnected markdown files, replacing traditional RAG for personal knowledge bases.

## The Core Idea

Instead of querying raw documents via retrieval-augmented generation, let the LLM compile a persistent wiki. The wiki becomes the queryable artifact — not the raw sources. The LLM handles all bookkeeping: summarization, cross-referencing, categorization, and consistency maintenance.

> "I thought I had to reach out for some fancy RAG, but the LLM has been pretty good about auto-maintaining the index files and brief summaries of all the documents." — Karpathy

Karpathy frames this as shifting token throughput from "manipulating code" to "manipulating knowledge stored as markdown and images."

## Three-Layer Architecture

1. **Raw sources** — Immutable documents dropped into a raw/sources directory (articles, papers, repos, transcripts)
2. **The wiki** — LLM-generated markdown files: summaries, concept pages, entity pages, analysis. The LLM owns these entirely.
3. **The schema** — A CLAUDE.md file that defines conventions, workflows, and structure for the LLM to follow.

## Three Operations

| Operation | What it does |
|-----------|-------------|
| **Ingest** | Drop a source into raw → LLM reads it, creates summary, updates wiki pages, maintains cross-references |
| **Query** | Ask questions → LLM searches wiki pages, synthesizes answer with citations |
| **Lint** | Health check → LLM finds stale info, orphan pages, contradictions, gaps. Analogous to a code linter for knowledge. |

## The Argument: RAG vs. Wiki

The pattern makes a specific claim about when RAG is unnecessary:

- LLMs can auto-maintain index files and brief summaries of all documents
- Markdown backlinks create navigable structure without vector search
- For ~100 articles, the LLM can read and reason across the full wiki
- **Therefore:** RAG is unnecessary at personal scale — the wiki pattern is sufficient

**Acknowledged limit:** At gigabyte scale with hundreds or thousands of documents, RAG is still the better option. The pattern is explicitly not a universal RAG replacement — it's scoped to personal knowledge bases where the LLM's context can cover the index and summaries.

## The Compiler Analogy (Karpathy → Cole Medin)

Karpathy maps the knowledge management pipeline onto a compiler toolchain. This is more than a metaphor — it prescribes concrete system components and their relationships:

| Compiler concept | Wiki equivalent |
|-----------------|----------------|
| **Source code** | Raw folder — unprocessed articles, papers, transcripts as markdown |
| **Compiler** | LLM processing — summarization, linking, structuring |
| **Executable** | Wiki — compiled articles with backlinks, the queryable artifact |
| **Test suite** | Linting — finding gaps, stale data, broken links, data integrity checks |
| **Runtime** | Querying — agents searching the wiki via the index |

Cole Medin takes this further by applying the same architecture to **internal data**: session logs from Claude Code conversations replace web clips as the raw input. The daily logs folder is the "source code," Claude Code hooks are the ingestion pipeline, and the same wiki/index/backlink structure serves as the compiled output. *(Source: Cole Medin)*

## Agents.md as Meta-Reasoning Layer

A global rules file that describes the entire knowledge base system to the agent — where information comes from, where the compiled version lives, how the index works, how the log file functions. This gives the agent a **self-model**: meta-awareness of its own infrastructure so it can reason about how to search, what to update, and how the pieces connect.

This is a concrete prompt engineering pattern for making agents self-aware of their tooling. The agent doesn't just *use* the knowledge base — it *understands how the knowledge base works* and can reason about navigation strategy. *(Source: Cole Medin)*

## The Compounding Loop

The self-reinforcing cycle that makes the wiki grow from usage alone:

1. **Query** the wiki → get an answer
2. **File** the answer back into the wiki
3. Wiki **grows** with new knowledge
4. Future queries get **better answers**

Every conversation makes the next one more informed. With Claude Code hooks automating the capture step, this loop runs with zero maintenance — the system gets more valuable the more you use it. Cole Medin demos getting a detailed codebase-specific answer in ~10 seconds that would otherwise require deep analysis or sub-agent searches. *(Source: Cole Medin)*

## Key Insight: File Good Answers Back

Valuable query answers — comparisons, analyses, discovered connections — shouldn't disappear into chat history. They should be filed back into the wiki as new pages. This way explorations compound in the knowledge base just like ingested sources do. *(Source: Karpathy gist)*

## Use Cases

From Karpathy's original description:
- **Personal:** goals, health, self-improvement — journal entries, articles, podcast notes
- **Research:** going deep on a topic over weeks/months with an evolving thesis
- **Reading a book:** chapter-by-chapter companion wiki (characters, themes, plot threads)
- **Business/team:** internal wiki fed by Slack, meeting transcripts, project docs
- **Anything with knowledge accumulation:** competitive analysis, due diligence, course notes, hobby deep-dives

## Why It Works (and When It Doesn't)

**Why it works:** The tedious part of knowledge management isn't reading or thinking — it's the bookkeeping. LLMs handle maintenance at near-zero cost. Humans direct analysis and ask good questions. Related in spirit to Vannevar Bush's Memex (1945) — a personal knowledge store with associative trails between documents. Bush couldn't solve who does the maintenance. The LLM handles that. *(Source: Karpathy gist)*

**Scalability limit:** Works well at ~100 sources, hundreds of pages. For larger scale, consider adding search tooling like [qmd](https://github.com/tobi/qmd) — a local markdown search engine with hybrid BM25/vector search and LLM re-ranking, available as both CLI and MCP server. *(Source: Karpathy gist)*

## Internal vs External Knowledge Bases

Karpathy's original system ingests **external data** — web articles, papers, research. Cole Medin's key adaptation flips the input source to **internal data**: session logs from Claude Code conversations. The architecture is identical:

| Layer | External (Karpathy) | Internal (Cole Medin) |
|-------|---------------------|----------------------|
| Raw input | Web clips, papers, articles | Session logs, conversation summaries |
| Ingestion | Obsidian Web Clipper + manual drops | Claude Code hooks (automatic) |
| Processing | LLM summarization + linking | Claude Agent SDK (background) |
| Output | Wiki with backlinks + index | Same structure |

The internal variant captures **tacit knowledge** — decisions, lessons learned, action items — that doesn't exist anywhere else in the codebase. Without it, answering codebase-specific questions requires searching git logs (incomplete) or spawning sub-agents (slow). *(Source: Cole Medin)*

## Related Pages

- [Claude Code](../tools/claude-code.md) — the LLM tool that maintains the wiki
- [Obsidian](../tools/obsidian.md) — visualization frontend for the wiki
- [Andrej Karpathy](../people/andrej-karpathy.md) — originator of the pattern
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — implementation guide for the internal data variant
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) — bootstrap pattern for one-shotting the system setup
- [Contextual Retrieval](./contextual-retrieval.md) — the RAG-improving counterpart: where the wiki pattern abandons RAG at personal scale, Contextual Retrieval improves RAG at production scale.
