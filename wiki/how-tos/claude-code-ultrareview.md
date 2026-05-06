---
title: "Ultrareview (Claude Code)"
type: "how-to"
pillar: "building"
tags: [claude-code, ultrareview, code-review, multi-agent, cloud, pr-automation, research-preview, ci-integration]
sources:
  - "summaries/2026-05-06_claude-code-docs_ultrareview.md"
last_updated: "2026-05-06"
---

# Ultrareview (Claude Code)

`/ultrareview` launches a fleet of reviewer agents in a **remote sandbox** to find and **independently verify** bugs before merging. The key differentiator vs. local `/review`: every finding is reproduced and confirmed by independent agents (higher signal, fewer false positives), runs entirely remotely so your terminal stays free, and takes 5-10 minutes. Costs ~$5-20 per review as extra usage beyond plan (3 free runs for Pro/Max through May 5, 2026, then billed).

## Independent Verification Is the Core Value

Every finding is reproduced by a separate agent before being surfaced — not just "Claude noticed this pattern" but "multiple agents independently confirmed this is a real bug." This filters out the false positives that single-pass reviews generate.

**Use ultrareview for pre-merge confidence on substantial changes**, not as a fast feedback loop while iterating. Reserve it for when you want to ship confidently.

## Two Modes

| Invocation | What it reviews |
|------------|-----------------|
| `/ultrareview` | Diff between current branch and default branch (including uncommitted/staged changes) |
| `/ultrareview 1234` | GitHub PR #1234 — the remote sandbox clones it directly |

PR mode requires a `github.com` remote on the repo.

## Background Execution

After confirmation, the review runs entirely in the background — your terminal stays free. Switch to other work or another session. When done, findings appear as a notification with file locations and explanations.

```
/tasks   # Check status / stop a running review
```

Each finding includes enough context to ask Claude to fix it directly.

## Non-Interactive CI Mode

`claude ultrareview` (subcommand, **not** slash command) blocks until the review finishes and prints findings to stdout. Supports `--json`, `--timeout`. Exit codes: 0 success, 1 failure, 130 Ctrl-C (the remote keeps running — Ctrl-C does NOT cancel the remote review).

```bash
# CI integration
claude ultrareview              # Diff vs default branch
claude ultrareview 1234         # PR #1234
claude ultrareview origin/main  # Diff vs specific branch
claude ultrareview 1234 --json  # Structured output (bugs.json)
claude ultrareview 1234 --timeout 45  # Default 30 min
```

Add `claude ultrareview 1234 --json` to CI as a gate that parses bug severity and fails the build on critical findings.

## Pricing

- **3 free runs** per Pro/Max account through May 5, 2026 — then ~$5-20 per review as extra usage.
- Free runs are **per-account**, not per-repo.
- A run counts once the **remote session starts** — early cancellation still uses a free run.
- Extra usage must be **enabled before** launching a paid review.

## Ultrareview vs `/review`

| Dimension | `/review` | `/ultrareview` |
|-----------|----------|----------------|
| Where | Local | Remote sandbox |
| Verification | Single-pass | Multi-agent fleet, independent verification |
| Time | Seconds-to-minutes | 5-10 minutes |
| Cost | Counts against normal usage | $5-20 (extra usage) |
| Use | Quick feedback while iterating | Pre-merge confidence |

## Ultrareview vs Code Review (Managed)

| | `/ultrareview` | [Code Review](claude-code-review.md) |
|--|----------------|--------------------------------------|
| Trigger | Manual (CLI / slash command) | Automatic on PR per trigger config |
| Where findings post | Notification in CLI session, optionally PR comments | Inline annotations on changed lines |
| Plan | Pro/Max + extra usage | Team/Enterprise only |
| Cost | ~$5-20 / review | ~$15-25 / review |
| Best for | Pre-merge runs the author drives | Continuous PR-review automation |

## Workflow

```bash
# During development
git commit -am "implement feature"
/ultrareview        # Pre-push confidence

# After pushing (PR-tied artifacts)
gh pr create
/ultrareview 1234   # Tied to the PR

# CI gate (parses severity)
claude ultrareview 1234 --json --timeout 45
```

## Related Pages

- [Code Review (Managed Service)](claude-code-review.md) — automatic PR-trigger version
- [Reviewer Agents](../concepts/reviewer-agents.md) — concept page for persona-based CI reviewers
- [Claude Code](../tools/claude-code.md) — the platform
- [Agentic Coding Workflow](agentic-coding-workflow.md) — where ultrareview fits in pre-merge discipline
