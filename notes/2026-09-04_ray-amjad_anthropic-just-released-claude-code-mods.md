# Ingest Notes

**Source:** [Anthropic Just Released Claude Code Mods](https://www.youtube.com/watch?v=B-YQANvDOq0)

## User Focus

- Function hooks and how they let you fully customize the Claude Code harness: rewrite inputs, short-circuit, override built-in tools, draw UI, ask the user, call models, make HTTP calls, share state between hooks (00:33–04:42, 07:33–09:08, 13:04–13:20, 14:08–14:40, 15:39–16:19).
- Anthropic now calls this **Claude Code mods** (launched 2026-10-01, v2.1.287) and it is the next big step. Relate the video to the official mods launch: the rename ("function hooks" → mods; "hook" = a mod's handler; the old kind = "settings hook"), Observe / Rewrite / Answer, the early-access flag now ignored, `plugin-authoring` as a built-in mod, built-in and sample mods, and the official security model.
- Exclude the sales segments (08:44–11:29, 14:40–14:59, outro).

## Confirmed Discoveries

- **A. Why hooks at all (00:52–01:21):** CLAUDE.md rules fade as the context fills and lazy prompts get misread; hooks add deterministic control (supabase-guard PreToolUse example).
- **B. Secret redaction by ID substitution (04:46–07:28), as a worked example of using a mod:** the hook replaces a pasted secret with an ID before it enters the transcript, keeps it in the mod's in-memory store, and swaps it back when a request goes out (compared to Infisical Agent Proxy).

## Research Context (quick research, 2026-10-05)

- Mods overview: https://code.claude.com/docs/en/plugins/mods/overview
- Create a mod: https://code.claude.com/docs/en/plugins/mods/create
- Launch write-up: https://postcutoff.com/e/2026-10-01-claude-code-mods/
