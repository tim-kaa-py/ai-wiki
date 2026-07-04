---
title: "Best practices for Claude Code"
type: "docs"
channel: "Anthropic (Claude Code Docs)"
date: "2026-05-06"
resource: "https://code.claude.com/docs/en/best-practices"
pillar: "building"
tags: [claude-code, best-practices, context-management, claude-md, skills, hooks, subagents, workflow, agentic-engineering]
timestamp: "2026-05-06"
extraction_method: "web-fetch"
---

# Best practices for Claude Code

> Tips and patterns for getting the most out of Claude Code, from configuring your environment to scaling across parallel sessions.

Most best practices are based on one constraint: **Claude's context window fills up fast, and performance degrades as it fills.** The context window holds your entire conversation including every message, every file Claude reads, and every command output.

## Give Claude a way to verify its work

The single highest-leverage thing you can do. Claude performs dramatically better when it can verify its own work.

| Strategy | Before | After |
|---|---|---|
| **Provide verification criteria** | "implement validateEmail" | "write validateEmail. test cases: user@example.com → true, invalid → false. run the tests after." |
| **Verify UI changes visually** | "make the dashboard look better" | "[paste screenshot] implement this design. take a screenshot, compare to original, fix differences." |
| **Address root causes** | "the build is failing" | "the build fails with [error]. fix it and verify the build succeeds. address root cause, don't suppress." |

UI changes can be verified using Claude in Chrome extension. Your verification can be a test suite, linter, or Bash command.

## Explore first, then plan, then code

Use plan mode to separate exploration from execution:

1. **Explore** (plan mode): Claude reads files without making changes
2. **Plan** (plan mode): Ask Claude to create a detailed implementation plan. Press `Ctrl+G` to open in editor.
3. **Implement** (default mode): Let Claude code, verifying against the plan
4. **Commit**: Ask Claude to commit with a descriptive message and open a PR

Planning is most useful when: you're uncertain about the approach, the change modifies multiple files, or you're unfamiliar with the code. For small tasks with clear scope, skip the plan.

## Provide specific context in your prompts

| Strategy | Before | After |
|---|---|---|
| **Scope the task** | "add tests for foo.py" | "write a test for foo.py covering the edge case where the user is logged out. avoid mocks." |
| **Point to sources** | "why does ExecutionFactory have a weird api?" | "look through ExecutionFactory's git history and summarize how its api came to be" |
| **Reference existing patterns** | "add a calendar widget" | "look at HotDogWidget.php as a pattern example. follow the pattern to implement a new calendar widget..." |

### Provide rich content
- Reference files with `@` — Claude reads the file before responding
- Paste images directly
- Give URLs for documentation
- Pipe in data: `cat error.log | claude`

## Configure your environment

### Write an effective CLAUDE.md

Run `/init` to generate a starter CLAUDE.md. Keep it short and human-readable:

| Include | Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out by reading code |
| Code style rules that differ from defaults | Standard conventions Claude already knows |
| Testing instructions and test runners | Detailed API documentation (link instead) |
| Repository etiquette (branch naming, PR conventions) | Information that changes frequently |
| Developer environment quirks (required env vars) | Long explanations or tutorials |

Keep CLAUDE.md under 200 lines. If a line wouldn't change Claude's behavior, cut it. Bloated CLAUDE.md files cause Claude to ignore your actual instructions.

You can add emphasis ("IMPORTANT", "YOU MUST") to improve adherence. Check CLAUDE.md into git so your team can contribute.

### Configure permissions

Three ways to reduce interruptions while staying in control:
- **Auto mode**: classifier model reviews commands, blocks only what looks risky
- **Permission allowlists**: permit specific known-safe tools like `npm run lint`
- **Sandboxing**: OS-level isolation that restricts filesystem and network access

### Use CLI tools

Tell Claude to use CLI tools (`gh`, `aws`, `gcloud`, `sentry-cli`) when interacting with external services. Claude can also learn unfamiliar CLI tools: "Use 'foo-cli-tool --help' to learn about foo, then use it to solve X."

### Set up hooks

Hooks run scripts automatically at specific points in Claude's workflow. Unlike CLAUDE.md instructions (advisory), hooks are deterministic and guarantee the action happens. Ask Claude to write hooks for you: "Write a hook that runs eslint after every file edit."

### Create skills

Skills extend Claude with domain knowledge. Claude applies them automatically when relevant, or you invoke with `/skill-name`. Use `disable-model-invocation: true` for skills with side effects.

### Create custom subagents

Define specialized assistants in `.claude/agents/`. Subagents run in their own context with their own allowed tools — useful for tasks that read many files without cluttering your main conversation.

## Communicate effectively

### Ask codebase questions
Use Claude for onboarding: "How does logging work?", "What edge cases does CustomerOnboardingFlowImpl handle?", "Why does this code call foo() instead of bar()?"

### Let Claude interview you

For larger features:
```
I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.
Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs.
Once done, write a complete spec to SPEC.md.
```

## Manage your session

### Course-correct early and often

- `Esc`: stop Claude mid-action, context preserved
- `Esc + Esc` or `/rewind`: restore previous conversation and code state
- `"Undo that"`: have Claude revert its changes
- `/clear`: reset context between unrelated tasks

If you've corrected Claude more than twice on the same issue, run `/clear` and start fresh with a more specific prompt.

### Manage context aggressively

- Use `/clear` frequently between tasks
- Use `/compact <instructions>` for custom compaction focus
- Use `/btw` for quick questions that don't need to stay in context (answer appears in dismissible overlay)
- Customize compaction in CLAUDE.md: "When compacting, always preserve the full list of modified files and any test commands"

### Use subagents for investigation

```
Use subagents to investigate how our authentication system handles token
refresh, and whether we have any existing OAuth utilities I should reuse.
```

Subagents explore the codebase and report back summaries without cluttering your main conversation.

### Rewind with checkpoints

Every action Claude makes creates a checkpoint. Double-tap `Escape` or run `/rewind`. You can restore conversation only, code only, or both. Checkpoints persist across sessions.

### Resume conversations

Run `claude --continue` to pick up the most recent session. Use `/rename` to name sessions like branches: each workstream gets its own persistent context.

## Automate and scale

### Non-interactive mode

```bash
claude -p "your prompt"                           # One-off queries
claude -p "List API endpoints" --output-format json  # Structured output
```

### Multiple Claude sessions

Options for parallel work:
- **Worktrees**: separate CLI sessions in isolated git checkouts
- **Desktop app**: manage multiple local sessions visually
- **Claude Code on the web**: Anthropic-managed cloud infrastructure
- **Agent teams**: automated coordination with shared tasks and messaging

**Writer/Reviewer pattern**: Session A implements, Session B reviews with fresh context (no bias toward code it just wrote).

### Fan out across files

```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

Use `--allowedTools` to restrict what Claude can do in batch operations.

## Common failure patterns to avoid

- **Kitchen sink session**: mixing unrelated tasks → use `/clear` between tasks
- **Correcting over and over**: polluted context → after two failed corrections, `/clear` and write a better prompt
- **Over-specified CLAUDE.md**: too long means rules get lost → ruthlessly prune
- **Trust-then-verify gap**: plausible-looking code doesn't handle edge cases → always provide verification
- **Infinite exploration**: "investigate" without scope → use subagents or scope narrowly
