---
title: "PRD-as-Prompt Pattern"
type: "concept"
pillar: "building"
tags: [prompt-engineering, architecture, bootstrap, agents, best-practices, karpathy]
sources:
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
timestamp: "2026-05-08"
---

# PRD-as-Prompt Pattern

A reusable bootstrap pattern where a full system architecture is encoded as a product requirements document (PRD) that a coding agent can execute in a single prompt to scaffold the entire system from scratch.

## The Core Idea

Instead of guiding an agent through a multi-step setup process, you write one self-contained document that specifies:

- Folder structure
- File schemas and frontmatter
- Agent rules and behavior
- Processing pipelines
- Naming conventions

When sent as a single prompt to a coding agent with no other context, it one-shots the entire system. The PRD is both the specification and the executable instruction.

## Origin

Andrej Karpathy published a follow-up tweet to his LLM wiki pattern containing a PRD that, when given to a coding agent, builds the entire knowledge base system — folder structure, CLAUDE.md schema, processing rules, index maintenance — from a blank slate. Cole Medin highlights this as a reusable pattern beyond Karpathy's specific use case. *(Source: Cole Medin)*

## Why It Works

Modern coding agents can scaffold complex multi-file systems from a single well-structured prompt. The PRD-as-prompt pattern works because:

1. **Self-contained context** — the agent doesn't need to search for requirements across multiple files or conversations
2. **Declarative specification** — "here's what the system looks like" rather than "do step 1, then step 2..."
3. **Testable** — you can verify the pattern by running it against a blank directory and checking the output
4. **Shareable** — one document captures the entire architecture, making it easy to reproduce or fork

## How to Apply

1. Design your system architecture as you normally would
2. Encode the full design as a PRD-style document: folder structure, file schemas, agent rules, processing pipeline, naming conventions
3. Test that a coding agent can one-shot the system from a blank slate using only the PRD
4. Iterate on the PRD until it reliably produces the correct scaffold
5. Share the PRD as the canonical way to bootstrap the system

## Relationship to CLAUDE.md

The PRD-as-prompt pattern is closely related to CLAUDE.md files, but serves a different purpose:

| Document | Purpose | When used |
|----------|---------|-----------|
| PRD-as-prompt | Bootstrap — create the system from scratch | Once, at setup |
| CLAUDE.md | Operate — guide the agent within an existing system | Every session |

A mature workflow uses the PRD to scaffold the initial system, then the CLAUDE.md (which the PRD creates) to guide ongoing operation.

## PRD as Destination Doc (Pocock Variant)

Matt Pocock's pipeline (AI Engineer 2026) uses the PRD differently from the Karpathy bootstrap pattern: not to scaffold a system from scratch, but as a per-feature **destination document** that persists alongside the codebase for the duration of a feature build, then is closed/deleted on merge. Two artifacts coexist:

| Artifact | Role |
|----------|------|
| **PRD (destination doc)** | Where we're going + definition of done |
| **Kanban DAG (journey doc)** | How we get there — issues with `blocked_by` |

PRD contents (Pocock's template, derived in part from Brett Carter):

- Problem statement
- Solution
- User stories
- Implementation decisions
- Testing decisions
- **Out-of-scope section** (rejected options from grilling — keeps them out of future loops)
- **Module list** (see § Module Map First below)

### Don't Review the PRD

Counter to standard PRD practice. Matt's argument:

1. The shared design concept was already established in grilling (the relentless interview that produces the PRD input).
2. LLMs are reliably good at summarization.
3. Reading the PRD therefore tests only a known-strong skill, not the alignment that was already established.
4. Time is better spent in QA or on the next slice.

**How to apply:** in your `/write-a-PRD` skill, surface only the module list and out-of-scope section for confirmation, not the full body.

### Module Map First

Have the PRD skill return "modules to create + modules to modify" **before** drafting prose, and confirm them. The map persists through planning AND implementation — it forces the system shape into the agent's working context every time the PRD is read by a downstream loop. Tightly coupled with [Deep Modules](deep-modules.md): each new module entry should name the deep-module's interface explicitly, not just behavior.

**How to apply:** edit `/write-a-PRD` to require a `## Modules` section listing new deep modules and existing modules to be touched, before writing user stories.

### Don't AFK-Optimize the PRD

Anti-takeaway from Matt himself: putting deep-think cycles into PRD polishing is wrong — push that work into QA instead. The destination doc has a hard ceiling on how much it deserves further investment; the marginal token is better spent on QA than on more PRD drafts.

### Doc Rot — Closing PRDs After Implementation

Why finished PRDs should NOT live in the repo:

- PRDs encode requirements, names, and structure as of a moment in time.
- After implementation, the code drifts — names change, requirements adjust based on user feedback, structure mutates.
- Future agents finding an old PRD will treat it as authoritative documentation and re-introduce drift as "fixes."

Solution: close/delete after implementation. GitHub closed issues are good — visual indicator + retrievable but not first-page.

### Unresolved Tensions

- **Migrations analog.** An audience member asked at 1:24:40 whether database migrations — a similar "transient process artifact" — should also be squashed. Matt: "I don't know… let's talk about it afterwards." Treat the always-delete rule as a working heuristic, not a verified principle. The cleanest framing the wiki offers: migrations encode a *running deterministic record* of state changes that the system *re-executes*; PRDs encode *intent* that is never re-executed. The analogy fails — but Matt didn't articulate this in the room.

### Bootstrap PRD vs Per-Feature PRD

The Karpathy and Pocock uses are distinct, not contradictory:

| | Bootstrap PRD (Karpathy) | Per-Feature PRD (Pocock) |
|--|--------------------------|--------------------------|
| When used | Once, at system setup | Once per feature |
| Lifetime | Permanent (in repo as the canonical bootstrap) | Closed/deleted after merge |
| Audience | The agent that scaffolds the system | The agent that implements one feature |
| Contains | Folder structure, schemas, agent rules, processing pipeline | Problem, solution, user stories, modules, out-of-scope |
| Read by human? | Yes — testable against blank directory | No — alignment is in grilling |

A mature workflow uses both: a bootstrap PRD to scaffold the system, then per-feature PRDs (closed on merge) for each subsequent feature, and CLAUDE.md (which the bootstrap PRD created) to guide ongoing operation.

## Related Pages

- [LLM Wiki Pattern](llm-wiki-pattern.md) — the pattern Karpathy's original PRD bootstraps
- [Andrej Karpathy](../people/andrej-karpathy.md) — published the original PRD tweet
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — a system that can be bootstrapped with this pattern
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — the broader workflow context, including the Pocock pipeline
- [Deep Modules](deep-modules.md) — module-map output of the Pocock PRD
- [Smart Zone](smart-zone.md) — why grill-me's 25K conversation is the asset, not a side-effect
- [Matt Pocock](../people/matt-pocock.md) — author of the destination-doc framing
