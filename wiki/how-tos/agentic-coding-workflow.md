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
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
last_updated: "2026-04-22"
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

## Removing Humans from PR Review (Ryan Lopopolo, OpenAI)

At OpenAI scale (3-5 PRs/engineer/day, ~1B output tokens/day), synchronous human review is the merge bottleneck. Ryan's team removed humans from the critical path by converting every recurring review comment into a durable repo artifact:

1. **Reviewer agents per persona, triggered on every push.** One agent per durable concern — reliability, front-end architecture, product-minded, scalability. Each reads a "what good looks like" persona doc + the diff and posts P2+ issues. Replaces synchronous human review as the merge gate. See [Reviewer Agents](../concepts/reviewer-agents.md).
2. **Code-as-text structural tests.** Assert properties of the source code itself — files ≤350 lines, no duplicate zod schemas, one canonical async helper, package privacy, dependency direction. Sits between lints and unit tests. See [Code-as-Text Structural Tests](../concepts/code-as-text-structural-tests.md).
3. **Error messages as prompts.** Every lint/test failure is a free prompt-injection surface. Rewrite diagnostics as remediation-oriented prompts: "Don't X here because Y. Do Z instead, using helper W." Include the *why* so the agent generalizes.
4. **Garbage collection day (weekly).** Dedicate a full day per week where every engineer converts the week's repeated review comments into durable artifacts: a lint, a structural test, a reviewer-agent rule, or a persona-doc update. This is what makes reviewer agents compound instead of stagnate.
5. **QA plans as rubrics.** Every user-facing PR attaches a QA plan — features, critical user journeys, required PR media (screenshots, recordings). A product-reviewer agent asserts the plan was followed. Lets humans stop shoulder-surfing.

**Order of preference for encoding review knowledge** (deterministic → judgment-based): lint rule → structural test → reviewer agent → persona doc read by a human. Push every concern as far down the ladder as it will go.

**Non-blocking by design.** Not every reviewer comment blocks merge. The implementation agent can acknowledge, defer, or reject — bias toward acceptance, not perfection.

*(Source: Ryan Lopopolo, OpenAI — AI Engineer 2026)*

## Repo Architecture for Agents (Ryan Lopopolo, OpenAI)

A 2-person team with agents needs "10,000-engineer-org" architecture — because the agent lacks the tacit domain knowledge a small human team would share verbally. Scale is set by agent cognition, not headcount.

- **Monorepo with many small packages** isolated by business-domain and stack-layer. Ryan's team runs a 750-package PNPM workspace.
- **Package privacy as an enforceable invariant**, not a convention. Lint (or structural-test) cross-package internal imports.
- **Filesystem-encoded domain boundaries.** The agent can't see what's not in the filesystem. If two domains need to stay separate, split them into separate packages with explicit public APIs.
- **Uniformity across the repo.** One way to do bounded concurrency. One ORM. One CI-script style. Appoint a dictator for one uniformity decision per month; fire off parallel agents to migrate the rest — migrations no longer hang open, because code is free.
- **Outside-in harness (agent as entry point).** Build the repo so the coding agent (Codex, Claude Code) is the entry point, not a guest in a dev shell. Skills — 5-10, not thousands — hide local tooling churn from the human.

*(Source: Ryan Lopopolo, OpenAI — AI Engineer 2026)*

## Repo Knowledge Base (Ryan Lopopolo, OpenAI — written article)

The companion OpenAI article adds a specific pattern for how the knowledge an agent-generated repo needs is organized. AGENTS.md is demoted to a ~100-line **table of contents**, not an encyclopedia. The real knowledge lives in a structured `docs/` tree treated as a **system of record**.

Why the monolithic AGENTS.md failed (four modes the team lived through):

1. **Context is a scarce resource.** A giant instruction file crowds out the task, the code, and the relevant docs.
2. **Too much guidance becomes non-guidance.** When everything is "important," nothing is — the agent pattern-matches locally instead of navigating intentionally.
3. **It rots instantly.** A monolithic manual turns into a graveyard of stale rules the agent can't verify and humans stop maintaining.
4. **It's hard to verify.** A single blob doesn't admit mechanical coverage / freshness / ownership / cross-link checks.

Template `docs/` layout (from the article):

```
AGENTS.md                     # ~100 lines, map into docs/
ARCHITECTURE.md               # domain + layer map
docs/
├── design-docs/              # indexed, with verification status
│   ├── index.md
│   └── core-beliefs.md       # agent operating principles
├── exec-plans/               # first-class versioned execution plans
│   ├── active/
│   ├── completed/
│   └── tech-debt-tracker.md
├── generated/                # auto-generated reference (db-schema, etc.)
├── product-specs/
├── references/               # *-llms.txt snapshots of third-party docs
├── DESIGN.md
├── FRONTEND.md
├── PLANS.md
├── PRODUCT_SENSE.md
├── QUALITY_SCORE.md          # grades per domain/layer, gap tracking
├── RELIABILITY.md
└── SECURITY.md
```

A **doc-gardening agent** runs on a cadence, scans `docs/` for content that no longer reflects real code behavior, and opens fix-up PRs. CI linters block merges when cross-links or freshness metadata break.

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Architectural Layering for Agent-Generated Code (Ryan Lopopolo, OpenAI)

Within each business domain, enforce forward-only dependency flow through a named layer sequence:

```
Types → Config → Repo → Service → Runtime → UI
```

