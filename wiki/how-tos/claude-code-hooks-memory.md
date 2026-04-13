---
title: "Claude Code Hooks for Memory"
type: "how-to"
pillar: "building"
tags: [claude-code, hooks, memory, llm-knowledge-bases, agents, workflow, automation]
sources:
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
last_updated: "2026-04-13"
---

# Claude Code Hooks for Memory

How to set up Claude Code hooks that automatically capture session knowledge and promote it into a self-maintaining wiki. Based on Cole Medin's adaptation of Karpathy's LLM wiki pattern for internal codebase memory.

## The Goal

A zero-maintenance memory system where every Claude Code session automatically contributes to a growing knowledge base. No manual journaling, no separate tools. Hooks fire at session boundaries, capture summaries, and a flush process promotes them into structured wiki pages.

## Architecture Overview

```
Session Start Hook          Pre-Compact Hook          Session End Hook
      |                           |                         |
 Load agents.md            Capture summary            Capture summary
 + index.md                before compaction           into daily log
      |                           |                         |
      v                           v                         v
  Agent has              No information lost        Daily log grows
  self-model             during compaction          with each session
                                                          |
                                                    Daily Flush
                                                          |
                                                   Extract concepts
                                                   + connections
                                                          |
                                                     Wiki grows
```

## Step 1: Set Up the Folder Structure

Structure the memory system as an Obsidian vault:

```
project-root/
  .claude/
    settings.json          # Hook configuration
  memory/
    agents.md              # Meta-reasoning layer (global rules)
    index.md               # LLM-maintained index of all resources
    daily-logs/            # Raw session summaries (by date)
      2026-04-13.md
      2026-04-12.md
    wiki/                  # Compiled knowledge (concepts, connections)
      concept-a.md
      concept-b.md
```

## Step 2: Write agents.md

The agents.md file gives the agent a self-model of the entire knowledge base system. It should describe:

- Where raw session logs live (`daily-logs/`)
- Where compiled knowledge lives (`wiki/`)
- How the index works and what it contains
- How the log file functions
- The relationship between components

This is a concrete prompt engineering pattern: the agent doesn't just use the knowledge base, it understands how the knowledge base works and can reason about how to search it.

## Step 3: Configure Hooks

In `.claude/settings.json`:

```json
{
  "hooks": {
    "session_start": "python scripts/session_start.py",
    "pre_compact": "python scripts/pre_compact.py",
    "session_end": "python scripts/session_end.py"
  }
}
```

### Session Start Hook

Loads `agents.md` and `index.md` into context at the beginning of every session. This gives the agent immediate awareness of the knowledge base structure and available resources.

### Pre-Compact Hook

Fires before context compaction (when the context window fills up). Captures a summary of the current session state before information is compressed. This prevents knowledge loss during long sessions.

### Session End Hook

Fires when the session ends. Captures the final session summary and appends it to the daily log file.

**Key design choice:** The pre-compact and session-end hooks call the **Claude Agent SDK** as a separate background process for summarization. This avoids blocking the main session. Uses the existing Anthropic subscription — no API key setup needed.

## Step 4: Set Up the Daily Flush

The flush process runs periodically (daily or on-demand) and promotes accumulated session logs into structured wiki pages:

1. Read all new entries in `daily-logs/`
2. Extract concepts, decisions, and connections
3. Create or update wiki pages with new information
4. Update `index.md` to reflect new resources
5. Add backlinks between related concepts

This is the step that makes the compounding loop work. Without it, daily logs accumulate but don't compound.

## The Compounding Loop

The self-reinforcing cycle:

1. **Query** the wiki via agents.md + index.md
2. **Answer** drawn from accumulated knowledge
3. **Capture** the session's new insights via hooks
4. **Promote** via flush into wiki concepts
5. **Future queries** benefit from the expanded wiki

Cole Medin demos this producing detailed codebase-specific answers in ~10 seconds that would otherwise require deep analysis or sub-agent searches.

## Why Hooks Are the Right Integration Point

- Memory capture must happen at context boundaries (session end, memory compaction) to avoid losing information
- Claude Code hooks fire automatically at exactly these boundaries
- Background processing via Claude Agent SDK means capture doesn't block the main session
- No behavior change required from the user — the system is self-maintaining by design

## Index Files Replace RAG

An LLM-maintained `index.md` that describes all folders and resources gives agents enough navigational context to search effectively without vector databases or semantic search. The agent reads the index, decides where to look, and navigates the file tree directly.

> "I thought I had to reach for fancy RAG, but the large language model has been pretty good about auto-maintaining index files." -- Karpathy

This works because the knowledge base is structured markdown, not unstructured blobs. At personal/project scale (~100s of files), the index + backlinks provide sufficient navigational structure.

## Related Pages

- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) -- the underlying pattern
- [Claude Code](../tools/claude-code.md) -- the tool this configures
- [Obsidian](../tools/obsidian.md) -- visualization frontend for the vault
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) -- bootstrap the entire system from a single prompt
- [Andrej Karpathy](../people/andrej-karpathy.md) -- originator of the underlying pattern
