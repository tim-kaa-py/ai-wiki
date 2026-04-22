---
title: "Define success criteria and build evaluations"
source_type: "article"
channel: "Anthropic"
date: "2026-04-22"
url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests"
pillar: "building"
tags: [evaluation, testing, best-practices, how-to, prompt-engineering]
ingested: "2026-04-22"
extraction_method: "web-fetch"
---

# Define success criteria and build evaluations

Building a successful LLM-based application starts with clearly defining your success criteria and then designing evaluations to measure performance against them. This cycle is central to prompt engineering.

## Define your success criteria

Good success criteria are:
- **Specific:** Clearly define what you want to achieve. Instead of "good performance," specify "accurate sentiment classification."
- **Measurable:** Use quantitative metrics or well-defined qualitative scales. Numbers provide clarity and scalability, but qualitative measures can be valuable if consistently applied *along* with quantitative measures.
    - Even "hazy" topics such as ethics and safety can be quantified:
        |      | Safety criteria                |
        | ---- | ------------------------------ |
        | Bad  | Safe outputs                   |
        | Good | Less than 0.1% of outputs out of 10,000 trials flagged for toxicity by our content filter. |

    **Quantitative metrics:**
    - Task-specific: F1 score, BLEU score, perplexity
    - Generic: Accuracy, precision, recall
    - Operational: Response time (ms), uptime (%)

    **Quantitative methods:**
    - A/B testing: Compare performance against a baseline model or earlier version.
    - User feedback: Implicit measures like task completion rates.
    - Edge case analysis: Percentage of edge cases handled without errors.

    **Qualitative scales:**
    - Likert scales: "Rate coherence from 1 (nonsensical) to 5 (perfectly logical)"
    - Expert rubrics: Linguists rating translation quality on defined criteria

- **Achievable:** Base your targets on industry benchmarks, prior experiments, AI research, or expert knowledge. Your success metrics should not be unrealistic to current frontier model capabilities.
- **Relevant:** Align your criteria with your application's purpose and user needs. Strong citation accuracy might be critical for medical apps but less so for casual chatbots.

Example task fidelity criteria for sentiment analysis:

|      | Criteria                                                     |
| ---- | ------------------------------------------------------------ |
| Bad  | The model should classify sentiments well                    |
| Good | Our sentiment analysis model should achieve an F1 score of at least 0.85 (Measurable, Specific) on a held-out test set of 10,000 diverse Twitter posts (Relevant), which is a 5% improvement over our current baseline (Achievable). |

### Common success criteria

- **Task fidelity:** How well does the model need to perform on the task? You may also need to consider edge case handling, such as how well the model needs to perform on rare or challenging inputs.
- **Consistency:** How similar does the model's responses need to be for similar types of input? If a user asks the same question twice, how important is it that they get semantically similar answers?
- **Relevance and coherence:** How well does the model directly address the user's questions or instructions? How important is it for the information to be presented in a logical, easy to follow manner?
- **Tone and style:** How well does the model's output style match expectations? How appropriate is its language for the target audience?
- **Privacy preservation:** What is a successful metric for how the model handles personal or sensitive information? Can it follow instructions not to use or share certain details?
- **Context utilization:** How effectively does the model use provided context? How well does it reference and build upon information given in its history?
- **Latency:** What is the acceptable response time for the model? This will depend on your application's real-time requirements and user expectations.
- **Price:** What is your budget for running the model? Consider factors like the cost per API call, the size of the model, and the frequency of usage.

Most use cases will need multidimensional evaluation along several success criteria.

Example multidimensional criteria for sentiment analysis:

|      | Criteria                                                     |
| ---- | ------------------------------------------------------------ |
| Bad  | The model should classify sentiments well                    |
| Good | On a held-out test set of 10,000 diverse Twitter posts, our sentiment analysis model should achieve: an F1 score of at least 0.85, 99.5% of outputs are non-toxic, 90% of errors would cause inconvenience (not egregious error), 95% response time < 200ms |

---

## Build evaluations

### Eval design principles

1. **Be task-specific:** Design evals that mirror your real-world task distribution. Don't forget to factor in edge cases!
   - Irrelevant or nonexistent input data
   - Overly long input data or user input
   - [Chat use cases] Poor, harmful, or irrelevant user input
   - Ambiguous test cases where even humans would find it hard to reach an assessment consensus
2. **Automate when possible:** Structure questions to allow for automated grading (e.g., multiple-choice, string match, code-graded, LLM-graded).
3. **Prioritize volume over quality:** More questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals.

### Example evals

**Task fidelity (sentiment analysis) — exact match evaluation**

What it measures: Exact match evals measure whether the model's output exactly matches a predefined correct answer. It's a simple, unambiguous metric that's perfect for tasks with clear-cut, categorical answers like sentiment analysis (positive, negative, neutral).

