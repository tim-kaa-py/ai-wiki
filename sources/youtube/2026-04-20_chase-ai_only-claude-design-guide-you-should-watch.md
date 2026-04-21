---
title: "The ONLY Claude Design Guide You Should Watch"
source_type: "youtube"
channel: "Chase AI"
date: "2026-04-20"
url: "https://m.youtube.com/watch?v=iJRq1kLLRmY"
pillar: "building"
tags: [claude-design, claude-code, front-end, design-system, tutorial, workflow]
ingested: "2026-04-21"
extraction_method: "auto-captions"
video_id: "iJRq1kLLRmY"
duration: "24:46"
---

[00:00] Cloud design is the best thing to happen
[00:01] to your front-end work since skills came
[00:04] onto the scene. But if you don't know
[00:06] what you're doing, you will run through
[00:07] your entire usage quota before you can
[00:10] get a landing page up. But this Claude
[00:11] design masterass will help solve that
[00:13] problem as I show you which features are
[00:15] actually worth your time. On top of
[00:17] that, we will do a head-to-head test
[00:19] with normal Claude code versus cloud
[00:21] design, and we will talk about some of
[00:23] the interesting use cases that go beyond
[00:26] simple landing page work. This is an
[00:28] awesome tool and we have a lot to cover.
[00:30] So, let's hop in. So, cloud design is
[00:32] Anthropic's response to Stitch from
[00:35] Google. And just like Google Stitch, it
[00:37] gives us the ability to create a bunch
[00:39] of visual mock-ups for our web apps,
[00:41] mobile apps, and even slide decks. To
[00:43] access Cloud Design, it has to be on the
[00:45] web app. So, cloud.ai/design.
[00:47] It's not available in Cloud Code, and it
[00:49] is not available on the desktop app. And
[00:51] speaking of limitations, one big
[00:53] limitation we need to call out right
[00:54] away is the usage limits. It has its own
[00:57] weekly limit and it's the same limit
[00:59] whether you're on pro, max 5 or 20x. And
[01:02] this thing is a resource hog, especially
[01:06] if you use a certain tool we will talk
[01:08] about later in this video. But even with
[01:10] those limitations, Claude design is a
[01:13] huge leap forward when it comes to
[01:15] front-end design work with Claude.
[01:17] Things like the tweak system make it
[01:19] very easy to see how different changes
[01:21] would adjust the overall feel of your
[01:23] web app. Stuff like edit allows you to
[01:25] very quickly get into the weeds and
[01:28] change things on a granular level
[01:30] without relying on text prompts. But if
[01:31] you want to stick with the comment
[01:33] system, we can do that. They have an
[01:34] actual comment button where I can select
[01:36] individual parts of the web app and
[01:39] leave comments that either go straight
[01:40] to cloud code or get added to a comment
[01:44] queue for other members of my team to
[01:46] add their thoughts. Because this is very
[01:48] collaborative, you can share these
[01:49] designs with other people and you can
[01:51] all work on the same thing from
[01:52] different places. I can draw on the app
[01:54] to show what I want changed. I can very
[01:57] easily see the presentation in full
[01:59] screen. And most importantly, I can very
[02:03] easily export this to cloud code. And
[02:05] this design visual forward setup makes
[02:07] it so much easier to get the sort of
[02:10] front-end outputs you want instead of
[02:12] being purely inside of cloud code and
[02:13] having to do this code dev server
[02:16] refresh back to code dynamic we've had
[02:19] for a long time. But to get the most out
[02:20] of this tool, there are some things you
[02:22] got to know. So we are going to first
[02:24] start with front-end design work for a
[02:26] web app which is what most people are
[02:28] looking for and we will also show what
[02:31] claude code would have given us versus
[02:33] claude design so you can kind of see
[02:36] what we're getting here and if this is
[02:38] even worth it. But before we do that a
[02:40] quick word from our sponsor me. So, we
[02:42] just released the cloud code masterass
[02:44] inside of Chase AI plus and it is the
[02:45] number one way to go from zero to AI
[02:48] dev, especially if you don't come from a
[02:50] technical background. And lately we've
[02:52] been focusing on our agentic OS system
[02:54] inside of the masterclass where we use
[02:56] claude code as an engine and we
[02:58] supplement it with obsidian for memory
[03:00] with GWS to attach our entire Google
[03:03] suite and then with this foundation
[03:05] attaching any and all customized skill
[03:08] packs we can come up with that make
[03:10] sense for our use cases and we even talk
[03:13] about how to package that all and sell
[03:14] it to clients. So if that is something
[03:16] you're interested in definitely check it
[03:18] out. It's inside of Chase AI plus. There
[03:19] will be a link in the pin comment. So,
[03:21] let's talk claw design and your web app
[03:24] because there's a few decisions we need
[03:25] to make before we even start prompting
[03:27] this thing. And now, I'm going to be
[03:29] moving all over the screen during this
[03:31] video. So, bear with me. Now, first
[03:33] question we're going to ask oursel is,
[03:35] are we going to use a design system? So,
[03:39] here for me, you see none and you see an
[03:41] Aentic OS design system. Yours, we'll
[03:43] say none at first. If we want to create
[03:45] a design system, we're going to come up
[03:48] here and we're going to go to design
[03:49] systems. You probably won't have
[03:51] anything here and you will hit create.
[03:53] Now, what is a design system? Well,
[03:56] essentially it's like a visual template
[03:59] that you can apply to any project you
[04:02] create down the line. So, if you have
[04:04] specific fonts you use, specific logos,
[04:07] specific anything, even if it's just
[04:09] like a general mood, you can do that
[04:11] here. This is where you set that up so
[04:12] you don't have to repeat yourself for
[04:14] every single project. If you have some
[04:15] sort of like through line from a design
[04:18] visual standpoint. So you enter your
[04:21] company name and then you provide
[04:22] examples. Now this example these
[04:24] examples can be code. So I can link a
[04:26] GitHub repo. I can drag a folder into
[04:29] here. I can upload files. I can add
[04:31] fonts, assets, whatever. This is where
[04:34] you define your brand. Now
[04:38] caveat. This is what I was talking about
[04:40] when I was saying token hog. And by
[04:42] token hog, I mean running a design
[04:44] system will a take somewhere between 5
[04:47] and 15 minutes as it ingests everything.
[04:49] Kind of depends on the size. And b, this
[04:52] will take about 20 to 25% of your usage
[04:54] right off the rip. So understand that.
[04:57] Don't come in here thinking, "Oh, the
[04:58] first thing I'm going to do is just rip
[04:59] off like five design systems."
[05:00] Absolutely not. Absolutely not. Do one
[05:03] if you know what you want to do, and
[05:05] I'll I'll show you what it sort of looks
[05:06] like as we set that up. But don't do any
[05:09] more than that. At least not now until
[05:10] they up the limits, which they probably
[05:12] will in the future. So, resource hog,
[05:14] resource hog, resource hog. Don't get
[05:16] screwed by this. Now, if you do want to
[05:18] do this, you're just going to fill this
[05:19] all out, and then you'll hit continue to
[05:21] generation, and a pop-up box will show
[05:24] something like, hey, this is going to
[05:25] take 5 to 15 minutes. Once it completes
[05:27] ingesting all those assets, you will get
[05:29] something like this where it asks you to
[05:32] review the draft design system it came
[05:34] up with. What I fed it was the code for
[05:36] my agentic OS dashboard that I showed
[05:39] you a little bit earlier. It's got kind
[05:41] of these this clawed color theme. It's,
[05:43] you know, got specific text font, all
[05:45] that. So, this is what I fed it was
[05:47] essentially this sort of visual and it
[05:48] came back with all of this. So, hey,
[05:51] this looks good. This looks good. Hey,
[05:54] look at that mascot. Looks kind of
[05:55] familiar. That looks good. Voice goes
[05:58] through all the colors. So, it gets down
[06:01] and like very very like nitty-gritty of
[06:03] like, okay, like what do you want these
[06:06] colors to be? What do you want the cards
[06:07] to look like? It's very specific. It's
[06:08] really nice. And again, very reminiscent
[06:10] of Stitch. Very very reminiscent of this
[06:13] sort of thing. And so, I went ahead and
[06:15] improved everything. It's saying it's
[06:16] missing brand font. So, if I had
[06:18] specific fonts I always wanted to use, I
[06:20] can upload them as well. And at any
[06:22] point, I can come back here because it
[06:23] kind of broke down all the component
[06:25] stuff. click on it and then take a look
[06:28] and edit it as needed. And just like
[06:30] what you will see later with the actual
[06:32] landing pages and the slide decks and
[06:33] all that, we can share this right to a
[06:36] team or whatever or I can export it like
[06:39] PowerPoint, PDF, we can send it to
[06:40] Canva, HTML, cloud code. Really, really
[06:43] easy just one click away. Also, we have
[06:45] the actual design files. So, I can look
[06:47] inside here and see everything that's
[06:50] going on, the actual HTML files and all
[06:51] that themselves. So, there's a lot you
[06:53] can customize and play around here. It
[06:55] is not a black box at all where it's
[06:57] like, well, I hope Claude, you know,
[06:58] design came up with something good. Who
[06:59] knows what's going on underneath the
[07:01] surface. No, you you have insight like
[07:03] this is all code like this is a cool way
[07:05] for it to make code and we can take that
[07:07] code into our own local machine at any
[07:09] moment. We're not stuck here. And so to
[07:11] bring it back to claw design and web
[07:13] apps, that's the first question we're
[07:14] answering. Are we going to use a design
[07:16] system? Is this something in the same
[07:18] vein visually of what we've done in the
[07:19] past? And more importantly, did you even
[07:21] create a design system at all? Have you
[07:22] given up your 20% of your weekly tokens
[07:25] to the anthropic gods in order to even
[07:27] have this option? Now, for this demo,
[07:29] we're just going to stick with none. So,
[07:30] we're all operating on the same sheet of
[07:32] music. The next question becomes, hey,
[07:34] do I want to do a wireframe or do I want
[07:36] to do high fidelity? Chances are you'll
[07:38] want to do high fidelity. So, you can
[07:39] see what it's actually going to look
[07:41] like. But again, hey, if you want to do
[07:42] wireframe, you can always go back and
[07:44] forth. You aren't stuck to one or the
[07:45] other. But for this, we'll do high
[07:46] fidelity. So, we'll call this CD demo.
[07:49] And we're going to create. Then it's
[07:51] going to bring us here and ask us for
[07:52] context. So do you have that design
[07:54] system or just a screenshot or a
[07:56] codebase or a Figma file? Regardless if
[07:59] you are starting from scratch at step
[08:01] zero or if you have a codebase you want
[08:03] to feed it something. Ideally if you
[08:05] have a codebase like we talked about
[08:07] you've already been working on an app
[08:08] give it to this. Give it to claw design.
[08:10] It's going to work better. But even if
[08:12] you aren't and you're starting from
[08:13] zero, I highly suggest at a minimum you
[08:16] go out there in the world and you find
[08:18] some sort of inspiration you like.
[08:20] Whether that's from dribble or awards or
[08:22] godly websites, anything, right?
[08:25] Starting from a blank slate and
[08:26] expecting claw design to do all the
[08:28] heavy lifting cuz I bet your prompt will
[08:29] suck. Just understand the less context
[08:32] you give it, the higher chance you have
[08:34] a regression to the mean. So just
[08:35] understand that going in. We have the
[08:37] ability to do sketches. So, you know, we
[08:39] can actually draw on here and be like,
[08:41] okay,
[08:42] here's our image. I want the text
[08:47] over here,
[08:49] and then I want the hero image.
[08:55] Hero image
[08:58] over here. And then let's do
[09:02] scroll
[09:04] leaning banner.
[09:11] So give it something even if it's some,
[09:13] you know, brilliant piece of art like
[09:14] this. And you can do a lot more than
[09:16] just that. We can switch the pen, right?
[09:18] We can put in text. I can put in
[09:19] different like I can add sticky notes.
[09:22] So there's there's a lot to do here. And
[09:25] from here, you just got to prompt the
[09:27] thing. You also have the ability to
[09:29] change up the model. Opus 4.7 is what I
[09:32] would suggest because especially if
[09:34] you're adding stuff like screenshots,
[09:35] Opus 4.7 has the highest fidelity and
[09:38] the highest resolutions for the
[09:39] screenshot 3x what you are getting with
[09:41] Opus 4.6. So now let's give it a prompt.
[09:44] I'm saying build a landing page for
[09:45] Argus, a social media intelligence
[09:47] platform that helps creators spot
[09:49] trending topics in their niche before
[09:50] they blow up. And it's a layout, you
[09:53] know, pretty much mirroring what you
[09:54] wrote here. So that is as lame of a
[09:57] prompt as we can give it. Basic SAS type
[10:00] thing. So, let's see what it comes up
[10:01] with. And here's what Claw Design came
[10:03] up with with a very minimal prompt and
[10:05] no context outside of us just scribbling
[10:07] on the page. And it's this, which I
[10:09] think is decent for a first pass. In
[10:13] terms of usage, usage alert, 4%. Took 4%
[10:17] of our total weekly usage to gen up this
[10:19] landing page. And here's what Cloud Code
[10:21] gave us with the exact same prompt using
[10:23] the front-end design skill as well. Not
[10:25] bad. I mean, some minor things we can
[10:27] rip on right away, which is like, hey,
[10:28] the text is cut off here and here.
[10:32] There's not as much wrong on this one.
[10:35] Text does get kind of overlapped here.
[10:39] It shows rising now down here, which
[10:42] also kind of overlaps, but pretty close.
[10:45] I mean, to be honest, I like the design
[10:46] one a little bit more, but I could see
[10:48] someone liking this one a little more as
[10:50] well. So, first pass, not a massive
[10:52] difference. So, why use claw design?
[10:54] Where does it begin to pull away? Well,
[10:55] begins to pull away when we begin
[10:57] talking about variations and being able
[11:00] to iterate. And you see that right away
[11:02] with tweaks. So, the ability for me to
[11:04] do this, right, is a big thing. Me being
[11:07] able to change the headline very quickly
[11:10] or see the ticker and we can expand upon
[11:15] this as well. So, I wrote increase the
[11:17] amount of tweaks aggressively. I want to
[11:18] be able to play around with this as much
[11:20] as possible. So, let's see what it comes
[11:21] back with. All right. So now we can see
[11:23] it added way more tweaks for us to mess
[11:27] with and what was the usage rate adding
[11:30] all these tweaks added 7%. So you can
[11:33] you can see that just from adding a
[11:36] landing page and like 14 tweaks we've
[11:38] already used up what is that about 11%
[11:40] of our total. Now I think the tweaks is
[11:42] important. I talked earlier in the intro
[11:44] like what are the features we actually
[11:46] want to hone in on when it comes to claw
[11:47] design because when we just did the
[11:49] oneshot it wasn't crazy different than
[11:51] what I got with the front of design
[11:52] skill. Well, these tweaks and the
[11:54] ability to mess with all these things
[11:56] and these subtle changes quickly, right?
[11:59] That that is really the power of claw
[12:02] design. So, I'm going to zoom out a
[12:03] little bit so we can see the tweaks in
[12:04] action a little bit better. But I can do
[12:06] everything now from the pallet to the
[12:09] accents, corner radius, background grid,
[12:12] no background grid, fonts, emphasis,
[12:16] headline differences, layout switches.
[12:19] Right? This is the power here. The power
[12:21] isn't like, oh, it can oneshot the UI
[12:23] design, and the UI design off the rip is
[12:25] so good. No, it's the fact that I can
[12:26] actually iterate very quickly. Very
[12:29] quickly. This is, think of how fast I'm
[12:32] doing this. And think how fast it would
[12:34] take to run through all of this inside
[12:36] of cloud code. I mean, we can even
[12:37] change the niche of what like social
[12:40] media thing it's looking at in this
[12:42] image from AI and tech to gaming to
[12:45] finance. Thank god I can adjust the
[12:47] ticker speed because this thing was
[12:48] flying. Um, but yeah, this is awesome.
[12:52] This is part one. And I think there's
[12:54] two things. Well, actually there's a few
[12:55] more than that, but tweaks I think is
[12:57] the number one value ad from design
[12:59] because it's all about visual iteration.
[13:01] And in my opinion, the second most
[13:03] impactful feature of claw design is the
[13:06] variance of the web pages. So tweaks is
[13:08] very micro, right? Like we're talking
[13:10] like colors, we're talking accents,
[13:11] we're talking talking fonts. But what if
[13:13] I want variations of the landing page as
[13:16] a whole? Like go crazy with it. I'm not
[13:18] talking about a different font. I'm
[13:20] talking about a completely different
[13:21] design. And I want to be able to see
[13:22] them stacked up again just like I can do
[13:24] with Stitch. I want to be able to do
[13:26] this. Well, we can do that inside of
[13:28] Claw Design. And it's really easy. We're
[13:29] just going to prompt it to do exactly
[13:31] that. So I prompted design and said,
[13:33] "Can you now create two more variants of
[13:36] this landing page that I can click
[13:37] between that are wildly different
[13:39] styles? Suggest the different variant
[13:40] styles to me first." So it came back
[13:43] with six different options for me. We
[13:44] can do terminal Bloomberg terminal
[13:47] style, hypermaximal, editorial,
[13:50] brutalist, synth wave, soft pastel, or
[13:54] print newspaper. Let's go. Yeah, I kind
[13:58] of like one and two. So, I'll say let's
[14:00] do one and two. And obviously keep the
[14:05] current layout up as well. So, claw
[14:09] design finished up with the variant. So,
[14:10] here's the editorial one, the one we
[14:12] started with. We now have a terminal
[14:16] option
[14:18] as well as a editorial maximal option,
[14:21] which kind of kind of interesting,
[14:23] something different. Now, if you don't
[14:25] tell it to, it's only going to do the
[14:27] tweaks for the original. So, when you do
[14:29] these variants, I think the general
[14:31] workflow should be is you first start
[14:34] with the variants, you know, so on a
[14:35] macro level, you're thinking, okay, I
[14:38] kind of want to go in this direction.
[14:39] And then once you choose one of these
[14:41] macro ones, say we decided to stick with
[14:43] what we liked, then you would go into
[14:45] the very aggressive tweak stage so you
[14:48] can kind of see everything and drill
[14:49] down on what you want. Because with the
[14:52] way the usage is set up now, if you go
[14:55] macro and you say, I don't want just
[14:56] three options, I want four, five
[14:58] variants and I want tweaks on all of
[15:00] them, you're just going to burn through
[15:01] your usage because adding these two
[15:03] variants, maximal and terminal, that was
[15:04] an extra 5%. So that brings up to about
[15:07] I think we're at 17% now for landing
[15:10] page, two variations of landing page
[15:12] plus tweaks. And I know I keep harping
[15:14] on the usage, but for a lot of people,
[15:15] this is a big deal and and it should be.
[15:17] I think down the line this will probably
[15:18] change the whole US thing, but just have
[15:20] it in mind. And so what these two things
[15:21] buy you in tandem, this variance
[15:25] into tweaks is it allows us to get to a
[15:29] 80% solution, a 90% solution. Now I can
[15:33] get even more hyperfocused on this. You
[15:35] know, we can go up here like I showed
[15:36] you in the beginning. We can do edits.
[15:39] So I can like click on this top header.
[15:42] I can change the opacity. I can change
[15:43] the width, the color, all that stuff. So
[15:45] we we can get really really specific if
[15:47] we want to, but the real power comes
[15:48] from hitting that 90% solution being
[15:50] like, okay, I like the editorial first
[15:53] one. You know, I like the emphasis being
[15:55] on the mark being a that ring looks
[15:57] terrible being a mark. I like, you know,
[16:01] this specific subhead, this headline,
[16:03] whatever. And then be like, all right,
[16:04] we're going to go with that. We like the
[16:06] tweaks. Now, let's knock out the rest of
[16:08] the landing page because this is just
[16:10] the hero section. And then what you do
[16:12] is you then export this to cloud code.
[16:14] You hand this off to cloud code. When I
[16:16] click this, you have a few options. You
[16:17] can download the zip or you just copy
[16:19] this command and you bring it inside of
[16:21] cloud code. And I think this sort of
[16:23] workflow is infinitely faster than being
[16:26] here, which is what cloud code gave us
[16:28] with the same exact prompt and being
[16:30] like, okay, all right, cloud code, let's
[16:33] mess with the color now. Let's do a few
[16:36] variations. Let's mess with the headline
[16:38] now and do a few variations. That can
[16:39] take hours versus this took minutes. And
[16:44] I, at least for me, like I need to see
[16:46] things and I need to see a bunch of
[16:48] options before I actually see what I
[16:50] like. And better yet, chances are once I
[16:52] see something, I I might change it
[16:53] because to be honest, if they're seeing
[16:54] this, I kind of like the super vertical
[16:56] one. Maybe we do some sort of icons
[16:58] here, whatever. Like I I just want to
[17:00] iterate. I just want to see different
[17:02] stuff. So those are the two biggest best
[17:04] practices I can give you when it comes
[17:06] to the web app portion of this. Macro,
[17:09] right? Ask for variations. and then
[17:12] micro ask for more tweets. The one thing
[17:14] we didn't do here, and we'll show that
[17:15] in things like the slide deck and things
[17:18] like that, is asking it to essentially
[17:21] run through its own plan mode. So, we
[17:23] gave it the prompt and right away it
[17:24] spit this out at us. What we could have
[17:25] done instead say, "Hey, I kind of want
[17:27] to do a plan mode with you. I want you
[17:28] to ask me a bunch of questions." And it
[17:30] will instead run you through a
[17:32] significant amount of questions, like
[17:33] five, eight, 10 questions about like,
[17:35] "Okay, what do you want here? What do
[17:37] you want there? What do you want there?"
[17:38] That way, you don't have to do as many
[17:39] iterations. And ultimately it saves you
[17:42] usage. And I went through this same sort
[17:44] of flow when I was creating the front
[17:46] end for my Aentic OS dashboard. You can
[17:48] see up here, this is what I originally
[17:49] started with and then I was able to kind
[17:52] of go through all these different
[17:53] options. I eventually landed on this
[17:54] one, the cockpit one, although I thought
[17:56] about doing this one with the cool
[17:58] sprite. And then I just brought this
[17:59] version back into Claude Code and then
[18:01] made minor adjustments on the margins
[18:03] and actually like hooked it up so it was
[18:05] a proper web app. Now let's do claw
[18:07] design and slide deck. We'll run through
[18:09] this a little faster because a lot of
[18:10] the fundamentals that we went over when
[18:13] it comes to web apps also apply to slide
[18:15] decks as well. So I won't belabor these
[18:17] points. And this time we will show off
[18:19] the design system at work. And remember
[18:21] that system is based upon the visuals
[18:24] from our agentic operating system. So
[18:26] we're going to go ahead and hit create.
[18:27] And what do we see? The same setup as
[18:30] before and something asking you to
[18:31] provide context whether that's
[18:33] screenshots, code bases or Figma files.
[18:34] Now the only context we are going to
[18:36] give it is the design system that's
[18:38] already there as well as a prompt saying
[18:41] we want a slide deck that talks about
[18:44] the differences between cloud design and
[18:47] Google stitch and I had 4.7 in another
[18:51] window with cloud code come up with the
[18:54] prompt. So I had to do a web search and
[18:55] be like hey here's sort of the
[18:56] differences between the two. Now, at the
[18:58] end, I wrote before you build anything,
[19:01] ask me whatever questions you have so
[19:02] we're on the same page. So, in a sense,
[19:05] we're almost like forcing it to do kind
[19:07] of like a plan mode. And so, you see
[19:09] this populating here. Again, you can
[19:10] have this like forced plan mode totally
[19:13] occur when you do web apps as well. Just
[19:15] make sure you put it in the initial
[19:15] prompt. So, who's this deck for? Let's
[19:18] say it's for a public talk.
[19:22] Uh, we'll say we'll keep it short and
[19:24] sweet. We'll put it at six. We'll do
[19:26] five minutes. We'll do five slides.
[19:29] We'll do slightly opinionated title
[19:32] style centerpiece
[19:35] 2 by two positioning map. Call out
[19:37] price. Yes.
[19:40] And then we'll just go through the rest
[19:42] of these. No notes. And so all in all,
[19:44] it asks us 1 2 3 4 5 6 7 8 9 10 11 12 13
[19:50] 14 15 14 questions plus, you know, a
[19:55] little catchall down here, which I
[19:57] really like. Again, Claude Codes plan
[19:59] mode sometimes will do I feel like at
[20:01] most, you know, a few like two
[20:03] iterations of four questions each. So
[20:05] this is great. And here's a look at the
[20:07] slide deck. I put it in full screen and
[20:09] for reference, this took 5% of our
[20:12] usage. So about 1% per slide. So we got
[20:16] the title page, little footnote about
[20:18] the deck being generated by Claude
[20:20] Design.
[20:22] We got the numbers,
[20:25] you know, where they land. Wh got sort
[20:27] of a graph showing where they land in
[20:30] terms of cost. Obviously design being
[20:33] way more expensive. field report
[20:37] and then gives us sort of a hey here's a
[20:39] little chart showing what you should use
[20:41] for what use case. So I think the slide
[20:44] deck looks pretty sick to be honest with
[20:46] you. But more importantly than that it's
[20:48] stuck with the design system. This
[20:49] agentic OS that the whole design system
[20:52] was built on is definitely reflected in
[20:55] the deck. These two things look like
[20:57] they came from the same place. And just
[20:59] like with the web app we can go through
[21:01] the same workflow. this was the original
[21:04] it gave us. Now we can ask for macro
[21:06] variance and say okay did we actually
[21:08] want to stick with you know our design
[21:11] system or do we want to go an entirely
[21:12] different direction okay we see you know
[21:14] two three four different variants all
[21:16] right let's hone in on one and now let's
[21:18] bring in the tweaks and really fine-tune
[21:20] this thing and that's sort of how I
[21:22] think you should approach slide deck
[21:23] same way we approach web apps now for
[21:25] reference here is the slide deck that
[21:27] claude code produced us I gave it the
[21:29] exact same prompt and I created this
[21:32] from the same directory the agentic OS
[21:35] system live. So, it had full access to
[21:37] the same design system, so to speak. On
[21:39] top of that, I also asked it to ask me
[21:42] question. It only asked me seven and the
[21:44] questions, to be honest, weren't as
[21:45] good. They were a bit more surface level
[21:47] in terms of like, well, slide count and
[21:49] what do you want the aspect ratio to be
[21:51] versus what we saw in the design. And I
[21:53] think that's reflected in overall a much
[21:55] more bland output. And I'm kind of
[21:58] surprised it wasn't closer in terms of
[22:00] visual style compared to what design
[22:02] gave us. I mean, it's it's not bad. I
[22:05] mean, the colors are close, the text is
[22:06] close, but I mean, let's be serious.
[22:10] This kind of blows it out of the water,
[22:12] if we're going to be honest. Lastly,
[22:14] let's talk about mobile app design. And
[22:15] you have two options here. One, you're
[22:18] going straight mobile. You're not doing
[22:20] any web app stuff. And it's pretty
[22:22] simple. You're just going to do what we
[22:23] did with the web app portion at the
[22:25] beginning of this video, and you're just
[22:26] going to say the beginning, this is for
[22:28] a mobile app. Make sure the visuals
[22:31] reflect that. But if you're taking a web
[22:33] app and you then want to translate that
[22:34] into a mobile platform, it's pretty
[22:36] simple. While we could stay here in
[22:38] this, you know, prompt window we're at
[22:40] like, "All right, now show it to me in
[22:41] mobile." It probably makes more sense to
[22:43] have a separate project with the exact
[22:45] same stuff going on, but now we have a
[22:47] clear delineation between the web app
[22:49] where we're working on versus the
[22:50] mobile. And so to do that, you're just
[22:52] going to come to the top right where it
[22:53] says share.
[22:55] And then you're going to hit duplicate
[22:57] project. Once you do that, it'll take
[22:58] you to a page like this. But if you go
[23:00] back to the homepage, we can now see
[23:02] that there is a CD demo remix. And that
[23:05] remix is the duplicated project. And so
[23:08] now I'm just going to prompt it and say,
[23:10] can you show me the same design in a
[23:12] mobile format? And here's the mobile
[23:14] versions it gave us. It went ahead and
[23:16] created variants of all three. I didn't
[23:18] specify that, but it did it. So it gave
[23:20] us essentially nine mock-ups, and total
[23:22] cost was 5% of usage. So same flow as
[23:26] usual. It gave us the macro right here.
[23:29] So, we would pick which one we liked.
[23:30] Obviously, be whichever one you decided
[23:31] for your web app. And then from there,
[23:33] we would say, "Hey, I like the editorial
[23:35] one. Now, bring up a bunch of tweaks, so
[23:37] I can really nail this." But truth be
[23:39] told, if you got everything set up on
[23:41] the web app version, chances are you
[23:43] already did the tweaks, so there
[23:45] shouldn't be too much you need to change
[23:47] at this point. But there's always a
[23:50] little, you know, you always run into
[23:51] issues when you go from standard web app
[23:53] to a mobile design. But like you see
[23:55] here, really easy to do. Just a single
[23:57] prompt. So, that's where I'm going to
[23:58] leave you guys for today. I hope I was
[24:00] able to illuminate the differences
[24:02] between Claude Design and Claude Code,
[24:04] especially highlighting the features
[24:06] that really make us our money inside of
[24:08] Claw Design. That being tweaks and that
[24:10] being the variance. And really, what it
[24:12] buys us is iteration speed. I can go
[24:15] through a ton of different versions of
[24:17] whatever I'm trying to create so I can
[24:19] finally land on something I like. And
[24:21] once I do that, then I pull it into the
[24:24] Cloud Code ecosystem. And I hope I was
[24:25] able to make the usage costs a little
[24:27] more clear by calling out the
[24:29] percentages we lost after every single
[24:32] iteration in creation. So, as always,
[24:34] let me know what you thought. Definitely
[24:35] be on the lookout for more cloud design
[24:37] material because I think this is a super
[24:39] cool tool. Make sure to check out Chase
[24:42] AI Plus if you want to get your hands on
[24:43] the cloud code master class and I'll see
[24:45] you
