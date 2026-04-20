---
title: "Claude Code: Best practices for agentic coding"
source_type: "docs"
channel: "Anthropic Engineering"
date: "2025-04-18"
url: "https://www.anthropic.com/engineering/claude-code-best-practices"
pillar: "building"
tags: [claude-code, best-practices, claude-md, plan-mode, sub-agents, hooks, skills, mcp, parallel-sessions]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Best Practices for Claude Code

> Tips and patterns for getting the most out of Claude Code, from configuring your environment to scaling across parallel sessions.

Note: original URL redirects to https://code.claude.com/docs/en/best-practices

Claude Code is an agentic coding environment that can read files, run commands, make changes, and autonomously work through problems. Most best practices flow from one constraint: Claude's context window fills up fast, and performance degrades as it fills.

## Give Claude a way to verify its work
Tests, screenshots, expected outputs. Single highest-leverage thing. Without verification criteria, you become the only feedback loop. UI changes verifiable via Claude in Chrome extension.

## Explore first, then plan, then code
Use Plan Mode (`Ctrl+G` opens plan in editor). Four phases: Explore → Plan → Implement → Commit. Skip plan for trivial diffs.

## Provide specific context
- Scope the task (file, scenario, testing prefs)
- Point to sources (e.g., git history)
- Reference existing patterns ("look at HotDogWidget.php")
- Describe symptoms, not just "fix the bug"
- Use `@file` references, paste images, give URLs, pipe data via `cat error.log | claude`

## Configure your environment

### CLAUDE.md
Loaded every session. Run `/init` to bootstrap. Include: bash commands Claude can't guess, code style differing from defaults, testing instructions, repo etiquette, architectural decisions, env quirks. Exclude: anything inferable, standard conventions, long tutorials. Locations: `~/.claude/CLAUDE.md`, `./CLAUDE.md`, `./CLAUDE.local.md`, parent dirs (monorepos), child dirs (on demand). Imports via `@path/to/import` syntax. If Claude asks questions answered there, phrasing is ambiguous. Treat like code: prune regularly.

### Permissions
Three options: **auto mode** (classifier reviews commands), **permission allowlists** (`/permissions`), **sandboxing** (`/sandbox`).

### CLI tools, MCP, Hooks, Skills, Subagents, Plugins
- CLI tools (`gh`, `aws`, `gcloud`) most context-efficient way to interact with services
- MCP via `claude mcp add`
- Hooks for actions that must happen every time (deterministic, unlike CLAUDE.md which is advisory)
- Skills in `.claude/skills/SKILL.md` with frontmatter `name` and `description`
- Subagents in `.claude/agents/` (own context, own allowed tools)
- Plugins via `/plugin` (bundle skills+hooks+subagents+MCP)

## Communicate effectively
- Ask codebase questions like a senior engineer
- Let Claude interview you: "Interview me using AskUserQuestion tool" → write SPEC.md → fresh session to execute

## Manage your session
- `Esc` to stop, `Esc+Esc` or `/rewind` for checkpoints, "undo that", `/clear` between unrelated tasks
- After 2 failed corrections: `/clear` and start fresh
- `/compact <instructions>` for partial control; `/btw` for side questions that don't enter context
- Subagents for investigation (separate context)
- `claude --continue` / `--resume` / `/rename`

## Automate and scale
- Non-interactive: `claude -p "prompt"` with `--output-format json` or `stream-json`
- Multiple sessions: desktop app, Claude Code on the web, agent teams
- Writer/Reviewer pattern across sessions
- Fan out across files: `for file in $(cat files.txt); do claude -p "..." --allowedTools "..."; done`
- Auto mode: `claude --permission-mode auto -p "fix all lint errors"`

## Common failure patterns
- Kitchen sink session → `/clear`
- Correcting over and over → `/clear` + better prompt
- Over-specified CLAUDE.md → prune ruthlessly
- Trust-then-verify gap → always provide verification
- Infinite exploration → scope narrowly or use subagents

## Develop your intuition
Patterns are starting points. Sometimes you should let context accumulate, skip planning, or be vague. Pay attention to what works.
