---
title: "Claude Code Permissions"
description: "How to configure Claude Code permissions via /permissions instead of the dangerous blanket bypass"
type: "how-to"
pillar: "building"
tags: [claude-code, permissions, best-practices, security, workflow, auto-mode, sandbox]
sources:
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-03-25_anthropic_claude-code-auto-mode.md"
  - "summaries/2025-10-20_anthropic_claude-code-sandboxing.md"
  - "summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
  - "summaries/2026-09-04_ray-amjad_anthropic-just-released-claude-code-mods.md"
  - "summaries/2026-10-14_claude-code-docs_best-practices.md"
  - "summaries/2026-10-15_claude-code-docs_permission-modes.md"
timestamp: "2026-10-15"
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

Not pre-allowing `push` does not create a checkpoint in auto mode: its classifier allows "Pushing to any branch of the repository you're working in, including the default branch" by default. To keep a human checkpoint there, add an explicit `permissions.ask` rule such as `Bash(git push *)`, which still prompts in auto mode. See [Claude Code Auto Mode § Default Block and Allow Lists](claude-code-auto-mode.md#default-block-and-allow-lists). *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

## Three Layers: Mode, Rules, Sandbox

Permissions are three layers that combine, not three peer strategies to pick from. "Modes set the baseline. Layer permission rules on top to pre-approve or block specific tools. Deny rules block in every mode, including `bypassPermissions`." The sandbox is a separate axis: "Permission modes decide whether Claude asks before an action, and the Bash sandbox and outer isolation boundaries decide what an action can reach once it runs." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

| Layer | Set with | What it decides |
|-------|----------|-----------------|
| Mode | `Shift+Tab`, `--permission-mode`, `permissions.defaultMode` | The baseline: whether Claude asks. `auto` is the built-in starting mode for interactive terminal and VS Code sessions from v2.1.283; `-p` and the Agent SDK usually start in Manual (`default`) |
| Rules | `/permissions` (allow, ask, deny) | Pre-approve or block specific tools on top of the mode. Broad allow rules are dropped while in auto mode |
| Sandbox | `/sandbox` | What an action can reach once it runs (OS-level filesystem + network isolation) |

Power-user setup: stay in auto mode (the starting mode) with narrow `/permissions` allow rules and `ask` rules for the checkpoints you want, add `/sandbox` as the outer ring when running unknown scripts, and switch to Manual for sensitive work. Without a classifier, Manual plus the sandbox in auto-allow mode also cuts prompts.

*Earlier versions of this page stated "Anthropic's canonical guidance is that Claude Code offers three complementary permission strategies — not one right answer" and "Power-user setup: `/permissions` allowlist for routine commands, `--permission-mode auto` for long autonomous runs, `/sandbox` as the outer ring when running unknown scripts.", per Anthropic Engineering — Claude Code: Best practices for agentic coding (2025-04-18) and Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

**Installed mods sit outside all three.** Claude Code [mods](../tools/claude-code-mods.md) (v2.1.287+) run with your permissions, are not sandboxed, and per the official docs can approve tool calls before you are asked, including ones an `ask` rule would have stopped. Permission rules constrain Claude's tool calls, not a mod's own code. Install mods only from trusted marketplaces, check them with `claude plugin validate`, and use `--safe-mode`, `"disableAllHooks": true` or (for organisations) `allowManagedModsOnly` to switch them off. *(Source: Ray Amjad, 2026-09-04, read against the official mods docs)* The permission-modes docs confirm the auto-mode side: a mod that handles `tool.check` "can approve an action before step 3, and the classifier doesn't check an action the mod approves." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

### Auto Mode (`--permission-mode auto`)

A two-stage classifier replaces permission fatigue: server-side prompt-injection detector on inputs, transcript classifier on outputs. Decision order, first match wins: your allow/ask/deny rules, then auto-approval of reads and working-directory edits (protected paths excepted), then the classifier for everything else; see [Claude Code Auto Mode § Decision Order](claude-code-auto-mode.md#decision-order-first-match-wins). *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

*Earlier versions of this page stated "Three approval tiers (safe-tool allowlist, in-project file ops, high-risk → classifier review)", per Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

Published metrics: **0.4% false positive, 17% false negative**. Much safer than `--dangerously-skip-permissions`, but the 17% miss rate means it is **not** a substitute for human review on prod or security-critical systems. Repeated blocks: after 3 blocks in a row or 20 in total (not configurable), "auto mode pauses and Claude Code resumes prompting. Approving the prompted action resumes auto mode." A `-p` run without `--permission-prompt-tool` has no prompt to fall back to: the blocked action doesn't run, and "Claude keeps working. Claude Code doesn't stop the run." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

*Earlier versions of this page stated "Escalation halt: after 3 consecutive or 20 total denials, the agent stops.", per Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

See [Claude Code Auto Mode](claude-code-auto-mode.md) for the full how-to.

### Sandbox (`/sandbox`)

OS-level isolation — bubblewrap on Linux, seatbelt on macOS — restricting filesystem and network access. Catches spawned subprocesses (application-level permissioning does not). Internal testing: **-84% permission prompts**. The right choice for scripted / unattended runs and running unknown code.

See [Claude Code Sandboxing](claude-code-sandboxing.md) for the full how-to.

### `dontAsk` for Unattended Scripted Runs

`--permission-mode dontAsk` "denies anything else that would need approval", that is, anything not already pre-approved. Paired with `--allowedTools` in a `claude -p` fan-out loop, it turns the allowlist into a hard boundary for runs nobody is watching:

```bash
claude -p "Migrate $file from Python 2 to Python 3. Return OK or FAIL." \
  --allowedTools "Edit,Bash(git commit *)" \
  --permission-mode dontAsk
```

*(Source: Claude Code Docs — Best practices, October 2026)*

## How Rules Behave Across Modes

"Deny rules block in every mode, including `bypassPermissions`." Allow rules have no effect in `bypassPermissions`, and entering auto mode drops broad allow rules such as `Bash(*)` or `Bash(python*)` (see [Auto Mode § Broad Allow Rules Are Dropped](claude-code-auto-mode.md#broad-allow-rules-are-dropped)). A few actions are never auto-approved in any mode, including tools matched by an explicit ask rule and `rm`/`rmdir` removals of a critical path (filesystem root, top-level directories, home, the working directory and its parents), which "no allow rule or `PreToolUse` hook `"allow"` approves." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

## Protected Paths

"Writes to a small set of paths are never auto-approved, except in `bypassPermissions` mode and in interactive terminal sessions in plan mode with bypass permissions available." The set covers repository and tool configuration: directories such as `.git`, `.vscode`, `.idea`, `.husky`, `.devcontainer` and `.claude` (with exceptions such as `.claude/worktrees/` and auto-memory Markdown files), and files such as `.gitconfig`, shell rc files (`.bashrc`, `.zshrc`, `.profile`, `.envrc`), `.npmrc`, `.pre-commit-config.yaml`, `.mcp.json` and `.claude.json`.

| Mode | Protected-path writes |
|------|----------------------|
| Manual (`default`), `acceptEdits` | Prompted |
| `plan` | Allowed with bypass available in an interactive terminal; otherwise routed to the classifier when auto mode is available, prompted when not |
| `auto` | Routed to the classifier |
| `dontAsk` | Denied |
| `bypassPermissions` | Allowed |

Allow rules cannot change this table: "`permissions.allow` rules in settings files do not pre-approve protected-path writes. The safety check runs before Claude Code evaluates allow rules from settings, so an entry such as `Edit(.claude/**)` in `~/.claude/settings.json` or `.claude/settings.json` does not change the per-mode outcome in the table above." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** don't add `Edit(.claude/**)` to silence prompts while Claude edits skills or settings; it does nothing. Pick the session-scoped prompt option instead ("Yes, and allow Claude to edit files in this project's .claude folder for this session", or the `~/.claude` equivalent).

## Scoping Skill Invocation

Skills can be allow- or deny-listed in `/permissions` using the same pattern syntax as bash commands:

```
# Deny all skills
Skill

# Allow only a specific skill
Skill(commit)

# Deny a specific skill (and any sub-arguments)
Skill(deploy *)
```

This composes with skill-frontmatter flags (`disable-model-invocation`, `user-invocable`) for defense in depth — the frontmatter governs *who* can invoke; `/permissions` governs *whether the invocation goes through at all*. Lock down side-effect skills (`deploy`, `commit`, `send-slack-message`) with both layers.

Skills can also pre-approve their own tools via `allowed-tools` in frontmatter (e.g. `allowed-tools: Bash(git add *) Bash(git commit *)`), so a commit skill runs without per-call prompts. See [Claude Code Skills](claude-code-skills.md).

## Related Pages

- [Claude Code Auto Mode](claude-code-auto-mode.md) -- classifier-gated permission mode
- [Claude Code Sandboxing](claude-code-sandboxing.md) -- OS-level isolation
- [Claude Code](../tools/claude-code.md) -- the tool this configures
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) -- other `.claude/settings.json` configuration
- [Agentic Coding Workflow](agentic-coding-workflow.md) -- workflow incorporating these practices
- [Claude Code Skills](claude-code-skills.md) -- frontmatter-level invocation control and tool allowlists
- [Claude Code Mods](../tools/claude-code-mods.md) -- extensions that run outside the permission layers and can pre-approve `ask`-gated calls
