---
title: "Parallel Agent Patterns"
description: "Two coordination models for running many Claude agents in parallel: lock-file agent teams and hierarchical orchestrator-worker"
type: "concept"
pillar: "building"
tags: [agent-teams, parallel-agents, multi-agent, orchestrator-worker, claude-code, verification, memory, dreaming]
sources:
  - "summaries/2026-02-05_anthropic_building-c-compiler.md"
  - "summaries/2025-06-13_anthropic_multi-agent-research-system.md"
  - "summaries/2026-05-06_claude-code-docs_agent-teams.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
  - "summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md"
  - "summaries/2026-01-21_anthropic_agentic-coding-trends-2026.md"
  - "summaries/2026-06-29_nate-herk_stanford-storm-method-claude-research-skill.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md"
  - "summaries/2026-09-01_cole-medin_11-tiny-coding-agent-fixes-with-a-stupid-amount-of-payoff.md"
timestamp: "2026-09-03"
---

# Parallel Agent Patterns

Two complementary patterns for running many Claude agents in parallel. They differ in coordination model — **lock-file agent teams** (flat, peer-to-peer) versus **orchestrator-worker** (hierarchical, single lead) — but share the same enabling constraints: parallelizable work, strong verification, and value that justifies high token cost.

## Why Parallelism Becomes Necessary: The 5-Minute Threshold

Louis Knight-Webb's framing (Vibe Kanban, AI Engineer 2026) gives the *trigger condition* for reaching for any of the patterns below: once a single agent run routinely exceeds **~5 minutes of wall-clock time**, single-stream workflows break.

Run-length has been climbing fast — Copilot (seconds) → Cursor (~30s) → Claude Code 2024 (~1–2 min) → Claude Code 2025 (5–10 min). Humans can passively wait ~5 minutes (browse Twitter); beyond that, sitting and watching logs is wasteful enough to **destroy the productivity gain that long agent runs were supposed to deliver.** The fix is parallelism — the developer becomes a *manager of multiple parallel streams*, reviewing each in rotation rather than babysitting one.

This is the **time-axis** counterpart to the **context-axis** [Smart Zone](smart-zone.md) ~100K threshold. Smart-zone discipline tells you when to clear; the 5-minute threshold tells you when to parallelize. Vibe Kanban is Knight-Webb's productized worktree-based instantiation, in the same family as Sandcastle (Pattern 4 below).

The corollary is the [Focus Maxing](focus-maxing.md) anti-pattern — splitting tasks into 30-second prompts to keep yourself "in control" violates the threshold from below and produces the worst of both worlds: short runs *and* fragmented attention. The fix is to extend the run-length, not shorten it.

## Pattern 1: Agent Teams with Lock-File Coordination

**Source: Nicholas Carlini — Building a C Compiler (Anthropic, 2026-02).**

16 parallel Claude Code agents operating in a shared Docker + Git repo, coordinated only by lock files on work items. No human in the loop, no lead agent. Produced a 100k-line Rust C compiler in two weeks across ~2,000 sessions. The resulting compiler builds Linux 6.9 on x86/ARM/RISC-V plus QEMU, FFmpeg, SQLite, Postgres, and Redis with a **99% test pass rate**.

### How It Works

- Shared repo, shared container
- Lock files mark tasks as claimed → prevents duplication
- Each agent runs a trivial loop-based harness — keep Claude continuously working
- **Most engineering effort went into test infrastructure, not orchestration**

### The Load-Bearing Insight

> "The task verifier must be nearly perfect."

Autonomous agents will solve whatever has clear feedback. If tests are weak, agents drift toward whatever passes the weak tests. The verifier, not the orchestrator, is the bottleneck.

### What It Couldn't Do

- No 16-bit x86 codegen
- Depends on GCC for final assembly/linking
- Less optimal output than production compilers
- Integration tasks (coordinating across modules) were especially hard — the coordination model has limits

### Implication

Large autonomous SWE is **feasible with strong verification**. Security-critical code still needs human review — the 99% pass rate hides the 1% that a malicious or lucky test gap would miss.

### Single-Agent Calibration Point: Rakuten / vLLM (7-Hour Run)

