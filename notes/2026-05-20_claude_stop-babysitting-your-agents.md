# Ingest Notes

**Source:** [Stop babysitting your agents](https://www.youtube.com/watch?v=wI0ptqCSL0I)

## User Focus
<!-- No specific focus given (URL-only ingest). Comprehensive capture requested. -->
- Capture the full talk faithfully — it is a structured "Claude Code 301" framework.
- Emphasis on the three stacked strategies and how they build on each other:
  1. **Verification** — teaching Claude to check its own work via a loop.
  2. **Multi-Clauding** — parallelizing once Claude is reliable; attention as the scarce resource.
  3. **Background loops / Routines** — `/loop` and Routines to take the keyboard out of the loop.
- Keep the framing thesis: tooling was built for humans, but agents now write most code — "what does an agent need from your codebase that a human takes for granted?"

## Confirmed Discoveries
<!-- No interactive discovery round (URL-only). Notable concrete points present in the transcript: -->
- Prerequisites / table stakes: high-quality CLAUDE.md, connecting tools (MCP), Claude Code on Web for decoupled compute.
- Verification loop made concrete: run app → drive browser (Chrome MCP) → prove before/after → handle blockers (auth, dynamic state-setup scripts) → package as a self-improving skill.
- Multi-Claude surfaces: Desktop app (control plane), Claude Agents (terminal sidebar sorted by attention needed), Claude Code on Web, Remote Control (phone).
- Background: `/loop <interval> <prompt>` wakes a session on an interval; Routines = remote /loop with time/event triggers (e.g. daily docs update, feedback-to-Slack every 6h).

> Note: source transcript is local-ASR (faster-whisper large-v3 + prompt priming). A few residual "Cloud" mishearings remain where "Claude" was meant; the summary uses the correct spelling.
