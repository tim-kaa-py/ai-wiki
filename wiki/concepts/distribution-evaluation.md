---
title: "Distribution Evaluation"
type: "concept"
description: "How to evaluate a system whose honest output is a spread rather than an answer — forecast vs. measurement, two metric families, and measuring the noise floor of your own ground truth"
pillar: "understanding"
tags: [evaluation, benchmarks, distributions, noise-floor, llm-as-judge, best-practices, synthetic-personas]
sources:
  - "summaries/2026-07-29_ai-engineer_persona-engineering-field-guide-synthetic-personas.md"
timestamp: "2026-08-07"
---

# Distribution Evaluation

Classic evals score answers: there is a right one, you count how many the system got. But some systems have no right answer — their honest output is a *spread*. A simulated panel, a preference model, an LLM asked how a population would react: the correct output is a shape over possible responses, and scoring it as right/wrong destroys the thing you were measuring.

> "Unlike classic e-vals where there's clearly a right and wrong and you can score how many were right and how many wrong, now we need to measure the data as a comparison of distributions" [16:54]

The material below comes from Ishan Anand's field guide to [synthetic personas](synthetic-personas.md), but nothing in it is specific to market research. It applies to any generative system where the spread is the signal.

## Forecast vs. Measurement

The distinction that governs everything else, and the most commonly violated rule in LLM engineering.

- A **rain gauge** is a measurement instrument. A thousand gauges reduce measurement error and "would increase the accuracy of my estimate" [16:11].
- A **forecast** is a model output. Rerunning it "a thousand times without changing the input" [16:18] leaves the model and the inputs untouched.

Therefore resampling reduces variance in your knowledge of *the model's own output distribution* — "it improves my estimate of what the model is telling me but it doesn't make the forecast itself more accurate" [16:24]. Synthetic respondents are draws from a forecast, not independent observations of the world, so "more synthetic samples aren't actually going to improve your statistical significance for the most part" [16:37].

The only route to accuracy is external validation: "you'd basically check against what actually happened or in our case what humans actually said" [16:46].

**The general failure:** any pipeline that samples an LLM N times and reads the spread as a confidence interval **about reality** has made this error. The spread is a confidence interval about the model.

