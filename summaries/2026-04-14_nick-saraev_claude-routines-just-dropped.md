---
title: "Claude Routines Just Dropped, And It's Perfect"
source_type: "youtube"
channel: "Nick Saraev"
date: "2026-04-14"
url: "https://www.youtube.com/watch?v=j3aXJNu9804"
pillar: "building"
tags: [claude-code, agents, workflow, automation, how-to]
ingested: "2026-04-15"
source_file: "sources/youtube/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
---

# Claude Routines Just Dropped, And It's Perfect — Summary

**Source:** Nick Saraev | 2026-04-14 | [Link](https://www.youtube.com/watch?v=j3aXJNu9804) | 18:07

## TL;DR

Anthropic launched "Routines" — scheduled, triggered, or API-invoked Claude Code sessions that run autonomously in cloud containers, effectively turning Claude into a no-code automation platform that competes directly with n8n and Make.com. Nick demonstrates building email triage, transcript-to-proposal, and HackerNews scraper routines, and argues that for new automation builds the natural-language routine approach is faster and easier than drag-and-drop node builders, though existing n8n workflows may not always be worth porting due to token costs.

## Video Structure

1. [00:00-03:14] Email Triage Demo — Live walkthrough of a daily mailbox summary routine that reads Gmail unreads, drafts replies, and sends a Slack notification
2. [03:14-05:06] Scheduling & Trigger Modes — How to set up scheduled, webhook, and API triggers for routines
3. [05:06-06:10] Transcript-to-Proposal Demo — Sending a Fireflies transcript via API call to trigger a proposal-generation routine using managed sessions
4. [06:10-09:01] Old Way vs New Way — Side-by-side comparison of the n8n drag-and-drop workflow model versus the natural-language routine model
5. [09:01-12:00] Routine Creation UX Walkthrough — Step-by-step setup: naming, prompt/instructions, repository selection, model selection, cloud environment, triggers, and connectors (Gmail, Slack)
6. [12:00-13:25] Live GUI Test Run — Running the newly created mailbox drafter routine from the GUI and observing results
7. [13:45-16:40] Converting n8n Workflows to Routines — Copying n8n workflow JSON and using a Claude Code skill to auto-convert it into a routine (HackerNews scraper example)
8. [16:40-18:07] Real-World Use Cases & Closing — Nick's agency pipeline: proposal generators, post-call emails, workflow diagrams, signature monitoring, onboarding automation

## Key Concepts

### Routines

Claude Code sessions that execute autonomously in standardized cloud containers, triggered by a schedule, webhook, API call, or GitHub event. Functionally equivalent to what n8n/Make.com workflows do, but defined in natural language instead of drag-and-drop nodes. Nick frames these as "the enterprise version of Agentic Workflows" — the same capability he previously demonstrated running locally, now productized with scheduling and triggers built in.

### Connectors

OAuth-based integrations (Gmail, Slack, etc.) that routines use to interact with external services. Configured via Claude Code settings, then attached to individual routines. They handle authentication and provide the routine with scoped access to third-party APIs.

### Managed Sessions

A pattern for inter-agent orchestration where routines spin up other AI agents, each running in its own siloed container for security and safety. Nick uses this when his transcript-to-proposal routine calls a separate managed agent to generate the actual proposal document. This enables a network of interconnected, specialized agents rather than one monolithic routine.

### Routine Prompts (vs Interactive Skills)

The natural-language instructions given to a routine. Nick explicitly distinguishes these from interactive Claude Code "skills" — while skills allow mid-run steering, routine prompts must be self-contained and precise because the routine runs fully hands-off. He recommends structuring them as step-by-step SOPs and erring on the side of more context.

## Key Takeaways

1. Routines are a direct 1:1 replacement for no-code automation platforms like n8n and Make.com — they handle the same three components: trigger (schedule/webhook/API), logic (now natural language instead of nodes), and output (connectors to Slack, CRM, etc.).
   - **How to apply:** For your next automation need, prototype it as a Claude routine first instead of reaching for n8n. Write a natural-language SOP as the routine prompt.

2. Routine prompts need to be significantly more precise than interactive skill prompts because there is no human-in-the-loop to course-correct during execution.
   - **How to apply:** Structure routine prompts as explicit step-by-step SOPs. Define the "definition of done" clearly (e.g., "use the Slack connector to send me an update when finished"). Test with the "Run Now" feature before scheduling.

3. Porting existing n8n workflows is easy (copy JSON, use a conversion skill) but not always worthwhile — token-based execution is more expensive than pure compute-based node execution.
   - **How to apply:** Port workflows only when the natural-language flexibility outweighs the cost difference. For new builds, default to routines. For high-volume, stable workflows, keep them on n8n.

4. Routines can be chained via webhooks to create event-driven multi-step pipelines entirely in natural language.
   - **How to apply:** Design pipelines where each routine handles one stage and fires the next via webhook — e.g., call transcript arrives via webhook, routine generates proposal, signature event triggers onboarding routine.

5. There appears to be no length limit on routine prompts — Nick recommends providing as much context as possible to minimize errors in hands-off execution.
   - **How to apply:** Don't economize on routine instructions. Include edge cases, fallback behaviors, and examples. More context reduces the scope for misinterpretation.

6. The combination of routines and managed sessions enables a multi-agent architecture where specialized agents collaborate through API boundaries.
   - **How to apply:** Break complex workflows into specialized agents (e.g., transcript parser, proposal writer, email drafter) and orchestrate them through routines calling managed sessions.

## Argument Structures

**Routines as the missing piece that makes Claude a true n8n replacement:**

Nick has previously argued that various Claude features made n8n obsolete, but acknowledges those claims were premature because specific capabilities were missing. His argument this time:

- Premise 1: Automation platforms have three components — trigger, logic, output.
- Premise 2: Claude already handled logic (via natural language) and output (via API calls and tools).
- Premise 3: Routines add the trigger layer (schedule, webhook, API, GitHub event).
- Conclusion: Routines are "Claude's literal 1:1 overlap" with n8n — the first time the feature set fully matches.

**Natural language > drag-and-drop for new automation builds:**

- Premise: Building n8n workflows requires dragging nodes, configuring credentials, mapping variables, authenticating services — this is time-consuming (Nick estimates 2.5-3 hours for a proposal generator).
- Premise: The same automation can be described in natural language in minutes.
- Premise: Modifying a natural-language routine is trivial ("update this so it sends me a message in Slack") versus re-wiring nodes.
- Conclusion: For new builds, routines are strictly faster and easier.
- Caveat (Nick's own): Token-based execution costs more than compute-based node execution, so not every workflow should be ported. The advantage is speed-of-creation, not cost-of-execution.

## Notable Commands / Code Snippets

Triggering a routine via API (conceptual — Nick demonstrates sending a curl request from a Claude Code instance to invoke a routine with a transcript payload):

```bash
# Trigger a routine via API with data payload
curl -X POST <routine-api-endpoint> \
  -H "Authorization: Bearer <routine-token>" \
  -H "Content-Type: application/json" \
  -d '{"transcript": "<full transcript text>"}'
```

Accessing the routines interface:

```
claude.ai/code/routines
```

Converting an n8n workflow to a routine (natural language command within Claude Code):

```
Use the routine generator to turn this n8n workflow into a routine.
<paste n8n workflow JSON>
```

## User Notes

- Routine prompts requiring more precision than interactive skills is a key design principle to internalize — when building routines, treat the prompt like production code that must handle all edge cases without human intervention.
- Managed sessions as an inter-agent orchestration pattern is architecturally significant: rather than building monolithic routines, you can compose specialized agents that each run in isolated containers, communicating through API boundaries. This is the same microservices pattern applied to AI agents.
- The absence of a prompt length limit is a practical green light to write thorough, detailed routine instructions with extensive context, examples, and fallback behaviors.
- The chained routine architecture Nick describes for his sales pipeline (Fireflies webhook to transcript routine to proposal generation to signature monitoring to onboarding) is a concrete, production-tested pattern for event-driven multi-agent pipelines. This is the most immediately applicable pattern from the video — it shows how to decompose a business process into a chain of autonomous agents connected by webhooks.
- The cost tradeoff between tokens (routines) and compute (n8n) is worth monitoring as pricing evolves — routines win on development speed but may lose on per-execution cost for high-volume, stable workflows.

## Related Topics

claude-code, agents, workflow, automation, how-to, n8n, managed-sessions, connectors, prompt-engineering, multi-agent, webhooks
