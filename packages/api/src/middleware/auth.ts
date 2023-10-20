import type { RoleUser, TokenBody } from '../../type'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { configs } from '../config'

function decodedToken(token: string) {
  token = token.replace('Bearer ', '').toString()
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY) as TokenBody
    return decoded
  } catch (e) {
    return undefined
  }
}
function createToken(payloadToken: object, expiresIn: '2h' | '24h' | '3d' | '5d') {
  const token = jwt.sign(payloadToken, configs.TOKEN_KEY, {
    expiresIn
  })
  return token
}

function hasRole(req: Request, res: Response, next: NextFunction, role: RoleUser) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(403).send('A token is required for this path')
  }
  const tokenDecoded = decodedToken(authorization ?? '')
  if (tokenDecoded == null) {
    return res.status(403).json({ code: 403, message: 'token is required or is invalid', contents: null })
  }
  const isValidRole = tokenDecoded.roles.some(r => r === role)
  if (!isValidRole) return res.status(401).send(`${role} role is required for this route.`)
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return next()
}
const checkRole = {
  user: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'user'),
  admin: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'admin'),
  owner: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'owner')
}

export default { checkRole, decodedToken, createToken }
