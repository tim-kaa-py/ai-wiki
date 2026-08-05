---
title: "Harness Engineering"
description: "The discipline of designing and pruning everything around an agent that isn't model weights, the third era after prompt and context engineering"
type: "concept"
pillar: "understanding"
tags: [harness-engineering, agents, agent-architecture, orchestration, evaluation, prompt-engineering, context-engineering, meta-harness, nlh, dspy, memory, dreaming]
sources:
  - "summaries/2026-04-14_py_rethinking-ai-agents-rise-of-harness-engineering.md"
  - "summaries/2024-12-19_anthropic_building-effective-agents.md"
  - "summaries/2025-09-29_anthropic_effective-context-engineering.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2026-04-15_anthropic_scaling-managed-agents.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-04-17_ai-engineer_harness-engineering-humans-steer-agents-execute.md"
  - "summaries/2026-02-11_openai_harness-engineering-leveraging-codex-agent-first-world.md"
  - "summaries/2026-04-13_anthropic_claude-prompting-best-practices.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
  - "summaries/2026-05-06_claude-code-docs_how-claude-code-works.md"
  - "summaries/2026-05-06_claude-code-docs_features-overview.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-05-08_claude_memory-and-dreaming-for-self-learning-agents.md"
  - "summaries/2026-06-10_beyond-coding_engineers-solving-code-review-bottlenecks.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md"
timestamp: "2026-08-05"
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
4. **Verifier *modules* and multi-candidate search actively hurt** on the same benchmarks (–0.8/–8.4 and –2.4/–5.6). See the scope note below — this is a narrower claim than "verification doesn't help."
5. **Representation alone can move a benchmark 16.8 points.** OS Symphony rewritten as NLH (same strategy, different expression) went 30.4% → 47.2%, 361 → 141 min runtime, 1,200 → 34 LLM calls.
6. **A harness optimized on one model transfers to five others and improves all of them.**
7. **Smaller model + optimized harness beats larger model.** Haiku + Meta Harness outranks Opus + Meta Harness (76.4% on terminal-bench 2).

### Scope Note: Two Different Things Called "Verification"

Finding 4 above and the verification-first guidance elsewhere on this page point in opposite directions only if "verifier" means one thing. It doesn't:

| | **Verifier module** (NLH finding 4) | **Verification channel** (Cherny, Anthropic docs, Carlini) |
|--|--------------------------------------|------------------------------------------------------------|
| What it is | A harness component that re-judges the agent's own output | An external artifact the agent can consult for ground truth |
| Signal source | Another LLM call, same or similar model | Test suite, type check, screenshot pixel-diff, fuzzer, numerical reference |
| Failure mode | Correlated error — the judge shares the generator's blind spots; adds latency and calls for little independent signal | Weak or absent coverage — the agent optimizes toward whatever the check happens to measure |
| Measured effect | Net negative on SWE-bench Verified / OS World in the NLH ablation | 2-3× quality (Cherny); the binding constraint on 16-agent autonomy (Carlini) |

The distinction is what reconciles finding 4 with *"verification I think is probably the single most important thing that people do not get right"* (Cherny, [20:25-20:35]) and with Carlini's *"the task verifier must be nearly perfect."* Cherny's flagship case is a pixel diff against a running reference app — not an LLM re-reading a diff and grading it.

**Honesty caveat on the mapping.** NLH's precise definition of its "verifier" module is inferred here from a summary of the paper, not read from the paper itself. The reconciliation is therefore a *probable* reading, not a verified one. If NLH's verifier module turns out to have had access to ground-truth signals (test results rather than model judgment), finding 4 becomes a genuine counterexample to the verification-first consensus and this note should be replaced by an open tension. Treat that as the check to run if you ever read the paper directly.

**What the two claims do agree on:** neither supports adding a verification *stage* for its own sake. Finding 4 says a judge without independent signal is worse than nothing; Cherny says build the ground-truth channel *before* writing the prompt. Both are arguments against verification theater — the disagreement is only about which artifact counts as verification.

## The Agentic Loop and Tool Categories (Anthropic Canonical)

Anthropic's "How Claude Code works" doc gives the canonical agentic loop and tool taxonomy that the harness coordinates:

