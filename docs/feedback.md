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

Get StartedCopy page

# Feedback & Support

To help the technical team diagnose and resolve issues more efficiently, it is recommended to include detailed usage context, the steps you took, and any related error logs when sending feedback. You can reach us through any of the following channels:

- **Feedback Form (Feishu)**: fill out the [feedback form](https://zhipu-ai.feishu.cn/share/base/form/shrcn6ZwXeNSwdfcJ6Q8XeWVb6C?from=navigation) for a one-shot submission with all the details.
- **In-app feedback**: enter from the avatar menu, an error banner, or the task More menu. See [In-app Feedback Entrypoints](https://zcode.z.ai/en/newdocs/feedback#in-app-feedback) below.
- **GitHub Issues**: open an issue at [zcode-feedback](https://github.com/panda920/zcode-feedback) — best for issues you want to track over time or discuss with the team in public.

* * *

## In-app Feedback Entrypoints

ZCode uses one unified **Feedback** panel. You can add the feedback type, feature module, Agent capability, severity, description, screenshots, and full logs when needed.

### Avatar Menu

Click the avatar in the lower-left corner, then choose **Feedback**. This is best for general usage questions, suggestions, and experience issues.

![Feedback entry in the avatar menu: 1. click the avatar, 2. choose Feedback](https://zcode.z.ai/content/docs/v2/screenshots/feedback-sidebar-avatar-entry-20260611-en.png)

The entry opens the shared feedback panel, where you can fill in the title, details, and additional context. The feedback tool automatically attaches a screenshot of the current screen; the **Attach full logs** option is checked by default and can be turned off if needed.

![Feedback submission panel](https://zcode.z.ai/content/docs/v2/screenshots/feedback-submit-dialog-20260611-en.png)

### Error Banner

When an error banner appears, click **Feedback** directly in the banner. This entry automatically carries the error summary, recent error details, screenshot attachment, and current Agent context, which is useful for initialization failures and runtime errors.

### Task More Menu

Open a task, click the **...** More menu in the title bar, then choose **Feedback**. This entry automatically carries the current task title, task ID, workspace, and session file path, which is useful when the issue is tied to one task.

![Feedback entry in the task More menu](https://zcode.z.ai/content/docs/v2/screenshots/feedback-titlebar-menu-entry-20260611-en.png)

* * *

## After Submitting: Background Upload & Progress Tracking

### Close the panel — uploads continue in the background

There is no need to wait after submitting: click the close button in the top-right corner and the upload automatically switches to the **background**. Screenshots and logs keep uploading while you continue working in ZCode.

![Logs continue uploading in the background after submission](https://zcode.z.ai/content/docs/v2/screenshots/feedback-uploading-log-20260611-en.png)

### Track progress in real time and add more details

In **My Feedback** you can track each report's progress in real time (Submitted → In Review → In Progress → Closed). While it is being handled, you can add reproduction steps, screenshots, or log snippets in the **Additional Info** area at any time to help the team locate the issue faster.

![My Feedback: progress tracking and additional info](https://zcode.z.ai/content/docs/v2/screenshots/feedback-progress-panel-20260611-en.png)

* * *

## GitHub Issue Format

To help us reproduce and triage issues quickly, please follow this format when opening an issue at [zcode-feedback](https://github.com/panda920/zcode-feedback):

- **Title**: a one-sentence summary of the problem, e.g. "Blank screen on macOS launch" or "Bot @ trigger has no response".
- **Environment**: OS and version, ZCode version, and the model channel you are using, such as Z.AI or an enterprise channel.
- **Steps to reproduce**: numbered steps the team can follow to hit the problem reliably.
- **Expected vs. actual behavior**: what you expected to happen versus what actually happened.
- **Logs & screenshots**: attach a log archive following [How Do I Package Logs?](https://zcode.z.ai/en/newdocs/feedback#package-logs), and include screenshots or screen recordings whenever possible.

If you aren't sure whether something is a bug or a usage question, feel free to submit anyway — we will help categorize and follow up.

* * *

## How Do I Package Logs?

It is recommended to use the built-in **Export Logs** feature first. If export fails, you can manually locate the logs directory as described below.

### macOS

1. Open the application menu in ZCode.
2. Click **Export Logs** and save the generated compressed archive.
3. Upload the archive to the feedback form.
4. If export fails, open **Finder**, choose **Go -> Go to Folder...**, enter `~/.zcode`, and manually compress the `logs` folder.

* * *

### Windows

1. Open the application menu in ZCode.
2. Click **Export Logs** and save the generated compressed archive.
3. Upload the archive to the feedback form.
4. If export fails, open **File Explorer**, enter `%USERPROFILE%\\.zcode` in the address bar, and press Enter.
5. Select the `logs` folder, then right-click and choose **Send to -> Compressed (zipped) folder**.

* * *

## Join the Community

If you have other needs or run into issues, you can also reach us directly in the user community. **The Feishu (Lark) group is recommended** — the official team is in the group and responds fastest.

#### Feishu Group (Recommended)

![ZCode user feedback group with the official team](https://zcode.z.ai/_next/image?url=%2Fcontent%2Fdocs%2Fcommunity%2Ffeishu-group.jpg&w=3840&q=75)

ZCode user feedback group with the official team

#### WeChat Group

![Scan to join the developer beta group](https://zcode.z.ai/_next/image?url=%2Fcontent%2Fdocs%2Fcommunity%2Fwechat-group.jpg&w=3840&q=75)

Scan to join the developer beta group

#### WeChat Official Account

![Follow for the latest updates](https://zcode.z.ai/_next/image?url=%2Fcontent%2Fdocs%2Fcommunity%2Fwechat-official.jpeg&w=3840&q=75)

Follow for the latest updates

* * *

## Next Steps

[**Agent Chat Interaction**\\
\\
Start working with Agents for coding, analysis, and debugging.](https://zcode.z.ai/en/newdocs/agents) [**Edit History**\\
\\
Modify previously sent messages and adjust instructions dynamically.](https://zcode.z.ai/en/newdocs/edit-history)