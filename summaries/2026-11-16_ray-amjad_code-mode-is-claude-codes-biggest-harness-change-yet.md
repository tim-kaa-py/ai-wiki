---
title: "Code Mode Is Claude Code's BIGGEST Harness Change Yet"
type: "summary"
description: "Explains Claude Code's experimental Code Mode, which puts every harness tool behind a persistent JavaScript REPL so results can be chained in code instead of passed through the context window, and argues it is a step toward Claude becoming a recursive language model that manages its own subagents and context."
channel: "Ray Amjad"
date: "2026-11-16"
resource: "https://www.youtube.com/watch?v=DRNbxPk9Ab8"
pillar: "building"
tags: [claude-code, agents, inference, architecture, workflow]
timestamp: "2026-11-18"
source_file: "sources/youtube/2026-11-16_ray-amjad_code-mode-is-claude-codes-biggest-harness-change-yet.md"
---

# Code Mode Is Claude Code's BIGGEST Harness Change Yet — Summary

**Source:** Ray Amjad | 2026-11-16 | [Link](https://www.youtube.com/watch?v=DRNbxPk9Ab8) | 14:54

## TL;DR

Code Mode replaces Claude Code's separate tools (Read, Edit, Bash, WebFetch, MCP calls) with a long-lived JavaScript REPL in which those tools are functions, so Claude can loop, filter and chain results in code and let only the distilled output reach the context window. The creator frames it as "the model swallowing the harness" and reads it, together with unreleased context functions found in the binary, as a move toward a recursive language model (RLM) that spawns subagents from code and could one day manage its own conversation history instead of relying on compaction. Setup is one environment variable; most of the forward-looking parts are speculation.

## Video Structure

1. [00:00-00:53] Intro — Code Mode as a harness rewrite; the idea predates Claude Code (Cloudflare article, other harnesses).
2. [00:53-02:13] The problem — every tool result sits in the context window and is reread on each call.
3. [02:13-04:22] Server-side Code Mode — Cloudflare's single execute tool; 2,600 tools collapsed to search + execute.
4. [04:22-05:25] Client-side Code Mode across MCP servers — MCP gateways as a workaround.
5. [05:25-06:52] Code Mode across all harness tools, and setup in Claude Code.
6. [06:52-08:35] The REPL and Poll tools explained.
7. [08:35-09:32] Results — the creator's own test and relayed outside numbers.
8. [09:32-10:08] The Mismanaged Geniuses Hypothesis.
9. [10:08-11:19] Unreleased context functions: subagents as contexts.
10. [11:19-12:50] Recursive language models and the missing third ingredient.
11. [12:50-14:42] Conversation history as a variable instead of compaction; post-training.

## Key Concepts

### Code Mode

Instead of the model looping over many individual tool calls, with each result landing in the context window as an intermediary, it gets an execute-style tool and writes code in which the tools are functions [01:45-02:47]. Results pass directly from one tool to the next and only the final result returns [02:03-02:13]. The idea was popularised by Cloudflare for MCP: their own MCP server went from 2,600 tools costing 1.1M tokens to two tools (search, execute) costing about 1,000 [02:47-03:16]. That version is **server-side** (code runs in the provider's sandbox and spans one server). Claude Code's version is **client-side** and spans every harness tool, not just MCP: Read, Edit, Bash, WebFetch, MCP calls and harness-level tools such as subagents [05:25-05:45], [07:03-07:15].

### The REPL tool

REPL = read-evaluate-print loop: a JavaScript console Claude writes code into that **stays open for the whole session** [06:58-07:08]. Because state persists, a variable defined in one REPL call can be looped over and filtered in a later one, which server-side Code Mode cannot do [07:15-07:30]. Typical uses: loop over hundreds of files, run tool calls in parallel, deduplicate, filter rows, all before anything enters the context; assign a bloated MCP response to a variable, preview a slice, and keep working on it [07:34-08:07].

### The Poll tool

The second (and only other) tool: long-running REPL scripts detach into the background, and Claude checks on them with Poll [08:21-08:35].

### Recursive language model (RLM)

From Alex Zhang (MIT), per the creator's account of a paper from December of last year [11:23-11:33]. Three ingredients must come together [11:33-12:13]:

1. A REPL that persists between calls (Claude Code now has this).
2. Subagents called and managed from inside the REPL, e.g. one per file the code just read (possibly coming, see the context functions below).
3. The prompt itself lives in a variable, so the model never reads all of it and instead writes code over it: told "a 2M-token prompt sits in this variable", it slices it and hands parts to subagents [12:18-12:46]. This is the missing piece.

Zhang also argues RLMs only really work once a model is **post-trained** around them [14:17-14:28].

### Mismanaged Geniuses Hypothesis

An essay by Alex Zhang: many limitations attributed to models come from how they are used, not from what they can do; better management would already unlock a wider range of tasks [09:36-09:59]. The creator presents Code Mode as an instance: it gives an already capable model more freedom [09:59-10:04].

## Key Takeaways

1. **Code Mode saves context and round trips by keeping intermediate results out of the conversation.** The cost of the classic loop is that every tool output stays in context and is reread on each subsequent call; even cached at 10% of the normal rate, those tokens are wasted [01:40-01:59].
   - **How to apply:** Turn it on for MCP-heavy or data-wrangling tasks (e.g. combining two MCP data sources into a report) and check with Ctrl+O that Claude writes code rather than calling tools one by one [06:26-06:52].
2. **It helps most with badly designed MCP servers** that return far too much: the result goes into a variable, not the context [07:53-08:07].
   - **How to apply:** When an MCP tool floods context, ask Claude to store the result in a REPL variable and preview only what it needs.
3. **A bash script is not a substitute.** Bash could chain commands, but it cannot reach harness-level tools such as MCP servers or subagent spawning; the REPL can [08:07-08:21].
4. **Reported savings (single self-run test, unverified).** The creator's agent compared runs with and without Code Mode on real open-source issues: about half the input tokens and 71% of the total cost, roughly 30% cheaper [08:35-08:55]. One informal experiment, run when the feature first appeared in the binary; no methodology shown.
5. **Outside evidence for REPL harnesses (relayed, unverified).** BrowserUse reportedly deleted about 90% of its library so its agent writes a Python REPL against the raw Chrome DevTools protocol, claimed up to 50% better, 2-5x cheaper and faster [08:58-09:15]. Someone giving Opus 5.5 a single Python REPL reportedly scored 71% on TerminalBench versus 65% for normal Claude Code without Code Mode, at slightly lower cost per task [09:15-09:32]. Both are the creator relaying others' claims.
6. **Subagents may become programmable "contexts" (speculation from the binary).** Three functions, spawn context, list contexts and release context, appeared in the binary alongside Code Mode but are **not released**; what they do is the creator's inference [10:08-10:23]. His reading: subagents triggered and combined from code like dynamic workflows, but with two differences: a spawned context could **fork the main conversation** (e.g. try 5-10 speed-up approaches and return the best 3) [10:42-11:02], and spawned agents could **message the coordinator** [11:02-11:10]. He guesses the two mechanisms may later merge [11:10-11:19].
7. **Context management could replace compaction (speculation).** If the conversation history were a variable, Claude could notice the window filling and itself delete or shorten noisy, no-longer-relevant tool calls, making compaction unnecessary [12:50-13:30]. The catch is prompt-cache breakage; the creator points to a Meta paper on prefix/suffix caching and to Anthropic's API context editing, which warns that edits break the cache and need a cost-benefit check [13:30-14:07]. His timing guess, "maybe in 2027", for prompts and history as REPL variables is explicitly a guess [14:07-14:13].

## Argument Structures

**Why Code Mode is cheaper and smarter at once**

- Premise: in a tool loop, every result enters context and is reread on every later call [01:40-01:54].
- Premise: models are already good at writing code [02:31-02:42].
- Therefore: let the model write code that calls tools as functions and returns only the final result; less context spent, fewer round trips, and the model works with cleaner context [02:03-02:13], [07:44-07:53].
- Extension: if this works for MCP, apply it to every tool in the harness, client-side, with persistent state [05:25-05:45], [07:15-07:30].

**From Code Mode to RLM (the creator's forward-looking chain)**

- RLM needs (1) persistent REPL, (2) subagents managed from the REPL, (3) prompt as a variable [11:33-12:13].
- Claude Code has (1); the unreleased context functions suggest (2) [12:13-12:18].
- If (3) is added for prompts and conversation history, Claude manages its own context [12:46-13:30].
- If a future model is post-trained inside this harness, the creator expects Claude to "become some kind of RLM" [14:17-14:42]. He hedges that it may not get fully there [14:13-14:17].

## Notable Commands / Code Snippets

From the video description (not spoken in the video): requires Claude Code 2.1.323 or later; docs at <https://code.claude.com/docs/en/code-mode>.

```bash
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
```

From the video [05:45-06:52]:

- Code Mode refused to enable until a mod using Claude Code hooks was disabled; disable such mods or plugins first.
- Once enabled, asking "what tools do you have?" returns only REPL and Poll.
- Press Ctrl+O to see the JavaScript Claude writes into the REPL.

## User Notes

- Focus: what Code Mode is and the principles behind it; RLMs and their relation to Code Mode; context management via conversation history as a variable; setup.
- Kept from the discoveries: the results numbers (flagged as one self-run test plus relayed claims), the unreleased context functions (behaviour inferred from the binary), and the Mismanaged Geniuses Hypothesis.
- Left out by choice: the MCP gateway product shown as a pre-Code-Mode workaround, and the bash-versus-REPL comparison beyond what explains the REPL.

## Related Topics

claude-code, agents, inference, architecture, workflow
