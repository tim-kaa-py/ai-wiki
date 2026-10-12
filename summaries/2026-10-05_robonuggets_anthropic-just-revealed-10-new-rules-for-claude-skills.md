---
title: "Anthropic Just Revealed 10 NEW Rules for Claude Skills"
type: "summary"
description: "Jay E's secondhand walkthrough of Anthropic's updated skill-authoring guide for the Claude 5.5 models: ten rules covering one-level-deep progressive disclosure, tables of contents for 100-line previews, degrees of freedom, per-model testing, checklists, feedback loops, output patterns, shareability and hook-enforced invariants."
channel: "Jay E | RoboNuggets"
date: "2026-10-05"
resource: "https://www.youtube.com/watch?v=VQyYzLJ6xos"
pillar: "building"
tags: [skills, agent-skills, claude-code, best-practices, progressive-disclosure, hooks]
timestamp: "2026-10-12"
source_file: "sources/youtube/2026-10-05_robonuggets_anthropic-just-revealed-10-new-rules-for-claude-skills.md"
---

# Anthropic Just Revealed 10 NEW Rules for Claude Skills — Summary

**Source:** Jay E | RoboNuggets | 2026-10-05 | [Link](https://www.youtube.com/watch?v=VQyYzLJ6xos) | 12:15 (transcript captured to 10:38)

## TL;DR

Jay E reads Anthropic's updated skill-authoring guide and turns it into ten rules, all illustrated with one running example: an invoicing skill. The common thread is that the 5.5 models are capable enough that old, prescriptive skills now hurt output. So you keep the always-loaded parts short, give rigid structure only where a mistake is costly, and move true invariants out of prose and into checks or hooks. This is a secondhand reading of the guide, not the guide itself, and the captured transcript stops partway through Rule 10.

## Video Structure

1. [00:00-00:49] Intro: Anthropic updated its skills guide for the 5.5 models; hook claim that Claude "may only read the first 100 lines" of a skill file.
2. [00:49-02:08] Rule 1: Progressive disclosure, keep SKILL.md under 500 lines, references one level deep.
3. [02:08-02:55] Sponsor segment: free PDF audit guide and RoboNuggets community pitch.
4. [02:55-03:38] Rule 2: Content lists at the top of any file over 100 lines.
5. [03:38-05:02] Rule 3: Degrees of freedom (high, medium, low), mixed inside one skill.
6. [05:02-06:14] Rule 4: Test skills on every model you plan to run them on.
7. [06:14-07:01] Rule 5: Write only what Claude can't infer; third-person descriptions.
8. [07:01-07:49] Rule 6: Workflows and checklists with a "go back" line.
9. [07:49-08:34] Rule 7: Feedback loops (run, fix, repeat until it passes), including non-code ones.
10. [08:34-09:32] Rule 8: Three output patterns: template, examples, conditional workflow.
11. [09:32-10:22] Rule 9: Build for shareability: state dependencies and installation steps.
12. [10:22-10:38+] Rule 10: Hooks for rules that must never be broken (transcript truncated).

## Key Concepts

### Progressive disclosure

SKILL.md works like a contents page. Claude opens a linked file only at the step that needs it, so files the current task doesn't need (the invoice skill's scripts folder, for example) never cost tokens.

### The 100-line preview

When references are nested (SKILL.md → file B → file C), Claude may only *preview* the deeper file, reading roughly its first 100 lines instead of the whole file. Jay attributes this behaviour to Anthropic. Note that the intro states it more broadly ("if you have a long skill file, Claude may only read the first 100 lines"). In Rule 1 he narrows it to nested references, which is the more precise version.

### Degrees of freedom

Anthropic's term for how tightly a step is specified, in three levels:

- **High:** plain instructions, e.g. brainstorming ways to automate a process.
- **Medium:** a template with a few settings, e.g. a weekly report with a fixed shape but room for variation.
- **Low:** an exact script, e.g. creating an invoice or tax documents.

The level is chosen per step, not per skill.

### Go-back line

A step in a checklist that sends Claude back to an earlier step when a check fails, e.g. "if any total doesn't match the job list, go back to step 2." This stops a box from being ticked when the work behind it is wrong.

### Feedback loop

Run, check against explicit criteria, fix each failure, and repeat until every check passes. It applies to non-code work too: Anthropic's own first example checks a draft against a style guide.

## Key Takeaways

1. **Keep SKILL.md under 500 lines and every reference one level deep.** Split detail into sibling files linked directly from SKILL.md. Nested chains risk Claude only previewing the deepest file.
   **How to apply:** For each skill, list which files link to which. Any file reached only through another reference file gets a direct link from SKILL.md instead, or is merged into its parent.

2. **Put a short table of contents at the top of every file over 100 lines.** Even if Claude only reads the first 100 lines, it then knows what's further down (e.g. "discounts: bottom section") and can jump straight there.
   **How to apply:** Run `wc -l` across `.claude/skills/**`. Every file over 100 lines gets a bulleted contents list in its first lines.

3. **Match rigidity to how costly a mistake is, step by step.** Low-risk steps get plain instructions, risky steps get exact scripts, and both can sit in the same skill (open-ended invoice email, scripted invoice creation). Jay argues that over-rigid skills hold back the 5.5 models.
   **How to apply:** Label each step of a skill high, medium or low freedom. Loosen the high-freedom steps and harden the low-freedom ones, ideally into scripts.

