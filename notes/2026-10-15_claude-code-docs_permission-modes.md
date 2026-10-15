# Ingest Notes

**Source:** [Choose a permission mode](https://code.claude.com/docs/en/permission-modes)

## User Focus

- Resolve the tensions queued in `meta/contradictions.md` on 2026-10-15 by the best-practices re-ingest:
  - Starting mode by version, surface and plan; Manual as the UI name for `default`; modes as a baseline with rules layered on top, the sandbox as a separate axis (T4–T6, "three permission strategies" with auto mode as an opt-in)
  - The Shift+Tab cycle order and mode names (T3, "default → auto-accept → plan")
  - What happens on repeated classifier blocks, interactive vs `-p` (T7–T9, "after 3 consecutive or 20 total denials, the agent halts")
  - `claude agents` (T10): not mentioned on this page, stays open

## Confirmed Discoveries

- **A. Protected paths:** writes to `.git`, `.claude`, `.vscode`, shell rc files, `.mcp.json` and similar are never auto-approved except in bypassPermissions; allow rules don't pre-approve them.
- **C. Boundaries and approvals stated in conversation:** a stated boundary blocks matching actions until lifted, but is re-read from the transcript, so compaction can lose it; a deny rule is the hard guarantee. Approvals must name the specifics.
- **D. Server-side classifier review:** classification happens inside the session's own model requests; no verdict means denied, the turn stops after 10 straight no-verdict responses; `CLAUDE_CODE_AUTO_MODE_SERVER=0` opts out.
- **E. What entering auto changes:** broad allow rules (`Bash(*)`, interpreter wildcards, `Agent`, `Monitor`) are dropped and restored on exit; the default block list and allow list; `claude auto-mode defaults` prints them.

Declined: B (critical paths), to keep the summary lean.
