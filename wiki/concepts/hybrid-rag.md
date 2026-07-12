---
title: "Hybrid RAG: Hybrid Search and Graph RAG"
type: "concept"
description: "Advanced retrieval beyond pure vector search — hybrid (dense + sparse/BM25) search fused via RRF, knowledge-graph triplets, multi-hop graph traversal, RAG evaluation, and the production-optimization reality of building hybrid RAG."
pillar: "building"
tags: [rag, hybrid-search, graph-rag, vector-database, evaluation]
sources:
  - "summaries/2026-07-07_genpulse_graph-rag-and-hybrid-search.md"
  - "summaries/2025-07-22_ai-engineer_hybridrag-fusion-graph-vector-retrieval-mitesh-patel-nvidia.md"
timestamp: "2026-07-12"
---

# Hybrid RAG: Hybrid Search and Graph RAG

This is the **advanced-retrieval** companion to foundational [RAG](./rag.md). Standard RAG chunks documents, embeds them, and retrieves by vector similarity. That works for broad semantic meaning but has structural blind spots. Hybrid RAG is an escalation built in three steps — each step motivated by the previous step's residual failure: **hybrid search** fixes exact-match misses, **knowledge graphs** add relational reasoning, and **hybrid RAG** fuses both into a safety-net architecture.

This page synthesizes two sources: a lighter conceptual explainer (GenPulse) for the *why* and the fusion mechanics, and an NVIDIA production practitioner talk (Mitesh Patel, *HybridRAG: A Fusion of Graph and Vector Retrieval*) for the *how* — ontology-guided triplet extraction, multi-hop traversal, RAG evaluation, and the optimization reality of shipping this to production.

> **On the benchmark numbers below:** the named-company relevance/throughput figures (Microsoft, BlackRock, Redis) are claims asserted by the GenPulse video without linked primary evidence — recorded here as *the video's claims, unverified*, not established results. Separately, the triplet-extraction accuracy figure (~71%→~87%) is the NVIDIA speaker's own reported result on a small test set with his own caveats; it is attributed inline where it appears. Treat all of these as citable talking points, not facts.

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

**LLM triplet extraction** is the bridge from messy prose to a traversable graph: feed an unstructured document through an LLM with specific prompts to emit clean structured triplets. This is how complex text becomes a relationship map. A worked practitioner example: from an Exxon Mobil quarterly-results document, `Exxon Mobil —cut→ spending on oil & gas exploration` (company entity, "cut" as the relationship, the spending activity as the second entity).

### Ontology-Guided Triplet Extraction

Naive "extract the triplets" prompting is not enough. The practitioner discipline is to define a **use-case-specific ontology first** — the entity types and relationship types that matter for your domain — then put that ontology in the extraction prompt and instruct the LLM to emit *ontology-conformant* triplets. This is the single highest-leverage, highest-effort step in the whole build: **a noisy or wrong ontology yields noisy triplets, which yield noisy retrieval** (garbage in → garbage out compounds downstream). Expect heavy back-and-forth iteration to get the ontology right, and validate extracted triplets against a small labeled set before scaling the corpus. In the NVIDIA practitioner's framing, roughly **80% of build effort lives here**, in getting the ontology and triplet extraction clean — not in wiring the pipelines.

### The Four Components and the Offline/Online Split

A graph/hybrid RAG decomposes into four parts: (1) **data**, (2) **data processing**, (3) **graph creation** and/or **semantic vector-DB creation**, and (4) **inferencing** (querying). Quality compounds forward: better data processing → better graph → better retrieval. At a higher level these collapse into two phases:

- **Offline** — the one-time work: data processing, triplet extraction, and building the graph and vector DB.
- **Online** — per query: traverse the built structures, retrieve triplets and chunks, and turn retrieved relationships into a user-readable answer rather than a raw relationship dump the user has to decode.

On the vector side, the well-studied knobs are **chunk size** and **overlap**. Overlap exists because a relationship or context that spans the boundary between two consecutive chunks is lost if the chunks share no text — overlap preserves that cross-chunk continuity. Notably, that cross-boundary relational context is exactly what graph retrieval handles natively, which is part of the argument for adding a graph at all.

