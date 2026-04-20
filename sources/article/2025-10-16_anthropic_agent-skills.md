---
title: "Equipping agents for the real world with Agent Skills"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-10-16"
url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
pillar: "building"
tags: [agent-skills, claude, skills, progressive-disclosure, agents, mcp, claude-code]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Equipping Agents for the Real World with Agent Skills

**Published:** October 16, 2025
**Authors:** Barry Zhang, Keith Lazuka, and Mahesh Murag

---

## Article Summary

Anthropic introduced Agent Skills, a framework enabling Claude to function as a specialized agent by bundling procedural knowledge into organized directories. Rather than building separate custom agents for each use case, developers can now equip Claude with domain-specific expertise through composable resources.

## What Are Agent Skills?

Agent Skills are directories containing a `SKILL.md` file that houses instructions, scripts, and resources. The core file begins with YAML frontmatter specifying `name` and `description`—metadata loaded into Claude's system prompt at startup.

The framework employs **progressive disclosure**, revealing information in layers:

1. **First level:** Skill name and description (always loaded)
2. **Second level:** Full `SKILL.md` content (loaded when Claude determines relevance)
3. **Third level and beyond:** Additional bundled files Claude discovers as needed

This approach prevents context overload while keeping skills scalable and unbounded in complexity.

## How Skills Function

When Claude encounters a task, it can dynamically trigger relevant skills. For example, Anthropic's PDF skill enables Claude to manipulate documents—filling forms, extracting fields—by including both instructions and executable Python scripts.

Skills can include code for Claude to execute as deterministic tools, avoiding expensive token-based operations. Claude chooses whether to run scripts directly or read them as reference documentation.

## Development Guidelines

- **Start with evaluation:** Identify capability gaps through representative task testing
- **Structure for scale:** Split unwieldy files; keep mutually exclusive contexts separate
- **Adopt Claude's perspective:** Monitor real usage and iterate based on observed trajectories
- **Collaborate iteratively:** Ask Claude to codify successful approaches into reusable context

## Security Considerations

The article cautions that "malicious skills may introduce vulnerabilities." Recommendations include installing skills only from trusted sources and thoroughly auditing unfamiliar skills before deployment.

## Current Support and Future Vision

Agent Skills are currently supported across Claude.ai, Claude Code, the Claude Agent SDK, and the Claude Developer Platform. Long-term vision includes enabling agents to autonomously create and evaluate skills.

---

## Key Takeaway

The framework transforms general-purpose agents into specialized tools through modular, discoverable expertise bundles—analogous to "putting together an onboarding guide for a new hire."
