---
title: "Claude Code Auto Mode"
description: "How auto mode's two-stage classifier replaces --dangerously-skip-permissions with safer unattended runs"
type: "how-to"
pillar: "building"
tags: [claude-code, permissions, auto-mode, safety, prompt-injection, classifier]
sources:
  - "summaries/2026-03-25_anthropic_claude-code-auto-mode.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-10-15_claude-code-docs_permission-modes.md"
timestamp: "2026-10-15"
---

# Claude Code Auto Mode

Auto mode is the permission mode where a classifier reviews actions instead of prompting you, and since v2.1.283 it is where most sessions start: "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions. On earlier versions, it's the built-in starting permission mode only on Pro, Max, and Team plans." It is a safer alternative to `--dangerously-skip-permissions`, with a two-stage classifier in place of permission prompts. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

*Earlier versions of this page called auto mode "Anthropic's third permission strategy for Claude Code" and opened with "Auto mode is the right default when:", per Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

## Which Mode a Session Starts In

- **Interactive terminal and VS Code:** `auto` from v2.1.283; on earlier versions only on Pro, Max and Team plans in sessions that fetch feature flags, Manual otherwise.
- **`claude -p` and the Agent SDK:** "`default` in sessions that fetch feature flags." In sessions that don't (third-party provider, telemetry off), `auto` from v2.1.285.
- **`disableAutoMode`:** when "Any settings file sets `disableAutoMode` to `"disable"`", the session starts in `default`; set in managed settings, it also removes `auto` from the `Shift+Tab` cycle.
- **Auto unavailable:** "When the flag, a settings file, or the built-in default selects `auto` but auto mode isn't available to the session, Claude Code starts the session in Manual instead."
- **`defaultMode: auto`:** honoured from `~/.claude/settings.json` or managed settings only: "If you set `"auto"` in `.claude/settings.json` or `.claude/settings.local.json`, the value doesn't take effect".

Manual is the UI name for the `default` config value; the CLI accepts `manual` as an alias. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

## When to Stay in Auto vs Switch to Manual

Stay in auto mode when:

- You want long, uninterrupted agent runs without manually approving every tool call
- The work is contained (feature branch, sandboxed environment, non-critical infra)
- You'd otherwise be tempted to reach for `--dangerously-skip-permissions`

Switch to Manual (`Shift+Tab` once from auto, or `claude --permission-mode default`) for:

- Production systems
- Security-critical code (see [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md))
- Irreversible actions (force push, data deletion, deploys)
- Sensitive work or unfamiliar code, where the docs recommend Manual to "Review every action yourself"

## How It Works

Auto mode layers two classifiers around the actions that reach review (reads and working-directory edits mostly skip the classifier; see the decision order below):

1. **Input layer — prompt-injection detector.** Runs server-side, tags suspicious tool outputs (fetched web pages, issue bodies, etc.) *before* they reach the agent's context.
2. **Output layer — transcript classifier.** A fast single-token filter that escalates flagged actions to a reasoning review. Crucially, **the classifier strips assistant narrative text** so the agent can't rationalize a bad call to the classifier.

### Decision Order (First Match Wins)

"Each action goes through a fixed decision order. The first matching step wins:" *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

| Step | What happens |
|------|-------------|
| 1. Your rules | Actions matching your allow, ask or deny rules resolve immediately, with exceptions: protected-path writes still go to the classifier, no allow rule approves `rm`/`rmdir` of a critical path, and content-matching ask rules such as `Bash(git push *)` still prompt |
| 2. Reads and in-project edits | "Read-only actions and file edits in your working directory are auto-approved, except writes to protected paths and the first read outside the working directories, which prompts you" |
| 3. Classifier | "Everything else goes to the classifier, apart from critical-path removals under their default handling." |
| 4. Block | "If the classifier blocks, Claude receives the reason." Repeated blocks pause auto mode (see Escalation & Halts) |

A mod that handles `tool.check` "can approve an action before step 3, and the classifier doesn't check an action the mod approves."

*Earlier versions of this page described "Three Approval Tiers" (safe-tool allowlist and in-project file ops auto-pass; high-risk / out-of-project goes to classifier review and "may escalate to user") and said auto mode layers two classifiers "around every tool call", per Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

### Escalation & Halts

Repeated blocks pause auto mode; they do not halt the agent: "if the classifier blocks an action 3 times in a row or 20 times total, auto mode pauses and Claude Code resumes prompting. Approving the prompted action resumes auto mode." "The thresholds of 3 blocks in a row and 20 blocks total are not configurable." A run with no human to prompt keeps going: "A non-interactive `-p` run without a `--permission-prompt-tool` has no prompt to fall back to. When repeated blocks reach a threshold, the action doesn't run and Claude keeps working. Claude Code doesn't stop the run." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

