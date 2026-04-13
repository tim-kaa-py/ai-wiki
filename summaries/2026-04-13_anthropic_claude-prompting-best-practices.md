---
title: "Claude Prompting Best Practices"
source_type: "docs"
channel: "Anthropic"
date: "2026-04-13"
url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
pillar: "building"
tags: [prompt-engineering, claude, agents, tool-use, thinking, agentic-engineering, best-practices, frontend-design]
ingested: "2026-04-13"
source_file: "sources/docs/2026-04-13_anthropic_claude-prompting-best-practices.md"
---

# Claude Prompting Best Practices — Summary

**Source:** Anthropic | 2026-04-13 | [Link](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Official docs

## TL;DR

Anthropic's single canonical reference for prompt engineering with Claude 4.6 models. Covers everything from foundational techniques (be clear, use examples, XML tags) through output control, tool use, thinking configuration, and agentic system design. The most actionable sections are on adaptive thinking migration, subagent orchestration guardrails, and anti-overeagerness prompts — all directly applicable to Claude Code workflows.

## Key Takeaways

1. **"Brilliant new employee" mental model** — treat Claude as highly capable but lacking context on your norms. The golden rule: if a colleague couldn't follow your prompt, Claude won't either.
   - **How to apply:** Before shipping a system prompt, read it as if you had zero context. Fill in the gaps.

2. **Explain the "why" behind constraints** — giving motivation (e.g., "text-to-speech engine can't pronounce ellipses") lets Claude generalize beyond the literal rule.
   - **How to apply:** When adding a constraint to CLAUDE.md or a system prompt, always add one sentence of motivation.

3. **3-5 examples in `<example>` tags** — few-shot examples are the most reliable steering mechanism for format, tone, and structure. Wrap in XML to separate from instructions.
   - **How to apply:** For any non-trivial output format, include 3-5 diverse examples in the prompt rather than relying on description alone.

4. **Long-context: documents at top, query at bottom** — placing queries after documents can improve response quality by up to 30%.
   - **How to apply:** In CLAUDE.md and agentic prompts, put reference material/context above the task instructions.

5. **Tell Claude what to DO, not what NOT to do** — positive framing ("write flowing prose") beats negative framing ("don't use markdown") for output control.
   - **How to apply:** Audit system prompts for negative instructions and rewrite as positive directives.

6. **Adaptive thinking replaces budget_tokens** — Claude 4.6 uses `thinking: {type: "adaptive"}` with an `effort` parameter instead of manual `budget_tokens`. Adaptive thinking outperforms extended thinking in internal evals.
   - **How to apply:** Use `effort: "high"` for agentic/coding work, `effort: "medium"` for general use, `effort: "low"` for latency-sensitive tasks. Set `max_tokens` to 64k at high effort.

7. **Dial back anti-laziness prompting** — Claude 4.6 is significantly more proactive than predecessors. Instructions like "CRITICAL: You MUST use this tool" will cause overtriggering. Use natural language instead.
   - **How to apply:** Replace aggressive caps/emphasis in system prompts with calm directives. Remove "if in doubt, use [tool]" patterns.

8. **Subagent orchestration is now native** — Claude 4.6 will spawn subagents proactively. The risk is overuse, not underuse. Add guardrails for when subagents are vs. aren't warranted.
   - **How to apply:** Add guidance: "Use subagents for parallel independent workstreams. Work directly for simple tasks and single-file edits."

9. **Overeagerness guardrails** — Claude 4.5/4.6 tend to overengineer (extra files, unnecessary abstractions). The doc provides a copy-paste prompt to minimize this.
   - **How to apply:** Include the anti-overengineering prompt in system prompts for agentic coding tools.

10. **Prefilled responses are deprecated** — starting with Claude 4.6, prefills on the last assistant turn are no longer supported. Use structured outputs, XML tags, or direct instructions instead.
    - **How to apply:** Migrate any prefill-based format enforcement to structured outputs or explicit instructions.

11. **Context awareness for multi-window work** — Claude 4.6 can track remaining context budget. Pair with memory tools and progress files for seamless handoffs across context windows.
    - **How to apply:** Add context-compaction awareness to agentic prompts. Use `progress.txt` / `tests.json` patterns for state persistence.

12. **Frontend design: fight "AI slop"** — without explicit aesthetic guidance, Claude defaults to generic patterns (Inter font, purple gradients). The doc provides a detailed `<frontend_aesthetics>` prompt block.
    - **How to apply:** Include the aesthetics prompt when building UIs. Call out specific fonts, color strategies, and animation approaches.

13. **Ground answers in code, not speculation** — use `<investigate_before_answering>` to prevent hallucination in agentic coding. Claude should read files before making claims.
    - **How to apply:** Add the investigate-before-answering block to CLAUDE.md for coding projects.

## Notable Commands / Code Snippets

Adaptive thinking API call:
```python
client.messages.create(
    model="claude-opus-4-6",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
```

Anti-overengineering prompt (copy-paste ready):
```text
Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused:
- Scope: Don't add features, refactor code, or make "improvements" beyond what was asked.
- Documentation: Don't add docstrings, comments, or type annotations to code you didn't change.
- Defensive coding: Don't add error handling for scenarios that can't happen.
- Abstractions: Don't create helpers or utilities for one-time operations.
```

Parallel tool calling prompt:
```text
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel.
</use_parallel_tool_calls>
```

## Related Topics

prompt-engineering, claude, agents, tool-use, thinking, agentic-engineering, best-practices, frontend-design, adaptive-thinking, subagent-orchestration, xml-tags, few-shot-prompting
