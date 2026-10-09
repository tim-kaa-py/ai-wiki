---
title: "Claude Mods Is The Biggest Claude Code Upgrade Since Skills"
type: "youtube"
channel: "Chase AI"
date: "2026-10-02"
resource: "https://www.youtube.com/watch?v=Rn4nmFRPe0s"
pillar: "building"
tags: [claude-code, claude-mods, plugins, hooks, workflow]
timestamp: "2026-10-09"
extraction_method: "whisper-local"
video_id: "Rn4nmFRPe0s"
duration: "9:11"
---

# Claude Mods Is The Biggest Claude Code Upgrade Since Skills

## Transcript

[00:00] So Anthropic just gave us one of the biggest upgrades to Claude Code we have ever seen with the release of Claude Mods because we can now control and edit and customize Claude Code itself in a way we've never been able to before.
[00:14] In a move that makes you think of DeepSeek Harness, we are starting to move into the territory of everything is a plugin, but for Claude Code itself.
[00:22] We can rewrite events, we can change the UI, we can edit or create entire new features inside of Claude Code now.
[00:28] And the power of this cannot be understated. So today I'm going to explain how Claude Mods work, how you can start using them today, and then we're going to go through some actual use cases so you can start applying them to your workflows now.
[00:42] Now, Claude Mods are the release version of what was called function hooks at the beginning of last month.
[00:48] You might have seen this in early September when Boris Cherney was tweeting about this saying, "Hey, we're looking at different ways to make Claude Code more customizable."
[00:57] This wasn't available to everybody, they kind of messed around with this as a GitHub PR, but now this is a real live feature.
[01:06] Now there is almost no limit to what you can do with mods. As you see here, this guy created a mod where every time he's waiting for Claude to complete a task,
[01:14] it spins up a multiplayer Doom server that is filled with other people who are using Claude and also waiting for it to complete tasks.
[01:21] Or you could do something more practical and create live progress bars that show how your projects are coming along.
[01:27] So you have the leeway to create mods that make sense for your unique workflows, no matter what those are.
[01:33] But to do that effectively, we first need to understand how mods work.
[01:37] So mods change Claude's behavior. Anytime Claude is about to do something, we can create a mod that modifies what Claude would do.
[01:45] So for our example, let's say we are telling Claude that we want it to delete a specific folder, this build folder.
[01:51] Well, we can create one mod or a series of mods that changes that particular behavior.
[01:57] Now those mods can change it in a few different places.
[02:00] It can either change what happens before that event would get executed.
[02:04] We can change the event itself.
[02:07] So instead of deleting the folder, it does something else.
[02:10] Or we can change what happens after the fact.
[02:13] Furthermore, we can even sort of wrap this whole thing so we can have something that happens both before and after.
[02:20] So mods are extremely flexible.
[02:23] So for this delete thing, we could create a mod that says every single time Claude is about to delete something,
[02:29] it instead is going to pause and it's going to show us the 41 files it's about to delete inside this folder.
[02:36] So that's one version of a mod.
[02:38] Secondly, we could have a mod that instead of actually deleting these files permanently,
[02:43] it just sends them to the recycle bin instead.
[02:46] So we're changing like a fundamental way Claude handles something.
[02:49] Third, we could create a mod that anytime we delete something, it shows us a receipt saying,
[02:55] Hey, I deleted these 41 files and here's where those files were located.
[03:00] Fourth, we could wrap this up.
[03:02] So anytime we were going to delete something, we actually back it up first.
[03:06] And it gives us the ability to essentially do an undo control Z.
[03:09] So that's just four examples of like different mods that we could create for one single event, which would be like deleting something.
[03:18] And this was just meant to show you sort of like an example case that doesn't exactly what we're looking at today.
[03:23] But that's sort of the framework, right?
[03:25] Anything that Claude does, we can now change that we can edit fundamental behaviors that we really couldn't do before.
[03:31] We could kind of jerry rig it with like certain hooks and skills, but now we can really get into the plumbing of this harness and edit it as we see fit.
[03:40] Now, before we go over some actual mods, a quick word from today's sponsor, me.
[03:44] So inside of chase AI plus, I just released a brand new Claude code masterclass, and it is the number one way to go from zero to AI dev, no matter your technical background.
[03:53] It gets updates every single week.
[03:55] And you also get access to my custom AI OS, which not only runs on Claude code, but codex as well.
[04:01] So if you want to get a little bit more serious about AI, but need a little help, definitely check us out.
[04:06] There will be a link down in the pin comment.
[04:08] Now let's go over a few use cases for these mods, some example mods and how you would actually create them for yourself.
[04:14] Just as a heads up, they run on the plugin system.
[04:17] So if you do forward slash plugins, you'll be able to get access to all of your installed mods.
[04:22] If you're wondering like, Hey, where do these actually exist?
[04:25] And now let's hop into the first mod I want to showcase today.
[04:27] And that is the next steps mod.
[04:29] So you can see here at the bottom, I have a custom pane that has populated after I told Claude to create me a simple habit tracker application.
[04:39] And what has happened now is it is giving me a number of options, three options, in fact, for my next steps.
[04:47] So this is great.
[04:50] If you're someone who doesn't always know what your next move should be.
[04:54] And instead of prompting Claude manually me like, Hey, what do you think the next step should be?
[04:59] Or Hey, what do you think my options are for moving forward?
[05:02] This just automatically pops up and I don't even have to type anything.
[05:06] I don't have to write anything.
[05:07] I just click on it.
[05:08] So if I want to commit it or let's say I want to polish the design, I just put it in there and it goes to work.
[05:14] So this is essentially a play on sort of the prompting bar here at the bottom.
[05:20] Sometimes it has that preloaded prompt for you.
[05:22] Well, why just have one preloaded prompt?
[05:24] Why not have multiple?
[05:25] Because you might not know what sort of path you want to go down.
[05:28] This makes it very, very easy.
[05:29] You also notice that that was sort of a custom pane that populated here that just did not exist ever before.
[05:34] But now with this mod, it does.
[05:37] Another example of a mod I've essentially added onto my user interface inside the desktop app.
[05:42] And again, everything that works inside the desktop app also applies to the terminal.
[05:46] This is for both of them.
[05:48] I added something for my cache.
[05:50] As you know, having a warm cache is super important when it comes to cost and usage.
[05:55] If I don't have a back and forth with my Claude session for over an hour, if I'm on the subscription plan, I have to pay the max price to send the entire conversation back.
[06:07] So right now, my context window is 160K tokens.
[06:10] When I'm in the cache, I'm not paying full price to go back and forth because every single time you have a conversation, it sends the entire conversation back to Anthropik servers for every single message.
[06:20] You pay a huge like 95% discount if you have a warm cache, but that only lasts for an hour.
[06:26] And sometimes you just don't know how long it's been.
[06:29] This now tells me, hey, I have 43 minutes to go before the cache goes cold.
[06:34] And on top of that, it has a button for compaction.
[06:37] So let's say I was at like, you know, five minutes until I ran out of my warm cache and this context window is filling up and I might have to step away for a little bit.
[06:46] Well, all I have to do is click this and it's going to start compacting my conversation.
[06:52] And so these mods don't have to be some wild, huge workflow.
[06:56] It can be something as simple as this, essentially a custom status line adjacent thing that augments my user interface.
[07:04] But the most powerful cloud code mod is going to be the one that is custom built for you.
[07:09] And luckily, this is really easy to do.
[07:11] Building these mods is extremely simple.
[07:13] Cloud already understands how to generate them and how to install them.
[07:16] We just need to give it a little bit of direction.
[07:19] And that direction is going to come in the form of an audit.
[07:22] So the prompt you need to give cloud code should look something like this.
[07:25] Say, hey, audit how I use cloud code.
[07:28] Read my last 30 sessions.
[07:30] See what I ask for over and over.
[07:32] And then suggest five cloud code mods that would fix these issues.
[07:37] So I'm going to run it right now and see what it comes back with.
[07:41] So after taking a look at the transcripts, it came back with these five suggestions.
[07:45] One related to rehearsals for demos.
[07:48] Another one related to helping me keep track of my projects.
[07:52] And then the next few had to do with mods themselves.
[07:54] So a mod doctor, cash clock and an undo sort of module, as well as something for fixing dictation, which actually would be pretty useful.
[08:04] So you're going to get like five, maybe an honorable mention as well.
[08:07] And then from here, you can simply tell cloud, hey, I like the idea for mod number one.
[08:11] Let's go ahead and implement that.
[08:12] And it's simply going to create a plugin.
[08:14] It will install it.
[08:15] And then it's just going to tell you to reload the plugins and you're going to be off to the races.
[08:19] This isn't a skill that you have to invoke.
[08:21] It acts similar to a hook, which is automatically going to be done.
[08:24] You don't have to like prompt it.
[08:26] Nothing like once the mod is set, like it's just going to keep working until you uninstall the mod or you get rid of it.
[08:32] And again, you can just use natural language with Claude if you want to do that.
[08:36] Just say, hey, turn that mod off or remove it.
[08:38] So that's mods in a nutshell.
[08:39] I'm really excited about this one.
[08:41] I think in a few months time, we're going to see an ecosystem built around mods similar to how we see the skills ecosystem.
[08:47] This is going to grow exponentially.
[08:49] We're going to see a whole bunch of stuff being pushed to GitHub.
[08:51] But I think the best use case is going to be one that's unique to you in your workflow.
[08:56] So I highly, highly suggest you run that audit and see what it comes up with.
[09:00] So as always, let me know what you thought.
[09:04] Make sure to check out Chase AI Plus if you want to get your hands on my Cloud Code Masterclass.
[09:08] And other than that, I'll see you around.
