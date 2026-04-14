---
title: Claude Code
tags: [agentic-coding, claude-code, anthropic, terminal-agents, tools]
summary: A high-level overview of Claude Code — what it is, how it works, where it fits, and why it matters for startup engineers.
---

# Claude Code

Claude Code is Anthropic's official agentic coding tool. It runs in your terminal, reads and writes files in your repo, executes shell commands, and uses Claude's reasoning to complete multi-step engineering tasks — from "fix this bug" to "implement this feature across ten files."

It's not autocomplete and it's not a chatbot. It's an *agent* that takes actions in your environment, with you in the loop.

## What it is

- A CLI — `claude` — you run inside any project directory.
- Talks to Claude (Opus, Sonnet, Haiku) with a tool-use loop: read files, edit files, run commands, search, fetch the web, and more.
- Ships with a terminal UI (TUI) for interactive sessions, plus non-interactive modes for scripting and CI.
- Also available as a **desktop app**, **web app** (claude.ai/code), and **IDE extensions** (VS Code, JetBrains). All share the same underlying agent.

## How it works (mental model)

1. You give it a task in natural language.
2. Claude **plans** — sometimes explicitly, often implicitly.
3. It **acts** via tools: `Read`, `Edit`, `Write`, `Grep`, `Glob`, `Bash`, web fetch, MCP tools, subagents.
4. It **observes** the result, reasons about it, and iterates.
5. It reports back — and for risky actions (destructive commands, external effects), pauses for your approval.

The loop is the product. Everything else is scaffolding that makes the loop faster, safer, and more context-aware.

## What makes it distinctive

### Terminal-native, repo-aware
Runs where engineers already live. Uses your shell, your git, your tools. No IDE lock-in.

### Permission modes
You control the blast radius: from "ask me before every tool call" to "run freely, I trust you." Good defaults for different risk profiles.

### Subagents
Spawn specialized agents (code review, search, planning) that run in parallel or isolation. Keeps the main context clean and lets you decompose big tasks.

### MCP (Model Context Protocol)
First-class support for plugging in external tools — databases, APIs, internal services, design tools. Your agent becomes exactly as capable as the tools you give it.

### Skills and slash commands
Reusable prompts and workflows (`/commit`, `/review-pr`, custom skills). Knowledge the team builds up lives alongside the code.

### Hooks
Run shell commands in response to events (before tool calls, on prompt submit, on session start). This is how you wire in linters, formatters, policies, or custom telemetry.

### Memory
File-based, persistent memory across sessions. The agent remembers who you are, how you like to work, and project-specific context — without bloating every prompt.

### CLAUDE.md
Repo-level instructions the agent auto-reads on startup. Conventions, architecture notes, don't-do lists. This is where team knowledge compounds.

## Where it fits

- **Inside an IDE**: feels like Cursor/Windsurf — edit files with approval.
- **In a terminal**: shine-case for multi-step tasks, test loops, debugging sessions.
- **Headless / CI**: run Claude Code non-interactively to automate code review, docs generation, or refactors.
- **As a backend for other agents**: the Claude Agent SDK lets you build your own agent using the same primitives.

## Why it matters for startup engineers

Startups run on leverage. Claude Code is leverage.

- **Faster from idea to running code.** Describe the prototype, get the prototype. Iterate on what's actually there, not on imagined APIs.
- **Fewer context switches.** Research, plan, edit, run tests, commit — all in one loop.
- **Onboarding superpower.** A new engineer can ask "how does auth work here?" and get a real answer from a real agent reading the real code.
- **Maintenance at small-team scale.** Dependency upgrades, refactors, test backfills — tasks that usually don't happen at a 3-person startup — become tractable.
- **The repo becomes the interface.** Write good `CLAUDE.md`, good READMEs, good frontmatter — and every future agent (yours, a teammate's, a subscriber's) benefits.

This last point is why this site exists. A clean, structured content repo *is* the agent interface.

## When to reach for it vs. alternatives

| Situation | Best fit |
|---|---|
| Multi-file change, needs shell access | **Claude Code** |
| Quick autocomplete while typing | Cursor Tab / Copilot |
| Async "assign me a ticket" | GitHub Copilot coding agent, Devin |
| Prompt-to-app prototype | v0, Bolt, Lovable |
| Locally hosted / OSS preference | Aider, OpenHands |

No tool wins every row. Claude Code's sweet spot is **non-trivial engineering work where the agent needs real repo access and real execution**.

## Things to know before going deep

- **Context isn't free.** Bigger repos need good `CLAUDE.md` and selective reading. The agent can't read everything.
- **Review its actions.** Auto-approval modes are powerful and dangerous. Use them where blast radius is low.
- **Write for the agent.** Clear READMEs, frontmatter, and conventions compound — the agent becomes dramatically more useful in repos that are legible.
- **Lean on subagents.** For big tasks, a "Plan" or "Explore" subagent protects the main context window.

## Related
- [Landscape](./landscape.md) — how Claude Code fits into the broader agentic coding ecosystem.
