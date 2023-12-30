import { type Anime } from '../../../../types/Anime'
import { type PayloadAnimeNof } from '../../../../types/Payloads'
import { type Subscription } from '../../../type'
import { TimestampTimings } from '../../Enum'
import animeDb from '../../database/anime.db'
import subscriptionsDb from '../../database/subscriptions.db'
import logger from '../../shared/log'
import pushNotifications from '../pushNotifications'

let missingUpdate: number[] = []
async function buildStackSubscriptions() {
  const subscriptions = (await subscriptionsDb.findAll()) as Subscription[]
  const stackSubscriptions: Subscription[][] = []
  while (subscriptions.length > 0) {
    stackSubscriptions.push(subscriptions.slice(0, 100))
    subscriptions.splice(0, 100)
  }
  return stackSubscriptions
}
async function getAnimes(animesId: number[]) {
  const animes: Anime[] = []
  for (const id of animesId) {
    const anime = await animeDb.findOne({ search: id, searchType: 'id' })
    if (anime) animes.push(anime)
  }
  return animes
}
function buildPayload(anime: Anime) {
  const namePages = Object.keys(anime.pages)
  const namePagesUpdated: string[] = []
  let refEpisode = 0
  for (const name of namePages) {
    const { lastUpdate, episode } = anime.pages[name].episodes[0]
    if (Date.now() < lastUpdate + TimestampTimings.eightHours) {
      namePagesUpdated.push(name)
      refEpisode = episode
    }
  }
  const payload: PayloadAnimeNof = {
    title: anime.title.romaji,
    episode: refEpisode,
    image: anime.coverImage.large,
    id: anime.id,
    namePages: namePagesUpdated
  }
  return payload
}

async function sendingNotifications(animesId: number[]) {
  const stackSubscriptions = await buildStackSubscriptions()
  const animes = await getAnimes(animesId)
  const stackPayload = JSON.stringify(animes.map(anime => buildPayload(anime)))
  let totalSusses = 0
  let totalRejects = 0

  for (const subscriptions of stackSubscriptions) {
    const results = await Promise.all(
      subscriptions.map(async subscription => {
        return await pushNotifications.push(subscription, stackPayload)
      })
    )
    const susses = results.filter(result => result === 200 || result === 201).length
    const rejects = results.length - susses
    totalSusses += susses
    totalRejects += rejects
  }
  missingUpdate = []
  await logger.info({
    content: { susses: totalSusses, rejects: totalRejects, total: totalSusses + totalRejects },
    message: `${totalSusses} send of ${totalSusses + totalRejects} `,
    section: 'push notification'
  })
}

export default {
  setMissingUpdated(animeId: number) {
    missingUpdate = [...new Set([...missingUpdate, animeId])]
  },
  async run() {
    await sendingNotifications(missingUpdate)
  }
}
