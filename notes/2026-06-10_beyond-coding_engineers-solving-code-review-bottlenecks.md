# Ingest Notes

**Source:** [Why The Best Engineers Are Solving Code Review Bottlenecks](https://www.youtube.com/watch?v=W1uG25of2t0)

## User Focus
- How to automate the code review process — look for failure modes and patterns, and design feedback loops that run on the stop hook.
- Specifically enforcing architecture principles (e.g. architectural unit tests that constrain module dependencies).
- Automating code review as much as possible so code quality improves to an acceptable level without human intervention.
- The TDD approach — but coupled with tests for architecture patterns.

## Confirmed Discoveries
- **A. [06:33] Harness matters more than the model** — same model succeeds in one harness, fails in another; determines whether automated review even works.
- **B. [08:10] Don't over-systematize; best harness is a moving target** — anti-pattern of "we must only use Claude Code"; models have different "personalities."
- **C. [11:34] Semantic grep as the highest-value guardrail** — regex/AST rules; concrete example: forbid Python default parameter values.
- **D. [20:41] Cognitive debt, burnout, context-switching discipline** — treat guardrail/environment work as its own project; interleave rather than hard-switch.
- **E. [22:26] "Cognitive surrender" + the hand-grenade framing** — accountability; ties to Amazon's tiered-review policy after AI-caused outages.
- **F. [32:50] Sub-agent introspection / observability** — spawning sub-agents in a separate terminal to watch handoffs deviate.

## Framing note
Horizontal scaling (automate existing PR-review pipeline) vs. vertical (build custom environments for agents) — Florian favors vertical, where guardrails, architecture tests, and stop-hook feedback live.
