---
title: "How we built our multi-agent research system"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-06-13"
url: "https://www.anthropic.com/engineering/multi-agent-research-system"
pillar: "understanding"
tags: [multi-agent, research, orchestrator-worker, claude, prompt-engineering, evaluation, parallelization]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# How We Built Our Multi-Agent Research System

**Published:** June 13, 2025
**Authors:** Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, and Daniel Ford

---

## Article Summary

Anthropic's engineering team detailed how they developed a multi-agent research system for Claude that uses multiple AI agents working in parallel to explore complex topics more effectively than single-agent approaches.

### Key Architecture Decisions

The system employs an orchestrator-worker pattern where a lead agent coordinates specialized subagents operating in parallel. This approach contrasts with traditional RAG systems by using "multi-step search that dynamically finds relevant information, adapts to new findings, and analyzes results to formulate high-quality answers."

### Performance Gains

Testing revealed significant improvements: "a multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2%." The researchers found that token usage explained roughly 80% of performance variance in web search tasks.

### Eight Critical Prompt Engineering Principles

1. Develop accurate mental models of agent behavior
2. Teach orchestrators effective delegation with detailed task descriptions
3. Embed scaling rules matching effort to query complexity
4. Design tools with clear purposes and descriptions
5. Enable agents to improve their own prompts through feedback
6. Begin with broad searches before narrowing focus
7. Use extended thinking as a controllable planning mechanism
8. Implement parallel tool calling to reduce research time by up to 90%

### Production Challenges

Building reliable production systems required addressing stateful agent execution, non-deterministic debugging, deployment coordination, and synchronous execution bottlenecks. The team implemented durable error handling, comprehensive observability, and rainbow deployments to maintain system stability.

### Evaluation Approach

Rather than prescribing specific agent paths, the team focused on outcome-based evaluation using LLM judges assessing factual accuracy, citation quality, completeness, and source selection. Human testing remained essential.

Human testers discovered agents "consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources," leading to improved source quality heuristics in prompts.

### Cost-Benefit Trade-offs

While multi-agent systems excel at valuable, highly parallelizable tasks involving information exceeding single context windows, they consume significant tokens: approximately 15 times more than standard chat interactions. Success requires task value sufficient to justify increased computational costs.
