import { Router } from 'express'
import auth from '../middleware/auth'
import { validateEpisodes } from '../validators/episodes'
import { putEpisodes } from '../controllers/espisodes.controler'
const router = Router()

router.put('/', auth.verifyToken, auth.checkRole.admin, validateEpisodes, putEpisodes)

export default router
