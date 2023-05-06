import { Router } from 'express'
import auth from '../middleware/auth'
import { validateEpisodes } from '../validators/episodes'
const router = Router()

router.post('/', auth.verifyToken, auth.checkRole.admin, validateEpisodes)

export default router
