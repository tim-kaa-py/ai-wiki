---
title: "Claude Code Output Styles"
type: "how-to"
description: "Persistent, per-project modifiers on how Claude Code writes back to you — the config-level fix for output that's technically correct but exhausting to read"
pillar: "building"
tags: [claude-code, output-styles, workflow, how-to, best-practices]
sources:
  - "summaries/2026-08-05_ray-amjad_opus-5-is-exhausting-anthropic-reveals-the-fix.md"
timestamp: "2026-08-06"
---

# Claude Code Output Styles

An output style is a **persistent modifier on how Claude Code writes back to you** — role, tone, verbosity, jargon level, response format. It works by appending your instructions to the end of the system prompt, so it survives across turns, sessions, and compactions without being restated.

The distinction that matters: output styles change *how Claude responds*, not *what Claude knows*. Project conventions and codebase facts belong in CLAUDE.md. Register belongs here.

## The problem they solve

By August 2026 the complaint had gone mainstream: model default output had drifted toward jargon density. Ray Amjad opens with Claude telling him *"The corpus is an engine. Angles come from what you've already ingested,"* and cites a viral blog post arguing that reading AI output has become "extra effort… verbose, frequently contains all too plausible nonsense, and… increasingly jargon-dense" — alongside a screenshot of a reader saying "I had to look up every single word to make sense of this."

The argument for fixing this at config level rather than prompt level:

1. The unreadability recurs across conversations and projects, so per-message instructions don't hold.
2. Output styles are persistent and per-project.
3. Therefore the fix belongs in config, not in a prompt you retype every session.

**Caveat worth holding onto.** A style constrains *presentation*. It does nothing about the "all too plausible nonsense" half of the same complaint — a well-styled wrong answer is still wrong, and arguably more dangerous for being easier to read. Output styles are a user-side mitigation for a model-side regression, not a fix for it, despite how the video is titled.

## Built-in styles

| Style | Behaviour |
|-------|-----------|
| **Default** | Claude Code's standard software-engineering system prompt |
| **Proactive** | Executes immediately, makes reasonable assumptions rather than pausing on routine decisions, prefers action over planning. Stronger autonomous-execution guidance than auto mode, and it works without changing permission mode — you still get permission prompts before tools run |
| **Explanatory** | Adds educational "Insights" between task steps — why an implementation choice was made, how a codebase pattern works |
| **Learning** | Collaborative learn-by-doing: shares Insights *and* asks you to write small strategic pieces yourself, dropping `TODO(human)` markers in your code |

> **Naming correction.** The video repeatedly calls the third one the *"exploratory"* output style, including in a quoted command (`/config output style equals exploratory`). The actual built-in is **Explanatory**. There is no "exploratory" style.

## Creating a custom style

A custom output style is a Markdown file — frontmatter, then the instructions to append to the system prompt. The filename becomes the style name unless you set `name`.

Three locations:

| Level | Path |
|-------|------|
| User | `~/.claude/output-styles/` |
| Project | `.claude/output-styles/` |
| Managed policy | `.claude/output-styles/` inside the managed settings directory |

Project styles load from every `.claude/output-styles/` between the working directory and the repo root. As of v2.1.178, when nested directories define a style with the same name, the one closest to the working directory wins.

### Frontmatter fields

| Field | Purpose | Default |
|-------|---------|---------|
| `name` | Style name, if not the filename | Inherits from filename |
| `description` | Shown in the `/config` picker | None |
| `keep-coding-instructions` | Keep Claude Code's built-in software engineering instructions | `false` |
| `force-for-plugin` | Plugin styles only: apply automatically whenever the plugin is enabled, overriding the user's `outputStyle` setting | `false` |

### The `keep-coding-instructions` trap

**This is the single most important thing on this page, and no video covers it.**

The default is `false`. A custom output style **strips Claude Code's built-in software engineering instructions** — how it scopes changes, writes comments, and verifies work — unless you explicitly opt back in.

That default is correct when Claude isn't doing software engineering at all (a writing assistant, a data analyst). It is actively harmful when you only meant to change the register while still coding. If your style is about *communication* and you still want normal coding behaviour, you must set:

```yaml
keep-coding-instructions: true
```

