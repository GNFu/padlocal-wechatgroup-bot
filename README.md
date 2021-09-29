# padlocal-wechatgroup-bot
## Introduction
Padlocal-wechatgroup-bot is a micro project using Wechaty and the puppet service of PadLocal. It is developed under the scenario of a start-up where staff need to manage wechat group on a daily basis with repeated tasks. The bot enables **automatic approval of friend request** and **automatic invitation to group** according to hello message; **send message and announcement at fixed time**; and **transfer specific message to group** through the bot account. In all, it covers the basic needs of wechat-group-oriented projects.

## Important Links
Wechaty: https://github.com/wechaty/wechaty
PadLocal: https://github.com/padlocal/wechaty-puppet-padlocal

## Quick Start
### 0.Apply PadLocal Token
You need PadLocal token to run this bot. 
[How to Apply Token](https://github.com/padlocal/wechaty-puppet-padlocal/wiki/How-to-Apply-Token)

### 1. Prepare Node Environment
[Install Node](https://nodejs.org/), 12/14 LTS version is recommended.
```
$ node --version // >= v12.0.0
``` 
### 2. Clone the [padlocal-wechatgroup-bot](https://github.com/GNFu/padlocal-wechatgroup-bot.git) project.

```
$ git clone git@github.com:GNFu/padlocal-wechatgroup-bot.git
```
Then install Node dependencies.
```
$ cd padlocal-wechatgroup-bot
$ npm install
``` 

### 3. Set you PadLocal Token in [`main.ts`](https://github.com/GNFu/padlocal-wechatgroup-bot/blob/main/main.ts)
```ts
const bot = new Wechaty({
    name: "YourBot",
    puppet: "wechaty-puppet-padlocal",
    puppetOptions: {
        token:"YourPadLocalTokenHere",
    }
})
```

### 4. Set group topics and messages
```ts
const room = await bot.Room.find({topic: 'YourGroupTopic'}) 
```

Then run it:
```
$ npm run group-bot
```
 
