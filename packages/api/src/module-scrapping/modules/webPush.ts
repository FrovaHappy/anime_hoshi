import cryptoJS from 'crypto-js'
import webpush, { PushSubscription } from 'web-push'
import { Subscription } from '../../../type'
import { configs } from '../../config'

function descrypterSubscription(subscriptionEncrypted: Subscription) {
  return {
    publicKey: subscriptionEncrypted.publicKey,
    privateKey: cryptoJS.AES.decrypt(subscriptionEncrypted.privateKey, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8),
    subscription: JSON.parse(
      cryptoJS.AES.decrypt(subscriptionEncrypted.subscription, configs.CRYPTO_KEY).toString(cryptoJS.enc.Utf8)
    ) as PushSubscription,
  }
}

export async function buildWebPush(encryptedSubscription: Subscription) {
  const { privateKey, publicKey, subscription } = descrypterSubscription(encryptedSubscription)
  webpush.setVapidDetails('https://animehoshi.vercel.app/about', publicKey, privateKey)
  return {
    webpush: webpush,
    subscription,
  }
}
