---
title: "Work with sessions (Agent SDK)"
source_type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
url: "https://code.claude.com/docs/en/agent-sdk/sessions"
pillar: "building"
tags: [agent-sdk, sessions, context-management, resume, fork, multi-turn, python, typescript]
ingested: "2026-05-06"
extraction_method: "web-fetch"
---

# Work with sessions (Agent SDK)

> How sessions persist agent conversation history, and when to use continue, resume, and fork to return to a prior run.

A session is the conversation history the SDK accumulates while your agent works: your prompt, every tool call the agent made, every tool result, and every response. The SDK writes it to disk automatically.

**Sessions persist the conversation, not the filesystem.** To snapshot and revert file changes, use file checkpointing.

## Choose an approach

| What you're building | What to use |
|---|---|
| One-shot task: single prompt, no follow-up | Nothing extra. One `query()` call handles it. |
| Multi-turn chat in one process | `ClaudeSDKClient` (Python) or `continue: true` (TypeScript) |
| Pick up after process restart | `continue_conversation=True` / `continue: true` (resumes most recent session) |
| Resume a specific past session | Capture session ID, pass to `resume` |
| Try alternative approach without losing original | Fork the session |

## Continue, resume, and fork

- **Continue**: finds the most recent session in the current directory, no tracking required. Works when running one conversation at a time.
- **Resume**: takes a specific session ID. Required when you have multiple sessions (e.g., one per user).
- **Fork**: creates a new session with a copy of the original's history. Original stays unchanged.

## Automatic session management

### Python: `ClaudeSDKClient`

Handles session IDs internally. Each `client.query()` automatically continues the same session.

```python
async with ClaudeSDKClient(options=options) as client:
    # First query: client captures the session ID internally
    await client.query("Analyze the auth module")
    async for message in client.receive_response():
        print_response(message)

    # Second query: automatically continues the same session
    await client.query("Now refactor it to use JWT")
    async for message in client.receive_response():
        print_response(message)
```

### TypeScript: `continue: true`

Pass `continue: true` on each subsequent `query()` call:

```typescript
// First query: creates a new session
for await (const message of query({
  prompt: "Analyze the auth module",
  options: { allowedTools: ["Read", "Glob", "Grep"] }
})) { ... }

// Second query: continue: true resumes the most recent session
for await (const message of query({
  prompt: "Now refactor it to use JWT",
  options: { continue: true, allowedTools: [...] }
})) { ... }
```

## Capture the session ID

```python
async for message in query(...):
    if isinstance(message, ResultMessage):
        session_id = message.session_id
```

## Resume by ID

Common reasons to resume:
- **Follow up on completed task**: agent already analyzed something; now act on that analysis without re-reading files
- **Recover from a limit**: first run ended with `error_max_turns`; resume with higher limit
- **Restart your process**: captured ID before shutdown

```python
async for message in query(
    prompt="Now implement the refactoring you suggested",
    options=ClaudeAgentOptions(
        resume=session_id,
        allowed_tools=["Read", "Edit", "Write", "Glob", "Grep"]
    )
):
    ...
```

**If resume returns a fresh session**: most common cause is mismatched `cwd`. Sessions are stored under `~/.claude/projects/<encoded-cwd>/*.jsonl` where `<encoded-cwd>` is the absolute path with non-alphanumeric characters replaced by `-`.

## Fork to explore alternatives

```python
# Fork: branch from session_id into a new session
forked_id = None
async for message in query(
    prompt="Instead of JWT, implement OAuth2 for the auth module",
    options=ClaudeAgentOptions(resume=session_id, fork_session=True)
):
    if isinstance(message, ResultMessage):
        forked_id = message.session_id  # The fork's ID, distinct from session_id

# Original session is untouched; resuming it continues the JWT thread
async for message in query(
    prompt="Continue with the JWT approach",
    options=ClaudeAgentOptions(resume=session_id)
):
    ...
```

**Forking branches conversation history, not the filesystem.** If a forked agent edits files, those changes are real. Use file checkpointing to branch file changes.

## Resume across hosts

Session files are local. To resume on a different host:
- **Move the session file**: persist `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl` and restore to same path on new host
- **Don't rely on session resume**: capture results as application state and pass into a fresh session's prompt (often more robust)

Both SDKs expose `listSessions()`, `getSessionMessages()`, `renameSession()`, `tagSession()` for session management.
