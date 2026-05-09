# Ingest Notes

**Source:** [FULL Guide to Becoming a Principled Agentic Engineer (Build Anything with AI)](https://www.youtube.com/watch?v=luBkbzjo-TA)

## User Focus

- How Cole invokes **skills/commands** to break down the development process (the chain `/create-prd` → `/create-stories` → `/prime` → `/plan` → `/implement`, and the rule that anything prompted more than three times becomes a command/skill).
- How he structures the workflow as **loops** — capture using Cole's actual terminology: **PIV loop** (Plan-Implement-Validate, the inner per-ticket cycle) and **system evolution / outer loop** (retroactive improvement of rules/commands/skills). The user originally framed this as "three loops"; the source has two loops within a three-phase model (Ideate → PIV → Evolve).
- How he integrates the workflow with **Jira** via the Atlassian MCP server: ticket creation from `/create-stories`, dependency/blocker detection in `/prime`, status updates and an implementation-summary comment posted at the end of `/implement`.

## Confirmed Discoveries

- **B. [38:54–39:54] — Two-layer planning split.** Project-level planning (PRD + stories) and task-level planning (implementation plan) live in **separate context windows** with separate commands. A non-obvious context-management discipline.
- **D. [52:43–53:50] — Implement in a fresh Claude session.** The implementer session should start clean, with only the `plan.md` artifact and minimal priming — not continue the planning conversation. Removes accumulated bias and forces intent to be re-derived from the plan.
- **F. [57:45–01:00:09] — System evolution as retroactive root-cause on the AI layer.** When the agent ships a bug, treat it as a defect in the rules/commands, not just the code. Check rules and commands into source control and PR-review changes to them. This is the compounding mechanism that distinguishes Cole's system from one-off prompting.

## Terminology Note

Use **Cole's wording** throughout the summary:
- **PIV loop** (Plan-Implement-Validate, sometimes pronounced "pivot") for the inner cycle.
- **Inner loop / outer loop** for the two-loop structure.
- **Three phases**: Ideate → PIV → Evolve. Do not call these "three loops."
