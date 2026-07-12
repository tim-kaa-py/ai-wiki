---
title: "Hybrid RAG: Hybrid Search and Graph RAG"
type: "concept"
description: "Advanced retrieval beyond pure vector search — hybrid (dense + sparse/BM25) search fused via RRF, knowledge-graph triplets, and hybrid RAG that fuses both as a retrieval safety net."
pillar: "building"
tags: [rag, hybrid-search, graph-rag, vector-database, evaluation]
sources:
  - "summaries/2026-07-07_genpulse_graph-rag-and-hybrid-search.md"
timestamp: "2026-07-12"
---

# Hybrid RAG: Hybrid Search and Graph RAG

This is the **advanced-retrieval** companion to foundational [RAG](./rag.md). Standard RAG chunks documents, embeds them, and retrieves by vector similarity. That works for broad semantic meaning but has structural blind spots. Hybrid RAG is an escalation built in three steps — each step motivated by the previous step's residual failure: **hybrid search** fixes exact-match misses, **knowledge graphs** add relational reasoning, and **hybrid RAG** fuses both into a safety-net architecture.

> **On the benchmark numbers below:** every named-company figure (Microsoft, BlackRock, Redis) is a claim asserted by the source video without linked primary evidence. They are recorded here as *the video's claims, unverified*, not as established results. Treat them as citable talking points, not facts.

## The Limit of Pure Vector Search

Vector search operates in embedding space, so it captures *conceptual* similarity at scale — but it has a glaring blind spot: it finds semantically related content and **misses literal exact matches**. Out-of-distribution literal tokens — error codes, SKUs, IDs, proper names, version numbers — have no reliable semantic neighborhood.

The canonical example: a query for `error code 0x80070005` surfaces generic Windows-permissions articles but *not* the one document containing that exact hex string. This is a specific instance of the same silent-retrieval-failure weakness examined from the architecture angle in [RAG vs Long Context](../comparisons/rag-vs-long-context.md).

## Hybrid Search: Dense + Sparse in Parallel

The fix is to run two retrieval paths simultaneously:

- **Dense retrieval** — standard vector search. Good at broad semantic meaning and complex intent. Recognizes that "horizontal scaling" and "scaling web applications" are the same concept.
- **Sparse retrieval** — lexical algorithms like **BM25** for exact keyword matching. Catches the specific error code that dense retrieval misses.

Each path fails where the other succeeds. Hybrid search is the "why not both?" answer: take each path's top candidates and merge them into a single ranked list with a fusion algorithm.

*Per the video's claim (unverified):* Microsoft benchmark testing on production customer indexes reported hybrid at **48.4** average relevance vs. vector-only **43.8** vs. keyword-only **40.6**.

### Reciprocal Rank Fusion (RRF)

RRF is the industry-standard fusion method, and the key mechanic is that it **merges on rank position, not raw score**. This matters because BM25 produces *unbounded* relevance scores while vector similarity lives in a neat *0–1* range — you cannot naively add or compare them. By reducing each result to its rank within its own list and combining the reciprocals of those ranks, RRF sidesteps the score-scale mismatch entirely.

Concretely, a document's RRF score is the sum over each ranked list of `1 / (k + rank)`, with a small constant `k`. (The video describes exactly this rank-based reconciliation without stating the formula.)

## Knowledge Graphs and Triplets

Hybrid search recovers exact matches but still cannot reason across *explicit relationships*. A knowledge graph stores data as an interconnected web of relationships rather than isolated text chunks. Its fundamental unit is the **triplet**: **subject–predicate–object** (the video's analogy: "basic grammar"). Example: `Company X —acquired→ Company Y`.

This lets the system *traverse literal relationships* instead of guessing at semantic similarity in a vacuum. The payoff is on jargon-heavy, relationship-dense documents — financial earnings reports, contracts, org data — where answering requires following a trail of logic (multi-hop reasoning).

**LLM triplet extraction** is the bridge from messy prose to a traversable graph: feed an unstructured document through an LLM with specific prompts to emit clean structured triplets. This is how complex text becomes a relationship map.

## Hybrid RAG: Fusing Both Paths

Hybrid RAG combines vector retrieval and graph retrieval into one architecture, with two things happening in parallel:

- **Dual ingestion.** The same source text is processed two ways at once — standard vector chunking → dense embeddings, *and* LLM triplet extraction → knowledge-graph relationships. The system ends up holding both a broad semantic understanding and a structured relationship map of identical data.
- **Dual retrieval at query time.**
  1. Retrieve the most similar vector chunks.
  2. Retrieve a relationship-rich **subgraph** from the knowledge graph — usually constrained to **1° of separation** from the queried entity (its immediate neighbors), which bounds context size and keeps relationships directly relevant.
  3. **Concatenate** both contexts (the video specifies vector-RAG context first, graph-RAG context appended right after).
  4. Feed the unified context to the LLM.

The framing is a **safety net**: "if vector search misses the context, the graph picks it up and vice versa." Each path covers the other's blind spot.

## Evaluation: Extractive vs. Abstractive

The dichotomy worth remembering (*per the video's BlackRock claim, unverified*, evaluating on financial transcripts):

- **Graph RAG** is stronger on **extractive** questions — clearly defined entities and relationships spelled out in the source.
- **Vector RAG** is stronger on **abstractive** questions — information not explicitly stated, requiring semantic inference.
- **Hybrid RAG** reportedly outperforms both on faithfulness and answer relevancy overall.

The practical rule: match the retrieval mode to the question type, and default to hybrid when the workload mixes both. This extractive/abstractive split is also *why* the fusion helps — each method owns a question type.

## The Cold-Start / Throughput Concern

Hybrid systems maintain multiple indexes (vector + graph), which risks an ingestion bottleneck and a **cold start**: empty or sparse indexes before enough data is loaded. High-throughput vector stores mitigate this by letting developers backfill massive coverage quickly without degrading query latency. *Per the video's claim (unverified),* Redis can sustain **66,000 vector insertions/sec**.

## Related Pages

- [Retrieval-Augmented Generation (RAG)](./rag.md) — the foundational technique this builds on: chunk → embed → vector-store similarity search, and the two-pipeline architecture assumed here.
- [Contextual Retrieval](./contextual-retrieval.md) — a sibling advanced-RAG technique: Anthropic's chunk-augmentation approach that reduces silent-retrieval-failure rate (and also stacks BM25 alongside embeddings).
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the upstream architecture decision; hybrid RAG lives on the RAG side of that trade-off and hardens its weakest link (probabilistic retrieval).
