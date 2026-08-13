---
title: "Anthropic's CCA Exam as a Field-Guide for Agentic Engineering — Frank Coyle, UC Berkeley"
type: "youtube"
channel: "AI Engineer"
date: "2026-08-08"
resource: "https://www.youtube.com/watch?v=Z-c11pV_uvU"
pillar: "building"
tags: [agents, claude-code, anti-patterns, context-engineering, agent-orchestration, best-practices]
timestamp: "2026-08-13"
extraction_method: "auto-captions"
video_id: "Z-c11pV_uvU"
duration: "20:08"
---

# Anthropic's CCA Exam as a Field-Guide for Agentic Engineering — Frank Coyle, UC Berkeley

**Channel:** AI Engineer
**Published:** 2026-08-08
**Duration:** 20:08
**URL:** https://www.youtube.com/watch?v=Z-c11pV_uvU

## Transcript

[00:01] [music]
[00:12] >> Okay, I'm getting rolling and uh welcome
[00:14] aboard. We just had a little technical
[00:16] issues,
[00:17] but uh we resolved them. So, my name is
[00:19] Frank Coyle.
[00:20] Uh I am a computer science guy. I've
[00:23] been teaching computer science for over
[00:25] 30 years,
[00:26] and I'm now teaching at Berkeley. And
[00:29] one of the problems that uh all my
[00:30] students,
[00:32] past and present, are having is AI,
[00:34] because computer science is no longer
[00:37] the magic pathway to a job. So, I've
[00:41] been trying to figure out ways to uh
[00:43] help them come up with schemes to help
[00:46] them get ready for this world of agentic
[00:48] AI. And one of the things that sort of
[00:51] uh
[00:51] dropped into my uh plate was the
[00:55] something called the Claude Certified
[00:57] Architect exam, which I will be talking
[00:59] about today, and it has um a number of
[01:03] aspects to it. And I think if you're
[01:04] interested in a career in agentic AI,
[01:07] then certainly take a look at least what
[01:09] the exam is about, because I feel that
[01:12] um Anthropic knows how people are using
[01:16] their system and what the issues are
[01:18] going to be.
[01:19] So, before we jump into that, I want to
[01:21] give a little bit of my
[01:23] uh
[01:23] my philosophy.
[01:26] bop bop bop bop
[01:33] May have to do this manually, getting
[01:34] stuck.
[01:36] So,
[01:37] this is a quote from uh
[01:40] a woman named Sister Corita Kent.
[01:42] Nothing is a mistake. There's no win and
[01:45] no fail. There's only make.
[01:48] Bottom line here is experiment,
[01:50] experiment, experiment. Not only should
[01:53] you read, but you should do. You should
[01:55] make stuff. Now, what happens when you
[01:58] make stuff? A lot of times things don't
[02:01] work.
[02:03] Thomas Edison said, "I have not failed.
[02:07] I've only found 10,000 ways
[02:09] that don't work."
[02:11] And
[02:13] what I want to emphasize here is that
[02:15] what this shows us are something that in
[02:18] the design patterns movement, which came
[02:20] around in the early 1990s with
[02:22] object-oriented programming, we had
[02:24] patterns for objects. We now have
[02:27] patterns for agents, but there's also
[02:30] anti-patterns. And I think anti-patterns
[02:32] are a key
[02:34] to understanding what you should not do
[02:37] because understanding what you should
[02:38] not do is the key to leading you to what
[02:41] you should do.
[02:44] So, a little bit about the Claude
[02:46] Certified Exam, released in March, so
[02:49] it's brand new.
[02:50] It is uh
[02:52] it is
[02:53] based on scenarios. It is timed. It is
[02:56] proctored.
[02:57] It is available to companies in the
[03:01] Claude ecosystem, the Anthropic
[03:03] ecosystem, but individuals can pay $99
[03:06] and take the exam once every once every
[03:09] 6 months.
[03:11] And it's not just
[03:13] multiple-choice questions. It is
[03:15] multiple-choice, but they're
[03:17] they are based on
[03:19] uh realistic constraints and realistic
[03:22] scenarios.
[03:24] The five domains.
[03:26] There are five domains that are covered
[03:28] and they give you the percentages of
[03:29] each. So, agentic architecture, 27%.
[03:33] Claude code, how to configure the Claude
[03:35] code system and workflow, 20%. How to
[03:40] doing prompt engineering, structuring
[03:42] your output, using JSON all over the
[03:46] place.
[03:47] Tool design. Model context protocol
[03:50] integration. These are topics that you
[03:52] should understand and know whether
[03:54] you're going to take the exam or not.
[03:56] This is going to help you get ready for
[03:58] whatever
[04:00] the agentic world is going to throw at
[04:02] you. And then there's going to be
[04:03] contact management and reliability. So
[04:06] these are the
[04:07] areas of of the kind of questions you're
[04:10] going to run into.
[04:13] Then there are and they they provide you
[04:16] with six production scenarios and your
[04:20] the exam will randomly choose four and
[04:24] all the questions will be centered
[04:26] around the four that they choose.
[04:29] And what I'm going to do is walk you
[04:31] through
[04:32] um
[04:34] the production scenarios and give you
[04:36] some anti-patterns to be aware of
[04:38] because there's a number of ways you can
[04:40] solve the problem but one of the big
[04:41] things is what not to do and that often
[04:44] can be the key to getting these
[04:46] questions right. So, number one customer
[04:49] support resolution agent. So we have
[04:51] agentic loops, control, something called
[04:54] stop reason which is
[04:56] uh what Cloud Code has. Every time
[04:58] something happens, there's a stop reason
[05:01] and you need to take a look at that
[05:02] because that can give you a lot of
[05:03] information about what's going on.
[05:05] Uh scenario two, code generation.
[05:08] Three, multi-agent research system which
[05:11] we'll look at. How do you How do you
[05:14] distribute your agents? Hub and spoke.
[05:17] Who's the orchestrator? How much
[05:18] information should they know? All these
[05:21] are important factors. Um
[05:23] scenario four, developer
[05:26] productivity with code. So how do you do
[05:28] subtask isolation? Keep your tasks in
[05:31] their little universes. And this
[05:33] hearkens back to what we learn in
[05:35] computer science from doing
[05:36] multi-threaded programming.
[05:39] When you have multiple threads operating
[05:40] and sharing memory, then you get into
[05:43] issues with synchronization. You You to
[05:45] put locks
[05:47] Keep the little threads independent.
[05:50] Keep your agents independent.
[05:52] Um
[05:54] and then some cloud code for continuous
[05:56] integration.
[05:58] And then we'll look at some patterns for
[06:00] structured data extraction. Okay, that's
[06:04] kind of where we're going to go.
[06:06] Now, here's something that I I I like to
[06:09] point out. Everybody's talking about
[06:11] loops, right? Every The loop is the new
[06:13] thing.
[06:14] Um
[06:16] uh Boris Cherney says he doesn't write
[06:19] code, but his job is to write loops.
[06:22] And Peter Steinberger
[06:24] master of Open Claw says, "I don't I
[06:26] don't uh I don't code anymore. I just
[06:28] design loops
[06:30] that prompt your agents."
[06:32] So, loops are the new big thing, right?
[06:34] Well, no, they're not. Okay? Um
[06:38] back in the day
[06:40] uh early days of computing, we had
[06:43] programming languages were exploding. We
[06:45] had Fortran, we had COBOL, and there
[06:47] were big fights. My program My
[06:50] programming language is better than
[06:52] yours. It can do more. No, it can't. We
[06:55] can do this.
[06:56] Böhm and Jacopini, 1966
[06:59] proved that if you want a language to be
[07:02] Turing complete, which means can compute
[07:05] anything that computers are possibly
[07:08] able to compute, then you need only
[07:11] three things.
[07:13] The ability to
[07:14] to to write statements sequentially,
[07:17] okay?
[07:18] To have if-then conditionals, and the
[07:21] third piece is the loop.
[07:24] If you add the loop,
[07:26] you have Turing computability. And now
[07:29] we are seeing this being resurrected in
[07:32] the agentic world with the focus on
[07:35] loops, cuz up to now we've had sort of
[07:37] sequences. You have prompts, you have
[07:39] maybe if-then, but now we have a loop.
[07:42] And now this is what's giving us the
[07:43] power. This is where the agentic stuff
[07:46] is getting very exciting.
[07:48] Okay.
[07:50] I'm start with uh
[07:52] with scenario one, customer support
[07:54] resolution.
[07:56] So here we have
[07:59] a loop operating and
[08:01] the I'm going to jump to the
[08:03] anti-pattern. What you don't want is
[08:05] just to let the agent go and do
[08:07] something and get the response back and
[08:11] use it, okay? What you want to do is you
[08:13] want to loop with something called the
[08:15] stop reason. So I'm going to show you a
[08:17] little code here.
[08:19] So here we have while loop. It's a while
[08:21] true, it's a loop. We're looping right
[08:23] here, okay? So the first little block is
[08:26] where we call uh we call the model,
[08:29] okay? And we pass it the messages. The
[08:31] messages are essentially the sequence of
[08:34] prompts that exist in the context
[08:37] window, okay? And we are asking the and
[08:42] we have a we have a prompt and we have
[08:45] we have the context and we have a tool.
[08:47] And we're asking the LLM
[08:50] to do something with this tool and help
[08:52] us out. The problem is the LLM can't do
[08:56] anything. It is just a probabilistic
[08:59] next word predictor.
[09:01] It can't execute tools. So what it does
[09:04] though is it can figure out
[09:08] if you point it to a tool, it can figure
[09:11] out how to set things up so that you or
[09:14] your code can execute it. So it's
[09:17] important to understand that the LLM is
[09:18] not executing these tools. It can't do
[09:20] anything except talk back to you, very
[09:23] intelligently sometimes, but all it can
[09:25] do is talk back to you. So
[09:28] when it finishes
[09:29] this
[09:31] task and has a result which is basically
[09:36] here is I've I know what you want. I
[09:39] know what the tool can do. Here's how I
[09:42] It sets up the parameters that can then
[09:45] be or that then used to actually execute
[09:48] the tool. So, the second block you see
[09:51] why did
[09:53] the LLM come back to us? That's our stop
[09:56] reason.
[09:57] Tool use. Oh, okay. We've stopped
[09:59] because
[10:00] the LLM it wants to use the tool.
[10:03] So, let's just run the tool. So, that's
[10:05] what the second block is. Run tool, the
[10:08] response is what the LLM said, and it's
[10:10] basically the parameters that it has
[10:13] extracted from the data that you
[10:15] provided it.
[10:17] Okay? Then it executes that.
[10:19] Then it goes back.
[10:20] That then it continues. Continues means
[10:23] the LLM sees it and says, "Oh,
[10:25] successful run. So, okay."
[10:28] Come back down.
[10:31] We're not running a tool anymore. We're
[10:32] end the end of our loop. Bingo.
[10:35] Now,
[10:36] then we take the answer, and this is an
[10:38] opportunity for you to
[10:39] have a human in the loop potentially.
[10:43] You check the confidence. If it looks
[10:45] good, you keep it. If you don't, then
[10:47] you escalate to a human.
[10:49] So, now there's another reason why you
[10:52] need to make sure you check your stop
[10:54] reason. One of the stop reasons may be
[10:57] you have run out of tokens, and this
[11:00] response is based on partial when the
[11:04] LLM had to stop.
[11:06] And it's going to give you a response,
[11:08] but if you have run out of tokens, then
[11:10] you need to take action.
[11:12] Okay.
[11:13] Um
[11:15] Next scenario.
[11:17] Uh code generation with Claude. So,
[11:19] Claude code has this has this concept of
[11:22] the Claude MD file, a markdown file,
[11:24] where you put all the things you wanted
[11:26] to know.
[11:27] What Anthropic recommends is you have
[11:31] three levels of Claude.
[11:34] One
[11:36] that you have at the top level of your
[11:37] project,
[11:39] the other that you have in inside your
[11:41] sort of the project folder, and then
[11:45] within directories you can also specify.
[11:48] So, the idea is to have a hierarchical
[11:50] set of rules that that can then control
[11:55] how the system is going to respond.
[11:58] Okay.
[12:00] Moving right along,
[12:02] uh we have a multi-agent research
[12:04] system. So, here we're going to have uh
[12:08] the problem is
[12:10] how do I how do I get my agents to to go
[12:12] off and do stuff and bring the answers
[12:14] back in a reasonable way? The
[12:16] anti-pattern
[12:18] you
[12:19] have one agent and you load it up with
[12:21] tools, all right? So, I like to think
[12:23] about you
[12:24] you know, you hire somebody to come to
[12:25] your house, you hire a carpenter to come
[12:27] to the house, and the guy shows up with
[12:30] uh
[12:31] plumbing tools, carpenter tools,
[12:33] electrical tools. He says, "I can do
[12:35] anything." Well, maybe you don't want
[12:36] this guy, maybe you want a a
[12:38] professional carpenter. So, that's the
[12:40] kind of idea. And this kind of back
[12:42] takes us back to some of the the
[12:44] functional programming
[12:46] uh
[12:47] ideas that functions should be do one
[12:50] thing. And if you can get your agents to
[12:53] do one thing,
[12:55] you with maybe one or two tools
[12:58] available to it, then that's going to be
[13:01] a win, and that's going to help you with
[13:02] this exam. So, specialize,
[13:05] don't overload.
[13:07] The other part of this is
[13:09] don't let your agents
[13:11] context spill over into the main context
[13:16] because context means tokens, tokens
[13:19] mean money,
[13:21] and the more context you have, the more
[13:23] confused the LLM is going to be in
[13:26] giving you an answer. So, even though
[13:28] oh, a million token context window, I
[13:31] can put everything in there. No, no,
[13:32] don't put everything in there.
[13:34] Limit what's going to go in there
[13:35] because then you're going to get
[13:37] a much more accurate system.
[13:41] So, here's a
[13:44] Here's an example of a specialized sub
[13:47] agents.
[13:48] You're giving it
[13:50] So, this would be the critic. So, let's
[13:52] say you've run some stuff. Now, you want
[13:54] to get an agent to look at what's
[13:57] happened. What you want to do is just
[13:59] give it what it needs to solve that
[14:02] critic problem. I'm only giving it here
[14:05] the
[14:07] we're passing it
[14:08] the claim and the evidence. So, this is
[14:11] your claim is sort of how we're going to
[14:13] solve the problem. Here's Here's the
[14:14] evidence, but we're not giving it the
[14:18] the thought processes that went in to
[14:22] creating this claim. Why?
[14:25] When you
[14:27] When you get a bunch of agents together
[14:29] collaborating and talking to each other,
[14:32] there's a tendency to have group think.
[14:35] And
[14:36] all the agents seem to kind of devolve
[14:39] into one idea. I mean, it's it's like,
[14:42] you know, you're in a group, you know,
[14:43] you're at a party, and everybody wants
[14:46] pizza except you, but then people talk
[14:49] you into
[14:50] you you know, you don't want to be uh
[14:53] you don't want to spoil the party, so
[14:54] you'll go along. And it seems that
[14:55] agents kind of work in the same way.
[14:58] So, you're going to return
[15:00] Basically, you're going to give each
[15:02] agent only a slice. I didn't think about
[15:05] the pizza analogy, but yes. Every agent
[15:08] gets its own slice, and and it it should
[15:11] come through.
[15:12] Okay.
[15:17] Fourth scenario,
[15:19] developer productivity. So, the
[15:22] anti-pattern.
[15:25] Let every subtask dump its full output
[15:27] into the primary thread, crowding out
[15:29] the context. Again, this is what we're I
[15:31] was just talking about. This is bad. Let
[15:34] the context grow unbounded. Bad, right?
[15:38] For the reasons we just talked about.
[15:40] You want to isolate your subtask output,
[15:43] and you want to compact
[15:46] long sessions. I'm going to take a
[15:48] second to talk about that. So, here's
[15:51] here's a
[15:52] an example of a pattern.
[15:54] Uh
[15:55] you want to have your agent
[15:59] uh
[16:00] look at the logs and create a summary
[16:04] of where the problems are in the log.
[16:06] So, here's your task, scan all the logs
[16:09] for error.
[16:10] Context fork. So, you're forking the
[16:13] agent into a like a separate thread
[16:16] where
[16:17] whatever the agent does and thinks and
[16:20] adds tokens to does not come back and
[16:23] pollute the main
[16:25] uh
[16:26] the main context.
[16:28] Now,
[16:30] you see here what happens, then you take
[16:32] this
[16:33] summation, and then you add that
[16:35] summation without all the other stuff
[16:38] into the overriding context. Now, this
[16:42] last little block is kind of
[16:43] interesting, I think. Because
[16:46] you can check your token count,
[16:49] and you can determine how big the token
[16:51] count is.
[16:53] And
[16:55] if you can set some limit and you know,
[16:57] if if you have more than 150,000 tokens,
[16:59] then what you want to do is you can run
[17:01] a compact. So, Anthropic and Claude have
[17:04] these compaction algorithms
[17:08] that take this giant context and and
[17:10] compact it in some way, shape, or form.
[17:12] Not quite sure how the implementation is
[17:15] of that, but there is compaction. Now, a
[17:18] little side effect a little side channel
[17:21] I've been walking around when you walk
[17:23] outside, you see see these guys handing
[17:24] out these books.
[17:26] Okay? Anybody see these guys handing out
[17:28] these but take them. This is this is
[17:30] actually a pretty good little book. In
[17:32] fact, I was looking at it last night and
[17:35] one of the things it had in it was this
[17:37] is by this guy Sam
[17:39] Sam Bagwell. I have no connection I
[17:41] didn't even know Sam, but it there's a
[17:44] online page 32.
[17:46] It says
[17:47] uh his company provides custom logic for
[17:50] compression of context. So, he's got an
[17:54] and you can write your own. He's got a
[17:56] he's got he you can extend his base
[17:57] class and have your own
[18:00] compression of your data, whatever you
[18:01] think is important. So, I think that's
[18:03] kind of an interesting spin on this
[18:06] whole thing.
[18:07] Okay.
[18:09] Cloud code for
[18:12] uh uh continuous integration
[18:15] uh anti-pattern
[18:18] Always have interactive modes in a
[18:19] pipeline. Well, no no no cuz interactive
[18:22] modes mean uh
[18:25] Cloud will stop and ask you, "You want
[18:27] to do this? You want to do that? Can I
[18:28] have permission for that?" So, there are
[18:29] ways to set it up so that it'll just run
[18:32] straight through, okay?
[18:34] The other
[18:36] uh
[18:37] the other tip that I'll give you here
[18:41] is there's something called
[18:43] the uh
[18:45] the batch. So, you can take your
[18:47] prompts, you can take your work, and you
[18:50] can put them in a batch and for 50%
[18:54] fewer token cost you will get the result
[18:57] they promise in at at least 24 hours.
[19:00] So, if you're going to go take a nap,
[19:01] you're going to go on vacation, you're
[19:03] going to go out, take a a day off, run
[19:05] your stuff in batch mode, and you're
[19:07] going to have a a
[19:09] less to pay.
[19:13] Where am I here?
[19:15] All right, I've only got a few few
[19:17] minutes left, few seconds left, but I
[19:20] want to conclude with this.
[19:22] Remember, nothing is a mistake. There's
[19:25] no win, there's no fail, there's no
[19:26] exam,
[19:28] only make. You do it and you make it and
[19:31] you're going to succeed. If you want to
[19:33] reach out to me, reach out to me uh coil
[19:35] at Berkeley, look at my websites. I got
[19:38] a website co-supreme AI. I'm a big jazz
[19:41] fan and I named this website after John
[19:43] Coltrane, Love Supreme, if you know that
[19:44] song, great. Anyway, that's my story and
[19:47] I'm sticking to it and I'm about to zero
[19:49] time. Okay,
[19:50] >> [applause]
[19:51] >> thank you.
