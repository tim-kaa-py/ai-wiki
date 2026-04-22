---
title: "Harness Engineering: Leveraging Codex in an Agent-First World"
source_type: "article"
channel: "OpenAI"
date: "2026-02-11"
url: "https://openai.com/index/harness-engineering/"
pillar: "building"
tags: [harness-engineering, agents, agentic-coding-workflow, workflow, best-practices, code-review, monorepo, strategy]
ingested: "2026-04-22"
source_file: "sources/articles/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
---

# Harness Engineering: Leveraging Codex in an Agent-First World — Summary

**Source:** OpenAI (Ryan Lopopolo) | 2026-02-11 | [Link](https://openai.com/index/harness-engineering/) | article

## Scope Note

This is the original written companion to Ryan Lopopolo's April 2026 AI Engineer talk, already ingested at [summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md](2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md). The talk summary already covers the core harness techniques (structural tests, error messages as prompts, reviewer agents, garbage collection ritual, outside-in harness, monorepo layout, plan-mode skepticism, LLM-as-fuzzy-compiler, token-budget split). **This summary captures only what the article adds or frames differently:** the empty-repo founding conditions, the concrete `docs/` system-of-record layout, AGENTS.md-as-table-of-contents, the Types → Config → Repo → Service → Runtime → UI architecture diagram, "golden principles" as a named concept, the per-worktree bootable app + CDP + ephemeral LogQL/PromQL observability stack, the doc-gardening agent, the end-to-end autonomy checklist, the agent-legibility principle ("if the agent can't see it, it doesn't exist"), and the changed merge philosophy under high throughput.

## TL;DR
The article is the written origin of the harness-engineering framing: an OpenAI team wrote zero lines of code by hand over five months, shipping ~1M LOC and ~1,500 PRs with a team that grew from three to seven engineers. The distinctive artifacts vs. the talk are the concrete `docs/` directory layout treated as a system of record, AGENTS.md demoted to a ~100-line table of contents, the Types → Config → Repo → Service → Runtime → UI architectural layering with Providers as the only cross-cutting seam, "golden principles" as the named mechanism for continuous garbage collection, and the explicit agent-legibility doctrine: anything not accessible to the agent in-context effectively does not exist.

## Key Concepts

### Agent legibility (article's core doctrine)
"From the agent's point of view, anything it can't access in-context while running effectively doesn't exist." Knowledge in Google Docs, Slack threads, or people's heads is invisible to the system. Only repository-local, versioned artifacts — code, markdown, schemas, executable plans — count. The article uses this to justify aggressively pulling context into the repo (even Slack-level architectural alignment discussions) and to justify reimplementing subsets of dependencies when upstream behavior is opaque. The talk uses "outside-in harness" and "make review comments durable" as applications of this doctrine; the article states the doctrine directly.

### AGENTS.md as table of contents (not encyclopedia)
The article documents a specific failure mode the team lived through: "one big AGENTS.md" failed in four predictable ways — (1) context is a scarce resource and a giant file crowds out the task, (2) when everything is important, nothing is, (3) monolithic manuals rot instantly into a graveyard of stale rules, (4) they resist mechanical verification (coverage, freshness, ownership, cross-links). The fix: AGENTS.md becomes a ~100-line map that points to a structured `docs/` tree. This is progressive disclosure applied at the repo-knowledge level.

### docs/ as system of record
A concrete, publicly-shared layout:

```
AGENTS.md
ARCHITECTURE.md
docs/
├── design-docs/
│   ├── index.md
│   ├── core-beliefs.md
│   └── ...
├── exec-plans/
│   ├── active/
│   ├── completed/
│   └── tech-debt-tracker.md
├── generated/
│   └── db-schema.md
├── product-specs/
│   ├── index.md
│   ├── new-user-onboarding.md
│   └── ...
├── references/
│   ├── design-system-reference-llms.txt
│   ├── nixpacks-llms.txt
│   ├── uv-llms.txt
│   └── ...
├── DESIGN.md
├── FRONTEND.md
├── PLANS.md
├── PRODUCT_SENSE.md
├── QUALITY_SCORE.md
├── RELIABILITY.md
└── SECURITY.md
```

Characteristics: design docs are indexed with verification status and "core beliefs"; architecture docs map domains and package layers; a `QUALITY_SCORE.md` grades each domain/layer and tracks gaps over time; execution plans are first-class artifacts with active/completed/tech-debt subfolders; `references/` holds `*-llms.txt` reference material for third-party libraries. Linters + CI jobs + a recurring "doc-gardening" agent enforce freshness, cross-linking, and structural correctness.

### Architectural layer diagram
The article states the rule explicitly: within each business domain (e.g., "App Settings"), code may only depend forward through a fixed sequence:

```
Types → Config → Repo → Service → Runtime → UI
```

Cross-cutting concerns (auth, connectors, telemetry, feature flags) enter through a single explicit interface called **Providers**. Every other edge is disallowed and enforced mechanically via custom (Codex-generated) linters and structural tests. Ryan's framing: this is the kind of architecture you'd usually postpone until you have hundreds of engineers — with coding agents, it's an early prerequisite, because the constraints are what allow speed without decay.

### Golden principles (named concept)
The article's name for the opinionated, mechanical rules codified into the repo to keep the codebase legible and consistent across agent runs. Examples given:

1. **Prefer shared utility packages over hand-rolled helpers** — keep invariants centralized.
2. **No YOLO data probing** — validate boundaries or rely on typed SDKs so the agent can't accidentally build on guessed shapes (parse-don't-validate as a principle, not a style).

