---
title: "Rethinking AI Agents: The Rise of Harness Engineering"
source_type: "youtube"
channel: "PY"
date: "2026-04-14"
url: "https://m.youtube.com/watch?v=Xxuxg8PcBvc"
pillar: "understanding"
tags: [harness-engineering, agents, agent-architecture, prompt-engineering, context-engineering, meta-harness, dspy, nlh, evaluation, claude-code]
ingested: "2026-04-19"
extraction_method: "auto-captions"
video_id: "Xxuxg8PcBvc"
duration: "11:45"
---

[00:00] Same model, same benchmark, six times
[00:04] the performance difference. Stanford
[00:06] researchers found that the orchestration
[00:09] code wrapping a language model now
[00:12] drives more performance variation than
[00:14] the model itself. Langchain confirmed it
[00:17] by modifying only harness
[00:18] infrastructure. Their coding agent
[00:20] jumped from outside the top 30 to rank
[00:22] five on terminal bench 2. Two March 2026
[00:26] papers now formalize this from
[00:27] complimentary directions. And what they
[00:30] found redefineses what we should
[00:32] actually be optimizing when we build
[00:34] agents. Agent equals model plus harness.
[00:38] If you're not the model, you're the
[00:39] harness. That's how Langchain frames it.
[00:42] The sharpest definition of what agents
[00:44] actually are. But what does the harness
[00:46] half look like? The operating system
[00:49] analogy captures it. A raw LLM is a CPU,
[00:52] powerful but inert. No RAM, no disk, no
[00:56] IO. The context window acts as RAM, fast
[00:59] but limited. External databases serve as
[01:02] disk. Tool integrations are device
[01:04] drivers. The harness is the operating
[01:07] system coordinating what the CPU sees
[01:09] and when. Concretely, everything that
[01:12] isn't model weights, system prompts,
[01:15] tool definitions, orchestration logic,
[01:18] memory management, verification loops,
[01:21] safety guardrails.
[01:23] Anthropic identified five canonical
[01:25] patterns. Prompt chaining, routing,
[01:28] parallelization, orchestrator workers,
[01:30] and evaluator optimizer loops. Each a
[01:33] different strategy for when and how the
[01:35] model gets called. Every production
[01:38] agent combines these patterns.
[01:40] And those architectural choices, not the
[01:43] model underneath, drive the 6x
[01:45] performance gaps.
[01:48] If harnesses matter this much, how were
[01:50] people building them? messily logic
[01:54] scattered across controller code,
[01:55] framework defaults, verifier scripts.
[01:58] Two systems that nominally differed by
[02:01] one design choice actually differed in
[02:03] prompts, tools, verification gates, and
[02:07] state semantics simultaneously.
[02:10] Anthropic evolution exposes the pattern.
[02:13] Knive harnesses suffer two failure
[02:15] modes. oneshotting where the agent tries
[02:18] everything at once and exhausts its
[02:20] context and premature completion where a
[02:22] later session sees partial progress and
[02:25] declares victory. Their fix evolved into
[02:28] a three agent GAN inspired architecture
[02:30] planner generator and evaluator with the
[02:33] evaluator clicking through the running
[02:35] app like a real user. 20 times more
[02:38] expensive $200 versus 9. But now the
[02:42] core thing worked instead of being
[02:43] broken.
[02:45] Open AI converged independently.
[02:48] 5 months, a million lines of application
[02:50] logic, tests, CI and tooling. Zero
[02:54] manually written. And their discovery,
[02:57] the engineering team's primary job
[02:58] became enabling agents to do useful
[03:00] work, productive but ad hoc,
[03:02] non-portable, impossible to ablate.
[03:06] Standards did emerge. Agents MD reached
[03:10] 60,000 repositories.
[03:12] Anthropic's agent skills added reusable
[03:14] procedures, but both packaged
[03:17] components, conventions, and snippets,
[03:20] not the full harness itself. The field
[03:23] needed harness logic made explicit and
[03:25] executable.
[03:27] What if you could write an agent's
[03:29] entire control logic, not in Python, not
[03:32] in YAML, but in structured natural
[03:34] language? The Tingua team builds exactly
[03:37] this. Their natural language agent
[03:40] harness separates into three layers.
[03:42] Back end infrastructure and tools
[03:45] runtime charter, universal physics, how
[03:48] contracts bind, how state persists, how
[03:51] child agents are managed and the NLA
[03:54] itself, task specific control logic,
[03:57] contracts, roles, stage structure,
[04:00] failure taxonomies.
[04:02] Why this separation? It gives harness
[04:04] engineering something it never had.
[04:06] controlled experiments. Swap the NLH
[04:10] while fixing the charter. You're testing
[04:12] harness design. Fix the NLH while
[04:16] swapping the charter. You're testing
[04:17] runtime policy. Clean ablation at last.
[04:21] Two mechanisms underpin it. Execution
[04:24] contracts turn fuzzy LLM completions
[04:26] into bounded agent calls with five
[04:28] elements. Required outputs, budgets,
[04:31] permissions, completion conditions,
[04:33] output paths. Think function signatures
[04:36] for agents and filebacked state
[04:39] externalizes memory to path addressable
[04:41] files surviving truncation restarts and
[04:44] delegation.
[04:46] Same pass rate 14 times the compute.
[04:50] Does all this structure actually help?
[04:53] on swb bench verified with GPT5 four at
[04:57] maximum reasoning resolved rates
[04:59] clustered between 74 and 76% regardless
[05:02] of configuration
[05:04] but the full harness burned 16.3 million
[05:07] prompt tokens per sample 642 tool calls
[05:11] 32 minutes stripped down 1.2 2 million
[05:14] tokens, 51 calls under 7 minutes. Same
[05:18] destination, radically different paths.
[05:22] Then the module by module ablation found
[05:24] something stranger. Self-evolution was
[05:26] the only consistently helpful module.
[05:29] Plus 4.8 on SWE plus 2.7 on OS World.
[05:34] Via an acceptance gated attempt loop
[05:36] that stays narrow until failure signals
[05:39] justify broadening. Verifiers actively
[05:41] hurt minus0.8. 8 and - 8.4.
[05:45] Multicandidate search -2.4 and -5.6.
[05:50] More structure is not always better.
[05:53] The same paper's headline finding came
[05:55] from a different experiment. The
[05:58] researchers took OS symfony, a native
[06:01] code harness for desktop automation, and
[06:04] migrated its logic into NLH
[06:06] representation.
[06:08] Same strategy, different representation.
[06:12] Performance jumped from 30.4 to 47.2%.
[06:16] Runtime dropped from 361 minutes to 141.
[06:20] LLM calls collapsed from 1,200 to just
[06:24] 34. The representation itself drove the
[06:27] gain, replacing brittle GUI repair loops
[06:30] with durable runtime state and artifact
[06:33] backed completion. Two patterns
[06:36] crystallize from the full results.
[06:38] Roughly 90% of all compute flows through
[06:40] delegated child agents, not the parent.
[06:44] The harness is an orchestration pattern,
[06:46] not a reasoning pattern. It decomposes,
[06:49] delegates, and verifies.
[06:51] And the only module that consistently
[06:53] helps is the one that narrows the agents
[06:56] own attempt loop. Discipline narrowing
[06:58] beats expensive broadening every time,
[07:01] which raises a question. If
[07:03] representation matters this much, can we
[07:05] find the right harness automatically?
[07:08] Representation alone moved one benchmark
[07:11] 16.8 points. Same logic, same model,
[07:15] just rewritten as natural language. If
[07:18] how you express the harness matters that
[07:20] much, what about optimizing it
[07:22] automatically?
[07:23] Meta harness from Stanford's Omar Katab,
[07:26] creator of DSPI, treats the harness as
[07:29] an optimization target.
[07:31] DSP tunes prompts within a fixed
[07:33] pipeline. Meta harness rewrites the
[07:36] pipeline itself. Structure retrieval
[07:39] memory orchestration topology.
[07:42] Here's the loop. An agentic proposer
[07:44] Claude code with Opus 4.6 reads failed
[07:47] execution traces, diagnoses what broke,
[07:50] and writes a complete new harness.
[07:52] Scores and raw traces accumulate in a
[07:54] growing file system. An evaluator tests
[07:57] each proposal.
[07:59] Repeat the scale. 10 million tokens per
[08:03] iteration. 400 times more feedback than
[08:06] any prior method. 82 files read per
[08:08] round. Those traces are irreplaceable.
[08:11] Remove them. Accuracy drops from 50% to
[08:15] 34.6.
[08:16] Replace with summaries 34.9.
[08:20] The signal lives in the raw details.
[08:23] Rank two with Opus. Rank one with Haiku.
[08:27] a smaller model outranking larger ones
[08:29] through harness optimization alone. Meta
[08:32] harness scores 76.4% on terminal bench
[08:35] 2. The only automatically optimized
[08:37] system in a field of handgineered
[08:39] entries on 215 class text
[08:42] classification, 48.6% accuracy, 7.7
[08:46] points above state-of-the-art using four
[08:49] times fewer tokens. But the finding that
[08:52] changes the calculus, a harness
[08:54] optimized on one model transferred to
[08:56] five others, improving all of them. The
[08:59] reusable asset isn't the model, it's the
[09:01] harness. Two more systems complete the
[09:04] picture. Deep Mind's auto harness
[09:07] compiles game rules into code harnesses,
[09:10] eliminating 10% of illegal moves across
[09:14] 145 games. One variant replaces the LLM
[09:17] entirely. The decision policy runs as
[09:19] pure code and agentspec provides safety
[09:23] constraints as a domain specific
[09:25] language preventing over 90% of unsafe
[09:28] executions.
[09:30] Four systems, four facets,
[09:33] representation, optimization,
[09:35] constraints, safety,
[09:37] prompt engineering, context engineering,
[09:41] harness engineering, three eras in four
[09:44] years, each one swallowing the last.
[09:47] Harness engineering absorbs the prior
[09:49] two and adds what the model can't do on
[09:51] its own. Orchestration, memory,
[09:54] verification, safety. The discipline
[09:57] takes on an odd shape in practice.
[09:59] Anthropic named the dynamic. Every
[10:02] harness component encodes an assumption
[10:04] about what the model can't do alone, and
[10:07] those assumptions expire. When Opus 4.6
[10:10] stopped needing context resets,
[10:12] Anthropic dropped them entirely. Manus
[10:15] rewrote their harness five times in 6
[10:17] months. Versel removed 80% of an agent's
[10:20] tools and got better results. The
[10:23] harness space doesn't shrink as models
[10:25] improve. It moves. Which is why mature
[10:28] harness work looks less like building
[10:31] structure up and more like pruning it
[10:33] down. A craft of subtraction as much as
[10:36] addition.
[10:38] The practical takeaway is unambiguous.
[10:41] Investing in your harness yields larger,
[10:43] faster, and more reliable gains than
[10:45] waiting for the next model upgrade. If
[10:48] you build agents, you are a harness
[10:50] engineer whether you call yourself one
[10:52] or not. And it's no longer a question of
[10:54] which model to pick. It's a question of
[10:56] which structure to remove. Open problems
[11:00] remain. Portable harness logic lowers
[11:02] the barrier to spreading risky
[11:04] workflows. Prompt injection buried in
[11:06] harness text. Malicious tools grafted
[11:09] into shared artifacts.
[11:10] Research already found one in four
[11:12] community contributed agent skills
[11:14] contains a vulnerability.
[11:16] And the most consequential open
[11:18] question, can harness and model weights
[11:20] be co-evolved? Letting strategy shape
[11:23] what the model learns and the model
[11:25] reshape the strategy that wraps it? The
[11:28] field is moving from artal construction
[11:30] to systematic science. What sits between
[11:33] a language model and useful work has
[11:35] always mattered. We're finally learning
[11:38] how to engineer it.
