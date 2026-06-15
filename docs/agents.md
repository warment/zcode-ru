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

# ZCode Agent

ZCode Agent is the default self-developed agent in ZCode and the primary entry point when creating a new task. You can describe the goal, add context, reference files, run commands, and choose the model and execution mode that fit the current task.

As ZCode's core agent capability, ZCode Agent is deeply adapted for the **GLM-5.2 model family**. It performs especially well on complex project understanding, long-task planning, multi-turn context retention, and continuous code changes. For Long Horizon Tasks that need sustained progress, ZCode Agent can combine workspace state, file references, execution mode, and Git branch context to move from requirement understanding to concrete implementation.

![ZCode Agent new task interface](https://zcode.z.ai/content/docs/v2/screenshots/agent-framework-zcode-agent-glm51-20260523.png)

* * *

## Workspace Entry

ZCode Agent understands the ZCode workspace, task list, file references, model picker, execution modes, and Git branch state directly, making it a strong fit for the full development loop from understanding a request to editing code and checking changes before commit.

With ZCode Agent, you can `@` reference files in the input box, use `/` commands, call `$` skills, and switch models, execution modes, and branches inside the same task. For everyday development work, it is usually the most stable starting point.

* * *

## Adding Context

Click the **+** button at the bottom-left of the chat input to quickly add context to the current task: upload attachments, reference files, link past conversations, or run commands. You can also type the matching symbol directly in the input box to trigger the same actions.

![ZCode Agent input "+" menu](https://zcode.z.ai/content/docs/v2/screenshots/agent-input-add-menu-20260613.png)

| Entry | Trigger | What It Does |
| --- | --- | --- |
| **Add Attachment** | — | Upload screenshots, documents, and requirement material as context for the current task |
| **Insert @ Mention** | `@` | Reference files in the workspace so the Agent can locate the relevant code precisely |
| **Insert # Conversation** | `#` | Link a past conversation to bring its context into the current task |
| **Insert / Command** | `/` | Call a saved command to reuse a fixed prompt or workflow |

> **Tip**: Besides these entries, the input box also supports `$` to call skills. Describe the goal first, then use `@`, `#`, `/`, and `$` to add precise context — this usually helps ZCode Agent understand and complete the task faster.

* * *

## Execution Modes

Execution modes control whether ZCode Agent plans first, follows the default strategy, or proceeds more automatically. You can switch modes based on task risk, complexity, and how much hands-on involvement you want.

![ZCode Agent execution modes](https://zcode.z.ai/content/docs/v2/screenshots/agent-zcode-permission-modes-glm51.png)

### Available Modes

The ZCode Agent execution mode menu currently includes the following modes. Press `Shift + Tab` while the chat input is focused to cycle through them:

| Execution Mode | How It Works | Best For |
| --- | --- | --- |
| **Default Mode** | Uses the standard task strategy and balances progress with necessary confirmations | Everyday development, normal Q&A, routine code edits |
| **Confirm Before Changes** | Asks for confirmation before every file edit or command | Critical code, production configs, and other high-risk changes |
| **Auto Edit** | Applies file edits automatically while commands still require confirmation | Routine iteration where you want fewer edit confirmations |
| **Plan Mode** | Creates a plan first, then starts implementation after confirmation | Complex or multi-step tasks where you want to align on the approach first |
| **Full Access** | Reduces interruptions and lets the Agent proceed more continuously | Clear, lower-risk tasks where you want faster progress |

> **Tip**: For critical files, shell commands, or broad changes, start with Plan Mode or Confirm Before Changes. For routine edits or clearly scoped tasks, Default Mode, Auto Edit, or Full Access can reduce interruptions.

* * *

## Workflow Suggestions

1. **Start by describing the goal**: tell ZCode Agent what you want to implement, fix, or analyze so it can establish the task objective. For long multi-round tasks, set a verifiable session goal with [Goal Mode](https://zcode.z.ai/en/newdocs/goal).
2. **Add context next**: use `@` to reference key files, or attach screenshots, documents, and requirement material.
3. **Use commands and skills for repeatable work**: use `/` for commands and `$` for reusable skills when the task follows a known process.
4. **Choose execution mode based on risk**: use a faster mode for routine edits, and use Plan Mode first for critical files, shell commands, or pre-commit checks.
5. **Keep the task continuous**: continue asking follow-up questions, adding constraints, reviewing changes, and confirming the final result in the same task.

## Next Steps

[**Edit History**\\
\\
Modify previously sent messages and adjust instructions dynamically.](https://zcode.z.ai/en/newdocs/edit-history) [**Command**\\
\\
Save common prompts as reusable commands.](https://zcode.z.ai/en/newdocs/commands) [**ZCode Agent**\\
\\
See the first-party Agent workspace, execution modes, and task flow.](https://zcode.z.ai/en/newdocs/agent-framework)