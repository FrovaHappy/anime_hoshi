import { Router } from 'express'
import getAnimes from './read'
import putAnimes from './update'
import { validators } from '../../middleware/validators'
import { deleteAnime, updateAnime } from './validatorSchema'
import { hasRoles } from '../../middleware/auth'
import deletePath from './delete'
const router = Router()

router.get('/', getAnimes)
router.put('/', validators(updateAnime), hasRoles(['admin', 'owner']), putAnimes)
router.delete('/', validators(deleteAnime), hasRoles(['admin', 'owner']), deletePath)
export default router
