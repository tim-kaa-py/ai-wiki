---
title: "Claude Code Skills"
type: "how-to"
pillar: "building"
tags: [claude-code, skills, how-to, configuration, subagents, workflow]
sources:
  - "summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
  - "summaries/2025-10-16_anthropic_agent-skills.md"
  - "summaries/2026-04-25_claude-code-docs_create-plugins.md"
last_updated: "2026-04-25"
---

# Claude Code Skills

How to author, invoke, and constrain Skills in Claude Code. Skills are the successor to custom commands — a `SKILL.md` file plus optional bundled files in `.claude/skills/<skill-name>/` that extends Claude's toolkit. The body of a skill loads only when it is invoked, which makes long playbooks and references practically free.

For the underlying concept (progressive disclosure, why skills exist, design principles), see [Agent Skills](../concepts/agent-skills.md).

## Skills vs CLAUDE.md vs Custom Commands

| | CLAUDE.md | Skills | Custom commands (`.claude/commands/`) |
|--|----------|--------|----------------------------------------|
| Loading | Always in context | Description always; body on invocation | On invocation only |
| Body size cost | Paid every turn | Paid once per session (re-attached after compaction) | Paid per use |
| Auto-invocation | N/A (always on) | Yes — Claude can pick the skill from its description | No — user must type `/name` |
| Bundled files | No | Yes (sibling files in the skill directory) | No |
| Right fit | Project conventions, factual context | Repeatable playbooks, references, action skills | Legacy slash commands |

If a skill and a command share a name, **the skill wins**. Existing command files keep working until you migrate them.

## Where Skills Live

| Scope | Location | Available in |
|-------|----------|--------------|
| Project | `.claude/skills/<name>/SKILL.md` | This project only (commit to repo for team sharing) |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Plugin | `<plugin-root>/skills/<name>/SKILL.md` (alongside `.claude-plugin/plugin.json`) | Wherever the plugin is installed; invoked as `/<plugin-name>:<skill-name>` |

For sharing a set of skills across machines or with teammates, package them as a plugin — see [Claude Code Plugins](claude-code-plugins.md). Skills inside a plugin live at the plugin **root** under `skills/`, not inside `.claude-plugin/`.

```bash
# Personal skill (available across all projects)
mkdir -p ~/.claude/skills/my-skill
```

## Minimal SKILL.md

```yaml
---
name: my-skill
description: Specific, action-oriented description — what it does and when to use it
---

# My Skill

Step-by-step instructions Claude follows when this skill is invoked.
```

