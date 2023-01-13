import mongoose from 'mongoose'
const { Schema, model } = mongoose

const commandsSchema = new Schema(
  {
    developer: {
      guilds: { type: [String], required: true }
    },
    public: {
      names: [String]
    },
    premium: {
      guilds: [String],
      names: [String]
    }
  },
  { _id: false }
)

commandsSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.__v
  }
})

export const CommandsModel = model('Commands', commandsSchema)
