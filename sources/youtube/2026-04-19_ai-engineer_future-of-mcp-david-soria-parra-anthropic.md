---
title: "The Future of MCP — David Soria Parra, Anthropic"
source_type: "youtube"
channel: "AI Engineer"
date: "2026-04-19"
url: "https://m.youtube.com/watch?v=v3Fr2JR47KA"
pillar: "understanding"
tags: [mcp, protocol, agents, progressive-discovery, programmatic-tool-calling, skills, connectivity, anthropic]
ingested: "2026-04-21"
extraction_method: "auto-captions"
video_id: "v3Fr2JR47KA"
duration: "18:45"
---

[00:07] [music]
[00:15] >> Well,
[00:16] welcome.
[00:18] Let's get started.
[00:21] This
[00:22] is an MCP application.
[00:25] That's an agent shipping its own
[00:27] interface not through like a plugin, not
[00:29] through an SDK,
[00:30] not rendered on the fly by the model on
[00:33] the client side, or hardcoded into the
[00:36] product. That is something that is
[00:38] served over an MCP server, and you can
[00:40] take the server, put it into cloud, you
[00:42] can put it into ChatGPT, you can put it
[00:44] into VS Code Cursor, and it will just
[00:46] work.
[00:50] And that
[00:52] I think it's kind of cool because for
[00:53] doing that, you need something that a
[00:55] lot of things that we're want in the
[00:58] ecosystem do not offer. You need
[00:59] semantics, you need to have both sides,
[01:01] client and the server, to understand
[01:04] what each side is talking, to understand
[01:06] how you render this, understand that
[01:08] there's a UI coming.
[01:10] And for that, you need a protocol.
[01:13] And the best part about this,
[01:15] an MCP server doesn't just ship an app,
[01:18] or can ship an app, it can also ship
[01:20] tools with it, and so you can interact
[01:22] with it with the application as a human,
[01:25] and you can have the model interact with
[01:26] it through tools, which is I think a
[01:28] very unique thing that I think we have
[01:30] not explored much
[01:32] just yet.
[01:34] Okay.
[01:35] But, let's quickly rewind a little bit
[01:37] from this what I think is a really cool
[01:40] glimpse into the future of MCP into over
[01:43] a year ago, 18 months, an eternity in AI
[01:46] life cycle, um all of this did not
[01:49] exist. There was just a little spec
[01:51] document, a few SDKs, uh mostly written
[01:54] by Claude, local only with little more
[01:57] than just tools. And in that last 18 or
[02:00] 12 months, you guys have been absolutely
[02:02] crazy building stuff, um building
[02:05] servers, building um an crazy ecosystem
[02:07] around this, and we on our side have
[02:09] been busy busy taking this local only
[02:12] thing, added remote capabilities, added
[02:15] centralized authorization, added new
[02:18] primitive like elicitation and tasks,
[02:21] and last but not least, added new
[02:23] experimental features to the protocol
[02:25] like the MCP applications that you've
[02:27] just seen.
[02:30] And in the meantime,
[02:32] we have reached, I think, a really cool
[02:33] milestone because again, you all of you
[02:35] have been absolutely crazy building,
[02:37] building, and building. Of course,
[02:38] luckily with the help of a a bunch of
[02:40] agents. Um
[02:42] we're now like at 110 million
[02:45] monthly downloads. And that's just, of
[02:47] course, not us using it in our clients
[02:49] and servers. That's like OpenAI's agent
[02:52] SDK, that's Google's ADK, that's
[02:54] LangChain, thousands of frameworks and
[02:56] tools that you might have never ever
[02:58] heard of it pulling it as a
[02:59] as a dependency, which means there's one
[03:02] common standard that all of us have at
[03:05] our disposal to speak to each other. Um
[03:09] just a bit for context, uh React, one of
[03:11] the most successful um
[03:13] open source projects probably of the
[03:15] last decades, took roughly double the
[03:17] amount of time to reach that download
[03:18] volume.
[03:20] And in the meantime, of course, you all
[03:21] have been building really, really cool
[03:22] servers from like little toy projects of
[03:24] WhatsApp servers and Blender servers, uh
[03:27] to building SAS integrations like
[03:28] Linear, Slack, and Notion that are
[03:30] really powering what everyone does every
[03:32] day when they use MCPs. But most
[03:34] importantly, the vast majority of MCP
[03:37] server most of all of us have built are
[03:38] behind closed doors uh connecting
[03:40] company systems to agents uh and AI
[03:44] applications.
[03:46] But I still think this is just the
[03:47] absolute beginning of where we are.
[03:51] Because I think 2025 was all about
[03:54] exploring, and 2026 is all about putting
[03:57] these agents into production. Because if
[03:59] you really think about it, in my mind,
[04:01] 2024, we just built a bunch of like
[04:03] demos and showed some cool stuff to
[04:05] people, and there was a little bit of a
[04:07] buzz there. 2025 was really all about
[04:10] coding agents. But coding agent, if you
[04:12] really think about it, are the most
[04:14] ideal scenario for an agent. It's local,
[04:17] it's verifiable, you can call a
[04:18] compiler, like you have a developer who
[04:21] can fix if it goes wrong in front
[04:23] of the in front of the computer, uh and
[04:26] you can display a UI interface, and the
[04:28] user's quite happy.
[04:30] But I think now with the capabilities of
[04:32] the model increasing, we're going into a
[04:35] new era, which I think this year will be
[04:37] we will see the start, where we're not
[04:39] just doing coding agents, we're going to
[04:41] have general agents that will do real
[04:43] knowledge worker stuff, like things a
[04:45] financial analysis analyst want to do,
[04:48] uh a marketing person want to do. And
[04:50] they need one thing in particular. They
[04:54] don't need a local agent that calls a
[04:55] compiler. What they need is something
[04:57] that could connect to like five SAS
[04:59] applications and a and a shared drive
[05:02] because the most important part for them
[05:04] for an agent is connectivity.
[05:06] And in my mind, connectivity is not one
[05:09] thing. If one if someone tells you
[05:11] there's one solution to all your
[05:12] connectivity problem, be it computer
[05:13] use, be it CLIs, be it MCP,
[05:16] they are probably pretty wrong because
[05:18] the right because the right thing, of
[05:19] course, is that it always means it
[05:21] depends, and there's a real a big
[05:23] connectivity stack, and there's a right
[05:26] tool for the right job. And in my mind,
[05:28] there are three major things that you
[05:30] want to consider building an agent in
[05:31] 2026. It's skills, MCP, and of course,
[05:34] like CLI or computer use depending on
[05:37] your use case. And they have three very
[05:39] distinct things that they can do in
[05:41] three different things you want to
[05:43] consider when you build your agent.
[05:46] Number one, skills, of course, is just
[05:48] like domain knowledge, it's just like
[05:50] capture-specific capabilities put into a
[05:52] very simple file, and it's mostly
[05:54] reusable. There are some minor
[05:56] differences between the different
[05:57] platform.
[05:59] Of course, CLIs very popular when local
[06:01] coding agents. It's an amazing tool to
[06:04] get simply started, to have something
[06:06] that you can pose in a bash, that you
[06:08] that automatically discover where the
[06:10] model can automatically discover what
[06:11] the CLI is capable of. And most
[06:13] importantly, if you have things that are
[06:16] like CLIs, like GitHub, Git, and other
[06:18] things that are in pre-training, CLI is
[06:20] an amazing solution for your
[06:22] connectivity part, and they're
[06:24] particularly good when you have a local
[06:26] agent where you can assume a sandbox,
[06:28] where you can assume a code execution
[06:30] environment.
[06:31] But if you don't have this, if you need
[06:33] rich semantics, when you need a UI that
[06:36] can display long-running tasks, when you
[06:37] can have when you need things like
[06:39] resources, when you need to build
[06:41] something that is full decoupled and
[06:43] needs platform independence, or you
[06:45] don't have a sandbox, when you need
[06:47] things like authorization, governance,
[06:50] policies, or short to say boring enter
[06:52] boring but important enterprise stuff,
[06:55] or if you want to have experiments like
[06:58] MCP applications or what comes soon,
[07:01] skills over MCP, then I think MCP is
[07:04] just like additional connective tissue
[07:06] that is just yet another tool in the
[07:08] toolbox for you to build an amazing
[07:10] agent.
[07:12] And so this is all to say that I think
[07:13] in 2026, we're going to start building
[07:16] agents that use all of it. They don't
[07:18] use one thing, they use all of it, and
[07:20] they use them quite seamlessly together.
[07:24] But I don't think we're quite there just
[07:27] yet.
[07:28] Because we need to build a lot of stuff
[07:31] partially um because
[07:34] our agents kind of still suck.
[07:36] Um and partially because I think we just
[07:38] haven't talked enough about like some of
[07:40] the techniques you can do
[07:42] uh to really put this connective tissue
[07:44] together.
[07:47] The number one thing that we need to go
[07:49] and start building is on the client
[07:51] side, on the on the agent harness side,
[07:54] on the things that powers the connective
[07:56] parts, that be it a cloud code, uh be it
[08:00] a pie, be it whatever application you're
[08:02] going to build.
[08:04] And the number one thing we're going to
[08:05] do there, and what we all have to do,
[08:07] and something I want to really get
[08:08] across today, is that we need to go and
[08:10] start building something called
[08:11] progressive discovery.
[08:14] Most people when they think about like,
[08:16] "Oh,
[08:17] I MCP," they can't think about like
[08:19] context load. But if you really consider
[08:22] what a protocol does, the protocol just
[08:23] puts information across the wire, but
[08:26] the client is responsible for dealing
[08:28] with that information. And what
[08:29] everybody so far has done because we're
[08:31] in this very early experimentation
[08:33] phase, is to simply put all the tools
[08:35] into the context window, and then be
[08:37] quite surprised that maybe the context
[08:38] window gets large. Um
[08:41] but what you can do instead, and what
[08:43] you should do instead, you should start
[08:45] using this progressive discovery
[08:48] pattern,
[08:49] which is to say, use something like tool
[08:51] search to defer the loading of the
[08:54] tools, and start loading the tools when
[08:57] the model needs it. And we have this in
[09:00] the Anthropic API, and people can use
[09:03] this uh on on competitors' APIs as well.
[09:06] But also, you can just build this in
[09:07] yourself where you just download the
[09:09] tool directly, and the moment you give
[09:11] the you give the model a tool loading
[09:13] tool, basically, and the model goes
[09:14] like, "Ah, maybe I need a tool now. Let
[09:16] me look up what tools I need." And then
[09:18] you load them on demand.
[09:21] And here in this example, what you're
[09:22] seeing is on the left side is uh Claude
[09:25] Code before we added this to Claude
[09:27] Code, and then after it uh
[09:29] to Claude Code. So you see a massive
[09:31] reduction
[09:33] in tool
[09:35] uh use uh tool context usage.
[09:39] The second part of that is is something
[09:40] called programmatic tool calling, or
[09:42] what other people usually refer to um
[09:45] to code mode.
[09:46] Um this is the idea that one thing that
[09:50] you really want to do is you want to
[09:52] compose things together. You don't want
[09:56] the model to go call a tool, take the
[09:58] result, then go and talk, call another
[10:00] tool,
[10:02] take the result, call another tool.
[10:03] Because what you're effectively doing is
[10:05] you're letting the model orchestrate
[10:06] things together, and in that
[10:08] orchestration, you're using inference,
[10:09] you're it's it's latency sensitive, and
[10:12] all of it stuff could be done way more
[10:13] effective if you would instead write
[10:18] a script.
[10:20] Um
[10:21] and in fact, that's actually what you
[10:22] constantly do and what you constantly
[10:24] see things like hard code do when it
[10:26] writes the bash command. But you can of
[10:28] course do this with everything, and you
[10:29] can do this with MCP, and you should do
[10:31] this with MCP. So, what does this mean?
[10:34] So, what you want instead of having one
[10:37] tool at another, you want to give the
[10:39] model a repple tool, provide like a like
[10:42] a execution environment, like a V8
[10:44] isolate or a monty or something like
[10:46] that, or a lua interpreter, and just
[10:49] have the model write the code for you,
[10:51] and the model just executes that code,
[10:54] and then composes them together. And
[10:56] there's a neat little feature in MCP
[10:58] called structured output that tells you
[11:01] what the return value of the output will
[11:04] be, and the model can use this
[11:06] information to to figure out type
[11:08] information, which then mean it can
[11:10] really nicely compose these things
[11:12] together. And in this example here,
[11:15] instead of doing two different calls,
[11:17] you do one call, and you can filter that
[11:19] the model will automatically
[11:21] remove things from a JSON and just
[11:24] continue.
[11:26] Of course, if you don't have uh
[11:28] structured output, you can always just
[11:30] ask the model to give you structured
[11:31] output
[11:32] um
[11:33] uh by just extracting it and saying,
[11:35] "Hey, call us cheap model and say, 'I
[11:37] want this expected type, give it back to
[11:39] me.'" And bam, you have a type, the
[11:41] model can compose things together, and I
[11:43] think this is something we're just not
[11:44] doing enough yet, and this is I think
[11:46] something where we can improve our agent
[11:48] harnesses.
[11:49] And then last but not least, of course,
[11:51] you can just compile compose these
[11:52] things together with executables, like
[11:54] with CLIs, with other components, with
[11:56] APIs as well.
[11:59] Um next, what we need to do besides the
[12:01] client work, which is progressive
[12:03] discovery and
[12:05] um programmatic tool calling, we need to
[12:07] go and start building properly for
[12:09] agents. And that means we all need to
[12:12] stop taking rest APIs and put them
[12:14] one-to-one
[12:16] into
[12:17] uh an MCP server. Every time I see
[12:20] someone building another rest to MCP
[12:22] server a conversion tool, I'm it's a bit
[12:24] cringe because I think it's just it just
[12:26] results in horrible things.
[12:28] Um and what you should do instead, you
[12:30] should design for an agent. Or
[12:31] basically, you can start designing for
[12:33] you as a human, how you would want to
[12:34] interact with this, because that's
[12:36] actually a very, very good start for an
[12:39] agent.
[12:40] If you want to orchestrate things
[12:41] together, you should reach, of course,
[12:44] for programmatic tool calling, and you
[12:45] can do this on the client side, as I
[12:47] said before, but you can also do this on
[12:49] the server side. The Cloudflare
[12:51] MCP server and others like that are
[12:53] great examples how you can have, instead
[12:56] of providing tools, provide an execution
[12:59] environment to the model and then just
[13:00] have them orchestrate things together,
[13:02] which again cuts on token usages,
[13:05] cuts on latency, and is way more
[13:07] powerful in its composition. And then
[13:09] last but not least, you should start and
[13:11] we should start as server authors to use
[13:13] this rich semantics that MCP offers over
[13:16] alternatives. This means shipping MCP
[13:19] applications, it means shipping
[13:21] skills over MCP, it means
[13:24] um using things like task and other
[13:26] aspects that the protocol offers that
[13:29] we're currently slightly underused, or
[13:31] things like elicitations.
[13:33] Things that only MCP can do for you.
[13:35] And of course,
[13:37] that's all the work you all need to do,
[13:39] and maybe some of our product people
[13:41] need to do, we also need to do a lot of
[13:42] work on MCP itself. And there's a few
[13:45] things down the line that we're going to
[13:47] go and have to go and solve.
[13:49] The number one thing is we need to
[13:51] improve the core. There's a few things
[13:53] that, as we have developed the protocol
[13:55] over the last year, that are just not in
[13:57] a good shape. Number one is that the
[13:59] current streamable HTTP is very hard to
[14:01] scale if you're a large hyperscaler.
[14:04] >> [snorts]
[14:04] >> And so, we have a proposal from our
[14:07] friends at Google,
[14:08] who are working on something called a
[14:10] stateless transport protocol, which make
[14:12] it significantly easier to just treat
[14:16] MCP servers like
[14:18] you know, another stateless uh rest
[14:20] server or something like that and we are
[14:21] used to know how to deploy to like cloud
[14:24] runs or kubernetes and so on. So, that's
[14:27] coming down in June and hopefully lining
[14:29] in the SDKs very soon.
[14:31] In addition, we need to improve our
[14:33] asynchronous task primitive, which
[14:36] basically is a very fancy way to say we
[14:38] just want to have agent-to-agent
[14:39] communication. We have a very
[14:41] experimental version of the protocol
[14:42] that very few clients support, so we're
[14:44] going to start building more clients out
[14:47] like that, and most importantly, we are
[14:49] improving some of the little semantics
[14:51] that we need to do. We're going to ship
[14:52] a TypeScript version SDK version two and
[14:55] Python SDK version two based on a lot of
[14:58] the lessons learned over the last year.
[15:01] There's a there's a
[15:04] SDK called fast MCP.
[15:06] Who's using fast MCP? Yeah. It's just
[15:09] way better than Python SDK that
[15:11] we're shipping, right? And that's on me
[15:12] because I wrote the Python SDK.
[15:14] Um and and so, I have a bunch of people
[15:16] who are way better Python developers
[15:17] than me help me write it better. Um the
[15:20] second part is we need to start
[15:23] integrating everywhere. We're going to
[15:24] ship for particularly for enterprises
[15:26] something called cross-app access. It's
[15:28] a new thing that we're working closely
[15:29] together with identity providers, which
[15:31] just allows you It's a very fancy way to
[15:33] say
[15:34] once you log in once with your local
[15:35] company identity provider, be it a
[15:37] Google, be it an Okta, you will be able
[15:39] to just use MCP servers without having
[15:41] to re-login. So, it's a bit more
[15:43] smoothness. Um in addition, we're going
[15:45] to add something called a server
[15:47] discovery by
[15:49] by specifying how you can discover
[15:53] servers on well-known URLs
[15:55] automatically. So, crawlers, browsers,
[15:58] um
[15:58] agents can just go to a website and say,
[16:01] "Oh, I'm instead of just parsing the
[16:02] website, is there also an MCP server I
[16:04] can use?" And we will be able to
[16:06] automatically discover this.
[16:07] This is a really cool thing that will
[16:09] come down also in June when we launch
[16:11] the next specification
[16:13] and will be supported there.
[16:14] And then last but not least, we're
[16:16] starting to use our extension mechanisms
[16:18] in in MCP, which means that some clients
[16:21] will support this, like for example, MCP
[16:23] applications will only be supported by
[16:25] web-based interfaces, because if you're
[16:28] a CLI, you just have a hard time
[16:29] rendering HTML, right? Um and we will do
[16:32] more of these extensions. One of the
[16:33] most exciting extensions that I think is
[16:35] is cool, we're just going to ship skills
[16:37] over MCP, because it's very obvious that
[16:40] if you have a large MCP server with tons
[16:42] and tons of tools, you just want to ship
[16:43] the main knowledge with it and say, "Oh,
[16:46] this is how you're supposed to use this.
[16:47] This is how you're supposed to use
[16:48] this." And it allows you as a server
[16:50] author to continuously ship updated
[16:53] skills without having to rely on plugin
[16:55] mechanisms on registries and other
[16:57] stuff.
[16:57] So, that's coming down.
[16:59] Um
[17:00] there's a lot a lot of experimentation
[17:01] from people already in that space. You
[17:03] can already do some of that today if you
[17:04] just give the model a load skills tool.
[17:07] Like there you can you can build
[17:08] primitives or versions of this today
[17:10] without having to rely on the semantics,
[17:12] but of course, we're going to define the
[17:13] semantics.
[17:15] Okay. So, that's for me a long-winded
[17:17] way to think to say that I think MCP is
[17:20] actually in a really good shape, and I
[17:21] think in this year, we're going to push
[17:24] uh
[17:25] agents to full connectivity,
[17:27] um MCP will continue to play a major,
[17:30] major, major role. And we want, of
[17:32] course, your feedback. We are very open
[17:34] community. We are just have created a
[17:35] foundation. We're mostly running as an
[17:38] open-source community with a discord,
[17:40] with issues. Um just come to us and tell
[17:43] us where the are we wrong, what are
[17:45] we getting right, um so that we can
[17:46] improve this on a continuous basis.
[17:49] So, 2026, I think is all about
[17:51] connectivity, and the best agents use
[17:54] every available method. Like they will
[17:55] use computer use, they will use CLIs,
[17:57] they will use MCPs, and they will use
[17:59] will use skills.
[18:01] Because they want to have a wide variety
[18:03] of things they can do, and then they can
[18:05] ship cool stuff like this,
[18:07] um
[18:08] which is
[18:10] um
[18:11] one of the product features we shipped
[18:13] recently.
[18:14] Uh under the hood, it's nothing but an
[18:16] MCP application
[18:18] um that renders stuff, right?
[18:21] Cool.
[18:23] So, we can now look at uh the model
[18:25] writing graphs.
[18:27] Anyway,
[18:29] thank you.
[18:38] >> [music]
