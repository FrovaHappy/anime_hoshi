import type { PayloadAnimeNof } from '../../../../../types/Payloads'
import type { InAwait, NotificationsInAired } from '../../../../types'

export interface UpdateNotifications {
  inAwaits: InAwait[]
  pushes: PayloadAnimeNof[]
  currentTime: number
  settings: NotificationsInAired
}
export function updateNotifications({ inAwaits, pushes, currentTime, settings }: UpdateNotifications) {
  pushes.forEach(push => {
    const index = inAwaits.findIndex(inAwait => inAwait.anime.id === push.id)
    if (index === -1) {
      inAwaits.push({
        cantRemitted: 0,
        expireIn: currentTime + settings.expireIn,
        created: currentTime,
        anime: push,
        pastLengthPages: 0
      })
      return
    }
    const currentInAwait = inAwaits[index]
    currentInAwait.anime = push
    inAwaits.splice(index, 1, currentInAwait)
  })
  return inAwaits
}
