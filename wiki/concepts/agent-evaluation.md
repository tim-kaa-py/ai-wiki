---
title: "Agent Evaluation"
description: "Anthropic's vocabulary and grader taxonomy for evaluating LLM agents, plus non-determinism metrics and a practical roadmap"
type: "concept"
pillar: "understanding"
tags: [evaluation, agents, graders, pass-at-k, benchmarks, best-practices, error-budgets, llm-as-judge]
sources:
  - "summaries/2026-01-09_anthropic_demystifying-evals-for-ai-agents.md"
  - "summaries/2025-01-06_anthropic_swe-bench-sonnet.md"
  - "summaries/2025-09-17_anthropic_postmortem-three-recent-issues.md"
  - "summaries/2026-04-18_anthropic_quantifying-infrastructure-noise.md"
  - "summaries/2026-03-06_anthropic_eval-awareness-browsecomp.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-04-22_anthropic-docs_define-success-criteria-and-build-evaluations.md"
  - "summaries/2026-05-03_ai-engineer_context-is-the-new-code.md"
  - "summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md"
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
  - "summaries/2026-07-14_ai-engineer_dont-ship-skills-without-evals.md"
  - "summaries/2026-07-23_ai-engineer_harness-engineering-is-not-enough-why-software-factories-fail.md"
timestamp: "2026-08-28"
---

# Agent Evaluation

Canonical synthesis of how Anthropic frames evaluation for LLM agents: the vocabulary, the grader taxonomy, non-determinism metrics, per-agent-class patterns, and a practical roadmap.

## Success Criteria Design

Before building any eval, define what "good" means precisely. Anthropic's guidance: success criteria must be **specific, measurable, achievable, and relevant** — vague goals can't be tested.

### Eight criteria dimensions

Most production use cases require multidimensional evaluation across several of these:

| Dimension | What to ask |
|-----------|-------------|
| **Task fidelity** | How close to correct does the output need to be? Include edge case targets. |
| **Consistency** | If a user asks the same question twice, how similar do answers need to be? |
| **Relevance/coherence** | Does it directly address the question in a logical structure? |
| **Tone/style** | Does the output match audience expectations? |
| **Privacy preservation** | Does it correctly handle sensitive/personal information? |
| **Context utilization** | Does it reference and build on conversation history? |
| **Latency** | What response time is acceptable? |
| **Price** | What is the cost budget per call/per day? |

### Making "soft" criteria measurable

Even safety and ethics can be quantified. "Safe outputs" is not a criterion; "< 0.1% of outputs flagged for toxicity across 10,000 trials" is. The discipline: for every qualitative goal, state a threshold, a test set size, and a measurement method.

Example (multidimensional, sentiment analysis):

> On a held-out test set of 10,000 diverse posts: F1 ≥ 0.85, 99.5% non-toxic outputs, 90% of errors are "inconvenience" not "egregious," 95% response time < 200ms.

### Eval design principles

1. **Mirror real task distribution.** Include edge cases: irrelevant input, very long input, sarcasm, typos, implicit PHI, abrupt topic shifts.
2. **Automate when possible.** Structure tasks for string match, code-graded, or LLM-graded output.
3. **Volume over quality.** 1,000 automated cases with noisy signal beats 100 hand-graded ones. Scale requires automation.

---

## Vocabulary

From *Demystifying evals for AI agents*:

- **Tasks** — input plus success criteria.
- **Trials** — multiple attempts on the same task (agents are non-deterministic).
- **Graders** — the scoring function applied to a trial.
- **Transcripts** — the full interaction record produced during a trial.
- **Outcomes** — the final environment state after the trial ends.
- **Eval harness** — the orchestration layer that runs tasks, collects transcripts, and invokes graders.

Treat these as distinct objects. A grader scores *outcomes* based on criteria in the *task*, but you debug by reading *transcripts*.

## Three Grader Types

