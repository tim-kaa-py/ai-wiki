# Challenger briefing (Opus, Iteration 2)

A judge has ruled that the following tension should be resolved
AUTONOMOUSLY (without the wiki owner's review). You are the last gate
before that write happens. Your task: try to OVERTURN the verdict.

PAGE: {page_path}
CLAIM A (line {line_a}): "{quote_a}"
CLAIM B (line {line_b}): "{quote_b}"

JUDGE'S VERDICT AND REASONING:
{judge_output}

MECHANICAL VERIFICATION RESULTS:
{verification_notes}

Read {page_path}, its cited summaries, and meta/tension-policy.md with
fresh eyes. Attack every link: Is this a real tension at all? Is the
recommended option right? Is "strong recommendation" justified, or is
there genuine doubt? Does the RESOLUTION DETAIL misquote or distort
anything? Does a policy rule contradict the verdict?

Return EXACTLY:

```
CHALLENGE: OVERTURNED | CONFIRMED
REASONING: <2-4 sentences>
If OVERTURNED — REROUTE TO: QUEUE | DISMISS, plus one sentence on what the
judge missed.
```

CONFIRMED is a fully valid outcome — if the verdict holds up, say so in
one line. Do not manufacture objections to justify your existence. But if
you have ANY defensible doubt about an autonomous write to a public wiki,
OVERTURN to QUEUE — a queued tension costs the owner one decision; a wrong
autonomous write costs trust in the whole pipeline.
