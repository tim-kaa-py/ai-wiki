---
title: "How to use Karpathy's Autoresearch to 10x Claude"
source_type: "youtube"
channel: "Ben AI"
date: "2026-04-07"
url: "https://www.youtube.com/watch?v=bc4NrE0cOE0"
pillar: "building"
tags: [auto-research, self-improving-ai, optimization, skills, claude-code, evals, agents, linkedin, criteria-design]
ingested: "2026-04-16"
source_file: "sources/youtube/2026-04-07_ben-ai_karpathys-autoresearch-10x-claude.md"
---

# How to use Karpathy's Autoresearch to 10x Claude — Summary

**Source:** Ben AI | 2026-04-07 | [Link](https://www.youtube.com/watch?v=bc4NrE0cOE0) | 19:46

## TL;DR

Ben adapts Karpathy's Auto Research framework — originally built for ML optimization — into a self-improving loop for Claude skills, where an AI agent autonomously generates hypotheses, tests them against true/false criteria, and keeps or discards changes based on measurable improvement. The most practical insight is his three-level criteria framework for decomposing even subjective/creative tasks (like LinkedIn copywriting) into testable boolean conditions, plus the real-world data integration via scheduled weekly optimization loops.

## Video Structure

1. [00:00–01:00] **Introduction and promise** — Auto Research makes AI self-improving; applicable to cold emails, landing pages, content engagement
2. [01:00–03:05] **LinkedIn skill optimization demos** — Two examples: simple criteria (hook length, bullet format) achieving 100% from 80%, and complex criteria (hook templates, nuance, writing frameworks, personal stories) achieving 27% improvement over 10 iterations
3. [03:05–03:30] **CLAUDE.md optimization demo** — Using Auto Research to optimize knowledge routing, wiki link creation, and retrieval in a second brain
4. [03:30–05:05] **Real-world data integration** — Pulling top/worst performing LinkedIn posts, pattern analysis, and the vision of scheduled weekly autonomous optimization loops
5. [05:05–07:15] **Setup walkthrough** — How to get Karpathy's repo, adapt it for skills via Claude iteration, or use Ben's plugin
6. [07:15–09:40] **How the loop works** — Architecture: define criteria → baseline → hypothesis → test runner sub-agent → eval (script or LLM judge) → keep/discard → repeat
7. [09:40–10:50] **Auto Research vs. manual evals** — Auto Research automates the full loop; manual evals require human feedback at each iteration. Token cost warning.
8. [10:50–14:50] **Criteria design framework** — The three-level framework for defining good criteria, from hard rules to subjective patterns to real-world data optimization
9. [14:50–17:30] **Practical walkthrough** — Step-by-step of running the optimization: defining criteria, choosing eval mode, setting iteration count
10. [17:30–19:46] **Scheduled autonomous loops and wrap-up** — Weekly AB testing concept for LinkedIn, email sequences, landing pages

## Key Concepts

### Auto Research Loop

A self-improving optimization framework originated by Karpathy for ML, adapted here for general AI skill optimization. The core mechanism: define criteria → establish baseline score → generate hypothesis → test with sub-agent → evaluate (script or LLM judge) → keep/discard change → repeat. The key differentiator from manual evals is full autonomy — no human feedback required between iterations.

### Criteria (in the Auto Research context)

The atomic unit of optimization. Each criterion must be a single boolean condition — evaluatable as strictly true or false. Rules: state the exact condition (not just the goal), use a specific number/format/pattern, and isolate one variable per criterion. "Hook must be under 136 characters" is good; "make the hook short and punchy" is bad.

### Three-Level Criteria Framework

Ben's model for decomposing even subjective/creative tasks into testable criteria:
- **Level 1 — Hard rules:** Clear-cut, deterministic best practices (hook under 136 chars, sentences 5–12 words, max 3 sentences per paragraph)
- **Level 2 — Subjective patterns:** Your personal style and writing patterns that still can be expressed as boolean checks (bold claims must include nuance words like "I think"/"I believe"; posts must follow PAS/IDA frameworks). These typically need an LLM judge rather than a script.
- **Level 3 — Real-world data optimization:** Criteria derived from actual performance data (top vs. worst performing posts), eventually tested via scheduled loops against live metrics.

### Evaluation Modes

Two ways the system judges whether a test iteration passes:
1. **Deterministic script** — Simple logic or Python script checks a clear-cut condition (character count, format check). Fast and cheap.
2. **LLM judge sub-agent** — A separate, unbiased AI agent evaluates the output for more subjective criteria (does this hook match one of the reference templates?). Necessary when the criterion cannot be reduced to a simple script.

### Scheduled Autonomous Optimization

The endgame vision: using scheduled tasks to run Auto Research loops on a weekly cadence against real-world performance data. Each week the system scrapes engagement metrics, evaluates the previous hypothesis, keeps or reverts the change, and generates the next hypothesis. Ben has set this up for LinkedIn posts (target: 250 avg likes), email open rates, and landing page CTR — though he notes these haven't actually run yet.

## Key Takeaways

1. **Auto Research turns manual eval loops into fully autonomous optimization.** Instead of judging each iteration yourself, the system runs hypotheses, tests, and evaluations in a closed loop. The practical unlock: you can optimize overnight or over a week without touching it.
   - **How to apply:** Take any skill you currently improve via manual feedback. Define 3-5 boolean criteria and let Auto Research run 5-10 iterations autonomously.

2. **Good criteria are boolean, specific, and single-variable.** The optimization can only be as good as the criteria. Vague goals like "make it better" produce nothing; "first line must be under 136 characters" produces measurable improvement.
   - **How to apply:** Before running any optimization, write each criterion as a sentence that can only be true or false. If you need the word "and," split it into two criteria.

3. **Even creative/subjective tasks can be largely decomposed into testable boolean criteria.** Ben argues that tone of voice, writing style, and content quality — things that feel inherently subjective — can be captured to a high degree through the three-level framework.
   - **How to apply:** Start with Level 1 (hard formatting rules), then move to Level 2 (style patterns expressed as boolean checks using an LLM judge). Only after both levels are solid, move to Level 3 (real-world data).

4. **Cap iterations at 5-10; performance degrades after 10-15.** More is not better. The optimization overfits or drifts after too many iterations, and token costs scale linearly.
   - **How to apply:** Default to 5 iterations for simple criteria, 10 for complex multi-criteria runs. Never set it to run indefinitely.

5. **Only optimize high-value, frequently-used skills.** Token costs are non-trivial for extended optimization runs. Optimizing a skill you use once a month is a waste.
   - **How to apply:** Prioritize skills that run daily or produce customer-facing output (LinkedIn posts, emails, landing pages, accounting workflows).

6. **Use AI to discover criteria from your own data.** Feed Claude your top and worst performing outputs and let it identify patterns — hooks, CTAs, writing frameworks — that correlate with performance.
   - **How to apply:** Export your top 10 and bottom 10 LinkedIn posts (or emails, or whatever) with engagement metrics. Ask Claude to compare them and propose criteria.

7. **Auto Research can optimize CLAUDE.md files, not just skills.** Ben uses it for knowledge routing, wiki link creation, and retrieval quality in his second brain setup.
   - **How to apply:** Define criteria for your CLAUDE.md (e.g., "file routing accuracy to correct folders > 90%") and run the loop against test scenarios.

## Argument Structures

**The decomposition argument (subjective tasks are more testable than they appear):**
- Premise: Auto Research requires boolean (true/false) criteria
- Premise: Creative tasks like copywriting feel inherently subjective and therefore untestable
- Counter-premise: Most subjective qualities can be decomposed into discrete, testable rules — formatting rules are obvious, but even style and tone can be expressed as pattern-match checks ("bold claims must include qualifier words")
- Conclusion: You can get surprisingly far toward matching your personal tone of voice purely through boolean criteria, without needing any fuzzy "rate this 1-10" evaluation
- Implication: The bottleneck is not the framework's rigidity but your ability to articulate what makes your writing yours

**The optimization staging argument (order matters):**
- Premise: Deterministic skills only need Level 1 criteria (hard rules)
- Premise: Creative skills need all three levels, but Level 2 and 3 criteria are fragile if Level 1 isn't solid
- Conclusion: Always optimize in order — hard rules first, then subjective patterns, then real-world data
- Supporting evidence: His LinkedIn skill went from 80% to 100% on Level 1 criteria alone, then tackled the harder patterns from that stronger baseline

**The automation readiness argument:**
- Premise: Scheduled autonomous optimization requires the skill to already be well-optimized
- Premise: Letting a poorly optimized skill auto-iterate against real-world data risks compounding errors
- Conclusion: The path is manual criteria → Auto Research on criteria → scheduled real-world loops. Skipping stages is risky.

## Notable Commands / Code Snippets

No code snippets shown in the video — the workflow happens entirely within Claude's co-work/code interface using skills and sub-agents.

## User Notes

- The Auto Research concept is directly applicable to the wiki's own optimization: could define criteria for summary quality, wiki page cross-referencing accuracy, or tag consistency and run autonomous improvement loops
- The three-level criteria framework is a genuinely useful mental model for any prompt/skill engineering — forces you to move from vague "make it better" to specific testable conditions
- The LinkedIn skill optimization is the most concrete and reproducible example: hook length, writing framework adherence, nuance on claims, personal story inclusion — all expressible as boolean checks
- Token cost and iteration limits are important practical constraints to remember: 5-10 iterations is the sweet spot, more actually degrades quality
- The two evaluation modes (script vs. LLM judge) map to a real architectural decision: deterministic checks are cheaper and more reliable, but the LLM judge unlocks optimization of subjective criteria
- Optimizing CLAUDE.md via Auto Research is an interesting meta-application — using the system to improve the system's own instructions
- The setup path (adapting Karpathy's ML repo via Claude iteration) is realistic but requires back-and-forth; not a one-shot setup

## Related Topics

auto-research, self-improving-ai, optimization, skills, claude-code, evals, agents, linkedin, criteria-design
