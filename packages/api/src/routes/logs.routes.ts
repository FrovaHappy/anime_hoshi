import { Router } from 'express'
import { getLogs } from '../controllers/logs.controller'
import auth from '../middleware/auth'
const router = Router()

router.get('/', auth.checkRole.admin, getLogs)

export default router
