# Tier 2 Summary Template

Write `summaries/<slug>.md` with the summary frontmatter from `.claude/rules/frontmatter.md`, then this body:

```markdown
# <Title> — Summary

**Source:** <Channel/Author> | <Date> | [Link](<URL>) | <Duration/Size>

## TL;DR
<!-- 2-3 sentences focused on what the user found interesting -->

## Video Structure
<!-- Numbered list of the video's narrative sections with timestamps.
  Format: "1. [MM:SS-MM:SS] Section Title — Brief description"
  Purpose: navigation aid and understanding the creator's framing.
  Omit for non-video sources (articles, papers, repos). -->

## Key Concepts
<!-- H3 subheadings for each concept the creator explains or defines.
  For each concept:
  - Brief definition in the creator's own framing
  - If the creator's definition meaningfully diverges from the standard/common
    understanding, note the difference
  Purpose: definitional knowledge — what things ARE.
  Keep this distinct from Key Takeaways (what the creator ARGUES). -->

## Key Takeaways
<!-- Numbered list of the creator's insights, claims, and arguments.
  Each item includes:
  - The takeaway itself
  - **How to apply:** concrete next step or command
  Purpose: actionable insights — what the creator ARGUES or RECOMMENDS.
  Keep this distinct from Key Concepts (what things ARE). -->

## Argument Structures
<!-- Trace the creator's reasoning chains where they make non-obvious arguments.
  Format flexibly — use whatever structure best captures the logic:
  - Premises → conclusion
  - If X then Y, because Z
  - Nested reasoning with sub-conclusions
  Be faithful to the creator's actual arguments.
  Omit this section if the source is purely instructional/tutorial with no
  argumentative content (e.g., a feature walkthrough). -->

## Notable Commands / Code Snippets
<!-- Code blocks with context. Only include what's actually useful. -->

## User Notes
<!-- Personal takeaways from the interview -->

## Related Topics
<!-- Tags as comma-separated list -->
```

## Section usage rules

- **Video Structure:** include for YouTube/podcast sources. Omit for articles, papers, repos.
- **Key Concepts:** include when the creator explains or defines terms. Omit if nothing is worth defining separately.
- **Argument Structures:** include when the creator makes substantive arguments. Omit for purely instructional content.

Summaries are opinionated: focus on the user's interests (the notes file), not exhaustive coverage.