4. **Test skills on every model you plan to run them on, with a different question per model:**
   - **Haiku:** is there enough guidance?
   - **Sonnet:** is the skill clear and efficient?
   - **Opus/Fable:** does it avoid over-explaining?

   Older skills are often too prescriptive for the newest models, and some skills you run on top models may be prescriptive enough for Haiku. Jay's caveat: testing everything is expensive, so do it only for the skills you rely on most and those where a mistake is consequential.
   **How to apply:** Pick your two or three most-used or highest-stakes skills. Run each on the cheapest model you'd accept and on your default model, then compare the outputs.

5. **Write only what Claude can't work out on its own.** The context window is a "public good" (Anthropic's phrase): don't explain what an invoice is. Keep the company-specific facts: prices, terms, internal rules.
   **How to apply:** Delete any paragraph from a skill that a capable model would know without being told.

6. **Write skill descriptions in the third person.** "Creates client invoices and sends payment reminders," not "I can help you with invoices." The description is what Claude reads when choosing a skill, and first person can confuse that choice, especially on smaller models.
   **How to apply:** Grep your `SKILL.md` descriptions for "I can", "I will", "I'll" and "Use me", and rewrite them.

7. **Give multi-step jobs an explicit checklist that Claude copies into its reply and ticks off.** According to Anthropic, clear steps stop the 5.5 models skipping critical steps, which has been observed. Add go-back lines to the check steps.
   **How to apply:** For any skill with more than about five steps, add a copyable checklist block and one go-back line per verification step.

8. **Build feedback loops into skills, code or not.** Running, fixing and repeating until checks pass "greatly improves" output, per Anthropic. For prose, make the check a short checklist (consistent terminology, examples in the standard format, all required sections present), have Claude cite which guideline each failure breaks, and only finish once everything passes.
   **How to apply:** Turn your style or format rules into three to five yes/no checks. Add a "review against these checks, revise, re-check" step before the skill's final output.

9. **When output must be well-defined, use one of three patterns:**
   - a template, either strict or a sensible default;
   - input→output example pairs, which show style and level of detail better than description;
   - a conditional workflow that forks on the task's conditions.

   **How to apply:** For a skill whose output keeps drifting, decide which of the three fits and add it.

10. **Build for shareability: never assume tools are installed.** Instead of "use the PDF library", name the exact packages and include installation instructions to follow if they're missing. Otherwise the skill works on your machine and fails the first time a teammate runs it.
    **How to apply:** Add a "Dependencies" section listing exact packages and install commands to any skill that calls external tools.

11. **Enforce rules that must never break with hooks, not prose.** Jay's example is "never send an invoice above $10,000 without a person's sign-off." Writing it in capitals works "most of the time" (where the transcript ends), and he calls hooks underused and among the most important rules. *(The rest of this argument is not captured. Reading it as "a hook enforces the rule every time, a capitalised instruction doesn't" fits his setup but is an inference, not his words.)*
    **How to apply:** Find any "NEVER"/"ALWAYS" in your skills whose violation would be costly, and decide whether a PreToolUse hook (or a mod) can block the action instead.

## Argument Structures

**Why old skills now underperform:**

- The 5.5 models are more capable and more creative than their predecessors.
- Skills written for older models over-specify.
- Anthropic says over-prescription "can actually make the output worse."
- Therefore: loosen low-risk steps and re-test old skills with less guidance.

Rigidity is kept only where the cost of error justifies it (Rules 3 and 4).

**Why the file layout matters, not just the content:**

- Claude may only preview deeper files, about the first 100 lines.
- So content placed lower down, or two links deep, can effectively not exist.
- Therefore: keep references one level deep (Rule 1), and where a file is long, put a table of contents within its first 100 lines (Rule 2). Then even a partial read finds everything.

**Why checklists alone aren't enough:**

- A checklist stops steps being skipped (Rule 6).
- But a box can be ticked over wrong work.
- So the go-back line (Rule 6), the feedback loop (Rule 7) and, for invariants, hooks (Rule 10) add increasing levels of enforcement: from "remember to do it", to "verify it was done right", to "the harness won't let it happen".

The third level is partly inferred, because the transcript is truncated.

## Notable Commands / Code Snippets

Third-person description (from Rule 5):

```yaml
description: Creates client invoices and sends payment reminders.
# not: "I can help you with invoices and payment reminders."
```

Checklist with a go-back line (reconstructed from Rule 6; the on-screen version wasn't captured):

```markdown
Invoice progress:
- [ ] Step 1: Collect the job list
- [ ] Step 2: Calculate line totals from pricing.md
- [ ] Step 3: Check: every total matches the job list
      If any total doesn't match, go back to Step 2.
- [ ] Step 4: Generate the invoice (scripts/)
```

Table of contents at the top of a long reference file (Rule 2):

```markdown
# Pricing
Contents: standard rates · rush surcharges · retainers · discounts (bottom)
```

## User Notes

The user asked for full coverage of all ten rules with no special focus. The truncation at 10:38 came from the pasted transcript; YouTube refused both caption and audio download on 2026-10-12.

This is the same creator as the earlier [6 NEW Rules](2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md) video, also a secondhand reading of Anthropic material. The primary source behind this video is Anthropic's skill-authoring best-practices guide; ingesting it directly would let the wiki check this reading, especially the "100 lines" claim and the per-model test questions.

## Related Topics

skills, agent-skills, claude-code, best-practices, progressive-disclosure, hooks, verification, prompt-engineering
