---
title: "Context Filter (WAF for Prompt Injection)"
type: "concept"
pillar: "building"
tags: [security, prompt-injection, agents, skills, context-engineering, waf, supply-chain]
sources:
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
timestamp: "2026-05-05"
---

# Context Filter (WAF for Prompt Injection)

A **pre-agent filter that scans incoming context for prompt-injection patterns *before* it reaches the LLM**. Patrick Debois's framing in *Context Is the New Code* (Tessl, AI Engineer 2026-05-03): this is the AI equivalent of a Web Application Firewall — filter at the perimeter, not at the tool call. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

## The Load-Bearing Argument: Sandboxes Don't Catch This

The mainstream defense against malicious agent behavior is sandboxing — let the agent execute, but constrain *what* it can execute. That defense has a hole when the threat is prompt injection embedded in a downloaded skill or `agent.md` file:

1. Coding agents **auto-load** `agent.md` / `skill.md` files into the prompt on download, before any user code runs.
2. A sandbox boundary kicks in when the agent **executes** something — not when it **reads context** into the model.
3. Therefore, by the time the sandbox is enforcing anything, the malicious instructions are already inside the LLM's context window and may have already steered the agent's plan.

The defense has to live **upstream of the LLM** — a filter that scans context before it's loaded — not downstream around execution. This is the structural reason Debois reaches for the WAF analogy.

## What the Filter Looks At

Anything that gets pulled into the agent's context from outside the trusted boundary:

- Downloaded skills (`SKILL.md` plus bundled `references/`, `examples/`, scripts)
- `agent.md` / `AGENTS.md` files from third-party repos or libraries
- MCP-fetched documents (vendor docs, runbooks, ticket bodies)
- Web-fetched pages used as context
- Pasted user input in agent UIs (the classic indirect-injection vector)
- LLM-generated context from upstream models (chained agents)

What it scans for:

- Known injection patterns ("ignore previous instructions," role-confusion attempts, embedded `system:` markers, encoded payloads)
- Tool-name impersonation (instructions that mimic legitimate tool descriptions)
- Credential and secret patterns inside skill bundles
- Suspicious URL fetches inside `!`-syntax preprocessing or scripts
- Deltas against a known-good version of the artifact (when re-pulling)

## Why "WAF" Is the Right Analogy

A Web Application Firewall sits in front of an HTTP service, terminates the connection, inspects the payload against a ruleset, and either passes, drops, or quarantines. It is a network-layer abstraction that doesn't know your application's domain logic — it just knows that certain shapes of input cause certain shapes of harm.

A context filter is the same shape:

- It sits in front of the LLM call (or in front of the harness's context-loader).
- It inspects every text artifact about to enter the context window.
- It blocks, drops, or quarantines based on a ruleset of injection patterns.
- It does not understand your task — it understands shapes of harm.

WAF as analogy is also the right *organizational* analogy: WAFs are run by the security team, not the application team. A context filter is the same — owned by whoever owns supply-chain security, not by the prompt authors.

## Where It Slots Into the CDLC

Debois places the context filter at the **perimeter of the Distribute and Observe phases** of the [Context Development Life Cycle](context-development-life-cycle.md):

- **Distribute:** every downloaded skill or shared `agent.md` is scanned at install time and at every update.
- **Observe:** every external text artifact pulled in at runtime (MCP fetches, web fetches, ticket bodies) passes through the filter before the agent sees it.

Pairs naturally with [AI SBOM](ai-sbom.md) — the SBOM tells you *what* is in a context package; the filter tells you whether the *contents* are safe to load. SBOM is provenance; filter is content inspection.

## Implementation Sketch

This is a structural pattern, not a product yet. A first-pass implementation:

```
incoming_context_text
    │
    ▼
[Static pattern scanner]   ──► quarantine on match
    │
    ▼
[LLM-classifier prefilter] ──► quarantine on flag
    │
    ▼
[SBOM/provenance check]    ──► reject if signed-source mismatch
    │
    ▼
agent_context_window
```

The first stage is cheap and catches the obvious. The second stage uses a small model to flag novel/encoded injections. The third gates on whether the artifact came from a trusted source. Each stage is independently bypass-able, so all three together is the defense-in-depth posture.

## Anti-Pattern: Sandbox-Only Defense

Believing that running the agent in a sandbox is sufficient protection against malicious context. The sandbox is necessary but not sufficient — it protects you from the agent's *actions*, not from the agent's *plan being steered by injected instructions*. A plan-steering injection can cause the agent to take perfectly sandbox-legal actions (calling tools, writing files, posting messages) that nonetheless serve the attacker.

## See Also

- [Context Development Life Cycle](context-development-life-cycle.md) — where the filter sits
- [AI SBOM](ai-sbom.md) — provenance counterpart to content filtering
- [Agent Skills § Security: Audit Before Installing](agent-skills.md#security-audit-before-installing) — manual-audit posture this automates
- [Harness Engineering § Shared Harness Artifacts Are an Attack Surface](harness-engineering.md#shared-harness-artifacts-are-an-attack-surface) — the broader threat model
- [Patrick Debois](../people/patrick-debois.md) — the framing's origin
