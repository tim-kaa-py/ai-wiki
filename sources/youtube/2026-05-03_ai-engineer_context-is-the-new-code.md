---
title: "Context Is the New Code – Patrick Debois, Tessl"
type: "youtube"
channel: "AI Engineer"
date: "2026-05-03"
resource: "https://m.youtube.com/watch?v=bSG9wUYaHWU"
pillar: "building"
tags: [context-engineering, agents, evaluation, workflow, skills, harness-engineering, best-practices]
timestamp: "2026-05-05"
extraction_method: "auto-captions"
video_id: "bSG9wUYaHWU"
duration: "27:13"
---

[00:07] [music]
[00:14] >> There's there's a few people who want to
[00:16] start earlier.
[00:17] I know I'm going to take the opportunity
[00:19] to officially open kind of the
[00:22] architect track. There's no track host,
[00:24] so I do it myself. So, thank you for
[00:25] coming here. I hope you already had like
[00:27] a good conference. Um
[00:30] It's amazing that like so many people
[00:31] showed up. Um maybe before I start, um
[00:35] who's used any AI coding agent in this
[00:37] room? Raise your hand.
[00:40] Like lower it. Who hasn't? Raise your
[00:43] hand.
[00:44] Okay, my kind of people. Perfect. All
[00:46] right.
[00:48] Um
[00:50] Okay. Context is a new code.
[00:54] Or context development life cycle. Um I
[00:56] feel honored to be here. Every time I
[00:58] try to do a different talk at the AI
[01:00] engineering.
[01:01] So, this is a little bit of um
[01:04] you know, thinking ahead. It's an
[01:05] unpolished thought. It's not like
[01:08] everything's there, but is there
[01:10] anything there in AI anyway? But
[01:14] So,
[01:15] let's start.
[01:17] I assume
[01:19] you all are now vibe coding with
[01:21] prompts. I barely touch anymore kind of
[01:24] the code. I just tell the AI to do
[01:26] something different.
[01:28] So, I would say like
[01:31] context is the new code because it's
[01:33] being generated.
[01:35] A little bit more advanced maybe is
[01:38] I see myself having a tendency is I had
[01:41] large pieces of code that I was using
[01:44] maybe some helpers and some other
[01:45] pieces.
[01:47] And I just turned them into a skill.
[01:50] We had that in our into our product. It
[01:52] was an onboarding from, you know, AI
[01:55] agents. Um
[01:56] People have Python, Node.js, all the
[01:59] various things. Then they have different
[02:01] tools for packaging and
[02:04] it is impossible to actually code that.
[02:06] Like it will require a lot of coding.
[02:08] But if I just say a skill says
[02:12] please first figure out what their
[02:13] package manager is, then figure out what
[02:16] their ecosystem is, and then do these
[02:18] steps together with the user.
[02:20] You know, it's solved a lot more
[02:22] problems that we could ever code. So,
[02:24] that is another piece that I would say
[02:27] code is also transforming back into
[02:30] context as a skill as well, as a
[02:33] workflow that's reusable. And
[02:35] leave that with you.
[02:37] I like to think in parallels.
[02:39] In 2009, I don't know if there is any
[02:41] DevOps people in the room. It was kind
[02:43] of me saying like what if ops looked
[02:45] more like dev? And then we got like,
[02:47] hey, collaboration, kind of our
[02:49] deployment, all that stuff. So, kind of,
[02:52] you know, last year I started thinking,
[02:54] what if context
[02:56] is the code?
[02:58] How do we deal with this in a more
[03:00] consistent way?
[03:02] And
[03:04] it's basically saying if we have a
[03:05] software development life cycle
[03:08] how does a context development life
[03:10] cycle look like? Because we're basically
[03:12] shifting somewhere else. It's context,
[03:15] it's not code. How does it look like?
[03:18] I came up with this, you know, of course
[03:20] an infinity loop with some DevOps
[03:21] background. But the whole idea is that
[03:24] we generate a lot of context.
[03:26] Then hopefully we test the context. We
[03:29] distribute context maybe to some
[03:31] colleagues, to some other parts of the
[03:32] organization. We observe whether it
[03:35] works, and if it doesn't work or works,
[03:37] we call like, you know, adapt and
[03:39] regenerate the context and then go from
[03:41] there. So, that's kind of the
[03:43] loop of the talk that I'll be going for
[03:45] with some examples.
[03:47] So, step by step going through.
[03:50] Generate. It's probably the one that
[03:52] you're all most familiar with.
[03:55] Because you're all prompting.
[03:57] You're like the human context creation
[04:00] typing things, right? I was actually
[04:03] amazed that I just asked, tell me when
[04:05] my talk is at AI engineer, that it would
[04:07] fetch the website and it would just say,
[04:09] here's your talk. Like blew my mind. But
[04:12] hey, I I said like the context that I've
[04:13] given it, I'm Patrick, all that stuff,
[04:16] right? So, very simple context. It's
[04:18] what you do probably a lot in your
[04:20] setup.
[04:23] If you get a little bit more advanced,
[04:24] you say that prompting is tedious. I
[04:26] want to have reusable prompts. So, you
[04:29] know, depending on the flavor of your
[04:31] coding agents, they call it
[04:32] instructions.
[04:33] Luckily, there's a little bit of a
[04:35] standardization now happening where it's
[04:37] like an agent.md and some pieces like
[04:39] that. Boo Claude for still calling it
[04:42] Claude.md, but anyway, you get the
[04:44] picture. There's like reusable prompts,
[04:46] reusable pieces of context that we're
[04:48] doing.
[04:51] We can also bring other context in.
[04:54] If we have documentation of libraries
[04:56] that we use day to day
[04:58] we want to pull that in because the LLMs
[05:00] might not have the latest documentation.
[05:03] And so it's hallucinating. Is it version
[05:05] two, version three? We don't know. So,
[05:07] we give it a context and say, please
[05:09] download the documentation. Hopefully
[05:11] then agent optimized. And then they will
[05:14] do a better job at generating the code
[05:16] for that version of the library.
[05:18] Another piece of getting better context
[05:20] and creating context from libraries.
[05:24] And of course, it wouldn't be complete
[05:25] if we would say
[05:27] pull context from wherever. MC
[05:32] Get it from your GitLab, GitHub, kind of
[05:34] Slack.
[05:35] All context we're pulling in, we're
[05:37] creating. Even a ticket is creating
[05:39] context because we're pulling that in
[05:42] while we go there.
[05:45] And then maybe the new kid on the block
[05:47] is, okay, what if we
[05:49] start like writing our prompts as
[05:51] specification spec-driven development
[05:54] which then gets broken down by the agent
[05:56] into a planning mode into step by step
[05:58] kind of prompts that it then kind of
[06:01] runs through. So, a lot creation
[06:03] happening in that field.
[06:06] You know, simple. This is probably what
[06:08] you're closest to.
[06:10] But
[06:12] when you're typing all that context and
[06:14] creating all that context
[06:16] you change two lines in your Claude.md.
[06:19] Do you know the impact?
[06:21] Is it like YOLO? Looks good to me. Let's
[06:24] do it. You have to think about how do we
[06:27] test things?
[06:28] It's not just about we have a piece of
[06:31] code and we have a piece of context now.
[06:34] We need to write tests to see what is
[06:37] the impact. New coding agent? We don't
[06:39] know where the lines still work.
[06:42] Now, it's not new in the world of AI
[06:45] engineering but it's not that common yet
[06:48] in the world of coding with AI that you
[06:51] start writing evals for which are tests
[06:55] for your kind of code context.
[06:59] Uh a little bit hard to read, but you
[07:01] know, if you think in parallels
[07:03] we have different levels of testing in
[07:05] code, and the simple one could be
[07:08] linting. Your IDE is has the swiggly
[07:10] lines like, hey, this is not like, you
[07:12] know
[07:13] there's some
[07:14] incorrect syntax or you could do better
[07:16] like that.
[07:18] Here's an example of a validation of a
[07:20] skill where we say, well, you need to
[07:23] have the description. It can only be so
[07:25] long. So, it's validating according to
[07:28] the spec of the format of the context in
[07:30] this case.
[07:32] Simple analogy, simple linter that you
[07:35] can run.
[07:38] And then you can do other things like
[07:40] and and I haven't found maybe the good
[07:41] coding equivalent, but think of this as
[07:43] a Grammarly.
[07:45] Right? So, if you write context
[07:48] um
[07:49] is it actually can the agent understand
[07:52] what you're writing? If you write two
[07:54] words, it's not verbose enough for it to
[07:57] actually understand the context. So,
[07:59] what you can do is you can say ask is
[08:02] like, okay, you know, given this
[08:04] context, what do you think about Do you
[08:06] understand this? And then you can get
[08:08] feedback like,
[08:11] oh, it's not explicitly enough written
[08:15] or it's not complete. Like you're
[08:17] missing pieces. So, that's kind of from
[08:20] tools as well. So, whenever you're
[08:21] writing now your context, you get a
[08:24] Grammarly saying, hey
[08:26] do this. That's why I like to voice
[08:27] code. For some reason, I'm way more
[08:30] elaborate voice coding than typing. I'm
[08:32] a bad typer, two fingers
[08:34] still after so many years. But when I
[08:36] talk, I was like, you know, I see the
[08:38] the sentences come on the screen, but it
[08:40] helps to get good context there.
[08:43] All right, another kind of test.
[08:46] So, imagine you put in your Claude.md
[08:48] or agent.md, I should say. Now,
[08:51] um every API point must use the prefix
[08:54] awesome.
[08:56] Right? You have some convention in your
[08:57] company. Right? Which is great.
[09:00] So, your prompter will be then, add me a
[09:02] new endpoint to save a user.
[09:05] And you expect actually your coding
[09:08] agent to just say the code that's being
[09:10] generated has kind of {slash} awesome
[09:13] {slash} user.
[09:15] That's great.
[09:16] But the way we can test this is by
[09:19] asking then
[09:22] an LLM
[09:23] the code that was generated
[09:26] does it actually start with {slash}
[09:28] awesome? Now, you can do that with
[09:30] regex, I know. This is just for example
[09:32] purposes, but you can ask it to kind of
[09:35] judge your code based on your criteria
[09:38] and whether it did the right thing.
[09:40] Right? So, imagine you would ask the
[09:43] same question without your context
[09:45] above.
[09:47] No LLM is ever going to prefix your URL
[09:50] with awesome. So, that's kind of where
[09:52] your content or your company specific,
[09:54] your team specific things come in, and
[09:56] that's why you still write those tests
[09:58] to see if this still works. Now, maybe
[10:01] Gemini kind of reacts differently than
[10:05] Copilot or something, and in your
[10:06] company you need to make it more, you
[10:08] know, switchable of context. With this,
[10:11] you run the tests, and you can actually
[10:13] tell.
[10:14] That's the difference.
[10:16] And then you can make like whole suites,
[10:18] and I would compare that almost to unit
[10:20] tests. I have a bunch of these tests,
[10:21] and they tell me whether that's
[10:23] actually, you know, good code, the code
[10:25] is following the rules, and everything's
[10:27] fine. In this case, it's even kind of
[10:30] infrastructure as code. It doesn't need
[10:31] to be code only. It could be various
[10:33] things. Could be config files as well.
[10:35] And I just have It's hard to read, but a
[10:37] bunch of kind of criteria that I just
[10:40] run every time to do that.
[10:44] But,
[10:45] if you want to test,
[10:47] you know, whether an endpoint has
[10:49] {slash} awesome
[10:51] {slash} user,
[10:53] there's a real test that we want to run,
[10:55] which is
[10:56] I want to test the endpoint. I just
[10:58] don't want only to check the code. I
[11:01] want to have it running. So, when you
[11:04] give the judge a tool, and the judge
[11:07] becomes an agent, and it can do things
[11:10] in a sandbox and execute stuff.
[11:14] It can actually do the do the curl. So,
[11:16] you can bind
[11:17] LLM as a judge with kind of some
[11:20] tooling, and then you can have multitude
[11:22] of tests actually, you know, in this
[11:25] case,
[11:26] it kind of ends up being an end-to-end
[11:28] test, right? Because it's not just
[11:29] looking at the file, it's actually
[11:31] running the piece with everything that
[11:34] it's supposed to do.
[11:36] And then I can do this like given a
[11:38] certain commit in my repo,
[11:41] I want to run this scenario
[11:43] given this piece of context,
[11:46] did it make a difference? Yes or no? So,
[11:48] you're kind of like building this up
[11:49] while you're committing context also
[11:51] within your repo.
[11:55] And because we now have tests, and it
[11:57] gives us feedback whether it's working
[11:59] yes or no, or what it's missing, we can
[12:02] optimize context. So, that's kind of
[12:04] the, you know, you we can put that in a
[12:06] code action or something that says like,
[12:08] "Okay, fix this context. Improve this
[12:11] context." With all the feedback the LLM
[12:14] has given us
[12:16] to improve that.
[12:17] So, you know, again, coding
[12:20] uh improvements, but we start thinking
[12:22] more in testing that piece as well.
[12:26] Now, one of the first reactions is once
[12:28] you have tests and optimizations,
[12:31] can we run this in a CI/CD system
[12:33] because
[12:34] that's perfect, right? That's where we
[12:36] run our all our tests and our test
[12:38] suites and do that.
[12:40] Now, there's a little bit of a weird
[12:41] thing.
[12:43] If you run evals,
[12:46] you run it once, you run it another
[12:48] time, it might not give the same result.
[12:50] Remember, undeterministic things.
[12:54] So,
[12:55] you cannot
[12:56] say, "Well, run it once, and then if it
[12:59] passes or not." You're going to be in
[13:00] for a treat because it's like, "Ah, I I
[13:02] can't debug that." So,
[13:05] think about this like you run it five
[13:07] times,
[13:08] and out of five, how many times does it
[13:11] succeed?
[13:12] And, you know, maybe
[13:14] in several cases it hits 100% all the
[13:17] time, which is great.
[13:18] But, in others not. And depending on how
[13:20] you change your context,
[13:22] it will influence which test actually
[13:24] work or not.
[13:26] I find it personally helpful to think
[13:28] about this as error budgets.
[13:30] I give a set of tests an error budget
[13:33] that I really care about, so it it's
[13:35] only allowed like, you know,
[13:37] to fail minimally, and other pieces are
[13:40] okay. So, that's how you have to think
[13:42] about testing context. You cannot do
[13:45] like exact testing all the time. It's a
[13:48] different way that this works.
[13:52] All right. So,
[13:54] generate. Hopefully, you understand what
[13:56] the testing could do for you.
[13:59] And distribute.
[14:00] Maybe that's also something you already
[14:02] did.
[14:03] If you maybe have checked context into
[14:06] your repo, right? Which is great, you
[14:08] know, all of a sudden it becomes
[14:09] available, your colleague checks it out.
[14:12] Uh zero friction, I can push, I can
[14:14] share.
[14:15] But,
[14:17] we have another mechanism for doing
[14:19] things. Think of this like Imagine you
[14:21] have a reusable context
[14:24] that you want to reuse across multiple
[14:27] projects, across multiple teams. We had
[14:30] the concept of a library.
[14:32] So, what if we package
[14:35] kind of pieces of context, and then we
[14:38] are able to install pieces of context
[14:40] that we need for this project.
[14:43] Guidelines, front end. It doesn't matter
[14:46] for that. And then if we take it that up
[14:48] a notch, how to discover what packages
[14:52] exists?
[14:53] That's a registry.
[14:55] Right?
[14:55] Now,
[14:56] in that way, it's no surprise that
[14:58] you'll see things like skills and kind
[15:01] of the Tesla registry in the
[15:03] marketplace,
[15:05] where you can find a multitude of
[15:06] skills. Now, the reality is
[15:09] 99.9,
[15:11] and I mean that in a very sincere way,
[15:13] of the skills is crap.
[15:16] But, it's good to learn from others to
[15:19] see what they're doing.
[15:21] But, hardly of them, if you run kind of
[15:23] any set of evals on there, is actually
[15:27] up to a quality standard.
[15:29] Now,
[15:30] that will likely improve. But, there's
[15:32] also a tendency is that
[15:34] a lot of the skills and pieces,
[15:37] people actually want to put that in
[15:39] their own registry.
[15:41] So,
[15:43] I'll come to that later again. But,
[15:46] so you start seeing the gist, a skill
[15:49] not only contains context, it can
[15:51] contain scripts, it can contain
[15:53] documents, contain bunch of things. So,
[15:56] is this kind of the package format?
[15:58] Probably, you know, plugins
[16:01] could now also contain MCP, but you see
[16:04] there's like a standard coming in.
[16:05] Skills all of a sudden, when that came
[16:07] out, all the coding agents said, "We're
[16:09] supporting this as
[16:11] almost like a package format for people
[16:13] to distribute their context on."
[16:16] And then when I have one piece of
[16:18] context,
[16:20] I have dependencies. And I'm sorry, but
[16:23] also with context we're going to have
[16:24] dependency hell.
[16:25] Right? I I'm I'm I'm going to download
[16:27] this for front end, and maybe it's
[16:29] conflicting what is in the React context
[16:32] package. And so, you start having to
[16:34] deal with that as well. So, you start
[16:37] seeing also uh packages that's uh mirror
[16:41] your library versions, your code ver
[16:43] like your context versions, and kind of
[16:45] pull that in as well.
[16:48] And of course, when we have packages and
[16:50] people are publishing things in
[16:51] registry, we need security.
[16:53] Right? Open claw. Thank you for that.
[16:55] Like everybody all of a sudden became
[16:57] aware that we need more secure
[16:59] things because we are able to run things
[17:01] on our laptop that are not and coming
[17:04] from strangers, right? So,
[17:07] Snyk has a way of scanning context,
[17:10] right? It's doing some credential
[17:12] handling. It's uh exposing some
[17:14] third-party pieces. So, you start seeing
[17:16] the scanners on the context as well.
[17:22] And then when you think about security,
[17:24] who actually built the skill? How was it
[17:27] built? With what model was this built?
[17:30] So, all kind of capturing what we
[17:32] learned in maybe with packaging, like
[17:35] the SBOM, is kind of the AI SBOM, like
[17:38] the packaged of context that we're
[17:40] putting in.
[17:42] So, you've seen
[17:44] still on the path, right? You generate,
[17:46] evaluate, distribute.
[17:48] Let's move into observe.
[17:54] When you
[17:55] are making libraries off skills and
[17:58] context for others,
[18:00] and I don't mean copy and paste this
[18:01] over Slack or something.
[18:03] But, when you actually want to maintain
[18:05] this as something somebody else can use,
[18:07] similar to a library,
[18:09] um when they start using that, how do
[18:12] you get feedback whether that still
[18:14] works?
[18:15] Now, a great place to get feedback is
[18:17] actually by looking at the agent logs.
[18:21] So,
[18:25] imagine developer one
[18:26] coding on the project, and the agent is
[18:29] not doing what they want.
[18:33] They could put this into their context,
[18:35] which is great, right? Okay, let let me
[18:37] do the TDD almost like, you know, I hit
[18:39] a problem. It's not TDD, but you get my
[18:42] gist.
[18:43] Um
[18:44] or
[18:45] what if we at a team or an organization
[18:48] scale would look at the logs every time
[18:50] an agent said, "We're missing this
[18:52] piece."
[18:54] And we surface that and say,
[18:56] "If everybody's missing this piece, we
[18:58] should create context for this."
[19:00] And then we distribute the context to
[19:02] everybody, and all of a sudden the
[19:04] impact of improvement is for everybody.
[19:07] Luckily, like the agent and D, there's
[19:10] now our standards becoming for logs. So,
[19:12] we can read from logs, and that's part
[19:15] of our feedback channel to see if the
[19:18] agent is actually using or missing some
[19:21] of the context.
[19:24] Any feedback you get on a PR that's not
[19:27] complete, that's feedback on your
[19:29] context because
[19:31] that PR was created with certain pieces
[19:32] of context. If you say this is not
[19:34] correct, you can kind of keep arguing on
[19:37] the PR, or you can just say, "Let's
[19:39] improve the context." So, the next
[19:40] iteration actually
[19:42] improves, uh and you don't hit that same
[19:44] problem again.
[19:48] What about
[19:49] running code in production that was
[19:51] generated from context.
[19:54] And that's not correct because
[19:56] yes, we do our PR reviews and we say
[19:58] thumbs up, thumbs down and we give the
[20:00] feedback, but the actual feedback is
[20:02] also in production when it's running.
[20:04] So, this is a tool that actually
[20:06] instruments your code,
[20:08] pushes it out, it's almost like a
[20:10] wrapper, it pushes it out to production.
[20:12] When it fails, it says, "These pieces of
[20:14] code were changed and were failing.
[20:17] Hey, in this case, input, output,
[20:20] it did something wrong.
[20:22] Can we create a test case for this? So,
[20:25] the next time we don't hit this again in
[20:27] production?"
[20:29] Feedback loop.
[20:31] Now, these are all kind of pretty
[20:33] trivial like missing pieces of context
[20:35] or improvements.
[20:38] But, if you run agents and the
[20:41] equivalent of scanning maybe, you know,
[20:43] in the CICD is
[20:45] you need to make sure when it's running
[20:47] in production,
[20:49] is it not doing strange things? So, we
[20:51] need kind of a way of looking at that.
[20:53] Now,
[20:55] I've been toying myself with uh
[20:57] you know, sandboxing agents and it is a
[20:59] very resourceful
[21:01] at finding things.
[21:03] I like, okay, you know, run this thing,
[21:06] try to figure out like anything useful
[21:08] to get break out of the system.
[21:11] And okay, it uses my environment
[21:13] variables. Okay, stupid. Let's let me
[21:15] remove the secret. Let me look at your
[21:18] memory files. So, you have to really
[21:21] make make sure that like whatever it's
[21:22] doing, you can have a way of tracing
[21:25] this as well.
[21:28] And uh apologize again for kind of the
[21:30] slide, but
[21:33] the gist is
[21:34] we can have a sandbox where the agent
[21:36] runs inside.
[21:39] But, your code agent by default without
[21:43] any restrictions loads your agent.md,
[21:46] you load your skill.md.
[21:49] Like, nothing is blocking that.
[21:52] So, if you download this,
[21:54] immediately it's loaded.
[21:57] So, you can't filter that with
[21:59] sandboxes. You need to have another way.
[22:02] I call that a context filter. Think of
[22:04] this as a web application firewall that
[22:06] just filters out any patterns or prompt
[22:08] injections or stuff that is coming in
[22:10] directly in that piece.
[22:13] And if you take that, there's a lot of
[22:15] talk here as well on harness
[22:16] engineering. Harness engineering itself
[22:18] also has this kind of full
[22:20] observability, looking at logs, looking
[22:22] at traces, looking at feedback.
[22:24] So, it's kind of, you know, useful for
[22:28] training pieces, but as much useful for
[22:30] running your own pieces well.
[22:33] Those were the pieces for me today.
[22:36] I would say
[22:38] for a lot of people, there's like create
[22:40] context,
[22:42] test context. Think of this as your
[22:43] library authoring tool loop.
[22:47] And then when you push this into the
[22:48] enterprise, there's an organizational
[22:50] loop. Hey, I made a library, somebody
[22:53] else is using it. I'm looking at
[22:54] whatever that's useful, whether that's
[22:56] still working, whether that's still
[22:58] working for all the other pieces. So,
[23:00] that's kind of like
[23:01] the kind of
[23:04] improvement almost like sonar CICD model
[23:07] for context. And then
[23:11] you're currently probably doing a lot at
[23:13] the individual solo model, you're
[23:14] improving, you're honing, crafting your
[23:17] own kind of markdown. What if you start
[23:19] doing this more with your team? Make
[23:21] that a reflex. If it's missing, add some
[23:24] context. What if you put that out to a
[23:26] team of teams and you start having a
[23:28] flywheel, you know, if you fix it here,
[23:31] the other team can reuse it and and
[23:33] that's kind of like,
[23:35] you know, scaling things out into the
[23:36] organization as well.
[23:39] And so, there's a lot of talk about LLMs
[23:42] and coding agents and I all love them,
[23:44] but the way that I see it is they're
[23:46] just the engine.
[23:48] If you give the engine the wrong fuel,
[23:50] which is context,
[23:52] they're not going to perform. So, and
[23:54] you can't do anything on the LLMs, at
[23:56] least not me, right? I'm just using the
[23:58] coding agent, I'm using whatever they
[24:00] give me, but I can optimize my context
[24:03] uh
[24:04] and that's I think the message uh doing
[24:06] this more in an engineered way than just
[24:08] copy and pasting things and hoping for
[24:10] the best in there.
[24:13] If you like this talk, connect on
[24:15] LinkedIn for the slides. Uh
[24:17] give me some feedback, good and bad.
[24:20] If you want to try Tessel where we
[24:22] implement some of the pieces of this, uh
[24:24] have a go.
[24:26] And if you're also interested in another
[24:28] conference, I know, you can never have
[24:29] enough conferences, uh visit uh AI
[24:32] DevCon, which I curate the content for
[24:35] uh here in London first and second of
[24:37] June.
[24:38] And that's it. I can maybe take a few
[24:40] questions.
[24:42] >> [applause]
[24:49] >> Any questions?
[24:52] Sure.
[24:54] So, I was wondering if you have any
[24:55] thoughts about like more exotic forms of
[24:57] context like I don't know, the
[24:59] traditional ones. So, for example, one
[25:01] of the things I'm working on is
[25:02] automated system for uh scoping out
[25:05] architectural problems and like trying
[25:06] to create hard definitions for them so
[25:08] that you can feed that to the agent and,
[25:09] you know, create actual
[25:11] objectives uh tests.
[25:13] Cool. Yeah.
[25:14] Microphones.
[25:16] Um and one of the things I've been
[25:17] testing out is like
[25:19] the ability to create consistency as a
[25:21] form of context or as a form of eval.
[25:23] So, um given this rough like very loose
[25:26] definition of what the plan is, if can
[25:29] you put that if you try that agent
[25:30] system, turn that into a really crisp
[25:32] definition, and you just have that done
[25:34] in parallel, how often do you get the
[25:36] same crisp definition? And if they're
[25:39] all over the place, then the original
[25:40] definition was so poor, you need to like
[25:41] go back to base principles or to an
[25:43] architect. But, if they're all the same,
[25:45] then it's probably a pretty good
[25:46] definition and you can carry on with the
[25:49] downstream process. So, I think it's
[25:51] like besides just code and typical
[25:52] evals, um any other sources of context
[25:54] for generating context that you think is
[25:56] useful?
[25:57] Um
[25:59] I don't have maybe a a specific answer
[26:01] to your like exotic case, but uh
[26:04] I would say that maybe the piece that
[26:06] people are underestimating is that once
[26:07] you you know, you thought you were going
[26:09] to save time by writing actually your
[26:12] context uh instead of all your code,
[26:15] but if you take this rigorously, you're
[26:17] going to spend time on writing the right
[26:18] evals. Right. And that's kind of like,
[26:21] you know, a lot of work to kind of
[26:23] because now you don't only have one
[26:25] prompt that you're trying to get right.
[26:27] It's like all the prompts of the evals
[26:30] and that like if people do almost like a
[26:33] like the more advanced people, they
[26:35] almost have their own process and they
[26:37] they build their own process on top of
[26:39] like for building the right evals on
[26:41] your business case as well. So,
[26:43] yeah.
[26:44] Good question. Thank you. Any other
[26:46] questions?
[26:49] If not, I'll be around. Um
[26:52] say hi. I'll also going to be at the
[26:53] Tessel booth. So, thank you very much
[26:55] and I'm going to make space for the next
[26:56] speaker. Thank you.
[27:03] >> [music]
