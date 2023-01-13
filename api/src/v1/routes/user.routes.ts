import usersController from '../../controllers/usersController'
import validate from '../../validators/users'
import { Router } from 'express'
const router = Router()

router.post('/', validate.validateUserNew, usersController.postUser) // created user

export default router
