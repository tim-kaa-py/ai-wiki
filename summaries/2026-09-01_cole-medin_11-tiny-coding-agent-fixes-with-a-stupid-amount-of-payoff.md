---
title: "11 Tiny Coding Agent Fixes With A Stupid Amount Of Payoff"
type: "summary"
description: "Eleven small, agent-agnostic workflow adjustments that raise coding-agent reliability, from rule rot and hook-enforced invariants to why compaction, mid-task model escalation, and multi-agent coordinators all backfire."
channel: "Cole Medin"
date: "2026-09-01"
resource: "https://www.youtube.com/watch?v=UbylWXukvR8"
pillar: "building"
tags: [claude-code, agents, workflow, best-practices, context-engineering, anti-patterns]
timestamp: "2026-09-03"
source_file: "sources/youtube/2026-09-01_cole-medin_11-tiny-coding-agent-fixes-with-a-stupid-amount-of-payoff.md"
---

# 11 Tiny Coding Agent Fixes With A Stupid Amount Of Payoff — Summary

**Source:** Cole Medin | 2026-09-01 | [Link](https://www.youtube.com/watch?v=UbylWXukvR8) | 17:29

## TL;DR

Eleven small workflow adjustments that Medin claims are disproportionately high-leverage for coding-agent reliability — explicitly framed as tweaks, not a workflow replacement. The through-line is that most reliability failures come from **context that has gone bad**: rules that no longer match the codebase, summaries that dropped 90% of the detail, conversations that have accumulated their own error patterns, and writers grading their own homework. Four of the eleven are anti-patterns for things people actively do today (`/compact`, mid-task model escalation, multi-agent coordinators, over-revision), and the strongest structural claim is that any rule you actually depend on should stop being a rule and become a hook.

## Video Structure

1. [00:00-01:28] Framing — tips, not a workflow overhaul; agent-agnostic, Claude Code used for demos
2. [01:28-02:54] Tip 1 — Write for the agent, not the human
3. [02:54-04:12] Tip 2 — Instruction files rot ("rule drift")
4. [04:12-05:32] Tip 3 — `/compact` is not worth it
5. [05:32-07:05] Tip 4 — Put load-bearing rules in hooks
6. [07:05-08:43] Sponsor segment (HeyGen)
7. [08:43-09:53] Tip 5 — For context, less is more
8. [09:53-11:18] Tip 6 — Sub-agents are quietly eating your rate limit
9. [11:18-13:10] Tip 7 — Do not escalate mid-task
10. [13:10-14:27] Tip 8 — Coordinators don't work (the hot take)
11. [14:27-15:25] Tip 9 — Never let the writer approve the work
12. [15:25-16:20] Tip 10 — You can over-revise
13. [16:20-17:29] Tip 11 — Validation is a system, not a step

## Key Concepts

### Rule drift

The gap that opens between what an instruction file (CLAUDE.md, global rules, project context) asserts and what the codebase actually contains. It is the direct cost of Tip 1: the more file paths, commands, and numbers you put in rules to remove agent ambiguity, the faster those rules go stale as architecture changes. Medin cites a study finding **one in four repositories with an AI rules layer has stale rules** — references to deleted directories, replaced databases, renamed folders. His framing is that stale rules are worse than absent rules, because the agent burns effort reconciling a contradiction between its instructions and the code in front of it.

### Load-bearing rule

Medin's term (implied rather than defined outright) for a rule whose violation breaks the process — the ones you actually depend on happening every time. His test for spotting one: **if a rule names a specific event or an ordering of steps ("when you're done, run the tests"), that is a signal it should be a hook, not a rule.** The underlying distinction is probabilistic instruction-following versus deterministic execution.

### Tainted conversation

A session in which the model has established a pattern of errors. Medin's mechanism: LLMs are prediction machines, so once a conversation contains many mistakes, the most probable next token sequence is another mistake — corrections included. This makes error rate self-reinforcing *within* a session, which is why he treats a bad conversation as unrecoverable rather than steerable. Note the divergence from the common framing that a struggling agent needs a *better model* or *more human supervision*; Medin says the conversation itself is the defect.

### Handoff document

A deliberately human-authored (or at least human-visible) replacement for `/compact`: a written record of what was done and where the work is stuck, carried into a fresh session. Medin's point is that `/compact` *is* a handoff document — just one you have neither visibility into nor control over. The handoff document appears three separate times in the video (compaction, tainted conversations, review), making it the video's most-reused primitive.

### Validation as a system vs. validation as a step

A step is testing appended after the code exists ("oh yeah, add some unit tests"). A system is the validation harness designed **before** implementation: which tools the agent uses to check its own work, the conventions for unit and integration tests, how the human will test afterwards, and how the agent should hunt for edge cases.

## Key Takeaways

1. **Write for the agent, not the human.** Human documentation can afford to be high-level ("keep database code organised sensibly") because humans interpolate; agents cannot. Your primary job when planning work is to reduce the number of assumptions the agent has to make.
   **How to apply:** Rewrite vague rules into blunt, checkable ones — "all SQL lives in the `database/` folder" — naming concrete paths, numbers, and commands.

2. **Accept that specificity causes rot, and audit for it.** Tips 1 and 2 are in direct tension by design: the specificity that makes rules useful is exactly what makes them go stale.
   **How to apply:** Run a periodic drift audit that diffs rules against the actual codebase. Medin points to a `rules-check-drift` skill in his skills repository; the pattern is more important than his particular implementation.

3. **Avoid `/compact` entirely.** Only ~10% of a conversation's specific details survive compaction, per a study he cites, and you have no control over which 10%.
   **How to apply:** Size work so you never approach the limit. If you do, write a handoff document and start a fresh session. Test this yourself — compact a real conversation, then ask about small technical details from earlier; the agent will typically admit it lost them.

4. **Put load-bearing rules in hooks.** Rules are probabilistic; agents forget them, or claim they ran tests that are still red. Hooks fire deterministically on events.
   **How to apply:** Convert "run the tests when you're done" from a rule into a stop hook that runs the suite and routes failures back to the agent with "you said you're done, but you're not."

5. **Less context is more, and increasingly so.** As models get more capable, generic instruction hurts. Explaining DRY, KISS, how to write a PR, or how to do a code review is pure bloat now.
   **How to apply:** Keep global rules under ~200 lines (Anthropic's recommendation; Medin allows 300). Restrict them to project-specific constraints and conventions that apply to *every* task. Move everything else into task-specific context files loaded on demand.

6. **Sub-agents are a hidden rate-limit sink.** Parallel fan-outs cost far more tokens than they feel like they cost, and Claude Code will spin up sub-agents unprompted — "dozens," in his experience.
   **How to apply:** Run `/usage` and press `W` for the weekly view. Medin found 39% of his weekly limit was consumed while running 4+ parallel sessions, despite rarely working that way. Sub-agents are still valuable for protecting main-agent context — the failure is using them liberally, not using them.

7. **Never escalate the model mid-task.** Swapping Sonnet → Opus inside a struggling conversation does not rescue it; the accumulated bias and errors carry over regardless of model.
   **How to apply:** When the error rate spikes, do not switch models and do not put yourself deeper into the loop. Write a handoff document, abandon the conversation entirely ("burn it to the ground"), and have a fresh session read the handoff and continue.

8. **Skip multi-agent coordinators.** (His stated hot take.) Team-lead agents distributing work, inter-agent messaging, shared task lists, mailboxes — appealing, not reliable, and not how production software gets built. He reads Anthropic keeping agent teams experimental "for months and months" as corroboration.
   **How to apply:** If you need parallelism, keep the main agent as a pure delegator: describe the work in plain English and let it dispatch background agents or workflows. No inter-agent communication, no monitoring layer.

9. **Never let the writer approve the work.** An implementing agent carries its own assumptions and cannot see them, so self-review returns "looks great" for work that isn't.
   **How to apply:** Let the implementer run tests and self-iterate inside its session, then always open a *separate* conversation for review — pointed at a PR, the uncommitted diff, or a handoff document.

10. **Stop iterating before quality degrades.** Past the point of the best answer, further revision produces changes made to appease you — LLM sycophancy expressed as churn. He cites a study where forced 10–20× iteration produced a better-than-final result at some earlier step **85% of the time**.
    **How to apply:** Resist the "I have leftover tokens before the reset, go make it perfect" impulse. Keep intermediate versions so you can go back to a better one.

11. **Design the validation harness before writing code.** Testing as an afterthought is the default failure mode; validation planned up front is one of the highest-leverage reliability moves available.
    **How to apply:** Before implementation, specify: what tools the agent uses to check its own work, test conventions for unit and integration levels, how you will verify manually afterwards, and how the agent should search for edge cases.

## Argument Structures

**The context-decay thesis (unifying tips 2, 3, 5, 7, 9).** Medin never states it as one argument, but the same shape recurs: agent reliability is a function of context quality, and context degrades along several independent axes — *truth* (rules drift from the codebase), *completeness* (compaction drops 90% of detail), *signal-to-noise* (bloated rule files dilute the specifics), *bias* (a conversation's error patterns compound; an implementer cannot see its own assumptions). Every one of his fixes is a way to either refresh context (fresh session, handoff document, drift audit) or keep it small and true. The corollary he draws explicitly: when context has gone bad, **discard rather than repair** — burn the conversation, don't escalate the model.

**Why hooks beat rules.**
- Premise: LLMs are non-deterministic, so rule-following is probabilistic.
- Premise: some process steps must happen every time to preserve reliability.
- Premise: agents both forget steps and misreport having done them (claiming green on red tests).
- Conclusion: any step you actually depend on must move out of the probabilistic layer into a deterministic one — the hook.
- Detection heuristic: a rule that names an event or an ordering is a load-bearing rule wearing the wrong clothes.

**Why a bigger model can't save a bad conversation.**
- Premise: LLMs are prediction machines conditioned on the conversation so far.
- Premise: a conversation containing many mistakes makes another mistake the most likely continuation.
- Sub-conclusion: error rate is self-reinforcing within a session, and your corrections are part of that conditioning rather than an escape from it.
- Conclusion: the defect lives in the conversation, not the model, so swapping models mid-task leaves the actual cause in place.
- Second-order point: when an agent seems to be failing unusually often, that perception is real signal, not impatience.

**Why coordinators fail (weakest of his arguments).** The reasoning is mostly assertion plus one appeal to authority — Anthropic has kept agent teams experimental for a long time, therefore the approach isn't reliable. He offers no failure mechanism, unlike his other tips. Held against Tip 6, though, there is an implicit cost argument: coordination multiplies parallel sessions, and parallel sessions are what drained 39% of his weekly limit.

**The specificity/rot trade-off (tips 1 ↔ 2).** Medin flags this himself. Being specific for the agent is what makes rules effective *and* what makes them perishable. He resolves it not by softening the rules but by adding a maintenance obligation — the periodic drift audit. The trade is therefore explicit: rules cost upkeep, and you either pay it or accept confused agents.

## Notable Commands / Code Snippets

```
/usage        # then press W for the weekly view — shows the share of usage
              # consumed while running 4+ parallel sessions
```

```
/compact      # the anti-pattern: use a handoff document + fresh session instead
/model        # do NOT use mid-task to escalate a struggling conversation
```

## User Notes

Ingested via Mode B with no prior focus points; the user opted to capture all eleven tips evenly rather than going deep on any one of them.

## Related Topics

claude-code, agents, workflow, best-practices, context-engineering, anti-patterns
