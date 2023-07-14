import express from 'express'
import cors from 'cors'
import {configs} from './config'
import routes from './routes/index.routes'

const app = express()
// middlewares
export default function App() {
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  // routers
  app.use(routes)

  app.listen(configs.PORT, () => {
    console.log(`server on port ${configs.PORT}`)
  })
}
