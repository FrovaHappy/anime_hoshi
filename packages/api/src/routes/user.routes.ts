import { getUser, signin, signup, updateUser } from '../controllers/usersController'
import { validateUser, validateUserUpdate } from '../validators/users'
import { Router } from 'express'
const router = Router()

router.get('/', getUser)
router.post('/', validateUserUpdate, updateUser)
router.post('/signup', validateUser, signup)
router.post('/signin', validateUser, signin)

export default router
