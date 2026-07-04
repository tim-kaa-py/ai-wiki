---
title: "Claude Routines"
description: "How scheduled, triggered, or API-invoked Claude Code sessions turn Claude into a no-code automation platform"
type: "tool"
pillar: "building"
tags: [claude-code, agents, automation, workflow, routines, connectors, managed-sessions, webhooks, github-events, api-triggers]
sources:
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
  - "summaries/2026-05-06_claude-code-docs_routines.md"
  - "summaries/2026-05-20_claude_stop-babysitting-your-agents.md"
  - "summaries/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md"
timestamp: "2026-06-29"
---

# Claude Routines

Scheduled, triggered, or API-invoked Claude Code sessions that run autonomously in cloud containers. Routines turn Claude into a no-code automation platform, handling the same trigger-logic-output pattern as n8n and Make.com but with natural-language logic instead of drag-and-drop nodes.

## Why It Matters

Routines are the missing trigger layer that makes Claude Code a complete automation platform. Previously, Claude could handle logic (natural language) and output (API calls, tools), but lacked the ability to fire autonomously on a schedule or in response to external events. Routines close that gap with four trigger types: schedule, webhook, API call, and GitHub event.

Access the routines interface at: `claude.ai/code/routines`

## Core Components

### Triggers

Three canonical trigger types per Anthropic's docs (May 2026), each combinable in a single routine:

| Trigger | Use case | Notes |
|---------|----------|-------|
| **Schedule** | Recurring tasks (daily email triage, weekly reports) | Cron expression; minimum interval **1 hour** via `/schedule update` |
| **API** | Programmatic invocation from monitoring tools, CI, Zapier, other routines | Each routine gets a dedicated HTTPS endpoint with bearer token; pass run-specific context via the `text` field |
| **GitHub event** | PR + release reactions | Filterable by author, title/body regex, branch pattern, labels, `is_draft`, `is_merged` |

A single routine can fire on a schedule **and** respond to API calls **and** react to GitHub events. Design routines around a *task* (e.g., "PR review"), then attach all relevant triggers.

### Connectors

OAuth-based integrations (Gmail, Slack, etc.) that give routines scoped access to external services. Configured once in Claude Code settings, then attached to individual routines. Connectors handle authentication so routine prompts can simply say "send a Slack message" without managing tokens.

### Managed Sessions

A pattern for inter-agent orchestration where routines spin up other AI agents, each running in its own siloed container. This enables a network of specialized agents collaborating through API boundaries rather than one monolithic routine.

Example: A transcript-to-proposal routine receives a Fireflies transcript via API, then calls a managed session to spin up a separate proposal-generation agent.

## Routine Prompts vs Interactive Skills

Routine prompts must be significantly more precise than interactive Claude Code skill prompts because there is no human-in-the-loop to course-correct during execution:

| Aspect | Interactive skill | Routine prompt |
|--------|------------------|----------------|
| Human oversight | Mid-run steering possible | Fully hands-off |
| Prompt style | Conversational, iterative | Self-contained SOP |
| Error handling | Human can redirect | Must be anticipated in prompt |
| Context | Can ask for clarification | Must include all context upfront |
| Length | Concise is fine | No length limit -- more context is better |

**Best practice:** Structure routine prompts as explicit step-by-step SOPs. Define the "definition of done" clearly (e.g., "use the Slack connector to send me an update when finished"). Include edge cases, fallback behaviors, and examples. Test with the "Run Now" feature before scheduling.

## Chained Routine Architecture

Routines can be chained via webhooks to create event-driven multi-step pipelines entirely in natural language. Each routine handles one stage and fires the next via webhook.

Nick Saraev's production pipeline example:

```
Fireflies webhook (call transcript arrives)
    --> Transcript processing routine
        --> Proposal generation routine (via managed session)
            --> Signature monitoring routine
                --> Client onboarding routine
```

This is the microservices pattern applied to AI agents: specialized, isolated, communicating through defined API boundaries.

## Multi-Agent Architecture

The combination of routines and managed sessions enables composing complex automation from specialized agents:

- **Transcript parser** -- extracts structured data from call recordings
- **Proposal writer** -- generates client-facing documents
- **Email drafter** -- handles follow-up communications
- **Signature monitor** -- watches for contract execution events

Each agent runs in its own container with scoped access. The orchestrating routine coordinates them through API calls to managed sessions.

## Cost Considerations

Routines use token-based execution, which is more expensive per-run than compute-based node execution in tools like n8n. The tradeoff:

| Factor | Routines | n8n / Make.com |
|--------|----------|----------------|
| Development speed | Minutes (natural language) | Hours (node wiring) |
| Modification effort | Edit text | Re-wire nodes |
| Per-execution cost | Higher (token-based) | Lower (compute-based) |
| Best for | New builds, complex logic, low-volume | High-volume stable workflows |

**Rule of thumb:** For new automation, default to routines. For high-volume, stable, proven workflows, keep them on dedicated automation platforms.

## Converting Existing Workflows

n8n workflows can be converted to routines by copying the workflow JSON and using a Claude Code skill:

```
Use the routine generator to turn this n8n workflow into a routine.
<paste n8n workflow JSON>
```

However, porting is not always worthwhile -- evaluate whether the natural-language flexibility justifies the higher per-execution token cost.

## Triggering a Routine via API

Each routine exposes a dedicated `/fire` endpoint with a bearer token. Pass run-specific context via the `text` field — alert body, PR number, transcript, etc.

```bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01.../fire \
  -H "Authorization: Bearer sk-ant-oat01-xxxxx" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
```