| Grader | Strengths | Tradeoffs |
|--------|-----------|-----------|
| **Code-based** | Fast, objective, cheap, reproducible | Brittle — rejects valid variations; doesn't generalize past string/exit-code checks |
| **Model-based** | Flexible, handles free-form output, scales | Needs calibration against human labels; drifts; costs tokens |
| **Human** | Best available anchor for nuanced judgment | Slow, expensive, doesn't scale — and noisy: its self-agreement rate is the ceiling on every score calibrated against it |

Rule of thumb: code where you can, model where you must, human to calibrate — then measure how much the humans agree with themselves.

### The Anchor Is Noisy, and Its Noise Is Your Ceiling

Human judgment is the anchor because nothing better exists, not because it is error-free. Treating it as a gold standard invites a specific mistake: reading agreement-with-human-labels as a target approachable to 100%, when the labels themselves disagree.

The datum that makes this concrete comes from outside agent evals. In a study that brought ~1,000 participants back two weeks later to redo the same battery, "the humans on average were only 80% consistent to themselves" [17:40] — "so that sets a noise floor as how accurate our models could ever get because the humans themselves are fundamentally noisy" [17:51]. A model cannot be more consistent with a human than that human is with themselves.

**Scope the number before you borrow it.** That 80% is survey respondents re-answering questions about their *own attitudes* — a deliberately hard case, with two weeks of drift and no rubric. Expert graders scoring model output against a written rubric are a different population doing a different task, and their self-agreement is plausibly much higher. **Do not import 80% as your ceiling. Measure your own.** The point transfers; the figure does not.

**How to apply.** Before trusting any score calibrated against human labels:

