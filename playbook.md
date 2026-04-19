# My Agentic Coding Playbook

> A living document. Auto-updated when new relevant sources are ingested.
> Last updated: 2026-04-19 (harness engineering principles added)

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

10. **Give Claude a verification feedback loop — the single highest-leverage practice.** If Claude can check its own work (run tests, typecheck, lint), quality is 2-3x higher. Include a "before committing" checklist in CLAUDE.md with typecheck + tests + lint, and instruct Claude to run them on every change. *(Source: Boris Cherny, Creator of Claude Code)*

11. **Start every session in Plan mode.** Press Shift+Tab twice. Write a full blueprint before execution. A good plan dramatically increases first-shot success rate. *(Source: Boris Cherny, Creator of Claude Code)*

12. **Use `/permissions`, never `--dangerously-skip-permissions`.** Pre-allow safe bash commands by pattern via `/permissions`. Check `.claude/settings.json` into the team repo so everyone shares the same allowlist. The blanket bypass removes all safety with no granularity. *(Source: Boris Cherny, Creator of Claude Code)*

13. **Use the best/biggest model.** Opus is bigger and slower per call, but it handles tasks better and you write less code — net result is faster overall. Default to Opus unless cost is a hard constraint. *(Source: Boris Cherny, Creator of Claude Code)*

14. **Auto-format with a PostToolUse hook.** Run your formatter after every Write/Edit tool call to handle the last 10% of formatting issues silently and prevent CI failures. Add to `.claude/settings.json`: `"PostToolUse": [{"matcher": "Write|Edit", "hooks": [{"type": "command", "command": "<formatter> || true"}]}]` *(Source: Boris Cherny, Creator of Claude Code)*

15. **Give Claude real tools via MCP.** Connect Slack, BigQuery, Sentry (or your equivalents) via `.mcp.json`. Check `.mcp.json` into the team repo so all team members get the same tool access. *(Source: Boris Cherny, Creator of Claude Code)*

## Harness Engineering

Principles from the 2026 harness-engineering research (PY, NLH paper, Meta Harness paper). See [Harness Engineering](wiki/concepts/harness-engineering.md).

27. **Harness > model choice when performance is off.** Stanford and LangChain documented a 6x performance variation attributable to the harness alone (patterns, prompts, verification, memory). Before paying for a bigger model, audit and optimize the orchestration code wrapping the model. Haiku + optimized harness beat Opus + the same harness. *(Source: PY — Rise of Harness Engineering)*

28. **Pruning is maturity — re-audit on every model upgrade.** Every harness component encodes an assumption about what the model can't do, and those assumptions expire. Anthropic dropped context resets once Opus 4.6 no longer needed them; Vercel removed 80% of an agent's tools and got better results; Manus rewrote their harness 5x in 6 months. When a new model ships, actively delete scaffolding that no longer earns its keep. *(Source: PY — Rise of Harness Engineering)*

29. **Prefer a narrow acceptance-gated attempt loop over broad search.** In the NLH ablation, self-evolution was the only consistently helpful module (+4.8 SWE, +2.7 OS World) while verifiers and multi-candidate search *actively hurt* (–0.8/–8.4 and –2.4/–5.6). Default to a disciplined single-path-with-retry loop; only widen to multi-candidate search when the narrow path clearly fails. *(Source: PY — Rise of Harness Engineering)*

30. **Persist raw execution traces — summaries are not a substitute.** Meta Harness accuracy drops from 50% → 34.6% when traces are removed, and 50% → 34.9% when replaced with summaries. If you intend to iterate on an agent (manually or with an optimizer like Meta Harness or Auto Research), keep the full traces. *(Source: PY — Rise of Harness Engineering)*

31. **Treat the harness as long-lived IP, not a script you rewrite each quarter.** A harness optimized on one model transfers to five others and improves all of them. Invest in structure, contracts, and state conventions you expect to re-run against the next five model releases. *(Source: PY — Rise of Harness Engineering)*

