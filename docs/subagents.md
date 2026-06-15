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

# Subagents

Subagents are specialized roles prepared for an Agent. You can turn repeated responsibilities such as code review, test debugging, release notes, and UI checks into subagents so the active Agent can delegate focused work when needed.

## Use In Chat

Type `@` in the chat input box and pick a role from the **Agents** group to hand the task to that subagent. Good subagent tasks have a clear role boundary, for example:

```txt
Ask zcode-reviewer to check the current changes for regression risk.
```

```txt
Ask zcode-test-helper to find why this test is failing.
```

Use a subagent for focused role-based work. Use Command for a simple saved prompt. Use Skill when you need a reusable method, checklist, or context package.

## Configure Subagents

Subagents are defined as Markdown files. Put role files in the matching directory and ZCode picks them up automatically:

- **User level** (available in all workspaces, desktop): `~/.zcode/cli/agents/`
- **Workspace level** (current project only): `<workspace>/.zcode/cli/agents/`

Each subagent is a `.md` file made of optional YAML frontmatter plus a system-prompt body. The frontmatter supports these fields:

- **name**: 3–50 characters, letters, numbers, and hyphens only, such as `zcode-reviewer`.
- **description**: State when this subagent should be used — this field directly drives automatic delegation.
- **color** (optional): The accent color used for this subagent in the UI, such as `#3b82f6`.
- **model** (optional): A specific model for this subagent; leave empty to follow the current session model.
- **tools** (optional): Restrict which tools this subagent may use.

The body after the frontmatter is the **system prompt** that defines the role, focus areas, and expected output style.

```md
---
name: zcode-reviewer
description: Check changes for regression risk before committing
color: "#3b82f6"
model: glm-5.2
tools: Read, Grep, Bash
---

You are a code-review subagent focused on regression risk, edge cases, and test coverage…
```

> Beyond creating your own, subagents can also be **provided by plugins**. Once you enable a plugin that bundles subagents, those roles appear in the available list automatically (tagged as plugin source)—no files to place by hand.

## Role Suggestions

A practical setup usually starts with three to five roles, such as code review, test debugging, documentation cleanup, UI checking, and release notes. Keep each role narrow and give it a clear trigger.

## Next Steps

[**ZCode Agent**\\
\\
Learn how ZCode's built-in Agent works and how it pairs with models.](https://zcode.z.ai/en/newdocs/agents) [**Skill**\\
\\
Create reusable ways of working for Agents.](https://zcode.z.ai/en/newdocs/skill) [**Command**\\
\\
Save common prompts as quick commands.](https://zcode.z.ai/en/newdocs/commands)