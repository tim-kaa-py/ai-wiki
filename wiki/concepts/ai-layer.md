---
title: "AI Layer (Rules + Commands + Skills)"
description: "Cole Medin's umbrella term for global rules, commands, and skills as the versioned instruction layer surrounding a coding agent"
type: "concept"
pillar: "building"
tags: [agentic-engineering, claude-code, ai-layer, global-rules, commands, skills, source-control, agent-architecture]
sources:
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
  - "summaries/2026-09-01_cole-medin_11-tiny-coding-agent-fixes-with-a-stupid-amount-of-payoff.md"
timestamp: "2026-09-03"
---

# AI Layer (Rules + Commands + Skills)

The umbrella term Cole Medin uses for everything you teach a coding agent: **global rules** + **commands** + **skills**. All three live as Markdown in `.claude/` and are checked into source control. The AI layer is the unit of versioned, peer-reviewable instruction surrounding the model — the thing [System Evolution](system-evolution.md) edits when the agent ships a defect, and the thing the [PIV loop](piv-loop.md) consumes during normal forward progress.

## The Triad

| Layer | Loaded into context | Use it for | Cost |
|-------|--------------------|-----------|------|
| **Global rules** | Every session, automatically | Conventions you always want followed (style, tooling, language choice, testing strategy) | Permanent token tax — every session pays it |
| **Commands** | On invocation by name (`/...`) | Procedures for specific moments (creating a PRD, planning a feature, exploring a codebase) | Pay only when invoked |
| **Skills** | On invocation by Claude or user | Reusable workflows the agent can auto-trigger from a description | Pay only when invoked; auto-discoverable |

Global rules are *always-on*. Commands and skills are *on-demand* — context-cheap, invokable when the moment is right. The AI layer is the deliberate composition of all three.

## Examples (from the talk)

### Global rules
*(loaded into every session)*

```
- Always use uv for Python package management.
- Always use TypeScript, never plain JavaScript.
- Match existing component styles when adding new front-end components.
- All new endpoints get integration tests, not just unit tests.
```

### Commands (Cole's PIV chain)
*(each is a Markdown procedure file in `.claude/commands/`, invokable as a slash command)*

```
/create-prd <output-path>
/create-stories <prd-path> <jira-project-id> <jira-epic-id>
/prime <jira-issue-ids>
/plan <free-form description or ticket id>
/implement <plan-path>
```

### Skills

Cole uses commands as the primary primitive in this talk; skills are the more-recent Claude Code primitive that supersedes ad-hoc commands for repeating procedures with auto-discovery (see [Agent Skills](agent-skills.md) and [Claude Code Skills](../how-tos/claude-code-skills.md) for the full Anthropic-canonical model). The conceptual triad is the same regardless of which Claude-Code-era primitive you reach for.

## The 3+ Times Rule

The discipline that decides when something becomes a command or skill:

> **Anytime you find yourself prompting something more than three times, it becomes a command or skill.**

Manual prompting on the fourth try is a smell. The fix is not "remember to prompt better" — it's "lift the prompt into the AI layer where it's versionable, reviewable, and discoverable."

How to apply: keep an informal tally during the first week of a project. Anything that hits three is on the next sprint's command-extraction list before you prompt it a fourth time.

## Why the Triad, Not Just CLAUDE.md

Three rules of thumb decide the layer:

