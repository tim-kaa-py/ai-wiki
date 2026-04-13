---
title: "Agentic Coding Workflow"
type: "how-to"
pillar: "building"
tags: [agentic-engineering, workflow, best-practices, claude-code]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
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
- **Empathize first.** Before prompting, ask: "If I were dropped into this codebase cold, what would I need to know?" Then share that context.
- **Guide with intent.** "Fix the auth bug" not "Open file X, go to line Y, change Z." Let the agent figure out the implementation.
- **Don't force your worldview.** The agent may have a better approach from training. Evaluate on merit, not style.
- **Interrupt when stuck.** If the agent is spinning, press escape. Long execution is feedback — reframe the problem, add context.
- **Voice for conversations.** Talk for agent prompts (richer, more natural). Type for terminal commands (faster).
- **Give the agent verification.** The most important tip (Boris Cherny): give Claude a way to verify its own output. Use Chrome extension for frontend, built-in browser for web work.

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

## Anti-Patterns to Avoid

- Over-engineering prompt pipelines (the "agentic trap")
- Micromanaging agent output or forcing your style
- Reverting instead of fixing forward
- Not giving enough context (the agent starts from zero!)
- Ignoring long execution as feedback
- Mixing unrelated concerns in one session
- Using orchestration frameworks that remove the human from the loop

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Peter Steinberger](../people/peter-steinberger.md)
