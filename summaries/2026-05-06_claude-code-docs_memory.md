---
title: "How Claude remembers your project"
description: "Anthropic's docs on how Claude Code persists knowledge via CLAUDE.md files and self-written auto memory"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/memory"
pillar: "building"
tags: [claude-code, claude-md, auto-memory, memory, context-management, best-practices, configuration]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_memory.md"
---

# How Claude remembers your project — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/memory)

## TL;DR

Two mechanisms persist knowledge across Claude Code sessions: CLAUDE.md files (you write, loaded every session) and auto memory (Claude writes itself, stores learnings at `~/.claude/projects/<project>/memory/`). CLAUDE.md is for rules; auto memory is for accumulated context like build commands and debugging patterns Claude has discovered.

## Key Takeaways

1. **CLAUDE.md is instructions, auto memory is learnings.** Don't conflate them. CLAUDE.md: "always use pnpm". Auto memory: "this project uses port 3001 for dev server, learned 2026-03-12". You write one; Claude writes the other.
   - **How to apply:** Curate CLAUDE.md deliberately. Let auto memory grow organically.

2. **CLAUDE.md has four scoping levels.** Managed policy (org-wide, MDM-deployed) > User (`~/.claude/CLAUDE.md`) > Project (`./CLAUDE.md`) > Local (`./CLAUDE.local.md`, gitignored). More specific loads last (higher priority). All are concatenated and loaded every session.
   - **How to apply:** Team conventions go in `./CLAUDE.md` (check into git). Personal preferences go in `~/.claude/CLAUDE.md`. Sensitive local overrides go in `./CLAUDE.local.md`.

3. **Under 200 lines per file is a hard rule.** Adherence degrades with length. If your CLAUDE.md is growing, move reference material to path-scoped rules in `.claude/rules/` or to skills.
   - **How to apply:** Audit CLAUDE.md regularly. Every line that wouldn't change Claude's behavior should be cut.

4. **Path-scoped rules save context budget.** Rules in `.claude/rules/` with `paths:` frontmatter only load when Claude reads a matching file — not every session. This keeps your core CLAUDE.md small.
   - **How to apply:** Language-specific conventions (`paths: ["src/api/**/*.ts"]`) go in rules, not CLAUDE.md.

5. **Auto memory has a 200-line / 25KB index limit (MEMORY.md only).** The MEMORY.md index is what loads every session. Detailed topic files (debugging.md, api-conventions.md) load on demand. This limit does NOT apply to CLAUDE.md files, which load in full.
   - **How to apply:** Run `/memory` to audit what's in auto memory. Edit or delete stale entries.

6. **Path-scoped rules and nested CLAUDE.md files are lost after `/compact`.** They live in message history, not outside it. Project-root CLAUDE.md re-injects automatically after compaction; nested files don't, until Claude reads a matching file again.
   - **How to apply:** For rules that must survive compaction, put them in the project-root CLAUDE.md or drop the `paths:` frontmatter.

## Notable Commands / Code Snippets

```bash
/init                        # Generate starter CLAUDE.md
/memory                      # Browse CLAUDE.md files + auto memory in current session
```

```markdown
# .claude/rules/api.md with path scoping
---
paths:
  - "src/api/**/*.ts"
---
# API Development Rules
- All API endpoints must include input validation
```

```markdown
# Import another file from CLAUDE.md
@AGENTS.md
```

## Related Topics

claude-code, claude-md, auto-memory, memory, context-management, best-practices, configuration
