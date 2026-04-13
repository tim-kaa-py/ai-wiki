---
title: "Why Andrej Karpathy Abandoned RAG (Claude Code x Obsidian)"
source_type: "youtube"
channel: "sayed.developer"
date: "2026-04-07"
url: "https://www.youtube.com/watch?v=WgqqoSkC0bw"
video_id: "WgqqoSkC0bw"
duration: "12:57"
pillar: "building"
tags: [karpathy, wiki, obsidian, claude-code, rag, knowledge-management]
ingested: "2026-04-09"
extraction_method: "auto-captions"
---

[00:00] Despite Cloud Code being the best coding
[00:02] assistant in the world, people are still
[00:03] finding ways to really push the limits
[00:06] of it. What you are seeing here is my
[00:08] Instagram videos that I made organized
[00:10] in this graph view. For example, if I
[00:13] click on one entity here, you can see
[00:16] that it's Google Maps API. So, I talked
[00:19] in one of my videos about Google Maps
[00:21] API, but also you can see a lot of other
[00:24] entities and also some topics related
[00:27] for example to an API concept. This is
[00:29] one of the first videos I made. So, here
[00:32] you will see API application programming
[00:33] interface like the definition coverage
[00:36] in videos and some also links concept
[00:39] mock interview concept server, which is
[00:42] another video that I made. This is all
[00:44] created by Cloud Code in a technique
[00:46] that was mainly introduced by Andre
[00:50] Karpathy with who is an AI researcher
[00:52] and I will show you how to do this in
[00:54] just 5 minutes. So, to give you a bit of
[00:56] background, he posted on X where he says
[00:59] LLM knowledge bases and he's explaining
[01:02] what he's finding really interesting and
[01:03] useful using LLMs like Cloud Code. So,
[01:06] he's saying something I'm finding very
[01:08] useful recently using LLMs to build
[01:10] personal knowledge bases for various
[01:12] topics of research interest. In this
[01:15] way, a large fraction of my recent token
[01:17] throughput is less less into
[01:19] manipulating code and more into
[01:21] manipulating knowledge stored as
[01:23] markdown and images. And this is exactly
[01:26] what we are doing here. I have my video
[01:28] scripts stored as markdown files. We
[01:31] will talk about it, but just to
[01:32] understand the concept behind this,
[01:35] it is mainly creating your own digital
[01:38] brain starting with the data ingest. You
[01:40] are indexing source documents like
[01:41] articles, papers,
[01:43] repos, or in my case my Instagram videos
[01:47] into raw directory, which is represented
[01:50] here in raw as you can see, and then
[01:53] letting the LLM incrementally compile
[01:57] wiki, which is just a collection of MD
[02:00] files in a directory structure and the
[02:02] wiki includes summaries of all the data
[02:04] in the raw directory, backlinks, and
[02:08] then categorizes data into concepts,
[02:10] writes articles about them, and link
[02:12] them together as we saw here. So, here
[02:15] you can also as we mentioned before, you
[02:17] can see some entities like here there is
[02:19] an entity called Cloudflare, which I
[02:21] mentioned Cloudflare in one of my
[02:23] videos, but also you see a lot of like
[02:26] concepts that are layered and are
[02:28] connected to each other. And this is
[02:31] like part one of this data ingestion and
[02:34] these are all based on the markdown
[02:36] files that I have in my raw directory.
[02:38] So, this is how it start. And then we're
[02:41] using Obsidian as the IDE, which is the
[02:44] front end where he can view the raw data
[02:47] as the compiled wiki and the derived
[02:49] visualizations. Important to know that
[02:51] the LLM writes all of the data of the
[02:53] wiki. I rarely touch it. So, what we
[02:56] need to understand from here is I like
[02:58] this analogy of the digital brain. If
[03:00] you're focused on content creation or if
[03:02] you're a student that is focused on
[03:04] research, you can really take all the
[03:07] resources that you find useful on the
[03:08] internet and then put them in the raw
[03:10] directory and let Cloud Code create this
[03:13] wiki for you out of the box and you
[03:15] don't need to touch anything and this
[03:17] wiki will be organized in MD files that
[03:20] are by nature connected in this way that
[03:23] we see in this graph. And Obsidian is
[03:25] just a tool that let us basically
[03:28] visualize all of this in a very nice
[03:30] way. And then he's talking about where
[03:32] things get interesting is that once your
[03:34] wiki is big enough, for example, his is
[03:36] 100 articles and 400 words, you can ask
[03:39] your LLM agent all kinds of complex
[03:41] questions against the wiki and it will
[03:43] go off, do the research because it has
[03:46] all like kind of this connections and
[03:48] backlinks and all in markdown files,
[03:51] which makes it really powerful. And he
[03:53] mentioned, I thought I had to reach out
[03:55] for some fancy rag, but the LLM has been
[03:57] pretty good about auto maintaining the
[03:59] index files and brief summaries of all
[04:02] the documents. And the output instead of
[04:04] getting answers in text terminal, I like
[04:06] to have markdown files for me or
[04:09] slideshows. You can use Marp, which is
[04:11] like a tool that make basically
[04:13] PowerPoint presentations. So, now I will
[04:15] show you exactly how to replicate this
[04:17] setup, but for your use case. Want to go
[04:19] to Obsidian and then create a new vault.
[04:22] So, you go to manage vaults, create a
[04:24] new vault. So, you will create a new
[04:26] vault and then browse location. I will
[04:28] put it in my workspace and I will call
[04:31] this research
[04:33] brain, which means that I want to have
[04:37] it at the as a digital brain where I
[04:40] basically put all the resources I have
[04:42] around certain research
[04:44] and then it will create automatically
[04:45] this wiki for me and then later I can
[04:48] query this and get really nice results.
[04:51] So, as you can see, we have an empty
[04:53] basically files in Obsidian. We have our
[04:56] graph view is very basic, the welcome
[04:58] and the create link, which you can see
[05:00] here. And now what we want to do is we
[05:03] basically want to populate it, right?
[05:05] So, what we need for this is we need
[05:08] resources as articles, research
[05:10] articles, and we need Cloud Code. And to
[05:13] show you actually what is happening
[05:14] behind the scenes, I think it's a good
[05:16] idea to open this in Visual Studio Code.
[05:18] So, if I go to Visual Studio Code and I
[05:20] open folder and I go to my workspace and
[05:24] then I reach out for the research brain,
[05:26] I am able to see basically the Obsidian
[05:29] and the welcome exactly matching what we
[05:31] saw what we saw before. Andre said, I
[05:34] wanted to share a possible slightly
[05:35] improved version of the tweet and he
[05:37] shared with us a gist, which is
[05:40] basically the description of how this
[05:42] works. And then we can basically copy
[05:44] paste all of this and pass it to Cloud
[05:46] Code and let it basically create for us
[05:49] a wiki that we are interested in. So, if
[05:52] I copy all of this now and I go to Cloud
[05:55] Code and then instruct it of what
[05:58] exactly you want to do. So, I will hold
[06:00] the space to use the voice feature and
[06:02] explain to it what exactly I want to
[06:04] achieve. I want you to read Andre
[06:06] Karpathy's method on how to basically
[06:09] create a wiki and manage it and I want
[06:12] to focus on wiki that is around my
[06:16] research interest. So, I will throw in
[06:18] raw directory a lot of research papers
[06:21] or research sources and I want you to
[06:24] manage all of that for me in the Andre
[06:27] Karpathy's way as instructed above. And
[06:30] then I hit enter and then Cloud Code is
[06:33] going to basically replicate this setup
[06:36] that Andre Karpathy has created and will
[06:38] basically we will slowly start seeing
[06:41] the files getting created here. So, you
[06:43] see here we got the raw, which has the
[06:46] assets and we got the wiki and Cloud
[06:49] Code is working on the setup. But what I
[06:52] want you to understand here is really
[06:54] the focus is on getting resources from
[06:58] the internet or from wherever you want
[07:00] and really throw them into the raw
[07:03] directory without thinking about it and
[07:06] Cloud Code will be able to like reason
[07:08] around the context that is inside these
[07:12] and will basically create for you this a
[07:15] wiki that has different levels. You have
[07:17] analysis, concept, entities, and sources
[07:20] that are basically linked together and
[07:22] that are represented as nodes in this
[07:24] graph that we see here. So, here we have
[07:26] the overview and then we have the index
[07:29] and logs and we will talk about them
[07:31] just shortly. But once you are done, you
[07:33] are basically ready to take any source
[07:37] and put it in the raw and I will show
[07:39] you how Cloud Code will be able to do
[07:41] it. Here Cloud Code is explaining how to
[07:44] use it actually. Ingest, drop a paper
[07:46] article into the raw, use Obsidian web
[07:48] clipper for articles, and query ask me
[07:51] anything about your research and I'll
[07:53] I'll search the wiki and lint say lint
[07:56] the wiki and I'll health
[08:11] go and check for some stale information
[08:14] or some
[08:16] orphans or contradictions or gaps that
[08:19] are in your knowledge base and clear
[08:20] them once you say lint. It's like the
[08:23] code linter. So, now what we want to do
[08:25] is we want to go to Obsidian web clipper
[08:29] and add it. So, I already added to
[08:32] Obsidian web clipper. It's also free.
[08:34] You can just download it. And then I
[08:36] want to go to a research page that I
[08:38] like from Anthropic. Since the main
[08:40] reason from this wiki is basically to
[08:42] manage the digital brain of my own
[08:45] research. So, for example, I'm
[08:46] interested in this page around alignment
[08:49] faking in large language models. So, I
[08:51] will go to extensions and I will use
[08:54] Obsidian web clipper to do it. I have
[08:56] already set up place where to basically
[08:59] paste this in raw. So, I will add to
[09:02] Obsidian. I will open Obsidian and you
[09:04] will see exactly alignment faking in
[09:06] large language models is placed inside
[09:08] the raw. So, you can see that also the
[09:11] web clipper did a really good job in
[09:13] extracting the information from this web
[09:16] page including the images. So, this is
[09:18] actually really nice. After that, I can
[09:20] really now go to Cloud Code and say the
[09:22] following. So, I hold space and I say,
[09:25] "Hey, I placed one research paper in the
[09:28] raw directory. I want you to ingest it,
[09:30] please." And now Cloud Code will go
[09:32] ahead and read it and then reason around
[09:35] it and insert it in the wiki in this
[09:38] specific kind of style, which is like
[09:41] connections, concepts, entities, sources
[09:44] as you can see here. So, here you can
[09:46] see source alignment. I can see that
[09:48] it's connected to multiple things. It's
[09:50] connected to concept deceptive
[09:52] alignment, entity Redwood Research,
[09:56] entity Claude 3 Opus. So, we have also
[09:59] like different backlinks and so on, and
[10:01] it's slowly like kind of building it up.
[10:04] Which is I think a really interesting.
[10:06] And you could imagine that if you want
[10:09] to build more on top of it, you could
[10:12] take more research papers and then use
[10:15] web clipper. So, here I can also do the
[10:17] same for this. I can use web clipper,
[10:19] Obsidian web clipper and add to Obsidian
[10:21] then and open and then is also added and
[10:24] then I can go back to Claude code and
[10:26] say, "Hey, I have added a new resource
[10:29] in the raw file. Please detect it and
[10:31] also ingest it in my wiki." And we will
[10:34] also see more and more build up of this
[10:37] small knowledge base or graph view that
[10:40] we see here. I think what's really
[10:42] important to mention here as while while
[10:44] this is really powerful and really
[10:46] interesting, I think it's still not
[10:49] scalable. Even Andre is was mentioning
[10:51] that he has only 100 articles. So, you
[10:53] could really imagine when we have like
[10:55] gigabytes of data that we want to query,
[10:57] rag is still the best option there. I
[10:59] also want to mention something really
[11:01] important around the index and the log
[11:03] that we need to know, that we need to
[11:05] understand. The wiki index is basically
[11:07] the catalog of all the pages in the wiki
[11:09] organized by type. So, here we have like
[11:11] the sources, the entities, the concepts
[11:14] and the analysis and every piece of them
[11:17] is small description of it. I think this
[11:18] is really important to note. And also
[11:21] regarding the log is the chronological
[11:23] record of all wiki operations. So, when
[11:26] you for example ingest a long running
[11:29] Claude for scientific computing and here
[11:32] ingested research for example, it really
[11:35] keeps the time when did you ingest that
[11:38] article and basically when you
[11:40] initialize. So, it's like from down up
[11:43] you see it. Wiki initialize. So, this is
[11:45] the first operation that was done. For
[11:47] example, ingest alignment faking in
[11:49] large language models, which is the
[11:50] first article that we ingested. I think
[11:53] index and log are really important to
[11:55] understand. And of course, we have the
[11:57] Claude that MD file that is describing
[11:59] what are we doing in this project for
[12:02] Claude to understand every time what it
[12:05] should do. So, here we have research
[12:06] brain LLM wiki schema. This is a
[12:08] personal research knowledge base
[12:10] following the LLM wiki pattern. So, you
[12:11] can tell of course that Claude will
[12:14] basically read this file on every
[12:16] session to understand what we basically
[12:18] did and how will it answer us and the
[12:21] knowledge that it has in this wiki. And
[12:23] it also has like instructions around the
[12:25] technique used by Andre that we pasted
[12:28] in the very first time we created all of
[12:30] this around like conventions, ingestion,
[12:33] querying, and linting, and index and log
[12:36] format. So, it's like a full description
[12:38] for Claude code every time it start a
[12:40] session to understand that hey, this is
[12:42] a digital brain. Now the user will query
[12:45] me against it and I have to answer it
[12:47] based on this specific structure that is
[12:51] built for. If you guys found this useful
[12:53] and helpful, consider subscribing to my
[12:55] channel and I'll see you next time.
