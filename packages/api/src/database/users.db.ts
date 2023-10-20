import type { Iuser } from '../../type'
import { UserModel } from './models/User'
const findUser = async (username: string) => {
  return await UserModel.findOne({ username })
}
async function createUser(user: object) {
  return await UserModel.create(user)
}
async function deleteUser(username: string) {
  return await UserModel.findOneAndDelete({ username })
}
async function updateUser(user: Iuser) {
  return await UserModel.findOneAndReplace({ username: user.username }, user, { upsert: true, returnDocument: 'after' })
}
export { createUser, findUser, deleteUser, updateUser }
