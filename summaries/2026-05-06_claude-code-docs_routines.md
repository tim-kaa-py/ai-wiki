---
title: "Automate work with routines"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/routines"
pillar: "building"
tags: [claude-code, routines, automation, scheduling, github-webhooks, api-triggers, cloud-infrastructure]
ingested: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_routines.md"
---

# Automate work with routines — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/routines)

## TL;DR

Routines are scheduled or event-triggered Claude Code sessions running on Anthropic-managed cloud infrastructure — your laptop doesn't need to be open. Three trigger types: schedule (cron-style), API (HTTP POST with arbitrary context), and GitHub events (PR/release hooks). Routines run autonomously with no permission prompts, branch into `claude/`-prefixed branches by default, and draw from your subscription usage plus a daily run cap.

## Key Takeaways

1. **Routines are "always-on" Claude Code sessions.** The key difference from running Claude manually: they run on Anthropic infrastructure independent of your machine. Scheduled routines, API triggers, and GitHub event reactions all work without any local process.
   - **How to apply:** Move any task you currently run manually on a schedule (daily backlog triage, nightly dependency checks) to a routine.

2. **Three trigger types can be combined in one routine.** A single routine can fire on a schedule AND respond to API calls AND react to GitHub events. This enables rich orchestration: e.g., "review PRs on open + accept API calls for on-demand reviews."
   - **How to apply:** Design routines around a task (e.g., "PR review") not a trigger — then attach all relevant triggers.

3. **API triggers enable push-based automation.** Each routine gets a dedicated HTTP endpoint with a bearer token. POST to it from monitoring tools, CI pipelines, Zapier, etc. The `text` field passes run-specific context (alert body, PR number, etc.) as a freeform string.
   - **How to apply:** Connect your alerting/monitoring system to a routine API trigger for automated triage and draft PRs.

4. **GitHub triggers with powerful filter operators.** Filter PR events by: author, title/body regex, base/head branch pattern, labels, is_draft, is_merged. Multiple filters AND together. Supported events: `pull_request` (opened/closed/assigned/labeled/synchronized/updated) and `release` (created/published/edited/deleted).
   - **How to apply:** Use `pull_request.opened` + `is_draft: false` + branch filter to trigger review only on real PRs to main.

5. **Routines are autonomous — prompts must be self-contained.** No permission-mode picker, no approval prompts during a run. Prompts must include everything the agent needs. Commits and PRs carry your GitHub user identity.
   - **How to apply:** Write routine prompts like you're briefing an autonomous contractor: explicit scope, success criteria, what to do if ambiguous.

6. **Branch control: `claude/`-prefixed by default, unrestricted with a permission toggle.** By default, Claude creates branches with `claude/` prefix and cannot push to existing branches. Enable "Allow unrestricted branch pushes" for repos where Claude should push directly.
   - **How to apply:** Keep the default for most repos. Enable unrestricted pushes only for automated workflows where you've verified the routine's behavior.

7. **Daily run cap + extra usage for overages.** Routines draw subscription usage like interactive sessions, plus a per-account daily run cap. Orgs with extra usage enabled continue on metered overage when cap is hit. One-off runs don't count against the daily cap.
   - **How to apply:** Monitor usage at claude.ai/code/routines before adding high-frequency triggers like "after every push."

## Notable Commands / Code Snippets

```bash
# API trigger: fire a routine with context
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01.../fire \
  -H "Authorization: Bearer sk-ant-oat01-xxxxx" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
```

```
# CLI management
/schedule              # Create/manage routines from CLI
/schedule update       # Edit routine including custom cron expressions (min interval: 1h)
```

## Related Topics

claude-code, routines, automation, scheduling, github-webhooks, api-triggers, cloud-infrastructure
