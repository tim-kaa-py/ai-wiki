---
title: "Agentic OS (AIOS)"
type: "concept"
pillar: "building"
tags: [claude-code, agents, skills, workflow, architecture, loop-engineering, second-brain, obsidian, distribution]
sources:
  - "summaries/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md"
last_updated: "2026-06-29"
---

# Agentic OS (AIOS)

An **agentic OS** is a customized, personal system that bundles loop engineering, skill architecture, state/memory management, and a navigable "second brain" into a coherent construct that works *for* you — runnable on Claude Code, Codex, or even a local model. Chase AI's framing (June 2026): the visible dashboard most people associate with an "AI OS" is "smoke and mirrors" relative to the AI fundamentals running underneath. Both the "wow, pretty buttons" camp and the "it's all hype" camp miss the same thing — the under-the-hood fundamentals that turn a fancy web app into "a customized weapon you can use to attack any problem."

The term is aspirational, not a product. What makes it worth learning is that the core skill — codifying your repeated work and structuring your knowledge so an LLM can navigate it — **transfers to any Claude Code project**, even if you never ship a dashboard.

## The Four Levels

The AIOS is a four-level construct. Crucially, the levels are *not* co-equal in value:

| Level | Name | What it is | Share of value |
|-------|------|-----------|----------------|
| **1** | **Backbone — skills + automation + loop engineering** | Every repeated thing you do in Claude Code is codified into a skill or automation, then promoted to a self-improving loop | ~90% (with L2) |
| **2** | **Memory & state control** | A coherent file/database structure (Obsidian or otherwise) Claude can draw on — a "map" of your knowledge, plus the log store that loops read to self-improve | ~90% (with L1) |
| **3** | **Interface & UI** | A custom visual layer (web app or Obsidian plugin) over levels 1–2, to escape the terminal | "cherry on top" |
| **4** | **Distribution** | Sharing the AIOS so non-technical people get Claude Code's power without running Claude Code | "cherry on top" |

Levels 1–2 carry ~90% of the value and need no UI — they run fine from a plain terminal or the desktop app. Levels 3–4 are a visual wrapper and a distribution channel.

## Thesis: The Value Is Under the Hood

Chase's central argument, stated as a reasoning chain:

> The visible parts of an AIOS (buttons, metrics) are findable nowhere in the terminal, so they grab attention. But they are just an interface over the real engine — codified skills, state, loops. Therefore investing in visuals first is backwards; the transferable, durable value is the under-the-hood fundamentals, which apply to *any* Claude Code project.

Corollary (**"levels 1–2 are 90% of the value"**): if skills + memory/state can be fully exercised from the terminal — they can — and levels 3–4 only add a visual wrapper and distribution, then the UI contributes little marginal *capability*. Allocate time overwhelmingly to codification and state.

This is the same "the flashy layer isn't where the value lives" instinct Chase applies to orchestration frameworks — see [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md), where vanilla Claude Code matches GSD/Superpowers output at a fraction of the cost.

## Level 1 — Backbone: Skills, Automation, Loops

The build order is **workflow audit → skill creation → automation → loop engineering.**

**Workflow audit** asks: what specific outputs do you need repeatedly? Three ways to surface them:
1. **Manual recall** — list them yourself.
2. **History mining** — have Claude Code read your last 10–20 sessions and extract repeated tasks into a chart of *task / desired output / proposed skill*.
3. **Brain-dump interview** — give Claude a stream-of-consciousness dump and have it interview you to surface the repeated work.

The mental model: treat Claude like a new personal assistant you must hand step-by-step instructions.

**From audit to skill:** validate manually *before* codifying — do the task by hand once, confirm it works, then tell Claude "turn what we just did into a skill." It can see the tool calls and back-and-forth from the session. This is the same "start from real failures" discipline in [Agent Skills](agent-skills.md) and Cole Medin's [3+ times rule](ai-layer.md).

**Promote skills → automations → loops:** wrap a validated skill as a scheduled automation (e.g. Claw Desktop → routines → "run this skill" → schedule), then ask whether a self-improvement loop fits the use case. See [Claude Routines](../tools/claude-routines.md) for the automation runtime and [Agent Loops](agent-loops.md) for loop engineering.

## Level 2 — Memory & State as a "Map"

Memory/state is about giving Claude Code a **map** of your knowledge. The framing is explicitly an efficiency/cost lever, not just tidiness:

