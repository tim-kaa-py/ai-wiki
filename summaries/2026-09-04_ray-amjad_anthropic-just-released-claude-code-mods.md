---
title: "Anthropic Just Released Claude Code Mods"
type: "summary"
description: "Ray Amjad's early-access tour of Claude Code function hooks (launched on 2026-10-01 as Claude Code mods): middleware-style JS/TS handlers that can observe, rewrite or answer any harness event, draw UI, ask the user, call models and keep state, with secret redaction by ID substitution as the main worked example."
channel: "Ray Amjad"
date: "2026-09-04"
resource: "https://www.youtube.com/watch?v=B-YQANvDOq0"
pillar: "building"
tags: [claude-code, hooks, function-hooks, claude-mods, plugins, workflow, safety]
timestamp: "2026-10-05"
source_file: "sources/youtube/2026-09-04_ray-amjad_anthropic-just-released-claude-code-mods.md"
---

# Anthropic Just Released Claude Code Mods — Summary

**Source:** Ray Amjad | 2026-09-04 | [Link](https://www.youtube.com/watch?v=B-YQANvDOq0) | 16:53

## TL;DR

Ray Amjad demos **function hooks**, an early-access Claude Code feature that turns hooks from shell scripts that can only allow or block into **middleware**. A handler can rewrite a prompt or tool call, answer it without running the tool, swap out built-in tools, draw panes and status rows, ask the user questions, call a model or an HTTP endpoint, and share state with other handlers. The harness becomes fully programmable. Four weeks later (2026-10-01, v2.1.287) Anthropic shipped the feature as **Claude Code mods**: on by default, with built-in and sample mods and a documented security model. That makes this video an early hands-on preview of what is probably the biggest extensibility step in Claude Code since plugins. The idea that matters most: any rule you rely on should move out of CLAUDE.md and into a mod, which now runs deterministically and can also shape what Claude sees.

## Video Structure

1. [00:00-00:47] Intro: function hooks as "the best feature in Claude Code yet" (brief sale mention at 00:37)
2. [00:47-01:50] Why hooks at all: CLAUDE.md rules fade and get misread, hooks add deterministic control (supabase-guard example)
3. [01:50-02:19] Limits of existing shell hooks: they can't rewrite, inject context, draw UI, ask, add or edit tools, or remember anything
4. [02:19-04:42] The middleware model: Express.js analogy, regex block, npm → pnpm rewrite, WebFetch cache short-circuit, WebSearch → Exa override, WebFetch via proxy
5. [04:42-07:33] Worked example: secret, email and IP redaction by ID substitution, built with `/plugin-authoring`
6. [07:33-08:44] UI example: a Vercel deploy-status row next to the prompt, with a hide/show button
7. [08:44-11:29] Self-promotion (course sale, cohorts, sandboxing product), skipped
8. [11:29-14:08] Idea catalogue: dry-run gate, prod/dry banner, "refactor this >1,000-line file?" ask, Haiku-summarised TTS at turn end, clock-based long-turn saves, compliance audit log, newsletter send gate
9. [14:08-14:40] Move CLAUDE.md rules into hooks, and share them as plugins
10. [14:40-14:59] Self-promotion (team training), skipped
11. [14:59-16:19] TTS hook demo after `/reload-plugins`; `$model` + `$http` for knowledge-base context injection; a PR-understanding quiz before opening a PR
12. [16:19-16:53] Outro and sale, skipped

## Key Concepts

### Function hooks / mods

In Ray's framing (02:19), function hooks are Express.js-style middleware for Claude Code. A handler receives an event (a tool call, a prompt, a UI render), then either passes it on with `next`, passes on a modified version, or stops it. The official name since 2026-10-01 is **mod**: "a plugin that changes how Claude Code looks and behaves… made of JavaScript or TypeScript event handlers" ([overview](https://code.claude.com/docs/en/plugins/mods/overview)). **Divergence:** Ray uses "function hook" for both the feature and a single handler. The docs call the package a *mod* and each handler inside it a *hook*.

### Settings hook vs. mod

The kind of hook that already existed (shell commands in `settings.json`, such as PreToolUse) is now officially called a **settings hook**. Ray's list of what it can't do (01:50-02:19) is the reason mods exist: no rewriting, no added context, no UI, no asking, no tool changes, no memory. A settings hook is still the lighter, sandbox-friendly choice for a simple gate. A mod is the only extension type that can draw UI or rewrite events.

### Middleware model: Observe / Rewrite / Answer

The docs list three things a hook can do with an event. Each one matches one of Ray's demos:

- **Observe**: watch and pass through (the audit log to a compliance store, 13:25)
- **Rewrite**: change it and call `next` (npm → pnpm, 02:55)
- **Answer**: short-circuit with a result and never run the tool (WebFetch cache hit, 03:11; Exa replacing WebSearch, 03:35)

Blocking is a special case of Answer. Ray calls it "short-circuiting".

### Mod store / shared state

Ray describes two stores (07:09-07:23). One is a variable store that later hooks and turns in the same session can read: module-level variables, the "in-memory store" in his redaction hook. The other persists across sessions and restarts, and Ray says secrets should not go there. The docs confirm that hooks share module-level variables. The persistent store is Ray's description from early access; check the current API before relying on it.

### Mods API primitives

Ray names `$model` (call a model such as Haiku from inside a hook, 15:33), `$http` (query an endpoint such as a company knowledge base, 15:49), UI drawing (rows, panels, buttons, 07:33), `ask` (hold a tool call and ask the user, 11:58), tool registration and calls (13:09), and a clock (13:14). The docs add an important point. **Everything a mod does outside its own code goes through the mods API**: drawing, adding commands, calling models, reading files, spawning processes, using the network. That is why `claude plugin validate` can list a mod's `hooks:` and `calls:` before you install it.

### `plugin-authoring` skill

A built-in skill ("Write or debug a Claude Code plugin made of function hooks", 05:24) that writes the mod for you from a plain-language request. It can also interview you and offer prototypes first (08:16). In the official launch it is listed as a **built-in mod (skill only)**. Ray uses it to build every example in the video.

## Key Takeaways

1. **CLAUDE.md rules are probabilistic, hooks are deterministic.** Rules near the top of the context fade as the session grows, and lazy prompts get misread (00:52-01:21).
   **How to apply:** Run `/plugin-authoring`, point it at your CLAUDE.md, and ask "which hooks can we make here to ensure more reliable deterministic behaviour?" (14:17). Then remove the rules that became hooks.

2. **Override built-in tools instead of fighting them through instructions.** Claude keeps using WebSearch even after being told to use the Exa MCP. A mod that answers WebSearch calls through the Exa API, and falls back to the normal tool when there is no key or the call fails, removes the need for the MCP server entirely (03:35-04:17).
   **How to apply:** For any "use X instead of Y" rule you repeat often, write a mod that intercepts Y and routes it to X, with a fallback to Y.

3. **Use Rewrite for repeated small mistakes.** For example, npm → pnpm (02:55).
   **How to apply:** Rewrite the tool input in `tool.call` instead of blocking it and leaving Claude to retry.

4. **Keep secrets out of the transcript instead of cleaning up after a leak.** Redact them to IDs at input time and swap them back at request time (04:46-07:05). See the worked example below, and its official-docs caveat.
   **How to apply:** Build a redaction mod with `/plugin-authoring`. Treat it as a way to keep the transcript clean, not as a security control.

5. **Event-scoped UI turns background state into something you can see.** Example: a Vercel deploy row that appears only while a deploy runs and stays for an hour afterwards (07:39-09:08).
   **How to apply:** For anything you currently check in another tab (CI, deploys, prod/dry mode), ask `/plugin-authoring` to draw it as a band or pane. Ask it to interview you and show prototypes first.

6. **`ask` adds a human checkpoint where a rule would be ignored.** Examples: a dry run before a real run (11:33), "refactor this file?" once it passes 1,000 lines (12:02), confirming a newsletter send plus a minimum reading time (13:49), and a quiz about the changes before a PR can be opened (16:05).
   **How to apply:** Find the irreversible actions in your workflow and hold each one behind a mod that asks first.

7. **`$model` + `$http` can enrich context automatically.** Generate keywords from the prompt with a small model, query an internal knowledge base, and add the results to the session (15:44-16:02).
   **How to apply:** Use this as a lightweight alternative to a retrieval MCP server for team knowledge, as long as the endpoint is trusted.

8. **Mods are plugins, so team standards can be shared** through a shared GitHub repo or marketplace (14:35).
   **How to apply:** Put shared guards and UI in a team plugin repo, and run `claude plugin validate` before anyone installs it.

## Argument Structures

**Why deterministic hooks beat CLAUDE.md rules (00:52-01:26, 14:17-14:35)**

- Premise: Rules in CLAUDE.md and the system prompt lose influence as the context fills.
- Premise: Users write lazy prompts that Claude can misread into dangerous actions.
- Premise: Defined workflows aren't reliably followed.
- Conclusion: Anything that must hold every time belongs in a hook, which runs regardless of what the model attends to. CLAUDE.md shrinks to guidance, and enforcement moves into `hooks.json`.
- Ray doesn't mention a cost: every rule moved into a mod becomes code to maintain, with the full permissions of a mod (see the security section).

**Why middleware over tools removes the need for MCP servers like Exa (03:30-04:23)**

- Premise: Adding a tool (an MCP server) doesn't stop Claude from choosing the built-in one it prefers.
- Premise: A mod can intercept the built-in tool call itself.
- Therefore: Replace the *implementation* behind the tool Claude already uses (Answer, with a fallback to `next`) instead of adding a competing tool.
- Conclusion: The MCP server can be removed. You save the tool-description tokens and the routing problem.
- Ray leaves one point implicit: this works only because the mod returns results in the shape the built-in tool returns, so Claude never notices the swap.

**Why function hooks are "my favourite feature" (14:08-14:17, 16:19)**

- Settings hooks could only gate, while mods can gate, rewrite, answer, draw, ask and remember. Together these primitives make "most of what you want to do" possible (08:21). Claude Code becomes hackable in the way a game becomes moddable, and the official rename to "mods" says the same.

## From Function Hooks to Claude Code Mods

The video was recorded during early access (2026-09-04). Anthropic launched the feature on **2026-10-01 in Claude Code v2.1.287**. Below, each line is marked as coming from the video, the docs, or both.

**Naming (docs).** "Function hooks" are now **mods**. "Hook" now means one handler inside a mod. The `settings.json` kind is now called a **settings hook** ([overview](https://code.claude.com/docs/en/plugins/mods/overview)).

**Enabling (video vs. docs).**

- *Video:* launch with `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 claude` (05:18).
- *Docs:* mods are **on by default**. "If you set CLAUDE_CODE_ENABLE_FUNCTION_HOOKS during early access, remove it. Claude Code v2.1.287 and later ignores it."

**Event model (both).** Ray's middleware picture maps one-to-one onto the docs' **Observe / Rewrite / Answer**.

**File layout (video vs. docs).**

- *Video:* Ray's generated mod appeared in `.claude/` as `plugins.json`, `transcript_redactor.json`, `hooks.json` and `redact.ts` (06:04).
- *Docs:* the canonical structure is `.claude-plugin/plugin.json`, `hooks/hooks.json`, and a hooks module that exports `register(on)` ([create](https://code.claude.com/docs/en/plugins/mods/create)). Expect current `/plugin-authoring` output to follow the docs' layout.

**What mods can do (docs, extending the video).**

- Draw panes beside the transcript and bands above the prompt, with tabs, buttons and text fields.
- Redraw Claude Code's own UI (tool rows, spinner, ask dialog), but **not the permission prompt**.
- Hold a tool call while asking the user, answer without running the tool, or route a request to a different model.
- Add `/commands` that run code with no Claude turn.
- Share data between hooks.

**Where they run (docs).**

- Hooks run everywhere, including `claude -p`, the Agent SDK and cloud sessions.
- **Drawing works only in the terminal and the Desktop Code tab.** Ray's deploy row won't appear in headless runs, but his redaction hook will still work there.

**Built-in mods (docs).** Anthropic dogfoods mods for its own features. The source is public at `github.com/anthropics/claude-code/tree/main/mods`:

- `/diff`
- AGENTS.md loading
- telemetry
- `sec-default` (an organisation guard)
- **`plugin-authoring`** (skill only), the skill Ray uses throughout
- `you-should-know` (a side agent, off by default)

**Sample mods (docs).** These live in `anthropics/claude-code-playground`:

- **token-weather**: a band that forecasts context usage
- **blast-radius**: holds risky shell commands, shows what they would change, then lets you proceed or cancel. This is the official version of Ray's dry-run idea.
- **replay-theater**: `/replay` replays the last turn's edits

**Security model (docs; Ray barely touches this).** Ray presents mods as a way to *add* safety. The docs stress that mods are powerful in both directions:

- Mods run **with your permissions and are not sandboxed**. The Bash sandbox doesn't cover processes a mod starts.
- They can read environment variables and secrets, and see every prompt and tool call.
- They can rewrite prompts and tool calls, submit prompts, and spend usage.
- They can **approve tool calls before you are asked, including ones an `ask` rule or your own PreToolUse hook blocked.** A mod can therefore override the settings-hook guards Ray recommends at 01:26.

**Off-switches (docs).**

- Disable the plugin in `/plugin`.
- Use `--safe-mode` for one session.
- Set `"disableAllHooks": true`.
- Organisations can set `allowManagedModsOnly`.
- Built-in mods ignore these switches.

**Before installing (docs).** Install only from trusted marketplaces, and run `claude plugin validate ./mod` to see the mod's `hooks:` and `calls:` first.

**Mods compared with other extensions (docs).** A mod is the only extension type that can draw UI. The docs recommend it for panes, bands, custom commands and rewriting events. Use a settings hook for simple gates, a skill for instructions, and MCP for external tools.

## Worked Example: Secret Redaction by ID Substitution

The video's clearest example of a mod that does work no settings hook could do (04:46-07:28).

**The problem.** A Bash command or a paste puts a secret (an API key, an email address, an IP address) into the session transcript. After that, the only fixes are deleting the transcript or rotating the secret.

**What Ray asked for (05:34):**

> "Can you make me a function hook that will basically block any secrets from entering the session transcript by measuring the entropy and also make another one to block emails and anything that looks like an IP address."

**What `/plugin-authoring` produced (06:04):** a plugin in `.claude/` made of `plugins.json`, `transcript_redactor.json`, `hooks.json`, and `redact.ts`. The `redact.ts` hook is about 300 lines, with an in-memory store at the top of the module. It went further than asked: instead of only blocking secrets, it made them *usable without Claude ever seeing them*.

**The flow:**

1. **Paste.** Ray pastes an Anthropic API key and asks Claude to call Sonnet 5 for a short story (06:20).
2. **Redact to ID (Rewrite on prompt submit).** Before the prompt enters the transcript, the hook detects the high-entropy string and replaces it with an ID (06:30).
3. **Store in mod memory.** The real value goes into a module-level variable that later hooks and turns can read, but that is never written to the transcript (06:34-06:40). Ray says not to use the persistent cross-session store for this (07:19).
4. **Claude works with the ID.** The request Claude writes contains the placeholder ID, not the key (06:45).
5. **Swap back at request time (Rewrite on tool call).** When the tool call runs, the hook replaces the ID with the real secret, and the request succeeds (06:50-06:55).

Ray compares this to **Infisical's Agent Proxy**, which injects secrets into outgoing agent requests (07:23).

**How to use it yourself:** Run `/plugin-authoring`, ask for an entropy-based secret redactor plus email and IP redaction with ID substitution, read the generated module, run `claude plugin validate` on it, then `/reload-plugins` and test with a dummy key.

**Caveat from the official docs: this protects the transcript, not the secret.**

- The redactor keeps the key out of the session log and out of the model's context. That is worthwhile: fewer leaks through transcripts, shared sessions and compaction.
- **It is not a security boundary.** A mod runs with your permissions, unsandboxed, and can read environment variables and secrets. The redactor holds the plaintext secret itself, and any other installed mod could read it from its own process access.
- Claude can still cause the real secret to be *used* through the ID, because the hook substitutes it into any matching request. Check what the swap-back step will send and where.
- Treat it as transcript hygiene. Don't rely on it to protect against a malicious mod or a prompt-injected exfiltration through a request that the hook itself unredacts.

## Notable Commands / Code Snippets

**A complete hooks module, from the official [mods overview](https://code.claude.com/docs/en/plugins/mods/overview) (verbatim).** It counts tool calls (Observe) and adds the count to the spinner (Rewrite of Claude Code's own UI). The two hooks share the `calls` variable, which is the "in-memory store" Ray describes:

```javascript
// The count, shared by the two hooks below
let calls = 0

// Claude Code calls this once when the mod loads
export function register(on) {
  // Runs each time Claude is about to use a tool
  on('tool.call', async ($, e, next) => {
    calls += 1
    // Ask Claude Code to draw the interface again, so the new count shows
    $.ui.invalidate('ui.render')
    // Let the tool run as usual
    return next(e)
  })

  // Runs each time Claude Code draws the spinner
  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    // Keep Claude Code's spinner, with the count added after its word
    return next({ ...e, props: { ...e.props, suffix: ' · tool calls: ' + calls + '…' } })
  })
}
```

**Ray's prompts to `/plugin-authoring`:**

```text
/plugin-authoring Can you make me a function hook that will basically block any secrets
from entering the session transcript by measuring the entropy and also make another one
to block emails and anything that looks like an IP address.

/plugin-authoring Can you make me a hook that will basically show me next to the prompt
status bar, the current Vercel deploy and the stage that it's on and how long it's been
building for. And once the deploy is complete for the next hour, keep that on the bottom.
And as we add new deploys, then that should pile up. Feel free to interview me, give me a
bunch of prototypes I can play with before finally coding this up.

/plugin-authoring Can you make me a function hook that will basically ask me every time a
file that you're editing [is over 1,000 lines] whether the file should be refactored ...

/plugin-authoring Can you make me a hook that will basically speak every time a turn ends,
but first pass it to a Haiku model to give a summary of everything that was done?
```

**Lifecycle commands:**

```bash
/reload-plugins                 # hot-reload a mod after editing (15:04)
claude plugin validate ./mod    # list a mod's hooks: and calls: before installing (docs)
claude --plugin-dir ./my-mod    # load a mod's directory for one session (docs)
claude --safe-mode              # run one session with mods off (docs)
```

**Outdated, early access only (now ignored):**

```bash
# Used in the video (05:18). Claude Code v2.1.287+ ignores this; mods are on by default.
CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 claude
```

## User Notes

- Focus: function hooks as **full customisation of the Claude Code harness**. They can rewrite inputs, short-circuit, override built-in tools, draw UI, ask the user, call models, make HTTP calls, and share state between hooks.
- Anthropic now calls this **Claude Code mods** (launched 2026-10-01, v2.1.287), and it's the next big step. The video is read here against the official launch: the rename, Observe/Rewrite/Answer, the flag that's now ignored, `plugin-authoring` as a built-in mod, the built-in and sample mods, and the security model.
- Confirmed discovery A: why hooks at all. CLAUDE.md rules fade and lazy prompts get misread, so deterministic control is needed (supabase-guard).
- Confirmed discovery B: secret redaction by ID substitution as the worked example of using a mod (compared with Infisical Agent Proxy).
- Sales segments excluded (08:44-11:29, 14:40-14:59, outro).

## Related Topics

claude-code, hooks, function-hooks, claude-mods, plugins, workflow, safety, deterministic-control, middleware, secrets-management, context-engineering
