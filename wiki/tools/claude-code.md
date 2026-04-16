---
title: "Claude Code"
type: "tool"
pillar: "building"
tags: [claude-code, cli, agentic-engineering, automation, voice-input, knowledge-management, hooks, memory, routines, permissions, mcp]
sources:
  - "summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md"
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md"
  - "summaries/2026-04-15_claude-docs_optimize-your-terminal-setup.md"
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
last_updated: "2026-04-15"
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
Boris Cherny (creator of Claude Code) says the single most impactful practice is giving Claude a verification feedback loop — tests, typecheck, lint. With a feedback loop, the quality of the final result is **2-3x higher**. Claude should test every single change. For front-end work, use the Chrome extension. The desktop app can auto-start web servers and test in a built-in browser.

**CLAUDE.md verification template (Boris Cherny):**
```markdown
# 1. Make changes
# 2. Typecheck (fast): bun run typecheck
# 3. Run tests
   # Single suite: bun run test -- "test name"
   # All files: bun run test
# Before committing:
# 4. List files changed: git diff --name-only
# 5. Run lint on changed files: bun run lint/<file>
```

*(Source: Boris Cherny, Creator of Claude Code)*

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
| Hooks (settings.json) | Deterministic lifecycle logic: auto-format (PostToolUse), block edits, log commands, re-inject context |
| `--bare` | Minimal mode for CI/CD and scripted usage — skips auto-discovery |
| **Routines** | Scheduled/triggered autonomous sessions in cloud containers — see [Claude Routines](claude-routines.md) |

### Parallel Work
| Command | What it does |
|---------|-------------|
| `--worktree` / `-w` | Isolated git checkout per session — multiple agents, no file conflicts |
| `/batch` | Fan out large changes to parallel worktree agents, each opens a PR |
| `--add-dir` | Access multiple directories/repos in one session |

### Plan Mode
Press **Shift+Tab twice** to enter Plan mode. Boris Cherny starts almost every session here — write a full blueprint before execution. Claude can often one-shot complex tasks when given a solid plan upfront. *(Source: Boris Cherny, Creator of Claude Code)*

### Custom Agents
Define in `.claude/agents/my-agent.md` with frontmatter controlling name, tools, model, and permissions. Use for specialized workflows: code review, debugging, documentation, read-only analysis.

Boris Cherny's personal agent set: `build-validator.md`, `code-architect.md`, `code-simplifier.md`, `oncall-guide.md`, `verify-app.md`. Each encodes detailed instructions for a specific task run at a consistent point in the workflow (e.g. code-simplifier runs after Claude finishes, verify-app runs before shipping). *(Source: Boris Cherny, Creator of Claude Code)*

### Permissions: `/permissions` vs `--dangerously-skip-permissions`
The `/permissions` command lets you pre-allow safe bash commands by pattern (e.g. `Bash(bun run test:*)`). Allowlists are stored in `.claude/settings.json` and can be checked into the team repo so all teammates share the same pre-approved command set. **Never use `--dangerously-skip-permissions`** — it is a blanket bypass with no granularity.

See [Claude Code Permissions](../how-tos/claude-code-permissions.md) for the full how-to. *(Source: Boris Cherny, Creator of Claude Code)*

### MCP Integration
Claude Code can use MCP servers to interact with external services (Slack, BigQuery, Sentry). Configuration lives in `.mcp.json`, checked into the team repo so all team members get the same tool access.

```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.anthropic.com/mcp"
    }
  }
}
```

*(Source: Boris Cherny, Creator of Claude Code)*

### Parallel Sessions
Boris Cherny runs 5-10 Claudes in parallel — `claude.ai/code` tabs alongside local terminal sessions. Hand off reviews or kick off background work while continuing in the terminal. Use `/compact` to manage context across sessions. *(Source: Boris Cherny, Creator of Claude Code)*

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

## Routines: Autonomous Scheduled Agents