1. **Measure grader self-agreement.** Re-label a sample with the same graders after a gap, or use the split-half recipe on labels you already have — see [Distribution Evaluation § The Noise Floor of Your Ground Truth](distribution-evaluation.md#the-noise-floor-of-your-ground-truth).
2. **Report scores against that ceiling, not against 100%.** A judge at 85% against labels with 88% self-agreement is near-saturated, not mediocre.
3. **Treat a low floor as a rubric bug.** Graders who disagree with themselves are usually reporting that the rubric is underspecified — which is fixable, and worth more than any grader tuning downstream of it.

This composes with the two other ceilings on this page: [infrastructure noise](infrastructure-noise-in-evals.md) bounds resolution from the runtime side, label noise bounds it from the ground-truth side, and a score gap smaller than either is not a result. *(Sources: Anthropic, *Demystifying evals for AI agents*; Ishan Anand, AI Engineer 2026-07-29)*

### LLM-as-judge tips (Anthropic official guidance)

- **Use a different model as judge.** If you're evaluating Claude Sonnet, grade with Claude Opus. Grading with the same model measures self-consistency, not quality.
- **Write detailed, specific rubrics.** "The answer must mention 'Acme Inc.' in the first sentence; if it does not, grade as incorrect." Vague rubrics produce noisy graders.
- **Empirical output only.** Ask the judge to output `correct/incorrect` or a `1-5` integer — not free-form prose. Prose grades don't aggregate.
- **Encourage chain-of-thought before the verdict.** Ask the judge to reason in `<thinking>` tags, then emit the score in `<result>` tags and discard the reasoning. This meaningfully improves grader accuracy on complex tasks.

```python
def build_grader_prompt(answer, rubric):
    return f"""Grade this answer based on the rubric:
    <rubric>{rubric}</rubric>
    <answer>{answer}</answer>
    Think through your reasoning in <thinking> tags, then output 'correct' or 'incorrect' in <result> tags."""
```

**Applied to RAG:** RAG-specific evaluation reuses this exact methodology — [Hybrid RAG](./hybrid-rag.md) covers the RAG instances (the **Ragas** end-to-end eval library and NVIDIA's **Nemotron-4 340B reward model** as an LLM judge), scored on faithfulness, answer relevancy, and retrieval precision/recall.

### Eval method × criteria mapping

| Success dimension | Recommended eval method |
|-------------------|------------------------|
| Classification / exact tasks | Exact match (`output == golden_answer`) |
| Paraphrase consistency | Cosine similarity via SBERT embeddings |
| Summarization quality | ROUGE-L F1 against reference summaries |
| Tone / empathy | LLM Likert scale (1–5) |
| PHI / privacy | LLM binary classification |
| Context utilization | LLM ordinal scale (1–5) across conversation turns |

## Non-Determinism: pass@k vs pass^k

Agent runs vary even with temperature 0 (tool calls, retries, environment jitter). Two metrics matter:

- **pass@k** — succeeds at least once in k attempts. Use when *any* working solution is acceptable (research queries, exploratory coding).
- **pass^k** — succeeds on *all* k attempts. Use for customer-facing reliability where repeated failure is unacceptable.

The gap between pass@k and pass^k is your variance budget.

### What resampling actually buys

Both metrics measure *model variance* — and that is all they measure. Ishan Anand's forecast-vs-measurement distinction is the sharpest statement of the boundary: a rain gauge is a measurement instrument, so a thousand gauges reduce measurement error, but a forecast rerun "a thousand times without changing the input" leaves the model and the inputs untouched — "it improves my estimate of what the model is telling me but it doesn't make the forecast itself more accurate" [16:24].

Consequence for eval design: trials characterise the spread; only held-out ground truth moves an accuracy claim. Any pipeline that samples a model N times and reads the spread as a confidence interval *about reality* has confused the two. See [Distribution Evaluation § Forecast vs. Measurement](distribution-evaluation.md#forecast-vs-measurement). *(Source: Ishan Anand, AI Engineer 2026-07-29)*

**Repetition is not perturbation.** Trials re-run the *same* prompt. They cannot detect prompt artefacts — order bias, wording sensitivity — because the artefact is constant across every trial. In one persona study, swapping answer-option order flipped results so hard that averaging the two orderings "washed out into noise, into 50/50" [08:03]; no number of same-order trials would have surfaced that. Budget perturbation variants (reversed order, rewording, adversarial pushback) as a separate axis from k.

## Per-Agent-Class Patterns

- **Coding agents** — test execution is a pass/fail signal. SWE-bench Verified is the canonical example; the 49% SWE-bench result with just Bash + Edit tools showed that "tool ergonomics > prompt fiddling" (*SWE-bench Sonnet*).
- **Conversational agents** — score task completion, turn count, and tone. Typically requires a second LLM to simulate the user across turns.
- **Research agents** — combine graders for source-grounding, coverage, and source authority. No single scalar captures quality.
- **Computer-use agents** — verify both the visible UI state *and* the backend state. "Order placed" in the database matters, not just a confirmation page that could be screenshot-faked.

## Practical Roadmap

1. **Start with 20-50 tasks from real failures** — mine bug reports, /bug channels, manual checks. Skip the synthetic edge-case parade.
2. **Eval-driven development** — define success criteria *before* building the feature, not after.
3. **Read failed transcripts regularly.** Graders themselves drift; without manual review you trust broken metrics.
4. **Run continuous quality evals against production, not just pre-deploy benchmarks.** The Aug-Sep 2025 postmortem noted "standard benchmarks didn't catch real-user degradation" — the bugs surfaced through `/bug` and thumbs-down feedback first.
5. **Watch for saturation.** When pass rate exceeds 80-90%, the eval no longer differentiates. Refresh the task set.
6. **Build balanced sets** — test both should and shouldn't behaviors.

## Known Failure Modes

Evaluation itself has failure modes covered on sibling pages:

- **Infrastructure noise** makes small score differences meaningless — see [infrastructure-noise-in-evals](./infrastructure-noise-in-evals.md).
- **Eval awareness** means capable models can recognize and game benchmarks — see [eval-awareness](./eval-awareness.md).
- **AI-resistant design** is an open problem for hiring/skill evaluations — see [ai-resistant-evaluation-design](../comparisons/ai-resistant-evaluation-design.md).
- **Unmeasured ground-truth noise** caps every score calibrated against human labels — see [The Anchor Is Noisy, and Its Noise Is Your Ceiling](#the-anchor-is-noisy-and-its-noise-is-your-ceiling).
- **Right/wrong scoring is the wrong shape** for systems whose honest output is a spread rather than an answer — see [Distribution Evaluation](distribution-evaluation.md).

## Three-Tier Eval Stack (Notion, April 2026)

Sarah Sachs (Notion) explicitly rejects the "evals = quality" conflation — "that's like calling all testing 'unit tests'." Notion runs three distinct eval tiers, each with a different purpose and pass-rate target:

| Tier | Analogy | Target | Role |
|------|---------|--------|------|
| **CI regression** | Unit test | Must pass within stochastic error rate | Gate merges; lives in CI |
| **Launch report card** | Product eval | 80–90% per user journey | Gates launches; per-journey thresholds |
| **Frontier / headroom** | Too-hard exam | **~30% pass rate** (deliberately tuned) | Keep producing signal after the other tiers saturate — branded internally as *Notion's Last Exam* |

Why the 30% tier matters: once all evals sit at ≥90% pass, they can't distinguish a better model from a worse one — you've saturated. The frontier tier is the only tier that keeps giving signal through capability cycles, and Notion built theirs in partnership with Anthropic and OpenAI for exactly that reason.

**Apply:** audit your suite; if nothing fails routinely, you've saturated. Build a deliberately-too-hard tier and staff it.

## Eval System as Agent Harness

Notion's operational move: treat the eval system itself as an agent harness. An agent downloads the dataset, runs the eval, inspects failures, proposes fixes, and implements them end-to-end — humans observe the *outer* loop rather than the per-task inner loop. Deliberately general: "it's just CLI tools," not coupled to a specific coding agent.

**Apply:** wire your eval framework so it's driveable from a CLI, then let a coding agent write your next eval the way it writes your next unit test.

## Model Behavior Engineer (MBE)

Non-engineering career track Notion has formalized. Origin: "data specialists" (linguistics PhD dropout, recent-grad) who manually inspected outputs. Today MBEs author evals and LLM judges — increasingly driven through coding agents themselves. Role mix: data scientist + PM + prompt engineer. Notion's conviction: an engineering background is *not* required — it's taste and instinct about model behavior.

This is a concrete staffing pattern for organizations that have internalized eval-driven development: make "model behavior" a career track, not a hat worn by engineers on the side.

## Four-Tier Context-Eval Pyramid (Debois)

Patrick Debois's four-tier framework for evaluating *context artifacts* (`agent.md`, skills, prompts) layers cleanly on top of the Anthropic grader taxonomy and is worth quoting directly: [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

| Tier | Mechanism | Catches |
|------|-----------|---------|
| **Linter** | Schema/length validation on the context file itself | Missing `description`, oversized SKILL.md, malformed frontmatter — milliseconds, deterministic |
| **Grammarly for context** | LLM critiques the prose for clarity, ambiguity, contradictions | Vague rules, conflicting instructions, dead phrasing |
| **LLM-as-judge** | Run the agent against a fixed prompt, judge output against a company-specific rubric | Missed company rules (e.g., "every endpoint starts with `/awesome/`") that no general-purpose model enforces |
| **Judge-as-agent** | Give the judge tools + a sandbox so it can `curl` the running endpoint or click the running app | Behavior that file-grading misses — the eval becomes end-to-end |

The progression is the same logic as the test pyramid: cheap-and-deterministic at the base, expensive-and-end-to-end at the top. **Don't skip tiers** — each catches different failure modes. The judge-as-agent variant is the natural extension of [LLM-as-judge tips](#llm-as-judge-tips-anthropic-official-guidance) above; once your judge has tools, the file/runtime distinction collapses.

This pyramid maps onto Notion's [Three-Tier Eval Stack](#three-tier-eval-stack-notion-april-2026) but at a different unit of analysis: Notion's tiers stratify by *purpose* (CI gate / launch gate / frontier signal), Debois's by *capability* (what the grader can see). Use both axes.

## Error Budgets per Eval (Debois)

Because evals are non-deterministic, "did it pass?" is the wrong question. Debois's framing: run each eval N times (he uses 5), track the success rate, and assign each eval an **error budget proportional to how much you care about it** — critical evals get tight budgets (e.g., 5/5), nice-to-haves can fail more often without blocking merges. [Source: 2026-05-03_ai-engineer_context-is-the-new-code]

This is per-eval SLOs rather than aggregate metrics. It diverges from common framings that average over a suite: when one eval is critical and another is nice-to-have, averaging hides the signal. Pair this with [pass@k vs pass^k](#non-determinism-passk-vs-passk) above — pass^k is the limiting case (budget = N/N), pass@k is "any one passes" (budget = 1/N), and most production evals sit somewhere in between with explicit per-eval thresholds.

Operational rule: in CI, fail the build only if a critical eval drops *below its budget*, not on any individual flake. Allow nice-to-have evals to be flaky without blocking merges; surface them as warnings.

## The Unmeasured Dimension: Maintainability

Everything above assumes the criterion can be scored at the end of a run. Dex Horthy (AI Engineer, July 2026) names a criterion where that assumption breaks, and it is the criterion that governs whether agent-written code survives.

**Why the standard reward shape can't reach it.** Coding-agent RL generates many traces per problem, scores them, and reinforces the winners. The canonical benchmark shape — SWE-bench Multilingual, ~15-minute tasks drawn from Redis, JQ, Django — issues a **binary 1/0 reward** on "did you fix the problem and did you do it without breaking anything else" [11:47-12:47]. Horthy's consequence: *"There's no way in this system that we can penalize it for poor program design or for eroding the maintainability of our systems"* [12:49-12:57] — which is his explanation for gratuitous try/catch blocks and casts written purely to satisfy a type-checker.

**Why you can't just add the channel.** *"Verifying code quality and maintainability is orders of magnitude harder than the code runs and the test pass. Because the cost function of bad architecture is measured in months and years"* [13:44-13:52]. A criterion whose ground truth only materialises months after the run cannot be scored inside the run — this is a structurally harder case than the noisy-anchor and infrastructure-noise ceilings above, because the signal is not merely noisy but absent at scoring time.

**Horthy's own caveat, which is worth keeping:** because no good maintainability benchmark exists, he concedes he **cannot prove** models haven't improved here. The evidence is practitioner consensus that agents "generally make things worse over time" [09:50-09:57]. The eval-methodology reading of that admission: an absent benchmark means an absent detector, so the claim is unfalsified rather than confirmed.

### Three Benchmarks Attempting It

| Benchmark | Owner | Design move |
|-----------|-------|-------------|
| **Sweep Marathon** | Abundant AI | ~400-hour tasks (e.g. cloning every feature of Microsoft Excel), with deliberate reward-channel design |
| **Deep Sweep** | Data Curve | Large tasks on OSS repos chosen because they were never built in the real world — deliberately outside the training set |
| **Frontier Code** | Cognition | Multi-PR tasks; penalises the model for writing tests that don't fail on pre-patch code, plus a judge model checking code-quality rules |

Two design ideas here generalise beyond code: **penalising a test that passes on the unpatched baseline** is a cheap guard against the eval measuring nothing, and **selecting tasks that were never built** is contamination control that doesn't depend on knowing the training set.

### A Ceiling on LLM-as-Judge for Quality

Horthy's argument against judging your way out of the problem: *"models judging quality can only go so far, cuz if the model knew what good code looks like, it would probably write it in the first place"* [14:31-14:39].

**Scope this against the [LLM-as-judge tips](#llm-as-judge-tips-anthropic-official-guidance) above rather than reading it as a refutation of them.** Anthropic's guidance is grader hygiene for criteria the judge can actually assess — use a different model, write a specific rubric, emit a discrete verdict. Horthy's ceiling bites on one criterion class: *generative* quality judgments, where the judge's ability to recognise good output is bounded by its ability to produce it. Correctness, rubric adherence, and rule violations do not have that property — a judge can check "is there a try/catch that swallows the error" without being able to author good architecture. The practical rule that survives both: **decompose quality into checkable rules where you can, and treat what remains as floor-raising, not ceiling-raising** — an agentic review pass is not a substitute for a human read on architecture-shaped changes.

Horthy pre-empts one objection himself: benchmarks and RL verifiers are different artifacts on separate datasets, "but they're shaped the same and the structure of these benchmarks is directionally correct." Note his commercial interest — HumanLayer advertises "soon to be better verifiers for software quality." *(Source: Dex Horthy, AI Engineer 2026-07-23.)*

## Unresolved Tensions

### Can a frontier eval tier survive capability cycles, or do all evals expire in 1-3 generations?

*Surfaced 2026-08-03.*

**Position A — a deliberately-hard tier is a durable solution to saturation.** [Source: `summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md`, via [Three-Tier Eval Stack](#three-tier-eval-stack-notion-april-2026)]

> "Why the 30% tier matters: once all evals sit at ≥90% pass, they can't distinguish a better model from a worse one — you've saturated. The frontier tier is the only tier that keeps giving signal through capability cycles, and Notion built theirs in partnership with Anthropic and OpenAI for exactly that reason."

**Position B — saturation and disposal are unavoidable, frontier tier included.** [Source: `summaries/2026-07-27_y-combinator_boris-cherny-we-cut-80-percent-of-claude-codes-prompt.md`, [10:01-10:19]]

> "An eval might live for maybe one, two, three model generations... very often we just saturate the eval, and then we have to throw it away."

**Why this is held rather than merged.** Cherny is not making an offhand remark — the summary records him explicitly pushing back on the interviewer's cleaner framing that evals are the constant while code and prompts are disposable. Notion frames the frontier tier as the thing that *solves* saturation; Cherny frames it as merely delaying it. The operational consequence differs: Position A justifies staffing a lasting tier (Notion formalized the [Model Behavior Engineer](#model-behavior-engineer-mbe) track partly around it); Position B says budget for scheduled replacement and treat eval saturation as a recurring event, building the next suite from where the *current* model struggles rather than where the old one did.

**The reading that would dissolve it** (not adopted here): the two may be compatible at different timescales — a frontier tier that lasts three generations *is* "the only tier still giving signal" relative to tiers that saturate in one. If a future source pins down how long Notion's *Last Exam* actually held, this collapses to a quantitative question rather than a disagreement.

### Should an LLM judge emit a score directly, or emit free text you project onto a scale afterwards?

*Surfaced 2026-08-07.*

**Position A — make the judge emit the number.** [Source: `summaries/2026-04-22_anthropic-docs_define-success-criteria-and-build-evaluations.md`, via [LLM-as-judge tips](#llm-as-judge-tips-anthropic-official-guidance)]

> "**Empirical output only.** Ask the judge to output `correct/incorrect` or a `1-5` integer — not free-form prose. Prose grades don't aggregate."

Reinforced structurally by the [Eval method × criteria mapping](#eval-method--criteria-mapping) table above, which routes tone/empathy to an "LLM Likert scale (1–5)" and context utilization to an "LLM ordinal scale (1–5)."

**Position B — let the model answer in text, then project.** [Source: `summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md`, [13:08-15:35]]

> "Replace forced-choice scales with free text plus a similarity mapping onto human-written anchors. Applies far beyond market research — any time you need structured scores out of an LLM."

The mechanism: ask the question without a numeric scale, have *humans* write exemplar texts for each scale point, embed both, and normalize the similarities into a probability distribution over the scale. Anand claims the generalization explicitly — it "generalises immediately to structured extraction and LLM-judge scoring, where forcing a number up front discards exactly the nuance you then try to recover."

**What each position is protecting.** This is the part that makes the tension usable rather than decorative.

- Position A protects **aggregation**. A grader that returns prose cannot be averaged, thresholded, tracked across runs, or wired into a CI gate. Anthropic's rule is what makes an eval a *metric* instead of a reading exercise, and it is the precondition for everything on this page from pass@k to error budgets.
- Position B protects **distribution shape**. Forcing the number up front is where the spread dies: "LLMs, even when they get the persona averages right, they very often lose the details. The variations get muddled together in the middle" [14:58]. Measured, naive prompting scored near the bottom of the shape-similarity range while the anchoring approach scored "up near the top" [15:21].

Neither author addressed the other's concern, so the wiki holds both rather than inventing a reconciliation on their behalf.

**Why it matters operationally.** The two rules select different graders for the same job. Position A is unambiguously right where the target is genuinely categorical — a correctness gate has no distribution to preserve, and a free-text detour there is cost with no payoff. Position B bites where the honest output is a spread: rubric dimensions like tone, helpfulness, or severity, where a collapsed Likert distribution can look healthy on every aggregate metric and still be useless for the decision it feeds. The unresolved part is the middle: most production rubric dimensions are spread-valued but are graded as if they were categorical, and no source here has measured what that costs.

**What would resolve it:** a direct comparison on an LLM-judge task rather than a survey task — same rubric, forced integer vs. free-text-plus-anchoring, scored against human labels on both a correlation and a shape metric. Note also the possible dissolution (not adopted here): Anand's step 6 *does* end in an aggregatable numeric distribution, so "free text plus projection" may satisfy Position A by a longer route, making this a disagreement about elicitation rather than about output format. The full technique is on [Distribution Evaluation § Eliciting the Distribution](distribution-evaluation.md#eliciting-the-distribution-semantic-similarity-anchoring).

## Specialization: Evaluating Skills

Skills are a distinct eval target from agents, and cheaper than this page's machinery implies. The unit under test is not a task but an *artifact* — a `SKILL.md` whose failure modes are (in descending order of frequency) failing to trigger, over-triggering, and being redundant with the current model. Most asserts collapse to regex over generated output; the defining move is the **ablation** (run the eval with and without the skill loaded) which is what tells you a skill has expired.

See [Skill Evaluation](skill-evaluation.md) for the harness, the design rules, and the retirement argument. [Source: 2026-07-14_ai-engineer_dont-ship-skills-without-evals]

Note the difference in emphasis from *Eval design principles* above: Anthropic's "volume over quality — 1,000 noisy automated cases beat 100 hand-graded ones" describes a mature eval suite, while Schmid's "start small, 10–20 samples beat nothing" describes the on-ramp. They point the same direction (automate, then scale) from opposite ends of the maturity curve rather than contradicting each other.

## Sources

- *Demystifying evals for AI agents* — Anthropic, 2026-01-09
- *Raising the bar on SWE-bench Verified* — Anthropic, 2025-01-06
- *A postmortem of three recent issues* — Anthropic, 2025-09-17
- *Quantifying infrastructure noise in agentic coding evals* — Anthropic, 2026-04-18
- *Eval awareness in Opus 4.6's BrowseComp performance* — Anthropic, 2026-03-06
- *Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future* — Latent Space, 2026-04-15
- *Context Is the New Code* — Patrick Debois, AI Engineer, 2026-05-03
- *Persona Engineering: A Field Guide to AI Synthetic Personas* — Ishan Anand, AI Engineer, 2026-07-29
- *Harness Engineering is not Enough: Why Software Factories Fail* — Dex Horthy, AI Engineer, 2026-07-23
