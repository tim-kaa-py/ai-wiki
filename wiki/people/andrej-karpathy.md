---
title: "Andrej Karpathy"
type: "person"
pillar: "ecosystem"
tags: [karpathy, wiki, knowledge-management, ai-research, tesla, openai, compiler-analogy, prd-as-prompt]
sources:
  - "summaries/2026-04-02_karpathy_llm-wiki.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
last_updated: "2026-04-13"
---

# Andrej Karpathy

AI researcher. Former Director of AI at Tesla, founding member of OpenAI. Known for making complex AI concepts accessible through teaching and writing.

## Key Contributions (to this wiki's domain)

- **The LLM Wiki pattern** — introduced the idea of using LLMs to incrementally build and maintain personal knowledge bases as structured markdown wikis, replacing traditional RAG for curated knowledge domains
- Framed the key insight: "The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping."
- Described shifting token throughput from "manipulating code" to "manipulating knowledge stored as markdown and images"
- Shared the pattern as an open gist designed to be copy-pasted into any LLM agent
- Acknowledged the scalability limit: the pattern works for ~100 articles; at gigabyte scale, RAG is still better

## The LLM Wiki Gist

Published 2026-04-02. A blueprint describing:
- Three-layer architecture (raw sources → wiki → schema)
- Three operations (ingest, query, lint)
- Navigation via index.md + log.md
- Obsidian as the visualization frontend
- The wiki as a "persistent, compounding artifact"

Full source: [sources/articles/2026-04-02_karpathy_llm-wiki.md](../../sources/articles/2026-04-02_karpathy_llm-wiki.md)

## The Compiler Analogy

Karpathy frames the knowledge management pipeline as a compiler toolchain: raw sources are source code, LLM processing is the compiler, the wiki is the executable, linting is the test suite, and querying is the runtime. Cole Medin describes this as "more than a metaphor — it prescribes concrete system components and their relationships." *(Source: Cole Medin)*

## The PRD-as-Prompt Follow-Up

Karpathy published a follow-up tweet containing a PRD (product requirements document) that, when sent as a single prompt to a coding agent with no other context, builds the entire LLM knowledge base system from scratch. This establishes the **PRD-as-prompt pattern** — encoding a full architecture as an executable specification that an agent can one-shot. *(Source: Cole Medin)*

See [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md).

## Influence: Cole Medin's Internal Data Adaptation

Cole Medin adapted Karpathy's external-data wiki pattern for internal codebase memory. The key pivot: session logs from Claude Code conversations replace web clips as the raw input. Same three-layer architecture, same index-over-RAG philosophy, but applied to capturing tacit development knowledge — decisions, lessons learned, and action items that would otherwise be lost between sessions. *(Source: Cole Medin)*

## Related Pages

- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — the pattern he introduced
- [Obsidian](../tools/obsidian.md) — the tool he pairs with the wiki
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) — the bootstrap pattern from his follow-up tweet
