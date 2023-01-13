import { Request, Response } from 'express'
import commandsServices from '../services/commandsServices'

const getCommands = async (_req: Request, res: Response) => {
  const commands = await commandsServices.getCommands()
  res.status(200).json(commands)
}
const postCommands = async (req: Request, res: Response) => {
  const { body } = req
  const postCommands = await commandsServices.postCommands(body)
  res.status(200).json(postCommands)
}

export default {
  getCommands,
  postCommands
}
