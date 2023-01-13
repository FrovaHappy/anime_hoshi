import commandsControler from '../../controllers/commandsControler'
import validateBodyCommands from '../../validators/commands'
import { Router } from 'express'
const router = Router()

router
  .get('/', commandsControler.getCommands)
  .post('/', validateBodyCommands, commandsControler.postCommands)

export default router