A complementary data point from Anthropic's 2026 Agentic Coding Trends Report, for what a *single* well-equipped agent can do on a real codebase rather than a 16-agent fleet:

> Claude Code completed an activation-vector-extraction implementation in vLLM — a **12.5M-LOC multi-language repo** — in **7 hours of autonomous work, in a single run, with 99.9% numerical accuracy** vs. the reference method.

Read alongside Carlini's 16-agent compiler, this is the **single-stream** calibration point: long autonomous runs against production-sized codebases are viable for well-defined, numerically-verifiable tasks. The pattern decision (single long run vs. fleet of short ones) follows the same verification logic as the lock-file team — strong, automatic verification is what makes the autonomy safe. *(Source: Anthropic 2026 Agentic Coding Trends Report.)*

## Pattern 2: Orchestrator-Worker Multi-Agent Research System

**Source: Anthropic Engineering — How we built our multi-agent research system (2025-06).**

A **lead Opus agent** develops a research strategy and spawns **parallel Sonnet workers** on different sub-questions. The lead then synthesizes worker findings into a final answer. This is the canonical concrete example of the orchestrator-worker pattern from [Agent Orchestration Patterns](agent-orchestration-patterns.md).

### Published Results

- **+90.2% improvement** over single-agent Opus 4 on research tasks
- **~80% of variance** in quality explained by token usage (more search = better answers, up to a point)
- **15× more tokens than chat** — this is the cost floor

### The 15× Cost Rule

Orchestrator-worker is only worth it when **task value > 15× baseline cost AND the task is genuinely parallelizable**. Before going multi-agent, check both conditions. Parallelizing a sequential task wastes tokens without gaining quality.

### Eight Prompt-Engineering Principles (Anthropic)

1. Build accurate mental models of agent behavior
2. Teach orchestrators detailed delegation
3. Embed scaling rules (effort ↔ query complexity)
4. Design tools with clear purpose and descriptions
5. Let agents improve their own prompts via feedback
6. Broad → narrow search strategy
7. Use extended thinking as a planning mechanism
8. Parallel tool calling (-90% research time)

### Evaluation Must Be Outcome-Based

Don't prescribe the path — score the output. LLM judges evaluated factual accuracy, citation quality, completeness, and source authority. Path-based evals penalize creative strategies.

### Production Hardening

Required for any real deployment:
- Durable error handling (agent crashes mid-research)
- Observability (what did each worker actually do?)
- Rainbow deployments (swap prompts without dropping in-flight sessions)
- Source-quality steering (agents preferred SEO content farms until prompts forced otherwise)

## Pattern 3: Claude Code Agent Teams (Productized Peer-to-Peer)

**Source: Claude Code Docs — Agent Teams (2026-05).**

The May 2026 docs ship an experimental productized version of peer-to-peer parallelism inside Claude Code itself: **agent teams** coordinate multiple full Claude Code sessions with a shared task list and a shared mailbox. Architecturally distinct from subagents:

- **Subagents = hub-and-spoke** — children only report back to the main agent.
- **Agent teams = peer-to-peer** — teammates can message each other directly.

The trigger to graduate from subagents to agent teams, per Anthropic's docs: "when you find yourself wishing subagents could share findings with each other" *(Source: Claude Code Docs — Agent Teams, 2026-05)*. That remains the right default for genuinely iterative work — competing-hypotheses debugging, where a teammate must revise its position after being challenged, is exactly what peer messaging buys.

But "wishing they could talk" has a cheaper middle rung, and STORM is the worked example of it. Nate Herk's `storm-research` skill wants adversarial cross-examination between five lenses and cannot have it — subagents can't message each other — so it does the cross-examination **centrally**, in a single contradiction-map prompt run over the sealed lens outputs. His read: STORM "gets most of the adversarial benefit anyway" *(Source: Nate Herk, `storm-research` skill, 2026-06)*. The cost is bounded and the topology stays hub-and-spoke.

So the graduation ladder is three rungs, not two:

