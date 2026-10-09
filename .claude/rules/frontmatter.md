---
paths:
  - "sources/**/*.md"
  - "summaries/**/*.md"
  - "wiki/**/*.md"
  - "gists/**/*.md"
---

# Frontmatter Schemas

Every file under `sources/`, `summaries/`, `wiki/` and `gists/` carries one of these. `scripts/okf-check.py` enforces non-empty frontmatter; the field sets below are the contract.

## Source (`sources/<folder>/<slug>.md`)

`<folder>` is the plural folder from the source-type table in `CLAUDE.md` (`youtube/` stays singular).

```yaml
---
title: "<title>"
type: "youtube|podcast|article|paper|repo|docs|note"
channel: "<author/channel/org>"
date: "<YYYY-MM-DD>"  # publication date
resource: "<url>"
pillar: "building|understanding|ecosystem"
tags: [tag1, tag2]
timestamp: "<YYYY-MM-DD>"
extraction_method: "auto-captions|manual-captions|whisper-local|web-fetch|pdf-extract|user-pasted"
# Optional (source-type specific):
video_id: "<id>"
duration: "<duration>"
---
```

## Summary (`summaries/<slug>.md`)

```yaml
---
title: "<title>"
type: "summary"
description: "<one sentence>"
channel: "<author>"
date: "<YYYY-MM-DD>"
resource: "<url>"
pillar: "<pillar>"
tags: [tag1, tag2]
timestamp: "<YYYY-MM-DD>"
source_file: "sources/<folder>/<slug>.md"
---
```

## Wiki page (`wiki/<type>/<slug>.md`)

```yaml
---
title: "<topic>"
type: "concept|tool|how-to|person|comparison"
description: "<one sentence>"
pillar: "<pillar>"
tags: [tag1, tag2]
sources:
  - "summaries/<slug1>.md"
  - "summaries/<slug2>.md"
timestamp: "<YYYY-MM-DD>"
---
```

Body structure is flexible, but two section names are reserved:

- `## Unresolved Tensions` — contradictions held under option (c) of the connect skill's tension handling. Each entry quotes both positions with citations and the date surfaced.
- `## Related Pages` — outbound links to other wiki pages, kept at the bottom.

When a page absorbs a new summary, add it to `sources:` and update `timestamp`. Add information; do not replace existing content except through a user-approved tension resolution.

## Gist (`gists/<slug>.md`)

```yaml
---
title: "<title>"
intent: "<one-line: what running this prompt achieves>"
prerequisites: ["<tool/access/file needed>"]   # optional, omit if none
model: "sonnet|opus|haiku"
tags: [tag1, tag2]
created: "<YYYY-MM-DD>"
---
```

Slug: `YYYY-MM-DD_short-slug.md`, no source-slug component. Gists are not OKF entries and are not listed in the master `index.md`.
