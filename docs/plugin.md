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

Core FeaturesCopy page

# Plugin

Plugins extend what ZCode can do. A single plugin can bundle skills, commands, subagents, and MCP servers, so teams can package reusable tooling into one extension and enable it from a single workspace.

![ZCode plugin management page](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-plugin-management.png)

* * *

## What A Plugin Contains

A single plugin can bundle several capabilities. ZCode detects which components a plugin includes from its directory layout and shows them as badges or counts in the list:

| Component | Description |
| --- | --- |
| **Skill** | Skill files that teach the Agent specific ways of working |
| **Command** | Quick commands invoked with `/` |
| **Agent** | Subagents registered together with the plugin |
| **MCP servers** | External tool servers registered with the plugin, shown under the **Plugin MCP servers** group in the MCP list |
| **Hook** | Automation hooks triggered on specific events |
| **LSP** | Language servers that add completion, diagnostics, and more for a language |

When you enable a plugin, all of its components are registered into the current workspace; disabling it disables them together.

* * *

## Built-in Plugins

ZCode ships with a set of **official plugins** that work out of the box—no extra installation required. The two that stand out are the mobile-development plugins **android-emulator** and **ios-simulator**: together they let you **handle Android and iOS development in one place, with zero tool switching**.

| Plugin | Capability | Components |
| --- | --- | --- |
| **android-emulator** | Adds Android development workflow and emulator automation to ZCode | 1 skill · 1 command · 1 MCP |
| **ios-simulator** | Adds iOS development workflow and simulator automation to ZCode | 1 skill · 1 command · 1 MCP |

Once enabled, ZCode Agent can drive the Android emulator or iOS simulator directly—building and running, installing and launching, and verifying the UI all within the same conversation. No more bouncing between an IDE, a simulator, and the command line, so mobile development stays smooth and fast.

* * *

## Manage Plugins

Open **Settings -> Plugins** to see the plugins installed on this machine. Each entry shows the name, version, source tag, and the counts of the skills, commands, MCP servers, and other components it bundles.

From this page you can:

- Filter plugins by name or description with the search box at the top.
- Check the source tag of each plugin, such as `Official`.
- Enable or disable a plugin with the switch on the right.
- Click a plugin entry to see the exact skills, commands, MCP servers, and other components it contains.

> Before disabling a plugin, ZCode shows which skills, commands, or MCP servers the change will affect, so you can confirm before turning off a capability something still depends on.

Because plugin changes require reloading the Agent runtime, the current session reloads automatically after you enable or disable a plugin so the change takes effect.

* * *

## Next Steps

[**Command**\\
\\
Learn ZCode Agent built-in commands and how to create custom commands.](https://zcode.z.ai/en/newdocs/commands) [**Skill**\\
\\
Use Skills to teach agents reusable ways of working.](https://zcode.z.ai/en/newdocs/skill) [**MCP Servers**\\
\\
Connect external tool capabilities to the Agent.](https://zcode.z.ai/en/newdocs/mcp-services)