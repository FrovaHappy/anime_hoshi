// TODO: compile for use..
import { type PayloadAnimeNof } from '../../types/Payloads'
import initDB from '../src/utils/DBLocal'
import { type NotificationInAwait, type NotificationsInAired } from '../types'
import { stringToObject } from '../src/utils/general'
import { KeysLocalStorage } from '../src/enum'

self.addEventListener('push', async (e) => {
  const data: PayloadAnimeNof[] = (e as any).data.json()
  const notificationsSettings = stringToObject<NotificationsInAired>(
    (await initDB().get(KeysLocalStorage.notifications))?.value
  )
  if (!notificationsSettings) return console.error('Notifications not found in IndexedDB')

  let notificationsInAwait: NotificationInAwait =
    stringToObject((await initDB().get(KeysLocalStorage.notificationsInAwait))?.value) ?? []
  const currentTime = Date.now()
  notificationsInAwait = notificationsInAwait.filter((notification) => notification.expireIn > currentTime)
  for await (const push of data) {
    let inAwait = notificationsInAwait.find((notification) => notification.anime.id === push.id)
    const buildInAwait = {
      anime: push,
      cantRemitted: 0,
      created: currentTime,
      expireIn: currentTime + notificationsSettings.expireIn,
    }
    if (!inAwait) inAwait = buildInAwait

    const intoOfDelay = inAwait.created + notificationsSettings.delay > currentTime
    const intoOfMinPages =
      inAwait.anime.namePages.length <= notificationsSettings.minPages || notificationsSettings.minPages !== 0
    const outOfCantRemitted = inAwait.cantRemitted > notificationsSettings.maxRemitted
    console.log({ intoOfDelay, intoOfMinPages, outOfCantRemitted })
    if (outOfCantRemitted) return
    if (intoOfDelay && intoOfMinPages) return

    inAwait.anime = push
    inAwait.cantRemitted += 1
    //delete notifications before
    notificationsInAwait = notificationsInAwait.filter((iAw) => iAw.anime.id !== inAwait!.anime.id)
    // add notifications new
    notificationsInAwait.push(inAwait)
    // send notification
    const title = `${push.title} emitido`
    const namePages = push.namePages
    const lastNamePages = namePages.pop() ?? ''

    const body = `
      Episodio ${push.episode} encontrado
      En: ${namePages.join(', ')} ${namePages.length === 0 ? '' : 'y'} ${lastNamePages}
    `
    await (self as any).registration.showNotification(title, {
      body: body,
      icon: push.image,
      actions: [
        {
          action: '/#' + push.id,
          title: 'Ver',
        },
      ],
    })
  }
  await initDB().set(KeysLocalStorage.notificationsInAwait, JSON.stringify(notificationsInAwait))
  return
})
