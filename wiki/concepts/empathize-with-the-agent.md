---
title: "Empathize with the Agent"
description: "The mental shift of thinking from the agent's zero-context perspective before prompting it, as the key to effective agentic coding"
type: "concept"
pillar: "building"
tags: [agentic-engineering, prompt-craft, mental-model, ai-coding]
sources:
  - "summaries/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-02-18_nate-b-jones_5-levels-of-ai-coding.md"
  - "summaries/2026-04-13_chase-ai_gsd-vs-superpowers-vs-claude-code.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
timestamp: "2026-08-07"
---

# Empathize with the Agent

The single most important mental shift for effective agentic coding: think from the agent's perspective before prompting.

## The Core Idea

The agent starts every session from zero. It knows nothing about your project. Your codebase might be hundreds of thousands of lines, but the agent's context window is finite. You have the system-level understanding; the agent needs you to share just enough of it.

> "If I were dropped into this codebase cold, what would I need to know to do this task?"

Answer that question, then tell the agent exactly that — point it to specific files, modules, constraints.

## Why It Matters

Most frustration with AI coding tools comes from mismatched expectations. The developer assumes the agent "should know" something about the project. The agent literally cannot — it starts fresh. A few pointers go a long way:

- "Consider this file and this module"
- "The constraint is X"
- "This interacts with the auth system in Y"

Friction during a task is a signal: if the agent is spinning or taking too long, you likely didn't provide enough context, or the architecture makes the task unnecessarily hard. Stop, reframe, add what's missing.

## Why Expert Programmers Struggle

Steinberger observes that programming skill is "almost a burden" for agent adoption:

- Expert programmers have deep intuitions about how code "should" look
- Agents produce code that looks different — it works but doesn't match the expert's style
- The expert's deep skill creates an inability to empathize with a system starting from zero
- World-class programmers dismiss agents as broken — not because the tools are bad, but because expertise prevents the mental shift

This is a genuinely new paradigm. The guitar analogy: sitting at a piano once and saying "the piano's broken" is not a fair assessment.

## Missing Context Doesn't Produce a Blank

The page above says *give the agent what it can't see*. Ishan Anand's persona research (AI Engineer, July 2026) supplies the mechanism for *what happens when you don't* — and it is worse than the intuitive model of a gap.

When context is missing, the model "has to potentially infer or invent confounders" [06:36]. It does not stall, flag the ambiguity, or return an empty slot. It fills the hole with whatever makes the prompt coherent, then reasons confidently from the invention:

> "if it's a poorly grounded persona, it's a little like the LLM is playing improv with you. It's like gold watch on a table? Oh, well, we must be in a jewelry store, right?" [07:04]

The structural version: in a human experiment, the environment is fixed and only the human is a random variable. In a prompted one, **every unspecified part of the world silently becomes a random variable.** Anand's corrective is stated for personas but holds for any agent prompt — "they have no universe other than what's in the prompt, and you have to use the prompt to paint the world" [07:34].

**Sharper version of the pre-prompt check.** "What would I need to know if dropped in cold?" invites you to list what you'd *want*. The improv frame asks a harder question: *what will it make up if I don't say?* Those find different omissions — the second catches the premises so obvious to you that they never surfaced as things worth stating.

Note that this cuts the opposite way from over-specification (below): the thing to be exhaustive about is the **world** — constraints, fixed facts, what is not on the table — not the **method**. Painting the world removes randomness; scripting the steps forfeits the model's own approach. *(Source: Ishan Anand, AI Engineer 2026-07-29)*

## The Agentic Trap

A skill progression curve observed by Peter Steinberger:

1. **Beginner:** Simple prompts ("fix this"). Works for simple tasks.
2. **Intermediate (the trap):** Over-engineering — 8 agents, complex orchestration, 18 slash commands. Trying to compensate for the agent's lack of context by building elaborate systems.
3. **Expert:** Return to simple prompts — but with deep understanding. The sophistication is invisible; it lives in your empathy for what the agent needs, not in tooling.

The expert gives the agent just enough context with a few words. The intermediate builds a pipeline to inject context automatically. The expert's approach is faster, more flexible, and produces better results.

**Empirical validation:** Chase AI's benchmark of GSD vs Superpowers vs vanilla Claude Code quantifies this trap. GSD (the most elaborate orchestration layer) burned 1.2M tokens and 1h45m; Superpowers used 250K tokens and 1 hour; vanilla Claude Code finished in 20 minutes and 200K tokens — with indistinguishable output quality. The orchestration overhead produced no measurable benefit, which is exactly what the agentic trap predicts: the sophistication should be in the human's understanding, not in tooling. *(Source: Chase AI)*

