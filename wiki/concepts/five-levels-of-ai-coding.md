---
title: "Five Levels of AI Coding"
type: "concept"
pillar: "building"
tags: [ai-coding, agentic-engineering, dark-factory, workflow, software-engineering, j-curve, spec-quality, organizational-design]
sources:
  - "summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md"
last_updated: "2026-04-13"
---

# Five Levels of AI Coding

A maturity model for how developers and organizations use AI, created by Dan Shapiro and analyzed by Nate B Jones. Defined by the degree of human involvement in implementation, from autocomplete to fully autonomous "dark factory" software production.

## The Five Levels

| Level | Name | Human role | AI role |
|-------|------|------------|---------|
| 0 | Spicy Autocomplete | Writes code | Suggests next line (original Copilot) |
| 1 | Coding Intern | Reviews everything | Handles discrete, well-scoped tasks |
| 2 | Junior Developer | Reads all code | Handles multi-file changes, navigates codebases |
| 3 | Developer as Manager | Reviews at PR/feature level | Does full implementation |
| 4 | Developer as PM | Writes spec, checks test results | Code is a black box; outcomes matter |
| 5 | Dark Factory | Operates only at spec and evaluation boundaries | Specs in, working software out — zero human code involvement |

**The critical claim:** 90% of "AI-native" developers are at Level 2 and believe they are further along. The gap between frontier teams and everyone else is not a technology problem but a people, culture, and organizational design problem.

## The Dark Factory

A software production system that turns specifications into shipped software with zero human involvement in implementation or code review. Named by analogy to lights-out manufacturing — the "lights are off" in the implementation layer.

**StrongDM's three-person team** is the most documented example operating at Level 5:
- Three markdown specification files define the entire agent
- The agent (Attractor, open-source) reads specs, writes code, tests against external scenarios
- A digital twin universe simulates all external services (Okta, Jira, Slack, Google suite)
- Output example: CXDB — 16,000 lines Rust, 9,500 lines Go, 700 lines TypeScript, shipped to production
- Benchmark: $1,000/engineer/day in compute

## Scenarios vs. Tests (Holdout Sets for AI-Authored Code)

A novel software engineering pattern that only became necessary when AI became the code author. Traditional tests live inside the codebase where AI agents can read them, creating an incentive to optimize for test passage rather than correct software — analogous to "teaching to the test."

**The fix:** Behavioral specifications (scenarios) stored externally, invisible to the agent during development, functioning as a holdout set. This borrows the ML concept of preventing overfitting and applies it to software quality assurance.

**How to apply:** Separate your behavioral test specifications from the codebase the agent can access. The agent should never see the evaluation criteria during development.

## The J-Curve of AI Adoption

When AI coding tools are bolted onto existing workflows, productivity dips before it improves. The dip occurs because the tool changes the workflow but the workflow has not been redesigned around the tool — "a new engine on old transmission."

Most organizations are sitting at the bottom of this curve and misinterpreting the dip as evidence that AI tools don't work, rather than evidence that their workflows haven't adapted.

**The METR study** is the clearest evidence: experienced developers using AI completed tasks 19% slower (randomized control trial), yet believed AI made them 24% faster. Wrong about both direction and magnitude. This is the symptom of an industry at the bottom of a J-curve it hasn't yet recognized.

## The Agentic Loop (Self-Referential)

AI systems that improve themselves through their own output:
- Codex 5.3 is the first frontier model instrumental in creating itself — earlier builds analyzed training logs, flagged failing tests, suggested fixes to training scripts (25% speed improvement, 93% fewer wasted tokens)
- Claude Code is 90% self-authored
- 4% of GitHub commits come from Claude Code

The feedback loop has closed: each generation of AI tools makes the next faster and better, compounding capability and accelerating the gap between frontier and mainstream.

## The Organizational Obsolescence Argument

Every coordination structure in a modern software org — standups, sprint planning, code review, QA, release management — exists as a response to a specific human limitation. When the human is no longer writing the code, these structures cease to serve their original purpose and become pure friction.

The engineering manager's value shifts from "coordinate the team" to "define the specification." The program manager's value shifts from "track dependencies between human teams" to "architect the pipeline of specs." Skills shift from coordination to articulation.

## The Talent Pipeline Collapse

The software engineering career ladder is an apprenticeship model: juniors learn by doing simple tasks, seniors mentor and review, 5-7 years produces a senior. AI automates the simple tasks that juniors learn on.

Evidence:
- Junior developer employment dropping 9-10% within six quarters of AI adoption (Harvard 2025)
- UK graduate tech roles fell 46% in 2024
- US junior postings down 67%

**Partial mitigation:** "Medical residency" model where juniors learn by reviewing and directing AI output in simulated environments rather than writing code from scratch.

## The Brownfield Reality

Legacy systems cannot be dark-factored because the specification doesn't exist — the running system IS the only complete description of what the software does. The migration path:

1. Use AI at Level 2-3 for current work
2. In parallel, use AI to generate specs from existing code
3. Build scenario suites that capture real behavior
4. Redesign CI/CD for AI-generated code at volume
5. Shift new development to Level 4-5 while maintaining legacy in parallel

This is a multi-step, potentially multi-year process with no shortcuts.

## The Jevons Paradox for Software

Historical pattern: every time the cost of computing dropped (mainframes to PCs, PCs to cloud, cloud to serverless), total software production exploded rather than staying flat. AI is dropping the cost of software production by an order of magnitude or more. Massive unmet demand exists (regional hospitals, mid-market manufacturers, family logistics companies). The constraint moves from "can we build it" to "should we build it" — and "should we build it" has always been the harder question.

## Key Implications

1. **Generalists over specialists.** When AI handles implementation, the human's value is understanding the problem space broadly enough to direct implementation correctly. Systems thinking, customer intuition, and the ability to hold a whole product in your head matter more than deep expertise in one stack.
2. **Spec quality is the new bottleneck.** Ambiguity produces software that fills gaps with machine guesses, not customer-centric guesses. The spec must anticipate the questions the agent doesn't know to ask.
3. **Measure, don't trust feelings.** Self-assessment of AI productivity is unreliable. Use actual task completion time comparisons, not surveys.
4. **Budget compute as headcount.** $1,000/engineer/day in compute is the benchmark for serious AI software factories. If your AI spend per engineer is trivial, you're not operating at the scale where dark factory patterns become viable.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — practical workflow incorporating these maturity levels
- [Empathize with the Agent](empathize-with-the-agent.md) — the mental shift required to progress past Level 2
- [Claude Code](../tools/claude-code.md) — tool enabling Level 3-4 patterns
