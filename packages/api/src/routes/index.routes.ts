import express from 'express'
const routes = express()

import subscription from './subscription/routes'

routes.use('/subscription', subscription)

export default routes
