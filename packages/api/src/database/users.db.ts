import { UserModel } from './models/User'
import { Iuser } from '../../type'
const findUser = async (username: string) => {
  return await UserModel.findOne({ username })
}
async function createUser(user: Object) {
  return await UserModel.create(user)
}
async function deleteUser(username: string) {
  return await UserModel.findOneAndDelete({ username })
}
async function updateUser(user: Iuser) {
  const config = { upsert: true, returnDocument: 'after' }
  return await UserModel.findOneAndUpdate({ username: user.username }, user, config)
}
export { createUser, findUser, deleteUser, updateUser }
