# Ingest Notes

**Source:** [HybridRAG: A Fusion of Graph and Vector Retrieval — Mitesh Patel, NVIDIA](https://www.youtube.com/watch?v=-tgQa8Fzf80)

## User Focus
- The authoritative primary-source companion to the existing [[hybrid-rag]] page (which was built from a lighter GenPulse explainer). Part of the RAG interview knowledge base ([[rag-job-prep]]).
- Capture, interview-usefully, an NVIDIA practitioner's account of building a production graph + hybrid RAG system:
  - What a knowledge graph is (entities + relationships) and why it beats semantic-only for relational info
  - The four components (data → data processing → graph creation / semantic vector DB creation → inferencing) and the offline/online split
  - Triplet extraction from unstructured docs via LLM + prompt engineering + a use-case **ontology**
  - Semantic vector DB build (chunk size + overlap)
  - Graph retrieval: single-hop vs multi-hop traversal; depth ↔ latency tradeoff; the "sweet spot"
  - Evaluation: faithfulness, answer relevancy, precision/recall, and LLM-judge metrics; the **Ragas** library; reward-model judging
  - Optimization (the 80/20 rule): data cleaning, output shortening, LoRA fine-tuning for triplet quality; acceleration for large graphs
  - The "graph vs semantic vs hybrid — it depends" decision (data structure + use-case relational complexity; graph systems are compute-heavy)

## Caption-garble corrections (auto-captions are rough — FIX these in the summary/wiki)
- "oncology" → **ontology** (appears many times; he means the domain ontology used to guide triplet extraction)
- "cool graph" → **cuGraph** (NVIDIA's GPU-accelerated graph library, now usable via a NetworkX backend)
- "reax" → **regex**
- "Lanimotron 340 million ... 340 billion parameter reward model" → **Nemotron-4 340B reward model** (NVIDIA); "340 million" is a misspeak/caption error — it's the 340B reward model
- "pistol library called Ragas" / "raas" / "RAS" → **Ragas** (open-source RAG evaluation library, pip-installable, uses an LLM judge, default OpenAI/GPT, bring-your-own supported)
- "FSI" = **financial services industry**
- "10TI view" → **10,000-ft view**
- Llama model versions are garbled ("llama 3.3 / 3.2 / 3.1 / 1.1") — attribute loosely as **a Llama 3.x model fine-tuned with LoRA**, do not assert a precise version.
- Named example: **Exxon Mobil** quarterly-results triplet ("Exxon Mobil —cut→ spending on oil & gas exploration"), Neo4j (booth), "attention is all you need" as the chunking example doc.

## Attribution flags
- HybridRAG originates as a BlackRock + NVIDIA collaboration (financial documents); this NVIDIA talk is a credible primary account. The earlier GenPulse video's benchmark numbers (Microsoft 48.4/40.6/43.8, Redis 66k/sec) are NOT from this talk and remain unverified. This talk gives a different metric: triplet-extraction accuracy ~71% (Llama 3.x as-is) → ~87% (with LoRA fine-tuning), on a 100-document test set — attribute as the speaker's reported result, and note the speaker's own caveat that accuracy drops as the document pool grows.
