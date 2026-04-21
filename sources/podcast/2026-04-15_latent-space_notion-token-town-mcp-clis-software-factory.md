---
title: "Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future"
source_type: "podcast"
channel: "Latent Space: The AI Engineer Podcast"
date: "2026-04-15"
url: "https://podcasts.apple.com/de/podcast/latent-space-the-ai-engineer-podcast/id1674008350?l=en-GB&i=1000761419695"
canonical_url: "https://www.latent.space/p/notion"
youtube_url: "https://www.youtube.com/watch?v=ATt7QJgt-2k"
pillar: "ecosystem"
tags: [agents, mcp, notion, tool-use, architecture, building, ecosystem, software-factory]
ingested: "2026-04-20"
extraction_method: "auto-captions"
duration: "1:17:00"
guests: ["Sarah Sachs", "Simon Last"]
---

[0:00:00] Broadly speaking, I'm really bullish on
[0:00:01] CLIs. I'm still bullish on MCPS in in a
[0:00:05] certain environment. I think in in
[0:00:06] particular, MCP is really great for when
[0:00:07] you want sort of like a narrow
[0:00:08] lightweight agent.
[0:00:10] >> I think there's there's definitely a lot
[0:00:11] of use cases where where you don't want
[0:00:12] like a full coding agent with a compute
[0:00:15] runtime and also you want it to be like
[0:00:18] more tightly permissioned. MCP
[0:00:19] inherently has a really strong
[0:00:20] permission model. Like all you can do is
[0:00:22] call the tools. MCP is just like the
[0:00:24] dumb simple thing that works and it it's
[0:00:26] pretty good. Notion is dedicated to
[0:00:27] being the best system of record for
[0:00:29] where people do their enterprise work.
[0:00:30] So we will always support our MCP in so
[0:00:32] far as other people are using MCPs,
[0:00:34] right? So regardless of our perspective,
[0:00:37] we've put a lot of effort into our MCP
[0:00:39] and we have a fantastic team that we're
[0:00:41] building.
[0:00:42] >> Before we get into today's episode, I
[0:00:44] just have a small message for listeners.
[0:00:46] Thank you. We would not be able to bring
[0:00:48] you the AI engineering, science, and
[0:00:50] entertainment content that you so
[0:00:51] clearly want if you didn't choose to
[0:00:53] also click in and tune into our content.
[0:00:55] We've been approached by sponsors on an
[0:00:57] almost daily basis. But fortunately,
[0:00:59] enough of you actually subscribe to us
[0:01:01] to keep all this sustainable without ads
[0:01:03] and we want to keep it that way. But I
[0:01:06] just have one favor to ask all of you.
[0:01:08] The single most powerful, completely
[0:01:10] free thing you can do is to click that
[0:01:12] subscribe button. It's the only thing
[0:01:13] I'll ever ask of you. And it means
[0:01:15] absolutely everything to me and my team
[0:01:18] that works so hard to bring the Inspace
[0:01:20] to you each and every week. If you do
[0:01:22] it, I promise you we'll never stop
[0:01:24] working to make the show even better.
[0:01:26] Now, let's get into it.
[0:01:32] Hey everyone, welcome to the Lady in
[0:01:34] Space podcast. This is Allesio, founder
[0:01:36] of Colonel Labs, and I'm joined by
[0:01:37] Swixs, editor of Elen Space.
[0:01:39] >> Hello. Hello. We're back in the
[0:01:40] beautiful studio that Allesio has set up
[0:01:42] for us with Simon and Sarah from Notion.
[0:01:45] Welcome.
[0:01:46] >> Thanks for having us.
[0:01:46] >> Thanks for having us. Yeah,
[0:01:48] >> congrats on the launch recently. Custom
[0:01:50] agents. Finally, it's here.
[0:01:53] >> How's it feel?
[0:01:54] >> We ship things slowly. So, it had been
[0:01:56] in alpha for a little bit and at the
[0:01:58] point at which is it's in alpha. Um,
[0:02:01] there's a group of people that are
[0:02:02] making sure it's ready for prod and then
[0:02:04] there's a group of people working on the
[0:02:06] next thing. So, sometimes some of these
[0:02:07] launches are a bit delayed satisfaction.
[0:02:09] So, it's quite nice to remind yourself
[0:02:11] all the work you did because we do have
[0:02:13] a habit of like being two or three
[0:02:15] milestones ahead just because you have
[0:02:17] to be, you know, you can't get
[0:02:18] complacent. Um, but it's been great that
[0:02:21] people understood how this is helpful.
[0:02:24] And I think that's just easier in
[0:02:26] general building AI tools today than it
[0:02:28] was two, three years ago. People kind of
[0:02:29] get it. And so that user education um
[0:02:32] there's just it was our most successful
[0:02:33] launch in terms of free trials and
[0:02:35] converting people and things like that.
[0:02:37] It was really successful. So yeah, but
[0:02:38] there's a lot to build.
[0:02:40] >> Making it free for 3 months helps.
[0:02:43] Yeah,
[0:02:44] >> it was definitely super exciting for me
[0:02:46] because it's probably the fourth or
[0:02:48] fifth time that we rebuilt that.
[0:02:50] >> Yes.
[0:02:51] >> And I mean,
[0:02:52] >> you've been building this since like
[0:02:53] 2022.
[0:02:54] >> Yeah. I mean, like it was even right
[0:02:57] when we got access to like GPG4 in late
[0:02:59] 2022. One of the first ideas we had is
[0:03:01] like, oh, okay, let's make an agent that
[0:03:03] we use the word assistant at the time.
[0:03:04] There wasn't really the word the word
[0:03:05] word agent yet, but oh, we'll give it
[0:03:07] access to all the tools that notion can
[0:03:09] do and then it will run in the
[0:03:09] background like like do work for us. And
[0:03:11] then we just tried that many times and
[0:03:13] it just was too early. Um
[0:03:16] >> I need to force you to like double click
[0:03:18] on that. What is too early? What didn't
[0:03:19] work?
[0:03:20] >> We were find like before function
[0:03:21] calling came out, we were trying to
[0:03:22] fine-tune with the Frontier Labs and
[0:03:25] with Fireworks like a function calling
[0:03:27] model on notion functions. This is right
[0:03:30] when I joined. I joined because um we
[0:03:32] needed a manager. Simon was needed to be
[0:03:34] able to go on vacation. So uh that's
[0:03:36] that's around when I joined. So you can
[0:03:38] speak much more to it. Yeah, we did
[0:03:39] partnerships at both enthropic and open
[0:03:41] AAI at different times uh to try to at
[0:03:44] the time the I mean when we first tried
[0:03:46] there wasn't even a concept of like
[0:03:48] tools yet. We we sort of designed our
[0:03:50] own like like tool calling framework and
[0:03:53] then we tried to fine-tune the models to
[0:03:55] to use it over multiple turns. Um and
[0:03:59] because it it didn't work well out of
[0:04:00] the box I think. Yeah, the models are
[0:04:02] just too dumb and the context length was
[0:04:03] also way too short. Yeah.
[0:04:05] >> Um and yeah, we just kind of banged our
[0:04:07] head against it for a long time. Uh
[0:04:10] unfortunately, it was always like there
[0:04:12] was always like sort of glimmers that it
[0:04:14] was working, but um it never felt quite
[0:04:17] robust enough to be like a useful,
[0:04:19] delightful thing. Um until I would say
[0:04:22] uh the big unlock was probably like
[0:04:24] Sonic 3.6 or 7 uh early last year and
[0:04:27] that's when we started working on our
[0:04:29] agent, which we shipped last year. Um
[0:04:31] and then and then uh uh custom agents
[0:04:35] kind of a similar capability and that
[0:04:36] that one just took longer because we we
[0:04:39] just wanted to get the reliability up a
[0:04:40] lot higher because it's actually running
[0:04:41] in the background
[0:04:42] >> and the product interface of like
[0:04:44] permissions and understanding you know
[0:04:45] this custom agent is shared in a slack
[0:04:47] channel with X group of people and has
[0:04:49] access to documents that are surfaced to
[0:04:51] Y group of people and the intersect of X
[0:04:53] versus Y might not be whole and so how
[0:04:55] do you build the product around making
[0:04:57] sure administrators understand that
[0:04:59] permissioning took multiple swings.
[0:05:02] >> Everything is our back at the end of the
[0:05:04] day. Yeah. I'm curious like when the
[0:05:07] models are not working, how do you
[0:05:09] inform the product road map of like,
[0:05:10] okay, we should probably build expecting
[0:05:12] the models to be better at some
[0:05:13] reasonable pace, but at the same time,
[0:05:15] we need to, you know, you had a lot of
[0:05:17] customers in 2022. It's not like you
[0:05:19] were a new company with like no user
[0:05:21] base.
[0:05:21] >> Yeah. I mean, I think there's always the
[0:05:23] balance of, you know, like you want to
[0:05:25] be AGI pled and thinking ahead and
[0:05:27] building for where things are going. Uh
[0:05:29] but also you want to be like shipping
[0:05:31] useful things and so we always try to
[0:05:33] like like keep a balance there. You
[0:05:34] know, we we try to take like a portfolio
[0:05:37] approach. You know, we're always working
[0:05:38] on multiple projects and and we're
[0:05:40] always trying to work on, you know,
[0:05:42] maintaining things where they've already
[0:05:43] shipped like like shipping new things
[0:05:45] that are like eminently working well and
[0:05:47] make them really good and and then we
[0:05:49] want to always have a few projects that
[0:05:50] are a little bit crazy. And
[0:05:51] >> yeah, what are the AGIP projects that
[0:05:53] you have today? I'm curious what you
[0:05:55] don't have to share exactly what you're
[0:05:57] working on, but I'm curious what are
[0:05:58] things today that maybe in 18 months
[0:05:59] people will be like, "Oh, obviously this
[0:06:02] was gonna work."
[0:06:02] >> 18 months.
[0:06:04] >> Yeah.
[0:06:04] >> 18 months is, you know,
[0:06:05] >> it's a long time. And yeah.
[0:06:07] >> Yeah. I mean, there's a number of things
[0:06:08] happening. I think one thing that's
[0:06:10] becoming more clear is I think like like
[0:06:12] coding agents are the colonel DGI sort
[0:06:14] of everything is a coding agent. I think
[0:06:16] that's
[0:06:17] >> that's sort of one one direction. Um,
[0:06:20] and then yeah, the exciting thing about
[0:06:21] that is sort of your agent can sort of
[0:06:23] bootstrap its own software and
[0:06:24] capabilities and actually debug and
[0:06:26] maintain them. And so, yeah, we're we're
[0:06:28] we're thinking a lot about that. And
[0:06:30] then, yeah, like like another category
[0:06:32] of things that I'm really excited about
[0:06:34] is like uh we call the software factory.
[0:06:36] Lots of people are using this this this
[0:06:38] sort of word. Um, basically just means
[0:06:40] can you create sort of like a as
[0:06:43] automated as possible a workflow for
[0:06:46] developing,
[0:06:48] debugging,
[0:06:49] >> merging, reviewing, and maintaining a
[0:06:51] codebase and a service where there's a
[0:06:53] bunch of agents working together inside
[0:06:54] and like like how does that work?
[0:06:56] >> If you think back to your initial
[0:06:57] question like why did this take so long?
[0:06:59] I think something notions
[0:07:00] >> I didn't say that but yes. Okay, go
[0:07:02] ahead.
[0:07:02] >> Why what what changed over the three and
[0:07:04] a half years of trying it,
[0:07:05] >> right? Because most people always say
[0:07:07] like it didn't work yet, then reasoning
[0:07:08] models came, then it worked. I was like,
[0:07:10] okay, let's go a little bit.
[0:07:11] >> I mean, that's part of it, but I think
[0:07:12] the other part of it that I actually
[0:07:14] think is really what will set notion
[0:07:17] apart for every new capability is we
[0:07:20] have like two skills that are crucial
[0:07:23] when it comes to frontier capabilities.
[0:07:24] One is not letting yourself swim
[0:07:26] upstream. So like quickly realizing if
[0:07:28] you're just pressing against model
[0:07:30] capabilities versus not exposing the
[0:07:32] model to the right information, not
[0:07:33] having the right infrastructure set up.
[0:07:35] That in of itself is a skill of
[0:07:36] intuition. And then the second is to see
[0:07:38] okay you're not swimming upstream. Which
[0:07:39] direction is the river flowing? And what
[0:07:42] is like how do we think ahead about the
[0:07:43] product and start building it even if
[0:07:44] it's not great yet so that when it is
[0:07:46] there we're ready for it, right? And
[0:07:48] like those can sometimes feel like
[0:07:50] counterintuitive things like we can be
[0:07:51] trying to fine-tune a tool calling model
[0:07:53] when they don't exist yet. And the the
[0:07:55] trick is to not do that for too long,
[0:07:56] but realize that there was something
[0:07:57] there. And we've had a lot of things
[0:07:59] which like um were just like not
[0:08:01] swimming in the right direction with the
[0:08:02] streams. I think we had multiple
[0:08:04] versions of transcription before we got
[0:08:05] meeting notes, right?
[0:08:06] >> Oh, I got to talk about that. Yeah.
[0:08:08] >> Yeah. Um and so I I think that like we
[0:08:11] we really closely partner with the
[0:08:13] Frontier Labs on capabilities and we
[0:08:16] also have to have strong conviction on
[0:08:18] as those capabilities move. Notion is
[0:08:20] about being the best place for you to
[0:08:22] collaborate and do your work. And how
[0:08:23] does that narrative change if the way
[0:08:24] that we work changes?
[0:08:26] >> Yeah. Yeah. You told me you were a fan
[0:08:27] of the agent lab thesis and this is this
[0:08:29] is kind of it. Right.
[0:08:30] >> Right. I show that thesis to so many
[0:08:32] candidates. Like I have it as like my
[0:08:34] Chrome autofill um at this point. Like
[0:08:36] it's one of my most visited.
[0:08:37] >> Like is this the here's why you should
[0:08:39] work in notion and not open your eye.
[0:08:42] >> Here's here's what's different about it
[0:08:44] >> and here's why it's not just a rapper. I
[0:08:46] actually think more and more people
[0:08:48] understand it's not just a rapper. Yeah.
[0:08:49] >> Um, and by the way, like in the
[0:08:51] beginning, parts of what we build are
[0:08:52] rappers on functionality that works
[0:08:54] well, but that's not really the most um
[0:08:56] I would say that's not the product that
[0:08:57] that drives revenue and that's not
[0:08:59] necessarily always what users need.
[0:09:02] >> I mean, you know, notion is the AWS
[0:09:04] rapper, but like the the rapper is very
[0:09:06] beautiful and like very well polished.
[0:09:08] >> So like the like
[0:09:09] >> the analogy that I've been coming back
[0:09:11] to is data dog in AWS. Yeah.
[0:09:13] >> So, uh data dog could not exist without
[0:09:15] cloud storage,
[0:09:16] >> right? that it's kind of fundamental
[0:09:19] that that works. Um, and AWS has like a
[0:09:21] cloudatch product, but Data Dog is an
[0:09:24] expert on understanding how people want
[0:09:26] observability on the products they
[0:09:27] launch. And we're experts on
[0:09:28] understanding how people want to
[0:09:29] collaborate and that's really where our
[0:09:31] expertise lies.
[0:09:32] >> Totally.
[0:09:32] >> Um, regardless of the tools that we use,
[0:09:34] >> I'm kind of curious how you think about
[0:09:36] implicit versus explicit expertise. I
[0:09:38] feel like data dog is half and half
[0:09:41] implicit and explicit. It's like they
[0:09:43] understand across markets and industries
[0:09:45] what engineering teams usually look for.
[0:09:48] With notion, it's almost like more of
[0:09:49] the expertise is at the edge because you
[0:09:52] as a platform you're like so horizontal
[0:09:54] that the end user is not really the
[0:09:56] same. Like with data dog, the end user
[0:09:58] is always like an engineering lead like
[0:10:00] SR related person. With notion it can be
[0:10:03] anything. So I'm curious how you put
[0:10:05] that expertise into a product versus you
[0:10:08] know obviously AWS cannot build notion.
[0:10:11] that doesn't quite work in this case,
[0:10:12] but
[0:10:12] >> it's it's a little bit differently
[0:10:13] shaped. I think you know a classic
[0:10:16] vertical SAS like like data dog is kind
[0:10:17] of like that. They understand their
[0:10:19] individual customer very deeply. It's
[0:10:20] kind of a narrow slice. Um notion has
[0:10:22] always been super horizontal and our our
[0:10:25] task has always been to sort of balance
[0:10:28] these two somewhat opposing forces of
[0:10:30] like we're listening to our customers
[0:10:31] and what they want us to build. It's a
[0:10:33] broad slice. And then also we're
[0:10:35] thinking about like okay, how do we
[0:10:37] decompose what they want into nice
[0:10:39] primitives that are that are really nice
[0:10:40] to use and will will get us like as much
[0:10:43] bang for the buck as possible and then
[0:10:45] you know maintain the whole system make
[0:10:47] it all like like super clean and nice to
[0:10:49] use.
[0:10:50] >> We still have easier journeys. I mean we
[0:10:52] still focus on like core I actually
[0:10:54] think the failure of our team is when we
[0:10:56] focus too much on what are tools that
[0:10:58] are what are tools that are cool tools.
[0:11:00] I actually think that's when we make
[0:11:02] have the least velocity because you
[0:11:04] still need some sort of focus on a user
[0:11:06] journey. So like for instance, we'll all
[0:11:09] sit down every Friday and look at the
[0:11:11] P99 of like the most token exhaustive
[0:11:13] custom agent transcript and just look at
[0:11:15] why it didn't do well and cut a bunch of
[0:11:17] tasks. Like we still focus on like this
[0:11:19] has like this should work. Email
[0:11:21] triaging should work, right? And
[0:11:23] similarly like when we're talking about
[0:11:25] before building um chatting um before we
[0:11:28] started filming about okay how can I do
[0:11:30] PDF export well that's functionality
[0:11:33] that then merits maybe we should build a
[0:11:34] tool that has access to a computer
[0:11:36] sandbox and a file system and the
[0:11:38] ability to write code right um but it's
[0:11:40] because we're thinking about the fact
[0:11:42] that our users to do their to do their
[0:11:44] daily work need to export PDF's not
[0:11:46] because we're like I think a computer
[0:11:48] tool could be cool like let's just see
[0:11:50] what happens like we we have to focus on
[0:11:52] some user journeys otherwise we just
[0:11:53] don't have like enough strategy to to
[0:11:56] prioritize.
[0:11:57] >> I think there's a lot of like really
[0:11:58] strong opinions that you've had. Do you
[0:12:00] have like sort of like a towel of Sarah
[0:12:02] Saxs like you know like what how do you
[0:12:04] run your team like I feel like you just
[0:12:06] have accumulated all these strong
[0:12:07] opinions. Obviously part part of this is
[0:12:09] your your token town thing.
[0:12:11] >> I think the to working with Sax is um
[0:12:14] you'd have to it depends who you ask. Um
[0:12:17] I think it depends if you're on my team
[0:12:19] or a partner right or a vendor. Yeah,
[0:12:22] there other people want to run their
[0:12:23] teams the way that you're you're
[0:12:25] bringing these things. And then also
[0:12:26] similarly, uh, Simon, when you did the
[0:12:28] custom agents demo, you had like, well,
[0:12:29] we've been using custom agents and
[0:12:30] here's the super long list of everything
[0:12:32] that we do. No humans ever read it,
[0:12:33] right? That's what you said. I was like,
[0:12:35] >> yeah. So, I think for for me, um,
[0:12:38] something that I learned very quickly
[0:12:39] and became very comfortable with was
[0:12:41] that my job was not to be the ideas p
[0:12:43] person or the technical expert. My job
[0:12:46] was to make it so that everybody
[0:12:47] understood the objective, had a resource
[0:12:49] to help prioritize what they should work
[0:12:50] on, and had an avenue to prioritize what
[0:12:52] they thought was important. And I think
[0:12:55] it's true with all leadership, but I
[0:12:57] think especially on the AI team, almost
[0:12:59] all of our best ideas come from
[0:13:01] prototypes from people that have a cool
[0:13:03] idea because they saw a user problem.
[0:13:05] And it's a huge disservice if all of
[0:13:07] those ideas have to pass like the sniff
[0:13:09] test of what me and a product partner or
[0:13:12] Simon and Ivan decided were the
[0:13:13] direction, right? because a lot of what
[0:13:15] we're doing is leaning into
[0:13:16] capabilities. So I think that's the
[0:13:18] first thing is like I don't really view
[0:13:21] like the role of engineering leadership
[0:13:22] as like uh hierarchical nor has it ever
[0:13:25] been but especially now like very
[0:13:27] willing to change direction based on um
[0:13:31] like proof is in the pudding and like
[0:13:33] and I think we have rebuilt our harness
[0:13:35] three or four times and when you do that
[0:13:38] then the second rule of engineering
[0:13:39] leadership is like you need to build a
[0:13:41] team that's comfortable deleting their
[0:13:42] own code and is very low ego and is
[0:13:45] driven by what's best for the and um
[0:13:47] doesn't write design docs because they
[0:13:49] think it's their promotion packet,
[0:13:50] right? And that's a culture that notion
[0:13:52] had long before I joined. But like our
[0:13:54] willingness to just swarm on different
[0:13:56] problems and um redo things that we've
[0:13:59] built before because something has
[0:14:00] changed like there's a lot of friction
[0:14:02] that can happen at companies when you do
[0:14:04] that and it doesn't happen at notion and
[0:14:05] because it doesn't happen when new
[0:14:06] people join like they don't want to be
[0:14:08] the ones that are saying we shouldn't do
[0:14:09] this. I wrote that code. So then it's,
[0:14:11] you know, you create a culture that
[0:14:12] everyone adopts and that culture comes
[0:14:13] directly, I think, from Simon and Ivan
[0:14:15] though, um, because they're very
[0:14:16] open-minded.
[0:14:18] >> Anything you you'd add?
[0:14:19] >> I'm not a manager like like like Sarah
[0:14:21] is. Um, a lot of my role is really to
[0:14:23] try to think a little bit ahead, make
[0:14:25] sure that we're we're building on the
[0:14:27] right capabilities and then like the
[0:14:29] prototyping stuff. And yeah, it's really
[0:14:32] really critical to always just be
[0:14:33] starting again. It's like, okay, this is
[0:14:35] new thing. What does this mean? What if
[0:14:37] we just rethought everything, rewrote
[0:14:40] everything? Hence, I I'm basically just
[0:14:42] doing that in a loop every six months.
[0:14:44] >> Yeah. Do you believe in internal
[0:14:45] hackathons for this stuff?
[0:14:47] >> I think there's like two different
[0:14:48] versions. So, one is like we just have a
[0:14:51] a a solid bench of senior engineers that
[0:14:54] come and go on what we call the Simon
[0:14:56] vortex and productionizing what we
[0:14:58] built, right? Cuz when you're in the
[0:15:00] Simon vortex, the velocity is super
[0:15:01] high. The direction changes daily. And
[0:15:04] it's meant to be like the equivalent of
[0:15:06] a skorks lab. We don't need to do
[0:15:07] hackathons for that. We need to have
[0:15:09] senior engineers that we trust to come
[0:15:10] in and out of those projects. For
[0:15:12] instance, like management boundaries are
[0:15:13] really loose. Like you report to him,
[0:15:15] but you work for her right now. Like
[0:15:16] that is something that when we hire
[0:15:18] managers, it's important they don't care
[0:15:19] about because we tend to form more
[0:15:21] structures.
[0:15:22] >> Yeah. Don't be too territorial.
[0:15:23] >> We form or structures after we ship
[0:15:25] things, not not before, just
[0:15:27] historically. Um the second thing is we
[0:15:29] do have companywide hackathons.
[0:15:30] Actually, we just had our demos day for
[0:15:32] the hackathon we had last week this
[0:15:33] morning. That's more for people that
[0:15:35] aren't directly working on the project
[0:15:37] feeling like they have the time to pause
[0:15:40] and learn how to make themselves more
[0:15:41] productive or how they would use notion
[0:15:43] custom agents to build something or part
[0:15:45] of the hackathon was actually
[0:15:46] encouraging everyone across the company
[0:15:47] to build their own agentic tool loop
[0:15:49] calling from scratch following like an
[0:15:51] every blog post on how to do it. I think
[0:15:53] because we want
[0:15:54] >> is that the compound engineering one?
[0:15:55] >> Yeah, we want everyone to use cloud code
[0:15:58] in the company or whatever the coding
[0:15:59] agent they please and understand that
[0:16:02] fundamental. So we set aside a day and a
[0:16:04] half where all leadership encourage
[0:16:07] everyone on their teams across the
[0:16:08] company to do it. So we have hackathons
[0:16:09] like that. I would say like kind of
[0:16:12] facitiously like everything we build is
[0:16:14] a little bit like a hackathon until it
[0:16:15] graduates and puts on big boy pants and
[0:16:17] has a product ops roll out later and has
[0:16:19] a assigned data scientist and stuff like
[0:16:21] that. But
[0:16:22] >> security review enterprise stuff.
[0:16:24] Actually, security review is one of the
[0:16:25] things that we bring in first because it
[0:16:27] just slows us down way more and um
[0:16:29] causes a lot of tension and they build
[0:16:31] better product if they're involved
[0:16:32] early. So, um that is probably the first
[0:16:35] person to get involved in something.
[0:16:36] >> The right PR approved answer.
[0:16:38] >> No, but it's not just PR approved. It's
[0:16:40] like
[0:16:41] >> it's actually real. It's actually real.
[0:16:42] >> It's like dark tissue.
[0:16:43] >> Yeah. because like you know my
[0:16:45] background is also I worked at Robin
[0:16:47] Hood for a number of years. So like uh
[0:16:49] compliance and things like that um are a
[0:16:51] little bit more you learn the hard way
[0:16:53] when it doesn't come naturally.
[0:16:54] >> Yeah. I think the the hackathon is
[0:16:57] really important for uplifting the
[0:16:58] general population but like if that's
[0:17:00] the only way you can build new things
[0:17:01] you're kind of toast. I mean it it has
[0:17:03] to be like the daily processes like you
[0:17:05] know building these new things. Um, and
[0:17:07] it has to be about I think like I think
[0:17:10] in the AI era a lot more leverage
[0:17:13] accumulates to the most curious and
[0:17:15] excited people. And so it's like we're
[0:17:18] all about just like activating that
[0:17:19] energy, you know, like if someone's
[0:17:20] proming something on the weekend that
[0:17:21] they're excited about and it's
[0:17:23] important. That should be the main thing
[0:17:24] that we're doing. Um,
[0:17:26] >> it's not a hackathon that we schedule
[0:17:27] once a quarter. It's just like daily
[0:17:29] >> process. It's part of the culture.
[0:17:30] >> Yeah. I mean, that's how we shipped
[0:17:31] image generation in notion now. It was
[0:17:33] always this thing that would be kind of
[0:17:34] nice to have, but it wasn't really clear
[0:17:36] where that was necessarily aligned in
[0:17:38] product priorities. It'd be a lot of
[0:17:39] work. And we had someone on the database
[0:17:41] collections team, Jimmy, who was like, I
[0:17:44] really want to do image generation for
[0:17:46] cover photos and inside notion. And
[0:17:48] we're like, if you want to build it,
[0:17:49] like it's do it, please. Like, we
[0:17:51] encourage you. We gave him all the
[0:17:52] resources of working directly with
[0:17:54] Gemini and being able to like track the
[0:17:56] token usage and it working through our
[0:17:58] endpoints. We gave him email support,
[0:17:59] everything. And then it became a full a
[0:18:01] full project. Yeah,
[0:18:03] >> that's why you can't have like ego as a
[0:18:05] a leader. Like that's that's how we
[0:18:06] work.
[0:18:07] >> What's the size of the team today? Both
[0:18:09] engineering and overall.
[0:18:11] >> I manage uh the team that's what we'll
[0:18:13] call like core AI capabilities and
[0:18:15] infrastructure. That's about 50 people.
[0:18:17] But then we have part I partner teams
[0:18:20] that do packaging. So how it shows up in
[0:18:23] the corner chat versus custom agents
[0:18:24] versus meeting notes that's another 30
[0:18:27] 40 people. And then every team that has
[0:18:30] a product service at notion that a user
[0:18:32] can interface with owns the tool that
[0:18:33] the agent interfaces with. The editor
[0:18:35] team, the team that did CRDT for offline
[0:18:38] mode is the same team that handles how
[0:18:40] two agents um edit competing blocks,
[0:18:44] >> right? It's the same problem. The team
[0:18:45] that built the underlying SQL engine is
[0:18:47] the same team that owns how the agent
[0:18:49] ask it to run a SQL query and it does it
[0:18:50] performantly. And so from that regard,
[0:18:53] anyone working on product engineering is
[0:18:55] tasked with making them work for
[0:18:57] customers that are humans and agents
[0:18:59] because over time the majority of our
[0:19:01] traffic will be coming from agents using
[0:19:02] our interface, not humans. And so our
[0:19:05] objective is to make it so that the
[0:19:06] whole product or is building for agents.
[0:19:08] >> Yeah. How has it changed internally? The
[0:19:11] activation bar is kind of lowered a lot
[0:19:13] like anybody can kind of create a
[0:19:14] prototype very somewhat easily
[0:19:16] especially if you're like in an existing
[0:19:18] codebase. Have you raised the bar on
[0:19:21] like what type of prototype people need
[0:19:22] to bring forward to gonna be taken not
[0:19:25] like seriously but like you know what I
[0:19:26] mean? Yeah, I think the bar is lowered
[0:19:28] in many ways. Like one thing that uh
[0:19:31] that our team built that was really cool
[0:19:33] is our uh our our design team made a
[0:19:35] whole separate GitHub repo called the
[0:19:37] the design playground and it's basically
[0:19:39] just they created a bunch of like like
[0:19:41] helper components and you uh for for
[0:19:43] quickly throwing together UIs and it's
[0:19:45] become like actually quite sophisticated
[0:19:46] like it has like an Asian in there and
[0:19:48] like uh that's pretty fun. So like we
[0:19:50] pretty much like they don't do mocks
[0:19:52] they just make like like full full
[0:19:54] prototypes.
[0:19:54] >> Here it is. It works. they give you like
[0:19:56] a URL. They're like, "Okay, all right.
[0:19:57] So, we have to make like the real
[0:19:58] production version of that." Um, and
[0:20:00] then for engineers, a prototype looks
[0:20:03] like just making it a feature flag that
[0:20:05] actually works. Like that's sort of the
[0:20:06] bar.
[0:20:07] >> Something to understand that's really
[0:20:08] unique about notion, one of the reasons
[0:20:09] I joined, we're super lucky, is no one
[0:20:11] uses notion in their job as much as
[0:20:13] people that work at Notion,
[0:20:14] >> of course.
[0:20:15] >> So, I think there's very few companies,
[0:20:16] maybe if you worked on Chrome, I guess,
[0:20:18] but like everything that we ship, we
[0:20:21] ship internally first and get a lot of
[0:20:23] really quick feedback. And also
[0:20:24] sometimes our dev instance is totally
[0:20:26] borked and you have to change a bunch of
[0:20:27] flags to get things done and that's kind
[0:20:29] of like but everyone so people that do
[0:20:31] it ticketing people that do supply chain
[0:20:33] procurement recruiting everyone is using
[0:20:35] the same instance of notion with like a
[0:20:37] lot of flags on for these prototypes
[0:20:39] people build and so we have this Brian
[0:20:42] Leven one of the designers on our team I
[0:20:43] think evangelized this concept of demos
[0:20:45] over memos
[0:20:47] >> um which has been uh very good for
[0:20:51] building demos and I think it's put a
[0:20:53] big pressure point on us to have really
[0:20:54] strong product conviction because if
[0:20:58] anything can be demoed, you really need
[0:21:00] a strong filter of making sure that if
[0:21:02] you know you're doing X amount of work,
[0:21:03] you're making the you're you're focusing
[0:21:05] on one tower. You're not just building a
[0:21:07] really flat hill, right? That's actually
[0:21:10] where I think there has to be more
[0:21:11] conviction from our PMs um and our
[0:21:14] designers and and well the company
[0:21:16] really to have conviction of what
[0:21:18] journey we're going on.
[0:21:20] >> But overall, I feel like it works pretty
[0:21:21] well. like people almost all the
[0:21:23] engineers have good enough taste to
[0:21:26] realize that like this prototype doesn't
[0:21:28] actually make sense in the product or or
[0:21:30] it does. So it's not that common that I
[0:21:32] would see a prototype it's like oh this
[0:21:33] makes no sense. It's like you know
[0:21:35] >> people are doing reasonable things and
[0:21:37] and and then it's just a matter of which
[0:21:39] things we build first and then often
[0:21:41] just just figure out how to turn it on
[0:21:42] and off. There's our in the in our like
[0:21:45] experimental chat UI there's this
[0:21:47] there's probably like like a hundred
[0:21:49] check boxes in there. It kills me.
[0:21:51] >> You could turn on and off.
[0:21:53] >> But I think that Okay, so that is kind
[0:21:55] of true, Simon. But like being the
[0:21:57] person that manages the eval team, like
[0:21:59] there is a level of intensity that it
[0:22:01] adds to the platform team. So you know,
[0:22:04] if we're going to do image generation in
[0:22:06] notion, all of a sudden the way that we
[0:22:07] do attachments and the way that we um
[0:22:10] are LLM completion like Cortex talks and
[0:22:14] expects tokens back and now it's getting
[0:22:16] images back. Like there's a lot of
[0:22:17] platform work that we do need to like
[0:22:18] solidify a little bit. So sometimes
[0:22:20] it'll be in dev for a couple weeks
[0:22:23] before it makes it to prod just because
[0:22:25] we still have to like make it robust,
[0:22:27] make it HIPPA compliant, ZDR compliant,
[0:22:29] figure out the right contracting with
[0:22:30] the vendor, whatever it is. And we need
[0:22:33] to eval because we want the team to
[0:22:35] still maintain what they build. That's
[0:22:37] the one thing is like if we have a bunch
[0:22:38] of prototypes, it can't just be like a
[0:22:40] small group of people that then maintain
[0:22:41] whatever in prototype. So we have
[0:22:44] invested a lot of people in an eval and
[0:22:47] model behavior understanding teams that
[0:22:49] we call it agent dev velocity. So your
[0:22:52] dev velocity building agents can be
[0:22:53] faster if we invest in that platform.
[0:22:56] And so we have a whole org dedicated to
[0:22:58] agent um platform velocity so that you
[0:23:01] can build your own eval and then
[0:23:02] maintain it once you ship a so if a new
[0:23:04] model release comes out and we have
[0:23:06] >> every team maintains their own eval.
[0:23:07] >> We maintain the eval framework. Every
[0:23:09] team owns their own evals and a lot of
[0:23:10] them we've integrated to opt into CI or
[0:23:13] we run them nightly and we have a team
[0:23:15] uh a custom agent that triggers to a
[0:23:17] team to look at the major failures.
[0:23:19] That's really critical because if we
[0:23:21] have like all these different services
[0:23:23] now a lot of it's on the same agent
[0:23:24] harness. So it's easier to maintain.
[0:23:26] It's just packaging of different agent
[0:23:28] harnesses but new functionality of the
[0:23:30] agent. Let's say that like we want to
[0:23:32] update like uh you know they deprecated
[0:23:35] sonnet um four or whatever it is and we
[0:23:38] need to auto update
[0:23:39] >> already. That's so okay. Yeah. It wasn't
[0:23:41] that long ago or just 3.5.
[0:23:43] >> 3.5 37 just got deprecated. 37 5.2 or
[0:23:47] Yeah.
[0:23:48] >> No 5.2.
[0:23:50] >> Yeah. No 54 is 40% more expensive than
[0:23:53] 52. So if they deprecated 52, you would
[0:23:56] hear
[0:23:57] >> you would hear from me about that one.
[0:23:59] Um but uh another conversation to have
[0:24:03] >> I have a cheeky evals question for you.
[0:24:05] Have you noticed any secret degradation
[0:24:06] from any of the major model providers?
[0:24:08] >> Secret degradation
[0:24:10] >> like during the war when it's high
[0:24:12] traffic it suddenly gets dumber.
[0:24:15] >> Yeah I mean not just between the I mean
[0:24:18] we definitely noticed flakiness. We've
[0:24:19] definitely noticed particularly for some
[0:24:21] providers that things are slower during
[0:24:23] working hours and
[0:24:25] >> but that's a latency argument not a
[0:24:26] quality argument. No, I think the
[0:24:28] quality difference that's interesting is
[0:24:30] um even though companies that say
[0:24:32] they're selling the same it's related
[0:24:34] into like quantiz quantization, but like
[0:24:37] >> companies that say they're selling the
[0:24:38] same model through different vendors,
[0:24:39] whether it be through first party or
[0:24:41] Bedrock, Azure, etc. We do see different
[0:24:44] qualities sometimes and that's not
[0:24:46] necessarily what's advertised.
[0:24:49] >> Yeah. Kney went to the point of like we
[0:24:51] they shipped like this like eval across
[0:24:53] all the providers and it was like very
[0:24:54] obvious who was secretly quantizing and
[0:24:56] it was
[0:24:56] >> yeah but that's you know um we hire
[0:24:59] subprocessors to figure that out for us.
[0:25:01] So we just want to understand where it's
[0:25:03] regressing or where it's optimized and
[0:25:05] sometimes we're okay with regressions
[0:25:06] that optimize latency if they're the
[0:25:08] appropriate regressions. Our job is to
[0:25:10] make sure we have the eval to understand
[0:25:12] the changes that are important to us.
[0:25:14] And even like when we're partnering with
[0:25:16] labs on pre-releases of models, they'll
[0:25:18] send us multiple snapshots. And this is
[0:25:20] less about quantization but more just
[0:25:22] regressions. Like they have shipped
[0:25:24] models that were not the snapshots that
[0:25:25] we wanted. And they have changed the
[0:25:28] snapshots that they shipped based on the
[0:25:29] feedback that we give because our
[0:25:31] feedback tends to be more enterprise
[0:25:32] work focused and not coding agent
[0:25:34] focused. And definitely those can be
[0:25:36] bummer like you know oh we know that
[0:25:38] this wasn't the version you wanted but
[0:25:40] we'll help you make it work. I mean, we
[0:25:42] always make it work, but that definitely
[0:25:43] happens.
[0:25:44] >> Yeah. Do you have um failing emails that
[0:25:47] you're just hoping that we'll have
[0:25:49] success eventually when a good model
[0:25:51] comes out?
[0:25:52] >> I mean, yeah. So, I think I mean, I
[0:25:54] could talk about this for 60 minutes, so
[0:25:56] I will limit myself. I think it's a real
[0:25:59] issue when people say evals and it's
[0:26:02] just like that's quality. That's like
[0:26:03] unit I mean it's like saying testing.
[0:26:04] It's not just unit tests, right? So,
[0:26:07] >> we have the equivalent of unit tests,
[0:26:08] regression tests, those live in CI.
[0:26:10] Those have to pass a certain percent you
[0:26:12] know within some stocastic error rate.
[0:26:14] Then we have as you're building a
[0:26:16] product eval of these aren't passing
[0:26:18] right now and this is launch quality. So
[0:26:20] we have a report card and we need to on
[0:26:22] these categories you know be at 80 or
[0:26:24] 90% of all of these user journeys to
[0:26:27] launch and then what we have what we
[0:26:28] call frontier or headroom eval where we
[0:26:30] actively want to be at 30% pass rate and
[0:26:33] that's actually been a effort that we
[0:26:35] took in partnership with enthropic and
[0:26:37] open AI in the past maybe two or 3
[0:26:39] months because we actually hit a point
[0:26:41] where our evals were saturated and we
[0:26:44] weren't able to really give insightful
[0:26:45] feedback other than it wasn't worse and
[0:26:47] not only is that not helpful for our
[0:26:48] partners it's not helpful for us to
[0:26:50] understand where the stream is going.
[0:26:52] You know, going back to that analogy.
[0:26:54] And so we spent a lot of time thinking
[0:26:55] about what notion's last exam looks
[0:26:57] like, right? Not just humanity's last
[0:26:59] exam, Notion's last exam. And um there's
[0:27:02] a lot of, you know, dreams about what
[0:27:04] that would look like. I know we've
[0:27:05] talked a lot about benchmarking um Swix,
[0:27:08] but
[0:27:09] >> uh yeah, Notion's last exam is a big
[0:27:11] thing inside the company, and we have
[0:27:12] people full-time staffed to it
[0:27:14] exclusively. We have a data scientist, a
[0:27:16] model behavior engineer, and an
[0:27:18] full-time um evals engineer just
[0:27:20] dedicated to the evals that we pass 30%
[0:27:23] of the time.
[0:27:23] >> What you're hiring for MBEs?
[0:27:25] >> I am hiring.
[0:27:26] >> What is an MBE?
[0:27:27] >> A model behavior engineer. Model
[0:27:29] behavior engineers started with a title
[0:27:32] data specialist before I joined when
[0:27:33] they were working with Simon on like uh
[0:27:35] Google Sheets and like Simon just needed
[0:27:38] someone to look through Google Sheets
[0:27:39] and say yes, no, this looks bad, this
[0:27:40] looks good. Right? And so we hired
[0:27:42] people with kind of diverse linguistics
[0:27:43] background. We had like a linguistics
[0:27:45] PhD dropout and a Stanford complate new
[0:27:47] grad
[0:27:48] >> and they're amazing and they formed a
[0:27:50] new function basically and over time
[0:27:52] we've built a whole team um with a
[0:27:54] manager who's now kind of reinventing
[0:27:56] what that role is with coding agents. So
[0:27:59] they used to be kind of manually
[0:28:01] inspecting code. Now they're primarily
[0:28:03] building agents that can write evals for
[0:28:05] themselves or LLM judges. There's a
[0:28:08] really funny day I can send you the
[0:28:10] picture where Simon about a year and a
[0:28:11] half ago was teaching them how to use
[0:28:12] GitHub. um and they're on the whiteboard
[0:28:15] and it was like okay I think we'd be so
[0:28:16] much faster if our data specialists
[0:28:17] learned how to use GitHub and like
[0:28:19] learned how to commit these things into
[0:28:21] code and and that was then and now I
[0:28:22] think you know coding has been a lot
[0:28:24] more accessible um but moving forward
[0:28:27] it's this mix of like data scientist PM
[0:28:29] and prompt engineer because there's
[0:28:31] craft in understanding like even like
[0:28:34] what models can and can't do things how
[0:28:36] do we define like that headroom how do
[0:28:38] we define like what a good journey is um
[0:28:40] is this model better or not why is this
[0:28:42] failing there's some qualitative work,
[0:28:44] but then there's also like a lot of
[0:28:45] instinct and taste to it and that's not
[0:28:47] necessarily software engineering and so
[0:28:49] we have like very firm conviction and we
[0:28:52] have had for a number of years now that
[0:28:53] that is its own career path and we have
[0:28:56] always welcomed the misfits so to speak.
[0:28:58] So we really firmly believe that you
[0:28:59] don't need an engineering background to
[0:29:01] be the best at this job and that's
[0:29:02] what's quite unique about this
[0:29:04] particular role. This is something that
[0:29:05] I've been pretty excited about recently
[0:29:07] is we made an effort basically to treat
[0:29:09] the eval system as like an agent
[0:29:12] harness. So if you think about it like
[0:29:14] you know you should be able to have an
[0:29:15] agent end to end download a data set run
[0:29:19] an eval iterate on a failure debug and
[0:29:22] and then implement a fix and ultimately
[0:29:24] you should be able to you know drive the
[0:29:26] full end tom process with a human sort
[0:29:27] of observing the you know the outer uh
[0:29:30] system. So yeah we went pretty hard on
[0:29:33] that. That's worked extremely well so
[0:29:35] far. It's like basically just to turn it
[0:29:36] into a coding agent problem.
[0:29:39] >> Your coding agent or just whatever
[0:29:42] agent.
[0:29:43] >> It should be totally general. Yeah. I
[0:29:44] think it would be a mistake to like like
[0:29:45] fix it on any particular coding agent.
[0:29:47] At the end of the day, it's just like
[0:29:48] CLI tools.
[0:29:49] >> It's like the same way that you would
[0:29:50] have a coding agent write the unit test,
[0:29:52] you should have a coding agent write the
[0:29:53] eval.
[0:29:54] >> Yeah.
[0:29:54] >> But there's a lot of supervision in that
[0:29:55] still. We just don't believe that
[0:29:57] supervision has to come from software
[0:29:58] engineers because a lot of it is like um
[0:30:01] kind of UXRE and whatever. And these are
[0:30:03] the people that also triage failures and
[0:30:06] tell us where we should be investing
[0:30:07] next.
[0:30:08] >> Yeah. I'm going to go ahead and ask a
[0:30:10] spicy question. Is there a day there are
[0:30:11] no software engineers at Notion?
[0:30:13] >> Um,
[0:30:14] >> what does it mean to be a software
[0:30:15] engineer?
[0:30:15] >> Exactly.
[0:30:16] >> I mean, I think the way things are going
[0:30:17] is like we're on some continuum where if
[0:30:20] if you look back 3 years ago, humans
[0:30:22] were typing all the code and then we had
[0:30:24] autocomplete. You're typing a little
[0:30:26] less of the code. we had sort of like
[0:30:27] filling agents filling lines and now
[0:30:29] we're getting into like agents doing
[0:30:31] longer range tasks where you can debug
[0:30:33] and implement a fix and then verify it
[0:30:35] works and you know get your get your PR
[0:30:37] even like like merge and deployed. I
[0:30:39] think we're sort of just moving up the
[0:30:41] abstraction ladder and then the human
[0:30:43] role becomes more about observing and
[0:30:46] maintaining the outer system. There's a
[0:30:47] stream of agents flowing through like
[0:30:50] merging PRs what's going off the rails
[0:30:52] like what do I need to approve? Is there
[0:30:53] like a learning or memory mechanism that
[0:30:55] that works? So it's kind of a hard
[0:30:57] engineering problem. There's a, you
[0:30:58] know, there's a lot to do there. I think
[0:31:00] we're just sort of moving up the stack.
[0:31:02] >> The same transition machine learning
[0:31:03] engineers have made, right? Like I
[0:31:05] haven't looked at a PR curve in a while.
[0:31:07] >> Yeah. You used to do this stuff and now
[0:31:09] auto research can do it,
[0:31:10] >> right? Like I think it depends on what
[0:31:12] you define as a software engineer.
[0:31:14] >> Yes, that's changing for sure. I think
[0:31:17] every software engineer at Notion this
[0:31:19] summer went through like this um shear
[0:31:22] um one of our engineering leads at the
[0:31:24] company called it like every software
[0:31:25] engineer is going through the the
[0:31:28] identity crisis that every manager goes
[0:31:29] through where all of a sudden they
[0:31:31] realize their ability to write code is
[0:31:32] less important than their ability to
[0:31:34] delegate and context switch and I think
[0:31:36] that is a transition out of being a
[0:31:38] software engineer but
[0:31:40] >> yeah there's a critical difference to
[0:31:42] being a manager which is that like It is
[0:31:46] actually very deeply technical. The
[0:31:49] problem of you know humans are very like
[0:31:50] like like fuzzy and you you can't like
[0:31:53] treat a team of humans like a like a
[0:31:55] rigorous system where like you know PRs
[0:31:58] like like flow through and can be in
[0:31:59] like a blocked status and then what
[0:32:00] happens when they're blocked right
[0:32:02] >> with a set of agents you actually can do
[0:32:03] that and and I think it's actually
[0:32:05] there's a lot of interesting technical
[0:32:06] rigor that that goes into that. It's a
[0:32:08] it's a technical design problem
[0:32:09] ultimately.
[0:32:10] >> What is the design of the software
[0:32:12] factory that you're building? Yeah, I
[0:32:14] mean I think we're trying a lot of
[0:32:16] different things. I mean ultimately you
[0:32:19] want to design a system that requires as
[0:32:23] little human intervention as possible
[0:32:25] but like still maintaining the
[0:32:27] invariance that that you care about. So
[0:32:29] yeah, we're exploring a lot of different
[0:32:30] ideas there. I mean I think I can talk
[0:32:32] about like a few things I think are
[0:32:33] important there. Like one thing I think
[0:32:35] is really important is um having some
[0:32:37] kind of like specification layer. You
[0:32:41] can just commit markdown files. That
[0:32:42] works pretty well. It's nice to be
[0:32:44] notion man. I'm just saying like the
[0:32:46] spec like the natural home for specs is
[0:32:49] notion.
[0:32:49] >> Yeah. Right.
[0:32:50] >> It can be a database of pages. Yeah. I
[0:32:52] mean it needs to be something that is
[0:32:54] you know human readable and and viewable
[0:32:57] and I think that's pretty key. Another
[0:32:58] really key component is like the the
[0:33:00] self- verification loop. You need a
[0:33:02] really really good testing layers
[0:33:04] basically. And that's a really deep uh
[0:33:07] problem, but but getting that right, you
[0:33:08] know, and then and then it's kind of
[0:33:10] like the workflow of like what happens
[0:33:12] when there's a bug, how does it flow
[0:33:14] into the system? Like is it like a sub
[0:33:15] agent working on it? How does it make a
[0:33:17] PR and how does that get reviewed and
[0:33:19] merge and then you know, so there's like
[0:33:22] the the flow or process.
[0:33:24] >> Yeah. Cool. Uh you know, one thing we
[0:33:25] did work out before you guys came in was
[0:33:27] this demo or this
[0:33:29] >> agents
[0:33:30] >> agent demo.
[0:33:31] So every every time we do an episode, we
[0:33:34] tried a product, right? I don't think
[0:33:35] there's ever been an episode that I
[0:33:37] haven't tried. Um when try try is a a
[0:33:40] big word like since day one lane space
[0:33:42] has been on notion but this is the this
[0:33:45] is the net new thing. Yes.
[0:33:46] >> So this is for kernel labs which is the
[0:33:48] space we're in. So next week we're
[0:33:50] opening applications for tenants. So
[0:33:52] there's a web form. Let me we got this
[0:33:54] form done here. Uh so before the
[0:33:59] workflow would be I get an email then I
[0:34:01] look at the person was like I should
[0:34:02] have spent time talking to this person
[0:34:03] then I respond they respond back so I
[0:34:05] build this. So the name it came up for
[0:34:07] on its own. Can you maybe how do how
[0:34:09] does it come up with its own name?
[0:34:11] >> Yeah that's a pretty apt name. It's it's
[0:34:13] just a random it's a random name
[0:34:15] generator.
[0:34:15] >> Oh okay that's funny. It just came
[0:34:17] >> the fact that it picked that is is kind
[0:34:18] of hilarious.
[0:34:20] I I'm pretty sure it's just
[0:34:21] >> resilient collector. I I think I've
[0:34:24] never looked at the code for that. I've
[0:34:25] never second guessed it. I think it's
[0:34:26] kind of like a Mad Libs situation.
[0:34:28] >> Yeah, it's it's totally a deterministic.
[0:34:30] >> Oh, I I thought it was great.
[0:34:32] >> Although although when the if you use
[0:34:34] the AI to set itself up, it can update
[0:34:36] its own name. So,
[0:34:37] >> okay.
[0:34:38] >> Um,
[0:34:38] >> how did you create it? Did you just do
[0:34:40] class?
[0:34:41] >> Okay,
[0:34:41] >> I did. Yeah, I'll say just check my
[0:34:43] inbox for applications or co-working
[0:34:45] space keep people. So, it created a
[0:34:47] database for me which I have here and I
[0:34:50] guess database is like a notion table
[0:34:52] because everything is notion. Um, and
[0:34:54] then whenever an email comes in like
[0:34:57] here, it just creates a new row for the
[0:34:59] person and then it uses web search to
[0:35:02] enrich the the profile. So, it kind of
[0:35:05] like searches the web and it's like this
[0:35:07] is who this person is. This is when they
[0:35:09] want to move in and kind of updates
[0:35:11] everything else. This is I mean it's not
[0:35:14] AGI, but to me I don't want to do this
[0:35:16] work. So, it feels like I mean it took
[0:35:19] me maybe like 15 minutes to set up the
[0:35:21] whole thing. Um, and I really like that
[0:35:24] most of the information should live
[0:35:26] here, you know? It's not like some other
[0:35:28] tool asking me,
[0:35:29] >> yeah,
[0:35:29] >> to like bring my stuff there. It's like
[0:35:31] I would have probably already created an
[0:35:33] ocean thing.
[0:35:34] >> So,
[0:35:34] >> most of our biggest use cases and gains
[0:35:37] are from that extra layer of human
[0:35:40] involvement in the process to make it
[0:35:42] so, right? And so, like one of our
[0:35:44] biggest use cases is bug triaging. So if
[0:35:46] someone posts something in Slack, can
[0:35:47] you just have a custom agent that lives
[0:35:48] there that has its own routing
[0:35:51] constitution of what team this belongs
[0:35:52] to, creates a task in your task
[0:35:54] database, and then posts in that Slack
[0:35:56] channel, right? Like that's like one of
[0:35:58] the first things that we built
[0:35:59] internally, I think. And it's completely
[0:36:01] changed the way that notion functions as
[0:36:03] a company. Nothing falls through well,
[0:36:05] most things don't fall through the
[0:36:06] crack. We don't know what we don't know.
[0:36:07] But it's not replacing people, it's
[0:36:10] replacing processes.
[0:36:12] >> Yeah.
[0:36:12] >> Right. And I'm curious how you think
[0:36:14] about composibility of these things. So
[0:36:16] the other one I was working on is like a
[0:36:19] piece filler. So whenever somebody signs
[0:36:22] up as a tenant, kind of fills out the
[0:36:23] lease for them. There should probably be
[0:36:25] some agent that is like office manager
[0:36:27] agent that can handle the request, make
[0:36:29] the lease, and then uh give them a
[0:36:31] verata access to the office and all of
[0:36:33] that. How do you think about that
[0:36:35] feature?
[0:36:35] >> Yeah. So I mean there's there's two ways
[0:36:37] you can compose. One way is by using
[0:36:40] like the data primitives. So you can,
[0:36:42] you know, you could give you have one
[0:36:44] agent uh be writing to the database and
[0:36:46] there's another agent that's walking the
[0:36:48] database. So that's that's one way that
[0:36:50] they can coordinate that's like a little
[0:36:51] bit more decoupled and
[0:36:52] >> works really well. Or you you can couple
[0:36:54] them. So I I think it's actually not
[0:36:56] released yet releasing it like next week
[0:36:57] is uh in the settings for an agent you
[0:36:59] can give access to invoke any other
[0:37:01] agent.
[0:37:02] >> So you can have them just just uh talk
[0:37:04] directly. So is there a limit on like
[0:37:06] number of recursions or just
[0:37:08] >> um probably you know what I mean like
[0:37:11] you can just get an infinite loop that
[0:37:12] way
[0:37:13] >> some kind of yeah
[0:37:14] >> I think it's there is actually a number
[0:37:16] somewhere I believe
[0:37:17] >> I'm just you know like someone's going
[0:37:19] to screw it up
[0:37:19] >> you should you should try it and see
[0:37:21] >> I mean everything's going to be paper
[0:37:22] clips so
[0:37:23] >> yeah but uh but but that's really useful
[0:37:25] yeah so you know like I just I I helped
[0:37:28] uh someone internally the other day they
[0:37:30] had they had built like over 30 custom
[0:37:32] agents for for our go to market team
[0:37:34] doing all kinds of different things, you
[0:37:36] know, for example, like researching, you
[0:37:38] know, like like filling information
[0:37:39] about about a customer or like like
[0:37:40] triaging customer feedback or like
[0:37:42] something like that. Literally over 30
[0:37:44] of them. And and then and then he made
[0:37:45] like a database of all the agents. And
[0:37:47] then he was like, "Okay." And and now
[0:37:49] I'm getting 70 over 70 notifications per
[0:37:51] day with just the agents are blocked on
[0:37:53] various things. Uh and then I was like,
[0:37:56] "Oh, okay, cool." You know, the obvious
[0:37:58] thing to do there is to make a manager
[0:37:59] agent,
[0:38:00] >> right? that's going to sort of be
[0:38:02] another abstraction layer in between
[0:38:03] your your 30 agents. Uh so yeah, we we
[0:38:07] set them up with like a manager agent
[0:38:08] and then has access to invoke all the
[0:38:09] other agents and it's sort of like like
[0:38:10] watching and observing them and then it
[0:38:12] sort of yeah just creates a layer of
[0:38:14] abstraction. So instead of 70
[0:38:16] notifications per day, it's like like
[0:38:17] five and then and then the manager agent
[0:38:19] can help like debug and fix any any
[0:38:21] problems with the
[0:38:22] >> this is a concept like an inbox or
[0:38:24] something like you're basically saying
[0:38:26] that they can message each other. Well,
[0:38:28] they use a system of record which is
[0:38:30] notion.
[0:38:31] >> Yes, we actually Yeah, we didn't make
[0:38:32] any special concepts at all. They're
[0:38:34] interested notifications that I would
[0:38:36] have got.
[0:38:37] >> They can just like write a task to a
[0:38:38] database that the other agents tasked to
[0:38:40] listening to or they can actually call a
[0:38:42] web hook up to the agent like they can
[0:38:43] just at the agent.
[0:38:44] >> Okay. Yeah. I mean, this is something
[0:38:45] that that we're still working on. I
[0:38:47] think we you know like like generally
[0:38:49] generally the way we do these things is
[0:38:50] you know you first make it possible
[0:38:52] maybe like a sort of janky way. So I I I
[0:38:54] think the way I set him up is like, you
[0:38:55] know, we created like a new database
[0:38:56] that was sort of like
[0:38:58] >> issues that the custom agents were were
[0:39:00] were experiencing and then gave them all
[0:39:02] access to file an issue and then the
[0:39:03] manager has access to to read the
[0:39:05] issues. Um and that worked pretty well.
[0:39:06] Essentially like like give it its own
[0:39:08] like internal issue tracker just for the
[0:39:09] agents and then you know if that becomes
[0:39:12] a a concept that seems useful generally
[0:39:15] maybe we'll think of how to package it
[0:39:17] in. But I mean generally we try to just
[0:39:19] keep it to composing the primitives if
[0:39:21] we can. You know, another example of
[0:39:23] this is we have no built-in memory
[0:39:24] concept. Memory is is just pages and
[0:39:26] databases. And so if you want to give it
[0:39:28] memory, you just give it a page and give
[0:39:29] it edit access to that page
[0:39:30] >> and a human can edit it. Agent can edit.
[0:39:32] >> Yeah. And so that works that pattern
[0:39:34] works extremely well and and you know
[0:39:35] depending on the use case you can have
[0:39:36] it be just a page or it could be an
[0:39:38] entire database with you know or you
[0:39:40] know can have sub pages is is pretty
[0:39:42] what you can do with it.
[0:39:43] >> So when I was setting this up uh I
[0:39:45] connected my inbox and it was like do
[0:39:46] you want to use Gmail or notion mail?
[0:39:48] And I'm like I don't want to use either.
[0:39:50] I just want you to do it. I'm curious
[0:39:52] how you think about you know notion mail
[0:39:53] notion calendar all of these kind of UI
[0:39:56] UX interfaces notion
[0:39:57] >> yeah when like at the same time you have
[0:39:59] the agents abstracting them away from
[0:40:00] you in a way you know how do you spend
[0:40:02] like the product calories so to speak
[0:40:04] >> yeah I mean I think it's
[0:40:06] >> pretty important that you don't have to
[0:40:08] use notion mail to connect to the mail
[0:40:09] capability so we can just connect to
[0:40:10] Gmail or or whatever you want uh to use
[0:40:14] and we're thinking of the mail service
[0:40:17] as being really great to the extent that
[0:40:19] it's really agent impelled, right? So
[0:40:22] maybe the mail app is just sort of a
[0:40:23] prepackaged agent that helps you
[0:40:26] automate your your inbox.
[0:40:28] >> Yeah, the auto labeling is great. I
[0:40:30] think the
[0:40:31] >> when we um integrate with Gmail, for
[0:40:34] instance, we have a series of tools
[0:40:36] available that are available via MCP or
[0:40:38] API to Gmail. When we integrate with
[0:40:41] notion mail, we have the notion mail
[0:40:43] engineering team to build us the um
[0:40:45] exact right tools that optimize latency,
[0:40:48] optimize performance and quality. they
[0:40:50] own that quality. Um there's product
[0:40:52] leads there that they're directly
[0:40:53] thinking about the user problems that
[0:40:54] happen in mail. So it tends to be when
[0:40:56] we build integrations and connections,
[0:40:58] we build natively first um and then
[0:41:01] think about um extending them generally
[0:41:04] just because it's also easier
[0:41:06] >> um to build natively first. Um so that
[0:41:08] tends to be how we phase things out.
[0:41:10] >> Talking about integrations, you prompted
[0:41:12] me so I got to ask MCP CLI, what's going
[0:41:14] on? What's the opinion? Yeah, I think I
[0:41:17] mean I'm I'm definitely bullish and
[0:41:19] excited about CLIs. I think there's a
[0:41:22] few really cool things about CLI. So,
[0:41:24] one really cool thing is like um is that
[0:41:27] it's in the terminal environment. So, it
[0:41:28] gets a bunch of extra power. So, you
[0:41:30] know, for example, I can like like
[0:41:31] pageionate and cursor through like long
[0:41:33] outputs. Um and it has a progressive
[0:41:35] disclosure inherently. Uh so, you know,
[0:41:38] you don't see all the tools at once.
[0:41:39] It's just you see the CLI wrapper and
[0:41:41] you can like use the the help commands
[0:41:43] and and read files. And then I think the
[0:41:46] most important thing that's that's super
[0:41:47] cool is that there it's also inherently
[0:41:50] bootstrapped. So if there's an issue,
[0:41:52] the agent can debug and fix itself
[0:41:55] within the same environment that it uses
[0:41:57] the tool,
[0:41:58] >> right? Like you know, I think I saw a
[0:42:00] tweet this morning. Someone said, you
[0:42:01] know, my agent didn't have a browser, so
[0:42:03] I asked it to make itself a browser
[0:42:04] tool. And within 100 lines of code, it
[0:42:06] gave itself a little browser like like
[0:42:07] wrapping the the Chromium API. Um,
[0:42:10] that's pretty incredible. And then if
[0:42:12] there was a bug, it would just
[0:42:13] immediately try to fix it. Right. On the
[0:42:15] other hand, if you use, you know, if you
[0:42:16] use like the Chrome Dev Tools MCP, I've
[0:42:19] had this issue where like sometimes the
[0:42:20] transport gets like messed up. If it
[0:42:22] gets messed up, the agent has no way to
[0:42:23] fix itself. It it no longer has a
[0:42:25] browser. It's it's now broken, right? I
[0:42:27] think that's that's pretty fundamental.
[0:42:29] But I would say like a lot of the the
[0:42:32] bad things about it can be fixed. Uh so
[0:42:34] I think like the progressive disclosure
[0:42:36] can be fixed with with red harness. Like
[0:42:38] it it obviously doesn't make sense to
[0:42:39] show it to all the tools all the time.
[0:42:40] That's not really inherent to the MCP
[0:42:42] protocol. just like how you wrap it and
[0:42:44] use it.
[0:42:44] >> There's many poorly implemented FCPs
[0:42:46] because we didn't know.
[0:42:47] >> Yeah. Yeah. I mean it was just early
[0:42:49] like like the obvious thing is you know
[0:42:51] to start with is is to just show it all
[0:42:52] the tools and it's like okay now we have
[0:42:53] 100 tools and like the tool calling
[0:42:55] actually works so let's victim success
[0:42:57] give it a way to like filter the source
[0:42:58] the tools. So I would say like broadly
[0:43:00] speaking I'm really bullish on CLIs.
[0:43:02] >> I'm still bullish on MCPS in in a
[0:43:05] certain environment. I think in in
[0:43:06] particular MCP is really great for when
[0:43:07] you want sort of like a narrow
[0:43:08] lightweight agent. Mhm.
[0:43:10] >> I think there's there's definitely a lot
[0:43:11] of use cases where where you don't want
[0:43:12] like a full coding agent with a compute
[0:43:15] runtime and also you want it to be like
[0:43:18] more tightly permissioned. MCP
[0:43:19] inherently has a really strong
[0:43:20] permission model. Like all you can do is
[0:43:22] call the tools. A CLI is a little bit
[0:43:24] murkier. It's like can I access the API
[0:43:26] token? Are you like properly sort of
[0:43:28] like re-encrypting the token so it can't
[0:43:30] like
[0:43:31] >> exfiltrate it? It introduces a lot of
[0:43:33] like like new issues which are real and
[0:43:35] hard to solve. And MCB is just like the
[0:43:37] dumb simple thing that works and it it
[0:43:39] is pretty good.
[0:43:39] >> I'll add two more perspectives, not from
[0:43:42] it working well for notion, but how
[0:43:43] notion like commits to both platforms.
[0:43:46] Notion is dedicated to being the best
[0:43:47] system of record for where people do
[0:43:49] their enterprise work. So we will always
[0:43:50] support our MCP in so far as other
[0:43:52] people are using MCPS, right? So
[0:43:54] regardless of our perspective, we've put
[0:43:57] a lot of effort into our MCP and we have
[0:43:59] a fantastic team that we're building um
[0:44:01] to do more there. And the second thing
[0:44:03] I'll say, I think um we all think a lot,
[0:44:06] but lately I've been thinking a lot
[0:44:07] about making sure there's a value
[0:44:08] alignment and pricing um with
[0:44:10] capability.
[0:44:11] >> Literally on the expression
[0:44:12] >> and needing language to execute
[0:44:15] deterministic tasks feels wasteful and
[0:44:17] requiring on a language model to
[0:44:19] interface with third party providers
[0:44:20] seems wasteful for tasks that don't
[0:44:22] require it. and particularly because our
[0:44:24] custom agents are using usage based
[0:44:26] pricing. We think of pricing as like the
[0:44:28] barrier of entry for use of our product
[0:44:30] and we're quite committed to making sure
[0:44:32] that it's not wasteful. Um not just
[0:44:34] because it's a bad deal for our
[0:44:35] customers, but it's also bad business.
[0:44:36] We want as many buyers. Like there's a
[0:44:39] there's an elasticity of demand. And so
[0:44:42] if we can have our agents properly
[0:44:44] execute code that calls on CLI
[0:44:46] deterministically, it's a one-time cost,
[0:44:48] right? versus constantly having a
[0:44:50] language model integrate with an MCP
[0:44:52] over and over and over and paying those
[0:44:54] like repeated token fees and if it's
[0:44:56] happening outside the cash window then
[0:44:58] you're paying for it over and over and
[0:44:59] over and it's just kind of unnecessary
[0:45:01] and less deterministic when it doesn't
[0:45:03] have to be.
[0:45:04] >> Yeah, the open-endedness I think is like
[0:45:06] the main thing. It's like, well, if I
[0:45:08] could write code to just call an API, I
[0:45:10] would never use an MCP. But then you
[0:45:12] need an MCP sometimes when you know what
[0:45:14] to call, but you don't want it to
[0:45:15] restart versus like I think the it built
[0:45:17] a browser from scratch. It's like
[0:45:18] >> it's great when you're doing it on your
[0:45:20] own, but like if your customers were
[0:45:21] having your AI write a browser from
[0:45:23] scratch every time and you had to pay
[0:45:24] the token cost of that, you'd be like,
[0:45:26] "No, no, the Chrome DevTools MTP is
[0:45:28] actually pretty great. Just use that."
[0:45:30] I'm curious, how do you make that
[0:45:31] decision? Like, should it be just
[0:45:33] straight API call, very narrow? Should
[0:45:35] it be an MCP? Should it be super
[0:45:37] open-ended?
[0:45:38] >> Do you mean for when we ship notion
[0:45:39] capabilities or when we add
[0:45:41] capabilities?
[0:45:42] >> You might have a capability that the
[0:45:44] only way to do is an open-ended agent
[0:45:46] like an agent with a coding sandbox.
[0:45:48] >> Yeah. In notion AI they're not
[0:45:50] explically
[0:45:54] like is there ever a discussion like
[0:45:57] we're not going to ship it because we're
[0:45:58] not able to tie it down or are you happy
[0:46:01] to just like
[0:46:02] >> um No. Well, I mean there are a lot of
[0:46:04] things where we choose not to use MCP
[0:46:06] because we want to add more hightouch to
[0:46:08] quality. I think search and agentic find
[0:46:10] is like the largest instance of that
[0:46:13] where we have um Slack and Linear and
[0:46:16] Jira search and notion that is not using
[0:46:19] necessarily the search MCP functionality
[0:46:22] that is provided by those companies. And
[0:46:23] that's because it's quite critical we
[0:46:25] think to how our agent trajectories work
[0:46:28] is for us to have a little bit more
[0:46:30] control on the functionality of the
[0:46:31] search journey. And so it usually comes
[0:46:34] from quality and there's a long tale of
[0:46:36] things and that's why we built an MCP
[0:46:38] client or an MCP server, excuse me, so
[0:46:40] that people can connect whatever they
[0:46:42] want. There's that long tail, right? But
[0:46:45] we for search particularly, I would say
[0:46:47] that's like the primary entry point, but
[0:46:49] there are other connections as well that
[0:46:50] it's a little bit of secret sauce about
[0:46:52] when we are okay with like MCP
[0:46:54] functionality and userdriven off and
[0:46:56] when we actually want to want to carry
[0:46:58] along ourselves.
[0:46:59] >> I think that there's not really a
[0:47:01] conflict here. There's just like
[0:47:02] different layers of the stack and
[0:47:03] different abstractions. I mean, if I
[0:47:04] were to like map it out, it's like, you
[0:47:06] know, you've got MCPs give you a way to
[0:47:11] it's a protocol for gaining access to
[0:47:13] tools. It's an open protocol. So, you
[0:47:15] can you can easily get like a longtail
[0:47:18] many things. So, if you open up our like
[0:47:20] in the tool settings, that's not the
[0:47:21] trigger actually. That's something that
[0:47:22] MCP can't do. So, if you scroll down and
[0:47:25] you and yeah, the the tools and access
[0:47:28] so you're now a connection. Yeah, MCP is
[0:47:30] a really great way to gain access to
[0:47:31] tools. It works really well, but you
[0:47:34] just looked at the the trigger Y for
[0:47:35] example, there's no trigger protocol and
[0:47:38] so those things we had to build
[0:47:39] ourselves and then there's there's some
[0:47:41] integrations where we use MCP like so
[0:47:44] for example I think that you know the
[0:47:45] linear and the GitHub
[0:47:48] >> they use MCP but but the Slack mail and
[0:47:50] calendar those are actually ones they
[0:47:51] built in house and we spent a lot of
[0:47:53] time really fine-tuning all the tools to
[0:47:55] make them really good and also like
[0:47:56] building out the triggers. It's just
[0:47:58] like different layers of the stack. Some
[0:48:00] things make sense at sometimes and then
[0:48:02] you know we just have to like like
[0:48:03] harness the right tool at the right
[0:48:04] time. I don't think there's an inherent
[0:48:05] like strong conflict between these
[0:48:07] things.
[0:48:08] >> Do you have a canonical representation
[0:48:09] of these tools internally where like you
[0:48:11] wrap these things together? The MCP plus
[0:48:13] the custom build.
[0:48:14] >> Yeah. Yeah. We have like internal
[0:48:17] abstractions for like what is a tool,
[0:48:19] what is an agent, what is a completion
[0:48:22] call. Yeah. We even have internal
[0:48:24] obstructions for like what is a chat
[0:48:27] archetype, whether it be from Teams or
[0:48:29] Slack.
[0:48:30] >> Yeah, it's like the only way to build
[0:48:31] with with AI because everything's moving
[0:48:33] so quickly. You'd have to abstract it so
[0:48:35] that you can swap things up.
[0:48:36] >> Yeah, I mean there's always a dance. I
[0:48:38] mean, we we probably
[0:48:40] >> rebuilt our our framework like like I
[0:48:42] said like like five different times. Um
[0:48:44] it's always a dance of like okay, how
[0:48:46] does this new thing work, right?
[0:48:47] >> What should the abstraction be? Like
[0:48:49] what is OpenAI giving us? What is
[0:48:50] Enthropy giving us? um you know like
[0:48:52] trying to wrap over it. I think I think
[0:48:54] we've been pretty successful with that.
[0:48:56] It's just a matter of like like staying
[0:48:57] nimble and making sure that you always
[0:49:00] have like the simplest dumbest
[0:49:01] abstraction you can that you know that
[0:49:03] the maps over different things. Yeah. So
[0:49:04] so we have like a tool integration
[0:49:06] abstraction for example and then MCP is
[0:49:08] like a type of integration.
[0:49:09] >> Yeah that's that's one of
[0:49:11] >> this might be a big ask u but I'm going
[0:49:13] to try uh which is you said you've said
[0:49:15] multiple times you rebuild a few times
[0:49:17] like five times through I don't know if
[0:49:18] the what the right number is. Is there
[0:49:19] like a brief history of what was the
[0:49:21] each rebuild doing? And yeah, I know
[0:49:24] it's
[0:49:24] >> I can try to do that. I mean,
[0:49:25] >> yeah, there's
[0:49:26] >> you need you need to rag over
[0:49:27] >> archaeology. Yeah, I mean the first
[0:49:29] version the first version that we
[0:49:31] started building in like late 2022. Oh
[0:49:33] my gosh. Well, there have been many
[0:49:34] versions actually. Okay. Well,
[0:49:36] >> the highlights the the like wow.
[0:49:38] >> The the first version we built was
[0:49:40] actually a coding agent. Yeah.
[0:49:42] >> So, we're like, "Oh, instead of building
[0:49:44] tools, let's make everything be
[0:49:45] JavaScript and then we'll just give it
[0:49:46] JavaScript APIs and it'll just write
[0:49:48] code and that's how it speaks the
[0:49:49] tools." Um, but at the time it just
[0:49:51] sucked at writing code. It wasn't that
[0:49:53] good. Uh, so then we moved to uh more of
[0:49:55] like a tool calling abstraction. A tool
[0:49:57] calling didn't exist yet. So, we created
[0:49:59] this whole XML
[0:50:02] representation. And a big a big learning
[0:50:04] in that version is we were catering way
[0:50:06] too much to what made sense for notion
[0:50:10] and notion's data model versus what the
[0:50:12] model wants. So as an example, we
[0:50:14] created this whole uh XML uh format that
[0:50:18] can losslessly map to notion blocks and
[0:50:20] the transformation between them is super
[0:50:22] easy to do. Uh and then we created these
[0:50:24] sort of like mutation operations to to
[0:50:26] edit pages. Um, but it sucked because
[0:50:28] the model didn't know the XML format
[0:50:30] >> and also the
[0:50:31] >> you had to prompt it in.
[0:50:32] >> Yeah, you had to prompt it in and the
[0:50:34] just weren't convenient. And so, yeah,
[0:50:36] we're like, okay, well, it has to be
[0:50:37] markdown. The model's no markdown, you
[0:50:39] know. So, we did a whole project around
[0:50:41] basically creating a notion flavored
[0:50:43] markdown
[0:50:43] >> where, you know, the whole goal was like
[0:50:46] it has to be just simple markdown at the
[0:50:48] core and and then we can add some
[0:50:49] enhancements and it doesn't have to be a
[0:50:52] a full lossless conversion. That was a
[0:50:54] big one we did. and and then we did a
[0:50:55] whole similar learning to uh the the
[0:50:58] database layer. So so so to querying a
[0:51:00] database I mean in the notion API the
[0:51:02] way you query a database is there's a
[0:51:04] crazy JSON format and it's you know kind
[0:51:07] of limiting but it maps nicely to like
[0:51:10] how we represent things internally. We
[0:51:11] scrapped all that we're like okay let's
[0:51:13] just make it SQLite everything is a
[0:51:14] SQLite database you can query it just
[0:51:16] like a SQLite query and the models are
[0:51:17] super good at that. So
[0:51:19] >> give the models what they want.
[0:51:20] >> That was another one. Yeah. Yeah. Give
[0:51:21] models what they want. I mean that was I
[0:51:22] would say that was a big learning is
[0:51:24] just you know really be be savvy and
[0:51:26] really careful thinking about what the
[0:51:29] model wants in terms of you know its
[0:51:31] environment and and and cater around
[0:51:33] that and really try so hard not to
[0:51:36] expose it to any complexity about your
[0:51:38] system that that's unnecessary.
[0:51:40] >> Notion's underlying database is
[0:51:41] Postgress right not SQLite.
[0:51:42] >> Yeah.
[0:51:43] >> So I don't know if there's any mismatch
[0:51:45] there. That one was kind of a fortuitous
[0:51:48] thing because we actually already um had
[0:51:52] a big project uh going where so so we
[0:51:55] had this um when you query a notion
[0:51:57] database it's actually querying this
[0:52:00] like uh cluster of SQLite databases.
[0:52:03] >> That's something that we had already
[0:52:04] been working on even before the agents
[0:52:05] came around.
[0:52:06] >> Yeah. You know you guys had a fantastic
[0:52:07] blog post about it and like it's it's
[0:52:09] actually really good database
[0:52:11] >> engineering knowledge to have that from
[0:52:13] you guys because where else will we get
[0:52:15] it? Yeah. Yeah. It's it's a crazy
[0:52:16] engineering problem when you want to
[0:52:17] have like millions and billions of tiny
[0:52:20] databases or where where some of them
[0:52:22] are tiny but some of them are are very
[0:52:23] large and you want everything to be very
[0:52:24] fast.
[0:52:25] >> Yeah. And also like not that
[0:52:26] hierarchical sometimes, you know, uh so
[0:52:29] somewhat of a graph.
[0:52:30] >> Mhm.
[0:52:31] >> I do like that history because I think
[0:52:33] that shows the evolution that you guys
[0:52:35] went through and the work that went into
[0:52:36] it.
[0:52:36] >> He just ended you a year and a half ago.
[0:52:38] >> Oh, okay. Okay. Well, let me I need to
[0:52:41] hit continue.
[0:52:42] >> If you're curious, I mean, we can keep
[0:52:44] going. I'm just saying like that's
[0:52:45] really
[0:52:46] >> that's another one. Yeah.
[0:52:47] >> Well, no cuz there was tool calling and
[0:52:49] then there was research mode which
[0:52:51] wasn't a fully agentic tool calling. Um
[0:52:54] then we moved away from fot prompting
[0:52:56] entirely to tool definitions. Um and now
[0:52:59] we're thinking about agent 2.0.
[0:53:02] >> So no fus prompts ever, right?
[0:53:03] >> Uh
[0:53:04] >> okay. No.
[0:53:05] >> I don't know if but yeah, that kind of
[0:53:07] went away. It's an interesting thing,
[0:53:08] >> right? Yeah. I mean
[0:53:09] >> they just instruction follow really
[0:53:11] well. I I would say there's been like a
[0:53:13] general arc where you know it's like you
[0:53:15] gradually strip away everything and it
[0:53:18] it looks more AGI like and so you know
[0:53:20] it it it started out as like it's a one
[0:53:22] shot one prompt there's few shot
[0:53:23] examples and it became like okay
[0:53:25] actually let's give it let's give it
[0:53:27] tools but it'll still have few shot
[0:53:28] examples and then it became actually
[0:53:30] like no no let's just give it a whole
[0:53:31] bunch of tools. One big big shift that
[0:53:34] that we I've been working on recently
[0:53:36] that's about to ship is um you know what
[0:53:38] happens when you have a lot of tools.
[0:53:41] >> Yeah.
[0:53:41] >> So then yeah so then a progressive
[0:53:44] disclosure becomes really important. So
[0:53:45] you know we were we sort of hit a
[0:53:47] bottleneck where our our agent worked
[0:53:49] really well. Um we hit a bottleneck
[0:53:52] where um it it became pretty hard to add
[0:53:55] new tools and and we became sort of
[0:53:57] worried about it like like breaking the
[0:53:58] model. looks like. Okay, someone
[0:53:59] >> No, I just heard it was like saying
[0:54:01] hello was like thousands and thousands
[0:54:02] and thousands of tokens.
[0:54:04] >> It was really slow.
[0:54:05] >> I can see you're the efficiency person
[0:54:06] here.
[0:54:07] >> It's it was too many tokens, but also
[0:54:09] it's a quality issue because it meant
[0:54:11] that like any engineer could introduce
[0:54:12] this this new tool for some like like
[0:54:14] niche feature and it would kind of like
[0:54:16] like nerf the overall model by like
[0:54:17] causing it to call the tool too much and
[0:54:19] stuff like that. And so um it uh yeah,
[0:54:21] so we uh we had an effort basically to
[0:54:23] to make our harness uh implement
[0:54:25] progressive disclosure in a nice way. M
[0:54:27] that's a big shift
[0:54:28] >> you said earlier like everyone says
[0:54:29] reasoning models was the big shift like
[0:54:31] what's more there when we went away from
[0:54:33] few shots to describing the goal of the
[0:54:36] tool in like goal driven basically
[0:54:38] moving from a DAG to like a a true
[0:54:42] system with feedback that's when we
[0:54:43] could distribute tool ownership to the
[0:54:45] teams much better because when it was
[0:54:47] all a few shots it was everyone truly
[0:54:49] editing one string and things would
[0:54:51] would compete and like the order there
[0:54:53] were all this all these papers about oh
[0:54:56] you know Not all context is created
[0:54:58] equal. The higher up it is in your
[0:54:59] examples like the more the model listens
[0:55:01] and we're trying really hard to like
[0:55:02] fight against the order and the
[0:55:04] selection of the fuchan that really had
[0:55:06] to be a center of excellence and it
[0:55:08] didn't scale with the number of people
[0:55:10] for the need the company had. It was
[0:55:11] really just five or six people that were
[0:55:13] allowed to even touch that or had to
[0:55:16] approve it rather in our codebase. And
[0:55:17] then now we can actually with the right
[0:55:20] email setup distribute um so that
[0:55:22] everyone owns their tool and their tool
[0:55:24] definition. And sometimes we have crazy
[0:55:25] things where like we write two tools
[0:55:27] that have the same title and the agent
[0:55:28] crashes and stuff like that. So like you
[0:55:30] know there are issues actually believe
[0:55:32] it or not um Enthropic couldn't take it.
[0:55:35] Sonic couldn't handle two tools with the
[0:55:37] same name in OpenAI GPT 5.2 was like I
[0:55:40] can figure this out. So that was an
[0:55:41] interesting one that we learned by
[0:55:43] accident through a a SE.
[0:55:44] >> I mean then you know the underlying
[0:55:46] representation is that's a dict right
[0:55:50] like that's a sik.
[0:55:51] >> Exactly. Exactly. Um but so that was
[0:55:54] like a big shift for the company in
[0:55:56] velocity not immediate because the AI
[0:55:59] team that was the center of excellence
[0:56:00] team that owned you know that one file
[0:56:03] of fuchot promps had to become a
[0:56:05] platform team overnight and that wasn't
[0:56:06] natural
[0:56:07] >> but I would say that in terms of like
[0:56:09] the velocity of how we contribute to the
[0:56:11] agent beyond coding tools obviously
[0:56:13] being a big velocity lever um being able
[0:56:15] to distribute tools and not have to all
[0:56:18] collaborate on like one very select
[0:56:20] string of system prompt is truly I would
[0:56:23] say the biggest lever on how we've
[0:56:24] scaled.
[0:56:25] >> We're just fighting to keep the prompt
[0:56:26] as short as possible now. And then yeah,
[0:56:28] it's in the latest version of the agent.
[0:56:30] It's not in custom agents yet, but it
[0:56:31] will be like like next week, a week
[0:56:32] after or so. Um there's now like over
[0:56:35] 100 tools just for all all the crazy
[0:56:37] notion stuff. So we're able to really go
[0:56:38] deep and like
[0:56:39] >> would you list those tools publicly? Is
[0:56:41] this like IP or
[0:56:43] >> uh No, no, no. It's it's totally public.
[0:56:44] Uh you can ask
[0:56:45] >> you can find just ask
[0:56:47] >> you can just ask the agent and and it'll
[0:56:48] tell you we're going to post a bench. I
[0:56:50] mean like
[0:56:51] >> you got
[0:56:52] >> we don't think our system prompt is our
[0:56:53] secret sauce.
[0:56:54] >> Yeah. Mhm. Great.
[0:56:55] >> We don't try to hide the tools at all. I
[0:56:57] think it's
[0:56:58] >> I think it's kind of important actually
[0:56:59] as an operator, you know.
[0:57:00] >> Yeah. As a power user, I want to be
[0:57:02] like, "Oh, I can do this. This is this."
[0:57:03] Great.
[0:57:03] >> Yeah. Yeah. I mean, one thing that one
[0:57:05] phrase we say internally a lot is to to
[0:57:06] teach at the top of the class, you know,
[0:57:08] want to build like like customation is
[0:57:10] kind of like a power tool. I mean, we
[0:57:12] try to make it as easy as possible to
[0:57:13] set up, but we want it to be pretty deep
[0:57:15] and sophisticated. And I think a huge
[0:57:17] part of that is the operator needs to be
[0:57:19] able to interrogate the way the system
[0:57:22] works. And a big part of that is like
[0:57:24] what are the tools? How do they work?
[0:57:25] You know, like like how should I prompt
[0:57:26] it to use the tools in the right way?
[0:57:28] >> I'd actually say we don't try and make
[0:57:30] it as easy as possible to use because
[0:57:31] the more we do that, the more we
[0:57:32] abstract away that interpretability that
[0:57:34] Simon's talking about that basically
[0:57:36] nerfs the model or nerfs the agent from
[0:57:39] being super capable. So a huge I would
[0:57:42] say turning point. I can think about
[0:57:43] like the week and a half that we all
[0:57:45] came together on this as we were
[0:57:47] building custom agents was that
[0:57:48] alignment that we're not trying to build
[0:57:49] for everyone here. We're not trying to
[0:57:51] build the model that um or build the
[0:57:53] user experience that anyone can figure
[0:57:54] out how to use cuz the more we do that
[0:57:56] the more we just diminish its
[0:57:57] capabilities and that was a big you know
[0:58:00] everyone in a couple Slack messages
[0:58:02] aligned on that that actually made us
[0:58:04] all work faster again right cuz we all
[0:58:05] were like more centralized on who we
[0:58:07] were building for.
[0:58:08] >> What does the metaprom generator look
[0:58:10] like? Okay. So, I looked in the system
[0:58:12] prompt that it gener for example uses
[0:58:14] emojis. That's not a you know obvious
[0:58:17] thing to be doing.
[0:58:18] >> Wait, did you just ask it what's your
[0:58:19] system prompt? Oh, no. This is how to
[0:58:21] generate prompts. The pros set up. It's
[0:58:23] a set.
[0:58:24] >> Yeah. Well, well, so this is actually
[0:58:25] just the agent. So, so one thing we did
[0:58:27] that that I really like with custom
[0:58:29] agents is
[0:58:30] >> it can set itself up. So, we that only
[0:58:32] gave it access to use the tools it has
[0:58:34] access to like send your emails or
[0:58:36] whatever. Uh, but it has more tools to
[0:58:38] set itself up and to debug itself. And
[0:58:40] so when you ask it to write a system
[0:58:42] prompt, it's just your agent itself is
[0:58:44] doing that.
[0:58:44] >> So this is just the model preference.
[0:58:46] You're not really injecting into the
[0:58:48] model too much.
[0:58:49] >> I think what makes a good custom agent
[0:58:51] and
[0:58:52] >> and things like that. And then and it's
[0:58:54] really nice too because like if it
[0:58:56] fails, you can ask it why did it fail
[0:58:58] and then say okay update your
[0:59:00] instructions so it doesn't fail again.
[0:59:01] Obviously we should build product of
[0:59:02] self-healing. That's that's next on our
[0:59:04] road map. But um it actually it creates
[0:59:06] a nice system. Yeah, we do essentially
[0:59:08] give it like a development guide.
[0:59:10] Here's, you know, here's how to make a
[0:59:11] custom agent. Here's how to like like
[0:59:13] help the user test it end to end, you
[0:59:15] know, to to help them gain confidence
[0:59:16] that it works, stuff like that.
[0:59:17] >> Mhm. Yeah. Yeah. The fixing thing
[0:59:19] worked. I mean, it wasn't automatic, but
[0:59:21] I I miss set something up and then there
[0:59:23] was like a fix button and then just
[0:59:25] >> Yeah. Yeah. One thing
[0:59:27] >> agent
[0:59:29] it's it's actually it's an interesting
[0:59:31] sort of permission problem. So like the
[0:59:33] thing about custom agents that is that
[0:59:35] by default it has no permission to do
[0:59:37] anything and then you have to explicitly
[0:59:38] grant it all its permissions and that's
[0:59:40] what lets you trust it can work in the
[0:59:42] background right like you can know like
[0:59:44] oh it it can read my email but not send
[0:59:46] email okay I can trust that right
[0:59:48] >> if you let it fix itself
[0:59:50] >> you know you're you're breaking that
[0:59:51] that there it's not allowed to edit its
[0:59:53] own permissions but so you know in the
[0:59:56] current product you can sort of click a
[0:59:57] button to fix but now you're entering
[0:59:58] sort of an admin mode where where where
[1:00:00] you're in a synchronous chat And you can
[1:00:02] and you can see what it's doing.
[1:00:03] >> Yeah.
[1:00:03] >> And it and it confirms before it
[1:00:05] changes.
[1:00:05] >> The thing I really like that most people
[1:00:07] don't do is like the editing chat is the
[1:00:09] same thing as the using chat. Like you
[1:00:11] can message the agent to both edit it
[1:00:13] and use it versus a lot of other
[1:00:16] products are like
[1:00:16] >> I think that's really key. I think
[1:00:17] >> I think a lot of designers will feel so
[1:00:19] happy you said that cuz we spent we we
[1:00:21] called this Flippy. Um
[1:00:23] >> what is this? What do you mean this
[1:00:25] >> this? Well, yeah. So if you sort of if
[1:00:27] you close that and like open settings,
[1:00:30] you can see sort of Yeah. This is we we
[1:00:32] call it flippy because you know we
[1:00:34] started with sort of like the settings
[1:00:36] were the sort of the main page and then
[1:00:37] you can test the agent. The agi pill to
[1:00:40] think about it is like oh it's just the
[1:00:41] agent. Everything is the agent. It can
[1:00:43] set itself up. It can test itself and it
[1:00:45] can run the workflow that they want to
[1:00:46] run. Uh so we flipped it. So the main
[1:00:49] view I was looking at is the chat and
[1:00:51] and then the settings is more just like
[1:00:52] a side panel at sort of previewing the
[1:00:55] changes that it's making. So you can
[1:00:56] introspect on them or or you can also
[1:00:58] make changes manually if you'd like. But
[1:01:00] but we want to design the experience
[1:01:01] from the get- go so you don't have to
[1:01:04] ever any of the settings manually. You
[1:01:06] can just talk to it.
[1:01:06] >> And the inside baseball is like how this
[1:01:09] works was probably the launch blocking
[1:01:11] part of this build. Um especially
[1:01:13] because we had a lot of early adopters
[1:01:14] that were used to the old way. And
[1:01:16] that's like the benefit of adopting in
[1:01:18] public. But then changing how people
[1:01:20] think about setting up custom agents
[1:01:21] when they already had this flow in and
[1:01:23] of itself was difficult. Um,
[1:01:25] >> I mean that's really fun because the we
[1:01:27] we ended up sort of painfully delaying
[1:01:30] the launch
[1:01:31] >> by
[1:01:32] >> a few weeks. Yeah, definitely like like
[1:01:33] a month or so. Um, but the whole team
[1:01:36] was super enthusiastic about it though
[1:01:38] cuz it was just so much better. It was
[1:01:39] like, oh yeah, obviously you have to
[1:01:41] chat with itself up and everyone was
[1:01:43] super bullish on that.
[1:01:44] It was like like painful for a second,
[1:01:46] but then everyone was like,
[1:01:47] >> "Right." And like back to, you know,
[1:01:49] organization design, which I probably
[1:01:51] care about more than Simon, but like the
[1:01:52] people that built this are three
[1:01:54] engineers from three different teams
[1:01:55] because we're like, "We need to launch
[1:01:56] this and we need to fix this." And then
[1:01:58] we've just built a company where then we
[1:02:00] just put people on it and no one
[1:02:02] complains. The manager doesn't complain
[1:02:03] and we were able to unblock and just
[1:02:04] ship it.
[1:02:05] >> Yeah. Yeah. But being in a failure chat
[1:02:08] and asking it to just fix yourself is
[1:02:11] amazing versus I got to copy this and
[1:02:14] put in the settings chat to do it. So
[1:02:16] yeah, there's an interesting like
[1:02:18] trade-off in there that that we're
[1:02:19] trying to explore which is you know we
[1:02:21] want to be like a business enterprise
[1:02:23] safe agent where you can delegate
[1:02:26] something and and trust that it's going
[1:02:27] to work. But also we want to get some of
[1:02:29] that sort of bootstrapping power that
[1:02:31] that you feel like when your coding age
[1:02:32] is making a browser like for itself,
[1:02:34] right? There's something there. I think
[1:02:35] that's that's really important. So,
[1:02:36] we're trying to sort of navigate that
[1:02:38] that that trade-off and try to get you
[1:02:40] both.
[1:02:40] >> Now, it's free.
[1:02:42] >> Yeah,
[1:02:42] >> it's amazing. Uh I'm worried about when
[1:02:44] I have to start paying. How do you think
[1:02:47] about So, you have notion credits as a
[1:02:49] payment for this, which is like separate
[1:02:51] from the usual tokens uh that the model
[1:02:53] generates. How do you design pricing,
[1:02:55] value based pricing based on the task
[1:02:57] and things like that?
[1:02:58] >> So, they are um the credits and payment
[1:03:01] structures associated with the token
[1:03:02] usage. reason that we had to make it not
[1:03:04] just throughput of tokens is that it's
[1:03:06] not always priced that way. Like our um
[1:03:09] fine-tuned open source models are served
[1:03:10] on GPUs, web search is priced
[1:03:12] differently. You know, if we were to
[1:03:14] host sandboxes, those are priced
[1:03:16] differently. So, we had to think of an
[1:03:17] abstraction above tokens. And it's also
[1:03:19] not just tokens, it's the token model um
[1:03:22] and serving tier trade-off, right?
[1:03:24] Because we can have priority tier
[1:03:25] processing, we can have asynchronous
[1:03:27] processing, the cache rate could be
[1:03:28] different um depending on who uses it
[1:03:31] when, right? And so we wanted to um from
[1:03:33] the get-go commit to making sure that
[1:03:35] customers were getting the fair deal,
[1:03:37] not necessarily that we were making a
[1:03:39] ton of money off of it, but that
[1:03:41] customers were paying for what was
[1:03:42] reasonable. That's the fundamental of
[1:03:44] where we started. And also, you know,
[1:03:45] we're selling enterprise SAS, so if we
[1:03:46] sell credit packs, then you get
[1:03:48] discounts if you're an enterprise and
[1:03:49] you buy a certain amount of credit packs
[1:03:50] and things like that. So it also just
[1:03:52] helped the sales motion um work a little
[1:03:53] bit easier. So that's the answer on the
[1:03:55] abstraction of credits to dollars. Now,
[1:03:59] was the question how we decide how to
[1:04:01] price it or
[1:04:02] >> Yeah, like I mean I think there's all
[1:04:04] tokens are not made equal, but we
[1:04:06] obviously get charged mostly equal. Like
[1:04:08] you can ask uh codeex to create you a
[1:04:11] dumb tool for like I created one for a
[1:04:14] Starcraft 2 land for people to like find
[1:04:16] the game. Uh but then people create it
[1:04:18] to build features and like billion
[1:04:19] dollar companies, but the token price is
[1:04:21] the same. Yeah. Like for you, I can ask
[1:04:23] this to update my favorite recipes doc
[1:04:26] and it'll do it. Or I could ask it to
[1:04:28] like respond to an email from an
[1:04:30] investor and like the value is like very
[1:04:32] different, you know, and you could
[1:04:34] charge more, but you're not necessarily
[1:04:36] doing it. So I'm curious if there was
[1:04:38] any discussion.
[1:04:39] >> I think that um that's not where the
[1:04:41] market is right now. Um number one, the
[1:04:44] second reason that we're not doing that
[1:04:46] is it ended up being kind of complicated
[1:04:47] to figure out what was complicated or
[1:04:49] not. So we at first were like let's just
[1:04:51] charge on agent runs and you know you
[1:04:53] went through all the different versions
[1:04:54] that ultimately just brought you back to
[1:04:56] a lot of complexity that map directly to
[1:04:58] token throughput and so it it's also
[1:05:00] just simpler um it's quite difficult um
[1:05:02] to build those pricing systems and um I
[1:05:06] actually think that one of the biggest
[1:05:08] reasons we want had usage based pricing
[1:05:10] for this capability is we've had our
[1:05:12] core agent for a while with a model
[1:05:14] picker and there were certain models um
[1:05:16] or certain functionality that we had
[1:05:18] margins to maintain And if we wanted to
[1:05:20] ship this functionality uh you we
[1:05:22] couldn't afford it. It would bankrupt
[1:05:24] the company if we let for instance like
[1:05:26] autofill or the database autofill
[1:05:27] feature will soon be agentic. That will
[1:05:30] be associated with usage based pricing
[1:05:31] because if every single autofill action
[1:05:33] was an agent running on OBUS on every
[1:05:36] single database cell it would be
[1:05:38] billions of dollars, right? And so we
[1:05:40] had to find a way for the customers that
[1:05:42] wanted to do more and wanted to give us
[1:05:44] their money and pay more to find the
[1:05:46] outlet for them to do it that we didn't
[1:05:48] have to apply to the lower end of the
[1:05:50] curve. And also not all knowledge work
[1:05:51] is equal. Like there's different points.
[1:05:53] A lot of the agent workflows here really
[1:05:55] saturate model capabilities. Like you
[1:05:58] don't need a complicated model for it.
[1:06:00] And so charging based on token usage um
[1:06:04] we couldn't just decide for you that you
[1:06:05] wanted your email client to be dumb or
[1:06:07] not. like we want you to decide if you
[1:06:10] want to have Opus auto triage all of
[1:06:12] your emails.
[1:06:13] >> We will actually give you nudges in the
[1:06:14] product to rethink if that's the right
[1:06:16] choice. Um because also not every user
[1:06:19] um
[1:06:20] >> you'd be surprised in user interviews
[1:06:22] people be like, "Oh, I didn't know
[1:06:23] that." So now we actually have a little
[1:06:24] hover that tells you like if it's
[1:06:26] expensive or not.
[1:06:27] >> Yeah. I mean it's also slower. So the
[1:06:30] thing that's interesting is like people
[1:06:31] don't care about speed in custom agents.
[1:06:32] And so the incentive of like uh ha coup
[1:06:36] being faster, people don't care when
[1:06:38] it's asynchronous. Um and so we want to
[1:06:41] only provide the service of extra extra
[1:06:43] benefit that people want and the best
[1:06:45] way to do that is to incentivize them
[1:06:47] because it's their own money.
[1:06:48] >> Must be confusing for people that are
[1:06:50] not familiar. It's like why is there no
[1:06:52] 5.3? You know, you open this thing and
[1:06:54] it's like is there something missing in
[1:06:56] my fault? Not their fault. Yeah. That's
[1:06:58] just the world we live in now.
[1:06:59] >> Yeah. I mean, it's just randomly John's
[1:07:01] point, too. It's like cloud had that.
[1:07:03] >> I mean, but auto is heavily I think
[1:07:05] what's actually been hard for us is to
[1:07:07] convince people that auto is not just
[1:07:08] our cheapest, dumbest model, but
[1:07:10] actually the model that's best for the
[1:07:12] task that you want to do.
[1:07:14] >> All right, Steve.
[1:07:15] >> I'm in.
[1:07:15] >> Exactly. Nice. Um, and a lot of our job
[1:07:19] is actually figuring out auto because
[1:07:21] it's
[1:07:22] >> this is the agent lab. Every agent lab
[1:07:24] has an auto.
[1:07:25] >> Yeah. And
[1:07:25] >> that's the job.
[1:07:26] >> Exactly. Because if you think about like
[1:07:28] I said I come from Robin Hood like you
[1:07:31] could spend a lot of time keeping up
[1:07:33] with the markets or you could have a
[1:07:36] auto investing right and you can have an
[1:07:38] index fund or you can have
[1:07:39] >> robo adviser robo advisor. So like at a
[1:07:42] certain point we also can be robo
[1:07:44] advisors and like we have a lot of
[1:07:45] people figuring out what model is best
[1:07:48] for the right task and right now we're
[1:07:50] not using auto as a as a margin maker.
[1:07:53] We're just using it to kind of reduce
[1:07:54] stress. It's not opus, that's for sure,
[1:07:57] because a majority of the tests people
[1:07:58] are doing aren't opus level um
[1:08:00] intelligence.
[1:08:01] >> The other thing I would say is the um
[1:08:03] you know, unlike a lab, we aren't fully
[1:08:06] incentivized just for you to use as many
[1:08:08] tokens as possible. We're actually
[1:08:10] really interested in getting you the
[1:08:11] right tool for the job. A lot of the
[1:08:13] time, the right tool for the job is
[1:08:14] actually just writing code and not even
[1:08:16] using agent at all. So that's that's
[1:08:18] something that we're investing in a lot
[1:08:19] is like, you know, imagine your your
[1:08:22] agent can actually automate itself out
[1:08:23] of a job,
[1:08:24] >> right?
[1:08:25] >> We would love if that were true.
[1:08:26] >> I feel very strongly about this because
[1:08:28] I don't necessarily feel like that's the
[1:08:30] SKS that Frontier Labs give you. I feel
[1:08:32] like they are just getting more and more
[1:08:34] capable and more and more expensive,
[1:08:35] which is fantastic for the use cases of
[1:08:38] when people want to do really
[1:08:39] complicated things on notion. Um what's
[1:08:41] difficult is like that market that I
[1:08:43] think right now is no man's land of
[1:08:46] where reasoning models were six months
[1:08:48] ago that the nano haikus etc haven't
[1:08:51] caught up to because now we're just
[1:08:53] paying more for those um for like extra
[1:08:55] capability that we didn't necessarily
[1:08:57] need and so are our customers and um
[1:08:59] labs aren't necessarily incentivized um
[1:09:01] right now with how few players they are
[1:09:04] to be meeting the market everywhere.
[1:09:05] They just need to be the cheapest. They
[1:09:07] don't need to be at value that the
[1:09:08] customer wants. And if no one's cheaper
[1:09:10] than them, then they're the cheapest and
[1:09:12] that's good enough, right? And so we're
[1:09:14] doing a lot to make sure that we have
[1:09:16] the right optionality um to switch
[1:09:17] between models and also invest in open
[1:09:19] source because the open source models
[1:09:21] actually are um getting to be the place
[1:09:23] where reasoning models were 3 four
[1:09:24] months ago and um that's what's filling
[1:09:27] that gap right now. So you'll see we
[1:09:28] offer mini max and um we're
[1:09:30] collaborating a lot with different open
[1:09:32] source labs to think about notion's last
[1:09:34] exam and how they can do better on these
[1:09:37] types of tasks so that we can offer them
[1:09:39] for that intelligence to price to
[1:09:42] latency trade-off because you know in
[1:09:44] that triangle of intelligence price um
[1:09:47] intelligence price and latency excuse me
[1:09:49] um users get to choose where they are
[1:09:52] but right now um there's not the whole
[1:09:55] triangle isn't filled with models right
[1:09:57] And the more that different models fill
[1:09:59] that triangle, everyone's clustered in
[1:10:01] capability or everyone's cluster. I
[1:10:03] mean, haiku is not that much cheaper. No
[1:10:05] one's really in the middle. Like people
[1:10:07] really tend to cluster around too. Like
[1:10:08] this is really capable and it's really
[1:10:10] fast, but it's really expensive or
[1:10:11] whatever, right? And so we just want to
[1:10:13] make sure that that triangle is filled.
[1:10:15] Um, and we want to offer the models that
[1:10:17] fill it and we want to um get guide
[1:10:19] users to understand when they need it.
[1:10:21] >> Um, which one
[1:10:22] >> I mean all I'm hearing is that someday
[1:10:24] you're going to train your model. You
[1:10:26] have lots of tokens.
[1:10:28] >> I don't know if What do you mean by
[1:10:30] train your model? Train your own money
[1:10:32] to train a found. I mean,
[1:10:34] >> you go raise it.
[1:10:35] >> Yeah, you you can raise it.
[1:10:37] >> That's your job, Simon.
[1:10:38] >> No, I I don't think that that needs to
[1:10:40] be our core competency.
[1:10:42] >> This is usually the the thought process
[1:10:44] that leads to like, well, no one else is
[1:10:45] doing it. We'll take a crack, you know?
[1:10:47] >> I think I'm Yeah. I mean, I feel like to
[1:10:50] the extent that we do anything like
[1:10:52] training and the the area I'm actually
[1:10:54] most excited about is um less of like
[1:10:56] one big model for all the users, but
[1:10:58] like as as it becomes more possible to
[1:11:01] do, you know, to make like a specific
[1:11:03] fine-tuning that's like really knows
[1:11:05] your context of, you know, your company,
[1:11:07] the people that work your company,
[1:11:08] what's going on. I think that's that's
[1:11:10] pretty interesting because if you if you
[1:11:11] had a model that really knows your
[1:11:13] company, I think that would be like a
[1:11:14] huge quality uplift. We actually have
[1:11:16] some enterprise vendors that kind of ask
[1:11:18] about this um along with bring our own
[1:11:19] key like if I have a model that really
[1:11:21] understands like my enterprise that
[1:11:24] we're training for all these reasons.
[1:11:25] These tend to be like quite large
[1:11:27] institutions thinking about how to let
[1:11:29] people bring their own models but those
[1:11:30] models have to function with like right
[1:11:32] >> understanding how to call our tools and
[1:11:34] that's where again having um more public
[1:11:37] system prompt is like beneficial to
[1:11:39] notion right um we want all models to
[1:11:41] plug into notion as as as well as they
[1:11:43] can. Um that being said like of course
[1:11:46] there are certain aspects of notion
[1:11:48] where we do fine-tune and do reinforce
[1:11:50] and fine-tuning on our own capabilities.
[1:11:52] Um but that's not necessarily trained on
[1:11:54] user data. Um you don't need that that
[1:11:56] much data um in the first place. And
[1:11:58] that's where when we have like a data
[1:12:00] scientist and a model behavior engineer
[1:12:02] really understand where the capability
[1:12:04] gap is. That's when we invest there.
[1:12:06] >> I personally burned a lot of time trying
[1:12:08] to train models. Uh and it's tempting
[1:12:11] right? It's so training retraining every
[1:12:14] day.
[1:12:15] >> I was doing crazy amount. Yeah, I was
[1:12:16] doing a lot of different things. Um, and
[1:12:18] >> I was the budget person that came and
[1:12:20] pushed out and I showed up and I heard
[1:12:22] that that was happening.
[1:12:23] >> Time out.
[1:12:23] >> You know, like a a funny thing that a
[1:12:26] sort of an arc that like looped on
[1:12:28] itself is uh you know, back when I was
[1:12:30] doing tons of training stuff, it takes a
[1:12:32] long time to do any kind of training
[1:12:33] run. And so you end up operating like
[1:12:36] like 24/7 around the clock. like it
[1:12:37] becomes very important that before you
[1:12:38] go to sleep like everything is watch the
[1:12:41] experiments are started
[1:12:42] >> and then as I stopped training that kind
[1:12:44] of went away but now the coding agents
[1:12:46] have totally brought this back so now
[1:12:47] every night before I go to bed I'm like
[1:12:48] okay did I start enough agents you know
[1:12:50] to get them done I get everything done
[1:12:52] so it's yeah like you have to try
[1:12:55] polyphasic sleep so you can wake up
[1:12:56] every day
[1:12:58] >> yeah we uh yeah I have not gotten there
[1:13:00] yet but my goal these days is just to
[1:13:03] before I go to bed the agents are
[1:13:05] running and I'm confident ident that
[1:13:07] they won't be done by the time I wake
[1:13:08] up.
[1:13:09] >> Really 8 hours.
[1:13:10] >> There was a I won't say which coding
[1:13:12] frontier lab, but there was a point
[1:13:13] where he had like outlived like the
[1:13:15] thread length and context length that
[1:13:17] that coding agent provided.
[1:13:19] >> And I DM you DM'd them being like, hey,
[1:13:21] I need I need more and rep DM'd me
[1:13:24] directly and they're like, is Simon
[1:13:25] trying to prove string theory? Like what
[1:13:27] is he doing?
[1:13:27] >> Yeah, I I had a single coding agent
[1:13:30] thread going for I think it was like 17
[1:13:31] days.
[1:13:33] Uh pretty much continuously.
[1:13:34] >> Don't they just compress? I mean
[1:13:36] >> Yeah. Yes. It it was actually just a
[1:13:37] bug. It was a harness bug. Yeah. It had
[1:13:39] done compaction like a hundred times
[1:13:40] probably or
[1:13:42] >> the other thing that um reminded me
[1:13:43] about fine-tuning that I think you and I
[1:13:45] have aligned on is that our tools change
[1:13:47] really frequently and right now we spend
[1:13:49] a lot of time rethinking and building
[1:13:51] tools for capability and fine-tuning a
[1:13:54] model um to understand your tool like we
[1:13:57] don't have legal expertise or coding
[1:13:59] expertise. So if we were to fine-tune a
[1:14:00] model, it would either be expertise
[1:14:02] about the enterprise and you know we
[1:14:03] have ZDR no data retention offerings for
[1:14:06] those enterprises. So we'd have to
[1:14:07] really rethink how we structure if an
[1:14:08] enterprise wanted to opt into that or it
[1:14:11] would be fine-tuning and better
[1:14:13] capability on navigating our tools. That
[1:14:15] doesn't match with the velocity with
[1:14:16] which we create new tools. And so it
[1:14:18] would actually really slow us down um to
[1:14:20] have a model that was fine-tuned on our
[1:14:21] tools because we'd have to retrain and
[1:14:23] cut a new model every time we did that.
[1:14:26] And that's not how we're set up right
[1:14:27] now. Um, particularly with the way that
[1:14:29] we're changing our I guess we could
[1:14:30] fine-tune a model to like search for
[1:14:32] tools. It's just the the amount of time
[1:14:35] it takes to do that, ship it, have the
[1:14:37] right system. You're basically making a
[1:14:38] bet against a frontier capability not
[1:14:40] serving that and the time it takes you
[1:14:41] to build it. And that that time lag
[1:14:43] hasn't happened for us yet. It hasn't.
[1:14:45] >> Yeah. It's just the wrong trade-off. I
[1:14:46] think it's just like you want Yeah. We
[1:14:49] literally change our tools every single
[1:14:50] day. And if we notice an issue, we'll
[1:14:52] we'll we'll fix the problem. I think a a
[1:14:54] good way to think about it I think is
[1:14:56] pretty fruitful is like don't focus too
[1:14:59] much on training. I would think of that
[1:15:01] as like that's an implementation detail
[1:15:02] like what's the outer loop right like if
[1:15:04] the outer loop is you have a model and
[1:15:06] then some harness or or system where
[1:15:09] it's interacting with the system that
[1:15:10] needs to work and you know if there's a
[1:15:13] problem the way to solve the problem
[1:15:15] isn't necessarily to train a model it's
[1:15:17] like oh maybe there's just a bug in one
[1:15:18] of the tools right and actually 99% of
[1:15:21] the time it's a bug in one of the tools
[1:15:22] and so just fix the bug and then the
[1:15:25] outer loop thing that's really fruitful
[1:15:27] to think about is like how can you
[1:15:28] improve your your velocity and robust
[1:15:30] and making really good tools, making a
[1:15:32] good harness, you know, like like
[1:15:34] verifying it works.
[1:15:35] >> The one place that we do invest more in
[1:15:37] model training now necessarily though is
[1:15:39] actually in retrieval because um we're
[1:15:41] at a point right now in our business and
[1:15:43] enterprise or AI enabled plans where the
[1:15:45] search load and the search traffic, a
[1:15:47] majority of it's coming from agents, not
[1:15:48] humans. And so for every query that's
[1:15:51] hitting our elastic search or vector
[1:15:52] indices, they're not coming from humans.
[1:15:54] And the queries are structured
[1:15:55] differently and what's returned has a
[1:15:57] different requirement. positional
[1:15:58] ranking matters less, but top K
[1:16:00] retrieval mode matters more, right?
[1:16:02] >> Isn't top K a form of position?
[1:16:04] >> Of course, it is, but um when you're
[1:16:06] trading on like click-through rate, it's
[1:16:08] really, you know, number one through
[1:16:10] number six is very different that it
[1:16:12] needs to be in the top 100.
[1:16:13] >> Like the slope is just higher.
[1:16:15] >> It's a different optimization function
[1:16:16] for retrieval um model. Similarly, uh
[1:16:19] what snippet you include matters more or
[1:16:21] less, right? So we are rethinking a lot
[1:16:24] of that functionality um to work with
[1:16:27] how the agents like to write queries and
[1:16:29] how um they want to uh receive
[1:16:31] information. So we are doing like
[1:16:33] another kind of reinvestment into
[1:16:34] rethinking not only search for um how do
[1:16:37] agents do searches versus how humans do
[1:16:39] searches. Um but we're also investing in
[1:16:41] like indexing different things now
[1:16:43] because uh how are how do you index uh
[1:16:46] the setup generator for notion agent? it
[1:16:48] kind of breaks our block model entirely.
[1:16:50] Um where all blocks are nested in each
[1:16:52] other. Same with meeting notes. Um and
[1:16:54] so we do we I mean so we're hiring
[1:16:56] ranking engineers and model training
[1:16:58] engineers but it's primarily on ranking.
[1:17:00] >> Yeah. Does ranking map to Rexis for you?
[1:17:02] It does. Right. Recommendation system.
[1:17:04] >> Yeah. Um yes.
[1:17:06] >> Right. Okay. Um same same this but I'm
[1:17:08] trying to promote Rexus more in general
[1:17:10] because I is weirdly unpopular.
[1:17:13] >> I don't know why. Um but the other thing
[1:17:15] is that like I I was just talking about
[1:17:17] this with a peer like how much is
[1:17:19] ranking important versus like uh being
[1:17:21] able to do parallel exhaustive queries,
[1:17:23] >> right? Um so
[1:17:26] >> they're both important but like they're
[1:17:27] both two tools to the same user outcome
[1:17:29] or the same agent outcome, right? And so
[1:17:32] um that that's something that we're also
[1:17:34] rethinking a lot even on we just did an
[1:17:37] experiment on um notion ranking at this
[1:17:39] point um for notion retrieval vector
[1:17:41] embeddings are less and less. Did you
[1:17:43] see that?
[1:17:44] >> Yeah.
[1:17:44] >> Notion just notion over to night mode.
[1:17:47] >> So long it became dark mode.
[1:17:49] >> We're working the night shift for you.
[1:17:50] Right.
[1:17:51] >> Looks pretty new. I'm not seeing any
[1:17:52] bugs.
[1:17:52] >> You know I worked on this like parallel
[1:17:54] search thing where you you fan out to
[1:17:56] eight different queries, right? And so
[1:17:58] you actually need to use the model to
[1:18:00] work on query diversity so that you get
[1:18:02] maximum search space.
[1:18:03] >> And so like the people that are working
[1:18:04] on um ranking and retrieval are the same
[1:18:06] people working on what query generation
[1:18:08] is. It's all one journey. We call it
[1:18:10] agentic find. And we're actually
[1:18:12] realizing for instance that it's less
[1:18:14] about selection. Like we don't spend a
[1:18:17] lot of time trying to optimize what
[1:18:18] vector embedding we use anymore. That
[1:18:20] was a period of time, but that's just
[1:18:21] not the right level of optimization.
[1:18:23] Right.
[1:18:24] >> Okay. Uh we've gone long. I have to talk
[1:18:26] about motion meeting minutes and then
[1:18:28] we'll we can call it there. Uh you you
[1:18:30] you just have a lot of comments. Uh you
[1:18:33] uh I don't know where you want to start.
[1:18:35] Um is it the audio side? Is it the
[1:18:38] summarization? Yeah. as sort of like
[1:18:40] what makes it work or
[1:18:41] >> No, just like anything sort of
[1:18:42] interesting technically, right? Like I
[1:18:44] think you had you had some uh book
[1:18:45] points. I always call these like check
[1:18:47] marks along the way. When when a guest
[1:18:49] says something that they want to return
[1:18:50] to later, I just like check marking and
[1:18:52] like, okay, we'll go back to it.
[1:18:54] >> Meeting notes was one of those things
[1:18:56] where at first we were nervous that we'd
[1:18:58] have to teach people a different way to
[1:18:59] work and we were nervous that that was a
[1:19:01] lot of user friction. I think one of the
[1:19:03] reasons why I mean they're one of our
[1:19:05] biggest growth levers. I think they're
[1:19:06] one of the most like in terms of
[1:19:08] verality of adoption and retention quite
[1:19:11] strong. Um and so we've invested more
[1:19:13] and more as we did that. I think what's
[1:19:14] really powerful about it is again notion
[1:19:17] is the system of record of where and how
[1:19:19] you work. The way that I use meeting
[1:19:21] notes is every oneonone meeting I have
[1:19:23] is meeting notes. When I do my
[1:19:25] performance review for myself, my
[1:19:26] self-re
[1:19:28] primarily look at all my conversations
[1:19:30] with my manager and like write up what I
[1:19:31] did this year, right? because if I
[1:19:33] didn't talk about it in my one-on-one
[1:19:34] with my manager, it probably wasn't
[1:19:36] relevant for my performance review. So,
[1:19:37] it also just adds a ton of signal on
[1:19:40] prioritization that's really helpful for
[1:19:42] a good system of record that's really
[1:19:44] helpful for like our agent. It's also
[1:19:46] like caused a lot of scaling for search
[1:19:49] and for the agent. Um, and you know,
[1:19:51] it's it's just an explosion of content
[1:19:53] when you have transcripts like that. Um,
[1:19:55] how we do compaction, a lot of that was
[1:19:57] triggered by meeting notes passed into
[1:19:58] context, things like that. Um, so it's
[1:20:00] been a good impetus for us to think
[1:20:01] about longer form um, content when you
[1:20:05] think of it as like a priority
[1:20:06] primitive, but it's been one of the most
[1:20:08] powerful signals for our agent. Um,
[1:20:11] because it
[1:20:12] >> unsurprising, right? Like you're
[1:20:13] capturing a whole new thing.
[1:20:14] >> So it's like our own data like we want
[1:20:16] users like are they creating their own
[1:20:18] data flywheel, right?
[1:20:19] >> Like it serves me to prefer notion uh to
[1:20:23] put all my stuff because it has my other
[1:20:25] stuff.
[1:20:25] >> Totally. I mean, the way that the way
[1:20:27] that like our team's run right now is,
[1:20:29] you know, there's a custom agent that
[1:20:30] does a pre-eread before standup. It
[1:20:31] looks through all of Slack and GitHub
[1:20:33] and just says, you know, it it it
[1:20:34] creates a summary and it creates a
[1:20:35] meeting note and it says, "Everyone do
[1:20:37] this pre-eread." Then we just press
[1:20:39] play. We have the meeting. We talk
[1:20:40] through the pre-eread. We talk about
[1:20:41] what needs to happen next. And then we
[1:20:42] have a custom agent integrated with our
[1:20:44] calendar and triggers that then files
[1:20:46] tasks for tomorrow or today based on
[1:20:48] what we spoke about and um sends off
[1:20:50] Slack messages that we decided in the
[1:20:52] meeting needed to be follow-ups. like
[1:20:53] our meetings are hands-off keyboard and
[1:20:56] we're focused on um the root of the
[1:20:57] problem, not the bookkeeping around the
[1:20:59] problem.
[1:21:00] >> One thing that the meeting added
[1:21:02] recently that was that have been blowing
[1:21:04] my mind is they we made it so it
[1:21:07] actually when it makes a summary will
[1:21:09] actually appment mention the people that
[1:21:10] were referenced in it. So I I I now get
[1:21:12] notifications whenever someone talks
[1:21:13] about me.
[1:21:14] >> I feel like that one
[1:21:14] >> it's like it's like oh you know Simon is
[1:21:18] working on this.
[1:21:19] >> Okay.
[1:21:20] >> It's actually amazing how because then
[1:21:21] I'm like oh okay cool I'm going to go
[1:21:22] talk to them about that. What what if
[1:21:23] there are two assignments?
[1:21:24] >> Um,
[1:21:24] >> no wait. So it's powered by the agent.
[1:21:26] So it's doing agentic. So if you look at
[1:21:28] it thinking I don't know if this is
[1:21:30] shipped yet.
[1:21:31] >> It will be. When you look at it thinking
[1:21:32] when it's doing the summarization it's
[1:21:34] saying figuring out who Simon is.
[1:21:35] >> Most probable Simon.
[1:21:36] >> And we also have like a peopleto people
[1:21:38] similarity cache and stuff like that on
[1:21:40] the attendees. Like there's ways that we
[1:21:42] sort of like we also like generate a
[1:21:43] profile for each person and like and use
[1:21:46] that. But I mean of course I can get it
[1:21:48] wrong but the goal is for not to get it
[1:21:50] wrong. Meeting notes is just like the
[1:21:51] agent primitive packaged on top of a
[1:21:53] transcription primitive and then a
[1:21:54] vertical team. It's probably one of the
[1:21:57] only teams at notion that's completely a
[1:21:58] vertical team around quality and product
[1:22:01] like UX design because it's still a
[1:22:02] tiger team um with a fantastic manager
[1:22:04] Zach that joined recently um from Ember
[1:22:07] but um
[1:22:08] >> Zach Tatar. Yeah.
[1:22:09] >> Yeah. I uh chatted with him when he was
[1:22:11] talking about who's working on Ember.
[1:22:13] >> Yeah. So he's he's managing that team
[1:22:14] now and thinking about it as data
[1:22:16] capture. That's what MIDI notes is is
[1:22:18] data capture kind of reframing um where
[1:22:20] MIDI notes are valuable as a data
[1:22:22] capture problem and then working inside
[1:22:24] um like the summarization used to not be
[1:22:26] agentic. Now it is because it does all
[1:22:28] the things like figure out who the right
[1:22:30] Simon is and one day you can have a
[1:22:32] custom agent directly integrated in it
[1:22:34] that knows like what task database the
[1:22:35] meeting is referring to and as you're
[1:22:37] having the meeting perhaps update the
[1:22:39] task and things like that like there's a
[1:22:40] there's a lot of that experience of
[1:22:42] where we do our work in meetings that we
[1:22:44] want to invest in making more seamless.
[1:22:46] Yeah. Uh, open eyes doing new hardware.
[1:22:48] Uh, would you ever ship one of these?
[1:22:50] >> Yeah, probably not.
[1:22:50] >> But, you know, this is meeting notes in
[1:22:53] person.
[1:22:53] >> Yeah. Yeah. I mean, I'd be excited about
[1:22:55] I mean, I'm excited about that that
[1:22:57] product category in general for sure.
[1:22:59] Yeah.
[1:22:59] >> I think it's like it's a it's a
[1:23:01] mechanism and it it one of those needs
[1:23:03] to work really well with notion. We
[1:23:05] would partner with whoever is building
[1:23:07] one of those.
[1:23:08] >> B they they bought Amazon. I don't know.
[1:23:10] I can't refer you. And there's like
[1:23:12] there's some wild companies doing like
[1:23:13] really cool things that come to our
[1:23:15] partnerships team that I like to sit in
[1:23:17] on the demos of of wearables. I always
[1:23:19] like to sit in on the demos because I
[1:23:20] think they're pretty cool and all of
[1:23:22] them want to make sure not just notion
[1:23:24] but like you can imagine the ones that
[1:23:25] talk to you um being able to do search
[1:23:28] and build context. So like if you're
[1:23:29] entering like a conference um being able
[1:23:31] to like do like look at your CRM and do
[1:23:33] things like that um and you can utilize
[1:23:35] the notion agent to do that. So we are
[1:23:37] in like the very beginnings of those
[1:23:38] partnerships. I think what's unique
[1:23:39] about that particular technology is it
[1:23:41] goes against what I talked about with
[1:23:42] custom agents right now which is the
[1:23:44] more simple it is the harder it is to
[1:23:46] have like advanced controls over its
[1:23:47] capabilities right and so that would be
[1:23:50] a great investment for data capture but
[1:23:52] not necessarily like our agent who's
[1:23:54] workless
[1:23:54] >> it's a little bit of a different slice
[1:23:55] of the problem I would say like that's
[1:23:57] going to be deeply personal like like
[1:23:58] your company's not going to force you to
[1:24:00] wear a wrist wristband right I think
[1:24:02] >> it's good to hear that for me from you
[1:24:05] >> yeah
[1:24:07] the the CEO is going to force everyone
[1:24:08] to respect. I mean, the slice of the
[1:24:10] problem that that we care about is like,
[1:24:11] you know,
[1:24:12] >> can the company have all the context of
[1:24:14] what everyone said at every single
[1:24:15] meeting and then use that to to to
[1:24:18] derive value for themselves.
[1:24:20] >> That kind of reminds me, I remember once
[1:24:21] you very strongly reminded me, our job
[1:24:24] is to not make the best harness for
[1:24:27] agentic work. Our job is to be the best
[1:24:29] place where people collaborate. It's
[1:24:32] like our job isn't to build the best
[1:24:34] wearable to capture meeting notes. Our
[1:24:36] job is to build the best place where
[1:24:37] meeting notes live, right?
[1:24:39] >> Yeah. So, basically, you're saying
[1:24:40] everyone else can just pipe to you and
[1:24:42] that's fine, right? Yeah.
[1:24:43] >> Yeah.
[1:24:43] >> Yeah. That's that's a reasonable thing.
[1:24:45] All I will say is that people there's
[1:24:47] people walking around with notion
[1:24:48] tattoos on them. They they'll wear
[1:24:49] Notion anything. So, just I don't know,
[1:24:51] do a limited run.
[1:24:52] >> Yeah. Yeah. No, I mean, well,
[1:24:55] >> we have such understated swag that the
[1:24:57] idea like our swag has so few Notion
[1:24:59] logos on it. The idea that people have
[1:25:01] notion tattoos is pretty antithesis to
[1:25:03] our design principles. That's pretty
[1:25:04] funny.
[1:25:07] Do you have one?
[1:25:08] >> No. No, they're not. I do not have
[1:25:10] notion that do. I've I've seen them.
[1:25:12] Yeah.
[1:25:12] >> Cool. Uh well, thank you so much. This
[1:25:14] is such a great deep dive. Actually, the
[1:25:16] chemistry between you two is amazing.
[1:25:17] Like I I can't believe like
[1:25:18] >> we work together a lot.
[1:25:21] >> Different jobs work closely.
[1:25:22] >> Yeah.
[1:25:23] >> That's it. Yeah. Thank you. Thank you.
[1:25:25] >> Thank you.