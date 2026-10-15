# Ingest Notes

**Source:** [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)

## User Focus

- What changed since the last ingest (2026-05-06, `sources/articles/2026-05-06_claude-code-docs_best-practices.md`). Caveat: the May copy was a condensed web-fetch, so prose missing from it may have been elided rather than added since; count as new only features, flags or defaults May lacked, or wording that conflicts.
  - Verify your work: four gating levels (prompt, `/goal`, Stop hook, verification subagent or workflow), `/verify`, show evidence
  - Write an effective CLAUDE.md: 200-line cap gone from this page (still on the memory page), "would removing this cause mistakes?" test, emphasis on one line only, `/doctor`, `/context`, sometimes-relevant content to skills
  - Permissions: auto mode the default from v2.1.283, "Manual mode" named
  - New sections: run autonomously with auto mode, add an adversarial review step, install plugins, connect MCP servers
  - Parallel work: cross-session messaging, agent view, `/batch`, agent teams experimental and off by default
  - Checkpoints per prompt, not per action; Bash changes not captured
  - Rewind summarize options, `/btw` outside history, fresh session per spec with an end-to-end verification step, `--no-session-persistence`
  - Failure patterns: "delete it or convert it to a hook"
  - Removed: 200-line cap, "YOU MUST" emphasis, per-action checkpoints, React→Vue fan-out example

## Confirmed Discoveries

- **A. Advisory vs deterministic:** CLAUDE.md is advisory, hooks guarantee; a rule Claude already follows should be deleted or converted to a hook.
- **B. The worker shouldn't grade itself:** a fresh-context reviewer sees only the diff and the criteria, not the reasoning.
- **C. Reviewer over-reporting:** a reviewer told to find gaps will find some even in sound work; flag only gaps that affect correctness or requirements.
- **D. Checkpoints aren't git:** only changes made through Claude's file tools are tracked.
- **E. Version- and plan-dependent defaults:** auto mode as the default depends on v2.1.283 and, before that, the plan tier; wiki claims about defaults need the version stated.
