import { Router } from 'express'
import getAnimes from './read'
import putAnimes from './update'
import { validators } from '../../middleware/validators'
import { updateAnime } from './update/validatorSchema'
const router = Router()

router.get('/', getAnimes)
router.put('/', validators(updateAnime), putAnimes)
export default router
