---
title: "Work with sessions (Agent SDK)"
description: "Anthropic's docs on Agent SDK sessions, covering continue, resume, and fork patterns for persisted JSONL conversation history"
type: "summary"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/agent-sdk/sessions"
pillar: "building"
tags: [agent-sdk, sessions, context-management, resume, fork, multi-turn, python, typescript]
timestamp: "2026-05-06"
source_file: "sources/articles/2026-05-06_claude-code-docs_agent-sdk-sessions.md"
---

# Work with sessions (Agent SDK) — Summary

**Source:** Anthropic (Claude Code Docs) | 2026-05-06 | [Link](https://code.claude.com/docs/en/agent-sdk/sessions)

## TL;DR

Sessions in the Agent SDK are the persisted conversation history written to disk as JSONL files — not filesystem state. Three patterns: `continue` (resume most recent session by cwd, no tracking needed), `resume` (specific session ID, required for multi-user scenarios), and `fork` (branch the conversation history while leaving the original intact). The key gotcha: sessions are keyed by `cwd`, so a mismatched working directory gives you a fresh session instead of the one you expected.

## Key Takeaways

1. **Sessions persist conversation, not filesystem.** The JSONL file captures every prompt, tool call, tool result, and response. It does NOT snapshot file changes. To revert file changes across sessions, use file checkpointing — a separate mechanism.
   - **How to apply:** Never assume that resuming a session also restores file state. Always handle file state separately if your use case requires it.

2. **Choose the right pattern for your architecture.** One-shot → nothing extra. Multi-turn in one process → `ClaudeSDKClient` (Python) or `continue: true` (TypeScript). Resume after restart → `continue_conversation=True`. Multiple sessions (one per user) → capture and pass session ID. Explore alternatives → `fork`.
   - **How to apply:** For multi-user applications, always capture the session ID from `ResultMessage` and store it per user — don't use `continue` which finds the most recent session globally.

3. **Sessions are stored under `~/.claude/projects/<encoded-cwd>/`.** The directory name is the absolute cwd path with non-alphanumeric chars replaced by `-`. If a resume returns a fresh session, mismatched `cwd` is the most common cause.
   - **How to apply:** Ensure the same `cwd` is set when creating and resuming sessions. In production: always set cwd explicitly, never rely on the current working directory being consistent.

4. **Fork to explore alternatives without losing the original.** `fork_session=True` creates a new session with a copy of the original's history. The original session ID still works for the original thread. The forked session gets its own ID from `ResultMessage`.
   - **How to apply:** Use forking for A/B exploration: "implement with JWT" vs "implement with OAuth2" — run both in parallel and compare results before committing to one.

5. **Forking branches conversation, not filesystem.** If a forked agent edits files, those changes are real and affect the shared filesystem. Filesystem isolation requires file checkpointing — forking alone is not sufficient.
   - **How to apply:** When using forks for alternative implementations, run each in a separate git worktree or branch to isolate file changes.

6. **Cross-host session handling requires explicit file management.** Sessions are local JSONL files. To resume on a different host: either move `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl` to the same path on the new host, or capture results as application state and pass into a fresh session (often more robust for distributed systems).
   - **How to apply:** For production distributed systems, don't rely on session files for cross-host continuity. Capture key results as application state instead.

## Notable Commands / Code Snippets

```python
# Python: ClaudeSDKClient handles sessions automatically
async with ClaudeSDKClient(options=options) as client:
    await client.query("Analyze the auth module")
    async for message in client.receive_response():
        print_response(message)
    # Automatically continues same session
    await client.query("Now refactor it to use JWT")
    async for message in client.receive_response():
        print_response(message)
```

```typescript
// TypeScript: continue: true for subsequent queries
for await (const message of query({
  prompt: "Now refactor it to use JWT",
  options: { continue: true, allowedTools: [...] }
})) { ... }
```

```python
# Capture session ID
async for message in query(...):
    if isinstance(message, ResultMessage):
        session_id = message.session_id

# Resume by ID
async for message in query(
    prompt="Now implement the refactoring you suggested",
    options=ClaudeAgentOptions(
        resume=session_id,
        allowed_tools=["Read", "Edit", "Write", "Glob", "Grep"]
    )
):
    ...
```

```python
# Fork session
async for message in query(
    prompt="Instead of JWT, implement OAuth2",
    options=ClaudeAgentOptions(resume=session_id, fork_session=True)
):
    if isinstance(message, ResultMessage):
        forked_id = message.session_id  # distinct from session_id
```

## Related Topics

agent-sdk, sessions, context-management, resume, fork, multi-turn, python, typescript
