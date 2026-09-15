# Ingest Notes

**Source:** [The AI-Native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)

## User Focus

- **Artifact chain** — intent.md → spec.md → plan.md → diff/tests → PR with review findings → incident record; each accepted commit triggers the next stage; the chain of commits is the audit trail.
- **Governance controls** — skills as advisory vs hooks as deterministic; managed settings and sandboxing for regulated enterprises; "the agent may act up to the production gate and cannot pass it".
- **Test & evals** — feedback loops vs verifier subagent; failing-test-first with test-edit blocking; continuous evals in CI that regression-test the agent configuration (CLAUDE.md, skills, hooks) itself.
- **Maintain loop** — deterministic σ-tier control bands (bands.yaml), headless diagnosis written back as intent.md, recurring security scans, Claude Tag on call.

## Confirmed Discoveries

- **A. Legacy systems and the source of truth** (Build sidebar) — per artifact, name one authoritative system: repo-as-source-of-truth, legacy-as-source-of-truth (Claude reads/writes back over MCP), or linkage as the minimum bar (record IDs in artifacts, commit SHAs in records).
- **B. CLAUDE.md rules of thumb** (The CLAUDE.md; AI in the PR review loop) — "mistake twice → CLAUDE.md"; review findings flagged a second time go into CLAUDE.md as part of that review; keep it under a page; code owners approve changes.
- **C. Parallel sessions vs subagents and the review-capacity ceiling** — parallel session = full instance in its own worktree, knows nothing of the others; subagent = scoped helper inside one session; start with 2–3; ceiling is how many streams one person can review properly.
- **D. Adoption dependency order** (Plays + Prerequisites) — adoption order ≠ stage order; start with no-prerequisite plays; gates must exist before CI/CD automation; each play matures from prompt-by-hand → slash command → merge-triggered non-interactive job.
- **E. Separation of duties in AI PR review** — "the agent that wrote the code has no way to approve it"; findings never approve/block alone; machine-readable severity tally; babysit-to-green slash command; monthly finding ratings.
- **F. Leading/lagging indicators per play** — most read directly from git timestamps, PR metadata, OpenTelemetry, or incident tracker; worth one compact table.
