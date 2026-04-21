---
title: "Demystifying evals for AI agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-01-09"
url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
pillar: "understanding"
tags: [evaluation, agents, graders, pass-at-k, claude-code, swe-bench, best-practices]
ingested: "2026-04-20"
source_file: "sources/articles/2026-01-09_anthropic_demystifying-evals-for-ai-agents.md"
---

# Demystifying evals for AI agents — Summary

**Source:** Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, Jiri De Jonghe (Anthropic) | 2026-01-09 | [Link](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## TL;DR
Comprehensive evaluation guide. Three grader types (code, model, human), two key non-determinism metrics (pass@k, pass^k). Start with 20-50 real-failure tasks, not synthetic edge cases. Eval saturation at >80-90% pass rate kills signal.

## Key Concepts

### Vocabulary
- **Tasks** (input + success criteria), **Trials** (multiple attempts), **Graders** (scoring), **Transcripts** (interaction records), **Outcomes** (final env state), **Eval harness** (orchestration).

### Grader types
- **Code-based:** fast, objective, brittle to valid variations.
- **Model-based:** flexible, requires calibration, expensive.
- **Human:** gold standard, slow/costly.

### Non-determinism metrics
- **pass@k:** ≥1 success in k attempts (use when any solution OK).
- **pass^k:** all k succeed (use for customer-facing reliability).

### Agent-class evaluation patterns
- **Coding:** test execution = pass/fail signal (SWE-bench Verified).
- **Conversational:** task completion + turn count + tone; often need a 2nd LLM to simulate user.
- **Research:** combine graders for source-grounding, coverage, source authority.
- **Computer use:** verify visible AND backend state (order placed, not just confirmation page).

## Key Takeaways
1. **Start with 20-50 tasks from real failures.** Skip the synthetic edge-case parade.
   - **How to apply:** mine bug reports + manual checks → first eval set.
2. **Adopt eval-driven development:** define success criteria before building features.
3. **Read failed transcripts regularly** — graders themselves drift; without manual review you trust broken metrics.
4. **Watch for saturation.** When pass rate >80-90%, the eval no longer differentiates. Refresh.
5. **Balanced sets test both should and shouldn't behaviors.**

## Related Topics
evaluation, graders, pass-at-k, eval-driven-development, swe-bench, agent-evaluation
