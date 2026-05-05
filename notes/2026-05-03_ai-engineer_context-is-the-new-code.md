# Ingest Notes

**Source:** [Context Is the New Code – Patrick Debois, Tessl](https://m.youtube.com/watch?v=bSG9wUYaHWU)

## User Focus
<!-- No focus points provided. Auto-mode: agent selected notable points covering the talk's full framework. -->

## Confirmed Discoveries

- **[02:24-03:45] CDLC framing — "Context Development Life Cycle"** — Debois ports the DevOps SDLC infinity loop to context: Generate → Test → Distribute → Observe → Adapt. The whole talk is structured around walking these five phases. This is the mental model worth internalizing.
- **[01:35-02:35] Code is folding back into context as skills** — Debois replaces large code helpers (multi-ecosystem onboarding flow) with a single skill that says "first figure out the package manager, then the ecosystem, then run these steps with the user." Skills solve more cases than code could because they delegate branching to the agent at runtime.
- **[06:42-11:55] Four levels of context evals** — (1) linter (e.g., skill description length validation), (2) "Grammarly for context" — ask an LLM whether the context is clear and complete, (3) LLM-as-judge against company-specific rules (e.g., "every endpoint must start with /awesome/"), (4) end-to-end test where the judge has tools and can run the generated code in a sandbox.
- **[11:55-13:48] Error budgets for non-deterministic eval suites** — You can't run an eval once and trust the verdict. Run it five times, count successes, allocate error budgets per test based on importance. Critical evals get strict budgets; nice-to-haves can fail more often.
- **[13:52-17:42] Distribution as a package-management problem** — Skills become the package format (they bundle context, scripts, docs, MCP). This pulls in everything package managers need: registries (most public skills are "99.9% crap" so private/team registries are emerging), version pinning aligned to library versions, dependency conflicts ("dependency hell"), security scanning (Snyk for context), and AI SBOM (who built it, with which model).
- **[17:54-20:30] Observe via agent logs and PR feedback** — Agent logs (with emerging log standards from agent.md ecosystem) reveal "I'm missing this piece" moments. Surfacing those org-wide turns one developer's missing context into everyone's improvement. PR review comments are also context feedback — instead of arguing on the PR, fix the context so the next iteration improves automatically.
- **[19:48-20:30] Production failure → eval test case** — Tool that instruments code generated from context, captures production failures (input/output diffs), and prompts: "create a test case for this." Closes the loop from prod back to context evals.
- **[20:30-22:13] Context filter (WAF for prompt injection)** — Sandboxes don't protect you because the agent loads agent.md/skill.md by default — once downloaded, the malicious context is already in the prompt. Solution: a "context filter" upstream of the agent, analogous to a Web Application Firewall, scanning incoming context for patterns/injections before it ever reaches the LLM.
- **[25:57-26:43] The hidden cost: writing context saves coding time, but you spend it on evals** — Q&A insight. People underestimate that doing this rigorously means writing eval prompts for every context prompt — your "process for building the right evals" becomes the new business-critical skill. This reframes context engineering as a meta-engineering discipline.
