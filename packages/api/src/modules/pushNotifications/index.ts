import { type Subscription } from '../../../type'
import { configs } from '../../config'
import webpush, { type PushSubscription } from 'web-push'
import vapidKey from './vapidKey'
import cryptoJS from 'crypto-js'
import logger from '../../shared/log'
import subscriptionsDb from '../../database/subscriptions.db'

function encrypt(subscription: Subscription): Subscription {
  return {
    lastUpdated: subscription.lastUpdated,
    privateKey:
      subscription.privateKey !== ''
        ? cryptoJS.AES.encrypt(subscription.privateKey, configs.CRYPTO_KEY).toString()
        : '',
    publicKey: subscription.publicKey,
    subscription: cryptoJS.AES.encrypt(subscription.subscription, configs.CRYPTO_KEY).toString()
  }
}
function decrypt(subscription: Subscription): Subscription {
  return {
    lastUpdated: subscription.lastUpdated,
    privateKey: cryptoJS.AES.decrypt(subscription.privateKey, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8),
    publicKey: subscription.publicKey,
    subscription: cryptoJS.AES.decrypt(subscription.subscription, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8)
  }
}
function buildWebPush(encryptedSubscription: Subscription) {
  const decryptSubscription = decrypt(encryptedSubscription)
  const subscription = JSON.parse(decryptSubscription.subscription) as PushSubscription
  webpush.setVapidDetails(
    'https://animehoshi.vercel.app/about',
    decryptSubscription.publicKey,
    decryptSubscription.privateKey
  )
  return {
    webpush,
    subscription
  }
}
export async function sendNotification(subscription: Subscription, payload: string) {
  const { webpush, subscription: PushSubscription } = buildWebPush(subscription)
  if (payload === '[]') return 200
  const result = await webpush.sendNotification(PushSubscription, payload, { timeout: 10000 }).catch(err => err)
  if (result.statusCode === 201) return result.statusCode
  if (result.statusCode === 410) await subscriptionsDb.deleteOne(subscription.publicKey)
  await logger.warn({
    message: '[sendNotification] warning Notification',
    section: 'push notification',
    content: result
  })
  return result.statusCode
}

export default {
  vapidKey,
  encrypt,
  push: sendNotification
}
