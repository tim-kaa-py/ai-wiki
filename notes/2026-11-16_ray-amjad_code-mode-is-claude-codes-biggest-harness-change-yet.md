# Ingest Notes

**Source:** [Code Mode Is Claude Code's BIGGEST Harness Change Yet](https://www.youtube.com/watch?v=DRNbxPk9Ab8)

## User Focus

- What is code mode? [00:00–00:13], [00:53–07:53]
- What are the principles behind it? [01:45–02:13], [03:30], [07:19–08:07]
- What is a recursive language model (RLM), and how does it relate to code mode? [09:32–12:50], [14:17–14:42]
- Context management: how Claude could manage its own context (conversation history as a variable Claude can slice and cut, instead of compaction). [12:50–14:13]
- How to set it up in Claude Code. [05:45–06:44] plus the video description: Claude Code 2.1.323 or later, `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude`, docs at https://code.claude.com/docs/en/code-mode

## Confirmed Discoveries

- C. [08:35–09:32] Results: about half the input tokens at 71% of the cost (one self-run test); relayed claims from BrowserUse's Python-REPL rewrite and a REPL harness scoring 71% vs 65% on TerminalBench.
- D. [10:08–11:19] Unreleased spawn/list/release context functions found in the binary: subagents as contexts managed from code, forking the main conversation (e.g. 5–10 attempts, best 3 returned), children messaging the coordinator. Behaviour inferred, not released.
- E. [09:44–10:08] Alex Zhang's "Mismanaged Geniuses Hypothesis": many limits come from how models are used, not what they can do.
