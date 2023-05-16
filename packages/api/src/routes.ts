import express from 'express'
const routes = express()

import user from './routes/user.routes'
import anime from './routes/anime.routes'
import subscription from './routes/subscription.routes'
import episodes from './routes/episodes.routes'
import logs from './routes/logs.routes'

routes.use('/user', user)
routes.use('/animes', anime)
routes.use('/subscription', subscription)
routes.use('/episodes', episodes)
routes.use('/logs', logs)

export default routes
