---
title: "I Built Self-Evolving Claude Code Memory w/ Karpathy's LLM Knowledge Bases"
source_type: "youtube"
channel: "Cole Medin"
date: "2026-04-06"
url: "https://www.youtube.com/watch?v=7huCP6RkcY4"
pillar: "building"
tags: [claude-code, memory, llm-knowledge-bases, obsidian, karpathy, agents, second-brain, hooks]
ingested: "2026-04-13"
extraction_method: "auto-captions"
video_id: "7huCP6RkcY4"
duration: "19:23"
---

[00:00] Let's face it, every week you and I are
[00:02] playing the game, what's the latest and
[00:03] greatest in the AI space, right? It
[00:05] changes every single week. And right
[00:07] now, everyone is focused on LLM
[00:10] knowledge bases, which originated from
[00:12] this tweet from Andre Karpathy. And
[00:14] there are a lot of really cool ideas
[00:16] here that I want to get into with you.
[00:18] And I built my own memory system on top
[00:21] of this. I think you're really going to
[00:22] like it's simple, but super effective.
[00:25] So, more on that in a bit, but let's get
[00:27] into a bit of context here. So Karpathy
[00:29] starts by saying something I'm finding
[00:30] very useful recently is using LLM to
[00:33] build personal knowledge bases for
[00:35] various topics of research interest. So
[00:38] taking external information bringing it
[00:39] into our own system and organizing it in
[00:42] the best way for agents to query. And
[00:45] this is a big use case for AI second
[00:47] brains right now which is something I've
[00:49] been focusing on a lot recently. And I
[00:51] love seeing that he's using Obsidian as
[00:53] a core part of his stack. I always call
[00:55] it my canvas for working with things
[00:58] with my second brain. So cool to see
[00:59] that. And he really gives us his entire
[01:02] playbook here. It's nice and simple. So
[01:03] he talks about how he brings in
[01:05] information data ingestion, how he views
[01:07] it, how he queries it, how he formats
[01:09] it, health checks that he's built in as
[01:11] well. And so I want to cover this entire
[01:13] architecture here and that'll guide us
[01:16] into the custom solution that I've built
[01:18] on top. And I'm excited to show you this
[01:20] because here's the thing. This entire
[01:22] thing that he's presenting is working
[01:23] with external data which there are a lot
[01:26] of use cases for that. But what I've
[01:28] built here is working with internal
[01:30] data. So giving claude code a memory
[01:33] that evolves with your codebase. So
[01:36] basing the whole LLM knowledge base on
[01:38] our conversations with our coding agent
[01:40] or second brain instead of bringing in
[01:42] external data. But I've structured
[01:44] everything in exactly the same way. all
[01:46] of the optimizations for how we index
[01:49] and create systems for our agent to
[01:51] explore the information. It's really
[01:53] cool. So, let's get into the
[01:54] infrastructure and then I'll show you
[01:56] how you can use this to evolve any
[01:58] codebase. And yes, cloud code does
[02:00] already have a memory system built in
[02:02] and there are open- source solutions out
[02:04] there already for claim memory. But I
[02:06] wanted to build this specifically
[02:08] because I am following everything
[02:10] Harpathy laid out here to a tea just for
[02:12] internal instead of external
[02:14] information. It's a lot simpler than
[02:16] other approaches already out there and I
[02:18] would argue even more effective. You'll
[02:20] see what I mean when we get into it. So,
[02:22] something really interesting that he
[02:23] says at the top here is he's spending
[02:25] more of his tokens with his agents
[02:26] manipulating knowledge like Markdown and
[02:29] Obsidian instead of manipulating code.
[02:32] But he works with knowledge in a very
[02:34] similar way that we work with code. That
[02:36] brings us to the compiler analogy. This
[02:38] is the simplest way to explain
[02:41] everything that he's built in the system
[02:42] here because the way that we're handling
[02:44] knowledge is very similar to how we take
[02:46] source code all the way into a final
[02:49] application for the end user to run with
[02:51] a compiler. And so let let's take it
[02:54] from the top here. So we start with our
[02:55] source code which for the case of our
[02:57] LLM personal knowledge bases, it's our
[03:00] articles, papers, anything that we are
[03:02] finding online that we want to bring
[03:04] into our system. So I'll go to the
[03:06] Obsidian vault because this is what
[03:08] Karpathi uses. This is what I use for my
[03:10] AI second brain. We have the raw folder
[03:12] here. This is the entry point into our
[03:14] system where we'll dump anything
[03:16] articles, papers, transcripts,
[03:18] everything just as raw markdown. And
[03:20] then we'll take that and move it into
[03:22] the compiler stage. This is where we
[03:24] have a large language model process all
[03:26] this raw information. So creating
[03:28] summaries, linking documents together,
[03:30] just generally figuring out how to
[03:32] structure our knowledge. And for the
[03:34] system that Karpathy has designed here
[03:36] for the compiler, we do actually have
[03:39] scripts. We have code that takes our raw
[03:41] information, gives it to an LLM to
[03:43] produce the wiki here. So that brings us
[03:46] to the next step. The compiler goes to
[03:48] the executable. This is what we run or
[03:50] in the case of our personal knowledge
[03:52] base. This is what we query. So he calls
[03:54] it a wiki. This is where we have our
[03:56] compiled articles, everything produced
[03:58] from the large language model and we
[04:00] have the back links. We are connecting
[04:02] pieces of knowledge together. So going
[04:04] back to Obsidian again, we have our
[04:06] graph view. This is one of the coolest
[04:08] parts of Obsidian where we can see how
[04:10] our different pieces of knowledge, our
[04:12] different markdown documents are
[04:14] connected together through back links.
[04:16] And this is powerful because it gives
[04:18] our agent the ability to traverse
[04:19] through the graph to search better and
[04:22] even connect different pieces of
[04:24] knowledge together to give us a more
[04:26] comprehensive answer. So this is what we
[04:28] run. This is what we search. But before
[04:30] we actually get to the final step with
[04:32] the runtime, we also have a test suite
[04:35] to continue with the analogy of code.
[04:37] Here we are performing linting. He calls
[04:40] it linting over our documents. So we're
[04:42] finding gaps where maybe we need to do
[04:44] more research. Any kind of stale data,
[04:47] things that maybe we have in our raw
[04:49] folder that aren't actually in our wiki
[04:51] yet and we need to take care of that
[04:52] discrepancy. any kind of broken links.
[04:55] Like if we have one document linking to
[04:56] another that doesn't exist, we're going
[04:58] to take care of all of that. And so
[05:00] we're even going so far in this system
[05:02] as to making sure that our data has
[05:05] integrity. That's pretty important. We
[05:07] want to have an accurate personal
[05:09] knowledge base. And then finally, we get
[05:11] into the last step here where we are
[05:13] running queries, right? This is the
[05:14] runtime where we are taking advantage of
[05:16] our wiki, having our agents search
[05:18] through it to find information for what
[05:20] we are currently working on. And the
[05:22] really interesting thing here is
[05:23] Karpathy said, "I thought I had to reach
[05:25] for fancy rag, but the large language
[05:28] model has been pretty good about
[05:29] automaintaining index files." And so one
[05:32] of the most important files in this
[05:34] entire setup within the wiki, we have
[05:36] the index. So this file describes to the
[05:38] agent here are all the different folders
[05:41] and resources that you have access to.
[05:43] So it uses this as a starting point. So
[05:45] we don't even have to do fancy rag. The
[05:48] agent can just navigate through all the
[05:50] files that we have as marked on in our
[05:52] obsidian vault. It doesn't have to do
[05:53] any semantic search. There's no vector
[05:55] database here. It's nice and simple.
[05:57] It's one of the beauties of this
[05:59] strategy that really drew me to build on
[06:01] top of it. Okay, so let's now go from
[06:03] the compiler analogy to the exact data
[06:06] flow. I think this will really take it
[06:08] home for you. Then we'll get into my
[06:10] implementation that I built on top. I'll
[06:11] talk about how it relates to all these
[06:13] ideas here. So, okay, we start with our
[06:15] external information, and Carpathy
[06:18] specifically calls out the Obsidian Web
[06:21] Clipper. It's a really neat extension to
[06:23] Obsidian that allows us to very easily
[06:25] take anything from the internet and
[06:27] bring it directly into our vault or in
[06:29] this case, right into our raw folder,
[06:31] the source of truth, like we talked
[06:33] about earlier, the unprocessed markdown
[06:35] that we feed that into the large
[06:36] language model to create our wiki for
[06:39] us. And so, I've built up a simple
[06:41] example here for demonstration. My raw
[06:43] folder just has some different articles
[06:45] on AI topics. And then within the wiki,
[06:48] this is what is processed. This is what
[06:50] our agent actually queries. We have this
[06:52] concepts folder and this is where we tie
[06:55] everything together. We're taking ideas,
[06:57] concepts out of our raw documents. And
[07:00] we also have connections, how different
[07:02] things are relating together. And then
[07:03] of course we have the index. This is the
[07:05] main file that we want our agent to
[07:07] always have access to so that it has a
[07:09] highle idea of where it's going to start
[07:11] looking based on our question. And then
[07:14] the last thing that we have here is the
[07:16] agents.mmd. So this is like global rules
[07:18] for your coding agent, right? And so
[07:20] really what we do in our global rules
[07:22] here is we're describing the entire
[07:25] system for LLM knowledge bases so the
[07:27] agent understands here's where my
[07:30] information comes from. Here's the
[07:31] compiled version that I'm going to
[07:33] search. Here is the index and the log
[07:35] file, right? Like the entire system we
[07:37] explain to the agent. So it has that
[07:39] meta reasoning. It understands what it's
[07:42] been dropped in. When you start a new
[07:44] session with your second brain or coding
[07:46] agent, whatever it is. And the best part
[07:48] is if you want to build this entire LLM
[07:50] knowledgebased system for yourself, all
[07:53] you need to do is send this prompt into
[07:55] your coding agent. It could not be
[07:57] simpler. So this came directly from
[07:59] Karpathy. He had a follow-up tweet where
[08:01] he linked to this. This is essentially a
[08:03] PRD, right? A product requirement
[08:05] document that outlines everything we
[08:07] have to build for you to include this
[08:09] system in your own coding agent or
[08:11] second brain. And so you just prompt
[08:13] this in no other context and it's just
[08:16] going to oneshot the whole thing for
[08:18] you. And that's what I built into my
[08:20] version as well. If you look at the
[08:22] readme here for the quick start, you
[08:24] don't even have to clone the repo
[08:25] yourself. You just send this prompt into
[08:27] your claude code, clone it, and then set
[08:30] up everything with the claude code
[08:32] hooks, everything that I have to make
[08:34] this LLM personal knowledge base, but
[08:37] for internal information instead of
[08:39] external. So, inspired by the entire
[08:42] architecture we just covered here, but
[08:43] that's the key difference is now this is
[08:45] giving Claude code a memory that evolves
[08:47] with your codebase. So, instead of
[08:49] taking things from the internet, we are
[08:51] going to automatically capture session
[08:53] logs with hooks. And so session logs are
[08:56] kind of like the raw folder where we're
[08:58] just putting in our conversations and
[09:00] then we're going to use the claude agent
[09:02] SDK behind the scenes to automatically
[09:04] extract everything into structured cross
[09:07] reference knowledge articles. So your
[09:10] coding agent like you can do this per
[09:11] codebase. It's going to get smarter and
[09:13] smarter over time because it remembers
[09:15] the decisions you've made and how you've
[09:17] evolved your project. The sponsor of
[09:19] today's video is InsForge. Insorgge is
[09:22] an open- source platform that gives your
[09:24] coding agent everything it needs to ship
[09:26] full stack apps. Think if you had
[09:28] Verscell, Superbase, and Open Router all
[09:30] in one platform. So we have a database,
[09:34] we've got authentication, storage, we
[09:36] can route to 50 different large language
[09:38] models. We have hosting as well. It is
[09:41] everything you need. And we give our
[09:42] agent the ability to manage all of this
[09:44] through a CLI and an agent skill. And
[09:46] take a look at this. It literally takes
[09:48] less than 5 minutes to install the
[09:49] InsForge CLI and skill on any codebase.
[09:52] And then I can go into cloud code and
[09:54] prompt it to create an application. So
[09:55] here I'll have it make both a backend
[09:57] and a front end. And I'm specifically
[09:59] asking it to use infors to create my
[10:02] database table, set up authentication to
[10:04] host it as well. Once it goes through
[10:06] this entire process here, then we end
[10:10] with a hosted application. What I'm
[10:11] showing you right here is a live URL.
[10:14] And I have authentication set up. So I
[10:15] can even demo this here. I created an
[10:17] account off camera. I'll sign in. We
[10:19] have access to our database behind the
[10:21] scenes. So, this is not just local
[10:22] storage, a hosted application, live
[10:24] database. I can even use an AI model to
[10:27] recommend a task for me here. So,
[10:28] showing off the AI part of InsForge as
[10:30] well. We have got everything running and
[10:32] we didn't have to configure anything
[10:34] oursel. Insource
[10:36] and free to get started. Plus, you can
[10:38] use promo code ins promo for a free
[10:41] month of pro. I'll have a link in the
[10:43] description. So, seriously, you should
[10:44] just try this right now. Open up Cloud
[10:46] Code in whatever codebase you're
[10:48] currently working on, your second brain,
[10:49] Open Cloud, whatever, and just send in
[10:51] this prompt. It'll immediately level up
[10:53] the long-term memory for your coding
[10:55] agent when it's working on that project
[10:57] specifically. We're building up lessons
[10:59] and takeaways for this codebase. And so,
[11:02] I have the repository cloned locally.
[11:04] I'm just going to work within it
[11:05] directly to give you an example here,
[11:07] but you're going to use this prompt to
[11:09] bring it into wherever you are already
[11:11] working. And so you don't have to do
[11:13] this, but I would recommend starting
[11:15] with an Obsidian vault. It's our canvas
[11:17] to view all of the memories and the
[11:19] whole wiki that we create with Claude
[11:21] Code. And so you'll open a folder as a
[11:23] vault. Once you have Obsidian installed,
[11:25] it's free and super easy to install. So
[11:28] I'll open here and you just have to give
[11:29] it a path to where wherever you have the
[11:32] code base that you've brought in this
[11:33] system. So I'll just select this folder
[11:35] right here. That'll create a brand new
[11:36] Obsidian vault. I usually like to make
[11:38] it look nice as well when I first create
[11:40] a vault. So, I'll go into the settings
[11:41] in the bottom left. I'll go to
[11:43] appearance and then manage to select a
[11:45] theme. They got a lot of really awesome
[11:47] ones. Obsidianite is my favorite. So, I
[11:49] will click install and use. And then I
[11:51] usually like to switch to the dark theme
[11:53] as well. There we go. Now, it looks like
[11:55] the other vault I showed you earlier for
[11:58] a demo. And so, this is where we're
[11:59] going to manage the daily logs. I'll
[12:02] talk about this in a second. And then
[12:03] also, this is our wiki equivalent where
[12:06] we have our index. I mean, everything.
[12:08] This is exactly what Karpathy has set up
[12:10] with the concepts and connections
[12:12] everything that we use a large language
[12:14] model to process from our raw input. So
[12:17] this entire system is only driven by
[12:19] claude code hooks. That's the
[12:21] beautifully simple part about it. That's
[12:23] why all you have to do is send in this
[12:25] prompt to get everything set up for your
[12:27] codebase where you run cloud code. We
[12:29] don't have to install anything else. We
[12:31] don't have to set up any integrations.
[12:33] And so going to our settings.json, JSON.
[12:35] This is where you always define your
[12:36] hooks for cloud code. I want to at least
[12:39] at a high level show you how everything
[12:40] works here. I think it'll really click
[12:42] for you. So, we start with a session
[12:44] start hook. And so, this is going to run
[12:47] whenever we start a new cloud code
[12:49] session. And all we're doing with this
[12:51] simple Python script is loading in the
[12:53] agents.mmd. We covered this earlier.
[12:55] That's so our cloud code understands the
[12:58] system that we put in it. And then it's
[13:00] also loading in, if we go into the
[13:02] knowledge, this is our wiki equivalent.
[13:04] We're loading in our index.mmd. You've
[13:06] already seen this as well. This is our
[13:07] actively maintained list of files. So
[13:09] our agent can query more efficiently.
[13:12] And so whenever we begin a new cloud
[13:14] code session, it has both of those
[13:16] things already. And so now I can ask a
[13:18] question just for demo purposes. I have
[13:20] a knowledge base already built up for a
[13:22] project. And so I'm asking something
[13:24] that it wouldn't really know by itself
[13:27] without having to do deep analysis in
[13:29] the codebase. But right here, it's just
[13:31] going to rely directly on what we have
[13:33] in our knowledge base. Take a look at
[13:34] that. Based on your knowledge base, here
[13:36] are the key things to watch out for.
[13:38] Then some technical details we don't
[13:39] have to cover here. But then it calls
[13:41] out the specific KB articles that it
[13:43] referenced in order to get us this
[13:45] answer. And so the index told it where
[13:48] to point. It ran some queries that we'll
[13:50] talk about in a little bit. And it
[13:51] pulled things from our knowledge. And so
[13:54] again, we have the equivalent of our raw
[13:56] folder with our daily logs. This is
[13:58] where we're going to capture summaries
[13:59] of every single conversation with cloud
[14:02] code. I'll show you how we do that with
[14:03] the other hooks in a second. So, daily
[14:06] logs, that's our raw equivalent. And
[14:07] then we have our wiki. This is where we
[14:09] have the things that are better
[14:11] formatted, linked together. We have the
[14:13] whole graph view here in Obsidian. This
[14:15] is what our agent is searching through.
[14:17] And I know this is a really basic
[14:19] example here, but just like think for a
[14:21] second how powerful this actually is. If
[14:23] I asked this question without this whole
[14:25] system built in, it would have had to
[14:27] look through the git log and even that
[14:29] might not have had the lessons for what
[14:31] to watch out for. It would have had to
[14:32] spin up sub aents to look through the
[14:34] codebase, which would be painfully slow,
[14:35] especially if the codebase was bigger.
[14:38] But since we're maintaining takeaways
[14:40] from all of our conversations with cloud
[14:42] code, I was able to get this answer in
[14:44] like 10 seconds. You saw it happen live.
[14:47] And so the other really powerful part of
[14:49] this entire system is the other two
[14:51] hooks. We have a pre-ompact and a
[14:53] session end. And they're both actually
[14:54] doing a very similar thing. Whenever
[14:56] we're about to lose context, either
[14:58] through closing off a session or doing
[15:00] memory compaction, we want to send the
[15:04] latest messages from cloud code into
[15:07] another large language model to process
[15:10] and create the summary. And that summary
[15:12] is what we're going to put in the daily
[15:13] log file. So like this is the summary
[15:15] from one conversation, you know,
[15:17] decisions that were made, lessons that
[15:18] were learned, action items, and then we
[15:20] go on to the next session. We have a
[15:22] very standard format here handling every
[15:24] single Claude code session. And the way
[15:27] that this works is this hook, actually
[15:29] both of these hooks, they are going to
[15:31] call the Claude agent SDK under the
[15:34] hood. So we have a separate Claude
[15:36] process running where it's just given
[15:38] the transcript from the conversation and
[15:40] it summarizes things here. So, we're
[15:42] doing that initial layer of data
[15:45] processing. And not to get too technical
[15:48] here, but one other really powerful part
[15:49] of this is we have the flush process.
[15:52] And so once a day, we're going to take
[15:55] the logs, we're going to extract the
[15:58] concepts and connections from them. And
[16:00] then that's what we populate in the
[16:01] wiki. And then our search is going to
[16:04] focus here in knowledge, but then it can
[16:06] also look through the daily logs if we
[16:07] want as well. So we have full
[16:09] information about everything here.
[16:11] lessons learned, decisions made. If you
[16:12] want to customize this, you can even go
[16:14] into the scripts here. You can go into
[16:17] the flush or you could go into the
[16:19] compile and you can actually change the
[16:22] prompt that we send into the cloud agent
[16:24] SDK under the hood. So, another
[16:26] beautiful part about this whole setup,
[16:27] unlike Claude Code's memory system, is
[16:29] you can customize this to your heart's
[16:31] content. And Claude Code can even walk
[16:33] you through making the customizations
[16:35] because it has access to the agents.m
[16:37] MD. It knows how everything works. It
[16:39] knows where the prompts are. It knows
[16:41] how the memory promotion process works.
[16:43] It knows where the daily logs are. So,
[16:45] it's very it's a very self-contained
[16:48] system that can improve itself. And
[16:50] speaking of improving itself, that's
[16:51] actually the last big thing that I want
[16:53] to cover with you. I want to talk about
[16:54] the compounding loop. Cuz think about
[16:56] this with me for a second. We always
[16:57] will start by asking some kind of
[16:59] question. We want to leverage our
[17:01] knowledge base. We're going to get some
[17:03] kind of answer with our agent searching
[17:05] across many different wiki articles. So
[17:07] it's extending its arm across our
[17:09] knowledge base, synthesizing information
[17:12] together, but then it's going to file
[17:14] that single answer. So we're constantly
[17:16] connecting information between our
[17:18] conversations and saving that. And so
[17:20] our wiki grows over time because of
[17:22] that. And then also all the new
[17:23] information coming in from all of our
[17:26] future Claude code sessions. And so
[17:28] we're building up our knowledge base
[17:29] over time. The agent is going to be able
[17:31] to search through our knowledge better
[17:33] over time. As we ask more questions, it
[17:35] just gets better and better and better.
[17:38] And we really don't have to do anything
[17:40] to maintain this. For example, if I
[17:42] extend the conversation where I asked
[17:45] our first question here to have it do
[17:47] more web research, I have more
[17:48] takeaways. All I have to do is end this
[17:51] session or do a memory compaction and
[17:53] then automatically we can see that the
[17:55] logs are I saw this just come up here.
[17:57] We already have the cloud agent SDK
[17:59] running in the background. It can use
[18:00] your anthropic subscription just like
[18:02] cloud code. You don't have to set up any
[18:04] API key or anything and it's
[18:06] automatically going to extract takeaways
[18:07] and put it in our daily logs. Let's
[18:09] actually look at this right now cuz I
[18:10] believe it already finished. There we
[18:12] go. Take a look at this. So this is our
[18:13] session that just ran. We were exploring
[18:16] best practices for handling external
[18:17] service data and then we have these key
[18:20] exchanges lessons learned from our
[18:22] additional web research. We're building
[18:24] this up over time. It'll eventually get
[18:26] promoted into our wiki here. We don't
[18:28] have to do anything and the questions
[18:31] that we ask our agent are just going to
[18:32] get better and better answers over time.
[18:35] Very very powerful. So there you go.
[18:37] That is LLM knowledge bases for internal
[18:39] data long-term memory for our second
[18:41] brains instead of external data like
[18:43] Karpathy's implementation. But of
[18:45] course, thanks to him for all of the
[18:47] inspiration here. And Claude Code Hooks
[18:50] is something I've been building into my
[18:51] second brain for a long time now. And so
[18:53] I recently did a 4-hour workshop in the
[18:56] Dynamis community where I showed
[18:58] everything. I actually built my second
[19:00] brain again from scratch. And so
[19:02] definitely check out the Dynamus
[19:04] community linked in the description and
[19:05] pin comment if you're interested in
[19:08] building your own second brain on top of
[19:10] Cloud Code and the Cloud Agent SDK.
[19:12] Otherwise, if you appreciated this video
[19:14] and you're looking forward to more
[19:15] things on building agents and second
[19:17] brains, I would really appreciate a like
[19:19] and a subscribe. And with that, I will
[19:21] see you in the next
