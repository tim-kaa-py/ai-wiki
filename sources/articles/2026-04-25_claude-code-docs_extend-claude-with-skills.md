---
title: "Extend Claude with skills"
type: "article"
channel: "Claude Code Docs"
date: "2026-04-25"
resource: "https://code.claude.com/docs/en/skills"
pillar: "building"
tags: [claude-code, skills, how-to, reference, workflow, configuration, subagents]
timestamp: "2026-04-25"
extraction_method: "web-fetch"
---

# Extend Claude with skills

> Create, manage, and share skills to extend Claude's capabilities in Claude Code. Includes custom commands and bundled skills.

Skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`.

Create a skill when you keep pasting the same playbook, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it.

> For built-in commands like `/help` and `/compact`, and bundled skills like `/debug` and `/simplify`, see the commands reference.
>
> **Custom commands have been merged into skills.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way. Your existing `.claude/commands/` files keep working. Skills add optional features: a directory for supporting files, frontmatter to control whether you or Claude invokes them, and the ability for Claude to load them automatically when relevant.

Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard, which works across multiple AI tools. Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection.

## Bundled skills

Claude Code includes a set of bundled skills that are available in every session, including `/simplify`, `/batch`, `/debug`, `/loop`, and `/claude-api`. Unlike most built-in commands, which execute fixed logic directly, bundled skills are prompt-based: they give Claude a detailed playbook and let it orchestrate the work using its tools. You invoke them the same way as any other skill, by typing `/` followed by the skill name.

## Getting started

### Create your first skill

This example creates a skill that teaches Claude to explain code using visual diagrams and analogies. Since it uses default frontmatter, Claude can load it automatically when you ask how something works, or you can invoke it directly with `/explain-code`.

**Step 1: Create the skill directory**

Create a directory for the skill in your personal skills folder. Personal skills are available across all your projects.

```bash
mkdir -p ~/.claude/skills/explain-code
```

**Step 2: Write SKILL.md**

Every skill needs a `SKILL.md` file with two parts: YAML frontmatter (between `---` markers) that tells Claude when to use the skill, and markdown content with instructions Claude follows when the skill is invoked. The `name` field becomes the `/slash-command`, and the `description` helps Claude decide when to load it automatically.

Create `~/.claude/skills/explain-code/SKILL.md`:

```yaml
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.
```

**Step 3: Test the skill**

Let Claude invoke it automatically by asking something that matches the description:

```
How does this code work?
```

Or invoke it directly with the skill name:

```
/explain-code src/auth/login.ts
```

### Where skills live

Where you store a skill determines who can use it:

| Location   | Path                                                | Applies to                     |
| :--------- | :-------------------------------------------------- | :----------------------------- |
| Enterprise | See managed settings                                | All users in your organization |
| Personal   | `~/.claude/skills/<skill-name>/SKILL.md`            | All your projects              |
| Project    | `.claude/skills/<skill-name>/SKILL.md`              | This project only              |
| Plugin     | `<plugin>/skills/<skill-name>/SKILL.md`             | Where plugin is enabled        |

When skills share the same name across levels, higher-priority locations win: enterprise > personal > project. Plugin skills use a `plugin-name:skill-name` namespace, so they cannot conflict with other levels. If you have files in `.claude/commands/`, those work the same way, but if a skill and a command share the same name, the skill takes precedence.

#### Live change detection

Claude Code watches skill directories for file changes. Adding, editing, or removing a skill under `~/.claude/skills/`, the project `.claude/skills/`, or a `.claude/skills/` inside an `--add-dir` directory takes effect within the current session without restarting. Creating a top-level skills directory that did not exist when the session started requires restarting Claude Code so the new directory can be watched.

#### Automatic discovery from nested directories

When you work with files in subdirectories, Claude Code automatically discovers skills from nested `.claude/skills/` directories. For example, if you're editing a file in `packages/frontend/`, Claude Code also looks for skills in `packages/frontend/.claude/skills/`. This supports monorepo setups where packages have their own skills.

Each skill is a directory with `SKILL.md` as the entrypoint:

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example output showing expected format
└── scripts/
    └── validate.sh    # Script Claude can execute
```

