import { Anime } from '../../../../types/Anime'
import { PayloadAnimeNof } from '../../../../types/Payloads'
import { Subscription } from '../../../type'
import { TimestampTimings } from '../../Enum'
import subscriptionsDb from '../../database/subscriptions.db'
import Log from '../../shared/log'
import cache from '../../utils/cache'
import pushNotifications from '../pushNotifications'

async function buildStackSubscriptions() {
  const subscriptions = (await subscriptionsDb.findAll()) as Subscription[]
  let stackSubscriptions: Subscription[][] = []
  while (subscriptions.length > 0) {
    stackSubscriptions.push(subscriptions.slice(0, 100))
    subscriptions.splice(0, 100)
  }
  return stackSubscriptions
}
function getAnimes(animesId: number[]) {
  let animes: Anime[] = cache.get('animes') ?? []
  animes = animes.filter((anime) => animesId.some((id) => anime.dataAnilist.id === id))
  return animes
}
function buildPayload(anime: Anime) {
  const namePages = Object.keys(anime.pages)
  let namePagesUpdated: string[] = []
  let refEpidode = 0
  for (const name of namePages) {
    const { lastUpdate, episode } = anime.pages[name].episodes[0]
    if (Date.now() < lastUpdate + TimestampTimings.eightHours) {
      namePagesUpdated.push(name)
      refEpidode = episode
    }
  }
  const payload: PayloadAnimeNof = {
    title: anime.dataAnilist.title.romaji,
    episode: refEpidode,
    image: anime.dataAnilist.coverImage.large,
    id: anime.dataAnilist.id,
    namePages: namePagesUpdated,
  }
  return payload
}

async function sendingNotifications(animesId: number[]) {
  const stackSubscriptions = await buildStackSubscriptions()
  const animes = getAnimes(animesId)
  const stackPayload = JSON.stringify(animes.map((anime) => buildPayload(anime)))
  let totalSusess = 0,
    totalRejects = 0

  for (const subscriptions of stackSubscriptions) {
    const results = await Promise.all(
      subscriptions.map((subscription) => {
        return pushNotifications.push(subscription, stackPayload)
      })
    )
    const sucess = results.filter((result) => result === 200).length
    const rejects = results.length - sucess
    totalSusess += sucess
    totalRejects += rejects
  }
  Log({
    content: { susess: totalSusess, rejects: totalRejects, total: totalSusess + totalRejects },
    message: `[anime Notif] ${totalSusess} send of ${totalSusess + totalRejects} `,
    type: 'info',
  })
}

export default function sendNotifications() {
  let animesUpdated: number[] = []
  return {
    setAnimesUpdated(animesId: number[]) {
      animesUpdated.push(...animesId)
      const deletedRep = new Set(animesUpdated)
      animesUpdated = [...deletedRep]
    },
    async run() {
      await sendingNotifications(animesUpdated)
    },
  }
}
