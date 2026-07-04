---
title: "How Claude Code works"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/how-claude-code-works"
pillar: "building"
tags: [claude-code, agentic-loop, harness-engineering, tools, sessions, context-management, best-practices]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# How Claude Code works

> Understand the agentic loop, built-in tools, and how Claude Code interacts with your project.

Claude Code is an agentic assistant that runs in your terminal. While it excels at coding, it can help with anything you can do from the command line: writing docs, running builds, searching files, researching topics, and more.

## The agentic loop

When you give Claude a task, it works through three phases: **gather context**, **take action**, and **verify results**. These phases blend together. Claude uses tools throughout, whether searching files to understand your code, editing to make changes, or running tests to check its work.

The loop adapts to what you ask. A question about your codebase might only need context gathering. A bug fix cycles through all three phases repeatedly. A refactor might involve extensive verification.

The agentic loop is powered by two components: models that reason and tools that act. Claude Code serves as the **agentic harness** around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent.

### Models

Claude Code uses Claude models to understand your code and reason about tasks. Multiple models are available with different tradeoffs. Sonnet handles most coding tasks well. Opus provides stronger reasoning for complex architectural decisions. Switch with `/model` during a session or start with `claude --model <name>`.

### Tools

Tools are what make Claude Code agentic. Without tools, Claude can only respond with text. With tools, Claude can act: read your code, edit files, run commands, search the web, and interact with external services.

The built-in tools fall into five categories:

| Category | What Claude can do |
|---|---|
| **File operations** | Read files, edit code, create new files, rename and reorganize |
| **Search** | Find files by pattern, search content with regex, explore codebases |
| **Execution** | Run shell commands, start servers, run tests, use git |
| **Web** | Search the web, fetch documentation, look up error messages |
| **Code intelligence** | See type errors and warnings after edits, jump to definitions, find references |

Claude also has tools for spawning subagents, asking questions, and other orchestration tasks.

Example of the agentic loop in action for "fix the failing tests":
1. Run the test suite to see what's failing
2. Read the error output
3. Search for the relevant source files
4. Read those files to understand the code
5. Edit the files to fix the issue
6. Run the tests again to verify

## What Claude can access

When you run `claude` in a directory, Claude Code gains access to:
- **Your project.** Files in your directory and subdirectories.
- **Your terminal.** Any command you could run from the command line.
- **Your git state.** Current branch, uncommitted changes, and recent commit history.
- **Your CLAUDE.md.** Persistent project-specific instructions.
- **Auto memory.** Learnings Claude saves automatically (first 200 lines or 25KB of MEMORY.md).
- **Extensions.** MCP servers, skills, subagents, and Claude in Chrome.

## Execution environments

| Environment | Where code runs | Use case |
|---|---|---|
| **Local** | Your machine | Default. Full access to your files, tools, and environment |
| **Cloud** | Anthropic-managed VMs | Offload tasks, work on repos you don't have locally |
| **Remote Control** | Your machine, controlled from a browser | Use the web UI while keeping everything local |

## Sessions

Claude Code saves your conversation locally as you work. Each message, tool use, and result is written to a plaintext JSONL file under `~/.claude/projects/`.

**Sessions are independent.** Each new session starts with a fresh context window, without conversation history from previous sessions. Claude can persist learnings across sessions using auto memory, and you can add your own persistent instructions in CLAUDE.md.

### Resume or fork sessions

Resuming a session with `claude --continue` or `claude --resume` reopens it under the same session ID. Forking with `--fork-session` or `/branch` copies the history into a new session ID, leaving the original unchanged.

### The context window

Claude's context window holds your conversation history, file contents, command outputs, CLAUDE.md, auto memory, loaded skills, and system instructions. As you work, context fills up. Claude compacts automatically, but instructions from early in the conversation can get lost. Put persistent rules in CLAUDE.md, and run `/context` to see what's using space.

When context fills up, Claude Code manages it automatically — clearing older tool outputs first, then summarizing. To control what's preserved during compaction, add a "Compact Instructions" section to CLAUDE.md or run `/compact` with a focus.

## Safety: checkpoints and permissions

**Checkpoints:** Before Claude edits any file, it snapshots the current contents. Press `Esc` twice to rewind to a previous state, or ask Claude to undo. Checkpoints are local to your session, separate from git.

**Permission modes** (cycle with Shift+Tab):
- **Default**: Claude asks before file edits and shell commands
- **Auto-accept edits**: Claude edits files and runs common filesystem commands without asking
- **Plan mode**: Claude uses read-only tools only, creating a plan you can approve before execution
- **Auto mode**: Claude evaluates all actions with background safety checks (research preview)

## Working effectively with Claude Code

- **It's a conversation.** Start with what you want, then refine. Interrupt at any point to steer.
- **Be specific upfront.** Reference specific files, mention constraints, point to example patterns.
- **Give Claude something to verify against.** Include test cases, paste screenshots, define expected output.
- **Explore before implementing.** Use plan mode to analyze the codebase first, then implement.
- **Delegate, don't dictate.** Give context and direction, trust Claude to figure out the details.
