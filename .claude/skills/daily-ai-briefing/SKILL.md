---
name: daily-ai-briefing
description: Generates a daily AI briefing report covering Claude Code updates (with transcripts from @claudelog), new videos from watched YouTube channels (Chase-H-AI, NateBJones, nateherk), the 10 most-viewed recent Claude Code videos via YouTube Data API, Andrej Karpathy gist and YouTube updates, and AI headlines from The Batch, Simon Willison, and HuggingFace Blog. Writes a dated markdown file to the local, gitignored ai-research/ folder.
disable-model-invocation: true
---

You are running the daily AI briefing routine for this repo. Execute every step
below in sequence without stopping for confirmation. Operate autonomously — every
decision is covered by the instructions.

**Failure rule (the only one):** if a step fails (yt-dlp error, missing captions,
API or network failure), retry it once, then write the section's failure marker
under that section's heading and continue. Never abort the full run; always write
the report, because a partial report is better than no report.

<context>
  Repo path:      the root of this repo (the directory containing this
                  .claude/ folder); all paths below are relative to it
  Report output:  ai-research/YYYY-MM-DD_briefing.md  (today's actual date)
  Not committed:  ai-research/ is gitignored. Write the report locally and do
                  not git add, commit or push it: this repo is public, and
                  skill reports stay out of it (same as tech-briefs/ and
                  storm-reports/).
  State:          All reports in ai-research/ together are your record of what
                  was already reported. If none exists, treat everything as new
                  and set LAST_DATE to 7 days ago.
  Scope boundary: Never touch sources/, summaries/, wiki/, index.md, or
                  log.md. This is a discovery tool — nothing gets ingested
                  into the wiki.
</context>

## Step 0 — Orient

1. Set TODAY to the current date in YYYY-MM-DD format.
2. List ai-research/ and take the lexicographically last filename. Its date
   → LAST_DATE.
3. Collect "already seen" IDs from **all** reports, not only the last one: a
   section that said "Nothing new since last report." carries no IDs, so the
   last report alone would let older videos come back as new.
   ```
   grep -ohE '(v=|youtu\.be/|shorts/)[A-Za-z0-9_-]{11}' ai-research/*.md | sed -E 's#.*(=|/)##' | sort -u
   grep -ohE 'gist\.github\.com/[^/ )]+/[0-9a-f]+' ai-research/*.md | sed -E 's#.*/##' | sort -u
   ```
   A YouTube video ID is 11 characters of `[A-Za-z0-9_-]`; IDs may start with
   `-` or `_`. Skip already-seen IDs in every section below.
4. If no prior report exists: LAST_DATE = 7 days ago, already-seen sets empty.

---

## Step 1 — Claude Code Updates (@claudelog)

Goal: surface new Claude Code features with a practical "so what" for each.

1. Run:
   ```
   yt-dlp --flat-playlist --extractor-args "youtubetab:approximate_date" --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s" "https://www.youtube.com/@claudelog/videos" --playlist-end 20
   ```
   `approximate_date` is what fills `upload_date` in flat-playlist mode;
   without it every date comes back NA and the date filter never applies.
2. Filter: upload_date >= LAST_DATE AND id not already seen. If dates still
   come back NA, take the top 5 by playlist order and filter by already-seen
   IDs only.
3. Nothing new → write "Nothing new since last report." and skip to Step 2.
4. For each new video (up to 5; note count if more exist):
   a. Extract transcript:
      ```
      python scripts/extract-transcript.py "VIDEO_URL"
      ```
      Returns JSON: {"status", "extraction_method", "transcript"}.
      If status is "no_captions": note title + URL + "[Transcript unavailable]",
      move on.
   b. Identify every feature, change, or update in the transcript. Skip pure
      promotion or recap.
   c. For each item write:
      - **[Feature/Change name]** — one sentence describing what it is.
      - **So what:** one or two sentences on what you can concretely do with
        this. Start with an action verb ("You can now…", "Use this to…").
5. Group items under the video title as a subheading with the URL.

---

## Step 2 — Watched Channels: New Videos

Goal: quick list of what the three watched channels published since last report.

Run for each channel:
```
yt-dlp --flat-playlist --extractor-args "youtubetab:approximate_date" --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s|||%(description)s" "CHANNEL_URL/videos" --playlist-end 10
```

Channels (handle → channel ID, used by Step 3's filter):
- https://www.youtube.com/@Chase-H-AI → UCoy6cTJ7Tg0dqS-DI-_REsA
- https://www.youtube.com/@NateBJones → UC0C-17n9iuUQPylguM1d-lQ
- https://www.youtube.com/@nateherk → UC2ojq-nuP8ceeHqiroeKhBA

For each channel:
1. Filter: upload_date >= LAST_DATE AND id not already seen. If dates still
   come back NA, take top 5 by playlist order, filter by already-seen IDs.
2. Nothing new → "Nothing new since last report." Keep the channel heading.
3. For each new video:
   - **[Title]** — [URL]
   - Two sentences from title + description only. No transcript.

---

## Step 3 — Trending: Claude Code

Goal: the 10 most-viewed Claude Code videos published since LAST_DATE, not
already seen.

1. Call the YouTube Data API v3 (key in env var YOUTUBE_API_KEY), ranked by
   views within the window:
   ```
   curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=claude+code&type=video&order=viewCount&publishedAfter=LAST_DATET00:00:00Z&maxResults=25&key=$YOUTUBE_API_KEY"
   ```
   Failure marker: "[YouTube API unavailable — skipping section]", then move
   to Step 4.
2. Extract per result: videoId, title, channelId, channelTitle, publishedAt,
   description.
3. Filter out: already-seen IDs and videos whose `channelId` is one of the
   three watched channel IDs in Step 2 (they are covered there). Match on
   channel ID, not `channelTitle`: the API returns display names, which do
   not reliably match the handles.
4. Fetch view counts for the remaining IDs in one call:
   ```
   curl "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=ID1,ID2,...&key=$YOUTUBE_API_KEY"
   ```
5. Sort by viewCount, descending, and take the first 10.
6. For each write:
   - **[Title]** — [Channel] — [URL]
   - Views: [viewCount] | Published: [date]
   - One sentence on what the video covers.
7. Fewer than 10 → list what's available and note "Only N results found."

---

## Step 4 — Andrej Karpathy

Goal: new gists and YouTube videos from Karpathy.

### Gists
```
curl -s "https://api.github.com/users/karpathy/gists?per_page=10"
```
For each gist where created_at >= LAST_DATE and ID not already seen:
- **[Description or filename]** — [html_url]
- Two sentences from description and filenames.

Nothing new → "No new gists."

### YouTube
```
yt-dlp --flat-playlist --extractor-args "youtubetab:approximate_date" --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s|||%(description)s" "https://www.youtube.com/@AndrejKarpathy/videos" --playlist-end 5
```
Filter: upload_date >= LAST_DATE AND id not already seen. If dates still come
back NA, filter by already-seen IDs only.

For each new video:
- **[Title]** — [URL]
- Two sentences from title + description only.

Nothing new → "No new videos."

---

## Step 5 — AI Headlines

Goal: up to 5 significant items per source — model releases, research findings,
industry developments, notable tooling updates. Skip pure tutorials and
marketing with no news value.

Fetch with WebFetch:
- The Batch:       https://www.deeplearning.ai/the-batch/
- Simon Willison:  https://simonwillison.net/
- HuggingFace:     https://huggingface.co/blog

For each source:
1. Find items published on or after LAST_DATE.
2. Pick up to 5 by significance: major model release > important research >
   notable industry development > notable tooling update > everything else.
3. Failure marker: "[Source unavailable]".
4. Nothing significant → "Nothing significant since last report."
5. For each item:
   - **[Title]** — [URL] — [Date]
   - One paragraph (3–5 sentences): what it is, why it matters, what changed.

---

## Step 6 — Write the Report

Use exactly this structure:

```
# AI Briefing — YYYY-MM-DD

## Claude Code Updates
[Step 1 content]

## Watched Channels

### Chase-H-AI
[content]

### NateBJones
[content]

### Nate Herk
[content]

## Trending: Claude Code
[Step 3 content]

## Andrej Karpathy
[Step 4 content]

## AI Headlines

### The Batch
[content]

### Simon Willison
[content]

### HuggingFace Blog
[content]
```

Write to: ai-research/YYYY-MM-DD_briefing.md

---

## Step 7 — Check the Report

1. Confirm every heading from the Step 6 template is present, each followed by
   content or an explicit marker ("Nothing new…", "No new…", "[… unavailable]").
2. Confirm no video or gist ID in the new report is in the already-seen sets
   from Step 0, and no ID appears twice within it.

If either check fails, go back to the step that produced the section, fix it,
rewrite the report, and run this check again. Done when both checks pass; then
tell the user the report's path. Leave it uncommitted (see Not committed above).
