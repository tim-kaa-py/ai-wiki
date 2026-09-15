---
title: "Claude Code Sandboxing"
description: "How OS-level sandboxing restricts filesystem and network access for Claude Code sessions"
type: "how-to"
pillar: "building"
tags: [claude-code, sandbox, security, permissions, bubblewrap, seatbelt, claude-code-web]
sources:
  - "summaries/2025-10-20_anthropic_claude-code-sandboxing.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
  - "summaries/2026-08-21_anthropic_the-ai-native-sdlc-playbook.md"
timestamp: "2026-09-15"
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

## Managed Settings: Closing the Gaps Permissions Leave

For an organisation, the layers above need to be non-overridable. Anthropic's AI-Native SDLC playbook (August 2026) puts them in **managed settings**, the org-deployed layer users cannot loosen, and explains each block by the gap it closes:

- **Tool-level `deny` on `WebFetch` does not stop `curl` in a shell.** Hence the OS-level sandbox with a domain allowlist, plus explicit `Bash(curl *)` / `Bash(wget *)` denies.
- **`permissions.deny` does not stop a sandboxed shell reading `~/.ssh`.** Hence the sandbox `credentials` block.
- **A user can otherwise add their own hooks, MCP servers or rules.** Hence the managed-only switches.

Regulated-enterprise excerpt (trimmed):

```json
{
  "permissions": {
    "deny": ["Read(.env*)", "Read(./secrets/**)", "WebFetch", "Bash(curl *)", "Bash(wget *)"],
    "allow": ["Bash(git *)", "Bash(make build)", "Bash(make test)", "Bash(make lint)"],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "credentials": { "files": [{ "path": "~/.ssh", "mode": "deny" }] }
  },
  "allowManagedHooksOnly": true,
  "allowManagedMcpServersOnly": true,
  "requiredMinimumVersion": "2.1.193"
}
```

`failIfUnavailable` and `allowUnsandboxedCommands: false` "make the sandbox a gate": Claude Code refuses to start when the sandbox cannot initialise, and a command that fails inside the sandbox cannot be retried outside it. The `credentials` block also strips the named secrets from the environment of every sandboxed command.

The playbook is explicit that this is "a starting point to tailor, rather than a recommendation to copy. Every deny trades against capability." **How to apply:** derive the deny/allow balance from the repository's data classification, not from the example. Pair it with the pre-allow guidance on [Claude Code Permissions](claude-code-permissions.md#what-to-pre-allow) so parallel sessions don't stall on prompts for commands the organisation already considers safe. *(Source: Anthropic's AI-Native SDLC playbook, 2026-08-21)*

## Related Pages

- [Claude Code Permissions](claude-code-permissions.md)
- [Claude Code Auto Mode](claude-code-auto-mode.md)
- [Claude Code](../tools/claude-code.md)
- [Claude Code Hooks for Memory](claude-code-hooks-memory.md) — hooks as the deterministic gate layer managed settings lock down
- [AI-Native SDLC](../concepts/ai-native-sdlc.md) — where managed settings sit in Anthropic's lifecycle governance model
