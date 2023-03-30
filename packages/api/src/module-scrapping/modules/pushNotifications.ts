import { AnimeList, Payload } from '../../../../types'
import { Subscription } from '../../../type'
import { getAllSubscriptions } from '../../database/subscriptions.db'
import { buildWebPush } from './webPush'

async function buildStackSubscriptions() {
  const subscriptions = await getAllSubscriptions()

  let stackSubscriptions: Subscription[][] = []
  let temporalSubscriptions: Subscription[] = []
  let count = 0
  let step = 99

  while (count < subscriptions.length) {
    if (count === step) {
      stackSubscriptions.push(temporalSubscriptions)
      temporalSubscriptions = []
      step += 100
    } else {
      temporalSubscriptions.push(subscriptions[count])
    }
    ++count
  }
  if (temporalSubscriptions.length > 0) stackSubscriptions.push(temporalSubscriptions)
  return { stackSubscriptions, total: subscriptions.length }
}

function buildStackPayload(animesUpdated: AnimeList[]) {
  const payload: Payload[] = []
  for (const anime of animesUpdated) {
    const lastEpidodesKey =
      Object.keys(anime.episodes ?? {})
        .sort((a, b) => parseInt(a) - parseInt(b))
        .at(-1) ?? ''
    const epidode = anime.episodes[lastEpidodesKey]
    const episodeKeys = Object.keys(epidode?.pagesUrl ?? {})
    if (episodeKeys.length === 0) continue
    const parseIntl = episodeKeys.join(', ')
    payload.push({
      title: anime.dataAnilist.title.romaji,
      options: {
        icon: anime.dataAnilist.coverImage.large,
        body: ` Episodio ${lastEpidodesKey} en ${parseIntl}`,
      },
    })
  }
  return JSON.stringify(payload)
}

async function sendNotifications(subscriptions: Subscription[], payload: string) {
  let countPush = 0
  const promisePush = async (subscriptionEncrypted: Subscription) => {
    const { webpush, subscription } = await buildWebPush(subscriptionEncrypted)
    let details: { publicKey: string; error: unknown | null }[] = []

    await webpush
      ?.sendNotification(subscription, payload)
      .catch((err) => {
        details.push({
          publicKey: subscriptionEncrypted.publicKey,
          error: err,
        })
      })
      .finally(() => {
        ++countPush
        details.push({
          publicKey: subscriptionEncrypted.publicKey,
          error: null,
        })
      })

    return details
  }
  let resolve = (await Promise.allSettled(subscriptions.map((subscription) => promisePush(subscription))))
    .map((response) => {
      if (response.status === 'fulfilled') {
        return response.value
      }
      return response.reason
    })
    .filter((response) => response !== null)
  return {
    details: resolve,
    countPush: countPush,
  }
}

export async function pushNotifications(animesUpdated: AnimeList[]) {
  const { stackSubscriptions, total } = await buildStackSubscriptions()
  const payload = buildStackPayload(animesUpdated)
  if (animesUpdated.length === 0) return { push: 0, total: total, animesUpdated: animesUpdated.length }
  let push = 0
  for await (const subscription of stackSubscriptions) {
    const { countPush, details } = await sendNotifications(subscription, payload)
    console.log(details)
    push += countPush
  }
  return { push: push, total: total, animesUpdated: animesUpdated.length }
}
