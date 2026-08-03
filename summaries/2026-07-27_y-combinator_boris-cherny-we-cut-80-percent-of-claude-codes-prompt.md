---
title: "Boris Cherny: We Cut 80% of Claude Code's Prompt"
type: "summary"
description: "Claude Code's creator on deleting 80% of the system prompt via ablations, hard-task-plus-verification as the core skill, and dynamic workflows as a new axis of test-time compute."
channel: "Y Combinator"
date: "2026-07-27"
resource: "https://www.youtube.com/watch?v=qyPCVqFUyDo"
pillar: "building"
tags: [claude-code, prompt-engineering, agents, best-practices, anti-patterns, workflow]
timestamp: "2026-08-03"
source_file: "sources/youtube/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
---

# Boris Cherny: We Cut 80% of Claude Code's Prompt — Summary

**Source:** Y Combinator | 2026-07-27 | [Link](https://www.youtube.com/watch?v=qyPCVqFUyDo) | 35:51

## TL;DR

Boris Cherny's central claim is that prompt scaffolding is a **liability that expires**: Claude Code deletes and rebuilds its system prompt on every model release using ablations, and with Opus 5 that meant cutting 80% — because most of the prompt was correcting behaviors the model now gets right unprompted. He argues the durable skill is no longer prompt engineering but *giving the model a task slightly too hard and giving it a way to verify its own work* — the two rewrites he cites (Bun's Zig→Rust port in 11 days, a still-running Electron→Swift port at 14+ days) were both short prompts whose real content was the verification loop. Underneath that sits dynamic workflows — an "algebra for agents" that orchestrates thousands of sub-agents and, in his framing, constitutes a genuinely new axis of test-time compute scaling.

## Video Structure

1. [00:03-03:21] Opus 5 capabilities — long-horizon runs, prompt-injection resistance via alignment + interpretability classifier + auto-mode classifier
2. [03:21-05:24] The 80% deletion — why every model release triggers a prompt purge; `--system-prompt`; `CLAUDE_CODE_SIMPLE=1` as an ablation tool
3. [05:24-07:20] Ablation as methodology — delete everything, bring it back line by line; what's left in the harness; "delete your CLAUDE.md every 6 months"
4. [07:20-10:30] Rebuilding the prompt — delete → use → add back only on repeated stumbles; evals outlive the harness by 1-3 generations, then saturate
5. [10:30-13:54] Product overhang and hobbling — definitions, and the original Claude Code as an un-hobbling of Sonnet 3.5
6. [14:47-19:32] Give it harder tasks — the Bun Zig→Rust rewrite (11 days); OpenCV drawing as accidental elicitation
7. [19:57-24:41] Verification as the key skill — the Electron→Swift pixel-diff rewrite, still running at 2 weeks; over-specification as the experienced-engineer failure mode
8. [24:48-30:15] Dynamic workflows as algebra for agents and a new test-time-compute axis; loops and routines; Claude maintaining its own codebases
9. [30:15-32:20] "Coding is solved" — with caveats; the empirical mindset as the differentiator
10. [32:20-35:51] What CS students should still learn by hand; Max 20x giveaway

## Key Concepts

### Ablation (applied to system prompts)

Borrowed straight from research practice: *"you delete the entire system prompt and then you bring it back line by line to figure out what is the impact of each individual line"* [06:01-06:09]. Cherny frames it explicitly as a species of eval — *"an eval where you delete things to figure out the impact"* [06:14-06:17]. The divergence from common practice is that most teams treat the system prompt as an append-only artifact that accretes fixes; here it's treated as a hypothesis set that must re-justify itself against each new model. Anthropic runs the same procedure on tools — *"we unship tools all the time"* [06:19-06:20].

### `CLAUDE_CODE_SIMPLE=1` / simple mode

An **undocumented** environment variable that strips *all* system prompts including tool prompts [04:44-05:00]. Its stated purpose is internal: it's the ablation instrument. The finding worth quoting is counterintuitive — *"the model is actually a little bit more intelligent without these prompts"* [05:05-05:10]. The immediate qualifier matters as much: you still want some prompts in the shipped product *"because it helps you use the product"* [05:13-05:24]. So the prompt's remaining job is **product behavior**, not model capability — those are now separable concerns.

### Product overhang and hobbling

Two sides of one coin [10:30-12:06]. **Product overhang**: today's model can already do things nobody has built a product to elicit — *"the model can do this at every given model generation, but there is often not a product that lets the model do this."* **Hobbling**: the product actively gets in the way. Cherny's diagnostic question for founders is therefore not "what will the next model enable" but "what can the current model already do that my product forbids." He claims *"there's so much product overhang that I'm not seeing startups capture"* [13:34-13:42].

### Dynamic workflows ("algebra for agents")