```python
import anthropic

tweets = [
    {"text": "This movie was a total waste of time. 👎", "sentiment": "negative"},
    {"text": "The new album is 🔥! Been on repeat all day.", "sentiment": "positive"},
    {
        "text": "I just love it when my flight gets delayed for 5 hours. #bestdayever",
        "sentiment": "negative",
    },  # Edge case: Sarcasm
    {
        "text": "The movie's plot was terrible, but the acting was phenomenal.",
        "sentiment": "mixed",
    },  # Edge case: Mixed sentiment
    # ... 996 more tweets
]

client = anthropic.Anthropic()


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=50,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def evaluate_exact_match(model_output, correct_answer):
    return model_output.strip().lower() == correct_answer.lower()


outputs = [
    get_completion(
        f"Classify this as 'positive', 'negative', 'neutral', or 'mixed': {tweet['text']}"
    )
    for tweet in tweets
]
accuracy = sum(
    evaluate_exact_match(output, tweet["sentiment"])
    for output, tweet in zip(outputs, tweets)
) / len(tweets)
print(f"Sentiment Analysis Accuracy: {accuracy * 100}%")
```

**Consistency (FAQ bot) — cosine similarity evaluation**

What it measures: Cosine similarity measures the similarity between two vectors (sentence embeddings via SBERT) by computing the cosine of the angle between them. Values closer to 1 indicate higher similarity. Ideal for evaluating consistency because similar questions should yield semantically similar answers.

```python
from sentence_transformers import SentenceTransformer
import numpy as np
import anthropic

faq_variations = [
    {
        "questions": [
            "What's your return policy?",
            "How can I return an item?",
            "Wut's yur retrn polcy?",
        ],
        "answer": "Our return policy allows...",
    },  # Edge case: Typos
    # ... 47 more FAQs
]

client = anthropic.Anthropic()


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def evaluate_cosine_similarity(outputs):
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = [model.encode(output) for output in outputs]
    cosine_similarities = np.dot(embeddings, embeddings.T) / (
        np.linalg.norm(embeddings, axis=1) * np.linalg.norm(embeddings, axis=1).T
    )
    return np.mean(cosine_similarities)


for faq in faq_variations:
    outputs = [get_completion(question) for question in faq["questions"]]
    similarity_score = evaluate_cosine_similarity(outputs)
    print(f"FAQ Consistency Score: {similarity_score * 100}%")
```

**Relevance and coherence (summarization) — ROUGE-L evaluation**

What it measures: ROUGE-L (Recall-Oriented Understudy for Gisting Evaluation - Longest Common Subsequence) evaluates generated summaries. It measures the length of the longest common subsequence between candidate and reference summaries. High scores indicate the summary captures key information in coherent order.

```python
from rouge import Rouge
import anthropic

articles = [
    {
        "text": "In a groundbreaking study, researchers at MIT...",
        "summary": "MIT scientists discover a new antibiotic...",
    },
    # ... 197 more articles
]

client = anthropic.Anthropic()


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def evaluate_rouge_l(model_output, true_summary):
    rouge = Rouge()
    scores = rouge.get_scores(model_output, true_summary)
    return scores[0]["rouge-l"]["f"]  # ROUGE-L F1 score


outputs = [
    get_completion(f"Summarize this article in 1-2 sentences:\n\n{article['text']}")
    for article in articles
]
relevance_scores = [
    evaluate_rouge_l(output, article["summary"])
    for output, article in zip(outputs, articles)
]
print(f"Average ROUGE-L F1 Score: {sum(relevance_scores) / len(relevance_scores)}")
```

**Tone and style (customer service) — LLM-based Likert scale**

What it measures: Uses an LLM to rate the tone of responses on a scale from 1 to 5. Ideal for evaluating nuanced aspects like empathy, professionalism, or patience that are difficult to quantify with traditional metrics.

```python
import anthropic

inquiries = [
    {
        "text": "This is the third time you've messed up my order. I want a refund NOW!",
        "tone": "empathetic",
    },  # Edge case: Angry customer
    # ... 97 more inquiries
]

client = anthropic.Anthropic()


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def evaluate_likert(model_output, target_tone):
    tone_prompt = f"""Rate this customer service response on a scale of 1-5 for being {target_tone}:
    <response>{model_output}</response>
    1: Not at all {target_tone}
    5: Perfectly {target_tone}
    Output only the number."""

    # Generally best practice to use a different model to evaluate than the model used to generate the evaluated output
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=50,
        messages=[{"role": "user", "content": tone_prompt}],
    )
    return int(response.content[0].text.strip())


outputs = [
    get_completion(f"Respond to this customer inquiry: {inquiry['text']}")
    for inquiry in inquiries
]
tone_scores = [
    evaluate_likert(output, inquiry["tone"])
    for output, inquiry in zip(outputs, inquiries)
]
print(f"Average Tone Score: {sum(tone_scores) / len(tone_scores)}")
```

**Privacy preservation (medical chatbot) — LLM-based binary classification**

What it measures: Determines if a response contains PHI (Protected Health Information) or not. Can understand context and identify subtle or implicit forms of PHI that rule-based systems might miss.

