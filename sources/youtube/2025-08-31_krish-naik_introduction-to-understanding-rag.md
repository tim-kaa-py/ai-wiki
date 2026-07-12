---
title: "Introduction To Understanding RAG (Retrieval-Augmented Generation)"
type: "youtube"
channel: "Krish Naik"
date: "2025-08-31"
resource: "https://www.youtube.com/watch?v=fZM3oX4xEyg"
pillar: "building"
tags: [rag, architecture, embeddings, vector-database, tutorial]
timestamp: "2026-07-12"
extraction_method: "auto-captions"
video_id: "fZM3oX4xEyg"
duration: "20:40"
---

[00:00] Hello all, my name is Krishna and
[00:02] welcome to my YouTube channel. So guys,
[00:04] I am super excited to start this new
[00:07] series on one of the most important
[00:09] technique which is right now being used
[00:11] in genative AI and agentic AI field that
[00:14] is nothing but rag. If you don't know
[00:17] the full form of rag, it is called as
[00:18] retrieval augmented generation. In this
[00:21] specific video, we will try to
[00:23] understand what exactly is rag. uh what
[00:26] are the disadvantages of just using the
[00:28] LLM model and how we are overcoming
[00:31] those disadvantages with the help of rag
[00:34] when should we use rag and what are the
[00:37] important pipelines that we should take
[00:40] a note while developing a rag
[00:41] application okay so all this topics we
[00:44] will be discussing and as we go ahead we
[00:47] are going to implement each and every
[00:50] important pipelines with the help of
[00:52] Jupyter notebook and I will also show
[00:54] you with the help of modular coding
[00:55] Right. So both the ways we will try to
[00:58] implement it. Now why I'm stressing on
[01:01] this specific series because nowadays
[01:04] every companies are looking for
[01:06] professionals who are who knows how to
[01:08] build rag applications because if you
[01:11] see various AI engineering reports there
[01:14] many of the companies around 60 to 70
[01:16] projects percentage of the projects are
[01:18] specifically on rag application. So let
[01:21] me quickly go ahead and share my screen
[01:23] and start discussing about rag. This is
[01:26] just the introduction video of rag. Uh
[01:28] and as we go ahead we'll be implementing
[01:30] more amazing examples. So let me quickly
[01:32] go ahead and show you. So this is a
[01:35] simple definition that uh I've put up
[01:38] over here and uh in this definition
[01:41] first of all we'll try to understand
[01:43] rag. Okay. So first of all let's go
[01:45] through the definition and then I will
[01:47] give you a brief idea what exactly rag
[01:49] is all about you know. So here you can
[01:52] clearly see that rag is the process of
[01:55] optimizing the output of a large
[01:59] language model. Okay. So it references
[02:04] an authorative knowledge base outside of
[02:07] it training data set source before get
[02:10] generating a response. LLMs are trained
[02:13] on vast volume of data as we all know
[02:16] and use billions of parameters to
[02:18] generally original output for task like
[02:21] question answering, translating and
[02:22] completing sentences. Rag extends the
[02:25] already powerful capabilities of LLM to
[02:28] specific domain or an organizational
[02:30] internal knowledge base all without the
[02:33] need to retrain the model. Okay. It is
[02:36] cost- effective approach to improve LLM
[02:38] output. So it's relevant, accurate and
[02:41] useful in various context. So this is
[02:43] just a basic definition. You can refer
[02:44] to this particular definition. So guys,
[02:47] now let's go ahead and understand about
[02:48] rag. So let's consider that I have a
[02:52] generative AI application. And as you
[02:54] all know in a generative AI application,
[02:56] usually let's say that I have an LLM. So
[02:59] this is my LLM. Now usually whenever we
[03:02] have a LLM what happens is that let's
[03:04] consider that I have a user
[03:07] a user is asking a query. So this is a
[03:11] my query from the user and before it is
[03:15] sent to the LLM we do add a prompt right
[03:20] we do add a prompt and this prompt is
[03:22] just like an instruction to the LLM like
[03:24] how the LLM should work okay and then
[03:28] based on this we actually get an output
[03:32] now this is a simple generative AI
[03:33] application wherein the LLM is used to
[03:36] generate the content
[03:40] Okay, generate the content. So obviously
[03:44] by using this specific technique we give
[03:47] a query and this LLM you know that it
[03:49] has been trained with billions of data
[03:53] okay different kind of data that is
[03:55] available in the internet and based on
[03:58] this it will be able to generate the
[03:59] output. One of the disadvantage of this
[04:04] let me talk about the disadvantage of
[04:06] this particular approach. As you know
[04:08] that every LLM that is trained you know
[04:11] it will be trained for a specific set of
[04:14] data. So let's say right now it is 31st
[04:17] August. Okay 31st August.
[04:21] Let's say this is my LLM model and this
[04:23] is basically GPT5
[04:25] which is the recent model from OpenAI.
[04:28] Now as you know that when this model was
[04:30] launched this model may be trained
[04:33] by may be trained with data till 1st
[04:37] August. Okay. So this LLM will not have
[04:41] any idea what has basically happened in
[04:44] the current world between 1st to 31st
[04:46] August. Right? And let's say if I go
[04:49] ahead and ask a specific question to the
[04:52] LLM which is between this specific dates
[04:55] for any kind of events the LLM will
[04:58] start hallucinating. So one of the major
[05:01] disadvantages of only using the LLM is
[05:05] that it will hallucinate. Okay. When we
[05:08] say hallucinating what does this
[05:10] basically mean? It means that even
[05:13] though it does not have the knowledge
[05:14] what has happened between 1st August to
[05:17] 31st August any events even though we
[05:19] ask any question the LLM will try to
[05:22] generate it own answer because it does
[05:25] not want to look like a fool. Okay, that
[05:28] is the best example. It does not want to
[05:30] look like a fool. So it will try to
[05:32] generate some answers and it will make
[05:34] sure that it will it'll show you answer
[05:37] that you may also have to believe it.
[05:39] that is how it will be written you know
[05:41] in in terms of the output that we get so
[05:44] usually this condition is basically
[05:45] called as hallucinating okay so this is
[05:48] one of the major disadvantage
[05:51] the second disadvantage that you have so
[05:53] let's say that I'm using this LLM and
[05:55] you know this LLM has been trained with
[05:57] huge amount of data now what happens is
[06:00] that I'm running a startup
[06:03] let's say now in my startup I'm solving
[06:06] a specific use case and I have some data
[06:11] which again I need to use this
[06:13] particular data along with my LLM. Okay.
[06:16] So let's say that I have some other data
[06:18] like you know um policies policies of my
[06:23] company I have HR policies of my company
[06:27] I have finance policies you know and
[06:30] this policies all will not be available
[06:33] in the it will not be available publicly
[06:35] because it is my startup so these all
[06:38] data has been protected now I also want
[06:40] to use this specific data and probably
[06:42] create a chatbot okay now how do I do
[06:46] this now one way is that many people
[06:47] will say hey kish we can take this
[06:49] particular data and we can fine-tune the
[06:52] model
[06:54] right we can simply fine-tune the model
[06:57] yes this is a very good solution but
[07:00] understand fine-tuning a model is a very
[07:03] expensive process very tedious process
[07:06] because this LLM whichever LLM we are
[07:08] using it has billions of parameter and
[07:10] tweaking this billions of parameter
[07:12] usually takes a lot of time Right? So
[07:16] obviously this is a solution but this is
[07:19] a very expensive solution. Okay. Now do
[07:22] we have any other way any other way and
[07:25] remember these all policies and these
[07:27] all data will also keep on getting
[07:29] updated as we run the startup. Right? So
[07:34] every time we cannot just go ahead and
[07:35] fine-tune it like every day we not
[07:37] fine-tune it. Right? So we should try to
[07:39] find out a solution like how do we
[07:41] prevent this? So this can again be
[07:44] prevented with the help of rag.
[07:49] Right? Now how it will be prevented with
[07:51] the help of rag I will talk about it.
[07:53] Okay. So here instead of fine-tuning I'm
[07:56] saying that hey I will go ahead and
[07:57] implement the rag. Now you'll understand
[08:00] only when we understand the pipeline of
[08:02] the rag which I will discuss in this
[08:03] specific video. Okay. Now these are the
[08:07] major two disadvantages that you see
[08:10] right over here and yes there are some
[08:13] more disadvantages which we'll just deep
[08:15] dive more as we go ahead. Okay now what
[08:18] happens in
[08:21] uh if we use rag and how we are
[08:22] preventing it. See rag is nothing but it
[08:25] is it is saying that is a process of
[08:26] optimizing the output of a large
[08:28] language model. So it references an
[08:30] authorative knowledge base outside of
[08:33] his training data. Now how do we solve
[08:36] this hallucinating and this problem that
[08:39] we have okay so let me just go ahead and
[08:41] draw the diagram again okay so here is
[08:43] my llm okay and here is my query so
[08:48] let's say that uh I am coming up with an
[08:50] user query so let's consider it over
[08:53] here okay and here I'm drawing a user
[08:57] I'm user okay and this user
[09:02] will first of all
[09:04] give a query.
[09:06] Okay. Now what happens is that there
[09:09] will be two important pipelines that
[09:11] will be created. As I said over here we
[09:15] are trying to optimize the output of a
[09:18] large language model. So it references
[09:21] an authorative knowledge base outside of
[09:24] it training data source. So as you all
[09:26] know this is my LLM right? This LLM is
[09:29] already trained with huge amount of
[09:30] data. Now along with this I will be
[09:33] having an external
[09:36] database and this database we basically
[09:39] say it as vector database. Okay external
[09:43] vector database. Now you you know that
[09:46] this LLM is already trained with some
[09:48] amount of data and any additional data
[09:50] let's say my startup data my policies HR
[09:53] finance whatever data is there we will
[09:56] try to create a data injection pipeline
[10:00] over here
[10:02] data injection pipeline over here now
[10:06] what will be this data injection
[10:08] pipeline so let's say I have my data
[10:11] from this data we will do some kind of
[10:15] parsing
[10:17] and from this parsing we will do
[10:20] embeddings
[10:23] embeddings and then we finally store it
[10:26] into the vector store. Okay. Now
[10:28] whenever we talk about this specific
[10:30] data this data can be in any format. It
[10:33] can be in PDF format. It can be in HTML
[10:36] format. It can be in Excel format. It
[10:39] can be even in SQL database format or
[10:42] unstructured format any format. So what
[10:45] we do initially we take this data and we
[10:48] do data parsing. Now here data parsing
[10:50] is a very important step. I think if you
[10:55] crack this step then developing a rag
[10:58] application becomes very easy. Data
[11:00] parsing is all about how do you read the
[11:03] unstructured data or the structured data
[11:06] that is present inside this and how do
[11:09] you chunk this data right how do you
[11:13] chunk how do you divide this specific
[11:15] data into chunks chunking is very
[11:17] important because you need to save this
[11:19] data inside some kind of vector store
[11:22] this is nothing but vector store or
[11:24] vector DB okay now vector store and
[11:27] vector DB is nothing but it will
[11:29] actually help you to save vectors inside
[11:32] this. Okay. So once you do the chunking
[11:35] after doing the chunking you pass it to
[11:37] the embedding models. Now here in the
[11:39] embedding models you basically convert
[11:42] text to vectors.
[11:45] Okay. Vectors is just like a numerical
[11:48] representation for text so that you will
[11:52] be able to apply algorithms like
[11:55] similarity search cosine similarity
[11:58] techniques that are already available
[12:00] right wherein similar kind of results
[12:03] based on a specific query can be
[12:05] retrieved from this particular
[12:06] databases. Okay. So here whenever I talk
[12:09] about vector DB this is my vector DB or
[12:12] vector store here we are storing
[12:14] embeddings. Okay. And this embeddings
[12:17] will get applied to every chunks.
[12:19] Embeddings is nothing but we basically
[12:21] use we convert text into vectors. Here
[12:25] we can use different different
[12:26] embeddings like Google Germany embedding
[12:28] models. We can use open AI embedding
[12:30] models. We can use hugging phase
[12:31] embedding models and each and every
[12:33] embedding models exist with different
[12:36] different cost and there are also
[12:38] open-source embedding models which will
[12:40] actually help you to convert the text
[12:41] into vectors. Now this is one specific
[12:44] pipeline which we call it as data
[12:45] injection pipeline. At the end of the
[12:48] data injection pipeline you are able to
[12:50] store the text into vectors inside your
[12:53] vector DB. Now how rag is different from
[12:58] the previous one. Right? So initially
[12:59] you had this data injection pipeline
[13:01] where you are converting all your data
[13:03] into vectors. Right? And this data is
[13:07] specifically for this particular
[13:08] startup. And now I have created a
[13:11] knowledge base. So this is my knowledge
[13:14] base. External knowledge base or
[13:17] internal knowledge base whatever
[13:18] knowledge base I have and this knowledge
[13:21] base does not exist with this LLM.
[13:23] Right? Yes, some amount of information
[13:25] may be available but not the entire
[13:27] part. Now see the definition. It is a
[13:31] process of optimizing the output of a
[13:33] large language so that it references an
[13:36] authorative knowledge base outside of
[13:38] this training data. Now what will happen
[13:40] when user gives a query? Now this query
[13:43] instead of directly going to the LLM
[13:45] will go to this vector database right
[13:49] and before going here also we need to go
[13:51] ahead and apply embedding right because
[13:54] this query will be converted into
[13:58] vectors right why we need to convert
[14:01] into vectors so that when we are hitting
[14:04] this query to the vector DB this
[14:06] similarity search is basically applied
[14:09] and based on this we get
[14:13] some kind of
[14:15] context
[14:17] we get some information from the vector
[14:19] DB and now whatever query I'm asking
[14:22] okay if I ask hey what is the leaf
[14:25] policy of my company
[14:29] right now what will happen first of all
[14:31] it'll go to the vector store it will
[14:33] gather all the related information that
[14:35] is available over here and that
[14:37] information when it is sending it to the
[14:39] llm it is called as context Now we use
[14:42] this context along with we go ahead and
[14:45] write a specific prompt.
[14:48] Now this prompt is an instruction to the
[14:50] LLM and it says that you can use this
[14:53] context to answer the question and
[14:56] finally you get a output.
[14:59] This is the entire pipeline. This
[15:02] pipeline is basically called as
[15:04] retrieval pipeline.
[15:07] Retrieval pipeline. And this is a very
[15:10] good example of a traditional rag.
[15:14] Now you may be thinking kish what about
[15:16] other types of rag. Don't worry thumb
[15:18] don't worry I will explain it completely
[15:20] from basic to advanc with implementation
[15:22] each and everything because later on
[15:24] we'll be discussing about agentic rags.
[15:26] We'll be discussing how agentic rags
[15:28] actually work each and everything. But I
[15:30] hope you got an idea with respect to
[15:32] this. Now here you will even not be
[15:35] seeing this particular problem like
[15:37] you'll not completely remove
[15:39] hallucination but some amount of
[15:40] hallucination if any queries that is
[15:42] asked related to the data that is
[15:44] present in the vector DB I will
[15:46] definitely get some kind of context and
[15:49] my LLM will give me the output as let's
[15:53] say that if that data is not present
[15:54] over here then LLM can hallucinate right
[15:57] but here we are doing this see one best
[16:00] example that you can do is that you can
[16:02] use perfectly Perplexity.
[16:04] Perplexity is nothing but it is based on
[16:07] rag. It is completely developed based on
[16:11] rag applications. Okay. Rag it is it is
[16:15] a kind of a rag application. In
[16:16] perplexity you have connected to various
[16:20] retrievers. You are connected to tools.
[16:23] You are connected to web search
[16:26] right and then it is summarizing the
[16:28] output and giving by the LLM. Right? and
[16:31] it also uses various LLMs itself. I'm
[16:33] also planning to mostly start a startup
[16:37] soon enough within a couple of weeks I
[16:39] guess and the kind of application that
[16:41] I'm developing is a rag application only
[16:44] and it solves a very good problem for a
[16:46] developer. Okay. So that is the reason
[16:48] I'm not being able to upload a lot of
[16:51] videos because I'm pretty much involved
[16:53] in those startups and working and
[16:55] developing a product that India can
[16:57] definitely remember. Okay. And this is
[17:00] how
[17:02] you know this is this is this is how
[17:04] things are and you can basically see how
[17:06] good uh you know the pipeline actually
[17:10] works and this is basically a
[17:11] traditional rack. Now you may be
[17:13] thinking what all things we'll be
[17:14] discussing. Okay fine we have discussed
[17:16] about a traditional rack in the future
[17:18] classes what coding we'll be doing. Okay
[17:20] so let's go ahead and talk about it. As
[17:22] I said two important pipelines we'll go
[17:24] ahead and create one is a data injection
[17:26] pipeline and one is a retrieval
[17:28] pipeline. Okay. Now in the data
[17:31] injection pipeline you'll be see seeing
[17:34] that we will be performing data
[17:36] injection. Along with the data injection
[17:38] we will go ahead and do data parsing.
[17:40] Then we'll perform embeddings. Then uh
[17:43] we will store everything into the vector
[17:45] store. Then we will create a retriever
[17:48] for this and whenever a user ask any
[17:51] queries it will be able to give the
[17:53] context to the LLM and then finally we
[17:56] will be generating the output. So here
[17:58] this is retrieval this is auggmentation
[18:02] right this is augumentation over here
[18:04] augmentation basically means what you're
[18:06] giving a context to the LLM along with
[18:08] the prompt to generate the output right
[18:10] so this is basically called as
[18:12] augmentation and finally you're
[18:13] generating the output right which is
[18:15] nothing but generation so here you are
[18:17] basically generating
[18:20] now
[18:22] in the next session how we are going to
[18:24] implement it first of all I will show
[18:26] you how to perform these two steps in a
[18:30] very efficient way. Okay, sorry not
[18:33] these two steps. I will show you how we
[18:35] can perform these all steps, right? Data
[18:37] injection, data parsing and embedding.
[18:40] Here we are going to consider different
[18:41] different files like PDF, HTML.
[18:45] Okay. Um PDF, HTML, you can consider
[18:48] Excel, you can consider SQL database,
[18:50] you can consider any kind of files. Then
[18:52] we'll do document parsing and we will
[18:55] try to convert this into document. So
[18:57] document is an amazing data structure
[18:59] which you can basically use it and you
[19:02] can even parse this do the chunking and
[19:04] store it in the vector embeddings sorry
[19:06] vector store. Then we'll perform
[19:08] embeddings. Here we will use both open
[19:10] source
[19:12] and we are going to use paid embeddings
[19:14] for the same. Okay. And then finally we
[19:16] go to the vector store. Then based on a
[19:19] user query, how do we go ahead and apply
[19:21] the same embeddings we are going to see
[19:23] that okay and then finally we'll be
[19:25] developing this. So mostly I really want
[19:28] I'm I'm focusing more on making bigger
[19:30] videos so that you don't just follow a
[19:32] playlist. Okay. I want to basically
[19:34] cover a lot of stuff in one video so
[19:37] that uh you should also be able to
[19:40] efficiently cover it instead of covering
[19:41] 50 different videos. Right now when we
[19:44] are doing data injection and data
[19:45] parsing right there are various
[19:47] techniques see we are going to see about
[19:49] optimization
[19:51] we are going to see about various
[19:52] chunking strategies context engineering
[19:55] these all kind of topics will be coming
[19:57] up when we talk about data parsing you
[19:59] know u what is semantic chunker you know
[20:02] how do we go ahead and do the chunking
[20:04] in those strategies and all everything
[20:06] we'll try to discuss as we go ahead but
[20:08] I hope you got a very super cool idea
[20:10] about what exactly is rag um Yeah, this
[20:13] was it from my side. Uh please make sure
[20:15] to like the video, share with all your
[20:18] friends and uh soon within couple of
[20:20] days we'll come up with the next video
[20:22] wherein we will be starting the coding
[20:24] tutorial and we'll start building this
[20:26] data injection pipeline and I will try
[20:29] to build it in the form of a project uh
[20:31] that it'll be looking good for you so
[20:33] that you'll also be able to completely
[20:35] implement things right. So yes, this was
[20:37] it from my side. I'll see you in the
[20:38] next video. Thank you. Take care.
