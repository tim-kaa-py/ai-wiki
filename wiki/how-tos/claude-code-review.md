---
title: "Code Review (Claude Code Managed Service)"
description: "How Anthropic's managed Code Review service runs agent fleets to analyze and comment on GitHub PRs"
type: "how-to"
pillar: "building"
tags: [claude-code, code-review, github, multi-agent, pr-automation, review-md, claude-md, workflow, managed-service]
sources:
  - "summaries/2026-05-06_claude-code-docs_code-review.md"
timestamp: "2026-05-06"
---

# Code Review (Claude Code Managed Service)

Code Review is a **managed service** (Team/Enterprise plans only) that runs a fleet of specialized agents on Anthropic infrastructure to analyze GitHub PRs and post inline comments. Each finding is independently verified to filter false positives, then ranked by severity. Pricing is **~$15-25/review** as extra usage beyond plan. Unlike [ultrareview](claude-code-ultrareview.md) (CLI-initiated), Code Review runs **automatically** on every PR based on configured trigger behavior.

## What It Looks Like in a PR

After setup, a "Claude Code Review" check run appears in the PR's checks panel. Findings post as **inline annotations** on changed lines in the "Files changed" view — *not* as a top-level summary comment. The check run always completes with `neutral` conclusion (never blocks merging by itself).

## Severity Levels

| Symbol | Meaning | Action |
|--------|---------|--------|
| 🔴 Important | Fix before merging | Block merge in CI if you want enforcement |
| 🟡 Nit | Minor, not blocking | Author judgment |
| 🟣 Pre-existing | Bug exists but wasn't introduced by this PR | Backlog as separate tech-debt item |

The 🟣 pre-existing marker is valuable: it distinguishes "this PR made it worse" from "this was already there." Use it as a backlog feed for tech-debt cleanup, separate from the PR review decision.

## REVIEW.md — The Primary Customization Lever

`REVIEW.md` at the repo root is injected as **highest priority** into every agent in the review pipeline. Without it, you get generic findings that may not match your team's standards.

Tune in REVIEW.md:

- What "Important" means for your repo
- Nit volume cap ("at most five per review")
- Paths/categories to skip ("anything CI already enforces", `src/gen/`, `*.lock`)
- Repo-specific checks ("new API routes must have integration tests")
- Verification bar
- Re-review convergence behavior

```markdown
# Example REVIEW.md
## What Important means here
Reserve Important for findings that would break behavior, leak data, or block a rollback.
Style, naming, and refactoring suggestions are Nit at most.

## Cap the nits
Report at most five Nits per review. If more found, say "plus N similar items".

## Do not report
- Anything CI already enforces: lint, formatting, type errors
- Generated files under src/gen/ and any *.lock file

## Always check
- New API routes have an integration test
- Log lines don't include email addresses, user IDs, or request bodies
```

**Create REVIEW.md before launching Code Review.**

## Trigger Modes (Per Repo)

| Mode | Behavior | Cost |
|------|----------|------|
| **Manual** (`@claude review`) | Full control; PR subscribes to push-triggered re-reviews going forward | Lowest |
| **Once after PR creation** | Single review on open; **recommended for most repos** | Low |
| **After every push** | Review per push | Multiplies by push count |

`@claude review once` (post as top-level PR comment) does a single review **without** subscribing. Use this for PRs that don't need the push-triggered subscription.

**Strategy:** start with **Manual** to control costs while evaluating quality. Promote to **Once after PR creation** once you trust the signal.

## CI Integration (Severity Counts)

Code Review never fails its own check — any blocking behavior must be implemented in your CI pipeline. Parse severity counts from the check run:

```bash
gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID \
  --jq '.output.text | split("bughunter-severity: ")[1] | split(" -->")[0] | fromjson'
# Returns: {"normal": 2, "nit": 1, "pre_existing": 0}
```

Build a CI gate that fails on Important findings using the JSON.

## CLAUDE.md Interaction

Code Review reads CLAUDE.md files and:

- **Surfaces newly-introduced violations as nits** (not Important — CLAUDE.md rules are advisory)
- **Flags when a PR makes CLAUDE.md statements outdated** — useful for catching drift between code and documented conventions

Practical implication: keep CLAUDE.md current — stale entries generate noisy nit findings on every PR.

## Re-Triggering a Failed Review

```
@claude review once
```

The GitHub Checks "Re-run" button does **NOT** work for Code Review — use the comment.

## Code Review vs Ultrareview vs `/review`

| | `/review` | `/ultrareview` (CLI) | Code Review (managed) |
|--|----------|----------------------|----------------------|
| Where it runs | Local | Remote sandbox | Anthropic infra |
| Trigger | Manual | Manual | Automatic on PR |
| Verification | Single-pass | Independent fleet verification | Independent fleet verification |
| Plan | Any | Pro/Max + extra usage | Team/Enterprise only |
| Cost | Subscription | ~$5-20 / review | ~$15-25 / review |
| Use | Quick local feedback | Pre-merge confidence on substantial PRs | Continuous PR-review automation |

See [Ultrareview](claude-code-ultrareview.md) for the CLI-initiated multi-agent option. See [Reviewer Agents](../concepts/reviewer-agents.md) for the broader concept of persona-based review automation.

## Related Pages

- [Ultrareview](claude-code-ultrareview.md) — CLI-initiated multi-agent review
- [Reviewer Agents](../concepts/reviewer-agents.md) — concept page for persona-based CI reviewers
- [Claude Routines](../tools/claude-routines.md) — the routines runtime that powers GitHub-event-triggered review
- [Claude Code](../tools/claude-code.md) — the platform
- [Agentic Coding Workflow](agentic-coding-workflow.md) — where reviewer agents fit in daily practice
