---
title: "Introducing Contextual Retrieval"
source_type: "article"
channel: "Anthropic Engineering"
date: "2024-09-19"
url: "https://www.anthropic.com/engineering/contextual-retrieval"
pillar: "understanding"
tags: [rag, retrieval, embeddings, bm25, contextual-retrieval, claude, prompt-caching]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Contextual Retrieval in AI Systems

**Published:** September 19, 2024

## Overview

Anthropic introduced "Contextual Retrieval," a technique designed to improve how AI systems retrieve relevant information from knowledge bases. The method addresses a fundamental limitation in traditional Retrieval-Augmented Generation (RAG) systems: the loss of context when breaking documents into smaller chunks.

## The Problem

Traditional RAG systems split documents into chunks for efficient processing, but individual chunks often lack sufficient context. For example, a financial document chunk stating "The company's revenue grew by 3% over the previous quarter" doesn't identify which company or time period it references, making retrieval and utilization difficult.

## The Solution

Contextual Retrieval uses two complementary techniques:

**Contextual Embeddings and Contextual BM25** work by prepending explanatory context to each chunk before processing. Using Claude, developers can automatically generate brief contextual summaries (50-100 tokens) that situate each chunk within its broader document context.

## Performance Results

The research demonstrated substantial improvements:

- Contextual Embeddings alone reduced retrieval failure rates by 35%
- Combined with Contextual BM25: 49% improvement
- When adding reranking: 67% improvement in retrieval accuracy

## Implementation Cost

Thanks to prompt caching, generating contextualized chunks costs approximately **$1.02 per million document tokens**—making the approach cost-effective at scale.

## Key Findings

The research identified optimal configurations: combining Gemini or Voyage embeddings with Contextual BM25, retrieving the top 20 chunks, and applying reranking techniques yields maximum performance gains.
