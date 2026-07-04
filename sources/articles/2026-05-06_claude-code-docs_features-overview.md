---
title: "Extend Claude Code"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/features-overview"
pillar: "building"
tags: [claude-code, claude-md, skills, subagents, hooks, mcp, plugins, agent-teams, context-management, decision-framework]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Extend Claude Code

> Understand when to use CLAUDE.md, Skills, subagents, hooks, MCP, and plugins.

Claude Code combines a model with built-in tools for file operations, search, execution, and web access. This guide covers the extension layer: features you add to customize what Claude knows, connect it to external services, and automate workflows.

## Overview

Extensions plug into different parts of the agentic loop:

- **CLAUDE.md** adds persistent context Claude sees every session
- **Skills** add reusable knowledge and invocable workflows
- **MCP** connects Claude to external services and tools
- **Subagents** run their own loops in isolated context, returning summaries
- **Agent teams** coordinate multiple independent sessions with shared tasks and peer-to-peer messaging
- **Hooks** fire on lifecycle events and can run a script, HTTP request, prompt, or subagent
- **Plugins** and **marketplaces** package and distribute these features

## Match features to your goal

| Feature | What it does | When to use it | Example |
|---|---|---|---|
| **CLAUDE.md** | Persistent context loaded every conversation | Project conventions, "always do X" rules | "Use pnpm, not npm. Run tests before committing." |
| **Skill** | Instructions, knowledge, and workflows | Reusable content, reference docs, repeatable tasks | `/deploy` runs your deployment checklist |
| **Subagent** | Isolated execution context that returns summarized results | Context isolation, parallel tasks, specialized workers | Research task that reads many files but returns only key findings |
| **Agent teams** | Coordinate multiple independent Claude Code sessions | Parallel research, new feature development | Spawn reviewers for security, performance, and tests simultaneously |
| **MCP** | Connect to external services | External data or actions | Query your database, post to Slack, control a browser |
| **Hook** | Script, HTTP request, prompt, or subagent triggered by events | Automation that must run on every matching event | Run ESLint after every file edit |

**Plugins** bundle skills, hooks, subagents, and MCP servers into a single installable unit.

## Build your setup over time

| Trigger | Add |
|---|---|
| Claude gets a convention wrong twice | Add it to CLAUDE.md |
| You keep typing the same prompt to start a task | Save it as a user-invocable skill |
| You paste the same playbook for the third time | Capture it as a skill |
| You keep copying data from a browser tab Claude can't see | Connect that system as an MCP server |
| A side task floods your conversation with output | Route it through a subagent |
| You want something to happen every time without asking | Write a hook |
| A second repository needs the same setup | Package it as a plugin |

## Comparing similar features

### Skill vs Subagent

- **Skills** are reusable content you can load into any context
- **Subagents** are isolated workers that run separately from your main conversation

| Aspect | Skill | Subagent |
|---|---|---|
| **What it is** | Reusable instructions, knowledge, or workflows | Isolated worker with its own context |
| **Key benefit** | Share content across contexts | Context isolation. Work happens separately, only summary returns |
| **Context impact** | Adds to your main window | Uses a separate window |
| **Best for** | Reference material, invocable workflows | Tasks that read many files, parallel work, specialized workers |

**They can combine.** A skill can run in isolated context using `context: fork`. A subagent can preload specific skills.

### CLAUDE.md vs Skill

| Aspect | CLAUDE.md | Skill |
|---|---|---|
| **Loads** | Every session, automatically | On demand |
| **Can trigger workflows** | No | Yes, with `/<name>` |
| **Best for** | "Always do X" rules | Reference material, invocable workflows |

Keep CLAUDE.md under 200 lines. If it's growing, move reference content to skills or `.claude/rules/`.

### CLAUDE.md vs Rules vs Skills

| Aspect | CLAUDE.md | `.claude/rules/` | Skill |
|---|---|---|---|
| **Loads** | Every session | Every session, or matching files | On demand |
| **Scope** | Whole project | Can be scoped to file paths | Task-specific |
| **Best for** | Core conventions | Language/directory-specific guidelines | Reference material, repeatable workflows |

### Subagent vs Agent team

| Aspect | Subagent | Agent team |
|---|---|---|
| **Communication** | Reports results back to main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower | Higher (each teammate is a separate Claude instance) |

**Transition point:** If your subagents need to communicate with each other, agent teams are the natural next step.

### MCP vs Skill

- **MCP** gives Claude the ability to interact with external systems
- **Skills** give Claude knowledge about how to use those tools effectively

### Hook vs Skill

| Aspect | Hook | Skill |
|---|---|---|
| **Triggered by** | Lifecycle events (PostToolUse, SessionStart) | You typing `/<name>` or Claude matching description |
| **Determinism** | Always fires on its event | Claude interprets instructions |
| **Best for** | Linting after edits, blocking unsafe commands, logging | Workflows needing reasoning, reference material |

**Put guardrails in hooks.** An instruction in CLAUDE.md is a request, not a guarantee. A `PreToolUse` hook that blocks an edit is enforcement.

## Context costs by feature

| Feature | When it loads | Context cost |
|---|---|---|
| **CLAUDE.md** | Session start, full content | Every request |
| **Skills** | Descriptions at start, full content when used | Low (descriptions only) |
| **MCP servers** | Tool names at start, schemas deferred | Low until a tool is used |
| **Subagents** | When spawned, fresh context | Isolated from main session |
| **Hooks** | On trigger | Zero, unless hook returns output |

**Skills with `disable-model-invocation: true`**: zero cost until you invoke manually. Use for skills with side effects.

## Feature layering

When the same feature exists at multiple levels:
- **CLAUDE.md files** are additive: all levels contribute content simultaneously
- **Skills and subagents** override by name (managed > user > project)
- **MCP servers** override by name (local > project > user)
- **Hooks** merge: all registered hooks fire for their matching events
