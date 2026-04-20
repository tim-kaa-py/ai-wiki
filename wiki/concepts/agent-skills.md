---
title: "Agent Skills"
type: "concept"
pillar: "building"
tags: [agent-skills, claude, skills, progressive-disclosure, agents, mcp, claude-code]
sources:
  - "summaries/2025-10-16_anthropic_agent-skills.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
last_updated: "2026-04-20"
---

# Agent Skills

Anthropic's framework for packaging reusable capabilities for Claude. A **skill** is a directory containing a `SKILL.md` file with YAML frontmatter, optionally bundled with executable scripts and reference files. Available across Claude.ai, Claude Code, Agent SDK, and the Developer Platform.

## The Core Idea

A skill is an **onboarding guide for a new hire**: instructions + scripts + references, scoped to a specific task. Unlike CLAUDE.md (always loaded, applies broadly), skills are on-demand — they only enter context when the agent deems them relevant.

## Progressive Disclosure: Three Levels

The skill system's central design choice is keeping context small until needed:

| Level | When loaded | What's loaded |
|-------|-------------|---------------|
| **L1** | Always (system prompt) | `name` + `description` from SKILL.md frontmatter |
| **L2** | When Claude judges the skill relevant to the task | Full SKILL.md body |
| **L3+** | On demand as Claude works through the skill | Bundled scripts, references, example files |

This lets a Claude instance know *about* hundreds of skills while only paying the full context cost for the handful actually in use.

## SKILL.md Format

```yaml
---
name: my-skill
description: Specific, action-oriented description — what the skill does and when to use it
---

# My Skill

Step-by-step instructions the agent follows...
```

### The Description Is the Discovery Signal

Because L1 is the only gate between an unused skill and a loaded one, the frontmatter `description` decides whether a skill ever triggers. A vague description (`"helps with PDFs"`) will be skipped; a specific, action-oriented description (`"Extract tables and structured data from PDF invoices using Python"`) maps task → skill reliably.

## Skills vs CLAUDE.md

| | CLAUDE.md | Skills |
|--|----------|--------|
| Loading | Always | On-demand |
| Scope | Project-wide conventions | Domain-specific capability |
| Right fit | "We use bun, not npm" | "How to generate and email a monthly report" |

Use CLAUDE.md for rules that apply broadly; use skills for capabilities that only matter for specific tasks.

## Scripts as Deterministic Tools

Skills can bundle executable scripts (Anthropic's PDF skill uses Python). The pattern: **don't burn tokens on work a script can do deterministically**. The skill teaches Claude when and how to invoke the script; the script handles the mechanical step.

## Security: Audit Before Installing

Skills are code + instructions that enter Claude's trusted context. **Malicious skills can introduce vulnerabilities** — prompt injections, backdoored scripts, exfiltration. Treat third-party skills like you would any dependency: audit before installing, prefer skills from known sources, review SKILL.md and bundled scripts.

## How to Design a Skill

1. **Start from real failures.** Identify capability gaps in representative tasks — don't speculate about what might be useful.
2. **Write the description last.** Draft the skill body, then write a frontmatter description that specifically names the task and the trigger conditions.
3. **Move deterministic work into scripts.** Any step that doesn't require model judgment should be a script call.
4. **Test the discovery signal.** Give the agent representative tasks without priming for the skill. If it doesn't pick up the skill, the description is too vague.

## Relation to Broader Patterns

Progressive disclosure generalizes beyond skills — it's the same pattern as MCP tool descriptions, lazy-loaded memory, and the [Harness Engineering](harness-engineering.md) principle of keeping context small. Skills are the Anthropic-productized version.

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Prompt Engineering for Claude](prompt-engineering-claude.md)
- [Harness Engineering](harness-engineering.md)
