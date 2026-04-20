---
title: "Scaling Managed Agents: Decoupling the brain from the hands"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-04-15"
url: "https://www.anthropic.com/engineering/managed-agents"
pillar: "ecosystem"
tags: [managed-agents, claude, agents, harness, architecture, sandbox, infrastructure]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Scaling Managed Agents: Decoupling the brain from the hands

**Authors:** Lance Martin, Gabe Cemaj, and Michael Cohen

## Article Summary

Anthropic's engineering team describes how Managed Agents—a hosted service for long-horizon agent work—decouples Claude's reasoning capabilities from execution infrastructure to create a more resilient, scalable system.

### Key Design Problem

The team initially housed all agent components (session log, harness, and sandbox) in a single container. This created operational brittleness: "if a container failed, the session was lost." Container failures became difficult to debug and limited flexibility for connecting to customer infrastructure.

### Solution: Decoupling Architecture

The team restructured the system into three independent components:

**The Brain (Harness):** Now stateless and replaceable. When a harness crashes, a new one can recover by calling `wake(sessionId)` and retrieving the event log via `getSession(id)`.

**The Hands (Sandboxes/Tools):** Became interchangeable execution environments accessed through a simple interface: `execute(name, input) → string`. If a container fails, the harness treats it as a tool error and potentially provisions a new one.

**The Session:** A durable, append-only log existing outside Claude's context window. This allows the model to query historical context flexibly without irreversible trimming decisions.

### Security Improvements

By separating the sandbox from credential storage, the team eliminated a critical attack surface. Tokens are either bundled during initialization (like Git credentials) or stored in secure vaults, keeping them unreachable from generated code.

### Performance Gains

Decoupling reduced time-to-first-token by roughly 60% at p50 and over 90% at p95, since containers are now provisioned only when needed rather than at session startup.

### Architectural Philosophy

The design follows the operating systems principle of virtualizing hardware into stable abstractions. Rather than encoding assumptions about Claude's capabilities, Managed Agents provides general interfaces that accommodate future model improvements and different harness implementations.
