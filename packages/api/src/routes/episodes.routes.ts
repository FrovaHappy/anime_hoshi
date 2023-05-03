import { Router } from 'express'
import auth from '../middleware/auth'
const router = Router()

router.post('/', auth.verifyToken, auth.checkRole.admin)

export default router
