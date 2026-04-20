---
title: "Desktop Extensions: One-click MCP server installation for Claude Desktop"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-06-26"
url: "https://www.anthropic.com/engineering/desktop-extensions"
pillar: "ecosystem"
tags: [mcp, claude-desktop, desktop-extensions, mcpb, packaging, enterprise]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Desktop Extensions: One-click MCP Server Installation for Claude Desktop

**Published:** Jun 26, 2025

## Overview

Anthropic introduced Desktop Extensions (`.mcpb` files), a new packaging format that simplifies installing Model Context Protocol (MCP) servers for Claude Desktop users. Instead of requiring terminal commands and manual configuration, users can now install extensions by downloading a file and clicking "Install."

## The Problem Being Solved

Previous MCP installation required developers to have runtime environments like Node.js or Python installed, manually edit JSON configuration files, manage dependencies, search for servers on GitHub, and manually update installations. These barriers made powerful local servers inaccessible to non-technical users.

## How Desktop Extensions Work

A Desktop Extension bundles an entire MCP server with dependencies into a single `.mcpb` ZIP archive containing:

- `manifest.json` (required metadata file)
- Server implementation files
- All bundled dependencies
- Optional icon graphic

The manifest specifies server type (Node.js, Python, or binary), entry points, user configuration requirements, and feature declarations. Claude Desktop handles runtime management, automatic updates, and secure storage of sensitive credentials in the OS keychain.

## Key Features

**User Configuration:** Extensions declare what information they need (API keys, file paths) through manifest schemas.

**Cross-Platform Support:** Manifests can include platform-specific configurations for Windows, macOS, and Linux, using template literals like `${__dirname}` for installation paths and `${user_config.key}` for user-provided values.

**Built-in Discovery:** A curated extension directory in Claude Desktop allows browsing and one-click installation.

## Development Process

```
npx @anthropic-ai/mcpb init
npx @anthropic-ai/mcpb pack
```

## Enterprise Security

- Group Policy (Windows) and MDM (macOS) support
- Pre-installation of approved extensions
- Blocklists for specific extensions or publishers
- Private extension directories
- Option to disable the public directory

## Open Ecosystem Commitment

Anthropic open-sourced the complete Desktop Extension specification, toolchain, packaging tools, and reference implementations.
