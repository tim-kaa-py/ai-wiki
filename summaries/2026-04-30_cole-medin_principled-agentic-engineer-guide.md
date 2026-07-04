---
title: "FULL Guide to Becoming a Principled Agentic Engineer (Build Anything with AI)"
description: "Describes Cole Medin's Ideate-PIV-Evolve system of Claude Code commands backed by Jira, with an inner PIV loop and an outer loop that patches AI rules"
type: "summary"
channel: "Cole Medin"
date: "2026-04-30"
resource: "https://www.youtube.com/watch?v=luBkbzjo-TA"
pillar: "building"
tags: [agentic-engineering, claude-code, workflow, planning, prompt-engineering]
timestamp: "2026-05-09"
source_file: "sources/youtube/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
---

# FULL Guide to Becoming a Principled Agentic Engineer (Build Anything with AI) — Summary

**Source:** Cole Medin | 2026-04-30 | [Link](https://www.youtube.com/watch?v=luBkbzjo-TA) | 1:07:01

## TL;DR
Cole's foundational system for "principled" AI coding is **three phases — Ideate → PIV → Evolve** — operationalised as a chain of reusable Claude Code commands (`/create-prd`, `/create-stories`, `/prime`, `/plan`, `/implement`) backed by an Atlassian MCP server that pushes/pulls Jira tickets. The headline mechanic is the **PIV loop** (Plan-Implement-Validate, said "pivot") for individual tickets, an **inner loop** when things are humming, and an **outer loop** that retroactively patches the AI layer (rules/commands/skills) whenever the agent ships a defect. The key opinion: bug = defect in the rules, not just the code — and the rules belong in source control with PR review.

## Video Structure
1. [00:00-03:08] Framing — three phases, Claude Code + Jira, "not vibe coding"
2. [03:08-06:43] Why off-the-shelf frameworks (BMAD, GSD, Cloudflow, spec-kit) are wrong for established SDLCs
3. [06:43-12:00] Phase 1 (Ideate) — brain dump, clarifying questions, the AI layer (rules/commands/skills, the "3+ times" rule)
4. [12:00-14:14] PRD + stories commands as the structured output of ideation; Jira-or-markdown
5. [14:14-21:10] Live demo: brain dump → clarifying interview → `/create-prd` for the poll-builder
6. [21:10-26:00] PRD review checkpoint; why PRD and stories are *separate* commands (human-in-the-loop)
7. [26:00-33:00] `/create-stories` + Atlassian MCP populating Jira tickets, technical-notes comments
8. [33:00-38:54] Picking a ticket; entering the PIV loop
9. [38:54-39:54] **Two-layer planning** — project planning vs. task planning, separate context windows
10. [39:54-45:00] `/prime` command — codebase + Jira-context loading, dependency/blocker detection
11. [45:00-49:00] Free-form exploration, sub-agents as context buffers for research
12. [49:00-52:43] `/plan` command — structured `plan.md` with files, task list, self-validation strategy
13. [52:43-53:50] **Fresh session for `/implement`** — why you must not continue the planning conversation
14. [53:50-57:45] `/implement` — branch, code, validate, comment back to Jira
15. [57:45-01:01:30] **System Evolution** — bugs as defects in the AI layer; rules/commands in source control
16. [01:01:30-01:03:00] Inner loop vs. outer loop — what to evolve (commands, on-demand context, global rules, plan/PRD templates)
17. [01:03:00-01:07:01] QR-code demo wrap-up; "not as fast as me" caveat

## Key Concepts

### Principled Agentic Engineer
The engineer's job is no longer to write the code, but to do the higher-leverage tasks — **planning and validating**. Cole's "principled" framing is a deliberate counter to vibe-coding: the human stays in the driver's seat by curating context, reviewing artifacts, and evolving the system, not by typing code.

### Three Phases: Ideate → PIV → Evolve
Cole's whole system fits in three phases. **Ideate** = unstructured brain dump → structured PRD → Jira tickets. **PIV** = the per-ticket Plan-Implement-Validate loop. **Evolve** = retroactive improvement of the AI layer when the agent slips.

Note this is **three phases, not three loops** — Cole is explicit later that there are only **two loops** (inner and outer) inside the three-phase model.

### PIV Loop ("pivot")
**Plan → Implement → Validate**, run per Jira ticket / GitHub issue / linear ticket. The pronunciation "pivot" matters because it's how he refers to it throughout the talk. PIV is the *inner loop* — what you do when the agent is shipping clean.

### Inner Loop vs. Outer Loop
- **Inner loop:** PIV running smoothly, ticket after ticket, no system intervention.
- **Outer loop:** Triggered when the agent slips. You step *out* of the next PIV loop and patch the AI layer (rules, commands, on-demand context, plan/PRD templates) so this class of slip is less likely next time. Then re-enter the inner loop.

### Two-Layer Planning [38:54]
Project-level planning (PRD + stories) and task-level planning (`plan.md`) live in **separate context windows** with separate commands. Layer 1 is high-level (features, business logic, no code). Layer 2 is in-the-weeds (codebase analysis, files to touch, validation strategy). Cole's non-obvious context-management discipline.

### AI Layer
The umbrella term for everything you teach your coding agent: **global rules** (always-on conventions: coding style, testing strategy, logging, "always use uv for Python", "always use TypeScript"), **commands** (named, argument-taking procedures invoked with a slash), and **skills** (reusable workflows). All three live as Markdown in `.claude/` and are checked into source control.

### Global Rules vs. Commands/Skills
- **Global rules:** loaded into every session. Conventions you always want followed.
- **Commands/skills:** loaded on demand by name. Procedures for specific moments (creating a PRD, planning a feature, exploring a codebase).
The "**3+ times rule**": anytime you find yourself prompting something more than three times, it becomes a command or skill. Manual prompting is a smell.

### Sub-agents as Context Buffers
A subprocess agent that performs research (codebase exploration, web research) and returns a *summary* to the main agent. Cole's framing diverges from the common "sub-agents = parallelism" pitch: for him sub-agents exist primarily for **context budgeting**. A research task burns 30k-100k tokens; the parent only needs the 2k-token summary. With million-token windows now available, the discipline matters more, not less — "just because you can fit a million tokens doesn't mean you should."

### System Evolution
The retroactive root-cause analysis of *the AI layer* (not just the code) when the agent ships a defect. The compounding mechanism that distinguishes this system from one-off prompting.

## Key Takeaways

1. **Build the command chain, not the prompts.** The `/create-prd` → `/create-stories` → `/prime` → `/plan` → `/implement` chain is the productised SDLC. Each is a Markdown procedure file with arguments. **How to apply:** clone Cole's [`.claude/` folder](https://github.com/coleam00) as a starting point, then mold each command to your own conventions over the first few sprints.

2. **The 3+ times rule.** If you've prompted something three times, it's a command. **How to apply:** keep a tally in your head during the first week. Anything that hits three becomes a slash command before you prompt it a fourth time.

3. **Two-layer planning in separate context windows [38:54].** Don't fold project planning and task planning into one conversation. PRD + stories happens in one session; `/prime` + `/plan` for the picked ticket happens in a fresh one. **How to apply:** treat `/clear` as mandatory between layer 1 and layer 2. The `plan.md` artifact is the only thing that crosses the boundary.

4. **Implement in a fresh Claude session [52:43].** Even after a long planning conversation, do not continue it for `/implement`. Open a new session, run `/implement plan.md`, and let the implementer re-derive intent from the artifact alone. **How to apply:** make this a hard rule. Accumulated planning bias is the #1 cause of agents drifting from their own plan.

5. **Treat artifacts as the only legitimate input.** PRD, stories, `plan.md`, Jira ticket — these are the inputs to the next stage. Conversation history is not. **How to apply:** if you can't run a step from artifacts alone in a fresh session, the artifact is incomplete. Iterate the command, not the conversation.

6. **Atlassian MCP is the integration backbone for Jira shops.** `/create-stories` writes tickets, `/prime` reads them and detects blockers/dependencies, `/implement` posts an implementation summary as a comment and updates ticket status. **How to apply:** install the Atlassian MCP server (`claude mcp add` or via `mcp.json`), test with one epic, then tune the implement command's comment format — Cole admits his is too verbose ([01:03:01]).

7. **Sub-agents for research, not parallelism [46:30].** When the next step burns >20k tokens of research and only needs a summary, dispatch a sub-agent. **How to apply:** in the `/prime` and exploration phase, instruct the agent to "spin up sub-agents to research X, Y, Z and report back a summary." Watch the parent's token count stay flat.

8. **Bugs are defects in the AI layer [57:45].** When the agent ships a bug, run a retroactive session: "You allowed this. Look at your rules, commands, and skills. What should change?" **How to apply:** before fixing the bug, open the outer loop. Update the rule or command. Commit the AI-layer change *and* the code fix as separate, reviewable PRs.

9. **PR-review your AI layer.** Rules, commands, skills go in source control. Treat changes the same as code changes — peer review, branch, merge. **How to apply:** every command lives in `.claude/commands/`, every skill in `.claude/skills/`. Add a `CODEOWNERS` entry. Reject command changes without a PR description explaining what failure mode they address.

10. **Validation is plural.** The `plan.md` specifies the agent's self-validation (lint, type-check, unit, integration, end-to-end via agent-browser CLI). The human still does code review and manual testing for production code. **How to apply:** put validation steps in `plan.md` as explicit tasks, not just a paragraph. The agent will execute them; you only review the deltas.

## Argument Structures

### Argument 1 — Why off-the-shelf frameworks (BMAD, GSD, Cloudflow, spec-kit) are wrong for established SDLCs [04:53-06:43]

> Premise 1: Off-the-shelf frameworks bake opinionated end-to-end strategies (research → plan → build → validate) with their own conventions.
> Premise 2: Established teams already have conventions, processes, and tooling they're not willing (or able) to throw out.
> Premise 3: These frameworks are bloated enough that adapting them is harder than starting simple.
> → Conclusion: Adopting BMAD/GSD/Cloudflow forces a team to choose between abandoning their SDLC or fighting the framework. Neither is acceptable.
> → Recommendation: Start with **simple primitives** (rules + commands + skills) and *grow* the system into the team's existing process. The simplicity is the point — it's the only path to ownership.

The implicit further claim: respect for the timeless software-engineering practices in BMAD etc., but the packaging is the problem.

### Argument 2 — Sub-agents exist for context budgeting, not parallelism [46:30-48:30]

> Premise 1: Research tasks (codebase exploration, web search) consume tens of thousands of tokens.
> Premise 2: Only a summary is needed downstream — "here are the files to edit", "here are the relevant best-practice articles."
> Premise 3: A 1M-token window does not eliminate context-overload — "they get overwhelmed just like people do."
> → Conclusion: Push research into sub-agents that burn tokens in their *own* context windows and return summaries. The parent stays focused.
> → Corollary: The bigger the model's context window gets, the more important explicit context-budgeting discipline becomes (because the temptation to dump everything in is greater).

This reframes sub-agents away from the common "run things in parallel" framing and toward a context-engineering primitive.

### Argument 3 — A bug is a defect in the rules/commands, not (just) in the code [57:45-01:00:09]

> Premise 1: Coding agents are non-deterministic. Some defects are inevitable even with perfect planning.
> Premise 2: Every defect was *enabled* by some gap in the context the agent was given — a missing rule, an incomplete command, an unclear plan template.
> Premise 3: Patching only the code leaves that gap in place; the next ticket on the same area will hit the same class of bug.
> Premise 4: Rules and commands are versionable Markdown — they can be edited, PR-reviewed, and merged like code.
> → Conclusion: Every bug is an opportunity to upgrade the AI layer. Treat the bug-fix PR and the AI-layer-fix PR as parallel artifacts. Skipping the second one means surrendering the compounding mechanism.

This is the load-bearing argument of the whole system. It's what turns "using Claude Code" into "operating a principled agentic engineering practice."

## Notable Commands / Code Snippets

### The chain (all live in `.claude/commands/` as Markdown procedures)

```
/create-prd <output-path>
  Input: the current conversation (brain dump + clarifying Q&A)
  Output: a single PRD markdown file with executive summary, mission,
  target users, in-scope, out-of-scope, success criteria, etc.

/create-stories <prd-path> <jira-project-id> <jira-epic-id>
  Input: the PRD
  Output: stories saved as markdown AND pushed to Jira via Atlassian MCP
  Optional: skip Jira args to keep stories local-only

/prime <jira-issue-ids>
  Loads codebase context (recent commits, app routes, key features)
  PLUS Jira-issue context for the picked ticket(s)
  Detects blockers and dependencies in Jira state

/plan <free-form description or ticket id>
  Output: plan.md — summary, locked decisions, files to create/update,
  task list, self-validation strategy (lint/type/unit/integration/e2e)

/implement <plan-path>
  ALWAYS run in a fresh Claude session
  Reads plan.md, creates branch, writes code, runs validation,
  posts implementation summary as Jira comment, opens PR
```

### Global rules examples (loaded into every session)

```
- Always use uv for Python package management.
- Always use TypeScript, never plain JavaScript.
- Match existing component styles when adding new front-end components.
- All new endpoints get integration tests, not just unit tests.
```

### MCP setup (one-shot, agent-driven)

> "Help me set up the Atlassian MCP server" — Claude Code searches the
> web, pulls the config, creates `mcp.json`, sets up everything. The
> setup itself is a Claude Code task, not a manual one.

### Self-evolution prompt (the outer-loop trigger)

> "Claude, you allowed this problem to creep into my codebase. Dive into
> your AI layer — your rules, commands, and skills, the workflow I
> brought you through — and identify things we could improve so this
> kind of issue doesn't happen again."

## User Notes

What stuck for me:

- **Skills/commands as a way to *break down* development.** The chain is the SDLC made executable. The "3+ times rule" is the right discipline — it forces every recurring prompt to become a versionable, reviewable artifact. This is the bit I'll steal first.
- **PIV inner loop + outer loop, anchored in three phases.** The vocabulary is worth using verbatim with my own team — "we're in PIV", "let's do an outer-loop pass on this rule", "Ideate → PIV → Evolve." Having shared terms beats inventing them.
- **Two-layer planning in *separate* context windows [38:54]** is the non-obvious one. I would naturally have folded project planning and task planning into one long conversation. Splitting them — and forcing the implementer into a *fresh* session [52:43] with only `plan.md` — is a sharper context-engineering rule than I had.
- **Bug = defect in the rules [57:45].** This is the compounding move. Without it, the system is just a fancier prompting workflow. With it, every shipped defect makes the next sprint cheaper. The fact that he checks rules and commands into source control with PR review is the right operationalisation — anything less and the AI layer rots.
- **Atlassian MCP for Jira integration.** Concrete and immediately applicable for client work where Jira is non-negotiable. The `/prime` step pulling ticket context and detecting blockers is the one I want to demo first.
- **Off-the-shelf frameworks are wrong for established SDLCs.** This matches what I see in consulting — the firms running BMAD/spec-kit on top of an existing process are usually fighting their own conventions. Start primitive, evolve into the team's reality.

## Related Topics
agentic-engineering, claude-code, workflow, planning, prompt-engineering, context-engineering, sub-agents, mcp, jira, system-evolution