A Claude Code feature invoked by literally saying *"use a workflow"* [24:48-25:35]. Implementation: Bun is used as a sandbox, a VM is started inside it, and Claude orchestrates agents within it. The shape is fan-out → verify/summarize → fan-out again [26:09-26:29]. The design comes from Cherny's functional-programming background — *"essentially an algebra for agents"*: primitives for running agents in sequence and in parallel, composable [26:29-26:47]. The strong claim: *"this is actually like a new form of test time compute"* — after net size, data, and training flops came token-generation-based test-time compute, and dynamic workflows are *"a new way to orchestrate test time compute"* and to ramp it far higher [26:47-27:34].

### Loops vs. routines

Distinct from dynamic workflows. A **loop** is a cron job running locally; a **routine** is the same in the cloud, so you can close your laptop [27:40-27:54]. The structural difference from a dynamic workflow: a workflow is *one task broken into chunks* (shared context), while loops/routines are *one repetitive task that doesn't share context but might share memory*, run hourly/daily [27:54-28:11].

### Un-hobbled self-maintenance

Anthropic runs ~20-30 daily routines across CLI, iOS, Android, and desktop codebases [28:11-29:54]: dead-code cleanup, shipping fully-rolled-out experiments, adding test coverage, deleting useless tests *"added by older models or added by people"*, and "abstraction police" — finding near-duplicate abstractions across a large codebase and unifying them. Note the elicitation detail: the dead-code routine is one sentence, and *"it'll look for dead code... using static and dynamic analysis. We didn't prompt that. It just kind of figured it out"* [28:38-28:45].

## Key Takeaways

1. **Delete the system prompt on every model release, then rebuild it — don't append.** Most of Claude Code's prompt was *"correcting for these behaviors that the model should have known, but it didn't. Now, Opus 5 just does it"* [04:20-04:29]. Instructions are debt priced per-invocation.
   **How to apply:** Run `claude --system-prompt "<minimal>"` or `CLAUDE_CODE_SIMPLE=1 claude` on a task you know well and compare against your normal setup. Keep a short A/B list of what actually regressed.

2. **The rebuild order is delete → use → add back only on *repeated* stumbles.** *"You don't want to guess what's the instruction that the model needs because you might not predict it correctly"* [07:49-07:55]. Add back *"only when you see it repeatedly stumble on the same thing"* [08:14-08:20], because *"the model is going to read this instruction every single time you use it"* [08:21-08:27].
   **How to apply:** Keep a stumble log during the rebuild week. One-off failures don't earn a line; a third repeat does.

3. **This applies to your own config, not just to harness builders.** *"For people that aren't building agentic products, but you're using Claude Code, every 6 months delete your Claude MD. Delete your skills. Delete your hooks. See what the model does and it might surprise you"* [06:55-07:08].
   **How to apply:** Git-stash `CLAUDE.md`, `.claude/skills/`, and hooks for a week rather than deleting outright. Reinstate only the lines that provably earn their tokens.

4. **Evals are more durable than prompts — but not much.** *"An eval might live for maybe one, two, three model generations... very often we just saturate the eval, and then we have to throw it away"* [10:01-10:19]. Cherny explicitly pushes back on the interviewer's cleaner framing that evals are constant while code and prompts are disposable.
   **How to apply:** Treat eval saturation as a scheduled event. When a suite hits ceiling, build the next one from where the current model actually struggles, not from where the old one did.

5. **Give the model tasks slightly harder than you think it can do — and stop over-specifying.** *"A really common mistake... they just give it like way over specific instructions... You want to describe the task, you want to describe the guardrails, you want to describe like the exit criteria, and then just let the model cook"* [14:59-15:26].
   **How to apply:** Rewrite your next prompt as three things only — task, guardrails, exit criteria. Delete every step-by-step ordering instruction.

6. **Verification is the single highest-leverage thing, and the thing most people get wrong.** *"How do you make it possible for Claude to verify its work along the way? And the verification I think is probably the single most important thing that people do not get right"* [20:25-20:35].
   **How to apply:** Before the prompt, answer: what artifact can the model inspect to know it's wrong? Test suite, screenshot diff, type check, fuzzer. If there isn't one, build it first.

7. **A well-verified prompt beats orchestration scaffolding.** The 14+ day Electron→Swift rewrite prompt was, verbatim: rewrite the Electron app in Swift, run the Electron app in the Mac VM, screenshot it, compare pixel by pixel to the Swift version, *"don't stop until you're done"* [21:33-21:54]. Cherny's gloss: *"You don't need slash goal, you don't need slash loop. These help, but really all you need is give the model the task, give it a way to verify the output of its work so it doesn't get stuck, and it will just go"* [22:33-22:48].
   **How to apply:** Provision the verification substrate first (a runner, a VM, repo access — Cherny hooked up a macOS GitHub runner and an empty repo *before* prompting), then write one paragraph.

