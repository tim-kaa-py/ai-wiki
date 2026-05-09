---
title: "Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban"
source_type: "youtube"
channel: "AI Engineer"
date: "2026-05-02"
url: "https://m.youtube.com/watch?v=W76woOYHlvY"
pillar: "building"
tags: [agents, agentic-coding-workflow, claude-code, codex, parallel-agents, plan-and-review, workflow, anti-patterns]
ingested: "2026-05-09"
source_file: "sources/youtube/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md"
---

# Software Engineering Is Becoming Plan and Review — Summary

**Source:** AI Engineer (talk by Louis Knight-Webb, founder of Vibe Kanban) | 2026-05-02 | [Link](https://m.youtube.com/watch?v=W76woOYHlvY) | 20:23

## TL;DR
The coding-time that AI displaces does not return as free time — it migrates into planning and reviewing, and the question is which side of that ledger you spend it on. Knight-Webb's argument: default to plan-heavy (spec up front, near-TDD, stay out of the loop) for everything except front-end feature work, where statefulness defeats specs and in-the-loop iteration wins; "5 minutes of planning saves 30 minutes of reviewing." As single-agent runs cross the ~5-minute attention threshold, parallelism becomes mandatory and the IDE has to be redesigned around four jobs — task writing, QA, code review, and shepherding to deploy — without forcing the human to context-switch every 30 seconds.

## Video Structure
1. [00:24-01:10] Intro — framing: what do engineers do all day after AI keeps getting better
2. [01:11-03:30] The displacement argument — coding time shrinks, planning + reviewing absorbs it (Copilot → ChatGPT → Cursor → Claude Code)
3. [03:30-05:58] Two modes of working — plan-heavy vs review-heavy (in-the-loop / YOLO); human time is the scarce resource
4. [05:58-07:09] The work-type matrix — front-end vs back-end × feature vs migration
5. [07:09-07:26] One-line distillation — "5 min planning saves 30 min reviewing"
6. [07:26-09:14] Time horizon — agents running longer (seconds → minutes → 5–10 min); type-check → Playwright MCP trade latency for accuracy
7. [09:14-10:26] Front-end QA via Chrome/Playwright MCP as the next breakthrough; the 5-minute attention threshold
8. [10:26-11:45] Terminal maxing / parallelism — multiple concurrent agents as the coping mechanism (Vibe Kanban as the example tool)
9. [11:45-14:00] The four jobs of the new IDE — task writing, QA, code review, shepherding to deploy; "focus maxing" as the anti-pattern to avoid
10. [14:00-end] *Out of scope per user direction:* live Vibe Kanban shutdown demo and Q&A.

## Key Concepts

### Plan-heavy approach
Spending substantial time up front producing a comprehensive plan doc (markdown spec, spec-framework output, or model-driven interrogation that exhausts edge-case questions) so the agent has enough information to one-shot the work. Trades planning time for fewer review rounds. Knight-Webb's framing collapses "spec frameworks", "comprehensive plan markdown", and "TDD" into the same family — the unifying property is *front-loaded human cost so the agent can run unattended*.

### Review-heavy / in-the-loop approach
The opposite stance: skip the detailed plan, "YOLO" a request like "add a contact form", then iterate by reviewing and correcting partially-delivered work. Cheap to start, but expensive in human attention because each round forces a context switch.

### Time horizon
The wall-clock duration of a single agent run between prompts. Has been climbing: Copilot (seconds, single line) → original Cursor (~30s, single file) → Claude Code 2024 (~1–2 min) → Claude Code 2025 (5–10 min). Knight-Webb treats this as a first-class design variable: longer horizons enable better tooling (type-check, Playwright MCP) but force the workflow itself to change once the run exceeds the human's ability to wait.

### Terminal maxing / parallel agents
The "obvious" coping mechanism once runs exceed ~5 minutes: run multiple agents concurrently in separate worktrees so that as soon as you finish reviewing one stream, another is ready. Turns the developer into a manager of multiple parallel streams — a job-shape most software developers have never had to do. Vibe Kanban is Knight-Webb's instantiation of this pattern.

### Focus maxing (coined here)
Knight-Webb explicitly coins this term — and frames it as an **anti-pattern**, not an aspiration. "Focus maxing" describes tools and workflows that pull a human in and out of context every 30 seconds to babysit short agent runs. His position: that fries the brain and is no way to live; tools should instead let the agent run as long as possible and yield back cleanly, not encourage constant interruption.

### Time horizon vs accuracy trade-off
Each tier of tooling the agent uses raises the run-length but also raises the quality of the output: returning code is fast, running a type-checker is slower, running Playwright MCP is an order of magnitude slower than that. Knight-Webb's framing: this is a worthwhile trade because the scarce resource you are minimizing is *your* time spent in the loop, not the agent's wall-clock time.

### The four jobs of the new coding-agent IDE
Knight-Webb's wishlist for what an IDE built around long-running parallel agents must do:
1. **Task writing / planning** — help the human author the spec the agent runs from.
2. **QA** — help the human (or eventually the agent) verify the change actually works, especially front-end behavior.
3. **Code review** — most companies with money on the line will not ship fully vibe-coded changes without reading the diff, so this stays a human job.
4. **Shepherding to deploy** — the admin tail: monitor PR comments, react to CI signals, drive the change from "done" to "deployed".

## Key Takeaways

1. **Treat your time as the scarce resource and default to plan-heavy.** Plan-heavy front-loads cost but minimizes total human time; review-heavy bleeds attention through repeated context switches. **How to apply:** before kicking off any non-trivial agent run, write a markdown plan or run a spec-interrogation pass; only YOLO when the cost of a wrong first attempt is genuinely lower than the planning cost.

2. **5 minutes of planning saves 30 minutes of reviewing.** The single-line distillation of the talk. **How to apply:** when tempted to skip the plan, set a 5-minute timer for spec writing and ship the plan to the agent at the buzzer — it will almost always pay back.

3. **Use the work-type matrix to decide plan vs in-the-loop.** Front-end feature dev is too stateful (animations, interactions, styles, edge cases) to spec exhaustively → in-the-loop wins. Back-end feature dev, refactoring, and migrations spec cleanly → plan-heavy, near-TDD, stay out of the loop. **How to apply:** before starting a task, classify it on the matrix; if it lands in front-end-feature, accept that you'll iterate; otherwise commit to writing the spec and not interrupting the agent.

4. **Pay the latency for better tools — type-check, then Playwright MCP.** Each tool tier raises run-time but improves accuracy enough to be worth it because what you're minimizing is *your* time, not wall-clock. **How to apply:** wire up a type-check loop in your agent's harness; experiment with Playwright/Chrome MCP for front-end QA even before it's mainstream — Knight-Webb predicts it as the next major breakthrough within ~9 months.

5. **Parallelism is the coping mechanism above the 5-minute threshold.** Once a single run exceeds the human attention span, you have two choices: waste the wait time, or run multiple agents in parallel worktrees. **How to apply:** stand up git worktree-based parallel runs (Vibe Kanban-style) for any task family that routinely exceeds 5 minutes; review streams in rotation rather than babysitting one.

6. **Treat "focus maxing" as the anti-pattern, not the goal.** Tools that demand 30-second attention bursts destroy productivity. Prefer tools that let the agent run long, finish cleanly, and yield back. **How to apply:** if a workflow forces you to check on an agent more than once every 5 minutes, redesign it — give the agent more tools (tests, type-check, browser) so it can self-verify before yielding.

7. **Code review stays a human job for anyone with money on the line.** AI-assisted review is fine; fully unread vibe-coded merges are not, in Knight-Webb's view. **How to apply:** keep human code review as a hard gate on production merges; lean on AI for pre-review and PR-comment shepherding (job #4) rather than letting it replace the read-through.

8. **Design your workflow around all four IDE jobs, not just code generation.** Task writing, QA, code review, and deploy shepherding are all distinct surfaces — most current tooling only addresses code generation well. **How to apply:** audit your own setup and identify which of the four is weakest; it's likely shepherd-to-deploy or front-end QA — invest there next.

## Argument Structures

**1. The displacement argument (why all your time becomes plan + review)**
- *Premise:* Coding time per task is shrinking with each model/tooling generation (Copilot → ChatGPT → Cursor → Claude Code).
- *Premise:* Engineering work decomposes into plan / write / review-own / review-others; the "write" portion is the one collapsing.
- *Naive expectation:* If I spent 4 hours coding before and now I don't, I get 4 hours back.
- *Reality:* No — the time is *displaced*, not freed. AI is an accelerant (~20 min back per 30 min coded), but most of the difference moves into planning and reviewing.
- *Conclusion:* The future job description is plan + review. Optimizing the workflow means optimizing how those two activities split.

**2. The plan/review trade-off argument**
- *Premise:* Human time is the scarce resource; agent wall-clock time is cheap.
- *Premise:* Plan-heavy work front-loads human time but reduces review rounds; review-heavy work back-loads time into multiple correction cycles.
- *Premise:* Context-switching between agent and human is expensive on the human side (focus loss, re-loading state).
- *Conclusion:* When you can spec the work, you should — plan-heavy minimizes total human time. Review-heavy is a fallback for cases where speccing is infeasible.

**3. The work-type matrix argument**
- *Premise:* Front-end feature work is stateful (interactions, animations, styles, transitions) — edge cases explode and you can't enumerate them up front.
- *Premise:* Back-end feature work, refactoring, and migrations have well-defined inputs/outputs and are amenable to test-driven specification.
- *If* the work is front-end feature → you cannot fully spec → in-the-loop is the lesser evil.
- *Else* (back-end, refactor, migration) → you *can* spec → plan-heavy / near-TDD wins, and you should not be in the loop at all.
- *Conclusion:* Don't pick a workflow style and apply it everywhere; pick per task using the matrix.

**4. The 5-minute threshold argument (why parallelism becomes necessary)**
- *Premise:* Each new tier of agent tooling (type-check, browser MCP) increases run-length while improving output quality.
- *Premise:* Humans can passively wait ~5 minutes (browse Twitter); beyond that, sitting and watching logs is wasteful.
- *Premise:* Wasted wait time directly destroys the productivity gain that long agent runs were supposed to deliver.
- *Conclusion:* Once average run-length crosses 5 minutes, single-stream workflows break — you must run multiple agents in parallel and rotate review attention. Existing single-pane tools were not built for this; new interfaces are required.

**5. The focus-maxing anti-pattern argument**
- *Premise:* Rapid context-switching between unrelated agent streams is cognitively expensive.
- *Premise:* Tools that fire interruptions every 30 seconds force exactly that pattern.
- *Premise:* The whole point of long agent runs is to give the human contiguous focus blocks.
- *Conclusion:* The right tool design lets each agent run as long as possible *and yield back cleanly* — not encourage constant in/out cycling. "Focus maxing" (the constant-interruption pattern) is what to avoid, not optimize for. The IDE's job is to protect human focus across the four work surfaces (task writing, QA, code review, deploy shepherding).

## Notable Commands / Code Snippets
No code snippets in the talk. Conceptual artifacts referenced as load-bearing:
- Comprehensive plan documents as markdown files
- Spec frameworks (model-driven interrogation until edge cases exhausted)
- Test-driven workflows for back-end and migration work
- Parallel git worktrees as the substrate for terminal-maxing (Vibe Kanban implements this pattern)
- Tool tiers in the agent harness: code return → type-check → Playwright/Chrome MCP for browser QA

## User Notes
- The plan/review thesis itself: coding time displaces into planning + reviewing; "5 min planning saves 30 min reviewing" is the operating heuristic.
- Two-mode framing (plan-heavy vs in-the-loop) and the work-type matrix as the decision tool.
- Time-horizon shift and the latency-vs-accuracy trade in the agent harness; front-end QA via Playwright/Chrome MCP as the predicted next breakthrough.
- Parallelism / terminal maxing as the coping mechanism past the 5-minute threshold; developer-as-stream-manager.
- "Focus maxing" as an explicitly named anti-pattern — tools should protect contiguous human attention, not fragment it.
- The four-jobs framing for what coding-agent IDEs need to do: task writing, QA, code review, shepherd to deploy.

## Related Topics
agents, agentic-coding-workflow, claude-code, codex, parallel-agents, plan-and-review, workflow, anti-patterns

## Scope Note
The live Vibe Kanban shutdown narrative ([14:00] onwards) and the Q&A about company learnings, hiring, and enterprise sales are intentionally out of scope per user direction — this summary covers only the conceptual portion of the talk. Vibe Kanban (https://github.com/BloopAI/vibe-kanban) is Knight-Webb's parallel-agent UI and is the concrete reference for "terminal maxing" / multi-agent worktree management; product details are not summarized here, but the project remains relevant as a worked example of the patterns described.
