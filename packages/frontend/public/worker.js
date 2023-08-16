//MODULE INDEXED DB ********************************
const DB_NAME = 'app'
const DB_VERSION = 1
const DB_COLLECTION = 'local-storage'

async function initTransaction() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(DB_NAME, DB_VERSION)
    dbRequest.onerror = (err) => {
      reject(err)
    }
    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result
      db.onerror = (err) => {
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
      return new Promise(async (resolve) => {
        const transaction = await initTransaction()
        const object = transaction.get(key)
        object.onsuccess = () => resolve(object.result)
      })
    },
    set(key, value) {
      return new Promise(async (resolve) => {
        const transaction = await initTransaction()
        let object = transaction.put({ key, value })
        object.onsuccess = () => {
          object = transaction.get(key)
          object.onsuccess = () => resolve(object.result)
        }
      })
    },
    delete(key) {
      return (
        new Promise() <
        undefined >
        (async (resolve) => {
          const transaction = await initTransaction()
          const object = transaction.delete(key)
          object.onsuccess = () => resolve(object.result)
        })
      )
    },
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
self.addEventListener('push', async (e) => {
  /**@type {import('../../types/Payloads').PayloadAnimeNof[]} */
  const data = e.data.json()
  /**@type {import('../types').NotificationsInAired} */
  const notificationsSettings = stringToObject((await initDB().get('notifications'))?.value)
  if (!notificationsSettings) return console.error('Notifications not found in IndexedDB')
  /**@type {import('../types').NotificationInAwait} */
  let notificationsInAwait = stringToObject((await initDB().get('notificationsInAwait'))?.value) ?? []
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
    notificationsInAwait = notificationsInAwait.filter((iAw) => iAw.anime.id !== inAwait.anime.id)
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
    await self.registration.showNotification(title, {
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
  await initDB().set('notificationsInAwait', JSON.stringify(notificationsInAwait))
  return
})
