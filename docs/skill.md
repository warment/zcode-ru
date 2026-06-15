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

# Skill

A Skill is a reusable working instruction. It is usually defined by a `SKILL.md` file that describes when the skill should be used, how the Agent should work, and what kind of output is expected.

In ZCode, this page focuses on skills for ZCode Agent:

- **ZCode Agent**: Recommended for ZCode's built-in Agent workflows, such as project development, documentation, testing, and team-specific operations.

![ZCode Agent skill list](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-skill-list.png)

## Manage Skills

Open **Settings -> Skills** to view skills by source. Each row shows the skill name, source tag, description, and enable switch.

From this page, you can:

- Search skills by name.
- Enable or disable a skill with the switch on the right.
- Click **New Skill** in the upper-right corner, and ZCode will guide you through generating a new skill with the Agent in chat.

## Create A Skill

A skill is a directory with a `SKILL.md` file inside. The directory name is the skill name, and that is the name you reference in chat.

User-level skills for ZCode Agent:

```txt
~/.zcode/skills/<skill-name>/SKILL.md
```

A minimal `SKILL.md` looks like this:

```md
---
name: code-review-checklist
description: Review code changes with a focused checklist for correctness, regressions, tests, and maintainability.
---

# Code Review Checklist

Use this skill when reviewing a pull request, merge request, or local diff.

Focus on correctness, regressions, missing tests, risky API changes, and maintainability.
```

After creating or editing a skill, return to **Settings -> Skills**, click **Refresh**, and confirm the skill appears under the correct source with the switch enabled.

## Import Skills From An External Agent

If you already maintain skills in other AI coding tools such as Claude Code, Codex CLI, OpenClaw, Augment, or Windsurf, there's no need to recreate them in ZCode. On the **Settings -> Skills** page, click the **Import** icon in the top-right corner. ZCode scans those external Agents' skill directories and lists the skills you can import in one click.

![Import skills from an external Agent](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-skill-import-external.png)

In the dialog you can:

- Browse detected skills grouped by external Agent; each source shows its skill directory path and how many skills are available.
- Select the skills you want, or use **Select All**; the selected count updates at the top.
- Choose an **import mode**:
  - **Symlink**: create a link to the external skill directory. ZCode follows later changes in the source, but the skill depends on the source path staying available.
  - **Copy**: copy the skill into ZCode as an independent copy, decoupled from the source, so later changes in the source are no longer synced.
- Choose an **import target**: import to **Global** (user level, available in all workspaces) or to the current **Project** (current workspace only).

Confirm to finish. Imported skills appear in the skill list, behave like ones you created yourself — enable, disable, and invoke them in chat with `$skill-name`.

## Use A Skill In Chat

Type `$` in the chat input and select a skill. Once selected, the skill appears as a tag in the input, and you can continue typing the actual request.

![Call a Skill in chat](https://zcode.z.ai/content/docs/v2/screenshots/zcode-docs-20260613-skill-invoke.png)

Examples:

```txt
$code-review-checklist review my current changes
```

```txt
$release-notes write release notes for this change set
```

ZCode passes the referenced skill to the active Agent so it follows the instructions in that skill.

## What Should Become A Skill

- The task follows a repeated workflow, such as code review, API debugging, release notes, or test reports.
- The team expects a consistent output format.
- The workflow needs background knowledge, checklists, templates, or examples.
- The same capability will be reused across projects or conversations.

Use Command for a simple saved prompt. Use Skill when you need a complete working method.

## Next Steps

[**Command**\\
\\
Save common prompts as reusable commands.](https://zcode.z.ai/en/newdocs/commands) [**MCP Servers**\\
\\
Connect Agents to external tools such as filesystems, browsers, and memory.](https://zcode.z.ai/en/newdocs/mcp-services)