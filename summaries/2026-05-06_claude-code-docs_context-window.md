---
title: "Explore the context window (Claude Code)"
description: "Anthropic's token-level breakdown of what fills Claude Code's context window and when, including baseline system prompt cost"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/context-window"
pillar: "building"
tags: [claude-code, context-window, tokens, compaction, memory, skills, hooks, subagents, mcp]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_context-window.md"
---

# Explore the context window (Claude Code) — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/context-window)

## TL;DR

An authoritative token-level breakdown of what Claude Code loads into context and when — with actual numbers. The key revelation: ~7,850 tokens are consumed before you type a single character (system prompt, CLAUDE.md, auto memory, MCP tool names, skill descriptions). File reads are the main context consumer during a session; subagents are the primary mechanism to isolate those reads from your main window.

## Key Takeaways

1. **You start every session ~7,850 tokens in.** System prompt (4,200) + CLAUDE.md (1,800) + ~/.claude/CLAUDE.md (320) + auto memory (680) + environment info (280) + skill descriptions (450) + MCP tool names (120). A large CLAUDE.md can push this much higher.
   - **How to apply:** Keep CLAUDE.md under 200 lines. Move reference content to skills or path-scoped rules to reduce baseline cost.

2. **File reads dominate context mid-session.** A single file read is 1,000–3,000+ tokens (all hidden from terminal — you see only a one-line "Read auth.ts" notice). Three files + two path-scoped rules + grep results easily add 6,000 tokens.
   - **How to apply:** Be specific in prompts ("fix the bug in auth.ts") so Claude reads fewer files. For broad research tasks, use subagents.

3. **Subagents are the primary context-protection mechanism.** A subagent gets its own context window (~4,000 tokens of startup overhead). Its file reads (potentially 6,000+ tokens) stay entirely in its context. Only the final summary (~420 tokens) returns to your main window. The math: 6,100 tokens of file reads → 420 token result.
   - **How to apply:** Any task described as "investigate/research/explore" should be routed through a subagent.

4. **Hook output enters context only via `additionalContext`.** A PostToolUse hook's stdout on exit 0 goes to the debug log only — not to Claude. To pass info to Claude from a hook, return JSON with `hookSpecificOutput.additionalContext`. Each prettier hook in the example costs ~100-120 tokens.
   - **How to apply:** Don't assume hook stdout reaches Claude. Use the `additionalContext` JSON field for anything Claude needs to act on.

5. **What survives `/compact` depends on where instructions live.** Project-root CLAUDE.md and auto memory re-inject automatically. Path-scoped rules and nested CLAUDE.md files are lost until the matching file is read again. Skill descriptions are NOT re-injected — only actually-invoked skill bodies are preserved (capped at 5K tokens/skill, 25K total).
   - **How to apply:** Rules that must survive compaction go in project-root CLAUDE.md. Important skill instructions go near the top of SKILL.md (truncation keeps the start).

6. **Skills with `disable-model-invocation: true` cost zero context until invoked.** Their descriptions don't appear in the skill index. They stay completely out of context until you type `/name`. Use for skills with side effects (commit, deploy, send messages).
   - **How to apply:** Set this flag on any skill that shouldn't run automatically or that you want to keep completely out of context.

## Notable Commands / Code Snippets

```
/context    # Live breakdown of context usage by category with optimization suggestions
/memory     # See which CLAUDE.md and auto memory files loaded at startup
/compact    # Summarize conversation to free context space
```

**Approximate token counts (illustrative):**
- System prompt: ~4,200
- Project CLAUDE.md (well-tuned): ~1,800
- Auto memory (MEMORY.md index): ~680
- Each file read: ~1,000–3,000
- Subagent summary: ~420 (vs. 6,100+ for its file reads)
- Each hook `additionalContext`: ~100–120

## Related Topics

claude-code, context-window, tokens, compaction, memory, skills, hooks, subagents, mcp
