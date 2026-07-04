---
title: "Claude Code Hooks for Memory"
description: "How to set up Claude Code hooks that automatically capture session knowledge into a self-maintaining wiki"
type: "how-to"
pillar: "building"
tags: [claude-code, hooks, memory, llm-knowledge-bases, agents, workflow, automation, hook-types, json-output]
sources:
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
  - "summaries/2026-04-25_claude-code-docs_create-custom-subagents.md"
  - "summaries/2026-05-06_claude-code-docs_hooks-guide.md"
  - "summaries/2026-05-06_claude-code-docs_memory.md"
  - "summaries/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md"
timestamp: "2026-05-17"
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

## PostToolUse Hook: Auto-Formatting

Beyond memory capture, hooks are also used for code quality enforcement. Boris Cherny (creator of Claude Code) uses a **PostToolUse** hook that runs a formatter after every `Write` or `Edit` tool call. This handles the last 10% of formatting issues that Claude doesn't catch, preventing CI failures silently.

```json
"PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
        "type": "command",
        "command": "bun run format || true"
    }]
}]
```

The `|| true` ensures the hook never blocks Claude's execution — formatting failures are non-fatal. Replace `bun run format` with your project's formatter (e.g. `prettier --write`, `black`). *(Source: Boris Cherny, Creator of Claude Code)*

## Verification Hooks for Long-Running Tasks

For tasks that run unattended, Boris Cherny recommends adding deterministic verification:
- Use a **Stop hook** that runs your test suite or a verify-app agent after every session ends
- Use a background agent to verify when done
- The ralph-wiggum plugin provides another option for unattended verification

*(Source: Boris Cherny, Creator of Claude Code)*

## Subagent-Scoped Hooks and Memory

Hooks and memory are also configurable **per subagent** — declared inline in the subagent's frontmatter rather than globally in `settings.json`. Two patterns:

- **`PreToolUse` validation hooks** scoped to the subagent. Lets you allow `tools: Bash` while still blocking specific commands — e.g., a `db-reader` subagent that allows `SELECT` and rejects writes by exiting 2 from a validator script.
- **Persistent subagent memory** via the `memory` field (`user`, `project`, or `local` scope). The first 200 lines of `MEMORY.md` auto-load into the subagent's context. Instruct the subagent to update its memory after each run — over time it builds institutional knowledge specific to its task.

See [Claude Code Custom Subagents](claude-code-custom-subagents.md) for the full configuration. *(Source: Claude Code Docs — Create custom subagents)*

## Hooks Reference (Anthropic Docs — May 2026)

The Cole Medin pattern above is one application of Claude Code hooks. The full reference below covers everything else hooks can do — formatting, permission enforcement, context re-injection, deterministic guardrails.

### Why Hooks Exist: Deterministic vs Advisory

**CLAUDE.md instructions are advisory** — Claude may or may not follow them. **Hooks are deterministic** — they fire regardless of what Claude decides. This is the fundamental rule for choosing between them: if something *must* happen (format after edit, block .env edits, re-inject context after compaction), it needs to be a hook, not an instruction. Anthropic's blunt phrasing: **"Put guardrails in hooks."**

### Exit Codes Control Behavior

| Exit code | Effect |
|-----------|--------|
| `0` | Proceed. For `UserPromptSubmit` and `SessionStart`, stdout is added to Claude's context (the only way to inject text from a hook). |
| `2` | Block the action. For `PreToolUse`, the tool call is blocked and stderr is sent as feedback to Claude. |
| Other | Log error. The action proceeds. |

When writing a blocking hook, write the reason to stderr — Claude uses that as feedback to adjust its approach.

### Structured JSON Output for Fine-Grained Control

Exit 0 + JSON to stdout enables behavior beyond allow/block:

- **PreToolUse:** `permissionDecision: "deny" | "allow" | "ask"` to override the default decision
- **PostToolUse / UserPromptSubmit:** `hookSpecificOutput.additionalContext` injects text into Claude's context (the **only** way to pass info from a `PostToolUse` hook to Claude — bare stdout goes only to debug log)

Each `additionalContext` entry costs ~100-120 tokens — keep them tight.

### Four Hook Types

| Type | What it does |
|------|-------------|
| `command` (default) | Run a shell command |
| `http` | POST to an HTTP endpoint |
| `prompt` | Single LLM call; returns `{"ok": true/false}` |
| `agent` | Multi-turn subagent with tools |

Practical pairings:
- `prompt` hook on `Stop` event to verify task completion
- `agent` hook when verification needs to read files

### Matcher Patterns (Scope Hooks Narrowly)

| Matcher | Fires on |
|---------|----------|
| `"Edit\|Write"` | Only those tools |
| `"compact"` on SessionStart | Only after compaction |
| `"mcp__github__.*"` | All GitHub MCP tools |

The `if` field (v2.1.85+) adds **argument-level filtering** — e.g. `"Bash(git *)"` for only git commands. Always scope hooks as narrowly as possible — broad matchers fire more than expected.

### Hooks vs `bypassPermissions`

