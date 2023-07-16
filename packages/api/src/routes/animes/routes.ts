import { Router } from 'express'
import { getAnimes, putAnimes } from './controllers'
import { validators } from '../../middleware/validators'
import { updateAnime } from './validatorSchema'
const router = Router()

router.get('/', getAnimes)
router.put('/', validators(updateAnime), putAnimes)
export default router
