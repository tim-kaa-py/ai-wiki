---
title: "Claude Prompting Best Practices"
source_type: "docs"
channel: "Anthropic"
date: "2026-04-13"
url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
pillar: "building"
tags: [prompt-engineering, claude, agents, tool-use, thinking, agentic-engineering, best-practices, frontend-design]
ingested: "2026-04-22"
source_file: "sources/docs/2026-04-13_anthropic_claude-prompting-best-practices.md"
---

# Claude Prompting Best Practices — Summary

**Source:** Anthropic | 2026-04-13 (re-fetched 2026-04-22 for Opus 4.7) | [Link](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Official docs

## TL;DR

Anthropic's single canonical reference for prompt engineering with Claude 4.6 and now **Claude Opus 4.7** models. Covers foundational techniques (be clear, use examples, XML tags), output control, tool use, thinking configuration, and agentic system design. The 2026-04-22 re-fetch adds a major new "Prompting Claude Opus 4.7" section introducing two new effort levels (`xhigh`, `max`), more literal instruction following, fewer-tools-more-reasoning behavior, improved user-facing progress updates, tone shifts (more direct, fewer emoji, less validation-forward), fewer-by-default subagents, a new persistent cream/serif/terracotta frontend default that must be explicitly overridden, interactive-vs-autonomous coding token dynamics, and a coverage-first code review harness recommendation (+11pp recall).

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

## Opus 4.7 — What's New (2026-04-22 re-fetch)

The earlier takeaways still apply to 4.6 and Haiku 4.5. The following are Opus 4.7–specific behaviors that often need tuning.

14. **New effort levels `xhigh` and `max`** — `xhigh` is the new recommended default for coding and agentic use cases; `high` is the minimum for any intelligence-sensitive work. `max` can outperform on intelligence-demanding tasks but is prone to overthinking and has diminishing returns.
    - **How to apply:** Start coding/agentic runs at `xhigh`. Use `high` for most knowledge work. Only test `max` on the hardest tasks. At `xhigh`/`max`, set `max_tokens` to 64k so the model has room to reason across tool calls and subagents.

15. **Effort is now strictly respected, especially at the low end** — unlike 4.6, Opus 4.7 at `low`/`medium` scopes work narrowly to the ask. Good for latency and cost, but risks under-thinking on moderately complex problems.
    - **How to apply:** If you see shallow reasoning, raise effort rather than prompting around it. If you must stay at `low` for latency, add a targeted "think carefully through multi-step reasoning" nudge.

16. **More literal instruction following** — Opus 4.7 does not silently generalize. Tell it "format every section" if you mean every section; "format this section" will be read as the first only, especially at lower effort.
    - **How to apply:** State scope explicitly. Great for structured extraction and pipelines; requires re-tuning prompts that implicitly relied on generalization.

17. **Uses tools less, reasons more** — Opus 4.7 has a lower default tool-use rate than 4.6, producing better results in most cases. In knowledge work, you can lift tool usage by raising effort (`high`/`xhigh` show substantially more tool use) or by prompting the model explicitly about when and why to use a given tool.
    - **How to apply:** If web-search / grep / retrieval tools under-trigger, describe the trigger criteria in the system prompt rather than adding anti-laziness language.

18. **User-facing progress updates are higher quality by default** — remove scaffolding like "after every 3 tool calls, summarize progress." Opus 4.7 now calibrates interim updates on its own.
    - **How to apply:** Strip forced-interim-message rules from harness prompts. Only re-add if the natural updates don't match your product's needs (and then provide explicit examples).

19. **Tone is more direct, with fewer emoji and less validation-forward phrasing** — if your product wants warmth, re-prompt for it explicitly.
    - **How to apply:** Audit any voice-sensitive product (chat, email assistants) against the new baseline. Add tone prompts like "Use a warm, collaborative tone. Acknowledge the user's framing before answering."

20. **Subagents spawn less often by default** — this is steerable the other way from 4.6. Tell 4.7 when to fan out.
    - **How to apply:** Add explicit guidance: "Spawn multiple subagents in the same turn when fanning out across items or reading multiple files. Do not spawn a subagent for work you can complete directly in a single response."

21. **New persistent frontend house style** — Opus 4.7 defaults to warm cream/off-white (~#F4F1EA) backgrounds, serif display (Georgia/Fraunces/Playfair), italic accents, terracotta/amber accent. Great for editorial/hospitality/portfolio, wrong for dashboards, dev tools, fintech, healthcare, enterprise. Generic negatives ("don't use cream") just shift it to another fixed palette. Two levers actually work: specify a concrete palette + typography, or ask for 4 proposed directions before building.
    - **How to apply:** Never rely on vague aesthetic negations. Either provide an explicit palette (e.g. `#E9ECEC, #C9D2D4, #8C9A9E, #44545B, #11171B`) or prompt for 4 option proposals. This applies to slide decks too, not just web UIs.

22. **Frontend design prompting can be shorter** — 4.7 produces distinctive output with a minimal `<frontend_aesthetics>` NEVER-list. The long 4.5/4.6 snippet is no longer necessary, but pair the shorter version with the variety-forcing techniques above.
    - **How to apply:** Swap the long block for the minimal version when using Opus 4.7; keep the long version on 4.6.

23. **Interactive coding agents burn more tokens than autonomous ones** — Opus 4.7 reasons more after each user turn in synchronous products, improving long-horizon coherence at the cost of tokens. The remedy is not to strip reasoning; it is to minimize required user interactions and specify the task fully upfront.
    - **How to apply:** In Claude Code–style products, prefer well-specified initial prompts + auto mode over progressive multi-turn clarification. Use `xhigh` or `high` effort and add autonomous features to maximize both performance and token efficiency.

24. **Code review harnesses need a coverage-first prompt** — Opus 4.7 is meaningfully better at bug-finding (+11pp recall on Anthropic's hardest bug-finding eval). But if your harness prompt still says "only report high-severity issues" or "be conservative," Opus 4.7 obeys more faithfully than 4.6 did, silently dropping real bugs it finds. Precision rises while measured recall falls — harness effect, not capability loss.
    - **How to apply:** Split coverage from filtering. At the finding stage tell the model its job is coverage, with a confidence + severity tag per finding, and do the filtering in a separate stage. If you must self-filter in one pass, give a concrete bar (e.g. "omit only pure style or naming nits") rather than qualitative terms like "important."

25. **Computer use now supports up to 2576px / 3.75MP** — 1080p is Anthropic's recommended cost/performance sweet spot; 720p or 1366×768 for cost-sensitive workloads. Effort setting also tunes computer-use behavior.
    - **How to apply:** If your computer-use agent was pinned at lower resolutions for cost, re-benchmark at 1080p with Opus 4.7 before assuming the tradeoff stays.

26. **Effort matters more on 4.7 than on any prior Opus** — Anthropic's own guidance says to actively experiment with effort on upgrade. Don't just port your 4.6 effort setting.
    - **How to apply:** When upgrading an existing system to Opus 4.7, run a small eval across `medium`/`high`/`xhigh` before locking in a setting.

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

Opus 4.7 adaptive thinking with `xhigh`:
```python
client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},  # or "max", "high", "medium", "low"
    messages=[{"role": "user", "content": "..."}],
)
```

Coverage-first code-review prompt (Opus 4.7):
```text
Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage - a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug. For each finding, include your confidence level and an estimated severity so a downstream filter can rank them.
```

Subagent steering for Opus 4.7 (fewer-by-default):
```text
Do not spawn a subagent for work you can complete directly in a single response (e.g. refactoring a function you can already see).

Spawn multiple subagents in the same turn when fanning out across items or reading multiple files.
```

Frontend palette override for Opus 4.7 (breaks the cream/serif/terracotta default):
```text
Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface — one-line rationale). Ask the user to pick one, then implement only that direction.
```

Minimal `<frontend_aesthetics>` block (Opus 4.7 — shorter version works):
```text
<frontend_aesthetics>
NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white or dark backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character. Use unique fonts, cohesive colors and themes, and animations for effects and micro-interactions.
</frontend_aesthetics>
```

## Related Topics

prompt-engineering, claude, agents, tool-use, thinking, agentic-engineering, best-practices, frontend-design, adaptive-thinking, subagent-orchestration, xml-tags, few-shot-prompting
