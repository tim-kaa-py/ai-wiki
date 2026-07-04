---
title: "Orchestrate teams of Claude Code sessions"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/agent-teams"
pillar: "building"
tags: [claude-code, agent-teams, multi-agent, parallel-agents, orchestration, subagents, coordination]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Orchestrate teams of Claude Code sessions

> Coordinate multiple Claude Code instances working together as a team, with shared tasks, inter-agent messaging, and centralized management.

**Status:** Experimental, disabled by default. Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json.

Agent teams let you coordinate multiple Claude Code instances. One session acts as the team lead, coordinating work, assigning tasks, and synthesizing results. Teammates work independently, each in its own context window, and communicate directly with each other.

Unlike subagents (which run within a single session and only report back to the main agent), teammates can message each other directly without going through the lead.

## When to use agent teams

Strongest use cases:
- **Research and review**: multiple teammates investigate different aspects simultaneously, then share and challenge each other's findings
- **New modules or features**: teammates each own a separate piece without stepping on each other
- **Debugging with competing hypotheses**: teammates test different theories in parallel and converge on the answer faster
- **Cross-layer coordination**: changes spanning frontend, backend, and tests, each owned by a different teammate

Agent teams add coordination overhead and use significantly more tokens. They work best when teammates can operate independently.

## Subagents vs agent teams

| Aspect | Subagents | Agent teams |
|---|---|---|
| **Context** | Own context window; results return to caller | Own context window; fully independent |
| **Communication** | Report results back to main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower | Higher: each teammate is a separate Claude instance |

## Enable agent teams

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## Starting a team

Tell Claude to create an agent team and describe the task in natural language:

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles: one
teammate on UX, one on technical architecture, one playing devil's advocate.
```

Claude creates the team, spawns teammates, coordinates work, synthesizes findings, and cleans up.

## Architecture

| Component | Role |
|---|---|
| **Team lead** | The main Claude Code session that creates the team, spawns teammates, coordinates work |
| **Teammates** | Separate Claude Code instances that each work on assigned tasks |
| **Task list** | Shared list of work items that teammates claim and complete |
| **Mailbox** | Messaging system for communication between agents |

Teams and tasks are stored locally:
- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

## Display modes

- **In-process**: all teammates run inside your main terminal. Use Shift+Down to cycle through teammates.
- **Split panes**: each teammate gets its own pane. Requires tmux or iTerm2.

## Key controls

- `Shift+Down`: cycle through teammates
- `Ctrl+T`: toggle the task list
- **Plan approval**: spawn teammates in read-only plan mode until the lead approves their approach
- **Self-claim**: after finishing a task, teammates pick up the next unassigned task automatically

## Enforcement with hooks

- `TeammateIdle`: runs when a teammate is about to go idle. Exit code 2 keeps them working.
- `TaskCreated`: runs when a task is being created. Exit code 2 prevents creation.
- `TaskCompleted`: runs when a task is being marked complete. Exit code 2 prevents completion.

## Context and communication

Each teammate loads the same project context as a regular session (CLAUDE.md, MCP servers, skills) plus the spawn prompt from the lead. The lead's conversation history does not carry over.

Teammates share findings via: automatic message delivery, idle notifications to lead, and a shared task list.

**Token costs scale linearly**: each teammate has its own context window. Start with 3-5 teammates.

## Use case examples

### Parallel code review
```
Create an agent team to review PR #142:
- One focused on security implications
- One checking performance impact
- One validating test coverage
```

### Competing hypotheses debugging
```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific debate.
```

## Best practices

- Give teammates enough context in the spawn prompt (they don't inherit lead's conversation history)
- Start with 3-5 teammates; coordinate overhead increases beyond that
- Size tasks for each teammate to own independently (avoid same-file edits)
- Start with research and review tasks if new to agent teams
- Monitor and steer; don't leave teams unattended for long

## Limitations

- No session resumption with in-process teammates
- Task status can lag (teammates may fail to mark tasks complete)
- One team per session
- No nested teams
- Lead is fixed for the session's lifetime
- Permissions set at spawn time
