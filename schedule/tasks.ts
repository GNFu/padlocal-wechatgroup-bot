import { Wechaty } from 'wechaty'
import { CronJob } from 'cron'

// send a message in group at fixed time
export default async (bot: Wechaty) => {
  await new Promise(f => setTimeout(f, 1000));
  // remind at 9:30 everyday
  return new CronJob('30 9 * * *', async () => {
    const room = await bot.Room.find({topic: "YourGroupTopic"})  // replace YourGroupTopic by your group topic
    // replace YourMessage by your message
    await room.say('YourMessage')

  }, null, true, 'Europe/Paris')
}


// send a group announce at fixed time, note: this requires you to be the group owner or administrator
export async function remindBot2(bot: Wechaty) {
    await new Promise(f => setTimeout(f, 1000));
    // remind at 20:10 everyday
    return new CronJob('10 20 * * *', async () => {
      const room = await bot.Room.find({topic: "YourGroupTopic"})  // replace YourGroupTopic by your group topic
      // replace YourAnnounce by your announce
      await room.announce(`
      YourAnnounce
      `)  
    }, null, true, 'Europe/Paris')
}      