Cross-cutting concerns (auth, connectors, telemetry, feature flags) enter through a single explicit **Providers** seam. Every other edge is disallowed and enforced mechanically via custom linters (generated by Codex itself) and structural tests.

Ryan's framing: "this is the kind of architecture you usually postpone until you have hundreds of engineers. With coding agents, it's an early prerequisite: the constraints are what allows speed without decay or architectural drift."

Pair with **taste invariants** — static checks for structured logging, naming conventions for schemas and types, file size limits, platform-specific reliability requirements. Because the lints are custom, remediation instructions are embedded directly in the error text so the agent can self-correct on the next pass.

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Golden Principles + Continuous Garbage Collection

The article names the mechanism the talk calls "garbage collection Fridays": **golden principles** — opinionated, mechanical rules codified into the repo to keep the codebase legible. Examples:

1. Prefer shared utility packages over hand-rolled helpers (keeps invariants centralized).
2. Don't probe data "YOLO-style" — validate boundaries or rely on typed SDKs so the agent can't build on guessed shapes.

**The mechanism:** a background Codex task scans for deviations, updates quality grades in `docs/QUALITY_SCORE.md`, and opens small refactoring PRs. Most are reviewable in under a minute and automerged. "Technical debt is like a high-interest loan: it's almost always better to pay it down continuously in small increments than to let it compound."

This replaced the team's original manual Friday ritual (20% of the week spent cleaning AI slop) with a continuous agent-driven process. Use the Friday ritual to *seed* golden principles; promote each recurring rule into a scheduled enforcement agent.

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Per-Worktree Bootable App + Observability

Make the app bootable per git worktree so agents can launch one isolated instance per change. Wire Chrome DevTools Protocol into the agent runtime (DOM snapshots, screenshots, navigation). Expose logs/metrics/traces via an **ephemeral observability stack** (LogQL for logs, PromQL for metrics) torn down with the worktree.

This enables agent-verifiable prompts like "ensure service startup completes in under 800ms" or "no span in these four critical user journeys exceeds two seconds." Ryan's team regularly sees single Codex runs work a task for 6+ hours (often overnight).

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Reimplement Opaque Dependencies

When a third-party library's behavior is illegible to the agent and it keeps misusing the API, have Codex reimplement the subset the repo actually needs. Ryan's example: instead of `p-limit`, the team shipped their own `map-with-concurrency` — tightly integrated with OpenTelemetry, 100% test coverage, behaves exactly the way the runtime expects.

General principle: "boring" tech wins for agent-generated codebases because of composability, API stability, and training-set representation. When a dep doesn't fit that mold, reimplementation is often cheaper than ongoing workarounds.

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Throughput Changes the Merge Philosophy

At 3-5 PRs per engineer per day with agent execution, conventional merge norms become counterproductive:

- **Minimal blocking merge gates.** Reduce blocking checks to the ones with near-zero flake.
- **Short-lived PRs.** Long-lived branches guarantee merge conflicts in a high-velocity repo.
- **Handle flakes with retries, not blocks.** Re-run over re-investigating unless a pattern emerges.

"In a system where agent throughput far exceeds human attention, corrections are cheap, and waiting is expensive." This is irresponsible at low throughput and right at high throughput — pick based on your actual throughput, not inherited norms.

*(Source: Ryan Lopopolo, OpenAI — Harness Engineering article, Feb 2026)*

## Plan-Mode Skepticism (Ryan Lopopolo, OpenAI)

A counterpoint to Boris Cherny's "start every session in Plan mode." Ryan argues:

- Plans are long; most of the time the engineer won't read every line.
- Approving a plan is equivalent to approving every instruction in it.
- Unread approved plans encode unwanted instructions that the rollout faithfully follows — wasting tokens on bad work.

**Remedy if you must use plans:** ship the plan as its own PR, require line-by-line review, block on merge, then execute. This turns the plan into a durable, reviewed artifact rather than an ephemeral approval click.

**Default stance (Ryan):** skip the plan. Drop the ticket in. Let the agent implement. A well-specified ticket + a good harness should be sufficient — and if they aren't, the fix is in the harness, not the plan.

These two perspectives are not fully reconcilable. Reading the sources: Boris's context is interactive single-session work where the human-in-the-loop reads the plan. Ryan's context is high-velocity agentic execution where plans are often skimmed. Use Plan mode when you'll actually read it line by line; skip it when you won't.

*(Source: Ryan Lopopolo, OpenAI — AI Engineer 2026; contrast with Boris Cherny, Creator of Claude Code)*

## Remove Yourself From the Loop

Every manual "continue" or "yes" click is a harness failure — the agent lacked the context to proceed autonomously. When you catch yourself clicking through a checkpoint, stop and ask: what context was missing? Encode that context in a skill, CLAUDE.md, a persona doc, or a structural test so the agent proceeds autonomously next time.

**Token budget split.** Ryan's rough split is a third planning/ticket curation, a third implementation, a third CI. Writing code is no longer the hard part; getting it accepted is. If your CI token spend is <20% of total, you're under-investing in acceptance.

*(Source: Ryan Lopopolo, OpenAI — AI Engineer 2026)*

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
- [Reviewer Agents](../concepts/reviewer-agents.md)
- [Code-as-Text Structural Tests](../concepts/code-as-text-structural-tests.md)
- [Harness Engineering](../concepts/harness-engineering.md)
