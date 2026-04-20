---
title: "Harness Engineering"
type: "concept"
pillar: "understanding"
tags: [harness-engineering, agents, agent-architecture, orchestration, evaluation, prompt-engineering, context-engineering, meta-harness, nlh, dspy]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2025-09-29_anthropic_effective-context-engineering.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2026-04-15_anthropic_scaling-managed-agents.md"
last_updated: "2026-04-20"
---

# Harness Engineering

The discipline of designing, optimizing, and pruning the "other half" of an agent — everything that isn't model weights. The emerging third era of agent work after prompt engineering and context engineering, formalized by two March 2026 papers (Tingua's NLH and Stanford's Meta Harness) and by LangChain's and Anthropic's public framings.

## Agent = Model + Harness

LangChain's sharpest framing: "If you're not the model, you're the harness." The harness is concretely:

- System prompts
- Tool definitions
- Orchestration logic (chaining, routing, parallelization, planner/generator/evaluator loops)
- Memory management
- Verification loops
- Safety guardrails

## The OS Analogy

The sticky mental model for why the harness matters:

| Component | OS equivalent |
|-----------|---------------|
| LLM | CPU |
| Context window | RAM |
| External database | Disk |
| Tool integrations | Device drivers |
| **Harness** | **Operating system** |

A raw LLM is a CPU — powerful but inert with no RAM, no disk, no IO. The harness coordinates what the CPU sees and when. That makes the harness the locus of systems engineering for agents — and the place where 6x performance deltas live.

## The Three Eras

| Era | What it optimizes |
|-----|-------------------|
| Prompt engineering | The single prompt to the model |
| Context engineering | What the model sees across a session |
| **Harness engineering** | The orchestration code wrapping the model — patterns, memory, verification, safety |

Each era swallows the prior one. Harness engineering absorbs prompt + context work and adds what the model can't do alone. See [Prompt Engineering for Claude](prompt-engineering-claude.md) for the prior-era techniques that remain inside the harness.

## Headline Findings

1. **6x performance variation from the harness alone** — Stanford measurement; LangChain's coding agent jumped from outside the top 30 to rank 5 on terminal-bench by modifying only harness infrastructure.
2. **~90% of compute flows through delegated child agents, not the parent.** The harness is an orchestration pattern, not a reasoning pattern.
3. **Self-evolution is the only consistently helpful module** across SWE-bench Verified (+4.8) and OS World (+2.7) in the NLH ablation.
4. **Verifiers and multi-candidate search actively hurt** on the same benchmarks (–0.8/–8.4 and –2.4/–5.6).
5. **Representation alone can move a benchmark 16.8 points.** OS Symphony rewritten as NLH (same strategy, different expression) went 30.4% → 47.2%, 361 → 141 min runtime, 1,200 → 34 LLM calls.
6. **A harness optimized on one model transfers to five others and improves all of them.**
7. **Smaller model + optimized harness beats larger model.** Haiku + Meta Harness outranks Opus + Meta Harness (76.4% on terminal-bench 2).

## Two Failure Modes of Naive Harnesses

1. **One-shotting** — the agent tries everything at once and exhausts its context.
2. **Premature completion** — a later session sees partial progress and declares victory.

Anthropic's fix: a three-agent GAN-inspired **planner / generator / evaluator** architecture where the evaluator clicks through the running app like a real user. 20x more expensive ($200 vs $9) but actually worked.

## Canonical Patterns

Anthropic's five building blocks (see [Agent Orchestration Patterns](agent-orchestration-patterns.md) for the full page):

- Prompt chaining
- Routing
- Parallelization
- Orchestrator-workers
- Evaluator-optimizer loops

Production agents combine these. The architectural mix, not the model, drives the performance gap.

## Craft of Subtraction

Every harness component encodes an assumption about what the model can't do — and those assumptions expire. Mature harness work therefore looks less like construction and more like pruning:

- **Anthropic dropped context resets** once Opus 4.6 no longer needed them.
- **Vercel removed 80% of an agent's tools** and got better results.
- **Manus rewrote their harness 5x in 6 months.**

The harness space doesn't shrink as models improve — it moves. Re-audit the harness on every model upgrade and actively delete scaffolding that no longer earns its keep.

## Representation as a Lever

How you *express* the harness is as consequential as what modules it contains. OS Symphony was rewritten from code into NLH — same strategy, same model — and jumped 16.8 points with a 60% runtime cut and 35x fewer LLM calls. See [Natural Language Harness](natural-language-harness.md).

## Harness as Reusable Asset

Unlike a prompt or a model weight, an optimized harness is long-lived IP:

- Transfers across models (one harness → five models all improve)
- Enables smaller/cheaper model choices (Haiku + harness beats Opus without)
- Compounds across re-runs against future models

Practical implication: treat a harness you expect to re-run as an asset you invest in, not a script you rewrite each quarter.

## Shared Harness Artifacts Are an Attack Surface

Two threats from the research:

