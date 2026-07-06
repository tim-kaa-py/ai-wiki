# Detector briefing (Sonnet)

You are scanning wiki pages for INTERNAL CONTRADICTIONS — two claims on the
SAME page that cannot both be followed or cannot both be true. These pages
were built by merging multiple sources without conflict detection; your job
is to find where that silently produced contradictory prose.

Read each of these pages in full:
{page_paths}

Also read the calibration policy (may be empty early on):
meta/tension-policy.md

STRICT criteria — a candidate tension requires ALL of:
1. Two specific claims, each quotable VERBATIM from the page.
2. Following/believing both simultaneously is impossible, OR they state
   facts that cannot both be true.
3. The conflict survives a charitable reading. If a reasonable reader can
   reconcile them ("X in context A, Y in context B"), it is NOT a tension.

NOT tensions (do not report):
- Differing emphasis or priority between sources.
- Complementary or additive advice.
- Claims scoped to different tools, model generations, or situations.
- A general rule plus its stated exception.
- Vague prose that is merely unclear rather than contradictory.

Do NOT synthesize, soften, or reconcile. Your only output is candidates.
Quote verbatim — do not paraphrase, do not fix typos in quotes.

Output format — for each candidate:

```
CANDIDATE <n>
PAGE: <repo-relative path>
CLAIM A (line <n>): "<verbatim quote>"
CLAIM B (line <n>): "<verbatim quote>"
WHY THEY CONFLICT: <one sentence>
```

If a page has no candidates, list it under a final `CLEAN PAGES:` heading.
Report every page exactly once. It is a valid and expected outcome that
most or all pages are clean — do not lower the bar to produce findings.
