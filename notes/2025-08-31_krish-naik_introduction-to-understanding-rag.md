# Ingest Notes

**Source:** [Introduction To Understanding RAG (Retrieval-Augmented Generation)](https://www.youtube.com/watch?v=fZM3oX4xEyg)

## User Focus
- Building a RAG knowledge base for job-interview prep — RAG is heavily in demand in the roles being applied for; this video is the kick-start for RAG fundamentals.
- Capture the full RAG basics thoroughly and in an interview-useful way:
  - What RAG is (definition) and why it exists
  - Disadvantages of LLM-only: hallucination (knowledge cutoff) and the cost/tedium of fine-tuning for private/changing data
  - Why RAG over fine-tuning (cheaper, no retrain, handles frequently-updated data)
  - The two pipelines: data injection (parse → chunk → embed → vector store) and retrieval (query → embed → similarity search → context → prompt → generate)
  - The R-A-G decomposition: Retrieval, Augmentation, Generation
  - Supporting concepts: embeddings, vectors, vector DB, similarity/cosine search, chunking, context
- Desired outcome: a dedicated wiki page specifically on RAG (the fundamentals). Review afterward if CONNECT lands differently.
