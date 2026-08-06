---
title: "Opus 5 Is Exhausting. Anthropic Reveals The Fix."
type: "summary"
description: "Opus 5's default prose is jargon-dense and tiring to read; Claude Code output styles are the recommended fix, and they work best as a per-project, per-mood dial rather than a set-once preference."
channel: "Ray Amjad"
date: "2026-08-05"
resource: "https://www.youtube.com/watch?v=szjakRcw7V0"
pillar: "building"
tags: [claude-code, output-styles, workflow, how-to]
timestamp: "2026-08-06"
source_file: "sources/youtube/2026-08-05_ray-amjad_opus-5-is-exhausting-anthropic-reveals-the-fix.md"
---

# Opus 5 Is Exhausting. Anthropic Reveals The Fix. — Summary

**Source:** Ray Amjad | 2026-08-05 | [Link](https://www.youtube.com/watch?v=szjakRcw7V0) | 5:56

## TL;DR

Opus 5's default prose has drifted toward jargon density — Ray opens with Claude telling him "The corpus is an engine. Angles come from what you've already ingested," and cites a viral blog post complaining that reading AI output is now "extra effort… verbose, frequently contains all too plausible nonsense, and… increasingly jargon-dense." The fix recommended by someone on the Claude Code team is **output styles**, a feature that shipped around October and that Ray himself dismissed on release. The genuinely new idea isn't the feature — it's the usage pattern: styles persist per project, and Anthropic staff apparently switch them by project, by task, and by time of day depending on how much cognitive effort they have left.

Worth naming the framing gap: the title says Anthropic "reveals the fix," but what is actually on offer is a **user-side mitigation for a model-side regression**. Nothing in the video suggests the default output register is changing.

## Video Structure

1. [00:00-00:48] The problem — unreadable Opus 5 output, corroborated by a viral blog post
2. [00:48-01:15] The fix — output styles, and Ray's reversal on a feature he'd written off
3. [01:15-02:10] Setup walkthrough — installing a style via `@claude-code-guide`, switching via `/config`
4. [02:10-03:05] Built-in styles — `learning`, `explanatory`, and the team's onboarding use of them
5. [03:05-04:09] Rolling your own — `/branch` prototyping, kid mode, Slack DM, ASD-STE100
6. [04:09-05:06] Per-project persistence via `.claude/settings.local.json`
7. [05:06-05:56] Personal usage pattern and outro

## Key Concepts

### Output style

A persistent modifier on how Claude Code writes back to you — register, verbosity, jargon level, whether it explains its reasoning as it works. Distinct from a prompt instruction in that it survives across turns, sessions, and compactions without being restated, and distinct from a skill in that it is always on rather than invoked. Claude Code ships several (`learning`, `explanatory`, and others); users can author their own.

Ray's framing diverges from how the feature was originally received. At launch it read as an accessibility or novelty setting — his own October video called it "a feature that I don't use much, but it does exist." He now treats it as a load-bearing ergonomics control, and attributes the change not to the feature improving but to **model defaults getting harder to read**.

### Style prototyping via `/branch`

A loop for discovering a register that works for you rather than guessing at one. Branch off the conversation where the output annoyed you, hand Claude the current style plus that bad output, and ask for ~5 candidate styles *with* the same output rewritten in each. You are then comparing concrete rewrites of text you already know you couldn't read, not comparing abstract style descriptions. Promote the winner to a real output style.

The underlying move: **the bad output is the eval fixture.** You already have a labelled failure case; use it.

### ASD-STE100 / Simplified Technical English

A controlled-language standard originating in aerospace maintenance documentation — a restricted vocabulary and grammar designed so technical instructions survive being read by non-native speakers under time pressure. Offered as a style basis when "explain like I'm 5" is too basic and a casual Slack-DM register is still too dense. Its value here is that it is an actual specification with a name Claude already knows, so `"write in ASD-STE100"` transfers far more information than `"write more simply"`.

### Per-project style persistence

The active output style is stored in the project's `.claude/settings.local.json`, not globally. Setting a style in one project leaves every other project untouched. Ray demonstrates this live: one project on "Explain Like I'm 5," another switched to Simplified Technical English, with neither affecting the other.

## Key Takeaways

1. **The unreadability is a model-default problem, not a prompting problem.** It recurs across conversations and projects, so per-message instructions don't hold. That's the argument for fixing it at config level.
   **How to apply:** stop re-prompting "be concise" every session. Set a style once per project.

2. **Match style to project familiarity, not to taste.** Ray uses `explanatory` on a new project (agent sandboxes) where he wants to learn the domain, and a much terser style on projects he knows cold.
   **How to apply:** on an unfamiliar repo, `/config` → output style → `explanatory`. On a repo you own, set something short.

3. **Style is a dial you ride, not a preference you set.** Anthropic team members reportedly switch by project, by task, and by time of day — one uses a simpler style "after a long day."
   **How to apply:** treat a mismatched style as a signal to switch, not as something to endure. Switching is `/config` plus a rewind.

4. **Prototype styles from your own failure cases.** Don't design a style in the abstract.
   **How to apply:** next time output annoys you, `/branch`, then: *"Generate 5 alternative output styles, and show me how your previous output would look in each."* Pick the readable one and promote it.

5. **Reach for a named standard before inventing a register.** `ASD-STE100` carries more signal than a paragraph of hand-written style guidance.
   **How to apply:** try `"write in ASD-STE100 (Simplified Technical English)"` as a style basis, then tune the technical level up or down from there.

6. **Expect to re-tune over time.** Ray notes that as he gets more technical in a domain, he'll want to "bump up the level of the output style."
   **How to apply:** revisit a project's style when your familiarity with that project has visibly changed, not on a schedule.

## Argument Structures

The video is mostly a feature walkthrough, but one chain carries it:

**Premise 1** — Model output has become harder to read (Ray's own experience, plus a viral blog post from an independent author reporting the same, plus a screenshot where a reader says "I had to look up every single word").
**Premise 2** — The problem is not localized to one bad prompt; it recurs across conversations and projects.
**Premise 3** — Output styles are persistent, per-project modifiers that survive across sessions.
**Conclusion** — Therefore the fix belongs at config level rather than prompt level.

A second, less obvious chain produces the video's actual novel claim:

**Premise A** — The right register depends on how familiar you are with the project.
**Premise B** — It also depends on the task, and on how much cognitive capacity you currently have (the "after a long day" case).
**Premise C** — All three of those vary continuously.
**Sub-conclusion** — Therefore no single output style is correct for a given user.
**Conclusion** — Therefore output style should be treated as a dial adjusted in flight, and per-project persistence is what makes that cheap enough to actually do.

Note the load-bearing weakness in the first chain: it establishes that output styles *mitigate* the problem, not that they *fix* it. The style constrains presentation. It does not address the "all too plausible nonsense" complaint in the blog post Ray himself quotes — a well-styled wrong answer is still wrong, and arguably more dangerous for being easier to read.

## Notable Commands / Code Snippets

Switch style interactively:

```
/config
# → search "output style" → select → Escape
```

Have Claude install a style for you:

```
@claude-code-guide add this output style for me
<paste style definition>
```

Prototype candidate styles from a bad output:

```
/branch
# then, in the new branch:
Here's my current output style: <paste>.
Generate 5 alternative output styles, and show me how your
previous output would look in each one.
```

Promote a winner:

```
@claude-code-guide turn this into an output style
```

Per-project persistence lives in:

```
<project>/.claude/settings.local.json
```

## User Notes

Selected discoveries: per-project persistence (A), style-as-dial rather than set-once (B), `/branch` prototyping loop (D), ASD-STE100 as a style basis (E). Declined: the `explanatory`-for-onboarding pattern and the author's personal reversal narrative.

Direct relevance to this workspace: the `at-my-level` skill already implements this video's thesis — but as a skill you invoke *after* receiving unreadable output, which means the unreadable output still gets produced and still has to be paid for in tokens and attention. An output style is the preventive version of the same idea. The two are complementary rather than redundant: a style sets the baseline register, and the skill remains the escape hatch for when the baseline still misses.

## Related Topics

claude-code, output-styles, workflow, how-to, context-engineering, ergonomics
