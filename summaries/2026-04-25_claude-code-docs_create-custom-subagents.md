---
title: "Create custom subagents (Claude Code Docs)"
type: "summary"
channel: "Anthropic / Claude Code Docs"
date: "2026-04-25"
resource: "https://code.claude.com/docs/en/sub-agents"
pillar: "building"
tags: [claude-code, subagents, agents, configuration, how-to, reference, hooks, permissions, mcp, context-management]
timestamp: "2026-04-25"
source_file: "sources/articles/2026-04-25_claude-code-docs_create-custom-subagents.md"
---

# Create custom subagents (Claude Code Docs) — Summary

**Source:** Anthropic / Claude Code Docs | 2026-04-25 | [Link](https://code.claude.com/docs/en/sub-agents) | Reference docs

## TL;DR

The authoritative reference for creating and configuring custom subagents in Claude Code. Subagents run in isolated context windows with their own system prompt, tool access, and permissions — the core use case is offloading verbose, self-contained tasks so the main conversation stays clean. Covers built-in agents, file-based configuration (full frontmatter schema), scope/priority rules, model selection, persistent memory, hooks, forked subagents, and ready-to-use examples.

## Key Takeaways

1. **Use subagents to protect main context from verbose output.** Running tests, fetching docs, or log processing can flood your context. Delegate to a subagent: it does the work in its own window, returns only the summary.
   - **How to apply:** Phrase requests as "use a subagent to run the test suite and report only failing tests." Claude delegates automatically based on the task description matching a subagent's `description` field.

2. **Subagent files are Markdown with YAML frontmatter.** The body is the system prompt; frontmatter defines name, description, tools, model, permissions, hooks, memory, etc. Only `name` and `description` are required.
   - **How to apply:** Drop files in `.claude/agents/` (project scope, check into git) or `~/.claude/agents/` (user scope, all projects). Use `/agents` command for guided creation or `claude agents` CLI to list all configured agents.

3. **The `description` field is the routing key.** Claude reads descriptions to decide when to delegate. Write descriptions that match the situations you want delegation to trigger. Add "use proactively" to encourage automatic use.
   - **How to apply:** Be specific: "Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code."

4. **Model resolution has a 4-level priority chain.** `CLAUDE_CODE_SUBAGENT_MODEL` env var → per-invocation model parameter → subagent `model` frontmatter → main conversation model. Use `haiku` for fast/cheap read-only agents, `sonnet` for analysis, `inherit` (default) for everything else.
   - **How to apply:** Set `model: haiku` on pure research/exploration agents. Leave it omitted (inherit) on agents that need the same capability as your main session.

5. **Persistent memory (`memory` field) lets subagents compound knowledge.** Three scopes: `user` (all projects), `project` (checked into git), `local` (git-ignored). The first 200 lines of `MEMORY.md` in the memory directory are auto-loaded into the subagent's context.
   - **How to apply:** Add `memory: project` to a code-reviewer subagent and instruct it to update its memory with codebase patterns after each review. Over time it builds institutional knowledge specific to your repo.

6. **Forks inherit the full conversation — named subagents start fresh.** Forked subagents (experimental, `CLAUDE_CODE_FORK_SUBAGENT=1`) receive the entire session history, making them cheaper (shared prompt cache) and context-aware. Use `/fork <directive>` to branch off a side task while continuing in the main session.
   - **How to apply:** Use forks when the task needs session context (e.g., "draft tests for the parser changes so far"). Use named subagents when the task is independent (e.g., "review this PR").

7. **Scope MCP servers to a subagent with the `mcpServers` field.** Inline server definitions connect only while the subagent is active — the main conversation never sees those tools or their tool descriptions, keeping parent context clean.
   - **How to apply:** Define Playwright or other large-tool-count MCP servers inline in a `browser-tester` subagent rather than globally in `.mcp.json`.

8. **`PreToolUse` hooks enable conditional tool validation.** When `tools: Bash` is too coarse (you want some Bash commands but not others), attach a hook that reads the command from stdin JSON and exits 2 to block.
   - **How to apply:** See the db-reader example — a `validate-readonly-query.sh` script blocks SQL writes while allowing SELECT queries.

9. **`permissionMode: bypassPermissions` is powerful but scoped.** Even in bypass mode, writes to `.git`, `.claude`, `.vscode`, `.idea`, and `.husky` still prompt — except `.claude/commands`, `.claude/agents`, `.claude/skills`. Parent's `bypassPermissions` or `acceptEdits` takes precedence over subagent settings.

10. **Subagents cannot spawn other subagents.** For nested delegation, use Skills (run in main conversation context) or chain subagents sequentially from the main conversation.

## Notable Commands / Code Snippets

List all configured subagents:
```bash
claude agents
```

Launch a session as a specific subagent (replaces default system prompt):
```bash
claude --agent code-reviewer
```

CLI-defined subagent (session-only, no file):
```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer...",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

Minimal subagent file:
```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer...
```

Disable a specific subagent in `settings.json`:
```json
{
  "permissions": {
    "deny": ["Agent(Explore)", "Agent(my-custom-agent)"]
  }
}
```

Fork the current conversation:
```
/fork draft unit tests for the parser changes so far
```

## Related Topics

claude-code, subagents, agents, configuration, how-to, reference, hooks, permissions, mcp, context-management, memory, forking
