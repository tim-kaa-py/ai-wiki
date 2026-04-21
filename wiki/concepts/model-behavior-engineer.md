---
title: "Model Behavior Engineer (MBE)"
type: "concept"
pillar: "ecosystem"
tags: [model-behavior-engineer, evals, agents, roles, organization, prompt-engineering]
sources:
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
last_updated: "2026-04-20"
---

# Model Behavior Engineer (MBE)

A **non-engineering career track** Notion has formalized for the people who own how their AI behaves. Surfaced publicly on Latent Space (April 2026) by Sarah Sachs.

## Origin

Started as "data specialists" — hires like a linguistics PhD dropout and recent grads who manually inspected model outputs. The work compounded into a real craft with enough depth and leverage to justify a formal career track distinct from software engineering.

## What MBEs Do Today

- **Author evals.** Especially the hard tiers — the launch report card and the 30%-pass frontier ("Notion's Last Exam"). See [Agent Evaluation](agent-evaluation.md#three-tier-eval-stack-notion-april-2026).
- **Write LLM judges.** Calibrated graders that scale evaluation past what human review can cover.
- **Increasingly drive this through coding agents themselves.** MBEs don't hand-author every eval; they use coding agents to scaffold and iterate on evals.

## Role Mix

Sarah's framing: data scientist + PM + prompt engineer. Taste and instinct about model behavior is the core skill, not software engineering background.

This is a deliberate hiring signal: Notion's conviction is that an engineering background is **not** required to do this well. The gating skill is fine-grained judgment about what "good" looks like from a model — which transfers from linguistics, product, or editorial backgrounds more than from CS.

## Why This Role Exists

Once a team takes evals seriously — beyond one CI regression tier into launch gating and frontier / headroom tiers — eval authoring stops being a hat an engineer wears and becomes its own full-time craft. Someone has to:

- Decide what "launch-ready" means for each user journey
- Build and maintain the frontier tier so model-lab partnerships stay productive
- Read transcripts, spot drift, and translate qualitative findings into new graders

That's a role, not a side task.

## Why It's Worth Noting

Most companies still staff "prompt engineering" informally. Notion's MBE track is one of the first published examples of a large product organization treating model-behavior shaping as a first-class career path — a concrete alternative to absorbing this work into either engineering or product teams.

## Related Pages

- [Agent Evaluation](agent-evaluation.md) — the three-tier stack MBEs own
- [Harness Engineering](harness-engineering.md) — the surrounding discipline
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — one of the skill inputs to the MBE role
