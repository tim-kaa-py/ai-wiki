# My Agentic Coding Playbook

> A living document. Auto-updated when new relevant sources are ingested.
> Last updated: 2026-04-13

## Core Principles

1. **The Agentic Trap: Simplicity wins.** Beginners use simple prompts. Intermediates over-engineer (8 agents, orchestration pipelines, 18 slash commands). Experts return to short, direct prompts. The sophistication lives in your understanding, not your tooling. *(Source: Steinberger)*

2. **Empathize with the agent.** The agent starts every session from zero. Ask yourself: "If I were dropped into this codebase cold, what would I need to know?" Then tell the agent exactly that — point it to files, modules, constraints. *(Source: Steinberger)*

3. **Build your codebase for the agent.** Don't fight the names the agent picks — they're the most obvious names in the weights. Keep file structure clean and discoverable. Write CLAUDE.md and agent files that orient quickly. *(Source: Steinberger)*

4. **Never revert — always move forward.** Rolling back and redoing takes longer than pushing forward. Commit when you like the outcome. If something breaks, make it your next prompt: "This broke X — fix it while keeping Y." *(Source: Steinberger)*

5. **Treat it like managing an engineering team.** Your team won't write code exactly like you would. Let go of perfection. Accept working solutions. Judge output by "does this work and move the project forward?" not "is this how I'd write it?" *(Source: Steinberger)*

6. **It's a skill — practice compounds.** Agentic engineering is like playing an instrument. You need to play with the tools, build things, develop a feel. Each step compounds. Dedicate time to experimenting. *(Source: Steinberger)*

7. **Approach it like a conversation.** Guide with intent first, implementation second. If the agent is spinning, interrupt and reframe. Long execution time is feedback — maybe you didn't give enough context. *(Source: Steinberger)*

8. **Spec quality is the new bottleneck.** When AI builds what you describe, ambiguity produces software that fills gaps with machine guesses, not customer-centric guesses. Write specs detailed enough for an agent to implement without human intervention — the spec must anticipate the questions the agent doesn't know to ask. *(Source: Nate B Jones / Dan Shapiro)*

9. **Audit your workflow for human-implementation assumptions.** Standups, sprint planning, manual code review, and QA all exist because humans write code. When agents handle implementation, these become friction. Ask which coordination structures still serve their purpose and which need redesign. *(Source: Nate B Jones / Dan Shapiro)*

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

### Memory & Knowledge Capture
- **Set up Claude Code hooks for automatic session memory.** Three hooks cover the lifecycle: session start (load agents.md + index.md), pre-compact (capture before compaction), session end (capture final summary). Zero maintenance — hooks fire automatically. *(Source: Cole Medin)*
- **Use an agents.md as a meta-reasoning layer.** A global rules file that tells the agent how the knowledge base works — not just what's in it, but how to search it, what to update, and how pieces connect. Gives the agent a self-model. *(Source: Cole Medin)*
- **Spawn Claude Agent SDK as a background processor in hooks.** Heavy processing (summarization) runs as a separate Claude process so the main session stays responsive. Uses existing Anthropic subscription, no API key setup. *(Source: Cole Medin)*
- **Index files can replace RAG at personal scale.** An LLM-maintained index.md + markdown backlinks give agents enough navigational structure to search effectively without vector databases. Works for ~100s of files. *(Source: Karpathy via Cole Medin)*
- **Run a periodic flush to promote logs into wiki.** Daily logs accumulate automatically, but they only compound when a flush process extracts concepts and connections into structured wiki pages. Run daily or on-demand. *(Source: Cole Medin)*

### Bootstrap & Architecture
- **Use the PRD-as-prompt pattern for reusable system setup.** Encode your full architecture (folder structure, file schemas, agent rules, processing pipeline) as a single PRD-style document. Test that a coding agent can one-shot the system from a blank slate. *(Source: Karpathy via Cole Medin)*

## Prompting Patterns (Anthropic Official)

These come directly from Anthropic's canonical prompting best practices for Claude 4.6 models.

### Explain the Why
Always provide motivation behind constraints. "Never use ellipses because the TTS engine can't pronounce them" beats "never use ellipses." Claude generalizes from explanations. Apply this in CLAUDE.md and system prompts — every rule should have one sentence of motivation. *(Source: Anthropic)*

