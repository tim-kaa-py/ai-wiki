---
title: "MCP vs API"
type: "comparison"
description: "How MCP standardizes AI-agent integration versus general-purpose APIs — shared client-server roots, MCP's dynamic discovery and uniform interface, and why the two are layers not rivals."
pillar: "building"
tags: [mcp, api, agents, architecture, tool-design-for-agents]
sources:
  - "summaries/2025-05-05_ibm-technology_mcp-vs-api-ai-agent-integration.md"
timestamp: "2026-07-12"
---

# MCP vs API

A foundational comparison of the **Model Context Protocol (MCP)** and general-purpose **APIs** as ways to connect LLM applications — especially agents — to external data and tools. The headline: they are not competitors. MCP is a purpose-built layer that typically sits *on top of* APIs, giving agents a uniform, discoverable interface. (Framing from IBM Technology, May 2025.)

## The USB-C Analogy

MCP is "a USB-C port for your AI applications." Just as any peripheral — monitor, external drive, power supply — works through one common USB-C standard regardless of manufacturer, any external service works through one common MCP standard regardless of who built it. Before USB-C, every device needed its own connector; before MCP, every AI-to-service integration needed its own bespoke wiring.

MCP is an open standard introduced by **Anthropic in late 2024** to standardize two things agentic applications repeatedly need:

1. **Contextual data** — documents, knowledge-base entries, database records the model reads.
2. **Tools** — web search, external service calls, calculations the model invokes.

## MCP Architecture

MCP is a client-server protocol with three roles:

- **Host** — the application the user runs (the laptop in the USB-C analogy). It runs one or more MCP clients.
- **Client** — each client opens a **JSON-RPC 2.0 session** and connects to exactly one MCP server.
- **Server** — exposes capabilities and executes the underlying function when a tool is invoked. Typically one server per system: one for a database, one for a code repo, one for email.

In the analogy: laptop = host, the USB-C connection = the MCP protocol, the peripherals = MCP servers.

### The Three Primitives

An MCP server can expose up to three kinds of capability. Not every server implements all three — many currently focus on tools only.

1. **Tools** — discrete actions the model can call (e.g. `get_weather`, `create_event`). The server advertises each tool's name, description, and input/output schema; when invoked, the server executes the underlying function.
2. **Resources** — read-only data items the server provides on demand (text files, a database schema, file contents).
3. **Prompt templates** — predefined templates offering suggested prompts.

### Dynamic Discovery

An agent can query a server **at runtime** to learn what it offers, because every server publishes a machine-readable catalog:

```
tools/list        # discover available tools
resources/list    # discover available read-only data items
prompts/list      # discover available prompt templates
tools/call        # invoke a tool; server executes the underlying function
```

This lets agents pick up new functionality **without redeploying code** — the agent adapts to whatever is available each time it connects. This is MCP's strongest structural advantage over REST.

## What an API Is

An **API (Application Programming Interface)** is a defined set of rules describing how one system requests information or services from another, so developers integrate external capabilities instead of building from scratch (e.g. an e-commerce site calling a payment API). It is an **abstraction layer**: the client only needs to know how to format requests and parse responses; the server's internals stay hidden.

A **REST API** is the ubiquitous "web default" API style. It communicates over **HTTP** using standard methods — **GET** (retrieve), **POST** (create), **PUT** (update), **DELETE** (remove) — hitting **endpoints** and returning **JSON**:

```
GET  /books/123   # fetch book #123's details
POST /loans       # borrow a book (create a loan)
```

Many commercial LLMs are themselves served over REST: send a JSON prompt, get a JSON completion.

## Similarities

Both MCP and APIs are **client-server abstraction layers** that simplify integration:

- A REST client sends an HTTP `GET`/`POST` and gets a response; an MCP client sends `tools/call` and gets a response.
- Both hide low-level internals behind a stable interface.
- Both let a consumer integrate a capability without reimplementing it.

Naming this shared foundation first is what signals you see the layered relationship rather than a false rivalry.

## Differences

| Axis | MCP | REST API |
|------|-----|----------|
| **Purpose** | Purpose-built for LLMs/agents — bakes in context provisioning and tool-invocation patterns aligned with how agents operate | General-purpose — designed for arbitrary machine/human consumers, not with LLMs in mind |
| **Discovery** | Dynamic, runtime, agent-consumable, and *mandatory* in the protocol (`tools/list` etc.) — capability-awareness shifts to run-time | Static endpoints; when they change, a developer updates the client at build-time |
| **Interface** | Standardized — every server speaks the same protocol: "build once, integrate many" | Each API is unique (endpoints, parameter formats, auth schemes vary): *N* APIs need *N* adapters |

**A precision note on discovery.** The creator frames runtime discovery as absent from REST, which slightly overstates the contrast — some REST ecosystems do expose machine-readable descriptions (OpenAPI/Swagger, HATEOAS). The cleaner distinction: MCP makes runtime, agent-consumable discovery a *mandatory, uniform* part of the protocol, whereas in REST it is optional, non-standardized, and usually consumed by a developer at build-time rather than by the client at run-time.

## Layers, Not Adversaries

The core thesis: **MCP and APIs are layers, not competitors.** MCP sits on top of APIs to provide an AI-friendly, uniformly-discoverable interface — it does not replace them.

The kicker is that **MCP servers are frequently thin wrappers around existing REST APIs.** The GitHub MCP server exposes a high-level tool like `repository/list` as an MCP primitive, then internally translates each call into the corresponding GitHub REST request. Adopting MCP does *not* mean discarding your APIs; you often build an MCP server *on top of* the API you already have.

One precision worth holding: "MCP servers wrap REST under the hood" is compatible with — but distinct from — the separate anti-pattern of a **mechanical 1:1 REST-to-MCP conversion**. Wrapping a REST call inside a well-designed, high-level, agent-shaped tool (like `repository/list`) is the sanctioned pattern. Mechanically exposing every REST endpoint as its own tool, with no MCP-unique semantics, is the anti-pattern — see [Tool Design for Agents § Design for an Agent, Not a 1:1 REST Conversion](../concepts/tool-design-for-agents.md#design-for-an-agent-not-a-11-rest-conversion).

## Related Pages

- [MCP (Model Context Protocol)](../concepts/mcp.md) — the protocol in depth: advanced tool use, code execution, the 2026 roadmap.
- [MCP vs CLI](./mcp-vs-cli.md) — the sibling comparison: MCP tools vs a shell/CLI for agent tool access.
- [Tool Design for Agents](../concepts/tool-design-for-agents.md) — how to design the tools an MCP server exposes, including why 1:1 REST conversion is an anti-pattern.
