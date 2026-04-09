---
title: "LLM Wiki Pattern"
type: "concept"
pillar: "building"
tags: [karpathy, wiki, knowledge-management, rag, markdown]
sources:
  - "summaries/2026-04-02_karpathy_llm-wiki.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
last_updated: "2026-04-09"
---

# LLM Wiki Pattern

A knowledge management approach introduced by Andrej Karpathy where an LLM incrementally builds and maintains a structured wiki of interconnected markdown files, replacing traditional RAG for personal knowledge bases.

## The Core Idea

Instead of querying raw documents via retrieval-augmented generation, let the LLM compile a persistent wiki. The wiki becomes the queryable artifact — not the raw sources. The LLM handles all bookkeeping: summarization, cross-referencing, categorization, and consistency maintenance.

> "I thought I had to reach out for some fancy RAG, but the LLM has been pretty good about auto-maintaining the index files and brief summaries of all the documents." — Karpathy

## Three-Layer Architecture

1. **Raw sources** — Immutable documents dropped into a raw/sources directory (articles, papers, repos, transcripts)
2. **The wiki** — LLM-generated markdown files: summaries, concept pages, entity pages, analysis. The LLM owns these entirely.
3. **The schema** — A CLAUDE.md file that defines conventions, workflows, and structure for the LLM to follow.

## Three Operations

| Operation | What it does |
|-----------|-------------|
| **Ingest** | Drop a source into raw → LLM reads it, creates summary, updates wiki pages, maintains cross-references |
| **Query** | Ask questions → LLM searches wiki pages, synthesizes answer with citations |
| **Lint** | Health check → LLM finds stale info, orphan pages, contradictions, gaps |

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

## The "Digital Brain" Analogy

The wiki acts as an externalized, structured memory. Each ingest strengthens connections. Over time, the wiki becomes more valuable than any individual source because it contains synthesized, cross-referenced knowledge that no single document holds.

## Related Pages

- [Claude Code](../tools/claude-code.md) — the LLM tool that maintains the wiki
- [Obsidian](../tools/obsidian.md) — visualization frontend for the wiki
- [Andrej Karpathy](../people/andrej-karpathy.md) — originator of the pattern
