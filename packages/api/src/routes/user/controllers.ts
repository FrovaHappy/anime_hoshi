import type { Request, Response } from 'express'
import type { Iuser } from '../../../type'
import type { JsonResponse } from '../../../../types'
import bcrypt from 'bcrypt'
import { createUserToken, servicesCreateUser, servicesUpdateUser } from './services'
import auth from '../../middleware/auth'
import { findUser } from '../../database/users.db'
import passwordHash from '../../utils/passwordHash'

export async function signup(req: Request, res: Response<JsonResponse>) {
  const { username, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user: Iuser = {
    username,
    passwordHash,
    roles: ['user']
  }
  const userNew = await servicesCreateUser(user)
  userNew == null
    ? res.status(400).send({ code: 400, ok: false, message: 'User already created', contents: null })
    : res.status(201).send({ code: 201, ok: true, message: 'user successfully created', contents: null })
}
export async function signin(req: Request, res: Response<JsonResponse>) {
  const { password, username } = req.body
  const userValidate = await passwordHash.compare(username, password)
  if (userValidate == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'Invalid username or password', contents: null })
  }
  const newToken = createUserToken({ username: userValidate.username, id: userValidate.id, roles: userValidate.roles })
  return res.status(200).json({ code: 200, ok: true, message: 'user singIn successfully', contents: { newToken } })
}
export async function getUser(req: Request, res: Response<JsonResponse>) {
  const { authorization } = req.headers
  const decoded = auth.decodedToken(authorization ?? '')
  if (decoded == null) {
    return res.json({ code: 403, ok: false, message: 'error decoding token', contents: null }).status(403)
  }
  const response = await findUser(decoded.username)
  if (response == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'resource not found', contents: null })
  }
  const user = { username: response.username, roles: response.roles }
  const newToken = auth.createToken(user, '24h')
  return res.status(200).json({ code: 200, ok: true, message: 'user authenticated', contents: { newToken, ...user } })
}
export async function updateUser(req: Request, res: Response<JsonResponse>) {
  const { authorization } = req.headers
  const { oldPassword, newPassword } = req.body
  const decoded = auth.decodedToken(authorization ?? '')
  if (decoded == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'error decoding token', contents: null })
  }
  const user = await servicesUpdateUser({ oldPassword, newPassword, username: decoded.username })
  if (user == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'error updating user', contents: null })
  }
  const userData = { username: user.username, roles: user.roles }
  const newToken = auth.createToken(userData, '24h')
  return res.status(200).json({ code: 200, ok: true, message: 'user updated', contents: { newToken, ...userData } })
}
