---
title: "Agentic Coding Workflow"
description: "Step-by-step guide to productive agentic coding, synthesized from Peter Steinberger and Claude Code power-user practices"
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
  - "summaries/2026-05-06_claude-code-docs_best-practices.md"
  - "summaries/2026-05-06_claude-code-docs_how-claude-code-works.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
  - "summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
  - "summaries/2026-06-10_beyond-coding_engineers-solving-code-review-bottlenecks.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
timestamp: "2026-08-03"
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
9. **Spec quality is the new bottleneck — but the spec is the lever, not the enforcement.** When AI builds what you describe, ambiguity produces software that fills gaps with machine guesses, not customer-centric guesses. Practice writing specs detailed enough for an AI agent to implement without human intervention. *(Source: Nate B Jones / Dan Shapiro)* This makes spec quality the **highest-leverage human input** — but not a sufficient one on its own. Florian Buetow's counterpoint from trying it: pure spec-driven development drifts after ~5 minutes, because no spec is fully unambiguous and a static prompt gives the model no correction signal once it starts filling gaps its own way. The residual ambiguity gap is closed by **behavioral tests as an automated feedback signal** — spec + TDD-style behavioral tests fed back through the loop was the first setup Buetow saw actually work. The two are complementary, not opposed: the spec is where the human encodes intent (the lever), and behavioral tests are the runtime enforcement that catches the drift the spec can't fully specify away. *(Source: Florian Buetow, Beyond Coding 2026)* The spec remains the durable artifact of *shared understanding*; the tests are what hold the machine to it.
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

## Anthropic's Canonical Best Practices (May 2026)

Anthropic's official Best Practices doc reorganizes the field's lessons around one root constraint: **context fills fast and performance degrades as it does.** The highest-leverage patterns:

### Verification Criteria — The Single Highest-Leverage Improvement

"Implement X" is weak. "Implement X, test cases are A→true, B→false, run the tests" is strong. Claude performs dramatically better when it can close its own feedback loop. Every task prompt should end with a verification instruction: "verify by running X" or "take a screenshot and compare to the design."

### Explore → Plan → Code → Commit (Canonical Workflow)

Use plan mode (read-only tools only) for exploration. **`Ctrl+G`** opens the plan in your editor. Then switch to implementation. Planning pays off most when you're unfamiliar with the code or the change spans multiple files. **For any change touching 3+ files or unfamiliar code, start in plan mode.**

### CLAUDE.md Quality Rules

| Include | Exclude |
|---------|---------|
| Bash commands Claude can't guess | Things Claude can figure out from reading code |
| Style rules that differ from defaults | Standard conventions |
| Test runners | Frequently-changing info |
| Repo etiquette | Reference material that loads-when-needed |

Add **"IMPORTANT"** or **"YOU MUST"** for high-adherence rules. Run `/init` to generate a starter. **Prune aggressively** — every line that doesn't change behavior wastes context.

### Course-Correct Early, Not Late

| Control | When to use |
|---------|-------------|
| `Esc` | Stop Claude mid-action with context preserved |
| `Esc Esc` / `/rewind` | Revert code |
| `/clear` | Reset context between tasks |

**The After-2-Corrections Rule:** if you've corrected Claude on the same issue twice, stop, `/clear`, and write a better prompt. Trying to fix in a polluted context is worse than restarting clean.

### Subagents for Investigation

"Use subagents to investigate X" keeps large file reads out of your main context. The subagent explores and returns a summary. Any task phrased as "investigate / explore / research" should explicitly use subagents.

### `/btw` for Side Questions, `/clear` Between Tasks

| Command | Purpose |
|---------|---------|
| `/btw <question>` | Answer in dismissible overlay without adding to context |
| `/clear` | Reset between unrelated tasks |
| `/compact <instructions>` | Compaction with custom focus |

Treat `/clear` like `git stash` — use between logically distinct tasks even when context isn't full.

### Fan-Out for Batch Operations

