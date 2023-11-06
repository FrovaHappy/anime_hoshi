import { getUser, signin, signup, updateUser } from './controllers'
import { Router } from 'express'
import { passwordUpdateValidate, userValidate } from './validatorSchema'
import { validators } from '../../middleware/validators'
import { authorizationHeaders } from '../validateSchema'
import auth from '../../middleware/auth'
const router = Router()

router.get('/', validators(authorizationHeaders), auth.hasRoles(['admin', 'owner']), getUser)
router.put('/', validators(passwordUpdateValidate), auth.hasRoles(['admin', 'owner']), updateUser)
router.post('/signup', validators(userValidate), signup)
router.post('/signin', validators(userValidate), signin)

export default router
