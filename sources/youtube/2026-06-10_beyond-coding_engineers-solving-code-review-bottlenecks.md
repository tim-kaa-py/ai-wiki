---
title: "Why The Best Engineers Are Solving Code Review Bottlenecks"
type: "youtube"
channel: "Beyond Coding"
date: "2026-06-10"
resource: "https://www.youtube.com/watch?v=W1uG25of2t0"
pillar: "building"
tags: [agents, code-review, guardrails, spec-driven-development, tdd, workflow, best-practices, claude-code]
timestamp: "2026-07-02"
extraction_method: "manual-captions"
video_id: "W1uG25of2t0"
duration: "40:30"
---

[00:00] How do you scale the reviewing process?
[00:01] Because now that is blocking
your senior engineers.
[00:04] It burns them out.
[00:05] One answer is don't
do any code reviews at all.
[00:08] This is Florian Buetow,
AI engineer at Xebia, and we discuss
[00:12] the biggest bottleneck in software
engineering right now: code reviews.
[00:15] What do you think of spec
driven development?
[00:17] Which of these guardrails
gave you the most value?
[00:20] Does it matter which harness I use?
[00:21] GitHub Copilot, Claude Code, Codex.
[00:23] It matters immensely.
[00:25] Basically, what employees are doing
is they give people a hand grenade,
[00:28] which is AI, and then say don't
blow up the hand trade, but use it.
[00:32] This is how the best engineers are solving
the code review bottleneck right now.
[00:36] Here's the full episode.
[00:40] As we generate more code,
[00:42] this is really in the build phase code
review and becomes a bottleneck.
[00:46] I'm just come back from Google
I o that was last week.
[00:49] I think when this episode comes out
a couple of weeks ago,
[00:51] and even their Google
and the people there acknowledged
[00:54] code review is a bottleneck
and we don't know how to solve it yet.
[00:57] Yeah, Google is an interesting case
because in 2025, they already reported
[01:01] that 50% of the code is I,
and then I'm pushing for 75%.
[01:06] I always like to look at the big players
and see what they do,
[01:11] because on one side you see all of these
crazy numbers like efficiency gains, or
[01:16] we automated our entire deployment layer
with AI like Spotify did, for example.
[01:21] But very seldom
do you actually see how they do that.
[01:25] Right?
[01:25] So they report all of these gains.
[01:27] But then how do you translate that
to your own work?
[01:30] That part is often missing.
[01:32] And for the big companies
I think so if you look
[01:37] a little bit about how what they publish
and what they write, you can kind of
[01:42] see that they, they have like a,
[01:45] an approach that prioritizes reviewing.
[01:48] No, more like it becomes more standardized
because they've identified that
[01:53] now that you can generate code
very cheaply, you know,
[01:55] the bottleneck is moving somewhere else.
[01:57] Now some people
[01:58] and this is another tank,
but some people would argue
[02:00] that the writing code was never
the bottleneck.
[02:02] It depends on kind of
how do you see software engineering.
[02:05] But truth of the matter is
you generate ten more code.
[02:08] So now you have more pressure on your
reviewing, on your engineers, etc..
[02:13] And I think
what the big companies are doing right now
[02:15] is they are combating that
with policies on reviews
[02:20] at Amazon, for example,
there have been some instances
[02:22] where there were outages, revenue
loss due to I generated code,
[02:26] and then they put in policies in place
where they now require
[02:30] some parts of the code or 
some parts of the systems that they have
[02:34] to be reviewed by senior engineers
before anything gets merged or deployed.
[02:38] So they are identifying that,
you know, in some cases, AI generated
[02:42] code has to be scrutinized,
well, stronger than in other cases.
[02:49] So you can see that.
[02:50] And at the same time,
[02:51] you see other companies who say, okay,
we automated our entire PR review process.
[02:55] They applying like these.
[02:58] How would you say, well,
I like to think about it as a little bit
[03:00] like there's a horizontal way
of scaling AI engineering.
[03:04] And the vertical one, the horizontal
one is where you automate like processes.
[03:08] You currently have like a PR review,
like you can you can say any
[03:12] PR that is created automatically review it
with Copilot, for example.
[03:15] And that's what a lot of companies do.
[03:17] But then they don't really talk about
how that improves the quality.
[03:20] Right?
[03:20] So the automating part
of the human pipeline that we have,
[03:24] what's then the vertical axis.
[03:26] The vertical axis is if you have
[03:31] a project and a small specialized team,
[03:33] you let them build their own tooling
to make sure that the product ships
[03:38] and is developed
in the way that they intend to.
[03:42] So they are more involved in building
custom built environments
[03:47] for their coding agents,
and for the to deliver the software like
[03:51] they don't have a blueprint that applies 
to the product automatically.
[03:55] They refine it. Yeah.
[03:56] And this is the I see us
stacking a lot of capabilities, right.
[04:00] We have the model on one hand.
[04:02] Then the agent kind of harness
around the model specifically.
[04:05] And you're talking about an environment
in which this agent harness operates.
[04:09] How should I view that.
[04:11] Well,
maybe maybe should just go back one step.
[04:16] So if we look at software engineering,
I think
[04:19] it's a well-established process by now.
[04:21] Like if we think before the area of AI
[04:23] software
development lifecycle, everybody knows it.
[04:28] And part of the review was done by humans,
[04:33] and it would work because code wasn't
delivered faster than you could review it.
[04:37] That has changed now over there.
[04:39] And so the question that becomes, well,
how do you scale the reviewing process?
[04:44] Right.
[04:44] Because now that is blocking
your senior engineers.
[04:47] It burns them out.
[04:48] There are studies about that
where cognitive depth is growing,
[04:52] where people don't understand
or their own code base
[04:55] because they just don't have the time
to look at everything,
[04:57] or they don't even want to look at the age
narrated code, etc..
[05:01] And so the question is,
how do you mitigate that?
[05:05] And one answer is don't
do any code reviews at all, okay.
[05:09] But then the next question is
how do you do that?
[05:12] So I think
[05:14] one way to do it is to
[05:17] engineer the environment
in which the agents operate.
[05:22] With,
[05:24] well, with intention,
so that you don't have to be
[05:27] the human in the loop to give the agent
feedback on common things.
[05:30] And it starts with very simple things.
[05:32] So like just let's say code formatting,
[05:35] automatic code formatter,
we already had that or a security check.
[05:39] Lots of teams has integrated tools
like sonar cube or something
[05:42] that gives you feedback
that then a human would take
[05:46] and fix the code with, with the feedback
from those systems.
[05:50] Agents can do that automatically.
[05:52] So if you provide agents feedback
on what they're doing wrong and hopefully
[05:56] as close as possible to where
the agent actually generates the code,
[06:01] which means on the developer's laptop,
not necessarily in GitHub.
[06:05] After you make your commit or your PR,
[06:10] then you're suddenly in this world
of where you're trying to engineer
[06:13] feedback to the agents
in a way that helps the agents
[06:16] to run for a long time
without human intervention.
[06:19] So that's what I mean
by building these types of environments.
[06:22] Yeah.
[06:23] And I think it's very easy
to get started with it.
[06:26] A lot of it will feel like,
but we've been doing this before,
[06:30] but now you're giving the agent
that feedback.
[06:33] You're not taking it
as a human anymore, right?
[06:35] And some of the models
are surprisingly good at self-correcting
[06:39] cells wants to pinpoint them
what they did wrong
[06:43] and let the environment
give that feedback.
[06:45] Yeah.
[06:46] Does the harness in this equation,
does it matter which harness I use?
[06:50] GitHub Copilot cloud code Codex.
[06:52] Oh, yeah. Absolutely.
[06:54] Well, in my experience,
the harness matters more than the model.
[06:57] Okay.
[06:58] I mean, the harness is
what provides the tools, what provides
[07:01] some type of prompting, provides
the memory layer and all of these things
[07:07] that then get submitted to the LM
to generate as bronze, for example,
[07:11] where the LM wants to make a tool
call, etc., and the harness providers
[07:15] and the capability to execute the tool
for the LM, it matters immensely.
[07:20] I made an experiment
and one of my projects, where I tried to
[07:27] implement
a tool based on specifications and tests.
[07:30] So I had a full suite of specifications
like specification driven development,
[07:34] like many people like to do.
[07:35] Notice the idea is that 
if you specify your product
[07:39] exactly enough,
I will be able to implement it exactly
[07:43] according to specifications,
which is unfortunately not true,
[07:46] but it's an attempt that I made
and that failed.
[07:49] And then I thought, okay, what if I
[07:53] use the TDD idea and just generate
[07:56] all of the parallel tests upfront
and then let
[08:00] that be the feedback to the agent
who tries to follow my specifications?
[08:04] And depending on the harness
that I used, it worked or didn't work.
[08:07] Even if I was using the top frontier model
in both harnesses.
[08:10] Okay, which
which harness gave you the best results?
[08:12] Well, that keeps changing all the time. So
[08:16] at that time it was a cloud code.
[08:18] Gotcha.
[08:18] Now, I would have said I would say that
shifted to Codex for implementation work.
[08:23] But that's one of those things
that's like a moving target, which is also
[08:26] one of the reasons
why you can't really stop experimenting.
[08:30] There's this tendency for software
[08:32] engineers to try to systemize things
and make it a process.
[08:36] And okay. Those are now the rules.
[08:38] I don't think that works.
[08:39] Things are still moving too quickly.
[08:44] Okay, maybe I should walk that back
a little bit.
[08:46] It works at some level,
[08:47] but if you define in your policy,
we must only use cloud code.
[08:52] Who knows what will happen
when the next release comes out.
[08:55] It might be completely different
because the models have different
[08:58] quote unquote personalities
like some are very good at
[09:01] instruction following others are very good
at filling in the gaps.
[09:04] If you don't provide enough context
as a human.
[09:07] So you need to be careful
which model use as well.
[09:10] Yeah, I want to zoom in on
kind of what you recommend for harnesses.
[09:14] But before we do kind of following
your trailer, thought of spectrum
[09:18] and development and solving kind
of the code review process in that way.
[09:21] You mentioned the TDD approach worked
better than the spectrum
[09:24] development approach, with a model
following instructions in that way.
[09:27] Well, I would say, well, specs driven was
my first attempt and that didn't go well.
[09:32] It was the typical okay,
I create the perfect prompt
[09:35] and then the model
does something different.
[09:37] I didn't intend, but when you give those
the feedback in addition to tell the model
[09:42] when it's off track, that worked for me
in that particular instance.
[09:46] And I would say those results
might be transferable to other project,
[09:50] but it really depends on the project.
[09:52] Which again, brings us back to the
to the to
[09:54] the need to be to be willing to experiment
what works.
[09:57] Yeah.
[09:57] And this feedback, just so I understand
this is in an automated way.
[10:01] Right.
[10:01] So you have specs, then you have execution
and the feedback
[10:05] is not you telling what it did wrong.
[10:06] But what does that feedback
cycle look like. Exactly. Yeah.
[10:09] So if when you're using
like the CLI tools,
[10:13] you have the ability to define
what is called, for example, a stop hook.
[10:18] So when the agent is done with its work,
the harness triggers an event
[10:22] which is a stop hook.
[10:23] And you can wire that up to a shell script
that you are in, for example,
[10:27] so you can automate running
your test suite or your guardrails.
[10:32] I like to call them guardrails. And
[10:35] they then
you need to engineer your guard right.
[10:38] So they actually output
like natural language text.
[10:41] This is forbidden.
[10:42] Do it in this in that way.
[10:43] So you base
the feedback encodes the prompt
[10:46] that you would write as a human.
[10:48] So then you trigger that
and then that triggers
[10:51] the LM to continue working on the thing.
[10:54] And you can pair these feedbacks
that you give with things like roof loop,
[10:59] you know, Codex and Claude,
[11:03] they now have the goal command,
which really helps.
[11:06] So they will just keep running for long
and longer until they fix the issue.
[11:09] Yeah.
[11:10] So Ralph Loops
[11:11] specifically allow you to run
whatever you want to do in a loop, right?
[11:14] So it goes over it.
[11:15] And this feedback mechanism would
[11:16] then be input in an iteration
to get it right and to correct it.
[11:20] Goal is something similar.
[11:22] The idea is the same.
[11:24] Yeah, I don't know exactly what
the implementation of goal looks like,
[11:27] but it seems to be functional equivalent
to a roof loop.
[11:30] And which of these guardrails that you've
put in place gave you the most value?
[11:34] You mentioned linting already.
Some security controls.
[11:36] You have more examples.
[11:38] Yeah.
[11:38] So I'm I didn't know before, but I've
since become a great fan of semantic grep.
[11:43] Okay. Yeah.
[11:44] Because it allows you to 
put regex for things
[11:49] that it could catch and code for example
a certain type of code construct.
[11:53] The example that always give is
I don't want any default values
[11:57] in any of my methods.
[11:58] In Python, for example,
you know you can set default values
[12:02] for parameters in Python methods
and in the signature of the method. And
[12:07] this,
[12:08] in my
experience, is one of the greatest sources
[12:11] of frustration when you have to review
and debug the code later.
[12:15] So just prevent that by putting a rule
that detects
[12:19] these code patterns
and that then triggers error.
[12:23] You must not write it in that way.
[12:25] It's against policy.
[12:27] So semantic grep is really flexible. And
[12:31] whenever I interrogate the
AI about the code that I wrote,
[12:35] instead of reviewing the code myself,
you know, some of these issues come up.
[12:39] Why did you do it that way?
It doesn't make any sense.
[12:42] That immediately triggers me.
[12:43] Okay, let's add another guardrail rule
for this particular type of pattern.
[12:48] So what then happens over time
is you're shaping your environment.
[12:53] You're iterating towards it
to be tighter and tighter, to be aligned
[12:57] with your preferences as a human
or how you think code should look like.
[13:01] And part of that is not only taste,
but also
[13:06] you want to enforce
that the AI generates code that is easy to
[13:10] understand, not for humans,
[13:11] even if you don't want to read it
as a human, but also for AI.
[13:14] Write code is context.
[13:16] That's why code quality matters.
[13:18] If you just wipe code something,
sooner or later
[13:21] the eye is going to confuse itself
by the code.
[13:23] Yeah, the sustainability of code base
has always been needs to be simple
[13:28] and easy to change.
[13:29] And that perspective hasn't changed.
[13:31] With agents,
[13:32] we allow ourselves to generate
more code in the code that is out.
[13:35] There might not be simple
and might not be as easy to change,
[13:38] but we're like, well, it works, right?
[13:39] And then build it on top of
that might be quite brittle. Yes.
[13:43] And well, as humans,
we also allow ourselves
[13:46] this little exception
where we say as long as it's modular,
[13:48] it doesn't matter
if one of the modules is messy
[13:50] or something,
as long as it's isolated, right?
[13:52] It's behind abstractions. Yes. Yeah.
[13:54] And that's also something
that I found with AI.
[13:57] If you keep your things modular,
that helps a lot.
[14:00] Like if you have very clear boundaries
between modules,
[14:03] if you have well-defined interfaces that
are not allowed to change, for example.
[14:07] And, and I would say that
brings us to another
[14:11] type of Gadara
which are architectural constraints.
[14:14] So a lot of languages,
they have architectural unit tests.
[14:19] They're like unit tests to execute
extremely quickly.
[14:22] They only look at
[14:23] what dependencies exist between
different modules of your code base,
[14:27] so they can analyze it very quickly
and you can say, okay, prevent
[14:30] let's say the let's say
what would you say the, the,
[14:37] the UI from accessing the database
directly.
[14:40] You could enforce that.
[14:41] It always has to go through the business
logic layer or something like that.
[14:44] And because they are also tends
to make this weird interconnection
[14:48] between modules
that a human would never do.
[14:51] If you just let the I sign your system
and then draw your plot of your system
[14:56] diagram, you will see the weirdest things
that enrage you,
[15:00] that you encode then
into additional architecture
[15:03] unit tests, which I would count
as another form of guardrail.
[15:07] Is there anything that you would say?
[15:09] Well, this is then still kind of part
of the human responsibility
[15:13] that would not fit in
automated guardrails.
[15:16] Yes. So
[15:19] something
[15:21] I mean, if you look at software
engineering
[15:22] and I'm going back to the traditional way
of doing it, it always used to be, okay,
[15:26] what do we want to build?
[15:27] How do we build it.
[15:28] How do we keep it maintainable. Right.
[15:32] Keeping the code base clean and simple
means we can go fast for a long time.
[15:36] And how do we do it?
[15:38] Well with architecture, right?
[15:39] We define the architecture upfront
and then we start diving into the modules.
[15:43] How do we implement each other?
[15:45] I think that should still stay the same.
[15:48] The models are not there yet.
[15:50] Whether they can do that on their own.
[15:51] And my workload
now includes first understanding
[15:56] exactly what I want to build exactly
so that there's no doubt,
[16:00] and then sketching out how this might look
as a software system.
[16:06] Right? Could be different services
talking to each other.
[16:08] It could be on a service level,
different modules talking to each other.
[16:11] Which functions do I need in the modules.
[16:13] So you specify pretty much the entire
architecture except the implementation.
[16:18] And once you have
that you can already encode that as rules.
[16:22] Yeah.
[16:23] You know so this
I think that's extremely important
[16:27] to also to combat,
[16:31] I think on your show,
people already talked about the cognitive
[16:35] dissonance
that comes from noteworthy in code,
[16:38] where you don't understand
your code base anymore
[16:40] and you're not able as a human,
to reason about your code base anymore.
[16:43] That comes when you don't understand
the architecture anymore,
[16:45] and how components talk to each other
within your software system.
[16:48] And yeah, you need to do everything
to combat that as much as possible.
[16:52] Yeah, but yeah, it's very hard for me
[16:57] to imagine where this is going to go
because I agree with you.
[17:00] If I understand my software system,
I feel like that's the skill
[17:03] that's really going to remain
for engineers specifically.
[17:06] And I do believe that the implementation
we're already automating,
[17:09] and I feel like with enough card rails,
we can hone code
[17:13] reviewing to where only the essence,
potentially the behavior.
[17:16] I see people reviewing specifications
that will then also remain.
[17:20] But if I put myself in the seat of an
engineer, maybe someone that's listening,
[17:24] who's in a bigger organization
you might not already know your system,
[17:28] then it's quite difficult to be like,
okay, this piece of the puzzle in advance.
[17:33] Do we know how to build it?
[17:34] Or how much investigation do I need to do?
[17:36] That's all work that would happen up
front now and potentially before AI,
[17:41] you would do that kind of as you go and
you would iterate and you would improve.
[17:44] That whole way of working
is now different.
[17:45] Yeah.
[17:47] It's very, very, very difficult
to be messy in your approach now,
[17:51] which is also why people
[17:52] find that what I would say,
why some people might resist to it
[17:56] because, you know, doing all the hard
work up front, right?
[17:59] You're not just discovering, as you just
said, as you go, you're doing all the hard
[18:03] work up front.
[18:04] You probably have to do
a couple of iterations on your on what
[18:07] your implementation to get a better idea
of how good actually looks like.
[18:11] So that's not uncommon.
[18:12] But you can do that with vibe coding.
Yeah, right.
[18:15] And I think that is a
that is going to be the new normal for,
[18:20] for, for some time to come
before things change again.
[18:25] The but the interesting part is that,
[18:29] you know, I always ask people, well,
how could you develop software
[18:32] if you didn't know
what you wanted to build?
[18:33] Yeah, right.
[18:36] That's also not possible.
[18:37] So you're doing the same work now.
[18:39] It's just that
you're doing it up front. Right.
[18:42] Which might feel more intense,
more involved.
[18:44] But that also means
that this is becoming its own discipline.
[18:47] And when people think about
what should junior engineers do now
[18:51] that I can generate
[18:52] all the code, I would say, well,
this is clearly something that can learn.
[18:56] That's an incredible skill. Yeah, right.
[18:59] I've seen the best software engineers
kind of fall into two categories.
[19:03] The ones where, like you mentioned,
[19:05] someone had to build something
and I saw them stare at their screen.
[19:07] This was still before Covid where we
I worked at the office
[19:10] five days a week, and I saw them
with kind of pencil and paper, and he was
[19:14] like writing stuff and drawing things out
before even doing any hands on.
[19:18] And I was like,
that's a very interesting skill.
[19:20] And then I saw other people
where they're like,
[19:22] it's very hard for me to Maginn
and I have to start typing, but then
[19:26] they're still fascinating and extremely
effective in the way they operate.
[19:31] But it's completely like the inverse
of what the first engineer would do.
[19:35] Absolutely.
[19:36] And the cool thing
is that if you allow yourself to do that,
[19:39] like to do the prototyping,
to go in this discovery before you
[19:42] put your specifications not into stone,
but before you kind of say, okay,
[19:46] this is what we want to build.
[19:47] Is that it's incredibly rewarding.
[19:52] I really enjoy that
because you really feel
[19:56] the speed that AI gives you
when you iterate through ideas.
[20:00] I oftentimes
find myself talking to an eye for an hour
[20:03] just to explore this idea,
[20:04] and then maybe a tangent idea
and that maybe I should have gone on.
[20:07] But it teaches you so much
about how you can think about systems,
[20:13] and it also elevates
[20:14] you as an engineer, because now
you're not only thinking about, okay,
[20:17] how do I implement this?
[20:18] But you also think about
what do we actually need, right?
[20:22] What does the customer need? So the.
[20:26] You can
[20:27] see that I think engineers
get much more elevated.
[20:30] They start to think at that product level
much more now because of that.
[20:34] And that's just going to continue versus
[20:36] before they were thinking about okay,
but how do we write this in code.
[20:40] How has it been for you.
[20:41] Because a lot of engineers
I talked to when they parallelize work
[20:45] is there's a lot of stuff going up here
in terms of thinking and execution power
[20:48] all of a sudden, and
at the end of the day, they're exhausted.
[20:51] Yeah.
[20:52] Well, the burnout, because you're
constantly exposed to stimuli
[20:56] and you're constantly contract switching
because the eye takes 20 minutes
[20:59] to respond to you.
That's real. That's absolutely real.
[21:02] Talk to a developer last week
and said on Wednesday, spread out.
[21:06] Just just his brains just on standby
because he's constantly
[21:09] reacting all the time.
[21:11] I think that's 100% real.
[21:15] As with
[21:15] anything, I think the way to combat
that is a discipline.
[21:19] Okay.
[21:20] The first step is you have to be aware
of what you're doing.
[21:24] But you also learn how to interleave
tasks, maybe on the same project.
[21:28] They do different things, right.
[21:30] So the work on on the environment
that guides the agent,
[21:33] that's its own project, besides the actual
project that you're trying to build.
[21:38] So and I keep iterating between the two.
[21:42] So when I'm waiting for an agent
to complete something
[21:46] because I want to see what it
[21:47] what it does or how it did it, 
I will just switch to something else.
[21:50] I might start another session
with a different agent on the same code
[21:54] base, and start interrogating the agent
about the code base.
[21:57] And so I stay kind of in the same context,
[22:00] but I don't switch
between project as hard.
[22:03] And if I don't do that,
[22:05] what ends up happening
is that I have to type in the session out.
[22:08] Please tell me,
what did we do in the last half hour?
[22:10] So I just
it has to remind me of what I did. And.
[22:16] It's weird sometimes 100%.
[22:18] Yeah, yeah, I saw Cloud Code
does that automatically.
[22:21] Now, if you're out of a session
for too long, it gives you
[22:23] like a summary of what you've done
so you don't have to ask anymore.
[22:26] Yeah, yeah, there might be some UX problem
there solving the
[22:30] I think ownership
and we already mentioned cognitive debt
[22:34] is going to be a very crucial topic
that distinguishes kind of engineers
[22:37] that don't really maybe care
about this craft or about their work.
[22:42] And also I spoke with Alias Mani last week
and he mentioned this newsroom,
[22:46] which I hadn't heard of,
which he mentions cognitive surrender.
[22:50] People are like,
the agent just takes the wheel,
[22:53] and if it's the problem, it's
the agent's fall.
[22:54] And if it works, it's also the agent.
[22:56] But what then?
[22:56] It's a little bit me, but they really just
let go of what they are responsible for.
[23:00] And I feel like that's quite risky.
[23:02] And the way we are evolving,
[23:04] I think conversations like you and I are
having are incredibly important
[23:06] to give people perspective
and to also challenge
[23:10] what goes away and what remains
as part of your accountability.
[23:14] Absolutely.
[23:15] And the funny thing
is, basically what employees are doing
[23:19] is they give people a hand grenade,
which is AI, and then say,
[23:23] don't blow up the hand grenade,
but use it. Right.
[23:25] So there's a lot of risk with AI, but
all of that is going to be standardized.
[23:29] They're going to be policies
on what you are allowed to do and what
[23:32] not with AI. And
[23:35] the example I gave with Amazon, right.
[23:36] They already made a policy distinction
between your code
[23:39] that is more critical than other code
and how that should be reviewed.
[23:41] So we're just going to see the same thing.
[23:43] And it's just going to be another,
[23:45] I guess, form of the part of the process
for software engineers, right,
[23:49] where you have to define stuff where
[23:53] if you just want to YOLO it, okay, let's
not touch the billing system, please.
[23:57] I think that's going to be normal
pretty soon.
[24:01] And yeah,
and also a lot of the review work
[24:06] that we don't want to do
is we can outsource to AI as well.
[24:08] So the idea of not doing any code
reviews comes.
[24:12] I mean, it's
kind of like a loaded idea, right?
[24:15] But when you attempt to do that,
[24:18] there are a lot of realizations
come with it right there.
[24:21] Cheap wins, like guardrails
[24:23] that are deterministic,
that execute cheaply and quickly.
[24:26] And then the conversation shifts towards
architecture
[24:30] and specifications and more validating
the specifications upfront.
[24:33] Then then the code later. And
[24:38] likewise, even when you have to review
[24:40] the architecture later as a human,
you can still use AI for that, right?
[24:44] You have a conversation with AI.
[24:46] Maybe if a specialized agent
[24:49] that you particularly set up to review
for any violations of a specific type
[24:53] of architecture that you're
trying to implement in your project.
[24:57] So you can also do an automatic scan over
all of your changes, code changes
[25:03] with AI, and then use that as the point
to start looking into it as a human
[25:09] right. So
[25:11] you can still automate a lot.
[25:13] And it's really just about, okay,
where should I look?
[25:16] Where don't I have to look?
[25:17] Yeah. Otherwise I don't see how.
[25:21] How are we going to scale the review part?
[25:23] You know, the code generation
is ten times faster or 100 times faster.
[25:28] The pressure is going to be
[25:29] on all of the systems
that come downstream from that.
[25:32] Absolutely.
[25:33] And part of that is the review
with the human in the loop.
[25:36] So you have to try to minimize that
as much as we can.
[25:39] Yeah.
[25:40] The I feel like the input
we can likely scale faster, right?
[25:44] We can just execute on more ideas
and validate things in production
[25:47] with different tests.
[25:49] The reviewing process
is really the challenge.
[25:51] And some of the things that you mentioned,
[25:52] I do see those as ingredients
to kind of solving this puzzle.
[25:55] That is the code reviewing process
and not having a human in the loop at all.
[25:59] If that's the, let's say,
the big goal that we're working towards,
[26:03] even though it might not be feasible
now with the models we have,
[26:05] I do see guardrails in there.
[26:07] I do see capturing as much as you can
behavior and functionality in tests.
[26:11] I don't think there should be any reason
to not write a test anymore,
[26:14] because you can just generate the test
[26:15] according to the behavior
that you want, right?
[26:17] If you solve a bug,
definitely make a test out of that.
[26:20] That was already a good practice,
[26:21] but there's no reason
to not do that anymore nowadays.
[26:24] So that's a trend. Yes.
[26:26] And what also people don't
what people also often forget
[26:30] is that generating a test,
a small piece of code,
[26:33] the chances of the LM not doing it right
are much smaller than when you tell the LM
[26:37] generate me microservice. Yeah, right.
[26:40] So that's also another point that I think
helps when you write guardrails,
[26:45] because even if you generate them
automatically, which is what I do,
[26:48] the chances of failure
are relatively slim.
[26:52] I have seen and spoken to other teams.
[26:54] I'm trying to get one on the podcast
[26:55] that have fully adopted
spectrum and development.
[26:58] As part of their workflow,
[26:59] they use one of the specification
frameworks
[27:00] and they're very happy
with their approach.
[27:02] That's why
I want to have them on the podcast,
[27:04] but they mentioned
that they have not built.
[27:07] I think it's my assumption.
Got the guardrails,
[27:10] like you and I are discussing
within their code review process.
[27:12] What they have done is the review process
now very much revolves
[27:16] around the specification
and that is what reviewed.
[27:20] That is what is reviewed.
[27:21] And I do think they have some guardrails
in place to make sure that whatever's in
[27:24] the specification is also translated
in code in a certain way.
[27:29] For me,
there's only kind of the risky part,
[27:31] which is the non-deterministic behavior
that can be in there.
[27:34] But I think that's an interesting
approach.
[27:36] Yes. And actually, good
that you mentioned that because Gatorade
[27:39] can't also mean just a prompt. Right.
[27:41] That's I think, how guardrails started
to be defined, if I'm not mistaken.
[27:45] But there can be the terminus thing
as well,
[27:48] the specification of development approach,
I really like that, but mostly
[27:51] because it gives a human clarity
of what is being built.
[27:56] If you give that to an LLM and you observe
what it does,
[27:58] you'll be surprised
that after five minutes
[28:00] it starts to deviate from your attentions
because you didn't specify something
[28:04] clear enough, or it there was some room
for interpretation anywhere.
[28:08] So you can iterate now on your
specification trying to get it perfect.
[28:13] Then you switch the model
and it doesn't work anymore.
[28:16] So does this mean from your perspective,
what do you think of spectrum development?
[28:19] Is it something that works now but
it's going to go for gone in the future?
[28:23] Or how do you see that?
[28:24] Well, I think that is part of
[28:26] the discovery product process of what
we're trying to build.
[28:29] And I think it's extremely important
to have that,
[28:33] because that can also be used
for automated tests later, like checking.
[28:36] Do we, did we actually do this?
[28:38] How did we do this.
[28:39] Did we do this in accordance
to our coding principles?
[28:43] Right.
[28:43] Those are questions you can
[28:44] then give to an AI to investigate
so the specs will stay there.
[28:48] People like to go in-depth
with the specifications
[28:52] like they treat it as if it was code.
[28:54] It's not right.
[28:55] It's just a document
of shared understanding.
[28:57] I would say that specifies.
[29:01] Part of the behavior.
[29:02] Part of what? What is being built.
[29:05] I think a fine grained
[29:07] behavioral specification of whatever
you're building is much more important.
[29:11] There was this idea of TDD where
if you have all of your tests
[29:17] and your software gets deleted,
[29:19] but you still have your test,
you can rebuild your software.
[29:21] That is one of the ideas of TDD.
[29:23] And well,
I've seen it work for the very first time
[29:28] when I had behavioral tests implemented
that would give the agent feedback,
[29:32] and I had a specification as a prompt
to start the implementation.
[29:37] That was the very first time in my life
I had seen this actually work
[29:40] well in my in my project.
[29:42] That's still quite incredible.
[29:43] I wonder if with existing code
bases, right, if the test coverage.
[29:47] In theory, a lot of this is in theory,
which is why it's quite the challenge.
[29:51] But I wonder if indeed
if you would throw out the code
[29:54] if people have been doing TDD
in that code base for quite a while,
[29:57] if an AI indeed can then generate the code
exactly how it is
[30:00] according to the behavior
that was captured.
[30:03] Yeah, well, if you have some tokens to
burn, you can try that over the weekend.
[30:06] That seems like an interesting experiment.
[30:08] What I have noticed
is that also the bigger companies
[30:12] previously, before AI
and a genetic software engineering,
[30:16] I feel like they were trailblazing
and a lot of smaller organizations
[30:20] were looking up to good practices,
best practices, conventions
[30:23] and blog posts of what is out there
and what's happening right now.
[30:27] I feel like the playing field
is quite equal
[30:30] because everything is very quickly
evolving.
[30:33] You already mentioned over a few months
harnesses and their capabilities
[30:37] might change and what is effective,
and all of a sudden what is now possible,
[30:41] which gives us a very interesting
playing field to experiment with.
[30:44] How do you typically experiment
and educate yourself?
[30:48] Yeah, it's a concept trying to catch up,
[30:51] feeling behind type of thing,
[30:55] but I think that's normal for everybody
who's trying to keep up with things.
[30:59] So I like to use projects.
[31:01] I have a couple of different projects
[31:03] that on a different scale of one project
that is purely vibe coded, purely.
[31:07] I've never looked at the code,
I've only prompted it to do stuff.
[31:10] I have one project
that is a silly produce that is,
[31:14] that's the one that I use
for the TDD approach with the behavioral
[31:18] specification, behavioral tests, Scott
rails where test that type of approach.
[31:24] I have another project
that consists of multiple microservices,
[31:29] which is much more complex,
which is mostly driven,
[31:32] and I keep adding features to them
using these different methodologies
[31:37] that are set up for this project
[31:38] and just observe what does the AI do,
what does it do wrong, etc.
[31:42] and more often than not,
I see they either something weird
[31:46] and then I make
that immediately part of my
[31:50] default guardrails.
[31:51] So I kind of have a repository.
[31:53] We have a default project setups
for different languages,
[31:57] and they're preloaded
with a certain type of guardrails
[32:00] that I found useful in the project
that I do.
[32:02] So the experimentation involves
a lot of communicating with the LM.
[32:07] I really found it
useful to ask the LM to explain itself.
[32:12] So if I give it a complex task,
typically what I ask is
[32:16] please tell me what your understanding is
of what we are trying to do.
[32:21] Very simple question.
[32:22] So I'm trying to find out
what the model understood, what I said
[32:26] versus what I said.
[32:27] And you can see how models interpret
things differently.
[32:30] And that gives you an idea of, you know,
[32:34] personalities is too far reach,
but it's sort of type, you know,
[32:38] what type of personality
does this model exhibit like?
[32:42] What type of behavior does it exhibit?
[32:44] Probably the better term to use.
[32:46] Yeah. So I do that a lot.
[32:50] I also try out the latest tools
that I give us.
[32:52] Like when sub agents came,
I tried that out.
[32:54] I concluded that I have zero visibility
about what the agents are doing.
[32:59] Like what are they communicating with?
[33:00] I have no introspection.
[33:02] So then what I would do is
I try to have introspection to that,
[33:06] and I build my own kind of system where
I just told it,
[33:09] please spawn a sub agent,
but do it in a different terminal
[33:12] so I can actually see what you sent
to that different agent.
[33:15] And yeah, well,
[33:19] you will see the weirdest things
that the models tell each other, right?
[33:21] You can already see how the models start
to deviate,
[33:23] like at the first step
when the handoff tasks, etc..
[33:26] So trying to look under the hood
as much as possible, what information gets
[33:32] exchanged, monitoring what the agents do
when they talk to each other.
[33:36] I think those are incredibly important
things for the orchestration itself,
[33:40] and I learned a lot
the most from looking at those types
[33:45] of things, of what the models do
and how they talk to each other.
[33:49] So I think that is how I experience
most of the time
[33:53] to refine my understanding
of how the models to and also trying
[33:56] to apply
what they give us in terms of tools.
[33:59] If someone's listening
and they want to apply genetic software
[34:02] engineering to their own way of work,
way of working some piece of code
[34:07] that is already live in production,
and likely the team has already adopted
[34:11] some practices or not at all,
and they want to kickstart something.
[34:14] What is step one that you would recommend
[34:16] for an individual developer,
or for somebody in a.
[34:18] They could be within a team?
[34:19] I think that's the most profound case.
[34:23] I would say the simplest thing is start
with guardrails, static checks.
[34:27] Right.
[34:28] You should have
of course a code formatter.
[34:30] You should have a linter.
[34:32] Try to write some SEM grep rules
[34:35] that enforce some of the best practices
that you see in your code base.
[34:39] You can ask the AI, for example,
[34:41] what are some anti patterns
that we use in the code base.
[34:44] Write a simple test that flags them.
[34:46] If you work in a team,
you have a team discussion.
[34:49] You know if you get resistance,
well then try the next next best thing.
[34:53] It's really difficult to convert people
who are not buying into the ideas
[34:58] of trying to improve the code base by
[35:01] streamlining streamlining it with
tests or with guardrails.
[35:05] But you can run
all of these things on your local machine.
[35:08] You don't have to enforce
[35:09] everybody to use it, but you can use it
for a code that you write yourself.
[35:13] You know,
[35:14] you compare that with a smart script
that checks whether you created that file
[35:17] or somebody else, and where you enforce
[35:20] your guardrail rules.
[35:23] And the key point is
[35:26] you should measure
or at least get an impression
[35:29] of how it works with those guidelines
that you put in place versus without them.
[35:35] Because once you see that,
they actually help
[35:38] you do more work and be less in the loop,
you will not go back.
[35:42] I don't think it's
[35:46] it becomes really convenient
to not have to worry about that
[35:48] and to babysit the model all the time.
[35:50] I can see that right
this term, babysitting.
[35:52] I'm trying to get rid of
[35:53] in the conversations
that I have with people,
[35:55] and I'm trying to figure out
what the best way is.
[35:57] It could be indeed kind of experimenting
and going into this cycle
[36:00] of continuous improvement.
[36:02] And it could be
you capturing behavior as you want,
[36:04] as guardrails for the agent to
then pick up and do something with.
[36:08] And it can also be feedback
that you get from your team, right?
[36:11] If you and your agent create
a pull request
[36:13] and then there's feedback from your team,
[36:14] you can also
then capture that in more guardrails.
[36:17] And there's also another idea.
[36:18] So what you can do is
you can just say, hey,
[36:20] analyze my session logs on this project.
[36:23] It'll go into your home folder dot cloud,
[36:25] and we'll start looking
at all of your conversations.
[36:27] And you can ask it,
do you see any patterns
[36:31] where I had to repeatedly
remind you of a certain thing
[36:34] so you can data mine your session
[36:36] logs to see where the model goes wrong,
where you always have to correct it.
[36:40] Turn that into a static check. Right?
[36:43] This feels like a product
that I would want to have.
[36:46] Yeah. Which is actually not a bad idea.
[36:48] Well, actually it's a skill
you can just, well, use a skill
[36:52] to write you that skill. It's very easy.
[36:54] It takes like 15 minutes
and then you can use it.
[36:56] Absolutely.
[36:57] Earlier we mentioned different harnesses
might have different results.
[37:01] And in some organizations some people
just get one harness and that's it.
[37:04] Right.
[37:04] We've gone all in on GitHub copilot
because has all the models you know,
[37:07] but it's only one harness.
[37:09] What would you recommend to either
those people or those organizations?
[37:13] That's a really difficult one if you can
choose your tools as a developer.
[37:17] I don't think any developer
is really going to be happy with that.
[37:20] I think education would help
in that case.
[37:24] You know, I mean, there's
studies out there that compare harnesses,
[37:27] and we have enough evidence to suggest
that relying on one particular tool
[37:33] is not going to keep us at the edge.
[37:36] So there are lots of arguments to be made.
[37:40] I understand that organization.
[37:42] I have this, this, this, this desire
tenancy just to standardize things.
[37:45] But it's not like you select a product
and then you run with it for five years.
[37:49] That's not how AI works.
[37:51] And that just needs understanding
of what AI actually means.
[37:55] Yeah I feel like that's
that missing. Right.
[37:57] Because the
we are now beyond model specifically.
[38:01] And the harness might matter
more than the models itself.
[38:04] On paper
I think it's easy to understand models
[38:07] because that's we've been talking
about that for a long, long time.
[38:09] Right. It's been 2 or 3 years right now.
[38:11] We've gone continuous iterations on models
and now I feel like more
[38:16] so this year, maybe even end of last year,
the conversation about harness
[38:19] has really started arising.
[38:20] Yes. Well, there's another thing
you can do as a solo developer.
[38:24] Try to find out at what things
you particular harness is good at.
[38:28] Maybe it's it is at, you know, writing
pull request documentation.
[38:34] Maybe it's really good at debugging.
[38:35] So try to find
[38:36] those use cases where you can still use it
and then you use it for that.
[38:41] Yeah. Yeah, absolutely.
[38:42] For the people listening
I'm trying to do this new thing
[38:45] because I want your advice
on what experiment you want people to run
[38:48] if they have a weak time
and they can do one experiment
[38:51] as kind of their budget of time,
they have, what would you want them to do
[38:55] an experiment with?
[38:57] Well, that depends on where you are
in the organization, I would say.
[38:59] But for developers,
[39:01] I mean, there are a couple of options
and it depends on what you want.
[39:04] Do you want to get better at
a genetic engineering like working with I?
[39:09] Do you want to get better at building
your guide rails?
[39:12] Do you want to get better at understanding
how the models behave?
[39:16] So that's the first question.
What do you want?
[39:18] There's the infinite
many different options of what to do.
[39:20] I would recommend
if you want to get started
[39:24] with guardrails, start
looking at semantic grip.
[39:27] Let's try to encode
some of your human feedback
[39:30] that you would give in a PR as a rule,
and the example that I have earlier with
[39:35] no default values and method parameters,
there could be one example.
[39:39] Another one could be 
okay, let's never swallow any errors.
[39:42] There was any error must always be
propagated something like that.
[39:47] Just start with experimenting with that
and see
[39:51] how your agent reacts
in that environment.
[39:56] So setting up I think the guardrails
[39:59] so that you can start to improve them
and iterate on them.
[40:02] I think that's very worthwhile.
[40:04] And you will see,
I would argue that you would see
[40:06] wins very quickly,
even though you might ask for things.
[40:10] But we had static code checks first,
but now you're doing it in a way
[40:13] that you encode your human preference
as rules, right?
[40:17] So custom for your particular project.
[40:19] Florian, thanks so much for coming
on. This is for me.
[40:22] This is really good.
[40:23] Thank you.
[40:23] If you're still with us.
[40:24] Let me know in the comment section
[40:25] what you thought of this episode,
and we'll see you in the next one.