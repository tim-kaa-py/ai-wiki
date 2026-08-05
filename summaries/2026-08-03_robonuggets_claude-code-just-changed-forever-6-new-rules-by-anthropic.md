---
title: "Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers)"
type: "summary"
description: "Secondhand breakdown of an Anthropic engineer's 'new rules of context engineering for Claude 5 models' — six then→now shifts including judgment over rules, progressive disclosure via router CLAUDE.md, and richer-than-markdown references."
channel: "Jay E | RoboNuggets"
date: "2026-08-03"
resource: "https://www.youtube.com/watch?v=gQeRjkb_Hlc"
pillar: "building"
tags: [claude-code, context-engineering, best-practices, workflow, agents]
timestamp: "2026-08-05"
source_file: "sources/youtube/2026-08-03_robonuggets_claude-code-just-changed-forever-6-new-rules-by-anthropic.md"
---

# Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers) — Summary

**Source:** Jay E | RoboNuggets | 2026-08-03 | [Link](https://www.youtube.com/watch?v=gQeRjkb_Hlc) | 24:01

## TL;DR

Jay E walks through an article by Anthropic engineer **Tariq**, "The new rules of context engineering for Claude 5 models," which frames six **then→now** reversals in how you should engineer context for Opus 5 / Fable 5. The through-line: the models got good enough that the scaffolding we built for weaker models — dense rule lists, worked examples, everything-up-front CLAUDE.md files, repeated instructions — is now actively counterproductive. The headline data point is that Anthropic deleted **over 80% of Claude Code's system prompt** for the Claude 5 generation with **no measurable loss on coding evals** [03:04-03:25].

**Attribution warning, read this first.** This is a *secondhand* account. Jay is paraphrasing an article he read; no quotes from the article are shown on screen in verbatim form beyond a few slides, and several claims arrive already filtered through his framing. Where Jay adds his own interpretation or examples (his `/robo` design skill, his 57,000-file workspace, his `/calibrate` habit, his memory caveat) it is flagged below. Treat the six rules as *reported* Anthropic guidance, not as citable Anthropic text — the primary source is the article itself, which this ingest did not read.

## Video Structure

1. **[00:00-00:42] Hook** — "One of the lead engineers at Anthropic just published this breakthrough article on X," ~4M views; promise of six rules, some the exact opposite of prevailing advice.
2. **[00:45-01:14] The source** — Tariq, Anthropic engineer; article title "The new rules of context engineering for Claude 5 models"; 4.3M views used as a quality signal ("that's a very good signal that there's a couple of great nuggets").
3. **[01:14-01:59] What context engineering is** — the prompt is only a small slice of what Claude actually receives; output quality is dominated by the surrounding context.
4. **[01:59-02:44] Jay's ARMS framework** — his personal four-part context model (Applications, Routines, Memory, Skills). *Excluded from this ingest per user focus.*
5. **[03:04-03:25] The headline** — 80%+ of Claude Code's system prompt removed for Opus 5 / Fable 5, no measurable eval loss.
6. **[03:25-04:28] Why the rules changed** — Opus 4 scored ~31 on the Artificial Analysis index a year ago; Opus 5 / Fable 5 top the board at ~60/100 today.
7. **[04:28-05:04] Framing** — Anthropic gave a "then and now" view; Jay will walk each with examples.
8. **[05:04-05:37] Community promo.** *Excluded.*
9. **[05:37-08:25] Rule 1 — Many rules → let Claude use judgment.**
10. **[08:25-10:51] Rule 2 — Examples → design interfaces** (with Jay's `/robo` brandbook example; *framework specifics excluded*).
11. **[10:51-14:09] Rule 3 — All context up front → progressive disclosure** (router CLAUDE.md, sub-routers).
12. **[14:09-15:03] Rule 3 corollary — the token-cost argument for a thin CLAUDE.md.**
13. **[15:03-16:24] Rule 4 — Repetition → simple tool descriptions** (with context rot as the historical reason repetition worked).
14. **[16:24-18:04] Rule 5 — Manual memory → automatic memory** (with Jay's `/calibrate` skill; *specifics excluded*).
15. **[18:04-19:38] Rule 6 — Simple specs → richer references** (HTML artifacts over markdown).
16. **[19:38-20:23] HTML artifacts as a comprehension tool** for the human, not just the agent.
17. **[20:23-22:14] `/doctor`** — ships with Claude Code, five checks.
18. **[22:14-23:49] `/doctor-plus` lead magnet.** *Excluded.*

## Key Concepts

### Context engineering

The premise the whole article rests on: when you send a prompt, that prompt is "only a small part of the context that it gets," and "a big part of the output that your agent gives you is coming from your context" [01:30-01:42]. The prompt is a *direction*; the context is the substrate. Nothing novel here relative to the standard definition — Jay's framing matches common usage.

### Rule 1 — Many rules → let Claude use judgment [05:37-06:42]

**Then:** at Claude Code's launch, Anthropic needed hard guarantees against worst-case behaviour (e.g. deleting files), so the system prompt carried "particularly strong guidance and rules that might not always be true." Concrete example: *default to writing no comments*, *never write multi-paragraph docstrings*.

**Now:** those rules are said to *limit* Fable 5 / Opus 5. The replacement is a single judgment-shaped instruction: **"write code that reads like the surrounding code, match its comment density, naming, and idiom"** [06:33-06:42]. Note what changed in kind, not just in length — the old rule specified an *output*, the new one specifies a *criterion* and delegates the output.

### Rule 2 — Examples → design interfaces [08:25-08:51]

**Then:** give Claude specific examples of how to use a tool. **Now:** examples "actually constrain them to a certain exploration space." Give an interface — a set of guidelines and constraints — and let the model explore inside it. This is the same delegation move as Rule 1 applied to demonstration rather than instruction: examples are implicitly prescriptive, and prescription is the thing that's now costing you.

### Rule 3 — All context up front → progressive disclosure [10:51-11:53]

**Progressive disclosure** = "loading the right context at the right times." **Then:** Claude Code's system prompt had to carry detailed code-review verification procedure — rarely needed, but crucial when needed, so it lived up front. **Now:** the models are competent at fetching what they need, so it can be deferred.

The user-facing form of this: **CLAUDE.md as a router, not a repository.** The prevailing advice was to make CLAUDE.md "a central repository of every known practice that you might run into"; the new advice is that it "becomes more powerful if you make it function as a router to your tree of files" [11:45-11:53].

### The sub-router pattern [11:53-13:48] *(discovery F — Jay's own implementation)*

Jay's concrete instantiation, and the most transferable part of the video. CLAUDE.md routes to per-domain routers, which route to files and skills:

```
CLAUDE.md  (thin router — "which department is this?")
  ├── content.md    → ideation skills, research/production markdown refs, video skills
  ├── community.md
  ├── product.md
  ├── personal.md
  └── business.md
```

Motivated by a 57,000-file workspace where stuffing CLAUDE.md is obviously untenable, but the pattern is generic — the claim is that you identify "the different departments of your life and of your work" and build a sub-index per department. This is Jay's extension, not Tariq's; the article (as reported) says "tree of files," and Jay supplies the two-level realisation.

### The token-cost corollary [14:09-15:03] *(Jay's own argument)*

CLAUDE.md is injected at the top of every session, so a thick one spends its token cost *per session*, before your first prompt does any work. A thin router therefore compounds: the more you use Claude, the larger the accumulated saving, and the later you hit usage limits. Jay presents this as his own view ("which in my view is a bit of a waste") — it is not attributed to the article.

### Rule 4 — Repetition → simple tool descriptions [15:03-16:24]

**Then:** repeat yourself, because the model would drift. **Now:** simpler tool descriptions; delete instructions duplicated between the system prompt and the tool descriptions. Anthropic's own example: they had tool references in the main system prompt *and* instructions in the tool descriptions — same content, two places — and deleted the tool-description copies.

### Context rot [15:16-15:49] *(discovery E)*

The historical failure mode that made repetition necessary: as a session accumulated context, models "were more likely to listen to instructions at the end of the context window, which are the most recent messages, than the ones at the start." Repetition was a workaround for recency dominance. The claim is that this has "actually changed" with Fable 5 / Opus 5 — **asserted, with no evidence, benchmark, or magnitude given.** Note that this is the load-bearing premise for Rule 4: if context rot is only partially reduced, deduplicating instructions is riskier than the rule implies.

### Rule 5 — Manual memory → automatic memory [16:24-17:11]

**Then:** users were encouraged to write to CLAUDE.md explicitly via the `#` hotkey. **Now:** Claude Code saves memories relevant to the work and to you automatically. **Jay's caveat, and it's a sensible one:** he does see automatic saves happen, but after a genuinely productive session he still explicitly asks Claude to remember — automatic memory optimises for what the model judges salient, which is not necessarily what you judge salient.

### Rule 6 — Simple specs → richer references [18:04-19:38]

**Then:** over-reliance on markdown for plans, specs, and artifacts, because markdown is simple and light. **Now:** newer models handle "increasingly more complicated references," so you aren't limited to markdown. Jay's preferred richer reference is **HTML artifacts** — his brandbook example carries colour palettes, fonts, and visual style that a markdown file structurally cannot convey.

### The dual-audience argument [19:20-19:38] *(discovery B — the load-bearing reasoning behind Rule 6)*

Why HTML rather than any other richer format: (1) the agent parses it fine, because "under the hood, this is all still just code and still just text"; (2) *you* can open it in a browser and see it. And (3), which Jay flags as equally important, so can third parties — references double as communication artifacts. This is the actual argument for Rule 6 and it's stronger than the rule's headline. Markdown is a compromise format optimised for a constraint (model capability) that no longer binds; HTML dominates it on both the machine and human axes simultaneously.

### `/doctor` [20:37-22:14]

Ships with recent Claude Code. Five things: (1) checks the install for broken or duplicate installs and file-path problems; (2) finds dead weight in skills and MCP servers; (3) trims CLAUDE.md to be thinner; (4) flags hooks that add per-turn latency; (5) reports findings and asks before applying fixes. Jay's run surfaced MCP servers to disable, superseded skills to archive, a leftover demo plugin, and a version lag.

## Key Takeaways

1. **Delete the rule lists you wrote for weaker models — replace prescriptions with criteria.** The paradigm example is `default to writing no comments` → `write code that reads like the surrounding code, match its comment density, naming, and idiom`. The second is *shorter* and *better* because it names the standard instead of the output.
   **How to apply:** Open your CLAUDE.md and mark every rule that specifies an output rather than a criterion. For each, ask: would a competent senior engineer, given the codebase, need to be told this? If no, delete it. If it exists because you got burned once, rewrite it as the judgment you actually wanted.

2. **Stop giving worked examples where an interface will do.** Examples constrain the exploration space — they read as "do it this way" even when you meant "here's one way."
   **How to apply:** Where you have a few-shot block in a skill or prompt, try replacing it with a constraint list plus a success criterion, and compare outputs on a real task. Keep examples only where the format is genuinely arbitrary and must be matched exactly.

3. **Convert CLAUDE.md from a repository into a router.** This is the highest-leverage of the six, because CLAUDE.md is the one context artifact that is unconditionally loaded.
   **How to apply:** Take your current CLAUDE.md and split it by *when the content is needed*, not by topic. Anything needed on every turn stays. Anything needed only in a particular kind of session moves to a domain file, with one line in CLAUDE.md pointing at it. If you have more than ~5 domains, add a middle layer of sub-routers as in Jay's `content.md`.

4. **Treat CLAUDE.md size as a recurring cost, not a one-time one.** Every session pays it before you type anything.
   **How to apply:** Measure it — `wc -c CLAUDE.md`, divide by ~4 for a rough token count, and multiply by your sessions-per-week. That number is your standing tax on the wiki's own operating contract, and it's the number that justifies the refactor.

5. **Deduplicate between system prompt and tool descriptions.** If an instruction appears in both places, delete one — Anthropic kept the system-prompt copy and deleted the tool-description copy.
   **How to apply:** Grep your skills and MCP tool definitions for phrases that also appear in CLAUDE.md. Delete the duplicate, run a real task, and confirm behaviour is unchanged before deleting the next one.

6. **Don't fully trust automatic memory for things you care about.** Jay's caveat is the practical one: automatic memory captures what the *model* thinks is worth keeping.
   **How to apply:** End substantive sessions with an explicit "remember X" or a session-review step. The `#` hotkey still works and is still the cheapest way to force a specific fact into CLAUDE.md.

7. **Upgrade your reference artifacts past markdown where markdown is losing information.** Design systems, dashboards, anything with colour, layout, or spatial relationships.
   **How to apply:** Next time you'd write a spec in markdown and it feels lossy, ask Claude for an HTML artifact instead. Keep markdown for CLAUDE.md and skill files — those are read by the agent as instructions, and the format is the point.

8. **Use HTML artifacts as a comprehension tool for yourself, not just as agent input** *(discovery A)*. Jay routinely asks Claude to render a concept as a visual explainer rather than reading a wall of terminal text — he did exactly this to understand the article the video is about.
   **How to apply:** When Claude produces a long analytical output you'd have to read carefully, follow up with "render this as a single-file HTML explainer." Costs tokens, saves attention. Worth it when your token budget is loose and your attention is tight.

9. **Run `/doctor` on an existing Claude Code setup, and consider a recurring cadence.**
   **How to apply:** `/doctor` in a session; review the report before applying. Monthly is a reasonable cadence for a setup that accumulates skills and MCP servers.

10. **Bookmark artificialanalysis.ai as your standing benchmark reference** *(discovery D)*. Jay's recommendation for "one benchmark that is a good reference every time new models drop"; backed by Nat Friedman (ex-GitHub CEO) and Andrew Ng (former head of Google Brain).
    **How to apply:** Check the intelligence index on each model release rather than reading vendor benchmark tables. Caveat: a single composite score out of 100 is a coarse instrument, and its provenance-by-investor is a weak endorsement — useful as a directional signal, not as evidence for a specific claim.

## Argument Structures

**The master argument — capability jump licenses scaffolding removal:**

- *Premise 1 (measured):* Opus 4, a year ago, scored ~31 on the Artificial Analysis intelligence index. Opus 5 / Fable 5 top the current board at ~60/100 [03:25-04:28].
- *Premise 2 (asserted, with one data point):* Anthropic removed >80% of Claude Code's system prompt for these models with no measurable loss on coding evals [03:04-03:25].
- *Inference:* The removed scaffolding was compensating for capability that now exists natively. Scaffolding that was load-bearing became inert — and worse, because it prescribes outputs the model can now choose better, it is *actively* constraining.
- *Conclusion:* six specific reversals, each of which removes a constraint the model no longer needs and now suffers under.

**Evidence quality — this is the part to be honest about.** The 80%-cut-with-no-eval-loss is the one concrete data point in the entire video, and it is reported secondhand from an article, without eval names, magnitudes, or a link. Everything else is asserted: that examples constrain exploration space, that context rot is substantially reduced, that thin routers outperform thick CLAUDE.md files. Jay adds no independent verification — his corroborations are of the form "I find this to be true in our own work" [08:51-08:54]. The Artificial Analysis numbers are real but do a lot of unearned work here: a composite intelligence score doubling does not directly entail that any *particular* prompt scaffold is now counterproductive. The rules are plausible and internally coherent; the argument for them is thin.

**The sub-argument worth keeping — Rule 6's dual-audience case [19:20-19:38]:**
- References must be parseable by the agent → HTML qualifies, it's text under the hood.
- References should be legible to you → HTML renders; markdown-with-a-colour-hex-list does not.
- References increasingly get shown to third parties → visual beats textual for that too.
- Therefore markdown's dominance was never about markdown being *good*, only about it being *safe* under a model-capability constraint. Remove the constraint and the format choice should be re-derived from the audience, not inherited.

This one stands on its own without needing the capability-jump premise, which is why it's the most robust of the six.

**The cost sub-argument [14:09-15:03]** is Jay's, not Tariq's, and is straightforwardly correct arithmetic: an unconditionally-injected file's token cost multiplies by session count. It doesn't need a capability jump to justify a thin CLAUDE.md — the cost argument alone does. Worth noting because it means Rule 3 survives even if you're sceptical of Premise 2.

## Notable Commands / Code Snippets

```
/doctor
```
Ships with recent Claude Code. Checks install health (broken/duplicate installs, path problems), finds dead weight in skills and MCP servers, trims CLAUDE.md, flags slow hooks, and reports before applying [20:37-22:14].

```
# <thing to remember>
```
The memory hotkey — writes to CLAUDE.md automatically. Still the manual escape hatch now that automatic memory exists [16:37-16:41].

**The Rule 1 before/after — the single most quotable artifact in the video** [06:11-06:42]:

*Before* (Claude Code system prompt, Opus 4 era):
```
Default to writing no comments.
Never write multi-paragraph docstrings.
```

*After* (Claude 5 era):
```
Write code that reads like the surrounding code.
Match its comment density, naming, and idiom.
```

Shorter, and it delegates the decision instead of making it. This is the whole thesis compressed into four lines.

## User Notes

This ingest deliberately captures **only the generic Claude Code lessons** — the six then→now rules as reported from Tariq's article. Excluded by user direction: Jay's ARMS framework, the `/robo` brandbook skill, the "surprise me" skill, `/calibrate` specifics, RoboNuggets community promotion, and the `/doctor-plus` lead magnet. Discovery (C), the `/doctor` scope caveat, was declined.

**Overlap with the Boris Cherny YC-interview ingest (2026-07-27).** That source, from a different Anthropic voice, independently reports the ~80% system-prompt cut and the judgment-over-rules shift. This video corroborates both and extends the picture with the other four rules, the progressive-disclosure/router framing, and the richer-references argument. Corroboration caveat: this is a *secondhand* account of a written article, so it is weaker evidence than the Cherny interview, which is firsthand. Where the two agree, treat the Cherny source as the citable one; where this source adds material (Rules 2, 3, 4, 6), treat it as reported-but-unverified pending a read of Tariq's original article.

**Open follow-up:** the primary source — Tariq's "The new rules of context engineering for Claude 5 models" — has not been ingested. Worth doing; every claim in this summary would gain a grade of confidence.

**Meta-note for this wiki:** Rules 3 and 4 point directly at this repo's own `CLAUDE.md`, which is thick, unconditionally loaded, and contains material needed only in specific session types (the full Contradiction Handling menu schema, the gist template, the self-documentation routing table). A router refactor is the obvious application of this ingest to the wiki itself.

## Related Topics

claude-code, context-engineering, best-practices, workflow, agents, progressive-disclosure, claude-md, system-prompts, memory, context-rot, benchmarks
