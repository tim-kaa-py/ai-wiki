---
title: "Introducing advanced tool use on the Claude Developer Platform"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-24"
url: "https://www.anthropic.com/engineering/advanced-tool-use"
pillar: "ecosystem"
tags: [tool-use, claude-api, tool-search, programmatic-tool-calling, agents, context-management]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Introducing Advanced Tool Use on the Claude Developer Platform

**Published:** November 24, 2025

## Overview

Anthropic released three beta features enabling Claude to discover, learn, and execute tools dynamically: Tool Search Tool, Programmatic Tool Calling, and Tool Use Examples.

## Key Features

**Tool Search Tool**

This feature allows Claude to discover tools on-demand rather than loading all definitions upfront. "Tool definitions consuming >10K tokens" benefit most. In internal testing, Opus 4 improved from 49% to 74% accuracy, while Opus 4.5 jumped from 79.5% to 88.1% when using Tool Search Tool with large tool libraries.

The mechanism marks tools with `defer_loading: true`, making them discoverable through search rather than consuming context immediately. A five-server setup example showed approximately 55K tokens consumed by tool definitions.

**Programmatic Tool Calling**

This capability enables Claude to orchestrate tools through code execution rather than sequential API calls. The feature allows "explicit orchestration logic, such as loops, conditionals, and data transformations." Testing showed a 37% reduction in token consumption on complex tasks, dropping from 43,588 to 27,297 tokens on average.

The workflow involves Claude writing Python code that calls multiple tools, with intermediate results processed in a sandboxed environment rather than entering Claude's context window.

**Tool Use Examples**

Developers can now provide sample tool calls directly in definitions. This addresses the gap where "JSON Schema excels at defining structure–types, required fields, allowed enums–but it can't express usage patterns." Internal testing improved accuracy from 72% to 90% on complex parameter handling.

## Implementation

Available via beta API with the header `advanced-tool-use-2025-11-20`. All three features work complementarily.
