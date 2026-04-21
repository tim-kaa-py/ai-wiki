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

| Path | Purpose |
|------|---------|
| `linkedin/` | LinkedIn publishing and profile management. Skill: `linkedin-post`. |

More may be added over time.

## If you want to use a private module

Private modules are author-private by default. They exist because their content is personal (publishing artifacts, drafts, profile copy) rather than public knowledge. If you have a genuine reason to want access — for example, you're collaborating with the author on the relevant workflow — contact the author.

## If you want to adapt the pattern for your own fork

The pattern is simple and worth copying:

1. Put your private content in a separate git repo.
2. Clone it into `<parent-repo>/<module-name>/`.
3. Add `<module-name>/` to the parent repo's `.gitignore`.
4. At the canonical skill path in the parent, write a proxy `SKILL.md` that: (a) hard-guards on the private module path, (b) on success says "Read `<module>/.claude/skills/<name>/SKILL.md` and follow it verbatim. All paths resolve relative to the parent repo CWD."
5. Document the pattern (like this page) so future readers know what to expect.

This keeps public repos genuinely public, keeps private content genuinely private, and preserves invocation UX — the user invokes the skill the same way whether the private module is mounted or not.