## Configure skills

### Types of skill content

**Reference content** adds knowledge Claude applies to your current work. Conventions, patterns, style guides, domain knowledge. This content runs inline so Claude can use it alongside your conversation context.

```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

**Task content** gives Claude step-by-step instructions for a specific action, like deployments, commits, or code generation. These are often actions you want to invoke directly with `/skill-name` rather than letting Claude decide when to run them. Add `disable-model-invocation: true` to prevent Claude from triggering it automatically.

```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

### Frontmatter reference

| Field                      | Required    | Description |
| :------------------------- | :---------- | :---------- |
| `name`                     | No          | Display name. Defaults to directory name. Lowercase letters, numbers, hyphens only (max 64 chars). |
| `description`              | Recommended | What the skill does and when to use it. Front-load the key use case. Combined `description` + `when_to_use` truncated at 1,536 characters. |
| `when_to_use`              | No          | Additional trigger context. Appended to `description` in skill listing. |
| `argument-hint`            | No          | Hint shown during autocomplete, e.g. `[issue-number]`. |
| `arguments`                | No          | Named positional arguments for `$name` substitution. Space-separated string or YAML list. |
| `disable-model-invocation` | No          | `true` prevents Claude from automatically loading this skill. Use for workflows you want to trigger manually. Also prevents preloading into subagents. Default: `false`. |
| `user-invocable`           | No          | `false` hides from `/` menu. For background knowledge users shouldn't invoke directly. Default: `true`. |
| `allowed-tools`            | No          | Tools Claude can use without asking permission when this skill is active. |
| `model`                    | No          | Model to use when this skill is active. Override applies for the rest of the current turn. |
| `effort`                   | No          | Effort level when this skill is active. Options: `low`, `medium`, `high`, `xhigh`, `max`. |
| `context`                  | No          | Set to `fork` to run in a forked subagent context. |
| `agent`                    | No          | Which subagent type to use when `context: fork` is set. |
| `hooks`                    | No          | Hooks scoped to this skill's lifecycle. |
| `paths`                    | No          | Glob patterns that limit when this skill is activated. Claude loads it automatically only for matching files. |
| `shell`                    | No          | Shell for inline commands: `bash` (default) or `powershell`. |

#### Available string substitutions

| Variable               | Description |
| :--------------------- | :---------- |
| `$ARGUMENTS`           | All arguments passed when invoking the skill. |
| `$ARGUMENTS[N]`        | Access a specific argument by 0-based index. |
| `$N`                   | Shorthand for `$ARGUMENTS[N]`. |
| `$name`                | Named argument declared in `arguments` frontmatter. |
| `${CLAUDE_SESSION_ID}` | The current session ID. |
| `${CLAUDE_SKILL_DIR}`  | The directory containing the skill's `SKILL.md` file. |

### Add supporting files

Skills can include multiple files in their directory. Keep `SKILL.md` under 500 lines; move detailed reference material to separate files.

```
my-skill/
├── SKILL.md (required - overview and navigation)
├── reference.md (detailed API docs - loaded when needed)
├── examples.md (usage examples - loaded when needed)
└── scripts/
    └── helper.py (utility script - executed, not loaded)
```

Reference supporting files from `SKILL.md` so Claude knows what each file contains and when to load it.

### Control who invokes a skill

By default, both you and Claude can invoke any skill.

* **`disable-model-invocation: true`**: Only you can invoke the skill. Use for workflows with side effects or that you want to control timing (e.g., `/commit`, `/deploy`, `/send-slack-message`).

* **`user-invocable: false`**: Only Claude can invoke the skill. Use for background knowledge that isn't actionable as a command.

