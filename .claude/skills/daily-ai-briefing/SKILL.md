---
name: daily-ai-briefing
description: Generates a daily AI briefing report covering Claude Code updates (with transcripts from @claudelog), new videos from watched YouTube channels (Chase-H-AI, NateBJones, nateherk), top 10 trending Claude Code videos via YouTube Data API, Andrej Karpathy gist and YouTube updates, and AI headlines from The Batch, Simon Willison, and HuggingFace Blog. Writes a dated markdown file to ai-research/, commits, and pushes. Use this skill whenever the user types /daily-ai-briefing or asks for an AI briefing, news update, or wants to know what's new in AI today.
---

You are running the daily AI briefing routine for this repo. Execute every step
below in sequence without stopping for confirmation. Operate autonomously — every
decision is covered by the instructions. If a single step fails, note it inline
and continue; never abort the full run over a partial failure.

<context>
  Repo path:      C:\Users\TimKüllmey\local_dev\ai-wiki
  Report output:  ai-research\YYYY-MM-DD_briefing.md  (today's actual date)
  State:          The most recent file in ai-research\ is your record of what
                  was already reported. Read it first. If none exists, treat
                  everything as new and set LAST_DATE to 7 days ago.
  Scope boundary: Never touch sources\, summaries\, wiki\, index.md, log.md,
                  or playbook.md. This is a discovery tool — nothing gets
                  ingested into the wiki.
</context>

## Step 0 — Orient

1. Set TODAY to the current date in YYYY-MM-DD format.
2. List ai-research\ and take the lexicographically last filename — that is
   the most recent report.
3. Read it in full and extract:
   - All YouTube video IDs (11-char alphanumeric strings in youtube.com URLs)
     → "already seen", skip in every section below.
   - The date from the filename → LAST_DATE.
   - Any Karpathy gist IDs (from gist.github.com URLs) → already seen.
4. If no prior report exists: LAST_DATE = 7 days ago, already-seen sets empty.

---

## Step 1 — Claude Code Updates (@claudelog)

Goal: surface new Claude Code features with a practical "so what" for each.

1. Run:
   ```
   yt-dlp --flat-playlist --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s" "https://www.youtube.com/@claudelog/videos" --playlist-end 20
   ```
2. Filter: upload_date >= LAST_DATE AND id not already seen. If all dates are
   NA (known yt-dlp quirk for this channel), take the top 5 by playlist order
   and filter by already-seen IDs only.
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
yt-dlp --flat-playlist --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s|||%(description)s" "CHANNEL_URL/videos" --playlist-end 10
```

Channels:
- https://www.youtube.com/@Chase-H-AI
- https://www.youtube.com/@NateBJones
- https://www.youtube.com/@nateherk

For each channel:
1. Filter: upload_date >= LAST_DATE AND id not already seen. If all dates NA,
   take top 5 by playlist order, filter by already-seen IDs.
2. Nothing new → "Nothing new since last report." Keep the channel heading.
3. For each new video:
   - **[Title]** — [URL]
   - Two sentences from title + description only. No transcript.

---

## Step 3 — Trending: Claude Code

Goal: top 10 YouTube videos about Claude Code not already seen.

1. Call the YouTube Data API v3 (key in env var YOUTUBE_API_KEY):
   ```
   curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=claude+code&type=video&order=date&maxResults=20&key=$YOUTUBE_API_KEY"
   ```
   If YOUTUBE_API_KEY is unset or the call fails: write
   "[YouTube API unavailable — skipping section]" and move to Step 4.
2. Extract per result: videoId, title, channelTitle, publishedAt, description.
3. Filter out: already-seen IDs, publishedAt < LAST_DATE, and videos from the
   three watched channels above (to avoid duplication).
4. Take the first 10 remaining.
5. Fetch view counts in one call:
   ```
   curl "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=ID1,ID2,...&key=$YOUTUBE_API_KEY"
   ```
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
yt-dlp --flat-playlist --print "%(id)s|||%(title)s|||%(upload_date)s|||%(webpage_url)s|||%(description)s" "https://www.youtube.com/@AndrejKarpathy/videos" --playlist-end 5
```
Filter: upload_date >= LAST_DATE AND id not already seen. If dates NA, filter
by already-seen IDs only.

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
3. Fetch failure → "[Source unavailable]", continue.
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

Write to: ai-research\YYYY-MM-DD_briefing.md

---

## Step 7 — Commit and Push

```
git add ai-research\YYYY-MM-DD_briefing.md
git commit -m "briefing: YYYY-MM-DD"
git push
```

If push fails: `git pull --rebase` then retry once. If it still fails: leave
the commit local and append "[Push failed — commit is local only]" to the
report.

---

## Fallback rules

- yt-dlp error on a channel → note it, continue.
- no_captions on a transcript → note it, skip that video, continue.
- Any API or network failure after one retry → write failure inline, continue.
- Always write and commit the report, even if sections are incomplete.
  A partial report is better than no report.
