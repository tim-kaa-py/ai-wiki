---
title: "Reviewer Agents"
type: "concept"
pillar: "building"
tags: [harness-engineering, code-review, agents, ci, agentic-coding-workflow, workflow, best-practices]
sources:
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
last_updated: "2026-04-22"
---

# Reviewer Agents

Persona-based agents that run on every push in CI, each primed as a specific reviewer persona (reliability engineer, front-end architect, product-minded engineer, scalability engineer). Each reads a documented "what good looks like" for its domain plus the diff, and surfaces P2+ issues against that standard. Introduced by Ryan Lopopolo (OpenAI) at AI Engineer 2026 as the mechanism that removes synchronous humans from the PR-merge critical path.

## The Problem They Solve

On a team shipping 3-5 PRs per engineer per day, human code review is the merge bottleneck. Human reviewers also repeat themselves — the same classes of feedback recur across PRs because the underlying concern isn't encoded anywhere durable. Every repeat is a context failure the agent could have avoided with the right prompt at the right time.

Reviewer agents convert that repeated feedback into durable, parallel, always-available artifacts. Each comment class becomes:

1. A persona doc describing "what good looks like" in that domain
2. A CI agent that reads the doc + the diff and posts PR comments

From then on, every push gets the review the human used to give — without blocking on the human's calendar.

## Persona Design

Ryan's team runs a handful of personas, each scoped to a durable concern:

- **Reliability engineer** — retries, timeouts, error handling, idempotency, observability
- **Front-end architect** — component decomposition, state management conventions, accessibility
- **Product-minded engineer** — UX consistency, copy, critical user journey coverage, QA plan adherence
- **Scalability engineer** — N+1 queries, unbounded concurrency, memory footprint
- **Security reviewer** — input validation, auth boundaries, secret handling

Each persona has its own doc (usually in `docs/review-personas/<persona>.md`) that defines the standard. The reviewer agent for that persona is prompted with the doc, the diff, and instructions to surface only P2+ issues — not every stylistic nit.

## How to Wire One

1. Pick one persona. Reliability is a good first target because the failure modes are concrete.
2. Write the doc. List the 10-20 things you actually look for when reviewing for reliability. Include examples of good and bad patterns.
3. Wire an agent SDK call into CI on every push. The call reads the persona doc + the PR diff + relevant context files and posts structured PR comments.
4. Ship it. Iterate on the doc as the agent misses or over-flags things.
5. Add the next persona.

## Non-Blocking by Design

A common objection: "won't reviewer agents bully the implementation agent into over-correcting?" Ryan's answer is to not make every comment blocking. The implementation agent can acknowledge, defer, or reject reviewer comments — like a human author would. The bias is toward *acceptance, not perfection*. Reviewer agents surface issues; the implementation agent and (occasionally) the human decide what to act on.

## Relationship to the Writer / Reviewer Pattern

The classic "writer / reviewer" pattern from [Claude Code](../tools/claude-code.md) (fresh-context reviewer beats self-review) is the single-PR version of the same idea. Reviewer agents generalize it:

- Fresh context per reviewer (so the reviewer can't rationalize the writer's mistakes)
- Multiple reviewers, each narrow and persona-specific
- Runs in CI on every push, not just on demand
- Reads a persona doc, so the review standard is durable and versioned

## Relationship to Structural Tests

Order of preference, from deterministic to judgment-based:

1. **Lint rule** if the concern is syntactic and per-file
2. **Structural test** if the concern is representational and whole-repo — see [Code-as-Text Structural Tests](code-as-text-structural-tests.md)
3. **Reviewer agent** if the concern requires judgment a deterministic check can't express
4. **Persona doc read by a human** only if the concern can't be articulated crisply enough for any of the above

Push every review concern as far down the ladder as possible. A reviewer agent that keeps surfacing the same issue is a signal that the issue should become a structural test or a lint.

## The Garbage Collection Feedback Loop

Ryan's team dedicates Fridays to "garbage collection" — every engineer's full-day job is to take every review pattern observed during the week and convert it into a durable artifact: a lint, a structural test, a reviewer-agent rule, or an update to a persona doc. This is what closes the loop. Without it, reviewer agents stay static while the kinds of slop the team is seeing evolve.

## QA Plans as the Product-Reviewer's Rubric

For user-facing PRs, Ryan requires a QA plan — a checklist of features, critical user journeys, and required PR media (screenshots, recordings). The product-minded reviewer agent reads the QA plan + the attached media and asserts the plan was followed. This is what lets humans stop shoulder-surfing user-facing changes.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the parent discipline
- [Code-as-Text Structural Tests](code-as-text-structural-tests.md) — the deterministic counterpart
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where reviewer agents fit in daily practice
- [Claude Code](../tools/claude-code.md) — writer/reviewer pattern, agent SDK for wiring
