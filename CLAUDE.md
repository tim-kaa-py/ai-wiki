# YouTube Agentic Coding Tips Extractor

When a user provides a YouTube URL, follow this workflow:

## Step 1 — Metadata

Run yt-dlp to extract video metadata:

```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(id)s|||%(duration_string)s" "<URL>"
```

Parse the output and confirm with the user:
- Title, Channel, Upload date, Duration

Check `index.md` for duplicates (match on video ID). If already processed, inform the user and ask if they want to redo it.

## Step 2 — Generate Slug

Create a file slug from metadata:
- Format: `YYYY-MM-DD_channel-slug_title-slug`
- Lowercase, hyphens instead of spaces/special chars
- Max 60 chars for the title portion
- Upload date from yt-dlp (format: YYYYMMDD → YYYY-MM-DD)

## Step 3 — Extract Transcript

Run the extraction script:

```bash
./scripts/extract-transcript.sh "<URL>" "<SLUG>"
```

If the output is `NO_CAPTIONS`, ask the user to paste the transcript manually.

## Step 4 — Save Transcript

Save to `transcripts/<SLUG>.md` with YAML frontmatter:

```markdown
---
title: "<title>"
channel: "<channel>"
date: "<YYYY-MM-DD>"
url: "<url>"
video_id: "<id>"
duration: "<duration>"
extraction_method: "auto-captions" | "manual-captions" | "user-pasted"
---

<transcript text>
```

Keep transcripts verbatim — do not edit or summarize.

## Step 5 — Interview the User

Ask one question at a time. Adapt based on responses. Skip questions already answered. Probe if answers are vague.

1. "What was the main topic or technique that caught your attention?"
2. "Were there specific tips, commands, or workflows you want to capture?"
3. "Any timestamps or sections you found most valuable? (I can look them up in the transcript)"
4. "Anything you want to try in your own projects? Immediate takeaway?"
5. "Additional notes or context for the summary?"

Save all responses to `notes/<SLUG>.md` with a header linking to the video.

## Step 6 — Generate Summary

Create `summaries/<SLUG>.md` with this structure:

```markdown
# <Title> — Tips & Tricks

**Source:** <Channel> | <Date> | [Watch](<URL>) | <Duration>

## TL;DR
<!-- 2-3 sentence overview focused on what the user found interesting -->

## Key Tips & Tricks
<!-- Numbered list. Each tip includes:
  - The tip itself
  - **How to apply:** concrete next step or command -->

## Notable Commands / Code Snippets
<!-- Code blocks with context. Only include what's actually useful. -->

## User Notes
<!-- Personal takeaways from the interview -->

## Related Topics
<!-- Tags as a comma-separated list, e.g. claude-code, prompt-engineering, mcp -->
```

Focus on what the USER found interesting, not a generic video overview.

## Step 7 — Update Index

Add a row to `index.md`:

```
| <Date> | [<Title>](summaries/<SLUG>.md) | <Channel> | <tags> |
```

## Guardrails

- **Never download video files** — always use `--skip-download`
- **Check for yt-dlp** — run `which yt-dlp` before using it. If missing, offer `brew install yt-dlp`.
- **Check for duplicates** — search `index.md` for the video ID before processing
- **Transcripts are verbatim** — never modify transcript content
- **Summaries are opinionated** — focus on the user's interests, not exhaustive coverage
