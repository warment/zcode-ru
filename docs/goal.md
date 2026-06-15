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

# Goal Mode

For long-running, complex tasks, use `/goal` to set an explicit objective for the current session. Once set, ZCode Agent **keeps iterating** toward the goal: at the end of each iteration it runs an automatic goal verification — if the goal is not yet met, it continues with another round, and the task only finishes once the goal is verified as complete. Instead of repeatedly prompting "continue", you set a goal and wait for the result.

**Best for** work that is easy to state in one sentence but takes many rounds to finish, for example:

- "Refactor the whole module and keep the tests passing"
- "Fix all TypeScript compile errors"
- "Get this page's Lighthouse performance score above 90"

* * *

## Set and manage a goal

Type `/goal` in the chat input (or type `/` and pick goal from the suggestions):

```text
/goal <objective>         Set the session goal
/goal replace <objective> Replace the current goal
/goal pause               Pause the goal
/goal resume              Resume the goal
/goal clear               Clear the goal
```

> **Tip**: make the objective specific and verifiable — e.g. "Fix all TypeScript compile errors and make `pnpm test` pass" — the clearer the success criteria, the more accurate each round's verification.

* * *

## What happens after setting a goal

### Live tracking in the summary panel

A goal card appears in the top-right summary panel showing the goal status (active / paused / complete) along with **elapsed time, total tokens, and the iteration count** — you can see at a glance how long the task has been running and what it has cost.

📸 TODO: screenshot placeholder — summary panel after setting a /goal (status / elapsed time / iterations)

### Automatic verification each round

When an iteration finishes, the agent automatically verifies the goal:

- **Goal not complete, task continues** — the next iteration starts automatically; no need to prompt "continue"
- **Goal complete, task finished** — the task only wraps up and summarizes after verification passes

📸 TODO: screenshot placeholder — goal verification states (continue / complete)

### Step in anytime

A goal is not set in stone:

- Use `/goal replace <new objective>` to change direction without starting over
- Use `/goal pause` to pause, then `/goal resume` when you are ready to continue
- Use `/goal clear` when the task no longer needs a goal constraint

* * *

## Combine with execution modes

Goal Mode works alongside [execution modes](https://zcode.z.ai/en/newdocs/agents#modes): the goal defines _when the work counts as done_, while the execution mode defines _how many actions need confirmation along the way_. For long goal-driven tasks, pair it with **Full Access** or **Auto Edit** to minimize interruptions and keep iterations flowing.

* * *

## Next Steps

[**ZCode Agent**\\
\\
Learn the prompt entry, model picker, and execution modes.](https://zcode.z.ai/en/newdocs/agents) [**Task & File Management**\\
\\
Organize your workbench with task groups and the file tree.](https://zcode.z.ai/en/newdocs/task-management) [**Command**\\
\\
Save frequently used prompts as reusable commands.](https://zcode.z.ai/en/newdocs/commands)