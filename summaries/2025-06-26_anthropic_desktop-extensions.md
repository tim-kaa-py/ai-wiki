---
title: "Desktop Extensions: One-click MCP server installation for Claude Desktop"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-06-26"
url: "https://www.anthropic.com/engineering/desktop-extensions"
pillar: "ecosystem"
tags: [mcp, claude-desktop, desktop-extensions, mcpb, packaging, enterprise]
ingested: "2026-04-20"
source_file: "sources/article/2025-06-26_anthropic_desktop-extensions.md"
---

# Desktop Extensions (.mcpb) — Summary

**Source:** Anthropic Engineering | 2025-06-26 | [Link](https://www.anthropic.com/engineering/desktop-extensions)

## TL;DR
`.mcpb` packaging for one-click MCP install in Claude Desktop. Eliminates Node.js/Python prereqs, JSON editing, dependency management. Includes manifest.json, server, deps, optional icon. Enterprise-ready with MDM/Group Policy.

## Key Takeaways
1. **`.mcpb` removes the entire MCP install ceremony for non-technical users.**
   - **How to apply:** if shipping an MCP server publicly, package as `.mcpb` rather than asking users to clone+configure.
2. **Credentials go to OS keychain** — manifest declares config, Claude Desktop validates and stores securely.
3. **Cross-platform via template literals** in manifest (`${__dirname}`, `${user_config.key}`).
4. **Enterprise controls:** MDM (macOS), Group Policy (Windows), pre-install lists, blocklists, private directories, public-directory disable.

## Notable Commands / Snippets
```bash
npx @anthropic-ai/mcpb init
npx @anthropic-ai/mcpb pack
```

## Related Topics
mcp, mcpb-packaging, claude-desktop, enterprise-deployment
