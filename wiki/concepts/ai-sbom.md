---
title: "AI SBOM (Software Bill of Materials for Context)"
type: "concept"
pillar: "building"
tags: [security, supply-chain, sbom, agents, skills, context-engineering, provenance]
sources:
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
last_updated: "2026-05-05"
---

# AI SBOM (Software Bill of Materials for Context)

A **bill of materials for context packages** — skills, `agent.md` bundles, MCP-server payloads — answering the questions traditional package SBOMs answer for compiled artifacts: who built this, with what model, from what sources, with what dependencies. Patrick Debois's framing in *Context Is the New Code* (Tessl, AI Engineer 2026-05-03): a direct port of supply-chain security practice from package management to context distribution. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

## Why It's Necessary

Once context is distributed as packages (see [Agent Skills § Skills as a Package Format](agent-skills.md#skills-as-a-package-format)), it inherits every supply-chain problem npm, PyPI, and Maven Central have spent two decades building tooling for:

- Typosquatting (a `claude-code-vibe-coder` skill that looks legitimate)
- Dependency confusion (private skill names colliding with public registry entries)
- Compromised maintainers (a previously-trusted skill author pushes a malicious update)
- Transitive dependencies (skill A includes skill B which includes skill C — and C is compromised)
- Credential exfiltration (skill scripts that quietly read `~/.aws/credentials`)
- Provenance gaps (no way to tell whether the skill you installed is what the maintainer published)

A traditional SBOM (CycloneDX, SPDX) lists every component in a software artifact: package name, version, license, hash, transitive deps. An AI SBOM does the same for a context package, plus a few AI-specific fields.

## What Goes In an AI SBOM

Beyond the traditional fields (name, version, license, hash, dependencies), Debois calls out AI-specific entries:

- **Authoring model.** Which model generated this skill / `agent.md`? Did a human review the output? When?
- **Source corpus.** Which docs / `llms.txt` / examples were used as input to the generator? Important for license and contamination tracking.
- **Tool dependencies.** What MCP servers, CLIs, or environment assumptions does the skill require? (A skill that silently expects `gh` installed is a deployment failure waiting to happen.)
- **Eval lineage.** Which evals (linter, LLM-judge, judge-as-agent) were run against this version, with what error budgets, and what scores did it pass at?
- **Permissions footprint.** What tools / `allowed-tools` does the skill request? What does it actually use? (Differential matters — over-broad asks are a smell.)
- **Last scan.** When was the bundle last passed through a [Context Filter](context-filter.md) and an SBOM-vulnerability scanner? What was the verdict?

## Pairing With Snyk-for-Context

Where the SBOM lists *what is in the package*, a Snyk-style scanner asks *whether anything in there is dangerous*: known-bad patterns, leaked credentials, third-party calls to suspicious endpoints inside skill scripts, references to known-malicious skills. SBOM is the inventory; the scanner is the audit. Both are needed; neither replaces the other.

In practice this is one tool that consumes the SBOM, looks up each entry against vulnerability feeds, and surfaces issues — exactly the pattern `npm audit` and `pip-audit` use today.

## Where It Slots Into the CDLC

In Debois's [Context Development Life Cycle](context-development-life-cycle.md), the AI SBOM lives in the **Distribute** phase:

- Generated automatically when a skill is built (CI step alongside the linter and eval suites).
- Shipped *with* the skill, not on a separate channel — consumers can verify provenance offline.
- Re-checked at install time and on update; the install fails if the SBOM doesn't match the bundle hash.
- Re-scanned periodically post-install — like `npm audit`, supply-chain status changes after install.

## Why This Won't Be Solved By Goodwill

The pattern from package ecosystems is unambiguous: voluntary maintainer hygiene does not scale, and registries that don't enforce provenance get exploited. The same will hold for skill registries. Debois's blunt take in the talk: 99.9% of public skills are crap *today* — and that's before adversarial pressure scales up. Private registries with mandatory SBOMs and content scanning are the production posture; public marketplaces are for learning patterns. See [Agent Skills § Skills as a Package Format](agent-skills.md#skills-as-a-package-format).

## Anti-Patterns

- **Treating an `npm install`-style skill installer as safe** because the source is "Anthropic-hosted" or "official-looking." Provenance must be cryptographically verifiable, not visually plausible.
- **Skipping SBOM generation for "internal-only" skills.** Internal-only is exactly where credential-leakage scanners pay off, because internal skills tend to embed real environment assumptions.
- **Treating the SBOM as documentation rather than a CI gate.** If nothing actually fails when the SBOM is missing or malformed, it's theater.

## See Also

- [Context Development Life Cycle](context-development-life-cycle.md) — Distribute phase where SBOMs live
- [Agent Skills § Skills as a Package Format](agent-skills.md#skills-as-a-package-format) — the package model that makes SBOMs necessary
- [Context Filter](context-filter.md) — content-inspection counterpart to provenance
- [Harness Engineering § Shared Harness Artifacts Are an Attack Surface](harness-engineering.md#shared-harness-artifacts-are-an-attack-surface) — the broader threat model
- [Patrick Debois](../people/patrick-debois.md) — the framing's origin