8. **Throw every new model at your existing hard problem — the answer changes.** The Bun team had been using Claude to *fuzz* for memory leaks case-by-case; Jared retried the full Zig→Rust rewrite each model generation, and it first became possible with Fable. One prompt plus steering, 11 days, entire runtime rewritten, now in production [16:33-18:16]. Human estimate: *"definitely over a year"*.
   **How to apply:** Maintain a personal "not yet possible" list of concrete tasks and re-run it on each release. That list is your product-overhang radar.

9. **Play without a commercial hypothesis — elicitation gaps are found accidentally.** Someone at Anthropic gave Opus 5 OpenCV and asked it to draw; it does portraits, animals, landscapes, and *"we didn't train the model to draw"* [18:46-19:21]. Cherny: *"my hypothesis is there's probably dozens, hundreds of opportunities like this with the models of today that no one has yet realized."*
   **How to apply:** Budget deliberately useless experiments. Combine the model with a library it wasn't marketed for.

10. **Escalate deliberately when the model struggles: prompt → skill → MCP.** *"You have to see where it struggles and then you have to fix that either with better prompting or with a skill or if the model's missing context like give it a MCP so it can pull in the context that it needs"* [23:44-23:58]. Also note the framing that long-horizon reliability *"is about hallucination"* [22:26-22:29] — verification is what stops drift compounding over days.
    **How to apply:** Diagnose the failure class first. Missing context → MCP. Missing procedure → skill. Wrong framing → prompt. Don't reach for the heaviest tool first.

11. **Over-engineering is the experienced engineer's characteristic failure mode.** *"When I look at engineers that have been coding for years or for decades, this is a really really common failure mode: trying to over specify... get the model to do the task exactly the way that you would have done it. And that's just not the way the model works"* [24:07-24:29]. The corrective framing: *"treat this thing like you would a coworker. I think that's the level of intelligence that it's at now"* [24:35-24:42].
    **How to apply:** Before sending, ask whether you'd give a competent colleague this level of step-by-step direction. If not, cut it.

12. **Reach for the right parallelism primitive.** Dynamic workflows for one big task decomposed into chunks; loops/routines for repetitive context-free work on a schedule.
    **How to apply:** Say "use a workflow" in Claude Code for a genuinely large decomposable task. For maintenance chores, write one-sentence routines and let them run daily — Anthropic's own "abstraction police" and dead-code routines are each a single sentence.

## Argument Structures

**Why delete the prompt on every model release**

- Premise: every model generation is materially different — *"something that you did for one model maybe 3 months ago, it just might not translate at all to the next model"* [04:07-04:14].
- Premise: most prompt lines exist to correct model deficiencies, not to add capability [04:20-04:27].
- Premise: prompt tokens are paid on every single invocation and the ablation result shows the model is *slightly more intelligent* without them [05:05-05:10, 08:21-08:27].
- Therefore: carrying a prompt forward is carrying corrections for a model that no longer exists — a pure cost with negative capability effect.
- Corollary: what survives is what's about *product behavior*, not model behavior. This is why 80% could go while Claude Code still feels like Claude Code, and why the remaining harness code is *"almost all... about safety and permissions and static analysis and there's a bunch of UI code"* [06:22-06:37].

**Why add instructions back only after repeated stumbles**

- Premise: you cannot predict which instruction the model needs — *"you might not predict it correctly"* [07:49-07:55].
- Premise: a single failure is indistinguishable from sampling noise; a repeated failure on the same thing is a signal.
- Premise: every added line has a permanent per-call cost.
- Therefore: the evidentiary bar for a new prompt line must be repetition, not one bad run. This inverts normal engineering, where you fix a bug the first time you see it.
- Grounding premise: *"the way to think about it is almost like a living creature... every model generation, it behaves differently. It has a slightly different personality"* [08:55-09:13]. If the artifact is organic rather than designed, the correct discipline is empirical observation, not up-front system design — *"a re-architecture is a big project... sometimes takes years. And the model is not like that"* [08:35-08:54].

**Why verification is the single most important skill**

- Premise: modern models can sustain tasks for days or weeks [01:27-01:44, 21:57-22:09].
- Premise: over that horizon, the binding constraint stops being capability and becomes drift — *"this is about hallucination"* [22:26-22:29].
- Premise: a model with a way to check its own work *"doesn't get stuck, and it will just go"* [22:41-22:48]; without one, errors compound silently and unrecoverably.
- Therefore: the marginal return on a better-worded prompt is small; the marginal return on a verification channel (test suite, screenshot pixel-diff, fuzzer) is what unlocks the multi-day regime.
- Supporting evidence: both flagship examples are verification-first. Bun was chosen partly because *"it's very, very well tested... it's easy to know if you did the right thing"* [17:16-17:24]. The Swift rewrite's entire prompt is a verification loop with an exit condition.
- Consequence for hiring/skills: *"the skill nowadays is less about prompt engineering and more about figuring out how do you give Claude a hard task that seems a little bit too hard. And then how do you make it possible for Claude to verify its work"* [20:13-20:29]. Prompt engineer → context engineer → this. Cherny expects these waves to keep coming: *"these will kind of like come and go"* [20:08-20:13].