The `description` is the discovery signal. A vague description means the skill never triggers. See [Agent Skills § The Description Is the Discovery Signal](../concepts/agent-skills.md#the-description-is-the-discovery-signal).

## Frontmatter Reference

| Field | Purpose | Default |
|-------|---------|---------|
| `name` | Slash command identifier | (required) |
| `description` | What the skill does (loaded into system prompt) | (required) |
| `when_to_use` | Extra trigger guidance, concatenated with description | — |
| `disable-model-invocation` | If `true`, only the user can invoke (skill removed from Claude's context entirely) | `false` |
| `user-invocable` | If `false`, only Claude can invoke (hidden from `/` menu) | `true` |
| `allowed-tools` | Pre-approve tools for this skill's session — e.g. `Bash(git add *) Bash(git commit *)` | — |
| `context` | `fork` runs the skill in an isolated subagent | inline |
| `agent` | Subagent type when `context: fork` — `Explore`, `Plan`, `general-purpose`, or any custom agent from `.claude/agents/` | — |

The combined `description` + `when_to_use` text shown to Claude in the skill listing is **capped at 1,536 characters**. Front-load the key use case.

## Invocation Control

Two flags gate who can trigger a skill. Use them deliberately.

### `disable-model-invocation: true` — User-only

Removes the skill from Claude's context entirely. Use for **side-effect skills** Claude must never trigger spontaneously: `/deploy`, `/commit`, `/send-slack-message`, `/cancel-subscription`.

```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(npm *)
---
```

### `user-invocable: false` — Claude-only

Hides the skill from the `/` menu. Use for **background-knowledge skills** that are context-loaders rather than actions — e.g. `legacy-system-context`, `internal-glossary`. Claude pulls them in when relevant; the user never types them.

### Default — both can invoke

The description sits in Claude's context permanently; the body loads on first invocation.

## Skill Content Lifecycle

When invoked, `SKILL.md` content enters the conversation as a single message and **stays for the rest of the session** — Claude Code does not re-read the file on later turns. Implications:

- Edits to the skill file mid-session take effect on the **next** invocation; the already-loaded copy is fixed.
- After auto-compaction, the most recently invoked skills are re-attached: **first 5,000 tokens each, shared 25,000-token budget across all re-attached skills, newest first**.
- Brand-new top-level `skills/` directory creation requires a Claude Code restart; everything else is live.

### Keep `SKILL.md` Under 500 Lines

Past ~500 lines, move detailed reference material to sibling files (`reference.md`, `examples.md`, `runbook.md`) and reference them from `SKILL.md`. The agent reads the sibling on demand — Level 3 of progressive disclosure. See [Agent Skills § Progressive Disclosure](../concepts/agent-skills.md#progressive-disclosure-three-levels).

## Dynamic Context Injection — `` !`command` ``

The backtick-bang syntax in skill content runs a shell command **before Claude sees anything**. The output replaces the placeholder. This is preprocessing — Claude does not "decide" to run it.

```yaml
---
name: pr-summary
description: Summarize the current PR
allowed-tools: Bash(gh *)
---

## Context
- PR diff: !`gh pr diff`
- Changed files: !`gh pr diff --name-only`

Summarize the PR above.
```

Use for skills that need **live data at invocation time**: PR diffs, environment info, current branch, recent log output. Faster and more reliable than asking Claude to run the command itself.

## Argument Substitution

Use positional placeholders for arguments passed to the slash command:

```yaml
---
name: migrate-component
description: Migrate a component between frameworks
---
Migrate the $0 component from $1 to $2.
```

Invocation: `/migrate-component Button react vue` → `Migrate the Button component from react to vue.`

`$ARGUMENTS` captures the entire argument string.

## Subagent Execution — `context: fork`

`context: fork` runs the skill in an **isolated subagent**:

- The skill body becomes the subagent's task prompt.
- The subagent has **no access to conversation history**.
- The `agent` field selects the execution environment.

```yaml
---
name: explore-module
description: Read a module and report its public API
context: fork
agent: Explore
---

Read every file in $0 and produce a one-page summary of the public API.
```

Use `context: fork` when:
- The skill should not see prior conversation (e.g., security-review of unknown code).
- You want a clean, predictable execution environment.
- The skill consumes a lot of context that would otherwise pollute the main session.

Skip `context: fork` when the skill needs the conversation's existing state.

## Pre-approving Tools — `allowed-tools`

`allowed-tools` lifts permission prompts for the duration of the skill's invocation. Use the same pattern syntax as `/permissions`. Useful for git-heavy commit skills, GitHub CLI skills, or test-runner skills.

```yaml
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git push *)
```

This is per-skill, not session-wide. See [Claude Code Permissions](claude-code-permissions.md) for the broader permission model.

## Constraining Skills via `/permissions`

Skill invocation itself can be allow-listed and deny-listed in `/permissions`:

```
# Deny all skills
Skill

# Allow only specific skills
Skill(commit)

# Deny a specific skill
Skill(deploy *)
```

Combine with `disable-model-invocation` for defense in depth on side-effect skills.

## Skill Authoring Patterns

| Pattern | When to use |
|---------|-------------|
| **Action skill** | Side effects (deploy, commit, send-slack) — set `disable-model-invocation: true` |
| **Playbook skill** | Repeating procedures (release checklist, incident-response runbook) |
| **Context-loader skill** | Background knowledge (legacy-system-context) — set `user-invocable: false` |
| **Forked-subagent skill** | Heavy reads or untrusted execution — set `context: fork`, choose `agent` |
| **Live-data skill** | Skill needs current state — use `` !`command` `` injection in the body |
| **Reference skill** | Long material — split into `SKILL.md` + sibling files; reference them by relative path |

## Migration: Custom Commands → Skills

1. Move `.claude/commands/foo.md` → `.claude/skills/foo/SKILL.md`.
2. Add `name: foo` and a specific `description:` to the frontmatter.
3. If the command was a side effect (deploy, commit), add `disable-model-invocation: true`.
4. If the command needed pre-approved tools, add `allowed-tools:`.
5. Verify both forms still resolve — if you keep the old command file, the skill takes precedence.

## Common Pitfalls

- **Vague descriptions.** "Helps with PRs" → never auto-invoked. Use "Summarize the diff and changed files for the current PR via `gh`."
- **Overstuffed `SKILL.md`.** Past ~500 lines, the body crowds out other context. Split into sibling files.
- **Forgetting `disable-model-invocation` on side-effect skills.** Claude will eventually trigger `/deploy` on its own initiative. Lock it down.
- **Mixing live data and inline text without `` !`command` ``.** Asking Claude to "first run X then..." costs a tool turn that preprocessing would have skipped.
- **Plan mode skills with `context: fork`.** The fork has no conversation history — if you depend on the main thread's plan, do not fork.

## Related Pages

- [Agent Skills](../concepts/agent-skills.md) — concept and progressive-disclosure model
- [Claude Code](../tools/claude-code.md) — the tool this configures
- [Claude Code Permissions](claude-code-permissions.md) — `/permissions` and `Skill(...)` rules
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) — `.claude/settings.json` lifecycle hooks
- [Claude Code Auto Mode](claude-code-auto-mode.md) — classifier-gated permission mode
- [Claude Code Plugins](claude-code-plugins.md) — packaging skills + agents + hooks + monitors for distribution
