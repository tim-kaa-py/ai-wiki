---
title: "Claude Desktop App (Code Tab)"
type: "tool"
description: "The Claude desktop app's Code tab as a working surface: session rail, sections, nested and master sessions, side chats, split view, artifacts, slash commands and shortcuts, with the practical tip for each."
pillar: "building"
tags: [claude-code, claude, workflow, best-practices, desktop-app, artifacts]
sources:
  - "summaries/2026-10-28_robonuggets_anthropic-just-shipped-claude-2-0-master-it-in-17-minutes.md"
timestamp: "2026-11-01"
---

# Claude Desktop App (Code Tab)

The Claude desktop app now shows only two tabs, **Chat** and **Code**. Jay E (RoboNuggets, 2026-10-28) argues the Code tab is the default surface even for non-developers: Anthropic ships its best updates there, and you direct it in plain English, so the word "code" is a misnomer. He bills the October 2026 revamp as "Claude 2.0", a name he says one of Anthropic's lead engineers used; the video gives no source for it. *(Source: Jay E / RoboNuggets, 2026-10-28, 00:00-01:28)*

The Code tab runs [Claude Code](claude-code.md), so everything on that page (CLAUDE.md, skills, subagents, permission modes, [mods](claude-code-mods.md)) applies here. This page covers what the desktop surface adds on top. Unless marked otherwise, every claim below comes from that one feature tour and has not been checked against Anthropic's docs.

## Session Rail

A panel on the right of a Code session, opened with **Show session rail** (top right). It is made of cards: *(01:28-03:29)*

| Card | Shows |
|------|-------|
| **Environment** | Which folder the chat works in, local or cloud, and the remote-control switch |
| **Context** | How full the context window is and what fills it |
| **Connectors** | The apps plugged into Claude |
| **Outputs** | Every file the chat made |

**How to apply:**

