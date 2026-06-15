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

# MCP Servers

MCP (Model Context Protocol) connects external capabilities such as file systems, browser automation, memory, and databases to Agents. ZCode manages the MCP server configuration used by **ZCode Agent** in one place.

Once common MCP servers are configured, ZCode Agent can use project files, browser automation, memory, and other tools more smoothly during long-running development tasks. It is also well adapted to the GLM 5.2 model family for multi-step coding workflows.

![ZCode Agent MCP server list](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-mcp-server-list.png)

## List Groups

The MCP list is organized into two groups by source:

- **Configured MCP servers**: Servers you added manually. You can edit, delete, enable, or disable them directly.
- **Plugin MCP servers**: Servers installed together with plugins, managed by the corresponding plugin.

Each MCP row shows the name, source, transport, and command.

## Create An MCP Server

Open **Settings -> MCP Servers**, then click **New MCP Server** in the upper-right corner. **Form** mode is the fastest way to add common stdio servers:

1. Choose a **Scope**: **User** (available in all workspaces) or **Workspace** (current project only).
2. Enter a name, such as `memory`.
3. Keep the type as `stdio` (SSE and HTTP remote servers are also supported).
4. Enter the command, such as `npx`, and arguments, such as `-y @modelcontextprotocol/server-memory`.
5. If the server needs keys or paths, expand **Environment variables** and add them there.
6. Click **Add**, then confirm the server is enabled in the list.

![Create MCP server](https://zcode.z.ai/content/docs/v2/screenshots/mcp-services-create.png)

If you already have a JSON configuration, switch to **Full configuration** mode and paste it directly.

## Import From An External Agent

If you already configured MCP servers in external Agents such as Claude Code, Codex CLI, or OpenCode, there's no need to recreate them one by one in ZCode. On the **MCP Servers** page, click the **Import** icon in the top-right corner. ZCode scans those external Agents' configuration files and lists their existing MCP servers so you can import them in one go.

![Import MCP servers from an external Agent](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-mcp-import-external.png)

ZCode discovers importable MCP servers from the following sources:

- **Claude Code**: `~/.claude/settings.json`
- **Codex CLI**: `~/.codex/config.toml`
- **OpenCode**: `~/.config/opencode/opencode.json`
- **Generic `.agents`**: `~/.agents/mcp.json`

Steps:

1. Open the **MCP Servers** page in ZCode settings.
2. Click the **Import** icon in the top-right corner to open the "Import external Agent MCP servers" dialog.
3. Choose the import **scope** (global or the current workspace) in the upper-right of the dialog.
4. Select the servers you want, or click **Select all**; the dialog shows the number of importable and selected servers in real time.
5. Click **Import** to finish. The servers appear in the list and are enabled by default.

Imported servers are stored in the `.zcode` configuration file of the chosen scope, just like ones you added manually. You can keep editing, enabling, disabling, or deleting them inside ZCode, and the original external Agent's configuration files are left untouched.

## Recommended Setup

These Zhipu-related MCP servers are the recommended starting point:

- `zai-mcp-server`: Adds visual understanding so the Agent can analyze images, screenshots, and interface context.
- `web-search-prime`: Adds web search so the Agent can retrieve up-to-date external information.
- `web-reader`: Adds webpage reading so the Agent can parse page content, structure, and key details.

These services usually require a Zhipu API Token. For team usage, place shared services under the **User** scope and project-specific servers under the **Workspace** scope to keep configurations clean.

## Next Steps

[**Command**\\
\\
Turn repeated prompts and workflows into reusable commands.](https://zcode.z.ai/en/newdocs/commands) [**Skill**\\
\\
Use Markdown-based instructions to teach Agents a specific way of working.](https://zcode.z.ai/en/newdocs/skill)