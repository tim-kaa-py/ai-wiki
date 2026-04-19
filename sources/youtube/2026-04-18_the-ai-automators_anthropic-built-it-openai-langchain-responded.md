---
title: "Anthropic Built It. OpenAI and LangChain Just Responded. You Now Have A Decision To Make."
source_type: "youtube"
channel: "The AI Automators"
date: "2026-04-18"
url: "https://m.youtube.com/watch?v=YJCe8hvZrxs"
pillar: "ecosystem"
tags: [managed-agents, claude, openai, langchain, agents, harness, sandbox, agent-frameworks, infrastructure, comparison]
ingested: "2026-04-19"
extraction_method: "auto-captions"
video_id: "YJCe8hvZrxs"
duration: "21:15"
---

[00:00] Three of the biggest players in AI have
[00:02] all made moves in the agent space over
[00:04] the last seven days. And if you're
[00:05] building AI systems right now, you need
[00:07] to understand what has shifted. Last
[00:09] week, Anthropic released Claude managed
[00:11] agents, which is a fully cloud hosted
[00:14] agent platform. And through their
[00:15] engineering blog post, they describe how
[00:18] they decoupled the brain from the hands
[00:20] to actually execute this at scale. This
[00:22] platform landed with a mix of both
[00:24] fanfare and confusion, which I'll get
[00:26] into in a bit. But the very next day,
[00:28] Langchain responded with their very own
[00:30] deep agents deploy. And they explicitly
[00:32] call it out as an open alternative to
[00:34] clawed managed agents. Within this blog
[00:37] post, they argue that the real lockin of
[00:39] clawed managed agents isn't necessarily
[00:41] in the model, but it's in the memory
[00:43] that builds up within a closed harness.
[00:46] And not to be outdone by all of this,
[00:48] yesterday, OpenAI got in on the action
[00:50] 2, releasing the next evolution of their
[00:52] agents SDK. And this open- source
[00:55] library essentially ships with a number
[00:56] of harness-like features baked in. In
[00:59] their announcement, they took a more
[01:00] diplomatic swing by laying out the
[01:02] weaknesses of both Langchain and
[01:04] Entropics approaches and how their
[01:06] agents SDK is the best one to bet on. So
[01:08] clearly a lot going on here. In this
[01:10] video, I'm going to cut through all of
[01:12] the marketing speak and lay out exactly
[01:14] what these three approaches are. And
[01:15] I'll also show you where they fit on the
[01:17] broader map of agent building approaches
[01:20] because this is where things get really
[01:21] interesting. There are hundreds of agent
[01:23] platforms and frameworks that you can
[01:25] choose from. And that single decision
[01:27] impacts everything downstream. So I've
[01:29] distilled the entire landscape down to
[01:31] five distinct tiers on a spectrum of
[01:33] build to buy where you have maximum
[01:36] control versus maximum convenience. And
[01:38] interestingly, both claude managed
[01:40] agents and deep agents deploy sit in
[01:42] tier three, this managed infraction
[01:45] because they're both solving the same
[01:46] problem just in different ways. There
[01:48] are four other tiers that you should
[01:50] understand before committing to an
[01:51] approach because the wrong choice here
[01:53] locks you in on memory, on
[01:54] infrastructure, and on the harness
[01:56] itself. First up is clawed managed
[01:58] agents. And I think it's fair to say
[02:00] that it promised a lot more than it
[02:02] actually delivered. When you strip it
[02:03] all back, this is essentially an
[02:05] infrastructure play by Anthropic where
[02:07] they charge you 8 US cent per session
[02:10] hour for active runtime. And this
[02:12] platform ships with everything. This is
[02:14] the brain and the hands concept I
[02:16] mentioned earlier. So the brain being
[02:18] both the model and the harness itself
[02:20] which is the agent loop and then the
[02:22] hands essentially being sandboxes to
[02:24] actually execute code tool calling and
[02:27] MCPs there's also session management and
[02:30] overall orchestration. So with all of
[02:32] this in a blackbox system where
[02:34] anthropic actually manage the
[02:36] infrastructure and scaling the idea is
[02:38] that you can build and deploy agents 10
[02:40] times faster in theory anyway. And in
[02:43] fairness to Anthropic, there are real
[02:44] problems that the solution actually
[02:46] solves because shipping production
[02:48] agents requires sandbox code execution,
[02:51] credential management. You need scoped
[02:53] permissions on tool calls, end to-end
[02:56] tracing. And if you've built a custom AI
[02:58] agent before and deployed to production,
[03:00] you'll know all about that. So the idea
[03:02] of this platform is that it abstracts
[03:03] away all of that complexity and claude
[03:06] essentially handles it. Where this
[03:07] announcement fell a bit flat is that it
[03:09] actually promised a lot more than it
[03:11] delivered. So some of the really
[03:12] interesting concepts like outcomebased
[03:15] tasks, multi-agent orchestration,
[03:18] stateful memory, all of these weren't
[03:20] actually released. They're only
[03:22] available as limited research previews
[03:24] and you need to fill out a form to
[03:25] actually get access. So as a result of
[03:27] that, the creation of agents within the
[03:29] clawed console is pretty underwhelming,
[03:31] and it's very similar to a lot of other
[03:33] agent builders that you might have come
[03:35] across. You have a quick start guide
[03:37] where you can set system prompts, set
[03:39] MCPs and tools. We also have an agent
[03:42] skills section. Sessions are triggered
[03:45] that you can track the actual
[03:46] conversation history. Then there's also
[03:48] environments. So this is the brain
[03:50] versus the hands. Separate environments
[03:52] that you can establish. And then you can
[03:54] have different libraries installed in
[03:56] those environments. And then there are
[03:57] also credential vaults so that access
[04:00] tokens aren't actually within sandboxes
[04:02] nor are they available to the LLM. So
[04:05] the building blocks are here for the
[04:06] fully hosted and managed agent system.
[04:09] It really is just lacking a lot of the
[04:11] interesting features that you would need
[04:14] to actually execute longunning sessions.
[04:16] Two other things worth talking about
[04:18] here. In our previous video where we
[04:20] went through the improved harness design
[04:22] for longunning apps that was produced by
[04:24] Anthropic last month, they talked about
[04:26] the need for an evaluator agent. This is
[04:29] also supposed to be a feature of Claude
[04:31] managed agents where Claude
[04:33] self-evaluates and iterates until it
[04:35] gets there. Again, that's locked away in
[04:37] the research preview. They also talked
[04:39] about how harnesses can never stay
[04:42] static. They need to reflect the
[04:43] capabilities of the model. And they've
[04:46] essentially spun that as a positive with
[04:48] this clawed managed agents product
[04:50] because you are essentially outsourcing
[04:51] the harness to Anthropic. And what
[04:53] they're saying is they will keep that
[04:55] harness aligned to the capabilities of
[04:57] future models. And as a result, they've
[04:59] described managed agents as a meta
[05:01] harness that's unopinionated about the
[05:04] specific harness that Claude will need
[05:05] in the future. So all of that is well
[05:07] and good, but in reality with this
[05:10] product, you're completely seeding
[05:12] control of your agents to Anthropic. And
[05:14] that may or may not be okay depending on
[05:16] your use case, your requirements, and
[05:19] what it is that you're actually
[05:20] building. I mentioned that this platform
[05:22] was met with some confusion by the
[05:24] public and I think that's because
[05:25] Anthropic are releasing new products and
[05:27] definitely new features on seemingly a
[05:30] daily basis at this point and there's
[05:32] such large overlap between the features
[05:34] in their portfolio. Cloud managed
[05:36] agents. For example, if we look at the
[05:38] header here, you can see that this is
[05:40] for running stateful sessions with
[05:42] claude in a fully hosted infrastructure.
[05:45] Whereas the standard messages API and
[05:47] the standard client SDK is all about
[05:50] calling claw directly and you run your
[05:52] own agent loop. We'll get into that
[05:54] later in the video when I talk through
[05:56] the full agent landscape and you can see
[05:57] where the different solutions fit into
[05:59] the different tiers. What's also
[06:01] interesting about this announcement is
[06:03] that this pits Anthropic against AWS and
[06:06] Google Cloud. So within Google Cloud,
[06:09] they have their Vert.ex AI agent
[06:10] builder, which is a set of services that
[06:13] enable devs to deploy, manage, and scale
[06:15] AI agents in production. So again, it's
[06:17] the infrastructure and provisioning of
[06:19] containers behind the scenes. And that's
[06:21] the same with Amazon Bedrock Agent Core,
[06:23] which was released last year to
[06:25] accelerate agents to production using
[06:27] composable services. So the brain and
[06:29] the hand separation isn't exactly new.
[06:31] It's now just framed a little bit
[06:33] differently. And with both Vertex and
[06:35] Amazon Bedrock, they work with any
[06:37] framework or any model. So you're not
[06:39] locked into Anthropic as you are with
[06:41] claude managed agents. And that brings
[06:42] me nicely to Langchain's deep agent
[06:45] deploy blog post, which is an open
[06:47] alternative to Anthropic's idea. And we
[06:50] can take this word open quite literally
[06:52] here. They didn't use the word open
[06:53] source, and I'll explain why in a
[06:55] second. If you're not aware of what deep
[06:57] agents are, it's essentially Langchain's
[06:59] fully open-source MIT licensed agent
[07:02] harness. It's a standalone library
[07:05] that's built on top of lang chain and
[07:06] langraph. And if you need to build
[07:08] agents that can handle longunning tasks
[07:10] or a complex multi-step workflows, ones
[07:13] that handle large amounts of context
[07:15] that need to execute code within a
[07:17] sandbox that have persistent stateful
[07:19] memory that require human in the loop
[07:21] style of processes, then deep agents is
[07:24] a framework well worth looking at. But
[07:25] as with all code-based AI agent
[07:27] frameworks, the question is how and
[07:29] where do you deploy it to and how do you
[07:31] scale it? And that's what deep agents
[07:33] deploy aims to solve. So to get to
[07:35] production you need to deploy both the
[07:37] agent orchestration logic and memory in
[07:40] a multi-tenant way. So that's the
[07:42] composable brain versus hands. You need
[07:44] to set up sandboxes so that you can
[07:46] actually carry out safe code execution.
[07:49] And then you obviously you need
[07:50] endpoints for tools MCPs etc. And this
[07:53] is where things start getting a little
[07:55] bit less open source and arguably less
[07:58] open. So to actually use deep agents
[08:00] deploy you need to bundle your deep
[08:02] agent with its own lang deployment
[08:04] server and lang is not open source. It's
[08:07] essentially a SAS platform that's run by
[08:09] Langchain. So this deployment will spin
[08:11] up a server with over 30 endpoints so
[08:14] that you can actually communicate in and
[08:16] out of your agent. It uses standard
[08:18] protocols A2A MCP and you can see their
[08:22] very own version of the brain versus the
[08:24] hands right here. What is required
[08:26] though when you're actually deploying
[08:27] agents is you need some sort of safe
[08:30] sandbox execution environment. So for
[08:33] cloud managed agents they handle the
[08:35] sandboxing on their own servers. For
[08:37] lang chain or lang in this case you
[08:40] would plug in different sandbox
[08:42] providers Daytona modal run loop or
[08:45] there's also a beta version on
[08:46] langsmith's own servers. But even though
[08:48] it isn't fully open source by deploying
[08:51] to Langsmith, there are genuine benefits
[08:53] to going the open- source route. It's
[08:56] model agnostic. You can choose whatever
[08:58] model you want. You have total control
[09:00] over the harness because you're
[09:01] deploying the harness. You can choose
[09:03] whatever sandbox provider you want. It
[09:05] also supports an agents.mmd file as well
[09:08] as supporting the industry standard
[09:10] communication protocols. But the real
[09:12] problem is that you need to have a paid
[09:14] plus plan or above which cost $39 per
[09:17] seat per month. And that's even if you
[09:19] want to actually self-host this or run
[09:21] it locally. You can see self-hosting is
[09:24] only included in the enterprise plan.
[09:26] And that seems to be the trend here
[09:27] where even companies like Langchain are
[09:29] trying to grab market share in this kind
[09:31] of ever evolving agent infrastructure
[09:33] space. But there is definitely irony in
[09:35] Langchain describing claude managed
[09:37] agents as a walled garden that creates
[09:39] an incredible amount of lockin. Whereas
[09:41] in reality, you can only really use deep
[09:43] agents deploy if you sign up to lang
[09:46] chain's very own SAS platform. And then
[09:48] yesterday we had an OpenAI announcement
[09:50] which they describe as the next
[09:52] evolution of the agents SDK. In an
[09:55] interview with the new stack, OpenAI
[09:57] Steve Coffee talked about how the
[09:58] original agent SDK was essentially built
[10:01] for chatbot use cases that might
[10:03] typically take five, six, seven steps in
[10:06] a workflow. Nothing like the types of
[10:08] long running loops and tool calls that
[10:10] you see in modern-day agents. And that's
[10:12] what this next evolution of the agents
[10:14] SDK is, where essentially there's a
[10:17] harness now baked into the library. It
[10:19] can inspect files, run commands, edit
[10:21] code, and work on long horizon tasks
[10:24] within controlled sandbox environments.
[10:27] And what's interesting is that OpenAI
[10:29] don't have an alternative to cloud
[10:31] managed agents. They don't offer a fully
[10:33] managed agent platform. Now, that might
[10:35] change in the coming weeks and months,
[10:37] but in this blog post, they talk about
[10:39] how managed agent APIs like clouds can
[10:43] constrain where agents run and how they
[10:45] access sensitive data. They talk about
[10:47] how model agnostic frameworks like
[10:49] langchain are flexible but they don't
[10:52] utilize fully the frontier models
[10:54] capabilities. So they're pointing to the
[10:56] different weaknesses of the competitor's
[10:58] approaches here while also positioning
[11:01] this new agents SDK as a more capable
[11:03] harness for the agent loop and it's very
[11:06] similar to Langchain's approach. So you
[11:08] have an agents MD file obviously tool
[11:11] use their skills they actually support
[11:13] the same types of native sandbox
[11:16] execution with providers like Daytona or
[11:19] E2B or modal and the separation of
[11:21] concerns that you saw in cloud manage
[11:23] agents is also supported here. So the
[11:25] likes of having a secrets fault that's
[11:27] separate from the harness separate from
[11:29] the sandbox. In terms of pricing,
[11:32] there's no additional costs here because
[11:33] you would just pay for the sandbox
[11:35] provider that you choose and you just
[11:37] pay the standard model fees. You don't
[11:39] necessarily need to choose OpenAI,
[11:41] although this is primed for OpenAI
[11:44] models, but everything is available on
[11:46] their GitHub repo. You can see in the
[11:48] releases, version 0.14
[11:50] covers sandbox agents and the clients
[11:53] and the memory and workspace mounts and
[11:56] everything that we just talked through
[11:57] here. As you can see, there's just so
[11:59] many approaches you can take when it
[12:00] comes to building your own AI agent
[12:03] system. We've only covered three here,
[12:05] but how do you actually choose the best
[12:06] one based off your requirements and your
[12:08] use case? What I've done is I've
[12:10] distilled down the hundreds of agent
[12:12] platforms and frameworks that are
[12:14] available into five separate tiers that
[12:17] can help shape how you think about this
[12:19] decision. And this is across what I
[12:21] describe as the build to buy spectrum.
[12:23] So on the left hand side here you have
[12:26] total control because you're using
[12:28] vanilla code whereas on the right hand
[12:30] side here it's maximum convenience
[12:33] because it's essentially configuring
[12:34] agents as opposed to coding them. And
[12:36] there are different axes to consider
[12:38] here. So with maximum control you have
[12:40] maximum flexibility but it's likely
[12:42] going to take you the longest. Whereas
[12:44] on the right hand side, by abstracting
[12:47] away all of the work to the agent
[12:49] providers and platforms, you have much
[12:51] faster time to market, but then you're
[12:53] totally locked into that vendor, and
[12:54] it's pretty hard to escape. A lot of
[12:56] what we cover in this section is
[12:58] available in our AI architects course in
[13:00] our community, the AI automators. This
[13:02] evolving course has over 40 lessons that
[13:05] covers everything from agentic retrieval
[13:07] to harness design. If you'd like to join
[13:09] hundreds of builders all creating
[13:11] production-grade AI systems, then this
[13:13] is the place to be. Link is in the
[13:15] description. The first tier on the
[13:17] spectrum is to custom code an AI agent
[13:20] solution and to tie into models using
[13:22] direct API calls. Things like the
[13:24] messages API from Anthropic, the Gemini
[13:27] API for Google, OpenAI's API platform.
[13:30] As you see here, you can make life a bit
[13:32] easier for yourself by tying into the
[13:34] provider language specific SDKs.
[13:37] Anthropic have a host of client SDKs for
[13:39] various languages. The same with Google,
[13:42] they have their Gen AI SDK. While with
[13:44] OpenAI, you have your standard Python or
[13:46] JavaScript libraries that you can
[13:47] import. With these approaches, you have
[13:49] access to the core capabilities of the
[13:52] models. So, you're looking at chat
[13:54] completions, streaming, function
[13:56] calling, multimodal, so it could be text
[13:58] to images or image to image. But
[14:01] essentially, you're running the full
[14:02] agent loop within your own custom code
[14:04] using these solutions. That changes then
[14:07] when you move up to tier two which are
[14:08] the agent frameworks. So here you have
[14:11] dedicated libraries and SDKs that
[14:13] actually handle the full agentic loop
[14:16] handle things like tool dispatches,
[14:18] handoffs, guard rails and multi- aent
[14:20] patterns. So up until now on anthropic
[14:23] we've only been looking at the messages
[14:24] API whereas for this you're now in the
[14:27] world of the clawed agent SDK which was
[14:29] previously the clawed code SDK. So this
[14:32] essentially replicates the harness that
[14:34] actually powers clawed code and it gives
[14:36] you access to the same tools, the agent
[14:38] loop and context management that powers
[14:40] that application. Again, available in
[14:42] Python or TypeScript for OpenAI. This is
[14:45] where the newer agents SDK fits in. So
[14:47] it's in tier 2 of our spectrum because
[14:50] all of these harness specific features
[14:52] like handling state, code execution,
[14:55] advanced tool calling, all of them
[14:57] operate within this agent SDK. So the
[15:00] actual agent loop happens within that
[15:02] library. However, you are still hosting
[15:04] the SDK. So it is still on your
[15:06] infrastructure. From a Google
[15:07] perspective, as opposed to the Gen AI
[15:10] SDK, they have their agent development
[15:12] kit that you can use. And this SDK,
[15:15] which is available in Python or
[15:16] TypeScript, Java, Go, offers all of the
[15:19] components that you would need to be
[15:20] able to build sophisticated multi-agent
[15:23] systems. Everything that we've already
[15:24] talked about. Both the agent SDK and
[15:27] OpenAI's version are open source. So
[15:29] they are model agnostic although they
[15:32] are somewhat tuned to each provider's
[15:34] models. Outside of the provider
[15:36] frameworks there are independent
[15:38] frameworks that you can also use. So
[15:40] langraph for example which has graph
[15:42] orchestration as well as offering the
[15:44] deep agents framework that we talked
[15:46] about earlier. This is built on
[15:47] langchain which is pretty well
[15:49] established in the area. Crew AI is
[15:51] another example. And it's interesting
[15:53] because Crew AI, which is a framework
[15:55] for orchestrating role-playing
[15:57] autonomous agents, they pride themselves
[16:00] on being completely written from scratch
[16:02] and completely independent of lankchain
[16:04] or other agent frameworks. And this is
[16:07] an issue. The further up these tiers we
[16:09] go, the more abstraction you actually
[16:11] end up with. And abstraction usually
[16:14] equates to bloat. And that's what crew
[16:16] AI are pointing to here. Whereas
[16:18] Pidantic AI have taken a completely
[16:20] different approach. They have created
[16:22] quite a lean framework that you can
[16:24] actually build upon. So if you are
[16:26] looking for the most control and
[16:27] flexibility, tier one vanilla code and
[16:30] the client SDKs or tier 2, the agent
[16:32] frameworks and agent SDKs are definitely
[16:35] the way to go. But with these
[16:36] approaches, you totally manage both the
[16:38] codebase and the infrastructure, which
[16:41] is then where we get into tier three.
[16:42] We're now into the world of managed
[16:44] platforms and infrastructure. And this
[16:46] is essentially production infrastructure
[16:48] that wraps around the agents. You have
[16:50] containers for sandboxes, tool
[16:52] execution, tracing permissions, etc. And
[16:55] that is essentially clouded managed
[16:57] agents in a nutshell. The Google Vertex
[16:59] AI agent builder is something similar as
[17:02] is Azure's foundry agent service. But
[17:04] with both of these, you're not locked
[17:06] into the specific models the way you are
[17:07] with Claude's managed agents. You then
[17:10] also have different open infrastructure
[17:12] or bring your own infrastructure the
[17:14] likes of deep agents deploy that we
[17:16] talked through using Langmith's
[17:18] deployment. There's AWS bedrock agent
[17:21] core and then you have the more specific
[17:24] providers like E2B or modal or Daytona
[17:27] which is essentially offering containers
[17:29] for sandbox code execution. So within
[17:31] this tier, you're starting to offload
[17:33] and delegate the responsibility for
[17:35] infrastructure and scaling. Whereas in
[17:37] the earlier tiers, you had to manage all
[17:39] of that yourself. But by offloading
[17:41] these responsibilities, you are losing
[17:44] flexibility in certain circumstances.
[17:46] Claude manage agents is a perfect
[17:47] example of that. Tier four I've
[17:49] described as visual lowode AI platforms
[17:52] because up until now we have been
[17:54] essentially codebased whereas we're now
[17:56] moving towards configurationbased. A lot
[17:58] of them are purpose-built AI platforms
[18:00] with visual interfaces to configure
[18:02] agents. N8 is a good example of that. So
[18:05] you can deliver upon pretty complex AI
[18:08] agent systems using N8N. Not as flexible
[18:11] as codebased ones, but you can still
[18:13] deliver some pretty interesting
[18:14] solutions. And there's lots of other
[18:16] examples like this. Relevance AI was
[18:19] one. Copilot Studio is quite a visual
[18:22] builder that you can then deliver to end
[18:24] users like Zapier have agents. Make.com
[18:27] has agents. Flow-Wise and Diffy are much
[18:30] more technical visual builders. With
[18:32] these, you lack the flexibility, but
[18:34] you're definitely getting into faster
[18:35] speed to market. And because these are
[18:38] platforms that are hosted and deployed
[18:40] themselves, you don't need to organize
[18:42] separate deployment for the agents. And
[18:44] finally, probably the most convenient
[18:46] way to deliver AI agent systems,
[18:48] particularly internally in a company, is
[18:50] through embedded SAS agents. And you'll
[18:53] have seen that most SAS applications now
[18:55] have some sort of agent offering the
[18:57] likes of Salesforce's agent force or
[19:00] intercom's fin
[19:03] at rovo. Gartner's research shows that
[19:06] 40% of enterprise apps will have
[19:08] taskspecific agents by 2026. And a lot
[19:11] of these agents are configurable based
[19:13] off your own particular requirements and
[19:15] use case. And it's worth calling out
[19:17] that not everything fits within this
[19:19] build to buy spectrum because there are
[19:21] other products that essentially are the
[19:23] agent. So up until now we've been
[19:25] talking about building custom agents
[19:27] that we can deploy to end customers as
[19:29] part of a kind of a software product or
[19:31] maybe it's internally to employees
[19:33] within a company and within those
[19:35] solutions you are building a product you
[19:37] are trying to abstract away the
[19:39] technical side of it. Whereas there are
[19:41] products that essentially are an agent
[19:44] called code is a perfect example that is
[19:46] a terminal agent and you can use all of
[19:48] the various features things like
[19:50] routines dispatching the desktop app the
[19:54] mobile app having containers spun up in
[19:56] the cloud that can create pull requests
[19:59] on your GitHub repos essentially the
[20:01] entire harness you can use that as your
[20:03] own personal system openclaw is another
[20:05] good example of that that's your
[20:07] autonomous agent that you communicate
[20:08] with on telegram and it basically just
[20:10] wakes up every minute and does what you
[20:12] need. So these are all essentially agent
[20:14] products that you would use as opposed
[20:16] to building upon like what we've been
[20:18] talking about to date. So the question
[20:20] is if you are looking to build an AI
[20:22] agent system, how do you know which tier
[20:24] to go in on? What platforms or
[20:26] frameworks to choose? And in reality,
[20:29] architecting systems is all about
[20:31] trade-offs. And understanding the full
[20:33] endto-end spectrum should give you the
[20:34] vocabulary you need to actually navigate
[20:37] those. If you need full control, you're
[20:39] better off building something from
[20:41] scratch or using some native SDKs. If
[20:43] you're looking at very fast time to
[20:45] market, then you're probably looking at
[20:46] tiers three to five. If you want the
[20:48] ability to choose between different
[20:50] models and different providers, then you
[20:52] need a model agnostic framework. If you
[20:54] have very specific compliance and
[20:56] privacy requirements, you definitely
[20:57] need to look at a self-hosted option or
[21:00] one with a very strong data protection
[21:01] agreement. So, there is no right or
[21:03] wrong answer. It all depends on your
[21:05] particular scenario. If you'd like to
[21:06] learn more about creating specialized
[21:08] agent harnesses, then definitely check
[21:10] out this video here where I go through
[21:12] it in detail.
