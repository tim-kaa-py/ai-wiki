---
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
type: "summary"
channel: "AI Engineer"
date: "2026-04-24"
resource: "https://www.youtube.com/watch?v=-QFHIoCo-Ko"
pillar: "building"
tags: [claude-code, workflow, prd, kanban, ralph-loop, deep-modules, context-engineering, dumb-zone, tdd, sandcastle]
timestamp: "2026-05-08"
source_file: "sources/youtube/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock — Summary

**Source:** AI Engineer (speaker: Matt Pocock) | 2026-04-24 | [Link](https://www.youtube.com/watch?v=-QFHIoCo-Ko) | 1:36:30

## TL;DR

Matt's pipeline is **grill-me → PRD → Kanban DAG → Ralph loop**: a relentless interview reaches a shared design concept with the agent, the PRD freezes that concept (and a named module map) as a destination doc, the PRD is split into vertical-slice issues with blocking relationships, and an AFK loop chews through the AFK-tagged issues while the human goes off-shift. The architectural lever is the `/improve-code-base-architecture` skill, which finds shallow-module clusters to collapse into Ousterhout-style **deep modules** (small interface, fat body) so AI gets one clean test boundary instead of a tangle of micro-tests; the human "designs the interface, delegates the implementation" to retain a sense of the codebase. Context discipline runs underneath all of it — exact-token status line, `/clear` over `/compact`, ~100K as the operational smart-zone ceiling even on 1M-context models ("they shipped a lot more dumb zone"), tiny system prompt, fresh context for the reviewer.

## Video Structure

1. [0:03:00-0:11:05] Smart zone / dumb zone + Memento — the two LLM constraints (quadratic attention, no memory). Establishes ~100K threshold, `/clear` vs `/compact`, exact-token status line.
2. [0:12:14-0:28:30] Grill-me skill — the relentless interview that produces a shared design concept; explicit human-in-the-loop boundary; meeting transcripts as alt input.
3. [0:28:43-0:36:00] Destination doc + PRD — `/write-a-PRD`, module list returned first, Matt does NOT review the PRD; out-of-scope section captures rejected options.
4. [0:36:00-0:38:50] Q&A digression: 1M context window is "more dumb zone shipped"; smart zone ~100K regardless.
5. [0:39:38-0:51:40] PRD-to-Kanban — sequential phase plan vs DAG; Pragmatic Programmer "tracer bullets" / vertical slices; pushback when first slice is too horizontal.
6. [0:51:40-0:57:30] Day shift / night shift — "the human leaves the loop"; once.sh shape; implementer prompt priority order; AFK ticket type.
7. [0:58:00-1:06:30] Reviewer ergonomics + the unsolved code-review problem; reviewer needs fresh context to stay in smart zone; "I don't honestly know" admission on PR-size vs Ralph-batched commits.
8. [1:06:30-1:12:30] TDD with AI — red-green-refactor as anti-cheat; QA returns control to the human and feeds new Kanban tickets.
9. [1:13:35-1:21:00] Deep vs shallow modules — Ousterhout applied to AI codebases; PRD module-map; "design interfaces, delegate implementations".
10. [1:21:00-1:23:00] `/improve-code-base-architecture` skill — video-editor module collapsed via discriminated union; "if you take one thing away from today, just try running this skill".
11. [1:23:13-1:29:30] Doc rot, PRD retention, push vs pull coding standards.
12. [1:29:50-1:33:30] Sandcastle — TS lib for parallel AFK execution: planner → per-issue implementer in worktree+Docker → reviewer → merger; Sonnet for impl, Opus for review.
13. [1:33:50-1:36:10] Recap — buy the old books.

## Key Concepts

### Smart zone vs dumb zone

Dex Hardy (Human Layer) framing. Every token added to context creates new attention relationships quadratically, so model competence degrades smoothly with context length. Around ~100K tokens the LLM enters a "dumb zone" where it makes increasingly stupid decisions regardless of advertised window size. The **smart zone is the operational target for every coding task**, and the whole pipeline is built to keep individual stages inside it.

### `/clear` vs `/compact`

`/clear` returns the session to the bare system prompt — a deterministic reset, "like the guy from Memento". `/compact` summarizes the conversation in place, leaving non-deterministic "sediment" that can never be cleaned up. Matt prefers clear; devs love compact and he calls that a mistake. Divergence from the standard Anthropic-recommended pattern: Matt treats compact as a smell, not a tool.

### Grill-me skill

A tiny prompt body — "interview me relentlessly about every aspect of this plan until we reach a shared understanding… ask the questions one at a time… for each question provide your recommended answer." Defends against the "specs to code" failure mode where teams edit specs forever and ignore the resulting code. The deliverable is not a plan but a **shared design concept** (Frederick Brooks, *The Design of Design*) — alignment between human and agent. Sessions of 22-100 questions are normal.

### Destination doc / PRD (in this workflow)

Two artifacts coexist: a *destination* document (PRD — where we're going, definition of done) and a *journey* document (Kanban board — how we get there). The PRD captures problem statement, solution, user stories, implementation decisions, testing decisions, and crucially an **out-of-scope section** that retains rejected options from the grilling session. Generated by `/write-a-PRD`. Diverges from typical PRD practice: this PRD is never read end-to-end by the human — it's a downstream artifact for the agent.

### Vertical slice / "tracer bullet"

From *The Pragmatic Programmer*. Tracer bullets are anti-aircraft rounds with phosphor that glow in flight, giving the gunner immediate aim feedback. Applied to features: a vertical slice cuts thin through every layer (schema → service → API → minimal UI) so the system is end-to-end-testable from issue 1, vs. horizontal phasing (all DB → all API → all UI) where feedback only arrives at phase 3.

### Kanban DAG (vs sequential phase plan)

Issues in local markdown files with explicit blocking relationships, forming a directed acyclic graph. Matt argues this dominates a numbered phase plan because (a) a sequential plan can only be picked up by one agent, while a DAG admits parallel agents on independent branches; (b) the DAG makes the dependency structure observable, so AFK execution can be reasoned about. First Kanban draft typically over-clusters into horizontal slices and needs one round of pushback.

### AFK (Away From Keyboard) work

A ticket-tag and a category of task. Two types of work in the AI age: human-in-the-loop (idea, grilling, PRD review, QA) and AFK (most implementation). The Kanban issues carry an AFK tag; the night-shift loop only picks AFK-tagged issues. Divergence from common usage: not just "agentic," but a formal label inside the ticket schema that gates which tickets the loop will touch.

### Ralph (Wiggum) loop

Community shorthand for "phase N" execution: instead of writing a multi-phase plan, you just loop a single prompt that says "make a small change toward the destination" and run it until done. Named after the Simpsons character; treated as a pattern, not a tool. Matt's variant adds structure (PRD + Kanban + priority order) over vanilla Ralph because pure Ralph "works okay but I prefer a little bit more structure."

### Sandcastle

Matt's TypeScript library for parallelized AFK execution. Each task runs in its own git worktree inside a Docker sandbox; the run loop is `planner → per-issue implementer → reviewer → merger`. Solves the "I don't like the existing AFK runners" problem. Public-ish, demoed live.

### Deep module vs shallow module (Ousterhout, applied to AI)

From *A Philosophy of Software Design*. Shallow = small file with a tiny body and a lot of cross-file dependencies; many tiny exports. Deep = small interface, lots of internal functionality, few outward dependencies. Matt's AI-specific divergence: shallow modules are bad **specifically because** AI can't navigate dependency graphs and ends up wrapping every tiny function in its own test boundary (no real coverage), while a deep module gives you one big test boundary that catches integration bugs. Without a coach, AI tends to produce shallow modules by default.

### `/improve-code-base-architecture` skill

A custom skill that scans the repo and proposes clusters of currently-shallow modules to collapse into deep ones. Output shape: each cluster has a coupling argument, a dependency category (e.g. "local substitutable in SQLite within memory test DB"), and gap notes ("zero tests = biggest gap"). Real example from Matt: a browser-side video editor wrapped front-to-back as one deep module via a discriminated union — AI's ability to edit it became "night and day" better. Verbatim closing line: "**If you take one thing away from today, just try running this skill on your repo.**"

### Design-interfaces / delegate-implementations rule

Answer to "do you know your codebase less now?" Yes — and the fix is to own the **shape and behavior** of each module (the interface) and delegate the body to AI. Modules become "gray boxes": the human knows what they do under what conditions, doesn't read the internals. Lets you keep a navigable mental model while moving fast.

## Key Takeaways

1. **Open every piece of work with `/clear` then grill-me.** The grilling history *is* the PRD input — do NOT clear context between grill and PRD; the 25K tokens of conversation are the asset, not a side-effect. **How to apply:** add a "clear before grill, do not clear after grill" note to your workflow doc; treat the grill session as the start of a context budget.

2. **Stop reading the PRD once you've grilled.** Reading it tests the LLM's summarization ability, which is reliable; the value was in the alignment that produced it. **How to apply:** in your PRD skill, add an instruction to surface only the module list and out-of-scope section for confirmation, not the full body.

3. **Make the PRD's first deliverable a module map.** Have the PRD skill return "modules to create + modules to modify" before drafting prose, and confirm them. The map persists through planning AND implementation. **How to apply:** edit your `/write-a-PRD` skill to require a `## Modules` section listing new deep modules and existing modules to be touched, before writing user stories.

4. **Replace sequential phase plans with a Kanban DAG.** A numbered plan is a single-agent loop; a DAG with explicit blocking relationships admits parallel agents and makes the dependency graph observable. **How to apply:** use `/PRD-to-issues` (or equivalent) to generate `issues/*.md` files with `blocked_by:` frontmatter; reject any first draft where issue 1 is purely a backend layer.

5. **First slice horizontal? Push back once.** AI defaults to horizontal phasing (all schema first). One round of "the first slice is too horizontal" usually fixes it without re-prompting from scratch. **How to apply:** keep that exact phrase as a paste-ready correction; don't waste tokens on long re-explanations.

6. **Vertical slices = tracer bullets, end-to-end on slice one.** Schema + minimal service + minimal UI in the first ticket so the system is testable from the first commit; subsequent slices add to the working spine. **How to apply:** put a "vertical slice rule" in the PRD-to-issues skill; require each issue to touch at least one new schema element AND one user-visible surface.

7. **Implementer prompt priority order: critical bug > dev infra > tracer bullet > polish.** Hard-coded into the loop prompt so the agent never spends a night polishing while a broken test rots. **How to apply:** copy the priority block into your loop prompt verbatim (see Notable Commands below).

8. **`once.sh` first, loop second.** Run the implementer prompt manually one issue at a time before letting it loop overnight; you'll see prompt-tuning needs that an autonomous loop will hide. **How to apply:** keep both `ralph-once.sh` and `ralph-loop.sh` in the repo; ship `once.sh` first to new contributors.

9. **Reviewer needs a fresh context.** If you let the implementer also review, the review happens in the dumb zone after the implementation burned the smart zone. Clear before review. **How to apply:** in Sandcastle (or your equivalent), make `reviewer` a separate agent invocation with its own clean context, not a continuation of the implementer.

10. **QA returns to the human and produces new Kanban tickets.** QA is not the end of the loop — it's the source of the next batch of tickets. The Kanban board accepts new blocking issues indefinitely. **How to apply:** during QA, write findings directly as `issues/NN-bug-X.md` files with `blocked_by:` set to the implementation issue.

11. **Use Sonnet for implementation, Opus for review.** Inverted from intuition — review is where you need the smarts, implementation can grind. **How to apply:** in Sandcastle config, set the implementer model to Sonnet and the reviewer model to Opus; carry this into any custom AFK runner.

12. **Run `/improve-code-base-architecture` once on every existing repo.** Matt's "if you take one thing away" line. The skill finds shallow-module clusters and proposes deep-module collapses with coupling arguments. **How to apply:** spend an afternoon running this on your main work repo before any new feature; treat its output as a backlog of architecture issues, then implement the highest-impact collapse first.

13. **Name modules in every PRD.** The PRD's module-map subsection persists through planning and implementation and forces the system shape into the agent's working context. **How to apply:** in `/write-a-PRD`, add explicit `Data model / Modules` section: "X is a new deep module with interface Y; Z is modified."

14. **Design interfaces, delegate implementations.** Own module shape and behavior; let AI write the body. The way to retain codebase sense while moving fast. **How to apply:** before each implementation issue, write the module's exported signatures by hand in a stub file; let AI fill in the body inside the loop.

15. **Pin the exact-token status line in every coding session.** "Essential information on every coding session because you need to know exactly how many tokens you're using so you know how close you are to the dumb zone. Absolutely essential." **How to apply:** install Matt's status line (AI Hero blog) or equivalent; treat it as non-negotiable like a syntax linter.

16. **Treat ~100K as the smart-zone ceiling even with 1M context.** "They shipped a lot more dumb zone." 1M context helps retrieval, not coding. **How to apply:** if your session crosses 100K, clear instead of continuing — even if the model claims to support more.

17. **Keep system prompts tiny.** A 250K-token system prompt drops you into the dumb zone before the session starts. **How to apply:** audit your CLAUDE.md and any global `~/.claude/CLAUDE.md` for token bloat; cut anything not load-bearing on every session.

## Argument Structures

### 1. Why grill-me beats plan mode and spec-driven workflows

- Premise: When working with someone new, the goal is a **shared design concept** (Brooks).
- Premise: Plan mode rushes to produce a plan-document; the document is a poor proxy for alignment because a single human reading it cannot distinguish "we agree" from "the LLM summarized something plausible."
- Premise: Spec-to-code amplifies this — you edit specs forever and ignore the code, but the code is your battleground.
- Premise: A relentless one-question-at-a-time interview produces alignment as a byproduct of forcing the human to commit to specifics, with the AI's recommendation backstop covering the human's lazy answers.
- Conclusion: Grill-me produces a better artifact (the conversation history is the asset) AND a better alignment than plan-mode or spec-driven flows. Plans are a byproduct of alignment, not the goal.

### 2. Why Matt does not review the PRD

- Premise: He has reached a shared design concept with the LLM during grilling.
- Premise: LLMs are reliably good at summarization.
- Premise: Reading the PRD therefore tests only the LLM's summarization ability — a known-strong skill.
- Premise: Reading the PRD does NOT test alignment, because alignment was already established in grilling.
- Conclusion: Reading the PRD has no failure mode worth defending against; the time is better spent in QA or on the next slice.

### 3. Why Kanban DAG > sequential phase plan

- Premise (parallelism): A numbered phase plan is by definition picked up by one agent — phase 2 cannot start until phase 1 is done, so the DAG of work has degree 1.
- Premise (observability): A DAG with explicit `blocked_by` relationships makes the dependency graph readable; you can see which work is parallelizable at a glance.
- Premise (vertical slicing): The DAG naturally encodes vertical slices (each issue is a thin cross-layer cut), while a phase plan naturally encodes horizontal layers (each phase is one layer).
- Conclusion: The DAG admits parallel AFK agents AND produces feedback earlier; the phase plan does neither. The cost (one extra translation step from PRD to issues) is paid once and reused on every loop iteration.

### 4. Why deep modules dominate shallow ones for AI

- Premise (test boundary): Wrapping a big module in one test catches integration bugs; wrapping every tiny function in its own test catches only what was already obvious. Shallow modules force the latter.
- Premise (dependency-graph weakness): AI cannot navigate a dense dependency graph well — it traces edge by edge and runs out of context. A shallow codebase is a dense graph.
- Premise (feedback ceiling): "Feedback-loop quality is the AI ceiling." Shallow modules degrade feedback quality (bad tests, missed integration bugs).
- Conclusion: Deepening modules is not stylistic — it directly raises the AI's effective coding ability in your repo, by improving both the test boundary and the navigation surface. This is *why* `/improve-code-base-architecture` is the highest-leverage tactic in the talk.

### 5. Why ~100K is still the operational threshold even on 1M-context models

- Premise: Attention scales quadratically in context length — every added token creates relationships with every existing token.
- Premise: Anthropic shipped 1M context but did not change the underlying attention mechanism.
- Premise: 1M context is good for *retrieval* (find a fact in War and Peace) — a sparse-attention task.
- Premise: Coding requires dense reasoning over the whole context, not retrieval.
- Conclusion: "They shipped a lot more dumb zone." The advertised window grew; the smart zone did not. Operational threshold for coding sessions stays at ~100K, with the smart zone slowly expanding as models improve — but not by 10×.

### 6. Why finished PRDs/issues should NOT live in the repo

- Premise: PRDs encode requirements, names, and structure as of a moment in time.
- Premise: After implementation, the code drifts — names change, requirements adjust based on user feedback, structure mutates.
- Premise: Future agents finding an old PRD will treat it as authoritative documentation and re-introduce drift as "fixes."
- Conclusion: PRDs in the repo cause **doc rot** that misleads future agents. Solution: close/delete after implementation; GitHub closed issues are good (visual indicator + retrievable but not first-page).
- **Unresolved counter-question (1:24:40):** an audience member asked whether database migrations — a similar "transient process artifact" — should also be squashed. Matt: "I don't know… let's talk about it afterwards." The cleanest framing is: migrations encode a *running deterministic record* of state changes that the system *re-executes*; PRDs encode *intent* that is never re-executed. So the analogy fails — but Matt didn't articulate this in the room.

## Notable Commands / Code Snippets

### Minimal grill-me skill body

The whole skill is tiny — paste-able into `.claude/skills/grill-me.md`:

```
Interview me relentlessly about every aspect of this plan until we reach a
shared understanding. Walk down each branch of the decision tree resolving
dependencies one by one. For each question, provide your recommended answer.
Ask the questions one at a time.
```

### Shape of `once.sh`

The single-iteration runner that becomes the building block for the AFK loop:

```bash
#!/usr/bin/env bash
# Concatenate all backlog issues
issues=$(cat issues/*.md)

# Last 5 commits for "what just happened" context
recent_commits=$(git log -5 --oneline)

# Run Claude Code in accept-edits mode with the loop prompt
claude --permission-mode accept-edits "$(cat <<EOF
$LOOP_PROMPT

## Backlog
$issues

## Recent commits
$recent_commits
EOF
)"
```

### Implementer prompt priority order

The block inside the loop prompt that picks the next task. Hard-code these in this order:

```
Pick the next task using this priority:
1. Critical bug fixes
2. Development infrastructure
3. Tracer bullets (vertical slices marked AFK)
4. Polishing, quick wins, refactors

If no AFK tasks remain, output: "no more tasks"
```

### Sandcastle pipeline shape (pseudocode)

The parallel AFK runner — TypeScript library, one worktree + Docker sandbox per issue:

```typescript
// Planner reads the Kanban DAG and returns the next batch of issues
//   that have no unmet blockers (the next "phase" of the DAG)
const issues = await planner.run({ prompt: planPrompt, backlog })

// For each issue: create a worktree+sandbox, run Sonnet implementer
const branches = await Promise.all(issues.map(issue =>
  sandbox.run({
    issue,
    branch: `issue-${issue.number}`,
    model: "sonnet",                  // implementation
    prompt: implementerPrompt,         // pull-style: skills available on demand
  })
))

// Reviewer runs on Opus with FRESH CONTEXT and pushed coding standards
const reviewed = await reviewer.run({
  prompt: reviewPrompt,                // push-style: standards in the prompt
  model: "opus",
  branches,
})

// Merger resolves conflicts, type errors, test failures across branches
await merger.run({ prompt: mergePrompt, branches: reviewed, issues })
```

Push vs pull rule for coding standards: implementer **pulls** (skills sit in repo, agent reaches for them), reviewer gets standards **pushed** into the prompt verbatim.

## User Notes

- **Lens for this re-ingest:** the talk as a coherent dev workflow (grill → PRD → Kanban → loop), the architecture lever (deep modules + `/improve-code-base-architecture`), and the dumb-zone discipline that holds it all together. Handoffs between stages matter as much as stages.

- **Confirmed discoveries kept (B, C, E):**
  - **B. Software-engineering fundamentals work better with AI** — every pipeline stage cites a 20-year-old book (Pragmatic Programmer, Brooks, Ousterhout). The reason the workflow is stable while tools churn.
  - **C. Feedback-loop quality is the AI ceiling** [1:09:30] — without feedback loops AI codes blind; ties TDD, deep modules, and the loop's run-tests step into one causal claim.
  - **E. Don't keep PRDs in the repo** [1:23:13] — close/delete after implementation; doc rot misleads future agents. Migration analog is unresolved — Matt: "I don't know."

- **Anti-takeaways (these qualify or invalidate older Pocock advice):**
  - **[0:59:18] More code review under AI is unavoidable.** "I don't honestly know what the answer to this yet." Open problem in his own pipeline — Ralph batched commits vs the keep-PRs-small dictum.
  - **[1:24:40] PRD retention policy is unsettled.** Migration analog ducked; treat the "always delete PRDs" rule as a working heuristic, not a verified principle.
  - **[1:26:04] Don't AFK-optimize the PRD.** The deep-think-improves-the-PRD suggestion is wrong — put the work into QA, not into PRD polishing. Hard limit on how far the destination doc should be pushed.
  - **[0:48:55] "Concise grammar" tip is dropped.** Matt's older CLAUDE.md instruction to "sacrifice grammar for concision" is no longer used because he no longer reads plans (grill-me replaced that need). Flag if older Pocock material in the wiki cites this.

## Related Topics

claude-code, workflow, prd, kanban, ralph-loop, deep-modules, context-engineering, dumb-zone, tdd, sandcastle, vertical-slice, afk-work, agentic-coding-workflow, context-discipline
