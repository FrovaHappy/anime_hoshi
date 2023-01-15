import 'dotenv/config'

const dbName = process.env.MONGODB_NAME ?? 'test-db'
const dbPassword = process.env.MONGODB_PASSWORD ?? ''

let getDbHost = process.env.MONGODB_HOST ?? 'mongodb://127.0.0.1:27017/<database>'
getDbHost = getDbHost.replace('<database>', dbName).replace('<password>', dbPassword)

const configs = {
  MONGODB_HOST: getDbHost,
}

export default configs
