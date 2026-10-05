---
title: "Anthropic Just Released Claude Code Mods"
type: "youtube"
channel: "Ray Amjad"
date: "2026-09-04"
resource: "https://www.youtube.com/watch?v=B-YQANvDOq0"
pillar: "building"
tags: [claude-code, hooks, function-hooks, claude-mods, plugins, workflow, safety]
timestamp: "2026-10-05"
extraction_method: "manual-captions"
video_id: "B-YQANvDOq0"
duration: "16:53"
---

# Anthropic Just Released Claude Code Mods

## Transcript

[00:00] Okay, so earlier today Anthropic released what 
I consider to be the best feature in Claude Code
[00:04] yet, function hooks. So before then, I really 
liked dynamic workflows, but after trying out
[00:10] function hooks for the last few hours, I was like, 
wow, this is really powerful. I gotta make a video
[00:14] about this. Now I'll be going over everything 
to do with this feature and how we can use it
[00:18] to be even better engineers. But first of all, 
if you don't know what normal hooks in Claude
[00:21] Code already are, then I do have a free video 
about this on my blog linked down below. Where
[00:26] I basically give some motivation for why hooks 
in Claude Code are handy and why you may want
[00:30] to use them. Now function hooks basically take 
hooks to the next level and make Claude Code
[00:35] even more hackable and customizable. And they 
solve some of the existing issues with hooks
[00:39] in Claude Code. Okay, so very quickly, there is 
a sale going on right now for my Agentic Coding
[00:43] School. More on that later in the video. Now to 
quickly make sure we're all on the same page,
[00:47] if you already know this stuff, then you can skip 
1 or 2 minutes ahead. The reason why we use hooks
[00:52] is to basically add deterministic control to 
Claude Code. So one of the problems can be that
[00:56] in your Claude MD file, you may define a rule such 
as never run destructive Supabase commands. And
[01:02] then as your context store is filling up, the 
rules at the beginning in your Claude MD file
[01:06] and your system prompt can fade over time and 
Claude may forget to apply those rules. Or you
[01:11] may get a bit sloppy in your prompting and you 
may give a lazy prompt, Claude misinterprets it
[01:16] and then runs a dangerous action. Or you may have 
defined a workflow that Claude is not following
[01:21] properly. All of these can be solved by adding 
deterministic hooks. So as a really brief example,
[01:26] you can basically tell Claude, make me a hook that 
will block dangerous Supabase commands when using
[01:30] the Supabase CLI. And then it will do something 
kind of like this. So for example, in this case,
[01:35] before it runs a Bash tool, then it will run this 
script over here, which refers to this Bash script
[01:41] called supabase-guard, which will basically block 
any commands such as deleting a Supabase project.
[01:46] So I can see some of the commands that are 
blocked over here, deleting projects, branches,
[01:50] and stuff like that. But existing hooks have a 
few limitations. So they can't rewrite anything
[01:55] such as a prompt that you may have given. 
They can't append any extra context to it
[02:00] from a company knowledge base, for example. 
They can't draw buttons or a status line and
[02:05] rows and stuff on Claude Code. They can't ask 
user questions. They can't add tools or edit tool
[02:10] descriptions. And there is no memory with existing 
shell hooks. So you can't remember things across
[02:15] different hooks and sessions. Whereas function 
hooks basically solve all of these issues. And
[02:20] the way that I like to think about this is 
it's kind of like middleware that you would
[02:23] come across in Express.js. So if you have used 
Express.js middleware before, then this should
[02:27] look very familiar. Here we're basically blocking 
anyone who doesn't have an authorization header.
[02:32] And if they do, then we allow them to proceed 
to next. Whereas for function hooks, it looks
[02:37] kind of like this. So on any tool call inside of 
Claude Code, we can match it to a certain tool,
[02:42] such as the Bash command. And if it matches 
a certain regex, such as deleting a folder,
[02:47] then we can block the command. Otherwise we can 
let it proceed. And this means that we can do
[02:51] pretty interesting stuff inside of Claude Code, 
kind of like this. So you can see in this case,
[02:55] on any tool call that Claude Code does with 
the Bash tool, we basically replace npm in the
[03:01] command with pnpm install instead to prevent it 
from doing something such as accidentally using
[03:06] npm on our codebases. So here we are basically 
rewriting the input. We can also do something like
[03:11] short-circuiting. With Claude Code function hooks 
now come with a store. So for example, over here,
[03:16] if Claude Code were to do a web fetch, then it 
would first look in the store inside of Claude
[03:20] Code to see if that URL has already been fetched 
before. And if it has, then we can just return
[03:25] the cached copy instead. And if it hasn't, then we 
can just let it proceed. Now another pretty neat
[03:30] example is I can override any default tools inside 
of Claude Code. So for example, Claude Code has a
[03:35] web search tool, and I don't think it's very good 
because I use Brave Search behind the scenes. So I
[03:41] prefer using the Exa MCP server instead. One of 
the problems can be that Claude Code will still
[03:46] end up using the web search tool, even though 
I told it to use an Exa MCP. So what I can do
[03:50] instead is I can override the web search tool 
by middlewareing it, whereby it will intercept
[03:56] the tool, see if I have an Exa API key set. If I 
don't, it will default to the normal web search
[04:01] tool. If I do, then it will send a request to the 
Exa API endpoint to get the search results. If it
[04:07] failed for whatever reason, then it will default 
to web search tool. But if it was successful,
[04:12] then it will return all the results back into the 
main session. So that means I can uninstall the
[04:17] Exa MCP and still have Exa used in the background 
by intercepting the web search tool. Claude Code
[04:23] also has a web fetch tool, which sometimes ends 
up getting blocked. So you could change this web
[04:28] fetch tool so it routes via a proxy that you have 
yourself. And that's why I like the analogy of
[04:32] function hooks being Express.js middleware. Now 
we have a whole bunch of building blocks when it
[04:37] comes to function hooks in Claude Code, as well 
as my favorite, which is making changes to UI to
[04:42] make it more customizable for your workflows. Now 
let's go for a couple examples. We'll start off
[04:46] with really basic ones and then move on to more 
complicated ones. Now you may be in a situation
[04:50] where Claude Code accidentally loaded in a secret 
into your session transcript by running some kind
[04:55] of Bash command, and it's now like, oh no, the 
secrets are now in the session transcript. You
[04:59] should have to delete the session transcript 
or rotate them. And the same thing can also
[05:03] apply to emails and like IP addresses or any 
kind of sensitive data. So we can use what is
[05:08] essentially middleware to intercept the input 
into Claude Code and then redact these secrets
[05:14] before passing the message into the session 
itself. And the way we can do this is by first
[05:18] enabling function hooks by running this command, 
CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 claude,
[05:24] press enter. And now we'll get access to a brand 
new built-in skill, which is plugin-authoring. So
[05:29] it says over here, Write or debug a Claude Code 
plugin made of function hooks. So pressing enter,
[05:34] I can basically say something like, hey, can you 
make me a function hook that will basically block
[05:39] any secrets from entering the session transcript 
by measuring the entropy and also make another one
[05:45] to block emails and anything that looks like an 
IP address. Pressing enter, it will basically go
[05:50] ahead and make that function hook for us. Okay, 
so now it's built out the functional hook and
[05:54] I'm really surprised because it went the extra 
mile and did something really clever. That I
[05:58] will explain in just a second. But if I go over to 
the project now, I can see in the .claude folder,
[06:04] I have plugins.json, transcript_redactor.json, 
hooks.json, and then redact.ts. So this is the
[06:10] hook that it designed over here, about 300 lines. 
And it defined a really interesting in-memory
[06:15] store at the very top that allows it to use 
secrets without actually seeing the secret. So now
[06:20] I'm going to try it out by giving it an Anthropic 
API key. So pasting that in over here. I'll say,
[06:25] can you make an API request to Sonnet 5 and ask 
it for a short story? Pressing enter over here,
[06:30] you will see it was automatically redacted, 
the secret, as soon as I pressed enter,
[06:34] and it got replaced with an ID. Now this secret 
is now stored in memory in the line that I
[06:40] just showed before. And now when Claude makes a 
request, a Claude request, then it actually uses a
[06:45] secret right over here, the ID of the secret, not 
the secret itself. And when this request is made,
[06:50] then the hook automatically rewrites it to the 
correct secret. So you can see it successfully
[06:55] made the request and got a short story back, which 
is really good. So using function hooks, we added
[07:00] security by never allowing secrets to enter the 
transcript. And secondly, allowing it to actually
[07:05] use secrets that we give it to make requests 
on our behalf. And the store that I used over
[07:10] here was essentially the variable store where the 
next hook and the next turn can see the variable
[07:14] that was defined. If you want a store that will 
persist across different sessions and restarts,
[07:19] you can tell it to use this store instead, 
which you may want to do for something else,
[07:23] ideally not secrets. And this is really similar 
to Agent Proxy by Infisical, whereby we have
[07:28] a proxy that intercepts each request and adds a 
secret as that agent is making the request. Okay,
[07:33] so one of my favorite parts is this new UI thing 
where we can get a function hook to customize a UI
[07:39] of Claude Code. For example, every time you push 
to main or merge into main and it's deploying on
[07:45] Vercel or something, you can have it automatically 
show you the deployment status in a brand new row.
[07:49] And that row will only appear when this hook 
is triggered. So let's actually design that
[07:54] over here. So I'm going to do /plugin-authoring 
again and say, can you make me a hook that will
[08:00] basically show me next to the prompt status 
bar, the current Vercel deploy and the stage
[08:06] that it's on and how long it's been building for. 
And once the deploy is complete for the next hour,
[08:10] keep that on the like bottom. And as we add new 
deploys, then that should like pile up. Feel free
[08:16] to interview me, give me a bunch of prototypes I 
can play with before finally coding this up. So
[08:21] I can describe a function hook kind of like this. 
And there are enough primitives that most of what
[08:26] you want to do should be possible. So it's now 
asking me a few questions of how it should look
[08:30] like over here. So I'll basically answer them and 
then build it out. So now it's built it out over
[08:34] here and called it Vercel deploy status. So let's 
go ahead and do a Vercel deploy. So I'm basically
[08:39] going to say, Can you enable the sale banner and 
then merge into main and deploy? Pressing enter,
[08:44] it will turn on the sale for the website. So 
now I can see something really cool here. So
[08:49] it says queued, building, ready. And it basically 
shows me the stage that it's at and how long it's
[08:54] been working there for. And I can also press 
this button over here that will basically allow
[08:58] me to hide this and then also reshow it. So each 
function hook, which we define inside of a plugin,
[09:04] we now have a panel where we can view data 
live. So I can see it's now ready and it took
[09:08] 5 minutes and 50 seconds. So if I go back to 
the website and then refresh the page, I can
[09:12] see that the sale banner for the lifetime deal 
is now on. So basically at the end of next week,
[09:17] I will be removing the lifetime plan from the 
website and every class and future class will end
[09:23] up being sold separately instead. So if you want 
access to every class and future class I release
[09:28] inside of one purchase, then you have about a 
week left to buy. Over the last 9 months since
[09:32] I released this, thousands of engineers have taken 
this many of your favorite engineers from some of
[09:36] the world's biggest companies. And over those 9 
months, I've updated the class about 250 times
[09:42] to make sure that it's relevant and current. And 
many of the techniques that you find taught here,
[09:45] you will not find anywhere else online. And 
going forwards, I will be switching over to
[09:48] a cohort-based model. So about 3 or 4 times a 
year, I will be running an AI software development
[09:54] lifecycle cohort where I will be going through 
all the new alpha when it comes to shipping and
[09:58] maintaining production-grade software. With 
AI coding agents. You can already see many of
[10:02] the applications I ship and maintain. They are 
down below in the description. But essentially
[10:06] going forwards, I will be focusing less on the 
tools themselves and more about the AI software
[10:10] development lifecycle. So there will be about 25 
hours worth of content alongside the live Q&A,
[10:17] which you can come to. And because it will have a 
live component as well, the price will be high for
[10:21] this. So by signing up to a lifetime deal now, you 
will get access to every future cohort that I run.
[10:26] But if you miss a lifetime deal, then you will 
have to sign up to each cohort separately whenever
[10:30] it runs. Now the first cohort will be running 
from like late September, early October time. I
[10:35] still have to finalize the dates, but it will be 
going through the entire AI software development
[10:39] lifecycle when it comes to using AI coding agents. 
A lot of people have been telling me recently,
[10:44] "Ray, you should really raise your prices. People 
charge 3, 4, 5 times as much as you and they give
[10:50] 1/10th the amount of value." So I think I should 
probably raise my prices to be in line with the
[10:54] market. Which makes the current lifetime deal an 
even better offer. A lot of the content in the
[10:57] upcoming cohort will be cutting-edge content that 
you will find almost no one else teaching online.
[11:02] There is a 30-day money-back guarantee if you 
don't find yourself happy for whatever reason,
[11:06] but so far less than 0.2% of people have asked for 
their money back. And that's basically how I know
[11:11] my classes are good. So yeah, links to everything 
will be down below. And also, by the way,
[11:15] I will be releasing my dedicated agent sandboxing 
infrastructure very soon. So if you do want access
[11:20] to the most cost-effective agent sandboxes on the 
market, and then this is a place to find them. But
[11:25] also, if you do want early access as well, then 
you can go on the website and fill out the form
[11:29] down below. Now, some more function hooks that 
you may want to make is you may want to make
[11:33] one that is for dry runs. So if you do any kind of 
data analysis, you may first want to go for a dry
[11:38] run before the real analysis actually happens. So 
we can basically block any real commands running
[11:44] until the dry run command has run to show you what 
the output would look like. We may also want to
[11:49] combine this with the previous UI thing, So in 
big red characters, it would say something like,
[11:54] hey, you're running in production, or hey, you're 
running in dry mode. And this works really well
[11:58] with the ask function as well. Another way of 
using the ask function is basically I can tell
[12:02] Claude Code every time it comes across and 
edits a file that goes beyond 1,000 lines,
[12:08] then it automatically asks me, hey, do you want to 
refactor this file to basically split it up into
[12:13] smaller files instead? And this can be really 
effective for making sure Claude Code doesn't
[12:17] add really massive long files like 2,000, 3,000 
line long files because for some reason models
[12:23] still like doing that. And to basically do that, 
I can run Claude Code with enable function hook,
[12:27] do /plugin-authoring, and then say, can you make 
me a function hook that will basically ask me
[12:33] every time a file that you're editing whether the 
file should be refactored to make it smaller into
[12:38] many smaller files instead. So saying something 
along those lines, it will basically come up with
[12:42] that kind of function hook for us. We also 
have two interesting ones over here. Where
[12:45] we can have a hook automatically call a model 
and we can also have it speak to us using the
[12:50] built-in text-to-speech that we have inside 
of our computer. Can you make me a hook that
[12:54] will basically speak every time a turn ends, but 
first pass it to a Haiku model to give a summary
[13:00] of everything that was done? So if I give a prompt 
kind of like this, then it will make that function
[13:04] hook for us as well. So whilst we're waiting for 
those two to complete, I can use other primitives
[13:09] such as registering a brand new tool or calling 
an existing tool. I have a clock that I can use to
[13:14] measure how much time has taken between different 
turns. So I can combine many hooks together to
[13:20] basically see like, okay, if a turn has taken 
longer than 10 minutes, should we save the result
[13:25] to a separate file so we don't lose that result? 
If you're working in an industry with a lot of
[13:30] compliance like healthcare or payments, then you 
may want to set up a hook very similar to this,
[13:34] whereby on every single event that Claude Code 
runs, it automatically sends all the results
[13:39] over to your own log store that you may have for 
your organization. So you have an audit trail or
[13:44] what exactly Claude Code is doing. As for a 
non-technical example, let's say that you use
[13:49] Claude Code to draft and send email newsletters. 
You may want to prevent it from automatically
[13:54] sending the email newsletter until it has used 
the ask user question tool to verify that you
[13:59] actually want it sent, and until it made sure that 
you spent enough time actually reading through
[14:04] the newsletter as well. So this can prevent you 
from doing like an accidental send, for example.
[14:08] Essentially, function hooks are now a really 
powerful primitive inside of Claude Code, which
[14:13] is why it's now my favorite feature, because now 
we can customize and hack Claude Code in all sorts
[14:17] of different ways. And you can also just tell like 
/plugin-authoring, point out your Claude.md files
[14:22] and be like, okay, which hooks can we make here 
to ensure we have more reliable deterministic
[14:27] behavior going forwards? So all the things that 
you may have been putting in your Claude.md files,
[14:31] you can start removing and putting into really 
well-defined hooks.json instead. And because
[14:35] function hooks do exist as plugins, you can simply 
share them with the rest of the team. Via some
[14:40] kind of like shared GitHub repo. And speaking of 
teams, if you do want training for your entire
[14:45] team or your organization personally from me, 
then there is a form down below that you can
[14:48] fill in. A lot of companies have been requesting 
this from me recently to basically bring all their
[14:53] engineers up to speed and to find Claude Code and 
Codex workflows that work really well for their
[14:59] organization. And now it seems Claude Code can now 
speak to us. So if I do /reload plugins, then it
[15:04] will reload that particular function hook that it 
made for us. And then if I say, hello testing 123,
[15:10] press enter. The assistant explained that a plugin 
loaded and a count increased from 9 to 10. And you
[15:17] can see now it works properly because it used the 
default Apple voice to narrate what happened. And
[15:21] I can see that right over here inside of the UI. 
So if I look inside of this function hook over
[15:27] here, I can see that it made a small persistent 
prompt, which goes over to the Haiku model. And
[15:33] this is a system prompt that I wrote, and this is 
using the $model command over here. So I can see
[15:39] it's calling this model and then it finally speaks 
it out. Now I really like the $model because we
[15:44] can do some really interesting stuff. For example, 
whatever the user prompt is, we can automatically
[15:49] generate a few keywords and then use like $http to 
query our company knowledge base in a secure way
[15:56] to automatically get any additional context from 
it to inject into a session. So that Claude Code
[16:02] does a better job. Or you can do something kind of 
like using this alongside the UI ask, whereby when
[16:09] it comes to opening up a brand new PR, Claude Code 
will generate a quiz for you to make sure that you
[16:14] correctly understand the changes that it made 
before it actually allows you to open up a PR.
[16:19] So yeah, this is why it's my favorite feature 
in Claude Code. There are literally hundreds
[16:23] of examples I can think of, and I'll probably be 
adding a whole bunch to all my different projects
[16:27] to enforce standards, workflows, and a bunch more 
things. And I will be talking about this in even
[16:32] more detail inside of my Agentic Coding School and 
any future cohorts that I run as well, and in my
[16:37] live Q&A as well. So if you do want to get in on 
the lifetime deal to get access to every future
[16:42] class and cohort for one price, then now is the 
time to do so. And that will give you access to
[16:46] my very first cohort beginning in late September, 
early October, and every future cohort that I run.
