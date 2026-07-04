---
title: "Find bugs with ultrareview"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/ultrareview"
pillar: "building"
tags: [claude-code, ultrareview, code-review, multi-agent, cloud, pr-automation, research-preview]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Find bugs with ultrareview

> Run a deep, multi-agent code review in the cloud with /ultrareview to find and verify bugs before you merge.

**Status:** Research preview. Requires Claude Code v2.1.86+. Requires claude.ai account authentication (not available with API-key-only, Bedrock, Vertex AI, Foundry, or Zero Data Retention orgs).

Ultrareview launches a fleet of reviewer agents in a remote sandbox to find bugs in your branch or pull request.

## Advantages over local `/review`

- **Higher signal**: every finding is independently reproduced and verified — focuses on real bugs, not style suggestions
- **Broader coverage**: many reviewer agents explore the change in parallel, surfacing issues single-pass reviews miss
- **No local resource use**: runs entirely in remote sandbox; terminal stays free

## Running ultrareview

```
/ultrareview           # Review diff between current branch and default branch (including uncommitted/staged changes)
/ultrareview 1234      # Review a GitHub PR by number
```

In PR mode, the remote sandbox clones the PR directly from GitHub. Requires a `github.com` remote. If your repo is too large to bundle, Claude Code prompts you to use PR mode.

Before launching, Claude Code shows a confirmation dialog with: review scope, remaining free runs, estimated cost. After confirmation, review continues in the background.

Claude does not start an ultrareview on its own — only when you invoke `/ultrareview`.

## Pricing and free runs

| Plan | Included free runs | After free runs |
|---|---|---|
| Pro | 3 free runs through May 5, 2026 | billed as extra usage |
| Max | 3 free runs through May 5, 2026 | billed as extra usage |
| Team and Enterprise | none | billed as extra usage |

After free runs: typically $5–$20 per review depending on size. Billed as extra usage (outside plan's included usage). A run counts once the remote session starts, so a review stopped early still uses a free run.

Extra usage must be enabled before launching a paid review.

## Tracking a running review

Reviews typically take 5–10 minutes. Use `/tasks` to see running/completed reviews or stop a review in progress.

When finished, verified findings appear as a notification in your session. Each finding includes the file location and explanation so you can ask Claude to fix it directly.

## Non-interactive mode

```bash
claude ultrareview            # Review diff vs default branch
claude ultrareview 1234       # Review a PR
claude ultrareview origin/main # Review diff vs specific branch
```

- Blocks until remote review finishes, prints findings to stdout
- Exit code 0 on success, 1 on failure, 130 on Ctrl-C (remote keeps running)
- Flags: `--json` (raw bugs.json), `--timeout <minutes>` (default 30)
- Progress messages go to stderr so stdout stays parseable

## Ultrareview vs /review

| | `/review` | `/ultrareview` |
|---|---|---|
| Runs | locally in your session | remotely in a cloud sandbox |
| Depth | single-pass review | multi-agent fleet with independent verification |
| Duration | seconds to a few minutes | ~5–10 minutes |
| Cost | counts toward normal usage | free runs, then ~$5–$20 as extra usage |
| Best for | quick feedback while iterating | pre-merge confidence on substantial changes |

## Related

- **Code Review** (`/en/code-review`): automated PR reviews that post inline comments to GitHub (managed service, no CLI step)
- **ultraplan** (`/en/ultraplan`): the planning counterpart for upfront design work
