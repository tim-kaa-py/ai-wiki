# Ingest Notes

**Source:** [I Built Self-Evolving Claude Code Memory w/ Karpathy's LLM Knowledge Bases](https://www.youtube.com/watch?v=7huCP6RkcY4)

## User Focus
- Karpathy's general concept of LLM knowledge bases — what it is, why it matters, using LLMs to organize external information for agent querying, Obsidian as canvas
- The compiler analogy — how Karpathy maps the knowledge pipeline to a compiler toolchain: source code (raw/) → compiler (LLM processing) → executable (wiki with backlinks) → test suite (linting) → runtime (querying)
- How to build an Obsidian vault that self-documents your codebase — practical implementation using Claude Code hooks (session start, pre-compact, session end, flush process), daily logs as raw equivalent, wiki as compiled output

## Confirmed Discoveries
- **agents.md as meta-reasoning layer** [07:14-07:48] — A global rules file that describes the entire knowledge base system to the agent so it has meta-awareness of its own infrastructure. A concrete prompt engineering pattern for giving agents self-models.
- **One-prompt bootstrap (PRD-as-prompt pattern)** [07:47-08:37] — Karpathy published a PRD that, when sent as a single prompt to a coding agent, one-shots the entire knowledge base system. Reusable pattern for encoding architectures as executable product requirements.
- **Claude Agent SDK for background processing** [15:22-15:42, 17:57-18:06] — Hooks call the Claude Agent SDK as a separate process for summarization. Uses existing Anthropic subscription, no API key setup. Shows how to compose multiple Claude instances in a workflow without blocking the main session.
