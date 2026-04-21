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
  - "summaries/2026-04-16_self_claude-code-statusline-setup.md"
  - "summaries/2026-04-07_ben-ai_karpathys-autoresearch-10x-claude.md"
  - "summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md"
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2026-04-19_self_vscode-claude-code-hotkey.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-03-25_anthropic_claude-code-auto-mode.md"
  - "summaries/2025-10-20_anthropic_claude-code-sandboxing.md"
  - "summaries/2025-10-16_anthropic_agent-skills.md"
  - "summaries/2026-02-05_anthropic_building-c-compiler.md"
  - "summaries/2025-06-13_anthropic_multi-agent-research-system.md"
  - "summaries/2026-04-20_chase-ai_only-claude-design-guide-you-should-watch.md"
  - "summaries/2026-04-18_jono-catliff_how-i-built-insane-claude-design-websites-in-10-minutes.md"
last_updated: "2026-04-21"
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

### Permissions: Three Strategies
Anthropic's canonical guidance: Claude Code offers **three complementary permission strategies**, not one right answer. Compose them.

| Strategy | Command | When to use |
|----------|---------|-------------|
| **Allowlist** | `/permissions` | Team-shared pre-approved safe commands (build/test/lint) |
| **Auto mode** | `--permission-mode auto` | Long autonomous runs; classifier gates each action |
| **Sandbox** | `/sandbox` | OS-level isolation for unknown scripts / unattended runs |

**Never use `--dangerously-skip-permissions`** — it is a blanket bypass with no granularity. All three strategies above are safer.

**Auto mode** uses a two-stage classifier (prompt-injection detector on inputs, transcript classifier on outputs). Classifier strips assistant narrative so the agent can't rationalize bad calls. Three approval tiers (safe-tool allowlist, in-project file ops, high-risk review). Metrics: **0.4% FP / 17% FN**. Escalation halt after 3 consecutive or 20 total denials. Safer than skip-permissions, **not** a substitute for human review on prod.

**Sandbox** (`/sandbox`) uses bubblewrap on Linux, seatbelt on macOS. Restricts filesystem + network — and catches spawned subprocesses, which application-level permissioning can't. Internal testing: **-84% permission prompts**. Claude Code on the Web extends this to cloud VMs with credentials held in a separate proxy (Claude never touches signing keys).

See [Claude Code Permissions](../how-tos/claude-code-permissions.md), [Auto Mode](../how-tos/claude-code-auto-mode.md), and [Sandboxing](../how-tos/claude-code-sandboxing.md). *(Source: Anthropic Engineering, Boris Cherny)*

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

### VSCode Hotkey Launch (Editor Tab)

For users running Claude Code inside VSCode, a custom terminal profile + keybinding with `location: "editor"` binds Ctrl/Cmd+Shift+C to open Claude Code as a full editor tab rather than in the bottom panel. Each press spawns an independent session — ideal for Steinberger's multi-session workflow inside a single IDE window.

See [VSCode Hotkey: Launch Claude Code in Editor Tab](../how-tos/vscode-claude-code-hotkey.md) for the full setup.

### Status Line: Live Dashboard

Claude Code supports a custom status line configured via `settings.json`. A well-designed status line turns the terminal into a live dashboard showing context window usage, session cost, rate limit burn rates, git branch, and code velocity — situational awareness without leaving the editor.

**Configuration:**
```json
"statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}
```

**Key indicators:**
| Indicator | What it shows | Why it matters |
|-----------|--------------|----------------|
| Context window (color-coded) | Green (0-19%), Yellow (20-69%), Red (70%+) | Yellow = consider wrapping up or starting a new session |
| Rate limit burn rate | Usage%/elapsed hours + sustainability color | Red = unsustainable pace; slow down or switch tasks |
| Burn indicator (lightning bolt) | Single interaction consumed >5% of the 5h limit | The last prompt was expensive; break large tasks into smaller steps |
| Session cost (EUR) | Running cost + kilotokens counter | Session efficiency at a glance |
| API wait % | Fraction of time waiting on API responses | High (>70%) = you're keeping the model busy; Low = batch your prompts |
| Code velocity (+/-) | Lines added/removed across session | Productivity pulse |

See [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md) for the full setup guide. *(Source: self)*

## Front-End Work: Hand Off to Claude Design

For front-end / landing-page / slide-deck work, Claude Code is **not** the fastest path to ~90% of the final design. Chase AI's argument: one-shot output from Claude Code and [Claude Design](claude-design.md) is comparable, but Claude Design lets you iterate via *tweaks* on an already-rendered page, while Claude Code re-generates from a blank state on every prompt.

