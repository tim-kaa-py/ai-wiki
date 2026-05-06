---
title: "Claude Code Agent Teams"
type: "how-to"
pillar: "building"
tags: [claude-code, agent-teams, multi-agent, parallel-agents, orchestration, subagents, coordination, experimental]
sources:
  - "summaries/2026-05-06_claude-code-docs_agent-teams.md"
  - "summaries/2026-05-06_claude-code-docs_features-overview.md"
last_updated: "2026-05-06"
---

# Claude Code Agent Teams

Agent teams (experimental, disabled by default) coordinate multiple independent Claude Code sessions with **peer-to-peer messaging** and a shared task list — going beyond [subagents](claude-code-custom-subagents.md), which only report back to a single orchestrator. The main use case is parallel independent work where teammates need to share and challenge each other's findings without everything routing through the lead.

## Agent Teams vs Subagents (Architectural Difference)

| | Subagents | Agent Teams |
|--|-----------|-------------|
| Communication | Hub-and-spoke (children → main) | Peer-to-peer (teammate ↔ teammate) |
| Coordination | Main agent dispatches and synthesizes | Shared task list + shared mailbox |
| State | Each subagent isolated, returns summary | Each teammate is a full Claude Code session |
| Cost | One subagent at a time, summary back | Linear in teammate count — every teammate is a full session |
| Right when | Independent task that returns one result | Multiple teammates need to share/challenge findings |

**Trigger to graduate from subagents to teams:** when you find yourself wishing subagents could share findings with each other.

## Enable Agent Teams

In `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## Strongest Use Case: Competing Hypotheses Debugging

Anthropic explicitly recommends the **scientific debate** prompt pattern: spawn 3-5 teammates with different hypotheses, prompt them to actively try to disprove each other, and converge faster than sequential investigation.

```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific debate.
```

For hard bugs, this beats sequential investigation because teammates challenge each other's assumptions — the main bottleneck of single-investigator debugging.

## Other Use Cases

- **Multi-domain review** — one teammate per concern (security, performance, UX) reviewing the same artifact and exchanging findings.
- **Cross-layer feature work** — one teammate per layer (DB, API, UI) where coordination requires sharing schema decisions.
- **Independent parallel research** — teammates exploring different libraries/approaches and surfacing tradeoffs to each other.

## Key Constraints

- **Teammates do NOT inherit the lead's conversation history.** Each teammate gets its spawn prompt, the project CLAUDE.md, and the same MCP/skills setup — but not your conversation context. Self-contained spawn prompts are critical.
- **Token cost scales linearly with teammate count.** Each teammate is a full Claude Code instance. Recommended starting point: **3-5 teammates**. Watch usage before going larger.
- **One team per session, no nested teams.** The lead is fixed for the session's lifetime.
- **No session resumption** with in-process teammates.
- **Task status can lag** — teammates may fail to mark tasks complete; monitor and steer actively.

## Hooks for Team Control

Three new hook events scope to team behavior:

| Hook | Fires when | Exit 2 |
|------|-----------|--------|
| `TeammateIdle` | A teammate has nothing to do | Keeps them working |
| `TaskCreated` | A task is added to the shared list | Prevents task creation |
| `TaskCompleted` | A teammate marks a task done | Prevents the completion mark |

Use `TeammateIdle` with exit 2 to auto-assign next tasks to idle teammates without manual intervention.

## Controls

```
Shift+Down   # Cycle through teammates
Ctrl+T       # Toggle task list
```

## Spawn-Prompt Discipline

Because teammates don't inherit your conversation, write spawn prompts as if briefing someone who knows nothing about your current session:

- Restate the problem in full
- Name the files / paths the teammate should investigate
- Spell out the success criteria
- State which other teammates exist and what they're working on
- Include the protocol: when to message peers, when to mark tasks done

This is the same discipline as [Claude Routines](../tools/claude-routines.md) prompts — autonomous execution requires self-contained briefs.

## When NOT to Use Agent Teams

- One independent task with one result — use a subagent.
- The work is sequential — no parallelism to extract.
- You can't write a self-contained spawn prompt for each teammate yet — clarify the work before spending the tokens.
- Cost-sensitive run — agent teams are linear in teammate count.

## Decision Map: Subagents → Agent Teams → Routines

| Need | Mechanism |
|------|-----------|
| Run a side task in isolated context, return summary | Subagent |
| Multiple workers that need to share findings | Agent team |
| Autonomous run on a schedule or trigger, no human in loop | [Claude Routine](../tools/claude-routines.md) |

## Related Pages

- [Claude Code Custom Subagents](claude-code-custom-subagents.md) — the hub-and-spoke alternative
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — orchestrator-worker vs lock-file-team patterns this overlays
- [Agent Orchestration Patterns](../concepts/agent-orchestration-patterns.md) — Anthropic's five canonical patterns
- [Claude Code](../tools/claude-code.md) — the platform agent teams run on
- [Claude Routines](../tools/claude-routines.md) — autonomous run mechanism (different problem)
