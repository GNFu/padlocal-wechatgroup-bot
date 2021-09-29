import { Wechaty } from 'wechaty'

import remindBot from './tasks'
import { remindBot2 } from './tasks'

export async function schedule (bot: Wechaty) {
  await remindBot(bot)
  await remindBot2(bot)
  // await remindBot3(bot)
}