---
title: "Skill Evaluation"
description: "Why agent skills need evals, and the minimal harness — test-case JSON plus regex asserts — that makes skill quality, trigger reliability, and retirement measurable"
type: "concept"
pillar: "building"
tags: [agent-skills, evaluation, agents, best-practices, anti-patterns, workflow, claude-code]
sources:
  - "summaries/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md"
timestamp: "2026-08-24"
---

# Skill Evaluation

Evaluating [Agent Skills](agent-skills.md) as artifacts in their own right: does this skill trigger when it should, stay silent when it shouldn't, improve task outcomes, and still earn its tokens after the next model upgrade?

The canonical source is Philipp Schmid's *Don't Ship Skills Without Evals* (Google DeepMind, AI Engineer, July 2026). The talk opened with a show of hands: nearly everyone in the room used skills, almost nobody evaluated them. Skills Bench had indexed roughly 50,000 public skills and found almost none with evals attached. [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]

This page covers the *skill-specific* eval problem. For the general vocabulary — tasks, trials, graders, transcripts, harnesses — see [Agent Evaluation](agent-evaluation.md).

## Why Skills Need Their Own Evals

### The attribution problem

Agents are non-deterministic. When a task fails inside a skill's scope, a single run tells you nothing about *why*: the skill may be badly written, or the task may simply be beyond the model. Without a repeatable test across multiple trials, "my skill isn't working" is an unfalsifiable statement.

### The agents we use vs. the agents we build

Schmid's load-bearing distinction, and the reason the problem is invisible to most skill authors:

| | Agents we **use** | Agents we **build** |
|---|---|---|
| Examples | Claude Code, Cursor, Antigravity | A customer-support agent, an in-product assistant |
| Who is at the keyboard | You, the engineer who wrote the skill | A user who does not know skills exist |
| Trigger failure | Noticed in seconds — you stop, reprompt, or type the slash command | Never noticed; the agent just answers worse |
| Invocation modes available | Model-triggered **and** user-invoked | Model-triggered only |

Nobody opens a support chat with *"use the refund skill to help me."* The trigger reliability you personally paper over with instinct becomes an unmonitored failure mode the moment the skill ships to someone else. This is why customer-facing skills need eval discipline most, and why they are the case where it is most often absent.

### Trigger failures dominate

In Schmid's data, **~50% of failures were trigger failures** — the skill never fired, because the description was too weak and the user's prompt too shallow for the model to connect the two. Not bad skill bodies. Bad discovery signals.

### Retirement is invisible without measurement

Capability skills exist to cover a gap in current model ability, and that gap closes on an unknown schedule. A skill covering a closed gap costs tokens and maintenance while contributing nothing. The only way to detect this is an ablation (below).

### AI-generated skills are not free

Skills Bench 1.1 evaluated open and closed models across harnesses on ~100 coding and productivity tasks: skills deliver roughly a **15% average performance lift**. But a follow-up analysis of self-generated skills found that **AI-generated skills can degrade performance**, and Schmid's conclusion was that human-written skills are the strongest option available. The failure loop is the casual one: tell the agent "create a skill," skim the output, accept it, start using it. Whether a *grounded* generation method escapes this finding is treated at [Agent Skills § Who Should Write the Skill?](agent-skills.md#who-should-write-the-skill) — the short answer being that an eval is what settles it either way.

## The Minimal Harness

Schmid's worked example is the Gemini Interactions API skill. The API shipped after Gemini's training cutoff, so no model version had any context for it. The team built **117 test cases** — drawn from real user traffic, synthetic generation, and reported failures ("the model keeps using Gemini 2.0 when we're on 3.0") — and reached **~90% valid code generation**.

The harness is two assets.

### 1. Test cases as a flat data file

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

Fields that matter:

- **`prompt`** — what a real user would actually type, not a primed prompt that names the skill.
- **`language`** / environment — if the skill spans TypeScript and Python, both need coverage.
- **`should_trigger`** — the negative-case switch. Roughly half the cases should be `false`.
- **`expected_checks`** — the asserts.

### 2. A script that runs the agent and asserts

