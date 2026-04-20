---
title: "Demystifying evals for AI agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-01-09"
url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
pillar: "understanding"
tags: [evaluation, agents, graders, pass-at-k, claude-code, swe-bench, best-practices]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Demystifying evals for AI agents

**Published:** Jan 09, 2026
**Authors:** Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, and Jiri De Jonghe

---

## Introduction

This comprehensive guide addresses how teams can rigorously evaluate AI agents before deployment. The authors note that "good evaluations help teams ship AI agents more confidently," enabling teams to identify issues before they reach production rather than catching problems reactively through user reports.

## Core Concepts

The article establishes key terminology for agent evaluation:

- **Tasks**: Individual tests with defined inputs and success criteria
- **Trials**: Multiple attempts at a task, accounting for non-deterministic model behavior
- **Graders**: Logic that scores agent performance across different dimensions
- **Transcripts**: Complete records of agent interactions, tool calls, and reasoning
- **Outcomes**: Final environmental state after task completion
- **Evaluation harness**: Infrastructure managing end-to-end evaluation execution

## Why Evaluations Matter

Early-stage agent development can proceed through manual testing and intuition, but this approach breaks down at scale. Teams that adopt evaluations early gain competitive advantages when new models release—they can quickly assess capabilities and upgrade within days rather than weeks.

## Three Types of Graders

**Code-based graders** offer speed, objectivity, and reproducibility through string matching, binary tests, and static analysis, though they struggle with valid variations that don't match expected patterns exactly.

**Model-based graders** provide flexibility and nuance through rubric-based scoring and natural language assertions, but require calibration and prove more expensive than code-based alternatives.

**Human graders** deliver gold-standard quality judgments matching expert evaluation, though at higher cost and slower timelines.

## Agent-Specific Evaluation Approaches

### Coding Agents
Deterministic grading works naturally for code—test execution provides clear pass/fail signals. Benchmarks like SWE-bench Verified validate solutions against existing test suites.

### Conversational Agents
These require multidimensional success metrics: task completion (state verification), interaction efficiency (turn counts), and quality (tone and empathy). Often require "a second LLM to simulate the user."

### Research Agents
Research quality depends on context, making evaluation challenging. Teams combine grader types to verify claims are source-grounded, check coverage, and confirm source authority.

### Computer Use Agents
These interact through GUIs like humans do. Evaluation requires real or sandboxed environments verifying both visible outcomes and backend state changes.

## Non-Determinism and Key Metrics

**pass@k**: Probability of at least one success across k attempts. Useful for scenarios where any working solution suffices.

**pass^k**: Probability that all k trials succeed. Critical for customer-facing applications requiring consistent reliability.

## Practical Implementation Roadmap

### Early Stages
- Start with 20-50 tasks drawn from real failures, not hundreds of edge cases
- Convert existing manual checks and bug reports into test cases
- Ensure unambiguous task specifications and reference solutions proving solvability

### Design Phase
- Build balanced problem sets testing both when behaviors should and shouldn't occur
- Create stable, isolated test environments preventing cross-trial contamination
- Avoid overly rigid grading that penalizes valid alternative solutions
- Implement partial credit for multi-component tasks

### Maintenance
- Regularly read transcripts from failed tasks to verify graders work properly
- Monitor for eval saturation when pass rates exceed 80-90%
- Establish ownership of evaluation suites with clear maintenance responsibility
- Practice eval-driven development: define success criteria before building features

## Industry Examples

Claude Code evolved from feedback-driven iteration to systematic evals covering concision, file editing, and over-engineering. Descript's video editing agent evaluated against three dimensions—preventing errors, following instructions, and quality. Bolt's AI team added comprehensive evals three months into production.

---

## Conclusion

Successful agent evaluation requires combining complementary assessment methods, starting early with realistic test cases, maintaining high standards for task clarity, and treating evaluation as ongoing infrastructure rather than afterthought.