32. **Before adding another module, rewrite what you have with explicit contracts and file-backed state.** OS Symphony's NLH rewrite jumped 30.4% → 47.2%, cut runtime 60%, and used 35x fewer LLM calls — same strategy, same model, only the representation changed. Execution contracts ("function signatures for agents") and path-addressable state files survive truncation, restarts, and delegation. *(Source: PY — Rise of Harness Engineering — NLH / Tingua)*

33. **Design parent agents as thin dispatchers; put reasoning budget into the children.** ~90% of compute in orchestrator-worker setups flows through delegated child agents, not the parent. The harness is an orchestration pattern, not a reasoning pattern — decompose, delegate, and bind children with contracts rather than loading the parent up. *(Source: PY — Rise of Harness Engineering)*

34. **Treat community agent skills / AGENTS.md / shared tools like third-party dependencies.** 1-in-4 community-contributed agent skills contains a vulnerability; prompt injection can live in harness text. Review, pin, and isolate blast radius before you graft a shared skill into your system prompt or tool set. *(Source: PY — Rise of Harness Engineering)*

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
| **Routines** | Scheduled/triggered autonomous sessions in cloud containers (`claude.ai/code/routines`) |

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
- Boris Cherny's agent set: `build-validator.md`, `code-architect.md`, `code-simplifier.md`, `oncall-guide.md`, `verify-app.md` — each fires at a consistent point in the workflow *(Source: Boris Cherny, Creator of Claude Code)*
- Identify your 3-5 most common post-coding tasks and write an agent file for each

### Voice
- `/voice` or `export CLAUDE_CODE_VOICE_DICTATION=true`
- Hold Space to record, release to transcribe
- Encourages conversational, natural prompting

### Status Line & Situational Awareness
- **Set up a status line dashboard for live session metrics.** Configure `settings.json` with a custom status line command (`"statusLine": {"type": "command", "command": "bash ~/.claude/statusline-command.sh"}`). Shows context window usage, rate limit burn rate, session cost, API wait %, and code velocity — all without leaving the terminal. *(Source: self — status line setup)*
- **Watch the context window color: yellow means wrap up soon.** Green (0-19%) = plenty of headroom. Yellow (20-69%) = extended context or compaction territory — start planning to finish the current task. Red (70%+) = start a new session. Thresholds tuned for Opus's 1M context. *(Source: self — status line setup)*
- **Monitor rate limit sustainability, not just current percentage.** The burn rate (usage%/elapsed hours) matters more than raw percentage. If the rate limit timer turns red (>= 20%/h), slow down or switch tasks. The `(Xh left)` estimate prevents surprise rate limit walls. *(Source: self — status line setup)*
- **Treat the lightning bolt (burn indicator) as a signal to decompose.** When a single interaction consumes >5% of the 5-hour rate limit window, the bolt appears. Break large tasks into smaller steps to avoid burning through the limit in a few heavy prompts. *(Source: self — status line setup)*
- **Use API wait % to diagnose your own bottleneck.** High API% (>70%) means you're efficiently keeping the model busy. Low API% means you're the bottleneck — prepare and batch your prompts. *(Source: self — status line setup)*

### Memory & Knowledge Capture
- **Set up Claude Code hooks for automatic session memory.** Three hooks cover the lifecycle: session start (load agents.md + index.md), pre-compact (capture before compaction), session end (capture final summary). Zero maintenance — hooks fire automatically. *(Source: Cole Medin)*
- **Use an agents.md as a meta-reasoning layer.** A global rules file that tells the agent how the knowledge base works — not just what's in it, but how to search it, what to update, and how pieces connect. Gives the agent a self-model. *(Source: Cole Medin)*
- **Spawn Claude Agent SDK as a background processor in hooks.** Heavy processing (summarization) runs as a separate Claude process so the main session stays responsive. Uses existing Anthropic subscription, no API key setup. *(Source: Cole Medin)*
- **Index files can replace RAG at personal scale.** An LLM-maintained index.md + markdown backlinks give agents enough navigational structure to search effectively without vector databases. Works for ~100s of files. *(Source: Karpathy via Cole Medin)*
- **Run a periodic flush to promote logs into wiki.** Daily logs accumulate automatically, but they only compound when a flush process extracts concepts and connections into structured wiki pages. Run daily or on-demand. *(Source: Cole Medin)*

