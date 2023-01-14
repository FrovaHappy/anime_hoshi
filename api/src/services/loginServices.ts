import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUser } from '../database/users.db'
import config from '../config'
import { IuserWithoutPasswordHash } from '../../type'

const createTokenSession = (payloadToken: Object, expiresIn: string) => {
  const token = jwt.sign(payloadToken, config.TOKEN_KEY, {
    expiresIn,
  })
  return token
}

async function loginUser(user: IuserWithoutPasswordHash) {
  const searchUserDB = await findUser(user.username)
  const passwordHashDB = searchUserDB?.passwordHash ?? ''
  const passwordCompare = await bcrypt.compare(user.password, passwordHashDB)
  const payloadToken = {
    username: searchUserDB?.username,
    id: searchUserDB?.id,
    roles: searchUserDB?.roles,
  }
  return searchUserDB != null && passwordCompare ? createTokenSession(payloadToken, '2h') : null
}
export default {
  loginUser
}