1. **Plain subagents** — workers report back; the lead concatenates.
2. **Subagents + a central contradiction pass** — workers report back sealed; one downstream prompt cross-examines their outputs against each other. Buys disagreement-surfacing at roughly one extra prompt. Ceiling: the challenge is one-shot over frozen positions — no worker ever responds to being contradicted.
3. **Agent teams** — peer messaging. Pay the linear per-teammate cost when a worker must *revise* in response to being challenged, i.e. when the value is in the back-and-forth rather than in surfacing the disagreement once.

The discriminating question is therefore not "do I wish they could talk?" but **"does a worker need to change its answer after hearing the objection?"** If surfacing the conflict is enough, rung 2 does it for a fraction of the cost. If the answer must survive rebuttal *and revision* — a proposed fix that has to be defended, amended, re-attacked — rung 3 is the correct spend, and rung 2 will silently ship the un-revised position.

### Strongest Use Case: Competing Hypotheses Debugging

Anthropic explicitly recommends the **scientific debate** pattern: spawn 3-5 teammates with different hypotheses, prompt them to actively try to disprove each other, converge faster than sequential investigation. This is a productized version of what Carlini's lock-file team would do informally — but with built-in messaging instead of just shared filesystem.

### Constraints

- Token cost scales **linearly** with teammate count (each is a full Claude Code instance).
- Recommended starting point: 3-5 teammates.
- Teammates do NOT inherit the lead's conversation history — spawn prompts must be self-contained.
- One team per session; no nested teams; lead is fixed for the session's lifetime.
- Three new hooks for control: `TeammateIdle`, `TaskCreated`, `TaskCompleted`.

See [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md) for the full how-to including `Shift+Down` cycling and the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` enable flag.

## Pattern 4: Sandcastle — Worktree+Sandbox AFK Pipeline (Pocock)

**Source: Matt Pocock — AI Engineer 2026.**

A TypeScript library for parallelized AFK ("Away From Keyboard") execution. Each Kanban issue runs in its own **git worktree** inside a **Docker sandbox**; the run loop is `planner → per-issue implementer → reviewer → merger`. Public TS library.

> **Sibling instantiation:** **Vibe Kanban** (Louis Knight-Webb, BloopAI) implements the same family of pattern — worktree-based parallel agents with a Kanban-style review queue — but as an interactive UI rather than a TS library. Both target the [5-minute threshold](#why-parallelism-becomes-necessary-the-5-minute-threshold) condition above. The difference is shape: Sandcastle is a programmable AFK pipeline; Vibe Kanban is a real-time multi-stream review surface. Pick by whether your work is genuinely AFK or genuinely interactive.

### Pipeline

```typescript
// Planner reads the Kanban DAG, returns the next batch with no unmet blockers
const issues = await planner.run({ prompt: planPrompt, backlog })

// Per-issue implementer in worktree+sandbox, Sonnet
const branches = await Promise.all(issues.map(issue =>
  sandbox.run({
    issue,
    branch: `issue-${issue.number}`,
    model: "sonnet",
    prompt: implementerPrompt,         // pull-style: skills available on demand
  })
))

// Reviewer with FRESH CONTEXT and pushed coding standards, Opus
const reviewed = await reviewer.run({
  prompt: reviewPrompt,                // push-style: standards in the prompt
  model: "opus",
  branches,
})

