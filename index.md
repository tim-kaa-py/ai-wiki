---
okf_version: "0.1"
---

# AI Knowledge Wiki

## Building with AI

### Sources

* [11 Tiny Coding Agent Fixes With A Stupid Amount Of Payoff (Cole Medin)](summaries/2026-09-01_cole-medin_11-tiny-coding-agent-fixes-with-a-stupid-amount-of-payoff.md) - Eleven small, agent-agnostic workflow adjustments that raise coding-agent reliability, from rule rot and hook-enforced invariants to why compaction, mid-task model escalation, and multi-agent coordinators all backfire
* [Harness Engineering is not Enough: Why Software Factories Fail (Dex Horthy, HumanLayer)](summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md) - Dex Horthy argues RL-trained coding models can't be rewarded for maintainability, so lights-out software factories rot; the efficient path now is AI-assisted up-front planning while humans still read every line
* [Stanford's Method Turns Claude Into a PHD Level Research Team (Nate Herk)](summaries/2026-06-29_nate-herk_stanford-storm-method-claude-research-skill.md) - Nate Herk packages Stanford's STORM multi-perspective research method into a Claude skill that runs five expert lenses in parallel, maps their contradictions, and verifies every citation before delivering
* [The Agentic OS Setup That Will 10x Claude Code (Chase AI)](summaries/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md) - Describes a four-level agentic OS where codified skills and a memory/file structure carry most of the value over custom UI layers
* [Finally. Agent Loops Clearly Explained. (Nate Herk)](summaries/2026-06-19_nate-herk_agent-loops-clearly-explained.md) - Defines an agent loop as reason-act-observe-repeat and argues verification quality matters more than looping itself
* [Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI](summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md) - Argues that once code is free, engineers should build the harness (docs, lints, tests, reviewer agents) that steers coding agents instead of reviewing every PR
* [Harness Engineering: Leveraging Codex in an Agent-First World (OpenAI)](summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md) - OpenAI team's account of shipping code hands-off with Codex, detailing their docs-as-system-of-record harness architecture
* [How to Code with AI Agents (Peter Steinberger)](summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md) - Peter Steinberger shares principles for agentic engineering including agent empathy, codebase design, and parallel sessions
* [Claude Code 2.0 & Hidden Features](summaries/2026-03-30_aicodeking_claude-code-2-0-hidden-features-new-version.md) - Walkthrough of underutilized Claude Code 2.0 features covering session mobility, hooks, worktrees, and custom agents
* [LLM Wiki (Karpathy Gist)](summaries/2026-04-02_karpathy_llm-wiki.md) - Karpathy's blueprint for an LLM-maintained wiki that replaces RAG with a compounding, interlinked markdown knowledge base
* [Self-Evolving Claude Code Memory w/ Karpathy's LLM Knowledge Bases (Cole Medin)](summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md) - Adapts Karpathy's LLM knowledge base pipeline into a self-maintaining codebase memory system using Claude Code hooks
* [Why Andrej Karpathy Abandoned RAG (Claude Code x Obsidian)](summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md) - Tutorial replicating Karpathy's LLM wiki pattern using Claude Code with Obsidian as the visualization frontend
* [The 5 Levels of AI Coding (Nate B Jones)](summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md) - Dan Shapiro's five-level framework for AI coding maturity and why most developers remain stuck below full autonomy
* [Claude Prompting Best Practices (Anthropic)](summaries/2026-04-13_anthropic_claude-prompting-best-practices.md) - Anthropic's canonical prompt engineering reference for Claude 4.6 and Opus 4.7, covering techniques and agentic design
* [Claude Routines Just Dropped, And It's Perfect (Nick Saraev)](summaries/2026-04-14_nick-saraev_claude-routines-just-dropped.md) - Introduces Claude Routines, scheduled and triggered cloud Claude Code sessions that compete with n8n-style automation
* [Planning In Claude Code Just Got a Huge Upgrade (Nate Herk)](summaries/2026-04-06_nate-herk_planning-in-claude-code-just-got-a-huge-upgrade.md) - Covers Ultra Plan, a cloud-hosted multi-agent planning feature for Claude Code that speeds up planning and execution
* [Claude Code Ultraplan — Official Documentation (Anthropic)](summaries/2026-04-24_anthropic_claude-code-ultraplan-official-documentation.md) - Anthropic's docs on Ultraplan, a cloud-hosted planning session you can execute in the cloud or bring back to your terminal
* [Optimize your terminal setup (Anthropic)](summaries/2026-04-15_claude-docs_optimize-your-terminal-setup.md) - Anthropic's reference for configuring Claude Code's terminal, covering keybindings, notifications, and Vim mode
* [GSD vs Superpowers vs Claude Code (Chase AI)](summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md) - Benchmarks vanilla Claude Code against the Superpowers plugin and GSD framework, with vanilla winning on speed and cost
* [The ONLY Claude Design Guide You Should Watch (Chase AI)](summaries/2026-04-20_chase-ai_only-claude-design-guide-you-should-watch.md) - Explains Claude Design's iterate-via-tweaks-and-variants workflow and how to avoid burning usage quota
* [How I Built INSANE Claude Design Websites In 10 Minutes (Jono Catliff)](summaries/2026-04-18_jono-catliff_how-i-built-insane-claude-design-websites-in-10-minutes.md) - Describes the handoff workflow from a Claude Design prototype to a deployed Next.js site via Claude Code and Vercel
* [Claude Code Tips from the Creator (Boris Cherny)](summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md) - Boris Cherny's 13-tip thread on his personal Claude Code workflow, covering models, tools, permissions, and feedback loops
* [Claude Code Status Line Setup](summaries/2026-04-16_self_claude-code-statusline-setup.md) - Sets up a three-line Claude Code status bar showing context usage, session cost, rate limits, git branch, and code velocity
* [How to use Karpathy's Autoresearch to 10x Claude (Ben AI)](summaries/2026-04-07_ben-ai_karpathys-autoresearch-10x-claude.md) - Adapts Karpathy's Auto Research framework into a self-improving loop for testing and refining Claude skills
* [VSCode Hotkey: Launch Claude Code in Editor Tab](summaries/2026-04-19_self_vscode-claude-code-hotkey.md) - Explains a VSCode keybinding that opens Claude Code as a full editor tab instead of the terminal panel, enabling parallel sessions
* [Claude Code auto mode (Anthropic)](summaries/2026-03-25_anthropic_claude-code-auto-mode.md) - Introduces Claude Code auto mode, a two-stage classifier replacing permission prompts with injection and output detection
* [Building a C compiler with parallel Claudes (Anthropic)](summaries/2026-02-05_anthropic_building-c-compiler.md) - Recounts how 16 parallel Claude Code agents built a 100k-line Rust C compiler coordinated only by lock files
* [3 Claude Memory Systems to Get You Ahead of 99% of People (Simon Scrapes)](summaries/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md) - Compares Claude Code automemory against memarch and Hermes memory systems across storage, injection, and recall, recommending a hybrid setup
* [Memory and dreaming for self-learning agents (Claude)](summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md) - Anthropic frames memory as the next agentic primitive after MCP and Skills, and introduces Dreaming, a batch process that mines transcripts to update memory
* [Code execution with MCP (Anthropic)](summaries/2025-11-04_anthropic_code-execution-with-mcp.md) - Proposes exposing MCP tools as a code API in a sandboxed runtime to cut token usage by up to 98.7 percent
* [Claude Code sandboxing (Anthropic)](summaries/2025-10-20_anthropic_claude-code-sandboxing.md) - Describes OS-level sandboxing for Claude Code that cut permission prompts by 84 percent using filesystem and network isolation
* [Agent Skills (Anthropic)](summaries/2025-10-16_anthropic_agent-skills.md) - Anthropic's introduction of Agent Skills - folders of instructions, scripts, and resources that extend Claude via progressive disclosure
* [Writing effective tools for agents (Anthropic)](summaries/2025-09-11_anthropic_writing-tools-for-agents.md) - Five principles for writing effective agent tools, developed by using Claude Code itself as the build partner
* [Define success criteria and build evaluations (Anthropic)](summaries/2026-04-22_anthropic-docs_define-success-criteria-and-build-evaluations.md) - Anthropic's guide to defining SMART success criteria and choosing grading methods for LLM evaluations, arguing volume beats hand-graded quality
* [Claude Code Best Practices (Anthropic)](summaries/2025-04-18_anthropic_claude-code-best-practices.md) - Anthropic's canonical best practices for agentic coding with Claude Code, centered on managing context window limits
* [Karpathy's Wiki vs. Open Brain — Strengths & Limits of the LLM Wiki (Nate B Jones)](summaries/2026-04-22_nate-b-jones_karpathy-wiki-vs-open-brain.md) - Analyzes the strengths and failure modes of Karpathy's wiki pattern for solo research versus general corporate memory
* [Extend Claude with skills (Claude Code Docs)](summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md) - Anthropic's reference on Claude Code Skills as SKILL.md files that load only on invocation, with invocation and execution controls
* [Create plugins (Claude Code Docs)](summaries/2026-04-25_claude-code-docs_create-plugins.md) - Anthropic's guide to packaging skills, agents, hooks, MCP servers, and monitors into distributable Claude Code plugins
* [Create custom subagents (Claude Code Docs)](summaries/2026-04-25_claude-code-docs_create-custom-subagents.md) - Anthropic's reference for configuring Claude Code subagents, covering isolated context, frontmatter schema, and built-in examples
* [Context Is the New Code – Patrick Debois, Tessl](summaries/2026-05-03_ai-engineer_context-is-the-new-code.md) - Patrick Debois proposes a Context Development Life Cycle that applies DevOps practices to engineering prompts, skills, and workflows
* [The Complete Anatomy of a Claude Code Project - 2026 (GenAI Works)](summaries/2026-05-05_genai-works_complete-anatomy-of-claude-code-project.md) - A diagram-style overview of a Claude Code project's file structure, framing CLAUDE.md as project brain and hooks as deterministic
* [How Claude Code works (Anthropic)](summaries/2026-05-06_claude-code-docs_how-claude-code-works.md) - Anthropic's explanation of Claude Code as an agentic harness running a gather-context, take-action, verify loop
* [How Claude remembers your project (Anthropic)](summaries/2026-05-06_claude-code-docs_memory.md) - Anthropic's docs on how Claude Code persists knowledge via CLAUDE.md files and self-written auto memory
* [Extend Claude Code (Anthropic)](summaries/2026-05-06_claude-code-docs_features-overview.md) - Anthropic's decision map for choosing among CLAUDE.md, Skills, Subagents, Agent Teams, MCP, Hooks, and Plugins
* [Explore the context window (Anthropic)](summaries/2026-05-06_claude-code-docs_context-window.md) - Anthropic's token-level breakdown of what fills Claude Code's context window and when, including baseline system prompt cost
* [Automate workflows with hooks (Anthropic)](summaries/2026-05-06_claude-code-docs_hooks-guide.md) - Anthropic's guide to Claude Code hooks, the deterministic automation layer that runs commands at lifecycle events
* [Orchestrate teams of Claude Code sessions (Anthropic)](summaries/2026-05-06_claude-code-docs_agent-teams.md) - Anthropic's docs on experimental agent teams that coordinate multiple Claude Code sessions via peer messaging and a shared task list
* [Best practices for Claude Code (Anthropic)](summaries/2026-05-06_claude-code-docs_best-practices.md) - Anthropic's canonical Claude Code best practices centered on context hygiene and giving Claude verification criteria
* [Automate work with routines (Anthropic)](summaries/2026-05-06_claude-code-docs_routines.md) - Anthropic's docs on routines, scheduled or event-triggered Claude Code sessions that run autonomously on managed cloud infrastructure
* [Agent SDK overview (Anthropic)](summaries/2026-05-06_claude-code-docs_agent-sdk-overview.md) - Anthropic's overview of the Agent SDK, the programmable library exposing Claude Code's tools and agent loop for production automation
* [Work with sessions — Agent SDK (Anthropic)](summaries/2026-05-06_claude-code-docs_agent-sdk-sessions.md) - Anthropic's docs on Agent SDK sessions, covering continue, resume, and fork patterns for persisted JSONL conversation history
* [Code Review (Anthropic)](summaries/2026-05-06_claude-code-docs_code-review.md) - Anthropic's docs on Code Review, a managed service that runs reviewer agents on GitHub PRs and posts verified inline comments
* [Find bugs with ultrareview (Anthropic)](summaries/2026-05-06_claude-code-docs_ultrareview.md) - Anthropic's docs on ultrareview, a remote fleet of reviewer agents that independently verify bugs before merging
* [Full Walkthrough: Workflow for AI Coding — Matt Pocock](summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md) - Describes Matt Pocock's grill-me to PRD to Kanban DAG to Ralph loop workflow and context discipline practices
* [FULL Guide to Becoming a Principled Agentic Engineer (Cole Medin)](summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md) - Describes Cole Medin's Ideate-PIV-Evolve system of Claude Code commands backed by Jira, with an inner PIV loop and an outer loop that patches AI rules
* [Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban](summaries/2026-05-02_louis-knight-webb_software-engineering-becoming-plan-and-review.md) - Argues AI-displaced coding time shifts into planning and review, recommending plan-heavy workflows except for stateful front-end work
* [Stop babysitting your agents (Claude)](summaries/2026-05-20_claude_stop-babysitting-your-agents.md) - Argues attention becomes the bottleneck as models improve, and proposes self-verification, multi-Claude parallelism, and background routines
* [Karpathy-Inspired Claude Code Guidelines (multica-ai)](summaries/2026-05-28_multica-ai_karpathy-coding-guidelines.md) - Describes a viral CLAUDE.md artifact distilling Karpathy's coding pitfalls into four operational principles for guardrails
* [Why The Best Engineers Are Solving Code Review Bottlenecks (Beyond Coding)](summaries/2026-06-10_beyond-coding_engineers-solving-code-review-bottlenecks.md) - Argues that once code generation is cheap, review becomes the bottleneck, and proposes stop-hook guardrails plus behavioral tests instead of human review
* [Is RAG Still Needed? Choosing the Best Approach for LLMs (IBM Technology)](summaries/2026-03-09_ibm-technology_is-rag-still-needed-rag-vs-long-context.md) - IBM Technology's decision framework for RAG vs long context — three pros for each, and the use cases that determine which to choose
* [Introduction To Understanding RAG (Krish Naik)](summaries/2025-08-31_krish-naik_introduction-to-understanding-rag.md) - A foundational walkthrough of RAG — what it is, why it beats fine-tuning for private/changing data, and its two pipelines (data injection and retrieval)
* [MCP vs API: Simplifying AI Agent Integration with External Data (IBM Technology)](summaries/2025-05-05_ibm-technology_mcp-vs-api-ai-agent-integration.md) - IBM Technology on how MCP standardizes AI-agent integration versus general-purpose APIs — architecture, primitives, dynamic discovery, and why the two are layers not rivals
* [Graph RAG and Hybrid Search (GenPulse)](summaries/2026-07-07_genpulse_graph-rag-and-hybrid-search.md) - Advanced retrieval beyond pure vector search — hybrid (dense + sparse/BM25) search fused via RRF, knowledge-graph triplets, and hybrid RAG that combines both
* [HybridRAG: A Fusion of Graph and Vector Retrieval — Mitesh Patel, NVIDIA (AI Engineer)](summaries/2025-07-22_ai-engineer_hybridrag-fusion-graph-vector-retrieval-mitesh-patel-nvidia.md) - An NVIDIA practitioner's guide to building production graph + hybrid RAG — triplet extraction via ontology-guided prompting, multi-hop retrieval, Ragas/reward-model evaluation, and the 80/20 optimization reality
* [Boris Cherny: We Cut 80% of Claude Code's Prompt (Y Combinator)](summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md) - Claude Code's creator on deleting 80% of the system prompt via ablations, hard-task-plus-verification as the core skill, and dynamic workflows as a new axis of test-time compute
* [Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers) (Jay E | RoboNuggets)](summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md) - Secondhand breakdown of an Anthropic engineer's 'new rules of context engineering for Claude 5 models' — six then→now shifts including judgment over rules, progressive disclosure via router CLAUDE.md, and richer-than-markdown references
* [Opus 5 Is Exhausting. Anthropic Reveals The Fix. (Ray Amjad)](summaries/2026-08-05_ray-amjad_opus-5-is-exhausting-anthropic-reveals-the-fix.md) - Opus 5's default prose is jargon-dense and tiring to read; Claude Code output styles are the recommended fix, and they work best as a per-project, per-mood dial rather than a set-once preference
* [Anthropic's CCA Exam as a Field-Guide for Agentic Engineering (Frank Coyle, UC Berkeley — AI Engineer)](summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md) - Anthropic's certification blueprint read as a signal about production agent design — organised around anti-patterns, with a contrarian argument that the agentic loop is a rediscovered 1966 primitive
* [Don't Ship Skills Without Evals (Philipp Schmid, Google DeepMind — AI Engineer)](summaries/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md) - Philipp Schmid of Google DeepMind on why agent skills need evals, eight rules for writing effective skills, and how to build a cheap regex-based skill eval harness

### Wiki Pages

* [Agent Memory Systems: Storage / Injection / Recall](wiki/concepts/agent-memory-systems.md) - A three-question framework for evaluating any agent memory system, from Claude Code automemory to custom RAG
* [Claude Code](wiki/tools/claude-code.md) - Anthropic's CLI-based agentic coding environment spanning mobile, web, desktop, and terminal
* [Obsidian](wiki/tools/obsidian.md) - A markdown-based knowledge management tool used as the visualization frontend for the LLM wiki pattern
* [Agentic Coding Workflow](wiki/how-tos/agentic-coding-workflow.md) - Step-by-step guide to productive agentic coding, synthesized from Peter Steinberger and Claude Code power-user practices
* [Empathize with the Agent](wiki/concepts/empathize-with-the-agent.md) - The mental shift of thinking from the agent's zero-context perspective before prompting it, as the key to effective agentic coding
* [LLM Wiki Pattern](wiki/concepts/llm-wiki-pattern.md) - Karpathy's knowledge management approach where an LLM incrementally builds a structured markdown wiki instead of using traditional RAG
* [Agentic OS (AIOS)](wiki/concepts/agentic-os.md) - Chase AI's four-level framing for a personal agentic OS combining loop engineering, skills, memory, and a navigable second brain
* [PRD-as-Prompt](wiki/concepts/prd-as-prompt.md) - A bootstrap pattern encoding a full system architecture as a product requirements document a coding agent executes in one prompt
* [Claude Code Hooks for Memory](wiki/how-tos/claude-code-hooks-memory.md) - How to set up Claude Code hooks that automatically capture session knowledge into a self-maintaining wiki
* [Claude Code Permissions](wiki/how-tos/claude-code-permissions.md) - How to configure Claude Code permissions via /permissions instead of the dangerous blanket bypass
* [Prompt Engineering for Claude](wiki/concepts/prompt-engineering-claude.md) - Anthropic's official prompt engineering patterns and mental model for getting the most out of Claude 4.6 and Opus 4.7
* [Five Levels of AI Coding](wiki/concepts/five-levels-of-ai-coding.md) - Dan Shapiro's maturity model for AI-assisted coding, from autocomplete to fully autonomous dark-factory software production
* [Claude Routines](wiki/tools/claude-routines.md) - How scheduled, triggered, or API-invoked Claude Code sessions turn Claude into a no-code automation platform
* [Claude Routines vs n8n](wiki/comparisons/claude-routines-vs-n8n.md) - Compares Claude Routines' natural-language automation against n8n/Make.com's node-based workflow builders
* [Claude Code Orchestration Layers](wiki/comparisons/claude-code-orchestration-layers.md) - Head-to-head comparison of vanilla Claude Code, Superpowers, and GSD building the same benchmark project
* [Retrieval-Augmented Generation (RAG)](wiki/concepts/rag.md) - How RAG grounds an LLM in an external knowledge base via a data-injection pipeline and a retrieval pipeline, instead of retraining
* [Hybrid RAG: Hybrid Search and Graph RAG](wiki/concepts/hybrid-rag.md) - Advanced retrieval beyond pure vector search — hybrid (dense + sparse/BM25) search fused via RRF, knowledge-graph triplets, and hybrid RAG that fuses both as a retrieval safety net
* [RAG vs Long Context](wiki/comparisons/rag-vs-long-context.md) - A decision framework for RAG vs long context — three symmetric pros each, resolved by data shape rather than by which is 'better'
* [Multi-Perspective Research (STORM Pattern)](wiki/concepts/multi-perspective-research.md) - A research topology where several persona lenses research independently, a contradiction pass cross-examines them, and a separate verification fleet checks every citation against its primary source
* [MCP vs API](wiki/comparisons/mcp-vs-api.md) - How MCP standardizes AI-agent integration versus general-purpose APIs — shared client-server roots, MCP's dynamic discovery and uniform interface, and why the two are layers not rivals
* [GSD](wiki/tools/gsd.md) - A Claude Code orchestration framework adding rigid phase-based planning and sub-agent-driven development
* [Superpowers](wiki/tools/superpowers.md) - A Claude Code plugin adding skill-based orchestration, visual design iteration, and TDD-driven development
* [Claude Code Status Line Setup](wiki/how-tos/claude-code-status-line.md) - How to configure a three-line status bar showing context, cost, rate limits, and git branch
* [Auto Research](wiki/concepts/auto-research.md) - Karpathy's self-improving optimization loop of criteria, baseline, hypothesis, test, and evaluate, adapted for AI skill tuning
* [VSCode Hotkey: Launch Claude Code in Editor Tab](wiki/how-tos/vscode-claude-code-hotkey.md) - How to bind a VSCode keyboard shortcut that opens Claude Code as a full editor tab instead of the terminal panel
* [Claude Code Auto Mode](wiki/how-tos/claude-code-auto-mode.md) - How auto mode's two-stage classifier replaces --dangerously-skip-permissions with safer unattended runs
* [Claude Code Sandboxing](wiki/how-tos/claude-code-sandboxing.md) - How OS-level sandboxing restricts filesystem and network access for Claude Code sessions
* [Agent Skills](wiki/concepts/agent-skills.md) - Anthropic's framework for packaging reusable Claude capabilities as SKILL.md directories with scripts and reference files
* [Parallel Agent Patterns](wiki/concepts/parallel-agent-patterns.md) - Two coordination models for running many Claude agents in parallel: lock-file agent teams and hierarchical orchestrator-worker
* [Tool Design for Agents](wiki/concepts/tool-design-for-agents.md) - How to design tools LLM agents can use reliably, framed as the agent-computer interface deserving the same care as human interfaces
* [MCP (Model Context Protocol)](wiki/concepts/mcp.md) - Anthropic's open protocol for exposing tools, data, and prompts to LLM agents via local or remote MCP servers
* [Desktop Extensions (.mcpb)](wiki/how-tos/desktop-extensions-mcpb.md) - How .mcpb packages MCP servers for one-click install into Claude Desktop without manual setup
* [Claude Design](wiki/tools/claude-design.md) - Anthropic's browser-based front-end generator at claude.ai/design, with design systems, tweaks, and variants
* [Claude Code Skills](wiki/how-tos/claude-code-skills.md) - How to author, invoke, and constrain Skills, the SKILL.md-based successor to custom commands
* [Claude Code Plugins](wiki/how-tos/claude-code-plugins.md) - How to author, test, and ship Claude Code plugins bundling skills, agents, hooks, and MCP servers
* [Claude Code Custom Subagents](wiki/how-tos/claude-code-custom-subagents.md) - How to create and configure custom subagents in Claude Code for isolated, offloaded tasks
* [Context Development Life Cycle (CDLC)](wiki/concepts/context-development-life-cycle.md) - Patrick Debois's five-phase Generate-Test-Distribute-Observe-Adapt lifecycle for treating context like versioned code
* [Context Filter](wiki/concepts/context-filter.md) - Patrick Debois's proposal for a pre-agent filter scanning incoming context for prompt-injection patterns before it reaches the LLM
* [AI SBOM](wiki/concepts/ai-sbom.md) - Patrick Debois's proposal for a bill of materials tracking provenance of skills, agent.md bundles, and MCP-server context packages
* [Claude Agent SDK](wiki/tools/claude-agent-sdk.md) - How the Claude Agent SDK exposes Claude Code's tools, hooks, and context management as a programmable library
* [Claude Code Agent Teams](wiki/how-tos/claude-code-agent-teams.md) - How Claude Code's experimental agent teams coordinate multiple sessions with peer-to-peer messaging
* [Claude Code Review (Managed Service)](wiki/how-tos/claude-code-review.md) - How Anthropic's managed Code Review service runs agent fleets to analyze and comment on GitHub PRs
* [Claude Code Ultrareview](wiki/how-tos/claude-code-ultrareview.md) - How /ultrareview runs a remote reviewer-agent fleet that independently verifies findings before merging
* [Smart Zone](wiki/concepts/smart-zone.md) - Dex Hardy and Matt Pocock's framing of a session's context as a smart zone of reliable reasoning versus a degraded dumb zone
* [Deep Modules](wiki/concepts/deep-modules.md) - Ousterhout's deep-module design heuristic applied to AI coding, with Matt Pocock's argument for why it matters more now
* [Matt Pocock](wiki/people/matt-pocock.md) - AI-coding teacher known for end-to-end pipeline design, the grill-me skill, and the Sandcastle library
* [Code-as-Text Structural Tests](wiki/concepts/code-as-text-structural-tests.md) - Ryan Lopopolo's third testing tier that runs assertions against source code as text to keep agent-authored codebases legible
* [Reviewer Agents](wiki/concepts/reviewer-agents.md) - Ryan Lopopolo's persona-based CI agents that review every push against a documented standard to remove humans from the merge path
* [Claude Code Ultra Plan](wiki/how-tos/claude-code-ultra-plan.md) - How Ultra Plan offloads Claude Code's planning phase to a cloud multi-agent Opus 4.6 architecture
* [PIV Loop](wiki/concepts/piv-loop.md) - Cole Medin's per-ticket Plan-Implement-Validate inner loop that an engineer runs while a coding agent ships cleanly
* [System Evolution](wiki/concepts/system-evolution.md) - Cole Medin's outer-loop root-cause analysis of the AI layer itself after a coding agent ships a defect, to compound improvements over time
* [AI Layer](wiki/concepts/ai-layer.md) - Cole Medin's umbrella term for global rules, commands, and skills as the versioned instruction layer surrounding a coding agent
* [Cole Medin](wiki/people/cole-medin.md) - AI-coding educator behind an internal-data LLM wiki adaptation and an operationalized agentic SDLC
* [Plan and Review](wiki/concepts/plan-and-review.md) - Louis Knight-Webb's framing that time saved from AI coding is displaced into planning and reviewing, not freed as slack
* [Focus Maxing](wiki/concepts/focus-maxing.md) - Louis Knight-Webb's anti-pattern term for workflows that pull a human in and out of context every 30 seconds to babysit agent runs
* [Louis Knight-Webb](wiki/people/louis-knight-webb.md) - Vibe Kanban founder arguing software engineering is becoming plan and review rather than writing code
* [Dreaming](wiki/concepts/dreaming.md) - Anthropic's out-of-band batch process that mines agent transcripts across sessions to consolidate and diff a shared memory store
* [Cognitive Debt](wiki/concepts/cognitive-debt.md) - Florian Buetow's two failure modes for engineers who stop understanding their own codebase as AI writes more of the code
* [Florian Buetow](wiki/people/florian-buetow.md) - Engineer arguing that engineered guardrail environments, not human review, must catch agent code errors
* [Product Overhang](wiki/concepts/product-overhang.md) - Boris Cherny's paired concepts of product overhang (capabilities today's models have that no product elicits) and hobbling (products actively getting in the model's way)
* [Dynamic Workflows](wiki/concepts/dynamic-workflows.md) - Claude Code's sandboxed agent-orchestration primitive — an "algebra for agents" Cherny frames as a new axis of test-time compute
* [Claude Code Output Styles](wiki/how-tos/claude-code-output-styles.md) - Persistent, per-project modifiers on how Claude Code writes back to you — the config-level fix for output that's technically correct but exhausting to read
* [Skill Evaluation](wiki/concepts/skill-evaluation.md) - Why agent skills need evals, and the minimal harness — test-case JSON plus regex asserts — that makes skill quality, trigger reliability, and retirement measurable

## Understanding AI

### Sources

* [Persona Engineering: A Field Guide to AI Synthetic Personas (AI Engineer)](summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md) - A field guide to synthetic personas — what they reliably predict, the three ways they fail, and why human self-consistency sets the accuracy ceiling
* [We just figured out how AI actually works (J-Space)](summaries/2026-07-08_matthew-berman_we-just-figured-out-how-ai-actually-works-j-space.md) - Matthew Berman walks through Anthropic's J-space / global workspace paper — a small set of privileged internal representations Claude can report on, reason with, and be steered through
* [Rethinking AI Agents: The Rise of Harness Engineering (PY)](summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md) - Argues agents equal model plus harness, citing papers showing orchestration code drives large performance swings
* [The Future of MCP — David Soria Parra, Anthropic (AI Engineer)](summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md) - Anthropic's David Soria Parra on why 2026 agents need a connectivity stack of Skills, MCP, and CLI/computer-use plus progressive discovery and programmatic tool calling
* [Quantifying infrastructure noise in agentic coding evals (Anthropic)](summaries/2026-04-18_anthropic_quantifying-infrastructure-noise.md) - Shows infrastructure setup differences cause a 6-point spread on Terminal-Bench 2.0, so small leaderboard gaps may be noise not capability
* [Harness design for long-running app development (Anthropic)](summaries/2026-03-24_anthropic_harness-design-long-running-apps.md) - Examines a Planner-Generator-Evaluator harness for long-running app development and its cost versus solo-agent tradeoffs
* [Eval awareness in Claude Opus 4.6's BrowseComp (Anthropic)](summaries/2026-03-06_anthropic_eval-awareness-browsecomp.md) - Documents the first observed case of Claude suspecting an evaluation and locating the hidden answer key
* [Demystifying evals for AI agents (Anthropic)](summaries/2026-01-09_anthropic_demystifying-evals-for-ai-agents.md) - A comprehensive guide to evaluating AI agents covering grader types, non-determinism metrics, and eval saturation
* [Effective harnesses for long-running agents (Anthropic)](summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md) - Describes an initializer-plus-coding-agent harness pattern for multi-context-window long-running agent tasks
* [Effective context engineering for AI agents (Anthropic)](summaries/2025-09-29_anthropic_effective-context-engineering.md) - Argues context engineering supersedes prompt engineering and outlines strategies to manage context rot in agents
* [How we built our multi-agent research system (Anthropic)](summaries/2025-06-13_anthropic_multi-agent-research-system.md) - Details Anthropic's orchestrator-worker multi-agent research system and its token cost and performance tradeoffs
* [The 'think' tool (Anthropic)](summaries/2025-03-20_anthropic_think-tool.md) - Introduces the think tool giving Claude scratch space during tool-use chains, improving tau-Bench airline results by 54%
* [SWE-bench 49% with Claude 3.5 Sonnet (Anthropic)](summaries/2025-01-06_anthropic_swe-bench-sonnet.md) - Describes how Claude 3.5 Sonnet reached 49% on SWE-bench Verified using minimal tooling of just Bash and Edit
* [Building effective agents (Anthropic)](summaries/2024-12-19_anthropic_building-effective-agents.md) - Anthropic's taxonomy distinguishing workflows from agents and five workflow patterns for building effective LLM systems
* [Introducing Contextual Retrieval (Anthropic)](summaries/2024-09-19_anthropic_contextual-retrieval.md) - Explains Anthropic's contextual retrieval technique that prepends context to chunks before embedding/BM25 to cut retrieval failures

### Wiki Pages

* [J-Space](wiki/concepts/j-space.md) - A small, privileged set of internal representations in Claude that the model can report on, reason with, and be steered through — Anthropic's concrete finding behind global workspace theory
* [Harness Engineering](wiki/concepts/harness-engineering.md) - The discipline of designing and pruning everything around an agent that isn't model weights, the third era after prompt and context engineering
* [Agent Orchestration Patterns](wiki/concepts/agent-orchestration-patterns.md) - Anthropic's five canonical agent orchestration building blocks that production harnesses compose to close the performance gap
* [Agent Loops (Loop Engineering)](wiki/concepts/agent-loops.md) - Defines the reason-act-observe agent loop and Nate Herk's loop engineering mindset shift for designing systems that prompt agents
* [Natural Language Harness (NLH)](wiki/concepts/natural-language-harness.md) - The Tingua team's discipline of writing an agent's control logic in structured natural language, separated from runtime and tools
* [Meta Harness](wiki/concepts/meta-harness.md) - Omar Khattab's Stanford framework that treats the agent harness itself, not just prompts, as the target of automated optimization
* [Omar Khattab](wiki/people/omar-khattab.md) - Stanford researcher behind DSPy and the Meta Harness paper on optimizing agent pipelines, not just prompts
* [Context Engineering](wiki/concepts/context-engineering.md) - The discipline of curating what tokens occupy a model's context window across a session, as the successor to prompt engineering
* [Generator-Evaluator Harness](wiki/concepts/generator-evaluator-harness.md) - A GAN-inspired agent pattern where a generator produces output and a separate evaluator critiques it against a rubric until it passes
* [Agent Evaluation](wiki/concepts/agent-evaluation.md) - Anthropic's vocabulary and grader taxonomy for evaluating LLM agents, plus non-determinism metrics and a practical roadmap
* [Eval Awareness](wiki/concepts/eval-awareness.md) - When a model recognizes it is being evaluated and changes behavior to exploit that context, illustrated by the BrowseComp incident
* [Infrastructure Noise in Evals](wiki/concepts/infrastructure-noise-in-evals.md) - Anthropic's finding that agentic benchmark scores depend on runtime resources, so small leaderboard gaps can be infrastructure artifacts
* [Distribution Evaluation](wiki/concepts/distribution-evaluation.md) - How to evaluate a system whose honest output is a spread rather than an answer — forecast vs. measurement, two metric families, and measuring the noise floor of your own ground truth
* [Synthetic Personas](wiki/concepts/synthetic-personas.md) - LLM-simulated respondents used as forecasts of human answers — what they reliably predict, the three ways they fail, and why human self-consistency caps their accuracy
* [The 'think' Tool](wiki/concepts/think-tool.md) - A no-op tool that lets an agent record reasoning mid-chain before its next tool call, distinct from extended thinking
* [Contextual Retrieval](wiki/concepts/contextual-retrieval.md) - Anthropic's RAG chunking technique that prepends an LLM-generated situating summary to each chunk before embedding or indexing

## AI Ecosystem

### Sources

* [Anthropic Built It. OpenAI and LangChain Just Responded (The AI Automators)](summaries/2026-04-18_the-ai-automators_anthropic-built-it-openai-langchain-responded.md) - Compares Anthropic Managed Agents, LangChain Deep Agents Deploy, and OpenAI Agents SDK and frames the real choice as where you sit on a build-to-buy spectrum
* [2026 Agentic Coding Trends Report (Anthropic)](summaries/2026-01-21_anthropic_agentic-coding-trends-2026.md) - Anthropic's 2026 report framing agentic coding around the collaboration paradox and net-new work volume rather than speed
* [Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs, Software Factory (Latent Space)](summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md) - Notion engineers recount 3.5 years of rebuilding coding agent harnesses and their views on MCP versus CLI tradeoffs
* [Scaling Managed Agents: Decoupling brain from hands (Anthropic)](summaries/2026-04-15_anthropic_scaling-managed-agents.md) - Describes Anthropic's split of Managed Agents into a stateless harness, interchangeable sandboxes, and durable session log
* [Designing AI-resistant technical evaluations (Anthropic)](summaries/2026-01-21_anthropic_designing-ai-resistant-evaluations.md) - Discusses how Claude models beat a take-home engineering test and how to redesign evaluations to resist AI pattern-matching
* [Advanced tool use on the Claude Developer Platform (Anthropic)](summaries/2025-11-24_anthropic_advanced-tool-use.md) - Introduces three beta tool-use features: Tool Search, Programmatic Tool Calling, and Tool Use Examples
* [Postmortem of three recent issues (Anthropic)](summaries/2025-09-17_anthropic_postmortem-three-recent-issues.md) - Anthropic's postmortem on three infrastructure bugs in Aug-Sep 2025 that degraded Claude output quality
* [Desktop Extensions: One-click MCP install (Anthropic)](summaries/2025-06-26_anthropic_desktop-extensions.md) - Covers Desktop Extensions, the .mcpb packaging format for one-click MCP server installation in Claude Desktop
* [Open Knowledge Format (OKF) v0.1 Specification (Google Cloud Platform)](summaries/2026-06-12_google-cloud_open-knowledge-format-okf-v0-1-spec.md) - Google's vendor-neutral spec for knowledge as markdown-plus-frontmatter bundles, standardizing only a required type field and a permissive consumption model

### Wiki Pages

* [Andrej Karpathy](wiki/people/andrej-karpathy.md) - AI researcher and originator of the LLM wiki pattern for maintaining personal knowledge bases with LLMs
* [Peter Steinberger](wiki/people/peter-steinberger.md) - OpenClaw creator and vocal agentic-coding practitioner known for the Agentic Trap curve and soul.md concept
* [Patrick Debois](wiki/people/patrick-debois.md) - DevOps originator now applying SDLC discipline to context engineering via the Context Development Life Cycle
* [Boris Cherny](wiki/people/boris-cherny.md) - Creator of Claude Code, arguing for empirical harness-building: delete the prompt, give hard tasks, build verification channels
* [Agent Platform Tiers](wiki/concepts/agent-platform-tiers.md) - A five-tier build-to-buy spectrum for positioning an agentic system, from full control to full vendor convenience
* [Claude Managed Agents](wiki/tools/claude-managed-agents.md) - Anthropic's fully cloud-hosted agent platform bundling model harness and sandboxed execution
* [Deep Agents & Deep Agents Deploy](wiki/tools/deep-agents-deploy.md) - LangChain's open-source Deep Agents harness library and its managed LangSmith deployment wrapper
* [OpenAI Agents SDK](wiki/tools/openai-agents-sdk.md) - OpenAI's self-hosted agent framework with harness features baked in for long-horizon agent loops
* [Managed Agent Platforms](wiki/comparisons/managed-agent-platforms.md) - Compares Claude Managed Agents, LangChain Deep Agents Deploy, and OpenAI Agents SDK and their lock-in tradeoffs
* [AI-Resistant Evaluation Design](wiki/comparisons/ai-resistant-evaluation-design.md) - How a real take-home eval evolved through three versions as models caught up, from Anthropic's performance team
* [MCP vs CLI](wiki/comparisons/mcp-vs-cli.md) - How to choose between MCP tools and a shell/CLI for agent tool access, across four decision axes
* [Software Factory](wiki/concepts/software-factory.md) - Simon Last's framing of coding agents as the kernel of AGI, forming an automated loop for building and maintaining software
* [Model Behavior Engineer (MBE)](wiki/concepts/model-behavior-engineer.md) - Notion's non-engineering career track for people who own and shape how an organization's AI behaves
* [The Collaboration Paradox](wiki/concepts/collaboration-paradox.md) - Anthropic's finding that developers use AI in most work yet fully delegate very few tasks, reframing the right success metric
* [Open Knowledge Format (OKF)](wiki/concepts/open-knowledge-format.md) - Google's vendor-neutral v0.1 spec for representing knowledge as a git-shippable directory of markdown-plus-frontmatter bundles, standardizing only a required type field and a permissive consumption model

## About This Wiki

- [User Documentation](docs/user-documentation.md) — how to use this system
- [Concept](docs/concept.md) — architecture + recreation guide for any topic

---

**88 sources** | **92 wiki pages** | [Ingest Log](log.md)
