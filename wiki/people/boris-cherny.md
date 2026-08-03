---
title: "Boris Cherny"
type: "person"
description: "Creator of Claude Code; source of the verification-first principle, the prompt-ablation discipline, and the product-overhang framing"
pillar: "ecosystem"
tags: [claude-code, agentic-engineering, prompt-engineering, verification, anthropic, harness-engineering]
sources:
  - "summaries/2026-01-02_bcherny_claude-code-tips-from-creator.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
timestamp: "2026-08-03"
---

# Boris Cherny

Creator of Claude Code at Anthropic. The single most-cited practitioner across this wiki — his guidance underpins the verification-feedback-loop principle, Claude Code's plan-mode default, the permissions stance, and (from July 2026) the prompt-ablation discipline and the product-overhang framing.

## Key Contributions

- **Verification as the highest-leverage practice.** With a feedback loop (tests, typecheck, lint) the quality of the final result is **2-3× higher**. Later sharpened into the claim that verification, not prompting, is *the* durable skill.
- **Prompt ablation.** Delete the entire system prompt, bring it back line by line, keep only what earns its tokens. Claude Code cut **80%** of its system prompt on the Opus 5 release this way.
- **Product overhang and hobbling** — the paired diagnostic for capability that exists but isn't elicited. See [Product Overhang and Hobbling](../concepts/product-overhang.md).
- **Dynamic workflows as "an algebra for agents"** — and as a new axis of test-time compute. See [Dynamic Workflows](../concepts/dynamic-workflows.md).
- **Plan mode as the session default** — start almost every session with a blueprint before execution.
- **Permissions over bypass** — never `--dangerously-skip-permissions`; allowlist by pattern via `/permissions` and check `.claude/settings.json` into the repo.

## The Central Argument (July 2026)

Cherny's thesis is that **prompt scaffolding is a liability that expires**, and that the durable skill has moved on twice:

> "The skill nowadays is less about prompt engineering and more about figuring out how do you give Claude a hard task that seems a little bit too hard. And then how do you make it possible for Claude to verify its work." [20:13-20:29]

Prompt engineer → context engineer → **hard task + self-verification**. He does not present this as an endpoint: *"these will kind of like come and go"* [20:08-20:13].

The two flagship artifacts he cites are both short prompts whose real content is a verification loop:

- **Bun's Zig→Rust runtime rewrite** — one prompt plus steering, 11 days, in production. Bun was chosen partly because *"it's very, very well tested... it's easy to know if you did the right thing"* [17:16-17:24]. Human estimate for the same work: over a year.
- **The Electron→Swift rewrite** — still running at 14+ days at time of interview. The entire prompt: rewrite the Electron app in Swift, run the Electron app in the Mac VM, screenshot it, compare pixel by pixel to the Swift version, *"don't stop until you're done"* [21:33-21:54]. He provisioned the verification substrate — a macOS GitHub Actions runner and an empty target repo — **before** writing the prompt.

His gloss on why orchestration was not needed: *"You don't need slash goal, you don't need slash loop. These help, but really all you need is give the model the task, give it a way to verify the output of its work so it doesn't get stuck, and it will just go."* [22:33-22:48]

## The Living-Creature Framing

The methodological grounding for why he treats prompts empirically rather than architecturally:

> "The way to think about it is almost like a living creature... every model generation, it behaves differently. It has a slightly different personality." [08:55-09:13]

Paired with: *"a re-architecture is a big project... sometimes takes years. And the model is not like that"* [08:35-08:54]. If the artifact is organic rather than designed, the correct discipline is observation and ablation, not up-front system design. This is why he adds instructions back only after **repeated** stumbles — inverting normal engineering, where you fix a bug the first time you see it.

## Notable Quotes

> "The model is actually a little bit more intelligent without these prompts." [05:05-05:10]

> "Every 6 months delete your Claude MD. Delete your skills. Delete your hooks. See what the model does and it might surprise you." [06:55-07:08]

> "Verification I think is probably the single most important thing that people do not get right." [20:25-20:35]

> "Treat this thing like you would a coworker. I think that's the level of intelligence that it's at now." [24:35-24:42]

> "Most people still think of Claude Code as something that only lives inside one terminal window. Power users are using it like a whole operating environment."

## The Senior-Engineer Anti-Pattern

Cherny's most pointed claim about who gets this wrong:

> "When I look at engineers that have been coding for years or for decades, this is a really really common failure mode: trying to over specify... get the model to do the task exactly the way that you would have done it. And that's just not the way the model works." [24:07-24:29]

Experience is *negative* transfer here, and *"it's a journey to unlearn it"* [24:29-24:35]. This converges independently with Peter Steinberger's observation that programming skill is "almost a burden" for agent adoption — see [Empathize with the Agent](../concepts/empathize-with-the-agent.md).

## Workflow

Runs 5-10 Claudes in parallel (`claude.ai/code` tabs alongside local terminal sessions). Starts almost every session in Plan mode. Maintains a personal agent set: `build-validator.md`, `code-architect.md`, `code-simplifier.md`, `oncall-guide.md`, `verify-app.md`, each pinned to a consistent point in the workflow. Keeps a verification checklist (typecheck → tests → changed-file lint) in CLAUDE.md.

## Where He Is Contested

- **Plan mode.** Ryan Lopopolo (OpenAI) argues the opposite default — unread approved plans encode unwanted instructions the rollout then faithfully follows. See [Agentic Coding Workflow § Plan-Mode Skepticism](../how-tos/agentic-coding-workflow.md#plan-mode-skepticism-ryan-lopopolo-openai). The two are not fully reconcilable; the reading is that Boris's context is interactive work where a human actually reads the plan.
- **Spec detail.** His "stop over-specifying" stance sits uneasily against the spec-quality-is-the-bottleneck framing on [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md).

## Related Pages

- [Claude Code](../tools/claude-code.md) — the tool he built
- [Product Overhang and Hobbling](../concepts/product-overhang.md)
- [Dynamic Workflows](../concepts/dynamic-workflows.md)
- [Harness Engineering](../concepts/harness-engineering.md) — ablation as the maintenance procedure for the craft of subtraction
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
- [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)
- [Empathize with the Agent](../concepts/empathize-with-the-agent.md)
- [Peter Steinberger](peter-steinberger.md) — independent convergence on the expertise-as-burden observation