// Merger resolves conflicts, type errors, test failures across branches
await merger.run({ prompt: mergePrompt, branches: reviewed, issues })
```

### Why It Differs from the Other Three Patterns

| Dimension | Sandcastle |
|-----------|------------|
| Coordination | Hierarchical (planner dispatches, reviewer gates, merger settles) |
| Isolation | One worktree + Docker sandbox per issue |
| Verification | Reviewer is a separate agent invocation with fresh context — not self-review |
| Model split | Sonnet for implementation, Opus for review (inverted from intuition) |
| Trigger | Kanban DAG with `blocked_by` frontmatter — work fans out only along the next "phase" of the DAG |

Architecturally a variant of orchestrator-worker, but the evaluator-optimizer loop is structurally explicit: the reviewer can reject, and the merger can defer. The DAG (rather than a numbered phase plan) is what admits the parallelism — see [Agentic Coding Workflow § The Pocock Pipeline](../how-tos/agentic-coding-workflow.md#the-pocock-pipeline-grill--prd--kanban--loop).

### Push vs Pull Rule for Coding Standards

A representational decision worth quoting:

- **Implementer pulls** — skills sit in the repo; the agent reaches for them on demand.
- **Reviewer gets pushed** — standards inlined into the review prompt verbatim, because a reviewer with fresh context can't be relied on to discover the "what good looks like" doc.

This is the same fresh-context-reviewer principle from [Reviewer Agents](reviewer-agents.md), implemented as a prompt-construction policy rather than a CI configuration.

### When to Reach for Sandcastle

- You have a real Kanban DAG with multiple unblocked issues.
- Each issue is small enough to fit comfortably inside the smart zone (~100K tokens; see [Smart Zone](smart-zone.md)).
- You can afford the merge cost — at high parallelism, merges become a sub-problem of their own.

When you can't, fall back to single-stream Ralph or the lock-file pattern.

## Pattern 5: Persona Fan-Out with a Verification Fleet (STORM)

**Source: Nate Herk — `storm-research` Claude skill (2026-06).**

A research-domain instantiation of orchestrator-worker with two features the coding-oriented patterns above don't have: the workers are differentiated by **persona** rather than by work item, and a **separate verification fleet** re-checks their output before delivery.

Shape: five persona lenses (practitioner / academic / skeptic / economist / historian) run in parallel as subagents on the same topic → a contradiction-map prompt cross-examines their sealed outputs → synthesis → ~6 verification agents check every citation against its primary source and label it `confirmed` / `corrected` / `demoted`. Roughly 12 agents per run.

Three properties worth carrying into other fan-out designs:

- **Fan-out is fixed, not data-driven.** A constant persona count makes cost and rate-limit exposure predictable per run — unlike a Kanban DAG or a lock-file queue, where the fan-out width is whatever the backlog happens to be. If you widen the roster, widen the verification budget with it.
- **Differentiation lives in the prompt, not the work split.** All workers see the same input; only their persona differs. This is what buys coverage of questions no single research plan would think to ask.
- **Verification is a distinct phase with its own agents.** The generating lenses are optimizing for evidence supporting their angle, so the audit is performed by agents that did not produce the claims — the same maker-checker split as Sandcastle's fresh-context reviewer, applied to facts rather than diffs.

Because the lenses are subagents, they cannot message each other: all cross-examination happens once, centrally, in the contradiction-map prompt, over frozen outputs. No lens responds to being contradicted. See [Multi-Perspective Research (STORM Pattern)](multi-perspective-research.md) for the full four-prompt chain, the per-stage model split, and the caveats on its published benchmark.

## Pattern 6: Dynamic Workflows — Model-Decided Fan-Out (Cherny)

**Source: Boris Cherny — Y Combinator, 2026-07.**

The productized Claude Code primitive, invoked by saying **"use a workflow."** Bun is used as a sandbox, a VM runs inside it, and Claude orchestrates agents within that VM in a **fan-out → verify/summarize → fan-out** shape [26:09-26:29], at thousands-to-tens-of-thousands of agents per task [24:50-24:57].

What distinguishes it from Patterns 1-5 is **who decides the fan-out width and when**:

| | Patterns 1-5 | Dynamic workflows |
|--|-------------|-------------------|
| Fan-out width | Set by your backlog (Kanban DAG, lock-file queue) or a fixed roster (STORM's five personas) | Decided by the model, at runtime, from the task |
| Structure | Authored before the run — a DAG file, a pipeline, a persona list | Composed on the fly from two primitives |
| Interface | Configuration | *"Essentially an algebra for agents"* — run in sequence, run in parallel, compose [26:29-26:47] |

The cost-predictability trade is the mirror image of STORM's fixed roster (Pattern 5): a fixed persona count makes per-run cost and rate-limit exposure predictable; a model-decided composition does not. Reach for a workflow when the decomposition is the thing you can't specify in advance; keep an authored DAG when you need to budget the run.

Cherny's larger claim — that this constitutes a genuinely **new axis of test-time compute**, pushable without waiting for a new model — is developed on [Dynamic Workflows](dynamic-workflows.md), along with the reasons to hold it at arm's length.

## When to Use Which

| Dimension | Lock-file agent teams | Orchestrator-worker | Claude Code Agent Teams | Sandcastle |
|-----------|----------------------|---------------------|------------------------|-----------|
| Coordination | Flat, peer-to-peer | Hierarchical | Peer-to-peer with shared task list + mailbox | Hierarchical with explicit reviewer gate |
| Task fit | Large codebase of independent units | Research / decomposable questions | Multi-domain debugging, parallel reviews, cross-layer features | Implementing a vertical-slice DAG of feature tickets |
| State | Shared git repo | Transient, per-query | Per-session + shared task list | Per-issue worktree + Docker sandbox |
| Verification | Tests in CI | LLM judge on outputs | Whatever you wire into the team | Fresh-context Opus reviewer + merger |
| Human loop | None during run | None during run | Active steering recommended (status can lag) | None during run (AFK) |
| Primary risk | Verifier gaps → drift | Token cost / false parallelism | Linear cost in teammate count | Merge complexity at high parallelism |
| Maturity | Production research demo | Production at Anthropic | Experimental, disabled by default | Public TS library, demoed |

## Shared Principles

- **Verification beats orchestration.** In both patterns, the quality ceiling is set by how well you can tell good output from bad. Cherny states the strong form of this from inside Anthropic: *"You don't need slash goal, you don't need slash loop. These help, but really all you need is give the model the task, give it a way to verify the output of its work so it doesn't get stuck, and it will just go"* [22:33-22:48]. Read alongside Carlini's *"the task verifier must be nearly perfect"* — same conclusion, opposite ends of the orchestration-complexity spectrum.
- **Parallelism is expensive.** 15× tokens (research system) or 2,000 sessions (compiler). Only justified for high-value work.
- **Keep coordination thin.** Lock files or lead-agent dispatch — not elaborate messaging protocols.
- **Most effort is not in the agent.** It's in tests, tool descriptions, and the evaluation loop.
- **Give each agent only its slice.** See [Group-Think as a Multi-Agent Failure Mode](#group-think-as-a-multi-agent-failure-mode) below — context isolation is a correctness requirement, not only a cost tactic.

## Group-Think as a Multi-Agent Failure Mode

Frank Coyle (UC Berkeley, Aug 2026) names a failure mode that the cost-based arguments for context isolation do not cover: agents that collaborate **converge**.

> "When you get a bunch of agents together collaborating and talking to each other, there's a tendency to have group think. And all the agents seem to kind of devolve into one idea." [14:25]

His analogy is social rather than technical — *"you're at a party, and everybody wants pizza except you, but then people talk you into — you don't want to spoil the party, so you'll go along. And it seems that agents kind of work in the same way"* [14:42].

**Why this is a distinct argument.** The usual case for isolating context runs on two chains, both of which Coyle also states: *"context means tokens, tokens mean money, and the more context you have, the more confused the LLM is going to be in giving you an answer"* [13:16] — an economic chain and an accuracy chain. Group-think is a third, **epistemic** chain, and it licenses a stricter design response:

| Chain | Claim | Satisfied by |
|---|---|---|
| Economic | More context → more tokens → more cost | Summarising what you pass downstream |
| Accuracy | More context → more confusion → worse answers | Summarising what you pass downstream |
| **Epistemic** | Shared reasoning → convergence pressure → the reviewer can no longer judge independently | **Withholding a whole category of information** |

A faithful summary of the parent's reasoning still transmits the convergence pressure. Only *not passing it* removes it. This is why Coyle's prescription is categorical rather than proportional — **"every agent gets its own slice"** [15:05]. A critic sub-agent receives the *claim* and the *evidence*, but explicitly not *"the thought processes that went in to creating this claim"* [14:18]:

```python
critic(claim=claim, evidence=evidence)
# NOT passed: the reasoning trace that produced the claim — that is the group-think vector
```

**How this lands against the patterns above.** It sharpens the hub-and-spoke case in [Agent Orchestration Patterns § Hub-and-Spoke vs Peer-to-Peer](agent-orchestration-patterns.md#hub-and-spoke-vs-peer-to-peer-subagents-vs-agent-teams): the "central contradiction pass over **sealed** subagent outputs" works precisely because the outputs are sealed. It also adds a cost to graduating to peer-to-peer agent teams that the maturity table does not price — direct teammate messaging is the channel group-think travels down. Graduating buys revision-in-response-to-challenge and pays for it in independence.

Coyle offers no measurement of the effect, and the pizza-party analogy is an intuition rather than evidence. Treat it as a well-motivated design default, not a quantified finding. *(Source: Frank Coyle, AI Engineer 2026-08-08)*

## Shared Memory Across the Fleet

Once you have many agents running in parallel, *shared state* becomes its own problem. The lock-file pattern uses Git as the coordination surface; orchestrator-worker keeps workers transient; agent teams add a shared task list and mailbox. But none of those address the *learning* question: how do agents share what they discover with the next batch and with each other?

Anthropic's May 2026 memory work (Mahes, Platform team) gives this its own primitive layer with three multi-agent-specific concerns:

| Concern | Mechanism | When it matters |
|---------|-----------|-----------------|
| **Access control** | Permission scopes per memory store. Canonical pattern: read-only org-wide knowledge + read-write per-task working memory. | Any setup where some agents shouldn't be able to overwrite shared knowledge — i.e., most multi-agent deployments. |
| **Concurrent writes** | Optimistic concurrency: content-hash preconditions; mismatched writes rejected. | Hundreds-to-thousands of agents writing the same store. Locks would serialize; OCC lets them race and retry. |
| **Cross-session patterns** | **[Dreaming](dreaming.md)** — out-of-band consolidator that mines transcripts across sessions. Surfaces patterns invisible from any one session ("five agents all hit the same 60-second retry"). | Past the point where ad-hoc on-task writes can't keep the store coherent. |

The architectural point: a working agent only sees its own session. Cross-agent patterns are **invisible from inside any one session** — they only exist when you look at a corpus of sessions together. Dreaming is the named instantiation of the out-of-band consolidator that owns that perspective; the same pattern is buildable without the product (cron job + single agent reading N transcripts → diff against memory store).

**Practical implication for the patterns above:** Carlini's 16-agent lock-file C compiler, Anthropic's orchestrator-worker research system, Claude Code agent teams, and Sandcastle's worktree pipeline all benefit from a separate consolidation pass over recent transcripts — even when each individual agent's task is well-bounded. The consolidator is what keeps a shared memory store usable past the toy-deployment phase. See [Agent Memory Systems § The Platform View](agent-memory-systems.md#the-platform-view-memory-as-a-primitive-anthropic) and [Dreaming](dreaming.md).

## Measuring What Parallelism Actually Costs You

The [15× cost rule](#the-15-cost-rule) says parallelism is only worth it above a value threshold. Medin (Sep 2026) points out the practical problem with applying it: **you have no felt sense of the bill.** Fan-outs and sub-agents "cost you way more tokens than you think" [10:13], and the cost lands as a rate limit rather than an invoice, so the connection back to the decision is easy to miss.

**The instrument.** In Claude Code, `/usage` then `W` shows the weekly limit broken down by concurrency. Most agents expose an equivalent. Medin's own reading: **39% of his weekly limit was consumed while running 4+ sessions in parallel** [10:31] — despite parallel work being the exception rather than his normal mode. That is the number worth reproducing on your own account before assuming a fan-out is cheap.

**The specific trap in Claude Code** is unrequested fan-out: it is "way too prone to just spinning up even dozens of sub-agents without you asking" [10:51]. So the cost is not always a decision you made — it can be a default you failed to constrain, which makes the measurement more important, not less.

**What Medin is *not* saying.** He is explicit that sub-agents are valuable and that context isolation is a real benefit: they are "really important for protecting the context of your main agent" [11:08]. His complaint is calibration — the ease of reaching for them versus their invisible cost, and the fact that everything loaded into a sub-agent session "just disappears forever" [11:16]. Read this as the enforcement mechanism for the 15× rule rather than an argument against the patterns on this page. *(Source: Cole Medin, 2026-09-01)*

## Unresolved Tensions

### Are coordinators a legitimate rung, or an attractive dead end?

*Surfaced 2026-09-03.*

This page treats peer-to-peer coordination as the top rung of a calibrated ladder — expensive, narrowly indicated, but real. Cole Medin (Sep 2026) rejects the rung outright. He flags it as the one hot take in his set, and it is the only claim in that video he argues by assertion rather than mechanism.

**Existing position** *(Anthropic multi-agent research system; Claude Code docs May 2026; Nate Herk / STORM; Cherny — see [Pattern 3](#pattern-3-claude-code-agent-teams-productized-peer-to-peer))*:

> "**Agent teams** — peer messaging. Pay the linear per-teammate cost when a worker must *revise* in response to being challenged, i.e. when the value is in the back-and-forth rather than in surfacing the disagreement once. […] The discriminating question is therefore not 'do I wish they could talk?' but **'does a worker need to change its answer after hearing the objection?'**"

Backed on this page by [Pattern 1](#pattern-1-agent-teams-with-lock-file-coordination): 16 lock-file-coordinated agents producing a 100k-line Rust C compiler at a 99% test pass rate.

**New position** *(Cole Medin, 2026-09-01, [13:10-14:25])*:

> "There are a ton of super fancy elaborate frameworks out there for having some kind of team lead that is distributing work and having the agents communicate with each other. **This is not reliable. You don't need it.** In fact, Claude has their own version of this with agent teams that they have left as experimental for months and months. And they've done that for a reason. […] You don't need teammates, a shared task list, a mailbox that they port messages into. This all sounds really, really cool, but **it's not how you build production-grade software**."

**His alternative** is not "no parallelism" — it is parallelism without coordination machinery: keep the main agent as a **pure delegator** that takes plain-English intent and dispatches background agents or workflows, with no inter-agent messaging and no monitoring layer. "There's a lot more reliability here when this is purely a delegator" [14:11]. That is architecturally close to [Pattern 2's](#pattern-2-orchestrator-worker-multi-agent-research-system) hub-and-spoke topology and to the "cheaper middle rung" this page already describes — the disagreement is narrower than the rhetoric suggests.

**What each side rests on.** The existing position rests on published results with numbers. Medin's rests on practitioner experience plus one appeal to authority — Anthropic has kept agent teams experimental for a long time, therefore the approach is unreliable — with no failure mechanism offered, unlike the rest of his tips. Against that, he has an implicit cost argument that this page independently corroborates: coordination multiplies parallel sessions, and parallel sessions are what consumed 39% of his weekly limit (see [Measuring What Parallelism Actually Costs You](#measuring-what-parallelism-actually-costs-you)).

**What would resolve it.** The two positions may not actually conflict: the wiki gates the rung on *"must a worker revise after being challenged?"*, and Medin may simply be claiming that gate almost never opens on real production work. Evidence that would settle it: a production coding workload where peer messaging measurably beat a pure delegator at equal token spend — or a documented count of how often that gate opens in practice.

## Related Pages

- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the five canonical patterns these instantiate
- [Claude Code](../tools/claude-code.md)
- [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md) — how-to for the productized peer-to-peer pattern
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — the hub-and-spoke alternative
- [Harness Engineering](harness-engineering.md)
- [Smart Zone](smart-zone.md) — why each stage runs in its own fresh context
- [Reviewer Agents](reviewer-agents.md) — fresh-context-per-reviewer principle Sandcastle implements
- [Matt Pocock](../people/matt-pocock.md) — Sandcastle author
- [Plan and Review](plan-and-review.md) — Knight-Webb's frame; the 5-minute threshold lives here
- [Focus Maxing](focus-maxing.md) — the anti-pattern parallelism is the cure for
- [Louis Knight-Webb](../people/louis-knight-webb.md) — Vibe Kanban author
- [Agent Memory Systems](agent-memory-systems.md) — multi-agent memory primitives: permission scopes, OCC, version history
- [Dreaming](dreaming.md) — out-of-band consolidator that owns the cross-session perspective
- [Multi-Perspective Research (STORM Pattern)](multi-perspective-research.md) — Pattern 5 in full: persona fan-out, contradiction map, verification fleet
- [Dynamic Workflows](dynamic-workflows.md) — Pattern 6 in full: algebra for agents, the test-time-compute argument
- [Boris Cherny](../people/boris-cherny.md) — dynamic workflows, verification-over-orchestration
