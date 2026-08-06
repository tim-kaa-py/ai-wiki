---
title: "Opus 5 Is Exhausting. Anthropic Reveals The Fix."
type: "youtube"
channel: "Ray Amjad"
date: "2026-08-05"
resource: "https://www.youtube.com/watch?v=szjakRcw7V0"
pillar: "building"
tags: [claude-code, output-styles, workflow, how-to]
timestamp: "2026-08-06"
extraction_method: "manual-captions"
video_id: "szjakRcw7V0"
duration: "5:56"
---

# Opus 5 Is Exhausting. Anthropic Reveals The Fix. — Transcript

[00:00] Okay, so one of the biggest problems that you've 
likely been facing with Opus 5 recently is the
[00:04] fact it's really confusing when outputting any 
text. So for example, over here I was chatting
[00:09] about some ideas and it basically said, "The 
corpus is an engine. Angles come from what
[00:14] you've already ingested." And I read through 
a lot of this output and I'm kind of like,
[00:18] what on earth does this even mean? I have no idea. 
It feels like my English has become weaker or it's
[00:24] speaking another language. And I know I'm not the 
only one feeling this way because there's a pretty
[00:28] recent viral blog post where basically the author 
says, "Reading AI output is extra effort. It's
[00:34] verbose, frequently contains all too plausible 
nonsense, and it is increasingly jargon-dense."
[00:39] And recently they got this output from Claude, 
which I would not even try reading. And it said,
[00:44] "I had to look up every single word to make sense 
of this." And basically the solution that someone
[00:48] from the Claude Code team recommended is using 
output styles. And I actually did make a video
[00:53] about this inside of my agentic coding school. 
Almost like 8, 9 months ago now, back in October
[00:58] when it was released, but I haven't really used it 
since. So if I go over to output styles over here,
[01:03] I basically start out the video by saying that 
this is a feature that I don't use much, but it
[01:07] does exist. But I have been using it more and more 
because this helps get around the fact that Opus 5
[01:11] is really annoying when it comes to outputting. 
So I'm going to quickly go through how we can
[01:15] set this up over here. So this will be down below 
so you can literally just copy the text. But she
[01:20] essentially says that she likes to use this after 
a long day, Honestly helps so much. And it seems
[01:25] that some of the team members like using different 
output styles for either different projects,
[01:29] different tasks, or even at different times of the 
day, depending on how tired they're feeling or how
[01:34] engaged in the process they want to be. So it's 
not a case of you make one output style, then you
[01:39] set it once. You will be switching back and forth 
between them over time. So anyways, I'll quickly
[01:43] go through how you can set this up. Basically, 
this will be down below, so you can literally just
[01:47] copy the text. Then go over to Claude Code, tag 
the Claude Code guide by doing @claudecodeguide,
[01:53] paste in the output style and say, and say, add 
this output style for me, press enter. And then
[02:00] it will go ahead and do that. And then once it is 
done, you can do /config inside of Claude Code,
[02:05] search for output style over here, and then switch 
over to Explain Like I'm 5, and then press escape.
[02:10] And then you can just rewind to go back earlier 
one message, and then basically enter in the same
[02:15] prompt again. And then after entering the same 
prompt again, like the Explain Like I'm 5 output
[02:20] style, it made much more sense. Now you will 
have noticed there are other output styles as
[02:24] well. So there is a learning output style where 
it will ask you to write some code yourself.
[02:29] There is also the explanatory output style, which 
I know the Claude Code team likes to use because
[02:33] they mentioned it in an interview where they get 
new hires to basically enable that when they're
[02:38] working inside of a brand new repo. Whenever any 
new engineer joins our team, we told them to use
[02:42] the exploratory output style. So this is just like 
/config output style equals exploratory. You run
[02:48] this in Claude Code, or you can ask Claude to set 
this for you. And what it does is anytime Claude
[02:53] will make a change, it'll explain to you, hey, 
here's how the architecture works. Here's how
[02:56] this language works if you haven't used it before. 
Here's how this part of the codebase works. It'll
[03:00] explain to you so that you can learn. Now, of 
course, this is not a one-size-fits-all output
[03:05] style. You may want to kind of experiment around 
and find a better one for your liking. And one
[03:10] way that you can do this is that anytime you come 
across some really confusing or annoying output,
[03:14] kind of like I have in this chat over here, you 
can basically do /branch and then it will branch
[03:19] from the existing conversation onto a brand 
new chat. And then I can basically paste in
[03:23] the existing output style and say, hey, so can you 
basically generate me like 5 other output styles
[03:29] and how your previous output would look like 
in that brand new style? Essentially my goal
[03:33] here is to find a style of communication which 
I understand. And I can see there's a bunch of
[03:38] output styles. So there is a kid mode, which I 
will not be using. That's way too basic. There's
[03:43] also the Slack DM over here, which looks a bit 
better. But honestly, when I'm reading for it,
[03:47] then it's like still pretty confusing. 
And if you find that doesn't work for you,
[03:51] then you can ask it to make an output style based 
on ASD-STE100, which is a language standard,
[03:57] which is for Simplified Technical English. And 
if I were to basically rewind and then say like,
[04:03] okay, can you explain, explain in this instead, 
then it will give a much better style. And you
[04:09] may want to adjust this slightly. And if I were 
to make this into a brand new output style, then
[04:14] I may find over time, actually I want it to be a 
bit more technical. And now reading through this,
[04:18] I can be like, okay, wow, this is significantly 
better. I want to turn this into output style,
[04:22] tag the Claude Code guide and say, turn this into 
an output style. And I may notice over time like,
[04:29] hey, I'm getting more technical or something 
like that, in which case I may want to bump
[04:33] up the level of the output style in some way. Now 
one of the nice built-in features into Claude Code
[04:37] is the fact that the output styles persist per 
project. So you can see for AgentStack over here,
[04:42] when I go to settings.local.json inside the 
.claude folder, then I have output style
[04:47] set to explain like I'm 5. But if I now set the 
output style for this other project to the STE100
[04:53] in Simplified Technical English, then I can 
see that the previous project's output style
[04:58] has not changed, but this new one over here 
has changed to STE100. So this is really good
[05:04] because you can have different output styles for 
different projects. Anyways, for me personally,
[05:07] I will be using it for different projects, 
different output styles. So for example,
[05:11] recently I have been working on a new project 
of building really good agent sandboxes.
[05:15] So I can do /config and set that to explanatory 
to understand more about agent sandboxes. But for
[05:21] projects I'm very familiar with, I can have it be 
way shorter instead. Anyways, I would basically
[05:26] recommend playing around because I think this is 
something we will need to do more going forwards,
[05:30] as the models are getting slightly more confusing 
in their default outputs. Anyways, if you do like
[05:35] this kind of stuff, then do subscribe to the 
channel. And if you do want to get more tips
[05:38] from me on a regular basis, then do check out my 
email newsletter. It will be linked down below.
[05:43] By signing up, you will also get access to a 
bunch of free videos from my agentic coding
[05:47] school class as well. And you're also welcome to 
reply to any of the issues, and I will try to get
[05:51] back to you as well, because I really like 
hearing from people replying to newsletters.
