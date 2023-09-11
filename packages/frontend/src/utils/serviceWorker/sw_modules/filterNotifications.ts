import type { InAwait, NotificationsInAired } from '../../../../types'
import { canSendMessage } from './canSendMessage.js'

interface FilterNotifications {
  inAwaits: InAwait[]
  settings: NotificationsInAired
  currentTime: number
}
export function filterNotifications({ inAwaits, settings, currentTime }: FilterNotifications) {
  const forSend: InAwait[] = []
  const retained: InAwait[] = []
  inAwaits.forEach(inAwait => {
    if (inAwait.expireIn <= currentTime) return
    if (canSendMessage({ inAwait, settings, currentTime })) {
      inAwait.pastLengthPages = inAwait.anime.namePages.length
      inAwait.cantRemitted += 1
      forSend.push(inAwait)
    } else {
      retained.push(inAwait)
    }
  })

  return { forSend, retained }
}
