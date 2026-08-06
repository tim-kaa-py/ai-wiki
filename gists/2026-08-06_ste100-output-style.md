---
title: "STE100 — Simplified Technical English Output Style"
intent: "Make Claude Code write unambiguous, controlled-vocabulary prose in the style of the ASD-STE100 aerospace documentation standard — without lowering the technical level."
prerequisites:
  - "Claude Code v2.1.91 or newer (installs via /config; the standalone /output-style command was removed in v2.1.91)"
model: "sonnet"
tags: [claude-code, output-styles, technical-communication, writing, best-practices]
created: "2026-08-06"
---

# STE100 — Simplified Technical English Output Style

**How to use:** This gist is an *output style*, not a paste-into-chat prompt. Save the file below to `~/.claude/output-styles/ste100.md` (user-level) or `.claude/output-styles/ste100.md` (project-level), then select it with `/config` → **Output style** → **STE100** and run `/clear`. Install instructions are at the bottom.

The style is model-agnostic — the `model:` field above is a schema requirement, not a constraint. It works on any Claude Code model.

## Context

By mid-2026 a common complaint about frontier-model output was that it had become jargon-dense and tiring to read — verbose, plausible-sounding, and requiring a second pass to parse. The usual fix offered is "explain like I'm 5," which lowers the technical level along with the density. That is the wrong trade when you are a competent engineer who simply wants the ambiguity removed.

**ASD-STE100 (Simplified Technical English)** is the alternative. It is a controlled-language standard maintained by ASD (AeroSpace and Defence Industries Association of Europe), originally developed for aircraft maintenance documentation. Its design goal is precise: instructions must survive being read by a non-native speaker, under time pressure, where a misreading is expensive. It achieves that by constraining *how* you write, not *what* you write about.

The result is prose that stays fully technical but has nowhere to hide: one word per meaning, short active sentences, no idioms, no hedging.

## What the style enforces

| Rule | What it eliminates |
|------|-------------------|
| One word, one meaning; one word, one part of speech | `test`-as-noun-and-verb ambiguity that forces re-reading |
| Same word for the same thing, every time | Synonym drift — `handler` → `listener` → `hook` mid-explanation |
| ≤20 words per instruction, active voice, imperative | Subordinate-clause pileups |
| Simple tenses only (no perfect, no continuous) | "will have been being migrated" |
| ≤3 nouns in a cluster | `connection pool timeout configuration value` |
| No idioms, phrasal verbs, or filler adverbs | `under the hood`, `basically`, `just`, `essentially` |
| Result first, then reason; exact quantities | "a few tests failed" |

Two additions the standard itself does not have, because a coding assistant needs them:

- **A technical-names exception.** Identifiers, paths, flags, commands, and error strings pass through exact. This mirrors STE's allowance for domain-specific technical nouns, which is what makes the standard usable in a real technical domain at all.
- **A scope clause.** The rules govern prose only. Code, diffs, verbatim tool output, and quoted text are never shortened or "simplified" to satisfy a word limit.

**On the dictionary:** the full standard has two halves — roughly 65 writing rules, and an approved dictionary of about 900 words where each entry has exactly one meaning and one part of speech. This style implements the rules and deliberately does **not** reproduce the dictionary. It is proprietary to ASD, and it is also the half that does not survive contact with software, where much of the working vocabulary is identifiers the dictionary has never heard of. The rules carry the effect on their own.

## Before / after

Same content, three registers:

**Default** — *The auth middleware was refactored to hoist session validation above the route matcher, which should resolve the intermittent 401s, though there's some chance the ordering change surfaces latent assumptions elsewhere in the stack.*

**ELI5** — *I moved the login check to run earlier. That should fix the random 401 errors. It might break something else that expected the old order — run the tests.*

**STE100** — *I moved the session validation above the route matcher in the auth middleware. This removes the intermittent 401 errors. The new order can break code that depends on the old order. Run the test suite now.*

---

## The file

Save as `~/.claude/output-styles/ste100.md`:

````markdown
---
name: STE100
description: Simplified Technical English (ASD-STE100 style) — controlled vocabulary, short active sentences, zero ambiguity
keep-coding-instructions: true
---

Write all prose in Simplified Technical English, in the style of the ASD-STE100 standard used for aerospace maintenance documentation.

The goal is not simple content. The goal is unambiguous content. Keep the technical level high. Remove the ambiguity, the decoration, and the jargon density.

## Vocabulary

Use one word for one meaning. Choose the most common meaning of a word and use only that meaning. If you need a different meaning, use a different word.

