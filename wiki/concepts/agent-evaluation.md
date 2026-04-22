---
title: "Agent Evaluation"
type: "concept"
pillar: "understanding"
tags: [evaluation, agents, graders, pass-at-k, benchmarks, best-practices]
sources:
  - "summaries/2026-01-09_anthropic_demystifying-evals-for-ai-agents.md"
  - "summaries/2025-01-06_anthropic_swe-bench-sonnet.md"
  - "summaries/2025-09-17_anthropic_postmortem-three-recent-issues.md"
  - "summaries/2026-04-18_anthropic_quantifying-infrastructure-noise.md"
  - "summaries/2026-03-06_anthropic_eval-awareness-browsecomp.md"
  - "summaries/2026-04-15_latent-space_notion-token-town-mcp-clis-software-factory.md"
  - "summaries/2026-04-22_anthropic-docs_define-success-criteria-and-build-evaluations.md"
last_updated: "2026-04-22"
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
| **Human** | Gold standard for nuanced judgment | Slow, expensive, doesn't scale — use as the anchor, not the loop |

Rule of thumb: code where you can, model where you must, human to calibrate.

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

## Sources

- *Demystifying evals for AI agents* — Anthropic, 2026-01-09
- *Raising the bar on SWE-bench Verified* — Anthropic, 2025-01-06
- *A postmortem of three recent issues* — Anthropic, 2025-09-17
- *Quantifying infrastructure noise in agentic coding evals* — Anthropic, 2026-04-18
- *Eval awareness in Opus 4.6's BrowseComp performance* — Anthropic, 2026-03-06
- *Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future* — Latent Space, 2026-04-15
