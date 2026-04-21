---
title: "Introducing Contextual Retrieval"
source_type: "article"
channel: "Anthropic Engineering"
date: "2024-09-19"
url: "https://www.anthropic.com/engineering/contextual-retrieval"
pillar: "understanding"
tags: [rag, retrieval, embeddings, bm25, contextual-retrieval, claude, prompt-caching]
ingested: "2026-04-20"
source_file: "sources/articles/2024-09-19_anthropic_contextual-retrieval.md"
---

# Contextual Retrieval — Summary

**Source:** Anthropic Engineering | 2024-09-19 | [Link](https://www.anthropic.com/engineering/contextual-retrieval)

## TL;DR
Prepend a 50-100 token context summary to each chunk before embedding/BM25. Reduces retrieval failures by 35% (embeddings alone), 49% (with BM25), 67% (with reranking). ~$1.02 per million tokens with prompt caching.

## Key Concepts

### The chunk-context problem
"Revenue grew 3% over the previous quarter" — which company? what quarter? Chunks lose document-level context.

### Solution: contextualize before chunking
Use Claude to generate brief situating summaries per chunk, then embed/BM25 the contextualized chunks.

## Key Takeaways
1. **Prepend chunk-context summaries before retrieval** — the single biggest RAG quality lever in this paper.
   - **How to apply:** for any production RAG, bake context-summary generation into the chunking pipeline.
2. **Stack the techniques:** Contextual Embeddings + Contextual BM25 + reranking → 67% failure reduction.
3. **Optimal config:** Gemini/Voyage embeddings + Contextual BM25 + top-20 + rerank.
4. **Prompt caching makes it cheap** ($1.02 per M tokens).

## Related Topics
rag, contextual-retrieval, embeddings, bm25, reranking, prompt-caching