**The loop:** `gather context → take action → verify results`, repeated as needed.

**Five tool categories** — every agentic capability is one of these:

| Category | Examples |
|----------|----------|
| File operations | Read, Write, Edit, Glob |
| Search | Grep |
| Execution | Bash |
| Web | WebFetch, WebSearch |
| Code intelligence | (LSP-based — language servers) |

**Operational consequence:** if Claude can't do something, it's usually because no tool covers it. That's the gap MCP, hooks, or skills fill. Before adding harness complexity, check whether a built-in tool already covers the need.

**Verify-first prompting** is the highest-leverage harness improvement. Anthropic's framing: providing test cases, screenshots, or runnable checks gives Claude a feedback loop. "Fix the bug" is weak; "fix the bug and verify tests pass" is strong. Add "verify by running X" to every task prompt — this is harness work expressed in the prompt.

## Extension Decision Map (Friction-Driven)

The May 2026 features-overview doc gives Anthropic's canonical decision map for which harness extension to add when. Each plugs into a different part of the agentic loop and carries different context costs:

| Friction signal | Add |
|-----------------|-----|
| Convention wrong twice | CLAUDE.md entry |
| Same prompt every time | Skill |
| Side task floods context | Subagent |
| Subagents need to share findings | Agent team (peer-to-peer) |
| Missing external data | MCP server |
| Must-happen automatically | Hook |
| Second repo needs same setup | Plugin |

**Don't design the extension layer upfront — let friction accumulate and respond.** This is the practical operationalization of the "craft of subtraction" above: every extension encodes an assumption, which means every extension is something to potentially prune later.

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

