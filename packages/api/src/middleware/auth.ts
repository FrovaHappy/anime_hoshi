import type { RoleUser, TokenBody } from '../../type'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { configs } from '../config'
import { findUser } from '../database/users.db'
import type { JsonResponse } from '../../../types'
interface DecodedToken {
  username: string
  roles: string[]
  newToken: string
}
export interface ExtBodyUserVerified {
  userVerified: DecodedToken
}
async function decodedToken(token: string): Promise<DecodedToken | null> {
  token = token.replace('Bearer ', '').toString()
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY) as TokenBody
    const user = await findUser(decoded.username)
    if (!user) return null
    const { username, roles } = user

    return {
      username,
      roles,
      newToken: createToken({ username }, '24h')
    }
  } catch (e) {
    return null
  }
}
function createToken(payloadToken: object, expiresIn: '2h' | '24h' | '3d' | '5d') {
  const token = jwt.sign(payloadToken, configs.TOKEN_KEY, {
    expiresIn
  })
  return token
}

async function hasRole(req: Request, res: Response<JsonResponse>, next: NextFunction, role: RoleUser) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(403).send({ code: 403, ok: false, message: 'A token is required for this path', contents: null })
  }
  const tokenDecoded = await decodedToken(authorization ?? '')
  if (tokenDecoded == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'token is required or is invalid', contents: null })
  }
  const isValidRole = tokenDecoded.roles.some(r => r === role)
  if (!isValidRole) {
    return res
      .status(401)
      .send({ code: 401, ok: false, message: `${role} role is required for this route.`, contents: null })
  }
  req.body.userVerified = tokenDecoded
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return next()
}
const checkRole = {
  user: async (req: Request, res: Response, next: NextFunction) => await hasRole(req, res, next, 'user'),
  admin: async (req: Request, res: Response, next: NextFunction) => await hasRole(req, res, next, 'admin'),
  owner: async (req: Request, res: Response, next: NextFunction) => await hasRole(req, res, next, 'owner')
}

export default { checkRole, decodedToken, createToken }