Do not confuse this with the server-side review rule below, which stops the turn after ten responses in a row with no verdict.

*Earlier versions of this page stated "After 3 consecutive or 20 total denials, the agent halts. This prevents a stuck agent from repeatedly probing the guard.", per Anthropic Engineering — Claude Code auto mode: a safer way to skip permissions (2026-03-25); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

### Blocked Actions and Missing Verdicts

A single blocked action shows a notification and lands in `/permissions` under the **Recently denied** tab, where pressing `r` retries it with a manual approval. When the classifier gives no verdict (a separate safety check refuses the classifier's own request, or its response doesn't parse), Claude Code denies the action *without* the notification or the Recently denied entry. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** an action that silently fails in auto mode with nothing under Recently denied is a missing verdict, not a classifier block; see the server-side review notes below.

### Server-Side Classifier Review

The classifier does not always run as separate requests from your machine: "In auto mode, Claude Code can ask the server to check the actions that the decision order sends for review, as part of the session's model requests, in place of sending its own classifier requests." This is rolling out on direct Anthropic API connections (interactive, `-p`, Agent SDK, VS Code and desktop sessions, version-gated around v2.1.271 to v2.1.281), and is the default on cloud providers and behind an LLM gateway or proxy from v2.1.278.

- **No review at all** (for example a gateway that drops the review request or results): Claude Code falls back to its own classifier requests.
- **No verdict for one action:** "Claude Code denies the action rather than run it unreviewed", and it "stops the turn after ten responses in a row with no verdict."
- **Opt out:** "To skip asking the server and always use Claude Code's own classifier requests, set `CLAUDE_CODE_AUTO_MODE_SERVER=0`."

In the classifier requests Claude Code sends itself, "the classifier sees user messages, tool calls other than read-only lookups such as file reads and searches, and your CLAUDE.md content. Tool results are stripped from those requests, so hostile content in a file or web page can't manipulate the classifier directly." A PostToolUse hook can annotate a result for the classifier through its `classifierContext` field (v2.1.236+).

**Cost:** the classifier runs on Claude Sonnet 5 by default, not on your `/model` selection. On Enterprise plans and API or cloud-provider accounts, classifier calls count toward token usage and add a round-trip, mainly for shell commands and network operations, since reads and working-directory edits outside protected paths skip it. "Where the server reviews the actions as part of the session's model requests, there are no separate classifier calls to count." *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** behind an LLM gateway or proxy, if actions are denied with no Recently denied entry, suspect that the proxy truncates or rewrites the review results and try `CLAUDE_CODE_AUTO_MODE_SERVER=0`.

### Default Block and Allow Lists

The classifier trusts the working directory and the git remotes configured when the session started; a remote added or repointed mid-session is not trusted. Among the many defaults:

| Blocked by default (selection) | Allowed by default (selection) |
|-------------------------------|-------------------------------|
| Downloading and executing code (`curl \| bash`) | Local file operations in the working directory |
| Production deploys and migrations | Installing dependencies declared in lock files or manifests |
| Force push | Read-only HTTP requests |
| `git reset --hard`, `git checkout -- .`, `git clean -fd`, `git stash drop` and similar discards | Pushing to any branch of the current repository, including the default branch (not deploy-named branches such as `production` or `gh-pages`) |
| Pushing secrets or personal data to a repository known to be public | Reading `.env` and sending credentials to their matching API |
| Launching an agent loop with `--dangerously-skip-permissions` or `--no-sandbox` | Messages between agents in the same multi-agent session |

"Run `claude auto-mode defaults` to print the full rule lists as JSON." Trusted repos, buckets and services go in `autoMode.environment`. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** auto mode pushes and opens matching PRs without asking. If you want a human checkpoint there, add a `permissions.ask` rule such as `Bash(git push *)`; ask rules still force a prompt in auto mode.

### Broad Allow Rules Are Dropped

