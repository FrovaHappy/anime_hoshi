import webpush from 'web-push'
import cache from '../utils/cache'
import cryptoJS from 'crypto-js'
import { CacheKeys } from '../Enum'
import { Subscription, TempVapidkey } from '../../type'
import { addNewSubscription, getOneSubscription } from '../database/subscriptions.db'
import configs from '../config'

export function createVapidKey() {
  const vapidkey = webpush.generateVAPIDKeys()
  const tempVapidkeys: TempVapidkey[] = cache.get(CacheKeys.tempVapidkey) || []
  tempVapidkeys.push(vapidkey)
  cache.set(CacheKeys.tempVapidkey, tempVapidkeys)
  return vapidkey.publicKey
}

export async function saveSubscription(subscription: PushSubscriptionJSON, publicKey: string) {
  const tempVapidkeys: TempVapidkey[] = cache.get(CacheKeys.tempVapidkey) || []
  const Vapidkey = tempVapidkeys.find((v) => v.publicKey === publicKey) || null
  if (Vapidkey === null) {
    const subscriptionFromDb = await getOneSubscription(publicKey)
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
    publicKey: Vapidkey.publicKey,
    privateKey: cryptoJS.AES.encrypt(Vapidkey.privateKey, configs.CRYPTO_KEY).toString(),
    subscription: cryptoJS.AES.encrypt(JSON.stringify(subscription), configs.CRYPTO_KEY).toString(),
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
