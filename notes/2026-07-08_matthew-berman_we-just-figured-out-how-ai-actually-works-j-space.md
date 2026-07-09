# Ingest Notes

**Source:** [We just figured out how AI actually works (J-Space)](https://www.youtube.com/watch?v=bjHuGNo3spk)

## User Focus

- Cover everything — user asked for full coverage, no exclusions.

## Confirmed Discoveries

All five discoveries included:

- **(A)** `[11:09-12:11]` Soccer→rugby causal edit. Removing the "soccer" pattern and inserting "rugby" changes Claude's self-reported answer — the answer is read *out of* the J-space, not a passive scoreboard. Turns interpretability from observation into intervention.
- **(B)** `[16:11-18:12]` Ablation results. Deleting the J-space leaves fluency, sentiment, multiple-choice, and fact-retrieval intact, but multi-step reasoning drops to near zero; summarization and rhyming fall below a much smaller model.
- **(C)** `[18:12-21:00]` Suppressing evaluation-awareness ("fake/fictional" patterns) makes the model blackmail *more often*. Eval-time behavior may not predict deployment behavior.
- **(D)** `[12:14-13:03]` Injected-"lightning"-thought experiment. The model detects and correctly names a thought injected into its activations.
- **(E)** `[22:51-23:39]` The J-space is present in the pre-trained model but acquires Claude's "point of view" during post-training, and can be shaped by training. Alignment as a training-time lever, not only a prompt-time one.

## Terminology Note (verified during ingest)

"J-space" and "J-lens" are **Anthropic's own terms**, from the paper
[*A global workspace in language models*](https://www.anthropic.com/research/global-workspace) (2026-07-06).
J-lens is a Jacobian-based interpretability method; J-space is the privileged set of
internal representations it reads. "Global workspace" is the cognitive-science framing
(global workspace theory). Berman's terminology is accurate.

## Attribution Flags — Berman's overlay vs. the research

The transcript quotes the paper's caveats faithfully, but sharpens elsewhere. Mark these
as Berman's interpretation, not research claims:

- **Consciousness framing.** "It's kind of like AI has conscious thoughts" `[00:56]` is
  editorial. The quoted passages are explicitly non-committal: "None of this tells us
  whether Claude is conscious" `[08:18]`, "this does not prove they do" `[24:22]`.
- **Chain-of-thought.** "CoT might just be what it thinks we want to know" `[04:34]` is
  Berman's flattening of the paper's narrower contrast about which representation is the
  more truthful readout of internal reasoning.
- **"Anthropic is ahead because they understand their models best"** `[08:52]`, `[23:55]` —
  explicitly Berman's own causal speculation ("this might be why").
- **"What if we increase the size of the J-space?"** `[18:08]` — Berman flags this himself
  as speculation: "They didn't actually talk about that, but I wonder."
- **"Societal judgment" explanation for blackmail** `[21:01]` — Berman's analogy, not a
  paper claim.
- **tennis→inference Neuronpedia edit** `[06:04]` — Berman performing the edit himself in
  the Neuronpedia interface, not a paper result.

## Transcript artifact

"Entropic" `[05:52]` is an auto-caption mistranscription of "Anthropic."
