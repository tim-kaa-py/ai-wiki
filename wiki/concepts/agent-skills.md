---
title: "Agent Skills"
description: "Anthropic's framework for packaging reusable Claude capabilities as SKILL.md directories with scripts and reference files"
type: "concept"
pillar: "building"
tags: [agent-skills, claude, skills, progressive-disclosure, agents, mcp, claude-code, skills-as-packages, supply-chain, memory, evaluation]
sources:
  - "summaries/2025-10-16_anthropic_agent-skills.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
  - "summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
  - "summaries/2026-04-25_claude-code-docs_create-plugins.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
  - "summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md"
  - "summaries/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md"
  - "summaries/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md"
timestamp: "2026-08-24"
---

# Agent Skills

Anthropic's framework for packaging reusable capabilities for Claude. A **skill** is a directory containing a `SKILL.md` file with YAML frontmatter, optionally bundled with executable scripts and reference files. Available across Claude.ai, Claude Code, Agent SDK, and the Developer Platform.

## The Core Idea

A skill is an **onboarding guide for a new hire**: instructions + scripts + references, scoped to a specific task. Unlike CLAUDE.md (always loaded, applies broadly), skills are on-demand — they only enter context when the agent deems them relevant.

## Progressive Disclosure: Three Levels

The skill system's central design choice is keeping context small until needed:

| Level | When loaded | What's loaded |
|-------|-------------|---------------|
| **L1** | Always (system prompt) | `name` + `description` from SKILL.md frontmatter |
| **L2** | When Claude judges the skill relevant to the task | Full SKILL.md body |
| **L3+** | On demand as Claude works through the skill | Bundled scripts, references, example files |

This lets a Claude instance know *about* hundreds of skills while only paying the full context cost for the handful actually in use.

## SKILL.md Format

```yaml
---
name: my-skill
description: Specific, action-oriented description — what the skill does and when to use it
---

# My Skill

Step-by-step instructions the agent follows...
```

### The Description Is the Discovery Signal

Because L1 is the only gate between an unused skill and a loaded one, the frontmatter `description` decides whether a skill ever triggers. A vague description (`"helps with PDFs"`) will be skipped; a specific, action-oriented description (`"Extract tables and structured data from PDF invoices using Python"`) maps task → skill reliably.

## Capability Skills vs Preference Skills

Philipp Schmid (Google DeepMind, AI Engineer July 2026) splits skills by **lifespan**, which turns "should I keep this skill?" into an answerable question:

| | Capability skill | Preference skill |
|--|------------------|------------------|
| Teaches | Something the model cannot do consistently *yet* | Something the model can never know — your team's conventions |
| Examples | Tracing a log format, scaffolding a React app, using a post-cutoff API | House style, review workflow, domain-specific language |
| Lifespan | **Temporary** — expires as models improve | **Durable** |
| Role of evals | Tell you when the skill can be retired | Regression protection against model/harness updates |

The practical consequence: capability skills should be under continuous ablation (run the eval with and without the skill; when the gap closes, retire it), while preference skills need a standing eval so a model upgrade doesn't silently degrade them. See [Skill Evaluation](skill-evaluation.md). [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]

### Do Skills Actually Help?

Skills Bench 1.1 evaluated open and closed models across multiple harnesses on roughly 100 coding and productivity tasks. Headline findings:

