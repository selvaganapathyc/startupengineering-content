---
title: Model Context Protocol (MCP)
tags: [agentic-coding, mcp, anthropic, protocols, integrations, tools]
summary: A high-level overview of MCP — the open protocol that lets AI agents plug into tools, data, and services in a standard way.
---

# Model Context Protocol (MCP)

**MCP** is an open protocol that defines how AI agents talk to external tools, data sources, and services. Think of it as **USB-C for agents**: one standard plug, many devices.

Anthropic released it in late 2024. It has since been adopted by Claude Code, Cursor, Windsurf, Goose, Zed, OpenAI's agents, and a fast-growing list of others. It's quietly becoming the default way agents extend their reach.

## The problem it solves

Before MCP, every agent integration was bespoke:

- Claude needed its own way to talk to GitHub.
- Cursor built its own GitHub integration.
- Your internal tool? Each agent had to be wired up separately, in a different shape.

The result: tool builders wrote N integrations for N agents, agent builders re-implemented the same connectors over and over, and end users got fragmented experiences.

MCP is the **shared interface**: build the integration once, every MCP-compatible agent can use it.

## The mental model

There are three roles:

1. **Host** — the user-facing app (Claude Code, Cursor, Claude desktop).
2. **Client** — a connector inside the host that speaks MCP.
3. **Server** — a process that exposes tools, resources, or prompts via MCP.

A host can connect to many servers simultaneously. Each server exposes some combination of:

- **Tools** — functions the agent can call (e.g., `query_database`, `create_issue`).
- **Resources** — data the agent can read (e.g., a file, a record, a URL).
- **Prompts** — reusable prompt templates.

The agent decides what to call. The server decides what's available and what to actually do.

## How it works (technically)

- **Transport**: typically stdio (local process) or HTTP/SSE (remote server). A newer "streamable HTTP" transport is becoming standard for hosted servers.
- **Protocol**: JSON-RPC 2.0.
- **Discovery**: the host asks the server "what do you offer?" — server returns its tools/resources/prompts with schemas.
- **Invocation**: agent calls a tool with structured args; server returns structured results.

Servers can run anywhere: your laptop, a Docker container, a hosted SaaS endpoint. Local servers are usually launched on demand by the host; remote ones live behind a URL.

## What you can do with it

A few illustrative examples:

- **Database access** — point an agent at a Postgres MCP server; ask it to query, schema-explore, or generate migrations against your real data.
- **Code intelligence** — Sourcegraph, GitHub, GitLab MCP servers let agents search issues, PRs, and code across repos.
- **Internal APIs** — wrap your company's internal services as MCP tools so any agent can use them safely.
- **Design / docs** — Figma, Notion, Linear, Confluence MCP servers bring product context into coding sessions.
- **Browsers** — Playwright MCP lets agents drive a real browser to test or scrape.
- **Filesystems & shells** — sandboxed access to specific paths or commands.

The pattern: anything with an API can become an MCP server in a few hundred lines of code.

## Why it's a big deal for startups

### Build once, work everywhere
Expose your product via MCP and every agent — Claude Code, Cursor, Goose, others — can use it. You're not betting on a single AI vendor.

### Agentic surface for your own product
If you ship developer-facing software, an MCP server is the new "we have an SDK." Agents are the new clients.

### Internal leverage
Your team's agents can hit your internal docs, dashboards, and databases without anyone writing custom plumbing per tool.

### Composability
Multiple servers can be active at once. Your agent can fluidly combine "query our prod database" + "search Linear" + "open a PR" in a single task.

## Trust and security

MCP is powerful precisely because it gives agents real capabilities. That cuts both ways.

- **Permissions matter.** Hosts like Claude Code ask before invoking risky tools. Don't auto-approve everything.
- **Server boundaries matter.** A misconfigured filesystem server can expose more than you intended.
- **Auth is per-server.** OAuth flows for hosted MCP servers are still maturing — expect this area to evolve.
- **Treat MCP servers like dependencies.** Audit what you install, especially community ones.

## Building your own server

Anthropic ships SDKs in TypeScript, Python, and others. The minimum viable server is:

1. Define the tools you want to expose (name, description, JSON schema for args).
2. Implement a handler for each.
3. Run the server (stdio or HTTP).
4. Register it in your host's MCP config.

For a startup product, the pattern is: take your existing API, wrap each useful operation as an MCP tool, ship the server. Now every agentic IDE can drive your product.

## Where it's heading

- **Hosted, OAuth-secured MCP servers** are becoming the norm — no more local-process-only assumptions.
- **MCP marketplaces and registries** (Anthropic, Smithery, Glama, others) are emerging — discover servers like packages.
- **Cross-vendor adoption** is accelerating: even non-Anthropic agents (OpenAI, Google) are landing MCP support.
- **Agent-to-agent** patterns built on MCP are next — agents exposing their own capabilities to other agents.

## Related
- [Landscape](./landscape.md) — where MCP fits in the broader agentic coding ecosystem.
- [Claude Code](./claude-code.md) — first-class MCP host.
