---
title: "Best practices for Claude Code (October 2026)"
type: "summary"
description: "Since May 2026 the page has added four verification gating levels, an adversarial review step, auto mode as the default permission mode from v2.1.283 and new parallel-work options, and has dropped the 200-line CLAUDE.md cap, the \"YOU MUST\" emphasis advice and per-action checkpoints."
channel: "Anthropic (Claude Code Docs)"
date: "2026-10-14"
resource: "https://code.claude.com/docs/en/best-practices"
pillar: "building"
tags: [claude-code, best-practices, claude-md, hooks, subagents, verification, workflow, context-management, permissions, code-review]
timestamp: "2026-10-14"
source_file: "sources/docs/2026-10-14_claude-code-docs_best-practices.md"
---

# Best practices for Claude Code (October 2026) — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-10-14 | [Link](https://code.claude.com/docs/en/best-practices) | Docs page, ~600 lines of raw markdown

**Previous version:** [Best practices for Claude Code (May 2026)](2026-05-06_claude-code-docs_best-practices.md)

## TL;DR

The root constraint is unchanged: context fills fast and performance degrades as it fills. What changed is the page's centre of gravity. Verification is now a ladder of four gates, from a single prompt up to a Stop hook or a second-opinion subagent, and a new section tells you to have a fresh-context reviewer check the diff before you count work as done. Auto mode is now the built-in default permission mode from v2.1.283, and several specific rules from May (the 200-line CLAUDE.md cap, "YOU MUST", per-action checkpoints) are gone or reworded.

## What changed since May 2026

The May copy was a condensed web-fetch, so prose missing from it may simply have been elided. The table counts as new only features, flags or defaults May lacked, or wording that conflicts with May.

| Section | Status | What changed |
| - | - | - |
| Give Claude a way to verify its work | Changed | Four gating levels: "In one prompt", "Across a session" (a "`/goal` condition"), "As a deterministic gate" (a "Stop hook") and "By a second opinion" (a "verification subagent" or "dynamic workflow"). New: "Run `/verify` yourself after Claude's check passes" and "Have Claude show evidence rather than asserting success". May's "single highest-leverage thing you can do" framing is replaced by "It's the difference between a session you watch and one you walk away from." |
| Write an effective CLAUDE.md | Changed | The 200-line target is gone. New per-line test: *"Would removing this cause Claude to make mistakes?"* New tools: "Run `/context` to confirm Claude loaded the file" and "run `/doctor` and Claude proposes cuts for content it can derive from the codebase". New routing: "For domain knowledge or workflows that are only relevant sometimes, use skills instead." Emphasis is now "add emphasis such as \"IMPORTANT\" to that line alone. If you emphasize many lines, none of them stands out." |
| Configure permissions | Changed | "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions". "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." The approve-everything mode is now named: "Switch to Manual mode when you want to approve edits and commands yourself." In May, auto mode was one of three ways to reduce interruptions, not the default. |
| Connect MCP servers | New | "Run `claude mcp add` with a server name and URL or command to connect external tools like Notion, Figma, or your database." |
| Install plugins | New | "Run `/plugin` to browse the marketplace." Recommends a "code intelligence plugin" for typed languages "to give Claude precise symbol navigation and automatic error detection after edits." |
| Let Claude interview you | Changed | After the spec, "start a fresh session to execute it". Good specs "name the files and interfaces involved, state what is out of scope, and end with an end-to-end verification step that proves the feature works." |
| Course-correct / Manage context | Changed | `/rewind` can now "summarize from a selected message", with **Summarize from here** or **Summarize up to here**. `/btw`: "The answer never enters conversation history" (May described a "dismissible overlay"). |
| Rewind with checkpoints | Changed (conflicts) | "Every prompt you send that starts a turn creates a checkpoint." May said every action did. New warning: "Checkpoints only track changes made through Claude's file editing tools. Changes made through Bash commands or external processes are not captured. This isn't a replacement for git." |
| Run non-interactive mode | Changed | "The run still creates a resumable session unless you pass `--no-session-persistence`." Adds `--output-format stream-json --verbose`. |
| Run multiple Claude sessions | Changed | New options: "Cross-session messaging", "Agent view: research preview. Run `claude agents`". Agent teams are now qualified as "experimental and disabled by default". |
| Fan out across files | Changed | New: "Run `/batch <instruction>` to have Claude split the change across 5 to 30 subagents. Each subagent works in its own worktree." The loop example now migrates "Python 2 to Python 3", returns "OK or FAIL" and adds `--permission-mode dontAsk`, which "denies anything else that would need approval". |
| Run autonomously with auto mode | New | "A classifier model reviews commands before they run". In `-p` runs, when the classifier repeatedly blocks actions, "Claude Code doesn't stop the run." |
| Add an adversarial review step | New | "Before treating a task as done, have a subagent review the diff in a fresh context and report gaps." Points to the bundled "`/code-review` skill" for correctness checks. |
| Avoid common failure patterns | Changed | Over-specified CLAUDE.md fix now reads: "If Claude already does something correctly without the instruction, delete it or convert it to a hook." |

## Removed since May

