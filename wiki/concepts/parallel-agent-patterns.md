---
title: "Parallel Agent Patterns"
type: "concept"
pillar: "building"
tags: [agent-teams, parallel-agents, multi-agent, orchestrator-worker, claude-code, verification]
sources:
  - "summaries/2026-02-05_anthropic_building-c-compiler.md"
  - "summaries/2025-06-13_anthropic_multi-agent-research-system.md"
  - "summaries/2026-05-06_claude-code-docs_agent-teams.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
last_updated: "2026-05-08"
---

# Parallel Agent Patterns

Two complementary patterns for running many Claude agents in parallel. They differ in coordination model — **lock-file agent teams** (flat, peer-to-peer) versus **orchestrator-worker** (hierarchical, single lead) — but share the same enabling constraints: parallelizable work, strong verification, and value that justifies high token cost.

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

The trigger to graduate from subagents to agent teams: when you find yourself wishing subagents could share findings with each other.

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

- **Verification beats orchestration.** In both patterns, the quality ceiling is set by how well you can tell good output from bad.
- **Parallelism is expensive.** 15× tokens (research system) or 2,000 sessions (compiler). Only justified for high-value work.
- **Keep coordination thin.** Lock files or lead-agent dispatch — not elaborate messaging protocols.
- **Most effort is not in the agent.** It's in tests, tool descriptions, and the evaluation loop.

## Related Pages

- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — the five canonical patterns these instantiate
- [Claude Code](../tools/claude-code.md)
- [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md) — how-to for the productized peer-to-peer pattern
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — the hub-and-spoke alternative
- [Harness Engineering](harness-engineering.md)
- [Smart Zone](smart-zone.md) — why each stage runs in its own fresh context
- [Reviewer Agents](reviewer-agents.md) — fresh-context-per-reviewer principle Sandcastle implements
- [Matt Pocock](../people/matt-pocock.md) — Sandcastle author
