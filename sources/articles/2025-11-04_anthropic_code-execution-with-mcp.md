---
title: "Code execution with MCP: Building more efficient agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-04"
url: "https://www.anthropic.com/engineering/code-execution-with-mcp"
pillar: "building"
tags: [mcp, code-execution, agents, context-management, tool-use, progressive-disclosure]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Code Execution with MCP: Building More Efficient Agents

**Published:** November 4, 2025
**Authors:** Adam Jones and Conor Kelly (with feedback from Jeremy Fox, Jerome Swannack, Stuart Ritchie, Molly Vorwerck, Matt Samuels, and Maggie Vo)

## Article Summary

How code execution environments can enhance AI agent efficiency when working with the Model Context Protocol (MCP). The authors identify two key inefficiencies in traditional MCP implementations:

**Problem 1: Context Overload**
Loading all tool definitions upfront consumes substantial tokens. With thousands of connected tools, agents must process hundreds of thousands of tokens before addressing user requests.

**Problem 2: Intermediate Results**
"Every intermediate result must pass through the model," meaning large documents flow through the context window multiple times.

## The Solution: Code-Based Tool Access

Rather than direct tool calling, agents can interact with MCP servers through code APIs. Tools are presented as a filesystem structure where agents discover and load only needed definitions. The example demonstrates reducing token usage "from 150,000 tokens to 2,000 tokens—a time and cost saving of 98.7%."

## Key Benefits

- **Progressive disclosure:** Models load tool definitions on-demand rather than upfront
- **Data filtering:** Large datasets can be processed in the execution environment before returning results
- **Control flow:** Loops and conditionals execute efficiently without chaining multiple calls
- **Privacy:** Sensitive data remains in the execution environment, never entering model context
- **State persistence:** Agents can save progress and develop reusable skills

## Important Considerations

The authors acknowledge that "code execution introduces its own complexity," requiring secure sandboxing, resource limits, and monitoring.
