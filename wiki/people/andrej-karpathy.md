---
title: "Andrej Karpathy"
type: "person"
pillar: "ecosystem"
tags: [karpathy, wiki, knowledge-management, ai-research, tesla, openai]
sources:
  - "summaries/2026-04-02_karpathy_llm-wiki.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
last_updated: "2026-04-09"
---

# Andrej Karpathy

AI researcher. Former Director of AI at Tesla, founding member of OpenAI. Known for making complex AI concepts accessible through teaching and writing.

## Key Contributions (to this wiki's domain)

- **The LLM Wiki pattern** — introduced the idea of using LLMs to incrementally build and maintain personal knowledge bases as structured markdown wikis, replacing traditional RAG for curated knowledge domains
- Framed the key insight: "The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping."
- Shared the pattern as an open gist designed to be copy-pasted into any LLM agent

## The LLM Wiki Gist

Published 2026-04-02. A blueprint describing:
- Three-layer architecture (raw sources → wiki → schema)
- Three operations (ingest, query, lint)
- Navigation via index.md + log.md
- Obsidian as the visualization frontend
- The wiki as a "persistent, compounding artifact"

Full source: [sources/articles/2026-04-02_karpathy_llm-wiki.md](../../sources/articles/2026-04-02_karpathy_llm-wiki.md)

## Related Pages

- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — the pattern he introduced
- [Obsidian](../tools/obsidian.md) — the tool he pairs with the wiki
