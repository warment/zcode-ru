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

# Edit History

Edit History lets you revise messages that have already been sent to ZCode Agent. When an instruction is unclear, missing a file path, missing a constraint, or needs a different direction, you can edit the original message and let the Agent understand the task from the updated context instead of starting over.

This is especially useful for long-running tasks. You can keep the same model, workspace, branch, and task context, then adjust only the key instruction so the following work continues from the corrected goal.

* * *

## Find The Edit Entry

In the conversation history, hover over a message you sent. A quick action area appears on the right side of the message. The pencil icon is the **Edit** entry, alongside other common actions such as copy.

![ZCode edit history entry](https://zcode.z.ai/content/docs/v2/screenshots/edit-history-zcode-entry-glm51-20260524-en.png)

### Entry Behavior

- **Only for user messages**: the edit entry changes your submitted instruction, not the Agent response itself.
- **Applies to the latest turn**: only the user message of the last turn can be edited, and editing is unavailable while the task is running or has queued messages.
- **Designed for quick correction**: fix a target, path, or constraint without creating a new task.

* * *

## Edit And Send Again

After clicking Edit, the original message expands into an editable input. You can rewrite the text directly, continue using `@` to reference files, or use `/` to insert commands. Click Send when the revised instruction is ready, and ZCode Agent will continue from the updated message. Click Cancel to leave the original message unchanged.

![ZCode edit history state](https://zcode.z.ai/content/docs/v2/screenshots/edit-history-zcode-editing-glm51-20260524-en.png)

### Interaction Flow

1. **Enter edit mode**: click the pencil icon on the right side of your message.
2. **Revise the instruction**: update the original content, add files, paths, goals, or constraints.
3. **Submit or cancel**: click Send to continue with the revised instruction, or Cancel to keep the original message.

* * *

## Common Use Cases

- **Correct the requirement**: fix an earlier instruction that was wrong, incomplete, or ambiguous.
- **Add key context**: append a file path, error log, screenshot note, API parameter, or missing constraint.
- **Change task direction**: move from "analyze this" to "fix this", or from "implement this" to "plan first".
- **Avoid repeated setup**: keep the existing task context instead of explaining the same background again.

* * *

## Next Steps

[**Command**\\
\\
Save common prompts as reusable commands.](https://zcode.z.ai/en/newdocs/commands) [**Plugin**\\
\\
Extend ZCode through the plugin marketplace.](https://zcode.z.ai/en/newdocs/plugin)