---
title: "HybridRAG: A Fusion of Graph and Vector Retrieval — Mitesh Patel, NVIDIA"
type: "youtube"
channel: "AI Engineer"
date: "2025-07-22"
resource: "https://www.youtube.com/watch?v=-tgQa8Fzf80"
pillar: "building"
tags: [rag, hybrid-search, graph-rag, evaluation, fine-tuning]
timestamp: "2026-07-12"
extraction_method: "auto-captions"
video_id: "-tgQa8Fzf80"
duration: "20:24"
---

[00:00] [Music]
[00:14] to quickly introduce myself. My name is
[00:16] Mitesh. I lead the develop advocate team
[00:18] at Nvidia. And the goal of my team is to
[00:20] uh create technical workflows, notebooks
[00:23] uh for different applications and then
[00:25] we release that codebase uh on GitHub.
[00:27] So developers in general which is me and
[00:31] you all of us together we can harness
[00:33] that uh that knowledge and take it
[00:35] further for the application or use case
[00:37] that you're working on. So that is what
[00:38] my uh my team does including myself. In
[00:41] today's talk, I'm I'm I'm going to talk
[00:43] about this project that we did with one
[00:45] of our partners um um and some of my
[00:48] colleagues at Nvidia and our partner
[00:50] about how can we create a graph rack
[00:52] system what are the advantages of it and
[00:55] if we add the hybrid nature to it how it
[00:57] is helpful so that's what my uh my talk
[01:01] is going to be on I will not give I will
[01:04] not be able to give you a 10TI view
[01:06] where you can I can dive with you in the
[01:08] codebase but there is a GitHub link at
[01:10] the end of this talk which you can um
[01:13] scan and all these notebooks whatever
[01:15] I'm going to talk about is available for
[01:17] you to take home but I'll give you a
[01:19] 10,000 ft view or if you are trying to
[01:21] build your own graph rag system how can
[01:24] you build it so u a quick refresher what
[01:28] is knowledger graph um and why are they
[01:31] important so um it is a network that
[01:34] represents relationship between
[01:36] different entities and those entities
[01:38] can be anything it can be people places
[01:40] uh concept events. A a simple example
[01:43] would be me being here. What is my
[01:45] relationship to AI worldfare conference?
[01:48] AI engineers worldfare conference and my
[01:49] relationship is I'm a speaker at this
[01:51] conference. What is my relationship to
[01:53] anyone who is attending here? Well, uh
[01:55] our relationship is you attended my
[01:57] session. So this edge of relationship
[02:01] between the two entities becomes very
[02:03] important uh to which only graph-based
[02:06] network can exploit or knowledge graphs
[02:08] can exploit. And that is the reason why
[02:10] uh there's a lot of active research
[02:12] happening in this domain of how you can
[02:14] harness graph rag u how can how you can
[02:18] harness knowledge graph and put it into
[02:20] a rag based system. So the goal is three
[02:24] things. How can you create a triplet
[02:27] which is the which defines the
[02:28] relationship between these entities that
[02:31] graph our graph-based system or
[02:33] knowledge graph is really good at
[02:35] exploiting
[02:38] and that's what is unique about this
[02:40] knowledge graph. So if you think about
[02:43] um um why can they work better than
[02:47] semantic u rag system well it captures
[02:50] the information between entities in much
[02:52] more detail. So those connections can um
[02:55] can provide a very comprehensive view um
[02:58] um of the knowledge that you that you
[03:00] are creating in your rag system and that
[03:03] will become very important to exploit
[03:05] when you are retrieving some of that
[03:06] information and and converting that into
[03:09] into a response for the user who is
[03:11] asking that question and it and it has
[03:14] the ability to organize your data from
[03:17] multiple sources. I mean that's a given
[03:19] no matter u what kind of rack system
[03:21] you're building.
[03:23] So how do we create a graph rag or a
[03:26] hybrid system? So this is the highlevel
[03:28] diagram of what it entails. So I broke
[03:30] it down into four components. The very
[03:32] first thing is your data. You need to
[03:34] process your data. The better you
[03:35] process your data, the better is a
[03:37] knowledge graph. The better is a
[03:38] knowledge graph, the better is the
[03:39] retrieval. So four components data, data
[03:42] processing, your graph creation or your
[03:44] semantic u embedding vector database
[03:48] creation. Those are the three uh steps.
[03:50] And then the last step is of course
[03:51] inferencing when you're asking questions
[03:54] uh to your u rag pipeline.
[03:58] And at a higher level this can be broken
[04:00] down into two big pieces offline online.
[04:04] So all your data processing u work which
[04:07] is a one-time process is offline and and
[04:11] once you have created your knowledge
[04:13] graph which is your triplet entity
[04:15] relationship entity 2 um or your
[04:18] semantic vector database once you have
[04:21] it then it's all about quering it and
[04:22] converting that information into um um a
[04:26] response that is readable to the user.
[04:28] It cannot be something that here are the
[04:30] three relationship and then we as the
[04:33] user have to go figure out what does
[04:35] this exactly mean.
[04:38] So the top um part of this u flow
[04:42] diagram is where you build your semantic
[04:45] u vector database which is you you pick
[04:49] your uh u documents and then you convert
[04:52] them into vector embeddings and you
[04:53] store into a vector database.
[04:56] So that piece is uh is how you create
[04:58] your semantic uh vector database and
[05:01] then the piece below is um how you
[05:03] create your knowledge graph and it is
[05:06] much more uh um there are much more
[05:09] steps that you have to follow a care
[05:11] that you have to take when you're
[05:12] creating your knowledge graph.
[05:18] So diving in the first step creating
[05:20] your knowledge graph. How can you create
[05:22] those triplets out of documents that are
[05:24] that are not that structured? So
[05:27] creating triplets which uh which exposes
[05:29] the information between two entities and
[05:31] picking up those entities uh so that
[05:33] that information becomes helpful is very
[05:35] important. Here's a simple example. This
[05:37] document is of Exxon Mobile's uh results
[05:40] I think uh their quarterly results and
[05:43] we we tried to pick up um the
[05:46] relationship or create the the knowledge
[05:48] graph using an LLM and if you see at the
[05:51] first line it's Exon Mobile which is a
[05:53] company that's the entity uh cut is the
[05:56] feature of um of that entity spending
[06:00] oil and gas exploration um and activity
[06:04] my apologies cut is the relationship
[06:06] between Exxon on mobile and spending on
[06:08] oil and gas exploration and activity is
[06:11] the the um the name of the entity
[06:14] spending on oil and gas exploration. So
[06:16] this is how the relationship needs to be
[06:18] exploited. Now the question that comes
[06:19] to our mind is that sounds very
[06:23] difficult to do and exactly it is
[06:25] difficult to do and that is the reason
[06:26] why we need to harness uh or we need to
[06:29] use LLM to figure out a way to extract
[06:31] this information and structure it for us
[06:33] so that we can save it in um um in a
[06:37] triplet format and how can we do that
[06:41] prompt engineering but we need to be
[06:43] much more uh uh uh defined about it. So
[06:47] you based on the use case that you are
[06:49] trying to work on you can define your
[06:51] oncology and once you have defined your
[06:54] oncology you can put it in your prompt
[06:56] and then ask the LLM to go extract this
[07:00] information that is oncology specific
[07:03] from the documents and then structure it
[07:05] in that way so that that can be stored
[07:07] in a form of a triplet. This step is
[07:09] very important. You might be spending a
[07:12] lot of time here to make sure your
[07:13] prompt is doing the right thing and it
[07:16] is creating the right oncology for you.
[07:18] If your oncology is not right, uh if
[07:20] your triplets are not right, if they are
[07:22] noisy, your retrieval will be noisy. So
[07:25] this is where you will be going back and
[07:27] forth figuring out how to get a better
[07:30] oncology.
[07:32] So th this is where you will spend my
[07:34] take is this is where you'll spend uh
[07:36] 80% of your time to make sure you get
[07:37] the oncology right and you'll be going
[07:39] back and forth in an iterative manner to
[07:41] see how you can make it better over time
[07:46] and then the next vector database for a
[07:48] hybrid rack system is to create the
[07:50] semantic vector database and that is
[07:52] very reasonably straight straight
[07:54] straightforward or it is well studied.
[07:56] So you pick your document. This is the
[07:57] first page of attention is all you need
[07:59] research paper. And you you break it
[08:01] into chunk sizes and you you have
[08:04] another factor called overlap. And chunk
[08:06] sizes are important because what
[08:08] semantic vector database does is it will
[08:10] it will pick up that chunk and convert
[08:13] that into use the embedding model and
[08:14] convert them into a u embedding vector
[08:17] and store into the vector database. And
[08:19] it will if you don't have an overlap
[08:22] then the context between the previous
[08:23] and the and the next chunk will be lost.
[08:25] if there is any relationship. So you try
[08:27] to be smart on how much overlap do I
[08:30] need between my previous chunk and the
[08:31] and the next chunk and what is the size
[08:34] of the chunk that I should uh I should
[08:36] use when I'm chunking my documents into
[08:37] different paragraphs. That is where the
[08:39] the advantage of graph rag comes into
[08:42] play because uh if you think about it
[08:44] the important information which is uh
[08:46] the relationship between different
[08:48] entities are not exploited by u by your
[08:51] semantic uh uh vector database but they
[08:53] are exploited really well when you're
[08:56] trying to um use a knowledge graph or
[08:59] create a knowledge graph based system.
[09:01] So once you have created this uh um this
[09:04] knowledge graph what is the next step?
[09:05] Now, now comes the retrieval piece which
[09:07] is um um you you ask a question what is
[09:11] Exon Mobile's
[09:13] cut this quarter that that it is looking
[09:16] like and knowledger graph
[09:18] will will help you figure out how to
[09:21] retrieve those nodes or those entities
[09:23] and the relationship between them. But
[09:26] if you do uh a very flat retrieval which
[09:30] is a single hop you are missing uh the
[09:33] the most important u piece that graph
[09:37] allows you which is exploitation through
[09:39] multiple nodes that you can think about
[09:41] and that becomes very very very
[09:43] important. I I cannot stress how
[09:44] important that becomes. So think of
[09:46] different strategies. Again you will
[09:47] spend a lot of time to optimize this
[09:49] whether you should look at um single
[09:51] hop, double hop, how much deep you want
[09:53] to go so that nodes um the relationship
[09:55] between your first node to the second
[09:57] node, your second node to the third node
[09:59] is exploited pretty well. And and the
[10:02] the more deeper you go, the better
[10:04] context you'll get. But there's a
[10:05] disadvantage of that. The more deeper
[10:06] you go, the more time you're going to
[10:08] spend on retrieving that information. So
[10:10] then uh uh latency becomes a factor as
[10:13] well especially when you're working in a
[10:14] production environment. So there is a
[10:16] sweet spot that you'll have to hit when
[10:17] you're trying to um go how deep you want
[10:21] to go how how many hops you want to go
[10:23] into your graph versus how many uh what
[10:26] is the latency that you can u you can
[10:28] survive. So so that becomes very uh very
[10:31] important
[10:33] and those some of those searches can be
[10:35] accelerated. So um um um we created a
[10:38] library called cool graph um which which
[10:40] is a which is available or integrated in
[10:42] a lot of um libraries out there like
[10:44] network X and whatnot. But that
[10:46] acceleration becomes important so that
[10:48] it gives you the flexibility to get
[10:50] deeper into your graph go through
[10:52] multiple hops but at the same time you
[10:54] can reduce the latency so your
[10:56] performance of your graph improves uh a
[11:00] lot.
[11:02] So this is the where the retrieval piece
[11:04] comes into play where you can have
[11:05] different strategies defined so that
[11:07] when you're querying uh your data um and
[11:10] get getting the responses you can have
[11:12] better responses
[11:16] and the other important piece I
[11:18] personally worked on this piece so I I
[11:20] can talk at length on this but uh I'm
[11:22] I'm going to give you a very high level
[11:23] um is evaluating the performance and
[11:26] there are multiple factors that you can
[11:27] evaluate around faithfulness um answer
[11:30] relevancy uh precision recall
[11:32] um um if you try to use an LLM model,
[11:35] helpfulness, collectiveness, coherence,
[11:36] complexity, verbosity, all these factors
[11:39] becomes very important. So there is a
[11:41] library pistol library called Ragas. Um
[11:44] it is meant to evaluate your rag
[11:47] workflow end to end. Anyone who used
[11:50] Ragas for evaluating your graph rag? All
[11:52] right, a few of them. Thank you. But it
[11:54] is it is an amazing library that you can
[11:56] uh uh use to evaluate your uh your rag
[12:00] pipeline end to end because it evaluates
[12:02] the response. It evaluates the retrieval
[12:05] and it evaluates what the query is. So
[12:07] it it will evaluate your your pipeline
[12:09] end to end which becomes very handy when
[12:11] you're when you're trying to test
[12:13] whether my retrieval is doing the right
[12:14] thing or whether my uh the questions
[12:16] that I'm asking is the LLM interpreting
[12:18] it in in the right way or not. So you
[12:19] can break down your responses in u the
[12:22] raas pipeline will evaluate all those
[12:25] pieces and see what your eventual score
[12:27] is. So it is a pip install library. The
[12:29] other is LLM uh and Ragas under the hood
[12:32] uses an LLM um no surprises there. By
[12:35] default, it is integrated with GPT, but
[12:39] it provides you the flexibility that if
[12:42] you have your own um model, you can
[12:45] bring it in as well and you can uh wire
[12:48] it up with your API and you can use that
[12:50] LLM to figure out on these four four
[12:54] evaluation parameters that RAS offers.
[12:56] So, so it's a it's it's it's quite comp
[12:58] I would say it's comprehensive but it's
[12:59] really good in terms of giving you that
[13:01] flexibility. The other path is uh using
[13:05] a model that is meant to evaluate
[13:07] specifically the response coming out of
[13:09] LM. And that is where this model
[13:11] Lanimotron 340 million reward model that
[13:13] we released I think few years ago. At
[13:15] that time it was a really good response
[13:16] model. It's it's a 340 billion parameter
[13:19] model so reasonably big but uh it
[13:21] evaluates
[13:23] um it's a reward model. So it will go
[13:25] and evaluate the response of another LLM
[13:27] and judge it in terms of um how the
[13:30] responses are looking looking like on
[13:32] this five parameters but it is meant to
[13:35] go and judge other LLMs. That is how it
[13:37] was trained.
[13:42] So moving further I would like to use
[13:44] this analogy that for u to create a
[13:47] graph ra system it will take you uh
[13:50] which is 80% of the job it will take you
[13:52] 20% of your time but then to make it
[13:56] better which is the last 20% uh sorry
[13:59] which is the um the 80/20 rule the last
[14:02] 20% will take 80% of your time because
[14:05] now you are in the process of optimizing
[14:07] it further to make it make sure it
[14:09] works. for the use case good enough um
[14:13] um for for the application that you're
[14:15] working on and there are some strategies
[14:17] there which I would like to walk you
[14:19] through so one as I said before which I
[14:21] couldn't stress enough the way you are
[14:23] creating your knowledge graph out of
[14:25] your unstructured data becomes very
[14:27] important the better your knowledge
[14:29] graph the better results you're going to
[14:31] get and something that we did as
[14:35] experimentation through this use case
[14:37] that we were exploring with one of our
[14:38] partners
[14:39] uh was can we fine-tune an LLM model to
[14:42] get the quality of the of the triplets
[14:46] that we are creating better and does
[14:49] that improve results? Can we do a better
[14:51] job at data processing like removing
[14:53] reax, apostrophes, brackets, words that
[14:56] characters that don't matter? If we
[14:59] remove them, does it give you better
[15:01] results? So these are like small things
[15:03] that um that you can think about but it
[15:05] gives you it it improves the performance
[15:07] of your overall system. So that is where
[15:09] you I'm talking about 80% of your time
[15:11] small nitty-gritty of the things that
[15:12] you are the knobs that you are
[15:15] fine-tuning with slowly and steadily to
[15:18] make sure your performance gets better
[15:19] and better and I would like to share a
[15:22] few strategies that we did which we got
[15:24] uh which led us to uh uh which led us to
[15:27] get better results.
[15:30] So the very first thing is uh reax or
[15:33] just cleaning out your data. Um we we
[15:36] removed uh apostrophes as other other
[15:39] characters that are not that important
[15:41] if you think about uh triplet generation
[15:44] that led us to uh um to better uh better
[15:48] results. We we then implemented another
[15:50] strategy of reducing the not not missing
[15:54] out of longer output making it smaller.
[15:57] that got us uh uh better results and we
[15:59] also fine-tuned the um the llama 3.3
[16:02] model or 3.2 model and that got us
[16:04] better better results. So if you look at
[16:06] the last three columns you'll see that
[16:09] by using llama 3.3 as is we got 70 1%
[16:13] accuracy. So this was tested on 100 uh
[16:16] triplets to see how it is performing and
[16:19] as it got sorry 100 documents. So as it
[16:22] got better and uh as we introduced Laura
[16:24] we fine the llama 3.1 model our our
[16:27] accuracy or performance went up from 71
[16:30] to 87%. And then we did those small
[16:32] tweaks uh it improved the performance
[16:34] better. Again remember this is on 100
[16:36] documents so the accuracy is looking
[16:37] high but if your document pool increases
[16:39] that will come down a bit but in
[16:40] comparison to where we were before we
[16:43] saw improvement and and that is where
[16:45] the small uh tweaks come into play which
[16:47] would be very very very helpful to you
[16:49] when you're putting a a system um a
[16:52] graph rag or a rack system into
[16:53] production.
[16:56] The other is from a latency standpoint.
[16:58] Um so if your graph gets bigger and
[17:01] bigger now you're talking about a
[17:03] network which which goes into millions
[17:04] or billions of parameter and uh or
[17:07] millions and billions of nodes. Now how
[17:09] do you how do you do search in um in
[17:11] those millions and billions u
[17:15] in the graph that has got millions or
[17:17] billions of nodes and that is where
[17:19] acceleration comes into play. So with
[17:21] with with cool graph which is now
[17:22] available through network X. So network
[17:24] X is also al also a pip install library.
[17:27] Uh anyone who used network X here right
[17:30] few okay um so network is also a pip
[17:33] install library under the hood um it
[17:35] uses um acceleration and if you see a
[17:37] few of the algorithms uh we um we we did
[17:40] a performance test on that and um you
[17:44] can see the amount of latency in terms
[17:45] of overall execution reducing
[17:47] drastically. So that is where you can
[17:49] again small tweaks which will lead you
[17:51] to better results. So these are two
[17:54] things that we experimented which led us
[17:56] to to better results in terms of
[17:57] accuracy as well as reducing the overall
[18:00] latency and these are small tweaks and
[18:02] it it leads us to better results.
[18:07] So then the question obviously is should
[18:09] I uh use graph or should I use semantic
[18:13] um based rack system or should I use
[18:14] hybrid and I'm going to give you the
[18:16] diplomatic answer. It depends but but
[18:19] there are few things I would like to you
[18:21] guys to take home to to um um which will
[18:24] help you to come up to a decision so
[18:26] that you can make an educated guess that
[18:27] for this use case that I'm working on a
[18:29] rack system would solve the problem I
[18:31] don't need a graph and vice versa or I
[18:34] need a hybrid approach so it depends on
[18:36] two two factors one is your data um
[18:40] traditionally if you look at retail data
[18:41] if you look at FSI data if you look at
[18:43] employee database of companies those
[18:45] have a really good structure structure
[18:47] defined. So those kind of data set
[18:50] becomes really good use cases for graph
[18:53] based system and the other thing you
[18:56] think about is even if you have
[18:57] unstructured data can you create a good
[19:00] uh graph knowledge graph out of it. If
[19:02] the answer is yes then it's worthwhile
[19:04] experimenting uh um with u to go the
[19:08] graph path and it depend it will depend
[19:10] on the application and use case. So if
[19:12] your use case requires to um to
[19:14] understand the complex relationship and
[19:16] then extract that information u um to
[19:19] for the response that you um for the
[19:21] questions that you are asking only then
[19:23] it makes sense uh to use graph because
[19:25] remember these are compute heavy uh
[19:27] heavy systems. So you need to make sure
[19:28] that these things are taken care of. I
[19:31] am running out of time I think but u as
[19:33] I said before all these things that I
[19:36] talked about I gave you a 10,000 ft view
[19:37] but if you want to get a 100 ft view
[19:39] where you are coding into into things
[19:41] all these things is available on GitHub
[19:43] even the finetuning of the llama 1.1
[19:45] Laura model and we had a workshop a
[19:47] two-hour workshop so I gave you a
[19:48] 20-minute talk but this whole workshop
[19:50] is covered uh in two hours as well and
[19:52] lastly um join our developer programs we
[19:55] do release all these things on a regular
[19:57] basis you if you join the mailing list
[19:59] you get this information based on your
[20:01] interest and as u my colleague mentioned
[20:04] I will be across uh the hall at Neo4j
[20:07] booth uh to answer questions if any I
[20:09] would love to interact with you and see
[20:11] if you have any qu uh any questions and
[20:13] I can answer those questions. Thank you
[20:14] for your time.
[20:15] [Applause]
[20:18] [Music]
