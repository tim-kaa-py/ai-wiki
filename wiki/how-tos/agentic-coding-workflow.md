---
title: "Agentic Coding Workflow"
type: "how-to"
pillar: "building"
tags: [agentic-engineering, workflow, best-practices, claude-code, spec-quality, ai-coding, auto-research, optimization]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md"
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
  - "summaries/2026-04-07_ben-ai_karpathys-autoresearch-10x-claude.md"
last_updated: "2026-04-16"
---

# Agentic Coding Workflow

A step-by-step guide to productive agentic coding, synthesized from Peter Steinberger's converged practices and Claude Code's power-user features.

## Setup

1. **Choose your tool.** Claude Code in the terminal is the power-user path. Full CLI, multiple instances, voice input. IDE optional (use as a diff viewer to spot-check changes).
2. **Multiple terminal windows.** Each runs its own agent session with its own task. Keyboard to switch, voice to prompt.
3. **Write a CLAUDE.md.** Orient the agent: project structure, conventions, what matters. The agent starts from zero every session.
4. **Consider a soul.md.** A personality/values document for your agent. Let the agent contribute to it.

5. **Start in Plan mode.** Press Shift+Tab twice to enter Plan mode. Write a full blueprint before execution — a good plan dramatically increases first-shot success rate. *(Source: Boris Cherny, Creator of Claude Code)*
6. **Use the best model.** Default to Opus. It's bigger and slower per call, but handles tasks better — net result is faster overall. *(Source: Boris Cherny, Creator of Claude Code)*
7. **Pre-allow safe commands via `/permissions`.** Don't use `--dangerously-skip-permissions`. Use `/permissions` to allowlist build, test, lint, and typecheck commands by pattern. Check `.claude/settings.json` into the team repo. See [Claude Code Permissions](../how-tos/claude-code-permissions.md). *(Source: Boris Cherny, Creator of Claude Code)*

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
- **Give the agent a verification feedback loop.** Boris Cherny (creator of Claude Code) calls this the single most impactful practice: if Claude can check its own work (run tests, typecheck, lint), quality is **2-3x higher**. Include a "before committing" checklist in CLAUDE.md with typecheck + tests + lint. *(Source: Boris Cherny, Creator of Claude Code)*
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

## Automation with Routines

For tasks that should run autonomously (no human-in-the-loop), Claude Routines provide scheduled, triggered, or API-invoked sessions in cloud containers. Key workflow considerations:

- **Routine prompts need more precision than interactive prompts.** There is no human to course-correct mid-run, so the prompt must be a self-contained SOP with edge cases, fallback behaviors, and a clear "definition of done."
- **Chain routines via webhooks for multi-step pipelines.** Each routine handles one stage and fires the next — e.g., transcript arrives via webhook, routine generates proposal, signature event triggers onboarding routine.
- **Default to routines for new automation.** For new builds, writing natural-language instructions is faster than wiring n8n/Make.com nodes. Reserve node-based tools for high-volume, stable workflows where token cost matters.
- **Use managed sessions for multi-agent orchestration.** Break complex workflows into specialized agents (parser, writer, drafter) running in isolated containers, coordinated through API calls.

See [Claude Routines](../tools/claude-routines.md) for the full feature breakdown. *(Source: Nick Saraev)*

## Autonomous Skill Optimization (Auto Research)

Karpathy's Auto Research framework enables fully autonomous optimization of any AI skill — including CLAUDE.md files, prompt templates, and content workflows. The agent runs a closed loop: define boolean criteria, baseline, hypothesize, test, evaluate, keep/discard, repeat.

**How to apply:**
1. **Identify a high-value, frequently-used skill** — LinkedIn posts, email templates, CLAUDE.md routing rules, summary quality
2. **Write 3-5 boolean criteria** using the three-level framework: Level 1 (hard rules like character limits), Level 2 (subjective patterns expressed as boolean checks, evaluated by LLM judge), Level 3 (real-world data-derived criteria)
3. **Run 5-10 iterations** — performance degrades after 10-15 (overfitting/drift); token costs scale linearly
4. **Optimize in order** — hard rules first, then subjective patterns, then real-world data. Each level builds on a solid foundation from the previous one

**Key insight:** Even creative/subjective tasks (copywriting, tone of voice) can be largely decomposed into testable boolean criteria. The bottleneck is articulating what makes your output yours, not the framework's rigidity.

See [Auto Research](../concepts/auto-research.md) for the full concept breakdown. *(Source: Ben AI)*

## Orchestration Layers vs Vanilla Claude Code

Orchestration layers (GSD, Superpowers) sit on top of Claude Code and add planning rigor, sub-agent-driven development, and context management. Chase AI's benchmark found that vanilla Claude Code finished the same task in 20 minutes / 200K tokens, versus 1 hour / 250K for Superpowers and 1 hour 45 min / 1.2M for GSD — with no meaningful quality difference.

**Decision framework:**
1. **Default to vanilla Claude Code** for every project. The time saved compounds through iteration.
2. **Only escalate to an orchestration layer** if you hit actual complexity walls — not anticipated ones.
3. **If you must use one, prefer Superpowers** — lighter on tokens, more fluid (auto-invoked skills vs manual slash commands), and lower penalty if the task didn't need it.
4. **The "line in the sand" problem:** You cannot reliably predict whether a task justifies orchestration overhead. Under uncertainty, the rational default is the option with the lowest cost of being wrong — which is vanilla Claude Code.

Claude Code has natively absorbed many features (auto context clearing, context management) that originally justified orchestration layers. Re-evaluate periodically — the gap keeps shrinking.

See [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) for the full benchmark and analysis. *(Source: Chase AI)*

## Anti-Patterns to Avoid

- Over-engineering prompt pipelines (the "agentic trap")
- Micromanaging agent output or forcing your style
- Reverting instead of fixing forward
- Not giving enough context (the agent starts from zero!)
- Ignoring long execution as feedback
- Mixing unrelated concerns in one session
- Using orchestration frameworks that remove the human from the loop
- **Reaching for orchestration layers preemptively** — GSD burned 1.2M tokens and 1h45m on a task that vanilla Claude Code handled in 20 minutes; the overhead is real and the quality difference is not *(Source: Chase AI)*
- **Bolting AI onto existing workflows without redesign** — produces the J-curve dip where productivity drops before it improves; most orgs mistake the dip for evidence AI doesn't work *(Source: Nate B Jones / Dan Shapiro)*
- **Trusting subjective AI productivity assessments** — the METR study shows developers are confidently wrong about both direction and magnitude of AI's impact on their speed *(Source: Nate B Jones / Dan Shapiro)*
- **Using `--dangerously-skip-permissions`** — this is a blanket bypass with no granularity; use `/permissions` to pre-allow safe commands by pattern instead, and check `.claude/settings.json` into the team repo *(Source: Boris Cherny, Creator of Claude Code)*
- **Skipping the verification feedback loop** — without tests/typecheck/lint in the loop, Claude is "basically guessing"; with a feedback loop quality is 2-3x higher *(Source: Boris Cherny, Creator of Claude Code)*

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Claude Code Permissions](claude-code-permissions.md)
- [Claude Routines](../tools/claude-routines.md)
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
- [Five Levels of AI Coding](../concepts/five-levels-of-ai-coding.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [Claude Code Status Line Setup](claude-code-status-line.md)
- [Auto Research](../concepts/auto-research.md)
