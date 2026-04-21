---
title: "Claude Design"
type: "tool"
pillar: "building"
tags: [claude-design, claude-code, front-end, design-system, workflow, ui]
sources:
  - "summaries/2026-04-20_chase-ai_only-claude-design-guide-you-should-watch.md"
  - "summaries/2026-04-18_jono-catliff_how-i-built-insane-claude-design-websites-in-10-minutes.md"
last_updated: "2026-04-21"
---

# Claude Design

Anthropic's browser-based front-end generator, available at **claude.ai/design**. Renders landing pages, slide decks, and UI layouts from natural-language prompts, with a tweak/variant workflow that makes iteration dramatically faster than prompt-looping in Claude Code.

## What It Is

Claude Design is the design counterpart to Claude Code. You prompt it for a UI artifact (page, deck, component set); it renders the result live in the browser. Unlike Claude Code, which re-generates from a blank state on every prompt, Claude Design keeps the rendered artifact around and lets you modify it in place via *tweaks* and fork it via *variants*. Full HTML is exportable — it is not a black box.

## Key Features

### Design Systems
Persistent project-level artifacts defining typography, color, spacing, components, and visual language. Unlike the "design system = Figma library" framing, here the design system is a living prompt context the model reuses on every subsequent page generation.

- Build it **first**, before any page.
- Expect it to cost **~20–25% of daily usage** — meaningful, but amortized across every page you render afterward.

### Tweaks
Natural-language precision edits applied to an already-rendered page ("make the hero bigger", "swap the CTA to the right"). Unlike re-prompting, tweaks preserve the rest of the page. This is the core reason Claude Design beats Claude Code for iteration speed — the page is already there, you nudge it.

- Demo cost: **~7% usage** for a round of tweaks.
- Invoked inside **edit mode** (the page-editing surface).

### Variants
Parallel alternative renders of the same page — e.g. two different landing-page treatments side by side. Your branching mechanism for exploring design directions.

- Demo cost: **~5% usage** for 2 variants.
- Behaves importantly differently from tweaks when combined (see Pitfalls).

### Edit Mode
The page-editing surface where tweaks are applied. Tweaks are the verb; edit mode is the place where the verb is invoked.

### Plan Mode (prompt pattern)
A **prompting trick** for steering longer generations (especially slide decks): ask Claude Design to *plan* the artifact first, review/adjust the plan, then execute. Same spirit as Claude Code's Plan Mode but implemented as a prompt pattern, not a distinct UI mode.

- Demo cost: **~5% usage** for a full slide deck generated this way.

### Export
Not a black box. Built-in export options:
- **PowerPoint**, **PDF**, **Canva** — for deck / document handoff
- **HTML** — full source, portable to any stack
- **Claude Code** — direct handoff for production build-out (routing, state, backend wiring)

#### Export → Claude Code → Deploy Pipeline (Jono Catliff)

The concrete one-shot pattern from prototype to live site:

1. **Prepare a `CLAUDE.md` at the project root before the handoff.** Reliability of the one-shot build depends on project-specific standing instructions. Without it you get generic scaffolding.
2. **Paste the Export → Handoff to Claude Code** command into Claude Code, then **append a one-shot build prompt naming Next.js + GSAP + CLAUDE.md:**
   > *"Build this Claude Design website using Next.js, and use GSAP to add animations wherever appropriate… read the CLAUDE.md file and build this out in one go."*
   Naming the framework and animation library up front avoids multi-turn churn; GSAP alone is enough to get scroll-triggered, fly-in, counter, and slider animations wired on the first pass.
3. **Expand animations later** by referencing demos at **demos.greensock.com** — prompt-ready catalog of effects.
4. **Let Claude Code push to GitHub.** Create an empty repo in the browser, then: *"Upload all the code in this project to GitHub — deploy it all in one go."* No manual `git` commands.
5. **Vercel import.** Add New Project → Import from GitHub → **set Framework Preset to Next.js** (the only non-default field; auto-detect is the common failure mode). Deploy.
6. **Custom domain** via Vercel Domains tab (GoDaddy/Namecheap/buy-through-Vercel) before any client-facing use.

