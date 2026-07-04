---
title: "Extend Claude Code"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/features-overview"
pillar: "building"
tags: [claude-code, claude-md, skills, subagents, hooks, mcp, plugins, agent-teams, context-management, decision-framework]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_features-overview.md"
---

# Extend Claude Code — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/features-overview)

## TL;DR

Anthropic's official decision map for when to use each Claude Code extension feature — CLAUDE.md, Skills, Subagents, Agent Teams, MCP, Hooks, and Plugins. The key insight is that each feature plugs into a different part of the agentic loop and carries different context costs; choosing the wrong one either wastes context budget or adds unnecessary complexity.

## Key Takeaways

1. **CLAUDE.md is for "always do X" rules, not reference material.** It loads every session in full. Every line costs tokens on every request. If content is only needed sometimes, it belongs in a skill or path-scoped rule, not CLAUDE.md.
   - **How to apply:** When adding to CLAUDE.md, ask: "Does this need to be active every session?" If not, make it a skill or scoped rule.

2. **Skills vs Subagents is a context-isolation decision.** Skills add content to your main window. Subagents run their own context and only return a summary. Use skills for reference material and workflows; use subagents for tasks that would flood your context with file reads.
   - **How to apply:** If a task involves reading 5+ files, route it through a subagent. If it's invocable workflows or reference knowledge, make it a skill.

3. **Hooks are the only deterministic control mechanism.** CLAUDE.md instructions are advisory — Claude may or may not follow them. A PreToolUse hook that blocks an action is guaranteed enforcement. "Put guardrails in hooks."
   - **How to apply:** Critical rules (don't modify .env, always format before commit) should be hooks, not CLAUDE.md entries.

4. **Subagents vs Agent teams: communication pattern.** Subagents only report back to the main agent (hub-and-spoke). Agent team teammates can message each other directly (peer-to-peer). If subagents need to share findings with each other, they need agent teams.
   - **How to apply:** Start with subagents. Graduate to agent teams only when the coordination complexity warrants peer-to-peer messaging.

5. **MCP is for external systems; Skills are for knowledge about how to use them.** MCP gives Claude the capability to interact with your database/Slack/browser. Skills give Claude domain knowledge about how to do so effectively. They're complementary, not alternatives.
   - **How to apply:** Pair each MCP server installation with a skill explaining how to use it for your specific workflow.

6. **Build your extension layer incrementally — seven trigger points.** Convention wrong twice → CLAUDE.md. Same prompt every time → skill. Side task floods context → subagent. Subagents need to talk → agent team. Missing external data → MCP. Must-happen automatically → hook. Second repo needs same setup → plugin.
   - **How to apply:** Don't design the full extension layer upfront. Let friction accumulate and respond to each trigger.

7. **Plugins bundle extensions for reuse.** When a second repository needs the same hooks + skills + MCP setup, package it as a plugin. Plugins override skills and subagents by name (managed > user > project); hooks always merge.
   - **How to apply:** If you've built a useful extension setup in one project, make it a plugin when you find yourself copying it.

## Related Topics

claude-code, claude-md, skills, subagents, hooks, mcp, plugins, agent-teams, context-management, decision-framework
