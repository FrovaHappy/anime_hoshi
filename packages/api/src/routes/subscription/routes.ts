import { Router } from 'express'
import { getSubscription, postSubscription } from './controllers'
import { validators } from '../../middleware/validators'
import { subscriptionValidate } from './validatorSchema'

const router = Router()

router.get('/', getSubscription)
router.post('/', validators(subscriptionValidate), postSubscription)

export default router
