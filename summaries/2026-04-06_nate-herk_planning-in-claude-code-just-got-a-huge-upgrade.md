---
title: "Planning In Claude Code Just Got a Huge Upgrade"
source_type: "youtube"
channel: "Nate Herk | AI Automation"
date: "2026-04-06"
url: "https://www.youtube.com/watch?v=T4fXb3sbJIo"
pillar: "building"
tags: [claude-code, agents, workflow, planning, how-to]
ingested: "2026-04-24"
source_file: "sources/youtube/2026-04-06_nate-herk_planning-in-claude-code-just-got-a-huge-upgrade.md"
---

# Planning In Claude Code Just Got a Huge Upgrade — Summary

**Source:** Nate Herk | AI Automation | 2026-04-06 | [Link](https://www.youtube.com/watch?v=T4fXb3sbJIo) | 15:48

## TL;DR
Ultra Plan is a new Claude Code feature that offloads planning to a cloud-hosted multi-agent system (Opus 4.6, three parallel explorers + one critique agent) and teleports the approved plan back to the terminal. In Nate's head-to-head, ultra plan finished planning in ~1 minute vs 4+ minutes locally, and the full build-out took ~10–15 min vs ~45 min — the better plan apparently makes downstream execution faster too. Key gotchas: CLI only, requires a Git-synced repo, Pro/Max subscription (no API billing), and custom skills often need to be named explicitly.

## Video Structure
1. [00:00-02:15] Live side-by-side demo — Ultra plan finishes in 1 min while regular plan is still running at 4+ min; web review UI with tabs, diagrams, emoji reactions, comments.
2. [02:15-03:29] How to invoke — `/ultra plan` or just the keyword "ultra plan" lights up like "ultra think"; more tokens up front, Lincoln axe-sharpening quote.
3. [03:29-04:00] CLI-only constraint — desktop app and VS Code extension silently do nothing.
4. [04:00-04:43] Architecture overview — local CLI → cloud agents (Opus) → web review loop → teleport back or execute remotely.
5. [04:43-09:25] Dashboard build experiment — same prompt to both; ultra plan total ~10–15 min, local plan ~45 min; 82k vs 131k local tokens (cloud tokens not counted).
6. [09:26-10:25] Billing experiment — API billing rejected; one run ≈ 1% of Max 20x allotment.
7. [10:26-11:01] Git requirement — project must be pushed to a repo, otherwise rejected.
8. [11:01-12:30] Skills gotcha — custom skills aren't always auto-invoked; had to name "visualizations" skill explicitly via comment.
9. [12:30-14:23] Under-the-hood deep dive — Opus 4.6 in Anthropic cloud container runtime, 3 parallel explorers + 1 critique agent, 30-min cap, terminal stays unblocked.
10. [14:23-15:48] Caveats — research preview, intermittent auth errors, open questions about how the parallel agents are differentiated.

## Key Concepts

### Ultra Plan
A Claude Code feature that offloads the planning phase to Anthropic's cloud container runtime. The cloud session runs Opus 4.6 with a multi-agent architecture (three parallel exploration agents plus one critique agent). The user drafts the plan in the CLI, reviews it on Claude Code on the web (doc-style UI with tabs, diagrams, emoji reactions, inline comments), then either executes it in the cloud or teleports it back to the local terminal for implementation. Invocation: `/ultra plan <prompt>` or any prompt containing the phrase "ultra plan" (it lights up like `ultra think`).

### Local (regular) Plan Mode
The default in-terminal plan mode. Single agent, linear thinking, runs inside the user's session on whatever model is active. Review happens as text dialogue in the terminal (or as a doc in the VS Code extension). The terminal is blocked while planning is in progress. Compute is bounded by the local session's context/time.

### Multi-agent cloud architecture
Nate's agent-driven deep dive reports: ultra plan spins up **three parallel exploration agents plus one critique agent** on a cloud container running Opus 4.6. Max compute is capped at 30 minutes. Because planning happens in the cloud, the local terminal session stays unblocked and you can keep chatting with it while the plan is being drafted.

## Key Takeaways
1. **Better upfront planning compounds into faster execution.** In the dashboard experiment, ultra plan took ~5 min to plan + ~5–10 min to build (~10–15 min total) vs ~15 min to plan + ~30 min to build (~45 min total) for local plan — same prompt, same model for execution.
   - **How to apply:** For non-trivial builds, reach for `/ultra plan` instead of regular plan mode; pay the extra tokens up front.
2. **Ultra plan is CLI only.** Typing "ultra plan" in the Claude Desktop app or the VS Code extension silently does nothing.
   - **How to apply:** Run ultra plan from a terminal session, not from an IDE extension or desktop chat.
3. **Requires a Git/GitHub-synced repo.** The cloud agent needs to pull the project to reason over it; local-only projects are rejected.
   - **How to apply:** `git init` + push to a remote before invoking ultra plan on a new project.
4. **Pro/Max subscription required — no API billing.** One run of Nate's dashboard plan consumed about 1% of a Max 20x allotment.
   - **How to apply:** If you're on API billing only, don't plan around ultra plan; use local plan mode.
5. **Custom skills are not always auto-invoked by the cloud planner.** Even though the cloud agent can see the whole repo, it may pick generic approaches (e.g. markdown mermaid) instead of your visualization skill.
   - **How to apply:** Name the skill explicitly in your prompt or in a web-review comment ("use my `visualizations` skill") rather than hoping it discovers it.
6. **The terminal stays unblocked during ultra plan.** Unlike local plan mode which blocks the session, you can keep using the terminal while the cloud plans.
   - **How to apply:** Use the wait time to prep the next task, or (Nate's preference) spin up a fresh session so the executing context stays clean when the plan teleports back.
7. **The web review surface beats the terminal for targeted feedback.** Doc-style layout with tabs, auto-generated diagrams, per-section comments, and emoji reactions.
   - **How to apply:** When a plan needs iteration with specific inline comments, ultra plan; when a plan is trivial, regular plan mode's terminal dialogue is fine.

## Argument Structures

**Nate's core claim: better planning → faster execution, even net of extra planning tokens.**

- Premise 1: Ultra plan uses more tokens than local plan (three parallel explorers + critique agent on Opus 4.6 in the cloud; local used 131k tokens vs ultra plan's 82k local tokens, but cloud planning tokens are additional and unmetered-to-user).
- Premise 2: Despite the extra planning cost, observed total wall-clock time was dramatically lower (~10–15 min vs ~45 min on the dashboard experiment; execution alone was ~10 min vs ~30 min).
- Premise 3: Both runs used the same model for execution, so the speed-up isn't from a better executor.
- Sub-conclusion: The cause must be plan quality — a clearer, more structured plan means the local executor has less ambiguity to resolve and fewer wrong turns.
- Supporting analogy: Lincoln's "give me 6 hours to chop down a tree, I'll spend four sharpening the axe."
- Conclusion: Spending more tokens up front on planning is worth it when the downstream execution is both faster *and* higher quality.

**Caveat Nate flags:** Aesthetic comparison of the two dashboards was a wash — the quality gap is hard to see from the outside without deeper testing (data accuracy, load speed, bugginess).

## Notable Commands / Code Snippets

```
/ultra plan <your prompt>
```
Or include the phrase "ultra plan" anywhere in the prompt — the CLI highlights it and asks whether to run in the cloud.

```bash
# Prerequisite for any new project you want to ultra plan
git init
git remote add origin <repo-url>
git push -u origin main
```

## User Notes
- Primary interest: the Ultra Plan vs regular plan mode comparison — confirmed that the win is meaningful for non-trivial builds, mainly via better execution downstream.
- Operational gotchas to remember before reaching for it: CLI only, Git-synced repo required, no API billing (Pro/Max only), skills need to be named explicitly, and the terminal stays usable while the cloud plans.

## Related Topics
claude-code, agents, workflow, planning, how-to, multi-agent, opus-4-6, cloud-compute