Routines are Claude Code sessions that execute autonomously in standardized cloud containers, triggered by a schedule, webhook, API call, or GitHub event. They complete the automation trifecta — trigger, logic, output — making Claude a direct competitor to no-code platforms like n8n and Make.com.

Key characteristics:
- **Connectors** provide OAuth-based access to external services (Gmail, Slack)
- **Managed sessions** enable inter-agent orchestration — routines can spin up specialized sub-agents in isolated containers
- **Routine prompts** must be self-contained SOPs (no human-in-the-loop to course-correct)
- **No prompt length limit** — include extensive context, edge cases, and fallback behaviors
- Routines can be **chained via webhooks** to create event-driven multi-step pipelines in natural language

Access at: `claude.ai/code/routines`

See [Claude Routines](claude-routines.md) for the full feature breakdown and [Claude Routines vs n8n](../comparisons/claude-routines-vs-n8n.md) for the comparison. *(Source: Nick Saraev)*

## Terminal Setup

| Concern | Solution |
|---------|----------|
| Shift+Enter (VS Code, Alacritty, Zed, Warp) | Run `/terminal-setup` inside Claude Code |
| Shift+Enter (tmux) | Add `set -s extended-keys on` + `set -as terminal-features 'xterm*:extkeys'` to `~/.tmux.conf` |
| Notifications (iTerm2) | Settings → Profiles → Terminal → enable "Notification Center Alerts" → Filter Alerts → check "Send escape sequence-generated alerts" |
| Notifications through tmux | Add `set -g allow-passthrough on` to `~/.tmux.conf` |
| Custom notification behavior | Use notification hooks (`/en/hooks#notification`) — run alongside native notifications |
| Flicker / scroll jumping | `export CLAUDE_CODE_NO_FLICKER=1` |
| Very long pastes truncating | Write to file, ask Claude to read it; avoid VS Code terminal for large inputs |
| Vim keybindings | `/config` → Editor mode, or set `"editorMode": "vim"` in `~/.claude.json` |

Kitty and Ghostty support notifications and Shift+Enter natively — no configuration needed. iTerm2 needs the notification opt-in above. macOS Terminal.app does not support native notifications; use hooks instead. *(Source: Anthropic docs)*

## Orchestration Layers: GSD, Superpowers, and Why Vanilla Wins

Third-party orchestration layers like [GSD](gsd.md) and [Superpowers](superpowers.md) sit on top of Claude Code and restructure how it approaches complex projects — adding planning rigor, sub-agent-driven development, and context management. Chase AI's head-to-head benchmark (same AI agency website built by all three) found that vanilla Claude Code won decisively:

| Tool | Time | Tokens | Output quality |
|------|------|--------|----------------|
| **Claude Code (vanilla)** | 20 min | 200K | Indistinguishable |
| **Superpowers** | 1 hr | 250K | Indistinguishable |
| **GSD** | 1 hr 45 min | 1.2M | Indistinguishable |

The core argument: Claude Code has natively absorbed many features that originally justified orchestration layers (e.g., auto context clearing). The time saved by skipping them is better spent iterating. The "line in the sand" problem makes it even stronger — you cannot reliably predict whether a task is complex enough to justify orchestration overhead, and the penalty for misjudging is near zero with vanilla Claude Code.

**Recommendation:** Default to vanilla Claude Code. Only escalate to an orchestration layer if you hit actual complexity walls, not anticipated ones. If you must use one, Superpowers is lighter and more fluid than GSD.

See [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) for the full comparison, [GSD](gsd.md), and [Superpowers](superpowers.md). *(Source: Chase AI)*

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

- [Claude Code Permissions](../how-tos/claude-code-permissions.md)
- [Claude Routines](claude-routines.md)
- [Claude Routines vs n8n](../comparisons/claude-routines-vs-n8n.md)
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md)
- [GSD](gsd.md)
- [Superpowers](superpowers.md)
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md)
- [Obsidian](obsidian.md)
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md)
