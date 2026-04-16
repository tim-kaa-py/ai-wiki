---
title: "Claude Code Permissions"
type: "how-to"
pillar: "building"
tags: [claude-code, permissions, best-practices, security, workflow]
sources:
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
last_updated: "2026-04-15"
---

# Claude Code Permissions

How to configure Claude Code permissions properly using `/permissions` instead of the dangerous blanket bypass. This is an anti-pattern correction from Boris Cherny, the creator of Claude Code.

## The Anti-Pattern: `--dangerously-skip-permissions`

Running Claude Code with `--dangerously-skip-permissions` is a blanket bypass that disables all permission checks. It gives Claude unrestricted access to run any bash command, edit any file, and take any action without confirmation. This is convenient but removes all safety guardrails with no granularity.

**Never use `--dangerously-skip-permissions` in any environment where safety matters.**

## The Correct Approach: `/permissions`

The `/permissions` command opens a UI inside Claude Code where you can pre-allow specific bash commands by pattern. These allowlists are stored in `.claude/settings.json` and can be checked into the team repo, so all teammates share the same pre-approved command set.

### Step 1: Open Permissions

Run `/permissions` inside a Claude Code session.

### Step 2: Add Safe Command Patterns

Pre-allow commands that are safe and frequently used. Use glob-style patterns:

```
Bash(bun run build:*)
Bash(bun run test:*)
Bash(bun run lint:file:*)
Bash(bun run typecheck:*)
Bash(bq query:*)
Bash(find:*)
```

Replace `bun run` with your project's package runner (`npm run`, `yarn`, `pnpm`, etc.).

### Step 3: Check Settings Into the Repo

The permissions are stored in `.claude/settings.json`. Commit this file to version control so the entire team shares the same allowlist:

```bash
git add .claude/settings.json
git commit -m "Add Claude Code permission allowlist"
```

## Why This Is Better

| Aspect | `--dangerously-skip-permissions` | `/permissions` |
|--------|----------------------------------|----------------|
| Granularity | None — all commands allowed | Per-command pattern matching |
| Team consistency | Each developer configures their own | Shared via `.claude/settings.json` in repo |
| Safety | Zero guardrails | Only pre-approved commands run without confirmation |
| Auditability | No record of what's allowed | Allowlist is version-controlled |

## What to Pre-Allow

Good candidates for pre-approval:
- **Build commands** — `build`, `compile`, `bundle`
- **Test commands** — `test`, `test:unit`, `test:integration`
- **Lint commands** — `lint`, `lint:file`
- **Typecheck commands** — `typecheck`, `tsc`
- **Read-only queries** — `find`, `grep`, database read queries

**Do not pre-allow:**
- Deployment commands (`deploy`, `push`)
- Destructive commands (`rm -rf`, `drop table`)
- Secret-accessing commands
- Package install commands (unless in a sandboxed environment)

## Related Pages

- [Claude Code](../tools/claude-code.md) -- the tool this configures
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) -- other `.claude/settings.json` configuration
- [Agentic Coding Workflow](agentic-coding-workflow.md) -- workflow incorporating these practices
