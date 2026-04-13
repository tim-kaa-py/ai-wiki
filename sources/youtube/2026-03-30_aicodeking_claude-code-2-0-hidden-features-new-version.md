---
title: "Claude Code 2.0 & Hidden FEATURES: They JUST OFFICIALLY REVEALED New Version Hidden Features!"
source_type: "youtube"
channel: "AICodeKing"
date: "2026-03-30"
url: "https://www.youtube.com/watch?v=pgopk2SFl5Y"
video_id: "pgopk2SFl5Y"
duration: "7:13"
pillar: "building"
tags: [claude-code, cli-commands, automation, hooks, worktrees, custom-agents, voice-input, remote-control]
ingested: "2026-03-30"
extraction_method: "auto-captions"
---

[00:02] [music]
[00:05] >> Hi. Welcome to another video.
[00:07] So, Boris Cherny shared a thread on X
[00:10] about his favorite hidden and
[00:12] underutilized Claude Code features.
[00:14] And this is pretty interesting because
[00:16] Boris has built Claude Code. So, this is
[00:19] not random theory.
[00:20] This is basically a list of the things
[00:22] he actually uses in real life.
[00:24] Now, I'm saying probably underutilized
[00:27] because Boris framed them that way. But
[00:30] Anthropic has not published a full
[00:32] public usage ranking for all of these
[00:34] features. So, take that part with a
[00:35] grain of salt. But if someone that close
[00:38] to the product is using these features
[00:40] all the time, then I think it is fair to
[00:42] say most people are not using Claude
[00:44] Code to its full potential. So, let's
[00:46] get right into it. The first thing is
[00:48] that Claude Code is not just a terminal
[00:50] app. Boris says he writes a lot of code
[00:52] from the Claude mobile app on iOS, and
[00:55] you can also use it on Android, which is
[00:57] pretty amazing, to be honest, because a
[00:59] lot of people still think of Claude Code
[01:01] as something that only lives inside one
[01:02] terminal window on a laptop.
[01:05] And once you understand that,
[01:07] the second hidden feature makes way more
[01:08] sense.
[01:09] You can actually move sessions between
[01:11] mobile, web, desktop, and terminal.
[01:14] Boris called out {dash} {dash} teleport
[01:16] or {slash} teleport to continue a Claude
[01:18] session on your machine,
[01:20] and {slash} remote control to control a
[01:23] locally running session from your phone
[01:25] or the web. So,
[01:27] this is kind of great because you can
[01:28] start somewhere convenient and continue
[01:30] somewhere powerful. Now, the next two
[01:33] are honestly some of the biggest ones in
[01:35] the whole thread.
[01:36] And these are {slash} loop and {slash}
[01:39] schedule.
[01:40] Boris says he uses these to automate
[01:43] work on an interval, like babysitting
[01:45] pull requests, rebasing, collecting
[01:48] Slack feedback, sweeping missed review
[01:50] comments, and pruning stale PR's.
[01:53] This is where Claude Code stops feeling
[01:55] like a chat tool and starts feeling more
[01:57] like an automated co-worker.
[01:59] And the important idea here is that you
[02:01] can turn repeatable workflows into
[02:03] skills plus loops. So, instead of
[02:06] manually checking the same stuff every
[02:08] 30 minutes, you just let Claude keep
[02:10] doing it.
[02:11] This is pretty amazing, for sure,
[02:13] especially if you're paying for Claude
[02:14] Code already and only using it in
[02:16] one-shot mode. Now, let's talk about
[02:18] hooks because this is another one that
[02:20] most people do not use enough.
[02:23] Boris says you can use hooks to
[02:25] deterministically run logic at different
[02:26] points in the agent life cycle. So, for
[02:29] example, you can auto-load contexts at
[02:31] session start, log every bash command
[02:34] before a tool runs, route permission
[02:36] prompts to somewhere else for approval,
[02:38] or even poke Claude to continue when it
[02:40] stops,
[02:41] which is literally giving Claude Code
[02:43] programmable behavior around the edges,
[02:45] and that is super powerful.
[02:48] Now, this next one is slightly adjacent,
[02:50] but it is still very interesting. Boris
[02:52] also mentioned dispatch and co-work,
[02:54] which he says the most important tip for
[02:56] using Claude Code is to give Claude a
[02:58] way to verify its own output. And for
[03:01] front-end work, he personally uses the
[03:03] Chrome extension because it tends to
[03:05] work more reliably than some other
[03:06] similar setups. That makes a lot of
[03:08] sense, because if an AI cannot see what
[03:11] it built, then it is basically guessing.
[03:13] Along the same lines, he also points out
[03:16] that the Claude desktop app can
[03:18] automatically start web servers and test
[03:20] them in a built-in browser. So, for web
[03:22] work, this is pretty awesome. You write
[03:25] code, launch the app, let Claude inspect
[03:27] the result, and then iterate until
[03:29] things actually look good instead of
[03:30] just compiling. Now, another hidden
[03:33] feature a lot of people do not think
[03:34] about is session forking. Boris says if
[03:37] you want to fork an existing session,
[03:39] you can use {slash} branch inside the
[03:41] session, or from the command line, you
[03:43] can resume a session and add {dash}
[03:45] {dash} fork session. This is really good
[03:47] because sometimes the AI is going in a
[03:49] useful direction, but you also want to
[03:51] test another path without destroying
[03:53] your original context.
[03:55] And while the agent is working, Boris
[03:57] also likes to use {slash} BTW for side
[03:59] queries.
[04:01] This is such a good quality of life
[04:02] feature. You can ask a quick question,
[04:04] get a quick answer, and not pollute the
[04:06] main line of work, which is also good
[04:08] because a lot of AI sessions get worse
[04:10] when you keep mixing unrelated thoughts
[04:12] into the same thread. Now, let's come to
[04:14] parallel work because this is where
[04:16] things get really interesting. Boris
[04:18] specifically calls out get work trees,
[04:21] and this is a really good option, for
[04:22] sure, if you do lots of parallel work in
[04:24] the same repo.
[04:26] You can have multiple Clauds running in
[04:28] different work trees, each isolated,
[04:30] each working on a separate problem, and
[04:32] they are not stepping on each other's
[04:33] toes.
[04:34] And if that is not enough, he also
[04:36] mentions {slash} batch to fan out
[04:38] massive change sets. The way he
[04:40] describes it,
[04:41] Claude basically interviews you first
[04:43] and then fans the work out to as many
[04:45] work tree agents as it takes. So, for
[04:47] large migrations or repetitive code-base
[04:49] wide changes, this is pretty amazing, to
[04:52] be honest. Now, for scripted or
[04:54] SDK-driven usage, Boris also calls out
[04:57] the {dash} {dash} bare flag.
[05:00] By default, Claude looks for local {dot}
[05:02] Claude files, settings, and MCPs when it
[05:04] starts.
[05:06] But for non-interactive usage, {dash}
[05:08] {dash} bare can speed things up a lot by
[05:10] skipping some of that automatic loading,
[05:12] which is pretty great if you're doing
[05:14] programmatic runs and care about startup
[05:16] overhead.
[05:17] He also mentions {dash} {dash} add dir,
[05:19] which lets Claude see and access more
[05:21] than one folder.
[05:23] This is really good for multi-repo work
[05:25] because a lot of real projects are not
[05:26] sitting inside one neat little
[05:28] repository anymore. So, instead of
[05:30] constantly switching context, you can
[05:33] let one Claude session understand the
[05:34] broader setup. And then there's {dash}
[05:37] {dash} agent, which lets you give Claude
[05:39] Code a custom system prompt and tool set
[05:41] through custom agents in the {dot}
[05:42] Claude agents folder. I like this a lot
[05:45] because it means you can create
[05:46] specialized agents for read-only
[05:48] analysis, migrations, testing,
[05:50] documentation, or whatever else you
[05:52] want. This is one of those features that
[05:54] looks small at first, but it actually
[05:56] changes how structured your workflows
[05:57] can become. Finally, Boris mentions
[06:00] {slash} voice,
[06:01] and this one is honestly super
[06:03] underrated because a lot of people still
[06:05] think serious coding has to be done only
[06:07] by typing. But Boris says he does a lot
[06:10] of his coding by speaking to Claude Code
[06:12] like a single terminal chatbot while
[06:14] power users are using it like a whole
[06:16] operating environment. Mobile, web,
[06:19] desktop, remote control, hooks, loops,
[06:21] branching, work trees, verification,
[06:23] custom agents, voice, all of it works
[06:26] together. And that is why this thread
[06:28] matters. It is not just a bunch of
[06:30] hidden tricks. It is basically a map of
[06:32] how someone deeply involved with Claude
[06:34] Code actually uses the product
[06:36] day-to-day. So, if you are paying for
[06:38] Claude Code and you're only using simple
[06:39] prompts in one terminal, you are
[06:41] probably leaving a ton of value on the
[06:43] table. Overall, it's pretty cool.
[06:45] Anyway, let me know your thoughts in the
[06:46] comments. If you like this video,
[06:48] consider donating through the Super
[06:50] Thanks option or becoming a member by
[06:52] clicking the join button. Also, give
[06:53] [music] this video a thumbs up and
[06:55] subscribe to my channel. I'll see you in
[06:56] the next one. Until then, bye.
[07:07] >> [music]
[07:11] [music]
