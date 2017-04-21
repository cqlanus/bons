'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/products', require('./products'))
  .use('/productdetails', require('./productDetails'))
  .use('/ratings', require('./ratings'))
  .use('/comments', require('./comments'))
  .use('/orders', require('./orders'))
  .use('/categories', require('./categories'))
  .use('/artists', require('./artists'))
  .use('/payments', require('./payments'))



// No routes matched? 404.
api.use((req, res) => res.status(404).end())