**Why over-specification is an anti-pattern (and why seniority makes it worse)**

- Premise: pre-LLM engineering rewarded exhaustive specification — big designs, big unit-test suites, everything thought through up front.
- Premise: that instinct transfers as step-by-step prompting — *"you must do like one, then two, then three, then four"* [15:08-15:14].
- Premise: over-specifying constrains the model to the human's solution path, which forfeits the model's own (often better) approach, and hobbles it in exactly the sense defined earlier.
- Therefore: experience is a *negative* transfer here, and the fix is unlearning — *"it's a journey to unlearn it"* [24:29-24:35]. The correct interface is task + guardrails + exit criteria, at coworker altitude.
- Note the tie-back: over-specification is self-inflicted hobbling. It's the same failure as a product that blocks the model, applied at the prompt level.

**Dynamic workflows as a new axis of test-time compute**

- Premise: model intelligence has historically scaled along net size, training data, and training flops [26:54-27:13].
- Premise: test-time compute added a fourth axis — *"a fancy way, a researcher way of saying how many tokens does it generate"* [27:13-27:21].
- Premise: a single agent's token generation is bounded by its context and serial time.
- Premise: an orchestration algebra (sequence + parallel composition, sandboxed, with verify/summarize stages between fan-outs) lets one task consume thousands of agents' worth of tokens productively [25:35-26:47].
- Therefore: orchestration is not merely an engineering convenience but *"a new way to orchestrate test time compute"* — a scaling axis you can push on without waiting for a new model [27:21-27:34].
- Empirical support: 11-day and 14-day runs, thousands to tens of thousands of agents [24:50-24:57], ~20-30 self-maintenance routines doing *"the work of dozens or hundreds of engineers"* [29:54-30:06].

## Notable Commands / Code Snippets

Override the system prompt entirely (experimentation):

```bash
claude --system-prompt "<your minimal prompt>"
```

Simple mode — undocumented ablation switch; strips **all** system prompts, including tool prompts:

```bash
CLAUDE_CODE_SIMPLE=1 claude
```

Trigger a dynamic workflow — no syntax, just say it:

```
use a workflow
```

The 14-day Electron→Swift prompt, reconstructed verbatim from [21:33-21:54] — note that it is entirely task + verification loop + exit condition:

```
Rewrite the Electron app in Swift.
Run the Electron app in the Mac virtual machine, screenshot it,
and then look pixel by pixel, compare it to the Swift version.
Don't stop until you're done.
```

Setup that preceded it (verification substrate first): a macOS GitHub Actions runner for the VM, plus access to an empty target repo [21:00-21:33].

## User Notes

Focus for this ingest was the *methodology*, not the model-capability news:

- **Prompt deletion as engineering discipline.** The takeaway I want on record is that a system prompt is a set of expiring corrections, not an asset — and that `CLAUDE_CODE_SIMPLE=1` exists as an ablation instrument. The counterintuitive finding (slightly *more* intelligent without prompts, but keep some for product behavior) is the quotable bit: capability and product behavior are separable concerns in the prompt.
- **The rebuild loop** — delete → use → add back only on repeated stumbles — is directly transferable to how I maintain `CLAUDE.md` in this wiki. The 6-month purge recommendation applies to my skills and hooks too.
- **Hard task + verification** is the framing I'd actually lead with in conversation: prompt engineering → context engineering → *make the task too hard and give it a way to check itself*. The Swift rewrite is the best single artifact for it — the prompt is short precisely because the verification loop carries the weight.
- **Dynamic workflows / loops / routines** — worth keeping straight: workflow = one task chunked, shared context; loop = local cron; routine = cloud cron, no shared context but shared memory. The "algebra for agents" and "new axis of test-time compute" framings are the parts I hadn't seen argued elsewhere.
- **Deliberately excluded:** Opus 5 capability claims and prompt-injection-resistance discussion [00:28-03:21], and the Claude Code birth story [13:54-14:47]. Kept only the overhang/hobbling *definitions* [10:30-13:54], which are load-bearing for the rest.
- Discoveries kept: what remains in the harness after deletions (safety, permissions, static analysis, UI), the "living creature" framing, the prompt→skill→MCP debugging ladder, and over-specification as the senior-engineer anti-pattern.

## Related Topics

claude-code, prompt-engineering, agents, best-practices, anti-patterns, workflow, context-engineering, evaluation, test-time-compute, agent-orchestration, verification