Silently losing the verification discipline described in [Output Verification Principle](../tools/claude-code.md#output-verification-principle) — the practice Boris Cherny calls the single highest-impact thing you can do — because you wanted shorter sentences is a bad trade nobody makes on purpose.

### Example

```markdown
---
name: Diagrams first
description: Lead every explanation with a diagram
keep-coding-instructions: true
---

When explaining code, architecture, or data flow, start with a Mermaid
diagram showing the structure, then explain in prose.

## Diagram conventions

Use `flowchart TD` for control flow and `sequenceDiagram` for request
paths. Keep diagrams under 15 nodes.
```

## Switching styles

```
/config
# → Output style → select → Escape
```

Your selection is saved to `.claude/settings.local.json` at the local project level. To set it without the menu, edit the field directly in any settings file:

```json
{
  "outputStyle": "Explanatory"
}
```

> **Deprecation.** The standalone `/output-style` command was deprecated in v2.1.73 and **removed in v2.1.91**. Use `/config` or edit `outputStyle` directly. Older tutorials still show the removed command.

**Changes take effect after `/clear` or a new session.** Output style is part of the system prompt, which Claude Code reads once at session start — switching mid-session does not retroactively restyle the current one.

## Two properties that shape how you use them

### Per-project persistence

The active style lives in the project's `.claude/settings.local.json`, not globally. Setting a style in one project leaves every other project untouched. Ray demonstrates this live — one project on "Explain Like I'm 5", another switched to Simplified Technical English, neither affecting the other.

This is what makes style-switching cheap enough to actually do, and it enables matching register to **project familiarity**: `Explanatory` on an unfamiliar codebase you want to learn, something terse on a repo you own.

### Subagents don't inherit

Output styles apply to the **main conversation only**. A subagent runs its own system prompt, so your style doesn't shape how it responds. The exception is a *fork*, which inherits the parent's full system prompt.

Practical consequence: in a repo that routes analytical work to subagents, the style governs the orchestrator's prose but not what the subagents produce — though whatever the orchestrator relays back does get styled.

## Style as a dial, not a setting

The most useful idea in the video, and the least obvious:

**Premise A** — the right register depends on how familiar you are with the project.
**Premise B** — it also depends on the task, and on how much cognitive capacity you have right now (Ray relays that one Claude Code team member likes a simpler style "after a long day").
**Premise C** — all three vary continuously.
**Conclusion** — no single output style is correct for a given user; style is something you adjust in flight, and per-project persistence is what makes that affordable.

Treat a mismatched style as a signal to switch, not something to endure.

## Prototyping a style from your own bad output

Don't design a style in the abstract. Use a failure case you already have.

```
/branch
```

Then, in the new branch:

```
Here's my current output style: <paste>.
Generate 5 alternative output styles, and show me how your previous
output would look in each one.
```

You are now comparing concrete rewrites of text you already know you couldn't read, rather than comparing abstract style descriptions. Pick the readable one, tune the technical level, then promote it:

```
@claude-code-guide turn this into an output style
```

The underlying move: **the bad output is the eval fixture.** You already have a labelled failure case — use it. This is the same instinct as [Generator–Evaluator Harness](../concepts/generator-evaluator-harness.md), applied to prose register instead of code.

### ASD-STE100 as a style basis

When "kid mode" is too basic and a casual Slack-DM register is still too dense, Ray reaches for **ASD-STE100 (Simplified Technical English)** — a controlled-language standard from aerospace maintenance documentation, with a restricted vocabulary and grammar designed so technical instructions survive being read by non-native speakers under time pressure.

Its value here is leverage: it's a real specification with a name Claude already knows, so `"write in ASD-STE100"` transfers far more information than `"write more simply"`. Reach for a named standard before inventing a register from scratch.

## Output style vs. the alternatives

| Feature | How it works | Use when |
|---------|--------------|----------|
| **Output style** | Modifies the system prompt | You want a different role, tone, or default response format **every turn** |
| CLAUDE.md | Adds a user message after the system prompt | Claude should always know project conventions and codebase context |
| `--append-system-prompt` | Appends to the system prompt without removing anything | One-off addition for a single invocation |
| Subagent | Runs with its own system prompt, model, tools | You want a separately scoped helper for a focused task |
| Skill | Loads task-specific instructions when invoked or relevant | You have a reusable **workflow** |

### Refining the "same prompt every time" rule

The [Extension Decision Map](../tools/claude-code.md#extension-decision-map-anthropic-official) maps *"same prompt every time"* → **Skill**. The output-styles doc says to use a style when *"you keep re-prompting for the same voice or format every turn."* These look like they collide; they don't, once you split the repetition by kind:

- Repeating the same **task or workflow** → Skill.
- Repeating the same **voice or format** → output style.

A skill is *invoked*, so it is inherently reactive — it fires after you've already received output you didn't want. A style is *always on*, so it is preventive. When the thing you keep repeating is about register rather than procedure, the skill version makes you pay for the bad output before fixing it.

### Worked example: converting a style skill into a style

A concrete case from this workspace. A personal `at-my-level` skill encoded a reader-calibration contract — lead with *why* not *what*, ~3 sentences, Python analogies only, a list of framework vocabulary the reader doesn't yet own. It had two modes: translate the previous output on demand, and carry the style for the rest of the session.

Converting it to an output style was mostly a clean win, with one real loss and one required adaptation:

- **Won:** the session-mode half became the whole point. The register now applies from the first token instead of after an unreadable answer has already been produced and paid for.
- **Lost:** translate mode. An output style cannot be invoked, so "re-explain what you just said" has no equivalent — that capability disappears with the skill. If you rely on on-demand re-explanation, keep the skill *alongside* the style rather than replacing it.
- **Adapted:** a literal port would have applied "~3 sentences, no bullet lists" to *everything*, mangling plans, comparison tables, and findings reports. The style needed an explicit scope clause: the register governs explanatory prose, while structure that carries information a paragraph couldn't — code, multi-step plans, comparisons, verbatim tool output — keeps its shape.

The general lesson: skills that only ever shaped *prose* are output styles wearing the wrong hat. Skills that shape *procedure* are not. And any style contract written for on-demand translation needs a scope clause before it becomes always-on.

## Related Pages

- [Claude Code](../tools/claude-code.md) — the extension decision map this refines
- [Agent Skills](../concepts/agent-skills.md) — the invoked-workflow alternative
- [Context Engineering](../concepts/context-engineering.md) — system-prompt budget considerations
- [Cognitive Debt & Cognitive Surrender](../concepts/cognitive-debt.md) — the reading-effort problem from the human-erosion angle
- [Prompt Engineering for Claude](../concepts/prompt-engineering-claude.md)
