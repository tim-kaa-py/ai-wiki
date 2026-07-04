---
title: "Context Development Life Cycle (CDLC)"
type: "concept"
pillar: "building"
tags: [cdlc, context-engineering, agents, evaluation, skills, workflow, devops]
sources:
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
timestamp: "2026-05-05"
---

# Context Development Life Cycle (CDLC)

Patrick Debois's coinage (Tessl, AI Engineer 2026-05-03): an infinity-loop SDLC analog for **context** — `agent.md`, skills, prompts, packaged workflows — with five phases: **Generate → Test → Distribute → Observe → Adapt**. The framing is explicitly borrowed from Debois's 2009 DevOps work ("what if ops looked more like dev?" → "what if context is the code?"). The novelty isn't any single phase — it's insisting that all five exist as an integrated lifecycle for context, not just for code. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

## Why Context Now Needs a Lifecycle

Two premises drive the framework:

1. **Context has the surface area of code.** Prompts and instructions are now generated, reused, and committed. `agent.md` is checked into git; skills ship through registries; teams collaborate on shared context the way they collaborate on shared modules.
2. **Code is folding back into context.** The clearest example: a multi-ecosystem onboarding helper that detects "is this Python or Node, npm or pnpm" and dispatches gets replaced by a skill that delegates the branching to the agent at runtime. The skill solves more cases than the helper ever could because the agent handles the combinatorial explosion. Skills here are *executable context* — the inverse of the usual "code calls LLM" direction.

Conclusion: anything that has the surface area of code and replaces code inherits code's needs — testing, distribution, observability, security. Ad-hoc "edit the markdown and hope" is the equivalent of pre-DevOps cowboy ops.

## The Five Phases

### 1. Generate

How context gets authored. Debois enumerates the standard sources, all of which a CDLC has to handle:

- Human prompting (the inline turn-by-turn case)
- Reusable instructions (`agent.md`, system prompts, persona docs)
- Library documentation pulled into context (`llms.txt`, vendor docs)
- MCP-fetched context at tool-call time
- Spec-driven development (specs as a first-class generated artifact)

The Generate phase is the only one where most teams are mature; the other four are typically missing.

### 2. Test

Four-tier eval pyramid for context artifacts (full breakdown in [Agent Evaluation § Four-Tier Context-Eval Pyramid](agent-evaluation.md#four-tier-context-eval-pyramid-debois)):

| Tier | What it does |
|------|--------------|
| **Linter** | Schema/length validation on the context file (e.g., SKILL.md frontmatter checks) |
| **Grammarly for context** | LLM critiques clarity, ambiguity, contradictions in the prose |
| **LLM-as-judge** | Run the agent against a fixed prompt; judge output against company-specific rubric |
| **Judge-as-agent** | Give the judge tools + sandbox so it grades the *running* system, not the file |

The Test phase also runs an **error-budget loop** rather than pass/fail, because evals are non-deterministic. See [Agent Evaluation § Error Budgets per Eval](agent-evaluation.md#error-budgets-per-eval-debois).

### 3. Distribute

Skills are the package format. Debois treats skill distribution as a package-management problem with the usual cast — registries, version pinning, dependency hell, supply-chain scanning. Two operational rules:

- **Run a private skill registry**, not the public marketplace. Public registries are good for learning patterns; production-quality skills live in private registries (Debois's blunt take: 99.9% of public skills are crap).
- **Snyk-for-context plus an [AI SBOM](ai-sbom.md)** — scan skill bundles for credential leakage and third-party exposure, and ship a bill-of-materials with each release.

See also [Agent Skills § Skills as a Package Format](agent-skills.md#skills-as-a-package-format).

### 4. Observe

Production telemetry that loops back into context. Two signal sources Debois highlights:

- **Agent logs as context-eval signal.** Every "I'm missing this piece" log line is a missing-context bug. Aggregate org-wide; recurring patterns become shared-context fixes.
- **PR review comments as context feedback.** Every "this isn't quite right" PR comment is signal that some context is incomplete. Convert into a durable artifact (lint, test, persona doc, skill update) — overlaps with Ryan Lopopolo's [garbage collection day](harness-engineering.md#harness-as-repo-artifacts-ryan-lopopolo-openai) ritual.

There's also a **production-failure-to-eval-test** tooling pattern: capture prod failures (input/output diffs), prompt the agent to author a test case so the same failure can't recur. The eval suite grows from real failures, not synthetic edge cases — same principle as [Agent Evaluation § Practical Roadmap](agent-evaluation.md#practical-roadmap) item 1.

### 5. Adapt

The infinity-loop closure: feedback from Observe goes back into Generate. Mature CDLCs have automation for this — an agent reads recurring log patterns, drafts shared-context updates, opens PRs against the relevant `agent.md` / skill files. This is the context-as-code analog of agent-driven `QUALITY_SCORE.md` / `tech-debt-tracker.md` patterns from [Harness Engineering § Harness as Repo Artifacts](harness-engineering.md#harness-as-repo-artifacts-ryan-lopopolo-openai).

## Perimeter Concern: Context Filter

Distribution + Observe both pull untrusted text (downloaded skills, MCP-fetched docs, ticket bodies, PR comments) into context. A sandbox can't protect against prompt-injection in `agent.md` or `skill.md` files because those auto-load. The CDLC needs a **perimeter scanner** that filters incoming context for injection patterns *before* it reaches the LLM — Debois's WAF-for-context analogy. See [Context Filter](context-filter.md).

## The Hidden-Cost Argument: The Eval Tax

The most actionable insight from Debois's Q&A: writing context replaces writing code, which feels like time saved — but context only works rigorously if you have evals, and each context prompt now begets multiple eval prompts. The savings shift; they don't disappear. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

The deeper move: authoring good evals for your business case is itself a *process problem*, not a single skill. The advanced practitioners build their own meta-process for "how we generate the right evals." That meta-process is the new business-critical asset. Practitioners who skip this step ship unverified context and pay the cost in production.

Operational rule: **when estimating a context-engineering task, double the estimate to account for eval authoring.**

## Solo Loop → Team Loop → Org-of-Teams Flywheel

Debois closes the talk with a scaling progression: an individual runs the CDLC for their own context; a team shares context and evals; an org-of-teams compounds when each team's missing-context fixes flow back to a shared registry. LLMs are the engine, context is the fuel — and the CDLC is the refinery.

## See Also

- [Context Engineering](context-engineering.md) — the prior-era framing this builds on
- [Agent Evaluation](agent-evaluation.md) — the Test phase in depth (four tiers + error budgets)
- [Agent Skills](agent-skills.md) — the Distribute phase's package format
- [Context Filter](context-filter.md) — perimeter scanner for the Distribute/Observe phases
- [AI SBOM](ai-sbom.md) — supply-chain bill of materials for Distribute
- [Harness Engineering](harness-engineering.md) — the wrapping discipline; CDLC is what runs *inside* the harness
- [Patrick Debois](../people/patrick-debois.md) — DevOps originator, now framing context as code
