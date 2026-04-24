---
title: "Planning In Claude Code Just Got a Huge Upgrade"
source_type: "youtube"
channel: "Nate Herk | AI Automation"
date: "2026-04-06"
url: "https://www.youtube.com/watch?v=T4fXb3sbJIo"
pillar: "building"
tags: [claude-code, agents, workflow, planning, how-to]
ingested: "2026-04-24"
extraction_method: "auto-captions"
video_id: "T4fXb3sbJIo"
duration: "15:48"
---

[00:00] So, right here I have regular Claude
[00:01] code building me a plan, and it's been
[00:03] running for almost 4 minutes now. And in
[00:05] this terminal, I have it doing the exact
[00:07] same plan, but now it's doing it with
[00:08] ultra plan mode. You can see it says
[00:10] monitor progress in Claude code on the
[00:12] web, and right here it says ultra plan
[00:13] ready. So, if I hover on that, click
[00:15] enter, I'm able to review this on the
[00:17] web, and this finished in about 1
[00:18] minute, whereas this one is still
[00:19] running, and it's been over 4 minutes
[00:21] now. And when I go to that web session,
[00:23] we can see the actual plan. I have
[00:25] context, I have what already exists, the
[00:27] new approach with new files to be made,
[00:29] modifications, as well as just a final
[00:31] verification. This gives me the plan in
[00:33] a lot more structured way. I also
[00:35] sometimes get diagrams based on what
[00:36] it's actually planning. And in here, I
[00:38] can go ahead and leave emoji reactions
[00:40] on certain places, which I think is a
[00:41] nice touch, or I could go ahead and
[00:43] comment on specific elements, as you can
[00:45] see right here, I could add a comment.
[00:46] And then, when I want to send these
[00:48] comments off, Claude will go back and do
[00:49] another iteration of the plan, or I
[00:51] could click on this button, which is
[00:52] approve plan and teleport back to the
[00:54] terminal. So, I do that, and now it's
[00:56] going to send it back. And if I jump
[00:58] back into that session right here, we
[01:00] can now see the plan has been received,
[01:01] and we can either implement it here, or
[01:03] we could start a new conversation and
[01:04] implement it there. So, if I just click
[01:06] on this, now we have that full plan that
[01:08] Claude code on the web actually built
[01:10] for us, and it's being worked on right
[01:11] here locally. And the whole time this
[01:13] original section is still planning, it's
[01:15] still asking me questions, and it's just
[01:17] moving very slow. Now, I'm not saying
[01:18] that speed is always the most important
[01:20] thing, but if you're getting speed and
[01:21] higher quality, then that is a good
[01:23] combination. Now, what else you'll
[01:24] notice is in this session of the cloud
[01:26] where it sends off my prompt to be ultra
[01:29] planned, it's still able to look what's
[01:31] inside of our directory because it syncs
[01:33] to Git. So, right here it starts off by
[01:35] exploring what's in the directory to see
[01:37] what it can build on, and it was able to
[01:39] find existing skills and scripts, and
[01:41] just able to leverage those and use
[01:43] those in the plan. So, basically, this
[01:44] is all thanks to the new kind of secret
[01:47] feature called ultra plan. Plan in the
[01:49] cloud with ultra plan, you start a plan
[01:51] from your CLI, you draft it on the web,
[01:53] and then you send it back to the
[01:54] terminal, or you can just execute it
[01:56] remotely as well. And it's really
[01:57] interesting, I've ran a ton of different
[01:58] tests between the same prompts locally
[02:00] and the same prompts to be ultra
[02:02] planned, and not only is ultra plan
[02:04] faster at planning, but for some reason
[02:06] it's much faster at executing, too. And
[02:08] I think it's just because the plan is so
[02:09] clear that the agents have a much easier
[02:11] time locally just executing on it and
[02:13] building everything out. And I'll show
[02:14] you guys an example of that in a bit.
[02:16] This is useful when you want a richer
[02:17] review surface than what the terminal
[02:19] offers as far as targeted feedback,
[02:20] because you can comment on individual
[02:22] sections. You get a nice sort of like
[02:24] doc style plan as well, rather than in
[02:26] the terminal, sometimes it can just be
[02:28] like lines of text, so it's kind of
[02:29] messy to see like the structure. You
[02:32] also have hands-off drafting, and you
[02:34] have flexible execution. So, it's really
[02:36] simple, you just do a /ultra plan, and then your prompt, or if you
[02:39] just have the word ultra plan in there,
[02:41] it will ask you if you want to ultra
[02:43] plan. So, if I just come back in here,
[02:44] and you see I literally just type the
[02:45] word ultra plan, it lights up the same
[02:48] way that it would light up if you do
[02:49] something like ultra think. So, maybe
[02:51] you ultra think and ultra plan, you burn
[02:53] through your entire session in one
[02:55] prompt. Because obviously, the ultra
[02:57] plan is using a little bit more tokens,
[02:59] I'll show you guys an example of that
[03:00] later. We don't know exactly how many,
[03:02] but the way that it's spinning up and
[03:04] it's using a lot more compute resources
[03:06] in the cloud, it's going to use more
[03:07] tokens than if you just do a regular
[03:08] plan over here. But once again, planning
[03:11] is so, so important, it sets the whole
[03:13] structure and path of your project on
[03:15] the right path. So, sometimes it really
[03:17] is worth spending more tokens up front
[03:20] in order to shoot it off. I always think
[03:21] of this quote by Abraham Lincoln, "Give
[03:23] me 6 hours to chop down a tree, and I
[03:25] will spend the first four sharpening the
[03:26] axe." So, that's basically our planning.
[03:29] Also important to know that this has to
[03:30] be done in the CLI. If we are here in
[03:32] the desktop app and we tried to do
[03:33] something like ultra plan, build me a
[03:36] 5-day workout guide, if we shoot this
[03:39] off, we're not going to get that whole
[03:41] ultra plan in the cloud functionality.
[03:43] In fact, it actually just doesn't do
[03:45] anything. And same exact thing if we hop
[03:47] over to VS code, if we're doing it in
[03:48] the extension rather than in the
[03:51] terminal, ultra plan, and then we just
[03:54] let's just copy in the exact same thing,
[03:55] it's basically just going to do nothing.
[03:58] So, you have to use it in the CLI. Okay,
[04:00] so quick explanation of how this
[04:02] actually works, and then we're going to
[04:03] jump into an actual example that I ran
[04:04] and show you guys what it looks like.
[04:06] So, so we start talking to Claude code
[04:08] on our machine. Push an ultra plan, it
[04:09] sends that to the cloud, where that's
[04:11] where Claude will spin up, you know,
[04:12] different agents there using Opus, and
[04:14] it will do a really in-depth plan. Once
[04:17] that's ready, we're able to review, and
[04:19] we have this kind of feedback loop, but
[04:20] then we can teleport it all the way back
[04:22] to our machine if we want that to happen
[04:25] there. Like I said, you can launch it by
[04:26] doing /ultra plan, you can just
[04:28] have the keyword in there, or you could,
[04:29] you know, from an existing plan, like
[04:31] you already have one written up in
[04:33] locally, you could say, "Actually, I
[04:35] want to revise this in the cloud with
[04:37] ultra plan." And then, of course, you
[04:38] have that review loop, you can do
[04:40] comments, and you can do emojis, which
[04:42] is a nice touch. All right, so let me
[04:43] show you guys an example of this. So, I
[04:45] have ultra plan on the right, I have a
[04:46] regular plan on the left, and I gave
[04:48] both of these a huge spec about building
[04:50] us a dashboard. So, I used ultra plan
[04:52] over here, pasted it in, I said, "Do not
[04:54] use superpower skill," because I didn't
[04:55] want the local version to use that, I
[04:57] wanted it to just get raw, you know,
[04:59] keep the variables the same, and then I
[05:01] wanted to give it to us on a local host.
[05:02] So, I'm going to shoot this off, you see
[05:04] on the right-hand side, it says, "Do you
[05:05] want to do this in the cloud?" I said,
[05:06] "Yes." On the left-hand side, it just
[05:08] goes straight into plan mode. And once
[05:09] again, they got the exact same prompts.
[05:11] So, here is the link, I open this up,
[05:13] and it takes me to the cloud, where it's
[05:15] actually going to start building out the
[05:16] plan right here, as you can see. It's
[05:18] checking the directory to see what's
[05:20] available, and then over here, it's
[05:21] just, you know, kind of doing the same
[05:22] thing, getting acclimated with the
[05:24] environment. Okay, so at this point,
[05:26] we're about 2 minutes in, right? And you
[05:27] can see that I got the plan already on
[05:29] this right-hand side. So, I click
[05:31] through it a bit, we have different
[05:32] tabs, we also have like a little
[05:33] diagram, and it looks really good. So,
[05:35] what I do is I end up sending this back
[05:37] to the terminal, as you can see right
[05:38] here, and then it gets brought back into
[05:40] our local session right here. Okay, so
[05:42] now we're at the 14-minute mark, and the
[05:44] ultra plan version already done. The
[05:46] local host is spun up, so not only did
[05:48] it create the plan, but it also built
[05:49] everything out, whereas this regular
[05:51] plan mode has been going for 12 minutes
[05:54] and still hasn't even given me a plan to
[05:56] review yet. And finally, a few minutes
[05:58] later, we're at the 15-minute mark, this
[06:00] is when we actually finally get the plan
[06:01] from the local session. But you can see
[06:04] at the 26, 27-minute mark, it is still
[06:06] being built out. So, I end up stopping
[06:08] this recording to just wait until it's
[06:09] actually done. So, now I'm going to
[06:10] switch over to the actual live reaction
[06:12] of me looking at the differences in the
[06:14] two dashboards to see which one really
[06:16] built it out better. Okay, so just the
[06:17] regular plan mode is finally done. It's
[06:20] really weird, I normally stand in
[06:21] these videos, but I had to sit because
[06:23] this took, honestly, like 45 minutes.
[06:25] I'm not sure what was going on, but this
[06:28] thing on the right side, we did ultra
[06:30] plan, the plan finished in like five,
[06:32] and then it executed everything and
[06:34] built everything in, you know, like
[06:36] another 5 minutes, so about 10 to 15
[06:37] minutes total over here.
[06:39] And on this side, it literally took half
[06:41] the time to plan and then half the time
[06:42] to build, like it took a long time. So,
[06:44] anyways, we have the two dashboards
[06:45] here, let's open up the
[06:48] regular plan mode dashboard. So, let me
[06:50] open this up, you can see we have our
[06:52] pulse board, we have a nice little
[06:53] graphic here, we have some stats like
[06:55] MRR, annual run rate, total customers,
[06:58] churn rate. We can change this between
[07:00] all time, 30 days, 90 days, 6 months, 1
[07:03] year. We have different tabs on the
[07:05] left, we can do revenue
[07:07] and see different tiers, we can also see
[07:09] enterprise and pro, top 20 accounts,
[07:11] obviously all this is mock data. We've
[07:13] got our customers here with a nice chart
[07:15] and by tier, and then we have support.
[07:18] So, resolution time, tickets by
[07:20] category, distribution, we can do light
[07:22] mode or dark mode, and that all looks
[07:24] pretty decent. These charts look a
[07:25] little bit weird in light mode, but
[07:27] anyways,
[07:28] that is the plan version. Let's open up
[07:31] the ultra plan version
[07:33] on a different local host. This one,
[07:35] obviously, they're going to have very
[07:36] similar features as far as what we're
[07:38] looking at with the data, similar
[07:40] statistics up here, similar charts,
[07:43] everything like that. If we go to 30
[07:44] days, 90 days, 6 months, 1 year, that
[07:48] all loads in good. If we go down to
[07:50] revenue, we can see we also have a
[07:52] cohort retention, we have enterprise and
[07:54] pro, and we got some our 20 accounts
[07:56] there.
[07:57] Customers, obviously, we've got the same
[07:58] exact type of layout
[08:00] and the support
[08:02] over here. If we go to light mode, let's
[08:04] see what these look like.
[08:05] These all still look very, very solid.
[08:08] So, I mean, it's not a huge difference,
[08:10] right? And for something like a
[08:11] dashboard like this from an aesthetic
[08:13] point of view, it's kind of hard to tell
[08:15] like which one objectively between these
[08:17] two did better. If we wanted to look at
[08:18] things like
[08:20] how accurate the data's being pulled in
[08:21] or reflected, or how quick things load
[08:24] up, or how buggy it is, we'd have to do
[08:25] some deeper investigating, but also take
[08:28] a look at this. In the local plan
[08:30] version, it took 131,000 tokens, the
[08:33] ultra plan version took 82,000 tokens.
[08:35] Now, of course, the bulk of the planning
[08:37] work was done in the cloud, so those
[04:38] tokens don't count. You guys saw earlier
[08:41] when I was doing this, this is the
[08:42] section where we did our ultra plan on
[08:44] the web, and I tried to run a /cost to see how much this took, but it
[08:47] wasn't working, so we don't know
[08:48] exactly. But I will say it's using more
[08:51] tokens than the local, so it looks like
[08:53] this is using 50,000 more tokens. I'm
[08:55] assuming that the planning section for
[08:58] the ultra plan took at least 50K, but
[09:01] it's hard for me to say exactly. But I
[09:03] think that the plan was so much better
[09:04] because for some reason it was able to
[09:06] execute on the plan so much quicker and
[09:08] better, and they were both using,
[09:10] obviously, the exact same model. And all
[09:11] the other tests that I've done, ultra
[09:12] plan has always been quicker. I mean, in
[09:14] the cloud, there's so much more compute
[09:16] compared to what might be going on here
[09:17] on my device.
[09:19] But yeah, like this was a noticeable
[09:21] difference, not only with the plan, but
[09:22] when it came to the actual execution.
[09:24] Like I said, the execution over here was
[09:25] maybe maybe 10 minutes, the execution
[09:27] over here was upwards of 30 minutes.
[09:30] Okay, so I tried running some
[09:31] experiments for you guys. I did a
[09:33] session with API billing, and I ran a
[09:36] local plan, as you can see, and this
[09:38] ended up costing me about 1.5 million
[09:41] tokens in and 23,000 tokens out, and a
[09:44] mix between Haiku and Opus. Now,
[09:47] unfortunately, it doesn't let you do the
[09:50] ultra plan with API billing because you
[09:52] need basically a pro or max subscription
[09:54] in order to do the Claude code on the
[09:55] web. I tried, it wasn't letting me do
[09:57] that. So anyways, I did do this though.
[09:59] When it came back, what I did is I just
[10:01] checked how much of my usage did it
[10:02] actually go up, and it went up 1%. So we
[10:05] don't have an explicit number of tokens
[10:07] that we get allotted within this max 20x
[10:09] plan. So I don't know how many exact
[10:11] tokens it was, but I'm going to estimate
[10:13] that it was more than 1.5 in and 23,000
[10:17] out, and it was about 1% of my 20x max
[10:21] plan. So hopefully that gives you guys a
[10:22] little bit of context and just at least
[10:24] gives you a nice baseline. Okay, so
[10:26] let's talk about a few other things that
[10:27] you need to know about how this works
[10:29] under the hood and what you need to
[10:31] know. So first I'm going to start off
[10:33] with like
[10:34] your project, if you want to ultra plan,
[10:36] it has to have some sort of Git or
[10:38] GitHub, you know, repo synced to it
[10:39] because it has to be pushed to the cloud
[10:41] somehow. So if you try to run ultra plan
[10:43] in a project that's only local, it's
[10:44] going to say, "Hey, you can't do this on
[10:46] the web yet." It's as simple as just
[10:47] initializing that Git, pushing it, super
[10:49] easy, and then you can do it because
[10:52] obviously in the cloud, when it's doing
[10:53] the ultra plan, it needs to look through
[10:55] everything that you have and it needs to
[10:56] be able to actually work on your code
[10:58] base. Otherwise, it's going to be a
[10:59] very, very generic plan.
[11:01] Now after that, sometimes I've noticed
[11:03] that it's not calling my skills. Even
[11:05] though it looks through, the skills are
[11:07] things that get invoked. So if you're
[11:08] not specific enough on your plan for the
[11:10] ultra plan, then it may not use the
[11:12] skills the first time. And actually all
[11:14] of these visualizations here that I
[11:15] made, I made using ultra plan. So I'll
[11:18] put up a clip here where I'm showing how
[11:20] that worked. And what you'll notice is
[11:21] that I had to give it correction on
[11:23] using
[11:24] my visualization skill because it wasn't
[11:26] pulling that up for some reason.
[11:28] Okay, so here is that clip now. It says,
[11:29] "I want you to ultra plan and research
[11:31] cloud code's new feature ultra plan."
[11:33] And I kept saying ultra plan because I
[11:34] love when it when it lights up like
[11:35] that. But anyways, we shot this off,
[11:37] right? And it goes to the web, and now
[11:39] it's doing a fetch on our project and
[11:42] getting an understanding of what we want
[11:43] it to do.
[11:44] But what you'll notice here is that it
[11:45] doesn't actually create the Excalidraw
[11:47] style diagrams using my visualization
[11:49] skill, which uses Nano Banana, and it
[11:51] has like a prompting guide and a style
[11:53] guide, but it thought that I just wanted
[11:54] like markdown mermaid style
[11:58] diagrams, which is what it built as you
[11:59] can see here. So I realized that it was
[12:01] creating these not the right way. I
[12:02] added a comment right here that says,
[12:03] "Hey, I already have a skill set up that
[12:04] does this, so I want you to do it that
[12:06] way." And then when I shoot off that
[12:08] comment, it basically comes back and
[12:09] says, "Okay, I didn't see that skill.
[12:11] What's the name of that skill?" So I had
[12:12] to tell it explicitly right here which
[12:14] is the skill that it's looking for. So
[12:16] it asked me this question, and then I
[12:17] say it's called visualizations. And then
[12:19] once I said that, it was able to find it
[12:21] and it was able to use it, which is
[12:22] good. But just something to keep in
[12:24] mind, even though it can see your whole
[12:25] project, sometimes you still have to
[12:27] prompt it in the right way. And once
[12:28] again, this is just in research preview.
[12:31] Anyways, then it came back the right
[12:32] way, so I sent it back to the terminal,
[12:34] and then I was able to actually have
[12:36] everything be built out from my session
[12:38] here because the plan had been approved,
[12:40] and then I just go ahead and implement
[12:41] it locally. Okay, so now let's talk
[12:43] about what is actually happening because
[12:45] we're sending it to the cloud and it
[12:47] only works in the cloud. So that makes
[12:47] you think, "Why?" So obviously it's
[12:49] getting more compute, but I wanted to
[12:51] understand why and like what that even
[12:53] means. So I had this agent here do a
[12:55] deep dive into the ultra plan feature.
[12:58] It looked at source code, it looked at
[12:59] community forums, and it looked at the
[13:00] actual documentation. And here's what it
[13:02] came up with.
[13:04] Ultra plan offloads your planning
[13:05] session to a cloud-hosted instance
[13:07] running Opus 4.6. It uses multi-agent
[13:09] exploration to build a deeper plan than
[13:11] the local mode can. Then it either
[13:13] executes in the cloud or it goes back to
[13:14] your terminal. So what I thought was
[13:16] interesting is the multi-agent
[13:17] exploration. So here's a quick
[13:19] comparison table. When you do local
[13:20] plan, it runs in your terminal. When you
[13:22] do ultra plan, it runs in Anthropic's
[13:24] cloud container runtime.
[13:26] The model is whatever session you're
[13:27] using. Ultra plan always uses Opus 4.6.
[13:31] The planning approach is a single agent
[13:32] and it's linear thinking, whereas ultra
[13:34] plan is multi-agent. It is three
[13:36] parallel exploration agents plus one
[13:38] critique agent. So obviously this is
[13:40] going to use more tokens, but like we
[13:41] talked about, if you use more tokens up
[13:43] front, it's definitely worth it if it's,
[13:45] you know, faster and higher quality. Now
[13:48] the max compute time over here is
[13:49] bounded by your session, but on the
[13:51] cloud, it's 30 minutes as a cap. I've
[13:54] never hit that and I don't think I will
[13:56] because of how quick it's been, but
[13:57] there is a cap on it there. Now the
[13:59] other interesting thing is your terminal
[14:01] gets blocked while you're in plan mode
[14:03] because your session is focusing on
[14:04] that. But in ultra plan, if you send
[14:07] your plan to the web, you can continue
[14:08] talking to that terminal session and
[14:10] wait for it to get teleported back. Now
[14:13] truthfully, I don't know exactly when I
[14:15] would do that. I'd probably just spin up
[14:16] a different session because I'd want to
[14:17] keep that context clean so that I can
[14:19] just execute when it comes back, but
[14:21] that is something that is a difference.
[14:23] And then the review interface, you
[14:24] basically get text dialogue in your
[14:25] terminal. If you're using VS Code with
[14:28] cloud code and you're using like this
[14:29] extension rather than the terminal, then
[14:32] you do get a nice like doc and it looks
[14:34] a little bit better. You can leave
[14:35] comments on it, but if you're not using
[14:37] that and you're using the terminal, then
[14:38] it's definitely going to be better in
[14:40] the ultra plan version. And really the
[14:42] only requirement here is that you have
[14:44] to have it synced to some sort of repo
[14:45] so that cloud code with your web account
[14:48] can actually log in and look at your
[14:49] project before it starts planning things
[14:51] out. So I'm sure that this is going to
[14:53] evolve as more people use it, as more
[14:55] people start to give feedback about it.
[14:57] When I was testing it out, I did run
[14:59] into a few issues where I was getting
[15:00] this authentication error. I'm not sure
[15:02] if that was something internal or
[15:03] something I did wrong, but it just
[15:04] seemed to pop up randomly and then I'd
[15:06] run it again and it'd be fine. But it
[15:08] also seems like we'll start to get more
[15:09] clarity around how exactly this works
[15:11] soon, why it's so much better at
[15:13] executing, so much faster, and the fact
[15:15] that these are parallel exploration
[15:17] agents. So I'd be curious how they're
[15:19] prompted differently so they're not just
[15:20] duplicating work, or maybe they are,
[15:22] maybe that's the point. I don't
[15:23] assume that this is some sort of agent
[15:25] team that they can talk to each other
[15:26] and share a task list. And what I'd be
[15:28] curious to know is
[15:30] if we could get more visibility on how
[15:31] many tokens are actually being used in
[15:33] that plan. But yeah, it would be nice to
[15:34] be able to see, "Hey, the ultra plan is
[15:36] finished, and by the way, here's how
[15:37] many tokens it just ran." Anyways, that
[15:39] is going to do it for this one. So if
[15:40] you guys enjoyed the video or learned
[15:41] something new, please give it a like, it
[15:42] helps me out a ton. And as always, I
[15:44] appreciate you guys making it to the end
[15:45] of the video. I'll see you on the next
[15:46] one.
[15:47] Thanks, everyone.
