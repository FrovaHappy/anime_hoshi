// @ts-check
'use strict'
//MODULE INDEXED DB ********************************
const DB_NAME = 'app'
const DB_VERSION = 1
const DB_COLLECTION = 'local-storage'

async function initTransaction() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(DB_NAME, DB_VERSION)
    dbRequest.onerror = err => {
      reject(err)
    }
    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result
      db.onerror = err => {
        reject(err)
      }
      const object = db.createObjectStore(DB_COLLECTION, { keyPath: 'key' })
      object.createIndex('value', 'value', { unique: false })
    }
    dbRequest.onsuccess = () => {
      const transaction = dbRequest.result.transaction(DB_COLLECTION, 'readwrite').objectStore(DB_COLLECTION)
      resolve(transaction)
    }
  })
}
function initDB() {
  return {
    get(key) {
      return new Promise(async resolve => {
        const transaction = await initTransaction()
        const object = transaction.get(key)
        object.onsuccess = () => resolve(object.result)
      })
    },
    set(key, value) {
      return new Promise(async resolve => {
        const transaction = await initTransaction()
        let object = transaction.put({ key, value })
        object.onsuccess = () => {
          object = transaction.get(key)
          object.onsuccess = () => resolve(object.result)
        }
      })
    },
    delete(key) {
      // @ts-ignore
      return new Promise()<undefined>(async resolve => {
        const transaction = await initTransaction()
        const object = transaction.delete(key)
        object.onsuccess = () => resolve(object.result)
      })
    }
  }
}

// MODULE FORMATTED
function stringToObject(s) {
  try {
    const object = JSON.parse(s)
    return object
  } catch {
    return null
  }
}

// MODULE MAIN ****************************************************************
/**
 * @param {import('../types').InAwait} inAwait
 * @param {import('../types').NotificationsInAired} notificationSetting
 * @param {number} currentTime
 */
function canSendMessage(inAwait, notificationSetting, currentTime) {
  const delayExpired = inAwait.created + notificationSetting.delay <= currentTime
  const minPagesEnabled = notificationSetting.minPages !== 0
  const maxRemittedEnabled = notificationSetting.maxRemitted !== 0
  const lengthPagesValid = inAwait.pastLengthPages < inAwait.anime.namePages.length

  const rangeOfRemitted = notificationSetting.maxRemitted >= inAwait.cantRemitted
  const rangeOfMinPages = notificationSetting.minPages <= inAwait.anime.namePages.length
  console.log({ lengthPagesValid, maxRemittedEnabled, rangeOfRemitted, minPagesEnabled, delayExpired, rangeOfMinPages })
  if (!lengthPagesValid) return false
  if (!maxRemittedEnabled) return true
  if (!rangeOfRemitted) return false
  if (delayExpired || (minPagesEnabled && rangeOfMinPages)) return true

  console.warn({ message: 'caso no controlado', inAwait, notificationSetting })
  return false
}
/**
 * @param {import('../../types/Payloads').PayloadAnimeNof[]} push
 * @param {import('../types').NotificationInAwait} inAwaitCollection
 * @param {number} expireIn
 * @param {number} currentTime
 */
function addInAwaitToCollection(push, inAwaitCollection, expireIn, currentTime) {
  for (const anime of push) {
    let inAwait = inAwaitCollection.find(notification => notification.anime.id === anime.id)
    inAwaitCollection = inAwaitCollection.filter(notification => notification.anime.id !== anime.id)
    inAwait = {
      anime: anime,
      cantRemitted: inAwait?.cantRemitted ?? 0,
      created: inAwait?.created ?? currentTime,
      expireIn: inAwait?.expireIn ?? currentTime + expireIn,
      pastLengthPages: inAwait?.anime.namePages.length ?? 0
    }
    inAwaitCollection.push(inAwait)
  }
  console.log(inAwaitCollection)
  return inAwaitCollection
}
/**
 * @param {import('../types').InAwait} inAwait
 */
function buildMessage(inAwait) {
  const title = `Ep. ${inAwait.anime.episode} de: ${inAwait.anime.title}`
  const namePages = inAwait.anime.namePages
  const lastNamePages = namePages.pop() ?? ''

  const body = `En: ${namePages.join(', ')}${namePages.length === 0 ? '' : ' y '}${lastNamePages}.`
  /**@type {Notification | {}} */
  const options = {
    body: body,
    icon: inAwait.anime.image,
    data: inAwait.anime
  }
  return { title, options }
}
self.addEventListener('push', async e => {
  /**@type {import('../../types/Payloads').PayloadAnimeNof[]} */
  // @ts-ignore
  const data = e.data.json()
  /**@type {import('../types').NotificationsInAired} */
  const notificationsSettings = stringToObject((await initDB().get('notifications'))?.value)
  if (!notificationsSettings) return console.error('Notifications not found in IndexedDB')
  /**@type {import('../types').NotificationInAwait} */
  let notificationsInAwait = stringToObject((await initDB().get('notificationsInAwait'))?.value) ?? []
  const currentTime = Date.now()
  notificationsInAwait = notificationsInAwait.filter(notification => notification.expireIn > currentTime)
  notificationsInAwait = addInAwaitToCollection(data, notificationsInAwait, notificationsSettings.expireIn, currentTime)
  let newInAwaitCollections = []
  for await (let inAwait of notificationsInAwait) {
    if (!canSendMessage(inAwait, notificationsSettings, currentTime)) {
      newInAwaitCollections.push(inAwait)
      continue
    }
    inAwait.cantRemitted += 1
    newInAwaitCollections.push(inAwait)

    const message = buildMessage(inAwait)
    // @ts-ignore
    await self.registration.showNotification(message.title, message.options)
  }
  await initDB().set('notificationsInAwait', JSON.stringify(newInAwaitCollections))
  return
})

// ON CLICK NOTIFICATION ********************************
self.addEventListener('notificationclick', event => {
  // @ts-ignore
  event.notification.close()
  // @ts-ignore
  const url = '/?id=' + event.notification.data.id
  // @ts-ignore
  event.waitUntil(
    // @ts-ignore
    clients
      .matchAll({
        type: 'window'
      })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus()
          }
        }
        // @ts-ignore
        if (clients.openWindow) {
          // @ts-ignore
          return clients.openWindow(url)
        }
      })
  )
})
