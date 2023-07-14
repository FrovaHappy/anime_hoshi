import { Router } from 'express'
import { getAnimes } from './controllers'
const router = Router()

router.get('/', getAnimes)

export default router
