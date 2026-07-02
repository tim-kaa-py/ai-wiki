---
title: "Code-as-Text Structural Tests"
type: "concept"
pillar: "building"
tags: [harness-engineering, testing, structural-tests, monorepo, agentic-coding-workflow, best-practices]
sources:
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-06-10_beyond-coding_engineers-solving-code-review-bottlenecks.md"
last_updated: "2026-07-02"
---

# Code-as-Text Structural Tests

A testing tier introduced by Ryan Lopopolo (OpenAI) at AI Engineer 2026: assertions that run against the **source code as text**, not against runtime behavior. They sit between lints (syntax) and unit tests (behavior) and exist primarily to keep an agent-authored codebase legible to future agent passes.

## Why Add a Third Tier

Lints catch syntax-level issues one file at a time. Unit tests catch behavioral regressions. Neither catches the thing that goes wrong when agents write most of the code: **the codebase stops being uniformly predictable**. Duplicate schemas proliferate. Helper functions fork. Files grow past what fits comfortably in a context window. Package boundaries rot.

Structural tests encode the invariants that make the repo agent-legible. They fail loudly when the agent drifts, and their failure messages become prompts that steer the next attempt back into the groove.

## What to Assert

Examples from Ryan's team, expressed as tests rather than rules:

- **File length cap.** No source file over 350 lines. Keeps individual files within a comfortable attention budget.
- **Single canonical schema per entity.** No duplicate zod schemas across the repo for the same domain object. Forces the agent to discover and reuse.
- **Single canonical async helper.** One way to do bounded concurrency, one way to build an observable side-effectful command. Uniformity makes next-token predictions transfer.
- **Package privacy.** Imports from `packages/X/src/internal/*` are forbidden outside `packages/X/*`. Package boundaries stop being convention and become enforceable invariants.
- **Dependency direction.** Stack layers (e.g., domain → data → transport) only import downward. No upward edges.
- **No orphaned exports.** Exports that nothing imports either get used or get deleted.

## The Pattern

```
# Pseudocode
test("files under 350 lines", () => {
  for (const file of sourceFiles()) {
    expect(lineCount(file)).toBeLessThanOrEqual(350);
  }
});

test("single canonical zod schema per entity", () => {
  expect(findDuplicateSchemas()).toEqual([]);
});

test("package privacy respected", () => {
  expect(crossPackageInternalImports()).toEqual([]);
});
```

Ryan ships these alongside custom ESLint rules. The distinction: ESLint is per-file and per-AST-node; structural tests are cross-file, cross-package, whole-repo invariants.

## Pair with Remediation-Oriented Error Messages

A structural test that fails with "files under 350 lines: src/foo/bar.ts has 412 lines" is a weak prompt. A strong prompt tells the agent what to do next:

> `src/foo/bar.ts` has 412 lines (cap is 350). Split it along the natural seam between the two responsibilities — extract the `X` concerns into `src/foo/bar-x.ts` and keep `src/foo/bar.ts` focused on `Y`. See `docs/file-decomposition.md`.

Every diagnostic is a prompt-injection surface. Treat error text as a prompt template, not a log line. See the error-messages-as-prompts discussion in [Harness Engineering](harness-engineering.md).

## Semantic Grep: Forbidding Code Shapes (Buetow)

Florian Buetow (Beyond Coding, June 2026) adds a lint-tier guardrail he calls **semantic grep** ("SEM grep"): regex/AST-level pattern matching over *code constructs* rather than text, used to forbid specific code shapes a human reviewer would otherwise flag every time. It sits below structural tests on the deterministic ladder — per-construct rather than whole-repo — but shares the same job: encode recurring PR feedback as an enforceable, project-custom rule.

His canonical examples:

- **No default parameter values in Python method signatures** — Buetow calls this one of the greatest sources of later debugging pain.
- **Never swallow errors** — every error must be propagated, not silently caught.