1. **Always relevant?** → Global rules. (Cost: every-session token tax. Bar: high. The line in your team's coding-style doc that no PR has questioned in two years.)
2. **Specific moment, structured procedure?** → Command. (Cost: pay on invocation. Bar: medium. The four-step ritual you do every time you start a feature.)
3. **Specific moment, agent should auto-discover?** → Skill. (Cost: pay on invocation; description always-on for triggering. Bar: medium. The procedure you want Claude to pick up without being told.)

Don't cram everything into global rules. Every line that doesn't change behavior wastes context — and over-stuffed global rules push every session toward the [dumb zone](smart-zone.md) before it starts.

## Source Control Is Non-Negotiable

The AI layer is treated like code:

- Lives in `.claude/` (or equivalent for other clients).
- Every change goes through PR review.
- A `CODEOWNERS` entry for `.claude/` so AI-layer changes get the same review rigor as production code.
- Reject AI-layer PRs without a description explaining what failure mode they address.

If the AI layer is not in source control with PR review, it **rots**. After three months: manual edits have drifted, no one knows what's authoritative, the [System Evolution](system-evolution.md) loop quietly stops compounding.

## Why Off-the-Shelf Frameworks Are Wrong for This

Cole's argument against BMAD / GSD / Cloudflow / spec-kit is specifically about the AI layer:

> Off-the-shelf frameworks bake their own AI layer into the team's repo — opinionated end-to-end strategies (research → plan → build → validate) with their own conventions, codified as imported rules and commands.

> Established teams already have processes; the framework's AI layer fights the team's existing one. Adapting either is harder than starting simple.

The conclusion: **start with the simplest possible AI layer (a few rules, a few commands) and let it grow into the team's existing process.** Simplicity is the point — it's the only path to ownership. A bloated imported AI layer is one you don't actually understand and can't evolve.

This is the framework-skepticism counterpart to the [orchestration-layer skepticism](../comparisons/claude-code-orchestration-layers.md) — same instinct, applied to "the procedural code wrapping the agent" rather than "the orchestration code wrapping Claude Code."

## Composition with Other Primitives

The AI layer is one of several extension surfaces for a Claude Code session. The decision map ([Harness Engineering § Extension Decision Map](harness-engineering.md#extension-decision-map-friction-driven)) names them:

| Friction signal | AI layer move | Other-surface move |
|-----------------|---------------|--------------------|
| Convention wrong twice | Add to CLAUDE.md / global rules | — |
| Same prompt every time | New skill or command | — |
| Side task floods context | — | Subagent |
| Subagents need to share findings | — | Agent team |
| Missing external data | — | MCP server |
| Must-happen automatically | — | Hook |
| Second repo needs same setup | — | Plugin |

The AI layer covers the top two rows; subagents, MCP, hooks, and plugins cover the rest. They compose — Cole's `/create-stories` command, for example, uses the [Atlassian MCP server](mcp.md) as its Jira backend.

## How to Apply

1. **Start small.** A short global-rules file (≤10 lines) and 2-3 commands you know you'll use immediately. Resist the temptation to import a friend's `.claude/` wholesale.
2. **Run the 3+ rule.** Track which prompts you repeat. Promote the third repeat into a command before the fourth.
3. **Default to commands, not global rules.** Most repeated prompts belong in commands; only true always-relevant conventions belong in global rules.
4. **PR-review every AI-layer change.** Same rigor as code. `CODEOWNERS` entry for `.claude/`.
5. **Re-audit on every model upgrade.** Each rule encodes an assumption about a prior model. Newer models often handle natively what an older rule explicitly enforced — and over-aggressive rules can over-trigger newer models. See [Harness Engineering § Craft of Subtraction](harness-engineering.md#craft-of-subtraction).

## Anti-Patterns

- **One giant CLAUDE.md as the entire AI layer.** Crowds out task context and rots into a graveyard of stale rules. The OpenAI team called this out explicitly — see [Agentic Coding Workflow § Repo Knowledge Base](../how-tos/agentic-coding-workflow.md#repo-knowledge-base-ryan-lopopolo-openai-—-written-article).
- **Cloning a stranger's `.claude/` wholesale.** You inherit their assumptions; you don't own the layer. Start primitive and grow.
- **Over-stuffed global rules.** Every line is permanent token tax. If a rule isn't behavior-changing on every session, it's a command.
- **Manual edits outside PR review.** The layer rots. The compounding loop dies silently.
- **Skipping AI-layer changes when fixing a bug.** See [System Evolution](system-evolution.md) — code fix without AI-layer fix means the next ticket on the same area regresses.

## Sources

- [Cole Medin — Full Guide to Becoming a Principled Agentic Engineer](../../summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md) — defines the term, the triad, and the 3+ times rule

## Rule Drift: The Maintenance Cost of Being Specific

Medin (Sep 2026) names the failure this page already gestures at ("it **rots**", "a graveyard of stale rules") and gives it a mechanism, a measurement, and a remedy.

**The mechanism is a trade-off, not an accident.** Agents need specificity: you write rules for the agent, not the human, which means naming concrete file paths, commands, and numbers rather than the interpretable high-level guidance a human colleague could work from — "all SQL has to live in the database folder" rather than "we generally keep our database code organised in a sensible way" [02:23]. That specificity is exactly what makes rules perishable. Architecture changes; paths move; the rules do not. So **the property that makes an AI layer effective is the property that makes it decay** — you either pay the upkeep or accept a confused agent.

**Why stale is worse than absent.** A rule that contradicts the codebase does not merely fail to help; it makes the agent spend effort reconciling why its instructions disagree with the code in front of it [03:16].

**The measurement.** Medin cites a study finding **one in four repositories with an AI rules layer has stale rules** [03:27] — references to deleted files and directories, databases that were replaced, folders renamed or moved without the rules following.

**The remedy: a periodic drift audit.** Rather than trusting discipline, run a scheduled check that diffs the rules against the actual codebase and reports discrepancies. Medin ships this as a `rules-check-drift` skill in his skills repository; the pattern matters more than the implementation — it is the AI layer applied to its own maintenance, and it is the natural companion to the [System Evolution](system-evolution.md) loop. *(Source: Cole Medin, 2026-09-01)*

## Related Pages

- [PIV Loop](piv-loop.md) — the inner loop that consumes the AI layer
- [System Evolution](system-evolution.md) — the outer loop that edits the AI layer
- [Agent Skills](agent-skills.md) — the Anthropic-canonical model for the skills layer
- [Claude Code Skills](../how-tos/claude-code-skills.md) — authoring details
- [Harness Engineering](harness-engineering.md) — the broader picture of extension surfaces
- [Smart Zone](smart-zone.md) — why over-stuffed global rules push sessions into the dumb zone
- [Cole Medin](../people/cole-medin.md) — author of the framing
