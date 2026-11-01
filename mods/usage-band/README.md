# usage-band

A Claude Code mod that shows a band above the prompt with three readings: the context window, the 5-hour limit and the 7-day limit. Each reading has a small bar, and its colour tells you whether you are on pace.

## What it shows

| Segment | Bar | Text |
|---|---|---|
| `ctx` | Context used, with a marker at the auto-compact point | Tokens, e.g. `441k / 1M` |
| `5h` | 5-hour limit used, with a marker for the time elapsed in the window (the pace) | Time left until the reset |
| `7d` | The same for the 7-day limit | Time left until the reset |

The colours:

- **Green:** on pace. Only the time left is shown.
- **Yellow:** you are using the limit faster than the window passes. The segment adds when it runs out at the current rate, e.g. `out in 1h 10m`.
- **Red:** close to the limit (90% used, or 90% of the context). The segment adds the percentage.

The band adapts to the window width. In the terminal it packs into one to three rows and shrinks the bars and text when space runs short. In VS Code and the desktop app it wraps as one flowing line, so a wide window shows all three segments on one line.

The figures come from Claude Code's own measurements (`session.measure`), not from parsing log files.

## Install

The easiest way is the copy-paste prompt in [`gists/2026-11-01_usage-band-install.md`](../../gists/2026-11-01_usage-band-install.md). Paste it into Claude Code and it does the steps below for you.

By hand:

```bash
# 1. Fetch only this folder (not the whole wiki) into a temp directory
tmp=$(mktemp -d)
git clone --depth 1 --filter=blob:none --sparse https://github.com/tim-kaa-py/ai-wiki.git "$tmp/ai-wiki"
git -C "$tmp/ai-wiki" sparse-checkout set mods/usage-band

# 2. Keep the mod in a folder of your own and register it from there
mkdir -p ~/.claude/mod-marketplaces
cp -R "$tmp/ai-wiki/mods/usage-band" ~/.claude/mod-marketplaces/usage-band
claude plugin marketplace add ~/.claude/mod-marketplaces/usage-band
claude plugin install usage-band@tim-kaa-py-usage-band

# 3. Remove the temp clone, then restart Claude Code
rm -rf "$tmp"
```

Keep `~/.claude/mod-marketplaces/usage-band/`: Claude Code installs the mod from that folder. Removing the marketplace (`claude plugin marketplace remove`) uninstalls the mod too.

**Update:** fetch the folder again as in step 1 and replace `~/.claude/mod-marketplaces/usage-band/` with it. Then run `claude plugin marketplace update tim-kaa-py-usage-band` and `claude plugin update usage-band@tim-kaa-py-usage-band`, and restart.

**Uninstall:** `claude plugin uninstall usage-band@tim-kaa-py-usage-band`, then `claude plugin marketplace remove tim-kaa-py-usage-band`, then delete the folder.

## Known limits

- The rate limits come from the last API response, so they don't change while the session is idle.
- Where the band sits relative to other mods' bands is decided by Claude Code, not by the mod.
- There's no pace colour in the first 10% of a window, because there's too little data to judge the pace.
- It needs a Claude Code version with mod support. It was tested on 2.1.312 to 2.1.316. The minimum version is unknown.
- If your status line already shows context or rate limits, you will see them twice. Trim the status line. The install gist offers to slim down the [ai-wiki status line](../../sources/articles/2026-04-16_self_claude-code-statusline-setup.md) to one line for you.

## Files

- `hooks/usage.ts`: the calculations (bars, pace, run-out time, layout packing).
- `hooks/register.tsx`: drawing the band.
- `types/index.d.ts`: the state contract.
- `hooks/*.test.ts(x)`: 35 tests. Run them with `claude plugin test <this folder>`.

Licensed CC BY 4.0, like the rest of [ai-wiki](../../README.md).
