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

IntegrationCopy page

# ADE Tools

ZCode is not only an Agent prompt box. It is a full **Agent Development Environment** for real development work. You can manage tasks, organize conversations by workspace, open remote workspaces, preview pages, select browser elements as context, and review Agent-generated changes in one window.

* * *

## Workspace And Task List

The left sidebar follows the current workspace and shows your task list. The top row has **New Task**, **Search**, and **Skills** entries, and below them tasks are grouped under each workspace (such as `ZCodeProject`). Every row shows the task title, a relative time (like "1d"), and status dots for running, unread, or failed tasks. Once a task produces changes it also shows that task's `+/-` line counts, so you can quickly see how much the Agent touched in each task.

![Workspace task list](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-workspace-task-list.webp)

The view button above the list switches how tasks are organized: **Grouped**, **Workspace**, and **Timeline**. Outside the grouped view you can also choose the **sort order**, by **created time** or **updated time**.

![Task view and sort options](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-task-view-sort.webp)

In **Grouped** view you can create new groups and organize related tasks into custom groups — handy for collecting long-running tasks by project, requirement, or topic.

![Task groups](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-task-groups.webp)

* * *

## Archived Tasks

Tasks that are no longer active can be archived and collapsed out of the main list. The archived view shows a flat list of all archived tasks, each row keeping its title, relative time, change counts, and owning workspace, with **Restore** and **Delete** actions. Restore an old task whenever you need to revisit it, and delete it permanently once you are sure it is no longer needed.

![Archived tasks](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-archived-tasks.webp)

* * *

## Command Center

Press `Command + K` (or click the search entry in the top bar) to open the Command Center and reach common actions and navigation from one panel. It covers commands, conversations, and files at once: new chat, open folder, search files, settings, previous / next chat, find, back / forward, switch theme, MCP servers, personalization, toggle terminal, and more — all runnable without hunting through menus.

![Command Center quick entry](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-command-center.png)

* * *

## SSH Remote Workspace

From the Open Workspace page, you can choose a local folder or start a remote connection. Remote connections are useful when you want ZCode Agent to work inside a server, development machine, or container environment.

Remote connection starts with the connection method. ZCode currently shows SSH remote host and Docker local container options.

![Choose remote connection method](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-ssh-connection-method.webp)

After choosing SSH, enter the host, port, username, password or private key, and resource download method (download locally then upload, or download on the remote server). ZCode then prepares the remote session and lets you choose the remote directory.

![SSH connection configuration](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-ssh-connection-config.webp)

* * *

## Browser Element Context

The built-in browser can preview local pages and turn page elements into Agent context. Open a Browser tab, enter a local or remote URL, then click the element picker button in the toolbar.

![Browser element picker](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-ade-browser-element-picker.webp)

In picker mode, click a button, card, heading, or any other DOM element on the page. ZCode captures the page title, URL, element text, selector, position, and a safe HTML summary, then adds that context to the current chat. This lets you ask the Agent to modify “the selected card” or improve “this button copy” without describing the element manually.

* * *

## Terminal And Debugging

Use the terminal button in the upper-right corner or `Command + J` to open the terminal panel. You can run builds, tests, development servers, and logs inside the same workspace, then continue the conversation with the Agent.

The built-in browser also includes a DevTools entry for frontend debugging, so preview, DOM inspection, console output, and Agent work stay close together.

* * *

## Remote Access

ZCode remote access has two entry points: **Remote Control** for scanning a QR code from your phone and controlling the current workspace, and **Bot Channel** for opening a workspace from WeChat, Feishu, or Telegram.

[**Remote Control**\\
\\
Connect to the current ZCode workspace from your phone.](https://zcode.z.ai/en/newdocs/remote-control) [**Bot Channel**\\
\\
Open a workspace from chat tools through Bot Channel.](https://zcode.z.ai/en/newdocs/bot-channel)

* * *

## Next Steps

[**Keyboard Shortcuts**\\
\\
Learn the most useful shortcuts for faster navigation.](https://zcode.z.ai/en/newdocs/keyboard-shortcuts) [**FAQ**\\
\\
Quick answers to common usage questions.](https://zcode.z.ai/en/newdocs/qa)