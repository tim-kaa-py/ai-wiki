---
title: "Regulated-Enterprise Agent Architecture"
type: "concept"
description: "Four interlocking primitives — immutable event log, adjacent object storage, human/agent equivalency, and the evals that fall out of them — that make a regulated-domain agent auditable and compliant by construction rather than by bolt-on"
pillar: "building"
tags: [agents, architecture, enterprise, best-practices, evaluation]
sources:
  - "summaries/2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents.md"
timestamp: "2026-09-09"
---

# Regulated-Enterprise Agent Architecture

An architecture for agents that have to survive a compliance review, not just an accuracy benchmark. Christopher Lovejoy (Anthropic forward-deployed engineer) and Saul Howard (VP Eng, Anterior) describe it from healthcare deployments, where the constraints bite hardest — but nothing in it is healthcare-specific, and the same shape appears in finance, defense and government. [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

The failure it exists to prevent is a scheduling one. The PoC succeeds — two engineers, four weeks, accuracy and latency inside target — and the victory meeting congratulates everyone. The productionization meeting happens the next day and asks entirely different questions: where is the audit trail, what is the data lifecycle, how does escalation work, what happens when the agent reads untrusted content, how do we know it still works next month, how does it reach our systems. None of those are features. They are properties of the foundations, and the PoC's foundations were poured to optimize a single unconstrained variable.

## The Organizing Idea: Decide What Must Be Easy

Howard's design heuristic is the load-bearing line of the whole talk, and it is what makes the four primitives below a coherent architecture rather than a checklist: **decide what you want to be easy in the system, then accept whatever becomes hard as the price.** [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

Applied here, the properties chosen to be easy are:

- Reconstructing exactly what happened, at any past point in time, with authorization attached.
- Revoking or withholding access to the sensitive payloads without breaking observability of the process.
- Substituting a human for an agent, or an agent for a human, at any step.
- Replaying a real production interaction with one variable changed.

Everything expensive in this design is downstream of those four choices, and the discipline is to write down what you are accepting as expensive *before* choosing a storage paradigm — not to discover it at the productionization meeting.

## Primitive 1: The Immutable Unified Event Log

An append-only, timestamped, **complete** and **unified** record of every event in the system, borrowed wholesale from finance's transaction-log pattern. Complete means the log is the source of truth for all system data, not a parallel record beside it. Unified means one log across all agents running concurrently, not one per agent. Every view of the data becomes an ephemeral computed projection of the log. [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

Auditability then *falls out* of the storage paradigm rather than being produced by logging discipline. The argument:

1. A compliance audit trail requires a complete record of every action, data access and authorization — not a sampled or best-effort one.
2. Any logging system layered beside the real data path can drift from it, because completeness depends on developers remembering to log.
3. An append-only unified event log makes the log *be* the data path.
4. Therefore completeness stops being a discipline problem and becomes structural: you cannot fail to reconstruct state at time T, because state at T is defined as the fold over events up to T.

### Audit Trail Means the SOC 2 / HITRUST / HIPAA Sense

This is where the engineering default misleads. An audit trail here is not a developer log in Datadog. It is a complete record of every action the agent took, every place it accessed data, and every authorization under which it acted — and the test the speakers offer is legal rather than operational: **if this agent's decision surfaced in a court of law, could you show a justifiable chain of evidence for why each action was taken?** Observability tooling answers "why is this slow." A compliance audit trail answers "who authorized this, on what data, and prove it."

### The Read/Write Asymmetry, Stated as a Conditional

Event sourcing makes writes trivial (drop an event) and reads expensive (replay to reconstruct a view). Caching and snapshots mitigate the cost but never eliminate it. The standard objection is that this is a bad trade for read-heavy systems, and that objection is sound in general.

Howard's counter is explicitly domain-specific and should be preserved as such: in healthcare, later events change how earlier ones should be *interpreted*, so a materialized read model would be wrong rather than merely stale. Since the domain needs several after-the-fact interpretations of the same raw record anyway, ephemeral projections are what it wanted regardless. **This is a conditional defence, not a general endorsement of event sourcing.** The test to run before borrowing it: does your domain reinterpret its own history? If it does, the read penalty buys you something. If it does not, price it honestly as a pure cost.

## Primitive 2: Schema-Driven Object Storage, Adjacent to Orchestration

Immutable blob storage for the payloads themselves, sitting *adjacent to* rather than inside the orchestration layer. Events carry only references; the blobs carry the sensitive data (PHI, in Anterior's case). Because the storage is schema-driven, an engineer can see the **shape** of a record without being granted its **contents**. [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

The separation being drawn is between *what happened* and *what was used*, and it is what makes debug access and data access separately grantable. A developer can retrace an agent's every step with full observability while holding no access to the protected data at all — which is the practical difference between an on-call engineer who can work an incident and one who has to escalate to someone with a compliance clearance.

The enforcement model is **zero trust at point of use**: agents bear tokens and fetch data at the moment they need it, rather than data flowing freely around the system, and the object storage is the enforcement point.

### Prompt Injection as a Decidable Property

Howard's reframe of the lethal trifecta: instead of asking how to detect or filter injected instructions, ask whether an agent at point A that holds this data *can* also reach that data — and make the answer structurally no. Given token-bearing agents and storage segregated from the event stream, the question is decidable from the architecture rather than answered probabilistically by a classifier. Where the answer is no, the trifecta cannot close inside the process.

This position is in open tension with the upstream-filtering approach on [Context Filter](context-filter.md); see the Unresolved Tensions section there. It is recorded on both pages, unmerged.

### The On-Prem Constraint

Some regulated customers will never let data leave their VPC. Anterior has run deployments where the vendor operates with only tangential access to customer data — the agent runs against data the vendor never receives. Treat "the data never comes to us" as a day-one architectural assumption in regulated sales: it rules out most SaaS-shaped designs, and it is cheap to design for up front and near-impossible to retrofit. [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

## Primitive 3: Human/Agent Equivalency

A deliberately wider definition of "agent" that covers both LLMs and humans, enforced at the platform level: **any action an LLM can take, a human can also take**, and downstream steps do not care which one performed an upstream action. Context is a shared definition with methods that render it either agent-friendly (a prompt) or human-friendly (a UI). [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

This exists because escalation is unpredictable. The handoff may be triggered by the model self-reporting uncertainty or by a business rule firing — a treatment above a cost threshold, say — and the point at which it happens cannot be enumerated in advance. Building named handoff paths for anticipated cases produces a system that is wrong at exactly the moments that matter. Defining the action interface once for both actor types makes every step a potential handoff point without special-casing any of them.

## Primitive 4: Evals as an Emergent Property

Evals here are not a subsystem bolted alongside the agent; they are what the other three primitives produce for free. Three well-known eval difficulties, each answered by one primitive: [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

| Difficulty | Primitive that answers it | Mechanism |
|------------|---------------------------|-----------|
| Non-determinism makes causal attribution hard | Immutable event log | Replay from an exact prior state, change exactly one variable (prompt, model, code), attribute the delta |
| Offline datasets are unrepresentative and drift | Object storage | Run evals against production data *in situ*, inside the customer's environment, returning only scores |
| Ground truth is expensive | Human/agent equivalency | The human performing the same task **is** the reference; the human-agent difference is the score |

The consequence worth naming: because evals are a property of the system rather than an attachment to it, they cannot rot separately from it. An offline suite drifts away from production quietly; a replay-plus-delta eval is running on the same data path the agent is. Before building an offline eval set for a regulated deployment, check whether replay plus the human-vs-agent delta already gives a better-grounded signal on real traffic.

## The Failure Mode: Bolting Compliance onto PoC Foundations

The PoC optimizes one variable — accuracy — under no constraints. Each requirement discovered afterwards (auditability, zero trust, escalation, evals) is not a feature but a property of the foundations: it constrains how data is stored and how actions are recorded. Adding a property of the foundations after the foundations are poured means shimming it in per use case, which produces something brittle and impossible to generalize across customers.

The working path inverts the order: **build down from the production constraints, then back up to the PoC's accuracy.** That costs PoC velocity, and it produces primitives on which accuracy can be rebuilt once and reused across deployments rather than re-shimmed per customer. A cheap version of the same discipline for teams unwilling to pay it in full: run the productionization meeting's six questions as a design review on day one of the PoC rather than in week five.

None of the underlying patterns are new. Transaction logs come from finance, zero trust from big tech and defense. What agents require is recombining them, sometimes radically — so when an agent requirement looks novel, the first question is which regulated industry has been solving its non-AI equivalent for decades. [Source: 2026-08-19_ai-engineer_why-your-enterprise-tech-stack-isnt-ready-for-ai-agents]

## Related Pages

- [Agent Evaluation](agent-evaluation.md) — the general eval toolkit; this page's replay-and-delta approach is what falls out when the storage layer is designed for it
- [Agent Loops](agent-loops.md) — the loop primitive that the event log records and replays
- [Agent Platform Tiers](agent-platform-tiers.md) — where a compliance-heavy deployment lands on the build-to-buy spectrum, and why the VPC constraint is a day-one tier decision
- [Context Filter](context-filter.md) — the upstream-filtering answer to prompt injection, held here in open tension with the architectural answer (see its Unresolved Tensions section)
- [AI-Native SDLC](ai-native-sdlc.md) — the development-side audit trail (the commit chain of who asked, what the agent produced, who approved), distinct from the runtime audit trail on this page
