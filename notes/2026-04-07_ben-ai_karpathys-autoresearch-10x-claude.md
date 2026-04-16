# Ingest Notes

**Source:** [How to use Karpathy's Autoresearch to 10x Claude](https://www.youtube.com/watch?v=bc4NrE0cOE0)

## User Focus
- The general concept of Karpathy's Auto Research — what it is, the self-improving optimization loop
- The framework for defining good criteria to optimize against — three-level framework (hard rules → subjective patterns → real-world data), rules for good criteria (true/false, exact condition, one variable per criterion), how to come up with criteria
- Everything about creating/optimizing a LinkedIn writing skill — specific criteria used, hook templates, writing frameworks (PAS, IDA), nuance on bold claims, personal story, scheduled weekly optimization loop

## Confirmed Discoveries
- Token cost warning: running too many iterations gets expensive, optimize only high-value skills
- Two evaluation modes: deterministic script vs. LLM judge sub-agent for unbiased evaluation
- Using auto research to optimize CLAUDE.md / second brain (knowledge routing, wiki links, retrieval)
- Iteration sweet spot: 5-10 max, performance degrades after 10-15 iterations
- Setup path: adapting Karpathy's ML repo for general use via Claude iteration
