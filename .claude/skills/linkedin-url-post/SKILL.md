---
name: linkedin-url-post
description: Proxy to the author-private LinkedIn module (see docs/private-modules.md). Turn a raw URL (video, podcast, article) straight into a LinkedIn post without wiki ingest. Use when a URL comes with a posting intent: "share this on LinkedIn", "post this", "LI post for <url>". Not for summaries/ paths (that is linkedin-post).
---

# linkedin-url-post (proxy)

This is a **proxy skill**. The real `linkedin-url-post` skill lives in the author-private [`linkedin-workspace`](https://github.com/tim-kaa-py/linkedin-workspace) module, which mounts at `linkedin/` inside this repo when present. See [`docs/private-modules.md`](../../../docs/private-modules.md) for the private-module pattern.

## Guard (run first, no exceptions)

Check whether `linkedin/.claude/skills/linkedin-url-post/SKILL.md` exists at the ai-wiki repo root (the current working directory).

**If the file does NOT exist:** print exactly the message below and **stop**. Do not attempt the work yourself. Do not fall back to a generic LinkedIn draft.

```
The `linkedin-url-post` skill is an author-private extension of this wiki, provided by the
`linkedin-workspace` module. It is not available on this machine.

See `docs/private-modules.md` for the private-module pattern. If you need access to this
workflow, contact the author.
```

**If the file DOES exist:** proceed to Dispatch.

## Dispatch

Read `linkedin/.claude/skills/linkedin-url-post/SKILL.md` and follow it verbatim. All paths in the real skill resolve relative to the ai-wiki repo root (CWD). Do not `cd` into `linkedin/`.