- **Prompt injection in harness text** — malicious instructions can live inside shared skills, AGENTS.md files, or tool descriptions.
- **1-in-4 community-contributed agent skills contains a vulnerability.**

Treat third-party skills / AGENTS.md / tool packages like third-party code dependencies: review, pin, isolate blast radius.

## Anthropic's Primary Sources (2024-2026)

The harness-engineering discipline has a documented lineage in Anthropic's own engineering posts. Key landmarks:

| Date | Post | What it added |
|------|------|--------------|
| 2024-12-19 | Building effective agents | Canonical **workflows vs agents** distinction and the five patterns — the vocabulary the field now uses |
| 2025-09-29 | Effective context engineering | Named **context rot** (n² attention), formalized **just-in-time retrieval** over pre-loading, and the three long-horizon strategies: compaction / structured note-taking / sub-agent decomposition |
| 2025-11-26 | Effective harnesses for long-running agents | **Initializer / coding agent split** — initializer writes `init.sh`, progress file, and a 200+ failing-feature checklist; coding agent picks one feature at a time. Commit-per-feature as the cross-window persistence layer. **Puppeteer MCP** for E2E verification over unit tests |
| 2026-03-24 | Harness design for long-running apps | **GAN-style Planner / Generator / Evaluator** harness. Named **context anxiety** and **self-evaluation bias**. Introduced **sprint contracts**. Documented the 20× cost delta ($200 vs $9) for generator-evaluator runs |
| 2026-04-15 | Scaling managed agents | **Brain / Hands / Session decoupling** — OS-style virtualization of the agent. Credentials outside the sandbox, lazy container provisioning (-90% p95 TTFT). See [Claude Managed Agents](../tools/claude-managed-agents.md) |

## Context Engineering Inside the Harness

The harness is where context engineering actually lives. See [Context Engineering](context-engineering.md) for the full treatment. Key primitives the harness wires:

- **Just-in-time retrieval** via narrow, non-overlapping tools instead of pre-loading
- **Full context resets with handoff artifacts** beat compaction for cross-session coherence (Anthropic March 2026)
- **File-backed progress** (progress file, commit log) survives window turnover
- **Context anxiety mitigation** — give the agent an explicit failing-feature list so window pressure doesn't push it to declare "done"

## Generator-Evaluator as Production Pattern

The GAN-inspired **Planner → Generator → Evaluator** loop is evaluator-optimizer taken seriously — evaluator is a full agent (not a judge call), rubric is explicit (design/originality/craft/functionality), and evaluator runs the app with Playwright/Puppeteer. 5-15 cycles per artifact. Full detail on [Generator-Evaluator Harness](generator-evaluator-harness.md).

## Brain / Hands / Session Decoupling

Anthropic's Scaling Managed Agents post (April 2026) operationalizes the OS analogy as a three-way split:

| Component | Role | Recovery |
|-----------|------|----------|
| **Brain** | Stateless harness | `wake(sessionId)` + `getSession(id)` |
| **Hands** | Interchangeable sandboxes — uniform `execute(name, input) → string` | Re-provision on tool-level error |
| **Session** | Append-only log *outside* the context window | Model re-queries history without irreversible trimming |

Design rule: **each layer has an independent lifecycle.** Failure of one shouldn't kill the session. Credentials live outside the sandbox (bundled at init or in vaults) so generated code can't reach them.

This is a sharper operationalization of the OS analogy above: the session log is durable state ("disk") held distinctly from the harness ("OS") and the sandbox ("device drivers").

## Initializer / Coding Agent Split

For multi-context-window builds (Anthropic, November 2025):

- **Initializer agent** — writes `init.sh`, progress file, feature list with 200+ failing flags, makes first commit
- **Coding agent** — picks one feature, implements, verifies E2E with Puppeteer MCP, commits, moves on

Failure modes mapped to fixes:

| Problem | Fix |
|---------|-----|
| Premature "done" | Feature list with explicit failing flags |
| Lost context between sessions | Git commits + progress file |
| Marked-passing-but-broken | Mandatory E2E browser test |
| Runtime confusion | Pre-written `init.sh` |

The persistence layer is git itself — commit-per-feature lets the next session reconstruct progress without reading prior chat history.

## Related Pages

- [Natural Language Harness](natural-language-harness.md) — NLH, execution contracts, three-layer separation
- [Meta Harness](meta-harness.md) — optimizing the harness itself (Omar Khattab / DSPy creator)
- [Agent Orchestration Patterns](agent-orchestration-patterns.md) — Anthropic's five canonical patterns
- [Agent Platform Tiers](agent-platform-tiers.md) — harness ownership is one of the three lock-in surfaces
- [Claude Managed Agents](../tools/claude-managed-agents.md) — Anthropic's "meta-harness" product framing
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — prior-era techniques that still live inside the harness
- [Auto Research](auto-research.md) — self-improving loop related to self-evolution findings
- [Context Engineering](context-engineering.md) — the prior-era discipline the harness now absorbs
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — production variant of evaluator-optimizer
