---
title: "Claude Code"
description: "Anthropic's CLI-based agentic coding environment spanning mobile, web, desktop, and terminal"
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
  - "summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
  - "summaries/2026-04-25_claude-code-docs_create-plugins.md"
  - "summaries/2026-04-25_claude-code-docs_create-custom-subagents.md"
  - "summaries/2026-05-05_genai-works_complete-anatomy-of-claude-code-project.md"
  - "summaries/2026-05-06_claude-code-docs_how-claude-code-works.md"
  - "summaries/2026-05-06_claude-code-docs_memory.md"
  - "summaries/2026-05-06_claude-code-docs_features-overview.md"
  - "summaries/2026-05-06_claude-code-docs_context-window.md"
  - "summaries/2026-05-06_claude-code-docs_best-practices.md"
  - "summaries/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md"
  - "summaries/2026-05-20_claude_stop-babysitting-your-agents.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md"
timestamp: "2026-08-05"
---

# Claude Code

Anthropic's CLI-based AI coding agent. Not just a terminal chat — a full operating environment for agentic engineering spanning mobile, web, desktop, and terminal.

## Harness, Not Model — Anthropic's Own Framing

Anthropic's "How Claude Code works" doc states it directly: Claude Code is a **harness around Claude models**. The model reasons; the harness provides tools, manages context, and handles execution. Everything Claude can do comes from tools — without them it can only output text. The five tool categories that power all agentic behavior: **file operations, search, execution, web, code intelligence**. When something fails, the failure is usually in the harness layer (which context was provided, which tools were allowed) — not the model. See [Harness Engineering](../concepts/harness-engineering.md).

The agentic loop is **gather context → take action → verify results**, repeated as needed. **Verify-first prompting** dramatically improves results — providing test cases, screenshots, or runnable checks gives Claude a feedback loop. "Fix the bug" is weak; "fix the bug and verify tests pass" is strong. Add "verify by running X" to every task prompt.

## Sessions and Persistence

Sessions are independent by default — each new session starts fresh. Persistence comes from two complementary mechanisms:

| Mechanism | Who writes | What it carries |
|-----------|-----------|-----------------|
| **CLAUDE.md files** | You | Rules, conventions, "always do X" instructions |
| **Auto memory** (`~/.claude/projects/<project>/memory/`) | Claude | Learnings, build commands, debugging patterns Claude discovered |

Don't conflate them: **CLAUDE.md is instructions, auto memory is learnings.** Curate CLAUDE.md deliberately; let auto memory grow organically. Run `/memory` to audit auto memory; run `/init` to generate a starter CLAUDE.md.

