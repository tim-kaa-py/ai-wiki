---
title: "Quantifying infrastructure noise in agentic coding evals"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-04-18"
url: "https://www.anthropic.com/engineering/infrastructure-noise"
pillar: "understanding"
tags: [evaluation, agents, benchmarks, infrastructure, swe-bench, terminal-bench]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Quantifying Infrastructure Noise in Agentic Coding Evals

**Author:** Gian Segato (with contributions from Nicholas Carlini, Jeremy Hadfield, Mike Merrill, and Alex Shaw)

**Publication:** Anthropic Engineering Blog

---

## Key Findings

Anthropic researchers discovered that infrastructure configuration significantly impacts agentic coding benchmarks. Their central finding: "the gap between the most- and least-resourced setups on Terminal-Bench 2.0 was 6 percentage points (p < 0.01)."

## The Core Problem

Unlike static benchmarks, agentic coding evaluations like SWE-bench and Terminal-Bench are environment-dependent. The runtime becomes integral to problem-solving, meaning "Two agents with different resource budgets and time limits aren't taking the same test."

## Experimental Results

Testing Terminal-Bench 2.0 across six resource configurations (from strict enforcement to uncapped), researchers found:

- Infrastructure error rates dropped from 5.8% (strict enforcement) to 0.5% (uncapped)
- Success rates improved monotonically with resource headroom
- Beyond 3x resource allocation, agents could attempt heavier computational approaches previously blocked by constraints

## Practical Implications

The research reveals that "a 2-point lead on a leaderboard might reflect a genuine capability difference" or merely infrastructure differences. This undermines confidence in narrow score margins.

## Recommendations

Researchers suggest benchmark maintainers specify both guaranteed allocations and hard kill thresholds separately, calibrated so "scores at the floor and ceiling fall within noise of each other."
