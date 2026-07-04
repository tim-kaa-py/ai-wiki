---
title: "How Claude remembers your project"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/memory"
pillar: "building"
tags: [claude-code, claude-md, auto-memory, memory, context-management, best-practices, configuration]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# How Claude remembers your project

> Give Claude persistent instructions with CLAUDE.md files, and let Claude accumulate learnings automatically with auto memory.

Each Claude Code session begins with a fresh context window. Two mechanisms carry knowledge across sessions:
- **CLAUDE.md files**: instructions you write to give Claude persistent context
- **Auto memory**: notes Claude writes itself based on your corrections and preferences

## CLAUDE.md vs auto memory

| | CLAUDE.md files | Auto memory |
|---|---|---|
| **Who writes it** | You | Claude |
| **What it contains** | Instructions and rules | Learnings and patterns |
| **Scope** | Project, user, or org | Per working tree |
| **Loaded into** | Every session | Every session (first 200 lines or 25KB) |
| **Use for** | Coding standards, workflows, project architecture | Build commands, debugging insights, preferences Claude discovers |

## CLAUDE.md files

CLAUDE.md files are markdown files that give Claude persistent instructions. Add to CLAUDE.md when:
- Claude makes the same mistake a second time
- A code review catches something Claude should have known about this codebase
- You type the same correction or clarification into chat that you typed last session
- A new teammate would need the same context to be productive

### Scoping levels

| Scope | Location | Purpose |
|---|---|---|
| **Managed policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Organization-wide, managed by IT |
| **Project** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared, check into git |
| **User** | `~/.claude/CLAUDE.md` | Personal preferences, all projects |
| **Local** | `./CLAUDE.local.md` | Personal project-specific, add to .gitignore |

CLAUDE.md files in parent directories and the working directory are loaded at launch. Files in subdirectories load on demand when Claude reads files in those directories.

### Writing effective instructions

- **Size**: target under 200 lines per file. Longer files reduce adherence.
- **Structure**: use markdown headers and bullets.
- **Specificity**: "Use 2-space indentation" not "Format code properly"
- **Consistency**: conflicting rules cause Claude to pick one arbitrarily.

Run `/init` to generate a starting CLAUDE.md automatically. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive multi-phase flow.

### Path-scoped rules with `.claude/rules/`

For larger projects, organize instructions into topic-specific files in `.claude/rules/`. Rules can be scoped to specific file paths:

```markdown
---
paths:
  - "src/api/**/*.ts"
---
# API Development Rules
- All API endpoints must include input validation
```

Rules without `paths` load at launch. Path-scoped rules trigger only when Claude reads files matching the pattern — saving context.

### Importing files

Use `@path/to/import` syntax to reference other files from CLAUDE.md. Imported files are expanded and loaded into context at launch.

### AGENTS.md compatibility

Claude Code reads `CLAUDE.md`, not `AGENTS.md`. If your repo uses `AGENTS.md` for other agents, create a `CLAUDE.md` that imports it: `@AGENTS.md`.

### How CLAUDE.md files load

Claude walks up the directory tree from your current working directory, checking each directory for CLAUDE.md files. All discovered files are concatenated, ordered from root down to working directory. More specific instructions load last (higher priority).

### Large team management

**Deploy organization-wide CLAUDE.md** at the managed policy location — distributed via MDM/Ansible/Group Policy. This file cannot be excluded by individual settings.

**Exclude specific files** with `claudeMdExcludes` setting — useful in monorepos where other teams' CLAUDE.md files aren't relevant to your work.

**CLAUDE.md vs managed settings distinction:**
- Settings: technical enforcement (block tools, commands, file paths)
- CLAUDE.md: behavioral guidance (coding style, data handling reminders)

## Auto memory

Auto memory lets Claude accumulate knowledge across sessions without you writing anything. Claude saves notes for itself: build commands, debugging insights, architecture notes, code style preferences. Claude decides what's worth remembering.

Requires Claude Code v2.1.59 or later. On by default. Toggle with `/memory` or set `autoMemoryEnabled: false` in settings.

### Storage location

`~/.claude/projects/<project>/memory/` — all worktrees and subdirectories within the same git repository share one auto memory directory.

```
memory/
├── MEMORY.md          # Concise index, loaded into every session (first 200 lines / 25KB)
├── debugging.md       # Detailed notes on debugging patterns
├── api-conventions.md # API design decisions
```

`MEMORY.md` is the index. Topic files load on demand when Claude needs them. This 200-line limit applies only to MEMORY.md — CLAUDE.md files load in full.

### Auditing and editing

Auto memory files are plain markdown — edit or delete at any time. Run `/memory` to browse from within a session.

When you ask Claude to remember something ("always use pnpm, not npm"), Claude saves it to auto memory. To add to CLAUDE.md instead, ask Claude directly or edit via `/memory`.

## Troubleshooting

**Claude isn't following my CLAUDE.md**: CLAUDE.md content is delivered as a user message, not enforced configuration. Verify with `/memory`, make instructions more specific, check for conflicts.

**Instructions lost after `/compact`**: Project-root CLAUDE.md re-injects after compaction. Nested CLAUDE.md files in subdirectories don't — they reload when Claude reads files in that subdirectory.

**CLAUDE.md too large**: Use path-scoped rules to load instructions only when needed.

## View and edit with `/memory`

Lists all CLAUDE.md files loaded in your current session, lets you toggle auto memory, and provides a link to open the auto memory folder.
