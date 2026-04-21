---
title: "A postmortem of three recent issues"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-09-17"
url: "https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues"
pillar: "ecosystem"
tags: [postmortem, claude, infrastructure, model-quality, debugging, tpu]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# A Postmortem of Three Recent Issues

**Published:** September 17, 2025
**Author:** Sam McAllister (with acknowledgments to Stuart Ritchie, Jonathan Gray, Kashyap Murali, Brennan Saeta, Oliver Rausch, Alex Palcuie, and others)

---

## Summary

Between August and early September 2025, Anthropic identified and resolved three separate infrastructure bugs that intermittently degraded Claude's response quality. The company emphasizes that "we never reduce model quality due to demand, time of day, or server load."

## The Three Bugs

**1. Context Window Routing Error (August 5)**
Some Sonnet 4 requests were misrouted to servers configured for the upcoming 1M token context window. Initial impact affected 0.8% of requests, but a load balancing change on August 29 increased this to 16% at peak impact. Approximately 30% of Claude Code users experienced at least one degraded message during this period. The fix deployed September 4, with full rollout completed by September 18.

**2. Output Corruption (August 25-September 2)**
A misconfiguration on TPU servers caused a runtime performance optimization to assign high probabilities to tokens that should rarely appear—producing unexpected characters like Thai or Chinese text in English responses. This affected Opus 4.1, Opus 4, and Sonnet 4. The team "identified the issue and rolled back the change on September 2."

**3. Approximate Top-K XLA:TPU Miscompilation (August 25)**
A deployment inadvertently triggered a latent compiler bug affecting how Claude selects tokens during text generation. The issue stemmed from mixed precision arithmetic where operations ran at different floating-point levels (bf16 vs. fp32), causing disagreement about which token had highest probability. Anthropic switched to exact top-k with enhanced precision, prioritizing quality over efficiency.

## Detection Challenges

The overlapping nature of these bugs complicated diagnosis. The company acknowledges that "our validation process ordinarily relies on benchmarks alongside safety evaluations" but these didn't capture the degradation users reported. Privacy controls limiting engineer access to user interactions also hindered investigation.

## Improvements Implemented

- Developing more sensitive evaluations to differentiate working from broken implementations
- Running quality evaluations continuously on production systems
- Creating faster debugging tools that preserve user privacy
- Encouraging community feedback through the `/bug` command and "thumbs down" buttons
