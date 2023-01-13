import validateResult from '../utils/validationResult'
import { check } from 'express-validator'

const expRegofUsername = (username: string) => {
  const expReg = /^[a-zA-Z0-9.\-_]{1,}$/g
  const checkResult = username.match(expReg)

  if (checkResult?.length !== 1) {
    throw new Error(
      'use characters from a to Z, 0 to 9 and ._-, do not include spaces'
    )
  }
  if (username.length <= 4) {
    throw new Error('the length must be 4 characters')
  }
  if (username.length > 30) {
    throw new Error("the length don't exceed 30 characters")
  }
  return true
}

const validateUserNew = [
  check('username').exists().isString().custom(expRegofUsername),
  check('password').exists().isString().escape(),
  validateResult
]
const validateUserCurrent = [
  check('username').exists().isString().custom(expRegofUsername),
  check('password').exists().isString().escape(),
  validateResult
]
const validateUserUpdate = [
  check('username').exists().isString().custom(expRegofUsername),
  check('oldPassword').exists().isString().escape(),
  check('newPassword').exists().isString().escape(),
  validateResult
]

export default {
  validateUserNew,
  validateUserCurrent,
  validateUserUpdate
}