- Skills deliver a **~15% average performance lift**.
- **Human-written skills outperform AI-generated ones**, and AI-generated skills can *degrade* performance. See [§ Who Should Write the Skill?](#who-should-write-the-skill), where this is reconciled with the validate-before-codify method below.
- `SKILL.md` files should stay **under ~500 lines** — the same threshold recorded in [Claude Code Skills](../how-tos/claude-code-skills.md#keep-skillmd-under-500-lines), here backed by benchmark data rather than context-budget reasoning.

### Model-Triggered vs User-Invoked

Orthogonal to the capability/preference split, and to progressive disclosure: *who* pulls the skill in. Schmid's argument is that **user-invoked skills are underrated** for routine dev workflow — creating a pull request, staging documentation — because explicit invocation removes the trigger-reliability problem entirely.

The corollary is the sharper half: **when you build an agent for customers, user-invoked skills do not exist as an option.** Your users don't know skills exist and will never type a slash command. Everything is model-triggered, which is exactly why customer-facing skills need eval discipline most. See [Skill Evaluation § The agents we use vs. the agents we build](skill-evaluation.md#the-agents-we-use-vs-the-agents-we-build). For the Claude Code flags that implement this, see [§ Invocation Control](#invocation-control-claude-code-specifics) below.

## Skills vs CLAUDE.md

| | CLAUDE.md | Skills |
|--|----------|--------|
| Loading | Always | On-demand |
| Scope | Project-wide conventions | Domain-specific capability |
| Right fit | "We use bun, not npm" | "How to generate and email a monthly report" |

Use CLAUDE.md for rules that apply broadly; use skills for capabilities that only matter for specific tasks.

## Scripts as Deterministic Tools

Skills can bundle executable scripts (Anthropic's PDF skill uses Python). The pattern: **don't burn tokens on work a script can do deterministically**. The skill teaches Claude when and how to invoke the script; the script handles the mechanical step.

Schmid pushes this one step further: if the *entire* workflow is a fixed sequence — "step one, go there; step two, do this" — there is no skill here at all. Write the script and have the model call it. Skills should set goals and constraints and leave the model the freedom to reach them; a procedure with no context-dependent variation is paying for judgment you don't need. [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]

## Security: Audit Before Installing

Skills are code + instructions that enter Claude's trusted context. **Malicious skills can introduce vulnerabilities** — prompt injections, backdoored scripts, exfiltration. Treat third-party skills like you would any dependency: audit before installing, prefer skills from known sources, review SKILL.md and bundled scripts.

### Why Sandboxes Don't Catch Prompt Injection in Skills

Patrick Debois's load-bearing point in *Context Is the New Code* (AI Engineer, May 2026): coding agents **auto-load** `agent.md` / `skill.md` files into the prompt on download, before any user code runs. A sandbox boundary kicks in when the agent *executes* something — not when it *reads context* into the model. By the time the sandbox is enforcing anything, the malicious instructions are already in the LLM's context window and may have already steered the agent's plan. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

The defense has to live **upstream of the LLM** — a perimeter scanner that filters incoming context for prompt-injection patterns *before* it reaches the model. Debois's framing: this is the AI equivalent of a Web Application Firewall. See [Context Filter](context-filter.md) for the full pattern.

## Skills as a Package Format

Once skills are bundled context + scripts + docs + (optionally) MCP server definitions, they have all the surface area of an npm package — and the same problems. Debois's framing in *Context Is the New Code*: skill distribution is a package-management problem, with the usual cast of issues: [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

- **Public registries are mostly noise.** Debois's blunt take: 99.9% of public skills are crap. Public registries are good for learning patterns; production-quality skills live in private registries.
- **Version pinning matters.** A skill that wraps a library needs to pin to library versions, or it drifts the moment the library updates.
- **Dependency hell ports across.** Skills that depend on other skills (or shared MCP servers) inherit the transitive-dependency problems of any package ecosystem.
- **Supply-chain scanning is not optional.** Snyk-style scanners need to look for credential leakage, injection patterns, and third-party exposure inside skill bundles. See [AI SBOM](ai-sbom.md) for the bill-of-materials half of this.
- **Run a private registry, not the public marketplace.** Even a Git repo with a manifest is enough to start. Treat each skill like an npm package: versioned, scanned, SBOM'd, eval'd before publish.

## How to Design a Skill

1. **Start from real failures.** Identify capability gaps in representative tasks — don't speculate about what might be useful.
2. **Write the description last.** Draft the skill body, then write a frontmatter description that specifically names the task and the trigger conditions.
3. **Move deterministic work into scripts.** Any step that doesn't require model judgment should be a script call.
4. **Test the discovery signal.** Give the agent representative tasks without priming for the skill. If it doesn't pick up the skill, the description is too vague.

### Finding Which Skills to Build: The Workflow Audit (Chase AI)

Before authoring a skill, surface *which* repeated work is worth codifying. Chase AI's **workflow audit** offers three discovery techniques — the second is the non-obvious one:

1. **Manual recall** — list your repeated tasks yourself.
2. **History mining** — have Claude Code read your last 10–20 sessions and extract repeated, not-yet-codified tasks into a chart of *task / desired output / proposed skill*. The agent's own session history is the audit corpus.
3. **Brain-dump interview** — hand Claude a stream-of-consciousness dump and have it interview you to surface the repeated work.

Pair this with **validate-before-codify**: do the task by hand once, confirm it works, then tell Claude "turn what we just did into a skill" — it can see the tool calls and back-and-forth from the session, so the skill is grounded in a working run rather than speculation — which is the condition the next section says generation has to meet. This operationalizes "start from real failures" above and complements Cole Medin's [3+ times rule](ai-layer.md). See [Agentic OS](agentic-os.md) for where the audit sits in the larger Level-1 build order. *(Source: Chase AI)*

### Who Should Write the Skill?

Skills Bench 1.1 found that **human-written skills outperform AI-generated ones**, and that AI-generated skills can actively degrade performance. Philipp Schmid's conclusion (AI Engineer, July 2026): human-written is the strongest option available. [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]

Read literally, that rules out the validate-before-codify method above. Read against what Schmid actually describes, it doesn't — his target is a specific loop:

> "you work on something, tell the model create a skill, and then it writes a skill.md file. We maybe look at it very closely. It roughly covers what we want to do and then we just accept it and start using it."

Three things are wrong with that loop, and none of them is *generation*: the skill is written from the model's reconstruction of the task rather than from an observed successful run; review is a skim; and nothing measures the result. Validate-before-codify fixes the first two by construction — the run happened, it worked, and the tool calls are in the session for the model to read off. It does not fix the third.

So the operative distinction is not human-written vs. AI-generated. It is **grounded and measured vs. neither**:

| | Grounded in a working run | Measured by an eval |
|---|---|---|
| "Create a skill for this" → skim → accept | ✗ | ✗ |
| Validate-before-codify | ✓ | ✗ |
| Either method + a skill eval | ✓ | ✓ |

The honest caveat: Skills Bench did **not** segment its results by authoring method, so there is no measurement showing that grounding rescues generation. Its finding stands as evidence about generated skills in the wild, and the wild is overwhelmingly the casual loop. Treat AI authorship as a cost to be bought down by grounding and eval, not a neutral choice — and note that Schmid's own remedy is not "write it by hand" but "measure it," which is the one move that makes the question empirical for your skill rather than in aggregate. See [Skill Evaluation](skill-evaluation.md).

## Forward-Looking: Skills over MCP

David Soria Parra (Anthropic, MCP maintainer — AI Engineer April 2026) announced **skills-over-MCP** as an upcoming MCP extension in the June 2026 spec. An MCP server will ship not only tools but the **skill files** that explain how to use them, folding today's distribution channels (plugins, registries, separate `load_skills` tools) into the protocol itself.

Implication for skill authors: once this lands, server authors can push updated usage guidance alongside updated tools through a single channel — no plugin mechanism or external registry required. Skills become a first-class MCP primitive, not just a Claude Code / Claude.ai feature.

See [MCP — Future of MCP / 2026 Roadmap](mcp.md#future-of-mcp--2026-roadmap).

## Invocation Control (Claude Code Specifics)

Skill frontmatter in Claude Code exposes two flags that gate **who** can trigger a skill:

| Flag                             | Effect                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `disable-model-invocation: true` | Only the user can invoke. Skill is removed from Claude's context entirely. Use for side-effect actions (`/deploy`, `/commit`). |
| `user-invocable: false`          | Only Claude can invoke. Hidden from the `/` menu. Use for background-knowledge skills (context-loaders).                       |
| (default — both)                 | Description is always in context; body loads on invocation by either party.                                                    |

This is orthogonal to L1/L2/L3 progressive disclosure: invocation control decides *who can pull the skill in*, progressive disclosure decides *how much loads when they do*.

## Skill Lifecycle Inside a Session

Once invoked, `SKILL.md` content enters the conversation as a single message and **persists for the rest of the session**. Implications:

- Mid-session edits to a skill file affect the **next** invocation, not the already-loaded copy.
- After auto-compaction, the most recently invoked skills are re-attached: first 5,000 tokens each, total budget 25,000 tokens, newest first.
- A brand-new top-level `skills/` directory needs a Claude Code restart; everything else is live.

## Subagent Execution: `context: fork`

A skill can run in an isolated subagent by setting `context: fork`. The subagent inherits no conversation history — the skill body becomes its task prompt. The `agent` field selects the execution environment (`Explore`, `Plan`, `general-purpose`, or any custom subagent from `.claude/agents/`).

Use forking when the skill should not see prior conversation, or when its execution would otherwise blow up the main context (large reads, untrusted code).

## Dynamic Context Injection

The `` !`command` `` syntax in skill content runs a shell command **before Claude sees anything**; the output replaces the placeholder. This is preprocessing, not a Claude tool call. It lets a skill ship live data (PR diff, current branch, log tail) into the prompt without spending a tool turn.

## Skill Kit as Owned Planning Stack (Pocock)

Matt Pocock's pipeline (AI Engineer 2026) uses skills as the **owned planning stack** that replaces closed planning products — every stage of his grill-me → PRD → Kanban → loop pipeline is a project-local skill in `.claude/skills/`:

| Skill | Stage | What it does |
|-------|-------|--------------|
| `grill-me` | Stage 1 | Tiny prompt body — "interview me relentlessly… one at a time… provide your recommended answer." Produces a shared design concept. |
| `write-a-PRD` | Stage 2 | Generates the destination doc. Returns module list first, full prose second. |
| `PRD-to-issues` | Stage 3 | Splits the PRD into vertical-slice Kanban issues with explicit `blocked_by:` relationships. |
| `improve-code-base-architecture` | Architecture | Surfaces shallow-module clusters to collapse into [Deep Modules](deep-modules.md). |

The thesis: planning is too important to outsource to a closed product, and skills are now expressive enough to own the stack repo-locally. Each skill is small, paste-able, and tunable — Matt's `grill-me` body is four sentences.

Pairing this with [Claude Code Skills § Skill Authoring Patterns](../how-tos/claude-code-skills.md#skill-authoring-patterns), all four are **Playbook skills** (repeating procedures); none need `disable-model-invocation` because they have no side effects until the loop fires.

See [Agentic Coding Workflow § The Pocock Pipeline](../how-tos/agentic-coding-workflow.md#the-pocock-pipeline-grill--prd--kanban--loop) for the end-to-end use.

## Command Chain as Owned SDLC (Cole Medin)

Cole Medin's principled-agentic-engineer system (April 2026) is the parallel worked example with a different emphasis: where Pocock owns the **planning stack** as repo-local skills, Cole owns the **whole SDLC** as a chain of repo-local **commands** in `.claude/commands/`. The talk uses commands rather than skills throughout — they predate skills in his workflow — but the conceptual claim ("the AI layer is rules + commands + skills, all in source control with PR review") generalizes to either Claude-Code-era primitive.

| Command | SDLC stage | What it does |
|---------|-----------|--------------|
| `/create-prd` | Ideate | Brain dump → PRD with mission, in-scope, out-of-scope, success criteria |
| `/create-stories` | Ideate | PRD → markdown stories pushed to Jira via the Atlassian MCP server |
| `/prime` | PIV (Plan) | Loads codebase + Jira-issue context for the picked ticket(s); detects blockers |
| `/plan` | PIV (Plan) | `plan.md` with locked decisions, files to touch, task list, validation strategy |
| `/implement` | PIV (Implement + Validate) | Fresh session — branch, code, validate, post Jira comment, open PR |

The thesis is the same as Pocock's, one layer up: **the SDLC is too important to outsource to a closed framework, and the AI layer (rules + commands + skills) is now expressive enough to own it repo-locally.** Two opinionated additions Cole brings:

- **The 3+ times rule.** Anytime you find yourself prompting something more than three times, it becomes a command or skill. Manual prompting on the fourth try is a smell.
- **PR-review the AI layer.** `.claude/` is in source control with the same review rigor as production code. A `CODEOWNERS` entry for the directory; reject command changes without a PR description naming the failure mode they address.

See [AI Layer](ai-layer.md) for the unified rules + commands + skills concept and [Agentic Coding Workflow § The Cole Medin Pipeline](../how-tos/agentic-coding-workflow.md#the-cole-medin-pipeline-ideate--piv--evolve) for the end-to-end use.

## Relation to Broader Patterns

Progressive disclosure generalizes beyond skills — it's the same pattern as MCP tool descriptions, lazy-loaded memory, and the [Harness Engineering](harness-engineering.md) principle of keeping context small. Skills are the Anthropic-productized version.

## Skills in Anthropic's Primitives Progression

Mahes (Anthropic Platform team, May 2026) places Skills in a deliberate progression of Anthropic primitives — **MCP** (external tools/data) → **harnesses** like Claude Code and the Agent SDK → **Skills** (the October 2025 launch — agent- or human-authored capability packs) → **Memory** (continuous self-learning). The framing is that each primitive "gets out of the model's way" and hands the model more of its environment to manage:

- **MCP** hands the model access to external systems.
- **Harnesses** hand the model an orchestration loop.
- **Skills** hand the model a packaged way to do a specific task.
- **Memory** closes the loop on long-horizon improvement — what the previous primitives let the agent *do* once, memory lets the agent *learn* across runs.

This is the cleanest external articulation of where Skills sit in Anthropic's primitive stack. Skills are also referenced as "**procedural memory**" inside the three-layer memory framing — they encode *how* to do things, alongside whatever declarative memory the file-system layer captures. See [Agent Memory Systems § The Platform View](agent-memory-systems.md#the-platform-view-memory-as-a-primitive-anthropic) for the full progression.

## Distribution: Standalone vs Plugin

Skills travel through two channels in Claude Code:

| Channel | Location | When to use |
|---------|----------|-------------|
| **Standalone** | `.claude/skills/` (project) or `~/.claude/skills/` (personal) | Iteration, personal workflow, project-only skills |
| **Plugin** | `skills/` at the root of a plugin package (alongside `.claude-plugin/plugin.json`) | Sharing across machines or with teammates; namespaced as `/<plugin-name>:<skill>` |

Plugins also bundle agents, hooks, MCP server definitions, LSP definitions, and a new **monitors** primitive (background commands streaming notifications to Claude). The conversion path standalone → plugin is mechanical: copy `skills/`, `agents/`, and the `hooks` block into a plugin root and add a `plugin.json`. Default to standalone until you actually need to share. See [Claude Code Plugins](../how-tos/claude-code-plugins.md).

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Claude Code Skills](../how-tos/claude-code-skills.md) — how-to: authoring, invocation control, forking, permissions
- [Claude Code Plugins](../how-tos/claude-code-plugins.md) — packaging skills + agents + hooks + monitors
- [Prompt Engineering for Claude](prompt-engineering-claude.md)
- [Harness Engineering](harness-engineering.md)
- [Context Development Life Cycle](context-development-life-cycle.md) — Debois's CDLC, where skills are the Distribute phase
- [Context Filter](context-filter.md) — perimeter scanner for prompt injection in `skill.md` / `agent.md`
- [AI SBOM](ai-sbom.md) — bill of materials for context packages
- [Patrick Debois](../people/patrick-debois.md) — DevOps originator framing context as code
- [Deep Modules](deep-modules.md) — `/improve-code-base-architecture` skill content
- [PRD-as-Prompt Pattern](prd-as-prompt.md) — destination-doc generation via `/write-a-PRD`
- [Matt Pocock](../people/matt-pocock.md) — skill-kit-as-planning-stack thesis
- [Cole Medin](../people/cole-medin.md) — command-chain-as-SDLC thesis
- [AI Layer](ai-layer.md) — global rules + commands + skills as a unified concept
- [Agent Memory Systems](agent-memory-systems.md) — the next primitive after Skills; same progressive-disclosure design lineage
- [Dreaming](dreaming.md) — companion to memory; out-of-band consolidation pattern
- [Agentic OS](agentic-os.md) — skills as the Level-1 backbone; the workflow audit that decides which skills to build
