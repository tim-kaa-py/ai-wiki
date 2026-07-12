---
title: "MCP vs API: Simplifying AI Agent Integration with External Data"
type: "youtube"
channel: "IBM Technology"
date: "2025-05-05"
resource: "https://www.youtube.com/watch?v=7j1t3UZA1TY"
pillar: "building"
tags: [mcp, api, agents, architecture, tool-design-for-agents]
timestamp: "2026-07-12"
extraction_method: "manual-captions"
video_id: "7j1t3UZA1TY"
duration: "13:10"
---

[00:00] For large language models to be truly useful, they often need to interact with external data sources and services and tools.
[00:07] And until recently, that was typically done with application programming interfaces or APIs.
[00:14] Now, in late 2024, Anthropic introduced a new open standard protocol, that's model context protocol or MCP.
[00:27] And it has already made quite the splash and it standardizes how applications provide context to LLMs.
[00:35] So let's define these two terms MCP and API and take a look at their similarities and differences.
[00:44] Now a good metaphor for MCP is that it's kind of like a USB-C port for your AI applications
[00:49] and that's because it standardize its connections between AI applications, LLM's
[00:54] and external data sources. So, if you think about
[00:58] Just your standard laptop that you might be using.
[01:03] Well, that probably has a set of USB-C ports attached to it.
[01:09] That's a really old one.
[01:11] And in those ports, well, you can plug in all sorts of
[01:16] cables and they will use the USB-c standard to interface with all sorts peripherals.
[01:22] So perhaps you've plugged one of these things into a monitor.
[01:26] Another one is connected to an external disk drive and perhaps you've also added in a power supply for the third one.
[01:34] It really doesn't matter who makes the peripherals, they all work together using this common standard.
[01:41] Well, MCP is kind of like that.
[01:44] So if we take a look at really what's in it, there is an MCP host and that also runs a number of MCP clients.
[01:56] Now, each client opens a JSON RPC 2.0 session using
[02:01] the protocol that comes with MCP, so the MCP protocol, and that connects to external MCP servers.
[02:13] So we have a client-server relationship here.
[02:17] Now, servers, those expose capabilities.
[02:20] So perhaps we've got a server for access to a database,
[02:25] maybe we've got another one which gives us access to a code repository.
[02:29] And then maybe we have another server that gives us to an email server.
[02:36] So if we go back to the USB-C analogy, we can think of the laptop as being kind of like the MCP host.
[02:44] The MCB protocol,
[02:46] this is really what's signified by the USB C connection.
[02:51] And then the drive and the monitor and the power supply.
[02:54] We can think of those really as MCP servers.
[02:59] Okay, so that's the architecture, but what are the capabilities of MCP?
[03:04] Well, it addresses two main needs of LLM applications.
[03:08] And when I say LLMs applications, I particularly mean AI agents.
[03:15] And those two needs, one is to provide context in the
[03:20] form of contextual data And the other is to enable tools and the usage of tools by these AI agents.
[03:30] So it provides a standard way for an AI agent to retrieve external context,
[03:35] which means things like documents and knowledge base entries and database records that sort of thing,
[03:40] and it can also execute actions or tools like maybe run a web search or call an external service or perform some calculations.
[03:49] Now that's all done through this MPC server that I mentioned and that advertises a bunch of primitives.
[04:01] So let's take a look at three of them.
[04:04] Now one of the primitives is called tools and tools are discrete actions or functions the AI can call.
[04:13] So a weather service that might expose a get weather tool or a calendar service that may expose a create event tool.
[04:21] Now the server name advertises each tools name,
[04:24] It's description, the input and output schema in its capabilities listing as well.
[04:29] Now when an LLM uses an MCP client to invoke a tool, the MCP server executes the underlying function.
[04:37] So that's tools.
[04:39] Now another primitive is resources.
[04:43] And resources are read only data items or documents the server can provide.
[04:49] Which the client can then retrieve on demand, so text files, database schema, file contents, that sort of thing.
[04:55] And then we also have as an additional primitive prompt templates,
[05:01] and those are predefined templates providing suggested prompts.
[05:06] Now, not every MCP server will use all three primitives.
[05:11] In fact, many just focus on tools currently,
[05:15] but the important thing to understand here,
[05:17] is an AI agent can query an MCP server at runtime
[05:21] to discover what primitives are available and then invoke those capabilities in a uniform way.
[05:28] Because every MCP's server publishes a machine readable catalog,
[05:32] so tools/list and resources/list and prompts/list,
[05:37] agents can discover and then use new functionality without redeploying code.
[05:44] OK, so that's MCPs.
[05:45] What about APIs?
[05:46] Well APIs are another way of letting one system access another system's functionality or data.
[05:52] An application programming interface is to find a set of rules or protocols describing how to request information or services.
[05:59] And by using APIs, developers can integrate capabilities from external systems instead of building everything from scratch.
[06:06] So an e-commerce site can use a payment API to process credit card payments, for example.
[06:12] Now the API acts as an abstraction layer.
[06:14] So we have the requesting application, the client,
[06:19] well that doesn't need to know the internal details of the service that it wants to invoke, the server.
[06:27] It's all kind of abstracted away from it,
[06:30] because the server processes the request and the only thing we need to know is how to format the requests
[06:35] and understand the responses using the API.
[06:40] That's really all there is to it.
[06:42] Now there are a lot of different API styles but One of the most ubiquitous is the RESTful API style.
[06:52] You can kind of think of that as really the, essentially the web default API.
[06:57] And a RESTFUL API communicates over HTTP.
[07:01] So this call here is an HTTP call with RESTfUL API where clients interact using standard HTTP methods.
[07:10] So they might use GET, for example, to retrieve data.
[07:14] They might use.
[07:15] Post to create data, put to update data, and delete to remove data.
[07:24] So for example, a REST API for a library system might have an endpoint that looks something like get, and then we say /books,
[07:33] /123 if we want to fetch book number one, two, threes, details.
[07:40] Or we might use a post and say post slash loans.
[07:45] If we want to borrow a book.
[07:47] Each such endpoint returns data, often in a JSON format, representing the result.
[07:54] And in fact, many commercial large language models are offered over REST.
[08:00] Send a JSON prompt, get a JSON completion back.
[08:05] AI agents might also use REST APIs to perform a web search or interact with a company's internal REST services.
[08:12] So, MCP and APIs, they share...
[08:15] Many similarities, not least that they are both considered client-server model architectures.
[08:25] So in a REST API, a client sends an HTTP request like those gets or posts
[08:30] I just mentioned to a server, and then the server returns a response in MCP.
[08:35] The MCP client sends the request like tools slash call to an MCP server and receives a response.
[08:41] So they really both offer layer of abstraction so that one system doesn't need to know the low level details of another's internals.
[08:53] The implementation details there, they're hidden.
[08:55] The client just follows the interface.
[08:58] So both MCP and APIs, they really help to simplify things,
[09:04] specifically simplifying integration, letting developers wire systems together instead of reinventing wheels.
[09:12] But MCP and APIs have some fundamental differences too.
[09:19] And let's start with purpose built,
[09:22] which we can really consider as MCP's kind of area,
[09:28] versus general purpose, which we could really think of as being more of API's domain.
[09:35] So the model context protocol, it was explicitly designed to integrate LLM applications
[09:41] with external data and tools.
[09:43] It standardizes patterns like providing context data and invoking tools in ways that align with how AI agents operate.
[09:52] But APIs on the other hand, they weren't created specifically with AI or LLMs in mind
[09:57] and that means that MCP bakes in certain assumptions that are useful for AI.
[10:03] Now that includes one of MCP's strongest advantages and that is the fact that it supports dynamic discovery.
[10:13] So what do I mean by that?
[10:15] Well, an MCP client can just simply ask an MCPserver, hey, what can you do?
[10:20] And it will get back a description of all available functions and data that server offers.
[10:27] Now the client or the LLM application using it can then adapt to whatever happens to be available.
[10:34] Traditional REST APIs, they don't typically expose an equivalent runtime discovery mechanism
[10:38] and if the API changes, new endpoints are added the client needs to be updated by a developer.
[10:44] MCP is kind of flipping this model because the AI agents
[10:48] can retrieve the latest capabilities list from a server each time it connects and then it can pick up new features automatically.
[10:55] Now another big difference relates to standardization as well,
[10:59] specifically standardization of interface,
[11:03] and the difference here is that every MCP server
[11:07] regardless of what service or what data it connects to
[11:11] speaks the same protocol and follows the same patterns, whereas each API is unique.
[11:17] The specific endpoints and the parameter formats and the authentication schemes, they vary between services.
[11:24] So if an AI agent wants to use five different REST APIs,
[11:27] it might need five different adapters, whereas five MCP servers respond to the exact same calls.
[11:34] Build once, integrate many.
[11:37] Okay, so similar, but different,
[11:40] but here's the kicker.
[11:42] When it comes to MCP, many MCP servers,
[11:48] when we actually look at their implementation, they actually use traditional APIs to do their work.
[11:55] In many cases, an MCP server is essentially a wrapper around an existing API,
[12:03] translating between the MCP format and then the underlying services native interface by using that API,
[12:13] like the mcp github server, which exposes high level tools such as repository/list as mcb primitives,
[12:22] but then it internally translates each tool call into the corresponding githubs rest api request.
[12:28] So MCP and apis are not adversaries they're layers, they're layers in an AI stack.
[12:35] MCP might use APIs under the hood while providing a more AI friendly interface on top.
[12:42] And today you can find MCP service for file systems, Google Maps,
[12:46] Docker, Spotify, and a growing list of enterprise data sources.
[12:51] And thanks to MCP, those services can now be better integrated into AI agents in a standardized way.
