import commandsDatabase from '../database/commands.db'

async function getCommands () {
  const commands = await commandsDatabase.findCommands()
  return commands
}

async function postCommands (updateCommands: any) {
  // realizar las modificaciones antes de actualizar la bd
  const commands = await commandsDatabase.findOneAndUpdateCommands(updateCommands)
  return commands
}

export default {
  getCommands, postCommands
}