### Routines & Autonomous Agents
- **Default to routines for new automation instead of n8n/Make.com.** Writing a natural-language SOP as a routine prompt is faster than wiring drag-and-drop nodes. Reserve node-based tools for high-volume, stable workflows where token cost matters. *(Source: Nick Saraev)*
- **Routine prompts must be self-contained SOPs.** Unlike interactive skills where humans can course-correct, routines run fully hands-off. Structure as step-by-step instructions. Define "done" explicitly. Include edge cases and fallback behaviors. Don't economize on length — more context reduces misinterpretation. *(Source: Nick Saraev)*
- **Chain routines via webhooks for multi-step pipelines.** Design pipelines where each routine handles one stage and fires the next — e.g., transcript arrives via webhook, routine generates proposal, signature event triggers onboarding. This is the microservices pattern applied to AI agents. *(Source: Nick Saraev)*
- **Use managed sessions for multi-agent orchestration.** Break complex workflows into specialized agents (parser, writer, drafter) running in isolated containers, coordinated through API calls to managed sessions. *(Source: Nick Saraev)*
- **Test routines with "Run Now" before scheduling.** Validate behavior interactively before committing to autonomous execution. *(Source: Nick Saraev)*

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

## Tool Selection: Orchestration Layers

10. **Default to vanilla Claude Code — orchestration layers are almost never worth it.** Chase AI benchmarked GSD, Superpowers, and vanilla Claude Code on the same task. Vanilla finished in 20 min / 200K tokens; Superpowers in 1 hr / 250K; GSD in 1 hr 45 min / 1.2M — with indistinguishable output. The time saved compounds through iteration: "me and Claude Code with 80 more minutes" beats any orchestration layer's one-shot output. *(Source: Chase AI)*

11. **The "line in the sand" problem: you can't predict if orchestration is justified.** The threshold of task complexity where orchestration becomes worthwhile is unknowable in advance. If you guess wrong with vanilla Claude Code, the cost is zero — you keep iterating. If you guess wrong with GSD, you've wasted 80+ minutes. Under uncertainty, minimize maximum regret. *(Source: Chase AI)*

12. **If you must use an orchestration layer, pick Superpowers over GSD.** Superpowers is lighter (250K vs 1.2M tokens), more fluid (auto-invoked skills vs manual slash commands), and has a lower penalty for misjudging complexity (40 min lost vs 80+ min). Install at the project level (`/plugin`) so it's available when needed, but don't invoke by default. *(Source: Chase AI)*

13. **Re-evaluate orchestration layers periodically.** Claude Code natively absorbs features that originally justified them (auto context clearing, improved planning). The gap keeps shrinking while the speed gap keeps widening. *(Source: Chase AI)*

## Autonomous Skill Optimization (Auto Research)

