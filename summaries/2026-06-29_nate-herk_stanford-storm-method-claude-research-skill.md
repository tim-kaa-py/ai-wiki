---
title: "Stanford's Method Turns Claude Into a PHD Level Research Team"
type: "summary"
description: "Nate Herk packages Stanford's STORM multi-perspective research method into a Claude skill that runs five expert lenses in parallel, maps their contradictions, and verifies every citation before delivering."
channel: "Nate Herk | AI Automation"
date: "2026-06-29"
resource: "https://www.youtube.com/watch?v=Tj3018n5MVg"
pillar: "building"
tags: [claude-code, agents, research, workflow, multi-agent, verification]
timestamp: "2026-07-25"
source_file: "sources/youtube/2026-06-29_nate-herk_stanford-storm-method-claude-research-skill.md"
---

# Stanford's Method Turns Claude Into a PHD Level Research Team — Summary

**Source:** Nate Herk | AI Automation | 2026-06-29 | [Link](https://www.youtube.com/watch?v=Tj3018n5MVg) | 12:05

## TL;DR

Nate Herk packages Stanford's STORM method into a two-file Claude skill that answers the exact complaint that makes naive Claude research untrustworthy: a single prompt produces a single angle, and nothing ever challenges the result. STORM replaces that with five role-played expert lenses running as parallel subagents, a contradiction-map pass that makes them cross-examine each other's evidence, and a verification pass of ~6 more agents that re-checks every citation against its primary source and labels it **confirmed / corrected / demoted** — Nate is explicit that pass 1 contained claims "that just wasn't correct" and only V2 is trustworthy. The real deliverable for a forker is the four-prompt chain and the challenge topology, not the specific five personas; Nate says so himself, and his headline "25% more organized" benchmark measures organization, not accuracy.

## Video Structure

1. **[00:00-00:41] The artifact first** — Shows the finished V2 HTML briefing: five perspectives, per-section analysis, and a source ledger at the bottom marking each source confirmed, corrected, or demoted.
2. **[00:41-01:27] Why multi-perspective** — One prompt = one angle = blind spots. Names the five lenses and connects the idea to his earlier "roast skill" / council-of-agents work.
3. **[01:27-03:36] What the output actually contains** — 60-second summary, key findings ranked by reliability with "supported by" / "challenged by" lens attribution, stated assumptions, and a self-identified *missing sixth lens*. Ends on tailoring the skill to your own business context. *(Includes a head-to-head against Claude Code's native deep research — out of scope for this summary.)*
4. **[03:36-06:03] The anatomy** — The four chained prompts, how Nate ran them manually before packaging, the `skill.md` + `report-template.html` two-file layout, and the skill's own self-description.
5. **[06:03-07:26] Install and phases** — Drop the two files in `.claude/`, then phase 0 scope → five lenses in parallel → contradiction map → synthesis → adversarial peer review + verification.
6. **[07:26-08:34] Live run** — "Run a storm research for me on voice AI agents"; invoked without a slash command; individual subagent prompts visible in the desktop app.
7. **[08:34-09:44] Architecture asides** — Subagents vs agent teams; per-subagent model choice (all five ran on Opus 4.8).
8. **[09:44-10:39] Verification and the V2 report** — Contradiction pass, citation verification, final browser view of the source ledger.
9. **[10:39-12:05] How to adapt, and the real takeaway** — Run it on a topic you already know, add lenses, and take the *theory* rather than the skill.

## Key Concepts

### STORM

Stanford's research method, framed by Nate as: instead of one prompt and one angle of research, deliberately run several angles, because "each angle finds a hole that the other angles miss." Note the divergence worth flagging: STORM in the literature is a pipeline for generating Wikipedia-like articles via perspective-guided question asking; Nate's skill is a re-implementation of the *principles* in a Claude-agent topology, not a port of the original system. He does not claim otherwise, but the video's framing ("Stanford has a research method... so I put all of those storm principles into my own Claude skill") makes this easy to conflate.

### The five expert lenses

**Practitioner, Academic, Skeptic, Economist, Historian.** Each is a subagent given a persona, a background, and an area of expertise, and each researches the topic independently — the live run shows them browsing the web with their own tools. The personas are load-bearing: the skeptic exists specifically to attack, and the report tracks which lens *supported* and which *challenged* each finding.

### The contradiction map

Prompt two of the chain. Explicitly: "where do the perspectives contradict each other? Which one has good evidence? Which one has weak evidence?" It makes the lenses analyze each other's outputs. This is where the adversarial work actually happens — see Argument Structures for why the topology forces it into a synthesis prompt rather than a live debate.

### Adversarial peer review + citation verification

The final phase. Roughly six additional agents re-check the facts the lens pass produced, verifying "every citation against its primary source before delivering." Output labels per source: **confirmed**, **corrected**, or **demoted**. Key findings carry a reliability score (e.g. "reliability high, nine out of 10") plus lens attribution. The deliverable is versioned — V1 is the unverified draft, V2 the verified one.

### The missing sixth lens

The report critiques its own perspective coverage. In Nate's example: "All five lenses look at the firm from the owner's chair — adoption rates, productivity, ROI. None of them sat in the seat of the customer or the frontline employee." You then ask for a V3 with that lens added. This is coverage self-awareness, distinct from fact verification — the skill checks *whose viewpoint is absent*, not just *whether the numbers are right*.

### Subagents vs agent teams

Subagents: one main session, N workers. The main session talks to all five; **the five cannot talk to each other**. Agent teams: agents can talk to the main session *and* to each other — they "literally argue with each other until they reach some sort of consensus." Agent teams are much more expensive. STORM lives entirely in the cheaper subagent topology.

### Skills as master prompts

Nate's deflationary definition: "if you guys don't know what a skill is, it's basically just a prompt. This is basically just a master prompt." Useful framing for forking — there is nothing to reverse-engineer beyond the text.

## Key Takeaways

1. **A research method is only trustworthy if something challenges the research.** STORM's entire value proposition is that a single prompt has "a bunch of blind spots in that research plan." The five lenses generate disagreement on purpose; the contradiction map surfaces it; verification adjudicates it.
   **How to apply:** When forking this for technical-problem research, keep the three-stage shape — independent generation → explicit contradiction surfacing → source-level verification — and swap only the personas.

2. **Trust the V2, never the V1.** Nate states flatly that on the first pass "the briefing would have had information in here that just wasn't correct." The verification layer is not polish; it is the thing that makes the output usable.
   **How to apply:** Never consume a report from a fork of this skill that hasn't run the verification phase. If you cut a phase for speed, cut the historian, not the verifier.

3. **Findings should carry provenance and dissent, not just a number.** Each key finding is ranked by reliability *and* annotated with which lenses supported and which challenged it.
   **How to apply:** In a technical variant, mirror this: "reliability 7/10 — supported by the runtime-internals lens and the maintainer lens, challenged by the production-ops lens" is far more actionable than a bare confidence score.

4. **The skill can carry your standing context so every run is tailored.** "You can go into the skill and say, here's what I'm doing, here's my business, here's what our goals are... every time you run a Storm research report, make it tailored towards us."
   **How to apply:** For the technical variant, bake in your stack, constraints, and what "actionable" means for you — otherwise you get a brain dump of stats instead of a decision.

5. **Add or swap lenses to fit the domain.** Nate suggests he'd add "a beginner in AI" or "a content creator" for his own audience.
   **How to apply:** For technical-problem research, the five general lenses are the wrong cast. Candidate replacements: the person who maintains this library, the person who has to operate it at 3am, the person who benchmarked it, the person who migrated off it, and a skeptic who assumes the docs are lying.

6. **Test the fork on a topic you already know cold.** "Do it on a topic that you do know a lot about and that's important to you in your business. And then just read through it and see where you need to improve it."
   **How to apply:** This is the only cheap way to detect confident-but-wrong output from a research pipeline. Run the fork against a problem you've already solved and diff the report against what you know.

7. **Per-subagent model choice is a free cost/quality knob.** All five lenses ran on Opus 4.8 by Nate's preference, but "you can have all of these sub-agents run on Haiku or Sonnet if you like."
   **How to apply:** Cheap models for the evidence-gathering lenses, expensive ones for the contradiction map and the verification pass — the stages where reasoning quality actually determines whether a wrong claim survives.

8. **A fixed persona count is a rate-limit and cost feature, not just a design choice.** "With the storm, you know it's always going to be your five personas" — roughly 12 agents total for the full run.
   **How to apply:** Bounded fan-out is predictable. If you expand the lens roster, expand the verification budget with it.

9. **The theory is the transferable asset, not the skill.** Nate's closing: "it's also less about this specific skill and this specific Stanford method being the best for everybody... if you don't have subject matter expertise, see if you can borrow it in some way. See if you can go ahead and kill your own blind spots."
   **How to apply:** Treat `skill.md` as a worked example of the pattern. The pattern — borrow expertise you lack as personas, force them into contradiction, then verify — is what ports to any domain.

## Argument Structures

**Why multi-perspective beats single-pass:**
- Premise: a single prompt encodes a single research plan.
- Premise: any single research plan has blind spots — questions it doesn't think to ask.
- Premise: personas with different expertise ask structurally different questions, so "each angle finds a hole that the other angles miss."
- Conclusion: N lenses produce strictly better coverage than one pass, *provided* their disagreements are surfaced rather than averaged away.
- The proviso is the load-bearing part: five parallel reports are worthless if you just concatenate them. That's why prompt two exists — the contradiction map is what converts diversity into signal.

**Why verification is a separate phase and not an instruction:**
- Premise: the lens agents are optimizing for finding evidence for their angle, not for auditing it.
- Premise: agents fabricate or misattribute citations, and Nate's own V1 contained claims that were wrong.
- Conclusion: the check must be performed by agents that did *not* produce the claim, against primary sources, in a distinct pass — hence "adversarially peer reviews its own outputs, and verifies every citation against its primary source before delivering," with a confirmed/corrected/demoted verdict per source. Self-verification inside the generating agent would inherit the generator's motivated reasoning.

**Why the subagent topology sets the ceiling (discovery B):**
- Fact: subagents can talk to the main session but not to each other. Agent teams can, and can debate to consensus — but are "much more expensive."
- Consequence: STORM cannot run a live debate. It gets most of the adversarial benefit anyway by doing cross-examination *centrally*, in the contradiction-map prompt, over sealed lens outputs.
- Implication for a forker: the challenge is a one-shot synthesis over frozen positions, not an iterative argument. No lens ever gets to respond to being contradicted. If a technical variant needs genuine back-and-forth — e.g. a proposed fix that must survive rebuttal and revision — that requires the agent-team topology and the accompanying cost, or a manual second STORM round seeded with the contradiction map.

**The evidence-base gap (discovery D) — read this critically:**
- The headline claim: peer-reviewed testing shows STORM produces articles "25% more organized than the next best method."
- What that metric measures: **organization**. Structure, coverage, coherence of the write-up.
- What it does not measure: **factual accuracy**. Nothing in "25% more organized" says the claims are true.
- Meanwhile, the reliability improvement Nate actually demonstrates in the video comes from the verification layer — the confirmed/corrected/demoted pass — which is *his* addition to the pipeline, not what the cited benchmark evaluated.
- So the video's title-level promise ("PhD-level research team", peer-reviewed backing) and the mechanism doing the work (adversarial verification against primary sources) are not the same thing, and the benchmark does not underwrite the accuracy claim.
- To Nate's credit, he hedges in the closing minute: the skill isn't necessarily "the best for everybody," and the transferable asset is the theory. That hedge is doing more work than the benchmark.
- Practical consequence: do not adopt this skill *because* of the 25% figure. Adopt it because the verification stage is a real mechanism that catches real errors, and evaluate a fork on whether its verification stage actually catches errors in your domain.

## Notable Commands / Code Snippets

**Two-file skill anatomy** — this is the whole artifact:

```
.claude/skills/storm-research/
├── skill.md              # the master prompt: phases, lens definitions, chain
└── report-template.html  # referenced by skill.md for output consistency
```

`report-template.html` exists purely so "every time I run this you're going to give me an HTML report that always looks like this." Nate calls out that stable output shape as a deliberate feature.

**Install:** hand both files to Claude and say — "this is a skill called storm research. Put this in the `.claude` folder." That's it.

**The skill's self-description** (read verbatim from `skill.md` in the video) — the tightest available spec of the pipeline:

> "Storm research turns one topic into a verified multi-perspective HTML briefing. It simulates five expert lenses on the topic, maps where they contradict each other, synthesizes everything into a single self-contained HTML report, then adversarially peer reviews its own outputs, and verifies every citation against its primary source before delivering."

**The four-prompt chain** (Nate ran this by hand first, then had Claude package it into the skill — a reproducible way to build your own):

```
Phase 0  scope         — ask clarifying questions if the topic is underspecified
Prompt 1 five lenses   — spin up practitioner / academic / skeptic / economist /
                         historian in parallel as subagents on the research topic
Prompt 2 contradiction — "where do the perspectives contradict each other?
         map             which one has good evidence? which has weak evidence?"
                         forces the lenses to analyze each other's outputs
Prompt 3 synthesis     — merge into the HTML report per report-template.html
Prompt 4 peer review   — ~6 verification agents; check every citation against its
         + verification   primary source; label confirmed / corrected / demoted;
                          rank findings by reliability with supported-by /
                          challenged-by lens attribution → V2
```

**Invocation** — no slash command needed; natural language triggers the skill:

```
Hey Claude, please run a storm research for me on voice AI agents.
```

**Follow-up after reading the self-critique:**

```
Spin up that sixth lens and run a V3 of this HTML report.
```

## User Notes

- Everyone should have a proper research skill. Running this one as-is first, then deriving a variant targeted at **technical-problem research**.
- The reason it matters: **Claude's naive research is unreliable because it doesn't challenge its own results.** A research skill worth using is one that attacks its own findings. STORM's contradiction map plus the confirmed/corrected/demoted verification pass is exactly that missing layer — the rest of the pipeline is scaffolding around it.
- For the technical fork, the two things to carry over verbatim are the **four-prompt chain** and the **two-file layout** (`skill.md` + a template for stable output shape). The five personas are the part to replace.
- Architectural ceiling to design around: the lenses are subagents and cannot talk to each other. All adversarial work happens once, centrally, over frozen outputs. Good enough for research; insufficient if a proposed technical fix needs to survive iterative rebuttal.
- Do not take "25% more organized" as evidence of accuracy. It measures organization. The accuracy comes from the verification layer, and that has to be validated per domain — which is exactly what Nate's "test it on a topic you already know well" advice is for.

## Related Topics

claude-code, agents, research, workflow, multi-agent, verification
