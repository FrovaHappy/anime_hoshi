import subscriptionsDb from '../../database/subscriptions.db'
import pushNotifications from '../../modules/pushNotifications'

export async function saveSubscription(pushSubscription: string, publicKey: string) {
  const searchVapidKey = await pushNotifications.vapidKey.search(publicKey)
  const subscription = pushNotifications.encrypt({
    lastUpdated: Date.now(),
    privateKey: searchVapidKey?.privateKey ?? '',
    publicKey,
    subscription: pushSubscription,
  })
  if (searchVapidKey) pushNotifications.vapidKey.deleted(searchVapidKey.index)
  return await subscriptionsDb.createOrUpdateOne(subscription)
}
