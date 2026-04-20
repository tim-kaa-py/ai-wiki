---
title: "Beyond permission prompts: making Claude Code more secure and autonomous"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-10-20"
url: "https://www.anthropic.com/engineering/claude-code-sandboxing"
pillar: "building"
tags: [claude-code, sandbox, security, permissions, bubblewrap, seatbelt, claude-code-web]
ingested: "2026-04-20"
source_file: "sources/article/2025-10-20_anthropic_claude-code-sandboxing.md"
---

# Claude Code Sandboxing — Summary

**Source:** David Dworken, Oliver Weller-Davies (Anthropic) | 2025-10-20 | [Link](https://www.anthropic.com/engineering/claude-code-sandboxing)

## TL;DR
OS-level sandbox for Claude Code: filesystem + network isolation via Linux bubblewrap and macOS seatbelt. -84% permission prompts in internal testing. Claude Code on the Web extends this to cloud isolation with creds outside the sandbox.

## Key Concepts

### Sandboxed Bash Tool
Two boundaries: filesystem (restricted dirs) + network (approved hosts only). Covers spawned subprocesses too. Configured via `/sandbox`.

### Claude Code on the Web
Each session in isolated cloud VM. Custom proxy handles git auth — Claude never touches signing keys, even if sandbox is compromised.

## Key Takeaways
1. **Use OS-level isolation, not application-level.** bubblewrap (Linux) / seatbelt (macOS) catch subprocesses too.
   - **How to apply:** for scripted runs of Claude Code, prefer `/sandbox` over `--dangerously-skip-permissions`.
2. **Keep credentials out of the sandbox.** Proxy them via a separate trusted layer.
3. **Open-sourced sandboxing code on GitHub** for building your own safer agents.

## Notable Commands / Snippets
```
/sandbox
```

## Related Topics
sandbox, claude-code-security, bubblewrap, seatbelt, claude-code-web, permissions
