---
title: "FULL Guide to Becoming a Principled Agentic Engineer (Build Anything with AI)"
type: "youtube"
channel: "Cole Medin"
date: "2026-04-30"
resource: "https://www.youtube.com/watch?v=luBkbzjo-TA"
pillar: "building"
tags: [agentic-engineering, claude-code, workflow, planning, prompt-engineering]
timestamp: "2026-05-09"
extraction_method: "auto-captions"
video_id: "luBkbzjo-TA"
duration: "1:07:01"
---

[0:00:00] What I have for you today is a polished
[0:00:02] up version of a super valuepacked live
[0:00:04] workshop that I just did yesterday. I
[0:00:07] hosted the AI transformation workshop
[0:00:09] with Leor Weinstein. He's a big name in
[0:00:12] the AI space. It was a blast. And so
[0:00:14] what you're about to see is my portion
[0:00:16] of the event teaching you in very simple
[0:00:18] terms how to build a foundational system
[0:00:22] for getting reliable and repeatable
[0:00:24] results with AI coding assistance. And
[0:00:26] this is important right now because
[0:00:28] people, they overengineer and over
[0:00:30] complicate AI coding frameworks all of
[0:00:32] the time, making it seem like you need
[0:00:34] some fancy harness or specialized agents
[0:00:37] just to do any real work at scale. But
[0:00:40] that really isn't the case. So I boil
[0:00:42] things down into the core principles for
[0:00:45] AI coding here in three phases. Teaching
[0:00:47] you how to ideulate with coding agents,
[0:00:50] how to build an iterative loop, and then
[0:00:52] how to evolve your coding agents over
[0:00:54] time. A lot of this I've covered on my
[0:00:56] channel, but never in one place. There's
[0:00:58] a reason this workshop is one hour. It's
[0:01:00] super valuep packed and you if you go
[0:01:02] through this entire thing, you come out
[0:01:04] of it with a full system that you have
[0:01:06] real ownership of. And the best part is
[0:01:08] it's not even that complicated. And so
[0:01:10] without further ado, here is the live
[0:01:12] workshop. Our job as an engineer is to
[0:01:16] no longer write the code, but to do the
[0:01:19] higher leverage tasks like the planning
[0:01:21] and validating. And that's the framework
[0:01:23] that I want to cover here. And um also
[0:01:26] for product managers in the room,
[0:01:28] there's a lot that I have to say that
[0:01:30] applies to you guys as well. There's a
[0:01:32] threepart process that I want to walk
[0:01:35] through with you right now. We're going
[0:01:37] to start with how do we ideulate around
[0:01:39] the work that we want our coding agents
[0:01:40] to do for us for building literally
[0:01:43] anything, a website, uh funnel, uh any
[0:01:46] kind of platform. This is going to apply
[0:01:48] no matter what you want to build. And
[0:01:50] then we'll get into for the developer
[0:01:52] when we are knocking out a piece of work
[0:01:54] like a ticket in Jira or handling a
[0:01:56] GitHub issue or starting a new
[0:01:57] application. What does that process look
[0:01:59] like? It's using the piv loop. That's my
[0:02:01] core methodology that we'll cover. And
[0:02:03] then we'll get into the system evolution
[0:02:05] mindset. And this is probably the most
[0:02:08] powerful part of the entire system. How
[0:02:10] we make our coding agents more powerful
[0:02:12] over time as we run into issues using
[0:02:15] them. And uh one disclaimer that I want
[0:02:18] to give before we get into everything
[0:02:20] here is that uh a lot of what I'm
[0:02:23] covering here is a training that I do
[0:02:26] for organizations. But usually for them
[0:02:28] it's more of a 4hour session where I
[0:02:30] really get into the entire process. And
[0:02:33] so I've compacted everything down into
[0:02:35] one hour to share with you guys right
[0:02:37] now. So a highle overview, but I'm still
[0:02:39] going to get really practical with you
[0:02:40] guys. And I'm going to give you a live
[0:02:42] demonstration of everything here so that
[0:02:44] you can come out of this one hour
[0:02:46] knowing exactly what the process looks
[0:02:49] like that you can mold for yourself to
[0:02:51] go from idea all the way to production
[0:02:53] code with the help of AI coding
[0:02:55] assistance. And the important thing here
[0:02:56] is we're not vibe coding because we are
[0:02:59] putting ourselves in the driver's seat
[0:03:00] along the way through all of the
[0:03:02] planning and validation that we do. That
[0:03:04] is the the core framework that I'm going
[0:03:06] to cover with you. And uh really this
[0:03:10] whole process it applies no matter the
[0:03:12] tools that you're using. And so I'm
[0:03:15] going to be using cloud code for our
[0:03:17] event here just because that is my
[0:03:19] favorite AI coding assistant at least
[0:03:20] right now. And then I'm going to be
[0:03:22] using Jira as my place to manage all of
[0:03:25] the work that we scope out with the help
[0:03:27] of Claude code. But this entire process
[0:03:30] is going to work if you're using you
[0:03:31] know codeex with GitHub or you're using
[0:03:34] GitHub copilot with linear. Really, it's
[0:03:36] just you need to have one place to
[0:03:38] manage your work and organize your work
[0:03:40] and then one place to work with a large
[0:03:42] language model to create your code.
[0:03:44] That's the only requirement that I have
[0:03:46] here, even if you do want to follow
[0:03:48] along. And also in the description for
[0:03:52] our live stream here, if you click into
[0:03:55] the description, I'm just like looking
[0:03:56] at it on my left monitor here, I have a
[0:03:58] link to a GitHub repository. And uh this
[0:04:01] GitHub repository has the demonstration
[0:04:05] application that we're going to be
[0:04:06] building on top of today. And then it
[0:04:08] also has all of the resources that I'm
[0:04:10] going to be showcasing here. My rules,
[0:04:12] my commands, my skills. We'll talk about
[0:04:15] what those look like and I'll use some
[0:04:17] of them live, but a lot of that lives
[0:04:19] here in thecloud folder. So if you see
[0:04:22] any part of my process that you really
[0:04:23] want to steal for yourself, please feel
[0:04:25] free to do so. This repository is open
[0:04:27] source, ready for you to come in and
[0:04:29] take any of the skills or all the
[0:04:31] commands that I'm using to package up my
[0:04:33] workflows. And so really, we're not
[0:04:35] going to be doing a lot of manually
[0:04:37] typing today because it's going to be
[0:04:39] here are the prompts that I've been
[0:04:40] using time and time again. I have it as
[0:04:43] a command that I can reference and have
[0:04:45] the coding agent go through that
[0:04:46] procedure that I'm using pretty much
[0:04:49] every single time that I'm delegating
[0:04:51] the coding to AI. So yeah, the last
[0:04:53] thing I want to say before we get into
[0:04:54] things here is there are a lot of
[0:04:56] frameworks for AI coding available to us
[0:04:59] that are open- source. So maybe you guys
[0:05:01] have explored GitHub specit or BMAD or
[0:05:04] Cloudflow or GSD, um, Gastown. I mean, I
[0:05:08] could go on naming dozens and dozens of
[0:05:10] them. There are all of these opinionated
[0:05:13] strategies out there right now to guide
[0:05:15] you through a process kind of similar to
[0:05:17] what I'm going to show you here. Like
[0:05:18] this is a process for researching then
[0:05:20] planning then building then validating
[0:05:23] with AI coding assistance driving a lot
[0:05:25] of it and I have a lot of respect for
[0:05:28] these platforms. There are a lot of
[0:05:30] really powerful timeless software
[0:05:32] engineering strategies built into them
[0:05:33] but at the same time a lot of these
[0:05:36] frameworks are very overengineered. They
[0:05:39] try to do too much at once and it's
[0:05:42] really difficult to take an existing
[0:05:45] off-the-shelf framework and mold it to
[0:05:47] your software development life cycle. So
[0:05:50] like I said, I do a lot of corporate
[0:05:52] trainings where I teach companies how to
[0:05:55] take something very foundational like
[0:05:57] this and mold it to their existing
[0:05:58] practice because you don't want to just
[0:06:00] throw out the window the entire process
[0:06:03] your team has already been using for
[0:06:05] working with coding agents. Instead, you
[0:06:08] want to mold the process around AI, but
[0:06:11] you still are going to have some of your
[0:06:12] conventions and the way that the team
[0:06:14] works. It's not really realistic to just
[0:06:16] throw everything out the window. But
[0:06:18] when you're using something like BMAD or
[0:06:19] GSD, you're trying to take an
[0:06:21] offtheshelf solution, you're kind of
[0:06:22] forced to do that because it's so
[0:06:24] bloated that it's hard to like really
[0:06:26] make it your own. And so what I teach
[0:06:28] here is simple on purpose because I want
[0:06:30] to show you the foundation that you can
[0:06:32] then build on top of to mold it into
[0:06:34] your process for planning, your process
[0:06:36] for QA, whatever that looks like for
[0:06:39] each stage of the software development
[0:06:41] life cycle. And so we'll start with
[0:06:43] planning here. And planning, this part
[0:06:46] actually applies to product managers
[0:06:48] just as much as developers. So a lot of
[0:06:50] organizations that I work with um the
[0:06:52] trainings that I do, they'll bring their
[0:06:54] entire uh PM team into the training as
[0:06:57] well because they're actually the first
[0:06:59] ones that have a touch point with the
[0:07:01] coding agent when you're planning the
[0:07:03] next scope of work for an application.
[0:07:05] So the product manager is the one
[0:07:07] initially doing you know let's say the
[0:07:08] sprint planning and it's important for
[0:07:11] them just like the developers to work
[0:07:12] with coding agents to speed up that
[0:07:14] process. Here's the application that we
[0:07:16] have right now. here are the bugs we
[0:07:19] want to fix and the issues that we want
[0:07:20] to build or the new features we want to
[0:07:22] build for this sprint. And same thing
[0:07:25] applies to green field development.
[0:07:26] You're going to be building that initial
[0:07:28] scope of work for the MVP of an
[0:07:30] application. And this process applies to
[0:07:32] both. And so what I'm going to do with
[0:07:35] you guys right now is uh I am going to
[0:07:39] show this diagram at a high level. Just
[0:07:41] walk through it really quickly with you
[0:07:42] this component right here. And then
[0:07:44] we're going to get into something very
[0:07:45] practical. I'm going to go into my uh
[0:07:49] codebase here and we are going to go
[0:07:52] through everything live. I'm going to
[0:07:54] show you what it looks like for
[0:07:55] brownfield development to take an
[0:07:57] existing application, plan out a brand
[0:08:00] new sprint with a bunch of new set sets
[0:08:03] of work we want to perform. And then I'm
[0:08:06] going to pick one of those and we're
[0:08:07] going to go through the piv loop, the
[0:08:09] process that we're going to repeat for
[0:08:10] every single Jira ticket. And again,
[0:08:12] that could be a GitHub issue, it could
[0:08:14] be a linear ticket, whatever it is. And
[0:08:16] so, you'll see the full process end to
[0:08:18] end. There's a lot of value that I have
[0:08:20] packed into the hour for you guys here.
[0:08:22] So, okay, the beginning of the process
[0:08:25] here is as simple as it possibly can be.
[0:08:29] You are going to open up your coding
[0:08:30] agent, like I'll, you know, just pop
[0:08:32] open Claude Code right here. And you're
[0:08:34] just going to have a conversation about
[0:08:36] what you want to build. There is no
[0:08:38] structure at first. And like I said
[0:08:41] earlier, it is simple on purpose because
[0:08:43] I want the barrier to entry for you to
[0:08:45] be so incredibly low that you begin just
[0:08:47] brainstorming ideas with the coding
[0:08:49] agent. And then we're going to evolve to
[0:08:51] more structure over time. And that's the
[0:08:54] process that I'm going to share with you
[0:08:55] as I start to bring in some skills and
[0:08:57] commands that I have in my AI layer in
[0:09:00] my AI coding system.
[0:09:03] And so, um, first of all, when you have
[0:09:06] this conversation, you just do what I
[0:09:07] like to call a brain dump. Like most of
[0:09:09] the time I'll literally I'll just use a
[0:09:11] speechtoext tool so that I just talk. I
[0:09:13] go on and on about what I want to build.
[0:09:15] At this point it is helpful to be as
[0:09:18] specific as possible. And so you would
[0:09:20] say, you know, like this is my
[0:09:21] application. Here are the new things
[0:09:22] that I want to build. Here are the bugs
[0:09:24] I want to fix. And then you go into the
[0:09:26] clarifying stage. And so the most
[0:09:28] important part when you're first
[0:09:30] planning work with a coding agent is to
[0:09:33] reduce the number of assumptions that it
[0:09:35] is making. Because honestly, most of the
[0:09:37] time when a coding agent does a bad job,
[0:09:39] it's not like the code is just broken.
[0:09:41] It's that it's not aligned with what you
[0:09:43] are actually looking to build. And
[0:09:45] really, the responsibility is on you
[0:09:47] there because it is your role to and and
[0:09:50] your responsibility to make sure the
[0:09:52] coding agent is really on the same page
[0:09:54] with you for what you are building. So,
[0:09:56] it's a lot of just curating this context
[0:09:58] with the help of the coding agent being
[0:10:00] very specific for what you want to
[0:10:02] build. And so the most powerful strategy
[0:10:04] here, and you'll see this in action in
[0:10:06] just a little bit, is to have the coding
[0:10:08] agent ask you questions. Like we will
[0:10:10] specifically ask it to ask us questions.
[0:10:13] And you can go through this process for
[0:10:14] a good 20, 30 minutes, even beyond that
[0:10:16] if you really want to set the stage well
[0:10:19] going into the development later on. So
[0:10:21] product managers, this is your job when
[0:10:23] you're working with cloud code. And even
[0:10:25] if you're, you know, you're a solo
[0:10:26] developer shipping things without a
[0:10:28] product manager, this is still an
[0:10:30] important step to go through. It's very
[0:10:32] important to stay high level at first.
[0:10:34] We're not getting into the weeds right
[0:10:36] now for how we're going to test things
[0:10:38] or what files we have to change in our
[0:10:40] codebase. At this point, we're just
[0:10:41] trying to figure out what are the
[0:10:42] requirements that we need to translate
[0:10:44] into code. And then we'll have a
[0:10:46] separate planning process where we're
[0:10:47] getting more into okay, here's how we're
[0:10:49] actually going to code it and the parts
[0:10:51] of code of the codebase that we need to
[0:10:52] edit. So, at this point, we're very very
[0:10:54] high level. And then after you have a
[0:10:58] conversation with the coding agent where
[0:10:59] you figured out exactly what you want to
[0:11:01] build, what is our scope of work for
[0:11:03] this sprint or this new application,
[0:11:05] then it's time to create your AI layer.
[0:11:08] And I have this marked as optional here
[0:11:10] just because when you are working on an
[0:11:13] existing codebase, you might already
[0:11:14] have that AI layer already created. But
[0:11:17] if you don't have it, I highly recommend
[0:11:19] investing a lot of time upfront building
[0:11:22] this. Now, for our one hour here, it's
[0:11:25] not like I have a lot of time to like
[0:11:26] really get into best practices for
[0:11:28] building your global rules and your
[0:11:29] skills and commands, but I'm just saying
[0:11:31] like this is the part of the workflow
[0:11:33] where you will create that. And so, your
[0:11:35] global rules, these are the conventions,
[0:11:37] the rules that you always want your
[0:11:38] coding agent to follow. Like here are
[0:11:41] our coding styles, here's our testing
[0:11:43] strategy, our logging strategy, things
[0:11:45] like that. And then your commands, we're
[0:11:47] going to see a lot of these in action
[0:11:49] today. and your skills. These are your
[0:11:51] reusable workflows. So, anytime you find
[0:11:53] yourself prompting something more than
[0:11:55] three times, you should turn it into a
[0:11:57] command or skill because that's just a
[0:12:00] prompt that you're going to load into
[0:12:02] your coding agent when the time comes.
[0:12:04] Like, this is my process for planning.
[0:12:06] This is my process for creating PRDs or
[0:12:09] stories in Jira, for example. That way,
[0:12:12] we don't have to type things out and
[0:12:13] it's a reusable workflow that we can
[0:12:15] share and create a standard across with
[0:12:18] our team. very very important. So we
[0:12:20] don't want to do manual prompting as
[0:12:22] much as possible turn things into
[0:12:25] something in the AI layer that you can
[0:12:27] invoke right like we can take a command
[0:12:29] in skill and say you know slash plan now
[0:12:32] we are going into our planning process
[0:12:35] and so that actually goes into the first
[0:12:37] command that we'll use here and again
[0:12:39] I'll show this all in action in just a
[0:12:41] little bit so the first command is a
[0:12:44] process guiding the coding agent from an
[0:12:48] unstructured conversation
[0:12:50] into a structured PRD. Like I said, we
[0:12:52] go from exploration to structure so that
[0:12:56] we have a single document that is
[0:12:58] produced from this command that outlines
[0:13:01] all of the core sections for our PRD is
[0:13:05] short for product requirement document.
[0:13:06] So this is like the initial scope of
[0:13:09] work for an application if we're doing
[0:13:11] green field development or these are all
[0:13:14] of the tickets that we need to handle if
[0:13:16] it's a new sprint that we are planning
[0:13:17] for in Jira for example. And then I can
[0:13:20] take the PRD and also have Claude code
[0:13:24] split it up into individual pieces of
[0:13:26] work to create as my Jira tickets. We'll
[0:13:28] see this in action. And so it handles
[0:13:31] literally everything. It parses this
[0:13:33] document. It figures out what are the
[0:13:36] individual phases or pieces of work that
[0:13:38] we should create as tickets and then
[0:13:40] we'll even use the Jira MCP server to
[0:13:43] create those things so that we don't
[0:13:45] have to do that backstage work like Leor
[0:13:49] was talking about of creating those
[0:13:51] tickets in Jira. We want to have our
[0:13:52] coding agent handle all of that
[0:13:54] administrative work. And so we end with
[0:13:58] tickets in Jira and then we can pick one
[0:14:00] of them. So this is where you know the
[0:14:01] product manager would hand things over
[0:14:03] to the developer to pick a ticket and
[0:14:05] then go into the full piv loop. This is
[0:14:08] the full process we go through to handle
[0:14:10] individual sets of work with our coding
[0:14:12] agent. So we'll get into this next, but
[0:14:14] first I want to show you a live
[0:14:17] demonstration of our ideation phase. And
[0:14:21] so I'll go over to my codebase now
[0:14:24] and I'll just describe very briefly the
[0:14:27] application that I have for a
[0:14:29] demonstration here. And so this
[0:14:32] repository again I have it linked in the
[0:14:34] description. I also linked it in the
[0:14:36] chat. Um actually I didn't link it in
[0:14:38] the chat. So I'll do that right now. So
[0:14:40] let me go out copy this and I'll paste
[0:14:44] this in our chat here. If you guys want
[0:14:46] to just poke around the resources that I
[0:14:48] have for you guys and or even follow
[0:14:50] along, you can feel free to do that. But
[0:14:52] the application for my demonstration is
[0:14:55] just a quick poll builder. So, you know,
[0:14:57] you put in your question like, uh, how
[0:14:59] experienced are you with AI coding? And
[0:15:03] then we have our options here like I'm a
[0:15:04] beginner, I am intermediate, or I am
[0:15:07] advanced. All right, cool. And then I
[0:15:09] create a poll. Yeah, the point of this
[0:15:11] application is that it's super simple
[0:15:13] because I'm going to be focusing on the
[0:15:15] process, not focusing on the application
[0:15:18] itself, right? So, I want something very
[0:15:20] quick to build on top of so that I can
[0:15:22] quickly go through how I create stories,
[0:15:24] handle tickets, go through the pivot
[0:15:26] loop and the system evolution.
[0:15:29] And so, uh, what I'm going to do to
[0:15:31] begin is I'm going to go into cloud code
[0:15:34] and I'm going to plan my next fictitious
[0:15:38] sprint. So we have this very basic
[0:15:40] application right now where we can
[0:15:42] create a poll and if I you know actually
[0:15:44] had the application deployed then people
[0:15:46] could use it and go and and answer the
[0:15:48] poll. But there are a lot of features
[0:15:50] that are missing. And so I have a prompt
[0:15:54] prepared ahead of time that I'm just
[0:15:56] going to paste in right now just so that
[0:15:58] you guys don't have to watch paint dry
[0:16:00] as I give my initial brain dump. But
[0:16:02] again, this is your point where you just
[0:16:05] dump all of your ideas of what you want
[0:16:07] to build, being as specific as possible.
[0:16:10] So even if you wanted to specify things
[0:16:12] like your tech stack and your
[0:16:14] architecture, if you're more technical,
[0:16:16] this is where you do that. But even if
[0:16:17] you are less technical and you are, you
[0:16:19] know, a product manager, for example,
[0:16:21] you can still stay pretty high level
[0:16:23] here and just describe the features that
[0:16:25] you want to build.
[0:16:28] And so I'm saying like here's my brain
[0:16:30] dump for phase two. Like the next thing
[0:16:31] that I want to build on top of the
[0:16:33] application. Let's say I want to build a
[0:16:35] live presentation mode. Like right now
[0:16:37] in the poll builder when I I can't
[0:16:40] really like see answers come in live.
[0:16:42] Like if I click see current results, I'd
[0:16:43] have to refresh the page in order to see
[0:16:46] new entries. I also want to build a QR
[0:16:49] code generation, multi-question polls,
[0:16:52] multiple choice questions. Like there's
[0:16:54] like a lot of things that I want to
[0:16:55] build on top. this is my next sprint
[0:16:57] that I want to uh you know my end goal
[0:16:59] is to have all these things created as
[0:17:02] uh Jira tickets that I could then pass
[0:17:04] on to developers or pass on to my coding
[0:17:06] agents if I am a developer
[0:17:09] and so I've described everything here um
[0:17:11] usually if I'm not just doing a live
[0:17:13] demonstration I would make this prompt a
[0:17:15] lot longer but I just wanted to keep it
[0:17:18] concise right now and then the important
[0:17:20] thing here this is what I was saying in
[0:17:22] the diagram before you write anything
[0:17:24] ask me clarify ing questions one at a
[0:17:27] time using the ask user question tool.
[0:17:30] And so now this is where I'm going to
[0:17:32] make sure that I get on the same page
[0:17:34] with my coding agent. And so one at a
[0:17:37] time it's going to ask me these
[0:17:38] questions. And in Claude Code we have
[0:17:39] this ask user question tool where we can
[0:17:41] see these questions pop up with multiple
[0:17:44] choice answers for us. So it's really
[0:17:46] easy to blitz through things because a
[0:17:48] lot of times what it recommends is
[0:17:50] actually what I'm going to go with. But
[0:17:51] it still gives me the opportunity if I
[0:17:53] want to say like, hey, no, you're wrong
[0:17:55] here. Like, let's actually do it this
[0:17:56] way instead. So, we can, you know,
[0:17:58] remove that ass that incorrect
[0:18:00] assumption that it was making. And for
[0:18:03] other coding agents that don't have this
[0:18:05] specific tool, it's this whole process
[0:18:07] is still going to work. It's just going
[0:18:08] to be a little bit slower because you'll
[0:18:10] have to type out each of your answers
[0:18:12] more like you're just chatting with an
[0:18:13] agent. Uh, but it still works in exactly
[0:18:15] the same way. So, it's asking us
[0:18:17] questions here like how should real-time
[0:18:19] updates work? I'll just go with what it
[0:18:21] recommends here just for the sake of
[0:18:22] speed, but also you have this option to
[0:18:24] chat with it. So for each individual
[0:18:25] thing, if you really want to dive deep
[0:18:27] with the coding agent, which a lot of
[0:18:29] times I would recommend you do, you have
[0:18:31] the opportunity to do that. And of
[0:18:33] course, how deep you go does depend on
[0:18:35] how technical you really are. Like right
[0:18:37] there, you know, how should real-time
[0:18:39] updates work? That is a pretty technical
[0:18:40] question. So if you want to just go with
[0:18:42] what it recommends, that's definitely
[0:18:44] okay. But if you have that knowledge and
[0:18:46] like really understand the architecture
[0:18:48] of the codebase, it's just more power to
[0:18:49] you. You're able to to really make sure
[0:18:51] that you clear assumptions. Otherwise,
[0:18:53] if you're, you know, more on the product
[0:18:54] manager side, you might have a couple of
[0:18:57] wrong assumptions that sneak into your
[0:18:59] Jira tickets, but that's why you work
[0:19:00] with the developers as you're planning
[0:19:03] things, right? Like you'd have your
[0:19:04] sprint meeting where you'd make sure you
[0:19:05] clarify these kinds of things. Uh but
[0:19:08] the goal is just for the coding agent to
[0:19:09] help us with that starting point of
[0:19:11] having all the context in Jira ready for
[0:19:13] developers to refine and pick up and
[0:19:15] work on.
[0:19:17] And so for the sake of demo I'm going to
[0:19:18] say uh let's uh end the questions here
[0:19:22] just because sometimes it can go on for
[0:19:24] you know a good 10 15 minutes asking us
[0:19:26] a lot of questions. I'll allow it to
[0:19:27] make some assumptions for the sake of
[0:19:29] speed but uh at this point you know I've
[0:19:32] already shown you what I need for what
[0:19:33] this process generally looks like. And
[0:19:35] so at the end of of our chat here, this
[0:19:38] context, this short-term memory for
[0:19:40] cloud code is what we're going to turn
[0:19:42] into the PRD. So we are about to run our
[0:19:46] first command where we create that
[0:19:48] product requirement document. The input
[0:19:50] is the conversation. The output is a
[0:19:53] single document, a source of truth that
[0:19:56] we could, you know, then upload to
[0:19:57] Confluence or check into source control,
[0:19:59] wherever we want to store that. And then
[0:20:01] we can create the JER tickets from that.
[0:20:04] All right. So that was the last question
[0:20:06] there. Now it's it's uh taking in my
[0:20:08] message. So it will move on to creating
[0:20:10] our PRD. And Cloud Code is smart enough
[0:20:14] to know the capabilities that are
[0:20:15] available. So when I've gone through
[0:20:17] this process, a lot of times it'll just
[0:20:18] go right to loading the create PRD skill
[0:20:22] and it'll walk itself through creating
[0:20:24] that document in exactly the structure
[0:20:26] that I am looking for.
[0:20:29] And so I'll go ahead and open that so we
[0:20:31] can see ahead of time what that actually
[0:20:33] looks like. And again, all of these
[0:20:35] commands that I'm about to walk through
[0:20:36] are available in the GitHub repository
[0:20:38] that I have linked in the description.
[0:20:40] So I'll go to create PRD. That is our
[0:20:43] first command. And again, commands and
[0:20:44] skills are really just procedures. They
[0:20:47] are prompts that we get to load in in
[0:20:49] real time whenever we want. And so
[0:20:52] create PRD. This is going to generate a
[0:20:54] comprehensive product requirements
[0:20:56] document. we are we get to also specify
[0:20:58] like where it also outputs this file. So
[0:21:01] commands and skills support arguments.
[0:21:03] So that's how we can make things dynamic
[0:21:05] and we'll we'll talk about arguments
[0:21:06] quite a bit because most of my
[0:21:08] procedures have arguments. So I can make
[0:21:10] them specific to what I am doing right
[0:21:12] now. And the main thing that we are
[0:21:15] outlining in this PRD uh command is the
[0:21:18] structure that we're looking for. Like
[0:21:20] we want every PRD to have an executive
[0:21:22] summary, a mission, target users. This
[0:21:25] is a lot of product manager speak. So if
[0:21:27] you come from the product manager space,
[0:21:29] really this is your opportunity to take
[0:21:31] how you already write PRDs and make it
[0:21:33] so your coding agent does it in the
[0:21:34] exact same thing. Again, the foundations
[0:21:37] that I'm laying for here in this process
[0:21:39] is not for you to completely have a
[0:21:41] blank slate for your software
[0:21:43] development life cycle, but to take your
[0:21:45] best practices that you've established
[0:21:46] as a team and teach it to your agents.
[0:21:49] That's what we're doing with skills and
[0:21:51] commands. And so your PRDs are going to
[0:21:52] look the same, but your agent is saving
[0:21:55] you hours and hours and hours because it
[0:21:57] gets to generate this based on our
[0:21:59] conversation.
[0:22:01] And so right here, like what I can do is
[0:22:03] um it kind of went through this process
[0:22:06] itself like it loaded the skill
[0:22:07] automatically, but I'll just show you
[0:22:08] like if I wanted to invoke it myself, I
[0:22:10] can just do create PRD and then I can
[0:22:13] specify the file name as an argument
[0:22:15] like this. It's just when you invoke
[0:22:16] something or similar to when you invoke
[0:22:18] something in the command line for all
[0:22:20] you developers. So we just have
[0:22:21] spaceepparated arguments for anything
[0:22:24] that we want uh the command to respect
[0:22:27] like where we're going to output it. So
[0:22:28] we're going to have something in the
[0:22:30] agents folder. It'll just be like a
[0:22:32] markdown prdown file. And then of course
[0:22:35] we could you know like use the Jira MCP
[0:22:38] server to upload or the Atlassian MCP
[0:22:40] server to upload it to Confluence. We
[0:22:42] could upload this document to Google
[0:22:44] Drive or put it as context in a GitHub
[0:22:47] issue. however you want to you know
[0:22:49] store this artifact that is like the
[0:22:51] initial source of truth for that new
[0:22:53] application or that new sprint that we
[0:22:55] are planning
[0:22:58] and so once we have our PRD created and
[0:23:00] it's going to take a little bit um
[0:23:02] because it's generating a larger
[0:23:03] document here you can see that claude is
[0:23:05] currently thinking through the structure
[0:23:08] so it's taking this conversation
[0:23:10] reasoning about everything that we we
[0:23:12] have discussed here and then creating a
[0:23:14] document from that once we have our PR
[0:23:17] RD we are going to create our stories.
[0:23:20] Now you could do this as a single
[0:23:22] command where you create the PRD and the
[0:23:25] stories all with a single call to claude
[0:23:27] code. The reason I have these separated
[0:23:30] is because once you have the PRD
[0:23:32] created, it is a good time for you to
[0:23:35] validate things yourself. So going back
[0:23:37] to the diagram here, it is important for
[0:23:41] us to delegate as much coding to the
[0:23:44] coding agent as we possibly can. That's
[0:23:46] the backstage work for developers now.
[0:23:49] But we want to remain in the driver's
[0:23:51] seat because every single artifact that
[0:23:53] our coding agent produces, whether it's
[0:23:55] a PRD or it's a set of code, we want to
[0:23:59] review that and we want to have human in
[0:24:02] the loop so that we can iterate on
[0:24:03] anything. And so when we create our PRD,
[0:24:06] it's not good enough to just immediately
[0:24:09] create stories from that. Like it's
[0:24:11] important for us to review the artifact
[0:24:13] and make sure that things are really
[0:24:15] aligned with what we are looking to do
[0:24:17] next because yes, we had it ask a bunch
[0:24:19] of clarifying questions, but maybe we
[0:24:21] didn't have it ask enough questions or
[0:24:24] maybe it didn't quite understand our
[0:24:26] answers. That's why it's important for
[0:24:27] us to still review things. So, I I know
[0:24:29] that takes some time and the promise
[0:24:32] with AI is that it speeds things up a
[0:24:34] lot. But even if you do take time
[0:24:37] refining the PRD with the coding agent,
[0:24:40] it's still going to save you so many
[0:24:42] hours compared to if you did this entire
[0:24:44] process yourself.
[0:24:46] And so for the create stories command,
[0:24:48] we run this after we have reviewed the
[0:24:51] PRD and maybe made some changes to it.
[0:24:54] And so for this command, we give it the
[0:24:56] path to our PRD. Obviously, we want
[0:24:58] Claude Code to know like this is the PRD
[0:25:01] that we want to create our stories from.
[0:25:04] And then we can also specify the Jira
[0:25:07] project and epic. And so what I have in
[0:25:10] Jira created ahead of time is I just
[0:25:13] have a a simple project created with an
[0:25:16] epic that doesn't have any tasks in it
[0:25:18] right now. So this is what we're going
[0:25:20] to populate live in a little bit with
[0:25:22] our create stories command. And so I had
[0:25:25] to do a little bit of manual work to
[0:25:27] actually create the epic. But after that
[0:25:30] point, I'm not doing any work myself in
[0:25:33] the Jira platform. That's all backstage.
[0:25:35] I don't want to do that myself. And so I
[0:25:37] want to have a single process that goes
[0:25:40] from here are my ideas to everything is
[0:25:43] populated here. And it feels like magic
[0:25:45] every time this happens. So we'll get to
[0:25:47] that in a second, but obviously we need
[0:25:49] to have the PRD created first. And you
[0:25:52] can see that right now it's outputting a
[0:25:54] lot of tokens cuz it's in the middle of
[0:25:55] creating that file for us. So we just
[0:25:57] have to be patient. But uh that gives me
[0:26:00] some time here just to show you really
[0:26:02] quickly what uh we have in this command
[0:26:04] here. So first of all, we have a
[0:26:08] phasebyphase procedure that we're
[0:26:10] walking claude code through. Again,
[0:26:11] commands are just prompts that we're
[0:26:13] we're having the coding agent run
[0:26:14] through. So we're having it load the PRD
[0:26:17] because we can also run this in a
[0:26:19] separate Cloud Code session if we don't
[0:26:20] want to run it in the same one. So we
[0:26:22] can load the PRD. That's all the context
[0:26:24] it needs. Then it's going to break down
[0:26:26] into stories and I can render this so it
[0:26:29] looks a little bit nicer here. So we
[0:26:31] create a user story and we can specify
[0:26:32] the format as well. We can define the
[0:26:34] acceptance criteria. So just like we
[0:26:36] create the structure for the PRD in the
[0:26:39] create PRD command, we can do the same
[0:26:41] thing for the stories here. So your team
[0:26:44] probably already has a convention or if
[0:26:46] you're a solar solo developer, you still
[0:26:48] probably have some kind of convention
[0:26:50] for how you want to create these
[0:26:51] artifacts. Here are my tasks. Here are
[0:26:53] my issues. Whatever that is. And so we
[0:26:55] bake that into the command and that
[0:26:58] makes it more reliable, repeatable, and
[0:27:00] it makes it so that you don't have to
[0:27:02] have a brand new process that everyone
[0:27:04] is extremely uncomfortable with, right?
[0:27:06] Like we want to make it uh easy to adopt
[0:27:09] these new tools and new processes.
[0:27:12] And so then we go on to the structure
[0:27:14] for each story. Here is exactly what
[0:27:16] you're going to create. Here's how we're
[0:27:17] going to order them. We even have some
[0:27:19] validation built in. So it kind of
[0:27:20] checks its own work to make sure that it
[0:27:22] has, you know, fully extracted all the
[0:27:24] phases out of the PRD, for example. And
[0:27:26] then we have the output. We're going to
[0:27:28] save everything to markdown documents.
[0:27:31] And then if we have the Jira
[0:27:32] integration, so I actually set this
[0:27:34] command up so that if you're not working
[0:27:36] with Jira, then you can still just work
[0:27:37] with the stories in local files. A lot
[0:27:40] of solo developers just manage their
[0:27:42] entire system with markdown, and that's
[0:27:44] totally respectable. So this command
[0:27:45] works for that. But if we do have the
[0:27:47] Jira integration and we tell it how to
[0:27:50] check for that, then it's going to
[0:27:52] create everything in the epic that we
[0:27:54] specified um in the argument here. So
[0:27:56] like if these things are filled in and
[0:27:58] we'll see that in just a second. So
[0:28:01] okay, we created our PRD and so we can
[0:28:03] take a look at this. So this document,
[0:28:06] I'm not going to read through the entire
[0:28:08] thing right now because it's a pretty
[0:28:10] long document. The point of uh what I'm
[0:28:12] demonstrating right here is mainly to
[0:28:14] show you that the structure that we have
[0:28:16] laid out in the create PRD command is
[0:28:19] exactly what we see in our final PRD. So
[0:28:22] we have our executive summary, our
[0:28:24] mission, our target users, everything
[0:28:26] that I showed you in the markdown here.
[0:28:29] And then we also have what is in scope.
[0:28:31] So for our phase 2 sprint, we want the
[0:28:34] multi-question polls, per user toggle,
[0:28:37] the full screen presenter presentation
[0:28:39] page, uh everything that we gave in our
[0:28:42] initial brain dump. So this PRD is the
[0:28:45] result of our conversation plus the
[0:28:48] create PRD process, right? Like those
[0:28:50] two things together, this is the baby of
[0:28:53] that. And so now this PRD we can run
[0:28:56] through our create stories command. And
[0:29:00] this is the thing is like after that
[0:29:02] initial brain dump, I'm really not doing
[0:29:04] much typing. I'm running commands. I'm
[0:29:05] answering questions. That's really all I
[0:29:07] have to do. And so I'm going to go ahead
[0:29:09] and copy this. And like I said, you
[0:29:11] could do this in a separate context
[0:29:14] window if you wanted to, but I'm just
[0:29:15] going to do it right here because it was
[0:29:17] relatively short. So I'm not going to
[0:29:19] iterate on the PRD for the sake of speed
[0:29:21] here.
[0:29:23] So I this is one moment where it's, you
[0:29:25] know, do as I say, not as I do. But uh
[0:29:27] generally if I am off camera and really
[0:29:30] working through my initial planning for
[0:29:31] something, I'm going to spend a lot of
[0:29:33] time looking through each section here
[0:29:34] and making sure that everything is as I
[0:29:37] intend. And so I'll run create stories
[0:29:40] with uh the P path to my PRD. And then I
[0:29:43] have to give the ID of my Jira project
[0:29:46] and also the ID of my tag. And so for
[0:29:49] those of you who are using Jira, you
[0:29:52] just get that like this is the ID of
[0:29:53] your project and then this is the ID of
[0:29:56] your epic. And then if you're doing
[0:29:59] something else like using GitHub or
[0:30:00] linear, you're going to go through the
[0:30:02] exact same process. You're just going to
[0:30:03] use, you know, the GitHub CLI to create
[0:30:05] issues instead of the Jira MCP server or
[0:30:08] you're going to use the linear MCP
[0:30:10] server. So again, it doesn't matter in
[0:30:11] the end what tool you're actually using.
[0:30:13] So I'm going to go ahead and run this.
[0:30:16] So it's going to break down. It's going
[0:30:17] to follow that exact process that I just
[0:30:18] showed you, breaking down the PRD. And
[0:30:20] then after a few minutes, it'll take a
[0:30:22] little bit of time for it to reason
[0:30:23] about that. We'll see all of the
[0:30:25] subtasks start to get populated here in
[0:30:28] Jira. And then at that point, we can
[0:30:30] have developers just pick them up and go
[0:30:32] through the pivot loop that I'll cover
[0:30:34] with you guys next. And that's the
[0:30:36] beauty of it is also you can have
[0:30:38] developers work on everything in
[0:30:40] parallel. They can assign themselves.
[0:30:41] You can also, you know, use the Jira MCP
[0:30:43] server to have the the developer get
[0:30:45] assigned automatically when it picks up
[0:30:47] a piece of work. You can create a system
[0:30:50] in your task management software where
[0:30:52] really agents are managing everything.
[0:30:55] It's kind of like the the whole COXOS
[0:30:58] that Leor was showing you guys where you
[0:31:01] have the agent managing all of the grunt
[0:31:03] work of organizing and um you know all
[0:31:06] of the you know CRUD operations of
[0:31:08] creating tasks and updating them and
[0:31:09] assigning them and everything. We can
[0:31:11] have agents manage all of that with the
[0:31:13] Jira MCP server. And I'll show you guys
[0:31:16] what that looks like. If if you go into
[0:31:17] cloud code and do slashMCP,
[0:31:20] you can see that I have the Atlassian uh
[0:31:23] MCP server connected. So, by the way,
[0:31:25] this also gives me access to Confluence,
[0:31:27] not just Jira. So, if you wanted to like
[0:31:29] store documents in Confluence, like you
[0:31:32] wanted to store the PRD in Confluence
[0:31:34] and then have a developer load that PRD
[0:31:36] with the Jira MC or the Atlassian MCP
[0:31:38] server, they can do that as well. Um,
[0:31:40] and so if you are an Atlassian kind of
[0:31:43] shop where you have Confluence and you
[0:31:45] have Jira, you can have your coding
[0:31:46] agents manage all of that. And it's
[0:31:48] really the same thing no matter the
[0:31:49] platform that you're using. And so the
[0:31:51] way that I have this MCP server
[0:31:53] configured is just with this um MCP.json
[0:31:56] file. And if you're curious how I set
[0:31:59] this up, this is the crazy thing, guys,
[0:32:02] is that you can have Claude Code help
[0:32:04] you with anything. It has access to its
[0:32:07] own documentation. So if you say, you
[0:32:09] know, help me copy over Koh's commands,
[0:32:12] and you just give it the path, it can
[0:32:14] bring all that into your own project or
[0:32:16] you say, help me set up the Atlassian
[0:32:18] MCP server. It'll search the web. It'll
[0:32:21] pull the exact configuration. It knows
[0:32:23] to create a file called MCP.json. It'll
[0:32:27] set up everything for you. The the time
[0:32:30] in in our world where we had to be
[0:32:32] technical to do these kinds of things is
[0:32:34] no longer here, right? like a product
[0:32:37] manager, a QA engineer can use cloud
[0:32:40] code to do any part of their job just
[0:32:41] like a developer can because you don't
[0:32:43] have to know how to run commands or set
[0:32:45] up MCP servers anymore. I mean, yes,
[0:32:48] it's still helpful just in case the
[0:32:50] coding agent trips up. So, it's faster
[0:32:52] for a developer, but uh also coding
[0:32:55] agents are really good at debugging
[0:32:56] things. If the MCP server doesn't
[0:32:58] connect right away, you can ask it like,
[0:33:00] "Hey, I'm getting this error. Help me
[0:33:02] figure it out." maybe like search the
[0:33:03] web for some more Atlassian
[0:33:05] documentation for example and so really
[0:33:08] for like all these things I didn't
[0:33:09] configure that all myself like I have my
[0:33:12] repository of commands and skills I
[0:33:14] pointed cloud code there and I said all
[0:33:16] right Claude for this AI transformation
[0:33:17] workshop that I'm doing with Leor I want
[0:33:19] you to set up a brand new repository and
[0:33:22] bring in my resources and customize it
[0:33:24] to work with Jira instead of GitHub for
[0:33:26] example and it it just did all of that
[0:33:28] for me. So, a little bit meta there, but
[0:33:30] I hope that demonstration is um is cool
[0:33:33] just to see like how easy it is to get
[0:33:35] anything configured in your AI coding
[0:33:37] environment. And so, for all these
[0:33:39] resources that I share with you, you
[0:33:40] don't even have to bring them in
[0:33:42] yourself.
[0:33:44] So, we can see that it created all of
[0:33:46] the stories here and then it asked me a
[0:33:48] question like, do you want to push to
[0:33:49] Jira now? So, I said yes. And now it's
[0:33:52] going to take advantage of that
[0:33:53] Atlassian MCP server to populate
[0:33:56] everything. And so I don't think we'll
[0:33:58] have it yet. Let me refresh the page.
[0:34:00] But we'll in just a second here we'll
[0:34:01] start to see things get populated. I
[0:34:03] think it's in the middle of reasoning
[0:34:05] through that.
[0:34:08] Okay. Yep. So we can see that the token
[0:34:10] count go up as it is formulating those
[0:34:13] tool calls basically. So the agent is
[0:34:16] performing these operations under the
[0:34:17] hood. And we're almost done with the
[0:34:19] first step by the way. And once we get
[0:34:21] into the piv loop, things go pretty
[0:34:23] quickly because we're doing so much of
[0:34:25] the work up front with our ideation. So
[0:34:27] we're getting to this stage right now
[0:34:29] where we are getting our tickets in
[0:34:31] Jira. And then we'll pick a ticket and
[0:34:33] then this is where we just rip through
[0:34:35] the implementation with the piv loop. So
[0:34:38] all right, let's uh go back to claude
[0:34:40] and see where we are at.
[0:34:43] All right, calling at lassian seven
[0:34:45] times. You can also include do control O
[0:34:48] so that you can uh see the full tool
[0:34:50] call if you want some more visibility
[0:34:52] into what it's doing. So it's using the
[0:34:54] create issue MCP tool. It's got my ID,
[0:34:58] the project, all the things that we
[0:35:00] specified as parameters like the epic
[0:35:03] and the green circle here means that the
[0:35:05] tool call actually finished. So I'll do
[0:35:07] control O to decompress again and then
[0:35:10] go back over. And now when I refresh,
[0:35:12] we'll see some or maybe even all of the
[0:35:15] issues created or tickets I should say.
[0:35:18] Take a look at that. So we don't have
[0:35:19] all of them yet. It's in the middle of
[0:35:21] running those tool calls, but we have
[0:35:22] things populated already. And the cool
[0:35:25] thing here is if we click into any one
[0:35:26] of these
[0:35:28] like um let's say I'll just click into
[0:35:30] the first one for example at14. If I
[0:35:33] click into this, we have a lot of
[0:35:35] context given here in the ticket as
[0:35:38] well. So another really cool thing is
[0:35:40] like for a product manager usually your
[0:35:43] description isn't even going to be this
[0:35:45] good because you don't have full context
[0:35:47] for the more technical details. So you
[0:35:49] can also use claude to provide more
[0:35:52] context to the developers up front if
[0:35:53] you want to work with it to you know
[0:35:55] create this kind of issue description.
[0:35:56] And of course for the ticket
[0:35:58] descriptions it's entirely up to you and
[0:36:00] your commands for what exactly you'd put
[0:36:03] here. Like in my create stories command,
[0:36:05] I specifically said I want the story and
[0:36:07] acceptance criteria.
[0:36:09] And then we could even add more context
[0:36:11] here. Like we could have some more
[0:36:13] research on how the coding agent would
[0:36:14] recommend doing this. We could put that
[0:36:15] as a comment here. Sometimes my cloud
[0:36:18] code will actually do that by itself.
[0:36:20] It's cool to see. Um so yeah, it's uh
[0:36:23] actually it is so it's adding technical
[0:36:24] notes as comments to each of the issues.
[0:36:27] So, not only are we creating issues, but
[0:36:29] we're providing more context as the
[0:36:31] coding agent has done some research for
[0:36:33] each of the implementations, like
[0:36:35] looking into the codebase, providing
[0:36:37] those initial suggestions for how we'
[0:36:40] build each one of these things.
[0:36:43] And so, I'll let that run in the
[0:36:45] background here because that's not like
[0:36:46] super important for me to have finished
[0:36:48] before I go to the next thing for you
[0:36:51] guys. And the next thing is really like
[0:36:53] let's just pick one of these and let's
[0:36:55] work on it, right? Right? Like at this
[0:36:57] point at an organization level, the
[0:37:00] product manager would take this this
[0:37:03] list and send it over to the development
[0:37:05] team. You know, might have some scrum
[0:37:07] meeting or whatever to talk about these
[0:37:09] things and and again refine things. If
[0:37:12] you uh need to like fix up any of these
[0:37:14] issues and then you go on to the
[0:37:16] development or if you are a solo
[0:37:18] developer then these might be GitHub
[0:37:20] issues that you're now going to handle
[0:37:22] one at a time. And so we just need to
[0:37:26] pick one of these to work on. And uh
[0:37:29] let's see. I'm trying to think like
[0:37:32] maybe the audience vote page would be a
[0:37:34] good one. As an audience, I want mobile
[0:37:36] first page that shows only active
[0:37:37] questions. Lets me submit my answer.
[0:37:39] Auto advances when the presenter moves
[0:37:40] on. That's a decent one. What else could
[0:37:42] I work on here? I mean, there's a lot of
[0:37:44] good features. I'm trying to like think
[0:37:45] of like the best one that would be good
[0:37:46] for a live demonstration.
[0:37:49] Uh presenter projection p. Actually,
[0:37:51] this this is a good one here cuz that's
[0:37:53] actually what I was planning for my
[0:37:54] prep. So, I want a full screen page that
[0:37:56] shows active questions, animated bar
[0:37:58] chart, real-time updates as things are
[0:38:01] coming in. That's definitely something
[0:38:03] that we're we're missing right now
[0:38:04] because this looks pretty bland for the
[0:38:06] results page. So, we'll tackle this
[0:38:08] issue first. And the really cool thing
[0:38:11] is the input into our development
[0:38:14] process just is this issue. And that's
[0:38:17] actually something I've been doing a lot
[0:38:19] more recently with AI coding assistance
[0:38:21] is my input to writing the code is
[0:38:25] always some artifact. Like for me
[0:38:27] personally, uh I do a lot kind of as
[0:38:30] more of like a solo developer or working
[0:38:31] on open source projects. So usually the
[0:38:34] GitHub issues is actually my entry
[0:38:36] point. So I'll put my artifacts here. I
[0:38:38] just wanted to show Jira because that's
[0:38:40] how so many teams work. But uh your Jira
[0:38:42] tickets like that is the input. And so
[0:38:45] going into the pivot loop here, we're
[0:38:47] going to go through a similar first step
[0:38:50] where we're just going to explore our
[0:38:52] solution. And the input into this is
[0:38:55] just one of the tickets that we pick. So
[0:38:57] the developer takes that work. You can
[0:38:59] use the Jira MCP to assign yourself and
[0:39:02] then we start exploring the solution.
[0:39:05] And so for planning with AI coding, you
[0:39:09] always have two layers. You have the
[0:39:11] project level planning and that's
[0:39:13] everything that we did here right like
[0:39:16] this is like the PM level planning and
[0:39:18] then you have the task planning and that
[0:39:21] is the individual ticket level and the
[0:39:23] important thing that I I've already
[0:39:26] explained a little bit here but I just
[0:39:27] want to be like really clear on this is
[0:39:30] the layer one planning is higher level
[0:39:33] here are the features that we want to
[0:39:34] build or the bugs we want to fix at this
[0:39:36] point we are not digging into the code
[0:39:39] now that we're peaking a single ticket
[0:39:41] for layer 2. This is where we get more
[0:39:44] in the weeds of things. This is where
[0:39:46] we're going to analyze the codebase, the
[0:39:47] documentation, figure out what parts of
[0:39:49] the codebase we actually have to touch.
[0:39:51] We're starting to dive that deep. And
[0:39:54] it's really helpful for the coding agent
[0:39:56] to do this two-step process because then
[0:39:58] now that we're getting really into the
[0:40:01] weeds of things, we already have a lot
[0:40:02] of context for what we want to build
[0:40:04] overall. At this point, the ticket has
[0:40:06] translated the stakeholder or business
[0:40:08] requirements, whatever you want to call
[0:40:09] it. And we maybe even have some higher
[0:40:11] level recommendations for what part of
[0:40:13] the code we want to touch. And now we're
[0:40:16] just really getting into that. So just
[0:40:18] like creating our PRD, when we are
[0:40:21] creating the actual implementation, we
[0:40:23] start very unstructured. We're just
[0:40:26] going to have a conversation with our
[0:40:27] coding agent figuring out how should we
[0:40:30] go about solving this problem, fixing
[0:40:32] this bug, you know, implementing this
[0:40:35] new feature, whatever that is. And then
[0:40:37] we go from unstructured to structured.
[0:40:40] So this is very similar like creating a
[0:40:42] plan for implementation is very similar
[0:40:45] to creating a PRD. And we're going to
[0:40:46] have a command for planning out the
[0:40:48] feature just like we have a command for
[0:40:51] creating our PRD. And so I'll show you
[0:40:54] guys what this looks like right now. So
[0:40:56] I'm going to go back into my codebase
[0:40:59] here and I'm going to begin a brand new
[0:41:02] conversation. So let me escape out of
[0:41:04] this. I have a brand new conversation
[0:41:05] with Claude because you can imagine that
[0:41:07] like you as a developer, you are picking
[0:41:10] up a single ticket and you don't have
[0:41:12] any context around creating the PRD or
[0:41:14] stories or anything. So we're going to
[0:41:16] pretend like this conversation doesn't
[0:41:18] exist because it's going to be someone
[0:41:20] else doing this or maybe you doing it at
[0:41:23] a different time. So brand new
[0:41:24] conversation. The first thing that I
[0:41:26] always do when I am preparing for an
[0:41:29] implementation is I run what is called a
[0:41:32] prime command. So another example of if
[0:41:35] you're going to prompt a coding agent to
[0:41:37] do something over and over again, just
[0:41:38] turn it into a prompt. Turn it into a
[0:41:41] command because that way we don't have
[0:41:43] to type it out again. And so this prime
[0:41:46] command quite simply its job is to walk
[0:41:49] a coding agent through understanding the
[0:41:51] codebase. We want to know what we
[0:41:53] already have to help us think about what
[0:41:56] comes next. Right? So we're going to
[0:41:57] load external context which this is
[0:42:00] where we can specify confluence pages or
[0:42:02] Jira tickets that we want it to
[0:42:03] understand. In our case we are actually
[0:42:06] going to specify a Jira issue. Right?
[0:42:08] We're going to understand the codebase
[0:42:11] from the lens of this Jira ticket. this
[0:42:13] new thing that we want to build, but
[0:42:15] also aside from that, we're just going
[0:42:17] to generally understand the codebase.
[0:42:19] So, we're going to study the features.
[0:42:21] We're going to study app routes. We're
[0:42:23] going to check recent git commits. I
[0:42:25] love using git as long-term memory for
[0:42:28] my coding agents. So, a lot of times
[0:42:30] what you've done recently in a codebase
[0:42:32] is going to help guide what you do next
[0:42:34] because you're going to look at like the
[0:42:35] code patterns you followed for recent
[0:42:36] commits and things like that. This is a
[0:42:38] a very very powerful part of any new
[0:42:41] conversation with a coding agent. And
[0:42:43] obviously the steps that you want your
[0:42:45] coding agent to go through to analyze
[0:42:47] the codebase is very custom to your
[0:42:50] codebase. So all of the commands that I
[0:42:53] have here are starting points for you,
[0:42:56] but you're always going to get the most
[0:42:57] out of them if you customize the
[0:42:59] commands to your process, your
[0:43:01] architecture, your code bases. And so
[0:43:04] I'll start by running a slashp prime
[0:43:06] here. And one of the arguments that we
[0:43:08] have is a comma-epparated list of Jira
[0:43:11] issues. And so for example, uh going
[0:43:15] back to our browser here in Jira,
[0:43:18] um I just want to use um this issue
[0:43:21] right here. So the ID for it is AT23
[0:43:26] for our uh presenter projection page. So
[0:43:30] I'll do slashprime and then just AT23.
[0:43:33] So it's going to understand the entire
[0:43:34] codebase but also from the lens of this
[0:43:37] issue. So first it'll use the Atlassian
[0:43:40] or Jira MCP server to pull that context.
[0:43:43] I can do control O and we can see right
[0:43:44] here that uh first it's listing
[0:43:47] accessible resources and then it's going
[0:43:49] to call the tool to get that specific
[0:43:51] issue. It's performing a bunch of reads
[0:43:53] here. Also looking at the git logs in
[0:43:55] parallel. There's just a ton of context
[0:43:57] loading that it's doing at the exact
[0:43:58] same time here. Now, you want to be
[0:44:00] careful to not load too much context
[0:44:02] into your coding agent because it's not
[0:44:04] like you want, you know, 50% of your
[0:44:06] coding agent's context window to be just
[0:44:08] loaded with a bunch of research it's
[0:44:10] doing, but we definitely want to load in
[0:44:12] the core files and the core uh history
[0:44:15] of what we've done recently. And so, if
[0:44:18] you ever want to, you know, tweak that
[0:44:19] lever of how much context you're
[0:44:22] bringing into a session up front, it's
[0:44:24] just you change the prime command,
[0:44:26] right? Like you change this over time.
[0:44:28] Like maybe you only load in the first
[0:44:29] part of a Jira issue or you only read
[0:44:31] from this part of the codebase. It's
[0:44:33] totally up to you for how you formulate
[0:44:35] your commands to optimize things for
[0:44:37] your process. So here we go. Project
[0:44:39] context loaded. We are going to be
[0:44:42] handling the presenter projection page.
[0:44:43] So it pulled full context there. Gives
[0:44:45] me a quick summary of my codebase.
[0:44:49] And um yeah, I think we're we're good to
[0:44:51] go. Um though it actually it actually
[0:44:53] says something interesting here. So this
[0:44:55] is really cool. This is a good uh live
[0:44:57] teaching moment. It is able to recognize
[0:45:00] based on querying my state in Jira that
[0:45:03] there are some blockers that we need to
[0:45:06] take care of before we could really go
[0:45:08] on to AT23. So it understands the
[0:45:11] dependency mapping. That is actually one
[0:45:13] of the things that I have built into
[0:45:15] create stories here where it can help
[0:45:17] you understand dependencies. So maybe we
[0:45:19] would actually have to handle AT22 with
[0:45:21] a QR code first. And um I think this is
[0:45:25] this is something that we'll take on. So
[0:45:26] maybe we'll do like okay look at AT22.
[0:45:30] What do we need to implement for that?
[0:45:34] Right? We're starting very unstructured
[0:45:35] in our planning here. We're actually
[0:45:37] shifting gears right away which is
[0:45:38] totally okay. But we're just going to
[0:45:39] have it get a little bit of
[0:45:41] understanding of this feature that we
[0:45:43] want to build and we'll start to
[0:45:45] ideulate there. So we're going to
[0:45:47] explore how we want to build this,
[0:45:49] understand the codebase, and then get
[0:45:51] into that structure plan that we'll go
[0:45:54] and send into implementation.
[0:45:57] And so at this point, uh, we have full
[0:46:00] context from the issue. But now we just
[0:46:03] do a little bit of exploration. And what
[0:46:04] this looks like totally is up to your
[0:46:06] own process. In fact, this is one of the
[0:46:07] things that I don't actually have as a
[0:46:10] command because it's very free form at
[0:46:12] this point. So I can, you know, for
[0:46:13] example, go into my speech to text tool
[0:46:15] and say, "All right, let's build AT22. I
[0:46:18] want you to spin up a few sub agents to
[0:46:21] research the codebase and help me
[0:46:23] ideulate around uh how I would build
[0:46:26] this new feature into our poll
[0:46:28] application.
[0:46:29] So just like a really quick prompt here
[0:46:31] and also showing you sub agents because
[0:46:34] sub aents is something that I use all of
[0:46:36] the time for research. If you aren't
[0:46:39] familiar, sub aents is basically a way
[0:46:42] for you to spin up a subprocess, another
[0:46:46] agent that runs under the hood to go and
[0:46:49] look at a bunch of things or perform a
[0:46:51] bunch of work and then report back a
[0:46:53] summary to our main cloud code agent
[0:46:55] here. And it's really powerful for
[0:46:57] research because when we are exploring a
[0:47:01] codebase or doing web research, we are
[0:47:03] loading in tens of thousands of tokens
[0:47:05] of information. Like you can see that
[0:47:07] this one already loaded in 32,000
[0:47:09] tokens. We are going to completely
[0:47:12] overwhelm our main agent if we had it do
[0:47:15] all the research by itself. And with
[0:47:18] research, you really only need a quick
[0:47:19] summary at the end, right? Like here are
[0:47:21] generally the files that we have to
[0:47:23] edit. Or if you're doing web research,
[0:47:24] like here are the core articles that you
[0:47:26] should read that would help with best
[0:47:28] practices for this tech stack. So we've
[0:47:31] already used over a 100,000 tokens here,
[0:47:33] but we only have a few thousand tokens
[0:47:35] that are returned back to our main
[0:47:37] agent. And so yes, with claude code with
[0:47:41] we now have the 1 million token limit
[0:47:43] with Opus. And there are a lot of other
[0:47:45] models through codeex and GitHub copilot
[0:47:47] and everything where you have 1 million
[0:47:48] tokens. But here's the thing, just
[0:47:51] because you can fit a million tokens
[0:47:54] into a large language model does not
[0:47:56] mean that you should because they get
[0:47:58] overwhelmed just like people do. So we
[0:48:00] want to deploy strategies for managing
[0:48:03] context. Well, sub agents is one of the
[0:48:05] best strategies for that. So we just
[0:48:08] have to wait for these three exploration
[0:48:11] agents to finish and then our main agent
[0:48:13] will get back a summary so it can
[0:48:14] reason. We can see that these are all
[0:48:16] done now. So it'll reason about what
[0:48:17] these sub agents did and then it'll
[0:48:19] provide me a final output here with its
[0:48:22] recommendation for how we can handle
[0:48:24] this Jira ticket. And so at this point,
[0:48:28] uh, going back to our diagram here,
[0:48:30] we're still at this initial exploration,
[0:48:33] right? Like we're going to explore
[0:48:34] ideas, architecture, concepts, text
[0:48:36] stack. I'm not going to go through each
[0:48:38] one of these things right now for the
[0:48:39] sake of speed, but this is our chance to
[0:48:42] ask questions or like we did when we
[0:48:44] created the PRD, have it ask us
[0:48:47] questions as well because it's important
[0:48:49] to remove assumptions going into writing
[0:48:51] the actual code. It might even be more
[0:48:53] well probably not more important than
[0:48:54] assumptions in the PRD cuz the PRD is so
[0:48:57] high stakes but it it is very important
[0:48:59] as well. So we go through this process
[0:49:01] where once we feel confident that we're
[0:49:04] on the same page with the coding agent
[0:49:06] then we'll run a command that'll create
[0:49:08] a structured markdown document for our
[0:49:10] plan. We want again we we want the
[0:49:13] output of our planning process to be a
[0:49:16] single artifact and that artifact is
[0:49:18] going to contain all of the information
[0:49:21] that the coding agent needs to do the
[0:49:24] actual implementation.
[0:49:26] And so I'll show what that looks like in
[0:49:28] a little bit. But uh first I want to
[0:49:30] actually invoke the command to create
[0:49:32] the plan and then I'll explain more how
[0:49:34] it works just so that we can have things
[0:49:36] move along well for us here. So here's
[0:49:39] the synthesis with real decisions to
[0:49:40] make. Here's what we know. Okay. And
[0:49:43] three decisions worth making before
[0:49:44] coding. So it's asking me some questions
[0:49:46] here. I'm going to blitz past these for
[0:49:49] the sake of demonstration, but it is
[0:49:52] worth taking the time with this usually.
[0:49:53] So I'll do slash plan. This is my
[0:49:56] command where I can now describe the
[0:49:59] feature that I want to build. So, I'm
[0:50:01] just going to say here, go with your uh
[0:50:04] recommendations and create the plan for
[0:50:07] AT22.
[0:50:09] So, I'm just going to give it permission
[0:50:10] here to just pick whatever it wants.
[0:50:12] Usually though, it would be worth taking
[0:50:14] your time and answering these things and
[0:50:16] having it ask you more questions as
[0:50:18] well. So, while this planning command
[0:50:21] runs, not to be confused with the plan
[0:50:23] mode in cloud code, this is a separate
[0:50:24] command that I have created right here.
[0:50:26] It's very similar to the create PRD plan
[0:50:30] where we have phases laid out like
[0:50:32] here's the research you should do
[0:50:33] initially. Explore the codebase. Make
[0:50:35] sure you have full understanding for how
[0:50:37] we're going to implement it. Then create
[0:50:39] the plan file. So just like we created a
[0:50:41] prd,
[0:50:43] we're now creating a plan.md
[0:50:45] and it has our structure. So we want a
[0:50:47] summary, a user story. It's going to be
[0:50:50] similar to the PRD, but now we're
[0:50:53] getting into the weeds of how we're
[0:50:54] actually going to implement it. And so,
[0:50:56] for example, one thing that we
[0:50:57] definitely didn't have in our PRD
[0:51:00] command is the patterns to follow. Like,
[0:51:04] here here's how we're coding things.
[0:51:06] Here are the files that need to be
[0:51:07] changed. Here's the task order,
[0:51:09] everything we're going to execute down
[0:51:11] to the individual level of the files
[0:51:13] that we're going to create and update or
[0:51:15] maybe the commands that we're going to
[0:51:17] run for testing. So, also laying out
[0:51:19] upfront, how do we want our coding agent
[0:51:22] to validate its own work? Because when
[0:51:24] we get into the implementation, we're
[0:51:27] going to send this plan into the coding
[0:51:29] agent. We are going to delegate all of
[0:51:32] the coding to the coding agent. And the
[0:51:34] only reason that I'm comfortable doing
[0:51:36] that is because I still find myself in
[0:51:38] the driver's seat because I'm a part of
[0:51:40] the planning process. I'm iterating on
[0:51:42] the plan. I'm doing the exploration and
[0:51:45] having it ask the right questions. And
[0:51:47] so we'll have it write the code and then
[0:51:49] we'll also have it do some of the
[0:51:51] validation, right? Like we can have the
[0:51:53] coding agent right after it does the
[0:51:54] implementation. We can have it write the
[0:51:56] unit tests, write the integration tests,
[0:51:58] do the linting and the type checking. It
[0:52:00] can take care of all of these things.
[0:52:02] Not that it's going to be perfect, but
[0:52:04] the point is we want it to take care of
[0:52:05] as much validation as possible so that
[0:52:08] by the time control passes back to us
[0:52:10] for our human validation, there's less
[0:52:13] that needs to be corrected. Right? We
[0:52:15] want to reduce us being the bottleneck
[0:52:18] for actually shipping the code that
[0:52:19] we're creating with the help of our
[0:52:21] coding agents. And so I'll jump back
[0:52:23] over to the codebase here. And we can
[0:52:25] see that our plan file is created. I'll
[0:52:28] take a look at this really quick. Uh
[0:52:30] just another one of those things that I
[0:52:31] don't want to spend the time iterating
[0:52:33] on too much right now. But we have the
[0:52:35] summary of our work. Uh we have the
[0:52:37] decisions that we've locked in. These
[0:52:39] are the things that we would have been
[0:52:40] working with the coding agent to
[0:52:41] establish. And then um we even have like
[0:52:44] the individual files that need to be
[0:52:46] created and updated. And then we have
[0:52:49] the task list.
[0:52:51] So usually the task list you don't
[0:52:53] create as Jura tickets, right? Because
[0:52:55] this is like so granular that this is
[0:52:57] for a single coding agent
[0:52:58] implementation. So you let the coding
[0:53:00] agent handle an internal task list as it
[0:53:04] is writing the code. And then we have
[0:53:06] the self- validation. So it's going to
[0:53:08] be running the type checking and linting
[0:53:09] and unit testing. We could also have it
[0:53:11] do endtoend testing if we wanted to use
[0:53:13] browser automation tools with um you
[0:53:16] know the agent browser CLI for example.
[0:53:18] So that's actually one of the skills
[0:53:19] that I have for you guys here. I can
[0:53:21] spin up the browser and navigate through
[0:53:23] it and like create polls and and vote on
[0:53:25] the polls just like a user would. And so
[0:53:28] for the sake of speed I won't do that
[0:53:29] but you can have coding agents do very
[0:53:31] very endto-end testing. You want it to
[0:53:33] validate as much as possible. So the
[0:53:36] important thing here is once you have
[0:53:38] iterated on the plan and you're
[0:53:40] confident in everything, you actually
[0:53:42] don't do the implementation right here,
[0:53:45] we want to start a brand new session
[0:53:48] with Claude code. So I'm going to open
[0:53:49] up a a fresh blank slate with Claude.
[0:53:53] The reason that I want to do this is
[0:53:56] because when you are working with AI
[0:53:58] coding assistants, you want to make sure
[0:54:00] that they are as focused as possible.
[0:54:03] And it's important to be focused in
[0:54:05] order to be focused to do your planning
[0:54:07] and implementing in separate sessions
[0:54:09] because also the coding agent has
[0:54:11] probably built up a lot of bias
[0:54:13] throughout this conversation as we've
[0:54:15] been working with it. We wanted to have
[0:54:16] a fresh set of eyes on the problem going
[0:54:18] into implementation. And so of course I
[0:54:21] have an execute command. And so all I
[0:54:24] have to do is slashimplement and then I
[0:54:26] give it the path to the plan that I
[0:54:28] created in the prior session. And the
[0:54:30] whole point of this markdown artifact is
[0:54:33] that it has all of the context that the
[0:54:35] coding agent needs to implement because
[0:54:37] it has the summary. It has the
[0:54:39] recommended files to change and the task
[0:54:40] list and the validation strategy.
[0:54:42] There's no reason for us to stay within
[0:54:43] this other context window in the first
[0:54:45] place. So I can send off this command.
[0:54:47] It's going to read the plan and then
[0:54:49] it's going to walk through the process I
[0:54:51] have in the implement command to do the
[0:54:53] implementation and the validation. And
[0:54:56] this um command that I have for
[0:54:58] implementation is actually very very
[0:55:01] concise. It's u only like a couple of
[0:55:04] hundred lines long here because really
[0:55:06] it's the the plan that guides the entire
[0:55:09] development.
[0:55:10] The main thing that I'm walking it
[0:55:12] through here is just the process of you
[0:55:14] know loading the plan preparing the
[0:55:17] implementation like maybe making a new
[0:55:18] git branch for example like any kind of
[0:55:20] of uh process that you have in your
[0:55:22] usual software development life cycle
[0:55:23] for how you want an engineer to work.
[0:55:25] We're just encoding that into the
[0:55:27] command here. We want to make sure that
[0:55:29] we're verifying any kinds of
[0:55:31] assumptions. So we're also sort of doing
[0:55:32] like a second pass on the plan before we
[0:55:35] go into the implementation. So yeah,
[0:55:37] then describing how we want to do
[0:55:38] validation for example, when we want to
[0:55:41] pass control back to the user, outlining
[0:55:43] all of that for the agent. And so going
[0:55:46] back to our diagram here, we're in this
[0:55:47] step right now, right? We we've cut a
[0:55:50] fresh session, sent the plan into
[0:55:52] implementation, and then we'll wait for
[0:55:55] it to write the code, do all of its own
[0:55:56] validation, and then we'll also step in
[0:55:59] and we'll do a code review. Right? And
[0:56:01] it's not like you have to do this. Uh,
[0:56:03] some people are are a big fan of just
[0:56:07] shipping the code right to production
[0:56:08] and having the coding agent do its own
[0:56:10] work. I'm you I'm not a fan of that
[0:56:12] myself. I still the engineer in me still
[0:56:14] wants to review all the code. So for any
[0:56:16] like serious production coding that I'm
[0:56:17] doing, I still am reviewing all the code
[0:56:20] myself and then also doing manual
[0:56:22] testing. And so we can see that after we
[0:56:24] do the implementation like I'll refresh
[0:56:26] the page here and we'll we'll check out
[0:56:27] this new feature. like we'll see the QR
[0:56:29] code that's generated and we'll make
[0:56:31] sure that's all working before we would
[0:56:33] actually be confident to you know merge
[0:56:34] that pull request into our main branch
[0:56:37] for example or whatever that looks like
[0:56:38] for your software development life cycle
[0:56:40] going into production. So that review is
[0:56:43] important and um you know while we wait
[0:56:46] for the coding agent to run through
[0:56:49] everything here you can see that it
[0:56:51] created its internal task list based on
[0:56:52] the plan. It's writing the code doing
[0:56:54] all the testing. It's actually going to
[0:56:55] get through this feature pretty quick
[0:56:56] because I purposely built a simple one.
[0:56:58] Uh, but as it is doing this, I want to
[0:57:01] quickly talk about the last part of the
[0:57:04] system here. Um, and then of course
[0:57:06] after this, we'll we'll quickly get into
[0:57:08] time for a Q&A with uh with Leor too. So
[0:57:12] the last thing I want to talk about is
[0:57:14] system evolution.
[0:57:16] So when whenever we do a piv loop, it is
[0:57:20] very very far from guaranteed
[0:57:23] that the implementation will be perfect.
[0:57:26] Coding agents are not perfect. They are
[0:57:29] non-deterministic by nature. Even if we
[0:57:31] work super super hard to align with it
[0:57:34] in the planning phases, there are still
[0:57:37] going to be mistakes. But the powerful
[0:57:40] part of this system is we don't have to
[0:57:42] just treat the bug as a one-off fix that
[0:57:45] we address and then move on to the next
[0:57:47] pivot loop or move on to that next
[0:57:48] ticket. We can spend some time to fix to
[0:57:52] also fix the system that allowed the
[0:57:55] bug. And what I mean by that is we can
[0:57:58] have a sort of you know retroactive
[0:57:59] session with the coding agent where we
[0:58:01] say okay Claude you allowed this problem
[0:58:04] to creep into my codebase. I want you to
[0:58:07] dive into your AI layer. Like take a
[0:58:10] look at the at your rules. Take a look
[0:58:13] at your commands and skills, the
[0:58:14] process, the workflow that I brought you
[0:58:16] through. And I want you to identify
[0:58:19] things that we could improve there so
[0:58:21] that this kind of issue doesn't happen
[0:58:23] again. Like for example, maybe it broke
[0:58:26] something in the polling here where um I
[0:58:30] don't know, let's say that like all of a
[0:58:32] sudden the website looks really ugly
[0:58:34] when it when it built this new feature
[0:58:36] because it didn't like create the same
[0:58:38] it didn't create the component in the
[0:58:39] same style as the rest of our codebase.
[0:58:41] Well, maybe that means that there's
[0:58:42] something in our global rules that we
[0:58:43] have to update for like our style
[0:58:45] conventions. Or maybe we need to build
[0:58:48] something into our our validate workflow
[0:58:51] where whenever we validate the codebase,
[0:58:53] we make sure that like any new front-end
[0:58:54] component that we build is in compliance
[0:58:57] with the styles of our other components
[0:58:59] that are already in the codebase. Just
[0:59:01] kind of a random example I'm giving you
[0:59:03] there. But the point is generally when
[0:59:05] your coding agent does something wrong,
[0:59:07] there's going to be something in the
[0:59:09] context you give it that you can improve
[0:59:11] to not necessarily for sure fix the
[0:59:13] problem, but you're using it as an
[0:59:15] opportunity to continue to evolve your
[0:59:17] AI layer, making your rules more
[0:59:19] specific over time, making your
[0:59:21] workflows more reliable. And the best
[0:59:23] part of this is when you use every
[0:59:26] single Jira ticket as potentially an
[0:59:28] opportunity to improve your system, you
[0:59:30] get to improve the whole process for
[0:59:33] everybody because you can check in your
[0:59:36] rules and commands and skills into
[0:59:37] source control just like your codebase.
[0:59:39] The entire team can reuse these things
[0:59:42] and you can even create pull requests to
[0:59:44] update commands just like you create
[0:59:46] pull requests to update your codebase.
[0:59:48] So you can do code reviews making sure
[0:59:50] that everyone's in line with the changes
[0:59:52] you're making. I know that sounds like a
[0:59:54] decent amount of work, but it's so high
[0:59:56] leverage because every single time you
[0:59:58] improve a command or a skill, it might
[1:00:01] save engineers dozens and dozens of
[1:00:03] hours going forward because you've now
[1:00:04] made the validation process more
[1:00:06] reliable or you've made the style
[1:00:08] conventions respected more often,
[1:00:10] whatever that might end up looking like.
[1:00:13] And so really like the four things that
[1:00:15] I generally improve over time in a
[1:00:17] codebase is my commands, my ondemand
[1:00:21] context. This could also even mean like
[1:00:22] things in confluence. You just, you
[1:00:24] know, optimize your documents in
[1:00:25] Confluence for AI understanding your
[1:00:28] global rules and then also of course
[1:00:29] like your plan and PRD templates. You
[1:00:32] might want to to find and fix gaps in
[1:00:34] those over time. And so for every single
[1:00:37] codebase, I'm constantly doing this,
[1:00:40] right? Like if I have a piv loop where
[1:00:41] there is some kind of major issue, I
[1:00:44] step outside of the pivot loop to do
[1:00:47] this system evolution,
[1:00:49] I will update things that I created up
[1:00:51] front and then I'll go into the next piv
[1:00:53] loop. And if if actually there are no
[1:00:57] issues at all and the coding agent
[1:00:59] completely rocked that Jira ticket, then
[1:01:01] literally you just loop right back,
[1:01:03] right? You go through the planning
[1:01:04] process, you load that next Jira ticket
[1:01:06] and you go through the process. So it
[1:01:07] becomes very very cyclical. There's
[1:01:09] basically two loops here. You have the
[1:01:10] inner loop when everything's working
[1:01:12] well and you're just chugging through
[1:01:13] the work with the help of your coding
[1:01:15] agent. And then you have the outer loop
[1:01:17] when you're taking some time to reflect
[1:01:19] and make your system better. So, it's
[1:01:21] not like you always have to do the outer
[1:01:23] loop, but I encourage you to do it
[1:01:25] pretty often because not only are you
[1:01:28] improving your your commands and other
[1:01:30] parts of your system here, but you are
[1:01:32] also customizing your process to your
[1:01:35] specific codebase over time. It's like
[1:01:37] what I said, all of the commands and
[1:01:39] skills that I have for you guys here,
[1:01:41] they're a starting point, but they're
[1:01:42] more general, right? Like if you want to
[1:01:44] really optimize something for your
[1:01:46] process, you're going to start with
[1:01:47] these, find opportunities to make them
[1:01:49] more specific to your validation
[1:01:51] strategy or your planning strategy,
[1:01:53] whatever that might be. So, I hope that
[1:01:56] makes sense. I mean, that really is the
[1:01:57] whole process at a high level here. And
[1:02:00] so, I'm going to head back to Claude
[1:02:02] here and see where we are at. Okay, so
[1:02:04] the implementation is complete. We did
[1:02:06] it in a branch because our
[1:02:07] implementation command told it to. We
[1:02:09] ran all of our validation here. Here are
[1:02:12] the files that are changed. It's giving
[1:02:13] us a summary of everything that was
[1:02:14] done. It says that the implementation
[1:02:16] matched the plan. So I also have a part
[1:02:18] of the process here. This is actually
[1:02:20] something I did recently for my system
[1:02:22] evolution where after it does the
[1:02:23] implementation, it looks at the code and
[1:02:25] compares it to the plan to make sure
[1:02:27] that we didn't deviate. And then it also
[1:02:30] used the uh MCP server from Atlassian to
[1:02:33] update the ticket. So there's a lot of
[1:02:35] the admin work that we did as well, you
[1:02:37] know, creating the branch, creating the
[1:02:38] pull request, updating the Jira ticket.
[1:02:41] We don't have to have the developer
[1:02:42] spend their time doing that stuff
[1:02:44] retroactively. So now if I go back and I
[1:02:46] refresh my page here in Jira, we can see
[1:02:49] that uh everything is to-do except for
[1:02:51] this one piece of work that we picked up
[1:02:53] here. And I believe I think I think it
[1:02:55] also said there was even a comment. Yep,
[1:02:56] here we go. So it also posted a comment
[1:02:59] with full details. And maybe this is
[1:03:01] more, you know, context than we'd really
[1:03:03] want as a comment on a Jira ticket. But
[1:03:05] if you have a problem with this, then
[1:03:07] that would, you know, also be an
[1:03:09] opportunity for system evolution where
[1:03:11] you just specify in the implement
[1:03:12] command once you're done with your
[1:03:13] implementation, here is a more concise
[1:03:16] version of context that I'd want you to
[1:03:17] comment on the JR ticket. So now we can
[1:03:19] have this going into a code review, send
[1:03:21] it off to, you know, your VP to go and
[1:03:23] review, you know, whatever that is. So
[1:03:26] pretty cool. And then we can also test
[1:03:27] this in the application here. So, I'm
[1:03:30] going to refresh here. I'll create a new
[1:03:32] poll. Um, let's say what's for lunch and
[1:03:35] we'll just say um spicy mango chicken
[1:03:40] or spicy mango beef. All right, cool.
[1:03:43] So, I'll create this poll. And uh I
[1:03:45] don't actually see the QR code. I might
[1:03:47] need to restart the application. I think
[1:03:48] that might be why. So let me go back
[1:03:50] here and say uh all right I want you to
[1:03:52] restart the application and then use the
[1:03:54] agent browser skill so you can visit it
[1:03:57] and make sure we have the QR code and
[1:03:59] then let let me know like how I can see
[1:04:00] the QR code myself.
[1:04:03] All right so yeah I think I just have a
[1:04:04] stale version of the application.
[1:04:07] Um yeah so also I mean if I want to like
[1:04:11] look at more context I can literally
[1:04:12] just go to the ticket here. So we have a
[1:04:15] server helper. I mean, this is like a
[1:04:17] bit more technical. Like, honestly, I
[1:04:19] would probably rather have a higher
[1:04:20] level overview of what was actually
[1:04:21] built. Uh, again, something you could
[1:04:23] just change in the command.
[1:04:25] Um, but yeah, so let me go ahead and
[1:04:28] jump back over, see what Claude said.
[1:04:33] Um, code utility. There's no consumer of
[1:04:36] it yet. Oh, got it. Okay. So, it built
[1:04:39] out the code, but we need to actually
[1:04:41] make it so that the front end consumes
[1:04:43] it. Um, I want you to quickly uh
[1:04:46] implement the consumer just really fast.
[1:04:49] No validation, no GR ticket. Just go and
[1:04:50] add this right now so that I can see it
[1:04:52] live. Okay. So, that that's my bad. I
[1:04:55] didn't catch the fact that this was just
[1:04:57] getting the pipe the piping in place.
[1:04:59] And then it is that follow-up issue that
[1:05:01] we're originally looking at that does
[1:05:02] the presentation. So, that's on me. So,
[1:05:05] everything is working as intended, but
[1:05:07] we just have to
[1:05:09] Okay, so it created a QR demo page. So
[1:05:13] we can we can quickly look at that. So
[1:05:14] we'll see that in a second once it um
[1:05:17] once it does its own validation. So I
[1:05:20] I'm also showing a live demonstration of
[1:05:21] the agent browser where we can see it
[1:05:24] open up the website and uh it'll even
[1:05:26] like take a screenshot to and v validate
[1:05:29] things visually too. And then of course
[1:05:31] in parallel we can do the exact same
[1:05:33] thing. So I'll go back to the
[1:05:34] application and then I'll just do QR
[1:05:36] demo. Pretty cool. So yeah, I know that
[1:05:39] uh this is just a placeholder here, but
[1:05:41] I told it to build something quick to
[1:05:43] validate the piping that we put in
[1:05:44] place. And so then when we go on to the
[1:05:46] next issue, the one that was depending
[1:05:48] on this, then that's when we build in
[1:05:50] the full presentation view and actually
[1:05:51] use the the QR code for real. And again,
[1:05:54] the point of this isn't to show the full
[1:05:55] application, but just the process that
[1:05:57] builds these kinds of things.
[1:06:00] So all right, uh that that is that is
[1:06:03] really the process as a whole. We've
[1:06:05] covered we've covered it all from
[1:06:07] planning all the way to system evolution
[1:06:09] and creating those pull requests,
[1:06:10] getting that code into production. And
[1:06:13] uh I do want to reiterate that like this
[1:06:15] process it takes a good amount of time.
[1:06:18] It's it's not like you're going to blitz
[1:06:20] through something as fast as me. it it
[1:06:22] can be if you want but uh the important
[1:06:24] thing is even if you do take a lot of
[1:06:26] time iterating on the plans and
[1:06:27] validating the code it's still going to
[1:06:29] save you so many hours of work creating
[1:06:32] those documents updating things in Jira
[1:06:34] writing the code that the days are gone
[1:06:36] now of going to Stack Overflow in order
[1:06:39] to get your questions answered you don't
[1:06:41] have to copy and paste and be a Stack
[1:06:44] Overflow warrior anymore so yeah there
[1:06:47] you go that is the full process for AI
[1:06:49] coding it's foundational and simple
[1:06:52] enough where you can take this and mold
[1:06:53] it to whatever your software development
[1:06:55] process is.