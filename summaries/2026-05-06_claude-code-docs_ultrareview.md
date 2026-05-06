---
title: "Find bugs with ultrareview"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/ultrareview"
pillar: "building"
tags: [claude-code, ultrareview, code-review, multi-agent, cloud, pr-automation, research-preview]
ingested: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_ultrareview.md"
---

# Find bugs with ultrareview — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/ultrareview)

## TL;DR

`/ultrareview` launches a fleet of reviewer agents in a remote sandbox to find and independently verify bugs before merging. The key differentiator vs. local `/review`: every finding is reproduced and confirmed by independent agents (higher signal, fewer false positives), runs entirely remotely so your terminal stays free, and takes 5-10 minutes. Costs ~$5-20 per review as extra usage beyond plan (3 free runs for Pro/Max through May 5, 2026, then billed).

## Key Takeaways

1. **Independent verification is the core value proposition.** Every finding is reproduced by a separate agent before being surfaced — not just "Claude noticed this pattern" but "multiple agents independently confirmed this is a real bug." This filters out false positives that single-pass reviews generate.
   - **How to apply:** Use ultrareview for pre-merge confidence on substantial changes, not as a fast feedback loop while iterating. Reserve it for when you want to ship confidently.

2. **Two modes: local branch diff vs. GitHub PR.** `/ultrareview` reviews the diff between current branch and default branch (including uncommitted/staged changes). `/ultrareview 1234` reviews a GitHub PR by number — the remote sandbox clones it directly. PR mode requires a `github.com` remote.
   - **How to apply:** Use the local branch mode during development. Use PR mode after pushing when you want a review tied to the PR artifacts.

3. **Runs entirely in background — terminal stays free.** After confirmation, the review runs remotely. Use `/tasks` to check status or stop a running review. When done, findings appear as a notification in your session with file locations and explanations.
   - **How to apply:** Start ultrareview, switch to other work or a different session. Return when notified. Each finding includes enough context to ask Claude to fix it directly.

4. **Non-interactive mode for CI integration.** `claude ultrareview` (as a subcommand, not slash command) blocks until review finishes and prints findings to stdout. Supports `--json` for structured output and `--timeout <minutes>`. Exit code 0 on success, 1 on failure, 130 on Ctrl-C (remote keeps running). Ctrl-C doesn't cancel the remote review.
   - **How to apply:** Add `claude ultrareview 1234 --json` to CI as a gate that parses bug severity and fails the build on critical findings.

5. **Pricing: free runs are per-account, not per-repo.** 3 free runs for Pro/Max through May 5, 2026, then ~$5-20 per review as extra usage. A run counts once the remote session starts — early cancellation still uses a free run. Extra usage must be enabled before launching a paid review.
   - **How to apply:** Enable extra usage before your free runs run out. Budget ~$5-20 per substantial PR if using regularly.

6. **ultrareview vs /review: different use cases.** `/review` is local, single-pass, seconds-to-minutes, counts against normal usage — good for quick feedback while iterating. `/ultrareview` is remote, multi-agent fleet with independent verification, 5-10 minutes, $5-20 — good for pre-merge confidence.
   - **How to apply:** Use `/review` during development. Use `/ultrareview` before merging feature branches or before major releases.

## Notable Commands / Code Snippets

```bash
# Slash commands (interactive)
/ultrareview           # Review diff vs default branch (incl. uncommitted/staged)
/ultrareview 1234      # Review GitHub PR #1234
/tasks                 # Check status / stop running review

# Non-interactive CLI (CI integration)
claude ultrareview              # Review diff vs default branch
claude ultrareview 1234         # Review PR
claude ultrareview origin/main  # Review diff vs specific branch
claude ultrareview 1234 --json  # Structured output (bugs.json)
claude ultrareview 1234 --timeout 45  # Custom timeout (default 30 min)
```

## Related Topics

claude-code, ultrareview, code-review, multi-agent, cloud, pr-automation, research-preview
