import { Router } from 'express'
import auth from '../../middleware/auth'
import read from './read'
import updated from './update'
import { validators } from '../../middleware/validators'
import { deleteEpisodeError, updateEpisodeError } from './validateSchema'
import deleted from './delete'
const router = Router()

router.get('/', auth.hasRoles(['admin', 'owner']), read)
router.put('/', validators(updateEpisodeError), auth.hasRoles(['admin', 'owner']), updated)
router.delete('/', validators(deleteEpisodeError), auth.hasRoles(['admin', 'owner']), deleted)

export default router