A small Python script invokes the coding agent (Gemini CLI in Schmid's case), captures the output, and checks it. The crucial economic choice: **most skill asserts can be regex**. Correct SDK, correct model ID, correct method names, absence of deprecated patterns — all of it is pattern matching over generated code.

Regex asserts are cheap enough to rerun on every change, and trivially bulk-updatable when a new model ID ships. LLM-as-judge is the fallback for skills complex enough that you must evaluate the whole trace rather than the final artifact: give the judge a rubric, take pass/fail, and read the failures.

### The production version

The internal DeepMind setup adds, per test case:

| Element | Purpose |
|---|---|
| **Workspace definition** | A clean environment, optionally preloaded with application files |
| **Startup commands** | Install libraries / prepare the environment before the run |
| **Script (regex) evals over the trace** | Did the skill trigger? Was a given command or CLI actually run? |
| **LLM-as-judge expectations** | Trace-level judgments the regex can't express |

Evals live **alongside every skill** in the repo, and run **on every diff to the skill**. A change that does not improve the test cases does not merge. Skills get the same regression-test contract as production code.

## Ablation Testing

Run the same eval set twice: skill loaded, skill unloaded. The gap between the two scores *is* the skill's value.

- **Gap is wide** → the skill is earning its tokens.
- **Gap has closed** → the model no longer needs the skill. Retire it.

**Keep the eval after retiring the skill.** Model improvement is not monotonic, and harness behaviour changes. The orphaned eval becomes a permanent tripwire: if performance later degrades, you can reintroduce the skill or adjust the surrounding tooling. Schmid's observation is that with a steady stream of model updates, skills become retirable far faster than authors expect — a skill that was essential six months ago may be dead weight today.

This is the practical instrument behind the capability/preference split in [Agent Skills § Capability vs Preference Skills](agent-skills.md#capability-skills-vs-preference-skills): ablation tells you when a *capability* skill has expired, and guards a *preference* skill against silent regression.

## Eval Design Rules

1. **Start small.** Ten to twenty samples beat nothing, and five to ten will already surface problems you did not know you had.
2. **Half of them negative.** Five happy-path prompts, five prompts where the skill must stay silent. Over-triggering is a real failure mode: a skill scoped to "web development tasks" fires on Angular work when it only knows React, polluting context and confusing the model.
3. **Test outcomes, not paths.** Do not assert that the skill loaded on turn one. Assert that the task was accomplished. Loading on turn five is a pass. Not loading at all and still succeeding is also a pass — and an informative one.
4. **Isolate every run.** Coding agents cheat. Given access to your working environment they will mine previous chats and earlier runs for the skill's content and reproduce the right answer without ever loading the skill. A clean workspace per trial is not hygiene, it is validity.
5. **Run three to six trials per case.** One trial measures luck. Multiple trials measure reliability, which is the property you actually care about.
6. **Test across harnesses.** Agent harnesses behave differently and models behave differently. A skill tuned against Claude Code may fail in Codex or Cursor. If your team or your customers span harnesses, so must the eval.
7. **Use real traces where you have them.** Production failure reports beat synthetic prompts. Nothing substitutes for real-world data.
8. **Gate changes on the eval.** No skill edit without a rerun; no merge without an improvement or a new case.

## Anti-Patterns This Surfaces

### No-ops

An instruction inside a skill that does nothing to change agent behaviour: *"before making an implementation, make it easy to read," "write clear, high-quality code."* The model does this already. Schmid credits [Matt Pocock](../people/matt-pocock.md), who published both the finding and a skill for stripping them, with surfacing that AI-generated skills are dense with no-ops.

No-ops usually do not move eval scores. That is exactly the point: they are pure cost. Every token that does not change agent behaviour is money spent for nothing, on every load.

### The step-by-step skill that should have been a script

If a skill body reads *"Step one, go there. Step two, do this. Step three, do this,"* the workflow is deterministic and should not be a skill at all — write a script and tell the model to run it. Skills should state **goals and constraints**; the model already knows how to edit a config file. Spending model judgment on a procedure with no context-dependent variation pays for judgment you don't need.

This sharpens the existing [Agent Skills § Scripts as Deterministic Tools](agent-skills.md#scripts-as-deterministic-tools) guidance from "move deterministic *steps* into scripts" to "if the whole workflow is deterministic, there is no skill here."

### Vague or essayistic descriptions

The description is the only part of a skill you pay for on **every** model call, and the sole gate on whether the skill is ever discovered. Two rules:

- **Cover why, how, and when.** Why the model should reach for this skill, how to use it, and under what conditions.
- **Write directives, not essays.** *"The Interactions API is recommended for multi-chat because it handles session state"* is passive information. *"Use the Interactions API if you're building a chat application"* is an instruction.

## Related Pages

- [Agent Skills](agent-skills.md) — what skills are, progressive disclosure, capability vs preference
- [Agent Evaluation](agent-evaluation.md) — general eval vocabulary, grader taxonomy, non-determinism metrics
- [Claude Code Skills](../how-tos/claude-code-skills.md) — authoring, invocation control, pitfalls
- [Matt Pocock](../people/matt-pocock.md) — the no-ops finding
- [Infrastructure Noise in Evals](infrastructure-noise-in-evals.md) — why isolated, repeated runs matter for any agent eval
- [Harness Engineering](harness-engineering.md) — keeping context lean, of which the description-cost argument is one instance
