import webpush from 'web-push'
import cache from '../utils/cache'
import cryptoJS from 'crypto-js'
import { CacheKeys } from '../Enum'
import { Subscription, TempVapidkey } from '../../type'
import { addNewSubscription, UpdateOneSubscription } from '../database/subscriptions.db'
import { configs } from '../config'

export function createVapidKey() {
  const vapidkey = webpush.generateVAPIDKeys()
  const tempVapidkeys: TempVapidkey[] = cache.get(CacheKeys.tempVapidkey) || []
  tempVapidkeys.push(vapidkey)
  cache.set(CacheKeys.tempVapidkey, tempVapidkeys)
  return vapidkey.publicKey
}
function searchVapidkey(publicKey: string) {
  let tempVapidkeys: TempVapidkey[] = cache.get(CacheKeys.tempVapidkey) || []
  const indexVapidkey = tempVapidkeys.findIndex((v) => v.publicKey === publicKey)
  const vapidkey = tempVapidkeys[indexVapidkey]
  tempVapidkeys.splice(indexVapidkey, 1)
  cache.set(CacheKeys.tempVapidkey, tempVapidkeys)
  return {
    value: vapidkey,
    index: indexVapidkey,
  }
}

export async function saveSubscription(pushSubscription: string, publicKey: string) {
  const encryptedPushSubscription = cryptoJS.AES.encrypt(pushSubscription, configs.CRYPTO_KEY).toString()
  const vapidkey = searchVapidkey(publicKey)
  console.log({ vapidkey, pushSubscription })

  if (vapidkey.value === undefined) {
    const subscriptionFromDb = await UpdateOneSubscription(publicKey, encryptedPushSubscription)
    if (subscriptionFromDb) {
      return {
        error: false,
        statuscode: 200,
        message: 'publicKey already exists',
        subscription: undefined,
      }
    }
    return {
      error: true,
      statuscode: 503,
      message: 'vapidkey not found',
      subscription: undefined,
    }
  }
  const encryptedSubscription: Subscription = {
    publicKey: vapidkey.value.publicKey,
    privateKey: cryptoJS.AES.encrypt(vapidkey.value.privateKey, configs.CRYPTO_KEY).toString(),
    subscription: encryptedPushSubscription,
    lastUpdated: Date.now(),
  }
  const subscriptiondatabase = await addNewSubscription(encryptedSubscription)
  if (!subscriptiondatabase) {
    return {
      error: true,
      statuscode: 503,
      message: 'error while saving subscription in database',
      subscription: undefined,
    }
  }
  return {
    subscription: subscriptiondatabase,
    error: false,
    statuscode: 201,
    message: 'success saving subscription in database',
  }
}
