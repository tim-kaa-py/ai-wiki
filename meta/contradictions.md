# Open Contradictions Ledger

Tensions deferred for later resolution: option `(q)` at the CONNECT step of ingest, and tensions queued by `wiki-tension-triage`. `lint` drains this file first: each `Status: open` entry gets the tension menu again with a fresh AGENT'S READ.

**Append-only.** Resolved entries stay as an audit trail. Never delete entries.

Entry format, anchor rule and resolve procedure: `.claude/skills/connect/tension-handling.md` → "Ledger schema". That file is authoritative; do not copy the schema here.

---

## 2026-07-08-claude-routines-trigger-count
- **Page:** wiki/tools/claude-routines.md
- **Topic:** Four vs three routine trigger types (is webhook a first-class trigger?)
- **Existing:** "Routines close that gap with four trigger types: schedule, webhook, API call, and GitHub event." (line 21; repeated at line 191) — summaries/2026-04-14_nick-saraev_claude-code-routines.md
- **New:** "Three canonical trigger types per Anthropic's docs (May 2026), each combinable in a single routine:" (line 29; table lists Schedule, API, GitHub event) — summaries/2026-05-06 Anthropic docs summary cited on the page
- **Status:** resolved
- **Queued by:** retroactive triage sweep on 2026-07-08
- **Resolution:** (a) accept new — online verification against code.claude.com/docs/en/routines (2026-07-08) confirmed exactly three trigger types (schedule, API, GitHub event); webhook is the wiring (per-routine API endpoint / chaining), not a type. Lines 21 and 193 corrected, deprecation footnote added. 2026-07-08
- **Agent's read (at queue time):** strong recommendation (a) — the later, authoritative Anthropic docs enumerate three types and treat webhook as the routine-chaining mechanism (page line 65 already frames it that way); fix lines 21 and 191 to the three-type framing with a deprecation footnote. Strongest argument against: Saraev's walkthrough demonstrated a distinct webhook trigger in the product UI, so the docs may have folded a real surface into "API".

## 2026-10-15-claude-code-shift-tab-mode-cycle

- **Page:** wiki/tools/claude-code.md
- **Topic:** Shift+Tab permission-mode cycle order vs auto mode as starting mode and the renamed Manual mode
- **Existing:** "| `Shift+Tab` | Cycle permission modes (default → auto-accept → plan) |" (line 100) — summaries/2026-05-06_claude-code-docs_how-claude-code-works.md
- **New:** "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions" … "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." / "Switch to Manual mode when you want to approve edits and commands yourself." — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md lines 204, 207)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** no strong recommendation — your call (q) — the new page names auto as the starting mode and "Manual" as the approve-yourself mode but gives no Shift+Tab cycle order, so a correct replacement row needs the permission-modes doc. Strongest argument against: a visibly stale row stays on the page until then. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-auto-mode-default-framing

- **Page:** wiki/how-tos/claude-code-auto-mode.md
- **Topic:** Auto mode framed as an opt-in third strategy vs the built-in starting permission mode
- **Existing:** "Auto mode is Anthropic's third permission strategy for Claude Code — a safer alternative to `--dangerously-skip-permissions` that replaces permission fatigue with a two-stage classifier." (line 16); "Auto mode is the right default when:" (line 22) — summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions" … "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md line 207)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (d) — auto mode is now where sessions start (v2.1.283+, or Pro/Max/Team on earlier versions), so the "when to use" section should become "when to stay in auto vs switch to Manual". Strongest argument against: (a) with a footnote is simpler and may be enough. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-permissions-three-strategies

- **Page:** wiki/how-tos/claude-code-permissions.md
- **Topic:** Three complementary strategies with auto mode as an opt-in flag vs auto as the starting mode
- **Existing:** "Anthropic's canonical guidance is that Claude Code offers **three complementary permission strategies** — not one right answer:" (line 86); "These compose. Power-user setup: `/permissions` allowlist for routine commands, `--permission-mode auto` for long autonomous runs, `/sandbox` as the outer ring when running unknown scripts." (line 94) — summaries/2025-04-18_anthropic_claude-code-best-practices.md, summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions" … "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." / "Two tools cut those interruptions in Manual mode and apply in auto mode as well" — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md lines 207, 209)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (d) — with auto as the starting mode, allowlist and sandbox become tools that reduce prompts in Manual mode and also apply in auto, rather than three peer strategies with auto opted into for long runs. Strongest argument against: the tools still compose, so a version qualifier under (c) may suffice. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-three-permission-strategies

