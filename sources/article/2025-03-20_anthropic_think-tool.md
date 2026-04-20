---
title: "The 'think' tool: Enabling Claude to stop and think in complex tool use situations"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-03-20"
url: "https://www.anthropic.com/engineering/claude-think-tool"
pillar: "understanding"
tags: [think-tool, claude, tool-use, reasoning, tau-bench, swe-bench, agents]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# The "Think" Tool: Enabling Claude to Stop and Think in Complex Tool Use Situations

**Published:** March 20, 2025

## Article Summary

Anthropic introduced a "think" tool that enables Claude to pause and reflect during complex problem-solving tasks. This feature creates dedicated space for structured reasoning when handling long chains of tool calls or multi-step conversations.

### Key Distinction from Extended Thinking

The "think" tool differs from extended thinking capabilities. As the article explains, "Extended thinking is all about what Claude does before it starts generating a response" while the think tool allows Claude to "stop and think about whether it has all the information it needed to move forward."

### Performance Results

Testing on τ-Bench (tau-bench) showed substantial improvements:

- **Airline domain:** The think tool with optimized prompting achieved 0.570 on pass¹ metrics, representing a 54% relative improvement over baseline performance of 0.370
- **Retail domain:** The think tool achieved 0.812 compared to 0.783 baseline
- **SWE-Bench:** Adding the think tool improved performance by 1.6% on average

### Best Use Cases

- Tool output analysis requiring careful processing
- Policy-heavy environments with detailed guidelines
- Sequential decision-making where mistakes carry significant consequences

### Implementation Guidance

Anthropic recommends pairing the think tool with domain-specific prompting examples rather than relying on it alone, particularly for complex policy scenarios. The tool requires minimal implementation overhead and doesn't negatively impact performance when unused.
