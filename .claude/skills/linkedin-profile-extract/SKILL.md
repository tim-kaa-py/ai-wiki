---
name: linkedin-profile-extract
description: "Extracts or refreshes the user's own LinkedIn profile: the full profile by default (per-section snapshots plus a structured YAML), or one section such as About, Experience or Skills. Use on '/linkedin-profile-extract', 'extract my LinkedIn', 'update my LinkedIn profile', 'refresh my profile data', 're-extract my profile', 'snapshot my experience section'. Not for other people's profiles, job listings or company pages, and not for drafting posts (linkedin-post, linkedin-url-post, linkedin-gist-post). Proxy: needs the author-private linkedin/ module."
---

# linkedin-profile-extract (proxy)

This is a **proxy skill**. The real `linkedin-profile-extract` skill lives in the author-private [`linkedin-workspace`](https://github.com/tim-kaa-py/linkedin-workspace) module, which mounts at `linkedin/` inside this repo when present. See [`docs/private-modules.md`](../../../docs/private-modules.md) for the private-module pattern.

## Guard (run first, no exceptions)

Check whether `${CLAUDE_SKILL_DIR}/../../../linkedin/.claude/skills/linkedin-profile-extract/SKILL.md` exists. The path is anchored to this skill's folder (three levels up is the ai-wiki repo root) so the check holds whatever the working directory is; a check relative to the working directory would report the module missing whenever the session started elsewhere.

**If the file does NOT exist:** print exactly the message below and **stop**. Do not attempt to do any of the work yourself. Do not fall back to a generic browser-automation workflow. Do not improvise, and do not offer workarounds: no editing this proxy or the module, no unofficial or draft fallback, no alternative tool, even if the user asks for one. The real workflow carries the author's voice and rules, so a substitute would pass for output it is not.

```
The `linkedin-profile-extract` skill is an author-private extension of this wiki, provided by the
`linkedin-workspace` module. It is not available on this machine.

See `docs/private-modules.md` for the private-module pattern. If you need access to this
workflow, contact the author.
```

**If the file DOES exist:** proceed to Dispatch.

## Dispatch

Read `${CLAUDE_SKILL_DIR}/../../../linkedin/.claude/skills/linkedin-profile-extract/SKILL.md` and follow it verbatim. Resolve every path in the real skill from the ai-wiki repo root, and do not `cd` into `linkedin/`: the real skill's paths are written relative to the ai-wiki root, so from inside `linkedin/` they would point at the wrong files.