*(Source: Jono Catliff — scoped to the export-to-deploy portion; the earlier design walkthrough in that video is covered better by Chase AI above.)*

## Recommended Workflow

1. **Design system first.** First prompt in a new project builds typography, palette, components. Not a page.
2. **Generate the page** against the design system.
3. **Branch into variants BEFORE tweaking.** Render 2+ variants immediately.
4. **Tweak each variant in isolation.** Keep tweaks scoped — don't ask for "apply this tweak to all variants" (see Pitfalls).
5. **Export the winning variant** as HTML.
6. **Hand off to Claude Code** for production build-out (routing, state management, backend integration, deploy).

The rule of thumb: use Claude Design to get to ~90% of the final look; use Claude Code for the last-mile engineering.

## Mobile Workflow

Do **not** tweak the desktop page into a responsive one — that bleeds tweaks across variants and burns usage.

**Instead:** duplicate the project (UI action), then generate mobile variants in the copy. Desktop stays intact, mobile iterates independently. Demo cost: ~5% usage.

## Claude Design vs Claude Code

| | Claude Design | Claude Code |
|---|---|---|
| Surface | Browser (claude.ai/design) | Terminal / IDE |
| Output | Rendered UI artifact | Code files |
| Iteration | Tweaks on a live render | Re-prompt from blank state |
| One-shot quality | Comparable to Claude Code | Comparable to Claude Design |
| Speed to ~90% | **Fast** — tweaks are scoped | Slower — re-generations are full |
| Production wiring | Weak (design-focused) | **Strong** (full-stack) |
| Best for | Landing pages, decks, UI exploration | Engineering, state, backend, deploy |

**The non-obvious point:** Chase AI's argument is that Claude Design's win over Claude Code is **not** one-shot output quality — those are comparable. The win is iteration speed on an already-rendered page. See [Claude Code](claude-code.md) for the companion tool.

## Model Choice

Use **Opus 4.7** for design work, not Sonnet. Chase AI's claim: the design-quality gap is large enough to justify the higher per-call cost, because "looks right" is not a mechanical task.

## Pitfalls

### Usage Burn
Claude Design is a usage trap if you're careless. Rough demo budget from Chase AI:

| Action | % of daily usage |
|---|---|
| Design system build | 20–25% |
| One landing page | ~4% |
| Round of tweaks | ~7% |
| 2 variants | ~5% |
| Slide deck (with plan mode) | ~5% |
| Mobile variants (in duplicated project) | ~5% |

A single careless "apply this tweak across all 3 variants" can **silently double your bill** — each variant re-generates to absorb the tweak.

### Tweaks Don't Propagate Across Variants
Tweaks are scoped to the variant you invoke them on. If you **tweak first, then branch to variants**, only one variant inherits the tweak. The others fork off a pre-tweak base. This is why the recommended order is variants-first, tweaks-second.

### Tweak-All-Variants Trap
Asking Claude Design to apply a tweak across N existing variants causes N full regenerations. The fastest way to burn daily usage. Tweak each variant manually instead.

### Design System Cost
~20–25% of daily usage on the design-system build alone. Budget before starting; don't assume you have a full day of iteration left afterward.

## Why Variants-First, Tweaks-Second

The argument (Chase AI):

- **Observation:** Tweaks by default apply to the *original* page, not to variants derived from it.
- **Tweak-first path:** Tweak original → branch to variants. Only one variant inherits the tweak; others fork off the pre-tweak base. Divergent outcomes, hard to reason about.
- **Variant-first path:** Branch to variants → tweak each one. Each tweak is scoped and cheap; variants evolve independently as intended.
- **Apply-to-all path (the trap):** Variants exist, ask for "apply X to all". Each variant re-generates. N× the cost per tweak.
- **Conclusion:** Variants first, then tweak each one in isolation. Matches the model's default scoping; keeps usage linear instead of multiplicative.

## Related Pages

- [Claude Code](claude-code.md) — the companion tool for production build-out after Claude Design export
