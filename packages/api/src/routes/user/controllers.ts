import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUserToken, servicesCreateUser, servicesUpdateUser } from './services'
import { Iuser } from '../../../type'
import auth from '../../middleware/auth'
import { findUser } from '../../database/users.db'
import passwordHash from '../../utils/passwordHash'
import { JsonResponse } from '../../../../types'

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user: Iuser = {
    username,
    passwordHash,
    roles: ['user'],
  }
  const userNew = await servicesCreateUser(user)
  !userNew
    ? res.status(400).send({ code: 400, message: 'User already created', contents: null } as JsonResponse)
    : res.status(201).send({ code: 201, message: 'user successfully created', contents: null } as JsonResponse)
}
export async function signin(req: Request, res: Response) {
  const { password, username } = req.body
  const userValidate = await passwordHash.compare(username, password)
  if (!userValidate) return res.status(403).json({ code: 403, message: 'Invalid username or password', contents: null })
  const newToken = createUserToken({ username: userValidate.username, id: userValidate.id, roles: userValidate.roles })
  return res
    .status(200)
    .json({ code: 200, message: 'user singIn successfully', contents: { newToken } } as JsonResponse)
}
export async function getUser(req: Request, res: Response) {
  const { authorization } = req.headers
  const decoded = auth.decodedToken(authorization!)
  if (!decoded)
    return res.status(403).json({ code: 403, message: 'error decoding token', contents: null } as JsonResponse)
  const response = await findUser(decoded.username)
  if (!response)
    return res.status(403).json({ code: 403, message: 'resource not found', contents: null } as JsonResponse)
  const user = { username: response.username, roles: response.roles }
  const newToken = auth.createToken(user, '24h')
  return res
    .status(200)
    .json({ code: 200, message: 'user authenticated', contents: { newToken, ...user } } as JsonResponse)
}
export async function updateUser(req: Request, res: Response) {
  const { authorization } = req.headers
  const { oldPassword, newPassword } = req.body
  const decoded = auth.decodedToken(authorization!)
  if (!decoded)
    return res.status(403).json({ code: 403, message: 'error decoding token', contents: null } as JsonResponse)
  const user = await servicesUpdateUser({ oldPassword, newPassword, username: decoded.username })
  if (!user) return res.status(403).json({ code: 403, message: 'error updating user', contents: null } as JsonResponse)
  const userData = { username: user.username, roles: user.roles }
  const newToken = auth.createToken(userData, '24h')
  return res
    .status(200)
    .json({ code: 200, message: 'user updated', contents: { newToken, ...userData } } as JsonResponse)
}
