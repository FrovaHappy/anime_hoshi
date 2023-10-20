import validateResult from '../utils/validationResult'
import { check } from 'express-validator'

const customValidatorExpirationTime = (expirationTime: null | string) => {
  const parse = parseInt(expirationTime || '')
  if (isNaN(parse) && expirationTime !== null) { throw new Error('Invalid expiration') }

  return true
}

const validateSubscription = [
  check('pushSubscription').exists().notEmpty().isObject({ strict: true }),
  check('pushSubscription.endpoint').isString(),
  check('pushSubscription.keys.auth').isString(),
  check('pushSubscription.keys.p256dh').isString(),
  check('pushSubscription.expirationTime').custom(customValidatorExpirationTime),

  check('publicKey').exists().notEmpty().isString(),
  validateResult
]

export { validateSubscription }
