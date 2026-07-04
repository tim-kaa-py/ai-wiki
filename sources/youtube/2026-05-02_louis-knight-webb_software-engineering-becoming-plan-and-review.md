---
title: "Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban"
type: "youtube"
channel: "AI Engineer"
date: "2026-05-02"
resource: "https://m.youtube.com/watch?v=W76woOYHlvY"
pillar: "building"
tags: [agents, agentic-coding-workflow, claude-code, codex, parallel-agents, plan-and-review, workflow, anti-patterns]
timestamp: "2026-05-09"
extraction_method: "auto-captions"
video_id: "W76woOYHlvY"
duration: "20:23"
---

[00:07] [music]
[00:15] >> Is this mic on? Yes, this mic is on. How
[00:16] we doing?
[00:18] Woo! [__] fantastic. Yeah, let's go.
[00:22] All right.
[00:24] Um this I've This is So, the the title
[00:27] of this is is about planning and review,
[00:29] but I think the real point behind this
[00:32] is like basically what are we all going
[00:33] to do after AI continues to get really,
[00:37] really good.
[00:38] Uh
[00:39] I'm Louie. I'm the founder of a startup
[00:42] called Vibe Canvas, and I also started
[00:44] the London chapter of AI Tinkers, uh
[00:47] which is great community um if you're in
[00:50] London looking for events.
[00:52] And
[00:53] you should listen to me because I have
[00:57] done some stuff like get on the
[01:00] SweeBench verified leaderboard ahead of
[01:02] Open AI. This is a couple of months old
[01:03] now, but anyway, you know, it's always
[01:05] nice to know that the people talking
[01:08] have done some research in the space.
[01:10] Um
[01:11] the agenda for today, class, is we're
[01:14] going to uh I'm going to walk you
[01:16] through why I have arrived at the
[01:18] conclusion that basically all software
[01:20] engineers are going to do all day is
[01:22] plan and review stuff. And I'm going to
[01:25] talk about how to think about balancing
[01:27] that if that is what you do all day. Uh
[01:30] I'm going to talk about time horizon and
[01:32] how agents are getting uh running for
[01:35] longer and how that changes the behavior
[01:38] of the job. And then at the end, we're
[01:40] going to shut my company down. And
[01:42] [snorts] we'll get on to that later on.
[01:45] So, let's get started. Everything is
[01:46] plan and review. So, work that we
[01:49] software engineers do. Who's Everybody
[01:51] in here is a software engineer, right?
[01:53] Yes. Okay, most people. Um we plan
[01:56] stuff, we write code, we review code,
[01:59] and we review other people's code.
[02:01] Roughly, the work that we do.
[02:04] The ratios until GitHub Copilot hit the
[02:07] scene were roughly this for me. I know
[02:09] it depends on whether you work in a big
[02:11] company or a small company and things
[02:13] like that, but a lot of it was writing
[02:15] code and not very much of it compared to
[02:17] that was planning and reviewing code.
[02:20] And what we see is over time with things
[02:23] like the first version of GitHub
[02:24] Copilot, that basically the writing code
[02:27] part starts to shrink. So, you know,
[02:30] ChatGPT arrived, suddenly, you know, you
[02:33] can like generate functions and paste
[02:35] them in, and then Cursor, not Cursor
[02:38] today, but like the original version of
[02:39] Cursor arrives, and then it's like able
[02:41] to complete a whole page of code. Um and
[02:44] then you get Claude Code, and it's like,
[02:46] "Wow, you know, I actually am not really
[02:48] doing much code writing anymore."
[02:50] Um so,
[02:52] it kind of poses an interesting question
[02:54] though, which is what, you know, say we
[02:56] were spending 4 hours a day coding
[02:58] before, does that mean I now get 4 hours
[03:01] back if I'm not doing any actual coding?
[03:04] The answer, of course, is no. It has
[03:05] displaced work. Work that you or time
[03:08] that was previously spent doing the
[03:10] coding has moved. It has moved to
[03:13] planning and reviewing. I think it is an
[03:16] accelerant. You're probably getting more
[03:17] done in the day, but it's probably like,
[03:20] you know, you get uh 20 minutes back for
[03:23] every half an hour that you were, you
[03:25] know, spending coding, and some other
[03:27] time has gone to planning and reviewing.
[03:30] So, I want to talk about that. Like,
[03:32] what is this new way of working? And I
[03:35] think there's there's fundamentally two
[03:36] approaches that people take. I'm not
[03:38] going to get too specific about, you
[03:40] know, I don't know, specs or uh
[03:42] Playwright MCPs or things like that. I
[03:44] think there's
[03:45] tons of fascinating talks about that at
[03:47] this event. I just want to kind of
[03:48] conceptually ground what we're talking
[03:50] about here today. So, the first way is
[03:53] the plan-based approach. Um this is
[03:56] where you spend a lot of time up front
[03:59] planning the work that you want a coding
[04:02] agent to do. So,
[04:04] the smells of whether you are doing this
[04:06] type of work would probably look like
[04:08] you're writing a very comprehensive plan
[04:10] doc, markdown file. You're maybe using
[04:12] like one of these spec frameworks.
[04:14] You're uh interrogating. So, you know,
[04:17] I've seen some cool stuff where the
[04:18] model asks you questions repeatedly
[04:21] until it's like completely exhausted all
[04:23] possible questions it could have about
[04:25] what the work is that needs to be done.
[04:28] The benefits of this, of course, are
[04:30] that you basically spend less time
[04:33] reviewing that work because you have
[04:36] invested time up front
[04:39] uh eliminating edge cases, giving the
[04:41] the the models as much information as
[04:43] possible about the work you're trying to
[04:44] do. The outcome of that will be that it
[04:47] the models less likely [__] up, and
[04:49] you're going to get like better, better
[04:51] outputs, and probably, you know, fewer
[04:53] rounds of review. The downside is you
[04:56] have to spend more time planning, but,
[04:57] you know, that's just obvious, isn't it?
[05:00] The other way of doing this, uh the the
[05:02] other big way of working with AI is you
[05:06] don't define a very detailed plan, but
[05:09] instead, uh you let it, you know, run,
[05:13] and then you you end up spending more
[05:15] time reviewing that work. So, you know,
[05:18] benefits of this, you can just YOLO
[05:20] something, be like, "Ah, let's add a
[05:22] contact form to the webpage." And then,
[05:25] you know, the the the payback you have
[05:27] to do is like you're going to go back
[05:28] and forth a few times correcting the
[05:30] styles, figuring things out. Um
[05:33] I would say if you think about the
[05:35] valuable thing being your human time,
[05:38] and you have a choice, you always want
[05:40] to be doing the first of these
[05:42] behaviors, the planning the planning
[05:44] approach, basically, because it will
[05:46] save you a lot of time. It is very
[05:49] time-consuming to have to switch back
[05:52] and forth with an agent that is like
[05:54] giving you some half-delivered work, and
[05:56] you're constantly having to review it.
[05:59] I think another way of breaking down the
[06:02] modes of work, where one is plan and one
[06:04] is review, is to think about the type of
[06:07] thing that you're working on. And I
[06:08] think feature development is actually
[06:09] very different from migrations and uh
[06:12] maintenance work. So, and front end is
[06:14] very different from back ends. I was I
[06:16] was trying to kind of think about this
[06:17] before the talk, and this is the matrix
[06:19] I've come up with, where basically, if
[06:22] you're working on uh the front end and
[06:24] you're doing feature development, it's
[06:25] basically impossible to kind of really
[06:27] spec everything out. There's so many
[06:29] edge cases and you know, front end is
[06:30] very stateful. Uh there's like
[06:32] interactions, animations, styles,
[06:35] there's functionality. And so,
[06:37] personally, like I find it much better
[06:39] to kind of be in the loop with a coding
[06:41] agent. So, the second uh one of those
[06:44] behaviors that we talked about. Uh but
[06:46] for everything else, I think it really
[06:48] is possible to be plan-heavy. So,
[06:51] back-end feature development, you can
[06:53] almost do test-driven development. And
[06:56] for anything like refactoring and
[06:57] migration-based, you certainly uh you
[06:59] certainly can be doing that, and you
[07:01] shouldn't be in the loop with any of
[07:02] that work at all, really. That should
[07:04] all be kind of test-driven
[07:07] development.
[07:09] So, the I guess if you had to distill
[07:13] that long, meandering spiel into a
[07:16] sentence, it would be spending 5 minutes
[07:19] of planning saves you 30 minutes of
[07:21] reviewing AI-generated code. And that's
[07:24] basically the takeaway.
[07:26] Uh the other thing that I think is kind
[07:28] of interesting to consider is is how
[07:31] things are running for longer. So, as
[07:35] coding agents
[07:36] become more capable, so as models get
[07:38] better, as tool calling improves, you go
[07:41] from calling a very small set of tools
[07:43] to now, you know, the the coding CLIs
[07:46] can call a a huge range of tools and do
[07:48] testing and things like that.
[07:50] The outcome of that is that every time
[07:53] you send off a prompt, you are waiting
[07:55] longer before it comes back to you and
[07:58] says, "Hey, Louie, it's time for you to
[07:59] do something."
[08:01] So, to illustrate this, I mean, you you
[08:03] know, like think back to GitHub Copilot.
[08:05] It completes a single line of code, and
[08:08] it takes seconds. Then you have like the
[08:10] original Cursor completing a single
[08:12] file, and that runs for, you know, 30
[08:14] seconds. And then you have uh Claude
[08:17] Code, which, you know, last year would
[08:19] run for maybe a minute or two, and this
[08:21] year I've I've been, you know, getting
[08:22] some pretty good results with 5- or
[08:23] 10-minute executions. And that is going
[08:26] to continue
[08:27] because basically, we've gone from uh
[08:30] you asking the AI to do something and it
[08:32] just responds to the AI running a type
[08:35] checker to the AI testing its change. I
[08:39] mean, this is like the frontier of
[08:40] things. And these things take increasing
[08:43] amounts of time. Just returning the code
[08:45] was really quick. Running the type
[08:47] checker is a bit slower than that.
[08:49] Running Playwright MCP is an order of
[08:51] magnitude slower than any of those
[08:53] things. Um but it's worth doing because,
[08:56] you know, what you're trying to maximize
[08:58] for, again, is how much time you are
[09:01] spend or minimize, rather, is how much
[09:02] time you are spending working with the
[09:04] agent. So, you know, if you can get
[09:07] higher accuracy by waiting longer, um
[09:10] that is a a worthwhile trade-off.
[09:14] And this is like where the frontier
[09:15] probably is is like, you know, if I had
[09:17] to forecast where we'd be at in 9
[09:20] months' time, I would say basically, AI
[09:23] starts to be able to QA front-end work,
[09:25] and that's going to be a huge
[09:26] breakthrough. You see some cool demos of
[09:28] this on Twitter with, you know, Chrome
[09:29] or Playwright MCP clicking around on
[09:31] stuff. The reality is I haven't met a
[09:32] single person who actually does this in
[09:34] their in their mainstream development.
[09:35] But I'm really excited for it, and I
[09:36] think it will be the next major
[09:38] breakthrough, where essentially, most of
[09:41] the back and forth that you do with a
[09:43] model is going to just be done by the
[09:45] model itself because it'll be able to
[09:47] actually run your project, click around,
[09:49] and find the bugs, and make sure it's
[09:50] done it. But this poses an interesting
[09:52] question, which is like, what happens
[09:54] when the average time that an agent is
[09:58] running for exceeds, say 5 minutes. Cuz
[10:01] I think 5 minutes is roughly the time
[10:03] when you can like sit there and wait for
[10:05] something, watch the logs, probably more
[10:07] realistically like browse Twitter,
[10:09] something like that.
[10:10] And when we cross that 5-minute mark,
[10:12] you have to change your behavior. You
[10:14] know, imagine these things are going to
[10:15] take 20 minutes to run. You're not going
[10:17] to sit there for 20 minutes watching
[10:19] agent logs. You're going to have to
[10:20] think about coding and all the job of
[10:22] being a software developer in a very
[10:24] very different way.
[10:26] Um this is something I'm sure
[10:28] everybody's seen, which is, you know,
[10:31] this kind of terminal maxing thing where
[10:33] you you basically parallelism, right?
[10:34] You run multiple of these things at
[10:36] once. Say each of them take 10 minutes
[10:38] to run. So, the way you get around the
[10:41] waiting problem is you have multiple of
[10:43] them on the go at any given time. So, as
[10:45] soon as you finished, say reviewing one
[10:47] piece of work, another has finished and
[10:50] you can move on to that. And that's
[10:52] basically what we started working on.
[10:54] So, this is uh this is the the the
[10:56] project we started about a year ago
[10:57] called Vibe Kanban. And uh essentially
[11:01] it started as as an attempt to make it
[11:03] possible to paralyze agents very easily.
[11:06] Um we built some cool stuff. There is uh
[11:10] a sidebar where you can create multiple
[11:12] workspaces that run any coding agent,
[11:15] like Codex, Cool Code, things like that.
[11:18] Uh
[11:18] when you want to review the code, you
[11:20] get the diffs. If you want to comment on
[11:23] something, you can do it just kind of
[11:24] like how GitHub does.
[11:26] If you want to preview something or, you
[11:28] know, click on something and kind of be
[11:29] like, "Ah, actually make this a bit
[11:30] bigger or that a bit smaller." You can
[11:32] do that, too.
[11:34] And you probably have seen all of this
[11:36] stuff before, but you may not have seen
[11:38] this stuff started as early as June
[11:41] 14th, 2025. We did it first, I swear.
[11:45] Okay, so the considerations. I think
[11:47] like what so so so human behavior is
[11:50] going to change because agents are going
[11:52] to cross this like 5-minute threshold.
[11:54] Um and who knows, that may continue. You
[11:56] may end up crossing an hour threshold.
[11:59] So, we need new interfaces to make this
[12:02] job
[12:03] awesome. Cuz if you try and do it using
[12:05] the existing tools, it kind of sucks.
[12:08] You have to jump around reviewing code
[12:09] in one thing, previewing things in
[12:11] another. Um if I had a wish list for
[12:14] what I would want the ultimate coding
[12:17] agent tool for software developers to
[12:20] look like, it basically embraced the
[12:21] fact that I have to be a manager of
[12:24] multiple streams of work at any given
[12:26] time, which is not something most
[12:28] software developers have had to do.
[12:30] They've just been able to like lock in
[12:32] in a in a deep way to one piece of work.
[12:35] So, it's all about kind of I I put focus
[12:38] maxing. I don't know if that's a word.
[12:40] I'm coining it. You heard it here first.
[12:42] Um but it should embrace the fact that
[12:44] you can't pull humans out of something
[12:46] and back into something else every 30
[12:49] seconds cuz it just fries their brain
[12:50] and it's not it's no way to live. Um so,
[12:53] you know, it it should be built around,
[12:56] you know, getting the most out of the
[12:57] human so that an agent can run for as
[12:59] long as possible and then yield back to
[13:02] the human rather than encouraging
[13:04] patterns where you're constantly jumping
[13:06] in and out and in and out of needing to
[13:09] get back into the context of what a
[13:11] particular agent is doing.
[13:13] It should help you write tasks and plan
[13:15] things, obviously. It should help you QA
[13:17] work because that's what a lot of the
[13:19] human's work is going to be. And it
[13:22] should help you do code review. I think
[13:23] obviously code review, you know, a lot
[13:25] of it's being done with AI, but very few
[13:27] companies with money on the line are
[13:28] actually going to
[13:29] ship stuff that's fully Vibe coded
[13:31] without actually checking the code. So,
[13:33] reading code is probably something most
[13:34] people in this room are going to still
[13:35] have to do.
[13:36] And then shepherding the change until
[13:38] it's deployed, which is kind of a new
[13:39] emerging one. So, you know, at its
[13:41] simplest form, it's like monitor GitHub
[13:44] pull requests and just look for comments
[13:46] and kind of be reactionary to those
[13:48] automatically. A lot of the admin
[13:50] involved in getting something from I
[13:52] finished the task to I've deployed the
[13:54] task is just literally like, you know,
[13:57] following comments and and reacting to
[13:59] them.
[14:01] So,
[14:02] this
[14:03] I wrote
[14:04] I wrote this talk I I I submitted this
[14:07] talk a few a few weeks ago.
[14:10] And on Tuesday, I decided to shut the
[14:13] company down. So, [snorts] I had a whole
[14:15] basically there's a whole part of this
[14:17] talk which was just me telling you more
[14:19] about Vibe Kanban and trying to sell it
[14:21] to you, but that's not going to happen
[14:22] anymore because now the company's
[14:24] shutting down. So, what I thought I'd do
[14:26] instead is we can actually shut the
[14:29] company down together. I haven't I
[14:31] haven't actually announced it yet.
[14:34] So,
[14:35] >> [applause]
[14:37] >> Okay, and we're going to do it using
[14:39] Vibe Kanban, of course. It has to be,
[14:41] you know. Okay, so uh please add a blog
[14:45] post to the website
[14:47] with this content.
[14:50] Uh
[14:51] >> [groaning and snorts]
[14:52] >> and I've pre-written the uh
[14:54] you know, the weepy the weepy note.
[14:57] Okay, so we've got Vibe Kanban website.
[15:01] All right, that's going to go and do it.
[15:02] I can give you a little tour of this
[15:03] thing as well. So, it's running a setup
[15:04] script. What it's created a Git work
[15:06] tree. It has run a setup script in the
[15:08] work tree to install the dependencies
[15:10] for our website.
[15:12] And once that's done, it proceeds to uh
[15:16] run whatever agent you've selected. I
[15:18] use uh Codex most of the time, but it
[15:21] supports eight of the most popular ones.
[15:24] Um and it's going to go ahead and try
[15:26] and figure out how to do that.
[15:28] Um
[15:29] what else is cool? Are you sad?
[15:32] Am I sad? I think I've just done so much
[15:35] thinking about it. I'm kind of relieved.
[15:38] Like you run a you run a company for for
[15:40] a few years and you have this like
[15:42] enormous responsibility to kind of, you
[15:45] know, you have staff and investors and
[15:48] all this stuff and and I don't know, I
[15:50] feel like a kind of weight has been
[15:51] lifted almost. Um
[15:54] we can talk through like why we're
[15:56] shutting it down as well. We have we
[15:57] have lots of you We have 30,000 monthly
[15:58] active users and and 25,000 stars on
[16:01] GitHub. And actually the project will
[16:02] continue non-commercially. Um and we're
[16:05] already pushing changes even though
[16:07] we're we're shutting things down, but
[16:09] it's actually very difficult uh to make
[16:11] money in the current environment. Uh
[16:13] the everybody who is making money is
[16:14] doing two things.
[16:16] They're selling to enterprise and
[16:17] they're reselling tokens. And we were
[16:20] doing neither of those things. We're not
[16:21] a coding agent. We have a button that
[16:23] helps you run something in Codex or or
[16:25] Cool Code. And so, people can we we have
[16:28] a subscription. People would spend like
[16:29] $30 with us and then press a button that
[16:31] helps them spend $3,000 with Codex. It's
[16:34] just like not sustainable. Um and all of
[16:37] our users are like individuals,
[16:39] startups, uh smaller companies. And we
[16:42] could have done the work, I think, to
[16:44] address that and kind of move up into
[16:46] the enterprise, but
[16:48] you know, I don't know. It's uh it's a
[16:49] kind of it's it's a mature market at
[16:52] this point and
[16:54] it's no fun playing for eighth place.
[16:56] So, we decided to shut things down.
[17:00] Uh okay.
[17:02] Blog post is ready.
[17:04] Let's see if it works. So, we've got the
[17:06] live preview feature, obviously.
[17:08] Let's wait for it to
[17:10] compile.
[17:14] Okay.
[17:15] That looks good. So, we can go ahead,
[17:18] open a pull request.
[17:21] Uh
[17:22] uncommitted changes. Oh.
[17:24] Uh
[17:27] Don't know what that's about.
[17:33] Uh
[17:36] Are we finding this out before your
[17:37] investors?
[17:39] Oh, [__]
[17:45] >> [snorts]
[17:45] >> Uh you're not. Don't worry.
[17:48] Uh they most of Well, actually some of
[17:50] them I need to I need to call them after
[17:52] this. That's a really good point.
[17:55] I'm fully committed to shutting this
[17:57] down live on stage.
[18:00] Okay.
[18:01] All right, it's done. That's going to go
[18:03] through Cloudflare's CDN.
[18:06] >> [applause]
[18:11] >> Thank you.
[18:12] Um
[18:13] I think we've got time for one or two
[18:15] questions. I don't know if anybody in
[18:16] the audience has a a one 1 minute 45.
[18:18] Just
[18:19] >> Steve?
[18:20] What's next? Uh
[18:21] take some time off, start another
[18:23] company. My co-founders going to join
[18:25] the lab. And most of the team have
[18:27] already found good jobs at Agent Labs,
[18:30] things like that.
[18:31] Yeah.
[18:32] Any other questions? [snorts]
[18:33] Overall feeling
[18:35] when you look back is positive or
[18:36] negative Oh, yeah. No, I wouldn't I
[18:38] wouldn't do anything differently. I
[18:40] think like uh
[18:42] it
[18:43] it it it was like the most interesting
[18:45] thing I've worked on and uh is right at
[18:48] the cutting edge of like agents and all
[18:50] of this stuff. I think certainly
[18:53] I don't know. It's increased my value as
[18:56] a human by doing this, so I would do it
[18:57] all again. Yeah.
[19:00] Go for it. What are the most valuable
[19:02] things you've learned from
[19:03] a few years of running a company?
[19:05] Uh
[19:06] most valuable things
[19:08] I mean, just work with great people. You
[19:10] know, we went through several rounds of
[19:13] the team uh and the team we ended up
[19:15] with was like phenomenally better. No no
[19:18] offense to previous team, but that's
[19:21] probably how to, you know, I think and
[19:23] and hard work as well. I think like it
[19:25] took us a while to learn like what hard
[19:28] work really was. Um and you get to a
[19:31] point that's like you're sitting there
[19:32] at midnight with the, you know, the team
[19:34] in the office on a Saturday and
[19:37] everybody's kind of motivated and that's
[19:40] yeah, it takes you a while to kind of
[19:41] figure out how to get to that point. And
[19:43] once you feel it, you know, kind of what
[19:45] that's like. It's difficult until you
[19:47] get there, I think.
[19:48] Yeah.
[19:50] Uh 12 seconds.
[19:52] No? Okay.
[19:53] >> Looking back to the past, what would you
[19:56] change? What would I change? And I'd I'd
[19:59] hire somebody who's really good at
[20:00] selling to Enterprise.
[20:02] All right, thank you very much.
[20:04] >> [applause]
[20:04] >> Cheers.
[20:16] >> [music]
