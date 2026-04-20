---
title: "Beyond permission prompts: making Claude Code more secure and autonomous"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-10-20"
url: "https://www.anthropic.com/engineering/claude-code-sandboxing"
pillar: "building"
tags: [claude-code, sandbox, security, permissions, bubblewrap, seatbelt, claude-code-web]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Beyond permission prompts: making Claude Code more secure and autonomous

**Published:** October 20, 2025
**Authors:** David Dworken and Oliver Weller-Davies, with contributions from Meaghan Choi, Catherine Wu, Molly Vorwerck, Alex Isken, Kier Bradwell, and Kevin Garcia

## Article Summary

Anthropic introduced two new sandboxing features for Claude Code designed to enhance security while reducing permission prompts by 84% in internal testing.

### Key Features

**Sandboxed Bash Tool**
The system uses "operating system-level features to enable two boundaries: filesystem isolation" and "network isolation." Filesystem isolation restricts Claude's access to specific directories, while network isolation limits connections to approved servers. This approach prevents prompt-injected instances from stealing credentials or downloading malware.

The implementation leverages Linux bubblewrap and macOS seatbelt technologies to enforce restrictions at the OS level, covering not just direct interactions but also spawned subprocesses.

**Claude Code on the Web**
This cloud-based sandbox executes each session in isolation while keeping sensitive credentials outside the sandboxed environment. A custom proxy service handles git authentication, ensuring Claude cannot directly access signing keys or git credentials—protecting users even if the sandbox code is compromised.

### Getting Started

- Run `/sandbox` in Claude to configure the bash tool
- Visit claude.com/code to try Claude Code on the web
- Access open-sourced sandboxing code on GitHub for building safer agents
