---
title: "Prompt Engineering for Claude"
type: "concept"
pillar: "building"
tags: [prompt-engineering, claude, best-practices, xml-tags, few-shot-prompting, thinking, adaptive-thinking]
sources:
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
last_updated: "2026-04-15"
---

# Prompt Engineering for Claude

Anthropic's official prompt engineering patterns for Claude 4.6 models. These are first-party recommendations — the canonical reference for getting the most out of Claude.

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

## Thinking Configuration (Claude 4.6)

### Adaptive Thinking Replaces Extended Thinking
Claude 4.6 uses `thinking: {type: "adaptive"}` where the model dynamically decides when and how much to think. Controlled by the `effort` parameter:

| Effort | Use case |
|--------|----------|
| `high` | Agentic coding, multi-step tool use, complex tasks |
| `medium` | General applications (recommended default) |
| `low` | High-volume, latency-sensitive workloads |

In internal evaluations, adaptive thinking outperforms manual `budget_tokens` consistently.

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

## Related Pages

- [Empathize with the Agent](empathize-with-the-agent.md) — the practitioner's version of the "brilliant new employee" mental model
- [Claude Code](../tools/claude-code.md) — the tool where these patterns are applied
- [Claude Routines](../tools/claude-routines.md) — autonomous sessions where prompt design is critical
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — practical workflow incorporating these principles
