import { connect, set } from 'mongoose'
import { configs } from './config'

// connection to db
export async function mongoose() {
  set('strictQuery', true)
  const db = await connect(configs.MONGODB_HOST)
  console.log('Db connectect to', db.connection.host)
}
