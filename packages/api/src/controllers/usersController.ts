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
    ? res.status(400).send({ error: 'User already created' })
    : res.status(201).send({ message: 'user successfully created' })
}
export async function signin(req: Request, res: Response) {
  const user: IuserWithoutPasswordHash = {
    username: req.body.username,
    password: req.body.password,
  }
  const loginResult = await validateUserAndPassword(user)
  loginResult
    ? res.status(200).json({ token: loginResult })
    : res.status(403).json({ message: 'Invalid username or password' })
}
