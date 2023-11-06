import { Router } from 'express'
import { getLogs } from './controllers'
import auth from '../../middleware/auth'
const router = Router()

router.get('/', auth.hasRoles(['admin', 'owner']), getLogs)

export default router
