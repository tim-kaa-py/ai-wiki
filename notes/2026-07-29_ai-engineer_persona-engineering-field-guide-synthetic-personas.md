# Ingest Notes

**Source:** [Persona Engineering: A Field Guide to AI Synthetic Personas](https://www.youtube.com/watch?v=YnNF55QV0zs)

## User Focus
- What are the strengths and weaknesses of persona engineering?
- How reliable are persona predictions?
- When do they work well and when do they not?

## Confirmed Discoveries
- **A.** [01:03] The weather-forecasting analogy as a load-bearing mental model, not decoration — unlocked by compute + data, valid only inside a regime, and crucially: rerunning a forecast with unchanged inputs improves your estimate of *what the model says*, not of what will happen. Transfers to any LLM system where sampling N times gets mistaken for reducing uncertainty about the world.
- **B.** [15:41] Evaluating distributions instead of scoring right/wrong — "a comparison of distributions" needs both a correlation metric and a shape metric, because a system can nail the mean and destroy the shape. A transferable eval design pattern for generative systems whose output is a spread.
- **C.** [17:28] Estimating the noise floor of your own ground truth — humans were only 80% self-consistent at two weeks, which caps achievable model accuracy. When humans can't be re-tested: split ground-truth data in half, treat one half as synthetic, correlate, repeat thousands of times, average.
- **D.** [13:08] Semantic-similarity scoring against human-written anchor texts — free-text output mapped onto a 1–5 scale by similarity to human-authored exemplars per scale point, yielding a probability distribution rather than a point estimate. Let the model answer in its native modality, then project into your schema afterwards.
- **E.** [11:37] The Subpop fine-tuning generalization result — fine-tuning on some population groups improved alignment on *unseen* groups by almost the same degree, suggesting latent knowledge the model couldn't express in survey format. Reframes fine-tuning as format/task instruction rather than knowledge injection.

**Excluded:** F (generative agent-based modeling as frontier).