**Recommended split:** use Claude Design to nail the visual design (design system → variants → tweaks), export HTML, then bring it into Claude Code for production build-out — routing, state management, backend wiring, deploy. Don't pick one tool for the whole job.

**Deploy pipeline (Jono Catliff):** After the Claude Design Export → Handoff to Claude Code command, append a one-shot build prompt naming **Next.js + GSAP + CLAUDE.md**. Then: Claude Code pushes to a fresh GitHub repo via a single instruction → Vercel imports the repo with **Framework Preset = Next.js** (the only non-default field) → custom domain via Vercel Domains tab. A prepared CLAUDE.md at the project root is the linchpin — without it you get generic scaffolding on the one-shot. See [Claude Design § Export → Claude Code → Deploy Pipeline](claude-design.md#export--claude-code--deploy-pipeline-jono-catliff).

See [Claude Design](claude-design.md) for the workflow, pitfalls (usage burn, variant/tweak ordering), and mobile handling. *(Source: Chase AI, Jono Catliff)*

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

### Self-Improving CLAUDE.md via Auto Research

Karpathy's Auto Research framework can be turned on CLAUDE.md files themselves — defining boolean criteria (e.g., "file routing accuracy to correct folders > 90%") and running autonomous optimization loops against test scenarios. This is a meta-application: using the system to improve the system's own instructions. See [Auto Research](../concepts/auto-research.md). *(Source: Ben AI)*

## Claude Code Is an Agent Product, Not a Platform

On [The AI Automators' build-to-buy spectrum](../concepts/agent-platform-tiers.md), Claude Code is explicitly **off-spectrum**. The five tiers (direct API → frameworks → managed platforms → low-code → embedded SaaS) describe where you build agents *for others*. Claude Code is a finished agent product you *use*, alongside OpenClaude.

The practical implication when scoping internal tooling: ask "do we need to **build** an agent, or **adopt** one?" first. A Claude Code license (or a Claude Routine, or a pre-built agent) may replace a whole Tier-2 build. Don't conflate "we need agents" with "we need to build an agent platform."

For context on the managed-agent landscape (Claude Managed Agents, LangChain Deep Agents Deploy, OpenAI Agents SDK) and when to build vs. buy, see [Managed Agent Platforms](../comparisons/managed-agent-platforms.md). *(Source: The AI Automators)*

## Claude Code as Agentic Proposer (Meta Harness)

In Stanford's **Meta Harness** paper (Omar Khattab, March 2026), the optimizer that reads raw execution traces, diagnoses failures, and writes a complete new harness is **Claude Code with Opus 4.6**. Scale per iteration: ~10M tokens, ~82 files read, 400x more feedback than any prior harness-optimization method.

The notable claim: a harness optimized by this loop **transfers across five models** and **Haiku + optimized harness beat Opus + optimized harness**. The harness — not the model running inside it — is the reusable asset.

Practical implication for Claude Code users: Claude Code is already the tool-of-choice when research groups need an agent that can read traces and rewrite pipelines end-to-end. That is a non-trivial endorsement of its file-reading / orchestration / long-context behavior.

See [Meta Harness](../concepts/meta-harness.md) and [Harness Engineering](../concepts/harness-engineering.md). *(Source: PY — Rise of Harness Engineering)*

## Prompting for Claude 4.6

Claude 4.6 models are significantly more proactive than predecessors. Key adjustments from Anthropic's official guidance:

- **Dial back aggressive prompting.** "CRITICAL: You MUST use this tool" → "Use this tool when...". Anti-laziness prompts that were needed for older models now cause overtriggering.
- **Adaptive thinking replaces budget_tokens.** Use `thinking: {type: "adaptive"}` with `effort` parameter (high/medium/low) instead of manual `budget_tokens`.
- **Subagent overuse is the new risk.** Claude 4.6 spawns subagents proactively. Add guardrails for when direct work is faster.
- **Prefills are deprecated.** Use structured outputs or explicit instructions instead of prefilled assistant turns.

See [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md) for the full set of patterns.

## Canonical Best Practices (Anthropic)

Most of Anthropic's official guidance traces to one constraint: **context fills fast, and performance degrades as it fills.** Nearly every rule is downstream of this.

### The Four-Phase Loop: Explore → Plan → Implement → Commit

Default workflow for non-trivial tasks. Use Plan Mode (Shift+Tab twice, or `Ctrl+G` to open the plan in an editor). Skip this only for one-line fixes.

### CLAUDE.md Hygiene

For every line in CLAUDE.md, ask: **"Would removing this make Claude wrong?"** If no, cut it. A bloated CLAUDE.md is an ignored CLAUDE.md.

- **CLAUDE.md** = always loaded, applies broadly (project conventions, tool setup)
- **Skills** = on-demand, domain-specific (see [Agent Skills](../concepts/agent-skills.md))
- **Hooks** = deterministic — use for what must happen every time, not things Claude should "usually" do

CLAUDE.md is *advisory*. Hooks are *deterministic*. Don't put things in CLAUDE.md that need to happen reliably.

### The After-2-Corrections Rule

If you've corrected Claude twice on the same task, don't fight a polluted context. **`/clear` and rewrite the prompt** with what you learned. Keep going in a polluted context and quality compounds downward.

### Fan-Out for Large Changes

Scripted parallel `claude -p` invocations across many files or repos:

```bash
for f in $(cat files.txt); do
  claude -p "apply refactor X to $f" --allowedTools "Edit,Bash(bun run test:*)"
done
```

**Test on 2-3 inputs before fanning out** to catch prompt issues cheaply.

### Writer / Reviewer Pattern

Fresh-context reviewer beats self-review. After the writer Claude finishes, spawn a reviewer Claude with a clean context and the output. The writer can't see its own blind spots; a fresh context can.

### Subagents for Investigation

Use subagents for open-ended investigation — they run in a **separate context window** and return only a summary. Keeps the main session's context clean. This is the cheapest way to "look something up" without polluting the current thread.

### Common Failure Patterns (and the Fix)

| Failure | Fix |
|---------|-----|
| Kitchen-sink session (too many topics) | `/clear` |
| Endless corrections | `/clear` + rewrite prompt |
| Over-specified CLAUDE.md | Prune aggressively |
| Trust-then-verify gap | Always include "and verify by X" |
| Infinite exploration | Scope, or delegate to subagent |

### Useful Side-Channel Commands

```bash
claude --continue            # resume most recent session
claude --resume              # pick from session list
claude -p "prompt" --output-format json
```
```
/btw     # side question that doesn't pollute main context
@path/to/file              # CLAUDE.md import
${user_config.key}         # manifest template literal
```

*(Source: Anthropic — Claude Code Best Practices)*

## Agent Skills

Skills are reusable capability bundles packaged as a directory with a `SKILL.md` file. Available in Claude.ai, Claude Code, Agent SDK, and the Developer Platform.

**Progressive disclosure — three levels:**
1. **L1:** `name` + `description` always in system prompt
2. **L2:** full SKILL.md loads when Claude judges the skill relevant
3. **L3+:** bundled scripts / reference files load on demand

Frontmatter:
```yaml
---
name: my-skill
description: Specific, action-oriented description — what it does and when to use
---
```

The description is the discovery signal. A vague description means the skill never triggers. Put deterministic work into bundled scripts (Anthropic's PDF skill uses Python) instead of burning tokens. **Audit unfamiliar skills before installing** — malicious skills can introduce vulnerabilities.

See [Agent Skills](../concepts/agent-skills.md) for the concept. *(Source: Anthropic Engineering)*

## Parallel Claudes: Lock-File Agent Teams

Nicholas Carlini's C compiler project ran **16 parallel Claude Code agents** in a shared Docker + Git repo, coordinated only by lock files on work items. No human in the loop, no lead agent. ~2,000 sessions over two weeks produced a 100k-line Rust C compiler that compiles Linux 6.9 across x86/ARM/RISC-V with a **99% test pass rate**.

Load-bearing insight: **"The task verifier must be nearly perfect."** Autonomous agents will solve whatever has clear feedback — weak tests cause drift. Most engineering effort goes into test infrastructure, not orchestration.

Contrast with the hierarchical **orchestrator-worker** pattern of the multi-agent research system (lead Opus + parallel Sonnet workers, +90.2% over single-agent Opus, at **15× token cost**). See [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) for both.

## Related Pages

- [Claude Code Permissions](../how-tos/claude-code-permissions.md)
- [Claude Code Auto Mode](../how-tos/claude-code-auto-mode.md)
- [Claude Code Sandboxing](../how-tos/claude-code-sandboxing.md)
- [Agent Skills](../concepts/agent-skills.md)
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md)
- [Claude Design](claude-design.md) — browser-based front-end generator; hand off its HTML export to Claude Code
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
- [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md)
- [Auto Research](../concepts/auto-research.md)
- [Agent Platform Tiers](../concepts/agent-platform-tiers.md) — where Claude Code sits (off-spectrum: an agent product, not a platform)
- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — Claude Managed Agents vs Deep Agents Deploy vs OpenAI Agents SDK
- [Harness Engineering](../concepts/harness-engineering.md) — the discipline the Meta Harness work sits inside
- [Meta Harness](../concepts/meta-harness.md) — the research loop that uses Claude Code as its proposer
