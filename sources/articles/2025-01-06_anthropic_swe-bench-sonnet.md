---
title: "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-01-06"
url: "https://www.anthropic.com/engineering/swe-bench-sonnet"
pillar: "understanding"
tags: [swe-bench, claude, agents, scaffolding, bash-tool, edit-tool, evaluation]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Raising the Bar on SWE-bench Verified with Claude 3.5 Sonnet

**Published:** January 6, 2025

## Article Summary

Anthropic's upgraded Claude 3.5 Sonnet achieved 49% on SWE-bench Verified, surpassing the previous state-of-the-art score of 45%.

## Key Components

**Agent Architecture:**
The system combines Claude 3.5 Sonnet with minimal scaffolding featuring two primary tools:

1. **Bash Tool** - Executes commands with detailed instructions about escaping, background processes, and system access
2. **Edit Tool** - Manages file viewing, creation, and modification through string replacement, requiring absolute paths to prevent errors

**Design Philosophy:**
Rather than constraining the model to rigid workflows, the approach grants the model autonomy in problem-solving strategy. The initial prompt outlines suggested steps but allows flexibility. As noted, "explicit encouragement to produce longer responses helps when token usage isn't constrained."

## Performance Results

| Model | SWE-bench Score |
|-------|-----------------|
| Claude 3.5 Sonnet (new) | 49% |
| Previous SOTA | 45% |
| Claude 3.5 Sonnet (old) | 33% |
| Claude 3 Opus | 22% |

## Notable Challenges

- **Resource intensity** - Successful runs often exceeded 100,000 tokens across hundreds of steps
- **Grading complexity** - Environment inconsistencies and test matching issues
- **Hidden test limitations** - Models couldn't verify actual test requirements
- **Multimodal gaps** - Inability to display file contents or images hampered debugging

## Key Insight

The results demonstrate that thoughtfully designed tool interfaces significantly impact agent performance. Developers can likely achieve higher SWE-bench scores by optimizing scaffolding around Claude 3.5 Sonnet rather than relying solely on model improvements.
