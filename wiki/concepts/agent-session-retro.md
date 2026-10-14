---
title: "Agent Session Retrospective (/retro)"
type: "concept"
description: "Matt Pocock's by-hand review of real coding-agent sessions that proposes improvements to the repo and agent setup, and his argument for never automating it"
pillar: "building"
tags: [claude-code, agents, skills, workflow, harness-engineering, best-practices, anti-patterns]
sources:
  - "summaries/2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro.md"
timestamp: "2026-10-14"
---

# Agent Session Retrospective (/retro)

A retrospective run on coding-agent sessions rather than on a sprint: an agent reads what actually happened in one or more real sessions (the current one, the previous one, or several) and suggests improvements for next time [10:27-10:41]. Matt Pocock shipped it as the `/retro` skill in v1.3 of his skills repo (October 2026).

**Single-source page.** Everything below is from Pocock's video and the v1.3.1 skill file. Video claims carry timestamps; claims marked *(SKILL.md)* come from the [skill file](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/retro/SKILL.md), not the video.

## Why Read Sessions

Pocock built it to bundle up upkeep he had been doing by hand, and asking his users to do: maintaining AGENTS.md and skills, keeping the repo token-efficient, keeping the environment safe for the agent, and having good lint rules and navigation [09:43-10:27].

The case for reading real sessions rather than reviewing the setup in the abstract is that sessions show the inefficiencies the agent "actually hides from" [10:42-10:53]. Agents push through problems until the feature gets built, one way or another; "the agent doesn't complain, I think, as much as it should, and doesn't try to fix its own mistakes." So "you kind of need to get another agent to look back on those sessions" [11:03-11:16]. This is the same observation behind Patrick Debois's retro ritual in [Agent Enablement](agent-enablement.md#change-the-rituals): "the agent went over and over hit this problem. Can we fix the system?"

## What It Looks For

The categories the skill checks [13:35-13:58]:

- How easy is the codebase to navigate?
- Are there automated checks we could add?
- Could we add coding standards for the automated reviewer to enforce?
- How healthy is the global AGENTS.md?
- Is the tool economy any good?
- Are there no-ops in the instructions or steering files? (see [Skill Evaluation § No-ops](skill-evaluation.md#no-ops))
- Does the agent have access to all the information it needs?

How the skill runs *(SKILL.md)*: it loads Pocock's `writing-for-agents` skill first, finds sessions in the session logs on the machine (defaulting to the current one), gives each category a "use when" trigger, and presents candidate improvements ordered by severity. Two of its rules:

- A mechanical coding-standard violation gets a **deterministic check** (lint rule, pre-commit hook or CI job), not a written rule.
- A repo with **no guardrail at all** is itself a finding.

Its reference section also takes a position on where things live: the review agent, which has the least context pressure, should enforce coding standards, and CLAUDE.md/AGENTS.md should hold little beyond navigation pointers *(SKILL.md)*.

The live demo [11:16-12:27] found: an irreversible public action (a release) run without asking; a repo with a check script that nothing runs, so a suggested CI pipeline; context lost across compactions in long sessions, so repeated instructions should move into a skill; a custom CLI wasting tokens; and a tool not on the local path.

## Keep It Human-in-the-Loop

Pocock's strongest instruction about the skill: "it's designed to be human in the loop. It's not designed to just keep creating these fixes" [12:48-12:54]. The skill is user-invoked only (`disable-model-invocation: true`) *(SKILL.md)*, which fits.

The argument [12:34-13:16]:

1. Retro is "merciless" and "will pretty much always find ways to improve", and some findings are false positives or overrated. In his own run, what it ranked most serious (the unasked release) was minor: "I can always create and cut new releases."
2. An automated loop would act on every finding, the false ones included.
3. "The agent will get itself into a loop where it continually finds false positives. It continually tries to fix things and you'll end up in this weird trajectory where it just takes the repo and your agent into a place it shouldn't really go."
4. So a human picks which findings to act on, and retro runs on a sample of sessions, not continuously.

He reports that running it regularly has "massively" increased his token efficiency and the quality of his work [13:58-14:06]. That is self-report, with no numbers.

## How to Apply

1. **Run it by hand, on a sample.** When you have a free moment and haven't run it in a while, point it at your most recent sessions, especially one that went wrong or where the agent did something odd [13:16-13:33].
2. **Act only on findings you agree with.** Treat the severity ranking as a suggestion; check it against what the issue actually costs you.
3. **Prefer a check to a sentence.** When a finding is a mechanical standard the agent keeps breaking, add a lint rule, hook or CI job rather than another line of instructions *(SKILL.md)*.
4. **Read the skill before installing it** [03:23-03:30], his included.

## Related Pages

- [Matt Pocock](../people/matt-pocock.md) — author of the skill and the human-in-the-loop argument
- [System Evolution](system-evolution.md) — Cole Medin's outer-loop RCA of the AI layer after a shipped defect; the defect-triggered sibling
- [Agent Enablement](agent-enablement.md) — Debois's team-level retro on system failures
- [Dreaming](dreaming.md) — Anthropic's out-of-band transcript mining, aimed at a memory store
- [Auto Research](auto-research.md) — a criteria-scored loop that improves skills and CLAUDE.md autonomously
- [Skill Evaluation](skill-evaluation.md) — no-ops and the step-by-step skill that should have been a script
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — where the deterministic checks retro recommends end up
- [Reviewer Agents](reviewer-agents.md) — the automated reviewer retro proposes coding standards for
