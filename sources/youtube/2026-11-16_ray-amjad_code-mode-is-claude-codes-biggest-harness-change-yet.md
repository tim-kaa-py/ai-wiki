---
title: "Code Mode Is Claude Code's BIGGEST Harness Change Yet"
type: "youtube"
channel: "Ray Amjad"
date: "2026-11-16"
resource: "https://www.youtube.com/watch?v=DRNbxPk9Ab8"
pillar: "building"
tags: [claude-code, agents, inference, architecture, workflow]
timestamp: "2026-11-18"
extraction_method: "manual-captions"
video_id: "DRNbxPk9Ab8"
duration: "14:54"
---

[00:00] Okay, so Anthropic just added something that makes 
Claude Code smarter whilst also being cheaper for
[00:05] the same model. And that is by rewriting a decent 
chunk of the harness in a feature called Code
[00:10] Mode. So I basically want to go through what 
exactly that is in this video because I think
[00:13] it follows a trend that we're seeing more and more 
whereby the model is swallowing the harness. And I
[00:18] think that this is a pretty good example of that. 
Now, I do want to mention that this concept has
[00:22] been around for over 1 year and this Cloudflare 
article kind of popularized it. And it has been
[00:26] implemented to varying degrees inside of different 
harnesses, like Codex, OpenCodePy, Prime Agent.
[00:32] But in this video, I want to focus on Claude 
Code's implementation because I like talking
[00:36] about Claude Code. As a really short aside, I 
will be doing a Black Friday deal this year,
[00:39] so if you want to be the first to hear about 
it, then there will be a link down below. Now,
[00:42] if you already know what Code Mode is and you 
want to know how Claude Code implemented it,
[00:46] then you can skip to a timestamp on the screen 
right now. But if you don't know what it is,
[00:49] then I'm basically going to explain that. So 
because I like to explain things problem first,
[00:53] solution second, I want to give some motivation 
for why Code Mode even matters. So right now,
[00:58] many harnesses are a bunch of separate tools like 
read, edit, bash, webfetch, with some other things
[01:03] attached. And the model is just basically looping 
through these tools until it decides that it's
[01:07] done. Now this is fine and all, but it becomes a 
problem when your agent is connected to dozens of
[01:11] tools, specifically MCP servers, each of which can 
have dozens of tools inside. Because if your agent
[01:17] now wants to chain many different tools together 
from different MCP servers, then it has to pass
[01:22] the result of each one through the context window. 
So for example, you may do one tool call to pull
[01:27] in some data from the Stripe MCP server. And then 
that would go into the context window. And then
[01:32] the model would decide, okay, I'm going to do 
this other tool call to pull in some data from
[01:35] like Cloudflare, that would go inside. And then 
it may combine the data in some way with a script,
[01:40] and then pass it to another MCP server. Now the 
problem is that the output of every tool call is
[01:45] just sitting inside of the context window. So the 
next time a tool is called, the model rereads the
[01:50] entire conversation, And this can continue over 
and over again. And even though these tokens are
[01:54] cached and they're charged at 10% of the usual 
rate, you're still needlessly paying for things
[01:59] that shouldn't have to be inside of the context 
window. So it'd be much better if the model,
[02:03] instead of doing many different tool calls and 
using the context window as an intermediary,
[02:08] could pass a result of one tool call directly to 
the next one without it ever entering the context
[02:13] window. And that was one of the big ideas and 
motivation behind the article by Cloudflare called
[02:17] Code Mode: The Better Way to Use MCP. Where they 
basically say it turns out we've all been using
[02:21] MCP wrong. And essentially they were like, okay, 
what if instead of our MCP servers having like
[02:26] 1,000 different tools, each of them being called 
one at a time and then being passed by the context
[02:31] window, we had a single execute tool instead 
whereby since the models are already really good
[02:36] at writing code, they can combine many different 
tools together inside of a bit of code whereby
[02:42] the MCP tools are actually functions. So you can 
chain many different MCP tools together. Inside
[02:47] of a single execute tool. And then a couple months 
later, Cloudflare applied this idea to their own
[02:52] MCP server, whereby they managed to reduce the 
number of tools from 2,600 costing 1.1 million
[02:58] tokens to 2 tools costing 1,000 tokens. So if 
you install the Cloudflare MCP server inside
[03:04] Claude Code, then you would see that it only has 
a search tool and an execute tool. And the search
[03:09] tool allows Claude Code to search across the 2,600 
tools at Cloudflare has available, and the execute
[03:16] tool allows you to combine the relevant ones. 
And when it comes to executing, Claude will
[03:19] find the relevant tools, write a bit of code 
whereby the tools are essentially functions,
[03:24] and then this bit of code would run inside of 
a sandbox that Cloudflare has on their servers,
[03:30] and it would pass the final result back to you. 
Now this means that we can chain many different
[03:34] tools together really efficiently. So then a 
bunch of companies that offer a lot of tools
[03:38] inside of their MCP servers Kind of like Datadog 
started using this idea as well, replacing all of
[03:43] their MCP tools with just 2 of them. But now we 
kind of have a problem whereby some MCP servers
[03:49] offer a server-side code mode that runs inside 
of a sandbox. Some don't offer any code mode,
[03:54] and it'd be much better if we had some kind 
of client-side code mode that spanned across
[03:58] every single MCP server that we have installed. 
So that means you could have the Stripe MCP,
[04:02] PostHog MCP, Supabase, and a bunch more. 
And then your agent would be able to do a
[04:08] single execute tool call that combines data 
from all of the sources in some kind of way
[04:12] without any intermediate results entering the main 
conversation. And this idea of a client-side code
[04:18] mode that spans across all MCP servers was then 
implemented in a bunch of different harnesses,
[04:22] but it was never really implemented inside of 
Claude Code. So then what a bunch of people
[04:26] did instead is they used an MCP gateway, kind of 
like executor.sh, whereby you can then basically
[04:32] connect all of your MCP servers to it, kind of 
like this. And then Executor would act as its own
[04:37] MCP MCP server with a code mode that spans across 
all the MCP servers that you have connected. Now
[04:42] I don't really recommend many tools on the 
channel, but I actually really like this one,
[04:46] especially because you can self-host it. So I have 
it self-hosted over here with over 33 MCP servers
[04:51] connected. And one of the nice things is you can 
kind of make these connection packages whereby you
[04:56] can give different people on the team access to a 
different set of MCP servers. Now just to show you
[05:00] what this looks like, if I go to /MCP inside 
of Claude Code, Go over here. This is my own
[05:05] self-hosted version of Executor. Go to View Tools. 
I have a search tool and then an execute tool. And
[05:11] this execute tool would allow Claude Code to write 
some JavaScript that basically combines many of
[05:16] the tools I have connected to my executor.sh. 
And then it runs on the server and passes the
[05:20] results back to Claude. But in this case, we 
have Code Mode only for MCP servers. Now then,
[05:25] what some companies did, including Anthropic, 
they thought to themselves, what if instead of
[05:29] having Code Mode across only the MCP servers, we 
had across every single tool that we have in the
[05:35] harness? So the normal tools like read, write, 
edit, bash would all be behind Code Mode as well,
[05:41] in addition to all of the harness-level tools. 
And that is essentially what Code Mode inside
[05:45] of Claude Code now does. Now I want to go through 
the setup inside of Claude Code before explaining
[05:49] further. So you want to copy over this command 
over here. It will be down below as well. And then
[05:53] go over to your terminal and then paste in the 
command. Now in this case, it gives me a warning
[05:57] saying that it's not enabled because I have to 
disable one of my mods that are using Claude Code
[06:01] hooks. So I'm going to copy this message and then 
basically paste it in here and say, what mod is
[06:06] this? And then I'll ask it to disable the relevant 
mod and then try again. And then after you disable
[06:11] the relevant mods, you will get a message kind of 
like this saying that code mode is now enabled.
[06:15] So if you say, what tools do you have? Then it 
will say that it has only 2 tools, which is a
[06:21] REPL and a poll. So I will be explaining them in 
just a second. And I can see this in action when
[06:26] it comes to normal data analysis, when it comes 
to coding. Because I can say something like,
[06:30] combining the Stripe data with the PostHog 
data, can you write an HTML file showing me
[06:35] the highest lifetime value customers and where 
they came from? And then if I press Ctrl+O,
[06:39] then you can basically see that it's writing some 
code over here. And if I press click to show,
[06:44] this is what it kind of looks like over here. So 
you can see that it's writing some JavaScript in
[06:48] some kind of while loop to find all the relevant 
customers. And this is another example where it's
[06:52] able to do things much more efficiently. And make 
better use of the context window. So what exactly
[06:58] is this REPL? It stands for Read Evaluate Print 
Loop, and it's basically a JavaScript console
[07:03] that Claude is writing code into that stays open 
for the entire session. So all the previous tools
[07:08] such as the Bash tool, read, edit, web fetch, MCP 
calls are now functions that can be called inside
[07:15] of this REPL tool. And one of the nice things 
about this client-side code mode is that because
[07:19] it's a long-running JavaScript session, Claude 
could define a variable inside of an earlier
[07:24] REPL that a later REPL can then use to kind of 
loop over and filter. And this is not possible
[07:30] with server-side code mode, kind of like we see on 
Cloudflare or executor.sh. Now because everything
[07:34] that Claude is writing into this REPL tool is 
code, it can do everything code is good at,
[07:40] like looping over hundreds of files, running 
a bunch of tool calls in parallel, removing
[07:44] any duplicates, filtering down stuff to just the 
rows that matter. And this can all be done before
[07:49] anything comes back into the context window, 
thereby saving on context and also round trips.
[07:53] And this is really helpful for any badly designed 
MCP servers that end up returning way too much
[07:58] stuff back into the context window. Because then 
Claude can assign any results over to a variable,
[08:03] preview a bit of that variable, and then run some 
more code against that variable, all whilst having
[08:07] very little come back into the context window. 
Now some of you may be thinking, okay, couldn't
[08:11] Claude already just write a bash script to achieve 
some of this? And whilst it could, it would not
[08:16] have access to all the harness-level tools, kind 
of like any MCP servers or spawning subagents,
[08:21] but Code Mode gives it that wider access. Now 
the second tool that Claude has is Poll. So some
[08:26] of these scripts may be running for a really long 
time because it's looping through a bunch of data.
[08:31] And if a script ends up running for too long, then 
it basically detaches, goes into background, and
[08:35] then Claude can use a poll to check up on it. Now 
when Code Mode first appeared in the binary about
[08:39] 11 days ago, I basically had my agent do a whole 
bunch of experimentation. With and without Code
[08:44] Mode by solving real issues on real open source 
projects. And it basically found that having Code
[08:48] Mode enabled used about half of the input tokens 
and came to 71% of the total cost of normal mode.
[08:55] So we're basically saving about 30%. Now we're 
already kind of seeing this happening outside
[08:58] of Anthropic. So for example, recently BrowserUse 
deleted about 90% of their old library. And now
[09:03] their agent just writes a Python REPL on the raw 
Chrome Devs protocol. And this means that for the
[09:09] same models, it's up to 50% better. Whilst being 2 
to 5 times cheaper and also being faster as well.
[09:15] And there's another example here of someone giving 
Opus 5.5 a single Python REPL, kind of like Prime
[09:21] Agent. And they found that normal Claude code 
without Code Mode gets 65% on TerminalBench,
[09:26] whereas with their REPL, it gets 71% instead, 
whilst costing a tiny bit less per task too. Now,
[09:32] a pretty nice article for thinking about where 
these performance gains are coming from is this
[09:36] one by Alex Zhang from MIT. Who did a whole bunch 
of work on recursive language models, which we'll
[09:41] talk more about at the end of the video. But in 
this article that I'd recommend reading called The
[09:44] Mismanaged Geniuses Hypothesis, he says that a lot 
of the limitations of the models today come from
[09:49] the ways in which we use them and not the inherent 
capabilities of the models. And his main point is
[09:54] basically if we learn how to manage these models 
better, then they could already solve a much wider
[09:59] range of tasks than before. And I think that Code 
Mode is a pretty good example of that because it's
[10:04] already giving a very capable model a lot more 
freedom. Now where I think the video gets pretty
[10:08] interesting is that inside of Code Mode, they're 
going to be adding 3 additional functions called
[10:12] spawn context, list contexts, and release context. 
And this appeared in the binary the same time Code
[10:18] Mode was added, but has not been released yet. So 
it basically looks like subagents are now being
[10:23] turned into contexts, and they can be triggered 
programmatically and be combined programmatically,
[10:28] kind of like dynamic workflows. Now if you 
have seen my dynamic workflows video when they
[10:32] were first announced, then this should feel very 
familiar. Because we can basically wrap subagents
[10:37] with code to coordinate even more subagents than 
before without the main context window filling up.
[10:42] But one of the differences is that if we spawn 
a context inside of the REPL, then we have the
[10:47] option of forking the main conversation. Which 
means that Claude Code could do something kind
[10:51] of like, if you asked it to make it faster, then 
it could fork the main conversation 5 or 10 times,
[10:57] explore a bunch of different approaches, and 
then only return the top 3 approaches that sped
[11:02] it up the most back to the main conversation. 
We also have a difference whereby any of the
[11:06] subagents that are spawned can talk to the main 
coordinator if they want to, which isn't really
[11:10] possible with a dynamic workflow either. There are 
a bunch of small differences as well, but it may
[11:15] be likely that they combine both of them together 
in some way. Now for the astute among you,
[11:19] or the ones who really like to stay at the edge 
of all this, you may be thinking to yourself,
[11:23] hold on, this is starting to look like a recursive 
language model. And this is the same idea that
[11:28] Alex Zhang had at MIT inside of his pretty popular 
paper from December of last year. And basically
[11:33] he said that for an RLM, recursive language model, 
there are 3 things that have to come together. The
[11:38] first is a REPL that persists between different 
calls. And we've seen this in Claude Code so far
[11:43] with the REPL tool, whereby Claude can define 
a variable and that variable can be used in
[11:47] another REPL. The second is subagents that get 
called from inside of a REPL, so your code can
[11:53] launch them and manage them. Which means that if 
the REPL were to read like 20 different files,
[11:58] we could quickly launch 20 different subagents. 
And this may be added to Claude Code soon with
[12:03] the 3 different context tools that we mentioned. 
And the third thing for an RLM is that your prompt
[12:08] to live inside of a variable. So the model never 
actually has to read all of it. And instead can
[12:13] just write code over your prompt. So basically, it 
seems that we're going to have 2 of the 3. But the
[12:18] missing piece here is a 3rd. So what exactly does 
a 3rd one mean? So right now, if you were to paste
[12:23] in a prompt of 2 million tokens into Claude Code, 
then it would quickly fill up the context window.
[12:28] Whereas in an RLM, Claude would be told something 
like, hey, there's a prompt of this length,
[12:33] 2 million tokens, that's sitting inside of this 
variable. And then Claude can use code to kind
[12:38] of figure out what to do with it by cutting up 
the variable into different parts. It may hand
[12:42] it over to different subagents and do a bunch of 
stuff with it. So this means that Claude would
[12:46] be able to work with much larger prompts than it 
can do today. And the exact same thing here goes
[12:50] for the conversation history. Now we know that we 
still have some kind of compaction and compaction,
[12:55] whilst it is getting better, can still be a bit 
bad. It'd be much better if the model can manage
[12:59] its own context window. So if we define 
the conversation history as a variable,
[13:03] and then allow Claude to manipulate the variable 
and also slice and cut anything from it,
[13:08] it would mean that if Claude notices that the 
context window is filling up, then it could simply
[13:12] delete something from the context window earlier 
on. So this means that if it kind of saw a bunch
[13:16] of noisy tool calls that weren't really relevant 
to conversation anymore, then it could basically
[13:21] replace them with something much shorter or just 
delete them instead. And this would kind of mean
[13:25] that we no longer need compaction because a model 
can just decide what to remove and replace inside
[13:30] of a context window. But now one of the problems 
can be that we end up breaking the prompt cache.
[13:36] And there's a pretty good research paper by 
Meta about this called Context Language Models,
[13:40] where they talk about having a prefix cache and 
a suffix cache of the part where we actually
[13:45] changed. I won't really go into this. I think this 
deserves its own video, but it will be linked down
[13:50] below if you do want to read it. Now Anthropic do 
kind of have something like this inside of the API
[13:54] called context editing. So I think they're kind 
of interested in this idea as well. But of course
[13:59] they do mention that it breaks the cache and 
you kind of want to evaluate the cost benefit of
[14:03] removing something from the context window if it 
is breaking the cache for the next time. So maybe
[14:07] in 2027, they will allow the REPL to treat the 
prompts that you put in Claude Code as a variable,
[14:13] and also the conversation history. Now, if they 
were to add this, and I don't think it'd get
[14:17] fully there, Alex Zhang also makes a point that 
RLMs only really begin to work once a model is
[14:22] post-trained around them. So if Anthropic were to 
train Opus 6 or Opus 7 inside of this new version
[14:28] of Claude Code where it can manage subagents from 
a REPL, and also the context window and prompts,
[14:33] then this whole code mode thing would be even more 
powerful. And it would mean that Claude can do
[14:37] even more ambitious work for cheaper. So it may be 
the case that over time Claude becomes some kind
[14:42] of RLM. Now if you do like this kind of stuff, 
then you may want to join my email newsletter,
[14:46] because there are a bunch of ideas that I share 
inside of here that don't quite make it onto
[14:50] YouTube, but are still very helpful. There will 
also be a link down below for those interested.
