import express from 'express'
import user from './routes/user.routes'
const routes = express()

routes.use('/user', user)

export default routes
