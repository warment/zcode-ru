##### Get Started

- [Welcome to the New ZCode](https://zcode.z.ai/en/newdocs/welcome)
- [Install](https://zcode.z.ai/en/newdocs/install)
- [API Key Setup](https://zcode.z.ai/en/newdocs/configuration)
- [Feedback & Support](https://zcode.z.ai/en/newdocs/feedback)

##### Core Features

- [ZCode Agent](https://zcode.z.ai/en/newdocs/agents)
- [Goal Mode](https://zcode.z.ai/en/newdocs/goal)
- [Remote Control](https://zcode.z.ai/en/newdocs/remote-control)
- [Task & File Management](https://zcode.z.ai/en/newdocs/task-management)
- [Bot Channel](https://zcode.z.ai/en/newdocs/bot-channel)
- [Edit History](https://zcode.z.ai/en/newdocs/edit-history)
- [Command](https://zcode.z.ai/en/newdocs/commands)
- [Plugin](https://zcode.z.ai/en/newdocs/plugin)
- [MCP Servers](https://zcode.z.ai/en/newdocs/mcp-services)
- [Subagents](https://zcode.z.ai/en/newdocs/subagents)
- [Skill](https://zcode.z.ai/en/newdocs/skill)
- [Usage Stats](https://zcode.z.ai/en/newdocs/usage-stats)

##### Integration

- [Safety Confirmation](https://zcode.z.ai/en/newdocs/safety-confirm)
- [ADE Tools](https://zcode.z.ai/en/newdocs/ADE-tools)

##### Support

- [Keyboard Shortcuts](https://zcode.z.ai/en/newdocs/keyboard-shortcuts)
- [FAQ (Q&A)](https://zcode.z.ai/en/newdocs/qa)

[View legacy docs →](https://zcode.z.ai/en/docs/legacy)

SupportCopy page

# FAQ (Q&A)

This page summarizes answers to common questions about ZCode, including product positioning, pricing, and technical issues you may encounter during use.

* * *

### 1\. What is ZCode’s product positioning?

ZCode is a new **Agentic Development Environment (ADE)**. Unlike a traditional IDE that centers manual coding, ZCode puts AI Agents at the center of the workflow. You describe the task in natural language, and the Agent can drive the full loop from coding and debugging to preview and iteration.

- **ADE platform**: centers on the first-party ZCode Agent, with built-in file management, terminal, Git commit, and live browser preview
- **Full-context awareness**: Agents can understand project structure, file content, and UI visuals without requiring you to memorize complex command-line flags
- **Current focus**: strengthening long-task execution and stability around the self-developed ZCode Agent, connecting workspace context, tools, models, permissions, and Review into one continuous development flow

* * *

### 2\. Is ZCode free?

**The ZCode application itself is completely free.** As a developer, you still need your own API key or subscription for AI services. Current supported options include:

- **Zhipu family**: GLM Coding Plan, BigModel resource packages or account balance, and Z.AI
- **Model services**: model plans and services connected for ZCode Agent
- **Enterprise channels**: team-managed model channels for ZCode Agent
- **Self-hosted services**: private model services approved by your team

* * *

### 3\. My terminal already has a GLM API configured. Do I still need to configure it again in ZCode?

**Yes.** Terminal environment variables and the ZCode desktop model setup are separate entry points, so configuration is not synced automatically. You can choose either method:

- **Quick Connect**: connect a BigModel / Z.AI account from the welcome screen or the avatar menu; if the account has an active plan, it will connect automatically
- **Manual setup**: add Base URL and API key through `Manage Models`

* * *

### 4\. Why does Connect keep loading?

If model connection remains in Loading, check both of the following:

1. **Network environment**: make sure the machine can reach the selected model service
2. **Account availability**: make sure the signed-in account or API key has quota and model access

* * *

### 5\. Why can I only select files, not folders, when adding context with `@`?

The `@` picker in the input box is designed for quickly selecting individual files, and it can also reference skills and agents — but it does not list folders. To add an entire folder as context for the Agent, drag the folder directly into the input box.

Supported options include:

- Drag a folder from the ZCode file tree into the input box.
- Drag a folder from Finder, File Explorer, or another system file manager into the input box.

After the folder is dropped into the input box, ZCode references it as context so the Agent can analyze the directory structure and work with files inside it.