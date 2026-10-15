---
title: "Choose a permission mode"
type: "summary"
description: "Claude Code's permission-modes reference: auto is the built-in starting mode for interactive terminal and VS Code sessions from v2.1.283 while -p and the Agent SDK usually start in Manual (`default`), Shift+Tab cycles auto → Manual → acceptEdits → plan, and repeated classifier blocks pause auto mode interactively but never stop a -p run."
channel: "Anthropic (Claude Code Docs)"
date: "2026-10-15"
resource: "https://code.claude.com/docs/en/permission-modes"
pillar: "building"
tags: [claude-code, permissions, auto-mode, safety, sandbox, workflow]
timestamp: "2026-10-15"
source_file: "sources/docs/2026-10-15_claude-code-docs_permission-modes.md"
---

# Choose a permission mode — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-10-15 | [Link](https://code.claude.com/docs/en/permission-modes) | Docs page, ~790 lines of raw markdown

Quotes below are verbatim from the source. Link URLs are dropped and the link text kept.

## TL;DR

Auto mode is no longer an opt-in for long runs: from v2.1.283 it is where interactive terminal and VS Code sessions start, while `-p` and the Agent SDK mostly still start in Manual, whose config value is `default`. Modes are only the baseline; permission rules layer on top, and the sandbox is a separate axis that decides what an action can reach. The old "halt after 3 consecutive or 20 total denials" is now a pause back to prompting in interactive sessions, and a `-p` run without a prompt tool just keeps working.

## What this settles

### Starting mode, Manual as `default`, and how modes, rules and sandbox relate

Starting mode by version and surface:

> With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions. On earlier versions, it's the built-in starting permission mode only on Pro, Max, and Team plans.

> With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions on every plan and provider.

`-p` and the Agent SDK (built-in default table):

> | `claude -p` or the Agent SDK | `default` in sessions that fetch feature flags. In sessions that don't, such as on a third-party provider or with telemetry off, `auto` with Claude Code v2.1.285 or later and `default` on earlier versions. A session in an organization whose policy withholds the `auto` default starts in `default` instead |

> | In a terminal or through the VS Code extension | `auto` with Claude Code v2.1.283 or later; on earlier versions, `auto` on Pro, Max, or Team plans in sessions that fetch feature flags, and `default` otherwise |

Fallback when auto isn't available:

> When the flag, a settings file, or the built-in default selects `auto` but auto mode isn't available to the session, Claude Code starts the session in Manual instead.

Manual is the UI name for `default`:

> The mode that reviews every action is named **Manual** in the CLI, in `claude --help`, in the VS Code and JetBrains extensions, and in the desktop app. Its config value is `default`, which is what hooks and SDK integrations use. The CLI accepts `manual` as an alias wherever you type the value, for example `claude --permission-mode manual` or `"defaultMode": "manual"`.

Modes as a baseline, rules on top:

> Modes set the baseline. Layer permission rules on top to pre-approve or block specific tools. Deny rules block in every mode, including `bypassPermissions`.

The sandbox as a separate axis:

> Permission modes decide whether Claude asks before an action, and the Bash sandbox and outer isolation boundaries decide what an action can reach once it runs.

> The Bash sandbox and auto mode work independently and combine, with the exceptions listed under Sandbox modes.

### Shift+Tab cycle order

> **During a session**: press `Shift+Tab` to cycle permission modes. From `auto`, the first press switches to `default`, and the cycle then runs `default` → `acceptEdits` → `plan`. Optional modes slot in after `plan`.

> Enabled optional modes slot in after `plan`, with `bypassPermissions` first and `auto` last. If you have both enabled, you will cycle through `bypassPermissions` on the way to `auto`.

> `dontAsk`: never appears in the cycle; set it with `--permission-mode dontAsk`

### Repeated-block thresholds, interactive vs `-p`

Interactive: auto mode pauses and prompting resumes; it does not halt.

> **Repeated blocks**: if the classifier blocks an action 3 times in a row or 20 times total, auto mode pauses and Claude Code resumes prompting. Approving the prompted action resumes auto mode.

Not configurable, and how the counters behave:

> The thresholds of 3 blocks in a row and 20 blocks total are not configurable. The total counter persists for the session and resets only when its own limit triggers a fallback.

`-p`: the run continues.

