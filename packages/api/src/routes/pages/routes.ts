import { Router } from 'express'
import { validators } from '../../middleware/validators'
import { authorizationHeaders } from '../validateSchema'
import auth from '../../middleware/auth'
import { createPages } from './create/validateSchema'

import read from './read'
import create from './create'

const router = Router()

router.get('/', validators(authorizationHeaders), auth.hasRoles(['owner', 'admin']), read)
router.post('/', validators(createPages), auth.hasRoles(['admin', 'owner']), create)
router.put('/')
router.delete('/')

export default router
