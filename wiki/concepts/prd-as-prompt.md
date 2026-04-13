---
title: "PRD-as-Prompt Pattern"
type: "concept"
pillar: "building"
tags: [prompt-engineering, architecture, bootstrap, agents, best-practices, karpathy]
sources:
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
last_updated: "2026-04-13"
---

# PRD-as-Prompt Pattern

A reusable bootstrap pattern where a full system architecture is encoded as a product requirements document (PRD) that a coding agent can execute in a single prompt to scaffold the entire system from scratch.

## The Core Idea

Instead of guiding an agent through a multi-step setup process, you write one self-contained document that specifies:

- Folder structure
- File schemas and frontmatter
- Agent rules and behavior
- Processing pipelines
- Naming conventions

When sent as a single prompt to a coding agent with no other context, it one-shots the entire system. The PRD is both the specification and the executable instruction.

## Origin

Andrej Karpathy published a follow-up tweet to his LLM wiki pattern containing a PRD that, when given to a coding agent, builds the entire knowledge base system — folder structure, CLAUDE.md schema, processing rules, index maintenance — from a blank slate. Cole Medin highlights this as a reusable pattern beyond Karpathy's specific use case. *(Source: Cole Medin)*

## Why It Works

Modern coding agents can scaffold complex multi-file systems from a single well-structured prompt. The PRD-as-prompt pattern works because:

1. **Self-contained context** — the agent doesn't need to search for requirements across multiple files or conversations
2. **Declarative specification** — "here's what the system looks like" rather than "do step 1, then step 2..."
3. **Testable** — you can verify the pattern by running it against a blank directory and checking the output
4. **Shareable** — one document captures the entire architecture, making it easy to reproduce or fork

## How to Apply

1. Design your system architecture as you normally would
2. Encode the full design as a PRD-style document: folder structure, file schemas, agent rules, processing pipeline, naming conventions
3. Test that a coding agent can one-shot the system from a blank slate using only the PRD
4. Iterate on the PRD until it reliably produces the correct scaffold
5. Share the PRD as the canonical way to bootstrap the system

## Relationship to CLAUDE.md

The PRD-as-prompt pattern is closely related to CLAUDE.md files, but serves a different purpose:

| Document | Purpose | When used |
|----------|---------|-----------|
| PRD-as-prompt | Bootstrap — create the system from scratch | Once, at setup |
| CLAUDE.md | Operate — guide the agent within an existing system | Every session |

A mature workflow uses the PRD to scaffold the initial system, then the CLAUDE.md (which the PRD creates) to guide ongoing operation.

## Related Pages

- [LLM Wiki Pattern](llm-wiki-pattern.md) — the pattern Karpathy's original PRD bootstraps
- [Andrej Karpathy](../people/andrej-karpathy.md) — published the original PRD tweet
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — a system that can be bootstrapped with this pattern
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — the broader workflow context
