---
title: "Don't Ship Skills Without Evals"
type: "summary"
description: "Philipp Schmid of Google DeepMind on why agent skills need evals, eight rules for writing effective skills, and how to build a cheap regex-based skill eval harness"
channel: "AI Engineer"
date: "2026-07-14"
resource: "https://www.youtube.com/watch?v=0vphxNt4wyk"
pillar: "building"
tags: [agent-skills, evaluation, agents, claude-code, best-practices, workflow, anti-patterns]
timestamp: "2026-08-24"
source_file: "sources/youtube/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md"
---

# Don't Ship Skills Without Evals — Summary

**Source:** AI Engineer (Philipp Schmid, Google DeepMind) | 2026-07-14 | [Link](https://www.youtube.com/watch?v=0vphxNt4wyk) | 21:45

## TL;DR

Nearly everyone writing agent skills ships them untested, which is untenable because agents are non-deterministic — without an eval you cannot tell whether a failure came from a bad skill or a hard task. Schmid's answer is deliberately unambitious: a JSON file of 10–20 test prompts (half of them negative cases the skill should *not* fire on) plus a small script that runs your coding agent and asserts on the output with regex. The same harness that proves a skill works is the only instrument that tells you when a model upgrade has made it obsolete.

## Video Structure

1. [00:12-01:22] Opening — everyone uses skills, almost nobody evals them; Skills Bench indexed ~50k skills and found almost none had evals
2. [01:22-02:28] The framing distinction — the agents we *use* vs. the agents we *build*
3. [02:28-03:07] What a skill is — folder + SKILL.md + assets, on progressive disclosure
4. [03:07-04:15] Capability skills vs. preference skills
5. [04:15-05:34] Do skills work? Skills Bench 1.1 data — ~15% lift, human-written beats AI-generated, keep under 500 lines
6. [05:34-06:37] Model-triggered vs. user-invoked skills
7. [06:37-12:22] Eight tips for writing good skills
8. [12:22-15:41] Practical example — the Gemini Interactions API skill and its 117-case eval
9. [15:41-17:08] How DeepMind evals skills internally — evals alongside every skill, run on every diff
10. [17:14-20:18] Ten best practices for skill evals
11. [20:18-21:25] Homework — pick your most-used skill, write five test prompts, run an ablation

## Key Concepts

### The agents we use vs. the agents we build

The talk's load-bearing distinction. In the agents *you* use — Claude Code, Cursor, Antigravity — you are the engineer, you know your skills exist, and you notice within seconds when one fails to trigger; you stop the task, reprompt, or reach for a slash command. In the agents you *build* for customers, users have no idea skills exist. Nobody opens with "use the refund skill to help me." So the trigger reliability you personally paper over with instinct becomes an unmonitored failure mode the moment the skill ships to someone else.

### Capability skills vs. preference skills

- **Capability skills** teach the model something it cannot do consistently *yet* — tracing logs, scaffolding a React app. These are explicitly **temporary**: as models improve, they become dead weight, and evals are what tell you the expiry date has arrived.
- **Preference skills** encode things a foundation model can never absorb — your team's workflow, your house style, your domain-specific conventions. These are **durable**, and evals here act as regression protection so a model or harness update doesn't silently degrade them.

Schmid's framing diverges usefully from the common "a skill is reusable capability packaging" reading: it treats a skill's *lifespan* as a first-class design property rather than an afterthought.

### Model-triggered vs. user-invoked skills

Model-triggered skills fire on the description alone; user-invoked skills are called explicitly (e.g. a slash command). Schmid argues user-invoked skills are underrated for routine dev workflow — creating a pull request, staging documentation — because the invocation removes the trigger-reliability problem entirely. His corollary: when you build for customers, user-invoked skills don't exist as an option, which is exactly why customer-facing skills need the eval discipline most.

### No-ops

An instruction inside a skill that does nothing to change agent behaviour — "make the implementation easy to read," "write clear, high-quality code." The model already does this without being told. Schmid credits [Matt Pocock](../wiki/people/matt-pocock.md) for surfacing that AI-generated skills are dense with them. No-ops rarely hurt eval scores; they just burn tokens on every load.

### Ablation testing

Running the same eval set with the skill loaded and with it unloaded. The gap between the two scores *is* the skill's value. When the gap closes, the skill has been made redundant by a better model and can be retired — while the eval stays, as a tripwire for future regression.

## Key Takeaways

1. **You cannot debug a non-deterministic system by eyeballing it.** When a skilled task fails, there is no way to attribute the failure — bad skill, or task beyond the model — without a repeatable test.
   **How to apply:** Before your next skill edit, write down what "working" means as five prompts you can rerun.

2. **The description is the highest-leverage 200 tokens in the whole skill.** ~50% of observed failures were trigger failures, not body failures. The description is also the only part you pay for on *every* model call.
   **How to apply:** Rewrite each description to state the *why*, the *how*, and the *when* explicitly — "use this skill when working on React components," not "helps with web development."

3. **Write directives, not essays.** "The Interactions API is recommended for multi-chat because it handles session state" is passive information. "Use the Interactions API if you're building a chat application" is an instruction.

4. **Keep it lean and layer it.** Description (always paid) → SKILL.md body (paid on load) → reference files (paid only when the agent goes looking). Multi-cloud deploy instructions belong in `references/aws.md` and `references/gcp.md`, never in the body.
   **How to apply:** Open your longest skill. If SKILL.md exceeds ~500 lines, Skills Bench data says it is probably hurting you.

5. **Set the right level of freedom — and know when the answer is "not a skill."** If the workflow is a fixed sequence of steps every time, write a script and tell the model to run it. Spending model tokens re-deriving a deterministic procedure is waste. Skills should state goals and constraints; the model already knows how to edit a config file.

6. **Human-written skills beat AI-generated ones.** Skills Bench 1.1 found skills give ~15% average performance lift across ~100 coding and productivity tasks — but self-generated skills can *degrade* performance. The "tell the agent to write a skill, skim it, accept it" loop is the problem.

7. **Never skip negative cases.** A skill scoped to "web development tasks" over-triggers across React, Angular, and everything else, polluting context and confusing the model. Half your test prompts should be cases where the skill must stay silent.

8. **Test outcomes, not paths.** Don't assert that the skill loaded on turn one. Assert that the task was accomplished. If the agent gets there on turn five, or without the skill at all, that is a valid pass — and an informative one.

9. **Run isolated, and run repeatedly.** Coding agents cheat: given access to your existing environment they will mine previous chats and prior runs for the skill's content without ever loading it. Use clean workspaces. And because agents are non-deterministic, run three to six trials per case and measure reliability, not a single outcome.

10. **Test across harnesses, not just your own.** A skill tuned on Gemini may fail on Codex. If your team or your customers run different harnesses, evaluate against them.

11. **Keep the eval after you retire the skill.** The eval outlives the skill it was written for — it becomes a permanent regression check, and if performance later degrades you can reintroduce the skill or adjust the tooling.

12. **Gate skill changes on the eval.** At DeepMind, evals live alongside every skill and run on every diff to it; a change that doesn't improve the test cases doesn't merge.
    **How to apply:** Even without CI, adopt the rule manually — no skill edit without a rerun.

## Argument Structures

**The central argument for why evals are non-optional:**

> P1. Skills measurably help (~15% average lift on Skills Bench 1.1).
> P2. But AI-generated skills can *hurt* performance, and most skills in the wild are AI-generated and untested (~50k indexed, almost none with evals).
> P3. Agents are non-deterministic, so a single failed run carries no diagnostic information — you cannot separate "the skill is bad" from "the task is too hard."
> P4. In the agents you use yourself, you compensate for P3 with instinct and immediate reprompting; the feedback loop is tight enough to hide the problem.
> P5. In the agents you build for others, that compensation is unavailable — users don't know skills exist and will never reprompt around a mis-trigger.
> ⇒ The only way to know whether a skill helps is to measure it, and the need becomes acute exactly when the skill leaves your own terminal.

**The retirement argument (why the eval outlives the skill):**

> P1. Capability skills exist to cover a gap in current model ability.
> P2. Model ability increases over time; the gap therefore closes on an unknown schedule.
> P3. A skill covering a closed gap costs tokens and maintenance while adding nothing.
> P4. You can only detect a closed gap by comparing performance with and without the skill (ablation).
> ⇒ Run ablations continuously; retire skills when the gap closes — but keep the eval, since P2 does not guarantee monotonic improvement and the eval is your only warning if a regression reopens the gap.

**The "script, not skill" argument:**

> P1. Skills consume tokens and invite model judgment at every invocation.
> P2. Model judgment is only valuable where outcomes vary with context.
> P3. A step-by-step fixed workflow has no context-dependent variation.
> ⇒ Encoding a fixed workflow as a skill pays for judgment you don't need. Write a script and have the model call it.

## Notable Commands / Code Snippets

The eval harness Schmid describes is deliberately minimal — two assets.

**1. Test cases as JSON** (117 of them for the Gemini Interactions API skill):

```json
{
  "prompt": "Build a chat app with Gemini that keeps conversation state",
  "language": "python",
  "should_trigger": true,
  "expected_checks": [
    "uses the correct SDK",
    "uses a current model ID",
    "uses the correct methods",
    "contains no deprecated patterns"
  ]
}
```

**2. A small Python script** that runs the coding agent (Gemini CLI in his case), captures the output, and asserts against it. Most assertions are plain **regex** — cheap enough to rerun on every change, and easy to bulk-update when a new model ID ships. LLM-as-judge with a rubric is the fallback for complex skills where you need to evaluate the whole trace rather than the final artifact.

The internal DeepMind version adds, per test case: a clean **workspace** definition (optionally preloaded with application files), **startup commands** to install dependencies, **script/regex evals** run over the trace (did the skill trigger? was a given command run?), and **LLM-as-judge** expectations. Result on the Interactions API skill: ~90% valid code generation.

**Homework Schmid leaves the audience:**

- Pick your most-used skill (ask your coding agent to mine your trajectories for it).
- Write five test prompts for it.
- Strip the no-ops.
- Run an ablation — with the skill, without the skill.

## User Notes

Three questions drove this ingest: what makes a skill effective, how to build a skill eval, and why they're needed at all. The answers land as one loop rather than three separate topics — the description quality that makes a skill effective is precisely what the negative test cases measure, and the ablation that justifies a skill is the same run that later retires it.

The sharpest practical filter for this wiki's own skills is Schmid's step-by-step boundary: any skill whose body reads as "step one, step two, step three" is a script wearing a skill's clothing. The second is the 500-line threshold — a concrete, checkable number.

## Related Topics

agent-skills, evaluation, agents, claude-code, best-practices, workflow, anti-patterns