The reported Claude 5-generation shift is from *manual* memory (users prompted to write to CLAUDE.md via the `#` hotkey) to *automatic* memory (Claude saves what it judges relevant to the work and to you). The caveat is the practical one: automatic memory optimises for what the **model** judges salient, which is not necessarily what **you** judge salient. The `#` hotkey remains the cheapest way to force a specific fact in, and closing a substantive session with an explicit "remember X" is worth the one line. *(Source: Jay E / RoboNuggets, 2026-08-03)* See [Agent Memory Systems § Automatic Capture and the Salience Gap](../concepts/agent-memory-systems.md#automatic-capture-and-the-salience-gap).

### CLAUDE.md Scoping (Four Levels)

Loaded in order, more specific overrides:
1. **Managed policy** (org-wide, MDM-deployed)
2. **User** (`~/.claude/CLAUDE.md`)
3. **Project** (`./CLAUDE.md`) — commit to git
4. **Local** (`./CLAUDE.local.md`) — gitignored

All are concatenated and loaded every session. Hard rule: **under 200 lines per file** — adherence degrades with length. Use `@AGENTS.md` syntax inside CLAUDE.md to import another file.

### Path-Scoped Rules

Rules in `.claude/rules/` with `paths:` frontmatter only load when Claude reads a matching file — not every session. Saves context budget. Language-specific conventions (`paths: ["src/api/**/*.ts"]`) belong here, not in CLAUDE.md.

**Compaction caveat:** path-scoped rules and nested CLAUDE.md files are lost after `/compact` — they live in message history, not outside it. Project-root CLAUDE.md re-injects automatically; nested files don't until Claude reads a matching file again. Rules that must survive compaction belong in project-root CLAUDE.md.

### Auto Memory's 200-Line / 25KB Limit

The MEMORY.md index loads every session and is capped at **200 lines / 25KB**. Detailed topic files (`debugging.md`, `api-conventions.md`) load on demand. This limit does **not** apply to CLAUDE.md files — those load in full.

## Checkpoints and Permission Modes

| Control | What it does |
|---------|-------------|
| `Esc` (single) | Stop mid-action with context preserved |
| `Esc Esc` / `/rewind` | Restore previous conversation + code state (snapshot per file edit) |
| `Shift+Tab` | Cycle permission modes (default → auto-accept → plan) |

Checkpoints enable safe experimentation — every file edit is snapshotted before execution. Work boldly; the safety net means you can undo anything Claude does.

## Context Window Token Budget

Anthropic's "Explore the context window" doc gives token-level numbers for what Claude Code loads into context — the key revelation is that **~7,850 tokens are consumed before you type a single character**.

| Component | Approx. tokens |
|-----------|----------------|
| System prompt | ~4,200 |
| Project CLAUDE.md (well-tuned) | ~1,800 |
| `~/.claude/CLAUDE.md` | ~320 |
| Auto memory (MEMORY.md index) | ~680 |
| Environment info | ~280 |
| Skill descriptions | ~450 |
| MCP tool names | ~120 |
| **Baseline total** | **~7,850** |
| Each file read | ~1,000–3,000 |
| Each hook `additionalContext` | ~100–120 |
| Subagent summary back to main | ~420 (vs 6,100+ for its file reads) |

**File reads dominate context mid-session** — and they're hidden (you see only "Read auth.ts" notices). Three files + path-scoped rules + grep results easily add 6,000 tokens. **Subagents are the primary context-protection mechanism** — a subagent's reads stay entirely in its context; only the summary returns to your main window.

### What Survives `/compact`

| Lives where | Re-injected after compact? |
|-------------|---------------------------|
| Project-root CLAUDE.md | ✓ automatically |
| Auto memory | ✓ automatically |
| Path-scoped rules | ✗ (until matching file read again) |
| Nested CLAUDE.md | ✗ (until matching file read again) |
| Skill descriptions | ✗ (only invoked skill bodies survive — capped 5K tokens/skill, 25K total, newest first) |

Important skill instructions go **near the top of SKILL.md** (truncation keeps the start). Skills with `disable-model-invocation: true` cost **zero context** until invoked — use for any side-effect skill (commit, deploy, send messages).

### Inspection Commands

```
/context    # Live breakdown of context usage by category with optimization suggestions
/memory     # See which CLAUDE.md and auto memory files loaded at startup
/compact    # Summarize conversation to free context space (supports /compact "<focus>")
/doctor     # Health check of the install + accumulated config (see below)
```

### `/doctor` — Setup Health Check

Ships with recent Claude Code. Five things it checks:

1. **Install health** — broken or duplicate installs, file-path problems, version lag.
2. **Dead weight in skills and MCP servers** — superseded skills to archive, servers to disable, leftover demo plugins.
3. **CLAUDE.md thinning** — proposes trims.
4. **Slow hooks** — flags hooks that add per-turn latency.
5. **Reports before applying** — asks for confirmation rather than fixing silently.

Worth a recurring cadence (monthly is a reasonable default) on any setup that accumulates skills and MCP servers. Note this is a *config-hygiene* instrument and not a substitute for [ablation](../concepts/harness-engineering.md#ablation-the-named-procedure-cherny-july-2026): `/doctor` finds what is broken, duplicated, or obviously unused; ablation finds what is *intact and used and still not earning its tokens*. Cherny's six-month delete-everything ritual answers a question `/doctor` cannot ask. *(Source: Jay E / RoboNuggets, 2026-08-03)*

## Extension Decision Map (Anthropic Official)

The features-overview doc gives Anthropic's canonical "which extension when" map. Each extension plugs into a different part of the agentic loop and carries different context costs.

| Friction signal | Extension to add |
|-----------------|------------------|
| Convention wrong twice | CLAUDE.md entry |
| Same prompt every time | Skill |
| Side task floods context | Subagent |
| Subagents need to share findings | Agent team |
| Missing external data | MCP server |
| Must-happen automatically | Hook |
| Second repo needs same setup | Plugin |

**Build the extension layer incrementally — don't design it upfront.** Let friction accumulate and respond to each trigger.

Five context-vs-determinism tradeoffs to internalize:

1. **CLAUDE.md vs Skills.** CLAUDE.md is paid every turn; skill bodies load only when invoked. Anything that's only sometimes needed belongs in a skill or path-scoped rule.
2. **Skills vs Subagents.** Skills add content to your main window; subagents run their own context and only return a summary. 5+ file reads → subagent.
3. **CLAUDE.md vs Hooks.** CLAUDE.md is **advisory**; hooks are **deterministic**. Critical rules ("don't modify .env", "always format before commit") are hooks, not instructions.
4. **MCP vs Skills.** MCP gives Claude the *capability* to interact with external systems; skills give *knowledge of how to use them*. Pair them.
5. **Subagents vs Agent Teams.** Subagents = hub-and-spoke (children → main only). Agent teams = peer-to-peer (teammates can message each other). See [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md).

Plugins bundle extensions for reuse: skills + agents + hooks + MCP — managed > user > project name overrides for skills/subagents; hooks always merge.

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

**The long-horizon version (July 2026).** Cherny later sharpened this from "highest-impact practice" to *the* skill: over multi-day runs the binding constraint stops being capability and becomes drift — *"this is about hallucination"* [22:26-22:29]. A model with a way to check its own work *"doesn't get stuck, and it will just go."* His flagship artifact is the Electron→Swift rewrite, still running at 14+ days, whose entire prompt is a verification loop with an exit condition:

```
Rewrite the Electron app in Swift.
Run the Electron app in the Mac virtual machine, screenshot it,
and then look pixel by pixel, compare it to the Swift version.
Don't stop until you're done.
```

The work went into the substrate, not the wording — a macOS GitHub Actions runner for the VM and an empty target repo, provisioned *before* prompting. **Before writing the prompt, answer: what artifact can the model inspect to know it's wrong?** Test suite, screenshot diff, type check, fuzzer. If there isn't one, build it first. *(Source: Boris Cherny, Y Combinator 2026-07-27)*

### System-Prompt Ablation Switches

Two undocumented-to-lightly-documented levers for auditing what the prompt is actually buying you:

```bash
claude --system-prompt "<your minimal prompt>"   # override the system prompt entirely
CLAUDE_CODE_SIMPLE=1 claude                      # strip ALL system prompts, including tool prompts
```

`CLAUDE_CODE_SIMPLE=1` is the internal ablation instrument behind the **80% system-prompt cut** Claude Code shipped with Opus 5. The finding worth knowing before you reach for it: *"the model is actually a little bit more intelligent without these prompts"* — but the shipped product keeps some anyway, because they encode *product behavior* rather than model capability. Run either against a task you know well, and keep a short A/B list of what actually regressed. See [Harness Engineering § Ablation](../concepts/harness-engineering.md#ablation-the-named-procedure-cherny-july-2026). *(Source: Boris Cherny, Y Combinator 2026-07-27)*

### Dynamic Workflows

Say **"use a workflow"** — no syntax. Claude starts a VM inside a Bun sandbox and orchestrates agents in a fan-out → verify/summarize → fan-out shape, at thousands-of-agents scale. Distinct from `/loop` and Routines: a workflow is *one task chunked with shared context*; loops and routines are *one repetitive task with no shared context*. See [Dynamic Workflows](../concepts/dynamic-workflows.md).

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

The full configuration surface — `description` as routing key, 4-level model resolution, persistent `memory` field, scoped `mcpServers`, `PreToolUse` validation hooks, fork vs named subagent, the no-nested-subagents rule — is documented separately. See [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md). *(Source: Claude Code Docs — Create custom subagents)*

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

The binding constraint is **attention, not compute**: you can *open* many sessions, but a single person can only *actively steer* about 4-5 before quality drops — the surplus run as parked/background streams you check in on. The two figures are the same picture from different angles (5-10 open, ~4-5 actively attended), which is exactly why attention-triage surfaces exist (Claude Agents sorted by attention needed, Remote Control). *(Source: Stop babysitting your agents, Claude, 2026-05-20)*

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

### Audit Default Automemory Against Storage/Injection/Recall

Simon Scrapes' three-question framework (**storage / injection / recall** — see [Agent Memory Systems](../concepts/agent-memory-systems.md)) is the diagnostic to apply to Claude Code's defaults. The honest verdict: automemory writes silently to per-project MD files, injects `claude.md` + a pre-tool-use hook lookup, and has effectively **no recall mechanism** beyond trawling past sessions or `--resume` with a known session ID. **Recall is the weak link.** For multi-client / multi-project work, audit `~/.claude/memory/` to see how little is actually captured, then layer open-source memory plug-ins on top — memarch's `Stop` hook for complete turn-by-turn capture into a local vector DB, plus Hermes-style curated `memory.md` / `user.md` injected as a ~1,300-token frozen snapshot at session start. *(Source: Simon Scrapes)*

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

## Prompting for Claude 4.6 and 4.7

Claude 4.6 models are significantly more proactive than predecessors. Key adjustments from Anthropic's official guidance:

- **Dial back aggressive prompting.** "CRITICAL: You MUST use this tool" → "Use this tool when...". Anti-laziness prompts that were needed for older models now cause overtriggering.
- **Adaptive thinking replaces budget_tokens.** Use `thinking: {type: "adaptive"}` with `effort` parameter instead of manual `budget_tokens`.
- **Subagent overuse is the risk on 4.6.** Claude 4.6 spawns subagents proactively. Add guardrails for when direct work is faster.
- **Prefills are deprecated.** Use structured outputs or explicit instructions instead of prefilled assistant turns.

### Opus 4.7 adjustments (April 2026)

Opus 4.7 runs well on existing 4.6 prompts but inverts several defaults. Re-audit any prompt that was tuned for 4.6.

- **New effort levels `xhigh` and `max`.** `xhigh` is the recommended default for coding and agentic use cases; `high` is the minimum for intelligence-sensitive work. `max` can win on the hardest tasks but is prone to overthinking. Set `max_tokens: 64000` at `xhigh`/`max` so the model has room to reason across subagents and tool calls.
- **Effort is respected strictly.** Unlike 4.6, Opus 4.7 at `low`/`medium` scopes work narrowly. If you see shallow reasoning, raise effort — don't prompt around it.
- **More literal instruction following.** Opus 4.7 does not silently generalize. State scope explicitly ("apply this to *every* section").
- **Fewer subagents by default** (reverse of 4.6). Steer the other direction: *"Spawn multiple subagents when fanning out across items or reading multiple files."*
- **Uses tools less, reasons more.** Raise effort or describe *why and when* a tool should fire to lift tool usage.
- **Better user-facing updates by default.** Remove any "after every N tool calls, summarize" scaffolding.
- **Tone is more direct, fewer emoji, less validation-forward.** Re-prompt for warmth if the product wants it.
- **Interactive coding uses more tokens than autonomous runs.** Specify the task fully upfront in the first turn, use `xhigh`/`high`, and add auto-mode-style features to minimize required user interactions. See [Claude Code Auto Mode](../how-tos/claude-code-auto-mode.md).
- **Code review: split coverage from filtering.** "Be conservative" prompts on 4.7 silently drop real bugs. Tell the finding stage its job is coverage + confidence + severity tags; filter in a separate stage. See [Reviewer Agents](../concepts/reviewer-agents.md).
- **Computer use** now supports up to 2576px / 3.75MP; 1080p is the recommended cost/performance balance.
- **Frontend defaults are opinionated and persistent** (cream/serif/terracotta). See [Claude Design](claude-design.md) and the [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md) page for override techniques — specify a concrete palette or ask for 4 proposed directions before building.

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

**The router framing (2026).** Reported Anthropic guidance for the Claude 5 generation goes further than "prune": CLAUDE.md "becomes more powerful if you make it function as a router to your tree of files" rather than a central repository of every practice. Split by *when* content is needed, not by topic — everything needed on every turn stays, everything else moves to a domain file with one routing line pointing at it. See [Context Engineering § CLAUDE.md as Router, Not Repository](../concepts/context-engineering.md#claudemd-as-router-not-repository) for the sub-router pattern and the per-session token-cost argument. *(Source: Tariq via Jay E / RoboNuggets — secondhand)*

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

### Skills in Claude Code: Invocation Control, Forking, Live Data

Beyond `name`/`description`, Claude Code skills support several frontmatter levers:

- `disable-model-invocation: true` — only the user can invoke. Skill is removed from Claude's context entirely. Use for side-effect actions (`/deploy`, `/commit`, `/send-slack-message`) you never want Claude to fire spontaneously.
- `user-invocable: false` — only Claude can invoke. Hidden from the `/` menu. Use for background-knowledge skills (context-loaders, glossaries).
- `allowed-tools: Bash(git *) Bash(gh *)` — pre-approve tools for the skill's session, so a commit/PR-summary skill runs without per-call permission prompts.
- `context: fork` + `agent: Explore|Plan|general-purpose|<custom>` — run the skill body as the task prompt of an isolated subagent that has no access to conversation history. Useful for heavy reads or untrusted code.
- `` !`command` `` inside the skill body runs a shell command **before Claude sees anything**; output replaces the placeholder. Lets skills ship live data (PR diff, branch info, log tail) without spending a tool turn.
- `Skill` / `Skill(name)` / `Skill(name *)` rules in `/permissions` allow- or deny-list skill invocation across the project.

Lifecycle inside a session: once invoked, `SKILL.md` content stays in context for the rest of the session. After compaction, the most recently invoked skills are re-attached (first 5,000 tokens each, 25,000-token total budget, newest first). Editing a skill file mid-session affects the **next** invocation, not the already-loaded copy.

Keep `SKILL.md` under ~500 lines — split detailed reference into sibling files and reference them from `SKILL.md` (Level 3 progressive disclosure).

See [Claude Code Skills](../how-tos/claude-code-skills.md) for the how-to and [Agent Skills](../concepts/agent-skills.md) for the concept. *(Source: Anthropic Engineering, Claude Code Docs)*

## Plugins: Packaging Layer

Plugins are the distribution channel for everything below the project: skills, agents, hooks, MCP servers, LSP definitions, and a new **monitors** primitive (background shell commands whose stdout streams to Claude as notifications).

| | Standalone (`.claude/`) | Plugin (`.claude-plugin/plugin.json`) |
|--|------------------------|----------------------------------------|
| Slash names | `/deploy` | `/my-plugin:deploy` (namespaced) |
| Sharing | Commit to project repo | Versioned, installable via marketplace |
| Conversion | — | `cp -r .claude/skills my-plugin/` + add `plugin.json` |

**Default to standalone, migrate when you share.** The conversion is mechanical and takes minutes. The most common plugin authoring mistake is putting functional directories inside `.claude-plugin/` — only `plugin.json` lives there; `skills/`, `agents/`, `hooks/`, `monitors/`, `.mcp.json` all sit at the **plugin root**.

**Local dev loop:** `claude --plugin-dir ./my-plugin` loads a plugin without installing. Local copies override marketplace plugins of the same name. `/reload-plugins` picks up edits without restarting.

**Plugin-only powers:**
- **`monitors/monitors.json`** — passive background awareness (e.g., `tail -F ./logs/error.log`); Claude Code auto-starts these when the plugin is active.
- **`settings.json` `agent` field** — replace Claude Code's *default* main-thread agent (e.g., a `security-review` plugin that forces every session into review mode). Standalone agents can be invoked but cannot replace the default; only plugins can.
- **Portable hooks** — `hooks/hooks.json` mirrors the `settings.json` hooks object but ships with the plugin.

**Versioning:** explicit `version` (semver) for stable installs; omit `version` and every git commit is a new version (rolling updates).

See [Claude Code Plugins](../how-tos/claude-code-plugins.md) for the full how-to. *(Source: Claude Code Docs — Create plugins)*

## Parallel Claudes: Lock-File Agent Teams

Nicholas Carlini's C compiler project ran **16 parallel Claude Code agents** in a shared Docker + Git repo, coordinated only by lock files on work items. No human in the loop, no lead agent. ~2,000 sessions over two weeks produced a 100k-line Rust C compiler that compiles Linux 6.9 across x86/ARM/RISC-V with a **99% test pass rate**.

Load-bearing insight: **"The task verifier must be nearly perfect."** Autonomous agents will solve whatever has clear feedback — weak tests cause drift. Most engineering effort goes into test infrastructure, not orchestration.

Contrast with the hierarchical **orchestrator-worker** pattern of the multi-agent research system (lead Opus + parallel Sonnet workers, +90.2% over single-agent Opus, at **15× token cost**). See [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) for both.

## Related Pages

- [Claude Code Permissions](../how-tos/claude-code-permissions.md)
- [Claude Code Auto Mode](../how-tos/claude-code-auto-mode.md)
- [Claude Code Sandboxing](../how-tos/claude-code-sandboxing.md)
- [Agent Skills](../concepts/agent-skills.md)
- [Claude Code Skills](../how-tos/claude-code-skills.md) — authoring how-to
- [Claude Code Plugins](../how-tos/claude-code-plugins.md) — packaging skills + agents + hooks + monitors for distribution
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — full subagent configuration reference
- [Claude Code Agent Teams](../how-tos/claude-code-agent-teams.md) — peer-to-peer multi-session coordination (experimental)
- [Claude Agent SDK](claude-agent-sdk.md) — programmatic library version of the same harness
- [Code Review (Claude Code)](../how-tos/claude-code-review.md) — managed PR-review service
- [Ultrareview](../how-tos/claude-code-ultrareview.md) — multi-agent verified bug-finding
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
- [Agent Memory Systems](../concepts/agent-memory-systems.md) — storage/injection/recall framework + memarch/Hermes hybrid blueprint
- [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md)
- [Auto Research](../concepts/auto-research.md)
- [Agent Platform Tiers](../concepts/agent-platform-tiers.md) — where Claude Code sits (off-spectrum: an agent product, not a platform)
- [Managed Agent Platforms](../comparisons/managed-agent-platforms.md) — Claude Managed Agents vs Deep Agents Deploy vs OpenAI Agents SDK
- [Harness Engineering](../concepts/harness-engineering.md) — the discipline the Meta Harness work sits inside
- [Meta Harness](../concepts/meta-harness.md) — the research loop that uses Claude Code as its proposer
- [Boris Cherny](../people/boris-cherny.md) — creator; verification-first, ablation, product overhang
- [Dynamic Workflows](../concepts/dynamic-workflows.md) — the "use a workflow" orchestration primitive
- [Product Overhang and Hobbling](../concepts/product-overhang.md) — Claude Code as an un-hobbling of Sonnet 3.5
