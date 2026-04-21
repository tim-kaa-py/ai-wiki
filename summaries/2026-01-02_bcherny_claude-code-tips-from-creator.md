---
title: "Claude Code Tips from the Creator (Boris Cherny Thread)"
source_type: "article"
channel: "Boris Cherny (@bcherny)"
date: "2026-01-02"
url: "https://x.com/bcherny"
pillar: "building"
tags: [claude-code, workflow, hooks, agents, permissions, mcp, best-practices, how-to]
ingested: "2026-04-15"
source_file: "sources/articles/2026-01-02_bcherny_claude-code-tips-from-creator.md"
---

# Claude Code Tips from the Creator (Boris Cherny Thread) — Summary

**Source:** Boris Cherny (@bcherny) | 2026-01-02 | [Link](https://x.com/bcherny)

> Note: This is a Twitter/X thread. Tips 3, 4, and 8 were not captured in the screenshots. Tips are numbered as the author numbered them.

## TL;DR

Boris Cherny, the creator of Claude Code, shares his personal workflow in a 13-tip thread. The throughline: treat Claude Code as a professional engineering collaborator — give it the best model, real tools (MCP), structured permissions, custom agents per workflow, and most importantly, a feedback loop to verify its own work (2-3x quality improvement).

## Key Concepts

### PostToolUse Hook (auto-formatting)
A Claude Code hook that runs after every `Write` or `Edit` tool call. Used by Boris to auto-format code, handling the last 10% of formatting issues that Claude doesn't catch on its own and preventing CI failures.

### `/permissions` (pre-allowed commands)
The Claude Code `/permissions` UI lets you allowlist specific bash commands by pattern (e.g. `Bash(bun run test:*)`). These are stored in `.claude/settings.json` and can be checked into the team repo, so all teammates share the same pre-approved command set. Preferred over `--dangerously-skip-permissions` which is a blanket bypass.

### `.claude/agents/` (custom workflow agents)
Named markdown files in `.claude/agents/` define custom Claude Code sub-agents for recurring workflows. Boris uses: `build-validator.md`, `code-architect.md`, `code-simplifier.md`, `oncall-guide.md`, `verify-app.md`. Each encodes detailed instructions for a specific task run at a consistent point in the workflow (e.g. code-simplifier runs after Claude finishes, verify-app runs before shipping).

### Verification feedback loop
The single most impactful practice: give Claude a mechanism to verify its own work (tests, CI, type-checking). With a feedback loop, the quality of the final result is 2-3x higher. Claude tests every single change.

### Plan Mode (shift+tab twice)
Claude Code's built-in planning mode. Boris starts almost every session here to write a full blueprint before execution. Claude can often 1-shot complex tasks when given a solid plan upfront.

### MCP integration for real tools
Claude Code can use MCP servers to interact with external services (Slack, BigQuery, Sentry). Configuration lives in `.mcp.json`, checked into the team repo, so all team members get the same tool access.

## Key Takeaways

1. **Use the best/biggest model.** Opus is bigger and slower per call, but you write less code and it handles tasks better — net result is faster overall.
   - **How to apply:** Default to Opus for all Claude Code sessions unless cost is a hard constraint.

2. **Run 5-10 Claudes in parallel.** Use `claude.ai/code` tabs alongside local terminal sessions. Hand off reviews or kick off background work while you continue in the terminal. Use `/compact` to manage context across sessions.
   - **How to apply:** Open multiple browser tabs at `claude.ai/code` for parallel tasks; use `/compact` before handing off a session.

3. **Start every session in Plan mode.** Shift+tab twice to enter plan mode. Write a full blueprint first; then execute. A good plan dramatically increases first-shot success rate.
   - **How to apply:** Make shift+tab the first keystroke of every new Claude Code session.

4. **Use custom agents for recurring workflows.** Put workflow-specific instructions in `.claude/agents/<name>.md`. Boris's set: build-validator, code-architect, code-simplifier, oncall-guide, verify-app.
   - **How to apply:** Identify your 3-5 most common post-coding tasks and write an agent file for each.

5. **PostToolUse hook for auto-formatting.** Run `bun run format || true` (or equivalent) after every Write/Edit. Handles the last 10% of formatting issues silently, prevents CI failures.
   - **How to apply:** Add to `.claude/settings.json`: `"PostToolUse": [{"matcher": "Write|Edit", "hooks": [{"type": "command", "command": "<your formatter> || true"}]}]`

6. **Use `/permissions` instead of `--dangerously-skip-permissions`.** Pre-allow safe bash commands by pattern. Check `.claude/settings.json` into the team repo so everyone shares the same allowlist.
   - **How to apply:** Run `/permissions` in Claude Code, add safe patterns (build, test, lint, typecheck commands), commit `.claude/settings.json`.

7. **Give Claude real tools via MCP.** Connect Slack, BigQuery, Sentry (or your equivalents) via `.mcp.json`. Check `.mcp.json` into the team repo.
   - **How to apply:** Create `.mcp.json` with your MCP servers; use Anthropic's official Slack MCP at `https://slack.mcp.anthropic.com/mcp`.

8. **Verify long-running tasks deterministically.** For tasks that run unattended: (a) prompt Claude to verify with a background agent when done, (b) use an agent Stop hook, or (c) use the ralph-wiggum plugin.
   - **How to apply:** Add a Stop hook that runs your test suite or a verify-app agent after every session ends.

9. **Give Claude a verification feedback loop — the most important tip.** If Claude can check its own work (run tests, typecheck, lint), quality is 2-3x higher. This is the single highest-leverage practice.
   - **How to apply:** Ensure your CLAUDE.md includes a "before committing" checklist with typecheck + tests + lint, and that Claude is instructed to run them.

## Notable Commands / Code Snippets

**PostToolUse auto-format hook:**
```json
"PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
        "type": "command",
        "command": "bun run format || true"
    }]
}]
```

**MCP server config (`.mcp.json`):**
```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.anthropic.com/mcp"
    }
  }
}
```

**CLAUDE.md development workflow template:**
```markdown
# 1. Make changes
# 2. Typecheck (fast): bun run typecheck
# 3. Run tests
   # Single suite: bun run test -- "test name"
   # All files: bun run test
# Before committing:
# 4. List files changed: git diff --name-only
# 5. Run lint on changed files: bun run lint/<file>
```

**Pre-allowed permissions (examples):**
```
Bash(bun run build:*)
Bash(bun run test:*)
Bash(bun run lint:file:*)
Bash(bun run typecheck:*)
Bash(bq query:*)
Bash(find:*)
```

## Related Topics

claude-code, workflow, hooks, agents, permissions, mcp, best-practices, how-to
