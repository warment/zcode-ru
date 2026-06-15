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

# Bot Channel

Bot Channel connects external chat tools to ZCode. After setup, you can open the current workspace from WeChat, Feishu, or Telegram, check task progress, and keep sending instructions to the Agent.

![Bot Channel overview](https://zcode.z.ai/content/docs/v2/screenshots/bot-channel-create-20260524-real.jpg)

## Remote Control vs Bot Channel

Remote Control is best for quick QR-code access. Bot Channel is better when you want the entry point to live inside a chat tool that you can revisit over a longer period.

- **Remote Control**: scan from phone and open the current workspace quickly.
- **Bot Channel**: enter the workspace from a WeChat, Feishu, or Telegram conversation.

## Create A Bot Channel

Open **Bots** settings from the left sidebar, click **Create Bot**, then select the channel you want to connect.

![Create Bot Channel](https://zcode.z.ai/content/docs/v2/screenshots/bot-channel-create-20260524-real.jpg)

Available channels include:

- **WeChat**: scan to sign in and bind automatically.
- **Feishu**: scan to create an app, then bind through messages.
- **Telegram**: create a bot, then bind through messages.

DingTalk, Discord, and WeCom support will be completed in later versions.

## Feishu Pairing

Feishu setup is intentionally lightweight. Choose **Feishu** in ZCode, then scan the QR code shown by the UI. ZCode creates the Feishu app automatically and generates a pairing code. In the Feishu conversation, send `/bind pairing-code`; after confirmation, the Bot is ready to use.

![Feishu Bot Channel pairing](https://zcode.z.ai/content/docs/v2/screenshots/bc-feishu-bind-card-20260613-en.webp)

After binding succeeds, the Feishu Bot returns the available commands. You can check status, create tasks, switch projects, switch models, change run mode, and adjust reply detail. After that, you can keep messaging ZCode Agent directly from Feishu, which is useful for following long-running tasks on mobile.

## Manage Bots

After creation, Bots appear in the left list. You can enable or disable them, bind credentials, set reply granularity, and limit which workspaces they can access.

![Bot Channel list](https://zcode.z.ai/content/docs/v2/screenshots/bot-channel-wechat-config-20260524-real.jpg)

Common settings include:

- **Bind Bot**: scan or follow the UI prompts to bind credentials.
- **Reply granularity**: control how much detail the Bot sends back.
- **Workspace access scope**: limit which workspaces the Bot can open.
- **Delete Bot**: remove a channel you no longer use.

## Enter From Chat Tools

After Bot Channel is configured, send a message to the Bot in the chat tool. The Bot forwards the request to ZCode Agent and returns task progress or a workspace entry.

![WeChat Bot Channel conversation](https://zcode.z.ai/content/docs/v2/screenshots/bot-channel-wechat-chat-20260524-real.jpg)

This is useful for long-running mobile follow-up: you can keep messaging the Bot from WeChat, Feishu, or Telegram, then open the workspace whenever you need the full session.

## Next Steps

[**Remote Control**\\
\\
Temporarily connect to the current desktop workspace from your phone.](https://zcode.z.ai/en/newdocs/remote-control) [**ZCode Agent**\\
\\
Learn how the first-party Agent unifies tasks, context, and model usage.](https://zcode.z.ai/en/newdocs/agent-framework)