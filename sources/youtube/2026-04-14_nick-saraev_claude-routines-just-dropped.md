---
title: "Claude Routines Just Dropped, And It's Perfect"
source_type: "youtube"
channel: "Nick Saraev"
date: "2026-04-14"
url: "https://www.youtube.com/watch?v=j3aXJNu9804"
pillar: "building"
tags: [claude-code, agents, workflow, automation, how-to]
ingested: "2026-04-15"
extraction_method: "auto-captions"
video_id: "j3aXJNu9804"
duration: "18:07"
---

[00:00] Well, Anthropic just launched routines,
[00:02] which allows Claude to kick off
[00:03] automations via schedule, trigger, or
[00:05] even web hook. And this closes the loop
[00:07] and basically turns Claude into a
[00:09] dedicated automation platform competing
[00:11] with no code drag and drop builders like
[00:13] NADEN and others. In this video, I'm
[00:15] going to show you guys how you can build
[00:16] routines very quickly. I'm going to give
[00:18] you guys a couple of demos and I'm going
[00:19] to walk you through step by step setting
[00:21] up your own routines on both the Claude
[00:23] desktop interface as well as behind the
[00:25] scenes via API. Okay, so for the most
[00:27] prototypical example, I have a daily
[00:29] mailbox summary plus draft routine. And
[00:32] what I'm doing here is I just clicked
[00:34] run now because they have a little demo
[00:36] or test feature that allows you to
[00:37] actually run it and then see the inputs
[00:39] and outputs live. If I click on this
[00:41] little runs button, you'll see that all
[00:43] I've really done is I've just fed in a
[00:44] prompt. And this is the exact same thing
[00:46] as cloud code. It's just occurring on a
[00:48] standardized cloud container, not on my
[00:51] computer. And in this case, I'm just
[00:53] testing it using their interface, but
[00:54] you can also schedule it. You can have
[00:56] it trigger based off web hook. And then
[00:58] you can also send an API request to
[01:00] trigger it. And so you can trigger it
[01:01] based on incoming data. You can trigger
[01:02] it based off outgoing data. It's very
[01:04] powerful. If anybody has watched my
[01:06] previous video on Agentic Workflows,
[01:08] this is basically the standardized and
[01:10] enterprise version of Agentic Workflows.
[01:13] So this is now searching through Gmail
[01:14] emails. It's actually doing everything
[01:16] more or less that I would normally do if
[01:18] running this locally on my computer. The
[01:20] only difference being obviously that
[01:22] because it's occurring on the cloud,
[01:24] it's not something that I realistically
[01:25] am going to want to have to steer.
[01:27] Typically, you want to be a lot clear
[01:28] about the instructions and make sure
[01:29] that it has all the information that it
[01:31] needs. After that, it's just going to go
[01:33] through various tool calls and
[01:34] everything like that until it gets to
[01:36] the definition of done, which in my case
[01:38] is going to be, hey, once you're
[01:39] finished, use a Slack connector to send
[01:40] me an update. Now, on the Cloud Code
[01:42] docs page, the majority of the use cases
[01:44] are what I'd consider to be overly
[01:46] technical things like backlog
[01:47] maintenance, alert triage, bespoke code
[01:50] review. I mean, most people don't even
[01:51] know what any of the stuff means. Um,
[01:53] but I want you to know this is basically
[01:55] a standin replacement for automation.
[01:57] You can automate anything using this
[01:59] tool. And what's really cool is you can
[02:01] do it using natural language. So, what
[02:03] I've done is I've developed a cloud
[02:04] skill that you can import into your own
[02:05] workspace. Then you can just give that
[02:07] skill any pre-existing workflow whether
[02:09] it's in natural language written as an
[02:11] SOP or it's something on a no code tool
[02:14] like naden or make.com. Back to the
[02:16] skill page here. You can see it's found
[02:18] two unreads. The thing is I don't really
[02:20] care about this because if you think
[02:21] about it, this is the conversation
[02:22] thread. What I want to do is I want to
[02:24] see this Slack update that was sent to
[02:26] my DMs because you know if I'm using
[02:27] this like a traditional automation,
[02:29] that's where I'd probably be getting the
[02:30] notification. So, if I go, I actually
[02:32] see I did receive a notification at
[02:34] 12:01 where it pulled my own reds and
[02:36] then it fed me the information as well
[02:38] as like a highle summary along with a
[02:40] polite decline that it drafted as well
[02:42] as an acceptance for for this one. And I
[02:45] can go on to my email and I can actually
[02:46] open up the drafts and I could I could
[02:47] see them all as well. And just because
[02:49] I'm trying not to dox all of these
[02:50] people too hard, um, you know, in this
[02:52] case, I immediately drafted, hey Corey,
[02:54] thanks for reaching out. Tell the other
[02:55] Nick I own one. Happy to come on. Send
[02:57] over a few time slots that work on your
[02:59] end. Uh, and then I just removed the two
[03:00] email, but that was previously
[03:01] populated. Okay, so that's probably the
[03:03] simplest example of a demo. And I just
[03:06] did all this stuff uh live using the
[03:08] test feature because I wanted to show
[03:09] you that that's how it works. But you
[03:11] can also schedule it. And then you can
[03:12] also fire things off based off web hooks
[03:14] and API calls. So what I'm going to do
[03:16] next is I'm very quickly going to show
[03:17] you how the scheduling feature works.
[03:18] And then after I'm going to show you how
[03:20] you can use triggers like web hooks and
[03:22] so on and so forth to run your routines.
[03:24] Once we're done with that, I'll actually
[03:25] walk through like the UX and show you
[03:27] guys uh more of the deep dive behind how
[03:29] this works. So anyway, for scheduling
[03:31] purposes, all I need to do is go back to
[03:33] the routine that I made a moment ago. I
[03:35] click on this little button here, and
[03:36] then I can just select a different
[03:38] trigger. So in this case, I have call
[03:39] via API, but I could also click
[03:42] schedule. And as you see here, we have
[03:43] this little visual interface where I
[03:45] could select hourly, daily, and so on
[03:46] and so forth. Because this is going to
[03:48] be an email triage flow, I'm probably
[03:49] going to want to run this pretty early
[03:50] before I wake up. I'm waking up around
[03:52] 5:20 these days, so it'll probably be
[03:53] about 510. And what I should note is you
[03:56] can add multiple of these triggers at
[03:57] any point in time. So now after saving,
[04:00] if I go back to routines, you'll see
[04:01] there's a little calendar feature here.
[04:03] And you can now see that there's a daily
[04:05] mailbox summary plus draft opened at
[04:07] 5:10, as well as a couple of other ones
[04:09] that I was playing around with earlier
[04:10] today. You don't have to pay attention
[04:11] to those. What that means is without me
[04:13] having to do anything, the exact same
[04:15] exercise is going to occur. The agent is
[04:17] going to check my mailbox using the
[04:19] Gmail connector. It's going to run
[04:20] through whatever SOP or logic that I
[04:22] gave it, which in this case was just,
[04:23] hey, go see if we've had any previous
[04:25] email communicate. And then it's going
[04:26] to draft up the message and send it to
[04:28] me in Slack. Okay. What I have here is
[04:30] another routine. This one takes a
[04:32] transcript that is generated using
[04:34] Fireflies, which is a transcript service
[04:36] that joins your call, listens to what
[04:38] you say, and then basically stores it
[04:40] all as text. And essentially what I'm
[04:42] going to do just for the purposes of
[04:43] this demo is I'm going to do it via API
[04:45] request, but I'm going to show you guys
[04:47] as well how you can hook it up via web
[04:48] hook so it just fires automatically. So
[04:50] I have my transcript to proposal routine
[04:52] right over here. And I could click run
[04:54] now, but there's no actual transcript.
[04:55] The instructions here are I give you a
[04:57] transcript via API call. So what I'm
[04:59] going to do is I'm going to open up a
[05:00] cloud code instance. I'm just going to
[05:02] have it send an API request using uh
[05:05] this transcript.
[05:07] And then I'm just going to press enter.
[05:09] And I'm not going to expand this because
[05:10] I've just hard-coded an API key for uh
[05:12] demo purposes. But you can see here what
[05:14] it's going to start off by doing is
[05:16] basically sending that curl request as a
[05:19] text payload and then also generating
[05:21] the proposal entirely on its own. And
[05:23] when this occurs, it's actually going to
[05:24] trigger that routine. I guess I already
[05:27] just leaked my API key. Whatever the
[05:29] hell. Um it's going to fire that
[05:31] routine, which it's done right over
[05:32] here. And now it's actually running in
[05:34] the cloud with the full transcript and
[05:35] whatever the deal terms are of the, you
[05:37] know, conversation. And so I can
[05:39] actually open this up and then I can see
[05:41] what's going on. So you can see I give
[05:42] you a transcript via API call. I want
[05:44] you to create a full proposal using one
[05:46] of my other AI agents in a managed
[05:48] session. And this is where managed
[05:49] sessions come in handy, which if you
[05:51] guys didn't know is just a similar way
[05:52] that you could set up different
[05:54] endpoints out there that allow AI to
[05:56] basically create an an interconnected
[05:59] network of managed agents or agents that
[06:01] all have their own siloed containers
[06:03] both for security and then safety
[06:05] purposes. So, it's just verifying that
[06:06] we actually have what we need for Slack.
[06:08] And now it's going to go ahead and
[06:09] generate a high-quality proposal. Now, I
[06:11] just want to be clear about what problem
[06:13] exactly this solves. The old way of
[06:15] designing automations typically involved
[06:17] some sort of event or outside trigger
[06:20] like a schedule, maybe something that
[06:22] occurred, you know, at 5:00 a.m. every
[06:24] morning or whatever. That event would be
[06:26] fed into a platform like NAN, which was
[06:29] responsible for basically proceeding
[06:31] through a chain of logic that you
[06:33] created. You know, it' be a bunch of
[06:35] drag and drop uh nodes that you put
[06:37] together to do some function. In this
[06:39] case, this is a Reddit scraper for a
[06:41] live build that I did for one of my
[06:42] communities. And see this whole section
[06:45] in the middle here, this logic, this can
[06:47] take a fair amount of time to put
[06:48] together. You know, you have to drag and
[06:49] drop all these nodes, you have to set up
[06:51] all of these credentials, you have to do
[06:52] all the authentication, you got to get
[06:54] the data and and map the right variables
[06:56] and the fields. This is really like
[06:57] where the meat and potatoes of your work
[06:59] as somebody that was looking to automate
[07:00] your business um um came in. Okay? And
[07:03] then from there, your NAD system,
[07:05] typically, it doesn't just like work by
[07:06] itself. It does something to some
[07:08] platform, right? So it'll then grab its
[07:10] output and then shove that into Slack or
[07:12] maybe some sort of CRM somewhere or
[07:14] whatever it is that you do, some
[07:15] database. The new way is basically the
[07:17] exact same thing. You have an event,
[07:19] okay? And that event is either an API
[07:21] call. It's a web hook or it's some sort
[07:23] of schedule. So again, you know, waking
[07:25] it up at 5:00 a.m. every morning. It's
[07:27] just instead of putting that into NADN
[07:28] and then having to build all that stuff
[07:30] yourself with those drag and drop nodes,
[07:32] all you have to do, okay, is just give
[07:34] it some natural language which is far
[07:37] easier obviously with some very high
[07:39] level instructions and then it can then
[07:41] output things as uh ND did before to you
[07:44] know some other platform Slack or CRM
[07:46] and so the reason why I'm equating it
[07:48] like this is because routines
[07:50] effectively solve that middle problem.
[07:52] Uh I've made some videos in the past to
[07:54] the tune of N8N is over because XYZ
[07:57] thing is now launched and it does it way
[07:58] better and you know sometimes a specific
[08:01] feature was missing that you know N8N or
[08:03] some other no code platform handled. Um
[08:05] that didn't make it an exactly one to
[08:06] one overlap but routines are uh cla's
[08:09] literal 1 to1 overlap. It replaces the
[08:11] exact same functionality. It's capable
[08:12] of scheduling. It's capable of
[08:14] orchestrating workflows and so on and so
[08:16] forth. And it really is like the next
[08:17] step in agentic uh execution of
[08:20] knowledge tasks. When all this stuff
[08:21] finishes, I actually have the proposal
[08:23] right over here. I can take a look at
[08:24] that. Click this button to open it in a
[08:26] new page. And you can see I now have the
[08:28] proposal, which is just part of the
[08:30] template of the manage agent that
[08:31] generates this thing. Pull out all of
[08:33] the data. So, you know, we're an AI
[08:35] content writing marketplace that matches
[08:37] business clients with vetted freelancer
[08:38] writers. And then this is leftclick,
[08:40] which you know is pitching them. And so,
[08:42] these are the sorts of proposals that we
[08:43] actually send day-to-day. And hopefully
[08:45] you guys see how easy it is to actually
[08:46] like integrate a routine or some sort of
[08:49] API eventbased system into your
[08:52] infrastructure in like two minutes. Uh
[08:55] boy, have we come a long way from back
[08:56] in the day when me designing that
[08:58] proposal generator would have taken like
[08:59] 2 and 1 half to 3 hours. The current UX
[09:02] for routines looks like this. And in
[09:03] order to get there, all you have to do
[09:05] is type in cloud.ai/code/
[09:08] routines. You'll be given a page that
[09:10] looks something like this where you can
[09:11] see all routines stored in a grid-like
[09:13] pattern over here alongside their title,
[09:16] the time that they are running, and then
[09:18] also the the next scheduled run as well
[09:20] as what looks like some category listing
[09:22] which they provide uh with or without
[09:24] you. There's also a calendar view and so
[09:26] you can see the actual ones that are
[09:28] going to be executed and exactly which
[09:29] times they're going to be executed. And
[09:31] so here I created a couple of demos,
[09:32] daily nicks, arrive mention scan,
[09:34] morning inbox drafts and news video
[09:36] ideas. You can see that today this one's
[09:38] going to execute at 651, this one at
[09:40] 7:43, and this one at 8:17. So, you also
[09:42] get a little bit of a visual aspect
[09:44] there. When you click new routine up in
[09:46] the top right, it'll immediately ask you
[09:47] for some information like the name. So,
[09:50] I'm just going to provide a quick demo
[09:51] here called mailbox drafter. Next, you
[09:54] can describe what Claude should do in
[09:55] each session. So, this is where you
[09:57] basically give it a prompt. And this
[09:58] prompt is essentially analogous to a
[10:00] skill. Just like in a skill, you have a
[10:02] standardized list of steps that you need
[10:04] the model to take in order to perform
[10:05] some economically valuable piece of work
[10:07] for you. Um, so too should you construct
[10:10] this routine description like a list of
[10:13] SOPs or steps to allow it to perform uh
[10:16] a tasks for you. It's just my
[10:17] recommendation here is be a little bit
[10:20] more precise than you are probably in
[10:22] your skill because whereas in your skill
[10:24] you could modify things on the fly,
[10:26] change your trajectory of the task and
[10:27] so on and so forth, here the routine
[10:29] occurs entirely hands-off, meaning that
[10:32] it basically needs to work almost
[10:33] perfectly every time. So decrease the
[10:36] total scope of possible messups and
[10:37] screw-ups that it could make by being as
[10:39] clear and precise as possible. But for
[10:41] instance, I wrote pull all of my unreads
[10:43] using the provided Gmail connector. More
[10:45] on that in a sec. For each unread, check
[10:47] if there's any pre-existing
[10:48] conversations with that contact. If so,
[10:50] pull those two for context. Then draft
[10:52] replies based on what you know about me
[10:54] and the context of the task. Once done,
[10:56] use the Slack connector. More on that in
[10:58] a second to send me an update. And so,
[11:01] as you can see here, um, you know, you
[11:03] can make this about as long or as as
[11:05] short as you want. I don't believe
[11:06] there's a length limit. I went and I
[11:07] checked just by pasting this a bunch of
[11:09] times and I couldn't find anything. So,
[11:11] I would definitely lean on the side of
[11:13] more contacts as opposed to less. From
[11:15] there, you can select a repository. So,
[11:17] whatever repository you want. I'm just
[11:18] going to say this business one. You can
[11:20] select a model type. So, I'm going to
[11:21] use Opus 4.61 mil. And then you can also
[11:24] select which cloud environment you want
[11:26] to run it in. And so, you can hear
[11:28] basically create a cloud environment
[11:29] with a bunch of environment variables,
[11:31] keys, uh, you know, API credentials and
[11:34] so on and so forth as needed. So, in my
[11:36] case, I'm fine with default. I'm just
[11:37] going to move on. You can then select a
[11:39] trigger. So, you can schedule it. You
[11:41] can go via GitHub event or you can go
[11:43] via API. Now, realistically, this is
[11:45] probably something you're going to want
[11:46] to do on a schedule since we are just
[11:48] going to be going through our on reds
[11:49] and then drafting. But for demonstration
[11:51] purposes, I'm just going to go via API.
[11:52] And the whole idea is by doing this,
[11:54] I'll be able to very quickly call and
[11:56] then test in another Cloud Code instance
[11:58] to show you guys what's happening live.
[12:00] So, I'm just going to add a trigger. And
[12:02] then once we've added said trigger,
[12:04] we're going to receive a little curl
[12:05] request, which is a snippet of code that
[12:07] you can give any model. And finally, now
[12:08] we just need to add our connector. So,
[12:10] here I'm going to click add connector.
[12:11] And then I'm going to connect my own
[12:12] Gmail. By the way, if you don't have a
[12:14] connector, just head on down to Claude
[12:16] code settings, then go to connectors
[12:18] over here. Then you can actually add uh
[12:20] just clicking on this little connect
[12:21] button. When you do, it'll ask to
[12:23] connect Claude to your Gmail account.
[12:25] You can click continue and then you can
[12:26] sign into the particular one that you
[12:27] want. So, in my case, this I'm also
[12:29] going to need one other connector if you
[12:31] guys think about it because I'm going to
[12:32] want a Slack message sent. So, here I
[12:34] can use this little search bar and then
[12:35] click a plus button. Then I'll just have
[12:37] to perform again some OOTH in a new
[12:38] browser tab. Here I'm going to click
[12:40] allow. And just like any simple OOTH
[12:42] screen, we're now going to be connected.
[12:44] So now what we can do is we can go back
[12:45] to the routine and then I can add the
[12:47] connector manually. From here, you'll be
[12:49] given a token. You can copy that token,
[12:51] store it somewhere safe. So that's what
[12:52] I'm going to do here. And now we
[12:54] basically have our skill or our routine
[12:57] ready to go. Okay. And then once you're
[12:59] done, just head over to the run now in
[13:01] the top right hand corner to basically
[13:02] start the workflow run. And uh we're
[13:04] just going to do this here using the GUI
[13:06] graphical user interface for testing
[13:08] purposes. But you'll see a new little
[13:09] run just populated. So I'm going to go
[13:11] down here and you'll see all we're
[13:12] really doing is we're just sending it
[13:14] this message. Once it's done, it'll use
[13:16] the Slack connector to send me an
[13:17] update. You can see it's already
[13:18] starting to fire off a tool search. So
[13:20] I'll just double back when it's done.
[13:21] And I should note, I mean, I'm watching
[13:22] it here, but the whole idea is that I
[13:24] don't even know that this thing's going
[13:25] on, right? This was triggered uh ideally
[13:28] on a schedule or something like that,
[13:29] and I just wake up in the morning to my
[13:31] Slack uh message with a bunch of
[13:33] different emails and their various
[13:34] drafts. If I head back over here, you
[13:37] can see that we actually have both of
[13:38] those fed in. Um, looks like somebody
[13:40] invited me for a podcast interview and
[13:42] then somebody else asked me a couple of
[13:44] questions about a few things here.
[13:46] Finally, I want to show you guys how
[13:47] easy it is to convert workflows that you
[13:49] built on third party tools like NAD, for
[13:51] instance, into routines. And what's
[13:54] really cool about NAND is they allow you
[13:56] just to like mouse over if you hold
[13:57] shift and then hold command C or just
[14:00] right click and press copy. And then now
[14:02] you basically have access to a bunch of
[14:03] JSON. And you could tell just by me
[14:05] pasting it in. This is like JSON or the
[14:07] syntax that these nodes are represented
[14:09] in if we're talking through text. Well,
[14:11] anyway, if I go back to anti-gravity,
[14:13] which contains my little cloud code
[14:14] window, and then I type in this JSON,
[14:17] and then at the very top, I say use the
[14:19] routine generator to turn this naden
[14:22] workflow into a routine. Okay, I'm just
[14:26] going to divide this to make it really
[14:27] simple. Uh what this is going to do is
[14:29] use the skill that I'm giving all of you
[14:30] guys out of the box to basically turn
[14:32] this into a flow that we can call just
[14:34] using natural language. So I'm not
[14:36] necessarily going to encourage you to
[14:37] use all of your workflows or to port
[14:39] them over from NADN or some other no
[14:41] code tool to uh claude's back end.
[14:43] Reason being is you know when you're
[14:44] dealing in the domain of tokens things
[14:46] are going to be a little bit more
[14:47] expensive than dealing entirely in the
[14:48] domain of compute. And really the point
[14:50] is not hey just turn all your nadn or
[14:53] make.com workflows into routines. The
[14:55] point is more like, you know, if you
[14:56] have something you can build today that
[14:58] previously would have taken you a couple
[15:00] of hours in NAN, might make more sense
[15:01] just to oneshot it as a routine. But,
[15:04] um, you know, what this will do really
[15:05] quickly is just go ahead and do the
[15:06] creation. So, as you guys can see here,
[15:08] it's doing some thinking. It's loading
[15:09] the routines. In this case, it's just
[15:11] going to schedule one cuz I didn't
[15:12] provide any context as to how I wanted
[15:13] to run it. Um, but yeah, here we go.
[15:15] It's now going to fetch stories from the
[15:16] HackerN Algolia API, extract the hits,
[15:19] format them into a markdown report, and
[15:21] commit it, which was what the actual
[15:22] flow was doing. So, just like this one
[15:24] here, if I click execute workflow, this
[15:27] goes through the scraper. It then
[15:28] generates a bunch of hits basically from
[15:31] um a website called Hacker News.
[15:33] HackerNews is the source here, which in
[15:35] this case is going to contain a bunch of
[15:37] different um comments like this one on
[15:38] how open source AI is the path forward.
[15:41] Certainly not when Claude drops a
[15:42] freaking update like this. Well, the
[15:44] same routine is going to work here the
[15:46] exact same way. And you can see it just
[15:47] said routine created and fired hacker
[15:49] use AI stories fetch, right? And what's
[15:51] really cool about this is I mean it's
[15:52] it's just so easy for me to to change
[15:55] things. Um so I mean right now this is
[15:57] obviously going to fetch that data,
[15:58] right? And you know fetching that data
[16:00] is okay, but what am I going to do with
[16:01] it? It's just sort of like stuck here,
[16:03] right? You know, if I were in NAD, I'd
[16:04] have to modify this. Uh it'd be
[16:06] significantly harder to modify this
[16:07] here. I can literally just go connectors
[16:10] Slack. Okay, save. I can then set it to
[16:12] run on, you know, 733 MDT or via API
[16:17] request, which I'm going to click done.
[16:18] And now what I can also do is I can go
[16:19] back here and I can say great, update
[16:21] this so that it sends me a message in
[16:24] Slack with the scrape after it's done.
[16:28] And now in 3 seconds, you know, it can
[16:30] make an HTTP request over to the routine
[16:32] and just edit it on the fly for me. I
[16:34] don't have to drag and drop any notes.
[16:35] It's much easier and much faster. Okay,
[16:37] so hopefully you guys can see that this
[16:39] has a lot of potential and you're likely
[16:42] to see larger and larger flows be passed
[16:44] off to agents in this manner. Um, I
[16:48] didn't really give you guys an
[16:49] extraordinarily comprehensive look at
[16:50] all the different things you could do
[16:51] with this, but just off the top of my
[16:53] head, some ways that I'm implementing
[16:55] this in my agency today, some ways that
[16:57] I've already done so, and some ways that
[16:58] I can I'm going to continue to do so
[17:00] after this video are I'm going to
[17:02] replace all of my proposal generators
[17:03] with these built-in routines. I'm going
[17:05] to connect a couple of additional
[17:07] routines so that after a call, like a a
[17:09] sales call with a prospect, um, I'll
[17:12] receive a web hook with um, essentially
[17:14] like a transcript. I'm going to feed
[17:15] that transcript into a routine that's
[17:17] going to generate an immediate post call
[17:18] email and then uh like a workflow
[17:21] diagram draft based on our conversations
[17:23] that I can also pin alongside it just
[17:25] for the impression of of more effort and
[17:27] higher perceived quality. Uh when we
[17:29] send out the proposal, I'm going to be
[17:30] monitoring to see if somebody's signed.
[17:32] When they do, it's going to route back
[17:33] to another routine via a web hook, which
[17:35] is going to proceed with the next step,
[17:37] which is sending them a message with an
[17:38] email with an onboarding uh you know,
[17:40] calendar notification, as well as
[17:42] congratulating them and thanking them on
[17:43] on coming aboard.
[17:45] You guys can automate more or less all
[17:46] of the non like human facetime steps in
[17:49] a business right now. And it's not like
[17:51] you couldn't before. It's just in order
[17:52] to do it before it was pretty laborious
[17:54] and you needed a fair amount of knowhow.
[17:55] Um now as long as you understand sort of
[17:57] the routine spec and more or less what
[17:58] I've showed you in this video, you guys
[18:00] are good to go. So it's an exciting time
[18:02] to be in AI and automation. Hopefully
[18:03] you guys appreciated this video. Looking
[18:05] forward to the next one. Catch y'all on
[18:06] it.
