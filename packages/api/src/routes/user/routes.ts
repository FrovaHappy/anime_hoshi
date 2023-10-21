import { getUser, signin, signup, updateUser } from './controllers'
import { Router } from 'express'
import { passwordUpdateValidate, userValidate } from './validatorSchema'
import { validators } from '../../middleware/validators'
const router = Router()

router.get('/', getUser)
router.put('/', validators(passwordUpdateValidate), updateUser)
router.post('/signup', validators(userValidate), signup)
router.post('/signin', validators(userValidate), signin)

export default router
