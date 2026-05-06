---
title: "Best practices for Claude Code"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/best-practices"
pillar: "building"
tags: [claude-code, best-practices, context-management, claude-md, skills, hooks, subagents, workflow, agentic-engineering]
ingested: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_best-practices.md"
---

# Best practices for Claude Code — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/best-practices)

## TL;DR

Anthropic's current canonical best practices for Claude Code, organized around the root constraint: context fills fast and performance degrades as it does. The highest-leverage pattern is giving Claude verification criteria; everything else is context hygiene, prompt specificity, and knowing when to restart vs. continue.

## Key Takeaways

1. **Verification criteria is the single highest-leverage improvement.** "Implement X" is weak. "Implement X, test cases are A→true, B→false, run the tests" is strong. Claude performs dramatically better when it can close its own feedback loop.
   - **How to apply:** Every task prompt should end with a verification instruction: "verify by running X" or "take a screenshot and compare to the design."

2. **Explore → Plan → Code → Commit is the canonical workflow.** Use plan mode (read-only tools only) for exploration. Press `Ctrl+G` to open the plan in your editor. Then switch to implementation. Planning pays off most when you're unfamiliar with the code or the change spans multiple files.
   - **How to apply:** For any change touching 3+ files or involving unfamiliar code, start in plan mode before allowing edits.

3. **CLAUDE.md quality matters more than length.** Include: bash commands Claude can't guess, style rules that differ from defaults, test runners, repo etiquette. Exclude: things Claude can figure out from reading code, standard conventions, frequently-changing info. Add "IMPORTANT" or "YOU MUST" for high-adherence rules. Check it into git.
   - **How to apply:** Run `/init` to generate a starter CLAUDE.md. Prune aggressively — every line that doesn't change behavior wastes context.

4. **Course-correct early, not late.** `Esc` stops Claude mid-action with context preserved. `Esc+Esc` / `/rewind` reverts code. After two failed corrections on the same issue, `/clear` and write a better prompt. Trying to correct in-context after many turns is less effective than restarting with a clearer prompt.
   - **How to apply:** Set a personal rule: if you've corrected Claude on the same issue twice, stop and restart with a more specific prompt.

5. **Use subagents for investigation tasks.** "Use subagents to investigate X" keeps large file reads out of your main context. The subagent explores and returns a summary — not a shortcut but an architectural choice about context isolation.
   - **How to apply:** Any task phrased as "investigate/explore/research" should explicitly use subagents: "Use a subagent to investigate how our auth system handles token refresh."

6. **`/btw` for side questions, `/clear` between tasks.** `/btw` answers quick questions in a dismissible overlay without adding to context. `/clear` resets between unrelated tasks. `/compact <instructions>` for custom compaction focus. Use them actively, not just when context runs out.
   - **How to apply:** Treat `/clear` like a git stash — use it between logically distinct tasks even when context isn't full.

7. **Fan-out pattern for batch operations.** Loop Claude over files with `claude -p "..." --allowedTools "Edit,Bash(git commit *)"` to restrict scope in batch mode. The Writer/Reviewer pattern (Session A implements, Session B reviews with fresh context) exploits the fact that a fresh context has no bias toward code it just wrote.
   - **How to apply:** For large migrations, don't process all files in one session. Use a shell loop with `claude -p` and commit after each file.

## Notable Commands / Code Snippets

```bash
# Fan-out: process multiple files in parallel sessions
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

```bash
# One-off query with structured output
claude -p "List API endpoints" --output-format json
```

```
# Key session management controls
Esc            # Stop mid-action (context preserved)
Esc+Esc        # Rewind to previous state
/rewind        # Same as Esc+Esc, with selective restore
/clear         # Reset context between tasks
/compact       # Compact with focus: /compact "keep the list of modified files"
/btw <question> # Side question without adding to context
Ctrl+G         # Open current plan in editor
```

## Related Topics

claude-code, best-practices, context-management, claude-md, skills, hooks, subagents, workflow, agentic-engineering
