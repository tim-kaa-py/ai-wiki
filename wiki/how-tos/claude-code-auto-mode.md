---
title: "Claude Code Auto Mode"
type: "how-to"
pillar: "building"
tags: [claude-code, permissions, auto-mode, safety, prompt-injection, classifier]
sources:
  - "summaries/2026-03-25_anthropic_claude-code-auto-mode.md"
  - "summaries/2025-04-18_anthropic_claude-code-best-practices.md"
last_updated: "2026-04-20"
---

# Claude Code Auto Mode

Auto mode is Anthropic's third permission strategy for Claude Code — a safer alternative to `--dangerously-skip-permissions` that replaces permission fatigue with a two-stage classifier.

## When to Use

Auto mode is the right default when:
- You want long, uninterrupted agent runs without manually approving every tool call
- The work is contained (feature branch, sandboxed environment, non-critical infra)
- You'd otherwise be tempted to reach for `--dangerously-skip-permissions`

Do **not** use auto mode as a replacement for human review on:
- Production systems
- Security-critical code (see [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md))
- Irreversible actions (force push, data deletion, deploys)

## How It Works

Auto mode layers two classifiers around every tool call:

1. **Input layer — prompt-injection detector.** Runs server-side, tags suspicious tool outputs (fetched web pages, issue bodies, etc.) *before* they reach the agent's context.
2. **Output layer — transcript classifier.** A fast single-token filter that escalates flagged actions to a reasoning review. Crucially, **the classifier strips assistant narrative text** so the agent can't rationalize a bad call to the classifier.

### Three Approval Tiers

| Tier | Behavior |
|------|----------|
| 1. Safe-tool allowlist | Auto-pass (read-only tools, searches) |
| 2. In-project file ops | Auto-pass (within current working tree) |
| 3. High-risk / out-of-project | Classifier review; may escalate to user |

### Escalation & Halts

After **3 consecutive** or **20 total** denials, the agent halts. This prevents a stuck agent from repeatedly probing the guard.

## Starting Auto Mode

```bash
claude --permission-mode auto
claude --permission-mode auto -p "fix all lint errors"
```

## Published Classifier Metrics

| Metric | Value | Meaning |
|--------|-------|---------|
| False positive rate | **0.4%** | Classifier blocks a safe action |
| False negative rate | **17%** | Classifier misses an overeager/harmful action |

**Read the FN rate honestly:** auto mode is much safer than disabled permissions, but it still misses roughly 1 in 6 overeager actions. For prod-critical work use `/permissions` allowlists or `/sandbox`.

## Threat Taxonomy Auto Mode Addresses

1. **Overeager behavior** — agent does more than asked
2. **Honest mistakes** — agent misreads intent
3. **Prompt injection** — tool outputs try to hijack the agent
4. **Model misalignment** — rarer failure mode

Different defenses apply to each. Auto mode targets 1-3; sandboxing adds an OS-level layer for 3-4.

## Choosing Between the Three Permission Strategies

| Strategy | Best for | Granularity | Trade-off |
|----------|----------|-------------|-----------|
| `/permissions` allowlist | Team-shared, version-controlled safe commands | Per-command pattern | Must maintain the list |
| `--permission-mode auto` | Solo runs, long autonomous sessions | Classifier-gated | 17% FN rate |
| `/sandbox` | Unknown scripts, network-exposed tools | OS-level isolation | Setup cost; some tools won't work inside |

Mix them: allowlist + auto is the typical power-user setup.

## Related Pages

- [Claude Code Permissions](claude-code-permissions.md)
- [Claude Code Sandboxing](claude-code-sandboxing.md)
- [Claude Code](../tools/claude-code.md)
