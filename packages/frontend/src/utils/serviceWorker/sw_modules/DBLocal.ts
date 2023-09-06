const DB_NAME = 'app'
const DB_VERSION = 1
const DB_COLLECTION = 'local-storage'
const w = (() => {
  try {
    return window
  } catch {
    return self
  }
})()
export interface ResultDB {
  key: string
  value: any
}
const initTransaction = async () =>
  await new Promise<IDBObjectStore>((resolve, reject) => {
    const dbRequest = w.indexedDB.open(DB_NAME, DB_VERSION)
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

export default {
  get: async (key: string) => {
    const transaction = await initTransaction()
    const object = transaction.get(key)
    return await new Promise<ResultDB | undefined>(resolve => {
      object.onsuccess = () => {
        resolve(object.result)
      }
    })
  },
  async set(key: string, value: string) {
    const transaction = await initTransaction()
    let object = transaction.put({ key, value })
    return await new Promise<ResultDB>(resolve => {
      object.onsuccess = () => {
        object = transaction.get(key)
        object.onsuccess = () => {
          resolve(object.result as unknown as ResultDB)
        }
      }
    })
  },
  async delete(key: string) {
    const transaction = await initTransaction()
    const object = transaction.delete(key)
    await new Promise<undefined>(resolve => {
      object.onsuccess = () => {
        resolve(object.result)
      }
    })
  }
}
