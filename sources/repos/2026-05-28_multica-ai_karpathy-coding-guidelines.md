---
title: "Karpathy-Inspired Claude Code Guidelines"
type: "repo"
channel: "multica-ai"
date: "2026-05-28"
resource: "https://github.com/multica-ai/andrej-karpathy-skills"
pillar: "building"
tags: [claude-code, prompt-engineering, agentic-coding-workflow, best-practices, anti-patterns, andrej-karpathy, agent-skills]
timestamp: "2026-05-28"
extraction_method: "web-fetch"
---

# Karpathy-Inspired Claude Code Guidelines — `multica-ai/andrej-karpathy-skills`

## Repo metadata (snapshot 2026-05-28)

- **Description:** A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls.
- **Stars:** 160,232
- **Last updated:** 2026-05-28
- **Author:** multica-ai (jiayuan_jy on X). Also runs the open-source [Multica](https://github.com/multica-ai/multica) platform.
- **License:** MIT (skill file)
- **Layout:**
  - `CLAUDE.md` — the artifact (four principles).
  - `CURSOR.md` — same content, Cursor variant.
  - `skills/karpathy-guidelines/SKILL.md` — same content packaged as an agent skill.
  - `EXAMPLES.md`, `README.md`, `README.zh.md` — framing, motivation, Karpathy quote excerpts.
  - `.claude-plugin/`, `.cursor/` — tool-integration scaffolding.

## Origin — the Karpathy quote (from README)

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."
>
> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code... implement a bloated construction over 1000 lines when 100 would do."
>
> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

Source link from the README: https://x.com/karpathy/status/2015883857489522876

## CLAUDE.md (verbatim)

```markdown
# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
```

## Principle → Karpathy-pitfall mapping (from README)

| Principle | Pitfall it addresses |
|-----------|----------------------|
| Think Before Coding | Wrong assumptions, hidden confusion, missing tradeoffs |
| Simplicity First | Overcomplication, bloated abstractions, 1000-line constructions |
| Surgical Changes | Orthogonal edits, touching code the model doesn't understand |
| Goal-Driven Execution | Weak success criteria; lack of verifiable loops |

## SKILL.md packaging

The same content is also distributed as an agent skill at `skills/karpathy-guidelines/SKILL.md` with the description:

> "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria."
