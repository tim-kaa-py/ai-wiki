---
title: "Memory and dreaming for self-learning agents"
type: "youtube"
channel: "Claude"
date: "2026-05-08"
resource: "https://www.youtube.com/watch?v=RtywqDFBYnQ"
pillar: "building"
tags: [agents, memory, claude, multi-agent, self-learning, managed-agents, anthropic]
timestamp: "2026-05-17"
extraction_method: "auto-captions"
video_id: "RtywqDFBYnQ"
duration: "24:28"
---

[00:07] Hello.
[00:08] >> Hey everyone. How's it going? Thanks for
[00:11] coming.
[00:14] My name is Mahes and I'm a product
[00:16] manager on the platform team here at
[00:19] Anthropic. Uh over the past year and a
[00:21] half, I've gotten to work on primitives
[00:24] like MCP and Skills. And today I want to
[00:27] talk about the primitive that I'm most
[00:28] excited about next, which is memory. Um,
[00:32] I'll talk about why we think memory is
[00:34] so important and why we've been spending
[00:36] so much time on it at Enthropic. How we
[00:38] think about designing memory systems
[00:40] that are built for Frontier Agents. And
[00:43] I'm excited to also talk about Dreaming,
[00:45] a brand new product that we're launching
[00:47] today in research preview in the managed
[00:50] agents API.
[00:55] Model capabilities have improved really
[00:58] quickly over the last couple of years
[01:00] and agents are capable of tasks that
[01:03] take many many hours and can run for
[01:06] hours or almost days at a time. And as
[01:08] models and agents have improved, we've
[01:11] also invested in building higher and
[01:13] higher level capabilities and primitives
[01:15] that kind of get out of those models way
[01:18] and give them access to additional bits
[01:21] of their environment and things that
[01:22] they can manage and become more powerful
[01:25] over time. So for example, we launched
[01:28] MCP which gives agents access to
[01:31] external tools and data. We launched
[01:34] harnesses that were really powerful like
[01:36] claude code and the agent SDK. And in
[01:39] October, we launched skills which let
[01:41] agents pick up brand new capabilities
[01:43] that either other agents have designed
[01:45] and shared with them or humans and users
[01:48] that they interact with have designed
[01:49] for them. Each primitive has let agents
[01:53] do increasingly powerful things for
[01:55] longer periods of time. But we still
[01:58] think that something is still kind of
[02:00] unsolved and that's continuous
[02:02] self-learning and context management
[02:04] over long horizon tasks.
[02:08] So memory is the next primitive. It's
[02:11] the thing that I think will get us to
[02:13] self-learning agents that evolve and
[02:15] improve based on the tasks that they're
[02:18] working on and their own experience.
[02:20] With memory, agents can learn about the
[02:23] tasks they work on. things like the
[02:25] success criteria, common mistakes,
[02:27] strategies that are or are not working.
[02:30] They can learn about their environments,
[02:32] things like the code bases that they
[02:34] interact with, the files and the assets
[02:36] that they're constantly keeping up to
[02:38] date. And they can also learn from other
[02:40] agents that are in the same environment
[02:42] as them. They can share learnings. They
[02:44] can figure out what's going wrong
[02:46] elsewhere in a system and incorporate
[02:48] that into their own memory. And I think
[02:50] this last point is the one that I've
[02:52] been most excited about this year and
[02:56] over the next couple of months. I think
[02:58] self-managed memory is going to be super
[03:00] important in these large and complex
[03:02] multi-agent systems where a swarm of
[03:04] agents that are working in a similar
[03:07] environment on discrete tasks are
[03:09] essentially building up their own
[03:11] understanding, their own model of the
[03:13] world that they're in over time.
[03:15] So to help get to this vision, we just
[03:17] launched memory in cloud managed agents
[03:19] in public beta a couple of weeks ago.
[03:22] This gives developers a frontier memory
[03:24] system that works out of the box to
[03:27] maximize intelligence by default to
[03:30] support these systems of many agents
[03:32] running concurrently in the same
[03:34] environment. and most importantly to
[03:36] give enterprises and developers the
[03:39] flexibility and control they need to
[03:41] actually run these in production in an
[03:43] enterprise setting.
[03:46] We've already heard from a bunch of
[03:48] teams building on this to date um that
[03:50] all say that this helps them get to
[03:52] continuous learning and continuous
[03:54] improving agents a lot faster. Uh
[03:57] Rockutin for example mentioned that uh
[03:59] this helped them drop their first past
[04:01] mistakes in their internal uh knowledge
[04:03] agents by 90% because agents were able
[04:06] to catch mistakes and share them with
[04:04] the next iteration of agents which also
[04:11] led to better token efficiency and lower
[04:13] costs and better latency because they
[04:15] started deploying memory systems.
[04:20] So I want to talk a bit about the
[04:22] requirements that we kept in mind uh
[04:24] that we discovered while talking to
[04:26] customers and building this. The first
[04:28] and most important is memory needs to be
[04:31] built to maximize intelligence by
[04:33] default. Agent builders have uh been
[04:36] designing memory systems for a while. I
[04:37] mean we ourselves launched cloud.md uh
[04:40] originally with cloud code I think uh
[04:42] about a year and a half ago. And this
[04:44] was a pretty constrained early version
[04:46] of memory where an agent could leave
[04:48] notes for itself. Sometimes the user
[04:50] would also leave notes in the same
[04:52] memory file. And we also launched
[04:54] something like the memory tool uh within
[04:56] our SDKs which was a pretty well
[04:59] specified tool call with specific
[05:01] parameters and output formats that uh
[05:04] API builders could use. As agents have
[05:07] improved, we've tried to get more and
[05:09] more out of Claude's way and delegate
[05:11] more of this decision-making to Claude
[05:13] without over constraining um the design
[05:16] of these harnesses. And as we did with
[05:19] skills, we kind of came to the
[05:20] conclusion that hey, we know that agents
[05:23] are able to manage a virtual environment
[05:25] and manage their own file system. So why
[05:27] can't we go the same direction with
[05:29] memory? Memory in cloud managed agents
[05:32] models memory as a file system to
[05:35] claude. a series of files with a
[05:37] specific hierarchy and format that
[05:39] Claude can manage and update on its own.
[05:42] It can use familiar tools like bash and
[05:45] GP to update this memory to keep it
[05:47] organized and to constantly change it as
[05:50] it starts working on a task. Now, this
[05:53] this also tracks with what we're seeing
[05:55] in the latest models with Claude Opus
[05:57] 4.7, which we just launched last month.
[06:00] We saw that it was state-of-the-art at
[06:01] file system based memory. That means
[06:04] it's a lot better at discerning what
[06:06] content to put into memory, what's worth
[06:08] remembering. It's better at figuring out
[06:11] what's the right structure for memory.
[06:12] How many files should I split memory
[06:14] into? How do I keep it organized inside
[06:17] of a file system? And ultimately, it all
[06:19] does this with just bash tools and GP
[06:22] tools that already make Claude so good
[06:24] at agentic coding.
[06:29] The other thing that we had in mind when
[06:31] designing memory is that it needs to
[06:33] scale with the multi- aent systems that
[06:35] we're going to be building over the
[06:36] coming months. Multi multi parallel
[06:39] agents is something that we're already
[06:40] kind of starting to do with cloud code.
[06:42] There's a lot of uh vibe coders that
[06:44] have like 10 or 15 cloud code sessions
[06:47] running at the same time. And we're
[06:48] starting to see this in an enterprise
[06:50] setting as well where enterprises
[06:52] including Antropic have hundreds or
[06:54] sometimes even thousands of agents
[06:56] running in parallel interacting with the
[06:58] same set of shared state and the same
[07:00] shared memory. So there's a couple of
[07:02] properties that come out of this. One is
[07:05] we want to give agents the ability to
[07:07] mix and match between the session and
[07:09] the work that it's doing and the set of
[07:12] memory stores that it has access to. So
[07:15] one property of memory and managed
[07:17] agents is permission scopes. The ability
[07:19] for one agent to have readonly access to
[07:22] one memory store. And maybe that memory
[07:24] store is organizationwide knowledge, uh
[07:27] a set of best practices, a runbook for
[07:30] how to deal with these common tasks. And
[07:32] then it has readwrite memory for another
[07:34] memory store. So maybe that's another
[07:36] one where it has working memory that's a
[07:39] lot more specific and frequently updated
[07:41] based on the work it's doing.
[07:44] The other property that came out of this
[07:46] was concurrency. If there are hundreds
[07:48] or thousands of agents interacting at
[07:50] the same time with the same uh memory
[07:53] state, it needs to be able to know that
[07:55] it's not going to clobber the memory or
[07:57] overwrite it as it continues working.
[07:59] So, we implemented optimistic
[08:00] concurrency where one agent can
[08:03] essentially use a content hash to um
[08:05] check if it's going to overwrite another
[08:07] agent's memory before it actually makes
[08:09] an update.
[08:11] From
[08:13] talking to customers, the final and most
[08:16] important property from all of this is
[08:18] about developer and enterprise control
[08:20] for actual production agents. A couple
[08:23] of things came out of this. The first
[08:25] and probably most sought-after property
[08:27] is version history. It's the ability for
[08:31] the developers building with managed
[08:32] agents to see an entire audit log of
[08:36] every time memory was updated and to
[08:38] actually even give an agents access to
[08:41] the same audit log in the future so they
[08:43] can keep track of what change was made
[08:44] and when. It's also attribution metadata
[08:48] to say what agent made an update, what
[08:51] time did it make that update, what
[08:52] session made that specific change, and
[08:54] to go super granularly. So this is
[08:56] predictable and in developers control.
[09:00] The other property that came out of this
[09:02] was a standalone API. We talked to a lot
[09:05] of customers that are building bespoke
[09:07] systems outside of manage agents to
[09:09] manage and curate their memory and keep
[09:11] it up to date. We talked to customers
[09:13] that do PII scanning to make sure that
[09:15] memory doesn't have sensitive content
[09:17] that shouldn't be in there. We also
[09:19] talked to customers that wanted to clean
[09:21] up memory in their own separate pipeline
[09:23] or to clone it into external systems. So
[09:26] we didn't want to lock them in into a
[09:28] specific system that was only available
[09:29] to manage agents. Uh we built this
[09:31] portable API so they could go and
[09:33] control these additional things on their
[09:34] own.
[09:39] So taking a step back, we've started to
[09:41] form this picture of the different
[09:43] layers that we need to work in as we
[09:45] build a frontier memory system. We've
[09:47] talked about the storage layer, which is
[09:50] where the data is actually stored, what
[09:52] kind of metadata and attribution data
[09:55] we're leaving alongside of it. We've
[09:57] talked about the structure and the
[09:59] content layer. This is things like our
[10:01] decision to model files uh memory as
[10:03] files in a file system and earlier um
[10:06] with skills as a form of procedural
[10:08] memory that have a pretty lightweight
[10:09] spec that say, hey, here's how you can
[10:12] actually learn how to do this new
[10:13] capability and equip yourself with new
[10:15] knowledge.
[10:17] And then there's the process layer. This
[10:19] is things like how often is memory
[10:21] actually updated, what triggers updates
[10:23] to that memory, and what sources does it
[10:26] use to decide what changes to make to
[10:28] memory and have new things to learn.
[10:32] And we think that agent memory, the API
[10:34] that we've been discussing, solves part
[10:35] of this. Um, but as we started to scale
[10:38] this up into these more complex multi-
[10:40] aent systems, we also saw a bunch of
[10:42] limitations. We saw cases where memory
[10:46] was sessions were kind of missing
[10:47] learnings that other agents and other
[10:50] sessions had already kind of figured out
[10:51] on their own. We saw these common
[10:53] mistakes and these shared patterns
[10:55] across multiple agents working in the
[10:57] same environment. And we also saw that
[11:00] they weren't super efficient at keeping
[11:01] up this large scale memory store and
[11:04] keeping it up to date in a holistic and
[11:06] efficient way. They were kind of siloed
[11:08] into the specific task that they were
[11:09] working on. So for the past couple of
[11:12] months, we've been experimenting with a
[11:14] couple of different types of processes
[11:16] to kind of supplement this with and we
[11:19] landed on one. Um we call this process
[11:22] dreaming and today we're launching this
[11:24] in research preview in the managed
[11:26] agents API.
[11:29] Dreaming is a process that looks for
[11:31] patterns and mistakes across your recent
[11:33] agent sessions and their transcripts and
[11:35] automatically produces organized and
[11:38] up-to-date memory content.
[11:42] We've worked with a few customers in
[11:43] early testing and for example Harvey
[11:46] when they deployed Dreaming in one of
[11:48] their legal benchmarks which tests out a
[11:50] pretty realistic legal scenario they saw
[11:52] a six times increase in the task
[11:55] completion rate for one of their legal
[11:56] scenarios and we're really excited to
[11:58] see how other customers use this uh when
[12:01] they start testing out this research
[12:02] preview.
[12:04] So let's talk a bit about why we got
[12:06] excited about dreaming in the first
[12:08] place and some of the design and harness
[12:10] considerations we kept in mind as we
[12:12] designed it.
[12:14] So how does dreaming work? It's a batch
[12:17] asynchronous process that runs
[12:19] separately from the work that you're
[12:21] doing uh within a specific session
[12:23] that's working on a specific task. You
[12:25] can kick off dreaming periodically um
[12:27] using our console or v our API on kind
[12:31] of a cron basis or you can plug it in
[12:33] using our API into an existing process.
[12:35] For example, some customers kick off
[12:37] dreaming once their agents have finished
[12:39] a task and are spinning down and want to
[12:41] save those learnings to the memory
[12:43] state.
[12:44] And Dreaming comprehensively looks
[12:46] through recent transcripts, looks for
[12:48] common mistakes, things that a bunch of
[12:50] agents are doing like a failed tool call
[12:52] or strategies that are working out for
[12:54] them and finds opportunities to update
[12:56] the memory state that will improve it in
[12:59] the future. And it produces this updated
[13:01] memory state that you can then apply
[13:03] immediately to your memory store. Or
[13:05] maybe you want to run some checks and do
[13:06] some manual review um which you can do
[13:08] via the API.
[13:10] The ultimate goal of dreaming is
[13:12] continuous self-learning and
[13:14] self-improvement where the next day's
[13:16] agents automatically get better based on
[13:18] the learnings and the work of the
[13:20] previous day's experience.
[13:26] We're excited about dreaming from a
[13:28] design and research perspective for a
[13:31] couple of reasons. The first property is
[13:33] compared to the memory APIs we've been
[13:35] talking about previously, dreaming is
[13:37] out of band. it happens outside the
[13:39] context of an agent working on a
[13:42] specific session or a specific task. And
[13:45] this has a couple of benefits. The the
[13:47] first that is that it's a really good
[13:49] fit for multi- aent systems. When a
[13:52] single agent is reading and writing
[13:54] memory, it has the perspective of
[13:56] itself, of its own context, and of its
[13:58] task. But dreaming lets us go kind of a
[14:00] step above that and look at multiple
[14:02] agents at the same time to find these
[14:04] shared patterns and learnings that a
[14:06] single agent might not learn or notice
[14:08] from its own limited perspective.
[14:11] From a harness design perspective, we've
[14:14] also found consistently that it's
[14:16] important for agents to have really
[14:18] discreet and clear objectives as they
[14:20] start working on a task. So dreaming
[14:22] really lets us separate out this new
[14:24] objective of memory quality because we
[14:27] think over the coming months memory is
[14:29] going to be increasingly important and
[14:31] loadbearing to the actual outcomes and
[14:33] the work that agents are doing. So this
[14:36] lets us separate the memory quality
[14:38] objective from the task completion and
[14:41] task performance objective that a lot of
[14:43] agents already have today.
[14:46] And again because dreaming is an
[14:47] outofband process. It's in the
[14:49] background. It does this without adding
[14:51] any latency to the hot path of an
[14:53] agent's existing task.
[14:58] The other design perspective we had here
[15:00] and thing that we wanted to enable which
[15:01] I'm very excited about is large scale
[15:04] memory systems and how we can use
[15:05] compute effectively to create and curate
[15:08] these. Today most memory deployments are
[15:11] pretty localized to a specific user or a
[15:14] specific task or maybe a small team
[15:16] that's working together. But agent
[15:18] systems are quickly getting to
[15:19] enterprise scale and again within uh
[15:22] Enthropic and within other enterprises
[15:24] that we work with, they already have
[15:25] hundreds or thousands of agents running
[15:27] concurrently that share state. So this
[15:30] effectively starts to turn into a really
[15:32] large knowledge base as opposed to just
[15:34] a simple memory store to to store
[15:36] working context about a specific task.
[15:40] And to support this, we need to find
[15:42] ways to let Claude scale up memory
[15:44] systems to be super large while still
[15:46] being upto-date and fresh and not too
[15:48] token intensive. Dreaming is a process
[15:51] that lets us do this by essentially
[15:53] following similar scaling laws of using
[15:55] additional compute and additional effort
[15:57] to keep these memory systems organized.
[16:00] One way to think about this is how we
[16:02] considered test time compute or thinking
[16:04] models from a couple of years ago where
[16:07] um giving models the ability to go
[16:09] explore and try different things and
[16:10] essentially uh spend more tokens leads
[16:13] to a lot better um final outcomes on the
[16:15] task they're working on. And dreaming is
[16:17] a similar thing that lets a dreaming
[16:19] agent spend more tokens to keep um these
[16:21] systems well organized and up to date.
[16:25] Another perspective we have here is like
[16:26] a search system where um there's this
[16:29] upfront effort to kind of produce this
[16:31] highquality up-to-date index that then
[16:34] is then uh used at retrieval time or
[16:36] search time to get the latest results
[16:37] super efficiently and performatively. So
[16:41] this is something that dreaming also
[16:42] lets us do by creating this index up
[16:45] front and then curating it so that all
[16:47] the downstream agents can use it and
[16:49] effectively lets us amvertise this
[16:51] effort across all of those agents that
[16:53] are reading from a memory store.
[16:58] So now with memory and dreaming in the
[17:00] managed agents API we start to build
[17:02] this picture of what we think of as a
[17:05] frontier memory system at least so far.
[17:08] Memory on the left side is a primitive
[17:10] for agents to immediately in real time
[17:13] read and write things and remember
[17:14] things as they're working on a task. And
[17:16] dreaming is a comprehensive process
[17:18] built on top of that to verify the state
[17:21] of memory to organize it and to enrich
[17:24] and backfill it with additional
[17:26] information um that based on the tasks
[17:28] that the agents are doing during a day.
[17:31] Dreaming is kind of the bridge between
[17:33] these more intermediate memory systems
[17:35] and these larger scale knowledge bases
[17:38] that again we think are going to be
[17:39] really prominent over the next few
[17:40] months.
[17:43] So let's walk through a
[17:46] quick demo.
[17:49] What we're looking at here is a S sur
[17:52] agent. Let me make sure this starts.
[17:54] There you go. That is looking at alerts
[17:56] that are coming in and it's reacting
[17:59] based on those alerts. spinning up
[18:01] specific agents that either do a bunch
[18:03] of triage work, maybe sometimes it spin
[18:05] up spins up an agent to go submit PRs.
[18:08] And each of these agents are equipped
[18:10] with a couple of memory stores. We can
[18:12] see that it has an orwide knowledge
[18:14] memory store. It has an S sur and a
[18:17] codebased memory store. And so if we
[18:19] click into the orwide knowledge memory
[18:21] store, we can see it's readon. It's a
[18:24] set of let's say runbooks and SLO
[18:26] guidelines. um it it points the agents
[18:29] to the specific owners that they might
[18:31] need to go ping and it's something that
[18:32] doesn't get updated very often. We don't
[18:34] want agents necessarily to be going and
[18:36] making changes as they work. Now there's
[18:39] also the S sur memory store that's readr
[18:41] and of course the S sur agents are able
[18:43] to constantly make changes to this as
[18:46] they react and learn from the
[18:47] environment around them.
[18:49] So, we see this alert, this P1 that's
[18:51] coming in from the dispatch service, and
[18:53] we spin up this S sur agent um that goes
[18:56] and starts to kick off an investigation.
[18:58] It goes and investigates the CPU
[19:00] utilization. Uh maybe it goes and checks
[19:02] out some of the traffic patterns and
[19:04] queries for some of the recent PRs that
[19:06] have gotten deployed. It writes down
[19:09] these learnings. Um if we click into the
[19:10] S sur memory store and notes these in a
[19:13] new diff that gets updated in that
[19:15] memory store. Now, a couple minutes
[19:17] later, that same alert gets paged again
[19:19] and a different S sur agent spins up
[19:21] with access to the same memory store.
[19:23] The first thing it does is it sees that
[19:25] note within its memory store that says,
[19:27] "Hey, we already did this investigation.
[19:28] Here's what we found. Here's a way you
[19:30] can short circuit what you're looking
[19:31] at." And ultimately, it saves um the a
[19:34] bunch of time that it would have spent
[19:36] going and investigating the same thing.
[19:38] So we see an im immediate token
[19:40] efficiency gain and an intelligence gain
[19:42] since it now knows um what else it can
[19:45] go investigate.
[19:46] Now this is great um but we want to
[19:48] actually be able to deploy these in an
[19:50] enterprise and actually have reliability
[19:52] and see what decision-m led to certain
[19:54] things um certain outcomes. So if we
[19:57] click into the memory store we can see
[19:59] it has version history. It says every
[20:01] single time an update was made to this.
[20:03] We can actually go back in time and see
[20:05] what changes were made. We can also see
[20:07] which agent made that change, when was
[20:09] it written, and we also have this little
[20:11] precondition hash, which is again what
[20:13] lets us do this optimistic concurrency
[20:15] to say, hey, I made this change. Let's
[20:17] actually verify it is what it is before
[20:19] I go and overwrite it.
[20:21] So, we've been talking about agent
[20:23] memory, but let's now see how Dreaming
[20:26] can now make this a more holistic and
[20:28] up-to-date memory system. So we'll go
[20:31] and um pivot over to the cloud console
[20:35] where it actually reflects the exact
[20:36] state of what we're looking at in the
[20:38] API. It's the set of memory stores that
[20:40] we've created and we'll click into the
[20:42] team SR memory store which again
[20:44] reflects the latest state of memory that
[20:45] we had written.
[20:47] If we go and navigate to the dreaming
[20:49] tab specifically, we can kick off a
[20:52] dreaming job where we say, "Hey, I want
[20:54] to go and update and create this
[20:56] specific memory store. And I want to
[20:58] look at a bunch of the sessions um that
[21:00] we've been looking at for the past seven
[21:01] days. These are all the sessions that
[21:03] touched this memory store. And we want
[21:05] to start a dreaming job to look over
[21:07] those.
[21:08] So, I'll click into the dream and we can
[21:11] see some of the work that it's doing
[21:12] under the hood. It says, hey, here are
[21:14] some of the input sessions that it's
[21:15] going to go and spend time looking into.
[21:17] look through the transcripts and it
[21:19] spins up within the cloud console um an
[21:21] actual session where you can go and see
[21:22] what's happening. It's looking at the
[21:24] specific transcript entries and it's
[21:26] going to spin up a bunch of sub aents
[21:28] that go and look through those
[21:29] transcripts, try to identify those
[21:31] learnings um and then produce that
[21:33] updated memory state. So, we'll jump
[21:36] ahead a few minutes and look at the
[21:38] completed dreaming job to see what uh
[21:39] the output was.
[21:41] It produces a diff, which is a set of
[21:44] updated files that it's going to apply
[21:46] to this memory store. The first one is
[21:48] an update to this dispatch latency note
[21:50] that we were looking at in the demo
[21:51] earlier. It said, hey, a bunch of these
[21:54] agents were triggered exactly 60 seconds
[21:57] after an upstream uh spike in CPU
[21:59] utilization. And it kind of figures out
[22:01] based on that pattern that there might
[22:02] be some retry logic that's getting
[22:04] triggered uh that's really inefficient
[22:06] and leading to a lot of wasted time when
[22:08] we're actually triaging this stuff. So,
[22:10] it identifies that because each of the
[22:12] individual agents aren't really noticing
[22:13] that pattern. They don't know that other
[22:15] agents are also seeing kind of that
[22:16] 60-second pattern every single time. And
[22:19] it leaves a note. And the goal with this
[22:20] is future agents benefit from this
[22:22] learning and can go figure this out more
[22:24] efficiently. It also does a dduplication
[22:27] and curation step. It sees that there
[22:29] were five of the same entries uh from
[22:32] previous agents that were working with
[22:33] this memory store and it consolidate
[22:35] consolidates that into a single entry.
[22:38] It removes a stale entry that's no
[22:39] longer valid that it saw in the
[22:41] transcript uh that is no longer
[22:43] relevant. And then it adds this
[22:45] verification note. It says at this time
[22:47] based on this transcript I just looked
[22:48] at this memory is actually accurate. I
[22:51] was able to verify it based on the work
[22:53] that the agent was doing and therefore
[22:54] you can rely on it um in the next day
[22:56] when you start using the same memory
[22:58] store. So there's that verification
[23:01] backfill organization steps that we
[23:03] think memory and dreaming are really
[23:04] useful for. Um, and so with this demo,
[23:07] what we've kind of seen is how we can
[23:09] actually build production agents using
[23:11] the memory and dreaming APIs in the
[23:13] managed agents API. And to close out, I
[23:17] think that over the next couple of
[23:18] months, we're going to start seeing
[23:19] agents that run for days or many, many
[23:22] hours at a time. And I think that memory
[23:25] is going to be an really important part
[23:27] of that system and what makes it
[23:29] ultimately possible. So, I'm really
[23:31] excited to see what everyone builds with
[23:32] memory and dreaming in the cloud manage
[23:34] agents API. Um, and you should get
[23:36] started today. Thank you.