- **The 200-line CLAUDE.md cap.** May: "Keep CLAUDE.md under 200 lines." This page now says only "Keep it concise" plus the per-line test. The target has moved, not been withdrawn: the Claude Code memory docs page (https://code.claude.com/docs/en/memory, checked 2026-10-14) still says "target under 200 lines per CLAUDE.md file". That quote is from the memory page, not from this source.
- **"YOU MUST" as an emphasis example.** May suggested "IMPORTANT", "YOU MUST" to improve adherence. Now only "IMPORTANT" appears, and only for "that line alone".
- **Per-action checkpoints.** May's "Every action Claude makes creates a checkpoint" is replaced by one checkpoint per prompt that starts a turn.
- **The React to Vue fan-out example.** Replaced by a Python 2 to Python 3 migration with `--permission-mode dontAsk`.
- **Auto mode as an opt-in.** May listed it as one of three ways to cut prompts. It is now the default (version- and plan-dependent, see takeaway 5), and Manual mode is the opt-in.

## Key Takeaways

1. **Advisory vs deterministic (A).** "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens." The failure-pattern fix sharpens this into a pruning rule: a CLAUDE.md line Claude already obeys without being told is either dead weight or something that should be enforced, so "delete it or convert it to a hook."
   - **How to apply:** When pruning CLAUDE.md, sort each line three ways: Claude would get it wrong without it (keep), Claude already does it (delete), it must happen every time with zero exceptions (move to a hook). Use `/doctor` on a checked-in file for suggested cuts and `/context` to confirm what loaded.

2. **The worker shouldn't grade itself (B).** A fresh-context reviewer "sees only the diff and the criteria you give it, not the reasoning that produced the change, so it evaluates the result on its own terms." The same idea drives the fourth verification gate, where a second model tries "to refute the result, so the agent doing the work isn't the one grading it."
   - **How to apply:** For correctness, run `/code-review`. For conformance to a plan, write the review prompt yourself and name three things: the work to check, the plan to check it against, and what counts as a finding (see the prompt below).

3. **Reviewers over-report (C).** "A reviewer prompted to find gaps will usually report some, even when the work is sound, because that is what it was asked to do. Chasing every finding leads to over-engineering". The page's fix: "Tell the reviewer to flag only gaps that affect correctness or the stated requirements, and treat the rest as optional."
   - **How to apply:** End every review prompt with a scope line such as "Report gaps, not style preferences", and triage findings into must-fix (correctness, requirements) and optional before acting on any.

4. **Checkpoints aren't git (D).** "Checkpoints only track changes made through Claude's file editing tools. Changes made through Bash commands or external processes are not captured." A `sed`, a code generator or a `git checkout` run through Bash will not be undone by `/rewind`.
   - **How to apply:** Commit before letting Claude "try something risky" that involves shell commands, and treat `/rewind` as an undo for file-tool edits and conversation only.

5. **Defaults depend on version and plan (E).** "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions". "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." A claim like "Claude Code defaults to auto mode" is only true with that qualifier.
   - **How to apply:** In wiki pages, state the version (and plan, where relevant) next to any claim about a default. Check `claude --version` before relying on default permission behaviour, and switch to Manual mode when you want to approve each edit and command.

6. **Verification is a ladder, not a single step.** "Once the check exists, decide how hard it gates the stop". "Each step trades setup for attention. The prompt version works on any task today. The `/goal` and Stop hook versions are what let an unattended run finish correctly without you."
   - **How to apply:** Pick the gate by how long you will be away: a prompt for supervised work, `/goal` for a session-long condition, a Stop hook when the check must pass before the turn can end, and a verification subagent when the worker should not grade itself. Ask for evidence (test output, the command and its result, a screenshot) rather than a claim of success.

## Argument Structures

- **Why verification matters:** "Claude stops when the work looks done." Without a runnable check, "'looks done' is the only signal available, and you become the verification loop". A check that returns pass or fail means "the loop closes on its own" → so a runnable check is the difference between watching a session and walking away from it.
- **Why an adversarial reviewer, and why to restrain it:** longer unattended runs → "the more an independent check matters" → a fresh subagent judges the diff without the producing reasoning → but a reviewer asked for gaps will find some regardless → so restrict findings to correctness and stated requirements, or you get "extra abstraction layers, defensive code, and tests for cases that can't happen."

## Notable Commands / Code Snippets

Adversarial review against a plan (verbatim from the page):

```text
Use a subagent to review the rate limiter diff against PLAN.md. Check that
every requirement is implemented, the listed edge cases have tests, and
nothing outside the task's scope changed. Report gaps, not style preferences.
```

Unattended fan-out with a hard permission boundary:

```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from Python 2 to Python 3. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)" \
    --permission-mode dontAsk
done
```

Auto mode in a non-interactive run, and an MCP server connection:

```bash
claude --permission-mode auto -p "fix all lint errors"
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

New commands and flags since May:

```text
/verify                    # confirm the change against the running app
/goal                      # session-long check re-evaluated after every turn
/context                   # confirm CLAUDE.md loaded
/doctor                    # proposes cuts to a checked-in CLAUDE.md
/code-review               # bundled skill: fresh-subagent review of the diff
/batch <instruction>       # split a change across 5 to 30 subagents, one worktree each
/plugin                    # browse the plugin marketplace
claude agents              # agent view (research preview)
--no-session-persistence   # claude -p without a resumable session
--permission-mode dontAsk  # deny anything not pre-approved
```

## User Notes

- Focus for this re-ingest: what changed since the 2026-05-06 ingest. The May copy was a condensed web-fetch, so absence from May was not treated as "new" unless it is a feature, flag or default May lacked, or wording that conflicts.
- Confirmed discoveries A to E map to takeaways 1 to 5.
- The 200-line cap moved to the memory page rather than disappearing; wiki pages citing it should cite the memory page.

## Related Topics

claude-code, best-practices, claude-md, hooks, subagents, verification, workflow, context-management, permissions, code-review
