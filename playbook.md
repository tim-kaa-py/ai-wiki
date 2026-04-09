# My Agentic Coding Playbook

> A living document. Auto-updated when new relevant sources are ingested.
> Last updated: 2026-04-09

## Core Principles

1. **The Agentic Trap: Simplicity wins.** Beginners use simple prompts. Intermediates over-engineer (8 agents, orchestration pipelines, 18 slash commands). Experts return to short, direct prompts. The sophistication lives in your understanding, not your tooling. *(Source: Steinberger)*

2. **Empathize with the agent.** The agent starts every session from zero. Ask yourself: "If I were dropped into this codebase cold, what would I need to know?" Then tell the agent exactly that — point it to files, modules, constraints. *(Source: Steinberger)*

3. **Build your codebase for the agent.** Don't fight the names the agent picks — they're the most obvious names in the weights. Keep file structure clean and discoverable. Write CLAUDE.md and agent files that orient quickly. *(Source: Steinberger)*

4. **Never revert — always move forward.** Rolling back and redoing takes longer than pushing forward. Commit when you like the outcome. If something breaks, make it your next prompt: "This broke X — fix it while keeping Y." *(Source: Steinberger)*

5. **Treat it like managing an engineering team.** Your team won't write code exactly like you would. Let go of perfection. Accept working solutions. Judge output by "does this work and move the project forward?" not "is this how I'd write it?" *(Source: Steinberger)*

6. **It's a skill — practice compounds.** Agentic engineering is like playing an instrument. You need to play with the tools, build things, develop a feel. Each step compounds. Dedicate time to experimenting. *(Source: Steinberger)*

7. **Approach it like a conversation.** Guide with intent first, implementation second. If the agent is spinning, interrupt and reframe. Long execution time is feedback — maybe you didn't give enough context. *(Source: Steinberger)*

## Workflow Patterns

### Session Management
- Run **multiple Claude Code terminal windows side by side**, each with its own task
- Dedicated sessions: one for a larger feature, one for exploration, others for bugs/docs
- Switch between terminals with keyboard, use **voice input** for agent conversations
- Type for quick terminal commands (faster), talk for agent conversations

### Git & CI
- **No develop branch** — commit directly to main
- Main is always shippable
- **Local CI** (DHH-inspired) — run tests locally, push to main if they pass
- Commit when satisfied with outcome, not after every change

### PR Review (Agent-Assisted)
1. Hand PR to the agent: "Review this PR"
2. First question: "Do you understand the **intent**?" (why, not how)
3. "Is this the most optimal way?"
4. Point agent to unseen parts of codebase: "Have you looked at X, Y, Z?"
5. Discuss the optimal solution
6. Consider broader refactor — "refactors are cheap now"
7. Decide: ship or defer

### The soul.md Concept
- Create a personality/values document for your agent
- Let the agent contribute to its own identity file
- Captures how you want to work with AI, core values, interaction style

## Tool Mastery: Claude Code

### Session Mobility
| Command | What it does |
|---------|-------------|
| `--teleport` | Move a web/mobile session to local terminal |
| `--remote-control` | Control local session from phone/web |
| `/branch` | Fork session to explore alternatives without losing context |
| `/btw` | Quick side question without interrupting work |

### Automation
| Command | What it does |
|---------|-------------|
| `/loop 5m <prompt>` | Run a prompt on a recurring interval |
| Hooks | Deterministic logic at lifecycle events (PreToolUse, PostToolUse, etc.) |
| `--bare` | Minimal mode for scripted/CI usage |

### Parallel Work
| Command | What it does |
|---------|-------------|
| `--worktree` / `-w` | Isolated checkout per session — no file conflicts |
| `/batch` | Fan out large changes to parallel agents, each opens a PR |
| `--add-dir` | Access multiple directories/repos in one session |

### Custom Agents
- Define in `.claude/agents/my-agent.md` with frontmatter: name, tools, model, permissions
- Use for specialized workflows: code review, debugging, documentation, read-only analysis
- Scope hierarchy: CLI flag > project > user > plugin

### Voice
- `/voice` or `export CLAUDE_CODE_VOICE_DICTATION=true`
- Hold Space to record, release to transcribe
- Encourages conversational, natural prompting

## Anti-Patterns

- **Over-engineering prompt pipelines** — elaborate orchestration when a simple prompt would do
- **Micromanaging agent output** — forcing your exact style instead of accepting working solutions
- **Reverting instead of fixing forward** — rolling back wastes the agent's work and your time
- **Not giving enough context** — the agent starts from zero every session; don't assume it knows
- **Ignoring execution time as feedback** — if the agent is spinning, the problem is your prompt or the architecture, not the agent
- **Mixing unrelated concerns in one session** — keep sessions focused on one task