## Hybrid RAG: Fusing Both Paths

Hybrid RAG combines vector retrieval and graph retrieval into one architecture, with two things happening in parallel:

- **Dual ingestion.** The same source text is processed two ways at once — standard vector chunking → dense embeddings, *and* LLM triplet extraction → knowledge-graph relationships. The system ends up holding both a broad semantic understanding and a structured relationship map of identical data.
- **Dual retrieval at query time.**
  1. Retrieve the most similar vector chunks.
  2. Retrieve a relationship-rich **subgraph** from the knowledge graph. Retrieval traverses one or more hops from the queried entity; **depth is a tunable knob traded against latency** — a single hop (immediate neighbors, 1° of separation) is the shallow end that bounds context size, and deeper multi-hop traversal captures more relational context at higher retrieval cost. See [Multi-Hop Retrieval and the Depth–Latency Sweet Spot](#multi-hop-retrieval-and-the-depthlatency-sweet-spot) below.[^depth]
  3. **Concatenate** both contexts (the video specifies vector-RAG context first, graph-RAG context appended right after).
  4. Feed the unified context to the LLM.

[^depth]: The lighter GenPulse source stated subgraph retrieval is "usually constrained to 1° of separation." The NVIDIA practitioner talk generalizes this: depth is a tunable parameter, and defaulting to single-hop can forfeit the graph's core multi-hop advantage. 1° is retained here as the shallow end of that spectrum, not as a fixed default.

The framing is a **safety net**: "if vector search misses the context, the graph picks it up and vice versa." Each path covers the other's blind spot.

### Multi-Hop Retrieval and the Depth–Latency Sweet Spot

Answering a relational question retrieves nodes *and the relationships between them*. A **single-hop (flat)** retrieval throws away the graph's core advantage — traversal across *multiple* connected nodes (node 1 → node 2 → node 3 …). Strategies range over single-hop, double-hop, and deeper traversals; deeper traversal yields richer relational context but costs more retrieval time, so **latency becomes a production constraint**. There is a **sweet spot** between how many hops you take and how much latency your SLA can tolerate, and finding it is itself a tuning exercise — sweep single/double/deeper hops, measure both answer quality and latency, and pick the depth your budget survives.

**Graph acceleration (cuGraph via NetworkX).** For large graphs (millions–billions of nodes), traversal latency dominates. NVIDIA's **cuGraph** — a GPU-accelerated graph library — provides that acceleration and is usable through a **NetworkX backend** (NetworkX is pip-installable), so you can go deeper / take more hops while cutting execution latency drastically. This is what makes deeper multi-hop traversal affordable at production scale.

## Evaluation

### Extractive vs. Abstractive

The dichotomy worth remembering (*per the video's BlackRock claim, unverified*, evaluating on financial transcripts):

- **Graph RAG** is stronger on **extractive** questions — clearly defined entities and relationships spelled out in the source.
- **Vector RAG** is stronger on **abstractive** questions — information not explicitly stated, requiring semantic inference.
- **Hybrid RAG** reportedly outperforms both on faithfulness and answer relevancy overall.

The practical rule: match the retrieval mode to the question type, and default to hybrid when the workload mixes both. This extractive/abstractive split is also *why* the fusion helps — each method owns a question type.

### Metrics and Tooling

Evaluate a RAG workflow along multiple axes: **faithfulness** (is the answer grounded in the retrieved context, not hallucinated?), **answer relevancy** (does it address the question?), and **precision/recall** on retrieval. When you bring an LLM in as a judge, additional qualitative metrics apply — **helpfulness, coherence, complexity, verbosity**, and similar. Two evaluation paths cover the practical ground:

- **Ragas** — an open-source, pip-installable library that evaluates a RAG workflow **end to end**, scoring the query, the retrieval, and the response together. That end-to-end view lets you *localize* failures: is retrieval at fault, or is the LLM misinterpreting the question? Under the hood it uses an LLM judge; it defaults to OpenAI/GPT but lets you wire in your own model via API.
- **Reward-model judging** — a model trained specifically to score other LLMs' responses. The practitioner points to NVIDIA's **Nemotron-4 340B reward model** (a 340-billion-parameter reward model, not 340M) to score a response across quality parameters. Use a reward model when you specifically want to grade *response quality*, versus Ragas for *pipeline mechanics*.

Both paths lean on the **LLM-as-judge** methodology — the same grader-design discipline (use a different model as judge, write specific rubrics, ask for empirical scores) covered for agents on [Agent Evaluation](./agent-evaluation.md).

## The Cold-Start / Throughput Concern

Hybrid systems maintain multiple indexes (vector + graph), which risks an ingestion bottleneck and a **cold start**: empty or sparse indexes before enough data is loaded. High-throughput vector stores mitigate this by letting developers backfill massive coverage quickly without degrading query latency. *Per the video's claim (unverified),* Redis can sustain **66,000 vector insertions/sec**.

## The Inverted 80/20: Optimization Is the Long Tail

A governing lesson from production practice: **standing up a graph/hybrid RAG is roughly 20% of the time; optimizing it to production quality is the other 80%.** Getting it to *run* is fast; getting it *good* is a sustained effort. Don't declare victory at "it works" — plan for an optimization phase and instrument evaluation so you can measure each tweak. Concrete levers, cheapest first:

1. **Regex / data cleaning** — strip apostrophes, brackets, and characters that don't matter for triplet generation, so the extractor isn't distracted by noise.
2. **Shorten the LLM's output** — constrain the extraction response to reduce cost and error surface.
3. **LoRA fine-tuning for triplet extraction** — when triplet quality is still the bottleneck after the cheap wins, fine-tune the extractor. *The NVIDIA speaker reports a Llama 3.x model going from ~71% to ~87% triplet-extraction accuracy with LoRA fine-tuning, measured on a 100-document test set — with his own caveat that the figure looks high because the corpus is small and drops as the document pool grows.* Re-measure accuracy at realistic corpus size, not on a toy set.
4. **Graph acceleration** — cuGraph via the NetworkX backend for large-graph traversal (see [Multi-Hop Retrieval](#multi-hop-retrieval-and-the-depthlatency-sweet-spot)).

Layer the cheap wins (data cleaning, output shaping) before reaching for fine-tuning.

## Graph vs. Semantic vs. Hybrid — It Depends

Whether to use graph/hybrid retrieval *at all* is a genuine "it depends," keyed on two factors weighed against cost:

- **Data structure.** Structured domains — retail catalogs, financial services (FSI), employee databases — are strong graph candidates because the entities and relationships are already well-defined. For unstructured data, the prior question is whether you can build a *good* knowledge graph from it at all (back to the ontology/triplet-quality problem above).
- **Use-case relational complexity.** Reach for a graph only when the questions genuinely require reasoning over complex entity relationships. If a plain vector RAG answers the workload, don't pay the graph's cost.
- **Compute cost.** Graph systems are compute-heavy. The relational payoff has to justify the tax.

Practical rule: if your data is well-structured *and* your questions are relational, experiment with graph/hybrid; otherwise a plain [vector RAG](./rag.md) is the cheaper right answer.

## Related Pages

- [Retrieval-Augmented Generation (RAG)](./rag.md) — the foundational technique this builds on: chunk → embed → vector-store similarity search, and the two-pipeline architecture assumed here.
- [Contextual Retrieval](./contextual-retrieval.md) — a sibling advanced-RAG technique: Anthropic's chunk-augmentation approach that reduces silent-retrieval-failure rate (and also stacks BM25 alongside embeddings).
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the upstream architecture decision; hybrid RAG lives on the RAG side of that trade-off and hardens its weakest link (probabilistic retrieval).
- [Agent Evaluation](./agent-evaluation.md) — the LLM-as-judge / grader methodology behind RAG evaluation here (Ragas and reward-model judging are RAG-specific instances of it).
