import { subscriptionsModel } from './models/subscriptions.model'
import { Subscription } from '../../type'

export async function findAll() {
  return subscriptionsModel.find()
}

async function createOrUpdateOne(subscription: Subscription) {
  let query = await subscriptionsModel.findOne({ publicKey: subscription.publicKey })

  if (!query && subscription.privateKey === '') return null
  if (!query) return await subscriptionsModel.create(subscription)

  query.subscription = subscription.subscription
  query.lastUpdated = subscription.lastUpdated
  return await query.save()
}
export default {
  createOrUpdateOne,
  findAll,
}
