import userDB from '../database/userDB'
import { Iuser } from '../type'

/**
 * @param user
 * @returns return null if user exists or if user is not exists, this is created
 */
async function createUser (user: Iuser) {
  const existsUser = await userDB.findUser(user.username)
  return (existsUser == null) ? await userDB.createUser(user) : null
}
async function updateUser () {

}
async function deleteUser (user: Iuser) {
  // TODO: check if user have the permissions
  const userDeleted = await userDB.deleteUser(user.username)
  return userDeleted
}
export default {
  updateUser,
  createUser,
  deleteUser
}
