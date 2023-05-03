import jwt from 'jsonwebtoken'
import { configs } from '../config'
import { Request, Response, NextFunction } from 'express'
import { RoleUser, TokenBody } from '../../type'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  token = token?.slice(7)?.toString() ?? 'default'
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY)
    req.body.tokenDecoded = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
function hasRole(req: Request, res: Response, next: NextFunction, role: RoleUser) {
  const tokenDecoded: TokenBody | undefined = req.body.tokenDecoded
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

export default { verifyToken, checkRole }
