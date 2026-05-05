---
title: "Patrick Debois"
type: "person"
pillar: "ecosystem"
tags: [devops, context-engineering, cdlc, tessl, agents]
sources:
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
last_updated: "2026-05-05"
---

# Patrick Debois

DevOps originator (coined the term and ran the first DevOpsDays in Ghent, 2009), now at **Tessl** working on context engineering for AI agents. His 2026 framing — *"context is the new code"* — ports DevOps SDLC discipline to the context-as-artifact world: the [Context Development Life Cycle (CDLC)](../concepts/context-development-life-cycle.md). [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

## Why He Matters Here

Debois has the unusual standing of having watched one previous "soft artifact becomes a first-class engineered artifact" transition play out (operations becoming code in the 2010s) and articulated that transition into a working discipline. He's now arguing the same transition is happening to **context** — `agent.md`, skills, prompts, packaged workflows — and applying the same playbook.

The reason to read him on context is the same reason DevOps caught on: he is not pitching a tool, he's naming a pattern that practitioners can already feel under their feet, and giving it a vocabulary that makes the pattern actionable.

## Key Contributions to AI Wiki Topics

- **Context Development Life Cycle (CDLC).** Five-phase infinity loop — Generate → Test → Distribute → Observe → Adapt — for context artifacts. The novelty isn't any single phase; it's insisting all five exist as an integrated lifecycle. See [Context Development Life Cycle](../concepts/context-development-life-cycle.md).
- **Code-folding-back-into-context.** Specific pattern where logic that *would* have been written as a branching code helper gets replaced by a skill that delegates the branching to the agent at runtime. Skills as *executable context* — the inverse of the usual "code calls LLM" direction.
- **Four-tier context-eval pyramid.** Linter → "Grammarly for context" → LLM-as-judge → judge-as-agent. See [Agent Evaluation § Four-Tier Context-Eval Pyramid](../concepts/agent-evaluation.md#four-tier-context-eval-pyramid-debois).
- **Error budgets per eval.** Run each eval N times, track success rate, allocate budgets per importance — per-eval SLOs rather than aggregate metrics. See [Agent Evaluation § Error Budgets per Eval](../concepts/agent-evaluation.md#error-budgets-per-eval-debois).
- **Context filter (WAF for prompt injection).** Perimeter scanner upstream of the LLM, because sandboxes can't catch injection in auto-loading `agent.md` / `skill.md` files. See [Context Filter](../concepts/context-filter.md).
- **AI SBOM.** Software bill-of-materials ported to context packages — provenance, dependencies, eval lineage, permissions footprint. See [AI SBOM](../concepts/ai-sbom.md).
- **The eval-tax argument.** Time saved by writing context instead of code gets spent on writing the evals that make context trustworthy. The savings shift; they don't disappear. The new business-critical skill is *the process for building the right evals* — meta-engineering.

## Key Arguments

**Why context now needs an SDLC analog.** Two premises: (1) prompts and instructions are now generated, reused, and committed (`agent.md`, skills) — they have all the surface area of source code; (2) code is actively folding back into context as skills replace branching helpers. If something has the surface area of code and replaces code, it inherits code's needs. Conclusion: context deserves its own lifecycle — the CDLC — and ad-hoc "edit the markdown and hope" is the equivalent of pre-DevOps cowboy ops.

**Why sandboxes don't solve injection from skills.** Coding agents auto-load `agent.md` / `skill.md` files into the prompt on download, before any user code runs. A sandbox boundary kicks in when the agent *executes* something — not when it *reads context* into the model. By the time the sandbox is enforcing anything, the malicious instructions are already inside the LLM's context window and may have already steered the agent's plan. The defense has to be upstream, not downstream.

**The hidden cost (from the Q&A).** Writing context replaces writing code, which feels like time saved. But context only works rigorously if you have evals — and each context prompt now begets multiple eval prompts. Authoring good evals for your business case is itself a *process problem*, not a single skill — the more advanced practitioners build their own meta-process for "how we generate the right evals." The new core competency isn't writing context, it's the process for building the right evals.

## Notable Framings

- **"Context is the new code."** The talk's title and thesis.
- **"Most public skills are crap" (99.9%).** Argument for private registries and SBOMs. Public registries are for pattern learning; production-quality skills live in private registries.
- **"WAF for context."** The right organizational and structural analogy for a context filter — security-team-owned, sits in front of the LLM, inspects shapes of harm without needing domain logic.
- **Solo loop → team loop → org-of-teams flywheel.** Scaling progression for the CDLC: individual runs it for their context; team shares context and evals; org-of-teams compounds when each team's missing-context fixes flow back to a shared registry.

## Background

- 2009: coined "DevOps," organized first DevOpsDays in Ghent.
- 2010s: ongoing DevOps community work; blog at jedi.be.
- Mid-2020s: shifts focus to AI agents and context engineering.
- 2026: at Tessl, explicitly framing the context-as-code transition.

## Source on This Wiki

- [Context Is the New Code — AI Engineer 2026](../../summaries/2026-05-03_ai-engineer_context-is-the-new-code.md)

## See Also

- [Context Development Life Cycle](../concepts/context-development-life-cycle.md)
- [Context Engineering](../concepts/context-engineering.md)
- [Context Filter](../concepts/context-filter.md)
- [AI SBOM](../concepts/ai-sbom.md)
- [Agent Evaluation](../concepts/agent-evaluation.md)
- [Agent Skills](../concepts/agent-skills.md)
