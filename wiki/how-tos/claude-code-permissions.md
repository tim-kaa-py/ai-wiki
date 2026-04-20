---
title: "Claude Code Permissions"
type: "how-to"
pillar: "building"
tags: [claude-code, permissions, best-practices, security, workflow, auto-mode, sandbox]
sources:
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-03-25_anthropic_claude-code-auto-mode.md"
  - "summaries/2025-10-20_anthropic_claude-code-sandboxing.md"
last_updated: "2026-04-20"
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

## The Three Permission Strategies

Anthropic's canonical guidance is that Claude Code offers **three complementary permission strategies** — not one right answer:

| Strategy | Command | What it does |
|----------|---------|--------------|
| Allowlist | `/permissions` | Pre-approve safe command patterns (covered above) |
| Auto mode | `--permission-mode auto` | Classifier-gated auto-approval for most actions |
| Sandbox | `/sandbox` | OS-level filesystem + network isolation |

These compose. Power-user setup: `/permissions` allowlist for routine commands, `--permission-mode auto` for long autonomous runs, `/sandbox` as the outer ring when running unknown scripts.

### Auto Mode (`--permission-mode auto`)

A two-stage classifier replaces permission fatigue: server-side prompt-injection detector on inputs, transcript classifier on outputs. Three approval tiers (safe-tool allowlist, in-project file ops, high-risk → classifier review).

Published metrics: **0.4% false positive, 17% false negative**. Much safer than `--dangerously-skip-permissions`, but the 17% miss rate means it is **not** a substitute for human review on prod or security-critical systems. Escalation halt: after 3 consecutive or 20 total denials, the agent stops.

See [Claude Code Auto Mode](claude-code-auto-mode.md) for the full how-to.

### Sandbox (`/sandbox`)

OS-level isolation — bubblewrap on Linux, seatbelt on macOS — restricting filesystem and network access. Catches spawned subprocesses (application-level permissioning does not). Internal testing: **-84% permission prompts**. The right choice for scripted / unattended runs and running unknown code.

See [Claude Code Sandboxing](claude-code-sandboxing.md) for the full how-to.

## Related Pages

- [Claude Code Auto Mode](claude-code-auto-mode.md) -- classifier-gated permission mode
- [Claude Code Sandboxing](claude-code-sandboxing.md) -- OS-level isolation
- [Claude Code](../tools/claude-code.md) -- the tool this configures
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) -- other `.claude/settings.json` configuration
- [Agentic Coding Workflow](agentic-coding-workflow.md) -- workflow incorporating these practices
