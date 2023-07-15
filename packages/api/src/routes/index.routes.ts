import express from 'express'
const routes = express()

import subscription from './subscription/routes'
import animes from './animes/routes'
import logs from './logs/routes'
import user from './user/routes'

routes.use('/subscription', subscription)
routes.use('/animes', animes)
routes.use('/logs', logs)
routes.use('/user', user)

export default routes
