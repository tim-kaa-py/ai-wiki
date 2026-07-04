---
title: "Extend Claude with skills"
description: "Anthropic's reference on Claude Code Skills as SKILL.md files that load only on invocation, with invocation and execution controls"
type: "summary"
channel: "Claude Code Docs"
date: "2026-04-25"
resource: "https://code.claude.com/docs/en/skills"
pillar: "building"
tags: [claude-code, skills, how-to, reference, workflow, configuration, subagents]
timestamp: "2026-04-25"
source_file: "sources/articles/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
---

# Extend Claude with skills — Summary

**Source:** Claude Code Docs | 2026-04-25 | [Link](https://code.claude.com/docs/en/skills)

## TL;DR

The official reference for Claude Code Skills — the successor to custom commands. Skills are `SKILL.md` files that extend Claude's toolkit; unlike CLAUDE.md, a skill's body loads only when invoked, making long reference material practically free. The key design decisions are invocation control (`disable-model-invocation`, `user-invocable`) and execution context (`context: fork` for isolation in a subagent).

## Key Concepts

### Skills vs CLAUDE.md

CLAUDE.md content is always in context. Skill content loads on demand — when the skill is invoked by you or Claude. This makes skills the right place for long playbooks, checklists, or reference material that would bloat the main context.

### Skills vs Custom Commands

Custom commands (`.claude/commands/`) and skills (`.claude/skills/`) are now unified. Both create `/slash-commands`. Skills add: a directory for supporting files, frontmatter-based invocation control, and the ability for Claude to auto-invoke them. Existing command files keep working; if a skill and command share a name, the skill wins.

### Skill content lifecycle

When invoked, `SKILL.md` content enters the conversation as a single message and stays for the rest of the session — Claude Code does not re-read the file on later turns. After auto-compaction, the most recently invoked skills are re-attached (first 5,000 tokens each, shared 25,000-token budget across all re-attached skills, newest first).

### Invocation control

Two frontmatter flags gate who can trigger a skill:
- `disable-model-invocation: true` — only the user can invoke (removes skill from Claude's context entirely)
- `user-invocable: false` — only Claude can invoke (background knowledge, not a user command)
- Default: both can invoke; description is always in context, body loads on invocation.

### Dynamic context injection

The `` !`command` `` syntax in skill content runs shell commands *before* Claude sees anything. Output replaces the placeholder. This is preprocessing, not something Claude executes.

### Subagent execution

`context: fork` runs the skill in an isolated subagent. The skill body becomes the task prompt. The subagent has no access to conversation history. The `agent` field picks the execution environment (`Explore`, `Plan`, `general-purpose`, or any custom subagent from `.claude/agents/`).

## Key Takeaways

1. **Use skills for repeating playbooks, not facts.** If you keep pasting the same procedure, it belongs in a skill. Factual project context belongs in CLAUDE.md.
   - **How to apply:** Move any CLAUDE.md section that reads like a step-by-step procedure into its own `SKILL.md`.

2. **`disable-model-invocation: true` for side-effect skills.** Deployments, commits, Slack messages — anything you don't want Claude triggering spontaneously.
   - **How to apply:** Add this flag to `/deploy`, `/commit`, `/send-slack-message` and any other action-heavy skills.

3. **`user-invocable: false` for background knowledge.** If the skill is a context-loader (e.g., `legacy-system-context`) rather than an action, hide it from the `/` menu.

4. **Keep `SKILL.md` under 500 lines.** Move detailed reference material to sibling files and reference them from `SKILL.md`.
   - **How to apply:** Audit existing skills and extract large reference blocks to `reference.md` or `examples.md`.

5. **`allowed-tools` in skill frontmatter pre-approves tools for that skill's session.** Useful for git-heavy commit skills or GitHub CLI skills without per-use prompts.
   - **How to apply:** Add `allowed-tools: Bash(git add *) Bash(git commit *)` to a commit skill.

6. **Dynamic injection with `` !`command` ``** lets skills pull live data (PR diffs, environment info) before Claude sees the prompt. The command runs as preprocessing, not as a Claude tool call.

7. **`context: fork` for isolation.** If a skill should not access conversation history or you want a clean execution environment, use `context: fork` and pick the right `agent` type.

8. **Skill descriptions are the trigger.** Claude uses `description` + `when_to_use` to decide whether to auto-invoke. Front-load the key use case; combined text is capped at 1,536 characters in the listing.

9. **Skill permissions can be scoped.** Deny all (`Skill`), allow specific (`Skill(commit)`), or deny specific (`Skill(deploy *)`).

10. **Live change detection within a session.** Edit a skill file and it takes effect immediately — no restart needed (unless you created a brand-new top-level `skills/` directory).

## Notable Commands / Code Snippets

```bash
# Create a personal skill (available across all projects)
mkdir -p ~/.claude/skills/my-skill
```

```yaml
# Minimal skill with invocation control
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(npm *)
---

Deploy $ARGUMENTS to production:
1. Run tests
2. Build
3. Push
```

```yaml
# Skill that runs in a forked subagent with live PR data
---
name: pr-summary
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Context
- PR diff: !`gh pr diff`
- Changed files: !`gh pr diff --name-only`

Summarize the PR above.
```

```yaml
# Indexed argument substitution
---
name: migrate-component
---
Migrate the $0 component from $1 to $2.
```

```
# Deny all skills (in /permissions deny rules)
Skill

# Allow only specific skills
Skill(commit)

# Deny a specific skill
Skill(deploy *)
```

## Related Topics

claude-code, skills, how-to, reference, workflow, configuration, subagents
