---
title: "Claude Code"
type: "tool"
pillar: "building"
tags: [claude-code, cli, agentic-engineering, automation, voice-input]
sources:
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
last_updated: "2026-04-09"
---

# Claude Code

Anthropic's CLI-based AI coding agent. Not just a terminal chat — a full operating environment for agentic engineering spanning mobile, web, desktop, and terminal.

## Why It Matters

Peter Steinberger tried Cursor but came back to Claude Code as his primary driver because it runs entirely in the terminal, making it trivial to run multiple parallel sessions. Boris Cherny (who built Claude Code) uses it as a complete development environment with session mobility, automation, and custom agents.

## Core Usage Patterns

### Multi-Session Workflow (Steinberger)
- Multiple terminal windows side by side, each running its own agent session
- Dedicated sessions by task type: features, exploration, bugs, docs
- Voice input for agent conversations, keyboard for terminal commands
- At peak: 7 Max subscriptions, burning through one per day

### Session Mobility
| Command | Direction | Use case |
|---------|-----------|----------|
| `--teleport` | Web/mobile -> terminal | Continue a web session locally with full environment access |
| `--remote-control` | Terminal -> phone/web | Steer a local session from your phone |
| `/branch` | Fork in place | Explore an alternative without losing current context |

### Automation
| Command | What it does |
|---------|-------------|
| `/loop 5m <prompt>` | Recurring tasks: babysitting PRs, watching deploys, sweeping review comments |
| Hooks (settings.json) | Deterministic lifecycle logic: auto-format, block edits, log commands, re-inject context |
| `--bare` | Minimal mode for CI/CD and scripted usage — skips auto-discovery |

### Parallel Work
| Command | What it does |
|---------|-------------|
| `--worktree` / `-w` | Isolated git checkout per session — multiple agents, no file conflicts |
| `/batch` | Fan out large changes to parallel worktree agents, each opens a PR |
| `--add-dir` | Access multiple directories/repos in one session |

### Custom Agents
Define in `.claude/agents/my-agent.md` with frontmatter controlling name, tools, model, and permissions. Use for specialized workflows: code review, debugging, documentation, read-only analysis.

### Voice
`/voice` or `export CLAUDE_CODE_VOICE_DICTATION=true`. Hold Space to record, release to transcribe. Encourages conversational prompting over terse typed instructions.

## Key Insight

> "Most people still think of Claude Code as something that only lives inside one terminal window. Power users are using it like a whole operating environment." — Boris Cherny

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Peter Steinberger](../people/peter-steinberger.md)
