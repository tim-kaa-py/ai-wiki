---
title: "Claude Code Tips from the Creator (Boris Cherny Thread)"
source_type: "article"
channel: "Boris Cherny (@bcherny)"
date: "2026-01-02"
url: "https://x.com/bcherny"
pillar: "building"
tags: [claude-code, workflow, hooks, agents, permissions, mcp, best-practices, how-to]
ingested: "2026-04-15"
extraction_method: "user-pasted"
---

Twitter/X thread by Boris Cherny (@bcherny), creator of Claude Code. Posted Jan 2. Tips 3, 4, 8 not captured in screenshots.

---

**1/** I use Opus 4.5 with everything. It's the best coding model. I've even used [Sonnet], and even though [Opus] it's bigger & slower than Sonnet, since you have to code less and it's better at the task, it's actually always faster overall.

**2/** I run 5-10 Claudes on claude.ai/code in parallel with my local Claudes. As I code in my terminal, I will often hand off quick reviews to the AI, or manually kick off sessions in Chrome, and sometimes I will /compact back and forth. I also start a test [session].

*[Screenshot shows Claude Code interface with queued agents: "Verify agent URLs are correct", "Deprecate statamic and migrate to readwrite", "Add fizz command with parallel agent research", "Investigate bulk formatting bug"]*

**[CLAUDE.md workflow shown in screenshots]:**
```
# Always run not 'test_name' or...
# 1. Make changes
# 2. Typecheck (fast)
   bun run typecheck
# 3. Run tests
   # Single suite: bun run test -- "test name"
   # All files: bun run test
# Before committing:
# 4. List files changed: git diff --name-only
# 5. Specific files: bun run lint/<file> bun run test
```

**5/** During code review, I will often log Claude on my computer or iPad to pull new code to claude.ai/code at the PR. We use the Claude Code GitHub action for PR review.

**6/** Most sessions start in Plan mode (shift+tab twice). My goal is to write a full Blueprint/plan, then pull back and iterate with Claude to figure out how it went and what's left over (Claude can usually 1-shot it with a good plan). A good plan is really [important].

*[Shows Claude Code /plan mode toggle: shift+tab to cycle between auto/plan/default]*

**7/** I use commands (agents) regularly. `code-simplifier` simplifies the code after Claude is done working. `verify-app` has detailed instructions for verifying app status. On each commit, I run the following workflow. Most of this is standardizing the most common workflows that matter.

*[Shows .claude folder structure:]*
```
.claude
  agents/
    build-validator.md
    code-architect.md
    code-simplifier.md
    oncall-guide.md
    verify-app.md
```

**9/** We use a PostToolUse hook to format Claude's code. Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later.

```json
"PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
        "type": "command",
        "command": "bun run format || true"
    }]
}]
```

**10/** I don't use `--dangerously-skip-permissions`. Instead, I use `/permissions` to pre-allow common bash commands that I know are safe in my environment, to avoid unnecessary permission prompts. Most of these are checked into `.claude/settings.json` and shared with the team.

*[Shows /permissions panel — pre-allowed commands:]*
```
Bash(bq query:*)
Bash(bun run build:*)
Bash(bun run lint:file:*)
Bash(bun run test:*)
Bash(bun run typecheck:*)
Bash(cc:*)
Bash(comm:*)
Bash(find:*)
```

**11/** Claude Code uses all my tools for me. It often searches and posts to Slack (via the MCP server), runs BigQuery queries to answer analytics questions (using bq CLI), grabs error logs from Sentry, etc. The Slack MCP configuration is checked into our `.mcp.json` and shared with [the team].

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

**12/** For very long-running tasks, I will either (a) prompt Claude to verify its work with a background agent when it's done, (b) use an agent Stop hook to do that more deterministically, or (c) use the ralph-wiggum plugin (originally dreamt up by @GeoffreyHuntley).

*[Shows terminal: "Reticulating... (1d 2h 47m · ↓ 2.4m tokens · thinking)"]*

**13/** A final tip: probably the most important thing to get great results out of Claude Code — give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result. Claude tests every single change I land to [...].
