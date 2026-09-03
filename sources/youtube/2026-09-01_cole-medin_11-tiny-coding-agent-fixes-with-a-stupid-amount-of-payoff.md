---
title: "11 Tiny Coding Agent Fixes With A Stupid Amount Of Payoff"
type: "youtube"
channel: "Cole Medin"
date: "2026-09-01"
resource: "https://www.youtube.com/watch?v=UbylWXukvR8"
pillar: "building"
tags: [claude-code, agents, workflow, best-practices, context-engineering]
timestamp: "2026-09-03"
extraction_method: "auto-captions"
video_id: "UbylWXukvR8"
duration: "17:29"
---

[00:00] Throughout my time as an engineer and
[00:02] builder with coding agents, even before
[00:04] generative AI, I've often found that the
[00:07] best guidance comes in the form of
[00:09] simple tips and tricks that have a
[00:10] disproportionately large benefit to my
[00:12] work. You don't always have to scrap
[00:15] your workflow for something new to make
[00:17] your coding agents better or
[00:18] fundamentally change the way that you
[00:20] use them. In fact, you're probably sick
[00:22] of hearing that. So, what I have for you
[00:24] right now in this video is 11 tips and
[00:25] tricks to make your coding agents more
[00:27] reliable. The kinds of things that are
[00:29] easy for you to simply keep in mind or
[00:31] tweak your workflow a little bit. I'm
[00:32] not asking you to scrap anything. These
[00:35] make a big difference for me, and even
[00:37] if you find a few of these to
[00:38] incorporate for yourself, something you
[00:40] haven't really thought of before, that
[00:42] is a big win. That's really going to
[00:43] help you out. So, I want this to be nice
[00:45] and concise. I'm not going to waste any
[00:46] of your time. I'll spend just a minute
[00:47] or two on each one of these strategies.
[00:49] I could make an entire video on any of
[00:51] these as well. So, also let me know in
[00:53] the comments if any of the tips or
[00:55] tricks that I go through here you'd want
[00:57] me to expand on more in a future video.
[00:59] Cool. So, two things quick before we
[01:01] dive in. First is that everything we
[01:02] cover here is going to apply no matter
[01:04] the coding agent that you're using. I'll
[01:06] use Claude Code for a couple of demos
[01:08] here, but it's all universal. The second
[01:10] thing is you might already be
[01:12] incorporating some of the different tips
[01:13] that I cover in this video. If so, good
[01:16] for you, but there's a good chance
[01:17] there's at least a few that you haven't
[01:19] thought about in the same way I cover
[01:21] here. So, I intend for this to be great
[01:23] even if you're brand new to using AI
[01:24] coding assistants, but also still
[01:26] helpful if you have an evolved workflow.
[01:28] All right. So, tip number one is to
[01:31] write for the agent, not the human.
[01:33] Agents need specificity and shouldn't be
[01:35] enabled to make any assumptions. I say
[01:37] this a lot on my channel. Your number
[01:40] one job when you're planning any work
[01:42] with your coding agent is to reduce the
[01:43] number of assumptions that it's making,
[01:45] and that goes for your rules as well.
[01:47] Any kind of global rules or other
[01:50] context you give your agent, the way
[01:51] that you communicate with an agent is
[01:53] fundamentally different than how you
[01:54] communicate to a human in something like
[01:56] documentation. With humans, we have the
[01:59] luxury of not always having to be overly
[02:01] specific, which is good because then the
[02:03] information applies to more things and
[02:05] is less likely to go stale. Like, for
[02:07] example, we generally try to keep our
[02:08] database code organized in a sensible
[02:11] way. Then a couple of sentences to
[02:12] expand on that, now any human can
[02:14] interpret how that applies to any code
[02:16] base in the organization, for example.
[02:18] But with the agents, we don't have the
[02:20] luxury to be this high level. Like, for
[02:22] example, you'd want to just bluntly say
[02:23] all SQL has to live in the database
[02:26] folder. Little bit of a silly example,
[02:28] but you get the idea here where we want
[02:29] to be specific on file paths and numbers
[02:32] and commands that we want the agent to
[02:34] run. This information is more likely to
[02:36] go stale, and that actually applies to
[02:37] another tip we'll cover in a bit, but
[02:39] that's important for the agent. We need
[02:41] to be as specific as possible. But that
[02:44] simply means you have to make a
[02:45] conscious effort thinking, "How do I be
[02:47] specific for the agent?" Not just giving
[02:49] general advice. And I started with the
[02:51] most obvious tip here because it leads
[02:52] very naturally into the next one. Your
[02:54] instruction files rot. Exactly because
[02:57] we are so specific to our agents, we're
[02:59] going to have information like commands
[03:01] and file paths that go stale as we
[03:04] evolve our code base and, for example,
[03:05] change our architecture. And it is a big
[03:08] no-no to have anything in our claw.md,
[03:11] our global rules, or other context that
[03:14] isn't actually the case in our code base
[03:16] anymore because that is going to
[03:17] severely confuse the agent as it's
[03:19] working on your code base trying to
[03:21] figure out why its rules are different.
[03:23] I'll link to all the studies tips in the
[03:25] description, but there's one study that
[03:27] found that one in four repositories that
[03:29] have an AI layer that have rules have
[03:31] rules that are stale. The code base has
[03:33] moved on. Like, it references a file or
[03:35] directory that's outright deleted. It
[03:37] references a database that was replaced
[03:39] by something else, or we just renamed
[03:41] folders or moved things around and the
[03:42] rules weren't updated. I call this rule
[03:45] drift, and you want to avoid this at all
[03:46] costs. And don't worry, I have you
[03:48] covered. There's a video I'll link to
[03:50] right here where I showcase my skills
[03:53] repository. It's a ton of skills for my
[03:54] coding agents that I use every single
[03:56] day, and one of them is rules check
[03:59] drift. You run this and your coding
[04:01] agent will perform an audit, figuring
[04:02] out if there's any kind of discrepancy
[04:04] between your rules and what is actually
[04:06] in your code base. So, as long as you
[04:08] run something like this once in a while,
[04:10] it will save you from a world of hurt.
[04:12] All right, tip number three, {slash}
[04:14] compact is not worth it. Almost every
[04:16] coding agent has the ability to do
[04:18] something like {slash} compact where you
[04:20] take your conversation that's become
[04:22] very bloated and you smash it into a
[04:24] small summary, so you have a lot of the
[04:26] window open back up to continue in the
[04:28] same session. The problem is, you're
[04:31] relying on the coding agent to remember
[04:32] what is important and put the right
[04:34] things in the summary, and that leads to
[04:36] a lot of hallucination. There was a
[04:38] study that was done that showed that
[04:40] only about 10% of the specific details
[04:43] of the full conversation survived the
[04:45] summary, which makes sense. There's no
[04:46] way you can keep everything if you are
[04:48] smashing it like this. And you can even
[04:50] try this yourself. In a coding agent
[04:52] like Claude code, do a {slash} compact
[04:54] on an existing conversation and then ask
[04:56] it some of the more technical smaller
[04:58] details from that conversation. You'll
[05:00] see that it really falls flat on its
[05:02] face, and generally it'll even admit
[05:04] that it's lost a lot of information. My
[05:07] recommendation is simply to avoid
[05:09] {slash} compact altogether. Give your
[05:11] coding agents smaller sets of work at a
[05:13] time, so it never reaches the point
[05:14] where you even have to do this. And if
[05:16] you really do get too far in a
[05:18] conversation, it's better to just create
[05:20] some kind of handoff document and then
[05:22] just go to a new session. I mean,
[05:24] {slash} compact really is a handoff
[05:26] document, but it's one that you have
[05:27] barely any visibility into and you can
[05:30] hardly control what goes into it. Okay,
[05:32] so number four is put the load-bearing
[05:34] rules in hooks. I actually covered a
[05:37] full video on this on my channel
[05:38] recently. I'll link to it right here,
[05:40] but the main idea is that your rules are
[05:43] probabilistic. There's not a guarantee
[05:45] that your coding agent is going to
[05:46] follow them exactly every single time
[05:48] because large language models are
[05:50] non-deterministic.
[05:52] And so, if there is a certain thing in
[05:53] your process that you need to happen
[05:55] every single time, you should make it a
[05:58] hook instead of a rule. Because a hook
[06:00] is something that triggers with a
[06:02] certain event in your coding agent, like
[06:04] right before it uses a tool or right
[06:06] when it says it's done working. And so,
[06:09] for example, a lot of times you want
[06:11] your tests to run after every
[06:14] implementation. Right? You want that as
[06:15] a guarantee for the sake of reliability.
[06:18] Well, what you can do with a rule is you
[06:19] can tell your coding agent when you're
[06:21] done writing the code, make sure you run
[06:23] all the tests. But the problem is agents
[06:26] will sometimes forget to do that or
[06:27] they'll say they ran everything when the
[06:29] tests are still red. But what we can do
[06:31] with a hook is when the agent is done,
[06:34] we can run our tests deterministically.
[06:36] We guarantee it happens and then either
[06:38] everything is green and we end or there
[06:41] are failures that we route back to the
[06:43] agent to correct. And we say, "Hey, you
[06:44] said you're done, but you shouldn't
[06:46] actually be. Go and fix these things."
[06:48] And that kind of guarantee is so
[06:50] incredibly important. I mean, really
[06:51] anytime you call out a specific event or
[06:54] ordering of things in your rules, that
[06:56] should scream out to you that it should
[06:57] be a hook. And there's so many different
[06:59] kinds of hooks that you can build. If
[07:00] you're not familiar with these, I would
[07:02] recommend you check out the video that I
[07:03] linked to earlier. The sponsor of
[07:05] today's video is HeyGen, the AI video
[07:07] generator that turns any written idea
[07:10] into a real video in minutes. You simply
[07:12] type out the video you want just like a
[07:14] prompt to a coding agent. And HeyGen's
[07:16] video agent is going to select the
[07:17] avatar or you can specify yourself, even
[07:20] build your own avatar by cloning your
[07:23] voice and video. And let me tell you,
[07:25] the cloning here is really good. And
[07:27] then once the avatar is selected, the
[07:29] agent is going to build the pacing, add
[07:31] the visuals. It's going to generate a
[07:32] fully editable video that's handed back
[07:35] to you. It's not just a slideshow with
[07:37] your voice on it. It's a fully produced
[07:39] video. In fact, I can even show you an
[07:41] example here of something that I
[07:43] generated myself. So, take a look at
[07:44] this and I'll start from the middle of
[07:46] the clip so you can see the transitions
[07:47] and effects and everything. High-level
[07:49] architecture.
[07:50] Mastering these agents provides a
[07:51] massive 10x productivity boost. The
[07:54] industry is shifting fast.
[07:55] >> at that. That's awesome. The B-roll, the
[07:57] voice and video is cloned perfectly and
[07:59] everything. I actually showed this video
[08:01] to my wife and she didn't even know that
[08:03] my voice and video was AI generated.
[08:05] It's that good. True story and I only
[08:07] had to give 20 seconds of recording my
[08:09] voice and video to create that clone.
[08:11] And the lip syncing and expressions,
[08:13] they hold up on completely different
[08:15] topics than what I covered when I
[08:16] recorded for the cloning. And with
[08:18] HeyGen, like I'm confident now. AI video
[08:21] generation is not just a novelty
[08:23] anymore. It's a real tool for marketing
[08:26] teams to use to create product demos,
[08:28] for internal documentation, for content
[08:30] creators to keep their training
[08:31] up-to-date. There are so many use cases
[08:34] for video gen now. It's free to get
[08:36] started and HeyGen has a free tier if
[08:38] you want to try building your own
[08:39] avatar. I'll have a link to them in the
[08:41] description. All right, tip number five.
[08:43] For context, less is more and this, my
[08:46] friend, is becoming more and more true
[08:47] over time as large language models get
[08:50] more capable. There are a lot of studies
[08:52] that are coming out right now showing
[08:54] that if you have too many rules, it can
[08:56] actually hurt your coding agent more
[08:58] than it can help because you're just
[08:59] giving it too much context to deal with.
[09:01] Now, it used to be the case where you
[09:03] had to explain even the most basic
[09:04] things to large language models. Like,
[09:06] here's an example of a bad global rule
[09:08] file now where we say like, "Hey, here's
[09:10] how you write a pull request. Here's how
[09:12] you do a code review." Or classic
[09:14] engineering principles, like, "Hey
[09:15] Claude, don't repeat yourself. Keep it
[09:17] simple." Those things, they hurt more
[09:19] than help now in your global rules. It
[09:21] just bloats things. The official
[09:22] recommendation from Anthropic is to keep
[09:24] your rules less than 200 lines. I
[09:26] usually say less than 300. There's not
[09:28] like a set number, but the point is you
[09:30] don't want those 1,000 line global rule
[09:33] files that people used to make all the
[09:34] time. It is not helping you. You want to
[09:37] keep your global rules to the specifics
[09:39] of your project, the constraints and
[09:40] conventions that are going to apply, no
[09:43] matter what your coding agent is working
[09:45] on. Anything else should be scrapped or
[09:47] moved to some other context file that
[09:49] you tell the coding agent to read when
[09:51] it's working on that kind of task. Tip
[09:53] number six, have you ever wondered why
[09:55] you hit your rate limits so incredibly
[09:56] quickly in your favorite coding agent
[09:58] like Claude Code or Codex? Well, I can
[10:00] almost guarantee that at least in part
[10:03] it is due to using too many parallel
[10:05] agents who are using your sub-agents too
[10:07] liberally. If you're doing a lot of fan
[10:09] outs for deeper research or working on a
[10:11] lot of things in parallel, it is costing
[10:13] you way more tokens than you think.
[10:16] Something you can do in Claude Code, and
[10:18] there's a similar command for pretty
[10:19] much every other coding agent, is you
[10:21] can do {slash} usage. So, just in any
[10:23] conversation, {slash} usage, and then
[10:26] you can go to your weekly limit just by
[10:29] pressing W. And so, I can see for my
[10:31] weekly limit here, 39% of my usage was
[10:35] while running four plus sessions in
[10:37] parallel. So, a good chunk of my limit I
[10:41] hit when I'm running all these
[10:42] sub-agents, and I'm not doing that most
[10:44] of the time. So, 39% is a very
[10:46] disproportionately large number. And so,
[10:49] you got to be careful, especially Claude
[10:51] Code is way too prone to just spinning
[10:53] up even dozens of sub-agents without you
[10:56] asking. I've seen it happen way too many
[10:58] times. So, be careful about how you're
[10:59] prompting, make sure you limit the use
[11:01] of sub-agents if you're getting close to
[11:03] your rate limits or you're hitting them
[11:04] a lot. Now, sub-agents are great, don't
[11:06] get me wrong. They're really important
[11:08] for protecting the context of your main
[11:10] agent. It's just way too easy to use
[11:12] them too liberally, loading in a bunch
[11:14] of contexts in these sessions that just
[11:16] disappear forever. Tip number seven, do
[11:18] not escalate mid-task. A lot of times
[11:21] you don't hit your rate limits as
[11:22] quickly, you're not always using the
[11:24] best model, like maybe Opus instead of
[11:26] Fable or Sonnet instead of Opus. But
[11:28] what I see a lot of people do is when
[11:30] they're in the middle of working on
[11:31] something and their coding agent seems
[11:33] to get stuck, they'll try to swap the
[11:35] conversation to a larger model and
[11:37] continue. Like right here in the
[11:38] conversation, just doing {slash} model
[11:40] and changing it. That is a big no-no
[11:43] because the thing is, your conversation
[11:45] here is already tainted. When a coding
[11:48] agent goes down the wrong trajectory and
[11:50] it seems to start hallucinating a lot,
[11:52] switching to a bigger model is not going
[11:54] to solve it. At that point, the
[11:56] conversation has built up a lot of these
[11:58] biases and mistakes that are going to
[12:00] carry over no matter what. And there's
[12:02] honestly a larger lesson to be learned
[12:04] here. When the agent seems to be making
[12:06] just a ton of mistakes, more than usual
[12:08] in a conversation, that's not just you
[12:10] on a short fuse being more judgmental.
[12:12] Large language models will legitimately
[12:14] develop patterns in a single
[12:15] conversation where they keep going down
[12:17] the wrong trajectory because large
[12:19] language models are prediction machines.
[12:21] If they are making a ton of mistakes,
[12:23] even if you're trying to correct, well,
[12:25] the most likely thing to come in that
[12:27] conversation next is another mistake,
[12:30] mistake, even if you are making
[12:32] corrections. And that becomes so
[12:33] frustrating. So, when you have a
[12:35] conversation that's tainted in this way,
[12:38] instead of trying to switch to a larger
[12:39] model or muscle your way through it and
[12:41] try to put yourself in the loop more,
[12:43] what you really want to do is write a
[12:45] handoff document. Just outline, here's
[12:47] the work that was done. Now, here's
[12:49] where we're struggling with. And then
[12:50] get rid of this conversation for good.
[12:52] Just burn it to the ground. Go to a new
[12:54] conversation. I'm just showing you a
[12:56] brief example of this. Tell it to read
[12:58] the handoff document and continue the
[13:00] work. You're going to get much better
[13:01] results using a fresh session instead of
[13:04] having that conversation with all the
[13:06] mistakes and biases compounding on top
[13:08] of each other. All right, that brings us
[13:10] to tip number eight, which is probably
[13:12] the only one out of everything here that
[13:14] is kind of a hot take because I really
[13:16] don't like coordinators. There are a ton
[13:18] of super fancy elaborate frameworks out
[13:21] there for having some kind of team lead
[13:22] that is distributing work and having the
[13:24] agents communicate with each other. This
[13:26] is not reliable. You don't need it. In
[13:29] fact, Claude has their own version of
[13:30] this with agent teams that they have
[13:32] left as experimental for months and
[13:34] months. And they've done that for a
[13:36] reason. This is not the most reliable
[13:38] way to use coding agents. It's tempting
[13:40] to do something like this because of the
[13:42] promise of scale and having the agent
[13:44] just build out entire PRDs for you on
[13:46] its own, but it never works out. If you
[13:48] want to have any kind of coordination to
[13:50] scale your work and do things in
[13:51] parallel, this is what I'd recommend.
[13:53] You don't need any fancy communication
[13:55] between your agents or any kind of fancy
[13:58] monitoring with your team lead. You
[14:00] really just have your main coding agent
[14:02] where you describe what you want in
[14:03] plain English and it distributes the
[14:06] workflows or the background agents. It's
[14:08] a similar kind of idea, but there's a
[14:11] lot more reliability here when this is
[14:13] purely a delegator. If you want the most
[14:15] reliability with possible with your
[14:17] coding agents, you don't need teammates,
[14:18] a shared task list, a mailbox that they
[14:21] port messages into. This all sounds
[14:23] really, really cool, but it's not how
[14:25] you build production-grade software. Tip
[14:27] number nine, never let the writer
[14:29] approve the work. This is a hard rule
[14:31] that I follow in every AI coding
[14:33] workflow that I build. Because your
[14:34] writer, it builds up a lot of bias and
[14:37] assumptions in its implementation. And
[14:39] so generally, when you have it reflect
[14:41] on its own work, it's going to say
[14:43] things are great even if they're not
[14:44] ideal. Because it's not going to be able
[14:47] to catch its own assumptions. That is
[14:49] why we want a fresh set of eyes on any
[14:52] piece of work we ever create with our
[14:53] coding agents. Within your
[14:55] implementation conversation, you run a
[14:57] skill to rip through whatever piece of
[14:59] work you're doing, and then you can have
[15:00] the agent iterate on its own work. It's
[15:02] still good to allow it to run the tests
[15:04] and try to catch things, but then you
[15:05] always want to go into another
[15:06] conversation where you give some kind of
[15:08] handoff document for what was just
[15:10] built. You have it review a pull
[15:11] request. You just tell it to review the
[15:13] uncommitted changes we have. Whatever
[15:16] you want to do to help the agent
[15:17] identify what was just built. But then
[15:19] the point is we have a new conversation
[15:21] that's reviewing things, so there's no
[15:22] bias and no assumptions, or at least
[15:25] there's a lot less. Tip number 10, it is
[15:27] in fact possible to over-revise with
[15:30] your coding agent. If you let it iterate
[15:32] on its work too many times, the quality
[15:35] it actually degrades. It finds the best
[15:37] answer, the best code, the best script,
[15:40] whatever, at some point, but then if you
[15:42] just keep forcing it to make changes,
[15:44] it's going to find things to correct
[15:46] just to try to appease you. That's the
[15:47] sycophancy of LLMs, but actually makes
[15:50] things worse. And this is a really easy
[15:52] temptation to fall into. I've done this
[15:53] myself, especially when you have a ton
[15:55] of tokens left over right before a rate
[15:57] limit reset. You'll just go like, "Hey
[15:59] Claude, hey Codex, go iterate on this a
[16:01] ton and make it perfect." But you
[16:02] actually get slop back in the end. There
[16:04] was a study that was done where you
[16:06] force the coding agent to run like 10
[16:08] times or 20 times, whatever, and 85% of
[16:11] the time there was an iteration before
[16:14] the last one that was actually far
[16:15] better. So, just be careful here. More
[16:18] iterations does not always equal better
[16:20] code. And then for our last tip, and I
[16:22] have a lot of content on my channel
[16:24] covering this, you want to treat your
[16:26] validation as a system, not a step. A
[16:29] lot of times people will have their
[16:31] coding agent write the code, and then
[16:32] testing becomes an afterthought. Like,
[16:34] "Oh yeah, I guess you should probably
[16:35] add some unit tests here." Or okay,
[16:37] maybe I'll just quickly click around
[16:38] this application and make sure things
[16:40] look good. But I'm telling you, it needs
[16:42] to be a top priority for you. Before you
[16:44] even write any of the code, you should
[16:47] be planning out the full validation
[16:49] harness. Here are the tools for the
[16:51] agent to check its own work. Here are
[16:53] the conventions for it to create unit
[16:54] and integration tests. Here's exactly
[16:56] how I'm going to test it after. Here's
[16:58] how I want the agent to look for edge
[17:00] cases. Planning out those things before
[17:02] you even write the code is one of the
[17:03] best ways to make your coding workflows
[17:05] more reliable. And so with that, those
[17:07] are all 11 tips that I wanted to cover
[17:09] with you here to help you make any
[17:11] coding agent more reliable. And I hope
[17:13] that at least a few of these are just
[17:15] getting you thinking about ways that you
[17:17] can improve your coding agent workflows.
[17:19] And so, if you found this useful and
[17:20] you're looking forward to more things on
[17:22] AI coding and agentic engineering, I
[17:24] would really appreciate a like and a
[17:26] subscribe. And with that, I will see you
[17:28] in the next video.