**How to apply:** use resampling to characterise model variance; use held-out ground truth to make accuracy claims. Never present N synthetic respondents as if they were N respondents. This is the same object as [pass@k vs pass^k](agent-evaluation.md#non-determinism-passk-vs-passk) — those metrics legitimately measure model variance, and that is all they measure.

## Two Metric Families

Because "there are many ways for distributions to get wrong" — wildly off, or right-mean-wrong-shape — a single scalar hides failures. The minimum is **one correlation-type metric plus one shape-type metric** [17:19].

| Family | Answers | Fails silently when |
|--------|---------|---------------------|
| **Correlation** | Does the output move with the target? | The mean tracks but the spread is collapsed |
| **Shape similarity** | Is the distribution the same shape? | Shape matches but sits in the wrong place |

### Distribution collapse

The specific failure the shape metric exists to catch:

> "LLMs, even when they get the persona averages right, they very often lose the details. The variations get muddled together in the middle" [14:58]

A system that nails the average and flattens the tails looks excellent on any correlation metric and is useless for the decisions people actually make with distributions — sizing a minority segment, finding the enthusiasts, pricing against the top of the range. In the cited work, naive prompting scored near the bottom of the shape-similarity range while the anchoring approach below scored "up near the top" [15:21].

## The Noise Floor of Your Ground Truth

The ceiling on achievable accuracy is set by the internal inconsistency of the ground truth itself, and almost nobody measures it.

In the 1,000-person study, participants came "back 2 weeks later and they redid the battery of surveys and personality tests and they found that the humans on average were only 80% consistent to themselves" [17:40]. "So that sets a noise floor as how accurate our models could ever get because the humans themselves are fundamentally noisy" [17:51].

A model cannot be more consistent with a human than that human is with themselves. Any accuracy figure reported without its noise floor is uninterpretable.

### The split-half recipe

When you cannot re-test your ground-truth humans [18:03-18:29]:

```
1. Take your ground-truth human dataset.
2. Split it into two chunks at random.
3. Label chunk A "synthetic" and chunk B "human".
4. Measure the correlation between them.
5. Repeat steps 2-4 hundreds to thousands of times.
6. Average the correlations.
=> That average is the noise floor: the accuracy your model
   could hope to reach against this ground truth.
```

**How to apply:** run this against any eval set with human labels, not just persona work. The question *"what is this dataset's self-agreement?"* is answerable for most labelled sets and it tells you where your scores stop meaning anything.

**Two different noise floors.** [Infrastructure Noise in Agentic Evals](infrastructure-noise-in-evals.md) names a floor set by *runtime variance* — the 6pp Terminal-Bench spread between strict and uncapped configs. This page names a floor set by *label variance* in the ground truth. They compose rather than compete: the usable resolution of a benchmark is bounded by both, and a score difference smaller than either is not a result.

## Eliciting the Distribution: Semantic-Similarity Anchoring

The technique that recovers shape rather than just the mean. Instead of asking for a 1–5 rating, ask for free text and project it onto the scale afterwards [13:21-15:35]:

```
1. System prompt: demographics / persona grounding.
2. Show the product concept.
3. Ask the question WITHOUT a numeric scale — request free text.
   e.g. model returns: "I'm somewhat interested. If it works well
   and isn't too expensive, I might give it a try."
4. Have HUMANS write exemplar texts for each scale point:
   1 = "Hell no, I'll never buy that."  ...  5 = "Absolutely, I'll buy 20."
5. Embed model output and all exemplars; measure semantic similarity.
6. Normalize similarities into a probability distribution over 1-5.
=> Recovers both the central value AND the distribution shape.
```

The output is a probability distribution over the scale rather than a point estimate — "Kind of feels like, you know, human. Some days I might say four, some days I might say five" [14:41].

The generalisable principle: **let the model answer in its native modality, then project into your schema.** The projection basis is human-written, which is what keeps the mapping anchored to something outside the model.

> **Contested for grader design.** Applied to LLM-as-judge scoring, this technique contradicts Anthropic's guidance at [Agent Evaluation § LLM-as-judge tips](agent-evaluation.md#llm-as-judge-tips-anthropic-official-guidance) — emit `correct/incorrect` or a `1–5` integer, never free-form prose. The wiki holds both positions rather than picking one: see [Agent Evaluation § Should an LLM judge emit a score directly, or emit free text you project onto a scale afterwards?](agent-evaluation.md#should-an-llm-judge-emit-a-score-directly-or-emit-free-text-you-project-onto-a-scale-afterwards) for both quotes and what each is protecting (aggregation vs. distribution shape). Short version for a reader deciding today: the anchoring approach is well-evidenced *for recovering a distribution*, and unproven *as a replacement for a categorical grading gate*.

## Perturbation, Not Repetition

Repeat-sampling and perturbation testing answer different questions, and only the second one catches prompt artefacts.

**Durability testing** runs each question under (i) reversed option order, (ii) at least one rewording, and (iii) an adversarial pushback on the position the system just stated [08:13]. Compare distributions across all variants; divergence means the result is an artefact of the prompt rather than a property of the system.

The motivating datum: option-order swaps in one study flipped results so strongly that averaging the two orderings "washed out into noise, into 50/50" [08:03]. Ten thousand samples in a single ordering would never have revealed that — only the perturbation does.

**How to apply:** add order and wording variants to any eval where the prompt presents choices. Budget them separately from trials; they are not the same axis.

## Related Pages

- [Synthetic Personas](synthetic-personas.md) — the domain that forces this eval discipline, and where these numbers come from
- [Agent Evaluation](agent-evaluation.md) — grader taxonomy, pass@k/pass^k, and error budgets; the right/wrong-scoring side of the house
- [Infrastructure Noise in Agentic Evals](infrastructure-noise-in-evals.md) — the runtime-variance noise floor that composes with the label-variance one here
- [AI-Resistant Evaluation Design](../comparisons/ai-resistant-evaluation-design.md) — a different eval failure: benchmarks that models pattern-match rather than solve
- [Eval Awareness](eval-awareness.md) — when the system under test knows it is being measured
