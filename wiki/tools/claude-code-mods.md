---
title: "Claude Code Mods"
type: "tool"
description: "Claude Code mods (formerly function hooks): plugins made of JavaScript/TypeScript event handlers that can observe, rewrite or answer any harness event, draw UI, ask the user, call models and keep state."
pillar: "building"
tags: [claude-code, hooks, function-hooks, claude-mods, plugins, workflow, safety, middleware, deterministic-control]
sources:
  - "summaries/2026-09-04_ray-amjad_anthropic-just-released-claude-code-mods.md"
timestamp: "2026-10-05"
---

# Claude Code Mods

A **mod** is "a plugin that changes how Claude Code looks and behaves… made of JavaScript or TypeScript event handlers" ([official overview](https://code.claude.com/docs/en/plugins/mods/overview)). It turns Claude Code's hooks from shell scripts that can only allow or block into **middleware**: a handler can rewrite a prompt or tool call, answer it without running the tool, replace built-in tools, draw panes and status rows, ask the user, call a model or an HTTP endpoint, and share state with other handlers.

The feature ran in early access as **function hooks** (enabled with `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1`) and launched as mods on **2026-10-01 in Claude Code v2.1.287**, on by default. Most of what this page knows comes from Ray Amjad's early-access tour (2026-09-04), read against the official launch docs. *(Source: Ray Amjad, 2026-09-04)*

## Terminology After the Launch

| Term | Meaning since v2.1.287 |
|------|------------------------|
| **Mod** | The package: a plugin whose hooks are JS/TS event handlers |
| **Hook** | One handler inside a mod |
| **Settings hook** | The older kind: a shell command, HTTP call, prompt or agent configured in `settings.json` (PreToolUse, Stop, etc.) |
| **Function hook** | Early-access name for the feature; Ray uses it for both the package and a single handler |

Pages on this wiki written before October 2026 say "hook" and mean what is now a **settings hook**. Claims there about exit codes, JSON output and the four hook types still hold for settings hooks. See [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md).

## Settings Hook vs Mod vs Skill vs MCP

| Extension | What it is | Best for |
|-----------|-----------|----------|
| Settings hook | Shell/HTTP/prompt/agent handler in `settings.json` that gates or adds context | Simple, sandbox-friendly gates (block a path, format after edit) |
| Mod | JS/TS middleware with the mods API | Panes, bands, custom commands, rewriting or answering events, anything stateful |
| Skill | Instructions loaded on demand | Knowledge of *how* to do a task (advisory) |
| MCP server | External tools exposed to Claude | Giving Claude a new capability |

A mod is the only extension type that can draw UI or rewrite events. Ray's list of what settings hooks cannot do is the reason mods exist: no rewriting, no added context beyond fixed hook outputs, no UI, no asking, no tool changes, no memory. *(Source: Ray Amjad, 2026-09-04, with official docs)*

## The Middleware Model: Observe, Rewrite, Answer

Ray frames mods as Express.js-style middleware: a handler gets an event, then passes it on with `next`, passes on a modified version, or stops it. The docs name the three moves:

| Move | What the hook does | Example |
|------|-------------------|---------|
| **Observe** | Watch the event and pass it through | Audit log to a compliance store |
| **Rewrite** | Change the event and call `next` | Rewrite `npm` to `pnpm` in a Bash call |
| **Answer** | Return a result without running the tool | Serve WebFetch from a cache; answer WebSearch through the Exa API |

Blocking is a special case of Answer ("short-circuiting").

**Override the tool, don't add a competing one.** Claude keeps preferring WebSearch even when told to use an Exa MCP server. A mod that answers WebSearch calls through Exa, falling back to the normal tool when there is no key or the call fails, removes the need for the MCP server and its tool-description tokens. It works because the mod returns results in the shape the built-in tool returns, so Claude never notices the swap. *(Source: Ray Amjad, 2026-09-04, 03:35-04:23)*

## Mods API Primitives

Everything a mod does outside its own code goes through the mods API: drawing, adding commands, calling models, reading files, spawning processes, using the network. That is why `claude plugin validate` can list a mod's `hooks:` and `calls:` before you install it.

| Primitive | Use |
|-----------|-----|
| `$model` | Call a model (e.g. Haiku) from inside a hook |
| `$http` | Query an endpoint (e.g. a company knowledge base) |
| UI drawing | Panes beside the transcript, bands above the prompt, rows, tabs, buttons, text fields; redraw Claude Code's own tool rows, spinner and ask dialog (**not** the permission prompt) |
| `ask` | Hold a tool call and ask the user |
| Tools | Register tools and call them |
| Clock | Time-based triggers (e.g. saves during long turns) |
| Commands | `/commands` that run code with no Claude turn |
| Shared state | Module-level variables shared by the hooks of a mod |

Ray also describes a persistent cross-session store from early access and says secrets should not go there; check the current API before relying on it.

### Minimal hooks module (official docs, verbatim)

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

The canonical layout is `.claude-plugin/plugin.json`, `hooks/hooks.json`, and a hooks module that exports `register(on)` ([create](https://code.claude.com/docs/en/plugins/mods/create)). Ray's early-access output looked different (`plugins.json`, `transcript_redactor.json`, `hooks.json`, `redact.ts` in `.claude/`); expect current tooling to follow the docs.

## Authoring and Lifecycle

The built-in **`plugin-authoring`** skill ("Write or debug a Claude Code plugin made of function hooks") writes a mod from a plain-language request, and can interview you and offer prototypes first. Ray builds every example in his video with it.

```bash
/plugin-authoring <what the mod should do>   # generate a mod
/reload-plugins                              # hot-reload after editing
claude plugin validate ./mod                 # list hooks: and calls: before installing
claude --plugin-dir ./my-mod                 # load a mod for one session
claude --safe-mode                           # run one session with mods off
```

`CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1` is early-access only; v2.1.287+ ignores it.

## Built-in and Sample Mods

Anthropic dogfoods mods for its own features; the source is public at `github.com/anthropics/claude-code/tree/main/mods`.

- **Built-in:** `/diff`, AGENTS.md loading, telemetry, `sec-default` (an organisation guard), `plugin-authoring` (skill only), `you-should-know` (a side agent, off by default).
- **Samples** (`anthropics/claude-code-playground`): **token-weather** (a band forecasting context usage), **blast-radius** (holds risky shell commands, shows what they would change, then lets you proceed or cancel), **replay-theater** (`/replay` replays the last turn's edits).

## Where Mods Run

Hooks run everywhere: the terminal, `claude -p`, the [Agent SDK](claude-agent-sdk.md) and cloud sessions. **Drawing works only in the terminal and the Desktop Code tab.** A deploy-status band won't appear in a headless run; a redaction hook still works there.

## Security Model and Off-Switches

Mods are powerful in both directions. Per the official docs:

- They run **with your permissions and are not sandboxed**. The Bash sandbox does not cover processes a mod starts.
- They can read environment variables and secrets, and see every prompt and tool call.
- They can rewrite prompts and tool calls, submit prompts, and spend usage.
- They can **approve tool calls before you are asked, including ones an `ask` rule or your own PreToolUse hook blocked.**

The last point cuts against using mods (or settings hooks) as a safety layer while untrusted mods are installed: a mod can override the settings-hook guards that Ray recommends adding. How this squares with the existing wiki claim that hooks "tighten but cannot loosen restrictions past policy" ([Claude Code Hooks for Memory § Hooks vs `bypassPermissions`](../how-tos/claude-code-hooks-memory.md#hooks-vs-bypasspermissions)) is an open tension surfaced at this ingest, pending a decision.

**Off-switches:**

- Disable the plugin in `/plugin`.
- `--safe-mode` for one session.
- `"disableAllHooks": true` in settings.
- Organisations can set `allowManagedModsOnly` (compare `allowManagedHooksOnly` on [Claude Code Sandboxing](../how-tos/claude-code-sandboxing.md#managed-settings-closing-the-gaps-permissions-leave)).
- Built-in mods ignore these switches.

**Before installing:** use trusted marketplaces only, and run `claude plugin validate` to see what the mod hooks and calls.

## Use-Case Patterns

| Pattern | Move | Examples from the source |
|---------|------|--------------------------|
| Turn a CLAUDE.md rule into code | Rewrite / Answer | Run `/plugin-authoring`, point it at CLAUDE.md, ask which rules can become deterministic hooks, then delete those rules |
| Fix a repeated small mistake | Rewrite | `npm` → `pnpm` |
| Replace a built-in tool's implementation | Answer + fallback to `next` | WebSearch via Exa, WebFetch via a cache or proxy |
| Human checkpoint before an irreversible action | `ask` | Dry run before a real run; "refactor this?" once a file passes 1,000 lines; newsletter send gate with minimum reading time; a quiz on the changes before a PR opens |
| Make background state visible | UI | Vercel deploy row that appears while a deploy runs and stays for an hour; prod/dry banner |
| Enrich context automatically | `$model` + `$http` | Small model generates keywords from the prompt, knowledge base is queried, results added to the session |
| Audit | Observe | Compliance log of every tool call |
| Ambient feedback | `$model` + clock | Haiku-summarised text-to-speech at turn end; clock-based saves in long turns |
| Share team standards | Plugin distribution | Shared guards and UI in a team plugin repo or marketplace |

The argument for moving rules into mods is the same one behind settings hooks: CLAUDE.md rules fade as context grows and lazy prompts get misread, so anything that must hold every time belongs in code. The cost Ray does not mention: every rule moved into a mod is code to maintain, running with the full permissions of a mod.

## Worked Example: Secret Redaction by ID Substitution

The clearest case of a mod doing work no settings hook could do (Ray Amjad, 04:46-07:28).

**Problem.** A Bash command or a paste puts a secret (API key, email, IP address) into the session transcript. After that, the only fixes are deleting the transcript or rotating the secret.

**Flow:**

1. **Paste.** The user pastes an API key and asks Claude to use it.
2. **Redact to ID (Rewrite on prompt submit).** The hook detects the high-entropy string and replaces it with a placeholder ID before the prompt enters the transcript.
3. **Store in mod memory.** The real value goes into a module-level variable, never into the transcript or the persistent store.
4. **Claude works with the ID.** The request Claude writes contains the placeholder.
5. **Swap back at request time (Rewrite on tool call).** The hook substitutes the real secret into the outgoing call, and the request succeeds.

Ray compares it to Infisical's Agent Proxy, which injects secrets into outgoing agent requests. Same principle as the credential proxy on [Claude Code Sandboxing § Claude Code on the Web](../how-tos/claude-code-sandboxing.md#claude-code-on-the-web): keep the secret in a layer the model never reads.

**Caveat: this protects the transcript, not the secret.**

- It keeps the key out of the session log and the model's context: fewer leaks through transcripts, shared sessions and compaction.
- It is **not a security boundary**. The redactor holds the plaintext itself, unsandboxed, and any other installed mod can read secrets through its own process access.
- Claude can still cause the real secret to be *used* through the ID, since the hook substitutes it into any matching request. Check what the swap-back step sends, and where.

**How to apply:** `/plugin-authoring` an entropy-based secret redactor plus email/IP redaction with ID substitution, read the generated module, `claude plugin validate` it, `/reload-plugins`, and test with a dummy key. Treat it as transcript hygiene.

## Related Pages

- [Claude Code](claude-code.md) — the host runtime
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — settings hooks: exit codes, JSON output, scopes, SDLC gates
- [Claude Code Plugins](../how-tos/claude-code-plugins.md) — the packaging layer mods ship in
- [Claude Code Sandboxing](../how-tos/claude-code-sandboxing.md) — why mod processes sit outside the Bash sandbox; managed-only switches
- [Claude Code Permissions](../how-tos/claude-code-permissions.md) — `ask` rules a mod can pre-approve
- [Claude Code Status Line Setup](../how-tos/claude-code-status-line.md) — the settings-based status line, versus mod-drawn bands
- [Claude Code Skills](../how-tos/claude-code-skills.md) — the advisory counterpart; `plugin-authoring` is a skill
- [MCP](../concepts/mcp.md) — the extension type a tool-overriding mod can replace
- [Harness Engineering](../concepts/harness-engineering.md) — mods make the harness itself programmable
- [Context Engineering](../concepts/context-engineering.md) — moving rules out of CLAUDE.md, shaping what Claude sees
- [Claude Agent SDK](claude-agent-sdk.md) — mods' hooks also run there
