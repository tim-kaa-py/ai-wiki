---
title: "Software Factory"
description: "Simon Last's framing of coding agents as the kernel of AGI, forming an automated loop for building and maintaining software"
type: "concept"
pillar: "ecosystem"
tags: [software-factory, agents, coding-agents, agi, harness-engineering, automation]
sources:
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md"
timestamp: "2026-08-28"
---

# Software Factory

Simon Last's (Notion) framing for the endgame of coding agents: **an as-automated-as-possible loop for developing, debugging, reviewing, merging, and maintaining a codebase and its services using swarms of agents working together.**

The kernel of the thesis is a stronger claim than "agents will write more code": **coding agents are the kernel of AGI — everything becomes a coding agent.** Most capabilities the industry currently ships as bespoke products (PDF export, data analysis, document generation) collapse into "coding agent with the right tools and a sandbox."

## Why It Matters

The exciting property is recursion: the agent bootstraps its own software and capabilities, then debugs and maintains them. Given a sandbox, filesystem, and the ability to write code, an agent can:

- Build a missing tool when it encounters one (Simon's example: an agent writes itself a 100-LOC Chromium browser wrapper rather than calling a bespoke browsing tool).
- Fix broken transports, patch flaky scripts, regenerate fixtures.
- Compose new behaviors by writing code over primitives rather than consuming opaque APIs.

This is why CLIs often beat MCP servers for open-ended capability: CLIs give the agent a compute runtime where self-repair is natural. See [MCP vs CLI](../comparisons/mcp-vs-cli.md).

## Data Dog / AWS Analogy

Notion's framing: a company like Data Dog layered observability onto AWS primitives. The software factory is the same bet at a higher level of abstraction — frontier models are the new AWS, and coding agents are the new compute primitive others will layer on top of.

## Design Implications

1. **Prefer sandbox + filesystem + code-writing ability** over building a bespoke deterministic tool per capability — unless token economics argue otherwise (see [MCP vs CLI](../comparisons/mcp-vs-cli.md)).
2. **Invest in the agent's ability to author tools for itself.** Boring infra (shell access, git, network) beats elaborate tool registries.
3. **Evals are themselves coding-agent problems.** Notion treats the eval harness as an agent; the generalization is that most platform-internal automation is, too. See [Agent Evaluation](agent-evaluation.md#eval-system-as-agent-harness).
4. **Two-skill discipline still applies.** Distinguish "model can't do this yet" from "our harness hasn't exposed the model to what it needs" — otherwise you'll waste cycles swimming upstream. See [Harness Engineering](harness-engineering.md).

## The Term's Older, Literal Sense (Horthy)

Dex Horthy (HumanLayer, AI Engineer July 2026) uses "software factory" in its literal, historical sense — an organised pipeline that turns intent into shipped code — and traces the term to a **NATO conference in 1968** [03:42-03:48]. This is a narrower usage than Simon Last's "kernel of AGI" framing above: it names the pipeline, not the capability thesis.

His 2022 baseline factory, drawn before any agents enter it:

1. **Tracker** — Linear, Jira, beads; "some sort of state machine that tracks what needs to be done".
2. **Someone builds it.**
3. **Testing** — automated and manual.
4. **PR** — checks plus human review.
5. **Prod.**
6. **Feedback** — user complaints and monitoring, routed back to the tracker.

The point of drawing it this way is that the agentic version changes **exactly one box**: "someone builds it" becomes "an agent builds it". Building drops from days to minutes while review stays hours-to-days, which is what pushes teams to add agentic review, agentic regression testing, and direct routing of incidents and user feedback into the queue [05:47-07:24].

### The Lights-Out (Lights-Off) Configuration

Credited to Dentsu Bureau [07:00-07:02]: the agentic factory taken to its conclusion, where "we no longer read the code". Code review is dropped entirely and the investment moves to testing, monitoring and rollout instead; the only remaining question is "how much stuff can we ask the agent to build?"

Horthy holds this distinct from vibe coding — he ran it seriously at HumanLayer from July 2025 on a real production system. He also scopes the debate deliberately, via Addy Osmani: a developer vibe-coding a side project a dozen people will run and a team keeping a 10-year-old enterprise system alive "share almost no constraints worth naming. And most of what you hear on the internet is one of these groups of people telling the other group of people how to live their lives" [07:38-07:54]. Check which group a piece of factory advice comes from before applying it.

Horthy's own assessment of how that configuration performed conflicts with this page's recursion/maintenance claim; both are held under [Unresolved Tensions](#unresolved-tensions) below.

### The Four-Stage Planning Pipeline He Proposes Instead

| Stage | Artifact | Contents |
|-------|----------|----------|
| 1. Product review | Product doc + mock-ups | What problem are we solving, what's the desired behaviour |
| 2. System architecture | Architecture doc | Component contracts, data models, constraints; how the pieces fit |
| 3. Program design | Design doc | Types, method signatures, program layout, call stacks / call graphs |
| 4. Vertical slices | Implementation plan | Order of implementation, multi-repo coordination, checks between phases |

Two stages carry most of the novelty:

- **Program design** — the layer he calls "really under-emphasized in agentic coding these days" [15:52-15:58]. Distinct from architecture: architecture is component contracts and data models; program design is "the types and the method signatures, the program layout and the call stacks." His complaint is that "people assume that once you get the architecture right, the model can just cook" — it can't. He cites Dylan Mulroy at Cloudflare using call graphs as a planning artifact.
- **Vertical slices** — "the order of implementation, multi-repo coordination, how we're going to build this across our entire system, and how are we going to check it along the way" [16:29-16:36], positioned against models' tendency to produce *horizontal* plans.

Explicit exception: "small stuff still just go straight to the agent" [15:21-15:24]. See [Plan and Review](plan-and-review.md) for the general planning-versus-reviewing ledger this pipeline sits inside.

**Vendor caveat.** HumanLayer sells "building blocks for your software factory" and "soon to be better verifiers for software quality," so Horthy arrives with a commercial interest in the conclusion that planning tooling and human review are necessary. The mechanics of the argument stand on their own; the incentive is worth carrying alongside them. *(Source: Dex Horthy, AI Engineer 2026-07-23.)*

## Unresolved Tensions

### Can the factory maintain its own codebase, or does maintenance require a human in the loop?

*Surfaced: 2026-08-28 (ingest of 2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail).*

This page's core recursion claim is that maintenance is inside the loop:

> "an as-automated-as-possible loop for developing, debugging, reviewing, merging, and maintaining a codebase and its services using swarms of agents working together"
> "the agent bootstraps its own software and capabilities, then debugs and maintains them."
> — [Simon Last, *Notion, Token Town, MCP, CLIs and the Software Factory*](../../summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md)

Dex Horthy argues maintenance is precisely the box that does not automate, and gives a training-level reason why:

> "models cannot maintain and improve codebase quality over time without human steering"
> "Verifying code quality and maintainability is orders of magnitude harder than the code runs and the test pass. Because the cost function of bad architecture is measured in months and years"
> — [Dex Horthy, *Harness Engineering Is Not Enough*](../../summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md) [09:23-10:07], [13:44-13:52]

His evidence is a post-mortem rather than a benchmark: HumanLayer ran lights-off on a real production system from July 2025, and it ended on the day an agent hit an issue it could not solve — forcing a dig into a codebase nobody had read in three months, while the site was down [08:25-08:30]. He concedes he **cannot prove** the claim, since no maintainability benchmark exists.

Both are held without choosing. The two claims may be measuring different horizons — Simon Last's recursion (an agent writing itself a tool, patching a flaky script) is demonstrated at the scale of hours, while Horthy's failure is architectural erosion measured in months — but the page should not be read as asserting that the demonstrated short-horizon self-repair extends to long-horizon maintenance.

## Related Pages

- [Harness Engineering](harness-engineering.md) — the discipline of building the loop the software factory runs in
- [MCP vs CLI](../comparisons/mcp-vs-cli.md) — per-capability decision framework for how the factory calls out to tools
- [Agent Evaluation](agent-evaluation.md) — Notion's three-tier stack and eval-as-harness pattern
- [Five Levels of AI Coding](five-levels-of-ai-coding.md) — Shapiro's maturity model; software factory sits at the frontier tier
- [Plan and Review](plan-and-review.md) — the planning-versus-reviewing ledger Horthy's four-stage pipeline spends against
- [Reviewer Agents](reviewer-agents.md) — the agentic-review box inside the factory loop
