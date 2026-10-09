---
title: "Claude Mods Is The Biggest Claude Code Upgrade Since Skills"
type: "summary"
description: "Chase AI's short post-launch explainer of Claude Code mods: always-on plugins that intercept any event before, instead of, after or around it, and add custom UI such as a next-steps pane and a cache clock, plus a session-audit prompt for designing your own."
channel: "Chase AI"
date: "2026-10-02"
resource: "https://www.youtube.com/watch?v=Rn4nmFRPe0s"
pillar: "building"
tags: [claude-code, claude-mods, plugins, hooks, workflow]
timestamp: "2026-10-09"
source_file: "sources/youtube/2026-10-02_chase-ai_claude-mods-biggest-claude-code-upgrade.md"
---

# Claude Mods Is The Biggest Claude Code Upgrade Since Skills — Summary

**Source:** Chase AI | 2026-10-02 | [Link](https://www.youtube.com/watch?v=Rn4nmFRPe0s) | 9:11

## TL;DR

Chase AI explains Claude Code mods the day after launch, aimed at users rather than plugin authors. The key points: a mod is never invoked. Once it's installed it runs on every matching event until you remove it. It can step in before an event, replace it, act after it, or wrap both sides, and it can add UI that didn't exist before. The most useful idea here, and one the Ray Amjad video doesn't have, is how to decide *which* mods to build: have Claude audit your last 30 sessions and suggest five.

## Video Structure

1. [00:00-00:42] Intro: "everything is a plugin, but for Claude Code itself" — rewrite events, change the UI, add features
2. [00:42-01:06] Origin: the released version of the "function hooks" experiment Boris Cherny tweeted about in early September
3. [01:06-01:33] Range: from a multiplayer Doom server while you wait to live project progress bars
4. [01:37-03:31] How mods intercept events: before / replace / after / wrap, with four mods on one "delete this folder" action
5. [03:40-04:06] Sponsor segment (his own course), skipped
6. [04:08-04:22] Mods run on the plugin system and are listed under `/plugins`
7. [04:27-05:37] UI example 1: a next-steps pane with three clickable follow-up prompts
8. [05:37-07:04] UI example 2: a cache clock with a cold-cache countdown and a compact button; same in Desktop and terminal
9. [07:04-08:38] Build your own: the session-audit prompt, then Claude builds and installs the mod; mods run like hooks, not like skills
10. [08:39-09:11] Prediction: a mods ecosystem like the skills ecosystem; outro

## Key Concepts

### Mod

In Chase's framing, a mod is a way to "control and edit and customize Claude Code itself" (00:06): anything Claude is about to do can be changed by a mod (01:37). He groups three abilities under it: rewriting events, changing the UI, and adding or editing whole features (00:22). This matches the official definition (a plugin of JS/TS event handlers), but Chase never shows code or the mods API. His explainer stays at the level of behaviour.

### The four intercept points

Chase's model of how a mod hooks into an event (01:57-02:20):

| Intercept point | What the mod does | His "delete the build folder" example |
|-----------------|-------------------|---------------------------------------|
| **Before** | Runs something before the event executes | Pause and show the 41 files about to be deleted |
| **Replace** | Changes the event itself | Send the files to the recycle bin instead of deleting them permanently |
| **After** | Runs something after the event | Show a receipt: "deleted these 41 files, here's where they were" |
| **Wrap** | Runs on both sides | Back the files up first, so the delete can be undone |

**Difference from the docs' wording.** The official docs describe what a hook *does* with an event: **Observe / Rewrite / Answer**. Chase describes *when* it runs relative to the event. The two map onto each other: "replace" covers Rewrite and Answer, while "before", "after" and "wrap" are a handler doing work around a call to `next`, which is how you Observe or add side effects. They're two views of the same middleware model, not two different models.

### Mod vs. skill vs. hook

Chase's answer to "when do you invoke it?" (08:19-08:32): you don't. "This isn't a skill that you have to invoke. It acts similar to a hook, which is automatically going to be done… it's just going to keep working until you uninstall the mod." A skill is pulled in when it's needed. A mod, like a settings hook, fires every time its event happens.

## Key Takeaways

1. **Mods run on their own once installed.** There is no trigger phrase and no slash command to run them. They act on every matching event until you disable or uninstall them (08:19-08:32).
   **How to apply:** Pick something you currently do by prompting *every* time, such as asking for next steps or checking how stale the cache is. That's what a mod is for. Something you want only sometimes is better as a skill or a slash command.

2. **Any event can be changed at four points: before, replace, after, wrap** (01:57-03:09). One event such as a delete can carry very different mods: a preview, a safer alternative, a receipt, or backup-plus-undo.
   **How to apply:** Pick one risky action (delete, push, deploy) and decide which point you want. Use *before* for visibility, *replace* to make it safer, *after* for a record, and *wrap* to make it reversible.

3. **Mods can add UI that never existed in Claude Code** (04:27-07:04).
   - *Next-steps pane* (04:27-05:34): after a task, a custom pane offers three clickable next prompts, such as commit or polish the design. It replaces the single preloaded prompt in the input bar. Chase's reasoning: why have one suggestion when you may not know which way you want to go?
   - *Cache clock* (05:48-07:04): a countdown to when the prompt cache goes cold, with a button to compact before you step away. Chase says the cache lasts one hour on a subscription and gives about a 95% discount. That's his figure, not checked here; Anthropic's API pricing lists cache reads at 0.1× the base input price.
   - Chase says these work the same in the Desktop app and the terminal (05:42). The docs agree: drawing works in the terminal and the Desktop Code tab, but not in headless runs.
   **How to apply:** Small mods are fine. A countdown or a pane of buttons is "essentially a custom status line adjacent thing" (06:56), so start there before attempting a full workflow.

4. **Let Claude find your mods for you: audit your sessions** (07:19-08:15). Claude already knows how to generate and install mods, and only needs direction. The audit he ran came back with ideas for demo rehearsals, project tracking, a mod doctor, a cache clock, an undo module and a dictation fixer.
   **How to apply:** Run the audit prompt below in Claude Code, pick one suggestion, and say "implement number N". Claude creates the plugin and installs it, then you reload plugins.

5. **Turn mods off the same way you'd ask for anything else** (08:32-08:38): "turn that mod off" or "remove it". They're plugins, so they also show up in the plugin manager.
   **How to apply:** Use natural language for quick toggles. Use `/plugin` (Chase says `/plugins`) to see everything that's installed.

## Argument Structures

**Why mods are "the biggest upgrade since skills" (00:00-00:28, 03:23-03:31, 08:39-08:56)**

- Premise: Until now you could only "jerry-rig" behaviour changes with hooks and skills.
- Premise: Mods reach the harness's "plumbing": any event and any part of the UI.
- Premise: Claude can already write and install mods from plain language, so building one is cheap.
- Conclusion: An ecosystem will grow around mods the way it did around skills. The most valuable mods will still be the ones fitted to your own workflow, which is why he recommends the audit.
- **Not addressed:** Chase doesn't mention the security model. Mods run unsandboxed with your permissions and can pre-approve tool calls (see the [Claude Code Mods](../wiki/tools/claude-code-mods.md) wiki page). That matters a lot for his "ecosystem on GitHub" prediction: installing other people's mods is installing unsandboxed code.

## Notable Commands / Code Snippets

**Session-audit prompt** (07:25-07:37, his wording):

```text
Audit how I use Claude Code. Read my last 30 sessions. See what I ask for
over and over, and then suggest five Claude Code mods that would fix these issues.
```

Follow-up (08:07-08:12):

```text
I like the idea for mod number 1. Let's go ahead and implement that.
```

Then reload plugins (`/reload-plugins`). Before installing anything Claude generated, `claude plugin validate ./mod` lists what the mod hooks and calls (this comes from the docs, not the video).

## User Notes

- Focus: **when a mod runs** (it doesn't need invoking; it runs like a hook, unlike a skill), **what mods can do** (rewrite events, change the UI, add features), **changing the UI** (next-steps pane, cache clock), and **intercepting events** (before / replace / after / wrap, on the delete example).
- Confirmed discovery A: the session-audit prompt for designing your own mods.
- Sponsor segment excluded (03:40-04:06).

## Related Topics

claude-code, claude-mods, plugins, hooks, workflow, ui, event-interception, session-audit
