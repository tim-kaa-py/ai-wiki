---
title: "The Think Tool"
type: "concept"
pillar: "understanding"
tags: [think-tool, tool-use, reasoning, extended-thinking, tau-bench, agents, claude]
sources:
  - "summaries/2025-03-20_anthropic_think-tool.md"
last_updated: "2026-04-20"
---

# The Think Tool

A no-op tool the agent can call mid-chain to record its own reasoning before deciding the next tool call. The tool does nothing — it just accepts a string and returns. Its value is that it forces a visible, structured pause inside a multi-step tool-use loop.

## Think Tool ≠ Extended Thinking

These are different mechanisms that solve different problems:

| | Extended Thinking | Think Tool |
|---|---|---|
| **When** | Before generation | Mid-chain, during tool use |
| **How** | Model-level thinking block | An ordinary tool call |
| **Sees** | The original prompt | Accumulated tool outputs |
| **Good for** | Upfront planning | Interpreting results between tool calls |

Same underlying capability (careful reasoning), different temporal location. They are complementary, not substitutes.

## When to Use It

Best results when:

- **Long tool-use chains** where each step depends on interpreting the last tool's output.
- **Policy-heavy domains** — airline rules, retail compliance, medical/legal procedures where the agent must consult rules before acting.
- **Sequential consequential decisions** — each choice constrains the next.

Not worth the slot when:

- One-shot retrieval or simple lookups.
- Short chains (1–2 tool calls).

## Results

From Anthropic's evaluations:

- **τ-Bench airline: +54% relative** (0.370 → 0.570 pass rate). This is the headline number — a policy-heavy domain with long sequential decisions.
- **τ-Bench retail: +3.7% absolute.**
- **SWE-Bench: +1.6% average.**

## Implementation Notes

- **Pair with domain-specific prompting examples.** Alone, the tool underperforms — the model needs demonstrations of what "thinking" should contain for this domain (checking policy sections, enumerating constraints, etc.).
- **No downside when unused.** The model can ignore the tool on simple tasks. Adding it doesn't penalize easy cases.
- **Minimal implementation cost** — it's a tool that returns its input (or nothing).

## Related

- [Tool Design for Agents](./tool-design-for-agents.md) — the think tool is itself an example of good ACI design.
- [MCP](./mcp.md) — typical surface for delivering a think tool to an agent.
