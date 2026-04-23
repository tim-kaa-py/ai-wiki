---
title: "Karpathy's Wiki vs. Open Brain. One Fails When You Need It Most."
source_type: "youtube"
channel: "AI News & Strategy Daily | Nate B Jones"
date: "2026-04-22"
url: "https://m.youtube.com/watch?v=dxq7WtWxi44"
pillar: "building"
tags: [karpathy, wiki, knowledge-management, memory, open-brain, context-engineering, structured-data, comparison]
ingested: "2026-04-23"
extraction_method: "auto-captions"
video_id: "dxq7WtWxi44"
duration: "41:08"
---

# Karpathy's Wiki vs. Open Brain. One Fails When You Need It Most.

[00:00] Everybody is going nuts about the wiki
[00:02] idea that Andre Carpathy posted a couple
[00:04] of days ago. 41,000 people have
[00:07] bookmarked it. And on the surface, it
[00:08] sounds ridiculously simple. You use your
[00:10] AI to build and maintain a personal
[00:12] wiki. As someone who launched something
[00:13] somewhat similar with OpenBrain, I have
[00:16] gotten hundreds of DMs and emails
[00:17] saying, "Nate, is this the same thing?
[00:19] Nate, is this different? Nate, does this
[00:21] make OpenBrain obsolete? Nate, is the
[00:23] wiki better?" I want to actually step
[00:25] back and give you a different answer
[00:28] than you expected. We are going to go
[00:30] through, we are going to talk about what
[00:33] the wiki approach gets right, why Andre
[00:36] put it together, the principles
[00:38] underlying this wiki approach versus the
[00:41] open brain approach. And I want to be
[00:43] honest about why we're doing that. We're
[00:45] not doing that just for giggles. We're
[00:47] doing that because deciding how you
[00:48] organize your context layer is one of
[00:50] the single most important things you can
[00:52] do in 2026. It is a really big deal. And
[00:55] Karpathy's approach is really different
[00:56] from OpenBrain. It's not the same thing
[00:58] at all. And there are specific reasons
[01:00] why he went with his decision and why I
[01:02] went with the decisions that I made to
[01:05] construct open brand. And I'm going to
[01:06] be really open about both. I'm not going
[01:08] to give you a steelman. I'm not going to
[01:09] say one is better than the other. So
[01:11] just get that out of your head. We're
[01:12] going to talk about where each one
[01:14] breaks, the scale issues that each have,
[01:16] and where each one is strong. And then I
[01:19] promise you, I am going to help you
[01:22] solve the problem because I know that
[01:23] what most of you are going to say is, "I
[01:24] want the best of both worlds." We are
[01:26] going to get there. I put a plugin into
[01:28] OpenBrain that will help you have the
[01:31] best of both worlds. So you can have the
[01:33] wiki approach Carpathy takes with the
[01:35] structured data that OpenBrain brings.
[01:37] And by the end of this video, you'll
[01:38] understand why it matters to be able to
[01:41] do both and you'll feel equipped to make
[01:43] that decision. So let me explain a
[01:45] little bit about what's under the
[01:46] surface that is a little bit more
[01:49] complex than it might appear at first
[01:50] glance. Because on the surface,
[01:52] Carpathy's implementation is very
[01:54] simple. It's just folders and it's text
[01:56] files. That is the big idea for him. And
[01:58] you might wonder why did he go so
[01:59] simple? Well, his insight is the idea
[02:02] that everybody uses AI with their
[02:05] documents today all day, right? You
[02:06] upload files to chat GPT, you use
[02:08] notebook LM, you use cloud, and you
[02:10] always end up in a place where you have
[02:13] bunches of documents everywhere and then
[02:15] you ask a question and the AI has to go
[02:17] and find relevant chunks of documents,
[02:19] previous chats, reads them, gives you an
[02:21] answer. It's all hyper fragmented all
[02:24] over. This works okay, but it's actually
[02:27] not ideal because what's happening under
[02:28] the hood is that AI is effectively
[02:31] rediscovering your knowledge from
[02:32] scratch every single time you ask a
[02:35] question. So, if you ask a question that
[02:36] requires connecting five different
[02:38] documents across six different chats,
[02:40] the AI has to find all five, read the
[02:42] six chats, figure out how they relate,
[02:44] and produce some kind of a synthesis. If
[02:46] you ask a similar question tomorrow, it
[02:49] does the whole thing over again. Nothing
[02:51] was saved about that synthesis. It
[02:54] doesn't inherently preserve connections
[02:56] between documents, even if you're in the
[02:58] same chat application, let alone if
[03:00] you're in two or three different AIs
[03:02] like so many of us are. In other words,
[03:03] the AI did real cognitive work and then
[03:07] threw it all away. And that is what
[03:09] bothered Carpathy enough to put together
[03:12] a different solution. What he asked is,
[03:14] what if instead of just finding relevant
[03:15] chunks and answering questions, the AI
[03:17] actually wrote down what it learned?
[03:20] What if every time you added a new
[03:21] source, the AI read that source, figured
[03:24] out what mattered and updated a set of
[03:26] organized notes that already contained
[03:28] everything it learned from the previous
[03:31] source? In other words, what if it
[03:32] started to auto update based on its own
[03:34] synthesis? What if those notes already
[03:36] included cross references, flagged
[03:38] contradictions, tracked how your
[03:40] understanding evolved? If you're trying
[03:41] to learn how you think and evolve over
[03:44] time, that's what this wiki idea is for.
[03:47] It essentially becomes not just a clever
[03:49] file organization system, but actually a
[03:53] persistent artifact as a whole where
[03:56] you're capturing the AI's evolving
[03:59] understanding of your thinking over
[04:02] time. So the AI might read a paper you
[04:04] give it on Monday, write up what it
[04:06] learned, and link back to it what it
[04:09] learned the previous week from some
[04:11] other thread that you were working on.
[04:12] The next Friday when you ask a question,
[04:15] the AI doesn't have to reread everything
[04:17] from scratch. Instead, it looks at the
[04:19] synthesis that is already sitting there,
[04:20] the cross references that are already
[04:22] built, the contradictions that have been
[04:24] flagged. And in Carpathy's own words,
[04:26] the knowledge is compiled once and then
[04:27] kept current. It's not rederived on
[04:30] every query. And that is really the key
[04:31] here. Most AI knowledge tools spend
[04:34] compute and tokens to rederive. whereas
[04:37] his wiki compiles. That's a
[04:40] fundamentally different relationship
[04:42] between AI and your information and it
[04:44] has different strengths and weaknesses
[04:46] than a lot of other predominant memory
[04:48] paradigms including OpenBrain. He
[04:50] described his working setup as having
[04:52] the AI agent on one side and Obsidian
[04:54] which is just a note viewing app on the
[04:55] other side. And so that allows the AI to
[04:57] make edits based on their conversation
[05:00] and he can browse the results in real
[05:01] time and follow links and check the
[05:03] graph view and read the updated pages
[05:05] and kind of have an evolving
[05:06] conversation with the agent. And of
[05:08] course being a programmer the way he
[05:09] talks about it is the LLM is sort of the
[05:11] programmer for the codebase of the wiki
[05:14] which means in plain English the note
[05:15] app is where he actually reads and the
[05:18] AI is the one writing in the notes app
[05:21] based on a collected series of built
[05:25] documents. Some of them are raw sourced
[05:26] that he inputs from previous chats. Some
[05:28] of them are docs. Some of them are
[05:30] synthesis the AI puts together. Think of
[05:31] it like most AI tools are like having a
[05:34] brilliant research assistant who reads
[05:35] your entire filing cabinet every time
[05:37] you ask a question and then it gives you
[05:39] a really great answer and then
[05:40] immediately forgets everything that it
[05:42] figured out. Andre Carpathy's wiki is
[05:44] like that same assistant keeping a
[05:46] running set of notes that are organized
[05:49] and cross-referenced and updated so that
[05:52] each question builds on the last one
[05:54] instead of starting over. I think that
[05:56] idea of being able to build on your
[05:58] learnings is why 41,000 people jumped on
[06:00] it and bookmarked the post. Right? It's
[06:02] not because the folders and the text
[06:04] files themselves are exciting. It's
[06:05] because an AI that builds understanding
[06:07] over time instead of starting from zero
[06:09] is something we're all hungry for right
[06:11] now. It's the thing everyone's been
[06:12] waiting for. It's what made people
[06:14] really excited about OpenBrain. But
[06:15] there's a catch that almost nobody in
[06:18] these 41,000 bookmarks is thinking about
[06:20] yet. Every time the AI turns a raw
[06:23] source into a wiki page, it is making
[06:26] editorial decisions. It's making
[06:28] decisions about how to frame the
[06:29] connections between ideas that may be
[06:31] right or wrong, but those are the AI's
[06:33] choices, right? They're not the human's
[06:34] choices. It's making synthesis choices
[06:37] somewhat independently of what you may
[06:39] or may not think. And so important
[06:41] nuance could get dropped that m might
[06:43] matter a few months from now and you
[06:45] would literally never know. You wouldn't
[06:46] know what's missing because the wiki
[06:48] reads so cleanly. This is sort of the
[06:51] same trap as dashboards and analytics. A
[06:53] dashboard is so much easier to read than
[06:55] a spreadsheet, but it is a condensation
[06:58] of data, right? It can hide exactly the
[07:00] thing you need to see because it just
[07:03] shows only the thing that it thinks you
[07:05] want to see in the moment. And to his
[07:07] credit, Andre Carpath has been very
[07:08] honest about this, right? His
[07:09] architecture keeps all the raw sources
[07:11] untouched in their own folders. So he
[07:13] can always go back to the originals,
[07:15] which is a really smart design. But to
[07:17] be honest, most people building on his
[07:19] pattern are not going to maintain the
[07:21] discipline to go back to raw sources. In
[07:23] practice, I think the wiki will become
[07:25] the thing that is trusted as this open
[07:28] source project rolls out. And the source
[07:30] of truth is quietly going to shift from
[07:32] raw material to an AI summary of that
[07:36] material, which may be correct 80% of
[07:38] the time. maybe 90% of the time, but
[07:40] where it misses something or where it
[07:43] frames something slightly wrong, there
[07:45] are going to be issues that arise and
[07:47] that errors will now be baked into our
[07:49] understanding if that is the only way
[07:51] we're approaching memory. And you won't
[07:53] get in the habit of questioning it
[07:54] because the whole premise of this when I
[07:56] started this video is that we are lazy
[07:57] people. It's really nice to have a wiki
[07:59] where you can just chuck stuff in and it
[08:02] sort of automatically organizes, learns,
[08:04] and comes back with written artifacts.
[08:05] And so this is where open brain enters
[08:07] the picture and things get really really
[08:09] interesting. Every knowledge system with
[08:11] an AI at its core has to answer one
[08:15] question. When does the AI do the hard
[08:17] thinking? Is it when information comes
[08:19] in or is it when you ask about that
[08:22] information you got to pick that's the
[08:24] fork everything else follows from that.
[08:26] Carpathy's wiki is a right time system.
[08:29] So when a new source arrives like an
[08:31] article, a paper, a set of notes, the AI
[08:34] does not just store it. The AI actually
[08:38] actively works against it. It reads the
[08:40] source. It extracts what matters and it
[08:42] writes that understanding into the wiki.
[08:44] It will update topic pages for you. It
[08:47] will write relevant summaries for you.
[08:50] You get the idea, right? It's going to
[08:52] actively work to add links between
[08:55] related ideas, develop concepts, note
[08:58] where new data contradicts something
[09:00] that was filed last week. It will do a
[09:02] lot of that thinking at input, right?
[09:05] The hard work then happens one time at
[09:08] the beginning, the moment the
[09:09] information comes in the door. After
[09:12] that, you can browse the wiki and get
[09:14] pre-built understanding without the AI
[09:17] doing virtually any work at all. It's
[09:18] just retrieving. Open brain is
[09:20] different. It is a query time system.
[09:23] When new information arrives, OpenBrain
[09:25] is designed to store it faithfully. It
[09:27] tags it. It categorizes it. It makes it
[09:30] searchable. But we're not assuming that
[09:33] you need to synthesize that information
[09:34] yet. Nobody's synthesizing. Nobody's
[09:36] doing work. The data is sitting in
[09:38] structured tables waiting. When you or
[09:41] your AI agent asks a question, that's
[09:44] when the AI goes to work. It reads the
[09:46] relevant entries. at that point at query
[09:49] time. It does the thinking fresh and it
[09:51] produces an answer on the fly. So the
[09:53] hard work happens at the moment you need
[09:55] it, not before you need it. So think of
[09:58] it this way. Carpathy's wiki is like a
[10:00] study guide that a really good tutor
[10:02] writes for you as you learn the subject.
[10:04] Every time you cover new material, the
[10:07] tutor will update the guide for you so
[10:10] you don't get lost along the way. The
[10:12] tutor will add new sections, revise old
[10:14] sections, connect ideas across chapters,
[10:16] and really help you dig in so that when
[10:18] exam day comes, you just read the guide,
[10:21] and you're good to go. Which is exactly
[10:23] kind of how that wiki is supposed to
[10:24] work. Ideally, the thinking has been
[10:26] done for you. The tutor has prepared
[10:28] everything so perfectly, you can't fail.
[10:29] Open brain is like a perfectly organized
[10:32] filing cabinet with a brilliant
[10:34] librarian standing next to that filing
[10:36] cabinet for you. Every document is
[10:38] filed. It's indexed. It's searchable. So
[10:40] that when you need an answer, the
[10:42] librarian can very quickly pull the
[10:44] relevant file, read through that
[10:45] relevant file for you, and then pinpoint
[10:49] exactly what you need to find in that
[10:52] file. It will tell you what you're
[10:54] looking for. The filing is really clean
[10:56] and pristine, and that enables the
[10:58] metaphorical librarian to do the
[11:00] thinking fresh in a very efficient way
[11:02] every time you ask, so you get exactly
[11:04] the synthesis you're looking for. To be
[11:07] honest with you, I'm not here to compare
[11:09] and contrast and give you an easy
[11:10] winner. Study guides and filing cabinets
[11:12] can both be useful, but they're good at
[11:14] different things, and I don't want them
[11:15] compared inaccurately. And that's really
[11:17] important. So, why does this matter for
[11:19] you? This is the way to think about it
[11:20] that's not about architecture. If you
[11:22] only store stuff, your AI has to figure
[11:25] out what it all means every time you
[11:27] ask. You've been feeding it articles,
[11:29] meeting notes, and research for months
[11:30] and months and months and months. You
[11:32] ask a question that requires connecting
[11:34] a bunch of different sources together.
[11:36] And the AI has to go and burn tokens. It
[11:39] has to find those sources. It has to
[11:41] make sense of them. It has to read them.
[11:44] It has to think through them. It has to
[11:46] understand what's going on, figure out
[11:48] how they relate together. And
[11:51] ultimately, it has to produce a
[11:53] synthesis that actually works from
[11:57] scratch. And it has to do that every
[12:00] single time. Nothing has been pre-built.
[12:03] Now, here's the other side. If you only
[12:04] build a wiki, your AI can read the
[12:06] summary, but it cannot do anything
[12:09] precise with the raw data underneath.
[12:11] You want to pull every deal over $50,000
[12:14] from the last quarter. You want to
[12:15] filter all your meetings by client name.
[12:17] You want to have three different AI
[12:19] tools that query your knowledge base at
[12:20] the same time. A folder of text files
[12:23] cannot answer complex questions like
[12:25] that. The understanding is there in
[12:28] synthesized form, but the detailed
[12:31] structured data to make meaningful
[12:33] decisions just isn't there. And it isn't
[12:36] there by design. It's just not going to
[12:38] be there. In addition, if you have three
[12:40] or more agents, that's just going to
[12:42] break when they're all trying to write
[12:44] Markdown files at once. The wiki
[12:47] structure presupposes a single agent
[12:50] working for you that just writes in one
[12:53] place. Whereas the open brain structure
[12:55] assumes you may want to hook in multiple
[12:57] agents at multiple points to contribute
[13:00] to or pull from a structured database.
[13:02] Let's move on from structured data to
[13:04] talk about a different kind of challenge
[13:06] with AI. It is difficult right now to
[13:09] actually trace how an AI learns or
[13:12] improves over time when there is no
[13:14] memory architecture under the system.
[13:17] And I want to talk about a distinction
[13:20] between remembering detailed facts which
[13:22] open brain is designed to do and
[13:24] remembering narrative or synthesis which
[13:28] the wiki is designed to do. And I want
[13:31] to help you understand how that plays
[13:32] out for a team because it's really
[13:34] important to understand that our storage
[13:36] architectures shape the futures that we
[13:39] are unlocking for teams because that
[13:40] we're effectively choosing a context
[13:43] layer that you need to make sense of,
[13:47] use, input information into, believe,
[13:49] trust, and depend on for decisions. The
[13:52] stakes could not be higher. Most
[13:54] organizations are generating enormous
[13:56] volumes of AI touched knowledge right
[13:58] now. We're generating meeting summaries.
[14:00] We're generating strategy documents
[14:02] touched by AI. We're generating research
[14:04] outputs. We're generating Slack threads.
[14:06] And almost all of it is write once, read
[14:09] never because nobody is maintaining any
[14:12] of it. Nobody is synthesizing across any
[14:14] of those documents. Nobody is flagging
[14:17] that the Q2 strategy deck contradicts
[14:20] what the CEO said in last week's all
[14:22] hands. Your company's AI generated
[14:24] knowledge right now is either a
[14:26] compounding asset or it's just a growing
[14:29] pile of noise. And so the choice between
[14:32] the two memory structures here is a lot
[14:34] more than a design decision. It's
[14:36] actually the thing that most teams are
[14:38] making by accident that determines how
[14:41] reliable their northstar compass in
[14:42] product decisioning is. And the subtlety
[14:44] that matters here is that sometimes
[14:47] contradictions are the most valuable
[14:49] thing in your knowledge base. And one of
[14:51] the things that you worry about is that
[14:53] you're going to lose the distinctions
[14:55] that you need to make good decisions in
[14:56] a wiki format. So engineering might
[14:58] think the timeline for the build is 12
[15:00] weeks and sales promise the client 8.
[15:02] And something like a smart wiki might
[15:03] resolve that contradiction into one
[15:05] coherent narrative rather than flagging
[15:07] that you have a fundamental
[15:08] misalignment. And that is a strategic
[15:10] signal in the system that you would not
[15:13] want to synthesize across with an
[15:14] estimate of 10 weeks. The gap between
[15:16] what engineering knows and what sales
[15:19] promised is exactly the problem your
[15:21] leadership would need to see in that
[15:22] situation. A database that stores both
[15:25] views without resolving them preserves
[15:27] that tension and a well-meaning wiki
[15:29] might smooth those all away. So those
[15:31] are some of the structural differences.
[15:32] But if we go past the structural
[15:34] differences in these two memory systems,
[15:36] the open brain system and the wiki
[15:38] system, I want to talk a little bit
[15:40] about the job that the AI does in each
[15:43] system and why it's important to name
[15:45] the AI job description really clearly.
[15:47] One of the sharpest practical
[15:49] differences between these approaches is
[15:52] what the AI will spend its time doing.
[15:54] And you need to decide like where do you
[15:56] want to invest in your AI. In Karpathy's
[15:58] system, the AI is primarily a writer.
[16:00] The job is to maintain a document. And
[16:02] when you add a new source, you have to
[16:04] write to that, right? You have to read
[16:05] the raw material, synthesize it, write
[16:08] what you think about it. Update wiki
[16:10] pages, connect new links, make sense of
[16:13] it, add concept explanations, cross
[16:16] reference it, create an index. There's a
[16:18] ton to do. It's effectively doing
[16:20] editorial work. It's making judgment
[16:23] calls about what's important, about what
[16:25] connects to what, and where those
[16:26] contradictions might lie. Whereas in
[16:28] open brain, we think of the AI as
[16:30] primarily a reader. Its job is to answer
[16:33] questions by pulling from the structured
[16:34] data and when you or an agent will ask
[16:37] something, the AI will just search the
[16:39] database that has been carefully read
[16:41] and carefully organized, read the
[16:43] relevant entries and come back with a
[16:46] precise, fresh synthesis based on all of
[16:49] the available data. So effectively, it
[16:51] is doing the analytical work on the fly,
[16:53] but it's able to produce more detailed
[16:55] results because all of the detail is
[16:57] immediately available in the database.
[16:59] And so those different job descriptions
[17:01] have real consequences. When the AI is a
[17:04] writer, you interact with it intensively
[17:07] when new information comes in. Is that a
[17:09] job that you want to do? Do you want to
[17:10] interact with it a lot when the new
[17:12] information comes in? it does adding a
[17:14] single research paper trigger updates
[17:16] across a dozen wiki pages and is that
[17:18] something you're comfortable doing as
[17:19] you think through and and figure out the
[17:21] connections? It's a somewhat heavy
[17:23] operation on the front end, but
[17:24] afterward you end up getting answers
[17:26] that are very cheap because all of your
[17:28] thinking is captured in that wiki. The
[17:31] thinking has been done. When the AI is
[17:34] more of a reader, as in open brain, what
[17:36] you get is adding new information is
[17:38] lazy and cheap. That's sort of why I did
[17:40] it because I'm a lazy person and I want
[17:43] my stuff autocatategorized as cheaply
[17:46] and easily as possible. We just write a
[17:48] row, we tag it and we're done. The heavy
[17:50] operation is when you ask a question
[17:52] because the AI has to reconstruct
[17:54] understanding from the data each time.
[17:56] So simple lookups can be fast and
[17:58] complex lookups will take time as the AI
[18:01] does deep synthesis because it's
[18:04] actually interrogating the raw data.
[18:06] That cost is going to recur every time
[18:08] if you ask something similar. But on the
[18:10] other hand, you are not going to lose
[18:12] detail if you need to get into the
[18:14] grounds and really understand what is
[18:16] going on. The difference between these
[18:17] approaches raises a question that that I
[18:19] think most of us aren't asking yet.
[18:21] Whose understanding matters here? When
[18:25] your AI maintains a wiki, what you are
[18:27] effectively saying is that when a
[18:29] colleague asks you about a topic, you
[18:31] are willing to check the wiki and trust
[18:34] what the AI says before answering. And
[18:37] you are trusting that the AI's capture
[18:39] of your understanding or your thinking
[18:40] or the article you gave it is good
[18:43] enough to share with your colleagues as
[18:46] yours. Whereas if you have an open brain
[18:48] style database, the providence is very
[18:51] clear. These are facts from identified
[18:53] sources with timestamps. You can trace
[18:55] any claim back to where it came from.
[18:57] What you know, you know, and you know
[18:59] why you know it. And you can come back
[19:01] with a fair bit of authority and say,
[19:03] "I'm not just trusting the AI's ability
[19:05] to synthesize information. I'm actually
[19:07] saying this is the raw material I got.
[19:10] This is the facts that I'm basing this
[19:11] on, and this is a considered opinion
[19:13] based on a query across all of the data
[19:16] that I've collected over the last few
[19:17] months or the last few weeks or whatever
[19:19] it is for you." That is a deeper and
[19:20] more consequential kind of trust. It
[19:22] also means the instructions you give the
[19:25] AI that tells it how to organize your
[19:27] wiki becomes the highest leverage
[19:29] document in the whole system. Because if
[19:31] you're building a wiki, I want you to
[19:33] think about this for a second. If you're
[19:34] building a wiki, you basically are
[19:36] telling in one markdown file the AI to
[19:40] organize and synthesize in a way that's
[19:43] profoundly useful to you and profoundly
[19:45] accurate. and you're betting your career
[19:47] that it will get it right or you're
[19:49] going to invest time on every single
[19:51] ingest to make sure it's correct and to
[19:52] doublech checkck it. Most people will
[19:54] underinvest in that and the wiki will be
[19:56] worse than it should be as a result. Not
[19:58] because it can't be good, but because
[20:00] we're lazy. If we were to talk about
[20:02] what each approach is good at and where
[20:04] the advantages are, I would say that
[20:06] Carpathy's wiki wins when you're deep in
[20:08] research mode, when you're reading 10
[20:10] papers on a topic over a couple of
[20:11] weeks, which sounds a lot like what
[20:13] Andre does, right? like it's written for
[20:15] him. You could tell, right? And each one
[20:17] might build on. It might contradict the
[20:19] last. It's a thinking person's tool. The
[20:21] wiki approach is going to be
[20:22] dramatically better in that situation
[20:24] because by paper five, you're continuing
[20:27] to wrestle with it. You're continuing to
[20:28] read. You're giving input. The wiki
[20:30] contains a synthesis of the first four.
[20:32] You've read all of the primary sources.
[20:34] You have them in your head as well. And
[20:36] paper 5 can get integrated into that
[20:37] existing picture and help you evolve
[20:39] your thinking. contradictions get
[20:41] flagged at the moment of ingest and you
[20:43] can see them really quickly. Cross
[20:44] references get built automatically. It's
[20:46] basically an academic researcher's
[20:48] dream. And so by paper 10, you have a
[20:50] really rich navigable artifact that
[20:52] represents the current state of your
[20:54] understanding of a very difficult
[20:55] subject. It's sort of like notebook LM
[20:58] on steroid. It's not just the current
[21:00] state of your files. It also wins
[21:03] because your personal knowledge evolves
[21:05] over months and you can actually see it
[21:07] grow. Right? So if you're thinking about
[21:08] your health over months about
[21:10] self-improvement about competitive
[21:11] analysis for any domain where the value
[21:14] is in the connections between the
[21:17] sources rather than in any single source
[21:20] alone then that's where Carpathy's
[21:22] approach is going to win right because
[21:23] you're really looking at how it can help
[21:27] you understand a complex synthesis
[21:30] problem but open brain wins when you
[21:32] need precise structured operations
[21:34] across your knowledge base. If you want
[21:36] to ask, "Show me every meeting note from
[21:38] Q1 where pricing was discussed," that's
[21:40] an open-brain type question. If you want
[21:42] to pull the three most recent competitor
[21:44] updates and compare them, that's an
[21:46] open-brain question. Or find all
[21:48] actionable items assigned to me in the
[21:50] last two weeks, open brain. Again, these
[21:52] are database queries, right? You are
[21:54] digging in for specific facts. They
[21:56] return exact filterable results. A
[21:59] folder of text files can approximate
[22:01] this with some keyword search, but it's
[22:03] not going to be perfect, right? It's
[22:04] going to miss stuff. it's going to break
[22:06] fast and it's not really what that whole
[22:08] wiki system was designed for, especially
[22:11] when you need to combine filters, sort
[22:14] by date, or work across hundreds of
[22:16] entries. OpenBrain also wins for multi-
[22:18] aent access when you have clouded code
[22:20] and chat GPT and cursor and a scheduled
[22:23] automation all working against the same
[22:25] data source at once, all needing to read
[22:27] from and write to the same knowledge
[22:28] store at the same time. Well, you need a
[22:30] database that handles simultaneous
[22:31] access in that situation, not a
[22:33] directory of files where two agents
[22:34] editing the same page creates a complete
[22:36] mess. And OpenBrain wins on volume, too,
[22:38] right? OpenBrain can handle thousands of
[22:40] entries across dozens of categories with
[22:42] search, with metadata, with relational
[22:44] queries. And and Carpathy absolutely
[22:46] acknowledges this. It works best at
[22:49] roughly 100 to 10,000 high signal
[22:51] documents. It is not corporate level
[22:53] memory. And I hear corporations saying
[22:54] we should just use this for for our
[22:56] company level context layer. And that
[22:58] will not work. And at the upper end,
[23:00] 10,000 documents, you already need extra
[23:02] search tooling just to stay manageable.
[23:03] And so when you're dealing with
[23:05] thousands of contacts and transactions
[23:06] and events and tasks and documents on
[23:08] top of all of that, structured storage
[23:10] is the only sane option that scales. But
[23:13] to be fair, we should look at where both
[23:16] systems break, right? Every system has a
[23:18] load where it starts to break. They just
[23:20] tend to break in different ways. So as
[23:22] I've called out, the wiki approach tends
[23:24] to break at scale. So, if you have a
[23:25] team that's using it where you are
[23:27] starting to hit that wiki structure from
[23:29] multiple directions, well, now the wiki
[23:31] doesn't know how to autooptimize, right?
[23:33] If person A has an understanding that's
[23:34] evolving differently than person B or or
[23:36] agent A and agent B all have different
[23:38] approaches and they're trying to update
[23:40] the same wiki page. One, you have a
[23:42] conflict and that's going to be a
[23:44] problem. But two, the wiki is going to
[23:46] look like a weird merge of these
[23:48] different approaches that doesn't
[23:50] reflect deep personal understanding.
[23:51] Fundamentally, the semantic
[23:53] understanding that you're evolving with
[23:54] the wiki is designed for a world that's
[23:57] kind of like Andre's world where he's a
[23:59] researcher and he's thinking deeply
[24:00] about a problem and it's for him and
[24:02] it's his evolving understanding with the
[24:04] agent. So for a solo practitioner, you
[24:06] don't get issues here. But for a team,
[24:08] this becomes a really serious problem.
[24:10] If your knowledge changes daily, if you
[24:12] are an operation where you have project
[24:14] status, you have competitive
[24:15] positioning, you have live deal flow,
[24:17] the cost of reynthesizing the wiki every
[24:19] time something comes in becomes really
[24:21] punishing because every change
[24:23] potentially ripples across multiple
[24:24] pages in ways that you can't control.
[24:26] And it should not, right? It should just
[24:28] be another data point in the row. And
[24:31] so, think of the wiki system as being
[24:33] optimized for like papers and articles
[24:35] speed, not Slack message and ticket
[24:38] update speed. And that's the thing that
[24:40] worries me the most is that people don't
[24:41] recognize that a particular knowledge
[24:43] system is designed to work at a
[24:45] particular speed of business. And if you
[24:47] don't think about it that way, you might
[24:49] implement the wrong one. A neglected
[24:51] database has gaps, but the old facts are
[24:54] still true. as opposed to a wiki. A
[24:57] neglected wiki tends to drift because
[25:00] old syntheses become increasingly wrong
[25:02] as new information is not integrated,
[25:05] but they still read with the confidence
[25:06] that comes from well-written pros. And
[25:08] so database staleness can look like
[25:11] ignorance. It can look like you're
[25:12] missing something. I forgot to put stuff
[25:14] into my open brain. But wiki staleness
[25:16] looks differently. It actually looks
[25:18] like active misinformation because you
[25:20] don't know that you're wrong because the
[25:21] page reads like it knows what it's
[25:23] talking about because that is the entire
[25:24] purpose. It's supposed to synthesize
[25:26] stuff and write confident pros that
[25:27] helps you understand a situation and you
[25:30] might not question the gap that you do
[25:32] not see. Now, let's get at some of the
[25:34] scale breakpoints for OpenBrain. And by
[25:35] the way, yes, I am launching fixes for
[25:37] these because that's what we're all
[25:39] about with AI. We make things better
[25:40] over time. In the past, Open Brain has
[25:43] really cracked around deep synthesis
[25:45] quality. If you try to synthesize 15
[25:47] different facts at once, the AI can do
[25:50] it, but it tends to do it in slightly
[25:51] unpredictable ways because it has no
[25:53] previous map of how that worked in the
[25:55] past to do it well. It's essentially
[25:57] searching the shelves of the database
[25:59] every single time from scratch. Now, the
[26:02] answer is usually good because the AI is
[26:04] good, but it's rarely as good as a
[26:07] pre-built synthesis that had the time to
[26:09] integrate everything deliberately from
[26:11] the beginning. And that is something
[26:12] that we're addressing. Browsability is
[26:14] another area that we can think about
[26:16] here. Open brain is deliberately
[26:18] headless. There's no artifact you open
[26:20] and wander through. And I built it that
[26:22] way because it gives you the flexibility
[26:23] to decide how you want to access it.
[26:26] Now, the nice thing is it's very very
[26:28] easy to build the right head over the
[26:31] top. There are people who have added
[26:32] Obsidian to OpenBrain. There's a plugin
[26:34] for that already. So, if that's
[26:35] something where you're like, I just I
[26:36] just can't browse the database, you're
[26:38] absolutely right. Just pick the plugin
[26:40] of your choice and you can browse it.
[26:42] whether that's Obsidian or something
[26:43] else. Here's another one we're building
[26:45] to improve in the wiki. Contradictions
[26:47] surface when new information comes in as
[26:50] long as your initial markdown file
[26:52] deliberately says look for contradiction
[26:54] because the AI is actively integrating
[26:56] against existing pages following your
[26:58] prompt. But in a database environment,
[27:00] the contradiction might just sit
[27:02] silently in adjacent rows unless you
[27:06] specifically ask the right question to
[27:08] expose that contradiction. I'm building
[27:09] a plugin that helps with that. If you
[27:11] are interested in essentially running
[27:13] audits that check for contradictions in
[27:15] your data set, we're launching a plug-in
[27:17] that helps you use OpenBrain as a
[27:21] contradiction surfacing tool. You can
[27:24] actually build out and understand a map
[27:27] of the contradictions in your team or
[27:29] your org data sets really, really easily
[27:32] because you can look through the raw
[27:34] material and see it right away. Yes,
[27:36] databases store facts. they're not
[27:38] contradiction aware by default, but it's
[27:40] relatively easy in the age of AI to
[27:42] extend something like open brain and
[27:44] make it aware of those contradictions.
[27:46] That's what I did. And I know I've spent
[27:48] a lot of time talking about differences,
[27:49] but one of the things I want to call out
[27:51] is that there are a lot of common
[27:52] principles that these systems share.
[27:55] They might disagree on implementation
[27:56] details, but a lot of the underlying
[27:59] thesis or principles about AI and about
[28:01] data they agree on. They agree that you
[28:03] own the artifact, not the tool. So,
[28:05] Carpathy's files are text in a folder
[28:07] you control. Open brains data is in a
[28:09] database you own. It's the same
[28:10] principle. Neither system hands your
[28:12] knowledge to a platform that can repric
[28:14] or lock you in. Carpathy calls this file
[28:16] over app. I've called it building with
[28:17] no SAS middlemen. It's a very similar
[28:20] mindset. It's the same conviction at
[28:22] root. In the age of AI, we should own
[28:24] our own context layer. Right? There
[28:26] should not be someone who is out there
[28:29] whom we are paying just to own our
[28:31] context layer. Also, in both systems,
[28:33] the human's job is curation and
[28:35] questioning. We have to ask what sources
[28:38] go in. We have to figure out what
[28:40] questions to ask. We humans retain a big
[28:42] job in both cases. There's no substitute
[28:45] for thinking carefully about how to
[28:49] organize your personal context layer.
[28:52] And yes, the AI has lots of work to do.
[28:54] It has to understand the facts that you
[28:57] put in an open brain. It has to be able
[29:00] to effectively synthesize on the wiki
[29:02] side. It's effectively a similar
[29:04] division of labor. It's just timing that
[29:06] work differently because on the carpathy
[29:08] wiki approach, it's doing all of that up
[29:09] front and on the open brain approach,
[29:11] it's doing all of that at query time
[29:12] when you ask. In both cases, memory
[29:15] compounds through intentional structure,
[29:18] not just through random accumulation.
[29:20] The only difference is how that
[29:21] structure is positioned and where that
[29:24] structure lives. So it might live in a
[29:26] wiki in Karpathy's case and it lives in
[29:28] a SQL database in OpenBrain's case. But
[29:30] in both cases, the structure is
[29:32] intentionally framed to enable a certain
[29:35] kind of connection to occur. And so for
[29:39] wiki work where you might want the
[29:40] connections to be between documents,
[29:43] that makes a ton of sense, right? You
[29:44] want all of the documents there. You
[29:46] want the AI thinking it through. And
[29:48] that's an intentional structure. Whereas
[29:49] for OpenBrain, the intentional structure
[29:51] is a SQL database that you know can
[29:53] scale and it is designed to hold
[29:55] operational facts and make sure that
[29:57] they are in a neat place where you can
[29:59] reason against them and get audit ready
[30:01] results from day one. Both systems
[30:03] assume that the primary user of the
[30:05] knowledge base isn't you reading in a
[30:08] browser. It's an AI agent working on
[30:10] your behalf. And I think increasingly
[30:12] that's going to be the assumption of all
[30:13] of these memory systems. Human
[30:15] readability is a bonus. Asian
[30:17] accessibility is actually the
[30:19] requirement. So now we come to what I've
[30:22] built because let's be honest, we want a
[30:24] mature system that gives us the strength
[30:26] of both approaches. It's not either of
[30:29] those alone. And so the specific
[30:31] architecture that I'm putting together
[30:33] and proposing is the next major open
[30:36] brain extension.
[30:38] You want to keep openrain as your
[30:41] permanent store. Don't change that. It's
[30:42] a great spot for fax. Everything goes in
[30:45] there. That's fantastic. Every meeting
[30:47] note, every article clip, every research
[30:49] finding, every task, every contact, it's
[30:51] all tagged. It's all searchable. It's
[30:52] all queryable. That makes sense. That is
[30:55] your durable memory layer right there.
[30:57] And it can handle high volumes. It can
[30:59] handle precise query. It can recall
[31:01] across multiple domains in your life. It
[31:03] can be the source of truth. And a wiki
[31:06] layer can act as a compiled view on
[31:10] demand. And and so I'm launching a new
[31:12] process, a new plug-in where a
[31:14] compilation agent can run on a schedule
[31:16] daily, weekly, on demand. And the agent
[31:19] can read from open brain structured
[31:21] data. Effectively, it becomes an open
[31:24] brain graph. It can synthesize across
[31:27] entries. It can produce wiki pages on
[31:29] demand. It can produce topic summaries.
[31:31] All driven by the idea that if you form
[31:33] a graph of your knowledge base, you can
[31:36] get the advantages of the wiki approach
[31:38] with the solidity and the factuality
[31:41] that comes from an open-brain SQL
[31:43] database. And so these pages can be
[31:46] generated artifacts for you. Think of
[31:47] them like a daily briefing that a really
[31:49] good chief of staff writes by reading
[31:51] everything in your files and distilling
[31:53] it into something you can browse. The
[31:56] graph approach allows you to follow
[31:58] Karpathy's patterns for synthesis to
[32:00] cross reference to link related topics
[32:02] to flag contradictions to maintain an
[32:05] evolving synthesis but it works from
[32:09] structured data not raw files and that
[32:12] means it can do things Carpathy's ingest
[32:14] can't like filter entries by date or
[32:16] category before synthesizing. It can
[32:18] wait by confidence. It can exclude
[32:20] outdated items. In other words, the
[32:22] synthesis is richer because the
[32:24] underlying data is more detailed. The
[32:26] wiki pages are an easy to read layer and
[32:29] you can browse them in Obsidian. You can
[32:31] browse them in a note app, but they're
[32:33] all powered by a pre-built context graph
[32:37] that lives on your structured data that
[32:39] would not exist without your structured
[32:41] data. They end up being your hot
[32:43] reference for when you're actively
[32:45] working on a topic. And the structured
[32:47] data ends up being like the raw files
[32:49] that Carpathy uses when he wants to look
[32:51] at the raw material in his wiki. But
[32:54] unlike the raw files, these are easily
[32:56] queryable and organized in a SQL
[32:58] database. So you can scale them in a way
[33:00] that you can't with raw files. You do
[33:02] not have a 10,000 file limit with
[33:04] OpenBrain in the same way. So the
[33:06] database stays the single source of
[33:08] truth. New information always goes into
[33:10] the core SQL open brain first. The wiki
[33:13] is never edited directly and this
[33:15] prevents the error compounding problem
[33:17] that several commenters on Carpathy's
[33:19] post flagged. If the AI writes something
[33:21] slightly wrong into the wiki and it
[33:23] stays there, the next answer will build
[33:25] on that wrong thing and you start to get
[33:27] drift and errors start to accumulate.
[33:30] Whereas in the hybrid model that I'm
[33:32] proposing with OpenBrain, the database
[33:34] is always authoritative. The wiki is
[33:36] generated from a graph built off of that
[33:39] database. So if the wiki has an error,
[33:42] well, you fix the source data and you
[33:45] regenerate. You're not dependent on the
[33:48] wiki as a source of truth. The wiki
[33:49] never drifts from reality because it's
[33:51] always rebuilt from ground reality in
[33:53] the SQL database. In open brain terms,
[33:55] this is like a recipe. It's a composable
[33:57] workflow that reads from the database
[33:59] and produces an output based on a graph.
[34:01] A wiki compiler recipe can query
[34:04] relevant tables, synthesize pages
[34:06] through AI, and effectively develop a
[34:08] network of relationships and write that
[34:11] output to a wiki directory. And if
[34:13] you're wondering, yes, it can run on an
[34:14] automated schedule. It can get better
[34:16] every cycle because the underlying data
[34:18] hopefully, if you're committing to it,
[34:19] grew since last time. It becomes a
[34:22] compounding loop as long as you are good
[34:24] at putting data in. And so what you end
[34:26] up with is OpenBrain for structured
[34:29] storage and Asian access and a Carpathy
[34:32] style wiki over the top for compiled
[34:34] understanding and human browsability.
[34:35] The database ends up feeding the wiki
[34:39] and the wiki never contradicts the
[34:40] database. You can query either one
[34:43] depending on what you need, whether it's
[34:44] a precise fact or a synthesized
[34:46] narrative, and you can decide which you
[34:49] want to go for depending on the kind of
[34:51] problem that you're solving. And so just
[34:53] to be really really blunt about which of
[34:55] these because I know I'm going to get
[34:56] asked which do I build? If you are going
[34:58] deep on a single research topic, if
[35:00] you're a solo user, if you don't need
[35:02] precise queries, if you don't need
[35:04] multi- aent access, if you want to think
[35:06] by reading and by browsing, you want
[35:09] something running in 30 minutes with
[35:12] zero infrastructure. In those
[35:14] situations, then it absolutely makes
[35:17] sense to use straight up Carpathy's wiki
[35:19] that he posted on the GitHub because the
[35:21] AI will build the whole system for you
[35:23] and it's designed for exactly that kind
[35:24] of solo use case. But you should build
[35:27] with open brain if you need multiple AI
[35:29] tools accessing the same memory. If you
[35:32] are assuming that you have a team
[35:33] working with this information, if you're
[35:34] capturing high volume information across
[35:36] many categories, if that information is
[35:39] not necessarily narrative based, if it's
[35:41] numbersbased,
[35:42] if you need structured queries, if
[35:44] you're building automated agent
[35:46] workflows off of this, if you're
[35:48] thinking about this as infrastructure
[35:49] that lasts for a long time and needs to
[35:51] scale and not just for a single project.
[35:54] In a sense, a lot of what the wiki feels
[35:57] like is a better, cooler version of
[36:00] Notebook LM, which is an amazing tool,
[36:02] but not a tool that you can use for an
[36:05] entire team. And so, right now, I tend
[36:07] to say have it both ways. Have your open
[36:10] brain running, and if you want a
[36:12] browsable presynthesized understanding
[36:14] layer, just grab the graph plugin and
[36:16] add that over the top. And then neither
[36:18] replaces the other, and you get the
[36:19] benefits of both. None of this is to say
[36:21] that Andre Carpathy isn't right about
[36:23] what he built. He built a phenomenal
[36:24] tool for himself and for other
[36:26] researchers in a similar position. And
[36:28] regardless of which system you end up
[36:30] going with, there are two ideas from
[36:32] Karpathy's post that are worth adopting
[36:34] right away. The idea file as a
[36:37] publishing format is one of those. And
[36:39] one of those is really simple. It's the
[36:41] way he shared it. The idea file is his
[36:43] publishing format. Carpathy didn't ship
[36:45] a tool. He published a high-level
[36:47] description of an idea that was designed
[36:49] to be pasted into an AI agent that would
[36:51] build the specifics with you. This is
[36:53] what I have been saying when I tell you
[36:55] to take my YouTube transcript and feed
[36:57] it to an AI. It is a genuinely new way
[36:59] to share technical knowledge. It is a
[37:01] great blueprint for an AI to execute.
[37:03] And I think we're going to see more of
[37:05] it because it's much simpler than just
[37:08] having to give an exhaustive step by
[37:10] step that a human has to follow. It ends
[37:12] up respecting the reader's agency
[37:13] because they can give their own
[37:15] commentary on the idea and then them and
[37:18] the agent can decide the details
[37:19] together while giving them a proven
[37:22] pattern to start from. And yes, if
[37:24] you're wondering, you can absolutely
[37:26] take the transcript from this YouTube
[37:27] video and get started on your own memory
[37:30] project as we've been going through this
[37:32] video together. Just plug it into your
[37:33] agent and go. But the deepest insight
[37:35] here is that Carpathy is moving the AI
[37:38] from Oracle to maintainer. The role AI
[37:41] plays is starting to change. Most of us
[37:43] have treated AI as something you ask
[37:45] questions to. Whereas Karpathy correctly
[37:48] treats it as something that has an
[37:50] ongoing job, maintaining a knowledge
[37:52] artifact that gets better over time. The
[37:54] AI isn't here for magical pie in the sky
[37:57] one-off answers from the clouds. It's
[38:00] here for building sustained work that
[38:02] compounds. And the question that we're
[38:03] all facing is just is this the right
[38:05] interface for that maintenance role.
[38:07] Right? I don't want to lose the fact
[38:09] that underneath that there is a profound
[38:12] insight here about moving from an answer
[38:15] engine mindset to moving to a mindset
[38:18] where AI is a maintainer of thinking
[38:21] systems that allow you to think
[38:23] deliberately and do your work better. I
[38:25] think that's a profound insight because
[38:27] it allows us to be the ones who curate,
[38:30] who think, who select, who explore, and
[38:34] it allows the AI to support us, right?
[38:37] As we ask the right questions, the AI
[38:40] can help us by doing so much of the
[38:42] grunt work. And isn't that what we
[38:43] wanted in the first place? Didn't we
[38:45] want that division of labor in the AI
[38:47] dream world to be the AI doing more of
[38:48] the grunt work and human judgment being
[38:50] relevant? That's the dream. What Andre
[38:54] Karpathy is describing is one way to get
[38:56] there, especially if you are in a deep
[38:59] solo research project. And OpenBrain
[39:01] describes another way to do the same
[39:02] thing. It's just focused on more
[39:04] scalable structured data. And yes, you
[39:07] can have the best of both worlds because
[39:09] we can build a graph over the top of
[39:11] OpenBrain. This is exactly why I built
[39:13] it Extensible because I knew that we
[39:15] would have more stuff coming out around
[39:17] memory in 2026 and I wanted to build a
[39:19] foundation we could build on. So here we
[39:21] are. It's our first major test and we
[39:23] can build something over the top that
[39:25] allows us to have the best of this wiki
[39:27] approach as well as the best of the
[39:29] structure data that open brain gives us.
[39:31] Ultimately, I think the lesson that we
[39:33] get from Karpathy's wiki is that we need
[39:37] to become thinkers about how we want our
[39:41] memory and our context layers to work in
[39:44] order to be effective builders of agents
[39:47] and effective partners with AI over the
[39:50] second half of 2026 and into 2027. None
[39:53] of what I am describing excuses us from
[39:55] doing that thinking. In fact, it's the
[39:57] opposite. What I've been spending time
[39:59] telling you in this video is that there
[40:01] is no substitute for making really clear
[40:05] distinctions and really clear decisions
[40:08] about the way you want your knowledge
[40:10] structured. Whether that's just you in
[40:12] your room with a laptop and it's your
[40:14] personal knowledge base or whether it's
[40:16] for your team or whether it's for your
[40:18] org. It is up to you to say I want
[40:20] structured data because I know that I
[40:23] need to query against structured data
[40:24] and get reliable results above 10,000
[40:26] artifacts. Or it's up to you to say you
[40:29] know what I want the best of both world.
[40:31] There's going to be some stuff where I'm
[40:33] going to actually want to query with
[40:34] multiple agents and get structured
[40:35] results for three different reports at
[40:37] the same time. But over the top of that,
[40:39] I want a graph database that allows me
[40:41] to think in connections between
[40:43] materials. That would be a little bit
[40:45] more difficult to do if I was just
[40:47] querying structured data by itself. It's
[40:49] up to you. It is not up to me. We all
[40:52] have to wrestle with this. And if you
[40:53] are an engineer thinking about this or a
[40:56] product manager thinking about this in
[40:57] an org, you cannot substitute for that
[41:00] level of thoughtfulness. I'm sorry. You
[41:02] got to do the thinking. And so I hope
[41:04] this video has helped give you the tools
[41:06] to make that decision clearly.