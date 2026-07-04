---
title: "Code Review (Claude Code)"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/code-review"
pillar: "building"
tags: [claude-code, code-review, github, multi-agent, pr-automation, review-md, claude-md, workflow]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_code-review.md"
---

# Code Review (Claude Code) — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/code-review)

## TL;DR

Code Review is a managed service (Team/Enterprise only) that runs a fleet of specialized agents on Anthropic infrastructure to analyze GitHub PRs and post inline comments. Each finding is independently verified to filter false positives, then ranked by severity. Costs ~$15-25/review as extra usage beyond plan. Unlike ultrareview (CLI-initiated), Code Review runs automatically on every PR based on configured trigger behavior.

## Key Takeaways

1. **Inline comments on specific lines, not a summary comment.** The check run posts findings as inline annotations on changed lines in the "Files changed" view. This is different from a top-level PR comment — findings appear where the code is, not at the top of the PR.
   - **How to apply:** After setup, look for the "Claude Code Review" check run in your PR's checks panel. Findings appear as inline annotations.

2. **Three severity levels with distinct meanings.** 🔴 Important (fix before merging), 🟡 Nit (minor, not blocking), 🟣 Pre-existing (bug exists but wasn't introduced by this PR). The pre-existing marker is valuable — it distinguishes "this PR made it worse" from "this was already there."
   - **How to apply:** Use 🟣 pre-existing findings as a backlog for technical debt cleanup separate from the PR review decision.

3. **REVIEW.md is the primary customization lever.** This file at the repo root is injected as highest-priority into every agent in the review pipeline. Tune: what "Important" means for your repo, nit volume cap, paths/categories to skip, repo-specific checks ("new API routes must have integration tests"), verification bar, re-review convergence behavior.
   - **How to apply:** Create REVIEW.md before launching Code Review. Without it, you'll get generic findings that may not match your team's standards. The example in the docs is a solid starting template.

4. **Three trigger modes per repo: once / every push / manual.** "Once after PR creation" is recommended for most repos. "After every push" multiplies cost by push count. "Manual" (`@claude review`) gives full control. Once you use `@claude review`, the PR subscribes to push-triggered reviews going forward; `@claude review once` does a single review without subscribing.
   - **How to apply:** Start with "Manual" trigger mode to control costs while evaluating quality. Promote to "Once after PR creation" when you trust the signal.

5. **Machine-readable severity counts from the check run.** Parse severity counts via the GitHub API for custom CI gates or dashboards. The check run always completes with neutral conclusion (never blocks merging), so any blocking behavior must be implemented in your CI pipeline.
   - **How to apply:** Build a CI gate that fails on Important findings using the severity JSON — Code Review itself never fails the check.

6. **CLAUDE.md violations are nit-level findings.** Code Review reads CLAUDE.md files and surfaces newly-introduced violations as nits. It also flags when a PR makes CLAUDE.md statements outdated — useful for catching drift between code and documented conventions.
   - **How to apply:** Keep CLAUDE.md current — stale entries will generate noisy nit findings on every PR.

## Notable Commands / Code Snippets

```bash
# Parse severity counts from check run
gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID \
  --jq '.output.text | split("bughunter-severity: ")[1] | split(" -->")[0] | fromjson'
# Returns: {"normal": 2, "nit": 1, "pre_existing": 0}
```

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

```
# Manual triggers (post as top-level PR comment)
@claude review        # Start review + subscribe to future push-triggered reviews
@claude review once   # Single review, no subscription

# Re-trigger failed reviews
@claude review once   # (NOT the Re-run button in GitHub Checks — that doesn't work for Code Review)
```

## Related Topics

claude-code, code-review, github, multi-agent, pr-automation, review-md, claude-md, workflow
