---
title: "Claude Code 2.0 & Hidden Features"
source_type: "youtube"
channel: "AICodeKing"
date: "2026-03-30"
url: "https://www.youtube.com/watch?v=pgopk2SFl5Y"
pillar: "building"
tags: [claude-code, cli-commands, automation, hooks, worktrees, custom-agents, voice-input, remote-control]
ingested: "2026-03-30"
source_file: "sources/youtube/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
---

# Claude Code 2.0 & Hidden Features — Summary

**Source:** AICodeKing | 2026-03-30 | [Watch](https://www.youtube.com/watch?v=pgopk2SFl5Y) | 7:13

## TL;DR

A walkthrough of Boris Cherny's (Claude Code builder) thread on underutilized Claude Code features. Covers session mobility, automation loops, hooks, parallel worktrees, custom agents, and voice input — turning Claude Code from a simple chat tool into a full operating environment.

## Video Structure

1. [00:02-00:46] Introduction — Boris Cherny's thread on hidden Claude Code features, credibility framing
2. [00:46-01:30] Session mobility — Claude Code on mobile/web, `--teleport` and `/remote-control`
3. [01:30-02:16] Automation — `/loop` and `/schedule` for recurring workflows
4. [02:16-02:48] Hooks — Deterministic logic at agent lifecycle points
5. [02:48-03:30] Output verification — Dispatch, co-work, Chrome extension, built-in browser
6. [03:30-04:12] Session forking — `/branch` and `/btw` for parallel exploration
7. [04:12-05:16] Parallel work — Git worktrees, `/batch` for fanning out changes
8. [05:16-05:57] Scripted usage — `--bare`, `--add-dir` for programmatic and multi-repo setups
9. [05:57-06:43] Custom agents & voice — `--agent` and `/voice`
10. [06:43-07:11] Conclusion — Claude Code as an operating environment, not a chat tool

## Key Concepts

### Claude Code as Operating Environment

Boris frames Claude Code not as a chat tool but as a full operating environment: mobile, web, desktop, remote control, hooks, loops, branching, worktrees, verification, custom agents, and voice all working together. Most users only use it in "one-shot mode" and leave significant value on the table.

### Output Verification Principle

Boris says the most important tip for using Claude Code is to give Claude a way to verify its own output. If the AI cannot see what it built, it is basically guessing. For front-end work, he uses the Chrome extension; the desktop app can auto-start web servers and test in a built-in browser.

## Key Takeaways

1. **Session mobility lets you start anywhere, finish anywhere.** `--teleport` moves web sessions to terminal; `/remote-control` lets you steer a local session from your phone.
   - **How to apply:** Start complex tasks on mobile, then `claude --teleport` to continue with full local environment.

2. **`/loop` and `/schedule` turn Claude into an automated co-worker.** Recurring tasks like PR babysitting, deploy watching, and review sweeping run on intervals.
   - **How to apply:** `/loop 5m check if the deployment finished` — anything you'd check every N minutes.

3. **Hooks give you deterministic control at agent lifecycle points.** Auto-load context at session start, log bash commands, block edits to protected files, route permissions.
   - **How to apply:** Configure hooks in `~/.claude/settings.json` under `PreToolUse`, `PostToolUse`, `SessionStart`, etc.

4. **`/branch` preserves context while exploring alternatives.** Fork a session to try a different approach without losing your original progress.
   - **How to apply:** `/branch` mid-session, or `claude --resume <id> --fork-session` from CLI.

5. **`/btw` lets you ask side questions without polluting the main thread.** Quick clarification during a long task, ephemeral response.
   - **How to apply:** `/btw what was the name of that config file?` while Claude is working.

6. **Git worktrees enable true parallel work.** Multiple Claude sessions on the same repo, each isolated with independent file state.
   - **How to apply:** `claude --worktree feature-auth` for each parallel task. Use `.worktreeinclude` for gitignored files like `.env`.

7. **`/batch` fans out large changes to parallel agents.** Claude interviews you first, then distributes work to multiple worktree agents, each opening a PR.
   - **How to apply:** `/batch refactor auth to use OAuth2` for codebase-wide migrations.

8. **`--bare` makes Claude deterministic for scripted usage.** Skips hooks, skills, plugins, CLAUDE.md, memory. Fast and reproducible.
   - **How to apply:** `claude --bare -p "Analyze this code" --allowedTools "Read,Edit,Bash"` in CI/CD pipelines.

9. **`--add-dir` gives multi-repo access from one session.** No more switching context between related repos.
   - **How to apply:** `claude --add-dir ../apps ../lib ../config`

10. **Custom agents create specialized, reusable workflows.** Define system prompt, tool restrictions, model, and permissions in `.claude/agents/`.
    - **How to apply:** Create `.claude/agents/code-reviewer.md` with frontmatter: `tools: Read, Grep`, `permissionMode: plan`.

11. **Voice input is underrated.** Boris does a lot of his coding by speaking. Push-to-talk with Space key.
    - **How to apply:** `/config` → enable voice dictation, or `export CLAUDE_CODE_VOICE_DICTATION=true`.

## Notable Commands / Code Snippets

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
