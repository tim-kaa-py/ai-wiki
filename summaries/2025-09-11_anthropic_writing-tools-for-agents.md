---
title: "Writing effective tools for agents — with agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-11"
url: "https://www.anthropic.com/engineering/writing-tools-for-agents"
pillar: "building"
tags: [tool-design, agents, mcp, evaluation, claude-code, namespacing, best-practices]
ingested: "2026-04-20"
source_file: "sources/article/2025-09-11_anthropic_writing-tools-for-agents.md"
---

# Writing Effective Tools for Agents — Summary

**Source:** Anthropic Engineering | 2025-09-11 | [Link](https://www.anthropic.com/engineering/writing-tools-for-agents)

## TL;DR
Use Claude Code itself as the partner for building, evaluating, and refining tool implementations. Five principles: fewer-but-better tools, clear namespacing, semantic responses (not opaque IDs), token-efficient pagination, prompt-engineered descriptions.

## Key Concepts

### Three-phase loop
1. **Prototype** in Claude Code, often via local MCP server / Desktop extension.
2. **Evaluate** with realistic multi-call tasks; track accuracy, runtime, tokens, errors.
3. **Optimize** — feed transcripts back to Claude Code to rewrite the tool.

### "Tools good for agents are good for humans"
Same ergonomic principles transfer.

## Key Takeaways
1. **Fewer well-designed tools beat many.** Tools should let agents subdivide work naturally — not just wrap APIs.
   - **How to apply:** when adding a new tool, ask "would removing this and combining with another work better?"
2. **Namespace tools with prefixes** (`asana_projects_search`) to disambiguate at scale.
3. **Replace cryptic IDs with semantic names in responses.** Reduces hallucinations on retrieval tasks.
4. **Tool descriptions need real prompt engineering.** Include example usage, edge cases, format reqs, boundaries vs. other tools.
5. **Pagination + filtering + truncation defaults** keep responses inside context.

## Related Topics
tool-design, mcp, agent-computer-interface, evaluation-driven-tools, claude-code