Practical wiring: connect alerting/monitoring to a routine API trigger for automated triage and draft PRs.

## GitHub Event Triggers — Filter Operators

Filter PR events with **AND-combined** filters: author, title/body regex, base/head branch pattern, labels, `is_draft`, `is_merged`. Supported events:

| Event | Actions |
|-------|---------|
| `pull_request` | opened, closed, assigned, labeled, synchronized, updated |
| `release` | created, published, edited, deleted |

Canonical pattern: `pull_request.opened` + `is_draft: false` + branch filter to trigger review only on real PRs to main. This is the trigger layer behind [Code Review](../how-tos/claude-code-review.md) wired to the routines runtime.

## Branch Permissions and Identity

| Setting | Default | When to change |
|---------|---------|----------------|
| Branch prefix | `claude/`-prefixed branches only; cannot push to existing branches | Enable **"Allow unrestricted branch pushes"** only on repos where you've verified routine behavior |
| Commit identity | Your GitHub user identity | Same as if you committed yourself — review accordingly |

Keep the `claude/`-prefix default for most repos; relax it only for automated workflows you trust.

## Autonomous-Run Discipline

Routines are autonomous — no permission-mode picker, no approval prompts during a run. Two implications:

1. **Prompts must be self-contained.** Brief them like an autonomous contractor: explicit scope, success criteria, what to do if ambiguous. Same discipline as [Agent Teams](../how-tos/claude-code-agent-teams.md) spawn prompts.
2. **Test with "Run Now" before scheduling.** Validate behavior interactively before committing to autonomous execution.

## Pricing & Daily Run Cap

Routines draw subscription usage like interactive sessions, **plus** a per-account daily run cap. Orgs with extra usage enabled continue on metered overage when the cap is hit. **One-off runs don't count against the daily cap.**

Monitor usage at `claude.ai/code/routines` before adding high-frequency triggers like "after every push."

## CLI Management

```
/schedule              # Create/manage routines from CLI
/schedule update       # Edit routine including custom cron expressions (min interval: 1h)
```

## The Skill → Automation → Loop Promotion Path (Chase AI)

Chase AI positions routines as the **automation rung** in a three-step promotion ladder that turns one-off prompting into a self-improving system:

1. **Skill** — codify a validated, repeated workflow (see [Agent Skills § Workflow Audit](../concepts/agent-skills.md#finding-which-skills-to-build-the-workflow-audit-chase-ai)).
2. **Automation** — wrap the skill as a scheduled routine. Chase's Claw Desktop recipe: `Routines → New → name → instruction "run this skill: <skill-name>" → set a schedule`.
3. **Loop** — ask whether a self-improvement loop fits; if so, the routine logs each run into the vault's state structure so future runs read prior iterations and improve. The logging must live in the same coherent "map" as the rest of memory/state (see [Agentic OS § Level 2](../concepts/agentic-os.md)).

This is the Level-1 backbone of an [Agentic OS](../concepts/agentic-os.md): routines are where a skill stops being something you invoke and becomes something that runs on its own. *(Source: Chase AI)*

### Headless `claude -p` Behind Dashboard Buttons

When an AIOS dashboard exposes a button instead of a terminal, the button calls a **headless** Claude Code instance via `claude -p`, invisibly running a skill or slash command — same power as the terminal, no window. This is the same mechanism a routine uses to run unattended, just triggered by a UI click rather than a schedule/webhook.

**Billing caveat (June 2026):** Anthropic briefly claimed `claude -p` would bill against a $200 API credit rather than the Max subscription, then walked it back; for now it still draws from the Max plan — same as running it in the terminal. *(Source: Chase AI)*

## `/loop` (Local) vs Routines (Remote)

Anthropic's "Stop babysitting your agents" talk (Sid Benesaria, May 2026) frames Routines as the *remote* end of a two-rung autonomy ladder whose *local* rung is `/loop`:

| | `/loop` | Routines |
|--|---------|----------|
| Where it runs | Inside the **current local** Claude Code session | Remotely, in the **same cloud containers** as Claude Code on Web |
| Trigger | Fixed time interval only | Time-based **or** event-based (schedule / webhook / API / GitHub event) |
| Lifecycle | Wakes the same session, re-runs the prompt | Each fire spawns a **new** session with a specified prompt |
| Setup | `/loop <interval> <prompt>` in a running session | Routines tab in web or desktop app |
| Bottleneck removed | Routine *monitoring* you'd otherwise do at the keyboard | Your machine being on at all |

Example: `/loop 10m babysit my open PRs` wakes the session every 10 minutes, re-runs the prompt, and — given a strong CLAUDE.md and connected tools — figures out what to do on its own. Routines are the same idea promoted to the cloud with richer triggers: the talk cites a team routine that updates docs daily, and another that scans issues/feedback and posts to Slack every six hours.

The talk's framing thesis: both rungs exist to **push bookkeeping off your keyboard** (PR babysitting, doc updates, triage, keeping CI green) — work that needs to *run*, not to have you present. See [Focus Maxing](../concepts/focus-maxing.md) for the attention-budget argument this serves. *(Source: Claude — Stop babysitting your agents.)*

## Related Pages

- [Claude Code](claude-code.md) -- the platform routines run on
- [Claude Routines vs n8n](../comparisons/claude-routines-vs-n8n.md) -- detailed comparison
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) -- broader workflow patterns
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md) -- prompt design principles applicable to routine prompts
- [Focus Maxing](../concepts/focus-maxing.md) -- the attention-budget argument `/loop` and Routines serve
- [Agentic OS](../concepts/agentic-os.md) -- the skill -> automation -> loop promotion path; routines as the Level-1 automation runtime
