---
title: "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-01-06"
url: "https://www.anthropic.com/engineering/swe-bench-sonnet"
pillar: "understanding"
tags: [swe-bench, claude, agents, scaffolding, bash-tool, edit-tool, evaluation]
ingested: "2026-04-20"
source_file: "sources/article/2025-01-06_anthropic_swe-bench-sonnet.md"
---

# SWE-bench Verified 49% with Claude 3.5 Sonnet — Summary

**Source:** Anthropic Engineering | 2025-01-06 | [Link](https://www.anthropic.com/engineering/swe-bench-sonnet)

## TL;DR
49% SWE-bench Verified (vs 45% prior SOTA) using Sonnet + just two tools (Bash + Edit) and minimal scaffolding. Lesson: tool/scaffold design matters more than fancy agent architectures.

## Key Takeaways
1. **Two tools are enough.** Bash + Edit (string replacement, absolute paths) — no elaborate planner.
   - **How to apply:** before adding tools, see how far you get with bash + a constrained edit primitive.
2. **Grant model autonomy on strategy** — suggest steps, don't constrain.
3. **Encourage longer responses explicitly** when token budget allows.
4. **Resource cost:** runs frequently exceeded 100K tokens / hundreds of steps.
5. **Tool ergonomics > prompt fiddling** — biggest gains from tweaking tools.

## Related Topics
swe-bench, scaffolding, agent-computer-interface, bash-edit-tools