## How to Apply

1. **Before every prompt:** Pause and think from the agent's perspective. What does it see? What can't it see?
2. **Build your codebase for the agent:** Don't fight its naming (the name in the weights is the name it'll search for). Keep structure clean and discoverable.
3. **Write orientation files:** CLAUDE.md, soul.md, agent files — anything that helps the agent understand the project quickly.
4. **Interrupt, don't wait:** If the agent is spinning, it's a signal that it lacks context. Stop it, reframe, add what's missing.
5. **Don't force your worldview:** The agent may have a better approach because it was trained on patterns you haven't seen. Evaluate on merit.

## The Level 2→3 Barrier: Where Empathy Becomes Critical

Dan Shapiro's five-level framework for AI coding maturity identifies the Level 2 to Level 3 transition as the point where empathy with the agent becomes make-or-break. At Level 2 (Junior Developer), the human still reads all AI-generated code. At Level 3 (Developer as Manager), the human directs AI and reviews at the PR/feature level. Shapiro estimates 90% of "AI-native" developers are stuck at Level 2 — and the barrier is psychological, not technical.

The core blocker: developers cannot let go of reading every line of code. This is the empathy failure at scale — instead of trusting the agent with well-scoped work and evaluating outcomes, they insist on reviewing implementation details. The expert programmers who struggle most (per Steinberger's observation above) are the same population most likely stuck at Level 2.

**The METR study confirms the cost:** developers using AI completed tasks 19% slower but believed they were 24% faster. The gap between perception and reality is a direct consequence of failing to redesign the workflow around agent capabilities — treating the agent as a junior to be supervised line-by-line rather than a team member to be directed and evaluated at a higher level. *(Source: Nate B Jones / Dan Shapiro)*

## Cherny's Independent Convergence: Over-Specification as the Senior-Engineer Failure Mode

Boris Cherny (creator of Claude Code, July 2026) arrives at Steinberger's "expertise is almost a burden" observation from inside Anthropic and names its concrete symptom — over-specification:

> "When I look at engineers that have been coding for years or for decades, this is a really really common failure mode: trying to over specify... get the model to do the task exactly the way that you would have done it. And that's just not the way the model works." [24:07-24:29]

Two things this adds to the page.

**First, the mechanism.** Pre-LLM engineering rewarded exhaustive specification — big designs, big test suites, everything thought through up front. That instinct transfers directly as step-by-step prompting. But over-specifying constrains the model to the human's solution path and forfeits its own, often better, approach. Experience is *negative* transfer here, and *"it's a journey to unlearn it"* [24:29-24:35]. This is the same conclusion as [Why Expert Programmers Struggle](#why-expert-programmers-struggle), reached from the tool-builder's side rather than the practitioner's.

**Second, a sharper altitude test than the new-employee analogy.** Anthropic's official framing is "brilliant but new employee." Cherny updates the calibration:

> "Treat this thing like you would a coworker. I think that's the level of intelligence that it's at now." [24:35-24:42]

The difference matters operationally. You brief a *new employee* on context they lack; you do not tell a *coworker* which order to do the steps in. Before sending a prompt, ask whether you'd give a competent colleague that level of step-by-step direction — if not, cut it. The positive shape is task + guardrails + exit criteria; see [Prompt Engineering for Claude § Task + Guardrails + Exit Criteria](prompt-engineering-claude.md#task--guardrails--exit-criteria).

Cherny also gives the failure a name that ties it back to product strategy: over-specification is **self-inflicted hobbling** — structurally the same failure as a product that blocks a capability the model already has, applied at the prompt level. See [Product Overhang and Hobbling](product-overhang.md). *(Source: Boris Cherny, Y Combinator 2026-07-27)*

## Anthropic's Validation

Anthropic's official prompting best practices independently converge on this same insight. They describe Claude as a "brilliant but new employee who lacks context on your norms and workflows." Their golden rule: show your prompt to a colleague with minimal context — if they'd be confused, Claude will be too. This is essentially "empathize with the agent" stated as corporate doctrine. *(Source: Anthropic Prompting Best Practices)*

## Related Pages

- [Prompt Engineering for Claude](prompt-engineering-claude.md) — Anthropic's official prompt patterns
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — the maturity model where empathy determines progression
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Peter Steinberger](../people/peter-steinberger.md)
- [Boris Cherny](../people/boris-cherny.md) — independent convergence from the tool-builder's side
- [Product Overhang and Hobbling](product-overhang.md) — over-specification as self-inflicted hobbling
- [Synthetic Personas](synthetic-personas.md) — the latent-confounder mechanism, and grounding the world vs. elaborating the person
- [Claude Code](../tools/claude-code.md)
