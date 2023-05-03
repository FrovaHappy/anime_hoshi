import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IuserWithoutPasswordHash, TokenBody } from '../../type'
import { configs } from '../config'
import { findUser } from '../database/users.db'

export async function validateUserAndPassword(user: IuserWithoutPasswordHash) {
  const searchUserDB = await findUser(user.username)
  if (!searchUserDB) return searchUserDB

  const passwordHashDB = searchUserDB.passwordHash ?? ''
  const passwordCompare = await bcrypt.compare(user.password, passwordHashDB)
  const payloadToken: TokenBody = {
    username: searchUserDB?.username,
    id: searchUserDB?.id as string,
    roles: searchUserDB?.roles,
  }
  const createTokenSession = (payloadToken: Object) => {
    const token = jwt.sign(payloadToken, configs.TOKEN_KEY, {
      expiresIn: '2h',
    })
    return token
  }
  return passwordCompare ? createTokenSession(payloadToken) : null
}
