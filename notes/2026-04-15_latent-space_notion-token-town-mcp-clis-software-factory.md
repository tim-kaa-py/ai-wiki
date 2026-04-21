# Ingest Notes

**Source:** [Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future](https://podcasts.apple.com/de/podcast/latent-space-the-ai-engineer-podcast/id1674008350?l=en-GB&i=1000761419695)

## Selected Sections

A, B, D, F, G

## Section List

A. ✓ [Early | 00:00–05:00] Why Custom Agents Took 3+ Years and the "Don't Swim Upstream" Principle
   Simon and Sarah trace the arc from their 2022 JS-based coding-agent attempt through pre-function-calling fine-tunes to the Sonnet 3.6/3.7 unlock. Core mental model: two skills — recognizing when you're fighting model limits vs. shaping infrastructure, and building toward capabilities before they fully arrive.

B. ✓ [Early | 05:00–12:00] The Software Factory, AGI-Pilled Projects, and "Everything Becomes a Coding Agent"
   Simon's thesis that coding agents are the kernel of AGI and every capability becomes one. Introduces the "software factory" concept: automated loops for developing, debugging, reviewing, merging, maintaining codebases with swarms of agents. Covers spec layer, self-verification loops, PR review flow.

C.   [Mid | 12:00–22:00] Org Design: Low-Ego Rebuilds, Prototypes-Over-Mocks, Agent Platform Velocity
   Skipped.

D. ✓ [Mid | 22:00–30:00] Evals as a Coding-Agent Problem: Notion's Last Exam, MBEs, Headroom Testing
   Three-tier eval stack (CI regression, launch report card, frontier "headroom" at 30% pass rate) and the Model Behavior Engineer role. Key shift: treating the eval system itself as an agent harness where agents download datasets, iterate on failures, and implement fixes.

E.   [Mid | 30:00–40:00] Composing Custom Agents: Manager Agents, Memory as Pages, System-of-Record Coordination
   Skipped.

F. ✓ [Mid | 40:00–48:00] MCP vs CLIs: Permission Models, Token Economics, When Each Wins
   Core debate of the episode. CLIs: progressive disclosure, self-bootstrapping. MCPs: strong permission model, deterministic, lightweight for narrow agents. Pricing angle — using an LLM to execute deterministic API calls is wasteful under usage-based pricing. Notion commits to both and chooses per-quality-need.

G. ✓ [Mid-Late | 48:00–58:00] Harness Archaeology: Five Rebuilds and "Give the Model What It Wants"
   Simon walks through each harness rebuild: JS coding agent → custom XML → Notion-flavored markdown → SQLite → progressive tool disclosure with 100+ tools. Direct patterns/anti-patterns catalog for agent harness design.

H.   [Late | 58:00–1:15:00] Pricing, Auto Mode, Model Portfolio, and Why Notion Doesn't Train Models
   Skipped.
