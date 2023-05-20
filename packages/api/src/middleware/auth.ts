import jwt from 'jsonwebtoken'
import { configs } from '../config'
import { Request, Response, NextFunction } from 'express'
import { RoleUser, TokenBody } from '../../type'

function decodedToken(token: string) {
  token = token.slice(7).toString()
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY) as TokenBody
    return decoded
  } catch (e) {
    return undefined
  }
}
function createToken(payloadToken: Object, expiresIn: '2h' | '24h' | '3d' | '5d') {
  const token = jwt.sign(payloadToken, configs.TOKEN_KEY, {
    expiresIn,
  })
  return token
}

function hasRole(req: Request, res: Response, next: NextFunction, role: RoleUser) {
  let { authorization } = req.headers
  if (!authorization) {
    return res.status(403).send('A token is required for this path')
  }
  const tokenDecoded = decodedToken(authorization) as TokenBody | undefined
  if (!tokenDecoded) throw new Error(`required ejection of verifyToken previously`)
  const isValidRole = tokenDecoded.roles.some((r) => r === role)
  if (!isValidRole) return res.status(401).send(`${role} role is required for this route.`)
  return next()
}
const checkRole = {
  user: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'user'),
  admin: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'admin'),
  owner: (req: Request, res: Response, next: NextFunction) => hasRole(req, res, next, 'owner'),
}

export default { checkRole, decodedToken, createToken }
