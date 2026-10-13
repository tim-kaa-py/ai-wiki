---
title: "The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX"
type: "youtube"
channel: "AI Engineer"
date: "2026-09-30"
resource: "https://www.youtube.com/watch?v=Se8jHLliLXE"
pillar: "ecosystem"
tags: [developer-productivity, metrics, dora, evaluation, strategy, code-review]
timestamp: "2026-10-13"
extraction_method: "whisper-local"
video_id: "Se8jHLliLXE"
duration: "19:09"
---

# The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX

## Extraction note

YouTube rate-limited caption download (HTTP 429) on 2026-10-13, so the transcript was produced locally with whisper.cpp (ggml-large-v3-turbo). Whisper renders the speaker's surname "Reock" as "Riach"; transcription errors are left as-is. The upload date is 2026-09-30, but the talk references a Q2 report due "mid-ish end of July", so it was likely recorded around June 2026.

## Transcript

[00:00] I'm Justin Riach. I'm the deputy CTO at DX. I get to do a lot of our research around developer experience and its relation to developer productivity.
[00:22] And certainly over the last year, a lot of that research has focused on AI's impact on the developer experience and basic aspects of productivity within an organization.
[00:33] So we produce these quarterly reports, our state of AI and AI impact reports, which looks at really a lot of raw data that we're able to get from our platform.
[00:42] Our platform is a research-backed platform built from the same folks who worked on DoraMetrics and the Space Framework and the DevEx Framework.
[00:51] And really at the end of the day, it's a data gathering platform that can look at a lot of different trends across an organization with, you know, how are we focusing on developer experience?
[00:59] Are we seeing outcomes and improvements with developer experience?
[01:02] And certainly are we seeing outcomes with the way that we're using AI in our workflows?
[01:08] This session is going to be a little bit different than the 345 session, I think, that's up in the leadership room later today, which just looks at the raw data from our newest report.
[01:18] It's a little bit of a preview. This is looking at more like organizational trends and how our workflows changing and things like that based on the data that we're seeing.
[01:25] So first things first, let's kind of look at what we're seeing in terms of the velocity impact.
[01:30] Now, if anybody's familiar with looking at various velocity metrics like PR throughput and deployment frequency, like hopefully you understand the caveat that these metrics are not perfect.
[01:39] They are proxy metrics for understanding the way that work flows through an organization.
[01:44] They're not fully representative of the value generation.
[01:47] We're going to look at some metrics that are closer to that as well.
[01:50] But let's just try to understand what this technology is doing in terms of just the raw velocity metrics in the organization.
[01:56] So here's our Dora metric for deployment frequency.
[01:59] Who's familiar with Dora metrics?
[02:01] All right. Most of you. Great.
[02:03] So this is one of the, you know, four key metrics that tries to understand directionally, you know, the speed of shipping work within an environment.
[02:12] And we're seeing it steadily increase.
[02:14] It's tapering off a little bit.
[02:17] I think there's reasons for that.
[02:19] Some of the surge that we saw early on was due to people shipping, you know, PRs more frequently and things like that.
[02:27] So we're seeing increases in this.
[02:30] This is one small part of the SDLC PDLC, right?
[02:33] This is like the creation of the PR to actually trying to deploy this into production.
[02:38] It doesn't tell us about revert rates.
[02:40] It doesn't tell us about defect ratios.
[02:42] It doesn't tell us about change failure rate.
[02:44] It just tells us about how much stuff are we now kind of pushing out into production.
[02:48] But, you know, the data is showing us that this number is steadily increasing.
[02:52] Okay.
[02:53] The trends vary a little bit across regions.
[02:57] We are seeing North America just sort of like trending up.
[03:01] We've seen Europe actually pull back a little bit just in the last quarter.
[03:05] I think, you know, there's a number of reasons for that.
[03:08] I mean, obviously the way work is done in these regions are differently.
[03:12] The way that we can spend money on this technology and think about token spend is different.
[03:15] The regulation is different.
[03:17] But if we just look at the through line in general, you know, we still see improvements in this one metric of deploy frequency, even across various regions.
[03:28] We do just see some variants in those regions.
[03:32] Here's one that's kind of interesting, though.
[03:34] The perceived rate of delivery.
[03:37] How much faster do engineers feel in terms of what they're delivering?
[03:42] It's gone up a little bit.
[03:44] This number shows an increase of about four and a half ish percent.
[03:49] But given that that's a full year and given all the investment and cost and new spend on AI, it's interesting that this perceived rate has not stayed, has not kind of crept up a little bit more.
[04:00] Especially when you look at some studies like obviously infamous flawed METR study, if you're familiar with that study.
[04:07] Back in February, they actually released a follow up to that study saying that some of the signals they gathered were sort of imperfect and they needed to rethink some of that.
[04:14] But what was interesting was that in these 16 engineers that were part of that study, small study, flawed study, the productivity went down by about 19%, but the perception went up by about 20%.
[04:25] So there was like a 40% spread in perception of productivity versus actual productivity.
[04:30] But here when we look at this on more of an aggregate, things interestingly stay sort of flat.
[04:35] All right.
[04:37] What about impact on quality and delivery?
[04:40] Right.
[04:41] So those are just kind of our speed, our velocity metrics.
[04:43] But what is this actually doing to our software quality?
[04:46] The first metric we'll look at here is the DORA change failure rate metric.
[04:51] And let me prepare you.
[04:53] Most of you are sitting down.
[04:54] It's very volatile, the impact that we've seen on quality over this period of time.
[04:58] Each line on this graph represents a single company that was part of this particular part of the study.
[05:05] And that line shows whether you've moved up in terms of your change failure rate or moved down in terms of your change failure rate.
[05:09] You want to go down.
[05:12] You want to be on the bottom side of this graph.
[05:15] But what's interesting is if you look at some of these top lines, you see people increasing as much as 2%, which doesn't sound like much until you realize that the industry benchmark is about 4%.
[05:24] So that means shipping potentially 50% more defects than we were shipping before.
[05:28] So you really just want to understand what side of this graph you're on.
[05:32] You want to start measuring this stuff, right?
[05:34] This pattern exists without AI, by the way.
[05:38] This has a lot to do.
[05:39] It's not purely causal with AI.
[05:40] A lot of this has to do with like your release pipeline, your automated testing, everything that's surrounding the way that you're releasing the code.
[05:46] The pattern remains the same.
[05:48] The amplitude has changed as a result of AI.
[05:51] We always see this type of shift in volatility, but not usually to these extremes.
[05:55] And that's the AI effect that we're seeing right there.
[05:57] Here's a really interesting one.
[06:00] These are two qualitative quality metrics that normally are sort of in sync with one another.
[06:07] Code maintainability, how maintainable do developers perceive the code to be in terms of making changes to it.
[06:13] That number has gone up almost 4% according to our data.
[06:17] By the way, we're looking at about 200,000 engineers in this study to gather this data.
[06:21] The change confidence though, which traditionally we've seen closely associated with code maintainability.
[06:30] Hey, this code is maintainable.
[06:31] It's modular.
[06:32] It's easy to modify.
[06:33] I feel good about the changes that I'm pushing into production.
[06:36] Nope.
[06:37] Our change confidence number has gone down 6%.
[06:40] This is really an interesting tension because it means like, okay, agents and assistants are making it easier for me to understand and modify the code that's in front of me.
[06:47] But I trust the outputs less.
[06:49] I'm more afraid now of breaking things than I was a year ago.
[06:54] So it's an interesting psychological effect that we see here.
[06:57] And a lot of this is because PR size is measurably increasing.
[07:00] This is going to be one of the most important metrics that we look at this year.
[07:03] Hasn't quite doubled, but look at that trajectory, right?
[07:07] This is over the same period of study, about a year.
[07:09] And we've seen PRs go from around 44 lines on average per PR up to 72.
[07:16] Now there's a number of reasons for this.
[07:19] It's not just, you know, the likelihood that the way that these models work is that they're being trained to output relatively mediocre code.
[07:26] I've been writing code professionally since the late 90s.
[07:28] I remember when it was a great mark of a developer to be able to implement the same use case with as little code as possible.
[07:33] Now it's like, well, no, let's get the thing out.
[07:36] And, you know, the code that's being generated is going to be essentially mediocre because it's law of averages.
[07:40] But on top of that, too, think about if you've got a build pipeline that takes 45 minutes or an hour to complete.
[07:46] And now I've got AI generating functions for me instantly.
[07:49] Am I going to push four different PRs with four different functions and wait 45 minutes or an hour or whatever that is for build?
[07:56] Or I'm just going to cram all that code into a single PR, right?
[07:59] So there's multiple reasons for this.
[08:01] But it really bears mentioning that, like, every extra line of code is a potential bug, a potential vulnerability.
[08:07] It's more to review.
[08:08] It makes the code less portable.
[08:09] So we need to pay attention to this metric as well.
[08:12] Because we're also seeing this associated with perception of incremental delivery.
[08:16] I get to work on small incremental changes.
[08:18] And this is actually one of the lowest qualitative developer experience drivers that we've seen impacted over the last year.
[08:24] This number and this sentiment has gone down 10%.
[08:28] And incremental delivery is, as we've learned, also very important for the way that we try to deliver in a way that's easy to roll back.
[08:37] And where we can understand and review the changes that are being pushed through.
[08:41] Okay.
[08:43] What about demographic differences?
[08:45] What is different about AI impacts across, like, you know, junior devs and stuff like that?
[08:50] Junior engineers are using AI the most.
[08:52] This really should surprise nobody.
[08:55] Anytime we have sort of a new leap, again, writing code professionally since the late 90s, I'm a bit of an OG.
[09:01] I'm on this journey too.
[09:02] But there's less to unlearn when you're coming into the industry, right?
[09:07] In many, many cases, you've already been working with this kind of stuff, like right out of school.
[09:11] And so you're more likely to implement it when you actually start working.
[09:16] Now, we've seen some other trends there too.
[09:19] We have interesting ways of looking per use case at efficiency, which I'll get into in the second talk later today.
[09:25] And one of those is looking at agent experience.
[09:28] Like literally we're asking agents about their experience working with humans.
[09:33] We're trying to figure out what use cases are they working on and how many tokens did they spend.
[09:38] And definitely we also see a trend where the more junior developers for the same use case will spend more tokens than a more senior developer on the same use case.
[09:46] And that's just a learning curve, right?
[09:47] Again, that should surprise nobody.
[09:49] But in terms of who's using it the most, we do see juniors using it the most.
[09:53] However, despite that additional use, we see staff plus some more senior engineers saving about the same amount of time, right?
[10:00] And burning less tokens.
[10:02] I want to make sure that that's kind of clear too.
[10:04] So in terms of like raw time savings and the aggregate output of this, it's pretty flat between junior engineers who are using the tech more and staff engineers who have an easier time spotting hallucinations, understanding the architecture around the changes they're making and things like that.
[10:18] Smaller companies lead in time savings.
[10:21] Sure, you know, the release pipelines are going to be less complicated.
[10:24] You know, there's less overall complexity in the organization that's going to lead to more time savings for a company that already has less friction and has a little bit more agility to it than a larger company.
[10:37] What about measurement?
[10:40] How should we even be thinking about measuring this stuff?
[10:43] I mean, it bears mentioning that measuring developer productivity and measuring developer experience was a challenge before AI.
[10:49] And we never completed that conversation before kind of throwing accelerant on this, right?
[10:55] So this is still a difficult thing.
[10:57] And I'd argue even more difficult to do now because it's confounded by several different aspects of AI.
[11:02] But we're all going to have to answer this question this year, right?
[11:06] Spent 10 million or way more if you come to my talk later today on tokens.
[11:11] Where's our 10x productivity?
[11:14] When we're thinking about this stuff, it's important to bear in mind that we don't throw away what we're measuring, right?
[11:20] Our foundational developer experience and developer productivity metrics are still what matter the most, right?
[11:26] We want to understand how AI is impacting these trusted metrics that we've already been looking at.
[11:32] Like we want to maybe look at cohorts of users.
[11:35] We maybe want to take data from the API telemetry and things that come out of the tools and use that to understand who's using what and where.
[11:43] But we would only want to use those cohorts and look at them comparatively across our foundational metrics.
[11:48] What is this actually doing to quality?
[11:50] What is this actually doing to speed?
[11:51] What is this doing to impact to the organization and value generation?
[11:55] And so this is where our AI measurement framework comes from.
[11:58] I won't spend too much time on this.
[12:00] We have a big white paper available.
[12:02] My colleague Anton, who's standing in the back of the room in the white shirt, will be able to hand out some hard copies of reports that we have after the talk that go into the way that we derive this methodology and how to use it and think about it.
[12:15] It focuses on three key dimensions of measurement.
[12:17] So looking at utilization, our daily active users, weekly active users, that sort of thing.
[12:22] It looks at impact.
[12:24] So which metric should we be looking for moving the needle based on utilization?
[12:28] As our utilization goes up, what do we hope to see in terms of impact to the business?
[12:33] And then cost.
[12:34] It's a fair joke that we're 15 years after the last major hype cycle and we're still trying to figure out cloud costs, but this stuff is getting pretty expensive.
[12:41] We're going to have to measure it.
[12:42] So you can think about this as a bit of a maturity curve as well.
[12:45] Most people start with utilization on the left, just figuring out what's happening in the organization with the tech.
[12:50] Who's using it?
[12:51] What are they using?
[12:52] How often and for what use cases?
[12:53] And then how do we then cross reference those to the impact metrics, the value generation?
[12:58] What we really want to understand to know whether these investments are actually working, which is what we really want to figure out.
[13:04] This is just an example of how we might correlate such a thing.
[13:07] So you could look at two separate cohorts of users and you could compare them across metrics like PR cycle time or PR size or pushback in review.
[13:16] Right.
[13:17] So lots of the way to think about this again is just right now separate cohorts and then look at how that plays out across these foundational productivity metrics that we've learned to trust.
[13:27] We also need to be able to understand our platforms readiness.
[13:31] I like to say that in 2024, we gave everybody a coding assistant in 2025.
[13:35] We started building agents.
[13:36] Now we're realizing that our infrastructure wasn't ready for any of this.
[13:39] A lot of the vendors that are here are selling solutions that help you with this problem.
[13:44] I think if you can measure your platform's AI readiness, you're going to have a much better handle on how efficient you're going to be spending tokens and providing context to these agents.
[13:53] So these are things like clear and accurate, well-structured documentation, data structures with straightforward relations, manageable modular code, reliable local CI and non flaky test suites.
[14:03] If, by the way, any of this sounds familiar to you, it's because we used to just call this good developer experience.
[14:09] But it turns out that what's good for humans is also good for agents.
[14:12] So we may finally paradoxically be making those investments that we should have been making over the last couple of decades.
[14:18] We also want to understand the effectiveness of the way that we work with AI.
[14:22] And this is one way of doing that.
[14:23] What you're actually seeing here is feedback, qualitative feedback coming back from agents telling us where they ran into issues with steering with the human, the context that was provided for them, the feedback cycles that they had to go through.
[14:36] So we're actually getting that data from the agents to try to figure out how effective our teams are at working with AI.
[14:42] And we can break this down into use cases, which is very important too.
[14:46] We want to understand which use cases are giving us the most efficient token spend.
[14:50] And again, moving the needle for value creation and productivity within the business.
[14:54] Finally, the fifth trend integrating across the SDLC and PDLC.
[14:59] Why would we want to do this?
[15:00] Because code generation was never the bottleneck in the first place.
[15:03] Right?
[15:04] Even if engineers are getting like 100% accurate instant code coming from the models, which they are not, you would still only be attacking anywhere from maybe 14 to 16% of the overall value stream.
[15:15] So we need to think beyond that, especially because right now the productivity gains that we are actually seeing are more modest than expected.
[15:22] Despite additional PR throughput increases, our median increase in the study that we did from November to 2024 to February this year only found about a median 7.7% increase in this velocity metric, a 13% average, but even our top performers were in the 70% range.
[15:40] Nobody hit 2x, nobody hit 5x, nobody hit 10x.
[15:44] And that's because our time savings that come out of AI are still being outweighed by other non AI factors within our organization.
[15:52] Right?
[15:53] We might be saving a lot of time with AI and that's great.
[15:55] But if we're still eclipsing those time savings because of meeting heavy days and context switching and other sources of interruption, the cumulative effects of the dev environment and friction in the way that we create software around the code, then we're not attacking the bottleneck.
[16:08] And as Ellie Goldratt from the theory of constraints and the goal and inspiration for the Phoenix project would tell us that an hour saved on something that isn't the bottleneck is worthless.
[16:18] And so we need to find the bottleneck and fix the bottleneck.
[16:21] And that's what a lot of organizations are doing.
[16:23] Morgan Stanley has been really public about their creation of the DevGen AI agent, which is an agent for interpreting legacy code like mainframe natural and COBOL and hate to admit Pearl.
[16:34] I've written a lot of Pearl in my career, but his legacy now the agent actually creates PRDs to hand to engineers to get rid of that reverse engineering step.
[16:44] And it's saving Morgan Stanley about 300,000 hours a year right now.
[16:47] Zapier is one of my favorite stories in AI right now.
[16:49] They have a whole agent ecosystem that they're using to deal with a lot of administrative tasks and overhead like daily stand ups and things like that.
[16:57] They've reduced their stand ups by using agent summaries and things like that in this ecosystem that they've built to two times a week as opposed to five times a week.
[17:05] They're successfully onboarding engineers within about a two week period, which is really fast.
[17:10] Our industry benchmark for that is over a month usually.
[17:13] But my favorite part about this story is that they're seeing about a 15% additional value creation per engineer.
[17:19] So they are hiring more than they have in the history of their entire company because they realize the truth here that they're getting more capacity per single engineer.
[17:27] They're getting a better return on investment per single engineer and hiring more engineers will improve their competitive edge.
[17:34] This is the right attitude.
[17:36] This is a throughput story.
[17:37] This is an increased innovative capacity story.
[17:39] This is not a headcount replacement story.
[17:41] Fair.
[17:42] They're automating about 3,000 of their code reviews a week triggered off of a pull request and they look at superficial stuff.
[17:50] They still need humans in the loop, but the initial superficial review that comes from the agent is all part of the system of record.
[17:57] It stays in the PR comments.
[17:58] And so the next engineer to actually perform the review will have an idea of what the agents already looked at.
[18:03] So it can save some time.
[18:05] Finally, Spotify, if anybody remembers the Spotify model from DevOps, they were sort of the north star for DevOps.
[18:11] They built an agent for SREs that will gather remediation steps from runbooks and information in context about the incident
[18:19] and put all that together into SRE communication channels so that when an incident occurs,
[18:24] the SRE has immediate context and doesn't have to go through multiple minutes of discovery to figure out how to solve the issue.
[18:31] So if you want to dive deeper into this data, our Q2 report is coming out in just a few weeks.
[18:36] But the Q1 report still has a lot of tidbits from this session in it.
[18:40] And if you subscribe to our newsletter or you come back to the website, by mid-ish end of July, we'll have our Q2 report.
[18:46] And if you want to see a preview of that report, that's the talk that I'm giving later this afternoon.
[18:50] Thanks, everybody, for your time. I appreciate it.
[18:52] get it.
