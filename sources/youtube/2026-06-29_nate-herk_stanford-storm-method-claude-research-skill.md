---
title: "Stanford's Method Turns Claude Into a PHD Level Research Team"
type: "youtube"
channel: "Nate Herk | AI Automation"
date: "2026-06-29"
resource: "https://www.youtube.com/watch?v=Tj3018n5MVg"
pillar: "building"
tags: [claude-code, agents, research, workflow, multi-agent, verification]
timestamp: "2026-07-25"
extraction_method: "auto-captions"
video_id: "Tj3018n5MVg"
duration: "12:05"
---

# Stanford's Method Turns Claude Into a PHD Level Research Team

[00:00] So Stanford has a research method called
[00:02] storm, which has actually been shown in
[00:03] peer-reviewed testing to produce
[00:05] articles 25% more organized than the
[00:07] next best method. So I put all of those
[00:09] storm principles into my own Claude
[00:11] skill, which I'm going to give you guys
[00:12] for completely free, and you end up with
[00:13] the result that looks like this. It is
[00:15] an HTML briefing that has been put
[00:16] together by five different perspectives
[00:18] of agents, and it has been verified.
[00:20] Meaning if I scroll down to the bottom,
[00:21] you can see that the different
[00:22] perspectives are giving analysis on each
[00:25] parts of the report. But at the very
[00:27] bottom, you can see that we have
[00:28] different sources that have been
[00:29] confirmed, corrected, or demoted.
[00:32] Meaning on the first pass, the briefing
[00:34] would have had information in here that
[00:36] just wasn't correct. But because our
[00:37] skill works in all this verification, on
[00:39] V2, we can have a lot more faith in this
[00:42] output. So the whole idea of storm is
[00:44] that instead of just shooting off one
[00:45] prompt and having one angle of research,
[00:48] we are utilizing a bunch of different
[00:50] angles. Because if you just send off one
[00:51] prompt to Claude, there's going to be a
[00:52] bunch of blind spots in that research
[00:54] plan. So storm utilizes these five
[00:56] perspectives. We've got a practitioner,
[00:58] an academic, a skeptic, an economist,
[01:01] and a historian. And each angle finds a
[01:03] hole that the other angles miss. And
[01:05] this whole idea of having different
[01:06] agents kind of like role-play their own
[01:08] personalities and their own, you know,
[01:10] backgrounds with different areas of
[01:11] expertise, is really, really beneficial.
[01:14] If you've seen other videos where I've
[01:15] talked about something like the roast
[01:16] skill, or how I like to use agent teams
[01:18] to basically be a council, it's really,
[01:20] really helpful to identify different
[01:22] perspectives and, like I said, find
[01:24] holes that the other angles are going to
[01:26] miss. And so let me just show you a real
[01:27] quick example of why that's so
[01:28] beneficial. So Claude code natively has
[01:31] a feature called deep research, which
[01:33] launched with the dynamic workflows. So
[01:35] if you come into Claude and you do a
[01:37] deep research command like this, you
[01:39] will basically be able to enter a
[01:40] research topic and it will spin up a
[01:41] dynamic workflow, which will kick off
[01:43] hundreds of agents in the background. I
[01:45] think in this example, there was 103
[01:47] different agents running. So this will
[01:48] give you a pretty solid deep research
[01:49] report. As you can see here at the
[01:51] bottom, it didn't actually give me any
[01:52] output, it just internalized all that.
[01:54] So I said, "Where's the report?" It gave
[01:55] me this markdown file, which is decent,
[01:57] but it's really not that thorough, and
[01:59] there's not as many sources as we'd
[02:00] like. There's only two up here, and then
[02:02] there's a few more unconfirmed down here
[02:04] at the bottom, as well as some open
[02:05] questions. And then I took this exact
[02:07] prompt that I asked in the deep
[02:08] research, and I put it into a Storm
[02:10] skill. So, I said, "Hey, Storm research,
[02:12] do this." And it said, "Okay, cool.
[02:14] Here's the topic. I'm going to run the
[02:16] Storm pipeline now. I ran these five
[02:18] agents." As you can see, the
[02:19] practitioner, the academic, the skeptic,
[02:21] the economist, and the historian were
[02:23] converging all of that stuff together,
[02:24] we're seeing where they disagree, and
[02:26] then we're going to run six more agents,
[02:27] which are going to verify all those
[02:28] facts that you just found.
[02:29] Verification's done, and now you have
[02:31] this HTML report, which is consistently
[02:33] going to look like this every time with
[02:35] a 60-second summary key findings. And
[02:37] all of these key findings are also
[02:38] ranked by reliability. You can see right
[02:40] here, reliability high, nine out of 10.
[02:43] This one was supported by the academic
[02:44] and the skeptic, and it was challenged
[02:46] by the practitioner and the economist.
[02:47] And it goes like this throughout the
[02:49] rest of the entire HTML report here. It
[02:51] also calls out the assumption that this
[02:53] briefing rests on and the missing six
[02:55] lens. All five lenses look at the firm
[02:57] from the owner's chair, adoption rates,
[02:59] productivity, ROI. None of them sat in
[03:01] the seat of the customer or the
[03:03] frontline employee. So, that's the
[03:04] missing sixth lens here, and I would
[03:06] then just say, "Okay, cool. Spin up that
[03:08] sixth lens, and run a V3 of this HTML
[03:11] report." And then it gives us really
[03:12] practical takeaways here. And what's
[03:14] cool about this is compared to something
[03:16] like the deep research, which is just
[03:17] going to basically give you a brain dump
[03:19] of a bunch of stats it found, the Storm
[03:21] research can really be tailored towards
[03:23] you. You can go into the skill and say,
[03:25] "Hey, here's what I'm doing. Here's my
[03:26] business. Here's what our goals are."
[03:27] Every time you run a Storm research
[03:29] report, make it tailored towards us, you
[03:31] know, what do we actually want to do
[03:33] differently now that you've understood
[03:34] all of this new data and research. And
[03:36] so, in this specific example with the
[03:38] deep research and the Storm, I put this
[03:40] into Codex, so a completely different AI
[03:41] model, and I said, "Hey, which one's
[03:43] better?" And it came back and said the
[03:45] HTML briefing is better. It's got better
[03:46] evidence quality, it's much stronger,
[03:48] it's got much stronger source diversity,
[03:50] it's got a much stronger thesis, It's
[03:52] more actionable. It's got better risk
[03:54] control, and it's better for video and
[03:57] content. So, in all six of these
[03:59] categories here, Codex thought that the
[04:01] HTML briefing was better, and I don't
[04:04] know the exact metrics here on cost, but
[04:06] the storm research was faster to run,
[04:09] and it was 100% cheaper because in this
[04:12] case we ran about What was this? Maybe
[04:13] 12 agents total, whereas the deep
[04:15] research report this time, this ran like
[04:17] over 100 agents. Maybe I should take a
[04:19] little easy on the steep research run
[04:20] because it did get hit by API rate
[04:22] limits, but that's also another point of
[04:24] like if you're going to spin up that
[04:25] many agents at one time, you might get
[04:27] rate limited. Whereas with the storm,
[04:28] you know it's always going to be your
[04:29] five personas. So, anyways, I think you
[04:31] guys now understand the value of this
[04:33] report. Let me show you real quick how
[04:35] this actually works and how to get the
[04:36] skill. So, there's basically four
[04:38] prompts. The first one is where we tell
[04:40] it to spin up the five different
[04:43] angles, right? We've got these five
[04:44] which I've talked about. That's prompt
[04:45] one. You would just enter in your
[04:47] research topic. And then when that comes
[04:49] back, you would enter in prompt two,
[04:50] which is the contradiction map. So, it's
[04:52] saying, "Hey, where do the perspectives
[04:54] contradict each other? Which one has
[04:56] good evidence? Which one has weak
[04:57] evidence?" And basically makes them
[04:58] analyze each other's outputs. And so,
[05:00] what we're doing here is we're basically
[05:01] just chaining together four prompts in a
[05:02] row, and then we're getting synthesis,
[05:04] and then we're getting the peer review.
[05:06] So, what I decided to do was I ran that
[05:07] on its own. It worked great. And I said,
[05:09] "Cool, package all of that into a skill
[05:11] so I can literally just give you a
[05:12] prompt, give you a topic, and you do
[05:14] that entire thing for me, and you're
[05:16] going to give me a consistent template
[05:19] so that every time I run this you're
[05:20] going to give me an HTML report that
[05:21] always looks like this." So, what that
[05:23] now looks like is in my dot Claude, I've
[05:25] got a bunch of skills as you can see.
[05:27] And if I go to my storm research skill
[05:29] and I open up the skill.md, this is what
[05:31] we've got. So, the storm research, it
[05:33] turns one topic into a verified
[05:35] multi-perspective HTML briefing. It
[05:36] simulates five expert lenses on the
[05:38] topic, maps where they contradict each
[05:40] other, synthesizes everything into a
[05:41] single self-contained HTML report, then
[05:43] adversarially peer reviews its own
[05:45] outputs, and verifies every citation
[05:47] against its primary source before
[05:49] delivering. You'll also notice that in
[05:51] the skill we have a report template
[05:52] HTML, so you guys I will also give you
[05:54] guys this for completely free. This is
[05:55] referenced in the skill and says, "Hey,
[05:57] once you find all the information, just
[05:58] put it in HTML and make sure it always
[06:00] looks like this." So, that's just for
[06:01] consistency on on my end, and I really
[06:03] enjoy that. So, I'm going to keep going
[06:05] down and explaining how this works, but
[06:06] if you guys do want to go ahead and grab
[06:07] these two resources, just head over to
[06:09] my free school community. The link for
[06:10] that is down in the description. All you
[06:12] have to do is get in here, click on
[06:13] classroom, and click on all YouTube
[06:15] resources, and you'll be able to find
[06:17] every single YouTube video and all of
[06:18] the resources that I've dropped
[06:20] associated with them. Once again, that's
[06:21] completely free to join. Once you have
[06:23] that skill, all you have to do is
[06:25] you can give that markdown file and the
[06:26] HTML file to Claude and say, "Hey,
[06:29] Claude, this is a skill called storm
[06:31] research. Put this in the .Claude
[06:32] folder, and then
[06:34] you're pretty much set up." And if you
[06:35] guys don't know what a skill is, it's
[06:36] basically just a prompt. This is
[06:37] basically just a master prompt that
[06:39] every time I say, "Hey, Claude, do storm
[06:41] research for me," it's going to invoke
[06:43] this skill, it's going to read the whole
[06:44] thing, and then just run it for you. So,
[06:46] it's very hands-off once you've
[06:47] basically installed them. And yes, this
[06:49] skill can work with codex or any other
[06:51] different type of agent you want. It's
[06:52] just that in Claude, it specifically has
[06:54] to be in the .Claude folder. But, you
[06:56] can see here I've got a folder called
[06:57] .codex or .agents, and you can put
[06:59] different skills in different types of
[07:01] folders based on the coding agent you're
[07:03] using. This currently is just a Claude
[07:05] code tutorial. So, anyways, from there,
[07:07] phase zero is to scope the topic.
[07:09] Sometimes, if you don't give it a
[07:10] specific enough topic, it will ask a few
[07:12] questions before it goes ahead and kicks
[07:14] off the storm. Then, it spins up the
[07:15] five expert lenses in parallel, and then
[07:18] we go into mapping the contradictions,
[07:20] synthesizing the report, and then the
[07:22] adversarial peer review verification,
[07:24] and that's where we get our output. So,
[07:26] let me just open up the Claude desktop
[07:27] app and start a new session here. And
[07:29] I'm just going to say,
[07:30] "Hey, Claude, please run a storm
[07:32] research for me on voice AI agents."
[07:35] And so, what you'll notice here is I
[07:37] didn't use a slash command, so it will
[07:38] still invoke the skill. And what you'll
[07:40] also notice is that
[07:42] this isn't very specific, so it might
[07:43] ask us some questions. Right here you
[07:44] can see it says, "Okay, running the
[07:45] skill storm research." So, that's how it
[07:47] went ahead and looks through storm
[07:48] research. And the argument that it's
[07:50] currently aware of is voice AI agents.
[07:53] It comes back and says, "Okay, so here's
[07:55] the topic, here is the reader." And it
[07:57] knows that I am an AI educator and I am
[07:59] deciding on potentially whether voice AI
[08:01] agents are worth a video or if it's just
[08:03] hype. So, the pipeline is now running.
[08:04] If I open up this, you can see it is
[08:06] going to kick off those five agents, the
[08:08] practitioner, the academic, the skeptic,
[08:10] and all of the other ones that we need.
[08:12] And what's really cool is you can click
[08:13] in and see what they're doing. So, if I
[08:15] click on the economist, for example,
[08:17] this is the prompt that our main session
[08:19] kicked off to this subagent. So, now we
[08:22] can see the subagent down here is
[08:23] browsing the web. It's using a tool.
[08:25] It's doing research. We can click on the
[08:27] academic. We can see this is the
[08:28] academic prompt. And once again, the
[08:30] academic subagent is, you know, doing
[08:32] all the stuff down here. Now, while this
[08:34] is running, let me quickly explain the
[08:35] difference between having subagents and
[08:39] having agent teams. So, subagents is
[08:41] basically where we have one main
[08:43] session. So, this session right here,
[08:45] this is Claude. This is who we're
[08:46] talking to. And all of these subagents
[08:48] are working for this main session. So,
[08:51] the main session talks to these five,
[08:52] but these five cannot talk to each
[08:54] other. And that is an important
[08:55] distinction because that's what you
[08:57] actually have in the agent team world.
[08:59] You can spin up teams of agents or
[09:00] councils of agents that can not only
[09:02] talk to your main session, but they can
[09:03] also talk to each other. And that's
[09:05] really cool because what I like to do is
[09:07] I like to spin up agent teams when I
[09:08] need help deciding on certain ideas or
[09:10] topics. And I'll have them not only do
[09:12] research for me, but then I'll have them
[09:14] debate with each other. So, they'll
[09:15] literally argue with each other until
[09:17] they reach some sort of consensus. Agent
[09:19] teams are much more expensive than
[09:20] subagents though. So, important
[09:22] distinction. I'll bring more videos on
[09:23] agent teams later, but if you do want to
[09:25] check out a deep dive, check out this
[09:26] video that I've tagged right up here.
[09:28] And also, if you want to check out
[09:30] another video where I've deep dived even
[09:31] more on subagents, then you can check
[09:32] out this video right up here. Now, you
[09:34] can see all of these subagents ran on
[09:36] Opus 4.8. If you don't want to do that,
[09:38] you don't have to. You can have all of
[09:39] these sub-agents run on Haiku or Sonnet
[09:41] if you like. But in this case, I liked
[09:43] for them to run on Opus. But all five
[09:45] lenses are in, so now it's going to go
[09:46] ahead and look at the contradictions. So
[09:49] you can see it's reading that file,
[09:50] which is the report template. It's
[09:51] running these agents in the background,
[09:53] and now it's going to start verifying
[09:54] all of those different citations and
[09:56] stats and the different things that our
[09:58] initial passive agents had come up with.
[10:00] Also, I know in this video I have
[10:02] switched between the Claude desktop app
[10:04] a little bit with VS Code. If you guys
[10:06] have been watching me for a while, you
[10:07] know that I typically do like to do most
[10:08] of my work in VS Code. Um Claude
[10:11] basically works the exact same way in
[10:12] both. It's just a difference of UI,
[10:14] really. But the reason I chose to show
[10:16] some of this video today in the desktop
[10:17] app is because I thought it's cool to
[10:19] show the actual agents running in here.
[10:22] But you can see that our report has come
[10:23] back, so let me actually just open this
[10:24] up in a browser. You can see this is the
[10:27] V2 version, so everything has been
[10:28] verified. If I scroll all the way to the
[10:29] bottom, you can see the sources were
[10:31] either demoted, corrected, or confirmed,
[10:33] so that is great. We've got our
[10:35] 60-second summary. We've got our key
[10:36] findings, which obviously once again are
[10:38] ranked by reliability. So what I would
[10:39] recommend for you guys to do is go grab
[10:41] the skill, put it into your own Claude,
[10:44] and play with it a little bit. Make it a
[10:45] little bit more tailored towards you.
[10:46] Maybe you can play with the HTML report
[10:48] if you want it to look a certain way.
[10:50] But then do it on a topic that you do
[10:52] know a lot about and that's important to
[10:53] you in your business. And then just read
[10:54] through it and see where you need to
[10:56] improve it or change it up a little bit.
[10:58] And maybe you even want to add a sixth
[11:00] lens or a seventh lens. Maybe for me and
[11:02] my workflow, it would be helpful to add
[11:03] like a beginner in AI because that's a
[11:06] lot of people that we're teaching our
[11:07] beginners in AI. Or maybe it would be
[11:08] good for me to add to the skill a
[11:10] content creator or something like that.
[11:12] So I guess the reason why I'm saying
[11:13] that is because I think what you should
[11:14] take away overall from the video is,
[11:16] yes, go grab the Storm skill and test it
[11:18] out, but it's also less about this
[11:21] specific skill and this specific
[11:23] Stanford method being the best for
[11:24] everybody, but I think the theories that
[11:27] you can pull out of it like the idea
[11:28] that the more perspectives you have
[11:30] doing research and contradicting each
[11:32] other, the better and more holistic
[11:35] research you're actually going to get.
[11:36] Basically, just the whole idea of if you
[11:38] don't have subject matter expertise, see
[11:39] if you can borrow it in some way. See if
[11:41] you can go ahead and kill your own blind
[11:43] spots, find the gaps in your knowledge,
[11:45] and go use agents to create little
[11:47] experts all over so that you've got this
[11:48] council of agents that have different
[11:51] expertise and different knowledge that
[11:52] that have your back, no matter what
[11:54] you're doing. So, I know this was a
[11:55] quick one today, but hopefully you guys
[11:56] enjoyed it or you learned something new.
[11:58] If you did, please give it a like. It
[11:59] helps me out a ton. And as always, I
[12:01] appreciate you guys made it to the end
[12:02] of the video, and I'll see you on the
[12:03] next one.
[12:04] Thanks, guys.
