import validateResult from '../utils/validationResult'
import { check } from 'express-validator'

const validateForId = (guilds: string[]) => {
  guilds.map((guild) => {
    const expReg = /^[0-9]{1,200}$/g
    const checkResult = guild.match(expReg)
    if (checkResult?.length !== 1) {
      throw new Error(`${guild} is not a valid number`)
    }
  })
  return true
}
const validateForNames = (names: string[]) => {
  names.map((name) => {
    const expReg = /^[a-z]+$/g
    const checkResult = name.match(expReg)
    if (checkResult?.length !== 1) {
      throw new Error(`${name} is not a valid word`)
    }
  })
  return true
}

const validateBodyCommands = [
  check('public.names').exists().isArray().custom(validateForNames),
  check('premium.names').exists().isArray().custom(validateForNames),
  check('premium.guilds').exists().isArray().custom(validateForId),
  check('developer.guilds').exists().isArray({ min: 1 }).custom(validateForId),
  validateResult
]
export default validateBodyCommands
