---
title: "Stop babysitting your agents"
type: "summary"
channel: "Claude"
date: "2026-05-20"
resource: "https://www.youtube.com/watch?v=wI0ptqCSL0I"
pillar: "building"
tags: [claude-code, agents, workflow, verification, automation, best-practices]
timestamp: "2026-05-27"
source_file: "sources/youtube/2026-05-20_claude_stop-babysitting-your-agents.md"
---

# Stop babysitting your agents — Summary

**Source:** Claude (Sid Benesaria) | 2026-05-20 | [Link](https://www.youtube.com/watch?v=wI0ptqCSL0I) | 37:07

## TL;DR
As models get smarter, the bottleneck stops being the model and becomes *your attention* — you end up staring at the screen acting as a glorified QA tester for Claude. This "Claude Code 301" talk gives a three-layer system that stacks: teach Claude to **verify** its own work in a loop, then **multi-Claude** in parallel once it's reliable, then push routine bookkeeping into **background loops/Routines** so your keyboard is no longer the bottleneck. Net goal: delegate everything that doesn't need you, and reserve your attention for what actually matters.

## Video Structure
1. [00:00-03:12] Intro & table stakes — the attention problem; three prerequisites (high-quality CLAUDE.md, connected tools, Claude Code on Web).
2. [03:12-05:12] Why tooling must change — tooling was built for humans, but agents write most code now; "what does an agent need from your codebase that a human takes for granted?"
3. [05:12-08:56] Verification, part 1 — brainstorm on how *you* verify your own work; the human software-engineering playbook (build → run → check side effects → test → deploy) maps directly onto Claude.
4. [08:56-12:05] The loop — the "most important slide": a loop is an autonomous circuit where Claude writes code, checks for failure, debugs, repeats until a success state. Verification comes in flavors (UX, back-end, end-to-end).
5. [12:05-14:35] Making a loop concrete — four steps for a front-end loop: run the app, drive the browser (Chrome MCP), prove before/after, unblock (auth + dynamic state setup).
6. [14:35-16:00] Packaging as a skill — self-documenting, self-improving verification skill the whole team contributes to.
7. [16:00-26:14] Demo — Monkeytype full-stack app: spin up dev server, drive via Chrome MCP, distill learnings into a verification skill, then build a confetti feature and have Claude verify itself (catching and fixing its own lint errors in a loop).
8. [26:14-32:41] Multi-Clauding — attention is the scarce resource (4-5 sessions max); four surfaces: Desktop app, Claude Agents (terminal), Claude Code on Web, Remote Control (phone).
9. [32:41-36:24] Background loops & Routines — `/loop` to wake a session on an interval; Routines = remote `/loop` with time/event triggers.
10. [36:24-37:07] Wrap — stack all three and the system does work without you on the keyboard.

## Key Concepts

### Verification loop
An autonomous circuit you complete *for* Claude so it can "hill climb" toward a success criterion: write code → check for failure → debug → write more code → repeat until success. When Claude reaches that success state on its own, the PR it hands you is genuinely higher quality. The point of the whole talk hangs on this — "wherever possible, our goal now is to get Claude into a loop."

### Agent vs. human tooling
Most existing tooling (linters, IDEs, type checkers, compilers) was built to make *humans* faster. Much of it translates well to agents (prettiers, linters, symbol servers), but humans carry implicit assumptions about their toolchain that Claude does not. The framing question: *"What does an agent need from your codebase that a human takes for granted?"*

### Skills (self-improving / self-documenting)
A skill is a store of arbitrary context about a specific topic — here, a verification loop. The unlock is instructing the skill to improve itself every time Claude hits a blocker. The result is a self-documenting, self-improving artifact the whole team contributes to. This is how the Claude Code team itself does verification: one shared skill explicitly told to keep editing itself, so a blocker one person hits gets patched for the next person.

### Multi-Clauding & attention budget
Running many Claude instances in parallel only works once each one is reliable (hence verification first). The real constraint isn't compute — it's *your attention*. The speaker can't function past ~4-5 simultaneous sessions; the tools below exist mostly to *protect attention*, not to add raw capacity.

### Claude Agents
A terminal-native sidebar view (open with `claude agents` instead of `claude`) for people who live in the terminal. Lists local sessions and **sorts them by how much attention they need** — blocked-on-input sessions float to the top, running/completed ones sink. Supports pinning, renaming, reordering. Released about a week before the talk.

### Claude Code on Web
Runs your sessions in Anthropic's cloud instead of on your laptop, decoupling the compute from your machine — close the laptop, spill water on it, lose internet in the car, and the session keeps running. Accessed at `claude.ai/code`. Also one of the three table-stakes prerequisites.

### Remote Control
The speaker's favorite feature: control any session on any surface from your phone. Enable with `/remote-control` in a running session; it appears in the mobile app and sends push notifications, so when Claude needs input your phone buzzes and you answer from anywhere.

### /loop
Runs a prompt at a fixed interval inside Claude Code. `/loop 10m babysit my open PRs` wakes the session every 10 minutes, re-runs the prompt, and — given a good CLAUDE.md and connected tools — figures out what to do on its own. Removes you from routine monitoring.

### Routines (time/event triggers)
`/loop` running *remotely*, in the same containers as Claude Code on Web. Set up from a Routines tab in the web or desktop app with a **time-based** or **event-based** trigger; each fires a new session with a specified prompt. Team examples: a routine that updates docs daily, and one that scans issues/feedback and posts to Slack every six hours.

## Key Takeaways
1. **Get the table stakes in place first.** High-quality CLAUDE.md is "the single highest-leverage thing" you can do; then connect your everyday tools; then set up Claude Code on Web.
   **How to apply:** Author a strong CLAUDE.md, wire MCP connectors for the tools you already use (Slack, Asana, Linear, Datadog, BigQuery), and enable Claude Code on Web at `claude.ai/code`.
2. **Map your own verification playbook onto Claude.** The same steps you use (build → run executable → check side effects in browser/logs/DB → run + add tests → deploy) are exactly what Claude should do.
   **How to apply:** Write down how *you* verify a feature, then give Claude the tools + instructions to perform each of those steps itself.
3. **Always aim to get Claude into a loop.** A loop is what turns a hopeful PR into a verified one.
   **How to apply:** Give Claude the four pieces — run the app, drive the browser, prove before/after with screenshots, and unblock auth/state — so it can iterate to a success state unattended.
4. **Unblock loops with an identity and dynamic state-setup scripts.** Auth and state are the common blockers in real apps.
   **How to apply:** Give Claude a login identity for your app and *dynamic* (not over-prescriptive) state-setup scripts — like the seed scripts you'd already write for end-to-end tests — so it can exercise the app meaningfully.
5. **Package verification as a self-improving skill.** Don't keep the loop in your head — distribute it.
   **How to apply:** Have Claude distill a session's learnings into a `skill.md`, and instruct the skill to edit itself whenever it hits a blocker, so teammates and future-you inherit the fix.
6. **Respect your attention budget when parallelizing.** More sessions ≠ more throughput past ~4-5.
   **How to apply:** Use Claude Agents (terminal) or the Desktop app to triage by attention needed; pin/rename/color sessions so you instantly recall what each was doing.
7. **Push bookkeeping off your keyboard.** PR babysitting, doc updates, triage, keeping CI green — these need to *run*, not to have you in the loop.
   **How to apply:** `/loop <interval> <prompt>` for local recurring work; set up Routines with time/event triggers for remote recurring work.

## Argument Structures
The talk is one chained argument toward "get off the keyboard":

- **Premise:** Existing tooling was built for humans, but agents now write most of the code.
  → **Therefore** we must reconsider tooling and ask what an agent needs that a human takes for granted.
- **Premise:** Humans build software by verifying their own work in iterative steps.
  → **Therefore** if we give Claude the same tools + instructions, it can verify itself the same way — in a *loop* that hill-climbs to a success state.
- **Premise:** A reliable, self-verifying agent produces PRs you can trust.
  → **Therefore** you can run many such agents in parallel and be confident they're doing the right thing.
- **But:** Attention is a scarce resource — past ~4-5 sessions you can't keep up.
  → **Therefore** parallelism alone isn't enough; you need surfaces (Agents, Desktop, Web, Remote Control) that *protect attention*, and you need to remove yourself from routine work entirely.
- **Premise:** Much engineering work is bookkeeping that needs to *run*, not to have you present.
  → **Therefore** push it into background loops (`/loop`) and Routines (remote, triggered).
- **Conclusion:** Stack verification + multi-Clauding + background loops, and the system does reliable work without you on the keyboard — freeing your attention for the tasks you actually care about.

## Notable Commands / Code Snippets

- **`/chrome`** — checks/enables the Claude-in-Chrome MCP so Claude can drive a real browser for UX verification. Reports status (e.g. "enabled, extension installed"); guides install if missing. Playwright or other browser-control MCPs work too.
- **`claude agents`** — launches the terminal sidebar view of local sessions, sorted by attention required.
- **`/remote-control`** — registers the current session with the mobile app for phone control + push notifications.
- **`/loop 10m babysit my open PRs`** — wakes the session every 10 minutes and re-runs the prompt; relies on a good CLAUDE.md + connected tools to act autonomously.
- **Claude Code on Web** — `claude.ai/code`; runs sessions in Anthropic's cloud, decoupled from your laptop.
- **Verification skill packaging** — "take everything we learned and put it into a skill file" produces a `skill.md` (bring up the stack → load Chrome MCP tools → smoke test via browser), instructed to keep documenting itself on every blocker.
- **Demo loop in action** — building the confetti feature, Claude hit lint errors, fixed them, re-verified, and iterated in a circle until a good state — the verification loop running live.

## User Notes
This was a comprehensive-capture ingest (URL only, no narrow focus): the goal was to record the full "Claude Code 301" framework faithfully. The organizing idea is the **three stacked strategies**, each enabling the next:

1. **Verification** — teach Claude to check its own work via a loop.
2. **Multi-Clauding** — parallelize once Claude is reliable; treat *attention* as the scarce resource, not compute.
3. **Background loops / Routines** — `/loop` and Routines remove the keyboard from the loop entirely.

The framing thesis worth keeping: tooling was built for humans, but agents now write most code — so the live question is *"what does an agent need from your codebase that a human takes for granted?"*

## Related Topics
claude-code, agents, workflow, verification, automation, best-practices, skills, parallelization, mcp
