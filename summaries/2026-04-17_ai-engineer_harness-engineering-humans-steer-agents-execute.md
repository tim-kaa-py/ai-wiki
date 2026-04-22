---
title: "Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI"
source_type: "youtube"
channel: "AI Engineer"
date: "2026-04-17"
url: "https://www.youtube.com/watch?v=am_oeAoUhew"
pillar: "building"
tags: [harness-engineering, agents, claude-code, agentic-coding-workflow, workflow, best-practices, strategy, code-review, monorepo]
ingested: "2026-04-22"
source_file: "sources/youtube/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
---

# Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Summary

**Source:** AI Engineer | 2026-04-17 | [Link](https://www.youtube.com/watch?v=am_oeAoUhew) | 46:20

## TL;DR
Ryan Lopopolo (OpenAI, ~1B output tokens/day) argues that once code is effectively free, the engineer's job shifts to building the *harness* — the repo structure, lint rules, structural tests, reviewer agents, and persona-based docs — that steers agents to produce acceptable code without synchronous human review. The talk's throughline for this ingest: humans were removed from the PR-review loop by converting review feedback into durable repo artifacts (docs, lints, tests, reviewer agents) that self-heal agent output. Adjacent theses: treat source code itself as text that can be tested for structural properties, design error messages as prompts, build the repo outside-in around Codex as the entry point, let agent misbehavior drive monorepo architecture, and be skeptical of plan mode because unread plans encode unwanted instructions.

## Video Structure
1. [00:00-02:40] Opening — Token billionaire framing; team banned from touching editors; implementation is no longer scarce.
2. [02:40-05:10] Every engineer is a staff engineer — Scarce resources are human time, attention, and context window.
3. [05:10-07:20] Code is free — P3s all get kicked off in parallel; i18n from day one; prompt and guardrails matter more than code.
4. [07:20-11:05] Making a "good job" legible — Non-functional requirements must be written down; personas on the team durably encode review knowledge for every agent trajectory.
5. [11:05-15:10] Techniques to steer agents — Reviewer agents in CI, structural tests on source code (files ≤350 lines), error messages as prompts.
6. [15:10-18:34] Prompts everywhere and closing keynote — "You can just prompt things"; skills that write prompts; remove yourself from the loop.
7. [18:34-23:35] Q&A: Workflow and setup — Tickets → Codex with skills; outside-in harness; 5-10 skills, not thousands; custom ESLint + structural tests.
8. [23:35-28:15] Avoiding over-engineering + picking a harness — Bitter lesson; bet on first-party harnesses post-trained with the model.
9. [28:15-32:30] Collaboration platform — Markdown + GitHub PRs as hub-and-spoke; don't put the model in a box.
10. [32:30-36:26] Getting started + progressive disclosure — Use agents to write tests first; 750-package PNPM workspace; make code uniform.
11. [36:26-40:05] Code review in high-velocity world — "Garbage collection Fridays"; persona-based reviewer agents triggered on push.
12. [40:05-43:21] Token budget split + plan-mode skepticism + LLM-as-fuzzy-compiler.
13. [43:21-46:20] The future — Give the agents a token budget and a quarter; meta-programming the job.

## Key Concepts

### Harness engineering
The practice of operationalizing the repo, tooling, and team process so that agents can productively consume infinite GPU/token capacity. The harness is everything around the model — skills, lints, structural tests, reviewer agents, docs, error messages — that surfaces the right text to the model at the right time. Ryan's distinctive framing: a good harness does the *minimum* context management necessary, because context management is the one thing that won't be obsoleted by model capability gains (bitter-lesson hedge).

### Token billionaire
Ryan's self-description: someone who spends ~1B output tokens/day. Used as an aspirational frame — "we want everybody to be token billionaires" — meaning everyone should be delegating the full software-engineering job to agents rather than touching editors.

### Non-functional requirements as prompts
The 500 small decisions behind a good patch (retries, timeouts, error-message shape, file size, component decomposition, API privacy) are what distinguishes acceptable from slop output. Because models have seen every possible choice in training, the engineer's job is to *write these down* so they become durable prompts that every agent trajectory inherits. Ryan's variant of "prompt engineering": the prompts live in lint messages, test failures, reviewer-agent comments, and persona docs — not in a prompt file.

### Outside-in harness (Codex as entry point)
Rather than spawning the app and Codex inside a dev shell, the repo is built so Codex *is* the entry point, the same way a human developer would be. Skills teach Codex how to launch the app, spin up the local observability stack, attach Chrome DevTools. All local dev tooling hides behind 5-10 skills so the human doesn't have to track internal changes — Ryan mentions not noticing for three weeks that the DevTools connection switched from CDP direct to a daemon.

### Code-as-text structural tests
Distinct from lints (which check syntax) and unit tests (which check behavior), these are tests that assert properties of the source code itself: files ≤350 lines, zod schemas de-duplicated across the repo, single canonical async helpers, package privacy invariants, dependency edges between stack layers. Ryan's framing: the codebase is adapting to the harness, not the other way around.

### Error messages as prompts
Lint/test failures should give actionable remediation steps aimed at the model (and humans). Bad: "awaiting in a loop" or "unknown type here." Good: "no, you shouldn't have an unknown here at all because we parse-don't-validate at the edge and you certainly have a type derived from zod here." Every diagnostic is a chance to re-prompt the agent.

### Reviewer agents (persona-based)
Agents triggered on every push in CI, each primed as a specific persona (front-end architect, reliability engineer, scalability engineer, product-minded). Each surfaces P2+ issues against documented "what good looks like" in that persona's domain. These replace the synchronous human review that used to block PRs.

### Garbage collection day
A weekly ritual (Fridays on Ryan's team): every engineer's full-day job is to take every bit of slop observed during the week that made PRs hard to merge and categorically eliminate it — turning human-review feedback into repo artifacts (docs, lints, reviewer-agent rules) that self-heal agent output.

### LLM as fuzzy compiler
Ryan's mental model: harness-engineering context (lints, tests, reviewer prompts) is analogous to static-analysis and optimization passes in a compiler like LLVM. Swapping one model for another is like swapping LLVM for Cranelift in the Rust compiler — different generated instructions, same soundness guarantees, because the constraints around acceptable code hold regardless of the code-generation backend. Implication: code is a disposable build artifact.

## Key Takeaways

1. **Convert every human code-review comment into a durable repo artifact.** Human review blocking PRs is the bottleneck. If a human gave the feedback once, encode it so an agent surfaces it forever — via a lint, a structural test, a reviewer-agent prompt, or a persona doc.
   **How to apply:** Designate a recurring "garbage collection" block. For each review comment pattern you gave this week, decide whether it becomes (a) a lint with a remediation-oriented error message, (b) a structural test asserting the invariant, or (c) a persona doc that a reviewer agent reads.

2. **Build reviewer agents per persona, triggered on every push.** One agent per durable review concern (reliability, security, front-end architecture, product). Each reads the docs that define "good" in its domain and surfaces P2+ issues before the PR can merge.
   **How to apply:** Start with one persona (e.g., reliability). Write the doc. Wire an agent SDK call into CI that reads the doc + the diff and posts PR comments. Expand to other personas as you see recurring review themes.

3. **Write structural tests against the source code itself.** Don't just lint syntax — assert properties that make the repo agent-legible: file length caps, no duplicate schemas, single canonical helpers, package privacy, dependency direction.
   **How to apply:** Add a `tests/structure/` directory. Start with a file-length cap (350 lines is Ryan's number). Add a de-duplication test for your most-copied schema/helper. These tests give the agent targeted feedback when it drifts.

4. **Make error messages remediation-oriented prompts.** A lint or test failure is a free opportunity to prompt-inject the agent mid-task. Say what should be done, not just what's wrong — and include the *why* so the agent generalizes.
   **How to apply:** Audit your 10 most-common lint/test failure messages. Rewrite each as: "Don't X here because Y. Do Z instead, using helper W."

5. **Remove yourself from the loop; every manual "continue" is a harness failure.** If you have to click through an agent checkpoint, the harness didn't tell it how to continue to completion.
   **How to apply:** When you type "continue" or "yes," stop and ask: what context was the agent missing? Encode that context in a skill or CLAUDE.md so it proceeds autonomously next time.

6. **Make the code uniform across the repo so the agent's predictions transfer.** One way to do bounded concurrency. One way to build an observable side-effectful command. One ORM. One CI-script style.
   **How to apply:** Appoint a "dictator" on your team for one uniformity decision per month. Write down the canonical pattern. Fire off parallel agents to migrate the rest of the codebase — migrations no longer hang open, because code is free.

7. **Structure the repo so most changes are local to a subtree.** 750-package PNPM workspace, isolated by business-logic domain and stack layer. Package privacy as enforceable invariant, not convention.
   **How to apply:** Identify the 3-5 domains your agents keep crossing inappropriately. Split them into separate packages with explicit public APIs. Lint package-privacy violations.

8. **Bet on first-party harnesses (Codex, Claude Code) — they're post-trained with the model.** Apply-patch tools and bash-invocation semantics are in the post-training loop. Don't reinvent the harness; plug into the SDK.
   **How to apply:** Use Codex/Claude Code directly. Integrate via their SDKs where you need custom behavior. Avoid building a parallel coding loop from scratch.

9. **Be skeptical of plan mode — unread plans encode unwanted instructions.** If you approve a plan without reading every line, you're committing to instructions that may be bad; the rollout wastes tokens.
   **How to apply:** Either (a) skip plans and let the agent drop into implementation, or (b) require plans to land as standalone PRs reviewed line-by-line and merged before execution.

10. **QA plans are the forcing function for trusting agent output.** A QA plan enumerates features, critical user journeys, and required PR media (screenshots, recordings). When every PR has one, reviewer agents can assert it was followed, and the human can stop shoulder-surfing.
    **How to apply:** Have your most product-minded engineer write "how to write a good QA plan" once. Require every user-facing PR to attach one. Wire a reviewer agent that checks the PR media matches the plan.

11. **Spend tokens in CI, not just in-editor.** Writing code is no longer the hard part; getting it accepted is. Reviewer agents, structural test generators, and PR-commentary agents belong in CI.
    **How to apply:** Ryan's rough split is a third planning/ticket curation, a third implementation, a third CI. Audit your own split — if CI is <20%, you're under-investing in acceptance.

12. **Generate skills and prompts with agents, pointed at official cookbooks.** Ryan has Codex synthesize a prompt-writing skill from OpenAI's prompting cookbook, then uses that skill to write harness prompts.
    **How to apply:** Point your coding agent at the relevant provider's prompting guide and ask it to produce a skill. Use that skill every time you need to write a harness prompt.

## Argument Structures

### Why removing humans from PR review is safe and desirable
- **Premise 1:** Human review comments repeat — the same classes of slop recur across PRs.
- **Premise 2:** Each repeated comment is evidence of a context failure the agent could have avoided with the right prompt at the right time.
- **Premise 3:** Repo artifacts (lints, structural tests, reviewer-agent prompts, persona docs) can surface that context automatically on every push.
- **Premise 4:** Human review is synchronous and blocks merge, which lengthens PR lifetime, which causes merge conflicts in a high-velocity team (3-5 PRs/engineer/day).
- **Sub-conclusion:** Therefore converting review comments into durable artifacts is strictly better: it eliminates a recurring cost, it reduces PR lifetime, and it compounds (each artifact helps every future agent).
- **Counter-concern handled:** "But what if the agent is bullied by reviewers into over-correcting?" Answer: don't make every comment blocking. Let the implementation agent acknowledge, defer, or reject, like a human would — "bias toward code being accepted, not perfect."
- **Conclusion:** Removing humans from the review loop is the mechanism by which the team scales to infinite agent capacity; leaving them in the loop re-introduces the human-time bottleneck the whole setup is trying to eliminate.

### Why monorepo architecture is driven by agent behavior, not team size
- **Observation:** Starting blank (single-package Electron app), the agent produced a mess: no package privacy, no filesystem hooks for domain boundaries, optimization for local coherence over shared utilities.
- **Diagnosis:** The agent has no way to *know* which APIs are public, which domains are separate, which helper is canonical — unless the filesystem tells it.
- **Remedy:** Structure the repo "like a 10,000-engineer org" — 750 PNPM packages isolated by domain/layer, small util packages, package privacy enforced by lints.
- **Why this works:** Code in the filesystem is text. Text is prompt. A uniform, locality-respecting repo makes the agent's next-token predictions more reliable regardless of where it's looking.
- **Conclusion:** The scale of the architecture is set by agent cognition, not by team headcount. A two-person team with agents needs heavy-org architecture because the agents lack the tacit knowledge a small human team would share verbally.

### Why plan mode is suspect
- **Premise 1:** Plans are long, and most of the time the engineer won't read them end-to-end.
- **Premise 2:** Approving a plan is equivalent to approving every instruction in it.
- **Sub-conclusion:** Unread approved plans encode unwanted instructions that the rollout then faithfully follows — wasting tokens on bad work.
- **Remedy if you must use plans:** Ship the plan as its own PR, require line-by-line human review, block on merge, then execute. This turns the plan into a durable reviewed artifact rather than an ephemeral approval click.
- **Default stance:** Skip the plan. Drop the ticket in. Let the agent implement — a well-specified ticket and a good harness should be sufficient, and if they aren't, the fix is in the harness, not the plan.

### LLM-as-fuzzy-compiler — why harness work survives model upgrades
- **Analogy:** Harness context (lints, tests, reviewer prompts) is to an LLM what LLVM static-analysis and optimization passes are to a Rust compiler.
- **Implication 1:** Swapping GPT-5 for GPT-6 is like swapping LLVM for Cranelift — different generated instructions, same soundness guarantees, because the *constraints on acceptable output* are defined outside the generation backend.
- **Implication 2:** Code is a disposable build artifact. The durable value lives in the constraints (harness), not the generated code.
- **Bitter-lesson hedge:** Don't invest in harness pieces that model capability will obsolete (elaborate multi-step orchestrations, hand-tuned prompt templates). *Do* invest in context management and constraint-surfacing — these remain necessary because the model must still be *told* what "acceptable" means for your repo.

## Notable Commands / Code Snippets

Structural test pattern (illustrative — Ryan mentions this in passing):

```
# Pseudocode: a test that asserts source-code structure, not behavior
test("files under 350 lines", () => {
  for (const file of sourceFiles()) {
    expect(lineCount(file)).toBeLessThanOrEqual(350);
  }
});

test("single canonical zod schema per entity", () => {
  expect(findDuplicateSchemas()).toEqual([]);
});
```

Remediation-oriented lint message pattern:

```
# Bad
error: unknown type not allowed

# Good
error: `unknown` is not allowed in domain code. We parse-don't-validate at the edge,
so you should derive a concrete type from the zod schema in `packages/schemas/<entity>.ts`.
See docs/load-bearing-zod.md.
```

Team ritual: Fridays are "garbage collection day" — every engineer turns one week of review comments into durable lints/tests/docs/reviewer-agent rules.

Skill synthesis: point the coding agent at the provider's prompting cookbook and ask it to emit a skill for writing prompts. Invoke that skill whenever a new harness prompt is needed.

## User Notes
- Focus: how humans were taken out of the loop for PR/code review. Ryan's answer is systematic: make review feedback a first-class, durable repo artifact (lint + structural test + reviewer agent + persona doc) rather than a synchronous comment. "Garbage collection Fridays" is the concrete ritual that closes the loop.
- Discovery A (structural tests): the reframe that source code is testable text — files ≤350 lines, schema de-duplication, package privacy — is directly applicable to any repo.
- Discovery B (error messages as prompts): every diagnostic is a prompt-injection surface; rewrite your most-common failures.
- Discovery C (outside-in harness): Codex is the entry point, not a guest in a dev shell. Skills hide tooling churn from the human.
- Discovery D (agent-driven architecture): a 2-person team with agents needs 10k-engineer-org architecture because the agent can't see domain boundaries that aren't in the filesystem.
- Discovery E (plan skepticism + fuzzy compiler): unread plans encode unwanted instructions; harness work survives model upgrades because it constrains output rather than drives it.

## Related Topics
harness-engineering, agents, agentic-coding-workflow, workflow, best-practices, code-review, monorepo, strategy
