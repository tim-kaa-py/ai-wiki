---
title: "Agent Skills"
type: "concept"
pillar: "building"
tags: [agent-skills, claude, skills, progressive-disclosure, agents, mcp, claude-code, skills-as-packages, supply-chain]
sources:
  - "summaries/2025-10-16_anthropic_agent-skills.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-04-19_ai-engineer_future-of-mcp-david-soria-parra-anthropic.md"
  - "summaries/2026-04-25_claude-code-docs_extend-claude-with-skills.md"
  - "summaries/2026-04-25_claude-code-docs_create-plugins.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
last_updated: "2026-05-05"
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

## Skills vs CLAUDE.md

| | CLAUDE.md | Skills |
|--|----------|--------|
| Loading | Always | On-demand |
| Scope | Project-wide conventions | Domain-specific capability |
| Right fit | "We use bun, not npm" | "How to generate and email a monthly report" |

Use CLAUDE.md for rules that apply broadly; use skills for capabilities that only matter for specific tasks.

## Scripts as Deterministic Tools

Skills can bundle executable scripts (Anthropic's PDF skill uses Python). The pattern: **don't burn tokens on work a script can do deterministically**. The skill teaches Claude when and how to invoke the script; the script handles the mechanical step.

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

## Forward-Looking: Skills over MCP

David Soria Parra (Anthropic, MCP maintainer — AI Engineer April 2026) announced **skills-over-MCP** as an upcoming MCP extension in the June 2026 spec. An MCP server will ship not only tools but the **skill files** that explain how to use them, folding today's distribution channels (plugins, registries, separate `load_skills` tools) into the protocol itself.

Implication for skill authors: once this lands, server authors can push updated usage guidance alongside updated tools through a single channel — no plugin mechanism or external registry required. Skills become a first-class MCP primitive, not just a Claude Code / Claude.ai feature.

See [MCP — Future of MCP / 2026 Roadmap](mcp.md#future-of-mcp--2026-roadmap).

## Invocation Control (Claude Code Specifics)

Skill frontmatter in Claude Code exposes two flags that gate **who** can trigger a skill:

| Flag | Effect |
|------|--------|
| `disable-model-invocation: true` | Only the user can invoke. Skill is removed from Claude's context entirely. Use for side-effect actions (`/deploy`, `/commit`). |
| `user-invocable: false` | Only Claude can invoke. Hidden from the `/` menu. Use for background-knowledge skills (context-loaders). |
| (default — both) | Description is always in context; body loads on invocation by either party. |

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

## Relation to Broader Patterns

Progressive disclosure generalizes beyond skills — it's the same pattern as MCP tool descriptions, lazy-loaded memory, and the [Harness Engineering](harness-engineering.md) principle of keeping context small. Skills are the Anthropic-productized version.

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