```bash
# Process multiple files in parallel sessions with restricted scope
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

**Test on 2-3 inputs before fanning out** to catch prompt issues cheaply.

### Writer / Reviewer Pattern

A fresh-context reviewer beats self-review. After the writer Claude finishes, spawn a reviewer Claude with a clean context and the output. The writer can't see its own blind spots; a fresh context can.

### Common Failure Patterns and the Fix

| Failure | Fix |
|---------|-----|
| Kitchen-sink session | `/clear` |
| Endless corrections | `/clear` + rewrite prompt |
| Over-specified CLAUDE.md | Prune aggressively |
| Trust-then-verify gap | Always include "and verify by X" |
| Infinite exploration | Scope, or delegate to subagent |

### Useful Side-Channel Commands

```bash
claude --continue            # resume most recent session
claude --resume              # pick from session list
claude -p "prompt" --output-format json   # one-off with structured output
```

## The Pocock Pipeline (Grill → PRD → Kanban → Loop)

Matt Pocock's end-to-end pipeline (AI Engineer 2026) is the most explicit named instance of a full daily workflow. Every stage is justified, every handoff is named, and the whole thing is built around keeping each stage inside the [smart zone](../concepts/smart-zone.md).

```
/clear → grill-me → /write-a-PRD → /PRD-to-issues → once.sh → ralph-loop → reviewer → QA
                                                                                       ↓
                                                                               new Kanban tickets
```

### Stage 1 — Grill-Me (interview, not plan)

Open with `/clear` then invoke a `grill-me` skill — a tiny prompt body that says "interview me relentlessly about every aspect of this plan… ask one question at a time… for each question provide your recommended answer." 22-100 questions is normal. The deliverable is a **shared design concept** (Brooks), not a plan document.

**Critical handoff:** do NOT clear context between grill and PRD. The 25K tokens of conversation are the asset, not a side-effect. See [Smart Zone](../concepts/smart-zone.md).

### Stage 2 — `/write-a-PRD` (destination doc, not journey doc)

Generate the PRD via skill. The PRD is a **destination document** — where we're going + definition of done — not a step-by-step plan. Two divergences from typical PRD practice:

- **Don't read it.** Reading the PRD tests the LLM's summarization ability, which is reliably strong. The alignment was established in grilling. See [PRD-as-Prompt § Don't Review the PRD](../concepts/prd-as-prompt.md).
- **Module list first.** Have the skill return the module map (new modules + modules to modify) before drafting prose, and confirm only that. See [Deep Modules § Module Maps in PRDs](../concepts/deep-modules.md#module-maps-in-prds).
- **Out-of-scope section.** Capture rejected options from grilling so future loops don't re-introduce them.

### Stage 3 — `/PRD-to-issues` (DAG, not phase plan)

Convert the PRD into local markdown issue files with explicit `blocked_by:` frontmatter. Form a DAG, not a numbered phase list. Why the DAG dominates:

- A numbered phase plan can only be picked up by one agent — degree-1 parallelism.
- A DAG admits multiple agents on independent branches.
- The DAG naturally encodes vertical slices ("tracer bullets" — Pragmatic Programmer); a phase plan naturally encodes horizontal layers.

**First-slice horizontal pushback:** The first draft typically over-clusters into horizontal slices ("all the schema first"). One round of "the first slice is too horizontal" usually fixes it without re-prompting from scratch. Keep that exact phrase as a paste-ready correction.

**Vertical-slice rule:** each issue must touch at least one new schema element AND one user-visible surface. The first ticket should produce a working end-to-end spine; subsequent tickets add to it.

### Stage 4 — Implementer Loop (`once.sh` first, then `ralph-loop`)

The implementer is a single prompt running in `--permission-mode accept-edits` (see [Claude Code Auto Mode](claude-code-auto-mode.md) for the related but distinct auto-mode classifier). Run `once.sh` manually one issue at a time before letting it loop. Why: prompt-tuning needs that an autonomous loop will hide.

**Implementer prompt priority order — hard-coded, in this order:**

```
Pick the next task using this priority:
1. Critical bug fixes
2. Development infrastructure
3. Tracer bullets (vertical slices marked AFK)
4. Polishing, quick wins, refactors

