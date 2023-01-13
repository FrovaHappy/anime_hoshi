import express from 'express'
import commands from './v1/routes/commands.routes'
import user from './v1/routes/user.routes'
import login from './v1/routes/login.routes'
const routes = express()

routes
  .use('/commands', commands)
  .use('/user', user)
  .use('/login', login)

export default routes
