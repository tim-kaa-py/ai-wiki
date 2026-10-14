---
title: "New Skills! v1.3 brings /pr, /implement-spec, and /retro"
type: "summary"
description: "Matt Pocock's skills repo v1.3 adds /implement-spec (sub-agent orchestration of a spec's tickets into one PR), /pr (an evidence-and-risk PR body template) and /retro (human-in-the-loop review of real agent sessions), and renames CONTEXT.md to GLOSSARY.md."
channel: "Matt Pocock"
date: "2026-10-05"
resource: "https://www.youtube.com/watch?v=BsJGo1wFTvQ"
pillar: "building"
tags: [claude-code, skills, agents, subagents, workflow, code-review, verification]
timestamp: "2026-10-14"
source_file: "sources/youtube/2026-10-05_matt-pocock_new-skills-v1-3-brings-pr-implement-spec-and-retro.md"
---

# New Skills! v1.3 brings /pr, /implement-spec, and /retro — Summary

**Source:** Matt Pocock | 2026-10-05 | [Link](https://www.youtube.com/watch?v=BsJGo1wFTvQ) | 14:34

## TL;DR

Version 1.3 of Pocock's skills repo ships three skills. `/implement-spec` lets an orchestrator agent work through a spec's tickets with sub-agents and deliver one review-ready PR, `/pr` is a PR body template built around evidence and risk, and `/retro` reviews real agent sessions to suggest improvements to the repo and agent setup. Alongside them come two arguments worth keeping: a ranking of ticket loops (script beats sub-agent beats human), and a warning not to automate `/retro`. The release also renames the domain-modeling file from CONTEXT.md to GLOSSARY.md, which is a breaking change for anyone using his skills.

## Video Structure

1. [00:00-00:28] Intro — v1.3 brings implement-spec, pr and retro; retro is the one that took off on social media.
2. [00:28-01:08] Spec and tickets — the spec is the destination, tickets split it into single-session chunks so no agent hits the "dumb zone" or auto-compact.
3. [01:08-03:23] Three ways to loop over tickets — manual, deterministic script, and sub-agent orchestration.
4. [03:23-04:54] Inside /implement-spec — nine steps, task graph, parallel TDD sub-agents in worktrees, code review, one PR.
5. [04:54-08:11] /pr — PR body template inspired by a "Show Me" skill: visual summary, before/after evidence, merge danger, blast radius; a worked example.
6. [08:11-09:38] CONTEXT.md becomes GLOSSARY.md — why the domain-modeling file was renamed.
7. [09:38-12:34] /retro — what it is, why it reads real sessions, and a live run.
8. [12:34-13:33] Keep retro human-in-the-loop — why not to automate it.
9. [13:33-14:34] Retro's improvement categories and outro.

## Key Concepts

### Spec and tickets

Pocock's flow for landing large pieces of work has two parts. The spec says where you are going. The tickets break that destination into chunks that each fit in a single coding-agent session. Doing a whole spec in one session pushes the agent into the "dumb zone" of a long context and can trigger auto-compact. He grants that this sometimes works and is getting better, but ticket-by-ticket is "just a lot cleaner" [00:28-01:08].

### Tickets as a task graph

`/implement-spec` treats tickets as "a task graph with blocking relationships between them", not a list of steps. At any moment there is a "frontier" of tickets that are unblocked and ready, so it can run several in parallel [03:35-03:46].

### /implement-spec

Pocock says the skill has nine steps plus some reference material [03:25-04:23]. The [v1.3.1 SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/implement-spec/SKILL.md) lists them as:

1. Read the spec and tickets to understand the task graph.
2. (Optional) Run an exploration sub-agent that saves its notes outside the repo, where every later sub-agent can read them.
3. Create the integration branch, and open a draft PR after the first merge if the issue tracker closes work through PRs or the user asks for one.
4. Hand each ready ticket to an implementer sub-agent, in the background where possible. Each one works in its own worktree and branch, checks the worktree is based on the integration branch, builds the ticket with the `tdd` skill, and merges the integration branch tip in before reporting done.
5. Merge each finished ticket into the integration branch with a merger sub-agent.
6. When a merge changes the frontier, start implementer sub-agents on the newly unblocked tickets.
7. Once every ticket is done, run the `code-review` skill on the integration branch and fix everything it raises in a single implementer sub-agent.
8. Mark the draft PR ready for review if one exists; otherwise close the tickets the way the tracker does and report the integration branch.
9. Clean up all worktrees.

Two details from the file that the video does not mention: sub-agents talk to each other sparsely, mostly through "context pointers" to the spec, tickets, notes and commits rather than repeating them; and the skill is user-invoked only (`disable-model-invocation: true`). The single PR at the end is the default when the tracker works through PRs. Pocock calls it "a basic version" that people should adapt, for example with stacked PRs [04:41-04:54].

### /pr

All `/pr` does is give the agent a template for the PR body [05:41-05:46]. The video presents four parts; in the [v1.3.1 SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/pr/SKILL.md) they are three sections, with door and blast radius as two fields under Merge Danger:

- **Summary:** a visual overview. Its menu of visuals (pseudocode, call trees, component trees, file trees, Mermaid, diffs) and the guidance to pick the smallest view that makes the point come from Dex Horthy's `show-me` skill (Humanlayer), copied in almost word for word rather than depended on, with credit in the skill's [CREDITS.md](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/pr/CREDITS.md).
- **Evidence:** before and after. Asking for hard evidence often makes the agent run an extra test or take a screenshot, and gives runtime proof that the change does what the agent thinks. Without it, agents tend to say "that probably works because I've read the code" [05:53-06:22]. The skill ranks screenshots "S-tier" for visual changes and execution output (test results, console output) "A-tier".
- **Merge danger:** is this a one-way or two-way door? A two-way door can be walked back through: the PR is easy to revert. A one-way door does something out in the world, such as deleting data, or is expensive to roll back [06:28-06:53].
- **Blast radius:** the possible knock-on effects of the change, as a one-word description plus optional ramifications. A small blast radius on a two-way door does not need a hard review [06:54-07:05].

The skill also tells the agent to skip preambles and use the domain language from GLOSSARY.md.

His example PR merges two near-identical algorithms. It shows the files deleted and added, the call structure, a before/after on a real entity, merge danger "two-way" (a pure refactor plus one deliberate behaviour change) and a small blast radius [07:13-07:46].

### /retro

Short for retrospective. You run it on one or more coding-agent sessions (the current one, the previous one, or several) and it suggests improvements for next time [10:27-10:41]. It bundles up the upkeep Pocock had been doing by hand and asking his users to do: maintaining AGENTS.md and skills, keeping the repo token-efficient, keeping the environment safe for the agent, and having good lint rules and navigation [09:43-10:27]. Reading real sessions matters because it shows the inefficiencies the agent "actually hides from". Agents push through problems until the feature gets built and do not complain or fix the cause, so another agent has to look back over the sessions [10:42-11:16]. In the live demo it flagged, among other things, an unrun check script that needed a CI pipeline.

The skill checks these categories [13:35-13:58]:

- How easy is the codebase to navigate?
- Are there automated checks we could add?
- Could we add coding standards for the automated reviewer to enforce?
- How healthy is the global AGENTS.md?
- Is the tool economy any good?
- Are there no-ops in the instructions or steering files?
- Does the agent have access to all the information it needs?

The [v1.3.1 SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/retro/SKILL.md) adds detail the video skips. The skill is user-invoked only (`disable-model-invocation: true`), which fits Pocock's warning against automating it. It loads the `writing-for-agents` skill first, finds sessions in the session logs on the machine (defaulting to the current one), and presents candidates ordered by severity. Each category carries a "use when" trigger. Two rules stand out: a mechanical coding-standard violation gets a deterministic check (lint rule, pre-commit hook or CI job) rather than a written rule, and a repo with no guardrail at all is itself a finding. Its reference section argues that the review agent, which has the least context pressure, should enforce coding standards, and that CLAUDE.md/AGENTS.md should hold little beyond navigation pointers.

### GLOSSARY.md (formerly CONTEXT.md)

The domain-modeling skill (used in his "grill with docs" flow) now writes to GLOSSARY.md instead of CONTEXT.md [08:11-09:38]. The old name came from "bounded context" in Eric Evans's *Domain-Driven Design*. Pocock says there are no other behaviour changes: "literally just a file name change" [09:29-09:32]. In the repo, the format file is now `GLOSSARY-FORMAT.md`.

## Key Takeaways

1. **There are three ways to loop over tickets, and a script is best** [01:08-03:23]. The manual loop has you acting "like a for loop": implement ticket one, wait, clear context, implement ticket two. It is "not really workable". The deterministic loop is a script that reads each ticket and runs the implementation. It is what Pocock recommends for most people: it runs the same way every time and is cheap, because neither an agent nor a human runs the loop. But setting it up and refining it takes patience, so it is out of reach for beginners. The sub-agent loop (`/implement-spec`) is the middle ground: "an agent does the babysitting instead of a human." He rates it below a script because it is not deterministic, but calls it a good way into AFK (away-from-keyboard) workflows.
   - **How to apply:** Use `/implement-spec` to run whole specs unattended while you have no script. Once the flow is stable, move it to a deterministic script.

2. **Nested sub-agents are what make /implement-spec possible** [02:44-02:58]. Sub-agents can now spawn their own sub-agents. Before, they were "a little bit nerfed". Now they are "as powerful as orchestrator agents", which is what lets an agent take over the orchestrator role and hand tickets to implement sub-agents.
   - **How to apply:** Check that your harness supports nested sub-agent spawning before relying on an orchestrator skill like this one.

3. **Read a skill before you use it** [03:23-03:30].
   - **How to apply:** Open the SKILL.md file before installing anyone's skill, his included.

4. **The PR is the bottleneck, so design PR bodies for human review** [05:28-05:40]. "PRs are still the main bottleneck for work getting to main." The merge-danger section (door plus blast radius) tells the reviewer how hard to look.
   - **How to apply:** Install `/pr`, or copy its evidence, merge-danger and blast-radius sections into your own PR skill.

5. **Asking for evidence builds trust in agent output** [05:53-06:25]. Evidence is "an essential part of learning to trust your agent's outputs". Pocock says verification is something he is "beginning to be really obsessed with".
   - **How to apply:** Require a before/after (test output, screenshot, runtime result) in every agent-written PR.

6. **/pr gets invoked reliably by the model on its own** [07:46-08:03]. It is "one of the most consistently invoked model-invoked skills" he has seen: the user does not have to call it, and the model "seems to just invoke it every single time, at least on Opus 5.5."
   - **How to apply:** Install it and expect better PR bodies without changing your prompts. Note that the claim is limited to Opus 5.5. The skill files match the design: `/pr` has a one-line trigger description ("Use when writing a PR body.") and is model-invocable, while `/implement-spec` and `/retro` are user-invoked only.

7. **A file name has to tell the agent when to load it, so CONTEXT.md became GLOSSARY.md** [08:41-09:38]. "Context.md just felt way too vague. It didn't trigger the agent to pull it in at the right moment," and users found it confusing. The file had also shrunk until it was "literally just a glossary". This is a breaking change: many of his skills now expect GLOSSARY.md to be there so they can use the domain language.
   - **How to apply:** If you use his skills, rename CONTEXT.md to GLOSSARY.md. More generally, name agent-facing files after what they contain, so the agent knows when to read them.

8. **Keep /retro human-in-the-loop and run it on a sample of sessions** [12:34-13:33]. Retro is "merciless" and will nearly always find something, but you need your own judgment on its findings. In his own run, what it ranked most serious was a minor issue. Automating it means "the agent will get itself into a loop where it continually finds false positives", keeps trying to fix things, and takes "the repo and your agent into a place it shouldn't really go."
   - **How to apply:** When you have a free moment, run `/retro` by hand on recent sessions, especially ones that went wrong or where the agent did something odd. Act only on the findings you agree with.

## Argument Structures

**The loop ranking** [01:08-03:23]

- Large specs need splitting into tickets, and something has to loop over them.
- A human loop works but is tedious and does not scale.
- A script loop is deterministic, reliable and cheap, but hard to build and refine, so beginners cannot get there.
- Sub-agents can now spawn sub-agents, so an agent can run the loop at about the power of an orchestrator.
- Therefore a sub-agent loop is a usable middle ground: less reliable than a script, much better than a human, and an entry point to AFK work.

**Why /pr asks for evidence** [05:53-06:22]

- Without being asked, agents settle for "it probably works, I've read the code".
- Asking for before/after evidence pushes them to run an extra test or take a screenshot.
- That gives the reviewer runtime proof, which builds trust in agent output and makes review cheaper.

**Why /retro must not be automated** [12:34-13:16]

- Retro almost always finds something, and some findings are false positives or overrated.
- An automated loop would act on every finding, including the false ones.
- Repeated unchecked fixes drift the repo and agent setup somewhere they should not go.
- Therefore a human picks which findings to act on, and retro is run on a sample of sessions, not continuously.

## Notable Commands / Code Snippets

The `/pr` body template, verbatim from the [v1.3.1 SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/pr/SKILL.md):

```markdown
## Summary

<diagram, diff-sketch, or tree>

## Evidence

- **Before:** <screenshot/output/failing test run>
  **After:** <screenshot/output/passing test run>

## Merge Danger

**Door:** <one-way or two-way>

<optional: description>

**Blast Radius:** <one-word description>

<optional: potential ramifications of merge>
```

## User Notes

- Main interest: what each of the three new skills does and how. `/implement-spec` [00:28-04:54] turns a spec and its tickets into an orchestrator with a task graph and parallel TDD sub-agents in worktrees, ending in one review-ready PR. `/pr` [04:54-08:11] is a PR body template (visual summary, before/after evidence, merge danger, blast radius). `/retro` [09:38-14:06] reviews real agent sessions and proposes improvements to the repo and agent setup.
- Confirmed discoveries: the three-loop ranking and nested sub-agents as what makes `/implement-spec` work (A); the CONTEXT.md to GLOSSARY.md rename and why (B); keeping retro human-in-the-loop (C); `/pr` being reliably model-invoked, at least on Opus 5.5 (E).

## Related Topics

claude-code, skills, agents, subagents, workflow, code-review, verification, tdd, worktrees, pull-requests, domain-driven-design, afk-workflows
