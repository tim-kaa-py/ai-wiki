---
title: "PIV Loop (Plan-Implement-Validate)"
type: "concept"
pillar: "building"
tags: [agentic-engineering, claude-code, workflow, planning, piv, inner-loop, two-layer-planning]
sources:
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
timestamp: "2026-05-09"
---

# PIV Loop (Plan-Implement-Validate)

The per-ticket inner-loop primitive in Cole Medin's principled-agentic-engineer system: **Plan → Implement → Validate**, pronounced **"pivot"**, run once per Jira ticket / GitHub issue / Linear ticket. PIV is the mode the engineer is in when the agent is shipping clean. When PIV starts slipping, the engineer steps *out* into the [system-evolution outer loop](system-evolution.md), patches the AI layer, and re-enters PIV.

## The Three Steps

### Plan

Run inside a session that has just been primed with codebase + ticket context (see § Two-Layer Planning below). The output is a single artifact — `plan.md` — containing:

- A summary of the ticket
- Locked decisions (each tradeoff resolved up front, with rationale)
- The list of files to create or modify
- A task list (atomic units of implementation work)
- A **self-validation strategy** (lint / type-check / unit / integration / end-to-end via agent-browser CLI)

Cole's `/plan` command produces this file. Free-form exploration with sub-agents is allowed *before* the plan is committed; once the plan is written, the conversation that produced it is discarded.

### Implement

**Always run in a fresh Claude session [52:43].** This is the load-bearing rule of PIV. Even after a long, productive planning conversation, do not continue it for `/implement`. Open a new session, run `/implement plan.md`, and let the implementer re-derive intent from the artifact alone.

The implementer:

1. Reads `plan.md`
2. Creates a branch
3. Writes code, one file at a time per the task list
4. Runs the self-validation steps from the plan
5. Posts an implementation summary as a Jira ticket comment
6. Updates ticket status / opens PR

### Validate

Validation is *plural*. The agent's self-validation runs as part of `/implement` (everything in `plan.md`'s validation strategy). The human still does code review and manual testing for production code. The plan should specify validation as **explicit tasks**, not as a paragraph — the agent will execute tasks; it tends to skim paragraphs.

## Why "Pivot"

Cole pronounces PIV as "pivot" — the pun matters because it's how the term shows up in the rest of his system. "We're in PIV", "let's get back to PIV", "let's do an outer-loop pass before re-entering PIV."

## Inner Loop vs. Outer Loop

PIV is the **inner loop** — the mode of normal forward progress. There is exactly one **outer loop** in the system: [system evolution](system-evolution.md), entered when the agent ships a defect.

| | Inner loop | Outer loop |
|--|-----------|-----------|
| Trigger | Next ticket | Defect shipped |
| Cadence | Per ticket | Per defect class |
| Artifact touched | Code + Jira | `.claude/` (rules, commands, skills) |
| Goal | Forward progress | Compound the AI layer |

Three phases (Ideate → PIV → Evolve), two loops (inner and outer). Cole is explicit that this is **three phases, not three loops**.

## Two-Layer Planning [38:54]

PIV does not contain "the plan." It is preceded by — and ontologically separate from — **project-level planning** (PRD + stories), which produces the ticket PIV consumes. The two layers live in **separate context windows**:

| Layer | Command(s) | Output | Context window |
|-------|-----------|--------|----------------|
| **Layer 1 — Project planning** | `/create-prd`, `/create-stories` | PRD doc; Jira tickets | One session for the whole feature |
| **Layer 2 — Task planning** | `/prime`, `/plan` | `plan.md` | One session per ticket |

Treat `/clear` as **mandatory** between layer 1 and layer 2. The `plan.md` artifact is the only thing that legitimately crosses the boundary. This is a sharper context-engineering rule than the typical "use plan mode" advice — it forces the discipline that the conversation history is *never* the asset, only the artifact is.

## What Makes PIV Different from One-Shot Prompting

Three structural moves distinguish PIV from "just prompt the agent to fix the bug":

1. **The artifact, not the conversation, is the input.** Each step's input is a markdown file (PRD → ticket → `plan.md`), not the prior turn's chat history. If you can't run the next step from the artifact alone in a fresh session, the artifact is incomplete — iterate the command, not the conversation.
2. **Fresh session at the planning/implementation boundary.** Accumulated planning bias is the #1 cause of agents drifting from their own plan. The fresh `/implement` session is a deliberate firewall.
3. **Validation is part of the plan, not a separate phase.** The plan specifies *how* the agent will know it's done. Without this, "implement" silently expands into "implement and probably check manually" — the agent skips checks under context pressure.

## How to Apply

1. Install Cole's `/prime`, `/plan`, `/implement` commands as Markdown procedures in `.claude/commands/` — clone his [`coleam00`](https://github.com/coleam00) repo as a starting point and tune over the first sprints.
2. Make `/clear` between project-planning and task-planning a hard team rule.
3. Make a **fresh session** for `/implement` a hard team rule. The implementer takes only `plan.md` as input.
4. Force the validation strategy in `plan.md` to be a **task list**, not a paragraph.
5. When defects ship, **do not re-enter PIV.** Run [System Evolution](system-evolution.md) on the AI layer first, then re-enter PIV with the patched commands.

## Anti-Patterns

- **Continuing the planning conversation into implementation.** Defeats the firewall. The agent will defer to the planning context and ignore artifact gaps.
- **Folding project planning and task planning into one session.** Burns a single context window across both layers, which puts the implementer in the [dumb zone](smart-zone.md) before it starts. *(See [Smart Zone](smart-zone.md) for the underlying ~100K threshold.)*
- **Validation-as-paragraph.** "Make sure tests pass" gets executed as "skim the test output." A task list — `1. Run lint. 2. Run typecheck. 3. Run unit tests…` — gets executed.
- **Re-entering PIV after a defect without an outer-loop pass.** The system stops compounding. PIV becomes "fancier prompting" instead of "principled engineering." See [System Evolution § The Compounding Move](system-evolution.md).

## Sources

- [Cole Medin — Full Guide to Becoming a Principled Agentic Engineer](../../summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md) — origin of the PIV vocabulary, two-layer planning rule, and fresh-session-for-implement rule

## Related Pages

- [System Evolution](system-evolution.md) — the outer loop PIV defers to on defect
- [AI Layer](ai-layer.md) — what the outer loop edits when PIV slips
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — how PIV slots into the broader workflow
- [Smart Zone vs Dumb Zone](smart-zone.md) — the context-engineering reason fresh sessions matter
- [PRD-as-Prompt Pattern](prd-as-prompt.md) — adjacent destination-doc framing (Pocock's variant)
- [Cole Medin](../people/cole-medin.md) — pipeline author
