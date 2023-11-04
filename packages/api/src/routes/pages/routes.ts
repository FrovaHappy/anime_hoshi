import { Router } from 'express'
import { validators } from '../../middleware/validators'
import { authorizationHeaders } from '../validateSchema'
import auth from '../../middleware/auth'
import { createPages } from './create/validateSchema'

import read from './read'
import create from './create'

const router = Router()

router.get('/', validators(authorizationHeaders), auth.checkRole.user, read)
router.post('/', validators(createPages), auth.checkRole.user, create)
router.put('/')
router.delete('/')

export default router