- **Anthropic dropped context resets** once Opus 4.6 no longer needed them. (A need-based pruning call — distinct from the technique preference under [Context Engineering Inside the Harness](#context-engineering-inside-the-harness): *when* you reset across sessions, full resets with handoff artifacts still beat compaction.)
- **Vercel removed 80% of an agent's tools** and got better results.
- **Manus rewrote their harness 5x in 6 months.**
- **Notion rewrote their agent harness five times** across ~3.5 years: JS coding-agent → XML representation → Notion-flavored markdown → SQLite → progressive disclosure with 100+ tools. Simon Last's framing: "I'm basically just doing that [rewriting everything] in a loop every six months."

The harness space doesn't shrink as models improve — it moves. Re-audit the harness on every model upgrade and actively delete scaffolding that no longer earns its keep.

### Ablation: The Named Procedure (Cherny, July 2026)

Boris Cherny supplies the *method* the section above only gestures at, plus the largest published datapoint for it: **Claude Code cut 80% of its system prompt on the Opus 5 release.** The procedure is borrowed straight from research practice:

> "You delete the entire system prompt and then you bring it back line by line to figure out what is the impact of each individual line." [06:01-06:09]

He classifies it explicitly as a species of eval — *"an eval where you delete things to figure out the impact"* [06:14-06:17] — and Anthropic runs the same procedure on tools: *"we unship tools all the time."*

**The instrument.** `CLAUDE_CODE_SIMPLE=1` is an undocumented environment variable that strips *all* system prompts including tool prompts. Its purpose is internal ablation, and the finding is counterintuitive:

```bash
claude --system-prompt "<your minimal prompt>"   # override entirely
CLAUDE_CODE_SIMPLE=1 claude                      # strip everything
```

> "The model is actually a little bit more intelligent without these prompts." [05:05-05:10]

The immediate qualifier matters as much as the finding: you still want *some* prompts in the shipped product *"because it helps you use the product"* [05:13-05:24]. **The prompt's remaining job is product behavior, not model capability** — those are now separable concerns. This is why 80% could go while Claude Code still feels like Claude Code, and why what remains in the harness is *"almost all... about safety and permissions and static analysis and there's a bunch of UI code"* [06:22-06:37].

**The rebuild order: delete → use → add back only on *repeated* stumbles.**

- *"You don't want to guess what's the instruction that the model needs because you might not predict it correctly"* [07:49-07:55] — so don't rebuild from a design; rebuild from observed failure.
- Add back *"only when you see it repeatedly stumble on the same thing"* [08:14-08:20], because *"the model is going to read this instruction every single time you use it"* [08:21-08:27].

The evidentiary bar for a new prompt line is **repetition**, not one bad run — which inverts normal engineering, where you fix a bug the first time you see it. A single failure is indistinguishable from sampling noise. The grounding premise is that the artifact is organic rather than designed: *"almost like a living creature... every model generation, it behaves differently. It has a slightly different personality"* [08:55-09:13]. Empirical observation, not up-front system design.

**It applies to your own config, not just to harness builders:**

> "For people that aren't building agentic products, but you're using Claude Code, every 6 months delete your Claude MD. Delete your skills. Delete your hooks. See what the model does and it might surprise you." [06:55-07:08]

Practical softening: git-stash `CLAUDE.md`, `.claude/skills/`, and hooks for a week rather than deleting outright, keep a stumble log, and reinstate only the lines that provably earn their tokens. *(Source: Boris Cherny, Y Combinator 2026-07-27.)*

**Second-source corroboration, with a caveat about its weight.** A separate Anthropic voice — engineer Tariq, in "The new rules of context engineering for Claude 5 models" — independently reports the same 80%+ cut with **no measurable loss on coding evals**, and the same judgment-over-rules direction (see [Prompt Engineering § Prescriptions → Criteria](prompt-engineering-claude.md#prescriptions--criteria-the-beforeafter-artifact) for the before/after artifact). This wiki has that account only *secondhand*, via a video summarizing the article, and it arrives without eval names or magnitudes. Where the two agree, cite Cherny — the firsthand interview. The corroboration raises confidence that the cut happened and roughly how large it was; it does not add independent evidence for *why* it worked. The article itself has not been ingested and is the obvious next source.

Note also the asymmetry in what the two sources recommend doing about it. Cherny's prescription is destructive and periodic — delete everything every six months, see what breaks. Tariq's, as reported, is structural — reorganize CLAUDE.md into a [router](context-engineering.md#claudemd-as-router-not-repository) so that rarely-needed content is deferred rather than deleted. These are complementary rather than competing: routing reduces what you pay for unconditionally, ablation determines whether a line deserves to exist at all. Routing a line that should have been deleted just moves the dead weight one hop away.

### Diagnose the Failure Class Before Escalating: Prompt → Skill → MCP

Cherny's escalation ladder for when the model struggles is a diagnosis-first refinement of the [Extension Decision Map](#extension-decision-map-friction-driven) above:

> "You have to see where it struggles and then you have to fix that either with better prompting or with a skill or if the model's missing context like give it a MCP so it can pull in the context that it needs." [23:44-23:58]

| Failure class | Fix |
|---------------|-----|
| Wrong framing | Prompt |
| Missing procedure | Skill |
| Missing context | MCP |

The rule is not "escalate in order" but **classify first, then pick** — don't reach for the heaviest tool because the light one failed once. Combined with the repeated-stumble bar above, this is the discipline that keeps the extension layer from accreting.

## Give the Model What It Wants

Notion's crystallization of a cross-era harness principle: don't cater your wire format to *your* system's data model — cater to what the model was pretrained on. Any mismatch tax is paid on every single token of every single call.

Two Notion case studies:

- **XML that losslessly mapped Notion blocks failed.** The model didn't natively know the dialect; it had to be prompt-taught on every call. Replaced with a **Notion-flavored markdown** — simple markdown at the core plus minimal enhancements, *not* lossless.
- **Custom JSON query format lost to SQLite.** Bespoke query DSL underperformed; switching to SQLite (which models handle fluently) worked immediately.

Rule of thumb: prototype new tool interfaces in the most vanilla format a frontier model already handles; only add custom structure when evals justify it.

## Progressive Disclosure Past Dozens of Tools

Notion's harness crossed 100 tools and every new tool "nerfed the overall model" — tokens ballooned and unrelated tools got over-called on unrelated prompts. The fix is progressive disclosure: reveal tools incrementally rather than dumping the full catalog into the system prompt.

- **CLIs get this for free** — the wrapper is the initial surface; `--help` and reading files expose capability on demand.
- **MCP does not get this by default** — the protocol is not inherently progressive; the harness has to layer search/help/namespacing on top (see [MCP](mcp.md) Tool Search).
- **Distributed tool ownership.** Few-shot-based systems force a center-of-excellence gate because every engineer edits one shared order-sensitive system prompt. Crisp per-tool goal descriptions let feature teams ship tools independently.

## Don't Hide the System Prompt

Notion explicitly doesn't treat its system prompt or tool list as secret sauce. Exposing the agent's tool surface builds user trust and turns power users into better prompters — they know what the agent can actually do. The "secret sauce" narrative is usually a rationalization for friction.

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

Patrick Debois (Tessl, AI Engineer 2026-05-03) sharpens the threat model: sandboxes don't catch this class of injection because coding agents auto-load `agent.md` / `skill.md` files into the prompt on download — by the time the sandbox boundary is enforced, the malicious instructions are already inside the LLM's context. The defense has to live **upstream of the LLM**, not around its execution. He frames this as a Web Application Firewall for context. See [Context Filter](context-filter.md). The bill-of-materials counterpart is [AI SBOM](ai-sbom.md). [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

## Anthropic's Primary Sources (2024-2026)

The harness-engineering discipline has a documented lineage in Anthropic's own engineering posts. Key landmarks:

| Date | Post | What it added |
|------|------|--------------|
| 2024-12-19 | Building effective agents | Canonical **workflows vs agents** distinction and the five patterns — the vocabulary the field now uses |
| 2025-09-29 | Effective context engineering | Named **context rot** (n² attention), formalized **just-in-time retrieval** over pre-loading, and the three long-horizon strategies: compaction / structured note-taking / sub-agent decomposition |
| 2025-11-26 | Effective harnesses for long-running agents | **Initializer / coding agent split** — initializer writes `init.sh`, progress file, and a 200+ failing-feature checklist; coding agent picks one feature at a time. Commit-per-feature as the cross-window persistence layer. **Puppeteer MCP** for E2E verification over unit tests |
| 2026-03-24 | Harness design for long-running apps | **GAN-style Planner / Generator / Evaluator** harness. Named **context anxiety** and **self-evaluation bias**. Introduced **sprint contracts**. Documented the 20× cost delta ($200 vs $9) for generator-evaluator runs |
| 2026-04-15 | Scaling managed agents | **Brain / Hands / Session decoupling** — OS-style virtualization of the agent. Credentials outside the sandbox, lazy container provisioning (-90% p95 TTFT). See [Claude Managed Agents](../tools/claude-managed-agents.md) |
| 2026-05-08 | Memory and dreaming for self-learning agents | **Memory as a primitive** alongside MCP / harnesses / Skills. File-system memory the model curates with bash/grep (Opus 4.7 SOTA). Multi-agent: permission scopes, optimistic concurrency, version history, portable API. **Dreaming**: out-of-band batch consolidator that mines transcripts for cross-agent patterns. See [Agent Memory Systems](agent-memory-systems.md), [Dreaming](dreaming.md) |

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

## Harness as Repo Artifacts (Ryan Lopopolo, OpenAI)

Ryan Lopopolo's April 2026 AI Engineer talk frames the harness not as wrapper code around the model, but as *the repo itself* — the lints, structural tests, reviewer agents, persona docs, error messages, and package layout that collectively tell the agent what "acceptable" means. The mental model is LLM-as-fuzzy-compiler: the constraints live in the harness, the code is a disposable build artifact, swapping models is like swapping LLVM for Cranelift.

Concrete techniques from an OpenAI team spending ~1B output tokens/day:

- **Code-as-text structural tests.** Assert properties of the source code, not behavior: files ≤350 lines, no duplicate zod schemas, single canonical async helper, package privacy, dependency direction. The codebase adapts to the harness. See [Code-as-Text Structural Tests](code-as-text-structural-tests.md).
- **Error messages as prompts.** Every lint/test failure is a free prompt-injection surface. Rewrite "unknown type not allowed" as "`unknown` is not allowed in domain code — we parse-don't-validate at the edge, derive a type from the zod schema in `packages/schemas/<entity>.ts`." Include the *why* so the agent generalizes.
- **Reviewer agents per persona, triggered on every push.** One agent per durable concern (reliability, front-end architecture, product, scalability) reads a "what good looks like" doc for its domain and surfaces P2+ issues. These replace synchronous human review as the merge gate. See [Reviewer Agents](reviewer-agents.md).
- **Garbage collection day.** A weekly ritual where the whole team's full-day job is to convert every recurring review comment from the week into a durable artifact — a lint, a structural test, a reviewer-agent rule, or a persona doc. Closes the loop that turns human review into compounding repo infrastructure.
- **Outside-in harness (Codex as entry point).** Build the repo so the coding agent is the entry point, not a guest in a dev shell. Skills (5-10, not thousands) hide local tooling churn so humans don't track internal changes.
- **Agent-driven monorepo architecture.** Ryan's team runs a 750-package PNPM workspace on a small team — because the agent lacks tacit domain knowledge a human team would share verbally. Package privacy and filesystem-encoded boundaries are how the agent *sees* the architecture. Scale is set by agent cognition, not headcount.
- **Plan-mode skepticism.** Unread approved plans encode unwanted instructions that the rollout faithfully follows. Either skip plans and let a well-specified ticket drop into implementation, or ship the plan as its own PR reviewed line-by-line before execution.
- **Remove yourself from the loop.** Every manual "continue" click is a harness failure — the agent lacked context to proceed. Encode the missing context in a skill or CLAUDE.md so it proceeds autonomously next time.
- **Spend tokens in CI, not just in-editor.** Ryan's rough split is a third planning/ticket curation, a third implementation, a third CI. If CI is <20% of your token spend, you're under-investing in acceptance (which is the new bottleneck — writing code is no longer hard).
- **LLM as fuzzy compiler.** Harness context (lints, tests, reviewer prompts) is to an LLM what LLVM static-analysis and optimization passes are to a Rust compiler. Swapping GPT-5 for GPT-6 is like swapping LLVM for Cranelift: different generated instructions, same soundness guarantees, because the constraints on acceptable output are defined outside the generation backend. This is Ryan's version of the bitter-lesson hedge — invest in constraint-surfacing, not hand-tuned orchestration.

The February 2026 written article adds the founding context and several artifacts the talk doesn't cover:

- **Agent legibility doctrine (stated directly).** "From the agent's point of view, anything it can't access in-context while running effectively doesn't exist." Justifies pulling Google Docs / Slack / tribal knowledge into the repo, and justifies reimplementing opaque dependencies (e.g., a bespoke `map-with-concurrency` helper instead of `p-limit`) when upstream behavior is illegible.
- **AGENTS.md as table of contents, not encyclopedia.** The team's "one big AGENTS.md" approach failed in four specific ways — context scarcity, prioritization collapse ("when everything is important, nothing is"), instant rot into a graveyard of stale rules, and unverifiability (no coverage / freshness / cross-link checks on a blob). The fix: ~100-line AGENTS.md that serves as a map into a structured `docs/` tree.
- **`docs/` as system of record.** Concrete publicly-shared layout with `design-docs/` (indexed with verification status + `core-beliefs.md`), `exec-plans/active|completed/` + `tech-debt-tracker.md`, `product-specs/`, `references/` (`*-llms.txt` reference snapshots), `generated/` (e.g., `db-schema.md`), and top-level `DESIGN.md`, `FRONTEND.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, `SECURITY.md`. Treats plans as first-class versioned artifacts.
- **Named architectural layer rule.** Within each business domain, dependencies flow forward only through `Types → Config → Repo → Service → Runtime → UI`. Cross-cutting concerns (auth, connectors, telemetry, feature flags) enter through a single explicit `Providers` interface; every other edge is disallowed and mechanically enforced. Ryan: "this is the kind of architecture you usually postpone until you have hundreds of engineers — with coding agents, it's an early prerequisite."
- **"Golden principles" as the named mechanism.** Opinionated mechanical rules codified into the repo (e.g., "prefer shared utility packages over hand-rolled helpers," "no YOLO data probing — parse at the boundary"). A background Codex task scans for deviations, updates quality grades in `QUALITY_SCORE.md`, and opens small auto-mergeable refactoring PRs. This replaced the team's original Friday-cleanup ritual with a continuous agent-driven process.
- **Doc-gardening agent.** A recurring Codex task that scans `docs/` for content no longer reflecting real code behavior and opens fix-up PRs. Pairs with CI linters that block merges when cross-links or freshness metadata break.
- **Per-worktree bootable app + CDP + ephemeral LogQL/PromQL stack.** The app boots per git worktree; Codex drives one isolated instance per change via Chrome DevTools Protocol (DOM snapshots, screenshots, navigation); logs/metrics/traces are exposed via an ephemeral local observability stack torn down with the worktree. Agents query logs with LogQL and metrics with PromQL, enabling prompts like "no span in these four critical user journeys exceeds two seconds." Single Codex runs regularly work a task for 6+ hours.
- **Changed merge philosophy under high throughput.** Minimal blocking merge gates, short-lived PRs, flakes handled with retries rather than blocking. "In a system where agent throughput far exceeds human attention, corrections are cheap, and waiting is expensive." Irresponsible at low throughput; right at high throughput.
- **End-to-end autonomy threshold.** A single prompt now drives Codex through: validate state → reproduce bug → record failure video → implement fix → validate → record fix video → open PR → respond to feedback → resolve build failures → escalate only when judgment required → merge. Ryan is explicit this is repo-specific and shouldn't be assumed to generalize without similar harness investment.

## Ralph Loops and the Single-Prompt Implementer (Pocock)

Matt Pocock's pipeline (AI Engineer 2026) instantiates a class of community-vocabulary harnesses called **Ralph loops** — named (after Ralph Wiggum) for their dumb relentlessness. Instead of writing a multi-phase plan, you loop a single prompt that says "make a small change toward the destination" and run it until done. Vanilla Ralph "works okay"; Matt's variant adds structure (PRD + Kanban DAG + priority order) over it.

### Implementer Prompt Priority Order

Matt's loop prompt hard-codes the next-task pick — this is the load-bearing structural addition over vanilla Ralph:

```
Pick the next task using this priority:
1. Critical bug fixes
2. Development infrastructure
3. Tracer bullets (vertical slices marked AFK)
4. Polishing, quick wins, refactors

If no AFK tasks remain, output: "no more tasks"
```

Why this matters as harness work: it prevents the agent from spending an overnight loop polishing while a broken test rots. Every Ralph harness needs a similar priority scaffold or it drifts toward whatever's easiest.

### `once.sh` First, Loop Second

Matt's pattern: ship `ralph-once.sh` (single-iteration runner) **before** `ralph-loop.sh` (the `while true` wrapper). New contributors run `once.sh` manually one issue at a time before letting it loop overnight. Reason: prompt-tuning needs that an autonomous loop will hide.

Shape of `once.sh`:

```bash
#!/usr/bin/env bash
issues=$(cat issues/*.md)
recent_commits=$(git log -5 --oneline)

claude --permission-mode accept-edits "$(cat <<EOF
$LOOP_PROMPT

## Backlog
$issues

## Recent commits
$recent_commits
EOF
)"
```

The loop is just `while true; do once.sh; done` with checkpointing. The *harness* lives in the prompt, the priority scaffold, the Kanban DAG, and the `accept-edits` permission mode — not in the bash wrapper.

### Sandcastle — Pocock's Parallel AFK Runner

For parallel AFK execution Matt published **Sandcastle**, a TypeScript library that runs the four-stage pipeline `planner → per-issue implementer → reviewer → merger`:

- **Planner** reads the Kanban DAG and returns the next batch of issues with no unmet blockers.
- **Implementer** runs **on Sonnet**, one process per issue, each in its own git worktree inside a Docker sandbox.
- **Reviewer** runs **on Opus** with **fresh context** and pushed coding standards. Inverted from intuition — review is where you need the smarts, implementation can grind.
- **Merger** resolves conflicts, type errors, and test failures across branches.

Push vs pull rule for coding standards: implementer **pulls** (skills sit in repo, agent reaches for them), reviewer gets standards **pushed** into the prompt verbatim. This is a representational decision about what each stage should and shouldn't have to discover. See also [Reviewer Agents § Coverage-First Prompting](reviewer-agents.md#coverage-first-prompting-on-opus-47).

Sandcastle is a working example of [Parallel Agent Patterns](parallel-agent-patterns.md) — specifically the orchestrator-worker variant with an evaluator-optimizer twist (the reviewer can reject and the merger can defer).

### "Feedback-Loop Quality Is the AI Ceiling"

Matt's compressed framing of why every loop in this section earns its place: **feedback-loop quality is the AI ceiling.** The harness's job is to construct that feedback loop:

- Verifier-as-tests inside the implementer loop ([Code-as-Text Structural Tests](code-as-text-structural-tests.md))
- Fresh-context reviewer on Opus ([Reviewer Agents](reviewer-agents.md))
- E2E browser verification (Anthropic's Puppeteer pattern, above)
- Per-worktree bootable app + observability (Lopopolo's pattern, above)

These all converge on the same operational rule: invest in feedback before you invest in capability. *(Source: Matt Pocock, AI Engineer 2026)*

## Harness-Over-Model: Buetow's Controlled TDD Experiment

Florian Buetow (Beyond Coding, June 2026) supplies a first-person case for the "harness matters more than the model" thesis (Stanford's 6x measurement and the Haiku-beats-Opus finding above are the quantitative version). Buetow ran the *same top frontier model* with a spec-prompt + TDD-behavioral-test setup under two different harnesses: it **worked in one and failed in the other**. Because the variable that flipped the outcome was the harness — tools, prompting, memory layer, tool execution — not the model, harness choice dominates. His corollary sharpens the [Craft of Subtraction](#craft-of-subtraction) and [Re-Audit on Model Upgrade](#re-audit-on-model-upgrade-opus-47-example) points into an anti-pattern: because the best harness is a moving target (his example: Claude Code then, Codex "now" for implementation), **standardizing an org on a single tool is itself an anti-pattern** — if forced onto one, find the tasks it is genuinely good at (PR docs, debugging) and use it there. *(Source: Florian Buetow, Beyond Coding 2026)*

## Horizontal vs Vertical Scaling of AI Engineering (Buetow)

Buetow's framing for *where* harness leverage lives:

| | **Horizontal** | **Vertical** |
|--|----------------|--------------|
| Move | Automate the human pipeline you already have — e.g. auto-review every PR with Copilot | A small specialized team builds custom tooling/environments so the product ships as intended |
| Mechanism | Wrap automation around the existing process | Guardrails, architecture tests, stop-hook feedback |
| Effect on quality | "They don't really talk about how that improves the quality" — it just moves the old process faster | Raises the quality ceiling by engineering the environment the agent runs in |

Buetow favors vertical: horizontal scaling automates the old process without raising quality, whereas vertical scaling is where the harness/environment leverage actually is. This is the same "engineer the environment, not the human-in-the-loop" thesis that [Reviewer Agents](reviewer-agents.md) and [Code-as-Text Structural Tests](code-as-text-structural-tests.md) carry from Ryan Lopopolo — the same idea from a different speaker. *(Source: Florian Buetow, Beyond Coding 2026)*

## Stop-Hook Guardrail Loop: The Concrete Plumbing (Buetow)

Buetow names the end-to-end mechanism that turns "guardrails" into an automated feedback loop with no human in the middle — the same components the [Ralph loop](#ralph-loops-and-the-single-prompt-implementer-pocock) and [error-messages-as-prompts](#harness-as-repo-artifacts-ryan-lopopolo-openai) sections describe, wired together as one recipe:

1. The CLI harness fires a **stop hook** when the agent finishes its work (see [Claude Code Hooks for Memory § Verification Hooks](../how-tos/claude-code-hooks-memory.md#verification-hooks-for-long-running-tasks) for the Anthropic "put guardrails in hooks" framing).
2. The hook runs a shell script executing the **guardrails** — linter, semantic grep, behavioral tests, architectural tests.
3. Each guardrail must "output like natural language text — this is forbidden, do it in this way," so its output *is* the correction a human would otherwise write.
4. That feedback re-triggers the agent; paired with a **Ralph loop / `goal` command** (Buetow treats the `goal` command as functionally equivalent to a Ralph loop), the agent "keeps running longer and longer until they fix the issue."

Buetow's umbrella term **guardrail** covers both the deterministic checks above *and* a prompt-based specialized review agent — he notes the term originally meant a prompt. The design property that unifies them: the feedback encodes the prompt a human would otherwise supply. His getting-started order is **static guardrails first** (cheap deterministic wins), then architecture, then spec validation — and he suggests **data-mining `~/.claude` session logs** for repeated corrections, converting each into a static check (a ~15-minute skill). *(Source: Florian Buetow, Beyond Coding 2026)*

## One Objective Per Agent: The Memory-Curation Split

A harness-design principle Anthropic's May 2026 memory work makes explicit: **agents perform best with one clear objective at a time.** Adding a second objective dilutes the first.

Mahes's framing applies this to memory: a working agent shouldn't *also* be curating the shared memory store. "Complete this task" and "keep the shared memory store coherent" trade off against each other, and the trade-off favors the urgent objective (the task) over the durable one (the store quality). Outsource memory quality into its own agent loop with its own success criterion — the **[Dreaming](dreaming.md)** pattern.

The principle generalizes. Three convergent arguments push the same direction for any "agent does X *and also* curates Y" setup:

- **Perspective** — a working agent sees only its own session; cross-session patterns require a consolidator that operates *above* sessions.
- **Harness design** — one objective per agent; splitting them lets each have its own success criterion.
- **Latency / compute** — curation benefits from exploratory token spend; the task's hot path cannot afford that latency.

The architectural take-away: **whenever you find a harness asking one agent to do task work and quality work in the same loop, that's a candidate for splitting.** Same logic that drives [Reviewer Agents](reviewer-agents.md), Anthropic's [Generator-Evaluator Harness](generator-evaluator-harness.md), and the [Sandcastle](parallel-agent-patterns.md#pattern-4-sandcastle--worktreesandbox-afk-pipeline-pocock) reviewer/merger split.

## Re-Audit on Model Upgrade: Opus 4.7 Example

When upgrading the model inside your harness, re-audit prompts that encoded workarounds for the *prior* model. Anthropic's Opus 4.7 guidance (April 2026) gives a concrete case: review harnesses tuned for Opus 4.6 with prompts like "only report high-severity issues" or "be conservative" *still work* on 4.7 but now over-filter — Opus 4.7 follows the conservatism more literally, investigating just as thoroughly and then dropping real findings below the stated bar. Measured recall falls even though capability improved (+11pp on Anthropic's bug-finding eval). The fix is harness-side, not model-side: split coverage from filtering across two stages, and keep the conservatism only in the filter stage. See [Reviewer Agents](reviewer-agents.md) for the concrete split.

Generalization: every prompt in the harness encodes an assumption about the prior model's behavior. Upgrades can invert those assumptions (4.6 over-spawned subagents and over-called tools; 4.7 under-spawns and under-calls). Dial-downs in one era become dial-ups in the next. This is the craft of subtraction in reverse — deletions and additions both need a re-audit cycle per model.

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
- [Code-as-Text Structural Tests](code-as-text-structural-tests.md) — tests that assert properties of the source code itself
- [Reviewer Agents](reviewer-agents.md) — persona-based CI reviewers that replace human PR review
- [Smart Zone](smart-zone.md) — the operational frame Pocock's harness is built around
- [Parallel Agent Patterns](parallel-agent-patterns.md) — Sandcastle as a worked example
- [Matt Pocock](../people/matt-pocock.md) — author of the structured Ralph variant
- [Agent Memory Systems](agent-memory-systems.md) — memory primitive at platform scale; permission scopes, OCC, audit
- [Dreaming](dreaming.md) — operationalization of "one objective per agent" applied to memory curation
- [Cognitive Debt](cognitive-debt.md) — the human-side risk the guardrail loop is meant to contain
- [Florian Buetow](../people/florian-buetow.md) — harness-over-model experiment, horizontal/vertical scaling, stop-hook guardrail loop
- [Boris Cherny](../people/boris-cherny.md) — ablation discipline, the 80% prompt cut, product overhang
- [Product Overhang and Hobbling](product-overhang.md) — why expired scaffolding stops being neutral and starts obstructing
- [Dynamic Workflows](dynamic-workflows.md) — orchestration as an axis of test-time compute
