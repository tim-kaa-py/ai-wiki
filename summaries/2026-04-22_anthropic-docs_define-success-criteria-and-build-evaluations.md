---
title: "Define success criteria and build evaluations"
source_type: "article"
channel: "Anthropic"
date: "2026-04-22"
url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests"
pillar: "building"
tags: [evaluation, testing, best-practices, how-to, prompt-engineering]
ingested: "2026-04-22"
source_file: "sources/articles/2026-04-22_anthropic-docs_define-success-criteria-and-build-evaluations.md"
---

# Define success criteria and build evaluations — Summary

**Source:** Anthropic | 2026-04-22 | [Link](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

## TL;DR

Anthropic's official guide on building LLM evaluation pipelines. It walks through how to define SMART success criteria (specific, measurable, achievable, relevant) and match them to the right grading method — from exact match for classification tasks up to LLM-as-judge for nuanced tone or context evaluation. The core argument: volume of automated test cases beats quality of hand-graded ones.

## Key Concepts

### Success criteria dimensions
The doc identifies eight axes along which to measure LLM performance: task fidelity, consistency, relevance/coherence, tone/style, privacy preservation, context utilization, latency, and price. Most production use cases need multidimensional criteria across several of these.

### Eval grading hierarchy
Three tiers ordered by speed and scalability:
1. **Code-based** (exact match, string match) — fastest, most reliable, no nuance
2. **Human grading** — highest quality, but expensive; avoid at scale
3. **LLM-based** — best balance for complex judgements; requires rubric design and reliability testing before scaling

### LLM-as-judge patterns
Four patterns shown with full Python code:
- **Exact match** — classification (sentiment)
- **Cosine similarity (SBERT)** — consistency across paraphrased inputs
- **ROUGE-L** — summarization quality
- **Likert/ordinal scale via LLM** — tone, context utilization
- **Binary classification via LLM** — PHI detection, safety checks

## Key Takeaways

1. **Quantify everything, including "soft" criteria.** Even ethics/safety can be made measurable: "< 0.1% of outputs flagged for toxicity across 10,000 trials" beats "safe outputs." Vague criteria can't be tested.
   - **How to apply:** For each qualitative goal, define a threshold, a test set size, and a measurement method before writing a single eval.

2. **Volume beats quality in eval design.** 1,000 automated test cases with noisy signal outperforms 100 hand-graded ones. Automate grading wherever possible to unlock scale.
   - **How to apply:** Prefer string match or LLM-graded evals with binary output over open-ended human review.

3. **Always include edge cases in your test set.** Sarcasm, typos, implicit PHI, abrupt topic shifts, overly long inputs — these are where models fail silently. A representative test set without edge cases is overfit to the happy path.
   - **How to apply:** For every eval category, write at least 2-3 explicit edge cases. Use Claude to generate more from a seed set.

4. **Use a different model to grade than the model being evaluated.** The LLM-as-judge pattern only provides signal if the judge isn't the same model being tested — otherwise you may be measuring self-consistency, not quality.
   - **How to apply:** If evaluating Claude Sonnet, grade with Claude Opus (or a different model family).

5. **Encourage reasoning in LLM-based graders before the verdict.** Ask the grader to reason in `<thinking>` tags, then output the score in `<result>` tags and discard the reasoning. This improves grader accuracy for complex tasks.
   - **How to apply:** Add a chain-of-thought step to all LLM rubric prompts: "Think through your reasoning in `<thinking>` tags, then output 'correct' or 'incorrect' in `<result>` tags."

## Notable Commands / Code Snippets

**Exact match eval pattern:**
```python
def evaluate_exact_match(model_output, correct_answer):
    return model_output.strip().lower() == correct_answer.lower()
```

**LLM-as-judge with CoT grader:**
```python
def build_grader_prompt(answer, rubric):
    return f"""Grade this answer based on the rubric:
    <rubric>{rubric}</rubric>
    <answer>{answer}</answer>
    Think through your reasoning in <thinking> tags, then output 'correct' or 'incorrect' in <result> tags."""
```

**Likert scale grader (for tone/style):**
```python
def evaluate_likert(model_output, target_tone):
    tone_prompt = f"""Rate this response on a scale of 1-5 for being {target_tone}:
    <response>{model_output}</response>
    1: Not at all {target_tone}
    5: Perfectly {target_tone}
    Output only the number."""
    # Use a different model than the one being evaluated
```

## Related Topics

evaluation, testing, best-practices, how-to, prompt-engineering
