const DB_NAME = 'app'
const DB_VERSION = 1
const DB_COLLECTION = 'local-storage'
export interface ResultDB {
  key: string
  value: any
}
interface Transaction {
  get: (key: string) => Promise<ResultDB | undefined>
  set: (key: string, value: any) => Promise<ResultDB>
  delete: (key: string) => Promise<undefined>
}
async function initTransaction() {
  return await new Promise<IDBObjectStore>((resolve, reject) => {
    const dbRequest = window.indexedDB.open(DB_NAME, DB_VERSION)
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
      const transaction = dbRequest.result
        .transaction(DB_COLLECTION, 'readwrite')
        .objectStore(DB_COLLECTION)
      resolve(transaction)
    }
  })
}
export default function initDb(): Transaction {
  return {
    async get(key: string) {
      return await new Promise<ResultDB | undefined>(resolve => {
        return async () => {
          const transaction = await initTransaction()
          const object = transaction.get(key)
          object.onsuccess = () => {
            resolve(object.result)
          }
        }
      })
    },
    async set(key: string, value: string) {
      return await new Promise<ResultDB>(resolve => {
        return async () => {
          const transaction = await initTransaction()
          let object = transaction.put({ key, value })
          object.onsuccess = () => {
            object = transaction.get(key)
            object.onsuccess = () => {
              resolve(object.result as unknown as ResultDB)
            }
          }
        }
      })
    },
    async delete(key: string) {
      await new Promise<undefined>(resolve => {
        return async () => {
          const transaction = await initTransaction()
          const object = transaction.delete(key)
          object.onsuccess = () => {
            resolve(object.result)
          }
        }
      })
    },
  }
}
