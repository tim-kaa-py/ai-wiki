---
title: "Karpathy-Inspired Claude Code Guidelines"
source_type: "repo"
channel: "multica-ai"
date: "2026-05-28"
url: "https://github.com/multica-ai/andrej-karpathy-skills"
pillar: "building"
tags: [claude-code, prompt-engineering, agentic-coding-workflow, best-practices, anti-patterns, andrej-karpathy, agent-skills]
ingested: "2026-05-28"
source_file: "sources/repos/2026-05-28_multica-ai_karpathy-coding-guidelines.md"
---

# Karpathy-Inspired Claude Code Guidelines — Summary

**Source:** multica-ai (jiayuan_jy) | 2026-05-28 | [Link](https://github.com/multica-ai/andrej-karpathy-skills) | repo

## TL;DR
A viral (160k stars by May 2026) one-file artifact that crystallizes Andrej Karpathy's X-post diagnosis of LLM coding pitfalls into four operational principles — **Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution** — packaged as a drop-in `CLAUDE.md` (with parallel `CURSOR.md` and `SKILL.md` variants). The unique contribution isn't a novel idea — it's the *naming and packaging*: turning a tweet into copy-pasteable behavioral guardrails.

## Key Concepts

### The four principles
1. **Think Before Coding** — state assumptions, present multiple interpretations, push back when warranted, stop when unclear.
2. **Simplicity First** — minimum code that solves the problem; no speculative abstractions, no defensive error handling for impossible cases, no unrequested "flexibility."
3. **Surgical Changes** — touch only what you must, clean up only your own mess; **every changed line must trace directly to the user's request**.
4. **Goal-Driven Execution** — every task converted into "step → verify: check"; strong criteria let the agent loop independently.

### The pitfall → principle mapping
The repo's framing isn't "be good," it's "here's what LLMs do badly, and here's a rule against each." The diagnosis is the value:
- Wrong assumptions / hidden confusion → *Think Before Coding*
- Overcomplication, bloated abstractions, 1000-line constructions → *Simplicity First*
- Touching orthogonal code, side-effect edits → *Surgical Changes*
- Weak success criteria, can't loop → *Goal-Driven Execution*

### Packaging as three artifacts
Same content, three forms: `CLAUDE.md` (drop in at project root), `CURSOR.md` (Cursor users), `skills/karpathy-guidelines/SKILL.md` (load explicitly when reviewing or refactoring). The skill form is the interesting one — guidelines as an *invokable* artifact instead of always-on system prompt.

## Key Takeaways

1. **The diagnosis is the leverage, not the principles.** Karpathy named what LLMs do badly. Once named, you can write rules against each pitfall instead of writing abstract virtues that don't bind.
   **How to apply:** When tweaking your CLAUDE.md, write rules *across pitfalls*, not virtues. "Don't hide confusion" binds; "be careful" doesn't.

2. **"Think Before Coding" is the highest-leverage rule.** Most LLM coding failures are silent assumption-picks. Mandating that the agent state assumptions, present alternatives, and stop when unclear front-loads the bug catches.
   **How to apply:** Add a *before-implementing* checklist to your CLAUDE.md: state assumptions; present multiple interpretations; push back on overcomplication; stop and ask when unclear.

3. **"Simplicity First" works because it bans categories, not vibes.** The repo lists what NOT to add (features beyond ask, abstractions for single-use code, configurability, defensive error handling for impossible scenarios) — verifiable, not aspirational.
   **How to apply:** Ban categories the agent over-produces. Don't say "be simple"; say "no error handling for impossible scenarios."

4. **"Surgical Changes" has a one-line verifier.** *"Every changed line should trace directly to the user's request."* That's a diff-review rule, not a feeling.
   **How to apply:** Use the trace-back test as the diff-review prompt for any agent that touches existing code.

5. **"Goal-Driven Execution" is the autonomy enabler.** Strong, verifiable criteria let the agent loop independently — weak ones ("make it work") force constant clarification. This is the same lever as in *Stop babysitting your agents*: closed loops require checkable success.
   **How to apply:** Convert every delegated task to "step → verify: check". Especially for `/loop` / Routines work where you won't be checking in.

6. **Skills make the guidelines toggleable.** The `karpathy-guidelines` skill form means you can load these explicitly when reviewing or refactoring, rather than carrying them as always-on system-prompt weight.
   **How to apply:** If your CLAUDE.md is already maxed out, package this set as an opt-in skill instead of merging into project root.

## Notable Commands / Code Snippets
The four principles are themselves the deliverable — drop the `CLAUDE.md` block (or the `SKILL.md`) into a project. No tooling to install; the artifact *is* the install.

## User Notes
The repo's `CLAUDE.md` is **identical, word-for-word**, to my own workspace `CLAUDE.md` at `local_dev/CLAUDE.md` — same headers, same bold taglines, same bullets. I'm already living this content. The wiki value of this source is therefore less the ideas (already operating) and more:
- the **timestamped cultural artifact** (May 2026, 160k stars on a single `CLAUDE.md`),
- the **Karpathy-origin attribution chain** (tweet → quoted in README → operational principles),
- the **skill-packaging idea** (same content as an invokable skill, not just always-on).

## Related Topics
claude-code, prompt-engineering, agentic-coding-workflow, anti-patterns, agent-skills, andrej-karpathy, best-practices
