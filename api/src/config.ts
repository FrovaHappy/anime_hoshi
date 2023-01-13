import 'dotenv/config'

const port = process.env.PORT ?? 3000
const dbName = process.env.MONGODB_NAME ?? 'test-db'
const dbPassword = process.env.MONGODB_PASSWORD ?? ''
const tokenKey = process.env.TOKEN_KEY ?? 'passwordtest'

let getDbHost = process.env.MONGODB_HOST ?? 'mongodb://127.0.0.1:27017/<database>'
getDbHost = getDbHost.replace('<database>', dbName).replace('<password>', dbPassword)

const configs = {
  MONGODB_HOST: getDbHost,
  PORT: port,
  TOKEN_KEY: tokenKey,
}

export default configs
