---
title: "Designing AI-resistant technical evaluations"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-01-21"
url: "https://www.anthropic.com/engineering/AI-resistant-technical-evaluations"
pillar: "ecosystem"
tags: [hiring, evaluation, claude, performance-engineering, take-home, ai-resistance]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Designing AI-Resistant Technical Evaluations

**Published:** January 21, 2026
**Author:** Tristan Hume, Lead, Performance Optimization Team at Anthropic

---

## Article Summary

Anthropic's performance engineering team has faced an evolving challenge: keeping their technical hiring evaluation relevant as Claude's capabilities advance. Tristan Hume describes how successive Claude models have required three iterations of their take-home assessment.

### The Original Take-Home (2023-2024)

Hume designed a Python-based simulator for a fake accelerator resembling TPUs. Candidates optimized parallel tree traversal code within 4 hours (later reduced to 2), navigating features like manually managed memory, VLIW instruction packing, SIMD vectorization, and multicore distribution. The approach proved successful, helping hire dozens of strong performance engineers directly from the Twitter outreach campaign.

The test succeeded because it balanced realism with depth—candidates rarely encountered problems within standard interview timeframes that allowed demonstrating optimization mastery.

### The Defeats

**Claude Opus 4 (May 2025):** Over 50% of human candidates performed worse than the model within the 2-hour window. Hume responded by identifying where Claude struggled and making that the new starting point for Version 2, emphasizing "clever optimization insights over debugging" rather than code volume.

**Claude Opus 4.5:** Met top human performance within 2 hours and continued improving with additional time. When Hume revealed the achievable cycle count target, the model discovered previously unconsidered workarounds.

### Evolution to Version 3

Rather than ban AI assistance, Hume sought evaluations where human reasoning could advantage over the model's pattern-matching. He explored data transposition optimization (Claude solved it), then shifted toward Zachtronics-inspired puzzles—highly constrained instruction sets requiring unconventional programming approaches.

The new assessment features independent sub-problems with minimal visualization, forcing candidates to decide whether building debugging tools represents worthwhile effort investment.

### The Open Challenge

Anthropic released the original take-home on GitHub with unlimited time. Performance benchmarks show:

- Claude Opus 4.5 (test-time compute harness): 1,487 cycles
- Fastest human solution ever submitted: 1,363 cycles (below Opus 4.5's best)

The threshold for contacting Anthropic's recruiting team: beating 1,487 cycles.

Hume concludes that realistic evaluations may no longer suffice—newer assessments must simulate novel work rather than resembling actual job conditions.
