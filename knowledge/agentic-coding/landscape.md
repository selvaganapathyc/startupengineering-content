---
title: The Agentic Coding Landscape
tags: [agentic-coding, tools, ai, developer-tools]
summary: A map of today's code generation and agentic coding tools — what they are, how they differ, and where each fits.
---

# The Agentic Coding Landscape

"Agentic coding" has quickly fractured into several categories. Before picking a tool, it helps to know what *kind* of tool it is. The space roughly splits along two axes: **where the agent runs** (IDE, terminal, cloud, browser) and **how much autonomy it has** (autocomplete → pair programmer → autonomous agent).

## Categories

### 1. Inline completions (autocomplete successors)
Predict the next few lines as you type. Low autonomy, high frequency.

- **GitHub Copilot** — the original, tightly integrated with VS Code and JetBrains.
- **Cursor Tab** — Cursor's in-house completion model, notable for multi-line and multi-file edits.
- **Codeium / Windsurf completions** — free tier, broad IDE support.
- **Supermaven** — known for long-context, low-latency completions.
- **Tabnine** — earlier entrant, now enterprise-focused.

### 2. Chat-in-IDE / AI-native editors
A chat panel or inline prompt that edits files in your editor. Medium autonomy — human approves each change.

- **Cursor** — VS Code fork, currently the dominant AI-native IDE.
- **Windsurf (Codeium)** — Cursor's closest competitor, "Cascade" agent mode.
- **Zed AI** — Zed editor's native assistant.
- **GitHub Copilot Chat / Copilot Workspace** — Microsoft's answer, now including agent mode.
- **JetBrains AI Assistant** — bundled across the JetBrains suite.
- **Continue.dev** — open-source, bring-your-own-model.

### 3. Terminal / CLI agents
Run in your shell, read and write your repo, execute commands. High autonomy when you let them.

- **Claude Code** (Anthropic) — terminal-native agent with strong tool use and planning.
- **Codex CLI** (OpenAI) — OpenAI's terminal agent.
- **Gemini CLI** (Google) — Google's counterpart.
- **Aider** — open-source, pioneered repo-aware terminal coding.
- **OpenHands** (formerly OpenDevin) — open-source autonomous dev agent.
- **Goose** (Block) — open-source, extensible via MCP.

### 4. Cloud / async agents
You hand off a task; the agent works in a sandboxed environment and returns a PR. Highest autonomy.

- **Devin** (Cognition) — the original "AI software engineer" pitch.
- **GitHub Copilot Coding Agent** — assign a GitHub issue, get a PR.
- **Codex** (OpenAI, cloud) — parallel cloud tasks.
- **Jules** (Google) — async coding agent tied to GitHub.
- **Claude Managed Agents** — Anthropic's hosted agent runtime.
- **Factory** — multi-agent "droids" for larger engineering workflows.
- **Cosine (Genie)**, **Sweep**, **SWE-agent** — issue-to-PR agents, research-adjacent.

### 5. App builders / prompt-to-product
Natural language in, deployable app out. Target non-engineers and rapid prototyping.

- **v0** (Vercel) — UI-first, React/Next.js output.
- **Bolt.new** (StackBlitz) — full-stack in-browser.
- **Lovable** — prompt-to-product with GitHub sync.
- **Replit Agent** — builds and deploys inside Replit.
- **Create.xyz**, **Tempo**, **Softgen** — similar niche, varying polish.

### 6. Specialized / adjacent
- **Code review agents**: CodeRabbit, Greptile, Ellipsis, Qodo (formerly Codium).
- **Test generation**: Qodo, Meticulous, Codium AI.
- **Refactor / migration**: Grit, Codemod, Moderne.
- **Docs & codebase Q&A**: Sourcegraph Cody, Bloop, Unblocked.

## How to choose

Think about autonomy tolerance and loop length:

| You want... | Use |
|---|---|
| Type faster, zero context switch | Inline completion (Copilot, Cursor Tab, Supermaven) |
| Edit across files with approval | AI-native IDE (Cursor, Windsurf) |
| Full shell access, run tests, debug | Terminal agent (Claude Code, Aider) |
| Hand off a ticket, review a PR | Cloud agent (Devin, Copilot Coding Agent, Jules) |
| Ship a prototype from a prompt | App builder (v0, Bolt, Lovable) |

## Trends worth tracking

- **Convergence on MCP** (Model Context Protocol) as the standard way agents plug into tools and data. Claude Code, Cursor, Goose, Windsurf, and others support it.
- **Subagents and orchestration** — tools increasingly expose a way to spawn task-specific subagents (Claude Code, Factory, OpenHands).
- **IDE → terminal → cloud** pipeline: the same company often ships all three tiers (OpenAI, Google, Anthropic, GitHub).
- **Background agents** inside IDEs (Cursor, Windsurf) blur the line between sync and async.
- **Evaluation is immature.** SWE-bench and Terminal-Bench help, but real-world reliability still varies wildly by codebase.

## Related
- [`../../skills/`](../../skills) — skills for working with these tools effectively.
- [`../../case-studies/`](../../case-studies) — teardowns of teams adopting agentic coding.
