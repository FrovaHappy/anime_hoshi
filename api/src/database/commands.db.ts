import { CommandsModel } from './schemas/commands'

const searchDefault = { __v: 0 }

async function findOneAndUpdateCommands (update: any) {
  const config = { upsert: true, returnDocument: 'after' }
  const query = await CommandsModel.findOneAndUpdate(
    searchDefault,
    update,
    config
  )
  return query
}

async function findCommands () {
  const query = await CommandsModel.findOne(searchDefault)
  return query
}

export default {
  findOneAndUpdateCommands,
  findCommands
}
