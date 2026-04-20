---
title: "Meta Harness"
type: "concept"
pillar: "understanding"
tags: [meta-harness, harness-engineering, dspy, optimization, self-improving-ai, agents, claude-code]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
last_updated: "2026-04-20"
---

# Meta Harness

A Stanford framework (March 2026) from **Omar Khattab** — creator of DSPy — that treats the harness itself as the optimization target. Where DSPy tunes prompts *inside* a fixed pipeline, Meta Harness rewrites the pipeline itself: structure, retrieval, memory, orchestration topology.

Not to be confused with Anthropic's **"meta-harness"** product framing for Claude Managed Agents — same word, very different thing. See [Claude Managed Agents](../tools/claude-managed-agents.md) for that usage.

## The Loop

1. **An agentic proposer** (Claude Code with Opus 4.6) reads **raw execution traces** from prior runs.
2. It **diagnoses** what broke — not from summaries, from the raw details.
3. It **writes a complete new harness** as the next candidate.
4. The new harness is evaluated on the task distribution.
5. Keep or discard, repeat.

Scale per iteration: ~10M tokens, ~82 files read per round, **400x more feedback** than any prior optimization method.

## Why Raw Traces Are Irreplaceable

A clean ablation from the paper:

| Trace input | Meta Harness accuracy |
|-------------|----------------------|
| Raw execution traces | **50.0%** |
| Trace summaries | 34.9% |
| No traces | 34.6% |

Summaries are **not** a substitute for raw detail. Practical consequence: if you intend to iterate on an agent, persist full execution traces — not just run-level summaries.

## Headline Results

- **Harness optimized on one model transfers to five others and improves all of them.** The harness is the reusable asset; weights are a swap-in component.
- **Haiku + Meta Harness outranked Opus + Meta Harness.** Smaller model + optimized harness beats larger model.
- **76.4% on terminal-bench 2** — the only auto-optimized system in the field at that score.

## Relationship to DSPy

DSPy: optimize the prompts used by a fixed pipeline.
Meta Harness: rewrite the pipeline — modules, orchestration topology, retrieval structure, memory — using an agentic proposer.

Same author (Omar Khattab). Same philosophy (treat the language-model layer as something you optimize, not something you ship). Different unit of optimization.

## Relationship to Auto Research

Both are closed self-improving loops that propose → test → keep-or-discard without human feedback between iterations. See [Auto Research](auto-research.md) for Karpathy's framework adapted to skill optimization. Key contrasts:

| Axis | Auto Research | Meta Harness |
|------|---------------|--------------|
| Unit of optimization | A skill (prompt + boolean criteria) | The full pipeline/harness |
| Evaluation | Boolean criteria (script or LLM judge) | Benchmark scores (SWE, terminal-bench, OS World) |
| Typical run | 5–10 iterations | Hundreds of iterations, 10M tokens each |
| Who runs it | Individual developer on a skill | Research lab on an agent |

## Implications

- **Before paying for a bigger model, optimize the harness around a cheaper one.** Meta Harness + Haiku beat Meta Harness + Opus.
- **Treat the harness as long-lived IP.** If it transfers across five models, it's an asset you re-run against future model releases.
- **Persist raw traces.** They are the training data for whatever optimizer you eventually run on your system.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the discipline Meta Harness operates on
- [Natural Language Harness](natural-language-harness.md) — a clean target representation for the optimizer
- [Omar Khattab](../people/omar-khattab.md) — the author, DSPy creator
- [Auto Research](auto-research.md) — sibling self-improving loop at a different unit of optimization
- [Claude Code](../tools/claude-code.md) — used as the agentic proposer in the Meta Harness loop
