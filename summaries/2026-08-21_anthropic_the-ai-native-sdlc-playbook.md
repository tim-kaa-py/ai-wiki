---
title: "The AI-Native SDLC playbook"
type: "summary"
description: "Anthropic's Applied AI team argues that once build collapses to hours the bottleneck moves to plan, review and deploy, and lays out a six-stage playbook where every stage commits a markdown or code artifact, advisory skills are backed by deterministic hooks, the agent's own configuration is regression-tested by evals, and deterministic control bands close the loop back into intent.md."
channel: "Anthropic (Louis Claxton, Applied AI)"
date: "2026-08-21"
resource: "https://claude.com/blog/the-ai-native-sdlc-playbook"
pillar: "building"
tags: [sdlc, claude-code, workflow, governance, hooks, agent-skills, evaluation, enterprise, best-practices]
timestamp: "2026-09-15"
source_file: "sources/articles/2026-08-21_anthropic_the-ai-native-sdlc-playbook.md"
---

# The AI-Native SDLC playbook — Summary

**Source:** Anthropic (Louis Claxton, Applied AI) | 2026-08-21 | [Link](https://claude.com/blog/the-ai-native-sdlc-playbook) | ~5k-word playbook article

## TL;DR

The premise is simple and mostly right: agents made code cheap, so the expensive parts of the SDLC are now the human-speed stages on either side of Build (plan, review/test, deploy) and the controls that assume a human wrote every line. The playbook's answer is an **artifact chain** (intent.md → spec.md → plan.md → diff + tests → PR with findings → incident record), where each accepted commit triggers the next stage and the commit history doubles as the audit trail. Its best material is the governance layering: skills are explicitly called *advisory*, hooks and managed settings are the deterministic layer behind them, evals regression-test the agent's configuration itself, and production detection stays model-free (σ-tier control bands) with Claude only invoked after a breach. Read it as a vendor playbook: prescriptive rather than measured, with product placement for Claude Tag, Claude Security, Code Review and Claude Design, several of which are beta or research preview.

## Key Concepts

### AI-native SDLC as a loop

The six traditional stages (Plan, Design, Build, Test, Deploy, Maintain) stay, but become non-linear and connected by automated handover. The "old control objectives" are kept; what changes is *enforcement*: governance is applied as the agent acts rather than in weekly committees. The article treats "agentic SDLC", "AI SDLC" and "agentic software development" as synonyms.

### Artifact chain

Every stage ends by committing one artifact that the next stage reads:

| Stage | Artifact | Trigger for next stage |
|-------|----------|------------------------|
| Plan | `intent.md` | Product owner accepts (merge) → design pass |
| Design | `spec.md` | Spec approved → plan mode |
| Build | `plan.md`, then diff + tests | Plan accepted → implementation |
| Test / Deploy | PR with review findings | Merge → pipeline |
| Maintain | Incident record / new `intent.md` | Control-band breach → new intent |

Early stages use markdown because a product owner and an agent can both read and act on the same file; from Build on, the artifact is code and its records. "The chain of commits is also the audit trail: who asked for what, what the agent produced, and who approved it." Maturity path: prompt each step by hand first, end state is a loop where each accepted artifact fires the next gate.

### intent.md

A **proto-spec in the originator's own words**: problem, proposed outcome, affected users and systems, constraints, open questions. Produced by brainstorming with Claude (claude.ai or Cowork for non-engineers), corrected by the originator, committed to an `intent/` folder in the product repo (a dedicated intent repo only when intent spans many repos). A GitHub connector lets non-git users commit. Note: this is a *playbook convention*, not a Claude Code feature. Three entry routes: a person's idea, a ticket, or an agent diagnosis from Stage 6.

### Advisory vs. deterministic control

The article's cleanest distinction. A **skill** "is a control, though an advisory one. It makes Claude likely to apply the policy while the code is written, and nothing forces a session to comply with it." A **hook** is "the deterministic layer behind it": "The skill makes violations rare and the hook makes them close to impossible." Hooks can allow, **ask** (pause for a named human) or block. **Managed settings** are the org-level, non-overridable layer (permissions, sandbox, managed-only hooks/MCP/plugins, minimum version).

### Production gate

"The agent may act up to the production gate and cannot pass it." Enforced by three things together: branch protection (agent writes only arrive as PRs), a production-deploy hook requiring a named release authorization, and per-environment permission tiers (dev: deploy freely; staging: in between; prod: agent prepares, release manager authorizes). Non-interactive runs act under the agent's own identity so logs separate agent from triggering engineer.

### Feedback loop vs. verifier subagent

Two different things that are easy to conflate. The **feedback loop** (tests, build, screenshot diff) runs *throughout* the task, as many times as needed. The **verifier subagent** is one way to package the *final* check: a fresh context window run once the session believes it is done, "so the verdict is not colored by the assumptions that produced the code." The verifier is instructed to report only, never fix.

### Continuous evals on agent configuration

Evals are "the AI-native equivalent of stage-gate QA", but aimed at the **agent's configuration**, not the product: a 20–50 task suite from real recent work that runs non-interactively in CI on a schedule *and* on any change to `CLAUDE.md`, skills or hooks. Configuration changes that drop the pass rate are gated. Every production incident and every fixed vulnerability class adds a permanent eval. The suite is "live": as models improve, cases stop discriminating and must be replaced.

### Control bands and σ tiers

Deterministic detection over a metric with a stable rolling baseline (CI failure rate, post-deploy 5xx, PR cycle time): mean + standard deviation over a rolling window, Western Electric–style rules to catch drift as well as spikes. Version-controlled, unit-tested, **no model involved**. Tiers in `bands.yaml`: 1σ log; 2σ invoke Claude read-only to diagnose; 3σ Claude may *propose* (open a PR into the review gate or trigger a pre-approved runbook such as rollback). The diagnosis is written as `intent.md` and re-enters the pipeline.

### Source of truth (legacy systems)

For every artifact, name exactly one authoritative system. Three configurations, choosable per artifact: **repo as source of truth** (markdown authoritative, legacy references commits; cleanest for engineering-led orgs), **legacy system as source of truth** (Jira/ServiceNow authoritative; Claude reads the record at session start and writes back over MCP in the same session), or **linkage as the minimum bar** (artifacts carry record IDs, records carry commit SHAs; explicitly accepts two sources of truth as a starting point).

### Parallel sessions vs. subagents

A **parallel session** is a full Claude Code instance in its own git worktree on its own task; it knows nothing about the others, and the engineer is the only shared thing. A **subagent** is a scoped helper *inside* one session with its own context window and tool limits, for recurring jobs (simplifier, verifier, researcher). Parallel sessions raise throughput; subagents keep each session focused.

## Key Takeaways

1. **The bottleneck moved; transform the stages around Build, not Build.** Human-speed plan, review and deploy keep their length while build collapses; security teams sized for human output either queue or under-review.
   **How to apply:** Before adding more agent capacity, measure elapsed time in plan, review and deploy (git timestamps, PR metadata) and target the longest.

2. **Every stage commits an artifact the next stage reads.** Start manual, then codify as slash command, then as a merge-triggered non-interactive job (e.g. accepted intent.md → CI job runs the design pass with org skills loaded → spec.md opened as a PR).
   **How to apply:** Create an `intent/` folder in one product repo with the template below; have the next stage start *from the file*, not from a conversation.

3. **Back every must-hold skill with a hook or a PR re-check.** Skills are advisory. A policy that must always hold needs a deterministic control behind it. Build-phase hooks must be fast and scoped to the changed file (protected paths, formatter/linter, credential leaks); heavy checks go to commit or PR.
   **How to apply:** For each skill, ask "what happens if this doesn't trigger?" If the answer is unacceptable, add a PreToolUse hook or a REVIEW.md pass for it.

4. **Approval (`ask`) hooks belong at Deploy, not Build.** An approval prompt during Build puts a human back on the critical path of every parallel session. Team hooks go in `.claude/settings.json`; non-negotiable ones in managed settings. A block must explain itself and name the route to approval.
   **How to apply:** Build hooks allow/block only; reserve human-approval hooks for release, change tickets, migrations/infra.

5. **Protect the feedback loop from the agent.** For bug fixes: have Claude write the failing test, confirm it fails for the expected reason, commit it, then fix without editing it, enforced by a hook that blocks test-file edits during fix tasks (or reject test-touching diffs in review). State a quantifiable done-target and make "run tests and paste output" part of done in CLAUDE.md.
   **How to apply:** Add the verification block (below) to CLAUDE.md and a PreToolUse hook denying `Edit` on `tests/**` when a fix task is active.

6. **Regression-test the agent's configuration like code.** CLAUDE.md, skills and hooks steer the agent, so a change to them is a change to behavior.
   **How to apply:** Collect 20–50 real tasks with accepted outcomes, run them via `claude -p` in CI on `paths: ['CLAUDE.md', '.claude/**']` plus nightly, gate merges on pass rate, add one eval per incident.

7. **CLAUDE.md rules of thumb** (discovery B). Run `/init`, cut to what a new joiner needs on day one, keep under a page (all of it is loaded, stale lines waste context), check into git with code-owner approval. "When Claude makes a mistake twice, the correction goes into CLAUDE.md", and in review: a finding flagged a second time goes into CLAUDE.md *as part of that review*.
   **How to apply:** Add a "Things Claude gets wrong" section; make CLAUDE.md edits a normal outcome of PR review.

8. **Separation of duties in AI PR review** (discovery E). "The agent that wrote the code has no way to approve it." Findings never approve or block on their own; branch protection requires a code owner. A platform engineer can gate on the machine-readable severity tally the check run publishes. `@claude` on a comment → Claude pushes the fix (claude-code-action); a custom slash command can babysit Claude-opened PRs to green, waiting only on human approval. Monthly: tech lead rates findings and caps nits.
   **How to apply:** Write REVIEW.md with explicit passes, an "Important" definition, a nit cap and exclusions; require code-owner approval in branch protection.

9. **Parallelism is capped by review, not by compute** (discovery C). Split work by files touched (use plan.md to see independence); shared-file tasks run sequentially in one session. Start with two or three worktree sessions; "the practical ceiling is how many streams one person can review properly."
   **How to apply:** `claude --worktree <task>` per independent task; add a session only while review keeps up. Pre-approve safe commands so sessions don't stall on prompts.

10. **Adoption order is not stage order** (discovery D). Plays with no prerequisites (intent.md capture, CLAUDE.md, skills, feedback loop, hooks as approval gates) can start anywhere. CI/CD automation requires PR review and hooks-as-gates first, "because the gates must exist before automation accelerates anything through them." Closing the loop requires intent.md, PR review, hooks and a rehearsed rollback.
    **How to apply:** Start with CLAUDE.md + feedback loop + one skill; do not wire merge-triggered jobs until the review gate and production hook exist.

11. **Keep detection deterministic; let the tier decide what the model may do.** Claude is invoked only after a breach; 3σ actions are limited to PRs and pre-approved runbooks. Dismissals during triage tune the bands.
    **How to apply:** Pick one metric with a stable baseline, write a unit-tested detection script, and encode tiers in a versioned `bands.yaml`.

12. **Security scans must recur.** A scan is "a point-in-time statement about a codebase under a particular model, and both halves go stale." Rescan on a schedule (weekly for active services), treat the first scan as baseline even for "clean" repos, dismiss with reasons, route bounded fixes through the PR gate and larger ones as intent.md, and add an eval per fixed vulnerability class. Deterministic SAST and dependency checks stay in CI.
    **How to apply:** Whatever the tool, schedule it, record dismissal reasons, and keep the existing tracker as system of record via export.

13. **Name one source of truth per artifact** (discovery A). Legacy systems stay because auditors accept them; linkage (IDs in artifacts, SHAs in records) is an acceptable first step.
    **How to apply:** For each artifact type in the chain, write down which system is authoritative and how the other links to it.

14. **Managed settings close gaps permissions alone leave.** Tool-level `deny` on WebFetch doesn't stop `curl` in a shell, hence the OS-level sandbox with a domain allowlist; `permissions.deny` doesn't stop a sandboxed shell reading `~/.ssh`, hence the `credentials` block. The article is honest that this is "a starting point to tailor, rather than a recommendation to copy. Every deny trades against capability."
    **How to apply:** Derive the deny/allow balance from the repo's data classification, not from the example.

## Argument Structures

### Why the bottleneck moved

- Traditional SDLC rituals (PRDs, estimation, security reviews) existed to force alignment before *expensive* weeks of coding, and its controls assume every step is done by a human.
- Agents collapse Build to hours; the surrounding stages keep their human-speed length.
- Therefore: (1) the constraint moves to plan/review/deploy, (2) line-by-line human review becomes intractable when agents write most of the diff, (3) governance cost rises because exceptions still route through periodic committees.
- Conclusion: the process around the code needs the same transformation the implementation phase had.

### Why skills need hooks behind them

- Skills load probabilistically: "nothing forces a session to comply."
- Some policies must hold without exception.
- Therefore a must-hold policy needs a deterministic control (hook or PR re-check) behind the skill. Skill = violations rare; hook = violations near-impossible.
- Diagnostic corollary: if policy-citing review findings don't fall toward zero, the skill isn't triggering or has drifted from the official policy.

### Why approval hooks belong at Deploy, not Build

- Build-phase hooks fire on nearly every file edit and shell command.
- An approval (`ask`) hook pauses for a human.
- With parallel sessions, a human pause during Build blocks all sessions simultaneously.
- Therefore Build hooks should be fast allow/block checks; human approval gates belong where actions are rare and consequential (release). Hooks as a mechanism are stage-agnostic; only the *approval* type is placed at Deploy.

### Why detection must stay deterministic

- The monitoring trigger decides when an autonomous, unsupervised run starts.
- A deterministic, unit-tested, versioned script is auditable and reproducible; a model is neither.
- Therefore the model is kept out of detection entirely and invoked only after a breach, with its permissions set by the breached tier (read-only diagnose at 2σ, gated propose at 3σ).

### Why scans must recur

- A scan result depends on both the code and the model.
- Code changes weekly; each model generation finds what the prior one missed.
- Therefore a one-off scan's coverage decays on both axes; scans must run on a schedule, and "coverage is dated from the last run, not from the first."

### Why gates must precede CI/CD automation

- Automation accelerates whatever flows through the pipeline, good or bad.
- Without PR review and a production hook, a merge-triggered agent job has no stopping point.
- Therefore the CI/CD play lists PR review and hooks-as-gates as prerequisites, and closing the loop additionally requires a rollback path proven in staging before the 3σ tier may invoke it.

### Critical read

- **Vendor voice.** Written by Anthropic's Applied AI team; the Maintain stage in particular leans on Anthropic products (Claude Security on "Claude Mythos 5" at consumption rates, Claude Tag in public beta, managed Code Review in research preview, Claude Design in beta). The underlying patterns (scheduled scans, chat-ops first responder) are tool-agnostic; the product specifics are not.
- **Prescriptive, not measured.** Every play has leading/lagging indicators, but no outcome data is reported. "Inspired by working with our customers" is the only evidence claim.
- **Honest about limits** in places that matter: skills are advisory, managed settings are a starting point with capability trade-offs, parallelism is capped by human review, humans remain accountable for judgment calls, and auto mode is conditioned on mature guardrails (tight spec, small blast radius, test coverage).
- **Soft spots.** The production-gate hook example is a naive substring match on "deploy" and "production" in a Bash command, fine as an illustration, weak as an actual control (MCP deploy tools, aliases or scripts bypass it); the article's own recommendation to expose deployment through scoped MCP tools is the stronger control. The "product owner reviews but doesn't write the spec" model assumes skills encode brand/security/UX policy well enough, which is exactly what the evals play exists to verify.

## Leading and Lagging Indicators (discovery F)

Most indicators are read directly from git timestamps, PR metadata, the OpenTelemetry export, CI logs or the incident tracker, so no new instrumentation is needed.

| Play | Leading indicator | Lagging indicator |
|------|-------------------|-------------------|
| intent.md capture | First conversation → committed intent.md (weeks → hours) | Share of intents accepted; intent edits after first spec.md commit |
| Requirements + design | intent.md commit → spec.md commit | spec.md commits after first plan.md commit |
| Plan mode | Share merged from first pass; plan approval → merged PR | Rework cycles; merged diff still matches plan.md |
| CLAUDE.md | Repeated mistakes CLAUDE.md should have caught | Time to first merged PR for new joiners |
| Skills | Policy approval → updated skill merged | Policy-citing review findings (→ zero) |
| Parallel sessions | Concurrent sessions per engineer while review quality holds (OTel) | Changes merged per engineer/week vs. rework rate |
| Feedback loop | First-pass CI success rate | Review time per PR; change failure rate |
| Continuous evals | Pass rate over time; incident → permanent eval | Regressions caught in CI vs. in production |
| AI PR review | Time to first review; comments resolved without human touching branch | Defects/vulns caught pre-merge vs. escaped |
| Hooks as gates | Wait time per gate (OTel allow/block timestamps) | Gate violations reaching production before/after |
| CI/CD | Pipeline failures triaged without paging | DORA metrics |
| Closing the loop | Band breach → intent.md in triage queue | Findings becoming merged fixes; repeat incidents |
| Recurring scans | Repos on schedule; finding → patch in PR gate | Scan finds vs. production/external finds; findings per scan trend |

## Notable Commands / Code Snippets

Indentation restored where the web extraction flattened it.

**intent.md template (Stage 1)**

```markdown
# Intent: claims status self-service
Author: J. Ortiz (claims operations). Status: draft.

## Problem
Customers phone the contact center to ask where their claim is.
Handlers spend roughly a third of call time on status-only queries.

## Proposed outcome
Customers see claim status, next step and expected date in the portal.

## Affected users and systems
Claims handlers, portal team, claims-core API.

## Constraints
No new PII in the portal session. Existing authentication only.

## Open questions
Do third-party loss adjusters need access too?
```

**plan.md skeleton (Stage 3)**

```markdown
# Plan: claims status self-service (from intent.md 2026-06-02)

## Files that change
## Order of work
## Risks
## Proof
```

**CLAUDE.md verification block (Stage 4)**

```markdown
## Verifying your work

- Build: make build (must finish with "Build succeeded")
- Test: make test (all green; never skip or delete a failing test)
- Lint: make lint (zero warnings)

Run all three before reporting any task complete, and paste the output.
If a test fails, fix the code, not the test.
```

**Production gate hook (Stage 5)**, wired as a `PreToolUse` hook with `"matcher": "Bash"` in `.claude/settings.json`

```bash
#!/bin/bash
# Production deploys require a named release authorization
cmd=$(jq -r '.tool_input.command' < /dev/stdin)
if [[ "$cmd" == *"deploy"* && "$cmd" == *"production"* ]]; then
  if [ -z "$RELEASE_APPROVAL" ]; then
    echo "Production deploys need a release authorization." >&2
    exit 2 # exit 2 blocks the action; the message goes to Claude
  fi
fi
exit 0
```

**Eval workflow trigger (Stage 4)**, the key idea being the `paths` filter on agent configuration

```yaml
name: Agent evals
on:
  pull_request:
    paths: ['CLAUDE.md', '.claude/**']
  schedule:
    - cron: '0 2 * * *'
# ... per eval:
#   claude -p "$(jq -r '.prompt' $eval)" \
#     --allowedTools "Read,Edit,Bash(make test)" \
#     --output-format json > result.json
#   ./evals/check.sh "$eval" result.json
```

**bands.yaml (Stage 6)**

```yaml
metric: ci_test_failure_rate
baseline: rolling_30d
rules: western_electric
tiers:
  1sigma: { action: log }
  2sigma: { action: diagnose,
            tools: "Read,Grep,Bash(gh run view *)" }
  3sigma: { action: propose,
            routes: [pull_request, runbook:rollback-deploy] }
```

**Managed settings excerpt (regulated enterprise, trimmed)**

```json
{
  "permissions": {
    "deny": ["Read(.env*)", "Read(./secrets/**)", "WebFetch", "Bash(curl *)", "Bash(wget *)"],
    "allow": ["Bash(git *)", "Bash(make build)", "Bash(make test)", "Bash(make lint)"],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "credentials": { "files": [{ "path": "~/.ssh", "mode": "deny" }] }
  },
  "allowManagedHooksOnly": true,
  "allowManagedMcpServersOnly": true,
  "requiredMinimumVersion": "2.1.193"
}
```

## User Notes

- Ingested as the primary source for the AI-native SDLC playbook.
- Focus areas: the artifact chain; governance controls (advisory skills vs. deterministic hooks, managed settings and sandboxing, the production gate); test and evals (feedback loop vs. verifier subagent, failing-test-first with test-edit blocking, continuous evals on agent configuration); and the maintain loop (σ-tier control bands, headless diagnosis written back as intent.md, recurring scans, Claude Tag on call).
- All six discoveries included: A source of truth for legacy systems, B CLAUDE.md rules of thumb, C parallel sessions vs. subagents and the review ceiling, D adoption dependency order, E separation of duties in AI PR review, F leading/lagging indicators.
- Interested in this as foundational reference material: the stage-by-stage structure, the indicator table and the snippets are meant to be reusable on their own.

## Related Topics

sdlc, claude-code, workflow, governance, hooks, agent-skills, evaluation, enterprise, best-practices, claude-md, managed-settings, sandboxing, subagents, worktrees, code-review, ci-cd, observability, security-scanning
