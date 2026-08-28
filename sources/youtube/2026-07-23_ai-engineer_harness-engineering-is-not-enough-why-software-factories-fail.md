---
title: "Harness Engineering is not Enough: Why Software Factories Fail — Dex Horthy, HumanLayer"
type: "youtube"
channel: "AI Engineer"
date: "2026-07-23"
resource: "https://www.youtube.com/watch?v=Ib5GBkD555M"
pillar: "building"
tags: [agents, claude-code, workflow, harness-engineering, context-engineering, opinion, best-practices, anti-patterns]
timestamp: "2026-08-28"
extraction_method: "auto-captions"
video_id: "Ib5GBkD555M"
duration: "19:17"
---

# Harness Engineering is not Enough: Why Software Factories Fail — Dex Horthy, HumanLayer

**Source:** AI Engineer | 2026-07-23 | https://www.youtube.com/watch?v=Ib5GBkD555M | 19:17

## Transcript

[00:01] [music]
[00:25] >> What's up everybody?
[00:26] How we doing?
[00:29] Guys, give it up for all the great
[00:30] speakers today so far.
[00:33] Um
[00:34] >> [applause]
[00:36] >> All right, this is Harness Engineering
[00:38] is not enough and why software factories
[00:40] fail.
[00:42] And we're going to click, maybe.
[00:44] Oop.
[00:47] Oh, that's way too many slides. Hold on,
[00:49] guys.
[00:50] Okay.
[00:51] Um
[00:52] So, we're all racing to put AI coding
[00:54] into production.
[00:55] And uh there's been lots been said about
[00:57] loop engineering.
[00:59] And uh we should probably write more
[01:00] loops.
[01:01] And
[01:02] uh yeah, I don't know. I guess we're
[01:03] doing loops now.
[01:06] Uh StrongDM built a lights-out software
[01:08] factory where nobody even reads the
[01:09] code. And the prevailing
[01:12] narrative is we should just spend more
[01:14] tokens.
[01:15] You are the bottleneck.
[01:17] The models are good enough. Code is
[01:19] free. Just ship more stuff.
[01:22] But at the same time, we are starting to
[01:24] see the cracks. Our friend Mario at AI
[01:27] Engineer Europe begged us to slow down
[01:30] because companies that should not be
[01:31] having outages because of coding agents
[01:33] are having outages due to coding agent
[01:35] mishaps.
[01:36] Um codebases are falling apart faster
[01:39] than they ever have before. And our
[01:41] friends at Faros AI actually even did a
[01:43] report since we all picked up all these
[01:45] AI coding tools in January, maybe
[01:47] February. Um pull request code review
[01:50] quality is way down. We're having more
[01:52] comments, longer comments, and tons of
[01:54] PRs being merged without any review at
[01:56] all.
[01:57] Incidents are way up, bugs per developer
[01:59] are way up,
[02:00] and uh many people will tell you that
[02:02] you're holding it wrong. That's the only
[02:04] reason.
[02:05] You're not.
[02:07] Well, maybe you are, but that's not the
[02:10] point. Um I've spoken a lot about how to
[02:13] hold it better when it comes to working
[02:14] with AI. Uh probably a million views on
[02:17] YouTube at this point across a bunch of
[02:18] different talks. Um and the basic thing
[02:20] is like as engineers, we've been told
[02:22] that if token maxing isn't working, then
[02:25] it's a skill issue. You just need to
[02:27] spend more tokens. Uh let go of reading
[02:30] the code. That with enough harness
[02:32] engineering, if we maybe sprinkle some
[02:34] magic words, adversarial review on
[02:37] enough of our uh PR bots,
[02:39] that we can get the best of both worlds.
[02:42] 10 to 100x faster,
[02:44] high quality, and nobody has to do that
[02:46] thing we all hate called code review.
[02:48] Uh I'm here to convince you today that
[02:50] this is in fact not a skill issue. That
[02:53] no amount of harness engineering or
[02:55] loops maxing can solve what is
[02:57] fundamentally a model training issue.
[03:00] That's why we say the harness is not
[03:01] enough. Um and to understand this, we
[03:04] kind of have to grapple and dig into how
[03:06] coding models are trained. I'm going to
[03:08] talk about what I think the shortcomings
[03:10] are with some of the current benchmarks
[03:11] and what better ones might look like.
[03:13] And we'll talk about how to move faster
[03:15] safely in the meantime.
[03:17] Um it's going to sound like a rant, uh
[03:19] but there is hope here. Uh I'm going to
[03:20] talk about our journey and a bunch of
[03:21] the landmines we've hit uh building in
[03:23] this world. A bunch of exciting new
[03:24] techniques that we've been working with
[03:26] uh a lot of our users and customers to
[03:27] develop. And I think how we all as a
[03:30] community get to the next chapter of
[03:32] agentic engineering after whatever this
[03:34] thing that we're in.
[03:36] Um so we use a lot of words here. I'm
[03:37] going to zoom out a little bit. I want
[03:38] to give you kind of like a brief history
[03:39] of the software factory. Um and it's
[03:42] actually I don't I I I just learned this
[03:43] last week. It was the term software
[03:45] factory was defined at a NATO conference
[03:47] in 1968.
[03:49] Uh we're going to start around 2022,
[03:50] like right before AI started coming
[03:52] around. Um and basically in a typical
[03:55] 2022 software factory,
[03:57] you will have some people building
[03:59] stuff. You'll have engineers, you'll
[04:00] have PMs, maybe you have some sort of
[04:02] leadership team that is driving the
[04:03] vision here. And they all decide that
[04:05] stuff needs to get done. And so you put
[04:07] it in a tracker, a linear, a Jira, a
[04:10] beads, some sort of state machine that
[04:11] tracks what needs to be done.
[04:13] And then someone goes and grabs
[04:14] something off of there, and they build
[04:16] the thing. And there may be some
[04:17] automated testing in that process, maybe
[04:19] some manual manual testing in that
[04:20] process. At a certain point, we make
[04:23] this pull request thing. Says, "Okay,
[04:24] cool. We got to run a bunch of checks,
[04:26] automated stuff. A human's going to
[04:27] review the change and review the code.
[04:29] And perhaps we might even have uh a
[04:31] human pull it down and test it somehow."
[04:34] And if anything goes wrong here, we loop
[04:35] back to someone builds the thing.
[04:37] Uh and eventually we're ready for prod.
[04:39] And so we ship it to production. And
[04:41] once it's in prod, it makes contact with
[04:43] our users.
[04:45] And users do uh a thing that we all
[04:47] love. Uh users love to complain.
[04:51] I I love our users. Uh but yeah, they're
[04:52] going to ask for things, they're going
[04:53] to find bugs, they're going to file
[04:54] feature requests.
[04:56] Uh and that goes back to your team. You
[04:58] might also add monitoring. And so uh you
[05:01] know, what do we want more than anything
[05:02] else? We want to wake up engineers at
[05:04] 3:00 in the morning when something
[05:05] breaks. So they can get dragged out of
[05:07] bed to try to go fix it. Uh and we go on
[05:09] and on in this loop.
[05:10] Uh and we ship a bunch of code.
[05:13] Um and one thing that we noticed here is
[05:15] that uh teams figured this out decades
[05:17] ago is that this someone builds the
[05:19] thing step
[05:21] is usually going to take hours or days
[05:23] in most cases. And the review part will
[05:25] also take hours or days for large
[05:28] things. And so teams started doing these
[05:29] upfront planning, architectural
[05:30] proposals, sprint planning, and they
[05:32] would collaborate this
[05:34] on on these things as a team uh with the
[05:36] hopes that we might decrease the percent
[05:38] chance that something would need to be
[05:39] reworked. That we would be able to
[05:41] reduce the time spent in reviewing every
[05:43] line of code because we aligned on
[05:45] everything ahead of time.
[05:47] This brings us to the agentic software
[05:49] factory.
[05:50] Uh every company and their mother is
[05:53] talking about how they built a coding
[05:55] agent factory that ships 75% of their
[05:57] code now.
[05:58] Uh literally everybody.
[06:01] Uh and so if we look at the software
[06:02] factory from 2022,
[06:04] uh we just replace someone builds the
[06:05] thing with an agent builds the thing.
[06:07] And we have an orchestration and a
[06:08] harness and a sandbox and a model and
[06:10] computer use and I'm not going to get
[06:11] into like the details of that. You can
[06:13] watch 100 talks about that this week,
[06:14] I'm sure. Um but now the building part
[06:16] takes minutes or hours, but this human
[06:18] part still takes hours or days if you're
[06:20] going to review the code and you're
[06:21] going to test the changes.
[06:23] And so we bring in agentic code review.
[06:24] We bring in agentic regression testing,
[06:27] uh and it makes this part faster, but
[06:29] it's probably still the bottleneck.
[06:31] But we can do more loops here. Why not?
[06:33] Let's do some more loops. So we can
[06:34] route all incidents straight into the
[06:36] factory. Why does someone need to get
[06:37] woken up uh and try to fix it when they
[06:39] could just wake up to a pull request and
[06:41] uh maybe that fixes the issue for you.
[06:43] You can take all the user feedback and
[06:45] just stick it straight into the factory
[06:47] so that people ask for stuff and it gets
[06:48] built.
[06:49] And now your only job is how much things
[06:52] can you stuff into the queue of stuff to
[06:54] do and how fast can you review and test
[06:56] the changes? Which brings us of course
[06:58] to, I'm sure you know, the lights off
[07:00] software factory where basically Dentsu
[07:02] Bureau coined this is we no longer read
[07:04] the code. We say, "You know what? This
[07:06] is going great. That code review thing?
[07:08] No, thanks. We're just not going to do
[07:10] that anymore."
[07:11] Uh and we invest into all these other
[07:13] parts of the system. Your your testing,
[07:15] your monitoring, your rollout,
[07:16] everything else. We just write more code
[07:18] and build those systems better.
[07:19] And now our job really is just how much
[07:21] how much stuff can we ask the agent to
[07:23] build?
[07:25] I am going to posit that this does not
[07:27] work. Uh and this is why software
[07:29] factories fail. Um as as an aside, what
[07:32] I'm going to say has nothing to do with
[07:33] vibe coding. So Addy had this uh great
[07:36] post. I'm going to just going to
[07:36] literally take his quote verbatim. A
[07:38] developer vibe coding a side project a
[07:40] dozen people will ever run,
[07:43] and a team keeping a 10-year-old
[07:44] enterprise system alive for another
[07:46] quarter share almost no constraints
[07:48] worth naming. And most of what you hear
[07:50] on the internet is one of these groups
[07:52] of people telling the other group of
[07:53] people how to live their lives.
[07:56] So, if you love vibe coding, please go
[07:59] on. Um at Human Layer, what we care
[08:00] about is how do we help people solve
[08:02] hard problems in complex codebases. Um
[08:05] we use the word brownfield a lot, which
[08:07] historically has meant like some
[08:09] 10-year-old Java thing. I actually think
[08:11] agents really start to struggle after
[08:13] maybe 3 to 6 months, especially with the
[08:14] pace at which we can ship now.
[08:16] Um you can ask me how I know this, and I
[08:18] will tell you that it is because in July
[08:20] 2025, we tried this. We went full lights
[08:22] off, and uh if you have tried this
[08:25] seriously for a number of months, you
[08:27] probably found at least one issue that
[08:29] the agent couldn't solve.
[08:31] Even with your most advanced prompting,
[08:33] you do research, you do reproductions,
[08:35] you just you have to go and dig into
[08:37] that codebase that you stopped reading 3
[08:39] months ago to try to figure out what's
[08:41] broken. And in the meantime, your site
[08:43] was down,
[08:44] your users were pissed, and you were If
[08:46] you were like me, you were probably
[08:47] miserable reading all this slop code
[08:49] that you let slip into your system.
[08:51] And what I want to get to is basically
[08:54] models have a shortcoming. Um they can't
[08:56] maintain and improve codebase quality
[08:58] over time, not without a a decent amount
[09:00] of human steering.
[09:01] Um and when I say maintainability, I'm
[09:02] basically talking about issues like it
[09:04] becomes really, really hard to make a
[09:06] change in one part of the codebase
[09:08] without breaking other parts of the
[09:09] codebase. This is Martin Fowler's
[09:11] shotgun surgery, textbook code smell. Um
[09:13] I'm not going to say much more about
[09:14] maintainability. There's a bunch of
[09:15] books that you can go read about it. In
[09:17] fact, John Osterhout is actually here
[09:18] speaking this week, so you can go ask
[09:19] him in person about the philosophy of
[09:21] software design if you want to.
[09:23] Um but it brings us to this question of
[09:25] like why can't models do software
[09:26] maintainability?
[09:28] Um and you may also be saying, but Dex,
[09:30] you know, surely the models have gotten
[09:31] much better since then.
[09:33] Um they've gotten better in some ways,
[09:35] but they're still about the same in
[09:36] others. Um if you want to solve one-off
[09:38] problems or vibe code a new marketing
[09:40] side, yes, they got way better since
[09:42] 2025 and 2024. But as far as improving
[09:45] code base quality, I think uh they have
[09:47] not gotten much better. Now, I cannot
[09:50] prove this because there are no good
[09:52] benchmarks for a model's ability to
[09:54] maintain code base quality, and I'll get
[09:56] into like where we're going with that.
[09:57] Um,
[09:58] but if you've worked with coding agents
[09:59] for a while, a lot of people are posting
[10:01] about this. It's just like you probably
[10:02] have this vibe that they they generally
[10:04] make things worse over time and make the
[10:06] code base harder to work in.
[10:08] And to figure out why this happens, I
[10:09] want to zoom out to the first great
[10:11] coding agent.
[10:13] Why did Claude Code go from nothing to 4
[10:16] billion and I think now they're at 9
[10:18] billion in revenue in under a year?
[10:21] Cuz they were great CLI agents before
[10:23] Claude Code. You had Aider, you had Code
[10:24] Buff. There was a bunch of tools in this
[10:26] category. They had all the same tools,
[10:28] read, write, edit, grep, bash. Um, so
[10:30] what was the difference? The difference
[10:32] was was that the this was the first time
[10:35] that a model lab trained a model against
[10:37] the harness that they were going to
[10:38] distribute it to users in.
[10:40] Um, and it got really, really good at
[10:42] this is just some of the tools, but it
[10:43] got really, really good at calling these
[10:45] sorts of tools in an agentic loop. In
[10:47] fact, the OpenAI team did a talk in
[10:49] November about basically if you are
[10:54] a uh harness builder and you don't own
[10:56] the model weights and you can't RL the
[10:57] model in your harness, you will always
[11:00] be at a disadvantage compared to
[11:02] somebody who owns both the model and the
[11:03] harness.
[11:05] Um, and I'm going to decide a couple
[11:06] slides from my buddy Calvin French Owen,
[11:08] who was a MTS on Codex during the
[11:10] initial launch. Um, but LLMs are just
[11:12] next token predictors. Uh, this is a
[11:14] slide from over a year ago where
[11:15] basically as you're doing your agentic
[11:16] loop, context window goes in, next step
[11:18] comes out.
[11:20] And uh we're going to try to do this. I
[11:21] haven't actually timed this, but we're
[11:22] going to see if we can do coding agent
[11:23] reinforcement learning in 60 seconds.
[11:26] So, what we're going to do if we want to
[11:27] train a model to get better at tool
[11:28] calling, better at solving software
[11:29] problems, we're going to generate a
[11:31] bunch of We're going to give it a
[11:32] problem and we're going to generate a
[11:33] bunch of traces. Try to solve the
[11:34] problem a bunch of different times.
[11:36] We're going to score them all on
[11:37] correctness and did the test pass and
[11:38] all this stuff.
[11:40] Uh and then we're going to reinforce.
[11:41] We're going to make the bad behavior
[11:42] less likely and we're going to update
[11:44] the weights to make the good behavior
[11:45] more likely.
[11:47] Um this one of the classic ones here is
[11:49] SweetBench multilingual. Uh they're
[11:50] about 15-minute tasks. They're from
[11:52] open-source repos like Redis, JQ, and
[11:54] Django and all this stuff. And they have
[11:56] binary one or zero rewards on did you
[11:58] fix the problem you were trying to fix?
[12:00] And did you do it without breaking
[12:01] anything else?
[12:02] Um and we look at actually a real
[12:04] problem from one of these benchmarks.
[12:05] This is Fastlane, which is a Ruby
[12:06] project. Um basically, there was some
[12:08] issue where we weren't checking for nil
[12:10] and we have a stack trace blow up
[12:11] because you have a null pointer
[12:12] exception.
[12:13] And in this um in this benchmark, you
[12:15] have a base commit that we're going to
[12:16] check out before the issue was solved by
[12:19] a human in the past. We're going to give
[12:21] it a test patch that says here's what
[12:23] the behavior should be afterwards. We
[12:25] have a golden patch. Both these are
[12:26] hidden from the model.
[12:28] Uh and so we have the agent go try to
[12:29] solve the problem. We store its patch.
[12:32] We undo all the changes it made to any
[12:33] test files cuz I'm sure you've seen
[12:35] models comment out tests just to get
[12:37] things working.
[12:38] And then um we're going to apply our
[12:40] golden test patch. Uh and then we're
[12:42] going to run the test. Old test and did
[12:43] the new test pass? And if they both
[12:45] pass, then uh then we get the reward.
[12:47] Otherwise, we don't.
[12:49] Um and so models are trying to get the
[12:50] test to pass. There's no way in this
[12:52] system that we can penalize it for poor
[12:54] program design or for eroding the
[12:55] maintainability of our systems. That's
[12:57] why we get things like this. Try catches
[12:59] around things that probably don't need a
[13:01] try catch.
[13:02] Or things like this. I think Bybop gave
[13:04] us this example earlier of casting
[13:06] things to other things just so the model
[13:07] can just just it just wants to get the
[13:09] test to pass.
[13:11] Um and so if you can't verify the uh
[13:13] maintainability of the code, it gets way
[13:15] harder to train on this stuff.
[13:16] Um so you remember this picture?
[13:18] Verifying code quality and
[13:19] maintainability is orders of magnitude
[13:21] harder than the code runs and the test
[13:23] pass. Because the cost function of bad
[13:25] architecture is measured in months and
[13:28] years. If you have a coding episode and
[13:30] then you only find out months later that
[13:32] like somebody vibed this a little bit
[13:34] too hard, it's really hard to propagate
[13:36] that reward signal back across the gap.
[13:39] And now the frontier is getting better,
[13:40] slowly. And since I know someone's going
[13:42] to be in the YouTube comments about
[13:43] this, yes, I know benchmarks and
[13:45] verifiers are different and they
[13:46] actually have to be separate data sets,
[13:48] but they're shaped the same and the the
[13:49] structure of these benchmarks is
[13:51] directionally correct. So we're going to
[13:52] look at these as like what is the future
[13:54] of evaluating code maintainability. Um
[13:56] there's a really cool one called Sweep
[13:57] Marathon from Abundant AI where they do
[13:59] like 400-hour tasks of like clone all of
[14:01] Microsoft Excel, every single feature.
[14:04] Uh and they have some sophisticated
[14:05] reward channel stuff. Uh Deep Sweep from
[14:08] Data Curve is also like large tasks on
[14:10] OSS repos that are not actually in the
[14:13] training set cuz they were never
[14:14] actually built in the real world. Uh and
[14:16] then you have Frontier Code from
[14:17] Cognition, um which is multi-PR tasks.
[14:20] They do interesting things like hey, if
[14:21] the model writes tests that don't fail
[14:23] on the pre-patch code, then it gets
[14:24] penalized. And then we have a judge
[14:26] model that says, "Okay, uh did this
[14:28] follow all of our code quality rules?"
[14:30] Um so we're getting better, but I think
[14:31] models judging quality can only go so
[14:33] far uh cuz if the new model if the model
[14:35] knew what good code looks like, it would
[14:37] probably write it in the first place.
[14:40] Uh and review agents and throwing more
[14:42] tokens at the problem, it can raise the
[14:44] floor,
[14:45] um but we're still constrained by what
[14:46] we can teach during RL.
[14:48] Um and so I will I will posit that for
[14:50] now we're stuck reading the code, uh but
[14:52] we can still move pretty fast. And of
[14:54] course there's a world where this is
[14:55] solved uh in the future, and if you want
[14:57] to just keep yolowing prompts until you
[14:59] get to GPT-7 and you don't have to think
[15:00] about this, by all means, please. Uh but
[15:03] bitter lesson be damned, we've got some
[15:04] problems to solve. So let's engineer our
[15:06] way out of this.
[15:07] Um so turning the lights back on, we're
[15:09] going to put the code review back. Uh
[15:11] we're going to embrace this approach of
[15:13] like how do we plan up front to reduce
[15:15] the chance that we have a long or
[15:17] difficult review process. We're going to
[15:19] find leverage. We're going to use AI to
[15:20] help with this. Um the first thing we're
[15:22] going to do is we're going to do some
[15:23] sort of product review, understanding
[15:25] what problem we're solving, what's the
[15:26] desired behavior, maybe looking at
[15:28] mock-ups. Here's a product review I was
[15:29] working on yesterday with a mock-up of a
[15:31] new feature. Once we have our product
[15:33] review, we're going to By the way, we
[15:35] don't small stuff still just go straight
[15:36] to the agent.
[15:38] But once we have the product review,
[15:39] we're going to also do architecture,
[15:40] system architecture. A lot of people
[15:41] have been doing this for a while,
[15:42] component contracts, data models,
[15:44] constraints.
[15:46] This is an example of a doc that we
[15:47] build to understand how these systems
[15:49] are going to fit together and what's
[15:50] like the high-level picture of it.
[15:52] From there, we do something that I think
[15:54] is really under-emphasized in agentic
[15:57] coding these days, which is program
[15:58] design. I think people assume that once
[16:00] you get the architecture right, the
[16:01] model can just cook. But we
[16:04] we often look into the types and the
[16:06] method signatures, the program layout
[16:08] and the call stacks. So here's some
[16:09] examples. I don't think you'll be able
[16:10] to read this one, but this is like the
[16:11] level of abstraction we're at. It's how
[16:13] we're actually going to lay this stuff
[16:14] out and how these systems are going to
[16:16] interact. Dylan Mulroy from Cloudflare
[16:18] talks a lot about how he's using these
[16:20] call graphs as part of his planning
[16:22] process. I think this is exactly right.
[16:25] And then once we've done the product
[16:26] program design, we can do this thing
[16:27] called vertical slices,
[16:29] which is the order of implementation,
[16:31] multi-repo coordination, how we're going
[16:32] to build this across our entire system,
[16:34] and how are we going to check it along
[16:35] the way. I've talked a little bit about
[16:37] how models have horizontal plans. I
[16:39] won't go too deep into it. If you want
[16:40] to learn more about this, you can go
[16:42] watch our talk from AI Engineer Miami.
[16:45] Couple shots of a doc like this going
[16:47] through the tests and the steps in
[16:48] between each phase.
[16:50] The main idea here is 30 minutes over
[16:52] here in pre-planning and alignment can
[16:55] save you hours in review. And so it's
[16:57] actually feasible to still read every
[16:59] line of code.
[17:01] We'll skip this part. Basically, the the
[17:04] summary here is like you don't have too
[17:06] many PRs. If you're drowning in PRs, you
[17:09] actually have too many bad PRs.
[17:12] Because a good PR is a joy to to review.
[17:15] It's it's you're just reading through it
[17:16] like, "Yep, this is great. This is what
[17:17] we discussed. This is what we talked
[17:18] about." Um but even if a PR needs 20%
[17:22] rework, which is generous for a lot of
[17:23] AI AI vibe coded slop,
[17:26] um
[17:27] it's an It's an emotional and
[17:28] intellectual burden on both the reviewer
[17:30] and the submitter.
[17:32] Um and so if you use model assistant
[17:34] planning and alignment, your alignment
[17:35] is shorter cuz you used AI to get all
[17:37] the information at once. Your code
[17:39] review is faster because you aligned up
[17:41] front, and your coding is faster cuz AI
[17:43] did it. And so you're now you're
[17:44] actually really moving faster, but
[17:46] you're still reading everything and
[17:47] you're still owning the code.
[17:49] So, closing advice, um
[17:51] is easy to hear all this and be a little
[17:53] bummed out. Uh I really like the world
[17:56] where we just YOLO everything, and we
[17:57] can just like not have to ever read code
[17:59] ever again.
[18:00] But uh we're engineers, and these are
[18:03] just constraints, and models are good at
[18:04] certain things, and they're not good at
[18:05] other things. And so go figure out how
[18:07] to solve problems given a set of
[18:09] constraints.
[18:11] Uh use loops, they're great. Go solve
[18:12] hard problems. Seek leverage. Um if you
[18:15] want to help with this, um we're
[18:17] building Human Layer. Human Layer is an
[18:18] AI IDE and collaboration platform. It's
[18:21] building blocks for your software
[18:22] factory, um and soon to be better vi-
[18:25] verifiers for software quality. Um we've
[18:27] got sort of a Figma for cloud code and
[18:29] Codex-style collaborative workspace. It
[18:31] walks you through the workflows for
[18:34] doing this sort of work. And uh we are
[18:36] talking to design partners. We are
[18:39] hiring founding engineers here in San
[18:40] Francisco.
[18:41] And uh these slides are live. You can go
[18:43] get them right now. You can try Human
[18:45] Layer at humanlayer.com.
[18:47] Uh it's free for small teams. Go solve
[18:49] hard problems in complex codebases.
[18:52] Thank you all for your energy.
[18:54] >> [applause]
[19:12] [music]
[19:16] >> Hey.
