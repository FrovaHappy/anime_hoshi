import 'dotenv/config'
import NodeCache from 'node-cache'

const port = process.env.PORT ?? 3001
const cache = new NodeCache()

const configs = {
  MONGODB_HOST: process.env.MONGODB_HOST ?? 'mongodb://127.0.0.1:27017/test-db',
  PORT: port,
  TOKEN_KEY: process.env.TOKEN_KEY ?? 'test-token'
}

export { cache }
export default configs
