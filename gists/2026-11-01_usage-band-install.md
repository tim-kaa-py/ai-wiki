---
title: "usage-band — Install the Claude Code Usage Mod"
intent: "Install the usage-band mod (context, 5-hour and 7-day limits with pace, above the prompt) without keeping a copy of the ai-wiki repo."
prerequisites:
  - "Claude Code with mod support (tested on 2.1.312 to 2.1.316)"
  - "git"
model: "sonnet"
tags: [claude-code, mods, plugins, rate-limits, context-window, productivity]
created: "2026-11-01"
---

# usage-band — Install the Claude Code Usage Mod

**How to use:** Copy the prompt block below and paste it into a Claude Code session. It fetches only the mod's folder, installs it, and then deletes the download. You don't end up with a copy of the wiki. Restart Claude Code afterwards. What the mod shows and its known limits are in [`mods/usage-band/README.md`](../mods/usage-band/README.md).

---

```
Install the Claude Code mod "usage-band" from the public repo tim-kaa-py/ai-wiki. I want only the mod, not a copy of that repo. Do these steps in order, and stop and tell me if one fails.

1. Check that `git` and `claude` are on the PATH and show `claude --version`.

2. Make a fresh temp directory and fetch only the mod's folder into it with a sparse, shallow clone:
   git clone --depth 1 --filter=blob:none --sparse https://github.com/tim-kaa-py/ai-wiki.git <temp>/ai-wiki
   git -C <temp>/ai-wiki sparse-checkout set mods/usage-band
   Confirm that <temp>/ai-wiki/mods/usage-band/.claude-plugin/marketplace.json exists.

3. The mod's permanent home is ~/.claude/mod-marketplaces/usage-band (use $CLAUDE_CONFIG_DIR instead of ~/.claude if that variable is set). If that folder already exists, this is an update: tell me, then replace its contents with the new copy. Otherwise create ~/.claude/mod-marketplaces/ and copy the folder there.

4. Register and install it:
   - New install: `claude plugin marketplace add ~/.claude/mod-marketplaces/usage-band`, then `claude plugin install usage-band@tim-kaa-py-usage-band`.
   - Update: `claude plugin marketplace update tim-kaa-py-usage-band`, then `claude plugin update usage-band@tim-kaa-py-usage-band`.

5. Verify with `claude plugin list` that usage-band@tim-kaa-py-usage-band is installed and enabled.

6. Only after step 5 succeeds, delete the temp directory from step 2, so no copy of the ai-wiki repo stays on this machine. Never delete ~/.claude/mod-marketplaces/usage-band: Claude Code installs the mod from that folder, and never run `claude plugin marketplace remove` for it, because that uninstalls the mod.

7. Check my status line (statusLine in ~/.claude/settings.json) for figures the mod now shows, so I don't see them twice:
   - If it runs ~/.claude/statusline-command.sh and that script's header says "Claude Code status line — three-line display", it is the setup from tim-kaa-py/ai-wiki (sources/articles/2026-04-16_self_claude-code-statusline-setup.md). Offer to slim it down to one line and wait for my yes. On yes: back the script up to ~/.claude/statusline-command.sh.bak, then remove the context bar, the 5h and 7d segments (bars, percentages, reset countdowns and the ~Xd estimate), the ⚡ burn indicator, the "(Xh left)" warning, the kT token count, and the burn-rate state file logic (STATE_FILE, ~/.claude/.statusline-rl5h-last; delete that file too). Keep model and effort, the session cost, git branch, working directory, session duration and API %, joined on one line. If my copy differs from the original, keep my own additions. Show me the diff, then prove it still runs and prints exactly one line:
     echo '{"model":{"display_name":"Sonnet 4.6"},"context_window":{"used_percentage":42,"total_input_tokens":100000,"total_output_tokens":50000},"cost":{"total_cost_usd":1.50,"total_duration_ms":600000,"total_api_duration_ms":300000,"total_lines_added":50,"total_lines_removed":10},"rate_limits":{"five_hour":{"used_percentage":30,"resets_at":9999999999},"seven_day":{"used_percentage":55,"resets_at":9999999999}},"workspace":{"current_dir":"."}}' | bash ~/.claude/statusline-command.sh
   - If it is any other status line that shows the context window or the 5-hour/7-day limits, only tell me which parts duplicate the mod. Don't change it.
   - If it shows none of those, say nothing about it.

8. Tell me to restart Claude Code. The band appears above the prompt after the first reply.
```
