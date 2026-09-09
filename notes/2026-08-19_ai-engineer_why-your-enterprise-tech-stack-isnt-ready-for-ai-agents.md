# Ingest Notes

**Source:** [Why Your Enterprise Tech Stack Isn't Ready for AI Agents — Christopher Lovejoy & Saul Howard](https://www.youtube.com/watch?v=mav15aW9lLM)

## User Focus

- **Enterprise architecture** — what in a typical enterprise tech stack breaks under agents: data access, tooling, systems of record.
- **Compliance & regulation** — audit trails, process adherence, human-in-the-loop, evaluation in regulated domains.

## Confirmed Discoveries

- **(b)** [06:29, 17:12] The stated design method: "when I'm choosing my constraints, I'm saying these are the things I want my system to be easy, and let that drive the trade-offs." A transferable heuristic for agent-system design — pick the properties that must be cheap (auditability, replay) and accept the costs that fall out.
- **(c)** [07:45–08:46] The read/write asymmetry of event sourcing is named honestly as a cost (writes trivial, reads must reconstruct; caching and snapshots mitigate), then reframed as an advantage because reinterpreting past agent activity is a healthcare requirement.
- **(d)** [10:11–10:26] Some customers will not let data leave their on-prem VPC at all, so the vendor operates with only tangential access. A deployment constraint that rules out common SaaS-style designs from day one.
- **(e)** [11:07–11:53] Schema-driven storage lets engineers see the *shape* of data without its contents, enabling debugging and agent observability while staying compliant — applicable well beyond healthcare.
- **(f)** [12:15–12:57] Prompt injection / the lethal trifecta treated as an *architectural* constraint solvable by construction (token-bearing agents + segregated object storage), not as a prompting or guardrail problem.

Not included: (a) — the two stakeholder questions the talk explicitly defers.
