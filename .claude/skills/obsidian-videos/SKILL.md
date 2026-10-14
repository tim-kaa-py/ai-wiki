---
name: obsidian-videos
description: Ingests videos queued in the user's Obsidian "AI Videos" note (iCloud vault), using the remarks under each entry as the deep-dive focus, then deletes each ingested entry from the note. Use when the user says "ingest from my vault", "ingest from Obsidian", "process AI Videos", "what's in my ingest queue" or "ingest next". Only the note's "Ingest next" section is read. Not for a URL pasted directly into chat (ingest).
argument-hint: "[entry numbers] [quick]"
---

# Obsidian videos

A front end to the `ingest` skill. The user logs videos in an Obsidian note called "AI Videos" (iCloud-synced vault), sorted under headings; only `# Ingest next` is the ingest queue. Each entry is a bold label the user wrote, a URL, and optional remarks: questions and angles they want answered. `scripts/obsidian-videos.py` finds the note, parses the queue and deletes entries; never hand-edit the note.

## Rules for every run

- **The user chooses.** Always show the queue and wait for a pick, even with one entry. Numbers given with the command (`/obsidian-videos 2`) count as the pick.
- **Remarks are the focus points.** The bold label and the remarks feed Tier 2 Step 5 as Mode A notes, so skip the Mode B interview question. Ask it only for an entry with neither remarks nor a label that says what the user is after. Labels and remarks are rough phone notes: show them raw in the queue, correct typos when writing `notes/<slug>.md`, and pass a half-finished remark on as it is, telling the user rather than completing it.
- **Remarks go public.** They end up in `notes/<slug>.md` in this public repo. If a remark holds anything beyond questions about the video (names, an employer, private context), run the Step 0 scan (`ingest/step0-scan.md`) on it before writing the notes file.
- **Delete only after success.** Remove an entry only once its ingest has written the log entry. An aborted or failed ingest leaves the entry in the note.

## Steps

Copy this checklist into the reply and tick it off:

```text
Obsidian videos progress:
- [ ] 1 Queue listed and shown
- [ ] 2 User picked entries (duplicates: redo or skip decided)
- [ ] 3 Each pick ingested as a Tier 2 deep dive with its remarks as focus
- [ ] 4 Each ingested entry removed from the note
- [ ] 5 Commit (summary of the whole batch in the reply)
After step 4, return to step 3 for the next pick. If an ingest aborts, skip step 4 for that entry and return to step 3.
```

**1. List.** Run `python3 scripts/obsidian-videos.py list`. On `"status": "error"`, show the message and stop; `AI_VIDEOS_NOTE=<path>` overrides the vault search when the note was renamed or there are several. An empty `entries` list means the queue is empty: say so and stop.

**2. Show and ask.** One numbered line per entry: label (or "untitled"), URL, remarks in quotes or "no remarks", and **already ingested** with the file when `duplicate` is non-empty. Ask which to ingest (`1 3`, `all`). For a duplicate the user picked, confirm redo or skip, as the ingest duplicate rule requires.

**3. Ingest each pick, one at a time.** Run the `ingest` skill's Tier 2 on the entry's `url`, with the label and remarks as the user's notes, through every step: metadata confirmation, extraction plan, connect, index, log. "quick" from the user switches to Tier 1, where the remarks steer what the summary emphasises. Done when the log entry is written.

**4. Remove.** Run `python3 scripts/obsidian-videos.py remove <video_id or url>` for that entry. If it errors, tell the user the entry is still in the note and continue.

**5. Commit.** Commit the wiki changes per standing git rules (the vault is outside the repo). End with which entries were ingested and removed, and which stayed and why.
