import { Subscription } from '../../../type'
import { configs } from '../../config'
import webpush, { PushSubscription } from 'web-push'
import vapidKey from './vapidKey'
import cryptoJS from 'crypto-js'
import Log from '../../shared/log'

function encrypt(subscription: Subscription): Subscription {
  return {
    lastUpdated: subscription.lastUpdated,
    privateKey: cryptoJS.AES.encrypt(subscription.privateKey, configs.CRYPTO_KEY).toString(),
    publicKey: subscription.publicKey,
    subscription: cryptoJS.AES.encrypt(subscription.subscription, configs.CRYPTO_KEY).toString(),
  }
}
function decrypt(subscription: Subscription): Subscription {
  return {
    lastUpdated: subscription.lastUpdated,
    privateKey: cryptoJS.AES.decrypt(subscription.privateKey, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8),
    publicKey: subscription.publicKey,
    subscription: cryptoJS.AES.decrypt(subscription.subscription, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8),
  }
}
function buildWebPush(encryptedSubscription: Subscription) {
  const decryptSubscription = decrypt(encryptedSubscription)
  let subscription = JSON.parse(decryptSubscription.subscription) as PushSubscription
  webpush.setVapidDetails(
    'https://animehoshi.vercel.app/about',
    decryptSubscription.publicKey,
    decryptSubscription.privateKey
  )
  return {
    webpush: webpush,
    subscription,
  }
}
export async function sendNotification(subscription: Subscription, payload: string) {
  const { webpush, subscription: PushSubscription } = buildWebPush(subscription)
  const result = await webpush.sendNotification(PushSubscription, payload, { timeout: 5000 })

  if (result.statusCode === 200) return result.statusCode
  Log({ message: '[sendNotification] warnig Notification', type: 'warning', content: result })
  return result.statusCode
}

export default {
  vapidKey,
  encrypt,
  push: sendNotification,
}
