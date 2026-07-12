# Ingest Notes

**Source:** [Graph RAG and Hybrid Search](https://www.youtube.com/watch?v=Br17b3ueAXs)

## User Focus
- Continues the RAG interview knowledge base (see [[rag-job-prep]]) — this is the advanced-RAG follow-on to the fundamentals.
- Capture the advanced retrieval techniques interview-usefully:
  - Limits of pure vector search (misses exact keyword/literal matches, e.g. error codes)
  - Hybrid search: dense (vector) + sparse (BM25) retrieval run in parallel, fused with Reciprocal Rank Fusion (RRF)
  - Knowledge graph triplets (subject–predicate–object), LLM-extracted from unstructured text
  - Hybrid RAG architecture: dual ingestion (vector chunks + graph triplets), query-time retrieval of vector chunks + a 1°-of-separation subgraph, context concatenation
  - Evaluation dynamics: extractive vs abstractive questions; hybrid as a safety net

## Attribution flags (record, do not present as verified fact)
- Benchmark numbers are creator-asserted: Microsoft hybrid 48.4 vs keyword-only 40.6 vs vector-only 43.8; BlackRock financial-transcript eval (graph wins extractive, vector wins abstractive, hybrid best on faithfulness + answer relevancy); Redis 66,000 vector insertions/sec. Attribute as claims from the video.
- The closing White House executive order / cyber-defense segment is promotional/editorial padding, tangential to the RAG techniques — do not treat as core technical content.
