# Ingest Notes

**Source:** [Boris Cherny: We Cut 80% of Claude Code's Prompt](https://www.youtube.com/watch?v=qyPCVqFUyDo)

## User Focus
- Deleting 80% of the system prompt; ablations on every model release; `CLAUDE_CODE_SIMPLE=1`; "model is a bit more intelligent without the prompts"; delete your CLAUDE.md/skills/hooks every 6 months — [03:21-07:20]
- How to rebuild a system prompt: delete → use → add back only on repeated stumbles; evals outlive the harness by only 1-3 model generations before saturating — [07:20-10:30]
- Give the model tasks slightly too hard; the Bun Zig→Rust rewrite (11 days, one prompt + steering, dynamic workflow); OpenCV drawing elicitation — [14:47-19:32]
- Prompt engineering → context engineering → hard task + verification as THE key skill; the 2-week Electron→Swift rewrite with pixel-diff screenshot verification — [19:57-24:41]
- Dynamic workflows as "algebra for agents" and a new axis of test-time compute; loops/routines; Claude maintaining its own codebases (dead-code cleanup, abstraction police) — [24:48-30:15]

## Confirmed Discoveries
- (A) [06:22-06:37] What remains in the Claude Code harness after deletions: almost all safety, permissions, static analysis, and UI code — a concrete picture of a minimal agent harness in 2026.
- (B) [08:30-09:13] The "living creature" framing: each model generation has a different personality; get to know it, then adjust the harness — the philosophy behind delete-and-rebuild.
- (C) [22:26-22:48], [23:37-23:58] Debugging ladder when the model struggles: better prompting → a skill → an MCP for missing context; long-horizon reliability is "about hallucination" — verification prevents getting stuck.
- (D) [24:01-24:41] Anti-pattern: over-specification / over-engineering is the common failure mode of experienced engineers — treat the model like a coworker.
- (E) [11:02-13:54] Product overhang / hobbling definitions only (not the Claude Code birth story): the model can already do X but no product elicits it (overhang), or the product actively blocks it (hobbling).
