import { Router } from 'express'
import read from './read'
import { validators } from '../../middleware/validators'
import { authorizationHeaders } from '../validateSchema'
import auth from '../../middleware/auth'

const router = Router()

router.get('/', validators(authorizationHeaders), auth.checkRole.user, read)
router.post('/')
router.put('/')
router.delete('/')

export default router
