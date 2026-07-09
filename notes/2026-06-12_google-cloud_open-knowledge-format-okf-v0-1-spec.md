# Ingest Notes

**Source:** [Open Knowledge Format (OKF) v0.1 Specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)

## User Focus
- **The spec itself** — faithful capture of the format: frontmatter schema (required `type` + recommended fields), reserved filenames (`index.md`, `log.md`), concept IDs, cross-linking (absolute vs relative), index/log conventions, citations, conformance rules (§9), versioning.
- **Design philosophy** — the arguments behind the format: why minimal and permissive, "metadata as code", why it standardizes so little, the permissive consumption model, and its explicit relationship to the LLM-wiki / Obsidian / metadata-as-code patterns.

## Excluded
- The reference agent (BQ pass + web pass) and the Cytoscape visualizer — producer/consumer tooling, out of scope for this summary.
- OKF-vs-this-wiki conformance mapping — not requested here (though the wiki has adopted OKF v0.1).
