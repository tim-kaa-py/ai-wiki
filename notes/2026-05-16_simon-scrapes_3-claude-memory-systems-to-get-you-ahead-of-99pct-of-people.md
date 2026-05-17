# Ingest Notes

**Source:** [3 Claude Memory Systems to Get You Ahead of 99% of People](https://www.youtube.com/watch?v=rFWxRZ5D-lM)

## User Focus
- Different memory approaches: Claude Code's built-in automemory, memsearch (memarch), and Hermes agent
- How each system handles storage, injection, and recall

## Confirmed Discoveries
A. [Early] **Storage/injection/recall as a portable framework** — Simon frames these 3 questions as the universal lens for evaluating any memory system. Reusable concept worth capturing.

C. [Late] **The hybrid blueprint (concrete)** — The final quarter of the video is a step-by-step "best of both" design: automemory + memarch stop hook for capture, Hermes-style curated files, inject soul/user/memory/daily log at session start (~3,000 tokens cached), recall via Tier 0 → hybrid search → expand → raw.

D. [Mid] **"Lean context, not more context"** — Stated explicitly several times; reinforces context engineering as a design principle.

E. [Throughout] **Hooks as the memory integration surface** — Both memarch (stop hook) and Claude Code's own injection (pre-tool-use hook) ride on the hooks system. Hooks as architectural primitive for memory plug-ins.