16. **Decompose even subjective tasks into boolean criteria.** The three-level framework: Level 1 (hard rules — character limits, format checks), Level 2 (subjective patterns expressed as boolean checks — evaluated by LLM judge), Level 3 (real-world data-derived criteria). Always optimize in order — Level 2 and 3 are fragile without solid Level 1 foundations. *(Source: Ben AI — Karpathy's Auto Research)*

17. **Cap optimization iterations at 5-10.** Performance degrades after 10-15 iterations — the optimization overfits or drifts. Token costs scale linearly. Default to 5 for simple criteria, 10 for complex multi-criteria runs. *(Source: Ben AI — Karpathy's Auto Research)*

18. **Only optimize high-value, frequently-used skills.** Token costs are non-trivial for extended optimization runs. Prioritize skills that run daily or produce customer-facing output (posts, emails, landing pages, CLAUDE.md routing). *(Source: Ben AI — Karpathy's Auto Research)*

19. **Use AI to discover your own optimization criteria.** Feed Claude your top 10 and bottom 10 outputs with engagement metrics. Let it identify patterns — hooks, CTAs, writing frameworks — that correlate with performance, then express those patterns as boolean criteria. *(Source: Ben AI — Karpathy's Auto Research)*

20. **Auto Research can optimize CLAUDE.md files.** Define criteria for your project instructions (e.g., "file routing accuracy to correct folders > 90%") and run the optimization loop against test scenarios. The system improves the system's own instructions. *(Source: Ben AI — Karpathy's Auto Research)*

## Agent Platform Selection (Tier Decision First, Vendor Second)

When picking an agent platform (Claude Managed Agents, LangChain Deep Agents Deploy, OpenAI Agents SDK, Vertex, AgentCore, Foundry, n8n, Agentforce, etc.), use the [Agent Platform Tiers](wiki/concepts/agent-platform-tiers.md) mental model. See also [Managed Agent Platforms](wiki/comparisons/managed-agent-platforms.md).

21. **Decide tier before vendor.** The five-tier build-to-buy spectrum (direct API → frameworks → managed platforms → low-code → embedded SaaS) is the primary lock-in decision. Vendor choice within a tier is secondary. Tier 3+ cedes memory, infra, and harness simultaneously — migration cost compounds. *(Source: The AI Automators)*

22. **Write down which of memory / infra / harness you'll cede.** These are the three lock-in surfaces. Tier 1-2 locks in nothing beyond the model API. Tier 3 locks memory + infra. Tier 4-5 locks the entire configuration. Listing your acceptable surfaces eliminates ~80% of vendor options before you start comparing. *(Source: The AI Automators)*

23. **Run the four tier-selection checks in order.** (1) Full control / compliance-heavy → Tier 1-2, possibly self-hosted. (2) Fast time to market → Tier 3-5. (3) Must swap models → model-agnostic only (Vertex, AgentCore, Deep Agents library, OpenAI Agents SDK, Google ADK). (4) Strict data-residency → self-hosted or strong DPA. The first hard constraint narrows the tier; only then compare vendors within that tier. *(Source: The AI Automators)*

24. **Treat "open source" and "openly deployable" as separate questions.** MIT license on the library ≠ free deployment path. LangChain Deep Agents is MIT, but Deep Agents Deploy requires LangSmith Plus at $39/seat/month and self-hosting is enterprise-only. Before adopting an "open alternative," verify you can actually self-host at your plan tier. *(Source: The AI Automators)*

25. **Managed-harness framing is lock-in dressed as future-proofing.** When a vendor argues "harnesses must evolve with models, so let us own it," the premise is true but the conclusion is a choice, not a necessity. Only accept the meta-harness bargain if you're committed to that vendor's model long-term AND your use case tolerates harness behavior changing under you. *(Source: The AI Automators)*

26. **Ask "build an agent" vs "adopt an agent" before comparing platforms.** Finished agent products (Claude Code, OpenClaude, Intercom Fin, Agentforce) are off-spectrum — you use them, you don't build on them. A license to an existing agent can replace a whole Tier-2 build. Scope this first. *(Source: The AI Automators)*

## Anti-Patterns

- **Over-engineering prompt pipelines** — elaborate orchestration when a simple prompt would do
- **Micromanaging agent output** — forcing your exact style instead of accepting working solutions
- **Reverting instead of fixing forward** — rolling back wastes the agent's work and your time
- **Not giving enough context** — the agent starts from zero every session; don't assume it knows
- **Ignoring execution time as feedback** — if the agent is spinning, the problem is your prompt or the architecture, not the agent
- **Mixing unrelated concerns in one session** — keep sessions focused on one task
- **Aggressive anti-laziness prompting on 4.6** — instructions like "CRITICAL: always use this tool" cause overtriggering on Claude 4.6; use calm directives instead *(Source: Anthropic)*
- **Spawning subagents for simple tasks** — Claude 4.6 is predisposed to spawn subagents; add guardrails for when direct work is faster *(Source: Anthropic)*
- **Reaching for orchestration layers preemptively** — GSD burned 1.2M tokens and 1h45m on a task that vanilla Claude Code handled in 20 minutes with no quality loss; orchestration overhead compounds the wrong direction *(Source: Chase AI)*
- **Bolting AI onto existing workflows without redesign** — produces the J-curve productivity dip; the tool changes the workflow but the workflow hasn't been redesigned around the tool *(Source: Nate B Jones / Dan Shapiro)*
- **Trusting AI productivity self-assessment** — developers are confidently wrong about AI's impact on their speed; measure with controlled comparisons *(Source: Nate B Jones / Dan Shapiro)*
- **Using `--dangerously-skip-permissions`** — blanket bypass with no granularity; use `/permissions` to pre-allow safe commands by pattern instead *(Source: Boris Cherny, Creator of Claude Code)*
- **Skipping the verification feedback loop** — without tests/typecheck/lint in the loop, Claude is "basically guessing"; with a feedback loop quality is 2-3x higher *(Source: Boris Cherny, Creator of Claude Code)*
- **Not planning before execution** — jumping straight into coding without a Plan mode blueprint reduces first-shot success; start every session with Shift+Tab twice *(Source: Boris Cherny, Creator of Claude Code)*
- **Flying blind on context and rate limits** — without visible indicators, you hit context limits or rate limit walls mid-task; set up a status line dashboard to make these invisible constraints visible and take action before they interrupt your flow *(Source: self — status line setup)*
- **Vague optimization criteria** — "make it better" produces nothing; every criterion must be a single boolean condition (true/false), specific enough to evaluate deterministically or by LLM judge *(Source: Ben AI — Karpathy's Auto Research)*
- **Running optimization loops indefinitely** — more iterations is not better; after 10-15 the optimization overfits or drifts, and token costs scale linearly with no quality gain *(Source: Ben AI — Karpathy's Auto Research)*
- **Picking an agent vendor before picking a tier** — vendor comparisons across different build-to-buy tiers are apples-to-oranges; the tier choice drives which lock-in surfaces (memory, infra, harness) you cede, and that decision dominates vendor differences *(Source: The AI Automators)*
- **Trusting "open source" to mean "openly deployable"** — MIT on the library can coexist with SaaS-only deployment and enterprise-gated self-hosting; verify the deployment path, not just the license *(Source: The AI Automators)*
- **Reaching for a managed Tier-3 agent platform when a finished agent product exists** — adopting Claude Code / OpenClaude / Agentforce can replace a whole Tier-2 or Tier-3 build; scope build-vs-adopt first *(Source: The AI Automators)*
- **Adding modules before pruning the ones that stopped earning their keep.** In the NLH ablation, verifiers and multi-candidate search *actively hurt* benchmark scores. Mature harness work is subtraction first — delete assumptions the newer model no longer needs before stacking on new structure. *(Source: PY — Rise of Harness Engineering)*
- **Keeping only trace summaries for agents you plan to iterate on.** Meta Harness accuracy drops almost as far with summaries (34.9%) as with no traces at all (34.6%) vs 50% with raw traces. Summaries destroy the signal future optimizers need. *(Source: PY — Rise of Harness Engineering)*
- **Grafting community-contributed skills into your harness without review.** 1-in-4 contains a vulnerability; prompt injection can live in harness text. Pin and review like any third-party dependency. *(Source: PY — Rise of Harness Engineering)*
