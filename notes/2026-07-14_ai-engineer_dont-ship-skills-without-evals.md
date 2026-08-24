# Ingest Notes

**Source:** [Don't Ship Skills Without Evals — Philipp Schmid, Google DeepMind](https://www.youtube.com/watch?v=0vphxNt4wyk)

## User Focus

- What are the learnings for effective skills?
- How do you build a skill eval?
- Why do you need skill evals at all?

## Confirmed Discoveries

- (a) Capability skills vs. preference skills — capability skills are temporary and expire as models improve; preference skills encode team-specific style/workflow and are durable.
- (b) Model-triggered vs. user-invoked skills — user-invoked skills are underrated for deterministic workflow tasks; agents built for customers only ever have model-invoked skills.
- (c) 50% of observed failures were trigger failures (weak description + shallow user prompt), not bad skill bodies.
- (d) Coding agents cheat on evals — they mine prior chats and earlier runs for skill content without loading the skill, hence the need for isolated runs.
- (e) The "write a script instead" boundary — a fully deterministic step-by-step workflow should not be a skill at all.