Hooks fire **before** permission checks even in `bypassPermissions` mode. A `PreToolUse` hook returning `deny` blocks the tool even when bypass is active. Conversely, a hook returning `"allow"` cannot bypass deny rules from settings. **Hooks tighten but cannot loosen restrictions past policy.**

This makes `PreToolUse` hooks the right tool for org-level policy enforcement that users cannot bypass by changing their permission mode.

### Six Scope Levels for Hook Placement

| Scope | Path | Audience |
|-------|------|----------|
| Global | `~/.claude/settings.json` | Personal, all projects |
| Project | `.claude/settings.json` | Team — commit to git |
| Local | `.claude/settings.local.json` | Personal — gitignored |
| Managed policy | Org-deployed | Org-wide enforcement |
| Plugin | `<plugin>/hooks/hooks.json` | Wherever the plugin is installed |
| Skill/agent | Frontmatter `hooks:` | Scoped to that skill/subagent only |

### Canonical Patterns

**Auto-format with prettier after every edit:**
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"}]
    }]
  }
}
```

**Re-inject context after compaction:**
```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "compact",
      "hooks": [{"type": "command", "command": "echo 'Reminder: use Bun, not npm. Current sprint: auth refactor.'"}]
    }]
  }
}
```

**Block edits to protected files:**
```bash
#!/bin/bash
FILE_PATH=$(cat | jq -r '.tool_input.file_path // empty')
for pattern in ".env" "package-lock.json" ".git/"; do
  [[ "$FILE_PATH" == *"$pattern"* ]] && echo "Blocked: $FILE_PATH" >&2 && exit 2
done
```

**Stop-hook infinite-loop prevention:**
```bash
INPUT=$(cat)
[ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ] && exit 0
```

**Debug a misbehaving hook:**
```bash
claude --debug-file /tmp/claude.log
tail -f /tmp/claude.log
```

## Alternative Memory Architectures: Memarch and Hermes

The Cole Medin design above is a *knowledge-compounding* pattern — session summaries promote into a wiki. There is a parallel family of designs that uses the same hooks surface for a different job: **runtime memory for the agent during a session** (what it remembers about the user, environment, and prior actions). Two open-source systems sit at opposite ends of the design space, and the right Claude Code setup layers them under Cole's pattern.

### Memarch / memsearch — completeness via the Stop hook

Uses a `Stop` hook that fires after **every conversation turn**. The hook pipes the turn through Haiku to produce a bullet summary, appends it to a dated memory file with session anchors, and (periodically, via `memarch index`) chunks and embeds the bullets into a local **Milvus** vector DB running on CPU — zero API cost. No curation: it captures everything. Recall is **three-tier progressive disclosure**:

| Tier | Command / behavior | What it returns |
|------|-------------------|----------------|
| 1 | `memsearch search` | Hybrid dense-vector (semantic) + BM25 keyword match — closest chunks |
| 2 | `memsearch expand` | Surrounding metadata and a summary around the matched chunk |
| 3 | Raw dialogue | Full session transcript — last resort |

Each tier costs more tokens; the agent only descends if the previous tier did not answer.

### Hermes — curation via agent-driven write tools

Hermes gives the agent explicit `add` / `replace` / `remove` tools that write to **`memory.md`** (environment + actions) and **`user.md`** (user profile). A **character cap** on those files forces the agent to consolidate or drop when full, rather than appending indefinitely. Raw transcripts are saved in the background each turn, and a **curator** runs every 7 days to prune. At session start, Hermes injects a **frozen snapshot** — `claude.md` + `memory.md` + `user.md` + `soul.md` — into context (~1,300 tokens) and lets prompt caching cover the per-message cost. Anything written to those files during a session shows up in the *next* session, not the current one. Recall checks the injected `memory.md` first (Tier 0, in-context, zero cost), then falls back to keyword search.

### The hybrid blueprint

No single system answers all three of *storage / injection / recall* well — see [Agent Memory Systems](../concepts/agent-memory-systems.md) for the framework. Simon Scrapes' recommended Claude Code setup layers them:

```
Storage:    automemory + memarch Stop hook + Hermes curated memory.md/user.md
Injection:  session-start frozen snapshot (~3,000 cached tokens)
Recall:     Tier 0 (injected memory.md) → memarch hybrid search → expand → raw transcript
```

The diagnostic principle when adding any memory plug-in: ask which hook surface it rides on. If the answer is "none, it's a separate process," it probably will not compose cleanly with Claude Code. *(Source: Simon Scrapes)*

## Related Pages

- [Agent Memory Systems](../concepts/agent-memory-systems.md) -- storage/injection/recall framework and the memarch + Hermes hybrid blueprint
- [Claude Code Custom Subagents](claude-code-custom-subagents.md) -- subagent-scoped hooks and `memory` field
- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) -- the underlying pattern
- [Claude Code](../tools/claude-code.md) -- the tool this configures
- [Claude Code Permissions](claude-code-permissions.md) -- permissions configuration
- [Obsidian](../tools/obsidian.md) -- visualization frontend for the vault
- [PRD-as-Prompt Pattern](../concepts/prd-as-prompt.md) -- bootstrap the entire system from a single prompt
- [Andrej Karpathy](../people/andrej-karpathy.md) -- originator of the underlying pattern
