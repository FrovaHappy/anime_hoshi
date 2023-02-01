import path from 'path'
import express from 'express'
import cors from 'cors'
import config from './config'
import routes from './routes'
const app = express()
const absolutePath = path.join(__dirname, '../../frontend/build')
// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', express.static(absolutePath))

// routers
app.use(routes)

// liste

app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})

export default app
