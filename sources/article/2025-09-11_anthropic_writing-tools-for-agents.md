---
title: "Writing effective tools for agents — with agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-11"
url: "https://www.anthropic.com/engineering/writing-tools-for-agents"
pillar: "building"
tags: [tool-design, agents, mcp, evaluation, claude-code, namespacing, best-practices]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Writing effective tools for agents — with agents

**Published:** Sep 11, 2025

## Article Summary

This Anthropic engineering blog post explains how to create high-quality tools for AI agents using Claude itself as a collaborative partner. The piece demonstrates that agents are only as effective as the tools available to them.

### Key Development Process

The authors recommend a three-phase approach:

1. **Prototype building** - Start with quick tool prototypes using Claude Code, leveraging LLM-friendly documentation like `llms.txt` files. Test locally through MCP servers or Desktop extensions.

2. **Comprehensive evaluation** - Generate realistic evaluation tasks that mirror actual workflows. The post notes: "Strong evaluation tasks might require multiple tool calls—potentially dozens." Run evaluations programmatically and collect metrics beyond accuracy, including runtime, token consumption, and error rates.

3. **Agent-driven optimization** - Use Claude Code to analyze evaluation transcripts and automatically improve tool implementations. Internal results showed significant performance gains from this collaborative approach.

### Five Core Principles

**Tool selection matters** - Fewer, well-designed tools outperform comprehensive tool collections. Tools should enable agents to subdivide tasks naturally rather than simply wrapping APIs.

**Clear namespacing** - Group related tools with consistent prefixes (e.g., `asana_projects_search`) to reduce agent confusion when hundreds of tools exist.

**Meaningful context** - Return only high-signal information. Replace cryptic identifiers with semantically meaningful names; this "significantly improves Claude's precision in retrieval tasks by reducing hallucinations."

**Token efficiency** - Implement pagination, filtering, and truncation with sensible defaults to keep tool responses under context limits.

**Description refinement** - Prompt-engineer tool descriptions thoroughly. Even small refinements can "yield dramatic improvements" in agent performance.

### Notable Finding

"Tools that are most ergonomic for agents also end up being surprisingly intuitive to grasp as humans," suggesting alignment between agent usability and human-friendly design principles.