If no AFK tasks remain, output: "no more tasks"
```

This is so the agent never spends a night polishing while a broken test rots.

**AFK as a ticket category:** The Kanban issues carry an `AFK` tag. The night-shift loop only picks AFK-tagged tickets. AFK is a formal label inside the ticket schema, not just a vibe.

**Once-then-loop:** Ship `ralph-once.sh` to new contributors first, `ralph-loop.sh` second. The loop is just `while true; do once.sh; done` with checkpointing.

### Stage 5 — Reviewer (fresh context, Opus)

Critical: reviewer needs **fresh context**. If the implementer also reviews, the review happens in the dumb zone after implementation burned the smart zone. Clear before review.

**Model split (counter-intuitive):** Sonnet for implementation, Opus for review. Review is where you need the smarts; implementation can grind. See [Reviewer Agents § Fresh Context per Reviewer](../concepts/reviewer-agents.md).

### Stage 6 — QA (return to human, produce next batch)

QA is not the end of the loop — it's the source of the next batch of tickets. During QA, write findings directly as `issues/NN-bug-X.md` files with `blocked_by:` set to the implementation issue. The Kanban board accepts new blocking issues indefinitely.

### Don't AFK-Optimize the PRD

Anti-takeaway from Matt himself: putting deep-think cycles into PRD polishing is wrong — push that work into QA instead. Hard limit on how far the destination doc should be pushed.

### Skill Kit Behind the Pipeline

The pipeline is a stack of skills in `.claude/skills/`:

- `grill-me/` — the interview prompt body
- `write-a-PRD/` — destination-doc generation
- `PRD-to-issues/` — DAG generation with `blocked_by`
- `improve-code-base-architecture/` — the architecture lever (see [Deep Modules](../concepts/deep-modules.md))

The pipeline owns its planning stack as repo-local skills rather than depending on closed planning products. See [Agent Skills](../concepts/agent-skills.md).

### Unresolved Tensions

Matt names two open problems in his own pipeline:

- **Review batch size.** Ralph batched commits push toward larger PRs; the keep-PRs-small dictum pushes the other way. Verbatim: "I don't honestly know what the answer to this yet" [0:59:18].
- **PRD retention.** He recommends closing/deleting PRDs after implementation to avoid doc rot, but the migrations analogy ("are migrations also transient process artifacts?") is unresolved [1:24:40] — Matt: "I don't know… let's talk about it afterwards." Treat the always-delete rule as a working heuristic, not a verified principle.

*(Source: Matt Pocock, AI Engineer 2026)*

## The Cole Medin Pipeline (Ideate → PIV → Evolve)

Cole Medin's principled-agentic-engineer system (April 2026) is a complete, productised SDLC built as a chain of Claude Code commands plus an Atlassian MCP backbone for Jira integration. Every step is a Markdown procedure file in `.claude/commands/`; the AI layer (rules + commands + skills) is checked into source control with PR review.

```
brain dump → /create-prd → /create-stories  →   pick ticket → /prime → /plan → fresh session → /implement
                              (Atlassian MCP                                                        ↓
                               → Jira)                                                          outer loop
                                                                                            (system evolution)
                                                                                                    ↑
                                                                                       defect shipped or QA'd
