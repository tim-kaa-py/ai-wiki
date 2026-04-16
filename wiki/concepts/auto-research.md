---
title: "Auto Research"
type: "concept"
pillar: "building"
tags: [auto-research, self-improving-ai, optimization, evals, criteria-design, agents, claude-code]
sources:
  - "summaries/2026-04-07_ben-ai_karpathys-autoresearch-10x-claude.md"
last_updated: "2026-04-16"
---

# Auto Research

A self-improving optimization framework originated by Andrej Karpathy for ML research, adapted by Ben AI for general AI skill optimization. The core mechanism is a closed loop: define boolean criteria, establish a baseline, generate hypotheses, test with a sub-agent, evaluate (script or LLM judge), keep or discard the change, and repeat — all without human intervention between iterations.

## The Loop

```
Define criteria → Baseline score → Generate hypothesis → Test (sub-agent) → Evaluate → Keep/Discard → Repeat
```

The key differentiator from manual evals: full autonomy. No human feedback is required between iterations. The system runs hypotheses, tests, and evaluations in a closed loop — you can optimize overnight or over a week without touching it.

## The Three-Level Criteria Framework

The atomic unit of optimization is the **criterion** — a single boolean condition, strictly true or false. Ben AI proposes three levels for decomposing even subjective/creative tasks into testable criteria:

| Level | What it covers | Eval method | Example |
|-------|---------------|-------------|---------|
| **Level 1 — Hard rules** | Clear-cut, deterministic best practices | Script (cheap, reliable) | "Hook must be under 136 characters" |
| **Level 2 — Subjective patterns** | Personal style and writing patterns expressed as boolean checks | LLM judge (necessary for nuance) | "Bold claims must include qualifier words like 'I think' or 'I believe'" |
| **Level 3 — Real-world data** | Criteria derived from actual performance metrics | Scheduled loops against live data | Top vs. worst performing posts analyzed for patterns |

**Critical rule:** Always optimize in order. Level 1 first, then Level 2, then Level 3. Level 2 and 3 criteria are fragile if Level 1 isn't solid. Ben's LinkedIn skill went from 80% to 100% on Level 1 criteria alone before tackling harder patterns.

## Criteria Design Rules

A good criterion must be:
- **Boolean** — evaluatable as strictly true or false
- **Specific** — states the exact condition, not just the goal
- **Single-variable** — isolates one thing per criterion

"Hook must be under 136 characters" is good. "Make the hook short and punchy" is bad. If you need the word "and," split it into two criteria.

## Evaluation Modes

| Mode | When to use | Trade-off |
|------|------------|-----------|
| **Deterministic script** | Clear-cut conditions (character count, format check) | Fast, cheap, reliable |
| **LLM judge sub-agent** | Subjective criteria (style match, template adherence) | Necessary for nuance, but more expensive |

## Practical Constraints

- **Cap iterations at 5-10.** Performance degrades after 10-15 iterations — the optimization overfits or drifts. Token costs scale linearly.
- **Only optimize high-value, frequently-used skills.** Token costs are non-trivial. Prioritize skills that run daily or produce customer-facing output.
- **Use AI to discover criteria from your own data.** Feed Claude your top 10 and bottom 10 outputs with engagement metrics. Let it identify patterns and propose criteria.

## Scheduled Autonomous Optimization

The endgame vision: scheduled tasks running Auto Research loops on a weekly cadence against real-world performance data. Each week the system scrapes engagement metrics, evaluates the previous hypothesis, keeps or reverts the change, and generates the next hypothesis. Ben has set this up for LinkedIn posts (target: 250 avg likes), email open rates, and landing page CTR — though these haven't actually run yet at time of recording.

## Applications Beyond Content

- **CLAUDE.md optimization** — define criteria (e.g., "file routing accuracy to correct folders > 90%") and run the loop against test scenarios
- **Wiki quality** — criteria for summary completeness, cross-referencing accuracy, tag consistency
- **Any skill used in Claude Code** — the framework is general-purpose; if you can define boolean success criteria, you can optimize it

## The Decomposition Argument

Ben argues that even creative/subjective tasks are more testable than they appear:

1. Auto Research requires boolean criteria
2. Creative tasks (copywriting, tone of voice) feel inherently untestable
3. But most subjective qualities can be decomposed into discrete boolean checks — formatting rules are obvious, and even style/tone can be expressed as pattern-match conditions
4. **Conclusion:** The bottleneck is not the framework's rigidity but your ability to articulate what makes your output yours

## Related Pages

- [Andrej Karpathy](../people/andrej-karpathy.md) — originated the Auto Research framework for ML
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — workflow context for autonomous optimization
- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — Auto Research can optimize the wiki's own quality
