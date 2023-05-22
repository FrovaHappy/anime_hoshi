import { findUser } from '../database/users.db'
import bcrypt from 'bcrypt'
async function compare(username: string, password: string) {
  const user = await findUser(username)
  if (!user) return null
  const { passwordHash } = user
  return (await bcrypt.compare(password, passwordHash)) ? user : null
}
async function encrypt(password: string) {
  return await bcrypt.hash(password, 10)
}

export default { compare, encrypt }