- A flat folder of millions of un-linked files forces Claude to hunt — which is slow, and **reads more tokens and costs more money**.
- A clear hierarchy with index files lets Claude take "a very clear path" to the right file — faster *and* cheaper.

So good information architecture is a cost lever. The power comes from the **map**, not the specific folders.

### The Karpathy "Obsidian RAG"

Chase points to Karpathy's widely-shared vault structure — a primary vault with `/raw` (unstructured data), `/wiki` (structured, Wikipedia-style articles synthesized from raw), and an outputs folder (deliverables like slide decks). See [LLM Wiki Pattern](llm-wiki-pattern.md) for the full pattern.

Chase's sharpening: the *real* beauty isn't the three folders — it's that **every level has an `index.md`** acting as a table of contents that tells Claude what it's looking at as it descends. "Every new room it enters, there's a clear spot it can go to." The companion rule: **don't cargo-cult the folder names.** Skip `/raw` and `/outputs` if they don't fit you; the only load-bearing requirement is a coherent map with index files unique to your data. Add a `CLAUDE.md` documenting vault conventions plus a navigation pattern ("when looking for X, follow this path").

### Loops Need State (The Second Brain)

Skills and automations need somewhere to **log past runs** so a loop can read prior iterations and improve future ones — a self-improving construct. That logging must live in the same coherent state structure as Level 2. The "second brain" *is* this logged, navigable memory Claude can both reference and improve upon. This is why Levels 1 and 2 are inseparable: the loop is the engine, the state structure is its fuel and its memory.

## Levels 3–4 — Interface and Distribution

### Headless Claude Code (`claude -p`)

Dashboard buttons don't open a visible terminal — they call a **headless** Claude Code instance via `claude -p`, invisibly running a skill or slash command behind the scenes. Same power as the terminal, no window.

```
claude -p   # runs a skill / slash command headless (no visible terminal)
```

**Billing caveat (June 2026):** Anthropic briefly claimed `claude -p` would bill against a $200 API credit rather than the Max subscription, then walked it back; for now it still draws from the Max plan — same as running it in the terminal.

### The Distribution Argument

The "why" of Level 4: ~99% of people are scared off by the terminal and even the desktop app — "a bridge too far." A dashboard reduces using Claude to pressing a button or speaking a voice command, which "spins someone up on Claude Code without spinning them up on Claude Code," raising the floor across a team or client base. Chase distributes via a web app (screenshot a UI you like, hand it to Claude with your skills list + vault connection + desired metrics; ship as a GitHub repo/zip for one-click use) rather than Obsidian. He notes the "dashboard effect" on how non-technical people interpret technical tools "genuinely needs to be studied."

## How to Apply

1. **Spend your time on levels 1–2, not the dashboard.** Before building any UI, audit and codify your repeated workflows into skills.
2. **Run a workflow audit by mining your own history.** Prompt: "Go through our last 10 sessions, pull out repeated tasks that aren't skills yet, and make a chart of task / desired output / proposed skill."
3. **Validate manually, then codify.** Do it by hand once, then "turn what we just did into a skill."
4. **Promote skills to automations, then loops.** Schedule the skill, then add a self-improvement loop where it fits.
5. **Structure your vault as a map, then let Claude design it.** "Look at my vault, propose a structure, use Karpathy's Obsidian RAG for inspiration" — and ensure index files at every level.
6. **Don't cargo-cult folder names.** A coherent map with index files matters; the specific folders don't.

## Related Pages

- [LLM Wiki Pattern](llm-wiki-pattern.md) — the Karpathy raw→wiki→outputs structure that is Level 2's reference architecture
- [Agent Skills](agent-skills.md) — Level 1's core primitive; workflow audit and the 3+ times rule
- [Agent Loops (Loop Engineering)](agent-loops.md) — the self-improving loop that closes Level 1, fed by Level 2 state
- [Agent Memory Systems](agent-memory-systems.md) — storage/injection/recall lens on the Level 2 "map"
- [Claude Routines](../tools/claude-routines.md) — the automation runtime for promoting skills to scheduled/looped jobs
- [Obsidian](../tools/obsidian.md) — the visualization frontend and one substrate for the Level 2 map
- [Andrej Karpathy](../people/andrej-karpathy.md) — originator of the Obsidian RAG vault structure
- [Claude Code Orchestration Layers](../comparisons/claude-code-orchestration-layers.md) — Chase's parallel "the flashy layer isn't the value" benchmark
- [Claude Code](../tools/claude-code.md) — the harness the whole AIOS runs on, including headless `claude -p`
