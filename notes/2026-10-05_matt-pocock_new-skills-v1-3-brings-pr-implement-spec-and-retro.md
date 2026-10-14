# Ingest Notes

**Source:** [New Skills! v1.3 brings /pr, /implement-spec, and /retro](https://www.youtube.com/watch?v=BsJGo1wFTvQ)

## User Focus

- Pocock's new skills: what are the new skills doing? What are the (remark left unfinished)
  - /implement-spec [00:28–04:54]: spec + tickets → orchestrator, task graph, parallel TDD sub-agents in worktrees, one review-ready PR
  - /pr [04:54–08:11]: PR body template (visual summary, before/after evidence, merge danger, blast radius)
  - /retro [09:38–14:06]: reviews real agent sessions and proposes repo and agent-setup improvements

## Confirmed Discoveries

- **A. Manual vs deterministic vs sub-agent loops** [01:08–03:23]: script loop best (reliable, cheap), human loop worst; /implement-spec's sub-agent loop as the entry point to AFK work, enabled by nested sub-agent spawning.
- **B. CONTEXT.md renamed to GLOSSARY.md** [08:11–09:38]: "context" was too vague a filename for the agent to load it at the right time; breaking change for users of his skills.
- **C. Keep retro human-in-the-loop** [12:34–13:33]: automating it would chase false positives and drift the repo; sample sessions, especially failed ones.
- **E. /pr reliably model-invoked** [07:46–08:03]: invoked consistently without user prompting, "at least on Opus 5.5".
