---
title: "Building a C compiler with a team of parallel Claudes"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-02-05"
url: "https://www.anthropic.com/engineering/building-c-compiler"
pillar: "building"
tags: [agent-teams, parallel-claude, claude-code, autonomous, compilers, multi-agent, agents]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Building a C Compiler with a Team of Parallel Claudes

**Published:** Feb 05, 2026
**Author:** Nicholas Carlini, Safeguards team researcher

## Overview

Anthropic researchers demonstrated a novel approach called "agent teams" where multiple Claude instances work simultaneously on shared codebases without human intervention. The experiment tasked 16 parallel agents with building a Rust-based C compiler capable of compiling the Linux kernel from scratch.

## Key Results

The project consumed approximately 2,000 Claude Code sessions over two weeks, generating a 100,000-line compiler that successfully builds Linux 6.9 on x86, ARM, and RISC-V architectures. The compiler also handles QEMU, FFmpeg, SQLite, PostgreSQL, and Redis, with a 99% pass rate on compiler test suites.

## Technical Architecture

The system employs a simple loop-based harness that keeps Claude continuously working. Multiple agents operate within Docker containers with a shared Git repository. A basic synchronization mechanism uses lock files to prevent task duplication, allowing agents to work in parallel on distinct problems.

## Critical Insights

**Testing matters immensely.** Carlini emphasizes that "the task verifier must be nearly perfect," since autonomous agents will solve whatever problem receives clear feedback. Poor tests lead agents astray.

The approach revealed important design principles: maintaining clear progress documentation, avoiding context window pollution, and creating deterministic but varied test sampling enables agents to identify regressions efficiently.

## Limitations Encountered

Despite achievements, the compiler revealed LLM boundaries. It lacks a functional 16-bit x86 code generator, relies on GCC for assembly and linking, and generates less-optimized code than typical compilers. Complex integration tasks proved particularly challenging for sustained autonomous development.

## Future Implications

This work suggests autonomous software development at meaningful scale is approaching feasibility, yet Carlini expresses warranted caution about deployment risks without human verification, especially for security-critical systems.
