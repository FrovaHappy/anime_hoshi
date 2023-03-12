import cryptoJS from 'crypto-js'
import webpush, { PushSubscription } from 'web-push'
import { Subscription } from '../../type'
import configs from '../config'
import { getOneSubscription } from '../database/subscriptions.db'

function descrypterSubscription(subscription: Subscription) {
  return {
    publicKeyDatabase: subscription.publicKey,
    privateKey: cryptoJS.AES.decrypt(subscription.privateKey, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8),
    subscription: JSON.parse(
      cryptoJS.AES.decrypt(subscription.subscription, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8)
    ) as PushSubscription,
  }
}

export async function buildWebPush(publicKey: string) {
  const encryptedSubscription = await getOneSubscription(publicKey)
  if (!encryptedSubscription) return { webpush: null, subscription: null }
  const { privateKey, publicKeyDatabase, subscription } = descrypterSubscription(encryptedSubscription)
  webpush.setVapidDetails('https://animehoshi.vercel.app/about', publicKeyDatabase, privateKey)
  return {
    webpush: webpush,
    subscription,
  }
}
