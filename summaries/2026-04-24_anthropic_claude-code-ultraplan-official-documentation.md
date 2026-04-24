---
title: "Claude Code Ultraplan — Official Documentation"
source_type: "docs"
channel: "Anthropic"
date: "2026-04-24"
url: "https://code.claude.com/docs/en/ultraplan"
pillar: "building"
tags: [claude-code, planning, how-to, reference, workflow]
ingested: "2026-04-24"
source_file: "sources/articles/2026-04-24_anthropic_claude-code-ultraplan-official-documentation.md"
---

# Claude Code Ultraplan — Official Documentation — Summary

**Source:** Anthropic | 2026-04-24 | [Link](https://code.claude.com/docs/en/ultraplan)

## TL;DR

Ultraplan offloads planning from your CLI to a cloud-hosted Claude Code session. You draft the plan in your browser with inline comments and emoji reactions, then choose to execute it in the cloud or teleport it back to your terminal. Requires a GitHub repo and a Claude Code on the web account.

## Key Concepts

### Ultraplan
A research-preview feature that hands planning tasks from the local CLI to Anthropic's cloud infrastructure running Claude Code in plan mode. Requires v2.1.91+.

### Status Indicators
Three states shown in the CLI while the cloud session works:
- `◇ ultraplan` — researching codebase and drafting plan
- `◇ ultraplan needs your input` — Claude has a clarifying question
- `◆ ultraplan ready` — plan is ready for browser review

### Review Surface
The web interface provides three interaction models:
- **Inline comments**: highlight a passage and leave feedback for Claude to address
- **Emoji reactions**: quick signal (approval/concern) without full comment
- **Outline sidebar**: jump between plan sections for navigation

### Execution Modes
Two choices after plan approval:
- **Execute on the web**: Claude implements the plan in the cloud session; creates PR from web interface
- **Teleport back to terminal**: send plan to waiting CLI for local execution with full environment access

## Key Takeaways

1. **Launch ultraplan** via `/ultraplan <prompt>`, include `ultraplan` keyword in a normal prompt, or choose "No, refine with Ultraplan" from a local plan's approval dialog.
   - **How to apply**: Use the command form for explicit control, keyword form for natural conversation, or refinement path when local plan isn't quite right.

2. **Monitor progress** via CLI status indicator or `/tasks` command; stop ultraplan via `/tasks` if needed (archives the cloud session, clears indicator).
   - **How to apply**: Check status before trying to execute; use `/tasks` for session link and agent activity details.

3. **Iterate on the plan** in the browser as many times as needed before choosing execution location.
   - **How to apply**: Use inline comments for targeted feedback; use emoji reactions for quick signals; ask Claude to revise and present updated draft.

4. **Choose execution location** based on your context needs: web for cloud-only work and easy PR creation, terminal for full local environment access.
   - **How to apply**: If you need your local tools/files, teleport to terminal. If you're purely remote or prefer cloud isolation, execute on the web.

5. **Teleport to terminal gives three options**: inject plan into current conversation, start fresh session, or save plan to file for later.
   - **How to apply**: "Implement here" for continuous context; "Start new session" for clean slate; "Cancel" to save and return later.

## Scope Note

Covers the official ultraplan workflow end-to-end. See Nate Herk's demonstration video (2026-04-06) for multi-agent architecture details, speed/token comparisons to local plan mode, and gotchas (CLI-only, skill invocation, Git requirement).

## Related Topics

claude-code, planning, how-to, reference, workflow
