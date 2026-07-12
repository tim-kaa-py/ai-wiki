---
title: "HybridRAG: A Fusion of Graph and Vector Retrieval — Mitesh Patel, NVIDIA"
type: "summary"
description: "An NVIDIA practitioner's guide to building production graph + hybrid RAG — triplet extraction via ontology-guided prompting, multi-hop retrieval, Ragas/reward-model evaluation, and the 80/20 optimization reality."
channel: "AI Engineer"
date: "2025-07-22"
resource: "https://www.youtube.com/watch?v=-tgQa8Fzf80"
pillar: "building"
tags: [rag, hybrid-search, graph-rag, evaluation, fine-tuning]
timestamp: "2026-07-12"
source_file: "sources/youtube/2025-07-22_ai-engineer_hybridrag-fusion-graph-vector-retrieval-mitesh-patel-nvidia.md"
---

# HybridRAG: A Fusion of Graph and Vector Retrieval — Mitesh Patel, NVIDIA — Summary

**Source:** AI Engineer (Mitesh Patel, NVIDIA) | 2025-07-22 | [Link](https://www.youtube.com/watch?v=-tgQa8Fzf80) | 20:24

## TL;DR
HybridRAG runs two retrieval pipelines side by side — a knowledge-graph pipeline that captures entity-to-entity relationships and a semantic vector pipeline that captures broad meaning — and fuses their results, because relational information is largely invisible to vector search alone. Mitesh Patel, who leads NVIDIA's developer-advocate team, frames the real work not as wiring the pipelines but as building a *clean* knowledge graph: ontology-guided triplet extraction with an LLM is where roughly 80% of the effort goes. His governing lesson is an inverted 80/20 — standing up a graph RAG is 20% of the time; the optimization tail (data cleaning, output shaping, LoRA fine-tuning for triplet quality, hop-depth tuning) is the other 80%.

## Video Structure
1. [00:14–01:26] Intro — speaker leads NVIDIA's developer-advocate team; talk is a 10,000-ft view of building a graph + hybrid RAG system (notebooks on GitHub).
2. [01:26–03:23] What a knowledge graph is and why it beats semantic-only RAG for relational information.
3. [03:23–05:18] The four components (data, data processing, graph creation / semantic vector DB creation, inferencing) and the offline/online split.
4. [05:18–07:46] Creating the knowledge graph — triplet extraction from unstructured docs via ontology-guided prompting; the 80%-of-time step.
5. [07:46–09:01] Building the semantic vector DB — chunk size and overlap.
6. [09:01–11:02] Retrieval — single-hop vs multi-hop traversal, the depth↔latency sweet spot, cuGraph acceleration.
7. [11:02–13:42] Evaluation — faithfulness/relevancy/precision/recall, LLM-judge metrics, Ragas, and the Nemotron-4 340B reward model.
8. [13:42–18:07] The inverted 80/20 optimization tail — regex/data cleaning, output shortening, LoRA fine-tuning (71%→87% triplet accuracy), graph acceleration for large graphs.
9. [18:07–20:24] "Graph vs semantic vs hybrid — it depends"; decision factors; close (GitHub, Neo4j booth).

## Key Concepts

### Knowledge graph (entities + relationships)
A network that represents relationships between entities — people, places, concepts, events. The distinguishing value is the *edge*: the relationship between two entities. Semantic vector search captures what a chunk *means* but not how entities *relate*; a knowledge graph makes those connections first-class and traversable, which is what lets it answer relational, multi-hop questions that vector-only retrieval misses.

### Triplet (entity–relationship–entity)
The atomic unit of the graph: `entity 1 —relationship→ entity 2`. Patel's worked example from an Exxon Mobil quarterly-results document is `Exxon Mobil —cut→ spending on oil & gas exploration` (company entity, "cut" as the relationship, the spending activity as the second entity). Building good triplets out of unstructured documents is the core difficulty of the whole system.

### The four components + offline/online split
A graph/hybrid RAG breaks into four parts: (1) **data**, (2) **data processing**, (3) **graph creation** *and/or* **semantic vector DB creation**, (4) **inferencing** (querying). Better data processing → better knowledge graph → better retrieval — quality compounds downstream. At a higher level these collapse into two phases: **offline** (all the one-time data processing and graph/vector-DB construction) and **online** (querying the built structures and turning retrieved triplets into a user-readable response, not raw relationship dumps the user must decode).

### Ontology-guided triplet extraction
Extracting triplets is done with an LLM via prompt engineering — but not naive prompting. You first define a **use-case-specific ontology** (the entity/relationship types that matter for your domain), put that ontology in the prompt, and instruct the LLM to extract ontology-conformant triplets from the documents. This is the highest-leverage, highest-effort step: a noisy or wrong ontology produces noisy triplets, which produce noisy retrieval. Expect heavy back-and-forth iteration to get the ontology right. (Note: the auto-captions repeatedly say "oncology"; the speaker means *ontology*.)

### Semantic vector DB build (chunk size + overlap)
The well-studied half of the pipeline: pick documents, split into chunks, embed each chunk, store in a vector DB (his slide uses the "Attention Is All You Need" paper as the example doc). Two knobs matter — **chunk size** and **overlap**. Overlap exists because a relationship or context that spans the boundary between two consecutive chunks is lost if the chunks don't share text; overlap preserves that cross-chunk continuity. This is exactly the relational context that graph retrieval handles better, which is the argument for adding a graph at all.

### Multi-hop graph retrieval (depth ↔ latency)
Answering a question retrieves nodes and the relationships between them. A **single-hop (flat)** retrieval throws away the graph's core advantage — traversal across *multiple* connected nodes. Strategies range over single-hop, double-hop, and deeper traversals (node 1 → node 2 → node 3 …). Deeper traversal yields richer context but costs more retrieval time, so **latency** becomes a production constraint. There is a **sweet spot** between how many hops you take and how much latency you can tolerate; finding it is itself a tuning exercise.

### Graph acceleration (cuGraph via NetworkX backend)
For large graphs (millions–billions of nodes), traversal latency dominates. NVIDIA's **cuGraph** (GPU-accelerated graph library) provides the acceleration and is usable through a **NetworkX** backend (NetworkX is pip-installable), so you can go deeper / more hops while cutting execution latency drastically. (Captions say "cool graph" — it's cuGraph.)

