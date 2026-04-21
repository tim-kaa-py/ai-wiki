---
title: "How I Built INSANE Claude Design Websites In 10 Minutes"
source_type: "youtube"
channel: "Jono Catliff"
date: "2026-04-18"
url: "https://m.youtube.com/watch?v=xYv4_cTOSNM"
pillar: "building"
tags: [claude-design, claude-code, nextjs, gsap, vercel, deployment, handoff]
ingested: "2026-04-21"
source_file: "sources/youtube/2026-04-18_jono-catliff_how-i-built-insane-claude-design-websites-in-10-minutes.md"
---

# How I Built INSANE Claude Design Websites In 10 Minutes — Summary

**Source:** Jono Catliff | 2026-04-18 | [Link](https://m.youtube.com/watch?v=xYv4_cTOSNM) | 16:28

## Scope Note
This summary intentionally covers **only the export → Claude Code → deploy portion** of the video ([07:33-16:28]). The earlier Claude Design walkthrough (design systems, prototype creation, in-design edits, motion graphics) is a mediocre beginner-friendly intro and is better covered by the Chase AI summary. Skipping it here.

## TL;DR
Once a Claude Design prototype is ready, the handoff-to-deploy path is: export → paste command into Claude Code → append a one-shot build prompt that names Next.js + GSAP and references a prepared CLAUDE.md → let Claude Code push to GitHub → import to Vercel with Next.js preset. Notable: naming GSAP in the prompt is enough to get scroll/fly-in animations wired on the first pass.

## Video Structure (scoped)
1. [07:33-08:30] (skipped — Claude Design motion graphics aside)
2. [08:30-09:43] Export & Claude Code crash course — VS Code / Google Antigravity, install Claude Code extension
3. [09:43-10:58] Paste handoff command, append build prompt naming Next.js + GSAP + CLAUDE.md
4. [10:58-11:57] CLAUDE.md as the "instruction manual" the one-shot build depends on
5. [11:57-13:20] Result review — GSAP animations in place; more effects available at demos.greensock.com
6. [13:20-15:24] Deployment — Claude Code pushes to a new GitHub repo → Vercel import with Next.js preset
7. [15:24-15:59] Custom domain via Vercel Domains tab (GoDaddy/Namecheap/buy-through-Vercel)

## Key Concepts

### Handoff to Claude Code
Claude Design's **Export → Handoff to Claude Code** emits a shell/CLI command you paste into Claude Code. That command carries the prototype's context; Claude Code then rebuilds it as a real codebase. This is the only bridge from a Claude Design prototype (non-deployable) to a production site.

### CLAUDE.md as instruction manual
A markdown file placed at the project root that Claude Code reads as standing instructions for the project — framed as an "employee handbook." The one-shot build's reliability depends on it; without a project-specific CLAUDE.md you get generic scaffolding. Jono distributes a `claude.md web app` template via his community.

### GSAP animations
GreenSock Animation Platform — a JS animation library. Naming GSAP in the build prompt is sufficient for Claude Code to wire in scroll-triggered, fly-in, counter, and slider animations. New effects can be added later by referencing demos.greensock.com and asking Claude to replicate them.

### GitHub + Vercel deployment
Two-step free pipeline: Claude Code pushes the project to a fresh GitHub repo → Vercel imports the repo, framework preset set to Next.js → deploy. Custom domains are added later via Vercel's Domains tab.

## Key Takeaways
1. **Prepare a CLAUDE.md before the handoff.** The one-shot build's reliability depends on Claude Code having project-specific standing instructions.
   - **How to apply:** Drop a `CLAUDE.md` at the project root before running the handoff command. End the build prompt with "read the CLAUDE.md file and build this out in one go."
2. **One-shot the build by naming Next.js + GSAP in the prompt.** Naming the framework and animation library up front avoids multi-turn churn and gets animations wired on the first pass.
   - **How to apply:** After pasting the Claude Design handoff command, append: *"build this Claude Design website using Next.js, use GSAP to add animations wherever appropriate… read the CLAUDE.md file and build this out in one go."*
3. **Let Claude Code do the GitHub push.** No manual `git` commands — Claude Code creates and deploys to a fresh repo from a single instruction.
   - **How to apply:** Create the empty GitHub repo in the browser, then tell Claude Code: *"upload all the code in this project to GitHub — deploy it all in one go."*
4. **In Vercel, the only non-default setting is the framework preset.** Leaving auto-detect is the common failure mode for Next.js projects.
   - **How to apply:** Vercel → Add New Project → Import from GitHub → set Framework Preset to **Next.js** → Deploy. Swap the `*.vercel.app` subdomain for a real domain via Domains tab before any client-facing use.
5. **Expand animations by referencing greensock demos.** The GSAP demo gallery is a prompt-ready catalog of effects.
   - **How to apply:** Browse demos.greensock.com, link or describe the effect in Claude Code, and let it patch the page.

## Notable Commands / Code Snippets

**The build prompt appended to the Claude Design handoff command:**
```
Can you please build this Claude Design website using Next.js, and can you
use the library GSAP to be able to add animations to the page wherever
appropriate? I want to add as many beautiful stunning animations as possible
without it looking cheesy. And I want you to read the CLAUDE.md file and
build this out in one go.
```

**The GitHub upload prompt:**
```
Can you please upload all the code in this project to GitHub? Make sure to
deploy it all in one go.
```

**Vercel deploy settings:** Framework Preset = Next.js (the only field to change).

## User Notes
User explicitly narrowed scope: the early Claude Design walkthrough is a mediocre beginner intro already covered better elsewhere (Chase AI). Only the export-to-deploy portion captured here.

## Related Topics
claude-design, claude-code, nextjs, gsap, vercel, github, deployment, handoff, claude-md
