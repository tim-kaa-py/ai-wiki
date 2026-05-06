---
title: "Explore the context window (Claude Code)"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/context-window"
pillar: "building"
tags: [claude-code, context-window, tokens, compaction, memory, skills, hooks, subagents, mcp]
ingested: "2026-05-06"
extraction_method: "web-fetch"
---

# Explore the context window

> An interactive simulation of how Claude Code's context window fills during a session. See what loads automatically, what each file read costs, and when rules and hooks fire.

Claude Code's context window holds everything Claude knows about your session: your instructions, the files it reads, its own responses, and content that never appears in your terminal.

## What loads automatically at startup (before you type anything)

| Component | Approx. tokens | Visibility |
|---|---|---|
| System prompt | 4,200 | Hidden — core instructions for behavior, tool use, and response formatting. Never seen by user. |
| Auto memory (MEMORY.md) | 680 | Hidden — Claude's notes from previous sessions (build commands, patterns, mistakes to avoid). First 200 lines or 25KB. |
| Environment info | 280 | Hidden — working directory, platform, shell, OS version, git branch/status/recent commits. |
| MCP tools (deferred) | 120 | Hidden — tool names only; full schemas stay deferred. Claude loads specific schemas on demand via tool search. Set `ENABLE_TOOL_SEARCH=auto` to load upfront or `false` to always load all. |
| Skill descriptions | 450 | Hidden — one-line descriptions of available skills. Full skill content loads only when a skill is used. Skills with `disable-model-invocation: true` are NOT in this list. Unlike other startup content, skill descriptions are NOT re-injected after `/compact`. Only actually-invoked skills get preserved. |
| ~/.claude/CLAUDE.md | 320 | Hidden — global preferences, applies to every project. |
| Project CLAUDE.md | 1,800 | Hidden — project conventions, build commands, architecture notes. Most important file you can create. Keep under 200 lines. |

**Total before you type anything: ~7,850 tokens** (varies by your actual CLAUDE.md size, MCP servers, memory contents).

## As Claude works

Each file Claude reads adds to context:

- **File reads**: 2,400+ tokens per file (hidden from terminal — you see "Read auth.ts" one-liner but not the content)
- **Path-scoped rules**: load automatically when Claude reads a file in a matching directory (shown as one-line "Loaded .claude/rules/api-conventions.md" notice)
- **Grep/search output**: ~600 tokens (you see command ran, not full output)
- **Claude's responses and tool use**: visible text appears in terminal; reasoning/edits accumulate in context

## Subagents and context isolation

When you delegate research to a subagent ("use a subagent to research X, then fix it"):

- The subagent gets its own **separate context window**
- It loads its own system prompt (~900 tokens), project CLAUDE.md (1,800 tokens), MCP + skills (~970 tokens)
- Its file reads (potentially 6,100+ tokens) stay entirely in the subagent's context
- Only the **final summary** (~420 tokens) returns to your main context
- This is the primary mechanism for keeping large file reads out of your main window

## How hooks enter context

PostToolUse hooks communicate via `hookSpecificOutput.additionalContext` — this JSON field enters Claude's context. Plain stdout on exit 0 does NOT enter context (goes to debug log only). Exit code 2 surfaces stderr as an error but cannot block since the tool already ran.

## What survives compaction

When `/compact` runs, it replaces conversation history with a structured summary. Here's what happens to each mechanism:

| Mechanism | After compaction |
|---|---|
| System prompt and output style | Unchanged; not part of message history |
| Project-root CLAUDE.md and unscoped rules | Re-injected from disk |
| Auto memory | Re-injected from disk |
| Rules with `paths:` frontmatter | **Lost** until a matching file is read again |
| Nested CLAUDE.md in subdirectories | **Lost** until a file in that subdirectory is read again |
| Invoked skill bodies | Re-injected, capped at 5,000 tokens per skill and 25,000 tokens total; oldest dropped first |
| Hooks | Not applicable; hooks run as code, not context |
| Skill descriptions (index) | **Not re-injected** — only skills you actually invoked are preserved |

**Key insight:** Path-scoped rules and nested CLAUDE.md files load into message history when their trigger file is read — compaction summarizes them away with everything else. They reload the next time Claude reads a matching file. If a rule must persist across compaction, drop the `paths:` frontmatter or move it to the project-root CLAUDE.md.

**Skill truncation:** Skill bodies are re-injected after compaction, but large skills are truncated to the per-skill cap (5,000 tokens). Truncation keeps the start of the file — put the most important instructions near the top of SKILL.md.

## Illustrative full-session token timeline

```
Before you type:     ~7,850 tokens (system + CLAUDE.md + memory + MCP + skills)
After file reads:    +5,900 tokens (3 files + 2 path rules + grep results)
Claude's analysis:   +800 tokens
Edits + hook output: +1,220 tokens (2 edits + 2 hook additionalContext blocks)
Test output:         +1,200 tokens
Follow-up prompt:    +40 tokens
Subagent summary:    +500 tokens (420 result + 80 metadata — rest stayed in subagent)
Final response:      +1,200 tokens
TOTAL (pre-compact): ~18,710 tokens → /compact → ~3,500 tokens
```

## Practical guidance

- **Check actual usage**: run `/context` for a live breakdown by category with optimization suggestions. Run `/memory` to see which CLAUDE.md and auto memory files loaded.
- **Keep CLAUDE.md under 200 lines**: move reference content to skills or path-scoped rules so it only loads when needed.
- **Delegate research to subagents**: large file reads stay out of your main context window.
- **Path-scoped rules have a gotcha**: they vanish after `/compact` and only reload when Claude reads a matching file again. Don't use them for rules that must always be active.
- **Skills with side effects**: use `disable-model-invocation: true` to keep them completely out of context until you explicitly invoke them with `/name`.

## Related resources

- Extend Claude Code (`/en/features-overview`): when to use CLAUDE.md vs skills vs rules vs hooks vs MCP
- Store instructions and memories (`/en/memory`): CLAUDE.md hierarchy and auto memory
- Subagents (`/en/sub-agents`): delegate research to a separate context window
- Best practices (`/en/best-practices`): managing context as your primary constraint
