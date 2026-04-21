---
title: "Claude Code: Best practices for agentic coding"
source_type: "docs"
channel: "Anthropic Engineering"
date: "2025-04-18"
url: "https://www.anthropic.com/engineering/claude-code-best-practices"
pillar: "building"
tags: [claude-code, best-practices, claude-md, plan-mode, sub-agents, hooks, skills, mcp, parallel-sessions]
ingested: "2026-04-20"
source_file: "sources/articles/2025-04-18_anthropic_claude-code-best-practices.md"
---

# Claude Code Best Practices (Anthropic Docs) — Summary

**Source:** Anthropic Engineering / code.claude.com docs | 2025-04-18 | [Link](https://www.anthropic.com/engineering/claude-code-best-practices)

## TL;DR
Canonical Anthropic guidance on Claude Code. Most rules trace to one constraint: context fills fast and performance degrades as it fills. Verify your work, plan before coding, give specific context, configure aggressively, communicate effectively, manage sessions tightly, scale with parallel sessions and `-p` mode.

## Key Concepts

### The constraint
Context window fills fast → performance degrades. Almost every best practice is downstream of this.

### Hooks vs CLAUDE.md
CLAUDE.md is *advisory*. Hooks are *deterministic* — use them for what must happen every time.

### Skills vs CLAUDE.md
CLAUDE.md = always loaded (apply broadly). Skills = on-demand (domain-specific).

## Key Takeaways
1. **Highest leverage: give Claude a way to verify (tests, screenshots, expected outputs).** Without verification, you ARE the feedback loop.
   - **How to apply:** every task prompt should include "and verify by X."
2. **Explore → Plan → Implement → Commit.** Use Plan Mode for non-trivial tasks. `Ctrl+G` opens plan in editor. Skip for one-line fixes.
3. **CLAUDE.md hygiene:** for each line ask "would removing this make Claude wrong?" If no, cut it. Bloated CLAUDE.md = ignored CLAUDE.md.
4. **After 2 corrections, `/clear` and rewrite the prompt** with what you learned. Don't fight a polluted context.
5. **Three permission strategies:** auto mode (classifier), allowlist (`/permissions`), sandbox (`/sandbox`).
6. **Subagents for investigation** — separate context window, returns summary only.
7. **Fan-out:** `for f in $(cat files.txt); do claude -p "..." --allowedTools "..."; done`. Test on 2-3 first.
8. **Writer/Reviewer pattern:** fresh-context reviewer beats self-review.
9. **`/btw` for side questions** that don't enter context.

## Common Failure Patterns
- Kitchen sink session → `/clear`
- Endless corrections → `/clear` + better prompt
- Over-specified CLAUDE.md → prune
- Trust-then-verify gap → always verify
- Infinite exploration → scope or use subagents

## Notable Commands / Snippets
```bash
claude --continue
claude --resume
claude -p "prompt" --output-format json
claude --permission-mode auto -p "fix all lint errors"
```
```
@path/to/file              # CLAUDE.md import
${user_config.key}         # manifest template literal
```

## Related Topics
claude-code, claude-md, plan-mode, hooks, skills, subagents, parallel-sessions, auto-mode
