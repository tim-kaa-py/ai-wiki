# Ingest Notes

**Source:** [Anthropic's CCA Exam as a Field-Guide for Agentic Engineering — Frank Coyle, UC Berkeley](https://www.youtube.com/watch?v=Z-c11pV_uvU)

## User Focus

No focus points supplied (Mode B — URL only). User selected discoveries A–G from the extraction plan and excluded H.

## Confirmed Discoveries

- **A. [06:06–07:48] "Loops are not the new thing" — the Böhm–Jacopini pushback.** Coyle explicitly rebuts Boris Cherny ("my job is to write loops") and Peter Steinberger ("I just design loops"). The 1966 Böhm–Jacopini result: sequence + conditional + loop = Turing completeness. His claim is that agentic AI did not invent the loop — it *re-acquired the third primitive* it had been missing. The most argumentative moment in the talk.
- **B. [07:56–11:12] `stop_reason` as the loop's control surface.** Anti-pattern is fire-and-consume. Pattern is a `while True` branching on `stop_reason`: `tool_use` → execute tool, feed result back; end → exit, confidence-check, escalate to human if low. Non-obvious point: `max_tokens` is also a stop reason, so a response can be a truncated partial that still reads as a complete answer — it must trigger action, not be consumed.
- **C. [12:00–15:12] Group-think as a multi-agent failure mode.** Pass a critic sub-agent only the *claim and evidence*, never the reasoning trace that produced the claim. Agents collaborating converge the way people at a party converge on pizza. "Every agent gets its own slice." A context-isolation argument made on *epistemic independence* grounds rather than the usual token-cost grounds.
- **D. [12:16–13:07] Overloaded-agent anti-pattern — the carpenter analogy.** An agent loaded with every tool is the contractor who shows up with plumbing, carpentry and electrical tools claiming he can do anything. Ties to functional programming's one-function-one-job. Specialise; one or two tools per agent.
- **E. [15:19–18:07] Context fork + explicit compaction.** Subtask runs in a forked context; only the summary returns to the main thread. Followed by an explicit `token_count > 150_000 → compact` check. Also flags pluggable/custom context compression (extend a base class with your own compression logic), sourced from a conference giveaway book by Sam Bagwell.
- **F. [18:09–19:13] CI anti-pattern + Batch API.** Interactive mode in a pipeline is the anti-pattern — Claude stops for permissions and the pipeline hangs. Separate tip: batch prompts for ~50% lower token cost with a ≤24h turnaround.
- **G. [02:11–03:24] Anti-patterns as the teaching primitive.** Explicit lineage to the early-1990s design patterns movement: we have agent patterns now, but understanding what *not* to do is the key that leads to what you should do. This framing is the spine of the talk.

**Excluded:** H (exam structure as an artefact — pricing, domain weightings, sitting mechanics).

## Fact-Check Notes (verified during ingest, 2026-08-13)

- **"CCA" = Claude Certified Architect.** Coyle's naming is correct; the official full name is **Claude Certified Architect — Foundations (CCA-F)**. Confirmed via [Anthropic's Claude Partner Network announcement](https://www.anthropic.com/news/claude-partner-network).
- **Launch date:** 12 March 2026, alongside the Claude Partner Network. Matches Coyle's "released in March".
- **Price:** $99 for non-partners; free for the first 5,000 partner-company employees. One third-party source lists $125, so pricing may have changed.
- **Domain weightings:** Coyle's cited figures (agentic architecture 27%, Claude Code 20%) are confirmed. He gave no percentages for the other three; third-party sources report Prompt Engineering 20%, Tool Design & MCP 18%, Context Management 15%.
- **Format:** 60 questions, 120 minutes, 720/1000 to pass, valid 12 months, delivered via Pearson VUE.
- ⚠️ **Unverified:** Coyle's claim that individuals may sit the exam "once every 6 months". Not confirmed by any official page — attributed to Coyle alone.
- Apart from the Anthropic announcement, the added figures come from third-party prep sites and blog posts, not official documentation.

## Transcription Corrections

Auto-caption garbles corrected in the summary (source file remains verbatim):

- "Boris Cherney" → **Boris Cherny**
- "Open Claw" → **OpenClaw**
- "Cloud Code" → **Claude Code**
- "contact management" → **context management**
- "Böhm and Jacopini" → **Böhm–Jacopini** (Corrado Böhm and Giuseppe Jacopini, 1966)
