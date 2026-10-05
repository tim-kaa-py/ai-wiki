---
title: "AI-Native SDLC"
type: "concept"
description: "Anthropic's framing of the software lifecycle once agents make Build cheap: six stages connected by committed artifacts (intent.md, spec.md, plan.md, diff, PR, incident record), governance enforced as the agent acts, and deterministic control bands that close the loop back into intent"
pillar: "building"
tags: [sdlc, workflow, governance, hooks, agent-skills, evaluation, enterprise, claude-code, best-practices]
sources:
  - "summaries/2026-08-21_anthropic_the-ai-native-sdlc-playbook.md"
  - "summaries/2026-09-04_ray-amjad_anthropic-just-released-claude-code-mods.md"
timestamp: "2026-10-05"
---

# AI-Native SDLC

The software development lifecycle reorganised around one fact: agents collapsed Build to hours, so the expensive stages are now the human-speed ones on either side of it (plan, review/test, deploy) and the controls that assume a human wrote every line. The term, and every mechanism on this page, comes from Anthropic's AI-Native SDLC playbook (Louis Claxton, Applied AI, August 2026), which treats "agentic SDLC", "AI SDLC" and "agentic software development" as synonyms.

**Single-source page.** Everything below is from one vendor playbook. It is prescriptive rather than measured: every play comes with leading and lagging indicators, but no outcome data is reported, and the only evidence claim is that it was "inspired by working with our customers." Several of the products it leans on (Claude Tag, managed Code Review, Claude Design, Claude Security) are beta or research preview. Read the mechanisms as tool-agnostic patterns and the product specifics as Anthropic's placement. [Source: 2026-08-21_anthropic_the-ai-native-sdlc-playbook]

## The Core Claim: Keep the Control Objectives, Change the Enforcement

The six traditional stages (Plan, Design, Build, Test, Deploy, Maintain) survive. What changes is that they become non-linear, connected by automated handover, and governed *as the agent acts* rather than in periodic committees. The old control objectives (accountability, separation of duties, auditability) are kept; only their enforcement moves.

The argument for why this is necessary:

1. Traditional rituals (PRDs, estimation, security reviews) existed to force alignment before expensive weeks of coding, and its controls assume each step is done by a human.
2. Agents collapse Build; the surrounding stages keep their human-speed length.
3. So the constraint moves to plan, review and deploy; line-by-line human review stops keeping up once agents write most of the diff; and governance cost rises because exceptions still route through committees.
4. Therefore the process around the code needs the same transformation Build already had.

The playbook itself notes that "most organizations sit somewhere between" the traditional and AI-native columns. The first practical move follows from premise 3: measure elapsed time in plan, review and deploy (git timestamps, PR metadata) before adding agent capacity, and target the longest stage.

## The Artifact Chain

Every stage ends by committing one artifact that the next stage starts by reading:

| Stage | Artifact | Trigger for next stage |
|-------|----------|------------------------|
| Plan | `intent.md` | Product owner accepts (merge) → design pass |
| Design | `spec.md` | Spec approved → plan mode |
| Build | `plan.md`, then diff + tests | Plan accepted → implementation |
| Test / Deploy | PR with review findings | Merge → pipeline |
| Maintain | Incident record / new `intent.md` | Control-band breach → new intent |

Two properties carry the design:

- **Markdown early, code late.** Plan and Design use markdown because a product owner and an agent can both read and act on the same file. From Build onward the artifact is code and its records.
- **The commit chain is the audit trail.** "Who asked for what, what the agent produced, and who approved it" is recoverable from git history without a separate logging discipline.

**Maturity path for each handover:** run the step by hand first, then codify it as a slash command, then as a merge-triggered non-interactive job. The playbook's worked example: an accepted `intent.md` fires a CI job that runs the design pass with the organisation's skills loaded and opens `spec.md` as a pull request, so the product owner's first involvement becomes the review.

