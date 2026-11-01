---
title: "Anthropic Just Shipped Claude 2.0 (Master it in 17 minutes)"
type: "summary"
description: "Feature tour of the revamped Claude desktop app: session rail, sections, nested and master sessions, side chats, split view, artifacts, new slash commands, mods and keyboard shortcuts, with the practical tip for each."
channel: "Jay E | RoboNuggets"
date: "2026-10-28"
resource: "https://www.youtube.com/watch?v=yMnFHFf43Qg"
pillar: "building"
tags: [claude-code, claude, workflow, best-practices, tutorial]
timestamp: "2026-11-01"
source_file: "sources/youtube/2026-10-28_robonuggets_anthropic-just-shipped-claude-2-0-master-it-in-17-minutes.md"
---

# Anthropic Just Shipped Claude 2.0 (Master it in 17 minutes) — Summary

**Source:** Jay E | RoboNuggets | 2026-10-28 | [Link](https://www.youtube.com/watch?v=yMnFHFf43Qg) | 17:06

## TL;DR

A walkthrough of eleven updates to the Claude desktop app, which the video bills as "Claude 2.0" (the creator says one of Anthropic's lead engineers used the name; the video gives no source). Its value is the small, concrete tip attached to each feature: which setting to switch on, which click or shortcut opens it, and when to prefer it over the older mechanism (nested sessions over sub-agents, side chats over interrupting the main chat). This summary covers every chapter except Claude Code Projects.

## Video Structure

1. [00:00-01:28] Intro — the app now has only Chat and Code; switch to Code.
2. [01:28-03:29] Session rail — environment, context, connectors and outputs cards.
3. [03:29-03:56] Sections — folders in the left sidebar.
4. [03:56-05:10] Nested sessions — sessions that start sub-sessions; contrast with sub-agents.
5. [05:10-06:25] Master session — one pinned session that reads and steers the others.
6. [06:25-08:44] Claude Code Projects and a community promo (not covered here, by choice).
7. [08:44-09:36] Side chats — `/btw` questions without interrupting the main session.
8. [09:36-10:19] Split view — several chats on one screen.
9. [10:19-13:07] Docs, Slides and more — artifacts, plan availability, AI-powered artifacts.
10. [13:07-14:38] Slash commands — seven commands worth knowing.
11. [14:38-15:55] Mods — two example mods.
12. [15:55-16:54] Keyboard shortcuts and outro.

## Key Concepts

### Session rail

A panel on the right of a Code session (open it with **Show session rail**, top right) made of cards: the **environment** card (which folder the chat works in, local or cloud, plus the remote-control switch), the **context** card (how full the context window is and what fills it), a **connectors** card (the apps plugged into Claude) and an **outputs** card (every file the chat made).

### Nested sessions

A session can start its own sessions, which sit underneath it in the sidebar and report back to the session that started them when they finish. Each is a real chat you can open, read and keep working in.

### Master session

Because one Claude Code session can see the others, a single pinned session can act as a personal assistant over all of them: it reads the other chats, summarises what is waiting on you, starts new sessions and steers them, and sorts chats into sections.

### Side chat

A separate chat window opened next to the main session that can read the whole main session. Unlike the old `/btw`, which opened a throwaway chat, side chats are saved, and you can keep as many as you want.

### Artifacts

What Claude's docs, slides, design, dashboard and motion tools produce: a shared canvas you and Claude work on together, which takes comments for Claude to fix and can be published as a live link or shared with a team or client.

### AI-powered artifacts

Artifacts with Claude inside them, so the page itself can answer questions with an LLM (switch on under **Settings → Capabilities**).

### Mods

Small add-ons that change how the Claude Code app looks or works, built by describing them to Claude.

### Prompt cache

Short-term memory Claude keeps during a chat so it does not reread the whole conversation on every message. After about an hour it goes cold, and the next message rereads everything at normal cost.

## Key Takeaways

1. **Work in the Code tab, even as a non-developer.** The desktop app now shows only Chat and Code, and Anthropic ships its best updates in Code. You direct it in plain English, so the word "code" is a misnomer.
   - **How to apply:** Switch to the Code tab as your default surface.
2. **Turn remote control on for every new session.** The environment card's remote-control switch lets you continue a session from your phone.
   - **How to apply:** Settings → Claude Code → *Connect new sessions to remote control*, plus *Keep computer awake while Claude works* so long tasks don't stop when the machine sleeps.
3. **Watch the context card for preloaded weight.** Memory files, skills and MCP connectors load into every new chat and count against your usage from the very first prompt; the card shows how much space each takes, next to your own messages. Models now have a 1M-token window.
   - **How to apply:** Check the card now and then, and trim memory files, skills or connectors that grow too large.
4. **Group chats into sections.** ⋯ next to a chat → *Move to new section*, name it, then drag other sessions in: one section per project, client or business area instead of scrolling through 50 chats.
   - **How to apply:** Or ask a master session to create the section and move the chats for you.
5. **Prefer nested sessions over sub-agents when you may want to steer.** A sub-agent is a one-way order: it gets a prompt and returns a result, and you can peek at its progress but not talk to it. A nested session is a real chat you can open and redirect.
   - **How to apply:** Ask Claude to do several tasks at once and to start a nested session for each (for example sales page, emails and ads for one campaign), then jump into the one you want to steer.
6. **Set up a pinned master session.** Pin one session to the top and tell Claude it is your master session.
   - **How to apply:** Ask it which critical decisions your other chats are waiting on, let it start and control new sessions, or have it tidy chats into sections. It sees your 20 most recently active sessions by default; ask it to look further back if needed.
7. **Ask side questions in a side chat, not the main chat.** Asking "how long until this finishes?" in the main chat interrupts the work and spends more tokens.
   - **How to apply:** ⋯ at the top right or type `/btw`; ask it to explain what Claude has done so far or to check the status.
8. **Use split view to watch several chats at once, but start small.**
   - **How to apply:** Option-click (Alt on Windows) a chat in the sidebar, or right-click → *Open in split view*. Zooming out with Cmd+minus fits up to ten chats, but that floods your own attention; start with two side by side.
9. **Use artifacts instead of separate tools.** Docs work like Google Docs; Slides export to PowerPoint or present straight from Claude; Design is Claude's answer to Canva and, per the creator, is moving in for good: the video states the standalone claude.ai/design site closes on 14 December; dashboards pull live data from connected apps, so the numbers are current every time the link opens; Claude Motion makes animated videos with code instead of a video model, cheaper (no per-generation cost) and easier to tweak.
   - **How to apply:** Upload your design system in settings, or bring it in through a skill.
10. **On Pro or Max you get everything shown except Claude Motion** (for now).
11. **Make shared dashboards answer questions.** With AI-powered artifacts on, ask Claude to add a chat window or search bar to a team dashboard, so teammates who don't use Claude Code can ask questions of its data from the shared link.
   - **How to apply:** Settings → Capabilities → *AI-powered artifacts*, then ask Claude to add the chat box.
12. **Learn seven slash commands.**
   - **How to apply:** see the table under Notable Commands.
13. **Build mods for what you check all the time.** The creator's "ribbon" shows remaining weekly usage and whether the chat's prompt cache is warm or cold, which helps avoid an expensive cold reread; "savvy progress" adds a progress bar above the chat box and, for big jobs, a live panel of every sub-agent.
   - **How to apply:** Describe the mod you want to Claude.
14. **Learn the keyboard shortcuts.** They save time if you use Claude a lot.
   - **How to apply:** see the shortcut table under Notable Commands.

## Notable Commands / Code Snippets

| Command | What it does |
|---|---|
| `/output-style` | Changes how Claude talks to you, e.g. a shorter, plainer, non-technical style; you can ask Claude to write your own. |
| `/doctor` | Checks your setup (settings, `CLAUDE.md`) and offers to fix problems. |
| `/skill-doctor` | Shows what each skill costs in context and how often you use it, so you can switch off unused ones. |
| `/advisor` | Lets a cheaper model (e.g. Sonnet) call a stronger one (Opus or Fable) only for decisions it deems critical. |
| `/insights` | Report on how you use Claude Code, plus a feature to try. |
| `/recap` | One-line summary of where a chat is up to. |
| `/rewind` | Goes back to an earlier point in the chat (undo). |
| `/btw` | Opens a side chat. |

| Shortcut | What it does |
|---|---|
| Ctrl+Alt+Space | Opens Claude from anywhere on the computer, in a new chat. |
| Esc Esc | Triggers `/rewind`. |
| Ctrl+D | Voice dictation instead of typing. |
| Ctrl+/ (Cmd+/ on Mac) | Lists every shortcut. |
| Option/Alt-click a chat | Opens it in split view. |
| Cmd+minus / Ctrl+minus | Zooms out to fit more split-view panes. |

## User Notes

- Captured every tip from all chapters except Claude Code Projects, which was out of scope by choice.

## Related Topics

claude-code, claude, workflow, best-practices, tutorial
