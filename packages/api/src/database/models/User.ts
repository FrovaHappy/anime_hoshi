import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], default: ['user'] }
})

userSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id

    delete returnObject._id
    delete returnObject.__v
    delete returnObject.passwordHash
  }
})

export const UserModel = model('User', userSchema)
