import { Schema, model } from 'mongoose'
import { Subscription } from '../../../type'

const subcriptionSchema = new Schema<Subscription>({
  publicKey: { type: 'string', required: true },
  privateKey: { type: 'string', required: true },
  subscription: { type: 'string', required: true },
  lastUpdated: { type: 'number', required: true }
})
subcriptionSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id

    delete returnObject._id
    delete returnObject.__v
  }
})

export const subscriptionsModel = model('Subcriptions', subcriptionSchema)