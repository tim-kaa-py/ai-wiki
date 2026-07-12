---
title: "Contextual Retrieval"
description: "Anthropic's RAG chunking technique that prepends an LLM-generated situating summary to each chunk before embedding or indexing"
type: "concept"
pillar: "understanding"
tags: [rag, retrieval, embeddings, bm25, contextual-retrieval, reranking, prompt-caching, claude]
sources:
  - "summaries/2024-09-19_anthropic_contextual-retrieval.md"
  - "summaries/2026-03-09_ibm-technology_is-rag-still-needed-rag-vs-long-context.md"
timestamp: "2026-07-12"
---

# Contextual Retrieval

Anthropic's chunking technique for RAG: before embedding (or BM25-indexing) a chunk, use an LLM to prepend a short (~50–100 token) summary that situates the chunk inside the whole document. Retrieval is then performed over the **contextualized chunks**, not the raw chunks.

## The Chunk-Context Problem

Standard RAG splits documents into chunks, embeds the chunks, and retrieves them independently. But many chunks lose their meaning without the surrounding document.

> "The company's revenue grew by 3% over the previous quarter."

Which company? Which quarter? Compared to what baseline? A retriever matching a query like *"Q2 2023 ACME revenue"* will miss this chunk even though the chunk contains the answer — because the chunk's embedding doesn't know the answer either.

## The Technique

For each chunk, prompt Claude with the whole document and ask for a brief situating summary. Prepend that summary to the chunk, then embed and/or BM25-index the contextualized chunks.

Do this for **both** embedding and BM25 — stacking them matters.

## Results (Failure-Rate Reductions)

Measured against standard top-20 retrieval:

- **Contextual Embeddings alone:** 35% failure-rate reduction.
- **Contextual Embeddings + Contextual BM25:** 49% reduction.
- **Contextual Embeddings + Contextual BM25 + reranking:** 67% reduction.

The three techniques compound. The final stack is the recommended production configuration.

## Optimal Configuration

- Embeddings: Gemini or Voyage (tested as strongest)
- Lexical: Contextual BM25
- Retrieve: top-20
- Rerank: apply a reranker over the top-20

## Cost

Generating context summaries for every chunk sounds expensive — and would be without caching. With **prompt caching**, the document stays cached while summaries are generated chunk-by-chunk, bringing cost to roughly **$1.02 per million document tokens**. That makes it viable for production-scale knowledge bases.

## When RAG Is the Right Choice At All

Contextual Retrieval assumes you have already decided to *use* RAG. That prior decision — RAG vs. dumping full documents into a long context window — is its own question. The short version: RAG earns its complexity when the corpus is effectively infinite (enterprise data lakes that can never fit in a window) or when precise single-fact lookup in a huge corpus matters (avoiding attention dilution). When data is bounded and the task needs whole-document reasoning, long context can be the simpler, better choice. Contextual Retrieval is the technique that makes RAG's central weakness — probabilistic retrieval that can *silently fail* — much less likely, so it strengthens the RAG side of that trade-off. See [RAG vs Long Context](../comparisons/rag-vs-long-context.md) for the full decision framework. [Source: IBM Technology, 2026-03-09]

## Related

- [Retrieval-Augmented Generation (RAG)](./rag.md) — the foundational technique this improves: standard chunk → embed → vector-store retrieval, whose silent-failure weakness Contextual Retrieval targets.
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the upstream decision (retrieve vs. dump everything in) that determines whether you reach for this technique in the first place.
- [LLM Wiki Pattern](./llm-wiki-pattern.md) — interesting tension: Karpathy's wiki pattern **abandons RAG** for personal knowledge bases (~100 sources) because the LLM can maintain an index directly. Contextual Retrieval goes the other direction — it **improves RAG** for production knowledge bases where the corpus exceeds what fits in context. The two approaches partition by scale: wiki pattern at personal scale, contextual retrieval at production scale.
