import express from 'express'

import subscription from './subscription/routes'
import animes from './animes/routes'
import logs from './logs/routes'
import user from './user/routes'
import pages from './pages/routes'

const routes = express()

routes.use('/subscription', subscription)
routes.use('/animes', animes)
routes.use('/logs', logs)
routes.use('/user', user)
routes.use('/pages', pages)

export default routes
