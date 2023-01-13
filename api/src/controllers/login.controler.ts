import { Request, Response } from 'express'
import loginServices from '../services/loginServices'
import { IuserWithoutPasswordHash } from '../type'

const postLogin = async (req: Request, res: Response) => {
  const user: IuserWithoutPasswordHash = {
    username: req.body.username,
    password: req.body.password
  }
  const loginResult = await loginServices.loginUser(user)
  loginResult
    ? res.status(200).json(loginResult)
    : res.status(403).json({ message: 'Invalid username or password' })
}
export default { postLogin }
