---
title: "Prompt Engineering for Claude"
type: "concept"
pillar: "building"
tags: [prompt-engineering, claude, best-practices, xml-tags, few-shot-prompting, thinking, adaptive-thinking]
sources:
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
last_updated: "2026-04-22"
---

# Prompt Engineering for Claude

Anthropic's official prompt engineering patterns for Claude 4.6 and Claude Opus 4.7 models. These are first-party recommendations — the canonical reference for getting the most out of Claude. The Opus 4.7 section below captures behaviors that often need tuning on upgrade from 4.6.

## The Mental Model

Think of Claude as a **brilliant but new employee** who lacks context on your norms and workflows. It's highly capable but knows nothing about your specific project or preferences.

**Golden rule:** Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

This aligns with the [Empathize with the Agent](empathize-with-the-agent.md) concept — both Anthropic officially and practitioners independently converge on the same insight: the agent's main limitation is lack of context, not lack of capability.

## Foundational Techniques

### Be Clear and Direct
Be specific about desired output format and constraints. If you want "above and beyond" behavior, explicitly request it — Claude won't infer ambition from vague prompts.

### Explain the "Why"
Providing motivation behind constraints lets Claude generalize. Example: "Never use ellipses" is weaker than "Your response will be read aloud by a text-to-speech engine, so never use ellipses since the TTS engine can't pronounce them."

### Use 3-5 Examples in XML Tags
Few-shot examples are the most reliable steering mechanism. Wrap in `<example>` / `<examples>` tags. Make examples relevant, diverse (covering edge cases), and structured.

### Structure with XML Tags
Use `<instructions>`, `<context>`, `<input>` etc. to help Claude parse complex prompts unambiguously. Consistent, descriptive tag names. Nest when content has natural hierarchy.

### Give Claude a Role
Even a single sentence in the system prompt focuses behavior and tone: "You are a helpful coding assistant specializing in Python."

### Long Context: Documents at Top, Query at Bottom
For 20k+ token inputs, place documents near the top and queries/instructions at the bottom. This can improve response quality by up to 30%. Use `<document>` tags with metadata for multi-document inputs.

## Output Control

### Positive Framing Beats Negative
"Your response should be composed of smoothly flowing prose paragraphs" works better than "Do not use markdown."

### Match Prompt Style to Desired Output
Claude's response style is influenced by the formatting of your prompt. Removing markdown from the prompt reduces markdown in the output.

### Claude 4.6 is More Concise
The latest models skip summaries after tool calls and jump to the next action. If you want visibility, explicitly ask: "After completing a task that involves tool use, provide a quick summary of the work you've done."

## Thinking Configuration (Claude 4.6 / 4.7)

### Adaptive Thinking Replaces Extended Thinking
Claude 4.6 and 4.7 use `thinking: {type: "adaptive"}` where the model dynamically decides when and how much to think. Controlled by the `effort` parameter:

| Effort | Use case |
|--------|----------|
| `max` (Opus 4.7) | Intelligence-demanding tasks where you've tested it wins. Prone to overthinking — diminishing returns from token usage. |
| `xhigh` (Opus 4.7, new) | **Recommended default for coding and agentic use cases on Opus 4.7.** |
| `high` | Minimum for intelligence-sensitive work on Opus 4.7. General agentic/coding on 4.6. |
| `medium` | Cost-sensitive use cases. General applications on 4.6. |
| `low` | High-volume, latency-sensitive workloads. Risk of under-thinking on Opus 4.7 (see below). |

In internal evaluations, adaptive thinking outperforms manual `budget_tokens` consistently.

**Opus 4.7 respects effort strictly.** Unlike 4.6, at `low` and `medium` Opus 4.7 scopes work narrowly rather than going above and beyond. Good for latency and cost; risky for moderately complex tasks. Anthropic's own guidance: if you see shallow reasoning, raise effort rather than prompting around it. Effort matters more on 4.7 than on any prior Opus — actively re-benchmark on upgrade.

At `max` or `xhigh`, set `max_tokens: 64000` so the model has room to reason across subagents and tool calls.

