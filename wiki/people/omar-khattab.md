---
title: "Omar Khattab"
type: "person"
pillar: "ecosystem"
tags: [dspy, meta-harness, harness-engineering, optimization, stanford, researcher]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
last_updated: "2026-04-19"
---

# Omar Khattab

Stanford researcher. Creator of **DSPy** and lead author on the **Meta Harness** paper (March 2026). Consistent through-line in his work: the language-model layer is something you *optimize*, not something you ship as-is.

## Key Contributions (to this wiki's domain)

- **DSPy** — optimize the prompts used by a fixed pipeline, rather than hand-tuning them.
- **Meta Harness** (March 2026) — take the next step: optimize the pipeline itself. An agentic proposer (Claude Code with Opus 4.6) reads raw execution traces, diagnoses failures, and writes a complete new harness. 10M tokens per iteration, 400x more feedback than prior methods.

## Why It Matters

Khattab's two artifacts bracket the shift from prompt engineering to harness engineering:

| Era | DSPy | Meta Harness |
|-----|------|--------------|
| Unit | Prompt within a fixed pipeline | The pipeline (harness) itself |
| Optimizer | Programmatic | Agentic proposer (LLM reads traces and rewrites) |
| Feedback scale | Small | 400x larger |

See [Meta Harness](../concepts/meta-harness.md) for the full concept page.

## Headline Findings from Meta Harness

- Harness optimized on one model **transfers to five others** and improves all of them.
- **Haiku + Meta Harness outranked Opus + Meta Harness.** Smaller model + optimized harness beats larger model.
- **Raw traces are irreplaceable** — swapping them for summaries drops accuracy from 50% to 34.9%.
- **76.4% on terminal-bench 2** — the only auto-optimized system in the field at that score.

## Related Pages

- [Meta Harness](../concepts/meta-harness.md) — the framework
- [Harness Engineering](../concepts/harness-engineering.md) — the discipline he's helping formalize
- [Natural Language Harness](../concepts/natural-language-harness.md) — parallel March 2026 harness paper