Background Codex tasks scan for deviations from golden principles, update quality grades, and open targeted refactoring PRs — most reviewable in under a minute and automerged. This is the mechanism that replaced the team's original "Fridays cleaning up AI slop" manual ritual (the talk's "garbage collection day") with a continuous, agent-driven process.

### Taste invariants
A narrower sibling of golden principles: static checks for structured logging, naming conventions for schemas and types, file size limits, and platform-specific reliability requirements. Because the lints are custom, error messages embed remediation instructions directly targeted at the agent context. "In a human-paced workflow, these rules can feel pedantic. With agents, they become force multipliers: once encoded, they act everywhere simultaneously."

### Per-worktree runtime with CDP + ephemeral observability
Concrete details the talk summary doesn't have:

- App is bootable per git worktree so Codex can launch and drive one instance per change.
- Chrome DevTools Protocol wired into the agent runtime; skills for DOM snapshots, screenshots, navigation.
- Logs/metrics/traces exposed via a local observability stack that's **ephemeral per worktree** — torn down with the task.
- Agents query logs with **LogQL** and metrics with **PromQL**.
- Enables prompts like "ensure service startup completes in under 800ms" or "no span in these four critical user journeys exceeds two seconds."
- Single Codex runs regularly work a task for 6+ hours (often overnight).

### Doc-gardening agent
A recurring Codex task dedicated to scanning the knowledge base for docs that no longer reflect real code behavior and opening fix-up PRs. Pairs with the CI linters that assert cross-links, coverage, and structural correctness of the `docs/` tree.

### Reimplementation over opaque dependencies
Ryan's example: instead of pulling in a generic `p-limit`-style package, the team had Codex implement its own `map-with-concurrency` helper — tightly integrated with OpenTelemetry instrumentation, 100% test coverage, behaves exactly the way the runtime expects. The principle: when a dep's behavior is opaque to the agent, it's sometimes cheaper to reimplement the subset the repo actually uses than to work around it. "Boring" tech tends to win because of composability, API stability, and training-set representation.

## Key Takeaways

1. **Demote AGENTS.md to a ~100-line table of contents; put the real knowledge in a structured `docs/` tree.**
   **How to apply:** Audit your current AGENTS.md / CLAUDE.md. If it's over ~100 lines, split it: keep the map in the root file, move domain knowledge to `docs/` subfolders indexed by topic. Use the OpenAI tree (`design-docs/`, `exec-plans/`, `product-specs/`, `references/`, plus top-level `DESIGN.md`, `FRONTEND.md`, `RELIABILITY.md`, `SECURITY.md`, `QUALITY_SCORE.md`) as a starter template.

2. **Make `docs/` a system of record with verification status and core beliefs.**
   **How to apply:** Add a `docs/design-docs/index.md` that lists each design doc with a verification flag (verified / stale / provisional). Add `docs/design-docs/core-beliefs.md` capturing the agent operating principles your team keeps restating. Add `docs/QUALITY_SCORE.md` grading each domain/layer.

