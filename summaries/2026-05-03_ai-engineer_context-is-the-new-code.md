---
title: "Context Is the New Code – Patrick Debois, Tessl"
description: "Patrick Debois proposes a Context Development Life Cycle that applies DevOps practices to engineering prompts, skills, and workflows"
type: "summary"
channel: "AI Engineer"
date: "2026-05-03"
resource: "https://m.youtube.com/watch?v=bSG9wUYaHWU"
pillar: "building"
tags: [context-engineering, agents, evaluation, workflow, skills, harness-engineering, best-practices]
timestamp: "2026-05-05"
source_file: "sources/youtube/2026-05-03_ai-engineer_context-is-the-new-code.md"
---

# Context Is the New Code – Patrick Debois, Tessl — Summary

**Source:** AI Engineer | 2026-05-03 | [Link](https://m.youtube.com/watch?v=bSG9wUYaHWU) | 27:13

## TL;DR
Patrick Debois argues that context — prompts, instructions, skills, packaged workflows — has become a first-class engineered artifact, and proposes a "Context Development Life Cycle" (CDLC) that ports the DevOps SDLC infinity loop (Generate → Test → Distribute → Observe → Adapt) to context. The actionable thesis for agentic-coding practitioners: treat your `agent.md`, skills, and prompts like code that needs linting, multi-tier evals, error-budgeted CI, package-managed distribution with security scanning, and production observability — and accept that the time you save not writing code now goes into writing the right evals.

## Video Structure
1. [00:14-01:48] Opening — Track host intro, "vibe-coding" framing, raise of hands.
2. [01:48-02:35] Thesis 1: Context is generated; code is folding back into context as skills (the multi-ecosystem onboarding example).
3. [02:35-03:45] Thesis 2: DevOps parallel — what does a Context Development Life Cycle look like?
4. [03:45-06:30] Generate — Human prompting, reusable instructions (`agent.md`), pulling library docs, MCP context, spec-driven development.
5. [06:30-13:48] Test — Four eval tiers (linter, "Grammarly-for-context", LLM-as-judge, judge-as-agent with tools), context optimization loop, and error budgets for non-deterministic CI.
6. [13:48-17:42] Distribute — Skills as the package format, registries (most public skills are crap), version pinning, dependency hell, Snyk-for-context, AI SBOM.
7. [17:42-22:30] Observe — Agent logs as feedback, PR comments as context feedback, production-failure-to-eval-test tools, and the "context filter" (WAF analogy) for prompt injection that sandboxes can't catch.
8. [22:30-24:15] Wrap-up — Solo loop → team loop → org-of-teams flywheel; LLMs are the engine, context is the fuel.
9. [24:15-26:50] Q&A — Exotic context forms (consistency-as-eval) and the hidden cost of rigorous context engineering: writing the right evals.

## Key Concepts

### Context Development Life Cycle (CDLC)
Debois's coinage: an infinity-loop SDLC analog for context with five phases — Generate, Test, Distribute, Observe, Adapt. The framing is explicitly borrowed from his 2009 DevOps work ("what if ops looked more like dev?" → "what if context is the code?"). The novelty isn't any single phase — it's insisting that all five exist as an integrated lifecycle for context, not just for code.

### Code-folding-back-into-context (skills replacing branching code)
A specific pattern where logic that would have been written as a branching code helper gets replaced by a skill that delegates the branching to the agent at runtime. Debois's example: a multi-ecosystem onboarding flow ("figure out the package manager, then the ecosystem, then run these steps with the user") solves more cases as a skill than the team could ever code, because the agent handles the combinatorial explosion. Skills here are *executable context* — the inverse of the usual "code calls LLM" direction.

### LLM-as-judge (and the judge-as-agent variant)
Standard LLM-as-judge: ask an LLM whether the generated artifact meets a criterion (e.g., "does this endpoint start with `/awesome/`?"). Debois's extension: give the judge tools and a sandbox so it becomes an agent that can `curl` the running endpoint — effectively turning eval from static check to end-to-end test. The judge stops grading the file and starts grading the running system. Note: Debois acknowledges regex would work for the simple example; the point is that the same harness scales to criteria you can't regex.

### Error budgets for non-deterministic evals
Because evals are non-deterministic, "did it pass?" is the wrong question. Run each eval N times (he uses 5), track the success rate, and assign each eval an error budget proportional to how much you care about it. Critical evals get tight budgets; nice-to-haves can fail more often. Diverges from common eval framings that lean on aggregate metrics — Debois's framing is per-eval SLOs.

### Context filter (WAF analogy for prompt injection)
A pre-agent filter that scans incoming context for prompt-injection patterns *before* it reaches the LLM. Debois's load-bearing argument: sandboxes don't help here, because coding agents auto-load `agent.md` / `skill.md` on download — by the time the sandbox boundary is enforced, the malicious instructions are already in the prompt. The fix has to live upstream of the agent, not around it. He frames this as the AI equivalent of a Web Application Firewall.

### AI SBOM
A software-bill-of-materials for context packages: who built this skill, with which model, from what sources, with what dependencies. Direct port of supply-chain-security practice from package management. Pairs with Snyk-style scanners that look for credential leakage and third-party exposure inside skill bundles.

## Key Takeaways

1. **Treat your `agent.md` / skill files as code that ships through a CDLC.** A two-line edit to `agent.md` has unknown blast radius unless you have evals.
   **How to apply:** Pick your most-edited instruction file and add even one LLM-as-judge eval that runs against a fixed prompt. Commit the eval next to the context.

2. **Build evals in tiers — start with the linter, end with the agent-judge.** Linter (schema/length validation) → "Grammarly for context" (LLM critiques clarity) → LLM-as-judge against company rules → judge-as-agent that runs the generated code.
   **How to apply:** For each piece of context you maintain, identify which tier you're at today; add the next tier up. Don't skip tiers — each catches different failure modes.

3. **Use error budgets, not pass/fail, for context evals.** Run each eval 5x, count successes, allocate budgets per importance.
   **How to apply:** In your CI, fail the build only if a critical eval drops below its budget (e.g., 4/5). Allow nice-to-have evals to be flaky without blocking merges.

4. **When code starts branching on environment, fold it into a skill.** If you're writing helpers that detect "is this Python or Node, npm or pnpm" and dispatching, the skill lets the agent do that branching at runtime against far more variation.
   **How to apply:** Audit your helpers for runtime-variant branching. Replace one with a skill description that delegates the decision tree to the agent. Evaluate against your existing test cases.

5. **Run a private skill registry, not the public marketplace.** Debois's blunt take: 99.9% of public skills are crap. Public registries are good for learning patterns; private registries are where production-quality skills live.
   **How to apply:** Stand up a team-internal registry (even a Git repo with a manifest is enough to start). Treat each skill like an npm package: versioned, scanned, SBOM'd, eval'd before publish.

6. **Treat agent logs and PR review comments as context-eval signal.** Every "I'm missing this piece" log line and every "this isn't quite right" PR comment is a missing-context bug, not just a one-off issue.
   **How to apply:** Aggregate agent logs across your team, surface recurring "missing context" patterns, and roll the fix into shared context — turning one developer's friction into everyone's improvement.

7. **Add a context filter upstream of your agent.** Sandboxing the agent's execution doesn't protect against prompt injection in `skill.md` files because skills auto-load.
   **How to apply:** Before any third-party context (downloaded skill, MCP-fetched doc, ticket body) reaches the agent, run it through a pattern/injection scanner. Treat it like a WAF in front of an HTTP service.

8. **Budget for the eval tax.** The time you save by writing context instead of code gets spent on writing the evals that make the context trustworthy. This is the meta-skill.
   **How to apply:** When estimating a context-engineering task, double the estimate to account for eval authoring. Build a personal/team process for "how we author the right evals for this kind of context" — that process is now your business-critical asset.

## Argument Structures

### Why "context is the new code"
- **Premise 1:** Prompts and instructions are now generated, reused, and committed (`agent.md`, skills) — they have all the surface area of source code.
- **Premise 2:** Code is actively folding back into context — large branching helpers become single skills because the agent handles the variation better than the code could.
- **Premise 3:** If something has the surface area of code and replaces code, it inherits code's needs: testing, distribution, observability, security.
- **Conclusion:** Context deserves its own SDLC — the CDLC — and ad-hoc "edit the markdown and hope" is the equivalent of pre-DevOps cowboy ops.

### Why sandboxes don't solve prompt-injection from skills
- **Premise 1:** Coding agents auto-load `agent.md` / `skill.md` files into the prompt on download, before any user code runs.
- **Premise 2:** A sandbox boundary kicks in when the agent *executes* something — not when it *reads context* into the model.
- **Premise 3:** Therefore, by the time the sandbox is enforcing anything, the malicious instructions are already inside the LLM's context window and may have already steered the agent's plan.
- **Conclusion:** The defense has to be upstream of the LLM — a filter that scans context before it's loaded — not downstream around execution. This is why Debois reaches for the WAF analogy: filter at the perimeter, not at the tool call.

### The hidden-cost argument (from Q&A)
- **Premise 1:** Writing context replaces writing code, which feels like time saved.
- **Premise 2:** But context only works rigorously if you have evals — and each context prompt now begets multiple eval prompts.
- **Premise 3:** Authoring good evals for your business case is itself a process problem, not a single skill — the more advanced practitioners build their own meta-process for "how we generate the right evals."
- **Conclusion:** The new core competency isn't writing context, it's the *process for building the right evals*. The savings shift; they don't disappear. Practitioners who skip this step ship unverified context and pay the cost in production.

## Notable Commands / Code Snippets

The talk is conceptual and the slides Debois shows are illustrative rather than copy-pasteable. Two patterns are worth capturing as pseudo-snippets:

**The `/awesome/` prefix rule as an LLM-as-judge eval.** Given a company-specific instruction in `agent.md` that "every API endpoint must use the `/awesome/` prefix":

```
# Eval prompt (run against generated code):
"Given the following generated code, does every API endpoint
 path start with `/awesome/`? Answer YES or NO with the
 endpoint paths you found."
```

The point isn't the regex — it's that the eval is parameterized by a company-specific rule that no general-purpose model would enforce on its own.

**Skill-description schema validation as a linter.** Each skill must have a `description` field within a length budget; an automated check rejects the skill at PR time if the description is missing or out of bounds. Treat this as the `eslint` of skill packages — cheapest tier of the eval pyramid, runs in milliseconds, catches the dumb stuff.

## User Notes

- The CDLC framework (Generate → Test → Distribute → Observe → Adapt) is the mental model worth internalizing — five phases, infinity loop, ported from DevOps SDLC.
- Code folding back into context as skills: large multi-ecosystem helpers become a single skill that delegates branching to the agent at runtime. Skills solve cases pure code couldn't.
- Four levels of context evals: linter (schema/length) → "Grammarly for context" (LLM critique) → LLM-as-judge against company rules → judge-as-agent with tools running end-to-end in a sandbox.
- Error budgets for non-deterministic eval suites: run N times, count successes, budget per test importance.
- Distribution as a package-management problem: skills as the bundle format (context + scripts + docs + MCP), registries (private > public), version pinning to library versions, dependency hell, Snyk-for-context, AI SBOM.
- Observe via agent logs and PR review feedback: agent "missing context" log lines and PR comments are bugs against your context, not one-offs. Aggregate org-wide and roll fixes into shared context.
- Production-failure-to-eval-test tooling: instrument generated code, capture prod failures (input/output diffs), prompt the agent to author a test case so the same failure can't recur.
- Context filter as WAF for prompt injection: sandboxes can't catch it because `agent.md` / `skill.md` auto-load. Solution: filter context patterns upstream of the agent.
- The hidden cost (from Q&A): writing context saves coding time, but you spend it on writing the right evals. The "process for building the right evals" becomes the new business-critical skill — context engineering is meta-engineering.

## Related Topics
context-engineering, agents, evaluation, workflow, skills, harness-engineering, best-practices, context-evals, skills-as-packages, prompt-injection, llm-as-judge, ai-sbom, error-budgets, cdlc
