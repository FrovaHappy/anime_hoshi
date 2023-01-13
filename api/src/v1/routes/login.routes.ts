import { Router } from 'express'
import loginControler from '../../controllers/login.controler'
import validate from '../../validators/users'
const router = Router()

router.post('/', validate.validateUserCurrent, loginControler.postLogin)

export default router