3. **Name your architectural layers and enforce forward-only dependency direction mechanically.**
   **How to apply:** Pick a layer sequence that fits your stack (Ryan's is Types → Config → Repo → Service → Runtime → UI). Gate all cross-cutting access (auth, telemetry, feature flags) through a single `Providers` seam. Write a structural test that asserts no import crosses a layer backward. Generate the linter with Codex itself — the point is the constraint, not the implementation effort.

4. **Codify "golden principles" and run a background agent that enforces them continuously.**
   **How to apply:** Write down 5-10 opinionated rules — "prefer shared utility packages," "no YOLO data probing," "parse at the boundary." Add a scheduled Codex task that scans for deviations, updates quality grades, and opens small refactoring PRs. Most should be reviewable in under a minute and auto-mergeable.

5. **Build the app to be bootable per git worktree with an ephemeral observability stack.**
   **How to apply:** Make `make dev` (or equivalent) spin up the full app + logs + metrics inside the worktree's dir, torn down when the worktree is removed. Wire LogQL/PromQL queries into agent skills so the agent can write prompts like "no span exceeds 2s" and verify them directly.

6. **Wire a doc-gardening agent that opens fix-up PRs when docs drift from code.**
   **How to apply:** Schedule a recurring Codex run pointed at `docs/`. Its prompt: read each doc, cross-reference against the current code, flag or fix discrepancies, open PRs. Pair with CI linters that block merges when doc cross-links or freshness metadata breaks.

7. **Reimplement opaque dependencies rather than fighting them.**
   **How to apply:** When a third-party package produces behavior the agent keeps misusing, have Codex reimplement the subset you need with full test coverage and integration with your observability. The cost is one focused session; the benefit is permanent legibility.

8. **Adopt agent legibility as a first-class design principle.**
   **How to apply:** For every piece of tribal knowledge your team relies on, ask "is this in the repo?" If it isn't, write it down and commit it. Treat the repo as the only real context window.

9. **Relax merge gates and PR lifetime in high-throughput agent workflows.**
   **How to apply:** Reduce blocking CI checks to the ones with near-zero flake. Handle flakes with retries, not blocks. Keep PRs short-lived. This is irresponsible at low throughput and right at high throughput — pick based on your throughput, not on inherited norms.

## Argument Structures

### Why AGENTS.md-as-encyclopedia fails
- **Premise 1 (context scarcity):** Every token in AGENTS.md displaces a token that could be the task, the code, or a relevant doc.
- **Premise 2 (prioritization collapse):** When everything is labeled important, the agent has no way to prioritize and pattern-matches locally instead of navigating intentionally.
- **Premise 3 (rot dynamics):** Monolithic documents accumulate stale rules; agents can't tell what's still true; humans stop maintaining what they can't selectively update.
- **Premise 4 (unverifiability):** A single blob doesn't admit coverage / freshness / ownership / cross-link checks, so drift is inevitable.
- **Conclusion:** Treat AGENTS.md as a table of contents (~100 lines). Put the knowledge in a structured `docs/` tree that *does* admit mechanical checks and selective updates.

### Why heavyweight architecture is an *early* prerequisite for agent teams
- **Observation:** A greenfield single-package app produced by an agent is messy: no package privacy, no enforceable domain boundaries, optimization for local coherence.
- **Diagnosis:** The agent has no tacit domain knowledge — it only sees what's in the filesystem. Without encoded boundaries, it can't maintain them.
- **Implication:** The architectural scaffolding a human team would develop over years of onboarding new hires has to exist on day one for an agent team.
- **Counter-intuitive conclusion:** A two-person team with agents needs the architecture of a hundreds-of-engineers org. The constraints are what allow speed without decay or architectural drift — and they're not optional, they're early prerequisites.

### Why "golden principles" beat Friday cleanup
- **Initial approach:** The team spent Fridays (20% of capacity) cleaning up AI slop manually.
- **Problem:** Doesn't scale as throughput grows.
- **Insight:** The feedback was repetitive — the same classes of drift recurred. Repetitive feedback is mechanizable.
- **Remedy:** Codify the opinionated rules as "golden principles" and have a background agent enforce them continuously via small, automergeable PRs.
- **Economic framing:** Technical debt is a high-interest loan; continuous small payments dominate lump-sum repayment. Capturing human taste once and enforcing it continuously catches bad patterns in days, not weeks.

## Notable Commands / Code Snippets

### The docs/ tree (template)

```
AGENTS.md                     # ~100 lines, table of contents
ARCHITECTURE.md               # domain + package-layer map
docs/
├── design-docs/              # design decisions, verification status
│   ├── index.md
│   └── core-beliefs.md       # agent operating principles
├── exec-plans/               # first-class execution plans
│   ├── active/
│   ├── completed/
│   └── tech-debt-tracker.md
├── generated/                # auto-generated reference (e.g., db-schema)
├── product-specs/            # product-level specifications
├── references/               # *-llms.txt snapshots of third-party docs
├── DESIGN.md
├── FRONTEND.md
├── PLANS.md
├── PRODUCT_SENSE.md
├── QUALITY_SCORE.md          # grades per domain/layer, gap tracking
├── RELIABILITY.md
└── SECURITY.md
```

### The architectural layer rule

Forward-only edges within each business domain:

```
Types → Config → Repo → Service → Runtime → UI
             │
             └── Providers (auth, connectors, telemetry, feature flags)
                 — the single cross-cutting seam
```

Enforced by Codex-generated linters + structural tests. Every other edge is disallowed.

### End-to-end autonomy checklist

A single prompt now drives Codex through:

1. Validate current state of the codebase
2. Reproduce the reported bug
3. Record a video showing the failure
4. Implement a fix
5. Validate the fix by running the application
6. Record a second video showing the solution
7. Open a PR
8. Respond to agent and human feedback
9. Detect and resolve build failures
10. Escalate to a human only when judgment is required
11. Merge the change

Ryan is explicit: "highly dependent on the specific structure and tooling of this repository and should not be assumed to generalize without a similar investment."

## Related Topics
harness-engineering, agents, agentic-coding-workflow, docs-as-system-of-record, agent-legibility, monorepo, code-review, best-practices
