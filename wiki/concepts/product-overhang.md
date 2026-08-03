---
title: "Product Overhang and Hobbling"
type: "concept"
description: "Boris Cherny's paired diagnostic: capabilities the current model already has but no product elicits (overhang), and products that actively block them (hobbling)"
pillar: "building"
tags: [product-strategy, elicitation, claude-code, agents, anti-patterns, best-practices]
sources:
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
timestamp: "2026-08-03"
---

# Product Overhang and Hobbling

Two sides of one coin, named by Boris Cherny (creator of Claude Code) in his July 2026 Y Combinator interview. Together they form a diagnostic that inverts the usual founder question about model progress.

## The Definitions

**Product overhang** — the model can already do something, but no product exists that lets it:

> "The model can do this at every given model generation, but there is often not a product that lets the model do this." [10:30-12:06]

**Hobbling** — the product actively gets in the way of a capability the model has. Where overhang is *absence* of elicitation, hobbling is *obstruction* of it.

Cherny's claim about the size of the gap:

> "There's so much product overhang that I'm not seeing startups capture." [13:34-13:42]

## The Inverted Question

The standard founder question is *"what will the next model enable?"* — a bet on a release you don't control. The overhang frame replaces it with:

> **"What can the current model already do that my product forbids?"**

This is answerable today, with the model you already have, without waiting for anything. Cherny's origin story for Claude Code is the worked example: it was an un-hobbling of Sonnet 3.5 — the capability was already in the weights; what was missing was a product surface that let the model use a terminal.

## Elicitation Gaps Are Found Accidentally

The uncomfortable corollary: if overhang were legible, it would already be captured. Cherny's evidence is that the discoveries arrive without a commercial hypothesis attached.

Someone at Anthropic handed Opus 5 OpenCV and asked it to draw. It produces portraits, animals, and landscapes — and *"we didn't train the model to draw"* [18:46-19:21]. His generalization:

> "My hypothesis is there's probably dozens, hundreds of opportunities like this with the models of today that no one has yet realized."

The same shape shows up inside Anthropic's own tooling: their dead-code-cleanup routine is one sentence, and *"it'll look for dead code... using static and dynamic analysis. We didn't prompt that. It just kind of figured it out"* [28:38-28:45]. The capability was there; nobody specified it.

**How to apply:** budget deliberately useless experiments. Combine the model with a library it was never marketed for. The elicitation you find will not be the one you set out to look for.

## The "Not Yet Possible" List

The operational instrument for tracking overhang across releases. Cherny's Bun example: the Bun team had been using Claude only to *fuzz* for memory leaks case-by-case, but Jared retried the full Zig→Rust runtime rewrite on **every model generation**. It first became possible with Fable — one prompt plus steering, 11 days, entire runtime rewritten and now in production, against a human estimate of *"definitely over a year"* [16:33-18:16].

Maintain a personal list of concrete tasks that are currently out of reach, and re-run it on each model release. That list *is* your product-overhang radar — it converts "the models got better" from a headline into a dated, per-task answer.

## Over-Specification Is Self-Inflicted Hobbling

The concept's sharpest reuse is at the prompt level rather than the product level. Cherny's framing of the experienced-engineer failure mode — over-specifying step-by-step so the model reproduces the human's solution path — is the *same* failure as a product that blocks the model, applied one layer down. Constraining the model to your approach forfeits its own, often better one.

> "You want to describe the task, you want to describe the guardrails, you want to describe like the exit criteria, and then just let the model cook." [14:59-15:26]

See [Empathize with the Agent](empathize-with-the-agent.md) and [Prompt Engineering for Claude](prompt-engineering-claude.md) for the prompt-level treatment.

## Relationship to the Craft of Subtraction

Overhang explains *why* the [craft of subtraction](harness-engineering.md#craft-of-subtraction) works. Every harness component and prompt line encodes an assumption about what the model can't do. When those assumptions expire, the scaffolding stops being neutral and starts hobbling — which is why Claude Code deletes and rebuilds its system prompt on every model release rather than appending to it. Prompt bloat is hobbling you inflicted on yourself and then forgot about.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the craft of subtraction; ablation as the maintenance procedure
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — task + guardrails + exit criteria as the un-hobbled prompt shape
- [Empathize with the Agent](empathize-with-the-agent.md) — the agentic trap as the practitioner-side version of self-hobbling
- [Dynamic Workflows](dynamic-workflows.md) — orchestration as a way to elicit more from the same model
- [Boris Cherny](../people/boris-cherny.md) — who coined the pair