**How to apply:** create an `intent/` folder in one product repo, and have the next stage start *from the file*, not from a conversation. This is the same rule Cole Medin states as "artifacts are the only legitimate input" — see [Agentic Coding Workflow § The 3+ times rule](../how-tos/agentic-coding-workflow.md#the-3-times-rule).

### intent.md

A proto-spec in the originator's own words: problem, proposed outcome, affected users and systems, constraints, open questions. It is drafted by brainstorming with Claude (claude.ai or Cowork for non-engineers), corrected by the originator, and committed to an `intent/` folder in the product repo; a dedicated intent repo is only worth it when intent spans many repositories. It has three entry routes: a person's idea, a ticket, or an agent diagnosis from Maintain. Note it is a playbook convention, not a Claude Code feature.

```markdown
# Intent: claims status self-service
Author: J. Ortiz (claims operations). Status: draft.

## Problem
Customers phone the contact center to ask where their claim is.

## Proposed outcome
Customers see claim status, next step and expected date in the portal.

## Affected users and systems
Claims handlers, portal team, claims-core API.

## Constraints
No new PII in the portal session. Existing authentication only.

## Open questions
Do third-party loss adjusters need access too?
```

### spec.md and plan.md

Claude writes the requirements-and-design spec from the accepted intent, constrained by the organisation's skills for brand, security, compliance and UX. The product owner **reviews the spec but does not write it**, working through flagged concerns with their named policy owners before engineering sees it. The critical read on this step: it assumes the skills encode policy well enough to be trusted as spec constraints, which is exactly what the evals play (below) exists to verify.

The plan is a short, reviewable skeleton:

```markdown
# Plan: claims status self-service (from intent.md 2026-06-02)

## Files that change
## Order of work
## Risks
## Proof
```

"Files that change" does double duty: it is how you see which tasks are independent enough to run in parallel sessions.

### Relation to Other Planning Pipelines in This Wiki

The chain is the third named artifact pipeline here, alongside Dex Horthy's four-stage pipeline (product review → system architecture → program design → vertical slices, on [Software Factory](software-factory.md#the-four-stage-planning-pipeline-he-proposes-instead)) and Matt Pocock's grill → PRD → issues → loop (on [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md#the-pocock-pipeline-grill--prd--kanban--loop)). The playbook's distinctive moves are the **non-engineer entry point** (`intent.md` authored by a product owner) and **commit-as-trigger** between stages. It has no equivalent of Horthy's program-design layer; `plan.md` goes straight from files-that-change to order of work. It also lands on the remedy Ryan Lopopolo proposes in his plan-mode critique, "ship the plan as its own PR", by making every stage's output a committed, reviewed artifact.

## Governance as the Agent Acts

### Advisory vs. Deterministic Controls

The playbook's cleanest distinction. A **skill** "is a control, though an advisory one. It makes Claude likely to apply the policy while the code is written, and nothing forces a session to comply with it." A **hook** is "the deterministic layer behind it": "The skill makes violations rare and the hook makes them close to impossible." **Managed settings** are the org-level, non-overridable layer above both.

Since mods launched (v2.1.287, after this playbook), "close to impossible" holds only while mods are governed: an installed [mod](../tools/claude-code-mods.md) can approve a tool call that a `PreToolUse` hook blocked. Managed settings are where that is closed, via `allowManagedModsOnly`. See [Claude Code Hooks § Hooks vs `bypassPermissions`](../how-tos/claude-code-hooks-memory.md#hooks-vs-bypasspermissions).

The operating rule: for each skill, ask *"what happens if this doesn't trigger?"* If the answer is unacceptable, put a hook or a PR re-check behind it. Details on [Agent Skills § Skills Are Advisory Controls](agent-skills.md#skills-are-advisory-controls) and [Claude Code Hooks § Hooks as SDLC Gates](../how-tos/claude-code-hooks-memory.md#hooks-as-sdlc-gates-anthropics-ai-native-sdlc-playbook).

### Where Each Kind of Hook Belongs

| Stage | Hook kind | Why |
|-------|-----------|-----|
| Build | Fast allow/block, scoped to the changed file (protected paths, formatter/linter, credential leaks) | Fires on nearly every edit; heavy checks go to commit or PR |
| Deploy | Approval (`ask`) for a named human: release, change tickets, migrations, infra | Rare, consequential actions; a pause here doesn't block every parallel session |

A block must explain itself and name the route to approval.

### The Production Gate

"The agent may act up to the production gate and cannot pass it." Three controls enforce it together: branch protection (agent writes only arrive as PRs), a production-deploy hook requiring a named release authorisation, and per-environment permission tiers (dev: deploy freely; staging: in between; prod: agent prepares, release manager authorises). Non-interactive runs act under the agent's own identity so logs separate the agent from the engineer who triggered it.

**Soft spot:** the playbook's example production hook is a substring match on "deploy" and "production" in a Bash command, fine as an illustration and weak as a control, since MCP deploy tools, aliases or wrapper scripts bypass it. The playbook's own recommendation to expose deployment through scoped MCP tools is the stronger control.

### Review and Separation of Duties

"The agent that wrote the code has no way to approve it." In the playbook, review findings never approve or block on their own, and branch protection requires a code owner; a platform engineer who wants a findings gate reads the machine-readable severity tally the check run publishes. The playbook's Deploy row describes the end state as "layers of agentic review with human review reserved for regulated and critical code."

That last position is contested elsewhere in this wiki: it sits between Ryan Lopopolo's reviewer agents that take humans off the merge path and Dex Horthy's and Louis Knight-Webb's insistence on a human read of every production change. See [Reviewer Agents](reviewer-agents.md) and [Plan and Review](plan-and-review.md).

Operational pieces: a `@claude` comment makes Claude push the fix (via claude-code-action; in the managed service it requests a fresh review instead), a custom slash command can babysit a Claude-opened PR to green so it waits only on human approval, and a tech lead rates findings monthly and caps nits. See [Code Review (Claude Code)](../how-tos/claude-code-review.md#operating-it-in-an-sdlc-anthropics-ai-native-sdlc-playbook).

## Test: Feedback Loop, Verifier, and Evals on the Configuration

Three things the playbook keeps separate:

- **The feedback loop** (tests, build, screenshot diff) runs *throughout* the task, as often as needed. Make "run tests and paste output" part of done in CLAUDE.md.
- **The verifier subagent** is one way to package the *final* check: a fresh context run once the session believes it is done, "so the verdict is not colored by the assumptions that produced the code," instructed to report only, never fix.
- **Continuous evals** regression-test the **agent's configuration**, not the product. See [Agent Evaluation § Evals on the Agent's Configuration](agent-evaluation.md#evals-on-the-agents-configuration-anthropics-ai-native-sdlc-playbook).

**Protect the feedback loop from the agent.** For bug fixes: Claude writes the failing test, confirms it fails for the expected reason, commits it, then fixes the code without editing the test, enforced by a hook that blocks test-file edits while a fix task is active (or by rejecting test-touching diffs in review). Compare the holdout-scenario pattern on [Five Levels of AI Coding](five-levels-of-ai-coding.md#scenarios-vs-tests-holdout-sets-for-ai-authored-code), which addresses test-gaming by keeping the criteria invisible to the agent rather than locking them.

## Maintain: Closing the Loop

### Control Bands and σ Tiers

Detection stays **deterministic**: a version-controlled, unit-tested script computes mean and standard deviation over a rolling window for a metric with a stable baseline (CI failure rate, post-deploy 5xx, PR cycle time), using Western Electric–style rules to catch drift as well as spikes. No model is involved in deciding that something is wrong. The breached tier decides what the model may then do:

```yaml
metric: ci_test_failure_rate
baseline: rolling_30d
rules: western_electric
tiers:
  1sigma: { action: log }
  2sigma: { action: diagnose,
            tools: "Read,Grep,Bash(gh run view *)" }
  3sigma: { action: propose,
            routes: [pull_request, runbook:rollback-deploy] }
```

The diagnosis is written as a new `intent.md` and re-enters the pipeline at Plan, which is what makes the lifecycle a loop rather than a line. Dismissals during triage tune the bands.

The argument for keeping the model out of detection: the trigger decides when an unsupervised run starts, and a deterministic, versioned script is auditable and reproducible where a model is neither. This is the same move as Debois's "convert supervision from a continuous cost into a triggered one" on [Software Factory § The Dim Factory](software-factory.md#the-dim-factory-autonomy-as-a-per-feature-risk-decision-debois), given a concrete mechanism.

### Recurring Scans

A security scan is "a point-in-time statement about a codebase under a particular model, and both halves go stale": code changes weekly, and each model generation finds what the prior one missed. So scans run on a schedule (weekly for active services), the first run is a baseline even on a "clean" repo, dismissals carry reasons, bounded fixes go through the PR gate and larger ones become `intent.md`, and each fixed vulnerability class adds a permanent eval. Deterministic SAST and dependency checks stay in CI.

## Adoption Order Is Not Stage Order

The plays have prerequisites, and the dependency order differs from the lifecycle order:

| Can start anywhere (no prerequisites) | Requires first |
|---------------------------------------|----------------|
| `intent.md` capture, CLAUDE.md, skills, the feedback loop, hooks as approval gates | **CI/CD automation** needs PR review and hooks-as-gates, "because the gates must exist before automation accelerates anything through them" |
| | **Closing the loop** needs `intent.md`, PR review, hooks, and a rollback rehearsed in staging |

**How to apply:** start with CLAUDE.md, the feedback loop and one skill; do not wire merge-triggered jobs until the review gate and the production hook exist.

The same logic governs auto mode: the playbook makes auto-accept "the default for routine work" only once the guardrails have matured (a tuned CLAUDE.md, policy skills, blocking hooks, tests Claude can run), and only for a tight spec, a small blast radius, and code the tests already cover. See [Claude Code Auto Mode](../how-tos/claude-code-auto-mode.md).

## Legacy Systems: One Source of Truth per Artifact

Legacy trackers stay because auditors accept them. For every artifact type in the chain, name exactly one authoritative system, choosing per artifact:

| Configuration | Authoritative record | Fits |
|---------------|---------------------|------|
| **Repo as source of truth** | Markdown in git; the legacy system references commits | Engineering-led orgs; one tool, one timestamp authority |
| **Legacy system as source of truth** | Jira / ServiceNow; markdown is a working copy | Claude reads the record at session start and writes back over MCP in the same session |
| **Linkage as the minimum bar** | Both, cross-linked (IDs in artifacts, SHAs in records) | An explicitly accepted starting point with two sources of truth |

**Scope note on "audit trail".** The commit-chain audit trail records *changes to the software*: who asked, what was produced, who approved. It is not the runtime audit trail a regulated agent needs for its *actions on data* in production, which [Regulated-Enterprise Agent Architecture](regulated-enterprise-agent-architecture.md#audit-trail-means-the-soc-2--hitrust--hipaa-sense) argues requires a complete, unified event log. The two answer different auditors' questions.

## Parallel Sessions vs. Subagents

- A **parallel session** is a full Claude Code instance in its own git worktree on its own task. Sessions know nothing about each other; the engineer is the only shared thing. They raise throughput.
- A **subagent** is a scoped helper *inside* one session, with its own context window and tool limits, for recurring jobs (simplifier, verifier, researcher). Subagents keep a session focused.

Split parallel work by files touched (read it off `plan.md`); tasks sharing files run sequentially in one session. "Two or three sessions is a sensible starting point. The practical ceiling is how many streams one person can review properly." See [Parallel Agent Patterns § Review as the Ceiling](parallel-agent-patterns.md#review-as-the-ceiling-anthropics-ai-native-sdlc-playbook).

## Leading and Lagging Indicators

Each play comes with a pair of indicators, most readable from git timestamps, PR metadata, the OpenTelemetry export, CI logs or the incident tracker, so no new instrumentation is needed. A selection:

| Play | Leading indicator | Lagging indicator |
|------|-------------------|-------------------|
| intent.md capture | First conversation → committed intent.md (weeks → hours) | Share of intents accepted; intent edits after first spec.md commit |
| Plan mode | Share merged from first pass; plan approval → merged PR | Rework cycles; merged diff still matches plan.md |
| CLAUDE.md | Repeated mistakes CLAUDE.md should have caught | Time to first merged PR for new joiners |
| Skills | Policy approval → updated skill merged | Policy-citing review findings (→ zero) |
| Parallel sessions | Concurrent sessions per engineer while review quality holds | Changes merged per engineer/week vs. rework rate |
| Continuous evals | Pass rate over time; incident → permanent eval | Regressions caught in CI vs. in production |
| Hooks as gates | Wait time per gate (OTel allow/block timestamps) | Gate violations reaching production before/after |
| Closing the loop | Band breach → intent.md in triage queue | Findings becoming merged fixes; repeat incidents |

The full 13-row table is in the [summary](../../summaries/2026-08-21_anthropic_the-ai-native-sdlc-playbook.md#leading-and-lagging-indicators-discovery-f). Compare Debois's org-level "human touches per correct result" on [Agent Enablement](agent-enablement.md#two-metrics-that-are-not-productivity), which measures the whole system rather than a single play.

## Related Pages

- [Context Development Life Cycle](context-development-life-cycle.md) — Debois's lifecycle for the context artifacts (CLAUDE.md, skills) this SDLC depends on
- [Software Factory](software-factory.md) — Horthy's pipeline and Debois's dim factory; the same intent-to-production loop from other angles
- [Plan and Review](plan-and-review.md) — why the bottleneck moves to planning and reviewing
- [Reviewer Agents](reviewer-agents.md) — the agentic review layer, and the open question of how much human review remains
- [Agent Evaluation](agent-evaluation.md) — evals on the agent's configuration as the Test stage
- [Agent Skills](agent-skills.md) — skills as advisory policy controls
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — hook mechanics, and hooks as stage gates
- [Claude Code Sandboxing](../how-tos/claude-code-sandboxing.md) — managed settings and the sandbox layer
- [Code Review (Claude Code)](../how-tos/claude-code-review.md) — the managed PR-review service in the Deploy stage
- [Parallel Agent Patterns](parallel-agent-patterns.md) — worktree sessions and the review ceiling
- [Agent Enablement](agent-enablement.md) — the organisational scaffolding the adoption order runs on
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — the maturity ladder and the dark-factory endpoint this playbook stops short of
- [Regulated-Enterprise Agent Architecture](regulated-enterprise-agent-architecture.md) — the runtime audit trail, as distinct from the commit-chain one
- [Claude Code](../tools/claude-code.md) — CLAUDE.md rules of thumb from the Build stage
