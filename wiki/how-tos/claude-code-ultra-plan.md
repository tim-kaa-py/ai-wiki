---
title: "Claude Code Ultra Plan"
type: "how-to"
pillar: "building"
tags: [claude-code, planning, agents, workflow, multi-agent, opus-4-6, cloud-compute, how-to]
sources:
  - "summaries/2026-04-06_nate-herk_planning-in-claude-code-just-got-a-huge-upgrade.md"
  - "summaries/2026-04-24_anthropic_claude-code-ultraplan-official-documentation.md"
last_updated: "2026-04-24"
---

# Claude Code Ultra Plan

Ultra Plan (officially **"ultraplan"** in Anthropic's docs — one word, lowercase) is a Claude Code feature that offloads the planning phase to Anthropic's cloud container runtime. The planner runs **Opus 4.6** with a multi-agent architecture (three parallel exploration agents plus one critique agent), and the approved plan is either executed in the cloud or **teleported back to the local terminal** for implementation.

**Prerequisites (official):** Claude Code v2.1.91+, a GitHub-synced repo, and a Claude Code on the web account. Research preview feature.

In Nate Herk's side-by-side dashboard-build test, Ultra Plan planned in ~1 min vs 4+ min for regular plan mode, and the full build-out took ~10–15 min vs ~45 min. Same executor model both runs — the speedup is attributed to plan quality.

## How to Invoke

Three official entry points:

```
/ultraplan <your prompt>          # explicit command
```

Or include the keyword **"ultraplan"** (or "ultra plan") anywhere in a normal prompt; the CLI highlights it and offers to run the planner in the cloud.

Or, from a local plan-mode approval dialog, choose **"No, refine with Ultraplan"** to escalate a draft plan into the cloud planner.

## Monitoring & Status Indicators

While the cloud session works, the CLI shows one of three states:

| Indicator | Meaning |
|-----------|---------|
| `◇ ultraplan` | Researching codebase, drafting plan |
| `◇ ultraplan needs your input` | Claude has a clarifying question — answer in the browser |
| `◆ ultraplan ready` | Plan is ready for review |

Use `/tasks` to see session link and agent activity details, or to **stop an ultraplan run** (archives the cloud session and clears the indicator).

## Constraints / Prerequisites

| Constraint | Detail |
|------------|--------|
| **CLI only** | Typing "ultra plan" in the Claude Desktop app or the VS Code extension silently does nothing. Run it from a terminal session. |
| **Git-synced repo required** | The cloud planner pulls the project to reason over it. Local-only projects are rejected. `git init` + push to a remote before invoking. |
| **Pro/Max subscription** | API billing is rejected. One run of Nate's dashboard plan consumed ~1% of a Max 20x allotment. |
| **Research preview** | Intermittent auth errors; expect rough edges. |

## What Happens Under the Hood

- Anthropic-hosted container runtime running Opus 4.6
- **Three parallel exploration agents + one critique agent**
- 30-minute compute cap per planning session
- Local terminal session stays **unblocked** during cloud planning — you can keep chatting with it

## Review Surface

Plans open in the Claude Code web UI (not the terminal). Official interaction model:

- **Inline comments** — highlight a passage and leave feedback for Claude to address
- **Emoji reactions** — quick approval/concern signal without writing a full comment
- **Outline sidebar** — jump between plan sections
- Doc-style layout with tabs and auto-generated diagrams

Iterate as many times as needed — ask Claude to revise, review the updated draft, repeat.

## Execution Modes

When the plan is approved, choose where to execute:

- **Execute on the web** — Claude implements the plan in the cloud session and creates a PR from the web interface. Best when you don't need local tooling.
- **Teleport back to terminal** — send the plan to a waiting CLI for local execution with full environment access. Three sub-options when it lands:
  - **Implement here** — inject the plan into the current CLI conversation (continuous context)
  - **Start new session** — clean-slate execution (Nate's preference; see below)
  - **Cancel / save to file** — save the plan to a file for later

## Gotcha: Custom Skills Not Auto-Invoked

Even though the cloud planner sees the whole repo, it may pick generic approaches (e.g. mermaid in markdown) instead of your custom skills. Nate hit this with a `visualizations` skill.

**Fix:** name the skill explicitly in the prompt or in a web-review comment — "use my `visualizations` skill" — rather than hoping the planner discovers it.

## When to Use (vs Regular Plan Mode)

| Scenario | Choose |
|----------|--------|
| Non-trivial build; you want the best plan money can buy | **Ultra Plan** |
| Plan needs iteration via specific inline comments | **Ultra Plan** (web UI beats terminal for this) |
| On API billing only | Regular plan mode (Ultra Plan is rejected) |
| Small/trivial change, one-line fix | Regular plan mode or skip plan entirely |
| Working from Desktop/VS Code extension | Regular plan mode (Ultra Plan silently no-ops) |
| No remote repo for this project | Regular plan mode |

## Workflow Tip (Nate's Preference)

Because the terminal stays unblocked during cloud planning, Nate spins up a **fresh session** to execute the plan when it teleports back — keeping the executing context clean rather than carrying the full planning dialog into implementation.

## Connection to the Boris vs Ryan Plan-Mode Debate

See [Agentic Coding Workflow § Plan-Mode Skepticism](agentic-coding-workflow.md#plan-mode-skepticism-ryan-lopopolo-openai). Ultra Plan strengthens Boris Cherny's "start every session in Plan mode" stance by making planning cheaper-in-wall-clock and materially higher-quality. It does not answer Ryan Lopopolo's critique — that approving a plan you didn't read line-by-line encodes unwanted instructions — since Ultra Plan still surfaces a long doc. The web review UI (per-section comments, tabs) does make line-by-line review more tractable than a terminal scroll.

## Related Pages

- [Claude Code](../tools/claude-code.md)
- [Agentic Coding Workflow](agentic-coding-workflow.md)
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — Ultra Plan's 3-explorers + 1-critique is another orchestrator-worker instance
