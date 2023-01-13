import express from 'express'
import cors from 'cors'
import config from './config'
import routesv1 from './routes'
const app = express()

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routers
app.use('/v1', routesv1)

// liste

app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})

export default app
