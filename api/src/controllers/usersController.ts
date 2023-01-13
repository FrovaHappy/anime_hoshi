import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import usersServices from '../services/usersServices'
import { Iuser } from '../type'

const postUser = async (req: Request, res: Response) => {
  const { body } = req
  const passwordHash = await bcrypt.hash(body.password, 10)
  const user: Iuser = {
    username: body.username,
    passwordHash,
    roles: ['user']
  }
  await usersServices.createUser(user).then((userNew) => {
    (userNew == null)
      ? res.status(400).send({ error: 'User already created' })
      : res.status(200).send(userNew)
  })
}

export default {
  postUser
}
