---
title: "Effective harnesses for long-running agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-26"
url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"
pillar: "understanding"
tags: [harness-engineering, agents, long-running, claude, initializer-agent, testing]
ingested: "2026-04-20"
source_file: "sources/articles/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
---

# Effective harnesses for long-running agents — Summary

**Source:** Justin Young (Anthropic) | 2025-11-26 | [Link](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

## TL;DR
For multi-context-window tasks, split work between an **initializer agent** (sets up `init.sh`, progress file, feature list with 200+ failing items) and a **coding agent** that picks one feature at a time. Puppeteer MCP for end-to-end verification beats unit tests for catching real bugs.

## Key Concepts

### Initializer / coding agent split
Initializer = environment + task list + first commit. Coding agent = atomic feature work + commit per change.

### Failure modes mapped to fixes
| Problem | Fix |
|---|---|
| Premature "done" | Feature list with explicit failing flags |
| Lost context between sessions | Git commits + progress file |
| Marked-passing-but-broken | Mandatory E2E browser test |
| Runtime confusion | Pre-written `init.sh` |

## Key Takeaways
1. **Pre-populate a long failing-feature list** so the agent can't trick itself into thinking it's done.
   - **How to apply:** for any long-running build task, write the feature checklist before the agent starts; mark "failing" until E2E verified.
2. **Use Puppeteer MCP for E2E**, not unit tests, when the user-visible behavior matters.
3. **Commit-per-feature** is the persistence layer for cross-window memory.

## Related Topics
long-running-agents, initializer-pattern, harness-engineering, e2e-verification, puppeteer-mcp