- **Page:** wiki/tools/claude-code.md
- **Topic:** Three-strategies table lists auto mode as an opt-in flag for long runs vs auto as the starting mode
- **Existing:** "Anthropic's canonical guidance: Claude Code offers **three complementary permission strategies**, not one right answer. Compose them." (line 291); "| **Auto mode** | `--permission-mode auto` | Long autonomous runs; classifier gates each action |" (line 296) — summaries/2025-04-18_anthropic_claude-code-best-practices.md, summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions" … "On earlier versions, auto mode is the built-in starting permission mode only on Pro, Max, and Team plans." / "Two tools cut those interruptions in Manual mode and apply in auto mode as well" — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md lines 207, 209)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (d) — same framing problem as wiki/how-tos/claude-code-permissions.md; reframe in step with it. Strongest argument against: this section duplicates the permissions how-to, so it may be better to shrink it to a link to the resolution of meta/contradictions.md#2026-10-15-claude-code-permissions-three-strategies. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-auto-mode-denial-halt

- **Page:** wiki/how-tos/claude-code-auto-mode.md
- **Topic:** Agent halts after 3 consecutive / 20 total denials vs -p runs not stopping
- **Existing:** "After **3 consecutive** or **20 total** denials, the agent halts. This prevents a stuck agent from repeatedly probing the guard." (line 49) — summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "When the classifier repeatedly blocks actions in a non-interactive run with the `-p` flag, Claude Code doesn't stop the run. See when auto mode falls back for what happens instead and for the thresholds." — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md line 537, link markup removed)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (c) — the new page says non-interactive `-p` runs do not stop but defers the thresholds and the fallback behaviour to the permission-modes doc, so both claims may hold for different session types. Strongest argument against: resolving it properly needs the permission-modes doc, which states the actual thresholds. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-permissions-denial-halt

- **Page:** wiki/how-tos/claude-code-permissions.md
- **Topic:** Agent stops after 3 consecutive / 20 total denials vs -p runs not stopping
- **Existing:** "Escalation halt: after 3 consecutive or 20 total denials, the agent stops." (line 104) — summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "When the classifier repeatedly blocks actions in a non-interactive run with the `-p` flag, Claude Code doesn't stop the run. See when auto mode falls back for what happens instead and for the thresholds." — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md line 537, link markup removed)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (c) — same as meta/contradictions.md#2026-10-15-claude-code-auto-mode-denial-halt: the halt may still apply interactively while `-p` runs fall back instead. Strongest argument against: needs the permission-modes doc for the thresholds. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-denial-halt

- **Page:** wiki/tools/claude-code.md
- **Topic:** Escalation halt after 3 consecutive / 20 total denials vs -p runs not stopping
- **Existing:** "Escalation halt after 3 consecutive or 20 total denials." (line 301) — summaries/2026-03-25_anthropic_claude-code-auto-mode.md
- **New:** "When the classifier repeatedly blocks actions in a non-interactive run with the `-p` flag, Claude Code doesn't stop the run. See when auto mode falls back for what happens instead and for the thresholds." — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md line 537, link markup removed)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (c) — same as meta/contradictions.md#2026-10-15-claude-code-auto-mode-denial-halt. Strongest argument against: needs the permission-modes doc for the thresholds. To be resolved after ingesting the Claude Code permission-modes docs page (code.claude.com/docs/en/permission-modes).

## 2026-10-15-claude-code-custom-subagents-claude-agents-command

- **Page:** wiki/how-tos/claude-code-custom-subagents.md
- **Topic:** `claude agents` lists configured subagents vs opens agent view to dispatch background sessions
- **Existing:** "Use `claude agents` to list everything currently configured." (line 33) — summaries/2026-04-25_claude-code-docs_create-custom-subagents.md
- **New:** "Agent view: research preview. Run `claude agents` to dispatch sessions that keep running in the background and watch them from one screen" — summaries/2026-10-14_claude-code-docs_best-practices.md (sources/docs/2026-10-14_claude-code-docs_best-practices.md line 480, link markup removed)
- **Status:** open
- **Queued by:** ingest of 2026-10-14_claude-code-docs_best-practices on 2026-10-15
- **Resolution:**
- **Agent's read (at queue time):** lean toward (q) — the newer page is explicit that `claude agents` now opens agent view, but whether it still lists configured subagents needs the agent-view and subagents docs. Strongest argument against: the newer doc is explicit and (a) would fix the page now.
