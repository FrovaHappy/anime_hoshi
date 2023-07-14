import express from 'express'
const routes = express()

import subscription from './subscription/routes'
import animes from './animes/routes'

routes.use('/subscription', subscription)
routes.use('/animes', animes)

export default routes
