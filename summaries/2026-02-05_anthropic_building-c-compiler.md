---
title: "Building a C compiler with a team of parallel Claudes"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-02-05"
url: "https://www.anthropic.com/engineering/building-c-compiler"
pillar: "building"
tags: [agent-teams, parallel-claude, claude-code, autonomous, multi-agent, agents]
ingested: "2026-04-20"
source_file: "sources/article/2026-02-05_anthropic_building-c-compiler.md"
---

# Parallel Claudes Build a C Compiler — Summary

**Source:** Nicholas Carlini (Anthropic Safeguards) | 2026-02-05 | [Link](https://www.anthropic.com/engineering/building-c-compiler)

## TL;DR
16 parallel Claude Code agents in shared Docker+Git, coordinated only by lock files, produced a 100k-line Rust C compiler in two weeks (~2,000 sessions). Compiles Linux 6.9 on x86/ARM/RISC-V, plus QEMU/FFmpeg/SQLite/Postgres/Redis with 99% test pass rate.

## Key Concepts

### Agent teams (lock-file coordination)
Multiple agents in shared repo. Lock files prevent task duplication. No human in the loop.

### Loop-based harness
Trivial: keep Claude continuously working. Most of the work is in test infrastructure, not orchestration.

## Key Takeaways
1. **The verifier is the bottleneck.** "The task verifier must be nearly perfect" — autonomous agents will solve whatever has clear feedback. Bad tests → drift.
   - **How to apply:** before launching parallel agents, invest in a verifier that catches the actual failure modes, not surface symptoms.
2. **Maintain progress documentation, avoid context pollution, sample tests deterministically but with variation.**
3. **Limits encountered:** no 16-bit x86 codegen, depends on GCC for assembly/linking, less optimal output. Integration tasks especially hard.
4. **Implication:** large autonomous SWE is feasible *with strong verification*; security-critical code still needs human review.

## Related Topics
agent-teams, parallel-agents, claude-code, multi-agent, verification