- **Turn remote control on for every new session.** Settings → Claude Code → *Connect new sessions to remote control*, so any session can be continued from your phone. Pair it with *Keep computer awake while Claude works* so long tasks don't stop when the machine sleeps. (The terminal equivalent is `--remote-control` per session; see [Claude Code § Session Mobility](claude-code.md#session-mobility).)
- **Watch the context card for preloaded weight.** Memory files, skills and MCP connectors load into every new chat and count against usage from the first prompt; the card shows how much each takes next to your own messages. Check it now and then and trim whatever has grown too large. This is the visual counterpart of `/context` and of the baseline table in [Claude Code § Context Window Token Budget](claude-code.md#context-window-token-budget).

## Sections

Folders in the left sidebar. ⋯ next to a chat → *Move to new section*, name it, then drag other sessions in: one section per project, client or business area instead of scrolling through 50 chats. A master session (below) can create sections and move chats for you. *(03:29-03:56)*

## Nested Sessions vs Sub-agents

A session can start its own sessions. They sit underneath it in the sidebar and report back to the session that started them when they finish. Each is a real chat you can open, read and keep working in. *(03:56-05:10)*

The creator's contrast with sub-agents:

| | Sub-agent | Nested session |
|--|-----------|----------------|
| Shape | A one-way order: gets a prompt, returns a result | A full chat under the parent session |
| Can you steer it mid-task? | No: you can peek at its progress but not talk to it | Yes: open it and redirect it |
| Reports back | Its summary returns to the caller | Reports to the parent session when finished |

**Rule:** prefer nested sessions over sub-agents when you may want to steer. Ask Claude to do several tasks at once and to start a nested session for each (his example: sales page, emails and ads for one campaign), then jump into the one you want to steer.

Do not confuse this with *nested subagents* (a subagent spawning its own subagents), covered on [Claude Code Custom Subagents § Nested Subagents](../how-tos/claude-code-custom-subagents.md#nested-subagents-subagents-can-now-spawn-subagents). The trade-off the video does not mention: a sub-agent's file reads stay out of the parent's context and only its summary comes back, which is the reason sub-agents exist; how much of a nested session flows back into the parent is not stated.

## Master Session

Because one Claude Code session can see the others, a single pinned session can act as a personal assistant over all of them: it reads the other chats, summarises what is waiting on you, starts new sessions and steers them, and sorts chats into sections. *(05:10-06:25)*

**How to apply:** pin one session to the top and tell Claude it is your master session. Ask it which critical decisions your other chats are waiting on, let it start and control new sessions, or have it tidy chats into sections. Per the video, it sees your **20 most recently active sessions** by default; ask it to look further back if needed.

This is an attention-triage surface in the same family as the agent view and Remote Control on [Claude Code § Parallel Sessions](claude-code.md#parallel-sessions), where the binding constraint is the number of sessions one person can actively steer.

## Side Chats

A separate chat window opened next to the main session that can read the whole main session. Open one from ⋯ at the top right or with `/btw`. Unlike the old `/btw`, which opened a throwaway chat, side chats are saved, and you can keep as many as you want. *(08:44-09:36)*

> **Desktop app only.** In the terminal CLI and the VS Code extension, `/btw` still opens a dismissible overlay that is not saved (author's hands-on check, 2026-11-01; see [Agentic Coding Workflow](../how-tos/agentic-coding-workflow.md)). The saved, unlimited side chats described here are a desktop app feature.

**Rule:** ask side questions in a side chat, not the main chat. "How long until this finishes?" in the main chat interrupts the work and spends more tokens. Use the side chat to have Claude explain what it has done so far or to check status.

## Split View

Several chats on one screen. Option-click (Alt on Windows) a chat in the sidebar, or right-click → *Open in split view*. Cmd+minus (Ctrl+minus) zooms out to fit up to ten chats, but the creator's own warning is that this floods your attention: **start with two side by side.** *(09:36-10:19)*

## Artifacts

What Claude's docs, slides, design, dashboard and motion tools produce: a shared canvas you and Claude work on together, which takes comments for Claude to fix and can be published as a live link or shared with a team or client. *(10:19-13:07)*

| Artifact type | Per the video |
|---------------|---------------|
| **Docs** | Work like Google Docs: you and Claude write the same document together |
| **Slides** | Export to PowerPoint or present straight from Claude |
| **Design** | Claude's answer to Canva; upload your design system in settings or bring it in through a skill. See [Claude Design](claude-design.md) for the standalone tool |
| **Dashboards** | Pull live data from connected apps, so the numbers are current every time the link opens |
| **Claude Motion** | Animated videos made with code instead of a video model: no per-generation cost and easier to tweak |

**Plan availability (per the video, "for now"):** on Pro or Max you get everything shown except Claude Motion.

**Rule:** use artifacts instead of separate tools when the output is a document, deck, design or dashboard someone else will open.

### AI-Powered Artifacts

Artifacts with Claude inside them, so the page itself can answer questions with an LLM. Switch on under **Settings → Capabilities → AI-powered artifacts**.

**How to apply:** ask Claude to add a chat window or search bar to a shared team dashboard, so teammates who don't use Claude Code can ask questions of its data from the link.

## Slash Commands Worth Knowing

The creator's picks, with his one-line description of each. *(13:07-14:38)*

| Command | What it does (per the video) |
|---------|------------------------------|
| `/doctor` | Checks your setup (settings, `CLAUDE.md`) and offers to fix problems. Fuller list on [Claude Code § `/doctor`](claude-code.md#doctor--setup-health-check) |
| `/skill-doctor` | Shows what each skill costs in context and how often you use it, so you can switch off unused ones |
| `/advisor` | Lets a cheaper model (e.g. Sonnet) call a stronger one (Opus or Fable) only for decisions it deems critical |
| `/insights` | Report on how you use Claude Code, plus a feature to try |
| `/recap` | One-line summary of where a chat is up to |
| `/rewind` | Goes back to an earlier point in the chat (undo); `Esc Esc` triggers it |
| `/btw` | Opens a side chat (desktop app; a throwaway overlay in the terminal and VS Code) |
| `/output-style` | Changes how Claude talks to you, e.g. a shorter, plainer, non-technical style; you can ask Claude to write your own. See [Claude Code Output Styles](../how-tos/claude-code-output-styles.md) |

## Keyboard Shortcuts

| Shortcut | What it does |
|----------|--------------|
| Ctrl+Alt+Space | Opens Claude from anywhere on the computer, in a new chat |
| Esc Esc | Triggers `/rewind` |
| Ctrl+D | Voice dictation instead of typing |
| Ctrl+/ (Cmd+/ on Mac) | Lists every shortcut |
| Option/Alt-click a chat | Opens it in split view |
| Cmd+minus / Ctrl+minus | Zooms out to fit more split-view panes |

*(15:55-16:54)*

## Mods in the Desktop App

Mods draw in the terminal and the Desktop Code tab (see [Claude Code Mods § Where Mods Run](claude-code-mods.md#where-mods-run)). The creator's advice is to build mods for whatever you check all the time, by describing the mod to Claude; his two examples are on the mods page. *(14:38-15:55)*

## Related Pages

- [Claude Code](claude-code.md) — the harness the Code tab runs
- [Claude Code Mods](claude-code-mods.md) — UI and behaviour add-ons; the creator's ribbon and progress mods
- [Claude Code Custom Subagents](../how-tos/claude-code-custom-subagents.md) — the one-way delegation nested sessions are contrasted with
- [Claude Design](claude-design.md) — the standalone design tool behind the Design artifact type
- [Claude Code Output Styles](../how-tos/claude-code-output-styles.md) — changing how Claude talks to you
- [Focus Maxing](../concepts/focus-maxing.md) — Remote Control and attention as the scarce resource
- [Parallel Agent Patterns](../concepts/parallel-agent-patterns.md) — orchestration patterns behind master and nested sessions
