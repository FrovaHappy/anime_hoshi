import type { Iuser } from '../../../type'
import { findUser, createUser, deleteUser, updateUser } from '../../database/users.db'
import auth from '../../middleware/auth'
import passwordHash from '../../utils/passwordHash'

/**
 * @param user
 * @returns return null if user exists or if user is not exists, this is created
 */
async function servicesCreateUser (user: Iuser) {
  const existsUser = await findUser(user.username)

  return (existsUser == null) ? await createUser(user) : null
}
async function servicesDeleteUser (user: Iuser) {
  // TODO: check if user have the permissions
  const userDeleted = await deleteUser(user.username)
  return userDeleted
}
function createUserToken (payload: { username: string, id: string, roles: string[] }) {
  return auth.createToken(payload, '24h')
}
interface UserUpdate {
  oldPassword: string
  newPassword: string
  username: string
}
async function servicesUpdateUser ({ oldPassword, newPassword, username }: UserUpdate) {
  const validatePassword = await passwordHash.compare(username, oldPassword)
  if (validatePassword == null) return undefined
  const newpasswordHash = await passwordHash.encrypt(newPassword)
  const userUpdate = await updateUser({ username, passwordHash: newpasswordHash, roles: validatePassword.roles })
  return userUpdate ?? undefined
}
export { servicesCreateUser, servicesDeleteUser, createUserToken, servicesUpdateUser }
