---
title: "How to use Karpathy's Autoresearch to 10x Claude"
source_type: "youtube"
channel: "Ben AI"
date: "2026-04-07"
url: "https://www.youtube.com/watch?v=bc4NrE0cOE0"
pillar: "building"
tags: [auto-research, self-improving-ai, optimization, skills, claude-code, evals, agents]
ingested: "2026-04-16"
extraction_method: "auto-captions"
video_id: "bc4NrE0cOE0"
duration: "19:46"
---

[00:00] Dre Karpathy, one of the leading AI
[00:01] researchers, recently launched Auto
[00:03] Research, a framework that literally
[00:05] makes AI become self-improving. And when
[00:07] applied well, it lets your AI agents and
[00:09] your skills autonomously optimize itself
[00:12] against real world data to optimize
[00:14] anything from cold email campaigns to
[00:16] landing page conversions to content
[00:18] engagement or anything else that can be
[00:20] measured. So in this video I'll show you
[00:21] how to actually use it with best
[00:23] practices, show you how it works with
[00:25] plenty of examples and a simple way you
[00:27] can get started with this in cloud
[00:28] co-work or cloud code today. So Karpathi
[00:31] introduced this auto research concept or
[00:33] framework a few weeks ago and he built
[00:35] it specifically for uh machine learning
[00:38] but this can be applied to many other
[00:39] concepts in AI too. We've, for example,
[00:41] built our own version of this framework
[00:43] with a plug-in for cloud co-work and
[00:44] cloud code. And we've been using it to
[00:46] autoimprove our skills, our cloud MD to
[00:49] make our second brain more efficient,
[00:50] and we're now testing it on our
[00:52] newsletter subject lines to improve open
[00:54] rates, uh, LinkedIn post to increase
[00:56] engagement, and landing page copy to
[00:58] improve the CTR. Of course, this
[01:00] framework could be applied to many other
[01:01] things. Now, before showing you exactly
[01:03] how it works, let me show you some
[01:04] examples. So, I'll start with a simple
[01:06] one so you understand the concept. So
[01:08] here I ran the auto research skill that
[01:10] we created to optimize my LinkedIn
[01:12] writer skill for the following criteria.
[01:14] Optimize a LinkedIn skill to make sure
[01:16] hooks are always under 136 characters
[01:18] and make sure bullet points are always
[01:20] done with hyphens. It then ran one test
[01:23] to identify the baseline score which in
[01:25] this case was 80% or four out of five
[01:28] that passed the two criteria and it then
[01:30] started the optimization loop with a
[01:32] hypothesis on how it could improve the
[01:34] baseline. So in this case it started
[01:36] with an hypothesis on how to improve the
[01:38] hook criteria. In this case add explicit
[01:41] 136 character limit for hooks in step
[01:43] four in the skill. It then ran the first
[01:46] iteration and the pass rate went up to
[01:48] 100%. So it decided to keep uh the
[01:51] hypothesis because it was a significant
[01:53] improvement. It then ran iteration two
[01:56] to improve the second criteria with a
[01:58] new hypothesis. So in the end it ran
[02:00] five iterations completely autonomously
[02:02] and the final output was 100% score with
[02:04] a 25% improvement for both the criteria
[02:07] and of course the new optimized LinkedIn
[02:09] writer scale and a dashboard where we
[02:11] can see all the iterations that it ran
[02:13] which ones it kept which ones it
[02:15] discarded and also the overall
[02:17] improvement from where we started. Now
[02:19] this was a simple optimization of course
[02:21] but we can make this much more extensive
[02:22] and in-depth. For example, here I ran it
[02:24] again on making sure it uses the correct
[02:27] hook templates according to my hook
[02:28] template reference file. And another
[02:30] criteria to make sure it adds nuance in
[02:32] my sentences when I make bold
[02:35] predictions or claims. Another one to
[02:37] optimize the skill to always follow a
[02:39] proven writing framework like PAS or IDA
[02:42] and making sure that my post contains a
[02:44] personal story for my personal
[02:46] background reference file. It then again
[02:48] first established the baseline which is
[02:50] 68%. It started running iterations with
[02:53] hypothesis. It then ran 10 iteration
[02:56] loops completely autonomously to get to
[02:58] a 27% uh improvement from the baseline.
[03:01] Again, it gave me the new updated skill
[03:03] and a dashboard with the overview. Now,
[03:05] this can not only be used for skills.
[03:07] I've also used it to optimize my second
[03:08] brain performance. If you've watched my
[03:10] last video, you'd understand this. For
[03:12] example, here I ran the loop on
[03:14] optimizing the cloud MD for knowledge
[03:16] routing to make sure it saves the data
[03:17] in the right folders to optimize it for
[03:19] wiki link creation and also for
[03:21] knowledge retrieval. Again, it ran five
[03:23] iterations and got to a 9.9% improvement
[03:26] and the updated cloud MD file. Now,
[03:28] coming up with a few of these criterias
[03:30] yourself and just listing them out is a
[03:31] great way to improve your skills or your
[03:33] cloud MD fast. But this becomes
[03:35] especially powerful when we start
[03:36] optimizing and running the loop against
[03:38] real world data. Firstly, of course, we
[03:40] can do this based on past data. For
[03:42] example, in this chat, I pulled my top
[03:44] performing LinkedIn post and my worst
[03:45] performing LinkedIn post together with
[03:47] engagement data. And then I let Claude
[03:49] identify patterns to come up with a
[03:51] hypothesis or criteria on what to
[03:54] optimize the scale for based on this
[03:56] real world data. So did a LinkedIn
[03:58] pattern analysis um comparing my top
[04:00] performing versus my worst performing
[04:02] ones and then compared a few things like
[04:04] hooks and the hook type versus metrics,
[04:07] the CTA analysis versus metrics and what
[04:10] kind of writing framework was used
[04:12] versus the metrics. Based on patterns it
[04:14] found in these three things hooks, CTAs
[04:16] and writing frameworks. It then created
[04:18] a new hypothesis on what kind of post
[04:21] would work best. But the next step is of
[04:23] course that we can start using a
[04:24] schedule task together with auto
[04:26] research to potentially make it
[04:28] autonomously optimize it on a weekly
[04:30] basis. So I've set up three of these
[04:32] tasks uh like the LinkedIn auto
[04:33] optimizer, the email sequence open rates
[04:36] optimizer and the auto landing page
[04:38] optimizer. Now they haven't actually run
[04:39] because I started this this week, but
[04:41] the idea is of course that every week it
[04:43] can set an up hypothesis. For example,
[04:45] this combination of hook, writing
[04:47] framework, and call to action gets the
[04:49] best results. So we'll test those types
[04:51] of posts. Then the week after it scrapes
[04:53] the data from the performance, keep the
[04:55] change if it led to better results, and
[04:57] keep iterating until it hits a goal. For
[05:00] example, until it reaches an average of
[05:02] 250 average likes. Now, of course, you
[05:05] can also build some human in the loop in
[05:06] here if you're not comfortable with an
[05:07] AI actually running this autonomously.
[05:09] But for example, in the email sequence
[05:10] open rates and auto landing page
[05:13] optimizer where you can test, for
[05:14] example, H1 copy until it gets to 3%
[05:17] CTR. And you can see in the
[05:18] instructions, it's a set of steps. So,
[05:20] it first has to pull last week's landing
[05:22] page metrics, right? Then define a new
[05:24] hypothesis for how we can improve the
[05:26] landing page or H1 copy, then make the
[05:28] change on my website and do the same
[05:30] next week. Now, of course, there will be
[05:31] other variables when you're testing
[05:33] this. So, it's not going to be perfect,
[05:34] but you can see the potential for a
[05:36] framework or setup like this, especially
[05:38] with agents becoming more powerful and
[05:40] getting more context around our
[05:42] business. So even if you're not ready to
[05:44] use it like this yet, it's still great
[05:46] to optimize your skills or cloud MD
[05:48] really fast. Now before showing you how
[05:50] it works and how to use this
[05:51] efficiently, how do you actually set it
[05:52] up? Now the way you can use Karpath's
[05:54] framework is by going to his GitHub
[05:55] repository which I'll make sure to link
[05:57] in the description below too. And then
[05:58] you can basically download the zip file
[06:01] and once you've downloaded it, you can
[06:02] just unzip it. Then go to cloud co-work
[06:05] or cloud code and just give it access to
[06:07] that file. And then once you have the
[06:09] folder selected, of course, Karpathi's
[06:11] framework is built for machine learning
[06:12] optimization. So you would have to um go
[06:15] through it with cloud and adapt this to
[06:16] make it applicable and usable for uh
[06:19] skills for example or for the cloud MD
[06:21] or any task or process you want to
[06:23] optimize it for. So you basically just
[06:25] ask something to cloud like can you
[06:27] apply this framework or loop um to
[06:31] optimizing skills etc. And you can start
[06:34] building your own version of it. You'd
[06:35] need to go back and forth a little bit
[06:37] to actually make this work efficiently.
[06:39] This is how we built a plug-in out of
[06:41] this that helps it optimize for the most
[06:42] common use cases. You can see we have a
[06:44] skill here with auto research and also
[06:46] the agents that do the evals, the judge
[06:49] and our test runners. So, you can
[06:51] definitely create something like this
[06:52] for yourself if you go back and forth
[06:53] with Claude a little bit. But if you're
[06:55] interested in our plug-in, uh you can
[06:56] also check out my AI accelerator uh
[06:58] where we list all the plugins and skills
[07:00] we're building out for ourselves. We
[07:02] also have multiple weekly Q&A and AI
[07:04] workshops where we dive a lot deeper
[07:05] into these tools and unlimited
[07:06] one-on-one live tech help to help you
[07:08] set up anything you need in Cloud Co,
[07:10] Cloud Code or anywhere else. So, if
[07:12] that's interesting to you, um,
[07:13] definitely check it out in the first
[07:14] link in the description below. Now,
[07:16] whether you want to build this out for
[07:17] yourself or just use it, it's still
[07:19] important to understand how this
[07:20] actually works. Now, it's actually
[07:22] pretty straightforward. All it is is
[07:23] just a loop. First, you define the
[07:25] criteria of what you want to optimize.
[07:27] for example, optimize uh my LinkedIn
[07:29] skills so that hooks must always be
[07:31] under 130 characters. Then auto research
[07:34] will first establish the baseline
[07:36] criteria by running a sub agent who
[07:38] tests the current version and gives a
[07:40] score. Usually it runs a few tests. So
[07:42] for example five you can see here that
[07:44] in co-work it used a sub agent here the
[07:46] auto research test runner to establish
[07:48] the baseline and give a score in this
[07:51] case 80%. And then the main agent, the
[07:54] one you interact with on co-work creates
[07:56] a hypothesis on how it can improve that
[07:58] score. For example, by adding a role in
[08:01] step four in the skill. Then another sub
[08:03] agent runs a test with the updated
[08:06] skill. Basically, in order to make sure
[08:08] it's unbiased, for example, here it
[08:10] started testing this hypothesis with
[08:12] another sub aent here. Then there's
[08:15] another sub agent that again is unbiased
[08:17] that evaluates the outcomes of each of
[08:20] the test runs. Now there are two ways he
[08:22] can evaluate the outcome. It can be
[08:23] through a script which just defines if
[08:25] something happened or not through
[08:27] deterministic logic or a Python script
[08:30] or it can judge the outcome through
[08:31] another sub agent if it's not possible
[08:33] to do it through a deterministic code
[08:35] script. For example, in this case is a
[08:37] simple criteria. So the eval runs
[08:39] through a script. But if we look at
[08:41] another example where I try to optimize
[08:42] the skill to match the hook with one of
[08:45] the hook templates that I have in my
[08:47] hook reference file, it actually is
[08:49] harder to do it through a script. So you
[08:51] can see here first ran a sub agent to
[08:54] run the test and then the outcome is not
[08:56] judged through a script but through
[08:58] another sub agent which is the L&M
[09:00] judge, right? Auto research judge. He
[09:02] judges the outcome if it passes or not.
[09:05] And then the main agent gets the results
[09:06] back and decides to keep the change or
[09:08] discard the change depending on if it
[09:10] improved upon the baseline score. It
[09:13] then keeps setting new hypothesis until
[09:15] it reaches the goal or it reaches the
[09:17] amount of iterations you've defined. If
[09:19] you see my previous video on skills 2.0
[09:21] or evals, which is a built-in feature of
[09:23] the skill creator skill in claude, the
[09:25] difference is that this basically
[09:27] automates the entire optimization
[09:29] process autonomously. While with evals
[09:31] uh we have to constantly judge the
[09:33] outcome of an eval and give it feedback
[09:35] for the next improvement. So instead of
[09:37] that we'll just keep running in a loop
[09:38] until it actually meets your criteria.
[09:40] Now of course this comes with a cost too
[09:42] because if you let it run for hours in
[09:44] terms of optimization you can imagine
[09:46] that the token cost will go up quite a
[09:47] lot. So it's important to actually
[09:49] optimize things and skills that you use
[09:52] frequently and make sure you optimize it
[09:54] for things that make a real difference.
[09:55] Which brings me to the next point which
[09:57] is the importance of defining good
[09:59] criteria because the skill or the
[10:01] process you're optimizing with auto
[10:03] research will only become as good as the
[10:05] criteria you define. So what's an easy
[10:07] way you can think about formulating good
[10:09] criteria? First of all, whatever you're
[10:11] testing against, keep in mind that the
[10:12] outcome should always be true or false.
[10:14] That's how the system works. So first uh
[10:17] then you have to state the exact
[10:18] condition, not just the goal. So don't
[10:21] make don't say something like make sure
[10:22] the hook is short enough. say the first
[10:24] line must be under 136 car characters
[10:27] character. So generally you need a
[10:29] specific number a specific format or a
[10:31] specific pattern it can actually test
[10:33] against and then second of course you
[10:35] need one variable um per criteria. If
[10:38] you need the word and to describe what
[10:40] you're testing then you have to split it
[10:41] into two criteria. You can still give it
[10:43] multiple of these criteria at the same
[10:45] time because it will go through all of
[10:46] them but each one should be well
[10:48] testable. So separate them into two. Now
[10:50] how do you come up with these criteria?
[10:52] This of course becomes a lot easier if
[10:53] you actually have real world data
[10:55] experience or expertise around the
[10:57] process task or the skill that you want
[10:59] to optimize. And an easy way to come up
[11:01] with some of these criteria is by either
[11:03] feeding it some of the real that real
[11:05] world data like I did with the LinkedIn
[11:06] post and asking uh clots to spot the
[11:09] patterns and come up with criteria to
[11:11] test against based on good and bad
[11:14] performing posts. But even if you don't
[11:15] have that real world data, just try to
[11:17] feed it good examples or good outputs
[11:19] and tell cloud to identify patterns in
[11:21] them and potentially criteria to improve
[11:24] the skill upon. Now, if you don't have
[11:26] that data, of course, you can also look
[11:27] at industry best practices or other
[11:29] people's posts or data. Now, there's
[11:31] also a big difference, of course,
[11:33] between optimizing for clear-cut
[11:35] deterministic skills or processes and
[11:37] subjective or creative skills or
[11:39] processes. For example, for an
[11:41] accounting skill that goes through my
[11:42] Stripe, my invoices and uh logs it into
[11:45] my Excel sheet at the end, it's a pretty
[11:47] clear-cut deterministic process that
[11:49] just needs to work well. And there's not
[11:51] really any external data we can test it
[11:53] against. So, in those types of skills or
[11:55] processes, we can often just run an eval
[11:58] from the skill creator skill. If you
[11:59] haven't seen that video, I'll make sure
[12:00] to link in the description below, too.
[12:02] Um, to basically make sure that the
[12:04] skill actually works the way we intended
[12:06] the skill to work. But I think the real
[12:08] unlock is using auto research
[12:09] specifically to optimize um processes
[12:12] and skills that have some subjectivity
[12:14] or creativity embedded. And if you think
[12:16] about it, most processes and skills
[12:18] across marketing, sales, customer
[12:20] support or other business departments
[12:22] have some level of subject subjectivity
[12:24] embedded. But that of course brings up
[12:26] another question. And if we have to give
[12:27] it these very clear true or false
[12:29] criteria for auto re search, how do we
[12:32] actually use it to optimize it for these
[12:34] more subjective or creative processes
[12:36] like a LinkedIn skill? For example, how
[12:38] do we optimize it to match our tone of
[12:40] voice? Now, if you think about it, even
[12:41] subjective or creative skills like
[12:43] copywriting can actually for a large
[12:46] part be defined by true or false
[12:48] criteria. And the way you can think
[12:49] about it is through this three-level
[12:51] framework. And the first level is what
[12:52] are the clear-cut rules. It always has
[12:54] to follow according to your or general
[12:56] best practices. For example, on LinkedIn
[12:59] copywriting that could be the hook must
[13:00] always be under 136 characters. Uh
[13:03] second, the sentence sentence length
[13:05] should always be between five and 12
[13:07] words or a paragraph shouldn't consist
[13:09] of more than three sentences. These are
[13:11] kind of like hard rules and
[13:13] well-definable and general best
[13:15] practices for LinkedIn copyrightiting.
[13:17] But then the next layer becomes a bit
[13:18] more subjective, right? And this is
[13:19] where we start looking uh more for
[13:21] patterns of copy or your unique way of
[13:24] writing. For example, I try to optimize
[13:26] my skill to make sure that bold
[13:28] predictions and claims are given with
[13:30] nuanced words like I think, I believe,
[13:33] or I predict because I noticed that AI
[13:35] makes very bold claims in a in a too
[13:38] convincing way. And for these types of
[13:40] tasks and optimization, we generally
[13:42] need that AI judge, right? Not just a
[13:44] script. Another example for that could
[13:47] be for example to make sure that your
[13:48] copywriting follows one of the major
[13:50] writing frameworks like PAS, IDA, CPF
[13:53] etc. And then for this layer which is a
[13:55] bit more subjective I think uh AI can
[13:57] really help you spot those patterns or
[13:59] criteria I could optimize it for. Now of
[14:01] course there's always going to be some
[14:02] level of creativity or subjectivity in
[14:04] these types of skills that you cannot
[14:06] optimize it for together with auto
[14:08] research. But the point I'm making is
[14:09] that if you can articulate these roles
[14:11] or let AI analyze your post and identify
[14:14] these patterns or criteria, you can get
[14:17] it to match your tone of voice to a very
[14:18] high degree by just defining these true
[14:20] or false criteria. So that's the way I
[14:22] generally recommend you optimize these
[14:24] skills or processes with together with
[14:26] auto research is by first thinking of
[14:27] those hard rules or best practices, run
[14:30] it through an EVA or an auto research uh
[14:32] and make sure that it consistently nails
[14:34] those. And for some more deterministic
[14:37] skills like my accounting skill for
[14:38] example, this would be all you need. And
[14:40] then for more creative skills, you can
[14:42] go uh to the more subjective layer while
[14:45] still trying to get those true or false
[14:46] criteria. And once you've done this, of
[14:48] course, the real meta is to start
[14:50] optimizing against real world data. Now,
[14:53] of course, this becomes a bit trickier
[14:54] because there's a delay in the feedback
[14:56] loop which you can solve with the
[14:58] scheduled tasks. But you have to be
[14:59] comfortable with AI autonomously doing
[15:01] this for you. And that's again why you
[15:03] need to make sure that the skills
[15:05] already really well optimized before you
[15:07] go into this stage. So how do we
[15:09] actually start using it? Now if you're
[15:10] going to use the plugin that we've
[15:11] built, you can just go into my AI
[15:13] accelerator and download the zip file of
[15:15] the plug-in. Once you have the zip file,
[15:17] you go to customize. You go here to
[15:19] plugins and click plus. You can click uh
[15:21] click create plugin here and upload the
[15:23] plugin where you upload the zip, right?
[15:25] You just upload the zip and then it will
[15:27] appear here. As you can see, we have
[15:29] auto research. Now mine was installed of
[15:31] course already. Then we have the skills.
[15:33] Here we have the auto re search skill
[15:35] and three sub agents. One for the evals,
[15:37] one as the L&M judge and one is the test
[15:39] runner. Then you just go to a new task
[15:42] and you run the skill auto research.
[15:46] It will then ask you some questions if
[15:47] you haven't already specified what you
[15:49] want to use it for. So in this case, I'd
[15:51] say optimize my LinkedIn writer skill.
[15:55] We've embedded in the plug-in the also
[15:57] the roles for the criteria, right?
[15:58] state, exact condition, one variable,
[16:00] etc. And then they actually propose me
[16:02] some things to optimize for. But of
[16:04] course, here's where you want to start
[16:05] thinking, okay, what you want to
[16:06] optimize this for. Again, here's also
[16:08] the point where you can start feeding it
[16:10] real world data. For example, let it
[16:11] analyze your top performing LinkedIn
[16:13] posts. Um, but let's say I just define
[16:15] four criteria here. I want to optimize
[16:19] the LinkedIn skill for these criteria.
[16:22] So, I just add in four criteria. I let
[16:25] the skill do its work and it will
[16:26] already know what to do. Then it defines
[16:28] your criteria a little bit more in
[16:29] depth. It's good to read them to
[16:31] actually make sure that they make sense.
[16:32] In my case, they do. So, I just tell
[16:33] them they look good. And then it asks me
[16:36] which evaluation mode should we use.
[16:38] Now, this depends on if this is a really
[16:40] clear-cut rule or if it needs an AI or
[16:42] an L&M as a judge. Now, you don't really
[16:44] have to make this decision. You can make
[16:46] the decision, but the system itself will
[16:47] give you a recommendation. In this case,
[16:49] for many of these, we'd need AI as a
[16:51] judge. So, that's why it's already
[16:52] recommended that. So we just click that
[16:54] and we can decide how many iterations we
[16:57] want to run this on. Now generally
[16:58] there's two ways you can do this is you
[17:00] can either define how many iteration
[17:01] loops it should run or you can tell it
[17:03] to keep running until it hits a certain
[17:05] goal or number. Now generally what I
[17:07] recommend also to in terms of saving
[17:09] token usage is to uh start with five
[17:13] iterations maybe 10 if you have many
[17:15] instead of letting it infinitely do an
[17:18] iteration loop because in my experience
[17:20] if you let it run for too many
[17:21] iterations it actually gets worse after
[17:24] 10 or 15 iterations. So generally that's
[17:26] sort of the cutoff that I recommend. So
[17:28] in this case I I'd say five. It then
[17:30] scored the baseline results and
[17:32] prioritized the weakest areas, personal
[17:34] story, specificity, and nuance on bold
[17:36] claims. So that's the first iterations
[17:38] it will try to optimize. You can see
[17:40] that the first hypothesis it's testing
[17:42] is uh add explicit instruction in step
[17:45] five to always include a specific
[17:46] personal anecdote from Ben's background.
[17:48] And as you can see in this first
[17:49] iteration result, it got an improvement
[17:51] on the personal story specificity. So it
[17:54] decided to keep the change. In the
[17:56] second iteration, it then tried to
[17:57] optimize for nuance on bold claims. It
[18:00] got a 6 improvement. And again, the
[18:02] result was keep. And it keeps doing this
[18:04] until it hits the five iterations. Now,
[18:07] this is going to keep looping until it
[18:08] does all five iterations. And then, if
[18:10] you want to take this up a notch, which
[18:11] I can't show you because it hasn't run
[18:13] yet, is to use the schedule task. But in
[18:16] this case, it would work something like
[18:17] this. You're running the weekly LinkedIn
[18:19] optimization loop for BMW. This is an
[18:20] automated AB testing system that changes
[18:23] one variable per week. hook typewriting
[18:24] framework or CTI CTA type to maximize
[18:27] average like post target 250 average
[18:30] likes. So we just give it some context
[18:31] on the folder structure because we have
[18:33] to save some data. Um so it actually
[18:35] understands what tests we've run in the
[18:37] past. So first it's reading that context
[18:40] to get the current active experiment
[18:42] details to read the optimization rules
[18:44] to understand allowed hooks frameworks
[18:46] and CTAs. Then of course scrape last
[18:49] week's posts, extract the engagement
[18:51] metrics, calculate the metrics, update
[18:54] the context. So we save that in the
[18:56] folder and then of course make the
[18:58] decision based on the results. If the
[19:01] average likes went up versus baseline,
[19:03] keep average likes are down, revert and
[19:05] then generate the next iteration or
[19:07] hypothesis which will then be of course
[19:10] scheduled for next week. Now, I'll
[19:11] probably do another video on this when
[19:12] I've experimented a bit more with these
[19:14] scheduled or autonomous optimization
[19:16] loops, but uh I think it's interesting
[19:19] to experiment with. Now, that's it for
[19:20] this video. Again, if you want access to
[19:22] this plugin on all the other skills and
[19:24] plugins that we're building out, you can
[19:25] check out my AI accelerator in the link
[19:26] in the description below. Um, we also do
[19:28] these weekly Q&A, multiple weekly Q&As,
[19:30] workshops, and unlimited one-on-one live
[19:33] tech help. We also have a full guide on
[19:34] setting up your AI operating system or
[19:36] your uh second brain. Um, so if that's
[19:39] interesting to you, uh, you can check it
[19:40] out in the link in the description
[19:41] below. Also, if you want to learn more
[19:42] about Claude and skills, etc.,
