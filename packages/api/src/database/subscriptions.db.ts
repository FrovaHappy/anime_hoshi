import { subscriptionsModel } from './models/subscriptions.model'
import { Subscription } from '../../type'

export async function getAllSubscriptions() {
  return subscriptionsModel.find()
}

export async function getOneSubscription(publicKey: string) {
  return subscriptionsModel.findOne({ publicKey: publicKey })
}

export async function addNewSubscription(subscription: Subscription) {
  return subscriptionsModel.create(subscription).catch(() => {
    return null
  })
}
