---
title: "Packaging MCP Servers as Desktop Extensions (.mcpb)"
type: "how-to"
pillar: "building"
tags: [mcp, mcpb, desktop-extensions, claude-desktop, packaging, enterprise]
sources:
  - "summaries/2025-06-26_anthropic_desktop-extensions.md"
last_updated: "2026-04-20"
---

# Packaging MCP Servers as Desktop Extensions (.mcpb)

`.mcpb` is Anthropic's packaging format for distributing MCP servers to Claude Desktop. One file, one click, no Node.js/Python prerequisites, no JSON editing, no dependency management on the user's side.

## Why .mcpb

Traditional MCP server install requires users to:
- Install Node.js or Python runtimes
- Clone a repo or install a package
- Edit Claude Desktop's config JSON
- Manage credentials manually

`.mcpb` collapses all of that into a double-click. Credentials are collected via a UI prompt and stored in the OS keychain. Runtimes are bundled.

## Create and Pack

Anthropic ships a CLI:

```bash
npx @anthropic-ai/mcpb init    # scaffolds manifest.json in the current dir
npx @anthropic-ai/mcpb pack    # produces <name>.mcpb
```

A `.mcpb` bundle contains:

- `manifest.json` — metadata, entrypoint, required config, capabilities
- Server source/executable
- Bundled dependencies
- Optional icon

## Manifest Essentials

The manifest declares what the extension needs. Cross-platform paths use template literals:

- `${__dirname}` — the unpacked extension directory
- `${user_config.<key>}` — values the user supplied via Claude Desktop's config UI

User-config keys declared in the manifest are what drives the install-time prompt (API keys, server URLs, workspace paths). Claude Desktop validates them and stores secrets in the OS keychain rather than in plaintext config.

## Distribution

- **Public:** submit to the Anthropic extension directory, or host the `.mcpb` file for direct download.
- **Private/internal:** host the file anywhere; users double-click to install.

## Enterprise Deployment

Desktop Extensions are designed for managed environments:

- **MDM (macOS)** and **Group Policy (Windows)** for centralized control.
- **Pre-install lists** — extensions pushed to all users.
- **Blocklists** — explicitly prohibited extensions.
- **Private directories** — point the client at an internal catalog.
- **Disable the public directory** — lock the fleet to vetted extensions only.

## When to Use This vs. Plain MCP

- Shipping to non-technical users → `.mcpb`.
- Internal dev-team tooling where everyone already has the runtime → plain MCP server config is fine.
- Wide public distribution → `.mcpb` removes the support burden of install issues.

## Related

- [MCP](../concepts/mcp.md) — the underlying protocol.
- [Tool Design for Agents](../concepts/tool-design-for-agents.md) — how to write the tools you're packaging.