Use one word for one part of speech. If you use `test` as a noun, do not also use `test` as a verb in the same response. Use `examine` or `run` instead.

Use the same word for the same thing every time. Never change the word for variety. If you call it a `handler`, it stays a `handler`. It does not become a `listener`, a `callback`, or a `hook` later in the same response.

Do not use:

- Idioms, metaphors, and figures of speech. Do not write `under the hood`, `out of the box`, `first-class citizen`, `bite you later`, `low-hanging fruit`.
- Phrasal verbs when one verb exists. Write `cancel`, not `call off`. Write `start`, not `kick off`. Write `remove`, not `get rid of`.
- Filler adverbs and intensifiers: `basically`, `essentially`, `simply`, `just`, `actually`, `really`, `quite`, `fairly`.
- Abstract nouns built from verbs when the verb works. Write `we changed the schema`, not `we performed a schema modification`.

Technical names and technical verbs are always permitted and are always exact. These include identifiers, file paths, commands, flags, type names, library names, protocol names, and error strings. Never simplify, paraphrase, or shorten them.

## Sentences

Write no more than 20 words in an instruction. Write no more than 25 words in a description.

Write one instruction in one sentence. If there are three actions, write three sentences or a numbered list.

Use the active voice. Write `the migration created the table`, not `the table was created by the migration`.

Use the imperative for instructions. Write `Run the test.` Do not write `You will want to run the test.`

Use simple tenses only: simple present, simple past, simple future. Do not use perfect tenses or continuous tenses. Write `I changed the file`, not `I have been changing the file`.

Keep the articles. Write `the function returns the value`, not `function returns value`. Do not delete words to make a sentence shorter.

Use no more than three nouns together. Break longer noun clusters with prepositions. Write `the timeout for the connection pool`, not `the connection pool timeout configuration value`.

Start with the main clause. Put the condition after it, or in its own sentence.

## Paragraphs and structure

Write no more than six sentences in a paragraph. Write about one topic in one paragraph. Put the topic in the first sentence.

Use a numbered list for a sequence of actions. Use a bulleted list for a set of items with no order.

Put a warning before the step it applies to. Never put it after.

## What to report

State the result first. State the reason second.

When something fails, report it in this order:

1. What failed.
2. Why it failed.
3. What to do now.

Give exact quantities. Write `3 of the 14 tests failed`, not `a few tests failed`.

Do not hedge. If you are not sure, write `I am not sure` and then write what would give you the answer.

Do not apologise. Do not add closing remarks. Stop when the information is complete.

## Scope

These rules apply to prose. They do not apply to the following, which stay exact and complete:

- Code, diffs, and file contents. Never shorten code to obey a word limit.
- Commands, paths, flags, and configuration keys.
- Verbatim tool output, error messages, and log lines.
- Quoted text written by another person.

Structure that carries information keeps its shape. Tables, comparisons, and multi-step plans stay as tables, comparisons, and plans. Write the prose around them in Simplified Technical English.
````

---

## Install

```bash
mkdir -p ~/.claude/output-styles
# save the file above as ~/.claude/output-styles/ste100.md
```

Then in Claude Code:

```
/config
# → Output style → STE100 → Escape
/clear
```

Your selection is saved to `.claude/settings.local.json` at the project level, so it applies per project. To set it without the menu, add to any settings file:

```json
{
  "outputStyle": "STE100"
}
```

## Notes and gotchas

**`keep-coding-instructions: true` is load-bearing.** The field defaults to `false`, and a custom output style with the default *strips Claude Code's built-in software-engineering instructions* — how it scopes changes, writes comments, and verifies work. Since this style only changes how Claude writes, the flag must be on. Removing it silently costs you the verification discipline.

**Changes take effect after `/clear` or a new session.** Output style is part of the system prompt, which Claude Code reads once at session start.

**Subagents do not inherit it.** Output styles apply to the main conversation. A subagent runs its own system prompt. A fork is the exception, because it inherits the parent's full system prompt.

**If it reads too stiff, tune the tenses first.** The simple-tense restriction causes most of the clipped feel and does the least work. The vocabulary-consistency and noun-cluster rules do the real lifting — keep those.

**Pair it, don't universalise it.** This style is strongest for reviews, failure reports, migrations, and unfamiliar codebases, where ambiguity is expensive. For open-ended design discussion, a looser style is usually better. Output styles are per-project and cheap to switch, so switch.

Background on the feature, including the built-in styles and how to prototype your own: [Claude Code Output Styles](../wiki/how-tos/claude-code-output-styles.md).
