---
title: "Context Engineering"
description: "The discipline of curating what tokens occupy a model's context window across a session, as the successor to prompt engineering"
type: "concept"
pillar: "understanding"
tags: [context-engineering, context-rot, just-in-time-retrieval, sub-agents, compaction, prompt-engineering, agents, cdlc, progressive-disclosure, claude-md]
sources:
  - "summaries/2025-09-29_anthropic_effective-context-engineering.md"
  - "summaries/2026-03-24_anthropic_harness-design-long-running-apps.md"
  - "summaries/2025-11-26_anthropic_effective-harnesses-long-running-agents.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
  - "summaries/2026-05-06_claude-code-docs_context-window.md"
  - "summaries/2026-05-06_claude-code-docs_memory.md"
  - "summaries/2026-04-24_ai-engineer_workflow-for-ai-coding-matt-pocock.md"
  - "summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md"
  - "summaries/2026-05-16_simon-scrapes_3-claude-memory-systems-to-get-you-ahead-of-99pct-of-people.md"
  - "summaries/2026-03-09_ibm-technology_is-rag-still-needed-rag-vs-long-context.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md"
  - "summaries/2026-08-08_ai-engineer_anthropic-cca-exam-field-guide-agentic-engineering.md"
  - "summaries/2026-09-01_cole-medin_11-tiny-coding-agent-fixes-with-a-stupid-amount-of-payoff.md"
timestamp: "2026-09-03"
---

# Context Engineering

The discipline of curating what tokens occupy the model's context window across a session — framed by Anthropic (Sep 2025) as the successor to prompt engineering. Where prompt engineering optimizes a single message, context engineering treats the window itself as a finite resource to budget, prune, and refill over time.

## The Core Problem: Context Rot

Transformer attention is O(n²) over tokens. As context fills, each token gets a thinner slice of attention budget, and model performance degrades. The counterintuitive consequence:

> **More context ≠ better answers.**

Pre-loading reference docs, chat history, and tool output into the system prompt is usually worse than loading nothing and retrieving on demand.

The same effect shows up in the RAG-vs-long-context debate under the name **needle-in-a-haystack**: as a window grows to hundreds of thousands of tokens, attention dilutes and a fact buried in the middle gets missed or hallucinated around. This is why "just dump everything in" is not a universal win — see [RAG vs Long Context](../comparisons/rag-vs-long-context.md) for when retrieval-and-filter beats stuffing the window.

Related failure mode documented in Anthropic's long-running-apps work (March 2026): **context anxiety** — models prematurely conclude work as their context fills. The window pressure itself biases the agent toward declaring "done."

### Smart Zone vs Dumb Zone

The operational shorthand for context rot, popularized by Dex Hardy and Matt Pocock: every session has a **smart zone** where the model still reasons well and a **dumb zone** where competence has degraded. Treat ~100K tokens as the practical ceiling for coding tasks regardless of advertised window size. Matt's framing on 1M context: "they shipped a lot more dumb zone" — the bigger window helps retrieval (sparse-attention) but not the dense reasoning coding requires. See [Smart Zone vs Dumb Zone](smart-zone.md) for the full operational discipline (`/clear` over `/compact`, exact-token status line, tiny system prompts).

## The "Right Altitude" for System Prompts

System prompts should sit between two failure modes:

- Too rigid — hardcoded decision trees the model can't flex around
- Too vague — high-level platitudes with no concrete signal

Aim for **concrete signals + flexibility**: enough specificity for the model to act, enough headroom for it to adapt.

## Just-in-Time Retrieval

> "Mirrors human cognition: we don't memorize entire corpuses." — Anthropic

Prefer tools that load information when needed over stuffing it upfront.

- Retrieve via `read`, `search`, `grep` tools at the moment of use.
- Tool design rule: each tool is self-contained, clear, with no functional overlap.
- This is also the pragmatic alternative to RAG pre-loading for coding agents.

## Three Long-Horizon Strategies

For multi-turn or multi-window tasks, Anthropic names three techniques — used individually or combined:

