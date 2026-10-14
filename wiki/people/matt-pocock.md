---
title: "Matt Pocock"
description: "AI-coding teacher known for end-to-end pipeline design, the grill-me skill, and the Sandcastle library"
type: "person"
pillar: "ecosystem"
tags: [agentic-engineering, claude-code, ai-hero, sandcastle, education, workflow]
sources:
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md"
  - "summaries/2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro.md"
timestamp: "2026-10-14"
---

# Matt Pocock

AI-coding teacher and author of [AI Hero](https://aihero.dev). Previously known for *Total TypeScript*. Active practitioner and educator on coding-agent workflows, with a particular focus on **end-to-end pipeline design** rather than isolated tactics.

## Key Contributions

- **Grill-me skill** — a tiny, paste-able interview prompt that produces a **shared design concept** (Brooks) between human and agent before any code is written.
- **PRD-as-destination-doc** — using the PRD as a downstream artifact for the agent rather than something the human reads end-to-end. See [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md).
- **Kanban DAG** — replacing sequential phase plans with markdown-issue files and explicit `blocked_by` relationships, so AFK loops can run parallel agents on independent branches.
- **Structured Ralph variant** — adds a PRD + Kanban + priority-ordered implementer prompt over vanilla Ralph (see [Harness Engineering](../concepts/harness-engineering.md)).
- **Sandcastle** — TypeScript library for parallel AFK execution: planner → per-issue implementer in worktree+Docker → reviewer → merger. See [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md).
- **`/improve-code-base-architecture` skill** — surfaces shallow-module clusters to collapse into [Deep Modules](../concepts/deep-modules.md). His "if you take one thing away from today" line.
- **The no-ops finding** — AI-generated skills are dense with instructions that change nothing about agent behaviour ("write clear, high-quality code"). Published as a tweet plus a skill for stripping them. Credited by Philipp Schmid (Google DeepMind, July 2026) as one of the eight rules for writing effective skills; the cost is pure token waste on every load, not degraded output. See [Skill Evaluation § No-ops](../concepts/skill-evaluation.md#no-ops). [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]
- **Skills repo v1.3 (October 2026)** — three new skills plus one rename. [Source: 2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro]
  - **`/implement-spec`** — an orchestrator agent works through a spec's tickets as a task graph, hands each unblocked ticket to an implementer sub-agent in its own worktree (TDD), merges each into an integration branch, runs code review at the end and delivers one PR. User-invoked only. See [Parallel Agent Patterns § /implement-spec](../concepts/parallel-agent-patterns.md#implement-spec--the-same-pipeline-with-an-agent-running-the-loop-pocock-v13).
  - **`/pr`** — a PR body template: Summary (a visual), Evidence (before/after), Merge Danger (one-way or two-way door, plus blast radius). The visuals guidance is copied, with credit, from Dex Horthy's `show-me` skill. See [Plan and Review § PR Bodies Built for the Human Reviewer](../concepts/plan-and-review.md#pr-bodies-built-for-the-human-reviewer-pocock-pr).
  - **`/retro`** — reviews real coding-agent sessions and proposes improvements to the repo and agent setup. User-invoked only. See [Agent Session Retrospective](../concepts/agent-session-retro.md).
  - **CONTEXT.md renamed to GLOSSARY.md** — the domain-modeling skill's output file. A breaking change for users of his skills, which now expect GLOSSARY.md. See [Context Engineering § File Names as Load Triggers](../concepts/context-engineering.md#file-names-as-load-triggers).
- **Smart zone vs dumb zone discipline** — popularized Dex Hardy's framing as the operational target every coding stage must stay inside. See [Smart Zone](../concepts/smart-zone.md).

## Key Arguments

**Why grill-me beats plan mode:** Plan-mode rushes to produce a plan-document; the document is a poor proxy for alignment. A relentless one-question-at-a-time interview produces alignment as a byproduct of forcing the human to commit to specifics. The conversation history *is* the asset — plans are a byproduct of alignment, not the goal.

**Why don't review the PRD:** LLMs are reliably good at summarization. Reading the PRD therefore tests only a known-strong skill, not the alignment that was already established in grilling. The time is better spent in QA or on the next slice.

**Why deep modules > shallow modules for AI specifically:** AI can't navigate dense dependency graphs and ends up wrapping every tiny function in its own test boundary. Deep modules give one big test boundary that catches integration bugs, and a sparse navigation surface the agent can reason about locally. See [Deep Modules](../concepts/deep-modules.md).

**Why ~100K is the smart-zone ceiling even on 1M context:** "They shipped a lot more dumb zone." 1M context is good for retrieval, not for the dense reasoning coding requires. See [Smart Zone](../concepts/smart-zone.md).

**Three ways to loop over tickets, ranked (v1.3 video, [01:08-03:23]):** a deterministic script is best (runs the same way every time, cheap, but takes patience to build and refine, so out of reach for beginners); a sub-agent loop like `/implement-spec` is the middle ground ("an agent does the babysitting instead of a human"), below a script because it is not deterministic; a manual human loop, acting "like a for loop", is "not really workable". The sub-agent rung exists because of **nested sub-agents** [02:44-02:58]: sub-agents can now spawn their own sub-agents, so they are no longer "a little bit nerfed" but "as powerful as orchestrator agents". [Source: 2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro]

**Why PRs need evidence (v1.3 video, [05:53-06:22]):** without being asked, agents settle for "that probably works because I've read the code". Asking for before/after evidence pushes them to run an extra test or take a screenshot, which is "an essential part of learning to trust your agent's outputs". Verification is something he says he is "beginning to be really obsessed with".

**Why `/retro` stays human-in-the-loop (v1.3 video, [12:34-13:33]):** retro is "merciless" and nearly always finds something, and some findings are false positives or overrated (in his own run, what it ranked most serious was minor). Automated, "the agent will get itself into a loop where it continually finds false positives" and takes "the repo and your agent into a place it shouldn't really go." Run it by hand, on a sample of sessions, and act only on findings you agree with. See [Agent Session Retrospective](../concepts/agent-session-retro.md).

## Workflow

The full pipeline (see [Agentic Coding Workflow § The Pocock Pipeline](../how-tos/agentic-coding-workflow.md#the-pocock-pipeline-grill--prd--kanban--loop)):

```
/clear → grill-me → /write-a-PRD → /PRD-to-issues → once.sh → ralph-loop → reviewer → QA
```

Implementer on Sonnet, reviewer on Opus (inverted from intuition — review is where you need the smarts, implementation can grind).

## Open Problems He Names

Two unresolved tensions in his own pipeline that he flags explicitly:

- **Code review under AI is unavoidable but unsolved.** Ralph batched commits push toward larger PRs; the keep-PRs-small dictum pushes the other way. "I don't honestly know what the answer to this yet."
  - *Update (October 2026):* `/implement-spec` defaults to **one PR for the whole spec** when the tracker works through PRs, which points toward larger PRs; Pocock calls it "a basic version" to adapt, for example with stacked PRs [04:41-04:54]. `/pr`'s Merge Danger section is his tool for telling the reviewer how hard to look. He does not present either as an answer to this open problem. [Source: 2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro]
- **PRD retention policy is a working heuristic.** He recommends closing/deleting PRDs after implementation to avoid doc rot, but ducks the migrations analogy when an audience member raises it.

## Anti-Takeaways (Retracted Earlier Advice)

- **"Sacrifice grammar for concision"** in CLAUDE.md is no longer used. The original justification was that he read every plan; now grill-me has replaced the plan-reading habit, so the cost of grammar disappears.
- **Don't AFK-optimize the PRD.** Putting deep-think cycles into PRD polishing is wrong — push that work into QA instead.

## Notable Quotes

> "If you take one thing away from today, just try running this skill on your repo." (on `/improve-code-base-architecture`)

> "They shipped a lot more dumb zone." (on 1M context windows for coding)

> "I prefer a little bit more structure" than vanilla Ralph.

> "An agent does the babysitting instead of a human." (on the sub-agent loop, v1.3 video)

> "Context.md just felt way too vague. It didn't trigger the agent to pull it in at the right moment." (on renaming it GLOSSARY.md, v1.3 video)

## Context

Speaker at AI Engineer 2026 (April 2026, full 1h36m workshop). Educator at AI Hero. The talk lays out his complete coding-agent pipeline as a coherent dev workflow rather than as isolated tactics — every stage is justified, every handoff is named, and the unresolved tensions are called out rather than papered over.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where the pipeline lives
- [Smart Zone](../concepts/smart-zone.md) — the context-discipline framing
- [Deep Modules](../concepts/deep-modules.md) — the architecture lever
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) — destination-doc framing
- [Harness Engineering](../concepts/harness-engineering.md) — Ralph-loop variant
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — Sandcastle pipeline
- [Reviewer Agents](../concepts/reviewer-agents.md) — fresh-context reviewer rationale
- [Agent Session Retrospective](../concepts/agent-session-retro.md) — the `/retro` skill and why not to automate it
- [Plan and Review](../concepts/plan-and-review.md) — `/pr` as a PR body built for the human reviewer
