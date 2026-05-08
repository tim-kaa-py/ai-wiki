---
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
source_type: "youtube"
channel: "AI Engineer"
date: "2026-04-24"
url: "https://www.youtube.com/watch?v=-QFHIoCo-Ko"
pillar: "building"
tags: [claude-code, workflow, prd, kanban, ralph-loop, deep-modules, context-engineering, dumb-zone]
ingested: "2026-05-08"
extraction_method: "auto-captions"
video_id: "-QFHIoCo-Ko"
duration: "1:36:30"
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

**Speaker:** Matt Pocock
**Event:** AI Engineer (workshop)
**URL:** https://www.youtube.com/watch?v=-QFHIoCo-Ko

## Transcript

[0:00:07] [music]
[0:00:15] >> Yeah, we're good.
[0:00:17] Okay, folks.
[0:00:18] We're at capacity.
[0:00:20] Let's kick off. I don't want you waiting
[0:00:22] here for 25 more minutes before we some
[0:00:24] arbitrary deadline.
[0:00:26] So,
[0:00:27] welcome.
[0:00:28] My name's Matt,
[0:00:30] I'm a teacher, and I suppose now I teach
[0:00:32] AI.
[0:00:33] Um
[0:00:35] We have a link up here, if you've not
[0:00:37] already been to this, which is has the
[0:00:38] exercises for the um stuff we're going
[0:00:41] to do today.
[0:00:41] This is going to be around 2 hours, so
[0:00:43] we might just sort of kick off 2 hours
[0:00:45] from now. Is that all right, Mike?
[0:00:47] Yeah, perfect.
[0:00:49] Um and
[0:00:51] the theory behind this talk, or at least
[0:00:52] the thesis under which I've been
[0:00:53] operating for the last kind of 6 months
[0:00:55] or so, is that
[0:00:59] we all think that AI is a new paradigm,
[0:01:01] right? AI is obviously changing a lot of
[0:01:03] things. You guys are obviously
[0:01:04] interested in this, and that's why
[0:01:05] you've come to this talk.
[0:01:07] And
[0:01:09] I feel that
[0:01:12] when we talk about AI being a new
[0:01:14] paradigm, we forget that actually
[0:01:17] software engineering fundamentals, the
[0:01:19] stuff that's really crucial to working
[0:01:21] with humans, also works super well with
[0:01:24] AI.
[0:01:25] And this is what my keynote is on
[0:01:27] tomorrow, really. I'm going to sort of
[0:01:28] be fleshing that out a lot more.
[0:01:30] And in this workshop, I'm hopefully
[0:01:32] going to be able to direct your
[0:01:33] attention to those things, and
[0:01:35] uh hopefully show you
[0:01:38] that I'm right. But we'll see.
[0:01:40] Um can I get a quick heads-up first? How
[0:01:43] many of you guys um are coding have ever
[0:01:46] coded with AI? Raise your hand if you've
[0:01:48] ever coded with AI. Perfect. Okay. Uh
[0:01:51] keep your hand raised.
[0:01:53] Uh
[0:01:54] let's all uh share those armpits with
[0:01:56] the world. Um
[0:01:58] how many of you code every day with AI?
[0:02:01] Cool. Okay. Uh right, keep your hand
[0:02:04] raised if you've ever been frustrated
[0:02:05] with AI.
[0:02:07] Okay, very good.
[0:02:09] You can put your hands down.
[0:02:11] Thank you for that show of obedience. I
[0:02:12] really appreciate that. And we are also
[0:02:14] being live-streamed to the Gilgood room
[0:02:16] as well. I've not
[0:02:17] uh
[0:02:18] Did we send someone up to the Gilgood
[0:02:19] room to just check they're okay?
[0:02:21] Don't know.
[0:02:22] But I see you,
[0:02:24] and there is a way that you can
[0:02:25] participate, which is we have the um a
[0:02:28] Q&A. We're going to be doing kind of
[0:02:30] have a sort of hatred of Q&As cuz
[0:02:31] they're not very democratic. They're
[0:02:33] mostly the sort of
[0:02:34] um most talkative people get to um
[0:02:37] get to participate and share. And so,
[0:02:40] we're going to be going through this um
[0:02:42] Q&A here. So, why do we have to wait
[0:02:43] till 3:45? The room is packed, the doors
[0:02:45] are closed. 100% agree.
[0:02:47] And so, if you want to uh ask a
[0:02:49] question, we're going to be I would like
[0:02:50] you to pile into this async, and then we
[0:02:53] can vote on each other's questions, and
[0:02:54] hopefully get the best questions
[0:02:56] surfaced so the for the entire room to
[0:02:58] enjoy.
[0:03:00] So, I want to talk about first the kind
[0:03:02] of weird constraints that LLMs have.
[0:03:06] And
[0:03:07] those weird constraints are sort of what
[0:03:09] we have to base a lot of our work
[0:03:11] around.
[0:03:12] Now,
[0:03:14] there's a guy called Dex Hardy who runs
[0:03:16] a company called Human Layer, and he
[0:03:17] came up with this idea, which is that
[0:03:21] when you're working with LLMs, they have
[0:03:23] a smart zone
[0:03:25] and a dumb zone.
[0:03:27] When you're first kind of like
[0:03:29] working with an LLM, and it's like
[0:03:31] you've just started a new conversation,
[0:03:33] you start from nothing, that's when the
[0:03:35] LLM is going to do its best work.
[0:03:37] Because in that situation, the attention
[0:03:38] relationships are the least strained.
[0:03:40] Every time you add a token to an LLM,
[0:03:43] it's kind of like you're adding a team
[0:03:44] to a football league. You think of the
[0:03:46] number of matches that get added every
[0:03:49] time you add a team to a football
[0:03:50] league, it just goes
[0:03:52] it scales quadratically. And that's
[0:03:54] because you have attention relationships
[0:03:55] going from essentially each token to the
[0:03:57] other that are positional and the sort
[0:04:00] of meaning of the individual token.
[0:04:02] And so, this means that by around sort
[0:04:04] of 40% or around I would say around 100K
[0:04:07] is kind of my new marker for this. Cuz
[0:04:09] it doesn't matter whether you're using 1
[0:04:11] million
[0:04:12] uh context window or 200K,
[0:04:15] it's always going to be about this.
[0:04:17] It starts to just get dumber.
[0:04:20] So, as you continually keep adding stuff
[0:04:22] to the same context window, it just gets
[0:04:24] dumber and dumber until it's making kind
[0:04:26] of stupid decisions. Raise your hand if
[0:04:27] that feels familiar to you.
[0:04:30] Yeah, cool.
[0:04:31] So, this means that we kind of want to
[0:04:33] size our tasks in a way that sticks
[0:04:37] within the smart zone.
[0:04:38] Right? We don't want the AI to bite off
[0:04:41] more than it can chew. This goes back to
[0:04:43] old advice like Martin Fowler in
[0:04:45] refactoring. Uh like uh the pragmatic
[0:04:48] programmer talks about this. Don't bite
[0:04:49] off more than you can chew. Keep your
[0:04:51] tasks small so that you as a developer,
[0:04:54] a human developer, don't freak out and
[0:04:56] don't start acting and going into the
[0:04:58] dumb zone.
[0:05:01] But
[0:05:02] how do you tackle big tasks? How do you
[0:05:04] take a large task like I don't know,
[0:05:07] cloning a company or something, or just
[0:05:09] doing something crazy,
[0:05:11] and how do you break it into small tasks
[0:05:13] so they all fit into the dumb zone?
[0:05:16] One way, of course, you could do is I
[0:05:17] mean, kind of what the AI companies
[0:05:19] maybe want you to do, or the natural way
[0:05:21] of doing it is just keep going and going
[0:05:22] and going, you end up in the dumb zone,
[0:05:24] charging you tons of tokens per request.
[0:05:26] You then compact back down.
[0:05:28] We'll talk about compacting properly in
[0:05:29] a minute. And you keep going, keep
[0:05:31] going, keep going, compact back down,
[0:05:33] keep going, keep going, keep going.
[0:05:35] And I think that's doesn't really work
[0:05:37] very well because the more sediment I
[0:05:39] we'll talk about that in a minute.
[0:05:41] So, the theory here is then, and this is
[0:05:43] what I was doing for a while,
[0:05:45] is I would use these kind of
[0:05:47] um multi-phase plans.
[0:05:49] Where I would say, "Okay, we have this
[0:05:51] sort of number four thing here, this
[0:05:53] large large task. Let's break it down
[0:05:55] into small sections so that we can then
[0:05:57] kind of chunk it up and do each little
[0:06:00] bit of work in the smart zone." Raise
[0:06:02] your hand if you've ever used a
[0:06:03] multi-phase plan before.
[0:06:05] Yeah, really common practice, right?
[0:06:07] This is kind of how we've been doing it.
[0:06:09] Certainly, this is how I was doing it up
[0:06:11] until December last year, really.
[0:06:14] And any developer worth their salt will
[0:06:16] look at this and go, "This is a loop."
[0:06:19] Right? This is a loop. We've just got
[0:06:21] phase one, phase two, phase three, phase
[0:06:23] four. Why don't we just have phase N?
[0:06:27] Right?
[0:06:29] Phase N. Where we essentially just say,
[0:06:31] "Okay,
[0:06:32] we have, let's say, a plan operating in
[0:06:34] the background, and then we just loop
[0:06:35] over the top of it, and we go through
[0:06:37] until it's complete."
[0:06:38] And this is where um
[0:06:40] Raise your hand if you've heard of Ralph
[0:06:41] Wiggum as a software practice.
[0:06:44] Okay, cool. Raise your hand if you've
[0:06:45] not heard of Ralph Wiggum as a software
[0:06:46] practice, actually. That's more like it.
[0:06:48] Okay. So, there's this idea called Ralph
[0:06:49] Wiggum, uh which is kind of um
[0:06:52] sort of based on this,
[0:06:54] which is essentially
[0:06:56] all you need to do is sort of specify
[0:06:58] the end of the journey,
[0:07:00] where you just say, "Okay, we create a
[0:07:01] PRD, a product requirements document, to
[0:07:03] say, 'Whoa, okay, let's describe where
[0:07:05] we're going.'" And then we just say to
[0:07:07] the AI, "Just make a small change. Make
[0:07:10] a small change that gets us closer and
[0:07:11] closer to that."
[0:07:13] And
[0:07:14] Ralph works okay, but I prefer a little
[0:07:15] bit more structure.
[0:07:17] So, that's kind of where we got to in
[0:07:19] terms of thinking about the smart zone,
[0:07:21] and that's
[0:07:22] kind of where I want you to first start
[0:07:25] thinking about here.
[0:07:27] Another weird constraint of LLMs is LLMs
[0:07:29] are kind of like the guy from Memento,
[0:07:31] right? They just continually forget.
[0:07:32] They could just keep resetting back to
[0:07:34] the base state.
[0:07:36] Let me pull up this diagram.
[0:07:38] I sort of I
[0:07:39] I I really should use slides, but I just
[0:07:41] prefer just like randomly scrolling
[0:07:43] around a
[0:07:44] uh infinite uh TL draw canvas. Thank
[0:07:46] you, Steve.
[0:07:48] Um
[0:07:49] So, let's say another concept I want you
[0:07:52] to have is that every session with an
[0:07:53] LLM kind of goes through the same
[0:07:55] stages.
[0:07:56] You have, first of all, the system
[0:07:57] prompt here. This gray box here is
[0:08:00] essentially the stuff that's always in
[0:08:02] your context. You want this to be as
[0:08:04] small as possible. Cuz if you have a ton
[0:08:07] of stuff in here, if you have 250K
[0:08:09] tokens, like I have seen people put in
[0:08:11] there, then that you're just going to go
[0:08:13] straight into the dumb zone without even
[0:08:15] being able to do anything.
[0:08:17] So, you want this to be tiny.
[0:08:19] >> [snorts]
[0:08:19] >> You then go into a kind of exploratory
[0:08:21] phase. This blue sort of where the
[0:08:23] coding agent is going out and exploring
[0:08:25] the code base.
[0:08:26] Then you go into implementation.
[0:08:28] And then you go into testing.
[0:08:30] And sort of making sure that it works,
[0:08:32] running your feedback loops and things
[0:08:33] like this.
[0:08:34] Raise your hand if that feels familiar
[0:08:36] based on what you've done. Yeah. Sort of
[0:08:38] the like the the main cornerstones of
[0:08:40] any session.
[0:08:42] And when you clear the context, you go
[0:08:44] right back to the system prompt.
[0:08:46] Oof, you go right back there. So, you
[0:08:48] delete everything that's come before.
[0:08:51] And
[0:08:53] raise your hand if you've heard of
[0:08:54] compacting, as well.
[0:08:56] Yeah, okay. There are some people who've
[0:08:57] not heard of compacting. So, let's just
[0:08:58] quickly show what that means.
[0:09:00] For instance,
[0:09:02] I've just been having a little chat with
[0:09:03] my LLM.
[0:09:06] Uh
[0:09:07] I want to make sure we sort of, you
[0:09:09] know, just cover the basics so we're all
[0:09:10] sort of on the same wavelength here.
[0:09:12] I've just been having a chat with my
[0:09:13] LLM.
[0:09:14] I've been talking about a thing that I
[0:09:16] want to build. How's the font size?
[0:09:17] Should I bump it up?
[0:09:19] Folks in the back?
[0:09:20] Bump. Bump.
[0:09:22] Bump. Bump. Bump. Oh.
[0:09:24] I'm using Claude Code for this session,
[0:09:25] but you don't need to use Claude Code.
[0:09:27] Uh
[0:09:28] in fact, it's often nice not to use
[0:09:29] Claude Code.
[0:09:30] Um
[0:09:32] so, I've been having a chat with the
[0:09:33] LLM, just sort of planning out what I'm
[0:09:34] going to do next. It's asking me a bunch
[0:09:35] of questions, and I can
[0:09:38] I highly recommend you do this.
[0:09:40] There's this tiny little status line
[0:09:42] here that tells me how many tokens I'm
[0:09:44] using, the exact number of tokens I'm
[0:09:46] using. Um I have a article on my website
[0:09:49] AI Hero if you want to copy this. This
[0:09:52] is
[0:09:53] Oh, wow, that is that shakes, doesn't
[0:09:54] it? Um
[0:09:56] this is essential information on every
[0:09:59] coding session cuz you need to know
[0:10:00] exactly how many tokens you're using so
[0:10:02] that you know how close you are to the
[0:10:03] dumb zone.
[0:10:05] Absolutely essential.
[0:10:06] And so let's watch it.
[0:10:08] So I've got two options. I can either
[0:10:09] clear
[0:10:11] wrong and go back to nothing or I can
[0:10:14] compact.
[0:10:15] And when I compact then it's going to
[0:10:18] squeeze all of that conversation, which
[0:10:19] admittedly isn't very much, into a much
[0:10:22] smaller space.
[0:10:24] And this in diagram terms kind of looks
[0:10:26] like this.
[0:10:27] Where you take all of the information
[0:10:28] from the session and you essentially
[0:10:30] create a history out of it, a written
[0:10:32] record of what happened.
[0:10:36] And devs love compacting for some
[0:10:37] reason, but I hate it.
[0:10:40] I much prefer my AI to behave like
[0:10:43] uh the guy from Memento because this
[0:10:45] state
[0:10:46] is always the same. Always the same
[0:10:48] every time you do it. You clear and you
[0:10:50] go back to the beginning. And so if
[0:10:51] you're able to do that and you're able
[0:10:53] to optimize for that then you're in a
[0:10:54] great spot.
[0:10:56] So that's kind of the two things I want
[0:10:58] you to think about with LLMs, the two
[0:10:59] constraints that we're working with.
[0:11:01] They have a smart zone and a dumb zone
[0:11:03] and they're like the guy from Memento.
[0:11:06] So let's take a look at the first
[0:11:08] exercise.
[0:11:09] And I'm while I'm doing this, the way I
[0:11:11] want this to work is I'm going to sort
[0:11:13] of show you how um I'm going to be sort
[0:11:15] of walking through it up here and I want
[0:11:17] you folks to be kind of like tapping
[0:11:19] away and doing things as well. So that
[0:11:21] was just a little lecture bit. Let's now
[0:11:23] actually get and do some coding.
[0:11:25] For anyone who arrived late or anyone in
[0:11:27] the Gilgud room uh go to this link
[0:11:32] this link up here
[0:11:35] to see the exercises and clone the repo.
[0:11:38] You absolutely do not have to, you can
[0:11:39] just watch me do it if you fancy it.
[0:11:41] But let's go there myself and let's see
[0:11:42] what exercises await us.
[0:11:45] So essentially I've built a um this is
[0:11:47] from my course.
[0:11:49] This is a uh a course management
[0:11:52] platform essentially, a kind of CMS for
[0:11:55] instructors, for students, and this is
[0:11:56] what we're going to be building a
[0:11:57] feature in. So I'm going to take you
[0:12:00] from essentially the idea for the
[0:12:02] feature all the way up to building a PRD
[0:12:04] for the feature, all the way up to
[0:12:06] implementing the feature.
[0:12:08] And hopefully you can take inspiration
[0:12:09] from this process and use it in your own
[0:12:11] work.
[0:12:12] So
[0:12:14] uh let's kick off. So
[0:12:17] we're going to start by using a a skill
[0:12:19] which is very close to my heart.
[0:12:21] It's the grill me skill.
[0:12:23] And this grill me skill is wonderfully
[0:12:27] small wonderfully tiny and it helps
[0:12:30] prevent one of I think the main issues
[0:12:32] when you're working with an AI, which is
[0:12:34] misalignments.
[0:12:37] The uh
[0:12:39] the sort of silent idea that I'm talking
[0:12:41] against here, that I'm arguing against,
[0:12:43] is the specs to code movement. Has
[0:12:45] anyone heard of the specs to code
[0:12:46] movement? Raise your hand. It's not
[0:12:48] really a movement I suppose, it's just
[0:12:49] sort of people saying specs to code.
[0:12:51] Um
[0:12:53] what it is is people say, "Okay, you can
[0:12:55] write a program or you want to build an
[0:12:57] app the best way to build that app is to
[0:13:00] take some specifications
[0:13:02] so to write some sort of like document
[0:13:05] and then turn that document into code."
[0:13:09] So they just turn it into code. How do
[0:13:10] you do that? You pass it to AI. If
[0:13:12] there's something wrong with the
[0:13:13] resulting code, you don't look at the
[0:13:15] code, you look back at the specs. You
[0:13:17] change the specs and you sort of just
[0:13:19] keep going like this. This is kind of
[0:13:21] like vibe coding by another name where
[0:13:22] you're essentially ignoring the code.
[0:13:25] You don't need to worry about the code.
[0:13:27] You just sort of keep editing the specs
[0:13:28] and eventually you just keep going. And
[0:13:30] I tried this. I really tried it. And it
[0:13:32] sucks. It doesn't work.
[0:13:34] Because you need to keep a handle on the
[0:13:36] code. You need to understand what's in
[0:13:38] it. You need to shape it because the
[0:13:40] code is your battleground. And so
[0:13:44] this is again is where we're going.
[0:13:45] Let's let's get some exercises.
[0:13:47] So
[0:13:48] what I'd like you to do is go to this
[0:13:49] page, the the grill me skill.
[0:13:51] And inside the repo here
[0:13:54] we have a slack message
[0:13:56] from our pal. Uh where is it? It's in
[0:13:59] the root of the repo and it's under
[0:14:03] bur bur bur bur
[0:14:04] Oh, where is it?
[0:14:06] Mhm mhm client brief.md.
[0:14:09] It's a slack message from Sarah Chen.
[0:14:11] For some reason the Claude always
[0:14:12] chooses Sarah Chen as the name. I don't
[0:14:13] know why.
[0:14:14] Um it's saying that in cadence, our um
[0:14:18] course platform, our retention numbers
[0:14:20] are not great. Students sign up to a few
[0:14:22] lessons then they drop off. I'd love to
[0:14:24] add some gamification to the platform.
[0:14:26] And so when you're presented with an
[0:14:28] idea like this, you need to find some
[0:14:30] way of turning it into reality. Let's
[0:14:31] say Sarah Chen is your client, you're on
[0:14:33] a tight budget, you need to get this
[0:14:34] done fast. How do you go and do it?
[0:14:37] Um
[0:14:38] raise your hand if you would um
[0:14:40] enter plan mode when you're doing this.
[0:14:43] Anyone a big user of plan mode? Yep.
[0:14:45] Um let's actually shout out quickly any
[0:14:47] other ideas about what you would do with
[0:14:49] this or any Raise your hand if you
[0:14:51] what what would be your first port of
[0:14:52] call?
[0:14:54] Yep. Ask for more info.
[0:14:55] Sorry? Ask for more
[0:14:57] info to verify what is the purpose and
[0:14:59] where our current standing is. Yes,
[0:15:00] exactly. Let's imagine that Sarah Chen's
[0:15:02] gone on holiday, you have no idea,
[0:15:03] right? Uh she's just posted this thing,
[0:15:05] you need to action it before you go.
[0:15:07] Well, my first port of call is I go for
[0:15:10] this particular skill. I'm going to
[0:15:11] clear my context.
[0:15:15] I'm going to
[0:15:16] uh get rid of
[0:15:18] you, you don't need to be there.
[0:15:20] And I'm going to say
[0:15:22] um I'm going to invoke a skill
[0:15:25] which is the grill me skill. Let's
[0:15:27] quickly check.
[0:15:28] Raise your hands if you don't know what
[0:15:29] this is.
[0:15:31] Cool.
[0:15:32] Oh, sorry sorry. Let me be more
[0:15:33] specific. Raise your hands if you don't
[0:15:36] know what I'm doing here when I
[0:15:38] uh do a forward slash and then type
[0:15:40] something.
[0:15:41] Anyone Everyone kind of understand what
[0:15:43] that is?
[0:15:44] I'm invoking a skill. I'm invoking the
[0:15:45] grill me skill.
[0:15:47] And what I'm going to do is I'm going to
[0:15:49] say grill me and I'm going to pass in
[0:15:51] the client brief.
[0:15:54] So now
[0:15:55] the LLM really has only a couple of
[0:15:58] things here. It just has the skill and
[0:16:00] it has the description of what I want to
[0:16:01] do.
[0:16:04] And this is virtually how I start every
[0:16:06] piece of work with AI.
[0:16:08] And while it's exploring the code base
[0:16:11] I'm just going to show you what the
[0:16:12] grill me skill does.
[0:16:14] So this is inside the repo so you can
[0:16:15] check it out.
[0:16:17] It's extremely short.
[0:16:19] "Interview me relentlessly about every
[0:16:21] aspect of this plan until we reach a
[0:16:22] shared understanding. Walk down each
[0:16:24] branch of the decision tree resolving
[0:16:26] dependencies one by one. For each
[0:16:28] question provide your recommended
[0:16:29] answer.
[0:16:30] Ask the questions one at a time uh blah
[0:16:33] blah blah."
[0:16:34] What this does and what I noticed when I
[0:16:36] was working with AI, especially in plan
[0:16:38] mode actually
[0:16:40] is it would
[0:16:42] really eagerly try to produce a plan for
[0:16:44] me.
[0:16:45] It would say, "Okay, I think I've got
[0:16:46] enough. I'm just going to poof plan
[0:16:48] plan."
[0:16:49] And what I found was that
[0:16:53] I was really trying to find the words
[0:16:55] for this, for for what I wanted instead
[0:16:57] of that.
[0:16:58] And Frederick P. Brooks in The Design of
[0:17:01] Design, he has a great quote uh talking
[0:17:03] about the design concept.
[0:17:05] When you're working on something new
[0:17:07] with someone
[0:17:08] when you're uh all trying to build
[0:17:10] something together
[0:17:12] then there's this shared idea that's
[0:17:14] shared between all participants and that
[0:17:16] is the design concept. And that's what I
[0:17:18] realized I needed with Claude. I needed
[0:17:22] I needed to reach a shared
[0:17:24] understanding. need an asset, I didn't
[0:17:26] need a plan, I needed to be on the same
[0:17:28] wavelength as the AI, as my agent. And
[0:17:31] this is an extremely effective way of
[0:17:33] doing it. So hopefully
[0:17:35] Here we go. Nice. It has done its
[0:17:37] exploration first of all.
[0:17:39] It's invoked a sub agent which spent
[0:17:42] 97 93.7k tokens
[0:17:45] on Opus.
[0:17:47] Um
[0:17:48] and it's asked me the first question.
[0:17:50] Cool.
[0:17:51] We can see that even though the sub
[0:17:53] agent burned a a ton of tokens I haven't
[0:17:55] actually um
[0:17:57] uh increased my token usage that much.
[0:17:59] Raise your hand if you don't know what
[0:18:01] sub agents are. It's important question.
[0:18:04] Everyone kind of clear what sub agents
[0:18:05] are? Okay, I'll give a brief definition.
[0:18:07] Which is that this this sub agents thing
[0:18:10] here, this explore sub agent it has
[0:18:12] essentially gone and called another LLM
[0:18:14] which has an isolated context window.
[0:18:18] And then that LLM has reported a summary
[0:18:20] back. So a sub agent is kind of like a
[0:18:22] delegation. You're delegating a task to
[0:18:24] a sub agent. It goes eagerly does all
[0:18:26] the thing, explores a ton of stuff and
[0:18:28] then just drip feeds the important stuff
[0:18:30] back up to the orchestrator agent.
[0:18:33] To the parent agent. So okay. So
[0:18:35] hopefully you guys have seen the same
[0:18:36] thing. It's done an explore.
[0:18:38] And we now have our first question.
[0:18:41] Points economy. What actions earn points
[0:18:43] and how much? Ooh, okay.
[0:18:45] At this point you can ask it by the way
[0:18:47] questions to um deepen your
[0:18:49] understanding of the repo. I obviously
[0:18:50] know this repo really well cuz I wrote
[0:18:52] it, but you might not um
[0:18:54] know what's going on.
[0:18:55] So let's say my recommendation, keep it
[0:18:58] simple, two point sources to start.
[0:19:00] What's so nice about this is that not
[0:19:02] only does it give us a question that
[0:19:04] kind of aligns us here, we get a
[0:19:06] recommendation too. And often what I'll
[0:19:08] find is the AI's recommendations are
[0:19:09] really good.
[0:19:11] And so I'll just say
[0:19:12] skip video watch events, they're noisy
[0:19:14] and gameable. I agree.
[0:19:16] Sarah's asked we'll keep the lessons in
[0:19:17] the bread and butter.
[0:19:20] Yeah.
[0:19:21] Looks good, pal.
[0:19:24] >> [snorts]
[0:19:25] >> Now what I usually do is I usually
[0:19:26] dictate to the AI. I'm usually actually
[0:19:28] chatting to the AI instead of uh typing
[0:19:31] here, but uh this is a relatively new
[0:19:33] laptop and I couldn't get my dictation
[0:19:35] software working on it um because
[0:19:37] Windows is crap. Um
[0:19:40] So, should points be retroactive? There
[0:19:43] are existing lesson progress records
[0:19:45] with completion at timestamps. This is a
[0:19:47] really nasty question, right? Should we
[0:19:49] actually go back and backfill all of the
[0:19:51] lesson progress events? This is a kind
[0:19:53] of question that you need to be aligned
[0:19:55] on if you're going to fulfill the
[0:19:57] feature properly. This is not something
[0:19:58] I considered and Sarah Chen certainly
[0:19:59] didn't consider.
[0:20:01] Do I want it to be retroactive? Hmm.
[0:20:04] Let's actually do a vote inside here.
[0:20:07] Should we go back and backfill all the
[0:20:08] records? Raise your hand if you think we
[0:20:09] should backfill all the records.
[0:20:13] Raise your hand if you think we
[0:20:14] shouldn't backfill all the records.
[0:20:17] There are a lot of fence-sitters in the
[0:20:19] room. I'm going to say
[0:20:22] you know, this is the kind of discussion
[0:20:23] you're sort of having with the AI.
[0:20:24] You're getting further aligned. Yes, I'm
[0:20:25] just going to go with his recommendation
[0:20:27] cuz I'm lazy.
[0:20:31] Notice too how I'm able to keep in the
[0:20:33] loop here with AI. I'm not you know,
[0:20:35] it's it's pinging me these questions
[0:20:36] pretty quickly.
[0:20:39] I'm not having to go off and check
[0:20:40] Twitter or something.
[0:20:42] Levels. What's the progression curve?
[0:20:44] Yeah, that looks about right. For
[0:20:46] instance, yes, okay.
[0:20:47] So hopefully you should be able to go
[0:20:49] and um
[0:20:50] kind of work through this with the AI.
[0:20:52] >> [clears throat]
[0:20:52] >> And essentially
[0:20:54] try to reach an alignment. And this
[0:20:56] grill me skill, this can last a long
[0:20:58] time. This can I've had it ask me 40
[0:21:00] questions. I've had it ask me 80
[0:21:02] questions. I've had some people that
[0:21:03] asks 100 questions too. Literally you're
[0:21:06] sat there for an hour chatting to the
[0:21:08] AI.
[0:21:09] And what you end up with is essentially
[0:21:11] this conversation history
[0:21:13] that works really nicely and works
[0:21:15] really nicely as an asset of the design
[0:21:17] concept that you're creating.
[0:21:19] This can also function like this. You
[0:21:21] can
[0:21:22] have a meeting with someone who's a
[0:21:24] maybe a domain expert. Maybe I have a
[0:21:25] meeting with Sarah. I feed that meeting
[0:21:28] transcript into
[0:21:30] I don't know, Gemini meetings or
[0:21:32] whatever you guys are using. You take
[0:21:34] that, you feed it into a grilling
[0:21:36] session and you grill through the
[0:21:37] assumptions that you didn't have.
[0:21:39] So this ends up being a really nice kind
[0:21:41] of
[0:21:41] um
[0:21:43] a really nice way of just taking inputs
[0:21:45] from the world and then just turning and
[0:21:47] validating them.
[0:21:49] So okay.
[0:21:51] Let's see. I really want to get to the
[0:21:53] end of this, but I also don't want to
[0:21:54] just like be sat here talking to the AI
[0:21:56] in front of you for uh
[0:21:58] a thousand days. So I'm just going to
[0:21:59] say yes.
[0:22:03] Let's see what happens.
[0:22:05] So I'll tell you what, um while you guys
[0:22:07] sort of have a little fiddle with this
[0:22:08] locally, let's start a little Q&A
[0:22:10] session now.
[0:22:11] And
[0:22:13] let's see. How's this going to work?
[0:22:15] Can we keep the door closed or turn up
[0:22:16] the microphone? It's quite noisy.
[0:22:19] Uh
[0:22:20] let's see. Mike, can we uh
[0:22:22] door closed. Oh it has been closed. Mark
[0:22:24] has answered. Beautiful.
[0:22:26] So what I'd like you to do
[0:22:28] is there any air con? Yeah, there is
[0:22:30] some air con, I think.
[0:22:32] There is some air con.
[0:22:34] You guys aren't being lit here. I'm
[0:22:35] being fro I'm being fried alive here.
[0:22:38] Uh so what I'd like you to do is go on
[0:22:40] to the Slido, which you can join here.
[0:22:42] Have a if if you're not taking the
[0:22:44] exercise, go on to the Slido, have a
[0:22:46] little fiddle and vote on some good
[0:22:47] questions. I'm just going to chat to the
[0:22:49] AI for a second
[0:22:51] uh until we reach a stopping point. So
[0:22:53] do streaks earn points?
[0:22:56] Um
[0:22:57] streaks are standalone.
[0:23:06] Let's see what else it comes up with.
[0:23:13] Where does gamification UI live?
[0:23:15] Let's have it in the dashboard.
[0:23:19] I'm just going to scan these and blast
[0:23:20] through them basically.
[0:23:21] So how are we doing with our Slido?
[0:23:24] Okay.
[0:23:26] Have I tried Spec Kit, Open Spec or
[0:23:28] Taskmaster instead of the Grill Me
[0:23:30] skill? Do I find them more verbose or a
[0:23:32] structured alternative? This is a great
[0:23:33] question. So there are a ton of
[0:23:35] different frameworks out there that
[0:23:36] allow you to um sort of build up this
[0:23:39] planning process for you. I personally
[0:23:42] believe you at at this stage, when
[0:23:44] there's no clear winner, when there's no
[0:23:46] kind of like one true way and when
[0:23:48] things are changing all the time, you
[0:23:50] need to own as much of your planning
[0:23:52] stack as you possibly can.
[0:23:54] What I've noticed and a lot of my
[0:23:56] students
[0:23:57] is
[0:23:59] they tend to overuse a certain stack.
[0:24:03] They get into trouble
[0:24:05] and they because they don't own the
[0:24:06] stack and they don't have observability
[0:24:08] over the whole thing, they just go
[0:24:10] this isn't working. This sucks. Whereas
[0:24:13] if
[0:24:14] um
[0:24:14] if you have control over the whole
[0:24:16] thing, then at least you know how to fix
[0:24:19] it or potentially know how to fix it.
[0:24:21] So I'm even though I'm sort of giving
[0:24:24] you uh a stack basically, I believe in
[0:24:28] inversion of control and you should be
[0:24:29] in control of the stack.
[0:24:32] So bur bur bur.
[0:24:33] Can I press zero, please?
[0:24:38] Sorry?
[0:24:40] Sorry, that was a lot of sort of
[0:24:41] mumbling. Can I
[0:24:48] Thank you.
[0:24:50] I'm so sorry.
[0:24:50] >> [laughter]
[0:24:51] >> What you didn't want to give Claude good
[0:24:53] feedback? What is what is wrong with
[0:24:54] you?
[0:24:57] Uh okay, cool.
[0:24:59] Uh many of the questions asked by the
[0:25:01] Grill Me skill are not necessarily
[0:25:02] appropriate for a developer, rather a
[0:25:03] PO. In larger teams, who should use it?
[0:25:05] Yeah.
[0:25:06] Um
[0:25:07] Raise your hand if um
[0:25:10] you've ever done pair programming.
[0:25:12] Anyone ever done pair programming?
[0:25:13] Right. I keep Put your hands down and
[0:25:16] raise your hand again if you've ever
[0:25:17] done a pair programming session with an
[0:25:18] AI.
[0:25:20] Right.
[0:25:21] How did it go? Was it good? You enjoy
[0:25:23] it? I think pair programming sessions
[0:25:25] with AI is a great idea because you've
[0:25:27] got a third person in the room who will
[0:25:28] relentlessly quiz you and ask you
[0:25:30] questions. It should If you don't know
[0:25:32] the answer, it should be you, the domain
[0:25:33] expert and the AI in the same room. If
[0:25:36] you're have a question about
[0:25:37] implementation, it should be you, a
[0:25:39] fellow developer and the AI in the same
[0:25:41] room, you know. You can be sort of
[0:25:42] working through these questions in your
[0:25:44] team. And I think actually
[0:25:47] we're going to look at implementation in
[0:25:48] a bit and we're going to see how you can
[0:25:50] make implementation so much faster.
[0:25:52] And but I think the really crucial
[0:25:54] decisions, the ones you need humans for
[0:25:57] you actually need a lot of humans and it
[0:25:59] doesn't really matter how many humans
[0:26:00] are in there. You can actually throw a
[0:26:02] bunch like a kind of like mob
[0:26:04] programming with AI essentially.
[0:26:07] Uh what's my favorite meta prompting
[0:26:08] tool? I think I kind of answered that.
[0:26:10] Uh there's no air con. Let's just live
[0:26:12] with it. Uh
[0:26:14] how do I use the conversation as an
[0:26:15] asset after the Grill Me session? Well,
[0:26:18] we're going to get there.
[0:26:20] Um okay, so I really want to
[0:26:24] I want to speed this up sort of
[0:26:25] artificially.
[0:26:28] Just what
[0:26:29] I This is the thing. So someone just
[0:26:31] said okay, Ralph loop this. But this is
[0:26:33] crucial because I can't loop over this,
[0:26:36] right? I can't um
[0:26:39] I think of there is being two types of
[0:26:41] tasks in the AI age.
[0:26:43] Where you have human in the loop tasks,
[0:26:46] where a human needs to sit there and do
[0:26:48] it.
[0:26:49] Which is this.
[0:26:50] We are the human in the loop, with
[0:26:51] multiple humans in the loop. And there
[0:26:53] are AFK tasks. There are tasks where the
[0:26:55] human can be away from the keyboard and
[0:26:57] it doesn't matter. Implementation, as
[0:26:59] we'll see, can be turned into an AFK
[0:27:01] task. But planning, this alignment
[0:27:04] phase, has to be human in the loop. Has
[0:27:07] to be.
[0:27:09] So I've got to do it, unfortunately.
[0:27:11] Um
[0:27:12] I don't know.
[0:27:13] Uh
[0:27:14] give me a long list of all your
[0:27:18] recommendations.
[0:27:20] I'm running a workshop right now.
[0:27:24] So I artificially
[0:27:26] need you to
[0:27:28] pull more weight.
[0:27:31] So let's see what it does.
[0:27:33] Uh let's answer a couple more questions
[0:27:34] while it's doing its thing.
[0:27:37] What is my opinion on PMs or other
[0:27:39] non-dev roles vibe coding task?
[0:27:42] Hmm.
[0:27:45] Um I'm going to return to this later, I
[0:27:48] think. I'm going to leave this
[0:27:48] unanswered.
[0:27:51] A bit of mystery.
[0:27:53] I notice I'm not using the ask user
[0:27:55] questions UI for Grill Me. Why? Um
[0:27:57] there's a specific uh
[0:27:59] UI that you can bring up in Claude Code.
[0:28:01] I'll answer this just quickly.
[0:28:03] Uh ask me a question using the ask user
[0:28:08] question tool.
[0:28:10] >> [snorts]
[0:28:10] >> And this UI um is just sort of broken in
[0:28:13] Claude and I really hate it.
[0:28:17] You notice I'm using Claude, but I don't
[0:28:19] like Claude very much. Like you you
[0:28:20] really are free with this method to
[0:28:22] choose any um system you like. And this
[0:28:24] is what the UI looks like.
[0:28:26] It's very pleasing when you first
[0:28:27] encounter it, but then you realize it is
[0:28:28] actually broken in a ton of different
[0:28:29] ways.
[0:28:32] All right, what did it come back with?
[0:28:33] Oh blimey.
[0:28:35] Oh no.
[0:28:37] So
[0:28:40] while this is doing its thing, let me do
[0:28:41] some teaching in the meantime.
[0:28:43] The plan here is that we take our Grill
[0:28:46] Me skill
[0:28:47] and we need to essentially find some way
[0:28:49] of turning it into
[0:28:51] a destination.
[0:28:53] We need to go down to the
[0:28:56] uh
[0:28:57] We essentially need to
[0:28:58] we're figuring out the shape of this.
[0:29:01] That's what we're doing. We're figuring
[0:29:02] out the shape of the tasks during the
[0:29:03] grilling session.
[0:29:05] And in order to
[0:29:08] turn it into a bunch of actionable
[0:29:10] actions for the AI
[0:29:12] we essentially need to figure out the
[0:29:13] destination. We need to know where we're
[0:29:15] going. We need to know the shape of this
[0:29:16] entire thing.
[0:29:18] So I think of there is being two
[0:29:20] essential documents that we need.
[0:29:22] We need a document that
[0:29:24] documents the destination.
[0:29:27] Oh no.
[0:29:29] It's so not bright enough. There we go.
[0:29:33] Still not brighter. There we go.
[0:29:35] We need something to document the
[0:29:36] destination.
[0:29:38] And we need something to document the
[0:29:39] journey.
[0:29:41] In other words, we need something a
[0:29:42] document that's going to
[0:29:44] figure out what this even looks like in
[0:29:46] all of its user stories and figure out a
[0:29:48] definition of done
[0:29:50] and then we need to figure out what the
[0:29:51] split looks like.
[0:29:53] So, that's where we're going to go to
[0:29:54] next.
[0:29:55] So, once we finish with the grilling
[0:29:57] session,
[0:29:59] yeah, it looks great. Fantastic. I love
[0:30:01] it. It answered
[0:30:02] it answered 22 of its own questions.
[0:30:04] There you go. That's quite
[0:30:05] representative of what a grilling
[0:30:06] session looks like.
[0:30:09] So, at this point now,
[0:30:12] I have used 25k tokens and all of that
[0:30:16] or loads of that stuff is gold. I want
[0:30:18] to keep that around. I've I've got 25k
[0:30:22] great tokens there.
[0:30:24] And what I want to do is kind of
[0:30:25] summarize it in some kind of destination
[0:30:27] documents.
[0:30:28] So, this is um the next exercise
[0:30:31] where we're going to
[0:30:35] uh we're going to write a product
[0:30:37] requirements document.
[0:30:39] And the the product requirements
[0:30:40] documents or the PRD
[0:30:43] is essentially
[0:30:44] that's its function. It's the
[0:30:46] destination documents. And it's sort of
[0:30:48] doesn't matter what shape it is. I've
[0:30:51] got a shape that I prefer and I quite
[0:30:53] like.
[0:30:54] But, you can just choose your own shape
[0:30:56] or whatever your company uses.
[0:31:00] And all we're really doing is I'm not
[0:31:03] too worried about that.
[0:31:05] All we're really doing is summarizing
[0:31:07] the design concept that we have so far.
[0:31:10] And
[0:31:12] the So, let let's try this.
[0:31:15] So, I'm going to initiate this. I'm
[0:31:16] going to say
[0:31:17] zoom all the way to the bottom.
[0:31:19] All I'm going to do is just say write a
[0:31:20] PRD.
[0:31:23] And we can take a look at that skill
[0:31:24] now.
[0:31:26] Write a PRD.
[0:31:29] So, this skill
[0:31:31] it does a few things.
[0:31:34] It first asks the user for a long
[0:31:35] detailed description of the problem. You
[0:31:36] can use write a PRD without grilling
[0:31:38] first, but I just like to grill first
[0:31:40] and then write the PRD afterwards.
[0:31:42] Then you can um get it to install the
[0:31:45] repo which we've kind of already done.
[0:31:47] Then we get it to
[0:31:49] interview the user relentlessly so we
[0:31:50] have a kind of grilling session again
[0:31:52] and then we start um putting together a
[0:31:55] PRD template. So, this is available in
[0:31:57] the repo if you want to check it out.
[0:31:59] And essentially this is what it looks
[0:32:00] like. We've got some problem statements,
[0:32:02] the problem the user is facing, the
[0:32:04] solution to the problem and a set of
[0:32:06] user stories. And these user stories
[0:32:08] sort of define what this is. You know,
[0:32:10] as
[0:32:11] you you guys have probably seen things
[0:32:12] like this if you've been a developer at
[0:32:13] all. Um you know, there are cucumber is
[0:32:16] a language you can use to write these in
[0:32:17] or we just sort of
[0:32:18] um
[0:32:20] uh write them ourselves essentially.
[0:32:22] Then we have a list of implementation
[0:32:23] decisions that were made and list of
[0:32:25] crucially testing decisions, too.
[0:32:28] So,
[0:32:31] I'm going to run this. Okay. And so,
[0:32:33] it's finished its thing.
[0:32:35] Ah!
[0:32:37] Windows, let me close the thing. Thank
[0:32:39] you.
[0:32:40] I don't know why I bought a Windows
[0:32:41] laptop. I think I just
[0:32:43] I like the challenge. Um
[0:32:46] >> [clears throat]
[0:32:46] >> So, the first thing that it's going to
[0:32:47] give me
[0:32:49] are a set of proposed modules it wants
[0:32:51] to modify.
[0:32:54] Now, there's a deep reason why I'm
[0:32:55] thinking about this. So, this is
[0:32:58] at this stage
[0:33:00] we have an idea, we have sort of specked
[0:33:02] out the idea, we've reached a sort of
[0:33:05] understanding of what we're trying to do
[0:33:07] and then we need to start thinking about
[0:33:09] the code
[0:33:10] because at this point we need to
[0:33:13] this is not specs to code. This is not
[0:33:15] where we're ignoring the code. We
[0:33:17] actually keep the code in mind
[0:33:18] throughout the whole process.
[0:33:20] And
[0:33:21] the way I like to do this is I like to
[0:33:23] just sort of think about a set of
[0:33:24] proposed modules to modify. We're going
[0:33:26] to return to this this idea of
[0:33:28] continually designing your system and
[0:33:31] keeping your system in mind.
[0:33:33] So, it's it's saying recommend tests for
[0:33:34] the gamification service is the only
[0:33:36] deep module with meaningful logic. These
[0:33:38] modules look right. Yeah.
[0:33:41] Looks good.
[0:33:44] And it's going to hang out a PRD.
[0:33:48] Now, for ease of setup
[0:33:50] I've got it so that it creates a set of
[0:33:52] issues locally.
[0:33:54] So, it's just going to create
[0:33:55] essentially a PRD inside this issues
[0:33:57] directory.
[0:33:59] But, the way I usually do it
[0:34:01] and you can check this out yourself is
[0:34:04] you can go to my um essentially what I
[0:34:05] consider my work repo
[0:34:07] which is GitHub um dot com forward slash
[0:34:10] Matt Pocock forward slash course video
[0:34:13] manager up here.
[0:34:15] And in here, this is essentially a app
[0:34:17] that I create um that I use all the time
[0:34:20] to record my videos and things like
[0:34:21] this. I think I've recorded like
[0:34:24] I pulled out the stats. I think I've
[0:34:25] recorded like a thousand videos in here
[0:34:27] or something nuts.
[0:34:28] Um and you can see here that it's got
[0:34:30] 744 closed issues.
[0:34:32] And this is essentially all of the uh
[0:34:35] PRDs and all of the implementation
[0:34:37] issues that I've put into here. So, this
[0:34:39] is how I usually like to do it.
[0:34:40] >> [clears throat]
[0:34:42] >> So, that's what I'm doing with the There
[0:34:45] we go. Yeah, I'm just going to say yes
[0:34:47] and uh
[0:34:49] and get that issue out.
[0:34:51] Let's see. It is inside here.
[0:34:53] So, we've got the problem statements.
[0:34:55] People signing up for courses.
[0:34:57] Uh the solution, the user stories, uh 18
[0:35:00] user stories looks nice, some
[0:35:02] implementation decisions, level
[0:35:03] thresholds, etc. This is enough
[0:35:05] information. We've kind of clarified
[0:35:07] where we're going and what we're doing.
[0:35:09] So, that's what we do. We essentially
[0:35:11] have a grilling session and we've
[0:35:12] created an asset out of it. Now, raise
[0:35:14] your hand.
[0:35:16] Should I be reviewing this document?
[0:35:19] Raise your hand if you think I should be
[0:35:20] reviewing the documents.
[0:35:23] Yeah, I don't I don't look at these.
[0:35:24] I don't look at these.
[0:35:26] The reason I don't look at these is
[0:35:27] because what am I testing at this point?
[0:35:30] What am I Like when I read it,
[0:35:33] what am I testing? What am I What are
[0:35:34] the failure modes I'm trying to test
[0:35:35] for?
[0:35:36] I know that LLMs are great at
[0:35:37] summarization
[0:35:39] cuz they are. They're really good at
[0:35:40] summarization.
[0:35:41] I have reached the same wavelength as
[0:35:44] the LLM, right? Using the grill me
[0:35:45] skill, we have a shared design concept.
[0:35:48] So, if I have a shared design concept,
[0:35:49] all I'm doing
[0:35:51] is I'm just essentially checking the
[0:35:53] LLM's ability to summarize.
[0:35:56] So, I don't tend to read these.
[0:36:00] Let's have Let's have a Q&A cuz I can
[0:36:02] feel you guys are itching for it. And I
[0:36:03] think we might have like
[0:36:05] I don't know, just a 5-minute comfort
[0:36:07] break just to uh rest my voice and so
[0:36:08] you can catch up with the exercises for
[0:36:09] a minute if that's all right. So, let's
[0:36:11] have a little Q&A sesh.
[0:36:14] Uh
[0:36:15] If I don't like Claude Code, which one
[0:36:16] do I actually like? Um
[0:36:19] uh
[0:36:20] Have you ever heard the phrase um
[0:36:23] uh democracy is the worst way to run a
[0:36:24] country apart from all the other ways?
[0:36:27] That's how I feel about Claude Code.
[0:36:30] Uh we've answered that one.
[0:36:33] Uh
[0:36:34] What's your thoughts on developers
[0:36:36] needing to very deeply understand
[0:36:37] TypeScript now that fix the TS make no
[0:36:40] mistakes exist? I don't understand the
[0:36:42] phrasing of this,
[0:36:43] but I think I understand meaning,
[0:36:46] which is that
[0:36:48] I believe that code is very important
[0:36:50] and this is kind of going to feed
[0:36:52] through the whole session and that bad
[0:36:54] code bases make bad agents. If you have
[0:36:57] a garbage code base, you're going to get
[0:36:59] garbage out of the agent that's working
[0:37:01] in that code base. We'll talk more about
[0:37:02] that in a bit.
[0:37:03] And so, I think understanding these
[0:37:05] tools very deeply, understanding code
[0:37:07] deeply is going to make you a much much
[0:37:10] better developer and get more out of AI.
[0:37:14] Uh and that answers that question, too.
[0:37:16] Sweet.
[0:37:19] Uh
[0:37:20] Get out of there. There you are.
[0:37:24] Now that we have 1 million tokens
[0:37:25] available, do we ever actually want to
[0:37:27] take advantage of that?
[0:37:30] I've noticed that the dumb zone has
[0:37:31] become less dumb lately. Okay, great
[0:37:33] question. This goes back to our kind of
[0:37:35] initial idea on the dumb zone.
[0:37:41] Uh
[0:37:43] I am I recorded my Claude Code course
[0:37:46] using a 200k context window and on the
[0:37:48] day that I launched the course they
[0:37:50] announced the 1 million context window.
[0:37:53] My take on this is that what Claude Code
[0:37:54] did is they essentially just did this.
[0:37:56] Wee!
[0:37:58] They shipped a lot more dumb zone to you
[0:38:01] essentially. Now, this is good for tasks
[0:38:03] where you want to retrieve things from a
[0:38:05] large context window. If you want to
[0:38:07] pass five copies of War and Peace or
[0:38:09] something to it and you want to find out
[0:38:11] all the things that uh
[0:38:14] uh I can't remember a character from War
[0:38:15] and Peace. Uh
[0:38:17] Why did I start with that?
[0:38:18] It's good for retrieval.
[0:38:19] It's less good for coding.
[0:38:21] So, I consider that it is about 100k at
[0:38:26] the moment is the smart zone. The smart
[0:38:28] zone will get bigger and that will be a
[0:38:31] really nice improvement.
[0:38:33] So, folks, we're going to take it like a
[0:38:34] 5-minute comfort break if that's all
[0:38:36] right just for my voice and to maybe you
[0:38:38] can have a little move around or
[0:38:39] something or grab a drink. I can just
[0:38:41] notice some sleepy eyes and I want to
[0:38:42] make sure that we're awake for the next
[0:38:44] bit if that's all right. So, we'll take
[0:38:45] 5 minutes and I will see you back here
[0:38:49] then. All right?
[0:38:51] So, we have
[0:38:53] our PRD
[0:38:55] which I'm not going to read, our kind of
[0:38:56] destination document. Let's quickly scan
[0:38:58] for any good questions before we zoom
[0:39:00] ahead.
[0:39:02] And
[0:39:05] Rediscovering the role of software
[0:39:06] engineering today's world, top three
[0:39:08] disciplines you recommend.
[0:39:10] Um
[0:39:11] Taekwondo is good, I've heard. I've no
[0:39:13] I've no idea how to answer this
[0:39:14] question. Um
[0:39:16] thank you for asking it though. Um Top
[0:39:18] three disciplines I recommend.
[0:39:20] I mean
[0:39:21] Sorry? Plumbing. Plumbing is a good one.
[0:39:23] Yeah, yeah, yeah. I don't know if that's
[0:39:25] a discipline. I the plumbers I've hired
[0:39:26] are not usually very disciplined.
[0:39:28] Um
[0:39:30] Right.
[0:39:32] So, okay. We now have our destination,
[0:39:34] okay? Um
[0:39:37] Perfect.
[0:39:38] So, how do we actually get to our
[0:39:40] destination? How do we We have a sort of
[0:39:42] vague PRD? How do we split it so that we
[0:39:46] don't put things into the dumb zone?
[0:39:48] In other words, we have our number four,
[0:39:50] how do we split it into this kind of
[0:39:52] multi-phase plan? Well, probably what
[0:39:54] you would do at this point is you would
[0:39:55] say, "Okay, Claude, give me a
[0:39:57] multi-phase plan that gets me to this
[0:39:59] destination, right?" That sort of makes
[0:40:00] sense. This is what we've been doing
[0:40:01] before.
[0:40:03] But I have um
[0:40:04] a sort of better way of doing it now,
[0:40:05] which is that
[0:40:08] I like
[0:40:10] creating a Kanban board out of this.
[0:40:13] Raise your hand if you don't know what a
[0:40:15] Kanban board is.
[0:40:17] Mm, cool. Okay. A Kanban board is
[0:40:19] essentially just a set of tickets that
[0:40:21] you put on the wall that have blocking
[0:40:23] relationships to each other. So, we're
[0:40:25] going to see what it kind of looks like
[0:40:26] here. This is how we've worked um
[0:40:29] as developers for a long time, really
[0:40:31] since Agile came around. And what it
[0:40:34] does, we can see it here,
[0:40:36] it has proposed that we split this setup
[0:40:39] into
[0:40:41] um five different tasks here.
[0:40:43] We have the first one, which is the
[0:40:44] schema and the gamification service.
[0:40:47] Yeah, well, that looks pretty good. This
[0:40:48] is blocked by nothing.
[0:40:50] And we can even see here that it's a
[0:40:52] it's given it a type of AFK, too. You
[0:40:54] remember I talked about human in the
[0:40:55] loop and AFK earlier? This is an AFK
[0:40:57] task. This is something we can just pass
[0:40:59] off to an agent to do its thing.
[0:41:01] Streak tracking, okay, that looks good.
[0:41:04] Uh
[0:41:05] then wire points and streaks into
[0:41:07] lessons quiz completion. This is blocked
[0:41:08] by one and two.
[0:41:10] Retroactive backfill. This is blocked
[0:41:11] only by one.
[0:41:13] And then this one here is blocked by all
[0:41:15] of the tasks. Cool.
[0:41:19] Hmm.
[0:41:20] Now, I consider this you could say, "Why
[0:41:23] don't we just make this sort of
[0:41:24] generation of the issues, why don't we
[0:41:26] just hand that over to the AI? Why do I
[0:41:28] need to be involved here, right?" Cuz
[0:41:30] it's given us quite a good selection of
[0:41:31] tools here. Why do I need to review this
[0:41:34] and sort of
[0:41:35] figure out what's next?
[0:41:37] Now, my take here is that this is really
[0:41:39] cheap to do, like very quick to do once
[0:41:42] I've done the PR, and I can immediately
[0:41:43] see some issues here.
[0:41:47] There's a really, really important
[0:41:49] technique when you're kind of figuring
[0:41:51] out what the shape of this journey
[0:41:53] should look like.
[0:41:55] And
[0:41:57] it sort of comes to this very classic
[0:42:00] idea, uh which comes from the Pragmatic
[0:42:02] Programmer called traceable bullets or
[0:42:04] vertical slices.
[0:42:07] And traceable bullets really transformed
[0:42:09] the way I think about actually
[0:42:11] getting AI to pick its own tasks.
[0:42:14] Systems have layers, right?
[0:42:17] There are layers in your system.
[0:42:19] These might be different deployable
[0:42:20] units. You might have a database that
[0:42:22] lives somewhere. You might have an API
[0:42:23] that lives maybe close to the database
[0:42:25] but in a separate bit. You might have a
[0:42:27] front end that lives somewhere totally
[0:42:28] different like a CDN.
[0:42:30] Or within these deployable units, you
[0:42:32] might have different layers within
[0:42:34] those. In for instance, the code base
[0:42:36] that we're working in, we have a ton of
[0:42:38] different services. Service. We have a
[0:42:41] quiz service, a team service, a user
[0:42:43] service, coupon service, core service.
[0:42:45] And these services have dependencies on
[0:42:47] each other. So, they're kind of like
[0:42:48] individual layers.
[0:42:50] Well,
[0:42:51] what I noticed is that AI loves to code
[0:42:55] horizontally.
[0:42:57] So, it loves to code layer by layer.
[0:43:00] So, in other words, in phase one, it
[0:43:01] will do all of the database stuff, all
[0:43:03] of the schema, all of the you know, all
[0:43:05] the stuff related to that unit. Then it
[0:43:08] will go into phase two and do all of the
[0:43:10] API stuff. Then it will add the front
[0:43:12] end on top of that.
[0:43:14] Does Can anyone tell me what's wrong
[0:43:16] with that picture? Why is that not a
[0:43:18] good thing to do? Raise your hand if you
[0:43:20] have an answer.
[0:43:21] Yeah.
[0:43:21] >> have that whole feedback loop.
[0:43:23] Exactly. You don't get feedback on your
[0:43:26] work until you've
[0:43:28] really started or completed phase three.
[0:43:32] So,
[0:43:33] what you really need to do is you you're
[0:43:34] not until you get to phase three, you're
[0:43:36] not actually testing that all the layers
[0:43:38] work together.
[0:43:41] You haven't got an integrated system
[0:43:42] that you can test against.
[0:43:44] And so,
[0:43:45] instead you need to think about vertical
[0:43:47] layers. You need to think about thin
[0:43:49] slices of functionality that cross all
[0:43:52] of the layers that you need to.
[0:43:54] And this is a much better way to work,
[0:43:57] much better way for the AI to work, too,
[0:43:59] because it means at the end of phase one
[0:44:00] or during phase one it can get feedback
[0:44:02] on its entire flow.
[0:44:04] So, what this means to me
[0:44:07] is inside the PRD to issues skill up
[0:44:11] here,
[0:44:12] I have got break a PRD into
[0:44:15] independently grabbable issues using
[0:44:17] vertical slices traceable bullets
[0:44:18] written as local markdown files.
[0:44:19] [snorts]
[0:44:21] We first locate the PRD.
[0:44:23] Uh again, explore the code base if this
[0:44:25] is a fresh session. We draft vertical
[0:44:27] slices.
[0:44:28] So, we break the PRD into traceable
[0:44:30] issues. A traceable bullet, by the way,
[0:44:32] is uh
[0:44:34] essentially when you're like an
[0:44:35] anti-aircraft gunner. It's quite a
[0:44:37] violent idea, actually. Uh
[0:44:39] and you're looking up in the sky and
[0:44:40] it's night. If you're just shooting
[0:44:42] normal bullets, you have no idea what
[0:44:44] you're firing at, right? You could just
[0:44:45] be you know, you you see the plane but
[0:44:47] you don't see where your bullets are
[0:44:48] going.
[0:44:48] Traceable bullets is they attach a tiny
[0:44:50] bit of phosphorescence or phosphor or
[0:44:52] something to make it glow as it goes.
[0:44:55] So, this means that every sixth bullet
[0:44:57] or something you actually see a line in
[0:44:58] the sky. So, you have feedback on where
[0:45:01] you're aiming. So, this is what this is
[0:45:03] the idea here is that we increase our
[0:45:05] level of feedback and we get near
[0:45:07] instant feedback on what we're building.
[0:45:09] Cuz without that the AI is kind of
[0:45:11] coding blind until it reaches the later
[0:45:12] phases.
[0:45:14] We got some vertical slice rules. We
[0:45:15] quiz the user.
[0:45:17] And then we create the issue files. So,
[0:45:20] what I see here
[0:45:21] is that even though
[0:45:23] I've I've told it to do vertical slices,
[0:45:26] it's proposing to
[0:45:29] create the gamification service
[0:45:32] first on its own. That's just one slice
[0:45:34] there. And that to me feels like a
[0:45:36] horizontal slice. What I want to see in
[0:45:38] the first vertical slice especially is I
[0:45:40] want to see the schema changes or some
[0:45:42] schema changes. I want to see some new
[0:45:45] service being created and I want a
[0:45:46] minimal representation of that on the
[0:45:48] front end. So, I want it to go through
[0:45:50] the vertical slices, not just the
[0:45:52] horizontal. Does that make sense?
[0:45:54] Okay. So, I'm going to give the AI
[0:45:57] a rollicking.
[0:45:58] Uh bad boy. No, I'm not.
[0:46:01] I'm not going to waste tokens just being
[0:46:04] just naming. Um
[0:46:06] So, the first slice is too horizontal.
[0:46:10] I'll just start with that and see if it
[0:46:11] picks it up.
[0:46:12] Does that make sense as a concept?
[0:46:14] And I think having that um
[0:46:17] what I really like about going back to
[0:46:18] those old books is that we're really
[0:46:21] trying to in this day and age like get
[0:46:24] uh
[0:46:25] verbalize best software practices in
[0:46:27] English.
[0:46:29] And these books, 20-year-old books, have
[0:46:31] already done that. And it's an absolute
[0:46:33] gold mine if you want to throw that into
[0:46:34] prompts. But even with that, it's not
[0:46:36] going to um not going to do a perfect
[0:46:38] job each time.
[0:46:39] So,
[0:46:40] award points for lesson completion
[0:46:42] visible on dashboard. Yes, that's a
[0:46:44] beautiful vertical slice because it's
[0:46:47] definitely a big chunk of stuff. It's
[0:46:48] doing a lot of stories there, but we're
[0:46:51] going to see something visible at the
[0:46:52] end and the AI will then just be able to
[0:46:54] add to that. You see why that's
[0:46:56] preferable to the first one. Cool.
[0:46:58] Uh looks great.
[0:47:01] So, we're getting closer now. Anyone
[0:47:03] following at home as well, you know, not
[0:47:05] at home but you get the idea.
[0:47:06] Um will hopefully see the same thing,
[0:47:09] too, and start developing the same
[0:47:10] instincts.
[0:47:11] Let's open up for questions just while
[0:47:13] I'm still creating these GitHub issues.
[0:47:16] Uh ba ba ba ba Oh, not GitHub issues. Uh
[0:47:18] local issues.
[0:47:20] When will I stop using Windows? Never.
[0:47:22] What is your Okay, we'll get to that
[0:47:24] later.
[0:47:25] How does AI um decide when to stop
[0:47:27] grilling? Cuz AI can ask incessantly,
[0:47:30] can we have a smarter way to decide the
[0:47:31] stop point? Yeah, it does tend to really
[0:47:34] um
[0:47:34] those grilling sessions can be super
[0:47:35] intense. And the thing about these
[0:47:37] skills is you can tune them if you want
[0:47:39] to. If you feel like the AI is just
[0:47:41] absolutely hammering you, hammering you,
[0:47:42] hammering you, then you can just
[0:47:44] tell it to just pull back a little bit
[0:47:46] or get it to do, you know, stop points
[0:47:48] and that kind of thing. So, if that's a
[0:47:49] failure mode that you run into a lot,
[0:47:51] then you just, you know, change the
[0:47:52] skill.
[0:47:55] Uh do I still use uh be extremely
[0:47:57] concise, sacrifice grammar for the sake
[0:47:58] of concision? Um there was a tip that I
[0:48:00] gave folks um
[0:48:03] 5 months ago, which is that
[0:48:05] to basically increase the readability of
[0:48:07] your plans. So, when you're using plan
[0:48:09] mode,
[0:48:10] then you can put it in your Claude.md
[0:48:13] and you can say, "Okay, yeah, approve
[0:48:15] that."
[0:48:17] Let's open up Claude.md.
[0:48:21] Uh do I have a Claude.md? Maybe I don't.
[0:48:23] I I really don't use Claude.md very
[0:48:24] much. I'm just going to put a dummy
[0:48:26] inside here.
[0:48:28] Um when
[0:48:30] No.
[0:48:31] When talking to me,
[0:48:33] uh sacrifice grammar for the sake of
[0:48:34] concision.
[0:48:40] And this um prompt was uh really useful
[0:48:43] to me when I was reading the plans
[0:48:45] because it meant that the plans would
[0:48:46] come out and they would be very concise,
[0:48:48] really nice, easy to read, often very
[0:48:50] concise. But I've
[0:48:53] since dropped this idea in preference to
[0:48:56] a grilling session because what I
[0:48:57] noticed with it just I didn't want to
[0:48:59] read the plans. I wanted to get on the
[0:49:01] same wavelength as the LLM. I wanted it
[0:49:03] to ask aggressive questions to me. And
[0:49:04] when I stopped reading the plans, I
[0:49:06] stopped needing them to be concise.
[0:49:08] So, I think of the plans really in the
[0:49:09] destination document as uh the end
[0:49:12] state. And I don't need that end state
[0:49:13] to be concise.
[0:49:15] Hopefully that answers your question.
[0:49:19] Uh
[0:49:20] What do I think will be the outcome of
[0:49:22] the Mexican standoff of future roles of
[0:49:23] PMs and other roles converging? Uh I've
[0:49:25] no idea. I'm not a pundit. I've no idea.
[0:49:29] Uh okay.
[0:49:31] So, we should
[0:49:33] uh after a couple of approvals,
[0:49:37] uh end up with a set of issues.
[0:49:39] Now,
[0:49:40] these issues that we're creating,
[0:49:42] they're designed to be independently
[0:49:44] grabbable,
[0:49:45] which means that this Kanban board ends
[0:49:48] up looking kind of like this.
[0:49:51] Where you have
[0:49:53] essentially a set of tickets with a
[0:49:55] whole load of independent relationships.
[0:49:57] So, this one needs to be done before
[0:49:58] this one. This one needs to be done
[0:50:00] before this one.
[0:50:01] And this one, let's say we got another
[0:50:03] one over here.
[0:50:05] This one needs to be done before this
[0:50:05] one.
[0:50:06] This means that you can start to
[0:50:09] parallelize.
[0:50:10] You can start to get agents working at
[0:50:13] the same time on these tasks. Because
[0:50:15] yeah, this one needs to be done first.
[0:50:18] And then
[0:50:19] these two
[0:50:21] can be grabbed at the same time by
[0:50:24] independent agents.
[0:50:26] Raise your hand if you've done any kind
[0:50:27] of parallelization work with agents.
[0:50:30] Okay, cool. So, this allows you
[0:50:33] um to turn those plans into to optimally
[0:50:35] kind of like into a directed acyclic
[0:50:38] graphs essentially, where you just are
[0:50:40] able to um
[0:50:42] essentially have three phases here.
[0:50:45] Where you have
[0:50:46] phase one.
[0:50:48] Uh let me grab move that.
[0:50:51] Uh
[0:50:52] above this line here,
[0:50:55] you do this one.
[0:50:56] Then phase two, you do the two below it.
[0:50:58] And then phase three, you do this third
[0:51:00] one and add it onto that.
[0:51:02] And when you think about there could be
[0:51:04] This could This is a relatively simple
[0:51:06] plan, but you could have many different
[0:51:08] plans operating all at once. It means
[0:51:10] that you can do really nice
[0:51:11] parallelization. And we'll talk more
[0:51:12] about that in a bit. But that's why I
[0:51:14] prefer a Kanban board set up like this
[0:51:18] to a sequential plan. Because a
[0:51:20] sequential plan can really only be
[0:51:21] picked up by one agent.
[0:51:24] So, this
[0:51:26] Where did it go? Over here.
[0:51:29] Yeah, this plan here
[0:51:31] This is really only one loop, right?
[0:51:33] Only one agent can work on these because
[0:51:36] we have numbered phases and they're not
[0:51:38] parallelizable. Does that make sense?
[0:51:40] Cool.
[0:51:42] So, we've got our issues. Ah, come on.
[0:51:44] Stop asking me for I know it's creating
[0:51:46] them on GitHub. I really don't want
[0:51:47] that.
[0:51:49] Oh, no.
[0:51:51] You fool.
[0:51:53] Create them in issues instead.
[0:51:57] No.
[0:51:58] That's not precise enough.
[0:52:00] Uh you fool.
[0:52:01] Create them in local markdown files
[0:52:05] instead, referencing the local version.
[0:52:11] Sorry about this.
[0:52:15] So, once we get to this point,
[0:52:17] we [clears throat] have a bunch of
[0:52:18] issues locally
[0:52:20] that we can start um looping over and
[0:52:24] implementing. And it's at this point
[0:52:26] that the human leaves the loop.
[0:52:28] So, so far
[0:52:31] Let me pull up a a proper overview of
[0:52:33] this kind of flow that we're exploring
[0:52:35] here.
[0:52:37] So far
[0:52:40] we have taken an idea.
[0:52:43] I'll zoom this in a bit for the folks at
[0:52:44] the back.
[0:52:46] And we've grilled ourselves about the
[0:52:49] idea.
[0:52:51] We can skip over research and prototype,
[0:52:52] but we turn that into a PRD, into a
[0:52:54] destination document.
[0:52:56] We then turn that PRD into a Kanban
[0:52:59] board. And all of those steps
[0:53:01] are human reviewed.
[0:53:03] And now
[0:53:05] the implementation stage, we step back.
[0:53:08] And we let an agent um work through that
[0:53:10] Kanban board or multiple agents work
[0:53:12] through the Kanban board.
[0:53:15] Now, what this means is that yeah, we
[0:53:17] spent a lot of time planning here, but
[0:53:19] it means that we've queued up a lot of
[0:53:20] work for the agent. We can think of this
[0:53:23] as kind of like the day shift and the
[0:53:24] night shift. This is the day shift for
[0:53:26] the human, right? Planning everything,
[0:53:28] getting all the all the stuff ready. And
[0:53:30] then once we kick it over to the night
[0:53:32] shift, the AI can just work AFK. But
[0:53:35] what does that look like?
[0:53:37] Well,
[0:53:39] so I'm just going to Oh, yeah. Just
[0:53:40] allow it. It's perfect.
[0:53:42] So, this looks like
[0:53:44] if we head to the next exercise,
[0:53:47] which is
[0:53:51] uh in fact, the last exercise here,
[0:53:52] running your AFK agent.
[0:53:55] Now,
[0:53:57] I've called this uh Ralph really cuz it
[0:53:59] is a it is essentially a Ralph loop.
[0:54:02] And this prompt here, I want to walk
[0:54:04] through this really closely.
[0:54:06] The first thing it's doing here is we're
[0:54:08] essentially going to run Claude
[0:54:10] and we're going to basically try to
[0:54:11] encourage it to work um
[0:54:14] completely AFK.
[0:54:16] I'll show you what the sort of script
[0:54:17] for this looks like in a minute.
[0:54:19] But you say, "Okay, local issue files
[0:54:21] from issues are provided at the start of
[0:54:22] context."
[0:54:24] The way we do that is if you look inside
[0:54:26] once.sh here inside the repo,
[0:54:29] we have
[0:54:31] uh it's essentially just a bash script,
[0:54:34] where we grab all of the issues,
[0:54:36] um [clears throat] which are inside
[0:54:38] markdown files, and we cat them into a
[0:54:40] local variable. So, that issues variable
[0:54:42] contains all of the issues that are in
[0:54:45] our entire backlog.
[0:54:47] Then we grab the last five commits. I'll
[0:54:50] explain why in a minute.
[0:54:52] And then we grab the prompt and we just
[0:54:54] run Claude code with permission mode
[0:54:56] accept edits.
[0:54:57] And then just essentially just pass it
[0:55:00] all of the information.
[0:55:02] This is what the implementer looks like.
[0:55:04] So, that's what a very very simple
[0:55:05] version of this sort of loop looks like.
[0:55:08] And of course, this is not a loop. This
[0:55:09] is just running it once.
[0:55:12] The loop
[0:55:13] is in the AFK version up here,
[0:55:15] which is uh a fair bit more complicated.
[0:55:18] And the crucial part here is we're
[0:55:20] running it in Docker sandbox as well.
[0:55:22] So, I I don't want you to install Docker
[0:55:25] on your laptops because we're just going
[0:55:26] to be like, "You need to download a
[0:55:28] special image and we're going to tank
[0:55:29] the conference Wi-Fi if we do that." So,
[0:55:31] I'm I am going to demo this to you, but
[0:55:33] you um
[0:55:34] won't need to run this yourself, but
[0:55:35] I'll talk through this in a minute. But
[0:55:37] essentially, this once loop here,
[0:55:41] and ba ba ba ba boom.
[0:55:44] We're just essentially running one
[0:55:46] version of the thing that we're going to
[0:55:48] loop again and again and again. So, this
[0:55:50] is kind of like the human in the loop
[0:55:51] version. And this is essential. Running
[0:55:54] this again and again is essential
[0:55:55] because you're going to see what the
[0:55:56] agent does and see how it ends up
[0:55:58] working. And any tuning that you need to
[0:56:01] add to the prompt, then you can do that.
[0:56:03] Let's go to the prompt.
[0:56:06] Um
[0:56:09] So, local issue files are being passed
[0:56:11] in.
[0:56:12] You're going to work on the AFK issues
[0:56:13] only. That makes sense.
[0:56:15] If all AFK tasks are complete, output
[0:56:17] this no more tasks thing.
[0:56:19] And then the next thing, pick the next
[0:56:21] task.
[0:56:23] So,
[0:56:26] what we're doing here is we're
[0:56:27] essentially running a backlog or
[0:56:30] curating a backlog that our AFK agent is
[0:56:32] going to pick up. That's the purpose of
[0:56:34] all of these um setups in the beginning.
[0:56:38] In this uh
[0:56:39] all the way to this Kanban board here,
[0:56:41] we're just essentially creating a
[0:56:43] backlog of tasks for the night shift to
[0:56:45] pick up.
[0:56:46] And the night shift, this sort of Ralph
[0:56:49] prompt here, it's got its own idea about
[0:56:52] what a good task looks like to next pick
[0:56:54] up.
[0:56:56] I'm I did talk about parallelization. I
[0:56:58] will show you this later, but this is
[0:56:59] essentially a sequential loop here.
[0:57:01] We're just going to run one coding agent
[0:57:03] at a time. This is a good way to just
[0:57:04] sort of um get your feet wet
[0:57:06] essentially.
[0:57:08] So, it's prioritizing critical bug
[0:57:10] fixes, development infrastructure, then
[0:57:12] trace bullets,
[0:57:14] then polishing quick wins and refactors.
[0:57:17] And then we just have a very simple kind
[0:57:19] of instruction on how to complete the
[0:57:20] task.
[0:57:21] So, we explore the repo.
[0:57:23] Use TDD to complete the task. I'll get
[0:57:25] to that later.
[0:57:27] And
[0:57:28] we then run some feedback loops. So,
[0:57:30] let's let's just try this and let's just
[0:57:31] see what happens.
[0:57:33] So, good. It's created the issue files.
[0:57:34] We should be good to go. I'm going to
[0:57:36] cancel out of this.
[0:57:38] I'll clear and I'm going to run
[0:57:40] uh
[0:57:41] Where is it? Ralph
[0:57:43] once.sh. And you can feel free if you're
[0:57:45] following along to do the same thing.
[0:57:48] So, we can see it's just running Claude
[0:57:50] inside here
[0:57:51] with the prompt and with all of the
[0:57:53] issues that have been passed in.
[0:57:56] And while it's doing its thing,
[0:57:59] you probably have some questions about
[0:58:01] this setup and about the decisions that
[0:58:03] I've made to essentially
[0:58:05] delegate all of my coding to AI, right?
[0:58:08] So, let's let's do a quick Q&A while
[0:58:10] it's getting its feet under it.
[0:58:14] Uh okay. Ba ba ba ba ba.
[0:58:17] I'm going to just
[0:58:19] remove those.
[0:58:23] How do you retain negative decisions,
[0:58:25] things that you decided against, and
[0:58:26] rationales when persisting the results
[0:58:28] from the grill me session? Uh great
[0:58:30] question.
[0:58:31] There's a very simple answer, which is
[0:58:33] the in the PRD uh write a PRD section,
[0:58:37] there is a stuff at the bottom, a
[0:58:39] section of the things that are out of
[0:58:40] scope. So, the things we're not going to
[0:58:42] tackle in this PRD, which is very
[0:58:44] important for giving a definition of
[0:58:45] done.
[0:58:47] Feel free to ping on the Slido if you've
[0:58:48] got any more questions.
[0:58:51] Uh what's my front end workflow? Okay,
[0:58:53] it's a great question. I'm going to I'm
[0:58:55] going to answer that in a minute, I
[0:58:56] think.
[0:58:58] How to deal with agents producing more
[0:59:00] code that we can review? How to properly
[0:59:02] parallelize and use multiple agents
[0:59:05] separate way. Okay, that's That's two
[0:59:06] questions there.
[0:59:08] Um
[0:59:09] Raise your hand
[0:59:10] if you feel like you're doing more code
[0:59:12] review now than you used to.
[0:59:16] Yeah, definitely.
[0:59:18] Um
[0:59:18] I don't think there's a way to avoid
[0:59:20] this.
[0:59:22] If we delegate all of our coding to
[0:59:25] agents,
[0:59:27] you notice that the implementation here
[0:59:29] is really the only AFK bit. We then also
[0:59:32] need to QA the work and code review the
[0:59:34] work, right?
[0:59:36] And if we are
[0:59:38] running these loops where it's
[0:59:39] essentially going to implement four
[0:59:40] issues in one,
[0:59:42] it's hard to pair that with the dictum
[0:59:45] that you should keep pull requests small
[0:59:47] and self-contained, right? Like small
[0:59:49] self-contained pull requests means
[0:59:52] you're needing to do fewer loops or
[0:59:55] shorter loops or something.
[0:59:57] Or maybe you do like a big stack of PRs,
[0:59:58] but that seems horrible as well. That's
[1:00:00] still just more separated code to
[1:00:02] review. I don't honestly know what the
[1:00:04] answer to this yet.
[1:00:06] I think we just need to be ready to be
[1:00:07] doing more code review, essentially.
[1:00:10] Which is not fun. That's not fun thing
[1:00:11] to say. That's not like I don't know. I
[1:00:13] don't feel good saying that, but I do
[1:00:15] think it's probably the
[1:00:17] the way things are going.
[1:00:18] It's a great question.
[1:00:21] Uh
[1:00:23] Can we grab a couple of questions from
[1:00:25] the room as well? Let's not We won't do
[1:00:27] the mic, but uh raise your hand if
[1:00:28] you've got a question for me
[1:00:29] immediately.
[1:00:31] Yeah.
[1:00:32] So, the approach is very linear from an
[1:00:34] idea to uh QA code review. Of course,
[1:00:38] the real world is a lot more messy. So,
[1:00:40] you have all these ideas that are in
[1:00:42] parallel and
[1:00:43] nobody has the full picture. And
[1:00:46] uh while you're working on something,
[1:00:47] something else comes in as
[1:00:49] a bug. Yeah. How do you deal with the
[1:00:50] messiness? How do you tighten that
[1:00:52] feedback loop? Great question. So, the
[1:00:54] question was
[1:00:55] if this all looks great if you're a solo
[1:00:57] developer, but actually how do you
[1:00:58] implement this in a team? How do you
[1:01:00] gather team feedback on this?
[1:01:02] And my answer to that is that if you
[1:01:04] have an idea up there
[1:01:06] and
[1:01:07] essentially the sort of journey from the
[1:01:10] idea to the destination
[1:01:12] is something you need to figure out with
[1:01:13] the team, right? So, all of this stuff
[1:01:16] up here, this is kind of like team
[1:01:17] stuff, you know what I mean? This So, if
[1:01:20] you have an idea and you do a grilling
[1:01:22] session on it and you have a question
[1:01:23] that you don't know how to answer, then
[1:01:25] you need to loop in your team as we
[1:01:27] described before. Then you might need to
[1:01:29] go, "Okay, like we just need to build a
[1:01:30] prototype of this. We need to actually
[1:01:32] hash this out. We need something that
[1:01:33] the domain experts can fiddle with."
[1:01:36] Or okay, we might need to integrate a a
[1:01:38] third-party library into this. We might
[1:01:39] need to do some research. We might need
[1:01:41] to actually kind of like um
[1:01:44] ping this back and forth and find a
[1:01:45] third-party service that we can get the
[1:01:46] most out of. We might need to go back
[1:01:49] with the information that we gathered
[1:01:50] there to the idea phase. So, all the way
[1:01:53] up to the sort of PRD in the journey,
[1:01:55] that's something you need to involve
[1:01:56] your team with. That's something where
[1:01:58] these assets are going to be shared over
[1:02:01] and you're going to have requests for
[1:02:02] comments on them and that that loop is
[1:02:05] going to just keep grinding and grinding
[1:02:07] until you figure out where you're going.
[1:02:09] Once you figure out where you're going,
[1:02:11] then you can start doing the Kanban
[1:02:12] board implementation. But this is
[1:02:14] essentially super arguable and the
[1:02:16] you'll be bouncing back and forth
[1:02:17] between the phases. Does that make
[1:02:18] sense? Yeah.
[1:02:20] Would you not need a
[1:02:21] PRD for your prototype?
[1:02:23] Say again, sorry. Would you not want to
[1:02:24] have a PRD for your prototype? The
[1:02:26] question was, do you want to go through
[1:02:27] this whole session just to sort of
[1:02:29] create a prototype? You don't need a PRD
[1:02:31] for your prototype as well. Let's just
[1:02:33] quickly talk about prototypes for a
[1:02:34] second.
[1:02:35] Um there was a question about how do you
[1:02:36] make this work for front end?
[1:02:39] Like how do you cuz front end is like
[1:02:41] really sensitive to human eyes. You need
[1:02:43] human eyes looking at the front end all
[1:02:45] the time to make sure that it looks
[1:02:47] good.
[1:02:48] AI doesn't really have any eyes. It can
[1:02:51] look at code,
[1:02:52] but it front end is multimodal.
[1:02:55] And so my experiences with trying to
[1:02:58] plug AI into um let's say agent browser
[1:03:02] or Playwright MCP to give it
[1:03:04] You can give it tools to allow it to
[1:03:06] look through a front end and sort of
[1:03:07] look at images, but in my experience the
[1:03:10] um it's not very good at that yet and it
[1:03:12] can't create a nice front end in a
[1:03:15] mature code base. It can sort of spit
[1:03:17] one out. But what it can do is you say,
[1:03:20] "Okay, uh I want some ideas on how uh
[1:03:22] this front end might look. Give me three
[1:03:24] prototypes um that I can click between
[1:03:27] in a throwaway uh
[1:03:29] throwaway route that I can decide which
[1:03:31] one looks best." And you take the asset
[1:03:33] of that prototype and you then feed it
[1:03:35] back into the grilling session or you
[1:03:37] get feedback on it, blah blah blah blah
[1:03:38] blah.
[1:03:39] Answer your question kind of thing?
[1:03:41] The prototype is just, you know, it's
[1:03:42] messy. It's supposed to give you
[1:03:44] feedback earlier on the process.
[1:03:46] So, that's a great way of working with
[1:03:47] front end code, great way of looking at
[1:03:48] software architecture in general. Let's
[1:03:50] go one more question here. Yes.
[1:03:52] >> [clears throat]
[1:03:52] >> In your system, how do you integrate
[1:03:54] respecting an architecture and design
[1:03:57] with API contracts and fitting with your
[1:03:59] larger system?
[1:04:01] Uh security constraints, all kinds of
[1:04:03] constraints like that.
[1:04:04] Yeah.
[1:04:05] There's a lot in that question. The
[1:04:07] question was, how do you conform with
[1:04:08] existing architecture? How do you do um
[1:04:12] how do you make it conform to the code
[1:04:13] standards
[1:04:14] like of your code base or Yeah, the
[1:04:17] architecture design APIs, Yeah. security
[1:04:19] rules that constrain your design. Yeah.
[1:04:23] I'm going to answer that in a bit.
[1:04:25] That's okay.
[1:04:26] So, hopefully we have started to get
[1:04:28] some stuff cook cooking. Uh it's just
[1:04:32] pinging on the explore phase here.
[1:04:36] Hmm, tempted to just start running it
[1:04:38] AFK.
[1:04:40] Maybe I will, maybe I won't.
[1:04:43] Um
[1:04:44] What it's essentially doing is it's
[1:04:45] exploring the repo. It's going to then
[1:04:47] start implementing based on what we
[1:04:48] wanted.
[1:04:49] Let's actually have one more question
[1:04:50] just while it's running. Yeah.
[1:04:52] Why not AI
[1:04:54] QA everything
[1:04:58] Yeah.
[1:04:59] So, the question was, why do you not get
[1:05:02] AI to QA?
[1:05:05] AI to QA.
[1:05:06] I just got uh jargon overload for a
[1:05:08] second. Um why do you not get AI to uh
[1:05:11] test its own code? Now, of course, you
[1:05:13] absolutely can. And I think while it's
[1:05:16] doing while it's cooking here,
[1:05:18] okay, it's got a clear picture of the
[1:05:19] code base. It's assessing the issues.
[1:05:22] It's doing issue 02 as the next task.
[1:05:24] I'm again going to show you that in a
[1:05:25] bit, I think. The sort of uh cuz you
[1:05:28] definitely should do an automated review
[1:05:31] step as part of implementation.
[1:05:33] So, you have your implementation, you
[1:05:35] should then, because tokens are pretty
[1:05:37] cheap and AI is actually really good at
[1:05:38] reviewing stuff, you should get it to
[1:05:40] review its own code before you then QA
[1:05:42] it.
[1:05:43] I found that that catches a ton of
[1:05:44] different bugs
[1:05:46] and
[1:05:47] the way that works is I will just do a
[1:05:50] little diagram is if you have, let's
[1:05:52] say, an implementation that sort of like
[1:05:54] used up a bunch of tokens in the smart
[1:05:56] zone,
[1:05:57] if you get it to sort of try to
[1:06:00] do its reviewing, it's going to be doing
[1:06:01] the reviewing in the dumb zone.
[1:06:05] And so, the reviewer will be dumber than
[1:06:06] the thing that actually implemented it.
[1:06:08] If we imagine this is the
[1:06:11] uh let's be consistent. That's the
[1:06:12] review.
[1:06:13] That's the implementation.
[1:06:15] Whereas if you clear the context,
[1:06:19] then
[1:06:21] you're essentially going to be able to
[1:06:22] just review in the smart zone, which is
[1:06:24] where you want to be.
[1:06:27] Let's see how our implementation is
[1:06:28] doing.
[1:06:29] Okay, good. It's generating a migration.
[1:06:31] That looks pretty nice.
[1:06:32] We're getting some code spitting out.
[1:06:37] And
[1:06:38] while I'm sort of like Aha, here we go.
[1:06:42] TDD.
[1:06:43] Let's talk about TDD and then I think
[1:06:45] we'll have a little another little
[1:06:46] break.
[1:06:48] TDD I found is absolutely essential for
[1:06:51] getting the most out of agents. Uh raise
[1:06:53] your hand if uh you know what TDD is.
[1:06:56] Cool. Okay. TDD is test-driven
[1:06:58] development. What it's essentially doing
[1:07:00] is it's doing a something called red
[1:07:03] green refactor. And if you look in the
[1:07:05] code base, you'll be able to find a um a
[1:07:07] skill which really describes how to do
[1:07:10] red green refactor and teaches the AI
[1:07:12] how to do it.
[1:07:13] So, what it's doing is it's writing a
[1:07:15] failing test first. So, it's saying,
[1:07:18] "Okay, I've broken down the idea of what
[1:07:20] I'm doing and I'm just going to write a
[1:07:22] single test that fails and then I need
[1:07:25] to make the implementation pass."
[1:07:27] I have found that
[1:07:30] first of all, this adds tests to the
[1:07:31] code base and these this tends to add
[1:07:33] good tests to the code base. And so,
[1:07:35] we've got this kind of gamification
[1:07:37] service.
[1:07:38] It looks like it's
[1:07:39] using some existing stuff to create a
[1:07:41] test database. Test fails because the
[1:07:43] module doesn't exist yet. Okay, we've
[1:07:45] confirmed red. And then it goes and
[1:07:48] hopefully runs it and it passes.
[1:07:51] I found that uh raise your hand if
[1:07:54] you've ever had AI write bad tests.
[1:07:58] Yeah.
[1:07:59] It tends to try to cheat at the tests
[1:08:01] because it's sort of doing it in layers.
[1:08:03] It will do the entire implementation and
[1:08:05] then it will do the entire test layer
[1:08:07] just below it.
[1:08:08] Uh
[1:08:09] I'm just going to say yes, you're
[1:08:10] allowed to use NPX V test.
[1:08:12] And using this technique, it generally
[1:08:15] is a lot harder to
[1:08:18] cheat because it's
[1:08:20] sort of instrumenting the code before
[1:08:22] it's then writing the code. So, I find
[1:08:24] that TDD is so so good for places where
[1:08:28] you can pull it off. In fact, it's so
[1:08:29] good that I sort of warped my whole uh
[1:08:32] technique around getting TDD to work
[1:08:34] better.
[1:08:35] I can see some dripping eyes. It is so
[1:08:37] hot in here.
[1:08:38] You can't imagine how hot it is up here.
[1:08:40] Let's take another 5-minute comfort
[1:08:41] break. Let's come back at quarter to, I
[1:08:45] think. Have a nice generous one.
[1:08:47] And we'll be back in about 6 7 minutes
[1:08:50] and I'll talk about how
[1:08:52] uh I think about modules, think about
[1:08:54] constructing a code base to make this
[1:08:55] possible.
[1:08:57] I've just been sort of fiddling with the
[1:08:58] AI here and we have ended up with some
[1:09:00] with a commit.
[1:09:02] So, we have something to test. Issue
[1:09:04] number two is complete. Here's what was
[1:09:06] done.
[1:09:07] This is kind of what it looks like when
[1:09:09] a Ralph loop completes is you end up
[1:09:10] with a little summary.
[1:09:12] Um and we have now something we can QA.
[1:09:15] Because we did the feedback loops
[1:09:17] because we did the trace bullets because
[1:09:19] we were uh said, "Okay, give us
[1:09:21] something reviewable at the end of
[1:09:22] this." We can immediately go and QA it.
[1:09:24] Now, there's nothing uh less exciting
[1:09:26] than watching someone else QA something.
[1:09:29] But, hopefully we can have a little
[1:09:30] play.
[1:09:31] Let's just check that it uh works at
[1:09:33] all.
[1:09:34] In fact, before I go there, I just want
[1:09:36] to sort of work through what just
[1:09:38] happened.
[1:09:39] Which is we see that it's created some
[1:09:42] stuff on the dashboard.
[1:09:45] And it then ran the feedback loops. So,
[1:09:47] it then ran the tests and the types.
[1:09:51] Now, TDD is obviously really important.
[1:09:53] And it's really important because these
[1:09:55] feedback loops are essential to AI,
[1:09:58] essential to get AI to produce anything
[1:10:01] reasonable.
[1:10:02] Because without this, AI is totally
[1:10:04] coding blind, right?
[1:10:06] You have to have to um
[1:10:09] If if your code base doesn't have
[1:10:10] feedback loops, you're never ever ever
[1:10:13] going to get decent AI decent output out
[1:10:15] of AI. And often what you'll find is
[1:10:18] that the quality of your feedback loops
[1:10:21] influences how good your AI can code,
[1:10:24] essentially. That is the ceiling. So, if
[1:10:26] you're getting bad outputs from your AI,
[1:10:28] you often need to increase the quality
[1:10:30] of your feedback loops.
[1:10:32] We'll talk about how to do that in a
[1:10:33] minute.
[1:10:35] Now, so it ran NPM run test, NPM run
[1:10:39] type check. It got one type error, and
[1:10:41] it needed to fix it with a nice bit of
[1:10:43] TypeScript magic. Very good. Yeah, type
[1:10:45] of level threshold number. Okay.
[1:10:48] Uh you see why I stopped teaching
[1:10:50] TypeScript cuz just AI knows everything
[1:10:51] now.
[1:10:52] Um
[1:10:54] So, and it ran the tests, and it passed,
[1:10:57] and it's looking good. So, we now end up
[1:10:58] with 284 tests in this repo. Pretty
[1:11:01] good.
[1:11:03] I I do find uh front end really hard to
[1:11:06] test here. We're essentially just
[1:11:07] testing the service. So, we've created a
[1:11:09] gamification service, if we look up
[1:11:11] here.
[1:11:13] And then we have a test for that
[1:11:14] service. You can see that the service
[1:11:16] and the test itself.
[1:11:17] Now, if I was doing code review here, I
[1:11:19] would then go to I would first go to
[1:11:21] review the tests, make sure the tests
[1:11:23] were testing reasonable things,
[1:11:25] and then go and kind of review the code
[1:11:28] itself just to make sure that it's it's
[1:11:30] not doing anything too crazy, right?
[1:11:32] The essential thing is I need to
[1:11:33] actually um look at the dashboard.
[1:11:36] I'm going to log in as a student.
[1:11:40] Oh, if it'll let me. Maybe it won't let
[1:11:42] me.
[1:11:43] Come on, son. There we go.
[1:11:45] Let's log in as Emma Wilson.
[1:11:47] Head into courses.
[1:11:49] Uh let's say I've got an introduction to
[1:11:50] TypeScript.
[1:11:52] Continue learning.
[1:11:54] Uh yes, I completed this lesson.
[1:11:57] And something went wrong. I imagine it's
[1:11:59] because I don't have
[1:12:02] Uh SQLite error. I don't have the right
[1:12:05] table. So, I need a table point events.
[1:12:08] Point events is a strange table name.
[1:12:09] I'm not sure quite what it was thinking
[1:12:10] there.
[1:12:11] Uh let's suspend. Let's run uh NPM DB
[1:12:15] migrate.
[1:12:17] Push, I think.
[1:12:19] I can't remember which one it was.
[1:12:21] But, you kind of get the idea, right? I
[1:12:23] I'm not going to subject you to uh
[1:12:24] watching me do QA because it's so dull.
[1:12:27] Um but at this point, I would
[1:12:29] essentially go back in. I would um
[1:12:31] Let me open the project back up.
[1:12:35] Uh and I would
[1:12:36] This This is a crucial moment, um and
[1:12:39] it's so important to um
[1:12:41] QA it manually here because QA Oh, dear,
[1:12:45] oh dear. What's going wrong? There we
[1:12:46] go.
[1:12:47] QA is how I then um impose my
[1:12:51] uh
[1:12:52] opinions back onto the code base, how I
[1:12:54] impose my taste.
[1:12:56] What you'll often find is that um there
[1:12:58] are teams out there who are trying to
[1:12:59] automate everything, like every part of
[1:13:02] this process. And they will tend to
[1:13:06] uh if you try to like automate the sort
[1:13:08] of creation of the idea, automate
[1:13:11] uh the QA, automate the research,
[1:13:12] automate the prototype, you end up with
[1:13:15] uh apps that I feel just lack taste
[1:13:19] and are bad.
[1:13:21] Maybe they just don't work, or they they
[1:13:23] don't even work as intended, or there's
[1:13:25] just no
[1:13:26] You need a human touch when you're
[1:13:28] building this stuff because without
[1:13:29] that, you just end up with slop.
[1:13:32] And we are not producing slop here.
[1:13:33] We're trying to produce high-quality
[1:13:34] stuff, and so that's what the QA is for.
[1:13:37] Mhm.
[1:13:39] So, I'm going to do two things in this
[1:13:41] final section.
[1:13:43] Which is I'm going to first tell you how
[1:13:45] to
[1:13:46] There's probably a question in your mind
[1:13:48] here, which is let's say I have a code
[1:13:50] base that I'm working on.
[1:13:52] And it's a bad code base. It's a code
[1:13:54] base that's like really complicated, uh
[1:13:57] that AI just never does good work in,
[1:13:59] and maybe actually most humans that go
[1:14:01] into that code base don't do good work.
[1:14:03] How what How do I improve that code
[1:14:05] base?
[1:14:06] And the second thing is I'll show you my
[1:14:07] setup for parallelization.
[1:14:10] So, let's go with um
[1:14:12] bad code first.
[1:14:14] Now,
[1:14:16] where is it? Where's the diagram? Here
[1:14:17] it is.
[1:14:19] In his book, um The Philosophy of
[1:14:21] Software Design,
[1:14:23] John Ousterhout talks about
[1:14:25] the ideal type of module.
[1:14:28] And let's imagine that you have a code
[1:14:30] base that looks like this. Each of these
[1:14:32] uh blocks here are individual files.
[1:14:35] And these files
[1:14:36] export things from them. You know, they
[1:14:38] have um things that you pull from the
[1:14:40] files that you then use in other things.
[1:14:42] And so, you might have these weird
[1:14:43] dependencies where this file over here
[1:14:45] might rely on this file, or might rely
[1:14:47] on that file, for instance.
[1:14:49] Now, if these files are small and they
[1:14:51] don't kind of ex- like
[1:14:54] export many things, then John Ousterhout
[1:14:56] would call these shallow modules,
[1:14:58] essentially. Where they're not very um
[1:15:02] They kind of look like uh this, if I No,
[1:15:05] actually no. I can't can't make a good
[1:15:06] diagram of it.
[1:15:07] They're essentially lots and lots of
[1:15:09] small chunks. Now, this is hard for the
[1:15:11] AI to navigate
[1:15:13] cuz it doesn't really understand the
[1:15:14] dependencies between everything. It
[1:15:15] can't work out where everything is. You
[1:15:17] know, it has to sort of manually track
[1:15:19] through the entire graph and go, "Okay,
[1:15:20] this relies on this. This one relies on
[1:15:22] this one. This one relies on this one."
[1:15:26] And it's then also hard to test this, as
[1:15:28] well, because where do you draw your
[1:15:29] test boundaries here?
[1:15:31] Do you test each module individually?
[1:15:35] Like just literally draw a test boundary
[1:15:36] No, don't do that.
[1:15:38] Around this one?
[1:15:40] And then maybe another test boundary
[1:15:41] around the next one, and then the next
[1:15:43] one?
[1:15:45] Or should you sort of do big groups of
[1:15:48] it? Should you say, "Okay, we're going
[1:15:49] to test all of these related modules
[1:15:51] together, and just sort of, you know,
[1:15:53] hope and pray that they work."
[1:15:57] Now,
[1:15:58] >> [sighs]
[1:15:58] >> this means that if I think that bad
[1:16:00] tests mostly look like that, where the
[1:16:04] AI essentially tries to sort of wrap
[1:16:06] every tiny function in its own test
[1:16:08] boundary, and then just sort of test
[1:16:10] that those individually work. But, what
[1:16:12] that does is it means that when, let's
[1:16:15] say, this module over here calls those
[1:16:17] two,
[1:16:19] so it depends on both of these, then
[1:16:21] this module might miss order the
[1:16:23] functions, or there might be sort of
[1:16:24] stuff inside that poor module that's
[1:16:27] worth testing on its own. And if you
[1:16:29] then wrap this in a test boundary, what
[1:16:31] do you do? Do you mock the other two
[1:16:32] modules? How does that work?
[1:16:36] So, actually figuring out how to um
[1:16:40] build a code base that is easy to test
[1:16:43] is essential here. Because if our code
[1:16:46] base is easy to test, then our code our
[1:16:48] feedback loops are going to be better,
[1:16:50] and the AI is going to do better work in
[1:16:52] our code base. Does that make sense?
[1:16:54] So, what does a good code base looks
[1:16:55] like look like?
[1:16:57] Well, not like that.
[1:17:00] It looks like this.
[1:17:02] Where you have
[1:17:05] what John Ousterhout calls deep modules.
[1:17:07] Modules that have a little interface on
[1:17:09] there that expose a small, simple
[1:17:11] interface that have a lot of
[1:17:13] functionality inside them.
[1:17:16] Now,
[1:17:18] what this means is that these are easy
[1:17:20] to test cuz you just Let's say that
[1:17:22] there's a dependency between this one
[1:17:23] and this one.
[1:17:25] My arrow working? Yeah, there we go.
[1:17:28] Then,
[1:17:30] what you do is you just wrap a big test
[1:17:32] boundary around that one module, around
[1:17:34] this one up here,
[1:17:35] and you're going to catch a lot of good
[1:17:37] stuff.
[1:17:40] Because there's lots of functionality
[1:17:41] that you're testing, and really the
[1:17:43] caller, the person calling the module,
[1:17:45] is going to have a simple interface to
[1:17:47] work from. So, it's not not too tricky.
[1:17:50] That makes sense? Deep modules versus
[1:17:51] shallow modules. This is good.
[1:17:54] This shallow version is bad. And what I
[1:17:56] find is that unaided
[1:17:59] um or if you don't
[1:18:02] uh
[1:18:04] if you don't watch AI carefully, it's
[1:18:05] going to produce a code base that looks
[1:18:07] like this.
[1:18:08] So, you need to be really, really
[1:18:09] careful when you're directing it.
[1:18:11] And that's why, too,
[1:18:13] is that if we look inside the PRD,
[1:18:16] uh where is the PRD gone? It's inside
[1:18:18] the issues. It's inside the gamification
[1:18:20] system.
[1:18:21] Uh not found. Of course, it's not. Here
[1:18:23] it is.
[1:18:25] Then I have
[1:18:27] uh inside here
[1:18:29] data model the modules.
[1:18:31] So, it's specifically saying, "Okay,
[1:18:33] this gamification service is a new deep
[1:18:36] module, which we're going to test
[1:18:37] around.
[1:18:38] It's going to have this particular
[1:18:40] interface.
[1:18:42] And it's going to have um Okay, we're
[1:18:44] modifying the progress service, too.
[1:18:46] We're modifying the lesson route. We're
[1:18:47] modifying the dashboard route, etc. So,
[1:18:50] it's I'm being really specific about the
[1:18:51] modules that I'm editing, and I'm making
[1:18:53] sure that I keep that module map in my
[1:18:56] mind at all times, throughout the
[1:18:57] planning, and then throughout the
[1:18:59] implementation. Does that make sense?
[1:19:01] Very, very useful.
[1:19:03] It's useful for one other reason, too.
[1:19:04] Not only does it make your app more
[1:19:05] testable,
[1:19:07] but you get to do a little mental trick.
[1:19:11] And I'm going to refill my water while
[1:19:13] you wait for what that is.
[1:19:17] Uh let me
[1:19:20] Let me get a question from you guys. So,
[1:19:21] raise your hands if you feel like
[1:19:26] Uh if you feel like you're working
[1:19:28] harder than ever before with AI.
[1:19:32] Yeah.
[1:19:33] Uh raise your hands if you feel like you
[1:19:36] know your code base less well
[1:19:38] than you used to.
[1:19:40] Yeah.
[1:19:43] This is a real thing. Um
[1:19:45] because we're moving fast, because we're
[1:19:46] delegating more things, we end up losing
[1:19:49] a sense of our code base. And if we lose
[1:19:52] the sense of our code base, we're not
[1:19:54] going to be able to improve it, and
[1:19:56] we're essentially delegating the shape
[1:19:57] of it to AI.
[1:19:59] I [snorts] don't think that's good. But
[1:20:00] then how do we
[1:20:03] how do we make it so that we can move
[1:20:04] fast while still keeping enough space in
[1:20:06] our brains?
[1:20:08] I think that this is a way to do it.
[1:20:10] Because what you're doing here is not
[1:20:12] only are you thinking about creating big
[1:20:15] shapes in your code base, big services.
[1:20:19] What I think you should do is
[1:20:21] design the interface for these modules,
[1:20:24] but then delegate the implementation.
[1:20:27] In other words, these modules can become
[1:20:28] like gray boxes, where you just need to
[1:20:31] know the shape of them, you need to know
[1:20:33] what they do, and it's sort of how they
[1:20:34] behave, but you can delegate the
[1:20:36] implementation of those modules. I found
[1:20:38] this is really nice. I don't necessarily
[1:20:40] need to code review everything inside
[1:20:42] that module. I don't necessarily need to
[1:20:43] know everything of what it's doing. I
[1:20:45] just need to know that it behaves a
[1:20:47] certain way under certain conditions,
[1:20:49] and that it does its thing. So, it's
[1:20:50] kind of like
[1:20:52] okay, I've got a big overview of my code
[1:20:54] base, and I understand kind of the
[1:20:55] shapes inside it, understand what the
[1:20:57] interfaces all do, but
[1:20:59] I can delegate what's inside.
[1:21:01] I found that has been a really nice way
[1:21:03] to retain my sense of the code base
[1:21:06] while preserving my sanity.
[1:21:08] Make sense?
[1:21:12] And so, you might ask, how do I take a
[1:21:14] code base
[1:21:16] that looks like this
[1:21:17] and then turn it into a code base that
[1:21:19] looks like this? How do I deepen the
[1:21:21] modules?
[1:21:23] Well, we have Hopefully, it's in here.
[1:21:25] Pretty sure it is. We have a skill.
[1:21:28] And that skill is called improve code
[1:21:30] base architecture.
[1:21:32] Nice and direct.
[1:21:35] Uh let's run it.
[1:21:37] What this skill is going to do is it's
[1:21:38] essentially just going to do it a scan
[1:21:40] of our code base and looking for what's
[1:21:42] available here. And feel free to run
[1:21:43] this yourself if you're um
[1:21:45] uh
[1:21:46] running the exercises.
[1:21:48] And it's exploring the architecture,
[1:21:50] exploring um
[1:21:51] essentially how to work within this code
[1:21:53] base, and it's going to attempt to
[1:21:57] uh find places to deepen the modules.
[1:22:00] Pretty simple. One really cool um thing
[1:22:04] that it found here is part of my uh part
[1:22:07] of my course video manager app is a
[1:22:09] video editor. A video editor built in
[1:22:11] the browser, which is really hardcore.
[1:22:13] Uh it's a decent bit of engineering. And
[1:22:16] I wanted a way that I could wrap the
[1:22:18] entire front end all the way to the back
[1:22:21] end in like a single big module, so that
[1:22:23] I could test the fact that I press
[1:22:24] something on the front end and it goes
[1:22:26] all the way to the back end. And so, I
[1:22:28] found a way essentially by using a kind
[1:22:30] of discriminated union between the two
[1:22:32] types here by sort of I was able to use
[1:22:35] this uh skill to essentially have a huge
[1:22:39] great big module that just tested from
[1:22:41] the outside, it was testable from the
[1:22:43] outside, this video editor
[1:22:44] infrastructure. And it meant that AI
[1:22:46] could see the entire flow, could act on
[1:22:49] the entire flow, and test on the entire
[1:22:50] flow. And honestly, it was just night
[1:22:53] and day in terms of the uh ability of AI
[1:22:56] to actually make changes, cuz AI working
[1:22:58] on a video editor is pretty brutal if
[1:23:00] you don't give it good tests. So, that
[1:23:02] is
[1:23:03] Honestly, I
[1:23:04] If you take one thing away from today,
[1:23:05] just try running this skill
[1:23:07] on your repo and see what happens.
[1:23:09] Let's go to Slido. Let's ask a
[1:23:11] check a couple of questions as well this
[1:23:13] is running.
[1:23:15] So, let's see. Have you tried Claude's
[1:23:17] auto mode with Claude enable auto mode?
[1:23:19] That way you can avoid many of the
[1:23:20] obvious permission checks. We'll talk
[1:23:21] about permission checks in a second.
[1:23:23] Do I keep the markdown plans and issues
[1:23:26] for later reference?
[1:23:28] Okay.
[1:23:29] This is a great question.
[1:23:31] So,
[1:23:34] let's say
[1:23:35] that you uh have a great idea, you turn
[1:23:38] it into a PRD,
[1:23:40] raise and you then implement that PRD,
[1:23:43] and the PRD is essentially done.
[1:23:45] Raise your hand if you keep that
[1:23:47] information in the repo, so you turn it
[1:23:49] into a markdown file. Raise your hand if
[1:23:50] you want to keep that around.
[1:23:53] Cool. Okay. And raise your hand if you
[1:23:55] if you don't want to keep it around. If
[1:23:57] you want to get rid of it as soon as
[1:23:58] possible. Yeah, this is I think an
[1:24:02] a question that doesn't have a clear
[1:24:03] answer.
[1:24:05] What I'm really scared of
[1:24:08] with any documentation decision is that
[1:24:11] let's say that we have a PRD for this
[1:24:13] gamification system, we keep it in the
[1:24:14] repo.
[1:24:15] We go on, go on, go on. Let's say a
[1:24:17] month later, we want some edits to the
[1:24:19] gamification system.
[1:24:21] And we go in with Claude, and it finds
[1:24:23] this old PRD and says, yes, I found the
[1:24:25] original documentation for the PRD
[1:24:27] system.
[1:24:28] Well, it turns out that the actual code
[1:24:29] has changed so much from the original
[1:24:31] PRD that it's almost unrecognizable. The
[1:24:33] names of things have changed, the um
[1:24:35] file structure has changed, even the
[1:24:37] requirements may have changed. We might
[1:24:38] have actually tested it with users. This
[1:24:40] is doc rot, where the documentation for
[1:24:43] something is rotting away in your repo
[1:24:46] and influencing Claude badly. Or Claude,
[1:24:49] agents badly.
[1:24:50] So, I tend to not keep it around. I tend
[1:24:53] to get rid of it. And for me, because my
[1:24:56] setup uses GitHub issues, I just mark it
[1:24:58] as closed. It can fetch it if it wants
[1:25:00] to, but it's got a visual indicator that
[1:25:02] it's done. So, I tend to prefer
[1:25:05] ditching these.
[1:25:07] Thoughts on the BEADS framework from
[1:25:08] Steve. Uh I've not tested it, but it
[1:25:10] seems like sort of um another way to
[1:25:13] manage Kanban boards and issues. Seems
[1:25:15] uh very good, but I've not tried it.
[1:25:18] Um
[1:25:20] >> [clears throat]
[1:25:22] >> Uh let me just quickly check the uh
[1:25:24] setup here.
[1:25:26] Let's take a couple of questions from
[1:25:27] the room. Anybody got any questions at
[1:25:29] this point about anything that we've
[1:25:30] covered so far, especially this last
[1:25:32] bit? Yes.
[1:25:33] I thought it was
[1:25:35] interesting your answer about like the
[1:25:36] markdown files that you delete because
[1:25:38] they
[1:25:39] create like doc rot.
[1:25:41] How about migrations? Like with
[1:25:43] migration files, would you also squash
[1:25:45] them after that?
[1:25:47] Like database migrations? Yeah.
[1:25:51] I don't know.
[1:25:53] I hope that answers your question. I'm
[1:25:54] so sorry. No, no. I think database
[1:25:56] migrations are a different thing because
[1:25:57] you have a sort of running record of
[1:25:59] exactly what changed, and it's more
[1:26:00] deterministic. And I think
[1:26:04] Yeah, it's an interesting analogy. I'm
[1:26:06] not sure. Let's talk about it
[1:26:07] afterwards.
[1:26:08] That's a good way of saying I've no
[1:26:10] idea.
[1:26:11] Yeah. Yeah. So, you mentioned that you
[1:26:12] don't delete the PRD. You mentioned you
[1:26:14] don't review the PRD once it's done.
[1:26:16] Sorry, guys. Um I'm just trying to
[1:26:17] listen to this guy's question. Have you
[1:26:18] considered
[1:26:19] uh using a deep think like ChatGPT or
[1:26:21] something
[1:26:25] to tell it, "Look at this PRD and tell
[1:26:26] me if it
[1:26:29] It takes about an hour.
[1:26:30] Yeah, the question
[1:26:32] The question here is um
[1:26:35] should I um in the sort of early
[1:26:37] planning stage be trying to optimize the
[1:26:39] plan?
[1:26:40] This is something I actually see a lot
[1:26:41] of people doing, and it's a really good
[1:26:43] um
[1:26:44] idea. So, when you
[1:26:49] Let's go back to the phases.
[1:26:51] So, let's say that you have all of these
[1:26:52] phases here.
[1:26:55] And you
[1:26:56] uh you get to the point where you've
[1:26:58] sort of figured out everything with the
[1:26:59] LLM, you understand where you're going,
[1:27:01] you've created this sort of uh journey
[1:27:03] destination documents here. How do you
[1:27:05] then
[1:27:06] uh
[1:27:08] Like should you then try to optimize and
[1:27:10] optimize and optimize that PRD until
[1:27:12] it's the perfect PRD you can possibly
[1:27:13] imagine?
[1:27:14] I don't think there's a lot of value in
[1:27:16] that.
[1:27:17] Because I think the journey is really
[1:27:20] just sort of a hint of where you want to
[1:27:21] go, and the place that you need to be
[1:27:24] putting the work is in QA.
[1:27:26] And you can sort of do that AFK, I
[1:27:28] suppose, but in my experience, you're
[1:27:29] not going to get a lot of juice out of
[1:27:31] it. Like it's the
[1:27:33] The thing that really matters is getting
[1:27:34] alignment with the AI, which is you do
[1:27:37] in the grilling session initially.
[1:27:40] Let's have one more question. Anyone got
[1:27:41] any more? Yeah. How do you get in in
[1:27:43] your workflow to get it to code the way
[1:27:46] you want it to code it so by the time
[1:27:48] you get to code review, it's at least
[1:27:49] familiar, it uses the libraries you
[1:27:51] wanted to use, Yeah. Um we had this
[1:27:53] question before, actually, which was
[1:27:54] like uh how do you uh enforce your
[1:27:57] coding standards on the agents,
[1:27:59] essentially? How do you get it to code
[1:28:01] how you want it to code?
[1:28:02] Now, there's essentially two different
[1:28:04] ways of doing it.
[1:28:05] Um you've got
[1:28:08] I don't know. Come on. Push.
[1:28:11] And you've got pull.
[1:28:14] What do I mean mean by push and pull?
[1:28:17] Um
[1:28:18] Push is where you push instructions to
[1:28:20] the LLM.
[1:28:22] So, you say, okay, if you put something
[1:28:24] in Claude.md,
[1:28:25] uh talk like a pirate, that instruction
[1:28:27] is always going to be sent to the agent,
[1:28:30] right? So, that is a push, actually.
[1:28:32] You're pushing tokens to it.
[1:28:33] Pull is where you give the agent an
[1:28:37] opportunity to pull more information.
[1:28:40] And
[1:28:42] that's for instance like skills. So, a
[1:28:44] skill is something that can sit in the
[1:28:45] repo, and it has a little description
[1:28:47] header that says, okay, agent, you may
[1:28:50] pull this when you want to.
[1:28:52] My thinking, my current thinking about
[1:28:55] code review and about coding standards
[1:28:57] looks like this.
[1:28:59] When you have an implementer,
[1:29:03] What's going on? There we go.
[1:29:04] Implementer.
[1:29:06] I'm going to make this less red in a
[1:29:07] second.
[1:29:09] Um then
[1:29:11] you want the coding standards to be
[1:29:13] available via pull. If it has a
[1:29:15] question, you want it to be able to sort
[1:29:17] of answer it.
[1:29:18] But if you then have an automated
[1:29:20] reviewer afterwards, then you want it to
[1:29:23] push. You want to push that information
[1:29:25] to the reviewer. You want to say, "These
[1:29:27] are our coding standards. Um make sure
[1:29:29] that this code um follows them."
[1:29:31] So if you have skills for instance, then
[1:29:33] you want to push that stuff to the
[1:29:35] reviewer so the reviewer has both the
[1:29:38] code that's written and the coding
[1:29:39] standards to compare to.
[1:29:42] Hopefully that answers your question. I
[1:29:43] can show you an automated version of
[1:29:44] this as well actually.
[1:29:46] Um
[1:29:47] Yeah, let's do that now just while it's
[1:29:48] fresh in my mind.
[1:29:50] I recently um spent
[1:29:53] uh
[1:29:54] maybe a week or so
[1:29:56] uh building this thing called
[1:29:57] Sandcastle.
[1:29:58] And Sandcastle is a
[1:30:01] I was sort of unhappy with the options
[1:30:03] out there for
[1:30:04] um running agents AFK.
[1:30:07] And what this does is it's essentially a
[1:30:09] TypeScript library for running these
[1:30:11] loops. So you have
[1:30:13] uh a run function
[1:30:15] that creates a work tree, um sandboxes
[1:30:18] it in a Docker container,
[1:30:20] and then allows you to run a prompt
[1:30:22] inside that.
[1:30:23] And in that work tree then, it's just a
[1:30:25] Git branch and you have that code and
[1:30:27] you can then merge it later.
[1:30:29] If I open up
[1:30:32] um
[1:30:33] there are some really really nice ways
[1:30:35] of viewing this and it essentially
[1:30:37] allows you to run these kind of
[1:30:38] automated loops and allows you to
[1:30:41] parallelize across multiple different
[1:30:43] agents really simply.
[1:30:45] So I'll go into my Sandcastle file, go
[1:30:47] into main.ts here.
[1:30:49] And let's just walk through this.
[1:30:51] So this is kind of like I showed you um
[1:30:54] a sort of version of the Ralph loop
[1:30:56] earlier. This is where we take it from
[1:30:58] sequential into parallel.
[1:31:01] We have here first of all a planner
[1:31:04] that takes in it's has a plan prompt
[1:31:06] here that looks at the backlog and
[1:31:08] chooses a certain number of issues to
[1:31:11] work on in parallel. Remember I showed
[1:31:13] you that Kanban board where it had all
[1:31:14] the blocking relationships? It works out
[1:31:16] all the phases. So this one will say
[1:31:18] okay, uh let's say we have
[1:31:21] uh you can ignore all this glue code
[1:31:22] here. This is essentially
[1:31:24] just a set of issues, GitHub issues with
[1:31:27] a title and with a a branch for you to
[1:31:30] work on.
[1:31:32] And then for each issue, we create a
[1:31:35] sandbox
[1:31:38] and then we run an implementer in that
[1:31:40] sandbox
[1:31:41] passing in the issue number, issue
[1:31:42] title, and the branch. This is like the
[1:31:43] loop that we ran just before.
[1:31:46] Then
[1:31:47] if it created some commits, we then
[1:31:49] review those commits.
[1:31:51] This is essentially the loop.
[1:31:53] What do we do with those commits?
[1:31:55] We pass those into a
[1:31:58] merger agent.
[1:32:01] Which takes in a merge prompt, takes in
[1:32:03] the branches that were created, takes in
[1:32:04] the issues, and it just merges them in.
[1:32:06] If there are any issues with the merge,
[1:32:08] you know, with the types and tests and
[1:32:09] that kind of thing, it solves them.
[1:32:11] And this has been my uh flow for quite a
[1:32:13] while now for working on most projects.
[1:32:15] It works super super well. And uh yeah,
[1:32:19] I recommend you check out Sandcastle if
[1:32:20] you want to sort of learn more.
[1:32:23] And to answer your question properly is
[1:32:25] that in the reviewer
[1:32:27] uh I would push the coding standards.
[1:32:30] In the implementer, I would allow it to
[1:32:31] pull.
[1:32:33] And I'm actually using uh Sonnet for
[1:32:34] implementation and Opus for um
[1:32:38] reviewing cuz I consider reviewing sort
[1:32:40] of I need I need the smarts then.
[1:32:44] Any question Actually, let me uh before
[1:32:46] we do more questions, let's go back
[1:32:48] here.
[1:32:49] Okay, where are we at?
[1:32:51] Okay.
[1:32:53] We sort of zooming everywhere in this uh
[1:32:55] talk because I'm kind of having to run
[1:32:56] things in parallel. So let's go back to
[1:32:58] the improve code base architecture. It
[1:33:01] has finally finished running and it's
[1:33:02] found a bunch of architectural
[1:33:04] improvement candidates.
[1:33:06] So it's got essentially a cluster of
[1:33:08] different modules that are all kind of
[1:33:10] related that could probably be tested as
[1:33:12] a unit.
[1:33:13] Got number one, the quiz scoring
[1:33:14] service. There's some reordering logic
[1:33:16] extraction as well.
[1:33:19] It has arguments for why they're coupled
[1:33:21] and it has a dependency category as
[1:33:23] well. So local substitutable in SQL
[1:33:25] light within memory test DB.
[1:33:28] Quiz scoring service just currently has
[1:33:30] zero tests. This is the biggest gap. So
[1:33:31] this is what it looks like when we come
[1:33:33] back of
[1:33:34] uh improve code base architecture.
[1:33:37] Okay.
[1:33:39] So
[1:33:41] we have nominally kind of 17 minutes
[1:33:43] left.
[1:33:44] I don't know about you guys, but I'm
[1:33:45] knackered.
[1:33:46] >> [laughter]
[1:33:47] >> Um I want to
[1:33:49] >> [clears throat]
[1:33:50] >> Let me let me kind of sum up for you.
[1:33:53] Cuz I think we're sort of
[1:33:54] reaching the end of our stamina. I'm
[1:33:55] going to be available for the full time
[1:33:56] if you want to um come and ask me
[1:33:58] questions. Um I might do one more check
[1:34:00] of the slide over, but let's kind of sum
[1:34:01] up where we've got to.
[1:34:04] So
[1:34:06] this is essentially the flow.
[1:34:09] Where throughout this whole process,
[1:34:12] we're bearing in mind the shape of our
[1:34:13] code base.
[1:34:15] This is not a spec to code compiler.
[1:34:17] This is not an AI that's sort of just
[1:34:19] like churning out code. We are being
[1:34:21] very intentional with the kind of
[1:34:23] modules and the shape of the code base
[1:34:24] that we want. We are making sure that we
[1:34:26] are as aligned as possible by using the
[1:34:28] grilling session, by really hammering
[1:34:31] out our idea. We're not over indexing
[1:34:33] into the PRD, we're not trying to read
[1:34:35] every part of it. We're not thinking too
[1:34:36] much about it even. We're then just
[1:34:38] turning that into a set of
[1:34:39] parallelizable issues which can be
[1:34:41] worked on by agents in parallel.
[1:34:44] We implement it
[1:34:45] and we QA and code review the hell out
[1:34:47] of it and then keep going back to that
[1:34:48] implementation. One thing I didn't
[1:34:50] really mention is that in the QA phase
[1:34:53] what the QA phase is for is creating
[1:34:55] more issues for that Kanban board.
[1:34:57] So while it's implementing even, you can
[1:34:59] be QAing the stuff and going back,
[1:35:01] adding more issues. And the Kanban board
[1:35:02] just allows you to add blocking issues
[1:35:04] kind of um sort of infinitely really.
[1:35:07] And then once that's all done, once
[1:35:08] you've got code that you're happy with,
[1:35:10] once you've got work that you're happy
[1:35:11] with, then you can share it with your
[1:35:12] team and you can get a full review.
[1:35:15] So this is kind of like once you get
[1:35:16] here, this is kind of one developer or
[1:35:18] maybe a couple of developers sort of um
[1:35:20] managing this and then it's kind of up
[1:35:21] to you to figure out how to merge it
[1:35:22] back in.
[1:35:25] >> [sighs]
[1:35:27] >> Of course
[1:35:29] all of this can be customized by you.
[1:35:31] This is just something that I have found
[1:35:32] works. I'm not trying to like sell you
[1:35:35] on a kind of approach here. What I
[1:35:37] recommend if you take one thing away
[1:35:39] from this session is that you should
[1:35:41] head back, you should head to Amazon and
[1:35:43] just buy a ton of those old books
[1:35:44] because
[1:35:46] I mean, I just found it so enlightening
[1:35:47] reading them. Uh
[1:35:50] you know,
[1:35:51] pre-AI writing is always like a a really
[1:35:53] fun to read anyway.
[1:35:54] And
[1:35:56] I just on every single page I found that
[1:35:58] there was something useful and something
[1:35:59] interesting to to read.
[1:36:02] So thank you so much. Thank you for
[1:36:03] putting up with the heat. Um hopefully
[1:36:05] your body temperatures will reset soon.
[1:36:07] Uh
[1:36:08] thank you very much.
[1:36:10] >> [applause]
[1:36:23] [music]