import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { servicesCreateUser } from '../services/usersServices'
import { Iuser } from '../../type'
import { IuserWithoutPasswordHash } from '../../type'
import { validateUserAndPassword } from '../utils/validateUserAndPassword'

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
    ? res.status(400).send({ code: 400, error: 'User already created', contents: null })
    : res.status(201).send({ code: 201, message: 'user successfully created', contents: null })
}
export async function signin(req: Request, res: Response) {
  const user: IuserWithoutPasswordHash = {
    username: req.body.username,
    password: req.body.password,
  }
  const loginResult = await validateUserAndPassword(user)
  loginResult
    ? res.status(200).json({ code: 200, message: 'user singin successfully', contents: { token: loginResult } })
    : res.status(403).json({ code: 403, message: 'Invalid username or password', contents: null })
}
