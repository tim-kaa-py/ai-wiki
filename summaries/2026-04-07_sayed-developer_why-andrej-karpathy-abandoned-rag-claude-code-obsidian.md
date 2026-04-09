---
title: "Why Andrej Karpathy Abandoned RAG (Claude Code x Obsidian)"
source_type: "youtube"
channel: "sayed.developer"
date: "2026-04-07"
url: "https://www.youtube.com/watch?v=WgqqoSkC0bw"
pillar: "building"
tags: [karpathy, wiki, obsidian, claude-code, rag, knowledge-management]
ingested: "2026-04-09"
source_file: "sources/youtube/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
---

# Why Andrej Karpathy Abandoned RAG (Claude Code x Obsidian) — Summary

**Source:** sayed.developer | 2026-04-07 | [Watch](https://www.youtube.com/watch?v=WgqqoSkC0bw) | 12:57

## TL;DR

A practical walkthrough of implementing Karpathy's LLM wiki pattern using Claude Code and Obsidian. The key insight: instead of RAG, let the LLM incrementally build and maintain a wiki of interconnected markdown files — your "digital brain." Obsidian provides the visualization layer (graph view, backlinks), while Claude Code does all the heavy lifting of organizing, cross-referencing, and maintaining the knowledge base.

## Key Takeaways

1. **The LLM wiki pattern replaces RAG for personal knowledge bases.** Instead of retrieval-augmented generation over raw documents, the LLM compiles a structured wiki with summaries, concepts, entities, and cross-references. The wiki becomes the queryable artifact, not the raw sources.
   - **How to apply:** Already implemented in this repo — sources go into `sources/`, the LLM maintains `wiki/` pages with cross-references.

2. **Obsidian as the visualization frontend.** Obsidian's graph view turns the markdown wiki into an interactive knowledge graph. Each wiki page becomes a node; backlinks and tags create edges. This makes connections between concepts visible at a glance.
   - **How to apply:** Point Obsidian at the wiki repo directory. The existing markdown structure with cross-references will render as a navigable graph.

3. **Obsidian Web Clipper as the fast capture pipeline.** The browser extension clips web pages (including images) directly into a designated folder as markdown. Zero friction — find an interesting article, clip it, tell Claude Code to ingest it.
   - **How to apply:** Install Obsidian Web Clipper, configure it to save to `inbox/`. Then say "process inbox" to ingest clipped articles.

4. **Three operations define the workflow: ingest, query, lint.** Drop sources into raw → LLM ingests and updates wiki. Ask questions → LLM searches wiki and synthesizes answers. Say "lint" → LLM checks for stale info, orphans, contradictions, gaps.
   - **How to apply:** Already built into this repo's CLAUDE.md schema as Tier 1/Tier 2 ingest, query workflow, and lint workflow.

5. **The CLAUDE.md file is the schema that drives everything.** It tells Claude Code on every session what this project is, how to ingest, query, and maintain the wiki. Without it, the LLM wouldn't know the conventions.
   - **How to apply:** Already implemented — the CLAUDE.md in this repo defines the full wiki schema.

6. **Scalability caveat: this doesn't replace RAG for large datasets.** Karpathy's own wiki is ~100 articles. For gigabytes of data, RAG is still necessary. This pattern works best for curated personal knowledge bases.
   - **How to apply:** Keep the wiki focused on curated, high-quality sources rather than trying to ingest everything.

## Notable Commands / Code Snippets

Obsidian Web Clipper setup for wiki ingest:
1. Install Obsidian Web Clipper browser extension
2. Configure output folder to point to the wiki's `inbox/` (or `raw/`) directory
3. Browse to an article → click clipper → "Add to Obsidian"
4. In Claude Code: "I placed a new resource in the inbox. Please ingest it."

## User Notes

- Already implementing the wiki approach in this repository
- Main interest: integrating Obsidian as a visualization layer and using Web Clipper for fast article capture
- The video validates the approach already taken in this repo's design

## Related Topics

karpathy, wiki, obsidian, obsidian-web-clipper, claude-code, rag, knowledge-management, digital-brain, markdown