### Positive Framing Over Negative
"Write flowing prose paragraphs" works better than "Don't use markdown." Tell Claude what to do, not what to avoid. Audit system prompts for negative instructions and rewrite as positive directives. *(Source: Anthropic)*

### 3-5 Examples in XML Tags
Few-shot examples are the most reliable steering mechanism for format, tone, and structure. Wrap in `<example>` / `<examples>` tags. For any non-trivial output format, include diverse examples rather than relying on description alone. *(Source: Anthropic)*

### Documents at Top, Query at Bottom
For long context (20k+ tokens), placing queries after reference material improves response quality by up to 30%. Apply in CLAUDE.md and agentic prompts. *(Source: Anthropic)*

### Dial Back Anti-Laziness Prompting for 4.6
Claude 4.6 is significantly more proactive than predecessors. "CRITICAL: You MUST use this tool" → "Use this tool when it would enhance understanding." Remove "if in doubt, use [tool]" patterns — they cause overtriggering in 4.6. *(Source: Anthropic)*

### Anti-Overengineering Prompt
Claude 4.5/4.6 tend to overengineer. Include in agentic system prompts:
- Don't add features beyond what was asked
- Don't add docstrings/comments to untouched code
- Don't add error handling for impossible scenarios
- Don't create abstractions for one-time operations
*(Source: Anthropic)*

### Investigate Before Answering
Use `<investigate_before_answering>` in coding system prompts to prevent hallucination. Claude should read files before making claims about code. *(Source: Anthropic)*

### Adaptive Thinking Configuration
Use `thinking: {type: "adaptive"}` with `effort` parameter instead of `budget_tokens`. Effort levels: `high` for agentic/coding, `medium` for general, `low` for latency-sensitive. Set `max_tokens` to 64k at high effort. *(Source: Anthropic)*

## Testing AI-Authored Code

### Scenarios as Holdout Sets
When AI writes your code, traditional tests inside the codebase create an incentive for the agent to optimize for test passage rather than correct software ("teaching to the test"). The fix: store behavioral specifications (scenarios) externally, invisible to the agent during development, functioning as a holdout set.

- Separate behavioral test specs from the codebase the agent can access
- The agent should never see the evaluation criteria during development
- Think of it as applying the ML train/test split to software development

*(Source: Nate B Jones / Dan Shapiro — StrongDM's dark factory pattern)*

### Measure, Don't Trust Feelings
The METR study showed developers are 19% slower with AI but believe they are 24% faster — wrong about both direction and magnitude. Self-assessment of AI productivity is unreliable.

- Measure actual task completion time with and without AI tools
- Use controlled comparisons, not subjective surveys
- The J-curve of adoption means initial slowdowns are expected — but only if you then redesign the workflow

*(Source: Nate B Jones / Dan Shapiro)*

## Anti-Patterns

- **Over-engineering prompt pipelines** — elaborate orchestration when a simple prompt would do
- **Micromanaging agent output** — forcing your exact style instead of accepting working solutions
- **Reverting instead of fixing forward** — rolling back wastes the agent's work and your time
- **Not giving enough context** — the agent starts from zero every session; don't assume it knows
- **Ignoring execution time as feedback** — if the agent is spinning, the problem is your prompt or the architecture, not the agent
- **Mixing unrelated concerns in one session** — keep sessions focused on one task
- **Aggressive anti-laziness prompting on 4.6** — instructions like "CRITICAL: always use this tool" cause overtriggering on Claude 4.6; use calm directives instead *(Source: Anthropic)*
- **Spawning subagents for simple tasks** — Claude 4.6 is predisposed to spawn subagents; add guardrails for when direct work is faster *(Source: Anthropic)*
- **Bolting AI onto existing workflows without redesign** — produces the J-curve productivity dip; the tool changes the workflow but the workflow hasn't been redesigned around the tool *(Source: Nate B Jones / Dan Shapiro)*
- **Trusting AI productivity self-assessment** — developers are confidently wrong about AI's impact on their speed; measure with controlled comparisons *(Source: Nate B Jones / Dan Shapiro)*
