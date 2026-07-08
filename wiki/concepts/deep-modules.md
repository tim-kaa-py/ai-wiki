---
title: "Deep Modules (Ousterhout, Applied to AI)"
description: "Ousterhout's deep-module design heuristic applied to AI coding, with Matt Pocock's argument for why it matters more now"
type: "concept"
pillar: "building"
tags: [architecture, ousterhout, deep-modules, agentic-coding-workflow, agent-skills, claude-code, best-practices, refactoring]
sources:
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
timestamp: "2026-07-08"
---

# Deep Modules (Ousterhout, Applied to AI)

John Ousterhout's design heuristic from *A Philosophy of Software Design*: a **deep module** has a small interface and lots of internal functionality; a **shallow module** has a big interface relative to its body. Matt Pocock's contribution is the AI-specific argument for why this principle now matters more, not less — and the `/improve-code-base-architecture` skill that operationalizes it.

## The Definitions

| Module shape | Interface | Body | Outward dependencies |
|--------------|-----------|------|----------------------|
| **Shallow** | Big — many tiny exports | Small | Many |
| **Deep** | Small — one or a few well-named entry points | Fat | Few |

Shallow modules look modular but aren't — they push complexity *across* boundaries instead of hiding it inside them. The classic symptom: every consumer needs to know about ten internal functions instead of one.

## Why Deep Modules Win for AI Codebases

Three AI-specific arguments, all load-bearing:

### 1. Test Boundary Quality

Shallow modules force the agent to wrap **every tiny function in its own test boundary**. The result: lots of green tests that catch only what was already obvious, and zero coverage of the integration surface where bugs actually live.

A deep module gives the agent **one big test boundary** — assert on the module's small interface, and integration bugs surface inside the module instead of leaking past it. One good integration test beats ten unit tests that prove nothing.

### 2. Dependency Graph Navigability

AI cannot navigate a dense dependency graph well. It traces edge by edge and runs out of context before it understands the whole. A shallow codebase **is** a dense graph: every consumer touches many internal functions, every internal function knows about many siblings.

A deep codebase is a sparse graph: each consumer touches one interface, each module's internals are encapsulated. The agent can reason locally without paging in the world.

### 3. Feedback Loop = AI Ceiling

Matt's compressed framing: "**feedback-loop quality is the AI ceiling.**" Shallow modules degrade feedback quality — bad tests, missed integration bugs, opaque navigation. Deep modules raise the feedback ceiling, which raises the agent's effective coding ability inside your repo.

Deepening modules is therefore not stylistic. It is a direct lever on the AI's effective performance in your codebase.

## What Goes Wrong Without a Coach

Without explicit guidance, AI tends to produce shallow modules by default:

- It writes one tiny function per concept ("clean code" pattern-matching).
- It exports too much from each file ("just in case someone needs it").
- It splits files at the first whiff of length, fragmenting cohesive logic.

Result: a codebase that looks well-factored at the file-tree level and is structurally hostile to its own next pass.

## The `/improve-code-base-architecture` Skill

Matt's custom skill that scans the repo and proposes clusters of currently-shallow modules to collapse into deep ones. Output shape per cluster:

- **Coupling argument** — why these files belong together
- **Dependency category** — e.g. *"local substitutable in SQLite within memory test DB"* (so you can reason about test infrastructure)
- **Gap notes** — e.g. *"zero tests = biggest gap"* (so you know what implementation cost you're inheriting)

A real example Matt cites: a browser-side video editor wrapped front-to-back as one deep module via a discriminated union. AI's ability to edit it became "**night and day**" better afterward.

His verbatim recommendation: "**If you take one thing away from today, just try running this skill on your repo.**"

The skill maps cleanly onto the [Agent Skills](agent-skills.md) framework — it's a Level-2 playbook that lives in `.claude/skills/improve-code-base-architecture/SKILL.md` and is invoked manually when you want to audit the architecture.

### How to Apply

1. Spend an afternoon running `/improve-code-base-architecture` on your main work repo before any new feature.
2. Treat its output as a backlog of architecture issues.
3. Implement the highest-impact collapse first (usually the cluster with the most cross-file coupling and the worst test boundaries).
4. Re-run periodically — agents drift back toward shallow as new features land.

## Design Interfaces, Delegate Implementations

The companion principle Matt names as the answer to "do you know your codebase less now?":

> Own the **shape and behavior** of each module (the interface). Delegate the body to AI.

Modules become "gray boxes" — the human knows what they do under what conditions and doesn't read the internals. This:

- Lets you keep a navigable mental model while moving fast.
- Aligns the human's attention with the work the agent can't do (interface design + behavioral specification).
- Aligns the agent's attention with the work the human shouldn't waste time on (body implementation).

### How to Apply

- Before each implementation issue, write the module's exported signatures by hand in a stub file.
- Let AI fill in the body inside the loop.
- The PRD's module-map subsection (see [PRD-as-Prompt](prd-as-prompt.md)) should name new deep modules and their interfaces explicitly, not just behavior.

## Module Maps in PRDs

To operationalize deep-module discipline, Matt's PRD pipeline returns the **module list before drafting prose**. The PRD has a `## Modules` section listing:

- **Modules to create** — each named, each with a one-line interface description
- **Modules to modify** — each named, scope of change

The map persists through planning AND implementation. It forces the system shape into the agent's working context every time the PRD is read by a downstream loop. See [PRD-as-Prompt § Module Map First](prd-as-prompt.md#module-map-first).

## Argument Structure

Compressed:

1. **Premise (test boundary):** Wrapping a big module in one test catches integration bugs; wrapping every tiny function in its own test catches only what was already obvious. Shallow modules force the latter.
2. **Premise (dependency graph):** AI cannot navigate a dense dependency graph well — it traces edge by edge and runs out of context.
3. **Premise (feedback loop):** Feedback-loop quality is the AI ceiling. Shallow modules degrade feedback quality.
4. **Conclusion:** Deepening modules directly raises the AI's effective coding ability in your repo, by improving both the test boundary and the navigation surface.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where deep-module discipline fits in daily practice
- [Agent Skills](agent-skills.md) — the framework `/improve-code-base-architecture` uses
- [PRD-as-Prompt Pattern](prd-as-prompt.md) — module maps as PRD output
- [Code-as-Text Structural Tests](code-as-text-structural-tests.md) — file-length caps and package-privacy invariants are shallow-module guards
- [Matt Pocock](../people/matt-pocock.md) — author of the AI-applied framing and the skill
