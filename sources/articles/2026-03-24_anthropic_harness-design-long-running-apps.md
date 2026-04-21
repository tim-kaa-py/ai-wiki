---
title: "Harness design for long-running application development"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-03-24"
url: "https://www.anthropic.com/engineering/harness-design-long-running-apps"
pillar: "understanding"
tags: [harness-engineering, agents, generator-evaluator, context-management, multi-agent, claude]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Harness Design for Long-Running Application Development

**Author:** Prithvi Rajasekaran (Anthropic Labs)
**Published:** March 24, 2026

## Article Summary

This piece explores how Anthropic improved Claude's ability to handle complex, long-running development tasks through innovative harness design inspired by Generative Adversarial Networks (GANs).

### Key Problem Areas

Two persistent challenges with autonomous coding agents:

1. **Context Window Degradation**: As context grows, models exhibit "context anxiety," prematurely concluding work. Complete context resets—clearing history while preserving structured handoff artifacts—proved more effective than compression.

2. **Self-Evaluation Bias**: Agents tend to "confidently prais[e] the work—even when, to a human observer, the quality is obviously mediocre." Separating generation from evaluation proved more tractable than making generators self-critical.

### The Generator-Evaluator Architecture

For frontend design, the author created a feedback loop using:

- **Four grading criteria**: Design quality, originality, craft, and functionality
- **Iterative refinement**: 5-15 cycles per generation with detailed evaluator critiques
- **Result**: Designs evolved toward distinctive aesthetics, with one example producing a 3D spatial gallery experience by the tenth iteration

### Full-Stack Implementation

The production harness employed three agents:

- **Planner**: Expanded brief prompts into detailed product specifications with ambient AI features
- **Generator**: Built applications incrementally using React, Vite, FastAPI, and SQLite/PostgreSQL
- **Evaluator**: Used Playwright to actively test running applications, identifying functionality gaps

The system employed "sprint contracts"—negotiated agreements about what completion looked like before implementation began.

### Performance Metrics

**Retro Game Maker Comparison:**
- Solo agent: 20 minutes, $9 (non-functional gameplay)
- Full harness: 6 hours, $200 (complete, playable application)

The harness output demonstrated significantly better UI/UX, feature completeness, and actual functionality despite 20x cost increase.

### Model Evolution Impact

When upgraded to Claude Opus 4.6, the harness became more efficient:
- Removed sprint-based decomposition (model could handle longer coherent sessions)
- Simplified from continuous per-sprint evaluation to final QA pass
- **DAW example**: 3 hours 50 minutes, $124.70 total cost

The author notes that improved models don't eliminate harness value—they shift boundaries regarding which tasks need scaffolding versus which models now handle natively.

### Core Takeaway

Rather than becoming obsolete as models improve, effective harnesses evolve. The principle: "find the simplest solution possible, and only increase complexity when needed," with periodic re-evaluation as model capabilities advance.