"On entering auto mode, broad allow rules that grant arbitrary code execution are dropped": blanket `Bash(*)` or `PowerShell(*)`, wildcarded interpreters like `Bash(python*)`, package-manager run commands, `Agent` allow rules and `Monitor` allow rules. "Narrow rules like `Bash(npm test)` stay in effect. Claude Code restores the dropped rules when you leave auto mode." Writes to [protected paths](claude-code-permissions.md#protected-paths) also go to the classifier even when an allow rule matches. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** an allowlist built for Manual mode partly vanishes in auto mode. Keep allowlist entries narrow so they keep working in both modes.

### Boundaries and Approvals You State in Chat

The classifier reads what you say in the conversation:

- **Boundaries** ("don't push", "wait until I review before deploying") block matching actions even when defaults would allow them. "A boundary stays in force until you lift it in a later message. Claude's own judgment that a condition was met does not lift it."
- **But boundaries are not rules:** "The classifier re-reads them from the transcript on each check, so a boundary can be lost if context compaction removes the message that stated it. For a hard guarantee, add a deny rule instead."
- **Approvals must name specifics:** "Naming the verb alone clears nothing, so 'you can force-push' leaves the block in place." An approval covers the one action you named unless you grant it as standing; some blocks your approval cannot reach at all.

*(Source: Claude Code Docs — Choose a permission mode, October 2026)*

**How to apply:** use chat boundaries for short-lived limits; anything that must survive a long or compacted session goes in `permissions.deny`. Approve with the target ("force-push to `feature-x`"), and move routine patterns to `autoMode.allow` instead of re-approving them one at a time.

### Subagents Under Auto Mode

The classifier checks subagent work at three points: the delegated task description at spawn time, each action the subagent takes (same decision order and rules as the parent; "Any `permissionMode` in the subagent's frontmatter is ignored"), and the subagent's work and final report before the parent reads it. A flagged report is still delivered, prefixed with a security warning. *(Source: Claude Code Docs — Choose a permission mode, October 2026)*

## Starting Auto Mode

```bash
claude --permission-mode auto
claude --permission-mode auto -p "fix all lint errors"
```

### `accept-edits` for Ralph Loops

Distinct from auto mode, `--permission-mode accept-edits` is the mode Matt Pocock's Ralph-loop pipeline uses for its single-iteration runner. The docs spell this mode `acceptEdits` and never mention an `accept-edits` spelling, so check that your Claude Code version accepts it before copying the script. Unlike `auto`, `acceptEdits` runs no classifier. Per the docs it "lets Claude create and edit files in your working directory without prompting" and also auto-approves common filesystem Bash commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) on in-scope paths; writes to protected paths, paths outside the working directory, and all other Bash commands except the built-in read-only set still prompt. *(Source: Claude Code Docs — Choose a permission mode, October 2026)* Use it inside a tightly bounded harness where:

- The work surface is a freshly-created git worktree (per-issue isolation; see [Parallel Agent Patterns § Sandcastle](../concepts/parallel-agent-patterns.md#pattern-4-sandcastle--worktreesandbox-afk-pipeline-pocock))
- The implementer prompt is hard-coded with a priority order (critical bug → dev infra → tracer bullet → polish)
- The loop has explicit termination ("no more tasks" sentinel)

Example shape from Matt's `once.sh`:

```bash
claude --permission-mode accept-edits "$(cat <<EOF
$LOOP_PROMPT

## Backlog
$(cat issues/*.md)

## Recent commits
$(git log -5 --oneline)
EOF
)"
```

This is **not** a substitute for `auto` on a general-purpose session — it skips the classifier. Reach for it specifically inside a sandboxed AFK harness, not for interactive use. *(Source: Matt Pocock, AI Engineer 2026)*

*Earlier versions of this page stated that the mode "simply auto-approves edit operations", per Matt Pocock, AI Engineer 2026 (2026-04-24); superseded by Claude Code Docs — Choose a permission mode (2026-10-15) on 2026-10-15.*

## Published Classifier Metrics

| Metric | Value | Meaning |
|--------|-------|---------|
| False positive rate | **0.4%** | Classifier blocks a safe action |
| False negative rate | **17%** | Classifier misses an overeager/harmful action |

**Read the FN rate honestly:** auto mode is much safer than disabled permissions, but it still misses roughly 1 in 6 overeager actions. For prod-critical work use `/permissions` allowlists or `/sandbox`.

## Threat Taxonomy Auto Mode Addresses

1. **Overeager behavior** — agent does more than asked
2. **Honest mistakes** — agent misreads intent
3. **Prompt injection** — tool outputs try to hijack the agent
4. **Model misalignment** — rarer failure mode

Different defenses apply to each. Auto mode targets 1-3; sandboxing adds an OS-level layer for 3-4.

## Combining Mode, Rules and Sandbox

| Strategy | Best for | Granularity | Trade-off |
|----------|----------|-------------|-----------|
| `/permissions` allowlist | Team-shared, version-controlled safe commands | Per-command pattern | Must maintain the list |
| Auto mode (starting mode from v2.1.283) | Default hands-off work | Classifier-gated | 17% FN rate |
| `/sandbox` | Unknown scripts, network-exposed tools | OS-level isolation | Setup cost; some tools won't work inside |

Mix them: narrow allow rules + auto is the typical power-user setup.

## Related Pages

- [Claude Code Permissions](claude-code-permissions.md)
- [Claude Code Sandboxing](claude-code-sandboxing.md)
- [Claude Code](../tools/claude-code.md)
