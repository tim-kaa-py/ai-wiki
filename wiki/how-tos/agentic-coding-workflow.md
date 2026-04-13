---
title: "Agentic Coding Workflow"
type: "how-to"
pillar: "building"
tags: [agentic-engineering, workflow, best-practices, claude-code, spec-quality, ai-coding]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md"
last_updated: "2026-04-13"
---

# Agentic Coding Workflow

A step-by-step guide to productive agentic coding, synthesized from Peter Steinberger's converged practices and Claude Code's power-user features.

## Setup

1. **Choose your tool.** Claude Code in the terminal is the power-user path. Full CLI, multiple instances, voice input. IDE optional (use as a diff viewer to spot-check changes).
2. **Multiple terminal windows.** Each runs its own agent session with its own task. Keyboard to switch, voice to prompt.
3. **Write a CLAUDE.md.** Orient the agent: project structure, conventions, what matters. The agent starts from zero every session.
4. **Consider a soul.md.** A personality/values document for your agent. Let the agent contribute to it.

## Assigning Work

| Task type | Approach |
|-----------|----------|
| Large feature | Dedicated session, conversational back-and-forth |
| Exploration | Separate session, low-stakes, play and learn |
| Small bugs | Quick session, often 2-3 in parallel |
| Documentation | Part of the feature session, not separate. Agent-generated, human-reviewed |

## Prompting

- **Keep it simple.** The expert level is short, direct prompts — not elaborate pipelines. "Look at these files and make these changes."
- **Empathize first.** Before prompting, ask: "If I were dropped into this codebase cold, what would I need to know?" Then share that context. Anthropic's golden rule: if a colleague with no context couldn't follow your prompt, Claude won't either.
- **Guide with intent.** "Fix the auth bug" not "Open file X, go to line Y, change Z." Let the agent figure out the implementation.
- **Explain the "why" behind constraints.** Providing motivation lets Claude generalize beyond the literal rule. "Never use ellipses because the TTS engine can't pronounce them" is stronger than "never use ellipses." *(Source: Anthropic)*
- **Be explicit when you want action.** "Can you suggest changes?" → Claude will suggest. "Change this function" → Claude will act. For agentic coding, use imperative language. *(Source: Anthropic)*
- **Don't force your worldview.** The agent may have a better approach from training. Evaluate on merit, not style.
- **Interrupt when stuck.** If the agent is spinning, press escape. Long execution is feedback — reframe the problem, add context.
- **Voice for conversations.** Talk for agent prompts (richer, more natural). Type for terminal commands (faster).
- **Give the agent verification.** The most important tip (Boris Cherny): give Claude a way to verify its own output. Use Chrome extension for frontend, built-in browser for web work.
- **Dial back aggressive prompting for 4.6.** If prompts previously said "CRITICAL: You MUST use this tool", change to "Use this tool when...". Claude 4.6 is proactive enough to overtrigger on older anti-laziness patterns. *(Source: Anthropic)*

## Git & CI

- **No develop branch.** Main is always shippable.
- **Local CI.** Run tests locally before pushing. GitHub CI is secondary.
- **Never revert.** If something breaks, prompt the agent to fix it: "This broke X — fix it while keeping Y."
- **Commit when satisfied.** Not after every change — when the outcome is good.
- **Refactors are cheap now.** Don't defer refactors out of fear of breaking things — agents will figure it out.

## PR Review (Agent-Assisted)

1. "Review this PR"
2. "Do you understand the **intent**?" (why, not how)
3. "Is this the most optimal way?"
4. Point to unseen parts of codebase: "Have you looked at X?"
5. Discuss the optimal solution
6. Consider a broader refactor — "refactors are cheap now"
7. Ship or defer

Still manually review for security — "I don't trust people."

## Core Principles

1. **Simplicity wins** — resist elaborate tooling; invest in understanding
2. **Empathize with the agent** — it starts from zero; share context
3. **Build for the agent** — accept its naming, keep structure discoverable
4. **Never revert** — fix forward, always
5. **Let go of perfection** — judge by "does it work?" not "is it my style?"
6. **Practice compounds** — dedicate time to experimenting; agentic engineering is a learnable skill
7. **Conversation, not command** — guide with intent, interrupt when stuck
8. **Verify output** — give the agent a way to see what it built
9. **Spec quality is the new bottleneck** — when AI builds what you describe, ambiguity produces software that fills gaps with machine guesses, not customer-centric guesses. Practice writing specs detailed enough for an AI agent to implement without human intervention. *(Source: Nate B Jones / Dan Shapiro)*
10. **Know your level honestly** — Dan Shapiro's 5-level framework (spicy autocomplete → dark factory) exposes that 90% of developers are stuck at Level 2 and think they're further along. The METR study confirms self-assessment is unreliable. Measure actual task completion time, not subjective perception. *(Source: Nate B Jones / Dan Shapiro)*

## Leveling Up: The Maturity Ladder

Dan Shapiro's 5-level framework provides a concrete vocabulary for assessing where you are in agentic coding maturity:

| Level | Role | Key shift |
|-------|------|-----------|
| 0 — Spicy Autocomplete | Human writes code, AI suggests next line | None — this is just tab-completion |
| 1 — Coding Intern | AI handles discrete tasks, human reviews everything | Delegation of well-scoped units |
| 2 — Junior Developer | AI handles multi-file changes, human still reads all code | **Most developers are here** (and think they're higher) |
| 3 — Developer as Manager | Human directs at PR/feature level, AI implements | Letting go of code — psychologically hardest |
| 4 — Developer as PM | Human writes spec, checks test results; code is a black box | Spec quality becomes everything |
| 5 — Dark Factory | Specs in, working software out, zero human code involvement | Organizational redesign required |

**The gap between levels is not a tool problem — it's a people and organizational design problem.** The METR study showed developers are 19% slower with AI but believe they're 24% faster. The workflow itself must be redesigned around AI, not patched with AI tools bolted onto existing processes. *(Source: Nate B Jones / Dan Shapiro)*

See [Five Levels of AI Coding](../concepts/five-levels-of-ai-coding.md) for the full framework analysis.

## Anti-Patterns to Avoid

- Over-engineering prompt pipelines (the "agentic trap")
- Micromanaging agent output or forcing your style
- Reverting instead of fixing forward
- Not giving enough context (the agent starts from zero!)
- Ignoring long execution as feedback
- Mixing unrelated concerns in one session
- Using orchestration frameworks that remove the human from the loop
- **Bolting AI onto existing workflows without redesign** — produces the J-curve dip where productivity drops before it improves; most orgs mistake the dip for evidence AI doesn't work *(Source: Nate B Jones / Dan Shapiro)*
- **Trusting subjective AI productivity assessments** — the METR study shows developers are confidently wrong about both direction and magnitude of AI's impact on their speed *(Source: Nate B Jones / Dan Shapiro)*

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
- [Five Levels of AI Coding](../concepts/five-levels-of-ai-coding.md)
- [Peter Steinberger](../people/peter-steinberger.md)
