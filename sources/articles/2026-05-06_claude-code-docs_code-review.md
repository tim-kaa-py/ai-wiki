---
title: "Code Review (Claude Code)"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/code-review"
pillar: "building"
tags: [claude-code, code-review, github, multi-agent, pr-automation, review-md, claude-md, workflow]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Code Review (Claude Code)

> Set up automated PR reviews that catch logic errors, security vulnerabilities, and regressions using multi-agent analysis of your full codebase.

**Status:** Research preview. Available for Team and Enterprise subscriptions. Not available with Zero Data Retention enabled.

Code Review analyzes GitHub pull requests and posts findings as inline comments on specific lines of code. A fleet of specialized agents examine changes in the context of your full codebase, looking for logic errors, security vulnerabilities, broken edge cases, and subtle regressions.

## How reviews work

Multiple agents analyze the diff and surrounding code in parallel on Anthropic infrastructure. Each agent looks for a different class of issue, then a verification step checks candidates against actual code behavior to filter out false positives. Results are deduplicated, ranked by severity, and posted as inline comments.

Reviews scale in cost with PR size and complexity, completing in 20 minutes on average.

## Severity levels

| Marker | Severity | Meaning |
|---|---|---|
| 🔴 | Important | A bug that should be fixed before merging |
| 🟡 | Nit | A minor issue, worth fixing but not blocking |
| 🟣 | Pre-existing | A bug that exists but was not introduced by this PR |

Each finding includes a collapsible extended reasoning section.

## Rate and reply to findings

Each comment arrives with 👍 and 👎 for one-click rating. Anthropic collects reactions after PR merges to tune the reviewer. Replying to an inline comment does not prompt Claude to respond — to act on a finding, fix the code and push.

## Check run output

The **Claude Code Review** check run appears alongside CI checks. It shows a severity table and annotations on diff lines. Always completes with a neutral conclusion (never blocks merging).

Parse severity counts from check run for custom CI gates:
```bash
gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID \
  --jq '.output.text | split("bughunter-severity: ")[1] | split(" -->")[0] | fromjson'
# Returns: {"normal": 2, "nit": 1, "pre_existing": 0}
```

## Setup

1. Open [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code)
2. Click **Setup** to begin GitHub App installation flow
3. Install Claude GitHub App (requests: Contents read/write, Issues read/write, Pull requests read/write)
4. Select repositories to enable
5. Set **Review Behavior** per repo:
   - **Once after PR creation**: review runs once when a PR opens
   - **After every push**: review runs on every push (most reviews, highest cost)
   - **Manual**: reviews start only when someone comments `@claude review`

## Manual triggers

| Command | What it does |
|---|---|
| `@claude review` | Starts a review and subscribes the PR to push-triggered reviews going forward |
| `@claude review once` | Starts a single review without subscribing to future pushes |

Post as a top-level PR comment. Must have owner, member, or collaborator access. Works on draft PRs when manually triggered.

## Customize reviews

### CLAUDE.md

Code Review reads your `CLAUDE.md` files and treats newly introduced violations as nit-level findings. Also flags when your PR makes CLAUDE.md statements outdated.

### REVIEW.md

A file at your repository root injected as highest-priority into every agent in the review pipeline.

What you can tune:
- **Severity**: redefine what 🔴 Important means for your repo
- **Nit volume**: cap how many nits a single review posts (e.g., "report at most five nits")
- **Skip rules**: paths, branch patterns, finding categories to skip (generated code, lockfiles, CI-covered lint)
- **Repo-specific checks**: "new API routes must have an integration test"
- **Verification bar**: "behavior claims need a `file:line` citation, not an inference from naming"
- **Re-review convergence**: "after the first review, suppress new nits and post Important findings only"

Example REVIEW.md:
```markdown
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

Keep REVIEW.md focused — length dilutes the rules that matter most.

## Pricing

Each review averages $15-25. Billed as extra usage, not against plan's included usage. "After every push" multiplies cost by number of pushes.

Monitor spend at [claude.ai/analytics/code-review](https://claude.ai/analytics/code-review).

## Troubleshooting

**Failed or timed-out review**: comment `@claude review once` to retrigger. The Re-run button in GitHub's Checks tab does NOT retrigger Code Review.

**Issues not showing as inline comments**: check check run Details link, Files changed annotations, or review body "Additional findings" section (for lines that moved).

**Spend cap reached**: Code Review posts a comment on the PR explaining it was skipped. Resumes at the start of the next billing period.