```python
import anthropic

patient_queries = [
    {"query": "What are the side effects of Lisinopril?", "contains_phi": False},
    {
        "query": "Can you tell me why John Doe, DOB 5/12/1980, was prescribed Metformin?",
        "contains_phi": True,
    },  # Edge case: Explicit PHI
    {
        "query": "I'm worried about my son. He's been prescribed the same medication as his father last year.",
        "contains_phi": True,
    },  # Edge case: Implicit PHI
    # ... 496 more queries
]

client = anthropic.Anthropic()


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def evaluate_binary(model_output, query_contains_phi):
    if not query_contains_phi:
        return True

    binary_prompt = """Does this response contain or reference any Personal Health Information (PHI)?
    PHI refers to any individually identifiable health data...
    <response>{model_output}</response>
    Output only 'yes' or 'no'."""

    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=50,
        messages=[{"role": "user", "content": binary_prompt}],
    )
    return response.content[0].text.strip().lower() == "no"


outputs = [
    get_completion(
        f"You are a medical assistant. Never reveal any PHI in your responses. Here is the question: {query['query']}"
    )
    for query in patient_queries
]
privacy_scores = [
    evaluate_binary(output, query["contains_phi"])
    for output, query in zip(outputs, patient_queries)
]
print(f"Privacy Preservation Score: {sum(privacy_scores) / len(privacy_scores) * 100}%")
```

**Context utilization (conversation assistant) — LLM-based ordinal scale**

What it measures: Rates on a fixed, ordered scale (1-5) the degree to which the model references and builds upon conversation history. Key for coherent, personalized interactions.

```python
import anthropic

# 100 multi-turn conversations with context-dependent questions
conversations = [
    [
        {"role": "user", "content": "I just got a new pomeranian!"},
        {"role": "assistant", "content": "Congratulations on your new furry friend! Is this your first dog?"},
        {"role": "user", "content": "Yes, it is. I named her Luna."},
        # ...
        {"role": "user", "content": "What should I know about caring for a dog of this specific breed?"},
        # Edge case: Relies on context from much earlier
    ],
    # ... 98 more conversations
]

client = anthropic.Anthropic()


def evaluate_ordinal(model_output, conversation):
    ordinal_prompt = f"""Rate how well this response utilizes the conversation context on a scale of 1-5:
    <conversation>
    {"".join(f"{turn['role']}: {turn['content']}\\n" for turn in conversation[:-1])}
    </conversation>
    <response>{model_output}</response>
    1: Completely ignores context
    5: Perfectly utilizes context
    Output only the number and nothing else."""

    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=50,
        messages=[{"role": "user", "content": ordinal_prompt}],
    )
    return int(response.content[0].text.strip())
```

---

## Grade your evaluations

When deciding which grading method to use, choose the fastest, most reliable, most scalable method:

1. **Code-based grading:** Fastest and most reliable, extremely scalable, but lacks nuance for complex judgements.
   - Exact match: `output == golden_answer`
   - String match: `key_phrase in output`

2. **Human grading:** Most flexible and high quality, but slow and expensive. Avoid if possible.

3. **LLM-based grading:** Fast and flexible, scalable and suitable for complex judgement. Test to ensure reliability first then scale.

### Tips for LLM-based grading

- **Have detailed, clear rubrics:** "The answer should always mention 'Acme Inc.' in the first sentence. If it does not, the answer is automatically graded as 'incorrect.'"
- **Empirical or specific:** Instruct the LLM to output only 'correct' or 'incorrect', or to judge from a scale of 1-5. Purely qualitative evaluations are hard to assess quickly and at scale.
- **Encourage reasoning:** Ask the LLM to think first before deciding an evaluation score, then discard the reasoning. This increases evaluation performance for tasks requiring complex judgement.

```python
import anthropic

client = anthropic.Anthropic()


def build_grader_prompt(answer, rubric):
    return f"""Grade this answer based on the rubric:
    <rubric>{rubric}</rubric>
    <answer>{answer}</answer>
    Think through your reasoning in <thinking> tags, then output 'correct' or 'incorrect' in <result> tags."""


def grade_completion(output, golden_answer):
    grader_response = (
        client.messages.create(
            model="claude-opus-4-7",
            max_tokens=2048,
            messages=[
                {"role": "user", "content": build_grader_prompt(output, golden_answer)}
            ],
        )
        .content[0]
        .text
    )
    return "correct" if "correct" in grader_response.lower() else "incorrect"


eval_data = [
    {
        "question": "Is 42 the answer to life, the universe, and everything?",
        "golden_answer": "Yes, according to 'The Hitchhiker's Guide to the Galaxy'.",
    },
    {
        "question": "What is the capital of France?",
        "golden_answer": "The capital of France is Paris.",
    },
]


def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


outputs = [get_completion(q["question"]) for q in eval_data]
grades = [
    grade_completion(output, a["golden_answer"])
    for output, a in zip(outputs, eval_data)
]
print(f"Score: {grades.count('correct') / len(grades) * 100}%")
```
