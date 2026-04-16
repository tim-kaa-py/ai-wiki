---
title: "Claude Routines"
type: "tool"
pillar: "building"
tags: [claude-code, agents, automation, workflow, routines, connectors, managed-sessions, webhooks]
sources:
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
last_updated: "2026-04-15"
---

# Claude Routines

Scheduled, triggered, or API-invoked Claude Code sessions that run autonomously in cloud containers. Routines turn Claude into a no-code automation platform, handling the same trigger-logic-output pattern as n8n and Make.com but with natural-language logic instead of drag-and-drop nodes.

## Why It Matters

Routines are the missing trigger layer that makes Claude Code a complete automation platform. Previously, Claude could handle logic (natural language) and output (API calls, tools), but lacked the ability to fire autonomously on a schedule or in response to external events. Routines close that gap with four trigger types: schedule, webhook, API call, and GitHub event.

Access the routines interface at: `claude.ai/code/routines`

## Core Components

### Triggers

Four ways to invoke a routine:

| Trigger | Use case |
|---------|----------|
| **Schedule** | Recurring tasks (daily email triage, weekly reports) |
| **Webhook** | Event-driven (incoming transcript, form submission) |
| **API call** | Programmatic invocation from other services or routines |
| **GitHub event** | CI/CD and repo-driven automation |

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

```bash
curl -X POST <routine-api-endpoint> \
  -H "Authorization: Bearer <routine-token>" \
  -H "Content-Type: application/json" \
  -d '{"transcript": "<full transcript text>"}'
```

## Related Pages

- [Claude Code](claude-code.md) -- the platform routines run on
- [Claude Routines vs n8n](../comparisons/claude-routines-vs-n8n.md) -- detailed comparison
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) -- broader workflow patterns
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md) -- prompt design principles applicable to routine prompts
