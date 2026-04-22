---
title: "Code-as-Text Structural Tests"
type: "concept"
pillar: "building"
tags: [harness-engineering, testing, structural-tests, monorepo, agentic-coding-workflow, best-practices]
sources:
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
last_updated: "2026-04-22"
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
