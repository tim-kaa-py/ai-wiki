# Ingest Notes

**Source:** [Stanford's Method Turns Claude Into a PHD Level Research Team](https://www.youtube.com/watch?v=Tj3018n5MVg)

## User Focus

- Everybody should have a proper research skill. Currently trying this one as suggested by Nate — first as-is, then deriving a variant targeted at **research around technical problems**.
- The core reason: **Claude's naive research is not very reliable because it doesn't challenge its own results.** A research skill worth using is one that challenges the research.
- Therefore the priority in this ingest: how the multi-perspective mechanism works, how the verification/challenge layer works, and the practical anatomy of the skill so it can be forked and re-targeted.

Focus points mapped to the transcript:

- **STORM's multi-perspective mechanism** — [00:41-01:14], [02:14-02:29]. Five role-played lenses (practitioner, academic, skeptic, economist, historian) run as parallel subagents. Pipeline: phase 0 scope → 5 lenses → contradiction map → synthesis → adversarial peer review → HTML output.
- **The verification / challenge layer** — [02:26-02:47]. Six additional agents verify facts after the lens pass. Every source ends labelled confirmed / corrected / demoted. Findings ranked by reliability with explicit "supported by" vs "challenged by" lens attribution. Pass 1 contained claims that were simply wrong; only V2 is trustworthy.
- **Self-critique of perspective coverage** — [02:51-03:11]. The report names its own assumptions and the missing sixth lens.
- **Practical anatomy, for forking** — [04:36-06:03]. Four chained prompts packaged into two files (`skill.md` + `report-template.html`). Nate ran the chain manually first, then had Claude package it.
- **How to adapt** — [10:39-11:12], [03:12-03:36]. Run on a topic you already know well, read critically, add lenses, inject your own context.

## Confirmed Discoveries

- **B.** [08:34-09:21] **Subagents vs agent teams.** The five lenses are subagents — they talk to the main session but *cannot talk to each other*. Agent teams can debate to consensus but are much more expensive. STORM buys most of the adversarial benefit within the cheaper subagent topology by doing cross-examination centrally in the contradiction-map prompt. This is the architectural ceiling inherited by anyone forking the skill: the challenge happens in a synthesis prompt over sealed outputs, not in live debate.
- **C.** [09:34-09:44] **Per-subagent model choice is a free tuning knob.** Nate ran all five lenses on Opus by preference but notes they can run on Haiku or Sonnet. Direct cost/quality lever — e.g. cheap models for evidence gathering, expensive ones for the verification pass.
- **D.** [00:00-00:09], [11:12-11:36] **The evidence base and Nate's own hedge.** The framing claim is peer-reviewed testing showing STORM produces articles "25% more organized than the next best method" — but that metric measures *organization*, not factual accuracy. The reliability gain actually comes from the verification layer, not from STORM's published benchmark. Nate closes by saying the transferable asset is the *theory* (more contradicting perspectives → more holistic research; borrow subject-matter expertise you lack; deliberately kill your own blind spots), not this specific skill.

<!-- Discoveries A (head-to-head vs native deep research) and E (runtime portability + reader-profile inference) were surfaced but declined by the user. -->
