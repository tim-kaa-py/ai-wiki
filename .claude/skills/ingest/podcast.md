# Podcast episodes

Read when the source is a podcast episode (Apple Podcasts, Spotify, RSS or any episode link). Podcasts run Tier 2; this file replaces Steps 1, 3, 5 and 6 of SKILL.md. Everything else (duplicate check, slug, save, frontmatter with `type: podcast` in `sources/podcasts/`, summary template, scans, connect, index, log) follows the shared path in SKILL.md.

**Content lens.** This wiki focuses on AI in software development. Give the Step 5 sub-agent this lens: how AI changes development practices and workflows, tools introduced or compared, shifts in engineers' mental models, concrete techniques and anti-patterns. Most episodes map to `building` or `ecosystem`; use `understanding` when the discussion shifts mental models rather than explaining ML theory.

## Step 1 — Metadata

WebFetch the directory page for episode title, show name, guests, publication date and canonical URL. If the page is not fetchable, ask the user for title, show and date. Confirm the metadata with the user.

## Step 3 — Transcript acquisition

Try in order and stop at the first success. The order runs from most to least faithful: an author transcript is verbatim and speaker-labelled, captions come next, local speech recognition makes proper-noun errors.

1. **Author-published transcript.** Find the author-published transcript on the show's website or Substack and extract it verbatim; `extraction_method: web-fetch`.
2. **YouTube mirror.** Find the episode's YouTube mirror with yt-dlp; check `which yt-dlp` first (suggest install if missing). If it is the same episode, run `python scripts/extract-transcript.py "<youtube-url>"` and take `extraction_method` from its output.
3. **Local transcription.** `python scripts/transcribe-audio.py "<episode-or-youtube-url>"`, same contract as SKILL.md Step 3: it deletes the temp audio, never installs anything, and returns `status: "error"` when it cannot run.
4. **Manual paste.** Only when local transcription returns `status: "error"`, ask the user to paste the transcript (or the part to capture); `extraction_method: user-pasted`. Pasted content is not obviously public, so run Step 0 on it before saving.

If the user has no transcript to paste either, stop rather than guess. Done when the transcript is in hand with its `extraction_method`.

## Step 5 — Section menu (Opus sub-agent)

Episodes are long and wide-ranging, so the user picks sections instead of the focus interview. Spawn with `model: "opus"`, giving the source path and the content lens: *"Read the transcript. Identify 5-8 substantial sections or topic clusters that carry the episode's main threads. For each: a short title, its position (timestamp, or Early/Mid/Late), and 1-2 sentences on what it covers."* It returns:

```text
A. [Early] Title of section
   What's covered in 1-2 sentences.

B. [Mid] Title of section
   ...
```

Show the list and ask: *"Which sections do you want in the summary? Reply `all`, or letters (e.g. `A C E`)."* Done when the user has answered.

## Step 6 — Notes

Save to `notes/<slug>.md`:

```markdown
# Ingest Notes

**Source:** [<Title>](<URL>)

## Selected Sections
<!-- the sections the user chose, or "All sections" -->

## Section List
<!-- full lettered list from Step 5, chosen ones marked -->
```

The Step 7 summary covers the selected sections only, since those are what the user chose to keep, and gets the Step 0 summary scan like every ingest.