| Frontmatter                      | You can invoke | Claude can invoke | When loaded into context |
| :------------------------------- | :------------- | :---------------- | :----------------------- |
| (default)                        | Yes            | Yes               | Description always in context, full skill loads when invoked |
| `disable-model-invocation: true` | Yes            | No                | Description not in context, full skill loads when you invoke |
| `user-invocable: false`          | No             | Yes               | Description always in context, full skill loads when invoked |

### Skill content lifecycle

When you or Claude invoke a skill, the rendered `SKILL.md` content enters the conversation as a single message and stays there for the rest of the session. Claude Code does not re-read the skill file on later turns.

Auto-compaction carries invoked skills forward within a token budget. When the conversation is summarized, Claude Code re-attaches the most recent invocation of each skill after the summary, keeping the first 5,000 tokens of each. Re-attached skills share a combined budget of 25,000 tokens, filled starting from the most recently invoked skill.

### Pre-approve tools for a skill

The `allowed-tools` field grants permission for listed tools while the skill is active:

```yaml
---
name: commit
description: Stage and commit the current changes
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---
```

### Pass arguments to skills

```yaml
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.
```

Running `/fix-issue 123` replaces `$ARGUMENTS` with `123`.

For indexed access: `$ARGUMENTS[0]`, `$ARGUMENTS[1]` or shorthand `$0`, `$1`.

## Advanced patterns

### Inject dynamic context

The `` !`<command>` `` syntax runs shell commands before the skill content is sent to Claude. The command output replaces the placeholder.

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

For multi-line commands, use a fenced code block opened with ` ```! `.

To disable shell execution for skills from user/project/plugin sources, set `"disableSkillShellExecution": true` in settings.

> To enable extended thinking in a skill, include the word "ultrathink" anywhere in your skill content.

### Run skills in a subagent

Add `context: fork` to your frontmatter when you want a skill to run in isolation. The skill content becomes the prompt that drives the subagent. It won't have access to your conversation history.

| Approach                     | System prompt                             | Task                        | Also loads                   |
| :--------------------------- | :---------------------------------------- | :-------------------------- | :--------------------------- |
| Skill with `context: fork`   | From agent type (`Explore`, `Plan`, etc.) | SKILL.md content            | CLAUDE.md                    |
| Subagent with `skills` field | Subagent's markdown body                  | Claude's delegation message | Preloaded skills + CLAUDE.md |

**Example: Research skill using Explore agent**

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

The `agent` field specifies which subagent configuration to use. Options include built-in agents (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`.

### Restrict Claude's skill access

Three ways to control which skills Claude can invoke:

**Disable all skills** by denying the Skill tool in `/permissions`:
```
Skill
```

**Allow or deny specific skills:**
```
# Allow only specific skills
Skill(commit)
Skill(review-pr *)

# Deny specific skills
Skill(deploy *)
```

Permission syntax: `Skill(name)` for exact match, `Skill(name *)` for prefix match with any arguments.

**Hide individual skills** by adding `disable-model-invocation: true` to their frontmatter.

## Share skills

- **Project skills**: Commit `.claude/skills/` to version control
- **Plugins**: Create a `skills/` directory in your plugin
- **Managed**: Deploy organization-wide through managed settings

## Troubleshooting

**Skill not triggering:**
1. Check the description includes keywords users would naturally say
2. Verify the skill appears in `What skills are available?`
3. Try rephrasing your request to match the description more closely
4. Invoke it directly with `/skill-name` if the skill is user-invocable

**Skill triggers too often:**
1. Make the description more specific
2. Add `disable-model-invocation: true` if you only want manual invocation

**Skill descriptions are cut short:**
Descriptions are truncated to fit the character budget (1% of context window, fallback 8,000 chars). Set `SLASH_COMMAND_TOOL_CHAR_BUDGET` env var to raise the limit. Or trim `description` and `when_to_use` text: each entry's combined text is capped at 1,536 characters regardless of budget.
