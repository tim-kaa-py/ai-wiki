---
title: "Introducing advanced tool use on the Claude Developer Platform"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-24"
url: "https://www.anthropic.com/engineering/advanced-tool-use"
pillar: "ecosystem"
tags: [tool-use, claude-api, tool-search, programmatic-tool-calling, agents, context-management]
ingested: "2026-04-20"
source_file: "sources/articles/2025-11-24_anthropic_advanced-tool-use.md"
---

# Advanced Tool Use (Claude Developer Platform) — Summary

**Source:** Anthropic Engineering | 2025-11-24 | [Link](https://www.anthropic.com/engineering/advanced-tool-use)

## TL;DR
Three beta features: **Tool Search** (lazy-load tool definitions), **Programmatic Tool Calling** (Claude writes Python that calls tools, intermediate results stay out of context, -37% tokens), **Tool Use Examples** (sample calls in definitions, accuracy 72→90% on complex params).

## Key Takeaways
1. **Tool Search Tool** — mark tools `defer_loading: true`, Claude searches when needed. Opus 4: 49→74%, Opus 4.5: 79.5→88.1% on libraries with definitions >10K tokens.
   - **How to apply:** if you have many tools (or many MCP servers), enable defer_loading rather than dumping all schemas into the system prompt.
2. **Programmatic Tool Calling** — Claude writes orchestration code (loops, conditionals, transforms). Intermediate results processed in sandbox, never enter context. -37% tokens (43.5k → 27.3k avg).
3. **Tool Use Examples** — JSON Schema can't express usage patterns; concrete examples can. +18pp accuracy on complex parameter handling.

## Notable Commands / Snippets
```
anthropic-beta: advanced-tool-use-2025-11-20
```

## Related Topics
tool-use, programmatic-tool-calling, lazy-tool-loading, claude-api, mcp
