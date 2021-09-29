import { PuppetPadlocal } from "wechaty-puppet-padlocal";
import { Contact, log, Message, ScanStatus, Wechaty } from "wechaty";
import { Friendship } from 'wechaty';
import { schedule } from "./schedule";

// replace YourPadLocalTokenHere by your token
const bot = new Wechaty({
    name: "YourBot",
    puppet: "wechaty-puppet-padlocal",
    puppetOptions: {
        token:"YourPadLocalTokenHere",
    }
})

    .on("scan", (qrcode: string, status: ScanStatus) => {
        if (status === ScanStatus.Waiting && qrcode) {
            const qrcodeImageUrl = [
                'https://wechaty.js.org/qrcode/',
                encodeURIComponent(qrcode),
            ].join('')

            log.info("TestBot", `onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);

            require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
        } else {
            log.info("TestBot", `onScan: ${ScanStatus[status]}(${status})`);
        }
    })

    .on("login", (user: Contact) => {
        log.info("TestBot", `${user} login`);
    })

    .on("logout", (user: Contact, reason: string) => {
        log.info("TestBot", `${user} logout, reason: ${reason}`);
    })

    // automatically transfer message when requirements met
    // the requirement here is that the message should start with '###'
    .on('message', async m => {
        if (m.type() !== bot.Message.Type.Text
        || !/^(###).*$/i.test(m.text())
      ) {
        console.info('Message discarded because it does not match the pattern')
        return
      }
        const room = await bot.Room.find({topic: 'YourGroupTopic'})  // fill in your group name here 
        if (room) {
          const message = m.text().slice(3)
          await room.say(message)
          console.log('forward this message to wechaty room!')
        }
      })


    // automatically approve friend request
    .on('friendship', async friendship => {
        let logMsg
        const fileHelper = bot.Contact.load('filehelper')
      
        try {
          logMsg = 'received `friend` event from ' + friendship.contact().name()
          await fileHelper.say(logMsg)
          console.log(logMsg)
      
          switch (friendship.type()) {
            // process friend request according to 'hello' message
            // replace YourHelloText with your own rule deciding to add a user automatically or not
            case Friendship.Type.Receive:
              if (friendship.hello() === 'YourHelloText') {
                logMsg = 'accepted automatically because verify messsage is "YourHelloText"'
                console.log('before accept')
                await friendship.accept()
            
                // add to group
                const room = await bot.Room.find({ topic: "YourGroupTopic" })  // fill in your group name here 
                if (room) {
                try {
                    await room.add(friendship.contact())
                } catch(e) {
                    console.error(e)
                  }
                }

                // if want to send msg , you need to delay sometimes
                // replace 'your greetings message' by your own greetings message
                await new Promise(r => setTimeout(r, 1000))
                await friendship.contact().say('your greetings message')
                console.log('after accept')
      
              } else {
                logMsg = 'not auto accepted, because verify message is: ' + friendship.hello()
              }
              break
          }
        } catch (e) {
          logMsg = e.message
        }
      
      
      })
      


bot.start().then(() => {
    log.info("TestBot", "started.");
    schedule(bot)
});


