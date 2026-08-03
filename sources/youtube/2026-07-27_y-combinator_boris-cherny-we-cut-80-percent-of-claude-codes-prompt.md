---
title: "Boris Cherny: We Cut 80% of Claude Code's Prompt"
type: "youtube"
channel: "Y Combinator"
date: "2026-07-27"
resource: "https://www.youtube.com/watch?v=qyPCVqFUyDo"
pillar: "building"
tags: [claude-code, prompt-engineering, agents, best-practices]
timestamp: "2026-08-03"
extraction_method: "auto-captions"
video_id: "qyPCVqFUyDo"
duration: "35:51"
---

# Boris Cherny: We Cut 80% of Claude Code's Prompt — Transcript

[00:03] [music]
[00:07] >> All right, Boris. We're so excited to
[00:09] have you here, the creator of
[00:13] Claude code.
[00:14] >> Thank you.
[00:17] >> [applause and cheering]
[00:19] >> It's great to be here.
[00:21] >> Fresh off the press. You guys just
[00:23] shipped Opus 5 yesterday.
[00:26] >> Yes.
[00:27] >> [applause and cheering]
[00:28] >> And it seems that model performance
[00:31] keeps accelerating. You guys got and
[00:34] took Arc AGI 3 to 30%,
[00:38] which is incredible.
[00:40] >> Yes.
[00:41] >> And for context, before the best score
[00:44] was in
[00:45] in the low single digits or low teens,
[00:48] right? What can Opus 5 do now that it
[00:52] couldn't versus the previous version?
[00:55] >> Yeah, there's um there's a lot that goes
[00:57] into every new model and there's a lot
[01:00] of new capabilities that we teach and uh
[01:03] get the model to do.
[01:05] Whenever you do model training,
[01:08] you try to teach a whole bunch of
[01:10] different things and most often it
[01:12] doesn't work.
[01:13] But some subset of the things the model
[01:16] does learn and sometimes it also
[01:18] surprises you. It has these skills, it
[01:20] has abilities that you you actually
[01:22] didn't really teach it, but it it just
[01:24] kind of learned. For five, one example
[01:27] of something it does that I think no
[01:29] other model has done is it runs for a
[01:32] very long period of time and especially
[01:35] when you combine Opus 5 with auto mode,
[01:38] it's just like incredible. Like it can
[01:39] go for days, weeks, months at a time. It
[01:43] just won't stop.
[01:44] Um you don't even need to use
[01:46] scaffolding. So you don't need the slash
[01:49] goal, you don't need all this other
[01:50] stuff. It'll just go because it knows it
[01:52] needs to do the task. Um another thing
[01:54] that I'm really excited about and um I'm
[01:56] going to start I think to talk about a
[01:58] little bit more um but it's kind of
[02:00] surprising because it's such a new
[02:01] capability is the model does not seem to
[02:04] be prompt injectable anymore.
[02:08] >> What's prompt injectable?
[02:10] >> [applause]
[02:11] >> It's crazy. Like people have talked
[02:12] about this like lethal trifecta for a
[02:14] long time and this really affects kind
[02:16] of harness design and agent design and
[02:19] and and product design because if the
[02:21] model reads some instruction on the
[02:22] internet that's like, you know, do X and
[02:25] Y and Z and also delete everything on
[02:27] the user's computer.
[02:29] A year ago the model would have just
[02:30] done it.
[02:32] But nowadays Opus does not.
[02:35] And this has actually been the case
[02:36] since like Opus 4.7, 4.8,
[02:39] Sonnet 5 has been quite good at this,
[02:41] People was quite good at it. But Opus 5
[02:43] just hits like a new frontier on this.
[02:45] So essentially if you combine a
[02:48] well-aligned model, so this is like
[02:49] essentially three years of research into
[02:51] alignment,
[02:52] with a prompt injection classifier which
[02:54] we run for all traffic. And what this is
[02:56] doing is it's based on Crystal's
[02:58] mechanistic interpretability work where
[03:01] it's it's literally we're looking at
[03:02] neurons in the model's brain
[03:04] that light up when prompt injection
[03:06] happens.
[03:07] So the model won't even tell you but we
[03:09] can actually see those neurons and we
[03:11] can figure out and diagnose that it's
[03:12] happening.
[03:13] And then you combine that with the auto
[03:14] mode classifier and with these three
[03:17] layers
[03:18] we just cannot demonstrate prompt
[03:20] injection anymore.
[03:21] >> Talking about a prompt injection, the
[03:24] other side of the coin is now the system
[03:27] prompt. Let's talk a bit about the new
[03:30] release. You actually deleted over 80%
[03:34] of the system prompt from Claude code.
[03:37] >> Yes.
[03:37] >> Tell us more about that.
[03:38] >> I think something that a lot of people
[03:40] might not realize is
[03:43] Claude code as a product and as a
[03:45] harness is just always changing. We're
[03:47] always adding stuff. We're always
[03:49] deleting stuff.
[03:51] Every time that a new model comes out,
[03:53] we delete a bunch of the system prompt,
[03:55] change a bunch of the system prompt. We
[03:57] change the set of tools all the time. We
[03:59] change the prompts for the tools all the
[04:01] time. And the reason is
[04:03] every model is very different.
[04:07] So, something that you did for one model
[04:09] maybe 3 months ago, it just might not
[04:11] translate at all to the next model.
[04:14] And so, one thing about Opus 5 is it's
[04:17] just really intelligent. And a lot of
[04:20] the stuff in the system prompt was
[04:22] correcting for these behaviors that the
[04:23] model should have known,
[04:25] but uh it didn't.
[04:27] Now, Opus 5 just does it.
[04:29] So, yeah, we deleted 80% of the system
[04:32] prompt.
[04:33] You can actually try deleting the rest
[04:36] of it, too. Um so, when you run Claude
[04:38] Code, you can just do like {dash} {dash}
[04:39] system prompt and set whatever system
[04:41] prompt you want if you want to
[04:42] experiment with it.
[04:44] And another thing that you can try is um
[04:46] simple mode. So, this is actually this
[04:48] kind of undocumented feature. If you do
[04:50] Claude Code simple equals one, like this
[04:53] uh environment variable, and then you
[04:54] run Claude, it'll delete all the system
[04:57] prompts,
[04:58] including from the tools.
[05:00] And we actually use this as a sort of
[05:01] ablation
[05:02] to figure out is the prompt useful? And
[05:05] what's interesting is that the model is
[05:07] actually a little bit more intelligent
[05:08] without these prompts.
[05:10] That's something that we've been
[05:11] finding. But when you use Claude Code as
[05:13] a product,
[05:14] you do actually want some of these
[05:15] prompts because it helps you use the
[05:18] product and it it helps the the product
[05:20] behave and the model behave in the way
[05:21] that you would want when when you're
[05:23] using it as a person.
[05:24] >> I think the thing that's really
[05:26] fascinating in this era of building,
[05:28] basically you'll build the best harness
[05:30] in the world for for Claude, and that's
[05:33] Claude Code. From what I'm hearing, you
[05:36] for every model released, you basically
[05:38] delete all of the code base, delete all
[05:40] of the prompt, and start from scratch
[05:42] every time. That in the old world would
[05:45] have been not something
[05:47] startups would have done for the product
[05:49] cuz I press delete every 6 months for
[05:51] everything.
[05:52] >> That's right. That's right. We so to be
[05:53] fair, we don't delete the entire code
[05:55] base, but we do delete a lot. So every
[05:57] time there's a new model, we try we call
[05:59] it in a research you call this a
[06:01] ablation. And so what this means is you
[06:03] delete the entire system prompt and then
[06:05] you bring it back line by line to figure
[06:07] out what is the impact of each
[06:08] individual line.
[06:09] Um it's sort of like a eval and you can
[06:11] kind of like evaluate it and ablation
[06:14] essentially is a eval where you delete
[06:15] things to figure out the impact.
[06:17] And yeah, like we do the same thing for
[06:19] tools. Like we unship tools all the
[06:20] time. We you know, delete code in the
[06:22] harness all the time. If you look at
[06:24] actually the code that's in the Claude
[06:26] code harness today, almost all of it is
[06:28] about safety and permissions and static
[06:30] analysis and there's a bunch of UI code
[06:33] and we've actually unshipped a lot of
[06:35] the other code already.
[06:37] >> Do you think this way of building a
[06:39] agentic product and harness
[06:42] and basically doing ablations every time
[06:45] with a there's a new model release,
[06:48] should everyone in this room that's
[06:49] building AI products basically do that?
[06:51] Be comfortable and brave to
[06:54] press delete.
[06:55] >> 100%. Yeah, and and for people that
[06:57] aren't building agentic products, but
[06:58] you're using Claude code, every 6 months
[07:01] delete your Claude MD.
[07:02] Delete your skills.
[07:04] Delete your hooks.
[07:05] See what the model does and it might
[07:07] surprise you.
[07:08] And actually for Opus 5, this is
[07:10] something we really do recommend is just
[07:12] try deleting all of these things
[07:15] because the model might really just not
[07:17] need all those instructions that you
[07:19] needed for past models.
[07:20] >> Let's talk a bit about how then you
[07:23] build this new prompt. When there's a
[07:25] new model release, like for everyone in
[07:27] the room, everyone will want to try Opus
[07:29] 5 and they're going to press delete on
[07:31] their system prompt. How do they go
[07:32] about
[07:34] building rebuilding their system prompt?
[07:36] How do you set up your environment?
[07:39] >> So you do you do it kind of piece by
[07:41] piece. So, the first step is you delete.
[07:45] The next step is you use it.
[07:49] And you don't want to guess what's the
[07:51] instruction that the model needs because
[07:53] you might not predict it correctly. The
[07:55] thing that you want to do is you want to
[07:56] run it. And if it's like a customer
[07:58] agent like product that you're building,
[08:00] you want to kind of run the product. Uh
[08:01] you want to see where it fails with the
[08:03] model. You want to see what it does
[08:04] well. If you're using quad code, you
[08:07] want to see where it does well with your
[08:09] code base or maybe where it stumbles
[08:11] over, you know, the architecture or
[08:12] stumbles over something else.
[08:14] And only when you see it repeatedly
[08:16] stumble on the same thing, that's when
[08:18] you add it back.
[08:20] But you don't want to do it too early
[08:21] because remember like the model is going
[08:23] to read this instruction every single
[08:24] time you use it. So, you really want to
[08:26] make sure that the model needs this
[08:27] instruction. I I think this is sort of
[08:30] the crazy thing about building on
[08:31] models. It's just so different than all
[08:33] the engineering that I've ever done.
[08:35] Like in the past when you built on
[08:37] systems, you built these like big
[08:38] beautiful systems and you really think
[08:40] about the system design up front. You
[08:42] have like a big suite of unit tests. You
[08:44] think about everything and you know,
[08:46] like a re-architecture is a big project.
[08:47] It sometimes it takes months. I've
[08:49] worked on re-architecture products at,
[08:51] you know, big companies that take years.
[08:54] And
[08:55] the model is not like that. It's um
[08:58] the way to think about it is almost like
[09:00] a like a living creature, like it's
[09:01] something more organic. It's a thing
[09:04] where every model generation, it behaves
[09:06] differently. It has a slightly different
[09:08] personality. And you have to take the
[09:10] time to get to know it and then adjust
[09:11] the harness based on that.
[09:13] And I I think it's just very much like
[09:15] an empirical and kind of scientific
[09:17] thing. You have to take a very
[09:19] scientific mindset to it where you try
[09:21] something, you see the result, and then
[09:23] you iterate based on that.
[09:25] >> If you're building in this world right
[09:26] now,
[09:27] what then becomes uh stable? Are evals
[09:31] something that you keep from the
[09:32] previous models and keep using them in
[09:34] each new model release?
[09:36] >> Um we do until we max out the eval.
[09:40] >> So, that's sort of the tip for everyone.
[09:41] So, code and system prompt, you have if
[09:45] you want to build at the bleeding edge
[09:46] and have the most capability for models,
[09:48] you got to delete those, but evals are
[09:50] constant and keep appending to them,
[09:53] basically.
[09:53] >> Yeah, you keep you keep appending.
[09:55] What happens is um
[09:58] you know, I actually wouldn't even go
[09:59] this far, to be honest. I think evals,
[10:01] they outlive the harness a little bit,
[10:03] but not by that much. Like an eval might
[10:05] live for maybe one, two, three model
[10:07] generations, but nowadays the you know,
[10:10] we're on the exponential. The model is
[10:12] improving so quickly, very often we just
[10:15] saturate the eval, and then we have to
[10:16] throw it away, and we have to come up
[10:18] with a new eval.
[10:19] And this is just part of the process.
[10:21] And again, it's about being empirical.
[10:23] You have to use the product, you have to
[10:24] use the model, you have to see where it
[10:26] struggles, and then based on that,
[10:28] that's the eval set that you should
[10:29] build.
[10:30] >> I think one one term I heard you
[10:32] describe how to build the best agentic
[10:35] products on top of a Claude is this
[10:38] concept of a unhobbling
[10:41] Claude.
[10:42] And tell us more more about what that
[10:45] means.
[10:47] >> Yeah, so hobbling is this idea in a
[10:49] research that the model is doing
[10:51] something and you're just getting in the
[10:52] way.
[10:55] There there's this kind of like way of
[10:56] thinking about it that I really like.
[10:58] It's very useful when you're building
[10:59] product. And um
[11:02] it it it's called product overhang.
[11:04] And then the idea is
[11:07] the model is able to do all sorts of
[11:10] things
[11:12] with today's models, not a future model,
[11:13] but today's model, that we have not yet
[11:16] realized.
[11:17] And there are so many capabilities the
[11:20] model has like this that people are not
[11:23] aware of.
[11:24] And this is like the ability to, you
[11:26] know, like maybe use a particular tool,
[11:29] use a particular language, solve a
[11:31] particular kind of problem, do things a
[11:33] particular kind of way that we thought
[11:35] was kind of beyond the model's
[11:36] capability.
[11:38] And um
[11:40] there's this overhang.
[11:41] Because the model can do this at every
[11:43] given model generation,
[11:45] but there is often not a product that
[11:48] lets the model do this
[11:50] and lets it express this kind of ability
[11:52] to do this. And on the flip side, often
[11:55] what happens is the product gets in the
[11:56] way.
[11:57] And this getting in the way, we call
[11:59] this hobbling. And then not not
[12:01] eliciting the correct behavior from the
[12:02] model, we call this product overhang.
[12:04] So, it's kind of like two sides of the
[12:05] same thing.
[12:06] What One example of this was the
[12:08] original Claude Code.
[12:10] When I first started working on it, this
[12:12] was um
[12:14] you know, like a year and a half, 2
[12:15] years ago, something like that. This was
[12:17] like Sonnet 3.5.
[12:19] At the time, that was an incredible
[12:21] coding model. That was like the best
[12:23] coding model that exists. Nowadays,
[12:25] it's, you know, a pretty terrible coding
[12:27] model by modern standards. But I think
[12:29] that was like the first great coding
[12:30] model that that we built as Anthropic.
[12:33] And at the time, if if you looked at the
[12:35] coding products of the time, what were
[12:36] what were they doing? They were doing
[12:37] like single-line auto complete. They
[12:40] were doing sometimes multi-line auto
[12:41] complete. That was sort of a new idea.
[12:43] Um they were they were doing chat. So,
[12:45] you can talk to the agent, but it wasn't
[12:47] uh right access. You could only read.
[12:49] You could ask about the code base.
[12:51] And so, the the feeling was that there
[12:54] wasn't really a product
[12:56] that was fully eliciting the model's
[12:58] capability to write entire functions at
[13:01] a time, entire files at a time.
[13:04] At the time, it wasn't entire features.
[13:05] We weren't there yet, but probably
[13:07] entire files. That's that was the level
[13:08] of capability at the time.
[13:10] And so, the idea with Claude Code was,
[13:12] all right, we think the model can
[13:13] probably do this.
[13:14] What if we get rid of all the
[13:16] scaffolding
[13:18] and just give the model the simplest
[13:19] possible harness, so it can write an
[13:21] entire file at a time and build an
[13:24] entire feature?
[13:25] Um
[13:26] and that was that was kind of it. Like,
[13:28] was the product overhang of the time.
[13:29] The model was capable of doing something
[13:31] and everything was just kind of getting
[13:32] in the way.
[13:34] I I think that nowadays, with modern
[13:36] models, there's so much product overhang
[13:39] that I have I'm not seeing startups
[13:40] capture.
[13:42] And I think there's people thinking
[13:43] about these problems,
[13:45] but there's just a huge amount of amount
[13:46] of opportunity to elicit
[13:48] these behaviors from the model that are
[13:50] just like amazing and interesting and
[13:53] and commercially valuable.
[13:54] >> I think this is such a special insight
[13:56] for everyone here in the room.
[13:59] Basically, all of you could create the
[14:01] next Claude code if you figure out how
[14:04] to un-hobble the models because that's
[14:07] effectively the birth story of Claude
[14:09] code. You un-hobble Sonic 3.5 because
[14:13] all the previous
[14:15] iterations were still getting the model
[14:17] very rigid in in IDEs. And Claude code
[14:19] was one of the first
[14:21] instances that gave it just a full
[14:23] terminal access.
[14:25] >> Yes.
[14:25] >> And that
[14:27] then created this amazing product just
[14:30] that keeps going.
[14:31] So, let's talk about um
[14:34] what are some areas and how should
[14:38] future founders here think about
[14:40] un-hobbling
[14:43] Claude and fixing this product overhang?
[14:47] >> So, there's a couple of things that I
[14:48] would think about.
[14:50] One is
[14:52] you should give the model slightly
[14:55] harder tasks than what you think it can
[14:57] do.
[14:59] I think a a really common mistake that I
[15:01] see is people are using Claude code,
[15:03] they're using Claude, and they they just
[15:05] give it like way over we specific
[15:07] instructions. They're like, "I want you
[15:08] to do this, but I want you to do it in
[15:10] this way, this way, this way. You must
[15:11] do like one, then two, then three, then
[15:12] four."
[15:14] And for modern models, that's actually
[15:15] really not the way to do it. You want to
[15:17] go a little bit higher level.
[15:19] You want to describe the task, you want
[15:20] to describe the guardrails, you want to
[15:22] describe like the exit criteria, and
[15:23] then just go with the model cook.
[15:26] And come back in a little bit.
[15:29] And I think it'll it'll surprise you.
[15:30] Like and again, like this is just not
[15:32] something that would have worked 6
[15:33] months ago, but it does work today.
[15:35] >> Can you give some examples of these
[15:37] challenging tasks or capabilities that
[15:40] people should explore that it can do now
[15:42] that it couldn't 6 months ago?
[15:44] >> Yeah. So, okay, one example is the model
[15:48] can now rewrite essentially any code
[15:50] base from one language to a different
[15:51] language.
[15:53] It's
[15:54] just sort of crazy. Like it's this work
[15:56] that would have taken just like a very
[15:58] long time as an engineer, and now the
[16:00] model's like quite fast at it. So, so
[16:02] one example of this is um
[16:04] Cloud Code is built on the Bun
[16:06] JavaScript runtime. It's a open source
[16:08] JavaScript runtime.
[16:10] Um it's an alternative to Node.js. It's
[16:11] kind of a faster node.
[16:13] Bun was written in Zig.
[16:15] Zig is a systems programming language.
[16:17] It's It's kind of like C. It's It's very
[16:18] low level. One of the problems with C
[16:21] with a with Zig is you have to manually
[16:24] manage memory.
[16:26] And so it's quite easy to run into
[16:27] situations where there's like memory
[16:29] leaks and, you know, other memory
[16:31] management issues.
[16:33] And so, one thing that the Bun team was
[16:35] doing is they were having Claude fuzz
[16:37] the code base and try to simulate and
[16:40] trigger memory leaks, and they were
[16:41] doing this for, you know, for a long
[16:43] period of time. They were able to find a
[16:44] lot of memory leaks. It was sort of like
[16:46] a case at a time. And that was kind of
[16:47] the capability of the model at the time
[16:49] was doing this fuzzing.
[16:50] And then at some point, Jared on the
[16:53] team was like, "Okay, let's just like
[16:54] rewrite it.
[16:56] Maybe the model can do this."
[16:58] And I I think this is like one of these
[17:00] test problems that he kind of threw at
[17:01] the model with every new model
[17:02] generation.
[17:04] And starting with Fable,
[17:06] the model started to be able to do it.
[17:09] And so I think Opus 5 could do it as
[17:11] well.
[17:12] And so what he did was
[17:14] essentially he defined a test suite.
[17:16] The nice thing about Bun is it's very,
[17:18] very well tested. There's a big test
[17:19] suite in Bun, there's a big test suite
[17:20] in Node.js. So, it's easy to know if you
[17:22] did the right thing.
[17:24] And he had the model rewrite it from Zig
[17:27] to Rust. It was one prompt. It was a
[17:30] dynamic workflow.
[17:31] And a dynamic workflows are a feature in
[17:33] Claude Code that essentially let you
[17:34] orchestrate, you know, dozens, hundreds,
[17:36] thousands of agents to do work
[17:38] productively.
[17:39] And it ran for 11 days, and it rewrote
[17:42] the entire code base.
[17:44] >> And this was one shot?
[17:45] >> It was one shot with It was No, it
[17:47] wasn't one shot, but it There was
[17:48] steering. There was steering.
[17:49] Um but previous models just couldn't do
[17:51] this, even even with the steering. It
[17:53] just wouldn't have been possible.
[17:55] >> 11 days? Oh my god. This would have
[17:57] taken in the past
[17:59] even with the best engineers, multiple
[18:01] months, years?
[18:02] >> Over Definitely over a year.
[18:04] >> Yeah.
[18:04] >> Yeah, over a year. This is like over
[18:05] 100,000 Like JavaScript runtimes really
[18:07] complicated. There's There's a lot of
[18:09] stuff in there.
[18:10] Um and yeah, it like it works. This is
[18:12] in production now. This is what Claude
[18:13] Code uses now when when you're running
[18:15] it.
[18:16] So, this is kind of one example. I I
[18:18] would give a second example also of
[18:20] product overhang. And so, this is like a
[18:22] practical use case where like there's a
[18:24] problem you're solving. It's like a
[18:25] business problem, an engineering
[18:26] problem, a product problem. And you
[18:28] should just keep throwing the latest
[18:29] model at it to see if it'll just do it.
[18:31] Cuz even if a previous model didn't, the
[18:33] new one might.
[18:35] I think the second way to think about it
[18:36] is experiment.
[18:39] And just give yourself like freedom to
[18:41] play with the model and do creative
[18:43] things.
[18:44] Often it'll surprise you.
[18:46] So, something that's actually been
[18:47] really popular at internally that's been
[18:49] kind of viral within Anthropic the last
[18:51] couple weeks is someone figured out that
[18:53] you can give Opus 5 OpenCV.
[18:55] >> Oh.
[18:56] >> And you can have it draw.
[18:58] And so, something you can do is you can
[18:59] ask Opus like, "Hey, use Open OpenCV to
[19:01] like draw this image." And it's actually
[19:03] quite good. It can do like portraits, it
[19:05] can draw like animals, it can do like
[19:06] landscapes. And we didn't train the
[19:08] model to draw. Like it it's just like
[19:11] the solicitation gap. Like if you ask it
[19:12] to do it the right way, it can just do
[19:14] it. And we discovered this kind of
[19:16] accidentally just by playing around and
[19:18] trying creative things that didn't have
[19:19] direct commercial applications.
[19:21] But it's just kind of interesting. And
[19:23] my hypothesis is there's probably
[19:26] dozens, hundreds of opportunities like
[19:28] this with the models of today that no
[19:31] one has yet realized.
[19:32] >> And the big area of research for this is
[19:34] basically model elicitation, right?
[19:37] Becoming really good at
[19:40] figure out all these capabilities and
[19:42] asking the model to do the right thing,
[19:43] right?
[19:44] >> Yes.
[19:45] >> How do people get better at that? And
[19:47] effectively, how do people get better at
[19:50] prompt engineering? Do people still need
[19:51] to do a lot of prompt engineering? Or is
[19:53] that changing as well? Tell us about
[19:56] where this is going.
[19:57] >> Yeah, I remember like a year ago one of
[19:59] the most popular job openings was prompt
[20:01] engineer.
[20:03] And then it kind of changed and then I
[20:04] think it became like context engineer.
[20:08] So there's these kind of waves of it. I
[20:10] think I think these will kind of like
[20:11] come and go.
[20:13] I think the skill nowadays
[20:15] is less about prompt engineering and
[20:18] more about figuring out how do you give
[20:21] Claude a hard task
[20:22] that seems a little bit too hard.
[20:25] And then how do you make it possible for
[20:26] Claude to verify its work along the way?
[20:29] And the verification I think is probably
[20:31] the single most important thing that
[20:32] people do not get right or actually.
[20:35] Um
[20:36] one example of this is people were you
[20:41] know, we have this desktop app for
[20:42] Claude. And it's built using electron.
[20:45] We've made it quite fast. So now it's
[20:46] like a pretty awesome experience. Six
[20:48] months ago it was like sluggish and it
[20:50] wasn't very reliable. Now it's pretty
[20:52] awesome. And you know, it's the thing
[20:53] that most of the team uses.
[20:55] As an experiment though, I wanted to see
[20:57] like what would it feel like if it was
[20:59] native?
[21:00] And so what I did is I I started a
[21:02] Claude tag session. And Claude tag is
[21:04] just you know, it's a it's a new product
[21:06] we have. It's just quad running in
[21:07] Slack. My first question was, "Hey
[21:09] Slack, do you have access to a Mac OS
[21:11] runner on GitHub?"
[21:12] And uh it said no. And then I I hooked
[21:14] up a runner, so it was able to start a
[21:16] Mac virtual machine uh using using
[21:18] GitHub.
[21:19] And then um my second question is uh I
[21:21] created this like empty code base that
[21:23] was uh
[21:24] quad desktop app rewritten in Swift.
[21:27] And I asked, "Can you access this code
[21:28] base?" It said no. And then I gave it
[21:30] access and I was like, "Okay, great. Now
[21:31] I have access."
[21:33] And then I was like, "Okay, now I want
[21:35] What I want you to do is I want you to
[21:38] rewrite the Electron app in Swift.
[21:42] I want you to run the Electron app in
[21:44] the Mac virtual machine, screenshot it,
[21:47] and then look pixel by pixel,
[21:50] compare it to the Swift version,
[21:52] don't stop until you're done."
[21:54] >> And that was your prompt, basically.
[21:56] >> That was my prompt.
[21:57] >> And how long did this take to run?
[21:59] >> It's still running.
[22:02] >> When did you start it?
[22:03] >> [laughter]
[22:04] >> It's been
[22:05] uh it's been a little over 2 weeks, so
[22:06] it's like 14 days, 15 days.
[22:09] >> Yeah, so I don't know if anyone in the
[22:11] audience has gotten Claude to run a a a
[22:15] task for more than 2 weeks.
[22:18] I don't know. If raise your hand, anyone
[22:19] in the audience.
[22:22] >> Oh.
[22:23] >> All right.
[22:24] Some some.
[22:25] >> This is This is like one of these um
[22:27] this is about hallucination. So, it's
[22:29] So, this is really one of those examples
[22:31] where the model can do it today.
[22:33] You just have to let it do it. And you
[22:35] don't need the fancy stuff. You don't
[22:36] need slash goal, you don't need slash
[22:38] loop. These help,
[22:40] but really all you need is give the
[22:42] model the task,
[22:43] give it a way to verify the output of
[22:45] its work so it doesn't get stuck, and it
[22:47] will just go.
[22:48] And actually in this case, Claude also
[22:49] decided to live blog it. So, what it did
[22:52] is it created a Slack channel internally
[22:54] and it started just posting screenshots
[22:56] every few minutes of its progress.
[22:57] >> Wow.
[22:59] So, the prompt sounded so simple.
[23:01] I mean, everyone here could do it.
[23:04] And
[23:06] um I guess
[23:07] what is separating the people here that
[23:09] can become the top 1% Clocko users? How
[23:13] do How do How do people learn to use
[23:15] Clocko like Boris?
[23:17] >> Maybe like
[23:18] don't listen to the LinkedIn
[23:20] influencers.
[23:21] >> Don't listen to
[23:22] Don't read Twitter.
[23:24] >> [cheering]
[23:24] [applause]
[23:28] >> This is the thing about the model is uh
[23:30] I think everyone's looking for like the
[23:31] one weird trick to do it. The There's
[23:33] just like that doesn't exist. There's
[23:34] nothing like that. The The way the model
[23:36] works is you have to approach it
[23:38] empirically. You have to give it a task
[23:39] that's too hard. You have to give it the
[23:41] tools to verify the work like you would
[23:43] yourself, like you would if you were
[23:44] doing the task. You have to see where it
[23:46] struggles and then uh you have to like
[23:48] fix that either with better prompting or
[23:51] with a skill or if the model's missing
[23:53] context like give it a MCP so it can
[23:55] pull in the context that uh that it
[23:57] needs.
[23:58] Uh that's kind of it.
[23:59] >> It sounds very simple.
[24:01] >> [laughter]
[24:01] >> I think people tend to overthink it a
[24:02] little bit. I think people tend to
[24:04] overengineer.
[24:05] Cuz I think in a lot of ways like when
[24:07] we built systems in the past, that's the
[24:08] way you had to do it. So when I look at
[24:10] engineers that have been, you know,
[24:12] coding for a long for a long time, you
[24:14] know, like for for years or for decades,
[24:16] this is a really really common failure
[24:18] mode is trying to over specify and it's
[24:21] trying to be overly specific and then,
[24:22] you know, get the model to do the to do
[24:24] the task exactly the way that you would
[24:25] have done it. And that that's just not
[24:27] the way the model works.
[24:29] But I think a lot of people are kind of
[24:30] unlearning this and it's a journey to to
[24:32] unlearn it. And um
[24:35] it's a journey to kind of figure out how
[24:36] how do you treat this thing like you
[24:38] would a coworker. I think that's the
[24:39] level of intelligence that it's at now.
[24:42] >> And as part of this, let's go deeper
[24:43] into this task that's still running. Two
[24:45] weeks since you launched it a go two
[24:46] weeks ago.
[24:48] How many agents did it spawn?
[24:50] >> You know, I'm not sure. I I can ask Bod
[24:52] and then I I can get back to you. I
[24:53] would I would guess
[24:56] thousands, tens of thousands.
[24:57] >> Thousands. Has anyone in the audience
[24:58] had a uh prompt to to any of the models
[25:02] that run that spawn more than a thousand
[25:03] agents?
[25:05] No?
[25:07] I think this is another of the tips,
[25:08] like the best Claude users are able to
[25:12] spawn tasks that are really
[25:14] providing you a lot of leverage, like
[25:15] thousands of agents.
[25:17] >> Yes.
[25:18] >> How do you do that?
[25:19] >> There There's a few different ways to do
[25:21] it. Um
[25:22] the easiest way is dynamic workflows.
[25:26] To use dynamic workflows, it's a fairly
[25:28] new feature in Claude code.
[25:29] And all you have to say is use a
[25:32] workflow.
[25:34] That's it. And then Claude will just
[25:35] trigger the dynamic workflow. What a
[25:37] dynamic workflow is is essentially we
[25:39] have the we have the Bun runtime.
[25:41] We use Bun as a sandbox, and we start a
[25:44] virtual machine within Bun.
[25:46] And we let Claude start a lot of agents
[25:48] and orchestrate them. And it it doesn't
[25:50] just do one agent, it doesn't just do
[25:52] like 10 parallel agents. What it might
[25:54] do is um let's say a task is like
[25:56] rewrite the code base, or do really
[25:59] in-depth data analysis over some really
[26:01] complicated data, or maybe like build a
[26:04] very complex feature that takes multiple
[26:06] stages,
[26:07] and maybe dozens of pull requests.
[26:09] And so what it's going to do is it's
[26:10] going to start a bunch of agents to do
[26:12] kind of like the first pass.
[26:14] Based on that, it might do a second step
[26:16] where it has another set of agents that
[26:18] verify the work, or that summarize the
[26:21] work.
[26:22] Then it might do like a third stage,
[26:24] where it'll fan out again.
[26:26] So it'll kind of productively
[26:27] orchestrate a bunch of different agents.
[26:29] So my background is functional
[26:30] programming.
[26:31] And so the way that we designed this is
[26:33] is essentially an algebra for agents.
[26:36] So there's a way to run agents in
[26:38] sequence. There's a way to run agents in
[26:40] parallel. And Claude has different tools
[26:43] in order to orchestrate these agents
[26:45] inside of the sandbox, to use tokens
[26:47] efficiently, to do really, really
[26:50] complex work. It's kind of
[26:52] cool and something that just hasn't
[26:55] really been written about a lot. Like
[26:56] this is actually like a new form of test
[26:58] time compute. Like when we talk about
[27:00] the scaling laws and kind of we talk
[27:01] about the model getting more intelligent
[27:03] over time,
[27:04] historically,
[27:06] it's been a function of the size of the
[27:07] neural net,
[27:09] the amount of training data, and the
[27:10] number of flops that you put in to the
[27:12] training.
[27:13] And then recently, we also added test
[27:15] time compute. So this is essentially a
[27:16] fancy way a researcher way of saying how
[27:18] many tokens does it generate.
[27:21] And now
[27:22] dynamic workflows are essentially a new
[27:24] way to orchestrate test time compute.
[27:27] And it's a new way to kind of really,
[27:29] really ramp up the amount of test time
[27:30] compute that you use to do a really hard
[27:32] task.
[27:34] So this all very long way to say this is
[27:36] one way to launch thousands of agents in
[27:38] a way that is productive and efficient.
[27:40] A second way to do it is loops and
[27:43] routines.
[27:44] Loop is essentially a cron job that's
[27:46] running locally for Quad. Routine is the
[27:48] same thing, but it's running the Quad in
[27:50] the cloud.
[27:51] So you can close your laptop. And this
[27:54] is like slightly different because for a
[27:55] dynamic workflow, it's one task and you
[27:58] break it up into chunks.
[27:59] For loops and routines, it's one task
[28:01] that is repetitive, that doesn't share
[28:03] context, but it might share memory.
[28:05] And you kind of do this like over and
[28:07] over. You can do it like maybe every
[28:08] hour, every 5 minutes, every day.
[28:11] And so the thing that we've started
[28:12] doing is um we actually have Quad
[28:14] maintaining itself now.
[28:16] And the way we do this is we have a
[28:18] Slack channel where we just had Quad
[28:21] start a bunch of different routines to
[28:23] maintain its own code base. And we
[28:25] actually do this for the CLI, for the
[28:27] iOS app, for the Android app, uh for the
[28:29] desktop app.
[28:30] And you for example, one routine is
[28:32] clean up dead code.
[28:34] This is a single prompt. It's like one
[28:35] sentence. Quad runs this every day.
[28:38] It'll look for dead code across all the
[28:39] code bases using static and dynamic
[28:42] analysis. We didn't prompt that. It just
[28:43] kind of figured it out.
[28:45] And it'll put up a pull request every
[28:46] day to the weak the dead code.
[28:48] Another example is shipping experiments
[28:51] that should go out. Um so the
[28:53] experiment's already out to 100%. It'll
[28:56] delete it from the code base and it will
[28:57] just ship it. Another one is writing
[29:00] tests for areas of the code base that
[29:01] need test coverage. Another one is
[29:04] deleting tests that don't need to be
[29:06] there cuz you know, they were kind of
[29:07] useless tests added by older models or
[29:09] added by people at some point. One that
[29:11] one that I really love is this um
[29:14] I forgot what we called it. I think we
[29:15] called it abstraction police.
[29:17] And the idea is there are often in a big
[29:20] code base, there's kind of the same
[29:21] abstraction and it appears multiple
[29:23] times and if you kind of squint it
[29:24] actually maybe should just be the same
[29:26] abstraction, but kind of over time for
[29:28] whatever reason you rebuilt it multiple
[29:31] ways in different parts of the code
[29:32] base. So Quad kind of goes out every day
[29:35] across all our code bases, it finds
[29:37] these nearly duplicated abstractions and
[29:39] it unifies them. And so now we have
[29:41] every day maybe 20 or 30 of these
[29:43] routines. It's running across all of our
[29:45] code bases and
[29:47] it's not totally there yet, but we're on
[29:50] the path to fully automating the
[29:51] maintenance of our apps by doing this.
[29:54] And this is again hundreds of agents
[29:57] running every day, sometimes thousands
[29:58] of agents every day. It's doing the work
[30:00] of you know, dozens or hundreds of
[30:02] engineers. This is kind of what it used
[30:04] to take to do this kind of work.
[30:06] And this means that engineers can just
[30:08] like do the thing they actually want to
[30:09] do, which is ship new product and talk
[30:11] to users and do stuff that's actually
[30:14] fun.
[30:15] >> I guess nice conclusion from this, which
[30:17] you have mentioned in the past that
[30:19] basically coding is solved, right?
[30:22] You have mentioned this.
[30:24] Um
[30:25] I'm curious now that effectively
[30:27] everyone can write software, what
[30:29] separates the exceptional builders
[30:34] from the rest? What what are the
[30:35] qualities now that everyone can ship
[30:37] code?
[30:38] >> I I would give like one caveat. So
[30:40] coding is solved for the kind of coding
[30:42] that I do.
[30:43] It's not solved for everyone.
[30:45] You know, there's still code bases that
[30:46] are like super deep systems code bases
[30:49] where quad still struggles. There's
[30:50] distributed systems where quad still
[30:52] struggles. There's really kind of in the
[30:55] weeds UI verification, like something is
[30:56] off by pixel or something. Quad is still
[30:58] not perfect at this. Like Opus 5 was a
[31:00] big leap in vision and computer use, but
[31:03] it's still not perfect.
[31:04] Um but I I'm actually curious for people
[31:07] here, maybe raise your hand if 100% of
[31:10] your code is written using agents. You
[31:12] don't write any code by hand anymore.
[31:16] It's pretty good. Okay, how about more
[31:18] than 50%?
[31:22] Slightly less hands, maybe about the
[31:23] same.
[31:24] Yeah.
[31:25] So I think it's like it's getting there.
[31:27] So it's kind of getting to this to you
[31:29] know, to being solved for more and more
[31:30] kinds of code. And that's kind of cool.
[31:32] When I think about the people that are
[31:34] the best at using quad,
[31:37] I think there's a certain mindset that
[31:39] you can bring that's really effective.
[31:41] And it's really about being empirical.
[31:45] So forget all of the things that you
[31:47] learned about past models. Forget
[31:49] everything that you've learned about
[31:51] computer science theory in class.
[31:54] Look at the model,
[31:55] try to do a task, see where it
[31:58] struggles, and then based on that
[31:59] adjust. So it's just like very much
[32:01] become it's not a theoretical science,
[32:04] it's become an empirical science.
[32:07] So I think people that are really good
[32:08] at this, that are really good at kind of
[32:09] forgetting their priors, letting go of
[32:12] you know, this like maybe idea that
[32:13] didn't work before and just being open
[32:14] to trying it again.
[32:16] This is the kind of skill that's just
[32:17] very, very successful now.
[32:20] >> Now my last question is given everything
[32:23] that we talked about, if there's someone
[32:26] here that's studying CS,
[32:28] and you you learned to program before
[32:30] this era of AI agent coding,
[32:34] what should students still learn the
[32:36] hard way, like the old way.
[32:39] >> So for me,
[32:40] I learned computer science practically.
[32:45] I learned it by teaching myself to code
[32:47] in order to solve problems.
[32:49] Whenever I was doing this, I was doing
[32:51] it to solve a particular problem that I
[32:54] had.
[32:55] So I actually first learned to code on a
[32:57] TI-83 calculators.
[32:59] Um this is back in middle school and um
[33:02] I ended up actually writing a guide on
[33:04] the internet for programming TI-83
[33:06] calculators. It's still up on the
[33:07] internet somewhere.
[33:08] Um and it was uh it was basic. That that
[33:10] was my first language.
[33:12] And I I learned how to program on a
[33:14] calculator so I could just like get
[33:15] better at my math tests
[33:17] by uh by cheating on the test.
[33:21] >> [applause]
[33:25] >> So it it it was about something
[33:27] practical, you know, that like to me as
[33:28] a middle schooler that was kind of like
[33:29] the most practical thing I could think
[33:30] of. And I ended up getting good grades
[33:33] and then I got this little serial cable
[33:34] to give the you know, the programs to my
[33:36] classmates and they got really good
[33:37] grades. And then the math got a little
[33:39] bit harder. Um it wasn't something that
[33:42] I could solve in basic anymore. So I
[33:43] kind of went from this like, you know,
[33:45] like maybe algebra solver that was
[33:47] written in basic and I had to solve
[33:49] harder problems. And um you know, like
[33:52] once we got into calculus, I had to
[33:54] learn assembly so I can write
[33:56] a better solver so I could cheat better
[33:57] on the test now that it was calculus.
[34:00] And so for me, programming has always
[34:02] been very practical and I think this is
[34:04] always my advice for people in school is
[34:06] learn not just the computer science.
[34:08] This is like intellectually fascinating
[34:10] and it's really really interesting to
[34:12] know, but learn how to apply it. And
[34:13] often this is about building startups.
[34:15] It's about building products. It's about
[34:17] developing your own design sense,
[34:19] developing your business sense, learning
[34:21] how to how to do data science, learning
[34:23] how to talk to users. There are all
[34:25] these other skills and when you combine
[34:27] it with computer science and
[34:29] engineering, that's where it becomes
[34:30] really really valuable. So those are the
[34:32] hard skills that I would still be doing
[34:34] by hand.
[34:36] >> So, if I'm hearing and summarizing,
[34:38] start with making something you want
[34:40] first for yourself, and then level up
[34:43] and make something people want.
[34:45] >> Yes.
[34:47] >> And we just have one last special
[34:49] announcement for us. You want to one one
[34:51] last thing?
[34:53] >> Yeah, so um
[34:54] for everyone here today,
[34:57] uh you are getting Max 20X.
[35:03] >> [cheering]
[35:08] [cheering]
[35:09] [laughter]
[35:15] >> Pretty good.
[35:16] >> [applause]
[35:17] >> So, look for look for a code in your
[35:19] email. And uh I can't wait to see you
[35:21] what you build.
[35:22] >> We'll send an email.
[35:26] >> [applause]
[35:26] [cheering]
[35:30] [applause]
[35:31] >> So, I'm curious. Someone in this room
[35:32] should be building something that runs
[35:34] hopefully multiple months and thousands
[35:36] of agents now that you have the account
[35:39] to do it. And with that, thank you so
[35:41] much, Forrest.
[35:42] >> Thank you.
[35:43] >> [cheering]
[35:47] [applause]