---
title: "Open Knowledge Format (OKF) v0.1 Specification"
type: "summary"
description: "Google's vendor-neutral spec for knowledge as markdown-plus-frontmatter bundles, standardizing only a required type field and a permissive consumption model."
channel: "Google Cloud Platform"
date: "2026-06-12"
resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf"
pillar: "ecosystem"
tags: [okf, knowledge-representation, knowledge-base, agents, architecture, reference]
timestamp: "2026-07-09"
source_file: "sources/repos/2026-06-12_google-cloud_open-knowledge-format-okf-v0-1-spec.md"
---

# Open Knowledge Format (OKF) v0.1 Specification — Summary

**Source:** Google Cloud Platform | 2026-06-12 | [Link](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) | GitHub repo (`knowledge-catalog/okf`)

## TL;DR
OKF v0.1 is a deliberately minimal, vendor-neutral format for representing knowledge as a directory of markdown files with YAML frontmatter — "if you can `cat` a file, you can read OKF; if you can `git clone` a repo, you can ship it." Its whole design bet is that the *format* is the contribution and everything else (agents, servers, viewers, taxonomies) should be left unspecified: it mandates exactly one frontmatter field (`type`) and pairs that with a strongly **permissive consumption model** where consumers must not reject bundles for missing fields, unknown types, or broken links. The reference agent and HTML visualizer shipped alongside are explicitly framed as disposable proofs-of-concept, not part of the standard.

## Key Concepts

### Knowledge Bundle
The unit of distribution: a self-contained, hierarchical directory tree of markdown documents. Can ship as a git repo (recommended — history, attribution, diffs), a tarball/zip, or a subdirectory inside a larger repo. The directory structure is domain-independent — producers organize however the knowledge wants to be organized.

### Concept / Concept ID
A **Concept** is a single unit of knowledge = one markdown document. It may describe a tangible asset (a table, an API endpoint) or an abstract idea (a metric, a business process). The **Concept ID** is just the file path within the bundle minus the `.md` suffix (`tables/users.md` → `tables/users`). Identity is positional — there is no separate ID field.

### Frontmatter (the one required field)
A YAML block delimited by `---`. The **only required field is `type`** — a short, self-explanatory string (`BigQuery Table`, `Playbook`, `Reference`, …). Type values are *not* centrally registered; consumers must tolerate unknown types by falling back to a generic-concept rendering. Recommended-but-optional, in priority order: `title`, `description` (one sentence, used for index/search snippets), `resource` (canonical URI of the underlying asset; absent for abstract concepts), `tags`, `timestamp` (ISO 8601 last-meaningful-change). Producers MAY add arbitrary extra keys; consumers SHOULD preserve unknown keys on round-trip.

### Reserved filenames
`index.md` and `log.md` have defined meaning at *any* directory level and must not be used as concept documents. Everything else `*.md` is a concept.

### Index files (progressive disclosure)
An optional `index.md` in any directory enumerates that directory's contents so a human or agent can see what exists before opening documents. **Index files carry no frontmatter** — with one narrow exception: the bundle-root `index.md` MAY declare `okf_version: "0.1"`, the *only* place frontmatter is permitted in an index. Body is sections of `* [Title](url) - description` bullets, description pulled from each concept's frontmatter.

### Log files
An optional `log.md` at any level records change history as ISO-8601 date-grouped entries, newest first, with a bold leading word (`**Update**`, `**Creation**`, `**Deprecation**`) that is convention, not requirement.

### Links & Citations
Concepts relate via ordinary markdown links. **Absolute (bundle-relative) links** begin with `/` and are the recommended form (stable under moves within a subdirectory); relative `./` links are also allowed. Link semantics are *untyped* — the kind of relationship (joins-with, depends-on, parent/child) lives in the surrounding prose, not the link. **Citations** are external-source links, conventionally numbered under a `# Citations` heading.

### Conformance (§9)
A bundle is conformant if only three things hold: (1) every non-reserved `.md` has a parseable YAML frontmatter block, (2) every frontmatter block has a non-empty `type`, (3) present `index.md`/`log.md` follow their structural conventions. Everything else is soft guidance.

## Key Takeaways

1. **Standardize the minimum that buys interoperability, punt on everything else.** OKF fixes only the structural conventions needed to make a corpus self-describing (frontmatter block + `type` + reserved-file semantics) and explicitly declines to define a concept taxonomy, storage/serving/query infra, or to replace domain schemas (Avro, Protobuf, OpenAPI — it *references* them). **How to apply:** when designing an interchange format, ask "what is the smallest rule set two independent tools must agree on to exchange this?" and resist standardizing anything a producer could reasonably choose differently.

