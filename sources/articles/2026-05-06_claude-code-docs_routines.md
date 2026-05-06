---
title: "Automate work with routines"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/routines"
pillar: "building"
tags: [claude-code, routines, automation, scheduling, github-webhooks, api-triggers, cloud-infrastructure]
ingested: "2026-05-06"
extraction_method: "web-fetch"
---

# Automate work with routines

> Put Claude Code on autopilot. Define routines that run on a schedule, trigger on API calls, or react to GitHub events from Anthropic-managed cloud infrastructure.

**Status:** Research preview. Behavior, limits, and API surface may change.

A routine is a saved Claude Code configuration: a prompt, one or more repositories, and a set of connectors, packaged once and run automatically on Anthropic-managed cloud infrastructure (keeps working when your laptop is closed).

## Trigger types

Each routine can have one or more triggers:
- **Scheduled**: recurring cadence (hourly, nightly, weekly) or once at a specific future time
- **API**: trigger on demand by sending an HTTP POST to a per-routine endpoint with a bearer token
- **GitHub**: run automatically in response to repository events (pull requests, releases)

A single routine can combine triggers.

**Available on:** Pro, Max, Team, Enterprise plans with Claude Code on the web enabled.
**Manage at:** [claude.ai/code/routines](https://claude.ai/code/routines) or CLI with `/schedule`.

## Example use cases

**Backlog maintenance**: schedule trigger runs every weeknight, reads issues, applies labels, assigns owners, posts Slack summary.

**Alert triage**: monitoring tool calls routine's API endpoint when error threshold is crossed, passing alert body. Routine pulls stack trace, correlates with recent commits, opens draft PR with proposed fix.

**Bespoke code review**: GitHub trigger on `pull_request.opened`. Applies team's review checklist, leaves inline comments, adds summary comment.

**Deploy verification**: CD pipeline calls routine's API after each production deploy. Routine runs smoke checks, scans error logs for regressions, posts go/no-go.

**Library port**: GitHub trigger on `pull_request.closed` filtered to merged PRs. Ports change to a parallel SDK and opens matching PR.

## Creating a routine

Create from: web (claude.ai/code/routines), Desktop app, or CLI (`/schedule`).

Routines run autonomously as full Claude Code cloud sessions — no permission-mode picker, no approval prompts during a run.

Key configuration:
- **Prompt**: must be self-contained and explicit (runs autonomously)
- **Repositories**: cloned at start of each run from default branch; Claude creates `claude/`-prefixed branches
- **Environment**: controls network access, environment variables, setup scripts (cached)
- **Connectors**: MCP connectors for external services (all included by default; remove unused ones)
- **Permissions**: enable "Allow unrestricted branch pushes" for repos where Claude should push to existing branches

Routines belong to your individual claude.ai account (not shared with teammates). They count against your account's daily run allowance. Commits and PRs carry your GitHub user.

## Schedule triggers

- Preset frequencies: hourly, daily, weekdays, weekly
- Times in local zone, converted automatically
- Custom cron expressions via `/schedule update` in CLI (minimum interval: one hour)
- One-off runs: fire once at a specific timestamp, auto-disable after, don't count against daily routine cap

## API triggers

Each routine gets a dedicated HTTP endpoint. POST to start a new session:

```bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01.../fire \
  -H "Authorization: Bearer sk-ant-oat01-xxxxx" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
```

Response includes session URL for watching the run in real time. Optional `text` field passes run-specific context (freeform string, not parsed). Token scoped to triggering that specific routine only.

## GitHub triggers

Supported events:
- **Pull request**: opened, closed, assigned, labeled, synchronized, or updated
- **Release**: created, published, edited, or deleted

Filter pull requests by: author, title, body, base branch, head branch, labels, is draft, is merged. Multiple filters AND together.

Each matching event starts its own session (no session reuse across events).

**Note:** Requires installing the Claude GitHub App (separate from `/web-setup` for cloning access).

## Managing routines

From detail page:
- **Run now**: start immediately without waiting for trigger
- Toggle to pause/resume the schedule
- Edit name, prompt, repositories, environment, connectors, triggers
- Delete routine (past sessions remain)

## Usage and limits

Routines draw down subscription usage like interactive sessions. Additional daily cap on how many runs can start per account. Monitor at claude.ai/code/routines or claude.ai/settings/usage.

When cap is hit, organizations with extra usage enabled keep running on metered overage. One-off runs don't count against the daily routine cap.
