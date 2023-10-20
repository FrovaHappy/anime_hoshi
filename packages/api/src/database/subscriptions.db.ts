import { subscriptionsModel } from './models/subscriptions.model'
import type { Subscription } from '../../type'

export async function findAll () {
  return await subscriptionsModel.find()
}
async function deleteOne (publicKey: string) {
  await subscriptionsModel.deleteOne({ publicKey })
}
async function createOrUpdateOne (subscription: Subscription) {
  const query = await subscriptionsModel.findOne({ publicKey: subscription.publicKey })

  if (subscription.privateKey === '') return null
  if (query == null) return await subscriptionsModel.create(subscription)

  query.subscription = subscription.subscription
  query.lastUpdated = subscription.lastUpdated
  return await query.save()
}
export default {
  createOrUpdateOne,
  findAll,
  deleteOne
}
