# Private Modules

This wiki is public, but the author uses it as a base for workflows that are not. Some functionality (skills, content, publishing workflows) lives in **private extension repos** that mount inside this repo at specific paths and are gitignored — so they're present on the author's machine but absent in this public clone.

This doc explains the pattern so you know what you're seeing if you spot a skill that "exists" but refuses to run.

## The pattern

1. A skill lives at its canonical path inside `ai-wiki` — e.g. `.claude/skills/<name>/SKILL.md`.
2. That file is a **proxy**: a thin skill definition with a hard guard that checks whether the private module is mounted at the expected path (e.g. `ai-wiki/<module>/`).
3. If the private module is **not present**, the proxy prints a terse "author-private extension" message and stops. No silent fall-through, no pretending to work.
4. If the private module **is present**, the proxy dispatches to the real skill inside it (typically `<module>/.claude/skills/<name>/SKILL.md`) and the real workflow runs.

The private module's directory is listed in `ai-wiki/.gitignore`, so it never enters the public history.

## How to recognize a private module

- The skill's `SKILL.md` in the public repo is short and contains a guard checking for a gitignored directory.
- The gitignored directory name appears in `.gitignore` but nowhere in `git ls-files`.
- Running the skill on a clone that doesn't have the private module produces the "author-private extension" message.

## What's private (currently)

| Path | Purpose | Proxy skills |
|------|---------|--------------|
| `linkedin/` | LinkedIn publishing and profile management — drafting posts from wiki summaries, gists, or raw URLs, and snapshotting the author's own profile sections. | `linkedin-post`, `linkedin-gist-post`, `linkedin-url-post`, `linkedin-profile-extract` |

More may be added over time.

## If you want to use a private module

Private modules are author-private by default. They exist because their content is personal (publishing artifacts, drafts, profile copy) rather than public knowledge. If you have a genuine reason to want access — for example, you're collaborating with the author on the relevant workflow — contact the author.

## If you want to adapt the pattern for your own fork

The pattern is simple and worth copying:

1. Put your private content in a separate git repo.
2. Clone it into `<parent-repo>/<module-name>/`.
3. Add `<module-name>/` to the parent repo's `.gitignore`.
4. At the canonical skill path in the parent, write a proxy `SKILL.md` (see `.claude/skills/linkedin-post/SKILL.md` for a complete one) with:

   - **A quoted, third-person `description`** that leads with the job ("Drafts a LinkedIn post from …"), lists the trigger phrases, names the sibling skills it is *not* for ("Not for raw URLs (linkedin-url-post) or gists (linkedin-gist-post)"), and ends with `Proxy: needs the author-private <module>/ module.` The sibling exclusions keep related proxies from stealing each other's requests.
   - **A guard that runs first**, checking `${CLAUDE_SKILL_DIR}/../../../<module>/.claude/skills/<name>/SKILL.md`. Anchoring the path to the skill's own folder (three levels up is the parent repo root) keeps the check correct whatever the working directory is; a path relative to the working directory reports the module missing whenever the session started elsewhere.
   - **On a miss**, the same short "author-private extension … not available on this machine … see `docs/private-modules.md` … contact the author" message in every proxy, then stop. Say why the proxy must not improvise: the real workflow carries the author's voice and rules, so a generic substitute would pass for output it is not.
   - **On a hit**, a dispatch: "Read `${CLAUDE_SKILL_DIR}/../../../<module>/.claude/skills/<name>/SKILL.md` and follow it verbatim." Resolve every path in the real skill from the parent repo root and do not `cd` into the module, because the real skill's paths are written relative to the parent root.

5. Document the pattern (like this page) so future readers know what to expect.

This keeps public repos genuinely public, keeps private content genuinely private, and preserves invocation UX — the user invokes the skill the same way whether the private module is mounted or not.
