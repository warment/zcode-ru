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

# Command

Commands invoke built-in ZCode Agent capabilities and can also save prompts you use often. After saving prompts for code review, commit messages, release checks, file explanation, or similar repeatable work, you can invoke them from the input box with `/`.

Commands are designed around the **ZCode Agent** workflow. For daily work inside ZCode, save the prompts your team repeats often so the first-party Agent can execute stable routines.

![Invoke commands in ZCode Agent](https://zcode.z.ai/content/docs/v2/screenshots/command-zcode-agent-picker-full-20260524-en.png)

* * *

## Use In ZCode Agent

1. Type `/` in the input box to open the command panel. It is organized into **Commands** and **Skills** groups, and you can keep typing to filter.
2. Select a command, or keep typing to filter by command name.
3. If the command expects arguments, add a path, module name, or extra instruction after it.

ZCode Agent currently includes two built-in commands:

| Command | Purpose |
| --- | --- |
| `/goal` | Show, set, replace, pause, resume, or clear the current session goal, useful for long-running tasks |
| `/compact` | Compact the current conversation context while preserving key information, useful for continuing long conversations |

For example, use `/compact` to clean up context in a long task, or `/goal` to keep the agent working toward a long-term objective. To invoke a skill, use `$` or pick it from the **Skills** group in the `/` panel.

* * *

## Create A Command

Open **Commands** in ZCode settings, then create a new command and fill in the fields:

![Create command](https://zcode.z.ai/content/docs/v2/screenshots/command-create-form-20260524-clean-en.png)

| Field | Description |
| --- | --- |
| **Scope** | Choose **User** (available in all workspaces) or **Workspace** (current project only) |
| **Name** | Command name, invoked as `/command-name` after saving |
| **Description** | Optional short text shown in the command picker |
| **Argument hint** | Optional parameter hint, such as `<file-path>` |
| **Prompt** | The prompt content sent to the agent when the command runs |

Custom commands are stored as `.md` files under `~/.zcode/commands` (workspace-level commands live in the project directory). After saving, invoke the command with `/command-name` in the task input box.

* * *

## Import From An External Agent

If you already maintain commands in an external Agent such as Claude Code, there's no need to recreate them in ZCode. On the **Commands** page, click **Import commands from external Agent** in the top-right corner to bring your existing external-Agent commands directly into ZCode.

![Import commands from an external Agent](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-command-import-external-en.png)

1. Open the **Commands** page in ZCode settings.
2. Click **Import commands from external Agent** in the top-right corner.
3. Pick the external-Agent commands you want, confirm, and they are imported into ZCode.

Imported commands behave like ones you created yourself: they appear in the command list, are invoked with `/command-name`, and you can keep editing their name, description, argument hint, or prompt inside ZCode.

* * *

## Usage Notes

Use a command when you only need to save a simple prompt. If the workflow needs scripts, templates, or example files, consider using Skill instead.

* * *

## Next Steps

[**ZCode Agent**\\
\\
Learn how to chat with agents, choose models, and control execution modes in ZCode.](https://zcode.z.ai/en/newdocs/agents) [**ZCode Agent**\\
\\
Understand the first-party Agent workspace, execution modes, and task flow.](https://zcode.z.ai/en/newdocs/agent-framework)