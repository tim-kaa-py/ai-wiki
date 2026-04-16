---
title: "GSD vs Superpowers vs Claude Code: A New AI King?"
source_type: "youtube"
channel: "Chase AI"
date: "2026-04-13"
url: "https://www.youtube.com/watch?v=celLbDMGy8w"
pillar: "ecosystem"
tags: [claude-code, comparison, agents, workflow, gsd, superpowers, orchestration]
ingested: "2026-04-15"
extraction_method: "auto-captions"
video_id: "celLbDMGy8w"
duration: "31:25"
---

[00:00] Should you be using GSD or should you be
[00:02] using superpowers or are both a waste of
[00:05] time? To answer that question, I did a
[00:07] head-to-head test with superpowers, GSD,
[00:11] and vanilla clawed code. I have them
[00:13] create the exact same web app, and we
[00:15] grade them on their final output, the
[00:17] amount of tokens used, and how long it
[00:19] takes them to build it. And the winner
[00:21] is not the one you would expect. Now,
[00:23] before we run the head-to-head tests
[00:25] between GSD, superpowers, and baseline
[00:27] clawed code, let's first talk very
[00:29] quickly about what GSD and superpowers
[00:32] actually are, how they work, and how
[00:34] they differ between one another. So, GSD
[00:36] and superpowers are cut from the same
[00:39] cloth. These are both orchestration
[00:41] layers that sit on top of cloud code and
[00:43] change the way how cloud code approaches
[00:46] complex projects. It introduces a much
[00:49] more robust planning system, a much more
[00:51] robust testing system, and they both
[00:53] utilize sub aent-driven development to
[00:56] deal with context rot. And the
[00:57] similarities become even more obvious
[00:59] when we take a look at their actual
[01:01] step-by-step process. Superpowers in its
[01:03] first three steps. What is it doing?
[01:05] It's planning stuff. It brainstorms. It
[01:08] uses git work trees. And then it writes
[01:10] plans. What does GSD do? GSD starts a
[01:13] new project, discusses the plan, and
[01:15] then breaks the plan down into phases.
[01:17] They're taking your big idea and they're
[01:19] chunking it up into smaller specific
[01:22] atomic tasks that they are going to have
[01:24] sub agents deliver on down the line.
[01:27] Once the plan has been figured out, what
[01:28] does superpowers do? It does sub
[01:30] aent-driven development. Again, I keep
[01:32] referencing this. Instead of having
[01:34] clawed code execute everything in the
[01:36] same session like the normal plan mode
[01:38] into execution does filling up your
[01:40] context window all the time. Instead
[01:42] these sub agents each get assigned a
[01:44] specific task. That way they have
[01:46] essentially a clean context window which
[01:48] means they should give us better
[01:50] outputs. And so that's what happens in
[01:52] step four and five. Although it also
[01:54] includes test-driven development or
[01:56] superpowers. On the GSD side of things
[01:58] it's just one step execute phase. It's
[02:01] pretty much doing step four and five
[02:03] from superpowers in its step four. Then
[02:05] we finish up. Superpowers requests a
[02:08] code review and then merges everything.
[02:10] What does GSD do? It verifies the work
[02:13] and then it ships it, commits, creates
[02:15] the PRs, done. So very very similar. And
[02:18] when we talk about the differences, it's
[02:20] pretty subtle. When it comes to
[02:22] superpowers, it's very heavy on
[02:24] testdriven development and this idea of
[02:26] red green refactors. If we take a look
[02:29] at the actual test-driven development
[02:31] skill inside of superpowers, what does
[02:33] it talk about? It talks about the iron
[02:34] law. No production code without a
[02:36] failing test first. So, anytime it's
[02:38] trying to create code for a feature, it
[02:40] creates a test for that feature. It
[02:42] fails the test first and then it tries
[02:44] to write the minimal amount of code
[02:46] needed to pass that test. From there, it
[02:48] goes into red green refactor. And if you
[02:50] want to see the specifics of it, you can
[02:52] take a look at the skills inside of the
[02:53] GitHub. I'll link all this down below.
[02:55] On the other hand, GSD really emphasizes
[02:57] state and context. So, it's constantly
[03:00] creating markdown files that reference
[03:02] what you're planning to do, what you've
[03:04] already done, and what's going to get
[03:05] completed in the future and things like
[03:07] the requirements markdown file, the
[03:09] roadmap markdown file, the different
[03:10] phases. It's very explicit and it writes
[03:12] down everything. And the idea with that
[03:14] is with so much sub agent execution and
[03:17] so much constant content resetting, we
[03:19] always want some sort of northstar
[03:21] telling us where we are and where we're
[03:22] going. That's GSD's idea. But really,
[03:24] those differences are subtle. So, a lot
[03:26] of it also comes down to feel, which is
[03:28] what we're going to see today. The other
[03:30] things we're going to be looking at is
[03:31] the amount of time it takes for each of
[03:33] these to execute the task I'm going to
[03:34] give it, as well as the amount of
[03:36] tokens, cuz cost is something we always
[03:38] need to be cognizant of. But with that
[03:40] being said, installing these is very
[03:41] simple. Superpowers is in the official
[03:43] plug-in library on Cloud Code. So, if
[03:45] you're inside of Cloud Code and you do
[03:47] /plugin, you will be able to see
[03:49] Superpowers right there. Install it that
[03:51] way. And with GST, you just need to run
[03:52] this one command, and it will install
[03:54] everything. So, what is our test going
[03:56] to look like for these three guys today?
[03:57] Well, we are going to have all three of
[03:59] them build us a website for our AI
[04:01] agency, Chase AI. And this website needs
[04:04] three things. One, it needs a landing
[04:06] page. This is the simplest ask. I just
[04:08] want a standard landing page, hero
[04:11] section, an about me, services, and then
[04:13] a lead capture form. So, this is where
[04:15] we're testing them on a very simple ask.
[04:17] And also, I want to see how they do with
[04:19] web design and skill calling. Are they
[04:22] going to use the front-end design
[04:23] skills? Because I'm not going to
[04:24] explicitly tell them. For two and three,
[04:25] it's all about creating our blog
[04:27] generator. So, for step two, I want
[04:29] there to be a page that allows people to
[04:31] see my blog where they can, you know,
[04:33] see the different posts, click on them,
[04:34] read them, real basic stuff. And then
[04:36] number three is the actual blog
[04:38] generator itself. This is a hidden admin
[04:40] page. I don't want it on the navbar. And
[04:42] I want to be able to give my web page
[04:44] either a YouTube video URL or an article
[04:47] URL. I then want it to scrape everything
[04:50] from that URL. I want it to use the
[04:52] anthropic SDK to then create a clean
[04:54] blog post based on that information from
[04:57] the YouTube video or the article in my
[05:00] voice. I also wanted to grab the
[05:02] thumbnail or hero image from the source
[05:04] and then save it all as a new blog. For
[05:06] time sake, I'm not doing any
[05:08] authentication here. I'm confident all
[05:09] three of these would be able to execute
[05:11] that just fine with the Superbase CLI. I
[05:14] then give them both a basic text stack
[05:15] as well as some sort of aesthetic
[05:18] guidance. But the point here is to give
[05:20] them enough of a direction so we can all
[05:23] grade them on the same thing yet leave
[05:25] enough wiggle room so they aren't just
[05:27] following directions. I want to see how
[05:28] they think through this prompt. And
[05:30] that's because we left certain things
[05:32] open to interpretation like how to
[05:34] actually fetch the transcripts, how to
[05:37] actually get the thumbnails from YouTube
[05:38] URLs I give it, what the actual blog
[05:41] generation system prompt should look
[05:42] like, what should that voice be, and
[05:44] again whether to invoke any specific
[05:46] cloud code skills. So these are all
[05:49] different things that we should see
[05:50] variance in between GSD superpowers and
[05:54] out of the box cloud code.
[06:00] So, I just released my Claude Code
[06:02] master class last month, and it is the
[06:04] number one way to go from zero to AI
[06:06] dev, especially if you do not come from
[06:08] a technical background. I teach you
[06:10] everything you need to know about this
[06:11] tool, and we focus on real use cases.
[06:14] And just as importantly, I update this
[06:16] thing literally every week, and since
[06:18] its inception, we've already added
[06:20] almost 3 hours of additional content.
[06:23] You can find a link to it in the pin
[06:24] comment inside of Chase AI Plus, and
[06:26] we'd love to have you there. So, let's
[06:27] get this test started. I have GSD,
[06:29] superpowers, and Claude Code here. I
[06:32] will be very specific about which tab
[06:34] I'm in so you don't get confused, but I
[06:36] also have the status line down here,
[06:38] which will explicitly state which
[06:40] directory I'm in because they're all in
[06:41] different directories. So, for
[06:42] superpowers, we can see that it loaded
[06:45] the superpowers brainstorming skill. And
[06:47] with superpowers, it's pretty fluid. It
[06:51] has like 14 15 plus skills loaded when
[06:54] you actually install the superpowers
[06:56] plugin. And the idea is Claude Code
[06:59] knows just based on how you're talking
[07:01] to it and where you are in the process
[07:03] which skill it needs to invoke. This is
[07:06] a little different than GSD where you
[07:07] are going to use explicit slash commands
[07:10] like GSD new project when you are using
[07:13] GSD in your directory. So GSD was
[07:15] actually the first one to come back with
[07:17] some sort of questioning after the first
[07:18] couple minutes. So GST was the first to
[07:20] come back with some questioning. Uh it
[07:22] said our brief was pretty complete
[07:24] because we did give it a fairly robust
[07:26] prompt. But what I do like is it says,
[07:28] "Hey, here's some taste calls I'm
[07:30] making." And right away it's calling out
[07:31] a few of the things that we mentioned
[07:33] that could be differentiators, things
[07:35] that we didn't include in the prompt. So
[07:37] we never specified what services we
[07:39] wanted on the landing page. It gives us
[07:40] four options. And then it calls out what
[07:42] it's going to do for YouTube when it
[07:44] comes to the transcript as well as the
[07:45] hero image. So, I'm going to go ahead
[07:46] and let it create the project.md file.
[07:49] Now, let's take a look at Superpowers.
[07:51] So, right off the bat, Superpowers says
[07:53] it's going to skip the visual companion
[07:55] offer. I'm going to say I want the
[07:57] visual companion offer because it
[07:58] actually is one of the big
[07:59] differentiators between Superpowers and
[08:01] GSD. So, I would like to see it in
[08:03] action. And right away, it brings up
[08:04] some design decisions, specifically
[08:07] things for fetching the URL, which
[08:09] again, just like with GSD, was one of
[08:11] those things we kind of left it for
[08:12] interpretation. It gives us three
[08:14] options with pros and cons as well as a
[08:16] recommendation. And then it breaks down
[08:18] the actual thumbnail strategy. So it's a
[08:20] bit more in-depth when it came back with
[08:22] these sort of suggestions than GSD was.
[08:24] And that same story plays out here with
[08:26] services design system as well as error
[08:29] handling and edge cases. So overall,
[08:31] it's been a bit more in-depth with
[08:33] everything has come back with. So I
[08:34] wrote this looks good, but I would still
[08:36] like to go through the visual companion
[08:38] to make sure we are locked in on the
[08:40] front end aesthetic. and it came back
[08:42] with the visual companion, which is one
[08:44] of its coolest features. So, it's spun
[08:47] up a dev server and now it's asking me
[08:49] what we should do for the aesthetic and
[08:50] has actual options, four of them, right
[08:52] in front of you, which I really like
[08:54] because it's one thing when it tells you
[08:56] what it's going to do visually and spins
[08:58] up one dev server for one options. It's
[09:00] much different when you can see
[09:01] everything all at once. This is one of
[09:03] my favorite part of superpowers. Now,
[09:04] with that being said, these are all very
[09:08] sy. None of these totally jump out at
[09:10] me. Of all these, I would say probably
[09:13] the warm editorial is the best. Electric
[09:16] lime is gross. Monochrome is boring, and
[09:18] linear polish just looks like AI slop.
[09:20] Um,
[09:22] so we'll go with this one for now. At
[09:24] least it's something visual. I I love
[09:26] the visual companion. So, after I told
[09:27] superpowers I liked option C, now it's
[09:30] giving me some more options to look at.
[09:32] So, it took that aesthetic, those sort
[09:34] of colors, and now we're going into the
[09:35] hero section. So it continues to drill
[09:37] down on the web page. So this is the
[09:40] first
[09:42] hero.
[09:44] The second one's a bit more centered.
[09:48] Then we have the third one with some
[09:49] stuff over here split with the featured
[09:52] look.
[09:56] I think
[09:58] you know in reality
[10:00] I would probably do something like this
[10:03] and cut out what's here cuz this is kind
[10:05] of lame. But I like this as a template,
[10:06] right? This is what we can start with.
[10:08] So, we'll go with C. Now, Superpowers
[10:11] Visual Companion takes you through every
[10:13] section of your landing page. So, we'll
[10:16] skip the rest of them cuz I think you
[10:17] get the point. So, Superpowers has now
[10:19] written the spec for our website and
[10:21] it's asking us to review it. Once we
[10:23] take a look at it and we give it the
[10:24] thumbs up, then it's actually going to
[10:26] use the writing plan skill to produce
[10:29] the implementation plan. So, this is
[10:31] kind of the rough draft blueprint of
[10:32] what it's going to do. And here's a look
[10:34] at that design spec. It is very
[10:37] comprehensive, but the part you should
[10:39] be taking a look at is at the bottom,
[10:41] and that is the key judgment calls. What
[10:43] are decisions that Superpowers has made
[10:45] for you up until this point, cuz this is
[10:46] where you need to provide some push back
[10:47] if you haven't. So, it's going to do SLS
[10:49] studios, the hidden URL where we sort of
[10:51] do all the actual blog content
[10:53] generation. Uses writing as the nav
[10:55] label. Talks about the generated voice.
[10:59] So, uh, used to be a marine pilot, now
[11:00] he's an AI consultant. All right, easy
[11:03] enough. And it did that off of its
[11:04] actual user level cloud memory. And it
[11:07] kind of talks about security. Like I
[11:09] said, we aren't doing authentication
[11:10] here purely for the demo. And it's even
[11:12] like, oh, that's kind of weird. I guess
[11:13] we're just doing security by obscurity.
[11:15] So, it calls it out. So, I'm just going
[11:17] to tell Superpowers that it looks good.
[11:19] And now it's actually going to write out
[11:21] the plan. And you can see that skill
[11:22] being loaded. So, while we were doing
[11:24] all of that with superpowers, GSC has
[11:26] been executing its own research before
[11:28] it built out its plan. So it spawned
[11:30] four researchers in parallel. One for
[11:33] stack research, one for features
[11:34] research, and then two more for
[11:35] architecture and pitfalls research. You
[11:38] can see that right here. Each of these
[11:40] uses a hefty amount of tokens, right?
[11:42] 75K, 33K, 51, and 61. But the idea is if
[11:47] you're doing something rather novel or
[11:49] that isn't very common, these sorts of
[11:53] researchers are going to work wonders in
[11:55] the long run. So what we did today is or
[11:58] what we are doing today is fairly
[11:59] straightforward web design blog
[12:01] generator. It seen these things before.
[12:03] I still had it execute these researcher
[12:05] agents just to keep this test you know
[12:09] equal so to speak. So it then
[12:11] synthesized all that research. You can
[12:13] see here it uses sonnet 4.6 for this. So
[12:16] even though for the most part I told GSD
[12:18] to go wild with opus 4.6 six when it
[12:21] feels like it's just synthesizing
[12:22] information and it's not sending someone
[12:24] out to do something you know novel or
[12:26] unique for that project it will use
[12:28] smaller cheaper models to do the
[12:30] synthesis and this four agent research
[12:32] phase is robust compared to superpowers
[12:34] superpowers doesn't really do this but
[12:36] like I said 30 tool uses 91k tokens 15
[12:39] minutes it takes time once it does the
[12:41] research it then defines the
[12:43] requirements similar to the MD file we
[12:46] just looked at with superpowers GC does
[12:49] the same thing but even more. It does
[12:51] multiple documents. So it creates a
[12:53] requirements document. It creates a
[12:55] roadmap document. Really it takes kind
[12:57] of what superpowers did but just divvies
[12:59] it up into multiple docs. Those docs
[13:01] being road map state requirements and
[13:05] eventually things like phases. And at 35
[13:07] minutes in you can tell this takes some
[13:09] time. If we actually pause and take a
[13:11] look at, you know, the standard cloud
[13:14] code, its plan's been up and ready. We
[13:16] haven't had it execute anything yet for
[13:18] some time. This took total for it I
[13:20] think about five or six minutes and that
[13:22] was on the slow side I felt like versus
[13:25] GSD which is still going 36 minutes
[13:28] later and hopping back to superpowers.
[13:31] Superpowers just finished up its website
[13:34] planmarkdown. While we wait for GSD to
[13:36] finish up its its road map and its
[13:38] series of stuff, let's let's take a look
[13:40] at superpowers once more. So it just
[13:42] created the website plan.mmd which
[13:44] includes 28 tasks and 2500 lines.
[13:47] Jumping back into VS Code, if we go down
[13:50] into the docs of this folder and take a
[13:52] look at the specs or sorry, take a look
[13:54] at the implementation plan instead. This
[13:56] is what it's talking about. Like I said,
[13:59] about 10 times longer than the specs.
[14:04] So, there's a lot there's a lot going on
[14:08] here. Now, Superpowers offers us two
[14:10] execution options. one is sub aent
[14:14] driven which is very similar to GSD
[14:16] where each task gets its own sub agent
[14:18] and therefore its own context window but
[14:20] like it says here that's a trade-off
[14:22] because that's a lot for 28 as it says
[14:25] mostly straightforward task like is this
[14:27] a nuclear bomb option do we really need
[14:29] it the second option is inline execution
[14:32] so we're essentially just going to be
[14:33] doing this in the same session pausing
[14:36] for review as needed and it's going to
[14:38] be much much faster this inline
[14:39] execution is much more akin in to what
[14:43] we're doing here inside the standard
[14:45] cloud code where we're just like yes
[14:46] bypass permissions go forth and conquer
[14:48] now because superpowers is recommending
[14:50] inline execution we are going to go with
[14:51] inline execution and we can see
[14:53] superpowers executing plan skill loaded
[14:56] successfully so now it's going to start
[14:57] getting to work and right on Q GSD has
[15:01] now finished its grand plan for our
[15:04] project so it's created a project MD
[15:07] requirements MD roadmap MD state MD
[15:09] cloud MD and it also has created a
[15:12] folder for all the research it's found.
[15:14] GSD is proposing eight phases with 65
[15:18] requirements. And like we've talked
[15:19] about before, when it comes to executing
[15:21] this, GSD is very kind of rigid. Slash
[15:24] clear, next slash command, clear, next
[15:27] slash command, right? So it's very dun
[15:29] dun done, next thing, next thing, next
[15:31] thing. And it's like very phased versus,
[15:34] you know, I will say that superpower is
[15:36] a bit more fluid, right? You kind of
[15:37] just talk through it. It knows how to
[15:39] load the commands as needed or you
[15:41] expect it to load the skills as needed.
[15:43] GSC is a bit more clearcut. Now before
[15:46] we go ahead and begin executing with
[15:48] GSD, remember this is all in the
[15:50] planning phase right now. This is the
[15:52] total token count for its sub agents
[15:54] just for planning and research. We are
[15:56] at 459,862.
[16:00] What does that mean in terms of usage?
[16:02] Who knows? Totally depends when in the
[16:04] day you're using it, what sort of plan
[16:05] you're on, all that. But 460K give or
[16:08] take for planning. Plus, we're at 16%
[16:11] right now. call it 150. Let's give it a
[16:13] r nice round number. We're going to call
[16:15] it 600,000 tokens for GSD in the
[16:19] planning phase. And for total time
[16:20] spent, we'll call it roughly 40 minutes,
[16:24] give or take. Now, to compare that to
[16:26] the baseline, the standard cloud code
[16:28] planning phase, that took about 10
[16:30] minutes and it was about 50,000 tokens.
[16:33] Now, as for superpowers token use in the
[16:35] planning phase, it was about 200,000
[16:38] tokens. So superpowers 200,000
[16:41] GSD 600,000
[16:44] claude code 50,000
[16:47] cla code 10 minutes superpowers 40
[16:50] minutes GSD about 40 minutes so that is
[16:53] one of the big differences a between the
[16:55] two orchestration layers and standard
[16:57] cloud code is the amount of time but in
[16:59] terms of token usage between GSD and
[17:01] superpowers big difference there because
[17:03] GSD is very heavy on the research it
[17:06] like you saw four parallel sub agents
[17:09] doing a bunch of planning. Now, was that
[17:11] necessary for this project? Perhaps not.
[17:15] But for a big project, understand it
[17:17] will be necessary and that token
[17:18] difference will be there. But that is
[17:20] just one checkpoint. The planning and
[17:22] research phase. Now, it's time for
[17:23] execution. Claude Code has already
[17:26] started. Superpowers has already
[17:28] started. And I'm going to kick off GSD
[17:30] as well. Now, when it comes to the
[17:31] execution phase, specifically with GSD,
[17:34] it's more hands-on than the others. It's
[17:36] not like, okay, we did planning and
[17:37] research, it wrote its thing. I can just
[17:39] tell it go and I can just like leave for
[17:41] 30 minutes and come back to a finished
[17:43] project. Each phase is probably going to
[17:45] require some level of input from you, if
[17:48] nothing else, to kick it off because
[17:50] what it wants to do is it wants to ask
[17:51] you to first discuss each phase to make
[17:54] sure you're on the exact same page with
[17:57] cloud code as to what's in your mind,
[17:59] right? What do you want that feature to
[18:01] actually do? What do you want that thing
[18:02] to actually look like? It gets very,
[18:04] very detailed. on one hand kind of
[18:06] annoying, let's be honest. On the other
[18:07] hand, if this is something very complex,
[18:09] it's probably important that you get
[18:10] that right. So, these are things you
[18:14] have to weigh and measure. And what
[18:15] we're going to weigh and measure is at
[18:17] the end of the day, did all this back
[18:18] and forth actually give us a better
[18:20] product? So, for the sake of your time,
[18:23] I'm not going to show you every single
[18:25] phase in GSD. Again, check the video I
[18:28] linked earlier where I do that with GSD
[18:31] if you really want to see it play out.
[18:32] Just understand that's one of the big
[18:34] difference between GSD and superpowers
[18:38] and obviously cloud code as well. So
[18:40] speaking of superpowers, at this point
[18:42] implementation is complete. We are at a
[18:45] total spend of 250k tokens and 15
[18:48] minutes have passed since the planning
[18:49] phase. So it's asking me what we want to
[18:51] do and it recommends let's just keep the
[18:53] branch as is. So I'm just going to say
[18:54] hey we'll go with your wreck.
[18:56] Superpowers then comes back with a
[18:57] summary of what it's built, what is
[18:59] verified working, things it couldn't
[19:01] verify that needs some sort of manual
[19:03] verification or changes, and then
[19:06] judgment calls it made. And at this
[19:07] point, I'm also going to update my API
[19:10] key so it actually works. Okay, so they
[19:12] all finally finished their execution. So
[19:14] what we're looking at now is their
[19:16] oneshot product. Right here we have GSD
[19:21] superpowers and the baseline cloud code.
[19:24] Now, for reference for how long this all
[19:26] took up front, GSD by far took the
[19:29] longest to get to this point. All this
[19:30] was offscreen of me going through each
[19:33] phase, having it plan, having it
[19:35] execute. That took, frankly, over an
[19:37] hour. And total token spend for the
[19:40] execution phase for GSD was 600,000. So,
[19:43] we were looking at total from the
[19:45] beginning of planning phase to having
[19:46] our oneshot being 1.2 million tokens in
[19:50] an hour and 45 minutes to get to this
[19:52] point. For superpowers, it only took
[19:54] about an additional 50,000 tokens for
[19:56] execution in about 15 minutes. So total
[20:00] time, total tokens for superpowers to go
[20:02] from first prompt to actual product was
[20:06] 1 hour total time, 250k tokens. And for
[20:10] Claude Code, we were looking at 200,000
[20:13] total tokens in about 15 minutes. So
[20:17] kind of wild the difference there. GSD
[20:19] being by far the longest and the
[20:22] heaviest and as expected standard out of
[20:25] the box out of the box cloud code being
[20:27] the fastest. So let's see if all that
[20:29] time in token spent was worth it. We're
[20:31] looking at GSD right here and
[20:34] just sort of a plain background, right?
[20:37] Everything is black pretty much. Uh very
[20:43] basic. We have sort of the orange
[20:45] coloring. Like this doesn't look
[20:46] terrible, but like this isn't, you know,
[20:49] you're not blown away. It's like, okay,
[20:50] this was first passed by AI. Like
[20:52] everything looks pretty standard. When I
[20:54] click on the blog, the blog is here with
[20:56] some example stuff. And you know, this
[21:00] looks fine as well. Now, let's look at
[21:02] the blog generation piece of it. That
[21:04] little behind-the-scenes studio page.
[21:06] But when I follow the link, it gives me,
[21:08] we get a 404. So the blog studio
[21:13] generator doesn't even work on the first
[21:14] pass. So I told GSD what the issue is.
[21:16] So it's working on it right now. While
[21:18] it does that, let's take a look at what
[21:20] Superpowers gave us. So here's what
[21:21] Superpowers came back with. And the
[21:22] front end design looks just like what we
[21:25] saw in the visual companion. And again,
[21:27] nothing special. The Clawed Code as a
[21:31] rule kind of sucks at front end design
[21:32] if you don't give it really really good
[21:34] instructions or just load it with a ton
[21:36] of skills. And so because we kind of
[21:39] left taste and front-end design and
[21:41] design work in general up to
[21:43] interpretation, we got something that
[21:44] looks like it was made by AI. So this is
[21:47] okay. It's fine as a base. Here's a look
[21:49] at the blog.
[21:51] It's got pictures
[21:54] and you know whole blog setup is there.
[21:56] If I go to the studio section, this does
[21:59] work on the first pass. I can see the
[22:01] generator and if I put in a link to one
[22:03] of my recent videos and it creates a
[22:05] draft for us, grabs the correct
[22:07] thumbnail and then what it talks about
[22:08] is actually correct because in that
[22:10] video I talk about things like codeex
[22:12] inside of cloud code, obsidian and auto
[22:14] research.
[22:16] So it did exactly what it said it was
[22:19] going to do, which is great. Now here's
[22:21] a look at just cloud code out of the
[22:23] box. So pretty standard stuff. nothing
[22:28] crazy, you know, like if we're honest,
[22:30] is there a huge difference in terms of
[22:32] the front-end design if we don't give it
[22:34] great instructions between this and this
[22:37] and this? No, there there really isn't
[22:42] to be totally honest. I you could tell
[22:44] me any one of these three created any
[22:47] one of these three and I would not be
[22:48] able to tell the difference. So, let's
[22:49] take a look at the blog.
[22:52] has some fake articles for us
[22:55] and you know looks fine very bland
[23:00] nothing really going on there but it
[23:02] works now let's see if the studio the
[23:06] blog generator piece works for this and
[23:08] just like with GSD
[23:10] this doesn't work gives me the link 404
[23:13] page can't be found so just like with
[23:15] GSD I told basecloud code to go ahead
[23:17] and fix this and while it's attempting
[23:19] to fix the blog generator let's go back
[23:22] and see what GSD did on its second
[23:24] attempt. Looks like GSD was able to
[23:26] figure it out. Let's paste the URL in
[23:28] here and see if it generates a draft.
[23:30] All right, so it comes back with this
[23:32] draft and markdown. I do like that the
[23:35] fact that I can kind of edit things in
[23:37] line very quickly. And as for the actual
[23:39] content, it matches what it should. So,
[23:42] it did a good job there.
[23:44] And then I can see the actual preview,
[23:47] which is great. So to be honest, I like
[23:49] GSD's implementation of this with the
[23:52] upfront sort of inline editor more so
[23:54] than I liked superpowers. And we can see
[23:56] it now inside of our blog. And now
[23:58] lastly, we are back with the out of the
[24:01] box baseline clawed code. It fixed its
[24:04] errors and now we have a look at the
[24:05] blog generator. And similar to
[24:07] superpowers, once I gave it, it just
[24:10] created it automatically. It doesn't
[24:12] give me any chance to edit or see it as
[24:13] a draft like GSD did. Here's a low res
[24:17] thumbnail and it grabbed all the correct
[24:20] information. And here it is inside of
[24:22] the actual blog page. So, what can we
[24:24] take away from all this? Which one of
[24:25] these three actually won in this
[24:27] head-to-head competition? Well, let's do
[24:28] a quick recap. In terms of total time
[24:32] spent on the task, Claude Code just out
[24:35] of the box was about 20 minutes.
[24:37] Superpowers took about an hour and GSD
[24:40] came in at 105 minutes, an hour 45. In
[24:44] terms of tokens, Claude Code was about
[24:46] 200K,
[24:48] superpowers 250K,
[24:51] and then GSD was 1.2 million tokens. So,
[24:56] those are the objective stats. In terms
[24:59] of the subjective, like how did we think
[25:01] they actually did on what they created?
[25:05] Do we have any super strong opinions one
[25:08] way or the other? The answer the answer
[25:09] probably is no. The answer probably is
[25:12] if I actually had mixed all these up and
[25:14] then now had some grand reveal that oh
[25:16] no this this was actually superpowers
[25:19] that did this one and this was you know
[25:21] out of the box claw code you you
[25:22] wouldn't care. You wouldn't even have
[25:23] known the difference. The only real
[25:25] difference out of all these was that
[25:26] superpower was actually able to do what
[25:27] it was supposed to do on the first
[25:29] attempt for whatever you know credit you
[25:33] want to give it for doing a one shot. I
[25:35] mean truth be told if it one shots it
[25:36] great. If you get it on the second
[25:37] attempt that's fine with me too.
[25:40] The thing you're probably thinking right
[25:42] now to is well test is flawed. This
[25:44] wasn't a complicated enough test to
[25:46] where superpowers and certainly GSD
[25:49] could sort of pull away from the pack.
[25:51] The problem with that line of reasoning
[25:53] is okay then what is the line in the
[25:55] sand for now this theoretical task is
[25:58] complicated enough to use something like
[25:59] GSD or use something like superpowers to
[26:02] justify really the time even more so
[26:04] than the tokens for a lot of people. Is
[26:07] that clear? Is that obvious? I would
[26:09] argue no, not really. It really isn't.
[26:12] However, I will we can't even we can
[26:15] admit theoretically, yeah, there
[26:16] probably some ultra complicated task
[26:18] that this makes sense. The problem is
[26:20] defining that and knowing ahead of time
[26:21] because if you are wrong about the you
[26:25] know complexity of the task in front of
[26:27] you and you choose wrong and you go with
[26:29] say GSD or you go with superpowers you
[26:33] just cost yourself 40 minutes versus
[26:36] claude code or 80 minutes if you went
[26:38] the GSD route that's a big deal because
[26:41] truth be told if I did this again and
[26:43] you asked me who was the winner out of
[26:44] these three today was Claude Code and it
[26:47] is even close why it's not even the
[26:48] token It's the time. Sure, I you could
[26:52] probably say this was the worst out of
[26:53] the bunch if we're splitting hairs, but
[26:55] guess what? Maybe it's the worst, but I
[26:57] just got 40 extra minutes to work on it
[26:59] or I got 80 extra minutes to work on it
[27:02] versus GSD. Which one do you think's
[27:03] going to be better? This GSD one I just
[27:05] created or me and Claude Code with 80
[27:08] more minutes or me and Claude Code with
[27:10] 40 more minutes?
[27:14] Should be kind of obvious, right? So,
[27:18] you know, where do I stand at the end of
[27:20] this? Well,
[27:22] my take is that you kind of need a good
[27:25] reason to use these orchestration
[27:26] layers. If I was going to use one today,
[27:29] it would be superpowers. If I was doing
[27:32] a task that I didn't know, if it was
[27:33] going to be too complicated, right, that
[27:35] imaginary line in the sand that nobody
[27:37] knows where it actually lies, and I
[27:39] think we might be getting close, I would
[27:40] use superpowers cuz I know it's not
[27:42] going to crush me in terms of tokens.
[27:44] and I'll just go do something else for
[27:46] 60 minutes versus if I go to GSD, I kind
[27:50] of got to be there at the keyboard,
[27:51] right? If I want to get the full use out
[27:53] of it, I got to go through all the
[27:54] planning stuff and it's going to take a
[27:56] long time and cost a lot of tokens. So,
[27:58] if I'm wrong, it sucks badly, right?
[28:01] That really hurts to spend that amount
[28:02] of time with GSD. It hurt doing this
[28:04] video just sitting there going through
[28:06] all these tasks for an end result that
[28:07] really wasn't worth it. So, if I really
[28:09] do think it's going to be something so
[28:11] complicated that I need superpowers,
[27:00] then okay, I think you can justify that.
[28:16] But if it's really not going to be that
[28:18] complicated, or even if it is a
[28:20] complicated task, is it just something
[28:22] that we can break down into like
[28:24] different features and slowly add on to
[28:25] it? And by slowly, I mean actually way
[28:28] quicker than the other options because
[28:29] I'm just using out of the box clawed
[28:31] code, which is way faster than these
[28:33] other options. The other thing is when
[28:37] GSD came out, and I did a video when GSD
[28:40] came out, too, like I really like GSD at
[28:42] the time. And same thing with
[28:43] superpowers. When these two things came
[28:45] out originally, cloud code wasn't in the
[28:47] place it is today. And you know, I
[28:49] already can hear people complaining,
[28:51] well, like Claude Code's nerf today.
[28:52] Like, that's not what I'm talking about.
[28:54] I'm talking like the way Cloud Code
[28:55] approaches problems and some of the
[28:57] scaffolding and some of the way the
[28:58] harness itself works. There's a lot like
[29:00] just for the fact that like when you
[29:02] have a large plan and you want to
[29:03] execute it and it asks you, hey, do you
[29:05] want to clear context and do it like
[29:06] this? That wasn't even a thing. Like
[29:08] cloud code was way more susceptible to
[29:10] things like context rot than when GSD
[29:12] first came out. When GSD first came out,
[29:13] I was like, oh my, this is a godsend. It
[29:15] actually handles context the way it
[29:16] should. Well, cloud code has brought in
[29:18] a lot of those things. Which is to say
[29:20] the gap between baseline cloud code in
[29:22] these things has shrunk significantly
[29:25] while at the same time there is now a
[29:27] huge gap in terms of speed to execution
[29:30] and we can't not talk about the speed
[29:33] difference. This 20 minutes versus the
[29:35] 60 minutes the 105 is the biggest
[29:37] difference out of everything and it's
[29:38] what you should induct index on a lot in
[29:42] my opinion at least. So in conclusion,
[29:45] less is more.
[29:48] I think for 99% of use cases and 99% of
[29:53] users, just using the baseline cloud
[29:55] code makes the most sense. It's going to
[29:57] be quicker. Even if the output isn't
[29:59] better, you have way more time to bridge
[30:00] that gap and leap and actually leap over
[30:02] these other guys. If you think you are
[30:04] doing a project that is that complicated
[30:07] and you want some extra power, use
[30:09] superpowers because it's relatively
[30:11] lightweight versus GSD, which kind of
[30:13] just feels like a behemoth and it
[30:16] doesn't feel great to use. I'm going to
[30:18] be totally honest. Using superpowers
[30:20] just is much more fluid. I just talk to
[30:22] it invokes the skills. I'm not having to
[30:24] like, all right, now we're going to
[30:26] forward/clear. Okay, I'm in a new set.
[30:29] It's a bit much. And I get why GSD2 came
[30:32] out, right? GC 2.0 was meant to
[30:34] alleviate those problems. But guess
[30:35] what? That doesn't work either because
[30:37] you can't use the claw code max planet,
[30:39] which means I'm paying absurd prices.
[30:40] So, you know,
[30:44] so much for that. So, hopefully that
[30:45] sheds some light on this whole thing for
[30:47] you. I think if you stick with standard
[30:48] vanilla cloud code, you're going to be
[30:50] just fine. Have superpowers in your back
[30:52] pocket if you really need it. Just have
[30:54] the skills on a project level. And
[30:56] frankly, it's tough to say you need GSD
[30:58] unless you're just doing something crazy
[31:00] and you just like having your handheld
[31:02] through every single phase. So that's
[31:05] all I got. As always, let me know in the
[31:08] comments what you thought. Would love to
[31:09] hear about how you've been using
[31:10] superpowers and GST and when I
[31:12] inevitably messed up in their
[31:14] application. If you want to get your
[31:16] hands on the Cloud Code Masterass, make
[31:18] sure to check it out. Link is in my bio,
[31:22] my pin comment. And besides that, I will
[31:24] see you guys
