---
title: "Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future"
source_type: "podcast"
channel: "Latent Space: The AI Engineer Podcast"
date: "2026-04-15"
url: "https://podcasts.apple.com/de/podcast/latent-space-the-ai-engineer-podcast/id1674008350?l=en-GB&i=1000761419695"
pillar: "ecosystem"
tags: [agents, mcp, notion, tool-use, architecture, building, ecosystem, software-factory, evals, harness-design]
ingested: "2026-04-20"
source_file: "sources/podcast/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
---

# Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future — Summary

**Source:** Latent Space: The AI Engineer Podcast | 2026-04-15 | [Link](https://podcasts.apple.com/de/podcast/latent-space-the-ai-engineer-podcast/id1674008350?l=en-GB&i=1000761419695) | 1:17:00

## TL;DR
Sarah Sachs and Simon Last (Notion) trace ~3.5 years of trying to ship agents — from a 2022 JS coding agent and pre-function-calling fine-tunes, through five harness rebuilds, to a current system with 100+ tools behind progressive disclosure. They frame coding agents as the kernel of AGI driving a "software factory" of self-bootstrapping, self-debugging agents; operationalize evals as a three-tier stack (CI regression, launch report card, 30%-pass-rate headroom frontier) that is itself a coding-agent harness; and argue MCP vs CLIs is a quality/permissions/pricing tradeoff, not a winner — CLIs win when you need open-ended, self-healing capability; MCPs win for narrow, permissioned, deterministic work under token-priced economics.

## Episode Structure
1. [Early | 00:00–05:00] Why Custom Agents Took 3+ Years and the "Don't Swim Upstream" Principle — From 2022 JS agent and fine-tuned tool-calling to the Sonnet 3.6/3.7 unlock; mental model of sensing model limits vs. shaping infra.
2. [Early | 05:00–12:00] The Software Factory, AGI-Pilled Projects, "Everything Becomes a Coding Agent" — Coding agents as AGI kernel; automated loops for develop/debug/review/merge/maintain; the two-skill framework and the Data Dog / AWS analogy.
3. [Mid | 22:00–30:00] Evals as a Coding-Agent Problem: Notion's Last Exam, MBEs, Headroom Testing — Three-tier eval stack, the Model Behavior Engineer role, treating the eval harness itself as an agent.
4. [Mid | 40:00–48:00] MCP vs CLIs: Permission Models, Token Economics, When Each Wins — Progressive disclosure, self-bootstrapping, usage-based-pricing waste of LLM-driven deterministic API calls.
5. [Mid-Late | 48:00–58:00] Harness Archaeology: Five Rebuilds and "Give the Model What It Wants" — JS coding-agent → XML → Notion-flavored markdown → SQLite → progressive disclosure with 100+ tools.

## Key Concepts

### Software Factory
Simon's framing: an as-automated-as-possible loop for developing, debugging, reviewing, merging, and maintaining a codebase and its services using swarms of agents working together. Kernel of the thesis: "coding agents are the kernel of AGI — everything becomes a coding agent." The exciting property is that the agent can bootstrap its own software and capabilities and debug/maintain them.

### "Don't Swim Upstream" — Two Skills for Frontier Building
Sarah's framing of what's actually hard about building on frontier capability:
1. Recognizing when you're pressing against model limits vs. failing to expose the model to the right information / infrastructure — an intuition skill.
2. Once you know you're not swimming upstream, reading "which direction the river is flowing" and starting to build product for that direction even before the capability fully exists, so you're ready when it arrives.
The trick is doing the speculative work but not doing it for too long when signals stay flat.

### Three-Tier Eval Stack
Sarah explicitly rejects the "evals == quality" conflation ("that's like calling all testing 'unit tests'"). Notion's stack:
1. **CI regression (unit-test equivalent):** Must pass within a stochastic error rate; live in CI.
2. **Launch report card (product eval):** Per-user-journey thresholds (e.g., 80–90% pass) that gate launches.
3. **Frontier / headroom eval:** Actively tuned to sit at ~30% pass rate. When existing evals saturated, Notion built this tier in partnership with Anthropic and OpenAI so they could keep giving model labs (and themselves) signal on where the stream is going. Branded internally as "Notion's Last Exam."

### Model Behavior Engineer (MBE)
A non-engineering career track at Notion. Origin: "data specialists" (linguistics PhD dropout, recent-grad) who manually inspected outputs. Today they author evals and LLM judges, increasingly via coding agents themselves. Mix of data scientist + PM + prompt engineer; Notion's conviction is that you don't need an engineering background to do this well — it's taste and instinct about model behavior.

### Eval System as Agent Harness
"Treat the eval system as an agent harness." An agent end-to-end downloads a dataset, runs an eval, iterates on a failure, debugs, and implements a fix — with a human observing the outer loop. Deliberately general: "it would be a mistake to fix it on any particular coding agent; at the end of the day it's just CLI tools."

### Progressive Disclosure (Harness Pattern)
Instead of showing the model all tools at once, the harness reveals tools incrementally. CLIs get this for free (you see the wrapper, then use `--help` and read files). For MCP it's not inherent to the protocol but can be layered on by the harness. Notion moved to progressive disclosure because at 100+ tools every new tool was "nerfing the overall model" — tokens ballooned and unrelated tools got over-called.

### Notion-Flavored Markdown
After an XML representation that losslessly mapped to Notion blocks flopped ("the model didn't know the XML format, you had to prompt it in"), they built a markdown dialect that is simple markdown at the core with minimal enhancements and does NOT require full lossless conversion. Instance of the larger principle: "give the model what it wants."

### CLIs vs MCPs (as harness choices)
- **CLI strengths:** lives in a terminal with extra power (pagination, grep over outputs); progressive disclosure inherent; self-bootstrapping — if a tool is broken or missing the agent can write/fix it in the same environment (Simon's example: an agent writes itself a 100-LOC Chromium browser wrapper).
- **CLI weaknesses:** murkier permission surface (token exfiltration, what can the process access), open-endedness means unbounded token spend per invocation.
- **MCP strengths:** strong permission model by construction ("all you can do is call the tools"); deterministic; lightweight; "the dumb simple thing that works." Best when you want a narrow permissioned agent without a full compute runtime.
- **MCP weaknesses:** if transport breaks the agent can't fix itself; early MCPs dump all tools at once.

## Key Takeaways

1. **Coding agents are the kernel; build toward the software factory.** Simon: most capabilities collapse into "coding agent with the right tools." Design so agents can bootstrap, debug, and maintain their own software.
   **How to apply:** When adding a capability (e.g., PDF export), prefer giving the agent a sandbox + filesystem + code-writing ability over building a bespoke deterministic tool — unless the economics argue otherwise (see takeaway 6).

2. **Two-skill heuristic for frontier work.** Know whether you're fighting model limits or fighting your own infrastructure; and read where capability is heading so you can pre-build.
   **How to apply:** Before a multi-month push, ask "is the blocker the model or our harness/context?" If model, set a time-box and park; if harness, keep pushing.

3. **Evals aren't one thing. Run three tiers.** Unit/regression in CI; launch report card gating per-journey quality; frontier/headroom at ~30% pass rate.
   **How to apply:** Audit your eval suite; if all your evals are ≥90% pass, you've saturated — create a deliberately-too-hard tier and staff it (data scientist + model behavior engineer + evals engineer).

4. **Turn evals into an agent harness.** An agent downloads the dataset, runs the eval, inspects failures, proposes fixes, and implements them — humans observe the outer loop.
   **How to apply:** Wire your eval framework so it's driveable from a CLI; let a coding agent write your next eval the way it writes your next unit test.

5. **Give the model what it wants.** Don't cater your wire format to your system's data model; cater to what the model already knows. Markdown beats custom XML; SQLite beats custom JSON query languages.
   **How to apply:** When designing a new tool interface, prototype with the most vanilla format a frontier model already handles fluently; only add structure when evals justify it.

6. **Choose MCP vs CLI per quality need and per token economics.** Under usage-based pricing, having an LLM drive a deterministic third-party API is wasteful — you pay token fees on every call, especially outside the cache window. CLIs turn repeated LLM work into one-time code generation.
   **How to apply:** For deterministic narrow API work, prefer CLI invocation (or a generated script) over an MCP tool-call-per-action. Reserve MCP for narrow lightweight agents needing strong permissioning and no compute runtime.

7. **Progressive disclosure is non-negotiable past ~dozens of tools.** Showing all tools inflates tokens and degrades quality (over-calling niche tools, "nerfing" the model on unrelated prompts).
   **How to apply:** Do not ship a harness that front-loads the full tool catalog. Gate tool visibility behind search/help/namespacing; budget the prompt aggressively.

8. **Distribute tool ownership by moving from few-shot to goal-driven definitions.** With few-shots, every engineer edits one shared system-prompt string; order-sensitivity forces a center-of-excellence gate. Tool definitions with goals let teams own their own tools.
   **How to apply:** Stop investing in curated few-shots for new capabilities. Invest in crisp per-tool goal descriptions and let feature teams ship their own.

9. **Don't try to hide your system prompt / tool list.** Notion explicitly doesn't — "we don't think our system prompt is our secret sauce." Users as power users benefit from knowing the tool surface.
   **How to apply:** Expose your agent's available tools to users. It builds trust and turns power users into better prompters.

10. **Rebuild your harness on a cadence.** Simon: "I'm basically just doing that [rewriting everything] in a loop every six months." Low-ego teams that delete their own code move faster on frontier.
    **How to apply:** Budget for periodic framework rewrites; hire managers who don't care about team-structure territoriality; structure forms after ships, not before.

## Argument Structures

### Why the 3+ year delay wasn't "just reasoning models"
Interviewer's prior: "models didn't work, then reasoning models came, then it worked."
Sarah's refinement:
- Premise: Reliability, not raw capability, was the bottleneck for background agents.
- Premise: Reliability requires both (a) frontier capability and (b) correct harness/permissioning/product surface.
- Premise: Notion has two durable skills — knowing when to stop swimming upstream, and knowing which way the river is flowing.
- Conclusion: The delay wasn't waiting for one capability unlock; it was iterating harnesses in lockstep with capability, killing dead-ends early, and shipping when the permissioning/product surface was actually enterprise-safe — not just when the model first "worked."

### Why MCP and CLI are not a dichotomy
- Premise 1 (capability): CLIs inherit terminal power + self-bootstrapping; if a tool is missing the agent writes one.
- Premise 2 (safety): MCP's constrained surface IS its permission model; CLIs reintroduce exfiltration/sandbox questions.
- Premise 3 (economics): Under usage-based pricing, using an LLM to drive deterministic API calls pays token fees on every invocation; writing code that calls the API once amortizes cost. Cache-window misses make this worse.
- Premise 4 (product): Notion is the system of record — they must support MCP regardless of preference because customers use it.
- Conclusion: The right question is per-capability: "does this task need open-endedness and self-repair, or narrow permissioned determinism?" Commit to both platforms; choose per-quality-need.

### Why evals must include a 30%-pass frontier tier
- Premise: Evals tell you where capability is vs. where it's going.
- Premise: Once all your evals are at ≥90% pass, you can't distinguish a better model from a worse one — you've saturated.
- Observation: Notion hit exactly this saturation, which was bad both for Notion (no signal on progress) and for model labs (no insightful feedback from an enterprise-use-case partner).
- Conclusion: You need a tier deliberately built so frontier models fail 70% of the time. It's the only tier that keeps producing signal through capability cycles.

### Why "give the model what it wants" beats "give the model your data model"
- Observation 1: XML format that losslessly mapped to Notion blocks failed — model didn't natively know it; it had to be prompt-taught every call.
- Observation 2: Simple markdown, with small additions, worked immediately because the model already knew markdown.
- Observation 3: Same pattern with databases — bespoke JSON query format lost to SQLite, which models handle fluently.
- Generalization: Expose the model to the shape it was pretrained on. Any mismatch tax you pay is paid on every single token of every single call.

## Related Topics

agents, mcp, cli, notion, tool-use, architecture, software-factory, harness-design, evals, progressive-disclosure, permissions, pricing, model-behavior-engineer, building, ecosystem
