import type { Request, Response } from 'express'
import type { Iuser } from '../../../type'
import type { JsonResponse } from '../../../../types'
import bcrypt from 'bcrypt'
import { createUserToken, servicesCreateUser, servicesUpdateUser } from './services'
import auth, { type ExtBodyUserVerified } from '../../middleware/auth'
import passwordHash from '../../utils/passwordHash'
import { type UserValidate, type PasswordValidate } from './validatorSchema'

export async function signup(req: Request<any, any, UserValidate>, res: Response<JsonResponse>) {
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
export async function signin(req: Request<any, any, UserValidate>, res: Response<JsonResponse>) {
  const { password, username } = req.body
  const userValidate = await passwordHash.compare(username, password)
  if (userValidate == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'Invalid username or password', contents: null })
  }
  const newToken = createUserToken({ username: userValidate.username, id: userValidate.id, roles: userValidate.roles })
  return res.status(200).json({ code: 200, ok: true, message: 'user singIn successfully', contents: { newToken } })
}
export async function getUser(req: Request<any, any, ExtBodyUserVerified>, res: Response<JsonResponse>) {
  const userVerified = req.body.userVerified
  return res.status(200).json({ code: 200, ok: true, message: 'user authenticated', contents: { ...userVerified } })
}
export async function updateUser(
  req: Request<any, any, ExtBodyUserVerified & PasswordValidate>,
  res: Response<JsonResponse>
) {
  const userVerified = req.body.userVerified
  const { oldPassword, newPassword } = req.body
  const user = await servicesUpdateUser({ oldPassword, newPassword, username: userVerified.username })
  if (user == null) {
    return res.status(403).json({ code: 403, ok: false, message: 'error updating user', contents: null })
  }
  const userData = { username: user.username, roles: user.roles }
  const newToken = auth.createToken({ username: user.username }, '24h')
  return res.status(200).json({ code: 200, ok: true, message: 'user updated', contents: { newToken, ...userData } })
}
