import { Router } from 'express'
import { getSubscription, postSubscription } from '../controllers/subscription.controller'
import { validateSubscription } from '../validators/subscription'

const router = Router()

router.get('/', getSubscription)
//TODO: check body
router.post('/',validateSubscription, postSubscription)

export default router