---
title: "Cole Medin"
description: "AI-coding educator behind an internal-data LLM wiki adaptation and an operationalized agentic SDLC"
type: "person"
pillar: "ecosystem"
tags: [agentic-engineering, claude-code, workflow, education, system-evolution, ai-layer]
sources:
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
timestamp: "2026-05-09"
---

# Cole Medin

AI-coding educator and YouTuber building a coherent, opinionated body of work around **principled agentic engineering** — the deliberate counter to vibe-coding. Two distinct contributions to the field stand out: an **internal-data adaptation of Karpathy's LLM wiki pattern** (April 2026) and a **complete operationalised SDLC** built on Claude Code commands plus an Atlassian MCP backbone (April 30, 2026).

## Key Contributions

- **Three-phase pipeline (Ideate → PIV → Evolve).** The whole agentic-engineering workflow fits into three phases: unstructured ideation feeding into structured PRD/stories, a per-ticket [PIV loop](../concepts/piv-loop.md), and retroactive [System Evolution](../concepts/system-evolution.md). Two loops live inside the three phases — the inner PIV loop and the outer system-evolution loop. *(Source: 2026-04-30)*
- **PIV loop ("pivot").** The Plan → Implement → Validate primitive run per Jira ticket / GitHub issue / Linear ticket. Vocabulary worth using verbatim with a team. See [PIV Loop](../concepts/piv-loop.md). *(Source: 2026-04-30)*
- **The AI Layer triad.** Global rules + commands + skills as a single conceptual unit, all checked into source control under `.claude/`. The "**3+ times rule**": prompt anything more than three times and it becomes a command or skill. See [AI Layer](../concepts/ai-layer.md). *(Source: 2026-04-30)*
- **System Evolution / outer loop.** Bugs are defects in the AI layer, not just in the code. Treat every shipped defect as an opportunity to upgrade rules, commands, and skills via PR review. See [System Evolution](../concepts/system-evolution.md). *(Source: 2026-04-30)*
- **Two-layer planning in separate context windows.** Project-level planning (PRD + stories) and task-level planning (`plan.md`) live in separate sessions with separate commands. The implementer always opens a fresh session against `plan.md` alone. *(Source: 2026-04-30)*
- **Sub-agents as context buffers, not parallelism.** Cole's framing diverges from the common parallelism pitch: sub-agents exist primarily for context budgeting. A research task burns 30k–100k tokens; the parent only needs the 2k-token summary. With million-token windows, this discipline matters more, not less. *(Source: 2026-04-30)*
- **Internal-data adaptation of Karpathy's LLM wiki pattern.** Session logs from Claude Code conversations replace web clips as the raw input — same three-layer architecture (sources → wiki → index), applied to capturing tacit codebase knowledge. See [LLM Wiki Pattern § Internal Data Adaptation](../concepts/llm-wiki-pattern.md). *(Source: 2026-04-06)*
- **Self-evolution prompt.** A reusable prompt that names the outer-loop trigger: *"Claude, you allowed this problem to creep into my codebase. Dive into your AI layer — your rules, commands, and skills — and identify things we could improve so this kind of issue doesn't happen again."* *(Source: 2026-04-30)*

## Key Arguments

**Why off-the-shelf frameworks (BMAD, GSD, Cloudflow, spec-kit) are wrong for established SDLCs.** They bake opinionated end-to-end strategies with their own conventions; established teams already have processes they're not willing to throw out; the frameworks are bloated enough that adapting them is harder than starting simple. Conclusion: start with **simple primitives** (rules + commands + skills) and grow the system into the team's existing process. The simplicity is the point — it's the only path to ownership. *(Source: 2026-04-30)*

**Why sub-agents exist for context budgeting, not parallelism.** Research tasks consume tens of thousands of tokens; only summaries are needed downstream. A 1M-token window does not eliminate context-overload — *"they get overwhelmed just like people do."* The bigger the window gets, the more important explicit context-budgeting discipline becomes, because the temptation to dump everything in is greater. *(Source: 2026-04-30)*

**Why a bug is a defect in the rules/commands, not (just) in the code.** Coding agents are non-deterministic; some defects are inevitable. Every defect was *enabled* by some gap in the context the agent was given — a missing rule, an incomplete command, an unclear plan template. Patching only the code leaves that gap; the next ticket on the same area hits the same class of bug. Rules and commands are versionable Markdown; they can be PR-reviewed and merged like code. **Every bug is an opportunity to upgrade the AI layer.** This is the load-bearing argument of his whole system. *(Source: 2026-04-30)*

## Workflow

The full Cole Medin pipeline (see [Agentic Coding Workflow § Cole Medin Pipeline](../how-tos/agentic-coding-workflow.md#the-cole-medin-pipeline-ideate--piv--evolve)):

```
brain dump → /create-prd → /create-stories (Atlassian MCP → Jira) →
pick ticket → /prime → /plan → fresh session → /implement → outer loop on defect
```

Each `/`-prefixed step is a Markdown procedure file in `.claude/commands/`. The Atlassian MCP server pushes stories to Jira during `/create-stories`, pulls ticket context during `/prime`, and posts implementation summaries as ticket comments during `/implement`.

## Notable Quotes

> "It's not vibe coding." (Framing the principled stance against ad-hoc agent prompting.)

> "The engineer's job is no longer to write the code. It's to do the higher-leverage tasks — planning and validating."

> "Every bug is an opportunity to upgrade the AI layer."

> "Just because you can fit a million tokens doesn't mean you should." (On context budgeting under large windows.)

## Context

YouTube creator publishing systematic deep-dives on Claude Code workflows. The April 30, 2026 talk is a 1h07m guided tour of his complete coding-agent SDLC, demoed live with a poll-builder Next.js app and a Jira-backed ticket flow. The April 6 talk covers his internal-data adaptation of Karpathy's external-knowledge wiki pattern. Both talks share the same operating principle: **agents compound only when the layer outside the agent (memory, rules, commands) is itself versioned and evolved.**

## Related Pages

- [PIV Loop](../concepts/piv-loop.md) — the per-ticket Plan → Implement → Validate primitive
- [System Evolution](../concepts/system-evolution.md) — the outer-loop AI-layer RCA pattern
- [AI Layer](../concepts/ai-layer.md) — global rules + commands + skills as a unified concept
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md) — where the pipeline lives end-to-end
- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — Cole's internal-data adaptation
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) — Karpathy's bootstrap PRD that Cole highlighted
- [Andrej Karpathy](andrej-karpathy.md) — Cole's primary intellectual influence on the wiki side
