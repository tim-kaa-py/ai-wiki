---
title: "Equipping agents for the real world with Agent Skills"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-10-16"
url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
pillar: "building"
tags: [agent-skills, claude, skills, progressive-disclosure, agents, mcp, claude-code]
ingested: "2026-04-20"
source_file: "sources/article/2025-10-16_anthropic_agent-skills.md"
---

# Agent Skills — Summary

**Source:** Barry Zhang, Keith Lazuka, Mahesh Murag (Anthropic) | 2025-10-16 | [Link](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

## TL;DR
A skill = a directory with `SKILL.md` (YAML frontmatter `name` + `description`). **Progressive disclosure**: name/description always loaded, body loaded on relevance, bundled files discovered as needed. Skills can include executable scripts (e.g., PDF skill uses Python).

## Key Concepts

### Three-level disclosure
1. **L1:** name + description in system prompt (always)
2. **L2:** full SKILL.md (when Claude sees relevance)
3. **L3+:** bundled scripts/refs (on demand)

### Skill = onboarding guide for a new hire
Bundle instructions + scripts + references. Available in Claude.ai, Claude Code, Agent SDK, Developer Platform.

## Key Takeaways
1. **Frontmatter description is the discovery signal.** Vague description → skill never triggers.
   - **How to apply:** write descriptions specific enough that Claude can map a task to the skill without seeing the body.
2. **Use scripts inside skills as deterministic tools** — avoid expensive token-based operations.
3. **Start from real failures** (capability gaps in representative tasks), not speculation.
4. **Audit unfamiliar skills before installing** — malicious skills can introduce vulnerabilities.

## Notable Commands / Snippets
```yaml
---
name: my-skill
description: Specific, action-oriented description
---
```

## Related Topics
agent-skills, progressive-disclosure, claude-code, mcp, onboarding-as-skill
