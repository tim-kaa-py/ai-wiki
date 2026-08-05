---
title: "Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers)"
type: "youtube"
channel: "Jay E | RoboNuggets"
date: "2026-08-03"
resource: "https://www.youtube.com/watch?v=gQeRjkb_Hlc"
pillar: "building"
tags: [claude-code, best-practices, agents, workflow]
timestamp: "2026-08-05"
extraction_method: "auto-captions"
video_id: "gQeRjkb_Hlc"
duration: "24:01"
---

# Claude Code Just Changed Forever (6 NEW Rules by Anthropic Engineers) — Transcript

[00:00] So one of the lead engineers at
[00:01] Anthropic just published this
[00:02] breakthrough article on X. It now has 4
[00:05] million views [music] and in it he
[00:06] outlines the important changes that
[00:08] they've made to Claude code, which if
[00:09] you pay attention to can make your setup
[00:11] faster, can make your systems cost less,
[00:13] and just overall let you upgrade your
[00:15] agentic operating system. I read through
[00:17] this whole article and today I'll break
[00:18] down for you the six new rules of Claude
[00:20] code that it talks about, which some of
[00:22] them by the way are the exact opposite
[00:23] of the advice we've been following for
[00:25] months. And by the end I'm also going to
[00:27] share with you a skill that lets you
[00:28] automatically apply these improvements
[00:30] [music]
[00:30] to your own setup. And if you're new, my
[00:32] name is Jay. I spent over a decade
[00:34] working with brands you may know, have
[00:35] been in AI since my masters in data
[00:37] science. Now I'm running an AI business
[00:39] and one of the largest AI communities
[00:40] globally. Let's dive into it.
[00:42] >> [music]
[00:45] >> So to give you some context, this person
[00:47] Tariq, he's one of the more well-known
[00:48] engineers who is working in Anthropic
[00:50] and this past week he published this
[00:52] really good article called the new rules
[00:54] of context engineering for Claude 5
[00:57] models. And this has been out for only a
[00:58] few days, but you can see already
[01:00] garnered something like 4.3 million
[01:02] views. So that's a very good signal that
[01:04] there's a couple of great nuggets to
[01:05] learn from here. Now it's a pretty long
[01:07] article so I read through it so that you
[01:08] don't have to and in this video I'll
[01:10] just break down all of the insights for
[01:11] you so that you can directly benefit
[01:13] from it. And with this article the core
[01:14] topic of it is this piece called context
[01:16] engineering, which if you haven't heard
[01:18] that term before it's probably worth
[01:19] stepping back to just understand what it
[01:21] is because whenever you work with AI
[01:22] agents like Claude or Hermes or Codex,
[01:25] then for sure you yourself even without
[01:27] knowing it have done a bit of context
[01:28] engineering as well. And Tariq mentions
[01:30] it here as well because when you send a
[01:32] message or a prompt to Claude that
[01:34] prompt is actually only a small part of
[01:36] the context that it gets. And a big part
[01:38] of the output is that your agent gives
[01:40] you is coming from your context. And
[01:42] just to hone in on this point, whenever
[01:44] you start a Claude session and you send
[01:46] your first prompt, Claude actually
[01:47] doesn't just work from that prompt or
[01:49] that message that you send, right?
[01:51] Because in this case the prompt is just
[01:52] a direction that you're giving to
[01:53] Claude, but it becomes so much more
[01:55] powerful if you have your context
[01:57] organized. And just to make it simple,
[01:59] whenever I talk about context in our
[02:00] community, I always use this arms
[02:02] framework with the core idea being that
[02:04] if you organize and engineer this arms
[02:06] framework properly as your context, then
[02:09] you're actually ahead of like 99% of
[02:11] Claude and agentic AI users. Because the
[02:13] entirety of your context that consists
[02:15] of the applications that you are using,
[02:18] which you have connected via tools like
[02:19] MCPs or APIs or CLIs. You have your
[02:22] routines, which are basically your
[02:24] scheduled tasks or your crons that you
[02:26] have set up. You have your memory, which
[02:28] are all the artifacts and all of the
[02:30] reports and documents that you have
[02:32] generated over time. And finally, you
[02:33] have your skills, which are SOPs or
[02:37] processes that you can actually invoke
[02:38] through skill commands that immediately
[02:41] just teach Claude how to do a given set
[02:43] of work. And so when we talk about
[02:44] context engineering, the way that I
[02:46] think of it is always just revolving
[02:48] around these four elements. And what
[02:50] Tarek is saying in this article is that
[02:52] because the way that Claude's models
[02:54] have evolved, there's actually a few new
[02:56] things that have changed quite
[02:57] drastically when it comes to operating
[03:00] or engineering the context for these
[03:02] models. And to give you a clear example
[03:04] of how drastic it is, at least in
[03:05] Anthropic's team, he is mentioning here
[03:08] that they actually removed over 80% of
[03:10] Claude code's system prompt for models
[03:13] like Opus 5 and Fable 5. And even just
[03:15] by doing that, they experienced no
[03:16] measurable loss on their coding
[03:18] evaluations. And this is quite a big
[03:20] deal and just shows you how far we've
[03:22] come in terms of the intelligence and
[03:23] the raw capability of these models.
[03:25] Because if you just take a step back,
[03:27] only last year when Opus 4 was launched
[03:29] and also coincidentally around the same
[03:30] time that Claude code was launched, the
[03:32] benchmark intelligence score of Opus 4
[03:35] back then was only 31% on the artificial
[03:38] analysis index. Which just to quickly
[03:40] share with you what that is, that is
[03:41] coming straight from this company called
[03:43] artificialanalysis.ai.
[03:45] And their benchmarks here for raw
[03:46] intelligence is actually quite good
[03:48] because what they essentially do here is
[03:49] throw a a of really difficult tasks to
[03:51] these models across a variety of
[03:53] disciplines and score them out of 100.
[03:56] And this company is also backed by some
[03:57] big names in the AI field like Nat
[03:59] Friedman, who's the ex-CEO of GitHub, as
[04:01] well as Andrew Ng, who's the former head
[04:03] of Google Brain. And so, the point being
[04:05] that I think if you're looking for like
[04:06] one benchmark that is a good reference
[04:08] every time new models drop, I think
[04:10] artificialanalysis.ai
[04:11] would be a good source for you. And if
[04:13] you look at the chart here, the ones
[04:15] that are topping the leaderboards right
[04:16] now is Opus 5 as well as Fable 5, and
[04:18] they're getting a score of 60 out of
[04:20] 100. Which again, if you go back to our
[04:22] comparison here, that 61% is actually
[04:25] leagues better versus what we had only a
[04:28] year ago. And so, what Tarek was sharing
[04:29] in that article is that because these
[04:31] models are now so capable, there's
[04:33] actually a few new rules to understand
[04:35] when it comes to engineering the context
[04:37] of your workspace so that your agents
[04:39] can work more effectively. And so, when
[04:41] you're building out your own second
[04:42] brain or you're building out an agentic
[04:44] operating system for companies, then
[04:46] this is a good article for you to get
[04:48] insights from. And the great thing about
[04:50] what Anthropic outlined here is that
[04:51] they actually provided a then and now
[04:53] view. So, what are the rules that were
[04:55] true before, and what are the revised
[04:57] rules that we should consider now as we
[04:59] work with these agents. And so, I'll go
[05:01] through each one of these along with a
[05:02] few examples so that we can all
[05:04] understand it. And by the way, if you
[05:05] want to learn how to build and sell AI
[05:06] systems that businesses actually pay
[05:08] for, then that's pretty much all we do
[05:10] over at the Robo Nuggets community.
[05:12] Where not only do you get access to the
[05:13] Claude Living Masterclass, which we
[05:15] update every week and takes you from
[05:17] zero to mastery with the latest on AI,
[05:19] but you also get access to our Agents as
[05:21] Course, which walks you through how to
[05:23] actually get paid for all these AI
[05:25] skills that you're learning. You also
[05:26] get to be part of a genuinely great
[05:28] community of AI builders. In fact, you
[05:30] can see just some of the recent wins our
[05:31] members are getting from the program
[05:33] right here. So, if you want to start
[05:34] earning from AI, then check that just in
[05:36] the pinned comment below. Now, back to
[05:37] the video. So, a big one for us to
[05:39] understand is that if before it's
[05:40] important to give Claude a lot of rules,
[05:43] this time it is actually important to
[05:44] let Claude use judgment. And here Tarek
[05:47] explains it that when they first rolled
[05:49] out Claude code, they needed to be sure
[05:50] that Claude avoided worst-case scenarios
[05:52] such as deleting files. Because
[05:54] remember, the models weren't as smart
[05:55] back then. And so that meant that they
[05:57] would give particularly strong guidance
[05:59] and rules that might not always be true
[06:02] and is actually limiting Claude Fable 5
[06:04] or Opus 5 in today's world. So the
[06:06] example he gives here because they deal
[06:08] with a lot of code documentation is that
[06:11] before in the system prompt of Claude
[06:12] code, they were actually giving a more
[06:15] stringent set of rules like this where
[06:16] they're asking Claude to default to
[06:17] writing no comments, to never write
[06:19] multi-paragraph docstrings, and
[06:21] basically just very specific rules.
[06:23] Which now with models that are much
[06:25] smarter than what we started with, it's
[06:27] actually better sometimes to just let
[06:28] your AI agent use a bit of judgement in
[06:31] order for you to get better results. So
[06:33] one example they're mentioning here is
[06:34] that they actually trimmed down that
[06:36] system prompt to just say this, to write
[06:37] code that reads like the surrounding
[06:39] code, to match its comment density,
[06:41] naming, and idiom. Now you might not be
[06:42] into coding and development yourself,
[06:44] but you can actually still take
[06:45] advantage of this new rule. So to give
[06:47] an example from my own second brain
[06:49] setup, which is basically how I'm
[06:51] engineering my context, I've started now
[06:53] to develop some skills that are
[06:55] literally just meant for Claude to
[06:57] surprise me with its output. And if I
[06:58] just look for that skill because I
[07:00] literally just named it as surprise me.
[07:02] I think it's this skill.md. And if I
[07:05] would look at the actual description of
[07:07] this surprise me skill, essentially it's
[07:09] one that I built in order for Fable and
[07:12] Opus to create really good front-end
[07:14] designs. If you just browse through some
[07:16] of the description lines of this skill,
[07:18] you can see that the direction here is
[07:19] for Claude to demonstrate extreme
[07:21] capability, taste, and artistic flavor.
[07:23] So it's really up to Claude to use his
[07:25] judgement in order to create better
[07:27] front-end designs. And to give you an
[07:28] example of some of the designs that it
[07:30] created, there's a lot of really good
[07:31] ones here depending on the niche that
[07:33] you are in. So there's one that has
[07:34] these kinetic dots design that looks
[07:36] pretty good especially when you are
[07:38] developing for the tech niche. There's
[07:40] is origami design that has even
[07:42] interactivity built into that. This one
[07:44] is quite good because it implements some
[07:46] really advanced ways to have more
[07:48] kinetic typography. And if I just scroll
[07:50] down here, there's a lot of optionality
[07:52] here in terms of different ways by which
[07:55] your AI agent can avoid that AI sloppy
[07:57] look that it usually defaults to. And
[08:00] the way that these were all created is
[08:02] because that surprise me skill just
[08:04] basically lets Claude use its own
[08:06] judgment in order to create effects like
[08:08] these that you may have not thought of
[08:11] yourself. And so the point being,
[08:12] especially when it comes to more
[08:13] creative thinking, you might actually
[08:15] want to just let Claude run with
[08:17] multiple iterations and multiple options
[08:19] instead of caging it with structured
[08:20] rules which may actually just hamstring
[08:22] your output rather than help you. Now, a
[08:25] related shift that is equally as
[08:26] important is this. Whereas before, if it
[08:28] was important to give Claude some
[08:30] examples, now Tariq mentions that it's
[08:32] even more important to give it design
[08:34] interfaces. And he elaborates it here
[08:36] where when they were designing the tool
[08:38] usage capability for Claude, before they
[08:40] were providing Claude some specific
[08:41] examples on how to actually use them.
[08:43] But with the newest models now like
[08:45] Fable 5 and Opus 5, what they found is
[08:47] that giving examples actually constrains
[08:49] them to a certain exploration space. And
[08:51] I find this to be true in our own work
[08:53] and projects as well. Because now it's
[08:54] really important for you to have your
[08:56] own design system if you want to stand
[08:58] out from the crowd and actually build
[09:00] your own brand. To give an example, a
[09:01] lot of the artifacts and builds that you
[09:03] see here in our platform like this
[09:05] getrubric.app website or its Rubric
[09:07] Flows tool which we use to visualize
[09:09] systems that we build out for clients or
[09:11] even the look of this second brain
[09:13] system that I made a video for before.
[09:15] And even these title slides that I'm
[09:17] showing in this video, all of this is
[09:18] being designed automatically by Claude
[09:20] using my design interface system skill.
[09:23] And if I were to just look for it, I
[09:24] call mine as /robo. And you can see if I
[09:27] zoom in here, whenever I create a Robo
[09:29] Nuggets branded material, I just invoke
[09:31] /robo and it's able to invoke this
[09:34] skill.md which is connected through this
[09:37] brandbook.html.
[09:38] And if I go ahead and open that,
[09:40] essentially what this HTML does is it
[09:43] just outlines the different rules when
[09:45] it comes to this design system. So, let
[09:47] me just shift that so you can see, and
[09:49] it provides color palettes, it provides
[09:51] some guidance on the voices as well as
[09:53] the fonts that we are using. It gives
[09:55] that visual style for the dot matrix
[09:57] effect that you're seeing a lot in the
[09:59] videos that I create. And essentially
[10:00] what we're doing here is we're not
[10:02] really giving examples to Claude
[10:03] anymore. Not specific examples entirely,
[10:06] so that it has more freedom to design,
[10:08] but still within a few guidelines that
[10:10] the design interface system is actually
[10:12] providing it. And so, if you were
[10:14] building out a design system for
[10:15] yourself for the first time, then these
[10:17] two rules that we just went over, you
[10:19] probably need to keep in mind. Because
[10:21] what I would do first is I'll probably
[10:22] ask people five to give me different
[10:24] design systems and give it feedback
[10:26] until we arrive at a point that we like
[10:27] that particular look. Then, let's say
[10:29] you actually like this Helvetica 26
[10:32] Swiss brutalist design, then you can
[10:34] just ask Claude to create a brand book
[10:36] HTML file that provides rules of how
[10:38] that design system is built, and then
[10:40] just ask Claude to make that into a
[10:42] skill file, something like /robo, or in
[10:44] this case it's probably /helvetica. And
[10:47] then, the next time that you create some
[10:48] materials, then it will always look this
[10:50] good. Now, another important shift that
[10:52] the article talked about is what we're
[10:54] calling as progressive disclosure, which
[10:56] you can see Tarek differentiates versus
[10:58] the practice before, where you are
[11:00] putting all of the context up front. And
[11:02] just to elaborate on that, he mentions
[11:04] here that because Claude Code in the
[11:05] very beginning was focused on coding,
[11:07] their system prompt included or needed
[11:09] to include detailed information on how
[11:11] to do code review verification, which
[11:13] are all these details that are not
[11:16] always needed, but when they are, it was
[11:17] actually crucial information. But what
[11:19] has changed since then is that Claude
[11:21] Code and these new batch of models have
[11:23] actually gotten very competent at using
[11:25] progressive disclosure, which is
[11:27] essentially loading the right context at
[11:29] the right times. And a great example of
[11:31] this is your own claw.md because it
[11:33] wasn't that long ago that there's a
[11:35] common advice that if you want to make
[11:37] your claw.md as strong as you can, you
[11:39] would want to make that a central
[11:40] repository of every known practice that
[11:43] you might run into. But in today's world
[11:45] and with these more powerful models,
[11:46] your claw.md actually becomes more
[11:48] powerful if you make it function as a
[11:51] router to your tree of files. And just
[11:53] to make that point clearer, if I go back
[11:55] to my second brain system here, you can
[11:57] see that my claw.md is at the center of
[11:59] this whole second brain system. And
[12:01] essentially what you're seeing here, all
[12:02] of these nodes are simply all of the
[12:04] files in my workspace. But because of
[12:07] the amount of files and context that's
[12:09] already in here, you can see I have
[12:10] something like 57,000 files already in
[12:13] this whole workspace, then it doesn't
[12:15] really make sense if you try to stuff
[12:17] your claw.md with every single context
[12:20] and way of working and operational rules
[12:22] that you would like your agent to
[12:24] remember. And so here you can see how I
[12:26] represented it in our second brain
[12:27] system is that our claw.md is actually
[12:30] just a router, so that it knows when I'm
[12:32] asking or working with it for content,
[12:34] then it's able to just tap to this set
[12:35] of files over here. If I'm working with
[12:37] it for my community, then there's this
[12:39] set of files that it can work with. If
[12:40] I'm dealing with product development,
[12:42] there is this branch. Personal stuff is
[12:44] this branch, and all the business
[12:45] dealings will happen on this side. And
[12:48] going back to Thrivec's point around
[12:49] building a tree of files, if claw.md is
[12:52] a pointer to these different departments
[12:54] or set of files, then what I actually
[12:56] have in my workspace, which you can try
[12:58] and emulate as well, is to have sub
[13:00] routers that basically just let Claude
[13:01] find the right files within this
[13:03] specific department. Just to give one
[13:05] example, let's say for content, I
[13:07] actually have a file that's called
[13:08] content.md. And you can see here that
[13:10] it's basically a router that gives
[13:12] Claude some direction on where to find
[13:14] things whenever we're working on
[13:15] content. So let's say we're in the
[13:16] process of ideating content ideas,
[13:19] there's some skills here that it names
[13:20] that are useful for that intent. When it
[13:22] comes to researching or producing the
[13:24] actual lesson or video, then it has
[13:26] several markdown file references and
[13:28] skills here as well. And so the point
[13:30] being here is that as your agentic
[13:31] operating system evolves and you start
[13:33] to have a workspace for your company or
[13:35] for your team that becomes a bit more
[13:37] complex, what you can start to do is to
[13:39] actually identify the different
[13:40] departments of your life and of your
[13:43] work and actually build out these sub
[13:45] indexes in order to help Claude navigate
[13:48] your tree of files more efficiently. So
[13:51] that instead of just filling your
[13:52] Claude.md with every single fact about
[13:55] your business, then you can start to
[13:57] make it a lot thinner and a bit more
[13:59] efficient so that it only progressively
[14:01] loads the context that you need during
[14:03] the sessions where you need them. Which
[14:05] in its essence is what progressive
[14:07] disclosure really is. And also remember
[14:09] that this has implications on cost and
[14:11] how often you run into usage limits.
[14:13] Because before, if you have your
[14:14] Claude.md set up so that it's quite
[14:17] thick and is quite verbose, then what
[14:18] really happens here is if this rectangle
[14:21] denoted by the broken lines would be
[14:23] your session and your context window,
[14:25] then every session that you start with
[14:26] Claude, you actually use up this much
[14:28] tokens, which is equivalent to your
[14:29] Claude.md the moment that you send your
[14:32] first prompt. Which in my view is a bit
[14:33] of a waste, especially if as time goes
[14:35] by and you start to use Claude or any
[14:38] agent platform a lot more, then that
[14:39] token usage does rack up. Now in
[14:42] contrast to that, if your Claude.md is
[14:44] thin and only serves as a router, then
[14:46] the more that you interact with your
[14:48] agent, you actually start to realize the
[14:50] efficiency gains because you are not
[14:52] using up as much tokens with this
[14:54] Claude.md that is essentially a system
[14:56] prompt that gets injected and also uses
[14:58] your token budget allocation the moment
[15:01] that you start a new session. Now this
[15:03] next one is quite simple because before
[15:04] with older models, you may find that you
[15:06] needed to repeat yourself quite a lot in
[15:08] order for the model to understand what
[15:10] you mean. But this time, Tarikin that
[15:11] article mentions that it's actually
[15:13] better to have more simple tool
[15:15] descriptions. And this is probably
[15:16] something that you will just notice in
[15:18] the background because before if you
[15:19] recall, there were some advice where if
[15:21] you continuously chat with a model in a
[15:24] particular session and that session
[15:25] starts to build up context, there is a
[15:28] more noticeable case of what we're
[15:29] calling context rot. And a good example
[15:31] of how that was is that models before
[15:34] were more likely to listen to
[15:35] instructions at the end of the context
[15:37] window, which are the most recent
[15:38] messages, than the ones at the start.
[15:41] And so as a result of that, you would
[15:42] sometimes need to provide more repeated
[15:45] instructions for a model in order for it
[15:47] to understand or remember what you mean.
[15:49] Now, what Tarek is mentioning here
[15:50] simply is that that has actually changed
[15:52] because a lot of these models with table
[15:54] five and opus five are actually more
[15:56] intelligent and a bit more smart. Same
[15:57] with the example by the Entropic team
[15:59] here, where he's saying that in the
[16:00] past, their system prompt would
[16:02] sometimes have references to tools in
[16:04] the main system prompt as well as
[16:06] instructions in the tool description.
[16:07] So, they're basically just putting it in
[16:09] two places at once. But now, they could
[16:11] just delete those other repeat examples,
[16:13] which in their case would be in the tool
[16:14] descriptions rather than the system
[16:16] prompt. So, there's less duplication.
[16:18] You also save on the token cost simply
[16:20] because these newer set of models are
[16:21] much more intelligent versus what we
[16:23] started with. And that leads us to
[16:24] another shift, which you also might have
[16:26] noticed in the background, which is
[16:27] basically this concept of automatic
[16:29] memory. And this concept and shift is
[16:31] very simple. What Entropic's mentioning
[16:33] here is that before, they actually used
[16:35] to encourage users to save things in
[16:37] Claude's memory, which if you don't
[16:38] know, you can actually use the hash
[16:39] hotkey to write to their cloud.md
[16:41] automatically. But instead, at this
[16:43] point in Claude code's development, it
[16:45] now can actually automatically save
[16:46] memories that are relevant to the work
[16:48] and to you. Now, this particular advice
[16:50] and this saving memories, I do see it
[16:53] happen on my side, but generally, I
[16:55] think if you have a productive session
[16:57] with Claude that you think there's a lot
[16:59] of information there that would be
[17:00] useful to be logged or remembered by
[17:02] Claude, I think it's definitely still
[17:04] worth just asking Claude to remember
[17:06] those things depending on how your
[17:08] second brain system and your agenda
[17:09] operating system is set up. Now, to give
[17:11] an example, at least in how I do it, I
[17:13] built out this skill called {slash}
[17:15] calibrate. And this is probably one of
[17:16] my most used skills because whenever I
[17:18] end a session with Claude, I just do
[17:20] /calibrate. And what it does is it will
[17:22] just review that current conversation
[17:24] and applies the best updates to skills,
[17:27] to claw.md rules, to memory, and to
[17:29] workflows that we have so that it
[17:31] captures the learning in that whole
[17:32] session and applies it to our operating
[17:35] system. As to give you a view of my VS
[17:37] Code IDE here where I'm using Claude
[17:39] Code. You see I've used calibrate here
[17:41] and what that did is it just updated
[17:43] these skills that I gave some feedback
[17:45] for. And apart from skills, it also
[17:47] calibrates my claw.md, the content.md
[17:49] router that I showed earlier, my memory
[17:51] files. It logged a new recipe or format
[17:54] under my prompt packs and so on and so
[17:56] forth. And so you can see with this one
[17:57] skill and the more that you use Claude
[17:59] Code, you're actually starting to refine
[18:01] the way you work with them so that it
[18:03] gets to know you better. And last but
[18:04] not least is the transition from simple
[18:07] specs to richer references. And to me
[18:09] this shift is really important because I
[18:11] use it on the daily. So what Tarek
[18:12] mentions here is that previously,
[18:14] literally just a few probably months
[18:16] ago, there was this over-reliance on
[18:18] markdown files with creating plans, with
[18:20] creating assets and artifacts because
[18:22] the prevailing knowledge is that these
[18:24] markdown files are simple enough and
[18:26] light enough so that it would help
[18:28] Claude have proper references for things
[18:30] like code or specs or essentially plans
[18:33] for projects that you're creating with
[18:34] it. And obviously markdown files still
[18:36] very important like your claw.md and
[18:38] your skill files are still in the
[18:40] markdown format, right? But what we're
[18:41] saying here is that you don't actually
[18:43] need to be limited anymore with just
[18:44] markdown files. Because with this newer
[18:46] batch of models, it can handle
[18:48] increasingly more complicated
[18:49] references. And the one that I really
[18:51] like and probably start to use more now
[18:53] more than markdown files are HTML
[18:55] artifacts. And a good example of an HTML
[18:58] artifact or reference is that brand book
[19:00] that I showed earlier. Because if this
[19:02] were a markdown file, it probably won't
[19:04] be able to convey the same idea. It
[19:06] won't be able to show visually what are
[19:08] the color palettes of this design
[19:09] system. And so having a reference like
[19:11] this, which you can see is an HTML file,
[19:13] basically a hypertext markup language,
[19:15] that when you open them, it just allows
[19:16] browsers like Chrome to render them
[19:18] visually. Then, there's a benefit of
[19:20] number one, your agent being able to
[19:22] parse through it, because under the
[19:23] hood, this is all still just code and
[19:25] still just text. But, also equally as
[19:27] important is that you, as the human,
[19:29] should be able to see and understand
[19:31] these references, especially the more
[19:33] visual ones. And this is also important
[19:35] when you're communicating ideas to other
[19:37] people, just like what I'm doing now.
[19:38] So, let's say this document about this
[19:40] skill called Dr. Plus, which I'll go
[19:42] over in a bit. This is much more visual,
[19:44] much more engaging versus the say if I
[19:46] were presenting to you right now a
[19:48] markdown file, then this probably won't
[19:50] be as effective as how it looks right
[19:52] now. In fact, sometimes if I feel like I
[19:54] have a lot of token budget remaining
[19:56] during the week, and I want to
[19:57] understand concepts or new skills that
[19:59] I'm investigating or trying out, simply,
[20:01] I routinely just ask Claude to create
[20:03] HTML artifacts for me, because this is
[20:05] just much easier to review versus like a
[20:07] markdown file or just being locked in
[20:09] the chat window terminal session, where
[20:11] you need to read through a wall of text.
[20:13] So, this is just one example where I
[20:14] literally just ask it to create an
[20:16] infographic using that {slash} Robo
[20:18] skill, our design system, in order to
[20:20] understand what are these new rules that
[20:22] the article was talking about. So, I
[20:23] pointed Claude to that article, it gave
[20:25] me those six shifts, gave me some
[20:27] examples of what these shifts are
[20:29] pertaining to, and this gives me a more
[20:30] solid idea in a much faster way versus
[20:33] me just having to read through Claude's
[20:35] essay on what this whole article is
[20:37] about. Now, the good news about all this
[20:39] is that Anthropic has actually made it
[20:40] really simple to apply all of these best
[20:42] practices with the latest version of
[20:44] Claude Code. So, if you update your
[20:45] Claude Code to the latest, then you'll
[20:47] be able to also get this {slash} doctor
[20:50] skill, which if you invoke that command,
[20:53] what it will basically do is five
[20:55] things. So, it will check your install
[20:57] of Claude Code to see if there's like
[20:59] any broken or duplicate installs, any
[21:02] path file path problems. It also finds
[21:04] dead weight, so for example, your skills
[21:06] or MCP servers, and even your cloud.md,
[21:09] it trims it down so that it's optimized
[21:11] to be thinner, just like what we
[21:12] mentioned earlier. If you have hooks set
[21:14] up, which are essentially these
[21:16] deterministic codes that you may have
[21:18] already set up if you're a bit more
[21:19] advanced in Cloud Code, then {slash}
[21:21] doctor will call out these hooks that
[21:23] add a bit of slowness to every turn or
[21:25] every message that you send to Cloud.
[21:27] And then finally, it just reports its
[21:28] findings before applying those fixes. If
[21:30] I go to my Cloud and just show, you can
[21:32] see I ran that {slash} doctor command a
[21:34] while ago. Gives me a summary of what it
[21:36] found. So, it says here that my install
[21:38] is healthy and up to date. It gives me a
[21:40] lot of detail around the stuff that it
[21:42] recommends. But, at the end of this, it
[21:44] gave me these options on what I actually
[21:45] want to do. So, it gave some MCP servers
[21:48] that I might consider disabling, which I
[21:50] think we can do that. There's a couple
[21:51] of skills in here that I think I either
[21:53] might have replaced already, which we
[21:55] can probably archive. There's also a
[21:57] plugin that I was demoing in a tutorial
[22:00] previously. And then it also tells me
[22:01] here that I am a bit behind on the
[22:03] versioning because I think every day
[22:05] there's a new version of Cloud Code. So,
[22:07] you might find that to be true for
[22:08] yourself as well. So, if you submit
[22:09] that, that just gets your Cloud Code
[22:11] instance to be up to spec, let's say, to
[22:14] these best practices. However, with just
[22:16] this {slash} doctor skill, I actually
[22:18] found that it is a bit more basic. It
[22:20] doesn't really capture the learnings
[22:21] that Tariq was mentioning in those six
[22:23] shifts. So, what I basically did is I
[22:26] just made this {slash} doctor plus,
[22:28] which is a skill that you can just grab
[22:29] below. It's available for free. And what
[22:31] that does, if in case you want a more
[22:33] complete checkup, is that apart from
[22:35] doing all the things that {slash} doctor
[22:37] does, basically by just invoking the
[22:38] same {slash} doctor command that ships
[22:40] with Cloud Code, is it also does a check
[22:43] of those six shifts that we talked
[22:45] about. And you can see when I ran this
[22:46] on my device, says doctor's clean
[22:48] because I've already done it before
[22:50] this. And then the good thing about this
[22:52] is that it actually tells me with those
[22:53] six shifts, what are some of the skills
[22:55] and artifacts that I can actually
[22:57] optimize based on these new rules of
[23:00] Cloud. So, it's telling me that this
[23:01] last 30-day skill, which is meant for
[23:03] research, is hitting a lot of red flags
[23:06] based on those new rules. And I actually
[23:08] I'm not surprised with this because I
[23:09] remember with this last 30 days, it came
[23:11] out a few months ago already. So, it's
[23:13] telling me here that this skill is
[23:15] actually really thick. It's like 2,090
[23:17] lines long. And we can probably optimize
[23:19] that by making this skill.md more of a
[23:21] router rather than dumping this whole
[23:23] 2,000 lines of context in there. But,
[23:25] there in essence, what you can do is to
[23:27] run this Dr. Plus skill and just do a
[23:30] more advanced checkup based on the
[23:32] shifts, based on the new rules that
[23:33] Tarek was mentioning in that now viral
[23:36] article. And again, you can just grab
[23:38] that whole skill, which you can import
[23:40] or customize for your setup or even set
[23:42] up a routine for. So, that let's say
[23:44] every month you run this Dr. Plus skill
[23:46] to do a check with your Cloud Code
[23:47] instance. And you can just get that in
[23:49] the description below.