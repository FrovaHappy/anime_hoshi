import jwt from 'jsonwebtoken'
import config from '../config'
import { Request, Response, NextFunction } from 'express'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.Authorization
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  token = token?.slice(7)?.toString() ?? 'default'
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    req.body.tokenDecoded = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

export default {
  verifyToken
}
