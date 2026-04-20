---
title: "Scaling Managed Agents: Decoupling the brain from the hands"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-04-15"
url: "https://www.anthropic.com/engineering/managed-agents"
pillar: "ecosystem"
tags: [managed-agents, claude, agents, harness, architecture, sandbox]
ingested: "2026-04-20"
source_file: "sources/article/2026-04-15_anthropic_scaling-managed-agents.md"
---

# Scaling Managed Agents — Summary

**Source:** Lance Martin, Gabe Cemaj, Michael Cohen (Anthropic) | 2026-04-15 | [Link](https://www.anthropic.com/engineering/managed-agents)

## TL;DR
Anthropic split Managed Agents into three independent components — stateless harness ("brain"), interchangeable sandboxes ("hands"), and durable session log — analogous to OS hardware virtualization. Cut p95 time-to-first-token by 90%+ and removed credentials from sandbox attack surface.

## Key Concepts

### Brain / Hands / Session split
- **Brain (harness):** stateless, replaceable. Recovery via `wake(sessionId)` + `getSession(id)`.
- **Hands (tools/sandboxes):** uniform interface `execute(name, input) → string`. Tool-level errors trigger re-provisioning.
- **Session:** append-only log outside Claude's context window — model can re-query history without irreversible trimming.

## Key Takeaways
1. **Failures of one component shouldn't kill the session.** Old design lost everything on container failure.
   - **How to apply:** when designing your own agent harness, give each layer (state, reasoning, execution) independent lifecycles.
2. **Credentials live outside the sandbox.** Bundled at init (Git creds) or in vaults — generated code can't reach them.
3. **Lazy container provisioning** cut p50 TTFT by 60%, p95 by 90%+.
4. **OS-as-analogy:** treat the harness as a virtualization layer over model capabilities so future model upgrades plug in without rewrites.

## Related Topics
managed-agents, harness-engineering, agent-architecture, sandbox, infrastructure
