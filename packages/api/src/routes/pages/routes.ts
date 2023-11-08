import { Router } from 'express'
import { validators } from '../../middleware/validators'
import { authorizationHeaders } from '../validateSchema'
import auth from '../../middleware/auth'
import { createPages, updatePages } from './validateSchema'

import read from './read'
import create from './create'
import update from './update'

const router = Router()

router.get('/', validators(authorizationHeaders), auth.hasRoles(['owner', 'admin', 'viewer']), read)
router.post('/', validators(createPages), auth.hasRoles(['admin', 'owner']), create)
router.put('/', validators(updatePages), auth.hasRoles(['admin', 'owner']), update)
router.delete('/')

export default router