> A non-interactive `-p` run without a `--permission-prompt-tool` has no prompt to fall back to. When repeated blocks reach a threshold, the action doesn't run and Claude keeps working. Claude Code doesn't stop the run.

### `claude agents`

This page does not mention `claude agents`. It links to agent view only when discussing background sessions (`claude --bg`) and their scratch directory, so the `claude agents` ledger entry stays open.

## Key Takeaways

1. **Protected paths are never auto-approved, and allow rules can't change that.** Writes to `.git`, `.claude`, `.vscode`, shell rc files such as `.zshrc`, `.mcp.json` and similar are prompted in Manual and `acceptEdits`, routed to the classifier in auto, denied in `dontAsk`, and allowed only in `bypassPermissions` (and plan mode with bypass available).

   > Writes to a small set of paths are never auto-approved, except in `bypassPermissions` mode and in interactive terminal sessions in plan mode with bypass permissions available.

   > `permissions.allow` rules in settings files do not pre-approve protected-path writes. The safety check runs before Claude Code evaluates allow rules from settings, so an entry such as `Edit(.claude/**)` in `~/.claude/settings.json` or `.claude/settings.json` does not change the per-mode outcome in the table above.

   **How to apply:** Don't add `Edit(.claude/**)` to silence prompts; it does nothing. When Claude needs to edit skills or settings, use the session-scoped option the prompt offers ("Yes, and allow Claude to edit files in this project's .claude folder for this session").

2. **A boundary you state in chat holds until you lift it, but it can be compacted away; approvals must name specifics.**

   > A boundary stays in force until you lift it in a later message. Claude's own judgment that a condition was met does not lift it.

   > Boundaries are not stored as rules. The classifier re-reads them from the transcript on each check, so a boundary can be lost if context compaction removes the message that stated it. For a hard guarantee, add a deny rule instead.

   > Naming the verb alone clears nothing, so "you can force-push" leaves the block in place.

   > an approval covers the destructive action you named, so a later action is blocked again unless you granted the approval as standing.

   **How to apply:** Use "don't push" in chat for short-lived limits; anything that must survive a long session goes in `permissions.deny`. When approving a blocked action, name the target ("force-push to `feature-x`"), and move routine patterns to `autoMode.allow` instead of re-approving each one.

3. **The classifier can run server-side, inside the session's own model requests; no verdict means denied.**

   > In auto mode, Claude Code can ask the server to check the actions that the decision order sends for review, as part of the session's model requests, in place of sending its own classifier requests.

   > **The server gives no verdict for an action**: Claude Code denies the action rather than run it unreviewed.

   > **No verdict from the server**: under server-side classifier review, Claude Code denies an action the server gives no verdict for, and stops the turn after ten responses in a row with no verdict.

   > To skip asking the server and always use Claude Code's own classifier requests, set `CLAUDE_CODE_AUTO_MODE_SERVER=0`.

   **How to apply:** If actions are denied with no "Recently denied" entry, especially behind an LLM gateway or proxy, suspect missing server verdicts and try `CLAUDE_CODE_AUTO_MODE_SERVER=0`.

4. **Entering auto mode drops broad allow rules and applies a default block and allow list.**

   > On entering auto mode, broad allow rules that grant arbitrary code execution are dropped:

   The list covers blanket `Bash(*)` or `PowerShell(*)`, wildcarded interpreters like `Bash(python*)`, package-manager run commands, `Agent` allow rules and `Monitor` allow rules.

   > Narrow rules like `Bash(npm test)` stay in effect. Claude Code restores the dropped rules when you leave auto mode.

   Blocked by default includes `curl | bash`, force push, `git reset --hard` and similar discards, production deploys, and pushing secrets to a public repo. Allowed by default includes local file operations in the working directory, installing declared dependencies, read-only HTTP requests, and pushing to any branch of the current repo.

   > Run `claude auto-mode defaults` to print the full rule lists as JSON.

   **How to apply:** Don't rely on a broad allow rule in auto mode, because it is silently set aside. Use narrow rules, run `claude auto-mode defaults` to see what the classifier blocks, and add `permissions.ask` rules (e.g. `Bash(git push *)`) where you want a human checkpoint that auto mode would otherwise skip.

## Related Topics

claude-code, permissions, auto-mode, safety, sandbox, workflow