| Strategy | Mechanism | When to use |
|----------|-----------|-------------|
| **Compaction** | Summarize the session, reinitiate with the summary | Single long session, fresh restart acceptable — for cross-session work, see [Compaction vs Full Reset](#compaction-vs-full-reset) |
| **Structured note-taking** | Persist artifacts to files outside the context window | State must survive compaction / restart / handoff |
| **Sub-agent decomposition** | Spawn focused child agents that return condensed summaries | Parallelizable subtasks with well-bounded outputs |

## Compaction vs Full Reset

Anthropic's long-running-apps work (March 2026) sharpens this: for cross-session coherence, **full context resets with structured handoff artifacts beat compaction.** Compaction carries context-rot forward; a fresh window reading a durable artifact does not.

<!-- Earlier versions of this section stated the reset-over-compaction default without a trigger mechanism; Coyle (2026-08-08) added the threshold instrumentation, scoped to programmatic loops, on 2026-08-13. -->

Pattern: commit-per-feature + progress file + `init.sh` (see [Harness Engineering](harness-engineering.md) for the initializer/coding-agent split).

### Instrument the Threshold, Then Choose the Action

Coyle (Aug 2026) contributes the *trigger* rather than the action: rather than letting a session drift until the window forces a decision, measure and act at a number you picked — *"you can check your token count, and you can determine how big the token count is. And if you can set some limit — if you have more than 150,000 tokens, then what you want to do is you can run a compact"* [16:46].

Split that into two claims, because they carry different weight.

**The instrumentation half is the durable part, and it is action-agnostic.** A token counter wired into the loop plus an explicit threshold is compatible with either resolution above — the same 150K trip-wire can fire a reset just as easily as a compaction. It converts an implicit, drifting failure into an explicit, scheduled decision point. Adopt this regardless of which action you choose.

**The action half does not displace the default above.** Coyle recommends compaction without engaging the reset alternative, and is candid that the mechanism is opaque to him: *"Not quite sure how the implementation is of that, but there is compaction"* [17:12]. Against that sit two sources arguing from mechanism — Anthropic's long-running-apps work on context-rot carry-forward, and Pocock's determinism argument for `/clear` (see [Smart Zone § `/clear` Beats `/compact`](smart-zone.md)). So: **at the threshold, prefer a reset with a handoff artifact.** Reach for compaction when a reset is genuinely impractical.

**When is it impractical?** Coyle's own setting is the honest answer, and it is narrower than his phrasing suggests: a single long *programmatic* agent loop with no natural checkpoint to hand off at — not an interactive Claude Code session, where `/clear` plus a progress file is available and cheap. That case already falls inside the slot the strategies table sanctions ("single long session, fresh restart acceptable"), which is why this reads as a scoping of the existing guidance rather than a reversal of it. *(Source: Frank Coyle, AI Engineer 2026-08-08)*

### Compression Logic Is Pluggable

Where you *do* compact, the retention policy need not be the framework's default. Frank Coyle (AI Engineer, Aug 2026) flags that a framework can expose compression as an extension point — the vendor *"provides custom logic for compression of context ... and you can write your own. He's got — you can extend his base class and have your own compression of your data, whatever you think is important"* [17:47-18:03]. The concrete instance is Mastra's `MemoryProcessor` base class, from Sam Bhagwat's *Principles of Building AI Agents*.

This matters because the standard objection to compaction — that it discards unpredictably — is partly an artifact of using a *generic* summarizer on domain-specific state. Coyle is candid that the built-in path is opaque to him: *"Not quite sure how the implementation is of that, but there is compaction"* [17:12]. A domain-aware processor that pins the invariants you know matter is a different proposition from a general-purpose summarize-and-hope. It does not dissolve the [full-reset argument](#compaction-vs-full-reset) above — a custom processor still carries forward whatever it retains — but it does narrow the gap where a reset is impractical. *(Source: Frank Coyle, AI Engineer 2026-08-08)*

## Design Rules

1. **Stop pre-loading data.** Use just-in-time retrieval through tools.
2. **Treat every token as budget.** Cut what doesn't earn its slot.
3. **Push state outside the window.** Files, progress logs, commits.
4. **Tools must not overlap.** Each tool has one clear purpose.
5. **Re-audit on every model upgrade.** Newer models handle more natively; subtract scaffolding that's no longer needed (see craft of subtraction in [Harness Engineering](harness-engineering.md)).

### Rule 5, Taken Seriously: The 80% Cut

The most aggressive published instance of rule 5. Claude Code deleted **80% of its system prompt** on the Opus 5 release, because most of it was *"correcting for these behaviors that the model should have known, but it didn't. Now, Opus 5 just does it"* [04:20-04:29]. The context-engineering reason this is not just tidiness: *"the model is going to read this instruction every single time you use it"* [08:21-08:27] — a stale instruction is rent paid on every invocation, and ablation shows the model is slightly *more* capable without the accumulated corrections.

The upgrade to rule 5 is procedural: **re-audit is not enough, because you can't tell by reading which lines still earn their slot.** The method is ablation — delete everything, then add back only on *repeated* stumbles — and it applies to user-side context artifacts too: *"every 6 months delete your Claude MD. Delete your skills. Delete your hooks"* [06:55-07:08]. See [Harness Engineering § Ablation](harness-engineering.md#ablation-the-named-procedure-cherny-july-2026) for the full procedure and the `CLAUDE_CODE_SIMPLE=1` instrument. *(Source: Boris Cherny, Y Combinator 2026-07-27)*

## Token Data: What Claude Code Actually Loads

Anthropic's May 2026 "Explore the context window" doc gives concrete token budgets for Claude Code — turning the abstract context-engineering principles above into operational numbers:

| Component | Approx. tokens |
|-----------|----------------|
| System prompt | ~4,200 |
| Project CLAUDE.md (well-tuned) | ~1,800 |
| `~/.claude/CLAUDE.md` | ~320 |
| Auto memory (MEMORY.md index) | ~680 |
| Environment info | ~280 |
| Skill descriptions | ~450 |
| MCP tool names | ~120 |
| **Baseline before first prompt** | **~7,850** |
| Each file read | ~1,000–3,000 |
| Each hook `additionalContext` | ~100–120 |
| Subagent summary back to main | ~420 (vs 6,100+ for its file reads) |

Two operational consequences:

1. **File reads dominate mid-session** — and they're hidden (terminal shows only "Read auth.ts"). Three files + path-scoped rules + grep results easily add 6,000 tokens.
2. **Subagents are the mathematical justification of the architectural pattern.** A subagent's 6,100 tokens of file reads → 420-token summary back. The subagent isn't just "tidier" — it's an order of magnitude cheaper for the parent's context.

### What Survives `/compact`

The `/compact` command isn't symmetrical — it preserves things differently depending on **where instructions live**:

| Lives where | Re-injected after compact? |
|-------------|---------------------------|
| Project-root CLAUDE.md | ✓ automatically |
| Auto memory (MEMORY.md) | ✓ automatically |
| Path-scoped rules in `.claude/rules/` | ✗ until the matching file is read again |
| Nested CLAUDE.md files | ✗ until the matching file is read again |
| Skill descriptions | ✗ — only invoked skill bodies survive (capped 5K tokens/skill, 25K total budget, newest first) |

**Operational rules:**
- Rules that must survive compaction → project-root CLAUDE.md.
- Important skill instructions → near the top of `SKILL.md` (truncation keeps the start).
- Skills with `disable-model-invocation: true` → **zero context cost** until invoked. Use for any skill with side effects (commit, deploy, send messages).

### Path-Scoped Rules as a Context Lever

Rules in `.claude/rules/` with `paths:` frontmatter only load when Claude reads a matching file. Language-specific conventions (`paths: ["src/api/**/*.ts"]`) belong here, not in CLAUDE.md — they don't pay context tax on every session, only when relevant.

### Inspection

```
/context    # Live breakdown of context usage by category with optimization suggestions
/memory     # See which CLAUDE.md and auto memory files loaded at startup
```

This is the practical instrument panel for the abstract context-engineering discipline above.

## CLAUDE.md as Router, Not Repository

The user-facing form of progressive disclosure, reported from an article by Anthropic engineer **Tariq** ("The new rules of context engineering for Claude 5 models") — *secondhand, via Jay E / RoboNuggets; the article itself has not been ingested.* Progressive disclosure is defined there as **"loading the right context at the right times."** The reported reversal:

> **Then:** CLAUDE.md as "a central repository of every known practice that you might run into."
> **Now:** it "becomes more powerful if you make it function as a router to your tree of files" [11:45-11:53].

The stated reason is capability-side: Claude Code's system prompt used to carry a detailed code-review verification procedure — rarely needed, crucial when needed — because the model couldn't be trusted to go fetch it. Claude 5-generation models are said to be competent at fetching what they need, so it can be deferred.

**The split rule that makes this operational:** split CLAUDE.md by *when the content is needed*, not by topic. Anything needed on every turn stays; anything needed only in a particular kind of session moves out to a domain file with one routing line pointing at it.

### The Sub-Router Pattern

Jay E's own two-level instantiation (his extension, not the article's — the article as reported says only "tree of files"):

```
CLAUDE.md  (thin router — "which department is this?")
  ├── content.md    → ideation skills, research/production refs, video skills
  ├── community.md
  ├── product.md
  ├── personal.md
  └── business.md
```

Motivated by a 57,000-file workspace, but the pattern is generic: identify the "departments" of your work and give each a sub-index. Rule of thumb from the same source — past ~5 domains, add the middle layer rather than widening the router.

### The Token-Cost Corollary

Also Jay's own argument, not attributed to the article, and worth separating because **it survives even if you are sceptical of the capability-jump premise.** CLAUDE.md is injected at the top of *every* session, so a thick one spends its token cost per session, before your first prompt does any work. A thin router therefore compounds: more sessions, larger accumulated saving, later you hit usage limits. Straightforward arithmetic — it needs no claim about Claude 5 being smarter.

Measure it: `wc -c CLAUDE.md` ÷ ~4 for a rough token count, × sessions per week. That is the standing tax on your operating contract.

This is the same shape as two patterns already on the wiki, arrived at independently: Ryan Lopopolo's [AGENTS.md as table of contents, not encyclopedia](harness-engineering.md#harness-as-repo-artifacts-ryan-lopopolo-openai) (~100-line map into a structured `docs/` tree), and the L1/L2/L3 loading model of [Agent Skills](agent-skills.md#progressive-disclosure-three-levels). The router framing is the CLAUDE.md-specific case of a principle the wiki already holds in two other places. *(Source: Tariq via Jay E / RoboNuggets, 2026-08-03 — secondhand)*

## Sub-Agents as Context Buffers

Cole Medin's framing (April 2026) diverges from the common "sub-agents = parallelism" pitch: for him, sub-agents exist primarily for **context budgeting**, not concurrency. A research task (codebase exploration, web search, dependency analysis) burns 30k–100k tokens; the parent agent only needs the 2k-token summary. Push the research into a sub-agent that burns those tokens in *its own* context window and returns a condensed result.

The reframing has a corollary that matters more as windows grow:

> *"They get overwhelmed just like people do. Just because you can fit a million tokens doesn't mean you should."* — Cole Medin

A 1M-token window does **not** eliminate context overload — the dense-reasoning ceiling for coding stays roughly where it was (see [Smart Zone vs Dumb Zone](smart-zone.md) for Matt Pocock's parallel argument). The bigger the model's window gets, the more important explicit context-budgeting discipline becomes, because the *temptation* to dump everything in is greater.

This complements the token-budget table above: the subagent's 6,100 tokens of file reads → 420-token summary back isn't merely "tidier" — it's an order-of-magnitude protection of the parent's smart zone. The architectural pattern is justified by the math, regardless of the advertised window size. *(Source: Cole Medin)*

## Memory Systems as a Context-Engineering Surface

Simon Scrapes (May 2026) frames any agent memory system around three questions — **storage, injection, recall** — and the framework is, at its core, a context-engineering lens. *Injection* is the fixed per-session token cost a memory layer imposes; *recall* is the on-demand retrieval cost. Lean injection (a curated ~1,300-token frozen snapshot, cached) beats fat injection (30k tokens of raw history) for the same reason just-in-time retrieval beats RAG pre-loading: the goal is "load the right small thing at the right time," not "load more."

The pattern of tiered recall — Tier 0 in-context check → vector/keyword index → expansion → raw transcript — is the memory-system specialization of just-in-time retrieval: each tier costs more tokens, descend only when the cheaper tier fails. See [Agent Memory Systems](agent-memory-systems.md) for the storage/injection/recall framework, Simon's three-system comparison (Claude Code automemory vs memarch vs Hermes), and the hybrid blueprint. *(Source: Simon Scrapes)*

## Relationship to Harness Engineering

Context engineering is the middle of the three eras (prompt → context → harness). Harness engineering absorbs context engineering — the harness is where compaction, note-taking, and sub-agent delegation are actually wired. See [Harness Engineering](harness-engineering.md) for the bigger picture.

## Context as a Code-Class Artifact: The CDLC View

Patrick Debois (Tessl, ex-DevOps originator) sharpens the framing in *Context Is the New Code* (AI Engineer, May 2026): once prompts and instructions are generated, reused, and committed (`agent.md`, skills), they have all the surface area of source code — and code is *folding back into context* as skills replace branching helpers (the agent does the branching at runtime against far more variation than a helper could enumerate). His conclusion: context deserves its own SDLC analog — the **Context Development Life Cycle (CDLC)**: Generate → Test → Distribute → Observe → Adapt, infinity-loop. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

This complements the Anthropic-derived view above: context engineering is *what tokens occupy the window*; the CDLC is *the lifecycle of the artifacts that produce those tokens*. See [Context Development Life Cycle](context-development-life-cycle.md) for the five-phase breakdown and the eval-tax argument it implies.

The hidden cost (from Debois's Q&A): the time you save by writing context instead of code gets spent writing the evals that make the context trustworthy — the meta-skill is "the process for building the right evals." This pulls eval discipline (see [Agent Evaluation](agent-evaluation.md)) into the context-engineering loop, not just the model-output loop.

## Reference Artifacts Past Markdown

A format claim that cuts against the wiki's own default of markdown-for-everything. Reported from the same Tariq article: **then**, plans, specs, and reference artifacts were written in markdown because markdown is simple and light and weaker models handled it most reliably; **now**, models handle "increasingly more complicated references," so the format constraint no longer binds [18:04-19:38].

The reasoning underneath the rule is stronger than the rule itself, and it is Jay's, not the article's — three audiences, one format:

1. **The agent parses it fine** — "under the hood, this is all still just code and still just text."
2. **You can open it in a browser and see it.** A markdown file listing colour hexes does not convey a palette; an HTML page renders it.
3. **Third parties can read it too** — reference artifacts double as communication artifacts.

The conclusion: markdown's dominance was never about markdown being *good*, only about it being *safe* under a model-capability constraint. Remove the constraint and the format choice should be re-derived from the audience rather than inherited.

**Where this does and doesn't apply.** It applies to artifacts that lose information in markdown — design systems, dashboards, anything with colour, layout, or spatial relationships. It does *not* apply to CLAUDE.md, skill files, or wiki pages: those are read by the agent as instructions, and markdown's plainness is the point (see [Give the Model What It Wants](harness-engineering.md#give-the-model-what-it-wants) — cater to what the model was pretrained on).

Second-order use: an HTML explainer is also a comprehension tool for *you*. Asking for a long analytical output to be re-rendered as a single-file HTML explainer costs tokens and saves attention — a good trade when your token budget is loose and your attention is tight. *(Source: Tariq via Jay E / RoboNuggets, 2026-08-03 — secondhand)*

## Unresolved Tensions

### Has context rot materially receded in the Claude 5 generation? *(surfaced 2026-08-05)*

**Existing position** — *(sources: Cole Medin, `summaries/2026-04-30_cole-medin_principled-agentic-engineer-guide.md`; Matt Pocock via [Smart Zone vs Dumb Zone](smart-zone.md))*:

> "A 1M-token window does **not** eliminate context overload — the dense-reasoning ceiling for coding stays roughly where it was."

Held alongside this page's foundational claim: *"More context ≠ better answers."*

**New position** — *(source: `summaries/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md`, [15:16-15:49]; reported secondhand from Tariq, Anthropic)*:

> models "were more likely to listen to instructions at the end of the context window, which are the most recent messages, than the ones at the start" — and this has "actually changed" with Fable 5 / Opus 5.

**Why this is held open rather than merged.** The two claims may not be about the same mechanism: the existing position concerns a *dense-reasoning ceiling* as the window grows, the new one concerns *recency dominance* within a filled window. They are adjacent, and a reader could take the new claim as narrowing the old rather than contradicting it. But the new claim is asserted with no evidence, benchmark, or magnitude, and reaches this wiki secondhand — not enough to move a position held here from two independent practitioners.

**Why it matters operationally.** This is not a bookkeeping disagreement. The recency-dominance claim is the load-bearing premise for the deduplication rule in [Tool Design for Agents § Deduplicate Between System Prompt and Tool Descriptions](tool-design-for-agents.md#deduplicate-between-system-prompt-and-tool-descriptions): repetition was a workaround for recency dominance, so deleting duplicate instructions is only safe to the extent that recency dominance has genuinely receded. If it has receded only partially, that rule is riskier than it reads.

**What would resolve it:** ingesting Tariq's original article ("The new rules of context engineering for Claude 5 models"), or any first-party benchmark on instruction adherence by position-in-window for the Claude 5 generation.

## The Instruction Budget: Less Is More, Increasingly

A corollary of context rot that applies specifically to *always-on* instruction files. Cole Medin (Sep 2026): "for context, less is more, and this is becoming more and more true over time as large language models get more capable" [08:43]. The mechanism is the same dilution argument as everywhere else on this page — every line of standing rules is a line competing for attention with the task — but the *reason it is getting worse* is model capability. Instruction that was load-bearing in 2024 is now bloat:

- **Generic engineering principles** — DRY, KISS, "here's how you write a pull request", "here's how you do a code review". The model knows. Medin: "those things, they hurt more than help now in your global rules" [09:19].
- **The thousand-line CLAUDE.md** that people used to build. "It is not helping you" [09:35].

**The budget:** Anthropic's stated recommendation is to keep rules under **200 lines**; Medin runs to ~300 and is explicit that no exact number is meaningful — the number is a forcing function, not a threshold.

**The retention test:** global rules hold only the project-specific constraints and conventions that apply *no matter what the agent is working on*. Everything else is either scrapped or moved into a task-specific context file the agent is told to read when it hits that kind of work — the [progressive-disclosure](#progressive-disclosure) move applied to your own instructions. *(Source: Cole Medin, 2026-09-01)*

### Compaction's Retention Rate, Quantified

The [reset-over-compaction](#compaction-vs-full-reset) default gets a number. Medin cites a study finding that only **~10% of a conversation's specific details survive `/compact`** [04:38], which he treats as unsurprising rather than a defect — you cannot preserve everything when collapsing a window into a summary. His sharper framing is about control rather than loss: `/compact` *is* a handoff document, "but it's one that you have barely any visibility into and you can hardly control what goes into it" [05:27]. That reframes the choice on this page as authored-vs-delegated handoff rather than reset-vs-summary.

Self-check he recommends: compact a real conversation, then ask the agent about small technical details from earlier in it. It will typically fail and admit the loss. *(Source: Cole Medin, 2026-09-01)*

## Related Pages

- [Harness Engineering](harness-engineering.md) — the successor discipline that subsumes context engineering
- [Context Development Life Cycle](context-development-life-cycle.md) — Debois's CDLC framework for context-as-code
- [Natural Language Harness](natural-language-harness.md) — file-backed state as a first-class harness primitive
- [Generator-Evaluator Harness](generator-evaluator-harness.md) — full context resets beat compaction for long runs
- [Prompt Engineering for Claude](prompt-engineering-claude.md) — prior-era techniques
- [Context Filter](context-filter.md) — WAF-style perimeter scanner for prompt injection in skills/agent.md
- [AI SBOM](ai-sbom.md) — supply-chain bill of materials for context packages
- [Smart Zone vs Dumb Zone](smart-zone.md) — operational ~100K threshold and `/clear` discipline
- [Plan and Review](plan-and-review.md) — Knight-Webb's time-axis discipline (5-minute threshold) that complements this context-axis frame
- [Agent Memory Systems](agent-memory-systems.md) — storage/injection/recall framework applied to runtime memory layers
- [RAG vs Long Context](../comparisons/rag-vs-long-context.md) — the same context-rot / attention-dilution effect, applied to the document-QA architecture choice
- [Retrieval-Augmented Generation (RAG)](rag.md) — foundational reference for the retrieve-on-demand mechanism that just-in-time retrieval generalizes
- [Boris Cherny](../people/boris-cherny.md) — the 80% cut and the ablation discipline behind rule 5
