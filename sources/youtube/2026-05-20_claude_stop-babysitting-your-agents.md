---
title: "Stop babysitting your agents"
source_type: "youtube"
channel: "Claude"
date: "2026-05-20"
url: "https://www.youtube.com/watch?v=wI0ptqCSL0I"
pillar: "building"
tags: [claude-code, agents, workflow, verification, automation, best-practices]
ingested: "2026-05-27"
extraction_method: "whisper-local"
video_id: "wI0ptqCSL0I"
duration: "37:07"
---

# Stop babysitting your agents

[00:00] Good afternoon, everybody. My name is Sid Bindisaria. I'm one of the founding engineers of Claude Code.
[00:21] And today I'm excited to be here to talk to you guys about how you can stop babysitting your agents.
[00:30] As models have been getting smarter, I've noticed that we're increasingly spending a larger
[00:36] percentage of our time staring at the screen waiting for Claude to finish his work or just
[00:42] acting as a glorified QA tester for Claude. And this can be quite unsatisfying and also just an
[00:50] inefficient use of your time. And my goal for this talk is to give you strategies and help you take
[00:59] back some of this time so that you can manage your agents better. You can also think of this
[01:07] as a more advanced Claude Code talk. So, a Claude Code 301 type university class.
[01:16] And because of that, we have some prerequisites and some table stakes that everyone here should
[01:23] have at least heard about if not implemented for your own projects. Starting with a very high
[01:29] quality ClaudeMD file. This is the single highest leverage thing that you can do to improve your
[01:35] Claude Code experience. So, if you haven't done this yet, I highly encourage you to try it out.
[01:40] Number two is connecting your tools to Claude Code. A good rule of thumb is that if a tool is
[01:47] useful for you in your day-to-day life, it will also be useful for Claude. So, things like Slack,
[01:55] Asana, Linear, Datadog, BigQuery.
[01:59] All of these things help Claude stitch together a much richer context for itself. And it's able to
[02:04] perform much better if you give it access to these tools. And finally, setting up your remote
[02:10] environment on Claude Code Web. This makes it so that the compute that's running your Claude Code
[02:18] is separated or decoupled from your laptop. So, you can close your laptop, your laptop could die,
[02:24] you could spill some water on your laptop, and your Claude Code sessions will still continue
[02:28] because they're running in the cloud. I'd love to see a show of hands here.
[02:34] How many people use Claude Code every day? Okay. That's almost everyone. How many people have
[02:44] completed the first two things here? So, high-quality ClaudeMD, and you've connected
[02:49] your tools? Okay. It's about 50%, I'd say. And then how many people have done all three?
[02:58] Okay. If you haven't raised your hand at all, don't worry. You'll still get some
[03:03] value out of this talk. But I would encourage you to start with these three things first.
[03:12] Okay. So, why does your tooling need to change?
[03:17] Most software tooling so far was built with humans in mind. Whether it's linters, IDEs, type checkers,
[03:28] compilers, they were mostly written with the goal of making humans and human teams faster.
[03:36] But the problem now is that humans aren't writing most of our code anymore. It's agents. So,
[03:44] we have to take a step back, zoom out, and reconsider our tooling.
[03:48] And when you do that, there's some good news and then there's some bad news.
[03:54] The good news is that a lot of these tools that we've built for ourselves,
[03:58] translate over pretty well for agents as well.
[04:02] So things like prettiers and linters and symbol servers,
[04:06] Claude and agents can end up using these things quite effectively,
[04:10] and they serve them pretty well.
[04:12] But the bad news is that we also have blind spots.
[04:18] As human beings, we have some assumptions
[04:21] that we make about our tooling and our tool chain
[04:23] that Claude doesn't have.
[04:25] And for that reason, it's important to ask the question,
[04:29] what does an agent need from your code base
[04:31] that a human takes for granted?
[04:34] And I'd love for you guys to keep that question in mind
[04:37] as we continue to the rest of the talk,
[04:39] because it kind of frames the goal
[04:42] of not babysitting your agents as much
[04:45] in a much more clear way.
[04:49] So this is our roadmap for today.
[04:52] We'll be talking about three distinct tools
[04:55] or three distinct things that build on top of each other.
[04:59] And when you take all of these three things together,
[05:01] they become incredibly powerful
[05:03] and give you a set of tools that can help you work in a way
[05:07] that we just haven't worked before as human beings.
[05:12] So we'll be talking about verification,
[05:14] which is how to teach Claude to check its own work.
[05:19] Once Claude can check its own work and be more reliable,
[05:22] we can now run many Claudes at the same time.
[05:25] And be confident that they'll be doing the right thing.
[05:28] So we'll be talking about strategies for multi-Clauding
[05:30] or parallelizing your work.
[05:32] And then finally, we'll end with background loops.
[05:35] And background loops are a way for you
[05:37] to completely take your keyboard out of the hot bath.
[05:41] So your keyboard is not the bottleneck anymore,
[05:43] and Claude just keeps running in the background in a loop,
[05:46] doing useful work for you.
[05:54] Thank you.
[05:55] Thank you.
[05:55] Thank you.
[05:55] Thank you.
[05:55] So I'd like to start the verification section
[05:58] with a brainstorm for a minute or so.
[06:02] I'd like everyone here to think about the last software project
[06:06] or feature that you worked on.
[06:08] And while you were working on that feature,
[06:11] how did you check your own work?
[06:13] And I don't just mean how did you check the final output of your work,
[06:16] but I also mean how did you iterate on your work
[06:19] in a way that gave you confidence
[06:21] that you will end up in a place where you're expecting to go?
[06:25] So let's take 30 seconds.
[06:27] If you have a pen and paper in front of you,
[06:29] feel free to jot this down.
[06:30] If you have a laptop and you want to put this in your notes,
[06:33] let's take 30 seconds together and just come up with
[06:35] your last project and kind of how you verified your work there.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:40] Okay.
[06:41] Okay.
[06:41] Okay.
[06:41] Okay.
[06:41] Okay.
[06:41] Okay.
[06:55] Okay.
[07:06] Okay.
[07:06] I see some typing slowing down.
[07:08] So hopefully you've had a chance to think about it a little bit.
[07:13] It's okay if you haven't completely.
[07:14] But I've found that most software engineering tasks
[07:18] can be broken down into the series of steps that you see on the screen.
[07:25] So, some combination or sequence or subset of these things enable you to check your own
[07:33] work and build software.
[07:35] So, you kind of start with designing and writing code.
[07:40] You then usually end up building your code, running your compilers, type checkers, et cetera.
[07:45] If they fail, you kind of go back and change your code again and do that in a loop.
[07:50] Then you might run your executable, whether that's a Docker container or a CLI application
[07:56] or a web server.
[07:59] And then you might check for side effects.
[08:00] So, if you're running a web server, you might spin up your browser and you might see if
[08:05] the UI elements are showing up in the correct place.
[08:08] You might even look for logs to see if it's a specific log that you're looking for present
[08:14] in your logs.
[08:16] Or you might check the database to see what the state is and if state has been manipulated
[08:19] correctly.
[08:20] And then hopefully you'll run unit tests to make sure that you haven't made any regressions
[08:25] and your feature hasn't broken some other feature.
[08:29] And hopefully you also add a new unit test for the thing that you're working on.
[08:34] And then finally you deploy the staging.
[08:36] Or if you're really brave, you go straight to prod.
[08:40] And that's usually how humans kind of verify their work and build software.
[08:45] And what's interesting is that the same exact playbook can be used by Claude.
[08:50] Quite effectively to also verify its own work and build software.
[08:56] So, as we go through the rest of this presentation, it's helpful to think about teaching Claude
[09:03] how to do things in a similar way that you would do them.
[09:08] And the only thing that's required is giving Claude the right tools and instruction set
[09:12] to make this possible.
[09:14] Okay.
[09:16] So, we've talked about verification.
[09:20] How humans do verification and how Claude should theoretically do verification.
[09:26] But loops are really what makes the whole thing go around.
[09:31] And this is arguably the most important slide in this presentation.
[09:35] So, if you haven't been paying attention yet, this is a good time to get started.
[09:41] A loop essentially is an autonomous circuit that you can complete for Claude.
[09:47] And it allows Claude to hill climb.
[09:49] Okay.
[09:50] He'll climb on a given task or a given success criteria.
[09:54] So, you can think about it as giving Claude access to tools to verify its own work and
[10:01] to write code.
[10:02] And what Claude will do is it will write some code.
[10:05] It will check if there's a failure.
[10:07] If there's a failure, it will debug that failure and write some more code.
[10:10] And then it keeps doing that in a loop again and again and again until it gets to a success
[10:15] state.
[10:16] And when it finally gets to a success state, you can be confident that the PR that it's
[10:20] sending you is higher quality and will actually work.
[10:25] So, in this image that you see on the screen, I faced an issue recently on my personal website.
[10:32] The sign-up button stopped working.
[10:35] And what I told Claude was to make the sign-up button work.
[10:38] And this is kind of what it did.
[10:40] There's more steps here, too.
[10:41] But for brevity's sake, it basically started writing some code.
[10:46] It built my app.
[10:48] It clicked my sign-up button.
[10:49] It opened up a browser.
[10:50] And saw that clicking the sign-up button isn't really doing anything.
[10:54] It doesn't take you anywhere.
[10:56] So then it decided to read some logs.
[10:58] And it found out what the problem was.
[11:01] It fixed the code, reloaded the app, and kept doing that until it got to a successful state.
[11:07] And finally, what it came up with was a PR that indeed worked.
[11:11] So the most important thing to take away from this slide is that wherever possible, our
[11:17] goal now is to get Claude into a loop.
[11:20] By giving it the tools and instructions that are required for it to work effectively.
[11:28] So verification comes in many flavors.
[11:31] We talked about UX verification.
[11:33] But you can have back-end verification.
[11:35] You may want to verify your entire app end-to-end, including infra.
[11:40] And the core concept here remains the same.
[11:42] You want to give Claude the tools and the instructions to get it into a loop.
[11:47] And once you kind of figure that piece out.
[11:50] All three of these flavors kind of merge into one.
[11:54] You don't have to be very specific about the instructions you give Claude.
[11:57] As long as it has all the right tools and instructions, it will be able to verify all
[12:01] of these things.
[12:05] So we've talked a lot about theory.
[12:06] And we've talked a lot about hypotheticals and jargon.
[12:10] But I wanted this slide to be a little bit more concrete.
[12:13] So what does it actually mean to give Claude the instructions and the tools to make it
[12:18] go in a loop?
[12:20] And it usually boils down to, like, four things.
[12:22] And I'll go through the front-end or UX section from this slide.
[12:26] The first thing is to run your application.
[12:29] So for a front-end application or a front-end verification loop, this might correspond to
[12:36] running your dev server.
[12:37] So running npm run start or whatever your dev server might be, it just spins up a dev
[12:43] server.
[12:44] Once the dev server is up, you want Claude to actually use the web server.
[12:48] And the way it does that is by opening up the web server.
[12:50] My personal MCP tool of choice for this is the Claude and Chrome MCP tool.
[12:56] You can access this with slash Chrome if you're using Claude code.
[13:01] You can also use Playwright or there's a bunch of other browser control MCPs that you can
[13:04] use to do that.
[13:07] Once Claude can drive your browser, the next step is to prove that something works.
[13:15] So if it's a fix it's working on, you want to take a screenshot before the fix.
[13:20] After the fix and make sure that it's the right state.
[13:25] And finally, there's unblocking it.
[13:29] So if you've ever tried to create a verification loop in a production app, you'll very quickly
[13:34] find that there are some blockers you run into.
[13:39] And some of the common blockers are, for example, auth and state.
[13:44] So auth basically means, you know, you want to give Claude an identity that it can log
[13:49] into.
[13:49] To your web application so it can actually start to use your app.
[13:53] And then state means you may want to preconfigure some state.
[13:56] For example, if you have, like, an e-commerce store, you may want to populate the inventory
[14:00] for that store for Claude to be able to, like, use your app meaningfully.
[14:05] And this isn't very novel.
[14:07] In fact, in traditional software engineering, too, when you write end-to-end tests, writing
[14:11] these state setup scripts are quite common.
[14:14] The only difference here is that you want to give Claude access to these scripts.
[14:19] And you want to make them dynamic.
[14:20] You don't want to be too prescriptive about what these scripts are doing.
[14:24] And that allows Claude to do a much wider variety of things than you can do with static
[14:29] scripts.
[14:31] Okay.
[14:35] So we know what a verification loop now is.
[14:37] We know how to write one.
[14:39] How do you package it?
[14:40] How do you distribute this script to your colleagues, to your coworkers, even to your
[14:44] future self?
[14:46] And one of the best ways of doing this is by using a skill.
[14:49] Okay.
[14:49] So you can think of a skill as just a way to store some arbitrary context about a specific
[14:55] topic.
[14:56] And in this case, that topic happens to be a verification loop.
[15:02] The interesting thing about skills also is that you can make them self-improving.
[15:06] So if you put in instructions into your skill about improving the skill every time Claude
[15:11] hits a blocker, you will end up creating this self-documenting, self-improving skill which
[15:19] everyone on your team can contribute to, not just you.
[15:21] And this makes it really powerful.
[15:23] This is actually how we do verification in the Claude Code team as well.
[15:26] We have a single verification skill.
[15:29] And the skill is explicitly told to keep documenting itself.
[15:34] So every time someone runs into a blocker, the skill will go back in and edit itself
[15:40] so that next time when you or your colleague run into the same issue, it's not a problem.
[15:46] Okay.
[15:47] So...
[15:48] We're going to jump into a demo next.
[15:52] But before the demo, I want to talk about what the application that I'm going to be
[15:56] using.
[15:57] There is a type tester application called monkey type.
[16:03] How many of you have heard of monkey type?
[16:05] Okay.
[16:06] I thought so.
[16:07] It's a niche community.
[16:09] But it's basically a type tester where it shows you a bunch of words, as you can see.
[16:14] And you have to type those words as accurately and as fast as possible.
[16:18] And the application just tracks your stats for you.
[16:22] I like this as a demo app because it is representative of a real world full stack app.
[16:29] It's written in TypeScript with an express back end and MongoDB and Redis as persistence
[16:34] layers.
[16:36] And it's open source.
[16:37] So, you know, you guys can go to monkeytype.com right now.
[16:39] You can even check out the source code if you want.
[16:42] But what we'll be doing in this demo is we'll be creating a verification loop live.
[16:46] So, you know, we'll tell Claude to do this.
[16:48] We'll tell Claude to spin up a new dev server.
[16:50] We'll tell it to kind of go and use the Chrome MCP to check some of its work.
[16:56] And then once we create the verification skill, we'll also create a new feature and
[17:01] ask Claude to use the verification skill to verify itself.
[17:05] So, let's get started with the demo.
[17:11] So, we can switch over to my laptop screen.
[17:14] Okay.
[17:15] So, let's get started.
[17:18] So, this is a brand new Cloud Code session.
[17:21] I've already done the homework of setting up monkey type locally.
[17:25] I've also installed some dependencies and curated a CloudMD because I didn't want to
[17:29] do that in front of you guys and waste your time.
[17:31] So, let's tell Claude to spin up the dev server.
[17:38] Okay.
[17:40] So, it says the dev server is already running.
[17:44] And that's right.
[17:45] Because I started it right before our talk.
[17:47] Okay.
[17:48] So, let's go and check out what's on the front end.
[17:52] So, if we go here, monkey type opens up.
[17:57] I can start typing.
[17:59] And there's a little timer that shows up.
[18:01] I'm not very good at typing.
[18:02] So, there's a lot of typos here.
[18:04] But it's essentially what I would expect.
[18:08] Let's also check out the back end link.
[18:12] This just returns a JSON.
[18:14] And it just basically means that the back end is open.
[18:15] Okay.
[18:16] Okay.
[18:17] Okay.
[18:18] So, I can see that the back end is up and running, which is good.
[18:22] The next thing I'm going to do, is I'm going to make sure that my Chrome MCP is enabled.
[18:26] And the way you do that is to slash Chrome.
[18:31] And as you can see here, it says status enabled, extension installed, which is exactly what
[18:35] we're looking for.
[18:36] If you don't have it installed, it will take you to another set-up guide and you can install
[18:39] it for yourselves.
[18:43] Now I'm going to say use the Chrome MCP to make sure.
[18:45] Oh.
[18:46] Okay.
[18:47] make sure that the front end is working. Make it quick, please. Okay. And what we should see now
[19:00] is that this is the tab that cloud is using. And it should call the Chrome MCP tool. So if you go
[19:11] back here, we can see two Chrome MCP tool calls. I can control O and see exactly what it did. So it
[19:19] navigated to localhost 3000, and then it's looking at the contents of the tab, which is great.
[19:27] But we want to do something more exciting. Just looking at a static web page isn't very helpful.
[19:32] So let's say, can you, actually, before I do that, I'm going to
[19:38] resize these so you guys can see what's
[19:41] happening in the background. Okay. Can you try typing and make sure everything works?
[19:58] Okay. So cloud apparently is also not very good at typing.
[20:04] But it typed in something and it says that typing works. That's great. Let's do one more thing.
[20:10] Let's say
[20:11] So I want to use the settings and change something.
[20:23] Okay. So it navigated to the settings page.
[20:27] And it's changing the difficulty to expert, not a good idea, based on how it performed.
[20:38] Okay. And it claims that the settings are not good. It says that this is the best way to update.
[20:40] the setting is persisted and it's able to to verify that so that's great this
[20:47] is what we did so far is we just held Claude's hand and told it exactly what
[20:51] to do so you were like spin up the dev server go and do these like two or three
[20:55] things that we care about and that's basically verification right what I can
[21:01] do next is I can tell Claude to take all the learnings from this session and put
[21:05] it into a skill file so I can say take everything we learned and put it into a
[21:14] skill file in top Claude demo verification I didn't have to give it
[21:23] the full path but I chose to anyway okay let's see it wants to create a new
[21:29] directory
[21:35] okay so it's now proceeding to write a fairly large skill.md file and if you
[21:44] look at what's inside this file we'll just skim through it real quick it says
[21:48] number one bring up the stack which is basically what we did it has some
[21:52] commands to do that so it has docker compose blah blah blah then it loads up
[21:58] the Chrome MCP tools because that's what it we told it to do next and then
[22:03] finally there's a smoke test where it tells you what you have to do next and
[22:05] then finally there's a smoke test where it tells you what you have to do next
[22:05] where it's using the browser tools to actually check its own work so I'm gonna
[22:12] go ahead and say yes great so that must have looked quite simple and it really
[22:19] is creating a verification loop is simple I did there were a few blockers
[22:25] that came up along the way when I was setting up this demo we don't have to
[22:29] talk about those right now but I'm sure that if you if you were to do this
[22:32] yourself you can probably get this up and running within five to ten minutes
[22:35] what I'll do next is you know because both Claude and I are so bad at typing
[22:41] I'm gonna tell Claude to make a confetti animation every time I mistype
[22:48] and then use the verification skill that we just created to verify its own
[22:51] work so let's say every time I mistype please show me a confetti animation and
[23:05] use the skill that we just created to verify your work
[23:21] okay so it's gonna do its thing figure out where to write this code and then
[23:29] hopefully the demo gods will be with us tonight
[23:35] okay so it wants to write some files I'm gonna switch on auto mode so it
[24:00] doesn't have to ask me for every file edit
[24:04] okay this is interesting so it created the feature and then it realized that
[24:26] there were a couple of lint errors so you see this like Oh excellent errors to
[24:31] two and then it proceeded to fix the
[24:33] lint errors to two and then it proceeded to fix the
[24:34] errors next and then it's verifying itself again so you see the
[24:41] verification loop in action now where it's it wrote some code it encountered
[24:48] some issues it fixed those issues but I think some more code and it kind of went
[24:53] in a circle doing that until it came to a good state so let's just test it out
[24:58] ourselves as well
[25:02] okay it's still working so let's test it out ourselves as well okay it's still
[25:03] doing something let's let's let it stop
[25:33] okay so we do see the confetti showing up it put us on expert mode which is why
[25:44] it keeps disappearing on me but effectively Claude was able to do the
[25:48] job and fix fix its own lint errors I won't we're running short of time so I'm
[25:56] not gonna let this finish but hopefully that gives you a taste of what how
[26:00] powerful a verification loop can be and how
[26:03] Claude can continue to hill climb on a task if you give it the right
[26:06] instructions and tools to do so let's switch back over to the slides now the
[26:14] key takeaway here is you know you should try to hold Claude's hand and show
[26:20] it show it how to do verification and once you've taught it how to do
[26:26] verification it can very easily summarize those
[26:29] learnings into a skill file which you can then package and distribute and
[26:33] uh for your future self and for for your teammates
[26:41] okay so now that we have mastered verification uh we can graduate to
[26:49] multi-clotting or parallelizing our work more effectively
[26:55] the the problem that arises when you try to run too many Claude instances at the same time is that they
[27:03] just eat at your attention and your attention is a scarce resource I personally find that more than
[27:08] four to five sessions open simultaneously takes a big load on my on my on my brain and I I can't
[27:15] really function beyond that so what are some ways that we can scale that and what are some ways that
[27:21] some strategies we can use to multi-cloud more effectively um there's four things that we'll
[27:28] talk about today um there's the Claude code desktop app which provides
[27:33] a GUI and makes it easier to to manage multiple sessions there is agent view so if you love the
[27:42] terminal like I do and you want to stay in the terminal then we have Claude agents that provide
[27:48] you some of the same benefits of the desktop app inside the terminal you can also run Claude in the
[27:56] cloud so if you run it on on our website Claude is now running in our cloud as opposed to your desk to
[28:03] your laptop and finally there's remote control which is my favorite feature and we'll talk more
[28:08] about this when we get to it so this is a screenshot of what the desktop app looks like
[28:14] um on the left you have a sidebar and the sidebar has all your sessions across all surfaces so it
[28:21] has your sessions that are running locally in the terminal it has your sessions running in the cloud
[28:26] it has your sessions running in all get repos and so it becomes the central control plane for for
[28:33] working with with Claude and your sessions uh you can also uh pin sessions you can rename them you
[28:41] can color your sessions differently and all of these things effectively are just solving the
[28:45] problem of grabbing your attention right like if you rename a session to something that's memorable
[28:50] to you when you come back to it you know what that session was doing um so these are all kind
[28:56] of ways to just make uh make your attention uh more protect your attention more
[29:03] um if you love the terminal uh this used to be how uh you would multi-cloud um this is a setup of
[29:13] uh of how I used to multi-cloud at least I used to have a tmux window manager with uh with four
[29:19] panes and each pane would work on a different work tree uh this works honestly uh but it is a
[29:26] lot to manage um who here knows what tmux is okay great that's a lot of people
[29:33] and who here knows what work trees are great about 50 percent um so you have to kind of manage work
[29:41] trees and tmux yourself uh which works and you know I I think I'm used to it now but it's also
[29:48] not the most convenient thing we can do better and what we arrived at was cloud agents uh this
[29:57] is a feature that we released I think a week ago maybe a little bit more than a week and the way
[30:01] you access it is
[30:03] uh just say cloud agents instead of cloud and it opens up this view which is very similar to
[30:09] the desktop sidebar that we saw before and this view lists all your sessions that are running on
[30:15] your local computer it also sorts them by the degree of attention that they require so if a
[30:23] session needs your immediate attention and if it's blocked on let's say a permission prompt or
[30:27] a question or some input that it needs from you it'll show up right at the top if a session is
[30:32] running or if a session
[30:33] has completed its uh its desired success state it'll it'll be further down you can also customize
[30:39] it so you can again pin sessions you can rename sessions you can reorder them and again this is
[30:44] a way to just manage manage your workload and manage your attention a little bit better
[30:53] cloud code on the web this we've talked about this a little bit but the main goal here is how do you
[31:03] run your cloud code sessions I find it quite annoying that when I'm walking from meeting
[31:07] to meeting I have to have my laptop open and just walk like this everywhere when I'm driving back
[31:14] home I'm also annoyed because you know there's no there's no internet and I can't leave my laptop
[31:20] open in my in my car so having your sessions be running in the cloud is is really nice you don't
[31:26] have to worry about the compute that it's actually running on and if you if you haven't given cloud code on the web so you can run sections now right?
[31:33] Just go to Cloud AI slash code and it's pretty easy to get started.
[31:42] And finally, remote control.
[31:44] As I said earlier, this is my favorite feature.
[31:47] And remote control essentially gives you the option to control any session running on any
[31:53] surface with your phone.
[31:57] The way to get started with remote control is you just go to wherever you're running
[32:01] your Cloud Code session and say slash remote dash control.
[32:05] And once you do that, it will pop up on your mobile app.
[32:09] It will also send you notifications.
[32:11] So if Cloud needs some help from you or needs your input, your phone will buzz and you could
[32:16] be in your car, you could be, you know, doing whatever you want, and you could just, like,
[32:20] give Cloud the input that it needs.
[32:26] I am running short on time, so I'm going to skip this demo, unfortunately.
[32:31] But I was just going to say thank you.
[32:31] I wanted to show you Cloud Agents as part of this demo.
[32:33] So if you haven't given Cloud Agents a try, just give it a shot.
[32:41] Okay.
[32:44] So we've talked about how to make Cloud more reliable by making it or giving it the skills
[32:52] to verify its own work.
[32:55] We've also talked about how do you multi-Cloud more effectively.
[32:59] But even that isn't quite satisfying.
[33:01] You know, you still have to actually spin up a new session.
[33:04] You have to have a goal in mind, and, you know, whether it's on the desktop app or the
[33:09] terminal or web, you have to go and spin up a new session.
[33:13] How do you remove yourself from the loop even more?
[33:16] And that's what this next session is going to be about.
[33:21] So as software engineers, we have a lot of different tasks, and not all of these tasks
[33:28] are writing code for a specific new feature.
[33:31] Or a bug that you're working on.
[33:32] A lot of this is just bookkeeping in some ways.
[33:37] So personally, I'm spending a lot of my time now babysitting my PRs.
[33:42] I think we all have a lot more PRs now that we're able to generate with the help of Cloud
[33:47] and AI.
[33:48] And these PRs need to merge.
[33:50] But before merging, you need to get through your review comments.
[33:54] You need to get through merge conflicts.
[33:55] You need to get through CI failures.
[33:58] There's a lot that goes on.
[33:59] And if you have, like, 20 or 30 of these PRs.
[34:00] You're trying to merge in a day.
[34:02] You can easily end up spending hours on babysitting these.
[34:08] Updating docs is another good one.
[34:10] I think as we increase our velocity of shipping features and shipping fixes, we also need
[34:15] to keep up with docs.
[34:17] Similarly, triaging, monitoring feedback, and just in general keeping CI green, these
[34:22] are all things that you kind of need to do every day.
[34:26] But they don't necessarily need you in the loop.
[34:29] They just need to be running.
[34:30] They just need to be running in some sort of loop.
[34:34] And that's where the slash loop command comes in.
[34:38] So slash loop is a way to run a prompt at a specific interval in Cloud Code.
[34:46] So you can say slash loop 10 minutes and babysit my open PRs.
[34:51] And what this will do is the session that's running the slash command will wake up every
[34:57] 10 minutes.
[34:58] It will run this prompt.
[34:59] And if you have your Cloud MDs and your tools defined and set up correctly, it will be able
[35:04] to figure out what to do by itself.
[35:06] So you don't really have to be babysitting and monitoring your PRs manually.
[35:13] Routines.
[35:18] Routines are basically slash loop but running remotely.
[35:21] So we talked about Cloud Code on the web before and how that uses a remote container to run
[35:27] your sessions.
[35:28] Routines.
[35:29] Routines are basically live and work in the same containers.
[35:33] The way you set up routines is by going to the web app or the desktop app.
[35:36] You'll see a little routines tab out there.
[35:41] And you can set up a new routine quite easily.
[35:44] You can have a time-based trigger or you can have an event-based trigger.
[35:48] And both of those triggers can lead to a new Cloud Code session opening up with a specified
[35:54] prompt.
[35:55] So for example, we have a routine that updates our docs.
[35:59] Every day for the Cloud Code team.
[36:02] We also have a routine that looks at our issues and feedback that's coming in and posts on
[36:08] our Slack channel every six hours.
[36:11] So this can be quite useful to do kind of routine tasks that, you know, don't necessarily
[36:19] require you in the loop.
[36:24] Cool.
[36:26] So once you stack all of these three skills together.
[36:29] You kind of end up at this system which is able to do a lot of work even without you
[36:37] having to manually be on your keyboard.
[36:40] And that really is the ultimate goal is that you can kind of spend your attention and your
[36:44] time on the tasks that you care about.
[36:47] And everything else can just be delegated to Cloud and with high reliability and a high
[36:53] degree of confidence.
[36:54] Cool.
[36:56] So that's all I have for you guys.
[36:59] Thank you so much and I hope you enjoyed the talk.
