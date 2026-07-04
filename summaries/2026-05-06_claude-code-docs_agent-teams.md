---
title: "Orchestrate teams of Claude Code sessions"
description: "Anthropic's docs on experimental agent teams that coordinate multiple Claude Code sessions via peer messaging and a shared task list"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/agent-teams"
pillar: "building"
tags: [claude-code, agent-teams, multi-agent, parallel-agents, orchestration, subagents, coordination]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_agent-teams.md"
---

# Orchestrate teams of Claude Code sessions — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/agent-teams)

## TL;DR

Agent teams (experimental, disabled by default) coordinate multiple independent Claude Code sessions with peer-to-peer messaging and a shared task list — going beyond subagents which only report back to a single orchestrator. The main use case is parallel independent work (competing hypotheses, multi-domain review, cross-layer feature work) where teammates need to share and challenge each other's findings without everything routing through the lead.

## Key Takeaways

1. **Agent teams = peer-to-peer; subagents = hub-and-spoke.** The architectural difference: subagents report results to the main agent only. Teammates can message each other directly via a shared mailbox. If you find yourself wishing subagents could share findings with each other, that's the signal to use agent teams.
   - **How to apply:** Start with subagents. Upgrade to agent teams only when the coordination pattern requires direct peer communication.

2. **Strongest use case: competing hypotheses debugging.** Multiple teammates test different theories in parallel, actively try to disprove each other, and converge faster than sequential investigation. The "scientific debate" prompt pattern is explicitly recommended by Anthropic.
   - **How to apply:** For hard bugs, spawn 3-5 teammates with different hypotheses. Prompt them to challenge each other's theories.

3. **Token cost scales linearly with teammate count.** Each teammate is a full separate Claude Code instance with its own context window. This is expensive. Recommended starting point: 3-5 teammates. Watch actual usage before going larger.
   - **How to apply:** Don't spawn large teams "just in case." Size the team to the actual number of independent work streams.

4. **Teammates don't inherit the lead's conversation history.** Each gets a spawn prompt from the lead, the project CLAUDE.md, and the same MCP/skills setup — but not your conversation context. Self-contained task descriptions in the spawn prompt are critical.
   - **How to apply:** Write spawn prompts as if briefing someone who knows nothing about your current conversation.

5. **Three hooks for team control.** `TeammateIdle` (exit 2 keeps them working), `TaskCreated` (exit 2 prevents task creation), `TaskCompleted` (exit 2 prevents completion marking). These allow programmatic enforcement of team behavior.
   - **How to apply:** Use `TeammateIdle` hook to auto-assign next tasks to idle teammates without manual intervention.

6. **Known limitations.** No session resumption with in-process teammates; task status can lag (teammates may fail to mark tasks complete); one team per session; no nested teams; lead is fixed for the session's lifetime.
   - **How to apply:** Monitor and steer teams actively — don't leave them unattended for long periods. Use `Shift+Down` to cycle between teammates.

## Notable Commands / Code Snippets

```json
// Enable in settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

```
# Example team prompt — competing hypotheses debugging
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific debate.
```

```
# Key controls
Shift+Down   # Cycle through teammates
Ctrl+T       # Toggle task list
```

## Related Topics

claude-code, agent-teams, multi-agent, parallel-agents, orchestration, subagents, coordination