Each match fires an error phrased as a prompt: *"You must not write it in that way. It's against policy."* This is the same error-messages-as-prompts principle as above — the guardrail's output *is* the correction a human would otherwise type. Buetow's practical starting move: ask the AI "what anti-patterns exist in this codebase?", then write a SEM grep rule for each. *(Source: Florian Buetow, Beyond Coding 2026)*

## Deriving Architectural Tests From the AI's Own Diagram (Buetow)

The **dependency-direction** invariant above (UI must not import DB directly; route through the business-logic layer) has a discovery method Buetow makes explicit. AI-generated code tends to create "weird interconnections between modules that a human would never do," and you can't encode a rule against an edge you haven't noticed yet. His loop:

1. Have the AI **draw the system diagram** of the current codebase.
2. Spot the illegal edges — the cross-module dependencies a human never would have drawn.
3. Encode each as a **fast, dependency-only unit test** (analyzes the import graph, not behavior), e.g. `assert no_dependency(from="ui", to="db")`.

Buetow frames these architectural unit tests as a guardrail class *distinct from* behavioral tests: behavioral tests constrain *what* the code does (and let you rebuild it if deleted); architectural tests constrain *how modules may depend on each other*. Both are needed — behavioral tests alone leave the wiring free, and free wiring is exactly where the AI erodes the human's grip on the system (see [Cognitive Debt](cognitive-debt.md)). *(Source: Florian Buetow, Beyond Coding 2026)*

## Why Structural Tests Pay: Feedback-Loop Quality Is the AI Ceiling

Matt Pocock's compressed framing (AI Engineer 2026): **feedback-loop quality is the AI ceiling.** Without good feedback loops the agent codes blind; with them, capability rises. Structural tests are exactly the kind of check that pays into this:

- They run on every push.
- They produce remediation-oriented diagnostics that the agent can act on directly.
- They catch the class of drift (shallow modules, duplicate schemas, broken package boundaries) that erodes the dependency-graph navigability AI specifically depends on. See [Deep Modules](deep-modules.md) for why a sparse, deep dependency graph raises AI's effective coding ability.

This is the structural-test counterpart to "design interfaces, delegate implementations": the human writes the invariant once (in a structural test), the agent gets one-shot feedback every time it drifts. *(Source: Matt Pocock, AI Engineer 2026)*

## Where to Put Them

Ryan's team uses a `tests/structure/` directory that runs in CI alongside the normal test suite. They're regular tests from the test runner's perspective — they just happen to assert over source files instead of runtime state.

## How to Apply

1. Pick one invariant that's been bothering your team. File-length caps are the easiest starter — Ryan's 350 is a reasonable default.
2. Write the test. Let it fail. Fix the offending files or grandfather them behind a documented waiver list.
3. Wire a remediation-oriented error message that tells the agent *why* and *how to fix*.
4. Add the next invariant (duplicate schemas, package privacy) once the first is green.
5. On each "garbage collection" block (see [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)), add any recurring review comment pattern that can be expressed as a structural invariant.

## Relationship to Other Techniques

- **Lints** — syntactic, per-file, AST-level. Structural tests are whole-repo, property-level.
- **Unit tests** — behavioral. Structural tests are representational.
- **Reviewer agents** — see [Reviewer Agents](reviewer-agents.md). Structural tests catch things expressible as deterministic checks; reviewer agents catch things that need judgment.
- **Persona docs** — reviewer agents read these; structural tests encode the subset of a persona doc that can be automated.

Order of preference: if a concern can be a lint, make it a lint. Else a structural test. Else a reviewer agent. Else a persona doc reviewed by a human. Push every concern as far down that ladder as it will go.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the parent discipline
- [Reviewer Agents](reviewer-agents.md) — the judgment-based counterpart
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where structural tests fit in daily practice
- [Cognitive Debt](cognitive-debt.md) — why free module wiring erodes the human's grip; the failure architectural tests defend against
- [Florian Buetow](../people/florian-buetow.md) — semantic grep + diagram-derived architectural tests
