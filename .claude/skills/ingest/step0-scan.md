# Step 0 — Confidentiality Scan

This wiki is public. Before publishing anything that is **not obviously public**, scan it for confidential information.

## When to run

**Run on the source when it is not obviously public:**

- Files found in `inbox/` (unknown provenance)
- User-pasted content (transcripts, documents, text blobs)
- User-authored material (concepts, internal docs, personal notes ingested as a source)
- Gist bodies (user-authored prompts)
- Any source where you are not certain the content is already published

**Skip the source scan when it is obviously public:** YouTube, podcast, arxiv, GitHub and web-article URLs fetched via WebFetch or yt-dlp; documentation pages on public vendor sites.

**Always run on the generated summary** (after Summarize, before Connect), regardless of whether the source was scanned. Summaries fold in user notes and focus points, which can introduce context the source did not have.

When in doubt, run the scan. The cost is low.

## How to run

**Model: Sonnet sub-agent** via the Agent tool, `model: "sonnet"`. It scans in isolation and returns a structured verdict.

Prompt the sub-agent with:

- Path(s) to the content to scan.
- Role framing: *"You are a compliance specialist reviewing content for public publication in an open-source knowledge wiki. You also understand the value of publishing useful technical content — your goal is to enable safe publication, not to strip everything that could theoretically be sensitive."*
- What to look for (use judgment, over-flag in doubt):
  - Client/customer names and identifiers
  - Internal project codenames or product names not publicly announced
  - Employee names and internal team references
  - Internal tool names, internal URLs, internal system identifiers
  - Credentials, API keys, tokens, connection strings
  - Financial figures tied to specific clients or unreleased deals
  - Unreleased client deliverables or pre-publication drafts
  - Anything that would embarrass the author or a third party if published
- Rule: **when uncertain, flag it and let the user decide.** False positives cost one prompt; false negatives cost a leak.

## Expected sub-agent output

```
VERDICT: CLEAR | FLAGGED

If FLAGGED, for each issue:
- LOCATION: file path + line range or quoted span
- CATEGORY: (client-name | internal-tool | credential | employee | financial | unreleased | other)
- CONCERN: one-sentence explanation of why this is potentially confidential

REMEDIATION OPTIONS (3-4 options, compliance-specialist framing):
Option A: <description>
  - Pros: <what this preserves>
  - Cons: <what this loses>
  - Compliance assessment: <risk level after applying this option>
Option B: ...
Option C: ...
(Option D: abort — always include this)
```

## Handling the verdict

- **CLEAR:** proceed. No user interaction needed.
- **FLAGGED:** present the full verdict and options. Wait for the user to choose an option (by letter) or give custom instructions. Do not proceed until every flagged item is resolved.
- After remediation, re-scan the revised content. Repeat until CLEAR or the user aborts.
- On abort, stop the workflow. Do not write partial artifacts to `sources/`, `summaries/`, or `gists/`.

## Manual edits

The scan only runs inside a workflow. If a source, summary, wiki page or gist is edited by hand, run this scan on the edited file before committing.
