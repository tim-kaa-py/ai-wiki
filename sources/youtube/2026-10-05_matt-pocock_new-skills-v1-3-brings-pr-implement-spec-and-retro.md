---
title: "New Skills! v1.3 brings /pr, /implement-spec, and /retro"
type: "youtube"
channel: "Matt Pocock"
date: "2026-10-05"
resource: "https://www.youtube.com/watch?v=BsJGo1wFTvQ"
pillar: "building"
tags: [claude-code, agents, workflow, best-practices]
timestamp: "2026-10-14"
extraction_method: "auto-captions"
video_id: "BsJGo1wFTvQ"
duration: "14:34"
---

# New Skills! v1.3 brings /pr, /implement-spec, and /retro

## Transcript

[00:00] Hello folks, version 1.3 of my skills
[00:03] repo is out and it brings three very
[00:06] important skills that have become
[00:07] central to my workflow. Today I'm going
[00:09] to show you about implement spec. I'm
[00:11] going to show you about PR and I'm going
[00:13] to show you about retro. And retro I
[00:16] think is the one that I've just seen
[00:19] absolutely go nuts on socials. People
[00:21] going crazy for this skill and it has
[00:24] felt incredibly powerful to me too. And
[00:26] the first place I want to start is the
[00:28] implement spec skill. The main flow of
[00:30] my approach for landing huge chunks of
[00:33] work at once is essentially two
[00:35] different entities. You have a spec and
[00:38] then you have the tickets that implement
[00:40] that spec. The spec kind of acts like
[00:42] the place where you're going and then
[00:44] the tickets break that destination down
[00:47] into a set of sessions that you can then
[00:50] run in a single coding agent. If you try
[00:52] to implement the spec all in one coding
[00:54] agent, you would go into the dumb zone
[00:56] of that coding agent, you might end up
[00:58] hitting auto compact. And you know,
[01:00] while that works sometimes, and it is
[01:02] getting better, I still think that
[01:04] breaking things down into individual
[01:06] tickets is just a lot cleaner. Now, the
[01:08] way that you orchestrate those tickets,
[01:09] the way that you give them each to one
[01:12] coding agent has always been a little
[01:13] bit confusing for users. And I've kind
[01:16] of been sort of going back and forth
[01:18] over the way that I recommend you do
[01:20] this. The most annoying and manual way
[01:23] to do this is managing it yourself where
[01:25] you the user say okay uh agent we are
[01:28] going to implement our first ticket. You
[01:30] wait for it to be complete. You clear
[01:32] the context and then you say okay
[01:34] implement ticket two. You wait. You
[01:36] clear the context. You say implement
[01:38] ticket three. You're kind of acting like
[01:40] a for loop there. It's not really
[01:42] workable. So that is what I would
[01:44] describe as the manual loop there which
[01:46] is not much fun. But you can change that
[01:49] by having a deterministic loop where you
[01:51] have a script that reach uh reads each
[01:53] ticket and then runs implements on it
[01:55] itself. This is how I recommend that
[01:57] most people do this because once you've
[01:58] set up your deterministic loop, it's
[02:00] going to run the same way every time.
[02:02] It's very reliable and it's cheap,
[02:05] right? Because you're not using an agent
[02:06] or you're not using a human to run that
[02:09] loop. You just essentially get a script
[02:11] to do it for you. But setting this up is
[02:13] quite complicated and requires a lot of
[02:16] patience as you sort of refine your loop
[02:18] and get it better and better. And so I
[02:20] see this as out of range for beginners.
[02:22] And so I wanted some way of allowing
[02:26] beginners to see not have to manually
[02:29] loop it themselves. And so I decided,
[02:31] okay, why don't we try a middle ground
[02:34] where we have sub agents go through and
[02:37] implement the loop. In other words, an
[02:38] agent does the babysitting instead of a
[02:41] human. This means that all of the
[02:42] tickets will be implemented by sub
[02:44] agents. And this has recently gotten
[02:47] possible because sub aents can
[02:49] themselves spawn sub aents. So before
[02:52] sub agents were kind of a little bit
[02:54] nerfed whereas now they're actually as
[02:56] powerful as orchestrator agents. And so
[02:58] this is what implement spec does is it
[03:01] the agent sits there looking at all of
[03:03] the tickets orchestrating them and then
[03:05] implements them in sub aents. This is I
[03:08] would say worse than doing a
[03:10] deterministic loop because the
[03:11] deterministic loop again it's
[03:12] deterministic. It works the same way
[03:14] every time. But implement spec is a good
[03:16] way to get started with AFK workflows
[03:19] away from keyboard workflows where you
[03:21] step away and it implements the entire
[03:23] spec. Before you use any skill, you
[03:25] should read the entire skill. And it's
[03:27] not particularly long here. There are
[03:30] nine steps in its process and it's got a
[03:32] little bit of reference material just at
[03:33] the top. One crucial thing is it goes
[03:35] for parallelization where it can. And so
[03:37] this says the tickets are not a list of
[03:39] steps. They're a task graph with
[03:41] blocking relationships between them.
[03:43] That means there's always a frontier of
[03:44] tickets that are ready to be grabbed. If
[03:46] we take a look at the steps, we can see
[03:47] it reads the spec and tickets. It does a
[03:50] little bit of exploration in its own sub
[03:52] agent. It creates an integration branch
[03:55] and then it goes and uses implement sub
[03:57] aents to implement each ticket using TDD
[04:00] and using work trees too. Once that's
[04:02] done, it merges its work to the
[04:04] integration branch with a sub aent and
[04:07] then pings off more implement sub aent
[04:09] until all the work is done. And once it
[04:12] the work is done, it goes and calls code
[04:14] review on the integration branch. Then
[04:16] it cleans up all of its work and makes
[04:18] the PR ready for review. So you get a
[04:20] single PR off this huge great big spec.
[04:23] I have been reaching for this a lot more
[04:25] than I thought I would, especially on
[04:28] systems where you haven't set up these
[04:29] deterministic scripts yet, where you
[04:31] don't have your like software factory
[04:33] dialed in. I suppose implement spec has
[04:36] been really really useful. It's been in
[04:37] in progress for a while now, but I
[04:39] thought now's the moment. Let's graduate
[04:41] this so people can use it and fiddle
[04:43] around with it and build their own
[04:44] version of this, too. This is a basic
[04:46] version of how you might implement your
[04:48] own spec. You could do something totally
[04:50] different to this. You could use stacked
[04:52] PRs. You could do all sorts of stuff.
[04:54] And in fact, talking of PRs, one of uh
[04:56] my most used recent skills has to be the
[04:59] PR skill. So, PR skill.md. I've been a
[05:02] huge fan of Dex Hies for a while now. I
[05:04] recently got to meet up with him in
[05:06] person and he has this gorgeous skill
[05:08] called Show Me. What show me does is it
[05:10] helps the user understand the current
[05:12] topic visually with concise diagrams and
[05:15] it uses all of this like uh really nice
[05:18] pseudo code. This looks a little bit
[05:20] garbage, but actually when you see it in
[05:22] the context of a PR, it really makes the
[05:25] PR a lot easier to read and review. PRs
[05:28] are still the main bottleneck for work
[05:30] getting to Maine. And my goal with this
[05:33] PR skill, kind of inspired by Show Me,
[05:37] is to make human review as easy as
[05:40] possible. And in the skill, we provide
[05:41] essentially a template for writing a PR
[05:44] body. That's all the skill does. We
[05:46] first start with a summary based on the
[05:48] kind of show me template which we
[05:50] include in the skill and then we ask for
[05:53] evidence. So before and after. This
[05:55] evidence is an essential part of
[05:57] learning to trust your agent, learning
[06:00] to trust your agents outputs. and
[06:01] actually prompting it to provide
[06:03] evidence often means it runs an extra
[06:05] test or it takes an extra screenshot if
[06:07] it has that ability and it provides you
[06:10] runtime information on that it's actual
[06:14] change is doing what it thinks it's
[06:15] doing without asking for hard evidence
[06:17] it's very easy for agents to say yeah
[06:19] that probably works cuz I've read the
[06:20] code but no verification is something
[06:22] I'm beginning to be really obsessed with
[06:25] especially after my recent interview
[06:26] with Lauren and then the third heading
[06:28] here is merge danger so how dangerous Is
[06:31] this PR going to be to merge? One
[06:33] metaphor I've really like here is, is
[06:35] this a one-way door or is this a two-way
[06:38] door? A two-way door is a door that you
[06:40] can walk back through. In other words,
[06:41] we can easily revert this PR. But a
[06:44] one-way door is a, you know, a PR that's
[06:46] going to do something out in the world.
[06:49] It's going to delete some data or it's
[06:51] going to be expensive in some way to
[06:53] roll back. And then finally, you have
[06:54] blast radius here. So the potential
[06:56] ramifications of the changes. So, if you
[06:59] have a very small blast radius on a
[07:01] two-way door, then, you know, you really
[07:03] don't need to like review that PR very
[07:05] hard. And so, having this at the bottom,
[07:07] probably the, you know, first or second
[07:09] thing the person is going to see is
[07:11] essential. So, for instance, here's one
[07:13] of the PRs in my repo that has been
[07:15] provided by the PR skill. This is
[07:16] essentially merging two algorithms that
[07:19] were basically the same. And we can see
[07:21] the files deleted and the files added in
[07:23] the right context. We understand the
[07:25] functions, the sort of the call stack
[07:27] that's being structured here, but
[07:28] crucially, we have the evidence. We have
[07:30] a before and after on a real entity. So,
[07:33] there's no intro in this one, but
[07:35] afterwards, it adds the intro, which is
[07:37] kind of the behavior that we want here.
[07:39] And finally, we can see that the merge
[07:40] danger is two-way. It's just a pure
[07:42] refactor plus one deliberate behavior
[07:44] change, and the blast radius is small.
[07:46] So, this PR skill is just become
[07:48] absolutely indispensable to my flow. It
[07:50] is also one of the most consistently
[07:52] invoked model invoke skills that I've
[07:54] seen. The you you the user don't have to
[07:57] worry about it at all. It seems to just
[07:59] invoke it every single time, at least on
[08:01] Opus 5.5. So you should just be able to
[08:03] download it and just see your PR bodies
[08:05] get better. And of course, if you
[08:07] already have a PR body skill, then why
[08:09] not just steal what you can from this?
[08:11] Now, before we talk about the retro
[08:12] skill, we should mention that there has
[08:14] been a big change in how my especially
[08:17] grill with docs function. So let's take
[08:19] a look at domain modeling here and
[08:21] domain modeling skill now instead of
[08:25] writing to context.md writes to
[08:27] glossery.mmd. The inspiration for this
[08:29] skill came from DDD came from Eric
[08:32] Evans's book domain driven design. And
[08:35] [snorts] for that I was essentially
[08:37] using a file name based on the concept
[08:40] of bounded context from DDD. And so this
[08:43] used to be context.md like this. But now
[08:47] I've sort of moved away from the DDD
[08:50] style flow. I mean, I still use DDD in
[08:53] all but name, but I wanted a slightly
[08:56] less overloaded term here. Context.md
[08:59] just felt way too vague. It didn't sort
[09:02] of trigger the agent to pull it in at
[09:03] the right moment. And for users, it was
[09:06] pretty confusing. I also ended up
[09:07] reducing the amount of stuff in glossery
[09:10] or in context.md until it was literally
[09:12] just a glossery. So there really is no
[09:14] point anymore. glossery.mmd is now what
[09:16] we're going this is also updated
[09:17] everywhere and so loads of my skills
[09:20] rely on seeing a glossery.mmd in order
[09:23] to behave properly in order to use the
[09:24] domain language at all points and so you
[09:27] will need to definitely update this.
[09:29] There's no other behavior changes about
[09:30] the skill. It's really literally just a
[09:32] file name change and I think that this
[09:35] is one that folks have been wanting for
[09:36] a while. So I'm glad to ship it. But now
[09:38] let's take a look at the retro skill and
[09:40] let's actually do it by running it. What
[09:43] I noticed with my skill set is that I
[09:46] impose a lot I ask a lot of you the
[09:49] user. And what I was kind of asking of
[09:52] you is you were responsible for overtime
[09:58] making changes to the repo that would
[09:59] improve it. In other words, I was asking
[10:01] you to manage your agents.mmd to manage
[10:04] your skills, to make sure that your repo
[10:06] was token efficient, to make sure that
[10:08] your environment was good and safe for
[10:10] the agent to write code in, that you had
[10:12] good lint rules, that you had good
[10:13] navigation. And I realized that I
[10:15] personally was doing a lot of stuff to
[10:17] my repos to my agents in order to make
[10:20] them easier for me to work with to make
[10:22] them more performant. And so I realized,
[10:24] why don't I bundle that up into a skill?
[10:27] And this is what retro does. It is short
[10:29] for retrospective. You run it on a
[10:32] coding agent session, either the current
[10:34] one or, you know, 10 that I've currently
[10:37] got or let's say the previous one, and
[10:39] it will suggest improvements for next
[10:41] time. The cool thing about actually
[10:42] reading real sessions here is that it's
[10:45] able to look at what happened with the
[10:48] agent. It's able to see the
[10:50] inefficiencies that maybe the agent
[10:51] actually hides from. I really like this
[10:53] post from Andre Retro by Mogers. Game
[10:55] changer. My agents are bumping into all
[10:57] kinds of problems. that went undetected.
[11:00] But due to persistence, the features
[11:02] still got built one way or another. In
[11:03] other words, the agent doesn't complain,
[11:05] I think, as much as it should, and
[11:08] doesn't try to fix its own mistakes. You
[11:11] kind of need to get another agent to
[11:13] look back on those sessions and see
[11:14] where it went wrong and see how to help.
[11:16] And so, this is what our agent has found
[11:19] here. The agent ran an irreversible
[11:20] public action before you picked a fix.
[11:23] The agent found why the 1.3.0 release
[11:25] was missing and then it ran a release
[11:27] without actually asking. This is why, by
[11:29] the way, when you actually look at the
[11:30] releases, you'll see there's no 1.3.0
[11:33] release, only a 1.3.1 release. You know,
[11:35] Claude kind of screwed this up. I don't
[11:36] honestly care that much about it, so I
[11:39] don't mind this one in my context. We
[11:41] can see that this particular repo in has
[11:43] no actual guard rail. So, there is a
[11:45] PNPM check script, but nothing actually
[11:47] runs it. So, it's suggesting adding a CI
[11:50] pipeline here. In here, we can see
[11:52] there's context loss happening between
[11:54] compactions in long sessions. So, I use
[11:57] animatics to kind of create my videos or
[12:00] early drafts of them now. And it's
[12:02] saying that there's some loss when you
[12:04] compact. And so, it's saying move some
[12:06] of the repeated instructions into an
[12:08] animatic skill. This is definitely a
[12:10] really good one, and I'm definitely
[12:12] going to implement that for sure. Oh,
[12:13] look at this one. A custom CLI that I've
[12:15] created for my course video manager
[12:17] wastess tokens. So, Retro looks at token
[12:20] inefficiency too. Wiki, which is another
[12:22] custom CLI, is not on path locally and
[12:24] Wiki AI hero has gaps. So, Retro is
[12:27] merciless. It will look at your actual
[12:30] sessions and see what is going on and it
[12:32] will pretty much always find ways to
[12:34] improve. Now, what I'd say with Retro is
[12:36] you want to use your human judgment when
[12:39] you look at these. I know, for instance,
[12:41] the thing that it thinks is most serious
[12:43] is actually not that bad. It's just a
[12:46] release. I can always create and cut new
[12:48] releases. And so the way retro works is
[12:50] it's designed to be human in the loop.
[12:52] It's not designed to just keep creating
[12:54] these fixes random. Pretty much everyone
[12:56] when I show them this, they go, "Ooh,
[12:58] I'd love to automate this." No, you
[12:59] don't want to automate this. Automating
[13:02] this means that the agent will get
[13:03] itself into a loop where it continually
[13:06] finds false positives. It continually
[13:08] tries to fix things and you'll end up in
[13:10] this weird trajectory where it just
[13:12] takes the repo and your agent into a
[13:14] place it shouldn't really go. So, I
[13:16] recommend you run retro on a sampling of
[13:19] your agent sessions. Every time you've
[13:21] got a free moment and you realize, "Oh,
[13:23] I haven't run retro in a while." Just
[13:25] try getting it to run through your most
[13:27] recent sessions. Maybe a session that
[13:29] has gone wrong, let's say, or you feel
[13:31] the agent has done something weird, and
[13:33] retro will usually find a fix. We can
[13:35] see that inside the steps in the retro
[13:37] skill, it has several categories for
[13:39] improvements that it looks for. How easy
[13:41] is your codebase to navigate? Are there
[13:44] automated checks that we could add?
[13:46] Could we add coding standards for the
[13:47] automated reviewer to enforce? How
[13:50] healthy is the global agents.mmd? Is the
[13:52] tool economy any good? Are there any
[13:54] noops in the instructions in steering
[13:56] files? Does the agent have access to all
[13:58] the information it needs? Overall, I've
[14:00] seen my token efficiency and just the
[14:02] quality of work that I've been able to
[14:04] produce massively increase by running
[14:06] retro regularly. And if you want to see
[14:08] the quality of your work increase too,
[14:10] then I recommend you take my AI coding
[14:12] crash course which is on aihero.dev. I'm
[14:14] updating this today with a new lesson
[14:16] focusing on implement spec. And if you
[14:17] want to take control of your coding
[14:19] agent and utilize my skills better, then
[14:21] this is the place. But folks, thank you
[14:23] so much for following along. Hopefully
[14:24] you enjoy Skills V1.3. Enjoy seeing the
[14:28] uncomfortable truth of how bad your
[14:30] agent sessions are with retro.
