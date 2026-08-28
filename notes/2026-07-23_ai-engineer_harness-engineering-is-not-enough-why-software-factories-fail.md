# Ingest Notes

**Source:** [Harness Engineering is not Enough: Why Software Factories Fail — Dex Horthy, HumanLayer](https://www.youtube.com/watch?v=Ib5GBkD555M)

## User Focus

- What is the fundamental problem in model training? (RL on binary test-pass rewards cannot penalise maintainability erosion; cost of bad architecture is measured in months/years) — [02:48-03:00], [09:23-14:47]
- What is the problem in the "lights out" software factory? (stop reading code → agent eventually can't solve an issue → you dig into 3-month-old slop while the site is down) — [06:56-09:22]
- What do they propose as the most efficient way of software engineering with AI right now? (turn the lights back on; AI-assisted up-front planning: product review → system architecture → program design → vertical slices; still read every line) — [14:48-17:49]

## Confirmed Discoveries

- A. [01:22-02:07] Faros AI report: since AI-tool adoption, PR review quality down, more/longer review comments, PRs merged unreviewed, incidents up, bugs per developer up. First empirical counter-datapoint in the wiki.
- B. [10:08-11:05] Why Claude Code won: first model RL-trained against the harness it ships in; harness builders who don't own weights are permanently disadvantaged (cites OpenAI talk). Tension with `wiki/concepts/meta-harness.md` / `harness-engineering.md` ("harness is the reusable asset; weights are swap-in").
- C. [13:39-14:47] Next-gen maintainability benchmarks — Sweep Marathon (Abundant AI), Deep Sweep (Data Curve), Frontier Code (Cognition) — and the LLM-as-judge ceiling: "if the model knew what good code looks like, it would probably write it in the first place."
- D. [16:50-17:49] "You don't have too many PRs — you have too many bad PRs": review bottleneck is a quality problem, not throughput; 20% rework is an emotional and intellectual burden on reviewer and submitter.
- E. [07:25-08:16] Brownfield redefined: agents start to struggle after 3-6 months of agent-written code, not 10 years. (Osmani quote itself not needed as a separate point.)
- Not included: F (factory genealogy) — but mention the 1968 NATO origin of "software factory" as a parenthetical in the factory section.