### RAG evaluation metrics
Evaluate along multiple axes: **faithfulness**, **answer relevancy**, and **precision/recall**. When you bring an LLM in as a judge, additional qualitative metrics apply — **helpfulness, coherence, complexity, verbosity** (and similar). Two evaluation paths follow: an end-to-end library (Ragas) and a dedicated reward model.

### Ragas
An open-source, pip-installable library for evaluating a RAG workflow **end to end** — it scores the query, the retrieval, and the response, so you can localize whether retrieval is at fault or the LLM is misinterpreting the question. Under the hood it uses an LLM judge; it defaults to OpenAI/GPT but lets you wire in your own model via API. (Captions garble it as "pistol library"/"raas" — it's Ragas.)

### Reward-model evaluation (Nemotron-4 340B)
The second evaluation path uses a model trained specifically to judge other LLMs' responses. Patel points to NVIDIA's **Nemotron-4 340B reward model** — a 340-billion-parameter reward model that scores another LLM's response across a set of quality parameters. (Captions say "Lanimotron 340 million"; it is the Nemotron-4 340B reward model, not a 340M model.)

## Key Takeaways

1. **Knowledge-graph quality gates everything downstream — garbage in, garbage out.** Better data processing → better graph → better retrieval; a noisy ontology or noisy triplets guarantee noisy answers no matter how good the rest of the stack is.
   **How to apply:** Treat the ontology and triplet-extraction prompt as the primary artifact to iterate on, not an afterthought. Validate extracted triplets against a small labeled set before scaling the corpus.

2. **~80% of build effort goes into getting the ontology and triplets right.** Patel's explicit "my take": you'll spend 80% of your time here, iterating the ontology back and forth.
   **How to apply:** Budget the schedule accordingly — define a domain ontology first, embed it in the extraction prompt, and expect multiple iteration rounds before the triplets are clean.

3. **The inverted 80/20: building the graph RAG is 20% of the time; optimization is 80%.** Standing the system up is fast; making it production-good is the long tail.
   **How to apply:** Don't declare victory at "it runs." Plan for a sustained optimization phase and instrument evaluation so you can measure each tweak.

4. **Concrete optimization levers move the needle.** (a) **Regex / data cleaning** — strip apostrophes, brackets, and characters that don't matter for triplet generation. (b) **Shorten the LLM's output.** (c) **LoRA fine-tune an LLM for triplet extraction.** Patel reports a Llama 3.x model going from **~71% triplet-extraction accuracy as-is to ~87% with LoRA fine-tuning**, measured on a **100-document test set** — with his own caveat that the number looks high because the corpus is small and **drops as the document pool grows**.
   **How to apply:** Layer cheap wins first (data cleaning, output shaping), then fine-tune if triplet quality is still the bottleneck. Re-measure accuracy at realistic corpus size, not on a toy set.

5. **Tune hop-depth against latency in production.** Deeper traversal = richer context but higher latency; large graphs make this acute.
   **How to apply:** Sweep single/double/deeper hops, measure both answer quality and latency, and pick the sweet spot your SLA can survive. Accelerate large-graph search with cuGraph via the NetworkX backend.

6. **Use Ragas for end-to-end evaluation and a reward model for response judging.** Ragas localizes failures across query/retrieval/response; the Nemotron-4 340B reward model judges response quality directly.
   **How to apply:** Add Ragas (`pip install`, swap in your own judge LLM if needed) to your CI/eval loop; use a reward model when you specifically want to score response quality rather than pipeline mechanics.

7. **"Graph vs semantic vs hybrid" is a genuine "it depends," keyed on two factors.** (a) **Data structure** — structured domains like retail, financial services (FSI), and employee databases are strong graph candidates; and even for unstructured data, ask whether you can build a *good* knowledge graph from it. (b) **Use-case relational complexity** — only reach for a graph when the questions genuinely require understanding complex entity relationships, because **graph systems are compute-heavy**.
   **How to apply:** If your data is well-structured and your questions are relational, experiment with graph/hybrid; if a plain vector RAG answers the questions, don't pay the graph's compute tax.

## Argument Structures

**Why hybrid, and why the hard part is the graph:**
- *Premise:* Relational information — how entities connect — is largely invisible to semantic-only vector search, which captures meaning within a chunk but not relationships across entities.
- *Therefore:* A knowledge graph exposes those relationships as traversable edges, and multi-hop traversal surfaces relational context that vector retrieval misses.
- *But:* A graph is only as good as its triplets, and extracting good triplets from unstructured documents requires ontology-guided LLM extraction plus heavy iteration (garbage in → garbage out).
- *Therefore:* The production-grade answer is **hybrid** — vector retrieval for broad semantic coverage, graph retrieval for relationships — coupled with disciplined evaluation (Ragas end-to-end, reward-model response judging) and a long optimization tail (data cleaning, output shaping, LoRA fine-tuning, hop/latency tuning).
- *And the meta-decision:* Whether to use graph/hybrid *at all* depends on (1) data structure and (2) use-case relational complexity weighed against compute cost — a structured, relational problem justifies the graph; a simple semantic problem does not.

## Notable Commands / Code Snippets

Tools named in the talk (as tools, not runnable code here):
- **Ragas** — pip-installable, end-to-end RAG evaluation; LLM-judge under the hood; defaults to OpenAI/GPT, bring-your-own model supported.
- **NetworkX + cuGraph backend** — NetworkX is pip-installable; cuGraph provides GPU acceleration for large-graph traversal through the NetworkX backend.
- **Nemotron-4 340B reward model** (NVIDIA) — reward model used as an LLM judge for scoring responses.
- **Neo4j** — graph database, referenced (speaker was at the Neo4j booth).
- **LoRA fine-tuning** — used to improve triplet-extraction quality of a Llama 3.x model.

Triplet example: `Exxon Mobil —cut→ spending on oil & gas exploration` (extracted by an LLM from a quarterly-results document).

## User Notes
Authoritative practitioner companion to the existing `wiki/concepts/hybrid-rag.md` page (which was built from a lighter GenPulse explainer). Part of the AI-engineering interview-prep knowledge base. Strongest on the RAG-evaluation angle — Ragas end-to-end scoring and reward-model response judging — which the lighter explainer did not cover. Note on attribution: HybridRAG originates as a BlackRock + NVIDIA collaboration on financial documents; the 71%→87% triplet-accuracy figures here are the speaker's own reported result on a 100-doc test set (with his caveat that accuracy falls as the corpus grows), and are distinct from the earlier GenPulse benchmark numbers, which are not from this talk.

## Related Topics
rag, hybrid-search, graph-rag, knowledge-graph, triplet-extraction, ontology, multi-hop-retrieval, evaluation, ragas, reward-model, fine-tuning, lora, cugraph, chunking, production-rag
