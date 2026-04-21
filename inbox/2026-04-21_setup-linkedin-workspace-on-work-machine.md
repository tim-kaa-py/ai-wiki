# Setup note — clone linkedin-workspace on this (work) machine

**Audience:** Claude Code running in an `ai-wiki` session on Tim's work machine.
**Author:** Tim, via Claude on the home machine, 2026-04-21.
**Action:** Read, execute the steps, then delete this file from `inbox/` (per the ai-wiki operational norm: inbox is ephemeral).

## Context

The `linkedin-post` skill and all LinkedIn publishing content have been moved out of the public `ai-wiki` into a private subrepo: **`tim-kaa-py/linkedin-workspace`** (GitHub, private). It mounts at `ai-wiki/linkedin/` and is gitignored by ai-wiki.

A **proxy skill** remains at `ai-wiki/.claude/skills/linkedin-post/SKILL.md`. When invoked on a machine where `linkedin/` is missing, it prints an "author-private extension" notice and stops. To make `/linkedin-post` work on this (work) machine, clone the private subrepo into place.

See `docs/private-modules.md` for the full pattern.

## Prerequisites

- `gh` CLI installed and authenticated as `tim-kaa-py` with `repo` scope. Verify:
  ```
  gh auth status
  ```
  If not authenticated: `gh auth login` (choose GitHub.com, HTTPS, and scope including `repo`).

## Steps

Run from the ai-wiki repo root.

1. **Confirm you're at ai-wiki root and the slot is empty:**
   ```
   test -f CLAUDE.md && test -f .claude/skills/linkedin-post/SKILL.md || echo "NOT at ai-wiki root"
   test ! -e linkedin || echo "linkedin/ already exists — stop and ask"
   ```

2. **Clone the private subrepo into `linkedin/`:**
   ```
   gh repo clone tim-kaa-py/linkedin-workspace linkedin
   ```

3. **Verify it's gitignored by ai-wiki (should NOT show up in `git status`):**
   ```
   git status
   ```
   `linkedin/` should not appear as untracked. If it does, something's off with `.gitignore` — stop and ask.

4. **Verify the proxy will dispatch correctly:**
   ```
   test -f linkedin/.claude/skills/linkedin-post/SKILL.md && echo "OK — proxy will dispatch" || echo "FAIL — file missing"
   ```

5. **Sanity-check the real skill:** open `linkedin/CLAUDE.md` and skim it so you know the contract (path conventions, confidentiality-scan rule on generated posts, no auto-commit).

6. **Delete this inbox file** and commit the removal in ai-wiki:
   ```
   git rm "inbox/2026-04-21_setup-linkedin-workspace-on-work-machine.md"
   git commit -m "Process inbox: linkedin-workspace setup completed on work machine"
   git push
   ```

## Expected end state

- `ai-wiki/linkedin/` is populated, has its own `.git` pointing at `tim-kaa-py/linkedin-workspace`.
- `ai-wiki` treats `linkedin/` as gitignored (invisible to `git status` in ai-wiki).
- `/linkedin-post` invoked from this ai-wiki session dispatches to the real skill in the subrepo.
- Inbox is empty again.

## If something goes wrong

- **`gh auth status` shows not logged in:** run `gh auth login`, ensure `repo` scope.
- **Clone says "repository not found":** the account on this machine may not match `tim-kaa-py`, or lacks access. Check `gh auth status` for the logged-in user.
- **`linkedin/` appears in `git status` of ai-wiki:** `linkedin/` is missing from ai-wiki's `.gitignore`. Check the file, add it if absent, but do not commit the directory.

If in doubt, stop and ask Tim.
