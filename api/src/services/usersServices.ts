import { findUser, createUser, deleteUser } from '../database/users.db'
import { Iuser } from '../../type'

/**
 * @param user
 * @returns return null if user exists or if user is not exists, this is created
 */
async function servicesCreateUser(user: Iuser) {
  const existsUser = await findUser(user.username)

  return !existsUser ? await createUser(user) : null
}
async function servicesDeleteUser(user: Iuser) {
  // TODO: check if user have the permissions
  const userDeleted = await deleteUser(user.username)
  return userDeleted
}
export { servicesCreateUser, servicesDeleteUser }
