import express from 'express'
import cors from 'cors'
import config from './config'
import routes from './routes'
const path = require("path");
const app = express()
// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routers
app.use(routes)

app.use(express.static(path.join(__dirname, 'public')))
// liste

app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})

export default app
