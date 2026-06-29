---
title: "The Agentic OS Setup That Will 10x Claude Code"
source_type: "youtube"
channel: "Chase AI"
date: "2026-06-25"
url: "https://www.youtube.com/watch?v=HRw-vP0j8OM"
pillar: "building"
tags: [claude-code, agents, skills, workflow, architecture]
ingested: "2026-06-29"
source_file: "sources/youtube/2026-06-25_chase-ai_agentic-os-setup-10x-claude-code.md"
---

# The Agentic OS Setup That Will 10x Claude Code — Summary

**Source:** Chase AI | 2026-06-25 | [Link](https://www.youtube.com/watch?v=HRw-vP0j8OM) | 31:20

## TL;DR
An "agentic OS" (AIOS) is not a Jarvis dashboard — it's a four-level construct whose value lives entirely under the hood. The bottom two levels (codified skills + automations, and a coherent memory/file structure that gives Claude a "map") carry ~90% of the value and can be run from a plain terminal; the top two (custom UI, distribution to non-technical people) are just a visual wrapper. The core skill — codifying your repeated work and structuring your knowledge so an LLM can navigate it — transfers to any Claude Code project, which is why the concept matters more than any specific build.

## Video Structure
1. [00:00-03:38] Framing — the value is under the hood (loop engineering, skills, state, second brain), not the dashboard; the four levels introduced
2. [03:38-04:26] Sponsor break (own course)
3. [04:26-13:11] Level 1 — Skill architecture & loop engineering (workflow audit → skill creation → automation → loops)
4. [13:11-23:07] Level 2 — Memory & state control (Obsidian, file structure, the "map," the Karpathy RAG, index.md)
5. [23:24-27:13] Level 3 — Interface & UI (web app / Obsidian command center as a visual wrapper)
6. [27:13-28:24] Under the hood — headless Claude Code via `claude -p` and the billing drama
7. [28:24-31:20] Level 4 — Distribution & the non-technical population argument; recap

## Key Concepts

### Agentic OS (AIOS)
A customized product that bundles loop engineering, skill architecture, state management, and a "second brain" into a coherent system that works for you — runnable on Claude Code, Codex, or even a local model. The creator's strong framing: the visible dashboard is "smoke and mirrors" relative to the AI fundamentals running underneath. Both the "wow, pretty buttons" camp and the "it's all hype" camp miss the same thing — the under-the-hood fundamentals that turn a fancy web app into "a customized weapon you can use to attack any problem."

### The Four Levels
1. **Backbone — skills + loop engineering:** every repeated thing you do in Claude Code is codified into a skill or automation.
2. **Memory & state control:** a database/file structure (Obsidian or otherwise) Claude can draw on, combined with skills to build self-improving loops.
3. **Interface & UI:** a custom visual layer (web app or Obsidian plugin) over levels 1–2, to escape the terminal.
4. **Distribution:** sharing the AIOS with team/clients so non-technical people get Claude Code's power without running Claude Code.

Levels 1–2 are ~90% of the value and need no UI; levels 3–4 are "the cherry on top."

### Level 1 sub-phases
Workflow audit → skill creation → automation → loop engineering. The **workflow audit** asks: what specific outputs do you need repeatedly? Three ways to surface them: (1) manual recall, (2) have Claude Code read your last 10–20 sessions and extract repeated tasks into a chart, (3) have Claude Code interview you from a stream-of-consciousness brain-dump. The mental model: treat Claude like a new personal assistant you must hand step-by-step instructions.

### The "map" mental model (Level 2)
Memory/state is about giving Claude Code a **map** of your knowledge. A flat folder with millions of un-linked files forces Claude to hunt — slow, and crucially **more tokens and more money**. A clear hierarchy with index files lets Claude take "a very clear path" to the right file. The efficiency framing is explicit: a good map is faster *and* cheaper, not just tidier.

### The Karpathy "Obsidian RAG"
A widely-shared (20M+ views) structure: a primary vault with three subfolders — `/raw` (unstructured data), `/wiki` (structured, Wikipedia-style articles synthesized from raw), and an outputs folder (deliverables like slide decks). The creator's key point: the *real* beauty isn't the three folders — it's that **every level has an `index.md`** acting as a table of contents telling Claude what it's looking at as it descends. "Every new room it enters, there's a clear spot it can go to."

### Loop engineering / second brain
Skills and automations need somewhere to log past runs so a loop can read prior iterations and improve future ones — a self-improving construct. This logging must live in the same coherent state structure as level 2. The "second brain" is this logged, navigable memory Claude can both reference and improve upon.

### Headless Claude Code (`claude -p`)
Dashboard buttons don't open a visible terminal — they call a **headless** Claude Code instance via the `claude -p` command, invisibly running a skill or slash command behind the scenes. Same power as the terminal, no window.

## Key Takeaways
1. **Spend your time on levels 1–2, not the dashboard.** They are 90% of the value and run fine in a plain terminal. **How to apply:** Before building any UI, audit and codify your repeated workflows into skills.
2. **Run a workflow audit by mining your own history.** **How to apply:** Prompt Claude Code: "Go through our last 10 sessions, pull out repeated tasks that aren't skills yet, and make a chart of task / desired output / proposed skill." Then use the skill-creator skill on the validated ones.
3. **Validate manually before codifying.** **How to apply:** Do the task by hand once, confirm it works, then tell Claude "turn what we just did into a skill" — it can see the tool calls and back-and-forth from the session.
4. **Promote skills to automations, then loops.** **How to apply:** In Claw Desktop → routines → name it → instruction "run [skill]" → set a schedule. Then ask whether a self-improvement loop fits this use case.
5. **Structure your vault as a map, then let Claude design it.** **How to apply:** Tell Claude "look at my vault, propose a structure, use Karpathy's Obsidian RAG for inspiration," and add a `claude.md` documenting vault conventions + a navigation pattern ("when looking for X, follow this path").
6. **Don't cargo-cult the folder names.** **How to apply:** Skip `/raw` and `/outputs` if they don't fit you; just ensure a coherent map with index files unique to your data.
7. **Distribute via the web app, not Obsidian.** **How to apply:** Screenshot a UI you like, hand it to Claude with your skills list + vault connection + desired metrics; ship it as a GitHub repo/zip for one-click use by non-technical teammates.

## Argument Structures

**"The value is under the hood, not the dashboard."**
Premise: the visible parts of an AIOS (buttons, metrics) are findable nowhere in the terminal, so they grab attention. Premise: but they are just an interface over the real engine — codified skills, state, loops. Conclusion: investing in visuals first is backwards; the transferable, durable value is the under-the-hood fundamentals, which apply to *any* Claude Code project. Therefore learning to build an AIOS is worth it even if you never ship a dashboard.

**"Levels 1–2 are 90% of the value."**
If skills + memory/state can be fully exercised from the terminal or desktop app (they can), and levels 3–4 only add a visual wrapper and distribution, then the UI contributes little marginal capability. Therefore time should be allocated overwhelmingly to codification and state, and levels 3–4 are "cherry on top."

**The map = cost argument.**
If Claude must search an unstructured pile, it reads more, which costs more tokens and money and is slower. If a hierarchy + index.md files give it a direct path, it reads less. Therefore good information architecture is an efficiency and cost lever, not mere tidiness — the power comes from the map, not the specific folders.

**The non-technical-population argument (the "why" of Level 4).**
Premise: ~99% of people are scared off by the terminal and even the desktop app — "a bridge too far." Premise: a dashboard reduces using Claude to pressing a button or speaking a voice command. Conclusion: wrapping skills as buttons "spins someone up on Claude Code without spinning them up on Claude Code," raising the floor across a team/client base. The creator notes the "dashboard effect" on how non-technical people interpret technical tools "genuinely needs to be studied."

## Notable Commands / Code Snippets

Headless invocation behind dashboard buttons:
```
claude -p   # runs a skill / slash command headless (no visible terminal)
```
Billing caveat: Anthropic briefly claimed `claude -p` would bill against a $200 API credit rather than the Max subscription; they walked it back, so for now it still draws from the Max plan — same as running it in the terminal.

Claw Desktop automation recipe (Level 1):
```
Routines → New → name: "auto-1"
Instruction: "run this skill: <skill-name>"
Schedule: <cron/interval>
→ optionally wrap with a self-improvement loop
```

## User Notes
Focus is the **whole concept of an agentic OS** — what it is, why it matters, and how the four levels cohere into a system — rather than a click-by-click build. The load-bearing ideas: value lives under the hood; levels 1–2 (codified skills + a navigable "map" of state) are 90% of it and need no dashboard; the map is an efficiency/cost lever; the Karpathy folders are arbitrary and the only thing that matters is a coherent, personal map with index files; and level 4's real justification is reaching the 99% who won't touch a terminal.

## Related Topics
claude-code, agents, skills, workflow, architecture, loop-engineering, second-brain, obsidian, rag, automation, distribution
