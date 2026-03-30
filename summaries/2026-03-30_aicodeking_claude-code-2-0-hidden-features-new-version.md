# Claude Code 2.0 & Hidden Features — Tips & Tricks

**Source:** AICodeKing | 2026-03-30 | [Watch](https://www.youtube.com/watch?v=pgopk2SFl5Y) | 7:13

## TL;DR

A walkthrough of Boris Cherny's (Claude Code builder) thread on underutilized Claude Code features. Covers session mobility, automation loops, hooks, parallel worktrees, custom agents, and voice input — turning Claude Code from a simple chat tool into a full operating environment.

## Key Commands & Features

### 1. `/teleport` / `--teleport` — Move a web session to your terminal

**What it does:** Resumes a session started on claude.ai/code in your local terminal, giving you access to local files, MCP servers, and tools.

**Syntax:**
```bash
claude --teleport
```

**When to use:** You started a task on the web or mobile and now need full local environment access to continue.

---

### 2. `/remote-control` / `--remote-control` / `--rc` — Control local session from phone/web

**What it does:** Exposes a locally running Claude Code session so you can control it from claude.ai/code or the Claude mobile app.

**Syntax:**
```bash
# From CLI
claude remote-control --name "My Project"
claude --remote-control "My Project"

# From within a session
/remote-control My Project
/rc
```

**Flags (server mode):**
- `--name "Title"` — Custom session title
- `--spawn <mode>` — `same-dir` (default) or `worktree` (isolated per session)
- `--capacity <N>` — Max concurrent sessions (default 32)
- `--sandbox` / `--no-sandbox` — Filesystem/network isolation

**When to use:** Start work at your desk, continue from your phone. Session runs locally with full environment, you just steer it remotely.

---

### 3. `/loop` — Automate work on intervals

**What it does:** Runs a prompt or slash command repeatedly on a schedule while your session is open.

**Syntax:**
```bash
/loop 5m check if the deployment finished
/loop 20m /review-pr 1234
/loop check the build              # defaults to 10 min
```

**Interval syntax:** `s` (seconds), `m` (minutes), `h` (hours), `d` (days)

**Management:** Ask "what scheduled tasks do I have?" or "cancel the deploy check job"

**Limitations:** Session-scoped only (lost on exit), expires after 3 days, no catch-up for missed fires.

**When to use:** Babysitting PRs, watching deploys, sweeping review comments, pruning stale PRs — anything you'd check every N minutes.

---

### 4. Hooks — Deterministic logic at agent lifecycle points

**What it does:** Runs shell commands, HTTP requests, or LLM calls automatically when Claude Code events fire.

**Configuration** (in `~/.claude/settings.json` or `.claude/settings.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'logging bash command'"
          }
        ]
      }
    ]
  }
}
```

**Key events:**
| Event | When it fires |
|-------|---------------|
| `SessionStart` | Session begins or resumes |
| `PreToolUse` | Before tool execution (can block with exit code 2) |
| `PostToolUse` | After tool succeeds |
| `PermissionRequest` | Permission dialog appears |
| `Notification` | Claude needs attention |
| `FileChanged` | Watched file changes |

**Hook types:** `command` (shell), `http` (POST), `prompt` (LLM yes/no), `agent` (multi-turn subagent)

**When to use:** Auto-format code after edits, block edits to protected files, send notifications, log commands, re-inject context after compaction.

---

### 5. `/branch` / `--fork-session` — Fork a session

**What it does:** Creates a new independent session preserving conversation history up to that point.

**Syntax:**
```bash
# Within a session
/branch

# From command line
claude --resume <session-id> --fork-session
```

**When to use:** You're making progress but want to explore an alternate approach without destroying context. The original session continues unchanged.

---

### 6. `/btw` — Side queries without interrupting work

**What it does:** Ask a quick question while Claude is working. Answer appears in a dismissible overlay, doesn't pollute conversation history.

**Syntax:**
```bash
/btw what was the name of that config file?
/btw remind me what the error was
```

**Characteristics:** Full context visibility, no tool access, single response, ephemeral (not saved).

**When to use:** Quick clarifications while a long task runs, without derailing the main thread.

---

### 7. `--worktree` / `-w` — Parallel sessions in git worktrees

**What it does:** Creates isolated checkout directories so multiple Claude sessions work on the same repo without file conflicts.

**Syntax:**
```bash
claude --worktree feature-auth
claude -w bugfix-123
claude --worktree                  # auto-generated name
```

**Details:**
- Worktrees live at `.claude/worktrees/<name>`
- Branch name: `worktree-<name>`, based on `origin/HEAD`
- Auto-cleanup if no changes; prompts if there are commits
- Use `.worktreeinclude` to copy gitignored files (e.g., `.env`) to worktrees

**When to use:** Working on multiple features/branches simultaneously. Each session gets independent file state but shared git history.

---

### 8. `/batch` — Fan out large changes to parallel agents

**What it does:** Claude interviews you about a large change, then fans the work out to multiple worktree agents in parallel, each opening a PR.

**Syntax:**
```bash
/batch refactor auth to use OAuth2
```

**When to use:** Large-scale migrations, codebase-wide refactors, repetitive changes across many files.

---

### 9. `--bare` — Minimal mode for scripted usage

**What it does:** Starts Claude Code skipping auto-discovery of hooks, skills, plugins, MCP servers, CLAUDE.md, and memory. Deterministic and fast.

**Syntax:**
```bash
claude --bare -p "Analyze this code for bugs"
claude --bare -p "Refactor this" --allowedTools "Read,Edit,Bash"
```

**Pass things back explicitly if needed:**
```bash
claude --bare -p "query" --append-system-prompt "Instructions"
claude --bare -p "query" --settings ./settings.json
claude --bare -p "query" --mcp-config ./mcp.json
```

**When to use:** CI/CD pipelines, scripted automation, SDK-driven usage — anywhere you want reproducible behavior without local config interference.

---

### 10. `--add-dir` — Multi-folder access

**What it does:** Gives Claude access to additional directories beyond the current working directory.

**Syntax:**
```bash
claude --add-dir ../apps ../lib ../config
claude --add-dir /absolute/path relative/path
```

**When to use:** Multi-repo projects, monorepos, or when you need access to shared libraries/configs outside the main project.

---

### 11. `--agent` / `.claude/agents/` — Custom agents with specialized prompts

**What it does:** Starts Claude with a custom system prompt, tool restrictions, model, and permissions.

**Syntax:**
```bash
claude --agent code-reviewer
claude --agent my-custom-agent
```

**Agent definition** (`.claude/agents/my-agent.md`):
```markdown
---
name: my-agent
description: When Claude should use this agent
tools: Read, Grep, Edit
model: sonnet
permissionMode: plan
---

You are a specialized agent for [specific task].
```

**Key frontmatter fields:** `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `isolation`, `hooks`

**Scope hierarchy** (highest wins):
1. `--agents` CLI flag
2. `.claude/agents/` (project)
3. `~/.claude/agents/` (user)
4. Plugin agents

**When to use:** Specialized workflows — code review, debugging, documentation, read-only analysis. Create reusable configs for your team.

---

### 12. `/voice` — Push-to-talk dictation

**What it does:** Enables voice input. Hold Space to record, release to transcribe and insert at cursor.

**Setup:**
```bash
/config    # Toggle "Enable voice dictation"
# or
export CLAUDE_CODE_VOICE_DICTATION=true
```

**When to use:** Hands-free coding, long prompts, accessibility, or when you just prefer talking over typing.

---

## Quick Reference Table

| Command | Type | Use case |
|---------|------|----------|
| `--teleport` | Flag | Web → local session transfer |
| `--remote-control` | Flag/Command | Local → phone/web control |
| `/loop` | Slash command | Recurring automation |
| Hooks | Config | Deterministic lifecycle logic |
| `/branch` | Slash command | Fork session to explore alternatives |
| `/btw` | Slash command | Side questions without interrupting |
| `--worktree` / `-w` | Flag | Parallel isolated sessions |
| `/batch` | Slash command | Fan out parallel changes |
| `--bare` | Flag | Minimal scripted mode |
| `--add-dir` | Flag | Multi-directory access |
| `--agent` | Flag/Config | Custom specialized agents |
| `/voice` | Slash command | Push-to-talk input |

## User Notes

Focus was on building a comprehensive command reference. The video is based on Boris Cherny's thread — someone who builds Claude Code — so these represent real power-user workflows, not theoretical features.

## Related Topics

claude-code, cli-commands, automation, hooks, worktrees, custom-agents, voice-input, remote-control
