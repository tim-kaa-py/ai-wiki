# Ingest Notes

**Source:** [Karpathy's Wiki vs. Open Brain. One Fails When You Need It Most.](https://m.youtube.com/watch?v=dxq7WtWxi44)

## User Focus

Capture ONLY the strengths and limitations of Karpathy's LLM wiki pattern as Jones describes them. Ignore OpenBrain as a product — it is mentioned only as a foil. Do not summarize Jones's hybrid proposal or his product pitch.

What rang true to the user and should land clearly:

**Strengths of the wiki pattern Jones names:**
- Compile-once, not rederive-every-query — AI does cognitive work and *preserves* it instead of throwing it away
- Wiki as persistent artifact of the user's evolving understanding (not just file organization)
- Ideal for deep solo research: reading 10 papers on a topic over weeks, each paper integrated into an evolving synthesis, contradictions flagged at ingest, cross-references built automatically
- Wins where value is in *connections between sources* rather than any single source
- Browsable in Obsidian / note apps — human can follow links, read the graph, converse with the agent
- Moves AI from "oracle" (one-off answers) to "maintainer" (ongoing job on a knowledge artifact that compounds)

**Limitations Jones names:**
- Wiki silently becomes the source of truth — users stop going back to raw sources even though Karpathy's architecture preserves them
- AI makes editorial/synthesis decisions; important nuance can be dropped and you won't know what's missing because the wiki reads cleanly (dashboard trap)
- Wiki staleness ≠ database staleness: database staleness looks like ignorance (gaps), wiki staleness looks like **active misinformation** (confident prose that is now wrong). You don't question it because the page reads authoritatively.
- Breaks on multi-agent concurrent writes — two agents editing the same page is a mess
- Breaks for teams — person A's evolving understanding conflicts with person B's; the wiki becomes a weird merge
- Scale cliff: works well ~100–10,000 high-signal documents; "not corporate-level memory"; at the upper end needs extra search tooling
- Optimized for paper/article pace, not Slack/ticket/deal-flow pace — resynthesis cost per ingest becomes punishing for fast-changing operational data
- Editorial prompt file (the CLAUDE.md) is the highest-leverage doc in the system — under-invest in it and the wiki degrades silently
- Requires discipline to go back to raw sources; "most people building on his pattern will not maintain that discipline"

## Relevance to this repo

This repo IS a Karpathy-style LLM wiki. Jones's named limits apply directly:
- Solo use → team/multi-agent limit doesn't bite now but would if shared
- Volume → currently well under 10k, safe for now
- Wiki-as-misinformation + editorial-drift + dashboard trap → **these apply right now** and are the most important to reflect into `wiki/concepts/llm-wiki-pattern.md` as acknowledged limits
- CLAUDE.md as highest-leverage doc → already true here; the critique validates the care put into it