```

### Three phases, two loops

The whole system fits in **three phases**: Ideate (brain dump → PRD → stories) → [PIV](../concepts/piv-loop.md) (per-ticket plan-implement-validate, pronounced "pivot") → Evolve ([system evolution](../concepts/system-evolution.md), retroactive AI-layer RCA when the agent slips).

Inside the three phases there are exactly **two loops**:

- **Inner loop (PIV).** Mode of normal forward progress. Per-ticket plan-implement-validate, no system intervention.
- **Outer loop (System Evolution).** Triggered when the agent ships a defect. Step *out* of the next PIV, patch the AI layer (rules / commands / on-demand context / plan-PRD templates), then re-enter PIV.

### The command chain

| Command | Phase | What it produces |
|---------|-------|------------------|
| `/create-prd <output-path>` | Ideate | A single PRD markdown file with executive summary, mission, target users, in-scope, out-of-scope, success criteria |
| `/create-stories <prd-path> <project-id> <epic-id>` | Ideate | Stories saved as markdown AND pushed to Jira via Atlassian MCP (or local-only if you skip the Jira args) |
| `/prime <ticket-ids>` | PIV (Plan) | Loads codebase context (recent commits, app routes, key features) + Jira-issue context for the picked ticket(s); detects blockers and dependencies |
| `/plan <description or ticket id>` | PIV (Plan) | `plan.md` — summary, locked decisions, files to create/update, task list, self-validation strategy (lint / type / unit / integration / e2e) |
| `/implement <plan-path>` | PIV (Implement + Validate) | **Always run in a fresh Claude session.** Branch + code + run validation + post implementation summary as Jira comment + open PR |

### Two-layer planning [38:54]

Project-level planning (PRD + stories) and task-level planning (`plan.md`) live in **separate context windows** with separate commands. Layer 1 is high-level (features, business logic, no code); layer 2 is in-the-weeds (codebase analysis, files to touch, validation strategy). Treat `/clear` as **mandatory** between the two — `plan.md` is the only thing that legitimately crosses. See [PIV Loop § Two-Layer Planning](../concepts/piv-loop.md#two-layer-planning-3854).

### Fresh session for `/implement` [52:43]

Even after a long, productive planning conversation, do not continue it for `/implement`. Open a new session, run `/implement plan.md`, and let the implementer re-derive intent from the artifact alone. Accumulated planning bias is the #1 cause of agents drifting from their own plan.

The deeper rule: **artifacts are the only legitimate input.** PRD, stories, `plan.md`, Jira ticket — those are the inputs to the next stage. Conversation history is not. If you can't run a step from artifacts alone in a fresh session, the artifact is incomplete; iterate the command, not the conversation.

### The 3+ times rule

> Anytime you find yourself prompting something more than three times, it becomes a command or skill.

Manual prompting on the fourth try is a smell. See [AI Layer § The 3+ Times Rule](../concepts/ai-layer.md#the-3-times-rule).

### The outer loop — bug = defect in the AI layer [57:45]

When the agent ships a defect, **do not start the next ticket.** Step out of PIV and run the [System Evolution](../concepts/system-evolution.md) outer-loop pass first. Cole's reusable trigger prompt:

> *"Claude, you allowed this problem to creep into my codebase. Dive into your AI layer — your rules, commands, and skills, the workflow I brought you through — and identify things we could improve so this kind of issue doesn't happen again."*

Ship the AI-layer-fix PR alongside the bug-fix PR. PR-review both. Skipping the AI-layer fix surrenders the compounding mechanism — every defect becomes a one-time cleanup instead of a permanent improvement to the layer.

### Atlassian MCP for Jira shops

The Atlassian MCP server is the integration backbone for teams where Jira is non-negotiable:

- `/create-stories` writes tickets with technical-notes comments
- `/prime` reads them and detects blockers / dependencies
- `/implement` posts an implementation summary as a comment and updates ticket status

**Set up via Claude Code itself:** *"Help me set up the Atlassian MCP server"* — Claude searches the web, pulls the config, creates `mcp.json`, sets it up. The setup itself is a Claude Code task, not a manual one. See [MCP § Atlassian MCP for Jira-backed PIV Loops](../concepts/mcp.md#atlassian-mcp-for-jira-backed-piv-loops).

### Sub-agents as context buffers

Cole's framing diverges from the common "sub-agents = parallelism" pitch: sub-agents exist primarily for **context budgeting**. A research task burns 30k–100k tokens; the parent only needs the 2k-token summary. With million-token windows now available, the discipline matters *more*, not less — *"just because you can fit a million tokens doesn't mean you should."* See [Context Engineering § Sub-Agents as Context Buffers](../concepts/context-engineering.md#sub-agents-as-context-buffers).

### Why off-the-shelf frameworks (BMAD / GSD / Cloudflow / spec-kit) are wrong for established SDLCs

Cole's argument [04:53-06:43]: these frameworks bake opinionated end-to-end strategies with their own conventions; established teams have processes they're not willing to throw out; the frameworks are bloated enough that adapting them is harder than starting simple.

**Recommendation:** start with **simple primitives** (rules + commands + skills) and *grow* the system into the team's existing process. The simplicity is the point — it's the only path to ownership. This is the AI-layer counterpart to the [orchestration-layer skepticism](../comparisons/claude-code-orchestration-layers.md): same instinct, applied one layer down.

*(Source: Cole Medin)*

## Plan and Review (Knight-Webb's Default Stance)

Louis Knight-Webb (Vibe Kanban, AI Engineer 2026) gives the **thesis-level** justification for everything above: as AI accelerates coding, the displaced time migrates into planning and reviewing, and the workflow question is which side of that ledger you spend your time on, **per task**. Knight-Webb provides three operational handles that sit above the specific pipelines (Cherny's plan-mode, Pocock's grill→PRD, Medin's PIV).

### The 5-Minute / 30-Minute Heuristic

> **"5 minutes of planning saves 30 minutes of reviewing."**

The default rule. When tempted to skip the plan, set a 5-minute timer for spec writing and ship the plan to the agent at the buzzer. It pays back in nearly all cases — the matrix below names the one that doesn't.

### The Work-Type Matrix

| | **Feature** | **Migration / Refactor** |
|--|------------|--------------------------|
| **Front-end** | **In-the-loop wins** — animations, interactions, styles, transitions; edge cases explode and can't be specced | Plan-heavy |
| **Back-end** | Plan-heavy / near-TDD — well-defined I/O | Plan-heavy — the canonical case |

**Front-end feature work is the named exception.** It is too stateful to spec exhaustively, so in-the-loop iteration is the lesser evil. Everything else: spec it, stay out of the loop.

The deeper rule: **don't pick a workflow style and apply it everywhere.** Pick per task using the matrix.

### The 5-Minute Threshold for Parallelism

The wall-clock duration of a single agent run has been climbing: Copilot (seconds) → Cursor (~30s) → Claude Code 2024 (~1–2 min) → Claude Code 2025 (5–10 min). Humans can passively wait ~5 minutes; beyond that, single-stream workflows break.

The fix is **parallel worktrees** (Vibe Kanban, Sandcastle, Cherny's two-pane setup). Once a task family routinely exceeds 5 minutes per run, run multiple agents in parallel and rotate review attention. See [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md).

This is the time-axis counterpart to the context-axis [Smart Zone](../concepts/smart-zone.md) ~100K threshold. Smart-zone tells you when to clear; the 5-minute threshold tells you when to parallelize.

### The Latency-vs-Accuracy Trade

Each tier of tooling raises run-length but improves accuracy: returning code (fast) → type-checker loop (slower) → Playwright/Chrome MCP for front-end QA (order of magnitude slower). Knight-Webb's framing: **the trade is worthwhile because the scarce resource is your time, not the agent's wall-clock.** Wire up the type-check loop; experiment with Playwright/Chrome MCP for front-end QA — Knight-Webb predicts it as the next major breakthrough within ~9 months from May 2026.

### The Four Jobs of the New Coding-Agent IDE

Most current tooling addresses **code generation** well and these four poorly:

1. **Task writing / planning** — author the spec the agent runs from.
2. **QA** — verify the change works, especially front-end behavior.
3. **Code review** — stays a human job for anyone with money on the line.
4. **Shepherding to deploy** — monitor PR comments, react to CI signals, drive "done" → "deployed."

Audit your own setup; the weakest surface is usually shepherd-to-deploy or front-end QA. Invest there next.

### Focus Maxing (Anti-Pattern)

Knight-Webb explicitly coins **"focus maxing"** as an **anti-pattern, not an aspiration** — tools and workflows that pull a human in and out of context every 30 seconds to babysit short agent runs. The right tool design lets each agent run **as long as possible and yield back cleanly.** If a workflow forces you to check on an agent more than once every 5 minutes, redesign it. See [Focus Maxing](../concepts/focus-maxing.md).

See [Plan and Review](../concepts/plan-and-review.md) for the full thesis page including the displacement argument and reconciliation with adjacent stances.

*(Source: Louis Knight-Webb, Vibe Kanban — AI Engineer 2026)*

## Build the Verification Substrate Before the Prompt (Cherny, July 2026)

The verification guidance above ("give the agent a feedback loop", "always include 'and verify by X'") treats verification as a *line in the prompt*. Cherny's July 2026 update treats it as **infrastructure you provision first**, and inverts the effort ratio:

> "How do you make it possible for Claude to verify its work along the way? And the verification I think is probably the single most important thing that people do not get right." [20:25-20:35]

**The routine, in order:**

1. **Answer one question before writing anything:** what artifact can the model inspect to know it's wrong? Test suite, screenshot diff, type check, fuzzer, numerical reference. **If there isn't one, build it first** — that is the task, not a prerequisite to the task.
2. **Provision the substrate.** For the 14+ day Electron→Swift rewrite this meant a macOS GitHub Actions runner (to run the VM) and an empty target repo — set up *before* prompting [21:00-21:33].
3. **Then write one paragraph:** task + guardrails + exit criteria.

The resulting prompt is short precisely because the loop carries the weight:

```
Rewrite the Electron app in Swift.
Run the Electron app in the Mac virtual machine, screenshot it,
and then look pixel by pixel, compare it to the Swift version.
Don't stop until you're done.
```

Cherny's gloss on why no orchestration was needed: *"You don't need slash goal, you don't need slash loop. These help, but really all you need is give the model the task, give it a way to verify the output of its work so it doesn't get stuck, and it will just go"* [22:33-22:48]. Note this is a claim about *well-verified* tasks — the [Pocock](#the-pocock-pipeline-grill--prd--kanban--loop) and [Medin](#the-cole-medin-pipeline-ideate--piv--evolve) pipelines earn their structure on work where the verifier is weaker or the decomposition is the hard part.

### Give It Tasks Slightly Too Hard — and Keep a "Not Yet Possible" List

The companion practice. Cherny's Bun example: the team had been using Claude only to *fuzz* for memory leaks case-by-case, but Jared retried the full Zig→Rust runtime rewrite on **every model release**. It first became possible with Fable — one prompt plus steering, 11 days, now in production, against a human estimate of *"definitely over a year"* [16:33-18:16].

**How to apply:** maintain a written list of concrete tasks that are currently out of reach, and re-run it on each model release. Bun was a good candidate partly because *"it's very, very well tested... it's easy to know if you did the right thing"* [17:16-17:24] — verification strength is what makes a too-hard task safe to attempt. See [Product Overhang and Hobbling](../concepts/product-overhang.md).

### When It Struggles: Diagnose the Failure Class

Escalate by *type*, not by weight [23:44-23:58]:

| Symptom | Fix |
|---------|-----|
| Wrong framing | Better prompt |
| Missing procedure | Skill |
| Missing context | MCP |

*(Source: Boris Cherny, Y Combinator 2026-07-27)*

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
- **Focus maxing** — tools and workflows that pull you in and out of context every 30 seconds to babysit short agent runs. Optimize for *contiguous* attention blocks, not 30-second bursts; redesign the harness if a workflow demands attention more than once every 5 minutes. See [Focus Maxing](../concepts/focus-maxing.md). *(Source: Louis Knight-Webb, Vibe Kanban)*
- **Defaulting to one workflow style for all tasks** — plan-heavy is wrong for front-end feature work (too stateful); in-the-loop is wrong for everything else. Use [the work-type matrix](#the-work-type-matrix) per task, not as a global default. *(Source: Louis Knight-Webb, Vibe Kanban)*

## Unresolved Tensions

Page-level tensions across sources. (The Pocock pipeline carries [its own two open problems](#unresolved-tensions) scoped to that pipeline.)

### How detailed should the spec handed to an agent be?

*Surfaced 2026-08-03.*

**Position A — detail is the thing you scale up.** [Source: `summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md` (Nate B Jones / Dan Shapiro), via [Core Principles](#core-principles) #9]

> "Practice writing specs detailed enough for an AI agent to implement without human intervention."

**Position B — detail is the characteristic senior-engineer failure mode.** [Source: `summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md`, [14:59-15:26]]

> "A really common mistake... they just give it like way over specific instructions... You want to describe the task, you want to describe the guardrails, you want to describe like the exit criteria, and then just let the model cook."

**Why this is held rather than merged.** The disagreement is load-bearing for daily practice, and both sides come with strong framing that resists smoothing. Shapiro's maturity ladder makes spec precision the defining skill of Levels 4-5 ("code is a black box"); Cherny says the instinct is *negative transfer* from pre-LLM engineering and that *"it's a journey to unlearn it"* [24:29-24:35], naming over-specification as self-inflicted [hobbling](../concepts/product-overhang.md) — the human's solution path crowding out the model's better one.

**Contested ground vs. common ground.** They do not disagree about everything:

- **Agreed:** ambiguity about *what* and about *done* is fatal. Cherny's "guardrails + exit criteria" and Shapiro's "spec precise enough to implement unattended" want the same thing here.
- **Contested:** *method* prescription. Whether "detailed enough to implement without human intervention" licenses step-by-step ordering is exactly what Cherny denies — *"you must do like one, then two, then three, then four"* [15:08-15:14] is his example of the mistake.

**The synthesis that was available and not taken:** "complete about *what* and *done*, minimal about *how*." Buetow's behavioral-tests bridge in principle #9 already does half this work by moving enforcement out of the spec and into the runtime loop. It is recorded here rather than written into the page because the two sources genuinely differ on whether spec detail is an asset to accumulate or a habit to unlearn — and a reader deciding how to write tomorrow's prompt is better served seeing both than seeing a reconciliation that neither author endorsed.

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
- [Smart Zone vs Dumb Zone](../concepts/smart-zone.md) — the context-discipline frame holding the Pocock pipeline together
- [Deep Modules](../concepts/deep-modules.md) — architecture lever powered by `/improve-code-base-architecture`
- [Matt Pocock](../people/matt-pocock.md) — pipeline author
- [Cole Medin](../people/cole-medin.md) — author of the Ideate → PIV → Evolve pipeline
- [PIV Loop](../concepts/piv-loop.md) — per-ticket Plan-Implement-Validate primitive
- [System Evolution](../concepts/system-evolution.md) — outer-loop AI-layer RCA pattern
- [AI Layer](../concepts/ai-layer.md) — global rules + commands + skills as one unit
- [Plan and Review](../concepts/plan-and-review.md) — Knight-Webb's thesis-level frame: 5-min/30-min, work-type matrix, time horizon
- [Focus Maxing](../concepts/focus-maxing.md) — the named anti-pattern from Knight-Webb's talk
- [Louis Knight-Webb](../people/louis-knight-webb.md) — Vibe Kanban founder; author of the plan-and-review framing
- [Boris Cherny](../people/boris-cherny.md) — verification-first, plan mode, permissions, ablation
- [Product Overhang and Hobbling](../concepts/product-overhang.md) — the "not yet possible" list as a product-overhang radar
- [Dynamic Workflows](../concepts/dynamic-workflows.md) — "use a workflow" for large decomposable tasks
