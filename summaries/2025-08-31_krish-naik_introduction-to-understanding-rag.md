---
title: "Introduction To Understanding RAG (Retrieval-Augmented Generation)"
type: "summary"
description: "A foundational walkthrough of RAG — what it is, why it beats fine-tuning for private/changing data, and its two pipelines (data injection and retrieval)."
channel: "Krish Naik"
date: "2025-08-31"
resource: "https://www.youtube.com/watch?v=fZM3oX4xEyg"
pillar: "building"
tags: [rag, architecture, embeddings, vector-database, tutorial]
timestamp: "2026-07-12"
source_file: "sources/youtube/2025-08-31_krish-naik_introduction-to-understanding-rag.md"
---

# Introduction To Understanding RAG (Retrieval-Augmented Generation) — Summary

**Source:** Krish Naik | 2025-08-31 | [Link](https://www.youtube.com/watch?v=fZM3oX4xEyg) | 20:40

## TL;DR
RAG (Retrieval-Augmented Generation) optimizes an LLM's output by having it reference an external, authoritative knowledge base at query time — without retraining the model. Instead of baking private or fast-changing data into model weights (fine-tuning), you store that data as vectors in a vector database and retrieve the most relevant chunks to inject as context alongside the user's prompt. The result reduces hallucination and knowledge-cutoff gaps at a fraction of fine-tuning's cost.

## Video Structure
1. [00:00–01:23] Intro & why RAG matters — Series kickoff; ~60–70% of enterprise AI projects are RAG, so companies want engineers who can build RAG apps.
2. [01:23–02:47] RAG definition — Process of optimizing LLM output by referencing an authoritative knowledge base outside the training data, without retraining; cost-effective.
3. [02:47–04:04] Baseline generative-AI app — User query → prompt → LLM → output; the plain LLM-only setup.
4. [04:04–05:51] Disadvantage 1: Hallucination — Knowledge cutoff means the model invents plausible answers for events after its training date.
5. [05:51–08:16] Disadvantage 2: Private/changing data & why not fine-tuning — Startup HR/finance policies aren't public; fine-tuning is expensive, tedious, and can't keep pace with data that updates constantly.
6. [08:16–13:00] Pipeline 1 — Data Injection — data → parse → chunk → embed → vector store; embedding-model options and cost.
7. [13:00–15:07] Pipeline 2 — Retrieval — query → embed → similarity search → context → prompt → LLM → output ("traditional RAG").
8. [15:07–17:00] RAG reduces (not removes) hallucination; Perplexity as a real-world RAG example.
9. [17:00–20:40] Recap, R-A-G decomposition, and preview of coding tutorials (chunking strategies, semantic chunking, context engineering).

## Key Concepts

### RAG (Retrieval-Augmented Generation)
The process of optimizing an LLM's output by having it reference an authoritative knowledge base *outside* its training data before generating a response. It extends a pretrained LLM to a specific domain or an organization's internal knowledge **without retraining the model**, making it a cost-effective way to get relevant, accurate, up-to-date answers. Standard-definition note: the creator frames RAG mainly as a hallucination/knowledge-cutoff fix; the broader industry framing is the same mechanism (retrieve relevant external context, then generate) applied to any grounding need — attribution, freshness, private data, or reducing cost versus large context windows.

### Hallucination & knowledge cutoff
An LLM is trained on data only up to a fixed date (its **knowledge cutoff**). Asked about anything after that date — or anything it simply never saw — it will still produce a confident-sounding answer rather than admit ignorance ("it does not want to look like a fool," in the creator's words). That fabricated-but-plausible output is a **hallucination**. RAG addresses this by supplying the missing facts as retrieved context at query time. Cleaner framing: hallucination isn't only a cutoff problem — models can hallucinate on in-distribution topics too; the cutoff is just the most intuitive example.

### Why not fine-tuning (the RAG-vs-fine-tuning tradeoff)
Fine-tuning — retraining the model's billions of parameters on your private data — is presented as a valid but poor fit here for three reasons:
- **Cost:** tweaking billions of parameters is expensive (compute + time).
- **Tedium:** it's a heavy, involved process.
- **Frequently-changing data:** private data (HR/finance policies, product docs) updates continuously; you can't re-fine-tune every day to keep up.
RAG sidesteps all three: update the knowledge base (re-embed the changed documents) and the system is current immediately, no retraining. Interview framing: fine-tuning changes *how the model behaves/what style it has*; RAG changes *what knowledge it can access*. For private + fast-changing factual data, RAG usually wins; for teaching new skills, tone, or format, fine-tuning still has a role. The two are complementary, not strictly either/or.

### Pipeline 1 — Data Injection (indexing)
The offline pipeline that builds the knowledge base. Steps: **data → parse → chunk → embed → store in vector DB.**
- **Data** can be any format: PDF, HTML, Excel, SQL database, or unstructured text.
- **Parse** the structured/unstructured content into usable text.
- **Chunk** it into smaller pieces so each can be stored and retrieved independently.
- **Embed** each chunk (text → vector) using an embedding model.
- **Store** the resulting vectors in a vector store / vector DB.
(Also called an "ingestion" or "indexing" pipeline in most other sources — the creator's term is "data injection.")

### Pipeline 2 — Retrieval
The online pipeline that runs per query. Steps: **query → embed → similarity search → retrieve context → build prompt → LLM → output.**
- The user query is embedded with the **same** embedding model used during injection.
- A **similarity search** against the vector DB returns the most relevant chunks.
- Those chunks become the **context**.
- The context is combined with a **prompt** instructing the LLM to answer using that context.
- The LLM generates the final answer. The creator calls this "traditional RAG."

### Embeddings & vectors
An **embedding** is a numerical (vector) representation of text produced by an embedding model. Converting text to vectors lets you run mathematical similarity algorithms (e.g., cosine similarity) to find semantically related content. Embeddings apply to every chunk during injection and to the query during retrieval.

### Vector database / vector store
A specialized store that holds embeddings (vectors) and supports fast similarity search over them. It's what lets a query retrieve the semantically closest chunks rather than doing exact keyword matching. The creator uses "vector DB" and "vector store" interchangeably.

### Similarity search & cosine similarity
The retrieval mechanism: given the query's vector, find the stored chunk vectors that are "closest" in vector space. **Cosine similarity** is the named technique — it measures the angle between two vectors as a proximity/relevance score. This is how "similar kind of results based on a specific query" get pulled from the DB.

### Chunking & data parsing
**Data parsing** = reading the raw structured/unstructured source and preparing it; **chunking** = splitting it into appropriately-sized pieces before embedding. The creator singles this out as the make-or-break step: "if you crack this step then developing a RAG application becomes very easy." Later videos are promised on chunking strategies, semantic chunking, and context engineering/optimization.

### Context
The retrieved information (the relevant chunks) that is passed to the LLM alongside the prompt. In the example "what is the leave policy of my company?", the vector store returns the related policy text, and that text — sent to the LLM — is the context the model uses to answer.

### The R-A-G decomposition
- **Retrieval** — fetch relevant chunks from the vector DB via similarity search.
- **Augmentation** — supply that retrieved context to the LLM together with the prompt ("augmentation basically means... you're giving a context to the LLM along with the prompt to generate the output").
- **Generation** — the LLM produces the final answer using the augmented prompt.

## Key Takeaways
1. **RAG reduces, but does not eliminate, hallucination.** If the answer is in the vector DB, retrieval grounds the LLM; if the data isn't there, the model can still hallucinate.
   **How to apply:** Scope your knowledge base to the questions you expect, and treat gaps in it as residual hallucination risk — measure retrieval coverage, don't assume RAG makes the model truthful everywhere.
2. **Prefer RAG over fine-tuning for private + frequently-updated data.** No retraining, far cheaper, and updates propagate immediately.
   **How to apply:** For a policy/docs chatbot, build a data-injection pipeline over the documents rather than fine-tuning; re-embed only the changed files when data updates.
3. **Data parsing and chunking are the make-or-break step.** Get chunking right and the rest of the RAG app becomes easy.
   **How to apply:** Invest early in parsing per file type (PDF/HTML/Excel/SQL) and in a chunking strategy (fixed-size vs. semantic chunking); don't dump whole documents into one vector.
4. **Embedding-model choice is a cost/quality lever.** OpenAI, Google, and HuggingFace models each carry different cost and quality; open-source embedding models are also available.
   **How to apply:** Start with an open-source embedding model to prototype cheaply; benchmark a paid model (OpenAI/Google) if retrieval quality is insufficient.
5. **Use the same embedding model for injection and query.** The query must be embedded with the same model that embedded the stored chunks, or similarity search is meaningless (vectors from different models aren't comparable).
   **How to apply:** Pin the embedding model as a single config value shared by both pipelines; re-embed the whole store if you ever switch models.
6. **Perplexity is a real-world RAG example.** It connects to retrievers, tools, and web search, then has an LLM summarize the retrieved results — a production RAG-style system.
   **How to apply:** Use Perplexity as a mental model in interviews for "RAG at scale" — multiple retrievers + web search + LLM summarization, not just a single vector DB.

## Notable Commands / Code Snippets
None — this is a conceptual introduction. Code (Jupyter notebooks and modular implementations of the data-injection and retrieval pipelines) is promised in follow-up videos.

## User Notes
Building a RAG knowledge base for job-interview prep — RAG is heavily in demand for the roles being applied for, and this video is the kickstart for RAG fundamentals. Desired outcome: a dedicated, foundational RAG wiki page (definition, the two pipelines, the RAG-vs-fine-tuning tradeoff, and the supporting concepts) usable as an interview reference.

## Related Topics
rag, architecture, embeddings, vector-database, tutorial, fine-tuning, similarity-search, chunking, context-engineering