2. **Design consumers to be permissive, not strict.** The spec commands that consumers MUST NOT reject a bundle for missing optional fields, unknown `type` values, unknown extra keys, broken cross-links, or missing `index.md`. A broken link is "not-yet-written knowledge," not an error. **How to apply:** build readers that degrade gracefully (render unknown types as generic concepts, treat dangling links as future nodes) so the format stays usable as bundles grow and are partially agent-generated.

3. **Make knowledge curation a normal software-engineering activity.** Because bundles are just markdown in git, you get pull requests, line-by-line diffs, blame, and review "for free" — and existing tools (Obsidian, Notion, MkDocs, Hugo, Jekyll) already render markdown+frontmatter without custom UI. **How to apply:** store catalog/knowledge as code next to source rather than in a service-owned metadata store; review knowledge changes the way you review code.

4. **Split structured from unstructured on purpose.** Use frontmatter only for the handful of fields you actually query/filter/index on (`type`, `resource`, `tags`, `timestamp`); put the prose, schemas, and examples humans and LLMs actually read in the markdown body. **How to apply:** don't over-model in frontmatter — if a field isn't something a consumer filters on, it belongs in the body.

5. **Prefer structural markdown in the body.** Headings, lists, tables, fenced code blocks over freeform prose, because structure aids both human reading and agent retrieval. Conventional (not required) headings: `# Schema`, `# Examples`, `# Citations`.

6. **The tooling is deliberately disposable.** The BQ+web reference agent (producer) and the Cytoscape/marked HTML visualizer (consumer) exist only "to make the format tangible at both ends." The format is the contribution; treat the agents as replaceable. **How to apply:** when publishing a standard, ship reference implementations to prove producibility/consumability — but frame them as proofs-of-concept so adopters don't mistake the tool for the spec.

## Argument Structures

**Why minimal beats comprehensive (the core thesis):**
- Premise: the space of agent knowledge representation is evolving fast, and many incompatible conventions are emerging.
- Premise: knowledge is best represented in commonly accessible, established formats — readable by humans without tooling, parseable by agents without bespoke SDKs, diffable in VCS, portable across tools/orgs/time.
- Premise: any rule beyond the minimum needed for self-description is a place where a producer might reasonably want to differ, and locking it down creates lock-in and premature taxonomy.
- Conclusion: standardize *only* the small self-describing core (frontmatter + `type` + reserved files) and leave the rest to producers → maximizes adoption and longevity.

**Why the permissive consumption model is load-bearing (not just politeness):**
- If bundles are partially generated by agents and continuously refactored, strict validation would reject exactly the in-progress states that are normal for a living corpus.
- Therefore consumers must tolerate missing fields / unknown types / broken links → the format "remains useful as bundles grow, get refactored, and are partially generated by agents."
- This is why conformance (§9) is defined on *producers* (three hard rules) while *consumers* are handed a MUST-NOT-reject list — the strictness is asymmetric by design.

**Positioning against neighbors:**
- OKF is intentionally close to LLM-wiki repos, Obsidian/Notion-style PKM, and "metadata as code" approaches.
- It differs primarily in being *specified* — it pins down the small rule set needed for interoperability without dictating tooling. The claimed novelty is the spec, not the shape.

## Notable Commands / Code Snippets

Minimal conformant concept (the required field is just `type`):
```markdown
---
type: Playbook
title: Incident response — data freshness alert
description: Steps to triage a freshness alert on the orders pipeline.
tags: [oncall, incident]
timestamp: 2026-04-12T09:00:00Z
---
# Trigger
A freshness alert fires when `orders` lags more than 30 minutes behind SLA.
See the [orders table](/tables/orders.md).
```

Version declaration (only allowed frontmatter in an index, at bundle root only):
```yaml
---
okf_version: "0.1"
---
```

## User Notes
Ingested specifically for the format definition and its design rationale; the reference agent and visualizer were deliberately out of scope. Directly relevant because this wiki has itself adopted OKF v0.1 — but the OKF-vs-wiki conformance mapping was left for a separate pass.

## Related Topics
okf, knowledge-representation, knowledge-base, agents, architecture, reference, metadata-as-code, progressive-disclosure, llm-wiki
