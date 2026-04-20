---
title: "Claude Code Sandboxing"
type: "how-to"
pillar: "building"
tags: [claude-code, sandbox, security, permissions, bubblewrap, seatbelt, claude-code-web]
sources:
  - "summaries/2025-10-20_anthropic_claude-code-sandboxing.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
last_updated: "2026-04-20"
---

# Claude Code Sandboxing

OS-level isolation for Claude Code sessions. The sandbox restricts filesystem and network access at the kernel/OS level — catching spawned subprocesses too, which application-level permissioning cannot. Anthropic reports **-84% permission prompts** in internal testing with sandboxing enabled.

## When to Use `/sandbox`

- Running scripts from unknown sources
- Letting Claude exercise a tool that shells out (build systems, test runners, package managers)
- Scripted / unattended runs where you'd otherwise reach for `--dangerously-skip-permissions`

## How It Works

Two boundaries, both enforced outside the agent process:

| Boundary | Linux | macOS |
|----------|-------|-------|
| Filesystem (restricted dirs) | **bubblewrap** | **seatbelt** |
| Network (approved hosts only) | bubblewrap | seatbelt |

Because the sandbox is OS-level, **subprocesses spawned by Claude's bash tool inherit the same restrictions**. This is the key advantage over application-layer permissioning: a Python script Claude runs cannot escape by calling another binary.

## Starting a Sandbox

Inside a Claude Code session:

```
/sandbox
```

Configure filesystem allowlist (directories Claude can read/write) and network allowlist (hosts it can reach). Settings persist per project.

## Claude Code on the Web

The web variant runs each session in an isolated cloud VM. Key design detail: **credentials live outside the sandbox**. A custom proxy handles git authentication — Claude never touches signing keys even if the sandbox is compromised. This is the right pattern for any cloud agent: separate the credential-holding layer from the execution layer.

## Prefer Sandbox Over `--dangerously-skip-permissions`

For scripted runs of Claude Code, `/sandbox` is the correct tool. `--dangerously-skip-permissions` disables all guardrails with no isolation; a sandboxed session can run freely inside known bounds.

## Build Your Own

Anthropic **open-sourced the sandboxing code on GitHub** — useful as a reference implementation for any agent framework needing OS-level isolation.

## Layering With Other Permission Strategies

The three permission strategies compose:

- `/permissions` for the allowlist of routine safe commands
- `--permission-mode auto` for the classifier layer (see [Auto Mode](claude-code-auto-mode.md))
- `/sandbox` for OS-level isolation as the outermost ring

## Related Pages

- [Claude Code Permissions](claude-code-permissions.md)
- [Claude Code Auto Mode](claude-code-auto-mode.md)
- [Claude Code](../tools/claude-code.md)
