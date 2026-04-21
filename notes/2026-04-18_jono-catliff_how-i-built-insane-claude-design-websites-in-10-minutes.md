# Ingest Notes

**Source:** [How I Built INSANE Claude Design Websites In 10 Minutes](https://m.youtube.com/watch?v=xYv4_cTOSNM)

## User Focus
Narrow scope: the user judged the early Claude Design walkthrough (design systems, prototype creation, in-design edits, motion graphics) to be a mediocre beginner intro and chose to ingest only the **export → Claude Code → deploy** portion [07:33-16:28]. The rest will be extracted from a better source.

## Confirmed Discoveries (scoped)
- [08:30-09:43] Export → Handoff to Claude Code emits a paste-in command; VS Code / Antigravity + Claude Code extension setup
- [09:43-10:58] One-shot build prompt naming Next.js + GSAP + reading CLAUDE.md
- [10:58-11:57] CLAUDE.md framed as "instruction manual / employee handbook" — required for reliable one-shot
- [11:57-13:20] GSAP wiring happens automatically when named in prompt; demos.greensock.com as effect catalog
- [13:20-15:24] Deploy: Claude Code pushes to GitHub repo → Vercel import, only non-default is Next.js preset
- [15:24-15:59] Custom domain via Vercel Domains (GoDaddy/Namecheap/buy)
