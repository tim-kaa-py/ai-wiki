---
title: "Retrieval-Augmented Generation (RAG)"
type: "concept"
description: "How RAG grounds an LLM in an external knowledge base via a data-injection pipeline and a retrieval pipeline, instead of retraining."
pillar: "building"
tags: [rag, architecture, embeddings, vector-database, tutorial]
sources:
  - "summaries/2025-08-31_krish-naik_introduction-to-understanding-rag.md"
  - "summaries/2026-07-07_genpulse_graph-rag-and-hybrid-search.md"
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
timestamp: "2026-08-07"
---

# Retrieval-Augmented Generation (RAG)

**RAG** is the technique of optimizing an LLM's output by having it reference an authoritative knowledge base *outside* its training data before it generates a response — **without retraining the model**. You extend a pretrained LLM to a specific domain or an organization's private knowledge by retrieving the most relevant material at query time and injecting it into the prompt as context. It is a cost-effective way to get relevant, accurate, up-to-date answers from a frozen model.

## The Problem RAG Solves

A plain LLM app is just: *user query → prompt → LLM → output.* That baseline has two structural weaknesses.

1. **Knowledge cutoff → hallucination.** An LLM is trained on data only up to a fixed date (its *knowledge cutoff*). Asked about anything after that date — or anything it never saw — it still produces a confident, plausible-sounding answer rather than admitting ignorance. That fabricated-but-plausible output is a **hallucination**. (Tightening the source's framing: the cutoff is the most intuitive cause of hallucination, but not the only one — models can also hallucinate on topics inside their training distribution. RAG addresses the *missing-knowledge* class of hallucination specifically.)

2. **Private, frequently-changing data.** Much of the data an organization needs answered — HR policies, finance rules, internal product docs — was never public and updates continuously. It was never in the model's training set and never will be.

RAG closes both gaps by supplying the missing facts as retrieved context at the moment of the query.

## Why RAG Instead of Fine-Tuning

Fine-tuning — retraining the model's billions of parameters on your private data — is a valid tool but a poor fit for grounding a model in private, fast-moving factual data, for three reasons:

- **Cost:** adjusting billions of parameters is expensive in compute and time.
- **Tedium:** it is a heavy, involved process.
- **Frequently-changing data:** private data updates constantly; you cannot re-fine-tune every day to keep pace.

RAG sidesteps all three: update the knowledge base (re-embed only the changed documents) and the system is current immediately, with no retraining.

**The cleaner interview framing** (standard industry distinction, tightening the creator's either/or): fine-tuning changes *how the model behaves* — its style, tone, and format; RAG changes *what knowledge the model can access*. For private and fast-changing factual data, RAG usually wins; for teaching a new skill, tone, or output format, fine-tuning still has a role. The two are **complementary, not strictly either/or**.

**Independent empirical support from an unrelated domain.** The Subpop paper, cited in Ishan Anand's field guide to [synthetic personas](synthetic-personas.md), fine-tuned a model on survey responses from a set of population groups — and alignment improved on *unseen* groups by almost the same margin [12:20]. If the fine-tune had injected knowledge, the gains would have stayed with the groups it saw. That they generalised suggests the model already held the knowledge and lacked only the format: "the model itself has a latent understanding of these groups. It just didn't know how to express it in the format of surveys" [12:35].

The practical test this yields: **before assuming a knowledge gap, check whether it is an expressive gap.** If the model produces the right content in prose but the wrong content in your required schema, that is a format problem a small fine-tune (or a better output contract) can fix — and reaching for retrieval will not help. *(Source: Ishan Anand, AI Engineer 2026-07-29)*

## The Two Pipelines

RAG is built from two pipelines that share the *same* embedding model.

### Pipeline 1 — Data Injection (offline / indexing)

Builds the knowledge base ahead of time. The creator calls this "data injection"; most other sources call it the **ingestion** or **indexing** pipeline.

```
data → parse → chunk → embed → store in vector DB
```

- **Data** — any format: PDF, HTML, Excel, SQL database, or unstructured text.
- **Parse** — read the structured/unstructured source into usable text.
- **Chunk** — split the text into smaller pieces so each can be stored and retrieved independently.
- **Embed** — convert each chunk (text → vector) with an embedding model.
- **Store** — write the resulting vectors into a vector store / vector database.

### Pipeline 2 — Retrieval (online / per query)

Runs on every user query. The creator calls this "traditional RAG."

```
query → embed → similarity search → retrieve context → build prompt → LLM → output
```

- The user query is embedded with the **same** embedding model used during injection — vectors from different models are not comparable, so mismatched models make similarity search meaningless.
- A **similarity search** against the vector DB returns the most relevant chunks.
- Those chunks become the **context**.
- The context is combined with a **prompt** instructing the LLM to answer using that context.
- The LLM generates the final answer.

## Core Building Blocks

| Block | What it is |
|-------|-----------|
| **Embedding** | A numerical (vector) representation of text produced by an embedding model. Applied to every chunk at injection time and to the query at retrieval time. |
| **Vector** | The embedding itself — a point in high-dimensional space that lets you run mathematical similarity algorithms over meaning rather than exact keywords. |
| **Vector database / vector store** | A specialized store that holds vectors and supports fast similarity search over them. It is what lets a query retrieve the semantically closest chunks instead of doing exact keyword matching. (This semantic-only matching is also a blind spot: pure vector search misses *literal* exact tokens like error codes and IDs — addressed by hybrid search; see [Hybrid RAG](./hybrid-rag.md).) |
| **Similarity search / cosine similarity** | The retrieval mechanism: given the query's vector, find the stored chunk vectors that are "closest" in vector space. **Cosine similarity** — the angle between two vectors as a proximity/relevance score — is the named technique. |
| **Chunking & parsing** | *Parsing* prepares raw source text; *chunking* splits it into appropriately-sized pieces before embedding. The creator singles this out as the make-or-break step: "if you crack this step then developing a RAG application becomes very easy." |
| **Context** | The retrieved chunks passed to the LLM alongside the prompt. In "what is the leave policy of my company?", the vector store returns the relevant policy text, and that text — sent to the LLM — is the context it answers from. |

**Embedding-model choice is a cost/quality lever.** OpenAI, Google, and HuggingFace models differ in cost and quality, and open-source embedding models are available. A common approach is to prototype with a cheap open-source model and benchmark a paid model only if retrieval quality is insufficient.

## The R-A-G Decomposition

The name itself decomposes into the three steps of the retrieval pipeline:

- **Retrieval** — fetch the relevant chunks from the vector DB via similarity search.
- **Augmentation** — supply that retrieved context to the LLM together with the prompt ("you're giving a context to the LLM along with the prompt to generate the output").
- **Generation** — the LLM produces the final answer from the augmented prompt.

## RAG Reduces — But Does Not Eliminate — Hallucination

RAG grounds the LLM *only when the answer is actually in the vector DB*. If the relevant data was never ingested, or retrieval fails to surface it, the model can still hallucinate. Practical consequence: scope the knowledge base to the questions you expect, measure retrieval coverage, and treat gaps in the store as residual hallucination risk. RAG makes a model *better grounded*, not *truthful everywhere*. (This is the same probabilistic-retrieval weakness examined from the architecture-choice angle in [RAG vs Long Context](../comparisons/rag-vs-long-context.md), and mitigated by the technique in [Contextual Retrieval](contextual-retrieval.md).)

## Real-World Example: Perplexity

Perplexity is a production RAG-style system: it connects to retrievers, tools, and web search, then has an LLM summarize the retrieved results. It is a useful mental model for "RAG at scale" — multiple retrievers plus web search plus LLM summarization, not just a single vector DB behind one query.

## Related Pages

- [Hybrid RAG: Hybrid Search and Graph RAG](./hybrid-rag.md) — advanced retrieval beyond pure vector search: hybrid (dense + sparse/BM25) search fused via RRF, plus knowledge-graph triplets, fixing the exact-match blind spot and adding relational reasoning.
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the upstream architecture choice: retrieve-and-filter (RAG) vs. dumping full documents into a large context window, decided by data shape.
- [Contextual Retrieval](contextual-retrieval.md) — Anthropic's chunking technique that reduces RAG's silent-retrieval-failure rate by situating each chunk before embedding.
- [Context Engineering](context-engineering.md) — the broader discipline of curating what tokens occupy the window; RAG's "retrieve on demand" is one instance of just-in-time retrieval.
- [Agent Memory Systems](agent-memory-systems.md) — storage/injection/recall framework for runtime agent memory, where custom RAG is one storage/recall option.
