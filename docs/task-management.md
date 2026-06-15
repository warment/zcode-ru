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

# Task & File Management

As tasks pile up, the left sidebar offers two high-frequency management features: **task groups** let you organize tasks by topic, and the **workspace file tree** lets you browse files, review changes, and reference files in chat without leaving ZCode.

* * *

## Task Groups

Switch the view menu at the top of the task sidebar to **Grouped** to organize tasks into custom groups.

### Create and manage groups

1. Click **New Group** and type a name
2. Click the color dot next to the group title to pick one of 7 colors (gray / red / orange / yellow / green / blue / purple) — use colors to distinguish projects or priorities
3. Click the group title to **rename** it at any time
4. Right-click a group to choose **Ungroup & Delete** — this removes only the group itself; the tasks inside are kept and moved out

### Organize tasks

- **Drag and drop**: drag tasks into a group, reorder tasks within a group, or drag group titles to reorder groups
- **Context menu**: right-click a task and choose **Move to Group** / **Remove from Group** when dragging is inconvenient
- **Collapse and expand**: click the triangle next to a group title to collapse one group, or use the buttons at the top of the list to expand / collapse all

📸 TODO: screenshot placeholder — grouped view with colored groups and drag-and-drop

* * *

## Workspace File Tree

Click the **file tree icon** (View Files) on the right side of a workspace card to switch the sidebar to the workspace's file tree; click **Back to Tasks** at the top to return to the task list.

### Browse and search

- **Search files**: the search box at the top filters by file name or path in real time
- **Show changed files only**: one click filters down to files with Git changes — great for code review or pre-commit checks
- **Git status markers**: files show their Git status (added / modified / deleted / renamed) on the right, and directories aggregate the change status of files inside

### Open and reference

- **Single-click** a file to preview it on the right; **double-click** or press Enter to open it in the default editor
- **Drag into chat**: drag a file into the chat input to insert a file reference and have the agent work on that file
- **Context menu**: Open / Open With (choose an installed editor) / **Add to Chat** / Copy Path / Reveal in File Explorer

📸 TODO: screenshot placeholder — file tree with Git status markers and context menu

> **Tip**: combine **Show changed files only** with **Add to Chat** to quickly feed this round's modified files to the agent for self-review or commit message generation.

* * *

## Next Steps

[**ZCode Agent**\\
\\
Learn the prompt entry, execution modes, and goal mode.](https://zcode.z.ai/en/newdocs/agents) [**Edit Message History**\\
\\
Edit sent messages and adjust instructions on the fly.](https://zcode.z.ai/en/newdocs/edit-history) [**Command**\\
\\
Save frequently used prompts as reusable commands.](https://zcode.z.ai/en/newdocs/commands)