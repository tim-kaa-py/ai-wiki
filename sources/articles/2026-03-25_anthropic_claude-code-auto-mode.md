---
title: "Claude Code auto mode: a safer way to skip permissions"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-03-25"
url: "https://www.anthropic.com/engineering/claude-code-auto-mode"
pillar: "building"
tags: [claude-code, permissions, auto-mode, safety, prompt-injection, classifier]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Claude Code Auto Mode: A Safer Way to Skip Permissions

**Published:** March 25, 2026

## Article Summary

Anthropic introduced "auto mode" for Claude Code, a new permission system that reduces approval fatigue while maintaining security. The feature uses AI classifiers to automatically approve safe actions, addressing the gap between manual approval (which users accept 93% of the time) and completely disabling permissions.

## How It Works

Two defensive layers:

**Input Layer:** A server-side prompt-injection detector screens tool outputs before they reach the agent, adding warnings when suspicious content is detected.

**Output Layer:** A transcript classifier evaluates each action before execution. It operates in two stages—a fast single-token filter followed by reasoning-based review only when flagged—to balance safety with efficiency.

## Key Design Choices

The classifier intentionally excludes assistant explanations and tool results to prevent the AI from justifying poor decisions. As the article notes, "stripping assistant text so the agent can't talk the classifier into making a bad call" prevents self-serving rationalizations.

The system categorizes threats into four types: overeager behavior, honest mistakes, prompt injection, and model misalignment. It maintains three approval tiers: safe-tool allowlists, in-project file operations, and a final classifier review for high-risk actions.

## Performance Metrics

- **False positive rate:** 0.4% (benign actions blocked)
- **False negative rate:** 17% (dangerous actions missed)

The 17% miss rate represents the honest limitation. Acceptability "depends on what you're comparing against"—substantially safer than fully disabled permissions but not a replacement for careful human review on critical infrastructure.

## Limitations and Future Work

The classifier struggles to determine if user consent genuinely covers an action's blast radius. When denials occur, the agent attempts safer alternatives rather than halting, with escalation after 3 consecutive or 20 total rejections.

Anthropic plans to expand testing datasets and improve both safety and cost efficiency as the feature matures.
