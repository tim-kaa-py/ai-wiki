---
title: "Is RAG Still Needed? Choosing the Best Approach for LLMs"
type: "youtube"
channel: "IBM Technology"
date: "2026-03-09"
resource: "https://www.youtube.com/watch?v=UabBYexBD4k"
pillar: "building"
tags: [rag, long-context, architecture, agents, best-practices]
timestamp: "2026-07-12"
extraction_method: "manual-captions"
video_id: "UabBYexBD4k"
duration: "11:09"
---

[00:00] There's a fundamental truth about LLMs, large 
language models. They are frozen in time. They
[00:09] know everything about our world up until 
their training cutoff date and absolutely
[00:16] nothing about what happened 5 minutes ago. Nor 
do they know anything about your private data,
[00:21] your internal wikis, your proprietary codebase. And 
if we do want an LLM to know any of that stuff,
[00:28] well, we have to solve the problem of context 
injection. How do we get the right data into the
[00:36] model at the right time? And there have been two 
very different ways to handle this. Now, the first
[00:43] is really what we can think of as the engineering 
approach. It's RAG, retrieval augmented generation.
[00:52] So here we've got an LLM and we've also got an 
input prompt from the user. Now ahead of time
[01:01] we take some of the documents that we want to give 
to this LLM. So these are documents that could be
[01:09] PDFs or code files or entire books and we chunk 
them. We break them up into smaller chunks and
[01:19] we pass them through to an embedding model and 
the embedding model takes those chunks and it
[01:27] turns them into vectors and those vectors are then 
stored in a dedicated vector database. Now when a
[01:38] user asks a question, it performs a semantic 
search to retrieve the most relevant chunks
[01:47] and then inject them into the context window. 
So now the context window has the user prompt,
[01:54] but it also has all of these chunks that we have 
taken from the vector database and together this
[02:03] forms the context window. Now this works but 
it does rely on something. It relies on the
[02:10] hope that your retrieval logic actually found 
the right information in the vector database.
[02:15] Now the the second approach is really a bit more 
of a brute force approach and that one is called
[02:23] long context. Now this is really the model native 
solution because you skip the database here and
[02:31] you skip the embedding model. All you do is you 
take your documents and you just well you put them
[02:38] straight into the context window and then you let 
the model's attention mechanism actually do the
[02:44] heavy lifting of finding the answer. Now for a 
long time this kind of brute force method wasn't
[02:50] really much of an option because initially context 
windows were tiny. Early LLMs had context windows
[02:58] that could maybe store what like 4K of tokens. 
You couldn't fit a novel in there, let alone a
[03:06] corporate knowledge base. You basically had to use 
RAG. But today's models have much larger context
[03:14] windows. Some of them have, you know, a million 
tokens plus. And to put that into perspective,
[03:21] a million tokens is roughly 700,000 words. and you 
could fit the entire Lord of the Rings series into
[03:29] the prompt and still have room for The Hobbit. So, 
this massive jump in capacity forces us to ask a
[03:36] difficult question about our architecture. Because 
if we can simply command A, command C, command V,
[03:43] all of our documentation into the models context 
window, do we really need the overhead of
[03:49] embedding models and vector data stores? Is RAG
becoming an unnecessary complexity layer? Well,
[03:56] if we accept that we can fit whatever data we 
need into the context window, then the argument
[04:03] for doing so basically boils down to one word, 
simplicity. And let me give you three reasons why
[04:11] stuffing the context window directly may indeed be 
the way to go. And reason number one is collapsing
[04:20] the infrastructure. A production RAG system. Well, 
it is quite heavy. You need a a chunking strategy
[04:27] which is like fixed size maybe or sliding window 
or recursive. You decide. You're going to need
[04:33] a embedding model to encode the data. You need 
a a vector database to store it. You're going
[04:39] to need a reranker to sort the results. you need 
to keep all the vectors in sync with your source
[04:45] data. It's basically a lot of moving parts, a lot 
of places for things to break. And long context
[04:52] offers what we might call well just simply the uh 
the no stack stack. You remove the database, you
[05:01] remove the embeddings, you remove the retrieval 
logic. The architecture simplifies down to getting
[05:06] the data and just well sending it to the model. So 
that's reason number one. Reason number two is the
[05:15] retrieval lottery. Now, RAG introduces a critical 
point of failure here, the retrieval step itself,
[05:23] because when a user asks a question, RAG looks at 
mathematical representations of the data, which are
[05:30] stored in vectors. And vectors are basically 
just like a really long series of numbers in
[05:37] an array. And it tries to find the closest 
match. That's semantic search. But semantic
[05:43] search is probabilistic and for all manner of 
reasons, the retrieval might fail to find the
[05:49] relevant document. And we actually have a name 
for this. It's called silent failure. The answer,
[05:55] well, it existed in the data, but the LLM never 
saw it because the retrieval step didn't return
[06:01] the right results. With long context, there is no 
retrieval step. The model gets to see everything.
[06:08] Now, reason number three that is well, I think 
we're going to call this the whole book problem.
[06:15] A RAG is fundamentally designed to retrieve 
what exists. It relies on finding a semantic
[06:21] match between your query and a specific snippet 
of text in your database. But what if the answer
[06:27] lies in what's not in the database? So, so let's 
say you have a set of product requirements stored
[06:35] as a document and you've also got a set of release 
notes stored as a document and then we ask which
[06:42] security requirements were omitted from the final 
release. Now using RAG when you query for omitted
[06:50] security requirements the vector search looks for 
chunks discussing well security and requirements.
[06:57] It retrieves snippets from the requirements doc. 
It retrieves snippets from the release notes,
[07:02] but it cannot retrieve the gap between them. And 
because RAG only shows the model a few isolated
[07:09] snapshots, the model never sees the full picture 
required to spot the missing pieces. The model
[07:15] really needs both of these documents in full to 
perform the comparison, which is exactly what
[07:22] long context does by dumping the whole book, the 
full requirements doc and the full release notes
[07:28] into the context window. So, is RAG dead? Is the 
vector database destined for the museum of things
[07:35] we needed in 2024? Well, not quite because while 
long context wins on simplicity, RAG still has a
[07:43] place. And I got another three reasons to support 
that. So, reason number one is the rereading text.
[07:53] Now, long context creates a massive compute 
inefficiency. So, if we take a manual, let's say
[07:59] this is like a a 500 page manual, and we've got to 
turn this into tokens. Well, that's something like
[08:08] 250k of tokens. And we need to do that every time 
we make a user query and we put this document in
[08:17] the prompt. You're basically requiring the model 
to process that manual every time. Now, RAG also
[08:23] has to process that manual, but it only pays that 
processing cost once at indexing time. Now, prompt
[08:30] caching that can partially offset some of this for 
static data, but for dynamic data streams where
[08:36] content changes frequently, you are stuck paying 
the full tax on every request. Reason number two
[08:45] is the needle in the haystack problem. Now, 
there's a an intuitive assumption that if data
[08:52] is in the context window, the model's probably 
going to use it, but research suggests otherwise.
[09:00] Because as we start with a context window and then 
it grows and it continues to grow and now we're at
[09:06] like 500,000 tokens, well, the model's attention 
mechanism can get a bit diluted. If you ask a
[09:14] specific question about a single paragraph that's 
buried in, let's say, the middle of a 2,000 page
[09:19] document, well, the model often fails to retrieve 
it or it hallucinates details from the surrounding
[09:26] text. But with RAG, we're giving the model less 
noise. So by retrieving, say only the top five
[09:35] relevant chunks, RAG has removed the haystack 
and presents the model with just the needles.
[09:42] It forces the model to focus on the signal and 
not the noise. And then reason number three,
[09:49] well that is the infinite data set. Now a context 
window of millions of tokens sounds great but in
[09:57] the scheme of enterprise data that's really just a 
drop in the bucket. I mean an enterprise data lake
[10:05] that's probably measured in terabytes or or maybe 
even petabytes. So if you want an infinite data
[10:13] set that stores everything, you really do need to 
have a retrieval layer to filter information down
[10:19] to something that fits into the LLM context 
window. So where does this leave us? Well,
[10:25] if your problem involves a bounded data set and 
requires complex global reasoning like analyzing
[10:30] a specific legal contract or summarizing a book, I 
think long context is the way to go. It simplifies
[10:38] the stack and it improves the reasoning. But 
if you're navigating the infinite data set of
[10:44] enterprise knowledge, the vector database remains 
the only viable warehouse for your data. But how
[10:51] about you? Are you team long context, team RAG, 
maybe a bit of both? Let me know in the comments.
