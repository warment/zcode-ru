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

# Safety Confirmation

ZCode brings ZCode Agent permission control into the task UI. The execution mode picker sits near the composer, so you can choose how the Agent should execute based on task risk.

The goal is simple: before allowing execution, review what the Agent is about to do. Commands, file changes, network calls, and script execution are surfaced in the task. When a high-permission or fully automatic mode is active, ZCode keeps the risk state visible in the toolbar.

## ZCode Agent Permission Modes

ZCode Agent is ZCode's first-party Agent. It is tuned closely for the GLM 5.2 model family and is a good default for long-running, multi-step development work.

![ZCode Agent permission modes](https://zcode.z.ai/content/docs/v2/screenshots/safety-confirm-zcode-agent-modes-glm51.png)

| Mode | Description | Best For |
| --- | --- | --- |
| **Default** | Use ZCode Agent's default confirmation behavior. | Everyday development and normal Q&A. |
| **Confirm Before Changes** | Ask for confirmation before every file edit or command. | Critical code and production configs. |
| **Auto Edit** | Apply file edits automatically; commands still require confirmation. | Routine iteration work. |
| **Plan** | Plan first, then wait for confirmation before implementation. | Refactors, migrations, and long-horizon work. |
| **Full Access** | Run with fewer confirmations. | Trusted contexts where continuous execution is preferred. |

## Workflow

1. **Trigger confirmation**: when an Agent sends a permission-gated request, the current task pauses and the composer is blocked so the next action cannot be queued accidentally.
2. **Show the request**: ZCode displays the exact command, file change, or tool action the Agent plans to run.
3. **User decision**: the Agent continues only after you approve the request; rejecting it stops the current operation or returns the task to an adjustable state.
4. **Sync task state**: permission requests are scoped to the task. If you switch away and come back, the pending request is still there, and the sidebar can show the task as waiting for confirmation.

* * *

## Decision Options

| Option | Description | Recommended Scenario |
| --- | --- | --- |
| **Allow** | Authorize only this one action. | Temporary or uncertain one-off tasks. |
| **Always Allow** | Authorize this and future actions of the same type without asking again. | Trusted repeated operations, such as routine builds. |
| **Reject** | Prevent the Agent from running the current action. | The command, path, or risk does not match expectations. |
| **Always Reject** | Block this and future actions of the same type. | Operations you never want the Agent to perform. |

In some scenarios, finer-grained options such as **Allow for this session** or **Always allow for this project** are also available.

* * *

## Typical Scenarios

- **Running third-party scripts**: Python, Shell, or Node.js scripts inside your project.
- **Network requests**: external API access through `curl` or similar tools.
- **File changes**: creating, editing, deleting, or renaming files. ZCode shows a file-change summary with open and undo actions.
- **System-level commands**: commands that may change system configuration, install dependencies, or delete files.

## Best Practices

- Review the command, path, and file names before allowing execution.
- Use **Allow** when you are unsure; avoid jumping straight to **Always Allow**.
- **Always Allow** and Full Access mode reduce future prompts, so use them only when the operation is trusted.
- For large changes, use **Plan** first, confirm the plan, then implement.

## Next Steps

[**ADE Tools**\\
\\
Explore the built-in professional tools available in ZCode.](https://zcode.z.ai/en/newdocs/ADE-tools) [**Keyboard Shortcuts**\\
\\
Learn the most useful shortcuts for faster operation.](https://zcode.z.ai/en/newdocs/keyboard-shortcuts) [**FAQ**\\
\\
Quick answers to common usage questions.](https://zcode.z.ai/en/newdocs/qa)