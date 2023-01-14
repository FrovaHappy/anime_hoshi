import usersController from '../controllers/usersController'
import validate from '../validators/users'
import { Router } from 'express'
import { postLogin } from '../controllers/login.controler'
const router = Router()
router.get('/', (_req, res) => {
  res.send('hola')
})
router.post('/signup', validate.validateUserNew, usersController.postUser) // created user
router.post('/signin', validate.validateUserCurrent, postLogin)

export default router
