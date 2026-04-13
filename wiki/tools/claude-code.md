---
title: "Claude Code"
type: "tool"
pillar: "building"
tags: [claude-code, cli, agentic-engineering, automation, voice-input, knowledge-management, hooks, memory]
sources:
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
last_updated: "2026-04-13"
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
- IDE used only as diff viewer — not for writing code

### Output Verification Principle
Boris Cherny says the most important tip for using Claude Code is to give Claude a way to verify its own output. If the AI cannot see what it built, it is basically guessing. For front-end work, use the Chrome extension. The desktop app can auto-start web servers and test in a built-in browser.

### Session Mobility
| Command | Direction | Use case |
|---------|-----------|----------|
| `--teleport` | Web/mobile → terminal | Continue a web session locally with full environment access |
| `--remote-control` | Terminal → phone/web | Steer a local session from your phone |
| `/branch` | Fork in place | Explore an alternative without losing current context |
| `/btw` | Side query | Ask a question without polluting the main thread |

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

## Hooks for Self-Evolving Memory

Claude Code hooks enable zero-maintenance memory capture by firing automatically at session lifecycle boundaries. Cole Medin's implementation uses three hooks to create a self-maintaining knowledge base:

| Hook | Fires when | What it does |
|------|-----------|-------------|
| `session_start` | Session begins | Loads agents.md + index.md into context — gives the agent a self-model of the knowledge base |
| `pre_compact` | Before context compaction | Captures session summary before context is compressed — prevents information loss |
| `session_end` | Session ends | Captures final session summary into daily log files |

Configuration in `.claude/settings.json`:
```json
{
  "hooks": {
    "session_start": "python scripts/session_start.py",
    "pre_compact": "python scripts/pre_compact.py",
    "session_end": "python scripts/session_end.py"
  }
}
```

The pre-compact and session-end hooks call the **Claude Agent SDK** as a separate background process for summarization. This avoids blocking the main session — the agent continues working while a spawned Claude instance handles the heavy processing. Uses the existing Anthropic subscription (no API key setup needed).

A daily **flush** process then promotes accumulated session logs into structured wiki pages — extracting concepts, connections, and decisions. This creates the compounding loop: every conversation makes the next one more informed. *(Source: Cole Medin)*

See [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) for the full implementation guide.

## Beyond Code: Knowledge Management

Claude Code isn't limited to writing code. Using the Karpathy LLM wiki pattern, it can build and maintain a structured knowledge base — ingesting sources, creating cross-referenced wiki pages, and keeping everything consistent. Paired with Obsidian for visualization, it becomes a "digital brain" engine. The CLAUDE.md file serves as the brain's operating manual, telling Claude how to behave with respect to the wiki's schema.

## Prompting for Claude 4.6

Claude 4.6 models are significantly more proactive than predecessors. Key adjustments from Anthropic's official guidance:

- **Dial back aggressive prompting.** "CRITICAL: You MUST use this tool" → "Use this tool when...". Anti-laziness prompts that were needed for older models now cause overtriggering.
- **Adaptive thinking replaces budget_tokens.** Use `thinking: {type: "adaptive"}` with `effort` parameter (high/medium/low) instead of manual `budget_tokens`.
- **Subagent overuse is the new risk.** Claude 4.6 spawns subagents proactively. Add guardrails for when direct work is faster.
- **Prefills are deprecated.** Use structured outputs or explicit instructions instead of prefilled assistant turns.

See [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md) for the full set of patterns.

## Related Pages

- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md)
- [Obsidian](obsidian.md)
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md)
