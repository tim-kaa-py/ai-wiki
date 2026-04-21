---
title: "Code execution with MCP: Building more efficient agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-04"
url: "https://www.anthropic.com/engineering/code-execution-with-mcp"
pillar: "building"
tags: [mcp, code-execution, agents, context-management, tool-use, progressive-disclosure]
ingested: "2026-04-20"
source_file: "sources/articles/2025-11-04_anthropic_code-execution-with-mcp.md"
---

# Code Execution with MCP — Summary

**Source:** Adam Jones, Conor Kelly (Anthropic) | 2025-11-04 | [Link](https://www.anthropic.com/engineering/code-execution-with-mcp)

## TL;DR
Instead of every MCP tool definition + every intermediate result flowing through the model's context, expose tools as a code API in a sandboxed runtime. Example: 150K → 2K tokens (-98.7%). Adds sandbox/monitoring complexity.

## Key Concepts

### Two MCP inefficiencies
- **Tool definitions upfront:** thousands of tools = hundreds of thousands of tokens.
- **Intermediate results through context:** large docs cycle through the model multiple times.

### Filesystem-as-tool-API
Tools presented as a file tree. Agent imports only the ones it needs.

## Key Takeaways
1. **Switch to code-execution model when context bloat is the bottleneck.**
   - **How to apply:** for MCP setups with many servers or large tool outputs, prototype a code-API gateway and measure token delta.
2. **Privacy bonus:** sensitive data stays in the sandbox, never enters model context.
3. **State persistence:** agents save progress in the sandbox and build reusable skills.
4. **Cost:** secure sandboxing, resource limits, monitoring infrastructure required.

## Related Topics
mcp, code-execution, progressive-disclosure, context-management, sandboxing
