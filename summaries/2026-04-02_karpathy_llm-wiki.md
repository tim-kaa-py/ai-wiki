---
title: "LLM Wiki"
source_type: "article"
channel: "Andrej Karpathy"
date: "2026-04-02"
url: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
pillar: "building"
tags: [karpathy, wiki, knowledge-management, rag, obsidian, markdown]
ingested: "2026-04-09"
source_file: "sources/articles/2026-04-02_karpathy_llm-wiki.md"
---

# LLM Wiki — Summary

**Source:** Andrej Karpathy | 2026-04-02 | [Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Article

## TL;DR

Karpathy's blueprint for replacing RAG with an LLM-maintained wiki. Instead of retrieving from raw documents on every query, the LLM incrementally builds a persistent, interlinked collection of markdown files — a "compounding artifact" that gets richer with every source and question. Three layers (raw sources, wiki, schema), three operations (ingest, query, lint). The human curates and thinks; the LLM handles all bookkeeping.

## Key Takeaways

1. **The wiki is a persistent, compounding artifact.** Unlike RAG which re-derives knowledge on every query, the wiki compiles knowledge once and keeps it current. Cross-references, contradictions, and synthesis are already there.
   - **How to apply:** This is the pattern driving this entire repo.

2. **Three-layer architecture.** Raw sources (immutable) → wiki (LLM-owned markdown) → schema (CLAUDE.md conventions). The LLM owns the wiki layer entirely.
   - **How to apply:** Already implemented: `sources/` → `wiki/` → `CLAUDE.md`.

3. **Three operations: ingest, query, lint.** Ingest processes new sources and touches 10-15 wiki pages. Query searches and synthesizes with citations. Lint health-checks for contradictions, orphans, gaps.
   - **How to apply:** All three are defined in this repo's CLAUDE.md.

4. **index.md + log.md are the navigation backbone.** Index is content-oriented (catalog by category). Log is chronological (append-only record). The LLM reads index first to find relevant pages on query.
   - **How to apply:** Both exist in this repo and are maintained on every ingest.

5. **Good query answers should be filed back into the wiki.** Comparisons, analyses, and discovered connections are valuable and shouldn't disappear into chat history.
   - **How to apply:** After query sessions, consider creating new wiki pages from valuable answers.

6. **Obsidian as the IDE, LLM as the programmer, wiki as the codebase.** Karpathy's workflow: LLM agent on one side, Obsidian on the other, browsing results in real time.
   - **How to apply:** Set up Obsidian pointing at this repo when ready.

7. **Scale limit acknowledged.** Works well at ~100 sources, hundreds of pages. For larger scale, consider adding search tooling like qmd (hybrid BM25/vector search for markdown).
   - **How to apply:** No action needed now. Consider qmd if the wiki exceeds ~100 sources.

8. **Useful Obsidian plugins.** Web Clipper (fast capture), Dataview (queries over frontmatter), Marp (slide decks from wiki content), graph view (visualize connections).

## Related Topics

karpathy, wiki, knowledge-management, rag, obsidian, markdown, memex, digital-brain
