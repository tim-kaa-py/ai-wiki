---
title: "Claude Code auto mode: a safer way to skip permissions"
source_type: "article"
channel: "Anthropic Engineering"
date: "2026-03-25"
url: "https://www.anthropic.com/engineering/claude-code-auto-mode"
pillar: "building"
tags: [claude-code, permissions, auto-mode, safety, prompt-injection, classifier]
ingested: "2026-04-20"
source_file: "sources/articles/2026-03-25_anthropic_claude-code-auto-mode.md"
---

# Claude Code Auto Mode — Summary

**Source:** Anthropic Engineering | 2026-03-25 | [Link](https://www.anthropic.com/engineering/claude-code-auto-mode)

## TL;DR
Auto mode replaces permission fatigue with a two-stage classifier: a server-side prompt-injection detector + an output classifier that reviews each action. False positive 0.4%, false negative 17%. Safer than `--dangerously-skip-permissions`, not a substitute for human review on critical infra.

## Key Concepts

### Two defensive layers
- **Input layer:** prompt-injection detector tags suspicious tool outputs before they reach the agent.
- **Output layer:** transcript classifier (fast single-token filter → reasoning review when flagged) gates actions.

### Three approval tiers
1. Safe-tool allowlist (auto-pass)
2. In-project file ops (auto-pass)
3. High-risk → classifier review

## Key Takeaways
1. **Classifier strips assistant text** so the agent can't rationalize bad calls to the classifier.
   - **How to apply:** when building any agent guard, isolate evaluator inputs from the generator's narrative output.
2. **17% miss rate on overeager actions is the honest limit.** It's much better than disabled permissions but not a replacement for review on prod systems.
3. **Threat taxonomy:** overeager behavior, honest mistakes, prompt injection, model misalignment. Different defenses for each.
4. **Escalation:** after 3 consecutive or 20 total denials, agent halts.

## Notable Commands / Snippets
```bash
claude --permission-mode auto
```

## Related Topics
auto-mode, permissions, classifier-defense, prompt-injection, claude-code-safety