### Taming Overthinking
Claude Opus 4.6 does significantly more upfront exploration than previous models. If prompts previously encouraged thoroughness, **dial them back**:
- Replace "Default to using [tool]" with "Use [tool] when it would enhance understanding"
- Remove "If in doubt, use [tool]" (causes overtriggering in 4.6)
- Lower `effort` setting as a fallback

## Agentic System Design

### Subagent Orchestration
Claude 4.6 spawns subagents proactively. The risk is **overuse, not underuse**. Add guardrails: "Use subagents for parallel independent workstreams. Work directly for simple tasks and single-file edits."

### Anti-Overengineering
Claude 4.5/4.6 tend to overengineer — extra files, unnecessary abstractions, unasked-for flexibility. Anthropic provides a copy-paste prompt to constrain this (see source for full text). Core rules:
- Don't add features beyond what was asked
- Don't add docstrings/comments to untouched code
- Don't add error handling for impossible scenarios
- Don't create abstractions for one-time operations

### Balancing Autonomy and Safety
Without guidance, Claude may take irreversible actions (deleting files, force-pushing). Prompt it to consider reversibility and ask before destructive operations.

### Anti-Hallucination
Use `<investigate_before_answering>` to enforce that Claude reads files before making claims about code. Never speculate about unread code.

### Multi-Context Window Workflows
- First window: set up framework (tests, scripts)
- Future windows: iterate on a todo-list
- Use structured formats (JSON) for state tracking
- Use freeform text for progress notes
- Git for checkpoints across sessions
- Prompt Claude not to stop early due to token budget concerns

## Routine Prompt Design

Claude Routines run fully hands-off — no human-in-the-loop to course-correct. This makes routine prompts a distinct prompt engineering discipline from interactive prompts:

- **Structure as step-by-step SOPs** rather than conversational instructions
- **Define "done" explicitly** — e.g., "use the Slack connector to send me an update when finished"
- **Include edge cases and fallback behaviors** — the routine cannot ask for clarification
- **Don't economize on length** — there appears to be no length limit; more context reduces misinterpretation
- **Provide examples of expected inputs** — especially for webhook-triggered routines receiving variable payloads
- **Test with "Run Now"** before scheduling to verify behavior

This is conceptually related to spec quality as the new bottleneck (see [Five Levels of AI Coding](five-levels-of-ai-coding.md)) — when the agent runs autonomously, prompt precision is everything. *(Source: Nick Saraev)*

## Prompting Claude Opus 4.7 (New in April 2026)

Opus 4.7 performs well on existing 4.6 prompts out of the box. The patterns below are the behaviors that most often need tuning on upgrade. (Source: Anthropic, 2026-04-22.)

### More Literal Instruction Following
Opus 4.7 does not silently generalize from one item to another and does not infer requests you didn't make. Especially true at lower effort. State scope explicitly ("apply this formatting to *every* section, not just the first"). Great for structured extraction and pipelines; needs re-tuning for prompts that implicitly relied on 4.6's generalization.

### Uses Tools Less, Reasons More
Opus 4.7 has a lower default tool-use rate than 4.6 and reasons more. Usually better outcomes. To lift tool usage: raise effort to `high` or `xhigh` (substantially more tool calls), or describe *when and why* the tool should be used in the system prompt. Plain anti-laziness language still does not help.

### User-Facing Progress Updates Are Better by Default
Strip scaffolding like "After every 3 tool calls, summarize progress." Opus 4.7 calibrates interim updates on its own. If the natural updates don't match your product, override with explicit examples rather than frequency rules.

### Tone Shift
More direct and opinionated, fewer emoji, less validation-forward phrasing than 4.6's warmer style. If your product wants warmth, re-prompt explicitly: *"Use a warm, collaborative tone. Acknowledge the user's framing before answering."*

### Subagents — Now Fewer by Default
4.6 over-spawned subagents; 4.7 under-spawns. Opposite steering direction. To lift fan-out:
```text
Spawn multiple subagents in the same turn when fanning out across items or reading multiple files.
Do not spawn a subagent for work you can complete directly in a single response.
```

