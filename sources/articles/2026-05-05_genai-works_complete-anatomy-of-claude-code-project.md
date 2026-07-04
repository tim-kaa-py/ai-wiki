---
title: "The Complete Anatomy of a Claude Code Project - 2026"
type: "article"
channel: "GenAI Works"
date: "2026-05-05"
resource: ""
pillar: "building"
tags: [claude-code, project-structure, cheatsheet, reference, hooks, skills, subagents, plugins, mcp, agent-teams]
timestamp: "2026-05-05"
extraction_method: "user-pasted"
notes: "Source is a JPEG infographic dropped into inbox/. Watermarked GenAI Works. Original publication URL not provided by user — likely from social media (LinkedIn / X). The 'date' field is the ingestion date; image creation date unknown."
---

# The Complete Anatomy of a Claude Code Project - 2026

*(verbatim transcription of the infographic; visual tree formatting preserved)*

```
> tree --claude-code-anatomy my-project/

my-project/
├── CLAUDE.md                            # Project Brain (auto-loaded every session)
│                                        # Architecture + Tech Stack + Conventions + Workflow Rules
│                                        # Hierarchy: root → subdirectory → child (on demand)
│                                        # Run /init to auto-generate
│
├── CLAUDE.local.md                      # Personal Overrides (gitignored)
│                                        # Local env paths + Debugging shortcuts + Private prefs
│
├── .claude/
│   ├── settings.json                    # Permissions + Hooks + Env Vars
│   │                                    # Tool access + Allowed commands + Hook configs
│   │                                    # Checked into git → shared across team
│   │
│   ├── skills/
│   │   └── review/
│   │         └── SKILL.md               # Reusable Expertise
│   │                                    # Auto-invoked when task context matches description
│   │                                    # YAML frontmatter → Also a /slash-command
│   │                                    # Can fork into a subagent
│   │
│   ├── agents/
│   │   └── code-reviewer.md             # Subagents
│   │                                    # Isolated context windows + Own worktree
│   │                                    # Frontmatter: name, description, tools, model
│   │                                    # 3 built-in: Explore (Haiku) + Plan + General
│   │                                    # Set isolation: worktree for parallel dev
│   │
│   ├── agent-memory/                    # Persistent Knowledge Across Sessions
│   │
│   └── worktrees/                       # Git-level Isolation for Parallel Agents
│                                        # Each agent gets its own branch + filesystem
│                                        # .claude → worktree task-name
│
├── .mcp.json                            # External Tool Connections (MCP)
│                                        # JIRA → GitHub → Slack → Databases → Any API
│                                        # Committed to git for team sharing
│                                        # Channels: push messages into live sessions
│
├── .claudeignore                        # Context Boundaries
│                                        # Files Claude should never read
│                                        # Critical for large monorepos
│
└── plugins/                             # Bundled Distribution
                                         # Skills + Agents + Commands packaged for teams
                                         # Install scripts auto-detect and copy to right locations
```

## HOOKS — 25 Lifecycle Events (Deterministic • Cannot Hallucinate)

**Blocking:**       PreToolUse + UserPromptSubmit + PermissionRequest + Stop + SubagentStop + PreCompact

**Informational:**  SessionStart + SessionEnd + PostToolUse + SubagentStart + Notification + FileChanged

## AGENT TEAMS — Multi-Agent Coordination (Experimental)

Multiple Claude sessions as peers — not just delegation, but collaboration.

Shared task list • Direct messaging • Worktree isolation • 1M-token context each.

Structured execution memory ensures Claude is not a chatbot, but an OS for active development.
