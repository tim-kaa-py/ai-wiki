---
title: "How Claude Code works"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/how-claude-code-works"
pillar: "building"
tags: [claude-code, agentic-loop, harness-engineering, tools, sessions, context-management, best-practices]
ingested: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_how-claude-code-works.md"
---

# How Claude Code works — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/how-claude-code-works)

## TL;DR

Claude Code is an agentic harness around Claude models: it provides tools, context management, and execution infrastructure that turn a language model into a capable coding agent. The core loop is **gather context → take action → verify results**, repeated as needed. Everything Claude can do comes from tools; without them it can only output text.

## Key Takeaways

1. **Claude Code is a harness, not a model.** The model reasons; the harness provides tools, manages context, and handles execution. Understanding this distinction matters when things go wrong — the failure is often in the harness layer (what context was provided, which tools were allowed) not in the model itself.
   - **How to apply:** When Claude does something unexpected, ask "what did it see?" first, not "why did it reason wrong?"

2. **Five tool categories power all agentic behavior.** File operations, Search, Execution, Web, and Code intelligence. If Claude can't do something, it's usually because no tool covers it — that's the gap MCP or hooks fill.
   - **How to apply:** Before adding complexity, check whether a built-in tool already covers your need.

3. **Verify-first prompting dramatically improves results.** Providing test cases, screenshots, or runnable checks gives Claude a feedback loop. "Fix the bug" is weak; "fix the bug and verify tests pass" is strong.
   - **How to apply:** Add "verify by running X" to every task prompt.

4. **Sessions are independent by default.** Each new session starts fresh. Persistence comes from CLAUDE.md (you write) and auto memory (Claude writes). Don't rely on Claude "remembering" previous sessions without these mechanisms.
   - **How to apply:** Keep important project conventions in CLAUDE.md; let Claude save learned patterns to auto memory.

5. **Checkpoints enable safe experimentation.** Every file edit is snapshotted before execution. Double-tap `Esc` or use `/rewind` to restore previous state, independently for conversation and code.
   - **How to apply:** Work boldly — the checkpoint safety net means you can undo anything Claude does.

6. **Permission modes trade safety for speed.** Default mode asks before actions. Auto-accept edits removes those prompts for file operations. Plan mode restricts to read-only tools. Cycle with Shift+Tab during a session.
   - **How to apply:** Use plan mode to explore large unfamiliar codebases before allowing edits.

## Notable Commands / Code Snippets

```bash
claude --model <name>       # Start with specific model
claude --continue           # Resume most recent session
```

```
/model                      # Switch model during session
/context                    # Show context usage breakdown
/rewind                     # Restore previous conversation + code state
Shift+Tab                   # Cycle permission modes
```

## Related Topics

claude-code, agentic-loop, harness-engineering, tools, sessions, context-management, best-practices