### The Cream/Serif/Terracotta Default
Opus 4.7 has a persistent default house style: warm cream/off-white backgrounds (~`#F4F1EA`), serif display (Georgia, Fraunces, Playfair), italic accents, terracotta/amber accents. Fits editorial/hospitality/portfolio. Wrong for dashboards, dev tools, fintech, healthcare, enterprise. Applies to slide decks too, not just web.

Generic negatives ("don't use cream", "make it clean") just shift the model to another fixed palette. Two levers actually work:

1. **Specify a concrete palette and typography** — Opus 4.7 follows explicit specs precisely.
2. **Ask for 4 proposed directions before building** — gives the user control and breaks the default. Replaces `temperature` as the variety lever.

```text
Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface — one-line rationale). Ask the user to pick one, then implement only that direction.
```

Opus 4.7 also needs less anti-AI-slop prompting than 4.6. The long `<frontend_aesthetics>` block is unnecessary; a minimal NEVER-list works. Pair with the variety lever above.

### Interactive vs Autonomous Coding Token Dynamics
Opus 4.7 reasons more after each user turn in synchronous (interactive) coding agents, improving long-horizon coherence at a token cost. The fix is *not* to strip reasoning but to minimize required interactions: specify task/intent/constraints upfront in the first turn, run at `xhigh` or `high`, and add autonomous features like auto mode. Ambiguous prompts conveyed progressively over multiple turns reduce both token efficiency and sometimes performance.

### Code Review Harness — Coverage-First Prompting
Opus 4.7 is meaningfully better at bug-finding (+11pp recall on one of Anthropic's hardest bug-finding evals based on real Anthropic PRs). But harness prompts like "only report high-severity issues," "be conservative," or "don't nitpick" are followed more faithfully than on 4.6 — the model investigates just as thoroughly, identifies bugs, and then drops findings below the stated bar. Precision rises while measured recall falls. **Harness effect, not capability regression.**

Split coverage from filtering. Example finding-stage prompt:

```text
Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage — a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug. For each finding, include your confidence level and an estimated severity so a downstream filter can rank them.
```

Works even without an actual second stage — just moving confidence-filtering out of the finding step often helps. If you must self-filter in one pass, use a concrete bar ("omit only pure style or naming nits") rather than qualitative terms like "important." See [Reviewer Agents](reviewer-agents.md) for how this fits into persona-based CI review.

### Computer Use
Supports up to 2576px / 3.75MP. Anthropic recommends 1080p for cost/performance balance; 720p or 1366×768 for cost-sensitive workloads. Re-benchmark at 1080p before assuming the old tradeoff stays.

### Response Length Calibration
Opus 4.7 calibrates length to task complexity rather than using a fixed verbosity — shorter on simple lookups, much longer on open-ended analysis. If your product depends on a specific style, positive examples of the desired concision beat "don't be verbose" instructions.

## Where Prompt Engineering Sits Now (2026)

The 2026 framing from harness-engineering research: there have been three eras in four years — **prompt engineering → context engineering → harness engineering**. Each swallows the prior one. Prompt engineering didn't vanish; it became a sub-component of the harness. The patterns on this page (XML structuring, positive framing, examples, adaptive thinking) still apply — they now live *inside* system prompts, tool descriptions, execution contracts, and sub-agent definitions rather than being the whole game.

Practical upshot: when your agent underperforms, the first audit is no longer "tweak the prompt" — it's "audit the harness (patterns, prompts, verification, memory) before considering a model upgrade." See [Harness Engineering](harness-engineering.md). *(Source: PY — Rise of Harness Engineering)*

## Related Pages

- [Empathize with the Agent](empathize-with-the-agent.md) — the practitioner's version of the "brilliant new employee" mental model
- [Claude Code](../tools/claude-code.md) — the tool where these patterns are applied
- [Claude Routines](../tools/claude-routines.md) — autonomous sessions where prompt design is critical
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — practical workflow incorporating these principles
- [Harness Engineering](harness-engineering.md) — the era that absorbs prompt + context engineering
