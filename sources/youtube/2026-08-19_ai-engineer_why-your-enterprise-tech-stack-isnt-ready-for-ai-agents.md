---
title: "Why Your Enterprise Tech Stack Isn't Ready for AI Agents"
type: "youtube"
channel: "AI Engineer"
date: "2026-08-19"
resource: "https://www.youtube.com/watch?v=mav15aW9lLM"
pillar: "building"
tags: [agents, architecture, enterprise, best-practices, evaluation]
timestamp: "2026-09-09"
extraction_method: "auto-captions"
video_id: "mav15aW9lLM"
duration: "19:15"
---

[00:01] [music]
[00:14] Hello everybody. My name is Christopher
[00:16] Lovejoy and I'm a member of technical
[00:18] staff at Anthropic. Uh, and I work as a
[00:20] for deployed engineer. So I embed within
[00:23] enterprise organizations and help them
[00:25] get value from using AI agents. and I
[00:28] previously worked at Anterior with Saul.
[00:31] >> Hi everybody, I'm Saul. I'm VP of
[00:34] engineering at Anterior. We're a New
[00:36] York-based company selling AI uh Aentic
[00:40] AI to US health insurance companies. Um
[00:45] Chris and I have spent a lot of time
[00:46] building in enterprise and uh in
[00:49] healthcare enterprises particularly and
[00:52] uh healthcare is a very challenging
[00:54] place to develop and deploy AI.
[00:58] [clears throat] Healthcare is so
[00:59] challenging because of the requirements
[01:03] around uh process and uh compliance the
[01:08] regulatory uh requirements that that
[01:10] that are so important also because of
[01:13] the uh direct real impact that your work
[01:16] has on people's lives which is of course
[01:18] also what makes it so rewarding. Um I
[01:22] think a lot of the learnings you can
[01:24] take from working in enterprise for
[01:27] healthcare you can take to enterprise in
[01:29] other regulated industries like finance,
[01:32] defense, government work, anywhere where
[01:35] process is so important and has to be
[01:38] followed.
[01:39] And in this talk, we're going to talk
[01:40] about um some of the learnings that
[01:41] we've had and specifically we're going
[01:43] to talk about why enterprise text stacks
[01:45] aren't ready for AI agents and some of
[01:47] the primitives that we've built uh in
[01:49] the past in order to unlock them. And to
[01:51] make this concrete, let's start by
[01:53] considering a scenario that might be
[01:55] familiar to many of you which is the of
[01:57] enterprise proof of proof of concept,
[01:58] the enterprise PC.
[02:00] And let's say we have identified a
[02:03] customer that we want to serve and we've
[02:06] identified a priority use case with
[02:07] them. So obviously we're on the
[02:08] healthcare track here. Let's consider a
[02:11] um a large health system and a use case
[02:13] that is some sort of administrative
[02:15] healthare workflow. So you work with
[02:18] them, you scope out a PC, you define the
[02:20] metrics that you are going to care about
[02:21] and you're going to bench benchmark
[02:22] yourselves on. Um you allocate to
[02:24] engineers, you spend four weeks building
[02:26] it. And um the actual buildout might
[02:30] look a little bit something like this.
[02:32] >> An enterprise stack is very complicated.
[02:36] It's much much more than we're showing
[02:37] here, but generally you can have an
[02:39] application layer, a control plane
[02:41] layer, the data plane for your PC.
[02:44] You're going to need some access to the
[02:46] model provider as well. And your PC is
[02:49] going to need access to data across all
[02:52] of these different planes. It may some
[02:53] in the data lake, some directly from the
[02:55] application layer, for example. And so
[02:57] you're going to deploy it something like
[03:00] this. It's going to connect to all these
[03:02] different places. There's going to be
[03:03] some offline data pulling. there's going
[03:05] to be some maybe some online generally
[03:08] you'll get access to the data and push
[03:10] towards the results
[03:13] and so things go well you you get great
[03:15] results the the AI performs you know as
[03:18] you expected you you hit the performance
[03:19] metrics um you know it's fast it's
[03:21] relatively cheap and you hold a meeting
[03:24] you present this to the relevant
[03:26] stakeholders and everyone seems pretty
[03:27] happy um so you know your chief of
[03:29] finance um in the in the company is very
[03:32] excited and wants to understand what's
[03:33] going to be the impact on the budget for
[03:34] next here. Uh, your chief medical
[03:36] officer is excited to tell his his
[03:38] colleagues, you know, how accurate his
[03:39] AI is. Um, and the head of sales asks,
[03:43] okay, when can we put powered by AI?
[03:44] When can we put that on the websites?
[03:46] Um, but the problem is everyone here is
[03:47] assuming that the the hard part is done,
[03:49] that the AI was was the challenging
[03:51] part, but actually, as we know, often
[03:53] getting things into production is really
[03:54] where the challenge lies. Um, and to get
[03:56] a bit more specific on what that
[03:57] challenge looks like, um, you hold a
[04:00] meeting the next day. you bring in the
[04:02] relevant stakeholders to discuss
[04:04] productionizing this proof of concept
[04:05] application and somebody raises their
[04:08] hand and says um can I see the the audit
[04:11] trail for this like for us for
[04:12] compliance it's critical that we can see
[04:14] every step every action that the agent
[04:15] takes every piece of data that it
[04:16] accesses can can you give that to me and
[04:19] you realize that actually you know with
[04:21] the way things have been implemented in
[04:22] the initial PC without these um kind of
[04:24] true integrations that actually that's
[04:26] going to be quite challenging and then
[04:28] somebody else um pops up with some other
[04:30] questions so somebody asks okay well
[04:31] actually how is data sensitive data
[04:32] being handled here? Um how's that being
[04:34] passed to the agency? You know, we have
[04:35] a very strict boundary around where our
[04:37] data can go and where it can't go. Um is
[04:39] is this respecting that? How does that
[04:41] look? And then your chief medical
[04:43] officer says, "Okay, and who's approving
[04:44] the decisions here?" Because we know in
[04:46] certain scenarios we have to escalate to
[04:47] a clinician who will then uh you know
[04:50] approve or or or not agree with what the
[04:52] agent is saying. Um so how does that
[04:54] happen? Like what's the mechanism for
[04:55] that? And over the course of the
[04:57] meetings you know you can imagine you
[04:58] get more and more questions. So, can
[04:59] untrusted data manipulate the model? How
[05:01] do we know that the agent continues to
[05:02] perform well? How do we deal with
[05:04] integrations? How do we connect to Epic,
[05:06] to Salesforce, to the other kind of
[05:07] applications that we care about? And for
[05:09] the purposes of this talk, we're going
[05:11] to focus on these four, the highlighted
[05:12] ones. For the other two, feel free to
[05:14] come and chat to me and Sol about these
[05:16] later. We're very happy to talk, but um
[05:17] just in the interest of time, we'll stay
[05:19] focused. And let's start with uh this
[05:22] one about the audit trail.
[05:23] >> So, this is a question you're guaranteed
[05:26] to get from the security team. they're
[05:28] going to want to see an audit trail. And
[05:31] for programmers, an audit trail sounds
[05:33] very like a typical developer log that
[05:35] you might have in Data Dog. Surely it's
[05:37] it's it's a similar kind of thing. But
[05:39] for security frameworks that exist in
[05:43] the real enterprise world like SOCK 2,
[05:46] High Trust, HIPPA, an audit trail is is
[05:49] a bit more than that. It it has to
[05:51] contain a complete record of absolutely
[05:53] every action that the agent took. It has
[05:56] to contain all of the places where the
[05:59] agent accessed data, all of the
[06:01] authorization by which the agent did
[06:03] something. It's it's this complete
[06:06] record in in a much more fundamental
[06:08] way. And uh you one way of thinking
[06:11] about it is in a legal sense. It say
[06:15] agents decisions came up in a court of
[06:18] law. Could we show a justifiable chain
[06:21] of evidence for why the particular
[06:23] actions were taken by a decision? And
[06:25] that's something that could easily
[06:26] happen within the healthcare context.
[06:27] For example,
[06:29] when I think about architecting systems
[06:32] like this, I think often about what do I
[06:36] want to make easy? What are when I'm
[06:39] choosing my constraints, I'm saying,
[06:41] okay, these are the things I want my
[06:42] system to be easy and let that drive the
[06:44] tradeoffs that that I'm going to make.
[06:47] And a particular pattern that uh uh is
[06:51] used in lots of different industries,
[06:52] for example, in finance is a transaction
[06:56] log, an immutable record of events that
[07:00] store all of the transactions that
[07:03] happen throughout the system. And this
[07:06] is appendon timestamp log. It's
[07:10] complete. So this is your source of
[07:12] truth for all of the data of the system.
[07:14] And it's unified. So there is only one
[07:16] source of truth across all of the
[07:17] different agents that you might have
[07:18] running in parallel for example and
[07:21] architecting in this way making this
[07:23] trade-off uh means that auditability
[07:27] becomes trivial. It falls out of your
[07:30] data storage paradigm that you've
[07:32] chosen. It's sort of it's impossible not
[07:34] to be able to roll back time and and see
[07:36] exactly the state of the system at a a
[07:38] particular point in time and be able to
[07:40] uh provide that as an audit trail for
[07:42] what happened uh at at each point in
[07:45] time. And of course these are
[07:48] trade-offs. So what's the trade-off
[07:50] you're making here? I think we could say
[07:52] that for uh this kind of event logging
[07:54] or sometimes called event sourcing
[07:56] pattern writes become very easy. So you
[07:59] just drop an event. reads become more
[08:01] difficult because you have to uh read
[08:03] through all of the events in order to
[08:05] reconstruct a view of what happened and
[08:07] there are patterns like caching and
[08:09] snapshots that you can bring to to to
[08:11] make that that simpler but there always
[08:13] is more effort there although I have
[08:15] seen in in the healthcare context that
[08:18] actually you're going to want different
[08:21] interpretations of the raw data that
[08:23] your agents recorded after the fact. So
[08:26] for example, it might be that uh more
[08:29] events happened and that changes the
[08:31] interpretation of the healthcare journey
[08:33] and you want a different view of this
[08:35] the source of truth at that particular
[08:37] time and this pattern makes that easy
[08:40] because uh all of your views of the data
[08:42] are ephemeral computed projections of
[08:44] the event log.
[08:46] Um okay next
[08:50] the compliance officer comes and is
[08:53] asking how is the sensitive data passed
[08:55] around the system what's the life cycle
[08:57] of data within our system and within a
[09:00] healthcare context as we all know data
[09:03] means a lot it's PHI protected or
[09:06] personal health information it's uh has
[09:09] legal restrictions around it not just
[09:10] HIPPA but other legal restrictions about
[09:12] the use of people's data you cannot have
[09:15] your agent Just as you cannot have
[09:17] humans accessing and reading and
[09:20] utilizing healthcare data that they
[09:22] don't absolutely have a necessity to use
[09:24] at at that point in time for that
[09:26] particular uh journey and so again
[09:31] architecturally when I think about how
[09:32] am I storing data within a particular
[09:34] system I would like to think what is the
[09:37] shape of the data what kind of
[09:39] characteristics does the data have for
[09:42] healthcare data that might be that it's
[09:44] very complicated
[09:46] It doesn't follow strict hierarchical um
[09:50] relationships.
[09:51] It's uh sometimes unstructured and it's
[09:54] sometimes structured. It could be very
[09:55] large. For example, healthcare data, one
[09:58] piece of healthcare data can easily be
[09:59] over a megabyte in size or or much more
[10:02] than that. Uh it has strict access
[10:04] controls as we've been saying. The rback
[10:06] comes into play like uh both for humans
[10:09] and and then for agents downstream of
[10:11] that. Uh it may even be we I've seen
[10:15] customers where they're not willing to
[10:17] have their healthcare data leave their
[10:18] own environment, leave their on-rem VPC
[10:20] for example. So we have tangential
[10:23] access to their to their data. And so an
[10:26] architectural paradigm I might go to is
[10:28] object storage. Schemadriven object
[10:31] storage I think is a good fit for this.
[10:33] It's matches well with the choice of
[10:36] using event logging because you can
[10:39] separate the two. So the events we
[10:41] talked about as the record of what the
[10:43] agent is doing at any particular time
[10:45] only contain references to the
[10:47] schemadriven blobs that are the storage
[10:50] of the actual healthcare data itself.
[10:53] And uh it's important therefore that the
[10:55] healthcare data is stored immutably
[10:57] again so that you can always go back in
[10:59] time and reconstruct what data the agent
[11:01] had access to at that particular point
[11:03] in time. This separation of events for
[11:07] what happened and object storage for the
[11:10] data that was used at that particular
[11:12] point in time has actually some some
[11:16] very useful benefits. For example, with
[11:18] a system like this, it's possible for
[11:20] developers to go back and debug and have
[11:23] observability over what happened, what
[11:26] particular steps the agent took, why it
[11:29] did that, and and retrace the agent's
[11:31] steps without having access to the
[11:35] personal health information itself.
[11:37] Although because of the schema driven,
[11:38] they can see the shape of that data,
[11:40] they they can't and to be honest, often
[11:43] won't be able to be given access to that
[11:45] healthcare data. So you can separate out
[11:47] observability and orchestration and
[11:49] instrumentation from the healthcare data
[11:51] itself. This then has another benefit
[11:54] which is zero trust.
[11:57] It it the object storage becomes a place
[12:00] where you can apply zero trust
[12:01] principles. Your agents can bear tokens
[12:05] and use those tokens to access the data
[12:08] at the point of use and not allow data
[12:11] to flow around the system as it likes.
[12:15] This then leads into a mitigation for uh
[12:19] prompt injection for the lethal
[12:21] trifecta. The way I think about the
[12:23] lethal trifecta is can I solve for the
[12:26] constraint if I have an agent at point A
[12:29] with access to this data. Is it possible
[12:31] within my architecture for the agent to
[12:33] be also accessing data over here? And
[12:36] zero trust principles, tokens beared by
[12:39] the agents and object storage segregated
[12:42] from the uh event stream that has your
[12:44] orchestration logic gives you a place to
[12:47] be able to solve for that constraint. It
[12:49] won't be possible for the agent to
[12:50] access data within the same process that
[12:52] that you've given it the the previous
[12:54] data.
[12:57] >> Okay. Okay, so then it comes to how do
[13:00] you handle escalation? And in many
[13:03] scenarios, you will want to be able to
[13:05] escalate a decision that an agent makes
[13:07] or an action that an agent makes to a
[13:09] human. But one of the challenges here is
[13:11] that this is quite dynamic. So you don't
[13:13] know in advance when exactly perhaps the
[13:14] agent's going to escalate. It could be
[13:16] that you're asking the AI to escalate
[13:18] when it's not sure. Um it could be that
[13:20] you define some sort of rules in your
[13:22] system. Maybe in a medical context the
[13:25] treatments going above a certain
[13:26] threshold means that it needs to be
[13:27] escalated uh for an approval. [snorts]
[13:30] But this makes it very challenging um
[13:31] because of this this inability to
[13:33] predict. And a second challenge is also
[13:35] that humans and LMS ultimately process
[13:39] context differently. You know LM will
[13:41] have no problem if you give them massive
[13:42] massive amounts of text but humans um
[13:44] that's not the case. So what we've seen
[13:47] is that one pattern that can work very
[13:50] well here is if in your platform you
[13:52] enforce kind of a wider definition of
[13:55] agent which encompasses both LLMs and
[13:57] humans then you can make it such that
[13:59] any action that can be taken by an LLM
[14:01] could also be taken by a human and this
[14:03] is helpful because at any point in the
[14:06] kind of chain of actions that your agent
[14:07] is taking it can escalate to a human.
[14:09] the human could perform that action and
[14:10] then any step downstream doesn't care
[14:13] about whether it was a human or an LM
[14:14] that did those actions upstream. Um and
[14:19] on the second point around the context,
[14:22] what this also uh makes much easier is
[14:24] that you can define methods that take
[14:28] the context which has some kind of
[14:30] shared definition of context which is
[14:32] irrespective of whether it's a human or
[14:33] an LM that's going to be accessing it
[14:35] and you can take those methods to then
[14:36] map into something that's agent friendly
[14:39] like a prompt or into something that's
[14:40] more human friendly for example a UI.
[14:42] Okay.
[14:46] And then on this fourth and final
[14:49] question that we're going to talk about
[14:50] um eval
[14:53] obviously you know we hear a lot about
[14:54] evals we know that evals can be very
[14:56] helpful that often they drive decision-m
[14:58] about the types of model you want to use
[15:00] the type of approach you might want to
[15:01] use um within your product but we also
[15:03] know that evals can be pretty hard and
[15:05] there's various factors here we [snorts]
[15:07] know that LLMs are not deterministic so
[15:09] it can be quite tricky to pin down the
[15:11] precise change that led to some sort of
[15:13] change in output um we also know that
[15:17] the data that you might put in an
[15:19] offline data set might not necessarily
[15:21] represent production data and it could
[15:23] be that um maybe you sampled from data
[15:26] but actually that sample isn't truly
[15:27] representative and then you also have
[15:29] drift of data um over time so maybe your
[15:32] offline data set is now out of date
[15:36] and what we found is that these three
[15:39] primitives that we've described
[15:40] described so far in the talk actually
[15:42] give you effective privacy preserving
[15:44] evals almost as a byproduct
[15:47] um without needing to kind of bolt
[15:48] something onto the side of of your um
[15:50] architecture. So to make that more
[15:53] concrete, so the immutable ledger, what
[15:55] this means is that you can replay your
[15:56] actions. So you can go back to any
[15:58] particular time, you know, in this kind
[16:00] of sequence of events, you can see the
[16:02] complete state of the system at that
[16:04] point in time. And if you wanted to, you
[16:06] could then make very specific tweaks. So
[16:07] you could tweak a prompt, you could
[16:08] tweak a model, you could tweak the code,
[16:11] and you can see the exact direct impact
[16:13] of that because you have all of that
[16:14] context.
[16:16] Secondly, you have this human agent
[16:18] equivalency which means that for any
[16:21] task you could get both the agent, the
[16:24] LLM agent and the human to perform it
[16:27] and your difference is your eval that
[16:28] gives you the eval scores. And then
[16:31] finally, what the object storage enables
[16:32] you to do is to actually run these evals
[16:35] on production data um including inside
[16:37] your customer's environment without
[16:38] actually ever exposing that data. and
[16:40] you can get your eval results without
[16:42] the sensitive data ever needing to come
[16:43] to where your agent's performing the
[16:44] work.
[16:48] Right? So, we've gone through four
[16:51] architectural principles that we found
[16:53] useful for building in healthcare and
[16:55] more generally in regulated environments
[16:57] for enterprise. the immutable ledger of
[17:00] actions, the orchestration adjacent
[17:02] object storage, the human agent
[17:04] equivalency and the way that with these
[17:07] three principles eval can emerge as a
[17:10] first class property of the system
[17:12] rather than as something you attach onto
[17:14] the side. I think one of the metas here
[17:18] is that I like to think about
[17:20] architecture as
[17:23] taking your constraints very seriously
[17:25] and thinking about what you want to be
[17:26] simple within the system and then
[17:28] choosing the trade-offs for that. And of
[17:32] course alongside that some things will
[17:33] become hard but it's the things that are
[17:35] simple that are most important to you.
[17:37] And that there are patterns that already
[17:39] exist across enterprises that solve for
[17:42] a lot of these things. And sure with AI
[17:44] we need to combine them in new sometimes
[17:45] radical ways and bring in other way
[17:47] other pieces but there are patterns that
[17:50] have worked very well within finance
[17:52] within defense within big tech that that
[17:54] can be applied to this kind of system
[17:55] architecture
[17:56] and I'd say the takeaway is that where
[18:00] I've seen it go wrong is taking that
[18:03] initial P that um that point solution
[18:06] that showed so much promise and that
[18:08] that showed the high accuracy for
[18:10] example and then trying to build up from
[18:12] it, strapping on the enterprise
[18:15] requirements as you come across them.
[18:16] Okay, we need evals, we need uh
[18:18] security, we need auditability and
[18:20] bolting these on as additions to the the
[18:22] the foundations of the PC.
[18:25] You end up with something very brittle,
[18:26] something very hard to uh uh externalize
[18:29] and to generalize across different use
[18:31] cases. But where I've seen it go well is
[18:35] if you take the constraints of a
[18:37] productionready scaled enterprise uh
[18:40] system seriously from the beginning and
[18:43] treat those as the architectural
[18:44] principles that you're going to build
[18:46] everything upon and then build back up
[18:47] towards that PC accuracy using your new
[18:50] primitives.
[18:53] Thank you for your attention. Thank you.
[18:55] [applause]
