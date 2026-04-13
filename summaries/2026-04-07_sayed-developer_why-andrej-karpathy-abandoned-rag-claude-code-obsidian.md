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

# Why Andrej Karpathy Abandoned RAG — Summary

**Source:** sayed.developer | 2026-04-07 | [Watch](https://www.youtube.com/watch?v=WgqqoSkC0bw) | 12:57

## TL;DR

A practical tutorial replicating Karpathy's LLM wiki pattern: using Claude Code to build an auto-maintained knowledge base from raw sources (articles, papers, videos), with Obsidian as the visualization frontend. Demonstrates the full setup, ingestion via web clipper, and the resulting graph view with interconnected concepts, entities, and sources.

## Video Structure

1. [00:00-00:54] Introduction — Demonstrates existing graph view of Instagram video scripts organized as wiki entities and concepts
2. [00:54-03:30] Karpathy's method explained — His X post on LLM knowledge bases, the three-layer architecture (raw → wiki → visualization), and the "digital brain" analogy
3. [03:30-04:17] Querying the wiki — Once big enough, the LLM can answer complex questions by searching backlinks and connections; Karpathy says RAG wasn't needed
4. [04:17-07:30] Setup tutorial — Creating an Obsidian vault, opening in VS Code, pasting Karpathy's gist as CLAUDE.md, using voice to instruct Claude Code
5. [07:30-08:30] Wiki operations — Claude Code explains how to use the wiki: ingest, query, and lint
6. [08:30-10:04] Ingestion demo — Using Obsidian Web Clipper to capture an Anthropic research page, then telling Claude Code to ingest it; watching graph grow
7. [10:04-10:57] Scalability caveat — The pattern works for ~100 articles; for gigabytes of data, RAG is still better
8. [10:57-12:40] Index, log, and CLAUDE.md — Explaining the wiki index (catalog by type), log (chronological operations), and CLAUDE.md (session instructions)
9. [12:40-12:57] Conclusion

## Key Concepts

### LLM Wiki Pattern (Karpathy's "Digital Brain")

An approach where an LLM incrementally compiles a wiki from raw source documents. The wiki consists of markdown files organized into sources, summaries, concepts, entities, and analysis — all linked together with backlinks. The LLM writes all wiki content; the human rarely touches it directly. Karpathy describes this as shifting token throughput from "manipulating code" to "manipulating knowledge stored as markdown and images."

### Data Ingestion Pipeline

The flow of getting information into the wiki: raw sources (articles, papers, repos, video scripts) are dropped into a `raw/` directory. The LLM reads them, extracts concepts and entities, creates summaries, builds backlinks, and categorizes everything. Obsidian Web Clipper is the recommended fast-capture tool for web articles.

### Wiki Lint

Analogous to a code linter. When you say "lint the wiki," Claude Code checks for stale information, orphaned pages, contradictions between sources, and gaps in coverage — then clears them. This keeps the knowledge base healthy as it grows.

## Key Takeaways

1. **The LLM wiki replaces RAG for personal-scale knowledge bases.** Karpathy says he "thought he had to reach out for some fancy RAG" but the LLM auto-maintains index files and summaries well enough. No vector database needed.
   - **How to apply:** For up to ~100 articles, use the wiki pattern directly. Switch to RAG only when data exceeds what fits in context.

2. **Obsidian is the ideal visualization frontend.** It's just a folder of markdown files — no API needed. Graph view shows interconnections between concepts, entities, and sources. Backlinks create navigable knowledge structure.
   - **How to apply:** Create a new Obsidian vault pointing at your wiki directory. The graph view works immediately.

3. **Obsidian Web Clipper is the fast-capture pipeline.** Browser extension that clips web pages (including images) directly into the raw directory. One-click capture from any research page.
   - **How to apply:** Install Obsidian Web Clipper, configure it to save to your `raw/` or `inbox/` directory.

4. **The CLAUDE.md file is the brain's operating manual.** It describes the wiki schema, conventions, ingestion rules, querying behavior, and lint operations. Claude reads it every session to know how to behave.
   - **How to apply:** Paste Karpathy's gist (or your own schema) as CLAUDE.md in the vault root.

5. **Wiki structure has four layers: sources, entities, concepts, analysis.** Each is a type of markdown file. Entities are specific things (people, tools, papers). Concepts are abstract ideas. Analysis is cross-cutting synthesis. All linked via backlinks.
   - **How to apply:** Let Claude Code create this structure automatically. Don't manually organize — the LLM handles categorization.

6. **Index and log are critical bookkeeping.** The index catalogs all wiki pages by type with descriptions. The log records every operation chronologically. Together they give the LLM a map of what exists and what changed.
   - **How to apply:** Include index.md and log.md maintenance in your CLAUDE.md instructions.

## Argument Structures

**RAG vs. Wiki Pattern:**
- Premise 1: LLMs can auto-maintain index files and brief summaries of all documents
- Premise 2: Markdown backlinks create navigable structure without vector search
- Premise 3: For ~100 articles, the LLM can read and reason across the full wiki
- Conclusion: RAG is unnecessary at personal scale — the wiki pattern is sufficient
- Caveat (acknowledged by creator): At gigabyte scale, RAG is still the better option. The pattern is not scalable beyond ~100 articles.

## Notable Commands / Code Snippets

Setup sequence:
1. Create new Obsidian vault (`Manage Vaults → Create`)
2. Open vault folder in VS Code
3. Paste Karpathy's gist into CLAUDE.md
4. Tell Claude Code (via voice): "Read Karpathy's method, create a wiki for my research interest"
5. Install Obsidian Web Clipper → configure save location to `raw/`
6. Clip articles → tell Claude "I placed a paper in raw, ingest it"
7. Say "lint the wiki" periodically to check health

## User Notes

Focus was on the Karpathy wiki pattern, Obsidian integration as a frontend for browsing and visualizing the wiki (graph view), Obsidian Web Clipper as a fast capture pipeline, and how to use Obsidian with your own wiki setup. User is already implementing the wiki approach in this repository and interested in adding Obsidian as a visualization layer.

## Related Topics

karpathy, wiki, obsidian, claude-code, rag, knowledge-management
