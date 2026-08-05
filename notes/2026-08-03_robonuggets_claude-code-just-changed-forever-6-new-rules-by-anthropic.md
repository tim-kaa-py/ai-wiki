# Ingest Notes

**Source:** [Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers)](https://www.youtube.com/watch?v=gQeRjkb_Hlc)

## User Focus

Capture the general lessons about Claude Code itself and how to use it — the six then→now rules from the Anthropic article — NOT Jay's personal framework (excluded: ARMS framework, /robo brandbook skill, "surprise me" skill, /calibrate specifics, RoboNuggets promotion, /doctor-plus lead magnet).

- Framing: Anthropic engineer (Tariq) published "The new rules of context engineering for Claude 5 models"; six then→now rules, some the exact opposite of prevailing advice — [00:00-01:14], [04:28-05:04]
- What context engineering is: the prompt is only a small slice of what Claude receives; output quality is dominated by surrounding context — [01:14-01:59]
- Headline: Anthropic removed 80%+ of Claude Code's system prompt for Opus 5 / Fable 5 with no measurable loss on coding evals — [03:04-03:25]
- Why the rules changed: capability jump (Opus 4 ~31% on Artificial Analysis index a year ago vs Opus 5 / Fable 5 ~60/100 today) — [03:25-04:28]
- Rule 1 — Many rules → let Claude use judgment: early guardrails ("write no comments", "never write multi-paragraph docstrings") replaced by "write code that reads like the surrounding code, match its comment density, naming, and idiom" — [05:37-06:42], [08:12-08:25]
- Rule 2 — Examples → design interfaces: examples constrain the exploration space; give an interface/guidelines instead — [08:25-08:51], [10:00-10:14]
- Rule 3 — All context up front → progressive disclosure: CLAUDE.md as thin router into a tree of files, not a central repository — [10:51-11:53], [13:48-14:09]
- Rule 3 corollary — cost: a thick CLAUDE.md is injected every session; a thin router compounds token savings — [14:09-15:03]
- Rule 4 — Repetition → simple tool descriptions: delete instructions duplicated between system prompt and tool descriptions — [15:03-16:24]
- Rule 5 — Manual memory (`#` hotkey) → automatic memory; Jay's caveat: still worth explicitly asking Claude to remember after a productive session — [16:24-17:11]
- Rule 6 — Simple specs → richer references: newer models handle richer artifacts (HTML), parseable as text and human-readable — [18:04-19:38]
- `/doctor` (ships with Claude Code): checks broken/duplicate installs and paths, finds dead weight in skills/MCPs, trims CLAUDE.md, flags slow hooks, reports before applying — [20:37-22:14]

## Confirmed Discoveries

- (A) [19:38-20:23] HTML artifacts as a comprehension tool — have Claude render concepts as visual explainers instead of reading terminal walls of text.
- (B) [19:20-19:38] Dual-audience argument for references: parseable by the agent AND legible to humans (including third parties) — the load-bearing reasoning behind Rule 6.
- (D) [03:25-04:28] artificialanalysis.ai as a go-to benchmark reference on each model drop (backed by Nat Friedman, Andrew Ng) — causal premise for all six rules.
- (E) [15:03-15:49] Context rot as a historical failure mode (late-window instructions outweighing early ones), asserted without evidence to be substantially reduced in Opus 5 / Fable 5.
- (F) [11:53-13:48] The sub-router pattern: CLAUDE.md → per-domain routers (e.g. content.md) → files/skills; motivated by a 57,000-file workspace but generic — the concrete implementation of progressive disclosure.

Declined: (C) /doctor scope caveat.
