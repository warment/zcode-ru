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

# API Key Setup

ZCode currently supports three ways to connect AI services:

Connect BigModel

Sign in with a Zhipu open platform account, supporting GLM Coding Plan subscriptions, model resource packages, and prepaid balance.

Connect Z.AI

Sign in with a Z.AI account and use the plans and quota in that account directly.

Third-Party Providers

Connect any model service compatible with the Anthropic / OpenAI protocols, including team-managed channels.

[Recommended\\
\\
**Z.AI Coding Plan**\\
\\
Recommended for international users: subscribe to the GLM Coding Plan via Z.AI (USD pricing) to unlock models like GLM-5.2, with a free daily trial quota.\\
\\
GLM-5.2 coding modelUSD pricingFree trial quota\\
\\
Subscribe Now](https://z.ai/subscribe) [China\\
\\
**GLM Coding Plan (BigModel)**\\
\\
For users in China: subscribe via the BigModel open platform for the same GLM Coding Plan with a cost-effective AI coding experience.\\
\\
GLM-5.2 coding modelHigh performanceCost effective\\
\\
Subscribe](https://bigmodel.cn/glm-coding)

* * *

## Setup Entry Points

### Method 1: First-Launch Welcome Screen

The first time you open ZCode without any usable model, the welcome screen offers connection options directly:

- **Continue with Z.ai**: authorize and sign in with a Z.ai account.
- **Continue with Bigmodel**: authorize and sign in with a Zhipu BigModel account.
- **Use API key**: fill in an API key directly and go to the model provider settings.

![ZCode welcome screen: connect an account](https://zcode.z.ai/content/docs/v2/screenshots/apikey-welcome-connect-20260610-en.jpg)

After you choose **Continue with Z.ai** or **Continue with BigModel**, ZCode opens the authorization flow and waits for the provider to finish authentication. Once authentication succeeds, the account is bound automatically.

![Waiting for BigModel authentication](https://zcode.z.ai/content/docs/v2/screenshots/apikey-welcome-bigmodel-auth-20260611-en.png)

### Method 2: Model Selector

After entering ZCode, click the model name inside the chat box to open the model selector, then click **Manage Models** at the bottom of the list to open the **Settings -> Model Settings** panel, where you manage the model channels available to ZCode Agent.

![Model selector: Manage Models entry at the bottom](https://zcode.z.ai/content/docs/v2/screenshots/apikey-model-selector-20260613-en.webp)

* * *

## Connect BigModel

1. Open the **Model Settings** panel through either method above
2. Select **BigModel** from the provider list on the left
3. Connect your account and turn on the enable switch to use built-in models such as `glm-5.2` and `glm-5-turbo`
4. Use the switcher in the upper-right corner to choose a connection mode: bind a GLM Coding Plan via **Coding Plan**, or switch to **API Key** access

![BigModel provider: plan and today's balance](https://zcode.z.ai/content/docs/v2/screenshots/apikey-bigmodel-plan-20260610-en.jpg)

### Free Trial Quota

New users get a **trial plan** as soon as they connect a BigModel account: no payment required, with a free daily quota for flagship GLM models. The provider page shows today's balance and usage in real time, so you can try first and decide whether to upgrade later.

### Subscribe to a Coding Plan Inside ZCode

Need more than the trial quota? You don't have to leave ZCode: the BigModel provider page lists the **GLM Coding plans** (Lite / Pro / Max) with monthly, quarterly, and yearly billing, and you can complete the purchase in-app after signing in. Existing subscribers can also manage their current plan and check quota status here.

![BigModel provider: trial plan and coding plans](https://zcode.z.ai/content/docs/v2/screenshots/apikey-bigmodel-plans-pricing-20260610-en.jpg)

### Connect With an API Key

If you use model resource packages or prepaid balance from the Zhipu open platform, switch the connection mode to **API Key**:

1. In the upper-right corner of the BigModel provider page, switch the connection mode to **API Key**
2. Keep the default Base URL `https://open.bigmodel.cn/api/anthropic`
3. Fill in the API key obtained from the Zhipu open platform
4. The model list includes GLM-5.2, GLM-5-Turbo, and GLM-5V-Turbo by default; click **Add Model** to add other available models

![BigModel API Key connection mode](https://zcode.z.ai/content/docs/v2/screenshots/apikey-bigmodel-apikey-20260610-en.jpg)

* * *

## Connect Z.AI

Z.AI is the connection option for overseas users, and the setup flow mirrors BigModel:

1. Open the **Model Settings** panel through either method above
2. Select **Z.ai** from the provider list on the left
3. Connect your account and turn on the enable switch to use built-in models such as GLM-5.2 and GLM-5-Turbo
4. The switcher in the upper-right corner also toggles between **Coding Plan** and **API Key** connection modes

Once connected, the provider page shows your current plan plus today's balance and usage per model:

![Z.ai provider: plan and today's balance](https://zcode.z.ai/content/docs/v2/screenshots/apikey-zai-plan-20260610-en.jpg)

### Trial Quota and Coding Plans

Just like BigModel, new users get a free daily trial quota for flagship GLM models, and you can browse and subscribe to the **GLM Coding plans** (Lite / Pro / Max, priced in USD) right on the page, with monthly, quarterly, and yearly billing.

![Z.ai provider: trial plan and coding plans](https://zcode.z.ai/content/docs/v2/screenshots/apikey-zai-plans-pricing-20260610-en.jpg)

### Connect With an API Key

If you already have an API key from the Z.AI platform, switch the connection mode to **API Key**:

1. In the upper-right corner of the Z.ai provider page, switch the connection mode to **API Key**
2. Keep the default Base URL `https://api.z.ai/api/anthropic`
3. Fill in the API key obtained from the Z.AI platform
4. The model list includes GLM-5.2, GLM-5-Turbo, and GLM-5V-Turbo by default; click **Add Model** to add other available models

![Z.ai API Key connection mode](https://zcode.z.ai/content/docs/v2/screenshots/apikey-zai-apikey-20260610-en.jpg)

* * *

## Anthropic (Claude API)

1. Open the **Model Settings** panel through either method above
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "Anthropic"
4. Set the Anthropic endpoint to `https://api.anthropic.com`
5. Fill in the API key obtained from the [Anthropic platform](https://platform.claude.com/), where you can also check usage and plans
6. You can then use models such as claude-fable-5, claude-opus-4-8, claude-sonnet-4-6, and claude-haiku-4-5
7. Click **Add Model** to add other models supported by Anthropic manually

![Anthropic provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-anthropic-20260611-en.jpg)

* * *

## OpenRouter

### 1\. Create an API Key

Go to the [OpenRouter platform](https://openrouter.ai/), register an account, and create an API key.

### 2\. Configure in ZCode

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "OpenRouter"
4. Set the API base URL to `https://openrouter.ai/api`
5. Fill in the API key
6. Turn on the enable switch to start using it

![OpenRouter provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-openrouter-20260611-en.jpg)

* * *

## Moonshot

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "Moonshot"
4. Set the Anthropic endpoint to `https://api.moonshot.cn/anthropic`
5. Get an API key from the [Kimi open platform](https://platform.moonshot.ai/) (token packages and usage are available there) and fill it into the **API Key** field
6. You can then use models such as kimi-k2.6, or click **Add Model** to add more models supported by Moonshot

![Moonshot provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-moonshot-20260611-en.jpg)

* * *

## OpenAI

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "OpenAI"
4. Set the API base URL to `https://api.openai.com`
5. Fill in the API key obtained from the [OpenAI platform](https://platform.openai.com/api-keys)
6. You can then use models such as gpt-5.5, gpt-5.5-pro, and gpt-5.4-mini

![OpenAI provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-openai-20260611-en.jpg)

* * *

## MiniMax

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "MiniMax"
4. Set the Anthropic endpoint to `https://api.minimaxi.com/anthropic`
5. Get an API key from the [MiniMax open platform](https://platform.minimaxi.com/) (plans and billing are available there) and fill it into the **API Key** field
6. You can then use models such as MiniMax-M3 and MiniMax-M2.5

![MiniMax provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-minimax-20260611-en.png)

* * *

## Xiaomi MiMo

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name it "Xiaomi MiMo"
4. Set the API base URL to `https://api.xiaomimimo.com/v1`
5. Get an API key from the [Xiaomi MiMo open platform](https://platform.xiaomimimo.com/) (Token Plan packages are available there) and fill it into the **API Key** field
6. You can then use models such as MiMo-V2.5-Pro and MiMo-V2.5

![Xiaomi MiMo provider settings](https://zcode.z.ai/content/docs/v2/screenshots/apikey-xiaomi-mimo-20260611-en.png)

* * *

## Custom Providers (Anthropic / OpenAI Compatible)

ZCode can add any AI service compatible with the **Anthropic / OpenAI protocols** as a custom provider — public AI services, team-managed enterprise channels, or self-hosted services on a private network.

When you pick a vendor Base URL from the list or enter a compatible endpoint, the system automatically detects it and loads the available model list, so you no longer need to add model names one by one.

### Setup Steps

1. Open the **Model Settings** panel
2. Click **Add Provider** at the bottom of the provider list on the left
3. Name the provider (e.g. claude, deepseek)
4. Choose the vendor Base URL from the dropdown, or enter the API base URL manually
5. Fill in the API key for the service
6. Once the endpoint is confirmed, the system automatically fetches and fills in the available model list
7. Turn on the enable switch to start using it

Taking the DeepSeek-compatible endpoint as an example:

- Name it "DeepSeek"
- Set the Anthropic endpoint to `https://api.deepseek.com/anthropic`
- Set the OpenAI endpoint to `https://api.deepseek.com/v1`
- Fill in the API key obtained from the [DeepSeek open platform](https://platform.deepseek.com/)
- Add models such as `deepseek-v4-pro` and `deepseek-v4-flash` to the model list
- Click save

![Custom provider settings (DeepSeek as an example)](https://zcode.z.ai/content/docs/v2/screenshots/apikey-custom-deepseek-20260611-en.png)

> **Team usage tip**: for enterprise model channels, manage the Base URL, API key, model list, and access policy at the team level so long-running tasks have a stable and traceable model connection.

* * *

## Verify The Setup

After configuration, choose the channel from the model selector in the chat box and send a short test instruction. Once the model responds reliably, you are ready to go.

## Next Steps

[**Install**\\
\\
Download and install the new ZCode desktop app.](https://zcode.z.ai/en/newdocs/install) [**Feedback & Support**\\
\\
Learn how to report issues effectively.](https://zcode.z.ai/en/newdocs/feedback) [**FAQ (Q&A)**\\
\\
Review common questions around setup, installation, and usage.](https://zcode.z.ai/en/newdocs/qa)